//responsible for making ajax requests
define(function() {
  var internals = {};
  var externals = {};

  internals.api = "http://localhost:1234";

  externals.getName = function() {
    $.ajax({
      url: "http://localhost:1234/vimdiesels/",
      success: function(resultData) {
        console.log(resultData);
      },
      error: function(resultData) {
        console.log(resultData);
      }
    });
  };



  externals.fetchVimDiesels = function() {
    return $.ajax({
      url: internals.api + "/vimdiesels/",
      success: function(data) {
        externals.vimdiesels = data;
      },
      error: function(resultData) {
        console.log(resultData);
      }
    });
  };

  externals.getCadetById = function(id){
    var cadet = {};
    externals.vimdiesels.forEach(element => {
      if(element._id === id){
          cadet = element;
      }
    });

    externals.stringrays.forEach(element => {
      if(element._id === id){
          cadet = element;
      }
    });
    return cadet;
  }

  externals.fetchStringRays = function() {
    return $.ajax({
      url: internals.api + "/stringrays/",
      success: function(data) {
        externals.stringrays = data;
      },
      error: function(resultData) {
        console.log(resultData);
      }
    });
  };

  externals.update = function() {
    return externals.fetchStringRays().done(externals.fetchVimDiesels);
  };

  internals.setUpValidation = function(adoption) {
    var validation = {};
    validation.status = false;
    validation.message = "";
    validation.vimdiesel = internals.get(
      externals.vimdiesels,
      adoption.vimdieselname
    );
    validation.stringray = internals.get(
      externals.stringrays,
      adoption.stringrayname
    );
    return validation;
  };

  externals.validate = function(adoption) {
      var validation = internals.setUpValidation(adoption);
      var vimdiesel = validation.vimdiesel;
      var stringray = validation.stringray;

      if (vimdiesel === undefined || stringray === undefined) {
        validation.message = "One of the cadets doesn't exist.";
        return validation;
      }

      if (
        vimdiesel.description !== adoption.promotioncode
      ) {
        validation.message =
          "Ups... the adoption code is wrong... ask mari what's going on.";
        return validation;
      }

      if (stringray.vimdiesel === vimdiesel.nickname) {
        validation.status = true;
        validation.message =
          vimdiesel.nickname +
          " canceled the adoption of " +
          stringray.nickname +
          ". Now he's free and homeless";
        stringray.orphan = true;
        stringray.vimdiesel = "none";
        vimdiesel.stringrays = vimdiesel.stringrays.filter(
          stringrayNickname => stringrayNickname !== stringray.nickname
        );
        return validation;
      }

      if (stringray.vimdiesel === "") {
        validation.message =
          stringray.nickname +
          " Doesn't need no home.";
        return validation;
      }


      if (stringray.vimdiesel !== "none") {
        validation.message =
          stringray.vimdiesel +
          " was here first! you can't adopt " +
          stringray.nickname +
          "<br> How are you going to solve this impasse!?";
        return validation;
      }

      

      validation.status = true;
      validation.message =
        vimdiesel.nickname + " successfully adopted " + stringray.nickname;
      stringray.orphan = false;
      stringray.vimdiesel = vimdiesel.nickname;
      vimdiesel.stringrays.push(stringray.nickname);
      return validation;
    
  };

  internals.get = function(group, nickname) {
    return group.find(element => element.nickname === nickname);
  };
  
  externals.saveVimdiesel = function(vimdiesel){
    return $.ajax({
      url: internals.api + "/vimdiesels/" + vimdiesel._id + "/update",
      type: 'PUT',
      contentType: "application/json",
      data: JSON.stringify({stringrays: vimdiesel.stringrays}),
      success: function(resultData) {
        console.log(resultData);
        externals.fetchVimDiesels();
      },
      error: function(resultData) {
        console.log(resultData);
      }
    });
  };

  externals.saveStringray = function(stringray){
    return $.ajax({
      url: internals.api + "/stringrays/" + stringray._id + "/update",
      type: 'PUT',
      contentType: "application/json",
      data: JSON.stringify(stringray),
      success: function(resultData) {
        console.log(resultData);
        externals.fetchStringRays();
      },
      error: function(resultData) {
        console.log(resultData);
      }
    });
  };


  internals.getVimdieselsFromJson = function() {
    return JSON.parse(
      "{" +
        '"vimdiesels": [' +
        "{" +
        '"name": "Mariana Antas Barros",' +
        '"nickname": "MARI",' +
        '"img": "https://cdn70.picsart.com/197965591000202.jpg?c256x256",' +
        '"pitch": "vid/david.mp4",' +
        '"description": "-",' +
        '"stringrays": []' +
        "}," +
        "{" +
        '"name": "João Pedro Lopes Faustino",' +
        '"nickname": "FAUSTINO",' +
        '"img": "https://cdn70.picsart.com/197965591000202.jpg?c256x256",' +
        '"pitch": "vid/sid.mp4",' +
        '"description": "-",' +
        '"stringrays": []' +
        "}," +
        "{" +
        '"name": "Fernando Abreu",' +
        '"nickname": "FERNANDZ",' +
        '"img": "https://cdn70.picsart.com/197965591000202.jpg?c256x256",' +
        '"pitch": "vid/jorge.mp4",' +
        '"description": "-",' +
        '"stringrays": []' +
        "}," +
        "{" +
        '"name": "Alexandra Almeida",' +
        '"nickname": "Bigodes",' +
        '"img": "img/josue_almeida.png",' +
        '"pitch": "vid/josue_almeida.mp4",' +
        '"description": "-",' +
        '"stringrays": []' +
        "}," +
        "{" +
        '"name": "David",' +
        '"nickname": "DAVID",' +
        '"img": "img/ricardo_dias.png",' +
        '"pitch": "vid/ricardo_dias.mp4",' +
        '"description": "A simple Elm skeleton project with Bulma framework and Sass.",' +
        '"stringrays": []' +
        "}," +
        "{" +
        '"name": "Diogo Sousa",' +
        '"nickname": "DANONES",' +
        '"img": "img/lais_nascimento.png",' +
        '"pitch": "vid/lais_nascimento.mp4",' +
        '"description": "A simple Elm skeleton project with Bulma framework and Sass.",' +
        '"stringrays": []' +
        "}," +
        "{" +
        '"name": "Diogo Basílio",' +
        '"nickname": "BASÍLIO",' +
        '"img": "img/filipe_lopes.png",' +
        '"pitch": "vid/filipe_lopes.mp4",' +
        '"description": "A simple Elm skeleton project with Bulma framework and Sass.",' +
        '"stringrays": []' +
        "}," +
        "{" +
        '"name": "Joseph",' +
        '"nickname": "JOSEPH",' +
        '"img": "img/eduardo_zacarias.png",' +
        '"pitch": "vid/eduardo_zacarias.mp4",' +
        '"description": "A simple Elm skeleton project with Bulma framework and Sass.",' +
        '"stringrays": []' +
        "}," +
        "{" +
        '"name": "Pedro Miranda",' +
        '"nickname": "TRIGO",' +
        '"img": "img/mariana_barcelos.png",' +
        '"pitch": "vid/mariana_barcelos.mp4",' +
        '"description": "A simple Elm skeleton project with Bulma framework and Sass.",' +
        '"stringrays": []' +
        "}," +
        "{" +
        '"name": "Pedro Sousa",' +
        '"nickname": "NORMAL PETER",' +
        '"img": "img/vando_clemente.png",' +
        '"pitch": "vid/vando_clemente.mp4",' +
        '"description": "A simple Elm skeleton project with Bulma framework and Sass.",' +
        '"stringrays": []' +
        "}," +
        "{" +
        '"name": "Orlando Vieira",' +
        '"nickname": "LANDO",' +
        '"img": "img/ricardo_santos.png",' +
        '"pitch": "vid/ricardo_santos.mp4",' +
        '"description": "A simple Elm skeleton project with Bulma framework and Sass.",' +
        '"stringrays": []' +
        "}," +
        "{" +
        '"name": "Catarina",' +
        '"nickname": "CATARINA",' +
        '"img": "img/luis_reis.png",' +
        '"pitch": "vid/luis_reis.mp4",' +
        '"description": "A simple Elm skeleton project with Bulma framework and Sass.",' +
        '"stringrays": []' +
        "}," +
        "{" +
        '"name": "Tiago Azevedo",' +
        '"nickname": "TIAGO",' +
        '"img": "img/pedro_supico.png",' +
        '"pitch": "vid/pedro_supico.mp4",' +
        '"description": "A simple Elm skeleton project with Bulma framework and Sass.",' +
        '"stringrays": []' +
        "}," +
        "{" +
        '"name": "Leandro Múrias",' +
        '"nickname": "LEANDRO",' +
        '"img": "img/denise_machado.png",' +
        '"pitch": "vid/denise_machado.mp4",' +
        '"description": "A simple Elm skeleton project with Bulma framework and Sass.",' +
        '"vimdiesel": "catarina"' +
        "}," +
        "{" +
        '"name": "João Leandro",' +
        '"nickname": "JOHNNY LEE",' +
        '"img": "img/paulo_resende.png",' +
        '"pitch": "vid/paulo_resende.mp4",' +
        '"description": "A simple Elm skeleton project with Bulma framework and Sass.",' +
        '"stringrays": []' +
        "}," +
        "{" +
        '"name": "Diogo Bessa",' +
        '"nickname": "BESSA",' +
        '"img": "img/joao_madeira.png",' +
        '"pitch": "vid/joao_madeira.mp4",' +
        '"description": "A simple Elm skeleton project with Bulma framework and Sass.",' +
        '"stringrays": []' +
        "}," +
        "{" +
        '"name": "Vitor",' +
        '"nickname": "BITINHO",' +
        '"img": "img/johny.png",' +
        '"pitch": "vid/johny.mp4",' +
        '"description": "A simple Elm skeleton project with Bulma framework and Sass.",' +
        '"stringrays": []' +
        "}," +
        "{" +
        '"name": "Sara Correia",' +
        '"nickname": "SARINHA",' +
        '"img": "img/carlos_cardoso.png",' +
        '"pitch": "vid/carlos_cardoso.mp4",' +
        '"description": "A simple Elm skeleton project with Bulma framework and Sass.",' +
        '"stringrays": []' +
        "}," +
        "{" +
        '"name": "André Martins",' +
        '"nickname": "BERLIM",' +
        '"img": "img/bernardo_telo.png",' +
        '"pitch": "vid/bernardo_telo.mp4",' +
        '"description": "A simple Elm skeleton project with Bulma framework and Sass.",' +
        '"stringrays": []' +
        "}," +
        "{" +
        '"name": "André Júlio",' +
        '"nickname": "ANDÉ",' +
        '"img": "img/bernardo_telo.png",' +
        '"pitch": "vid/bernardo_telo.mp4",' +
        '"description": "A simple Elm skeleton project with Bulma framework and Sass.",' +
        '"stringrays": []' +
        "}" +
        "]" +
        "}"
    );
  };

  internals.getStringRaysFromJson = function() {
    return JSON.parse(
      "{" +
        '"stringrays": [' +
        "{" +
        '"name": "David",' +
        '"nickname": "DAVID",' +
        '"img": "https://cdn70.picsart.com/197965591000202.jpg?c256x256",' +
        '"pitch": "vid/david.mp4",' +
        '"description": "-",' +
        '"orphan": "false",' +
        '"vimdiesel": "none"' +
        "}," +
        "{" +
        '"name": "Sid",' +
        '"nickname": "SID",' +
        '"img": "https://cdn70.picsart.com/197965591000202.jpg?c256x256",' +
        '"pitch": "vid/sid.mp4",' +
        '"description": "-",' +
        '"orphan": "false",' +
        '"vimdiesel": "none"' +
        "}," +
        "{" +
        '"name": "Jorge",' +
        '"nickname": "TEKMAN",' +
        '"img": "https://cdn70.picsart.com/197965591000202.jpg?c256x256",' +
        '"pitch": "vid/jorge.mp4",' +
        '"description": "-",' +
        '"orphan": "false",' +
        '"vimdiesel": "none"' +
        "}," +
        "{" +
        '"name": "Josué Almeida",' +
        '"nickname": "ZUZUÉ",' +
        '"img": "img/josue_almeida.png",' +
        '"pitch": "vid/josue_almeida.mp4",' +
        '"description": "-",' +
        '"orphan": "false",' +
        '"vimdiesel": "none"' +
        "}," +
        "{" +
        '"name": "Ricardo Dias",' +
        '"nickname": "RICKY",' +
        '"img": "img/ricardo_dias.png",' +
        '"pitch": "vid/ricardo_dias.mp4",' +
        '"description": "A simple Elm skeleton project with Bulma framework and Sass.",' +
        '"orphan": "true",' +
        '"vimdiesel": "none"' +
        "}," +
        "{" +
        '"name": "Lais Nascimento",' +
        '"nickname": "LAIS",' +
        '"img": "img/lais_nascimento.png",' +
        '"pitch": "vid/lais_nascimento.mp4",' +
        '"description": "A simple Elm skeleton project with Bulma framework and Sass.",' +
        '"orphan": "true",' +
        '"vimdiesel": "none"' +
        "}," +
        "{" +
        '"name": "Filipe Lopes",' +
        '"nickname": "FLIPFLOPS",' +
        '"img": "img/filipe_lopes.png",' +
        '"pitch": "vid/filipe_lopes.mp4",' +
        '"description": "A simple Elm skeleton project with Bulma framework and Sass.",' +
        '"orphan": "true",' +
        '"vimdiesel": "none"' +
        "}," +
        "{" +
        '"name": "Eduardo Zacarias",' +
        '"nickname": "ZACKY BOY",' +
        '"img": "img/eduardo_zacarias.png",' +
        '"pitch": "vid/eduardo_zacarias.mp4",' +
        '"description": "A simple Elm skeleton project with Bulma framework and Sass.",' +
        '"orphan": "true",' +
        '"vimdiesel": "none"' +
        "}," +
        "{" +
        '"name": "Mariana Barcelos",' +
        '"nickname": "DELEGADA",' +
        '"img": "img/mariana_barcelos.png",' +
        '"pitch": "vid/mariana_barcelos.mp4",' +
        '"description": "A simple Elm skeleton project with Bulma framework and Sass.",' +
        '"orphan": "true",' +
        '"vimdiesel": "none"' +
        "}," +
        "{" +
        '"name": "Vando Clemente",' +
        '"nickname": "VANDO",' +
        '"img": "img/vando_clemente.png",' +
        '"pitch": "vid/vando_clemente.mp4",' +
        '"description": "A simple Elm skeleton project with Bulma framework and Sass.",' +
        '"orphan": "true",' +
        '"vimdiesel": "none"' +
        "}," +
        "{" +
        '"name": "Ricardo Santos",' +
        '"nickname": "RICARDO",' +
        '"img": "img/ricardo_santos.png",' +
        '"pitch": "vid/ricardo_santos.mp4",' +
        '"description": "A simple Elm skeleton project with Bulma framework and Sass.",' +
        '"orphan": "true",' +
        '"vimdiesel": "none"' +
        "}," +
        "{" +
        '"name": "Luís Reis",' +
        '"nickname": "REIS",' +
        '"img": "img/luis_reis.png",' +
        '"pitch": "vid/luis_reis.mp4",' +
        '"description": "A simple Elm skeleton project with Bulma framework and Sass.",' +
        '"orphan": "true",' +
        '"vimdiesel": "none"' +
        "}," +
        "{" +
        '"name": "Denise Machado",' +
        '"nickname": "DENISE",' +
        '"img": "img/denise_machado.png",' +
        '"pitch": "vid/denise_machado.mp4",' +
        '"description": "A simple Elm skeleton project with Bulma framework and Sass.",' +
        '"orphan": "false",' +
        '"vimdiesel": "none"' +
        "}," +
        "{" +
        '"name": "Pedro Supico",' +
        '"nickname": "INFILTRADO DOS 34",' +
        '"img": "img/pedro_supico.png",' +
        '"pitch": "vid/pedro_supico.mp4",' +
        '"description": "A simple Elm skeleton project with Bulma framework and Sass.",' +
        '"orphan": "true",' +
        '"vimdiesel": "none"' +
        "}," +
        "{" +
        '"name": "Paulo Resende",' +
        '"nickname": "JOPH",' +
        '"img": "img/paulo_resende.png",' +
        '"pitch": "vid/paulo_resende.mp4",' +
        '"description": "A simple Elm skeleton project with Bulma framework and Sass.",' +
        '"orphan": "true",' +
        '"vimdiesel": "none"' +
        "}," +
        "{" +
        '"name": "João Madeira",' +
        '"nickname": "MENINO DA LÁGRIMA",' +
        '"img": "img/joao_madeira.png",' +
        '"pitch": "vid/joao_madeira.mp4",' +
        '"description": "A simple Elm skeleton project with Bulma framework and Sass.",' +
        '"orphan": "true",' +
        '"vimdiesel": "none"' +
        "}," +
        "{" +
        '"name": "Johny",' +
        '"nickname": "MIRO",' +
        '"img": "img/johny.png",' +
        '"pitch": "vid/johny.mp4",' +
        '"description": "A simple Elm skeleton project with Bulma framework and Sass.",' +
        '"orphan": "true",' +
        '"vimdiesel": "none"' +
        "}," +
        "{" +
        '"name": "Carlos Cardoso",' +
        '"nickname": "CARLOS",' +
        '"img": "img/carlos_cardoso.png",' +
        '"pitch": "vid/carlos_cardoso.mp4",' +
        '"description": "A simple Elm skeleton project with Bulma framework and Sass.",' +
        '"orphan": "false",' +
        '"vimdiesel": "none"' +
        "}," +
        "{" +
        '"name": "Bernardo Telo",' +
        '"nickname": "BEN",' +
        '"img": "img/bernardo_telo.png",' +
        '"pitch": "vid/bernardo_telo.mp4",' +
        '"description": "A simple Elm skeleton project with Bulma framework and Sass.",' +
        '"orphan": "true",' +
        '"vimdiesel": "none"' +
        "}," +
        "{" +
        '"name": "Eduardo Marques",' +
        '"nickname": "EDUARDO",' +
        '"img": "img/eduardo_marques.png",' +
        '"pitch": "vid/eduardo_marques.mp4",' +
        '"description": "A simple Elm skeleton project with Bulma framework and Sass.",' +
        '"orphan": "true",' +
        '"vimdiesel": "none"' +
        "}," +
        "{" +
        '"name": "Ruben",' +
        '"nickname": "RUBEN",' +
        '"img": "img/ruben.png",' +
        '"pitch": "vid/ruben.mp4",' +
        '"description": "A simple Elm skeleton project with Bulma framework and Sass.",' +
        '"orphan": "true",' +
        '"vimdiesel": "none"' +
        "}," +
        "{" +
        '"name": "Rui Rodrigues",' +
        '"nickname": "MASSUDO/MENDIGO",' +
        '"img": "img/rui_rodrigues.png",' +
        '"pitch": "vid/rui_rodrigues.mp4",' +
        '"description": "A simple Elm skeleton project with Bulma framework and Sass.",' +
        '"orphan": "true",' +
        '"vimdiesel": "none"' +
        "}" +
        "]" +
        "}"
    );
  };

  return externals;
});
