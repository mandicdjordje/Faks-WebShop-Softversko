const pretragaProizvodaInput = document.getElementById("pretragaProizvoda");
const pretraziProizvodDugme = document.getElementById("pretraziProizvodDugme");
const proizvodiDiv = document.getElementById("proizvodi");

const brojDiv = document.getElementById("broj");
let suma = 0;

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
    alert("UNESITE MINIMUM TRI KARAKTERA ZA PRETRAGU");
    console.error(error);
  }
};

const dodajProizvodFunkcija = (id, kolicina) => {
  let element = document.getElementById(id);
  let elementVrednost = Number(element.innerHTML);
  if (kolicina == elementVrednost) {
    return;
  }
  console.log(elementVrednost);
  element.innerHTML = elementVrednost + 1;
};
const oduzmiProizvodFunkcija = (id) => {
  let element = document.getElementById(id);
  let elementVrednost = Number(element.innerHTML);
  if (elementVrednost == 0) {
    return;
  }
  console.log(elementVrednost);
  element.innerHTML = elementVrednost - 1;
};

const dodajUKorpu = async (idProizvoda) => {
  const element = document.getElementById(idProizvoda);
  let kolicina = Number(element.innerHTML);

  const proizvod = await fetch(
    `http://localhost:3001/api/v1/product/product_id/${idProizvoda}`,
    {
      method: "GET",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
        "Content-Type": "application/json",
      },
    }
  );
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
      <button id="plusDugme" onclick="dodajProizvodFunkcija(${proizvod.product_id} ,${proizvod.quantity})">+</button>
      <p id="${proizvod.product_id}" >0</p>
      <button id="minusDugme" onclick="oduzmiProizvodFunkcija(${proizvod.product_id})">-</button>
      <button id="dodajProizvod${proizvod.product_id}" onclick="dodajUKorpu(${proizvod.product_id},)">Dodaj</button>
    </div>
  </div>
    `;
  });

  proizvodiDiv.innerHTML = html;
};
pretraziProizvodDugme.addEventListener("click", async (e) => {
  e.preventDefault();

  const proizvodi = await pretragaProizvoda();
  if (proizvodi == undefined) {
    return;
  }
  iscrtajProizvode(proizvodi);
});
