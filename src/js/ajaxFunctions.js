var ajaxFunctions = {

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
  getAllLerneinheitenByLehrendeId: function(id) {

    $.getJSON("http://localhost:8080/Lerneinheit/lehrende/" + id, function(data) {
      var items = [];

      // Keine Einträge über die REST Schnittstelle erhalten.
      if(data.length == 0) return;

      $("#lehrender").append(data[0].lehrende.benutzername);

      $.each(data, function(key, val) {
        $(".table").append("<tr id='deleteLerneinheitRow_"+ val.id +"'><th scope='row'>" + val.id + "</th>" +
          "<td>" + val.titel + "</td>" + "<td>" +
          val.beschreibung + "</td>" + "<td><button data-lerneinheit-id='" + val.id + "' class='changeLerneinheit'>ÄNDERN</button></td>"+
          "<td><button data-lerneinheit-id='" + val.id + "' class='deleteLerneinheit'>LÖSCHEN</button></td></tr>");

      });
      console.log(data);
      console.log(items);


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
