const CompletionDate = ({ completionDate }) => {
  if (!completionDate) return null;
  const dateObj = new Date(completionDate);
  const formatted = dateObj.toLocaleString([], {
    year: "numeric", month: "short", day: "2-digit",
    hour: "2-digit", minute: "2-digit"
  });

  // Show "Overdue" if in the past
  const now = new Date();
  const isOverdue = dateObj < now;
  return (
    <span style={{
      color: isOverdue ? "#b90000" : "#3ac3e5",
      fontWeight: isOverdue ? "bold" : undefined
    }}>
      {isOverdue ? "Overdue: " : "Completes by: "}
      {formatted}
    </span>
  );
};

export default CompletionDate;
