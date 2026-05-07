const bcrypt = require("bcryptjs");
const db = require("./db");

async function seedAdmin() {
  try {
    const email = "admin@example.com";
    const password = "password123"; 
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const [result] = await db.execute(
      "INSERT INTO users (email, password_hash) VALUES (?, ?)",
      [email, hashedPassword],
    );

    console.log("Admin user created successfully!");
    console.log(`Email: ${email}`);
    console.log(`Password: ${password}`);
    console.log(" You can now login with these credentials");
  } catch (error) {
    if (error.code === "ER_DUP_ENTRY") {
      console.log("ℹAdmin user already exists in the database.");
      console.log(`Email: admin@example.com`);
      console.log(` Password: password123`);
    } else {
      console.error(
        " Error creating admin (Check your DB password in .env):",
        error.message,
      );
    }
  } finally {
    process.exit();
  }
}

seedAdmin();
