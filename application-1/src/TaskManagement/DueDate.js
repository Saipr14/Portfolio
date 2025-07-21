const DueDate = ({ date }) => {
  if (!date) return null;

  const today = new Date();
  const dDate = new Date(date);

  // Normalize to midnight for date-only comparison
  const cleanToday = new Date(today.getFullYear(), today.getMonth(), today.getDate());
  const cleanDue = new Date(dDate.getFullYear(), dDate.getMonth(), dDate.getDate());

  const msPerDay = 1000 * 60 * 60 * 24;
  const diffInDays = Math.round((cleanDue - cleanToday) / msPerDay);

  // 🕒 Time part
  const timeString = dDate.toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
    hour12: true
  });

  // 📅 Date label
  let dateLabel = "";
  if (diffInDays === 0) {
    dateLabel = "Today";
  } else if (diffInDays === 1) {
    dateLabel = "Tomorrow";
  } else if (diffInDays === -1) {
    dateLabel = "Yesterday";
  } else {
    const isSameYear = today.getFullYear() === dDate.getFullYear();
    dateLabel = dDate.toLocaleDateString(undefined, {
      day: "numeric",
      month: "short",
      ...(isSameYear ? {} : { year: "numeric" })
    });
  }


  return (
    <span id="date-time" style={{fontWeight: diffInDays < 0 ? "bold" : undefined, border:"none" }}>
      {dateLabel}, {timeString}
    </span>
  );
};

export default DueDate;
