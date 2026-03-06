let selectedSlot = ""

const restaurants = [
{name:"Taj Restaurant", img:"images/taj.jpg"},
{name:"Spicy Hub", img:"images/spicyhub.jpg"}
]

const movies = [
{name:"PVR Cinemas", img:"images/pvr.jpg"},
{name:"Asian Mukta", img:"images/asian.jpg"}
]

function loadPlaces(){

let type = document.getElementById("type").value

let list = type=="restaurant" ? restaurants : movies

let select = document.getElementById("placeSelect")

select.innerHTML=""

list.forEach(p=>{
let option=document.createElement("option")
option.text=p.name
option.value=p.img
select.add(option)
})

showImage()

}

loadPlaces()

function showImage(){

document.getElementById("preview").src =
document.getElementById("placeSelect").value

}

function sendOTP(){

fetch("/send-otp",{method:"POST"})
.then(res=>res.json())
.then(data=>{
document.getElementById("otpDisplay").innerText="OTP: "+data.otp
})

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
alert(data.success?"OTP Verified":"Wrong OTP")
})

}

document.querySelectorAll(".slot").forEach(slot=>{

slot.onclick=function(){

selectedSlot=this.getAttribute("data")

document.querySelectorAll(".slot").forEach(s=>s.style.background="green")

this.style.background="orange"

}

})

function makePayment(){

document.getElementById("paymentAnimation").style.display="block"

setTimeout(()=>{

document.getElementById("paymentAnimation").style.display="none"

finishBooking()

},3000)

}

function finishBooking(){

const place=document.getElementById("placeSelect").selectedOptions[0].text
const vehicle=document.getElementById("vehicleType").value
const number=document.getElementById("vehicleNumber").value

const bookingID="SGK"+Math.floor(Math.random()*10000)

const text=
"Place:"+place+
"\nSlot:"+selectedSlot+
"\nVehicle:"+vehicle+
"\nNumber:"+number+
"\nBooking ID:"+bookingID

document.getElementById("summary").innerText=text

new QRCode(document.getElementById("qrcode"),bookingID)

startTimer()

document.getElementById("ticket").style.display="block"

}

function startTimer(){

let time=60

setInterval(()=>{
time--
document.getElementById("timer").innerText=
"Parking time remaining: "+time+" minutes"
},60000)

}

function updateCounter(){

fetch("/admin")
.then(res=>res.json())
.then(data=>{
document.getElementById("totalSlots").innerText=data.totalSlots
document.getElementById("bookedSlots").innerText=data.bookedSlots
document.getElementById("availableSlots").innerText=data.availableSlots
})

}

setInterval(updateCounter,3000)
updateCounter()