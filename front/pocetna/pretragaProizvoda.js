const pretragaProizvodaInput = document.getElementById("pretragaProizvoda");
const pretraziProizvodDugme = document.getElementById("pretraziProizvodDugme");
const proizvodiDiv = document.getElementById("proizvodi");
const korpa = document.getElementById("korpa");

const brojDiv = document.getElementById("broj");
let productsForBasket = [];
const selectedPoducts = [];

const pretragaProizvoda = async () => {
  try {
    if (pretragaProizvodaInput.value.length >= 3) {
      const response = await fetch(
        `http://localhost:3001/api/v1/product/name/${pretragaProizvodaInput.value}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      if (response.status === 404) {
        throw new Error(
          `Nema proizvoda pod nazivom ${pretragaProizvodaInput.value}`
        );
      } else {
        data = await response.json();
        return data.products;
      }
    } else {
      throw new Error("Unesite vise slova");
    }
  } catch (error) {
    alert(error);
    console.error(error);
  }
};

const dodajProizvodFunkcija = (id, kolicina, priceDiv, price) => {
  let element = document.getElementById(id);
  const priceElement = document.getElementById(priceDiv.id);

  let elementVrednost = Number(element.innerHTML);

  if (kolicina == elementVrednost) {
    return;
  }
  element.innerHTML = elementVrednost + 1;
  priceElement.innerHTML = (price * Number(element.innerHTML)).toFixed(2);
};
const oduzmiProizvodFunkcija = (id, priceDiv, price) => {
  let element = document.getElementById(id);
  const priceElement = document.getElementById(priceDiv.id);

  let elementVrednost = Number(element.innerHTML);
  if (elementVrednost == 1) {
    priceElement.innerHTML = (price * Number(element.innerHTML)).toFixed(2);

    return;
  }
  element.innerHTML = elementVrednost - 1;
  priceElement.innerHTML = (price * Number(element.innerHTML)).toFixed(2);
};

const dodajUKorpu = async (idProizvoda) => {
  const element = document.getElementById(idProizvoda);
  let kolicina = Number(element.innerHTML);
  try {
    const response = await fetch(
      `http://localhost:3001/api/v1/product/product_id/${idProizvoda}`,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
          "Content-Type": "application/json",
        },
      }
    );
    if (response == 404) {
      throw new Error("Nema proizvoda");
    } else {
      let proizvod = await response.json();
      proizvod = proizvod.product;

      const trazeniProizvod = productsForBasket.find(
        (element) => element.product_id == proizvod.product_id
      );
      if (trazeniProizvod) {
        const trazeniIdProizvod = productsForBasket.findIndex(
          (element) => element.product_id == proizvod.product_id
        );

        productsForBasket[trazeniIdProizvod].quantity =
          kolicina + trazeniProizvod.quantity;

        if (
          productsForBasket[trazeniIdProizvod].quantity >= proizvod.quantity
        ) {
          productsForBasket[trazeniIdProizvod].quantity = proizvod.quantity;
          throw new Error("Nije moguce vise uneti proizvoda");
        }
      } else {
        let proizvodCopy = { ...proizvod };
        proizvodCopy.quantity = kolicina;

        productsForBasket.push(proizvodCopy);
      }
    }
  } catch (error) {
    alert(error);
    console.error(error);
  }

  iscrtajKorpu();
};

const IzbrisiProizvodIzKorpe = (id) => {
  console.log(id);
  productsForBasket = productsForBasket.filter((obj) => {
    console.log();
    return obj.product_id !== id;
  });

  iscrtajKorpu();
};

const poruci = async () => {
  let ordered_products = { ordered_products: [...productsForBasket] };

  try {
    const response = await fetch("http://localhost:3001/api/v1/basket/create", {
      method: "POST",
      body: JSON.stringify(ordered_products),
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
        "Content-Type": "application/json",
      },
    });

    if (response == 200) {
      const result = await response.json();
      console.log("Uspesno");
    }
  } catch (error) {
    console.error(error);
  }
};

const iscrtajProizvode = (proizvodi) => {
  let html = "";
  proizvodi.forEach((proizvod) => {
    html += `
    <div class="proizvod">
    <div class="prozivod-elementi">
      <p id="ime-proizvoda" class="elementi">${proizvod.productName}</p>
      <p id="cena-proizvoda" class="elementi">${proizvod.price}</p>
    </div>
    <div class="ukloni">
      <button id="plusDugme" onclick="dodajProizvodFunkcija(${proizvod.product_id} ,${proizvod.quantity},Cena${proizvod.product_id},${proizvod.price})">+</button>
      <p id="${proizvod.product_id}" >1</p>
      <button id="minusDugme" onclick="oduzmiProizvodFunkcija(${proizvod.product_id},Cena${proizvod.product_id},${proizvod.price})">-</button>
      <button id="dodajProizvod${proizvod.product_id}" onclick="dodajUKorpu(${proizvod.product_id})">Dodaj</button>

      <p id="Cena${proizvod.product_id}">${proizvod.price}</p>
    </div>
  </div>
    `;
  });

  proizvodiDiv.innerHTML = html;
};

const iscrtajKorpu = () => {
  let html = `<h1>Korpa</h1>`;
  let ukupnaCena = 0;
  productsForBasket.forEach((proizvod) => {
    let cena = Number((proizvod.quantity * proizvod.price).toFixed(2));
    ukupnaCena = ukupnaCena + cena;
    html += `
      <div class="podaci-proizvod-korpa" id="proizvodKorpa${proizvod.product_id}">
      <p>${proizvod.productName}</p>
      <p>${proizvod.quantity}</p>
      <p>${cena}</p>
  
      <div class="dugmad-korpe">
        <button onclick="IzbrisiProizvodIzKorpe(${proizvod.product_id})">Ukloni Proizvod</button>
      </div>
    </div>
    
    `;
  });
  ukupnaCena = ukupnaCena.toFixed(2);
  if (productsForBasket.length >= 2) {
    html += `
    <div>
      <p>Ukupna cena Proizvoda je</p>
      <p>${ukupnaCena}</p>
    </div>
    `;
  }
  html += `<div>
              <button onclick="poruci()">Poruci</button>
          </div>`;

  korpa.innerHTML = html;
};

pretraziProizvodDugme.addEventListener("click", async (e) => {
  e.preventDefault();

  const proizvodi = await pretragaProizvoda();
  if (proizvodi == undefined) {
    return;
  }
  iscrtajProizvode(proizvodi);
});
