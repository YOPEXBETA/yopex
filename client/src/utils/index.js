

export const getUserLevelData = (userScore) => {
  if (userScore <= 100)
    return {
      level: 1,
      percentage: userScore,
      difference: 100 - userScore,
    };
  if (userScore > 100 && userScore <= 300)
    return {
      level: 2,
      percentage: ((userScore - 100) / 200) * 100,
      difference: 300 - userScore,
    };

  if (userScore > 300 && userScore <= 1000)
    return {
      level: 3,
      percentage: ((userScore - 300) / 700) * 100,
      difference: 1000 - userScore,
    };
  if (userScore > 1000 && userScore <= 2000)
    return {
      level: 3,
      percentage: ((userScore - 1000) / 1000) * 100,
      difference: 2000 - userScore,
    };
  if (userScore > 5000)
    return {
      level: 3,
      percentage: ((userScore - 2000) / 3000) * 100,
      difference: 5000 - userScore,
    };
};

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
