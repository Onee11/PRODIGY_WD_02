let startTime = null;      
        let elapsedTime = 0;       
        let interval = null;       
        let running = false;       
        let lapCount = 0;          

        
        const minutesEl = document.getElementById('minutes');
        const secondsEl = document.getElementById('seconds');
        const centisecondsEl = document.getElementById('centiseconds');
        const startBtn = document.getElementById('start');
        const pauseBtn = document.getElementById('pause');
        const resetBtn = document.getElementById('reset');
        const lapBtn = document.getElementById('lap');
        const lapsEl = document.getElementById('laps');

        function updateDisplay() {
            minutesEl.textContent = String(minutes).padStart(2, '0');
            secondsEl.textContent = String(seconds).padStart(2, '0');
            centisecondsEl.textContent = String(centiseconds).padStart(2, '0');
        }

        function updateDisplayFromElapsed(elapsed) {
            
            const totalCentiseconds = Math.floor(elapsed / 10);
            
            
            const centiseconds = totalCentiseconds % 100;
            const seconds = Math.floor(totalCentiseconds / 100) % 60;
            const minutes = Math.floor(totalCentiseconds / 6000);
            
            
            minutesEl.textContent = String(minutes).padStart(2, '0');
            secondsEl.textContent = String(seconds).padStart(2, '0');
            centisecondsEl.textContent = String(centiseconds).padStart(2, '0');
        }

        function startStopwatch() {
            if (running) return;
            
            running = true;
            
            startTime = performance.now() - elapsedTime;
            
            
            interval = setInterval(() => {
                elapsedTime = performance.now() - startTime;
                updateDisplayFromElapsed(elapsedTime);
            }, 10);
        }

        function pauseStopwatch() {
            if (!running) return;
            
            running = false;
            clearInterval(interval);
            
        }

        function resetStopwatch() {
            running = false;
            clearInterval(interval);
            
            
            startTime = null;
            elapsedTime = 0;
            lapCount = 0;
            
            
            updateDisplayFromElapsed(0);
            
            
            lapsEl.innerHTML = '';
        }

        function lapStopwatch() {
            if (!running) return;
            
            lapCount++;
            
            
            const totalCentiseconds = Math.floor(elapsedTime / 10);
            const centiseconds = totalCentiseconds % 100;
            const seconds = Math.floor(totalCentiseconds / 100) % 60;
            const minutes = Math.floor(totalCentiseconds / 6000);
            
            
            const lapTime = `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}:${String(centiseconds).padStart(2, '0')}`;
            
            
            const li = document.createElement('li');
            li.textContent = `Lap ${lapCount}: ${lapTime}`;
            lapsEl.appendChild(li);
            
            
            lapsEl.scrollTop = lapsEl.scrollHeight;
        }

        
        startBtn.addEventListener('click', startStopwatch);
        pauseBtn.addEventListener('click', pauseStopwatch);
        resetBtn.addEventListener('click', resetStopwatch);
        lapBtn.addEventListener('click', lapStopwatch);

        
        updateDisplayFromElapsed(0);