// conteneur des éléméents du panier
let itemContainer = document.getElementById("cart__items");
let totalPriceContainer = document.getElementById("totalPrice");
let totalQuantityContainer = document.getElementById("totalQuantity");

// panier
let cart = JSON.parse(localStorage.getItem("cart")) ? JSON.parse(localStorage.getItem("cart")) : [];

// Bouton +/- quantité
let adjustQuantityButtons = document.getElementsByClassName("itemQuantity");
let deleteItemFromCart = document.getElementsByClassName("deleteItem");

// Bouton soumission du panier
let submitCart = document.getElementById("order");


// affiche le panier
function displayCart(cart, apiProductData){
  for(let product of apiProductData){    
    for (const order of cart) {
      if(product._id === order._id){
        itemContainer.innerHTML += `
        <article class="cart__item" data-id="${product._id}" data-color="${order.color}">
          <div class="cart__item__img">
            <img src="${product.imageUrl}" alt="${product.altTxt}">
          </div>
          <div class="cart__item__content">
            <div class="cart__item__content__description">
              <h2>${product.name}</h2>
              <p>${order.color}</p>
              <p>${product.price}€</p>
            </div>
            <div class="cart__item__content__settings">
              <div class="cart__item__content__settings__quantity">
                <p>Qté : </p>
                <input type="number" class="itemQuantity" name="itemQuantity" min="1" max="100" value="${order.quantity}">
              </div>
              <div class="cart__item__content__settings__delete">
                <p class="deleteItem">Supprimer</p>
              </div>
            </div>
          </div>
        </article>
      `;
    }
  }
  }
}

function emptyHTMLElement(element){
  element.innerHTML="";
}

// affiche le prix du panier
function displayTotalPrice(cart, apiProductData){
  let totalPrice = 0 ;
  for(let product of apiProductData){    
    for (const order of cart) {
      if(product._id === order._id){
        totalPrice += order.quantity * product.price;
      }
    }
  }
  totalPriceContainer.innerHTML = totalPrice;
}

// affiche la quantité d'articles dans le paniers
function displayTotalQuantity(cart, apiProductData){
  let totalQuantity = 0 ;
  for(let product of apiProductData){    
    for (const order of cart) {
      if(product._id === order._id){
        totalQuantity += parseInt(order.quantity);
      }
    }
  }
  totalQuantityContainer.innerHTML = totalQuantity;
}

// affichage des produits 
fetch("http://localhost:3000/api/products")
.then((response) => response.json())
.then(function(products){

    // affichage du prix total
    displayTotalPrice(cart, products);

    // affichage de la quantité totale
    displayTotalQuantity(cart, products);

    // affichage du panier
    displayCart(cart,products);
    
    // modification de la quantité
    for(let i = 0; i < adjustQuantityButtons.length; i++) {
      adjustQuantityButtons[i].addEventListener('change', function(){
        console.log('test');


        let thisProductId = this.closest("article").dataset.id;
        let thisProductColor = this.closest("article").dataset.color;
        
        for (const order of cart) {
          if(thisProductId === order._id && thisProductColor === order.color){
            order.quantity = this.value

            localStorage.removeItem("cart");
            localStorage.setItem("cart",JSON.stringify(cart));
            
            // // suppression des anciens elements
            emptyHTMLElement(totalPriceContainer);
            emptyHTMLElement(totalQuantityContainer);

            // // affichage des nouveaux elements
            displayTotalPrice(cart, products);
            displayTotalQuantity(cart, products);
          }
        }

        

      }, false);
    }

    // suppression d'un objet dans une commande
    for(let i = 0; i < deleteItemFromCart.length; i++) {
      deleteItemFromCart[i].addEventListener('click', function(event){
        
        let thisProductId = this.closest("article").dataset.id;
        let thisProductColor = this.closest("article").dataset.color;
        
        for (let i = 0; i < cart.length; i++) {
          if(thisProductId === cart[i]._id && thisProductColor === cart[i].color){

            cart.splice(i,1);

            localStorage.removeItem("cart");
            localStorage.setItem("cart",JSON.stringify(cart));

            // suppression des anciens elements
            emptyHTMLElement(itemContainer);
            emptyHTMLElement(totalPriceContainer);
            emptyHTMLElement(totalQuantityContainer);

            // affichage des nouveaux elements
            displayCart(cart,products);
            displayTotalPrice(cart, products);
            displayTotalQuantity(cart, products);

          }
        }

        

        // // suppression des anciens elements
        
        // console.log(itemContainer);
        // emptyHTMLElement(totalPriceContainer);
        // emptyHTMLElement(totalQuantityContainer);

        // // affichage des nouveaux elements



        



        // displayTotalPrice(cart, products);
        // displayTotalQuantity(cart, products);

      }, false);
    }
})   
.catch(function(error){
    alert("Désolé, ce kanap n'est plus disponible !")
});
