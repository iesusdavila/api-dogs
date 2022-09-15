const API_URL_RANDOM = "https://api.thedogapi.com/v1/images/search?limit=6";

const API_URL_FAVORITES = "https://api.thedogapi.com/v1/favourites?limit=32";

const API_URL_FAVORITE_DELETE = (id) =>
  `https://api.thedogapi.com/v1/favourites/${id}?api_key=`;

const spanError = document.getElementById("error");

//const saveDog = document.getElementsByClassName("saveDog");

const optionGet = {
  method: "GET",
  headers: {
    "x-api-key":
      "live_jkhUKD6dyZhjOgB3Dq2isoDy1DsYeaXW5tfgUoj4RMECIZqUff0sd5nTtAJL7nGu",
  },
};

async function loadRandomDogs() {
  const res = await fetch(API_URL_RANDOM);
  const data = await res.json();

  console.log("IMAGENES RANDOM");
  console.log(data);

  if (res.status != 200) {
    spanError.innerHTML = "Ocurrio un error de tipo: " + res.status;
  } else {
    const img1 = document.getElementById("img1");
    const img2 = document.getElementById("img2");
    const img3 = document.getElementById("img3");
    const img4 = document.getElementById("img4");
    const img5 = document.getElementById("img5");
    const img6 = document.getElementById("img6");

    const btn1 = document.getElementById("btn1");
    const btn2 = document.getElementById("btn2");
    const btn3 = document.getElementById("btn3");
    const btn4 = document.getElementById("btn4");
    const btn5 = document.getElementById("btn5");
    const btn6 = document.getElementById("btn6");

    img1.src = data[0].url;
    img2.src = data[1].url;
    img3.src = data[2].url;
    img4.src = data[3].url;
    img5.src = data[4].url;
    img6.src = data[5].url;

    btn1.onclick = () => saveFavoritesDogs(data[0].id);
    btn2.onclick = () => saveFavoritesDogs(data[1].id);
    btn3.onclick = () => saveFavoritesDogs(data[2].id);
    btn4.onclick = () => saveFavoritesDogs(data[3].id);
    btn5.onclick = () => saveFavoritesDogs(data[4].id);
    btn6.onclick = () => saveFavoritesDogs(data[5].id);
  }
}

async function loadFavoritesDogs() {
  const res = await fetch(API_URL_FAVORITES, optionGet);
  const data = await res.json();

  console.log("DATAAA");
  console.log(data);

  if (res.status !== 200) {
    spanError.innerHTML = "Hubo un error: " + res.status + data.message;
  } else {
    const sectFavDogs = document.getElementById("favoritesDogs");
    sectFavDogs.innerHTML = "";

    data.forEach((dog) => {
      const article = document.createElement("article");

      const img = document.createElement("img");
      img.src = dog.image.url;

      const button = document.createElement("button");
      button.innerText = "Remove as favorite";

      article.appendChild(img);
      article.appendChild(button);
      sectFavDogs.appendChild(article);

      button.onclick = () => deleteFavoriteDog(dog.id);
    });
  }
}

async function saveFavoritesDogs(id) {
  const optionPost = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "X-API-KEY":
        "live_jkhUKD6dyZhjOgB3Dq2isoDy1DsYeaXW5tfgUoj4RMECIZqUff0sd5nTtAJL7nGu",
    },
    body: JSON.stringify({
      image_id: id,
    }),
  };

  const res = await fetch(API_URL_FAVORITES, optionPost);
  const data = await res.json();

  if (res.status !== 200) {
    spanError.innerHTML = "Hubo un error: " + res.status + data.message;
  } else {
    console.log("Guardado");
    loadFavoritesDogs();
  }
}

async function deleteFavoriteDog(id) {
  const response = await fetch(API_URL_FAVORITE_DELETE(id), {
    method: "DELETE",
    headers: {
      "X-API-KEY":
        "live_jkhUKD6dyZhjOgB3Dq2isoDy1DsYeaXW5tfgUoj4RMECIZqUff0sd5nTtAJL7nGu",
    },
  });
  const data = await response.json();
  if (response.status !== 200) {
    spanError.innerHTML = "Error: " + response.status + " " + data.message;
  } else {
    console.log("Eliminado");
    loadFavoritesDogs();
  }
}

loadRandomDogs();
loadFavoritesDogs();
