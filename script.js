const letter = `enamorarme de ti es lo más fácil que he hecho en mi vida. nada me importa en esta vida más que tú, y cada día que pasa soy más consciente de eso. te amé el día que te conocí, te amo ahora mismo y te amaré el resto de mi vida.

eres mi lugar seguro, mi pensamiento bonito en los días difíciles y la razón por la que todo se siente más ligero. no sé cómo explicarlo sin quedarme corto, pero estar contigo me hace sentir que encontré algo que no quiero perder nunca. gracias por existir, por quedarte, por hacerme tan feliz sin siquiera intentarlo. te elegiría una y mil veces, en esta vida y en cualquiera donde vuelva a encontrarte.

la etapa de tener una novia de la paz y pasar las mejores vacaciones de su vida recomiendo no saltársela. esto empezó como un pensamiento en la playa, como un tweet cualquiera, pero terminó abriéndome las puertas para seguir esta carta que ya tenía para ti. gracias por todo lo que me hiciste vivir, por cada momento, por cada risa y por hacer de esta experiencia algo que voy a guardar para siempre en mi memoria.

creía que no podía pasármela mejor en mi vida, pero estar contigo me demostró que cada vez que compartimos más tiempo juntos, superas mis expectativas de una forma que ni yo sabía que era posible. no importa qué pase, esta experiencia será inolvidable para mí, porque la viví contigo.

hoy, en tu cumpleaños, no puedo evitar sentirme afortunado de poder celebrar tu vida. porque un día como hoy nació la persona que se volvió mi todo, la niña que me cambió los días, la forma de ver el amor y hasta la manera en la que entiendo la felicidad. paulina, mi amor. ojalá pudiera darte en palabras todo lo que significas para mí, pero se que voy a pasar mi vida intentando demostrártelo.

deseo que este nuevo año de tu vida esté lleno de momentos bonitos, de sueños cumplidos, de risas que te salgan del alma y de todo el amor que mereces. yo quiero estar ahí para verte crecer, abrazarte en tus días buenos y también en los difíciles, recordarte lo increíble que eres cuando se te olvide y hacerte sentir amada todos los días, no solo hoy.

eres la mejor mujer que he conocido en mi vida. eres mi mejor amiga, mi compañera y la mejor novia que la vida me pudo otorgar. de verdad, esto que escribo es apenas el 1 por ciento de todo lo que siento por ti, y estoy seguro de que este amor seguirá creciendo con el tiempo. celebraré hoy y todos los días de mi vida tu existencia, porque mereces todo lo bonito de la vida, paulina. genuinamente te amo.

gracias por ser tú, por tu forma de querer, por tu sonrisa, por tu corazón tan bonito y por hacer de mi vida un lugar mucho más feliz. hoy celebro tu cumpleaños, pero también celebro la suerte inmensa que tengo de coincidir contigo, de poder acompañarte y de amar a una persona tan increíble como tú.

me siento profundamente orgulloso de ti, de la persona que eres, de todo lo que has logrado y de la forma tan bonita en la que iluminas la vida de quienes tienen la suerte de conocerte. gracias por dejarme estar a tu lado, por permitirme amarte y por hacerme sentir que el amor puede ser tan real, tan tranquilo y tan inmenso.

hoy y siempre voy a estar agradecido contigo, con la vida y con todo lo que nos puso en el mismo camino. feliz cumpleaños, mi amor. te amo más de lo que puedo escribir y más de lo que alguna vez pensé amar a alguien.

Con amor,
Adrián`;

const heartScene = document.querySelector("#heartScene");
const memoryScene = document.querySelector("#memoryScene");
const letterScene = document.querySelector("#letterScene");
const loader = document.querySelector("#loader");
const openLetter = document.querySelector("#openLetter");
const openFinalLetter = document.querySelector("#openFinalLetter");
const letterText = document.querySelector("#letterText");
const skipTyping = document.querySelector("#skipTyping");
const rereadLetter = document.querySelector("#rereadLetter");
const downloadLetter = document.querySelector("#downloadLetter");
const downloadMemory = document.querySelector("#downloadMemory");
const cursor = document.querySelector("#cursor");
const dotCanvas = document.querySelector("#dotCanvas");
const paper = document.querySelector(".paper");
const envelope = document.querySelector("#envelope");
const song = document.querySelector("#song");
const finalBloom = document.querySelector("#finalBloom");
const finalCard = document.querySelector("#finalCard");
const floatingMenu = document.querySelector("#floatingMenu");
const menuToggle = document.querySelector("#menuToggle");
const menuPanel = document.querySelector("#menuPanel");
const menuQr = document.querySelector("#menuQr");
const menuMusic = document.querySelector("#menuMusic");
const volumeControl = document.querySelector("#volumeControl");
const menuHeart = document.querySelector("#menuHeart");
const menuMemories = document.querySelector("#menuMemories");
const menuLetter = document.querySelector("#menuLetter");
const qrPanel = document.querySelector("#qrPanel");
const memoryBoard = document.querySelector("#memoryBoard");
const letterBeachPhotos = document.querySelector("#letterBeachPhotos");
const photoViewer = document.querySelector("#photoViewer");
const photoViewerImage = document.querySelector("#photoViewerImage");
const photoViewerClose = document.querySelector("#photoViewerClose");
const sceneTransition = document.querySelector("#sceneTransition");
const travelTransition = document.querySelector("#travelTransition");
const viewportMeta = document.querySelector('meta[name="viewport"]');
const ctx = dotCanvas.getContext("2d");

