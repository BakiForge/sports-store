import { cart } from "../data/cart.js";
import { products } from "../data/products.js";
import { calculateMoney } from '../data/money.js';

export function displayCartHTML () {
  let cartHTML = '';

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
                        <button class="qty-btn">-</button>
                        <span class="qty">${cartItem.quantity}</span>
                        <button class="qty-btn">+</button>
                      </div>

                      <button class="remove-btn">Remove</button>
                    </div>
             </div>
               `;
  });

  document.querySelector('.js-cart-items').innerHTML = cartHTML;
}