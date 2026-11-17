const checkoutItemsContainer =
    document.getElementById("checkout-items");

const checkoutTotalDisplay =
    document.getElementById("checkout-total");

const checkoutForm =
    document.getElementById("checkout-form");


// Get cart from localStorage
let cart =
    JSON.parse(localStorage.getItem("brewHavenCart")) || [];


// Display checkout items
function displayCheckoutItems() {

    checkoutItemsContainer.innerHTML = "";


    // If cart is empty
    if (cart.length === 0) {

        checkoutItemsContainer.innerHTML = `
            <p>
                Your cart is empty.
            </p>
        `;

        checkoutTotalDisplay.textContent = "₦0";

        return;
    }


    let total = 0;


    cart.forEach(item => {

        const itemTotal =
            item.price * item.quantity;

        total += itemTotal;


        const checkoutItem =
            document.createElement("div");

        checkoutItem.classList.add("checkout-item");


        checkoutItem.innerHTML = `

            <div>

                <h3>
                    ${item.name}
                </h3>

                <p>
                    ₦${item.price.toLocaleString()}
                    ×
                    ${item.quantity}
                </p>

            </div>


            <strong>
                ₦${itemTotal.toLocaleString()}
            </strong>

        `;


        checkoutItemsContainer.appendChild(
            checkoutItem
        );

    });


    checkoutTotalDisplay.textContent =
        `₦${total.toLocaleString()}`;

}


// Place order
checkoutForm.addEventListener("submit", function(event) {

    event.preventDefault();


    // Get customer information
    const fullName =
        document.getElementById("full-name").value.trim();

    const phone =
        document.getElementById("phone").value.trim();

    const email =
        document.getElementById("email").value.trim();

    const address =
        document.getElementById("address").value.trim();


    if (
        !fullName ||
        !phone ||
        !email ||
        !address
    ) {

        alert(
            "Please fill in all the required fields."
        );

        return;
    }


    // Calculate total
    let total = 0;

    cart.forEach(item => {

        total +=
            item.price * item.quantity;

    });


    // Show confirmation
    alert(
        `Thank you, ${fullName}!\n\n` +
        `Your order has been placed successfully.\n\n` +
        `Total: ₦${total.toLocaleString()}`
    );


    // Clear cart
    localStorage.removeItem("brewHavenCart");


    // Redirect back to homepage
    window.location.href = "index.html";

});


// Load checkout items
displayCheckoutItems();