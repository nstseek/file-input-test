const express = require('express');
const fs = require('fs');
const bodyParser = require('body-parser');
const cors = require('cors');

const server = express();

server.listen(7000);

server.use(cors());

server.use(bodyParser({ limit: '1mb' }));

server.post('/savepic', (req, res) => {
    fs.writeFileSync(req.body.name, req.body.data, { encoding: 'binary' });
    res.status(200);
    res.json({ message: 'pic saved' });
});
