import Bodyconvert from "@/lib/middleware/Bodyconvert";
import Connectmongodb from "@/server/mongodb";
import { ObjectId } from "mongodb";
export async function GET(req, context) {
  let { id } = context.params;
  const db = await Connectmongodb();
  const collection = db.collection("Comments");
  const cursor = await collection.find({ quoteid: id });
  const comments = await cursor.toArray();

  console.log("commensts ", comments);

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
export async function PUT(req, res) {
  try {
    const { commentid, uid, isliked } = await Bodyconvert(req);
    const db = await Connectmongodb();
    const collection = db.collection("Comments");
    if (isliked) {
      const update = await collection.updateOne(
        { _id: new ObjectId(commentid) },
        { $pull: { likes: uid } },
      );
    } else {
      const update = await collection.updateOne(
        { _id: new ObjectId(commentid) },
        { $push: { likes: uid } },
      );
    }
    return Response.json({
      message: "Comment Sucessfully liked",
    });
  } catch {
    (err) => {
      Response.json({ error: err });
    };
  }
}
export async function DELETE(req, res) {
  try {
    const { commentid } = await Bodyconvert(req);
    const db = await Connectmongodb();
    const collection = db.collection("Comments");
    const update = await collection.deleteOne({ _id: new ObjectId(commentid) });

    return Response.json({
      message: "Comment Sucessfully deleted",
    });
  } catch {
    (err) => {
      Response.json({ error: err });
    };
  }
}
