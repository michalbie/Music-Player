document.querySelector("html").ondragover = function(e) {
    console.log("dragover nad dokumentem html");
    e.preventDefault(); // usuwa domyślne zachowanie strony po wykonaniu zdarzenia, warto zakomentować i sprawdzić
    e.stopPropagation(); // zatrzymuje dalszą propagację zdarzenia, warto zakomentować i sprawdzić
};

document.querySelector("html").ondrop = function(e) {
    console.log("drop na dokumencie html");
    e.preventDefault();
    e.stopPropagation();
};

document.querySelector("#upload-area").ondrop = function(e) {
    console.log("Files dropped");
    e.stopPropagation();
    e.preventDefault();

    var files = e.dataTransfer.files;
    //let albumTitle = prompt("Please enter the album name (leave empty for random name): ");

    var fd = new FormData();

    for (let i = 0; i < files.length; i++) {
        fd.append("file", files[i]);
        console.log(files[i]);
    }
    console.log("fd " + JSON.stringify(files));

    const headers = { "Contet-Type": "application/json" };
    const body = fd;

    //console.log()
    //console.log(JSON.stringify(body));

    fetch("/uploadFiles", { method: "post", body })
        .then(response => response.json())
        .then(data => console.log(data)) // odesłane z serwera dane
        .catch(error => console.log(error)); // ew błąd
};

console.log("JS zaladowany");
