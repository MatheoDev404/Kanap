let url = new URL(document.location.href);
let idProduct = url.searchParams.get("id");

// Bouton ajout au panier
let boutonAjoutPanier = document.getElementById("addToCart");


function addContent(element,content) {
        let elementContainer = document.getElementById(element);
        elementContainer.innerHTML += content;        
}

function displayOption(itemContainer, item){
    itemContainer.innerHTML += `
    <option value="${item}">${item}</option>
    `;
}

fetch("http://localhost:3000/api/products")
.then((response) => response.json())
.then(function(products){
    for(let product of products){
        if (product._id === idProduct) {
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
        }
    }
})   
.catch(function(error){
    alert("Désolé, ce kanap n'est plus disponible !")
});


// Ajout de l'éléments dans le panier au clique sur le bouton
boutonAjoutPanier.addEventListener(
    "click", 
    function(event){

        // récupération des valeur colors et quantity sur la page product
        let selectedColor = document.getElementById("colors").options[document.getElementById("colors").selectedIndex].value;
        let quantity = document.getElementById("quantity").value.trim();

        // création d'un objet commande
        let commande = {};
        commande._id = idProduct;
        commande.color = selectedColor;
        commande.quantity = parseInt(quantity);

        
        // ajout de l'objet commande au panier (localStorage)
        if(JSON.parse(localStorage.getItem(idProduct)) === null)
        {
            localStorage.setItem(idProduct,JSON.stringify(commande));
        }
        else if(JSON.parse(localStorage.getItem(idProduct))._id === commande._id){
            // on ajoute la quantité déja dans le panier
            commande.quantity += parseInt(JSON.parse(localStorage.getItem(idProduct)).quantity);
            // on suprime l'ancienne commande
            localStorage.removeItem(idProduct);
            // on ajoute la nouvelle commande avec tous les produits
            localStorage.setItem(idProduct,JSON.stringify(commande));
        }
        
        // redirection vers la page panier
        window.location.replace("/front/html/cart.html");

    }
)
