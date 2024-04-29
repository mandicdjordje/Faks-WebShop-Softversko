const imeProizvoda = document.getElementById("imeProizvoda");
const cenaProizvoda = document.getElementById("cenaProizvoda");
const kolicinaProizvoda = document.getElementById("kolicinaProizvoda");

const dodajProizvod = document.getElementById("dodajProizvod");

const velikoSlovoRec = (rec) => {
  const prvoSlovo = rec.charAt(0).toUpperCase();
  const ostalaRec = rec.substring(1).toLowerCase();
  return prvoSlovo.concat(ostalaRec);
};

dodajProizvod.addEventListener("click", async (e) => {
  try {
    if (
      imeProizvoda.value.length >= 3 &&
      cenaProizvoda.value.length > 0 &&
      kolicinaProizvoda.value.length > 0
    ) {
      data = {
        productName: velikoSlovoRec(imeProizvoda.value),
        quantity: kolicinaProizvoda.value,
        price: cenaProizvoda.value,
      };

      const response = await fetch(
        "http://localhost:3001/api/v1/product/create",
        {
          method: "POST",
          body: JSON.stringify(data),
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
            "Content-Type": "application/json",
          },
        }
      );
      if (response.status === 406) {
        throw new Error("Proizvod vec postoji");
      }
      const result = await response.json();

      if (result.success) {
        console.log("Uspesno napravljen proizvod");
      }
    } else {
      throw new Error("Nije dobro popunjena forma");
    }
  } catch (error) {
    alert(error);
  }
});
