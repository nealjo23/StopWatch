document.addEventListener('DOMContentLoaded', function() {
    var timerElement = document.getElementById('timer');
    var startStopButton = document.getElementById('start-stop-btn');
    var lapButton = document.getElementById('lap-btn');
    var resetButton = document.getElementById('reset-btn');
    var lapList = document.getElementById('lap-list');

    var timerInterval;
    var lapCount = 1;
    var isRunning = false;
    var startTime, elapsedTime = 0;

    startStopButton.addEventListener('click', function() {
        if (isRunning) {
            // Send AJAX request to stop the stopwatch
            fetch('/stop')
                .then(function(response) {
                    if (response.ok) {
                        // Stop the timer on the client-side
                        clearInterval(timerInterval);
                        isRunning = false;
                        startStopButton.textContent = 'Start';
                        startStopButton.classList.remove('stop');
                        startStopButton.classList.add('start');
                    }
                });
        } else {
            // Send AJAX request to start the stopwatch
            fetch('/start')
                .then(function(response) {
                    if (response.ok) {
                        // Start the timer on the client-side
                        startTime = Date.now() - elapsedTime;
                        timerInterval = setInterval(function() {
                            var currentTime = Date.now() - startTime;
                            timerElement.textContent = (currentTime / 1000).toFixed(2);
                        }, 10);
                        isRunning = true;
                        startStopButton.textContent = 'Stop';
                        startStopButton.classList.remove('start');
                        startStopButton.classList.add('stop');
                    }
                });
        }
    });

    lapButton.addEventListener('click', function() {
        if (isRunning) {
            var lapTime = parseFloat(timerElement.textContent);
            var lapItem = document.createElement('li');

            if (lapCount === 1) {
                lapItem.textContent = 'Lap ' + lapCount + ': ' + lapTime.toFixed(2);
            } else {
                var previousLapTime = parseFloat(lapList.lastElementChild.textContent.split(':')[1]);
                var lapElapsedTime = lapTime - previousLapTime;
                lapItem.textContent = 'Lap ' + lapCount + ': ' + lapTime.toFixed(2) + ' (Elapsed: ' + lapElapsedTime.toFixed(2) + ')';
            }

            lapList.appendChild(lapItem);
            lapCount++;
        }
    });

    resetButton.addEventListener('click', function() {
        // Send AJAX request to reset the stopwatch
        fetch('/reset')
            .then(function(response) {
                if (response.ok) {
                    // Reset the timer on the client-side
                    timerElement.textContent = '0.00';
                    lapCount = 1;
                    elapsedTime = 0;
                    lapList.innerHTML = '';
                }
            });
    });
});
