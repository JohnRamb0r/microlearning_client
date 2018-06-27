
//Controller
jQuery(document).ready(function($) {
  "use strict";

  if(window.Prototype) {
    delete Object.prototype.toJSON;
    delete Array.prototype.toJSON;
    delete Hash.prototype.toJSON;
    delete String.prototype.toJSON;
  }

  var model = modelLerneinheit;
  var view = guiFunctions;

  //Lehreinheit vom Lehrer mit der ID 2 wird initialisiert
  view.init(2)

  //Erstellung der Lerneinheit - vorübergehend im Controller, wird noch in das Model übertragen.
  $("#addLerneinheitSavebtn").click(function() {

    var data = $(".modal-body").children();//.serializeFormJSON();

    //console.log(data);

    var lerneinheit = {};
    lerneinheit.titel = $("#addLerneinheitTitelInput").val();
    lerneinheit.beschreibung = $("#addLerneinheitBeschreibungInput").val();
    lerneinheit.abschnitte = new Array();
    lerneinheit.erklaerBilder = new Array();
    lerneinheit.lueckenTexte = new Array();
    lerneinheit.multipleChoices = new Array();

    var reihenfolge = 1;

    $.each(data, function(i, field){

        // Erstes Kind wird übersprungen, da es sich um Titel/Beschreibung handelt.
        // return true innerhalb eines each ist wie ein "continue" in einem regulären Loop.
        if(i == 0) return true;

        var selector = $(field).children().not(".hide").not(".divider");

        // Korrekt, wenn es eine Frage ist
        if($(this).is(".addLerneinheitAddFrageContainer")){
          var fragetyp = view.getDataFragetyp($(this));

          console.log("FRAGE!")
          $.each(selector, function(i, field){
            // console.log(field);
            // console.log($(field).find(".addLerneinheitFragestellungInput").val());


            if(fragetyp=="erklaerbild"){
            //  console.log(view.isNoDataSelectedInDataForm(field));
              var erklaerBild = new Object();
              erklaerBild["aufgabenstellung"] = $(field).find(".addLerneinheitFragestellungInput").val();
              erklaerBild["ergaenzungstext"] = $(field).find(".addLerneinheitInformationstextInput").val();
              erklaerBild["reihenfolge"] = reihenfolge;
              //Erklärbilder werden mit einer schwierigkeit von 3 eingestuft. Selber
              erklaerBild["schwierigkeit"] = 3;

              var $antworten = $(field).find(".addLerneinheitFragestellungInputAntworten-form-group");
              erklaerBild["antworten"] = view.getAntwortenFromAntwortInputs($antworten);

              if(!view.isNoDataSelectedInDataForm(field, ".addLerneinheitFragestellungDataInput")){
                var file = $(field).find(".addLerneinheitFragestellungDataInput").prop('files')[0];
                model.getBase64(file, function(result){
                  var media = new Object();
                  media["datei"] = result;

                  //Für den Anfang sind diese Werte default gesetzt.
                  media["typ"] = "Bild";
                  media["dateiname"] = file.name;
                  media["beschreibung"] = "";
                  media["reihenfolge"] = -1;


                  erklaerBild["media"] = media;
                  lerneinheit.erklaerBilder.push(erklaerBild);
                  //console.log(JSON.stringify(erklaerBild));
                });
              }else{
                alert("BILD AUSWÄHLEN!!!");
              }
            }else if(fragetyp=="multiplechoice"){
              var multipleChoice = new Object();
              multipleChoice.aufgabenstellung = $(field).find(".addLerneinheitFragestellungInput").val();
              multipleChoice.ergaenzungstext = $(field).find(".addLerneinheitInformationstextInput").val();
              multipleChoice.reihenfolge = reihenfolge;
              //Erklärbilder werden mit einer schwierigkeit von 3 eingestuft. Selber
              multipleChoice.schwierigkeit = 1;

              var $antworten = $(field).find(".addLerneinheitFragestellungInputAntworten-form-group");
              multipleChoice.antworten = view.getAntwortenFromAntwortInputs($antworten);

              lerneinheit.multipleChoices.push(multipleChoice);


            }else{
              var lueckenText = new Object();
              lueckenText.aufgabenstellung = $(field).find(".addLerneinheitFragestellungInput").val();
              lueckenText.ergaenzungstext = $(field).find(".addLerneinheitInformationstextInput").val();
              lueckenText.reihenfolge = reihenfolge;
              //Erklärbilder werden mit einer schwierigkeit von 3 eingestuft. Selber
              lueckenText.schwierigkeit = 2;
              lueckenText.text = $(field).find(".addLerneinheitFragestellungTextarea").val();

              lerneinheit.lueckenTexte.push(lueckenText);

            }
          });

        }else{
          console.log("ABSCHNITT!")
          var abschnitt = new Object();
          $.each(selector, function(i, field){
            //console.log(field);

            abschnitt.titel = $(field).find(".addLerneinheitTitelInput").val();
            abschnitt.inhalt = $(field).find(".addLerneinheitBeschreibungInput").val();
            abschnitt.reihenfolge = reihenfolge;
            abschnitt.media = new Array();

            if(!view.isNoDataSelectedInDataForm(field, ".addLerneinheitAbschnittDataInput")){

              var file = $(field).find(".addLerneinheitAbschnittDataInput").prop('files')[0];
              model.getBase64(file, function(result){
                //console.log(abschnitt);
                var media = new Object();
                media.datei = result;

                //Für den Anfang sind diese Werte default gesetzt.
                media.typ = "Bild";
                media.dateiname = file.name;
                media.beschreibung = "";
                media.reihenfolge = -1;


                abschnitt.media.push(media);


              });
              lerneinheit.abschnitte.push(abschnitt);
              // setTimeout(function(){
              //   lerneinheit.abschnitte.push(abschnitt);
              //   console.log("....---");
              //   console.log(abschnitt.media);
              //   console.log(JSON.stringify(abschnitt.media));
              // }, 1000)

            }
          });

        }
        reihenfolge++;
         //console.log(i + " " +field.name + ":" + field.value + " " + field.id);
    });



    setTimeout(function(){
      console.log(JSON.stringify(lerneinheit));
      model.generateLerneinheitById(lerneinheit, 2);
      //$(".close").click();
    }, 4000)



    //console.log(lerneinheit);


  });


  //Test-Code, um ID auszulesen von in der Laufzeit hinzugefügten Elementen.
  $(".table").delegate(".changeLerneinheit", "click", function(event) {
    var id = $(this).attr("data-lerneinheit-id");
    console.log(id);
    console.log(event);
  });
  //Eine Lerneinheit wird mit Click gelöscht.
  $(".table").delegate(".deleteLerneinheit", "click",function(event){
    var id = $(this).attr("data-lerneinheit-id");
    console.log(id);

    //ajaxFunctions.deleteLerneinheitById(id);
    model.deleteLerneinheitById(id);
    guiFunctions.deleteElementById("deleteLerneinheitRow_"+id);

    event.preventDefault();
  });
  //Form wird auf Ursprung zurückgesetzt.
  $("#addLerneinheitCancelbtn").click(function() {
    guiFunctions.resetToBeginning();
  });
  $(".close").click(function() {
    guiFunctions.resetToBeginning();
  });

  //Eine Abschnitt-Form wird dem Modalfenster hinzugefügt
  $("#addLerneinheitAddAbschnittbtn").click(function() {
    guiFunctions.addAbschnittToElement(".addLerneinheitAddAbschnittForm", ".modal-body");
    event.preventDefault();
  });
  //Eine Frage-Form (Je nach ausgewähltem Fragetyps) wird dem Modalfenster hinzugefügt
  $("#addLerneinheitAddFragebtn").click(function(){

    guiFunctions.addAbschnittToElement(".addLerneinheitAddFrageForm", ".modal-body");
    var $appendToElement = $(".addLerneinheitAddFrageContainer").eq(-2);
    var frageTyp = guiFunctions.getFragetyp();

    if(stringUtilFunctions.strcmp(frageTyp, "erklaerbild")){
      guiFunctions.addDataAttributeToElement("data-fragetyp", "erklaerbild", $appendToElement);
      guiFunctions.setLerneinheitFrageInputVisible();
      guiFunctions.setLerneinheitFrageDataInputVisible();
    }else if(stringUtilFunctions.strcmp(frageTyp, "multiplechoice")){
      guiFunctions.addDataAttributeToElement("data-fragetyp", "multiplechoice", $appendToElement);
      guiFunctions.setLerneinheitFrageInputVisible();
    }else if(stringUtilFunctions.strcmp(frageTyp, "lueckentext")){
      guiFunctions.addDataAttributeToElement("data-fragetyp", "lueckentext", $appendToElement);
      guiFunctions.setLerneinheitFrageTextareaVisible();
    }
    frageTyp = undefined;
    event.preventDefault();
  });


  //Löscht eine Abschnitt-Form
  $("body").on("click", ".addLerneinheitDeleteAbschnittbtn", function() {
    guiFunctions.deleteElementByElement($(this).parents(".addLerneinheitAddAbschnittContainer"));

    //$(this).parents(".addLerneinheitAddAbschnittContainer").remove();
  });


  //Löscht eine Frage-Form
  $("body").on("click", ".addLerneinheitDeleteFragebtn", function() {
    guiFunctions.deleteElementByElement($(this).parents(".addLerneinheitAddFrageContainer"));

    //$(this).parents(".addLerneinheitAddAbschnittContainer").remove();
  });

});
