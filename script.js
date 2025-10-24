const fileInput = document.getElementById("fileInput");
const uploadBtn = document.getElementById("uploadBtn");
const linksDiv = document.getElementById("links");

uploadBtn.onclick = async () => {
  const files = fileInput.files;
  if (!files.length) return alert("Select at least one file.");

  for (const file of files) {
    const formData = new FormData();
    formData.append("file", file);

    try {
      const res = await fetch("/upload", {
        method: "POST",
        body: formData
      });

      const text = await res.text();
      const link = document.createElement("a");
      link.href = text;
      link.textContent = `${file.name}: ${text}`;
      linksDiv.appendChild(link);
    } catch (err) {
      const p = document.createElement("p");
      p.textContent = `${file.name}: Error - ${err}`;
      linksDiv.appendChild(p);
    }
  }
};
