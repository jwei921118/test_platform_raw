const {
    Service
} = require('egg');

const Chain = require("@alipay/mychain/index.node");

/**
 *
 *
 * @class ContractService
 * @extends {Service}
 */
class ContractService extends Service {



    /**
     *
     * 添加合约信息
     * @param {*} data
     * @returns object
     * @memberof ContractService
     */
    async addBytecode(data) {
        let {
            ctx
        } = this;
        // 添加合约字节码信息
        try {
            const result = await ctx.model.CntBytecode.findOrCreate({
                where: {
                    bytecode: data.bytecode
                },
                defaults: data
            });

            let [ctns, created] = result;
            let res = {};
            if (created) {
                res.code = 0;
                res.data = ctns.dataValues;
            } else {
                res.code = ctx.DB_DATA_REPEAT;
                res.message = '合约已存在';
            }
            return res;
        } catch (error) {
            return ctx.helper.DB_ERROR;
        }
    }


    /**
     *
     * 合约信息列表
     * @memberof ContractService
     */
    async bytecodeList() {
        let {
            ctx
        } = this;

        try {
            const result = await ctx.model.CntBytecode.findAll();
            if (result && result instanceof Array) {
                let list = [];
                if (result.length > 0) {
                    list = result.map((v) => v.dataValues);
                }
                return {
                    code: 0,
                    data: list
                }
            }
        } catch (error) {
            return ctx.helper.DB_ERROR;
        }
    }


    /**
     * 删除合约信息
     * @param {*} data
     * @returns object
     * @memberof ContractService
     */
    async delBytecode(data) {
        let {
            ctx
        } = this;

        try {
            const result = await ctx.model.CntBytecode.destroy({
                where: {
                    id: data.id
                }
            });
            if (result) {
                return {
                    code: 0,
                    data: result
                }
            } else {
                return {
                    code: 1,
                    message: '不存在本条数据'
                }
            }
        } catch (error) {
            return ctx.helper.DB_ERROR;
        }
    }

    /**
     *
     *
     * @param {*} data
     * @returns
     * @memberof ContractService
     */
    async deployCnt(data, cstParam) {
        let {
            ctx,
            service
        } = this;

        let {
            // 账户名称
            accountName,
            // 合约名称
            contractName,
            // 合约类型
            contractType,
            // 所属项目
            belong,
            // 合约abi
            abi,
        } = data;
        let result = null;

        try {
            result = await ctx.model.User.findOne({
                where: {
                    accountName: accountName
                }
            });
        } catch (error) {
            return ctx.helper.DB_ERROR;
        }

        if (result) {
            let {
                publicKey,
                privateKey
            } = result;
            let param = {
                ...data,
                privateKey,
                publicKey
            };
            const cntInfo = await service.blockchain.deployContract(param, cstParam);
            let identity = Chain.utils.getHash(contractName);
            if (cntInfo.code === 1) {
                return cntInfo;
            }
            let tableData = {
                contractName,
                contractType,
                belong,
                identity,
                abi,
                deployer: accountName
            };
            console.log(abi);
            if (contractType === 'pisa') {

                let totalSupply = cstParam ? cstParam.split(',')[2] ? cstParam.split(',')[2] : '' : '';
                let _costRatio = cstParam ? cstParam.split(',')[3] ? cstParam.split(',')[3] : '' : '';
                if (!totalSupply) {
                    return {
                        code: 1,
                        message: 'pisa合约参数错误'
                    }
                } else {
                    tableData.totalSupply = Number(totalSupply);
                }
                if (_costRatio) {
                    tableData.costRatio = Number(_costRatio);
                }

                return this.joinDeployCntToDB(tableData, 'PisaCnt');
                // 披萨合约

            } else if (contractType === 'sdr') {
                return this.joinDeployCntToDB(tableData, 'SdrCnt');
            } else if (contractType === 'confirmOrder') {
                // 对账合约
                return this.joinDeployCntToDB(tableData, 'ConfirmCnt');
            }

        } else {
            return {
                code: 1,
                message: '不存在本条数据'
            }
        }


    }


    /**
     *
     * 添加部署合约到数据库
     * @param {*} data
     * @memberof ContractService
     */
    async joinDeployCntToDB(data, dbmodel) {
        let {
            ctx
        } = this;
        let {
            contractName
        } = data;

        try {
            const result = await ctx.model[dbmodel].findOrCreate({
                where: {
                    contractName
                },
                defaults: data
            });

            let [ctns, created] = result;
            let res = {};
            if (created) {
                res.code = 0;
                res.data = ctns;
            } else {
                res.code = ctx.DB_DATA_REPEAT;
                res.message = '合约已存在数据库';
            }
            return res;
        } catch (error) {
            return ctx.helper.DB_ERROR;
        }

    }