let index = 0;
let typingFrame = null;
let typingStartedAt = 0;
let typingAutoScrollFrame = null;
let typingAutoScrollTarget = 0;
let lastAutoScrollAt = 0;
let programmaticScrollReleaseTimer = null;
let isTypingActive = false;
let isAutoScrollEnabled = false;
let userHasTakenScrollControl = false;
let isProgrammaticScroll = false;
let envelopeTimer = null;
let typingStartTimer = null;
let viewportSettleTimer = null;
let memoryTimer = null;
const typingCharactersPerSecond = 34;
const introDuration = 60000;
const bluePalette = ["#eefbff", "#d3f4ff", "#aee8ff", "#7bd3ff", "#4fbfff", "#2fa4ea", "#6ba8ff"];
const hydrangeaPalette = ["#d9f5ff", "#aee8ff", "#76cfff", "#8fb7ff", "#b7a8ff", "#d7c4ff", "#f2d8ff"];
const memoryPhotoCount = 51;
const memoryPhotoSources = Array.from(
  { length: memoryPhotoCount },
  (_, photoIndex) => `media/recuerdos/recuerdo-${String(photoIndex + 1).padStart(2, "0")}.jpeg`
);
const letterSpecialPhotoSources = Array.from(
  { length: 32 },
  (_, photoIndex) => `media/carta-recuerdos/carta-${String(photoIndex + 1).padStart(2, "0")}.jpeg`
);
const collagePhotoSourcesForLetter = [
  1, 4, 8, 11, 14, 17, 20, 22, 24, 27, 31, 34, 37, 40, 43, 47, 50, 51
].map((photoNumber) => `media/recuerdos/recuerdo-${String(photoNumber).padStart(2, "0")}.jpeg`);
const letterBeachPhotoSources = [...letterSpecialPhotoSources, ...collagePhotoSourcesForLetter];
const letterBeachMaxPerSide = 20;
const letterBeachDesktopPerSide = 16;
const letterBeachLaptopPerSide = 13;
const letterBeachCompactPerSide = 7;
const leftLetterPhotoLayout = [
  { left: 4.5, top: 10, size: "large", ratio: 0.78, rotation: -6 },
  { left: 14, top: 11, size: "medium", ratio: 0.92, rotation: 4 },
  { left: 24.5, top: 12.5, size: "small", ratio: 0.8, rotation: -3, soft: true },
  { left: 8.5, top: 24, size: "medium", ratio: 0.86, rotation: 5 },
  { left: 20.5, top: 25.5, size: "large", ratio: 0.74, rotation: -5 },
  { left: 3.8, top: 39, size: "small", ratio: 0.82, rotation: -4, soft: true },
  { left: 13.5, top: 41.5, size: "large", ratio: 0.9, rotation: 3 },
  { left: 25.2, top: 41, size: "medium", ratio: 0.78, rotation: -4 },
  { left: 7.2, top: 56, size: "large", ratio: 0.82, rotation: 4 },
  { left: 18.8, top: 57.5, size: "medium", ratio: 0.86, rotation: -6 },
  { left: 27, top: 60, size: "small", ratio: 0.74, rotation: 3, soft: true },
  { left: 4.8, top: 72.5, size: "medium", ratio: 0.8, rotation: -5 },
  { left: 15.2, top: 74.5, size: "large", ratio: 0.88, rotation: 5 },
  { left: 25.2, top: 77, size: "medium", ratio: 0.78, rotation: -3 },
  { left: 8.2, top: 88.5, size: "small", ratio: 0.84, rotation: 4, soft: true },
  { left: 20.5, top: 89.5, size: "small", ratio: 0.78, rotation: -4, soft: true },
  { left: 27.5, top: 22, size: "small", ratio: 0.86, rotation: 5, soft: true },
  { left: 27.8, top: 51, size: "small", ratio: 0.82, rotation: -2, soft: true },
  { left: 2.8, top: 86, size: "small", ratio: 0.78, rotation: -3, soft: true },
  { left: 28.2, top: 91, size: "small", ratio: 0.88, rotation: 3, soft: true }
].map((photo, photoIndex) => ({
  left: `${photo.left}%`,
  top: `${photo.top}%`,
  width: {
    large: "clamp(95px, 6.5vw, 150px)",
    medium: "clamp(82px, 5.8vw, 132px)",
    small: "clamp(72px, 5vw, 115px)"
  }[photo.size],
  ratio: String(photo.ratio),
  rotation: `${photo.rotation}deg`,
  position: "center",
  soft: photo.soft,
  layer: String(2 + (photoIndex % 5))
}));
const rightLetterPhotoLayout = leftLetterPhotoLayout.map((photo) => ({
  ...photo,
  left: `${100 - parseFloat(photo.left)}%`,
  rotation: `${-parseFloat(photo.rotation)}deg`
}));
const compactLeftLetterPhotoLayout = [
  { left: "6.2%", top: "14%", width: "clamp(54px, 8.2vw, 82px)", ratio: "0.78", rotation: "-6deg", position: "center", layer: "2" },
  { left: "16.8%", top: "18%", width: "clamp(50px, 7.4vw, 76px)", ratio: "0.92", rotation: "4deg", position: "center", layer: "3" },
  { left: "7.4%", top: "36%", width: "clamp(52px, 7.8vw, 80px)", ratio: "0.86", rotation: "5deg", position: "center", layer: "4" },
  { left: "17.4%", top: "47%", width: "clamp(56px, 8.6vw, 86px)", ratio: "0.74", rotation: "-5deg", position: "center", layer: "5" },
  { left: "6.8%", top: "64%", width: "clamp(52px, 7.8vw, 80px)", ratio: "0.82", rotation: "-4deg", position: "center", layer: "3" },
  { left: "17.2%", top: "74%", width: "clamp(50px, 7.4vw, 76px)", ratio: "0.9", rotation: "3deg", position: "center", layer: "4" },
  { left: "10.2%", top: "88%", width: "clamp(48px, 7vw, 72px)", ratio: "0.84", rotation: "4deg", position: "center", soft: true, layer: "2" }
];
const compactRightLetterPhotoLayout = compactLeftLetterPhotoLayout.map((photo) => ({
  ...photo,
  left: `${100 - parseFloat(photo.left)}%`,
  rotation: `${-parseFloat(photo.rotation)}deg`
}));
const memoryPhotoDelayStep = Math.min(0.48, Math.max(0.28, 17 / memoryPhotoSources.length));
const memoryAnimationDuration = Math.ceil((0.55 + (memoryPhotoSources.length - 1) * memoryPhotoDelayStep + 1.8) * 1000);
const memoryPhotoColumns = Math.min(13, Math.max(11, Math.ceil(Math.sqrt(memoryPhotoSources.length * 2.25))));
const memoryPhotoRows = Math.ceil(memoryPhotoSources.length / memoryPhotoColumns);
const memoryPhotoLayout = memoryPhotoSources.map((_, photoIndex) => {
  const columns = memoryPhotoColumns;
  const row = Math.floor(photoIndex / columns);
  const column = photoIndex % columns;
  const horizontalJitter = [-0.9, 0.8, -0.3, 1, -0.7, 0.5, -0.8, 0.9, -0.2, 0.7, -0.6][photoIndex % 11];
  const verticalJitter = [-1.3, 0.8, -0.5, 1.2, -0.9, 0.6, 1.3, -0.7, 0.9][photoIndex % 9];
  const left = 6 + column * (88 / Math.max(1, columns - 1)) + (row % 2 ? 1.2 : -0.4) + horizontalJitter;
  const top = 9 + row * (80 / Math.max(1, memoryPhotoRows - 1)) + verticalJitter;
  const rotation = [-6, 4, -3, 5, -4, 3, -6, 5, -4, 6, -2][photoIndex % 11];
  const ratio = [0.76, 0.88, 0.78, 0.94, 0.82, 0.72, 0.9][photoIndex % 7];

  return {
    left: `${Math.max(5, Math.min(95, left))}%`,
    top: `${Math.max(8, Math.min(88, top))}%`,
    rotation: `${rotation}deg`,
    ratio: String(ratio),
    layer: String(2 + (photoIndex % 9))
  };
});

let animationStart = performance.now();
let outlineDots = [];
let fillDots = [];
let flowerDots = [];
let heartPolygon = [];
let animationFrame = null;
let introIsReady = false;
let isMusicOn = false;
let musicWasManuallyStopped = false;
let musicVolume = Number(volumeControl.value) / 100;
let letterHasFinished = false;
let finalBloomShown = false;
let memoriesCompleted = false;
let hoveredMemoryPhoto = null;
let memoryHoverFrame = null;
let memoryPhotoRects = [];
let currentLetterBeachSelection = { left: [], right: [] };
let viewportNormalizeFrame = null;
let isSceneTransitioning = false;
let isTravelTransitioning = false;
let travelTransitionTimer = null;
let travelTransitionCleanupTimer = null;
const reducedMotionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");

function seededRandom(seed) {
  let value = seed;
  return () => {
    value = (value * 1664525 + 1013904223) % 4294967296;
    return value / 4294967296;
  };
}

const random = seededRandom(1402);

function renderMemoryPhotos() {
  setHoveredMemoryPhoto(null);
  memoryBoard.textContent = "";
  const fragment = document.createDocumentFragment();

  memoryPhotoLayout.forEach((photo, photoIndex) => {
    const card = document.createElement("button");
    const image = document.createElement("img");
    card.className = "memory-photo";
    card.type = "button";
    card.setAttribute("aria-label", `Abrir recuerdo ${photoIndex + 1}`);
    card.dataset.src = memoryPhotoSources[photoIndex];
    card.style.setProperty("--left", photo.left);
    card.style.setProperty("--top", photo.top);
    card.style.setProperty("--rotation", photo.rotation);
    card.style.setProperty("--ratio", photo.ratio);
    card.style.setProperty("--layer", photo.layer);
    card.style.setProperty("--delay", `${0.55 + photoIndex * memoryPhotoDelayStep}s`);
    image.src = memoryPhotoSources[photoIndex];
    image.alt = `Recuerdo de vacaciones ${photoIndex + 1}`;
    image.loading = photoIndex < 10 ? "eager" : "lazy";
    image.decoding = "async";
    card.appendChild(image);
    fragment.appendChild(card);
  });

  memoryBoard.appendChild(fragment);
}

function shuffleArray(items) {
  const shuffled = [...items];

  for (let i = shuffled.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }

  return shuffled;
}

function getLetterBeachPhotosPerSide() {
  if (isCompactLetterViewport()) {
    return letterBeachCompactPerSide;
  }

  if (window.matchMedia("(min-width: 1760px)").matches) {
    return letterBeachMaxPerSide;
  }

  if (window.matchMedia("(min-width: 1360px)").matches) {
    return letterBeachDesktopPerSide;
  }

  return letterBeachLaptopPerSide;
}

function isCompactLetterViewport() {
  return window.matchMedia("(max-width: 960px) and (orientation: landscape)").matches;
}

function getActiveLetterPhotoLayouts() {
  if (isCompactLetterViewport()) {
    return {
      left: compactLeftLetterPhotoLayout,
      right: compactRightLetterPhotoLayout
    };
  }

  return {
    left: leftLetterPhotoLayout,
    right: rightLetterPhotoLayout
  };
}

function getRandomPhotos(count, sourcePool, excluded = new Set()) {
  return shuffleArray(sourcePool.filter((src) => !excluded.has(src))).slice(0, count);
}

function getRandomLetterBeachSidePhotos(count, excluded = new Set()) {
  const specialCount = Math.min(Math.ceil(count * 0.62), letterSpecialPhotoSources.length);
  const collageCount = Math.max(0, count - specialCount);
  const selected = [];
  selected.push(...getRandomPhotos(specialCount, letterSpecialPhotoSources, excluded));
  selected.forEach((src) => excluded.add(src));
  selected.push(...getRandomPhotos(collageCount, collagePhotoSourcesForLetter, excluded));

  if (selected.length < count) {
    selected.push(...getRandomPhotos(count - selected.length, letterBeachPhotoSources, excluded));
  }

  return shuffleArray(selected).slice(0, count);
}

function buildBalancedLetterBeachSelection(perSide) {
  const excluded = new Set();
  const left = getRandomLetterBeachSidePhotos(perSide, excluded);
  left.forEach((src) => excluded.add(src));
  const right = getRandomLetterBeachSidePhotos(perSide, excluded);

  return { left, right };
}

function hasBalancedLetterBeachSelection(perSide) {
  return (
    currentLetterBeachSelection.left.length >= perSide &&
    currentLetterBeachSelection.right.length >= perSide
  );
}

