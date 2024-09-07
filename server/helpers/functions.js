const formatDateTime = () => {
  const now = new Date();

  const options = {
    weekday: "short",
    day: "2-digit",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: true,
    timeZone: "Asia/Kolkata", // Set time zone to IST
  };

  const formattedDate = now.toLocaleDateString("en-US", options);
  const formattedTime = now.toLocaleTimeString("en-US", options);

  return `${formattedDate}`;
};

module.exports = { formatDateTime };
