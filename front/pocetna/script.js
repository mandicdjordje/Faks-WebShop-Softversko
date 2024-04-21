const dodjaAdmina = document.getElementById('dodjaAdmina');
const ukloniAdmina = document.getElementById('ukloniAdmina');
const dodajProizvod = document.getElementById('dodajProizvod');
const ukloniProizvod = document.getElementById('ukloniProizvod');

dodjaAdmina.addEventListener('click', (e) => {});

(async function () {
  debugger;
  await fetch('http://localhost:3001/api/v1/user/currentInfo', {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${localStorage.getItem('token')}`,
      'Content-Type': 'application/json',
    },
  })
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      if (data.admin_root == true) {
        console.log('ADMIN ROOT');
      }
      if (data.admin_web_shop) {
        console.log('ADMIN WEBSHOP');
      }

      console.log('USERRR');
    })
    .catch((err) => {
      console.log(err);
    });
})();
