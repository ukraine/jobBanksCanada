
function sanitizeContent(content) {
   var tempDiv = document.createElement('div');
   tempDiv.innerHTML = content;
   return tempDiv.textContent || tempDiv.innerText || '';
 }

var titleElement = document.querySelector('title');
var title = titleElement !== null ? titleElement.innerText : "0";

// Regular expression to match the first number followed by a separator
var match = title.match(/\d+(\s-\s|&mdash;)/);

// Extract the matched number or use "0" if no match found
var extractedValue = match !== null ? match[0].match(/\d+/)[0] : "0";

// Construct the URL with the extracted number
var url = `https://www.quebecemploi.gouv.qc.ca/manitouLS/cache/postingJsonCS/${extractedValue}/fr`;

fetch(url)
  .then(response => response.json())
  .then(jsonData => {
    // Display the received JSON data
    console.log("Received JSON Data:", jsonData);

  // Define an array of label names you want to extract
const labelsToExtract = [
   "Adresse du lieu de travail",
   "Employeur",
   "Site web",
   "Date de début d'emploi",
   "Salaire minimal",
   "Publiée depuis le",
   "Appellation d'emploi",
   "Titre du poste",
   "Personne à contacter",
   "Date de début d'emploi",
   "Nombre d'heures",
   "Durée d'emploi",

   // Add more label names here
 ];
 
 // Create an object to store the extracted content for each label
 const extractedContent = {};
 
 // Iterate through the body array to find the required values
 jsonData.body.forEach(item => {
   if (labelsToExtract.includes(item.label)) {
     extractedContent[item.label] = item.content;
    }
 });

 // Iterate through the extractedContent and sanitize the values
for (const label in extractedContent) {
   extractedContent[label] = sanitizeContent(extractedContent[label]);
} 
 
 // Now you can access the extracted content using the label as the key in the extractedContent object
console.log("Extracted Content:", extractedContent);
 
  })
  .catch(error => {
    console.error("Error:", error);
  });

  var output = extractedContent