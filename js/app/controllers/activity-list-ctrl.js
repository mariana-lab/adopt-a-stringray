//every class starts with define, dependencies and a function
define(["services/activity-service", "views/activity-list-view"], function(
  actService,
  listActView
) {
  var internals = {};
  var externals = {};

  externals.start = function() {
    listActView.render(actService.vimdiesels, actService.stringrays);
    console.log(actService.getName());
    bindEvents();
  };

  function bindEvents() {
    //for each event on the page give a handler
    listActView.bind("adoptButtonPush", adoptHandler);
  }

  function adoptHandler(adoption) {
    console.log(adoption);
    var validation = actService.validate(adoption);
    if(validation.status){
        //ask view to render success message - validation.message
        //ask view to re render pictures
    }
    //ask view to render not successful - validation.message
    
  }

  function buttonHandler() {}

  function formHandler(activityType, participants, price) {}

  function listHandler() {}

  return externals;
});
