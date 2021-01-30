function drop(event) {
    event.preventDefault();
    event.stopPropagation();
    let files = event.dataTransfer.files;
    console.log(files);
    let filesCount = files.length;
    for (let file of files) {
        if (file.type.match('image.*')) {
            let fileReader = new FileReader();
            fileReader.readAsDataURL(file);
            fileReader.onload = function (e) {
                let img = document.createElement("img");
                img.classList.add("thumbnail")
                img.setAttribute("src", e.target.result);
                document.getElementById("result").appendChild(img);
            }
        }
    }
}

function allowDrop(event) {
    event.preventDefault();
    event.stopPropagation();
}
