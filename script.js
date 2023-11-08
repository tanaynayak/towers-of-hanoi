
let draggedDisc = null;
let moveCounter = 0;

document.addEventListener("DOMContentLoaded", () => {
    initializeGame();
    const towers = document.querySelectorAll(".tower");
    towers.forEach(tower => {
        tower.addEventListener("dragover", dragOver);
        tower.addEventListener("drop", drop);
    });
});

function initializeGame() {
    const tower0 = document.getElementById("tower0");
    for (let i = 0; i < 3; i++) {
        let disc = createDisc(i);
        tower0.appendChild(disc);
    }
    updateDiscPositions(tower0);
}

function createDisc(i) {
    const disc = document.createElement('div');
    disc.id = "disc" + i;
    disc.className = "disc";
    disc.setAttribute('draggable', true);
    disc.addEventListener("dragstart", dragStart);
    disc.addEventListener("dragend", dragEnd);
    return disc;
}

function dragStart(event) {
    // Allow dragging only if the event target is the topmost disc of its tower
    if (!event.target.nextElementSibling) {
        draggedDisc = event.target;
        event.dataTransfer.setData("text/plain", event.target.id); // Necessary for Firefox
        setTimeout(() => (draggedDisc.style.visibility = "hidden"), 0);
    }
}

function dragEnd(event) {
    if (draggedDisc) {
        draggedDisc.style.visibility = "visible";
        draggedDisc = null;
    }
}

function dragOver(event) {
    event.preventDefault();
}

function drop(event) {
    event.preventDefault();
    const tower = event.target.closest(".tower");
    // Only allow dropping if the target tower is empty or has a larger top disc
    if (tower && (!tower.lastElementChild || tower.lastElementChild.id > draggedDisc.id)) {
        tower.appendChild(draggedDisc);
        moveCounter++;
        document.getElementById("moveCounter").textContent = "Moves: " + moveCounter;
        updateDiscPositions(tower);
        checkForVictory();
    }
}

function updateDiscPositions(tower) {
    let discs = Array.from(tower.children);
    discs.sort((a, b) => parseInt(a.id.replace('disc', '')) - parseInt(b.id.replace('disc', '')));
    discs.forEach((disc, index) => {
        // The bottom disc (largest) should have the largest bottom value
        disc.style.bottom = ((discs.length - 1 - index) * 20) + 'px';
    });
}

function checkForVictory() {
    const tower2 = document.getElementById("tower2");
    if (tower2.children.length === 3) {
        document.getElementById("victoryMessage").textContent = "Congratulations! You have won in " + moveCounter + " moves!";
    }
}