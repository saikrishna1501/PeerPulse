import mongoose from "mongoose";

//Define a Mongoose schema for the "Housing" model.
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
    //Disable version key in the MongoDB document.
    versionKey: false
});

//Create a Mongoose model for the "Housing" schema.
const housingmodel = mongoose.model("Housing", housingSchema);

//Export the "Housing" model for external use.
export default housingmodel;