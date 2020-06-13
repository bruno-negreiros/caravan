var compoFiltro = document.querySelector('#filtrar-tabela');

compoFiltro.addEventListener('input', function() {
    var voluntarios = document.querySelectorAll('.voluntario');

    if (this.value.length > 0) {
        voluntarios.forEach(voluntario => {
            var tdNome = voluntario.querySelector('.info-nome'); 
            var nome = tdNome.textContent;
            var expressao = new RegExp(this.value, 'i');
            
            if(!expressao.test(nome)) {
                voluntario.classList.add('invisivel');
            } else {
                voluntario.classList.remove('invisivel');
            }
        });
    } else {
        voluntarios.forEach(voluntario => {
            voluntario.classList.remove('invisivel');
        });
    }

});


