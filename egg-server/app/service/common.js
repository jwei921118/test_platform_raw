const {
    Service
} = require('egg');

class BlockChainService extends Service {

    /**
     *
     * 数据上链
     * @memberof BlockChainService
     */
    async dataOnChain(data) {
        let {
            ctx,
            service
        } = this;
        console.log(data);
        let pisaCntInfo = (await ctx.model.PisaCnt.findOne({
            where: {
                id: data.merchantId
            },
            include: [{
                model: ctx.model.SdrCnt
            }]
        })).dataValues;

        // 生成pisa参数
        let pisaParam = {
            methodName: data.clearanceType,
            param: {
                account: data.account
            },
            contractName: pisaCntInfo.contractName,
            accountName: pisaCntInfo.deployer,
            contractType: 'pisa',
            abi: pisaCntInfo.abi,
            id: pisaCntInfo.id
        };

        const sdrCntInfo = pisaCntInfo.sdrCnt.dataValues;

        let sdrParam = {
            methodName: 'mintAvailable',
            param: {
                identity: pisaCntInfo.identity,
                account: data.account
            },
            contractName: sdrCntInfo.contractName,
            accountName: sdrCntInfo.deployer,
            abi: sdrCntInfo.abi,
            id: sdrCntInfo.id,
            contractType: 'sdr'
        }

        let result = await service.contract.execute(sdrParam);

        if (result.code !== 0) {
            return {
                code: 1,
                message: '增发稳定币失败'
            }
        }
        // 执行清分操作
        return await service.contract.execute(pisaParam);

    }


}

module.exports = BlockChainService;