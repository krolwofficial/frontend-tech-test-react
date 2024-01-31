export default function formatDate(input: string): string {
  const date = new Date(input);
  const days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  const months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];

  const dayName = days[date.getDay()];
  const monthName = months[date.getMonth()];
  const dayNumber = date.getDate();
  const year = date.getFullYear();

  const ordinalIndicator =
    dayNumber > 3 && dayNumber < 21
      ? "th"
      : ["th", "st", "nd", "rd", "th", "th", "th", "th", "th", "th"][
          dayNumber % 10
        ];
  const formattedDayNumber = `${dayNumber}${ordinalIndicator}`;

  return `${dayName} ${formattedDayNumber}, ${monthName}, ${year}`;
}
