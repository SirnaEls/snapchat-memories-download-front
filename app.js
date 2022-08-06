/**
 * Front part
 */

document.querySelector("#Upload_your_file").addEventListener('submit', function() {
    document.querySelector(".loader").removeAttribute('hidden')
})


/**
 * Upload File part
 */
function uploadFile() {
    // Récupére le fichier uploadé
    let snapchatZip = document.getElementById('myFile').files[0]

     // Envoyer le fichier à l'API sur la route POST /upload-snapchat-file
      requestApiWithFile(snapchatZip)
}


function requestApiWithFile(file) {
   var req = new XMLHttpRequest()
   req.timeout = 120000

   req.open("POST", 'https://snapchat-memories-download-api.herokuapp.com/upload-snapchat-file', true)
   req.overrideMimeType('application/octet-stream')
   var formData = new FormData()
   formData.append("snapchatZip", file)
   req.send(formData)

   req.onreadystatechange = function() {
      if (req.readyState == 4 && req.status == 200) {
         var binaryData = [];
         binaryData.push(req.response);
         const downloadUrl = window.URL.createObjectURL(new Blob(binaryData, {type: "application/zip"}))
          const link = document.createElement('a');
          
          link.setAttribute('href', downloadUrl);
          link.setAttribute('download', `filename.zip`);
          link.style.display = 'none';
          document.body.appendChild(link);
          link.click();
          window.URL.revokeObjectURL(link.href);
          document.body.removeChild(link);
      }
  }
  req.responseType = "arraybuffer"
}

