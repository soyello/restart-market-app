CREATE TABLE users(
  id VARCHAR(255) PRIMARY KEY DEFAULT (UUID()),
  name VARCHAR(255) NULL,
  email VARCHAR(255) UNIQUE NOT NULL,
  email_verified DATETIME NULL,
  image VARCHAR(255) NULL,
  hashed_password VARCHAR(255) NULL,
  user_type ENUM('User','Admin') DEFAULT 'User'
);

alter table users
add column created_at timestamp default current_timestamp,
add column updated_at timestamp default current_timestamp on update current_timestamp;

CREATE TABLE sessions(
  id VARCHAR(255) PRIMARY KEY DEFAULT(UUID()),
  session_token VARCHAR(255) UNIQUE NOT NULL,
  user_id VARCHAR(255) NOT NULL,
  expires DATETIME NOT NULL,
  CONSTRAINT fk_session_user_id FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

CREATE TABLE products(
  id INT PRIMARY KEY AUTO_INCREMENT,
  title VARCHAR(255) NOT NULL,
  description TEXT NOT NULL,
  image_src VARCHAR(255) NOT NULL,
  category VARCHAR(255) NOT NULL,
  user_id VARCHAR(255) NOT NULL,
  price INT NOT NULL,
  latitude FLOAT NOT NULL,
  longitude FLOAT NOT NULL,
  created_at DATETIME DEFAULT current_timestamp,
  updated_at DATETIME DEFAULT current_timestamp on update current_timestamp,

  FOREIGN KEY(user_id) REFERENCES users(id) ON DELETE CASCADE
);

CREATE TABLE conversations (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAr(255) DEFAULT NULL,
  sender_id VARCHAR(255) NOT NULL,
  receiver_id VARCHAR(255) NOT NULL,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (sender_id) REFERENCES users(id),
  FOREIGN KEY (receiver_id) REFERENCES users(id)
);

CREATE TABLE messages(
  id INT AUTO_INCREMENT PRIMARY KEY,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  text TEXT DEFAULT NULL,
  image VARCHAR(255) DEFAULT NULL,
  sender_id VARCHAR(255) NOT NULL,
  receiver_id VARCHAR(255) NOT NULL,
  conversation_id INT NOT NULL,
  FOREIGN KEY (sender_id) REFERENCES users(id),
  FOREIGN KEY (receiver_id) REFERENCES users(id),
  FOREIGN KEY (conversation_id) REFERENCES conversations(id)
)