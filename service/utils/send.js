function success(data) {
  return {
    code: 0,
    data,
    msg: "success",
  };
}

function error(data) {
  const result = {
    code: -1,
    data,
    msg: "error",
  };
  if (data.code) {
    result.code = data.code;
  }
  if (data.msg) {
    result.msg = data.msg;
  }

  return result;
}

module.exports = {
  success,
  error,
};
