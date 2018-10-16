// dieta.js 

// Gestione del mousedown e mouseup su pulsante "Consigli Utili" (?)
function pulsantePremuto(pulsante){
	pulsante.style["boxShadow"] = "0 3px 18px -5px #000";
}

function pulsanteRilasciato(pulsante){
	pulsante.style["boxShadow"] = "0 3px 8px -5px #000";
}

function mostraBlock(elemento){
	elemento.style['display'] = 'block';
}

function nascondiNone(elemento){
	elemento.style['display'] = 'none';
}

function eventPulsante(elem, evento, funzione){
//	var elem = document.querySelector(elem);	
	elem.addEventListener(evento, function (e){
		funzione(e.target);
	},false);
}


// Gestione elemento punto interrogativo per aiuto su 'Consigli utili'
var interrogativo = document.getElementById('int');
var spiegaz = document.getElementById('spiegaz');
var xInfo = document.getElementById('xInfo');
var scuro = document.getElementById('scuro');

eventPulsante(interrogativo, "mousedown", pulsantePremuto);
eventPulsante(interrogativo, "mouseup", pulsanteRilasciato);

interrogativo.addEventListener('click', function(){
	spiegaz.style["top"] = 0;
	spiegaz.style["transition"] = "top 300ms ease-out 200ms"; 
	setTimeout("mostraBlock(scuro);", 500);
},false);


xInfo.addEventListener("click", function (){
	setTimeout("nascondiNone(scuro);", 500);	
	spiegaz.style["top"] = "-1000px";
	spiegaz.style["transition"] = "top 500ms ease-in 200ms";
	interrogativo.style['display'] = "block";			// per chi non supporta il flex	
	interrogativo.style['display'] = "flex";
},false);


////////////////////	Variabili globali		///////////////////////////////
 
var acca1 = document.getElementById('h1Dieta');									// elemento titolo H1
var ceckCalorie = document.getElementById('ceckCalorie');
var fabbisogniEnergetici = document.getElementById('fabbisogniEnergetici');
var divoVV = document.getElementById('veganVegetariano');
var colPranzoCena = document.getElementById("colPranzoCena");
var alimVegetariani = document.querySelector('#alimVegetariani');
var alimentiDiCateg = document.getElementById("alimentiDiCateg");
var macronutrienti = document.getElementById("macronutrienti");
var pastiScelti = document.getElementById("pastiScelti");
var suggerimento = document.getElementById('suggerimento');
var vitMin = document.getElementById('vitamine-minerali');
var alimentiAlcol = document.getElementById('alimentiAlcol');					// conserva valori alcol di birra, vinoBianco e vinoRosso
var mostraFMV = document.getElementById('boxMmostraFVM');			
var memDieta = document.getElementById('memorizzaDieta');
var btnCancellaDieta = document.getElementById('btnCancellaDieta');				// id="btnmemorizzaDieta" ---> id="btnCancellaDieta"
var btnDietaPausa = document.getElementById('btnDietaPausa');
var btnRiprendiDieta = document.getElementById('btnRiprendiDieta');
var eliminazioneDieta = document.getElementById('eliminazioneDieta');
var confermaX = document.getElementById('confermaX');
var annullaX = document.getElementById('annullaX');
var etico = document.getElementById('btnVeganVeget');							// pulsante "Scegli il pasto"

var n = 0;			// contatore oggetti creati (div.divPasto)
var elementDragged = null;		


////////////////////////////	Funzioni utili 	///////////////////////////////////////

function adPropsOggettoDaArrays(oggetto, array1, array2){
	var a, b;
	if(Array.isArray(array1) && Array.isArray(array2)){
		if(array1.length === array2.length ){ 
			for(var i=0; i < array1.length; i++){
				a = array1[i];
				b = array2[i];
				oggetto[a] = b;
			}
		}
	}
}

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

//	Crea una <select> i cui <option> possono avere solo valori numerici
function creaLista(nome,perSeleziona,cinqueGrammi,a,b,c,valore){
	var node = document.createElement('select');
	node.setAttribute('class', nome);		
	var optionSeleziona = document.createElement('option');
	optionSeleziona.value = 0;
	var seleziona = document.createTextNode(perSeleziona);
	optionSeleziona.appendChild(seleziona);
	node.appendChild(optionSeleziona);

	var optionCinqueGrammi = document.createElement('option');
	var valCinque = document.createTextNode(cinqueGrammi);
	optionCinqueGrammi.appendChild(valCinque);
	node.appendChild(optionCinqueGrammi);

	for(var i=a; i< b; i+=c){
		var opzione = document.createElement('option');
		opzione.value = i; 
		opzione.textContent = i;	
		node.appendChild(opzione);
	}
	node.value = valore;
	return node;
}//

