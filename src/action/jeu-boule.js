(function(){

    var vuePartie;
    var animationFrame;
    var derniereValeurTemporelleMilliseconde;
    var joueur1;
    var joueurActif;
    var groupeBouffeBoulle;
    var CONFIGURATION =
      {
        ECRAN_LARGEUR: 900,
        ECRAN_HAUTEUR: 700,
        JOUEUR_POUSSEE: 400,
        NOMBRE_BOUFFE_BOULLE: 50
      };

    (function initialiser(){

        multiNode = new MultiNode();
        multiNode.confirmerConnexion = confirmerConnexion;
        multiNode.confirmerAuthentification = confirmerAuthentification;
        multiNode.apprendreAuthentification = apprendreAuthentification;
        multiNode.recevoirVariable = recevoirVariable;
        multiNode.connecter();

        vuePartie = VUE.partie;

        joueur1 = {};
        groupeBouffeBoulle = [];

        document.addEventListener("DOMContentLoaded", preparerJeu);

    })();

    function confirmerConnexion()
    {
        console.log("jeu-boule --> confirmerConnexion");
    }

    function confirmerAuthentification(autresParticipants)
    {
        console.log("jeu-boule --> confirmerAuthentification");
    }

    function apprendreAuthentification(pseudonyme)
    {
        console.log("jeu-boule --> apprendreAuthentification");
    }

    function recevoirVariable(variable)
    {
        console.log("jeu-boule --> recevoirVariable");
    }
    function preparerJeu(evenement)
    {
        console.log("jeu-boule --> preparerJeu");

        genererGroupeBouffeBoulle();

        vuePartie.afficher(
          CONFIGURATION.ECRAN_LARGEUR,
          CONFIGURATION.ECRAN_HAUTEUR,
          groupeBouffeBoulle,
          agirSurClic);

        joueur1.numeroJoueur = 1;
        joueurActif = joueur1;

        preparerRafraichissementEcran();

        //var arrierePlan = new ArrierePlan();

    }

    function agirSurClic(evenement){

      /*  if(balle.velociteX === 0 && balle.velociteY === 0) {

            balle.velociteX = Math.random() * 500 - 150;
            balle.velociteY = Math.random() * 500 - 150;

        }
        var x = evenement.layerX - canevas.parent().offsetLeft
    ,  y = evenement.layerY*/

    console.log("jeu-boule --> agirSurClic");
    determinerDirectionJoueur(evenement.layerX, evenement.layerY);
    }

    function determinerDirectionJoueur(destinationX, destinationY)
    {

      joueurActif.destinationX = destinationX;
      joueurActif.destinationY = destinationY;
      joueurActif.velociteX = 0;
      joueurActif.velociteY = 0;
    }

    function mettreAJourJeu(deltaValeurTemporelleMilliseconde) {
      var [positionX, positionY] =
       vuePartie.getJoueurBoullePosition(joueurActif.numeroJoueur);
      joueurActif.x = positionX;
      joueurActif.y = positionY;
      var tx = joueurActif.destinationX - joueurActif.x;
      var ty = joueurActif.destinationY - joueurActif.y;
      joueurActif.distance = Math.sqrt(tx*tx+ty*ty);

      if(joueurActif.distance != 0){
        joueurActif.velociteX = (tx/joueurActif.distance)*CONFIGURATION.JOUEUR_POUSSEE;
        joueurActif.velociteY = (ty/joueurActif.distance)*CONFIGURATION.JOUEUR_POUSSEE;
      }
      else {
        joueurActif.velociteX = joueurActif.velociteY = 0;
      }

      console.log("jeu-boule --> agirSurClic : joueurActif.distance", joueurActif.distance);
      if(joueurActif.distance > 1 &&
        joueurActif.distance > CONFIGURATION.JOUEUR_POUSSEE*deltaValeurTemporelleMilliseconde){
         vuePartie.deplacerJoueurBoulle(
           joueurActif.numeroJoueur,
           joueurActif.velociteX*deltaValeurTemporelleMilliseconde,
           joueurActif.velociteY*deltaValeurTemporelleMilliseconde);
       }else if (joueurActif.distance > 1 &&
         joueurActif.distance < CONFIGURATION.JOUEUR_POUSSEE*deltaValeurTemporelleMilliseconde) {
         vuePartie.setJoueurBoullePosition(
           joueurActif.numeroJoueur,
           joueurActif.destinationX,
           joueurActif.destinationY);
       }

    }

    function preparerRafraichissementEcran(valeurTemporelleMilliseconde) {

        // we get passed a timestamp in milliseconds
        // we use it to determine how much time has passed since the last call
        if (derniereValeurTemporelleMilliseconde) {

          //mettreAJourJeu((valeurTemporelleMilliseconde-derniereValeurTemporelleMilliseconde)/1000); // call update and pass delta time in seconds
          mettreAJourJeu((valeurTemporelleMilliseconde-
                                     derniereValeurTemporelleMilliseconde)
                                     /1000); // call update and pass delta time in seconds

        }

        derniereValeurTemporelleMilliseconde = valeurTemporelleMilliseconde;
        animationFrame = requestAnimationFrame(preparerRafraichissementEcran);

    }
    function genererGroupeBouffeBoulle()
    {
      for(var indiceBoulle = 0;indiceBoulle < CONFIGURATION.NOMBRE_BOUFFE_BOULLE;indiceBoulle++)
      {
        boulleX = obtenirValeurAleatoir(0, CONFIGURATION.ECRAN_LARGEUR);
        boulleY = obtenirValeurAleatoir(0, CONFIGURATION.ECRAN_HAUTEUR);
        groupeBouffeBoulle[indiceBoulle] = {x : boulleX, y : boulleY};
      }

    }
    function obtenirValeurAleatoir(minimun, maximum)
    {
      minimun = Math.ceil(minimun);
      maximum = Math.floor(maximum);
      return Math.floor(Math.random() * (maximum - minimun + 1)) + minimun;
    }




})();
