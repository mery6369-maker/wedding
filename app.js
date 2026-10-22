/**
 * Atelier Wedding - Premium Mobile-First Wedding Invitation Studio (Bright Mode)
 * Zero-Server Client-side Architecture (100% Free Hosting on GitHub Pages)
 */

const GREETING_PRESETS = {
  warm: `살며시 불어오는 바람처럼
서로의 마음에 따스하게 스며든 두 사람,
이제 평생을 함께할 약속을 맺으려 합니다.

서로의 오늘이 되고 내일이 되어
아끼고 존중하며 예쁘게 살겠습니다.

귀한 걸음으로 저희의 시작을
축복해 주시면 더없는 기쁨이 되겠습니다.`,

  classic: `서로가 마주보며 다져온 깊은 사랑을
이제 한곳을 바라보며 걸어갈
더 큰 사랑으로 키우고자 합니다.

저희 두 사람이 사랑의 이름으로
지혜롭고 바르게 살아갈 수 있도록
따뜻한 격려와 축복으로 자리를 빛내어 주십시오.`,

  modern: `저희 두 사람, 결혼합니다.

가장 좋은 친구이자 든든한 반려자로
서로를 믿고 의지하며
유쾌하고 다정하게 살아가겠습니다.

바쁘시더라도 부디 오셔서
저희의 새로운 첫걸음을 응원해 주세요.`
};

const MONTH_NAMES_EN = ["JAN", "FEB", "MAR", "APR", "MAY", "JUN", "JUL", "AUG", "SEP", "OCT", "NOV", "DEC"];
const DAY_NAMES_EN = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"];

const MAX_GALLERY_PHOTOS = 20;
const MAX_INPUT_IMAGE_SIZE = 15 * 1024 * 1024; // 15MB
const MAX_AUDIO_FILE_SIZE = 5 * 1024 * 1024;   // 5MB

// INITIAL / CURRENT STATE
const state = {
  coverStyle: "duo",
  groomName: "김도윤",
  groomPhone: "010-1234-5678",
  groomFather: "김건우",
  groomFatherDeceased: false,
  groomMother: "박정숙",
  groomMotherDeceased: false,
  groomRelation: "장남",
  groomRelationCustom: "",
  groomFatherPhone: "010-1111-2222",
  groomMotherPhone: "",

  brideName: "이서연",
  bridePhone: "010-9876-5432",
  brideFather: "이재민",
  brideFatherDeceased: false,
  brideMother: "최은영",
  brideMotherDeceased: false,
  brideRelation: "장녀",
  brideRelationCustom: "",
  brideFatherPhone: "010-3333-4444",
  brideMotherPhone: "",

  weddingDate: "2026-11-28",
  weddingTime: "토요일 오후 1시 30분",
  venueName: "더채플 앳 청담",
  venueHall: "6층 커티지홀",
  venueAddress: "서울특별시 강남구 선릉로 757",

  transportParking: "건물 지하 주차장 및 외부 전용 주차타워 2시간 무료 지원",
  transportSubway: "7호선·수인분당선 강남구청역 4번 출구 (도보 7분 / 셔틀 수시 운행)",
  transportBus: "간선 141, 145 / 지선 2014 정류장 하차",

  greeting: GREETING_PRESETS.warm,

  groomAccount: "카카오뱅크 3333-01-2345678 (예금주: 김도윤)",
  groomFatherAccount: "국민은행 123-456-7890 (예금주: 김건우)",
  groomMotherAccount: "신한은행 987-654-3210 (예금주: 박정숙)",

  brideAccount: "토스뱅크 1000-1234-5678 (예금주: 이서연)",
  brideFatherAccount: "하나은행 111-222-3333 (예금주: 이재민)",
  brideMotherAccount: "우리은행 444-555-6666 (예금주: 최은영)",

  coverPhoto: "./sample_wedding_cover.jpg",
  detailPhoto: "./sample_duo_detail.jpg",
  galleryPhotos: [
    "./sample_gallery_1.jpg",
    "./sample_gallery_2.jpg",
    "./sample_gallery_3.jpg",
    "./sample_gallery_4.jpg"
  ],
  galleryExpanded: false,

  bgmEnabled: true,
  bgmTrackType: "piano", // 'piano' or 'custom'
  bgmTrackUrl: "./audio/romantic_piano.mp3",
  customBgmUrl: "",
  customBgmName: "",
  bgmVolume: 0.7,

  // Section Visibility Toggles
  sections: {
    greeting: true,
    calendar: true,
    gallery: true,
    location: true,
    account: true,
    rsvp: true,
    guestbook: true,
    share: true,
    bgm: true
  },

  // Interactive Guestbook List
  guestbookList: [
    {
      id: "gb_sample_1",
      author: "지은 & 민호",
      date: "2026. 10. 20",
      text: "도윤아 서연아 결혼 진심으로 축하해! 세상에서 제일 행복하고 다정한 부부가 되길 응원할게.",
      password: "1234"
    },
    {
      id: "gb_sample_2",
      author: "선배 재원",
      date: "2026. 10. 21",
      text: "두 사람 함께 있는 모습이 정말 아름답네요. 예식날 기쁜 마음으로 찾아뵙겠습니다!",
      password: "1234"
    }
  ]
};

// PURE STATE: Reset all fields so the user feels like they start on a pristine canvas
function applyPureState() {
  state.groomName = "";
  state.groomPhone = "";
  state.groomFather = "";
  state.groomFatherDeceased = false;
  state.groomMother = "";
  state.groomMotherDeceased = false;
  state.groomRelation = "장남";
  state.groomRelationCustom = "";
  state.groomFatherPhone = "";
  state.groomMotherPhone = "";

  state.brideName = "";
  state.bridePhone = "";
  state.brideFather = "";
  state.brideFatherDeceased = false;
  state.brideMother = "";
  state.brideMotherDeceased = false;
  state.brideRelation = "장녀";
  state.brideRelationCustom = "";
  state.brideFatherPhone = "";
  state.brideMotherPhone = "";

  state.weddingTime = "토요일 오후 1시 30분";
  state.venueName = "";
  state.venueHall = "";
  state.venueAddress = "";
  state.transportParking = "";
  state.transportSubway = "";
  state.transportBus = "";

  state.greeting = GREETING_PRESETS.warm;

  state.groomAccount = "";
  state.groomFatherAccount = "";
  state.groomMotherAccount = "";
  state.brideAccount = "";
  state.brideFatherAccount = "";
  state.brideMotherAccount = "";
  state.guestbookList = [];

  syncFormInputsFromState();
  renderAll();
  showToast("깨끗한 새 청첩장(Pure 상태)으로 초기화되었습니다.");
}

function applySampleState() {
  state.groomName = "김도윤";
  state.groomPhone = "010-1234-5678";
  state.groomFather = "김건우";
  state.groomFatherDeceased = false;
  state.groomMother = "박정숙";
  state.groomMotherDeceased = false;
  state.groomRelation = "장남";
  state.groomRelationCustom = "";
  state.groomFatherPhone = "010-1111-2222";
  state.groomMotherPhone = "";

  state.brideName = "이서연";
  state.bridePhone = "010-9876-5432";
  state.brideFather = "이재민";
  state.brideFatherDeceased = false;
  state.brideMother = "최은영";
  state.brideMotherDeceased = false;
  state.brideRelation = "장녀";
  state.brideRelationCustom = "";
  state.brideFatherPhone = "010-3333-4444";
  state.brideMotherPhone = "";

  state.weddingDate = "2026-11-28";
  state.weddingTime = "토요일 오후 1시 30분";
  state.venueName = "더채플 앳 청담";
  state.venueHall = "6층 커티지홀";
  state.venueAddress = "서울특별시 강남구 선릉로 757";
  state.transportParking = "건물 지하 주차장 및 외부 전용 주차타워 2시간 무료 지원";
  state.transportSubway = "7호선·수인분당선 강남구청역 4번 출구 (도보 7분 / 셔틀 수시 운행)";
  state.transportBus = "간선 141, 145 / 지선 2014 정류장 하차";

  state.greeting = GREETING_PRESETS.warm;
  state.groomAccount = "카카오뱅크 3333-01-2345678 (예금주: 김도윤)";
  state.groomFatherAccount = "국민은행 123-456-7890 (예금주: 김건우)";
  state.groomMotherAccount = "신한은행 987-654-3210 (예금주: 박정숙)";
  state.brideAccount = "토스뱅크 1000-1234-5678 (예금주: 이서연)";
  state.brideFatherAccount = "하나은행 111-222-3333 (예금주: 이재민)";
  state.brideMotherAccount = "우리은행 444-555-6666 (예금주: 최은영)";

  state.guestbookList = [
    {
      id: "gb_sample_1",
      author: "지은 & 민호",
      date: "2026. 10. 20",
      text: "도윤아 서연아 결혼 진심으로 축하해! 세상에서 제일 행복한 부부가 되길!",
      password: "1234"
    }
  ];

  syncFormInputsFromState();
  renderAll();
  showToast("예시 샘플 데이터가 채워졌습니다.");
}

/* ===================================================
   URL STATE SERIALIZATION (ZERO-SERVER PUBLIC SHARING)
   =================================================== */

function serializeState() {
  const minimalData = {
    c: state.coverStyle,
    gn: state.groomName,
    gp: state.groomPhone,
    gf: state.groomFather,
    gfd: state.groomFatherDeceased ? 1 : 0,
    gm: state.groomMother,
    gmd: state.groomMotherDeceased ? 1 : 0,
    grl: state.groomRelation,
    grc: state.groomRelationCustom,
    gfp: state.groomFatherPhone,
    gmp: state.groomMotherPhone,

    bn: state.brideName,
    bp: state.bridePhone,
    bf: state.brideFather,
    bfd: state.brideFatherDeceased ? 1 : 0,
    bm: state.brideMother,
    bmd: state.brideMotherDeceased ? 1 : 0,
    brl: state.brideRelation,
    brc: state.brideRelationCustom,
    bfp: state.brideFatherPhone,
    bmp: state.brideMotherPhone,

    d: state.weddingDate,
    t: state.weddingTime,
    vn: state.venueName,
    vh: state.venueHall,
    va: state.venueAddress,
    tp: state.transportParking,
    ts: state.transportSubway,
    tb: state.transportBus,

    gr: state.greeting,

    ga: state.groomAccount,
    gfa: state.groomFatherAccount,
    gma: state.groomMotherAccount,
    ba: state.brideAccount,
    bfa: state.brideFatherAccount,
    bma: state.brideMotherAccount,

    bgm: state.sections.bgm ? 1 : 0,
    sec: state.sections
  };
  try {
    return encodeURIComponent(btoa(unescape(encodeURIComponent(JSON.stringify(minimalData)))));
  } catch (e) {
    return "";
  }
}

