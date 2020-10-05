(function(){
    // Functions
    function buildQuiz(){
      // variable to store the HTML output
      const output = [];
  
      // for each question...
      myQuestions.forEach(
        (currentQuestion, questionNumber) => {
  
          // variable to store the list of possible answers
          const answers = [];
  
          // and for each available answer...
          for(letter in currentQuestion.answers){
  
            // ...add an HTML radio button
            answers.push(
              `<label>
                <input type="radio" name="question${questionNumber}" value="${letter}">
                ${letter} :
                ${currentQuestion.answers[letter]}
              </label>`
            );
          }
  
          // add this question and its answers to the output
          output.push(
            `<div class="slide">
              <div class="question"> ${currentQuestion.question} </div>
              <div class="answers"> ${answers.join("")} </div>
            </div>`
          );
        }
      );
  
      // finally combine our output list into one string of HTML and put it on the page
      quizContainer.innerHTML = output.join('');
    }

    function checkAnswer(){

      // gather answer containers from our quiz
      const answerContainers = quizContainer.querySelectorAll('.answers');

      // for each question...
      myQuestions.forEach( (currentQuestion, questionNumber) => {
        //locates which question we're on
        if (questionNumber == currentSlide){
        
        // find selected answer
        const answerContainer = answerContainers[questionNumber];
        const selector = `input[name=question${questionNumber}]:checked`;
        const userAnswer = (answerContainer.querySelector(selector) || {}).value;
  
        // if answer is correct
        if(userAnswer === currentQuestion.correctAnswer){
          // add to the number of correct answers
          numCorrect++;
  
          // color the answers green
          answerContainers[questionNumber].style.color = 'lightgreen';
          // popup appears explaining why answer is correct
          window.alert(currentQuestion.correctNote);
        }
        // if answer is wrong or blank
        else{
          // color the answers red
          answerContainers[questionNumber].style.color = 'red';
          // popup appears explaining why answer was wrong
          window.alert(currentQuestion.wrongNote);
        }
      }

      });

    }
  
    function showResults(){

      //marks the quiz as completed
      isCompleted = true;
  
      // show number of correct answers out of total
      resultsContainer.innerHTML = `${numCorrect} out of ${myQuestions.length}`;
      if(numCorrect === myQuestions.length){
        outcomeContainer.innerHTML = `You Passed!`;
      }
      else{
        outcomeContainer.innerHTML = `You Failed!`;
      }

      submitButton.remove();
    }

    // Controls how the buttons appear
    function showSlide(n) {
      slides[currentSlide].classList.remove('active-slide');
      slides[n].classList.add('active-slide');
      currentSlide = n;
      if(currentSlide === 0){
        previousButton.style.display = 'none';
      }
      else{
        previousButton.style.display = 'inline-block';
      }
      if(currentSlide === slides.length-1){
        nextButton.style.display = 'none';
        submitButton.style.display = 'inline-block';
      }
      else{
        nextButton.style.display = 'inline-block';
        submitButton.style.display = 'none';
      }
      if(isCompleted){
        checkButton.style.display = 'none';
        submitButton.style.display = 'none';
      }
    }
  
    function showNextSlide() {
      showSlide(currentSlide + 1);
    }
  
    function showPreviousSlide() {
      showSlide(currentSlide - 1);
    }
   
    // Variables
    var isCompleted = false;
    var numCorrect = 0;
    const quizContainer = document.getElementById('quiz');
    const resultsContainer = document.getElementById('results');
    const outcomeContainer = document.getElementById('outcome');
    const checkButton = document.getElementById('check');
    const submitButton = document.getElementById('submit');
    const myQuestions = [
      {
        question: "What is 2*2?",
        answers: {
          a: "6",
          b: "4",
          c: "2"
        },
        correctAnswer: "b",
        correctNote: "haha",
        wrongNote: "heehee"
      },
      {
        question: "What is the capital of Australia?",
        answers: {
          a: "Sydney",
          b: "Melbourne",
          c: "Canberra"
        },
        correctAnswer: "c",
        correctNote: "haha",
        wrongNote: "heehee"
      },
      {
        question: "What language is this quiz made in?",
        answers: {
          a: "Java",
          b: "HTML",
          c: "Python",
          d: "JavaScript"
        },
        correctAnswer: "d",
        correctNote: "haha",
        wrongNote: "heehee"
      }
    ];
  
    buildQuiz();
  
    const previousButton = document.getElementById("previous");
    const nextButton = document.getElementById("next");
    const slides = document.querySelectorAll(".slide");
    let currentSlide = 0;
  
    showSlide(currentSlide);
  
    // Event listeners
    submitButton.addEventListener('click', showResults);
    previousButton.addEventListener("click", showPreviousSlide);
    checkButton.addEventListener('click', checkAnswer);
    nextButton.addEventListener("click", showNextSlide);
  })();
  