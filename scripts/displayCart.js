import { cart, saveToStorage, removeFromCart, decreaseQuantity, increaseQuantity } from "../data/cart.js";
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
     }

     if(button.classList.contains('js-decrease-quantity')) {
       decreaseQuantity(productId);
       displayCartHTML();
     }

     if(button.classList.contains('js-increase-quantity')) {
       increaseQuantity(productId);
       displayCartHTML();
     }
   });
}