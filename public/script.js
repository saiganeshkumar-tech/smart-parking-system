let selectedSlot = "";

// SLOT SELECTION

document.querySelectorAll(".slot").forEach(slot=>{

slot.addEventListener("click",function(){

selectedSlot = this.dataset.slot;

document.querySelectorAll(".slot").forEach(s=>{
s.style.background="#28a745";
});

this.style.background="orange";

});

});


// SEND OTP

function sendOTP(){

let mobile = document.getElementById("mobile").value;

fetch("/send-otp",{

method:"POST",

headers:{
"Content-Type":"application/json"
},

body:JSON.stringify({mobile:mobile})

})

.then(res=>res.json())

.then(data=>{

alert("OTP generated. Check terminal.");

});

}


// VERIFY OTP

function verifyOTP(){

let otp = document.getElementById("otp").value;

fetch("/verify-otp",{

method:"POST",

headers:{
"Content-Type":"application/json"
},

body:JSON.stringify({otp:otp})

})

.then(res=>res.json())

.then(data=>{

alert(data.message);

});

}


// BOOK SLOT

function bookSlot(){

let name = document.getElementById("name").value;

let mobile = document.getElementById("mobile").value;

let time = document.getElementById("time").value;

let restaurant = document.getElementById("restaurant").value;

if(selectedSlot == ""){

alert("Please select a parking slot");

return;

}

let details = `
Name: ${name} <br>
Phone: ${mobile} <br>
Restaurant: ${restaurant} <br>
Slot: ${selectedSlot} <br>
Time: ${time}
`;

document.getElementById("bookingDetails").innerHTML = details;

document.getElementById("popup").style.display="flex";

}


// CLOSE POPUP

function closePopup(){

document.getElementById("popup").style.display="none";

}