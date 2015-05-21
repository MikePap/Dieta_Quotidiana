var minerali = {
	"maschi": { 
		"1-3":{"Ca":700,"P":460,"Mg":80,"Na":700,"K":1900,"Fe":8,"Zn":3,"Cu":0.4,"Se":0.02},		
		"4-6":{"Ca":1000,"P":500,"Mg":100,"Na":900,"K":2300,"Fe":11,"Zn":5,"Cu":0.4,"Se":0.03},
		"7-10":{"Ca":1100,"P":875,"Mg":150,"Na":1100,"K":2800,"Fe":13,"Zn":8,"Cu":0.7,"Se":0.03},
		"11-14":{"Ca":1300,"P":1250,"Mg":240,"Na":1500,"K":3900,"Fe":10,"Zn":9,"Cu":0.8,"Se":0.048},
		"15-17":{"Ca":1300,"P":1250,"Mg":320,"Na":1500,"K":3900,"Fe":13,"Zn":11,"Cu":1,"Se":0.055},
		"18-29":{"Ca":1000,"P":700,"Mg":240,"Na":1500,"K":3900,"Fe":10,"Zn":11,"Cu":0.9,"Se":0.055},
		"30-59":{"Ca":1000,"P":700,"Mg":240,"Na":1500,"K":3900,"Fe":10,"Zn":11,"Cu":0.9,"Se":0.055},
		"60-74":{"Ca":1000,"P":700,"Mg":240,"Na":1100,"K":3900,"Fe":10,"Zn":11,"Cu":0.9,"Se":0.055},
		"75piu":{"Ca":1200,"P":700,"Mg":240,"Na":1100,"K":3900,"Fe":10,"Zn":11,"Cu":0.9,"Se":0.055}
	},
	"femmine": { 
		"1-3":{"Ca":700,"P":460,"Mg":80,"Na":700,"K":1900,"Fe":8,"Zn":3,"Cu":0.4,"Se":0.02},		
		"4-6":{"Ca":1000,"P":500,"Mg":100,"Na":900,"K":2300,"Fe":11,"Zn":5,"Cu":0.4,"Se":0.03},
		"7-10":{"Ca":1100,"P":875,"Mg":150,"Na":1100,"K":2800,"Fe":13,"Zn":8,"Cu":0.7,"Se":0.03},
		"11-14":{"Ca":1300,"P":1250,"Mg":240,"Na":1500,"K":3900,"Fe":18,"Zn":9,"Cu":0.9,"Se":0.048},
		"15-17":{"Ca":1300,"P":1250,"Mg":270,"Na":1500,"K":3900,"Fe":18,"Zn":9,"Cu":0.9,"Se":0.055},
		"18-29":{"Ca":1000,"P":700,"Mg":240,"Na":1500,"K":3900,"Fe":18,"Zn":8,"Cu":0.9,"Se":0.055},
		"30-59":{"Ca":1000,"P":700,"Mg":240,"Na":1500,"K":3900,"Fe":18,"Zn":8,"Cu":0.9,"Se":0.055},
		"60-74":{"Ca":1200,"P":700,"Mg":240,"Na":1100,"K":3900,"Fe":10,"Zn":8,"Cu":0.9,"Se":0.055},
		"75piu":{"Ca":1200,"P":700,"Mg":240,"Na":1100,"K":3900,"Fe":10,"Zn":8,"Cu":0.9,"Se":0.055}
	}
} 

var vitamine = {
	"maschi":  { 
		"1-3":  {"B1":0.5,"B2":0.6,"B3":7,"A":0.4,"C":40,"E":5},
		"4-6":  {"B1":0.6,"B2":0.7,"B3":8,"A":0.45,"C":50,"E":6 },
		"7-10": {"B1":0.8,"B2":1,"B3":11,"A":0.5,"C":65,"E":8},
		"11-14":{"B1":1.1,"B2":1.4,"B3":16,"A":0.6,"C":95,"E":12},
		"15-17":{"B1":1.2,"B2":1.6,"B3":18,"A":0.7,"C":105,"E":12},
		"18-29":{"B1":1.2,"B2":1.6,"B3":18,"A":0.7,"C":105,"E":13},
		"30-59":{"B1":1.2,"B2":1.6,"B3":18,"A":0.7,"C":105,"E":13},
		"60-74":{"B1":1.2,"B2":1.6,"B3":18,"A":0.7,"C":105,"E":13},
		"75piu":{"B1":1.2,"B2":1.6,"B3":18,"A":0.7,"C":105,"E":13}
	},
	"femmine": { 
		"1-3":  {"B1":0.5,"B2":0.6,"B3":7,"A":0.4,"C":40,"E":5},
		"4-6":  {"B1":0.6,"B2":0.7,"B3":8,"A":0.45,"C":50,"E":6},
		"7-10": {"B1":0.8,"B2":1,"B3":11,"A":0.5,"C":65,"E":8},
		"11-14":{"B1":1,"B2":1.2,"B3":16,"A":0.6,"C":75,"E":11},
		"15-17":{"B1":1.1,"B2":1.3,"B3":18,"A":0.6,"C":85,"E":11},
		"18-29":{"B1":1.1,"B2":1.3,"B3":18,"A":0.6,"C":85,"E":12},
		"30-59":{"B1":1.1,"B2":1.3,"B3":18,"A":0.6,"C":85,"E":12},
		"60-74":{"B1":1.1,"B2":1.3,"B3":18,"A":0.6,"C":85,"E":12},
		"75piu":{"B1":1.1,"B2":1.3,"B3":18,"A":0.6,"C":85,"E":12}
	}
}

