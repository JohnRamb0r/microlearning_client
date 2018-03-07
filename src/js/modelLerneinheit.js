var modelLerneinheit = {
  generateLerneinheit: function(){

    var data = $(".modal-body").serializeFormJSON();
    console.log(data);

  },
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
  //Unschön gelöst, da das data-Object verloren geht.
  //erhält ID des Lehrenden. Ruf die Daten des Lehrenden ab und ruft View-Funktion auf
  getAllLerneinheitenByLehrendeIdAndBuild: function(id) {

    $.getJSON("http://localhost:8080/Lerneinheit/lehrende/" + id, function(data) {

      console.log("asfd");
      console.log(data);
      // Keine Einträge über die REST Schnittstelle erhalten.
      if(data.length == 0) return -1;


      //$("#lehrender").append(data[0].lehrende.benutzername);

      guiFunctions.generateLerneinheitTable(data);
      guiFunctions.addAbschnittToElement(data[0].lehrende.benutzername, "#lehrender")

      return data;
    });
  },
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
