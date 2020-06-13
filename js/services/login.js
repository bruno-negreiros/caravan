function logar(email, password) {
  validarLogin(email, password)
    .then(resp => {
      if(resp) {
        window.location.href = "crud.html";
      } else {
        alert('Usuário ou senha inválida!');
      }
    })
    .catch(err => alert('Backend indisponível'));
}

function validarLogin(email, password) {
  return fetch(`http://localhost:8080/user/validatesLogin?email=${email}&password=${password}`, {
    method: 'GET',
    
  })
  .then(resp => resp.json())
  .catch(err => err);
}