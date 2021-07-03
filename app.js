const months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];
const weekdays = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

//accessing dom items
const giveaway = document.querySelector('.giveaway');
const deadline = document.querySelector('.deadline');
const items = document.querySelectorAll('.deadline-format h4');

//current date
let tempDate = new Date();
let tempYear = tempDate.getFullYear();
let tempMonth = tempDate.getMonth();
let tempDay = tempDate.getDate();

//future date on which deal ends
//we add 10 days extra so that our timer is always working
let futureTime = new Date(tempYear, tempMonth, tempDay + 10, 11, 30, 0, 0);
const futureYear = futureTime.getFullYear();
const futureMonth = months[futureTime.getMonth()];
const futureDay = weekdays[futureTime.getDay()];
const futureHours = futureTime.getHours();
const futureMinutes = futureTime.getMinutes();
const futureDate = futureTime.getDate();

//appending text on dom
giveaway.textContent = `Giveaway ends on ${futureDay}, ${futureDate} ${futureMonth} ${futureYear} at ${futureHours}:${futureMinutes}am`

//converting future time into milliseconds
const futureTimeValue = futureTime.getTime();

//function for calculating remaing time and assigning values for timer
function remainingTime() {

  //today's time value in milliseconds
  const today = new Date().getTime();

  //time difference
  const timeDifference = futureTimeValue - today;
  /*
    1s = 1000ms
    1m = 60s
    1hr = 60m
    1d = 24hr
  */
 //values in miliseconds
 const oneDay = 24*60*60*1000;
 const oneHour = 60*60*1000;
 const oneMinute = 60*1000;
 
 //calculate all values
 let days = Math.floor(timeDifference/oneDay);
 let hours = Math.floor((timeDifference%oneDay)/oneHour);
 let minutes = Math.floor((timeDifference%oneHour)/oneMinute);
 let seconds = Math.floor((timeDifference%oneMinute)/1000);

 //set values
 const values = [days, hours, minutes, seconds];

 //function for appending 0 before if value if less than 10
 function format(item){
   if(item < 10){
     return (item = `0${item}`);
   }
   else{
     return item;
   }
 }

 //running loop on the items and setting values in timer
 items.forEach(function(item,index){
  item.innerHTML = format(values[index]);
 })

 //checking if timer expired
 if (timeDifference < 0) {
  clearInterval(countdown);
  deadline.innerHTML = `<h4 class="expired">sorry, this giveaway has expired!</h4>`;
}
}

// countdown;
let countdown = setInterval(remainingTime, 1000);

//set initial values
remainingTime();