function renderLetterBeachPhotos(options = {}) {
  letterBeachPhotos.textContent = "";
  const fragment = document.createDocumentFragment();
  const activeLayouts = getActiveLetterPhotoLayouts();
  const perSide = Math.min(
    getLetterBeachPhotosPerSide(),
    activeLayouts.left.length,
    activeLayouts.right.length
  );

  if (options.newSelection || !hasBalancedLetterBeachSelection(perSide)) {
    currentLetterBeachSelection = buildBalancedLetterBeachSelection(perSide);
  }

  function appendPhoto(src, layout, photoIndex, side) {
    const photo = document.createElement("span");
    const image = document.createElement("img");

    photo.className = `letter-beach-photo is-${side}${layout.soft ? " is-soft" : ""}`;
    photo.style.setProperty("--delay", `${photoIndex * 42}ms`);
    photo.style.setProperty("--left", layout.left);
    photo.style.setProperty("--top", layout.top);
    photo.style.setProperty("--width", layout.width);
    photo.style.setProperty("--ratio", layout.ratio);
    photo.style.setProperty("--rotation", layout.rotation);
    photo.style.setProperty("--position", layout.position);
    photo.style.setProperty("--layer", layout.layer);

    image.src = src;
    image.alt = "";
    image.loading = photoIndex < 4 ? "eager" : "lazy";
    image.decoding = "async";

    photo.appendChild(image);
    fragment.appendChild(photo);
  }

  currentLetterBeachSelection.left.slice(0, perSide).forEach((src, photoIndex) => {
    appendPhoto(src, activeLayouts.left[photoIndex], photoIndex, "left");
  });

  currentLetterBeachSelection.right.slice(0, perSide).forEach((src, photoIndex) => {
    appendPhoto(src, activeLayouts.right[photoIndex], photoIndex + perSide, "right");
  });

  letterBeachPhotos.appendChild(fragment);
}

function openPhotoViewer(src) {
  if (!src) {
    return;
  }

  photoViewerImage.src = src;
  photoViewer.setAttribute("aria-hidden", "false");
  requestAnimationFrame(() => {
    photoViewer.classList.add("is-visible");
    photoViewerClose.focus();
  });
}

function closePhotoViewer() {
  photoViewer.classList.remove("is-visible");
  photoViewer.setAttribute("aria-hidden", "true");
  photoViewerImage.removeAttribute("src");
}

function refreshMemoryPhotoRects() {
  memoryPhotoRects = Array.from(memoryBoard.querySelectorAll(".memory-photo")).map((photo) => {
    const rect = photo.getBoundingClientRect();
    return {
      photo,
      left: rect.left,
      right: rect.right,
      top: rect.top,
      bottom: rect.bottom,
      centerX: rect.left + rect.width / 2,
      centerY: rect.top + rect.height / 2,
      layer: Number(photo.style.getPropertyValue("--layer")) || 0
    };
  });
}

function findMemoryPhotoAtPoint(clientX, clientY) {
  let selectedPhoto = null;
  let selectedScore = Number.POSITIVE_INFINITY;

  if (!memoryPhotoRects.length) {
    refreshMemoryPhotoRects();
  }

  memoryPhotoRects.forEach((item) => {
    if (
      clientX < item.left ||
      clientX > item.right ||
      clientY < item.top ||
      clientY > item.bottom
    ) {
      return;
    }

    const distance = Math.hypot(clientX - item.centerX, clientY - item.centerY);
    const score = distance - item.layer * 2;

    if (score < selectedScore) {
      selectedScore = score;
      selectedPhoto = item.photo;
    }
  });

  return selectedPhoto;
}

function setHoveredMemoryPhoto(photo) {
  if (hoveredMemoryPhoto === photo) {
    return;
  }

  if (hoveredMemoryPhoto) {
    hoveredMemoryPhoto.classList.remove("is-hovered");
  }

  hoveredMemoryPhoto = photo;

  if (hoveredMemoryPhoto) {
    hoveredMemoryPhoto.classList.add("is-hovered");
  }
}

function updateMemoryHover(event) {
  if (!memoriesCompleted || photoViewer.classList.contains("is-visible")) {
    setHoveredMemoryPhoto(null);
    return;
  }

  window.cancelAnimationFrame(memoryHoverFrame);
  memoryHoverFrame = window.requestAnimationFrame(() => {
    setHoveredMemoryPhoto(findMemoryPhotoAtPoint(event.clientX, event.clientY));
  });
}

function resetMemoryAnimation() {
  window.clearTimeout(memoryTimer);
  memoriesCompleted = false;
  memoryPhotoRects = [];
  memoryScene.classList.remove("is-memory-complete");
  renderMemoryPhotos();
  memoryTimer = window.setTimeout(() => {
    memoriesCompleted = true;
    memoryScene.classList.add("is-memory-complete");
    refreshMemoryPhotoRects();
  }, memoryAnimationDuration);
}

function completeMemoryAnimation() {
  window.clearTimeout(memoryTimer);
  if (!memoryBoard.children.length) {
    renderMemoryPhotos();
  }
  memoriesCompleted = true;
  memoryScene.classList.add("is-memory-complete");
  window.requestAnimationFrame(refreshMemoryPhotoRects);
}

function updateGlobalMenu() {
  menuMusic.setAttribute("aria-pressed", String(isMusicOn));
  menuMusic.textContent = isMusicOn ? "Música ON" : "Música OFF";
  [menuHeart, menuMemories, menuLetter].forEach((button) => {
    button.disabled = !letterHasFinished;
  });
}

function openGlobalMenu() {
  floatingMenu.classList.add("is-open");
  menuToggle.setAttribute("aria-expanded", "true");
  menuToggle.setAttribute("aria-label", "Cerrar menú");
}

function closeGlobalMenu() {
  floatingMenu.classList.remove("is-open");
  menuToggle.setAttribute("aria-expanded", "false");
  menuToggle.setAttribute("aria-label", "Abrir menú");
}

function toggleGlobalMenu() {
  if (floatingMenu.classList.contains("is-open")) {
    closeGlobalMenu();
  } else {
    updateGlobalMenu();
    openGlobalMenu();
  }
}

function markLetterFinished() {
  letterHasFinished = true;
  updateGlobalMenu();
}

function startMusic(options = {}) {
  const isAutomatic = Boolean(options.automatic);

  if (isMusicOn) {
    return Promise.resolve(true);
  }

  if (isAutomatic && musicWasManuallyStopped) {
    return Promise.resolve(false);
  }

  song.volume = musicVolume;
  const playPromise = song.play();

  if (playPromise) {
    return playPromise
      .then(() => {
        isMusicOn = true;
        updateGlobalMenu();
        return true;
      })
      .catch(() => {
        isMusicOn = false;
        updateGlobalMenu();
        return false;
      });
  }

  isMusicOn = true;
  updateGlobalMenu();
  return Promise.resolve(true);
}

function armMusicAutoplayFallback() {
  const tryAfterInteraction = (event) => {
    if (event.target.closest("#menuMusic") || event.target.closest("#volumeControl")) {
      return;
    }

    if (!isMusicOn && !musicWasManuallyStopped) {
      startMusic({ automatic: true });
    }
    document.removeEventListener("pointerdown", tryAfterInteraction, true);
    document.removeEventListener("touchend", tryAfterInteraction, true);
    document.removeEventListener("keydown", tryAfterInteraction, true);
  };

  document.addEventListener("pointerdown", tryAfterInteraction, true);
  document.addEventListener("touchend", tryAfterInteraction, true);
  document.addEventListener("keydown", tryAfterInteraction, true);
}

function setAppViewportSize() {
  const viewportWidth = window.visualViewport ? window.visualViewport.width : window.innerWidth;
  const viewportHeight = window.visualViewport ? window.visualViewport.height : window.innerHeight;
  document.documentElement.style.setProperty("--app-width", `${Math.round(viewportWidth)}px`);
  document.documentElement.style.setProperty("--app-height", `${Math.round(viewportHeight)}px`);
}

function normalizeMobileViewport() {
  window.cancelAnimationFrame(viewportNormalizeFrame);
  viewportNormalizeFrame = window.requestAnimationFrame(runViewportNormalization);
}

function runViewportNormalization() {
  if (viewportMeta) {
    viewportMeta.setAttribute(
      "content",
      "width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no, viewport-fit=cover"
    );
  }

  window.clearTimeout(viewportSettleTimer);
  document.body.classList.add("is-orientation-settling");
  setAppViewportSize();
  window.scrollTo(0, 0);
  document.documentElement.scrollTop = 0;
  document.body.scrollTop = 0;

  viewportSettleTimer = window.setTimeout(() => {
    setAppViewportSize();
    resizeCanvas();
    createDots();
    if (letterScene.classList.contains("is-active")) {
      renderLetterBeachPhotos();
    }
    memoryPhotoRects = [];
    window.scrollTo(0, 0);
    document.body.classList.remove("is-orientation-settling");
  }, 520);
}

function stopMusic() {
  isMusicOn = false;
  musicWasManuallyStopped = true;
  updateGlobalMenu();
  song.pause();
}

function runSceneTransition(changeScene) {
  if (isSceneTransitioning || isTravelTransitioning) {
    return;
  }

  isSceneTransitioning = true;
  sceneTransition.classList.add("is-visible");

  window.setTimeout(() => {
    changeScene();

    window.setTimeout(() => {
      sceneTransition.classList.remove("is-visible");
      isSceneTransitioning = false;
    }, 180);
  }, 420);
}

function shouldUseSimpleTravelTransition() {
  return (
    reducedMotionQuery.matches ||
    window.matchMedia("(max-width: 960px)").matches ||
    navigator.hardwareConcurrency <= 4
  );
}

function startTravelTransition() {
  if (isTravelTransitioning || letterScene.classList.contains("is-active")) {
    return;
  }

  isTravelTransitioning = true;
  completeMemoryAnimation();
  startMusic();
  window.clearTimeout(travelTransitionTimer);
  window.clearTimeout(travelTransitionCleanupTimer);
  document.body.classList.add("is-traveling");
  openFinalLetter.disabled = true;
  travelTransition.classList.toggle("is-simple", shouldUseSimpleTravelTransition());
  travelTransition.setAttribute("aria-hidden", "false");
  travelTransition.classList.remove("is-active");

  requestAnimationFrame(() => {
    travelTransition.classList.add("is-active");
  });

  const duration = reducedMotionQuery.matches ? 900 : shouldUseSimpleTravelTransition() ? 3600 : 7200;
  travelTransitionTimer = window.setTimeout(finishTravelTransition, duration);
}

