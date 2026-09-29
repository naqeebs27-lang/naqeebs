  function toggleSettings() {
    const panel = document.getElementById('settingsPanel');
    panel.style.display = (panel.style.display === 'block') ? 'none' : 'block';
    document.getElementById('toggleSettings').value = "";
  }

  function generatePDF417() {
    const data = document.getElementById('barcodeData').value;
    const dpi = parseInt(document.getElementById('dpiSelect').value);
    const scale = dpi / 96;

    try {
      bwipjs.toCanvas('barcodeCanvas', {
        bcid: 'pdf417',
        text: data,
        scale: scale * 2,
        height: 15,
        includetext: false,
      });
    } catch (e) {
      console.error("Barcode generation error:", e);
    }
  }

  function downloadImage() {
    const canvas = document.getElementById("barcodeCanvas");
    const link = document.createElement('a');
    link.download = 'pdf417-barcode.png';
    link.href = canvas.toDataURL("image/png");
    link.click();
  }

  window.onload = generatePDF417;
