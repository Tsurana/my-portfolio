// 1. 挨拶を表示する
const now = new Date();
const hour = now.getHours();
let greetingText = "";

if (hour >= 5 && hour < 11) {
    greetingText = "おはようございます";
} else if (hour >= 11 && hour < 18) {
    greetingText = "こんにちは";
} else {
    greetingText = "こんばんは";
}

const greetingElement = document.getElementById("greeting");
if (greetingElement) {
    greetingElement.textContent = greetingText;
}

// 2. 画像を大きく表示する「道具（関数）」
function openModal(imageSrc) {
    const modal = document.getElementById("imageModal");
    const fullImg = document.getElementById("fullImage");
    if (modal && fullImg) {
        fullImg.src = imageSrc;
        modal.classList.add("is-show");
    }
}

// 3. モーダルを閉じる「道具（関数）」
function closeModal() {
    const modal = document.getElementById("imageModal");
    if (modal) {
        modal.classList.remove("is-show");
    }
}

// 4. ページが読み込まれたら「クリック」の準備をする
document.addEventListener('DOMContentLoaded', () => {
    // 【メインページ用】スライダーの画像
    const sliderImages = document.querySelectorAll('.illustration-slider img');
    sliderImages.forEach(img => {
        img.onclick = () => openModal(img.src);
    });

    // 【ギャラリーページ用】2列の画像
    const galleryImages = document.querySelectorAll('.gallery-grid img');
    galleryImages.forEach(img => {
        img.onclick = () => openModal(img.src);
    });

    // 背景クリックで閉じる
    window.onclick = (event) => {
        const modal = document.getElementById("imageModal");
        if (event.target == modal) {
            closeModal();
        }
    };
});

// 5. Escキーで閉じる設定
document.addEventListener('keydown', (event) => {
    if (event.key === "Escape") {
        closeModal();
    }
});