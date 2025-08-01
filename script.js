
const addToCartButtons = document.querySelectorAll(".add-to-cart");
const cartItemsList = document.getElementById("cart-items");
const totalElement = document.getElementById("total");
const confirmOrderBtn = document.getElementById("confirm-order");
const modal = document.getElementById("confirmation-modal");

let cart = {};

addToCartButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const productDiv = button.parentElement;
    const name = productDiv.getAttribute("data-name");
    const price = parseFloat(productDiv.getAttribute("data-price"));

    if (cart[name]) {
      cart[name].quantity += 1;
    } else {
      cart[name] = { price: price, quantity: 1 };
    }

    updateCartUI();
  });
});

function updateCartUI() {
  cartItemsList.innerHTML = "";
  let total = 0;

  for (let item in cart) {
    const li = document.createElement("li");
    const itemTotal = (cart[item].price * cart[item].quantity).toFixed(2);
    li.textContent = `${item} x ${cart[item].quantity} - $${itemTotal}`;
    cartItemsList.appendChild(li);
    total += parseFloat(itemTotal);
  }

  totalElement.textContent = total.toFixed(2);
}

confirmOrderBtn.addEventListener("click", () => {
  if (Object.keys(cart).length === 0) {
    alert("Your cart is empty.");
    return;
  }

  modal.classList.remove("hidden");
  cart = {};
  updateCartUI();
});

function closeModal() {
  modal.classList.add("hidden");
}

