var mathjs = require('mathjs');
module.exports = function(extend){
  extend.extendFunction('intToBinary', function(integer, delimeter, n){
    var temp = parseInt(integer).toString(2);
    if(n){
      var zeros = n - temp.length;
      for(var i = 0;i < zeros;i++){
        temp = "0" + temp;
      }
    }
    if(delimeter){
      return temp.split('').join(delimeter);
    } else return temp;
  });
  extend.extendFunction('intToBinaryArr', function(integer, n){
    var temp = parseInt(integer).toString(2);
    if(n){
      var zeros = n - temp.length;
      for(var i = 0;i < zeros;i++){
        temp = "0" + temp;
      }
    }
    return temp.split('');
  });

 extend.extendFunction('isArray', function(arr){
   return Array.isArray(arr);
  });
  extend.extendFunction('print', function(string){
    console.log(string);
    return "";
   });
   extend.extendFilter('multiplyChar', function(character, args){
     return Array(args[0]).fill(character).join(args[1]||' ');
   });
   extend.extendFunction('mathEvalRow', function(formula, row){
    if(formula && Array.isArray(row)){
      var scope = {};
      row.forEach(function(column, x){
        var key = String.fromCharCode(65 + x);
        scope[key] = column;
      });
      return mathjs.eval(formula, scope);
    } else return "";
  });
}
