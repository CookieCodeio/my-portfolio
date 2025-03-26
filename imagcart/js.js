// Function to add product to the cart
function addToCart(productName, productPrice, productImage) {
    console.log("Adding to cart:", productName);  // Debugging line

    // Retrieve cart items from localStorage, or initialize an empty array if none exist
    let cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];

    // Check if the item already exists in the cart
    const existingItemIndex = cartItems.findIndex(item => item.name === productName);

    // If item exists, increase its quantity, else add the new item to the cart
    if (existingItemIndex !== -1) {
        cartItems[existingItemIndex].quantity += 1;
    } else {
        cartItems.push({
            name: productName,
            price: productPrice,
            image: productImage,
            quantity: 1
        });
    }

    // Store the updated cart items back into localStorage
    localStorage.setItem('cartItems', JSON.stringify(cartItems));

    // Alert the user that the item has been added
    alert(`${productName} has been added to your cart`);
}

// Function to display cart items on the cart page
function displayCartItems() {
    // Retrieve cart items from localStorage
    let cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];

    // Get references to HTML elements
    let cartItemsContainer = document.getElementById('cart-items');
    let subtotalElement = document.getElementById('subtotal');
    let totalElement = document.getElementById('total');

    // Ensure cartItemsContainer exists before trying to set innerHTML
    if (!cartItemsContainer) {
        console.error("Element with ID 'cart-items' not found.");
        return;
    }

    // Clear the cart items container
    cartItemsContainer.innerHTML = '';
    let subtotal = 0;

    // If cart is empty, display a message
    if (cartItems.length === 0) {
        cartItemsContainer.innerHTML = '<p class="text-center">Your cart is empty</p>';
    } else {
        // Loop through each item in the cart
        cartItems.forEach((item, index) => {
            // Create a cart item card
            let cartItem = `
                <div class=" mt-8 card bg-dark text-white mb-3">
                    <div class="row no-gutters">
                        <div class="col-md-4">
                            <img src="${item.image}" class="card-img" alt="${item.name}">
                        </div>
                        <div class="col-md-4">
                            <div class="card-body1">
                            <br>
                                <h5 class="card-title login">${item.name}</h5>
                                <p class="card-text">Quantity: ${item.quantity}</p>
                                <p class="card-text">Price: ₹${item.price}</p>
                                <button class="btn btn-pop btn-sm cartcol" onclick="removeFromCart(${index})">Remove</button>
                            </div>
                        </div>
                    </div>
                </div>
            `;

            // Append the cart item to the container
            cartItemsContainer.innerHTML += cartItem;

            // Calculate the subtotal
            subtotal += item.price * item.quantity;
        });

        // Update the subtotal and total elements
        if (subtotalElement) {
            subtotalElement.textContent = `${subtotal}`;
        } else {
            console.error("Element with ID 'subtotal' not found.");
        }

        if (totalElement) {
            totalElement.textContent = `${subtotal + 5}`;  // Assuming shipping is ₹5
        } else {
            console.error("Element with ID 'total' not found.");
        }
    }
}

// Function to remove an item from the cart
function removeFromCart(index) {
    // Retrieve cart items from localStorage
    let cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];

    // Remove the item at the specified index
    cartItems.splice(index, 1);

    // Store the updated cart items back into localStorage
    localStorage.setItem('cartItems', JSON.stringify(cartItems));

    // Refresh the cart display
    displayCartItems();

    // Alert the user that the item has been removed
    alert('Item has been removed from your cart');
}
// Remove all
function removeAll() {

    localStorage.removeItem('cartItems');

    // Refresh the cart display
    displayCartItems();

    // Alert the user that the cart has been cleared
    alert('Your cart has been cleared');
}
// Call the function to display cart items when the page loads
document.addEventListener("DOMContentLoaded", function() {
    if (window.location.pathname.includes('cart.html')) {
        displayCartItems();
    }
});