//console.log( vitamine["maschi"]["7-10"]["B1"] );

function categoriaEta (etaUtente){
//	var etaUtente = localStorage.getItem('etaUtente');
	if(etaUtente){ 
		if(etaUtente < 4){
			var valore = '1-3';
		}else if(etaUtente < 7){
			var valore = '4-6';
		}else if(etaUtente < 11){
			var valore = '7-10';
		}else if(etaUtente < 15){
			var valore = '11-14';
		}else if(etaUtente < 18){
			var valore = '15-17';
		}else if(etaUtente < 30){
			var valore = '18-29';
		}else if(etaUtente < 60){
			var valore = '30-59';
		}else if(etaUtente < 75){
			var valore = '60-74';
		}
		else{
			var valore = '75piu';
		}
		return valore;
	}

}//
//var categoriaEta = categoriaEta();


var showBoxCFC = document.getElementById('showBoxCFC');
var pesoStaturaEta = document.getElementById('pesoStaturaEta');
var ceckCalorie = document.getElementById('ceckCalorie');
var xBoxCalcolaCalorie = document.getElementById('xBoxCalcolaCalorie');
var aggiornaPagina = document.getElementById('aggiornaPagina');

// Visualizzazione box calcola calorie
showBoxCFC.addEventListener('click', function(){
	ceckCalorie.style.display = 'none';
	pesoStaturaEta.style.display = "block";	
},false);

// Nasconde il box calcola calorie 
xBoxCalcolaCalorie.addEventListener('click', function(){
	pesoStaturaEta.style.display ="none";
	ceckCalorie.style.display = "block";
},false);

// Aggiorna la pagina dopo aver completato il form 
aggiornaPagina.addEventListener('click', function(){
	setTimeout(document.location.reload(), 500);
},false);

// Creazione di 3 tag <option> che rappresentano il primo valore (nullo) da inserire  nelle <select>
var trattini1 =  document.createTextNode('---');
var opzioni1 = document.createElement('option');
opzioni1.value = 0;
opzioni1.appendChild(trattini1);
var trattini2 =  document.createTextNode('---');
var opzioni2 = document.createElement('option');
opzioni2.value = 0;
opzioni2.appendChild(trattini2);
var trattini3 =  document.createTextNode('---');
var opzioni3 = document.createElement('option');
opzioni3.value = 0;
opzioni3.appendChild(trattini3);

// Creazione della <select>  peso
var boxPeso = document.getElementById('boxPeso');
var listaPeso = document.createElement('select');
listaPeso.setAttribute('id', 'listaPeso');
listaPeso.appendChild(opzioni1);
boxPeso.appendChild(listaPeso); 
for(var i=20; i< 201; i++){ 
	var opzPeso = document.createElement('option');
	opzPeso.value = i;
//	opzPeso.textContent = i;
	opzPeso.innerHTML = i;
 	listaPeso.appendChild(opzPeso); 
} 
// Creazione della <select> statura
var boxStatura = document.getElementById('boxStatura');
var listaStatura = document.createElement('select');
listaStatura.setAttribute('id', 'listaStatura');
listaStatura.appendChild(opzioni2);
boxStatura.appendChild(listaStatura);
for(var i=150; i< 201; i++){ 
	var opzStatura = document.createElement('option');
	opzStatura.value = i;
//	opzStatura.textContent = i;
	opzStatura.innerHTML = i;
 	listaStatura.appendChild(opzStatura); 
} 
// Creazione della <select> età
var boxEta = document.getElementById('boxEta');
var listaEta = document.createElement('select');
listaEta.setAttribute('id', 'listaEta');
listaEta.appendChild(opzioni3);
boxEta.appendChild(listaEta);
for(var i=1; i< 101; i++){ 
	var opzEta = document.createElement('option');
	opzEta.value = i;
//	opzEta.textContent = i;
	opzEta.innerHTML = i;
 	listaEta.appendChild(opzEta); 
} 

