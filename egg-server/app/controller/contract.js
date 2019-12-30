'use strict';

const Controller = require('egg').Controller;

class ContractController extends Controller {

    /**
     *  添加合约信息
     */
    async addCntInfo() {
        const {
            ctx,
            service
        } = this;

        let data = ctx.request.body;

        const result = await service.contract.addBytecode(data);
        ctx.return(result);
    }



    /**
     *
     *  合约信息列表
     */
    async cntInfoList() {
        const {
            ctx,
            service
        } = this;

        const result = await service.contract.bytecodeList();
        ctx.return(result);
    }


    /**
     *
     * 删除合约信息
     */
    async delCntInfo() {
        const {
            ctx,
            service
        } = this;
        let data = ctx.request.body;
        if (!data.id) {
            ctx.return({
                code: 1,
                message: 'id不能为空'
            });
            return;
        }
        const result = await service.contract.delBytecode(data);
        ctx.return(result);
    }

    /**
     *
     * 部署合约
     * @memberof
     */
    async deployCnt() {
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
            contractName: 'string',
            bytecode: 'string',
            abi: 'string',
            accountName: 'string',
            contractType: "string",
            belong: 'string'
        }, data);
        if (errors) {
            // 验证失败
            ctx.return({
                code: ctx.VALIDATE_ERROR,
                message: '参数验证失败'
            })
        } else {
            let cstParam = data.cstParam;
            const result = await service.contract.deployCnt(data, cstParam);
            ctx.return(result);
        }
    }



    /**
     *
     *  删除已经部署合约
     * @memberof ContractController
     */
    async delDeployCntFromDB() {
        let {
            ctx,
            service
        } = this;
        let data = ctx.request.body;
        if (!data.id) {
            ctx.return({
                code: 1,
                message: '缺少id'
            })
            return;
        }
        if (!data.contractType) {
            ctx.return({
                code: 1,
                message: '缺少合约参数类型contractType'
            })
            return;
        }
        let dbmodel = null;
        if (data.contractType === 'sdr') {
            dbmodel = 'SdrCnt';
        } else if (data.contractType === 'pisa') {
            dbmodel = 'PisaCnt';
        } else if (data.contractType === 'confirmOrder') {
            dbmodel = 'ConfirmCnt';
        } else {
            ctx.return({
                code: 1,
                message: '合约参数contractType错误'
            })
            return;
        }
        const result = await service.contract.delDeployCntFromDB(data, dbmodel);
        ctx.return(result);
    }


    /**
     *
     * 已经部署合约
     * @memberof ContractController
     */
    async deployedCntList() {
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
            contractType: 'string',
        }, data)
        if (errors) {
            // 验证失败
            ctx.return({
                code: ctx.VALIDATE_ERROR,
                message: '参数验证失败'
            })
        } else {
            const result = await service.contract.deployedCntList(data);
            ctx.return(result);
        }

    }


    /**
     *
     *  执行合约方法 
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
            abi: 'string',
            contractType: 'string'
        }, data);
        if (errors) {
            ctx.return({
                code: ctx.VALIDATE_ERROR,
                message: errors
            })
        } else {
            const result = await service.contract.execute(data);
            ctx.return(result);
        }

    }


    /**
     *
     * 获取sdr 合伙人
     * @memberof ContractController
     */
    async getProPartner() {
        const {
            ctx,
            service
        } = this;

        let data = ctx.request.body;

        const result = await service.propartner.list(data);
        ctx.return(result);

    }


    /**
     *
     * 获取商户合伙人
     * @memberof ContractController
     */
    async getMerchantPartner() {
        const {
            ctx,
            service
        } = this;

        let data = ctx.request.body;

        const result = await service.merchantpartner.list(data);
        ctx.return(result);
    }


    /**
     * 创建sdr 合伙人
     *
     * @memberof ContractController
     */
    async createProPartner() {
        let {
            ctx,
            service
        } = this;

        let data = ctx.request.body;


        data.balanceof = Number(data.balanceof);
        data.projectId = Number(data.projectId);
        console.log(data);
        const result = await service.propartner.createOrUpdate(data);
        ctx.return(result);

    }







}

module.exports = ContractController;