const express = require('express');
const pool = require('./database');
const cors = require('cors')
const bcrypt = require('bcrypt');
const cookieParser = require('cookie-parser');
const jwt = require('jsonwebtoken');
const port = 3000;

const app = express();
app.use(cors());
app.use(express.json()); 
app.use(cookieParser());

// Get all posts
app.get("/api/Posts", async (req, res) => {
  try {
    const result = await pool.query(
      'SELECT *, u.email FROM "Posts" p JOIN "Users" u ON p.user_id = u.user_id ORDER BY p.date DESC;'
    );
    console.log("Fetched posts: ", result.rows);
    res.json(result.rows);
  } catch (err) {
    console.error(err.message);
  }
});

// Get post by ID
app.get("/api/Posts/:id", async (req, res) => {
  try {
    const result = await pool.query(
      'SELECT *, u.email FROM "Posts" p JOIN "Users" u ON p.user_id = u.user_id WHERE p.post_id = $1;', [req.params.id]
    );
    console.log("Fetched post: ", result.rows);
    res.json(result.rows);
  } catch (err) {
    console.error(err.message);
  }
});

// Get all users
app.get("/api/users", async (req, res) => {
  try {
    const result = await pool.query(
      'SELECT id, email FROM "Users" ORDER BY id'
    );
    console.log("Fetched users: ", result.rows);
    res.json(result.rows);
  } catch (err) {
    console.error(err.message);
  }
});

// Log in user
app.post("/api/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    const result = await pool.query(
      'SELECT user_id, email, password FROM "Users" WHERE email = $1', [email]
    );
    if(password == result.rows[0].password){
      console.log("Fetched user: ", result.rows);
      res.json(result.rows[0]);
    } else {
      res.status(401).json({ error: 'Invalid credentials' });
    } 
  } catch (err) {
    console.error(err.message);
  }
});

// Like a post
app.post("/api/posts/:id/like", async (req, res) => {
  const { id } = req.params;
  try {
    const result = await pool.query(
      'UPDATE "Posts" SET likes = likes + 1 WHERE id = $1 RETURNING likes', [id]);
    console.log("Updated likes: ", result.rows[0]);
    res.json(result.rows[0]);
  } catch (err) {
    console.error(err.message);
  }
});

// Check if email exists
app.get("/api/users/check/:email", async (req, res) => {
    const { email } = req.params;
    const result = await pool.query(
        'SELECT * FROM "Users" WHERE email = $1', [email]);
    res.json({exists: result.rows.length > 0});
});
 
// Create new post
app.post('/api/posts', async(req, res) => {
    try {
        console.log("a post request has arrived");
        const post = req.body;
        const newpost = await pool.query(

            'INSERT INTO "Posts"(post_id, user_id, body, date, likes) VALUES ((SELECT MAX(post_id) ' +
              'FROM "Posts")+1, $1, $2, $3, $4)    RETURNING*', [post.user, post.body, new Date(), 0]
        
        );
        console.log("new post created: ", newpost);
        res.json(newpost);
    } catch (err) {
        console.error(err.message);
    }
}); 

app.put

// Create new user
app.post('/api/users', async(req, res) => {
    try {
        console.log("a new user has arrived");
        const user = req.body;
        const newuser = await pool.query(

            'INSERT INTO "Users"(user_id, email, password) VALUES ((SELECT MAX(user_id) '+
              'FROM "Users")+1, $1, $2)    RETURNING*', [user.email, user.password]
        );
        console.log("new user created: ", newuser);
        res.json(newuser);
    } catch (err) {
        console.error(err.message);
    }
}); 

// Delete post by ID
app.delete('/api/posts/:id', async(req, res) => {
  try {
    console.log("delete a post request has arrived");
    const { id } = req.params;
    const deletepost = await pool.query(
      'DELETE FROM "Posts" WHERE post_id = $1 RETURNING*', [id]
    );
    console.log(deletepost);
    res.json(deletepost);
  } catch (err) {
    console.error(err.message);
  }
});

// Update post by ID
app.put('/api/posts/:id', async(req, res) => {
  try {
    const { id } = req.params;
    const post = req.body;
    console.log("update request has arrived");
    const updatepost = await pool.query(
      'UPDATE "Posts" SET body = $1, date = $2 WHERE post_id = $3 RETURNING*', 
      [post.body, new Date(), id]
    );
    console.log("post updated: ", updatepost);
    res.json(updatepost);
  } catch (err) {
    console.error(err.message);
  }
});


/*
// Task 3
app.get('/api/posts/:id', async(req, res) => {
    try {
        console.log("get a post with route parameter  request has arrived");
        // The req.params property is an object containing properties mapped to the named route "parameters". 
        // For example, if you have the route /posts/:id, then the "id" property is available as req.params.id.
        const { id } = req.params; // assigning all route "parameters" to the id "object"
        const posts = await pool.query( // pool.query runs a single query on the database.
            //$1 is mapped to the first element of { id } (which is just the value of id). 
            "SELECT * FROM posttable WHERE id = $1", [id]
        );
        res.json(posts.rows[0]); // we already know that the row array contains a single element, and here we are trying to access it
        // The res.json() function sends a JSON response. 
        // This method sends a response (with the correct content-type) that is the parameter converted to a JSON string using the JSON.stringify() method.
    } catch (err) {
        console.error(err.message);
    }
}); 
*/

/* 
// Task 4
app.put('/api/posts/:id', async(req, res) => {
    try {
        const { id } = req.params;
        const post = req.body;
        console.log("update request has arrived");
        const updatepost = await pool.query(
            "UPDATE posttable SET (title, body, urllink) = ($2, $3, $4) WHERE id = $1", [id, post.title, post.body, post.urllink]
        );
        res.json(updatepost);
    } catch (err) {
        console.error(err.message);
    }
});
 */

/* 
// Task 5
app.delete('/api/posts/:id', async(req, res) => {
    try {
        const { id } = req.params;
        //const post = req.body; // we do not need a body for a delete request
        console.log("delete a post request has arrived");
        const deletepost = await pool.query(
            "DELETE FROM posttable WHERE id = $1", [id]
        );
        res.json(deletepost);
    } catch (err) {
        console.error(err.message);
    }
}); 
*/

//Start the server
app.listen(port, () => {
    console.log("Server is listening to port " + port)
});