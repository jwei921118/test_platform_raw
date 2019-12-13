'use strict';

const Controller = require('egg').Controller;

class UserController extends Controller {

    async getPath() {
        const {
            ctx,
            service
        } = this;

        const result = await service.blockchain.getPath('/ca');
        console.log(result);
        ctx.return({
            code: 0,
            data: result
        })
    }

    async getIdentity() {
        const {
            ctx,
            service
        } = this;
        let accountName = ctx.request.body.accountName;
        console.log(accountName)

        const identity = await service.blockchain.getHashIdentity(accountName);
        ctx.return({
            code: 0,
            data: {
                identity
            }
        })
    }
}

module.exports = UserController;