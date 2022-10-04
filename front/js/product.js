let url = new URL(document.location.href);
let idProduct = url.searchParams.get("id");

// Bouton ajout au panier
let boutonAjout = document.getElementById("addToCart");


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



boutonAjout.addEventListener(
    "click", 
    function(event){

        let selectedColor = document.getElementById("colors").options[document.getElementById("colors").selectedIndex].value;
        let quantity = document.getElementById("quantity").value;

        let commande = new Object();
        commande._id = idProduct;
        commande.selectedColor = selectedColor;
        commande.quantity = quantity;
        // localStorage.setItem(commande);
        console.log(commande);
    }
)

// localStorage.setItem('color', selectedColor );

// stockage des info de la commande


console.log(localStorage);
// get couleur nombre nom WHERE id = urlId