let ordersList = [];

  function fetchOrders() {
    // Read from localStorage
    const savedOrders = localStorage.getItem('vb_orders');
    if (savedOrders) {
      ordersList = JSON.parse(savedOrders);
      renderOrders();
    }
  }

  function renderOrders() {
    const tbody = document.getElementById('ordersBody');
    if (ordersList.length === 0) {
      tbody.innerHTML = '<tr><td colspan="6" class="text-center py-5">No orders found.</td></tr>';
      return;
    }

    tbody.innerHTML = ordersList.map(order => `
      <tr>
        <td>${order.id}</td>
        <td>${order.timestamp}</td>
        <td class="text-muted">${order.items.map(i => i.name).join(', ')}</td>
        <td class="fw-bold">₱${order.total.toFixed(2)}</td>
        <td><span class="status-badge status-completed">${order.status}</span></td>
        <td><button class="btn-view" onclick="viewOrder('${order.id}')">View Details</button></td>
      </tr>
    `).join('');
  }

  function viewOrder(orderId) {
    const order = ordersList.find(o => o.id === orderId);
    const content = document.getElementById('orderDetailsContent');
    
    content.innerHTML = `
      <div class="mb-4">
        <p class="text-muted small m-0">Order ID: <b>${order.id}</b></p>
        <p class="text-muted small">Date: ${order.timestamp}</p>
      </div>
      ${order.items.map(i => `
        <div class="detail-item">
          <div>
            <span class="small fw-bold d-block">${i.name} (x${i.qty})</span>
            ${i.details ? `<small class="text-muted" style="font-size:10px">${i.details}</small>` : ''}
          </div>
          <span class="small">₱${(i.price * i.qty).toFixed(2)}</span>
        </div>
      `).join('')}
      <div class="mt-4 pt-3 border-top d-flex justify-content-between">
        <h5 class="fw-800">TOTAL</h5>
        <h5 class="fw-800" style="color:var(--accent)"> <strong>₱${order.total.toFixed(2)}</h5></strong> 
      </div>
    `;

    new bootstrap.Modal(document.getElementById('orderModal')).show();
  }

  function clearHistory() {
    
      localStorage.removeItem('vb_orders');
      ordersList = [];
      renderOrders();
    
  }

  fetchOrders();