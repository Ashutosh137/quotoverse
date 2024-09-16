import Bodyconvert from "@/lib/middleware/Bodyconvert";
import { hashpassword } from "@/lib/middleware/hashpassword";
import Connectmongodb from "@/server/mongodb";
import { ObjectId } from "mongodb";
export async function GET(req, context) {
  let { token } = context.params;
  const db = await Connectmongodb();
  const collection = db.collection("users");
  const profiledata = await collection.findOne({
    resetPasswordToken: token,
    resetPasswordExpires: { $gt: new Date() },
  });
  if (profiledata) return Response.json({ message: "success", profiledata });
  else return Response.json({ error: "no user found" });
}

export async function POST(req, res) {
  const { password, token } = await Bodyconvert(req);
  console.log(password, token);
  const db = await Connectmongodb();
  const collection = db.collection("users");
  const hashedpassword = await hashpassword(password);
  const user = await collection.updateOne(
    { resetPasswordToken: token },
    { $set: { password: hashedpassword } },
  );

  if (user) {
    console.log(user, hashedpassword, token);
    return Response.json({
      message: "password changed successfully",
    });
  } else {
    return Response.json({
      message: "no user found",
    });
  }
}