function finishTravelTransition() {
  if (!isTravelTransitioning) {
    return;
  }

  window.clearTimeout(travelTransitionTimer);
  letterScene.classList.add("from-beach-transition");
  showLetterScene();

  travelTransitionCleanupTimer = window.setTimeout(() => {
    travelTransition.classList.remove("is-active", "is-simple");
    travelTransition.setAttribute("aria-hidden", "true");
    document.body.classList.remove("is-traveling");
    openFinalLetter.disabled = false;
    isTravelTransitioning = false;
    window.setTimeout(() => {
      letterScene.classList.remove("from-beach-transition");
    }, 900);
  }, reducedMotionQuery.matches ? 80 : 420);
}

function ease(value) {
  const t = Math.max(0, Math.min(1, value));
  return t * t * (3 - 2 * t);
}

function progressBetween(value, start, end) {
  return ease((value - start) / (end - start));
}

function heartPoint(t) {
  return {
    x: 16 * Math.sin(t) ** 3 / 18,
    y: (
      13 * Math.cos(t) -
      5 * Math.cos(2 * t) -
      2 * Math.cos(3 * t) -
      Math.cos(4 * t)
    ) / 18
  };
}

function isInsidePolygon(x, y, polygon) {
  let inside = false;

  for (let i = 0, j = polygon.length - 1; i < polygon.length; j = i, i += 1) {
    const xi = polygon[i].x;
    const yi = polygon[i].y;
    const xj = polygon[j].x;
    const yj = polygon[j].y;
    const crosses = yi > y !== yj > y && x < ((xj - xi) * (y - yi)) / (yj - yi) + xi;

    if (crosses) {
      inside = !inside;
    }
  }

  return inside;
}

function createDots() {
  outlineDots = [];
  fillDots = [];
  flowerDots = [];
  heartPolygon = [];

  for (let i = 0; i < 760; i += 1) {
    const t = (i / 760) * Math.PI * 2;
    const point = heartPoint(t);
    heartPolygon.push(point);
    outlineDots.push({
      x: point.x,
      y: point.y,
      radius: 2 + random() * 2.2,
      color: bluePalette[i % bluePalette.length],
      twinkle: random() * Math.PI * 2
    });
  }

  const center = heartPolygon.reduce(
    (sum, point) => ({ x: sum.x + point.x, y: sum.y + point.y }),
    { x: 0, y: 0 }
  );
  center.x /= heartPolygon.length;
  center.y /= heartPolygon.length;

  while (fillDots.length < 2600) {
    const x = random() * 1.78 - 0.89;
    const y = random() * 1.61 - 0.95;
    if (isInsidePolygon(x, y, heartPolygon)) {
      const inset = 0.84 + random() * 0.07;
      fillDots.push({
        x: center.x + (x - center.x) * inset,
        y: center.y + (y - center.y) * inset,
        radius: 1.2 + random() * 1.55,
        color: bluePalette[Math.floor(random() * bluePalette.length)],
        twinkle: random() * Math.PI * 2,
        order: Math.abs(x) * 0.24 + (0.75 - y) * 0.42 + random() * 0.2
      });
    }
  }

  fillDots.sort((a, b) => a.order - b.order);

  const hydrangeas = [
    { x: -1.2, y: 0.45, size: 0.24, start: 0.36, tint: 0 },
    { x: 1.2, y: 0.43, size: 0.23, start: 0.43, tint: 2 },
    { x: -1.34, y: -0.24, size: 0.2, start: 0.5, tint: 4 },
    { x: 1.34, y: -0.27, size: 0.21, start: 0.57, tint: 1 },
    { x: -0.98, y: -0.84, size: 0.18, start: 0.64, tint: 3 },
    { x: 1.02, y: -0.88, size: 0.18, start: 0.71, tint: 5 },
    { x: 0, y: -1.17, size: 0.19, start: 0.79, tint: 2 }
  ];

  hydrangeas.forEach((cluster, clusterIndex) => {
    const blossomCount = Math.floor(34 + cluster.size * 120);

    for (let blossom = 0; blossom < blossomCount; blossom += 1) {
      const angle = random() * Math.PI * 2;
      const distance = Math.sqrt(random()) * cluster.size;
      const blossomX = cluster.x + Math.cos(angle) * distance * 1.18;
      const blossomY = cluster.y + Math.sin(angle) * distance * 0.88;
      const blossomSize = cluster.size * (0.13 + random() * 0.05);
      const color = hydrangeaPalette[(cluster.tint + blossom + clusterIndex) % hydrangeaPalette.length];
      const start = cluster.start + blossom * 0.0012;

      for (let petal = 0; petal < 4; petal += 1) {
        const petalAngle = (petal / 4) * Math.PI * 2 + random() * 0.28;
        for (let dot = 0; dot < 4; dot += 1) {
          const petalSpread = blossomSize * (0.35 + random() * 0.55);
          flowerDots.push({
            x: blossomX + Math.cos(petalAngle) * blossomSize + (random() - 0.5) * petalSpread,
            y: blossomY + Math.sin(petalAngle) * blossomSize + (random() - 0.5) * petalSpread,
            radius: 0.95 + random() * 1.35,
            color,
            start: start + dot * 0.0008,
            twinkle: random() * Math.PI * 2
          });
        }
      }

      flowerDots.push({
        x: blossomX + (random() - 0.5) * blossomSize,
        y: blossomY + (random() - 0.5) * blossomSize,
        radius: 0.9 + random() * 1.1,
        color: "#f5fcff",
        start: start + 0.01,
        twinkle: random() * Math.PI * 2
      });
    }
  });
}

function resizeCanvas() {
  const pixelRatio = window.devicePixelRatio || 1;
  dotCanvas.width = Math.floor(window.innerWidth * pixelRatio);
  dotCanvas.height = Math.floor(window.innerHeight * pixelRatio);
  dotCanvas.style.width = `${window.innerWidth}px`;
  dotCanvas.style.height = `${window.innerHeight}px`;
  ctx.setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0);
}

function drawDot(dot, scale, centerX, centerY, alpha, pulse) {
  const x = centerX + dot.x * scale;
  const y = centerY - dot.y * scale;
  const glow = dot.radius * (2.2 + pulse);

  ctx.globalAlpha = alpha * 0.32;
  ctx.beginPath();
  ctx.fillStyle = dot.color;
  ctx.arc(x, y, glow, 0, Math.PI * 2);
  ctx.fill();

  ctx.globalAlpha = alpha;
  ctx.beginPath();
  ctx.fillStyle = dot.color;
  ctx.arc(x, y, dot.radius * (0.88 + pulse * 0.18), 0, Math.PI * 2);
  ctx.fill();
}

function setHeartClip(scale, centerX, centerY) {
  ctx.beginPath();
  heartPolygon.forEach((point, index) => {
    const x = centerX + point.x * scale;
    const y = centerY - point.y * scale;

    if (index === 0) {
      ctx.moveTo(x, y);
    } else {
      ctx.lineTo(x, y);
    }
  });
  ctx.closePath();
  ctx.clip();
}

function drawDotAnimation(now) {
  const width = window.innerWidth;
  const height = window.innerHeight;
  const elapsed = now - animationStart;
  const progress = Math.min(1, elapsed / introDuration);
  const shrink = progressBetween(progress, 0.78, 0.97);
  const largeScale = Math.min(width, height) * 0.72;
  const finalScale = Math.min(width, height) * 0.18;
  const scale = largeScale + (finalScale - largeScale) * shrink;
  const centerX = width / 2;
  const centerY = height * (0.47 + (0.4 - 0.47) * shrink);
  const pulse = Math.sin(now / 420) * 0.18 + 0.24;

  ctx.clearRect(0, 0, width, height);

  const outlineVisible = Math.floor(outlineDots.length * progressBetween(progress, 0.02, 0.34));
  const fillVisible = Math.floor(fillDots.length * progressBetween(progress, 0.26, 0.76));

  ctx.save();
  setHeartClip(scale * 0.96, centerX, centerY);
  for (let i = 0; i < fillVisible; i += 1) {
    const dot = fillDots[i];
    drawDot(dot, scale, centerX, centerY, 0.64 + Math.sin(now / 700 + dot.twinkle) * 0.18, pulse * 0.7);
  }
  ctx.restore();

  for (let i = 0; i < outlineVisible; i += 1) {
    const dot = outlineDots[i];
    drawDot(dot, scale, centerX, centerY, 0.78 + Math.sin(now / 620 + dot.twinkle) * 0.2, pulse);
  }

  flowerDots.forEach((dot) => {
    const alpha = progressBetween(progress, dot.start, dot.start + 0.08);
    if (alpha > 0) {
      drawDot(dot, scale, centerX, centerY, alpha * 0.9, pulse * 0.6);
    }
  });

  if (progress > 0.97 && !introIsReady) {
    introIsReady = true;
    heartScene.classList.add("is-ready");
  }

  animationFrame = window.requestAnimationFrame(drawDotAnimation);
}

