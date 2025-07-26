document.addEventListener('DOMContentLoaded', () => {
    const checklists = {
        practice: [
            "Check your skates are tied tight!",
            "Practice your waltz jump and salchow.",
            "Do your Freestyle 3 dance step sequence.",
            "Try your sit spin 3 times!",
            "Drink water before starting."
        ],
        competition: [
            "Pack your skates and costume.",
            "Review your program steps.",
            "Practice your toe loop and loop jump.",
            "Smile and breathe deeply!",
            "Bring a water bottle and snack."
        ],
        show: [
            "Wear your sparkly costume!",
            "Practice your program with music.",
            "Check your spins (upright and sit).",
            "Smile big for the audience!",
            "Arrive early to warm up."
        ]
    };

    const motivations = [
        "You’re going to glide like a pro!",
        "Spin like a superstar!",
        "Your jumps are amazing—keep it up!",
        "You’ve got this, skate with confidence!",
        "Show the ice who’s boss!"
    ];

    window.showChecklist = function(mode) {
        const modeSelection = document.getElementById('mode-selection');
        const checklist = document.getElementById('checklist');
        const timerButton = document.getElementById('timer-button');
        
        if (modeSelection && checklist && timerButton) {
            modeSelection.classList.add('hidden');
            checklist.classList.remove('hidden');
            timerButton.classList.remove('hidden');
            document.getElementById('checklist-title').textContent = `${mode.charAt(0).toUpperCase() + mode.slice(1)} Checklist`;
            const checklistItems = document.getElementById('checklist-items');
            checklistItems.innerHTML = '';
            checklists[mode].forEach(item => {
                const li = document.createElement('li');
                li.textContent = item;
                checklistItems.appendChild(li);
            });
        } else {
            console.error('One or more elements not found:', { modeSelection, checklist, timerButton });
        }
    };

    window.showMotivation = function() {
        const checklist = document.getElementById('checklist');
        const timerButton = document.getElementById('timer-button');
        const motivation = document.getElementById('motivation');
        
        if (checklist && timerButton && motivation) {
            checklist.classList.add('hidden');
            timerButton.classList.add('hidden');
            motivation.classList.remove('hidden');
            const message = motivations[Math.floor(Math.random() * motivations.length)];
            document.getElementById('motivational-message').textContent = message;
        }
    };

    window.backToChecklist = function() {
        const motivation = document.getElementById('motivation');
        const timer = document.getElementById('timer');
        const checklist = document.getElementById('checklist');
        const timerButton = document.getElementById('timer-button');
        
        if (motivation && timer && checklist && timerButton) {
            motivation.classList.add('hidden');
            timer.classList.add('hidden');
            checklist.classList.remove('hidden');
            timerButton.classList.remove('hidden');
        }
    };

    window.showTimer = function() {
        const checklist = document.getElementById('checklist');
        const timerButton = document.getElementById('timer-button');
        const timer = document.getElementById('timer');
        
        if (checklist && timerButton && timer) {
            checklist.classList.add('hidden');
            timerButton.classList.add('hidden');
            timer.classList.remove('hidden');
        }
    };

    window.startTimer = function() {
        let time = 120; // 2 minutes in seconds
        const display = document.getElementById('timer-display');
        if (display) {
            const interval = setInterval(() => {
                const minutes = Math.floor(time / 60);
                const seconds = time % 60;
                display.textContent = `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
                time--;
                if (time < 0) {
                    clearInterval(interval);
                    display.textContent = "Time's up! You're ready!";
                }
            }, 1000);
        }
    };
});