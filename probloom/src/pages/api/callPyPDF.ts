// pages/api/callPython.ts
import type { NextApiRequest, NextApiResponse } from 'next';
import { spawn } from 'child_process';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const pythonProcess = spawn('python', ['./src/scripts/pyScript.py']);

  pythonProcess.stdout.on('data', (data) => {
    try {
      const jsonData = JSON.parse(data.toString());
      res.status(200).json(jsonData);
    } catch (error) {
      res.status(500).json({ error: 'Error parsing JSON from Python script' });
    }
  });

  pythonProcess.stderr.on('data', (data) => {
    console.error(`stderr: ${data.toString()}`);
    res.status(500).json({ error: data.toString() });
  });

  pythonProcess.on('close', (code) => {
    console.log(`child process exited with code ${code}`);
  });
}
