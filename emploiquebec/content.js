// Check if the "Show how to apply" button is present
var applyButton = document.querySelector('#applynowbutton');
if (applyButton) {
  // Click the button
  applyButton.click();
}

setTimeout(function() {
// Get the title, meta og:url, and additional data

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
var extractedJobId = match !== null ? match[0].match(/\d+/)[0] : "0";

// Construct the URL with the extracted number
var url = `https://www.quebecemploi.gouv.qc.ca/manitouLS/cache/postingJsonCS/${extractedJobId}/fr`;

// extract domain from email
// extract email
// extract address

fetch(url)
  .then(response => response.json())
  .then(jsonData => {
    // Display the received JSON data
   // console.log("Received JSON Data:", jsonData);

  // Define an array of label names you want to extract
const labelsToExtract = [

   "Appellation d'emploi",
   "ApplyByDate",
   "reserved",
   "Employeur",
   "Site web",
   "websiteFromEmail",
   "email",
   "industry",
   "Salaire minimal",
   "Salaire maximal",
   "Nombre d'heures",
   "Adresse du lieu de travail",
   "Province,",
   "streetAddress,",
   "postalCode,",
   "reserved",
   "reserved",
   "reserved",
   "reserved",
   "reserved",
   "reserved",
   "reserved",
   "reserved",
   "Publiée depuis le",
   "Personne à contacter",
   "Date de début d'emploi",
   "Durée d'emploi",
   "source",
   "dateSaved",

   // Add more label names here
 ];
 
 // Create an object to store the extracted content for each label
 const extractedContent = {};
 let output = '';

// Convert the source to lowercase
extractedContent["status"] = "new";

extractedContent["jobId"] = extractedContent["jobBankId"] = `${extractedJobId}`;

  // Iterate through the body array to find the required values
 // const extractedContent = {};

 jsonData.body.forEach(item => {
   if (labelsToExtract.includes(item.label)) {
     const { label, content } = item;
     extractedContent[label] = sanitizeContent(content);
   } else {
     // Set the value to zero for labels that are not found
     extractedContent[item.label] = 0;
   }
 });

 for (const label in extractedContent) {
   output += `"${extractedContent[label]}", `;
 }

console.log(output);


var urlObject = new URL(window.location.href);
var source = urlObject.hostname.replace(/^www\./, '');
extractedContent['source'] = source.toLowerCase();

extractedContent["dateSaved"] = new Date().toISOString().split('T')[0];


 // Iterate through the extractedContent and sanitize the values
for (const label in extractedContent) {
   extractedContent[label] = sanitizeContent(extractedContent[label]);
} 
 
 // Now you can access the extracted content using the label as the key in the extractedContent object
console.log("Extracted Content:", extractedContent);
 
// var output = extractedContent;

// Send the details to the popup
browser.runtime.sendMessage(output);

  })
  .catch(error => {
    console.error("Error:", error);
  });

 

// var headings = `"ID", "Title", "companyName", "website", "Email", "MinRate", "MaxRate", "workHours", "City", "Province", "streetAddress", "postalCode"<br>`;

// Combine all parts into a single string
// var output = `"new", "${jobIdUrl}", "${jobBankId}", "${titleParts[0]}", "${ApplyByDate}", "applyformula", "${companyName}", "${website}", "${websiteFromEmail}", "${email}", "industry", "${minValue}", "${maxValue}", "${workHours}", "${locationParts[0]}", "${locationParts[1]}", "${streetAddress}", "${postalCode}", "reserved", "reserved", "reserved", "reserved", "reserved", "reserved", "reserved", "reserved", "${source}", "${currentDate}"`;


}, 500);
