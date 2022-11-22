// url de la page
let url = new URL(document.location.href);

// parametre orderId de l'url
let orderId = url.searchParams.get("orderId");

// Conteneur HTML destiné à afficher le numero de commande
let orderIdContainer = document.getElementById("orderId");

// Affichage du numero de commande dans son conteneur
orderIdContainer.innerHTML += orderId;