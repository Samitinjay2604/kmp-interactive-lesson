// Records a silent, timed screen demo of the KMP lesson that matches NARRATION_SCRIPT.md.
// Run from this folder:  npm i playwright && npx playwright install chromium && node record-demo.js
const { chromium } = require("playwright");
const path = require("path");
const fs = require("fs");

const LESSON = "file:///" + path.resolve(__dirname, "../index.html").replace(/\\/g, "/");
const OUT = path.resolve(__dirname, "raw");

// [end time in seconds, chapter label] must match NARRATION_SCRIPT.md
const SEGMENTS = [
  [35, "1 · Why KMP"], [80, "2 · How I broke it down"], [125, "3 · Naive search"],
  [170, "4 · Key insight: borders"], [225, "5 · The LPS table"], [290, "6 · KMP search"],
  [350, "7 · Complexity"], [410, "8 · Edge cases, quiz, challenge"], [450, "9 · How a student uses it"],
];

const OVERLAY = () => {
  addEventListener("DOMContentLoaded", () => {
    const st = document.createElement("style");
    st.textContent = `
      #__cur{position:fixed;left:0;top:0;width:22px;height:22px;z-index:99999;pointer-events:none;transition:transform .05s linear}
      #__cur svg{filter:drop-shadow(0 1px 2px rgba(0,0,0,.4))}
      #__cur.down::after{content:"";position:absolute;left:-10px;top:-10px;width:24px;height:24px;border-radius:50%;background:rgba(52,81,201,.35)}
      #__pill{position:fixed;right:16px;bottom:16px;z-index:99998;background:rgba(20,22,30,.86);color:#fff;font:600 14px system-ui,sans-serif;padding:8px 14px;border-radius:99px;pointer-events:none}
      #__pill b{font-family:Consolas,monospace;color:#ffd166;margin-left:10px}`;
    document.head.appendChild(st);
    const c = document.createElement("div"); c.id = "__cur";
    c.innerHTML = '<svg width="22" height="22" viewBox="0 0 24 24"><path d="M3 2l7 19 2.5-7.5L20 11z" fill="#fff" stroke="#111" stroke-width="1.6" stroke-linejoin="round"/></svg>';
    document.body.appendChild(c);
    const p = document.createElement("div"); p.id = "__pill"; document.body.appendChild(p);
    addEventListener("mousemove", e => c.style.transform = `translate(${e.clientX}px,${e.clientY}px)`);
    addEventListener("mousedown", () => c.classList.add("down"));
    addEventListener("mouseup", () => setTimeout(() => c.classList.remove("down"), 150));
    setInterval(() => {
      const s = Math.max(0, Math.floor((Date.now() - (window.__t0 || Date.now())) / 1000));
      p.innerHTML = `${window.__chap || ""}<b>${Math.floor(s / 60)}:${String(s % 60).padStart(2, "0")}</b>`;
    }, 200);
  });
};

