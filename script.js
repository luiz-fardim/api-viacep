// atribuição de variáveis
const btn = document.querySelector("#btn");
const inputElement = document.querySelector("#cep");
const rua = document.querySelector("#rua")
const bairro = document.querySelector("#bairro")
const cidade = document.querySelector("#cidade")

// função assíncrona
const buscarCep = async () => {
    const inputCep = inputElement.value.replace(/\D/g, "");
    // verifica se a quantidade de números está correta
    if (inputCep.length !== 8) {
        alert("Por favor, digite um CEP válido com 8 dígitos.");
        return;
    }
    // busca os dados
    try {
        const response = await fetch(`https://viacep.com.br/ws/${inputCep}/json/`);
        const data = await response.json();
        // mostra o resultado
        if (data.erro) {
            rua.innerHTML = `<p>CEP não encontrado.</p>`;
        } else {
            rua.innerHTML = `<p><strong>Rua: </strong>${data.logradouro}</p>`;
            bairro.innerHTML = `<p><strong>Bairro: </strong>${data.bairro}</p>`;
            cidade.innerHTML = `<p><strong>Cidade: </strong>${data.localidade} - ${data.uf}</p>`;

            rua.style.display = "block";
            bairro.style.display = "block";
            cidade.style.display = "block";
        }
        // tratamento de erro
    } catch (error) {
        console.error("Erro ao buscar CEP:", error);
        rua.innerHTML = "<p>Erro ao consultar o servidor.</p>";
    }
}

// funcionar quando selecionar a tecla "Enter"
inputElement.addEventListener("keydown", (e) => {
    if (e.key === "Enter") {
        buscarCep();
    }
});

// funcionar quando selecionar o botão
btn.addEventListener("click", buscarCep);