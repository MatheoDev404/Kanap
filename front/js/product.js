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


// Ajout de l'éléments dans le panier au clique sur le bouton
boutonAjoutPanier.addEventListener(
    "click", 
    function(event){
        // panier est initialisé a vide si le local storage ne contien pas deja un panier avec au moins 1 objet
        let cart = JSON.parse(localStorage.getItem("cart")) ? JSON.parse(localStorage.getItem("cart")) : [];
        console.log(cart);
        // récupération des valeur colors et quantity sur la page product
        let selectedColor = document.getElementById("colors").options[document.getElementById("colors").selectedIndex].value;
        let quantity = parseInt(document.getElementById("quantity").value.trim());

        // création d'un objet item
        let currentOrder = {};
        currentOrder._id = idProduct;
        currentOrder.color = selectedColor;
        currentOrder.quantity = parseInt(quantity);

        // si le cart est vide on ajoute le currentOrder{}
        if(cart.length > 0){
            // on cherche le currentOrder{} dans le cart
            let found = false;

            // Si le currentOrder{} existe deja dans le cart on modifie sa quantité
            for (const order of cart) {
                // si le currentOrder{} existe deja, on ajoute la quantité à l'order existant
                if(currentOrder._id === order._id){
                    order.quantity += currentOrder.quantity;
                    found = true;
                    break;
                }
            }

            // si on n'a pas trouver de correspondance, on ajoute le currentOrder{} au cart
            if(found === false){
                cart.push(currentOrder);
            }
            localStorage.removeItem("cart");
            localStorage.setItem("cart",JSON.stringify(cart));
        }else {
            cart.push(currentOrder);
            localStorage.setItem("cart",JSON.stringify(cart));
        }
        
        
        
        // redirection vers la page panier
        window.location.replace("/front/html/cart.html");

    }
)
