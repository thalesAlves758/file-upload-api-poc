import express from 'express';
import cors from 'cors';
import formidable from 'formidable';
import path from 'path';
import { fileURLToPath } from 'url';
import fs from 'fs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const UPLOAD_DIR = path.join(__dirname, 'uploads');

const app = express();

app.use(cors());
app.use(express.json());

app.post('/file', (req, res) => {
  if (!fs.existsSync(UPLOAD_DIR)) {
    fs.mkdirSync(UPLOAD_DIR);
  }

  const form = new formidable.IncomingForm({
    uploadDir: UPLOAD_DIR,
    keepExtensions: true,
  });

  form.parse(req, (err, fields, files) => {
    if (err) {
      res.status(500).send({ error: 'Erro ao salvar o arquivo' });
    }

    res.send('deu certo');
  });
});

app.listen(5000, () => {
  console.log('Server is listening on port 5000');
});
