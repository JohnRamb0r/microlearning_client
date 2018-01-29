jQuery(document).ready(function($) {

  $("add").click(function() {
    var image = new Image();
    image.src = 'data:image/png;base64,iVBORw0K...';
    document.body.appendChild(image);
  });

  getAllLerneinheitenByLehrendeID(2);

  $(".table").delegate(".changeLerneinheit", "click", function(event) {
    var id = $(this).attr("data-lerneinheit-id");
    console.log(id);
    console.log(event);
  });

  $("#addLerneinheitCancelbtn").click(function() {
    $(".modal-dialog .addLerneinheitAddAbschnittContainer").remove();
  });

  $("#addLerneinheitAddAbschnittbtn").click(function() {
    addAbschnittToElement(".addLerneinheitAddAbschnittForm", ".modal-body");
    event.preventDefault();
  });

  $("body").on("click", ".addLerneinheitDeleteAbschnittbtn", function() {
    $(this).parents(".addLerneinheitAddAbschnittContainer").remove();
  });

  $("form").delegate(".addLerneinheitDeleteAbschnittbtn", "click", function(event) {

    //$(this).closet("form").remove();
    alert("asdf");
    event.preventDefault();
  });



  function addAbschnittToElement(htmlElement, appendToElement) {

    var html = $(htmlElement).html();
    $(appendToElement).append(html);
  }


  function getAllLerneinheitenByLehrendeID(id) {

    $.getJSON("http://localhost:8080/Lerneinheit/lehrende/" + id, function(data) {
      var items = [];

      $("#lehrender").append(data[0].lehrende.benutzername);

      $.each(data, function(key, val) {
        $(".table").append("<tr><th scope='row'>" + val.id + "</th>" +
          "<td>" + val.id + "</td>" + "<td>" + val.titel + "</td>" + "<td>" +
          val.beschreibung + "</td>" + "<td><button data-lerneinheit-id='" + val.id + "' class='changeLerneinheit'>ÄNDERN</button></tr>");

      });
      console.log(data);
      console.log(items);



      // $("<ul/>", {
      //   "class": "my-new-list",
      //   html: items.join("")
      // }).appendTo("body");
    });
  }



  function searchAjax() {

    // var data = {}
    // data["query"] = $("#query").val();
    //
    // $.ajax({
    // 	type : "GET",
    // 	contentType : "application/json",
    // 	url : "http://localhost:8080/Lerneinheit/",
    // 	data : JSON.stringify(data),
    // 	dataType : 'json',
    // 	timeout : 100000,
    // 	success : function(data) {
    // 		console.log("SUCCESS: ", data);
    //
    // 	},
    // 	error : function(e) {
    // 		console.log("ERROR: ", e);
    //
    // 	},
    // 	done : function(e) {
    // 		console.log("DONE");
    // 	}
    // });

    // show all
    $.getJSON("http://localhost:8080/Lerneinheit", function(data) {
      var items = [];

      $.each(data, function(key, val) {
        items.push("<li id='" + key + "'>" + val + "</li>");
      });
      //console.log(data);

      $("<ul/>", {
        "class": "my-new-list",
        html: items.join("")
      }).appendTo("body");
    });

    dataJson = {
      "titel": "asdf",
      "beschreibung": "asdf",
      "abschnitte": [{
          "inhalt": "Es handelt sich um einen ...",
          "reihenfolge": 2,
          "media": null
        },
        {
          "inhalt": "penis handelt sich um einen ...",
          "reihenfolge": 3,
          "media": null
        }
      ],
      "lehrende_id": 1
    };

    console.log(JSON.stringify(dataJson));

    // EDIT
    $.ajax({
      type: 'post',
      url: 'http://localhost:8080/Lerneinheit/edit/1',
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

    // DELETE
    // $.ajax({
    //     url: 'http://localhost:8080/Lerneinheit/delete/1',
    //     type: 'DELETE',
    //     success: function(result) {
    //         // Do something with the result
    //     }
    // });



  }
});
