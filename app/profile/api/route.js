import Bodyconvert from "@/lib/middleware/Bodyconvert";
import Connectmongodb from "@/server/mongodb";
import { ObjectId } from "mongodb";
export async function GET(req) {
  return Response.json({ message: "not supported" });
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
    const { userdata, quote } = await Bodyconvert(req);

    // const usercolloection = db.collection("users");
    const Get_userdatacollection = db.collection("UserDataList");
    const quotescollection = db.collection("quotes");

    if (userdata.isLoggedIn) {
      const quotes = await quotescollection.findOne({ quoteid: quote._id });
      if (quotes) {
        if (userdata.favorite.includes(quote._id)) {
          await Get_userdatacollection.updateOne(
            { email: userdata.email },
            { $pull: { favorite_quotes: quote._id } }
          );
          await quotescollection.updateOne(
            { _id: quote._id },
            { $pull: { likes: userdata.uid } }
          );
          return Response.json({
            message: "sucessfully disliked",
          });
        } else {
          await Get_userdatacollection.updateOne(
            { email: userdata.email },
            { $push: { favorite_quotes: quote._id } }
          );
          await quotescollection.updateOne(
            { quoteid: quote._id },
            { $push: { likes: userdata.uid } }
          );
          return Response.json({
            message: "sucessfully liked",
          });
        }
      } else {
        await quotescollection.insertOne({
          quoteid: quote._id,
          likes: [userdata.uid],
        });
        return Response.json({
          message: "sucessfully created",
        });
      }
    }

    return Response.json({
      message: "login required ",
    });

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
  } catch (error) {
    console.error(error);
    return Response.json({ error: "Internal server error" });
  }
}
