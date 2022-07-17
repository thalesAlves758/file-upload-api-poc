import express from 'express';
import cors from 'cors';
import multer from 'multer';
import aws from 'aws-sdk';
import multerS3 from 'multer-s3';
import dotenv from 'dotenv';
import crypto from 'crypto';

dotenv.config();

const storage = multerS3({
  s3: new aws.S3(),
  bucket: process.env.BUCKET_NAME,
  contentType: multerS3.AUTO_CONTENT_TYPE,
  acl: 'public-read',
  key: (req, file, cb) => {
    crypto.randomBytes(16, (err, hash) => {
      if (err) {
        cb(err);
      }

      const filename = `${hash.toString('hex')}-${file.originalname}`;

      cb(null, filename);
    });
  },
});

const upload = multer({ storage });
const app = express();

app.use(cors());
app.use(express.json());

app.post('/file', upload.single('file'), (req, res) => {
  const { originalname, size, key, location } = req.file;

  res.send({ originalname, size, key, location });
});

app.listen(5000, () => {
  console.log('Server is listening on port 5000');
});
