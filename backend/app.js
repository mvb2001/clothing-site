const express = require('express');
const db = require('./db'); // Ensure this points to your MySQL connection file
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const app = express();

// Middleware to parse JSON data
app.use(express.json());

// Middleware for role-based access (admin)
const adminMiddleware = (req, res, next) => {
    if (req.user && req.user.role === 'admin') {
        next();
    } else {
        res.status(403).json({ message: 'Access denied: Admins only' });
    }
};

app.post('/signup', async (req, res) => {
    const { username, email, password, role } = req.body;

    // harida input
    if (!username || !email || !password || !role) {
        return res.status(400).json({ message: 'All fields are required' });
    }

    //role harida
    if (role !== 'admin' && role !== 'customer') {
        return res.status(400).json({ message: 'Invalid role. Choose either "admin" or "customer".' });
    }

    // Check user innawada
    db.query('SELECT * FROM users WHERE email = ?', [email], async (err, results) => {
        if (err) return res.status(500).json({ message: 'Error checking user existence' });

        if (results.length > 0) {
            return res.status(400).json({ message: 'User already exists' });
        }

        // password dot krn eka
        const hashedPassword = await bcrypt.hash(password, 10);

        // Insert the new user into the database with role
        db.query('INSERT INTO users (username, email, password, role) VALUES (?, ?, ?, ?)', 
            [username, email, hashedPassword, role], (err, result) => {
            if (err) return res.status(500).json({ message: 'Error creating user' });

            res.status(201).json({ message: 'User registered successfully' });
        });
    });
});


app.post('/login', (req, res) => {
    const { email, password } = req.body;

    db.query('SELECT * FROM users WHERE email = ?', [email], async (err, results) => {
        if (err || results.length === 0) return res.status(401).json({ message: 'Invalid credentials' });

        const user = results[0];
        const match = await bcrypt.compare(password, user.password);

        if (!match) return res.status(401).json({ message: 'Invalid credentials' });

        // Generate JWT token with user id, role, and expiration time
        const token = jwt.sign({ id: user.id, role: user.role }, 'your-secret-key', {
            expiresIn: '1h', // Token will expire in 1 hour
        });

        // Send response with the token, username, role, and success message
        res.json({
            token,
            username: user.username,
            role: user.role,
            message: 'User logged in successfully',
        });
    });
});


// Middleware to verify the JWT token for authentication
const verifyToken = (req, res, next) => {
    const token = req.headers['authorization'] && req.headers['authorization'].split(' ')[1];
    if (!token) return res.status(403).json({ message: 'Token required' });

    jwt.verify(token, 'your-secret-key', (err, user) => {
        if (err) return res.status(403).json({ message: 'Invalid or expired token' });
        req.user = user;
        next();
    });
};

// User routes
app.get('/clothes', (req, res) => {
    db.query('SELECT * FROM clothes', (err, results) => {
        if (err) return res.status(500).json({ message: 'Error fetching clothes' });
        res.json(results);
    });
});

// Admin routes (must be authenticated as an admin)
app.use(verifyToken);

// Add new clothes (admin only)
app.post('/admin/clothes', adminMiddleware, (req, res) => {
    const { name, category, price, description, image_url } = req.body;
    db.query('INSERT INTO clothes (name, category, price, description, image_url) VALUES (?, ?, ?, ?, ?)', [name, category, price, description, image_url], (err) => {
        if (err) return res.status(500).json({ message: 'Error adding clothes' });
        res.json({ message: 'Clothing item added successfully' });
    });
});

// Update clothing item (admin only)
app.put('/admin/clothes/:id', adminMiddleware, (req, res) => {
    const { id } = req.params;
    const { name, category, price, description, image_url } = req.body;

    db.query('UPDATE clothes SET name = ?, category = ?, price = ?, description = ?, image_url = ? WHERE id = ?', [name, category, price, description, image_url, id], (err) => {
        if (err) return res.status(500).json({ message: 'Error updating clothes' });
        res.json({ message: 'Clothing item updated successfully' });
    });
});

// Delete clothing item (admin only)
app.delete('/admin/clothes/:id', adminMiddleware, (req, res) => {
    const { id } = req.params;
    db.query('DELETE FROM clothes WHERE id = ?', [id], (err) => {
        if (err) return res.status(500).json({ message: 'Error deleting clothes' });
        res.json({ message: 'Clothing item deleted successfully' });
    });
});

// Start the server
const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
