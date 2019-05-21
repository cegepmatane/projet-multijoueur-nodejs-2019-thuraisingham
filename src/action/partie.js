var CONTROLEUR = CONTROLEUR || {};

CONTROLEUR.partie = (function(){

    var module = {};
    
    var vuePartie;
    var animationFrame;
    var derniereValeurTemporelleMilliseconde;
    var joueur1;
    var joueurActif;
    var groupeBouffeBoulle;
    var groupeBouffeBoulleMange;
    var CONFIGURATION =
      {
        ECRAN_LARGEUR: 900,
        ECRAN_HAUTEUR: 700,
        JOUEUR_POUSSEE: 400,
        NOMBRE_BOUFFE_BOULLE: 50,
        BOUFFE_BOULLE_DIAMETRE: 25,
        JOUEUR_DIAMETRE_INITIAL : 50,
        POID_AUGMENTATION : 10
      };

    (function initialiser(){

        multiNode = new MultiNode();
        multiNode.confirmerConnexion = confirmerConnexion;
        multiNode.confirmerAuthentification = confirmerAuthentification;
        multiNode.apprendreAuthentification = apprendreAuthentification;
        multiNode.recevoirVariable = recevoirVariable;
        //multiNode.connecter();

        vuePartie = VUE.partie;

        joueur1 = new MODELE.Joueur(
          1,
          "red",
          CONFIGURATION.JOUEUR_DIAMETRE_INITIAL,
          CONFIGURATION.ECRAN_LARGEUR/4,
          CONFIGURATION.ECRAN_HAUTEUR/2,
          CONFIGURATION.ECRAN_LARGEUR/4,
          CONFIGURATION.ECRAN_HAUTEUR/2,
          0,
          0,
          0);

        groupeBouffeBoulle = [];
        groupeBouffeBoulleMange = [];

        //document.addEventListener("DOMContentLoaded", preparerJeu);

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
    module.preparerJeu = function(pseudonyme)
    {
        console.log("jeu-boule --> preparerJeu");

        genererGroupeBouffeBoulle();


        vuePartie.afficher(
          CONFIGURATION.ECRAN_LARGEUR,
          CONFIGURATION.ECRAN_HAUTEUR,
          joueur1,
          groupeBouffeBoulle,
          agirSurClic);

        //joueur1.numeroJoueur = 1;
        //joueur1.diametre = CONFIGURATION.JOUEUR_DIAMETRE_INITIAL;
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

      //console.log("jeu-boule --> agirSurClic : joueurActif.distance", joueurActif.distance);
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
      // console.log("jeu-boule --> detecterCollisionBoulle --> groupeBouffeBoulleMange: ",groupeBouffeBoulleMange);
       if (detecterCollisionBoulle())
       {
         cacherGroupeBouffeBoulle();
         grossirJoueurBoulle();

       }

    }

    function grossirJoueurBoulle()
    {
      joueurActif.diametre += CONFIGURATION.POID_AUGMENTATION;
      vuePartie.grossirJoueurBoulle(joueurActif.numeroJoueur, joueurActif.diametre);
    }

    function cacherGroupeBouffeBoulle()
    {
      vuePartie.cacherGroupeBouffeBoulle(groupeBouffeBoulleMange);
      for(var indiceBoulle = 0;indiceBoulle < groupeBouffeBoulleMange.length;indiceBoulle++)
      {
        groupeBouffeBoulle[groupeBouffeBoulleMange[indiceBoulle]].visible = false;
      //  console.log ("partie --> cacherGroupeBouffeBoulle : ", groupeBouffeBoulle[groupeBouffeBoulleMange[indiceBoulle]]);
      }
      groupeBouffeBoulleMange= [];
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
        groupeBouffeBoulle[indiceBoulle] = {x : boulleX, y : boulleY, visible : true};
      }

    }

    function obtenirValeurAleatoir(minimun, maximum)
    {
      minimun = Math.ceil(minimun);
      maximum = Math.floor(maximum);
      return Math.floor(Math.random() * (maximum - minimun + 1)) + minimun;
    }

    function detecterCollisionBoulle()
    {
      var [positionJoueurX, positionJoueurY] =
        vuePartie.getJoueurBoullePosition(joueurActif.numeroJoueur);

      for(var indiceBoulle = 0;indiceBoulle < CONFIGURATION.NOMBRE_BOUFFE_BOULLE;indiceBoulle++)
      {
        if(groupeBouffeBoulle[indiceBoulle].visible){
          //groupeBouffeBoulle[indiceBoulle] = {x : boulleX, y : boulleY};
          var sommeRayon;
          var deltaX;
          var deltaY;
          var rayonBouffeBoule = CONFIGURATION.BOUFFE_BOULLE_DIAMETRE / 2;
          var rayonJoueur = joueurActif.diametre / 2;
          //console.log("jeu-boule --> detecterCollisionBoulle --> rayonBouffeBoule : ",rayonBouffeBoule);
          //console.log("jeu-boule --> detecterCollisionBoulle --> rayonJoueur : ",rayonJoueur);


          sommeRayon = rayonBouffeBoule + rayonJoueur;
          //console.log("jeu-boule --> detecterCollisionBoulle --> sommeRayon*** : ",sommeRayon);
          deltaX = groupeBouffeBoulle[indiceBoulle].x - positionJoueurX;
          //console.log("jeu-boule --> detecterCollisionBoulle --> deltaX : ",deltaX);
          deltaY = groupeBouffeBoulle[indiceBoulle].y - positionJoueurY;
          //console.log("jeu-boule --> detecterCollisionBoulle --> deltaY : ",deltaY);
          //console.log("jeu-boule --> detecterCollisionBoulle --> Math.sqrt : ",Math.sqrt((deltaX * deltaX) + (deltaY * deltaY)));
          //console.log("jeu-boule --> detecterCollisionBoulle --> ******groupeBouffeBoulleMange.lenght: ",groupeBouffeBoulleMange.length);
          if (sommeRayon > Math.sqrt((deltaX * deltaX) + (deltaY * deltaY))) {
            var longeurGroupeBouffeBoulleMange = groupeBouffeBoulleMange.length;
            //console.log("jeu-boule --> detecterCollisionBoulle --> longeurGroupeBouffeBoulleMange : ",longeurGroupeBouffeBoulleMange);
            groupeBouffeBoulleMange[longeurGroupeBouffeBoulleMange] = indiceBoulle;

          //  console.log("jeu-boule --> detecterCollisionBoulle --> indiceBoulle : ",indiceBoulle);
          }
      }
    }

      return groupeBouffeBoulleMange.length > 0;

    }

    return module;


})();
