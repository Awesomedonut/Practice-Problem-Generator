// pages/api/extractPDF.js
import { PDFExtract } from 'pdf.js-extract';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method Not Allowed' });
  }

  // Assuming you receive the file path in the request body
  const { filePath } = req.body;

  const pdfExtract = new PDFExtract();
  const options = {}; // Customizable

  try {
    const buffer = fs.readFileSync(filePath);
    const data = await pdfExtract.extractBuffer(buffer, options);
    let fullText = '';

    data.pages.forEach(page => {
      page.content.forEach(item => {
        fullText += item.str + ' ';
      });
    });

    res.status(200).json({ text: fullText });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}
