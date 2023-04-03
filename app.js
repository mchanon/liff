const desiredUserId = "xxx";
const currentUserId = "xxx"; // Replace this with the actual user ID from your system

const cart = [
    { product: "Product A", price: 10.00, quantity: 1 },
    { product: "Product B", price: 20.00, quantity: 1 },
    { product: "Product C", price: 30.00, quantity: 1 }
];

function showCheckoutForm() {
    if (currentUserId === desiredUserId) {
        document.getElementById("checkoutForm").style.display = "block";
        displayCartItems();
    }
}

function displayCartItems() {
    const cartItems = document.getElementById("cartItems");
    const totalPrice = document.getElementById("totalPrice");

    let total = 0;

    cart.forEach((item, index) => {
        const row = document.createElement("tr");
        const productCell = document.createElement("td");
        const priceCell = document.createElement("td");
        const quantityCell = document.createElement("td");
        const subtotalCell = document.createElement("td");

        productCell.textContent = item.product;
        priceCell.textContent = "$" + item.price.toFixed(2);

        // Quantity input and buttons
        const decreaseButton = document.createElement("button");
        decreaseButton.textContent = "-";
        decreaseButton.onclick = () => updateQuantity(index, -1);

        const increaseButton = document.createElement("button");
        increaseButton.textContent = "+";
        increaseButton.onclick = () => updateQuantity(index, 1);

        const quantityInput = document.createElement("input");
        quantityInput.type = "number";
        quantityInput.value = item.quantity;
        quantityInput.min = "1";
        quantityInput.onchange = (event) => {
            const newQuantity = parseInt(event.target.value);
            updateQuantity(index, newQuantity - item.quantity);
        };

        quantityCell.appendChild(decreaseButton);
        quantityCell.appendChild(quantityInput);
        quantityCell.appendChild(increaseButton);

        // Calculate subtotal and update the total
        const subtotal = item.price * item.quantity;
        subtotalCell.textContent = "$" + subtotal.toFixed(2);
        total += subtotal;

        row.appendChild(productCell);
        row.appendChild(priceCell);
        row.appendChild(quantityCell);
        row.appendChild(subtotalCell);
        cartItems.appendChild(row);
    });

    totalPrice.textContent = total.toFixed(2);
}

function updateQuantity(index, delta) {
    const item = cart[index];
    const newQuantity = item.quantity + delta;

    if (newQuantity >= 1) {
        item.quantity = newQuantity;
        displayCartItems();
    }
}
