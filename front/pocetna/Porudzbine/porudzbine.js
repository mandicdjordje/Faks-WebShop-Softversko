const porudzbineDiv = document.getElementById("porudzbine");

let porudzbine;

const ukloniProizvod = async (basket_id) => {
  try {
    const response = await fetch(
      `http://localhost:3001/api/v1/basket/delete/${basket_id}`,
      {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
          "Content-Type": "application/json",
        },
      }
    );

    if (response.status == 204) {
      alert("Uspesno Uklonjena porudzbina");
      iscrtajPorudzbine();
    }
  } catch (error) {}
};

const getPorudzbina = async () => {
  try {
    const response = await fetch(`http://localhost:3001/api/v1/basket/all`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
        "Content-Type": "application/json",
      },
    });

    if (response.status == 200) {
      const baskets = await response.json();
      return baskets;
    } else {
      alert("User nema porudzbina");
      throw new Error("Nema proizvoda");
    }

    // console.log(result);
  } catch (error) {}
};

const getProductsFromBakset = async (basket_id) => {
  try {
    const response = await fetch(
      `http://localhost:3001/api/v1/basket/basket_id/${basket_id}`,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
          "Content-Type": "application/json",
        },
      }
    );

    if (response.status == 200) {
      const proizvodiUKorpi = await response.json();

      return await proizvodiUKorpi.products;
    } else {
      throw new Error("Nema Proizvoda u korpi" + basket_id);
    }
  } catch (error) {
    console.error(error);
  }
};

const iscrtajPorudzbine = async () => {
  porudzbine = await getPorudzbina();
  console.log(porudzbine);

  let html = ``;

  for (let i = 0; i < porudzbine.length; i++) {
    let proizvodi = await getProductsFromBakset(porudzbine[i].basket_id);

    html += `
    <div id="porudzbina">
    <p>Broj porudzbine ${porudzbine[i].basket_id}</p>
    `;

    for (let j = 0; j < proizvodi.length; j++) {
      html += `
      <div class="proizvodi">
        <p>Ime Proizvoda ${proizvodi[j].productName}</p>
        <p>Kolicina Proizvoda ${proizvodi[j].quantity}</p>
      </div>
      `;
    }

    html += `
    <p>Cena Porudzbine ${porudzbine[i].price}<p>
    <button onclick="ukloniProizvod(${porudzbine[i].basket_id})">Ukloni Porudzbinu</button>
    </div>
    `;
  }

  porudzbineDiv.innerHTML = html;
};
iscrtajPorudzbine();
