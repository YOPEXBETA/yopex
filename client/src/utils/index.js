


export const timeSince = (date) => {
  const providedDate = new Date(date);
  const currentDate = new Date();
  const elapsed = currentDate.getTime() - providedDate.getTime();
  const seconds = Math.floor(elapsed / 1000);
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);
  if (days > 0) return `${days} day${days > 1 ? "s" : ""} `;
  if (hours > 0) return `${hours} hour${hours > 1 ? "s" : ""} `;
  if (minutes > 0) return `${minutes} minute${minutes > 1 ? "s" : ""} `;
  return "just now";
};
