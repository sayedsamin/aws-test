const express = require("express");
const app = express();
const port = 80; // Default HTTP port

app.get("/", (req, res) => {
  res.send("Hello, World!");
});

// Simulated database request function
function simulateDatabaseRequest() {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve({ data: "This is a simulated database response" });
    }, 100); // Simulating a 100ms delay for the database request
  });
}

// Route that mimics a database request
app.get("/db-request", async (req, res) => {
  try {
    const result = await simulateDatabaseRequest();
    res.json(result);
  } catch (error) {
    res.status(500).json({ error: "Something went wrong" });
  }
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
