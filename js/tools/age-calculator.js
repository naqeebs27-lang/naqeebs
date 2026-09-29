    // Set default target date to today
    window.onload = () => {
        const today = new Date().toISOString().split('T')[0];
        document.getElementById('targetPicker').value = today;
    };

    function runCalculation() {
        const dobVal = document.getElementById('dobPicker').value;
        const targetVal = document.getElementById('targetPicker').value;

        if (!dobVal) {
            alert("Please select your Date of Birth first.");
            return;
        }

        const birth = new Date(dobVal);
        const end = new Date(targetVal);

        if (end < birth) {
            alert("The target date cannot be earlier than your birth date.");
            return;
        }

        let years = end.getFullYear() - birth.getFullYear();
        let months = end.getMonth() - birth.getMonth();
        let days = end.getDate() - birth.getDate();

        if (days < 0) {
            months--;
            const prevMonthLastDay = new Date(end.getFullYear(), end.getMonth(), 0).getDate();
            days += prevMonthLastDay;
        }
        if (months < 0) {
            years--;
            months += 12;
        }

        const diffMs = end - birth;
        const secs = Math.floor(diffMs / 1000);
        const mins = Math.floor(secs / 60);
        const hrs = Math.floor(mins / 60);
        const totalDays = Math.floor(hrs / 24);
        const weeks = Math.floor(totalDays / 7);
        const remDays = totalDays % 7;
        const totalMonths = (years * 12) + months;

        document.getElementById('primaryResult').innerText = `${years} years ${months} months ${days} days`;
        
        document.getElementById('secondaryStats').innerHTML = `
            • ${totalMonths} months ${days} days<br>
            • ${weeks} weeks ${remDays} days<br>
            • ${totalDays.toLocaleString()} days<br>
            • ${hrs.toLocaleString()} hours<br>
            • ${mins.toLocaleString()} minutes<br>
            • ${secs.toLocaleString()} seconds
        `;

        document.getElementById('resultSection').style.display = 'block';
        
        // Auto-scroll to result for small screens
        setTimeout(() => {
            document.getElementById('resultSection').scrollIntoView({ behavior: 'smooth' });
        }, 100);
    }
