"use strict";

function dateToIsoDate(date) {
  const [isoDate] = date.toISOString().split("T");
  return isoDate;
}

function isoDateNow() {
  return dateToIsoDate(new Date(Date.now()));
}

function addDays(isoDate, daysToAdd) {
  const daysInMs = 24 * 60 * 60 * 1000;
  const date = new Date(isoDate);
  date.setTime(date.getTime() + daysInMs * daysToAdd);
  return dateToIsoDate(date);
}

function addOneDay(isoDate) {
  return addDays(isoDate, 1);
}

// const tenm = 10 * 60 * 1000;

// const test = new Date(Date.now());
// //console.log(test.toISOString());
// const test1 = Date.now();
// console.log(test1);

const mytime = Date.now();
console.log(typeof mytime);
console.log("mytime", mytime);
const adder = 600000;
console.log(typeof adder);
const newT = adder + mytime;
console.log(typeof newT);
console.log("newt", newT);

module.exports = { dateToIsoDate, isoDateNow, addDays, addOneDay };
