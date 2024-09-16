import Bodyconvert from "@/lib/middleware/Bodyconvert";
import Connectmongodb from "@/server/mongodb";
import { ObjectId } from "mongodb";
export async function GET(req, context) {
  let { uid } = context.params;
  const db = await Connectmongodb();
  const collection = db.collection("UserDataList");
  const profiledata = await collection.findOne({ _id: new ObjectId(uid) });

  return Response.json({ message: "success", profiledata });
}

export async function POST(req, res) {
  return Response.json({
    message: "no support",
  });
}
export async function PUT(req, res) {
  try {
    const db = await Connectmongodb();
    const { username, uid, isLoggedIn } = await Bodyconvert(req);
    console.log(username, uid, isLoggedIn);

    if (isLoggedIn) {
      const Get_userdatacollection = db.collection("UserDataList");

      const User = await Get_userdatacollection.updateOne(
        { _id: new ObjectId(uid) },
        { $set: { name: username } },
        { returnOriginal: false },
      );
      if (!User) {
        return Response.json({ error: "user not found" });
      }
      return Response.json({
        message: "updatenname sucessfully",
        data: User,
      });
    } else {
      return Response.json({
        error: "login required",
      });
    }
  } catch (error) {
    console.error(error);
    return Response.json({ error: "Internal server error" });
  }
}
