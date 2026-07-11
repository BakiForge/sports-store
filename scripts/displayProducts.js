import { products } from '../data/products.js';
import { calculateMoney } from '../data/money.js';
import { addToCart } from '../data/cart.js';
 
function getStarsImage (rating) {
  const num = Number(rating);

  const rounded = Math.round(num * 2) / 2;

  return `../images/ratings/rating-${rounded * 10}.png`;
}

export function displayProductsHTML (product) {
  
    return `
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
                    <select class="quantity-select js-quantity-selector">
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
}

export function attachAddToCartListeners () {
  const addToCartButtons = document.querySelectorAll('.js-add-to-cart-btn');
    addToCartButtons.forEach((button)=>{
    button.addEventListener('click',()=>{
      const productId = button.dataset.productId;
      const productCard = button.closest('.product-card');
      const quantitySelector = productCard.querySelector('.js-quantity-selector');
      const quantity = Number(quantitySelector.value);
      addToCart(productId, quantity);
   });
 });
}

const categoryCards = document.querySelectorAll('.category-card');

categoryCards.forEach((categoryCard)=>{
  categoryCard.addEventListener('click',()=>{
    const chosenCategory = categoryCard.dataset.category;
    displayProductsByCategory(chosenCategory);
  });
});

function displayProductsByCategory (chosenCategory) {
  let featuredProductContainer = document.querySelector('.js-products-grid');

  featuredProductContainer.innerHTML = '';

  products.forEach((product)=>{
    if(product.category === chosenCategory) {
      featuredProductContainer.innerHTML += displayProductsHTML(product);
    }
  });
  attachAddToCartListeners();
}

function displayAllProducts () {
  let productContainer = document.querySelector('.js-products-grid');
  productContainer.innerHTML = '';
  products.forEach((product)=>{
    productContainer.innerHTML += displayProductsHTML(product);
  });
  attachAddToCartListeners();
}
displayAllProducts();