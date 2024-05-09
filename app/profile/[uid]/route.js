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
  //   // let { id } = context.params;
  //   const { text, postedby, quoteid } = await Bodyconvert(req);
  //   console.log(text, postedby, quoteid);
  //   const db = await Connectmongodb();
  //   const collection = db.collection("Comments");
  //   await collection.insertOne({
  //     text,
  //     postedby,
  //     quoteid,
  //     createdat: new Date(),
  //     likes: [],
  //     replies: [],
  //   });
  //   return Response.json({
  //     message: "comment sucessfully",
  //     // data: Get_userdata,
  //   });
}
export async function PUT(req, res) {
  try {
    const db = await Connectmongodb();
    const { userdata,quote } = await Bodyconvert(req);
    console.log(userdata,quote);

    // const usercolloection = db.collection("users");
    const Get_userdatacollection = db.collection("UserDataList");

    // const User = await Get_userdatacollection.updateOne();
    // if (!User) {
    //   return Response.json({ error: "user not found" });
    // }
    // const Is_password_correct = await comparePassword(password, User.password);
    // if (!Is_password_correct) {
    //   return Response.json({ error: "password is incorrect" });
    // }

    // const Get_userdata = await Get_userdatacollection.findOne({ email: email });
    // if (!Get_userdata) {
    //   return Response.json({ error: "userdata not found" });
    // }
    return Response.json({
      message: "login sucessfully",
      // data: Get_userdata,
    });
  } catch (error) {
    console.error(error);
    return Response.json({ error: "Internal server error" });
  }
}
