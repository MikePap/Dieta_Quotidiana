// dieta2.js 			

// Gestione elemento punto interrogativo per aiuto su 'Consigli utuili'
var interrogativo = document.getElementById('int');
var spiegaz = document.getElementById('spiegaz');
var xInfo = document.getElementById('xInfo');
 
interrogativo.addEventListener('click', function(){
//	this.style.display = "none";
	spiegaz.style["top"] = 0;
	spiegaz.style["transition"] = "top 500ms ease-out"; 
//	spiegaz.style.display = "block";
},false);


xInfo.addEventListener("click", function (){
//	spiegaz.style.display = "none";
	spiegaz.style["top"] = "-1000px";
	spiegaz.style["transition"] = "top 500ms ease-in 200ms";
	interrogativo.style.display = "block";
},false);

/////////////////////////////////////////////////////////////////////////////////////////////////////

// Variabili globali 
var acca1 = document.getElementById('h1Dieta');											// elemento titolo H1
var ceckCalorie = document.getElementById('ceckCalorie');
var fabbisogniEnergetici = document.getElementById('fabbisogniEnergetici');
var divoVV = document.getElementById('veganVegetariano');
var colPranzoCena = document.getElementById("colPranzoCena");
//var divo2A = document.querySelector('#alimVegan');										// NO
var alimVegetariani = document.querySelector('#alimVegetariani');
var alimentiDiCateg = document.getElementById("alimentiDiCateg");
var macronutrienti = document.getElementById("macronutrienti");
var pastiScelti = document.getElementById("pastiScelti");
var suggerimento = document.getElementById('suggerimento');
var vitMin = document.getElementById('vitamine-minerali');
var alimentiAlcol = document.getElementById('alimentiAlcol');						// conserva valori alcol di birra, vinoBianco e vinoRosso
var mostraFMV = document.getElementById('mostraFMV');			
var memDieta = document.getElementById('memorizzaDieta');
var btnCancellaDieta = document.getElementById('btnCancellaDieta');				// id="btnmemorizzaDieta" ---> id="btnCancellaDieta"
var btnDietaPausa = document.getElementById('btnDietaPausa');
var btnRiprendiDieta = document.getElementById('btnRiprendiDieta');
var eliminazioneDieta = document.getElementById('eliminazioneDieta');
var confermaX = document.getElementById('confermaX');
var annullaX = document.getElementById('annullaX');
var scuro = document.getElementById('scuro');

// Controllo se è stato eseguito il calcolo del fabbisogno calorico ed eventuale caricamento del file "calcola_calorie_app.js" 
var mieCalorie = localStorage.getItem('mieCalorie');

if(mieCalorie){
	ceckCalorie.style.display = 'none';
}else{
	fabbisogniEnergetici.style.display = 'none';
	macronutrienti.style.display = 'none';				
	divoVV.style.display = 'none';							// <div id="veganVegetariano">
	mostraFMV.style.display = 'none';						
//	Carica lo script .js che contiene il codice per definire i nutrienti del fabbisogno 
	var df = document.createDocumentFragment();			// viene creato un oggetto 'Document Fragment' 
	var codice = document.createElement("script");
	codice.type = "text/javascript";
	codice.src = "js/calcola_calorie_app.js";
	df.appendChild(codice);	
	document.body.appendChild(df);
}


var needCarboidrati = (mieCalorie * 0.65 / 4).toFixed(0);
var needProteine = (mieCalorie * 0.10 / 4).toFixed(0);
var needGrassi = (mieCalorie * 0.25 / 9).toFixed(0);


// Impostazione dei fabbisogni di Calorie , carboidrati, proteine e grassi
macronutrienti.children[1].children[1].innerHTML = needCarboidrati;
macronutrienti.children[2].children[1].innerHTML = needProteine;
macronutrienti.children[3].children[1].innerHTML = needGrassi;
macronutrienti.children[4].children[1].innerHTML = mieCalorie;

// Impostazione dei fabbisogni di fibre, minerali e vitamine
var fFibre = 25;													// valore fisso fabbisogno giornaliero 20-30 grammi
var fSodio = localStorage.getItem('sodio');				// valore settato in "calcola_calorie.html"
var fPotassio = localStorage.getItem('potassio');
var fFerro = localStorage.getItem('ferro');
var fCalcio = localStorage.getItem('calcio');
var fFosforo = localStorage.getItem('fosforo');
var fMagnesio = localStorage.getItem('magnesio');
var fZinco = localStorage.getItem('zinco');
var fRame = localStorage.getItem('rame');
var fSelenio = localStorage.getItem('selenio');
var fB1 = localStorage.getItem('vitB1');
var fB2 = localStorage.getItem('vitB2');
var fB3 = localStorage.getItem('vitB3');
var fA = localStorage.getItem('vitA');
var fC = localStorage.getItem('vitC');
var fE = localStorage.getItem('vitE');

var arrFMV = [fFibre,fSodio,fPotassio,fFerro,fCalcio,fFosforo,fMagnesio,fZinco,fRame,fSelenio,fB1,fB2,fB3,fA,fC,fE];
/*
var indice=1;			//	1 4 7	10 
for(var v=0; v< arrFMV.length; v++, indice +=3 ){
	vitMin.children[indice].innerHTML = arrFMV[v];		//	settaggio dei fabbisogni di fibre, minerali e vitamine in 'vitamine-minerali'   
}
*/

for(var v=0; v< arrFMV.length; v++ ){
	vitMin.children[v].children[1].innerHTML = arrFMV[v];
}

////////////////////////////////////////////////////////////

//	Mostra e nasconde un elemento (tipo suggerimento)	
function showSuggerimento(msg, tempo) {
	suggerimento.style.display = 'block';
	suggerimento.innerHTML = msg; 

	this.hideSuggerimento = function hideSuggerimento (){
		suggerimento.style.display = 'none'; 
	}
	setTimeout("this.hideSuggerimento(this)", tempo);
}//

//	Crea elementi con la possibilità di impostare gli attributi e stili nonchè la stringa testo per l'elemento creato
function creaElementi(name, attributi, stili) {
	var node = document.createElement(name);
	if (attributi) {
		for (var attr in attributi)
			if (attributi.hasOwnProperty(attr))
			node.setAttribute(attr, attributi[attr]);
	}

	for(var s in stili) 
		if (stili.hasOwnProperty(s))
			node.style[s] = stili[s];	

	for (var i = 3; i < arguments.length; i++) {
		var child = arguments[i];
		if (typeof child == "string")
			child = document.createTextNode(child);
		node.appendChild(child);
	}
	return node;
}//


/////////////////////// Creazione oggetto ( <div class="divPasto"> ) che conterrà i pasti selezionati ////////////////////////////

//	Crea una <select> i cui <option> possono avere solo valori numerici
function creaLista(nome,perSeleziona,a,b,c,valore){
	var node = document.createElement('select');
	node.setAttribute('class', nome);		
	var optionSeleziona = document.createElement('option');
	optionSeleziona.value = 0;
	var seleziona = document.createTextNode(perSeleziona);
	optionSeleziona.appendChild(seleziona);
	node.appendChild(optionSeleziona);

	for(var i=a; i< b; i+=c){
		var opzione = document.createElement('option');
		opzione.value = i; 
		opzione.textContent = i;	
		node.appendChild(opzione);
	}
	node.value = valore;
	return node;
}//

var elementDragged = null;		

