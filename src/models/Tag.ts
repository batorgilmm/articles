import { model, models, Schema } from "mongoose";

const TagSchema = new Schema({
    tag: String,
})

export const Tag = models!.Tag || model('Tag', TagSchema)