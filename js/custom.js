document.addEventListener("DOMContentLoaded", function() {
    const mainImage = document.getElementById("mainImage");
    const smallImages = document.querySelectorAll(".small-image");

    smallImages.forEach(image => {
        image.addEventListener("click", function() {
            const tempSrc = mainImage.src;
            mainImage.src = image.src;
            image.src = tempSrc;
        });
    });
});
