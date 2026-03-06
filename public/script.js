let selectedSlot = "";

function loadPlaces(){

const restaurants=[
"Taj Restaurant Hanamkonda",
"Spicy Hub",
"Vaishnavi Grand"
];

const select=document.getElementById("placeSelect");

select.innerHTML="";

restaurants.forEach(r=>{
let option=document.createElement("option");
option.text=r;
select.add(option);
});

}

loadPlaces();

document.querySelectorAll(".slot").forEach(slot=>{

slot.onclick=function(){

selectedSlot=this.getAttribute("data");

document.querySelectorAll(".slot").forEach(s=>s.style.background="#2ecc71");

this.style.background="orange";

}

});

function sendOTP(){

const mobile=document.getElementById("mobile").value;

if(!/^[0-9]{10}$/.test(mobile)){

alert("Enter valid mobile number");

return;

}

const otp=Math.floor(100000+Math.random()*900000);

window.generatedOTP=otp;

document.getElementById("otpDisplay").innerText="OTP: "+otp;

}

function verifyOTP(){

const otp=document.getElementById("otp").value;

if(otp==window.generatedOTP){

alert("OTP Verified");

}else{

alert("Wrong OTP");

}

}

function makePayment(){

const name=document.getElementById("name").value;
const mobile=document.getElementById("mobile").value;
const otp=document.getElementById("otp").value;
const time=document.getElementById("timeSlot").value;

if(name==""||mobile==""||otp==""||time==""||selectedSlot==""){

alert("Please fill all details");

return;

}

if(!/^[A-Za-z ]+$/.test(name)){

alert("Name should contain only alphabets");

return;

}

if(!/^[0-9]+$/.test(mobile)){

alert("Mobile should contain only numbers");

return;

}

if(!/^[0-9]+$/.test(otp)){

alert("OTP should contain only numbers");

return;

}

finishBooking();

}

function finishBooking(){

const name=document.getElementById("name").value;
const place=document.getElementById("placeSelect").value;
const vehicle=document.getElementById("vehicleType").value;
const number=document.getElementById("vehicleNumber").value;
const time=document.getElementById("timeSlot").value;

const bookingID="SGK"+Math.floor(Math.random()*10000);

const text=

"Name: "+name+
"<br>Place: "+place+
"<br>Slot: "+selectedSlot+
"<br>Parking Time: "+time+
"<br>Vehicle: "+vehicle+
"<br>Vehicle No: "+number+
"<br>Booking ID: "+bookingID;

document.getElementById("summary").innerHTML=text;

document.getElementById("qrcode").innerHTML="";

new QRCode(document.getElementById("qrcode"),bookingID);

document.getElementById("popup").style.display="flex";

}

function closePopup(){

document.getElementById("popup").style.display="none";

}