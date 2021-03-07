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

const test = Date.now();
const add = 10 * 60 * 1000;

console.log("single", test);
console.log("add", test + add);
module.exports = { dateToIsoDate, isoDateNow, addDays, addOneDay };
