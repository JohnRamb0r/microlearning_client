var guiFunctions = {
  addAbschnittToElement: function(htmlElement, appendToElement) {

    var html = $(htmlElement).html();
    $(appendToElement).append(html);
  },
  deleteElementById: function(id){
    $("#"+id).remove();
  },
  deleteElementByElement: function($element){

    $element.remove();
  },
  getFragetyp: function(){
    var radiobuttonSelected = $(".modal-footer-radio input:radio:checked");
    console.log(radiobuttonSelected.attr("value"));
  },
  resetToBeginning: function(){
    $(".modal-dialog .addLerneinheitAddAbschnittContainer").remove();
    $(".modal-dialog .addLerneinheitAddFrageContainer").remove();
  }
};
