var VUE = VUE || {};

VUE.partie = (function(){

    var module = {};

    var pagePartieContenu;
    var body;

    var canevas;
    var largeur;
    var hauteur;

    var arrierePlan;

    var joueurBoulle1;



    (function initialiser(){

        document.addEventListener("DOMContentLoaded", preparerVue);

    })();

    function preparerVue(evenement){

        pagePartieContenu = document.querySelector("#page-partie").innerHTML;
        body = document.querySelector("body");

    }

    module.afficher = function(nouvelleLargeur, nouvelleHauteur,agirSurClic){

        body.innerHTML = pagePartieContenu;

        largeur = nouvelleLargeur;
        hauteur = nouvelleHauteur;

        canevas = SVG('canevas').size(largeur, hauteur);
        canevas.viewbox(0, 0, largeur, hauteur);


        arrierePlan = new ArrierePlan(canevas);
        arrierePlan.afficher();

        joueurBoulle1 = new JoueurBoulle(canevas);
        joueurBoulle1.afficher("red",largeur/4, hauteur/2);

        canevas.on('click', agirSurClic);



    }
    module.getJoueurBoullePosition = function(numeroJoueur){
      switch (numeroJoueur) {
        case 1:
          return joueurBoulle1.getPosition();
          break;
      }
      return null;
    }

    module.setJoueurBoullePosition = function(numeroJoueur,x,y){
      switch (numeroJoueur) {
        case 1:
          joueurBoulle1.setPosition(x,y);
          break;
      }
    }

    module.deplacerJoueurBoulle = function(numeroJoueur,deplacementX, deplacementY)
    {
      switch (numeroJoueur) {
        case 1:
          joueurBoulle1.deplacer(deplacementX, deplacementY);
          break;
      }
    }

    return module;

})();
