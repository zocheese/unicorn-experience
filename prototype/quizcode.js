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
        //locates which question we're on, and checks if it has been answered already
        if (questionNumber == currentSlide && isMarked[questionNumber] == false){
          //marks the question as answered so it cannot be marked again
          isMarked[questionNumber] = true;
        
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
          switch(userAnswer){
            case "a":
              window.alert(currentQuestion.noteA);
              break;
            case "b":
              window.alert(currentQuestion.noteB);
              break;
            case "c":
              window.alert(currentQuestion.noteC);
              break;
            case "d":
              window.alert(currentQuestion.noteD);
              break;
            default:
              window.alert("You forgot to select an answer!");
          }
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
    var isMarked = [false, false];
    var numCorrect = 0;
    const quizContainer = document.getElementById('quiz');
    const resultsContainer = document.getElementById('results');
    const outcomeContainer = document.getElementById('outcome');
    const checkButton = document.getElementById('check');
    const submitButton = document.getElementById('submit');
    const myQuestions = [
      {
        question: "Dr Thoo discussed the four ways of describing an older person. According to him, what is the preferred method of assessing an older person? <br><br> Please select the preferred method, then click the CHECK button.",
        answers: {
          a: "By simply looking at their age",
          b: "Assessing their frailty",
          c: "Assessing their disease burden",
          d: "Conducting a comprehensive assessment with a multidisciplanary team approach"
        },
        correctAnswer: "d",
        correctNote: "Correct! Having the nurses and medical team working together makes it more comprehensive to assess the older person's health and function in depth.",
        noteA: "This is a very general decription, but it won't help when looking at individual patients.",
        noteB: "Identifying frailty is useful but can be broad when describing an older person's health.",
        noteC: "Identifying disease burden is valid but can be broad when discussing a person's health.",
        noteD: "how did you do that"
      },
      {
        question: "After listening to Betty's experience, NUM Jackie is concerned about the patient's dignity and dilemma around nappies and older incontinent patients. What should Jackie do? <br><br> Please select the most appropriate action, then click the CHECK button.",
        answers: {
          a: "Ask Betty to identify the nurse who offered the nappy",
          b: "Call a staff meeting and use a collaborative approach to address the issue",
          c: "Just monitor the situation at this stage as it may have been an isolated incident",
          d: "Ask for extra staff to better manage the workload"
        },
        correctAnswer: "b",
        correctNote: "Correct! Calling a meeting is the best choice. This enables Jackie to support staff to take ownership and collaborate with peers to develop better practice initiatives.",
        noteA: "Betty may feel uncomfortable naming the nurse.",
        noteB: "how did you do that",
        noteC: "Isolated incidents also need attention.",
        noteD: "New staff will reduce the workload but may not be able to address the issue unless practice is changed."
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
  