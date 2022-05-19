var wordContainer = document.getElementById('wordContainer');
var startButton = document.getElementById('startButton');
var usedLettersElement = document.getElementById('usedLetters');
var EscribirPalabra = document.getElementById("EscribirPalabra");


function TableroDeJuego() {
  usedLetters = [];
  mistakes = 0;
  hits = 0;
  wordContainer.innerHTML = '';
  usedLettersElement.innerHTML = '';
  startButton.style.display = 'none';
  PalabraNueva.style.display = "none";
  SeguirJugando.style.display ="none";
  EscribirPalabra.style.display = "none";
  CancelBoton.style.display = "none";
  AgregarPalabra.style.display = "none";
  inicio.style.display ="none";
  footer.style.display = "none";
  drawHangMan(); 
  selectRandomWord();
  drawWord();
  document.addEventListener('keydown', letterEvent);
}

inicio.addEventListener("click", TableroDeJuego);
startButton.addEventListener('click', TableroDeJuego);
SeguirJugando.addEventListener("click", TableroDeJuego); 


var canvas = document.getElementById('canvas');
var ctx = canvas.getContext('2d');


var CuerpoDeMuneco =  [
  [748,349,35,40],//cabeza
  [746,388,40,80],//torso
  [722,390,90,25],//brazo derecho
  [723,469,25,25],//pies izquierdo
  [784,469,25,25],//pies derecho
];



function drawHangMan() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.fillStyle = '#d95d39';
  ctx.fillRect (540, 300, 25, 500);//poste de la horca
  ctx.fillRect (480, 780, 340, 30);//piso de la horca
  ctx.fillRect (540,300,240,25);//colgante de la horca
  {ctx.fillStyle = "white";
   ctx.fillRect (760,300,10,50);  
}
}

var selectedWord;
var usedLetters;
var mistakes;
var hits;


function addLetter(letter) {
  var letterElement = document.createElement('span');
  letterElement.innerHTML = letter.toUpperCase();
  usedLettersElement.appendChild(letterElement);
}


  function addBodyPart(CuerpoDeMuneco) {
  ctx.fillStyle = '#EDAA7C';
  ctx.fillRect(...CuerpoDeMuneco);
  
  
}

function wrongLetter() {
  addBodyPart(CuerpoDeMuneco[mistakes]);
  mistakes++;
  if (mistakes === CuerpoDeMuneco.length)    
  endGame1();
  
}

function endGame1() {
  document.removeEventListener('keydown', letterEvent);
  CancelBoton1.style.display = 'block';
  SeguirJugando.style.display = "block";
  swal("Usted perdio")
}


function Gano() {
  document.removeEventListener('keydown', letterEvent);
  CancelBoton1.style.display = 'block';
  SeguirJugando.style.display = "block";
  swal("usted gano")
}

function correctLetter(letter) {
  var { children } = wordContainer;
  for (let i = 0; i < children.length; i++) {
      if (children[i].innerHTML === letter) {
          children[i].classList.toggle('hidden');
          hits++;
      }
  }
  if (hits === selectedWord.length) Gano();
}


function letterInput(letter) {
  if (selectedWord.includes(letter)) {
      correctLetter(letter);
  } else {
      wrongLetter();
  }
  addLetter(letter);
  usedLetters.push(letter);
}



function letterEvent(event) {
  var newLetter = event.key.toUpperCase();
  if (newLetter.match(/^[a-zñ]$/i) && !usedLetters.includes(newLetter)) {
      letterInput(newLetter);
  };

}


function drawWord() {
    selectedWord.forEach(letter => {
      var letterElement = document.createElement('span');
      letterElement.innerHTML = letter.toUpperCase();
      letterElement.classList.add('letter');
      letterElement.classList.add('hidden');
      wordContainer.appendChild(letterElement);
  });
}

function selectRandomWord() {
  var word = words[Math.floor((Math.random() * words.length))].toUpperCase();
  selectedWord = word.split('');
}


