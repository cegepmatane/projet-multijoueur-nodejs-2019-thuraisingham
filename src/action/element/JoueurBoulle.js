var JoueurBoulle = function(nouveauCanevas){

    var canevas;
    var couleur;
    var boulle;
    var diametre;


    (function initialiser(){

        canevas = nouveauCanevas;



    })();

    this.afficher = function(
        nouvelleCouleur,
        nouveauDiametre,
        nouvellePositionX,
        nouvellePositionY,){

        couleur = nouvelleCouleur;
        diametre =  nouveauDiametre;
        boulle = canevas.circle(diametre);
        boulle.center(nouvellePositionX, nouvellePositionY).fill(couleur);
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

    this.cacher = function(){

        boulle.hide();
    }

    this.grossir = function(diametre)
    {
        boulle.radius(diametre/2);
    }

};
