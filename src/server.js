const app = require('./app');
const gracefulShutdown = require('./utils/gracefulShutdown');
const initUploadsDirs = require('./utils/initUploadsDirs');
const port = process.env.PORT;

initUploadsDirs();

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});

process.on('SIGINT', () => gracefulShutdown('SIGINT'));
process.on('SIGTERM', () => gracefulShutdown('SIGTERM'));
