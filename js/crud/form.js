var botaoAdicionar = document.querySelector('#adicionar-voluntario');

botaoAdicionar.addEventListener('click', function(event) {
    event.preventDefault();

    var mensagensErro = document.querySelector('#mensagens-erro');
    mensagensErro.innerHTML = '';

    var form = document.querySelector('#form-adiciona');
    var voluntario  = obtemVoluntarioDoFormulario(form);
    
    var erros = validaVoluntario(voluntario);
    
    if(erros.length > 0) {
        exibeMensagensDeErro(erros);
        return;
    }

    salvarVoluntario(voluntario).then(response => {
        adicionaVoluntarioNaTabela(response);
    })
    .catch(err => alert('Erro ao cadastrar usuário! Verifique a disponibilidade do backend'));

    form.reset();
});

function obtemVoluntarioDoFormulario(form) {
    var voluntario = {
        name: form.name.value,
        cpf: form.cpf.value,
        email: form.email.value,
        password: form.password.value,
        address: form.address.value, 
        city: form.city.value, 
        state: form.state.value, 
        zipCode: form.zipCode.value, 
    };

    return voluntario;
}

function montaTr(voluntario) {
    var voluntarioTr = document.createElement('tr');
    voluntarioTr.classList.add('voluntario');

    voluntarioTr.appendChild(montaTd(voluntario.id, 'info-id'));
    voluntarioTr.appendChild(montaTd(voluntario.name, 'info-nome'));
    voluntarioTr.appendChild(montaTd(voluntario.cpf, 'info-cpf'));
    voluntarioTr.appendChild(montaTd(voluntario.email, 'info-email'));
    voluntarioTr.appendChild(montaTd(voluntario.address, 'info-logradouro'));
    voluntarioTr.appendChild(montaTd(voluntario.city, 'info-cidade'));
    voluntarioTr.appendChild(montaTd(voluntario.state, 'info-estado'));
    voluntarioTr.appendChild(montaTd(voluntario.zipCode, 'info-cep'));

    return voluntarioTr;
}

function montaTd(dado, classe) {
    var td = document.createElement('td');

    td.classList.add(classe);
    td.textContent = dado;
    
    return td;
}

function validaVoluntario(voluntario) {
    var erros = [];

    if (voluntario.name.length == 0) {
        erros.push("O nome não pode ser em branco");
    }

    if (voluntario.cpf.length == 0) {
        erros.push("O cpf não pode ser em branco");
    }

    if (voluntario.email.length == 0) {
        erros.push("O cpf não pode ser em branco");
    }

    if (voluntario.password.length == 0) {
        erros.push("A senha não pode ser em branco");
    }

    if (voluntario.address.length == 0) {
        erros.push("O logradouro não pode ser em branco");
    }

    if (voluntario.city.length == 0) {
        erros.push("A cidade não pode ser em branco");
    }

    if (voluntario.state.length == 0) {
        erros.push("O estado não pode ser em branco");
    }

    if (voluntario.zipCode.length == 0) {
        erros.push("O cep não pode ser em branco");
    }

    return erros;
}

function exibeMensagensDeErro(erros)  {
    var ul = document.querySelector('#mensagens-erro');

    erros.forEach(erro => {
        var li = document.createElement('li');
        li.textContent = erro;
        ul.appendChild(li);
    });
}

function adicionaVoluntarioNaTabela(voluntario) {
    var voluntarioTr = montaTr(voluntario);
    var tabela = document.querySelector('#tabela-voluntarios');

    tabela.appendChild(voluntarioTr); 
}

function salvarVoluntario(voluntario) {
    const json = JSON.stringify(voluntario);

    return fetch('http://localhost:8080/user', {
        method: 'POST',
        headers: {'Content-type' : 'application/json'}, 
        body: json
    })
    .then(resp => resp.json())
    .catch(err => err);
}