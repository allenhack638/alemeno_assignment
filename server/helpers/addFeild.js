const fs = require("fs");

// Function to add rating and reviews to each object in the JSON array
function addRatingAndReviews(jsonFilePath) {
  // Read the JSON file
  fs.readFile(jsonFilePath, "utf8", (err, data) => {
    if (err) {
      console.error("Error reading the file:", err);
      return;
    }

    try {
      // Parse the JSON data
      const jsonArray = JSON.parse(data);

      // Check if the parsed data is an array
      if (!Array.isArray(jsonArray)) {
        console.error("The JSON data is not an array.");
        return;
      }

      // Traverse through each object in the array
      jsonArray.forEach((item) => {
        // Add random rating (between 1 and 5) and reviews (between 0 and 100)
        const rating = parseFloat((Math.random() * 4 + 1).toFixed(1)); // Convert to number after formatting
        item.rating = rating;
        item.reviews = Math.floor(Math.random() * 101); // Random reviews between 0 and 100
      });

      // Convert the modified data back to JSON string
      const updatedJsonData = JSON.stringify(jsonArray, null, 2);
      console.log(updatedJsonData);

      //   Write the updated JSON data back to the file
      fs.writeFile(jsonFilePath, updatedJsonData, "utf8", (err) => {
        if (err) {
          console.error("Error writing to the file:", err);
          return;
        }
        console.log("File updated successfully with rating and reviews.");
      });
    } catch (err) {
      console.error("Error parsing JSON:", err);
    }
  });
}

// Usage example
const jsonFilePath = "../data/courses.json"; // Replace with your JSON file path
addRatingAndReviews(jsonFilePath);
