(function(){

    var vuePartie;
    var animationFrame;
    var derniereValeurTemporelleMilliseconde;
    var joueur1;
    var joueurActif;

    (function initialiser(){

        multiNode = new MultiNode();
        multiNode.confirmerConnexion = confirmerConnexion;
        multiNode.confirmerAuthentification = confirmerAuthentification;
        multiNode.apprendreAuthentification = apprendreAuthentification;
        multiNode.recevoirVariable = recevoirVariable;
        multiNode.connecter();

        vuePartie = VUE.partie;

        joueur1 = {enMouvement:false};

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

        vuePartie.afficher(900, 700, agirSurClic);
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
      joueurActif.velociteX = 0,
      joueurActif.velociteY = 0,
      joueurActif.pousee = 400;
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
        joueurActif.velociteX = (tx/joueurActif.distance)*joueurActif.pousee;
        joueurActif.velociteY = (ty/joueurActif.distance)*joueurActif.pousee;
      }
      else {
        joueurActif.velociteX = joueurActif.velociteY = 0;
      }

      console.log("jeu-boule --> agirSurClic : joueurActif.distance", joueurActif.distance);
      if(joueurActif.distance > 1 && joueurActif.distance > joueurActif.pousee*deltaValeurTemporelleMilliseconde){
         vuePartie.deplacerJoueurBoulle(
           joueurActif.numeroJoueur,
           joueurActif.velociteX*deltaValeurTemporelleMilliseconde,
           joueurActif.velociteY*deltaValeurTemporelleMilliseconde);
       }else if (joueurActif.distance > 1 && joueurActif.distance < joueurActif.pousee*deltaValeurTemporelleMilliseconde) {
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





})();
