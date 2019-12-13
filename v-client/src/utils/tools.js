/*
 * @Author: fergus
 * @Date: 2019-09-05 15:02:02
 * @Last Modified by: mikey.zhaopeng
 * @Last Modified time: 2019-11-22 16:16:35
 */

import {
    Loading,
    Message,
    Notification,
    MessageBox
} from 'element-ui';
const md5 = require('md5');

let globalLoading = null;

/**
 *全屏加载动画
 * @param {String} msg 提示性文字
 */
function showLoading(msg) {
    globalLoading = Loading.service({
        lock: true,
        text: msg,
        spinner: 'el-icon-loading',
        background: 'rgba(0, 0, 0, 0.4)'
    });
    return globalLoading;
}

function closeLoading() {
    if (globalLoading) {
        globalLoading.close();
        globalLoading = null;
    }
}

/**
 *消息
 * @param {String} msg 提示文字
 * @param {String} type 类型四种 success, warning, info, error
 * @param {Number||String} duration 持续时间，时间到即自动消失，传'0'则不自动消失。
 */
function message(msg, type, duration) {
    return Message({
        showClose: true,
        message: msg,
        type: type || 'error',
        duration: duration || 2000
    });
}

/**
 * 通知
 * @param {String} msg 提示文字
 * @param {String} type 类型四种 success, warning, info, error
 * @param {String} title 通知标题
 * @param {Number||String} duration 持续时间，时间到即自动消失，传'0'则不自动消失。
 */
function notify(msg, type, title, duration) {
    return Notification({
        message: msg,
        type: type,
        title: title,
        duration: duration || 4500
    });
}

/**
 *
 * 对话
 * @param {*} msg 提示内容
 * @param {*} title 提示标题
 * @param {*} option 配置项
 * @returns
 */
function confirm(msg, title, option) {
    return MessageBox.confirm(msg, title, {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        confirmButtonClass: 'is-round',
        cancelButtonClass: 'is-round',
        type: option.type ? option.type : 'warning',
        dangerouslyUseHTMLString: true,
        center: true,
        iconClass: option.iconClass
    });
}

/**
 * 时间转换方法
 * @param val
 * @param type
 * @returns {string}
 */
function timeFormat(val, type) {
    val = Number(val);
    let date = new Date(val);

    let Y = date.getFullYear() + '-';

    let M =
        (date.getMonth() + 1 < 10 ?
            '0' + (date.getMonth() + 1) :
            date.getMonth() + 1) + '-';

    let D = (date.getDate() < 10 ? '0' + date.getDate() : date.getDate()) + ' ';

    let h =
        (date.getHours() < 10 ? '0' + date.getHours() : date.getHours()) + ':';

    let m =
        (date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes()) +
        ':';

    let s = date.getSeconds() < 10 ? '0' + date.getSeconds() : date.getSeconds();

    if (type === 'dateTime') {
        return Y + M + D + h + m + s;
    } else if (type === 'time') {
        return h + m + s;
    } else {
        return Y + M + D;
    }
}

/**
 *
 *格式转字符
 * @param {*} str
 * @returns
 */
function getUnixDate(str) {
    const regEx = new RegExp('\\-', 'gi');

    return Math.round(Date.parse(str.replace(regEx, '/')));
}
/**
 *
 * @param {*} t
 * @param {*} datetime
 */
function getDateStr(t, datetime) {
    let tm = t.getMonth() + 1;

    if (tm < 10) {
        tm = '0' + tm.toString();
    }
    let day = t.getDate();

    if (day < 10) {
        day = '0' + day.toString();
    }
    let tHour = t.getHours();

    if (tHour < 10) {
        tHour = '0' + tHour.toString();
    }
    let tMinutes = t.getMinutes();

    if (tMinutes < 10) {
        tMinutes = '0' + tMinutes.toString();
    }
    let tSeconds = t.getSeconds();

    if (tSeconds < 10) {
        tSeconds = '0' + tSeconds.toString();
    }
    if (datetime) {
        return (
            t.getFullYear() +
            '-' +
            tm +
            '-' +
            day +
            ' ' +
            tHour +
            ':' +
            tMinutes +
            ':' +
            tSeconds
        );
    } else {
        return t.getFullYear() + '-' + tm + '-' + day;
    }
}
/**
 * 时间戳转Date
 * @param {时间戳} nS
 */
