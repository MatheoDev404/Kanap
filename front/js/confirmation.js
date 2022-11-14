// url de la page
let url = new URL(document.location.href);

// param orderId de l'url
let orderId = url.searchParams.get("orderId");

// Conteneur HTML destiné a afficher le numero de commande
let orderIdContainer = document.getElementById("orderId");

//affichage du numero de commande dans son conteneur
orderIdContainer.innerHTML += orderId;