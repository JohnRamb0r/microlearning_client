var feature = (function() {

    // Private variables and functions
    var privateThing = "secret";
    var publicThing = "not secret";

    var changePrivateThing = function() {
      $.getJSON("http://localhost:8080/Lerneinheit/lehrende/2", function(data) {

        console.log("asfd");
        console.log(data);
        // Keine Einträge über die REST Schnittstelle erhalten.
        if(data.length == 0) return -1;


        //$("#lehrender").append(data[0].lehrende.benutzername);

        
        publicThing = data;


        //return data;
      });
    };

    var sayPrivateThing = function() {
        console.log( privateThing );
        changePrivateThing();
    };

    // Public API
    return {
        publicThing: publicThing,
        sayPrivateThing: sayPrivateThing
    };
})();
