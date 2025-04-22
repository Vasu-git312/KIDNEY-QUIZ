// DOM Elements
const welcomeScreen = document.getElementById('welcome-screen');
const loadingScreen = document.getElementById('loading-screen');
const quizScreen = document.getElementById('quiz-screen');
const resultsScreen = document.getElementById('results-screen');

const categorySelect = document.getElementById('category');
const difficultySelect = document.getElementById('difficulty');
const questionsCountSelect = document.getElementById('questions');
const startBtn = document.getElementById('start-btn');

const currentCategorySpan = document.getElementById('current-category');
const currentDifficultySpan = document.getElementById('current-difficulty');
const currentQuestionSpan = document.getElementById('current-question');
const totalQuestionsSpan = document.getElementById('total-questions');
const progressFill = document.getElementById('progress-fill');
const timeLeftSpan = document.getElementById('time-left');
const questionText = document.getElementById('question-text');
const answersContainer = document.getElementById('answers-container');

const scorePercentageSpan = document.getElementById('score-percentage');
const correctAnswersSpan = document.getElementById('correct-answers');
const resultsTotalQuestionsSpan = document.getElementById('results-total-questions');
const highestStreakSpan = document.getElementById('highest-streak');
const averageTimeSpan = document.getElementById('average-time');
const reviewBtn = document.getElementById('review-btn');
const newQuizBtn = document.getElementById('new-quiz-btn');
const answerReview = document.getElementById('answer-review');
const reviewContainer = document.getElementById('review-container');

// Quiz state
let quiz = {
    questions: [],
    currentQuestionIndex: 0,
    correctAnswers: 0,
    userAnswers: [],
    answeredQuestions: 0,
    timePerQuestion: [],
    currentStreak: 0,
    highestStreak: 0,
    timerInterval: null,
    timeLeft: 20,
    maxTime: 20
};

// Event Listeners
startBtn.addEventListener('click', startQuiz);
reviewBtn.addEventListener('click', toggleReviewAnswers);
newQuizBtn.addEventListener('click', resetQuiz);

