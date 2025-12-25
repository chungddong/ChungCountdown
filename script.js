// 새해 카운트다운 타이머
(function() {
    'use strict';

    // 목표 날짜 설정 (2026년 1월 1일 00:00:00)
    const targetDate = new Date('2026-01-01T00:00:00').getTime();
    
    // DOM 요소
    const daysEl = document.getElementById('days');
    const hoursEl = document.getElementById('hours');
    const minutesEl = document.getElementById('minutes');
    const secondsEl = document.getElementById('seconds');
    const messageEl = document.getElementById('message');
    const progressEl = document.getElementById('progress');
    const progressTextEl = document.getElementById('progress-text');

    // 시작 날짜 (2025년 1월 1일)
    const startDate = new Date('2025-01-01T00:00:00').getTime();
    const totalDuration = targetDate - startDate;

    /**
     * 숫자를 두 자리로 포맷팅
     */
    function formatNumber(num) {
        return num.toString().padStart(2, '0');
    }

    /**
     * 카운트다운 업데이트
     */
    function updateCountdown() {
        const now = new Date().getTime();
        const timeLeft = targetDate - now;

        // 카운트다운 종료 체크
        if (timeLeft <= 0) {
            showCelebration();
            return;
        }

        // 시간 계산
        const days = Math.floor(timeLeft / (1000 * 60 * 60 * 24));
        const hours = Math.floor((timeLeft % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((timeLeft % (1000 * 60)) / 1000);

        // DOM 업데이트 (애니메이션 효과)
        updateElement(daysEl, formatNumber(days));
        updateElement(hoursEl, formatNumber(hours));
        updateElement(minutesEl, formatNumber(minutes));
        updateElement(secondsEl, formatNumber(seconds));

        // 프로그레스 바 업데이트
        updateProgress(now);

        // 메시지 업데이트
        updateMessage(days);
    }

    /**
     * 요소 업데이트 (부드러운 전환 효과)
     */
    function updateElement(element, value) {
        if (element.textContent !== value) {
            element.style.transform = 'scale(1.2)';
            element.textContent = value;
            setTimeout(() => {
                element.style.transform = 'scale(1)';
            }, 200);
        }
    }

    /**
     * 프로그레스 바 업데이트
     */
    function updateProgress(now) {
        const elapsed = now - startDate;
        const percentage = (elapsed / totalDuration) * 100;
        const roundedPercentage = Math.min(100, Math.max(0, percentage)).toFixed(2);
        
        progressEl.style.width = `${roundedPercentage}%`;
        progressTextEl.textContent = `${roundedPercentage}%`;
    }

    /**
     * 남은 일수에 따른 메시지 업데이트
     */
    function updateMessage(days) {
        let message = '';
        
        if (days > 30) {
            message = '2026년을 기대하며...';
        } else if (days > 14) {
            message = '새해가 다가오고 있어요!';
        } else if (days > 7) {
            message = '2주도 채 남지 않았어요!';
        } else if (days > 3) {
            message = '한 주일도 안 남았습니다!';
        } else if (days > 1) {
            message = '며칠 남지 않았습니다!';
        } else if (days === 1) {
            message = '내일이 새해입니다!';
        } else {
            message = '오늘이 마지막 날입니다!';
        }

        if (messageEl.querySelector('p').textContent !== message) {
            messageEl.querySelector('p').textContent = message;
        }
    }

    /**
     * 새해 축하 메시지 표시
     */
    function showCelebration() {
        daysEl.textContent = '00';
        hoursEl.textContent = '00';
        minutesEl.textContent = '00';
        secondsEl.textContent = '00';
        
        messageEl.classList.add('celebrate');
        messageEl.querySelector('p').textContent = '🎉 Happy New Year 2026! 🎉';
        
        progressEl.style.width = '100%';
        progressTextEl.textContent = '100.00%';

        // 축하 애니메이션
        createConfetti();
    }

    /**
     * 색종이 효과 (간단한 버전)
     */
    function createConfetti() {
        const colors = ['#6366f1', '#8b5cf6', '#ec4899', '#f59e0b', '#10b981'];
        const confettiCount = 50;

        for (let i = 0; i < confettiCount; i++) {
            setTimeout(() => {
                const confetti = document.createElement('div');
                confetti.style.position = 'fixed';
                confetti.style.width = '10px';
                confetti.style.height = '10px';
                confetti.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
                confetti.style.left = Math.random() * window.innerWidth + 'px';
                confetti.style.top = '-10px';
                confetti.style.opacity = '1';
                confetti.style.borderRadius = '50%';
                confetti.style.pointerEvents = 'none';
                confetti.style.zIndex = '9999';
                confetti.style.transition = 'all 3s ease-out';
                
                document.body.appendChild(confetti);

                // 애니메이션
                setTimeout(() => {
                    confetti.style.top = window.innerHeight + 'px';
                    confetti.style.transform = `rotate(${Math.random() * 360}deg)`;
                    confetti.style.opacity = '0';
                }, 50);

                // 제거
                setTimeout(() => {
                    confetti.remove();
                }, 3000);
            }, i * 30);
        }
    }

    /**
     * 페이지 가시성 변경 처리
     */
    document.addEventListener('visibilitychange', function() {
        if (!document.hidden) {
            updateCountdown();
        }
    });

    /**
     * 초기화 및 타이머 시작
     */
    function init() {
        updateCountdown();
        setInterval(updateCountdown, 1000);
    }

    /**
     * 테스트 버튼 기능
     */
    function setupTestButton() {
        const testButton = document.getElementById('testButton');
        if (testButton) {
            testButton.addEventListener('click', function() {
                showCelebration();
            });
        }
    }

    // 페이지 로드 완료 시 시작
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', function() {
            init();
            setupTestButton();
        });
    } else {
        init();
        setupTestButton();
    }

})();
