/**
 * Atelier Wedding - Moiitee Style Mobile-First Self-Builder Engine (Bright Mode)
 * Inspired by: moiitee.com & Instagram @moiitee_official
 * Features:
 * - Visual Cover Selector with Layout Thumbnails (Duo, Magazine, Arch)
 * - Numbered Photo Slot Management (1번 메인, 2번 디테일, 3~6번 갤러리)
 * - Fullscreen Guest Preview with Floating Return Button
 * - Auto-open Cover Selector on Mobile First Load
 * - URL State Serialization (Zero-Server Instant Public Link)
 * - Native Mobile Web Share API & Standalone HTML Exporter
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

const state = {
  coverStyle: "duo",
  groomName: "김도윤",
  brideName: "이서연",
  groomPhone: "010-1234-5678",
  bridePhone: "010-9876-5432",
  groomFather: "김건우",
  groomMother: "박정숙",
  brideFather: "이재민",
  brideMother: "최은영",
  weddingDate: "2026-11-28",
  weddingTime: "토요일 오후 1시 30분",
  venueName: "더채플 앳 청담",
  venueHall: "6층 커티지홀",
  venueAddress: "서울특별시 강남구 선릉로 757",
  transport: `지하철: 7호선·수인분당선 강남구청역 4번 출구 (도보 7분 / 셔틀 수시 운행)\n자가용: 건물 지하 주차장 및 외부 전용 주차타워 2시간 무료 지원`,
  greeting: GREETING_PRESETS.warm,
  groomAccount: "카카오뱅크 3333-01-2345678 (예금주: 김도윤)",
  brideAccount: "토스뱅크 1000-1234-5678 (예금주: 이서연)",
  coverPhoto: "./sample_wedding_cover.jpg",
  detailPhoto: "./sample_duo_detail.jpg",
  galleryPhotos: [
    "./sample_gallery_1.jpg",
    "./sample_gallery_2.jpg",
    "./sample_gallery_3.jpg",
    "./sample_gallery_4.jpg"
  ]
};

/* ===================================================
   URL STATE SERIALIZATION (ZERO-SERVER PUBLIC SHARING)
   =================================================== */

