import mongoose from "mongoose";
let Schema = mongoose.Schema;
let ObjectId = Schema.Types.ObjectId;

const Destination = new Schema({
  location: { type: String, required: true },
  authorId: { type: ObjectId, ref: "User", required: true }
});

const Trip = new Schema(
  {
    title: { type: String, required: true },
    authorId: { type: ObjectId, ref: "User", required: true },
    destinations: [Destination],
    collabs: [{ type: ObjectId, ref: "User" }],
    collabsProfiles: [{ type: Object, ref: "Profile" }]
  },
  { timestamps: true, toJSON: { virtuals: true } }
);

export default Trip;
