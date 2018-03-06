jQuery(document).ready(function($) {
  "use strict";
  //init();


  $("#add").click(function() {

    ajaxFunctions.showAllLerneinheit();
    var image = new Image();
    image.src = 'data:image/png;base64,iVBORw0K...';
    document.body.appendChild(image);
  });

  ajaxFunctions.getAllLerneinheitenByLehrendeId(2);

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
    guiFunctions.getFragetyp();

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
