const ime = document.getElementById('ime');
const prezime = document.getElementById('prezime');
const email = document.getElementById('email');
const password = document.getElementById('password');
const password2 = document.getElementById('password2');

const submit = document.getElementById('submit');

const kolikoKaraktera = (input, odkaraktera, doKaraktera) => {
  const duzinaStringa = input.length;
  if (duzinaStringa < odkaraktera) {
    console.log(`Niste uneli dovoljno karaktera minimalno je ${odkaraktera}`);
    return false;
  } else if (duzinaStringa > doKaraktera) {
    console.log(`Uneli ste previse karaktera maksimum je ${doKaraktera}`);
    return false;
  } else {
    console.log('SUPER');
    return true;
  }
};

function checkEmail(input) {
  const re =
    /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  if (re.test(input.trim())) {
    return true;
  } else {
    return false;
  }
}

function passwordMatch(password, password2) {
  if (password === password2) {
    console.log('Lozinke su ispravne');
    return true;
  } else {
    console.log('Nisu iste lozinke');
    return false;
  }
}

submit.addEventListener('click', async (e) => {
  e.preventDefault();

  if (
    ((kolikoKaraktera(ime.value, 3, 15),
    checkEmail(email.value),
    kolikoKaraktera(prezime.value, 5, 25),
    kolikoKaraktera(password.value, 5, 25),
    kolikoKaraktera(password2.value, 5, 25)),
    passwordMatch(password.value, password2.value))
  ) {
    const data = {
      firstName: ime.value,
      lastName: prezime.value,
      email: email.value,
      password: password.value,
    };

    await fetch(`http://localhost:3001/api/v1/auth/register`, {
      method: 'POST',
      body: JSON.stringify(data),
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((response) => {
        return response.json();
      })
      .then((result) => {
        console.log(result);
        if (result.success) {
          window.location.href = '../logIn/logIn.html';
        }
      })
      .catch((err) => {
        console.log(err);
      });
  } else {
    console.log('Nije tacno');
  }
});
