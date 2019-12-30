const {
    Service
} = require('egg');

class PropartnerService extends Service {

    /**
     *
     *
     * @memberof PropartnerService
     */
    async createOrUpdate(data, partner) {
        const {
            ctx
        } = this;

        try {
            let result = null;
            if (!partner) {
                data.createdAt = new Date()
                result = await ctx.model.ProPartner.create(data, {
                    include: [{
                        model: ctx.model.SdrCnt
                    }]
                });

                return {
                    code: 0,
                    data: result
                }
                // 新建
            } else {
                data.balanceof = partner.preBalanceof + data.balanceof
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
     * @memberof PropartnerService
     */
    async list(data) {
        let {
            ctx
        } = this;

        let param = {};
        if (data.projectId) {
            param = {
                where: {
                    projectId: data.projectId
                }
            }
        }

        console.log(param);

        try {
            const result = await ctx.model.ProPartner.findAll(param);
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
     * @memberof PropartnerService
     */
    async update(data, id) {
        let {
            ctx
        } = this;

        try {
            ctx.model.ProPartner.update({
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
     * @memberof PropartnerService
     */
    async findOne(data) {
        let {
            ctx
        } = this;

        try {
            const result = await ctx.model.ProPartner.findOne({
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

module.exports = PropartnerService