function startDotAnimation() {
  window.cancelAnimationFrame(animationFrame);
  introIsReady = false;
  heartScene.classList.remove("is-ready");
  animationStart = performance.now();
  resizeCanvas();
  createDots();
  animationFrame = window.requestAnimationFrame(drawDotAnimation);
}

function showLetterScene(options = {}) {
  if (letterScene.classList.contains("is-active") && !memoryScene.classList.contains("is-active")) {
    return;
  }

  const shouldShowCompleted = Boolean(options.completed || letterHasFinished);

  renderLetterBeachPhotos({ newSelection: !hasBalancedLetterBeachSelection(getLetterBeachPhotosPerSide()) });
  startMusic();
  window.cancelAnimationFrame(animationFrame);
  window.clearTimeout(envelopeTimer);
  window.clearTimeout(typingStartTimer);
  window.clearTimeout(memoryTimer);
  stopTyping();
  resetTypingAutoScroll();
  completeMemoryAnimation();
  heartScene.classList.remove("is-active");
  memoryScene.classList.remove("is-active");
  letterScene.classList.add("is-active");
  letterScene.removeAttribute("aria-hidden");
  heartScene.setAttribute("aria-hidden", "true");
  memoryScene.setAttribute("aria-hidden", "true");

  if (shouldShowCompleted) {
    letterScene.classList.add("is-open");
    index = letter.length;
    renderFullLetter();
    cursor.hidden = true;
    markProgrammaticPaperScroll();
    paper.scrollTop = 0;
    showFinalBloom();
    updateGlobalMenu();
    return;
  }

  letterScene.classList.remove("is-open");
  index = 0;
  letterText.textContent = "";
  cursor.hidden = false;
  finalBloomShown = false;
  finalBloom.classList.remove("is-visible");
  finalBloom.textContent = "";
  finalCard.classList.remove("is-visible");
  envelopeTimer = window.setTimeout(() => {
    letterScene.classList.add("is-open");
    typingStartTimer = window.setTimeout(startTyping, 850);
  }, 2200);
}

function showMemoryScene(options = {}) {
  startMusic();
  window.cancelAnimationFrame(animationFrame);
  window.clearTimeout(envelopeTimer);
  window.clearTimeout(typingStartTimer);
  window.clearTimeout(memoryTimer);
  stopTyping();
  resetTypingAutoScroll();
  index = 0;
  letterText.textContent = "";
  cursor.hidden = false;
  paper.scrollTop = 0;
  finalBloomShown = false;
  finalBloom.classList.remove("is-visible");
  finalBloom.textContent = "";
  finalCard.classList.remove("is-visible");
  currentLetterBeachSelection = { left: [], right: [] };
  letterScene.classList.remove("is-open");
  letterScene.classList.remove("is-active");
  letterScene.classList.remove("from-beach-transition");
  heartScene.classList.remove("is-active");
  memoryScene.classList.add("is-active");
  memoryScene.removeAttribute("aria-hidden");
  heartScene.setAttribute("aria-hidden", "true");
  letterScene.setAttribute("aria-hidden", "true");

  if (options.completed) {
    completeMemoryAnimation();
  } else {
    resetMemoryAnimation();
  }
}

function showHeartScene() {
  window.clearTimeout(envelopeTimer);
  window.clearTimeout(typingStartTimer);
  window.clearTimeout(memoryTimer);
  stopTyping();
  resetTypingAutoScroll();
  index = 0;
  letterText.textContent = "";
  cursor.hidden = false;
  paper.scrollTop = 0;
  finalBloomShown = false;
  finalBloom.classList.remove("is-visible");
  finalBloom.textContent = "";
  finalCard.classList.remove("is-visible");
  currentLetterBeachSelection = { left: [], right: [] };
  memoryScene.classList.remove("is-active");
  memoryScene.classList.remove("is-memory-complete");
  letterScene.classList.remove("is-open");
  letterScene.classList.remove("is-active");
  letterScene.classList.remove("from-beach-transition");
  heartScene.classList.add("is-active");
  heartScene.removeAttribute("aria-hidden");
  memoryScene.setAttribute("aria-hidden", "true");
  letterScene.setAttribute("aria-hidden", "true");
  startDotAnimation();
}

function startTyping() {
  stopTyping();
  resetTypingAutoScroll();
  index = 0;
  letterText.textContent = "";
  cursor.hidden = false;
  finalBloomShown = false;
  finalBloom.classList.remove("is-visible");
  finalBloom.textContent = "";
  finalCard.classList.remove("is-visible");
  markProgrammaticPaperScroll();
  paper.scrollTop = 0;
  isTypingActive = true;
  isAutoScrollEnabled = true;
  userHasTakenScrollControl = false;
  typingStartedAt = performance.now();
  typingFrame = window.requestAnimationFrame(typeNextCharacter);
}

function stopTyping() {
  if (typingFrame) {
    window.cancelAnimationFrame(typingFrame);
    typingFrame = null;
  }

  isTypingActive = false;
  isAutoScrollEnabled = false;
  window.cancelAnimationFrame(typingAutoScrollFrame);
  typingAutoScrollFrame = null;
}

function resetTypingAutoScroll() {
  window.cancelAnimationFrame(typingAutoScrollFrame);
  window.clearTimeout(programmaticScrollReleaseTimer);
  typingAutoScrollFrame = null;
  typingAutoScrollTarget = 0;
  lastAutoScrollAt = 0;
  isAutoScrollEnabled = false;
  userHasTakenScrollControl = false;
  isProgrammaticScroll = false;
}

function markProgrammaticPaperScroll() {
  window.clearTimeout(programmaticScrollReleaseTimer);
  isProgrammaticScroll = true;
  programmaticScrollReleaseTimer = window.setTimeout(() => {
    isProgrammaticScroll = false;
  }, 140);
}

function disableTypingAutoScrollFromUser() {
  if (!isTypingActive) {
    return;
  }

  userHasTakenScrollControl = true;
  isAutoScrollEnabled = false;
  window.cancelAnimationFrame(typingAutoScrollFrame);
  typingAutoScrollFrame = null;
}

function animatePaperScroll() {
  if (!isTypingActive || !isAutoScrollEnabled || userHasTakenScrollControl) {
    typingAutoScrollFrame = null;
    return;
  }

  const distance = typingAutoScrollTarget - paper.scrollTop;

  if (Math.abs(distance) < 1) {
    markProgrammaticPaperScroll();
    paper.scrollTop = typingAutoScrollTarget;
    typingAutoScrollFrame = null;
    return;
  }

  markProgrammaticPaperScroll();
  paper.scrollTop += distance * (reducedMotionQuery.matches ? 0.9 : 0.22);
  typingAutoScrollFrame = window.requestAnimationFrame(animatePaperScroll);
}

function scrollPaperToTypingCursor(target) {
  if (!isTypingActive || !isAutoScrollEnabled || userHasTakenScrollControl) {
    return;
  }

  const maxScroll = Math.max(0, paper.scrollHeight - paper.clientHeight);
  typingAutoScrollTarget = Math.max(0, Math.min(maxScroll, target));

  if (reducedMotionQuery.matches) {
    markProgrammaticPaperScroll();
    paper.scrollTop = typingAutoScrollTarget;
    return;
  }

  if (!typingAutoScrollFrame) {
    typingAutoScrollFrame = window.requestAnimationFrame(animatePaperScroll);
  }
}

function keepTypedTextVisible(now = performance.now()) {
  if (!isTypingActive || !isAutoScrollEnabled || userHasTakenScrollControl) {
    return;
  }

  if (now - lastAutoScrollAt < 180) {
    return;
  }

  const maxScroll = Math.max(0, paper.scrollHeight - paper.clientHeight);
  if (maxScroll <= 0) {
    return;
  }

  const cursorBottom = cursor.offsetTop + cursor.offsetHeight;
  const visibleBottom = paper.scrollTop + paper.clientHeight;
  const lowerComfortZone = Math.max(86, paper.clientHeight * 0.24);

  if (cursorBottom < visibleBottom - lowerComfortZone) {
    return;
  }

  lastAutoScrollAt = now;
  scrollPaperToTypingCursor(cursorBottom - paper.clientHeight + lowerComfortZone);
}

function typeNextCharacter(now) {
  const elapsedSeconds = (now - typingStartedAt) / 1000;
  const nextIndex = Math.min(letter.length, Math.floor(elapsedSeconds * typingCharactersPerSecond));

  if (nextIndex !== index) {
    letterText.append(letter.slice(index, nextIndex));
    index = nextIndex;
    keepTypedTextVisible(now);
  }

  if (index >= letter.length) {
    keepTypedTextVisible(now);
    stopTyping();
    cursor.hidden = true;
    markLetterFinished();
    showFinalBloom();
    return;
  }

  typingFrame = window.requestAnimationFrame(typeNextCharacter);
}

function completeLetter() {
  stopTyping();
  resetTypingAutoScroll();
  index = letter.length;
  renderFullLetter();
  cursor.hidden = true;
  paper.scrollTop = 0;
  markLetterFinished();
  showFinalBloom();
}

function rereadCurrentLetter() {
  window.clearTimeout(typingStartTimer);
  stopTyping();
  resetTypingAutoScroll();
  startTyping();
}

function renderFullLetter() {
  letterText.textContent = letter;
}