function serializeState() {
  const minimalData = {
    c: state.coverStyle,
    gn: state.groomName,
    bn: state.brideName,
    gp: state.groomPhone,
    bp: state.bridePhone,
    gf: state.groomFather,
    gm: state.groomMother,
    bf: state.brideFather,
    bm: state.brideMother,
    d: state.weddingDate,
    t: state.weddingTime,
    vn: state.venueName,
    vh: state.venueHall,
    va: state.venueAddress,
    tr: state.transport,
    gr: state.greeting,
    ga: state.groomAccount,
    ba: state.brideAccount
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
    if (d.gn) state.groomName = d.gn;
    if (d.bn) state.brideName = d.bn;
    if (d.gp) state.groomPhone = d.gp;
    if (d.bp) state.bridePhone = d.bp;
    if (d.gf) state.groomFather = d.gf;
    if (d.gm) state.groomMother = d.gm;
    if (d.bf) state.brideFather = d.bf;
    if (d.bm) state.brideMother = d.bm;
    if (d.d) state.weddingDate = d.d;
    if (d.t) state.weddingTime = d.t;
    if (d.vn) state.venueName = d.vn;
    if (d.vh) state.venueHall = d.vh;
    if (d.va) state.venueAddress = d.va;
    if (d.tr) state.transport = d.tr;
    if (d.gr) state.greeting = d.gr;
    if (d.ga) state.groomAccount = d.ga;
    if (d.ba) state.brideAccount = d.ba;
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
  const dayEn = DAY_NAMES_EN[dateObj.getDay()] || "SAT";
  const monEn = MONTH_NAMES_EN[month - 1] || "NOV";

  // Duo Cover
  const duoGroom = document.getElementById("duoGroomName");
  const duoBride = document.getElementById("duoBrideName");
  if (duoGroom) duoGroom.textContent = state.groomName;
  if (duoBride) duoBride.textContent = state.brideName;
  
  const duoPrimaryImg = document.getElementById("duoPrimaryImg");
  const duoSecondaryImg = document.getElementById("duoSecondaryImg");
  if (duoPrimaryImg) duoPrimaryImg.src = state.coverPhoto;
  if (duoSecondaryImg) duoSecondaryImg.src = state.detailPhoto;

  const duoDateDay = document.getElementById("duoDateDay");
  const duoDateMonYear = document.getElementById("duoDateMonYear");
  const duoDateTime = document.getElementById("duoDateTime");
  const duoVenueSummary = document.getElementById("duoVenueSummary");
  if (duoDateDay) duoDateDay.textContent = String(day);
  if (duoDateMonYear) duoDateMonYear.textContent = `${monEn} ${year}`;
  if (duoDateTime) duoDateTime.textContent = `${dayEn} PM 1:30`;
  if (duoVenueSummary) duoVenueSummary.textContent = `${state.venueName} ${state.venueHall}`;

  // Magazine Cover
  const magCoverImg = document.getElementById("magCoverImg");
  if (magCoverImg) magCoverImg.src = state.coverPhoto;
  const magGroom = document.getElementById("magGroomName");
  const magBride = document.getElementById("magBrideName");
  if (magGroom) magGroom.textContent = state.groomName;
  if (magBride) magBride.textContent = state.brideName;
  const magDateSummary = document.getElementById("magDateSummary");
  const magVenueSummary = document.getElementById("magVenueSummary");
  if (magDateSummary) magDateSummary.textContent = `${year}. ${String(month).padStart(2, "0")}. ${String(day).padStart(2, "0")} ${dayEn} PM 1:30`;
  if (magVenueSummary) magVenueSummary.textContent = `${state.venueName} ${state.venueHall}`;

  // Arch Cover
  const archCoverImg = document.getElementById("archCoverImg");
  if (archCoverImg) archCoverImg.src = state.coverPhoto;
  const archGroom = document.getElementById("archGroomName");
  const archBride = document.getElementById("archBrideName");
  if (archGroom) archGroom.textContent = state.groomName;
  if (archBride) archBride.textContent = state.brideName;
  const archDateSummary = document.getElementById("archDateSummary");
  const archVenueSummary = document.getElementById("archVenueSummary");
  if (archDateSummary) archDateSummary.textContent = `${year}년 ${month}월 ${day}일 ${state.weddingTime}`;
  if (archVenueSummary) archVenueSummary.textContent = `${state.venueName} ${state.venueHall}`;

  // Update Desktop Slot Thumbnails
  const d1 = document.getElementById("deskSlotThumb1");
  const d2 = document.getElementById("deskSlotThumb2");
  const d3 = document.getElementById("deskSlotThumb3");
  const d4 = document.getElementById("deskSlotThumb4");
  const d5 = document.getElementById("deskSlotThumb5");
  const d6 = document.getElementById("deskSlotThumb6");
  if (d1) d1.src = state.coverPhoto;
  if (d2) d2.src = state.detailPhoto;
  if (d3) d3.src = state.galleryPhotos[0] || state.coverPhoto;
  if (d4) d4.src = state.galleryPhotos[1] || state.coverPhoto;
  if (d5) d5.src = state.galleryPhotos[2] || state.coverPhoto;
  if (d6) d6.src = state.galleryPhotos[3] || state.coverPhoto;

  // Greeting & Family
  const viewGreetingText = document.getElementById("viewGreetingText");
  if (viewGreetingText) viewGreetingText.textContent = state.greeting;

  const viewParentsBox = document.getElementById("viewParentsBox");
  if (viewParentsBox) {
    viewParentsBox.innerHTML = `
      <div class="inv-parents-row">
        <span class="parents">${state.groomFather} · ${state.groomMother}</span>
        <span class="role">의 장남</span>
        <span class="child-name">${state.groomName}</span>
      </div>
      <div class="inv-parents-row">
        <span class="parents">${state.brideFather} · ${state.brideMother}</span>
        <span class="role">의 장녀</span>
        <span class="child-name">${state.brideName}</span>
      </div>
    `;
  }

  // Calendar & D-Day
  renderCalendar(year, month, day);

  // Gallery
  const viewGalleryGrid = document.getElementById("viewGalleryGrid");
  if (viewGalleryGrid) {
    viewGalleryGrid.innerHTML = state.galleryPhotos
      .map((src, i) => `
        <div class="gallery-item">
          <img src="${src}" alt="웨딩 갤러리 사진 ${i + 1}" loading="lazy" />
        </div>
      `).join("");
  }

  // Location & Navigation
  const viewLocName = document.getElementById("viewLocName");
  const viewLocAddr = document.getElementById("viewLocAddr");
  const viewTransportDetails = document.getElementById("viewTransportDetails");
  if (viewLocName) viewLocName.textContent = `${state.venueName} ${state.venueHall}`;
  if (viewLocAddr) viewLocAddr.textContent = state.venueAddress;
  if (viewTransportDetails) viewTransportDetails.textContent = state.transport;

  const q = encodeURIComponent(state.venueName || state.venueAddress);
  const linkNaver = document.getElementById("linkNaverMap");
  const linkKakao = document.getElementById("linkKakaoMap");
  const linkTmap = document.getElementById("linkTmap");
  if (linkNaver) linkNaver.href = `https://map.naver.com/p/search/${q}`;
  if (linkKakao) linkKakao.href = `https://map.kakao.com/link/search/${q}`;
  if (linkTmap) linkTmap.href = `https://apis.openapi.sk.com/tmap/app/routes?name=${q}`;

  // Accounts
  const viewGroomAccNum = document.getElementById("viewGroomAccNum");
  const viewBrideAccNum = document.getElementById("viewBrideAccNum");
  if (viewGroomAccNum) viewGroomAccNum.textContent = state.groomAccount;
  if (viewBrideAccNum) viewBrideAccNum.textContent = state.brideAccount;

  // Contact Modal
  const modalGroomName = document.getElementById("modalGroomName");
  const modalBrideName = document.getElementById("modalBrideName");
  const linkCallGroom = document.getElementById("linkCallGroom");
  const linkSmsGroom = document.getElementById("linkSmsGroom");
  const linkCallBride = document.getElementById("linkCallBride");
  const linkSmsBride = document.getElementById("linkSmsBride");
  if (modalGroomName) modalGroomName.textContent = state.groomName;
  if (modalBrideName) modalBrideName.textContent = state.brideName;
  if (linkCallGroom) linkCallGroom.href = `tel:${state.groomPhone}`;
  if (linkSmsGroom) linkSmsGroom.href = `sms:${state.groomPhone}`;
  if (linkCallBride) linkCallBride.href = `tel:${state.bridePhone}`;
  if (linkSmsBride) linkSmsBride.href = `sms:${state.bridePhone}`;
}

function renderCalendar(year, month, day) {
  const viewCalDateHeading = document.getElementById("viewCalDateHeading");
  if (viewCalDateHeading) {
    const daysKr = ["일", "월", "화", "수", "목", "금", "토"];
    const dow = new Date(year, month - 1, day).getDay();
    viewCalDateHeading.textContent = `${year}. ${month}. ${day} ${daysKr[dow]}요일`;
  }

  const container = document.getElementById("viewCalendarContainer");
  if (!container) return;

  const firstDayWeek = new Date(year, month - 1, 1).getDay();
  const daysInMonth = new Date(year, month, 0).getDate();

  const weekHeads = ["일", "월", "화", "수", "목", "금", "토"]
    .map((w, i) => `<div class="cal-day-head" style="${i === 0 ? "color:#c26155" : ""}">${w}</div>`)
    .join("");

  let cells = "";
  for (let i = 0; i < firstDayWeek; i++) {
    cells += `<div class="cal-cell"></div>`;
  }
  for (let d = 1; d <= daysInMonth; d++) {
    const dow = (firstDayWeek + d - 1) % 7;
    const isTarget = d === day;
    const cls = ["cal-cell", dow === 0 ? "sun" : "", isTarget ? "wedding-day" : ""].filter(Boolean).join(" ");
    cells += `<div class="${cls}">${d}</div>`;
  }

  container.innerHTML = `
    <div class="cal-month-title">${year}년 ${month}월</div>
    <div class="cal-grid">
      ${weekHeads}
      ${cells}
    </div>
  `;

  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const target = new Date(year, month - 1, day);
  const diffDays = Math.round((target - today) / (1000 * 60 * 60 * 24));
  const viewDDayText = document.getElementById("viewDDayText");
  if (viewDDayText) {
    if (diffDays > 0) {
      viewDDayText.innerHTML = `${state.groomName} ♥ ${state.brideName}의 결혼식이 <strong>${diffDays}일</strong> 남았습니다.`;
    } else if (diffDays === 0) {
      viewDDayText.innerHTML = `오늘, ${state.groomName} ♥ ${state.brideName} 두 사람이 부부가 됩니다!`;
    } else {
      viewDDayText.innerHTML = `두 사람이 함께한 지 <strong>${Math.abs(diffDays)}일</strong>째 되는 날입니다.`;
    }
  }
}

/* ===================================================
   INTERACTION HANDLERS & TOAST
   =================================================== */

function showToast(msg) {
  const el = document.getElementById("toastMsg");
  if (!el) return;
  el.textContent = msg;
  el.classList.add("show");
  setTimeout(() => el.classList.remove("show"), 2200);
}

function copyText(text, successMsg = "복사되었습니다.") {
  if (navigator.clipboard && navigator.clipboard.writeText) {
    navigator.clipboard.writeText(text).then(() => showToast(successMsg));
  } else {
    const ta = document.createElement("textarea");
    ta.value = text;
    document.body.appendChild(ta);
    ta.select();
    document.execCommand("copy");
    document.body.removeChild(ta);
    showToast(successMsg);
  }
}

function submitRsvp() {
  const name = document.getElementById("rsvpName").value;
  if (!name.trim()) return;
  document.getElementById("rsvpForm").style.display = "none";
  document.getElementById("rsvpConfirm").style.display = "block";
  showToast("참석 정보가 전달되었습니다.");
}

function compressImageFile(file, maxWidth = 1200, quality = 0.86) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = (ev) => {
      const img = new Image();
      img.onload = () => {
        const scale = Math.min(1, maxWidth / img.width);
        const canvas = document.createElement("canvas");
        canvas.width = Math.round(img.width * scale);
        canvas.height = Math.round(img.height * scale);
        const ctx = canvas.getContext("2d");
        ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
        resolve(canvas.toDataURL("image/jpeg", quality));
      };
      img.onerror = reject;
      img.src = ev.target.result;
    };
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
}

