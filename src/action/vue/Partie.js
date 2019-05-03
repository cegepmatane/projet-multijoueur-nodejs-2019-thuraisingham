var VUE = VUE || {};

VUE.partie = (function(){

    var module = {};

    var pagePartieContenu;
    var body;

    var canevas;
    var largeur;
    var hauteur;

    var arrierePlan;
    


    (function initialiser(){

        document.addEventListener("DOMContentLoaded", preparerVue);

    })();

    function preparerVue(evenement){

        pagePartieContenu = document.querySelector("#page-partie").innerHTML;
        body = document.querySelector("body");

    }

    module.afficher = function(nouvelleLargeur, nouvelleHauteur){

        body.innerHTML = pagePartieContenu;

        largeur = nouvelleLargeur;
        hauteur = nouvelleHauteur;

        canevas = SVG('canevas').size(largeur, hauteur);
        canevas.viewbox(0, 0, largeur, hauteur);

        
        arrierePlan = new ArrierePlan(canevas);
        arrierePlan.afficher();


    }

    return module;

})();
