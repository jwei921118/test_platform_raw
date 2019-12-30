const {
    Service
} = require('egg');

class MerchantPartnerService extends Service {

    /**
     *
     *
     * @memberof MerchantPartnerService
     */
    async createOrUpdate(data, partner, increase) {
        const {
            ctx
        } = this;

        try {
            let result = null;
            if (!partner) {
                data.createdAt = new Date()
                result = await ctx.model.MerchantPartner.create(data, {
                    include: [{
                        model: ctx.model.PisaCnt
                    }]
                });

                return {
                    code: 0,
                    data: result
                }
                // 新建
            } else {
                if (increase) {
                    data.balanceof = partner.preBalanceof + data.balanceof
                } else {
                    data.balanceof = partner.preBalanceof - data.balanceof
                }
                data.updatedAt = new Date();
                await this.update(data, partner.id);
                return {
                    code: 0,
                    data
                }
            }
        } catch (error) {
            return ctx.helper.DB_ERROR;
        }

    }



    /**
     *
     *
     * @memberof MerchantPartnerService
     */
    async list(data) {
        let {
            ctx
        } = this;

        let param = {};
        if (data.merchantId) {
            param = {
                where: {
                    merchantId: data.merchantId
                }
            }
        }

        try {
            const result = await ctx.model.MerchantPartner.findAll(param);
            return {
                code: 0,
                data: result
            }
        } catch (error) {
            return ctx.helper.DB_ERROR;
        }
    }


    /**
     *
     *  更新
     * @param {*} data
     * @memberof MerchantPartnerService
     */
    async update(data, id) {
        let {
            ctx
        } = this;

        try {
            ctx.model.MerchantPartner.update({
                updatedAt: data.updatedAt,
                balanceof: data.balanceof
            }, {
                where: {
                    id: id
                }
            });
        } catch (error) {
            return ctx.helper.DB_ERROR;
        }

    }


    /**
     *  
     *  
     * @memberof MerchantPartnerService
     */
    async findOne(data) {
        let {
            ctx
        } = this;

        try {
            const result = await ctx.model.MerchantPartner.findOne({
                where: {
                    identity: data.identity
                }
            })
            return {
                code: 0,
                data: result
            }
        } catch (error) {
            return ctx.helper.DB_ERROR;
        }
    }




}

module.exports = MerchantPartnerService