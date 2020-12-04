// 数组降维
// 数组去重
// url参数转对象
// 对象转成url参数
// 格式化现在距${endTime}的剩余时间
// 补全两位数
// 现金额转大写
// 判断是否为邮箱地址
// 判断是否为身份证号
// 判断是否为手机号
// 判断是否为URL地址
// 随机生成颜色
// 生成指定范围[min, max]的随机数
// 深拷贝，支持常见类型
// 判断`obj`是否为空
// 获取滚动条距顶部的距离
// H5软键盘缩回、弹起回调
// 获取浏览器类型和版本
// 获取操作系统类型
// 浏览器复制

//多维数组降级一维
function flatten(arr) { return [].concat( ...arr.map(x => Array.isArray(x) ? flatten(x) : x) ) }

/**
 * @description 重复数组去重
 * @param arr
 * @returns {Array}
 */
let noRepeat = function (arr) {
    if (arr instanceof Array) {
        var newArr = [];
        for (let i = 0, len = arr.length; i < len; i++) {
            let flag = false;
            for (let j = 0, len2 = newArr.length; j < len2; j++) {
                if (JSON.stringify(newArr[j]) == JSON.stringify(arr[i])) {
                    flag = true;
                    break;
                }
            }
            if (flag == false) {
                newArr.push(arr[i]);
            }
        }
        return newArr;
    } else {
        throw "noRepeat expect an array as param";
    }
}

/**
 *
 * @description   url参数转对象
 * @param  {String} url  default: window.location.href
 * @return {Object}
 */
let parseQueryString = function (url) {
    url = url == null ? window.location.href : url
    var search = url[0] === '?' ? url.substr(1) : url.substring(url.lastIndexOf('?') + 1)
    if (search === '') return {}
    search = search.split('&');
    var query = {};
    for (var i = 0; i < search.length; i++) {
        var pair = search[i].split('=');
        query[decodeURIComponent(pair[0])] = decodeURIComponent(pair[1] || '');
    }
    return query;
}

/**
 *
 * @description   对象序列化(对象转成url参数)
 * @param  {Object} obj
 * @return {String}
 */
let stringfyQueryString = function (obj) {
    if (!obj) return '';
    var pairs = [];

    for (var key in obj) {
        var value = obj[key];

        if (value instanceof Array) {
            for (var i = 0; i < value.length; ++i) {
                pairs.push(encodeURIComponent(key + '[' + i + ']') + '=' + encodeURIComponent(value[i]));
            }
            continue;
        }

        pairs.push(encodeURIComponent(key) + '=' + encodeURIComponent(obj[key]));
    }

    return pairs.join('&');
}

/**
 *
 * @description   格式化现在距${endTime}的剩余时间
 * @param  {Date} endTime
 * @return {String}
 */
let formatRemainTime = function (endTime) {
    var startDate = new Date(); //开始时间
    var endDate = new Date(endTime); //结束时间
    var t = endDate.getTime() - startDate.getTime(); //时间差
    var d = 0,
        h = 0,
        m = 0,
        s = 0;
    if (t >= 0) {
        d = Math.floor(t / 1000 / 3600 / 24);
        h = Math.floor(t / 1000 / 60 / 60 % 24);
        m = Math.floor(t / 1000 / 60 % 60);
        s = Math.floor(t / 1000 % 60);
    }
    return doubleNum(d) + "天 " + doubleNum(h) + "小时 " + doubleNum(m) + "分钟 " + doubleNum(s) + "秒";
}
/**
 * @description 补全两位数
 * @param n
 * @returns {*}
 */
let doubleNum = function (n) {
    if (n.length > 2 || n > 100) {
        return n;
    }
    n = parseInt(n);
    return n >= 10 ? n : `0${n}`;
}
/**
 *
 * @description   现金额转大写
 * @param  {Number} n
 * @return {String}
 */
let digitUppercase = function (n) {
    var fraction = ['角', '分'];
    var digit = [
        '零', '壹', '贰', '叁', '肆',
        '伍', '陆', '柒', '捌', '玖'
    ];
    var unit = [
        ['元', '万', '亿'],
        ['', '拾', '佰', '仟']
    ];
    var head = n < 0 ? '欠' : '';
    n = Math.abs(n);
    var s = '';
    for (var i = 0; i < fraction.length; i++) {
        s += (digit[Math.floor(n * 10 * Math.pow(10, i)) % 10] + fraction[i]).replace(/零./, '');
    }
    s = s || '整';
    n = Math.floor(n);
    for (var i = 0; i < unit[0].length && n > 0; i++) {
        var p = '';
        for (var j = 0; j < unit[1].length && n > 0; j++) {
            p = digit[n % 10] + unit[1][j] + p;
            n = Math.floor(n / 10);
        }
        s = p.replace(/(零.)*零$/, '').replace(/^$/, '零') + unit[0][i] + s;
    }
    return head + s.replace(/(零.)*零元/, '元')
        .replace(/(零.)+/g, '零')
        .replace(/^整$/, '零元整');
};

/**
 *
 * @desc   判断是否为邮箱地址
 * @param  {String}  str
 * @return {Boolean}
 */
let isEmail = function (str) {
    return /\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*/.test(str);
}

/**
 *
 * @description  判断是否为身份证号
 * @param  {String|Number} str
 * @return {Boolean}
 */
let isIdCard = function (str) {
    return /^(^[1-9]\d{7}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}$)|(^[1-9]\d{5}[1-9]\d{3}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])((\d{4})|\d{3}[Xx])$)$/.test(str)
}
/**
 *
 * @description   判断是否为手机号
 * @param  {String|Number} str
 * @return {Boolean}
 */
