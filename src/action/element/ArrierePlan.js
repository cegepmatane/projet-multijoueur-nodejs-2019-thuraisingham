var ArrierePlan = function(nouveauCanevas){

    var canevas;
    var couleur;
    

    (function initialiser(){

        canevas = nouveauCanevas;

        couleur = '#dde3e1';

    })();

    this.afficher = function(){

        // draw background
        canevas.rect(canevas.width(), canevas.height()).fill(couleur);
    }

};