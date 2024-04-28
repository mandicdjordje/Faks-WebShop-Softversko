const email = document.getElementById("email");
const ukloniButton = document.getElementById("ukloniButton");

function checkEmail(input) {
  const re =
    /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  if (re.test(input.trim())) {
    return true;
  } else {
    return false;
  }
}

ukloniButton.addEventListener("click", async (e) => {
  e.preventDefault();

  if (email.value === "") {
    console.log("Prvo unesite email");
    return;
  } else if (!checkEmail(email.value)) {
    console.log("Email nije validan");
    return;
  }

  try {
    const response = await fetch(
      `http://localhost:3001/api/v1/user/delete/AdminWebShop/${email.value}`,
      {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
          "Content-Type": "application/json",
        },
      }
    );

    const result = await response.json();
    if (result.success) {
      // Ovo lepo da se stavi da se ispise
      console.log("Uspesno uklonjen status admina web_shopa");
    } else {
      throw new Error("admin nije pronadjen");
    }

    console.log(result);
  } catch (error) {
    alert(error);
    console.error(error);
  }
});
