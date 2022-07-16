import express from 'express';
import cors from 'cors';
import path from 'path';
import { fileURLToPath } from 'url';
import fs from 'fs';
import multer from 'multer';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const UPLOAD_DIR = path.join(__dirname, 'uploads');

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    if (!fs.existsSync(UPLOAD_DIR)) {
      fs.mkdirSync(UPLOAD_DIR);
    }

    cb(null, UPLOAD_DIR);
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

const upload = multer({ storage });
const app = express();

app.use(cors());
app.use(express.json());

app.post('/file', upload.single('file'), (req, res) => {
  res.send('deu certo');
});

app.listen(5000, () => {
  console.log('Server is listening on port 5000');
});
