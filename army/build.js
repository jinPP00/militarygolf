const fs = require("fs");
const path = require("path");

const ROOT = __dirname;
const SITE_URL = (process.env.SITE_URL || "").replace(/\/$/, "");
const CONTACT_EMAIL = (process.env.CONTACT_EMAIL || "").trim();
const OUTPUT_ROOT = process.env.OUTPUT_DIR ? path.resolve(ROOT, process.env.OUTPUT_DIR) : ROOT;
const IS_PRODUCTION = process.env.NODE_ENV === "production";
const IS_INDEXABLE = IS_PRODUCTION && Boolean(SITE_URL);
const SITE_NAME = "육군체력단련장 안내";
const OFFICIAL_URL = "https://www.armywelfaregolf.mil.kr/";
const OFFICIAL_RESERVE_URL = "https://www.armywelfaregolf.mil.kr/reserve/reserveIntro.do";
const OFFICIAL_REQUEST_URL = "https://www.armywelfaregolf.mil.kr/reserve/reserveReqList.do";
const OFFICIAL_CONFIRM_URL = "https://www.armywelfaregolf.mil.kr/reserve/reserveFixList.do";
const OFFICIAL_MEMBER_URL = "https://www.armywelfaregolf.mil.kr/member/memberJoinGuide.do";
const OFFICIAL_CHECKED_AT = "2026-07-19";
const ASSET_VERSION = "perf-20260719k";

const facilities = [
  {
    slug: "gyeryong",
    name: "계룡대",
    region: "충남 계룡",
    area: "충청권",
    holes: 18,
    summary: "계룡권의 대표적인 18홀 체력단련장으로, 같은 지역의 구룡대와 주소와 예약실을 구분해 봐야 합니다.",
    intro: "계룡대는 충남 계룡에 있는 18홀 체력단련장입니다. 같은 계룡권의 구룡대와 이름을 혼동하기 쉬워 예약할 때 시설명과 주소를 먼저 맞춰보는 것이 중요합니다. 라운드 일정에는 이동 시간뿐 아니라 출입 확인과 준비 시간도 함께 잡아두는 것이 좋습니다.",
    access: "대전, 논산, 공주 방향에서 이동을 고려하는 사용자는 출발지별 이동 시간이 크게 달라질 수 있습니다. 특히 주말이나 공휴일에는 주변 도로 상황에 따라 도착 시간이 길어질 수 있으므로 티오프 시간보다 여유 있게 움직이는 편이 안전합니다. 주소와 출입 동선은 지도 서비스와 시설 안내를 함께 대조해 두는 것이 좋습니다.",
    tip: "처음 방문한다면 계룡대와 구룡대를 같은 지역권 시설로 묶어 비교해 보세요. 코스 규모, 예약 가능 시간, 동반자 조건, 그린피 확인 방식이 다를 수 있으므로 하나의 시설만 보고 판단하지 않는 것이 좋습니다."
  },
  {
    slug: "guryong",
    name: "구룡대",
    region: "충남 계룡",
    area: "충청권",
    holes: 18,
    summary: "계룡권에서 계룡대와 함께 비교되는 18홀 체력단련장으로, 예약 전 시설 구분이 중요합니다.",
    intro: "구룡대는 충남 계룡에 있는 18홀 체력단련장입니다. 계룡대와 지역과 코스 규모가 같지만 주소와 예약실 번호는 다릅니다. 예약 내용을 동반자에게 전달할 때도 ‘계룡’만 적기보다 구룡대라는 시설명과 정확한 주소를 함께 보내는 것이 좋습니다.",
    access: "충남 계룡권 방문자는 대전, 논산, 세종 등 주변 도시에서 이동하는 경우가 많습니다. 도착 전에는 차량 내비게이션 목적지를 안내 주소 기준으로 설정하고, 군 시설 특성상 출입 가능 시간과 확인 절차가 있는지 살펴야 합니다. 계룡권은 시설이 가까워 보여도 실제 진입 경로가 다를 수 있으므로 지도 확인이 필요합니다.",
    tip: "구룡대를 찾는 사용자는 계룡대 정보도 함께 확인하는 경우가 많습니다. 두 시설 모두 18홀로 안내되는 만큼 예약 시간대, 요금 기준, 이용 자격을 나란히 비교하면 방문 계획을 세우기 수월합니다."
  },
  {
    slug: "changgong",
    name: "창공대",
    region: "충남 논산",
    area: "충청권",
    holes: 9,
    summary: "충남 논산권의 9홀 체력단련장으로, 계룡·대전 방향 이동 시간과 예약 가능 시간대를 함께 비교하기 좋습니다.",
    intro: "창공대는 충남 논산에 있는 9홀 체력단련장입니다. 계룡대·구룡대보다 코스 규모가 작아 짧은 일정을 생각하기 쉽지만, 실제 체류 시간은 예약 시간과 현장 운영에 따라 달라집니다. 논산이나 계룡, 대전에서 출발한다면 왕복 이동 시간까지 포함해 일정을 계산해두세요.",
    access: "논산 지역은 계룡, 부여, 대전 방향과 연결되는 동선이 다양합니다. 방문 당일에는 내비게이션 이동 시간뿐 아니라 출입 확인, 주차, 클럽하우스 이동 시간을 포함해 일정을 계산해야 합니다. 주소와 전화번호는 예약 전에 한 번 더 대조해 두는 편이 안전합니다.",
    tip: "창공대는 충청권 9홀 시설로 분류해 계룡대, 구룡대와 함께 비교하면 좋습니다. 긴 라운드보다 간결한 일정이 필요한 경우 후보로 검토하되, 요금과 예약 조건을 함께 보고 일정을 잡는 편이 좋습니다."
  },
  {
    slug: "jaun",
    name: "자운대",
    region: "대전",
    area: "충청권",
    holes: 9,
    summary: "대전 도심권에서 접근하기 쉬운 9홀 체력단련장으로, 이용 자격과 출입 절차를 예약 전에 챙겨야 합니다.",
    intro: "자운대는 대전에 있는 9홀 체력단련장입니다. 주변 도시에서도 접근하기 편한 위치지만 일반 골프장처럼 주소만 보고 바로 입장한다고 생각하면 일정이 빠듯해질 수 있습니다. 예약 시간과 동반자 조건, 신분 확인 방법을 미리 챙기고 출퇴근 시간대 교통도 고려하세요.",
    access: "대전 도심권에서 이동하는 경우 출퇴근 시간, 주말 교통량, 주변 도로 상황에 따라 이동 시간이 크게 달라질 수 있습니다. 특히 처음 방문하는 사용자는 지도에서 도착 지점만 확인하지 말고 출입구 위치와 주차 동선까지 살펴보는 것이 좋습니다.",
    tip: "자운대는 대전권 이용자에게 편리한 후보가 될 수 있지만, 접근성이 좋다는 이유만으로 예약이 쉽다고 단정해서는 안 됩니다. 희망 날짜와 시간대를 여러 개 준비해 예약 가능 범위를 넓게 보는 편이 좋습니다."
  },
  {
    slug: "namseong",
    name: "남성대",
    region: "충북 영동",
    area: "충청권",
    holes: 9,
    summary: "충북 영동권 자연환경 속에 자리한 9홀 시설로, 이동 시간과 날씨 확인이 특히 중요합니다.",
    intro: "남성대는 충북 영동에 있는 9홀 체력단련장입니다. 대전·옥천·김천 방향에서 갈 수 있지만 산지와 지방도로를 지나는 구간이 있어 계절과 날씨의 영향을 받기 쉽습니다. 특히 겨울철이나 비가 오는 날에는 왕복 이동 시간을 평소보다 넉넉히 잡는 편이 좋습니다.",
    access: "충북 영동은 대전, 김천, 옥천 등 여러 지역에서 접근할 수 있지만 산지와 지방도로 이동이 포함될 수 있습니다. 우천, 안개, 겨울철 도로 상황에 따라 이동 조건이 바뀔 수 있으므로 출발 전 지도와 기상 정보를 함께 확인하는 것이 좋습니다.",
    tip: "남성대를 이용하려는 경우 라운드 시간뿐 아니라 왕복 이동 시간까지 포함해 하루 일정을 잡는 편이 좋습니다. 요금, 휴장일, 예약 가능 여부를 같이 놓고 보면 일정 조정이 수월합니다."
  },
  {
    slug: "haman",
    name: "함안대",
    region: "경남 함안",
    area: "영남권",
    holes: 9,
    summary: "경남 함안권 이용자를 위한 9홀 체력단련장으로, 창원·진주·부산 서부권에서 함께 검토됩니다.",
    intro: "함안대는 경남 함안에 있는 9홀 체력단련장입니다. 창원·마산에서는 비교적 가까운 편이고 진주나 부산 서부권에서도 후보로 볼 수 있지만, 출발지에 따라 이동 시간이 크게 달라집니다. 예약 시각을 정한 뒤 실제 도로 상황과 현장 준비 시간을 거꾸로 계산해 출발 시각을 잡아두세요.",
    access: "함안 지역은 남해고속도로와 주변 국도 접근성이 있지만, 출발지에 따라 도착 시간이 달라집니다. 처음 방문하는 사용자는 정확한 주소, 출입구, 주차 동선을 시설 안내와 지도에서 함께 살펴야 합니다. 군 시설은 일반 골프장보다 출입 확인 절차가 더 중요할 수 있습니다.",
    tip: "경남권에서 이동한다면 함안대만 보지 말고 출발지와 가까운 도로 진입 방향도 함께 비교해 보세요. 예약실에 문의할 때는 첫 방문임을 알리고 출입과 도착 시간을 함께 물어보면 일정 잡기가 수월합니다."
  },
  {
    slug: "muyeol",
    name: "무열대",
    region: "대구",
    area: "영남권",
    holes: 9,
    summary: "대구권에서 확인되는 9홀 육군 체력단련장으로, 도심 접근성과 출입 확인이 핵심입니다.",
    intro: "무열대는 대구에 있는 9홀 체력단련장입니다. 도심권에서 가깝게 느껴지더라도 시간대별 교통량과 출입 확인 시간을 빼놓으면 도착이 빠듯해질 수 있습니다. 짧은 라운드로 계획하더라도 이동과 준비까지 포함한 전체 일정으로 보는 것이 현실적입니다.",
    access: "대구 도심권에서 이동할 때는 시간대별 교통량과 주차 동선을 함께 고려해야 합니다. 군 관련 시설은 일반 목적지와 달리 진입 가능 경로가 제한될 수 있으므로 지도 정보와 시설 안내를 함께 보는 것이 좋습니다.",
    tip: "무열대를 처음 찾는다면 예약 전 이용 자격, 신분 확인, 동반자 조건을 먼저 살펴보세요. 특히 주말 이용을 계획한다면 대체 날짜와 인근 시설 정보도 함께 확인하는 편이 안정적입니다."
  },
  {
    slug: "seonbong",
    name: "선봉대",
    region: "경기 용인",
    area: "수도권",
    holes: 9,
    summary: "수도권 남부 이용자가 많이 찾는 용인권 9홀 체력단련장으로, 예약 경쟁과 이동 시간을 고려해야 합니다.",
    intro: "선봉대는 경기 용인에 있는 9홀 체력단련장입니다. 서울 남부와 수원·성남·화성 등 여러 방향에서 접근할 수 있어 희망 시간대가 빨리 좁아질 수 있습니다. 날짜를 정할 때 오전·오후 후보를 함께 준비하고, 수도권 교통량을 고려해 도착 시각을 여유 있게 잡으세요.",
    access: "수도권 남부는 평일 출퇴근 시간과 주말 나들이 교통의 영향을 크게 받습니다. 지도상 거리가 가까워 보여도 실제 이동 시간은 달라질 수 있으므로 도착 목표 시간을 넉넉히 잡는 것이 좋습니다. 처음 방문한다면 시설명과 정확한 위치를 혼동하지 않도록 안내 주소를 기준으로 확인하세요.",
    tip: "선봉대는 수도권 접근성이 장점인 만큼 방문 계획을 미리 세우는 것이 좋습니다. 동반자 조건, 취소 규정, 우천 시 운영 여부를 함께 확인하면 당일 변수를 줄일 수 있습니다."
  },
  {
    slug: "biseung",
    name: "비승대",
    region: "경기 이천",
    area: "수도권",
    holes: 9,
    summary: "경기 이천권의 9홀 체력단련장으로, 같은 지역의 사자대와 시설명·주소를 구분해 예약해야 합니다.",
    intro: "비승대 체력단련장은 경기 이천 지역에서 확인할 수 있는 육군 체력단련장입니다. 이천권에는 사자대와 함께 비교되는 정보가 많아 시설명을 정확히 구분하는 것이 중요합니다. 9홀 시설로 안내되며, 예약 가능 시간과 요금 기준을 함께 보면 일정을 잡기 쉽습니다.",
    access: "이천 지역은 수도권 남동부와 충청권 일부에서 접근하기 좋은 위치로 인식되지만, 주말 교통량과 고속도로 상황에 따라 이동 시간이 달라질 수 있습니다. 예약 시간에 맞춰 움직일 때는 출발 시간을 넉넉히 잡고, 현장 도착 후 확인 절차를 고려해야 합니다.",
    tip: "비승대를 검토할 때는 같은 이천권의 사자대 페이지도 함께 확인하세요. 두 시설을 비교하면 희망 날짜, 이동 동선, 코스 규모, 예약 조건을 더 현실적으로 판단할 수 있습니다."
  },
  {
    slug: "saja",
    name: "사자대",
    region: "경기 이천",
    area: "수도권",
    holes: 9,
    summary: "이천권에서 비승대와 함께 확인되는 9홀 체력단련장으로, 시설명 구분과 예약 조건 확인이 중요합니다.",
    intro: "사자대는 경기 이천에 있는 9홀 체력단련장입니다. 같은 이천권의 비승대와 혼동하기 쉬우므로 예약실 번호와 주소를 시설명에 맞춰 확인해야 합니다. 동반자에게도 ‘이천 체력단련장’이 아니라 사자대라는 이름을 정확히 전달해두세요.",
    access: "이천 지역은 수도권 남동부에서 이동하기 좋은 편이지만, 시간대에 따라 교통 흐름이 크게 달라질 수 있습니다. 특히 주말 오전 라운드를 계획한다면 출발 전 도로 상황과 도착 후 준비 시간을 함께 고려해야 합니다.",
    tip: "사자대는 비승대와 비교해 보는 것이 좋습니다. 같은 지역권 시설이라도 예약 가능한 날짜, 출입 절차, 운영시간, 요금 기준이 다를 수 있으므로 두 페이지를 나란히 보고 일정을 잡는 편이 좋습니다."
  },
  {
    slug: "sangmu",
    name: "상무대",
    region: "전남 장성",
    area: "호남권",
    holes: 9,
    summary: "전남 장성권 9홀 체력단련장으로, 호남권 이용자가 대표적으로 확인하는 시설입니다.",
    intro: "상무대는 전남 장성에 있는 9홀 체력단련장입니다. 광주·담양·정읍 등 호남권 여러 지역에서 접근할 수 있지만 출발지에 따라 이동 시간이 크게 달라집니다. 먼 거리에서 방문한다면 예약 내용과 기상 상황을 출발 전에 한 번 더 확인해두세요.",
    access: "전남 장성권은 광주, 담양, 정읍 등 주변 지역에서 접근할 수 있습니다. 다만 군 관련 시설은 일반 관광지와 달리 출입 절차가 있을 수 있으므로 주소만 보고 출발하기보다 연락처와 진입 동선을 함께 챙기는 것이 좋습니다.",
    tip: "호남권에서는 왕복 이동 시간이 일정의 큰 부분을 차지합니다. 예약 시간만 보지 말고 9홀 이용 시간, 식사와 휴식, 귀가 시간까지 한 번에 잡아두면 당일 일정이 덜 급해집니다."
  },
  {
    slug: "chungseong",
    name: "충성대",
    region: "경북 영천",
    area: "영남권",
    holes: 9,
    summary: "경북 영천권 9홀 체력단련장으로, 대구·경북 동부권 이용자가 확인하기 좋은 시설입니다.",
    intro: "충성대는 경북 영천에 있는 9홀 체력단련장입니다. 대구·경산·포항 등 경북 동부권에서 이동할 때 후보로 볼 수 있으며, 출발지에 따라 고속도로와 국도 이동 시간이 달라집니다. 예약 시각 앞뒤로 출입 확인과 현장 준비 시간을 충분히 남겨두세요.",
    access: "영천권은 고속도로와 국도 이동이 함께 고려되는 지역입니다. 날씨, 도로 상황, 예약 시간에 따라 출발 시간이 달라질 수 있으므로 지도와 시설 안내를 함께 보고 움직이는 편이 좋습니다.",
    tip: "충성대는 대구권의 무열대와 함께 비교해 볼 수 있습니다. 두 시설의 위치와 예약 조건을 함께 살펴보면 경북권 이용 계획을 더 현실적으로 세울 수 있습니다."
  }
];

const nav = [
  ["index.html", "홈"],
  ["facilities.html", "시설 안내"],
  ["guide.html", "예약 안내"],
  ["rules.html", "이용 규정"],
  ["faq.html", "FAQ"]
];

const officialInfo = {
  gyeryong: {
    address: "(우) 32801 충남 계룡시 신도안면 계룡대로 976",
    navName: "계룡 체력단련장",
    weatherQuery: "충남 계룡시 신도안면 날씨",
    reservationPhone: "042-550-6841 / 군전화 960-6841"
  },
  guryong: {
    address: "(우) 32800 충남 계룡시 신도안면 계룡대9로 104",
    navName: "구룡대 체력단련장",
    weatherQuery: "충남 계룡시 신도안면 날씨",
    reservationPhone: "042-550-6842 / 군전화 960-6842"
  },
  changgong: {
    address: "충남 논산시 노성면 노성로 438",
    navName: "창공대 체력단련장",
    weatherQuery: "충남 논산시 노성면 날씨",
    reservationPhone: "041-730-6801 / 군전화 951-6891"
  },
  jaun: {
    address: "대전시 유성구 자운로 272-83(추목동)",
    navName: "자운대 체력단련장",
    weatherQuery: "대전 유성구 추목동 날씨",
    reservationPhone: "042-868-6514~5 / 군전화 975-2954"
  },
  namseong: {
    address: "충북 영동군 양강면 양정죽촌로 69",
    navName: "남성대 체력단련장",
    weatherQuery: "충북 영동군 양강면 날씨",
    reservationPhone: "043-745-1702 또는 043-745-1700(ARS 1번) / 군전화 896-6900(ARS 1번)"
  },
  haman: {
    address: "(우) 52064 경남 함안군 군북면 함마대로 1065",
    navName: "함안대 체력단련장",
    weatherQuery: "경남 함안군 군북면 날씨",
    reservationPhone: "055-585-0760"
  },
  muyeol: {
    address: "(우)706-799 대구광역시 수성구 무열로 56",
    navName: "무열대 체력단련장",
    weatherQuery: "대구 수성구 무열로 날씨",
    reservationPhone: "053-750-7933 / 군전화 972-7933"
  },
  seonbong: {
    address: "경기도 용인시 처인구 성산로 57길, 경기 용인시 처인구 역북동 180-1",
    navName: "선봉대 체력단련장",
    weatherQuery: "경기 용인시 처인구 역북동 날씨",
    reservationPhone: "031-339-7763(내선 1번) / 군전화 973-7230~1"
  },
  biseung: {
    address: "(우)467-859 경기도 이천시 진상미로 1700-29 비승대체력단련장",
    navName: "비승대 체력단련장",
    weatherQuery: "경기 이천시 진상미로 날씨",
    reservationPhone: "031-634-5527, 031-634-5545"
  },
  saja: {
    address: "(우)467-811 경기도 이천시 마장면 억만리로 51(회억리247)",
    navName: "사자대 체력단련장",
    weatherQuery: "경기 이천시 마장면 회억리 날씨",
    reservationPhone: "031-632-3700(ARS 1번) / 010-6615-3701 / 군전화 962-7520"
  },
  sangmu: {
    address: "전라남도 삼서면 태청로 428번지 사서함 75-5호(우) 57252",
    navName: "상무대 체력단련장",
    weatherQuery: "전남 장성군 삼서면 날씨",
    reservationPhone: "061-350-2560, 061-351-0002"
  },
  chungseong: {
    address: "경상북도 영천시 고경면 호국로 575-79",
    navName: "충성대체력단련장",
    weatherQuery: "경북 영천시 고경면 날씨",
    reservationPhone: "054-330-0613"
  }
};

