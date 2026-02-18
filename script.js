function generateQR() {

    // 1. Get values
    const part = document.getElementById("Part").value.trim();
    const serial = document.getElementById("Serial").value.trim();
    const lot = document.getElementById("Log").value.trim();
    const manufacturingType = document.getElementById("manufacturingtype").value;
    const expiry = document.getElementById("Expiry").value;

    // 2. Validation
    if (!part || !serial || !lot || !manufacturingType || !expiry) {
        alert("Please fill all fields");
        return;
    }

    // 3. Prepare request body
    const requestData = {
        partNumber: part,
        serialNumber: serial,
        batchNumber: lot,
        manufacturingType: manufacturingType,
        expiry: expiry
    };

    // ✅ 4. REAL backend tunnel URL
    const BACKEND_URL = "https://mounts-lambda-fitting-supplies.trycloudflare.com";

    // 5. Call backend
    fetch(`${BACKEND_URL}/api/component/generate`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(requestData)
    })
    .then(response => {
        if (!response.ok) {
            throw new Error("Backend not responding");
        }
        return response.json();
    })
    .then(data => {

        const componentId = data.id;

        if (!componentId) {
            alert("ID not received from backend");
            return;
        }

        // ✅ 6. Pages second page URL
        const qrUrl = `https://generator-qr-hal.pages.dev/second.html?id=${componentId}`;

        document.getElementById("qrcode").innerHTML = "";

        new QRCode(document.getElementById("qrcode"), {
            text: qrUrl,
            width: 200,
            height: 200
        });

        console.log("QR Generated:", qrUrl);
    })
    .catch(error => {
        console.error("Error:", error);
        alert("Failed to connect to backend");
    });
}