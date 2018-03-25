
//Controller
jQuery(document).ready(function($) {
  "use strict";
  //init();

  var model = modelLerneinheit;
  var view = guiFunctions;

//  modelLerneinheit.showAllLerneinheit();

  view.init(2)

  //Erstellung der Lerneinheit - vorübergehend im Controller, wird noch in das Model übertragen.
  //Noch nicht fertig programmiert, es müssen alle Fragetypen umgesetzt werden.
  $("#addLerneinheitSavebtn").click(function() {

    var data = $(".modal-body").children();//.serializeFormJSON();

    console.log(data);

    var lerneinheit = new Object();
    lerneinheit.titel = $("#addLerneinheitTitelInput").val();
    lerneinheit.beschreibung = $("#addLerneinheitBeschreibungInput").val();
    lerneinheit.abschnitte = [];
    lerneinheit.erklaerBild = [];
    lerneinheit.lueckentext = [];
    lerneinheit.multiplechoice = [];

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

            var $antworten = $(field).find(".addLerneinheitFragestellungInputAntworten-form-group");
            view.getAntwortenFromAntwortInputs($antworten);
            if(fragetyp=="erklaerbild"){
              console.log(view.isNoDataSelectedInDataForm(field));
              var erklaerBild = new Object();
              erklaerBild.aufgabenstellung = $(field).find(".addLerneinheitFragestellungInput").val();
              erklaerBild.ergaenzungstext = $(field).find(".addLerneinheitInformationstextInput").val();
              erklaerBild.reihenfolge = reihenfolge;
              //Erklärbilder werden mit einer schwierigkeit von 3 eingestuft. Selber
              erklaerBild.schwierigkeit = 3;



              if(!view.isNoDataSelectedInDataForm(field)){
                model.getBase64($(field).find(".addLerneinheitFragestellungDataInput").prop('files')[0], function(result){
                  var media = new Object();
                  media.datei = result;

                  //Für den Anfang sind diese Werte default gesetzt.
                  media.typ = "Bild";
                  media.dateiname = "";
                  media.beschreibung = "";
                  media.reihenfolge = -1;

                  erklaerBild.bild = result;
                  lerneinheit.erklaerBild.push(frage);
                  console.log(frage);
                });
              }
            }
          });

        }else{
          console.log("ABSCHNITT!")
          $.each(selector, function(i, field){
            console.log($(field).children());
          });

        }


        // alert("asdf");
        reihenfolge++;
         console.log(i + " " +field.name + ":" + field.value + " " + field.id);
    });

  //  model.generateLerneinheit();
    // ajaxFunctions.showAllLerneinheit();
    // var image = new Image();
    // image.src = 'data:image/png;base64,iVBORw0K...';
    // document.body.appendChild(image);

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