const facilityAmenities = {
  gyeryong: ["클럽하우스", "프론트·현관", "대식당", "별실", "락커룸", "용품점", "스타트하우스", "그늘집", "연습장"],
  guryong: ["클럽하우스", "프론트·현관", "대식당", "별실", "락커룸", "용품점", "그늘집", "연습장"],
  jaun: ["클럽하우스", "프론트·현관", "대식당", "별실", "락커룸", "용품점", "스타트하우스", "그늘집", "연습장"],
  namseong: ["클럽하우스", "프론트·현관", "락커룸", "스타트하우스", "그늘집", "연습장"],
  changgong: ["클럽하우스", "프론트·현관", "락커룸", "스타트·그늘집", "연습장"],
  haman: ["클럽하우스", "프론트·현관", "락커룸", "그늘집", "연습장"],
  muyeol: ["클럽하우스", "프론트·현관", "대식당", "별실", "락커룸", "용품점", "그린하우스", "그늘집", "연습장"],
  seonbong: ["클럽하우스", "프론트·현관", "라운지·로비", "대식당", "락커룸", "용품점", "스타트하우스", "그늘집", "연습장"],
  biseung: ["클럽하우스", "프론트·현관", "스타트하우스", "락커룸", "용품점", "그늘집"],
  saja: ["클럽하우스", "프론트·현관", "대식당·그늘집", "락커룸", "스타트하우스", "간이휴게소", "연습장"],
  sangmu: ["클럽하우스", "프론트·현관", "대식당", "락커룸", "용품점", "스타트하우스", "그늘집"],
  chungseong: ["클럽하우스", "프론트·현관", "대식당", "락커룸", "용품점", "스타트하우스", "연습장"]
};

const reservationProfiles = {
  gyeryong: { rounds: "18홀 경기(2R), 9홀 경기(1R)", sessions: "1차 06:00~08:00, 2차 11:00~13:00", note: "일조량에 따라 시간은 달라질 수 있습니다." },
  guryong: { rounds: "18홀 경기(2R), 9홀 경기(1R)", sessions: "2차 06:00~08:30, 3차 11:00~13:24", note: "일조량에 따라 시간은 달라질 수 있습니다." },
  jaun: { rounds: "1R, 2R", sessions: "1차, 2차", note: "희망 차수의 세부 시간은 예약 화면에서 확인합니다." },
  namseong: { rounds: "9홀 경기, 18홀 경기", sessions: "2차(오전), 3차(오후)", note: "경기 구분과 차수를 함께 선택합니다." },
  changgong: { rounds: "1R, 2R", sessions: "1차, 2차, 3차", note: "희망 차수의 세부 시간은 예약 화면에서 확인합니다." },
  haman: { rounds: "1R, 2R", sessions: "1차, 2차", note: "희망 차수의 세부 시간은 예약 화면에서 확인합니다." },
  muyeol: { rounds: "1R, 2R", sessions: "1차, 2차, 3차", note: "희망 차수의 세부 시간은 예약 화면에서 확인합니다." },
  seonbong: { rounds: "9홀 경기, 18홀 경기", sessions: "2차, 3차", note: "희망 차수의 세부 시간은 예약 화면에서 확인합니다." },
  biseung: { rounds: "1R, 2R", sessions: "1차, 2차", note: "희망 차수의 세부 시간은 예약 화면에서 확인합니다." },
  saja: { rounds: "1R(9홀), 2R(18홀)", sessions: "2차, 3차", note: "경기 구분과 차수를 함께 선택합니다." },
  sangmu: { rounds: "1R, 2R", sessions: "2차(1부 아침 티), 3차(2부 오후 티)", note: "희망 차수는 오전과 오후로 구분됩니다." },
  chungseong: { rounds: "1R, 2R", sessions: "1차, 2차", note: "희망 차수의 세부 시간은 예약 화면에서 확인합니다." }
};

const feeTables = {
  gyeryong: {
    title: "계룡대 입장요금(18홀 기준)",
    caption: "입장요금 화면에 표시된 18홀 기준 일반회원 요금입니다.",
    typeHeader: "할인 구분",
    greenHeader: "그린피",
    cartHeader: "카트료",
    rows: [
      { group: "일반회원", type: "일반", day: "평일", greenFee: "124,000", cartFee: "20,000", total: "144,000" },
      { group: "일반회원", type: "일반", day: "휴일", greenFee: "170,000", cartFee: "20,000", total: "190,000" },
      { group: "일반회원", type: "대전·충남·세종 시민 10% 할인", day: "평일", greenFee: "111,600", cartFee: "20,000", total: "131,600" },
      { group: "일반회원", type: "대전·충남·세종 시민 10% 할인", day: "휴일", greenFee: "153,000", cartFee: "20,000", total: "173,000" },
      { group: "일반회원", type: "계룡시민 25% 할인", day: "평일", greenFee: "93,000", cartFee: "20,000", total: "113,000" },
      { group: "일반회원", type: "계룡시민 25% 할인", day: "휴일", greenFee: "127,500", cartFee: "20,000", total: "147,500" }
    ],
    notes: [
      "지역주민 할인은 신분증 등 증빙서류가 필요하며, 미지참 시 할인이 적용되지 않는 것으로 안내됩니다.",
      "현역 경기일 동반 비회원은 30,000원 할인으로 안내되며, 예비역 동반 할인 등은 적용 조건과 횟수 제한이 있습니다.",
      "캐디 봉사료는 4인 기준 140,000원으로 안내됩니다."
    ]
  },
  guryong: {
    title: "구룡대 입장요금(18홀 기준)",
    caption: "입장요금 화면에 표시된 18홀 기준 일반회원 요금입니다.",
    typeHeader: "할인 구분",
    greenHeader: "그린피",
    cartHeader: "카트료",
    rows: [
      { group: "일반회원", type: "일반", day: "평일", greenFee: "124,000", cartFee: "20,000", total: "144,000" },
      { group: "일반회원", type: "일반", day: "휴일", greenFee: "170,000", cartFee: "20,000", total: "190,000" },
      { group: "일반회원", type: "대전·충남·세종 시민 10% 할인", day: "평일", greenFee: "111,600", cartFee: "20,000", total: "131,600" },
      { group: "일반회원", type: "대전·충남·세종 시민 10% 할인", day: "휴일", greenFee: "153,000", cartFee: "20,000", total: "173,000" },
      { group: "일반회원", type: "계룡시민 25% 할인", day: "평일", greenFee: "93,000", cartFee: "20,000", total: "113,000" },
      { group: "일반회원", type: "계룡시민 25% 할인", day: "휴일", greenFee: "127,500", cartFee: "20,000", total: "147,500" }
    ],
    notes: [
      "지역주민 할인은 신분증 등 증빙서류가 필요하며, 미지참 시 할인이 적용되지 않는 것으로 안내됩니다.",
      "예비역 정회원 예약자 동반 비회원 할인은 평일·분기 1회 기준으로 안내되며, 현역 경기일 동반 비회원은 30,000원 할인으로 안내됩니다.",
      "노캐디팀 그린보수비는 6,000원, 캐디 봉사료는 140,000원으로 안내됩니다."
    ]
  },
  jaun: {
    title: "자운대 입장요금(2ROUND 기준)",
    caption: "입장요금 화면에 표시된 2ROUND 기준 비회원 요금입니다. 괄호 안 금액은 대전·충남·세종 10% 할인 금액으로 표시되어 있습니다.",
    typeHeader: "구분",
    greenHeader: "입장료",
    cartHeader: "카트료",
    rows: [
      { group: "비회원", type: "기본 / 대전·충남·세종 10% 할인", day: "평일", greenFee: "86,000 / (77,400)", cartFee: "12,000", total: "98,000 / (89,400)", note: "부가세 10% 포함" },
      { group: "비회원", type: "기본 / 대전·충남·세종 10% 할인", day: "휴일", greenFee: "100,000 / (90,000)", cartFee: "12,000", total: "112,000 / (102,000)", note: "부가세 10% 포함" }
    ],
    notes: [
      "경기보조원 봉사료는 4백 기준 140,000원으로 안내됩니다.",
      "노캐디팀 디봇수리비는 6,000원으로 안내됩니다."
    ]
  },
  namseong: {
    title: "남성대 입장요금(2ROUND 기준)",
    caption: "입장요금 화면의 2ROUND 기준 비회원 요금이며, 그린피와 디봇보수비가 함께 표시됩니다.",
    typeHeader: "구분",
    greenHeader: "그린피+디봇보수비",
    cartHeader: "카트비",
    rows: [
      { group: "비회원", type: "기본", day: "평일", greenFee: "78,000 + 6,000", cartFee: "20,000", total: "104,000", note: "부가세 10% 포함" },
      { group: "비회원", type: "기본", day: "휴일", greenFee: "94,000 + 6,000", cartFee: "20,000", total: "120,000", note: "부가세 10% 포함" }
    ],
    notes: [
      "화면에는 2026년 7월 1일부터 적용되는 기준으로 안내되어 있습니다."
    ]
  },
  changgong: {
    title: "창공대 입장요금(2024.04.18부터)",
    caption: "입장요금 화면에 표시된 18홀 이용요금입니다. 입장료는 그린피와 보수료 합산 구조로 표시됩니다.",
    typeHeader: "구분",
    greenHeader: "그린피+보수료",
    cartHeader: "카트비",
    rows: [
      { group: "비회원", type: "기본", day: "평일", greenFee: "70,000 + 2,200", cartFee: "15,000", total: "87,200" },
      { group: "비회원", type: "기본", day: "휴일", greenFee: "98,000 + 2,200", cartFee: "15,000", total: "115,200" },
      { group: "지역주민", type: "지역주민", day: "평일", greenFee: "63,000 + 2,200", cartFee: "15,000", total: "80,200" },
      { group: "지역주민", type: "지역주민", day: "휴일", greenFee: "88,200 + 2,200", cartFee: "15,000", total: "105,400" }
    ],
    notes: [
      "화면에는 부가세 10% 포함 금액으로 안내되어 있습니다."
    ]
  },
  haman: {
    title: "함안대 입장요금",
    caption: "입장요금 화면에 표시된 비회원 요금입니다.",
    typeHeader: "구분",
    greenHeader: "그린피",
    cartHeader: "카트료",
    totalHeader: "합계",
    rows: [
      { group: "비회원", type: "기본", day: "평일", greenFee: "68,000", cartFee: "20,000", total: "88,000", note: "부가세 10% 포함" },
      { group: "비회원", type: "기본", day: "주말", greenFee: "94,000", cartFee: "20,000", total: "114,000", note: "부가세 10% 포함" }
    ],
    notes: [
      "보조원 봉사료는 140,000원으로 안내됩니다."
    ]
  },
  muyeol: {
    title: "무열대 입장요금(2ROUND·1ROUND)",
    caption: "입장요금 화면은 2ROUND와 1ROUND를 나누어 비회원 요금을 표시합니다.",
    typeHeader: "라운드",
    greenHeader: "입장료",
    cartHeader: "카트비",
    totalHeader: "계",
    rows: [
      { group: "비회원", type: "2ROUND", day: "평일", greenFee: "78,000", cartFee: "12,000", total: "90,000", note: "부가세 포함" },
      { group: "비회원", type: "2ROUND", day: "휴일", greenFee: "97,000", cartFee: "12,000", total: "109,000", note: "부가세 포함" },
      { group: "비회원", type: "1ROUND", day: "평일", greenFee: "39,000", cartFee: "6,000", total: "45,000", note: "부가세 포함" },
      { group: "비회원", type: "1ROUND", day: "휴일", greenFee: "48,500", cartFee: "6,000", total: "54,500", note: "부가세 포함" }
    ],
    notes: [
      "보조원 봉사료는 4백 기준 140,000원으로 안내됩니다.",
      "노캐디 셀프팀 그린보수비는 2,200원으로 안내됩니다.",
      "4월부터 9월까지 조조팀 운영 안내가 별도로 표시되어 있습니다."
    ]
  },
  seonbong: {
    title: "선봉대 입장요금(18홀 기준)",
    caption: "입장요금 화면에 표시된 18홀 기준 비회원 요금입니다.",
    typeHeader: "구분",
    greenHeader: "입장료",
    cartHeader: "카트비",
    totalHeader: "합계",
    rows: [
      { group: "비회원", type: "기본", day: "평일", greenFee: "91,000", cartFee: "20,000", total: "111,000", note: "부가세 포함" },
      { group: "비회원", type: "기본", day: "휴일", greenFee: "107,000", cartFee: "20,000", total: "127,000", note: "부가세 포함" }
    ],
    notes: [
      "보조원 봉사료는 4백 기준 140,000원으로 안내됩니다."
    ]
  },
  biseung: {
    title: "비승대 입장요금(비승코스 18홀)",
    caption: "입장요금 화면에 표시된 비승코스 18홀 기준 비회원 요금입니다.",
    typeHeader: "구분",
    greenHeader: "그린피",
    cartHeader: "카트료",
    totalHeader: "합계",
    rows: [
      { group: "비회원", type: "기본", day: "평일", greenFee: "83,000", cartFee: "20,000", total: "103,000", note: "셀프 경기 시 디보트 비용 6,000원 별도" },
      { group: "비회원", type: "기본", day: "휴일", greenFee: "97,000", cartFee: "20,000", total: "117,000" }
    ],
    notes: [
      "화면에는 2024년 6월 15일부터 적용되는 기준으로 안내되어 있습니다.",
      "보조원 봉사료는 4백 기준 140,000원으로 안내됩니다."
    ]
  },
  saja: {
    title: "사자대 입장요금",
    caption: "입장요금 화면에 표시된 비회원 요금입니다.",
    typeHeader: "구분",
    greenHeader: "그린피",
    cartHeader: "카트료",
    rows: [
      { group: "비회원", type: "기본", day: "평일", greenFee: "91,000", cartFee: "20,000", total: "111,000" },
      { group: "비회원", type: "기본", day: "휴일", greenFee: "107,000", cartFee: "20,000", total: "127,000" }
    ],
    notes: [
      "표시 금액은 입장요금 화면의 합계 기준입니다."
    ]
  },
  sangmu: {
    title: "상무대 입장요금",
    caption: "입장요금 화면에 표시된 비회원 요금이며, 그린피와 디봇보수비가 함께 표시됩니다.",
    typeHeader: "구분",
    greenHeader: "그린피+디봇보수비",
    cartHeader: "카트료",
    rows: [
      { group: "비회원", type: "기본", day: "평일", greenFee: "55,000 + 6,000", cartFee: "20,000", total: "81,000" },
      { group: "비회원", type: "기본", day: "휴일", greenFee: "82,000 + 6,000", cartFee: "20,000", total: "108,000" }
    ],
    notes: [
      "표시 금액은 입장요금 화면의 합계 기준입니다."
    ]
  },
  chungseong: {
    title: "충성대 입장요금",
    caption: "입장요금 화면에 표시된 비회원 요금입니다.",
    typeHeader: "구분",
    greenHeader: "그린피",
    cartHeader: "카트료",
    rows: [
      { group: "비회원", type: "기본", day: "평일", greenFee: "69,000", cartFee: "20,000", total: "89,000" },
      { group: "비회원", type: "기본", day: "휴일", greenFee: "90,000", cartFee: "20,000", total: "110,000" }
    ],
    notes: [
      "표시 금액은 입장요금 화면의 합계 기준입니다."
    ]
  }
};

const humanNotes = {
  gyeryong: {
    dayPlan: "계룡권은 계룡대와 구룡대를 함께 검색하는 사람이 많습니다. 예약 전에는 시설명을 구분하고, 내비게이션 목적지도 주소 기준으로 넣어두세요. 비슷한 이름의 시설을 잘못 선택하면 당일 일정이 꽤 난감해질 수 있습니다.",
  },
  guryong: {
    dayPlan: "두세 명이 함께 움직인다면 예약 담당자에게 동반자 조건을 한 번에 확인하는 것이 좋습니다. 체력단련장 이용은 시설명, 자격, 동반자 구성에 따라 안내가 달라질 수 있어 통화 전에 메모를 만들어두면 질문이 빠지지 않습니다.",
  },
  changgong: {
    dayPlan: "논산 방향은 날씨와 도로 상황에 따라 체감 이동 시간이 달라집니다. 특히 이른 오전 예약을 생각한다면 전날 밤에 주소, 예약실 번호, 신분증, 복장을 한 번에 확인해두세요.",
  },
  jaun: {
    dayPlan: "대전 안에서 이동하더라도 출퇴근 시간대와 겹치면 예상보다 시간이 늘어납니다. 예약 확인 전에는 희망 시간대를 하나로 고정하기보다 가능한 날짜와 시간을 몇 개 준비해두면 선택 폭이 넓어집니다.",
  },
  namseong: {
    dayPlan: "영동 방향은 계절에 따라 체감이 많이 달라집니다. 안개, 비, 겨울철 도로 상황이 변수로 작용할 수 있으니 예약 전날 기상 정보를 보고, 이동 시간이 길어질 가능성까지 일정에 넣어두세요.",
  },
  haman: {
    dayPlan: "경남권 이용자는 같은 거리라도 시간대별 교통 차이를 크게 느낄 수 있습니다. 예약실에 문의할 때는 희망 날짜와 함께 도착 가능 시간대를 현실적으로 잡아두고, 주변 도로가 막힐 경우의 대체 시간을 생각해두면 좋습니다.",
  },
  muyeol: {
    dayPlan: "대구에서 출발한다면 주차와 출입 확인 시간을 포함해 일정을 잡으세요. 전화예약을 문의할 때는 이용 자격, 동반자 기준, 현장 도착 권장 시간을 함께 물어보면 첫 방문 때 덜 헤맵니다.",
  },
  seonbong: {
    dayPlan: "수도권 시설은 희망 시간대를 하나로 고집하면 선택지가 좁아질 수 있습니다. 예약 전에는 평일과 주말, 오전과 오후를 나누어 가능한 시간을 적어두고 예약 화면과 전화문의 흐름을 함께 살펴보세요.",
  },
  biseung: {
    dayPlan: "이천권을 처음 보는 이용자는 비승대와 사자대를 반드시 구분해야 합니다. 시설명, 주소, 예약실 번호를 따로 적어두고 통화하면 혼선이 줄어듭니다. 특히 동반자가 시설명을 다르게 알고 있는 경우가 있어 출발 전 공유가 필요합니다.",
  },
  saja: {
    dayPlan: "예약 문의 전에는 원하는 날짜만 정하지 말고 가능한 대체 날짜도 적어두세요. 체력단련장은 운영 상황에 따라 안내가 달라질 수 있으니, 통화 중 바로 조정할 수 있게 준비해두면 시간이 덜 걸립니다.",
  },
  sangmu: {
    dayPlan: "호남권에서 출발지가 서로 다르다면 중간 합류 지점을 미리 정해두세요. 예약실 문의 시에는 이용 자격과 동반자 조건을 먼저 확인하고, 기상 악화 시 운영 안내를 어디서 확인하는지도 물어보면 좋습니다.",
  },
  chungseong: {
    dayPlan: "영천 방향은 날씨와 도로 흐름을 함께 보는 것이 좋습니다. 예약 전에는 안내 주소, 전화예약 번호, 도착 권장 시간을 확인하고, 동반자에게도 같은 정보를 공유해두세요.",
  }
};

