/*****************
*****  VAR   *****
******************/

// panier localstorage
let cart = JSON.parse(localStorage.getItem("cart")) ? JSON.parse(localStorage.getItem("cart")) : [];

// conteneur HTML des éléments du panier
let itemContainer = document.getElementById("cart__items");

// collection des boutons suprimmer d'un produit
let deleteItemFromCartButtons;

// collection des boutons modifier d'un produit
let adjustQuantityButtons;

// formulaire
let cartOrderForm = document.getElementsByClassName("cart__order__form")
// champs du formulaire
let firstName = document.getElementById("firstName");
let lastName = document.getElementById("lastName");
let address = document.getElementById("address");
let city = document.getElementById("city");
let email = document.getElementById("email");
// bouton de soumission de commande
let orderButon = document.getElementById("order");

// message d'erreure des champs du formulaire
let firstNameErrorMsg = document.getElementById("firstNameErrorMsg");
let lastNameErrorMsg = document.getElementById("lastNameErrorMsg");
let addressErrorMsg = document.getElementById("addressErrorMsg");
let cityErrorMsg = document.getElementById("cityErrorMsg");
let emailErrorMsg = document.getElementById("emailErrorMsg");

/*****************
***  VAR END   ***
******************/

/*****************
**  FUNCTION   ***
******************/

/************
Nom : addContentTo
Parametres : element,content
Utilité : Ajoute le content à l'element en suprimant l'ancien contenu.
return :
*************/
function addContentTo(element,content) {
  let elementContainer = document.getElementById(element);
  elementContainer.innerHTML = "";
  elementContainer.innerHTML = content;        
}

/************
Nom : displayErrorMsg
Parametres : errorMsg,msg
Utilité : Affiche le msg dans le conteneur errorMsg.
return : 
*************/
function displayErrorMsg(errorMsg,msg){
  errorMsg.innerHTML = msg;
}

/************
Nom : displayItem
Parametres : item
Utilité : Afficher la fiche d'un objet.
return : 
*************/
function displayItem(item,i){
  itemContainer.innerHTML += 
  `<article class="cart__item" data-id="${item._id}" data-color="${item.color}">
    <div class="cart__item__img">
      <img src="${item.imageUrl}" alt="${item.altTxt}">
    </div>
    <div class="cart__item__content">
      <div class="cart__item__content__description">
        <h2>${item.name}</h2>
        <p>${item.color}</p>
        <p>${item.price}€</p>
      </div>
      <div class="cart__item__content__settings">
        <div class="cart__item__content__settings__quantity">
          <p>Qté : </p>
          <input type="number" class="itemQuantity" name="itemQuantity" min="1" max="100" value="${item.quantity}">
        </div>
        <div class="cart__item__content__settings__delete">
          <p class="deleteItem">Supprimer</p>
        </div>
      </div>
    </div>
  </article>`;
 if(i === cart.length - 1){
  processingCart();
 }
  
}

/************
Nom : getTotalPrice
Parametres : cart
Utilité : Calcule le prix total du Cart.
return : totalPrice
*************/
function getTotalPrice(cart){
  let totalPrice = 0;
  for(item of cart){
    totalPrice += parseInt(item.price * item.quantity);
  }
  return totalPrice;
}

/************
Nom : getTotalQuantity
Parametres : cart
Utilité : Calcule la quantité totale du Cart.
return : totalQuantity
*************/
function getTotalQuantity(cart){
  let totalQuantity = 0;
  for(item of cart){
    totalQuantity += parseInt(item.quantity);
  }
  return totalQuantity;
}