// Kidney Questions Database
const kidneyQuestions = {
    // Anatomy of the kidney
    '9': {
        'easy': [
            {
                question: "What is the main functional unit of the kidney?",
                correct_answer: "Nephron",
                incorrect_answers: ["Glomerulus", "Tubule", "Calyx"]
            },
            {
                question: "How many kidneys does a normal human have?",
                correct_answer: "2",
                incorrect_answers: ["1", "3", "4"]
            },
            {
                question: "Which part of the nephron filters blood?",
                correct_answer: "Glomerulus",
                incorrect_answers: ["Loop of Henle", "Collecting Duct", "Distal Tubule"]
            },
            {
                question: "Where are the kidneys located in the human body?",
                correct_answer: "Behind the peritoneum, on either side of the spine",
                incorrect_answers: ["In the pelvic cavity", "In the thoracic cavity", "In the abdominal cavity, in front of the peritoneum"]
            },
            {
                question: "What is the outer part of the kidney called?",
                correct_answer: "Renal Cortex",
                incorrect_answers: ["Renal Medulla", "Renal Capsule", "Renal Pelvis"]
            },
            {
                question: "Which blood vessels bring blood into the kidney?",
                correct_answer: "Renal Arteries",
                incorrect_answers: ["Renal Veins", "Interlobar Arteries", "Arcuate Veins"]
            },
            {
                question: "What is the cup-like structure that collects urine in the kidney called?",
                correct_answer: "Calyx",
                incorrect_answers: ["Ureter", "Pelvis", "Papilla"]
            },
            {
                question: "Approximately how many nephrons are in each kidney?",
                correct_answer: "1 million",
                incorrect_answers: ["100,000", "10 million", "100 million"]
            },
            {
                question: "Which part of the nephron is responsible for reabsorbing water?",
                correct_answer: "Collecting Duct",
                incorrect_answers: ["Proximal Tubule", "Bowman's Capsule", "Glomerulus"]
            },
            {
                question: "What color are healthy kidneys?",
                correct_answer: "Reddish-brown",
                incorrect_answers: ["Pale yellow", "Deep purple", "Gray"]
            },
            {
                question: "Which hormone produced by the kidneys helps regulate red blood cell production?",
                correct_answer: "Erythropoietin",
                incorrect_answers: ["Renin", "Calcitriol", "Angiotensin"]
            },
            {
                question: "What is the approximate weight of an adult human kidney?",
                correct_answer: "150 grams",
                incorrect_answers: ["500 grams", "50 grams", "1 kilogram"]
            },
            {
                question: "Which structure connects the kidney to the bladder?",
                correct_answer: "Ureter",
                incorrect_answers: ["Urethra", "Renal Tubule", "Collecting Duct"]
            },
            {
                question: "What is the innermost part of the kidney called?",
                correct_answer: "Renal Medulla",
                incorrect_answers: ["Renal Cortex", "Renal Capsule", "Renal Column"]
            },
            {
                question: "What is the approximate length of an adult human kidney?",
                correct_answer: "10-12 cm",
                incorrect_answers: ["5-7 cm", "15-20 cm", "25-30 cm"]
            }
        ],
        'medium': [
            {
                question: "Which cells in the kidney produce renin?",
                correct_answer: "Juxtaglomerular cells",
                incorrect_answers: ["Podocytes", "Mesangial cells", "Macula densa cells"]
            },
            {
                question: "What is the name of the membrane that surrounds the glomerular capillaries?",
                correct_answer: "Basement membrane",
                incorrect_answers: ["Bowman's capsule", "Filtration membrane", "Endothelium"]
            },
            {
                question: "Which part of the nephron is impermeable to water when ADH is absent?",
                correct_answer: "Collecting Duct",
                incorrect_answers: ["Proximal Tubule", "Loop of Henle", "Distal Tubule"]
            },
            {
                question: "What is the structure formed by the glomerulus and Bowman's capsule together called?",
                correct_answer: "Renal Corpuscle",
                incorrect_answers: ["Renal Tubule", "Nephron", "Renal Segment"]
            },
            {
                question: "Which ions are actively reabsorbed in the Loop of Henle?",
                correct_answer: "Sodium and Chloride",
                incorrect_answers: ["Potassium and Calcium", "Bicarbonate and Phosphate", "Magnesium and Sulfate"]
            },
            {
                question: "What is the primary waste product filtered by the kidneys?",
                correct_answer: "Urea",
                incorrect_answers: ["Creatinine", "Uric acid", "Ammonia"]
            },
            {
                question: "Which part of the nephron is responsible for concentrating urine?",
                correct_answer: "Loop of Henle",
                incorrect_answers: ["Glomerulus", "Proximal Tubule", "Bowman's Capsule"]
            },
            {
                question: "What structure separates the renal cortex from the renal medulla?",
                correct_answer: "Corticomedullary Junction",
                incorrect_answers: ["Renal Capsule", "Renal Column", "Renal Sinus"]
            },
            {
                question: "Which cells line the inside of Bowman's capsule?",
                correct_answer: "Podocytes",
                incorrect_answers: ["Mesangial cells", "Endothelial cells", "Juxtaglomerular cells"]
            },
            {
                question: "What is the approximate rate of blood flow through both kidneys per minute?",
                correct_answer: "1200 mL",
                incorrect_answers: ["600 mL", "2400 mL", "3600 mL"]
            },
            {
                question: "What is the name of the specialized area where the distal tubule contacts its own afferent arteriole?",
                correct_answer: "Juxtaglomerular Apparatus",
                incorrect_answers: ["Macula Densa", "Vasa Recta", "Collecting System"]
            },
            {
                question: "Which part of the nephron has a brush border to increase surface area for reabsorption?",
                correct_answer: "Proximal Tubule",
                incorrect_answers: ["Distal Tubule", "Collecting Duct", "Loop of Henle"]
            },
            {
                question: "What is the name of the small arteries that extend into the renal medulla?",
                correct_answer: "Vasa Recta",
                incorrect_answers: ["Arcuate Arteries", "Interlobular Arteries", "Afferent Arterioles"]
            },
            {
                question: "Which enzyme produced in the kidneys converts vitamin D to its active form?",
                correct_answer: "1-alpha-hydroxylase",
                incorrect_answers: ["Renin", "Carbonic Anhydrase", "Angiotensin Converting Enzyme"]
            },
            {
                question: "What is the approximate filtration rate of the kidneys per day?",
                correct_answer: "180 liters",
                incorrect_answers: ["50 liters", "100 liters", "300 liters"]
            }
        ],
        'hard': [
            {
                question: "Which type of cell forms the ascending limb of the Loop of Henle?",
                correct_answer: "Simple cuboidal epithelium",
                incorrect_answers: ["Simple squamous epithelium", "Stratified columnar epithelium", "Transitional epithelium"]
            },
            {
                question: "What is the approximate osmolarity at the tip of the medullary pyramid in the kidney?",
                correct_answer: "1200 mOsm/L",
                incorrect_answers: ["300 mOsm/L", "900 mOsm/L", "1800 mOsm/L"]
            },
            {
                question: "Which transporter protein in the proximal tubule is responsible for glucose reabsorption?",
                correct_answer: "SGLT2",
                incorrect_answers: ["GLUT1", "GLUT2", "SGLT1"]
            },
            {
                question: "Which part of the nephron has the lowest permeability to water?",
                correct_answer: "Ascending limb of Loop of Henle",
                incorrect_answers: ["Descending limb of Loop of Henle", "Collecting Duct", "Proximal Tubule"]
            },
            {
                question: "What is the primary mechanism that drives filtration in the glomerulus?",
                correct_answer: "Hydrostatic pressure",
                incorrect_answers: ["Osmotic pressure", "Active transport", "Facilitated diffusion"]
            },
            {
                question: "Which regulatory protein helps maintain the structure of the filtration barrier?",
                correct_answer: "Nephrin",
                incorrect_answers: ["Aquaporin", "Podocin", "Tamm-Horsfall protein"]
            },
            {
                question: "What is the condition called when protein appears in the urine due to damaged glomerular filtration barriers?",
                correct_answer: "Proteinuria",
                incorrect_answers: ["Glycosuria", "Hematuria", "Ketonuria"]
            },
            {
                question: "Which ion is primarily responsible for the countercurrent multiplier mechanism in the Loop of Henle?",
                correct_answer: "Sodium",
                incorrect_answers: ["Potassium", "Chloride", "Calcium"]
            },
            {
                question: "What is the name of the sphincter at the junction of the ureter and bladder?",
                correct_answer: "Ureterovesical Junction",
                incorrect_answers: ["Urethral Sphincter", "Vesicoureteral Valve", "Trigonal Sphincter"]
            },
            {
                question: "Which endocrine cells in the kidney secrete renin?",
                correct_answer: "Juxtaglomerular cells",
                incorrect_answers: ["Mesangial cells", "Principal cells", "Macula densa cells"]
            },
            {
                question: "What embryonic structure gives rise to the kidneys?",
                correct_answer: "Metanephros",
                incorrect_answers: ["Pronephros", "Mesonephros", "Nephrogenic cord"]
            },
            {
                question: "What is the glomerular filtration barrier composed of?",
                correct_answer: "Endothelium, basement membrane, and podocyte foot processes",
                incorrect_answers: ["Bowman's capsule, mesangium, and macula densa", "Proximal tubule, filtration slits, and pedicels", "Glomerular capillaries, afferent arteriole, and efferent arteriole"]
            },
            {
                question: "Which channel protein in the collecting duct is regulated by ADH (antidiuretic hormone)?",
                correct_answer: "Aquaporin-2",
                incorrect_answers: ["ENaC", "ROMK", "Aquaporin-1"]
            },
            {
                question: "What is the name of the glycoprotein produced by cells of the thick ascending limb that helps prevent urinary tract infections?",
                correct_answer: "Tamm-Horsfall protein",
                incorrect_answers: ["Uromodulin", "Defensin", "Urokinase"]
            },
            {
                question: "Which transporter is inhibited by loop diuretics like furosemide?",
                correct_answer: "Na-K-2Cl cotransporter",
                incorrect_answers: ["Na-H exchanger", "Na-Cl cotransporter", "Na-K ATPase"]
            }
        ],
    },
    // Dialysis Technology
    '17': {
        'easy': [
            {
                question: "What is dialysis used for?",
                correct_answer: "To remove waste and excess fluid from the blood",
                incorrect_answers: ["To pump blood into the heart", "To digest food", "To produce hormones"],

            },
            {
                question: "Which organ does dialysis replace?",
                correct_answer: "Kidney",
                incorrect_answers: ["Liver", "Heart", "Lungs"],
            },
            {
                question: "What is the most common type of dialysis?",
                correct_answer: "Hemodialysis",
                incorrect_answers: ["Peritoneal dialysis", "Plasmapheresis", "Photopheresis"],

            },
            {
                question: "Where is the blood filtered in hemodialysis?",
                correct_answer: "Dialyzer",
                incorrect_answers: ["Lungs", "Heart", "Bladder"],

            },
            {
                question: "How many times a week is hemodialysis usually done?",
                correct_answer: "3 times",
                incorrect_answers: ["Once", "Daily", "Only when needed"],

            },
            {
                question: "What is used to connect a patient to the dialysis machine?",
                correct_answer: "Vascular access",
                incorrect_answers: ["Stent", "Catheter in the chest", "Needle in the leg"],


            },
            {
                question: "What fluid is used in dialysis to clean the blood?",
                correct_answer: "Dialysate",
                incorrect_answers: ["Plasma", "Saline", "Insulin"],

            },
            {
                question: "What type of dialysis can be done at home?",
                correct_answer: "Peritoneal dialysis",
                incorrect_answers: ["Hemodialysis", "Blood transfusion", "Ultrafiltration"],

            },
            {
                question: "Which membrane is used in peritoneal dialysis?",
                correct_answer: "Peritoneal membrane",
                incorrect_answers: ["Lung membrane", "Skin membrane", "Heart membrane"],

            },
            {
                question: "How long does a typical hemodialysis session last?",
                correct_answer: "4 hours",
                incorrect_answers: ["30 minutes", "1 hour", "10 hours"],

            },
            {
                question: "What complication can occur if too much fluid is removed during dialysis?",
                correct_answer: "Low blood pressure",
                incorrect_answers: ["High blood pressure", "Fever", "Weight gain"],

            },
            {
                question: "What is a common dietary restriction for dialysis patients?",
                correct_answer: "Low potassium",
                incorrect_answers: ["High sugar", "Low protein", "High calcium"],

            },
            {
                question: "What is a fistula in dialysis?",
                correct_answer: "A surgical connection between an artery and a vein",
                incorrect_answers: ["A type of catheter", "A blood clot", "A kidney tube"],

            },
            {
                question: "Which lab value is commonly monitored in dialysis patients?",
                correct_answer: "Creatinine",
                incorrect_answers: ["Hemoglobin A1C", "Calcium carbonate", "Insulin level"],

            },
            {
                question: "Which type of dialysis uses the abdomen to filter blood?",
                correct_answer: "Peritoneal dialysis",
                incorrect_answers: ["Hemodialysis", "Ultrafiltration", "Plasmapheresis"]

            },

        ],
        'medium': [
            {
                question: "What component in dialysate helps maintain acid-base balance?",
                correct_answer: "Bicarbonate",
                incorrect_answers: ["Calcium", "Potassium", "Sodium"],
            },
            {
                question: "What term describes the movement of solutes across a membrane in dialysis?",
                correct_answer: "Diffusion",
                incorrect_answers: ["Filtration", "Secretion", "Absorption"],

            },
            {
                question: "Which of the following is a complication of peritoneal dialysis?",
                correct_answer: "Peritonitis",
                incorrect_answers: ["Myocardial infarction", "Hepatitis", "Stroke"],


            },
            {
                question: "Which substance is not effectively removed by dialysis?",
                correct_answer: "Large protein-bound toxins",
                incorrect_answers: ["Urea", "Creatinine", "Potassium"],

            },
            {
                question: "What is the primary cause of anemia in dialysis patients?",
                correct_answer: "Reduced erythropoietin production",
                incorrect_answers: ["Blood loss during dialysis", "Low iron intake", "Dehydration"],

            },
            {
                question: "What is the role of heparin during hemodialysis?",
                correct_answer: "To prevent blood clotting",
                incorrect_answers: ["To remove toxins", "To regulate pH", "To lower blood pressure"],

            },
            {
                question: "Which part of the dialyzer acts as a semi-permeable membrane?",
                correct_answer: "Hollow fibers",
                incorrect_answers: ["Plastic casing", "Tubing", "Chamber"],

            },
            {
                question: "What is the ideal blood flow rate during hemodialysis?",
                correct_answer: "300–500 mL/min",
                incorrect_answers: ["100–150 mL/min", "600–800 mL/min", "50–100 mL/min"],

            },
            {
                question: "Which vitamin is often supplemented in dialysis patients?",
                correct_answer: "Vitamin D",
                incorrect_answers: ["Vitamin K", "Vitamin A", "Vitamin C"],

            },
            {
                question: "What is the typical dialysate pH range used in hemodialysis?",
                correct_answer: "6.8 to 7.6",
                incorrect_answers: ["5.0 to 5.5", "7.8 to 8.5", "4.5 to 6.0"],

            },
            {
                question: "Which electrolyte imbalance is most dangerous in dialysis patients?",
                correct_answer: "Hyperkalemia",
                incorrect_answers: ["Hypocalcemia", "Hyponatremia", "Hyperphosphatemia"],

            },
            {
                question: "How long is the typical lifespan of a well-functioning AV fistula?",
                correct_answer: "5 to 10 years",
                incorrect_answers: ["1 year", "Less than 6 months", "10 to 20 days"],

            },
            {
                question: "What is a major risk of central venous catheters for dialysis?",
                correct_answer: "Infection",
                incorrect_answers: ["Kidney stones", "Heart attack", "Hypoglycemia"],

            },
            {
                question: "Which condition is an indication for emergency dialysis?",
                correct_answer: "Severe hyperkalemia",
                incorrect_answers: ["Low creatinine", "Mild headache", "Low white blood cells"],

            },
            {
                question: "What does the term 'Kt/V' measure in dialysis?",
                correct_answer: "Dialysis adequacy or effectiveness",
                incorrect_answers: ["Kidney filtration rate","Volume of blood lost during treatment","Dialysate potassium concentration"],

            },
            

        ],
        'hard': [
            {
                question: "Which structure in the kidney is directly responsible for filtering blood?",
                correct_answer: "Glomerulus",
                incorrect_answers: ["Ureter", "Renal pelvis", "Loop of Henle"]

            },
            {
                question: "What waste product is primarily removed during dialysis?",
                correct_answer: "Urea",
                incorrect_answers: ["Bilirubin", "Glucose", "Insulin"]

            },
            {
                question: "What is the primary role of the kidneys in the body?",
                correct_answer: "Filter waste and balance electrolytes",
                incorrect_answers: ["Produce insulin", "Digest fats", "Transport oxygen"]

            },
            {
                question: "What hormone, made by the kidney, is often low in dialysis patients?",
                correct_answer: "Erythropoietin",
                incorrect_answers: ["Adrenaline", "Cortisol", "Oxytocin"]

            },
            {
                question: "Where are the kidneys located in the human body?",
                correct_answer: "In the back of the abdominal cavity on either side of the spine",
                incorrect_answers: ["In the chest", "Behind the bladder", "Above the liver"]

            },
            {
                question: "Which blood test is commonly used to monitor kidney function?",
                correct_answer: "Creatinine",
                incorrect_answers: ["Amylase", "Cholesterol", "Troponin"]

            },
            {
                question: "Which complication can occur from improperly managed dialysis?",
                correct_answer: "Electrolyte imbalance",
                incorrect_answers: ["Lung cancer", "Arthritis", "Acne"]

            },
            {
                
                question: "Which part of the nephron reabsorbs most water and nutrients?",
                correct_answer: "Proximal tubule",
                incorrect_answers: ["Loop of Henle", "Distal tubule", "Glomerulus"]

            },
            {
                question: "Dialysis can help regulate which of the following?",
                correct_answer: "Potassium levels",
                incorrect_answers: ["White blood cell count", "Platelet formation", "Hormone levels"]

            },
            {
                question: "What is the tube that carries urine from the kidney to the bladder?",
                correct_answer: "Ureter",
                incorrect_answers: ["Urethra", "Renal vein", "Pelvis"]

            },
            {
                question: "Which of the following is a symptom of uremia in kidney failure?",
                correct_answer: "Fatigue",
                incorrect_answers: ["Hair loss", "Improved vision", "High energy"]
                
            },
            {
                question: "What part of the dialysis machine helps clean the blood?",
                correct_answer: "Dialyzer",
                incorrect_answers: ["Compressor", "Osmometer", "Separator"]

            },
            {
                question: "What is the function of the Loop of Henle in the nephron?",
                correct_answer: "Concentrates urine by reabsorbing water and salt",
                incorrect_answers: ["Filters blood", "Produces hormones", "Stores urine"]

            },
            {
                question: "What type of dialysis is often done at a clinic three times a week?",
                correct_answer: "Hemodialysis",
                incorrect_answers: ["Peritoneal dialysis", "CRRT", "Plasmapheresis"]

            },
            {
                question: "Which kidney structure connects the glomerulus to the collecting duct?",
                correct_answer: "Renal tubule",
                incorrect_answers: ["Ureter", "Renal artery", "Renal capsule"]

            },
        ]
    },
    '21': {
        'easy': [],
        'medium': [],
        'hard': []
    }
};