function ensureDir(dir) {
  fs.mkdirSync(path.join(OUTPUT_ROOT, dir), { recursive: true });
}

function write(file, content) {
  const target = path.join(OUTPUT_ROOT, file);
  fs.mkdirSync(path.dirname(target), { recursive: true });
  fs.writeFileSync(target, content, "utf8");
}

function minifyHtml(content) {
  return content
    .replace(/>\s+</g, "><")
    .replace(/\s+\n/g, "\n")
    .trim() + "\n";
}

function minifyCss(content) {
  return content
    .replace(/\/\*[\s\S]*?\*\//g, "")
    .replace(/\s+/g, " ")
    .replace(/\s*([{}:;,>~+])\s*/g, "$1")
    .replace(/;}/g, "}")
    .trim() + "\n";
}

function minifyJs(content) {
  return content
    .replace(/^\s*\/\/.*$/gm, "")
    .replace(/\s+/g, " ")
    .replace(/\s*([{}()[\]=:;,<>+\-*/?])\s*/g, "$1")
    .replace(/;}/g, "}")
    .trim() + "\n";
}

function listFiles(dir, predicate, acc = []) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) listFiles(fullPath, predicate, acc);
    else if (predicate(fullPath)) acc.push(fullPath);
  }
  return acc;
}

function optimizeOutput() {
  const htmlFiles = listFiles(OUTPUT_ROOT, (file) => file.endsWith(".html"));
  for (const file of htmlFiles) {
    fs.writeFileSync(file, minifyHtml(fs.readFileSync(file, "utf8")), "utf8");
  }
  const cssFile = path.join(OUTPUT_ROOT, "css", "style.css");
  if (fs.existsSync(cssFile)) {
    fs.writeFileSync(cssFile, minifyCss(fs.readFileSync(cssFile, "utf8")), "utf8");
  }
  for (const file of listFiles(path.join(OUTPUT_ROOT, "js"), (item) => item.endsWith(".js"))) {
    fs.writeFileSync(file, minifyJs(fs.readFileSync(file, "utf8")), "utf8");
  }
}

function rel(depth, target) {
  return `${"../".repeat(depth)}${target}`;
}

