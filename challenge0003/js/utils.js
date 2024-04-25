function setup(evt) {
    const dragContainer = document.getElementById('upload-files-container')
    const filesInput = document.getElementById('upload-files-input')
    const uploadFilesForm = document.getElementById('upload-files-form')

    uploadFilesForm.addEventListener('submit', submitUploadFiles)
    filesInput.addEventListener('change', updateUploadFilesWindowEvt)

    dragContainer.addEventListener('click', openUploadFilesInput)
    dragContainer.addEventListener('dragenter', enableDragStyle)
    dragContainer.addEventListener('dragleave', disableDragStyle)
    dragContainer.addEventListener('dragover', preventDefaults)
    dragContainer.addEventListener('drop', dropUploadFiles)
}

function submitUploadFiles(evt) {
    evt.preventDefault()

    const filesInput = document.getElementById('upload-files-input')
    if(filesInput.files.length > 0) {
        const params = new FormData()
        for(let i = 0; i < filesInput.files.length; i++) {
            params.append(filesInput.name + '[]', filesInput.files[i])
        }
        fetch('php/imageConversor.php', {
            method: 'POST',
            body: params
        })
        .then(response => response.text())
        .then(html => {
            const outputLink = document.getElementById('output-link')
            outputLink.innerHTML = html
        })
    } else {
        alert("No se han subido imágenes")
    }
}

function openUploadFilesInput(evt) {
    const filesInput = document.getElementById('upload-files-input')
    filesInput.click()
}

function updateUploadFilesWindow(files) {
    const maxNumFiles = 5
    const dragContainer = document.getElementById('upload-files-container')
    const filesInput = document.getElementById('upload-files-input')
    let selFiles = files
    
    if(selFiles.length > 0) {
        if (selFiles.length > maxNumFiles) {
            let f = Array.from(selFiles)
            f = f.slice(0, maxNumFiles)
            const fileList = new DataTransfer()
            f.forEach(file => {
                fileList.items.add(file)
            })
            filesInput.files = fileList.files
            selFiles = fileList.files
            alert(`Has superado el número máximo de imágenes. Solamente se subirán ${maxNumFiles} imágenes.`)
        }

        const maxFileSize = 5 * 1024 * 1024 // 5 MB
        const nFileList = new DataTransfer()
        let imgOverFilesize = false
        for(let i = 0; i < selFiles.length; i++) {
            if(selFiles[i].size > maxFileSize) {
                imgOverFilesize = true
            } else {
                nFileList.items.add(selFiles[i])
            }
        }
        filesInput.files = nFileList.files
        selFiles = nFileList.files
        if(imgOverFilesize === true) {
            alert("Una o más imágenes superan los 5 MB de tamaño y no serán incluidas en la subida")
        }

        dragContainer.innerHTML = ''
        dragContainer.removeEventListener('click', openUploadFilesInput)

        const dragContList = document.createElement("ul")
        dragContList.className = dragContainer.className + "__list"
        dragContainer.appendChild(dragContList)

        for(let i = 0; i < selFiles.length; i++) {
            const file = selFiles[i]
            if(file) {
                const reader = new FileReader()
                reader.onload = function(evt) {
                    const li = document.createElement("li")
                    li.className = dragContList.className + "__li"
                    const newImg = document.createElement('img')
                    newImg.classList = li.className + "__file"
                    newImg.src = evt.target.result
                    newImg.setAttribute("data-name", file.name)
                    li.appendChild(newImg)
                    const trash = document.createElement('icon')
                    trash.className = li.className + "__icon"
                    trash.classList.add("yc-icon")
                    trash.classList.add("yc-icon--trash")
                    li.appendChild(trash)
                    dragContList.appendChild(li)

                    li.addEventListener("click", removeUploadedImg)
                }
                reader.readAsDataURL(file)
            }
        }
    } else {
        dragContainer.innerHTML = '<icon class="yc-icon yc-icon--upload yc-body__upload-window__image-sel__icon"></icon>'
        const wait = setTimeout(()=>{
            dragContainer.addEventListener('click', openUploadFilesInput)
            clearTimeout(wait)
        }, 500)
    }
}

function updateUploadFilesWindowEvt(evt) {
    updateUploadFilesWindow(evt.currentTarget.files)
}

function removeUploadedImg(evt) {
    const filesInput = document.getElementById('upload-files-input')
    let files = Array.from(filesInput.files)

    const img = evt.currentTarget.querySelector('img')
    imgName = img.getAttribute("data-name")

    files = files.filter(file => !(file.name === imgName));
    const fileList = new DataTransfer()
    files.forEach(file => {
        fileList.items.add(file)
    })
    filesInput.files = fileList.files

    if(files.length <= 0) {
        updateUploadFilesWindow(fileList)
    }
    
    evt.currentTarget.remove()
}

function preventDefaults(evt) {
    evt.preventDefault()
    evt.stopPropagation()
}

function dropUploadFiles(evt) {
    const files = evt.dataTransfer
    const filesInput = document.getElementById('upload-files-input')
    
    filesInput.files = files.files
    updateUploadFilesWindow(files.files)
    disableDragStyle(evt)
}

function enableDragStyle(evt) {
    preventDefaults(evt)
    evt.currentTarget.classList.add('yc-body__upload-window__image-sel--drag')
}

function disableDragStyle(evt) {
    preventDefaults(evt)
    evt.currentTarget.classList.remove('yc-body__upload-window__image-sel--drag')
}

document.addEventListener('DOMContentLoaded', setup)