const html = document.querySelector('html');
const timer = document.querySelector('#timer');
const image = document.querySelector('.app__image');
const title = document.querySelector('.app__title');
const botoes = document.querySelectorAll('.app__card-button');

const startPauseBt = document.querySelector('#start-pause');
const iniciarOuPausarBt = document.querySelector('#start-pause span');

const botaoImagem = document.querySelector('.app__card-primary-butto-icon');
const imagemPausar = ('/imagens/pause.png');
const imagemComecar = ('/imagens/play_arrow.png');

const musicaFocoInput = document.querySelector('#alternar-musica');
const musica = new Audio('/sons/luna-rise-part-one.mp3');
const audioPlay = new Audio('/sons/play.wav');
const audioPause = new Audio('/sons/pause.mp3');
const audioZerado = new Audio('/sons/beep.mp3');

const focoBt = document.querySelector('.app__card-button--foco');
const curtoBt = document.querySelector('.app__card-button--curto');
const longoBt = document.querySelector('.app__card-button--longo');

let tempoDecorridoEmSegundos = 1500;
let intervaloId = null;

const botaoIniciar = document.querySelector('.app__card-primary-button');

musica.loop = true;

musicaFocoInput.addEventListener('change', () => {
   if(musica.paused) {
      musica.play();
   } else {
      musica.pause();
   }
})

focoBt.addEventListener('click', () => {
  tempoDecorridoEmSegundos = 1500;
   alterarContexto('foco');
   focoBt.classList.add('active');
})

curtoBt.addEventListener('click', () => {
  tempoDecorridoEmSegundos = 300;
   alterarContexto('descanso-curto');
   curtoBt.classList.add('active');
})

longoBt.addEventListener('click', () => {
  tempoDecorridoEmSegundos = 900;
   alterarContexto('descanso-longo');
   longoBt.classList.add('active');
})

function alterarContexto (contexto) {
  mostrarTempo()
   botoes.forEach(function (contexto) {
      contexto.classList.remove('active');
   })
   html.setAttribute('data-contexto', contexto);
   image.setAttribute('src', `./imagens/${contexto}.png`);
   switch (contexto) {
      case "foco":
         title.innerHTML = `Otimize sua produtividade,<br>
         <strong class="app__title-strong">mergulhe no que importa.</strong>`;
         
         break;
   
      case "descanso-curto":
         title.innerHTML = `Que tal dar uma respirada? <strong class="app__title-strong">Faça uma pausa curta!</strong>`;
         
         break;

      case "descanso-longo":
         title.innerHTML = `Hora de voltar à superfície.<strong class="app__title-strong"> Faça uma pausa longa.</strong>`;

         break;

      default:
         break;
   }
}

const contagemRegressiva = () => {
   if(tempoDecorridoEmSegundos <= 0){
        audioZerado.play();
        alert('Tempo finalizado!');
        zerar();
        return;
   }

   tempoDecorridoEmSegundos -= 1;
   mostrarTempo();
}

startPauseBt.addEventListener('click', iniciarOuPausar)

function iniciarOuPausar() {
   if(intervaloId){
    audioPause.play();
    
    zerar();
    return;
   }
   audioPlay.play();
   intervaloId = setInterval(contagemRegressiva, 1000);
   iniciarOuPausarBt.textContent = "Pausar";
   botaoImagem.setAttribute('src', imagemPausar);

}

function zerar() {
   clearInterval(intervaloId);
   iniciarOuPausarBt.textContent = "Começar";
   botaoImagem.setAttribute('src', imagemComecar);
   intervaloId = null;
}

function mostrarTempo() {
  const tempo = new Date(tempoDecorridoEmSegundos * 1000);
  const tempoFormatado = tempo.toLocaleTimeString('pt-Br', {minute: '2-digit', second: '2-digit'});
  timer.innerHTML = `${tempoFormatado}`;
}

mostrarTempo();