// Functions
function startQuiz() {
    const categoryId = categorySelect.value;
    const difficulty = difficultySelect.value;
    const numQuestions = parseInt(questionsCountSelect.value);
    
    // Update displayed quiz info
    currentCategorySpan.textContent = categorySelect.options[categorySelect.selectedIndex].text;
    currentDifficultySpan.textContent = difficulty.charAt(0).toUpperCase() + difficulty.slice(1);
    totalQuestionsSpan.textContent = numQuestions;
    
    // Show loading screen
    showScreen(loadingScreen);
    
    // Simulate loading time (can be removed in production)
    setTimeout(() => {
        loadQuizQuestions(categoryId, difficulty, numQuestions);
        startQuizSession();
    }, 1500);
}

function loadQuizQuestions(categoryId, difficulty, numQuestions) {
    const availableQuestions = kidneyQuestions[categoryId][difficulty];
    
    // Shuffle and select the requested number of questions
    quiz.questions = shuffleArray(availableQuestions).slice(0, numQuestions);
}

function startQuizSession() {
    quiz.currentQuestionIndex = 0;
    quiz.correctAnswers = 0;
    quiz.userAnswers = [];
    quiz.answeredQuestions = 0;
    quiz.timePerQuestion = [];
    quiz.currentStreak = 0;
    quiz.highestStreak = 0;
    
    showScreen(quizScreen);
    displayQuestion();
}