function showFinalBloom() {
  if (finalBloomShown) {
    return;
  }

  finalBloomShown = true;
  finalCard.classList.add("is-visible");
  finalBloom.textContent = "";
  finalBloom.classList.add("is-visible");

  const colors = ["#d9f5ff", "#aee8ff", "#76cfff", "#8fb7ff", "#d7c4ff", "#f2d8ff"];

  for (let i = 0; i < 46; i += 1) {
    const dot = document.createElement("span");
    const angle = (i / 46) * Math.PI * 2;
    const distance = 160 + Math.random() * 180;
    dot.className = "bloom-dot";
    dot.style.setProperty("--x", `${Math.cos(angle) * distance}px`);
    dot.style.setProperty("--y", `${Math.sin(angle) * distance * 0.72}px`);
    dot.style.setProperty("--size", `${5 + Math.random() * 9}px`);
    dot.style.setProperty("--color", colors[i % colors.length]);
    dot.style.animationDelay = `${Math.random() * 260}ms`;
    finalBloom.appendChild(dot);
  }

  window.setTimeout(() => {
    finalBloom.classList.remove("is-visible");
  }, 3300);
}

function loadCanvasImage(src) {
  return new Promise((resolve, reject) => {
    const image = new Image();
    image.onload = () => resolve(image);
    image.onerror = reject;
    image.src = src;
  });
}

function drawImageCover(context, image, x, y, width, height) {
  const imageRatio = image.width / image.height;
  const targetRatio = width / height;
  let sourceWidth = image.width;
  let sourceHeight = image.height;
  let sourceX = 0;
  let sourceY = 0;

  if (imageRatio > targetRatio) {
    sourceWidth = image.height * targetRatio;
    sourceX = (image.width - sourceWidth) / 2;
  } else {
    sourceHeight = image.width / targetRatio;
    sourceY = (image.height - sourceHeight) / 2;
  }

  context.drawImage(image, sourceX, sourceY, sourceWidth, sourceHeight, x, y, width, height);
}

function drawRoundedRect(context, x, y, width, height, radius) {
  const safeRadius = Math.min(radius, width / 2, height / 2);

  context.beginPath();
  context.moveTo(x + safeRadius, y);
  context.lineTo(x + width - safeRadius, y);
  context.quadraticCurveTo(x + width, y, x + width, y + safeRadius);
  context.lineTo(x + width, y + height - safeRadius);
  context.quadraticCurveTo(x + width, y + height, x + width - safeRadius, y + height);
  context.lineTo(x + safeRadius, y + height);
  context.quadraticCurveTo(x, y + height, x, y + height - safeRadius);
  context.lineTo(x, y + safeRadius);
  context.quadraticCurveTo(x, y, x + safeRadius, y);
  context.closePath();
}

function drawPaperShape(context, x, y, width, height) {
  const points = [
    [0.02, 0.03],
    [0.1, 0.01],
    [0.22, 0.03],
    [0.36, 0.015],
    [0.52, 0.03],
    [0.68, 0.01],
    [0.82, 0.03],
    [0.98, 0.02],
    [0.965, 0.18],
    [0.98, 0.34],
    [0.965, 0.53],
    [0.98, 0.7],
    [0.96, 0.97],
    [0.84, 0.99],
    [0.66, 0.975],
    [0.5, 0.99],
    [0.32, 0.97],
    [0.16, 0.99],
    [0.02, 0.96],
    [0.035, 0.78],
    [0.02, 0.6],
    [0.035, 0.42],
    [0.02, 0.24]
  ];

  context.beginPath();
  points.forEach(([pointX, pointY], pointIndex) => {
    const targetX = x + pointX * width;
    const targetY = y + pointY * height;

    if (pointIndex === 0) {
      context.moveTo(targetX, targetY);
    } else {
      context.lineTo(targetX, targetY);
    }
  });
  context.closePath();
}

function getSceneExportMetrics(scene, preferredWidth = 1920) {
  const sceneRect = scene.getBoundingClientRect();
  const safeWidth = Math.max(1, sceneRect.width || window.innerWidth || 16);
  const safeHeight = Math.max(1, sceneRect.height || window.innerHeight || 9);
  const width = preferredWidth;
  const height = Math.round(width * (safeHeight / safeWidth));

  return {
    sceneRect,
    width,
    height,
    scaleX: width / safeWidth,
    scaleY: height / safeHeight
  };
}

function getElementCenter(element, sceneRect, scaleX, scaleY) {
  const rect = element.getBoundingClientRect();

  return {
    x: (rect.left + rect.width / 2 - sceneRect.left) * scaleX,
    y: (rect.top + rect.height / 2 - sceneRect.top) * scaleY,
    rect
  };
}

function getCssNumber(element, propertyName, fallback = 0) {
  const value = element.style.getPropertyValue(propertyName) || getComputedStyle(element).getPropertyValue(propertyName);
  const parsed = parseFloat(value);

  return Number.isFinite(parsed) ? parsed : fallback;
}

function getPhotoRotation(element) {
  const rotationValue = element.style.getPropertyValue("--rotation") || "0deg";

  return (parseFloat(rotationValue) || 0) * Math.PI / 180;
}

function drawPhotoFromElement(context, image, element, sceneRect, scaleX, scaleY, options = {}) {
  const { x, y } = getElementCenter(element, sceneRect, scaleX, scaleY);
  const baseWidth = element.offsetWidth * scaleX;
  const baseHeight = element.offsetHeight * scaleY;
  const rotation = getPhotoRotation(element);
  const radius = options.radius || Math.max(10, Math.min(baseWidth, baseHeight) * 0.065);
  const padding = options.padding ?? getCssNumber(element, "padding-left", 0) * ((scaleX + scaleY) / 2);
  const opacity = options.opacity ?? parseFloat(getComputedStyle(element).opacity || "1");

  context.save();
  context.globalAlpha = Number.isFinite(opacity) ? opacity : 1;
  context.translate(x, y);
  context.rotate(rotation);
  context.shadowColor = options.shadowColor || "rgba(58, 80, 94, 0.2)";
  context.shadowBlur = options.shadowBlur || 24;
  context.shadowOffsetY = options.shadowOffsetY || 12;

  drawRoundedRect(context, -baseWidth / 2, -baseHeight / 2, baseWidth, baseHeight, radius);
  context.fillStyle = options.background || "rgba(255, 255, 255, 0.9)";
  context.fill();

  const imageX = -baseWidth / 2 + padding;
  const imageY = -baseHeight / 2 + padding;
  const imageWidth = baseWidth - padding * 2;
  const imageHeight = baseHeight - padding * 2;
  context.shadowColor = "transparent";
  drawRoundedRect(context, imageX, imageY, imageWidth, imageHeight, Math.max(6, radius - padding));
  context.clip();

  if (image) {
    drawImageCover(context, image, imageX, imageY, imageWidth, imageHeight);
  } else {
    drawMemoryPlaceholder(context, imageX, imageY, imageWidth, imageHeight, options.index || 0);
  }

  context.restore();

  if (options.tape) {
    context.save();
    context.globalAlpha = opacity;
    context.translate(x, y - baseHeight / 2 - options.tapeOffset * scaleY);
    context.rotate(rotation - 0.04);
    context.fillStyle = options.tapeColor || "rgba(225, 244, 255, 0.58)";
    drawRoundedRect(context, -baseWidth * 0.18, -5 * scaleY, baseWidth * 0.36, 10 * scaleY, 3 * scaleY);
    context.fill();
    context.restore();
  }
}

function drawSandTexture(context, width, height) {
  const background = context.createLinearGradient(0, 0, width, height);
  background.addColorStop(0, "#ead0a0");
  background.addColorStop(0.34, "#fff0c8");
  background.addColorStop(0.68, "#efd8aa");
  background.addColorStop(1, "#cda16a");
  context.fillStyle = background;
  context.fillRect(0, 0, width, height);

  const grainColors = ["rgba(255,255,255,0.42)", "rgba(137,96,48,0.18)", "rgba(236,201,143,0.34)"];
  for (let i = 0; i < 2100; i += 1) {
    const x = (i * 67) % width;
    const y = (i * 131) % height;
    const radius = 0.65 + (i % 4) * 0.28;
    context.fillStyle = grainColors[i % grainColors.length];
    context.beginPath();
    context.arc(x, y, radius, 0, Math.PI * 2);
    context.fill();
  }

  const glow = context.createRadialGradient(width * 0.48, height * 0.44, 0, width * 0.48, height * 0.44, width * 0.55);
  glow.addColorStop(0, "rgba(255, 250, 230, 0.5)");
  glow.addColorStop(1, "rgba(255, 250, 230, 0)");
  context.fillStyle = glow;
  context.fillRect(0, 0, width, height);
}

function drawLetterBeachBackground(context, width, height) {
  const skySea = context.createLinearGradient(0, 0, 0, height * 0.46);
  skySea.addColorStop(0, "#4ab2e0");
  skySea.addColorStop(0.52, "#d8f5ff");
  skySea.addColorStop(1, "#fff2d0");
  context.fillStyle = skySea;
  context.fillRect(0, 0, width, height * 0.46);

  context.fillStyle = "rgba(255, 255, 255, 0.68)";
  context.beginPath();
  context.ellipse(width * 0.5, height * 0.31, width * 0.64, height * 0.1, 0, 0, Math.PI * 2);
  context.fill();

  context.save();
  context.beginPath();
  context.rect(0, height * 0.38, width, height * 0.62);
  context.clip();
  drawSandTexture(context, width, height);
  context.restore();

  const warmGlow = context.createRadialGradient(width * 0.5, height * 0.55, 0, width * 0.5, height * 0.55, width * 0.38);
  warmGlow.addColorStop(0, "rgba(255, 252, 233, 0.58)");
  warmGlow.addColorStop(1, "rgba(255, 252, 233, 0)");
  context.fillStyle = warmGlow;
  context.fillRect(0, 0, width, height);
}