/************
Nom : processingCart
Parametres : 
Utilité : Execute le processus qui necessite d'attendre la réponse de l'api
return : 
*************/
function processingCart(){
  
  addContentTo("totalQuantity",getTotalQuantity(cart));
  addContentTo("totalPrice",getTotalPrice(cart));
  
  deleteItemFromCartButtons = document.getElementsByClassName("deleteItem");
  adjustQuantityButtons = document.getElementsByClassName("itemQuantity");
  
  // supression d'un objet du panier
  for(let i = 0; i < deleteItemFromCartButtons.length; i++) {
    
    deleteItemFromCartButtons[i].addEventListener('click', function(event){
      
      let thisProductId = this.closest("article").dataset.id;
      let thisProductColor = this.closest("article").dataset.color;
      
      for (let i = 0; i < cart.length; i++) {
        if(thisProductId === cart[i]._id && thisProductColor === cart[i].color){
          cart.splice(i,1);
          updateCartLocalStorage(cart);
        }
      }
      
      alert('kanapé suprimmé de votre panier')
      window.location.replace("/front/html/cart.html");
      
    }, false);
  }
  
  // modification de la quantité d'un objet
  for(let i = 0; i < adjustQuantityButtons.length; i++) {
    adjustQuantityButtons[i].addEventListener('change', function(){
      
      let thisProductId = this.closest("article").dataset.id;
      let thisProductColor = this.closest("article").dataset.color;
      
      for (let order of cart) {
        if(thisProductId === order._id && thisProductColor === order.color){
          order.quantity = this.value
          updateCartLocalStorage(cart);
        }
      }

      addContentTo("totalQuantity",getTotalQuantity(cart));
      addContentTo("totalPrice",getTotalPrice(cart));
      
    }, false);
  }
}

/************
Nom : updateCartLocalStorage
Parametres : cart
Utilité : Met à jour le Cart sur le localStorage.
return : 
*************/
function updateCartLocalStorage(cart){
  localStorage.removeItem("cart");
  localStorage.setItem("cart",JSON.stringify(cart));
}

/************
Nom : validateAddress
Parametres : address
Utilité : teste l'address avec la regex d'address.
return : regexName.test(address)
*************/
function validateAddress(address){
  let regexAddress = /^[0-9]* ?([a-zA-z]|[a-zA-z] )*[a-zA-z]$/;
  return regexAddress.test(address);
}

/************
Nom : validateEmail
Parametres : email
Utilité : teste l'email avec la regex d'email.
return : regexEmail.test(email)
*************/
function validateEmail(email) {
  let regexEmail = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  return regexEmail.test(email);
}

/************
Nom : validateName
Parametres : name
Utilité : teste le nom avec la regex de noms.
return : regexName.test(name)
*************/
function validateName(name){
  let regexName = /^[a-zA-z]* ?([a-zA-z]|[a-zA-z] )*[a-zA-z]$/;
  return regexName.test(name);
}





/************
Nom : processingCart
Parametres : 
Utilité : Execute le processus qui necessite d'attendre la réponse de l'api
return : 
*************/
function processingCart(){
  
  addContentTo("totalQuantity",getTotalQuantity(cart));
  addContentTo("totalPrice",getTotalPrice(cart));
  
  deleteItemFromCartButtons = document.getElementsByClassName("deleteItem");
  adjustQuantityButtons = document.getElementsByClassName("itemQuantity");
  
  // supression d'un objet du panier
  for(let i = 0; i < deleteItemFromCartButtons.length; i++) {
    
    deleteItemFromCartButtons[i].addEventListener('click', function(event){
      
      let thisProductId = this.closest("article").dataset.id;
      let thisProductColor = this.closest("article").dataset.color;
      
      for (let i = 0; i < cart.length; i++) {
        if(thisProductId === cart[i]._id && thisProductColor === cart[i].color){
          cart.splice(i,1);
          updateCartLocalStorage(cart);
        }
      }
      
      alert('kanapé suprimmé de votre panier')
      window.location.replace("/front/html/cart.html");
      
    }, false);
  }
  
  // modification de la quantité d'un objet
  for(let i = 0; i < adjustQuantityButtons.length; i++) {
    adjustQuantityButtons[i].addEventListener('change', function(){
      
      let thisProductId = this.closest("article").dataset.id;
      let thisProductColor = this.closest("article").dataset.color;
      
      for (let order of cart) {
        if(thisProductId === order._id && thisProductColor === order.color){
          order.quantity = this.value
          updateCartLocalStorage(cart);
        }
      }

      addContentTo("totalQuantity",getTotalQuantity(cart));
      addContentTo("totalPrice",getTotalPrice(cart));
      
    }, false);
  }
}

