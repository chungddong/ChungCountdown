# 🎊 새해 카운트다운 2026 🎊

2026년 새해를 맞이하기 위한 깔끔하고 모던한 웹 기반 카운트다운 타이머입니다.

## ✨ 특징

- 🎨 **모던한 디자인**: 그라디언트와 글래스모피즘 효과를 활용한 세련된 UI
- ⏱️ **실시간 카운트다운**: 일, 시간, 분, 초 단위로 실시간 업데이트
- 📊 **프로그레스 바**: 새해까지의 진행률을 시각적으로 표시
- 🎉 **축하 애니메이션**: 새해가 되면 자동으로 축하 메시지와 색종이 효과 표시
- 📱 **반응형 디자인**: 모바일, 태블릿, 데스크톱 모든 화면 크기 지원
- 🐳 **도커 지원**: Docker와 Docker Compose를 통한 간편한 배포

## 🚀 빠른 시작

### 방법 1: 직접 실행

브라우저에서 `index.html` 파일을 직접 열어서 실행할 수 있습니다.

```bash
# 파일 탐색기에서 index.html을 더블클릭하거나
# 또는 로컬 서버 실행 (Python 예시)
python -m http.server 8000
```

그 다음 브라우저에서 `http://localhost:8000` 접속

### 방법 2: Docker Compose 사용 (권장)

```bash
# 프로젝트 디렉토리에서 실행
docker-compose up -d

# 브라우저에서 http://localhost:8080 접속
```

### 방법 3: Docker만 사용

```bash
# 이미지 빌드
docker build -t newyear-countdown .

# 컨테이너 실행
docker run -d -p 8080:80 --name countdown newyear-countdown

# 브라우저에서 http://localhost:8080 접속
```

## 🛠️ 기술 스택

- **Frontend**: HTML5, CSS3, Vanilla JavaScript
- **Server**: Nginx (Alpine Linux)
- **Container**: Docker, Docker Compose

## 📁 프로젝트 구조

```
NewYearCountdown/
├── index.html           # 메인 HTML 파일
├── style.css            # 스타일시트
├── script.js            # 카운트다운 로직
├── Dockerfile           # Docker 이미지 빌드 파일
├── docker-compose.yml   # Docker Compose 설정
└── README.md            # 프로젝트 문서
```

## 🎯 주요 기능

### 1. 실시간 카운트다운
- 2026년 1월 1일 00:00:00까지 남은 시간을 실시간으로 계산
- 매초마다 자동 업데이트

### 2. 동적 메시지
남은 시간에 따라 다른 메시지 표시:
- 30일 초과: "2026년을 기대하며..."
- 14-30일: "새해가 다가오고 있어요!"
- 7-14일: "2주도 채 남지 않았어요!"
- 3-7일: "한 주일도 안 남았습니다!"
- 1-3일: "며칠 남지 않았습니다!"
- 1일: "내일이 새해입니다!"
- 당일: "오늘이 마지막 날입니다!"

### 3. 진행률 표시
- 2025년 전체에서 현재까지의 진행률을 프로그레스 바로 시각화
- 퍼센트로 정확한 수치 표시

### 4. 새해 축하 효과
- 카운트다운이 끝나면 축하 메시지 표시
- 화려한 색종이 애니메이션 효과

## 🐳 Docker 명령어

```bash
# 컨테이너 중지
docker-compose down

# 컨테이너 재시작
docker-compose restart

# 로그 확인
docker-compose logs -f

# 컨테이너 상태 확인
docker-compose ps

# 이미지 재빌드
docker-compose build --no-cache
docker-compose up -d
```

## ⚙️ 커스터마이징

### 목표 날짜 변경
[script.js](script.js#L6)에서 `targetDate` 값을 수정:

```javascript
const targetDate = new Date('2026-01-01T00:00:00').getTime();
```

### 포트 변경
[docker-compose.yml](docker-compose.yml#L10)에서 포트 매핑 수정:

```yaml
ports:
  - "원하는포트:80"
```

### 색상 테마 변경
[style.css](style.css#L10-L17)에서 CSS 변수 수정:

```css
:root {
    --primary-color: #6366f1;
    --secondary-color: #8b5cf6;
    --accent-color: #ec4899;
    /* ... */
}
```

## 📱 반응형 브레이크포인트

- **데스크톱**: 768px 이상
- **태블릿**: 480px ~ 768px
- **모바일**: 480px 이하

## 🌟 브라우저 호환성

- Chrome (최신)
- Firefox (최신)
- Safari (최신)
- Edge (최신)

## 📝 라이선스

이 프로젝트는 자유롭게 사용하실 수 있습니다.

## 🎉 즐거운 새해 되세요!

Happy New Year 2026! 🎊✨

---

**Made with ❤️ for celebrating the New Year**