function storePasti(){

	btnRiprendiDieta.style.display = 'none';

//	Creazione elementi che rappresenteranno gli alimenti selezionati
	var pasto = sessionStorage.getItem("pasto");									// il tipo di pasto (colazione, spuntino, pranzo ecc...)
	var alimentoScelto = sessionStorage.getItem("NomeAlimento");					// alimento scelto in base ad una categoria
	var fabproteine = parseFloat(sessionStorage.getItem("mproteine"));
	var fabgrassi = parseFloat(sessionStorage.getItem("mgrassi"));
	var fabcarbo = parseFloat(sessionStorage.getItem("mcarbo"));
	var fabfibre = parseFloat(sessionStorage.getItem("mfibre"));
	var fabsodio = sessionStorage.getItem("mNa");
	var fabpotassio = sessionStorage.getItem("mK");
	var fabferro = sessionStorage.getItem("mFe");
	var fabcalcio = sessionStorage.getItem("mCa");
	var fabfosforo = sessionStorage.getItem("mP");
	var fabmagnesio = sessionStorage.getItem("mMg");
	var fabzinco = sessionStorage.getItem("mZn");
	var fabrame = sessionStorage.getItem("mCu");
	var fabselenio = sessionStorage.getItem("mSe");
	var fabb1 = sessionStorage.getItem("mB1");
	var fabb2 = sessionStorage.getItem("mB2");
	var fabb3 = sessionStorage.getItem("mB3");
	var faba = sessionStorage.getItem("mA");
	var fabc = sessionStorage.getItem("mC");
	var fabe = sessionStorage.getItem("mE");

	var fabbirra = sessionStorage.getItem('mbirra');					// valore calorie birra 
	var fabvinobianco = sessionStorage.getItem('mvinoBianco');		// 
	var fabvinorosso = sessionStorage.getItem('mvinoRosso');			// 

/*
Creazione di elemento <div> che conterrà elementi <span>. Il primo <span> contiene il nome del pasto (colazione, spuntinoAM ...). Il terzo contiene la <select> per i grammi. Il secondo <span> contiene il nome dell'alimento. Quest'ultimo ha tanti attributi quanti sono i valori delle proprietà dell'alimento; ad ogni nome di attributo corrisponde un valore che corrisponde al fabbisogno per quella proprietà; questi valori vengono estratti dal sessionStorage.  
*/
	if(pasto === 'colazione')
		var divPasto = creaElementi('div', {'class':'divPasto', 'draggable':'true'},{'background':'#fafaaa'} );
	else if (pasto === 'pranzo')
		var divPasto = creaElementi('div', {'class':'divPasto', 'draggable':'true'},{'background':'#ffbe88' });
	else if(pasto === 'cena')
		var divPasto = creaElementi('div', {'class':'divPasto', 'draggable':'true'},{'background':'#aafaf5' });
	else
		var divPasto = creaElementi('div', {'class':'divPasto', 'draggable':'true'}, {'background':'#fff' });

	var spanPasto = creaElementi('span',null,{'display':'none'}, pasto);		// (colazione, spuntinoAM ...)

	var spanAlimento = creaElementi('span',{proteine:fabproteine, grassi:fabgrassi, carbo:fabcarbo, fibre:fabfibre, sodio:fabsodio, potassio:fabpotassio, ferro:fabferro, calcio:fabcalcio, fosforo:fabfosforo, magnesio:fabmagnesio, zinco:fabzinco, rame:fabrame, selenio:fabselenio, b1:fabb1, b2:fabb2, b3:fabb3, a:faba, c:fabc, e:fabe, birra:fabbirra, vinoBianco:fabvinobianco, vinoRosso:fabvinorosso },{'display':'inline-block','width':'70%'}, alimentoScelto);

	var lista =	creaLista('porzioneGrammi','gr.',10,300,10, 0);
//	var spanGrammi = creaElementi('span',{'class':'spanGrammi'},{'display':'inline-block','width':'20%'},lista);
	var spanGrammi = creaElementi('span',null,{'display':'inline-block','width':'20%'},lista);

	divPasto.appendChild(spanPasto);
	divPasto.appendChild(spanAlimento);
	divPasto.appendChild(spanGrammi);

//	Creazione di tanti elementi <span> per quante sono le proprietà dell'alimento che si andranno ad inserire nel <div> creato precedentemente (divPasto) e precisamente dopo la <select> dei grammi. Questi elementi conterranno il valore ottenuto moltiplicando il fabbisogno (contenuto negli attributi delllo <span> 'spanAlimento') per i grammi selezionati. I valori sono calcolati in "showRisultati"
	var storecarbo = creaElementi('span',{'class':'valcarbo'},{'display':'none'}, "0");		 
	var storeproteine = creaElementi('span',{'class':'valproteine'},{'display':'none'}, "0");
	var storegrassi = creaElementi('span',{'class':'valgrassi'},{'display':'none'}, "0");
	var storefibre =  creaElementi('span',{'class':'valfibre'},{'display':'none'}, "0");
	var storesodio = creaElementi('span',{'class':'valsodio'},{'display':'none'}, "0");
	var storepotassio = creaElementi('span',{'class':'valpotassio'},{'display':'none'}, "0");
	var storeferro = creaElementi('span',{'class':'valferro'},{'display':'none'}, "0");
	var storecalcio = creaElementi('span',{'class':'valcalcio'},{'display':'none'}, "0");
	var storefosforo = creaElementi('span',{'class':'valfosforo'},{'display':'none'}, "0");
	var storemagnesio = creaElementi('span',{'class':'valmagnesio'},{'display':'none'}, "0");
	var storezinco = creaElementi('span',{'class':'valzinco'},{'display':'none'}, "0");
	var storerame = creaElementi('span',{'class':'valrame'},{'display':'none'}, "0");
	var storeselenio = creaElementi('span',{'class':'valselenio' }, {'display':'none'}, "0");			
	var storeb1 = creaElementi('span',{'class':'valb1'},{'display':'none'}, "0");
	var storeb2 = creaElementi('span',{'class':'valb2'},{'display':'none'}, "0");
	var storeb3 = creaElementi('span',{'class':'valb3'},{'display':'none'}, "0");
	var storea = creaElementi('span',{'class':'vala'},{'display':'none'}, "0");
	var storec = creaElementi('span',{'class':'valc'},{'display':'none'}, "0");
	var storee = creaElementi('span',{'class':'vale'},{'display':'none'}, "0");

	var storebirra = creaElementi('span',{'class':'valbirra'},{'display':'none'}, "0");
	var storevinobianco = creaElementi('span',{'class':'valvinobianco'},{'display':'none'}, "0");
	var storevinorosso = creaElementi('span',{'class':'valvinorosso'},{'display':'none'}, "0");

	var btnChiudi = creaElementi('button', {'class':'annullaPasto'},{'display':'inline-block', 'width':'8%'}, 'X' );
//	var btnChiudi = creaElementi('button', {'class':'annullaPasto', 'num':i},{'display':'inline-block', 'width':'8%'}, 'X');

	var storeProp = [storecarbo,storeproteine,storegrassi,storefibre,storesodio,storepotassio,storeferro,storecalcio, storefosforo, storemagnesio, storezinco, storerame, storeselenio, storeb1, storeb2, storeb3, storea, storec, storee, storebirra, storevinobianco, storevinorosso, btnChiudi]; 
//	Inserimento degli elementi <span> creati all'interno del <div> divPasto	
	for(var s=0, sProp; sProp=storeProp[s]; s++){
		divPasto.appendChild(sProp);
	}

	pastiScelti.appendChild(divPasto);						// inserimento del <div> divPasto nel <div id='pastiScelti'>

}// storePasti()


/////////////////////  Popolamento dei <div> 'macronutrienti'>  e  'vitamine-minerali'    /////////////////////////

//	Cambio di sfondo quando i valori selezionati superano i fabbisogni
function allarmeRosso(risultato,fabbisogno,elem){
	if(risultato >  fabbisogno){
		elem.style['background'] = 'red';
		elem.style['color'] = 'white';
	}else{
		elem.style['background'] = '';
		elem.style['color'] = '';
	}
}

function insertVal(spanProp, nm, fabbisogno){
//	Somma dei valori di ogni proprietà contenuti nel parametro spanProp, che fa riferimento agli <span>  creati nella funzione 'storePasti()', ed inserimento di tali valori nell'apposito <div> all'interno di <div id='macronutrienti'>
	var valore = document.querySelectorAll(spanProp);								// es: 'span.valCarbo'
	var rc, nc=0;
	for(var ci=0, val; val=valore[ci]; ci++){
		rc = parseFloat(val.firstChild.nodeValue);
		nc = nc+rc;
//		macronutrienti.children[nm].innerHTML = nc.toFixed(2);								// 
		macronutrienti.children[nm].children[2].innerHTML = nc.toFixed(2);
		if(fabbisogno){
//			allarmeRosso(nc,fabbisogno,macronutrienti.children[nm]);
			allarmeRosso(nc,fabbisogno,macronutrienti.children[nm].children[2]);
		}
	}
}//

function insertVal2(spanProp, nm, dec){
//	Somma dei valori di ogni proprietà contenuti nel parametro spanProp, che fa riferimento agli <span>  creati nella funzione 'storePasti()', ed inserimento di tali valori nell'apposito <div> all'interno di <div id='vitamine-minerali'>
	var valore = document.querySelectorAll(spanProp);								// es: 'span.valCarbo'
	var rc, nc=0;
	for(var ci=0, val; val=valore[ci]; ci++){
		rc = parseFloat(val.firstChild.nodeValue);
		nc = nc+rc;
//		vitMin.children[nm].innerHTML = nc.toFixed(dec);						// 'vitMin' è il <div id='vitamine-minerali'>
		vitMin.children[nm].children[2].innerHTML = nc.toFixed(dec);		// 'vitMin' è il <div id='vitamine-minerali'>
	}
}//

