const fileInput = document.getElementById("fileInput");
const uploadBtn = document.getElementById("uploadBtn");
const linksDiv = document.getElementById("links");

uploadBtn.onclick = async () => {
  const files = fileInput.files;
  if (!files.length) return alert("Select at least one image");

  linksDiv.innerHTML = "";

  for (const file of files) {
    const formData = new FormData();
    formData.append("file", file);

    const p = document.createElement("div");
    p.className = "link-item";
    p.textContent = `Uploading ${file.name}...`;
    linksDiv.appendChild(p);

    try {
      const res = await fetch("/upload", { method: "POST", body: formData });
      const text = await res.text();
      if (text.startsWith("http")) {
        p.innerHTML = `<b>${file.name}</b>: <a href="${text}" target="_blank">${text}</a>`;
      } else {
        p.innerHTML = `<b>${file.name}</b>: ❌ Failed (${text})`;
      }
    } catch (err) {
      p.innerHTML = `<b>${file.name}</b>: ⚠️ ${err.message}`;
    }
  }
};
