module.exports = {
    notEmpty: function(value){
        if( typeof value !== 'undefined' && value !== '' && value !== null){
            console.log("not empty")
            return true;
        }
        return false;
    },
    isEmpty: function(value){
        if( typeof value !== 'undefined' && value !== '' && value !== null) {
            return false;
        }
        return true;
    }
}