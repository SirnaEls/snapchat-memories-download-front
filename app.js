/**
 * FRONT PART
 */

document.querySelector("#upload_your_file").addEventListener('submit', function() {
    document.querySelector(".loading_container").removeAttribute('hidden')
    document.querySelector("#submit-button").setAttribute("disabled", true)
})

// On file upload event
document.querySelector("#myFile").addEventListener('change', function() {
    document.querySelector("#submit-button").disabled = false
    
      document.querySelector("#submit-button").classList.remove("unclickable_button")
      document.querySelector("#submit-button").classList.add("clickable_button")
})



/**
 * UPLOAD FILE PART
 */
function uploadFile() {
    console.log('onsubmit')
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
      if (req.readyState == 4) {

        //if API returns error 
        if (req.status != 200) {
            alert("Une erreur s'est produite. Si votre fichier ZIP téléchargée sur le site de Snapchat (à l'étape 1) date d'il " +
                "y a plus de 7 jours, veuillez repartir de l'étape 1. ", req.status)
            location.reload() // refresh page
            return
        }

         var binaryData = [];
         binaryData.push(req.response);
         const downloadUrl = window.URL.createObjectURL(new Blob(binaryData, {type: "application/zip"}))
          const link = document.createElement('a');

          link.setAttribute('href', downloadUrl)
          link.setAttribute('download', `memories.zip`)
          link.style.display = 'none'
          document.body.appendChild(link)
          link.click()
          window.URL.revokeObjectURL(link.href)
          document.body.removeChild(link)

          // Hide the loading bar
          document.querySelector(".loading_container").hidden = true
      }
  }
  req.responseType = "arraybuffer"
}