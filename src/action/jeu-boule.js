(function(){

    var vuePartie;

    (function initialiser(){

        multiNode = new MultiNode();
        multiNode.confirmerConnexion = confirmerConnexion;
        multiNode.confirmerAuthentification = confirmerAuthentification;
        multiNode.apprendreAuthentification = apprendreAuthentification;
        multiNode.recevoirVariable = recevoirVariable;
        multiNode.connecter();

        vuePartie = VUE.partie;

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

        //var arrierePlan = new ArrierePlan();
    }

    function agirSurClic(evenement){

      /*  if(balle.velociteX === 0 && balle.velociteY === 0) {

            balle.velociteX = Math.random() * 500 - 150;
            balle.velociteY = Math.random() * 500 - 150;

        }
        var x = evenement.layerX - canevas.parent().offsetLeft
    ,  y = evenement.layerY*/

    console.log("jeu-boule --> agirSurClic: evenement.layerX", evenement.layerX);
    }




})();
