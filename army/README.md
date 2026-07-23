# 육군체력단련장 안내 사이트

이 폴더는 **육군체력단련장 안내 사이트** 전용 프로젝트입니다.

## 기준 문서

- 이 폴더의 `기획서.md`가 상세 구현 기준입니다.
- 상위 `_문서_기획서/육군체력단련장-기획서.md`는 보관용 요약본입니다.

## 작업 원칙

- 공군체력단련장 콘텐츠를 섞지 않습니다.
- 공공기관 사이트로 오인되지 않도록 예약·결제 기능 없이 정보 정리 중심으로 제작합니다.
- 애드센스 승인을 위해 시설별 상세 페이지는 충분한 본문 콘텐츠를 포함해야 합니다.
- 예약, 요금, 이용 자격, 운영시간은 공개 안내와 각 시설 예약실 기준으로 정리합니다.

## 주요 폴더

- `facilities/`: 육군 시설별 상세 페이지
- `css/`: 공통 스타일
- `js/`: 공통 스크립트
- `images/`: 이미지 자산
- `source-assets/`: Open Graph 대표 이미지 원본
- `legal/`: 개인정보처리방침, 이용약관
- `contact.html`: 사이트 운영 문의와 정보 정정 경로
- `404.html`: 찾을 수 없는 주소의 안내 페이지
- `_redirects`: 통합된 이전 주소의 301 이동 규칙

## 빌드와 미리보기

로컬 페이지를 다시 생성한 뒤 `http://localhost:4174/`에서 확인합니다.

```powershell
node build.js
node server.js
```

운영 배포본은 실제 도메인과 공개 문의처를 넣어 `dist/`에 별도로 생성합니다. `dist/`만 정적 호스팅에 올리면 생성기와 기획 문서가 공개되지 않습니다.

```powershell
$env:NODE_ENV="production"
$env:SITE_URL="https://example.com"
$env:CONTACT_EMAIL="contact@example.com"
$env:OUTPUT_DIR="dist"
node build.js
```

운영 빌드는 `SITE_URL`이나 `CONTACT_EMAIL`이 비어 있으면 중단됩니다. 실제 도메인으로 생성해야 canonical, Open Graph URL·대표 이미지, 문의 이메일, robots의 Sitemap 경로와 `sitemap.xml`이 완성됩니다.

로컬 미리보기는 검색엔진에 노출되지 않도록 `noindex, nofollow`와 전체 크롤링 차단을 사용합니다. 운영 도메인에서는 위 명령처럼 `NODE_ENV=production`과 `SITE_URL`을 함께 지정해야 색인이 허용됩니다.

## 배포 전 확인

- 공식 홈페이지의 외부 링크·상업적 이용 조건을 확인하고 필요한 허락을 받습니다.
- Google Search Console과 네이버 서치어드바이저에 운영 도메인과 사이트맵을 제출합니다.
- 배포된 페이지 소스에서 `meta name="robots"`가 `index, follow`인지, `robots.txt`에 Sitemap 주소가 있는지 확인합니다.
- `/beginner-guide.html`이 `/guide.html`로 HTTP 301 이동하는지 확인합니다. `_redirects`를 지원하지 않는 호스팅은 같은 규칙을 관리 화면에서 설정합니다.
- 존재하지 않는 주소가 `404.html`을 보여주면서 HTTP 404 상태를 반환하는지 확인합니다.
- 광고를 시작하기 전에 개인정보처리방침의 실제 문의처와 쿠키 동의 요건을 검토합니다.
- 배포 URL을 PageSpeed Insights와 Rich Results Test에서 다시 검사합니다.

시설 자료를 다시 대조한 날에는 `build.js`의 `OFFICIAL_CHECKED_AT`을 실제 확인일로 바꾸고 전체 페이지를 재생성합니다. 날짜만 갱신하지 말고 주소, 예약실, 입장요금, 회원 구분과 예약 절차를 함께 확인합니다.
