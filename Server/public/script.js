const showUploadedFiles = data => {
    let containerArea = document.getElementById("sent-files-preview-area");
    containerArea.innerHTML = "";
    containerArea.style.justifyContent = "flex-start";

    Object.keys(data).forEach(key => {
        let songDiv = document.createElement("div");
        songDiv.setAttribute("class", "song-info-container");

        let title = document.createElement("div");
        title.setAttribute("class", "info-element");
        title.innerHTML = data[key].name;

        let albumName = document.createElement("div");
        albumName.setAttribute("class", "info-element");
        albumName.innerHTML = data[key].albumName;

        let size = document.createElement("div");
        size.setAttribute("class", "info-element");
        let sizeInMB = data[key].size / (1024 * 1024);
        size.innerHTML = sizeInMB.toFixed(2) + " MB";

        songDiv.appendChild(title);
        songDiv.appendChild(albumName);
        songDiv.appendChild(size);

        containerArea.appendChild(songDiv);
    });
};

document.querySelector("html").ondragover = function(e) {
    console.log("dragover nad dokumentem html");
    let dropText = document.getElementById("upload-text");
    dropText.innerHTML = "Drop here";
    e.preventDefault(); // usuwa domyślne zachowanie strony po wykonaniu zdarzenia, warto zakomentować i sprawdzić
    e.stopPropagation(); // zatrzymuje dalszą propagację zdarzenia, warto zakomentować i sprawdzić
};

document.querySelector("html").ondragend = function(e) {
    console.log("dragover nad dokumentem html");
    let dropText = document.getElementById("upload-text");
    dropText.innerHTML = "Drag your files here";
    e.preventDefault(); // usuwa domyślne zachowanie strony po wykonaniu zdarzenia, warto zakomentować i sprawdzić
    e.stopPropagation(); // zatrzymuje dalszą propagację zdarzenia, warto zakomentować i sprawdzić
};

document.querySelector("#upload-area").ondrop = function(e) {
    console.log("Files dropped");
    e.stopPropagation();
    e.preventDefault();

    let dropText = document.getElementById("upload-text");
    dropText.innerHTML = "Uploaded";

    var files = e.dataTransfer.files;
    var fd = new FormData();

    for (let i = 0; i < files.length; i++) {
        fd.append(`file${i}`, files[i]);
    }

    const body = fd;
    const headers = { "Contet-Type": "application/json" };

    fetch("/uploadFiles", { method: "post", body })
        .then(response => response.json())
        .then(data => {
            console.log("response: " + JSON.stringify(data));
            showUploadedFiles(data);
        }) // odesłane z serwera dane
        .catch(error => console.log(error)); 
};

console.log("JS zaladowany");
