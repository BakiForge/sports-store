import { cart, saveToStorage, removeFromCart, decreaseQuantity, increaseQuantity, calculateTotal, updateCartQuantity } from "../data/cart.js";
import { products } from "../data/products.js";
import { calculateMoney } from '../data/money.js';

export function displayCartHTML () {
  let cartHTML = '';

  if(cart.length === 0) {
    document.querySelector('.js-cart-items').innerHTML = '<p class="empty-cart">Cart is empty</p>';
    return;
  }

  cart.forEach((cartItem)=>{
    let matchingProduct;
     products.forEach((product)=>{
        if(cartItem.productId === product.id) {
           matchingProduct = product;
        } 
     });
     cartHTML += `
            <div class="cart-item">
                  <div class="item-image"><img class="item-image" src="${matchingProduct.image}"></div>

                    <div class="item-info">
                      <h3 class="item-name">${matchingProduct.name}</h3>
                      <p class="item-price">$${calculateMoney(matchingProduct.priceCents)}</p>

                      <div class="quantity-controls">
                        <button class="qty-btn js-decrease-quantity" data-product-id="${matchingProduct.id}">-</button>
                        <span class="qty">${cartItem.quantity}</span>
                        <button class="qty-btn js-increase-quantity" data-product-id="${matchingProduct.id}">+</button>
                      </div>

                      <button class="remove-btn js-remove-btn" data-product-id="${matchingProduct.id}">Remove</button>
                    </div>
             </div>
               `;
  });

  document.querySelector('.js-cart-items').innerHTML = cartHTML;
}

export function displayTotalHTML () {
  let totalHTML = '';

  totalHTML += `
    <h2>Order Summary</h2>

      <div class="summary-row">
        <span class="js-items-count">Items (0)</span>
        <span class="js-subtotal">$360</span>
      </div>

      <div class="summary-row">
        <span>Shipping</span>
        <span>Free</span>
      </div>

      <div class="summary-row total">
        <span>Total</span>
        <span class="js-total">$360</span>
      </div>

      <button class="checkout-btn">
        Proceed to Checkout
      </button>

      <div class="payment-info">
        <p>We accept:</p>
        <div class="cards">
          <span>VISA</span>
          <span>MasterCard</span>
          <span>PayPal</span>
        </div>
      </div>
  `;
  document.querySelector('.js-cart-summary').innerHTML = totalHTML;
  updateCartQuantity();
  calculateTotal();
}

const cartItemContainer = document.querySelector('.js-cart-items');

if(cartItemContainer) {
   cartItemContainer.addEventListener('click',(event)=>{
     const button = event.target;
     const productId = button.dataset.productId;
     
     if(!button) {
      return;
     }

     if(button.classList.contains('js-remove-btn')) {
      removeFromCart(productId);
      displayCartHTML();
      displayTotalHTML();
     }

     if(button.classList.contains('js-decrease-quantity')) {
       decreaseQuantity(productId);
       displayCartHTML();
       displayTotalHTML();
     }

     if(button.classList.contains('js-increase-quantity')) {
       increaseQuantity(productId);
       displayCartHTML();
       displayTotalHTML();
     }
   });
}

window.addEventListener('storage', (event)=>{
  if(event.key === 'cart') {
    cart.length = 0;
    cart.push(...(JSON.parse(localStorage.getItem('cart')) || []));

    displayCartHTML();
    displayTotalHTML();
  }
});