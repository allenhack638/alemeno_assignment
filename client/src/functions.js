const extractWeeks = (duration) => {
  if (typeof duration !== "string") {
    return 0;
  }
  const match = duration.match(/(\d+) weeks/);
  return match ? parseInt(match[1], 10) : 0;
};

export const calculateEndDate = (enrolledDate, durationStr) => {
  try {
    const enrolledDateObj = new Date(enrolledDate);
    if (isNaN(enrolledDateObj)) {
      throw new Error("Invalid enrolled date");
    }

    const durationWeeks = extractWeeks(durationStr);
    if (durationWeeks === 0) {
      throw new Error("Invalid duration format");
    }

    const endDateObj = new Date(
      enrolledDateObj.setDate(enrolledDateObj.getDate() + durationWeeks * 7)
    );

    endDateObj.setHours(23, 59, 59, 999);

    const options = { day: "2-digit", month: "short", year: "numeric" };
    const formattedDate = endDateObj.toLocaleDateString("en-GB", options);

    return formattedDate;
  } catch (error) {
    console.error("Error calculating end date:", error.message);
    return "Invalid date";
  }
};
