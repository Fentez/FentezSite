(() => {
  const root = document.documentElement;
  const btn = document.getElementById("theme-toggle");
  const reduce = matchMedia("(prefers-reduced-motion: reduce)").matches;

  const spin = ["-", "\\", "|", "/"];
  let si = 0;
  setInterval(() => {
    document.title = "FENTEZ | " + spin[si++ % 4];
  }, 200);

  let stored = null;
  try {
    stored = localStorage.getItem("theme");
  } catch (e) {}
  const apply = (t, save) => {
    root.dataset.theme = t;
    btn.innerHTML =
      '<i class="fas fa-' + (t === "dark" ? "moon" : "sun") + '"></i>';
    btn.setAttribute(
      "aria-label",
      t === "dark" ? "Switch to light theme" : "Switch to dark theme",
    );
    if (save) {
      try {
        localStorage.setItem("theme", t);
      } catch (e) {}
    }
  };
  apply(
    stored ||
      (matchMedia("(prefers-color-scheme: light)").matches ? "light" : "dark"),
  );
  btn.addEventListener("click", () =>
    apply(root.dataset.theme === "dark" ? "light" : "dark", true),
  );

  const P = {
    dark: { star: [190, 205, 215], glow: [0, 255, 245], halo: [0, 173, 181] },
    light: { star: [57, 62, 70], glow: [0, 173, 181], halo: [0, 173, 181] },
  };
  const cv = document.getElementById("sky");
  const c = cv.getContext("2d");
  const wm = document.querySelector(".wordmark");
  const R = 240;
  const rp = [];
  let droneF = null;
  const L = { x: 0, y: 0, tx: 0, ty: 0 };
  let W,
    H,
    stars = [],
    last = -9999;

  function size() {
    const d = Math.min(devicePixelRatio || 1, 2);
    W = innerWidth;
    H = innerHeight;
    cv.width = W * d;
    cv.height = H * d;
    c.setTransform(d, 0, 0, d, 0, 0);
    const n = Math.min(200, Math.round((W * H) / 8500));
    stars = Array.from({ length: n }, () => ({
      x: Math.random() * W,
      y: Math.random() * H,
      r: 0.5 + Math.random() * 1.3,
      p: Math.random() * 6.3,
      s: 0.4 + Math.random(),
    }));
  }
  const home = () => {
    const r = wm.getBoundingClientRect();
    return [r.left + r.width / 2, r.top + r.height / 2];
  };

  size();
  addEventListener("resize", size);
  [L.x, L.y] = home();
  L.tx = L.x;
  L.ty = L.y;
  const move = (e) => {
    L.tx = e.clientX;
    L.ty = e.clientY;
    last = performance.now();
  };
  addEventListener("pointermove", move, { passive: true });
  addEventListener("pointerdown", move, { passive: true });

  function frame(t) {
    if (!reduce && t - last > 2500) {
      const [hx, hy] = home();
      L.tx = hx + Math.cos(t / 1900) * Math.min(W * 0.3, 300);
      L.ty = hy + Math.sin(t / 1300) * 70;
    }
    L.x += (L.tx - L.x) * 0.09;
    L.y += (L.ty - L.y) * 0.09;

    const p = P[root.dataset.theme] || P.dark;
    const [sr, sg, sb] = p.star,
      [gr, gg, gb] = p.glow,
      [hr, hh, hb] = p.halo;
    c.clearRect(0, 0, W, H);

    const g = c.createRadialGradient(L.x, L.y, 0, L.x, L.y, R * 1.3);
    g.addColorStop(0, `rgba(${gr},${gg},${gb},.22)`);
    g.addColorStop(0.5, `rgba(${hr},${hh},${hb},.08)`);
    g.addColorStop(1, `rgba(${hr},${hh},${hb},0)`);
    c.fillStyle = g;
    c.fillRect(0, 0, W, H);

    const lit = [];
    for (const s of stars) {
      const k = Math.max(0, 1 - Math.hypot(s.x - L.x, s.y - L.y) / R);
      const tw = reduce ? 0.5 : 0.5 + 0.5 * Math.sin((t / 1000) * s.s + s.p);
      const a = 0.16 + 0.16 * tw + k * 0.75;
      const col = `${Math.round(sr + (gr - sr) * k)},${Math.round(sg + (gg - sg) * k)},${Math.round(sb + (gb - sb) * k)}`;
      c.fillStyle = `rgba(${col},${Math.min(a, 1)})`;
      c.beginPath();
      c.arc(s.x, s.y, s.r * (1 + k * 0.9), 0, 6.283);
      c.fill();
      if (k > 0.2) lit.push([s, k]);
    }

    c.lineWidth = 1;
    for (let i = 0; i < lit.length; i++) {
      for (let j = i + 1; j < lit.length; j++) {
        const [a, ka] = lit[i],
          [b, kb] = lit[j];
        const d = Math.hypot(a.x - b.x, a.y - b.y);
        if (d < 110) {
          c.strokeStyle = `rgba(${gr},${gg},${gb},${0.35 * Math.min(ka, kb) * (1 - d / 110)})`;
          c.beginPath();
          c.moveTo(a.x, a.y);
          c.lineTo(b.x, b.y);
          c.stroke();
        }
      }
    }

    for (let i = rp.length - 1; i >= 0; i--) {
      const q = rp[i],
        age = Math.max(0, (t - q.t) / 1500);
      if (age > 1) {
        rp.splice(i, 1);
        continue;
      }
      c.strokeStyle = q.o
        ? `rgba(${sr},${sg},${sb},${0.5 * (1 - age)})`
        : `rgba(${gr},${gg},${gb},${0.8 * (1 - age)})`;
      c.lineWidth = 2;
      c.beginPath();
      c.arc(q.x, q.y, age * 260, 0, 6.283);
      c.stroke();
    }
    if (droneF) droneF.frequency.value = 700 + (1 - L.y / H) * 1300;

    const r = wm.getBoundingClientRect();
    wm.style.setProperty("--lx", L.x - r.left + "px");
    wm.style.setProperty("--ly", L.y - r.top + "px");
    requestAnimationFrame(frame);
  }
  requestAnimationFrame(frame);

  let ac,
    master,
    on = false,
    vol = 0.67;
  const LEVEL = 0.5;
  const SCALE = [261.6, 293.7, 329.6, 392, 440, 523.3, 587.3, 659.3, 784, 880];
  const sbtn = document.getElementById("sound-toggle");
  function ripple(x, y, other) {
    rp.push({ x, y, t: performance.now(), o: other });
    if (rp.length > 20) rp.shift();
  }
  function audioInit() {
    if (ac) return;
    ac = new (window.AudioContext || window.webkitAudioContext)();
    master = ac.createGain();
    master.gain.value = 0;
    const lp = ac.createBiquadFilter(),
      d = ac.createDelay(),
      dl = ac.createBiquadFilter(),
      fb = ac.createGain(),
      wet = ac.createGain();
    lp.type = "lowpass";
    lp.frequency.value = 2200;
    dl.type = "lowpass";
    dl.frequency.value = 1400;
    d.delayTime.value = 0.42;
    fb.gain.value = 0.45;
    wet.gain.value = 0.45;
    master.connect(lp);
    lp.connect(ac.destination);
    lp.connect(d);
    d.connect(dl);
    dl.connect(fb);
    fb.connect(d);
    dl.connect(wet);
    wet.connect(ac.destination);
    droneF = ac.createBiquadFilter();
    droneF.type = "lowpass";
    droneF.frequency.value = 900;

    const dg = ac.createGain();
    dg.gain.value = 0.012;
    [261.6, 392, 523.3, 659.3].forEach((f) => {
      const o = ac.createOscillator();
      o.type = "sine";
      o.frequency.value = f;
      o.connect(droneF);
      o.start();
    });
    const lfo = ac.createOscillator(),
      lg = ac.createGain();
    lfo.frequency.value = 0.08;
    lg.gain.value = 0.008;
    lfo.connect(lg);
    lg.connect(dg.gain);
    lfo.start();
    droneF.connect(dg);
    dg.connect(master);

    const chime = () => {
      if (on && !document.hidden)
        tone(SCALE[Math.floor(Math.random() * 7)], 3, "sine", 0.05);
      setTimeout(chime, 5000 + Math.random() * 5000);
    };
    setTimeout(chime, 6000);
  }
  function tone(f, dur, type, vol, when) {
    if (!on || !ac) return;
    const t = ac.currentTime + (when || 0),
      o = ac.createOscillator(),
      g = ac.createGain();
    o.type = "sine";
    o.frequency.value = f;
    g.gain.setValueAtTime(0.0001, t);
    g.gain.exponentialRampToValueAtTime(vol, t + 0.04);
    g.gain.exponentialRampToValueAtTime(0.0001, t + dur);
    o.connect(g);
    g.connect(master);
    o.start(t);
    o.stop(t + dur + 0.05);
  }
  const note = (n, v) => {
    v = v || 0.12;
    tone(SCALE[n], 1.8, "sine", v);
    tone(SCALE[n] * 2, 1.2, "sine", v * 0.25);
  };
  function setSound(v) {
    on = v;
    if (v) {
      audioInit();
      ac.resume();
    }
    if (ac)
      master.gain.setTargetAtTime(v ? LEVEL * vol : 0, ac.currentTime, 0.15);
    sbtn.innerHTML =
      '<i class="fas fa-volume-' + (v ? "high" : "xmark") + '"></i>';
    sbtn.setAttribute("aria-label", v ? "Mute sound" : "Turn sound on");
  }
  sbtn.addEventListener("click", () => {
    if (!on && vol === 0) {
      vol = 0.67;
      vslider.value = 67;
    }
    setSound(!on);
    tone(SCALE[6], 0.8, "sine", 0.08);
  });

  const vslider = document.getElementById("vol");
  try {
    const s = localStorage.getItem("vol");
    if (s !== null && !isNaN(+s)) vol = Math.min(1, Math.max(0, +s));
  } catch (e) {}
  vslider.value = Math.round(vol * 100);
  vslider.addEventListener("input", () => {
    vol = vslider.value / 100;
    try {
      localStorage.setItem("vol", vol);
    } catch (e) {}
    if (!on && vol > 0) setSound(true);
    else if (ac)
      master.gain.setTargetAtTime(on ? LEVEL * vol : 0, ac.currentTime, 0.05);
  });

  const gate = document.getElementById("gate");
  function enter(withSound) {
    if (document.body.classList.contains("entered")) return;
    document.body.classList.add("entered");
    gate.classList.add("gone");
    if (withSound) {
      setSound(true);
      [261.6, 329.6, 392, 523.3, 659.3, 784].forEach((f, i) =>
        tone(f, 1.6, "sine", 0.1, 0.3 + i * 0.14),
      );
    }
    ripple(innerWidth / 2, innerHeight / 2);
    live();
  }
  gate.addEventListener("click", () => enter(true));
  gate.addEventListener("keydown", (e) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      enter(true);
    }
  });
  gate.focus();

  addEventListener("pointerdown", (e) => {
    if (
      !document.body.classList.contains("entered") ||
      e.target.closest("a,button,.avatar-wrap")
    )
      return;
    const n = Math.min(9, Math.floor((e.clientX / W) * 10));
    ripple(e.clientX, e.clientY);
    note(n);
    pub(e.clientX / W, e.clientY / H, n);
  });

  const HB = "https://abacus.jasoncameron.dev/",
    HP = "fentez-site-9cjfj484fj84fj48d91a/hearts";
  const av = document.querySelector(".avatar-wrap"),
    hc = document.getElementById("hc");
  let heart = 0,
    hq = 0,
    hout = 0,
    hwait = 0,
    hflight = 0;
  try {
    hq = Math.min(
      300,
      Math.max(0, parseInt(localStorage.getItem("hq"), 10) || 0),
    );
  } catch (e) {}
  heart = hq;
  const saveQ = () => {
    try {
      localStorage.setItem("hq", hq);
    } catch (e) {}
  };
  const show = () => {
    hc.textContent = heart.toLocaleString("en");
  };
  const bump = () => {
    if (!reduce)
      hc.previousElementSibling.animate(
        [
          { transform: "scale(1)" },
          { transform: "scale(1.5)" },
          { transform: "scale(1)" },
        ],
        { duration: 250 },
      );
  };

  function pump() {
    if (!hq || Date.now() < hwait || hflight >= 6) return;
    hq--;
    hflight++;
    saveQ();
    fetch(HB + "hit/" + HP, { cache: "no-store" })
      .then((r) => {
        if (!r.ok) throw 0;
        return r.json();
      })
      .then((j) => {
        if (Number.isFinite(+j.value)) {
          heart = Math.max(heart, +j.value + hq);
          show();
        }
      })
      .catch(() => {
        hq++;
        hwait = Date.now() + 3000;
        saveQ();
      })
      .finally(() => {
        hflight--;
      });
  }
  setInterval(pump, 110);
  function syncHearts() {
    fetch(HB + "get/" + HP, { cache: "no-store" })
      .then((r) => (r.status === 404 ? { value: 0 } : r.ok ? r.json() : {}))
      .then((j) => {
        if (Number.isFinite(+j.value)) {
          heart = +j.value + hq + hflight;
          show();
        }
      })
      .catch(() => {});
  }
  let lastTap = 0;
  function tap() {
    const nw = performance.now();
    if (nw - lastTap < 60) return;
    lastTap = nw;
    heart++;
    hq = Math.min(hq + 1, 300);
    hout++;
    if (!hto)
      hto = setTimeout(flushHearts, Math.max(0, 1500 - (Date.now() - hlast)));
    show();
    bump();
    saveQ();
    const r = av.getBoundingClientRect();
    ripple(r.left + r.width / 2, r.top + r.height / 2);
    tone(SCALE[heart % 10], 1.4, "sine", 0.08);
    if (heart % 50 === 0)
      [0, 2, 4, 7, 9].forEach((n, i) =>
        tone(SCALE[n], 1.2, "sine", 0.09, i * 0.09),
      );
    if (!reduce) {
      const f = document.createElement("i");
      f.className = "fas fa-heart fly";
      f.style.setProperty("--dx", Math.random() * 80 - 40 + "px");
      av.appendChild(f);
      setTimeout(() => f.remove(), 1200);
    }
  }
  av.addEventListener("click", tap);
  av.addEventListener("keydown", (e) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      tap();
    }
  });

  let hlast = 0,
    hto = 0,
    rT = 0,
    rN = 0;
  function flushHearts() {
    hto = 0;
    if (!hout) return;
    const h = hout;
    hout = 0;
    hlast = Date.now();
    fetch("https://ntfy.sh/" + TOPIC, {
      method: "POST",
      body: JSON.stringify({ h, me }),
    }).catch(() => {});
  }

  function remoteHearts(k) {
    for (let i = 0; i < Math.min(k, 6); i++)
      setTimeout(() => {
        const r = av.getBoundingClientRect();
        ripple(r.left + r.width / 2, r.top + r.height / 2, true);
        if (i === 0) tone(SCALE[heart % 10], 1.4, "sine", 0.04);
      }, i * 220);
  }
  show();
  syncHearts();
  setInterval(syncHearts, 10000);
  document.querySelectorAll(".link").forEach((a, i) => {
    a.addEventListener("pointerenter", () =>
      tone(SCALE[5 + i], 0.7, "sine", 0.06),
    );
    a.addEventListener("click", () => {
      tone(SCALE[4], 0.9, "sine", 0.09);
      tone(SCALE[7], 1.1, "sine", 0.08, 0.07);
    });
  });

  const TOPIC = "fentez-sky-7c2f9a48ffgfg838dj38d",
    me = Math.random().toString(36).slice(2, 8);
  let sent = 0;
  function pub(x, y, n) {
    const now = Date.now();
    if (now - sent < 1500) return;
    sent = now;
    fetch("https://ntfy.sh/" + TOPIC, {
      method: "POST",
      body: JSON.stringify({ x, y, n, me }),
    }).catch(() => {});
  }
  function live() {
    try {
      const es = new EventSource("https://ntfy.sh/" + TOPIC + "/sse");
      es.onmessage = (e) => {
        try {
          const m = JSON.parse(JSON.parse(e.data).message);
          if (m.me === me) return;
          const hh = Math.floor(+m.h);
          if (hh > 0) {
            const nw = Date.now();
            if (nw - rT > 10000) {
              rT = nw;
              rN = 0;
            }
            const k = Math.min(hh, 50, 100 - rN);
            if (k > 0) {
              rN += k;
              heart += k;
              show();
              remoteHearts(k);
            }
            return;
          }
          const x = +m.x,
            y = +m.y,
            n = Math.floor(+m.n);
          if (!(x >= 0 && x <= 1 && y >= 0 && y <= 1 && n >= 0 && n <= 9))
            return;
          ripple(x * W, y * H, true);
          note(n, 0.06);
        } catch (_) {}
      };
    } catch (_) {}
  }

  async function presence() {
    try {
      const j = await (
        await fetch("https://api.lanyard.rest/v1/users/664172314602110976")
      ).json();
      if (!j.success) return;
      const d = j.data,
        dot = document.querySelector(".status"),
        u = d.discord_user;
      dot.dataset.s = d.discord_status;
      dot.title = d.discord_status;

      if (u && u.id && u.avatar) {
        const src =
          "https://cdn.discordapp.com/avatars/" +
          encodeURIComponent(u.id) +
          "/" +
          encodeURIComponent(u.avatar) +
          (u.avatar.startsWith("a_") ? ".gif" : ".png") +
          "?size=256";
        const av = document.querySelector(".avatar");
        if (av.dataset.src !== src) {
          const im = new Image();
          im.onload = () => {
            av.src = src;
            av.dataset.src = src;
          };
          im.src = src;
        }
      }
    } catch (_) {}
  }
  presence();
  setInterval(presence, 30000);

  document.querySelectorAll(".link").forEach((a) => {
    a.addEventListener("pointermove", (e) => {
      const r = a.getBoundingClientRect();
      a.style.setProperty("--mx", e.clientX - r.left + "px");
      a.style.setProperty("--my", e.clientY - r.top + "px");
    });
  });
})();
