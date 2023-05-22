const form = document.getElementById("novoItem");
const lista = document.querySelector("#lista");
const objetos = document.querySelectorAll("li");

//Transforma Objeto em String             // Sim, o "OU" funciona de uma forma diferente
const itens = JSON.parse(localStorage.getItem("itens")) || [];

// console.log(itens);

// console.log([])

itens.forEach(element => {
    criaElemento(element);
});


form.addEventListener("submit", (event) => {
    event.preventDefault(); //Para o envio do form

    const nome = event.target.elements['nome'];
    const quantidade = event.target.elements['quantidade'];


    const existe = itens.find(item => item.nome.toLowerCase() === nome.value.toLowerCase());

    const itemAtual = {
        //Objeto
        //Chave  //Valor
        "nome": nome.value,
        "quantidade": quantidade.value
    }


    if (existe) {
        itemAtual.id = existe.id;
        atualizaElemento(itemAtual);

        itens[itens.findIndex(element => element.id === existe.id)] = itemAtual;

    } else {

        itemAtual.id = itens[itens.length -1] ? (itens[itens.length-1]).id + 1 : 0; 

        criaElemento(itemAtual);

        //Inserindo um item no array
        itens.push(itemAtual);
    }




    //Transformando o objeto em String 
    localStorage.setItem("itens", JSON.stringify(itens));


    // console.log(event.target[0].value);
    // console.log(event);

    nome.value = "";
    quantidade.value = "";
});



// function alteraEstilo(nome, quantidade) {
//     const itemVazio = document.getElementsByClassName('item')[4];
//     itemVazio.innerHTML += nome;
//     itemVazio.style.color = "red";
//     const numeroVazio = document.getElementsByTagName('strong')[4];
//     numeroVazio.innerHTML += quantidade;
//     numeroVazio.style.background = "blue"; 
// }

function criaElemento(item) {
    // console.log(nome);
    // console.log(quantidade);

    const novoItem = document.createElement('li'); //Ele cria uma tag
    novoItem.classList.add('item');

    const numeroItem = document.createElement('strong');
    numeroItem.innerHTML = item.quantidade;

    //Cria um data attribute na tag strong 
    numeroItem.dataset.id = item.id


    novoItem.appendChild(numeroItem); //Essa função engloba a tag filha
    novoItem.innerHTML += item.nome;

    novoItem.appendChild(btnDeleta(item.id)); //Inclui dentro do elemento

    lista.appendChild(novoItem);


    // alert(novoItem);

}

function atualizaElemento(item) {
    document.querySelector("[data-id='" + item.id + "']").innerHTML = item.quantidade;
}

function btnDeleta(id) {
    const botao = document.createElement("button"); //Serve para criar uma TAG
    botao.className = 'btn-remover';
    botao.innerHTML = 'X';

    botao.addEventListener("click", function () {
        deletaElemento(this.parentNode, id); //Envia a tag pai
    });


    return botao;
}

function deletaElemento(tag, id) {
    tag.remove(); //Exclui a tag

    // console.log(id);

    itens.splice(itens.findIndex(element => element.id === id), 1); //Remove o item do array pela posição

    //console.log(itens);

    localStorage.setItem("itens", JSON.stringify(itens));

}


//console.log(form);