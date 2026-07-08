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