let isPhoneNum = function (str) {
    return /^(0|86|17951)?(13[0-9]|15[012356789]|17[678]|18[0-9]|14[57])[0-9]{8}$/.test(str)
}

/**
 *
 * @description   判断是否为URL地址
 * @param  {String} str
 * @return {Boolean}
 */
let isUrl = function (str) {
    return /[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/i.test(str);
}
/**
 *
 * @description 随机生成颜色
 * @return {String}
 */
let randomColor = function () {
    return '#' + ('00000' + (Math.random() * 0x1000000 << 0).toString(16)).slice(-6);
}

/**
 *
 * @description 生成指定范围[min, max]的随机数
 * @param  {Number} min
 * @param  {Number} max
 * @return {Number}
 */
let randomNum = function (min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

/**
 * @description 深拷贝，支持常见类型
 * @param {Any} values
 */
let deepClone = function (values) {
    var copy;

    // Handle the 3 simple types, and null or undefined
    if (null == values || "object" != typeof values) return values;

    // Handle Date
    if (values instanceof Date) {
        copy = new Date();
        copy.setTime(values.getTime());
        return copy;
    }

    // Handle Array
    if (values instanceof Array) {
        copy = [];
        for (var i = 0, len = values.length; i < len; i++) {
            copy[i] = deepClone(values[i]);
        }
        return copy;
    }

    // Handle Object
    if (values instanceof Object) {
        copy = {};
        for (var attr in values) {
            if (values.hasOwnProperty(attr)) copy[attr] = deepClone(values[attr]);
        }
        return copy;
    }

    throw new Error("Unable to copy values! Its type isn't supported.");
}

/** 
 *
 * @description   判断`obj`是否为空
 * @param  {Object} obj
 * @return {Boolean}
 */
let isEmptyObject = function (obj) {
    if (!obj || typeof obj !== 'object' || Array.isArray(obj))
        return false
    return !Object.keys(obj).length
}

/**
 *
 * @description 获取滚动条距顶部的距离
 */
let getScrollTop = function () {
    return (document.documentElement && document.documentElement.scrollTop) || document.body.scrollTop;
}

/**
 *
 * @description H5软键盘缩回、弹起回调
 * 当软件键盘弹起会改变当前 window.innerHeight，监听这个值变化
 * @param {Function} downCb 当软键盘弹起后，缩回的回调
 * @param {Function} upCb 当软键盘弹起的回调
 */
let windowResize = function (downCb, upCb) {
    var clientHeight = window.innerHeight;
    downCb = typeof downCb === 'function' ? downCb : function () {}
    upCb = typeof upCb === 'function' ? upCb : function () {}
    window.addEventListener('resize', () => {
        var height = window.innerHeight;
        if (height === clientHeight) {
            downCb();
        }
        if (height < clientHeight) {
            upCb();
        }
    });
}

/**
 *
 * @desc 获取浏览器类型和版本
 * @return {String}
 */
let getExplore = function () {
    var sys = {},
        ua = navigator.userAgent.toLowerCase(),
        s;
    (s = ua.match(/rv:([\d.]+)\) like gecko/)) ? sys.ie = s[1]:
        (s = ua.match(/msie ([\d\.]+)/)) ? sys.ie = s[1] :
        (s = ua.match(/edge\/([\d\.]+)/)) ? sys.edge = s[1] :
        (s = ua.match(/firefox\/([\d\.]+)/)) ? sys.firefox = s[1] :
        (s = ua.match(/(?:opera|opr).([\d\.]+)/)) ? sys.opera = s[1] :
        (s = ua.match(/chrome\/([\d\.]+)/)) ? sys.chrome = s[1] :
        (s = ua.match(/version\/([\d\.]+).*safari/)) ? sys.safari = s[1] : 0;
    // 根据关系进行判断
    if (sys.ie) return ('IE: ' + sys.ie)
    if (sys.edge) return ('EDGE: ' + sys.edge)
    if (sys.firefox) return ('Firefox: ' + sys.firefox)
    if (sys.chrome) return ('Chrome: ' + sys.chrome)
    if (sys.opera) return ('Opera: ' + sys.opera)
    if (sys.safari) return ('Safari: ' + sys.safari)
    return 'Unkonwn'
}
/**
 *
 * @description 获取操作系统类型
 * @return {String}
 */
let getOS = function () {
    var userAgent = 'navigator' in window && 'userAgent' in navigator && navigator.userAgent.toLowerCase() || '';
    var vendor = 'navigator' in window && 'vendor' in navigator && navigator.vendor.toLowerCase() || '';
    var appVersion = 'navigator' in window && 'appVersion' in navigator && navigator.appVersion.toLowerCase() || '';

    if (/iphone/i.test(userAgent) || /ipad/i.test(userAgent) || /ipod/i.test(userAgent)) return 'ios'
    if (/android/i.test(userAgent)) return 'android'
    if (/win/i.test(appVersion) && /phone/i.test(userAgent)) return 'windowsPhone'
    if (/mac/i.test(appVersion)) return 'MacOSX'
    if (/win/i.test(appVersion)) return 'windows'
    if (/linux/i.test(appVersion)) return 'linux'
}
/**
 * 复制
 * @param {String} value 要复制的值
 */
copyData(value) {
    const inputDom = document.createElement('input')
    inputDom.value = value
    document.body.appendChild(inputDom)
    inputDom.select() // 选择对象
    document.execCommand('Copy') // 执行浏览器复制命令
    document.body.removeChild(inputDom) // 删除DOM
    Message({
        type: 'success',
        message: '复制成功'
    })
}
复制代码






