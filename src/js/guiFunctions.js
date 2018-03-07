var guiFunctions = {
  model: modelLerneinheit,
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
    var radiobuttonSelected = $(".modal-footer-radio input:radio:checked").attr("value");
    console.log(radiobuttonSelected);
    return radiobuttonSelected;
  },
  resetToBeginning: function(){
    $(".modal-dialog .addLerneinheitAddAbschnittContainer").remove();
    $(".modal-dialog .addLerneinheitAddFrageContainer").remove();
  },
  setLerneinheitFrageDataInputVisible: function(){

    $(".addLerneinheitFragestellungDataInput-form-group").eq(-2).removeClass("hide");
  },
  generateLerneinheitTable: function(data){
    $.each(data, function(key, val) {
      $(".table").append("<tr id='deleteLerneinheitRow_"+ val.id +"'><th scope='row'>" + val.id + "</th>" +
        "<td>" + val.titel + "</td>" + "<td>" +
        val.beschreibung + "</td>" + "<td><button data-lerneinheit-id='" + val.id + "' class='changeLerneinheit'>ÄNDERN</button></td>"+
        "<td><button data-lerneinheit-id='" + val.id + "' class='deleteLerneinheit'>LÖSCHEN</button></td></tr>");

    });
  }
};
