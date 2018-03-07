jQuery(document).ready(function($) {
  "use strict";
  //init();

  var model = modelLerneinheit;
  var view = guiFunctions;

  model.getAllLerneinheitenByLehrendeIdAndBuild(2);




  $("#addLerneinheitSavebtn").click(function() {
    alert("FICK1");
    var x = $(".form-group > .form-control");
    console.log(x);
    $.each(x, function(i, field){

        console.log(i + " " +field.name + ":" + field.value + " " + field.id);
    });

  //  model.generateLerneinheit();
    // ajaxFunctions.showAllLerneinheit();
    // var image = new Image();
    // image.src = 'data:image/png;base64,iVBORw0K...';
    // document.body.appendChild(image);

  });



  $(".table").delegate(".changeLerneinheit", "click", function(event) {
    var id = $(this).attr("data-lerneinheit-id");
    console.log(id);
    console.log(event);
  });

  $(".table").delegate(".deleteLerneinheit", "click",function(event){
    var id = $(this).attr("data-lerneinheit-id");
    console.log(id);

    //ajaxFunctions.deleteLerneinheitById(id);
    guiFunctions.deleteElementById("deleteLerneinheitRow_"+id);

    event.preventDefault();
  });

  $("#addLerneinheitCancelbtn").click(function() {
    guiFunctions.resetToBeginning();
  });
  $(".close").click(function() {
    guiFunctions.resetToBeginning();
  });


  $("#addLerneinheitAddAbschnittbtn").click(function() {
    guiFunctions.addAbschnittToElement(".addLerneinheitAddAbschnittForm", ".modal-body");
    event.preventDefault();
  });

  $("#addLerneinheitAddFragebtn").click(function(){

    guiFunctions.addAbschnittToElement(".addLerneinheitAddFrageForm", ".modal-body");
    var frageTyp = guiFunctions.getFragetyp();

    if(stringUtilFunctions.strcmp(frageTyp, "erklaerbild")){
      guiFunctions.setLerneinheitFrageDataInputVisible();
    }
    frageTyp = undefined;
    event.preventDefault();
  });



  $("body").on("click", ".addLerneinheitDeleteAbschnittbtn", function() {
    guiFunctions.deleteElementByElement($(this).parents(".addLerneinheitAddAbschnittContainer"));

    //$(this).parents(".addLerneinheitAddAbschnittContainer").remove();
  });



  $("body").on("click", ".addLerneinheitDeleteFragebtn", function() {
    guiFunctions.deleteElementByElement($(this).parents(".addLerneinheitAddFrageContainer"));

    //$(this).parents(".addLerneinheitAddAbschnittContainer").remove();
  });







});
