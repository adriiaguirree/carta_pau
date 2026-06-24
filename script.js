const letter = `enamorarme de ti es lo más fácil que he hecho en mi vida. nada me importa en esta vida más que tú, y cada día que pasa soy más consciente de eso. te amé el día que te conocí, te amo ahora mismo y te amaré el resto de mi vida.

eres mi lugar seguro, mi pensamiento bonito en los días difíciles y la razón por la que todo se siente más ligero. no sé cómo explicarlo sin quedarme corto, pero estar contigo me hace sentir que encontré algo que no quiero perder nunca. gracias por existir, por quedarte, por hacerme tan feliz sin siquiera intentarlo. te elegiría una y mil veces, en esta vida y en cualquiera donde vuelva a encontrarte.

la etapa de tener una novia de la paz y pasar las mejores vacaciones de su vida recomiendo no saltársela. esto empezó como un pensamiento en la playa, como un tweet cualquiera, pero terminó abriéndome las puertas para seguir esta carta que ya tenía para ti. gracias por todo lo que me hiciste vivir, por cada momento, por cada risa y por hacer de esta experiencia algo que voy a guardar para siempre en mi memoria.

creía que no podía pasármela mejor en mi vida, pero estar contigo me demostró que cada vez que compartimos más tiempo juntos, superas mis expectativas de una forma que ni yo sabía que era posible. no importa qué pase, esta experiencia será inolvidable para mí, porque la viví contigo.

hoy, en tu cumpleaños, no puedo evitar sentirme demasiado afortunado de poder celebrar tu vida. porque un día como hoy nació la persona que se volvió mi todo, la niña que me cambió los días, la forma de ver el amor y hasta la manera en la que entiendo la felicidad. feliz cumpleaños, paulina, mi amor. ojalá pudiera darte en palabras todo lo que significas para mí, pero aun así voy a pasar mi vida intentando demostrártelo.

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
const viewMemories = document.querySelector("#viewMemories");
const restart = document.querySelector("#restart");
const cursor = document.querySelector("#cursor");
const dotCanvas = document.querySelector("#dotCanvas");
const paper = document.querySelector(".paper");
const envelope = document.querySelector("#envelope");
const audioToggle = document.querySelector("#audioToggle");
const song = document.querySelector("#song");
const finalBloom = document.querySelector("#finalBloom");
const finalCard = document.querySelector("#finalCard");
const qrToggle = document.querySelector("#qrToggle");
const qrPanel = document.querySelector("#qrPanel");
const memoryBoard = document.querySelector("#memoryBoard");
const viewportMeta = document.querySelector('meta[name="viewport"]');
const ctx = dotCanvas.getContext("2d");

let index = 0;
let typingFrame = null;
let typingStartedAt = 0;
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
let finalBloomShown = false;
let memoriesCompleted = false;

function seededRandom(seed) {
  let value = seed;
  return () => {
    value = (value * 1664525 + 1013904223) % 4294967296;
    return value / 4294967296;
  };
}

const random = seededRandom(1402);

function getMemoryPhotoBackground(src, indexValue) {
  if (src) {
    return `url("${src}")`;
  }

  const hue = 198 + (indexValue % 5) * 8;
  return `linear-gradient(135deg, hsl(${hue} 80% 88%), #fff8ea 54%, hsl(${hue + 24} 78% 92%))`;
}

function renderMemoryPhotos() {
  memoryBoard.textContent = "";

  memoryPhotoLayout.forEach((photo, photoIndex) => {
    const card = document.createElement("div");
    card.className = "memory-photo";
    card.style.setProperty("--left", photo.left);
    card.style.setProperty("--top", photo.top);
    card.style.setProperty("--rotation", photo.rotation);
    card.style.setProperty("--ratio", photo.ratio);
    card.style.setProperty("--layer", photo.layer);
    card.style.setProperty("--delay", `${0.55 + photoIndex * memoryPhotoDelayStep}s`);
    card.style.setProperty("--photo", getMemoryPhotoBackground(memoryPhotoSources[photoIndex], photoIndex));
    memoryBoard.appendChild(card);
  });
}

function resetMemoryAnimation() {
  window.clearTimeout(memoryTimer);
  memoriesCompleted = false;
  memoryScene.classList.remove("is-memory-complete");
  renderMemoryPhotos();
  memoryTimer = window.setTimeout(() => {
    memoriesCompleted = true;
    memoryScene.classList.add("is-memory-complete");
  }, memoryAnimationDuration);
}

