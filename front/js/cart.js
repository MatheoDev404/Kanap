/*****************
*****  VAR   *****
******************/

// panier localstorage
let cart = JSON.parse(localStorage.getItem("cart")) ? JSON.parse(localStorage.getItem("cart")) : [];

// conteneur HTML des éléments du panier
let itemContainer = document.getElementById("cart__items");

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

function addContent(element,content) {
  let elementContainer = document.getElementById(element);
  elementContainer.innerHTML = "";
  elementContainer.innerHTML = content;        
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


setTimeout(function() {

  displayCart(cart);
  addContent("totalQuantity",getTotalQuantity(cart));
  addContent("totalPrice",getTotalPrice(cart));
  

  let deleteItemFromCart = document.getElementsByClassName("deleteItem");
  let adjustQuantityButtons = document.getElementsByClassName("itemQuantity");

  // supression d'un objet du panier
  for(let i = 0; i < deleteItemFromCart.length; i++) {

    deleteItemFromCart[i].addEventListener('click', function(event){

      console.log('click');

      let thisProductId = this.closest("article").dataset.id;
      let thisProductColor = this.closest("article").dataset.color;
      
      for (let i = 0; i < cart.length; i++) {
        if(thisProductId === cart[i]._id && thisProductColor === cart[i].color){
          cart.splice(i,1);
          updateCartLocalStorage(cart);
        }
      }

      alert('kanapé suprimé')
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
      
      addContent("totalQuantity",getTotalQuantity(cart));
      addContent("totalPrice",getTotalPrice(cart));
      

    }, false);
  }
  
}, 500);

   
