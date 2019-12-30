'use strict';

const Controller = require('egg').Controller;

class CommonController extends Controller {

    /**
     *
     * 数据上链
     * @memberof CommonController
     */
    async dataOnChain() {
        let {
            ctx,
            service,
            app
        } = this;

        let data = ctx.request.body;
        const errors = app.validator.validate({
            merchantId: 'number',
            account: 'number',
            clearanceType: 'string'
        }, data);
        if (errors) {
            // 验证失败
            ctx.return({
                code: ctx.VALIDATE_ERROR,
                message: errors
            })
        } else {
            const result = await service.common.dataOnChain(data);
            ctx.return(result);
        }

    }
}

module.exports = CommonController;