

// Load JSON
// https://laracasts.com/discuss/channels/general-discussion/load-json-file-from-javascript
function loadJSON(file, callback) {   

    var xobj = new XMLHttpRequest();
    xobj.overrideMimeType("application/json");
    xobj.open('GET', file, true); // Replace 'my_data' with the path to your file
    xobj.onreadystatechange = function () {
          if (xobj.readyState == 4 && xobj.status == "200") {
            // Required use of an anonymous callback as .open will NOT return a value but simply returns undefined in asynchronous mode
            callback(xobj.responseText);
          }
    };
    xobj.send(null);  
};// end loadJSON

function handle(e){
	if(e.keyCode === 13){
		e.preventDefault(); // Ensure it is only this code that runs
		alert("Enter was pressed was presses");
	}
}
function updateGitPage() {
  updateTextAreaFromRepo("gitFileName","gitFileNameItem","gitRepoUrl","gitFileTextArea")  
}; // end updateForm

function updateTextAreaFromRepo(FileNameElement,FileNameItem,RepoUrlElement,TextAreaElement) {
  // If textbox not empty, push contents to cookie, otherwise push from cookie to textbox. Always push to name field.
  FileName = document.getElementById(FileNameElement).value
  if (FileName) {
    document.getElementById(FileNameElement).value = FileName
  } else {
	  FileName = "README.md"
      document.getElementById(FileNameElement).value = FileName
  }; //end if FileName
  document.getElementById(FileNameItem).innerHTML = FileName
  
  // Load file from repo into gitFileTextArea.
  RepoUrl = document.getElementById(RepoUrlElement).value + "/" + FileName
  loadJSON(RepoUrl, function(response) {
    document.getElementById(TextAreaElement).innerText = response
  }); // end loadJSON
  
}; // end updateForm

function updateDownloadLink() {
  document.getElementById("gitFilelink").download = document.getElementById("inputFileNameToSaveAs").value
}; // end updateForm

function updateForm(nfsCall, nfsName, nfsTextArea) {
  nfsInput = document.getElementById(nfsName).value
  nfsurl = "https://gil-api.herokuapp.com/" + nfsCall + "?name=" + nfsInput
  loadJSON(nfsurl, function(response) {
    document.getElementById(nfsTextArea).value = response //actual_JSON
  }); // end loadJSON
}; // end updateForm

function updateNFSForm(nfsCall, nfsName, nfsTextArea, nfsParams, nfsType) {
  nfsName = document.getElementById("NFSpageName").value
  nfsParams = document.getElementById("NFSInput").value
  nfsurl = "https://gil-api.herokuapp.com/" + nfsCall + "?name=" + nfsName + "&params=" + nfsParams + "&type=" + nfsType
  loadJSON(nfsurl, function(response) {
    document.getElementById(nfsTextArea).value = response //actual_JSON
  }); // end loadJSON
}; // end updateForm

updateForm('newappget', 'pageName', 'IndexJS')
updateForm('newappget', 'NFSpageName', 'TestJS')


// http://cwestblog.com/2014/10/21/javascript-creating-a-downloadable-file-in-the-browser/
window.onload = function() {
  var txt = document.getElementById('gitFileTextArea');
  txt.value = window.onload + '';
  document.getElementById('gitFilelink').onclick = function(code) {
	this.href = 'data:text/plain;charset=utf-8,'
	  + encodeURIComponent(txt.value);
  };
};