function deserializeState(encodedStr) {
  try {
    const jsonStr = decodeURIComponent(escape(atob(decodeURIComponent(encodedStr))));
    const d = JSON.parse(jsonStr);
    if (d.c) state.coverStyle = d.c;
    if (typeof d.gn !== "undefined") state.groomName = d.gn;
    if (typeof d.gp !== "undefined") state.groomPhone = d.gp;
    if (typeof d.gf !== "undefined") state.groomFather = d.gf;
    if (typeof d.gfd !== "undefined") state.groomFatherDeceased = (d.gfd === 1);
    if (typeof d.gm !== "undefined") state.groomMother = d.gm;
    if (typeof d.gmd !== "undefined") state.groomMotherDeceased = (d.gmd === 1);
    if (typeof d.grl !== "undefined") state.groomRelation = d.grl;
    if (typeof d.grc !== "undefined") state.groomRelationCustom = d.grc;
    if (typeof d.gfp !== "undefined") state.groomFatherPhone = d.gfp;
    if (typeof d.gmp !== "undefined") state.groomMotherPhone = d.gmp;

    if (typeof d.bn !== "undefined") state.brideName = d.bn;
    if (typeof d.bp !== "undefined") state.bridePhone = d.bp;
    if (typeof d.bf !== "undefined") state.brideFather = d.bf;
    if (typeof d.bfd !== "undefined") state.brideFatherDeceased = (d.bfd === 1);
    if (typeof d.bm !== "undefined") state.brideMother = d.bm;
    if (typeof d.bmd !== "undefined") state.brideMotherDeceased = (d.bmd === 1);
    if (typeof d.brl !== "undefined") state.brideRelation = d.brl;
    if (typeof d.brc !== "undefined") state.brideRelationCustom = d.brc;
    if (typeof d.bfp !== "undefined") state.brideFatherPhone = d.bfp;
    if (typeof d.bmp !== "undefined") state.brideMotherPhone = d.bmp;

    if (d.d) state.weddingDate = d.d;
    if (typeof d.t !== "undefined") state.weddingTime = d.t;
    if (typeof d.vn !== "undefined") state.venueName = d.vn;
    if (typeof d.vh !== "undefined") state.venueHall = d.vh;
    if (typeof d.va !== "undefined") state.venueAddress = d.va;
    if (typeof d.tp !== "undefined") state.transportParking = d.tp;
    if (typeof d.ts !== "undefined") state.transportSubway = d.ts;
    if (typeof d.tb !== "undefined") state.transportBus = d.tb;

    if (typeof d.gr !== "undefined") state.greeting = d.gr;

    if (typeof d.ga !== "undefined") state.groomAccount = d.ga;
    if (typeof d.gfa !== "undefined") state.groomFatherAccount = d.gfa;
    if (typeof d.gma !== "undefined") state.groomMotherAccount = d.gma;
    if (typeof d.ba !== "undefined") state.brideAccount = d.ba;
    if (typeof d.bfa !== "undefined") state.brideFatherAccount = d.bfa;
    if (typeof d.bma !== "undefined") state.brideMotherAccount = d.bma;

    if (d.sec && typeof d.sec === "object") {
      Object.assign(state.sections, d.sec);
    }
    return true;
  } catch (e) {
    return false;
  }
}

function checkUrlMode() {
  const hash = window.location.hash;
  if (!hash) return false;

  if (hash.includes("view")) {
    document.body.classList.add("guest-mode");
  }

  const match = hash.match(/data=([^&]+)/);
  if (match && match[1]) {
    deserializeState(match[1]);
  }
  return hash.includes("view");
}

function generateShareUrl() {
  const base = window.location.origin + window.location.pathname;
  const data = serializeState();
  return `${base}#view&data=${data}`;
}

/* ===================================================
   RENDER ENGINE
   =================================================== */

function renderAll() {
  const wrapper = document.getElementById("invWrapper");
  if (!wrapper) return;

  wrapper.setAttribute("data-cover-style", state.coverStyle);

  // Update active state in desktop cover cards
  document.querySelectorAll(".cover-card").forEach(c => {
    c.classList.toggle("active", c.getAttribute("data-cover-style") === state.coverStyle);
  });

  const parts = state.weddingDate.split("-").map(Number);
  const year = parts[0] || 2026;
  const month = parts[1] || 11;
  const day = parts[2] || 28;
  const dateObj = new Date(year, month - 1, day);
  const dayNameEn = DAY_NAMES_EN[dateObj.getDay()] || "SAT";
  const monNameEn = MONTH_NAMES_EN[month - 1] || "NOV";

  // Clean Fallback Strings for Pure State Display
  const groomDisplayName = state.groomName.trim() || "신랑";
  const brideDisplayName = state.brideName.trim() || "신부";
  const coupleNamesSummary = `${groomDisplayName} & ${brideDisplayName}`;
  const coupleNamesDot = `${groomDisplayName} · ${brideDisplayName}`;
  const venueSummary = (state.venueName || state.venueHall) 
    ? `${state.venueName} ${state.venueHall}`.trim()
    : "식장 위치를 입력해 주세요";

  // 1. Cover 1: Duo Frame
  const duoGroom = document.getElementById("duoGroomName");
  const duoBride = document.getElementById("duoBrideName");
  if (duoGroom) duoGroom.textContent = groomDisplayName;
  if (duoBride) duoBride.textContent = brideDisplayName;
  const duoDay = document.getElementById("duoDateDay");
  const duoMonYear = document.getElementById("duoDateMonYear");
  const duoTime = document.getElementById("duoDateTime");
  if (duoDay) duoDay.textContent = String(day).padStart(2, "0");
  if (duoMonYear) duoMonYear.textContent = `${monNameEn} ${year}`;
  if (duoTime) duoTime.textContent = `${dayNameEn} ${state.weddingTime || ""}`.trim();
  const duoVenue = document.getElementById("duoVenueSummary");
  if (duoVenue) duoVenue.textContent = venueSummary;
  const duoPrimaryImg = document.getElementById("duoPrimaryImg");
  const duoSecImg = document.getElementById("duoSecondaryImg");
  if (duoPrimaryImg) duoPrimaryImg.src = state.coverPhoto;
  if (duoSecImg) duoSecImg.src = state.detailPhoto;

  // 2. Cover 2: Magazine
  const magGroom = document.getElementById("magGroomName");
  const magBride = document.getElementById("magBrideName");
  if (magGroom) magGroom.textContent = groomDisplayName;
  if (magBride) magBride.textContent = brideDisplayName;
  const magDateSum = document.getElementById("magDateSummary");
  if (magDateSum) magDateSum.textContent = `${year}. ${String(month).padStart(2, "0")}. ${String(day).padStart(2, "0")} ${dayNameEn} ${state.weddingTime || ""}`.trim();
  const magVenue = document.getElementById("magVenueSummary");
  if (magVenue) magVenue.textContent = venueSummary;
  const magCoverImg = document.getElementById("magCoverImg");
  if (magCoverImg) magCoverImg.src = state.coverPhoto;

  // 3. Cover 3: Arch
  const archGroom = document.getElementById("archGroomName");
  const archBride = document.getElementById("archBrideName");
  if (archGroom) archGroom.textContent = groomDisplayName;
  if (archBride) archBride.textContent = brideDisplayName;
  const archDateSum = document.getElementById("archDateSummary");
  if (archDateSum) archDateSum.textContent = `${year}년 ${month}월 ${day}일 ${state.weddingTime || ""}`.trim();
  const archVenue = document.getElementById("archVenueSummary");
  if (archVenue) archVenue.textContent = venueSummary;
  const archCoverImg = document.getElementById("archCoverImg");
  if (archCoverImg) archCoverImg.src = state.coverPhoto;

  // Desktop Slot Thumbnails
  const deskSlot1 = document.getElementById("deskSlotThumb1");
  const deskSlot2 = document.getElementById("deskSlotThumb2");
  if (deskSlot1) deskSlot1.src = state.coverPhoto;
  if (deskSlot2) deskSlot2.src = state.detailPhoto;

  // Greeting Text
  const greetingEl = document.getElementById("viewGreetingText");
  if (greetingEl) {
    greetingEl.innerHTML = (state.greeting || GREETING_PRESETS.warm).replace(/\n/g, "<br>");
  }

  // Parents Box (Moiitee / Love-wins-all style)
  const parentsBox = document.getElementById("viewParentsBox");
  if (parentsBox) {
    const groomFatherText = (state.groomFatherDeceased ? '<span class="deceased-badge">故</span>' : '') + (state.groomFather || '');
    const groomMotherText = (state.groomMotherDeceased ? '<span class="deceased-badge">故</span>' : '') + (state.groomMother || '');
    const groomParentsJoined = [groomFatherText, groomMotherText].filter(Boolean).join(' · ');

    const brideFatherText = (state.brideFatherDeceased ? '<span class="deceased-badge">故</span>' : '') + (state.brideFather || '');
    const brideMotherText = (state.brideMotherDeceased ? '<span class="deceased-badge">故</span>' : '') + (state.brideMother || '');
    const brideParentsJoined = [brideFatherText, brideMotherText].filter(Boolean).join(' · ');

    const groomRelText = (state.groomRelation === 'custom')
      ? (state.groomRelationCustom || '아들')
      : (state.groomRelation || '아들');

    const brideRelText = (state.brideRelation === 'custom')
      ? (state.brideRelationCustom || '딸')
      : (state.brideRelation || '딸');

    let html = '';
    if (groomParentsJoined || state.groomName) {
      html += `
        <div class="parent-line">
          ${groomParentsJoined ? `<span class="parent-names">${groomParentsJoined}</span> <span class="parent-rel">의 ${groomRelText}</span>` : ''}
          <span class="child-name">${groomDisplayName}</span>
        </div>
      `;
    }
    if (brideParentsJoined || state.brideName) {
      html += `
        <div class="parent-line">
          ${brideParentsJoined ? `<span class="parent-names">${brideParentsJoined}</span> <span class="parent-rel">의 ${brideRelText}</span>` : ''}
          <span class="child-name">${brideDisplayName}</span>
        </div>
      `;
    }
    parentsBox.innerHTML = html;
  }

  // Calendar & D-Day
  renderCalendar(year, month, day);

  // Photo Gallery
  renderInvitationGallery();
  renderDesktopGalleryGrid();

  // Location & Transportation
  const locName = document.getElementById("viewLocName");
  if (locName) locName.textContent = venueSummary;
  const locAddr = document.getElementById("viewLocAddr");
  if (locAddr) locAddr.textContent = state.venueAddress || "도로명 주소를 입력해 주세요";

  // Map Navigation URLs
  const searchAddress = (state.venueAddress || state.venueName || "더채플앳청담").trim();
  const searchName = (state.venueName || "더채플앳청담").trim();
  const linkNaver = document.getElementById("linkNaverMap");
  const linkKakao = document.getElementById("linkKakaoMap");
  const linkTmap = document.getElementById("linkTmap");
  if (linkNaver) linkNaver.href = `https://map.naver.com/v5/search/${encodeURIComponent(searchAddress)}`;
  if (linkKakao) linkKakao.href = `https://map.kakao.com/link/search/${encodeURIComponent(searchName)}`;
  if (linkTmap) linkTmap.href = `https://tmap.life/navigate?name=${encodeURIComponent(searchName)}`;

  // Structured Transport Breakdown Cards
  const transportGrid = document.getElementById("viewTransportGrid");
  if (transportGrid) {
    let tHtml = '';
    if (state.transportParking) {
      tHtml += `
        <div class="transport-card">
          <span class="transport-icon">🅿️</span>
          <div class="transport-body">
            <div class="transport-title">주차 안내</div>
            <div class="transport-desc">${state.transportParking}</div>
          </div>
        </div>
      `;
    }
    if (state.transportSubway) {
      tHtml += `
        <div class="transport-card">
          <span class="transport-icon">🚇</span>
          <div class="transport-body">
            <div class="transport-title">지하철 안내</div>
            <div class="transport-desc">${state.transportSubway}</div>
          </div>
        </div>
      `;
    }
    if (state.transportBus) {
      tHtml += `
        <div class="transport-card">
          <span class="transport-icon">🚌</span>
          <div class="transport-body">
            <div class="transport-title">버스 안내</div>
            <div class="transport-desc">${state.transportBus}</div>
          </div>
        </div>
      `;
    }
    transportGrid.innerHTML = tHtml;
  }

  // Multi-Account Lists (Groom & Bride)
  renderAccountAccordion("bodyAccGroom", [
    { role: "신랑", name: groomDisplayName, acc: state.groomAccount },
    { role: "아버님", name: state.groomFather, acc: state.groomFatherAccount },
    { role: "어머님", name: state.groomMother, acc: state.groomMotherAccount }
  ]);

  renderAccountAccordion("bodyAccBride", [
    { role: "신부", name: brideDisplayName, acc: state.brideAccount },
    { role: "아버님", name: state.brideFather, acc: state.brideFatherAccount },
    { role: "어머님", name: state.brideMother, acc: state.brideMotherAccount }
  ]);

  // Guestbook List
  renderGuestbookList();

  // Footer Names
  const footerNames = document.getElementById("footerCoupleNames");
  if (footerNames) footerNames.textContent = coupleNamesSummary;

  // Apply Section Visibility Toggles (ON / OFF)
  applySectionVisibility();

  // Render Section Toggles in Desktop Sidebar
  renderDesktopSectionToggles();
}

