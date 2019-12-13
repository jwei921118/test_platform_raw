const {
    Service
} = require('egg');


/**
 *
 * 稳定币合约服务
 * @class confirmContractService
 * @extends {Service}
 */
class confirmContractService extends Service {

    /**
     *
     * 获取列表
     * @memberof confirmContractService
     */
    async list() {
        const {
            ctx
        } = this;
        try {
            const result = await ctx.model.ConfirmCnt.findAll();
            if (result && result instanceof Array) {
                return {
                    code: 0,
                    data: result
                }
            }
        } catch (error) {
            console.log(error);
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

module.exports = confirmContractService;