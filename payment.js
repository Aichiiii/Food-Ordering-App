 // --- NEW: PAYMENT PROCESSING ---
  function processPayment() {
    if (cart.length === 0) return alert("Your cart is empty!");

    // Create Order Object
    const newOrder = {
      id: "#VB-" + Math.floor(1000 + Math.random() * 9000),
      timestamp: new Date().toLocaleString('en-US', { 
        month: 'short', day: 'numeric', hour: 'numeric', minute: 'numeric', hour12: true 
      }),
      items: [...cart],
      total: cart.reduce((s, i) => s + (i.price * i.qty), 0),
      status: "Completed"
    };

    // Save to LocalStorage
    let history = JSON.parse(localStorage.getItem('vb_orders')) || [];
    history.unshift(newOrder); // Add to the top
    localStorage.setItem('vb_orders', JSON.stringify(history));

    // Clear UI
    cart = [];
    updateCart();
    alert("Payment Successful! Order moved to history.");
    toggleCart();
  }