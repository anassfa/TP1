const formulaire = document.querySelector("#qcmForm");
const zoneQuestions = document.querySelector("#questions");

const resetBtn = document.querySelector("#resetBtn");
const correctionBtn = document.querySelector("#correctionBtn");
const resultBtn = document.querySelector("#resultBtn");

const resultModal = document.querySelector("#resultModal");
const scoreText = document.querySelector("#scoreText");
const percentageText = document.querySelector("#percentageText");
const scoreDetails = document.querySelector("#scoreDetails");

const questions = [
    {
        enonce: "Quels langages sont utilisés pour structurer et présenter une page web ?",
        choix: ["HTML", "CSS", "Python", "JavaScript"],
        bonnesReponses: [0, 1],
        type: "multiple"
    },
    {
        enonce: "Quelle propriété CSS permet de changer la couleur du texte ?",
        choix: ["font-size", "color", "background-color", "margin"],
        bonnesReponses: [1],
        type: "simple"
    },
    {
        enonce: "Quelles instructions permettent d'afficher un message en JavaScript ?",
        choix: ["console.log()", "alert()", "print()", "echo"],
        bonnesReponses: [0, 1],
        type: "multiple"
    },
    {
        enonce: "Quelle méthode permet de sélectionner un élément par son identifiant ?",
        choix: [
            "document.querySelectorAll()",
            "document.getElementById()",
            "document.createElement()",
            "document.appendChild()"
        ],
        bonnesReponses: [1],
        type: "simple"
    },
    {
        enonce: "Quelles méthodes permettent de parcourir ou transformer un tableau ?",
        choix: ["forEach()", "map()", "innerHTML()", "querySelector()"],
        bonnesReponses: [0, 1],
        type: "multiple"
    }
];

function afficherQuestions() {
    zoneQuestions.innerHTML = "";

    questions.forEach((question, index) => {
        const bloc = document.createElement("section");
        bloc.className = "question";

        const header = document.createElement("div");
        header.className = "question-header";

        const titre = document.createElement("h2");
        titre.textContent = `Question ${index + 1} : ${question.enonce}`;

        const type = document.createElement("span");
        type.className = "type-badge";
        type.textContent = question.type === "multiple" ? "Choix multiples" : "Choix unique";

        header.appendChild(titre);
        header.appendChild(type);
        bloc.appendChild(header);

        const optionsList = document.createElement("div");
        optionsList.className = "options-list";

        question.choix.forEach((choix, choixIndex) => {
            const label = document.createElement("label");
            label.className = "option";

            const input = document.createElement("input");
            input.type = question.type === "multiple" ? "checkbox" : "radio";
            input.name = "question" + index;
            input.value = choixIndex;

            label.appendChild(input);
            label.appendChild(document.createTextNode(choix));
            optionsList.appendChild(label);
        });

        bloc.appendChild(optionsList);
        zoneQuestions.appendChild(bloc);
    });
}

function obtenirReponses(index) {
    const selection = formulaire.querySelectorAll(`input[name="question${index}"]:checked`);
    return Array.from(selection).map(input => Number(input.value));
}

function estCorrecte(index) {
    const reponsesUtilisateur = obtenirReponses(index);
    const bonnesReponses = questions[index].bonnesReponses;

    if (reponsesUtilisateur.length !== bonnesReponses.length) {
        return false;
    }

    return bonnesReponses.every(reponse => reponsesUtilisateur.includes(reponse));
}

function calculerScore() {
    let score = 0;
    questions.forEach((_, index) => {
        if (estCorrecte(index)) score++;
    });
    return score;
}

// Nettoyer les classes de correction
function reinitialiserStyles() {
    document.querySelectorAll(".option").forEach(opt => {
        opt.classList.remove("correct", "incorrect");
    });
    resultModal.classList.add("hidden");
}

// Action : Réinitialiser
resetBtn.addEventListener("click", () => {
    formulaire.reset();
    reinitialiserStyles();
});

// Action : Résultat (In-page)
resultBtn.addEventListener("click", () => {
    const score = calculerScore();
    const pourcentage = Math.round((score / questions.length) * 100);

    scoreText.textContent = `${score} / ${questions.length}`;
    percentageText.textContent = `(${pourcentage}%)`;

    scoreDetails.innerHTML = "";
    questions.forEach((_, index) => {
        const correcte = estCorrecte(index);
        const li = document.createElement("li");
        li.innerHTML = `
            <span>Question ${index + 1}</span>
            <strong style="color: ${correcte ? '#10b981' : '#ef4444'}">
                ${correcte ? '✓ Correcte' : '✗ Incorrecte'}
            </strong>
        `;
        scoreDetails.appendChild(li);
    });

    resultModal.classList.remove("hidden");
    resultModal.scrollIntoView({ behavior: 'smooth' });
});

// Action : Correction visuelle directe
correctionBtn.addEventListener("click", () => {
    reinitialiserStyles();

    questions.forEach((question, qIndex) => {
        const options = zoneQuestions.children[qIndex].querySelectorAll(".option");

        question.choix.forEach((_, cIndex) => {
            const optionLabel = options[cIndex];
            const estBonne = question.bonnesReponses.includes(cIndex);

            if (estBonne) {
                optionLabel.classList.add("correct");
            }
        });
    });
});

// Initialisation
afficherQuestions();