function escapeHtml(value) {
  return String(value).replace(/[&<>"']/g, (ch) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[ch]));
}

function stripHtml(value) {
  return String(value).replace(/<[^>]*>/g, "").replace(/\s+/g, " ").trim();
}

function phoneHref(value) {
  const match = String(value || "").match(/0\d{1,2}-\d{3,4}-\d{4}/);
  return match ? `tel:${match[0].replace(/-/g, "")}` : "";
}

function weatherHref(official = {}) {
  const query = official.weatherQuery || `${official.address || official.navName || ""} 날씨`;
  return `https://search.naver.com/search.naver?query=${encodeURIComponent(query)}`;
}

function mapHref(official = {}) {
  const query = `${official.navName || ""} ${official.address || ""}`.trim();
  return `https://map.kakao.com/link/search/${encodeURIComponent(query)}`;
}

function feeWithUnit(value) {
  return String(value || "").replace(/(\d{1,3}(?:,\d{3})+)(?!원)/g, "$1원");
}

function searchText(f, official = {}) {
  return `${f.name} ${f.region} ${f.area} ${f.holes}홀 ${official.address || ""} ${official.navName || ""}`.toLowerCase();
}

function officialMenuLabel(f, key) {
  const defaults = { route: "오시는길", phone: "전화번호", fee: "입장요금" };
  return defaults[key] || "안내 메뉴";
}

function officialMenuPath(f, key) {
  const label = officialMenuLabel(f, key);
  if (key === "fee") return `예약/경기/요금 > ${label}`;
  if (key === "phone" || key === "route") return `체력단련장 소개 > ${label}`;
  return label;
}

function officialMenuFallback(f, key) {
  return `홈페이지 ${officialMenuLabel(f, key)} 메뉴`;
}

function pageUrl(pathName) {
  if (!SITE_URL) return undefined;
  const clean = pathName.replace(/\\/g, "/").replace(/\/index\.html$/, "/");
  return `${SITE_URL}/${clean}`.replace(/([^:]\/)\/+/g, "$1");
}

function breadcrumbSchema(items) {
  return {
    "@type": "BreadcrumbList",
    "itemListElement": items.map((item, index) => ({
      "@type": "ListItem",
      "position": index + 1,
      "name": item.name,
      ...(item.url ? { "item": pageUrl(item.url) } : {})
    }))
  };
}

function graphSchema(items) {
  return { "@context": "https://schema.org", "@graph": items };
}

function renderFeeSection(f) {
  const fee = feeTables[f.slug];
  if (fee) {
    const hasNoteColumn = fee.rows.some((row) => row.note);
    const typeHeader = fee.typeHeader || "구분";
    const greenHeader = fee.greenHeader || "그린피";
    const cartHeader = fee.cartHeader || "카트료";
    const totalHeader = "합계";
    const rows = fee.rows.map((row) => `<tr>
      <td>${row.group}</td>
      <td>${row.type}</td>
      <td>${row.day}</td>
      <td>${feeWithUnit(row.greenFee)}</td>
      <td>${feeWithUnit(row.cartFee)}</td>
      <td>${feeWithUnit(row.total)}</td>
      ${hasNoteColumn ? `<td>${row.note || ""}</td>` : ""}
    </tr>`).join("");
    const notes = fee.notes.map((note) => `<li>${note}</li>`).join("");
    return `<section class="fee-section" id="fees" aria-label="${f.name} 입장요금">
      <div class="section-mini-head">
        <p class="eyebrow">입장요금</p>
        <h2>${fee.title}</h2>
        <p>${fee.caption}</p>
      </div>
      <div class="table-wrap fee-table"><table class="fee-table-grid${hasNoteColumn ? " has-note" : ""}">
        <caption class="sr-only">${f.name} 시설 입장요금</caption>
        <thead><tr><th scope="col">회원 구분</th><th scope="col">${typeHeader}</th><th scope="col">요일</th><th scope="col">${greenHeader}</th><th scope="col">${cartHeader}</th><th scope="col">${totalHeader}</th>${hasNoteColumn ? '<th scope="col">비고</th>' : ""}</tr></thead>
        <tbody>${rows}</tbody>
      </table></div>
      <ul class="note-list">${notes}</ul>
    </section>`;
  }
  return `<section class="fee-section" id="fees" aria-label="${f.name} 입장요금 확인">
    <div class="section-mini-head">
      <p class="eyebrow">입장요금</p>
      <h2>입장요금 확인 방법</h2>
      <p>${f.name} 요금은 ${officialMenuPath(f, "fee")}에서 시설 탭을 선택해 볼 수 있습니다. 화면에서는 보통 이용자 구분, 평일·휴일, 그린피, 카트료, 할인 증빙 여부를 함께 봐야 실제 결제 예상액에 가까워집니다.</p>
    </div>
    <div class="fee-check-grid">
      <div><strong>회원 구분</strong><span>현역·예비역·일반회원 등 본인 기준을 먼저 확인</span></div>
      <div><strong>요일 구분</strong><span>평일과 휴일 요금이 다를 수 있으므로 희망일 기준으로 확인</span></div>
      <div><strong>카트료</strong><span>그린피와 별도로 표시되는 경우가 있어 합계 금액을 확인</span></div>
      <div><strong>할인 증빙</strong><span>지역주민 할인 등은 증빙서류와 중복할인 제한 여부를 확인</span></div>
    </div>
  </section>`;
}

function head({ title, description, pathName, depth = 0, schema, robots = "index, follow", canonicalPath }) {
  const canonical = SITE_URL ? pageUrl(canonicalPath || pathName) : "";
  const socialImage = SITE_URL ? `${SITE_URL}/images/og-cover.png` : "";
  const effectiveRobots = IS_INDEXABLE ? robots : "noindex, nofollow";
  const jsonLd = schema || {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "name": SITE_NAME,
    "inLanguage": "ko-KR",
    "description": description,
    ...(SITE_URL ? { "url": SITE_URL } : {})
  };
  return `<!doctype html>
<html lang="ko">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>${escapeHtml(title)}</title>
  <meta name="description" content="${escapeHtml(description)}">
  <meta name="theme-color" content="#172319">
  ${canonical ? `<link rel="canonical" href="${canonical}">` : ""}
  <meta property="og:type" content="website">
  <meta property="og:locale" content="ko_KR">
  <meta property="og:title" content="${escapeHtml(title)}">
  <meta property="og:description" content="${escapeHtml(description)}">
  <meta property="og:site_name" content="${SITE_NAME}">
  ${canonical ? `<meta property="og:url" content="${canonical}">` : ""}
  ${socialImage ? `<meta property="og:image" content="${socialImage}">
  <meta property="og:image:width" content="1200">
  <meta property="og:image:height" content="630">
  <meta property="og:image:alt" content="육군체력단련장 안내 - 전국 12개 시설 정보">` : ""}
  <meta name="twitter:card" content="summary_large_image">
  <meta name="robots" content="${effectiveRobots}">
  <link rel="icon" href="${rel(depth, "favicon.svg")}?v=${ASSET_VERSION}" type="image/svg+xml">
  <link rel="shortcut icon" href="${rel(depth, "favicon.svg")}?v=${ASSET_VERSION}" type="image/svg+xml">
  <link rel="stylesheet" href="${rel(depth, "css/style.css")}?v=${ASSET_VERSION}">
  <script type="application/ld+json">${JSON.stringify(jsonLd)}</script>
</head>
<body>`;
}

function header(active, depth = 0) {
  const links = nav.map(([href, label]) => {
    const isActive = active === href;
    return `<a href="${rel(depth, href)}"${isActive ? ' class="active" aria-current="page"' : ""}>${label}</a>`;
  }).join("");
  return `
<a class="skip-link" href="#main-content">본문 바로가기</a>
<header class="site-header">
  <div class="wrap header-inner">
    <a class="brand" href="${rel(depth + 1, "index.html")}" aria-label="${SITE_NAME}">
      <span class="brand-mark" aria-hidden="true"><img src="${rel(depth, "images/site-mark.svg")}?v=${ASSET_VERSION}" alt="" width="42" height="42"></span>
      <span><strong>육군체력단련장 안내</strong></span>
    </a>
    <button class="menu-button" type="button" aria-label="메뉴 열기" aria-expanded="false" aria-controls="main-navigation"><span></span><span></span><span></span></button>
    <nav class="main-nav" id="main-navigation" aria-label="주요 메뉴">${links}</nav>
  </div>
</header>`;
}

function footer(depth = 0) {
  return `
<footer class="site-footer">
  <div class="wrap footer-grid">
    <section>
      <h2>육군체력단련장 안내</h2>
      <p>전국 육군 체력단련장 골프장의 예약실, 주소, 코스 규모, 이용 전 준비 사항을 시설별로 정리합니다. 예약과 결제는 각 시설의 운영 절차에 따릅니다.</p>
    </section>
    <section>
      <h2>바로가기</h2>
      <ul>
        <li><a href="${rel(depth, "facilities.html")}">전체 시설 안내</a></li>
        <li><a href="${rel(depth, "guide.html")}">예약 안내</a></li>
        <li><a href="${rel(depth, "rules.html")}">이용 규정</a></li>
        <li><a href="${rel(depth, "faq.html")}">FAQ</a></li>
      </ul>
    </section>
    <section>
      <h2>사이트</h2>
      <ul>
        <li><a href="${rel(depth, "about.html")}">사이트 소개</a></li>
        <li><a href="${rel(depth, "contact.html")}">문의·정보 정정</a></li>
        <li><a href="${rel(depth, "legal/privacy.html")}">개인정보처리방침</a></li>
        <li><a href="${rel(depth, "legal/terms.html")}">이용약관</a></li>
        <li><a href="${rel(depth, "legal/disclaimer.html")}">정보 이용 안내</a></li>
      </ul>
    </section>
  </div>
  <div class="wrap copyright"><span>본 사이트는 육군 복지시설 공식 홈페이지가 아닌 민간 정보 안내 사이트이며, 예약·결제 기능을 제공하지 않습니다.</span><span>© ${new Date().getFullYear()} ${SITE_NAME}</span></div>
</footer>
<script src="${rel(depth, "js/main.js")}?v=${ASSET_VERSION}" defer></script>
</body>
</html>`;
}

function feeBrief(f) {
  const fee = feeTables[f.slug];
  if (!fee) return officialMenuPath(f, "fee");
  const weekday = fee.rows.find((row) => row.day.includes("평")) || fee.rows[0];
  const holiday = fee.rows.find((row) => row !== weekday && row.group === weekday.group && row.type === weekday.type && !row.day.includes("평"))
    || fee.rows.find((row) => row !== weekday && !row.day.includes("평"));
  const typePrefix = weekday.type && weekday.type !== "기본" && !weekday.type.includes("/") ? `${weekday.type} ` : "";
  return `${typePrefix}평일 ${weekday.total}${holiday ? ` / ${holiday.day} ${holiday.total}` : ""}`;
}

function page({ file, title, description, active, depth = 0, body, schema, robots, canonicalPath }) {
  const accessibleBody = body.replace("<main>", '<main id="main-content">');
  write(file, head({ title, description, pathName: file.replace(/\\/g, "/"), depth, schema, robots, canonicalPath }) + header(active, depth) + accessibleBody + footer(depth));
}

function buildIndex() {
  const title = "육군체력단련장 안내 | 전국 시설·요금·예약 정보";
  const description = "전국 12개 육군체력단련장의 위치, 코스, 입장요금과 예약 정보를 시설별로 비교합니다.";
  const quickRows = facilities.map((f) => {
    const official = officialInfo[f.slug] || {};
    const weatherUrl = weatherHref(official);
    return `<article class="home-facility-row" data-area="${f.area}" data-text="${escapeHtml(searchText(f, official))}">
      <a class="home-facility-name" href="facilities/${f.slug}.html">${f.name}</a>
      <span class="home-facility-region">${f.region}</span>
      <span class="home-facility-course">${f.holes}홀</span>
      <div class="home-facility-actions">
        <a href="facilities/${f.slug}.html">시설 정보</a>
      </div>
      <a class="home-weather-link" href="${weatherUrl}" target="_blank" rel="noopener" aria-label="${f.name} 소재지 날씨 보기"><img src="images/weather.svg" alt="" width="24" height="24"></a>
    </article>`;
  }).join("");
  const body = `
<main>
  <section class="hero">
    <div class="wrap hero-grid">
      <div class="hero-copy">
        <p class="eyebrow">전국 12개 시설</p>
        <h1>육군체력단련장 안내</h1>
        <p class="lead">전국 12개 시설의 위치와 코스, 입장요금을 비교하고 육군체력단련장 예약 절차를 확인하세요.</p>
        <div class="hero-actions">
          <a class="button primary" href="#facility-directory">시설 찾기</a>
          <a class="button secondary" href="guide.html">예약 안내 보기</a>
        </div>
      </div>
    </div>
  </section>

  <section class="section quick-section" id="facility-directory">
    <div class="wrap">
      <div class="section-head compact">
        <p class="eyebrow">시설 찾기</p>
        <h2>시설명이나 지역을 입력하세요</h2>
        <p>관심 있는 시설을 선택하면 입장요금, 주소, 코스와 편의시설을 한 페이지에서 확인할 수 있습니다.</p>
      </div>
      <div class="directory-shell">
        <div class="search-panel directory-search" aria-label="시설 검색">
          <label for="facilitySearch">시설 검색</label>
          <input id="facilitySearch" type="search" placeholder="예: 선봉대, 이천, 충청권, 18홀">
          <div class="filter-chips" aria-label="권역 필터">
            <button type="button" class="active" data-filter="all" aria-pressed="true">전체</button>
            <button type="button" data-filter="수도권" aria-pressed="false">수도권</button>
            <button type="button" data-filter="충청권" aria-pressed="false">충청권</button>
            <button type="button" data-filter="영남권" aria-pressed="false">영남권</button>
            <button type="button" data-filter="호남권" aria-pressed="false">호남권</button>
          </div>
        </div>
        <div class="home-directory-list">
          <div class="home-directory-head" aria-hidden="true"><span>시설</span><span>지역</span><span>코스</span><span>시설 안내</span><span>날씨</span></div>
          ${quickRows}
        </div>
        <p class="empty-state" aria-live="polite" hidden>검색 조건에 맞는 시설이 없습니다. 시설명이나 지역명을 조금 넓게 입력해 보세요.</p>
      </div>
    </div>
  </section>

  <section class="section home-topics">
    <div class="wrap">
      <div class="section-head compact">
        <p class="eyebrow">이용 정보</p>
        <h2>예약 전에 필요한 내용을 먼저 확인하세요</h2>
        <p>시설을 고른 뒤 요금과 예약 절차, 취소 기준을 차례로 확인하면 예약 단계에서 다시 찾을 일이 줄어듭니다.</p>
      </div>
      <div class="home-topic-grid">
        <a href="facilities.html"><span>시설 비교</span><strong>지역·코스·입장요금</strong><small>12개 시설의 차이를 표와 상세 정보로 비교</small></a>
        <a href="guide.html"><span>육군체력단련장 예약</span><strong>접수부터 확정까지</strong><small>접수 기간, 편성일과 방문 준비 순서 확인</small></a>
        <a href="rules.html"><span>이용 기준</span><strong>취소·도착·복장</strong><small>예약 전에 알아둘 제한과 당일 이용 기준</small></a>
      </div>
    </div>
  </section>

  <section class="section home-practical">
    <div class="wrap">
      <div class="section-head compact">
        <p class="eyebrow">예약 전 판단 순서</p>
        <h2>요금표를 보기 전에 본인 구분부터 정하세요</h2>
        <p>같은 시설과 날짜라도 회원 구분, 평일·휴일, 할인 증빙과 경기 방식에 따라 금액이 달라집니다. 아래 세 가지를 먼저 정하면 시설 상세 페이지의 표를 훨씬 빠르게 읽을 수 있습니다.</p>
      </div>
      <div class="practical-grid">
        <article><span>01</span><h3>회원 구분</h3><p>공식 안내는 정회원·정회원대우·준회원·준회원대우·비회원으로 구분합니다. 자격을 확신하기 어렵다면 비회원 요금만 보고 결정하지 말고 회원등록 기준을 먼저 확인하세요.</p><a href="guide.html#member-types">회원 구분 보기</a></article>
        <article><span>02</span><h3>실제 결제 예상액</h3><p>그린피만 비교하면 금액이 어긋날 수 있습니다. 카트료, 보수료, 지역주민 할인과 증빙 조건까지 포함된 합계 열을 기준으로 비교하세요.</p><a href="facilities.html">시설별 대표 요금</a></article>
        <article><span>03</span><h3>신청과 확정 구분</h3><p>예약을 접수했다고 바로 확정되는 것은 아닙니다. 신청 내역을 확인한 뒤 편성일이 지나면 예약확정 화면에서 경기 시간까지 다시 확인해야 합니다.</p><a href="guide.html#result-check">결과 확인 순서</a></article>
      </div>
      <div class="practical-example"><strong>예시</strong><p>일반 이용자가 휴일 18홀 시설을 찾는다면 지역과 이동 시간을 먼저 정하고, 시설 상세 페이지에서 일반·휴일 합계를 비교합니다. 후보를 고른 뒤에는 경기일 기준 접수 기간을 계산하고, 신청 후 확정 화면에서 최종 경기 시간을 확인하는 순서가 가장 단순합니다.</p></div>
    </div>
  </section>

  <section class="section home-guide-cta"><div class="wrap home-guide-inner"><div><p class="eyebrow">처음 예약한다면</p><h2>접수 기간과 확정일을 먼저 확인하세요</h2><p>예약 순서와 확인일, 취소 마감은 예약 안내에 짧게 정리했습니다.</p></div><div><a class="button primary" href="guide.html">예약 안내 보기</a><a class="button secondary" href="rules.html">취소 기준 보기</a></div></div></section>
</main>`;
  page({
    file: "index.html",
    title,
    description,
    active: "index.html",
    body,
    schema: graphSchema([
      {
        "@type": "WebSite",
        "name": SITE_NAME,
        "description": description,
        "inLanguage": "ko-KR",
        ...(SITE_URL ? { "url": SITE_URL } : {})
      },
      {
        "@type": "WebPage",
        "name": title,
        "description": description,
        "url": pageUrl("index.html"),
        "inLanguage": "ko-KR"
      },
      {
        "@type": "ItemList",
        "name": "육군체력단련장 시설 목록",
        "itemListElement": facilities.map((f, index) => ({
          "@type": "ListItem",
          "position": index + 1,
          "url": pageUrl(`facilities/${f.slug}.html`),
          "name": `${f.name} 체력단련장`
        }))
      }
    ])
  });
}

function buildFacilities() {
  const title = "육군체력단련장 시설 안내 | 전국 12개 골프장·입장요금";
  const description = "전국 12개 육군체력단련장을 지역, 코스 규모와 일반 이용자 입장요금 기준으로 비교합니다.";
  const grouped = ["수도권", "충청권", "영남권", "호남권"].map((area) => {
    const areaFacilities = facilities.filter((f) => f.area === area);
    const links = areaFacilities.map((f) => `<a class="region-link-item" href="facilities/${f.slug}.html"><span><strong>${f.name}</strong><small>${f.region} · ${f.holes}홀</small></span><em>요금·주소 보기</em></a>`).join("");
    return `<section class="region-block"><h2>${area}<span>${areaFacilities.length}곳</span></h2><div class="region-link-grid">${links}</div></section>`;
  }).join("");
  const rows = facilities.map((f, i) => `<tr><td>${i + 1}</td><td><a href="facilities/${f.slug}.html">${f.name}</a></td><td>${f.region}</td><td>${f.area}</td><td>${f.holes}홀</td><td>${feeBrief(f)}</td></tr>`).join("");
  const body = `
<main>
  <section class="page-hero"><div class="wrap"><p class="eyebrow">시설 안내</p><h1>육군체력단련장 전국 12개 시설</h1><p>지역과 코스 규모, 일반 이용자 대표 요금을 기준으로 후보를 좁혀보세요.</p><div class="hero-actions"><a class="button primary" href="#compare">시설 비교표 보기</a><a class="button secondary" href="guide.html">예약 안내 보기</a></div></div></section>
  <section class="section facility-compare-section" id="compare"><div class="wrap">
    <div class="facility-stat-strip" aria-label="시설 현황">
      <div><span>전체 시설</span><strong>12곳</strong></div>
      <div><span>권역</span><strong>4개</strong></div>
      <div><span>18홀</span><strong>2곳</strong></div>
      <div><span>9홀</span><strong>10곳</strong></div>
    </div>
    <div class="facility-table-intro">
      <div><p class="eyebrow">한눈에 비교</p><h2>지역과 요금부터 확인하세요</h2></div>
      <p>대표 요금은 일반 이용자의 평일·휴일 합계입니다. 할인 대상, 카트료 구성과 별도 비용은 시설명을 눌러 상세 요금표에서 확인하세요.</p>
    </div>
    <div class="table-wrap facility-summary-wrap"><table class="facility-summary-table"><caption class="sr-only">전국 육군체력단련장 시설 비교</caption><colgroup><col class="col-no"><col class="col-name"><col class="col-region"><col class="col-area"><col class="col-holes"><col class="col-fee"></colgroup><thead><tr><th scope="col">#</th><th scope="col">시설명</th><th scope="col">지역</th><th scope="col">권역</th><th scope="col">코스</th><th scope="col">대표 요금</th></tr></thead><tbody>${rows}</tbody></table></div>
  </div></section>
  <section class="section muted region-directory"><div class="wrap"><div class="section-head"><p class="eyebrow">권역별 바로가기</p><h2>시설을 선택하면 전체 요금과 위치를 볼 수 있습니다</h2><p>비교표에서 후보를 정한 뒤 아래 권역에서 시설 상세 페이지로 이동하세요.</p></div><div class="region-directory-grid">${grouped}</div></div></section>
</main>`;
  page({
    file: "facilities.html",
    title,
    description,
    active: "facilities.html",
    body,
    schema: graphSchema([
      {
        "@type": "WebPage",
        "name": title,
        "description": description,
        "url": pageUrl("facilities.html"),
        "inLanguage": "ko-KR"
      },
      breadcrumbSchema([
        { name: "홈", url: "index.html" },
        { name: "시설 안내", url: "facilities.html" }
      ]),
      {
        "@type": "ItemList",
        "name": "육군체력단련장 지역별 시설",
        "itemListElement": facilities.map((f, index) => ({
          "@type": "ListItem",
          "position": index + 1,
          "url": pageUrl(`facilities/${f.slug}.html`),
          "name": `${f.name} 체력단련장`
        }))
      }
    ])
  });
}

function buildGuide() {
  const title = "육군체력단련장 예약 | 기간·확정·취소 안내";
  const description = "육군체력단련장 예약 기간, 편성·확정일, 취소 마감과 시설별 전화문의 방법을 순서대로 안내합니다.";
  const body = `
<main>
  <section class="page-hero compact-hero guide-hero"><div class="wrap"><p class="eyebrow">예약 안내</p><h1>육군체력단련장 예약 안내</h1><p>시설과 희망일을 정하고 예약한 뒤 결과를 확인하는 순서입니다.</p><div class="hero-actions"><a class="button primary" href="#process">예약 순서 보기</a><a class="button secondary" href="facilities.html">시설 먼저 찾기</a></div></div></section>

  <section class="section" id="process"><div class="wrap guide-shell">
    <div class="guide-section-heading"><p class="eyebrow">예약 순서</p><h2>시설 선택부터 확정까지 세 단계입니다</h2><p>시설을 고르고 접수한 뒤 예약 결과를 확인하면 됩니다.</p></div>
    <div class="booking-steps">
      <article><span>01</span><h3>시설 고르기</h3><p>지역, 9홀·18홀, 평일·휴일 요금을 비교합니다.</p><a href="facilities.html">시설 비교</a></article>
      <article><span>02</span><h3>예약 접수</h3><p>희망일과 시간대를 정해 공식 예약 화면에서 접수합니다.</p><strong>D-15 ~ D-9</strong></article>
      <article><span>03</span><h3>확정 확인</h3><p>예약 결과와 경기 시간을 확인한 뒤 동반자에게 공유합니다.</p><strong>D-7부터 확인</strong></article>
    </div>
    <div class="phone-purpose"><strong>전화문의가 필요한 경우</strong><span>이용 자격, 동반자 조건, 당일 운영처럼 시설별 확인이 필요한 내용만 문의하세요.</span><a href="facilities.html">시설별 연락처</a></div>
  </div></section>

  <section class="section muted" id="member-types"><div class="wrap guide-shell">
    <div class="guide-section-heading"><p class="eyebrow">회원 구분</p><h2>요금과 준비 서류는 회원 구분부터 달라집니다</h2><p>공식 회원등록 안내의 다섯 구분을 간단히 풀어 썼습니다. 아래 설명은 예약 준비를 위한 요약이며 최종 자격 판정은 공식 회원등록 기준과 제출 서류를 따릅니다.</p></div>
    <div class="member-type-grid">
      <article><strong>정회원</strong><p>현직 장교·준사관·부사관·군무원·병과 정회원 배우자 등이 포함되는 구분입니다.</p></article>
      <article><strong>정회원대우</strong><p>일부 국가유공자와 장기 근무 후 퇴직한 국방부 공무원 등 공식 기준에 해당하는 구분입니다.</p></article>
      <article><strong>준회원</strong><p>10년 이상 19년 6개월 미만 복무 후 전역한 군인·퇴직 군무원과 배우자 등이 포함됩니다.</p></article>
      <article><strong>준회원대우</strong><p>병역명문가와 국방부 장기근무 퇴직 공무원 등 별도 기준에 해당하는 구분입니다.</p></article>
      <article><strong>비회원</strong><p>정회원·정회원대우·준회원·준회원대우에 해당하지 않는 일반 이용자 구분입니다.</p></article>
    </div>
    <div class="member-check-line"><p><strong>헷갈릴 때</strong> 먼저 본인 신분에 가까운 구분을 찾고, 배우자 등록이나 대우회원 여부는 필요한 증빙서류까지 함께 확인하세요. 할인 대상이라도 서류를 지참하지 않으면 현장에서 적용되지 않을 수 있습니다.</p><a class="text-link" href="${OFFICIAL_MEMBER_URL}" target="_blank" rel="noopener">공식 회원등록 기준</a></div>
  </div></section>

  <section class="section" id="schedule"><div class="wrap guide-shell">
    <div class="guide-section-heading"><p class="eyebrow">날짜 기준</p><h2>이 네 날짜만 기억하세요</h2><p>경기일을 기준으로 계산하며, 예약 화면에 표시되는 일정이 우선합니다.</p></div>
    <div class="reservation-calendar">
      <article><span>D-15 ~ D-9</span><strong>접수</strong><p>9일 전 24:00까지</p></article>
      <article><span>D-8</span><strong>편성</strong><p>시설별 예약 편성</p></article>
      <article><span>D-7</span><strong>확인</strong><p>예약 결과 조회</p></article>
      <article class="deadline"><span>D-3 13:00</span><strong>취소 마감</strong><p>이후 제한 가능</p></article>
    </div>
    <div class="date-example"><strong>경기일이 20일이라면</strong><p>5일부터 11일 24:00까지 신청하고, 12일 편성 후 13일부터 확정 결과를 확인하는 흐름입니다. 정상 취소 마감은 17일 13:00입니다. 월이 바뀌는 일정은 날짜 계산보다 예약 화면의 표시를 우선하세요.</p></div>
  </div></section>

  <section class="section muted" id="result-check"><div class="wrap guide-shell">
    <div class="guide-section-heading"><p class="eyebrow">결과 확인</p><h2>신청 내역과 확정 결과는 서로 다른 화면입니다</h2><p>접수가 끝났다는 표시만 보고 방문 일정을 확정하지 마세요. 공식 홈페이지는 신청 상태와 최종 편성 결과를 구분해 제공합니다.</p></div>
    <div class="result-check-grid">
      <article><span>1</span><div><h3>예약신청확인</h3><p>희망 시설·날짜·경기 구분이 제대로 접수됐는지 확인합니다. 잘못 신청했다면 허용 기간 안에 취소하거나 다시 접수해야 합니다.</p></div><a href="${OFFICIAL_REQUEST_URL}" target="_blank" rel="noopener">신청 내역 확인</a></article>
      <article><span>2</span><div><h3>예약확정확인</h3><p>편성이 끝난 뒤 확정 여부와 실제 경기 시간을 확인합니다. 동반자에게 전달할 정보는 이 화면의 시설명과 경기 시간을 기준으로 합니다.</p></div><a href="${OFFICIAL_CONFIRM_URL}" target="_blank" rel="noopener">확정 결과 확인</a></article>
    </div>
    <p class="result-note">신청했지만 확정되지 않을 수 있고, 확정 시간은 처음 희망한 시간대와 다를 수 있습니다. 출발 계획은 확정 결과를 본 뒤 세우는 편이 안전합니다.</p>
  </div></section>

  <section class="section" id="ready"><div class="wrap guide-shell">
    <div class="guide-section-heading"><p class="eyebrow">준비 사항</p><h2>예약 전과 출발 전에 한 번씩 확인하세요</h2></div>
    <div class="guide-essentials">
      <section><h3>예약 전에</h3><ul><li>정확한 시설명</li><li>희망일과 대체 날짜</li><li>오전·오후 가능 시간대</li><li>이용 인원과 자격 조건</li></ul><a class="text-link" href="facilities.html">시설별 요금 확인</a></section>
      <section><h3>출발 전에</h3><ul><li>상세 주소와 소재지 날씨</li><li>신분증과 할인 증빙</li><li>경기 30분 전 도착</li><li>예약 시설명과 경기 시간</li></ul><a class="text-link" href="rules.html#match-day">당일 이용 기준</a></section>
    </div>
    <div class="guide-cancel-line"><div><strong>정상 취소 마감</strong><span>경기 3일 전 13:00까지</span></div><p>이후 취소나 무단불참은 예약·운동 제한으로 이어질 수 있습니다.</p><a href="rules.html#cancellation">취소 제한 확인</a></div>
    <div class="source-note compact-source"><span>자료 기준 ${OFFICIAL_CHECKED_AT}</span><p>예약 기간과 회원 구분은 육군체력단련장 홈페이지의 예약 및 회원등록 공개 안내를 기준으로 정리했습니다.</p><a href="${OFFICIAL_URL}" target="_blank" rel="noopener">공식 안내</a></div>
  </div></section>

  <section class="section reservation-final-section" id="reservation"><div class="wrap workflow-shell reservation-final">
    <div><p class="eyebrow">예약하기</p><h2>시설과 날짜가 정해졌나요?</h2><p>공식 예약 화면에서 접수하거나, 시설별 확인이 필요하면 상세 페이지의 연락처를 이용하세요.</p></div>
    <div class="reservation-final-actions"><a class="button primary" href="${OFFICIAL_RESERVE_URL}" target="_blank" rel="noopener">공식 예약 화면</a><a class="button secondary" href="facilities.html">시설별 연락처</a></div>
  </div></section>
</main>`;
  page({
    file: "guide.html",
    title,
    description,
    active: "guide.html",
    body,
    schema: graphSchema([
      {
        "@type": "WebPage",
        "name": title,
        "description": description,
        "url": pageUrl("guide.html"),
        "inLanguage": "ko-KR"
      },
      breadcrumbSchema([
        { name: "홈", url: "index.html" },
        { name: "예약 안내", url: "guide.html" }
      ])
    ])
  });
}

function buildRules() {
  const title = "육군체력단련장 이용 규정 | 취소·노쇼·복장·경기 운영";
  const description = "육군체력단련장 예약 취소 마감, 노쇼와 이용 제한, 경기 당일 도착 시간·복장·팀 구성 기준을 빠르게 확인할 수 있습니다.";
  const body = `
<main>
  <section class="page-hero compact-hero"><div class="wrap"><p class="eyebrow">이용 규정</p><h1>취소 시점과 당일 이용 기준</h1><p>마감 시각, 이용 제한, 도착·복장 기준을 빠르게 확인하세요.</p><div class="hero-actions"><a class="button primary" href="#cancellation">취소 기준 확인</a><a class="button secondary" href="guide.html">예약 순서 보기</a></div></div></section>
  <nav class="page-jump" aria-label="이용 규정 바로가기"><div class="wrap"><a href="#cancellation">취소 기준</a><a href="#match-day">경기 당일</a><a href="#violations">이용 제한</a><a href="#local-rules">코스 기준</a></div></nav>
  <section class="section" id="cancellation"><div class="wrap rules-shell">
      <div class="section-head"><p class="eyebrow">취소 기준</p><h2>시간이 지나면 제한이 달라집니다</h2></div>
      <div class="rules-timeline">
        <article class="status-ok"><span>정상 취소</span><strong>7일 전 ~ 3일 전 13:00</strong><p>예약확인 화면에서 취소</p></article>
        <article class="status-warn"><span>1개월 제한 가능</span><strong>3일 전 13:01 ~ 1일 전 14:00</strong><p>예약·운동 제한 대상</p></article>
        <article class="status-danger"><span>3개월 제한 가능</span><strong>1일 전 14:01 ~ 경기 당일</strong><p>취소·무단불참 포함</p></article>
      </div>
      <div class="rule-action"><p><strong>취소가 필요하면</strong> 예약확인 화면에서 먼저 처리하고, 화면 처리가 되지 않을 때 해당 시설 예약실로 문의하세요.</p><a class="button primary" href="${OFFICIAL_CONFIRM_URL}" target="_blank" rel="noopener">예약확인·취소</a></div>
  </div></section>

  <section class="section muted" id="match-day"><div class="wrap rules-shell">
      <div class="section-head"><p class="eyebrow">경기 당일</p><h2>현장에서 바로 보는 네 가지</h2></div>
      <dl class="operation-list">
        <div><dt>등록</dt><dd><strong>경기 30분 전 도착 권장</strong><span>출입 확인과 프론트 등록 시간을 고려합니다.</span></dd></div>
        <div><dt>출발점</dt><dd><strong>티오프 10분 전까지</strong><span>늦으면 경기 참여가 제한될 수 있습니다.</span></dd></div>
        <div><dt>팀 구성</dt><dd><strong>4인 1팀 기준</strong><span>인원 변경은 시설 예약실에 미리 문의합니다.</span></dd></div>
        <div><dt>복장</dt><dd><strong>모자·긴 바지·깃 있는 상의·골프화</strong><span>단정한 골프 복장을 준비합니다.</span></dd></div>
      </dl>
  </div></section>

  <section class="section" id="violations"><div class="wrap rules-shell">
      <div class="section-head"><p class="eyebrow">이용 제한</p><h2>예약자와 실제 이용자가 같아야 합니다</h2><p>세부 기간은 시설별 규정이 우선합니다.</p></div>
      <div class="table-wrap rules-table-wrap"><table class="rules-table"><caption class="sr-only">예약과 입장 위반 사례별 이용 제한</caption><thead><tr><th scope="col">구분</th><th scope="col">주요 사례</th><th scope="col">안내되는 제한</th></tr></thead><tbody>
        <tr><td>부정 예약</td><td>예약·확정 과정에서 허위 자료나 부정한 방법을 사용한 경우</td><td>시설별로 2년 또는 영구 제한</td></tr>
        <tr><td>신분 위장</td><td>다른 사람의 신분이나 자격으로 입장한 경우</td><td>시설별로 2년 또는 영구 제한</td></tr>
        <tr><td>예약 양도</td><td>예약을 타인에게 넘기거나 예약자 없이 입장한 경우</td><td>1개월 또는 3개월 제한</td></tr>
        <tr><td>질서 위반</td><td>금연구역 흡연, 경기 진행 방해 등</td><td>1개월 제한 대상</td></tr>
      </tbody></table></div>
  </div></section>

  <section class="section muted" id="local-rules"><div class="wrap rules-shell local-rule-layout"><div><p class="eyebrow">코스 기준</p><h2>현장 표식과 안내가 우선입니다</h2></div><ul><li>OB·해저드와 구제 구역은 말뚝·선의 색을 확인합니다.</li><li>특별 티를 사용하는 홀은 시작 전 로컬룰을 확인합니다.</li><li>우천·정비·부대 사정에 따른 운영 변경은 시설 안내를 따릅니다.</li></ul><a class="text-link" href="${OFFICIAL_URL}" target="_blank" rel="noopener">공식 홈페이지 공지 보기</a></div></section>
</main>`;
  page({
    file: "rules.html",
    title,
    description,
    active: "rules.html",
    body,
    schema: graphSchema([
      {
        "@type": "WebPage",
        "name": title,
        "description": description,
        "url": pageUrl("rules.html"),
        "inLanguage": "ko-KR"
      },
      breadcrumbSchema([
        { name: "홈", url: "index.html" },
        { name: "이용 규정", url: "rules.html" }
      ])
    ])
  });
}

function buildBeginner() {
  const title = "육군체력단련장 예약 안내로 이동";
  const description = "처음 이용, 예약 안내, 방문 준비 내용을 예약 안내 페이지로 통합했습니다.";
  const body = `
<main>
  <section class="page-hero"><div class="wrap"><p class="eyebrow">예약 안내</p><h1>예약 안내 페이지로 통합했습니다</h1><p>처음 이용, 예약 방법, 요금표 확인, 방문 준비 내용은 예약 안내에서 함께 확인할 수 있습니다.</p></div></section>
  <section class="section"><div class="wrap article">
    <p>기존 처음 이용 안내는 예약 안내와 내용이 겹쳐 하나의 페이지로 정리했습니다.</p>
    <p><a class="button primary" href="guide.html">예약 안내 보기</a></p>
    <script>window.location.replace("guide.html");</script>
  </div></section>
</main>`;
  page({
    file: "beginner-guide.html",
    title,
    description,
    active: "guide.html",
    body,
    robots: "noindex, follow",
    canonicalPath: "guide.html",
    schema: graphSchema([
      {
        "@type": "WebPage",
        "name": title,
        "description": description,
        "url": pageUrl("guide.html"),
        "inLanguage": "ko-KR"
      },
      breadcrumbSchema([
        { name: "홈", url: "index.html" },
        { name: "예약 안내", url: "guide.html" }
      ])
    ])
  });
}

function buildFaq() {
  const faqs = [
    ["육군체력단련장 예약은 어떻게 하나요?", `시설과 날짜를 정한 뒤 공식 예약 화면에서 접수하고 결과를 확인합니다. 접수 기간과 확정일, 취소 마감은 <a href="guide.html">예약 안내</a>에서 순서대로 볼 수 있습니다.`],
    ["전화예약 번호는 어디에서 확인하나요?", `전화문의 번호는 <a href="facilities.html">시설 안내</a>에서 원하는 체력단련장을 선택하면 확인할 수 있습니다. 각 시설 페이지의 요금과 이용 정보를 모두 본 뒤 나오는 예약하기 영역에 해당 예약실 번호가 있습니다.`],
    ["평일 예약 접수 기간은 어떻게 되나요?", "평일 경기 예약은 대체로 경기일 15일 전부터 9일 전 24:00까지 인터넷으로 접수합니다. 예약 편성은 경기일 8일 전 기준으로 안내되며, 확정 조회와 취소 가능 기간은 예약 화면에서 따로 확인하는 흐름입니다."],
    ["예약 취소가 늦으면 어떤 제한이 있나요?", `경기일 3일 전 13시 이후 취소는 1개월, 경기일 1일 전 14시 이후 취소나 무단불참은 3개월 이용 제한 대상이 될 수 있습니다. 시점별 기준은 <a href="rules.html#cancellation">취소·이용 규정</a>에 표로 정리했습니다.`],
    ["요금은 어떤 기준으로 정리했나요?", `시설별 입장요금은 육군체력단련장 예약/경기/요금 > 입장요금 화면의 공개 금액을 기준으로 정리했습니다. 전체 비교는 <a href="facilities.html">시설 안내 표</a>에서 보고, 자세한 금액은 각 시설 상세 페이지의 입장요금 영역에서 확인하세요.`],
    ["예약신청확인과 예약확정확인은 무엇이 다른가요?", `예약신청확인은 희망 시설과 날짜가 접수됐는지 보는 단계이고, 예약확정확인은 편성 후 실제 확정 여부와 경기 시간을 보는 단계입니다. 두 화면을 확인하는 순서는 <a href="guide.html#result-check">예약 결과 확인</a>에 정리했습니다.`],
    ["정회원·준회원·비회원은 어떻게 구분하나요?", `공식 안내는 정회원, 정회원대우, 준회원, 준회원대우, 비회원으로 구분합니다. 복무·퇴직·배우자 등 세부 조건과 증빙서류가 있으므로 <a href="guide.html#member-types">회원 구분 요약</a>을 먼저 보고 공식 회원등록 기준을 함께 확인하세요.`],
    ["처음 방문할 때 무엇을 챙겨야 하나요?", "신분증, 예약 내용, 골프 복장, 개인 장비를 먼저 챙기세요. 동반자가 있다면 동반자 조건, 출입 확인 방식, 도착 목표 시간도 함께 공유해두는 것이 좋습니다."],
    ["주소와 전화번호는 어디에서 보나요?", `주소는 각 시설 상세 페이지의 위치와 기본 정보에서 확인할 수 있습니다. 예약실 번호는 같은 페이지 아래쪽 예약하기 영역에 배치했습니다.`],
    ["우천이나 코스 정비 때는 어떻게 하나요?", "우천, 폭염, 한파, 코스 정비, 부대 사정에 따라 운영이 조정될 수 있습니다. 예약일이 가까워지면 해당 시설 예약실에 전화로 확인하는 편이 가장 안전합니다."],
    ["이 사이트에서 회원 자격을 확인할 수 있나요?", "회원 자격, 이용 대상, 동반자 가능 여부는 각 시설 운영 기준에 따릅니다. 시설과 희망일을 정한 뒤 예약 단계에서 실제 신청 가능 여부를 확인하세요."]
  ];
  const items = faqs.map(([q, a]) => `<details><summary>${q}</summary><p>${a}</p></details>`).join("");
  const title = "육군체력단련장 FAQ | 예약·요금·방문 준비";
  const description = "육군체력단련장 예약 방법, 입장요금, 전화문의, 준비물과 우천 시 확인 방법을 자주 묻는 질문으로 정리했습니다.";
  const schema = graphSchema([
    {
      "@type": "WebPage",
      "name": title,
      "description": description,
      "url": pageUrl("faq.html"),
      "inLanguage": "ko-KR"
    },
    breadcrumbSchema([
      { name: "홈", url: "index.html" },
        { name: "FAQ", url: "faq.html" }
    ]),
    {
      "@type": "FAQPage",
      "mainEntity": faqs.map(([q, a]) => ({ "@type": "Question", "name": q, "acceptedAnswer": { "@type": "Answer", "text": stripHtml(a) } }))
    }
  ]);
  const body = `
<main>
  <section class="page-hero"><div class="wrap"><p class="eyebrow">자주 묻는 질문</p><h1>예약과 이용 전 준비 사항</h1><p>예약 경로, 전화문의, 요금 기준, 준비물처럼 방문 전에 자주 보는 내용을 정리했습니다.</p><div class="hero-actions"><a class="button primary" href="#faq-list">질문 확인</a><a class="button secondary" href="guide.html">예약 안내 보기</a></div></div></section>
  <section class="section" id="faq-list"><div class="wrap faq-list">
    ${items}
  </div></section>
</main>`;
  page({
    file: "faq.html",
    title,
    description,
    active: "faq.html",
    body,
    schema
  });
}

function buildAbout() {
  const title = "사이트 소개 | 육군체력단련장 안내";
  const description = "육군체력단련장 안내 사이트가 시설 정보와 입장요금, 예약 절차를 정리하는 기준과 운영 범위를 소개합니다.";
  const contactSection = `<h2>운영 문의</h2><p>주소·입장요금·전화번호의 오류나 사이트 운영 문의는 <a class="text-link" href="contact.html">문의·정보 정정</a>에서 보내야 할 내용을 확인하세요. 시설 예약과 이용 자격 문의는 각 시설 예약실에서 받습니다.</p>`;
  const body = `
<main>
  <section class="page-hero"><div class="wrap"><p class="eyebrow">사이트 소개</p><h1>정보를 정리하는 기준</h1><p>전국 육군체력단련장 12곳을 시설별로 비교하고, 예약 전에 필요한 정보를 빠르게 찾을 수 있도록 구성했습니다.</p><div class="hero-actions"><a class="button primary" href="facilities.html">시설 비교</a><a class="button secondary" href="guide.html">예약 안내</a></div></div></section>
  <section class="section"><div class="wrap article about-article">
    <h2>다루는 정보</h2>
    <p>시설별 주소와 내비게이션 검색명, 코스 규모, 입장요금, 예약 화면의 경기 구분과 희망 차수를 정리합니다. 홈에서는 지역과 시설명으로 후보를 찾고, 상세 페이지에서는 요금과 위치, 코스 정보를 먼저 확인한 뒤 예약 수단을 선택할 수 있게 했습니다.</p>
    <h2>자료를 확인하는 방법</h2>
    <p>주소·전화번호·입장요금·예약 절차·이용 규정은 육군체력단련장 홈페이지에 공개된 시설별 안내 화면을 대조해 옮기고, 비교하기 쉬운 형식으로 다시 구성합니다. 현재 시설 자료의 확인 기준일은 ${OFFICIAL_CHECKED_AT}입니다. 방문 동선과 준비 글은 지역, 코스 규모, 시설 위치를 바탕으로 직접 작성하며 확인되지 않은 운영 정보를 사실처럼 덧붙이지 않습니다.</p>
    <h2>공식 서비스와의 구분</h2>
    <p>이 사이트는 육군이나 국군복지단이 운영하는 공식 사이트가 아닙니다. 회원가입, 예약 접수, 결제, 이용 자격 판정을 처리하지 않으며 실제 예약과 변경은 공식 예약 화면 또는 해당 시설 예약실을 이용해야 합니다. 요금과 운영 기준이 바뀐 경우에는 공식 화면과 현장 안내가 우선합니다.</p>
    ${contactSection}
  </div></section>
</main>`;
  page({
    file: "about.html",
    title,
    description,
    active: "",
    body,
    schema: graphSchema([
      { "@type": "AboutPage", "name": title, "description": description, "url": pageUrl("about.html"), "inLanguage": "ko-KR" },
      breadcrumbSchema([{ name: "홈", url: "index.html" }, { name: "사이트 소개", url: "about.html" }])
    ])
  });
}

function buildContact() {
  const title = "문의·정보 정정 | 육군체력단련장 안내";
  const description = "육군체력단련장 안내 사이트의 시설 주소, 입장요금, 전화번호와 예약 정보 정정 및 사이트 운영 문의 방법입니다.";
  const emailAction = CONTACT_EMAIL
    ? `<a class="button primary" href="mailto:${escapeHtml(CONTACT_EMAIL)}?subject=${encodeURIComponent("[육군체력단련장 안내] 정보 정정 또는 운영 문의")}">이메일 보내기</a><p class="contact-email">${escapeHtml(CONTACT_EMAIL)}</p>`
    : `<p class="preview-notice">현재 로컬 미리보기에는 공개 이메일이 표시되지 않습니다. 운영 빌드에는 등록된 문의 이메일이 이 위치에 표시됩니다.</p>`;
  const body = `
<main>
  <section class="page-hero"><div class="wrap"><p class="eyebrow">문의·정보 정정</p><h1>어떤 내용을 문의하려고 하나요?</h1><p>예약과 이용 자격은 시설 예약실이 답변하고, 이 사이트에 적힌 정보의 오류는 사이트 운영자가 확인합니다.</p></div></section>
  <section class="section"><div class="wrap contact-layout">
    <section class="contact-choice">
      <p class="eyebrow">시설에 문의</p>
      <h2>예약·이용 자격·당일 운영</h2>
      <p>예약 가능 여부, 동반자 조건, 출입 절차, 우천 시 운영과 같은 시설 업무는 해당 체력단련장 예약실에 문의하세요.</p>
      <a class="button secondary" href="facilities.html">시설별 연락처 찾기</a>
    </section>
    <section class="contact-choice">
      <p class="eyebrow">사이트에 문의</p>
      <h2>주소·요금·전화번호 오류</h2>
      <p>페이지 주소, 현재 적힌 내용, 바르게 고쳐야 할 내용과 확인할 수 있는 공개 출처를 함께 보내면 빠르게 대조할 수 있습니다.</p>
      ${emailAction}
    </section>
  </div></section>
  <section class="section muted"><div class="wrap contact-checklist">
    <div><p class="eyebrow">보내기 전</p><h2>정정 요청에는 네 가지만 적어주세요</h2></div>
    <ol><li><strong>시설명 또는 페이지 주소</strong><span>어느 페이지인지 알 수 있게 적습니다.</span></li><li><strong>현재 표시된 내용</strong><span>틀렸다고 판단한 문장을 적습니다.</span></li><li><strong>수정할 내용</strong><span>바른 주소·금액·전화번호를 적습니다.</span></li><li><strong>확인 출처</strong><span>공식 공지나 공개 페이지 주소를 함께 보냅니다.</span></li></ol>
    <p class="privacy-reminder">주민등록번호, 군번, 예약번호, 신분증 사진과 같은 개인정보는 보내지 마세요. 이 사이트는 예약 변경이나 회원 자격 처리를 대신하지 않습니다.</p>
  </div></section>
</main>`;
  page({
    file: "contact.html",
    title,
    description,
    active: "",
    body,
    schema: graphSchema([
      { "@type": "ContactPage", "name": title, "description": description, "url": pageUrl("contact.html"), "inLanguage": "ko-KR" },
      breadcrumbSchema([{ name: "홈", url: "index.html" }, { name: "문의·정보 정정", url: "contact.html" }])
    ])
  });
}

function build404() {
  const title = "페이지를 찾을 수 없습니다 | 육군체력단련장 안내";
  const description = "요청한 페이지를 찾을 수 없습니다. 시설 검색, 예약 안내 또는 FAQ에서 필요한 정보를 다시 찾아보세요.";
  const body = `
<main>
  <section class="page-hero error-hero"><div class="wrap"><p class="eyebrow">404</p><h1>페이지를 찾을 수 없습니다</h1><p>주소가 바뀌었거나 삭제된 페이지입니다. 시설명으로 다시 찾거나 예약 안내에서 필요한 내용을 확인하세요.</p><div class="hero-actions"><a class="button primary" href="index.html#facility-directory">시설 검색</a><a class="button secondary" href="guide.html">예약 안내</a></div></div></section>
  <section class="section"><div class="wrap error-links"><a href="facilities.html"><strong>시설 안내</strong><span>전국 12개 시설과 대표 요금 비교</span></a><a href="rules.html"><strong>이용 규정</strong><span>취소·도착·복장 기준 확인</span></a><a href="faq.html"><strong>FAQ</strong><span>예약과 방문 전 자주 묻는 질문</span></a></div></section>
</main>`;
  page({
    file: "404.html",
    title,
    description,
    active: "",
    body,
    robots: "noindex, follow",
    schema: { "@context": "https://schema.org", "@type": "WebPage", "name": title, "description": description, "inLanguage": "ko-KR" }
  });
}

function buildLegal() {
  const privacyContact = CONTACT_EMAIL ? `<h2>문의</h2><p>개인정보와 사이트 운영 관련 문의는 <a class="text-link" href="mailto:${escapeHtml(CONTACT_EMAIL)}">${escapeHtml(CONTACT_EMAIL)}</a>로 보내주세요.</p>` : "";
  page({
    file: "legal/privacy.html",
    depth: 1,
    title: "개인정보처리방침 | 육군체력단련장 골프장 안내",
    description: "육군체력단련장 골프장 안내 사이트에서 처리하는 개인정보, 쿠키, 광고와 분석 도구 이용 기준을 정리한 개인정보처리방침입니다.",
    active: "",
    body: `
<main><section class="page-hero"><div class="wrap"><p class="eyebrow">개인정보</p><h1>개인정보처리방침</h1></div></section>
<section class="section"><div class="wrap article">
<p>본 사이트는 회원가입, 결제, 예약 접수를 제공하지 않는 정적 정보 사이트입니다. 향후 문의 양식, 댓글, 광고, 분석 도구를 도입하는 경우 수집 항목과 보관 기간을 명확히 고지합니다.</p>
<h2>수집하는 정보</h2><p>현재 정적 페이지 기준으로 이름, 주민등록번호, 결제 정보와 같은 민감한 개인정보를 직접 수집하지 않습니다. 다만 웹호스팅 환경, 보안 로그, 광고 플랫폼, 분석 도구를 사용하는 경우 접속 기록이나 쿠키 정보가 처리될 수 있습니다.</p>
<h2>광고와 쿠키</h2><p>애드센스 등 광고가 게재될 경우 Google을 포함한 제3자 광고 제공업체가 쿠키를 사용해 이전 방문 기록을 바탕으로 광고를 제공할 수 있습니다. 이용자는 <a class="text-link" href="https://adssettings.google.com/" target="_blank" rel="noopener">Google 광고 설정</a>과 브라우저 설정에서 맞춤 광고와 쿠키를 관리할 수 있습니다.</p>
<h2>동의 관리</h2><p>광고를 도입할 때 법령이나 광고 플랫폼 정책상 동의가 필요한 지역에는 인증된 동의 관리 플랫폼을 적용합니다. 광고 또는 분석 도구가 실제로 추가되면 사용하는 사업자, 처리 목적, 선택 방법을 이 방침에 구체적으로 반영합니다.</p>
${privacyContact}
</div></section></main>`
  });
  page({
    file: "legal/terms.html",
    depth: 1,
    title: "이용약관 | 육군체력단련장 골프장 안내",
    description: "육군체력단련장 골프장 안내 사이트의 이용 기준, 정보 제공 범위, 예약과 결제 처리 방식, 콘텐츠 이용 조건을 정리한 이용약관입니다.",
    active: "",
    body: `
<main><section class="page-hero"><div class="wrap"><p class="eyebrow">이용 기준</p><h1>이용약관</h1></div></section>
<section class="section"><div class="wrap article">
<h2>사이트의 성격</h2><p>본 사이트는 육군 체력단련장 골프장 정보를 정리한 안내 사이트입니다. 예약, 결제, 회원 관리 기능을 제공하지 않습니다.</p>
<h2>정보의 범위</h2><p>게시된 정보는 시설별 예약실, 주소, 요금표, 방문 전 준비 항목을 정리한 내용입니다. 요금, 예약, 이용 자격, 주소, 전화번호, 운영시간은 시설 운영 상황에 따라 달라질 수 있습니다.</p>
<h2>책임의 제한</h2><p>본 사이트의 정보 이용 과정에서 발생한 예약 실패, 요금 차이, 이동 불편, 이용 제한 등에 대해 사이트 운영자는 법령이 허용하는 범위에서 책임을 지지 않습니다.</p>
<h2>콘텐츠 권리</h2><p>사이트의 문장, 구성, 디자인은 운영자에게 권리가 있으며 무단 복제와 재배포를 금지합니다.</p>
</div></section></main>`
  });
  page({
    file: "legal/disclaimer.html",
    depth: 1,
    title: "정보 이용 안내 | 육군체력단련장 안내",
    description: "육군체력단련장 안내 사이트의 입장요금, 예약, 지도, 날씨와 외부 링크 정보를 이용할 때 확인할 기준입니다.",
    active: "",
    body: `
<main><section class="page-hero"><div class="wrap"><p class="eyebrow">정보 이용 안내</p><h1>예약 전에 마지막으로 확인할 내용</h1><p>이 사이트의 정보는 비교와 준비를 돕기 위한 자료이며 실제 예약과 이용 조건은 운영 주체의 안내를 따릅니다.</p></div></section>
<section class="section"><div class="wrap article">
<h2>입장요금과 할인</h2><p>요금표는 공개된 시설별 입장요금을 보기 쉽게 다시 구성한 것입니다. 이용일, 회원 구분, 경기 방식, 할인 증빙과 추가 비용에 따라 실제 결제액이 달라질 수 있으므로 예약 화면과 현장 안내를 함께 확인하세요.</p>
<h2>예약과 이용 자격</h2><p>이 사이트는 예약 접수, 변경, 취소나 회원 자격 판정을 처리하지 않습니다. 신청 가능 여부와 확정 결과는 공식 예약 화면에서 확인하며, 동반자 조건과 출입 절차는 해당 시설 안내가 우선합니다.</p>
<h2>지도와 날씨</h2><p>지도와 날씨 버튼은 외부 서비스의 검색 결과로 연결됩니다. 도착 지점, 도로 통제, 기상 악화와 코스 운영 여부는 출발 전에 시설 안내와 함께 확인해야 합니다.</p>
<h2>자료 기준과 정정</h2><p>시설·요금·예약 정보는 ${OFFICIAL_CHECKED_AT}에 육군체력단련장 홈페이지의 공개 안내를 대조했습니다. 변경된 내용을 발견하면 <a class="text-link" href="../contact.html">문의·정보 정정</a> 페이지로 알려주세요.</p>
</div></section></main>`
  });
}

function buildFacility(f, index) {
  const prev = facilities[(index - 1 + facilities.length) % facilities.length];
  const next = facilities[(index + 1) % facilities.length];
  const filePath = `facilities/${f.slug}.html`;
  const official = officialInfo[f.slug] || {};
  const callHref = phoneHref(official.reservationPhone);
  const kakaoMapUrl = mapHref(official);
  const reservationText = official.reservationPhone || officialMenuFallback(f, "phone");
  const routeMenuText = officialMenuPath(f, "route");
  const representativeFee = feeBrief(f);
  const amenities = facilityAmenities[f.slug] || [];
  const reservationProfile = reservationProfiles[f.slug] || { rounds: `${f.holes}홀 경기`, sessions: "예약 화면의 희망 차수", note: "세부 시간은 시설 탭에서 확인합니다." };
  const amenityItems = amenities.map((item) => `<li>${item}</li>`).join("");
  const note = humanNotes[f.slug] || {
    dayPlan: "예약 전에는 시설명, 주소, 예약실 전화번호, 이용 자격, 동반자 조건을 한 번에 정리해두는 것이 좋습니다."
  };
  const distinction = {
    gyeryong: "계룡대와 구룡대는 모두 계룡권 18홀 시설이지만 주소와 예약실이 다릅니다. 예약확정 화면의 시설명과 계룡대 안내 주소를 함께 대조하세요.",
    guryong: "구룡대와 계룡대는 모두 계룡권 18홀 시설이지만 주소와 예약실이 다릅니다. 예약확정 화면에 구룡대가 표시됐는지 확인한 뒤 이동하세요.",
    biseung: "비승대와 사자대는 모두 이천권에서 검색되므로 시설명만 줄여 전달하면 혼동하기 쉽습니다. 비승대 주소와 확정 시설명을 함께 공유하세요.",
    saja: "사자대와 비승대는 모두 이천권 시설입니다. 사자대의 마장면 주소와 예약확정 화면의 시설명을 함께 확인하세요."
  }[f.slug] || `${f.name} 방문 전에는 예약확정 화면의 시설명과 ${official.navName || `${f.name} 체력단련장`} 검색 결과를 맞춰보는 것이 가장 정확합니다.`;
  const facilityFaqs = [
    [`${f.name} 대표 요금은 누구 기준인가요?`, `${representativeFee} 표기는 시설 비교를 위한 대표 금액입니다. 실제 금액은 회원 구분, 요일, 경기 방식과 할인 증빙에 따라 달라지므로 이 페이지의 전체 입장요금표에서 본인 조건에 맞는 행을 확인하세요.`],
    [`${f.name} 방문지를 잘못 선택하지 않으려면 어떻게 하나요?`, distinction]
  ];
  const schema = graphSchema([
    {
      "@type": "WebPage",
      "name": `${f.name} 체력단련장 안내`,
      "description": f.summary,
      "inLanguage": "ko-KR",
      "url": pageUrl(filePath)
    },
    breadcrumbSchema([
      { name: "홈", url: "index.html" },
      { name: "시설 안내", url: "facilities.html" },
      { name: `${f.name} 체력단련장`, url: filePath }
    ]),
    {
      "@type": "GolfCourse",
      "name": `${f.name} 체력단련장`,
      "description": f.summary,
      "telephone": official.reservationPhone || "",
      "address": { "@type": "PostalAddress", "streetAddress": official.address || "", "addressRegion": f.region, "addressCountry": "KR" },
      "url": pageUrl(filePath)
    },
    {
      "@type": "FAQPage",
      "mainEntity": facilityFaqs.map(([q, a]) => ({ "@type": "Question", "name": q, "acceptedAnswer": { "@type": "Answer", "text": a } }))
    }
  ]);
  const body = `
<main>
  <section class="facility-hero">
    <div class="wrap facility-hero-grid">
      <div>
        <p class="eyebrow">${f.area} · ${f.region}</p>
        <h1>${f.name} 체력단련장</h1>
        <p>${f.summary}</p>
        <div class="meta-pills"><span>${f.holes}홀</span><span>${f.area}</span></div>
      </div>
      <div class="hero-facts-card">
        <span>한눈에 보기</span>
        <dl>
          <div><dt>지역</dt><dd>${f.region}</dd></div>
          <div><dt>코스</dt><dd>${f.holes}홀</dd></div>
          <div><dt>대표 요금</dt><dd>${representativeFee}</dd></div>
        </dl>
      </div>
    </div>
  </section>
  <section class="section facility-detail-section"><div class="wrap detail-layout">
    <article class="article">
      <h2 id="overview">시설 개요</h2>
      <p>${f.intro}</p>
      <h2 id="location">위치와 기본 정보</h2>
      <div class="official-box">
        <dl>
          <div><dt>주소</dt><dd class="address-with-map"><span>${official.address || routeMenuText}</span><a class="map-link" href="${kakaoMapUrl}" target="_blank" rel="noopener" aria-label="${f.name} 카카오맵에서 보기"><img src="../images/map-pin.svg" alt="" width="18" height="18"><span>카카오맵</span></a></dd></div>
          <div><dt>내비게이션 검색</dt><dd>${official.navName || `${f.name} 체력단련장`}</dd></div>
        </dl>
      </div>
      ${renderFeeSection(f)}
      <section class="course-facilities-block" id="course">
        <div class="section-mini-head">
          <p class="eyebrow">코스·편의시설</p>
          <h2>${f.name} 코스와 현장 시설</h2>
        </div>
        <div class="facility-feature-grid">
          <article class="course-scale-panel"><span>예약 화면 선택</span><strong>${reservationProfile.rounds}</strong><p>희망 차수: ${reservationProfile.sessions}. ${reservationProfile.note}</p></article>
          <article class="amenity-panel"><span>주요 편의시설</span><ul class="amenity-list">${amenityItems}</ul></article>
        </div>
      </section>
      <h2 id="visit">방문 전 메모</h2>
      <div class="visit-note-list">
        <div><strong>이동</strong><p>${f.access}</p></div>
        <div><strong>시설 구분</strong><p>${f.tip}</p></div>
        <div><strong>예약 준비</strong><p>${note.dayPlan}</p></div>
      </div>
      <section class="facility-faq" id="facility-faq">
        <div class="section-mini-head"><p class="eyebrow">자주 확인하는 내용</p><h2>${f.name} 예약 전 질문</h2></div>
        ${facilityFaqs.map(([q, a]) => `<details><summary>${q}</summary><p>${a}</p></details>`).join("")}
      </section>
      <div class="source-note">
        <span>자료 기준 ${OFFICIAL_CHECKED_AT}</span>
        <p>주소·예약실·입장요금·경기 구분은 육군체력단련장 홈페이지의 ${f.name} 공개 안내를 대조했습니다. 금액이나 연락처가 달라졌다면 정정 요청으로 알려주세요.</p>
        <div><a href="${OFFICIAL_URL}" target="_blank" rel="noopener">공식 자료 보기</a><a href="../contact.html">정보 정정 요청</a></div>
      </div>
      <section class="booking-decision-panel" id="reservation">
        <div class="booking-decision-copy">
          <p class="eyebrow">예약하기</p>
          <h2>${f.name} 시설 정보를 모두 확인했나요?</h2>
          <p>입장요금과 위치, 코스 정보를 확인했다면 인터넷 예약 또는 시설 예약실 문의 중 필요한 방법을 선택하세요.</p>
          <div class="booking-phone"><span>예약실</span><strong>${reservationText}</strong></div>
        </div>
        <div class="booking-decision-actions">
          <a class="button primary" href="${OFFICIAL_RESERVE_URL}" target="_blank" rel="noopener">공식 홈페이지에서 예약</a>
          ${callHref ? `<a class="button secondary" href="${callHref}">예약실 전화문의</a>` : ""}
        </div>
      </section>
      <h2>함께 보면 좋은 시설</h2>
      <div class="next-links">
        <a href="${prev.slug}.html"><span>이전 시설</span><strong>${prev.name}</strong><small>${prev.region}</small></a>
        <a href="${next.slug}.html"><span>다음 시설</span><strong>${next.name}</strong><small>${next.region}</small></a>
      </div>
    </article>
    <aside class="side-panel action-panel">
      <h2>이 페이지에서 보기</h2>
      <nav class="detail-jump" aria-label="${f.name} 상세 정보 바로가기">
        <a href="#overview"><span>01</span>시설 개요</a>
        <a href="#location"><span>02</span>위치·오시는 길</a>
        <a href="#fees"><span>03</span>입장요금</a>
        <a href="#course"><span>04</span>코스·편의시설</a>
        <a href="#visit"><span>05</span>방문 전 메모</a>
        <a href="#facility-faq"><span>06</span>예약 전 질문</a>
        <a href="#reservation"><span>07</span>예약하기</a>
      </nav>
      <a class="detail-guide-link" href="../guide.html">전체 예약 절차 보기</a>
    </aside>
  </div></section>
</main>`;
  page({
    file: filePath,
    depth: 1,
    title: `${f.name} 체력단련장 안내 | 입장요금·코스·오시는 길`,
    description: `${f.region} ${f.name} 체력단련장의 입장요금, 코스 규모, 주소와 편의시설, 방문 준비와 예약 방법을 정리했습니다.`,
    active: "",
    body,
    schema
  });
}

function siteCss() {
  return `
:root{--ink:#172019;--muted:#5b665d;--line:#d3dbd3;--paper:#f4f6f2;--panel:#fff;--soft:#e8ede8;--deep:#18261d;--green:#2d5938;--gold:#98783c;--shadow:0 8px 24px rgba(26,39,29,.055);--max:1220px}
*{box-sizing:border-box}
body{margin:0;font-family:-apple-system,BlinkMacSystemFont,"Segoe UI","Noto Sans KR","Malgun Gothic",sans-serif;color:var(--ink);background:var(--paper);font-size:16px;line-height:1.68;word-break:keep-all}
a{color:inherit;text-decoration:none}
:focus-visible{outline:3px solid #c49b46;outline-offset:3px}
.sr-only{position:absolute!important;width:1px!important;height:1px!important;padding:0!important;margin:-1px!important;overflow:hidden!important;clip:rect(0,0,0,0)!important;white-space:nowrap!important;border:0!important}
p{margin:0 0 1rem}
ul{margin:0;padding-left:1.15rem}
h1,h2,h3{margin:0 0 .8rem;color:#152216;line-height:1.28;letter-spacing:0}
section[id],h2[id]{scroll-margin-top:132px}
.wrap{max-width:var(--max);margin:0 auto;padding:0 22px}
.skip-link{position:fixed;left:16px;top:10px;z-index:100;transform:translateY(-150%);padding:9px 13px;border-radius:4px;background:#fff;color:#172319;font-weight:900;box-shadow:var(--shadow)}
.skip-link:focus{transform:translateY(0)}
.site-header{position:sticky;top:0;z-index:20;background:#fff;border-bottom:1px solid #d7ddd7}
.header-inner{height:72px;display:flex;align-items:center;justify-content:space-between;gap:22px}
.brand{display:flex;align-items:center;gap:12px}
.brand-mark{flex:0 0 42px;width:42px;height:42px;display:grid;place-items:center;overflow:hidden;color:transparent;font-size:0}
.brand-mark img{display:block;width:42px;height:42px;object-fit:contain}
.brand strong{font-size:1rem}
.main-nav{display:flex;align-items:center;gap:4px}
.main-nav a{padding:10px 11px 8px;border-bottom:2px solid transparent;color:#39443b;font-weight:800;font-size:.92rem}
.main-nav a:hover,.main-nav a.active{border-color:#98783c;color:#1d3825}
.menu-button{display:none;background:none;border:0;width:42px;height:42px;cursor:pointer}
.menu-button span{display:block;height:2px;background:#172319;margin:6px 8px}
.hero{background:#182219;color:#fff;border-bottom:1px solid #cfcab9}
.hero-grid{display:grid;grid-template-columns:minmax(0,1fr);min-height:226px;gap:32px;align-items:center;padding-top:28px;padding-bottom:28px}
.hero-copy{max-width:860px}
.hero h1{max-width:760px;color:#fff;font-size:clamp(2rem,3vw,2.85rem);line-height:1.14}
.lead{max-width:720px;color:#e5eadf;font-size:1rem}
.eyebrow{font-weight:900;color:#7a602d;font-size:.82rem;letter-spacing:0}
.hero .eyebrow,.page-hero .eyebrow,.facility-hero .eyebrow{color:#c9a85d}
.hero-actions{display:flex;gap:10px;flex-wrap:wrap;margin-top:18px}
.button{display:inline-flex;align-items:center;justify-content:center;min-height:44px;padding:10px 17px;border:1px solid transparent;border-radius:4px;font-weight:900;text-align:center}
.button.primary{background:#a88745;color:#11130f}
.button.secondary{background:#fff;color:#1c3523;border-color:#cfd8cf}
.section{padding:56px 0}
.section.muted{background:#e8ede8}
.quick-section{padding-top:34px;background:#f4f6f2;border-bottom:1px solid #d8ded2}
.section-head{max-width:820px;margin:0 0 24px;text-align:left}
.section-head h2{font-size:clamp(1.32rem,1.9vw,1.78rem)}
.quick-section .section-head h2{font-size:clamp(1.36rem,2vw,1.84rem)}
.section-head p{color:#596356}
.directory-shell{padding:18px;border:1px solid #d3dbd3;border-radius:6px;background:#fff;box-shadow:none}
.search-panel{display:grid;grid-template-columns:140px minmax(0,1fr);gap:12px;align-items:center;margin:0 0 16px;padding:13px;border:1px solid #d8ded2;border-radius:4px;background:#f8faf7}
.search-panel label{font-weight:900;color:#172319}
.search-panel input{width:100%;min-height:44px;border:1px solid #cfd6c9;border-radius:4px;padding:0 13px;background:#fff;color:#172319;font:inherit}
.filter-chips{grid-column:2;display:flex;gap:8px;flex-wrap:wrap}
.filter-chips button{border:1px solid #cfd6c9;background:#fff;border-radius:5px;padding:9px 13px;font-weight:900;color:#43503f;cursor:pointer}
.filter-chips button.active{background:#172319;color:#fff;border-color:#172319}
.home-directory-list{--directory-columns:1fr 1.05fr .55fr 1.2fr .65fr;overflow:hidden;border:1px solid #d8ded2;border-radius:5px;background:#fff}
.home-directory-head{display:grid;grid-template-columns:var(--directory-columns);gap:14px;padding:10px 16px;background:#eef0e9;color:#344231;font-size:.79rem;font-weight:900}
.home-directory-head span{text-align:center}
.home-facility-row{display:grid;grid-template-columns:var(--directory-columns);gap:14px;align-items:center;padding:0 16px;border-bottom:1px solid #e1e5dc}
.home-facility-row:last-of-type{border-bottom:0}
.home-facility-row:hover{background:#fbfaf4}
.home-facility-row.is-hidden{display:none}
.home-facility-name,.home-facility-region,.home-facility-course{display:flex;align-items:center;justify-content:center;min-width:0;min-height:62px;text-align:center}
.home-facility-name{color:#244629;font-size:1rem;font-weight:900}
.home-facility-region,.home-facility-course{color:#4d594a;font-size:.9rem;overflow-wrap:anywhere}
.home-facility-actions{display:grid;grid-template-columns:1fr;justify-items:center;gap:6px}
.home-facility-actions a{width:100%;max-width:230px;padding:7px 6px;border:1px solid #ced5c9;border-radius:4px;background:#fff;text-align:center;font-size:.8rem;font-weight:900}
.home-facility-actions a:last-child{background:#172319;color:#fff;border-color:#172319}
.home-weather-link{display:inline-flex;align-items:center;justify-content:center;justify-self:center;width:100%;max-width:96px;min-height:38px;padding:5px;border:1px solid #c8cfbf;border-radius:4px;background:#f3f1e8}
.home-weather-link:hover{background:#e8e3d2}
.home-weather-link img{display:block;width:24px;height:24px}
.empty-state{padding:18px;border:1px solid #d8ded2;border-radius:6px;background:#fff;color:#596356}
.home-topics{background:#fff;border-bottom:1px solid #d8ded2}
.home-topic-grid{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));overflow:hidden;border:1px solid #d8ded2;border-radius:6px;background:#fff}
.home-topic-grid a{display:flex;flex-direction:column;min-height:132px;padding:19px;border-right:1px solid #d8ded2}
.home-topic-grid a:last-child{border-right:0}
.home-topic-grid a:hover{background:#f2f0e6}
.home-topic-grid span{color:#725826;font-size:.78rem;font-weight:900}
.home-topic-grid strong{margin:4px 0;color:#172319;font-size:1.06rem}
.home-topic-grid small{margin-top:auto;color:#5d685a;font-size:.82rem}
.home-practical{background:#fff;border-top:1px solid #d8ded2}
.practical-grid{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));border-top:1px solid #cbd4cb;border-bottom:1px solid #cbd4cb}
.practical-grid article{padding:22px 24px;border-right:1px solid #d7dfd7}
.practical-grid article:last-child{border-right:0}
.practical-grid span{color:#8a6d35;font-size:.76rem;font-weight:900}
.practical-grid h3{margin:5px 0;font-size:1.08rem}
.practical-grid p{color:#566157;font-size:.9rem}
.practical-grid a{color:#285d36;font-size:.86rem;font-weight:900;text-decoration:underline;text-underline-offset:3px}
.practical-example{display:grid;grid-template-columns:72px minmax(0,1fr);gap:18px;margin-top:18px;padding:16px 0;border-bottom:1px solid #d7dfd7}
.practical-example strong{color:#765e2d}
.practical-example p{margin:0;color:#4f5c51}
.official-box,.side-panel,.hero-facts-card{border:1px solid #d3dbd3;border-radius:6px;background:#fff;box-shadow:none}
.home-guide-cta{padding:42px 0;background:#e8ede8;border-top:1px solid #d4dcd4}
.home-guide-inner{display:flex;align-items:center;justify-content:space-between;gap:30px}
.home-guide-inner h2{font-size:1.45rem;margin-bottom:.35rem}
.home-guide-inner p{margin:0;color:#4f5b4c}
.home-guide-inner>div:last-child{display:flex;gap:9px;flex:0 0 auto}
.page-hero{padding:42px 0;background:#182219;color:#fff;border-bottom:1px solid #314236}
.page-hero h1{color:#fff;font-size:clamp(1.72rem,2.35vw,2.15rem)}
.page-hero p:not(.eyebrow){max-width:760px;color:#dce5d8}
.facility-hero{padding:40px 0;background:#182219;color:#fff;border-bottom:1px solid #314236}
.facility-hero p:not(.eyebrow){max-width:760px;color:#e2e8dc}
.article{max-width:860px;width:100%}
.article h2{margin-top:2rem;font-size:1.26rem}
.article p,.article li{color:#3f4c3d}
.page-jump{position:sticky;top:72px;z-index:15;background:rgba(255,255,255,.97);border-bottom:1px solid #d7ddd7;backdrop-filter:blur(10px)}
.page-jump .wrap{display:flex;gap:0;overflow-x:auto;scrollbar-width:none}
.page-jump .wrap::-webkit-scrollbar{display:none}
.page-jump a{flex:0 0 auto;padding:12px 17px 10px;border-bottom:2px solid transparent;color:#435047;font-size:.86rem;font-weight:900}
.page-jump a+a{border-left:1px solid #d8ddd3}
.page-jump a:hover{color:#172319;border-color:#9d7f3d}
.workflow-shell,.rules-shell{max-width:1020px}
.guide-shell{max-width:1040px}
.guide-section-heading{max-width:780px;margin-bottom:24px}
.guide-section-heading h2{font-size:1.48rem;margin-bottom:.45rem}
.guide-section-heading p:not(.eyebrow){color:#566259}
.booking-steps{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));border:1px solid #ccd6cd;background:#fff}
.booking-steps article{min-width:0;padding:22px 24px;border-right:1px solid #d8e0d9}
.booking-steps article:last-child{border-right:0}
.booking-steps article>span{color:#8b6e35;font-size:.76rem;font-weight:900}
.booking-steps h3{margin:5px 0;font-size:1.12rem}
.booking-steps p{min-height:48px;margin:0 0 10px;color:#566259;font-size:.9rem}
.booking-steps a,.booking-steps article>strong{color:#285d36;font-size:.85rem;font-weight:900}
.booking-steps a{text-decoration:underline;text-underline-offset:3px}
.phone-purpose{display:grid;grid-template-columns:auto minmax(0,1fr) auto;gap:14px;align-items:center;margin-top:14px;padding:13px 16px;background:#eef2ec;color:#4f5b52;font-size:.88rem}
.phone-purpose strong{color:#263b2b}
.phone-purpose a{color:#285d36;font-weight:900;text-decoration:underline;text-underline-offset:3px}
.member-type-grid{display:grid;grid-template-columns:repeat(5,minmax(0,1fr));border:1px solid #ccd6cd;background:#fff}
.member-type-grid article{padding:18px;border-right:1px solid #d8e0d9}
.member-type-grid article:last-child{border-right:0}
.member-type-grid strong{display:block;margin-bottom:7px;color:#23452b}
.member-type-grid p{margin:0;color:#58645a;font-size:.86rem}
.member-check-line{display:flex;align-items:center;justify-content:space-between;gap:28px;margin-top:16px;padding:15px 0;border-bottom:1px solid #c8d2c9}
.member-check-line p{margin:0;color:#526055}
.member-check-line>a{flex:0 0 auto}
.reservation-calendar{display:grid;grid-template-columns:repeat(4,minmax(0,1fr));border:1px solid #ccd6cd;background:#fff}
.reservation-calendar article{min-width:0;padding:20px 22px;border-right:1px solid #d8e0d9}
.reservation-calendar article:last-child{border-right:0}
.reservation-calendar span{display:block;color:#6f7b72;font-size:.76rem;font-weight:900}
.reservation-calendar strong{display:block;margin:6px 0;color:#1f3a27;font-size:1rem}
.reservation-calendar p{margin:0;color:#5a665d;font-size:.88rem}
.reservation-calendar .deadline{background:#f6f1e7}
.reservation-calendar .deadline span,.reservation-calendar .deadline strong{color:#755a27}
.date-example{display:grid;grid-template-columns:180px minmax(0,1fr);gap:24px;margin-top:16px;padding:16px 0;border-bottom:1px solid #c8d2c9}
.date-example strong{color:#755a27}
.date-example p{margin:0;color:#526055}
.result-check-grid{border-top:1px solid #c8d2c9}
.result-check-grid article{display:grid;grid-template-columns:38px minmax(0,1fr) auto;gap:18px;align-items:center;padding:18px 0;border-bottom:1px solid #c8d2c9}
.result-check-grid article>span{display:grid;place-items:center;width:32px;height:32px;background:#213629;color:#fff;font-weight:900}
.result-check-grid h3{margin:0 0 3px;font-size:1.03rem}
.result-check-grid p{margin:0;color:#556158;font-size:.9rem}
.result-check-grid a{color:#285d36;font-size:.86rem;font-weight:900;text-decoration:underline;text-underline-offset:3px;white-space:nowrap}
.result-note{margin:15px 0 0;color:#4e5a51}
.guide-essentials{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:18px}
.guide-essentials>section{padding:20px 22px;border:1px solid #ccd6cd;background:#fff}
.guide-essentials h3{font-size:1.1rem}
.guide-essentials ul{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:8px 18px;margin:0 0 16px;padding:0;list-style:none}
.guide-essentials li{position:relative;padding-left:15px;color:#4d5951;font-size:.9rem}
.guide-essentials li::before{content:"";position:absolute;left:0;top:.72em;width:5px;height:5px;border-radius:50%;background:#416f49}
.guide-cancel-line{display:grid;grid-template-columns:auto minmax(0,1fr) auto;gap:18px;align-items:center;margin-top:18px;padding:15px 0;border-top:1px solid #c8d2c9;border-bottom:1px solid #c8d2c9}
.guide-cancel-line>div{display:grid}
.guide-cancel-line>div strong{color:#263b2b}
.guide-cancel-line>div span{color:#7a5f2d;font-weight:900}
.guide-cancel-line p{margin:0;color:#566259;font-size:.88rem}
.guide-cancel-line>a{color:#285d36;font-size:.88rem;font-weight:900;text-decoration:underline;text-underline-offset:3px}
.source-note{display:grid;grid-template-columns:auto minmax(0,1fr) auto;gap:16px;align-items:center;margin:28px 0;padding:14px 16px;border:1px solid #d0d8ce;background:#f7f8f4;color:#526055;font-size:.84rem}
.source-note>span{color:#725b2d;font-weight:900;white-space:nowrap}
.source-note p{margin:0}
.source-note>div{display:flex;gap:12px}
.source-note a{color:#285d36;font-weight:900;text-decoration:underline;text-underline-offset:3px;white-space:nowrap}
.compact-source{margin-top:22px}
.reservation-final-section{padding-top:48px;background:#182219}
.reservation-final{display:flex;align-items:center;justify-content:space-between;gap:34px;color:#e4e9df}
.reservation-final h2{color:#fff;font-size:1.48rem}
.reservation-final p:not(.eyebrow){max-width:690px;margin:0;color:#cdd7ca}
.reservation-final-actions{display:grid;grid-template-columns:1fr;gap:9px;min-width:260px}
.facility-compare-section{padding-top:36px;background:#fff}
.facility-stat-strip{display:grid;grid-template-columns:repeat(4,minmax(0,1fr));margin-bottom:26px;border-top:1px solid #c8d2c9;border-bottom:1px solid #c8d2c9}
.facility-stat-strip>div{display:flex;align-items:baseline;justify-content:center;gap:12px;padding:15px 18px;border-right:1px solid #d7dfd8}
.facility-stat-strip>div:last-child{border-right:0}
.facility-stat-strip span{color:#657168;font-size:.82rem;font-weight:800}
.facility-stat-strip strong{color:#1e4028;font-size:1.18rem}
.facility-table-intro{display:grid;grid-template-columns:minmax(260px,.8fr) minmax(0,1.2fr);gap:42px;align-items:end;margin-bottom:18px}
.facility-table-intro h2{font-size:1.45rem;margin-bottom:0}
.facility-table-intro>p{margin:0;color:#59655c}
.region-directory .section-head{max-width:760px}
.region-directory-grid{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));align-items:start;gap:18px}
.region-block{min-width:0;padding:18px 20px;border:1px solid #d0d9d1;background:#fff}
.region-block h2{display:flex;align-items:baseline;justify-content:space-between;padding-bottom:10px;border-bottom:1px solid #d9e0d9;font-size:1.08rem;margin-bottom:0}
.region-block h2 span{color:#718075;font-size:.76rem}
.region-link-grid{display:grid}
.region-link-item{display:flex;align-items:center;justify-content:space-between;gap:16px;min-height:62px;padding:10px 2px;border-bottom:1px solid #e2e7e2}
.region-link-item:last-child{border-bottom:0}
.region-link-item:hover strong{color:#2d6639}
.region-link-item span{display:grid;gap:1px;min-width:0}
.region-link-item strong{color:#25462c}
.region-link-item small{color:#657168}
.region-link-item em{flex:0 0 auto;color:#7e6838;font-size:.78rem;font-style:normal;font-weight:900}
.facility-hero-grid{display:grid;grid-template-columns:minmax(0,1fr) 340px;gap:26px;align-items:end}
.facility-hero h1{color:#fff;font-size:clamp(1.72rem,2.8vw,2.55rem)}
.meta-pills{display:flex;gap:10px;flex-wrap:wrap;margin-top:18px}
.meta-pills span{border:1px solid rgba(255,255,255,.24);border-radius:4px;background:rgba(255,255,255,.1);padding:6px 12px;font-weight:800}
.hero-facts-card{padding:19px 21px;background:#fff;color:#172319}
.hero-facts-card>span{display:block;margin-bottom:6px;color:#746137;font-size:.78rem;font-weight:900}
.hero-facts-card dl{margin:0}
.hero-facts-card dl>div{display:grid;grid-template-columns:78px 1fr;gap:12px;padding:8px 0;border-bottom:1px solid #e2e5dc}
.hero-facts-card dl>div:last-child{border-bottom:0}
.hero-facts-card dt{color:#3f4e3c;font-size:.84rem;font-weight:900}
.hero-facts-card dd{margin:0;color:#172319;font-size:.9rem;font-weight:800;overflow-wrap:anywhere}
.detail-layout{display:grid;grid-template-columns:minmax(0,1fr) 310px;gap:28px;align-items:start}
.detail-layout>*,.article,.side-panel{min-width:0}
.facility-detail-section{padding-top:36px}
.official-box{margin:18px 0 28px;padding:24px}
.official-box dl,.side-panel dl{margin:0}
.official-box div{display:grid;grid-template-columns:128px 1fr;padding:10px 0;border-bottom:1px solid #e2e5dc}
.official-box div:last-child{border-bottom:0}
.official-box dt,.side-panel dt{font-weight:900;color:#22321f}
.official-box dd,.side-panel dd{margin:0;color:#596356}
.address-with-map{display:flex;align-items:flex-start;justify-content:space-between;gap:12px}
.address-with-map span{min-width:0}
.map-link{flex:0 0 auto;display:inline-flex;align-items:center;justify-content:center;min-height:34px;padding:5px 11px;border:1px solid #c8cfbf;border-radius:4px;background:#f3f1e8;color:#29482d;font-size:.8rem;font-weight:900}
.map-link:hover{background:#e8e3d2}
.map-link img{display:block;width:18px;height:18px;margin-right:6px}
.map-link span{white-space:nowrap}
.section-mini-head{max-width:820px;margin:0 0 18px}
.section-mini-head h2{font-size:1.24rem;margin-bottom:.45rem}
.section-mini-head p:not(.eyebrow){color:#4f5d4c;margin-bottom:0}
.fee-section{margin:26px 0 30px}
.table-wrap{width:100%;max-width:100%;margin:18px 0 0;overflow:hidden;border:1px solid #ccd6cd;border-radius:6px;background:#fff;box-shadow:none}
.table-wrap table{width:100%;min-width:0;border-collapse:separate;border-spacing:0;table-layout:fixed;color:#20291f}
.table-wrap thead th{padding:11px 12px;text-align:center;vertical-align:middle;background:#213629;color:#fff;border-right:1px solid rgba(255,255,255,.12);font-size:.88rem;font-weight:900;line-height:1.35}
.table-wrap thead th:last-child,.table-wrap tbody td:last-child{border-right:0}
.table-wrap tbody td{padding:11px 12px;text-align:center;vertical-align:middle;border-right:1px solid #e2e8e2;border-bottom:1px solid #e2e8e2;background:#fff;font-size:.9rem;line-height:1.48;white-space:normal;word-break:keep-all;overflow-wrap:anywhere}
.table-wrap tbody tr:last-child td{border-bottom:0}
.table-wrap tbody tr:nth-child(even) td{background:#f8faf7}
.table-wrap tbody tr:hover td{background:#eef3ed}
.table-wrap td a{color:#274f2e;font-weight:900}
.facility-summary-wrap{width:100%;margin:0 auto}
.facility-summary-table .col-no{width:7%}.facility-summary-table .col-name{width:15%}.facility-summary-table .col-region{width:17%}.facility-summary-table .col-area{width:13%}.facility-summary-table .col-holes{width:10%}.facility-summary-table .col-fee{width:38%}
.fee-table-grid th:nth-child(1),.fee-table-grid td:nth-child(1){width:13%}
.fee-table-grid th:nth-child(2),.fee-table-grid td:nth-child(2){width:27%}
.fee-table-grid th:nth-child(3),.fee-table-grid td:nth-child(3){width:10%}
.fee-table-grid th:nth-child(4),.fee-table-grid td:nth-child(4){width:16%}
.fee-table-grid th:nth-child(5),.fee-table-grid td:nth-child(5){width:14%}
.fee-table-grid th:nth-child(6),.fee-table-grid td:nth-child(6){width:20%;font-weight:800}
.fee-table-grid td:nth-child(6){color:#172319}
.fee-table-grid.has-note th:nth-child(1),.fee-table-grid.has-note td:nth-child(1){width:10%}
.fee-table-grid.has-note th:nth-child(2),.fee-table-grid.has-note td:nth-child(2){width:20%}
.fee-table-grid.has-note th:nth-child(3),.fee-table-grid.has-note td:nth-child(3){width:8%}
.fee-table-grid.has-note th:nth-child(4),.fee-table-grid.has-note td:nth-child(4){width:14%}
.fee-table-grid.has-note th:nth-child(5),.fee-table-grid.has-note td:nth-child(5){width:11%}
.fee-table-grid.has-note th:nth-child(6),.fee-table-grid.has-note td:nth-child(6){width:14%;font-weight:800}
.fee-table-grid.has-note td:nth-child(6){color:#172319}
.fee-table-grid.has-note th:nth-child(7),.fee-table-grid.has-note td:nth-child(7){width:23%}
.note-list{margin:14px 0 0;padding-left:1.1rem;color:#4c5849}
.note-list li{margin:4px 0}
.text-link{color:#245f34;font-weight:900;text-decoration:underline;text-underline-offset:3px}
.course-facilities-block{margin:34px 0}
.facility-feature-grid{display:grid;grid-template-columns:minmax(220px,.7fr) minmax(0,1.3fr);border-top:1px solid #cfd6c9;border-bottom:1px solid #cfd6c9}
.facility-feature-grid article{padding:20px 22px}
.facility-feature-grid article+article{border-left:1px solid #cfd6c9}
.facility-feature-grid span{display:block;color:#725826;font-size:.8rem;font-weight:900}
.facility-feature-grid strong{display:block;margin:5px 0;font-size:1.35rem;color:#203d24}
.facility-feature-grid p{margin:0;font-size:.9rem}
.amenity-list{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:5px 24px;margin-top:9px;padding-left:1.15rem;color:#3f4c3d;font-size:.9rem}
.visit-note-list{border-top:1px solid #cfd6c9}
.visit-note-list>div{display:grid;grid-template-columns:110px minmax(0,1fr);gap:20px;padding:16px 0;border-bottom:1px solid #d8ddd3}
.visit-note-list strong{color:#223723}
.visit-note-list p{margin:0;color:#4c5949}
.facility-faq{margin:34px 0}
.facility-faq details{border-top:1px solid #d3dbd3;background:#fff}
.facility-faq details:last-child{border-bottom:1px solid #d3dbd3}
.facility-faq summary{cursor:pointer;padding:15px 4px;font-weight:900}
.facility-faq details p{margin:0;padding:0 4px 16px;color:#4c5949}
.booking-decision-panel{display:grid;grid-template-columns:minmax(0,1fr) 230px;gap:28px;align-items:center;margin:42px 0;padding:26px;border:1px solid #c8d3c9;border-top:3px solid #98783c;border-radius:6px;background:#fff}
.booking-decision-panel h2{margin-top:0;font-size:1.28rem}
.booking-decision-copy>p:not(.eyebrow){margin-bottom:15px}
.booking-phone{display:flex;align-items:baseline;gap:14px;padding-top:13px;border-top:1px solid #e1e5dc}
.booking-phone span{color:#687365;font-size:.82rem;font-weight:900}
.booking-phone strong{color:#203923;font-size:.96rem;overflow-wrap:anywhere}
.booking-decision-actions{display:grid;grid-template-columns:1fr;gap:9px}
.booking-decision-actions .button{width:100%}
.rules-timeline{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:12px;margin:20px 0}
.rules-timeline article{padding:20px;border:1px solid #d8ded2;border-top-width:4px;border-radius:7px;background:#fff}
.rules-timeline .status-ok{border-top-color:#47744d}
.rules-timeline .status-warn{border-top-color:#b08a37}
.rules-timeline .status-danger{border-top-color:#9b493f}
.rules-timeline span{display:block;color:#5a6757;font-size:.78rem;font-weight:900}
.rules-timeline strong{display:block;margin:6px 0 8px;color:#1e3322;font-size:1rem;line-height:1.45}
.rules-timeline p{margin:0;color:#5c6759;font-size:.88rem}
.rule-action{display:flex;align-items:center;justify-content:space-between;gap:24px;padding:17px 0;border-top:1px solid #d7dcd2;border-bottom:1px solid #d7dcd2}
.rule-action p{margin:0;color:#465344}
.rule-action .button{flex:0 0 auto}
.operation-list{margin:0;border-top:1px solid #cbd2c7}
.operation-list>div{display:grid;grid-template-columns:120px minmax(0,1fr);border-bottom:1px solid #d8ddd3}
.operation-list dt{padding:17px 12px;color:#25412a;font-weight:900}
.operation-list dd{display:flex;align-items:baseline;justify-content:space-between;gap:20px;margin:0;padding:17px 12px}
.operation-list dd strong{color:#1d2d1e}
.operation-list dd span{color:#596356;font-size:.9rem;text-align:right}
.rules-table-wrap{margin-bottom:32px}
.rules-table th:nth-child(1),.rules-table td:nth-child(1){width:18%}
.rules-table th:nth-child(2),.rules-table td:nth-child(2){width:54%}
.rules-table th:nth-child(3),.rules-table td:nth-child(3){width:28%}
.local-rule-layout{display:grid;grid-template-columns:220px minmax(0,1fr) auto;gap:36px;align-items:start}
.local-rule-layout h2{font-size:1.3rem}
.local-rule-layout ul{margin:0;color:#42503f}
.local-rule-layout li+li{margin-top:7px}
.local-rule-layout>a{white-space:nowrap}
.side-panel{position:sticky;top:96px;padding:22px;border-top:1px solid #d3dbd3}
.action-panel h2{font-size:1.04rem}
.action-panel p{color:#647064;font-size:.9rem;margin-bottom:14px}
.detail-jump{display:grid;border-top:1px solid #e0e4da}
.detail-jump a{display:flex;align-items:center;gap:12px;min-height:43px;border-bottom:1px solid #e0e4da;color:#354533;font-size:.9rem;font-weight:800}
.detail-jump a:hover{color:#24512c}
.detail-jump span{color:#8a723e;font-size:.72rem;font-weight:900}
.detail-guide-link{display:block;margin-top:16px;color:#285331;font-size:.86rem;font-weight:900;text-decoration:underline;text-underline-offset:3px}
.next-links{display:grid;grid-template-columns:1fr 1fr;gap:14px}
.next-links a{border:1px solid #d8ded2;border-radius:6px;background:#fff;padding:18px}
.next-links span,.next-links small{display:block;color:#596356}
.next-links strong{display:block;font-size:1.2rem;color:#2f5134}
.faq-list{max-width:900px}
.faq-list details{background:#fff;border:1px solid var(--line);border-radius:6px;margin-bottom:10px}
.faq-list summary{cursor:pointer;padding:18px 20px;font-weight:900;font-size:1rem}
.faq-list p{padding:0 20px 18px;color:#455242}
.faq-list p a{color:#245f34;font-weight:900;text-decoration:underline;text-underline-offset:3px}
.contact-layout{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:34px;max-width:1040px}
.contact-choice{padding:24px 0;border-top:3px solid #98783c;border-bottom:1px solid #ccd6cd}
.contact-choice h2{font-size:1.28rem}
.contact-choice p:not(.eyebrow){color:#526055}
.contact-email{margin:10px 0 0;color:#285d36;font-weight:900}
.preview-notice{padding:12px 14px;background:#eef2ec;font-size:.9rem}
.contact-checklist{max-width:1040px}
.contact-checklist>div{max-width:720px}
.contact-checklist ol{display:grid;grid-template-columns:repeat(4,minmax(0,1fr));margin:22px 0 18px;padding:0;list-style:none;border-top:1px solid #c8d2c9;border-bottom:1px solid #c8d2c9}
.contact-checklist li{display:grid;gap:4px;padding:18px;border-right:1px solid #d3dbd3}
.contact-checklist li:last-child{border-right:0}
.contact-checklist li::before{content:counter(list-item,decimal-leading-zero);color:#8a6d35;font-size:.76rem;font-weight:900}
.contact-checklist span{color:#5a665c;font-size:.86rem}
.privacy-reminder{margin:0;color:#4e5a51}
.error-links{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));border-top:1px solid #cbd4cb;border-bottom:1px solid #cbd4cb}
.error-links a{display:grid;gap:5px;padding:22px;border-right:1px solid #d7dfd7}
.error-links a:last-child{border-right:0}
.error-links strong{color:#24472c}
.error-links span{color:#5b675d;font-size:.9rem}
.site-footer{background:#11180f;color:#cfdcc8;padding:44px 0 22px}
.footer-grid{display:grid;grid-template-columns:1.4fr 1fr 1fr;gap:32px}
.site-footer h2{color:#fff;font-size:1rem}
.site-footer p,.site-footer a{color:#cfdcc8}
.site-footer li+li{margin-top:5px}
.site-footer a{display:inline-block;padding:2px 0}
.copyright{display:flex;justify-content:space-between;gap:10px 24px;flex-wrap:wrap;border-top:1px solid #33452f;margin-top:30px;padding-top:18px;color:#b7c4b2;font-size:.86rem}
@supports (content-visibility:auto){.section:not(.quick-section){content-visibility:auto;contain-intrinsic-size:1px 420px}}
@media(max-width:1080px){.facility-hero-grid,.detail-layout,.facility-table-intro{grid-template-columns:1fr}.side-panel{position:static}.side-panel.action-panel{order:-1}.local-rule-layout{grid-template-columns:1fr}.local-rule-layout>a{white-space:normal}.hero-facts-card{max-width:540px}.reservation-final{align-items:flex-start;flex-direction:column}.reservation-final-actions{grid-template-columns:1fr 1fr;width:100%}.facility-table-intro{gap:10px;align-items:start}.reservation-calendar{grid-template-columns:repeat(2,minmax(0,1fr))}.reservation-calendar article:nth-child(2){border-right:0}.reservation-calendar article:nth-child(-n+2){border-bottom:1px solid #d8e0d9}.member-type-grid{grid-template-columns:repeat(3,minmax(0,1fr))}.member-type-grid article{border-bottom:1px solid #d8e0d9}.member-type-grid article:nth-child(3){border-right:0}.member-type-grid article:nth-last-child(-n+2){border-bottom:0}}
@media(max-width:900px){.home-directory-list{--directory-columns:1fr 1fr .55fr 1fr .55fr}.rules-timeline{grid-template-columns:1fr}.region-directory-grid{grid-template-columns:1fr}}
@media(max-width:820px){.booking-steps,.guide-essentials{grid-template-columns:1fr}.booking-steps article{border-right:0;border-bottom:1px solid #d9e0d9}.booking-steps article:last-child{border-bottom:0}.booking-steps p{min-height:0}.phone-purpose,.guide-cancel-line{grid-template-columns:1fr;gap:5px}.facility-stat-strip{grid-template-columns:repeat(2,minmax(0,1fr))}.facility-stat-strip>div:nth-child(2){border-right:0}.facility-stat-strip>div:nth-child(-n+2){border-bottom:1px solid #d7dfd8}}
@media(max-width:760px){.wrap{padding:0 18px}.header-inner{height:64px}.brand strong{font-size:.95rem}.menu-button{display:block}.main-nav{position:fixed;left:0;right:0;top:64px;display:none;flex-direction:column;align-items:stretch;padding:12px 18px;background:#fff;border-bottom:1px solid var(--line)}.main-nav a{min-height:44px}.nav-open .main-nav{display:flex}.hero-grid{min-height:auto;padding-top:24px;padding-bottom:25px}.hero h1{font-size:1.95rem}.lead{font-size:.98rem}.hero-actions .button{width:100%}.section{padding:44px 0}.quick-section{padding-top:26px}.page-hero{padding:32px 0}.facility-hero{padding:38px 0}.facility-detail-section{padding-top:28px}.directory-shell{padding:15px}.search-panel{grid-template-columns:1fr}.filter-chips{grid-column:1}.filter-chips button{flex:1 1 auto}.home-directory-head{display:none}.home-facility-row{grid-template-columns:minmax(0,1fr) minmax(0,1fr) 56px;grid-template-areas:"name name name" "region course weather" "action action action";gap:7px 8px;padding:13px}.home-facility-name{grid-area:name;min-height:auto;padding-bottom:7px;border-bottom:1px solid #e2e7e2;font-size:1.06rem}.home-facility-region{grid-area:region}.home-facility-course{grid-area:course}.home-facility-region,.home-facility-course{min-height:38px;padding:7px;background:#f5f7f3}.home-facility-actions{grid-area:action}.home-facility-actions a{max-width:none}.home-weather-link{grid-area:weather;max-width:none;height:100%}.home-topic-grid,.footer-grid,.next-links,.facility-feature-grid,.booking-decision-panel,.reservation-calendar,.guide-essentials ul,.practical-grid,.contact-layout,.contact-checklist ol,.error-links{grid-template-columns:1fr}.home-topic-grid a,.practical-grid article,.contact-checklist li,.error-links a{border-right:0;border-bottom:1px solid #d8ded2}.home-topic-grid a:last-child,.practical-grid article:last-child,.contact-checklist li:last-child,.error-links a:last-child{border-bottom:0}.practical-example,.date-example{grid-template-columns:1fr;gap:5px}.member-type-grid{grid-template-columns:1fr}.member-type-grid article,.member-type-grid article:nth-last-child(-n+2){border-right:0;border-bottom:1px solid #d8e0d9}.member-type-grid article:last-child{border-bottom:0}.member-check-line{align-items:flex-start;flex-direction:column;gap:9px}.result-check-grid article{grid-template-columns:38px minmax(0,1fr)}.result-check-grid article>a{grid-column:2;white-space:normal}.source-note{grid-template-columns:1fr;gap:7px}.source-note>div{flex-wrap:wrap}.facility-feature-grid article+article{border-top:1px solid #cfd6c9;border-left:0}.amenity-list{grid-template-columns:1fr 1fr}.page-jump{top:64px}.page-jump .wrap{gap:20px}.home-guide-inner,.rule-action{align-items:stretch;flex-direction:column}.home-guide-inner>div:last-child{display:grid;grid-template-columns:1fr;width:100%}.operation-list>div{grid-template-columns:88px minmax(0,1fr)}.operation-list dd{align-items:flex-start;flex-direction:column;gap:3px}.operation-list dd span{text-align:left}.visit-note-list>div{grid-template-columns:1fr;gap:5px}.official-box div{grid-template-columns:1fr}.address-with-map{flex-direction:column;gap:8px}.booking-decision-panel{gap:20px;margin:34px 0;padding:21px}.booking-phone{align-items:flex-start;flex-direction:column;gap:4px}.reservation-final-actions{grid-template-columns:1fr;min-width:0}.side-panel.action-panel{padding:20px}.guide-section-heading h2,.facility-table-intro h2{font-size:1.28rem}.reservation-calendar article,.reservation-calendar article:nth-child(2){border-right:0;border-bottom:1px solid #d8e0d9}.reservation-calendar article:last-child{border-bottom:0}.facility-stat-strip>div{justify-content:flex-start;padding:13px 14px}.table-wrap{overflow-x:auto;overscroll-behavior-inline:contain;-webkit-overflow-scrolling:touch;border-radius:8px}.table-wrap table{min-width:680px}.facility-summary-table{min-width:720px}.fee-table-grid{min-width:720px}.fee-table-grid.has-note{min-width:820px}.table-wrap thead th,.table-wrap tbody td{padding:11px 12px;font-size:.88rem}}
@media(max-width:620px){.brand-mark{flex-basis:38px;width:38px;height:38px}.brand-mark img{width:38px;height:38px}.section-head h2,.quick-section .section-head h2{font-size:1.34rem}.page-hero h1,.facility-hero h1{font-size:1.62rem}.article h2{font-size:1.18rem}.region-link-item{align-items:flex-start;flex-direction:column;gap:5px}.region-link-item em{align-self:flex-start}}
`;
}

function buildAssets() {
  write("favicon.svg", `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64">
<title>육군체력단련장 안내</title>
<rect width="64" height="64" rx="13" fill="#18251a"/>
<path d="M11 49c11-8 28-10 43-5v9H11z" fill="#58734f"/>
<path d="M16 50c9-5 22-7 33-4" fill="none" stroke="#91a77d" stroke-width="2.5" stroke-linecap="round"/>
<path d="M30 12v35" stroke="#f5f1e6" stroke-width="3.5" stroke-linecap="round"/>
<path d="M33 14h17l-5 6 5 6H33z" fill="#c6a454"/>
<circle cx="23" cy="46" r="3.2" fill="#f5f1e6"/>
<path d="M15 18l7 5 7-5" fill="none" stroke="#718766" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"/>
</svg>`);
  write("images/site-mark.svg", `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64" role="img" aria-label="육군체력단련장 안내">
<rect x="2" y="2" width="60" height="60" rx="14" fill="#18251a"/>
<path d="M10 49c12-8 29-10 45-5v10H10z" fill="#58734f"/>
<path d="M15 50c9-5 23-7 35-4" fill="none" stroke="#91a77d" stroke-width="2.5" stroke-linecap="round"/>
<path d="M30 11v37" stroke="#f5f1e6" stroke-width="3.5" stroke-linecap="round"/>
<path d="M33 13h18l-5 6.5 5 6.5H33z" fill="#c6a454"/>
<circle cx="22" cy="46" r="3.4" fill="#f5f1e6"/>
<path d="M14 18l7 5 7-5" fill="none" stroke="#718766" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"/>
</svg>`);
  write("images/weather.svg", `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32">
<circle cx="11" cy="10" r="5" fill="#d0a84e"/>
<g stroke="#9a7833" stroke-width="1.8" stroke-linecap="round"><path d="M11 2v2"/><path d="M11 16v2"/><path d="M3 10h2"/><path d="M17 10h2"/><path d="M5.3 4.3l1.4 1.4"/><path d="M15.3 14.3l1.4 1.4"/></g>
<path d="M9 25.5h14.2a5.3 5.3 0 0 0 .4-10.6A7.2 7.2 0 0 0 10 16.8 4.4 4.4 0 0 0 9 25.5z" fill="#f7f8f4" stroke="#29432d" stroke-width="2" stroke-linejoin="round"/>
</svg>`);
  write("images/map-pin.svg", `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
<path d="M12 22s7-6.2 7-13A7 7 0 1 0 5 9c0 6.8 7 13 7 13z" fill="#29482d"/>
<circle cx="12" cy="9" r="2.7" fill="#d5b465"/>
</svg>`);
  const ogSource = path.join(ROOT, "source-assets", "og-cover.png");
  const ogTarget = path.join(OUTPUT_ROOT, "images", "og-cover.png");
  if (!fs.existsSync(ogSource)) throw new Error(`Missing social image: ${ogSource}`);
  fs.mkdirSync(path.dirname(ogTarget), { recursive: true });
  fs.copyFileSync(ogSource, ogTarget);
  write("css/style.css", siteCss());
  write("js/main.js", `(() => {
  const btn = document.querySelector(".menu-button");
  function setMenu(open) {
    document.body.classList.toggle("nav-open", open);
    if (btn) {
      btn.setAttribute("aria-expanded", open ? "true" : "false");
      btn.setAttribute("aria-label", open ? "메뉴 닫기" : "메뉴 열기");
    }
  }
  if (btn) btn.addEventListener("click", () => setMenu(!document.body.classList.contains("nav-open")));
  document.querySelectorAll(".main-nav a").forEach((a) => a.addEventListener("click", () => setMenu(false)));
  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && document.body.classList.contains("nav-open")) setMenu(false);
  });

  const search = document.querySelector("#facilitySearch");
  const chips = Array.from(document.querySelectorAll("[data-filter]"));
  const cards = Array.from(document.querySelectorAll(".home-facility-row[data-text]"));
  const empty = document.querySelector(".empty-state");
  let activeFilter = "all";

  function applyDirectoryFilter() {
    const query = (search && search.value ? search.value : "").trim().toLowerCase();
    let visibleCards = 0;
    cards.forEach((item) => {
      const areaOk = activeFilter === "all" || item.dataset.area === activeFilter;
      const textOk = !query || (item.dataset.text || "").includes(query);
      const visible = areaOk && textOk;
      item.classList.toggle("is-hidden", !visible);
      if (item.classList.contains("home-facility-row") && visible) visibleCards += 1;
    });
    if (empty) empty.hidden = visibleCards !== 0;
  }

  if (search || chips.length) {
    if (search) search.addEventListener("input", applyDirectoryFilter);
    chips.forEach((chip) => chip.addEventListener("click", () => {
      activeFilter = chip.dataset.filter || "all";
      chips.forEach((item) => {
        const selected = item === chip;
        item.classList.toggle("active", selected);
        item.setAttribute("aria-pressed", selected ? "true" : "false");
      });
      applyDirectoryFilter();
    }));
    applyDirectoryFilter();
  }
})();`);
  write("robots.txt", IS_INDEXABLE ? `User-agent: *\nAllow: /\nDisallow: /*.md$\nDisallow: /build.js\nDisallow: /server.js\nDisallow: /.claude/\n\nSitemap: ${SITE_URL}/sitemap.xml\n` : `User-agent: *\nDisallow: /\n`);
  write("_redirects", `/beginner-guide.html /guide.html 301\n/beginner-guide /guide.html 301\n`);
  const urls = ["index.html", "facilities.html", "guide.html", "rules.html", "faq.html", "about.html", "contact.html", "legal/privacy.html", "legal/terms.html", "legal/disclaimer.html", ...facilities.map((f) => `facilities/${f.slug}.html`)];
  const today = new Date().toISOString().slice(0, 10);
  write("sitemap.xml", IS_INDEXABLE ? `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls.map((u) => `  <url><loc>${SITE_URL}/${u}</loc><lastmod>${today}</lastmod><changefreq>monthly</changefreq><priority>${u === "index.html" ? "1.0" : "0.7"}</priority></url>`).join("\n")}\n</urlset>\n` : `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"></urlset>\n`);
}

function buildServer() {
  write("server.js", `const http = require("http");\nconst fs = require("fs");\nconst path = require("path");\nconst ROOT = __dirname;\nconst PORT = Number(process.env.PORT || 4174);\nconst MIME = { ".html": "text/html; charset=utf-8", ".css": "text/css; charset=utf-8", ".js": "text/javascript; charset=utf-8", ".png": "image/png", ".svg": "image/svg+xml; charset=utf-8", ".xml": "application/xml; charset=utf-8", ".txt": "text/plain; charset=utf-8" };\nfunction cacheControl(ext) {\n  if ([".css", ".js", ".png", ".svg"].includes(ext)) return "public, max-age=3600";\n  return "no-cache";\n}\nhttp.createServer((req, res) => {\n  let urlPath = decodeURIComponent(req.url.split("?")[0]);\n  if (urlPath === "/") urlPath = "/index.html";\n  if (urlPath === "/beginner-guide" || urlPath === "/beginner-guide.html") { res.writeHead(301, { Location: "/guide.html" }); return res.end(); }\n  let file = path.join(ROOT, urlPath);\n  if (!file.startsWith(ROOT)) { res.writeHead(403); return res.end("Forbidden"); }\n  fs.stat(file, (statErr, stat) => {\n    if (statErr || !stat.isFile()) {\n      const notFound = path.join(ROOT, "404.html");\n      return fs.readFile(notFound, (error, data) => {\n        if (error) { res.writeHead(404, { "Content-Type": "text/plain; charset=utf-8", "X-Content-Type-Options": "nosniff" }); return res.end("Not found"); }\n        res.writeHead(404, { "Content-Type": MIME[".html"], "Cache-Control": "no-cache", "X-Content-Type-Options": "nosniff" });\n        res.end(data);\n      });\n    }\n    const ext = path.extname(file);\n    const etag = \`"\${stat.size}-\${Math.floor(stat.mtimeMs)}"\`;\n    const headers = { "Content-Type": MIME[ext] || "application/octet-stream", "Cache-Control": cacheControl(ext), "Last-Modified": stat.mtime.toUTCString(), "ETag": etag, "X-Content-Type-Options": "nosniff" };\n    if (req.headers["if-none-match"] === etag) { res.writeHead(304, headers); return res.end(); }\n    fs.readFile(file, (err, data) => {\n      if (err) { res.writeHead(404, { "Content-Type": "text/plain; charset=utf-8", "X-Content-Type-Options": "nosniff" }); return res.end("Not found"); }\n      res.writeHead(200, headers);\n      res.end(data);\n    });\n  });\n}).listen(PORT, () => console.log("Preview: http://localhost:" + PORT));\n`);
}

function main() {
  if (IS_PRODUCTION && (!SITE_URL || !CONTACT_EMAIL)) {
    throw new Error("Production build requires SITE_URL and CONTACT_EMAIL.");
  }
  ensureDir("facilities");
  ensureDir("legal");
  ensureDir("css");
  ensureDir("js");
  buildAssets();
  if (!IS_PRODUCTION) buildServer();
  buildIndex();
  buildFacilities();
  buildGuide();
  buildRules();
  buildBeginner();
  buildFaq();
  buildAbout();
  buildContact();
  build404();
  buildLegal();
  facilities.forEach(buildFacility);
  optimizeOutput();
  console.log(`Built ${12 + facilities.length} pages for ${SITE_NAME} in ${OUTPUT_ROOT}`);
  console.log(`Search indexing: ${IS_INDEXABLE ? `enabled for ${SITE_URL}` : "disabled for local preview"}`);
}

main();

