DROP TABLE IF EXISTS person;
CREATE TABLE person (
	id INTEGER PRIMARY KEY,
	name TEXT,
	hometown TEXT,
	sign TEXT,
	created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
	updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TRIGGER user_data BEFORE UPDATE ON person BEGIN
UPDATE person SET updated_at = CURRENT_TIMESTAMP WHERE ID = new.id;
END;


-- INSERT INTO person (name, hometown, sign) VALUES("Tiffany", "Plymouth", "Cancer");