const dodjaAdmina = document.getElementById("dodjaAdmina");
const ukloniAdmina = document.getElementById("ukloniAdmina");
const dodajProizvod = document.getElementById("dodajProizvod");
const ukloniProizvod = document.getElementById("ukloniProizvod");

(async function () {
  await fetch("http://localhost:3001/api/v1/user/currentInfo", {
    method: "GET",
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
      "Content-Type": "application/json",
    },
  })
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      if (data.body.admin_root == true) {
      }
      if (data.body.admin_web_shop) {
        dodjaAdmina.style.display = "none";
        ukloniAdmina.style.display = "none";
      }
      if (!data.body.admin_web_shop && !data.body.admin_root) {
        dodjaAdmina.style.display = "none";
        ukloniAdmina.style.display = "none";
        dodajProizvod.style.display = "none";
        ukloniProizvod.style.display = "none";
      }
    })
    .catch((err) => {
      console.log(err);
    });
})();
