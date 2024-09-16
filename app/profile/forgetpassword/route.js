import Bodyconvert from "@/lib/middleware/Bodyconvert";
import sendResetEmail from "@/lib/middleware/sendemail";
import Connectmongodb from "@/server/mongodb";
const crypto = require("crypto");
export async function GET(req) {
  return Response.json({ message: "not supported" });
}

export async function POST(req, res) {
  try {
    const db = await Connectmongodb();
    const { email } = await Bodyconvert(req);

    const usercolloection = db.collection("users");

    const User = await usercolloection.findOne({ email: email });
    if (!User) {
      return Response.json({ error: "user not found" });
    }

    const token = crypto.randomBytes(32).toString("hex");
    await usercolloection.updateOne(
      { _id: User._id },
      {
        $set: {
          resetPasswordToken: token,
          resetPasswordExpires: new Date(Date.now() + 900000),
        },
      },
    );

    console.log(req.headers.get("origin").value);

    await sendResetEmail(email, token, req.headers.get("origin"));
    return Response.json({
      message: "Sucessfully sended a link to your email address",
      //   data: Get_userdata,
    });
  } catch (error) {
    console.log(error);
    return Response.json({ error: "user not found " });
  }
}
