//View
var guiFunctions = {
    //Generiert die Anzeige (Lerneinheit Tabelle des ausgewählten Lehrers)
    // Parameter: ID (int) des Lehrenden
    init: function (id) {
        modelLerneinheit.getAllLerneinheitenByLehrendeIdAndBuild(id, function (data) {


          guiFunctions.addTextToElement(data[0].lehrende.benutzername, "#lehrender");
          guiFunctions.generateLerneinheitTable(data);


        });
    },
    //Fügt ein HTML Element zu einem Element hinzu
    // Parameter: 1. ID/Class (String) eines HTML Elements - welches hinzugefügt werden soll, 2. ID/Class (String) eines HTML Element wo der 1. Parameter hinzugefügt werden soll.
    addAbschnittToElement: function (htmlElement, appendToElement) {

        var html = $(htmlElement).html();
        $(appendToElement).append(html);
    },
    addDataAttributeToElement: function (dataName, dataValue, $appendToElement){
      $appendToElement.attr(dataName, dataValue);
    },
    addTextToElement: function (text, appendToElement){
      $(appendToElement).append(text);
    },
    //Löscht ein Element aufgrund seiner id
    //Parameter: ID (String) eines zu löschenden Elements
    deleteElementById: function (id) {
        $("#" + id).remove();
    },
    //Löscht ein Element
    //Parameter: JQuery Object eines zu löschenden Elements
    deleteElementByElement: function ($element) {

        $element.remove();
    },
    //Gibt den aktuellen ausgewählten Fragetyp-Wert zurück von der View.
    getFragetyp: function () {
        var radiobuttonSelected = $(".modal-footer-radio input:radio:checked").attr("value");
        console.log(radiobuttonSelected);
        return radiobuttonSelected;
    },
    getDataFragetyp: function($element){
      return $element.attr("data-fragetyp");
    },
    isNoDataSelectedInDataForm: function(field, classSelector){
      return $(field).find(classSelector).prop('files')[0]===undefined;
    },
    getAntwortenFromAntwortInputs: function($antworten){
      var antworten = [];
      var antwort = new Object();
      var antwort = new Object();
      antwort.istRichtig = undefined;
      antwort.text = undefined;

      $.each($antworten.children(), function(i, field){
        $(field).children('input').each(function () {
          if($(this).hasClass("addLerneinheitFragestellungInputAntwortenCheckbox")){
            antwort.istRichtig = $(this).is(":checked");
          }
          else {
            antwort.text = this.value;
          }
          //Beide haben einen Wert, ready zum Pushen und dann wird es zurückgesetzt.
          if(typeof antwort.istRichtig !== "undefined" && typeof antwort.text !== "undefined"){
            antworten.push(antwort);
            antwort = new Object();
          }
        });

        console.log(".....");
      });
      return antworten;
      console.log(antworten);
    },
    //Das Modalfenster wird auf die Ausgangssituation zurückgesetzt
    resetToBeginning: function () {
        $(".modal-dialog .addLerneinheitAddAbschnittContainer").remove();
        $(".modal-dialog .addLerneinheitAddFrageContainer").remove();
    },
    //Das letzte hinzugefügte upload-form der Fragen wird sichtbar gemacht
    setLerneinheitFrageDataInputVisible: function () {

        $(".addLerneinheitFragestellungDataInput-form-group").eq(-2).removeClass("hide");
    },
    //Die letzten hinzugefügten Text-Inputfelder der Frage werden sichtbar gemacht
    setLerneinheitFrageInputVisible: function () {

        $(".addLerneinheitFragestellungInputAntworten-form-group").eq(-2).removeClass("hide");
    },
    //Die letzte hinzugefügte Textarea der Frage wird sichtbar gemacht.
    setLerneinheitFrageTextareaVisible: function () {

        $(".addLerneinheitFragestellungTextarea-form-group").eq(-2).removeClass("hide");
    },
    //Generiert die Lerneinheitübersicht (Table)
    //Parameter: data (Object)
    generateLerneinheitTable: function (data) {
        $.each(data, function (key, val) {
            $(".table").append("<tr id='deleteLerneinheitRow_" + val.id + "'><th scope='row'>" + val.id + "</th>" +
                "<td>" + val.titel + "</td>" + "<td>" +
                val.beschreibung + "</td>" + "<td><button data-lerneinheit-id='" + val.id + "' class='changeLerneinheit' disabled>ÄNDERN</button></td>" +
                "<td><button data-lerneinheit-id='" + val.id + "' class='deleteLerneinheit'>LÖSCHEN</button></td></tr>");

        });
    }
};
