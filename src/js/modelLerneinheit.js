//Model
var modelLerneinheit = {

  //Generiert eine lerneinheit aus den eingegebenen Daten
  //noch nicht fertig programmiert, ist noch in der main.js
  generateLerneinheit: function(){

    var data = $(".modal-body").children();

    console.log(data[0].serializeFormJSON());

  },
  //Wandelt ein File in Base64 um.
  //Paramater: file, callback Funktion zur weiteren Verarbeitung
  getBase64: function(file, callback) {
   var reader = new FileReader();
   reader.readAsDataURL(file);
   reader.onload = function () {
     //console.log(reader.result);
     callback(reader.result);
   };
   reader.onerror = function (error) {
     console.log('Error: ', error);
   };
  },
  //sendet die überarbeitete Lerneinheit an den Server.
  //Parameter: id(int) der Lerneinheit
  editLerneinheitById: function(id) {
    $.ajax({
      type: 'post',
      url: 'http://localhost:8080/Lerneinheit/edit/' + id,
      data: JSON.stringify(dataJson),
      contentType: "application/json; charset=utf-8",
      traditional: true,
      success: function(data) {
        console.log("done");
      },
      error: function(jqXhr, textStatus, errorThrown) {
        console.log(errorThrown);
        console.log("errorThrown");
      }
    });
  },
  //Holt sich alle Lerneinheiten des Lehrenden aufgrund dessen ID und übergibt diese der übergebenen Callback Funktion.
  //Parameter: id (int) des Lehrenden, callback Funktion für die Visualisierung der Daten.
  getAllLerneinheitenByLehrendeIdAndBuild: function(id, callback) {

    $.getJSON("http://localhost:8080/Lerneinheit/lehrende/" + id, function(data) {

      console.log(data);
      // Keine Einträge über die REST Schnittstelle erhalten.
      if(data.length == 0) return -1;


      //$("#lehrender").append(data[0].lehrende.benutzername);
      callback(data);
    //  guiFunctions.generateLerneinheitTable(data);
    //  guiFunctions.addAbschnittToElement(data[0].lehrende.benutzername, "#lehrender")


    });
  },
  //Es werden alle Lerneinheiten vom Server abgerufen.
  showAllLerneinheit: function() {
    $.ajax({
      type : "GET",
      contentType : "application/json",
      url : "http://localhost:8080/Lerneinheit/",
      data : JSON.stringify(data),
      dataType : 'json',
      timeout : 100000,
      success : function(data) {
        console.log("SUCCESS: ", data);

      },
      error : function(e) {
        console.log("ERROR: ", e);

      },
      done : function(e) {
        console.log("DONE");
      }
    });
  },
  //Eine Lerneinheit wird aufgrund deren ID gelöscht.
  //Paramater: id (int) der Lerneinheit
  deleteLerneinheitById: function(id) {
    $.ajax({
      url: 'http://localhost:8080/Lerneinheit/delete/'+id,
      type: 'DELETE',
      success: function(result) {
        // Do something with the result
      }
    });
  }
};
