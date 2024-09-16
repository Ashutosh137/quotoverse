import Bodyconvert from "@/lib/middleware/Bodyconvert";
import Connectmongodb from "@/server/mongodb";

const { OAuth2Client } = require("google-auth-library");

const client = new OAuth2Client(process.env.NEXT_PUBLIC_Client);
// import User from "@/server/user";
export async function GET(req) {
  return Response.json({ message: "mot supported" });
}

export async function POST(req, res) {
  try {
    const db = await Connectmongodb();
    const body = await Bodyconvert(req);
    const ticket = await client.verifyIdToken({
      idToken: body.credential.credential,
      audience: process.env.NEXT_PUBLIC_Client,
    });

    const payload = ticket.getPayload();
    const email = payload["email"];

    const Get_userdatacollection = db.collection("UserDataList");

    const Get_userdata = await Get_userdatacollection.findOne({
      email,
    });
    if (!Get_userdata) {
      await Get_userdatacollection.insertOne({
        email: email,
        name: payload["name"],
        favorite_quotes: [],
        createdat: new Date(),
      });

      const data = await Get_userdatacollection.findOne({
        email,
      });

      return Response.json({
        message: "Signup Sucessfully",
        data,
      });
    }

    return Response.json({
      message: "Login Sucessfully",
      data: Get_userdata,
    });
  } catch (error) {
    console.log(error);
    return Response.json({ error: "Internal server error" });
  }
}
