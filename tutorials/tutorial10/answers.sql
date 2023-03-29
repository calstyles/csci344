-- Exercise 1 (done for you): Selecting all columns
SELECT * FROM users;



-- Exercise 2 (done for you): Selecting some columns
SELECT id, first_name, last_name 
FROM users;



-- Exercise 3: Sorting
SELECT id, first_name, last_name FROM users ORDER BY last_name;



-- Exercise 4: Filtering
SELECT id, user_id, image_url FROM posts WHERE user_id = 26;



-- Exercise 5: Filtering with logical operators
SELECT id, user_id, image_url FROM posts WHERE user_id = 26 OR user_id = 12;



-- Exercise 6: Using functions in a select statement
SELECT count(posts) FROM posts;



-- Exercise 7: Aggregating data
SELECT user_id, COUNT(*) as count
FROM comments
GROUP BY user_id
ORDER BY count DESC;



-- Exercise 8: Joining: two tables
SELECT p.id, p.image_url, p.user_id, u.username, u.first_name, u.last_name
FROM posts p
JOIN users u
ON p.user_id = u.id
WHERE p.user_id = 26 OR p.user_id = 12;



-- Exercise 9: More joining practice: two tables
SELECT p.id, p.pub_date, f.following_id
FROM posts p 
JOIN following f
ON p.user_id = f.following_id
WHERE f.user_id = 26;



-- Exercise 10: More joining practice: three tables (Optional)




-- Exercise 11: Inserting records
INSERT INTO bookmarks (user_id, post_id, timestamp)
VALUES(26, 219, CURRENT_TIMESTAMP);

INSERT INTO bookmarks (user_id, post_id, timestamp)
VALUES(26, 220, CURRENT_TIMESTAMP);

INSERT INTO bookmarks (user_id, post_id, timestamp)
VALUES(26, 221, CURRENT_TIMESTAMP);



-- Exercise 12: Deleting records
DELETE FROM bookmarks
WHERE post_id=219;

DELETE FROM bookmarks
WHERE post_id=220;

DELETE FROM bookmarks
WHERE post_id=221;



-- Exercise 13: Updating records
UPDATE users
SET email = 'knick2022@gmail.com'
WHERE id=26;



-- Exercise 14: More Querying Practice (Optional)
