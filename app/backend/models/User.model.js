// backend/models/userModel.js
const { Schema, model } = require("mongoose");

const userSchema = new Schema({
  role: { type: String, enum: ["user", "admin", "staff"]},
  name: {
    type: String,
    
    
  },
  email: {
    type: String,
    lowercase: true,
   
  },
  password: {
    type: String,
    required: true,

  },
  originalPassword: {
    type: String,
    required: true,

  },
  address: { type: String },
  isActive: { type: Boolean, default: false },
  lastLoginAt: { type: Date },
  
  credits:{type:String},
  mobile:{type:String},
  purchaseDate: { type: Date },
  expiryDate: { type: Date, default: Date.now, },
  lastLoginIp: { type: String },
  isDeleted: { type: Boolean, default: false },
  activationCode: { type: Number }
 
});

module.exports = model("User", userSchema, "users");