(async () => {
  fs.rmSync(OUT, { recursive: true, force: true });
  const browser = await chromium.launch();
  const ctx = await browser.newContext({
    viewport: { width: 1280, height: 720 }, recordVideo: { dir: OUT, size: { width: 1280, height: 720 } },
    colorScheme: "light",
  });
  await ctx.addInitScript(OVERLAY);
  const page = await ctx.newPage();
  const t0 = Date.now();
  page.on("dialog", d => d.accept());
  await page.goto(LESSON);
  await page.evaluate(t => { window.__t0 = t; }, t0);

  const wait = ms => page.waitForTimeout(ms);
  const now = () => (Date.now() - t0) / 1000;
  const until = async sec => { const left = sec - now(); if (left > 0) await wait(left * 1000); else console.log(`  overran by ${(-left).toFixed(1)}s`); };
  const chap = c => page.evaluate(x => { window.__chap = x; }, c);
  const scrollTo = async (sel, block = "start") => { await page.evaluate(([s, b]) => document.querySelector(s).scrollIntoView({ behavior: "smooth", block: b }), [sel, block]); await wait(1200); };
  const box = async sel => { const b = await page.locator(sel).first().boundingBox(); return { x: b.x + b.width / 2, y: b.y + b.height / 2 }; };
  const point = async (sel, steps = 25) => { const { x, y } = await box(sel); await page.mouse.move(x, y, { steps }); };
  const click = async (sel, pause = 300) => { await point(sel, 18); await wait(pause); const { x, y } = await box(sel); await page.mouse.click(x, y); };
  const select = async (sel, value) => { await point(sel); await wait(300); await page.selectOption(sel, value); };

  let k = 0;
  const seg = async fn => { const [end, label] = SEGMENTS[k++]; console.log(`${label} (start ${now().toFixed(1)}s)`); await chap(label); await fn(); await until(end); };

  // 1 · Intro
  await seg(async () => {
    await page.mouse.move(640, 300);
    await wait(4000); await point("#intro h2"); await wait(6000);
    await point("#intro .lead strong"); await wait(8000);
    await point("#intro .callout.ok"); await wait(4000);
  });
  // 2 · Breakdown
  await seg(async () => {
    await scrollTo("#lessonMap", "center");
    for (const id of ["intro", "naive", "insight", "lps", "search", "code", "complexity", "edges", "practice"]) {
      await point(`#lessonMap a[data-id=${id}]`, 15); await wait(2400);
    }
    await point("#toc a[data-id=naive]", 30); await wait(1500);
    await point("#toc a[data-id=practice]", 30);
  });
  // 3 · Naive
  await seg(async () => {
    await scrollTo("#naive");
    await page.evaluate(() => window.scrollBy({ top: 150, behavior: "smooth" })); await wait(800);
    await select("#vizNaive .preset", "1"); await wait(1500);
    for (let i = 0; i < 10; i++) { await click("#vizNaive .next", 100); await wait(2000); }
    await point("#vizNaive .brow.small", 20); await wait(3000);
    await click("#vizNaive .last"); await wait(1000);
    await point("#vizNaive .stats", 20);
  });
  // 4 · Insight
  await seg(async () => {
    await scrollTo("#insightBoard", "center"); await wait(2000);
    await point("#insightBoard .brow:nth-child(3)", 20); await wait(4000);
    await point("#insightBoard .brow:nth-child(5)", 20); await wait(6000);
    await point("#insight .rules li:nth-child(3)", 20); await wait(5000);
    await scrollTo("#borderIn", "center");
    await click("#borderIn"); await page.fill("#borderIn", "");
    for (const ch of "ABCABDABCAB") { await page.keyboard.type(ch); await wait(350); }
    await wait(1500); await point("#borderOut .feedback", 20);
  });
  // 5 · LPS
  await seg(async () => {
    await scrollTo("#lps .callout"); await wait(5000);
    await scrollTo("#vizLps");
    await page.evaluate(() => { const s = document.querySelector("#vizLps .speed input"); s.value = 6; });
    await click("#vizLps .play"); await wait(1000);
    await point("#vizLps .code", 20); await wait(12000);
    await point("#vizLps .board-wrap", 20); await wait(4000);
    await scrollTo("#fillLps", "center");
    const ans = ["0", "0", "1", "2", "3", "0"];
    for (let i = 1; i < 6; i++) { await click(`#fillLps .fill-row input:nth-child(${i + 1})`, 100); await page.keyboard.type(ans[i]); await wait(500); }
    await click("#fillLps .chk"); await wait(1500);
    await point("#fillLps .feedback", 20);
  });
  // 6 · Search
  await seg(async () => {
    await scrollTo("#vizKmp");
    await page.evaluate(() => window.scrollBy({ top: -30 }));
    await select("#vizKmp .preset", "2"); await wait(1500);
    for (let i = 0; i < 13; i++) { await click("#vizKmp .next", 100); await wait(i >= 6 ? 3200 : 1800); }
    await point("#vizKmp .code", 20); await wait(2000);
    await click("#vizKmp .last"); await wait(1500);
    await point("#vizKmp .stats", 20);
  });
  // 7 · Complexity
  await seg(async () => {
    page.evaluate(() => { getPython(); }).catch(() => {}); // warm up Python for segment 8
    await scrollTo("#complexity .rules", "center");
    for (let i = 1; i <= 4; i++) { await point(`#complexity .rules li:nth-child(${i})`, 20); await wait(4500); }
    await scrollTo("#jTrace", "center"); await point("#jTrace svg", 20); await wait(9000);
    await scrollTo("#expChart", "center"); await wait(2000);
    await point("#expM", 20);
    for (let m = 30; m <= 60; m += 3) { await page.evaluate(v => { const e = document.querySelector("#expM"); e.value = v; e.dispatchEvent(new Event("input")); }, m); await wait(700); }
    await point("#expRead", 20);
  });
  // 8 · Edge cases, quiz, challenge
  await seg(async () => {
    await scrollTo("#edges"); await wait(2500);
    await click('[data-try="ABABABAB|ABAB"]'); await wait(2500);
    await click("#vizKmp .last"); await wait(3500);
    await scrollTo("#finalQuiz"); await wait(1500);
    await click("#finalQuiz .q:nth-child(1) .opt:nth-child(1)"); await wait(4000);
    await click("#finalQuiz .q:nth-child(2) .opt:nth-child(2)"); await wait(4500);
    await scrollTo("#chTabs"); await wait(1500);
    await click("#chPanels .panel .sol"); await wait(2500);
    await click("#chPanels .panel .run");
    await page.waitForFunction(() => /tests passed|Couldn't/.test(document.querySelector("#chPanels .pg-out").textContent), null, { timeout: 25000 }).catch(() => {});
    await point("#chPanels .pg-out", 20);
  });
  // 9 · Student flow + close
  await seg(async () => {
    await page.evaluate(() => window.scrollTo({ top: 0, behavior: "smooth" })); await wait(1500);
    for (const id of ["intro", "naive", "insight"]) {
      await scrollTo(`.done-btn[data-done=${id}]`, "center");
      await click(`.done-btn[data-done=${id}]`); await wait(1800);
    }
    await page.evaluate(() => window.scrollTo({ top: 0, behavior: "smooth" })); await wait(1500);
    await point("#progFill", 20); await wait(4000);
    await point("#toc a[data-id=insight]", 20); await wait(3000);
    await page.mouse.move(640, 360, { steps: 20 });
  });

  console.log(`done at ${now().toFixed(1)}s`);
  await ctx.close(); await browser.close();
  console.log("video:", fs.readdirSync(OUT));
})();