function displayQuestion() {
    const currentQ = quiz.questions[quiz.currentQuestionIndex];
    const questionNumber = quiz.currentQuestionIndex + 1;
    
    // Update progress indicators
    currentQuestionSpan.textContent = questionNumber;
    progressFill.style.width = `${(questionNumber / quiz.questions.length) * 100}%`;
    
    // Set question text
    questionText.textContent = currentQ.question;
    
    // Clear previous answers
    answersContainer.innerHTML = '';
    
    // Prepare all answers
    let answers = [...currentQ.incorrect_answers];
    const correctAnswerIndex = Math.floor(Math.random() * (answers.length + 1));
    answers.splice(correctAnswerIndex, 0, currentQ.correct_answer);
    
    // Create and add answer buttons
    answers.forEach((answer, index) => {
        const answerButton = document.createElement('div');
        answerButton.className = 'answer-option';
        answerButton.textContent = answer;
        answerButton.dataset.index = index;
        
        answerButton.addEventListener('click', () => selectAnswer(index, correctAnswerIndex));
        answersContainer.appendChild(answerButton);
    });
    
    // Start timer
    startTimer();
}

function startTimer() {
    // Reset timer
    quiz.timeLeft = quiz.maxTime;
    timeLeftSpan.textContent = quiz.timeLeft;
    
    // Clear any existing interval
    if (quiz.timerInterval) {
        clearInterval(quiz.timerInterval);
    }
    
    // Start new timer
    quiz.timerInterval = setInterval(() => {
        quiz.timeLeft--;
        timeLeftSpan.textContent = quiz.timeLeft;
        
        if (quiz.timeLeft <= 0) {
            clearInterval(quiz.timerInterval);
            // Handle time-out
            handleTimeout();
        }
    }, 1000);
}

