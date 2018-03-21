
//Controller
jQuery(document).ready(function($) {
  "use strict";
  //init();

  var model = modelLerneinheit;
  var view = guiFunctions;

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
    lerneinheit.frage = [];

    $.each(data, function(i, field){

        // Erstes Kind wird übersprungen, da es sich um Titel/Beschreibung handelt.
        // return true innerhalb eines each ist wie ein "continue" in einem regulären Loop.
        if(i == 0) return true;

        var selector = $(field).children().not(".hide").not(".divider");

        // Korrekt, wenn es eine Frage ist
        if($(this).is(".addLerneinheitAddFrageContainer")){
          console.log("FRAGE!")
          $.each(selector, function(i, field){
            // console.log(field);
            // console.log($(field).find(".addLerneinheitFragestellungInput").val());

            var frage = new Object();
            frage.name = $(field).find(".addLerneinheitFragestellungInput").val();
            frage.beschreibung = $(field).find(".addLerneinheitInformationstextInput").val()

            if($(field).find(".addLerneinheitFragestellungDataInput").prop('files')[0]===undefined) return true;

            model.getBase64($(field).find(".addLerneinheitFragestellungDataInput").prop('files')[0], function(result){
              frage.bild = result;
              lerneinheit.frage.push(frage);
              console.log(frage);
            });
          });

        }else{
          console.log("ABSCHNITT!")
          $.each(selector, function(i, field){
            console.log($(field).children());
          });

        }


        // alert("asdf");

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
    var frageTyp = guiFunctions.getFragetyp();

    if(stringUtilFunctions.strcmp(frageTyp, "erklaerbild")){
      guiFunctions.setLerneinheitFrageDataInputVisible();
    }else if(stringUtilFunctions.strcmp(frageTyp, "multiplechoice")){
      guiFunctions.setLerneinheitFrageInputVisible();
    }else if(stringUtilFunctions.strcmp(frageTyp, "lueckentext")){
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
