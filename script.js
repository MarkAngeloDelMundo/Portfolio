const projects = [
    {
        img: "./image/chisa.jpg",
        title: "PROJECT 1",
        desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec et sagittis ex. Nulla eget arcu nulla. Integer scelerisque sodales augue, a mollis orci. Nulla euismod lacus eu accumsan molestie. Sed in porta nunc, blandit blandit velit. Duis a feugiat ex. Interdum et malesuada fames ac ante ipsum primis in faucibus. Proin maximus at leo ut facilisis."
    },
    {
        img: "./image/phrolova.jpg",
        title: "PROJECT 2",
        desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec et sagittis ex. Nulla eget arcu nulla. Integer scelerisque sodales augue, a mollis orci. Nulla euismod lacus eu accumsan molestie. Sed in porta nunc, blandit blandit velit. Duis a feugiat ex. Interdum et malesuada fames ac ante ipsum primis in faucibus. Proin maximus at leo ut facilisis."
    },
    {
        img: "./image/carlotta.jpg",
        title: "PROJECT 3",
        desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec et sagittis ex. Nulla eget arcu nulla. Integer scelerisque sodales augue, a mollis orci. Nulla euismod lacus eu accumsan molestie. Sed in porta nunc, blandit blandit velit. Duis a feugiat ex. Interdum et malesuada fames ac ante ipsum primis in faucibus. Proin maximus at leo ut facilisis."
    },
    {
        img: "./image/galbrena.jpg",
        title: "PROJECT 4",
        desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec et sagittis ex. Nulla eget arcu nulla. Integer scelerisque sodales augue, a mollis orci. Nulla euismod lacus eu accumsan molestie. Sed in porta nunc, blandit blandit velit. Duis a feugiat ex. Interdum et malesuada fames ac ante ipsum primis in faucibus. Proin maximus at leo ut facilisis."
    },
    {
        img: "./image/Wuwa.jpg",
        title: "PROJECT 5",
        desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec et sagittis ex. Nulla eget arcu nulla. Integer scelerisque sodales augue, a mollis orci. Nulla euismod lacus eu accumsan molestie. Sed in porta nunc, blandit blandit velit. Duis a feugiat ex. Interdum et malesuada fames ac ante ipsum primis in faucibus. Proin maximus at leo ut facilisis."
    },
    {
        img: "./image/Wuwa.jpg",
        title: "PROJECT 6",
        desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec et sagittis ex. Nulla eget arcu nulla. Integer scelerisque sodales augue, a mollis orci. Nulla euismod lacus eu accumsan molestie. Sed in porta nunc, blandit blandit velit. Duis a feugiat ex. Interdum et malesuada fames ac ante ipsum primis in faucibus. Proin maximus at leo ut facilisis."
    }
];

let current = 0;
let isTransitioning = false;

const img = document.getElementById("projectImage");
const imageBox = document.querySelector(".project-image-box");
const projectCopy = document.querySelector(".project-copy");
const title = document.getElementById("projectTitle");
const desc = document.getElementById("projectDesc");
const dotsContainer = document.getElementById("dots");
const TRANSITION_DURATION = 250;

imageBox.addEventListener("animationend", () => {
    imageBox.classList.remove("project-enter");
}, { once: true });

projectCopy.addEventListener("animationend", () => {
    projectCopy.classList.remove("project-enter");
}, { once: true });

/* PRELOAD PROJECT IMAGES */
projects.forEach((project) => {
    const preloadImage = new Image();
    preloadImage.src = project.img;
});

/* CREATE DOTS */
projects.forEach((_, index) => {
    const dot = document.createElement("div");
    dot.classList.add("dot");
    dot.onclick = () => goToProject(index);
    dotsContainer.appendChild(dot);
});

function renderProject(project) {
    img.src = project.img;
    title.textContent = project.title;
    desc.textContent = project.desc;

    document.querySelectorAll(".dot").forEach((dot, i) => {
        dot.classList.toggle("active", i === current);
    });
}

function updateProject() {
    const project = projects[current];
    const isInitialLoad = !title.textContent && !desc.textContent;

    if (isInitialLoad) {
        renderProject(project);
        return;
    }

    if (isTransitioning) {
        return;
    }

    isTransitioning = true;
    imageBox.classList.add("is-switching");
    projectCopy.classList.add("is-switching");

    setTimeout(() => {
        renderProject(project);
        imageBox.classList.remove("is-switching");
        projectCopy.classList.remove("is-switching");
        isTransitioning = false;
    }, TRANSITION_DURATION);
}

function nextProject() {
    current = (current + 1) % projects.length;
    updateProject();
}

function prevProject() {
    current = (current - 1 + projects.length) % projects.length;
    updateProject();
}

function goToProject(index) {
    current = index;
    updateProject();
}

/* INIT */
updateProject();
