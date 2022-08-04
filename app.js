import { saveAs } from 'file-saver'
//const saveAs = require('file-saver')

function uploadFile() {
    // Récupére le fichier uploadé
    let snapchatZip = document.getElementById('myFile').files[0]


     // Envoyer le fichier à l'API sur la route POST /upload-snapchat-file
      requestApiWithFile(snapchatZip)
}



function requestApiWithFile(file) {
   var req = new XMLHttpRequest()
   req.timeout = 120000

   req.open("POST", 'http://localhost:3000/upload-snapchat-file', true)
   req.overrideMimeType('application/octet-stream')
   var formData = new FormData()
   formData.append("snapchatZip", file)
   req.send(formData)

   req.onload = function() {
      if(req.status === 200) {
         console.log('in response 200')
        var filename = 'monFoutuZip.zip'

        const blob = req.response.blob()
        saveAs(blob, 'mesPHotos.zip')
  
        // The actual download
        /*
        var blob = new Blob([req.response], { type: 'octet/stream' });
        var link = document.createElement('a');
        link.href = window.URL.createObjectURL(blob);
        link.download = filename;
  
        document.body.appendChild(link);
  
        link.click()
  
        document.body.removeChild(link);
      }
  
      */
      // s
      }
   }
}