// ELEMENTOS DO LIVRO

const paginas = document.querySelectorAll(".pagina");

const anterior = document.getElementById("anterior");
const proximo = document.getElementById("proximo");
const contador = document.getElementById("contador");
const abrir = document.getElementById("abrir");

let paginaAtual = 0;


// NAVEGAÇÃO DO LIVRO

function atualizarLivro() {
    paginas.forEach(function(pagina, indice) {
        pagina.classList.remove("ativa");

        if (indice === paginaAtual) {
            pagina.classList.add("ativa");
        }
    });

    anterior.disabled = paginaAtual === 0;
    proximo.disabled = paginaAtual === paginas.length - 1;

    contador.textContent =
        (paginaAtual + 1) + " / " + paginas.length;
}

function avancarPagina() {
    if (paginaAtual < paginas.length - 1) {
        paginaAtual++;
        atualizarLivro();
    }
}

function voltarPagina() {
    if (paginaAtual > 0) {
        paginaAtual--;
        atualizarLivro();
    }
}

proximo.addEventListener("click", avancarPagina);
anterior.addEventListener("click", voltarPagina);
abrir.addEventListener("click", avancarPagina);


// PLAYER DE MÚSICA

const musica = document.getElementById("musica");
const controleMusica = document.getElementById("controle-musica");

controleMusica.addEventListener("click", async function() {
    if (musica.paused) {
        try {
            await musica.play();
            controleMusica.textContent = "♫ Pausar música";
        } catch (erro) {
            controleMusica.textContent = "Não foi possível tocar";
            console.log("Erro ao reproduzir:", erro);
        }
    } else {
        musica.pause();
        controleMusica.textContent = "♫ Tocar música";
    }
});


// CONTAGEM REGRESSIVA

const bloqueio = document.getElementById("bloqueio");

const elementoDias = document.getElementById("dias");
const elementoHoras = document.getElementById("horas");
const elementoMinutos = document.getElementById("minutos");

// 8 de dezembro de 2026, à meia-noite
const aniversario = new Date(2026, 11, 8, 0, 0, 0);

function atualizarContagem() {

    bloqueio.style.display = "none";

    const agora = new Date();

    const diferenca = aniversario - agora;

    // SE CHEGOU O ANIVERSÁRIO...
    if (diferenca <= 0) {
        bloqueio.style.display = "none";
        return;
    }

    const dias = Math.floor(
        diferenca / (1000 * 60 * 60 * 24)
    );

    const horas = Math.floor(
        (diferenca / (1000 * 60 * 60)) % 24
    );

    const minutos = Math.floor(
        (diferenca / (1000 * 60)) % 60
    );

    elementoDias.textContent = String(dias).padStart(2, "0");
    elementoHoras.textContent = String(horas).padStart(2, "0");
    elementoMinutos.textContent = String(minutos).padStart(2, "0");
}


// INICIAR

atualizarLivro();
atualizarContagem();

setInterval(atualizarContagem, 1000);

