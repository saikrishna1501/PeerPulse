const express = require('express');
const eventRoutes = require('./routes/eventRoutes');
//const housingRoutes = require('./routes/housingRoutes'); // Assuming you have housing routes
// const blogRoutes = require('./routes/blogRoutes'); // Assuming you have blog routes
const app = express();

app.use(express.json());
app.use('/api/events', eventRoutes);
// for others
//app.use('/api/housing', housingRoutes);
//app.use('/api/blogs', blogRoutes);

module.exports = app;
