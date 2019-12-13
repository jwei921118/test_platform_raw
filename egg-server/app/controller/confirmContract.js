'use strict';

const Controller = require('egg').Controller;


/**
 *
 * 对账控制器
 * @class confirmContractController
 * @extends {Controller}
 */
class confirmContractController extends Controller {
    /**
     *
     * 获取用户
     * @memberof pisaContractController
     */
    async list() {
        const {
            ctx,
            service
        } = this;
        const result = await service.confirmContract.list();
        ctx.return(result);
    }

    /**
     *
     *  
     * @memberof pisaContractController
     */
    async execute() {
        const {
            ctx,
            service,
            app
        } = this;
        let {
            validator
        } = app;
        let data = ctx.request.body;
        const errors = validator.validate({
            contractName: 'string',
            accountName: 'string',
            methodName: 'string',
            abi: 'string'
        }, data);
        if (errors) {
            ctx.return({
                code: ctx.VALIDATE_ERROR,
                message: '参数验证失败'
            })
        }
        const result = await service.confirmContract.execute(data);
        ctx.return(result);
    }


}

module.exports = confirmContractController;