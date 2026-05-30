const letter = `enamorarme de ti es lo más fácil que he hecho en mi vida, nada me importa en esta vida más que tú y cada día que pasa soy consciente de esto. te amé el día que te conocí, te amo ahora mismo, y te amaré el resto de mi vida.

eres mi lugar seguro, mi pensamiento bonito en los días difíciles y la razón por la que todo se siente más ligero. no sé cómo explicarlo sin quedarme corto, pero estar contigo me hace sentir que encontré algo que no quiero perder nunca. gracias por existir, por quedarte, por hacerme tan feliz sin siquiera intentarlo. te elegiría una y mil veces, en esta vida y en cualquiera donde vuelva a encontrarte.

y hoy, en tu cumpleaños, no puedo evitar sentirme demasiado afortunado de poder celebrar tu vida. porque un día como hoy nació la persona que se volvió mi todo, la niña que me cambió los días, la forma de ver el amor y hasta la manera en la que entiendo la felicidad. feliz cumpleaños, paulina, mi amor. ojalá pudiera darte en palabras todo lo que significas para mí, pero aun así voy a pasar mi vida intentando demostrártelo.

deseo que este nuevo año de tu vida esté lleno de momentos bonitos, de sueños cumplidos, de risas que te salgan del alma y de todo el amor que mereces. yo quiero estar ahí para verte crecer, abrazarte en tus días buenos y también en los difíciles, recordarte lo increíble que eres cuando se te olvide y hacerte sentir amada todos los días, no solo hoy.

gracias por ser tú, por tu forma de querer, por tu sonrisa, por tu corazón tan bonito y por hacer de mi vida un lugar mucho más feliz. hoy celebro tu cumpleaños, pero también celebro la suerte inmensa que tengo de coincidir contigo. te amo, paulina, más de lo que puedo escribir y más de lo que alguna vez pensé amar a alguien.

me siento profundamente orgulloso de ti, paulina, de la persona que eres, de todo lo que has logrado y de la forma tan bonita en la que iluminas la vida de quienes tienen la suerte de conocerte. gracias por dejarme acompañarte, por permitirme amarte y por hacerme sentir que el amor puede ser tan real, tan tranquilo y tan inmenso. hoy y siempre voy a estar agradecido contigo, con la vida y con todo lo que nos puso en el mismo camino. feliz cumpleaños, mi amor, te amo con todo mi corazón.

Con amor,
Adrián`;

const heartScene = document.querySelector("#heartScene");
const letterScene = document.querySelector("#letterScene");
const openLetter = document.querySelector("#openLetter");
const letterText = document.querySelector("#letterText");
const skipTyping = document.querySelector("#skipTyping");
const rereadLetter = document.querySelector("#rereadLetter");
const downloadLetter = document.querySelector("#downloadLetter");
const restart = document.querySelector("#restart");
const cursor = document.querySelector("#cursor");
const dotCanvas = document.querySelector("#dotCanvas");
const paper = document.querySelector(".paper");
const envelope = document.querySelector("#envelope");
const audioToggle = document.querySelector("#audioToggle");
const finalBloom = document.querySelector("#finalBloom");
const ctx = dotCanvas.getContext("2d");

let index = 0;
let typingTimer = null;
let envelopeTimer = null;
let typingStartTimer = null;
const typingSpeed = 31;
const introDuration = 60000;
const bluePalette = ["#eefbff", "#d3f4ff", "#aee8ff", "#7bd3ff", "#4fbfff", "#2fa4ea", "#6ba8ff"];
const hydrangeaPalette = ["#d9f5ff", "#aee8ff", "#76cfff", "#8fb7ff", "#b7a8ff", "#d7c4ff", "#f2d8ff"];

let animationStart = performance.now();
let outlineDots = [];
let fillDots = [];
let flowerDots = [];
let heartPolygon = [];
let animationFrame = null;
let introIsReady = false;
let audioContext = null;
let musicGain = null;
let musicTimer = null;
let isMusicOn = false;
let finalBloomShown = false;

function seededRandom(seed) {
  let value = seed;
  return () => {
    value = (value * 1664525 + 1013904223) % 4294967296;
    return value / 4294967296;
  };
}

