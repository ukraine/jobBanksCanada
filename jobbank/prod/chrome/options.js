document.addEventListener('DOMContentLoaded', restoreOptions);
document.querySelector("form").addEventListener("submit", saveOptions);

const statusMessageDiv = document.getElementById('statusMessage');
const statusMessageCopyDiv = document.getElementById('statusMessageCopy');

function saveOptions(e) {
  e.preventDefault();
  
  const url = document.querySelector("#spreadsheetUrl").value;
  const sheetName = document.querySelector("#sheetName").value;
  const documentId = extractDocumentIdFromUrl(url);

  console.log(url);
  console.log(documentId);

  statusMessageDiv.style.display = 'inline';
  statusMessageDiv.textContent = "Saving...";

  chrome.storage.local.set({
   spreadsheetUrl: url,
   sheetName: sheetName,
   spreadsheetDocumentId: documentId
  });

  statusMessageDiv.textContent = "Saved";
  delayhideDiv("statusMessage");

}

// Add a click event listener to the copy button
document.getElementById('highlight').addEventListener('click', function() {

// Get the element by its ID
var element = document.getElementById('highlight');

// Create a textarea element
var textarea = document.createElement('textarea');
textarea.value = element.innerText;

// Append the textarea to the DOM
document.body.appendChild(textarea);

// Select the text in the textarea
textarea.select(); 

// Copy the selected text to the clipboard
document.execCommand('copy');

// Remove the textarea from the DOM
document.body.removeChild(textarea);

// Display a message indicating that the details have been copied
statusMessageCopyDiv.style.display = 'inline';
statusMessageCopyDiv.innerText = 'Copied!';


console.log(element.innerText);

   delayhideDiv("statusMessageCopy");

});


function delayhideDiv(id) {
   document.getElementById(id).classList.add("fade-out");
   setTimeout(function(){
      document.getElementById(id).innerText = '';
      document.getElementById(id).style.display = 'none';
   },2000)
 }

function restoreOptions() {
  function setCurrentChoice(result) {
    document.querySelector("#spreadsheetUrl").value = result.spreadsheetUrl || "";
  }

  function onError(error) {
    console.log(`Error: ${error}`);
  }

  let getting = chrome.storage.local.get("spreadsheetUrl");
  getting.then(setCurrentChoice, onError);
}

function extractDocumentIdFromUrl(url) {
   const parts = url.split("/");
   const indexOfD = parts.indexOf("d");
   
   if (indexOfD !== -1 && indexOfD < parts.length - 1) {
     return parts[indexOfD + 1];
   }
   
   return null; // Return null if document ID is not found
 }