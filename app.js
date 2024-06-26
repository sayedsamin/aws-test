const express = require("express");
const bcrypt = require("bcrypt");
// const serverless = require("serverless-http");
const app = express();
// const port = 80; // Default HTTP port

app.get("/", (req, res) => {
  res.send("Hello, World!");
});

// Simulated database request function
function simulateDatabaseRequest() {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve({ data: "This is a simulated database response" });
    }, 500); // Simulating a 100ms delay for the database request
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

async function hashPassword(password) {
  try {
    const saltRounds = 10; // Number of salt rounds for bcrypt (can be adjusted)
    const hashedPassword = await bcrypt.hash(password, saltRounds);
    return hashedPassword;
  } catch (error) {
    console.error("Error hashing password:", error);
    throw error;
  }
}

app.get("/hash", async (req, res) => {
  try {
    const plainTextPassword = "yourPassword123";
    const hashedPassword = await hashPassword(plainTextPassword);
    res.json(hashedPassword);
  } catch (error) {
    res.status(500).json({ error: "Something went wrong" });
  }
});

// app.listen(port, () => {
//   console.log(`Example app listening at http://localhost:${port}`);
// });

const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

// module.exports.handler = serverless(app);
