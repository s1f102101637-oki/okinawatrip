document.addEventListener("DOMContentLoaded", function () {
    console.log("JavaScriptが読み込まれました！");

    // ボタンのアニメーション効果
    const buttons = document.querySelectorAll(".btn");
    buttons.forEach(button => {
        button.addEventListener("mouseover", () => {
            button.style.transform = "scale(1.1)";
            button.style.transition = "0.3s";
        });
        button.addEventListener("mouseout", () => {
            button.style.transform = "scale(1)";
        });
    });

    // ハンバーガーメニュー（スマホ対応用・後で追加）
    const menuToggle = document.querySelector(".menu-toggle");
    const navMenu = document.querySelector("nav ul");

    if (menuToggle) {
        menuToggle.addEventListener("click", () => {
            navMenu.classList.toggle("active");
        });
    }
});

document.addEventListener("DOMContentLoaded", function () {
    const imageUpload = document.getElementById("imageUpload");
    const galleryContainer = document.getElementById("galleryContainer");

    if (imageUpload) {
        imageUpload.addEventListener("change", function (event) {
            const file = event.target.files[0];
            if (file) {
                const reader = new FileReader();
                reader.onload = function (e) {
                    const img = document.createElement("img");
                    img.src = e.target.result;
                    galleryContainer.appendChild(img);
                };
                reader.readAsDataURL(file);
            }
        });
    }
});
