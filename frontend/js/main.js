const API_URL = "http://localhost:5000/api/products";


// OPEN CATEGORY

function openCategory(category){

    localStorage.setItem("selectedCategory", category);

    window.location.href = "products.html";
}


// FETCH PRODUCTS

async function fetchProducts(){

    const response = await fetch(API_URL);

    const products = await response.json();

    const container = document.getElementById("productContainer");

    if(!container) return;

    const selectedCategory = localStorage.getItem("selectedCategory");

    let filteredProducts = products;

    if(selectedCategory){

        filteredProducts = products.filter(
            product => product.category === selectedCategory
        );
    }

    container.innerHTML = "";

    filteredProducts.forEach(product => {

        container.innerHTML += `

        <div class="product-card">

            <img src="${product.image}" alt="">

            <h3>${product.name}</h3>

            <p>₹${product.price}</p>

            <p>⭐ ${product.rating}</p>

            <button onclick='addToCart(${JSON.stringify(product)})'>
                Add To Cart
            </button>

        </div>

        `;
    });
}


fetchProducts();


// ADD TO CART

function addToCart(product){

    let cart = JSON.parse(localStorage.getItem("cart")) || [];

    cart.push(product);

    localStorage.setItem("cart", JSON.stringify(cart));

    alert("Product Added To Cart");
}
// DARK MODE

const darkBtn = document.getElementById("darkModeBtn");

if(localStorage.getItem("darkMode") === "enabled"){
    document.body.classList.add("dark-mode");
}

if(darkBtn){

    darkBtn.addEventListener("click", () => {

        document.body.classList.toggle("dark-mode");

        if(document.body.classList.contains("dark-mode")){

            localStorage.setItem("darkMode", "enabled");

        } else {

            localStorage.removeItem("darkMode");
        }
    });
}