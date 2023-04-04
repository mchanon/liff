const desiredUserId = "xxx";
const currentUserId = "xxx"; // Replace this with the actual user ID from your system

const cart = [
    { product: "Product A", price: 10.00, quantity: 1, type: "Type 1" },
    { product: "Product B", price: 20.00, quantity: 1, type: "Type 1" },
    { product: "Product C", price: 30.00, quantity: 1, type: "Type 2" },
    { product: "Product D", price: 40.00, quantity: 1, type: "Type 2" }
];

function groupBy(arr, property) {
    return arr.reduce((memo, item) => {
        const key = item[property];
        memo[key] = memo[key] || [];
        memo[key].push(item);
        return memo;
    }, {});
}

function showCheckoutForm() {
    if (currentUserId === desiredUserId) {
        document.getElementById("checkoutForm").style.display = "block";
        displayCartItems();
    }
}

function displayCartItems() {
    const productAccordion = document.getElementById("productAccordion");
    const totalPrice = document.getElementById("totalPrice");
    const groupedProducts = groupBy(cart, "type");

    // Clear existing accordion items before appending new ones
    productAccordion.innerHTML = '';

    let total = 0;
    let accordionIndex = 0;

    for (const type in groupedProducts) {
        const products = groupedProducts[type];
        const accordionItemId = `accordion${accordionIndex}`;
        const collapseItemId = `collapse${accordionIndex}`;

        const accordionItem = document.createElement("div");
        accordionItem.classList.add("accordion-item");

        const accordionHeader = document.createElement("h2");
        accordionHeader.classList.add("accordion-header");
        accordionHeader.id = accordionItemId;

        const accordionButton = document.createElement("button");
        accordionButton.classList.add("accordion-button", "collapsed");
        accordionButton.setAttribute("type", "button");
        accordionButton.setAttribute("data-bs-toggle", "collapse");
        accordionButton.setAttribute("data-bs-target", `#${collapseItemId}`);
        accordionButton.setAttribute("aria-expanded", "false");
        accordionButton.setAttribute("aria-controls", collapseItemId);
        accordionButton.textContent = type;

        accordionHeader.appendChild(accordionButton);

        const accordionCollapse = document.createElement("div");
        accordionCollapse.classList.add("accordion-collapse", "collapse");
        accordionCollapse.id = collapseItemId;
        accordionCollapse.setAttribute("aria-labelledby", accordionItemId);
        accordionCollapse.setAttribute("data-bs-parent", "#productAccordion");

        const accordionBody = document.createElement("div");
        accordionBody.classList.add("accordion-body");

        const productList = document.createElement("ul");

        products.forEach((item, index) => {
            const listItem = document.createElement("li");

            listItem.textContent = `${item.product} - Price: $${item.price.toFixed(2)} - Quantity: ${item.quantity}`;

            const decreaseButton = document.createElement("button");
            decreaseButton.textContent = "-";
            decreaseButton.onclick = () => updateQuantity(item, -1);

            const increaseButton = document.createElement("button");
            increaseButton.textContent = "+";
            increaseButton.onclick = () => updateQuantity(item, 1);

            listItem.appendChild(decreaseButton);
            listItem.appendChild(increaseButton);

            productList.appendChild(listItem);

            total += item.price * item.quantity;
        });

        accordionBody.appendChild(productList);
        accordionCollapse.appendChild(accordionBody);
        accordionItem.appendChild(accordionHeader);
        accordionItem.appendChild(accordionCollapse);
        productAccordion.appendChild(accordionItem);

        accordionIndex++;
    }

    totalPrice.textContent = total.toFixed(2);
}

function updateQuantity(item, delta) {
    const newQuantity = item.quantity + delta;

    if (newQuantity >= 1) {
        item.quantity = newQuantity;
        displayCartItems();
    }
}