/*********************
***  FUNCTION END  ***
**********************/

// récupération des informations depuis l'api
for(let i = 0; i < cart.length; i++){
  
  fetch("http://localhost:3000/api/products/" + cart[i]._id)
  .then((response) => response.json())
  .then(function(product){

    cart[i].altTxt = product.altTxt;
    cart[i].description = product.description;
    cart[i].imageUrl = product.imageUrl;
    cart[i].name = product.name;
    cart[i].price = product.price;

    displayItem(cart[i],i);

  })   
  .catch(function(error){
    alert("Une erreur est survenue lors du chargement du panier.")
  });
}

// attente du retour de la requete à l'API



// Vérifications des valeures entrées dans les champs du formulaire

// PRENOM
firstName.addEventListener('change', function(event){
  if(validateName(firstName.value)){
    displayErrorMsg(firstNameErrorMsg,"")
  }else {
    displayErrorMsg(firstNameErrorMsg,"le prénom rentrée n'est pas valide.")
  }
}, false);

// NOM
lastName.addEventListener('change', function(event){
  if(validateName(lastName.value)){
    displayErrorMsg(lastNameErrorMsg,"")
  }else {
    displayErrorMsg(lastNameErrorMsg,"le nom rentrée n'est pas valide.")
  }
}, false);

//ADRESSE
address.addEventListener('change', function(event){
  if(validateAddress(address.value)){
    displayErrorMsg(addressErrorMsg,"")
  }else {
    displayErrorMsg(addressErrorMsg,"l'adresse rentrée n'est pas valide.")
  }
}, false);

// VILLE
city.addEventListener('change', function(event){
  if(validateName(city.value)){
    displayErrorMsg(cityErrorMsg,"")
  }else {
    displayErrorMsg(cityErrorMsg,"la ville rentrée n'est pas valide.")
  }
}, false);

// EMAIL
email.addEventListener('change', function(event){
  if(validateEmail(email.value)){
    displayErrorMsg(emailErrorMsg,"")
  }else {
    displayErrorMsg(emailErrorMsg,"l'email rentré n'est pas valide.")
  }
}, false);


// click sur le bouton de soumission du formulaire
cartOrderForm[0].addEventListener('submit', function(event){
  event.preventDefault();

  // Si tous les champs sont valide
  if(validateName(firstName.value) 
  && validateName(lastName.value) 
  && validateAddress(address.value) 
  && validateName(city.value)  
  && validateEmail(email.value)){
    
    let productsId = [];
    
    for(item of cart){
      productsId.push(item._id);
    }

    // objet contact
    let order = {
      contact : {
        firstName : firstName.value,
        lastName : lastName.value,
        address : address.value,
        city : city.value,
        email : email.value
      },
      products : productsId
    };

    console.log(JSON.stringify(order))

    /**
     *
     * Expects request to contain:
     * contact: {
     *   firstName: string,
     *   lastName: string,
     *   address: string,
     *   city: string,
     *   email: string
     * }
     * products: [string] <-- array of product _id
     *
     */

    fetch('http://localhost:3000/api/products/order', {
      method: 'POST',
      headers: { 
        'Accept': 'application/json', 
        'Content-Type': 'application/json' 
        },
      body: JSON.stringify(order),
    })
    .then((response) => response.json())
    .then((order) => window.location.replace("/front/html/confirmation.html?orderId=" + order.orderId))
    

  }
  

}, false);