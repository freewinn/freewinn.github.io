// Created by Daniel Winn for FREEWINN
// https://freewinn.github.io/imgview
// IN-DEV | © 2026 Daniel Winn. All Rights Reserved.


// Variables
const fileInput = document.getElementById('imageUploader');
const canvas = document.getElementById('image');
const ctx = canvas.getContext('2d');

const validformats = ["PNG", "JPG", "GIF", "WEBP", "BMP", "ICO", "AVIF", "HEIC"];
const browserformats = ["PNG", "JPG", "GIF", "WEBP", "BMP", "ICO", "AVIF"];
const formatcolors = {
    "PNG": "#164a6e",
    "JPG": "#444d52",
    "GIF": "#7f4c1e",
    "WEBP": "#396311",
    "BMP": "#943f40",
    "ICO": "#4e2b9d",
    "AVIF": "#811840",
    "HEIC": "#782982",
};
const formatlogos = {
    "PNG": "/content/IF_PNG_S.png",
    "JPG": "/content/IF_JPEG_S.png",
    "GIF": "/content/IF_GIF_S.png",
    "WEBP": "/content/IF_WEBP_S.png",
    "BMP": "/content/IF_BMP_S.png",
    "ICO": "/content/IF_ICO_S.png",
    "AVIF": "/content/IF_AVIF_S.png",
    "HEIC": "/content/IF_HEIC_S.png",
};
const compmethods = {
    "PNG": "Lossless (DEFLATE)",
    "JPG": "Lossy (JPEG Compression)",
    "GIF": "Lossless (LZW)",
    "WEBP": "Unknown (Lossy or Lossless)",
    "BMP": "Lossless (RLE)",
    "ICO": "Lossless (BMP or PNG)",
    "AVIF": "Unknown (Lossy or Lossless)",
    "HEIC": "Unknown (Lossy or Lossless)",
};

const supportedmakes = ["FUJIFILM", "SAMSUNG", "APPLE", "SONY", "MOTOROLA", "CANON", "NIKON CORPORATION", "GOPRO", "POLAROID", "PANASONIC", "OLYMPUS DIGITAL CAMERA", "OLYMPUS IMAGING CORP."];
const brandlogos = {
    "FUJIFILM": "/content/CC_Fujifilm.png",
    "SAMSUNG": "/content/CC_Samsung.png",
    "APPLE": "/content/CC_Apple.png",
    "SONY": "/content/CC_Sony.png",
    "MOTOROLA": "/content/CC_Motorola.png",
    "CANON": "/content/CC_Canon.png",
    "NIKON CORPORATION": "/content/CC_Nikon.png",
    "GOPRO": "/content/CC_GoPro.png",
    "POLAROID": "/content/CC_Polaroid.png",
    "PANASONIC": "/content/CC_Panasonic.png",
    "OLYMPUS DIGITAL CAMERA": "/content/CC_Olympus.png",
    "OLYMPUS IMAGING CORP.": "/content/CC_Olympus.png",
};

const formatborders = document.getElementsByClassName("formatborder")

// Functions

function statusbar(message, per, bcolor = "green", fcolor = "rgb(200, 200, 200)") {
    canvas.width = 800;
    canvas.height = 400;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = bcolor;
    ctx.fillRect(0,0, canvas.width*per,22);
    ctx.font = "18px Monospace";
    ctx.fillStyle = fcolor;
    ctx.fillText(message, 5, 16);
}

function updateformatcolor(format) {
    if (format) {
        var fc = formatcolors[format]

        for (let i = 0; i < formatborders.length; i++) {
            formatborders[i].style.borderColor = fc;
        }
        document.getElementsByClassName("formatdata")[0].style.borderColor = fc;
        canvas.style.borderColor = fc;
    } else {
        for (let i = 0; i < formatborders.length; i++) {
            formatborders[i].style.borderColor = "gray";
        }
        document.getElementsByClassName("formatdata")[0].style.borderColor = "gray";
        canvas.style.borderColor = "gray";
    }
}

function updateformatlogo(format) {
    if (format) {
        var fl = formatlogos[format]
        document.getElementById("formatlogo").src = fl;
    } else {
        document.getElementById("formatlogo").src = "";
    }
}

function processexifdata(output) {
    console.log(output)
    updatebandmodel(output);
}

