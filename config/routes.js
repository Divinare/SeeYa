module.exports.routes = {

    '/' : {
         view: 'homepage'
    },
    '/home' : {
         view: 'home/app'
    },
    '/signup' : {
         controller: 'main',
         action: 'signup'
    },
    '/login' : {
         controller: 'main',
         action: 'login'
    },
    '/chat' : {
         controller: 'main',
         action: 'chat'
    }
};

/*
module.exports.routes = {

  '/': {
    view: 'homepage'
  }

};
*/