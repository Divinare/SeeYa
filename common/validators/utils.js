


module.exports = {
    notEmpty: function(value){
        if( typeof value !== 'undefined' && value !== '' ){
            console.log("not empty")
            return true;
        }
        return false;
    }
}