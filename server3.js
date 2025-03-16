import express from 'express';
import fs from 'fs';

const app = express();
const port = 3000;

app.use(express.json());

// GET - Read all singers
app.get('/Singers', (req, res) => {
    fs.readFile('./data/Singers.json', 'utf8', (err, data) => {
        if (err) {
            res.status(500).send('Error reading data');
            return;
        }
        const jsonData = JSON.parse(data);
        res.send(jsonData.singers); // Send only the singers array
    });
});

// POST - Create new singer
app.post('/Singers', (req, res) => {
    fs.readFile('./data/Singers.json', 'utf8', (err, data) => {
        if (err) {
            res.status(500).send('Error reading data');
            return;
        }
        const jsonData = JSON.parse(data);
        const singers = jsonData.singers; // Access the singers array
        const newSinger = {
            id: singers.length + 1,
            name: req.body.name,
            releases: req.body.releases
        };
        singers.push(newSinger);
        fs.writeFile('./data/Singers.json', JSON.stringify(jsonData), (err) => { // Write the whole object back
            if (err) {
                res.status(500).send('Error saving data');
                return;
            }
            res.status(201).send(newSinger);
        });
    });
});

// PUT - Update existing singer
app.put('/Singers/:id', (req, res) => {
    fs.readFile('./data/Singers.json', 'utf8', (err, data) => {
        if (err) {
            res.status(500).send('Error reading data');
            return;
        }
        const jsonData = JSON.parse(data);
        const singers = jsonData.singers;
        const singerIndex = singers.findIndex(s => s.id === parseInt(req.params.id));
        if (singerIndex === -1) {
            res.status(404).send('Singer not found');
            return;
        }
        singers[singerIndex] = { ...singers[singerIndex], ...req.body };
        fs.writeFile('./data/Singers.json', JSON.stringify(jsonData), (err) => {
            if (err) {
                res.status(500).send('Error saving data');
                return;
            }
            res.send(singers[singerIndex]);
        });
    });
});

// DELETE - Remove a singer
app.delete('/Singers/:id', (req, res) => {
    fs.readFile('./data/Singers.json', 'utf8', (err, data) => {
        if (err) {
            res.status(500).send('Error reading data');
            return;
        }
        const jsonData = JSON.parse(data);
        let singers = jsonData.singers;
        const singerIndex = singers.findIndex(s => s.id === parseInt(req.params.id));
        if (singerIndex === -1) {
            res.status(404).send('Singer not found');
            return;
        }
        singers = singers.filter(s => s.id !== parseInt(req.params.id));
        jsonData.singers = singers; // Update the singers array in the object
        fs.writeFile('./data/Singers.json', JSON.stringify(jsonData), (err) => {
            if (err) {
                res.status(500).send('Error saving data');
                return;
            }
            res.status(204).send();
        });
    });
});

app.get('/', (req, res) => {
    res.send('Server is running!');
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});

