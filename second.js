window.onload = function () {

    // 1. Get ID from URL
    const params = new URLSearchParams(window.location.search);
    const id = params.get("id");

    if (!id) {
        document.body.innerHTML = "<h2>No ID provided in URL</h2>";
        return;
    }

    // 2. REAL backend URL (your cloudflare tunnel)
    const BACKEND_URL = "https://mounts-lambda-fitting-supplies.trycloudflare.com";

    // 3. Fetch component data
    fetch(`${BACKEND_URL}/api/component/${id}`)
        .then(response => {
            if (!response.ok) {
                throw new Error("Component not found");
            }
            return response.json();
        })
        .then(data => {

            document.getElementById("part").innerText = data.partNumber;
            document.getElementById("serial").innerText = data.serialNumber;
            document.getElementById("batch").innerText = data.batchNumber;
            document.getElementById("manufacturingType").innerText = data.manufacturingType;
            document.getElementById("expiry").innerText = data.expiry;

        })
        .catch(error => {
            console.error("Error:", error);
            document.body.innerHTML = "<h2>Error loading component details</h2>";
        });
};