function insetValAlcol(spanProp, nm, dec){
// Somma dei valori di ogni proprietà contenuti nel parametro spanProp, che fa riferimento agli <span>  creati nella funzione 'storePasti()', ed inserimento di tali valori nell'apposito <div> all'interno di <div id='alimentiAlcol'>
	var valore = document.querySelectorAll(spanProp);								// es: 'span.valCarbo'
	var rc, nc=0;
	for(var ci=0, val; val=valore[ci]; ci++){
		rc = parseFloat(val.firstChild.nodeValue);
		nc = nc+rc;
		alimentiAlcol.children[nm].innerHTML = nc.toFixed(dec);								// 'alimentiAlcol' è il <div id='alimentiAlcol'>
	}
}//


function showRisultati() {
	var jk = document.querySelectorAll('select.porzioneGrammi');
	for(var i=0, j; j= jk[i]; i++){

		j.addEventListener('change', function (e){

			memDieta.style.display = 'block';									// <div id="memorizzaDieta"></div> 

			io = e.target;
			var grammi = io.value;

			var genitore =  io.parentNode;								// la <select>
			var prec = genitore.previousElementSibling;	// lo span che contiene il nome dell'alimento che contiene i valori negli attributi
			var carboidrati = genitore.nextElementSibling;			// primo <span> dopo la <select> grammi
			var proteine = carboidrati.nextElementSibling;			
			var grassi = proteine.nextElementSibling;							
			var fibre = grassi.nextElementSibling;
			var sodio = fibre.nextElementSibling;
			var potassio = sodio.nextElementSibling;
			var ferro = potassio.nextElementSibling;
			var calcio = ferro.nextElementSibling;
			var fosforo = calcio.nextElementSibling;
			var magnesio = fosforo.nextElementSibling;
			var zinco = magnesio.nextElementSibling;
			var rame = zinco.nextElementSibling;
			var selenio = rame.nextElementSibling;
			var b1 = selenio.nextElementSibling;
			var b2 = b1.nextElementSibling;
			var b3 = b2.nextElementSibling;
			var a = b3.nextElementSibling;
			var c = a.nextElementSibling;
			var e = c.nextElementSibling;

//			Valori alcol di birra vinoBianco e vinoRosso
			var birra = e.nextElementSibling;
			var vinoBianco = birra.nextElementSibling;
			var vinoRosso = vinoBianco.nextElementSibling;

			var car = prec.getAttribute('carbo');							
			car = car * grammi / 100;
			carboidrati.innerHTML = car;

			var pro = prec.getAttribute('proteine');
			pro = pro * grammi / 100;
			proteine.innerHTML = pro;

			var gra = prec.getAttribute('grassi');
			gra = gra * grammi / 100;
			grassi.innerHTML = gra;

			var fib = prec.getAttribute('fibre');
			fib = fib * grammi / 100;
			fibre.innerHTML = fib;

			var sod = prec.getAttribute('sodio');
			sod = sod * grammi / 100;						// mg
			sodio.innerHTML = sod;

			var pot = prec.getAttribute('potassio');
			pot = pot * grammi / 100;
			potassio.innerHTML = pot;

			var fer = prec.getAttribute('ferro');
			fer = fer * grammi / 100;
			ferro.innerHTML = fer;

			var xcal = prec.getAttribute('calcio');
			xcal = xcal * grammi / 100;
			calcio.innerHTML = xcal;

			var xfos = prec.getAttribute('fosforo');
			 xfos = xfos * grammi / 100;
			fosforo.innerHTML = xfos;

			var xmag  = prec.getAttribute('magnesio');
			xmag = xmag * grammi / 100;
			magnesio.innerHTML = xmag;

			var xzin = prec.getAttribute('zinco');
			xzin = xzin * grammi / 100;
			zinco.innerHTML = xzin;

			var xram = prec.getAttribute('rame');
			xram = xram * grammi / 100;
			rame.innerHTML = xram;

			var xsel = prec.getAttribute('selenio');
			xsel = xsel * grammi / 100;
			selenio.innerHTML = xsel;

			var xb1 = prec.getAttribute('b1');
			xb1 = xb1 * grammi / 100;
			b1.innerHTML = xb1;

			var xb2 = prec.getAttribute('b2');
			xb2 = xb2 * grammi / 100;
			b2.innerHTML = xb2;

			var xb3 = prec.getAttribute('b3');
			xb3 = xb3 * grammi / 100;
			b3.innerHTML = xb3;

			var xa = prec.getAttribute('a');
			xa = xa * grammi / 100;
			a.innerHTML = xa;

			var xc = prec.getAttribute('c');
			xc = xc * grammi / 100;
			c.innerHTML = xc;

			var xe = prec.getAttribute('e');
			xe = xe * grammi / 100;
			e.innerHTML = xe;

			insertVal('span.valcarbo', 1, needCarboidrati);
			insertVal('span.valproteine', 2, needProteine);
			insertVal('span.valgrassi', 3, needGrassi);

			insertVal2('span.valfibre', 0, 2);
			insertVal2('span.valsodio', 1, 2);
			insertVal2('span.valpotassio', 2, 2);
			insertVal2('span.valferro', 3, 2);
			insertVal2('span.valcalcio', 4, 2);
			insertVal2('span.valfosforo', 5, 2);
			insertVal2('span.valmagnesio', 6, 2);
			insertVal2('span.valzinco', 7, 2);
			insertVal2('span.valrame', 8, 2);
			insertVal2('span.valselenio', 9, 3);
			insertVal2('span.valb1', 10, 2);
			insertVal2('span.valb2', 11, 2);
			insertVal2('span.valb3', 12, 2);
			insertVal2('span.vala', 13, 2);
			insertVal2('span.valc', 14, 2);
			insertVal2('span.vale', 15, 2);

//			Valori alcol birra, vinoBianco, vinoRosso
			var xzbirra = prec.getAttribute('birra'); 
			xzbirra = xzbirra * grammi / 100;
			birra.innerHTML = xzbirra;

			var xzvinoBianco = prec.getAttribute('vinoBianco');
			xzvinoBianco = xzvinoBianco * grammi / 100;
			vinoBianco.innerHTML = xzvinoBianco;

			var xzvinoRosso = prec.getAttribute('vinoRosso');
			xzvinoRosso = xzvinoRosso * grammi / 100;
			vinoRosso.innerHTML = xzvinoRosso;

			insetValAlcol('span.valbirra', 0, 2);
			insetValAlcol('span.valvinobianco', 1, 2);
			insetValAlcol('span.valvinorosso', 2, 2);

			var exValCarbo = macronutrienti.children[1].children[2].firstChild.nodeValue;				// valore esistente 'carboidrati'
			var exValProteine = macronutrienti.children[2].children[2].firstChild.nodeValue;			// valore esistente 'proteine'
			var exValGrassi = macronutrienti.children[3].children[2].firstChild.nodeValue;			// valore esistente 'grassi'

//			Valori alcol 
			var exValBirra = alimentiAlcol.children[0].firstChild.nodeValue;
			exValBirra = parseFloat(exValBirra);
			var exValVinoBianco = alimentiAlcol.children[1].firstChild.nodeValue;
			exValVinoBianco = parseFloat(exValVinoBianco);
			var exVaVinoRosso = alimentiAlcol.children[2].firstChild.nodeValue;
			exVaVinoRosso = parseFloat(exVaVinoRosso);

//			var calorieTotali = (exValGrassi*9) + (exValProteine*4) + (exValCarbo*4);
			var calorieTotali = (exValGrassi*9) + (exValProteine*4) + (exValCarbo*4) + exValBirra + exValVinoBianco + exVaVinoRosso;
			macronutrienti.children[4].children[2].innerHTML = calorieTotali.toFixed(0);
			allarmeRosso(calorieTotali, mieCalorie, macronutrienti.children[4].children[2]);

			setTimeout("showSuggerimento('Carboidrati: "+car.toFixed(2)+" - Proteine: "+pro.toFixed(2)+" - Grassi: "+gra.toFixed(2)+"',4000)", 100);

		},false);
	}

//		Eliminazione pasti
	var xPasti = document.querySelectorAll('button.annullaPasto');
	for(var an=0, xAnnulla; xAnnulla=xPasti[an]; an++){ 	
		xAnnulla.addEventListener('click', function (e){
			io = e.target;

			yvr = io.previousElementSibling;				// span vino rosso  
			yvb = yvr.previousElementSibling;			// span vino bianco
			ybir = yvb.previousElementSibling;			// span vino birra 

			ye = ybir.previousElementSibling;			// span vitamina E
			yc = ye.previousElementSibling;				// vitamina C	
			ya = yc.previousElementSibling;				// vitamina E
			yb3 = ya.previousElementSibling;				// vitamina B3
			yb2 = yb3.previousElementSibling;			// vitamina B2
			yb1 = yb2.previousElementSibling;			// vitamina B1
			ysel = yb1.previousElementSibling;			// selenio
			yram = ysel.previousElementSibling;			// rame
			yzin = yram.previousElementSibling;			// zinco
			ymag = yzin.previousElementSibling;			// magnesio
			yfos = ymag.previousElementSibling;			// fosforo
			ycal = yfos.previousElementSibling;			// calcio
			yfer = ycal.previousElementSibling;			// ferro
			ypot = yfer.previousElementSibling;			// potassio
			ysod = ypot.previousElementSibling;			// sodio
			yfib = ysod.previousElementSibling;			// fibre
			ygra = yfib.previousElementSibling;			// grassi
			ypro = ygra.previousElementSibling;			// proteine
			ycar = ypro.previousElementSibling;			// carboidrati

/*
			Ho racchiuso le definizioni seguenti all'interno di dichiarazioni 'if' altrimenti se l'utente clicca sulla X per annullare un dato alimento, senza aver selezionato la quantità di grammi, da errore perchè non trova gli elementi (ygra.firstChild, ypro.firstChild ...) i quali vengono creati soltanto dopo che si seleziona la quantità in grammi.
*/

//			var exValGrassi = macronutrienti.children[11].firstChild.nodeValue;			// valore esistente 'grassi'
			var exValGrassi = macronutrienti.children[3].children[2].firstChild.nodeValue;		// valore esistente 'grassi'
			if(ygra.firstChild){
				var newGrassi = parseFloat(exValGrassi) - parseFloat(ygra.firstChild.nodeValue);
				macronutrienti.children[3].children[2].innerHTML = newGrassi.toFixed(2);
				allarmeRosso(newGrassi,needGrassi, macronutrienti.children[3].children[2]);
			}
			var exValProteine = macronutrienti.children[2].children[2].firstChild.nodeValue;		// valore esistente 'proteine'
			if(ypro.firstChild){ 
				var newProteine = parseFloat(exValProteine) - parseFloat(ypro.firstChild.nodeValue);
				macronutrienti.children[2].children[2].innerHTML = newProteine.toFixed(2);
				allarmeRosso(newProteine,needProteine, macronutrienti.children[2].children[2]);
			}
			var exValCarbo = macronutrienti.children[1].children[2].firstChild.nodeValue;			// valore esistente 'carboidrati'
			if(ycar.firstChild){ 
				var newCarboidrati = parseFloat(exValCarbo) - parseFloat(ycar.firstChild.nodeValue);
				macronutrienti.children[1].children[2].innerHTML = newCarboidrati.toFixed(2);
				allarmeRosso(newCarboidrati,needCarboidrati, macronutrienti.children[1].children[2]);
			}

			var exValFibre = vitMin.children[0].children[2].firstChild.nodeValue;					// 
			if(yfib.firstChild){ 
				var newFibre = parseFloat(exValFibre) - parseFloat(yfib.firstChild.nodeValue);
				vitMin.children[0].children[2].innerHTML = newFibre.toFixed(2);
			}
			var exValSodio = vitMin.children[1].children[2].firstChild.nodeValue;					// 
			if(ysod.firstChild){ 
				var newSodio = parseFloat(exValSodio) - parseFloat(ysod.firstChild.nodeValue);
				vitMin.children[1].children[2].innerHTML = newSodio.toFixed(2);
			}
			var exValPotassio = vitMin.children[2].children[2].firstChild.nodeValue;					// 
			if(ypot.firstChild){ 
				var newPotassio = parseFloat(exValPotassio) - parseFloat(ypot.firstChild.nodeValue);
				vitMin.children[2].children[2].innerHTML = newPotassio.toFixed(2);
			}
			var exValFerro = vitMin.children[3].children[2].firstChild.nodeValue;					// 
			if(yfer.firstChild){ 
				var newFerro = parseFloat(exValFerro) - parseFloat(yfer.firstChild.nodeValue);
				vitMin.children[3].children[2].innerHTML = newFerro.toFixed(2);
			}
			var exValCalcio = vitMin.children[4].children[2].firstChild.nodeValue;					// 
			if(ycal.firstChild){ 
				var newCalcio = parseFloat(exValCalcio) - parseFloat(ycal.firstChild.nodeValue);
				vitMin.children[4].children[2].innerHTML = newCalcio.toFixed(2);
			}
			var exValFosforo = vitMin.children[5].children[2].firstChild.nodeValue;					// 
			if(yfos.firstChild){ 
				var newFosforo = parseFloat(exValFosforo) - parseFloat(yfos.firstChild.nodeValue);
				vitMin.children[5].children[2].innerHTML = newFosforo.toFixed(2);
			}
			var exValMagnesio = vitMin.children[6].children[2].firstChild.nodeValue;					// 
			if(ymag.firstChild){ 
				var newMagnesio = parseFloat(exValMagnesio) - parseFloat(ymag.firstChild.nodeValue);
				vitMin.children[6].children[2].innerHTML = newMagnesio.toFixed(2);
			}
			var exValZinco = vitMin.children[7].children[2].firstChild.nodeValue;					// 
			if(yzin.firstChild){ 
				var newZinco = parseFloat(exValZinco) - parseFloat(yzin.firstChild.nodeValue);
				vitMin.children[7].children[2].innerHTML = newZinco.toFixed(2);
			}
			var exValRame = vitMin.children[8].children[2].firstChild.nodeValue;					// 
			if(yram.firstChild){ 
				var newRame = parseFloat(exValRame) - parseFloat(yram.firstChild.nodeValue);
				vitMin.children[8].children[2].innerHTML = newRame.toFixed(2);
			}
			var exValSelenio = vitMin.children[9].children[2].firstChild.nodeValue;					// 
			if(ysel.firstChild){ 
				var newSelenio = parseFloat(exValSelenio) - parseFloat(ysel.firstChild.nodeValue);
				vitMin.children[9].children[2].innerHTML = newSelenio.toFixed(2);
			}
			var exValB1 = vitMin.children[10].children[2].firstChild.nodeValue;					// 
			if(yb1.firstChild){ 	
				var newB1 = parseFloat(exValB1) - parseFloat(yb1.firstChild.nodeValue);
				vitMin.children[10].children[2].innerHTML = newB1.toFixed(2);
			}
			var exValB2 = vitMin.children[11].children[2].firstChild.nodeValue;					// 
			if(yb2.firstChild){ 
				var newB2 = parseFloat(exValB2) - parseFloat(yb2.firstChild.nodeValue);
				vitMin.children[11].children[2].innerHTML = newB2.toFixed(2);
			}
			var exValB3 = vitMin.children[12].children[2].firstChild.nodeValue;					// 
			if(yb3.firstChild){ 
				var newB3 = parseFloat(exValB3) - parseFloat(yb3.firstChild.nodeValue);
				vitMin.children[12].children[2].innerHTML = newB3.toFixed(2);
			}
			var exValA = vitMin.children[13].children[2].firstChild.nodeValue;					// 
			if(ya.firstChild){ 
				var newA = parseFloat(exValA) - parseFloat(ya.firstChild.nodeValue);
				vitMin.children[13].children[2].innerHTML = newA.toFixed(2);
			}
			var exValC = vitMin.children[14].children[2].firstChild.nodeValue;					// 
			if(yc.firstChild){ 
				var newC = parseFloat(exValC) - parseFloat(yc.firstChild.nodeValue);
				vitMin.children[14].children[2].innerHTML = newC.toFixed(2);
			}
			var exValE = vitMin.children[15].children[2].firstChild.nodeValue;					// 
			if(ye.firstChild){ 
				var newE = parseFloat(exValE) - parseFloat(ye.firstChild.nodeValue);
				vitMin.children[15].children[2].innerHTML = newE.toFixed(2);
			}

			var exValBirra = alimentiAlcol.children[0].firstChild.nodeValue;
			if(ybir.firstChild){
				var newBirra = parseFloat(exValBirra) - parseFloat(ybir.firstChild.nodeValue);
				alimentiAlcol.children[0].innerHTML = newBirra.toFixed(2);
			}

			var exValVinoBianco = alimentiAlcol.children[1].firstChild.nodeValue;
			if(yvb.firstChild){
				var newVinoBianco = parseFloat(exValVinoBianco) - parseFloat(yvb.firstChild.nodeValue);
				alimentiAlcol.children[1].innerHTML = newVinoBianco.toFixed(2);
			}

			var exValVinorosso = alimentiAlcol.children[2].firstChild.nodeValue;
			if(yvr.firstChild){
				var newVinoRosso = parseFloat(exValVinorosso) - parseFloat(yvr.firstChild.nodeValue);
				alimentiAlcol.children[2].innerHTML = newVinoRosso.toFixed(2);				
			}


			// span delle calorie 
			if(ygra.firstChild && ypro.firstChild && ycar.firstChild){
				var calorieTotali = (newGrassi*9) + (newProteine*4) + (newCarboidrati*4) + newBirra + newVinoBianco + newVinoRosso;

				macronutrienti.children[4].children[2].innerHTML = calorieTotali.toFixed(0);
				allarmeRosso(calorieTotali,mieCalorie, macronutrienti.children[4].children[2]);
				var genitore = io.parentNode;
				genitore.parentNode.removeChild(genitore);
				e.stopImmediatePropagation();	
			}else{
				var genitore = io.parentNode;
				genitore.parentNode.removeChild(genitore);
				e.stopImmediatePropagation();	
			}
		},false);
	}
}// showRisultati() 



