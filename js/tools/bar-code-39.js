  function toggleSettings() {
    const panel = document.getElementById('settingsPanel');
    panel.style.display = (panel.style.display === 'block') ? 'none' : 'block';
  }

  function generateBarcode() {
    const data = document.getElementById('barcodeData').value || " ";
    const width = document.getElementById('modWidth').value;
    const dpi = document.getElementById('dpiSelect').value;
    const scaleFactor = dpi / 96;
    const finalWidth = width * scaleFactor;

    try {
      JsBarcode("#barcode", data, {
        format: "CODE39",
        width: finalWidth,
        height: 80 * scaleFactor,
        displayValue: true,
        fontSize: 16 * scaleFactor,
        background: "#ffffff",
        margin: 10
      });
    } catch(e) {}
  }

  function downloadBarcode() {
    const svg = document.getElementById("barcode");
    const format = document.getElementById("imgFormat").value;
    const svgData = new XMLSerializer().serializeToString(svg);
    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");
    const img = new Image();

    img.onload = function() {
      canvas.width = img.width;
      canvas.height = img.height;
      ctx.fillStyle = "white";
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      ctx.drawImage(img, 0, 0);
      const file = canvas.toDataURL(format);
      const link = document.createElement("a");
      link.download = `barcode-${Date.now()}.${format.split('/')[1]}`;
      link.href = file;
      link.click();
    };

    img.src = "data:image/svg+xml;base64," + btoa(unescape(encodeURIComponent(svgData)));
  }

  generateBarcode();
