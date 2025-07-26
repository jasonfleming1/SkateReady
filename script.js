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

    let timerIntervals = []; // Array to store timer intervals for each task

    window.showChecklist = function(mode) {
        const modeSelection = document.getElementById('mode-selection');
        const checklist = document.getElementById('checklist');
        
        if (modeSelection && checklist) {
            modeSelection.classList.add('hidden');
            checklist.classList.remove('hidden');
            document.getElementById('checklist-title').textContent = `${mode.charAt(0).toUpperCase() + mode.slice(1)} Checklist`;
            const checklistItems = document.getElementById('checklist-items');
            checklistItems.innerHTML = '';
            timerIntervals = []; // Clear previous timers
            checklists[mode].forEach((item, index) => {
                const tr = document.createElement('tr');
                tr.innerHTML = `
                    <td><label for="task-${index}"><span>${item}</span></label></td>
                    <td><input type="checkbox" id="task-${index}" aria-label="${item}"></td>
                    <td><span class="timer-display" id="timer-display-${index}">2:00</span></td>
                    <td>
                        <button onclick="startTimer(${index})" aria-label="Start Timer for ${item}">Start</button>
                        <button onclick="resetTimer(${index})" aria-label="Reset Timer for ${item}">Reset</button>
                    </td>
                `;
                checklistItems.appendChild(tr);
                timerIntervals[index] = null; // Initialize timer interval for this task
            });
        } else {
            console.error('One or more elements not found:', { modeSelection, checklist });
        }
    };

    window.resetChecklist = function() {
        const checklistItems = document.getElementById('checklist-items');
        const checkboxes = checklistItems.querySelectorAll('input[type="checkbox"]');
        const timerDisplays = checklistItems.querySelectorAll('.timer-display');
        
        checkboxes.forEach(checkbox => {
            checkbox.checked = false;
        });
        
        timerDisplays.forEach((display, index) => {
            if (timerIntervals[index]) {
                clearInterval(timerIntervals[index]);
                timerIntervals[index] = null;
            }
            display.textContent = '2:00';
            display.classList.remove('finished');
        });
    };

    window.showMotivation = function() {
        const checklist = document.getElementById('checklist');
        const motivation = document.getElementById('motivation');
        
        if (checklist && motivation) {
            checklist.classList.add('hidden');
            motivation.classList.remove('hidden');
            const message = motivations[Math.floor(Math.random() * motivations.length)];
            document.getElementById('motivational-message').textContent = message;
        } else {
            console.error('One or more elements not found:', { checklist, motivation });
        }
    };

    window.backToChecklist = function() {
        const motivation = document.getElementById('motivation');
        const checklist = document.getElementById('checklist');
        
        if (motivation && checklist) {
            motivation.classList.add('hidden');
            checklist.classList.remove('hidden');
        } else {
            console.error('One or more elements not found:', { motivation, checklist });
        }
    };

    window.startTimer = function(index) {
        if (timerIntervals[index]) {
            clearInterval(timerIntervals[index]); // Clear any existing timer for this task
        }
        let time = 120; // 2 minutes in seconds
        const display = document.getElementById(`timer-display-${index}`);
        if (display) {
            display.classList.remove('finished');
            display.textContent = '2:00';
            timerIntervals[index] = setInterval(() => {
                const minutes = Math.floor(time / 60);
                const seconds = time % 60;
                display.textContent = `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
                time--;
                if (time < 0) {
                    clearInterval(timerIntervals[index]);
                    timerIntervals[index] = null;
                    display.textContent = "Time's up!";
                    display.classList.add('finished');
                }
            }, 1000);
        } else {
            console.error(`Timer display for index ${index} not found`);
        }
    };

    window.resetTimer = function(index) {
        if (timerIntervals[index]) {
            clearInterval(timerIntervals[index]);
            timerIntervals[index] = null;
        }
        const display = document.getElementById(`timer-display-${index}`);
        if (display) {
            display.classList.remove('finished');
            display.textContent = '2:00';
        } else {
            console.error(`Timer display for index ${index} not found`);
        }
    };
});