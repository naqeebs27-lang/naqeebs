  function calcDiscount() {
    const price = parseFloat(document.getElementById('origPrice').value) || 0;
    const discount = parseFloat(document.getElementById('discountPct').value) || 0;

    const savingsAmount = price * (discount / 100);
    const finalAmount = price - savingsAmount;

    document.getElementById('savings').textContent = savingsAmount.toFixed(2);
    document.getElementById('finalPrice').textContent = finalAmount.toFixed(2);
  }

  calcDiscount();