function getLocalTime(nS) {
    return new Date(parseInt(nS, 10) * 1000)
        .toLocaleString()
        .replace(/:\d{1,2}$/, ' ');
}

/**
 * 深拷贝
 * @param {对象或数组} obj
 */
function deepClone(obj) {
    let _obj = JSON.stringify(obj),
        objClone = JSON.parse(_obj);

    return objClone;
}

/**
 *
 * @param {*} res 请求的数据
 */
function handlerMsg(res) {
    if (parseInt(res.code, 10) === 0) {
        return res;
    } else {
        message(res.message);
        return false;
    }
}

function deepCopy(obj) {
    let objClone = Array.isArray(obj) ? [] : {};

    if (obj && typeof obj === 'object') {
        for (let key in obj) {
            if (obj.hasOwnProperty(key)) {
                // 判断ojb子元素是否为对象，如果是，递归复制
                if (obj[key] && typeof obj[key] === 'object') {
                    objClone[key] = deepCopy(obj[key]);
                } else {
                    // 如果不是，简单复制
                    objClone[key] = obj[key];
                }
            }
        }
    }
    return objClone;
}

//校验密码
function isPassword(password) {
    let express = /^(?![0-9]+$)(?![a-z]+$)(?![A-Z]+$)(?![,\.#%'\+\*\-:;^_ `]+$)[,\.#%'\+\*\-:;^_ `0-9A-Za-z]{6,15}$/;
    let result = express.test(password);
    return result;
}

/**
 * exitFullscreen 全屏
 * @param  {Objct} element 选择器
 */
function fullscreen(element) {
    if (element.requestFullScreen) {
        element.requestFullScreen();
    } else if (element.webkitRequestFullScreen) {
        element.webkitRequestFullScreen();
    } else if (element.mozRequestFullScreen) {
        element.mozRequestFullScreen();
    } else if (element.msRequestFullscreen) {
        element.msRequestFullscreen();
    }
}

/**
 * exitFullscreen 退出全屏
 */
function exitFullscreen() {
    if (!isFullscreen()) {
        return;
    }
    if (document.exitFullscreen) {
        document.exitFullscreen();
    } else if (document.mozCancelFullScreen) {
        document.mozCancelFullScreen();
    } else if (document.webkitExitFullscreen) {
        document.webkitExitFullscreen();
    } else if (document.msExitFullscreen) {
        document.msExitFullscreen();
    }
}
/**
 * [isFullscreen 判断浏览器是否全屏]
 * @return [全屏则返回当前调用全屏的元素,不全屏返回false]
 */
function isFullscreen() {
    return (
        document.fullscreenElement ||
        document.msFullscreenElement ||
        document.mozFullScreenElement ||
        document.webkitFullscreenElement ||
        false
    );
}

/**
 *
 * 转换百分比
 * @param {*} v
 */
function transformPercentage(v) {
    return (Number(v) * 100).toFixed(2) + '%';
}

/**
 *
 * 生成md5
 * @param {*} v
 * @returns
 */
function createMd5(v) {
    return md5(v);
}

export default {
    getUnixDate,
    timeFormat,
    showLoading,
    closeLoading,
    message,
    notify,
    confirm,
    getDateStr,
    getLocalTime,
    deepClone,
    handlerMsg,
    deepCopy,
    isPassword,
    fullscreen,
    exitFullscreen,
    isFullscreen,
    transformPercentage,
    createMd5
};