const express = require("express");
const path = require("path");

const app = express();

app.use(express.json());
app.use(express.static(path.join(__dirname,"public")));

let storedOTP="";
let bookedSlots=[];
let bookings=[];

app.post("/send-otp",(req,res)=>{

const otp=Math.floor(100000+Math.random()*900000);

storedOTP=otp;

console.log("OTP:",otp);

res.json({otp});

});

app.post("/verify-otp",(req,res)=>{

res.json({success:req.body.otp==storedOTP});

});

app.post("/book",(req,res)=>{

const data=req.body;

if(bookedSlots.includes(data.slot)){
return res.json({msg:"Slot already booked"});
}

bookedSlots.push(data.slot);
bookings.push(data);

res.json({msg:"Booking success"});

});

app.get("/admin",(req,res)=>{

res.json({
totalSlots:6,
bookedSlots:bookedSlots.length,
availableSlots:6-bookedSlots.length
});

});

app.listen(process.env.PORT||3000,()=>{
console.log("Server running");
});