function updatebandmodel(exifdata) {
    if (exifdata != null) {
        const brand = exifdata["Make"].toUpperCase()
        const model = exifdata["Model"]
        if (supportedmakes.includes(brand)) {
            var bl = brandlogos[brand]

            document.getElementById("brandlogo").src = bl;
            document.getElementById("model").innerText = model;
            document.getElementById("brandmodel").classList.remove("hidden");
            document.getElementById("brandcopyright").classList.remove("hidden");
        } else {
            document.getElementById("brandlogo").src = "";
            document.getElementById("model").innerText = "";
            document.getElementById("brandmodel").classList.add("hidden");
            document.getElementById("brandcopyright").classList.add("hidden");
        }
    } else {
        document.getElementById("brandlogo").src = "";
        document.getElementById("model").innerText = "";
        document.getElementById("brandmodel").classList.add("hidden");
        document.getElementById("brandcopyright").classList.add("hidden");
    }
    
}

// Events
fileInput.addEventListener('change', () => {
    statusbar("Uploading Image", 0.2);

    if (fileInput.files.length > 0) {
        const file = fileInput.files[0];
        
        // Basic Metadata
        statusbar("Loading Basic Metadata", 0.3);
        document.getElementById("filename").innerText = fileInput.value.split("\\")[fileInput.value.split("\\").length-1];

        statusbar("Loading EXIF Metadata", 0.35);
        exifr.parse(file)
        .then(output => processexifdata(output))

        // Load Format Info
        statusbar("Loading Format Infomation", 0.4);
        const fileformat = fileInput.value.split("\\")[fileInput.value.split("\\").length-1].split(".")[fileInput.value.split("\\")[fileInput.value.split("\\").length-1].split(".").length-1].toUpperCase()
        console.log(fileformat)
        if (browserformats.includes(fileformat)) {
            updateformatcolor(fileformat)
            updateformatlogo(fileformat)

            document.getElementById("formatname").innerText = fileformat;
            document.getElementById("mimetype").innerText = file.type;
            document.getElementById("compmethod").innerText = compmethods[fileformat];

            // Load Image
            statusbar("Loading Image", 0.8);
            const reader = new FileReader();
            reader.onload = function(e) {
                const img = new Image();
                img.onload = function() {
                    document.getElementById("imagew").innerText = img.naturalWidth;
                    document.getElementById("imageh").innerText = img.naturalHeight;
                    
                    canvas.width = img.naturalWidth;
                    canvas.height = img.naturalHeight;
                    
                    ctx.clearRect(0, 0, canvas.width, canvas.height);
                    ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
                }
                img.src = e.target.result;
            }
            reader.readAsDataURL(file);
        } else if (fileformat == "HEIC") {
            statusbar("Processing HEIC Image", 0.6);
            console.log("HEIC processing");

            var convertedImage = "";

            // Convert Image
            const blob = new Blob([file], { type: file.type });
            heic2any({
                blob
            })
            .then((conversionResult) => {
                var url = URL.createObjectURL(conversionResult);
                convertedImage = new Blob([conversionResult], { type: conversionResult.type });

                updateformatcolor(fileformat)
                updateformatlogo(fileformat)

                document.getElementById("formatname").innerText = fileformat;
                document.getElementById("mimetype").innerText = "image/heic";
                document.getElementById("compmethod").innerText = compmethods[fileformat];

                // Load Image
                statusbar("Loading Image", 0.8);
                const reader = new FileReader();
                reader.onload = function(e) {
                    const img = new Image();
                    img.onload = function() {
                        document.getElementById("imagew").innerText = img.naturalWidth;
                        document.getElementById("imageh").innerText = img.naturalHeight;
                        
                        canvas.width = img.naturalWidth;
                        canvas.height = img.naturalHeight;
                        
                        ctx.clearRect(0, 0, canvas.width, canvas.height);
                        ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
                    }
                    img.src = e.target.result;
                }
                reader.readAsDataURL(convertedImage);
            })
        } else {
            updateformatcolor(null);
            updateformatlogo(null);
            document.getElementById("imagew").innerText = "";
            document.getElementById("imageh").innerText = "";
            document.getElementById("formatname").innerText = "---";
            document.getElementById("mimetype").innerText = "---";
            document.getElementById("compmethod").innerText = "---";
            statusbar("INVALID FORMAT", 1.0, bcolor = "red");
        }
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

document.addEventListener("DOMContentLoaded", () => {
    canvas.width = 800;
    canvas.height = 400;
});