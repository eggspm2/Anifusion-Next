"use client";

export const WeekDay = () => {
  let current = new Date();
  let week = [{}];
  let names = [
    "Minggu",
    "Senin",
    "Selasa",
    "Rabu",
    "Kamis",
    "Jumat",
    "Sabtu",
  ];
  for (let i = 0; i < 7; i++) {
    let First = current.getDate() - current.getDay() + i;
    let day = new Date(current.setDate(First)).toISOString().slice(0, 10);
    let name = names[i];
    week.push({
      day: day,
      name: name,
      id:i
    });
  }
  return week.slice(1,8);
};
