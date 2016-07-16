/**
 * Created by zhuangqh on 16/7/16.
 */

var inquirer = require('inquirer');
var analysis = require('./util/analysis');

var config = {
  scanHidden: false,
  folders: []
};

var whatToScanQuestion = [{
  type: "list",
  name: "options",
  message: "What do you want to scan ?",
  choices: [{
    name: "all files in this folder",
    value: "all"
  }, {
    name: "all files except hidden's",
    value: "noHidden"
  }, {
    name: "let me specify folders",
    value: "specify"
  }]
}];

var specifyFolderQuestion = [{
  type: "input",
  name: "foldersToScan",
  message: "Specify which folder to scan (separate by space):\n  "
}];

inquirer.prompt(whatToScanQuestion)
  .then(function (answer) {
    return Promise.resolve(answer["options"]);
  })
  .then(function (options) {
    if (options === "specify") {
      return inquirer.prompt(specifyFolderQuestion).then(function (answer) {
        config["folders"] = answer["foldersToScan"].split(" ");
      });
    } else {
      if (options === "noHidden") config.scanHidden = true;
      analysis.getFolders(options, config);
    }
  })
  .then(function () {
    analysis.analyze(config);
  })
  .catch(function (err) {
    console.log(err.stack);
  });
