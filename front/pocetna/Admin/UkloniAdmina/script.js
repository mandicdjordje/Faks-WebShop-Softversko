const email = document.getElementById('email');
const ukloniButton = document.getElementById('ukloniButton');

function checkEmail(input) {
  const re =
    /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  if (re.test(input.trim())) {
    return true;
  } else {
    return false;
  }
}


ukloniButton.addEventListener('click',async e=>{
  e.preventDefault();

  if (email.value === '') {
    console.log('Prvo unesite email');
    return;
  } else if (!checkEmail(email.value)) {
    console.log('Email nije validan');
    return;
  }

  // await fetch('')


})