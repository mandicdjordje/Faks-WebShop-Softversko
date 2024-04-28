const buttonDodaj = document.getElementById("dodaj");
const email = document.getElementById("email");

function checkEmail(input) {
  const re =
    /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  if (re.test(input.trim())) {
    return true;
  } else {
    return false;
  }
}

buttonDodaj.addEventListener("click", async (e) => {
  e.preventDefault();
  if (email.value === "") {
    alert("Prvo unesite email");
    return;
  } else if (!checkEmail(email.value)) {
    alert("Email nije validan");
    return;
  }

  const body = { email: email.value };

  const response = await fetch(
    "http://localhost:3001/api/v1/user/create/AdminWebShop",
    {
      method: "POST",
      body: JSON.stringify(body),
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
        "Content-Type": "application/json",
      },
    }
  );

  const result = await response.json();

  if (result.success) {
    setTimeout(() => {
      window.location.href = "../../pocetna.html";
    }, 1000);
    // Ovo stavi da vidi Root Admin tj na stranicu
    console.log("Admin web_shop dodat");
  } else {
    alert("Korisnik nije nadjen");
  }
});
