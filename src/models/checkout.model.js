import mongoose from "mongoose";

const checkOutSchema = new mongoose.Schema({
userid:{
    type:String,
    require:true,
},
email:{
    type:String,
    require:true,
},
phoneNumber:{
    type:String,
    require:true,
},
Firstname:{
    type:String,
    require:true,
},
Lastname:{
    type:String,
    require:true,
},
address:{
    type:String,
    require:true,
},
postalCode:{
    type:String,
    require:true,
},
city:{
    type:String,
    require:true,
},
province:{
    type:String,
    require:true,
},
country:{
    type:String,
    default:"canada",
},
total:{
    type:String,
    require:true
},
items:[{
    prodId:{
        type:String,
        
    }
}
   
]
});
export const Checkout = mongoose.model("Checkouts", checkOutSchema);