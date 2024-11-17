import { model, models, Schema } from "mongoose";

const ArticleSchema = new Schema(
  {
    url: {
      type: String,
      unique: true
    },
  },
  {
    timestamps: true,
  }
);

export const Article = models.Article || model("Article", ArticleSchema);
