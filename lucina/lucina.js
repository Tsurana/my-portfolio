// --- 1. 検索機能 (ホーム画面用) ---
function searchContent() {
    let input = document.getElementById('strategySearch').value.toLowerCase();
    let cards = document.getElementsByClassName('clickable-item');

    for (let i = 0; i < cards.length; i++) {
        if (cards[i].innerText.toLowerCase().includes(input)) {
            cards[i].style.display = "";
        } else {
            cards[i].style.display = "none";
        }
    }
}

// --- 2. コンボデータ管理 ---
let originalComboData = []; 

function loadLucinaCombos() {
    const comboList = document.getElementById("comboList");
    if (!comboList) return;

    Papa.parse("lucina-combos.csv", {
        download: true,
        header: true,
        skipEmptyLines: true,
        complete: function(results) {
            originalComboData = results.data;
            displayCombos(originalComboData);
        },
        error: function(err) {
            console.error("CSVの読み込みに失敗しました:", err);
        }
    });
}

function displayCombos(data) {
    const comboList = document.getElementById("comboList");
    let html = "";

    if (data.length === 0) {
        comboList.innerHTML = "<p style='color:#666;'>該当するコンボはありません。</p>";
        return;
    }

    data.forEach(row => {
        let catClass = "";
        if(row.category.includes("低")) catClass = "percent";
        if(row.category.includes("中")) catClass = "difficulty";
        if(row.category.includes("高")) catClass = "kill";

        let isKill = row.is_kill && row.is_kill.toLowerCase() === "true";
        let cardClass = isKill ? "combo-card kill-confirm" : "combo-card";

        let moves = [row.move1, row.move2, row.move3, row.move4].filter(m => m && m.trim() !== "");
        let routeHtml = moves.map(m => `<span class="move-box">${m}</span>`).join('<span class="arrow">→</span>');

        html += `
            <div class="${cardClass}">
                <div class="combo-header">
                    <span class="badge ${catClass}">${row.category}</span>
                    <span class="badge">難易度: ${row.difficulty}</span>
                    <span class="badge">実用度: ${row.practicality}</span>
                    <span class="badge importance">${row.Importance}</span>
                </div>
                <div class="combo-route">${routeHtml}</div>
                <p class="combo-desc">${row.note || ""}</p>
            </div>`;
    });
    comboList.innerHTML = html;
}

function filterCombos(cat) {
    if (cat === 'all') {
        displayCombos(originalComboData);
    } else {
        const filtered = originalComboData.filter(row => row.category.includes(cat));
        displayCombos(filtered);
    }
}

function sortCombos(type) {
    let dataToSort = [...originalComboData];
    if (type === 'practicality') {
        dataToSort.sort((a, b) => {
            const getScore = (str) => {
                let score = (str.match(/★/g) || []).length;
                if (str.includes('⯪')) score += 0.5;
                return score;
            };
            return getScore(b.practicality) - getScore(a.practicality);
        });
    }
    displayCombos(dataToSort);
}

// --- 3. ページ読み込み時の実行処理を一つにまとめる ---
document.addEventListener("DOMContentLoaded", function() {
    // コンボページの場合のみ実行
    if (document.getElementById("comboList")) {
        loadLucinaCombos();
    }
    
    console.log("Lucina Guide Loaded!");
});