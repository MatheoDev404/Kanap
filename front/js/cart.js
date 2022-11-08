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

// bouton de soumission de commande
let orderButon = document.getElementById("order");

// champs du formulaire
let firstName = document.getElementById("firstName");
let lastName = document.getElementById("lastName");
let address = document.getElementById("address");
let city = document.getElementById("city");
let email = document.getElementById("email");

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

function displayCart(cart){

  itemContainer.innerHTML = "";

  for(item of cart){
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
  }
}

function updateCartLocalStorage(cart){
  localStorage.removeItem("cart");
  localStorage.setItem("cart",JSON.stringify(cart));
}

function getTotalPrice(cart){
  let totalPrice = 0;
  for(item of cart){
    totalPrice += parseInt(item.price * item.quantity);
  }
  return totalPrice;
}

function getTotalQuantity(cart){
  let totalQuantity = 0;
  for(item of cart){
    totalQuantity += parseInt(item.quantity);
  }
  return totalQuantity;
}

function addContentTo(element,content) {
  let elementContainer = document.getElementById(element);
  elementContainer.innerHTML = "";
  elementContainer.innerHTML = content;        
}

function validateEmail(email) {
  let regexEmail = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  return regexEmail.test(email);
}

function validateName(name){
  let regexName = /^[a-zA-z] ?([a-zA-z]|[a-zA-z] )*[a-zA-z]$/;
  return regexName.test(name);
}

function validateAddress(address){
  let regexAddress = /^[0-9]* ?([a-zA-z]|[a-zA-z] )*[a-zA-z]$/;
  return regexAddress.test(address);
}

function displayErrorMsg(errorMsg,msg){
  errorMsg.innerHTML = msg;
}

/*********************
***  FUNCTION END  ***
**********************/

// récupération des informations  depuis l'api
for(let i = 0; i < cart.length ; i++){
  fetch("http://localhost:3000/api/products/" + cart[i]._id)
  .then((response) => response.json())
  .then(function(product){

    cart[i].altTxt = product.altTxt;
    cart[i].description = product.description;
    cart[i].imageUrl = product.imageUrl;
    cart[i].name = product.name;
    cart[i].price = product.price;

  })   
  .catch(function(error){
    alert("Une erreur est survenue lors du chargement du panier.")
  });
}

// attente du retour de la requete à l'API
setTimeout(function() {

  displayCart(cart);

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

  // vérifications des valeures entrées dans les champs du formulaire

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

  // // click sur le bouton de soumission du formulaire
  // orderButon.addEventListener('click', function(event){
    
  // }, false);


}, 500);

   
