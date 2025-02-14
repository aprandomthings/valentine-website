document.addEventListener("DOMContentLoaded", () => {
    const noButton = document.getElementById("no-btn");
    const yesButton = document.getElementById("yes-btn");
    const messages = ["Not this one", "Try again", "Please not this one"];
    let index = 0;

    // For No Button
    noButton.addEventListener("click", () => {
        index = (index + 1) % messages.length;
        noButton.textContent = messages[index];

        // Spawn multiple falling images randomly
        for (let i = 0; i < 500; i++) { 
            createFallingImage();
        }
    });

    // For Yes Button
    yesButton.addEventListener("click", () => {
        document.body.innerHTML = "<h1 class='rainbow-text'>Yay! Happy Valentine's Day! ❤️</h1>";

        // Spawn hearts and flowers falling
        for (let i = 0; i < 500; i++) {
            createFallingImage(true); // true for hearts/flowers
        }
    });

    function createFallingImage(isHeartFlower = false) {
        const img = document.createElement("img");

        // Randomly choose between heart.png and flower.png if "Yes!" clicked
        const images = isHeartFlower ? ["assets/heart.png", "assets/flower.png"] : ["assets/thumbDown.png", "assets/sadFace.png","assets/heartBreak.png"];
        img.src = images[Math.floor(Math.random() * images.length)];

        img.classList.add("falling-image");

        // Random starting position
        let startX = Math.random() * window.innerWidth; 
        let startY = Math.random() * -200; 

        img.style.left = `${startX}px`;
        img.style.top = `${startY}px`;

        document.body.appendChild(img);

        // Random horizontal drift
        let endX = startX + (Math.random() * 300 - 150);
        let duration = Math.random() * 2 + 2; 

        img.style.setProperty("--end-x", `${endX}px`);
        img.style.setProperty("--fall-time", `${duration}s`);

        animateFallingImage(img);
    }

    function animateFallingImage(img) {
        let startX = parseFloat(img.style.left);
        let endX = parseFloat(img.style.getPropertyValue("--end-x"));
        let duration = parseFloat(img.style.getPropertyValue("--fall-time"));

        img.animate([
            { transform: `translate(${startX}px, 0)`, opacity: 1 },
            { transform: `translate(${endX}px, ${window.innerHeight}px)`, opacity: 1 }
        ], {
            duration: duration * 1000,
            easing: "linear",
            fill: "forwards"
        });

        // Remove the element after animation completes
        setTimeout(() => img.remove(), duration * 1000);
    }
});
