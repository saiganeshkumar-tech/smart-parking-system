let selectedSlot = "";

// Restaurants list
const restaurants = [
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

// Movie theatres list
const movies = [
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


// Load restaurant or theatre list
function loadPlaces(){

let type = document.getElementById("type").value;

let list = type === "restaurant" ? restaurants : movies;

let select = document.getElementById("placeSelect");

select.innerHTML = "";

list.forEach(place => {

let option = document.createElement("option");
option.text = place;
option.value = place;

select.add(option);

});

}

loadPlaces();


// Slot selection
document.querySelectorAll(".slot").forEach(slot => {

slot.onclick = function(){

selectedSlot = this.getAttribute("data");

document.querySelectorAll(".slot").forEach(s => s.style.background = "#2ecc71");

this.style.background = "orange";

};

});


// Send OTP
function sendOTP(){

fetch("/send-otp",{method:"POST"})
.then(res => res.json())
.then(data => {

document.getElementById("otpDisplay").innerText = "OTP: " + data.otp;

});

}


// Verify OTP
function verifyOTP(){

fetch("/verify-otp",{

method:"POST",

headers:{
"Content-Type":"application/json"
},

body:JSON.stringify({
otp:document.getElementById("otp").value
})

})

.then(res => res.json())

.then(data => {

if(data.success){
alert("OTP Verified Successfully");
}else{
alert("Wrong OTP");
}

});

}


// Payment animation
function makePayment(){

document.getElementById("paymentAnimation").style.display = "block";

setTimeout(() => {

document.getElementById("paymentAnimation").style.display = "none";

finishBooking();

},2000);

}


// Finish booking and show ticket
function finishBooking(){

const name = document.getElementById("name").value;

const place = document.getElementById("placeSelect").value;

const vehicle = document.getElementById("vehicleType").value;

const number = document.getElementById("vehicleNumber").value;

const time = document.getElementById("timeSlot").value;

const slot = selectedSlot;

const bookingID = "SGK" + Math.floor(Math.random()*10000);


// Ticket text
const text =

"👤 Name: " + name +
"<br>📍 Place: " + place +
"<br>🅿 Slot: " + slot +
"<br>⏱ Parking Time: " + time +
"<br>🚗 Vehicle: " + vehicle +
"<br>🔢 Vehicle No: " + number +
"<br>🎫 Booking ID: " + bookingID;


document.getElementById("summary").innerHTML = text;


// Clear previous QR
document.getElementById("qrcode").innerHTML = "";

// Generate QR
new QRCode(document.getElementById("qrcode"), bookingID);


// Show popup ticket
document.getElementById("popup").style.display = "flex";

}


// Close popup
function closePopup(){

document.getElementById("popup").style.display = "none";

}