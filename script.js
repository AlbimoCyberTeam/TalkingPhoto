const CLOUD_NAME = "diutiwqz1";
const UPLOAD_PRESET = "BlackDragonSkull";

// IMAGE UPLOAD
document.getElementById("imageInput")
.addEventListener("change", async (e) => {

const file = e.target.files[0];

const formData = new FormData();

formData.append("file", file);
formData.append("upload_preset", UPLOAD_PRESET);

const res = await fetch(
`https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`,
{
method: "POST",
body: formData
}
);

const data = await res.json();

document.getElementById("imageUrl").value =
data.secure_url;

});

// AUDIO UPLOAD
document.getElementById("audioInput")
.addEventListener("change", async (e) => {

const file = e.target.files[0];

const formData = new FormData();

formData.append("file", file);
formData.append("upload_preset", UPLOAD_PRESET);

const res = await fetch(
`https://api.cloudinary.com/v1_1/${CLOUD_NAME}/video/upload`,
{
method: "POST",
body: formData
}
);

const data = await res.json();

document.getElementById("audioUrl").value =
data.secure_url;

});

// GENERATE VIDEO
async function generateVideo() {

const imageUrl =
document.getElementById("imageUrl").value;

const audioUrl =
document.getElementById("audioUrl").value;

const status =
document.getElementById("status");

const videoPlayer =
document.getElementById("videoPlayer");

status.innerText =
"Membuat video...";

const res = await fetch("/api/generate", {

method: "POST",

headers: {
"Content-Type": "application/json"
},

body: JSON.stringify({
imageUrl,
audioUrl
})

});

const data = await res.json();

const talkId = data.id;

let resultUrl = null;

while (!resultUrl) {

status.innerText =
"Rendering video...";

await new Promise(r => setTimeout(r, 5000));

const statusRes =
await fetch(`/api/status?id=${talkId}`);

const statusData =
await statusRes.json();

if (statusData.status === "done") {

resultUrl =
statusData.result_url;

}

}

status.innerText =
"Video selesai";

videoPlayer.src =
resultUrl;

videoPlayer.classList.remove("hidden");

}