var VUE = VUE || {};

VUE.accueil = (function(){

    var accueil = {};

    var pageAccueilContenu;
    var body;

    (function initialiser(){

        document.addEventListener("DOMContentLoaded", preparerVue);

    })();

    function preparerVue(evenement){

      pageAccueilContenu = document.querySelector("#page-accueil").innerHTML;
      body = document.querySelector("body");

    }

    accueil.afficher = function(){

        body.innerHTML = pageAccueilContenu;

    }


    return accueil;

})();
