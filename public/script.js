let selectedSlot="";

const restaurants=[
"Taj Restaurant Hanamkonda",
"Spicy Hub Hanamkonda",
"Vaishnavi Grand",
"Hotel Ashoka",
"New Paradise",
"Kritunga Restaurant",
"SR Grand",
"Hotel Haritha",
"Royal Kitchen",
"Green Bawarchi"
];

const movies=[
"Asian Mukta A2 Cinemas",
"PVR Cinemas Hanamkonda",
"Amrutha Theatre",
"Ramakrishna Theatre",
"Venkateshwara Theatre",
"INOX Warangal",
"Asian Mall Cinemas",
"Shiva Theatre",
"Laxmi Theatre",
"Geetha Theatre"
];

function loadPlaces(){

let type=document.getElementById("type").value;

let list=type=="restaurant"?restaurants:movies;

let select=document.getElementById("placeSelect");

select.innerHTML="";

list.forEach(p=>{
let option=document.createElement("option");
option.text=p;
select.add(option);
});

}

loadPlaces();

function sendOTP(){

fetch("/send-otp",{method:"POST"})
.then(res=>res.json())
.then(data=>{
document.getElementById("otpDisplay").innerText="OTP: "+data.otp;
});

}

function verifyOTP(){

fetch("/verify-otp",{

method:"POST",

headers:{"Content-Type":"application/json"},

body:JSON.stringify({
otp:document.getElementById("otp").value
})

})

.then(res=>res.json())

.then(data=>{
alert(data.success?"OTP Verified":"Wrong OTP");
});

}

document.querySelectorAll(".slot").forEach(slot=>{

slot.onclick=function(){

selectedSlot=this.getAttribute("data");

document.querySelectorAll(".slot").forEach(s=>s.style.background="green");

this.style.background="orange";

}

});

function makePayment(){

document.getElementById("paymentAnimation").style.display="block";

setTimeout(()=>{

document.getElementById("paymentAnimation").style.display="none";

finishBooking();

},3000);

}

function finishBooking(){

const name=document.getElementById("name").value;

const place=document.getElementById("placeSelect").value;

const vehicle=document.getElementById("vehicleType").value;

const number=document.getElementById("vehicleNumber").value;

const bookingID="SGK"+Math.floor(Math.random()*10000);

const text=

"Name: "+name+
"\nPlace: "+place+
"\nSlot: "+selectedSlot+
"\nVehicle: "+vehicle+
"\nVehicle No: "+number+
"\nBooking ID: "+bookingID;

document.getElementById("summary").innerText=text;

document.getElementById("qrcode").innerHTML="";

new QRCode(document.getElementById("qrcode"),bookingID);

document.getElementById("popup").style.display="flex";

}

function closePopup(){

document.getElementById("popup").style.display="none";

}

function updateCounter(){

fetch("/admin")

.then(res=>res.json())

.then(data=>{

document.getElementById("totalSlots").innerText=data.totalSlots;
document.getElementById("bookedSlots").innerText=data.bookedSlots;
document.getElementById("availableSlots").innerText=data.availableSlots;

});

}

setInterval(updateCounter,3000);

updateCounter();