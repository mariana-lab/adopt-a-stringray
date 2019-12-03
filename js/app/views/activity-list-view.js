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

    internals.elements.app.append(renderSuccessDiv());
    internals.elements.success = $("#success-div");

    internals.elements.app.append(renderFailDiv());
    internals.elements.fail = $("#fail-div");

    internals.elements.app.append(renderBall());
    internals.elements.ray = $("#ball-of-death");

    internals.elements.app.append(renderRayCardsDiv());
    internals.elements.rayCards = $("#string-cards");
    internals.elements.rayCards.hide();
    internals.elements.rayCards.append(renderStringRayCards(stringrays));
    internals.elements.rayCards.show();
    internals.elements.ray.hide();
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
      '<form id="adoption-form">' +
      '<span class="inline-block">Vimdiesel:<br>' +
      '<select id="vimdiesel-adopter">';
    vimdiesels.forEach(
      element =>
        (form +=
          '<option value="' +
          element.nickname +
          '">' +
          element.nickname +
          "</option>")
    );
    form +=
      "</select></span>" +
      '<span class="inline-block">StringRay:<br>' +
      '<select id="stringray-adopted">';
    stringrays.forEach(
      element =>
        (form +=
          '<option value="' +
          element.nickname +
          '">' +
          element.nickname +
          "</option>")
    );
    form +=
      "</select></span>" +
      '<span class="inline-block">Barcode:<br><input type="text"></span>' +
      '<div><input type="submit" value="ADOPT"></div>' +
      "</form>";

    return form;
  }

  function renderRayCardsDiv() {
    return '<div id="string-cards"></div>';
  }

  function renderStringRayCards(stringrays) {
    var cards = "";
    var counter = 0;
    stringrays.forEach(
      element =>
        (cards +=
          renderCard(element) +
          ([3, 7, 10, 14, 17, 21].includes(++counter) ? "<br>" : ""))
    );
    return cards;
  }

  function renderCard(stringray) {
    var card =
      '<div class="card inline-block">' +
      '<img class="image content" src=' +
      stringray.img +
      ">" +
      (stringray.orphan === false
        ? '<img class="image content" src="img/adopted.png">'
        : "") +
      '<video class="video content" controls>' +
      '<source src="' +
      stringray.pitch +
      '" type="video/mp4">' +
      '"Your browser does not support HTML5 video."' +
      "</video>" +
      '<span class="text content">' +
      stringray.nickname +
      "</span>" +
      "</div>";
    return card;
  }

  function renderSuccessDiv() {
    return '<div id="success-div"></div>';
  }
  function renderFailDiv() {
    return '<div id="fail-div"></div>';
  }

  function renderCards(data) {}

  externals.renderText = function(data) {};

  externals.renderError = function(activityType, participants, price) {};

  externals.renderActivity = function(activity, src) {};

  function setIntervalX(callback, delay, repetitions) {}

  function bindButtonPushHandler(handler) {
    $("#adoption-form").submit(function(event) {
      event.preventDefault();
      var adoption = {};
      adoption.vimdieselname = event.currentTarget[0].value;
      adoption.stringrayname = event.currentTarget[1].value;
      adoption.promotioncode = "s" + event.currentTarget[2].value + "s";

       handler(adoption);
    });
  }

  function bindFormChangeHandler(handler) {}

  function loadListHandler(handler) {
    //setIntervalX(handler, 600, 10);
  }

  return externals;
});
