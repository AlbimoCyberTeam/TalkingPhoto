export default async function handler(req, res) {

const DID_API_KEY = "5WhdRllP9b6ZPrvysZfeg2w2MU4";
process.env.DID_API_KEY;

const response = await fetch(
`https://api.d-id.com/talks/${req.query.id}`,
{
headers: {
Authorization: `Bearer ${DID_API_KEY}`,
Accept: "application/json"
}
}
);

const data =
await response.json();

res.status(200).json(data);

}
