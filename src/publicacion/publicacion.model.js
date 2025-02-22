import { Schema, model } from "mongoose";

const publicacionSchema = new Schema(
  {
    title: {
      type: String,
      required: [true, "Title is required"],
      maxLength: [25, "Title cannot exceed 25 characters"],
    },
    textPubli: {
      type: String,
      required: [true, "The text is required"],
      maxLength: [500, "The text cannot exceed 500 characters"],
    },
    userPubli: {
      type: Schema.Types.ObjectId,
      ref: "USER",
      required: true,
    },
    categories: [
      {
        type: Schema.Types.ObjectId,
        ref: "Category",
        required: true,
      },
    ],
    status: {
      type: Boolean,
      default: true,
    },
  },
  {
    versionKey: false,
    timestamps: true,
  }
);

publicacionSchema.methods.toJSON = function () {
  const { _id, ...publicacion } = this.toObject();
  publicacion.pid = _id;
  return publicacion;
};

export default model("Publicacion", publicacionSchema);
