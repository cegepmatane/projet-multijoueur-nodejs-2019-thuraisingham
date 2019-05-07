var JoueurBoulle = function(nouveauCanevas){

    var canevas;
    var couleur;
    var boulle;
    var diametre;
    var couleurDynamique;


    (function initialiser(){

        canevas = nouveauCanevas;

        diametre = 50;

    })();

    this.afficher = function(nouvelleCouleur,positionJoueurX, positionJoueurY){

        couleur = nouvelleCouleur;
        boulle = canevas.circle(diametre);
        boulle.center(positionJoueurX, positionJoueurY).fill(couleur);


    }

    this.deplacer = function(x, y){

        boulle.dmove(x, y);

    }

    this.getPosition = function(){

        return [boulle.cx(), boulle.cy()];
    }

    this.setPosition = function(x, y){

        boulle.cx(x);
        boulle.cy(y);

    }

};
