import { validarInput } from './services/validar.js';

window.onload = function () {
  const inputs = document.querySelectorAll('input');
  const botaoLogin = document.querySelector('#botao-login');
  const formLogin = document.getElementById('form-login');

  botaoLogin.addEventListener('click', function(event) {
    event.preventDefault();

    if(inputs[0].validity.valid && inputs[1].validity.valid) {
      logar(formLogin.email.value, formLogin.password.value);
    } 
  
  });

  inputs.forEach(input => {
    input.addEventListener('invalid', (e) => {
      e.preventDefault();

      validarInput(input);
    });

    input.addEventListener('input', () => {
      validarInput(input, false);
    });

    input.addEventListener('blur', () => {
      validarInput(input);
    });
  });
};