import { model, models, Schema } from "mongoose";

const ArticleSchema = new Schema(
  {
    url: String,
  },
  {
    timestamps: true,
  }
);

export const Article = models.Article || model("Article", ArticleSchema);
