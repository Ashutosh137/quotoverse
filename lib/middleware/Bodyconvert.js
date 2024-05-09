
export default async function Bodyconvert(req) {
    const chunks = [];
    for await (const chunk of req.body) {
      chunks.push(chunk);
    }
    const data =await Buffer.concat(chunks).toString();
    return JSON.parse(data);
}
