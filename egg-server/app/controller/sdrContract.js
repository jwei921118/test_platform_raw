'use strict';

const Controller = require('egg').Controller;


/**
 *
 * sdr 控制器
 * @class SdrContractController
 * @extends {Controller}
 */
class sdrContractController extends Controller {

    /**
     *
     *  获取
     * @memberof sdrContractController
     */
    async list() {
        const {
            ctx,
            service
        } = this;
        const result = await service.sdrContract.list();
        ctx.return(result);
    }

    /**
     *
     *  
     * @memberof sdrContractController
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
        const result = await service.sdrContract.execute(data);
        ctx.return(result);
    }
}

module.exports = sdrContractController;