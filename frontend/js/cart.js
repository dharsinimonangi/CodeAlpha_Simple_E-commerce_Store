const cartItems = document.getElementById("cartItems");

const totalPrice = document.getElementById("totalPrice");

let cart = JSON.parse(localStorage.getItem("cart")) || [];

let total = 0;


// DISPLAY CART

function displayCart(){

    cartItems.innerHTML = "";

    total = 0;

    cart.forEach(item => {

        total += item.price;

        cartItems.innerHTML += `

        <div class="cart-item">

            <div>

                <h3>${item.name}</h3>

                <p>₹${item.price}</p>

                <p>⭐ ${item.rating}</p>

            </div>

            <img src="${item.image}" width="100">

        </div>

        `;
    });

    totalPrice.innerText = `Total: ₹${total}`;
}


displayCart();


// PLACE ORDER

async function placeOrder(){

    try{

        const orderData = {

            products: cart,

            totalPrice: total,

            quantity: cart.length
        };

        const response = await fetch(
            "http://localhost:5000/api/orders",
            {
                method:"POST",

                headers:{
                    "Content-Type":"application/json"
                },

                body:JSON.stringify(orderData)
            }
        );

        const data = await response.json();

        alert(data.message);

        localStorage.removeItem("cart");

        // REDIRECT

        window.location.href = "success.html";

    } catch(error){

        console.log(error);

        alert("Order Failed");
    }
}