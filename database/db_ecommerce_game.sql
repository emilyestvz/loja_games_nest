use db_game_ecommerce;

INSERT INTO tb_products (createdAt, quantify, price, description, name) 
VALUES (current_timestamp(), 5, 99.80, 'Craft, cook, fish, and farm with friends as you live the life of your dreams and discover an enchanting adventure filled with colorful characters and a mystery to unravel.', 'Palia');
INSERT INTO tb_products (createdAt, quantify, price, description, name) 
VALUES (current_timestamp(), 10, 210.00, 'In the Elder Scrolls video game series, Argonians are a reptilian race that live in the Black Marsh swamps. They are intelligent, agile, and quick, and are well-suited for stealth and underwater activities.', 'Agonion');
INSERT INTO tb_products (createdAt, quantify, price, description, name) 
VALUES (current_timestamp(), 20, 79.90, 'A wing fighter is a starfighter used in a military unit, or fleet, and is also known as a flight wing or attack wing.', 'Wing Figther');

SELECT * FROM tb_products;
SELECT * FROM tb_categories;

select  quantify from tb_products;

ALTER TABLE tb_products CHANGE quantity quantify INT;
