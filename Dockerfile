# 멀티 스테이지 빌드를 사용한 Nginx 기반 Dockerfile
FROM nginx:alpine

# 메타데이터
LABEL maintainer="New Year Countdown"
LABEL description="New Year Countdown Web Application"

# 작업 디렉토리로 정적 파일 복사
COPY index.html /usr/share/nginx/html/
COPY style.css /usr/share/nginx/html/
COPY script.js /usr/share/nginx/html/

# Nginx 설정 파일 복사 (선택사항 - 커스텀 설정이 필요한 경우)
# COPY nginx.conf /etc/nginx/nginx.conf

# 포트 노출
EXPOSE 57126

# Health check 추가
HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
  CMD wget --quiet --tries=1 --spider http://localhost/ || exit 1

# Nginx 실행 (기본 명령어는 이미 이미지에 포함되어 있음)
CMD ["nginx", "-g", "daemon off;"]
