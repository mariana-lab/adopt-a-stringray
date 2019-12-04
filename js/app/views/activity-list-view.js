define(function() {
  internals = {};
  externals = {};

  internals.elements = {};
  internals.handlers = {};

  internals.events = {
    //event and the associated bind function
    adoptButtonPush: bindButtonPushHandler,
    vimdieselsLinkPushed: bindVimdieselsLinkHandler,
    stringRaysLinkPushed: bindStringraysLinkHandler
  };

  //good idea to invoke this function for last on the controller
  //after all the buttons are created
  externals.bind = function(event, handler) {
    internals.events[event](handler);
  };

  externals.render = function(vimdiesels, stringrays) {
    internals.elements.app = $("#app");
    internals.elements.app.append(renderForm(vimdiesels, stringrays));
    internals.elements.form = $("#adoption-form");
    internals.elements.form.hide();

    internals.elements.app.append(renderSuccessDiv());
    internals.elements.success = $("#success-div");

    internals.elements.app.append(renderFailDiv());
    internals.elements.fail = $("#fail-div");

    internals.elements.app.append(renderBall());
    internals.elements.ray = $("#ball-of-death");

    internals.elements.app.append(renderCardsDiv("vim"));
    internals.elements.vimCards = $("#vim-cards");
    internals.elements.vimCards.hide();
    internals.elements.vimCards.append(
      renderCards([4, 7, 11, 14, 18, 21], vimdiesels)
    );

    internals.elements.app.append(renderCardsDiv("string"));
    internals.elements.rayCards = $("#string-cards");
    internals.elements.rayCards.hide();

    internals.elements.rayCards.append(
      renderCards([3, 7, 10, 14, 17, 21], stringrays)
    );
    //internals.elements.rayCards.show();
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
      '<select id="vimdiesel-adopter">' +
      '<option selected="selected" disabled>VIMdiesel</option>"';
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
      '<select id="stringray-adopted">' +
      '<option selected="selected" disabled>STRINGray</option>"';
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
      '<span class="inline-block"><input type="text" value="PASSWORD"' +
      "onblur=\"if(this.value==''){ this.value='PASSWORD'; this.style.color='#BBB';}\"" +
      "onfocus=\"if(this.value=='PASSWORD'){ this.value=''; this.style.color='#000';}\"" +
      'style="color:#BBB;"></span>' +
      '<div><input type="submit" value="ADOPT"></div>' +
      "</form>";

    return form;
  }

  function renderCardsDiv(cadets) {
    return '<div id="' + cadets + '-cards"></div>';
  }

  function renderCards(array, cadets) {
    var cards = "";
    var counter = 0;
    cadets.forEach(
      element =>
        (cards +=
          renderCard(element) + (array.includes(++counter) ? "<br>" : ""))
    );
    return cards;
  }

  function renderCard(cadet) {
    var card =
      '<div id="' +
      cadet._id +
      '" class="card inline-block">' +
      createCardContent(cadet) +
      "</div>";
    return card;
  }

  function createCardContent(cadet) {
    var extraImg =
      cadet.orphan === false
        ? '<img class="image content" src="img/adopted.png">'
        : "";
    if (cadet.stringrays) {
      extraImg =
        cadet.stringrays.length > 0
          ? '<img class="image content" src="img/stringraymomma.png">'
          : extraImg;
    }
    return (
      '<img class="image content" src=' +
      cadet.img +
      ">" +
      extraImg +
      '<video class="video content" controls>' +
      '<source src="' +
      cadet.pitch +
      '" type="video/mp4">' +
      '"Your browser does not support HTML5 video."' +
      "</video>" +
      '<span class="text content">' +
      cadet.nickname +
      "</span>"
    );
  }

  externals.updateStringrayCard = function(stringray) {
    var card = $("#" + stringray._id + "");
    card.empty();
    card.append(createCardContent(stringray));
  };

  externals.showMessage = function(validation) {
    console.log(validation);
    var div = validation.status
      ? internals.elements.fail
      : internals.elements.fail;
    div.empty();
    div.append(validation.message);
  };

  function renderSuccessDiv() {
    return '<div id="success-div"></div>';
  }
  function renderFailDiv() {
    return '<div id="fail-div"></div>';
  }

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

  function bindVimdieselsLinkHandler(handler) {
    $("#vimdiesels-title").click(function(event) {
      internals.elements.form.hide();
      internals.elements.vimCards.show();
      internals.elements.rayCards.hide();
    });
  }

  function bindStringraysLinkHandler(handler) {
    $("#stringrays-title").click(function(event) {
      internals.elements.form.show();
      internals.elements.vimCards.hide();
      internals.elements.rayCards.show();
    });
  }

  function bindFormChangeHandler(handler) {}

  function loadListHandler(handler) {}

  return externals;
});
