import express from 'express';
import fs from 'fs'; // Added fs import

const app = express();
const PORT = process.env.PORT || 3000;

app.get('/favicon.ico', 
    
    
    (req, res) => {
    res.status(204).end(); // 204 = No Content (suppresses the error)
});

app.get('/Singers', (req, res) => { // Fixed route path
    fs.readFile('./data/Singers.json', 'utf8', (err, data) => {
        if (err) {
            res.status(500).send('Error reading singers data');
            return;
        }
        res.send(data);
    });
});

app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});
