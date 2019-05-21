var VUE = VUE || {};

VUE.finPartie = (function(){

    var finPartie = {};

    var pageFinPartieContenu;
    var body;

    (function initialiser()
    {
        document.addEventListener("DOMContentLoaded", preparerVue);


    })();

    function preparerVue(evenement){

      pageFinPartieContenu = document.querySelector("#page-fin-partie").innerHTML;
      body = document.querySelector("body");


    }

    finPartie.afficher = function(gagnee){

        var pageFinPartieContenuReponse = pageFinPartieContenu;

        if(gagnee){

            pageFinPartieContenuReponse = pageFinPartieContenuReponse.replace("{texte-fin-partie}", "Vous avez gagné!");

        }else{

            pageFinPartieContenuReponse = pageFinPartieContenuReponse.replace("{texte-fin-partie}", "Vous avez perdu!");

        }

        body.innerHTML = pageFinPartieContenuReponse;

    }


    return finPartie;

})();