function handleTimeout() {
    // Find the correct answer
    const currentQ = quiz.questions[quiz.currentQuestionIndex];
    const correctAnswer = currentQ.correct_answer;
    
    // Highlight the correct answer
    const answerOptions = document.querySelectorAll('.answer-option');
    answerOptions.forEach(option => {
        if (option.textContent === correctAnswer) {
            option.classList.add('correct');
        } else {
            option.classList.add('wrong');
        }
        option.style.pointerEvents = 'none';
    });
    
    // Record no streak
    quiz.currentStreak = 0;
    
    // Store result
    quiz.userAnswers.push({
        question: currentQ.question,
        correct_answer: correctAnswer,
        user_answer: null,
        time_taken: quiz.maxTime,
        is_correct: false
    });
    
    // Move to next question after a delay
    setTimeout(nextQuestion, 2000);
}

function selectAnswer(selectedIndex, correctIndex) {
    // Stop the timer
    clearInterval(quiz.timerInterval);
    
    // Calculate time taken
    const timeTaken = quiz.maxTime - quiz.timeLeft;
    quiz.timePerQuestion.push(timeTaken);
    
    // Get current question info
    const currentQ = quiz.questions[quiz.currentQuestionIndex];
    const answerOptions = document.querySelectorAll('.answer-option');
    
    // Check if answer is correct
    const isCorrect = selectedIndex === correctIndex;
    
    // Update streak
    if (isCorrect) {
        quiz.correctAnswers++;
        quiz.currentStreak++;
        if (quiz.currentStreak > quiz.highestStreak) {
            quiz.highestStreak = quiz.currentStreak;
        }
    } else {
        quiz.currentStreak = 0;
    }
    
    // Highlight correct and wrong answers
    answerOptions.forEach((option, index) => {
        if (index === correctIndex) {
            option.classList.add('correct');
        } else if (index === selectedIndex && selectedIndex !== correctIndex) {
            option.classList.add('wrong');
        }
        option.style.pointerEvents = 'none';
    });
    
    // Store user's answer
    quiz.userAnswers.push({
        question: currentQ.question,
        correct_answer: currentQ.correct_answer,
        user_answer: answerOptions[selectedIndex].textContent,
        time_taken: timeTaken,
        is_correct: isCorrect
    });
    
    quiz.answeredQuestions++;
    
    // Move to next question after a delay
    setTimeout(nextQuestion, 1500);
}

