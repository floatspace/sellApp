/**
 * Created by FLS on 2017/11/5.
 * 解析url参数
 * @example ?id=123&a=b
 * @return Object {id:123,a:b}
 */
export function urlParse() {
  let url = window.location.search;
  let obj = {};
  let reg = /[?&][^?&]+=[^?&]+/g;
  let resArr = url.match(reg);
  // ['?id=123', '&a=b']
  if (resArr) {
    resArr.forEach((item) => {
      let _tempArr = item.substring(1).split('=');
      let key = decodeURIComponent(_tempArr[0]);
      let val = decodeURIComponent(_tempArr[1]);
      obj[key] = val;
    });
  }
  return obj;
};

/**
 * 日期格式转换方法
 * @example formateDate('1509886470616', 'yyyy-MM-dd hh:mm:ss')
 */
export function formateDate(date, fmt) {
  let dates = new Date(date);
  if (/(y+)/.test(fmt)) {
    fmt = fmt.replace(RegExp.$1, (dates.getFullYear() + '').substr(4 - RegExp.$1.length));
  }
  let obj = {
    'M+': dates.getMonth() + 1,
    'd+': dates.getDate(),
    'h+': dates.getHours(),
    'm+': dates.getMinutes(),
    's+': dates.getSeconds()
  };
  for (var k in obj) {
    if (new RegExp(`(${k})`).test(fmt)) {
      var _val = obj[k] + '';
      fmt = fmt.replace(RegExp.$1, RegExp.$1.length === 1 ? _val : padLeftZero(_val));
    }
  }
  return fmt;
};

function padLeftZero(val) {
  return ('00' + val).substr(val.length);
}
