var quiz = {
  // (A) PROPERTIES
  // (A1) QUESTIONS & ANSWERS
  // Q = QUESTION, O (THE LETTER AFTER N) = OPTIONS, A = CORRECT ANSWER
  data: [
  {
    q : "Can an adult stand on top of an igloo?",
    o : [
      "Yes",
      "No",
    ],
    a : 0 // arrays start with 0, so the answer is Yes
  },
  {
    q : "Who lived in Igloos?",
    o : [
      "Vikings",
      "Swedish people",
      "Native Americans",
      "Inuit tribes"
    ],
    a : 3
  },
  {
    q : "Just take a guess which one is correct?",
    o : [
      "Only dogs exist",
      "Cats and dogs don't exist",
      "Dogs are cats",
      "Cats are dogs"
    ],
    a : 2
  },
  {
    q : "How many planets have igloos?",
    o : [
      "1",
      "3",
      "5",
      "0"
    ],
    a : 0
  },
  {
    q : "Would you like to live in a renovated igloo?",
    o : [
      "Renovated igloo??!",
      "Haha, funny. No.",
      "Sure",
      "Does it have a fireplace?"
    ],
    a : 3
  }
  ],

  // (A2) HTML ELEMENTS
  hWrap: null, // HTML quiz container
  hQn: null, // HTML question wrap
  hAns: null, // HTML answers wrap

  // (A3) GAME FLAGS
  now: 0, // current question
  score: 0, // current score 

  // (B) INIT QUIZ HTML
  init: () => {
    // (B1) WRAPPER
    quiz.hWrap = document.getElementById("quizWrap");

    // (B2) QUESTIONS SECTION
    quiz.hQn = document.createElement("div");
    quiz.hQn.id = "quizQn";
    quiz.hWrap.appendChild(quiz.hQn);

    // (B3) ANSWERS SECTION
    quiz.hAns = document.createElement("div");
    quiz.hAns.id = "quizAns";
    quiz.hWrap.appendChild(quiz.hAns);

    // (B4) GO!
    quiz.draw();
  },

  // (C) DRAW QUESTION
  draw: () => {
    // (C1) QUESTION
    quiz.hQn.innerHTML = quiz.data[quiz.now].q;

    // (C2) OPTIONS
    quiz.hAns.innerHTML = "";
    for (let i in quiz.data[quiz.now].o) {
      let radio = document.createElement("input");
      radio.type = "radio";
      radio.name = "quiz";
      radio.id = "quizo" + i;
      quiz.hAns.appendChild(radio);
      let label = document.createElement("label");
      label.innerHTML = quiz.data[quiz.now].o[i];
      label.setAttribute("for", "quizo" + i);
      label.dataset.idx = i;
      label.addEventListener("click", () => { quiz.select(label); });
      quiz.hAns.appendChild(label);
    }
  },

  // (D) OPTION SELECTED
  select: (option) => {
    // (D1) DETACH ALL ONCLICK
    let all = quiz.hAns.getElementsByTagName("label");
    for (let label of all) {
      label.removeEventListener("click", quiz.select);
    }

    // (D2) CHECK IF CORRECT
    let correct = option.dataset.idx == quiz.data[quiz.now].a;
    if (correct) {
      quiz.score++;
      option.classList.add("correct");
    } else {
      option.classList.add("wrong");
    }

    // (D3) NEXT QUESTION OR END GAME
    quiz.now++;
    setTimeout(() => {
      if (quiz.now < quiz.data.length) { quiz.draw(); }
      else {
        quiz.hQn.innerHTML = `${quiz.score} of ${quiz.data.length} correct. Well done!`;
        quiz.hAns.innerHTML = "";
      }
    }, 1000);
  },

  // (E) RESTART QUIZ
  reset : () => {
    quiz.now = 0;
    quiz.score = 0;
    quiz.draw();
  }
};
window.addEventListener("load", quiz.init);
