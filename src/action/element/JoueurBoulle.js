var JoueurBoulle = function(nouveauCanevas){

    var canevas;
    var groupe;

    var couleur;
    var boulle;
    var diametre;
    var pseudonyme;

    var texte;
    var couleurDynamique;

    (function initialiser(){

        canevas = nouveauCanevas;

    })();

    this.afficher = function(
        nouvelleCouleur,
        nouveauPseudonyme,
        nouveauDiametre,
        nouvellePositionX,
        nouvellePositionY){
        //groupe = canevas.group();

      /*  couleur = nouvelleCouleur;
        pseudonyme = nouveauPseudonyme;
        diametre =  nouveauDiametre;
        boulle = canevas.circle(diametre).fill(couleur);
        boulle.center(0,0);
        groupe.add(boulle);
        groupe.center(nouvellePositionX, nouvellePositionY);
        //boulle.center(nouvellePositionX, nouvellePositionY).fill(couleur);
        console.log("pseudonyme --> : ", pseudonyme);
        var text = canevas.text(pseudonyme).attr({x:0,y:0});
        groupe.add(text);*/

        couleur = nouvelleCouleur;
        pseudonyme = nouveauPseudonyme;
        diametre =  nouveauDiametre;
        boulle = canevas.circle(diametre);
        boulle.center(nouvellePositionX, nouvellePositionY).fill(couleur);
        texte = canevas.text(pseudonyme).attr({x:nouvellePositionX,y:nouvellePositionY});
        texte.font({size: 30, family: 'Helvetica'});

        couleurDynamique = new SVG.Color('#ff0066');
        couleurDynamique.morph('#00ff99');
    }

    this.deplacer = function(x, y){

        boulle.dmove(x, y);
        texte.dmove(x, y);
        boulle.fill(couleurDynamique.at(1/canevas.width()*boulle.x()));

    }

    this.getPosition = function(){

        return [boulle.cx(), boulle.cy()];
    }

    this.setPosition = function(x, y){

        boulle.cx(x);
        boulle.cy(y);
        texte.cx(x);
        texte.cy(y);
    }

    this.cacher = function(){

        boulle.hide();
    }

    this.grossir = function(diametre)
    {
        boulle.radius(diametre/2);
        texte.text(pseudonyme + " " + diametre/2);
    }

};
