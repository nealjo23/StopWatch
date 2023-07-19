document.addEventListener('DOMContentLoaded', function() {
    var timerElement = document.getElementById('timer');
    var startButton = document.getElementById('start-btn');
    var stopButton = document.getElementById('stop-btn');
    var resetButton = document.getElementById('reset-btn');
    var lapButton = document.getElementById('lap-btn');
    var lapList = document.getElementById('lap-list');

    var timerInterval;
    var lapCount = 1;

    startButton.addEventListener('click', function() {
        // Send AJAX request to start the stopwatch
        fetch('/start')
            .then(function(response) {
                if (response.ok) {
                    // Start the timer on the client-side
                    timerInterval = setInterval(function() {
                        var currentTime = parseFloat(timerElement.textContent);
                        timerElement.textContent = (currentTime + 0.01).toFixed(2);
                    }, 10);
                }
            });
    });

    stopButton.addEventListener('click', function() {
        // Send AJAX request to stop the stopwatch
        fetch('/stop')
            .then(function(response) {
                if (response.ok) {
                    // Stop the timer on the client-side
                    clearInterval(timerInterval);
                }
            });
    });

    resetButton.addEventListener('click', function() {
        // Send AJAX request to reset the stopwatch
        fetch('/reset')
            .then(function(response) {
                if (response.ok) {
                    // Reset the timer on the client-side
                    timerElement.textContent = '0.00';
                    lapCount = 1;
                    lapList.innerHTML = '';
                }
            });
    });

    lapButton.addEventListener('click', function() {
        var lapTime = timerElement.textContent;
        var lapItem = document.createElement('li');
        lapItem.textContent = 'Lap ' + lapCount + ': ' + lapTime;
        lapList.appendChild(lapItem);
        lapCount++;
    });
});
