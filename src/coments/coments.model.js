  import { Schema, model } from "mongoose";

  const comentsSchema = new Schema(
    {
      textComent: {
        type: String,
        required: [true, "The text is required"],
        maxLength: [200, "The text cannot exceed 200 characters"],
      },
      userWhoComent: {
        type: Schema.Types.ObjectId,
        ref: "USER",
        required: true,
      },
      publicacionComent: [
        {
          type: Schema.Types.ObjectId,
          ref: "Publicacion",
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

  comentsSchema.methods.toJSON = function () {
    const { _id, ...coment } = this.toObject();
    coment.coid = _id;
    return coment;
  };

  export default model("Coments", comentsSchema);