const random = seededRandom(1402);

function ensureAudioContext() {
  if (!audioContext) {
    audioContext = new (window.AudioContext || window.webkitAudioContext)();
    musicGain = audioContext.createGain();
    musicGain.gain.value = 0.035;
    musicGain.connect(audioContext.destination);
  }

  if (audioContext.state === "suspended") {
    audioContext.resume();
  }
}

function playSoftNote(frequency, startTime, duration) {
  if (!audioContext || !musicGain) {
    return;
  }

  const oscillator = audioContext.createOscillator();
  const gain = audioContext.createGain();

  oscillator.type = "sine";
  oscillator.frequency.setValueAtTime(frequency, startTime);
  oscillator.connect(gain);
  gain.connect(musicGain);
  gain.gain.setValueAtTime(0, startTime);
  gain.gain.linearRampToValueAtTime(0.42, startTime + 0.08);
  gain.gain.exponentialRampToValueAtTime(0.001, startTime + duration);
  oscillator.start(startTime);
  oscillator.stop(startTime + duration + 0.05);
}

function startMusic() {
  ensureAudioContext();

  if (isMusicOn) {
    return;
  }

  isMusicOn = true;
  audioToggle.setAttribute("aria-pressed", "true");
  audioToggle.textContent = "Música ON";

  const notes = [392, 493.88, 587.33, 739.99, 659.25, 587.33, 493.88, 440];
  let step = 0;
  playSoftNote(notes[0], audioContext.currentTime, 1.8);
  playSoftNote(notes[2] / 2, audioContext.currentTime + 0.04, 2.2);

  musicTimer = window.setInterval(() => {
    const now = audioContext.currentTime;
    playSoftNote(notes[step % notes.length], now, 1.8);
    playSoftNote(notes[(step + 2) % notes.length] / 2, now + 0.04, 2.2);
    step += 1;
  }, 1250);
}

function stopMusic() {
  isMusicOn = false;
  audioToggle.setAttribute("aria-pressed", "false");
  audioToggle.textContent = "Música";
  window.clearInterval(musicTimer);
  musicTimer = null;
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
  startMusic();
  window.cancelAnimationFrame(animationFrame);
  window.clearTimeout(envelopeTimer);
  window.clearTimeout(typingStartTimer);
  heartScene.classList.remove("is-active");
  letterScene.classList.add("is-active");
  letterScene.classList.remove("is-open");
  letterScene.removeAttribute("aria-hidden");
  heartScene.setAttribute("aria-hidden", "true");
  envelopeTimer = window.setTimeout(() => {
    letterScene.classList.add("is-open");
    typingStartTimer = window.setTimeout(startTyping, 850);
  }, 2200);
}

function showHeartScene() {
  window.clearTimeout(envelopeTimer);
  window.clearTimeout(typingStartTimer);
  stopTyping();
  index = 0;
  letterText.textContent = "";
  cursor.hidden = false;
  paper.scrollTop = 0;
  finalBloomShown = false;
  finalBloom.classList.remove("is-visible");
  finalBloom.textContent = "";
  letterScene.classList.remove("is-open");
  letterScene.classList.remove("is-active");
  heartScene.classList.add("is-active");
  heartScene.removeAttribute("aria-hidden");
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
  paper.scrollTop = 0;
  typingTimer = window.setInterval(typeNextCharacter, typingSpeed);
}

function stopTyping() {
  if (typingTimer) {
    window.clearInterval(typingTimer);
    typingTimer = null;
  }
}

function typeNextCharacter() {
  if (index >= letter.length) {
    stopTyping();
    cursor.hidden = true;
    showFinalBloom();
    return;
  }

  const span = document.createElement("span");
  span.className = "ink-char";
  span.textContent = letter[index];
  letterText.appendChild(span);
  index += 1;
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
  letterText.textContent = "";
  const fragment = document.createDocumentFragment();

  for (const character of letter) {
    const span = document.createElement("span");
    span.className = "ink-char";
    span.style.animationDelay = "0ms";
    span.textContent = character;
    fragment.appendChild(span);
  }

  letterText.appendChild(fragment);
}

