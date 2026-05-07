const bcrypt = require("bcryptjs");
const db = require("./db");

async function seedAdmin() {
  try {
    const email = "admin@example.com";
    const password = Math.random().toString(36).slice(-12) + "aA1!";

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const [result] = await db.execute(
      "INSERT INTO users (email, password_hash) VALUES (?, ?)",
      [email, hashedPassword],
    );

    console.log("Admin user created successfully!");
    console.log(`Email: ${email}`);
    console.log(`Temporary Password: ${password}`);
    console.log(" Please change this password immediately!");
  } catch (error) {
    if (error.code === "ER_DUP_ENTRY") {
      console.log("Admin user already exists in the database.");
    } else {
      console.error(
        "Error creating admin (Check your DB password in .env):",
        error.message,
      );
    }
  } finally {
    process.exit();
  }
}

seedAdmin();
