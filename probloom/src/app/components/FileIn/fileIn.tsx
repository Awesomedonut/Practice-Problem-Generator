import React, { useEffect } from 'react';
import styles from './styles.module.css'

interface FileInProps {
  onReceive: (extractedText: string) => void;
}


const FileIn: React.FC<FileInProps> = ({ onReceive }) => {
    useEffect(() => {
        const handleFileChange = async (event: any) => {
            const file = event.target.files[0];
            if (file.type === "application/pdf") {
                const reader = new FileReader();
          
                reader.onload = async (e:any) => {
                  const result = e.target?.result;
                  const typedArray = new Uint8Array(result);
          
                  if (typeof window != 'undefined') {
                    const pdfjsLib = await import('pdfjs-dist');
                    pdfjsLib.GlobalWorkerOptions.workerSrc = '/pdf.worker.js';
                    const loadingTask = pdfjsLib.getDocument({data: typedArray});
                    const pdf = await loadingTask.promise;
            
                    let extractedText = '';
            
                    for (let i = 1; i <= pdf.numPages; i++) {
                      const page = await pdf.getPage(i);
                      const textContent = await page.getTextContent();
                      const strings = textContent.items.map((item: any) => item.str);
                      extractedText += strings.join(' ') + '\n';
                    }
                    document.getElementById('outputText')!.textContent = extractedText;

                    if (extractedText && onReceive) {
                      onReceive(extractedText);
                  }
                  }
                };
          
                reader.readAsArrayBuffer(file); }
                else {
                  alert('Please upload pdf')
              }
        };

        const inputElement = document.getElementById('pdfInput');
        inputElement?.addEventListener('change', handleFileChange);

        // Cleanup function to remove the event listener
        return () => {
            inputElement?.removeEventListener('change', handleFileChange);
        };
    }, []);

    return (
        <div>
            <input type="file" data-testid="pdfInput" className={styles.pdfInput} id="pdfInput" accept="application/pdf" />
        </div>
    );
};

export default FileIn;
