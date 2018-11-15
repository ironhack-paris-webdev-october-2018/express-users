const mongoose = require("mongoose");

const Schema = mongoose.Schema;


const roomSchema = new Schema({
  // document structure & rules defined here
  name: { type: String, required: true },
  description: {
    type: String,
    required: true,
    minlength: 100,
  },
  pictureUrl: { type: String, required: true },
  owner: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
}, {
  // additional settings for the Schema class
  timestamps: true,
});

const Room = mongoose.model("Room", roomSchema);


module.exports = Room;
