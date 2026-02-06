const express = require('express');
const fs = require('fs');
const app = express();

app.use(express.json());
app.use(express.static('.'));

app.post('/save', (req, res) => {
    const entry = req.body;
    fs.readFile('database.json', 'utf8', (err, data) => {
        let list = [];
        if (!err && data) list = JSON.parse(data);
        list.push(entry);
        fs.writeFile('database.json', JSON.stringify(list, null, 2), (err) => {
            if (err) return res.status(500).send("Error");
            res.send("Saved");
        });
    });
});

app.listen(3000, () => console.log('Go to: http://localhost:3000'));