/////////////////////////////////////////////////////////////////////////////

// funzione interna a "loadAlimenti()"
function bevande(alimento){
	if(alimento === "birra chiara"){
		sessionStorage.setItem("mbirra", 19);// 19 => 34-15 (34: valore totale calorie; 15: valore senza il contenuto di alcol) 
		sessionStorage.setItem("mvinoBianco", 0);
		sessionStorage.setItem("mvinoRosso", 0);
	}else if(alimento === "vino bianco"){
		sessionStorage.setItem("mbirra", 0);
		sessionStorage.setItem("mvinoBianco", 70);
		sessionStorage.setItem("mvinoRosso", 0);
	}else if(alimento === "vino rosso"){
		sessionStorage.setItem("mbirra", 0);
		sessionStorage.setItem("mvinoBianco", 0);
		sessionStorage.setItem("mvinoRosso", 75);
	}else{
		sessionStorage.setItem("mbirra", 0);
		sessionStorage.setItem("mvinoBianco", 0);
		sessionStorage.setItem("mvinoRosso", 0);
	}
}

function loadAlimenti(dname, alimento){
	var xhttp = new XMLHttpRequest();
	xhttp.onreadystatechange = function(){
		if (xhttp.readyState == 4 && xhttp.status == 200){
			var jsonObj = JSON.parse(xhttp.responseText);			 

			var arrProp = ['proteine','grassi','carbo','fibre','Na','K','Fe','Ca','P','Mg','Zn','Cu','Se','B1','B2','B3','A','C','E' ];
			var nomeProp;

			for(var i=0, alimenti; alimenti= jsonObj[i]; i++){
				var nomeAlim = alimenti['nome'];
				if(nomeAlim === alimento){ 
					bevande(alimento);													//  
					for(var a=0, nomiProp; nomiProp= arrProp[a]; a++){
						var valProp = alimenti[nomiProp];
						nomeProp = 'm'+nomiProp;										// pattern chiave per sessionStorage (mproteine, mgrassi ecc...)
						sessionStorage.setItem(nomeProp, valProp);				// aggiorna i precedenti nel caso ci siano
					}
				}
			}
			storePasti();
			showRisultati();
			dragEdrop();
		}
	}
	xhttp.open("GET",dname,true);
	xhttp.send();
}// loadAlimenti()


