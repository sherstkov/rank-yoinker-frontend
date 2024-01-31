export function formatTime(timestamp: number) {
  if (timestamp === 0) return "";
  const date = new Date(timestamp);

  const options: Intl.DateTimeFormatOptions = {
    day: "2-digit",
    month: "short",
    year: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
  };
  let formattedDate = date.toLocaleString("ru-RU", options);
  formattedDate = formattedDate.replace(/\./g, "").replace(/ г/, "");
  return formattedDate;
}

export function formatRoundTime(milliseconds: number) {
  const totalSeconds = Math.floor(milliseconds / 1000);

  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;

  const paddedSeconds = seconds.toString().padStart(2, "0");

  return `${minutes}:${paddedSeconds}`;
}
