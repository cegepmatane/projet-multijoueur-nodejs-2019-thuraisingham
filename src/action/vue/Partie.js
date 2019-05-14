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

    var groupeBouffeBoulle;


    (function initialiser(){

        document.addEventListener("DOMContentLoaded", preparerVue);

    })();

    function preparerVue(evenement){

        pagePartieContenu = document.querySelector("#page-partie").innerHTML;
        body = document.querySelector("body");


    }

    module.afficher = function(nouvelleLargeur, nouvelleHauteur,nouveauDiametreJoueur, nouveauGroupeBouffeBoulle, agirSurClic){

        body.innerHTML = pagePartieContenu;

        largeur = nouvelleLargeur;
        hauteur = nouvelleHauteur;

        canevas = SVG('canevas').size(largeur, hauteur);
        canevas.viewbox(0, 0, largeur, hauteur);


        arrierePlan = new ArrierePlan(canevas);
        arrierePlan.afficher();

        groupeBouffeBoulle = [];
        afficherGroupeBouffeBoulle(nouveauGroupeBouffeBoulle);

        joueurBoulle1 = new JoueurBoulle(canevas);
        joueurBoulle1.afficher("red",largeur/4, hauteur/2, nouveauDiametreJoueur);

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
    module.cacherGroupeBouffeBoulle = function(groupeBouffeBoulleMange)
    {
      console.log("partie --> cacherGroupeBouffeBoulle --> groupeBouffeBoulleMange.length : ", groupeBouffeBoulleMange.length);
      for(var indiceBoulle = 0;indiceBoulle < groupeBouffeBoulleMange.length;indiceBoulle++)
      {
        groupeBouffeBoulle[groupeBouffeBoulleMange[indiceBoulle]].cacher();
        console.log ("partie --> cacherGroupeBouffeBoulle : ", groupeBouffeBoulle[groupeBouffeBoulleMange[indiceBoulle]]);
      }
    }

    function afficherGroupeBouffeBoulle(nouveauGroupeBouffeBoulle)
    {
      for(var indiceBoulle = 0;indiceBoulle < nouveauGroupeBouffeBoulle.length;indiceBoulle++)
      {
        var bouffeBoulle = new BouffeBoulle(canevas);
        groupeBouffeBoulle[indiceBoulle] = bouffeBoulle;
        bouffeBoulle.afficher(
          nouveauGroupeBouffeBoulle[indiceBoulle].x,
          nouveauGroupeBouffeBoulle[indiceBoulle].y);
      }

    }

    module.grossirJoueurBoulle = function(numeroJoueur, diametre)
    {
      switch (numeroJoueur) {
        case 1:
          joueurBoulle1.grossir(diametre);
          break;
      }

    }

    return module;

})();
