import PyPDF2
import json
# Open the PDF file

def pdf_function():
    with open('path_to_your_pdf_file.pdf', 'rb') as file:
        reader = PyPDF2.PdfReader(file)

        # Initialize an empty string to store all the text
        text = ""

        # Iterate through each page and extract text
        for page in reader.pages:
            text += page.extract_text() + "\n"

        # Now `text` contains all the text from the PDF
        return json.loads(text)
    
if __name__ == "__main__":
    output = pdf_function()
    print(output)
