// helper
const codeText = require('../constant/code.text');
module.exports = {
    ...codeText,
    int2hex: function (str) {
        var dec = str.toString().split(''),
            sum = [],
            hex = [],
            i, s
        while (dec.length) {
            s = 1 * dec.shift()
            for (i = 0; s || i < sum.length; i++) {
                s += (sum[i] || 0) * 10
                sum[i] = s % 16
                s = (s - sum[i]) / 16
            }
        }
        while (sum.length) {
            hex.push(sum.pop().toString(16))
        }
        let hexStr = hex.join('');
        if (hexStr.length < 64) {
            hexStr = '0x0' + hexStr;
        } else {
            hexStr = '0x' + hexStr;
        }
        return hexStr;
    }
};