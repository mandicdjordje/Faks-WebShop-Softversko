const pretraga = document.getElementById('pretraga');
const search = document.getElementById('search');
const ukloniPorizvod = document.getElementById('ukloni');

const proizvodiDiv = document.getElementById('proizvodi');
let data = {};

const iscrtajProizvode = (proizvodi = []) => {
  let html = '';

  proizvodi.forEach((proizvod) => {
    html += `
    <div class="proizvod">
    <div class="prozivod-elementi">
      <p id="ime-proizvoda" class="elementi">${proizvod.productName}</p>
      <p id="kolicina-proizvoda" class="elementi">Zalihe proizvoda ${proizvod.quantity}</p>
      <p id="cena-proizvoda" class="elementi">Cena proizvoda ${proizvod.price}</p>
    </div>
    <div class="ukloni">
      <button class="dugmeUkloni" onclick = "ukloniElement(${proizvod.product_id})">Ukloni</button>
    </div>
  </div>
    `;
  });

  proizvodiDiv.innerHTML = html;
};

const ukloniElement = async (idElementa) => {
  const response = await fetch(
    `http://localhost:3001/api/v1/product/delete/${idElementa}`,
    {
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
        'Content-Type': 'application/json',
      },
    }
  );

  await pronadjiProizvode();
  iscrtajProizvode(data.products);
};

const pronadjiProizvode = async () => {
  try {
    if (pretraga.value.length >= 3) {
      const response = await fetch(
        `http://localhost:3001/api/v1/product/${pretraga.value}`,
        {
          method: 'GET',
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
            'Content-Type': 'application/json',
          },
        }
      );

      if (response.status === 404) {
        throw new Error(`Nema proizvoda pod nazivom ${pretraga.value}`);
      } else {
        data = await response.json();
        return data;
      }
    } else {
      throw new Error('Unesite vise slova');
    }
  } catch (error) {
    console.error(error);
  }
};

search.addEventListener('click', async (e) => {
  e.preventDefault();

  // try {
  //   if (pretraga.value.length >= 3) {
  //     const response = await fetch(
  //       `http://localhost:3001/api/v1/product/${pretraga.value}`,
  //       {
  //         method: 'GET',
  //         headers: {
  //           Authorization: `Bearer ${localStorage.getItem('token')}`,
  //           'Content-Type': 'application/json',
  //         },
  //       }
  //     );

  //     if (response.status === 404) {
  //       throw new Error(`Nema proizvoda pod nazivom ${pretraga.value}`);
  //     } else {
  //       data = await response.json();
  //     }
  //   } else {
  //     throw new Error('Unesite vise slova');
  //   }
  // } catch (error) {
  //   console.error(error);
  // }
  await pronadjiProizvode();
  iscrtajProizvode(data.products);
});