function parseCssPercent(value, size) {
  return (parseFloat(value) / 100) * size;
}

function getCanvasPhotoWidth(widthValue, canvasWidth) {
  const numbers = widthValue.match(/[\d.]+/g)?.map(Number) || [120, 6, 150];
  const min = numbers[0];
  const preferred = (numbers[1] / 100) * canvasWidth;
  const max = numbers[2];

  return Math.max(min, Math.min(max, preferred));
}

function canvasToBlob(canvas) {
  return new Promise((resolve, reject) => {
    canvas.toBlob((blob) => {
      if (blob) {
        resolve(blob);
      } else {
        reject(new Error("No se pudo crear la imagen."));
      }
    }, "image/png");
  });
}

async function saveCanvasAsImage(canvas, filename) {
  const blob = await canvasToBlob(canvas);
  const file = new File([blob], filename, { type: "image/png" });

  if (navigator.canShare && navigator.canShare({ files: [file] }) && navigator.share) {
    try {
      await navigator.share({
        files: [file],
        title: "Carta para Pau"
      });
      return;
    } catch (error) {
      if (error.name === "AbortError") {
        return;
      }
    }
  }

  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.download = filename;
  link.href = url;
  link.rel = "noopener";
  document.body.appendChild(link);
  link.click();
  link.remove();

  window.setTimeout(() => {
    URL.revokeObjectURL(url);
  }, 60000);
}

async function downloadLetterImage() {
  const originalButtonText = downloadLetter.textContent;
  downloadLetter.textContent = "Guardando...";
  downloadLetter.disabled = true;

  const canvas = document.createElement("canvas");
  const context = canvas.getContext("2d");

  function buildWrappedLines(text, maxWidth) {
    const lines = [];

    text.split("\n").forEach((paragraph) => {
      if (!paragraph) {
        lines.push("");
        return;
      }

      let line = "";
      paragraph.split(" ").forEach((word) => {
        const testLine = line ? `${line} ${word}` : word;
        if (context.measureText(testLine).width <= maxWidth) {
          line = testLine;
        } else {
          lines.push(line);
          line = word;
        }
      });
      lines.push(line);
    });

    return lines;
  }

  function getLineUnits(lines) {
    return lines.reduce((total, line) => total + (line ? 1 : 0.68), 0);
  }

  function drawColumnText(lines, x, y, columnWidth, columnHeight, gap, lineHeight) {
    let column = 0;
    let currentY = y;

    lines.forEach((line) => {
      const step = line ? lineHeight : lineHeight * 0.68;

      if (currentY + step > y + columnHeight) {
        column += 1;
        currentY = y;
      }

      if (column > 1) {
        return;
      }

      if (line) {
        context.fillText(line, x + column * (columnWidth + gap), currentY);
      }

      currentY += step;
    });
  }

  try {
    if (letterText.textContent !== letter) {
      completeLetter();
    }

    if (!letterBeachPhotos.children.length) {
      renderLetterBeachPhotos();
    }

    const exportEntries = Array.from(letterBeachPhotos.querySelectorAll(".letter-beach-photo")).map((photo, photoIndex) => ({
      element: photo,
      src: photo.querySelector("img")?.getAttribute("src") || "",
      index: photoIndex
    }));
    const loadedImages = await Promise.all(
      exportEntries.map((entry) => loadCanvasImage(entry.src).catch(() => null))
    );
    const exportMetrics = getSceneExportMetrics(letterScene, 1920);
    const { sceneRect, width, height, scaleX, scaleY } = exportMetrics;
    const paperRect = paper.getBoundingClientRect();
    const contentX = (paperRect.left - sceneRect.left) * scaleX;
    const contentY = (paperRect.top - sceneRect.top) * scaleY;
    const contentWidth = paperRect.width * scaleX;
    const contentHeight = paperRect.height * scaleY;
    const paperPaddingX = Math.max(34, contentWidth * 0.075);
    const paperPaddingTop = Math.max(42, contentHeight * 0.075);
    const paperPaddingBottom = Math.max(36, contentHeight * 0.06);
    const columnGap = Math.max(28, contentWidth * 0.055);
    const columnWidth = (contentWidth - paperPaddingX * 2 - columnGap) / 2;
    const textColumnWidth = columnWidth - 24;
    const bodyY = contentY + paperPaddingTop + contentHeight * 0.1;
    const bodyHeight = contentHeight - paperPaddingTop - paperPaddingBottom - contentHeight * 0.08;
    const maxUnitsPerPage = 2 * bodyHeight;
    let fontSize = 26;
    let lineHeight = 36;
    let lines = [];
    const exportFont = '"Segoe Script", "Lucida Handwriting", "Brush Script MT", "Bradley Hand", Georgia, serif';

    while (fontSize >= 9) {
      context.font = `${fontSize}px ${exportFont}`;
      lineHeight = fontSize * 1.42;
      lines = buildWrappedLines(letter, textColumnWidth);

      if (getLineUnits(lines) * lineHeight <= maxUnitsPerPage) {
        break;
      }

      fontSize -= 1;
    }

    canvas.width = width;
    canvas.height = height;

    drawLetterBeachBackground(context, width, height);

    exportEntries.forEach((entry, photoIndex) => {
      const image = loadedImages[photoIndex];
      drawPhotoFromElement(context, image, entry.element, sceneRect, scaleX, scaleY, {
        index: photoIndex,
        padding: 0,
        radius: 13 * ((scaleX + scaleY) / 2),
        background: "rgba(255, 255, 255, 0.9)",
        shadowColor: "rgba(83, 58, 30, 0.18)",
        shadowBlur: 28 * ((scaleX + scaleY) / 2),
        shadowOffsetY: 14 * scaleY,
        tape: true,
        tapeOffset: -4,
        tapeColor: "rgba(232, 247, 255, 0.55)"
      });
    });

    context.save();
    context.shadowColor = "rgba(111, 82, 45, 0.24)";
    context.shadowBlur = 58 * ((scaleX + scaleY) / 2);
    context.shadowOffsetY = 24 * scaleY;
    drawPaperShape(context, contentX, contentY, contentWidth, contentHeight);
    context.fillStyle = "rgba(255, 250, 240, 0.92)";
    context.fill();
    context.shadowColor = "transparent";
    drawPaperShape(context, contentX, contentY, contentWidth, contentHeight);
    context.clip();

    const paperGlow = context.createRadialGradient(contentX + contentWidth * 0.15, contentY + contentHeight * 0.18, 0, contentX + contentWidth * 0.15, contentY + contentHeight * 0.18, contentWidth * 0.46);
    paperGlow.addColorStop(0, "rgba(255, 255, 255, 0.7)");
    paperGlow.addColorStop(1, "rgba(255, 255, 255, 0)");
    context.fillStyle = paperGlow;
    context.fillRect(contentX, contentY, contentWidth, contentHeight);

    context.fillStyle = "rgba(45, 128, 190, 0.08)";
    for (let lineX = contentX; lineX <= contentX + contentWidth; lineX += 54 * scaleX) {
      context.fillRect(lineX, contentY, Math.max(1, scaleX), contentHeight);
    }

    context.restore();

    context.fillStyle = "#173f63";
    context.textBaseline = "alphabetic";
    context.textAlign = "right";
    context.font = `${Math.max(23, Math.min(34, contentWidth * 0.04))}px ${exportFont}`;
    context.fillText("29/06", contentX + contentWidth - paperPaddingX * 0.78, contentY + paperPaddingTop * 0.85);

    context.textAlign = "left";
    context.font = `${Math.max(28, Math.min(42, contentWidth * 0.052))}px ${exportFont}`;
    context.fillText("Pau:", contentX + paperPaddingX, contentY + paperPaddingTop * 1.28);

    context.font = `${fontSize}px ${exportFont}`;
    drawColumnText(lines, contentX + paperPaddingX, bodyY, textColumnWidth, bodyHeight, columnGap, lineHeight);

    await saveCanvasAsImage(canvas, "te_amo.png");
  } finally {
    downloadLetter.textContent = originalButtonText;
    downloadLetter.disabled = false;
  }
}

function drawMemoryPlaceholder(context, x, y, width, height, indexValue) {
  const gradient = context.createLinearGradient(x, y, x + width, y + height);
  gradient.addColorStop(0, indexValue % 2 === 0 ? "#d9f5ff" : "#efe8ff");
  gradient.addColorStop(0.55, "#fff8ea");
  gradient.addColorStop(1, indexValue % 3 === 0 ? "#cdefff" : "#e7f7ff");
  context.fillStyle = gradient;
  context.fillRect(x, y, width, height);
}

