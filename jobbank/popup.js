document.addEventListener("DOMContentLoaded", function() {

const statusMessageDiv = document.getElementById('statusMessage');

// Get the current tab
browser.tabs.query({active: true, currentWindow: true}, function(tabs) {
   // Inject the script into the current tab
   browser.tabs.executeScript(tabs[0].id, {file: "content.js"});

   const url = new URL(tabs[0].url);
   const primaryDomain = url.hostname;
   const sourceUrlTemplate = "jobsearch/jobposting/";
   const pluginName = 'CanaDreemJoeb'

   statusMessageDiv.style.display = 'inline';

   if (url.href.includes(sourceUrlTemplate)) statusMessageDiv.innerText = 'Analyzing job posting...';
   else statusMessageDiv.innerHTML = `I\'m sorry, this page is not yet supported. Please <a target='_blank' href='https://yatsiv.com/f/${pluginName}?other=${primaryDomain}'>click here</a> if you want us to enable it`;

 });

 // Listen for messages from the content script
 browser.runtime.onMessage.addListener(function(message) {
   // Display the details in the popup

   statusMessageDiv.style.display = 'none';
   
   const extractedData = JSON.parse(message);

   const keysToExtractForuOutput = {
      "status": {
        name: "Status",
        value: "0"
      },
      "dateSaved": {
         name: "Saved Date",
         value: ""
       },
      "jobId": {
        name: "Job ID",
        value: ""
      },
      "title": {
        name: "Job Title",
        value: ""
      },
      "companyName": {
        name: "Company",
        value: ""
      },
      "verified": {
        name: "Verified",
        value: ""
      },
      "website": {
        name: "Website",
        value: ""
      },
      "applyOnlineUrl": {
         name: "Apply online",
         value: ""
       },
      "email": {
        name: "Email",
        value: ""
      },
      "specialInstructions": {
         name: "Instructions to follow and questions to be answered",
         value: ""
       }, 
      "referenceNumber": {
         name: "Reference #",
         value: ""
       },
      "minValue": {
        name: "Min. Salary",
        value: ""
      },
      "maxValue": {
        name: "Max. Salary",
        value: ""
      },
      "workHours": {
        name: "Hours per week",
        value: ""
      },
      "medianWage": {
         name: "Median Wage",
         value: ""
      },
      "addressRegion": {
        name: "Region",
        value: ""
      },
      "addressLocality": {
        name: "Locality",
        value: ""
      },
      "streetAddress": {
        name: "Street Address",
        value: ""
      },
      "postalCode": {
        name: "Postal Code",
        value: ""
      },
      "validThrough": {
         name: "Apply by",
         value: ""
       },
      "datePosted": {
         name: "Job posted on",
         value: ""
       },
      "source": {
         name: "Source",
         value: ""
       },
       /* "industry": {
         name: "Industry",
         value: ""
       },
      "cms": {
        name: "Content Management System",
        value: ""
      },
      "yearSiteUpdated": {
        name: "Year Site Updated",
        value: ""
      },
      "aboutUrl": {
        name: "About URL",
        value: ""
      },
      "portfolioUrl": {
        name: "Portfolio URL",
        value: ""
      },
      "contactUrl": {
        name: "Contact URL",
        value: ""
      },
      "programmingServer": {
        name: "Programming Server",
        value: ""
      }
      */

    };

    toBeDisplayed = [
      "title", "companyName", "website", "email", 
      "applyOnlineUrl", "datePosted", "minValue", "maxValue", "medianWage",
      "workHours", "addressRegion", "addressLocality", "streetAddress",
      "postalCode", "validThrough", "specialInstructions"
   ];
    

   // Construct an HTML string for the description list (dl)
   let dlHtml = '<dl>';

   let dataToPost = '';
   let headerToPost = '';
 
   // Iterate through the extractedData and add dt (term) and dd (description) elements for non-empty values
   for (const key in keysToExtractForuOutput) {
      const { name } = keysToExtractForuOutput[key];
      const value = extractedData[key];
      dataToPost += `"${value}", `;
      headerToPost += `"${name}", `;
      if (value !== "" && value !== "0" && toBeDisplayed.includes(key) ) {
        dlHtml += `<dt>${name}</dt><dd>${value}</dd>`;
      }
    }
 
   dlHtml += '</dl>'; // Close the description list (dl)
 
   document.getElementById('detailsCard').classList.add('detailsCard');

   // Get the div with the 'details' id and set its innerHTML
   const detailsDiv = document.getElementById('details');
   
   detailsDiv.innerHTML = dlHtml;

   const detailsHidden = document.getElementById('detailsToCopyHidden')
   detailsHidden.innerText = dataToPost.slice(0, -1);

   const copyButtonStyle = document.getElementById('copyJobButton')
   copyButtonStyle.style.display = 'inline';

   const saveButtonStyle = document.getElementById('saveJobButton')
   saveButtonStyle.style.display = 'inline';

   // toggleDisplay("copyJobButton");
   // toggleDisplay("saveJobButton");
   
   });

 // Add a click event listener to the copy button
 document.getElementById('copyJobButton').addEventListener('click', function() {
   // Create a new textarea element and set its value to the details
   var textarea = document.createElement('textarea');
   textarea.style.display = 'none';
   textarea.value = document.getElementById('detailsToCopyHidden').innerText;
   document.body.appendChild(textarea);
 
   // Select the textarea's content and copy it to the clipboard
   textarea.select();
   document.execCommand('copy');
 
   // Remove the textarea element
   document.body.removeChild(textarea);
 
   // Display a message indicating that the details have been copied
   statusMessageDiv.style.display = 'inline';
   statusMessageDiv.innerText = 'Copied!';

   delayhideDiv("statusMessage");

 });
 
 // Add an event listener to the button
 document.getElementById('saveJobButton').addEventListener('click', function() {
  
  console.log("Save button is clicked");

  // "counter" - add later
  browser.storage.local.get(["spreadsheetDocumentId", "sheetName"]).then(result => {
    const spreadsheetDocumentId = result.spreadsheetDocumentId;
    const sheetName = result.sheetName;
    const counter = result.counter;

    detailsElement = document.getElementById('detailsToCopyHidden');
    statusMessageDiv.style.display = 'inline';
    console.log(detailsElement);

    spreadsheetAPIURL = "https://apps.yatsiv.com/sheets/?method=json";

    let data = {};
    
    // if (counter < 1) {
      // detailsElement.value += headerToPost;
    // }

    data.cellValue = detailsElement.innerText;
    statusMessageDiv.textContent = "Saving...";
    // alert(data)
    // alert(data.cellValue)
 
    console.log(spreadsheetDocumentId);
 
    data.spreadsheetId = spreadsheetDocumentId;
    data.cellsRange = sheetName;
    // data.cellsRange = "Job_search_addon_test";

    fetch(spreadsheetAPIURL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    })
    .then(response => response.json())
    .then(data => {
      statusMessageDiv.textContent = data.message;
    })
    .catch((error) => {
      console.error('Error:', error);
      statusMessageDiv.textContent = "Error: " + error;
    });

    delayhideDiv("statusMessage");

  });
});


 // Append the button to the body (or any other element)
 
 function delayhideDiv(id) {
   document.getElementById(id).classList.add("fade-out");
   setTimeout(function(){
      document.getElementById(id).innerText = '';
      document.getElementById(id).style.display = 'none';
   },2000)
 }

});
