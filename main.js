const API_URL_RANDOM = "https://api.thedogapi.com/v1/images/search?limit=6";

const API_URL_FAVORITES = "https://api.thedogapi.com/v1/favourites?limit=32";

const API_URL_FAVORITE_DELETE = (id) =>
  `https://api.thedogapi.com/v1/favourites/${id}?api_key=`;

const spanError = document.getElementById("error");

const optionGet = {
  method: "GET",
  headers: {
    "x-api-key":
      "live_jkhUKD6dyZhjOgB3Dq2isoDy1DsYeaXW5tfgUoj4RMECIZqUff0sd5nTtAJL7nGu",
  },
};

//---***---***---***---***---***---***---***---***---***---***---***---***

//Cargar imagenes de perritos aleatorias
async function loadRandomDogs() {
  //Peticion GET para obtener los datos de la API
  const res = await fetch(API_URL_RANDOM);
  //Transformamos a JSON para poderlos utilizar
  const data = await res.json();

  //Si hubo un error mostrar el error al usuario
  if (res.status != 200) {
    spanError.innerHTML = "Ocurrio un error de tipo: " + res.status;
  } else {
    //Lectura de las etiquetas img del HTML
    const img1 = document.getElementById("img1");
    const img2 = document.getElementById("img2");
    const img3 = document.getElementById("img3");
    const img4 = document.getElementById("img4");
    const img5 = document.getElementById("img5");
    const img6 = document.getElementById("img6");

    //Lectura de las etiquetas buttons del HTML
    const btn1 = document.getElementById("btn1");
    const btn2 = document.getElementById("btn2");
    const btn3 = document.getElementById("btn3");
    const btn4 = document.getElementById("btn4");
    const btn5 = document.getElementById("btn5");
    const btn6 = document.getElementById("btn6");

    //En las etiquetas img colocamos la imagen obtenida de la API
    img1.src = data[0].url;
    img2.src = data[1].url;
    img3.src = data[2].url;
    img4.src = data[3].url;
    img5.src = data[4].url;
    img6.src = data[5].url;

    //En los botones les asignamos la funcion para guardar como favoritos a los perritos cuando se haga click
    btn1.onclick = () => saveFavoritesDogs(data[0].id);
    btn2.onclick = () => saveFavoritesDogs(data[1].id);
    btn3.onclick = () => saveFavoritesDogs(data[2].id);
    btn4.onclick = () => saveFavoritesDogs(data[3].id);
    btn5.onclick = () => saveFavoritesDogs(data[4].id);
    btn6.onclick = () => saveFavoritesDogs(data[5].id);
  }
}

//---***---***---***---***---***---***---***---***---***---***---***---***

//Cargar imagenes favoritas de perritos
async function loadFavoritesDogs() {
  //Peticion GET para obtener los datos de la API
  const res = await fetch(API_URL_FAVORITES, optionGet);
  //Transformamos a JSON para poderlos utilizar
  const data = await res.json();

  //Si hubo un error mostrar el error al usuario
  if (res.status !== 200) {
    spanError.innerHTML = "Hubo un error: " + res.status + data.message;
  } else {
    //Etiqueta que contiene todas las imagenes favoritas
    const sectFavDogs = document.getElementById("favoritesDogs");
    //Cada vez que cargue nuevas imagenes favoritas se tendra que limpiar la etiqueta para evitar sobreescritura
    sectFavDogs.innerHTML = "";

    //Lectura del array que contiene todos las imagenes favoritas
    data.forEach((dog) => {
      //Creamos una etiqueta article
      const article = document.createElement("article");

      //Creamos una etiqueta img
      const img = document.createElement("img");
      //En la etiqueta img creada le asignamos la foto que este iterando
      img.src = dog.image.url;

      //Creamos una etiqueta button
      const button = document.createElement("button");
      //En la etiqueta button creada la asignamos como algo de texto
      button.innerText = "Remove as favorite";

      //Dentro de la etiqueta article contendra las etiquetas img y button
      article.appendChild(img);
      article.appendChild(button);

      //Dentro de la etiqueta que contendra a las imagenes favoritas colocaremos el article para cada imagen-boton iterado
      sectFavDogs.appendChild(article);

      //En el boton creado le asignamos la funcion para borrar de favoritos cuando se haga click
      button.onclick = () => deleteFavoriteDog(dog.id);
    });
  }
}

//---***---***---***---***---***---***---***---***---***---***---***---***

//Guardar imagenes favoritas de perritos
async function saveFavoritesDogs(id) {
  //Argumento que recibira fetch para usar el metodo POST
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

  //Peticion POST para enviar los datos de la API
  const res = await fetch(API_URL_FAVORITES, optionPost);
  //Transformamos a JSON para poderlos utilizar
  const data = await res.json();

  //Si hubo un error mostrar el error al usuario
  if (res.status !== 200) {
    spanError.innerHTML = "Hubo un error: " + res.status + data.message;
  } else {
    //Si se logro guarda la imagen se carga nuevamente la seccion de perritos favoritos
    loadFavoritesDogs();
  }
}

//---***---***---***---***---***---***---***---***---***---***---***---***

//Eliminar imagenes favoritas de perritos
async function deleteFavoriteDog(id) {
  //Argumento que recibira fetch para usar el metodo DELETE
  const optionDelete = {
    method: "DELETE",
    headers: {
      "X-API-KEY":
        "live_jkhUKD6dyZhjOgB3Dq2isoDy1DsYeaXW5tfgUoj4RMECIZqUff0sd5nTtAJL7nGu",
    },
  };

  //Peticion POST para enviar los datos de la API
  const response = await fetch(API_URL_FAVORITE_DELETE(id), optionDelete);
  //Transformamos a JSON para poderlos utilizar
  const data = await response.json();

  //Si hubo un error mostrar el error al usuario
  if (response.status !== 200) {
    spanError.innerHTML = "Error: " + response.status + " " + data.message;
  } else {
    //Si se logro eliminar la imagen de favoritos se carga nuevamente la seccion de perritos favoritos
    loadFavoritesDogs();
  }
}

loadRandomDogs();
loadFavoritesDogs();
