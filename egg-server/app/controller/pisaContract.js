'use strict';

const Controller = require('egg').Controller;

class pisaContractController extends Controller {
    /**
     *
     *  pisa 合约数据
     * @memberof pisaContractController
     */
    async addPartner() {
        const {
            ctx,
            service,
            app
        } = this;
        let data = ctx.request.body;
        let {
            validator
        } = app;

        const errors = validator.validate({
            accountName: 'string',
            identity: 'string',
            balanceof: 'number',
            merchantId: 'number'
        }, data);

        if (errors) {
            ctx.return({
                code: ctx.VALIDATE_ERROR,
                message: '参数验证失败'
            })
        } else {
            const result = await service.pisaContract.addPartner(data);
            ctx.return(result);
        }

    }


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
        const result = await service.pisaContract.list();
        ctx.return(result);
    }


    /**
     *
     *
     * @memberof pisaContractController
     */
    async delCnt() {
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
        const result = await service.contract.delDeployCntFromDB(data, 'PisaCnt');
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
        const result = await service.pisaContract.execute(data);
        ctx.return(result);
    }
}

module.exports = pisaContractController;