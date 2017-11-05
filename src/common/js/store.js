/**
 * Created by FLS on 2017/11/5.
 */
export function saveToLocal (id, key, val) {
  let seller = window.localStorage.__seller__;
  if (!seller) {
    seller = {};
    seller[id] = {};
  } else {
    seller = JSON.parse(seller);
    if (!seller[id]) {
      seller[id] = {};
    }
  }
  seller[id][key] = val;
  window.localStorage.__seller__ = JSON.stringify(seller);
};

export function loadFromLocal (id, key, defaults) {
  let seller = window.localStorage.__seller__;
  if (!seller) {
    return defaults;
  }
  seller = JSON.parse(seller);
  if (!seller[id]) {
    return defaults;
  }
  return seller[id][key] || defaults;
};
