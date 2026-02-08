const now = new Date(); // 今の時刻の情報をまるごと「now」という箱に入れるconst hour = now.getHours(); // ここで「時間」だけを抜き出す
const hour = now.getHours(); // ここで「時間」だけを抜き出す

// 2. 挨拶を入れるための「変数（箱）」を用意
let greetingText = "";

// 3. if文で条件を分ける
if (hour >= 5 && hour < 11) {
    // 5時以上、かつ11時未満なら
    greetingText = "おはようございます";
} else if (hour >= 11 && hour < 18) {
    // 11時以上、かつ18時未満なら
    greetingText = "こんにちは";
} else {
    // それ以外（夜）なら
    greetingText = "こんばんは";
}
// 「greeting」というIDの場所を探して、その中身を「greetingText」に変える
document.getElementById("greeting").textContent = greetingText;

// 画像を大きく表示する関数
function openModal(imageSrc) {
    const modal = document.getElementById("imageModal");
    const fullImg = document.getElementById("fullImage");
    
    fullImg.src = imageSrc;
    modal.classList.add("is-show"); // 「is-show」クラスを付け足してふわっと出す
}

// 閉じる処理を1つにまとめる（共通化）
function closeModal() {
    const modal = document.getElementById("imageModal");
    modal.classList.remove("is-show"); // クラスを外してふわっと消す
}

// 背景クリックで閉じる処理（ここも書き換え）
window.onclick = function(event) {
    const modal = document.getElementById("imageModal");
    if (event.target == modal || event.target.className == "close") {
        closeModal();
    }
}

// Escキーで閉じる処理（ここも書き換え）
document.addEventListener('keydown', function(event) {
    if (event.key === "Escape") {
        closeModal();
    }
});
