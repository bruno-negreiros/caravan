var xhr = new XMLHttpRequest();

xhr.open('GET', 'http://localhost:8080/user/getByName');

xhr.addEventListener('load', function() {
    var erroAjax = document.querySelector('#erro-ajax');

    if (xhr.status === 200) {
        erroAjax.classList.add('invisivel');

        var resposta = xhr.responseText;
        var voluntarios = JSON.parse(resposta);

        voluntarios.forEach(voluntario => {
            adicionaVoluntarioNaTabela(voluntario);
        });

    } else {
        erroAjax.classList.remove('invisivel');
        erroAjax.textContent = `Erro ${xhr.status} - ${xhr.statusText}: ${xhr.responseText}`; 
    }
});

xhr.send();
