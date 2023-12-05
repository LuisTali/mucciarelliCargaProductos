let cargarButton = document.getElementById("cargarButton");
let limpiarButton = document.getElementById("limpiarButton");
let nameProductoInput = document.getElementById("nameProducto");
let labelInputFile = document.getElementById("labelInputFile");
let inputFile = document.getElementById("inputFile");
let previewImages = document.getElementsByClassName("previewImages")[0];
let isDragging = false;
let files = [];
let lastId = 0;

const cleanForm = (e) =>{
    e.preventDefault();
    files = [];
    nameProductoInput.value= "";
    previewImages.innerHTML = "";
}

cargarButton.addEventListener("click",()=>alert("Hola"));
limpiarButton.addEventListener("click",(e)=>cleanForm(e));

const removeImg = (id) =>{
    files = files.filter((file) => file.id != id);
    showPreviewImages();
}

const showPreviewImages = () =>{
    previewImages.innerHTML = "";
    for(const file of files){
        const urlImage = URL.createObjectURL(file.file);
        let img = document.createElement("img");
        img.setAttribute("src",urlImage);
        img.classList.add("imagePreview");
        img.setAttribute("id",`${file.id}`)
        img.addEventListener("click",()=>removeImg(img.getAttribute("id")));
        img.setAttribute("title","Cliquee para eliminar imagen");
        previewImages.appendChild(img);
    }
};

labelInputFile.addEventListener("dragover",(e)=>{
    e.preventDefault();
    isDragging = true;
    e.toElement.style.border = "2px solid orangered";
});
labelInputFile.addEventListener("dragleave",(e)=>{
    e.preventDefault();
    e.toElement.style.border = "2px solid black"
});

labelInputFile.addEventListener("drop",(e)=>{
    e.preventDefault();
    isDragging = false;
    let file = {id:lastId,file:e.dataTransfer.files[0]}
    lastId++;
    files.push(file);
    showPreviewImages()
});
