let selectedSlot="";
let generatedOTP="";

const restaurants=[
"Taj Restaurant Hanamkonda",
"Paradise Biryani",
"Kritunga Restaurant",
"Spicy Hub",
"Vaishnavi Grand",
"SR Grand",
"Hotel Ashoka",
"Green Bawarchi",
"Royal Kitchen",
"Hotel Haritha"
];

const theatres=[
"Asian Mukta A2 Cinemas",
"PVR Cinemas",
"INOX Warangal",
"Amrutha Theatre",
"Ramakrishna Theatre",
"Venkateshwara Theatre",
"Laxmi Theatre",
"Geetha Theatre",
"Asian Mall Cinemas",
"Shiva Theatre"
];


function loadPlaces(){

let type=document.getElementById("type").value;

let list=(type==="restaurant")?restaurants:theatres;

let place=document.getElementById("place");

place.innerHTML="";

list.forEach(p=>{

let option=document.createElement("option");
option.text=p;

place.add(option);

});

}

loadPlaces();


function selectSlot(btn){

document.querySelectorAll(".slot").forEach(b=>b.style.background="#2ecc71");

btn.style.background="orange";

selectedSlot=btn.innerText;

}


function sendOTP(){

let mobile=document.getElementById("mobile").value;

if(!/^[0-9]{10}$/.test(mobile)){

alert("Enter valid mobile number");
return;

}

generatedOTP=Math.floor(100000+Math.random()*900000);

document.getElementById("otpText").innerText="OTP: "+generatedOTP;

}


function verifyOTP(){

let otp=document.getElementById("otp").value;

if(otp==generatedOTP){

alert("OTP Verified");

}else{

alert("Wrong OTP");

}

}


function bookParking(){

let name=document.getElementById("name").value;
let mobile=document.getElementById("mobile").value;
let vehicle=document.getElementById("vehicleType").value;
let number=document.getElementById("vehicleNumber").value;
let time=document.getElementById("timeSlot").value;

if(!/^[A-Za-z ]+$/.test(name)){

alert("Name must contain alphabets only");
return;

}

if(selectedSlot===""){

alert("Select parking slot");
return;

}

if(time===""){

alert("Select time slot");
return;

}

let bookingID="SGK"+Math.floor(Math.random()*10000);

let text=

"Name: "+name+
"<br>Place: "+document.getElementById("place").value+
"<br>Slot: "+selectedSlot+
"<br>Vehicle: "+vehicle+
"<br>Vehicle No: "+number+
"<br>Time: "+time+
"<br>Booking ID: "+bookingID;

document.getElementById("ticketDetails").innerHTML=text;

document.getElementById("qrcode").innerHTML="";

new QRCode(document.getElementById("qrcode"),bookingID);

document.getElementById("popup").style.display="flex";

}


function closeTicket(){

document.getElementById("popup").style.display="none";

}