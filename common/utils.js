module.exports = {
    notEmpty: function(value){
        if( typeof value !== 'undefined' && value !== '' && value !== null){
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