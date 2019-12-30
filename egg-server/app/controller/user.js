'use strict';

const Controller = require('egg').Controller;

class UserController extends Controller {

    /**
     * 创建用户
     */
    async create() {
        const {
            ctx,
            service
        } = this;
        let data = ctx.request.body;

        const result = await service.user.create(data);
        ctx.return(result);
    }

    /**
     *
     * 用户列表
     */
    async list() {
        const {
            ctx,
            service
        } = this;
        const result = await service.user.findAll();
        ctx.return(result);
    }


    /**
     *
     * 删除用户
     */
    async delUser() {
        let {
            ctx,
            service
        } = this;
        let data = ctx.request.body;
        if (!data.id) {
            ctx.return({
                code: '1',
                message: '缺少id'
            })
            return;
        }
        const result = await service.user.delUser(data);
        ctx.return(result);
    }



    /**
     *
     * 查询方案
     * @memberof UserController
     */
    async search() {
        let {
            ctx,
            service,
        } = this;
        let data = ctx.request.body;

        if (!data.accountName && !data.identity) {
            ctx.return({
                code: 1,
                message: '参数验证失败'
            });
            return;
        }

        const result = await service.user.findOne(data);
        ctx.return(result);

    }
}

module.exports = UserController;