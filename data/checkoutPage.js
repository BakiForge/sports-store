import { calculateTotal, cart } from './cart.js';
import { products} from "./products.js";
import {calculateMoney} from "./money.js";

export function showTotal () {
    let checkoutTotalHTML = '<h2>Order Summary</h2>\n' +
        '\n' +
        '        <div class="order-items">\n' +
        '        </div>';

    cart.forEach((cartItem)=>{
        let matchingProduct = '';
        products.forEach((product)=>{
            if(cartItem.productId === product.id) {
                matchingProduct = product;
            }
        });
        checkoutTotalHTML += `
               
                        <div class="order-item">
                          <div class="order-item-image">
                            <img src="${matchingProduct.image}" alt="Football">
                          </div>
                        
                          <div class="order-item-details">
                            <h3 class="order-item-name">
                              ${matchingProduct.name}
                            </h3>
                        
                            <p class="order-item-price">
                              $${calculateMoney(matchingProduct.priceCents)}
                            </p>
                        
                            <div class="order-item-quantity">
                              Quantity: <span>${cartItem.quantity}</span>
                            </div>
                          </div>
                    </div>          
    `;
    });
            checkoutTotalHTML += `
            <div class="summary">
        
                <div class="summary-row">
                    <span>Subtotal</span>
                    <span class="js-subtotal">$0.00</span>
                </div>
        
                <div class="summary-row">
                    <span>Shipping</span>
                    <span class="js-shipping">$5.00</span>
                </div>
        
                <div class="summary-row total">
                    <span>Total</span>
                    <span class="js-total">$0.00</span>
                </div>
        
            </div>
        
            <button class="place-order-btn js-place-order-btn">
                Place Order
            </button>
        
            <p class="order-message js-order-message"></p>
        
        </div>
        
        </div>
        `;


    document.querySelector('.js-checkout-right').innerHTML = checkoutTotalHTML;
    calculateTotal();


        const placeOrderBtn = document.querySelector('.js-place-order-btn');
        const orderMessage = document.querySelector('.js-order-message');

        let timeoutId;

        placeOrderBtn.addEventListener('click', () => {

            orderMessage.style.display = 'block';
            orderMessage.innerText = '✓ Thanks, your order has succesfully been sent!';
            if(timeoutId) {
                clearTimeout(timeoutId);
            }
                timeoutId = setTimeout(()=>{
                    orderMessage.style.display = 'none';
                }, 2500);
    });
}

