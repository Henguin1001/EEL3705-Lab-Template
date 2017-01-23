var mathjs = require('mathjs');
module.exports = function(extend){
  var contains = function(arr, value){
    return arr.filter(function(e){
      return e==value;
    }).length != 0;
  };
  extend.extendFilter('row', function(arr){
    return arr.join('&');
  });
  extend.extendFunction('selectColumns', function(arr, items){
    if(Array.isArray(arr) && Array.isArray(items)){
      return test =  arr.map(function(row){
        return row.filter(function(column, i){
          return contains(items, i);
        });
      });
    } else return [[]];
   });

  extend.extendFunction('addColumnMath', function(arr, formula, start, end){
    if(Array.isArray(arr)){
      if(Array.isArray(formula)){
        return arr.map(function(row, y){
          var scope = {y:y};
          row.forEach(function(column, x){
            var key = String.fromCharCode(65 + x);
            scope[key] = column;
          });
          var temp = row.slice();
          if((start && y < start)||(end && y > end)){
            temp.push("");
          } else {
            temp = temp.concat(formula.map(function(form){
              return mathjs.eval(form, scope);
            }));
          }
          return temp;
        });
      } else {
        return arr.map(function(row, y){
          var scope = {y:y};
          row.forEach(function(column, x){
            var key = String.fromCharCode(65 + x);
            scope[key] = column;
          });
          var temp = row.slice();
          if((start && y < start)||(end && y > end)){
            temp.push("");
          } else {
            temp.push(mathjs.eval(formula, scope));
          }
          return temp;
        });
      }
    } else return [[]];
   });
  extend.extendFunction('editCell', function(arr, row, column, value){
    if(Array.isArray(arr)){
      arr[row][column] = value;
    } else return "";
   });

}
