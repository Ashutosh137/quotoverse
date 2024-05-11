import Bodyconvert from "@/lib/middleware/Bodyconvert";
import Connectmongodb from "@/server/mongodb";
export async function GET(req, context) {
  let { id } = context.params;
  const db = await Connectmongodb();
  const collection = db.collection("Comments");
  const cursor = await collection.find({ quoteid: id });
  const comments = await cursor.toArray();

  console.log("commensts ",comments)

  return Response.json({ message: "success", comments });
}

export async function POST(req, res) {
  // let { id } = context.params;
  const { text, postedby, quoteid } = await Bodyconvert(req);
  const db = await Connectmongodb();
  const collection = db.collection("Comments");
  await collection.insertOne({
    text,
    postedby,
    quoteid,
    createdat: new Date(),
    likes: [],
    replies: [],
  });

  return Response.json({
    message: "Comment Sucessfully",
    // data: Get_userdata,
  });
}
