import express from "express";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

// Get the directory name for ES module compatibility
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Initialize the express app
const app = express();

// Define the port
const PORT = 3000;

// Middleware to parse JSON
app.use(express.json());

// Serve static files (like HTML and CSS)
app.use(express.static(path.join(__dirname, "public"))); /// chú ý đây là file mà nó sẽ hiện giao diện

// Endpoint for login
app.post("/login", (req, res) => {
  const { username, password } = req.body;
  const userFilePath = path.join(__dirname, "user.txt"); //// đây là địa chỉ mà app nó sẽ đọc đc cái dữ liệu data

  // Read the user.txt file to get stored credentials
  fs.readFile(userFilePath, "utf8", (err, data) => {
    if (err) {
      res.json({ message: "Error reading user file" });
      return;
    }

    // Extract stored username and password from file user.txt compare
    const [storedUsername, storedPassword] = data
      .split(",")
      .map((item) => item.trim()); /// để loại bỏ 2 khoảng trắng 2 đầu khi cắt chuỗi

    // Check credentials
    if (username === storedUsername && password === storedPassword) {
      res.json({ message: `Login successful! Welcome, ${storedUsername}.` });
    } else {
      res.json({ message: "Login failed! Incorrect username or password." });
    }
  });
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
