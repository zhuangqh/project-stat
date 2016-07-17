/**
 * Created by zhuangqh on 16/7/16.
 */

var fs = require('fs');
var path = require('path');
var statistics = require('./statistics');

function getFolders(type, config) {
  if (type != "noHidden" && type != "all") return;

  config.folders = fs.readdirSync('.');
}

function analyze(config) {
  config.folders.forEach(function (ele) {
    analyzeHelper(ele, config.scanHidden);
  });
  console.log(statistics.counter);
}

function countByType(basePath) {
  var slashIndex = -1;
  var dotIndex = -1;
  var ext = '';

  slashIndex = basePath.lastIndexOf('/');
  if (slashIndex !== -1) {
    basePath = basePath.substr(slashIndex + 1);
  }

  dotIndex = basePath.lastIndexOf('.');
  if (dotIndex === -1) {
    statistics['counter']['PlainText']++;
  } else {
    ext = basePath.substr(dotIndex + 1);
    statistics['counter'][statistics.extTable[ext]]++;
  }
}

function analyzeHelper(basePath, noHidden) {

  if (noHidden && basePath[0] === '.')
    return;

  if (!fs.lstatSync(basePath).isDirectory()) {
    countByType(basePath);
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
