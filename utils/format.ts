function formatDate(unixTimestamp: number): string {
  const date = new Date(unixTimestamp * 1000);

  const days = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"];
  const months = [
    "JAN",
    "FEB",
    "MAR",
    "APR",
    "MAY",
    "JUN",
    "JUL",
    "AUG",
    "SEP",
    "OCT",
    "NOV",
    "DEC",
  ];

  const dayName = days[date.getDay()]; // ใช้ getDay() แทน getUTCDay()
  const day = String(date.getDate()).padStart(2, "0"); // getDate() แทน getUTCDate()
  const month = months[date.getMonth()]; // getMonth() แทน getUTCMonth()
  const year = date.getFullYear();

  return `${dayName}, ${day} ${month} ${year}`;
}

function formatTime(unixTimestamp: number): string {
  const date = new Date(unixTimestamp * 1000);

  const hours = String(date.getHours()).padStart(2, "0");
  const minutes = String(date.getMinutes()).padStart(2, "0");

  return `${hours}:${minutes}`;
}

function formatTourDateRange(startDate: string, endDate: string): string {
  if (!startDate || !endDate) return "";

  const start = new Date(startDate);
  const end = new Date(endDate);

  // เดือนแบบย่อเป็นภาษาอังกฤษ (JAN, FEB, MAR, ...)
  const monthNames = [
    "JAN",
    "FEB",
    "MAR",
    "APR",
    "MAY",
    "JUN",
    "JUL",
    "AUG",
    "SEP",
    "OCT",
    "NOV",
    "DEC",
  ];

  const startDay = start.getDate();
  const endDay = end.getDate();
  const startMonth = monthNames[start.getMonth()];
  const endMonth = monthNames[end.getMonth()];
  const year = start.getFullYear();

  // ถ้าอยู่เดือนเดียวกัน
  if (startMonth === endMonth) {
    return `${startDay}-${endDay} ${startMonth} ${year}`;
  }

  // ถ้าอยู่คนละเดือน
  return `${startDay} ${startMonth} - ${endDay} ${endMonth} ${year}`;
}

function formatNumber(amount: number | string | null | undefined) {
  const n = Number(amount);
  if (!Number.isFinite(n)) return "0.00";
  return n.toLocaleString("en-US", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
}

export { formatDate, formatTime, formatTourDateRange, formatNumber };
