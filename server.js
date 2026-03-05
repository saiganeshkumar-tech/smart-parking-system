const express = require("express");
const path = require("path");

const app = express();

app.use(express.json());
app.use(express.static(path.join(__dirname,"public")));

let storedOTP = "";
let bookedSlots = []; // store booked slots

// Send OTP
app.post("/send-otp",(req,res)=>{

const otp = Math.floor(100000 + Math.random()*900000);

storedOTP = otp;

console.log("Generated OTP:",otp);

res.json({message:"OTP sent"});

});

// Verify OTP
app.post("/verify-otp",(req,res)=>{

const userOTP = req.body.otp;

if(userOTP == storedOTP){
res.json({message:"OTP Verified"});
}else{
res.json({message:"Invalid OTP"});
}

});

// Book Slot
app.post("/book-slot",(req,res)=>{

const slot = req.body.slot;

if(bookedSlots.includes(slot)){
return res.json({message:"Slot already booked"});
}

bookedSlots.push(slot);

console.log("Booked Slots:",bookedSlots);

res.json({message:"Slot booked successfully"});

});

// Get booked slots
app.get("/slots",(req,res)=>{

res.json({bookedSlots});

});

app.listen(3000,()=>{
console.log("Server running on port 3000");
});