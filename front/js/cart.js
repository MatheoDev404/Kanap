// conteneur des éléméents du panier
let itemContainer = document.getElementById("cart__items");
let totalPriceContainer = document.getElementById("totalPrice");
let totalQuantityContainer = document.getElementById("totalQuantity");

// affiche un élément
function displayItem(item){
    itemContainer.innerHTML += `
            <article class="cart__item" data-id="${item._id}" data-color="${item.color}">
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
              </article>
    `;
}

// affiche le prix du panier
function displayTotalPrice(price){
    totalPriceContainer.innerHTML = price;
}

// affiche la quantité d'articles dans le paniers
function displayTotalQuantity(quantity){
    totalQuantityContainer.innerHTML = quantity;
}

// affichage des produits 
fetch("http://localhost:3000/api/products")
.then((response) => response.json())
.then(function(products){

    let totalPrice = 0;
    let totalQuantity = 0;

    for(let product of products){

        // si l'id de l'ojet commandé correspond à l'id d'un objet, 
        if(JSON.parse(localStorage.getItem(product._id)) !== null ){

            // alors on crée un bjet avec la quantité et la couleur choisie.
            let cartProduct = {};
            cartProduct._id = product._id;
            cartProduct.altTxt = product.altTxt;
            cartProduct.color = JSON.parse(localStorage.getItem(product._id)).color;
            cartProduct.imageUrl = product.imageUrl;
            cartProduct.name = product.name;
            cartProduct.price = product.price;
            cartProduct.quantity = JSON.parse(localStorage.getItem(product._id)).quantity;
            
            totalQuantity += cartProduct.quantity;
            totalPrice += cartProduct.quantity * cartProduct.price

            // on affiche le produit
            displayItem(cartProduct);
            
        }
    }
    displayTotalPrice(totalPrice);
    displayTotalQuantity(totalQuantity);
})   
.catch(function(error){
    alert("Désolé, ce kanap n'est plus disponible !")
});


// suppresion d'un produit
let deleteFromCart = document.getElementsByClassName("deleteItem");
console.log(deleteFromCart);