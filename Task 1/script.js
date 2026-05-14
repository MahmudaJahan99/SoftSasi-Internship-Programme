const unitPrice = parseFloat(document.getElementById("unitPrice").innerText);
const plusBtn = document.getElementById("plusBtn");
const minusBtn = document.getElementById("minusBtn");
const quantityText = document.getElementById("quantity");
const totalPrice = document.getElementById("totalPrice");
const stockText = document.getElementById("stockText");
const wishlistBtn = document.getElementById("wishlistBtn");
const cartBtn = document.getElementById("cartBtn");
const outOfStock = document.getElementById("outOfStock");

// Constants and State Variables
const totalStock = 8;
let quantity = 0;
let wishlist = false;

// Function to update the UI based on the current state
function updateUI() {
  quantityText.innerText = quantity;

  totalPrice.innerText = quantity * unitPrice;

  const remainingStock = totalStock - quantity;

  stockText.innerText = `Stock: ${remainingStock} Left`;

  // Prevent quantity below 0
  minusBtn.disabled = quantity <= 0;

  // Prevent quantity exceeding stock
  plusBtn.disabled = remainingStock === 0;

  cartBtn.disabled = quantity === 0 || totalStock === 0;

  outOfStock.innerText = remainingStock === 0 ? "Out Of Stock" : "";
}

// Increase quantity
plusBtn.addEventListener("click", () => {
  if (quantity < totalStock) {
    quantity++;
    updateUI();
  }
});

// Decrease quantity
minusBtn.addEventListener("click", () => {
  if (quantity > 0) {
    quantity--;
    updateUI();
  }
});

// Wishlist toggle
wishlistBtn.addEventListener("click", () => {
  wishlist = !wishlist;

  wishlistBtn.innerText = wishlist ? "❤️ Wishlisted" : "♡ Wishlist";
});

// Add to cart
cartBtn.addEventListener("click", () => {
  Toastify({
    text: "Added Successfully ✓",
    duration: 2000,
    gravity: "top",
    position: "right",
    style: {
      background: "linear-gradient(135deg, #ff4da6, #ff85c1)",
      borderRadius: "12px",
      boxShadow: "0 8px 20px rgba(255,105,180,0.3)",
    },
  }).showToast();
});

updateUI();