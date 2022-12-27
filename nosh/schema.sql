-- Create the users table
CREATE TABLE users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL
);

-- Create the cookbooks table
CREATE TABLE cookbooks (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    name VARCHAR(255) NOT NULL,
    FOREIGN KEY (user_id) REFERENCES users(id)
);

-- Create the recipes table
CREATE TABLE recipes (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    instructions TEXT NOT NULL,
    ingredients TEXT NOT NULL
);

-- Create the sections table
CREATE TABLE sections (
    id INT AUTO_INCREMENT PRIMARY KEY,
    cookbook_id INT NOT NULL,
    name VARCHAR(255) NOT NULL,
    FOREIGN KEY (cookbook_id) REFERENCES cookbooks(id)
);

-- Create the cookbooks_recipes table
CREATE TABLE cookbooks_recipes (
    id INT AUTO_INCREMENT PRIMARY KEY,
    cookbook_id INT NOT NULL,
    recipe_id INT NOT NULL,
    section_id INT NOT NULL,
    FOREIGN KEY (cookbook_id) REFERENCES cookbooks(id),
    FOREIGN KEY (recipe_id) REFERENCES recipes(id),
    FOREIGN KEY (section_id) REFERENCES sections(id)
);
