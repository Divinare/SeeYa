var generateTimes = function(amount) {
     var array = [];
     for(var h = 0; h <= amount; h++) {
          var temp = {};
          temp['label'] = h;
          temp['value'] = h;
          array.push(h);
     }

     return array;
}


module.exports = {

  'hour24': generateTimes(23)

};