/* ===================================================
   MOBILE BOTTOM SHEET SYSTEM (TAB DISPATCHER)
   =================================================== */

const sheetBackdrop = document.getElementById("bottomSheetBackdrop");
const sheetTitle = document.getElementById("sheetTitle");
const sheetBody = document.getElementById("sheetBody");

function openBottomSheet(tabType) {
  if (!sheetBackdrop || !sheetBody) return;
  sheetBackdrop.classList.add("show");

  if (tabType === "cover") {
    sheetTitle.textContent = "🎨 커버 디자인 선택";
    sheetBody.innerHTML = `
      <p style="font-size:12.5px;color:#787168;margin-bottom:6px;">부부의 결혼사진이 가장 돋보이는 커버 레이아웃을 선택하세요.</p>
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
            <span class="cover-card-title">01. 듀오 프레임 (모이티 대표 스타일)</span>
            <span class="cover-card-desc">전신 메인컷 + 반지/베일 컷 2장과 감성 날짜 블록</span>
            <span class="cover-card-badge">인기 추천</span>
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
        closeBottomSheet();
        showToast("커버 디자인이 변경되었습니다.");
      });
    });
  } else if (tabType === "info") {
    sheetTitle.textContent = "✍️ 예식 정보 및 인사말 편집";
    sheetBody.innerHTML = `
      <div class="form-group"><label>신랑 이름</label><input type="text" id="mGroom" value="${state.groomName}" /></div>
      <div class="form-group"><label>신부 이름</label><input type="text" id="mBride" value="${state.brideName}" /></div>
      <div class="form-group"><label>예식 날짜</label><input type="date" id="mDate" value="${state.weddingDate}" /></div>
      <div class="form-group"><label>예식 시간 표기</label><input type="text" id="mTime" value="${state.weddingTime}" /></div>
      <div class="form-group"><label>웨딩홀 이름</label><input type="text" id="mVenue" value="${state.venueName}" /></div>
      <div class="form-group"><label>층수 / 홀</label><input type="text" id="mHall" value="${state.venueHall}" /></div>
      <div class="form-group"><label>도로명 주소</label><input type="text" id="mAddr" value="${state.venueAddress}" /></div>
      <div class="form-group"><label>신랑측 계좌번호</label><input type="text" id="mGroomAcc" value="${state.groomAccount}" /></div>
      <div class="form-group"><label>신부측 계좌번호</label><input type="text" id="mBrideAcc" value="${state.brideAccount}" /></div>
      <div class="form-group">
        <label>초대 인사말</label>
        <div class="preset-chips" style="margin-bottom:6px;">
          <button type="button" class="chip-btn" id="mPresetWarm">따뜻형</button>
          <button type="button" class="chip-btn" id="mPresetClassic">격식형</button>
          <button type="button" class="chip-btn" id="mPresetModern">담백형</button>
        </div>
        <textarea id="mGreeting" rows="5">${state.greeting}</textarea>
      </div>
      <button type="button" class="btn-primary" id="btnSaveMobileInfo" style="margin-top:8px;">수정사항 저장하기</button>
    `;

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
      state.brideName = document.getElementById("mBride").value;
      state.weddingDate = document.getElementById("mDate").value;
      state.weddingTime = document.getElementById("mTime").value;
      state.venueName = document.getElementById("mVenue").value;
      state.venueHall = document.getElementById("mHall").value;
      state.venueAddress = document.getElementById("mAddr").value;
      state.groomAccount = document.getElementById("mGroomAcc").value;
      state.brideAccount = document.getElementById("mBrideAcc").value;
      state.greeting = document.getElementById("mGreeting").value;
      renderAll();
      closeBottomSheet();
      showToast("청첩장 정보가 저장되었습니다.");
    });
  } else if (tabType === "photo") {
    sheetTitle.textContent = "📷 웨딩 사진 번호별 등록";
    sheetBody.innerHTML = `
      <p style="font-size:12.5px;color:#787168;margin-bottom:4px;">위치 번호(1~6번)를 확인하고 원하는 사진을 스마트폰 앨범에서 변경하세요.</p>
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

        <!-- Slot 3 -->
        <div class="photo-slot-card">
          <div class="slot-left">
            <span class="slot-num-badge">3</span>
            <img class="slot-thumb" src="${state.galleryPhotos[0] || state.coverPhoto}" alt="3번 갤러리 1" />
            <div class="slot-info">
              <span class="slot-name">갤러리 사진 1</span>
              <span class="slot-sub">포토 갤러리 첫번째</span>
            </div>
          </div>
          <label class="btn-slot-upload">
            변경
            <input type="file" id="mSlot3" accept="image/*" />
          </label>
        </div>

        <!-- Slot 4 -->
        <div class="photo-slot-card">
          <div class="slot-left">
            <span class="slot-num-badge">4</span>
            <img class="slot-thumb" src="${state.galleryPhotos[1] || state.coverPhoto}" alt="4번 갤러리 2" />
            <div class="slot-info">
              <span class="slot-name">갤러리 사진 2</span>
              <span class="slot-sub">포토 갤러리 두번째</span>
            </div>
          </div>
          <label class="btn-slot-upload">
            변경
            <input type="file" id="mSlot4" accept="image/*" />
          </label>
        </div>

        <!-- Slot 5 -->
        <div class="photo-slot-card">
          <div class="slot-left">
            <span class="slot-num-badge">5</span>
            <img class="slot-thumb" src="${state.galleryPhotos[2] || state.coverPhoto}" alt="5번 갤러리 3" />
            <div class="slot-info">
              <span class="slot-name">갤러리 사진 3</span>
              <span class="slot-sub">포토 갤러리 세번째</span>
            </div>
          </div>
          <label class="btn-slot-upload">
            변경
            <input type="file" id="mSlot5" accept="image/*" />
          </label>
        </div>

        <!-- Slot 6 -->
        <div class="photo-slot-card">
          <div class="slot-left">
            <span class="slot-num-badge">6</span>
            <img class="slot-thumb" src="${state.galleryPhotos[3] || state.coverPhoto}" alt="6번 갤러리 4" />
            <div class="slot-info">
              <span class="slot-name">갤러리 사진 4</span>
              <span class="slot-sub">포토 갤러리 네번째</span>
            </div>
          </div>
          <label class="btn-slot-upload">
            변경
            <input type="file" id="mSlot6" accept="image/*" />
          </label>
        </div>
      </div>
    `;

    const bindSlot = (id, callback) => {
      document.getElementById(id)?.addEventListener("change", async (e) => {
        if (e.target.files && e.target.files[0]) {
          showToast("사진을 압축 처리 중입니다...");
          const compressed = await compressImageFile(e.target.files[0]);
          callback(compressed);
          renderAll();
          openBottomSheet("photo");
          showToast("사진이 교체되었습니다.");
        }
      });
    };

    bindSlot("mSlot1", img => state.coverPhoto = img);
    bindSlot("mSlot2", img => state.detailPhoto = img);
    bindSlot("mSlot3", img => state.galleryPhotos[0] = img);
    bindSlot("mSlot4", img => state.galleryPhotos[1] = img);
    bindSlot("mSlot5", img => state.galleryPhotos[2] = img);
    bindSlot("mSlot6", img => state.galleryPhotos[3] = img);
  }
}

function closeBottomSheet() {
  sheetBackdrop?.classList.remove("show");
  document.querySelectorAll(".dock-btn").forEach(b => b.classList.remove("active"));
  document.getElementById("dockBtnCover")?.classList.add("active");
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
  const title = `${state.groomName} ♥ ${state.brideName}의 모바일 청첩장`;
  const text = `${state.weddingDate} ${state.weddingTime}\n${state.venueName} ${state.venueHall}\n소중한 분들을 초대합니다.`;

  if (navigator.share) {
    try {
      await navigator.share({ title, text, url: publicUrl });
      showToast("공유 창이 열렸습니다.");
      return;
    } catch (e) {
      // User cancelled
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
  const pageTitle = `${state.groomName} ♥ ${state.brideName} 결혼합니다`;

  let cssText = "";
  try {
    const resp = await fetch("./styles.css");
    cssText = await resp.text();
  } catch (e) {
    cssText = Array.from(document.styleSheets)
      .map(s => {
        try { return Array.from(s.cssRules).map(r => r.cssText).join("\n"); }
        catch (err) { return ""; }
      }).join("\n");
  }

  const standaloneHtml = `<!DOCTYPE html>
<html lang="ko">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no" />
  <title>${pageTitle}</title>
  <meta property="og:title" content="${pageTitle}" />
  <meta property="og:description" content="${state.weddingDate} ${state.weddingTime} ${state.venueName}" />
  <style>
${cssText}
    body {
      background: var(--card-bg) !important;
      display: flex;
      justify-content: center;
      margin: 0;
      padding: 0;
    }
    .phone-mockup {
      width: 100% !important;
      max-width: 440px !important;
      height: auto !important;
      min-height: 100dvh !important;
      border: none !important;
      border-radius: 0 !important;
      box-shadow: 0 0 40px rgba(0,0,0,0.06) !important;
    }
    .mobile-dock, .editor-sidebar, .btn-return-edit { display: none !important; }
  </style>
</head>
<body class="guest-mode">
  <div class="phone-mockup">
${phoneInner}
  </div>

  <div class="modal-backdrop" id="contactModal">
    <div class="modal-content">
      <div class="modal-header">
        <h4>축하 연락하기</h4>
        <button type="button" class="modal-close" onclick="document.getElementById('contactModal').classList.remove('show')">✕</button>
      </div>
      <div class="modal-body">
        <div class="contact-item">
          <div><span class="role-badge">신랑</span><span class="person-name">${state.groomName}</span></div>
          <div class="contact-actions">
            <a href="tel:${state.groomPhone}" class="btn-action-icon">📞 통화</a>
            <a href="sms:${state.groomPhone}" class="btn-action-icon">💬 문자</a>
          </div>
        </div>
        <div class="contact-item">
          <div><span class="role-badge">신부</span><span class="person-name">${state.brideName}</span></div>
          <div class="contact-actions">
            <a href="tel:${state.bridePhone}" class="btn-action-icon">📞 통화</a>
            <a href="sms:${state.bridePhone}" class="btn-action-icon">💬 문자</a>
          </div>
        </div>
      </div>
    </div>
  </div>

  <div id="toastMsg" class="toast-msg">복사되었습니다.</div>

  <script>
    function showToast(msg) {
      const el = document.getElementById("toastMsg");
      if (!el) return;
      el.textContent = msg;
      el.classList.add("show");
      setTimeout(() => el.classList.remove("show"), 2000);
    }
    function copyText(text) {
      navigator.clipboard ? navigator.clipboard.writeText(text).then(() => showToast("복사되었습니다.")) : prompt("복사하세요", text);
    }
    document.getElementById("btnAccGroomHeader")?.addEventListener("click", () => {
      document.getElementById("btnAccGroomHeader").parentElement.classList.toggle("open");
    });
    document.getElementById("btnAccBrideHeader")?.addEventListener("click", () => {
      document.getElementById("btnAccBrideHeader").parentElement.classList.toggle("open");
    });
    document.getElementById("btnCopyGroomAcc")?.addEventListener("click", () => copyText("${state.groomAccount}"));
    document.getElementById("btnCopyBrideAcc")?.addEventListener("click", () => copyText("${state.brideAccount}"));
    document.getElementById("btnCopyAddr")?.addEventListener("click", () => copyText("${state.venueAddress}"));
    document.getElementById("btnOpenContactModal")?.addEventListener("click", () => {
      document.getElementById("contactModal").classList.add("show");
    });
    window.submitRsvp = function() {
      document.getElementById("rsvpForm").style.display = "none";
      document.getElementById("rsvpConfirm").style.display = "block";
      showToast("참석 정보가 전달되었습니다.");
    };
  </script>
</body>
</html>`;

  let finalizedDoc = standaloneHtml
    .replace('src="./sample_wedding_cover.jpg"', `src="${inlinedCover}"`)
    .replace('src="./sample_duo_detail.jpg"', `src="${inlinedDetail}"`);
  
  inlinedGallery.forEach((base64, i) => {
    finalizedDoc = finalizedDoc.replace(`src="./sample_gallery_${i + 1}.jpg"`, `src="${base64}"`);
  });

  const blob = new Blob([finalizedDoc], { type: "text/html;charset=utf-8" });
  const a = document.createElement("a");
  a.href = URL.createObjectURL(blob);
  a.download = `모바일청첩장_${state.groomName}_${state.brideName}.html`;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  showToast("단독 실행 파일이 다운로드되었습니다!");
}

/* ===================================================
   EVENT BINDINGS & INITIALIZATION
   =================================================== */

document.addEventListener("DOMContentLoaded", () => {
  const isGuestMode = checkUrlMode();

  const inpGreeting = document.getElementById("inpGreeting");
  if (inpGreeting) inpGreeting.value = state.greeting;

  // Desktop Visual Cover Cards Click
  document.querySelectorAll(".cover-card").forEach((card) => {
    card.addEventListener("click", () => {
      document.querySelectorAll(".cover-card").forEach(c => c.classList.remove("active"));
      card.classList.add("active");
      state.coverStyle = card.getAttribute("data-cover-style");
      renderAll();
    });
  });

  // Desktop Form inputs
  const bindInput = (id, prop) => {
    const el = document.getElementById(id);
    if (!el) return;
    el.addEventListener("input", (e) => {
      state[prop] = e.target.value;
      renderAll();
    });
  };

  bindInput("inpGroomName", "groomName");
  bindInput("inpBrideName", "brideName");
  bindInput("inpGroomPhone", "groomPhone");
  bindInput("inpBridePhone", "bridePhone");
  bindInput("inpGroomFather", "groomFather");
  bindInput("inpGroomMother", "groomMother");
  bindInput("inpBrideFather", "brideFather");
  bindInput("inpBrideMother", "brideMother");
  bindInput("inpWeddingDate", "weddingDate");
  bindInput("inpWeddingTime", "weddingTime");
  bindInput("inpVenueName", "venueName");
  bindInput("inpVenueHall", "venueHall");
  bindInput("inpVenueAddr", "venueAddress");
  bindInput("inpTransport", "transport");
  bindInput("inpGreeting", "greeting");
  bindInput("inpGroomAcc", "groomAccount");
  bindInput("inpBrideAcc", "brideAccount");

  // Preset chips
  document.querySelectorAll(".chip-btn").forEach((btn) => {
    btn.addEventListener("click", () => {
      const presetKey = btn.getAttribute("data-greeting-preset");
      if (GREETING_PRESETS[presetKey]) {
        state.greeting = GREETING_PRESETS[presetKey];
        if (inpGreeting) inpGreeting.value = state.greeting;
        renderAll();
      }
    });
  });

  // Desktop Slot Upload Listeners
  const bindDesktopSlot = (id, callback) => {
    document.getElementById(id)?.addEventListener("change", async (e) => {
      if (e.target.files && e.target.files[0]) {
        showToast("사진을 압축 처리 중입니다...");
        const compressed = await compressImageFile(e.target.files[0]);
        callback(compressed);
        renderAll();
        showToast("사진이 교체되었습니다.");
      }
    });
  };

  bindDesktopSlot("inpSlot1", img => state.coverPhoto = img);
  bindDesktopSlot("inpSlot2", img => state.detailPhoto = img);
  bindDesktopSlot("inpSlot3", img => state.galleryPhotos[0] = img);
  bindDesktopSlot("inpSlot4", img => state.galleryPhotos[1] = img);
  bindDesktopSlot("inpSlot5", img => state.galleryPhotos[2] = img);
  bindDesktopSlot("inpSlot6", img => state.galleryPhotos[3] = img);

  // Mobile Bottom Dock Buttons
  // 1. [미리보기] -> Fullscreen Guest View Toggle
  document.getElementById("dockBtnPreview")?.addEventListener("click", () => {
    closeBottomSheet();
    document.body.classList.add("guest-preview");
    window.scrollTo({ top: 0, behavior: "smooth" });
    showToast("하객에게 보이는 실제 전체화면 모드입니다.");
  });

  // Floating Return-to-Edit button
  document.getElementById("btnReturnEdit")?.addEventListener("click", () => {
    document.body.classList.remove("guest-preview");
    showToast("편집 모드로 돌아왔습니다.");
  });

  // 2. [커버선택]
  document.getElementById("dockBtnCover")?.addEventListener("click", () => {
    document.querySelectorAll(".dock-btn").forEach(b => b.classList.remove("active"));
    document.getElementById("dockBtnCover").classList.add("active");
    openBottomSheet("cover");
  });

  // 3. [내용편집]
  document.getElementById("dockBtnInfo")?.addEventListener("click", () => {
    document.querySelectorAll(".dock-btn").forEach(b => b.classList.remove("active"));
    document.getElementById("dockBtnInfo").classList.add("active");
    openBottomSheet("info");
  });

  // 4. [사진변경]
  document.getElementById("dockBtnPhoto")?.addEventListener("click", () => {
    document.querySelectorAll(".dock-btn").forEach(b => b.classList.remove("active"));
    document.getElementById("dockBtnPhoto").classList.add("active");
    openBottomSheet("photo");
  });

  // 5. [링크생성]
  document.getElementById("dockBtnShare")?.addEventListener("click", () => {
    openShareModal();
  });

  // Close Bottom Sheet
  document.getElementById("btnSheetClose")?.addEventListener("click", closeBottomSheet);
  sheetBackdrop?.addEventListener("click", (e) => {
    if (e.target === sheetBackdrop) closeBottomSheet();
  });

  // Share Modal buttons
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

  // Accordions
  const btnAccGroom = document.getElementById("btnAccGroomHeader");
  const btnAccBride = document.getElementById("btnAccBrideHeader");
  btnAccGroom?.addEventListener("click", () => {
    btnAccGroom.parentElement.classList.toggle("open");
  });
  btnAccBride?.addEventListener("click", () => {
    btnAccBride.parentElement.classList.toggle("open");
  });

  // Copy buttons
  document.getElementById("btnCopyGroomAcc")?.addEventListener("click", () => copyText(state.groomAccount));
  document.getElementById("btnCopyBrideAcc")?.addEventListener("click", () => copyText(state.brideAccount));
  document.getElementById("btnCopyAddr")?.addEventListener("click", () => copyText(state.venueAddress, "주소가 복사되었습니다."));

  // Contact Modal
  const contactModal = document.getElementById("contactModal");
  document.getElementById("btnOpenContactModal")?.addEventListener("click", () => {
    contactModal?.classList.add("show");
  });
  document.getElementById("btnCloseContactModal")?.addEventListener("click", () => {
    contactModal?.classList.remove("show");
  });
  contactModal?.addEventListener("click", (e) => {
    if (e.target === contactModal) contactModal.classList.remove("show");
  });

  // BGM
  let bgmPlaying = false;
  document.getElementById("btnToggleBgm")?.addEventListener("click", () => {
    bgmPlaying = !bgmPlaying;
    document.getElementById("bgmIcon").textContent = bgmPlaying ? "🔊" : "🎵";
    showToast(bgmPlaying ? "배경음악이 재생됩니다." : "배경음악이 일시정지되었습니다.");
  });

  // HTML Export & Desktop Viewer Toggle
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
    }
  });

  // Initial Render
  renderAll();

  // Initial mobile entry: open cover selection drawer automatically so user picks cover first!
  if (!isGuestMode && window.innerWidth <= 860) {
    setTimeout(() => {
      openBottomSheet("cover");
    }, 250);
  }
});
