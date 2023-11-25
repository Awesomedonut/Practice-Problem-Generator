// pages/api/upload.js
import formidable from 'formidable';
import fs from 'fs';
import path from 'path';

export const config = {
  api: {
    bodyParser: false,
  },
};

export default async function handler(req, res) {
  const form = new formidable.IncomingForm();
  form.uploadDir = "./public/uploads";
  form.keepExtensions = true;
  form.parse(req, (err, fields, files) => {
    if (err) {
      res.status(500).json({ error: err });
      return;
    }

    // Here you handle the uploaded file
    // For example, you might want to rename and move it
    const oldPath = files.file.filepath;
    const newPath = path.join(form.uploadDir, files.file.originalFilename);
// After file upload is successful in the upload API
fs.rename(oldPath, newPath, async (err) => {
    if (err) {
      res.status(500).json({ error: err });
      return;
    }
  
    // Now extract text from the PDF
    try {
      const extractedText = await getTextFromPDF(newPath); // Call your text extraction function here
      res.status(200).json({ text: extractedText });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });
  
  });
}
