    const pdfjsLib = window['pdfjs-dist/build/pdf'];
    pdfjsLib.GlobalWorkerOptions.workerSrc = 'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.4.120/pdf.worker.min.js';

    document.getElementById('pdf-upload').addEventListener('change', async (e) => {
        const file = e.target.files[0];
        if (!file) return;

        const status = document.getElementById('status');
        const downloadArea = document.getElementById('download-area');
        status.innerText = "Processing... please wait.";
        downloadArea.innerHTML = "";

        const reader = new FileReader();
        reader.onload = async function() {
            const typedarray = new Uint8Array(this.result);
            const pdf = await pdfjsLib.getDocument(typedarray).promise;
            
            for (let i = 1; i <= pdf.numPages; i++) {
                const page = await pdf.getPage(i);
                const viewport = page.getViewport({ scale: 2.0 }); // High quality
                const canvas = document.createElement('canvas');
                const context = canvas.getContext('2d');
                canvas.height = viewport.height;
                canvas.width = viewport.width;

                await page.render({ canvasContext: context, viewport: viewport }).promise;

                // Create Download Link
                const imgData = canvas.toDataURL('image/png');
                const link = document.createElement('a');
                link.href = imgData;
                link.download = `page-${i}.png`;
                link.innerHTML = `<br>Download Page ${i}`;
                
                const wrapper = document.createElement('div');
                wrapper.appendChild(canvas);
                wrapper.appendChild(link);
                downloadArea.appendChild(wrapper);
            }
            status.innerText = "Conversion complete!";
        };
        reader.readAsArrayBuffer(file);
    });
