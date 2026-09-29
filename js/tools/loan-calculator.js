  let chart;

  function formatCurr(num) {
    const curr = document.getElementById('currency').value.split(' ')[0];
    return curr + ' ' + Math.round(num).toLocaleString('en-IN');
  }

  function setVal(id, val) {
    document.getElementById(id).value = val;
    calculateEMI();
  }

  function applyPreset(amt, rate, tenure) {
    document.getElementById('amount').value = amt;
    document.getElementById('rate').value = rate;
    document.getElementById('tenure').value = tenure;
    calculateEMI();
  }

  function calculateEMI() {
    const P = parseFloat(document.getElementById('amount').value);
    const annualRate = parseFloat(document.getElementById('rate').value);
    const N = parseFloat(document.getElementById('tenure').value) * 12;

    document.getElementById('amountVal').innerText = formatCurr(P);
    document.getElementById('rateVal').innerText = annualRate + '%';
    document.getElementById('tenureVal').innerText = (N / 12) + ' Years';

    const r = annualRate / 12 / 100;
    const emi = (P * r * Math.pow(1 + r, N)) / (Math.pow(1 + r, N) - 1);
    const totalPayment = emi * N;
    const totalInterest = totalPayment - P;

    document.getElementById('emiResult').innerText = formatCurr(emi);
    document.getElementById('principalResult').innerText = formatCurr(P);
    document.getElementById('interestResult').innerText = formatCurr(totalInterest);
    document.getElementById('totalPayableResult').innerText = formatCurr(totalPayment);

    updateChart(P, totalInterest);
    generateSchedule(P, r, emi);
  }

  function updateChart(principal, interest) {
    const ctx = document.getElementById('splitChart').getContext('2d');
    if (chart) chart.destroy();

    chart = new Chart(ctx, {
      type: 'doughnut',
      data: {
        labels: ['Principal', 'Interest'],
        datasets: [{
          data: [principal, interest],
          backgroundColor: ['#2563eb', '#f59e0b'],
          borderWidth: 0
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: { legend: { position: 'bottom' } }
      }
    });
  }

  function generateSchedule(P, r, emi) {
    const tbody = document.getElementById('scheduleBody');
    tbody.innerHTML = '';
    let balance = P;

    for (let month = 1; month <= 12; month++) {
      let interestPaid = balance * r;
      let principalPaid = emi - interestPaid;
      balance -= principalPaid;

      if (balance < 0) balance = 0;

      let row = `<tr>
        <td>Month ${month}</td>
        <td>${formatCurr(principalPaid)}</td>
        <td>${formatCurr(interestPaid)}</td>
        <td>${formatCurr(emi)}</td>
        <td>${formatCurr(balance)}</td>
      </tr>`;
      tbody.innerHTML += row;
    }
  }

  window.onload = calculateEMI;