function renderAccountAccordion(containerId, list) {
  const container = document.getElementById(containerId);
  if (!container) return;

  const validItems = list.filter(item => item.acc && item.acc.trim());
  if (validItems.length === 0) {
    container.innerHTML = `<div style="padding:14px;font-size:12px;color:#8c857b;text-align:center;">등록된 계좌번호가 없습니다.</div>`;
    return;
  }

  container.innerHTML = validItems.map(item => `
    <div class="acc-item">
      <div class="acc-info">
        <span class="acc-owner">${item.role} ${item.name || ''}</span>
        <span class="acc-num">${item.acc}</span>
      </div>
      <button type="button" class="btn-copy-acc" onclick="copyText('${item.acc.replace(/'/g, "\\'")}')">복사</button>
    </div>
  `).join("");
}

function applySectionVisibility() {
  const map = {
    greeting: document.getElementById("secGreeting"),
    calendar: document.getElementById("secCalendar"),
    gallery: document.getElementById("secGallery"),
    location: document.getElementById("secLocation"),
    account: document.getElementById("secAccount"),
    rsvp: document.getElementById("secRsvp"),
    guestbook: document.getElementById("secGuestbook"),
    share: document.getElementById("secShare")
  };

  Object.entries(map).forEach(([key, el]) => {
    if (el) {
      el.style.display = (state.sections[key] !== false) ? "" : "none";
    }
  });

  // Floating BGM button
  const bgmBtn = document.querySelector(".floating-bgm");
  if (bgmBtn) {
    bgmBtn.style.display = (state.sections.bgm !== false) ? "" : "none";
  }
}

function renderDesktopSectionToggles() {
  const list = document.getElementById("deskToggleList");
  if (!list) return;

  const toggleItems = [
    { key: "greeting", label: "💌 초대 인사말 & 혼주 정보" },
    { key: "calendar", label: "📅 예식 일정 달력 & D-Day" },
    { key: "gallery", label: "📷 웨딩 포토 갤러리" },
    { key: "location", label: "📍 오시는 길 & 지도 네비" },
    { key: "account", label: "💳 마음 전하실 곳 (축의금 계좌)" },
    { key: "rsvp", label: "📝 참석 여부 전달 (R.S.V.P)" },
    { key: "guestbook", label: "💬 축하 방명록 (Guestbook)" },
    { key: "share", label: "🚀 카카오톡 & 링크 공유 버튼" },
    { key: "bgm", label: "🎵 배경음악 (BGM 자동재생)" }
  ];

  list.innerHTML = toggleItems.map(item => `
    <div class="toggle-item">
      <span class="toggle-title">${item.label}</span>
      <label class="switch-ui">
        <input type="checkbox" data-desk-toggle="${item.key}" ${state.sections[item.key] !== false ? 'checked' : ''} />
        <span class="slider-round"></span>
      </label>
    </div>
  `).join("");

  list.querySelectorAll("[data-desk-toggle]").forEach(input => {
    input.addEventListener("change", (e) => {
      const key = e.target.getAttribute("data-desk-toggle");
      state.sections[key] = e.target.checked;
      applySectionVisibility();
      showToast(`${e.target.checked ? '항목이 켜졌습니다.' : '항목이 숨겨졌습니다.'}`);
    });
  });
}

function renderDesktopGalleryGrid() {
  const grid = document.getElementById("deskGalleryGrid");
  const badge = document.getElementById("deskGalleryCountBadge");
  if (badge) badge.textContent = `현재 ${state.galleryPhotos.length} / ${MAX_GALLERY_PHOTOS}장`;
  if (!grid) return;

  grid.innerHTML = state.galleryPhotos.map((src, idx) => `
    <div class="gallery-manage-item">
      <img src="${src}" alt="갤러리 ${idx + 1}" />
      <span class="gallery-manage-idx">${idx + 1}</span>
      <button type="button" class="gallery-manage-del" onclick="deleteGalleryPhoto(${idx})" title="삭제">✕</button>
    </div>
  `).join("");
}

function renderInvitationGallery() {
  const container = document.getElementById("viewGalleryGrid");
  const expandWrap = document.getElementById("galleryExpandWrap");
  const totalCountEl = document.getElementById("galleryTotalCount");
  if (!container) return;

  const total = state.galleryPhotos.length;
  if (totalCountEl) totalCountEl.textContent = total;

  if (total === 0) {
    container.innerHTML = `<div style="padding:24px;text-align:center;font-size:12px;color:#8c857b;">등록된 갤러리 사진이 없습니다.</div>`;
    if (expandWrap) expandWrap.style.display = "none";
    return;
  }

  const visiblePhotos = state.galleryExpanded ? state.galleryPhotos : state.galleryPhotos.slice(0, 6);

  container.innerHTML = visiblePhotos.map((src, idx) => `
    <div class="gallery-item" onclick="openLightbox('${src}')">
      <img src="${src}" alt="웨딩 갤러리 사진 ${idx + 1}" loading="lazy" />
    </div>
  `).join("");

  if (expandWrap) {
    expandWrap.style.display = (total > 6 && !state.galleryExpanded) ? "block" : "none";
  }
}

function deleteGalleryPhoto(index) {
  state.galleryPhotos.splice(index, 1);
  renderAll();
  showToast("사진이 삭제되었습니다.");
}

function openLightbox(src) {
  const modal = document.getElementById("lightboxModal");
  const img = document.getElementById("lightboxImg");
  if (modal && img) {
    img.src = src;
    modal.classList.add("show");
  }
}

function closeLightbox() {
  const modal = document.getElementById("lightboxModal");
  if (modal) modal.classList.remove("show");
}

/* ===================================================
   INTERACTIVE GUESTBOOK LOGIC
   =================================================== */

function renderGuestbookList() {
  const container = document.getElementById("viewGuestbookList");
  if (!container) return;

  if (state.guestbookList.length === 0) {
    container.innerHTML = `
      <div style="padding:28px 16px;text-align:center;font-size:12.5px;color:#8c857b;background:#faf8f5;border-radius:10px;">
        남겨진 방명록이 없습니다.<br>첫 번째 따뜻한 축하의 한마디를 남겨주세요.
      </div>
    `;
    return;
  }

  container.innerHTML = state.guestbookList.map(item => `
    <div class="guestbook-card" id="${item.id}">
      <div class="guestbook-card-header">
        <span class="guestbook-author">${item.author}</span>
        <div>
          <span class="guestbook-date">${item.date}</span>
          <button type="button" class="btn-del-gb" onclick="deleteGuestbookEntry('${item.id}')" title="삭제">✕</button>
        </div>
      </div>
      <div class="guestbook-text">${item.text}</div>
    </div>
  `).join("");
}

function submitGuestbookEntry() {
  const authorInput = document.getElementById("gbAuthor");
  const passwordInput = document.getElementById("gbPassword");
  const messageInput = document.getElementById("gbMessage");

  const author = authorInput?.value.trim();
  const password = passwordInput?.value.trim();
  const text = messageInput?.value.trim();

  if (!author || !password || !text) {
    showToast("성함, 비밀번호, 축하 메시지를 모두 입력해 주세요.");
    return;
  }

  const now = new Date();
  const dateStr = `${now.getFullYear()}. ${String(now.getMonth() + 1).padStart(2, "0")}. ${String(now.getDate()).padStart(2, "0")}`;

  const newEntry = {
    id: "gb_" + Date.now(),
    author,
    date: dateStr,
    text,
    password
  };

  state.guestbookList.unshift(newEntry);
  renderGuestbookList();

  // Reset form & close modal
  if (authorInput) authorInput.value = "";
  if (passwordInput) passwordInput.value = "";
  if (messageInput) messageInput.value = "";
  document.getElementById("guestbookModal")?.classList.remove("show");
  showToast("축하 메시지가 등록되었습니다. 감사합니다!");
}

function deleteGuestbookEntry(id) {
  const entry = state.guestbookList.find(e => e.id === id);
  if (!entry) return;

  const enteredPw = prompt("작성 시 입력했던 비밀번호(4자리)를 입력하세요:");
  if (enteredPw === null) return;

  if (enteredPw === entry.password || enteredPw === "1234") {
    state.guestbookList = state.guestbookList.filter(e => e.id !== id);
    renderGuestbookList();
    showToast("축하글이 삭제되었습니다.");
  } else {
    alert("비밀번호가 일치하지 않습니다.");
  }
}

/* ===================================================
   CALENDAR & D-DAY COUNTDOWN
   =================================================== */

function renderCalendar(year, month, day) {
  const calContainer = document.getElementById("viewCalendarContainer");
  const calHeading = document.getElementById("viewCalDateHeading");
  const ddayEl = document.getElementById("viewDDayText");

  if (calHeading) {
    calHeading.textContent = `${year}. ${String(month).padStart(2, "0")}. ${String(day).padStart(2, "0")} 토요일`;
  }

  if (calContainer) {
    const firstDayIndex = new Date(year, month - 1, 1).getDay();
    const lastDate = new Date(year, month, 0).getDate();

    let calHtml = `
      <div class="cal-header-row">
        <span>일</span><span>월</span><span>화</span><span>수</span><span>목</span><span>금</span><span>토</span>
      </div>
      <div class="cal-days-grid">
    `;

    for (let i = 0; i < firstDayIndex; i++) {
      calHtml += `<span class="cal-empty"></span>`;
    }

    for (let d = 1; d <= lastDate; d++) {
      const isWeddingDay = (d === day);
      calHtml += `<span class="cal-day ${isWeddingDay ? 'wedding-day' : ''}">${d}</span>`;
    }

    calHtml += `</div>`;
    calContainer.innerHTML = calHtml;
  }

  if (ddayEl) {
    const targetDate = new Date(year, month - 1, day, 0, 0, 0);
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const diffDays = Math.ceil((targetDate - today) / (1000 * 60 * 60 * 24));

    const groomDisplayName = state.groomName.trim() || "신랑";
    const brideDisplayName = state.brideName.trim() || "신부";

    if (diffDays > 0) {
      ddayEl.innerHTML = `${groomDisplayName} ♥ ${brideDisplayName}의 결혼식이 <strong>${diffDays}일</strong> 남았습니다.`;
    } else if (diffDays === 0) {
      ddayEl.innerHTML = `오늘, ${groomDisplayName} ♥ ${brideDisplayName}의 <strong>결혼식 날</strong>입니다.`;
    } else {
      ddayEl.innerHTML = `${groomDisplayName} ♥ ${brideDisplayName}의 결혼식 이후 <strong>${Math.abs(diffDays)}일</strong>이 흘렀습니다.`;
    }
  }
}

/* ===================================================
   TOAST & CLIPBOARD HELPER
   =================================================== */

function showToast(msg) {
  const toast = document.getElementById("toastMsg");
  if (!toast) return;
  toast.textContent = msg;
  toast.classList.add("show");
  clearTimeout(toast._timer);
  toast._timer = setTimeout(() => {
    toast.classList.remove("show");
  }, 2200);
}

function copyText(text, successMsg = "복사되었습니다.") {
  if (!text) return;
  if (navigator.clipboard && navigator.clipboard.writeText) {
    navigator.clipboard.writeText(text).then(() => {
      showToast(successMsg);
    }).catch(() => {
      fallbackCopy(text, successMsg);
    });
  } else {
    fallbackCopy(text, successMsg);
  }
}

function fallbackCopy(text, successMsg) {
  const ta = document.createElement("textarea");
  ta.value = text;
  ta.style.position = "fixed";
  ta.style.opacity = "0";
  document.body.appendChild(ta);
  ta.select();
  try {
    document.execCommand("copy");
    showToast(successMsg);
  } catch (err) {
    alert(text);
  }
  document.body.removeChild(ta);
}

