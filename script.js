
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
    draggedDisc = event.target;
    setTimeout(() => (draggedDisc.style.visibility = "hidden"), 0);
}

function dragEnd() {
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
    if (tower && (!tower.lastElementChild || parseInt(draggedDisc.id.replace('disc', '')) < parseInt(tower.lastElementChild.id.replace('disc', '')))) {
        tower.appendChild(draggedDisc);
        moveCounter++;
        document.getElementById("moveCounter").textContent = "Moves: " + moveCounter;
        updateDiscPositions(tower);
        checkForVictory();
    }
}

function updateDiscPositions(tower) {
    let discs = Array.from(tower.children);
    // Sort the discs by size in ascending order
    discs.sort((a, b) => parseInt(a.id.replace('disc', '')) - parseInt(b.id.replace('disc', '')));
    // Calculate bottom position to stack discs from largest to smallest
    discs.forEach((disc, index) => {
        disc.style.bottom = (20 * index) + 'px';
    });
}

function checkForVictory() {
    const tower2 = document.getElementById("tower2");
    if (tower2.children.length === 3) {
        document.getElementById("victoryMessage").textContent = "You have won in " + moveCounter + " moves!";
    }
}