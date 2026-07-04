import { products } from '../data/products.js';
import { calculateMoney } from '../data/money.js';
import { addToCart } from '../data/cart.js';
 
function getStarsImage (rating) {
  const num = Number(rating);

  const rounded = Math.round(num * 2) / 2;

  return `../images/ratings/rating-${rounded * 10}.png`;
}

export function displayProductsHTML () {
  let productsHTML = '';

  products.forEach((product)=>{
    productsHTML += `
     <div class="product-card">
              <img class="product-image" src="${product.image}" alt="${product.name}">

              <div class="product-info">
                <h3 class="product-name">${product.name}</h3>

                <p class="product-desc">
                 ${product.desc}
              </p>

                <div class="product-rating">
                  <img class="stars-image" src="${getStarsImage(product.rating.stars)}"> <span>${product.rating.count}</span>
                </div>

                <p class="product-price">$${calculateMoney(product.priceCents)}</p>

                <div class="quantity-control">
                    <select class="quantity-select">
                      <option value="1">1</option>
                      <option value="2">2</option>
                      <option value="3">3</option>
                      <option value="4">4</option> 
                      <option value="5">5</option>
                      <option value="6">6</option>
                      <option value="7">7</option>
                      <option value="8">8</option>
                      <option value="9">9</option>
                      <option value="10">10</option>
                    </select>
              </div>


                <div class="product-bottom">
                  <button class="add-to-cart-btn js-add-to-cart-btn" data-product-id="${product.id}">Add to cart</button>
                </div>
              </div>
            </div>
    `;
  });

  document.querySelector('.js-products-grid').innerHTML = productsHTML;
}

export function attachAddToCartListeners () {
  const addToCartButtons = document.querySelectorAll('.js-add-to-cart-btn');
    addToCartButtons.forEach((button)=>{
    button.addEventListener('click',()=>{
      const productId = button.dataset.productId;
      addToCart(productId);
   });
 });
}
