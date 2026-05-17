document.getElementById('viewButton').addEventListener('click', () => {
    const fileInput = document.getElementById('imageUploader');
    
    if (fileInput.files.length > 0) {
        const file = fileInput.files[0];
        const reader = new FileReader();

        reader.onload = function(e) {
            const img = new Image();
            img.onload = function() {
                const canvas = document.getElementById('image');
                const ctx = canvas.getContext('2d');
                
                document.getElementById("imagew").innerText = img.naturalWidth;
                document.getElementById("imageh").innerText = img.naturalHeight;
                
                canvas.width = img.naturalWidth;
                canvas.height = img.naturalHeight;
                
                ctx.clearRect(0, 0, canvas.width, canvas.height); // Clear the canvas
                ctx.drawImage(img, 0, 0, canvas.width, canvas.height); // Draw the image
            }
            img.src = e.target.result; // Set the image source to the loaded file
        }

        reader.readAsDataURL(file); // Read the file as a data URL
    } else {
        alert('Please upload an image file.');
    }
});
