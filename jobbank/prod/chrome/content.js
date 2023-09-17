// Check if the "Show how to apply" button is present
var applyButton = document.querySelector('#applynowbutton');
if (applyButton) {
  // Click the button
  
  applyButton.click();
}

setTimeout(function() {

function extractPropertyContent(propertyName) {
   const element = document.querySelector(`[property="${propertyName}"]`);
   return element !== null ? element.innerText.trim() : "0";
 }

const keysToExtractForuOutput = [
      "status", 
      "datePosted", "jobId",
      "title", "companyName", "website", "email", "applyOnlineUrl",
      "minValue", "maxValue", "workHours", "medianWage", "referenceNumber",
      "addressRegion", "addressLocality", "streetAddress", "postalCode", 
      "specialInstructions", "dateSaved", "validThrough", 
      "industry", "source" 
      // "cms", "verified", "yearSiteUpdated", "aboutUrl", 
      // "portfolioUrl", "contactUrl", 
      // "programmingServer"
   ];

    // Initialize all variables to "0"
    const extractedData = {};
    keysToExtractForuOutput.forEach(variableName => {
    extractedData[variableName] = "0";
});

 var keysToExtract = [
   "title",
   "minValue",
   "maxValue",
   "addressRegion",
   "addressLocality",
   "streetAddress",
   "postalCode",
   "datePosted",
   "validThrough",
   "workHours"
 ];

 
 keysToExtract.forEach(key => {
   if (key === "datePosted") {
     extractedData[key] = extractPropertyContent(key).replace("Posted on ", "") || "0";
   } else if (key === "validThrough") {
     extractedData[key] = extractPropertyContent(key).split(' ')[0];
   } else {
     extractedData[key] = extractPropertyContent(key);
   }
 });

extractedData['workHours'] = extractedData['workHours'].replace(" hours per week", "")

extractedData['status'] = "new";
 
var emailElement = document.querySelector('h4#htaemail + p a');
extractedData["email"] = emailElement !== null ? emailElement.getAttribute('href').replace('mailto:', '') : "0";

// To be removed
var referenceNumberElement = document.querySelector('h4#htaemail + p + h4 + p');
extractedData["referenceNumber"] = referenceNumberElement !== null ? referenceNumberElement.innerText : "0";





// Find all <dt> elements within <dl>
const dtElements = document.querySelectorAll('dl dt');

// Iterate through <dt> elements and find the one with the desired text
dtElements.forEach(dtElement => {
  if (dtElement.textContent.includes("Median wage")) {
    // Find the corresponding <dd> element and extract the value
    const ddElement = dtElement.nextElementSibling;
    extractedData["medianWage"] = ddElement.textContent.trim().split(' ')[0];
  }
});






var applyOnlineElement = document.querySelector('a.btn.btn-primary');
extractedData["applyOnlineUrl"] = applyOnlineElement !== null ? applyOnlineElement.getAttribute('href') : "";


var referenceNumberElement = null;
var h4Elements = document.querySelectorAll('h4');

h4Elements.forEach(function (h4Element) {
  if (h4Element.textContent.includes("Include this reference number in your application")) {
    var nextSibling = h4Element.nextElementSibling;
    if (nextSibling && nextSibling.tagName === "P") {
      referenceNumberElement = nextSibling;
      return;
    }
  }
});

extractedData["referenceNumber"] = referenceNumberElement !== null ? referenceNumberElement.innerText : "";





var includeReference = extractedData["referenceNumber"] !== null && extractedData["referenceNumber"] !== undefined && extractedData["referenceNumber"] !== "0" ? "<br>Include this reference number " : "";




var specialInstructionsElements = document.querySelectorAll('#applynow ul');

// Filter out <ul> elements with specific IDs
specialInstructionsElements = Array.from(specialInstructionsElements).filter(function(ulElement) {
  const elementId = ulElement.closest('section').getAttribute('id');
  return elementId !== 'alert-share-container' && elementId !== 'alert-withdraw-container';
});

var specialInstructions = "";

specialInstructionsElements.forEach(function (ulElement) {
  // Check if the content contains "Job reference number" and skip it
  if (ulElement.innerText.includes("Job reference number")) {
    return;
  }

  specialInstructions += ulElement.innerText.replace(/(?:\r\n|\r|\n)/g, '<br>') + "<br>";
});

if (specialInstructionsElements.length > 0) {
  // Remove the trailing "<br>" from the last ul's content
  specialInstructions = specialInstructions.slice(0, -4);
  extractedData["specialInstructions"] = specialInstructions + includeReference + extractedData["referenceNumber"];
} else {
  extractedData["specialInstructions"] = "";
}






/*
var specialInstructionsElements = document.querySelectorAll('#applynow ul');
extractedData["specialInstructions"] = specialInstructionsElements.length > 0 ? specialInstructionsElements[0].innerText.replace(/(?:\r\n|\r|\n)/g, '<br>') + includeReference + extractedData["referenceNumber"] : "0";
*/

var companyNameElement1 = document.querySelector('span[property="hiringOrganization"] span[property="name"] a');
var companyNameElement2 = document.querySelector('span[property="hiringOrganization"] span[property="name"] strong');

extractedData["companyName"] = companyNameElement1 !== null ? companyNameElement1.innerText :
  (companyNameElement2 !== null ? companyNameElement2.innerText : "0");

// Normalize the company name and website
extractedData["companyName"] = extractedData["companyName"].toLowerCase().replace(/\b\w/g, l => l.toUpperCase());

const verifiedElement = document.querySelector('.verified.job-marker .text');
extractedData["verified"] = verifiedElement ? "yes" : "no";

var websiteElement = document.querySelector('span[property="hiringOrganization"] a');
extractedData['website'] = websiteElement !== null ? websiteElement.getAttribute('href') : "0";


if (extractedData['website'] != "0") {
   extractedData['website'] = extractedData['website'].replace(/^(https?:\/\/)?(www\.)?/, ''); // Remove protocol and "www."
   extractedData['website'] = extractedData['website'].replace(/\/$/, '').toLowerCase(); // Remove trailing slash
   // website = website.;
}

if (extractedData["email"] && extractedData['website'] === "0") {
   var atIndex = extractedData["email"].indexOf('@');
   if (atIndex !== -1) {
      extractedData['website'] = extractedData["email"].substring(atIndex + 1);
     
     var commonDomains = ["gmail.com", "yahoo.com", "outlook.com", "hotmail.com", "live.ca", "mail.com"];
     if (!commonDomains.includes(extractedData['website'])) {
       // Use the email domain as the website
       // website = websiteFromEmail;
     } else {
       // Reset websiteFromEmail to "0" for common domains
       extractedData['website'] = "0";
     }
   }
 }
 
// Split the title into separate parts

// Extract the job id from the URL
extractedData["jobId"] = document.querySelector('a[data-jobid]').getAttribute('data-jobid');
extractedData["dateSaved"] = new Date().toISOString().split('T')[0];

var urlObject = new URL(window.location.href);
extractedData['source'] = urlObject.hostname.replace(/^www\./, '').toLowerCase();

console.log(extractedData);

// Send the details to the popup
chrome.runtime.sendMessage(JSON.stringify(extractedData));

}, 1500);