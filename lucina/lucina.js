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