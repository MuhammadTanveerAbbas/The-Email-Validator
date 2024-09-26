console.log("This is my Script");

const submitBtn = document.getElementById("submitBtn");
const resultCont = document.getElementById("resultCont");

submitBtn.addEventListener("click", async (e) => {
    e.preventDefault();
    console.log("Clicked!");

    // Show loader
    resultCont.innerHTML = `<img width="50" src="../public/loading.svg" alt="Loading...">`;

    const key = "YOUR_API_KEY";  // use your own api key from emailvalidation.io
    const email = document.getElementById("username").value;
    const url = `https://api.emailvalidation.io/v1/info?apikey=${key}&email=${email}`;

    try {
        const res = await fetch(url);
        const result = await res.json();

        // Constructing the results in a user-friendly way
        const str = `
        <div class="result-item"><span>Email:</span> ${result.email}</div>
        <div class="result-item"><span>Valid:</span> ${result.format_valid ? "Yes" : "No"}</div>
        <div class="result-item"><span>Registered:</span> ${result.state === "deliverable" ? "Yes" : "No"}</div>
        <div class="result-item"><span>Provider:</span> ${result.domain}</div>
        <div class="result-item"><span>Disposable Email:</span> ${result.disposable ? "Yes" : "No"}</div>
        <div class="result-item"><span>SMTP Check:</span> ${result.smtp_check ? "Passed" : "Failed"}</div>`;

        resultCont.innerHTML = str;
    } catch (error) {
        resultCont.innerHTML = `<div class="result-item">Error fetching email validation results</div>`;
    }
});
