/**
 * Created by zhuangqh on 16/7/17.
 */

var clc = require('cli-color');

// painter's index
var painterTable = {
  C: 242,
  'C#': 64,
  CSS: 96,
  CoffeeScript: 173,
  Cpp: 204,
  HTML: 202,
  Haskell: 70,
  JSON: 94,
  JavaScript: 227,
  Markdown: 246,
  PlainText: 231,
  Python: 31,
  Shell: 112,
  Text: 231,
  TypeScript: 23,
  XML: 94,
  Yml: 94
};

function report(counter) {
  delete counter['undefined'];
  var arr = Object.keys(counter).map(function (key) {
    return {
      type: key,
      count: counter[key]
    }
  });

  // sort by count descending
  arr.sort(function (a, b) {
    if (a.count < b.count) {
      return 1;
    }
    if (a.count > b.count) {
      return -1;
    }

    return 0;
  });

  var maxCount = arr[0].count;
  var screenWidth = clc.windowSize.width;

  arr.forEach(function (info) {
    var length = Math.ceil(info.count / maxCount * screenWidth);
    var painter = null;

    if (length > 0 && length <= screenWidth) {
      painter = clc.bgXterm(painterTable[info.type]);
      console.log(info.type + ": " + info.count);
      console.log(painter(new Array(length + 1).join(' ')));
    }
  });
}

module.exports.report = report;
