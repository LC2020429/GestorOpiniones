import {Schema, model, version} from "mongoose";

const categorySchema = Schema({
    categoryName:{
        type: String,
        required: [true, "Category name is required"],
        maxLength: [25, "Category name cannot exceed 25 characters"]
    },
    vistasCategory:{
        type: Number,
        default: 0
    },
    status:{
        type: Boolean,
        default: true
    }
},
{
    versionKey: false,
    timeStamps: true
})

categorySchema.methods.toJson = function(){
    const {password, _id, ...category} = this.toObject()
    category.cid = _id
    return category
}

export default model("Category", categorySchema)