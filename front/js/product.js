/*****************
*****  VAR   *****
*****************/

// url de la page
let url = new URL(document.location.href);

// id du produit de la page
let idProduct = url.searchParams.get("id");

// Bouton ajout au panier
let boutonAjoutPanier = document.getElementById("addToCart");

/*****************
***  VAR END   ***
*****************/

/*****************
**  FUNCTION   ***
*****************/

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
Nom : displayOption
Parametres : itemContainer, item
Utilité : Afficher les options d'un select
return : 
*************/
function displayOption(itemContainer, item){
    itemContainer.innerHTML += `
    <option value="${item}">${item}</option>
    `;
}


/*********************
***  FUNCTION END  ***
**********************/

// requete vers l'API sur l'id du produit
fetch("http://localhost:3000/api/products/" + idProduct)
.then((response) => response.json())
.then(function(product){
    // ajout image 
    let imgContainer = document.getElementsByClassName("item__img");
    let img = document.createElement("img");
    img.src = product.imageUrl;
    img.alt = product.altTxt;
    imgContainer[0].appendChild(img);

    try {
        addContentTo("title",product.name);
    } catch (error) {
        console.log('fonction addContentTo en erreur fichier product.js 01');
    }
        
    try {
        addContentTo("price",product.price);
    } catch (error) {
        console.log('fonction addContentTo en erreur fichier product.js 02');  
    }
    
    try {
        addContentTo("description",product.description);
    } catch (error) {
        console.log('fonction addContentTo en erreur fichier product.js 03');
    }

    let selectColor = document.getElementById("colors")
        product.colors.forEach(element => {

        try {
            displayOption(selectColor,element);
        } catch (error) {
            console.log('fonction displayOption en erreur fichier product.js');
        }
    });
})   
.catch(function(error){
    alert("Désolé, ce kanap n'est plus disponible !")
});


// Ajout des éléments dans le panier
boutonAjoutPanier.addEventListener("click", function(event){

        // initialisation du panier
        let cart = JSON.parse(localStorage.getItem("cart")) ? JSON.parse(localStorage.getItem("cart")) : [];

        // récuperation des valeures données
        let selectedColor = document.getElementById("colors").options[document.getElementById("colors").selectedIndex].value;
        let quantity = parseInt(document.getElementById("quantity").value.trim());

        console.log(selectedColor.length);
        console.log(quantity);
        if(selectedColor.length > 0 && quantity > 0){

            let currentOrder = {};
            currentOrder._id = idProduct;
            currentOrder.color = selectedColor;
            currentOrder.quantity = parseInt(quantity);
            
            if(cart.length > 0){
                
                let found = false;
                
                for (const order of cart) {
                    // si le currentOrder correspond à un order dans le panier on ajoute la quantité à l'order existant
                    if(currentOrder._id === order._id && currentOrder.color === order.color){
                        order.quantity += currentOrder.quantity;
                        if(order.quantity > 100){
                            order.quantity = 100;
                        }
                        found = true;
                        break;
                    }
                }
                
                if(found === false){
                    cart.push(currentOrder);
                }
                
                localStorage.removeItem("cart");
                localStorage.setItem("cart",JSON.stringify(cart));
                
            }else {

                cart.push(currentOrder);
                localStorage.setItem("cart",JSON.stringify(cart));
                
            }
            
            window.location.replace("/front/html/cart.html");
        }

    }, false
)
