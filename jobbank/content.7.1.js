// Check if the "Show how to apply" button is present
var applyButton = document.querySelector('#applynowbutton');
if (applyButton) {
  // Click the button
  
  applyButton.click();
}

setTimeout(function() {

var jobBankId = "0" 
var websiteFromEmail = "0";
var companyName = null;

// Get the title, meta og:url, and additional data
var titleElement = document.querySelector('title');
var title = titleElement !== null ? titleElement.innerText : "0";

var metaOgUrlElement = document.querySelector('meta[property="og:url"]');
var metaOgUrl = metaOgUrlElement !== null ? metaOgUrlElement.getAttribute('content') : "0";



function extractPropertyContent(propertyName) {
   const element = document.querySelector(`[property="${propertyName}"]`);
   return element !== null ? element.innerText.trim() : "0";
 }
 
 const extractedData = {
   minValue: extractPropertyContent("minValue"),
   maxValue: extractPropertyContent("maxValue"),
   streetAddress: extractPropertyContent("streetAddress"),
   postalCode: extractPropertyContent("postalCode"),
   datePosted: extractPropertyContent("datePosted").replace("Posted on ", "") || "0",
   ApplyByDate: extractPropertyContent("validThrough").split(' ')[0],
   workHours: extractPropertyContent("workHours").split(' ')[0]
 };
 
 console.log(extractedData);



function extractPropertyContent(propertyName) {
   const element = document.querySelector(`[property="${propertyName}"]`);
   return element !== null ? element.innerText.trim() : "0";
 }
 
var minValue = extractPropertyContent("minValue");
var maxValue = extractPropertyContent("maxValue");
var streetAddress = extractPropertyContent("streetAddress");
var postalCode = extractPropertyContent("postalCode");

var datePosted = extractPropertyContent("datePosted").replace("Posted on ", "") || "0";
var ApplyByDate = extractPropertyContent("validThrough").split(' ')[0];
var workHours = extractPropertyContent("workHours").split(' ')[0];

var emailElement = document.querySelector('h4#htaemail + p a');
var email = emailElement !== null ? emailElement.getAttribute('href').replace('mailto:', '') : "0";

var companyNameElement1 = document.querySelector('span[property="hiringOrganization"] span[property="name"] a');
var companyNameElement2 = document.querySelector('span[property="hiringOrganization"] span[property="name"] strong');

if (companyNameElement1 !== null) {
    companyName = companyNameElement1.innerText;
} else if (companyNameElement2 !== null) {
    companyName = companyNameElement2.innerText;
}


console.log(propertyData);

// If companyName is still null, set it to "0"
if (companyName === null) {
    companyName = "0";
}

var verifiedElement = document.querySelector('.verified.job-marker .text');
var verified = verifiedElement !== null ? "1" : "0";

// Normalize the company name and website
companyName = companyName.toLowerCase().replace(/\b\w/g, l => l.toUpperCase());

var websiteElement = document.querySelector('span[property="hiringOrganization"] a');
var website = websiteElement !== null ? websiteElement.getAttribute('href') : "0";

if (website != "0") {
   var website = website.replace(/^(https?:\/\/)?(www\.)?/, ''); // Remove protocol and "www."
   website = website.replace(/\/$/, '').toLowerCase(); // Remove trailing slash
   // website = website.;
 }


if (email && website === "0") {
   var atIndex = email.indexOf('@');
   if (atIndex !== -1) {
     websiteFromEmail = email.substring(atIndex + 1);
     
     var commonDomains = ["gmail.com", "yahoo.com", "outlook.com", "hotmail.com", "live.ca", "mail.com"];
     if (!commonDomains.includes(websiteFromEmail)) {
       // Use the email domain as the website
       // website = websiteFromEmail;
     } else {
       // Reset websiteFromEmail to "0" for common domains
       websiteFromEmail = "0";
     }
   }
 }
 
// Split the title into separate parts
var titleParts = title.split(' - ');

// Extract the job id from the URL
var jobIdUrl = metaOgUrl.split('/').pop();

// Further split the location into city and province
var locationParts = titleParts[1].split(', ');

var dateSaved = new Date().toISOString().split('T')[0];

var urlObject = new URL(window.location.href);
var source = urlObject.hostname.replace(/^www\./, '');

// Convert the source to lowercase
source = source.toLowerCase();

// var headings = `"ID", "Title", "companyName", "website", "Email", "MinRate", "MaxRate", "workHours", "City", "Province", "streetAddress", "postalCode"<br>`;

// Combine all parts into a single string
var output = `"new", "${jobIdUrl}", "${jobBankId}", "${titleParts[0]}", "${ApplyByDate}", "applyformula", "${companyName}", "${website}", "${websiteFromEmail}", "${email}", "industry", "${minValue}", "${maxValue}", "${workHours}", "${locationParts[0]}", "${locationParts[1]}", "${streetAddress}", "${postalCode}", "", "", "", "", "", "", "", "", "${source}", "${dateSaved}", "${datePosted}", "${verified}"`;

console.log(output);

// Send the details to the popup
browser.runtime.sendMessage(output);

}, 2500);