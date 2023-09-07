// Get the current tab
browser.tabs.query({active: true, currentWindow: true}, function(tabs) {
   // Inject the script into the current tab
   browser.tabs.executeScript(tabs[0].id, {file: "content.js"});
 });
 
 // Listen for messages from the content script
 browser.runtime.onMessage.addListener(function(message) {
   // Display the details in the popup
   document.getElementById('details').innerText = message;
 });
 
 // Add a click event listener to the copy button
 document.getElementById('copyButton').addEventListener('click', function() {
   // Create a new textarea element and set its value to the details
   var textarea = document.createElement('textarea');
   textarea.value = document.getElementById('details').innerText;
   document.body.appendChild(textarea);
 
   // Select the textarea's content and copy it to the clipboard
   textarea.select();
   document.execCommand('copy');
 
   // Remove the textarea element
   document.body.removeChild(textarea);
 
   // Display a message indicating that the details have been copied
   document.getElementById('message').innerText = 'Copied!';
 });
 
 // Create a new button
 var button = document.createElement('button');
 button.textContent = 'Save job';
 let saveCounter = 1;

 // Add an event listener to the button
 button.addEventListener('click', function() {

   detailsElement = document.getElementById('details');
   
   spreadsheetAPIURL = "https://beta.russol.info/simpleTools/tables/index.php?method=json";

   let data = {};
   
   data.cellValue = detailsElement.innerText;
   detailsElement.textContent = "Saving...";
   // alert(data)
   // alert(data.cellValue)

   data.spreadsheetId = "1XsWTk-730YbZJtdBTTHep3oo79cSb35Hm6zknlhZnT4";
   // data.cellsRange = "Temp!A" . saveCounter;
   data.cellsRange = "Job_search";
   data.savedCounter = saveCounter;

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
      saveCounter++;
      // alert(saveCounter);
      detailsElement.textContent = data.message;
    })
   .catch((error) => {
     console.error('Error:', error);
     detailsElement.textContent = "Error: " + error;
   });
 });
 
 // Append the button to the body (or any other element)
 document.body.appendChild(button);
 