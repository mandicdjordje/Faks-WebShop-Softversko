const email = document.getElementById('email');
const password = document.getElementById('password');
const logIn = document.getElementById('logIn');

function checkEmail(input) {
  const re =
    /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  if (re.test(input.trim())) {
    return true;
  } else {
    return false;
  }
}

logIn.addEventListener('click', async (e) => {
  e.preventDefault();

  if (checkEmail(email.value)) {
    const data = {
      email: email.value,
      password: password.value,
    };

    await fetch('http://localhost:3001/api/v1/auth/logIn', {
      method: 'POST',
      body: JSON.stringify(data),
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        localStorage.setItem('token', data.token);
        if (data.token) {
          window.location.href = '../../pocetna/pocetna.html';
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }
});
