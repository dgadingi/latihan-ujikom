// const express = require('express');
// const app = express();
// const userRoutes = require('./routes/perusahaanRoutes');

// app.use(express.json());
// app.use('/api/users', userRoutes);

// module.exports = app;


const express = require('express');
const cors = require('cors');
const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
const customerRoutes = require('../src/routes/customerRoutes');
const salesRoutes = require('../src/routes/salesRoutes');
const itemRoutes = require('../src/routes/itemRoutes');
const transactionRoutes = require('../src/routes/transactionRoutes');
const petugasRoutes = require('../src/routes/petugasRoutes');
const authRoutes = require('../src/routes/authRoutes');

app.use('/api/customers', customerRoutes);
app.use('/api/sales', salesRoutes);
app.use('/api/items', itemRoutes);
app.use('/api/transactions', transactionRoutes);
app.use('/api/petugas', petugasRoutes);
app.use('/api/auth', authRoutes);

// Start server
app.listen(3000, () => console.log('Server running on port 3000'));