var VUE = VUE || {};

VUE.accueil = (function(){

    var module = {};
    var accueil = this;

    var pageAccueilContenu;
    var body;

    var formulaireAuthentification;
    var pseudonyme;
    var boutonAuthentification;
    var nouveauPseudonyme;

    (function initialiser(){

        document.addEventListener("DOMContentLoaded", preparerVue);

    })();

    function preparerVue(evenement){

      pageAccueilContenu = document.querySelector("#page-accueil").innerHTML;
      body = document.querySelector("body");

    }

    module.afficher = function(nouveauPseudonymeObtenu){

        accueil.nouveauPseudonymeObtenu = nouveauPseudonymeObtenu;
        console.log("VUE.accueil module.afficher --> accueil.nouveauPseudonymeObtenu : ", accueil.nouveauPseudonymeObtenu);
        body.innerHTML = pageAccueilContenu;
        formulaireAuthentification = document.getElementById("formulaire-authentification");
        formulaireAuthentification.addEventListener("submit", obtenirPseudonyme)

        pseudonyme = document.getElementById("pseudonyme");

        boutonAuthentification = document.getElementById("bouton-authentification");

    }

    function obtenirPseudonyme(evenement){

       evenement.preventDefault();

       boutonAuthentification.disabled = true;
       console.log("VUE.accueil obtenirPseudonyme -->  accueil.nouveauPseudonymeObtenu : ",  accueil.nouveauPseudonymeObtenu);
       accueil.nouveauPseudonymeObtenu(pseudonyme.value);

   }


    return module;

})();
