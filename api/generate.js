export default async function handler(req, res) {

const DID_API_KEY = "5WhdRllP9b6ZPrvysZfeg2w2MU4";
process.env.DID_API_KEY;

const response = await fetch(
"https://api.d-id.com/talks",
{
method: "POST",

headers: {
Authorization: `Bearer ${DID_API_KEY}`,
"Content-Type": "application/json",
Accept: "application/json"
},

body: JSON.stringify({

source_url: req.body.imageUrl,

script: {
type: "audio",
audio_url: req.body.audioUrl
},

config: {
stitch: true
}

})

}
);

const data =
await response.json();

res.status(200).json(data);

}