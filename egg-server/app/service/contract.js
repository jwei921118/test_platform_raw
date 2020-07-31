const {
    Service
} = require('egg');

const Chain = require("@alipay/mychain/index.node");
const { Promise } = require('sequelize');

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
            console.log(data);
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
            service
        } = this;

        let {
            // 合约名称
            contractName,
            // 合约类型
            contractType,
        } = data;

        // console.log(contractName);
        // 合约参数
        let cntParams = [];
        if (cstParam) {
            cntParams = cstParam.split(",");
        }
        let cntInfo = await service.blockchain.deployContract(data, cntParams);
        console.log(cntInfo);
        let identity = Chain.utils.getHash(contractName);
        if (cntInfo.code === 1) {
            return cntInfo;
        }
        let tableData = {
            contractName,
            contractType,
            abi: data.abi,
            identity,
            txhash: cntInfo.txhash
        };
        console.log(tableData);
        return this.joinDeployCntToDB(tableData, 'CntDeploy');
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
    async deployedCntList() {
        let {
            ctx
        } = this;
        let result = null
        try {
            result = await ctx.model.CntDeploy.findAll();
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
            methodName,
        } = data;

        const result = await this.setContractCaller(data);
        let cntUser = service.blockchain.getAdmin();
        if (result.code === 0 ) {
            const chainInstance = await service.blockchain.getContractInstance(data);
            let arr = Object.values(data.param);
            console.log(arr);
            return new Promise((resolve, reject) => {
                chainInstance[methodName](...arr, {
                    from: cntUser
                }, (err, output, blockdata) => {
                    console.log(err)
                    console.log(blockdata);
                    if (err) {
                        resolve({
                            code: 1, 
                            message: err
                        });
                    } else {
                        this.pipelineFn(data, output);
                        resolve({
                            code: 0,
                            data: {
                                output: output,
                                info: {
                                    block_number: blockdata.block_number,
                                    return_code: blockdata.return_code,
                                    txhash: blockdata.txhash,
                                    gas_used: blockdata.receipt.gas_used
                                }
                            },
                        })
                    }
                })
            });
        } else {
            return result;
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
            methodName
        } = data;
        if (data.contractType === 'sc') {
            // sdr合约
            if (methodName === 'mintAvailable') {
                let o = {
                    addr: data.param.addr,
                    balanceof: data.param.account
                }
                service.user.update(o);
            }
        } else if (data.contractType === 'cc') {
            
        } else if (data.contractType === 'ac') {
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

    /**
     *
     * 生成参数
     * @param {*} data
     * @memberof ContractService
     */
    async setContractCaller(data) {
        let { ctx,service } = this;
        let { accountName } = data;
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

        let param = await ctx.model.CntDeploy.findOne({where: {contractType: 'uc'}});

        const chainInstance = await service.blockchain.getContractInstance(param);

        let cntParam = Object.values({
            addr: userInfo.addr,
            keyhash: userInfo.keyhash
        });

        console.log(cntParam);

        let admin = service.blockchain.getAdmin();
        return new Promise((resolve, reject) => {
            chainInstance['setSender'](...cntParam, {
                    from: admin 
                }, (err, output, data) => {
                    if (err) {
                        resolve({code: 1, message: 'setCaller failed'});
                    } else {
                        resolve({code: 0 , message: 'success'})
                    }
            })
        });
        // const chainInstance = await service.blockchain.getContractInstance(data);
        
    }


}

module.exports = ContractService;