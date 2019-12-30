const {
    Service
} = require('egg');


class UserService extends Service {

    /**
     * 
     * @param {*} data 
     */
    async create(data) {

        const {
            ctx,
            service
        } = this;

        const blockchainUser = await service.blockchain.createAccount(data.accountName);
        // console.log(blockchainUser);
        if (!blockchainUser.status) {
            return {
                code: '7',
                name: '区块链服务错误'
            }
        }

        try {
            const result = await ctx.model.User.findOrCreate({
                where: {
                    identity: blockchainUser.identity,
                    accountName: blockchainUser.accountName
                },
                defaults: blockchainUser
            });

            let [user, created] = result;
            let res = {};
            if (created) {
                res.code = 0;
                res.data = user;
            } else {
                res.code = ctx.DB_DATA_REPEAT;
                res.message = '用户已存在';
            }
            return res;
        } catch (error) {
            return ctx.helper.DB_ERROR;
        }

    }

    /**
     *
     * 获取用户列表
     */
    async findAll() {
        const {
            ctx
        } = this;

        try {
            const result = await ctx.model.User.findAll();
            if (result && result instanceof Array) {
                return {
                    code: 0,
                    data: result
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
     * @memberof UserService
     */
    async delUser(data) {
        const {
            ctx
        } = this;

        try {
            const result = await ctx.model.User.destroy({
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
     * 查询一个
     * @param {*} data
     * @memberof UserService
     */
    async findOne(data) {
        let {
            ctx
        } = this;
        let param = {};
        if (data.identity) {
            param.identity = data.identity
        }
        if (data.accountName) {
            param.accountName = data.accountName;
        }

        try {
            const result = await ctx.model.User.findOne({
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
}

module.exports = UserService;