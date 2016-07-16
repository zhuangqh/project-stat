/**
 * Created by zhuangqh on 16/7/16.
 */

var fs = require('fs');
var path = require('path');

var count = 0;

function getFolders(type, config) {
  if (type != "noHidden" && type != "all") return;

  config.folders = fs.readdirSync('.');
}

function analyze(config) {
  config.folders.forEach(function (ele) {
    analyzeHelper(ele, config.scanHidden);
  });
  console.log(count);
}

function analyzeHelper(basePath, noHidden) {

  if (noHidden && basePath[0] === '.')
    return;

  if (!fs.lstatSync(basePath).isDirectory()) {
    ++count;
    return;
  }

  var currentFolders = fs.readdirSync(basePath);

  currentFolders.forEach(function (ele) {
    analyzeHelper(path.join(basePath, ele), noHidden);
  });
}

module.exports = {
  getFolders: getFolders,
  analyze: analyze
};