function completeMemoryAnimation() {
  window.clearTimeout(memoryTimer);
  if (!memoryBoard.children.length) {
    renderMemoryPhotos();
  }
  memoriesCompleted = true;
  memoryScene.classList.add("is-memory-complete");
}

function startMusic() {
  if (isMusicOn) {
    return;
  }

  song.volume = 0.72;
  const playPromise = song.play();

  if (playPromise) {
    playPromise
      .then(() => {
        isMusicOn = true;
        audioToggle.setAttribute("aria-pressed", "true");
        audioToggle.textContent = "Música ON";
      })
      .catch(() => {
        isMusicOn = false;
        audioToggle.setAttribute("aria-pressed", "false");
        audioToggle.textContent = "Música";
      });
  }
}

function setAppViewportSize() {
  const viewportWidth = window.visualViewport ? window.visualViewport.width : window.innerWidth;
  const viewportHeight = window.visualViewport ? window.visualViewport.height : window.innerHeight;
  document.documentElement.style.setProperty("--app-width", `${Math.round(viewportWidth)}px`);
  document.documentElement.style.setProperty("--app-height", `${Math.round(viewportHeight)}px`);
}

function normalizeMobileViewport() {
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
    window.scrollTo(0, 0);
    document.body.classList.remove("is-orientation-settling");
  }, 520);
}

