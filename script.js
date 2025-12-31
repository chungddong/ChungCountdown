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
    
    // 전역 타이머 참조
    let mainInterval = null;
    let testInterval = null;
    
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
        messageEl.querySelector('p').textContent = '🎉 새해 복 많이 받으세요! 🎊';

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
        mainInterval = setInterval(updateCountdown, 1000);
    }

    /**
     * 테스트 버튼 기능
     */
    function setupTestButton() {
        const testButton = document.getElementById('testButton');
        const testJan1Button = document.getElementById('testJan1Button');
        
        // 코나미 코드 감지: ↑ ↑ ↓ ↓ ← → ← → B A
        const konamiCode = [
            'ArrowUp', 'ArrowUp', 
            'ArrowDown', 'ArrowDown', 
            'ArrowLeft', 'ArrowRight', 
            'ArrowLeft', 'ArrowRight', 
            'b', 'a'
        ];
        let konamiIndex = 0;
        
        document.addEventListener('keydown', function(e) {
            const key = e.key.toLowerCase();
            
            // 현재 키가 코나미 코드 순서와 맞는지 확인
            if (key === konamiCode[konamiIndex].toLowerCase()) {
                konamiIndex++;
                
                // 코나미 코드 완성!
                if (konamiIndex === konamiCode.length) {
                    konamiIndex = 0;
                    
                    // 테스트 버튼 표시
                    if (testButton) testButton.classList.add('visible');
                    if (testJan1Button) testJan1Button.classList.add('visible');
                    
                    // 성공 메시지 (선택사항)
                    console.log('🎮 코나미 코드 활성화! 테스트 버튼이 나타났습니다.');
                }
            } else {
                // 틀리면 초기화
                konamiIndex = 0;
            }
        });
        
        if (testButton) {
            testButton.addEventListener('click', function() {
                showCelebration();
            });
        }

        if (testJan1Button) {
            testJan1Button.addEventListener('click', function() {
                // 기존 타이머 중지
                if (mainInterval) clearInterval(mainInterval);
                if (testInterval) clearInterval(testInterval);
                
                // 1월 1일 테스트: 10초 카운트다운 후 축하
                let testSeconds = 10;
                daysEl.textContent = '00';
                hoursEl.textContent = '00';
                minutesEl.textContent = '00';
                secondsEl.textContent = formatNumber(testSeconds);
                
                messageEl.classList.remove('celebrate');
                messageEl.querySelector('p').textContent = '테스트 모드: 10초 후 새해!';
                
                testInterval = setInterval(() => {
                    testSeconds--;
                    secondsEl.textContent = formatNumber(testSeconds);
                    
                    if (testSeconds <= 0) {
                        clearInterval(testInterval);
                        showCelebration();
                        // 메인 타이머 재시작
                        setTimeout(() => {
                            mainInterval = setInterval(updateCountdown, 1000);
                        }, 5000);
                    }
                }, 1000);
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
