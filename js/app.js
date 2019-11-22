requirejs.config({
    //path to modules
    baseUrl:'/js/app'
});

//js/app there's a file that I want to load
requirejs(['main', function(){
    console.log('all modules finished loading')
}]);