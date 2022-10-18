// url de la page
let url = new URL(document.location.href);

// id du produit de la page
let idProduct = url.searchParams.get("id");

// Bouton ajout au panier
let boutonAjoutPanier = document.getElementById("addToCart");



function addContent(element,content) {
        let elementContainer = document.getElementById(element);
        elementContainer.innerHTML = content;        
}

function displayOption(itemContainer, item){
    itemContainer.innerHTML += `
    <option value="${item}">${item}</option>
    `;
}


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

    addContent("title",product.name);
    addContent("price",product.price);
    addContent("description",product.description);

    let selectColor = document.getElementById("colors")
        product.colors.forEach(element => {
        displayOption(selectColor,element)
    });
})   
.catch(function(error){
    alert("Désolé, ce kanap n'est plus disponible !")
});


// Ajout des éléments dans le panier
boutonAjoutPanier.addEventListener(
    "click", 
    function(event){

        // initialisation du panier
        let cart = JSON.parse(localStorage.getItem("cart")) ? JSON.parse(localStorage.getItem("cart")) : [];

        // récuperation des value
        let selectedColor = document.getElementById("colors").options[document.getElementById("colors").selectedIndex].value;
        let quantity = parseInt(document.getElementById("quantity").value.trim());

        let currentOrder = {};
        currentOrder._id = idProduct;
        currentOrder.color = selectedColor;
        currentOrder.quantity = parseInt(quantity);

        if(cart.length > 0){
            
            let found = false;

            for (const order of cart) {
                // si le currentOrder correspond a un order dans le panier on ajoute la quantité à celui existant
                if(currentOrder._id === order._id && currentOrder.color === order.color){
                    order.quantity += currentOrder.quantity;
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

    }, false
)
