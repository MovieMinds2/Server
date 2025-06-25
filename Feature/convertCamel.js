const snakeToCamel = (obj) => {
  if (Array.isArray(obj)) {
    //객체 배열도 재귀로 해결
    return obj.map((v) => snakeToCamel(v));
  } else if (obj !== null && typeof obj === "object") {
    return Object.keys(obj).reduce((result, key) => {
      let camelKey = key.replace(/([-_]\w)/g, (matches) =>
        matches[1].toUpperCase()
      );
      let value = obj[key];

      // 중첩된 객체에 대해 재귀적으로 snakeToCamel 함수 호출
      if (value !== null && typeof value === "object") {
        value = snakeToCamel(value);
      }

      result[camelKey] = value;
      return result;
    }, {});
  }
  return obj;
};

module.exports = snakeToCamel;
