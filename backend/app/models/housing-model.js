import mongoose from "mongoose";

const Schema = mongoose.Schema;

const housingSchema = new Schema ({
    title: {
        type: String,
        required: true },
    description: {
        type: String,
        required: true },
    location: {
        type: String,
        required: true },
    price: {
        type: String,
        required: true },
    beds: {
        type: Number,
        required: true }
    // savedEvents: {
    //     type: String
    // }
},
{
    versionKey: false
});

const housingmodel = mongoose.model("Housing", housingSchema);

export default housingmodel;