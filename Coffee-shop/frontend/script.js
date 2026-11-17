let cart = [];

const cartButton = document.querySelector(".cart-btn");
const cartPanel = document.getElementById("cart-panel");
const cartOverlay = document.getElementById("cart-overlay");
const closeCartButton = document.getElementById("close-cart");

const cartCountDisplay = document.getElementById("cart-count");
const cartItemsContainer = document.getElementById("cart-items");
const cartTotalDisplay = document.getElementById("cart-total");

const addToCartButtons = document.querySelectorAll(".add-cart");


// Add product to cart
addToCartButtons.forEach(button => {

    button.addEventListener("click", () => {

        const card = button.closest(".menu-card");

        const productName = card.querySelector("h3").textContent.trim();

        const productPriceText =
            card.querySelector(".menu-bottom span").textContent;

        const productPrice = Number(
            productPriceText
                .replace("₦", "")
                .replace(",", "")
                .trim()
        );


        const existingProduct = cart.find(
            item => item.name === productName
        );


        if (existingProduct) {

            existingProduct.quantity++;

        } else {

            cart.push({
                name: productName,
                price: productPrice,
                quantity: 1
            });

        }


        updateCart();


        button.textContent = "Added ✓";


        setTimeout(() => {

            button.textContent = "Add to Cart";

        }, 1000);

    });

});


// Open cart
cartButton.addEventListener("click", () => {

    cartPanel.classList.add("active");

    cartOverlay.classList.add("active");

});


// Close cart
closeCartButton.addEventListener("click", closeCart);

cartOverlay.addEventListener("click", closeCart);


function closeCart() {

    cartPanel.classList.remove("active");

    cartOverlay.classList.remove("active");

}


// Update cart
function updateCart() {

    cartItemsContainer.innerHTML = "";


    if (cart.length === 0) {

        cartItemsContainer.innerHTML = `
            <p class="empty-cart">
                Your cart is empty.
            </p>
        `;


        cartCountDisplay.textContent = "0";

        cartTotalDisplay.textContent = "₦0";


        // Save empty cart
        localStorage.setItem(
            "brewHavenCart",
            JSON.stringify(cart)
        );


        return;
    }


    let total = 0;

    let totalItems = 0;


    cart.forEach((item, index) => {

        const itemTotal =
            item.price * item.quantity;


        total += itemTotal;

        totalItems += item.quantity;


        const cartItem =
            document.createElement("div");


        cartItem.classList.add("cart-item");


        cartItem.innerHTML = `

            <div class="cart-item-info">

                <h3>
                    ${item.name}
                </h3>

                <p>
                    ₦${item.price.toLocaleString()}
                </p>

            </div>


            <div class="cart-item-controls">

                <button class="quantity-btn decrease">
                    −
                </button>


                <span>
                    ${item.quantity}
                </span>


                <button class="quantity-btn increase">
                    +
                </button>


                <button class="remove-item">
                    Remove
                </button>

            </div>

        `;


        // Decrease quantity
        cartItem
            .querySelector(".decrease")
            .addEventListener("click", () => {

                if (item.quantity > 1) {

                    item.quantity--;

                } else {

                    cart.splice(index, 1);

                }


                updateCart();

            });


        // Increase quantity
        cartItem
            .querySelector(".increase")
            .addEventListener("click", () => {

                item.quantity++;


                updateCart();

            });


        // Remove item
        cartItem
            .querySelector(".remove-item")
            .addEventListener("click", () => {

                cart.splice(index, 1);


                updateCart();

            });


        cartItemsContainer.appendChild(cartItem);

    });


    cartCountDisplay.textContent =
        totalItems;


    cartTotalDisplay.textContent =
        `₦${total.toLocaleString()}`;


    // Save cart for checkout page
    localStorage.setItem(
        "brewHavenCart",
        JSON.stringify(cart)
    );

}


// Proceed to checkout
const checkoutButton =
    document.getElementById("checkout-btn");


if (checkoutButton) {

    checkoutButton.addEventListener("click", () => {

        if (cart.length === 0) {

            alert(
                "Your cart is empty. Please add an item first."
            );

            return;

        }


        window.location.href =
            "checkout.html";

    });

}