    /**
     *
     *  从数据库里面删除
     * @param {*} data
     * @param {*} dbmodel
     * @memberof ContractService
     */
    async delDeployCntFromDB(data, dbmodel) {
        const {
            ctx
        } = this;
        try {
            const result = await ctx.model[dbmodel].destroy({
                where: {
                    id: data.id
                }
            })
            if (result) {
                return {
                    code: 0,
                    data: result
                }
            } else {
                return {
                    code: 1,
                    message: '不存在本条数据'
                }
            }
        } catch (error) {
            return ctx.helper.DB_ERROR;
        }
    }


    /**
     *
     * 获取已经部署列表
     * @memberof ContractService
     */
    async deployedCntList(data) {
        let {
            ctx
        } = this;
        let result = null
        try {
            if (data.contractType === 'sdr') {
                result = await ctx.model.SdrCnt.findAll();
            } else if (data.contractType === 'pisa') {
                result = await ctx.model.PisaCnt.findAll();
            } else if (data.contractType === 'confirmOrder') {
                result = await ctx.model.ConfirmCnt.findAll();
            } else {
                return {
                    code: 1,
                    message: '参数contractType错误'
                }
            }
            return {
                code: 0,
                data: result
            }
        } catch (error) {
            console.log(error);
            return ctx.helper.DB_ERROR;
        }
    }


    /**
     *
     * 根据合约名称查询合约信息
     * @memberof ContractService
     */
    async findOnePisaCnt(data) {
        let {
            ctx
        } = this;
        let param = {};
        if (data.identity) {
            param.identity = data.identity
        }
        if (data.contractName) {
            param.contractName = data.contractName;
        }
        try {
            const result = await ctx.model.PisaCnt.findOne({
                where: param
            })
            return {
                code: 0,
                data: result.dataValues
            }
        } catch (error) {
            return ctx.helper.DB_ERROR;
        }
    }


    /**
     *
     *  执行合约操作
     * @memberof sdrContractService
     */
    async execute(data) {
        const {
            ctx,
            service
        } = this;

        let {
            accountName,
            methodName,
        } = data;

        let userInfo = null;
        // 获取用户公私钥
        try {
            userInfo = await ctx.model.User.findOne({
                where: {
                    accountName
                }
            });
        } catch (error) {
            return ctx.helper.DB_ERROR;
        }
        // 获取合约信息

        if (userInfo) {
            const param = {
                ...data,
                privateKey: userInfo.privateKey,
                publicKey: userInfo.publicKey
            };
            const chainInstance = await service.blockchain.getContractInstance(param);
            if (param) {
                const a = Object.values(param.param);
                console.log(methodName, accountName, a);
                return new Promise((resolve, reject) => {
                    chainInstance[methodName](...a, {
                        from: accountName
                    }, (err, output, data) => {
                        if (err) {
                            resolve({
                                code: 1,
                                message: err
                            })
                        } else {
                            this.pipelineFn(param, output);
                            resolve({
                                code: 0,
                                data: {
                                    output: output,
                                    info: {
                                        block_number: data.block_number,
                                        return_code: data.return_code,
                                        txhash: data.txhash,
                                        gas_used: data.receipt.gas_used
                                    }
                                },
                            })
                        }
                    });
                })

            }

        } else {
            return {
                code: 1,
                message: '调用者错误'
            }
        }

    }



