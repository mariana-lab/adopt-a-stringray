//every class starts with define, dependencies and a function
define(['services/activity-service','services/img-service', 'views/activity-list-view'], function (actService, imgService, listActView) {

    var internals = {};
    var externals = {};

    externals.start = function(){
        
       
        listActView.render();
        bindEvents();
    
    };

    function bindEvents(){
       

    }

    function buttonHandler(){
    }

    function formHandler(activityType, participants, price){
    }

    function listHandler(){
    }

    return externals;
});
