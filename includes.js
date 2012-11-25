/*
 *  A utitlity
 *  For requiring/including all javascript files in a given directory
 *  USAGE: require('./includes.js')(__dirname);
 */

/*global app*/
"use strict";

(function(){
  module.exports = function(directory){
    traverseDirectory(directory);
  };

  function traverseDirectory(directory){
    var stat = app.fs.statSync(directory);
    if(stat.isDirectory()){
      var contents = app.fs.readdirSync(directory);
      contents.forEach(function(childFile){
        var result = traverseDirectory(directory+'/'+childFile);
        if(!result){
          return false;
        }
      });
    }else{
      match(/[^_][a-zA-Z0-9]*\.js/, directory);
    }
  }

  function match(pattern, filepath){
    if(pattern.test(filepath)){
      console.log(filepath + ' was required');
      require(filepath);
    }
    return;
  }
})();
