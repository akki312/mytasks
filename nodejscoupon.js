// Node.js modules
const crypto = require('crypto');

// Function to generate a random coupon code
function generateCouponCode(length) {
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  let couponCode = '';
  for (let i = 0; i < length; i++) {
    couponCode += characters.charAt(Math.floor(Math.random() * characters.length));
  }
  return couponCode;
}

// Sample function to apply a discount coupon to a purchase
function applyCoupon(couponCode, purchaseAmount) {
  // Check if coupon code is valid (e.g., exists in database, not expired, etc.)
  const isValidCoupon = checkCouponValidity(couponCode);
  
  if (isValidCoupon) {
    // Calculate discount amount (e.g., 10% discount)
    const discountPercentage = 10; // Example discount percentage
    const discountAmount = (purchaseAmount * discountPercentage) / 100;
    
    // Apply discount to purchase amount
    const discountedPrice = purchaseAmount - discountAmount;
    
    // Return discounted price
    return discountedPrice;
  } else {
    // If coupon code is invalid, return original purchase amount
    return purchaseAmount;
  }
}

// Sample function to check the validity of a coupon code
function checkCouponValidity(couponCode) {
  // Example: Check if coupon code exists in database or is valid in some way
  // For demonstration purposes, assume coupon codes starting with 'ABC' are valid
  return couponCode.startsWith('ABC');
}

// Generate a random coupon code
const couponCode = generateCouponCode(8); // Generate an 8-character coupon code
console.log('Generated Coupon Code:', couponCode);

// Apply coupon to a purchase
const purchaseAmount = 100; // Example purchase amount
const discountedPrice = applyCoupon(couponCode, purchaseAmount);
console.log('Original Price:', purchaseAmount);
console.log('Discounted Price:', discountedPrice);
