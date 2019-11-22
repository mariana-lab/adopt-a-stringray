//there is no code outside this function
define(function(){
    var internals = {};
    var externals = {};

    internals.routes = {
        list: {
            hash: '#list',
            controller: 'activity-list-ctrl'
        },
        details: {
            hash: '#details',
            controller: 'activity-details-ctrl'
        }
    };

    internals.defaultRoute = 'list';
    internals.currentHash = '';

    //Start routing process
    externals.start = function(){
        window.location.hash = window.hash || internals.routes[internals.defaultRoute].hash;
        //verifies if url changes
        setInterval(hashCheck , 100);
    };

    function hashCheck(){
        //if didn't change
       if(window.location.hash === internals.currentHash){
           return;
       }
       //verifies if route name exists
       var routeName = Object.keys(internals.routes).find(function(name){
           return window.location.hash === internals.routes[name].hash;
       });

       //loads the default if it doesn't
       if(!routeName){
           loadDefaultRouter();
           return;
       }

       loadController(internals.routes[routeName].controller);
    };

    //changes the hash
    function loadDefaultRouter(){
        window.location.hash = internals.routes[internals.defaultRoute].hash;
        loadController(internals.routes[internals.defaultRoute].controller);
    }

    function loadController(controllerName){
        internals.currentHash = window.location.hash;
        require(['controllers/' + controllerName], function(controller){
            try {
                controller.start();
            } catch (err) {
                console.log(err.stack);
                loadDefaultRouter();
            }
        });
    }

    return externals;
});