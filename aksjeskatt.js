var visInndataBool = false;

var kursKjopsListe = [];
var antallKjopsListe = [];

var kursSalgsListe = [];
var antallSalgsListe = [];


var langKjopsListe = [];
var langSalgsListe = [];

function visInndata(){
    var html = `<p><h3>Kjop:</h3></p> <table>
    <tr><td>Antall:</td><td>Kurs:</td><td>Kurtasje:</td>
    </tr>
    <tr>
    <td colspan="1">
        <input size="6" type="text" id="kjopsAntall"/>
    </td>
    <td colspan="1">  
        <input size="6" type="text" id="kjopsKurs"/>
    </td>
    <td colspan="1">   
        <input size="6" type="text" id="kjopsKurtasje"/>
    </td>
        <td colspan="1"><button class="leggTilKnapp" onclick="leggTilKjopsData()">legg til data</button>
    </td>  
      
    
    </tr>
    
    <tr><td>&nbsp;</td></tr>
    </table>
    
    <p><h3>Salg:</h3></p>

    <table>
    <tr><td>Antall:</td><td>Kurs:</td><td>Kurtasje:</td>
    </tr>
    <tr>
    <td colspan="1">
        <input size="6" type="text" id="salgsAntall"/>
    </td>
    <td colspan="1">  
        <input size="6" type="text" id="salgsKurs"/>
    </td>
    <td colspan="1">   
        <input size="6" type="text" id="salgsKurtasje"/>
    </td>
        <td colspan="1"><button class="leggTilnKnapp" onclick="leggTilSalgsData()">legg til data</button>
    </td>  
      
    
    </tr>
    
    <tr><td>&nbsp;</td></tr>
    </table>
    
    `;

    

   

    if (visInndataBool == false){
        document.getElementById('inndata').innerHTML = html;
        visInndataBool = true;
    }
    else {
        document.getElementById('inndata').innerHTML = '';
        visInndataBool = false;

    }
 

}

function leggTilKjopsData(){
    var antall = parseInt(document.getElementById('kjopsAntall').value);
    var kurs = Number(document.getElementById('kjopsKurs').value);
    var kurtasje = Number(document.getElementById('kjopsKurtasje').value);
    kurs += kurtasje/antall;

    kursKjopsListe.push(kurs.toFixed(2));
    antallKjopsListe.push(antall);

    visKjopsliste();



}

function leggTilSalgsData(){
    var antall = parseInt(document.getElementById('salgsAntall').value);
    var kurs = Number(document.getElementById('salgsKurs').value);
    var kurtasje = Number(document.getElementById('salgsKurtasje').value);
    kurs -= kurtasje/antall;

    kursSalgsListe.push(kurs.toFixed(2));
    antallSalgsListe.push(antall);

    visSalgsListe();

}



function visKjopsliste(){
    var html = `<p><h3>Kjopsliste:</h3></p> <table>
    <tr><td>Antall:</td><td>Kurs:</td>
    </tr>`;
    
    for(var i=0;i<kursKjopsListe.length;i++){
        html += `<tr>
        <td>
            ${antallKjopsListe[i]}
            
        </td>
        <td>
            ${kursKjopsListe[i]}  
            
        </td>
        </tr>`;
    }    
    
    html += `<tr><td>&nbsp;</td></tr>
        </table>`;

        document.getElementById('kjopsdata').innerHTML = html;    

}

function visSalgsListe(){
    var html = `<p><h3>Salgsliste:</h3></p> <table>
    <tr><td>Antall:</td><td>Kurs:</td>
    </tr>`;
    
    for(var i=0;i<kursSalgsListe.length;i++){
        html += `<tr>
        <td>
            ${antallSalgsListe[i]}
            
        </td>
        <td>
            ${kursSalgsListe[i]}  
            
        </td>
        </tr>`;
    }    
    
    html += `<tr><td>&nbsp;</td></tr>
        </table>`;

        document.getElementById('salgsdata').innerHTML = html;

}




function tilLangliste(kursliste, antalliste){
    var langListe = []
    var i = 0;
    for(var x = 0; x<kursliste.length;x++){
        for(var y = 0;y<antalliste[i];y++){
            langListe.push(kursliste[i]);

        }
        i++;
    }
    return langListe;


}

function kalkulerAvkastning(_langListeKjop, _langListeSalg){
    var avkastningsliste = [];
    for(var i = 0;i<_langListeSalg.length;i++){
        avkastningsliste.push(_langListeSalg[i] - _langListeKjop[i]);
    }
    var sum_ = 0;
    for(var j = 0;j<avkastningsliste.length;j++){
        sum_ += avkastningsliste[j];

    }
    return sum_;


}

function visAvkastning(){

    var formatter = new Intl.NumberFormat('nb-NO', {
        style: 'currency',
        currency: 'NOK',

    });

    //  var _langKjopsListe = tilLangliste(kursKjopsListe, antallKjopsListe);
    langKjopsListe = tilLangliste(kursKjopsListe, antallKjopsListe);
    langSalgsListe = tilLangliste(kursSalgsListe, antallSalgsListe);
    //burde strengt tatt hatt andre variabelnavn her..
    var avkastning = kalkulerAvkastning(langKjopsListe, langSalgsListe).toFixed(2);
    var avkastningNOK = formatter.format(avkastning);

    var html = '';

    if(avkastning < 0)
        html = `<p>DU HAR NEGATIV AVKASTNING!</p>`;
        
    
    html += `<p><b>Avkastning:<b> ${avkastningNOK}</p>`;

    document.getElementById('avkastning').innerHTML = html;

    //document.getElementById('avkastningsdata').innerHTML += `<p>Avkastning: ${avkastningNOK}</p>`;
    visUrealiserte();

}

function slettData(){

    kursKjopsListe = [];
    antallKjopsListe = [];

    kursSalgsListe = [];
    antallSalgsListe = [];

    langKjopsListe = [];
    langSalgsListe = [];


    visKjopsliste();
    visSalgsListe();

    visUrealiserte();
}


function visUrealiserte(){

    var html = '<p><h3>Urealiserte aksjer:</h3></p>';
    var ny_liste_kurs = [];
    var ny_liste_antall = [];
    var start_urealisert = langSalgsListe.length;
    var aksje_count = 1;
    

    for(var i=0;i<(langKjopsListe.length - langSalgsListe.length);i++){

        

         
        if((start_urealisert+i)>=(langKjopsListe.length - 1)){
           

            ny_liste_kurs.push(langKjopsListe[start_urealisert+i]);
            ny_liste_antall.push(aksje_count);
            break;
        }
        if(langKjopsListe[start_urealisert+i] != langKjopsListe[start_urealisert+i+1]){
            ny_liste_kurs.push(langKjopsListe[start_urealisert+i]);
            ny_liste_antall.push(aksje_count);
            aksje_count = 1;
        }
        else{
            aksje_count +=1;
        }
        

    }
    //logikk for å printe ut..
    if(ny_liste_kurs.length == 0)
        html += `<p>Alle aksjer er realisert!</p>`;


    
    html += `<table>
    <tr><td>Antall:</td><td>Kurs:</td>
    </tr>`;
    
    for(var j=0;j<ny_liste_kurs.length;j++){
        html += `<tr>
        <td>
            ${ny_liste_antall[j]}
            
        </td>
        <td>
            ${ny_liste_kurs[j]}  
            
        </td>
        </tr>`;
    }    
    
    html += `<tr><td>&nbsp;</td></tr>
        </table>`;
    

    

    document.getElementById('urealiserteData').innerHTML = html;

}







