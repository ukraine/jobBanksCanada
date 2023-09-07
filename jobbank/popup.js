document.addEventListener("DOMContentLoaded", function() {

// Get the current tab
browser.tabs.query({active: true, currentWindow: true}, function(tabs) {
   // Inject the script into the current tab
   browser.tabs.executeScript(tabs[0].id, {file: "content.js"});
   document.getElementById("details").innerText = "Analyzing job posting...";
 });
 
 // Listen for messages from the content script
 browser.runtime.onMessage.addListener(function(message) {
   // Display the details in the popup
   const extractedData = JSON.parse(message);

   const keysToExtractForuOutput = {
      "status": {
        name: "Status",
        value: "0"
      },
      "datePosted": {
        name: "Publication Date",
        value: ""
      },
      "dateSaved": {
        name: "Saved Date",
        value: ""
      },
      "validThrough": {
        name: "Apply by",
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
      "verified": {
        name: "Verified",
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
      "referenceNumber": {
         name: "Reference #",
         value: ""
       },
      "specialInstructions": {
         name: "Instructions to follow and questions to be answered",
         value: ""
       }, 
      "industry": {
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
      },
      "source": {
        name: "Source",
        value: ""
      }
    };

    toBeDisplayed = ["title", "companyName", "website", "email", 
    "applyOnlineUrl", "datePosted", "minValue", "maxValue", "workHours", "addressRegion", "addressLocality", "streetAddress", "postalCode", "validThrough", "specialInstructions"];
    

   // Construct an HTML string for the description list (dl)
   let dlHtml = '<dl>';

   let dataToPost = '';
 
   // Iterate through the extractedData and add dt (term) and dd (description) elements for non-empty values
   for (const key in keysToExtractForuOutput) {
      const { name } = keysToExtractForuOutput[key];
      const value = extractedData[key];
      dataToPost += `"${value}", `;
      if (value !== "" && value !== "0" && toBeDisplayed.includes(key) ) {
        dlHtml += `<dt>${name}</dt><dd>${value}</dd>`;
      }
    }
 
   dlHtml += '</dl>'; // Close the description list (dl)
 
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
   document.getElementById('statusMessage').style.display = 'inline';
   document.getElementById('statusMessage').innerText = 'Copied!';

   delayhideDiv("statusMessage");

 });
 


 // Add an event listener to the button
 document.getElementById('saveJobButton').addEventListener('click', function() {

   console.log("Save button is clicked");

   const statusMessage = document.getElementById('statusMessage');

   detailsElement = document.getElementById('detailsToCopyHidden');
   statusMessage.style.display = 'inline';

   console.log(detailsElement);
   
   spreadsheetAPIURL = "https://beta.russol.info/simpleTools/tables/index.php?method=json";

   let data = {};
   
   data.cellValue = detailsElement.innerText;
   statusMessage.textContent = "Saving...";
   // alert(data)
   // alert(data.cellValue)

   data.spreadsheetId = "1XsWTk-730YbZJtdBTTHep3oo79cSb35Hm6zknlhZnT4";
   // data.cellsRange = "Temp!A" . saveCounter;
   data.cellsRange = "Job_search_addon_test";
   // data.savedCounter = saveCounter;

   // alert(data.spreadsheetId);
   // alert(data.cellsRange);
 
   // Send a POST request
   fetch(spreadsheetAPIURL, {
     method: 'POST',
     headers: {
       'Content-Type': 'application/json'
     },
     body: JSON.stringify(data)
   })
   .then(response => response.json())
   .then(data => {
      // Display the server response
      // saveCounter++;
      // alert(saveCounter);
      statusMessage.textContent = data.message;
      
    })
   .catch((error) => {
     console.error('Error:', error);
     statusMessage.textContent = "Error: " + error;
   });

   delayhideDiv("statusMessage");

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
