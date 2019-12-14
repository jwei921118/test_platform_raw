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

                let totalSupply = cstParam ? cstParam.split(',')[1] : '';
                if (!totalSupply) {
                    return {
                        code: 1,
                        message: 'pisa合约参数错误'
                    }
                }
                tableData.totalSupply = Number(totalSupply);
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
            console.log(param);
            const chainInstance = await service.blockchain.getContractInstance(param);
            if (param) {
                const a = Object.values(param.param);
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


}

module.exports = ContractService;