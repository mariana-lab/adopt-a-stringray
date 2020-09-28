//every class starts with define, dependencies and a function
define(["services/activity-service", "views/activity-list-view"], function(
  actService,
  listActView
) {
  var internals = {};
  var externals = {};

  externals.start = function() {
    actService.fetchStringRays().done(function(data) {
      actService.fetchVimDiesels().done(function(data) {
        listActView.render(actService.vimdiesels, actService.stringrays);
        bindEvents();
      });
    });
  };

  function bindEvents() {
    //for each event on the page give a handler
    listActView.bind("adoptButtonPush", adoptHandler);
    listActView.bind("vimdieselsLinkPushed", adoptHandler);
    listActView.bind("stringRaysLinkPushed", adoptHandler);
    listActView.bind("playImgPush", videoHandler);
  }

  function adoptHandler(adoption) {
    actService.update().done(function() {
      var validation = actService.validate(adoption);
      listActView.showMessage(validation);

      if (validation.status) {
        //save both
        actService.saveVimdiesel(validation.vimdiesel);
        actService.saveStringray(validation.stringray);
        listActView.updateStringrayCard(validation.stringray);

        //ask view to render success message - validation.message
        //ask view to re render pictures
      }
      //ask view to render not successful - validation.message
    });
  }

  function videoHandler(id){
    return actService.getCadetById(id); 
  }

  function buttonHandler() {}

  function formHandler(activityType, participants, price) {}

  function listHandler() {}

  return externals;
});
