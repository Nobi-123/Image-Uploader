const fileInput = document.getElementById("fileInput");
const dropZone = document.getElementById("drop-zone");
const uploadBtn = document.getElementById("uploadBtn");
const output = document.getElementById("output");

let selectedFiles = [];

dropZone.addEventListener("click", () => fileInput.click());

fileInput.addEventListener("change", (e) => {
  selectedFiles = Array.from(e.target.files);
  dropZone.querySelector("p").textContent = `${selectedFiles.length} file(s) selected`;
});

dropZone.addEventListener("dragover", (e) => {
  e.preventDefault();
  dropZone.classList.add("dragover");
});

dropZone.addEventListener("dragleave", () => dropZone.classList.remove("dragover"));

dropZone.addEventListener("drop", (e) => {
  e.preventDefault();
  dropZone.classList.remove("dragover");
  selectedFiles = Array.from(e.dataTransfer.files);
  dropZone.querySelector("p").textContent = `${selectedFiles.length} file(s) selected`;
});

uploadBtn.addEventListener("click", async () => {
  if (!selectedFiles.length) {
    alert("Please select files first!");
    return;
  }

  uploadBtn.disabled = true;
  output.innerHTML = "<p>Uploading...</p>";

  const results = [];
  for (const file of selectedFiles) {
    const formData = new FormData();
    formData.append("file", file);

    try {
      const res = await fetch("https://0x0.st", {
        method: "POST",
        body: formData,
        headers: { "User-Agent": "curl/8.6.0" },
      });
      const link = (await res.text()).trim();
      results.push({ name: file.name, link });
    } catch (err) {
      results.push({ name: file.name, link: `Error: ${err}` });
    }
  }

  output.innerHTML = "";
  results.forEach(({ name, link }) => {
    const div = document.createElement("div");
    div.className = "link-item";

    const a = document.createElement("a");
    a.href = link;
    a.textContent = link;
    a.target = "_blank";

    const copyBtn = document.createElement("button");
    copyBtn.textContent = "Copy";
    copyBtn.className = "copy-btn";
    copyBtn.onclick = () => {
      navigator.clipboard.writeText(link);
      copyBtn.textContent = "Copied!";
      setTimeout(() => (copyBtn.textContent = "Copy"), 1200);
    };

    div.innerHTML = `<b>${name}</b>: `;
    div.appendChild(a);
    div.appendChild(copyBtn);
    output.appendChild(div);
  });

  uploadBtn.disabled = false;
});
