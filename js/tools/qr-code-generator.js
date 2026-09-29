  let currentMode = 'URL';
  const qrcodeDiv = document.getElementById("qrcode");
  let qr = new QRCode(qrcodeDiv, { width: 200, height: 200, correctLevel: QRCode.CorrectLevel.H });

  function switchTab(mode) {
    currentMode = mode;
    document.querySelectorAll('#qr-app .tab-btn').forEach(btn => btn.classList.remove('tab-active'));
    document.getElementById(`btn-${mode}`).classList.add('tab-active');
    document.getElementById('tab-title').innerText = `${mode} Details`;

    const container = document.getElementById('input-container');
    container.innerHTML = '';

    if(mode === 'URL') {
      container.innerHTML = `<input type="text" id="input1" placeholder="https://example.com">`;
    } else if(mode === 'Text') {
      container.innerHTML = `<textarea id="input1" rows="3" placeholder="Enter your text here..."></textarea>`;
    } else if(mode === 'WiFi') {
      container.innerHTML = `
        <input type="text" id="input1" placeholder="Network Name (SSID)">
        <input type="password" id="input2" placeholder="Password">
      `;
    } else if(mode === 'Email') {
      container.innerHTML = `
        <input type="email" id="input1" placeholder="Email Address">
        <input type="text" id="input2" placeholder="Subject">
      `;
    } else if(mode === 'vCard') {
      container.innerHTML = `
        <input type="text" id="v1" placeholder="First Name">
        <input type="text" id="v2" placeholder="Last Name">
        <input type="text" id="v3" placeholder="Phone">
        <input type="text" id="v4" placeholder="Email">
        <input type="text" id="v5" placeholder="Company">
      `;
    }
  }

  function generateQR() {
    let data = "";
    if(currentMode === 'URL' || currentMode === 'Text') {
      data = document.getElementById('input1').value;
    } else if(currentMode === 'WiFi') {
      data = `WIFI:S:${document.getElementById('input1').value};T:WPA;P:${document.getElementById('input2').value};;`;
    } else if(currentMode === 'Email') {
      data = `mailto:${document.getElementById('input1').value}?subject=${encodeURIComponent(document.getElementById('input2').value)}`;
    } else if(currentMode === 'vCard') {
      const fn = document.getElementById('v1').value;
      const ln = document.getElementById('v2').value;
      data = `BEGIN:VCARD\nVERSION:3.0\nN:${ln};${fn};;;\nFN:${fn} ${ln}\nTEL:${document.getElementById('v3').value}\nEMAIL:${document.getElementById('v4').value}\nORG:${document.getElementById('v5').value}\nEND:VCARD`;
    }

    if(!data) return alert("Please fill in the fields!");
    qr.clear();
    qr.makeCode(data);
  }

  function downloadQR() {
    const canvas = qrcodeDiv.querySelector('canvas');
    if (canvas) {
      const link = document.createElement('a');
      link.href = canvas.toDataURL("image/png");
      link.download = 'my-qrcode.png';
      link.click();
      return;
    }
    const img = qrcodeDiv.querySelector('img');
    if (img) {
      const link = document.createElement('a');
      link.href = img.src;
      link.download = 'my-qrcode.png';
      link.click();
      return;
    }
    alert("Generate a code first!");
  }

  // Init
  switchTab('URL');
