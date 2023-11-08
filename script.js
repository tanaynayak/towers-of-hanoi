
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
        const disc = document.createElement('div');
        disc.id = "disc" + i;
        disc.className = "disc";
        disc.setAttribute('draggable', true);
        disc.style.bottom = (20 + i * 25) + 'px'; // Corrected bottom offset
        disc.addEventListener("dragstart", dragStart);
        disc.addEventListener("dragend", dragEnd);
        tower0.appendChild(disc);
    }
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
    if (tower && (!tower.lastElementChild || tower.lastElementChild.offsetWidth > draggedDisc.offsetWidth)) {
        tower.appendChild(draggedDisc);
        moveCounter++;
        document.getElementById("moveCounter").textContent = "Moves: " + moveCounter;
        updateDiscPositions(tower);
        checkForVictory();
    }
}

function updateDiscPositions(tower) {
    let i = 0;
    const childrenArray = Array.from(tower.children);
    childrenArray.forEach(disc => {
        disc.style.bottom = (20 + i * 25) + 'px'; // Corrected bottom offset
        i++;
    });
}

function checkForVictory() {
    const tower2 = document.getElementById("tower2");
    if (tower2.children.length === 3) {
        document.getElementById("victoryMessage").textContent = "You have won in " + moveCounter + " moves!";
    }
}