function showFinalBloom() {
  if (finalBloomShown) {
    return;
  }

  finalBloomShown = true;
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

function downloadLetterImage() {
  const canvas = document.createElement("canvas");
  const scale = 2;
  const width = 920;
  const margin = 86;
  const context = canvas.getContext("2d");

  context.font = "30px Georgia, serif";
  const lineHeight = 46;
  const tempLines = [];
  const maxWidth = width - margin * 2;

  letter.split("\n").forEach((paragraph) => {
    if (!paragraph) {
      tempLines.push("");
      return;
    }

    let line = "";
    paragraph.split(" ").forEach((word) => {
      const testLine = line ? `${line} ${word}` : word;
      if (context.measureText(testLine).width <= maxWidth) {
        line = testLine;
      } else {
        tempLines.push(line);
        line = word;
      }
    });
    tempLines.push(line);
  });

  const height = Math.max(1180, 250 + tempLines.length * lineHeight);
  canvas.width = width * scale;
  canvas.height = height * scale;
  context.scale(scale, scale);

  context.fillStyle = "#eaf7ff";
  context.fillRect(0, 0, width, height);

  const points = [
    [48, 62], [118, 44], [210, 60], [330, 48], [468, 62], [610, 46], [746, 60], [872, 50],
    [858, height * 0.2], [874, height * 0.38], [858, height * 0.58], [872, height * 0.76],
    [850, height - 52], [722, height - 40], [604, height - 56], [456, height - 42],
    [306, height - 58], [176, height - 42], [48, height - 58], [62, height * 0.78],
    [48, height * 0.6], [64, height * 0.42], [48, height * 0.24]
  ];

  context.save();
  context.beginPath();
  points.forEach(([x, y], index) => {
    if (index === 0) {
      context.moveTo(x, y);
    } else {
      context.lineTo(x, y);
    }
  });
  context.closePath();
  context.clip();

  const gradient = context.createLinearGradient(0, 40, 0, height - 40);
  gradient.addColorStop(0, "#fbfdff");
  gradient.addColorStop(0.52, "#eaf7ff");
  gradient.addColorStop(1, "#f8fcff");
  context.fillStyle = gradient;
  context.fillRect(36, 36, width - 72, height - 72);

  context.fillStyle = "rgba(45, 128, 190, 0.08)";
  for (let x = 88; x < width - 70; x += 54) {
    context.fillRect(x, 58, 1, height - 116);
  }
  context.restore();

  context.beginPath();
  points.forEach(([x, y], index) => {
    if (index === 0) {
      context.moveTo(x, y);
    } else {
      context.lineTo(x, y);
    }
  });
  context.closePath();
  context.strokeStyle = "rgba(72, 151, 209, 0.52)";
  context.lineWidth = 3;
  context.stroke();

  context.fillStyle = "#173f63";
  context.textAlign = "right";
  context.font = "30px Georgia, serif";
  context.fillText("29/06", width - margin, 104);
  context.textAlign = "left";
  context.font = "38px Georgia, serif";
  context.fillText("Pau:", margin, 158);
  context.font = "30px Georgia, serif";
  wrapCanvasText(context, letter, margin, 222, maxWidth, lineHeight);

  const link = document.createElement("a");
  link.download = "carta-para-pau.png";
  link.href = canvas.toDataURL("image/png");
  link.click();
}

openLetter.addEventListener("click", showLetterScene);
skipTyping.addEventListener("click", completeLetter);
rereadLetter.addEventListener("click", rereadCurrentLetter);
downloadLetter.addEventListener("click", downloadLetterImage);
restart.addEventListener("click", showHeartScene);
audioToggle.addEventListener("click", () => {
  if (isMusicOn) {
    stopMusic();
  } else {
    startMusic();
  }
});
window.addEventListener("resize", () => {
  resizeCanvas();
  createDots();
});

window.addEventListener("keydown", (event) => {
  if (event.key === "Enter" && heartScene.classList.contains("is-active")) {
    showLetterScene();
  }

  if (event.key === "Escape" && letterScene.classList.contains("is-active")) {
    showHeartScene();
  }
});

startDotAnimation();
