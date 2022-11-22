/*****************
*****  VAR   *****
*****************/

// Conteneur HTML des item
let itemContainer = document.getElementById("items");

/*****************
***  VAR END   ***
*****************/

/*****************
**  FUNCTION   ***
*****************/

/************
Nom : displayItem
Parametres : item
Utilité : Ajoute l'élément entré en parametre dans le HTML.
return : 
*************/
function displayItem(item){
    itemContainer.innerHTML += `
    <a href="./product.html?id=${item._id}">
        <article>
            <img src="${item.imageUrl}" alt="${item.altTxt}">
            <h3 class="productName">${item.name}</h3>
            <p class="productDescription">${item.description}</p>
        </article>
    </a>
    `;
}

/*********************
***  FUNCTION END  ***
**********************/

fetch("http://localhost:3000/api/products")
    .then((response) => response.json())
    .then(function(products){
        for(let product of products){
            displayItem(product);
        }
    })    
    .catch(function(error){
        alert("Pas de kanap !")
    });