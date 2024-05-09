import Bodyconvert from "@/lib/middleware/Bodyconvert";
import { hashpassword } from "@/lib/middleware/hashpassword";
import Connectmongodb from "@/server/mongodb";
// import User from "@/server/user";
export async function GET(req) {
  // const collection = db.collection("users");
  return Response.json({
    message: "GET method is not supported on this endpoint",
  });
}

export async function POST(req, res) {
  try {
    const db = await Connectmongodb();
    const { email, password, name } = await Bodyconvert(req);
    const user = db.collection("users");
    const userdata = db.collection("UserDataList");
    const hashedpassword = await hashpassword(password);

    const Allreadyuser = await user.findOne({ email: email });
    if (Allreadyuser) {
      return Response.json({ error: "user already exists" });
    }
    await user.insertOne({
      email: email,
      name: name,
      password: hashedpassword,
      createdat: new Date(),
    });
    await userdata.insertOne({
      email: email,
      name: name,
      favorite_quotes: [],
      createdat: new Date(),
    });

    return Response.json({ message: "user created sucessfully" });
  } catch (error) {
    console.error(error);
    return Response.json({ error: "Internal server error" });
  }
}
