/** @format */

const products = [
  { id: 1, name: "Product A", price: 10.0, available: 20, rating: 4.5 },
  { id: 2, name: "Product B", price: 20.0, available: 15, rating: 4.0 },
  { id: 3, name: "Product C", price: 15.0, available: 10, rating: 4.7 },
];

let cart = [];

// Display Products
const productList = document.getElementById("product-list");
products.forEach((product) => {
  const productCard = document.createElement("div");
  productCard.className = "product-card";
  productCard.innerHTML = `
    <h3>${product.name}</h3>
    <p>Price: $${product.price.toFixed(2)}</p>
    <p>Available: ${product.available}</p>
    <p>Rating: ${product.rating} ⭐</p>
    <button onclick="addToCart(${product.id})">Add to Cart</button>
  `;
  productList.appendChild(productCard);
});

// Add to Cart
function addToCart(productId) {
  const product = products.find((p) => p.id === productId);
  const cartItem = cart.find((item) => item.id === productId);

  if (cartItem) {
    cartItem.quantity++;
  } else {
    cart.push({ ...product, quantity: 1 });
  }

  updateCart();
}

// Update Cart
function updateCart() {
  const cartItemsContainer = document.getElementById("cart-items");
  const totalPriceElement = document.getElementById("total-price");
  const emptyCartMessage = document.getElementById("empty-cart-message");

  cartItemsContainer.innerHTML = "";
  let totalPrice = 0;

  if (cart.length === 0) {
    emptyCartMessage.style.display = "block";
  } else {
    emptyCartMessage.style.display = "none";
  }

  cart.forEach((item) => {
    const cartItem = document.createElement("div");
    cartItem.className = "cart-item";
    cartItem.innerHTML = `
      <span>${item.name} x${item.quantity}</span>
      <span>
        <button onclick="removeFromCart(${item.id})">Remove</button>
      </span>
    `;
    cartItemsContainer.appendChild(cartItem);

    totalPrice += item.price * item.quantity;
  });

  totalPriceElement.innerText = totalPrice.toFixed(2);
}

// Remove from Cart
function removeFromCart(productId) {
  cart = cart.filter((item) => item.id !== productId);
  updateCart();
}

// Place Order
document.getElementById("order-btn").addEventListener("click", () => {
  alert("Order placed successfully!");
  cart = [];
  updateCart();
});