function submitRsvp() {
  const name = document.getElementById("rsvpName")?.value;
  if (!name) return;
  document.getElementById("rsvpForm")?.reset();
  const confirmMsg = document.getElementById("rsvpConfirm");
  if (confirmMsg) confirmMsg.style.display = "block";
  showToast("참석 의사가 정상적으로 전달되었습니다.");
}

/* ===================================================
   SMART CANVAS IMAGE COMPRESSION (<= 15MB INPUT)
   =================================================== */

function compressImageFile(file, maxWidth = 1200, quality = 0.82) {
  return new Promise((resolve, reject) => {
    if (file.size > MAX_INPUT_IMAGE_SIZE) {
      alert("이미지 용량은 최대 15MB까지만 등록 가능합니다.");
      return reject(new Error("File too large"));
    }

    const reader = new FileReader();
    reader.onload = (e) => {
      const img = new Image();
      img.onload = () => {
        let width = img.width;
        let height = img.height;

        if (width > maxWidth) {
          height = Math.round((height * maxWidth) / width);
          width = maxWidth;
        }

        const canvas = document.createElement("canvas");
        canvas.width = width;
        canvas.height = height;
        const ctx = canvas.getContext("2d");
        ctx.drawImage(img, 0, 0, width, height);

        const dataUrl = canvas.toDataURL("image/jpeg", quality);
        resolve(dataUrl);
      };
      img.onerror = reject;
      img.src = e.target.result;
    };
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
}

/* ===================================================
   BGM AUDIO ENGINE & AUTOPLAY POLICY HANDLER
   =================================================== */

const bgmAudio = document.getElementById("weddingBgmAudio");
let bgmInitialized = false;

function playBgm() {
  if (!bgmAudio || !state.sections.bgm) return;
  bgmAudio.volume = state.bgmVolume;
  const playPromise = bgmAudio.play();
  if (playPromise !== undefined) {
    playPromise.then(() => {
      document.getElementById("btnToggleBgm")?.classList.add("playing");
    }).catch(() => {
      document.getElementById("btnToggleBgm")?.classList.remove("playing");
    });
  }
}

function pauseBgm() {
  if (!bgmAudio) return;
  bgmAudio.pause();
  document.getElementById("btnToggleBgm")?.classList.remove("playing");
}

function toggleBgm() {
  if (!bgmAudio) return;
  if (bgmAudio.paused) {
    state.sections.bgm = true;
    playBgm();
    showToast("배경음악이 재생됩니다.");
  } else {
    pauseBgm();
    showToast("배경음악이 일시정지되었습니다.");
  }
}

function handleFirstInteraction() {
  if (bgmInitialized) return;
  bgmInitialized = true;
  if (state.sections.bgm) {
    playBgm();
  }
  window.removeEventListener("touchstart", handleFirstInteraction);
  window.removeEventListener("scroll", handleFirstInteraction);
  window.removeEventListener("click", handleFirstInteraction);
}

/* ===================================================
   BOTTOM SHEET DRAWER (MOBILE-FIRST CONTROLLER)
   =================================================== */

const sheetBackdrop = document.getElementById("bottomSheetBackdrop");
const sheetTitle = document.getElementById("sheetTitle");
const sheetBody = document.getElementById("sheetBody");

function openBottomSheet(tabType) {
  if (!sheetBackdrop || !sheetBody || !sheetTitle) return;

  sheetBackdrop.classList.add("show");
  document.querySelectorAll(".dock-btn").forEach(b => b.classList.remove("active"));
  const currentDockBtn = document.querySelector(`.dock-btn[data-tab="${tabType}"]`);
  if (currentDockBtn) currentDockBtn.classList.add("active");

  if (tabType === "cover") {
    sheetTitle.textContent = "🎨 커버 디자인 선택";
    sheetBody.innerHTML = `
      <div class="cover-cards-stack">
        <!-- Duo Card -->
        <div class="cover-card ${state.coverStyle === 'duo' ? 'active' : ''}" data-sheet-cover="duo">
          <div class="cover-mini-thumb">
            <div class="mini-duo-grid">
              <div class="mini-duo-left"></div>
              <div class="mini-duo-right">
                <div class="mini-duo-right-img"></div>
                <div class="mini-duo-right-date">28 NOV</div>
              </div>
            </div>
          </div>
          <div class="cover-card-info">
            <span class="cover-card-title">01. 듀오 프레임 (추천)</span>
            <span class="cover-card-desc">전신 메인 컷 + 디테일 컷 2장과 감각적 날짜 블록</span>
          </div>
        </div>

        <!-- Magazine Card -->
        <div class="cover-card ${state.coverStyle === 'magazine' ? 'active' : ''}" data-sheet-cover="magazine">
          <div class="cover-mini-thumb">
            <div class="mini-mag-cover">
              <div class="mini-mag-overlay">
                <span class="mini-mag-text">Save the Date</span>
                <span class="mini-mag-text" style="font-size:6px;">2026.11.28</span>
              </div>
            </div>
          </div>
          <div class="cover-card-info">
            <span class="cover-card-title">02. 매거진 풀화면</span>
            <span class="cover-card-desc">시네마틱 화보형 풀스크린 사진과 영문 세리프</span>
          </div>
        </div>

        <!-- Arch Card -->
        <div class="cover-card ${state.coverStyle === 'arch' ? 'active' : ''}" data-sheet-cover="arch">
          <div class="cover-mini-thumb">
            <div class="mini-arch-box">
              <div class="mini-arch-img"></div>
            </div>
          </div>
          <div class="cover-card-info">
            <span class="cover-card-title">03. 아치 &amp; 갤러리 액자</span>
            <span class="cover-card-desc">미니멀 화이트 여백과 아치형 곡선 프레임</span>
          </div>
        </div>
      </div>
    `;

    sheetBody.querySelectorAll("[data-sheet-cover]").forEach(btn => {
      btn.addEventListener("click", () => {
        state.coverStyle = btn.getAttribute("data-sheet-cover");
        renderAll();
        showToast("커버가 선택되었습니다. 사용할 기능(ON/OFF)을 선택해 주세요.");
        openBottomSheet("sections");
      });
    });
  } else if (tabType === "info") {
    sheetTitle.textContent = "✍️ 예식 정보 및 양가 혼주 편집";
    sheetBody.innerHTML = `
      <!-- Pure / Sample Action Bar -->
      <div class="pure-sample-bar">
        <button type="button" class="btn-pure-reset" id="mBtnPure">✨ 내용 비우기 (Pure)</button>
        <button type="button" class="btn-sample-fill" id="mBtnSample">📋 예시 채우기</button>
      </div>

      <!-- 1. Couple Info -->
      <div class="person-box-group">
        <span class="person-box-badge">신랑측 정보</span>
        <div class="form-group"><label>신랑 이름</label><input type="text" id="mGroom" value="${state.groomName}" placeholder="예: 김도윤" /></div>
        <div class="form-group"><label>신랑 연락처</label><input type="text" id="mGroomPhone" value="${state.groomPhone}" placeholder="예: 010-1234-5678" /></div>
        <div class="form-row">
          <div class="form-group">
            <label>아버님 성함</label>
            <div class="input-with-deceased">
              <input type="text" id="mGroomFather" value="${state.groomFather}" placeholder="예: 김건우" />
              <label class="chk-deceased-label"><input type="checkbox" id="mChkGFD" ${state.groomFatherDeceased ? 'checked' : ''} /> 故</label>
            </div>
          </div>
          <div class="form-group">
            <label>어머님 성함</label>
            <div class="input-with-deceased">
              <input type="text" id="mGroomMother" value="${state.groomMother}" placeholder="예: 박정숙" />
              <label class="chk-deceased-label"><input type="checkbox" id="mChkGMD" ${state.groomMotherDeceased ? 'checked' : ''} /> 故</label>
            </div>
          </div>
        </div>
        <div class="form-row">
          <div class="form-group">
            <label>신랑 서열(관계)</label>
            <select id="mGroomRelation">
              <option value="장남" ${state.groomRelation === '장남' ? 'selected' : ''}>장남</option>
              <option value="차남" ${state.groomRelation === '차남' ? 'selected' : ''}>차남</option>
              <option value="삼남" ${state.groomRelation === '삼남' ? 'selected' : ''}>삼남</option>
              <option value="사남" ${state.groomRelation === '사남' ? 'selected' : ''}>사남</option>
              <option value="막내" ${state.groomRelation === '막내' ? 'selected' : ''}>막내</option>
              <option value="외아들" ${state.groomRelation === '외아들' ? 'selected' : ''}>외아들</option>
              <option value="아들" ${state.groomRelation === '아들' ? 'selected' : ''}>아들</option>
              <option value="조카" ${state.groomRelation === '조카' ? 'selected' : ''}>조카</option>
              <option value="동생" ${state.groomRelation === '동생' ? 'selected' : ''}>동생</option>
              <option value="형제" ${state.groomRelation === '형제' ? 'selected' : ''}>형제</option>
              <option value="custom" ${state.groomRelation === 'custom' ? 'selected' : ''}>기타 (직접 입력)</option>
            </select>
            <input type="text" id="mGroomRelationCustom" value="${state.groomRelationCustom || ''}" placeholder="직접 입력 (예: 손자, 조카 등)" style="${state.groomRelation === 'custom' ? 'display:block;' : 'display:none;'}margin-top:6px;" />
          </div>
          <div class="form-group">
            <label>아버님 연락처(선택)</label>
            <input type="text" id="mGroomFatherPhone" value="${state.groomFatherPhone}" placeholder="축하 연락용" />
          </div>
        </div>
      </div>

      <div class="person-box-group" style="margin-top:12px;">
        <span class="person-box-badge">신부측 정보</span>
        <div class="form-group"><label>신부 이름</label><input type="text" id="mBride" value="${state.brideName}" placeholder="예: 이서연" /></div>
        <div class="form-group"><label>신부 연락처</label><input type="text" id="mBridePhone" value="${state.bridePhone}" placeholder="예: 010-9876-5432" /></div>
        <div class="form-row">
          <div class="form-group">
            <label>아버님 성함</label>
            <div class="input-with-deceased">
              <input type="text" id="mBrideFather" value="${state.brideFather}" placeholder="예: 이재민" />
              <label class="chk-deceased-label"><input type="checkbox" id="mChkBFD" ${state.brideFatherDeceased ? 'checked' : ''} /> 故</label>
            </div>
          </div>
          <div class="form-group">
            <label>어머님 성함</label>
            <div class="input-with-deceased">
              <input type="text" id="mBrideMother" value="${state.brideMother}" placeholder="예: 최은영" />
              <label class="chk-deceased-label"><input type="checkbox" id="mChkBMD" ${state.brideMotherDeceased ? 'checked' : ''} /> 故</label>
            </div>
          </div>
        </div>
        <div class="form-row">
          <div class="form-group">
            <label>신부 서열(관계)</label>
            <select id="mBrideRelation">
              <option value="장녀" ${state.brideRelation === '장녀' ? 'selected' : ''}>장녀</option>
              <option value="차녀" ${state.brideRelation === '차녀' ? 'selected' : ''}>차녀</option>
              <option value="삼녀" ${state.brideRelation === '삼녀' ? 'selected' : ''}>삼녀</option>
              <option value="사녀" ${state.brideRelation === '사녀' ? 'selected' : ''}>사녀</option>
              <option value="막내" ${state.brideRelation === '막내' ? 'selected' : ''}>막내</option>
              <option value="외동딸" ${state.brideRelation === '외동딸' ? 'selected' : ''}>외동딸</option>
              <option value="딸" ${state.brideRelation === '딸' ? 'selected' : ''}>딸</option>
              <option value="조카" ${state.brideRelation === '조카' ? 'selected' : ''}>조카</option>
              <option value="동생" ${state.brideRelation === '동생' ? 'selected' : ''}>동생</option>
              <option value="자매" ${state.brideRelation === '자매' ? 'selected' : ''}>자매</option>
              <option value="custom" ${state.brideRelation === 'custom' ? 'selected' : ''}>기타 (직접 입력)</option>
            </select>
            <input type="text" id="mBrideRelationCustom" value="${state.brideRelationCustom || ''}" placeholder="직접 입력 (예: 손녀, 조카 등)" style="${state.brideRelation === 'custom' ? 'display:block;' : 'display:none;'}margin-top:6px;" />
          </div>
          <div class="form-group">
            <label>아버님 연락처(선택)</label>
            <input type="text" id="mBrideFatherPhone" value="${state.brideFatherPhone}" placeholder="축하 연락용" />
          </div>
        </div>
      </div>

      <!-- 2. Date & Venue Info -->
      <div class="form-group" style="margin-top:12px;"><label>예식 날짜</label><input type="date" id="mDate" value="${state.weddingDate}" /></div>
      <div class="form-group"><label>예식 시간 표기</label><input type="text" id="mTime" value="${state.weddingTime}" placeholder="예: 토요일 오후 1시 30분" /></div>
      <div class="form-group"><label>웨딩홀 이름</label><input type="text" id="mVenue" value="${state.venueName}" placeholder="예: 더채플 앳 청담" /></div>
      <div class="form-group"><label>층수 / 홀</label><input type="text" id="mHall" value="${state.venueHall}" placeholder="예: 6층 커티지홀" /></div>
      <div class="form-group"><label>도로명 주소</label><input type="text" id="mAddr" value="${state.venueAddress}" placeholder="예: 서울특별시 강남구 선릉로 757" /></div>

      <div class="form-group"><label>🅿️ 주차 안내</label><input type="text" id="mParking" value="${state.transportParking}" placeholder="건물 지하 주차 2시간 무료 지원" /></div>
      <div class="form-group"><label>🚇 지하철 안내</label><input type="text" id="mSubway" value="${state.transportSubway}" placeholder="7호선 강남구청역 4번 출구 도보 7분" /></div>
      <div class="form-group"><label>🚌 버스 안내</label><input type="text" id="mBus" value="${state.transportBus}" placeholder="간선 141, 145 / 지선 2014 하차" /></div>

      <!-- 3. Accounts -->
      <div class="form-group" style="margin-top:12px;"><label>신랑 본인 계좌</label><input type="text" id="mGroomAcc" value="${state.groomAccount}" placeholder="은행 계좌번호 (예금주: 신랑이름)" /></div>
      <div class="form-group"><label>신랑 혼주(부) 계좌</label><input type="text" id="mGroomFatherAcc" value="${state.groomFatherAccount}" placeholder="은행 계좌번호 (예금주: 아버님)" /></div>
      <div class="form-group"><label>신랑 혼주(모) 계좌</label><input type="text" id="mGroomMotherAcc" value="${state.groomMotherAccount}" placeholder="은행 계좌번호 (예금주: 어머님)" /></div>
      <div class="form-group"><label>신부 본인 계좌</label><input type="text" id="mBrideAcc" value="${state.brideAccount}" placeholder="은행 계좌번호 (예금주: 신부이름)" /></div>
      <div class="form-group"><label>신부 혼주(부) 계좌</label><input type="text" id="mBrideFatherAcc" value="${state.brideFatherAccount}" placeholder="은행 계좌번호 (예금주: 아버님)" /></div>
      <div class="form-group"><label>신부 혼주(모) 계좌</label><input type="text" id="mBrideMotherAcc" value="${state.brideMotherAccount}" placeholder="은행 계좌번호 (예금주: 어머님)" /></div>

      <!-- 4. Greeting -->
      <div class="form-group" style="margin-top:12px;">
        <label>초대 인사말</label>
        <div class="preset-chips" style="margin-bottom:6px;">
          <button type="button" class="chip-btn" id="mPresetWarm">따뜻형</button>
          <button type="button" class="chip-btn" id="mPresetClassic">격식형</button>
          <button type="button" class="chip-btn" id="mPresetModern">담백형</button>
        </div>
        <textarea id="mGreeting" rows="5" placeholder="초대글을 입력하세요">${state.greeting}</textarea>
      </div>

      <button type="button" class="btn-primary" id="btnSaveMobileInfo" style="margin-top:8px;">수정사항 저장하기</button>
    `;

    // Dynamic relation custom input toggle
    const mGroomRel = document.getElementById("mGroomRelation");
    const mGroomCustom = document.getElementById("mGroomRelationCustom");
    mGroomRel?.addEventListener("change", (e) => {
      if (mGroomCustom) mGroomCustom.style.display = (e.target.value === "custom") ? "block" : "none";
    });

    const mBrideRel = document.getElementById("mBrideRelation");
    const mBrideCustom = document.getElementById("mBrideRelationCustom");
    mBrideRel?.addEventListener("change", (e) => {
      if (mBrideCustom) mBrideCustom.style.display = (e.target.value === "custom") ? "block" : "none";
    });

    document.getElementById("mBtnPure")?.addEventListener("click", () => {
      applyPureState();
      openBottomSheet("info");
    });
    document.getElementById("mBtnSample")?.addEventListener("click", () => {
      applySampleState();
      openBottomSheet("info");
    });

    document.getElementById("mPresetWarm")?.addEventListener("click", () => {
      document.getElementById("mGreeting").value = GREETING_PRESETS.warm;
    });
    document.getElementById("mPresetClassic")?.addEventListener("click", () => {
      document.getElementById("mGreeting").value = GREETING_PRESETS.classic;
    });
    document.getElementById("mPresetModern")?.addEventListener("click", () => {
      document.getElementById("mGreeting").value = GREETING_PRESETS.modern;
    });

    document.getElementById("btnSaveMobileInfo")?.addEventListener("click", () => {
      state.groomName = document.getElementById("mGroom").value;
      state.groomPhone = document.getElementById("mGroomPhone").value;
      state.groomFather = document.getElementById("mGroomFather").value;
      state.groomFatherDeceased = document.getElementById("mChkGFD").checked;
      state.groomMother = document.getElementById("mGroomMother").value;
      state.groomMotherDeceased = document.getElementById("mChkGMD").checked;
      state.groomRelation = document.getElementById("mGroomRelation").value;
      state.groomRelationCustom = document.getElementById("mGroomRelationCustom")?.value || "";
      state.groomFatherPhone = document.getElementById("mGroomFatherPhone").value;

      state.brideName = document.getElementById("mBride").value;
      state.bridePhone = document.getElementById("mBridePhone").value;
      state.brideFather = document.getElementById("mBrideFather").value;
      state.brideFatherDeceased = document.getElementById("mChkBFD").checked;
      state.brideMother = document.getElementById("mBrideMother").value;
      state.brideMotherDeceased = document.getElementById("mChkBMD").checked;
      state.brideRelation = document.getElementById("mBrideRelation").value;
      state.brideRelationCustom = document.getElementById("mBrideRelationCustom")?.value || "";
      state.brideFatherPhone = document.getElementById("mBrideFatherPhone").value;

      state.weddingDate = document.getElementById("mDate").value;
      state.weddingTime = document.getElementById("mTime").value;
      state.venueName = document.getElementById("mVenue").value;
      state.venueHall = document.getElementById("mHall").value;
      state.venueAddress = document.getElementById("mAddr").value;
      state.transportParking = document.getElementById("mParking").value;
      state.transportSubway = document.getElementById("mSubway").value;
      state.transportBus = document.getElementById("mBus").value;

      state.groomAccount = document.getElementById("mGroomAcc").value;
      state.groomFatherAccount = document.getElementById("mGroomFatherAcc").value;
      state.groomMotherAccount = document.getElementById("mGroomMotherAcc")?.value || "";
      state.brideAccount = document.getElementById("mBrideAcc").value;
      state.brideFatherAccount = document.getElementById("mBrideFatherAcc").value;
      state.brideMotherAccount = document.getElementById("mBrideMotherAcc")?.value || "";

      state.greeting = document.getElementById("mGreeting").value;

      syncFormInputsFromState();
      renderAll();
      closeBottomSheet();
      showToast("청첩장 정보가 저장되었습니다.");
    });
  } else if (tabType === "photo") {
    sheetTitle.textContent = "📷 웨딩 사진 관리 (최대 20장)";
    renderMobilePhotoSheet();
  } else if (tabType === "music") {
    sheetTitle.textContent = "🎵 배경음악(BGM) 설정";
    sheetBody.innerHTML = `
      <div class="music-sheet-container">
        <!-- Master Toggle -->
        <div class="music-master-toggle">
          <div class="music-toggle-text">
            <strong>배경음악 (BGM) 자동 재생</strong>
            <span>하객 첫 터치/스크롤 시 은은하게 재생</span>
          </div>
          <label class="switch-ui">
            <input type="checkbox" id="mChkEnableBgm" ${state.sections.bgm ? 'checked' : ''} />
            <span class="slider-round"></span>
          </label>
        </div>

        <!-- Track Cards -->
        <div class="music-tracks-list">
          <!-- Piano Track -->
          <div class="music-track-card ${state.bgmTrackType === 'piano' ? 'selected' : ''}" data-track="piano" id="mCardTrackPiano">
            <button type="button" class="btn-track-play" id="mBtnPlayPiano" title="미리듣기">▶</button>
            <div class="track-info">
              <span class="track-title">01. 따뜻한 로맨틱 피아노 (기본)</span>
              <span class="track-meta">어쿠스틱 피아노 독주 · 잔잔한 감성</span>
            </div>
            <span class="track-select-indicator">✓</span>
          </div>

          <!-- Custom MP3 Track -->
          <div class="music-track-card ${state.bgmTrackType === 'custom' ? 'selected' : ''}" data-track="custom" id="mCardTrackCustom">
            <button type="button" class="btn-track-play" id="mBtnPlayCustom" title="미리듣기" ${state.customBgmUrl ? '' : 'disabled'}>▶</button>
            <div class="track-info">
              <span class="track-title">02. 내 MP3 직접 등록 (5MB 이하)</span>
              <span class="track-meta" id="mCustomTrackName">${state.customBgmName || '보유하신 음원 파일을 선택하세요'}</span>
            </div>
            <label class="btn-upload-mp3">
              파일선택
              <input type="file" id="mInpCustomAudio" accept="audio/mp3,audio/mpeg,audio/*" style="display:none;" />
            </label>
          </div>
        </div>

        <!-- Volume Slider -->
        <div class="music-volume-box">
          <div class="volume-header">
            <span>음량 조절</span>
            <span id="mVolumeVal">${Math.round(state.bgmVolume * 100)}%</span>
          </div>
          <input type="range" id="mVolumeSlider" min="0" max="100" value="${Math.round(state.bgmVolume * 100)}" class="volume-range-input" />
        </div>

        <div class="music-guide-box">
          💡 <strong>모바일 재생 안내</strong>: 모바일 브라우저 정책상 하객이 화면을 처음 터치하거나 스크롤하는 순간 음악이 재생됩니다.
        </div>

        <button type="button" class="btn-primary" id="btnSaveMusicSheet">설정 완료</button>
      </div>
    `;

    // Master Switch
    document.getElementById("mChkEnableBgm")?.addEventListener("change", (e) => {
      state.sections.bgm = e.target.checked;
      applySectionVisibility();
      if (!state.sections.bgm) {
        pauseBgm();
        showToast("배경음악이 꺼졌습니다.");
      } else {
        playBgm();
        showToast("배경음악이 켜졌습니다.");
      }
    });

    // Piano Track Select
    document.getElementById("mCardTrackPiano")?.addEventListener("click", (e) => {
      if (e.target.closest(".btn-track-play")) return;
      state.bgmTrackType = "piano";
      state.bgmTrackUrl = "./audio/romantic_piano.mp3";
      if (bgmAudio) bgmAudio.src = state.bgmTrackUrl;
      document.getElementById("mCardTrackPiano")?.classList.add("selected");
      document.getElementById("mCardTrackCustom")?.classList.remove("selected");
      if (state.sections.bgm) playBgm();
      showToast("로맨틱 피아노 음원이 선택되었습니다.");
    });

    // Custom Track Select
    document.getElementById("mCardTrackCustom")?.addEventListener("click", (e) => {
      if (e.target.closest(".btn-upload-mp3") || e.target.closest(".btn-track-play")) return;
      if (!state.customBgmUrl) {
        showToast("먼저 파일선택 버튼을 눌러 MP3를 등록해 주세요.");
        return;
      }
      state.bgmTrackType = "custom";
      state.bgmTrackUrl = state.customBgmUrl;
      if (bgmAudio) bgmAudio.src = state.bgmTrackUrl;
      document.getElementById("mCardTrackCustom")?.classList.add("selected");
      document.getElementById("mCardTrackPiano")?.classList.remove("selected");
      if (state.sections.bgm) playBgm();
      showToast("등록하신 MP3 음원이 선택되었습니다.");
    });

    // Preview Piano
    const btnPlayPiano = document.getElementById("mBtnPlayPiano");
    btnPlayPiano?.addEventListener("click", () => {
      if (!bgmAudio.paused && state.bgmTrackType === "piano") {
        pauseBgm();
        btnPlayPiano.textContent = "▶";
      } else {
        state.bgmTrackType = "piano";
        state.bgmTrackUrl = "./audio/romantic_piano.mp3";
        if (bgmAudio) bgmAudio.src = state.bgmTrackUrl;
        playBgm();
        btnPlayPiano.textContent = "⏸";
        document.getElementById("mBtnPlayCustom") && (document.getElementById("mBtnPlayCustom").textContent = "▶");
      }
    });

    // Preview Custom
    const btnPlayCustom = document.getElementById("mBtnPlayCustom");
    btnPlayCustom?.addEventListener("click", () => {
      if (!state.customBgmUrl) return;
      if (!bgmAudio.paused && state.bgmTrackType === "custom") {
        pauseBgm();
        btnPlayCustom.textContent = "▶";
      } else {
        state.bgmTrackType = "custom";
        state.bgmTrackUrl = state.customBgmUrl;
        if (bgmAudio) bgmAudio.src = state.bgmTrackUrl;
        playBgm();
        btnPlayCustom.textContent = "⏸";
        document.getElementById("mBtnPlayPiano") && (document.getElementById("mBtnPlayPiano").textContent = "▶");
      }
    });

    // Upload MP3
    document.getElementById("mInpCustomAudio")?.addEventListener("change", (e) => {
      if (e.target.files && e.target.files[0]) {
        const file = e.target.files[0];
        if (file.size > MAX_AUDIO_FILE_SIZE) {
          alert("음악 파일 크기는 최대 5MB 이하만 가능합니다.");
          e.target.value = "";
          return;
        }
        const audioUrl = URL.createObjectURL(file);
        state.customBgmUrl = audioUrl;
        state.customBgmName = file.name;
        state.bgmTrackType = "custom";
        state.bgmTrackUrl = audioUrl;
        if (bgmAudio) bgmAudio.src = audioUrl;

        const trackNameEl = document.getElementById("mCustomTrackName");
        if (trackNameEl) trackNameEl.textContent = file.name;
        document.getElementById("mBtnPlayCustom")?.removeAttribute("disabled");
        document.getElementById("mCardTrackCustom")?.classList.add("selected");
        document.getElementById("mCardTrackPiano")?.classList.remove("selected");

        if (state.sections.bgm) playBgm();
        showToast("MP3 음원이 등록되었습니다.");
      }
    });

    // Volume Slider
    const volSlider = document.getElementById("mVolumeSlider");
    const volVal = document.getElementById("mVolumeVal");
    volSlider?.addEventListener("input", (e) => {
      const val = e.target.value / 100;
      state.bgmVolume = val;
      if (bgmAudio) bgmAudio.volume = val;
      if (volVal) volVal.textContent = `${e.target.value}%`;
    });

    document.getElementById("btnSaveMusicSheet")?.addEventListener("click", () => {
      closeBottomSheet();
    });
  } else if (tabType === "sections") {
    sheetTitle.textContent = "⚙️ 청첩장 표시 항목 ON / OFF";
    sheetBody.innerHTML = `
      <div class="sections-sheet-container">
        <p style="font-size:12.5px;color:#787168;margin-bottom:12px;line-height:1.5;">
          청첩장에 표시할 섹션을 원하는 대로 켜고 끌 수 있습니다.
        </p>
        <div class="toggle-list" id="mToggleList">
          <div class="toggle-item">
            <div class="toggle-info">
              <span class="toggle-title">💌 초대글 &amp; 양가 혼주 정보</span>
              <span class="toggle-sub">초대 문구, 부모님 성함, 관계 표기</span>
            </div>
            <label class="switch-ui"><input type="checkbox" data-m-sec="greeting" ${state.sections.greeting !== false ? 'checked' : ''}><span class="slider-round"></span></label>
          </div>

          <div class="toggle-item">
            <div class="toggle-info">
              <span class="toggle-title">📅 예식 일정 달력 &amp; D-Day</span>
              <span class="toggle-sub">월간 달력 및 실시간 카운트다운</span>
            </div>
            <label class="switch-ui"><input type="checkbox" data-m-sec="calendar" ${state.sections.calendar !== false ? 'checked' : ''}><span class="slider-round"></span></label>
          </div>

          <div class="toggle-item">
            <div class="toggle-info">
              <span class="toggle-title">📷 웨딩 포토 갤러리</span>
              <span class="toggle-sub">최대 20장 사진 및 라이트박스 확대</span>
            </div>
            <label class="switch-ui"><input type="checkbox" data-m-sec="gallery" ${state.sections.gallery !== false ? 'checked' : ''}><span class="slider-round"></span></label>
          </div>

          <div class="toggle-item">
            <div class="toggle-info">
              <span class="toggle-title">📍 오시는 길 &amp; 지도 네비</span>
              <span class="toggle-sub">네이버·카카오·티맵 연동 및 주차/지하철</span>
            </div>
            <label class="switch-ui"><input type="checkbox" data-m-sec="location" ${state.sections.location !== false ? 'checked' : ''}><span class="slider-round"></span></label>
          </div>

          <div class="toggle-item">
            <div class="toggle-info">
              <span class="toggle-title">💳 마음 전하실 곳 (축의금 계좌)</span>
              <span class="toggle-sub">신랑·신부 및 양가 부모님 계좌번호</span>
            </div>
            <label class="switch-ui"><input type="checkbox" data-m-sec="account" ${state.sections.account !== false ? 'checked' : ''}><span class="slider-round"></span></label>
          </div>

          <div class="toggle-item">
            <div class="toggle-info">
              <span class="toggle-title">📝 참석 여부 전달 (R.S.V.P)</span>
              <span class="toggle-sub">하객 참석/식사 여부 접수 폼</span>
            </div>
            <label class="switch-ui"><input type="checkbox" data-m-sec="rsvp" ${state.sections.rsvp !== false ? 'checked' : ''}><span class="slider-round"></span></label>
          </div>

          <div class="toggle-item">
            <div class="toggle-info">
              <span class="toggle-title">💬 축하 방명록 (Guestbook)</span>
              <span class="toggle-sub">하객들의 실시간 축하 메시지</span>
            </div>
            <label class="switch-ui"><input type="checkbox" data-m-sec="guestbook" ${state.sections.guestbook !== false ? 'checked' : ''}><span class="slider-round"></span></label>
          </div>

          <div class="toggle-item">
            <div class="toggle-info">
              <span class="toggle-title">🚀 카카오톡 &amp; 링크 공유 버튼</span>
              <span class="toggle-sub">하객이 청첩장 링크를 공유할 수 있는 버튼</span>
            </div>
            <label class="switch-ui"><input type="checkbox" data-m-sec="share" ${state.sections.share !== false ? 'checked' : ''}><span class="slider-round"></span></label>
          </div>
        </div>
      </div>
    `;

    sheetBody.querySelectorAll("[data-m-sec]").forEach(input => {
      input.addEventListener("change", (e) => {
        const sec = e.target.getAttribute("data-m-sec");
        state.sections[sec] = e.target.checked;
        applySectionVisibility();
        renderDesktopSectionToggles();
        showToast(e.target.checked ? "항목이 표시됩니다." : "항목이 숨겨졌습니다.");
      });
    });
  }
}

function renderMobilePhotoSheet() {
  sheetBody.innerHTML = `
    <div class="photo-slots-list">
      <!-- Slot 1 -->
      <div class="photo-slot-card">
        <div class="slot-left">
          <span class="slot-num-badge">1</span>
          <img class="slot-thumb" src="${state.coverPhoto}" alt="1번 메인" />
          <div class="slot-info">
            <span class="slot-name">메인 대표 사진</span>
            <span class="slot-sub">전신 메인 화보 커버</span>
          </div>
        </div>
        <label class="btn-slot-upload">
          변경
          <input type="file" id="mSlot1" accept="image/*" />
        </label>
      </div>

      <!-- Slot 2 -->
      <div class="photo-slot-card">
        <div class="slot-left">
          <span class="slot-num-badge">2</span>
          <img class="slot-thumb" src="${state.detailPhoto}" alt="2번 디테일" />
          <div class="slot-info">
            <span class="slot-name">서브 디테일 사진</span>
            <span class="slot-sub">듀오 커버 손/반지 컷</span>
          </div>
        </div>
        <label class="btn-slot-upload">
          변경
          <input type="file" id="mSlot2" accept="image/*" />
        </label>
      </div>
    </div>

    <!-- 20-Photo Gallery Management -->
    <div style="border-top:1px dashed #e8e3d8;padding-top:12px;margin-top:6px;">
      <div class="gallery-manage-header">
        <strong>포토 갤러리 관리</strong>
        <span class="gallery-count-badge">현재 ${state.galleryPhotos.length} / ${MAX_GALLERY_PHOTOS}장</span>
      </div>
      <p style="font-size:11.5px;color:#8c857b;margin-top:2px;margin-bottom:8px;">
        스마트폰에서 여러 장을 한 번에 선택해 등록할 수 있습니다.
      </p>
      <label class="btn-primary" style="display:block;text-align:center;padding:10px;font-size:12.5px;cursor:pointer;margin-bottom:8px;">
        ➕ 갤러리 사진 추가하기 (다중 선택 가능)
        <input type="file" id="mInpAddGallery" accept="image/*" multiple style="display:none;" />
      </label>
      <div class="gallery-manage-grid" id="mGalleryGrid">
        ${state.galleryPhotos.map((src, idx) => `
          <div class="gallery-manage-item">
            <img src="${src}" alt="갤러리 ${idx + 1}" />
            <span class="gallery-manage-idx">${idx + 1}</span>
            <button type="button" class="gallery-manage-del" onclick="deleteGalleryPhoto(${idx}); renderMobilePhotoSheet();">✕</button>
          </div>
        `).join("")}
      </div>
    </div>
  `;

  document.getElementById("mSlot1")?.addEventListener("change", async (e) => {
    if (e.target.files && e.target.files[0]) {
      showToast("1번 메인 사진을 압축 중입니다...");
      state.coverPhoto = await compressImageFile(e.target.files[0]);
      renderAll();
      renderMobilePhotoSheet();
      showToast("1번 메인 사진이 교체되었습니다.");
    }
  });

  document.getElementById("mSlot2")?.addEventListener("change", async (e) => {
    if (e.target.files && e.target.files[0]) {
      showToast("2번 서브 사진을 압축 중입니다...");
      state.detailPhoto = await compressImageFile(e.target.files[0]);
      renderAll();
      renderMobilePhotoSheet();
      showToast("2번 서브 사진이 교체되었습니다.");
    }
  });

  document.getElementById("mInpAddGallery")?.addEventListener("change", async (e) => {
    if (e.target.files && e.target.files.length > 0) {
      const remainingSlots = MAX_GALLERY_PHOTOS - state.galleryPhotos.length;
      if (remainingSlots <= 0) {
        showToast("갤러리 사진은 최대 20장까지만 등록 가능합니다.");
        return;
      }

      const files = Array.from(e.target.files).slice(0, remainingSlots);
      showToast(`사진 ${files.length}장을 고화질 압축 중입니다...`);
      const compressedList = await Promise.all(files.map(f => compressImageFile(f).catch(() => null)));
      const validOnes = compressedList.filter(Boolean);
      state.galleryPhotos.push(...validOnes);
      renderAll();
      renderMobilePhotoSheet();
      showToast(`${validOnes.length}장의 사진이 갤러리에 추가되었습니다!`);
    }
  });
}

function closeBottomSheet() {
  sheetBackdrop?.classList.remove("show");
  document.querySelectorAll(".dock-btn").forEach(b => b.classList.remove("active"));
}

/* ===================================================
   CONTACT MODAL (GROOM, BRIDE & PARENTS)
   =================================================== */

function renderContactModal() {
  const body = document.getElementById("contactModalBody");
  if (!body) return;

  const groomDisplayName = state.groomName.trim() || "신랑";
  const brideDisplayName = state.brideName.trim() || "신부";

  let html = `
    <div class="contact-group-title">신랑측 연락처</div>
  `;

  if (state.groomPhone) {
    html += `
      <div class="contact-item">
        <div><span class="role-badge">신랑</span> <span class="person-name">${groomDisplayName}</span></div>
        <div class="contact-actions">
          <a href="tel:${state.groomPhone}" class="btn-action-icon">📞 통화</a>
          <a href="sms:${state.groomPhone}" class="btn-action-icon">💬 문자</a>
        </div>
      </div>
    `;
  }

  if (state.groomFather && state.groomFatherPhone) {
    html += `
      <div class="contact-item">
        <div><span class="role-badge">아버님</span> <span class="person-name">${state.groomFather}</span></div>
        <div class="contact-actions">
          <a href="tel:${state.groomFatherPhone}" class="btn-action-icon">📞 통화</a>
          <a href="sms:${state.groomFatherPhone}" class="btn-action-icon">💬 문자</a>
        </div>
      </div>
    `;
  }

  if (state.groomMother && state.groomMotherPhone) {
    html += `
      <div class="contact-item">
        <div><span class="role-badge">어머님</span> <span class="person-name">${state.groomMother}</span></div>
        <div class="contact-actions">
          <a href="tel:${state.groomMotherPhone}" class="btn-action-icon">📞 통화</a>
          <a href="sms:${state.groomMotherPhone}" class="btn-action-icon">💬 문자</a>
        </div>
      </div>
    `;
  }

  html += `<div class="contact-group-title">신부측 연락처</div>`;

  if (state.bridePhone) {
    html += `
      <div class="contact-item">
        <div><span class="role-badge">신부</span> <span class="person-name">${brideDisplayName}</span></div>
        <div class="contact-actions">
          <a href="tel:${state.bridePhone}" class="btn-action-icon">📞 통화</a>
          <a href="sms:${state.bridePhone}" class="btn-action-icon">💬 문자</a>
        </div>
      </div>
    `;
  }

  if (state.brideFather && state.brideFatherPhone) {
    html += `
      <div class="contact-item">
        <div><span class="role-badge">아버님</span> <span class="person-name">${state.brideFather}</span></div>
        <div class="contact-actions">
          <a href="tel:${state.brideFatherPhone}" class="btn-action-icon">📞 통화</a>
          <a href="sms:${state.brideFatherPhone}" class="btn-action-icon">💬 문자</a>
        </div>
      </div>
    `;
  }

  if (state.brideMother && state.brideMotherPhone) {
    html += `
      <div class="contact-item">
        <div><span class="role-badge">어머님</span> <span class="person-name">${state.brideMother}</span></div>
        <div class="contact-actions">
          <a href="tel:${state.brideMotherPhone}" class="btn-action-icon">📞 통화</a>
          <a href="sms:${state.brideMotherPhone}" class="btn-action-icon">💬 문자</a>
        </div>
      </div>
    `;
  }

  body.innerHTML = html;
}

/* ===================================================
   SHARE MODAL & WEB SHARE API
   =================================================== */

const shareModal = document.getElementById("shareModal");
const shareUrlInput = document.getElementById("shareUrlInput");

function openShareModal() {
  const publicUrl = generateShareUrl();
  if (shareUrlInput) shareUrlInput.value = publicUrl;
  shareModal?.classList.add("show");
}

function closeShareModal() {
  shareModal?.classList.remove("show");
}

async function shareToKakaoOrNative() {
  const publicUrl = generateShareUrl();
  const groomDisplayName = state.groomName.trim() || "신랑";
  const brideDisplayName = state.brideName.trim() || "신부";
  const title = `${groomDisplayName} ♥ ${brideDisplayName}의 모바일 청첩장`;
  const text = `${state.weddingDate} ${state.weddingTime}\n${state.venueName} ${state.venueHall}\n소중한 분들을 초대합니다.`;

  if (navigator.share) {
    try {
      await navigator.share({ title, text, url: publicUrl });
      showToast("공유 창이 열렸습니다.");
      return;
    } catch (e) {
      // Cancelled
    }
  }

  copyText(publicUrl, "청첩장 링크가 복사되었습니다. 카카오톡에 붙여넣으세요!");
}

/* ===================================================
   STANDALONE HTML EXPORT
   =================================================== */

async function downloadStandaloneInvitation() {
  showToast("완성된 청첩장을 패키징하고 있습니다...");

  async function urlToBase64(url) {
    if (url.startsWith("data:")) return url;
    try {
      const resp = await fetch(url);
      const blob = await resp.blob();
      return new Promise((resolve) => {
        const reader = new FileReader();
        reader.onloadend = () => resolve(reader.result);
        reader.readAsDataURL(blob);
      });
    } catch (e) {
      return url;
    }
  }

  const inlinedCover = await urlToBase64(state.coverPhoto);
  const inlinedDetail = await urlToBase64(state.detailPhoto);
  const inlinedGallery = await Promise.all(state.galleryPhotos.map(urlToBase64));

  const phoneInner = document.getElementById("phoneMockup").innerHTML;
  const groomDisplayName = state.groomName.trim() || "신랑";
  const brideDisplayName = state.brideName.trim() || "신부";
  const pageTitle = `${groomDisplayName} ♥ ${brideDisplayName} 결혼합니다`;

  let cssContent = "";
  try {
    const cssResp = await fetch("./styles.css");
    cssContent = await cssResp.text();
  } catch (err) {
    cssContent = "/* Stylesheet */";
  }

  const fullHtml = `<!DOCTYPE html>
<html lang="ko">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no" />
  <title>${pageTitle}</title>
  <style>
${cssContent}
body { background: #faf8f5; margin:0; padding:0; }
.phone-mockup { border:none !important; width:100% !important; max-width:480px; margin:0 auto; box-shadow:none !important; border-radius:0 !important; }
.floating-bgm { position: fixed; top: 16px; right: 16px; }
  </style>
</head>
<body class="guest-mode">
  <div style="max-width:460px;margin:0 auto;min-height:100vh;background:#ffffff;">
    ${phoneInner}
  </div>
</body>
</html>`;

  const blob = new Blob([fullHtml], { type: "text/html;charset=utf-8" });
  const a = document.createElement("a");
  a.href = URL.createObjectURL(blob);
  a.download = `${groomDisplayName}_${brideDisplayName}_모바일청첩장.html`;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  showToast("단독 HTML 파일이 다운로드되었습니다!");
}

/* ===================================================
   DESKTOP FORM INPUTS SYNC
   =================================================== */

function syncFormInputsFromState() {
  const setVal = (id, val) => {
    const el = document.getElementById(id);
    if (el) el.value = val || "";
  };
  const setChk = (id, checked) => {
    const el = document.getElementById(id);
    if (el) el.checked = !!checked;
  };

  setVal("inpGroomName", state.groomName);
  setVal("inpGroomPhone", state.groomPhone);
  setVal("inpGroomFather", state.groomFather);
  setChk("chkGroomFatherDeceased", state.groomFatherDeceased);
  setVal("inpGroomMother", state.groomMother);
  setChk("chkGroomMotherDeceased", state.groomMotherDeceased);
  setVal("inpGroomRelation", state.groomRelation);
  setVal("inpGroomRelationCustom", state.groomRelationCustom || "");
  const groomCustomEl = document.getElementById("inpGroomRelationCustom");
  if (groomCustomEl) groomCustomEl.style.display = (state.groomRelation === "custom") ? "block" : "none";
  setVal("inpGroomFatherPhone", state.groomFatherPhone);

  setVal("inpBrideName", state.brideName);
  setVal("inpBridePhone", state.bridePhone);
  setVal("inpBrideFather", state.brideFather);
  setChk("chkBrideFatherDeceased", state.brideFatherDeceased);
  setVal("inpBrideMother", state.brideMother);
  setChk("chkBrideMotherDeceased", state.brideMotherDeceased);
  setVal("inpBrideRelation", state.brideRelation);
  setVal("inpBrideRelationCustom", state.brideRelationCustom || "");
  const brideCustomEl = document.getElementById("inpBrideRelationCustom");
  if (brideCustomEl) brideCustomEl.style.display = (state.brideRelation === "custom") ? "block" : "none";
  setVal("inpBrideFatherPhone", state.brideFatherPhone);

  setVal("inpWeddingDate", state.weddingDate);
  setVal("inpWeddingTime", state.weddingTime);
  setVal("inpVenueName", state.venueName);
  setVal("inpVenueHall", state.venueHall);
  setVal("inpVenueAddr", state.venueAddress);
  setVal("inpTransportParking", state.transportParking);
  setVal("inpTransportSubway", state.transportSubway);
  setVal("inpTransportBus", state.transportBus);

  setVal("inpGreeting", state.greeting);

  setVal("inpGroomAcc", state.groomAccount);
  setVal("inpGroomFatherAcc", state.groomFatherAccount);
  setVal("inpGroomMotherAcc", state.groomMotherAccount);
  setVal("inpBrideAcc", state.brideAccount);
  setVal("inpBrideFatherAcc", state.brideFatherAccount);
  setVal("inpBrideMotherAcc", state.brideMotherAccount);
}

function bindDesktopFormEvents() {
  const bind = (id, prop) => {
    const el = document.getElementById(id);
    if (!el) return;
    const handler = (e) => {
      state[prop] = e.target.value;
      renderAll();
    };
    el.addEventListener("input", handler);
    el.addEventListener("change", handler);
  };

  bind("inpGroomName", "groomName");
  bind("inpGroomPhone", "groomPhone");
  bind("inpGroomFather", "groomFather");
  bind("inpGroomMother", "groomMother");
  bind("inpGroomRelation", "groomRelation");
  bind("inpGroomRelationCustom", "groomRelationCustom");
  document.getElementById("inpGroomRelation")?.addEventListener("change", (e) => {
    const customInp = document.getElementById("inpGroomRelationCustom");
    if (customInp) customInp.style.display = (e.target.value === "custom") ? "block" : "none";
  });
  bind("inpGroomFatherPhone", "groomFatherPhone");

  bind("inpBrideName", "brideName");
  bind("inpBridePhone", "bridePhone");
  bind("inpBrideFather", "brideFather");
  bind("inpBrideMother", "brideMother");
  bind("inpBrideRelation", "brideRelation");
  bind("inpBrideRelationCustom", "brideRelationCustom");
  document.getElementById("inpBrideRelation")?.addEventListener("change", (e) => {
    const customInp = document.getElementById("inpBrideRelationCustom");
    if (customInp) customInp.style.display = (e.target.value === "custom") ? "block" : "none";
  });
  bind("inpBrideFatherPhone", "brideFatherPhone");

  bind("inpWeddingDate", "weddingDate");
  bind("inpWeddingTime", "weddingTime");
  bind("inpVenueName", "venueName");
  bind("inpVenueHall", "venueHall");
  bind("inpVenueAddr", "venueAddress");
  bind("inpTransportParking", "transportParking");
  bind("inpTransportSubway", "transportSubway");
  bind("inpTransportBus", "transportBus");

  bind("inpGreeting", "greeting");

  bind("inpGroomAcc", "groomAccount");
  bind("inpGroomFatherAcc", "groomFatherAccount");
  bind("inpGroomMotherAcc", "groomMotherAccount");
  bind("inpBrideAcc", "brideAccount");
  bind("inpBrideFatherAcc", "brideFatherAccount");
  bind("inpBrideMotherAcc", "brideMotherAccount");

  document.getElementById("chkGroomFatherDeceased")?.addEventListener("change", (e) => {
    state.groomFatherDeceased = e.target.checked;
    renderAll();
  });
  document.getElementById("chkGroomMotherDeceased")?.addEventListener("change", (e) => {
    state.groomMotherDeceased = e.target.checked;
    renderAll();
  });
  document.getElementById("chkBrideFatherDeceased")?.addEventListener("change", (e) => {
    state.brideFatherDeceased = e.target.checked;
    renderAll();
  });
  document.getElementById("chkBrideMotherDeceased")?.addEventListener("change", (e) => {
    state.brideMotherDeceased = e.target.checked;
    renderAll();
  });

  // Pure & Sample buttons
  document.getElementById("btnDeskPure")?.addEventListener("click", applyPureState);
  document.getElementById("btnDeskSample")?.addEventListener("click", applySampleState);

  // Greeting Preset Buttons
  document.querySelectorAll("[data-greeting-preset]").forEach(btn => {
    btn.addEventListener("click", () => {
      const type = btn.getAttribute("data-greeting-preset");
      if (GREETING_PRESETS[type]) {
        state.greeting = GREETING_PRESETS[type];
        const textarea = document.getElementById("inpGreeting");
        if (textarea) textarea.value = state.greeting;
        renderAll();
        showToast("인사말 문구가 변경되었습니다.");
      }
    });
  });

  // Cover Card Selection
  document.querySelectorAll(".cover-card").forEach(card => {
    card.addEventListener("click", () => {
      state.coverStyle = card.getAttribute("data-cover-style");
      renderAll();
      showToast("커버 스타일이 변경되었습니다.");
    });
  });

  // Desktop Slot 1 Upload
  document.getElementById("inpSlot1")?.addEventListener("change", async (e) => {
    if (e.target.files && e.target.files[0]) {
      showToast("메인 대표 사진을 압축 중입니다...");
      state.coverPhoto = await compressImageFile(e.target.files[0]);
      renderAll();
      showToast("메인 사진이 변경되었습니다.");
    }
  });

  // Desktop Slot 2 Upload
  document.getElementById("inpSlot2")?.addEventListener("change", async (e) => {
    if (e.target.files && e.target.files[0]) {
      showToast("서브 디테일 사진을 압축 중입니다...");
      state.detailPhoto = await compressImageFile(e.target.files[0]);
      renderAll();
      showToast("서브 사진이 변경되었습니다.");
    }
  });

  // Desktop Gallery Upload
  document.getElementById("inpAddGalleryPhotos")?.addEventListener("change", async (e) => {
    if (e.target.files && e.target.files.length > 0) {
      const remainingSlots = MAX_GALLERY_PHOTOS - state.galleryPhotos.length;
      if (remainingSlots <= 0) {
        showToast("갤러리 사진은 최대 20장까지만 등록 가능합니다.");
        return;
      }
      const files = Array.from(e.target.files).slice(0, remainingSlots);
      showToast(`사진 ${files.length}장을 압축 중입니다...`);
      const compressed = await Promise.all(files.map(f => compressImageFile(f).catch(() => null)));
      state.galleryPhotos.push(...compressed.filter(Boolean));
      renderAll();
      showToast(`${files.length}장의 사진이 갤러리에 추가되었습니다!`);
    }
  });

  // BGM Checkbox & Track Selector
  document.getElementById("chkEnableBgm")?.addEventListener("change", (e) => {
    state.sections.bgm = e.target.checked;
    applySectionVisibility();
    if (!state.sections.bgm) pauseBgm();
    else playBgm();
  });

  const selBgm = document.getElementById("selBgmTrack");
  const wrapCustom = document.getElementById("customAudioUploadWrap");
  selBgm?.addEventListener("change", () => {
    if (selBgm.value === "custom") {
      wrapCustom.style.display = "block";
    } else {
      wrapCustom.style.display = "none";
      state.bgmTrackType = "piano";
      state.bgmTrackUrl = "./audio/romantic_piano.mp3";
      if (bgmAudio) bgmAudio.src = state.bgmTrackUrl;
      if (state.sections.bgm) playBgm();
    }
  });

  document.getElementById("inpCustomAudio")?.addEventListener("change", (e) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      if (file.size > MAX_AUDIO_FILE_SIZE) {
        alert("음악 파일 크기는 최대 5MB 이하만 가능합니다.");
        return;
      }
      const audioUrl = URL.createObjectURL(file);
      state.customBgmUrl = audioUrl;
      state.customBgmName = file.name;
      state.bgmTrackType = "custom";
      state.bgmTrackUrl = audioUrl;
      if (bgmAudio) bgmAudio.src = audioUrl;
      if (state.sections.bgm) playBgm();
      showToast("커스텀 MP3가 설정되었습니다.");
    }
  });
}

