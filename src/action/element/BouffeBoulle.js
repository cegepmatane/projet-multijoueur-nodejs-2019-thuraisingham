var BouffeBoulle = function(nouveauCanevas){

    var canevas;
    var couleur;
    var boulle;
    var diametre;
    var couleur;


    (function initialiser(){

        canevas = nouveauCanevas;
        couleur = "blue";
        diametre = 25;

    })();

    this.afficher = function(positionBoulleX, positionBoulleY){

        boulle = canevas.circle(diametre);
        boulle.center(positionBoulleX, positionBoulleY).fill(couleur);


    }

    this.getPosition = function(){

        return [boulle.cx(), boulle.cy()];
    }

    this.setPosition = function(x, y){

        boulle.cx(x);
        boulle.cy(y);

    }
    this.cacher = function(){
      boulle.hide();
    }

};
