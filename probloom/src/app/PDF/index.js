 // Set the worker source for PDF.js library
 pdfjsLib.GlobalWorkerOptions.workerSrc = "https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.4.120/pdf.worker.min.js";
    
 // Get references to various elements
 let pdfinput = document.querySelector(".selectpdf"); // Reference to the PDF file input field
 let upload = document.querySelector(".upload"); // Reference to the upload button
 let afterupload = document.querySelector(".afterupload"); // Reference to the result section
 let download = document.querySelector(".download"); // Reference to the download link
 let pdftext = document.querySelector(".pdftext"); // Reference to the text area for displaying extracted text
 
 //global variable to store all extracted texts
 let alltext = []; 

 // Event listener for the upload button click
 upload.addEventListener('click', () => {
     let file = pdfinput.files[0]; // Get the selected PDF file
     if (file != undefined && file.type == "application/pdf") {
         let fr = new FileReader(); // Create a new FileReader object
         fr.readAsDataURL(file); // Read the file as data URL
         fr.onload = () => {
             let res = fr.result; // Get the result of file reading
                 extractText(res); // Extract text 
         }
     } else {
         alert("Select a valid PDF file");
     }
 });

 
 
 //function to extract text from the PDF and pushing content to alltext
 async function extractText(url) {

     try {
         let pdf = await pdfjsLib.getDocument(url).promise; //get PDF document
         let pages = pdf.numPages; //get total num of pages in PDF
         
         for (let i = 1; i <= pages; i++) {
             let page = await pdf.getPage(i); // Get the page object for each page
             let txt = await page.getTextContent(); // Get the text content of the page
             let text = txt.items.map((s) => s.str).join(""); // Concatenate the text items into a single string
             alltext.push(text); // Add the extracted text to the array
         }
         afterProcess(alltext); // Display the result section
     } catch (err) {
         alert(err.message);
     }
 }
 
 // Function to handle the post-processing after text extraction
 function afterProcess(textArray) {
      // Update the text area with the concatenated text from all files
      pdftext.value += alltext.join("\n");
      pdfinput.value="";

     // Set the download link URL for the extracted text
     download.href = "data:text/plain;charset=utf-8," + encodeURIComponent(alltext); 
     download.style.display = "block";

     afterupload.style.display = "flex"; // Display the result section
     document.querySelector(".another").style.display = "unset"; // Display the "Extract Another PDF" button
    
     //edit visibility of upload button
     document.querySelector(".upload .first").style.display = "none";
     document.querySelector(".upload .second").style.display = "unset";
 }