// Invio dati inseriti in un ciclo che distingue le femmine dai maschi 
var invioDati = document.getElementById('invioFE');
var campiRadio =  document.getElementsByTagName('input');
var sesso;
var fabbisognoCalorico;
for(var i=0, radio; radio= campiRadio[i]; i++){
	radio.addEventListener('change', function (){
		sesso = this.value;			
	}, false);
//	Invio dati al click sul pulsante
	invioDati.addEventListener('click', function (){
		var peso = document.getElementById('listaPeso').value;
		var statura = document.getElementById('listaStatura').value;
		var eta = document.getElementById('listaEta').value;
//		var eta = parseFloat(eta);
		var attivita = document.getElementById('listaAttivita').value;

		if(sesso === 'femmine')
			fabbisognoCalorico =	655 + (9.56 * peso) + (1.85 * statura) - (4.67 * eta);
		else
			fabbisognoCalorico = 66.5 + (13.75 * peso) + (5 * statura) - (6.75 * eta);

		fabbisognoCalorico *= attivita;				//	MB x LAF ==> Kcal totali giornaliere

		var boxRisultato = document.getElementById('boxRisultato');

		if(sesso === undefined){
			boxRisultato.innerHTML = '<span class="rosso">ATTENZIONE: Selezionate il sesso</span>'; 	
		}else if(peso == 0){
			boxRisultato.innerHTML = '<span class="rosso">ATTENZIONE: Selezionate il peso</span>'; 	
		}else if(statura == 0){
			boxRisultato.innerHTML = '<span class="rosso">ATTENZIONE: Selezionate la statura</span>'; 	
		}else if(eta == 0){
			boxRisultato.innerHTML = '<span class="rosso">ATTENZIONE: Selezionate la vostra età</span>'; 	
		}else if(attivita == 0){
			boxRisultato.innerHTML = '<span class="rosso">ATTENZIONE: Selezionate il livello di attività</span>'; 	
		}else{
			boxRisultato.innerHTML = "<span class='limone'> IL vostro fabbisogno calorico giornaliero è: <b>" +fabbisognoCalorico.toFixed(0)+ "</b> Kcal</span>";	
			document.getElementById('xBoxCalcolaCalorie').style.display = 'none';
			document.getElementById('aggiornaPagina').style.display = 'block';

			var rangeEta = categoriaEta(eta);									// es: "1-3"  "4-6"  "7-10"  ecc.. 

			var calcio = minerali[sesso][rangeEta]["Ca"];
			var fosforo = minerali[sesso][rangeEta]["P"];
			var magnesio = minerali[sesso][rangeEta]["Mg"];
			var sodio = minerali[sesso][rangeEta]["Na"];
			var potassio = minerali[sesso][rangeEta]["K"];
			var ferro = minerali[sesso][rangeEta]["Fe"];
			var zinco = minerali[sesso][rangeEta]["Zn"];
			var rame = minerali[sesso][rangeEta]["Cu"];
			var selenio = minerali[sesso][rangeEta]["Se"];

			var vitB1 = vitamine[sesso][rangeEta]["B1"];
			var vitB2 = vitamine[sesso][rangeEta]["B2"];
			var vitB3 = vitamine[sesso][rangeEta]["B3"];
			var vitA = vitamine[sesso][rangeEta]["A"];
			var vitC = vitamine[sesso][rangeEta]["C"];
			var vitE = vitamine[sesso][rangeEta]["E"];

//		Creazione variabili x il Local Storage
			localStorage.setItem("sessoUtente", sesso);
			localStorage.setItem("pesoUtente", peso); 
			localStorage.setItem("staturaUtente", statura); 
			localStorage.setItem("etaUtente", eta); 
			localStorage.setItem("attivitaUtente", attivita); 
			localStorage.setItem("mieCalorie", fabbisognoCalorico.toFixed(0)); 


			localStorage.setItem("calcio", calcio);			
			localStorage.setItem("fosforo", fosforo);			
			localStorage.setItem("magnesio", magnesio);			
			localStorage.setItem("sodio", sodio);			
			localStorage.setItem("potassio", potassio);			
			localStorage.setItem("ferro", ferro);			
			localStorage.setItem("zinco", zinco);			
			localStorage.setItem("rame", rame);			
			localStorage.setItem("selenio", selenio);			
			localStorage.setItem("vitB1", vitB1);			
			localStorage.setItem("vitB2", vitB2);			
			localStorage.setItem("vitB3", vitB3);			
			localStorage.setItem("vitA", vitA);			
			localStorage.setItem("vitC", vitC);			
			localStorage.setItem("vitE", vitE);			
		}
	}, false);
}

// Mio => 66.5 + 962.5  + 870 - 337.5 = 1561.5 * 1.6 = 2498

////////