function stopMusic() {
  isMusicOn = false;
  audioToggle.setAttribute("aria-pressed", "false");
  audioToggle.textContent = "Música";
  song.pause();
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

function showLetterScene() {
  if (letterScene.classList.contains("is-active") && !memoryScene.classList.contains("is-active")) {
    return;
  }

  startMusic();
  window.cancelAnimationFrame(animationFrame);
  window.clearTimeout(envelopeTimer);
  window.clearTimeout(typingStartTimer);
  window.clearTimeout(memoryTimer);
  completeMemoryAnimation();
  heartScene.classList.remove("is-active");
  memoryScene.classList.remove("is-active");
  letterScene.classList.add("is-active");
  letterScene.classList.remove("is-open");
  letterScene.removeAttribute("aria-hidden");
  heartScene.setAttribute("aria-hidden", "true");
  memoryScene.setAttribute("aria-hidden", "true");
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
  index = 0;
  letterText.textContent = "";
  cursor.hidden = false;
  paper.scrollTop = 0;
  finalBloomShown = false;
  finalBloom.classList.remove("is-visible");
  finalBloom.textContent = "";
  finalCard.classList.remove("is-visible");
  letterScene.classList.remove("is-open");
  letterScene.classList.remove("is-active");
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
  index = 0;
  letterText.textContent = "";
  cursor.hidden = false;
  paper.scrollTop = 0;
  finalBloomShown = false;
  finalBloom.classList.remove("is-visible");
  finalBloom.textContent = "";
  finalCard.classList.remove("is-visible");
  memoryScene.classList.remove("is-active");
  memoryScene.classList.remove("is-memory-complete");
  letterScene.classList.remove("is-open");
  letterScene.classList.remove("is-active");
  heartScene.classList.add("is-active");
  heartScene.removeAttribute("aria-hidden");
  memoryScene.setAttribute("aria-hidden", "true");
  letterScene.setAttribute("aria-hidden", "true");
  startDotAnimation();
}

function startTyping() {
  stopTyping();
  index = 0;
  letterText.textContent = "";
  cursor.hidden = false;
  finalBloomShown = false;
  finalBloom.classList.remove("is-visible");
  finalBloom.textContent = "";
  finalCard.classList.remove("is-visible");
  paper.scrollTop = 0;
  typingStartedAt = performance.now();
  typingFrame = window.requestAnimationFrame(typeNextCharacter);
}

function stopTyping() {
  if (typingFrame) {
    window.cancelAnimationFrame(typingFrame);
    typingFrame = null;
  }
}

function typeNextCharacter(now) {
  const elapsedSeconds = (now - typingStartedAt) / 1000;
  const nextIndex = Math.min(letter.length, Math.floor(elapsedSeconds * typingCharactersPerSecond));

  if (nextIndex !== index) {
    index = nextIndex;
    letterText.textContent = letter.slice(0, index);
  }

  if (index >= letter.length) {
    stopTyping();
    cursor.hidden = true;
    showFinalBloom();
    return;
  }

  typingFrame = window.requestAnimationFrame(typeNextCharacter);
}

function completeLetter() {
  stopTyping();
  index = letter.length;
  renderFullLetter();
  cursor.hidden = true;
  paper.scrollTop = 0;
  showFinalBloom();
}

function rereadCurrentLetter() {
  window.clearTimeout(typingStartTimer);
  stopTyping();
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

function wrapCanvasText(context, text, x, y, maxWidth, lineHeight) {
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

  lines.forEach((line) => {
    context.fillText(line, x, y);
    y += lineHeight;
  });

  return y;
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

      if (currentY + step > y + columnHeight && column === 0) {
        column = 1;
        currentY = y;
      }

      if (line) {
        context.fillText(line, x + column * (columnWidth + gap), currentY);
      }

      currentY += step;
    });
  }

  try {
    const collage = await loadCanvasImage("media/fondo-carta.jpg?v=20260623-10");
    const width = collage.width;
    const height = collage.height;
    const contentX = width * 0.297;
    const contentY = height * 0.105;
    const contentWidth = width * 0.424;
    const contentHeight = height * 0.795;
    const columnGap = width * 0.023;
    const columnWidth = (contentWidth - columnGap) / 2;
    const textColumnWidth = columnWidth - 18;
    const bodyY = contentY + height * 0.155;
    const bodyHeight = contentHeight - height * 0.235;
    const maxUnitsPerPage = 2 * bodyHeight;
    let fontSize = 26;
    let lineHeight = 36;
    let lines = [];

    while (fontSize >= 16) {
      context.font = `${fontSize}px Georgia, serif`;
      lineHeight = fontSize * 1.43;
      lines = buildWrappedLines(letter, textColumnWidth);

      if (getLineUnits(lines) * lineHeight <= maxUnitsPerPage) {
        break;
      }

      fontSize -= 1;
    }

    canvas.width = width;
    canvas.height = height;

    context.drawImage(collage, 0, 0, width, height);

    drawRoundedRect(context, contentX - 16, contentY - 12, contentWidth + 32, contentHeight + 24, 24);
    context.fillStyle = "rgba(255, 255, 255, 0.62)";
    context.fill();

    context.fillStyle = "#173f63";
    context.textBaseline = "alphabetic";
    context.textAlign = "right";
    context.font = "28px Georgia, serif";
    context.fillText("29/06", contentX + contentWidth - 30, contentY + 58);

    context.textAlign = "left";
    context.font = "34px Georgia, serif";
    context.fillText("Pau:", contentX + 28, contentY + 92);

    context.font = `${fontSize}px Georgia, serif`;
    drawColumnText(lines, contentX + 28, bodyY, textColumnWidth, bodyHeight, columnGap, lineHeight);

    context.textAlign = "center";
    context.font = "28px Georgia, serif";
    context.fillText("Feliz cumpleaños, Pau.", width / 2, contentY + contentHeight - 34);

    await saveCanvasAsImage(canvas, "carta-para-pau.png");
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

function drawMemoryFlower(context, x, y, size, color) {
  context.save();
  context.fillStyle = color;
  for (let i = 0; i < 6; i += 1) {
    const angle = (i / 6) * Math.PI * 2;
    context.beginPath();
    context.arc(x + Math.cos(angle) * size * 0.6, y + Math.sin(angle) * size * 0.6, size * 0.34, 0, Math.PI * 2);
    context.fill();
  }
  context.fillStyle = "rgba(255, 255, 255, 0.92)";
  context.beginPath();
  context.arc(x, y, size * 0.24, 0, Math.PI * 2);
  context.fill();
  context.restore();
}

async function downloadMemoryImage() {
  const originalButtonText = downloadMemory.textContent;
  downloadMemory.textContent = "...";
  downloadMemory.disabled = true;

  try {
    const canvas = document.createElement("canvas");
    const context = canvas.getContext("2d");
    const width = 1600;
    const height = 900;
    const loadedImages = await Promise.all(memoryPhotoSources.map((src) => (src ? loadCanvasImage(src).catch(() => null) : null)));

    canvas.width = width;
    canvas.height = height;

    const background = context.createLinearGradient(0, 0, width, height);
    background.addColorStop(0, "#f4ead7");
    background.addColorStop(0.52, "#fbf6eb");
    background.addColorStop(1, "#eaf7ff");
    context.fillStyle = background;
    context.fillRect(0, 0, width, height);

    context.strokeStyle = "rgba(70, 143, 190, 0.2)";
    context.lineWidth = 2;
    drawRoundedRect(context, 36, 36, width - 72, height - 72, 34);
    context.stroke();

    for (let i = 0; i < 44; i += 1) {
      const edge = i % 4;
      const x = edge === 0 ? 54 + (i * 53) % (width - 108) : edge === 1 ? width - 52 : edge === 2 ? 54 + (i * 47) % (width - 108) : 52;
      const y = edge === 0 ? 54 : edge === 1 ? 54 + (i * 37) % (height - 108) : edge === 2 ? height - 54 : 54 + (i * 41) % (height - 108);
      drawMemoryFlower(context, x, y, 11 + (i % 4) * 2, ["#8fd6ff", "#b7a8ff", "#d8f2ff", "#f7fbff"][i % 4]);
    }

    memoryPhotoLayout.forEach((photo, photoIndex) => {
      const x = (parseFloat(photo.left) / 100) * width;
      const y = (parseFloat(photo.top) / 100) * height;
      const cardWidth = Math.min(200, Math.max(128, width / (memoryPhotoColumns + 1.15)));
      const cardHeight = cardWidth / parseFloat(photo.ratio);
      const rotation = (parseFloat(photo.rotation) * Math.PI) / 180;
      const image = loadedImages[photoIndex];

      context.save();
      context.translate(x, y);
      context.rotate(rotation);
      context.shadowColor = "rgba(92, 104, 96, 0.24)";
      context.shadowBlur = 24;
      context.shadowOffsetY = 12;
      drawRoundedRect(context, -cardWidth / 2, -cardHeight / 2, cardWidth, cardHeight, 14);
      context.clip();
      context.shadowColor = "transparent";

      if (image) {
        drawImageCover(context, image, -cardWidth / 2, -cardHeight / 2, cardWidth, cardHeight);
      } else {
        drawMemoryPlaceholder(context, -cardWidth / 2, -cardHeight / 2, cardWidth, cardHeight, photoIndex);
      }
      context.restore();
    });

    await saveCanvasAsImage(canvas, "recuerdos-vacaciones-pau.png");
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
  completeMemoryAnimation();
  showLetterScene();
}

openLetter.addEventListener("click", () => showMemoryScene());
openFinalLetter.addEventListener("click", openLetterFromMemories);
openFinalLetter.addEventListener("pointerup", openLetterFromMemories);
openFinalLetter.addEventListener("touchend", openLetterFromMemories, { passive: false });
function handleMemorySceneAdvance(event) {
  if (event.target.closest("#downloadMemory")) {
    return;
  }

  if (event.target.closest("#openFinalLetter") || memoriesCompleted) {
    openLetterFromMemories(event);
  }
}
memoryScene.addEventListener("click", handleMemorySceneAdvance);
memoryScene.addEventListener("pointerup", handleMemorySceneAdvance);
memoryScene.addEventListener("touchend", handleMemorySceneAdvance, { passive: false });
skipTyping.addEventListener("click", completeLetter);
rereadLetter.addEventListener("click", rereadCurrentLetter);
downloadLetter.addEventListener("click", downloadLetterImage);
downloadMemory.addEventListener("click", downloadMemoryImage);
viewMemories.addEventListener("click", () => showMemoryScene({ completed: true }));
restart.addEventListener("click", showHeartScene);
audioToggle.addEventListener("click", () => {
  if (isMusicOn) {
    stopMusic();
  } else {
    startMusic();
  }
});
qrToggle.addEventListener("click", () => {
  const isVisible = qrPanel.classList.toggle("is-visible");
  qrToggle.setAttribute("aria-expanded", String(isVisible));
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
  if (event.key === "Enter" && heartScene.classList.contains("is-active")) {
    showMemoryScene();
  }

  if (event.key === "Enter" && memoryScene.classList.contains("is-active") && memoriesCompleted) {
    showLetterScene();
  }

  if (event.key === "Escape" && memoryScene.classList.contains("is-active")) {
    showHeartScene();
  }

  if (event.key === "Escape" && letterScene.classList.contains("is-active")) {
    showHeartScene();
  }
});

window.addEventListener("load", () => {
  normalizeMobileViewport();
  window.setTimeout(() => {
    loader.classList.add("is-hidden");
  }, 450);
});

normalizeMobileViewport();
startDotAnimation();
