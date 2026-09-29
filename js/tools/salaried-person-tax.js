    function sync() {
        const m = document.getElementById('mIn').value;
        document.getElementById('aIn').value = m ? Math.round(m * 12) : '';
    }

    function run() {
        const income = parseFloat(document.getElementById('aIn').value);
        const year = document.getElementById('yr').value;
        let tax = 0;
        if (!income || income <= 0) return;

        // Tax slab logic (unchanged)
        if (year === "2027") {
            if (income <= 600000) tax = 0;
            else if (income <= 1200000) tax = (income - 600000) * 0.01;
            else if (income <= 2200000) tax = 6000 + (income - 1200000) * 0.11;
            else if (income <= 3200000) tax = 116000 + (income - 2200000) * 0.20;
            else if (income <= 4100000) tax = 316000 + (income - 3200000) * 0.25;
            else if (income <= 5600000) tax = 541000 + (income - 4100000) * 0.29;
            else if (income <= 7000000) tax = 976000 + (income - 5600000) * 0.32;
            else tax = 1424000 + (income - 7000000) * 0.35;
        }
        if (year !== "2027") {
            // Only the 2026-27 slabs have been added to this calculator. Do not show a misleading Rs. 0 for other years.
            document.getElementById('resBox').style.display = 'block';
            document.getElementById('aOut').innerText = 'Slabs not added';
            document.getElementById('mOut').innerText = 'Slabs not added';
            return;
        }

        document.getElementById('resBox').style.display = 'block';
        document.getElementById('aOut').innerText = 'Rs. ' + Math.round(tax).toLocaleString();
        document.getElementById('mOut').innerText = 'Rs. ' + Math.round(tax/12).toLocaleString();
    }
