
//Erweitert die JQuery Funktionen mit weiteren Funktionen
(function ($) {
    //Wandelt Einträge in Forms zu einem JSON um.
    $.fn.serializeFormJSON = function () {



        var o = {};
        var a = this.serializeArray();
        console.log(this);
        $.each(a, function () {
            if (o[this.name]) {
                if (!o[this.name].push) {
                    o[this.name] = [o[this.name]];
                }
                o[this.name].push(this.value || '');
            } else {
                o[this.name] = this.value || '';
            }
        });
        return o;
    };
})(jQuery);