function oggettoPasto(alimentoScelto){
	var pat1 = alimentoScelto.replace(/\s/g, 'X');           // rimpiazzo spazi vuoti con X (se no "biscotti di soia => biscotti")
	var pat2 = pat1.replace(/'/g, 'W');                      // rimpiazzo apostrofo con W
	oggetto = pat2;                                	// farina d'orzo => farinaXdWorzo0 - farinaXdWorzo1 ... 
	var oggetto = {}; 
	return oggetto;                        // 
}


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

////////////////////////////	FINE Funzioni utili 	///////////////////////////////////////


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
var arrMacroNutrienti = [needCarboidrati, needProteine, needGrassi, mieCalorie];
for(var rda=0, valoreRDA; rda < arrMacroNutrienti.length; rda++ ){
	valoreRDA=rda+1;
	macronutrienti.children[valoreRDA].children[1].innerHTML = arrMacroNutrienti[rda];
}

// Impostazione fabbisogni i fibre, vitamine e minerali  
// Il seguente array contiene il localStorage definiti nel file "calcola_calorie_app.js"
var afmv = ['sodio','potassio','ferro','calcio','fosforo','magnesio','zinco','rame','selenio','vitB1','vitB2','vitB3','vitA','vitC','vitE'];
vitMin.children[0].children[1].innerHTML = 25;		// impostazione del valore delle fibre nel primo <div> di "vitamine-minerali"

for(var v=0, vc, valFMV; v < afmv.length; v++ ){
	valFMV = localStorage.getItem(afmv[v]);
	vc = v+1;											// a partire dal secondo <div>, perchè il primo div è assegnato alle fibre
	vitMin.children[vc].children[1].innerHTML = valFMV;
}


//////////////////////////		Funzioni relative al programma		//////////////////////////////

// Funzione invocata in "showRisultati()" e nella eliminazione della dieta 
function azzeraValori(){
	var macro = [1,2,3];
	var fmv = [0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15];
	var alcol = [0,1,2];

	for(var a=0, ax; ax=macro[a]; a++)
		macronutrienti.children[ax].children[2].innerHTML = 0;

	for(var b=0; b < fmv.length; b++ )
		vitMin.children[b].children[2].innerHTML = 0;

	for(var c=0; c < alcol.length; c++ )
		alimentiAlcol.children[c].innerHTML = 0;

	macronutrienti.children[4].children[2].innerHTML = 0;				// calorie
	macronutrienti.children[4].children[2].style['background'] = '' ;	// quando il totale supera il fabbisogno diventa rosso e allora ... 
}

// Funzione invocata in "showRisultati()" che inserisce i valori totali (zmproteine, zmgrassi ..) nella colonna "dieta"
function impostaValore(pasto){

	var m=0, fmv=-4, a=-20;
	for(var i in pasto){
		m += 1;
		fmv += 1; 
		a += 1;
		if(i === 'carbo' || i === 'proteine' || i === 'grassi')
			macronutrienti.children[m].children[2].innerHTML = pasto[i].toFixed(0);
		if(i==='fibre'||i==='sodio'||i==='potassio'||i==='calcio'||i ==='fosforo'||i==='magnesio'  )
			vitMin.children[fmv].children[2].innerHTML = pasto[i].toFixed(0);
		if(i==='ferro'||i==='zinco'||i==='b1'||i==='b2'||i==='b3'||i==='a'||i==='c'||i==='e')
			vitMin.children[fmv].children[2].innerHTML = pasto[i].toFixed(2);
		if(i==='rame'||i==='selenio')	
			vitMin.children[fmv].children[2].innerHTML = pasto[i].toFixed(3);
		if( i === 'birra' || i === 'vinoBianco' || i === 'vinoRosso'){
			alimentiAlcol.children[a].innerHTML = pasto[i].toFixed(2);
		}

//		Impostazione delle calorie 
		var exValCarbo = macronutrienti.children[1].children[2].firstChild.nodeValue;				// valore esistente 'carboidrati'
		var exValProteine = macronutrienti.children[2].children[2].firstChild.nodeValue;			// valore esistente 'proteine'
		var exValGrassi = macronutrienti.children[3].children[2].firstChild.nodeValue;			// valore esistente 'grassi'
		var exValBirra = parseFloat(alimentiAlcol.children[0].firstChild.nodeValue);
		var exValVinoBianco = parseFloat(alimentiAlcol.children[1].firstChild.nodeValue);
		var exVaVinoRosso = parseFloat(alimentiAlcol.children[2].firstChild.nodeValue);

		var calorieTotali = (exValGrassi*9) + (exValProteine*4) + (exValCarbo*4) + exValBirra + exValVinoBianco + exVaVinoRosso;
		macronutrienti.children[4].children[2].innerHTML = calorieTotali.toFixed(0);
		allarmeRosso(calorieTotali, mieCalorie, macronutrienti.children[4].children[2]);
	}// for 

}// impostaValore

// Funzione che rileva i valori totali (zmproteine, zmgrassi ..) li racchiude in un oggetto e li invia a "impostaValore()"  
function showRisultati() {

	var divPasti = document.querySelectorAll('div.divPasto');
	var numDivPasti = divPasti.length;
	var carbo=0, proteine=0, grassi=0, fibre=0, sodio=0, potassio=0, ferro=0, calcio=0, fosforo=0, magnesio=0, zinco=0, rame=0, selenio=0, 
	 b1=0, b2=0, b3=0, a=0, c=0, e=0, birra=0, vinoBianco=0, vinoRosso=0;

 	var oggettoPasto = {};						// oggetto che conterrà i valori totali

	 if(numDivPasti === 0){
		azzeraValori();
	 }else{
		for(var i=0; i <  divPasti.length; i++ ){
			divPasto = divPasti[i];
			var nutrientiScelti = divPasto.children[2];		// <span> che contiene i valori di base e totale dei nutrienti di ogni pasto scelto   

			carbo = carbo + parseFloat(nutrientiScelti.getAttribute('zmcarbo'));
			oggettoPasto['carbo'] = carbo; 
			proteine = proteine + parseFloat(nutrientiScelti.getAttribute('zmproteine'));
			oggettoPasto['proteine'] = proteine;
			grassi = grassi + parseFloat(nutrientiScelti.getAttribute('zmgrassi'));
			oggettoPasto['grassi'] = grassi;
			
			fibre = fibre + parseFloat(nutrientiScelti.getAttribute('zmfibre'));
			oggettoPasto['fibre'] = fibre;
			sodio = sodio + parseFloat(nutrientiScelti.getAttribute('zmNa'));
			oggettoPasto['sodio'] = sodio;
			potassio = potassio + parseFloat(nutrientiScelti.getAttribute('zmK'));
			oggettoPasto['potassio'] = potassio;
			ferro = ferro + parseFloat(nutrientiScelti.getAttribute('zmFe'));
			oggettoPasto['ferro'] = ferro;			
			calcio = calcio + parseFloat(nutrientiScelti.getAttribute('zmCa'));
			oggettoPasto['calcio'] = calcio;
			fosforo = fosforo + parseFloat(nutrientiScelti.getAttribute('zmP'));
			oggettoPasto['fosforo'] = fosforo;
			magnesio = magnesio + parseFloat(nutrientiScelti.getAttribute('zmMg'));
			oggettoPasto['magnesio'] = magnesio;
			zinco = zinco + parseFloat(nutrientiScelti.getAttribute('zmZn'));
			oggettoPasto['zinco'] = zinco;
			rame = rame + parseFloat(nutrientiScelti.getAttribute('zmCu'));
			oggettoPasto['rame'] = rame;
			selenio = selenio + parseFloat(nutrientiScelti.getAttribute('zmSe'));
			oggettoPasto['selenio'] = selenio;
			b1 = b1 + parseFloat(nutrientiScelti.getAttribute('zmB1'));
			oggettoPasto['b1'] = b1;
			b2 = b2 + parseFloat(nutrientiScelti.getAttribute('zmB2'));
			oggettoPasto['b2'] = b2;
			b3 = b3 + parseFloat(nutrientiScelti.getAttribute('zmB3'));
			oggettoPasto['b3'] = b3;
			a = a + parseFloat(nutrientiScelti.getAttribute('zmA'));
			oggettoPasto['a'] = a;
			c = c + parseFloat(nutrientiScelti.getAttribute('zmC'));
			oggettoPasto['c'] = c;
			e = e + parseFloat(nutrientiScelti.getAttribute('zmE'));
			oggettoPasto['e'] = e;

			birra = birra + parseFloat(nutrientiScelti.getAttribute('zmbirra'));
			oggettoPasto['birra'] = birra;
			vinoBianco = vinoBianco + parseFloat(nutrientiScelti.getAttribute('zmvinoBianco'));
			oggettoPasto['vinoBianco'] = vinoBianco;
			vinoRosso = vinoRosso + parseFloat(nutrientiScelti.getAttribute('zmvinoRosso'));
			oggettoPasto['vinoRosso'] = vinoRosso;
		}
	 }
		impostaValore(oggettoPasto);

} // showRisultati

// Invocata in "loadAlimenti()", crea elementi (divPasto) con i valori di base che rappresenteranno gli alimenti selezionati
function storePasti(obj){

	obj['class'] = 'valori-nutrienti';								// aggiunta di classe allo <span> che contiene i valori già di base 
	btnRiprendiDieta.style.display = 'none';
	var pasto = sessionStorage.getItem("pasto");					// il tipo di pasto (colazione, spuntino, pranzo ecc...)
	var alimentoScelto = sessionStorage.getItem("NomeAlimento");	// alimento scelto in base ad una categoria

    var divPasto;
	if(pasto === 'colazione')
		divPasto = creaElementi('div', {'class':'divPasto', 'draggable':'true'},{'background':'#fafaaa'} );
	else if (pasto === 'pranzo')
		divPasto = creaElementi('div', {'class':'divPasto', 'draggable':'true'},{'background':'#ffbe88' });
	else if(pasto === 'cena')
		divPasto = creaElementi('div', {'class':'divPasto', 'draggable':'true'},{'background':'#aafaf5' });
	else
		divPasto = creaElementi('div', {'class':'divPasto', 'draggable':'true'}, {'background':'#fff' });

	var spanPasto = creaElementi('span',null,{'display':'none'}, pasto);		// (colazione, spuntinoAM ...)

	var nomeAlimento = creaElementi('span', {}, {'display':'inline-block','width':'70%'}, alimentoScelto );
	var lista =	creaLista('porzioneGrammi','gr.',5,10,300,10, 0);
	var spanAlimenti = creaElementi('span', obj ,{'display':'inline-block','width':'20%'},lista);	// spanAlimenti oltre a contenere la <select> "lista" contiene i nutrienti di base estratti dal json  
	var btnChiudi = creaElementi('button', {'class':'annullaPasto'},{'display':'inline-block', 'width':'8%'}, 'X' );
	divPasto.appendChild(spanPasto);
    divPasto.appendChild(nomeAlimento);
	divPasto.appendChild(spanAlimenti);
	divPasto.appendChild(btnChiudi);

	pastiScelti.appendChild(divPasto);					// inserimento del <div> divPasto nel <div id='pastiScelti'>

	calcolaValori();
	eliminaPasti();

}// storePasti

// Funzione calcola i valori totali dei nutrienti moltiplicando i valori di base x i grammi selezionati 
function calcolaValori (){

	var numDivPasto = document.querySelectorAll('div.divPasto').length;
	var grammi, totProp;
	var sCarbo = 0, sProteine = 0, sGrassi = 0;								// per la Visualizzazione del messaggio nutrienti scelti   

	var seletsGrammi = document.querySelectorAll('select.porzioneGrammi');			
	for(var i=0, seletta; seletta= seletsGrammi[i]; i++) { 							
		seletta.addEventListener('change', function (e) {
			memDieta.style.display = 'block';						// <div id="memorizzaDieta"></div> 
			io = e.target;
			grammi = io.value;
			var spanValoriNutrienti = io.parentNode;					// lo <span class="valori-nutrienti">
			var attributi = spanValoriNutrienti.attributes;

			for(var x=0, z, w=0; x < attributi.length; x++){				// proteine (il primo nutriente) è il secondo attributo 
				z = attributi[x].nodeName;
				w = parseFloat(attributi[x].nodeValue);
				if(z.charAt(0) === 'm'){			// estrazione attributi (valori di base) che hanno come prima lettera 'm' (mproteine, mgrassi ...)
					totProp = w * grammi / 100;	
					var pat = 'z' + z;				// pattern per i nuovi attributi ("zmproteine", "zmgrassi" ...)	
					spanValoriNutrienti.setAttribute(pat, totProp); 		// Ora lo <span> contiene altri attributi che contengono i nutrienti totali ottenuti moltiplicando i valori di base per i grammi

					if(z === 'mcarbo') sCarbo = totProp;
					if(z === 'mproteine') sProteine = totProp;
					if(z === 'mgrassi') sGrassi = totProp;
					setTimeout("showSuggerimento('Carboidrati: "+sCarbo+" - Proteine: "+sProteine+" - Grassi: "+sGrassi+"',4000)", 100);					
				}	
			}			

			showRisultati();

		},false);
	}// for 

} // calcolaValori();

// funzione che elimina i pasti selezionati col click sul pulsante X 
function eliminaPasti(){
	var xPasti = document.querySelectorAll('button.annullaPasto');
	for(var an=0, xAnnulla; xAnnulla=xPasti[an]; an++){
		xAnnulla.addEventListener('click', function (e){
			io = e.target;
			var pastoSelezionato = io.parentNode;			// il genitore <div class="divPasto" >    
			if(pastoSelezionato.parentNode){ 
				pastoSelezionato.parentNode.removeChild(pastoSelezionato);			// eliminazione pasto
				showRisultati(true);							//
			}
		}, false);
	}   	
}

///////////////////////////////////     Invocazione XMLHttpRequest ai file json     ////////////////////////////////

// funzione interna a "loadAlimenti()"
function bevande(oggetto, alimento){

	(alimento === "birra chiara") ? oggetto['mbirra'] = 19 : oggetto['mbirra'] = 0;
	(alimento === "vino bianco") ? oggetto['mvinoBianco'] = 70 : oggetto['mvinoBianco'] = 0; 
	(alimento === "vino rosso") ? oggetto['mvinoRosso'] = 75 : oggetto['mvinoRosso'] = 0; 

}

// Invocata in "callback()", carica i valori base, dal json (es: json/cat/cereali.json) ed ...  
// crea un oggetto in cui definisce i valori base caricati e lo invia a "storePasti()"   
function loadAlimenti(dname, alimento){
	var xhttp = new XMLHttpRequest();
	xhttp.onreadystatechange = function(){
		if (xhttp.readyState == 4 && xhttp.status == 200){
			var jsonObj = JSON.parse(xhttp.responseText);			 

			var arrProp = ['proteine','grassi','carbo','fibre','Na','K','Fe','Ca','P','Mg','Zn','Cu','Se','B1','B2','B3','A','C','E' ];
			var nomeProp;
			var valoribase = {};					// conterrà i valori di base (dal "json/cat/categoria relativa alimento scelto" )
			for(var i=0, alimenti; alimenti= jsonObj[i]; i++){
				var nomeAlim = alimenti['nome'];
				if(nomeAlim === alimento){ 
					for(var a=0, nomiProp; nomiProp= arrProp[a]; a++){
						var valProp = alimenti[nomiProp];
						nomeProp = 'm'+nomiProp;				// pattern chiave per oggetto "valoribase" (mproteine, mgrassi ecc...)
						valoribase[nomeProp] = valProp;
						bevande(valoribase, alimento);	
					}
				}
			}

			storePasti(valoribase);             
			dragEdrop();                            
		}
	}
	xhttp.open("GET",dname,true);
	xhttp.send();
}// 

// Funzione invocata in "loadCat()" che invoca "callback()"
function alimentoCat(url, callback) {
	var req = new XMLHttpRequest();
	req.open("GET", url, true);
	req.addEventListener("load", function() {
		if (req.status < 400)
			callback(req.responseText);
		else
			callback(null, new Error("Request failed: " + req.statusText));
	});

	req.addEventListener("error", function() {
		callback(null, new Error("Network error"));
	});

	req.send(null);
} // getURL

// Invocata da "alimentoCat()", crea i pulsanti, relativi ad ogni alimento della categoria scelta, ed invoca "loadAlimenti()"   
function callback(jsonObj){
	var oggetto = JSON.parse(jsonObj);

	for(var i=0, alimenti; alimenti=oggetto[i]; i++){
		var jk = alimenti.replace(/\s/g, '-');				// rimpiazzo spazi vuoti con trattini (se no "biscotti di soia => biscotti")
		var catTrattino =	jk.replace(/'/g, '@');			// rimpiazzo apostrofo con chiocciola 				
		alimentiDiCateg.innerHTML += '<button class="catAlimenti" id='+catTrattino+'>' +alimenti+ '</button><br> ';
	}

	var catAlimenti = document.getElementsByClassName('catAlimenti');
	for(var a=0, alimento; alimento=catAlimenti[a]; a++){
		alimento.addEventListener('click', function (e){
		var io = e.target;
		var pasto = sessionStorage.getItem('pasto');				// colazione - spuntino1 - pranzo - spuntino2 - cena 
		var ty = io.getAttribute('id').replace(/-/g, ' ');		// ripristina gli spazi vuoti dai trattini ('biscotti di soia', ecc..) 
		var nomeAlimento = ty.replace(/@/, "'");					// ripristina gli apostrofi dalle chiocciole (es: fiocchi d'avena )
		var categ = sessionStorage.getItem('categorieAlimenti');			// impostato al click su "alimVegetariani" 

		loadAlimenti("json/cat/" +categ+ ".json", nomeAlimento);

		alimVegetariani.style.display = 'none';
		alimentiDiCateg.style.display = 'none';
		colPranzoCena.style.display = 'block';
		sessionStorage.setItem('NomeAlimento', nomeAlimento);
		setTimeout("showSuggerimento('Seleziona la quantità in grammi',2000)", 600);

		window.pageYOffset = 0;								// x vari browser
		document.documentElement.scrollTop = 0;
		document.body.scrollTop = 0;
			dragEdrop();								// .......... da scommentare
		}, false);
	}

		document.location.href ="#alimentiDiCateg";

}// callback

// Funzione che carica tutti gli alimenti, della categoria scelta, dal json (es: json/catcereali.json)
function loadCat(dname, cat){
	var xhttp = new XMLHttpRequest();
	xhttp.onreadystatechange = function(){
		if (xhttp.readyState == 4 && xhttp.status == 200){
			var jsonObj = JSON.parse(xhttp.responseText);			 
			for(var i=0, categoria; categoria=jsonObj[i]; i++){
				if(categoria === cat){
					alimentoCat("json/cat" +cat+ ".json", callback);
				}
			}
		}
	}

	xhttp.open("GET",dname,true);
	xhttp.send();
}//


////////////////////////////////////////////     Eventi      ////////////////////////////////////////////////////////

// Visualizzazione e scomparsa <div id='vitamine-minerali'> 
mostraFMV.addEventListener('click', function (e){
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
etico.addEventListener('click', function (){
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

// Messa in pausa dei pasti selezionati  
btnDietaPausa.addEventListener('click', function() {
	localStorage.setItem('pausadieta', 'si');							// se impostata visualizza il pulsante 'Riprendi dieta'

	var numDivPasto = pastiScelti.children;								// i div <div class='divPasto'> in <div id="pastiScelti">
	var calorie = macronutrienti.children[4].children[2].firstChild.nodeValue;
	localStorage.setItem('kcal', calorie);								// memorizzazione calorie totali
	localStorage.setItem('numPasti', numDivPasto.length);				// memorizzazione del numero di pasti della giornata  
	var n =0, pasto, alimento, grammi, spanAlimenti, oggetti;			// rappresenta i "divPasto" (pasti da memorizzare)
	for(var a=0, numPasti; numPasti=numDivPasto[a]; a++) {
		n++;

//		Cancellazione dei localStorage esistenti 
		var arrLocalStorage = [
			'pasto'+n, 'alimento'+n, 'grammi'+n, 'mproteine'+n, 'mgrassi'+n, 'mcarbo'+n, 'mfibre'+n,'mNa'+n,'mK'+n,'mFe'+n, 'mCa'+n, 'mP'+n,
			'mMg'+n,'mZn'+n, 'mCu'+n, 'mSe'+n, 'mB1'+n, 'mB2'+n, 'mB3'+n, 'mA'+n, 'mC'+n, 'mE'+n, 'mbirra'+n, 'mvinoBianco'+n, 'mvinoRosso'+n, 
			'zmproteine'+n, 'zmgrassi'+n, 'zmcarbo'+n, 'zmfibre'+n, 'zmNa'+n, 'zmK'+n, 'zmFe'+n, 'zmCa'+n, 'zmP'+n, 'zmMg'+n, 'zmZn'+n, 
			'zmCu'+n, 'zmSe'+n, 'zmB1'+n, 'zmB2'+n, 'zmB3'+n, 'zmA'+n, 'zmC'+n, 'zmE'+n, 'zmbirra'+n, 'zmvinoBianco'+n, 'zmvinoRosso'+n 
		];

		for(var s=0, sto; sto=arrLocalStorage[s]; s++){
			localStorage.removeItem(sto);
		}

		pasto = numPasti.children[0].firstChild.nodeValue;			// colazione, spuntinoAM, pranzo ...
		localStorage.setItem('pasto'+n, pasto);

		alimento = numPasti.children[1].firstChild.nodeValue;		// nome alimento (avena, biscotti alla soia, ceci crudi ...)
		localStorage.setItem('alimento'+n, alimento);

		grammi = numPasti.children[2].children[0].value;			// valore dei grammi selezionati dalla <select>						// 
		localStorage.setItem('grammi'+n, grammi);

		spanAlimenti = numPasti.children[2];						// lo <span class="valori-nutrienti"> che contiene i valori di base e totali

		var attributi = spanAlimenti.attributes;
		for(var x=0, z, w=0; x < attributi.length; x++){				// proteine (il primo nutriente) è il secondo attributo 
			z = attributi[x].nodeName + n;
			w = parseFloat(attributi[x].nodeValue);

			if(z.charAt(0) === 'm'){								// estrazione attributi che hanno come prima lettera 'm' (mproteine, mgrassi ...)
				localStorage.setItem(z, w);
			}
			if(z.charAt(0) === 'z'){
				localStorage.setItem(z, w);
			}	
		}			
	}// for 

	window.pageYOffset = 0;
	document.documentElement.scrollTop = 0;
	document.body.scrollTop = 0;
	setTimeout("showSuggerimento('La dieta è stata messa in pausa. Puoi recuperarla, in seguito, cliccando su <ins>Riprendi dieta</ins>',3000)", 
	600);


},false); // btnDietaPausa.addEventListener  


// Ripristino dei pasti messi in pausa con creazione di array, che contiene i "divPasto" dai "localStorage", inviato a "storeListaPasti()"  
btnRiprendiDieta.addEventListener('click', function (){ 

	this.style.display = 'none';
	acca1.style.display = 'none';								// Titolo pagina
	fabbisogniEnergetici.style.display = 'none';				// descrizione sotto il titolo (Iniziate con "Scegli i pasti" ...)
	memDieta.style.display = 'block';							// <div id="memorizzaDieta"></div> 

	var kcal = parseFloat(localStorage.getItem('kcal'));		// calorie totali
	var numPasti = localStorage.getItem('numPasti');			// numero di pasti in memoria 

	var arrValbase = ['mproteine', 'mgrassi','mcarbo','mfibre','mna','mk','mfe','mca', 'mp', 'mmg','mzn', 'mcu', 'mse', 
	'mb1', 'mb2', 'mb3', 'ma', 'mc', 'me', 'mbirra', 'mvinobianco', 'mvinorosso'];

	var arrTotali = ['zmproteine', 'zmgrassi','zmcarbo','zmfibre','zmna','zmk','zmfe','zmca', 'zmp', 'zmmg','zmzn', 'zmcu', 'zmse', 
	'zmb1', 'zmb2', 'zmb3', 'zma', 'zmc', 'zme', 'zmbirra', 'zmvinobianco', 'zmvinorosso' ];

	var arrOggetti = [];										// array che conterrà gli oggetti "divPasto"
	var n=0, pat;

	for(var i=1; i <= numPasti; i++){
		n++;
		var oggetto = {};
		for(var a=0; a < arrValbase.length; a++ ){
			var fab = arrValbase[a] + i;
			var valoriBase = localStorage.getItem(fab);
			oggetto[arrValbase[a]] = valoriBase;
		}

		for(var x=0; x < arrTotali.length; x++ ){
			var totali = arrTotali[x] + i;
			var valoriTotali = localStorage.getItem(totali);
			oggetto[arrTotali[x]] = valoriTotali;
		}

		arrOggetti.push(oggetto);
	}// for 
	storeListaPasti( arrOggetti );

},false);

// Visualizzazione dei pasti messi in pausa
function storeListaPasti(listaoggetti) {
	var fab, tot; 
	var n=0;
	var obj = {};			// oggetto che conterrà i valori di base e totali da inserire come attributi nella "var spanAlimenti" 

	for(i=0; i < listaoggetti.length; i++ ) {
		n++;
		var pasto = localStorage.getItem('pasto'+n);					// nome tipo di pasto (colazione, spuntinoAM, pranzo ...) 
		var alimento = localStorage.getItem('alimento'+n);				// nome alimento (avena, cornflakes, ...)
		var grammi = localStorage.getItem('grammi'+n);					// grammi selezionati relativi ad ogni alimento
		
		oggetto = listaoggetti[i];
		for(var a in oggetto){
			tot = oggetto[a];
			obj[a] = tot;
		} 

//		Ripristino dei "divPasto" memorizzati 
		var divPasto;
		if(pasto === 'colazione')
			divPasto = creaElementi('div', {'class':'divPasto', 'draggable':'true'},{'background':'#fafaaa'} );
		else if (pasto === 'pranzo')
			divPasto = creaElementi('div', {'class':'divPasto', 'draggable':'true'},{'background':'#ffbe88' });
		else if(pasto === 'cena')
			divPasto = creaElementi('div', {'class':'divPasto', 'draggable':'true'},{'background':'#aafaf5' });
		else
			divPasto = creaElementi('div', {'class':'divPasto', 'draggable':'true'}, {'background':'#fff' });

		var spanPasto = creaElementi('span',null,{'display':'none'}, pasto);		// (colazione, spuntinoAM ...)

		var nomeAlimento = creaElementi('span', {}, {'display':'inline-block','width':'70%'}, alimento );
		var lista =	creaLista('porzioneGrammi','gr.',5,10,300,10, grammi);

		var spanAlimenti = creaElementi('span', obj ,{'display':'inline-block','width':'20%'},lista);	// spanAlimenti oltre a contenere la <select> "lista" contiene i nutrienti di base estratti dal json  

		var btnChiudi = creaElementi('button', {'class':'annullaPasto'},{'display':'inline-block', 'width':'8%'}, 'X' );
		divPasto.appendChild(spanPasto);
		divPasto.appendChild(nomeAlimento);

		divPasto.appendChild(spanAlimenti);
		divPasto.appendChild(btnChiudi);

		pastiScelti.appendChild(divPasto);					// inserimento del <div> divPasto nel <div id='pastiScelti'>

	}// for 

		showRisultati();			// invocazione funzione a diferenza di "storePasti()"  
		calcolaValori();
		eliminaPasti();
		dragEdrop();
}// storeListaPasti


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
	acca1.style.display = 'block';								// Titolo pagina
	fabbisogniEnergetici.style.display = "block";				// descrizione sotto il titolo (Iniziate con "Scegli i pasti" ...)

	var divPasto = document.querySelectorAll('div.divPasto');
	var l1 = divPasto.length;
	localStorage.setItem('numPasti', 0);						// per impedire la visualizzazione del pulsante "Riprendi dieta"
	var n =0;

	for(var i=0; i< l1; i++){
		pastiScelti.removeChild(divPasto[i]);					// eliminazione dei "divPasto"
		n++;
//		Cancellazione dei localStorage esistenti 
		var arrLocalStorage = [
			'pasto'+n, 'alimento'+n, 'grammi'+n, 'mproteine'+n, 'mgrassi'+n, 'mcarbo'+n, 'mfibre'+n,'mNa'+n,'mK'+n,'mFe'+n, 'mCa'+n, 'mP'+n,
			'mMg'+n,'mZn'+n, 'mCu'+n, 'mSe'+n, 'mB1'+n, 'mB2'+n, 'mB3'+n, 'mA'+n, 'mC'+n, 'mE'+n, 'mbirra'+n, 'mvinoBianco'+n, 'mvinoRosso'+n, 
			'zmproteine'+n, 'zmgrassi'+n, 'zmcarbo'+n, 'zmfibre'+n, 'zmNa'+n, 'zmK'+n, 'zmFe'+n, 'zmCa'+n, 'zmP'+n, 'zmMg'+n, 'zmZn'+n, 
			'zmCu'+n, 'zmSe'+n, 'zmB1'+n, 'zmB2'+n, 'zmB3'+n, 'zmA'+n, 'zmC'+n, 'zmE'+n, 'zmbirra'+n, 'zmvinoBianco'+n, 'zmvinoRosso'+n 
		];

		for(var s=0, sto; sto=arrLocalStorage[s]; s++){
			localStorage.removeItem(sto);
		}
	}
	azzeraValori();

},false);


/*
NOTA: quando, nella eliminazione della dieta si eliminano i localStorage esistenti, 
cosi come quando si mette la dieta in pausa (btnDietaPausa) che i localStorage esistenti vengono sostituiti dai nuovi, succede che: 
se i "divPasto" sono per esempio 10, verranno eliminati solo 10 localStorage (relativamente a tutti le proprietà).
Ciò a dire che se succesivamente andiamo a ricostruire una nuova dieta con 8 "divPasto", 
i nuovi 8 "localStorage" andranno a sostituire soltanto i primi otto "localStorage" 
e gli ultimi due, creati nella precedente dieta, rimarranno comunque in memoria. 
In definita se la nuova dieta messa in pausa o eliminata conterrà meno "divPasto" della precedente 
la memoria "localStorage" non sarà completamente liberata ma sarà liberata di un numero uguale a quello dei nuovi "divPasto".
Naturalmente se la nuova dieta contiene un numero di "divPasto" superiore a quello precedente allora il problema non si presenterà e
la memoria sarà liberato di tutti i vecchi "localStorage" precedenti per essere rimpiazzata dai nuovi
*/

////////	 ######## Drag e Drop ########	//////// 
function dragEdrop(){
	var dragElements = document.querySelectorAll('div.divPasto');		// elementi <div> che saranno trascinati 
	var elementDragged = null;											// si inizializza una variabile per l'elemento che sta per essere trascinato 
	for (var i = 0; i < dragElements.length; i++) {
		dragElements[i].addEventListener('dragstart', function(e) {
			e.dataTransfer.effectAllowed = 'move';
			e.dataTransfer.setData('text', this.innerHTML);				// diventa necessario anche se non rilevata con 'getData'
			elementDragged = e.target;
		});

		dragElements[i].addEventListener('dragend', function(e) {		// Evento listener per quando il trascinamento termina
			elementDragged = null;
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
			var otTarget = this.offsetTop;									// 64 posizione top dell'elemento target
			var otTrascinato = elementDragged.offsetTop;					// posizione top dell'elemento trascinato 
			if(otTarget > otTrascinato)
				pastiScelti.insertBefore(elementDragged, succ);				// scendere										
			else
				pastiScelti.insertBefore(elementDragged, this);				// salire 
		}, false);
	}
} // dragEdrop()


/////////////////	localStorage	/////////////////

//	localStorage.clear();						//////////// x eliminare tutte le coppie key/value esistenti ///////

//console.log('Nome Alimento: ', sessionStorage.getItem('NomeAlimento'));		// definita in "callback()"
/*
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


