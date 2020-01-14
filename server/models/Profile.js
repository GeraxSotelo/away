import mongoose from "mongoose";
let Schema = mongoose.Schema;
let ObjectId = Schema.Types.ObjectId;

const Profile = new Schema(
  {
    name: { type: String, required: true },
    username: { type: String, required: true },
    email: { type: String, required: true },
    imgURL: { type: String, required: true },
    authorId: { type: ObjectId, ref: "User", required: true }
  },
  { timestamps: true, toJSON: { virtuals: true } }
);

// NOTE Future problem: cascade on delete

export default Profile;
