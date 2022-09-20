let itemContainer = document.getElementById("items");


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

fetch("http://localhost:3000/api/products")
    .then((response) => response.json())
    .then(function(products){
        for(let product of products){
            displayItem(product);
        }
    })    
    
    .catch(function(error){
        alert("pas de kanp !")
    });
