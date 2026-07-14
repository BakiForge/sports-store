import { products } from './products.js';
import { calculateMoney } from './money.js';

export let cart = JSON.parse(localStorage.getItem('cart')) || [];

export function saveToStorage () {
  localStorage.setItem('cart', JSON.stringify(cart));
}

export function addToCart (productId, quantity) {
  let matchingItem;

  cart.forEach((cartItem)=>{
   if(productId === cartItem.productId) {
     matchingItem = cartItem;
   }
  });

  if(matchingItem) {
    matchingItem.quantity += quantity;
  } else {
    cart.push({
      productId: productId,
      quantity: quantity
    });
  }
  saveToStorage();
  updateCartQuantity();
}

export function updateCartQuantity () {
  let cartQuantity = 0;
  cart.forEach((cartItem)=>{
    cartQuantity += cartItem.quantity;
  });
  let cartCount = document.querySelector('.js-cart-count');
  if(cartCount) {
    cartCount.innerHTML = cartQuantity;
  }
  let itemsCount = document.querySelector('.js-items-count');
  if(itemsCount) {
    itemsCount.innerHTML = `Items (${cartQuantity})`;
  }
}

export function removeFromCart (productId) {
  const newCart = cart.filter((cartItem)=>{
    return cartItem.productId !== productId;
  });

  cart.length = 0;
  cart.push(...newCart);

  saveToStorage();
}

export function increaseQuantity (productId) {
  let matchingItem;

  cart.forEach((cartItem)=>{
    if(productId === cartItem.productId) {
      matchingItem = cartItem;
    }
  });

  if(matchingItem) {
    matchingItem.quantity++;
  }

  saveToStorage();
}

export function decreaseQuantity (productId) {
  let matchingItem;

  cart.forEach((cartItem)=>{
    if(productId === cartItem.productId) {
      matchingItem = cartItem;
    }
  });

  if(matchingItem) {
    matchingItem.quantity--;
  }

  if(matchingItem.quantity === 0) {
    removeFromCart(productId);
  }

  saveToStorage();
}

export function calculateTotal () {
  let subTotal = 0;
  let total = 0;
  let shippingCents = 300; // Variable for setting shipping price

  cart.forEach((cartItem)=>{
    products.forEach((product)=>{
      if(product.id === cartItem.productId) {
        subTotal += product.priceCents * cartItem.quantity;
      }
    });
  });

  total += subTotal + shippingCents;

  let shippingHTML = document.querySelector('.js-shipping');
  if(shippingHTML) {
    shippingHTML.innerHTML = `$${calculateMoney(shippingCents)}`;
  }

  let subtotalHTML = document.querySelector('.js-subtotal');
    if(subtotalHTML) {
      subtotalHTML.innerHTML = `$${calculateMoney(subTotal)}`;
    }

    let totalHTML = document.querySelector('.js-total');
    if(totalHTML) {
      totalHTML.innerHTML = `$${calculateMoney(total)}`;
    }
    saveToStorage();
 return total;
}