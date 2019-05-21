(function(){

    var application = this;
    var pseudonyme;
    var vueAccueil;
    //var vuePartie;
    var vueFinPartie;
    var partie;


    (function initialiser(){

        vueAccueil = VUE.accueil;
        vueAccueil.nouveauPseudonymeObtenu = nouveauPseudonymeObtenu;
        vuePartie = VUE.partie;
        vueFinPartie = VUE.finPartie;
        partie = CONTROLEUR.partie;

        window.addEventListener("hashchange",naviguer);
        document.addEventListener("DOMContentLoaded", preparerApplication);

    })();

    function preparerApplication()
    {
        vueAccueil.afficher();
    }

    function nouveauPseudonymeObtenu(nouveauPseudonyme)
    {
        pseudonyme = nouveauPseudonyme;
        window.location = "#jouer";
    }

    function naviguer(evenement){

        var hash = window.location.hash;

        if(hash.match(/^#accueil/)){
            naviguerVueAccueil();
        }else if(hash.match(/^#jouer/)){
            naviguerVuePartie();
        }else if(hash.match(/^#fin-partie-gagnee/)){
            naviguerVueFinPartie(gagnee = true);
        }else if(hash.match(/^#fin-partie-perdue/)){
            naviguerVueFinPartie(gagnee = false);
        }
    }

    function naviguerVueAccueil()
    {
        vueAccueil.afficher();
    }

  function naviguerVuePartie()
  {
      partie.preparerJeu(pseudonyme);
  }

   function naviguerVueFinPartie(gagnee)
   {
        vueFinPartie.afficher(gagnee);
   }

})();


/*
var jeu = new Jeu();
jeu.demarrer();
*/
