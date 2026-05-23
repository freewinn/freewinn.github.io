// Created by Daniel Winn for FREEWINN
// https://freewinn.github.io/imgview
// IN-DEV | © 2026 Daniel Winn. All Rights Reserved.


// Variables

const fileInput = document.getElementById('imageUploader');
const canvas = document.getElementById('image');
const ctx = canvas.getContext('2d');

const validformats = ["PNG", "JPEG", "GIF", "WEBP"]
const formatcolors = {
    "PNG": "#164a6e",
    "JPEG": "#444d52",
    "GIF": "#7f4c1e",
    "WEBP": "#396311",
}
const formatlogos = {
    "PNG": "/content/IF_PNG_S.png",
    "JPEG": "/content/IF_JPEG_S.png",
    "GIF": "/content/IF_GIF_S.png",
    "WEBP": "/content/IF_WEBP_S.png",
}
const compmethods = {
    "PNG": "Lossless (DEFLATE)",
    "JPEG": "Lossy (JPEG Compression)",
    "GIF": "Lossless (LZW)",
    "WEBP": "Unknown (Lossy or Lossless)",
}

const formatborders = document.getElementsByClassName("formatborder")

// Functions

function updateformatcolor(format) {
    var fc = formatcolors[format]

    for (let i = 0; i < formatborders.length; i++) {
        formatborders[i].style.borderColor = fc;
    }
    document.getElementsByClassName("formatdata")[0].style.borderColor = fc;
    canvas.style.borderColor = fc;
}

function updateformatlogo(format) {
    var fl = formatlogos[format]

    document.getElementById("formatlogo").src = fl;
}

// Events

fileInput.addEventListener('change', () => {
    if (fileInput.files.length > 0) {
        const file = fileInput.files[0];
        const reader = new FileReader();
        
        // Basic Metadata
        document.getElementById("filename").innerText = fileInput.value.split("\\")[fileInput.value.split("\\").length-1];

        // Load Format Info
        if (validformats.includes(file.type.split("/")[1].toUpperCase())) {
            updateformatcolor(file.type.split("/")[1].toUpperCase())
            updateformatlogo(file.type.split("/")[1].toUpperCase())

            document.getElementById("formatname").innerText = file.type.split("/")[1].toUpperCase();
            document.getElementById("mimetype").innerText = file.type;
            document.getElementById("compmethod").innerText = compmethods[file.type.split("/")[1].toUpperCase()];
        } else {
            document.getElementById("formatname").innerText = "---";
            document.getElementById("mimetype").innerText = "---";
            document.getElementById("compmethod").innerText = "---";
            alert('Invalid format.');
        }

        // Load Image
        reader.onload = function(e) {
            const img = new Image();
            img.onload = function() {
                document.getElementById("imagew").innerText = img.naturalWidth;
                document.getElementById("imageh").innerText = img.naturalHeight;
                
                canvas.width = img.naturalWidth;
                canvas.height = img.naturalHeight;
                
                ctx.clearRect(0, 0, canvas.width, canvas.height);
                ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
                
                //// Calculate color depth
                //const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
                //const pixelData = imageData.data;
                //const colorDepthActual = pixelData.length * (8 / (canvas.width * canvas.height));
                //console.log('Actual color depth in bits per pixel:', colorDepthActual);
            }
            img.src = e.target.result;
        }
        reader.readAsDataURL(file);
    } else {
        alert('Please upload an image file.');
    }
});

document.getElementById('image').addEventListener("mouseover", () => {
    document.getElementById("formatlogo").classList.remove("hide")
});

document.getElementById('image').addEventListener("mouseout", () => {
    document.getElementById("formatlogo").classList.add("hide")
});