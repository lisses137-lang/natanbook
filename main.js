// References to DOM Elements
const prevBtn = document.querySelector("#prev-btn");
const nextBtn = document.querySelector("#next-btn");
const book = document.querySelector("#book");
const paper1 = document.querySelector("#p1");
const paper2 = document.querySelector("#p2");
const paper3 = document.querySelector("#p3");

// Música de fundo
const music = document.getElementById('bg-music');
music.volume = 0.1;
let musicStarted = false;

function startMusic() {
    if (!musicStarted) {
        music.play();
        musicStarted = true;
    }
}

// Event Listeners
prevBtn.addEventListener("click", () => { startMusic(); goPrevPage(); });
nextBtn.addEventListener("click", () => { startMusic(); goNextPage(); });

// Business Logic
let currentLocation = 1;
let numOfPapers = 3;
let maxLocation = numOfPapers + 1;

// Verifica se é mobile
function isMobile() {
    return window.innerWidth <= 500;
}

function openBook() {
    if (isMobile()) {
        // No mobile o livro não se desloca, só os botões ficam parados
        book.style.transform = "translateX(0%)";
        prevBtn.style.transform = "translateX(0px)";
        nextBtn.style.transform = "translateX(0px)";
    } else {
        const offset = book.offsetWidth / 2;
        book.style.transform = "translateX(50%)";
        prevBtn.style.transform = `translateX(-${offset}px)`;
        nextBtn.style.transform = `translateX(${offset}px)`;
    }
}

function closeBook(isAtBeginning) {
    if (isMobile()) {
        book.style.transform = "translateX(0%)";
    } else {
        book.style.transform = isAtBeginning ? "translateX(0%)" : "translateX(100%)";
    }
    prevBtn.style.transform = "translateX(0px)";
    nextBtn.style.transform = "translateX(0px)";
}

function goNextPage() {
    if (currentLocation < maxLocation) {
        switch (currentLocation) {
            case 1:
                openBook();
                paper1.classList.add("flipped");
                paper1.style.zIndex = 1;
                spawnButterflies();
                break;
            case 2:
                paper2.classList.add("flipped");
                paper2.style.zIndex = 2;
                break;
            case 3:
                paper3.classList.add("flipped");
                paper3.style.zIndex = 3;
                closeBook(false);
                break;
            default:
                throw new Error("unknown state");
        }
        currentLocation++;
    }
}

function goPrevPage() {
    if (currentLocation > 1) {
        switch (currentLocation) {
            case 2:
                closeBook(true);
                paper1.classList.remove("flipped");
                paper1.style.zIndex = 3;
                break;
            case 3:
                paper2.classList.remove("flipped");
                paper2.style.zIndex = 2;
                break;
            case 4:
                openBook();
                paper3.classList.remove("flipped");
                paper3.style.zIndex = 1;
                break;
            default:
                throw new Error("unknown state");
        }
        currentLocation--;
    }
}


spawnPetals();
spawnFallingPolaroids();