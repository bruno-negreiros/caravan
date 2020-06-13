var tabelaVoluntarios = document.querySelector('#tabela-voluntarios');

tabelaVoluntarios.addEventListener('dblclick', function(event) {
    const id = event.target.parentNode.querySelector('.info-id').textContent;

    deleteById(id)
        .then(_ => {
            event.target.parentNode.classList.add('fadeOut');
            setTimeout(function(){
                event.target.parentNode.remove();
            }, 500);
        })
        .catch(_ => alert('Erro ao excluir voluntário'));
});

function deleteById(id) {
    return fetch('http://localhost:8080/user/' + id, {
        method: 'DELETE'
    })
    .then(resp => resp)
    .catch(err => err);
}