const NazivProizvoda = document.getElementById('NazivProizvoda');
const ukloniButton = document.getElementById('ukloni');

const velikoSlovoRec = (rec) => {
  const prvoSlovo = rec.charAt(0).toUpperCase();
  const ostalaRec = rec.substring(1).toLowerCase();
  return prvoSlovo.concat(ostalaRec);
};

ukloniButton.addEventListener('click', async (e) => {
  e.preventDefault();

  const proizvodNaziv = velikoSlovoRec(NazivProizvoda.value);

  if (proizvodNaziv.length >= 3) {
    try {
      const response = await fetch(
        `http://localhost:3001/api/v1/product/delete/${proizvodNaziv}`,
        {
          method: 'DELETE',
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
            'Content-Type': 'application/json',
          },
        }
      );
      console.log('D');
      if (response.status === 404) {
        throw new Error('Proizvod nije nadjen');
      }
      if (response.status === 204) {
        // console.log(`Porizvod pod nazivom ${proizvodNaziv} je uklonjen`);
        // setTimeout(() => {
        //   window.location.href = '../../pocetna.html';
        // }, 2000);
      }
    } catch (error) {
      alert(error);
    }
  } else {
    console.error('Proizvod mora imati minimum 3 slova');
  }
});
