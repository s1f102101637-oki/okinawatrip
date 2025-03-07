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

// gallery.html 用
document.addEventListener("DOMContentLoaded", function () {
    const imageUpload = document.getElementById("imageUpload");
    const galleryContainer = document.getElementById("galleryContainer");

    // 🌟 ローカルストレージから画像を読み込む関数
    function loadImages() {
        galleryContainer.innerHTML = ""; // クリア
        const images = JSON.parse(localStorage.getItem("galleryImages")) || [];

        images.forEach((imageSrc, index) => {
            addImageToGallery(imageSrc, index);
        });

        console.log("現在の画像数:", images.length); // デバッグ用

        // 📢 画像の枚数を `localStorage` に保存
        localStorage.setItem("imageCount", images.length);
    }

    // 🌟 画像をギャラリーに追加する関数
    function addImageToGallery(src, index) {
        const imgWrapper = document.createElement("div");
        imgWrapper.classList.add("image-wrapper");

        const img = document.createElement("img");
        img.src = src;
        img.classList.add("gallery-img");
        img.addEventListener("click", function () {
            openImageModal(src);
        });

        // ❌ 削除ボタンを作成
        const deleteBtn = document.createElement("button");
        deleteBtn.innerText = "×";
        deleteBtn.classList.add("delete-btn");
        deleteBtn.addEventListener("click", function () {
            removeImage(index);
        });

        imgWrapper.appendChild(img);
        imgWrapper.appendChild(deleteBtn);
        galleryContainer.appendChild(imgWrapper);
    }

    // 🌟 画像をローカルストレージに保存する関数
    function saveImages(srcArray) {
        let images = JSON.parse(localStorage.getItem("galleryImages")) || [];

        // 📢 選択したすべての画像を追加
        images = images.concat(srcArray);

        localStorage.setItem("galleryImages", JSON.stringify(images));
        loadImages(); // 再描画
    }

    // 🗑 画像を削除する関数
    function removeImage(index) {
        let images = JSON.parse(localStorage.getItem("galleryImages")) || [];

        images.splice(index, 1); // 指定した画像を削除
        localStorage.setItem("galleryImages", JSON.stringify(images));

        loadImages(); // 再描画
    }

    // 🌟 複数画像アップロード対応
    imageUpload.addEventListener("change", function (event) {
        const files = event.target.files;
        if (files.length > 0) {
            const readers = [];
            let imagesArray = [];

            for (let i = 0; i < files.length; i++) {
                readers[i] = new FileReader();
                readers[i].onload = function (e) {
                    imagesArray.push(e.target.result);

                    // 全ての画像が読み込まれたら保存
                    if (imagesArray.length === files.length) {
                        saveImages(imagesArray);
                    }
                };
                readers[i].readAsDataURL(files[i]);
            }
        }
    });

    // 🌟 画像を拡大表示するモーダルを作成
    function openImageModal(src) {
        const modal = document.createElement("div");
        modal.classList.add("modal");

        const img = document.createElement("img");
        img.src = src;
        img.classList.add("modal-img");

        modal.appendChild(img);
        document.body.appendChild(modal);

        modal.addEventListener("click", function () {
            modal.remove();
        });
    }

    // 🔄 初回読み込み時にローカルストレージから画像を取得
    loadImages();
});

// plan.html のためのスクリプト
document.addEventListener("DOMContentLoaded", function () {
    const nextDayPlan = document.getElementById("nextDayPlan");

    function checkImageCount() {
        const imageCount = localStorage.getItem("imageCount") || 0;
        console.log("現在の画像数（planページ）:", imageCount);

        if (imageCount >= 10) {
            nextDayPlan.style.display = "block"; // 🔓 解放！
        } else {
            nextDayPlan.style.display = "none"; // 🚫 まだ非表示
        }
    }

    checkImageCount();
});

document.addEventListener("DOMContentLoaded", function () {
    const day2 = document.getElementById("day2");
    const day3 = document.getElementById("day3");

    function unlockPlan() {
        let images = JSON.parse(localStorage.getItem("galleryImages")) || [];
        let imageCount = images.length;

        // 画像枚数に応じて旅行プランを解放
        if (imageCount >= 5) {
            day2.style.display = "block";
        } else {
            day2.style.display = "none";
        }

        if (imageCount >= 10) {
            day3.style.display = "block";
        } else {
            day3.style.display = "none";
        }
    }

    // 初回チェック
    unlockPlan();

    // 画像アップロード時にもチェックする
    window.addEventListener("storage", unlockPlan);
});
