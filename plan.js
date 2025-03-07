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
