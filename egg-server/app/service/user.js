const {
    Service
} = require('egg');

let uuidv1 = require('uuid').v1;


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
        let addr = uuidv1();
        let param = {
            ...data,
            addr
        }

        const usercnt = await ctx.model.CntDeploy.findOne({where: {contractType: 'uc'}});

        const chainInstance = await service.blockchain.getContractInstance(usercnt);

        let arr = [addr, data.keyhash,data.accountName];
        let cntUser = service.blockchain.getAdmin();
        return new Promise((resolve,reject) => {
            chainInstance['registerUser'](...arr, {
                from: cntUser
                },async (err, output,blockdata) => {
                    if (err) {
                        resolve({
                            code: 1,
                            message: err
                        })
                    } else {
                        try {
                            const result = await ctx.model.User.findOrCreate({
                                where: {
                                    addr: addr
                                },
                                defaults: param
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
                            resolve(res);
                        } catch (error) {
                            resolve(ctx.helper.DB_ERROR);
                        }
                    }
            })
        });

        

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
        if (data.addr) {
            param.addr = data.addr
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


    /**
     *
     * 更新用户
     * @param {*} data
     * @memberof UserService
     */
    async update(data) {
        console.log(data);
        let {
            ctx
        } = this;
        try {
            const result = await ctx.model.User.update({
                balanceof: data.balanceof
            }, {
                where: {
                    addr: data.addr
                }
            });
            console.log(result);
            return {
                code: 0,
                message: 'success'
            }
        } catch (error) {
            return ctx.helper.DB_ERROR;
        }
    }
}

module.exports = UserService;