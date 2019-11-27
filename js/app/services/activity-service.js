//responsible for making ajax requests
define(function () {
    var internals = {};
    var externals = {};

    externals.getName = function(){
        return "lol";
    };

    //ajax request
    //manipulate response
    //id, name and pic of activity
    externals.findActivity = function(activityType, participants, price, cb, cberror) {
    };

    externals.getVimdieselsJson = function(){
        return JSON.parse(
            '{'+
               '"vimdiesels": ['+
               '{'+
               '"name": "ElasVim",'+
               '"nickname": "ondrej-tucek/elm-brunch-bulma-starter",'+
               '"img": "https://cdn70.picsart.com/197965591000202.jpg?c256x256",' +
               '"pitch": "vid/vid1.mp4",'+
               '"description": "A simple Elm skeleton project with Bulma framework and Sass.",'+
               '"orphan": "true",'+
               '"vimdiesel": "none"'+
               '},'+
               '{' +
               '"name": "EelesVim",'+
               '"nickname": "ondrej-tucek/elm-brunch-bulma-starter",'+
               '"img": "https://cdn70.picsart.com/197965591000202.jpg?c256x256",' +
               '"pitch": "vid/vid1.mp4",'+
               '"description": "A simple Elm skeleton project with Bulma framework and Sass.",'+
               '"orphan": "true",'+
               '"vimdiesel": "none"'+
               '}'+
                ']'+
            '}');
    };

    externals.getStringRaysJson = function(){
        return JSON.parse(
            '{'+
               '"stringrays": ['+
               '{'+
               '"name": "Elas",'+
               '"nickname": "zeux",'+
               '"img": "https://cdn70.picsart.com/197965591000202.jpg?c256x256",' +
               '"pitch": "vid/vid1.mp4",'+
               '"description": "A simple Elm skeleton project with Bulma framework and Sass.",'+
               '"orphan": "true",'+
               '"vimdiesel": "none"'+
               '},'+
               '{' +
               '"name": "Eeles",'+
               '"nickname": "zeux",'+
               '"img": "https://cdn70.picsart.com/197965591000202.jpg?c256x256",' +
               '"pitch": "vid/vid1.mp4",'+
               '"description": "A simple Elm skeleton project with Bulma framework and Sass.",'+
               '"orphan": "true",'+
               '"vimdiesel": "none"'+
               '}'+
                ']'+
            '}');
    };


    return externals;
});