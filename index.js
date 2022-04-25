//store header UL
const storeItemsUL = document.querySelector(".store--item-list");

for (let i = 0; i < state.items.length; i++) {
  const storeItemLI = document.createElement("li");

  const storeItemDIV = document.createElement("div");
  storeItemDIV.setAttribute("class", "store--item-icon");

  const storeItemIMG = document.createElement("img");

  const storeItemBUTTON = document.createElement("button");
  storeItemBUTTON.innerText = "ADD TO CART";

  const veg = state.items[i];
  storeItemIMG.src = `assets/icons/${veg.id}.svg`;
  storeItemDIV.append(storeItemIMG);

  storeItemBUTTON.addEventListener("click", () => {
    addItemToCart(veg);
    renderCart();
  });

  storeItemLI.append(storeItemDIV, storeItemBUTTON);
  storeItemsUL.append(storeItemLI);
}

//cart UL
function renderCart() {
  const cartItemsUL = document.querySelector(".cart--item-list");

  cartItemsUL.innerHTML = "";

  for (let i = 0; i < state.cart.length; i++) {
    const cartItemLI = document.createElement("li");

    const cartItemIMG = document.createElement("img");
    cartItemIMG.setAttribute("class", "cart--item-icon");

    const cartItemP = document.createElement("p");

    const cartItemRemoveBUTTON = document.createElement("button");
    cartItemRemoveBUTTON.innerText = "-";
    cartItemRemoveBUTTON.setAttribute(
      "class",
      "quantity-btn remove-btn center"
    );

    const cartItemSPAN = document.createElement("span");
    cartItemSPAN.setAttribute("class", "quantity-text center");

    const cartItemAddBUTTON = document.createElement("button");
    cartItemAddBUTTON.innerText = "+";
    cartItemAddBUTTON.setAttribute("class", "quantity-btn add-btn center");

    const vegInCart = state.cart[i];

    cartItemIMG.src = `assets/icons/${vegInCart.id}.svg`;

    cartItemP.innerText = vegInCart.name;

    cartItemRemoveBUTTON.addEventListener("click", () => {
      removeItemFromCart(vegInCart);
      renderCart();
    });

    cartItemAddBUTTON.addEventListener("click", () => {
      addItemToCart(vegInCart);
      renderCart();
    });

    cartItemSPAN.innerText = vegInCart.quantity;

    cartItemLI.append(
      cartItemIMG,
      cartItemP,
      cartItemRemoveBUTTON,
      cartItemSPAN,
      cartItemAddBUTTON
    );

    cartItemsUL.append(cartItemLI);
  }

  totalPrice(cart);
}

function addItemToCart(veg) {
  if (state.cart.includes(veg)) {
    veg.quantity++;
  } else state.cart.push(veg);
}

function removeItemFromCart(veg) {
  if (veg.quantity === 1) {
    const index = state.cart.indexOf(veg);
    state.cart.splice(index, 1);
  } else veg.quantity--;
}

function totalPrice() {
  const totalPrice = document.querySelector(".total-number");
  let sum = 0;
  for (let i = 0; i < state.cart.length; i++) {
    const veg = state.cart[i];
    const itemsInCart = veg.quantity * veg.price;
    sum += itemsInCart;
  }
  totalPrice.innerText = "£ " + sum.toFixed(2);
}
