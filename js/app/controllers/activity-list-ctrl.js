//every class starts with define, dependencies and a function
define(["services/activity-service", "views/activity-list-view"], function( actService, listActView) {
  var internals = {};
  var externals = {};

  externals.start = function() {
    listActView.render(actService.getVimdieselsJson() ,actService.getStringRaysJson());
    bindEvents();
  };

  function bindEvents() {
    //for each event on the page give a handler
    listActView.bind("adoptButtonPush", adoptHandler);
  }

  function adoptHandler(adoption) {
    //adoption.vimdieselname for checking the promotioncode
    //adoption.promotioncode for checkin if its possible to update
    //adoption.stringrayname for updating
  }

  function buttonHandler() {}

  function formHandler(activityType, participants, price) {}

  function listHandler() {}

  return externals;
});
