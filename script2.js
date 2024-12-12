// Initialize the cart array from localStorage or set as an empty array
let addarray = JSON.parse(localStorage.getItem("cartItems")) || [];

let cartButn = document.querySelector("#cart_icon");

let close = document.querySelector(".cross");

let extDisplay = document.querySelector(".extDisplay");

// Quantity limits for items
const ITEM_QUANTITY_LIMIT = {
    "Burger": 5,
    "Cooked Chicken": 5,
    "Rice and Dal": 5,
    "Ashirvaad Rice Pack": 5,
    "Rice Papad Pack": 5
};

// Function to fetch product data and set up event listeners
async function coco() {
    try {
        let response = await fetch("productJson.json");
        if (!response.ok) {
            throw new Error("Not fetched properly");
        }
        let data = await response.json();
        console.log(data);

        // Redirect when an image is clicked
        document.querySelectorAll("img").forEach((img) => {
            img.addEventListener("click", () => {
                let result = data.find((element) => element.name === img.id);
                if (result) {
                    localStorage.setItem("selectedProduct", JSON.stringify(result));
                    window.location.href = "product.html";
                }
            });
        });

        // Redirect when a button is clicked
        document.querySelectorAll("button").forEach((button) => {
            button.addEventListener("click", () => {
                let result = data.find((element) => element.name === button.id);
                if (result) {
                    localStorage.setItem("selectedProduct", JSON.stringify(result));
                    window.location.href = "product.html";
                }
            });
        });

        // "Add to Cart" button functionality
        let addToCartBtn = document.querySelector(".addToCart_product_visible");
        console.log(document.querySelector(".addToCart_product_visible"));  
        addToCartBtn.addEventListener("click", () => {
            let result = data.find((element) => element.name === addToCartBtn.id);
            if (result) {
                addProductToCart(result);
                updateCartDisplay();
                setTimeout(() => alert("Product added successfully!"), 100);
            }
        });


        document.addEventListener("DOMContentLoaded", () => {
            let addToCartBtn = document.querySelector(".addToCart_product_visible");
            if (addToCartBtn) {
                addToCartBtn.addEventListener("click", () => {
                    let result = data.find((element) => element.name === addToCartBtn.id);
                    if (result) {
                        addProductToCart(result);
                        updateCartDisplay();
                        setTimeout(() => alert("Product added successfully!"), 100);
                    }
                });
            } else {
                console.error("Add to Cart button not found!");
            }
        });
        
        // Initial cart display update on page load
        updateCartDisplay();
    }
    catch (error) {
        console.error(error);
    }
}
coco();

// Function to add a product to the cart
function addProductToCart(product) {
    product.price = parseFloat(product.price); // Ensure price is a number

    // Check if item already exists in cart
    let existingItemIndex = addarray.findIndex(item => item.name === product.name);
    let limit = ITEM_QUANTITY_LIMIT[product.name] || Infinity;

    if (existingItemIndex >= 0) {
        let currentQuantity = addarray[existingItemIndex].quantity;
        if (currentQuantity < limit) {
            addarray[existingItemIndex].quantity += 1;
        } else {
            alert(`You can only add up to ${limit} of ${product.name}.`);
        }
    } else {
        
        product.quantity = 1; // Initialize quantity
        addarray.unshift(product);
    }

    localStorage.setItem("cartItems", JSON.stringify(addarray));
}

// Function to update the cart display
function updateCartDisplay() {
    let productList = document.querySelector(".productList");
    let totalElement = document.querySelector(".total");
    let itemCount = addarray.length;

    let totalPrice = addarray.reduce((sum, item) => {
        let price = parseFloat(item.price);
        
        return isNaN(price) ? sum : sum + (price * item.quantity);
    }, 0);

    // Update product list display
    productList.innerHTML = addarray.map((item, index) => `
        <li data-index="${index}">
            <div>
                <p><strong>Name:</strong> ${item.name}</p>
                <p><strong>Price:</strong> ${item.price} Rs</p>
            </div>
            <div class="item_exButtons">
                <button class="minus" data-index="${index}">-</button>
                <div>${item.quantity}</div>
                <button class="plus" data-index="${index}">+</button>
            </div>
            <div class="line_define"></div>
        </li>
    `).join('');

    // Update total price and item count
    totalElement.innerHTML = `<small>Subtotal (${itemCount} items)</small> ${totalPrice} Rs`;
    document.querySelector(".number_add").textContent = `${itemCount}`;

    // Clear existing event listeners before re-adding
    document.querySelectorAll(".plus").forEach(button => {
        button.addEventListener("click", (event) => {
            let index = event.target.getAttribute("data-index");
            let item = addarray[index];
            let limit = ITEM_QUANTITY_LIMIT[item.name] || Infinity;

            if (item.quantity < limit) {
                item.quantity += 1;
                localStorage.setItem("cartItems", JSON.stringify(addarray));
                updateCartDisplay();
            } else {
                alert(`You can only add up to ${limit} of ${item.name}.`);
            }
        });
    });

    document.querySelectorAll(".minus").forEach(button => {
        button.addEventListener("click", (event) => {
            let index = event.target.getAttribute("data-index");
            let item = addarray[index];

            if (item.quantity > 1) {
                item.quantity -= 1;
            } else {
                addarray.splice(index, 1); // Remove item if quantity is 0
            }
            localStorage.setItem("cartItems", JSON.stringify(addarray));
            updateCartDisplay();
        });
    });

    // Remove items with zero quantity
    addarray = addarray.filter(item => item.quantity > 0);
    localStorage.setItem("cartItems", JSON.stringify(addarray));
}
// Ensure cart updates on page load
document.addEventListener("DOMContentLoaded", () => {
    updateCartDisplay();
});

// Cart should open and display items on any page
cartButn.addEventListener("click", () => {
    extDisplay.style.display = (extDisplay.style.display === "block") ? "none" : "block";
    updateCartDisplay(); // Ensure cart updates properly when opened
});
// Close cart when cross button is clicked
close.addEventListener("click", () => {
    extDisplay.style.display = "none";
});



// sign up and log in page
let sign = document.querySelector("#signUp_page");

let register_container = document.querySelector(".register_container");
let Login_container = document.querySelector(".Login_container");

let register_register =document.querySelector("#register_register")

sign.addEventListener("click",()=>{
    // console.log("clicked");

    register_container.style.display ="block";
    if(Login_container.style.display==="block"){
        register_container.style.display ="none";
    }
    register_register.addEventListener("click",()=>{
        Login_container.style.display="block";
        register_container.style.display ="none";
    })
    let login_login = document.querySelector("#login_login");
    login_login.addEventListener("click",()=>{
        register_container.style.display ="block";
        Login_container.style.display="none";
    })
})


function reg_cross(){
    let reg_cross =document.querySelector(".reg_cross")
    reg_cross.addEventListener("click",()=>{
        register_container.style.display ="none";
        Login_container.style.display="none";
    })
}
let log_cross = document.querySelector(".log_cross");
log_cross.addEventListener("click",()=>{
    console.log("clicked");
    Login_container.style.display="none"
    
});