function nextQuestion() {
    quiz.currentQuestionIndex++;
    
    if (quiz.currentQuestionIndex < quiz.questions.length) {
        displayQuestion();
    } else {
        showResults();
    }
}

function showResults() {
    showScreen(resultsScreen);
    
    // Calculate score
    const scorePercentage = Math.round((quiz.correctAnswers / quiz.questions.length) * 100);
    scorePercentageSpan.textContent = `${scorePercentage}%`;
    
    // Update stats
    correctAnswersSpan.textContent = quiz.correctAnswers;
    resultsTotalQuestionsSpan.textContent = quiz.questions.length;
    highestStreakSpan.textContent = quiz.highestStreak;
    
    // Calculate average time
    let totalTime = quiz.timePerQuestion.reduce((acc, time) => acc + time, 0);
    let avgTime = Math.round(totalTime / quiz.timePerQuestion.length);
    averageTimeSpan.textContent = avgTime;
    
    // Prepare review section
    prepareReview();
}

function prepareReview() {
    reviewContainer.innerHTML = '';
    
    quiz.userAnswers.forEach((answer, index) => {
        const reviewItem = document.createElement('div');
        reviewItem.className = 'review-item';
        
        // Question number and text
        const questionNumber = document.createElement('div');
        questionNumber.className = 'review-question';
        questionNumber.textContent = `Q${index + 1}: ${answer.question}`;
        
        // Answers container
        const answersDiv = document.createElement('div');
        answersDiv.className = 'review-answers';
        
        // Correct answer
        const correctAnswer = document.createElement('div');
        correctAnswer.className = 'review-answer';
        correctAnswer.innerHTML = `<i class="fas fa-check" style="color: var(--correct-color);"></i> Correct: ${answer.correct_answer}`;
        
        answersDiv.appendChild(correctAnswer);
        
        // User answer (if exists)
        if (answer.user_answer) {
            const userAnswer = document.createElement('div');
            userAnswer.className = 'review-answer user-answer';
            
            if (answer.is_correct) {
                userAnswer.innerHTML = `<i class="fas fa-check-circle" style="color: var(--correct-color);"></i> Your answer: ${answer.user_answer}`;
            } else {
                userAnswer.innerHTML = `<i class="fas fa-times-circle" style="color: var(--wrong-color);"></i> Your answer: ${answer.user_answer}`;
            }
            
            answersDiv.appendChild(userAnswer);
        } else {
            // No answer provided
            const noAnswer = document.createElement('div');
            noAnswer.className = 'review-answer user-answer';
            noAnswer.innerHTML = `<i class="fas fa-times-circle" style="color: var(--wrong-color);"></i> Time expired - No answer provided`;
            
            answersDiv.appendChild(noAnswer);
        }
        
        // Time taken
        const timeTaken = document.createElement('div');
        timeTaken.className = 'review-time';
        timeTaken.textContent = `Time: ${answer.time_taken} seconds`;
        
        // Append all elements
        reviewItem.appendChild(questionNumber);
        reviewItem.appendChild(answersDiv);
        reviewItem.appendChild(timeTaken);
        reviewContainer.appendChild(reviewItem);
    });
}

function toggleReviewAnswers() {
    answerReview.classList.toggle('hidden');
    reviewBtn.textContent = answerReview.classList.contains('hidden') ? 'Review Answers' : 'Hide Review';
}

function resetQuiz() {
    showScreen(welcomeScreen);
    answerReview.classList.add('hidden');
    reviewBtn.textContent = 'Review Answers';
}

function showScreen(screen) {
    // Hide all screens
    welcomeScreen.classList.remove('active');
    loadingScreen.classList.remove('active');
    quizScreen.classList.remove('active');
    resultsScreen.classList.remove('active');
    
    // Show the requested screen
    screen.classList.add('active');
}

// Utility function to shuffle array
function shuffleArray(array) {
    let currentIndex = array.length;
    let temporaryValue, randomIndex;
    
    // While there remain elements to shuffle
    while (currentIndex !== 0) {
        // Pick a remaining element
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        
        // Swap with the current element
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }
    
    return array;
}