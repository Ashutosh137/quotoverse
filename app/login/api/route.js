import Bodyconvert from "@/lib/middleware/Bodyconvert";
import { comparePassword } from "@/lib/middleware/hashpassword";
import Connectmongodb from "@/server/mongodb";
// import User from "@/server/user";
export async function GET(req) {
  return Response.json({ message: "mot supported" });
}

export async function POST(req, res) {
  try {
    const db = await Connectmongodb();
    const { email, password } = await Bodyconvert(req);

    const usercolloection = db.collection("users");
    const Get_userdatacollection = db.collection("UserDataList");

    const User = await usercolloection.findOne({ email: email });
    if (!User) {
      return Response.json({ error: "user not found" });
    }
    const Is_password_correct = await comparePassword(password, User.password);
    if (!Is_password_correct) {
      return Response.json({ error: "Password Is Incorrect" });
    }

    const Get_userdata = await Get_userdatacollection.findOne({ email: email });
    if (!Get_userdata) {
      return Response.json({ error: "Userdata Not Found" });
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
