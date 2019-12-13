// 扩展context
const Codes = require('../constant/codes');
module.exports = {

    ...Codes,
    /**
     *
     *
     * @param {*} result
     */
    return (result) {
        // status 为0返回 成功
        if (result.code === 0) {
            this._success(result.data);
        } else {
            this._fail(result.code, result.message);
        }
    },
    /**
     *
     *
     * @param {*} data
     * @param {*} msg
     * @param {*} args
     */
    _success(data, msg, ...args) {
        const {
            response: res
        } = this;
        res.status = 200;
        res.type = 'application/json';
        const message = (msg => {
            if (typeof msg !== 'string') {
                const result = this.gettext(`messages.${Codes.SUCCESS}`, ...args);
                if (result === `messages.${Codes.SUCCESS}`) {
                    return msg;
                }
                return result;
            }
            return msg;
        })(msg);

        res.body = {
            code: Codes.SUCCESS,
            message,
            data,
        };
    },
    /**
     *
     *
     * @param {*} error
     * @param {*} code
     * @param {*} args
     */
    _fail(code, ...args) {
        const {
            response: res
        } = this;
        const message = (code => {
            const result = this.gettext(...args);
            if (!result) {
                return `Unknown Error Code: ${code}`;
            }
            return result;
        })(code);
        const result = {
            code,
            message,
        };
        res.status = 200;
        res.type = 'application/json';
        res.body = result;
    },
}