document.addEventListener('DOMContentLoaded', () => {
    const gearChecklists = {
        practice: [
            "Skates",
            "Water bottle",
            "Practice outfit",
            "Hair ties"
        ],
        competition: [
            "Skates",
            "Competition costume",
            "Water bottle",
            "Snacks",
            "Makeup kit"
        ],
        show: [
            "Skates",
            "Show costume",
            "Water bottle",
            "Hair accessories",
            "Makeup kit"
        ]
    };

    const checklists = {
        practice: [
            "Do 10 jumping jacks",
            "Stretch legs for 30 seconds",
            "Practice waltz jump",
            "Practice salchow",
            "Do Freestyle 3 dance step sequence",
            "Try sit spin 3 times"
        ],
        competition: [
            "Do 10 jumping jacks",
            "Stretch legs for 30 seconds",
            "Review program steps",
            "Practice toe loop",
            "Practice loop jump",
            "Breathe deeply 5 times"
        ],
        show: [
            "Do 10 jumping jacks",
            "Stretch legs for 30 seconds",
            "Practice program with music",
            "Check upright spin",
            "Check sit spin",
            "Practice big smile"
        ]
    };

    const motivations = [
        "You’re going to glide like a pro!",
        "Spin like a superstar!",
        "Your jumps are amazing—keep it up!",
        "You’ve got this, skate with confidence!",
        "Show the ice who’s boss!"
    ];

    let currentMode = '';
    let timerIntervals = [];
    let timerStates = []; // Track time and paused state for each timer
    let inspirationInterval = null;

    // Rotate inspirational messages
    function rotateInspiration() {
        const messageElement = document.getElementById('inspiration-message');
        if (messageElement) {
            const message = motivations[Math.floor(Math.random() * motivations.length)];
            messageElement.textContent = message;
        }
    }

    // Start inspiration rotation
    rotateInspiration();
    inspirationInterval = setInterval(rotateInspiration, 15000);

    window.showGearCheck = function(mode) {
        currentMode = mode;
        const modeSelection = document.getElementById('mode-selection');
        const gearCheck = document.getElementById('gear-check');
        
        if (modeSelection && gearCheck) {
            modeSelection.classList.add('hidden');
            gearCheck.classList.remove('hidden');
            document.getElementById('gear-check-title').textContent = `${mode.charAt(0).toUpperCase() + mode.slice(1)} Gear Checklist`;
            const gearCheckItems = document.getElementById('gear-check-items');
            gearCheckItems.innerHTML = '';
            gearChecklists[mode].forEach((item, index) => {
                const tr = document.createElement('tr');
                tr.innerHTML = `
                    <td><label for="gear-${index}"><span>${item}</span></label></td>
                    <td><input type="checkbox" id="gear-${index}" aria-label="${item}"></td>
                `;
                gearCheckItems.appendChild(tr);
            });
        } else {
            console.error('One or more elements not found:', { modeSelection, gearCheck });
        }
    };

    window.showChecklist = function() {
        const gearCheck = document.getElementById('gear-check');
        const checklist = document.getElementById('checklist');
        
        if (gearCheck && checklist) {
            gearCheck.classList.add('hidden');
            checklist.classList.remove('hidden');
            document.getElementById('checklist-title').textContent = `${currentMode.charAt(0).toUpperCase() + currentMode.slice(1)} Task Checklist`;
            const checklistItems = document.getElementById('checklist-items');
            checklistItems.innerHTML = '';
            timerIntervals = [];
            timerStates = [];
            checklists[currentMode].forEach((item, index) => {
                const tr = document.createElement('tr');
                tr.innerHTML = `
                    <td><label for="task-${index}"><span>${item}</span></label></td>
                    <td><input type="checkbox" id="task-${index}" aria-label="${item}"></td>
                    <td><span class="timer-display" id="timer-display-${index}">2:00</span></td>
                    <td>
                        <button onclick="startTimer(${index})" aria-label="Start Timer for ${item}">Start</button>
                        <button onclick="stopTimer(${index})" aria-label="Stop Timer for ${item}">Stop</button>
                        <button onclick="resetTimer(${index})" aria-label="Reset Timer for ${item}">Reset</button>
                    </td>
                `;
                checklistItems.appendChild(tr);
                timerIntervals[index] = null;
                timerStates[index] = { time: 120, paused: true };
                
                // Add checkbox event listener to stop timer
                const checkbox = document.getElementById(`task-${index}`);
                checkbox.addEventListener('change', () => {
                    if (checkbox.checked) {
                        stopTimer(index);
                    } else if (!timerStates[index].paused && timerStates[index].time > 0) {
                        startTimer(index); // Resume if unchecked and timer not finished
                    }
                });
            });
        } else {
            console.error('One or more elements not found:', { gearCheck, checklist });
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
            timerStates[index] = { time: 120, paused: true };
        });
    };

    window.returnToMode = function() {
        const checklist = document.getElementById('checklist');
        const modeSelection = document.getElementById('mode-selection');
        
        if (checklist && modeSelection) {
            checklist.classList.add('hidden');
            modeSelection.classList.remove('hidden');
            resetChecklist();
        } else {
            console.error('One or more elements not found:', { checklist, modeSelection });
        }
    };

    window.startTimer = function(index) {
        if (timerIntervals[index]) {
            clearInterval(timerIntervals[index]);
        }
        const display = document.getElementById(`timer-display-${index}`);
        const checkbox = document.getElementById(`task-${index}`);
        if (display && !checkbox.checked && timerStates[index].time > 0) {
            display.classList.remove('finished');
            timerStates[index].paused = false;
            setTimeout(() => {
                console.log(`Timer ${index} started`);
                timerIntervals[index] = setInterval(() => {
                    if (!timerStates[index].paused) {
                        timerStates[index].time--;
                        const minutes = Math.floor(timerStates[index].time / 60);
                        const seconds = timerStates[index].time % 60;
                        display.textContent = `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
                        if (timerStates[index].time <= 0) {
                            clearInterval(timerIntervals[index]);
                            timerIntervals[index] = null;
                            display.textContent = "Time's up!";
                            display.classList.add('finished');
                            timerStates[index].paused = true;
                        }
                    }
                }, 1000);
            }, 0);
        } else {
            console.error(`Cannot start timer ${index}:`, { display, checkboxChecked: checkbox.checked, time: timerStates[index].time });
        }
    };

    window.stopTimer = function(index) {
        if (timerIntervals[index]) {
            clearInterval(timerIntervals[index]);
            timerIntervals[index] = null;
            timerStates[index].paused = true;
            console.log(`Timer ${index} stopped at ${timerStates[index].time} seconds`);
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
            timerStates[index] = { time: 120, paused: true };
            console.log(`Timer ${index} reset`);
        } else {
            console.error(`Timer display for index ${index} not found`);
        }
    };
});