    /**
     *
     *  处理不同合约方法的管道函数
     * @memberof ContractService
     */
    async pipelineFn(data, output) {
        let {
            ctx,
            service
        } = this;
        let {
            methodName,
            contractName
        } = data;
        if (data.contractType === 'sdr') {
            // sdr合约
            if (methodName === 'mintAvailable') {
                let param = await this.getPartnerParam(data);
                let partner = await this.checkSdrProPartner(param);
                service.propartner.createOrUpdate(param, partner, true);
            }
        } else if (data.contractType === 'pisa') {
            // pisa 合约
            if (methodName === 'addPartner') {
                let param = await this.getPartnerParam(data);
                let partner = await this.checkMechantPartner(param);
                service.merchantpartner.createOrUpdate(param, partner, true);
            } else if (methodName === 'transfer') {

                let data1 = {
                    ...data
                }
                data1.param = {
                    ...data.param
                }
                data1.param.identity = data.param.identity_1;
                let param1 = await this.getPartnerParam(data1);
                // console.log(param1);
                let partner1 = await this.checkMechantPartner(param1);
                // console.log(partner1);
                service.merchantpartner.createOrUpdate(param1, partner1, false);

                let data2 = {
                    ...data
                }
                data2.param = {
                    ...data.param
                }
                data2.param.identity = data.param.identity_2;
                // console.log(1111111111111111111111, data1);
                // console.log(2222222222222222222222, data2);

                let param2 = await this.getPartnerParam(data2);
                let partner2 = await this.checkMechantPartner(param2);
                // console.log(partner1);
                service.merchantpartner.createOrUpdate(param2, partner2, true);
            } else if (methodName === 'clearBycostRatio') {
                // 清分
                let partners = Object.values(JSON.parse(output));
                let pisacntInfo = await this.findOnePisaCnt({
                    contractName
                });

                if (pisacntInfo.code !== 0) {
                    return;
                }

                let projectId = pisacntInfo.data.pisaId;
                for (let i = 0; i < partners.length; i++) {
                    let identity = ctx.helper.int2hex(String(partners[i].k));
                    let o = {
                        ...data,
                        id: projectId
                    };
                    o.contractType = 'sdr';
                    o.param.identity = identity;
                    o.param.account = Number(partners[i].v);

                    let param = await this.getPartnerParam(o);
                    let partner = await this.checkSdrProPartner(param);
                    service.propartner.createOrUpdate(param, partner, true);
                }

            }
        } else if (data.contractType === 'confirmOrder') {
            console.log('confirmOrder');
        }
    }



    /**
     *
     * 查看sdr 合伙人是否存在
     * @param {*} data
     * @memberof ContractService
     */
    async checkSdrProPartner(data) {
        let {
            ctx
        } = this;
        try {
            const result = await ctx.model.SdrCnt.findOne({
                where: {
                    id: data.projectId
                },
                include: [{
                    model: ctx.model.ProPartner,
                    where: {
                        identity: data.identity
                    }
                }]
            });
            if (result) {
                // console.log('partner-----------', result.dataValues.proPartners)
                let partner = result.dataValues.proPartners[0].dataValues;
                // console.log('id---------------', id);
                return {
                    preBalanceof: partner.balanceof,
                    id: partner.id
                }
            } else {
                return 0;
            }
            // let partner = result;
            // console.log('partner---------', result);
            // // console.log("check--------", result);
        } catch (error) {
            return 0
        }
    }


    /**
     * 查看商户合伙人是否存在
     *
     * @param {*} data
     * @memberof ContractService
     */
    async checkMechantPartner(data) {
        let {
            ctx
        } = this;
        try {
            const result = await ctx.model.PisaCnt.findOne({
                where: {
                    id: data.merchantId
                },
                include: [{
                    model: ctx.model.MerchantPartner,
                    where: {
                        identity: data.identity
                    }
                }]
            });
            console.log(result)
            if (result) {
                // console.log(result);merchantPartners
                // console.log('partner-----------', result.dataValues.proPartners)
                let partner = result.dataValues.merchantPartners[0].dataValues;
                // console.log('id---------------', id);
                return {
                    preBalanceof: partner.balanceof,
                    id: partner.id
                }
            } else {
                return 0;
            }
            // let partner = result;
            // console.log('partner---------', result);
            // // console.log("check--------", result);
        } catch (error) {
            console.log(error);
            return 0
        }
    }


    /**
     *
     * 生成参数
     * @param {*} data
     * @param {*} userInfo
     * @memberof ContractService
     */
    async getPartnerParam(data) {
        // console.log(data);
        let {
            service
        } = this;
        let user = await service.user.findOne({
            identity: data.param.identity
        });
        // console.log(user);
        if (user.code === 0) {
            let o = {
                accountName: user.data.accountName,
                identity: data.param.identity,
                balanceof: data.param.account,
            };
            if (data.contractType === 'sdr') {
                return {
                    ...o,
                    projectId: data.id
                }
            } else if (data.contractType === 'pisa') {
                return {
                    ...o,
                    merchantId: data.id
                }
            }
        } else {
            console.log('contract-------------------')
            let cnt = await this.findOnePisaCnt({
                identity: data.param.identity
            })
            if (cnt.code === 0) {
                return {
                    accountName: cnt.data.contractName,
                    identity: data.param.identity,
                    balanceof: data.param.account,
                    projectId: data.id
                }
            } else {
                return false
            }

        }

    }



}

module.exports = ContractService;