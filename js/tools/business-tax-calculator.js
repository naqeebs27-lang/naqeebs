function calculateTax() {
    const income = parseFloat(document.getElementById('income').value);
    const year = document.getElementById('taxYear').value;
    let tax = 0;
    let noteText = "";

    if (isNaN(income) || income <= 0) {
        alert("Please enter a valid income amount.");
        return;
    }

    // FBR NON-SALARIED / BUSINESS INDIVIDUAL & AOP TAX SLABS

    if (year === "2027" || year === "2026" || year === "2025") {
        if (income <= 600000) {
            tax = 0;
        } else if (income <= 1200000) {
            tax = (income - 600000) * 0.15;
        } else if (income <= 1600000) {
            tax = 90000 + (income - 1200000) * 0.20;
        } else if (income <= 3200000) {
            tax = 170000 + (income - 1600000) * 0.30;
        } else if (income <= 5600000) {
            tax = 650000 + (income - 3200000) * 0.40;
        } else {
            tax = 1610000 + (income - 5600000) * 0.45;
            const cap = income * 0.40;
            if (tax > cap) {
                tax = cap;
                noteText = "*Professional AOP cap (40% of total income) applied.";
            }
        }
        if (income > 10000000) {
            tax = tax * 1.10;
            if (noteText !== "") noteText += " | ";
            noteText += "*Includes 10% Surcharge for business income exceeding Rs. 10 Million.";
        }
    } else if (year === "2024") {
        if (income <= 600000) {
            tax = 0;
        } else if (income <= 800000) {
            tax = (income - 600000) * 0.075;
        } else if (income <= 1200000) {
            tax = 15000 + (income - 800000) * 0.15;
        } else if (income <= 2400000) {
            tax = 75000 + (income - 1200000) * 0.20;
        } else if (income <= 3000000) {
            tax = 315000 + (income - 2400000) * 0.25;
        } else if (income <= 4000000) {
            tax = 465000 + (income - 3000000) * 0.30;
        } else {
            tax = 765000 + (income - 4000000) * 0.35;
        }
    } else if (year === "2023") {
        if (income <= 600000) {
            tax = 0;
        } else if (income <= 1200000) {
            tax = (income - 600000) * 0.05;
        } else if (income <= 2400000) {
            tax = 30000 + (income - 1200000) * 0.125;
        } else if (income <= 3000000) {
            tax = 180000 + (income - 2400000) * 0.175;
        } else if (income <= 4000000) {
            tax = 285000 + (income - 3000000) * 0.225;
        } else if (income <= 6000000) {
            tax = 510000 + (income - 4000000) * 0.275;
        } else {
            tax = 1060000 + (income - 6000000) * 0.35;
        }
    }

    document.getElementById('result').style.display = 'block';
    document.getElementById('taxDisplay').innerText = 'Rs. ' + Math.round(tax).toLocaleString();
    document.getElementById('note').innerText = noteText;
}
