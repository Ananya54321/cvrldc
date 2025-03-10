import mongoose, { Mongoose } from "mongoose";

const gallerySchema=new mongoose.Schema({
    title:{
        type:String,
        required:true
    },
    images:{
        type:Array,
        required:true
    },
    vertical:{
        type:String,
        required:true,
        enum:["eclectics","writer space","STP","shared shelf","LDC"]
    },
    date:{
        type:Date,
        required:true,
        default:Date.now()
    },
})

const Gallery=mongoose.models?.Gallery||mongoose.model("Gallery",gallerySchema);
export default Gallery;