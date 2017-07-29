var helper = {}

helper.isDefined = function (obj) {
  if (obj == null || obj == undefined)
    return false;
  return true;
};

helper.isEmpty = function (str) {
  if (utils.isDefined(str) && str != "" && str.length > 0) {
    return false;
  }
  return true;
};

module.exports = helper;