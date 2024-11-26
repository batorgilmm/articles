import { model, models, Schema, Types } from "mongoose";

const ArticleSchema = new Schema(
  {
    title: String,
    description: String,
    image: String,
    category: String,
    url: {
      type: String,
      unique: true
    },
    tags: [
      {
        type: Types.ObjectId,
        required: true,
        ref: "Tag"
      }
    ]
  },
  {
    timestamps: true,
  }
);

export const Article = models!.Article || model("Article", ArticleSchema);