async function downloadMemoryImage() {
  const originalButtonText = downloadMemory.textContent;
  downloadMemory.textContent = "...";
  downloadMemory.disabled = true;

  try {
    completeMemoryAnimation();

    const canvas = document.createElement("canvas");
    const context = canvas.getContext("2d");
    const exportMetrics = getSceneExportMetrics(memoryScene, 1920);
    const { sceneRect, width, height, scaleX, scaleY } = exportMetrics;
    const memoryPhotoElements = Array.from(memoryBoard.querySelectorAll(".memory-photo"));
    const phrase = memoryScene.querySelector(".memory-phrase");
    const [starBackground, loadedImages] = await Promise.all([
      loadCanvasImage("media/fondo-estrellas.jpeg?v=20260623-43").catch(() => null),
      Promise.all(memoryPhotoElements.map((photo) => {
        const src = photo.dataset.src || photo.querySelector("img")?.getAttribute("src");
        return src ? loadCanvasImage(src).catch(() => null) : null;
      }))
    ]);

    canvas.width = width;
    canvas.height = height;

    if (starBackground) {
      drawImageCover(context, starBackground, 0, 0, width, height);
    } else {
      context.fillStyle = "#03070e";
      context.fillRect(0, 0, width, height);
    }

    const seaGlow = context.createRadialGradient(width * 0.76, height * 0.08, 0, width * 0.76, height * 0.08, width * 0.62);
    seaGlow.addColorStop(0, "rgba(58, 138, 214, 0.34)");
    seaGlow.addColorStop(0.48, "rgba(10, 32, 64, 0.2)");
    seaGlow.addColorStop(1, "rgba(3, 7, 14, 0)");
    context.fillStyle = seaGlow;
    context.fillRect(0, 0, width, height);

    context.fillStyle = "rgba(0, 0, 0, 0.18)";
    context.fillRect(0, 0, width, height);

    memoryPhotoElements.forEach((photo, photoIndex) => {
      const image = loadedImages[photoIndex];
      drawPhotoFromElement(context, image, photo, sceneRect, scaleX, scaleY, {
        index: photoIndex,
        radius: 13 * ((scaleX + scaleY) / 2),
        background: "rgba(246, 252, 255, 0.9)",
        shadowColor: "rgba(92, 104, 96, 0.2)",
        shadowBlur: 24 * ((scaleX + scaleY) / 2),
        shadowOffsetY: 12 * scaleY,
        tape: true,
        tapeOffset: 8
      });
    });

    if (phrase) {
      const phraseRect = phrase.getBoundingClientRect();
      const phraseStyle = getComputedStyle(phrase);
      const phraseX = (phraseRect.left - sceneRect.left) * scaleX;
      const phraseY = (phraseRect.top - sceneRect.top) * scaleY;
      const phraseWidth = phraseRect.width * scaleX;
      const phraseHeight = phraseRect.height * scaleY;
      const phraseFontSize = parseFloat(phraseStyle.fontSize) * ((scaleX + scaleY) / 2);
      const phraseFont = '"Segoe Script", "Lucida Handwriting", "Brush Script MT", "Bradley Hand", cursive';

      context.save();
      context.shadowColor = "rgba(0, 10, 24, 0.18)";
      context.shadowBlur = 34 * ((scaleX + scaleY) / 2);
      context.shadowOffsetY = 14 * scaleY;
      drawRoundedRect(context, phraseX, phraseY, phraseWidth, phraseHeight, phraseHeight / 2);
      context.fillStyle = "rgba(10, 35, 62, 0.22)";
      context.fill();
      context.shadowColor = "transparent";
      context.strokeStyle = "rgba(255, 255, 255, 0.22)";
      context.lineWidth = Math.max(1, scaleX);
      context.stroke();
      context.fillStyle = "rgba(232, 248, 255, 0.96)";
      context.textAlign = "center";
      context.textBaseline = "middle";
      context.font = `600 ${phraseFontSize}px ${phraseFont}`;
      context.shadowColor = "rgba(0, 13, 30, 0.62)";
      context.shadowBlur = 12 * ((scaleX + scaleY) / 2);
      context.fillText("Gracias por los mejores días de mi vida.", phraseX + phraseWidth / 2, phraseY + phraseHeight / 2);
      context.restore();
    }

    await saveCanvasAsImage(canvas, "las_mejores_vacaciones.png");
  } finally {
    downloadMemory.textContent = originalButtonText;
    downloadMemory.disabled = false;
  }
}

function openLetterFromMemories(event) {
  if (event) {
    event.preventDefault();
    event.stopPropagation();
  }
  startTravelTransition();
}

function toggleQrPanel() {
  const isVisible = qrPanel.classList.toggle("is-visible");
  menuQr.setAttribute("aria-expanded", String(isVisible));
  closeGlobalMenu();
}

function toggleMusicFromMenu() {
  if (isMusicOn) {
    stopMusic();
  } else {
    musicWasManuallyStopped = false;
    startMusic();
  }
}

function setMusicVolume(value) {
  musicVolume = Math.max(0, Math.min(1, Number(value) / 100));
  song.volume = musicVolume;
}

function navigateFromMenu(showScene) {
  if (!letterHasFinished || isSceneTransitioning || isTravelTransitioning) {
    return;
  }

  closeGlobalMenu();
  runSceneTransition(showScene);
}

openLetter.addEventListener("click", () => runSceneTransition(() => showMemoryScene()));
openFinalLetter.addEventListener("click", (event) => {
  event.preventDefault();
  event.stopPropagation();
  openLetterFromMemories();
});
function handleMemorySceneAdvance(event) {
  if (event.target.closest("#downloadMemory")) {
    return;
  }

  if (event.target.closest("#openFinalLetter")) {
    event.preventDefault();
    event.stopPropagation();
    openLetterFromMemories();
    return;
  }

  const memoryPhoto = findMemoryPhotoAtPoint(event.clientX, event.clientY) || event.target.closest(".memory-photo");
  if (memoryPhoto) {
    event.preventDefault();
    event.stopPropagation();
    openPhotoViewer(memoryPhoto.dataset.src);
    return;
  }
}
memoryScene.addEventListener("click", handleMemorySceneAdvance);
skipTyping.addEventListener("click", completeLetter);
rereadLetter.addEventListener("click", rereadCurrentLetter);
downloadLetter.addEventListener("click", downloadLetterImage);
downloadMemory.addEventListener("click", downloadMemoryImage);
menuToggle.addEventListener("click", (event) => {
  event.stopPropagation();
  toggleGlobalMenu();
});
menuPanel.addEventListener("click", (event) => {
  event.stopPropagation();
});
menuQr.addEventListener("click", toggleQrPanel);
menuMusic.addEventListener("click", toggleMusicFromMenu);
volumeControl.addEventListener("input", (event) => {
  setMusicVolume(event.target.value);
});
menuHeart.addEventListener("click", () => navigateFromMenu(showHeartScene));
menuMemories.addEventListener("click", () => navigateFromMenu(() => showMemoryScene({ completed: true })));
menuLetter.addEventListener("click", () => navigateFromMenu(() => showLetterScene({ completed: true })));
document.addEventListener("click", (event) => {
  if (!floatingMenu.contains(event.target)) {
    closeGlobalMenu();
  }
});
paper.addEventListener("wheel", disableTypingAutoScrollFromUser, { passive: true });
paper.addEventListener("touchstart", disableTypingAutoScrollFromUser, { passive: true });
paper.addEventListener("touchmove", disableTypingAutoScrollFromUser, { passive: true });
paper.addEventListener("pointerdown", disableTypingAutoScrollFromUser, { passive: true });
paper.addEventListener("scroll", () => {
  if (!isProgrammaticScroll) {
    disableTypingAutoScrollFromUser();
  }
}, { passive: true });
memoryBoard.addEventListener("pointermove", updateMemoryHover);
memoryBoard.addEventListener("pointerleave", () => setHoveredMemoryPhoto(null));
memoryBoard.addEventListener("click", (event) => {
  const memoryPhoto = findMemoryPhotoAtPoint(event.clientX, event.clientY) || event.target.closest(".memory-photo");
  if (!memoryPhoto) {
    return;
  }

  event.preventDefault();
  event.stopPropagation();
  openPhotoViewer(memoryPhoto.dataset.src);
});
photoViewerClose.addEventListener("click", closePhotoViewer);
photoViewer.addEventListener("click", (event) => {
  if (event.target === photoViewer) {
    closePhotoViewer();
  }
});
window.addEventListener("resize", () => {
  normalizeMobileViewport();
});

window.addEventListener("orientationchange", normalizeMobileViewport);

if (window.visualViewport) {
  window.visualViewport.addEventListener("resize", normalizeMobileViewport);
  window.visualViewport.addEventListener("scroll", normalizeMobileViewport);
}

window.addEventListener("keydown", (event) => {
  if (event.key === "Escape" && floatingMenu.classList.contains("is-open")) {
    closeGlobalMenu();
    return;
  }

  if (event.key === "Escape" && photoViewer.classList.contains("is-visible")) {
    closePhotoViewer();
    return;
  }

  if (event.key === "Enter" && heartScene.classList.contains("is-active")) {
    runSceneTransition(() => showMemoryScene());
  }

  if (event.key === "Enter" && memoryScene.classList.contains("is-active") && memoriesCompleted) {
    startTravelTransition();
  }

  if (event.key === "Escape" && letterHasFinished && memoryScene.classList.contains("is-active")) {
    runSceneTransition(showHeartScene);
  }

  if (event.key === "Escape" && letterHasFinished && letterScene.classList.contains("is-active")) {
    runSceneTransition(showHeartScene);
  }
});

window.addEventListener("load", () => {
  normalizeMobileViewport();
  setMusicVolume(volumeControl.value);
  updateGlobalMenu();
  startMusic({ automatic: true });
  window.setTimeout(() => {
    loader.classList.add("is-hidden");
  }, 450);
});

normalizeMobileViewport();
armMusicAutoplayFallback();
startDotAnimation();
