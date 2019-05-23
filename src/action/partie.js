var CONTROLEUR = CONTROLEUR || {};

CONTROLEUR.partie = (function(){

    var module = {};

    var vuePartie;
    var animationFrame;
    var derniereValeurTemporelleMilliseconde;
    var joueurLocal;
    var pseudonymeLocal;
    var listeJoueur;
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


        vuePartie = VUE.partie;



        groupeBouffeBoulle = [];
        groupeBouffeBoulleMange = [];
        listeJoueur = [];

        //document.addEventListener("DOMContentLoaded", preparerJeu);

    })();

    function confirmerConnexion()
    {
        console.log("jeu-boule --> confirmerConnexion");
        multiNode.demanderAuthentification(pseudonyme);
    }

    function confirmerAuthentification(autresParticipants)
    {
        console.log("jeu-boule --> confirmerAuthentification");
        creerJoueurLocal(
          derterminerNumeroJoueur(autresParticipants),
          pseudonymeLocal);
        demarrerJeu();
    }

    function derterminerNumeroJoueur(autresParticipants)
    {
          return autresParticipants.length +1;
    }

    function derterminerCouleurJoueur(numeroJoueur)
    {
        switch (numeroJoueur) {
          case 1:
            return "red";
            break;
          case 2:
            return "blue";
            break;
        }
        return null;
    }

    function derterminerPositionInitialeJoueur(numeroJoueur)
    {
        switch (numeroJoueur) {
          case 1:
            return positionInitialeJoueur =
                {
                  x: CONFIGURATION.ECRAN_LARGEUR*0.25,
                  y: CONFIGURATION.ECRAN_HAUTEUR/2
                };
            break;
          case 2:
            return positionInitialeJoueur =
                {
                  x: CONFIGURATION.ECRAN_LARGEUR*0.75,
                  y: CONFIGURATION.ECRAN_HAUTEUR/2
                };
            break;
        }
        return null;
    }

    function creerJoueurLocal(numeroJoueur, pseudonyme)
    {
      var positionInitialeJoueur = derterminerPositionInitialeJoueur(numeroJoueur);
      var couleurJoueur = derterminerCouleurJoueur(numeroJoueur);
      joueurLocal = new MODELE.Joueur(
          numeroJoueur,
          pseudonyme,
          couleurJoueur,
          CONFIGURATION.JOUEUR_DIAMETRE_INITIAL,
          positionInitialeJoueur.x,
          positionInitialeJoueur.y,
          positionInitialeJoueur.x,
          positionInitialeJoueur.y,
          0,
          0,
          0);
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
        pseudonymeLocal = pseudonyme;
        multiNode.connecter();


    }

    function demarrerJeu()
    {
        genererGroupeBouffeBoulle();

        vuePartie.afficher(
          CONFIGURATION.ECRAN_LARGEUR,
          CONFIGURATION.ECRAN_HAUTEUR,
          joueurLocal,
          groupeBouffeBoulle,
          agirSurClic);

        //joueurLocal.numeroJoueur = 1;
        //joueurLocal.diametre = CONFIGURATION.JOUEUR_DIAMETRE_INITIAL;
      //  joueurLocal = joueurLocal;


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

      joueurLocal.destinationX = destinationX;
      joueurLocal.destinationY = destinationY;
      joueurLocal.velociteX = 0;
      joueurLocal.velociteY = 0;
    }

    function mettreAJourJeu(deltaValeurTemporelleMilliseconde) {

      var [positionX, positionY] =
       vuePartie.getJoueurBoullePosition(joueurLocal.numeroJoueur);
      joueurLocal.x = positionX;
      joueurLocal.y = positionY;
      var tx = joueurLocal.destinationX - joueurLocal.x;
      var ty = joueurLocal.destinationY - joueurLocal.y;
      joueurLocal.distance = Math.sqrt(tx*tx+ty*ty);

      if(joueurLocal.distance != 0){
        joueurLocal.velociteX = (tx/joueurLocal.distance)*CONFIGURATION.JOUEUR_POUSSEE;
        joueurLocal.velociteY = (ty/joueurLocal.distance)*CONFIGURATION.JOUEUR_POUSSEE;
      }
      else {
        joueurLocal.velociteX = joueurLocal.velociteY = 0;
      }

      //console.log("jeu-boule --> agirSurClic : joueurLocal.distance", joueurLocal.distance);
      if(joueurLocal.distance > 1 &&
        joueurLocal.distance > CONFIGURATION.JOUEUR_POUSSEE*deltaValeurTemporelleMilliseconde){
         vuePartie.deplacerJoueurBoulle(
           joueurLocal.numeroJoueur,
           joueurLocal.velociteX*deltaValeurTemporelleMilliseconde,
           joueurLocal.velociteY*deltaValeurTemporelleMilliseconde);
       }else if (joueurLocal.distance > 1 &&
         joueurLocal.distance < CONFIGURATION.JOUEUR_POUSSEE*deltaValeurTemporelleMilliseconde) {
         vuePartie.setJoueurBoullePosition(
           joueurLocal.numeroJoueur,
           joueurLocal.destinationX,
           joueurLocal.destinationY);
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
      joueurLocal.diametre += CONFIGURATION.POID_AUGMENTATION;
      vuePartie.grossirJoueurBoulle(joueurLocal.numeroJoueur, joueurLocal.diametre);
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
        vuePartie.getJoueurBoullePosition(joueurLocal.numeroJoueur);

      for(var indiceBoulle = 0;indiceBoulle < CONFIGURATION.NOMBRE_BOUFFE_BOULLE;indiceBoulle++)
      {
        if(groupeBouffeBoulle[indiceBoulle].visible){
          //groupeBouffeBoulle[indiceBoulle] = {x : boulleX, y : boulleY};
          var sommeRayon;
          var deltaX;
          var deltaY;
          var rayonBouffeBoule = CONFIGURATION.BOUFFE_BOULLE_DIAMETRE / 2;
          var rayonJoueur = joueurLocal.diametre / 2;
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
