'use strict';

import express from 'express';
import path from 'path';

import { dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = path.join(__dirname, 'build')

// Constants
const PORT = process.env.PORT || 80;

const app = express();

// the __dirname is the current directory from where the script is running
app.use(express.static(root));
app.get('/*', function (req, res) {
  res.sendFile('index.html', {root, path:''});
});

app.listen(PORT, () => {
  console.log(`Running on port ${PORT}`);
});
