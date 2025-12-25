// 새해 카운트다운 타이머
(function() {
    'use strict';

    /**
     * 다음 해 1월 1일 계산
     */
    function getNextNewYear() {
        const now = new Date();
        const currentYear = now.getFullYear();
        const nextYear = currentYear + 1;
        return new Date(`${nextYear}-01-01T00:00:00`).getTime();
    }

    /**
     * 현재가 1월 1일인지 확인
     */
    function isNewYearDay() {
        const now = new Date();
        return now.getMonth() === 0 && now.getDate() === 1;
    }

    // 목표 날짜 설정 (다음 해 1월 1일 00:00:00)
    let targetDate = getNextNewYear();
    
    // DOM 요소
    const daysEl = document.getElementById('days');
    const hoursEl = document.getElementById('hours');
    const minutesEl = document.getElementById('minutes');
    const secondsEl = document.getElementById('seconds');
    const messageEl = document.getElementById('message');

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
        // 1월 1일이면 축하 메시지 표시
        if (isNewYearDay()) {
            showCelebration();
            return;
        }

        const now = new Date().getTime();
        const timeLeft = targetDate - now;

        // 카운트다운 종료 체크 (새해가 됨)
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
     * 새해 축하 메시지 표시
     */
    function showCelebration() {
        daysEl.textContent = '00';
        hoursEl.textContent = '00';
        minutesEl.textContent = '00';
        secondsEl.textContent = '00';
        
        messageEl.classList.add('celebrate');
        messageEl.querySelector('p').textContent = '� 새해 복 많이 받으세요! 🎊';

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
        // 목표 연도를 제목에 표시
        const targetYear = new Date(targetDate).getFullYear();
        const subtitleEl = document.querySelector('.subtitle');
        if (subtitleEl) {
            subtitleEl.textContent = `${targetYear}년까지 남은 시간`;
        }

        updateCountdown();
        setInterval(updateCountdown, 1000);
    }

    /**
     * 테스트 버튼 기능
     */
    function setupTestButton() {
        const testButton = document.getElementById('testButton');
        const testJan1Button = document.getElementById('testJan1Button');
        
        if (testButton) {
            testButton.addEventListener('click', function() {
                showCelebration();
            });
        }

        if (testJan1Button) {
            testJan1Button.addEventListener('click', function() {
                // 1월 1일 상태 시뮬레이션
                // 원래 isNewYearDay 함수를 오버라이드하기 위해 강제로 축하 표시
                daysEl.textContent = '00';
                hoursEl.textContent = '00';
                minutesEl.textContent = '00';
                secondsEl.textContent = '00';
                
                messageEl.classList.add('celebrate');
                messageEl.querySelector('p').textContent = '🎊 새해 복 많이 받으세요! 🎊';
                
                createConfetti();
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
