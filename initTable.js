const pool = require("./database");

 async function initTables() {
  const createCustomers = `
    CREATE TABLE IF NOT EXISTS customers (
      customer_id INT PRIMARY KEY AUTO_INCREMENT,
      name VARCHAR(100) NOT NULL,
      email VARCHAR(100),
        phone VARCHAR(20) NOT NULL,
      status VARCHAR(20) NOT NULL DEFAULT 'active'
    );
  `;

  const createPurchases = `
    CREATE TABLE IF NOT EXISTS purchases (
      purchase_id INT PRIMARY KEY AUTO_INCREMENT,
      customer_id INT,
      item_name VARCHAR(100),
      quantity INT,
      price DECIMAL(10,2),
      purchase_date DATETIME DEFAULT CURRENT_TIMESTAMP,
      payment_status ENUM('pending', 'completed', 'cancelled') DEFAULT 'pending',
      FOREIGN KEY (customer_id) REFERENCES customers(customer_id)
    );
  `;

  const createUsers = `
    CREATE TABLE IF NOT EXISTS users (
      id INT PRIMARY KEY AUTO_INCREMENT,
      username VARCHAR(255) NOT NULL,
      email VARCHAR(255) NOT NULL,
      password_hash VARCHAR(255) NOT NULL,
      first_name VARCHAR(100),
      last_name VARCHAR(100),
      date_of_birth DATE,
      profile_picture VARCHAR(255),
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
      last_login TIMESTAMP NULL,
      status ENUM('active', 'inactive') DEFAULT 'active'
    );
  `;

  try {
    const conn = await pool.getConnection();
    await conn.query(createCustomers);
    await conn.query(createPurchases);
    await conn.query(createUsers);
    conn.release();

    console.log("✅ Tables checked/created successfully");
  } catch (err) {
    console.error("❌ Error creating tables:", err);
  }
}

module.exports = { initTables }
