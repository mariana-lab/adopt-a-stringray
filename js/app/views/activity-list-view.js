define(function() {
  internals = {};
  externals = {};

  internals.elements = {};
  internals.handlers = {};

  internals.events = {
    //event and the associated bind function
    adoptButtonPush: bindButtonPushHandler
  };

  //good idea to invoke this function for last on the controller
  //after all the buttons are created
  externals.bind = function(event, handler) {
    internals.events[event](handler);
  };

  externals.render = function(vimdiesels, stringrays) {
    internals.elements.app = $("#app");
    internals.elements.app.append(renderForm(vimdiesels, stringrays));

    internals.elements.app.append(renderBall());
    internals.elements.ray = $("#ball-of-death");

    internals.elements.app.append(renderStringRayCards(stringrays));
    internals.elements.rayCards = $("#string-cards");
  };

  function renderBall() {
    var ray =
      '<img id="ball-of-death"' +
      'alt="" data-type="image" ' +
      'src="/img/waitingray.gif"><br>';

    return ray;
  }

  function renderForm(vimdiesels, stringrays) {
    var form =
      '<form action="/action_page.php" id="adoption-form">' +
      '<span class="inline-block">Vimdiesel:<br><select name="vimdiesel" form="carform">';
    vimdiesels.vimdiesels.forEach(
      element =>
        (form +=
          '<option value="' + element.name + '">' + element.name + "</option>")
    );
    form +=
      "</select></span>" +
      '<span class="inline-block">StringRay:<br><select name="stringray" form="carform">';
    stringrays.stringrays.forEach(
      element =>
        (form +=
          '<option value="' + element.name + '">' + element.name + "</option>")
    );
    form +=
      "</select></span>" +
      '<span class="inline-block">Barcode:<br><input type="text" name="fname"></span>' +
      '<div><input type="submit"></div>' +
      "</form>";

    return form;
  }

  function renderStringRayCards(stringrays) {
    var cards = '<div id="string-cards"';
    var counter = 0;
    stringrays.stringrays.forEach(
      element =>
        (cards += renderCard(element) + (++counter % 3 === 0 ? "<br>" : ""))
    );
    return cards + "</div>";
  }

  function renderCard(stringray) {
    var card =
      '<div class="card inline-block">' +
      '<span class="text content">' +
      stringray.nickname +
      "</span>" +
      '<img class="image content" src=' +
      stringray.img +
      ">" +
      '<video class="video content" controls>' +
      '<source src="' +
      stringray.pitch +
      '" type="video/mp4">' +
      '"Your browser does not support HTML5 video."' +
      "</video>" +
      "</div>";
    return card;
  }

  function renderButton() {}

  function renderCards(data) {}

  externals.renderText = function(data) {};

  externals.renderError = function(activityType, participants, price) {};

  externals.renderActivity = function(activity, src) {};

  function setIntervalX(callback, delay, repetitions) {}

  function bindButtonPushHandler(handler) {
    //form on submit
    $("#adopt-form").click(function(event) {
      var adoption = {};
      //adoption.vimdieselname = event.target.value;
      //adoption.stringrayname = event.target.value;
      //adoption.promotioncode = event.target.value;
      handler(adoption);
    });
  }

  function bindFormChangeHandler(handler) {}

  function loadListHandler(handler) {
    //setIntervalX(handler, 600, 10);
  }

  return externals;
});