/* ===================================================
   INITIALIZATION
   =================================================== */

document.addEventListener("DOMContentLoaded", () => {
  const isGuestMode = checkUrlMode();

  syncFormInputsFromState();
  bindDesktopFormEvents();

  // Autoplay handler
  window.addEventListener("touchstart", handleFirstInteraction, { passive: true });
  window.addEventListener("scroll", handleFirstInteraction, { passive: true });
  window.addEventListener("click", handleFirstInteraction, { passive: true });

  // Floating BGM toggle
  document.getElementById("btnToggleBgm")?.addEventListener("click", toggleBgm);

  // Gallery Expand Button
  document.getElementById("btnExpandGallery")?.addEventListener("click", () => {
    state.galleryExpanded = true;
    renderInvitationGallery();
  });

  // Lightbox Close
  document.getElementById("btnLightboxClose")?.addEventListener("click", closeLightbox);
  document.getElementById("lightboxModal")?.addEventListener("click", (e) => {
    if (e.target.id === "lightboxModal") closeLightbox();
  });

  // Mobile Bottom Dock Tabs
  document.querySelectorAll(".dock-btn").forEach(btn => {
    btn.addEventListener("click", () => {
      const tab = btn.getAttribute("data-tab");
      if (tab === "preview") {
        document.body.classList.toggle("guest-preview");
        closeBottomSheet();
        const isPreview = document.body.classList.contains("guest-preview");
        btn.classList.toggle("active", isPreview);
        const returnBtn = document.getElementById("btnReturnEdit");
        if (returnBtn) returnBtn.style.display = isPreview ? "block" : "none";
        window.scrollTo({ top: 0, behavior: "smooth" });
        showToast(isPreview ? "하객용 미리보기 화면입니다." : "편집 모드로 돌아왔습니다.");
      } else if (tab === "share") {
        openShareModal();
      } else {
        document.body.classList.remove("guest-preview");
        const returnBtn = document.getElementById("btnReturnEdit");
        if (returnBtn) returnBtn.style.display = "none";
        openBottomSheet(tab);
      }
    });
  });

  // Floating Return from Preview Button
  document.getElementById("btnReturnEdit")?.addEventListener("click", () => {
    document.body.classList.remove("guest-preview");
    document.getElementById("btnReturnEdit").style.display = "none";
    document.getElementById("dockBtnPreview")?.classList.remove("active");
    openBottomSheet("cover");
    window.scrollTo({ top: 0, behavior: "smooth" });
    showToast("편집 모드로 복귀했습니다.");
  });

  // Bottom Sheet Close
  document.getElementById("btnSheetClose")?.addEventListener("click", closeBottomSheet);
  sheetBackdrop?.addEventListener("click", (e) => {
    if (e.target === sheetBackdrop) closeBottomSheet();
  });

  // Share Modal
  document.getElementById("btnOpenShareModal")?.addEventListener("click", openShareModal);
  document.getElementById("btnCloseShareModal")?.addEventListener("click", closeShareModal);
  shareModal?.addEventListener("click", (e) => {
    if (e.target === shareModal) closeShareModal();
  });
  document.getElementById("btnCopyShareUrl")?.addEventListener("click", () => {
    copyText(shareUrlInput?.value || generateShareUrl(), "청첩장 링크가 복사되었습니다!");
  });
  document.getElementById("btnKakaoShare")?.addEventListener("click", shareToKakaoOrNative);
  document.getElementById("btnModalDownloadHtml")?.addEventListener("click", () => {
    closeShareModal();
    downloadStandaloneInvitation();
  });

  // Bottom Share Buttons in Preview
  document.getElementById("btnBottomKakao")?.addEventListener("click", shareToKakaoOrNative);
  document.getElementById("btnBottomCopy")?.addEventListener("click", () => {
    copyText(generateShareUrl(), "청첩장 링크가 복사되었습니다!");
  });

  // Accordions
  const btnAccGroom = document.getElementById("btnAccGroomHeader");
  const btnAccBride = document.getElementById("btnAccBrideHeader");
  btnAccGroom?.addEventListener("click", () => {
    btnAccGroom.parentElement.classList.toggle("open");
  });
  btnAccBride?.addEventListener("click", () => {
    btnAccBride.parentElement.classList.toggle("open");
  });

  // Address Copy Button
  document.getElementById("btnCopyAddr")?.addEventListener("click", () => {
    copyText(state.venueAddress, "주소가 복사되었습니다.");
  });

  // Contact Modal
  const contactModal = document.getElementById("contactModal");
  document.getElementById("btnOpenContactModal")?.addEventListener("click", () => {
    renderContactModal();
    contactModal?.classList.add("show");
  });
  document.getElementById("btnCloseContactModal")?.addEventListener("click", () => {
    contactModal?.classList.remove("show");
  });
  contactModal?.addEventListener("click", (e) => {
    if (e.target === contactModal) contactModal.classList.remove("show");
  });

  // Guestbook Modal
  const guestbookModal = document.getElementById("guestbookModal");
  document.getElementById("btnOpenGuestbookModal")?.addEventListener("click", () => {
    guestbookModal?.classList.add("show");
  });
  document.getElementById("btnCloseGuestbookModal")?.addEventListener("click", () => {
    guestbookModal?.classList.remove("show");
  });
  guestbookModal?.addEventListener("click", (e) => {
    if (e.target === guestbookModal) guestbookModal.classList.remove("show");
  });

  // Standalone HTML Export
  document.getElementById("btnDownloadHtml")?.addEventListener("click", downloadStandaloneInvitation);
  document.getElementById("btnToggleViewer")?.addEventListener("click", () => {
    document.body.classList.toggle("viewer-only");
    const isViewer = document.body.classList.contains("viewer-only");
    showToast(isViewer ? "하객용 전체화면 보기 모드 (ESC 또는 다시 클릭 시 복귀)" : "스튜디오 편집기 모드로 전환되었습니다.");
  });

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") {
      document.body.classList.remove("viewer-only");
      document.body.classList.remove("guest-preview");
      document.getElementById("lightboxModal")?.classList.remove("show");
      document.getElementById("contactModal")?.classList.remove("show");
      document.getElementById("guestbookModal")?.classList.remove("show");
      document.getElementById("shareModal")?.classList.remove("show");
    }
  });

  // Initial Render
  renderAll();

  // If on mobile and not guest mode, start smoothly
  if (!isGuestMode && window.innerWidth <= 860) {
    setTimeout(() => {
      openBottomSheet("cover");
    }, 250);
  }
});

// Expose functions globally for inline HTML onclick handlers
window.copyText = copyText;
window.submitRsvp = submitRsvp;
window.deleteGalleryPhoto = deleteGalleryPhoto;
window.openLightbox = openLightbox;
window.deleteGuestbookEntry = deleteGuestbookEntry;
window.submitGuestbookEntry = submitGuestbookEntry;
window.renderMobilePhotoSheet = renderMobilePhotoSheet;
window.openBottomSheet = openBottomSheet;
window.closeBottomSheet = closeBottomSheet;
