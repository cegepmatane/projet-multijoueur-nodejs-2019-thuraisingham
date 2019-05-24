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
        console.log("CONTROLEUR.partie --> confirmerConnexion");
        multiNode.demanderAuthentification(pseudonyme);
    }

    function confirmerAuthentification(autresParticipants)
    {
        console.log("CONTROLEUR.partie --> confirmerAuthentification");
        ajouterAutresParticipants(autresParticipants);

        joueurLocal = creerJoueur(
          derterminerNumeroJoueur(autresParticipants),
          pseudonymeLocal);
        listeJoueur[joueurLocal.numeroJoueur] = joueurLocal;

    }
    function recevoirVariable(variable){

    console.log("Surcharge de recevoirVariable " + variable.cle + " = " + variable.valeur);

    [cle, numeroJoueur] = variable.cle.split("-");
    switch (cle) {

        case "terrain":
          groupeBouffeBoulle = JSON.parse(variable.valeur);
          demarrerJeu();
        break;

        case "directionJoueur":
          directionJoueur = JSON.parse(variable.valeur);
          listeJoueur[numeroJoueur].destinationX = directionJoueur.destinationX;
          listeJoueur[numeroJoueur].destinationY = directionJoueur.destinationY;
          listeJoueur[numeroJoueur].velociteX = 0;
          listeJoueur[numeroJoueur].velociteY = 0;
        break;
      }
    }

    function isInitialisationTerrain()
    {
      console.log("CONTROLEUR.partie --> isInitialisationTerrain listeJoueur.length : ",
          listeJoueur.length);
      console.log("CONTROLEUR.partie --> isInitialisationTerrain joueurLocal.numeroJoueur : ",
          joueurLocal.numeroJoueur);
      console.log("CONTROLEUR.partie --> isInitialisationTerrain listeJoueur.length > 1 && joueurLocal.numeroJoueur == 0 : ",
          listeJoueur.length > 1 && joueurLocal.numeroJoueur == 0);

      return listeJoueur.length > 1 && joueurLocal.numeroJoueur == 0;
    }

    function initialiserTerrain()
    {
      console.log("CONTROLEUR.partie --> initialiserTerrain");
      var groupeBouffeBoulle = genererGroupeBouffeBoulle();
      multiNode.posterVariableTextuelle(
        "terrain",
        JSON.stringify(groupeBouffeBoulle));
    }

    function derterminerNumeroJoueur(autresParticipants = null)
    {
      if(autresParticipants)
      {
        return autresParticipants.length ;
      }
      else
      {
        return listeJoueur.length;
      }

    }

    function derterminerCouleurJoueur(numeroJoueur)
    {
        switch (numeroJoueur) {
          case 0:
            return "red";
            break;
          case 1:
            return "blue";
            break;
        }
        return null;
    }

    function derterminerPositionInitialeJoueur(numeroJoueur)
    {
        switch (numeroJoueur) {
          case 0:
            return positionInitialeJoueur =
                {
                  x: CONFIGURATION.ECRAN_LARGEUR*0.25,
                  y: CONFIGURATION.ECRAN_HAUTEUR/2
                };
            break;
          case 1:
            return positionInitialeJoueur =
                {
                  x: CONFIGURATION.ECRAN_LARGEUR*0.75,
                  y: CONFIGURATION.ECRAN_HAUTEUR/2
                };
            break;
        }
        return null;
    }

    function creerJoueur(numeroJoueur, pseudonyme)
    {
      var positionInitialeJoueur = derterminerPositionInitialeJoueur(numeroJoueur);
      var couleurJoueur = derterminerCouleurJoueur(numeroJoueur);
      return new MODELE.Joueur(
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

    function ajouterAutresParticipants(autresParticipants)
    {
        for(
          var indiceParticipant = 0;
          indiceParticipant < autresParticipants.length;
          indiceParticipant++)
        {
          var autreJoueur =
              creerJoueur(
                indiceParticipant,
                autresParticipants[indiceParticipant]);
          listeJoueur[autreJoueur.numeroJoueur] = autreJoueur;
        }
    }

    function ajouterAutreJoueur(pseudonyme)
    {
        var autreJoueur =
              creerJoueur(
                derterminerNumeroJoueur(),
                pseudonyme);
          listeJoueur[autreJoueur.numeroJoueur] = autreJoueur;

    }

    function apprendreAuthentification(pseudonyme)
    {
        console.log("CONTROLEUR.partie --> apprendreAuthentification");
        ajouterAutreJoueur(pseudonyme);
        //if(listeJoueur.length > 1) demarrerJeu();
        if(isInitialisationTerrain())
        {
           initialiserTerrain();
        }

    }

    module.preparerJeu = function(pseudonyme)
    {
        console.log("CONTROLEUR.partie --> preparerJeu");
        pseudonymeLocal = pseudonyme;
        multiNode.connecter();


    }

    function demarrerJeu()
    {
        genererGroupeBouffeBoulle();

        vuePartie.afficher(
          CONFIGURATION.ECRAN_LARGEUR,
          CONFIGURATION.ECRAN_HAUTEUR,
          listeJoueur,
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

    console.log("CONTROLEUR.partie --> agirSurClic");
    //determinerDirectionJoueur(evenement.layerX, evenement.layerY);
    multiNode.posterVariableTextuelle(
      "directionJoueur-"+ joueurLocal.numeroJoueur,
      JSON.stringify(
        {
          destinationX: evenement.layerX,
          destinationY: evenement.layerY
        }
      ));
    }

    /*function determinerDirectionJoueur(destinationX, destinationY)
    {
      joueurLocal.destinationX = destinationX;
      joueurLocal.destinationY = destinationY;
      joueurLocal.velociteX = 0;
      joueurLocal.velociteY = 0;
    }*/

    function _mettreAJourJeu(deltaValeurTemporelleMilliseconde) {

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

      //console.log("CONTROLEUR.partie --> agirSurClic : joueurLocal.distance", joueurLocal.distance);
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
      // console.log("CONTROLEUR.partie --> detecterCollisionBoulle --> groupeBouffeBoulleMange: ",groupeBouffeBoulleMange);
       if (detecterCollisionBoulle())
       {
         cacherGroupeBouffeBoulle();
         grossirJoueurBoulle();
       }
    }

    function mettreAJourJeu(deltaValeurTemporelleMilliseconde)
    {
      for(
        var indiceJoueur = 0;
        indiceJoueur < listeJoueur.length;
        indiceJoueur++)
      {
        var [positionX, positionY] =
         vuePartie.getJoueurBoullePosition(listeJoueur[indiceJoueur].numeroJoueur);
         listeJoueur[indiceJoueur].x = positionX;
         listeJoueur[indiceJoueur].y = positionY;
         var tx = listeJoueur[indiceJoueur].destinationX - listeJoueur[indiceJoueur].x;
         var ty = listeJoueur[indiceJoueur].destinationY - listeJoueur[indiceJoueur].y;
         listeJoueur[indiceJoueur].distance = Math.sqrt(tx*tx+ty*ty);

         if(listeJoueur[indiceJoueur].distance != 0){
           listeJoueur[indiceJoueur].velociteX = (tx/listeJoueur[indiceJoueur].distance)*CONFIGURATION.JOUEUR_POUSSEE;
           listeJoueur[indiceJoueur].velociteY = (ty/listeJoueur[indiceJoueur].distance)*CONFIGURATION.JOUEUR_POUSSEE;
         }
         else {
           listeJoueur[indiceJoueur].velociteX = listeJoueur[indiceJoueur].velociteY = 0;
         }
         if(listeJoueur[indiceJoueur].distance > 1 &&
           listeJoueur[indiceJoueur].distance > CONFIGURATION.JOUEUR_POUSSEE*deltaValeurTemporelleMilliseconde){
            vuePartie.deplacerJoueurBoulle(
              listeJoueur[indiceJoueur].numeroJoueur,
              listeJoueur[indiceJoueur].velociteX*deltaValeurTemporelleMilliseconde,
              listeJoueur[indiceJoueur].velociteY*deltaValeurTemporelleMilliseconde);
          }else if (listeJoueur[indiceJoueur].distance > 1 &&
            listeJoueur[indiceJoueur].distance < CONFIGURATION.JOUEUR_POUSSEE*deltaValeurTemporelleMilliseconde) {
            vuePartie.setJoueurBoullePosition(
              listeJoueur[indiceJoueur].numeroJoueur,
              listeJoueur[indiceJoueur].destinationX,
              listeJoueur[indiceJoueur].destinationY);
          }
      }



      //console.log("CONTROLEUR.partie --> agirSurClic : joueurLocal.distance", joueurLocal.distance);

      // console.log("CONTROLEUR.partie --> detecterCollisionBoulle --> groupeBouffeBoulleMange: ",groupeBouffeBoulleMange);
       /*if (detecterCollisionBoulle())
       {
         cacherGroupeBouffeBoulle();
         grossirJoueurBoulle();

       }*/

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
      var groupeBouffeBoulle = [];
      for(var indiceBoulle = 0;indiceBoulle < CONFIGURATION.NOMBRE_BOUFFE_BOULLE;indiceBoulle++)
      {
        boulleX = obtenirValeurAleatoir(0, CONFIGURATION.ECRAN_LARGEUR);
        boulleY = obtenirValeurAleatoir(0, CONFIGURATION.ECRAN_HAUTEUR);
        groupeBouffeBoulle[indiceBoulle] = {x : boulleX, y : boulleY, visible : true};
      }
      return groupeBouffeBoulle;
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
          //console.log("CONTROLEUR.partie --> detecterCollisionBoulle --> rayonBouffeBoule : ",rayonBouffeBoule);
          //console.log("CONTROLEUR.partie --> detecterCollisionBoulle --> rayonJoueur : ",rayonJoueur);


          sommeRayon = rayonBouffeBoule + rayonJoueur;
          //console.log("CONTROLEUR.partie --> detecterCollisionBoulle --> sommeRayon*** : ",sommeRayon);
          deltaX = groupeBouffeBoulle[indiceBoulle].x - positionJoueurX;
          //console.log("CONTROLEUR.partie --> detecterCollisionBoulle --> deltaX : ",deltaX);
          deltaY = groupeBouffeBoulle[indiceBoulle].y - positionJoueurY;
          //console.log("CONTROLEUR.partie --> detecterCollisionBoulle --> deltaY : ",deltaY);
          //console.log("CONTROLEUR.partie --> detecterCollisionBoulle --> Math.sqrt : ",Math.sqrt((deltaX * deltaX) + (deltaY * deltaY)));
          //console.log("CONTROLEUR.partie --> detecterCollisionBoulle --> ******groupeBouffeBoulleMange.lenght: ",groupeBouffeBoulleMange.length);
          if (sommeRayon > Math.sqrt((deltaX * deltaX) + (deltaY * deltaY))) {
            var longeurGroupeBouffeBoulleMange = groupeBouffeBoulleMange.length;
            //console.log("CONTROLEUR.partie --> detecterCollisionBoulle --> longeurGroupeBouffeBoulleMange : ",longeurGroupeBouffeBoulleMange);
            groupeBouffeBoulleMange[longeurGroupeBouffeBoulleMange] = indiceBoulle;

          //  console.log("CONTROLEUR.partie --> detecterCollisionBoulle --> indiceBoulle : ",indiceBoulle);
          }
      }
    }

      return groupeBouffeBoulleMange.length > 0;

    }

    return module;


})();