function alimentoCat(dname){
	var xhttp = new XMLHttpRequest();
	xhttp.onreadystatechange = function(){
		if (xhttp.readyState == 4 && xhttp.status == 200){
			var jsonObj = JSON.parse(xhttp.responseText);			 

			for(var i=0, alimenti; alimenti=jsonObj[i]; i++){
				var jk = alimenti.replace(/\s/g, '-');				// rimpiazzo spazi vuoti con trattini (se no "biscotti di soia => biscotti")
				var catTrattino =	jk.replace(/'/g, '@');				// rimpiazzo apostrofo con chiocciola 				
				alimentiDiCateg.innerHTML += '<button class="catAlimenti" id='+catTrattino+'>' +alimenti+ '</button><br> ';
			}

			var catAlimenti = document.getElementsByClassName('catAlimenti');
			for(var a=0, alimento; alimento=catAlimenti[a]; a++){
				alimento.addEventListener('click', function (e){
					var io = e.target;
					var pasto = sessionStorage.getItem('pasto');				// colazione - spuntino1 - pranzo - spuntino2 - cena 
					var ty = io.getAttribute('id').replace(/-/g, ' ');		// ripristina gli spazi vuoti dai trattini ('biscotti di soia', ecc..) 
					var nomeAlimento = ty.replace(/@/, "'");					// ripristina gli apostrofi dalle chiocciole (es: fiocchi d'avena )
					var categ = sessionStorage.getItem('categorieAlimenti');			// impostato nel ciclo for dei pulsanti

					loadAlimenti("json/cat/" +categ+ ".json", nomeAlimento);

					alimVegetariani.style.display = 'none';
					alimentiDiCateg.style.display = 'none';
					colPranzoCena.style.display = 'block';
					sessionStorage.setItem('NomeAlimento', nomeAlimento);
					setTimeout("showSuggerimento('Seleziona la quantità in grammi',2000)", 600);

					window.pageYOffset = 0;								// x vari browser
					document.documentElement.scrollTop = 0;
					document.body.scrollTop = 0;
//	console.log(nomeAlimento);					// nome di alimenti  ( albicocche,amarene, ananas ecc.. )
//			dragEdrop();
				}, false);
			}
			dragEdrop();
		}
			document.location.href ="#alimentiDiCateg";
	}
	xhttp.open("GET",dname,true);
	xhttp.send();

} // alimentoCat()

function loadCat(dname, cat){
	var xhttp = new XMLHttpRequest();
	xhttp.onreadystatechange = function(){
		if (xhttp.readyState == 4 && xhttp.status == 200){

			var jsonObj = JSON.parse(xhttp.responseText);			 
			for(var i=0, categoria; categoria=jsonObj[i]; i++){
				if(categoria == cat){
					alimentoCat("json/cat" +cat+ ".json");
				}
			}
		}
	}

	xhttp.open("GET",dname,true);
	xhttp.send();
}// loadCat()


///////////////////////////////////////////////////////////////////////////////


// Visualizzazione e scomparsa <div id='vitamine-minerali'> 
mostraFMV.addEventListener('click', function (e){
/*
Alla fine ho deciso di toglere il display:flex ai <div="macronutrienti"> e <div id="vitamine-minerali"> perchè dovendo utilizzare per forza il display:inline-block fino alla 'min-width' 768 (a causa dei browsers di alcuni smartphone che supportano parzialmente il display:flex) mi dava un sacco di problemi nel passare dal 'flex' al 'inline-block' anche usando JavaScript
*/
	var display = 	vitMin.style.display;
	if(display === 'block'){
		vitMin.style.display = 'none';
		this.innerHTML = 'Mostra minerali e vitamine';
	}else{
		vitMin.style.display = 'block';
		this.innerHTML = 'Nascondi minerali e vitamine';
	}
}, false);


// Visualizzazione pulsanti pasti giornata (Colazione, SpuntinoAM ecc..)	
var etico = document.getElementById('btnVeganVeget');				// pulsante "Scegli il pasto"
etico.addEventListener('click', function (){
//	var classe = this.getAttribute('class');	
	fabbisogniEnergetici.style.display = 'none';
	acca1.style.display = 'none';											// Titolo pagina
	divoVV.style.display = 'none';
	colPranzoCena.style.display = 'block';							
	document.location.href ="#colPranzoCena";
},false);

// Visualizzazione categoria elementi (cereali, legumi ...) 
colPranzoCena.addEventListener('click', function (e){
	var io = e.target;
	colPranzoCena.style.display = 'none';
	alimVegetariani.style.display = 'block';						
	var mioid = io.getAttribute('id');								
	sessionStorage.setItem('pasto', mioid);						// serve nella funzione "storePasti()"			
	alimVegetariani.firstElementChild.innerHTML = 'Scegli gli alimenti per <b>' +mioid+ '</b><br>';
	document.location.href ="#alimVegetariani";
},false);

// Visualizzazione elementi in base alla categoria vegetariani
alimVegetariani.addEventListener('click', function(event){
	alimentiDiCateg.style.display = 'block';
	var io = event.target;
	var iddi = io.getAttribute('class').slice(1);							// corrisponde alla categoria (cereali, legumi ecc...)
	sessionStorage.setItem('categorieAlimenti', iddi);						// cereali, legumi, ecc...
	document.querySelector('#alimentiDiCateg').innerHTML = '';			// elimina le categorie presenti per dare spazio alla nuova selezionata
	loadCat("json/catAlimenti.json", iddi);
}, false);

// Oscuramento  <div class='alimVegetariani'> 
var xChiudiCatAlimenti = document.querySelector('div.xChiudiCatAlimenti');
	xChiudiCatAlimenti.addEventListener('click', function (){
		alimVegetariani.style.display = 'none';			
		colPranzoCena.style.display = 'block';				
		alimentiDiCateg.innerHTML = '';						
	},false);


////////////////		Messa in Pausa dieta giornaliera		///////////////////

function storageProp(a,b,numPasti,n,prop){
	var fabprop = numPasti.children[1].getAttribute(prop);							// valore fabbisogno carboidrati elemento selezionato
	localStorage.setItem('fab'+prop+n, fabprop);
	var valprop = numPasti.children[a].firstChild.nodeValue;							// valore carboidrati elemento (fabbisogno x grammi)
	localStorage.setItem('val'+prop+n, valprop);
	var totprop = macronutrienti.children[b].children[2].firstChild.nodeValue;	// valore carboidratri totale 
	localStorage.setItem('tot'+prop+n, totprop);
}//
function storageProp2(a,b,numPasti,n,prop){
	var fabprop = numPasti.children[1].getAttribute(prop);							// valore fabbisogno carboidrati elemento selezionato
	localStorage.setItem('fab'+prop+n, fabprop);
	var valprop = numPasti.children[a].firstChild.nodeValue;							// valore elemento (fabbisogno x grammi)
	localStorage.setItem('val'+prop+n, valprop);
	var totprop = vitMin.children[b].children[2].firstChild.nodeValue;			// valore  totale
	localStorage.setItem('tot'+prop+n, totprop);
}//

function storageProp3(a,b,numPasti,n,prop){
	var fabprop = numPasti.children[1].getAttribute(prop);						// valore fabbisogno carboidrati elemento selezionato
	localStorage.setItem('fab'+prop+n, fabprop);
	var valprop = numPasti.children[a].firstChild.nodeValue;						// valore proprietà elemento (fabbisogno x grammi)
	localStorage.setItem('val'+prop+n, valprop);
	var totprop = alimentiAlcol.children[b].firstChild.nodeValue;				// valore  totale
	localStorage.setItem('tot'+prop+n, totprop);
}//

// Messa in pausa dei pasti selezionati  
btnDietaPausa.addEventListener('click', function(){ 
	// divPasto --> divPastiScelti
	localStorage.setItem('pausadieta', 'si');											// se impostata visualizza il pulsante 'Riprendi dieta'
	var divPastiScelti = document.querySelector('#pastiScelti');				// div pastiScelti contiene i <div class='divPasto'>
	var numDivPasto = divPastiScelti.children;										// <div class='divPasto'>
	var calorie = macronutrienti.children[4].children[2].firstChild.nodeValue;

	localStorage.setItem('kcal', calorie);												// calorie totali
	localStorage.setItem('numPasti', numDivPasto.length);							// numero di pasti della giornata selezionati 
	var n =0;
	for(var a=0, numPasti; numPasti=numDivPasto[a]; a++){
		n++;
//		Cancellazione dei localStorage esistenti 
		var arrLocalStorage = ['pasto'+n, 'alimento'+n, 'grammi'+n, 'fabcarbo'+n, 'valcarbo'+n, 'totcarbo'+n, 'fabproteine'+n, 'valproteine'+n, 'totproteine'+n, 'fabgrassi'+n, 'valgrassi'+n, 'totgrassi'+n, 'fabfibre'+n, 'valfibre'+n, 'totfibre'+n, 'fabsodio'+n, 'valsodio'+n, 'totsodio'+n, 'fabpotassio'+n, 'valpotassio'+n, 'totpotassio'+n, 'fabferro'+n, 'valferro'+n, 'totferro'+n, 'fabcalcio'+n, 'valcalcio'+n, 'totcalcio'+n, 'fabfosforo'+n, 'valfosforo'+n, 'totfosforo'+n, 'fabmagnesio'+n, 'valmagnesio'+n, 'totmagnesio'+n, 'fabzinco'+n, 'valzinco'+n, 'totzinco'+n, 'fabrame'+n, 'valrame'+n, 'totrame'+n, 'fabselenio'+n, 'valselenio'+n, 'totselenio'+n, 'fabb1'+n, 'valb1'+n, 'totb1'+n, 'fabb2'+n, 'valb2'+n, 'totb2'+n, 'fabb3'+n, 'valb3'+n, 'totb3'+n, 'faba'+n, 'vala'+n, 'tota'+n, 'fabc'+n, 'valc'+n, 'totc'+n, 'fabe'+n, 'vale'+n, 'tote'+n, 'fabbirra'+n, 'valbirra'+n, 'totbirra'+n, 'fabvinobianco'+n, 'valvinobianco'+n, 'totvinobianco'+n, 'fabvinorosso'+n, 'valvinorosso'+n, 'totvinorosso'+n];

		for(var s=0, sto; sto=arrLocalStorage[s]; s++){
			localStorage.removeItem(sto);
		}

		var pasto = numPasti.children[0].firstChild.nodeValue;					// colazione, spuntinoAM, pranzo ...
		localStorage.setItem('pasto'+n, pasto);
		var alimento = numPasti.children[1].firstChild.nodeValue;				// nome alimento (avena, biscotti alla soia, ceci crudi ...)
		localStorage.setItem('alimento'+n, alimento);
		var grammi = numPasti.children[2].children[0].value;						// valore dei grammi selezionati dalla <select>						// 
		localStorage.setItem('grammi'+n, grammi);

		storageProp(3,1,numPasti,n,'carbo');
		storageProp(4,2,numPasti,n,'proteine');
		storageProp(5,3,numPasti,n,'grassi');

		storageProp2(6,0,numPasti,n,'fibre');
		storageProp2(7,1,numPasti,n,'sodio');
		storageProp2(8,2,numPasti,n,'potassio');
		storageProp2(9,3,numPasti,n,'ferro');
		storageProp2(10,4,numPasti,n,'calcio');
		storageProp2(11,5,numPasti,n,'fosforo');
		storageProp2(12,6,numPasti,n,'magnesio');
		storageProp2(13,7,numPasti,n,'zinco');
		storageProp2(14,8,numPasti,n,'rame');
		storageProp2(15,9,numPasti,n,'selenio');
		storageProp2(16,10,numPasti,n,'b1');
		storageProp2(17,11,numPasti,n,'b2');
		storageProp2(18,12,numPasti,n,'b3');
		storageProp2(19,13,numPasti,n,'a');
		storageProp2(20,14,numPasti,n,'c');
		storageProp2(21,15,numPasti,n,'e');

		storageProp3(22,0,numPasti,n,'birra');
		storageProp3(23,1,numPasti,n,'vinobianco');
		storageProp3(24,2,numPasti,n,'vinorosso');

	}

//	console.log( localStorage.getItem('numPasti')  );
		window.pageYOffset = 0;
		document.documentElement.scrollTop = 0;
		document.body.scrollTop = 0;
		setTimeout("showSuggerimento('La dieta è stata messa in pausa. Puoi recuperarla, in seguito, cliccando su <ins>Riprendi dieta</ins>',3000)", 600);

},false);



// Ripristino dei pasti messi in pausa 
btnRiprendiDieta.addEventListener('click', function (){ 
	this.style.display = 'none';
	acca1.style.display = 'none';												// Titolo pagina
	fabbisogniEnergetici.style.display = 'none';							// descrizione sotto il titolo (Iniziate con "Scegli i pasti" ...)
	memDieta.style.display = 'block';										// <div id="memorizzaDieta"></div> 

	var numPasti = localStorage.getItem('numPasti');					// numero di pasti in memoria 
	var kcal = parseFloat(localStorage.getItem('kcal'));				// calorie totali

	for(var i=1; i<= numPasti; i++){
		var pasto = localStorage.getItem('pasto'+i);
		var alimento = localStorage.getItem('alimento'+i);
		var grammi = localStorage.getItem('grammi'+i);

		var fabproteine = localStorage.getItem('fabproteine'+i);
		var valproteine = localStorage.getItem('valproteine'+i);

		var fabgrassi = localStorage.getItem('fabgrassi'+i);
		var valgrassi = localStorage.getItem('valgrassi'+i);

		var fabcarbo = parseFloat(localStorage.getItem('fabcarbo'+i));
		var valcarbo = localStorage.getItem('valcarbo'+i);

		var fabfibre = localStorage.getItem('fabfibre'+i);
		var valfibre = localStorage.getItem('valfibre'+i);

		var fabna = localStorage.getItem('fabsodio'+i);
		var valna = localStorage.getItem('valsodio'+i);

		var fabk = localStorage.getItem('fabpotassio'+i);
		var valk = localStorage.getItem('valpotassio'+i);

		var fabfe = localStorage.getItem('fabferro'+i);
		var valfe = localStorage.getItem('valferro'+i);

		var fabca = localStorage.getItem('fabcalcio'+i);
		var valca = localStorage.getItem('valcalcio'+i);

		var fabp = localStorage.getItem('fabfosforo'+i);
		var valp = localStorage.getItem('valfosforo'+i);

		var fabmg = localStorage.getItem('fabmagnesio'+i);
		var valmg = localStorage.getItem('valmagnesio'+i);

		var fabzn = localStorage.getItem('fabzinco'+i);
		var valzn = localStorage.getItem('valzinco'+i);

		var fabcu = localStorage.getItem('fabrame'+i);
		var valcu = localStorage.getItem('valrame'+i);

		var fabse = localStorage.getItem('fabselenio'+i);
		var valse = localStorage.getItem('valselenio'+i);

		var fabb1 = localStorage.getItem('fabb1'+i);
		var valb1 = localStorage.getItem('valb1'+i);

		var fabb2 = localStorage.getItem('fabb2'+i);
		var valb2 = localStorage.getItem('valb2'+i);

		var fabb3 = localStorage.getItem('fabb3'+i);
		var valb3 = localStorage.getItem('valb3'+i);

		var faba = localStorage.getItem('faba'+i);
		var vala = localStorage.getItem('vala'+i);

		var fabc = localStorage.getItem('fabc'+i);
		var valc = localStorage.getItem('valc'+i);

		var fabe = localStorage.getItem('fabe'+i);
		var vale = localStorage.getItem('vale'+i);

		var fabbirra = localStorage.getItem('fabbirra'+i);
		var valbirra = localStorage.getItem('valbirra'+i);

		var fabvinobianco = localStorage.getItem('fabvinobianco'+i);
		var valvinobianco = localStorage.getItem('valvinobianco'+i);

		var fabvinorosso = localStorage.getItem('fabvinorosso'+i);
		var valvinorosso = localStorage.getItem('valvinorosso'+i);

//		var divPasto = creaElementi('div', {'class':'divPasto'},null);
	if(pasto === 'colazione')
		var divPasto = creaElementi('div', {'class':'divPasto', 'draggable':'true'},{'background':'#fafaaa'} );
	else if (pasto === 'pranzo')
		var divPasto = creaElementi('div', {'class':'divPasto', 'draggable':'true'},{'background':'#ffbe88' });
	else if(pasto === 'cena')
		var divPasto = creaElementi('div', {'class':'divPasto', 'draggable':'true'},{'background':'#aafaf5' });
	else
		var divPasto = creaElementi('div', {'class':'divPasto', 'draggable':'true'}, {'background':'#fff' });

		var spanPasto = creaElementi('span',null,{'display':'none'},pasto);

		var spanAlimento = creaElementi('span',{proteine:fabproteine, grassi:fabgrassi, carbo:fabcarbo, fibre:fabfibre, sodio:fabna, potassio:fabk, ferro:fabfe, calcio:fabca, fosforo:fabp, magnesio:fabmg, zinco:fabzn, rame:fabcu, selenio:fabse, b1:fabb1, b2:fabb2, b3:fabb3, a:faba, c:fabc, e:fabe, birra:fabbirra, vinobianco:fabvinobianco, vinorosso:fabvinorosso },{'display':'inline-block','width':'70%'}, alimento);

		var lista =	creaLista('porzioneGrammi','gr.',10,300,10,grammi);
		var spanGrammi = creaElementi('span',null,{'display':'inline-block','width':'20%'},lista);
		divPasto.appendChild(spanPasto);
		divPasto.appendChild(spanAlimento);
		divPasto.appendChild(spanGrammi);

		var storecarbo = creaElementi('span',{'class':'valcarbo'},{'display':'none'},valcarbo);		 
		var storeproteine = creaElementi('span',{'class':'valproteine'},{'display':'none'}, valproteine);
		var storegrassi = creaElementi('span',{'class':'valgrassi'},{'display':'none'}, valgrassi);
		var storefibre =  creaElementi('span',{'class':'valfibre'},{'display':'none'}, valfibre);
		var storesodio = creaElementi('span',{'class':'valsodio'},{'display':'none'}, valna);
		var storepotassio = creaElementi('span',{'class':'valpotassio'},{'display':'none'}, valk);
		var storeferro = creaElementi('span',{'class':'valferro'},{'display':'none'}, valfe);
		var storecalcio = creaElementi('span',{'class':'valcalcio'},{'display':'none'}, valca);
		var storefosforo = creaElementi('span',{'class':'valfosforo'},{'display':'none'}, valp);
		var storemagnesio = creaElementi('span',{'class':'valmagnesio'},{'display':'none'}, valmg);
		var storezinco = creaElementi('span',{'class':'valzinco'},{'display':'none'}, valzn);
		var storerame = creaElementi('span',{'class':'valrame'},{'display':'none'}, valcu);
		var storeselenio = creaElementi('span',{'class':'valselenio' }, {'display':'none'}, valse);			
		var storeb1 = creaElementi('span',{'class':'valb1'},{'display':'none'}, valb1);
		var storeb2 = creaElementi('span',{'class':'valb2'},{'display':'none'}, valb2);
		var storeb3 = creaElementi('span',{'class':'valb3'},{'display':'none'}, valb3);
		var storea = creaElementi('span',{'class':'vala'},{'display':'none'}, vala);
		var storec = creaElementi('span',{'class':'valc'},{'display':'none'}, valc);
		var storee = creaElementi('span',{'class':'vale'},{'display':'none'}, vale);

		var storebirra = creaElementi('span',{'class':'valbirra'},{'display':'none'}, valbirra);
		var storevinobianco = creaElementi('span',{'class':'valvinobianco'},{'display':'none'}, valvinobianco);
		var storevinorosso = creaElementi('span',{'class':'valvinorosso'},{'display':'none'}, valvinorosso);

		var btnChiudi = creaElementi('button', {'class':'annullaPasto', 'num':i},{'display':'inline-block', 'width':'8%'}, 'X');

		var storeProp = [storecarbo,storeproteine,storegrassi,storefibre,storesodio,storepotassio,storeferro,storecalcio,storefosforo,storemagnesio, storezinco, storerame, storeselenio, storeb1, storeb2, storeb3, storea, storec, storee, storebirra, storevinobianco, storevinorosso, btnChiudi]; 

//		Inserimento degli elementi <span> creati all'interno del <div> divPasto	
		for(var s=0, sProp; sProp=storeProp[s]; s++){
			divPasto.appendChild(sProp);
		}

		pastiScelti.appendChild(divPasto);											// inserimento del <div> divPasto nel <div id='pastiScelti'>
		macronutrienti.children[4].children[2].innerHTML = kcal.toFixed(0);		

		allarmeRosso(kcal, mieCalorie, macronutrienti.children[4].children[2]);

		insertVal('span.valcarbo', 1, needCarboidrati);
		insertVal('span.valproteine', 2, needProteine);
		insertVal('span.valgrassi', 3, needGrassi);

		insertVal2('span.valfibre', 0, 2);
		insertVal2('span.valsodio', 1, 2);
		insertVal2('span.valpotassio', 2, 2);
		insertVal2('span.valferro', 3, 2);
		insertVal2('span.valcalcio', 4, 2);
		insertVal2('span.valfosforo', 5, 2);
		insertVal2('span.valmagnesio', 6, 2);
		insertVal2('span.valzinco', 7, 2);
		insertVal2('span.valrame', 8, 2);
		insertVal2('span.valselenio', 9, 3);
		insertVal2('span.valb1', 10, 2);
		insertVal2('span.valb2', 11, 2);
		insertVal2('span.valb3', 12, 2);
		insertVal2('span.vala', 13, 2);
		insertVal2('span.valc', 14, 2);
		insertVal2('span.vale', 15, 2);

		insetValAlcol('span.valbirra', 0, 2);
		insetValAlcol('span.valvinobianco', 1, 2);
		insetValAlcol('span.valvinorosso', 2, 2);
	}
	showRisultati();
	dragEdrop();
},false);


// Controllo per la visualizzazione del pulsante 'Riprendi dieta'
var numeroPa =	localStorage.getItem('numPasti');				// numero di pasti messi in memoria 
var pausadieta = localStorage.getItem('pausadieta');			// impostato quando messo in memoria i pasti e quindi premuto 'Dieta in pausa' 
if(pausadieta && numeroPa > 0){
	btnRiprendiDieta.style.display = 'block';
	acca1.style.display = 'none';										// Titolo pagina
	fabbisogniEnergetici.style.display = 'none';					// descrizione sotto il titolo (Iniziate con "Scegli i pasti" ...)	
};


//////	Gestione cancellazione della dieta   ////////////

btnCancellaDieta.addEventListener('click', function(){
	scuro.style.display = "block";
	eliminazioneDieta.style.display = "block";
	window.pageYOffset = document.documentElement.scrollTop =  document.body.scrollTop = 0;
}, false);


annullaX.addEventListener('click', function(){
	scuro.style.display = "none";
	eliminazioneDieta.style.display = "none";
}, false);



// Cancellazione della dieta esistente
confermaX.addEventListener('click', function(){
	scuro.style.display = "none";
	eliminazioneDieta.style.display = "none";
	memDieta.style.display = "none";
	acca1.style.display = 'block';										// Titolo pagina
	fabbisogniEnergetici.style.display = "block";					// descrizione sotto il titolo (Iniziate con "Scegli i pasti" ...)
	
	// eliminazione pasti esistenti 
	var divPasto = document.querySelectorAll('div.divPasto');
	var l1 = divPasto.length;
	var l2 = pastiScelti.children.length;
	localStorage.setItem('numPasti', 0);							// per impedire la visualizzazione del pulsante "Riprendi dieta"
	var n =0;
	for(var i=0; i< l1; i++){
		pastiScelti.removeChild(divPasto[i]);
		n++;
//		Cancellazione dei localStorage esistenti 
		var arrLocalStorage = ['pasto'+n, 'alimento'+n, 'grammi'+n, 'fabcarbo'+n, 'valcarbo'+n, 'totcarbo'+n, 'fabproteine'+n, 'valproteine'+n, 'totproteine'+n, 'fabgrassi'+n, 'valgrassi'+n, 'totgrassi'+n, 'fabfibre'+n, 'valfibre'+n, 'totfibre'+n, 'fabsodio'+n, 'valsodio'+n, 'totsodio'+n, 'fabpotassio'+n, 'valpotassio'+n, 'totpotassio'+n, 'fabferro'+n, 'valferro'+n, 'totferro'+n, 'fabcalcio'+n, 'valcalcio'+n, 'totcalcio'+n, 'fabfosforo'+n, 'valfosforo'+n, 'totfosforo'+n, 'fabmagnesio'+n, 'valmagnesio'+n, 'totmagnesio'+n, 'fabzinco'+n, 'valzinco'+n, 'totzinco'+n, 'fabrame'+n, 'valrame'+n, 'totrame'+n, 'fabselenio'+n, 'valselenio'+n, 'totselenio'+n, 'fabb1'+n, 'valb1'+n, 'totb1'+n, 'fabb2'+n, 'valb2'+n, 'totb2'+n, 'fabb3'+n, 'valb3'+n, 'totb3'+n, 'faba'+n, 'vala'+n, 'tota'+n, 'fabc'+n, 'valc'+n, 'totc'+n, 'fabe'+n, 'vale'+n, 'tote'+n, 'fabbirra'+n, 'valbirra'+n, 'totbirra'+n, 'fabvinobianco'+n, 'valvinobianco'+n, 'totvinobianco'+n, 'fabvinorosso'+n, 'valvinorosso'+n, 'totvinorosso'+n ];

//		
		for(var s=0, sto; sto=arrLocalStorage[s]; s++){
			localStorage.removeItem(sto);
		}
	}

//		Impostazione dei valori nutrienti a zero 
//		macronutrienti.children[5].innerHTML = 0;						// carbo 
		macronutrienti.children[1].children[2].innerHTML = 0;						// carbo 
		macronutrienti.children[1].children[2].style['background'] = '';		// impostazione del background				
		macronutrienti.children[2].children[2].innerHTML = 0;						// proteine
		macronutrienti.children[2].children[2].style['background'] = '';
		macronutrienti.children[3].children[2].innerHTML = 0;					// grassi
		macronutrienti.children[3].children[2].style['background'] = '';				
		macronutrienti.children[4].children[2].innerHTML = 0;					// calorie
		macronutrienti.children[4].children[2].style['background'] = '';				

		vitMin.children[0].children[2].innerHTML = 0;					// fibre
		vitMin.children[1].children[2].innerHTML = 0;					// sodio
		vitMin.children[2].children[2].innerHTML = 0;					// potassio
		vitMin.children[3].children[2].innerHTML = 0;				// ferro
		vitMin.children[4].children[2].innerHTML = 0;				// calcio
		vitMin.children[5].children[2].innerHTML = 0;				// fosforo
		vitMin.children[6].children[2].innerHTML = 0;				// magnesio
		vitMin.children[7].children[2].innerHTML = 0;				// zinco
		vitMin.children[8].children[2].innerHTML = 0;				// rame
		vitMin.children[9].children[2].innerHTML = 0;					// selenio
		vitMin.children[10].children[2].innerHTML = 0;				// b1
		vitMin.children[11].children[2].innerHTML = 0;				// b2
		vitMin.children[12].children[2].innerHTML = 0;				// b3
		vitMin.children[13].children[2].innerHTML = 0;				// a
		vitMin.children[14].children[2].innerHTML = 0;				// c
		vitMin.children[15].children[2].innerHTML = 0;				// e

		alimentiAlcol.children[0].innerHTML = 0;
		alimentiAlcol.children[1].innerHTML = 0;
		alimentiAlcol.children[2].innerHTML = 0;

		setTimeout("showSuggerimento('La dieta è stata cancellata',3000)", 600);

},false);



//######## Drag e Drop ######## 
function dragEdrop(){
	var dragElements = document.querySelectorAll('div.divPasto');		// elementi <div> che saranno trascinati 
	var elementDragged = null;										// si inizializza una variabile per l'elemento che sta per essere trascinato 
	for (var i = 0; i < dragElements.length; i++) {
		dragElements[i].addEventListener('dragstart', function(e) {
			e.dataTransfer.effectAllowed = 'move';
			e.dataTransfer.setData('text', this.innerHTML);					// diventa necessario anche se non rilevata con 'getData'
//			e.dataTransfer.setData('text', e.target.class);
			elementDragged = e.target;
		});
// 	Evento listener per quando il trascinamento termina
		dragElements[i].addEventListener('dragend', function(e) {
			elementDragged = null;
//		this.style['cursor'] = "";
		});
	}

	pastiScelti.addEventListener('dragover', function(e) {
		if (e.preventDefault) {
			e.preventDefault();
		}
		e.dataTransfer.dropEffect = 'move';
		return false;
	});

	for (var i = 0; i < dragElements.length; i++) {
		dragElements[i].addEventListener('drop', function(e) {
			if (e.preventDefault) e.preventDefault(); 
			if (e.stopPropagation) e.stopPropagation();
			var succ = this.nextElementSibling;
//			var prev = this.previousElementSibling;
			var otTarget = this.offsetTop;															// 64 posizione top dell'elemento target
			var otTrascinato = elementDragged.offsetTop;											// posizione top dell'elemento trascinato 
			if(otTarget > otTrascinato)
				pastiScelti.insertBefore(elementDragged, succ);											// scendere										
			else
				pastiScelti.insertBefore(elementDragged, this);											// salire 
//console.log(otTrascinato);
		}, false);
	}
} // dragEdrop()




/*
console.log( sessionStorage.getItem('pasto'));


console.log('Valori Alimenti');
//console.log('Porzione: ' +sessionStorage.getItem('mporzione'));
console.log('proteine: ' +sessionStorage.getItem('mproteine'));
console.log('grassi: ' +sessionStorage.getItem('mgrassi'));
console.log('carboidrati: ' +sessionStorage.getItem('mcarbo'));

console.log('fibre: ' +sessionStorage.getItem('mfibre'));
console.log('sodio: ' +sessionStorage.getItem('mNa'));
console.log('potassio: ' +sessionStorage.getItem('mK'));
console.log('ferro:' +sessionStorage.getItem('mFe'));
console.log('calcio: ' +sessionStorage.getItem('mCa'));
console.log('fosforo: ' +sessionStorage.getItem('mP'));
console.log('magnesio: ' +sessionStorage.getItem('mMg'));
console.log('zinco: ' +sessionStorage.getItem('mZn'));
console.log('rame: ' +sessionStorage.getItem('mCu'));
console.log('selenio: ' +sessionStorage.getItem('mSe'));
console.log('vitamina B1: ' +sessionStorage.getItem('mB1'));
console.log('vitamina B2: ' +sessionStorage.getItem('mB2'));
console.log('vitamina B3: ' +sessionStorage.getItem('mB3'));
console.log('vitamina A: ' +sessionStorage.getItem('mA'));
console.log('vitamina C: ' +sessionStorage.getItem('mC'));
console.log('vitamina E: ' +sessionStorage.getItem('mE'));

console.log('birra: ' +sessionStorage.getItem('mbirra'));
console.log('vino bianco: ' +sessionStorage.getItem('mvinoBianco'));
console.log('vino rosso: ' +sessionStorage.getItem('mvinoRosso'));
*/


