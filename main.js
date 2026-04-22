/* ============================================================
   JAVASCRIPT — SafeNet India
   All interactivity: navbar, quiz, score, scanner, language
   ============================================================ */

// ── NAVBAR SCROLL ──
window.addEventListener('scroll', () => {
  const nav = document.getElementById('navbar');
  if (window.scrollY > 60) nav.classList.add('scrolled');
  else nav.classList.remove('scrolled');
});

// ── SMOOTH SCROLL ──
function scrollTo(id) {
  document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
}

// ── MOBILE MENU ──
function toggleMobileMenu() {
  document.getElementById('mobileMenu').classList.toggle('open');
}

// ── LANGUAGE TOGGLE ──
let isHindi = false;
function toggleLang() {
  isHindi = !isHindi;
  document.body.classList.toggle('hindi', isHindi);
  document.getElementById('lang-toggle').textContent = isHindi ? 'English' : 'हिंदी';
}

// ── HERO ANIMATION ──
window.addEventListener('load', () => {
  setTimeout(() => {
    const hpScore = document.getElementById('hp-score');
    const hpBar = document.getElementById('hp-bar');
    if (hpScore) hpScore.textContent = '72 / 100';
    if (hpBar) hpBar.style.width = '72%';
  }, 800);
});

// ── SCROLL REVEAL ──
const revealEls = document.querySelectorAll('.reveal');
const observer = new IntersectionObserver((entries) => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      e.target.classList.add('visible');
      observer.unobserve(e.target);
    }
  });
}, { threshold: 0.12 });
revealEls.forEach(el => observer.observe(el));

// ── PERSONA TOGGLE ──
function togglePersona(idx) {
  const cards = document.querySelectorAll('.persona-card');
  cards.forEach((c, i) => {
    if (i === idx) c.classList.toggle('active');
    else c.classList.remove('active');
  });
}

// ── MODULE TABS ──
function switchModule(id) {
  document.querySelectorAll('.module-tab').forEach(t => t.classList.remove('active'));
  document.querySelectorAll('.module-content').forEach(c => c.classList.remove('active'));
  event.target.classList.add('active');
  document.getElementById('mod-' + id).classList.add('active');
}

// ── PASSWORD CHECKER ──
function checkPassword(pw) {
  const len = pw.length >= 8;
  const upper = /[A-Z]/.test(pw);
  const num = /[0-9]/.test(pw);
  const sym = /[^A-Za-z0-9]/.test(pw);
  const long = pw.length >= 12;
  const score = [len, upper, num, sym, long].filter(Boolean).length;
  const fill = document.getElementById('pwFill');
  const label = document.getElementById('pwLabel');
  const colors = ['#FF3B30', '#FF9500', '#FFCC00', '#34C759', '#00C896'];
  const labels = ['Very Weak 😱', 'Weak 😟', 'Fair 🙂', 'Strong 💪', 'Very Strong 🏆'];
  if (fill) {
    fill.style.width = pw.length ? ((score / 5) * 100) + '%' : '0%';
    fill.style.background = pw.length ? colors[score - 1] : '';
  }
  if (label) label.textContent = pw.length ? (labels[score - 1] || labels[0]) : 'Type a password to check its strength';
  const tips = [['pt-len', len], ['pt-upper', upper], ['pt-num', num], ['pt-sym', sym], ['pt-12', long]];
  tips.forEach(([id, ok]) => {
    const el = document.getElementById(id);
    if (el) el.classList.toggle('ok', ok);
  });
}

// ── PHISHING REVEAL ──
function revealPhish(el, type) {
  el.classList.remove('safe', 'danger');
  el.classList.add(type);
  el.querySelector('.phish-result').style.display = 'block';
}

// ── PRIVACY SCORE ──
const scoreAnswers = new Array(6).fill(null);

function scoreAnswer(btn, idx, val) {
  const row = btn.closest('.score-q');
  row.querySelectorAll('.sq-btn').forEach(b => b.classList.remove('selected'));
  btn.classList.add('selected');
  scoreAnswers[idx] = val;
}

function calculateScore() {
  if (scoreAnswers.includes(null)) {
    alert('Please answer all 6 questions!');
    return;
  }
  let pts = 0;
  scoreAnswers.forEach((a) => { if (a === 'yes') pts += 17; });
  pts = Math.min(pts, 100);
  const circle = document.getElementById('scoreCircle');
  const num = document.getElementById('scoreNum');
  const grade = document.getElementById('scoreGrade');
  const msg = document.getElementById('scoreMsg');
  const result = document.getElementById('scoreResult');
  result.style.display = 'block';
  let col, gr, ms;
  if (pts >= 80) {
    col = 'var(--mint)';
    gr = '🛡️ Digital Guardian';
    ms = 'Excellent! You have strong privacy habits. Help your friends and family learn too!';
  } else if (pts >= 50) {
    col = 'var(--gold)';
    gr = '⚠️ Needs Improvement';
    ms = 'You have some good habits but gaps remain. Focus on 2FA and unique passwords next.';
  } else {
    col = 'var(--red)';
    gr = '🚨 At Risk!';
    ms = 'Please go through the learning modules immediately. Your digital safety is at risk right now.';
  }
  circle.style.borderColor = col;
  num.style.color = col;
  num.textContent = pts;
  grade.style.color = col;
  grade.textContent = gr;
  msg.textContent = ms;
  document.getElementById('scoreResult').scrollIntoView({ behavior: 'smooth', block: 'nearest' });
}

function resetScore() {
  scoreAnswers.fill(null);
  document.querySelectorAll('.sq-btn').forEach(b => b.classList.remove('selected'));
  document.getElementById('scoreResult').style.display = 'none';
}

// ── QUIZ ──
const quizData = [
  {
    q: "You receive an SMS: 'Your account will be blocked! Click here immediately: sbi-help.xyz'. What should you do?",
    opts: ["Click the link and login", "Call the number in the SMS", "Ignore & report to 1930", "Forward to family"],
    ans: 2,
    exp: "Never click such links. SBI would never send you to a .xyz domain. Report suspicious messages to 1930 immediately."
  },
  {
    q: "Which of these is the STRONGEST password?",
    opts: ["Rahul@1995", "qwerty123", "$ecure!India#2024", "MyPassword"],
    ans: 2,
    exp: "A strong password uses UPPERCASE, lowercase, numbers, symbols, and is 12+ characters. '$ecure!India#2024' fits all criteria!"
  },
  {
    q: "A caller says: 'Main RBI se hoon. Apna UPI PIN batao nahi toh account band ho jayega.' What do you do?",
    opts: ["Tell the PIN quickly", "Ask for their employee ID first", "Hang up immediately — it's a scam!", "Transfer ₹100 to verify"],
    ans: 2,
    exp: "RBI NEVER asks for PIN or OTP. No legitimate authority ever will. Hang up and call 1930 if worried."
  },
  {
    q: "What does '2FA' (Two-Factor Authentication) mean?",
    opts: ["Two different apps for login", "Second step of security after password", "Two bank accounts", "Double firewall protection"],
    ans: 1,
    exp: "2FA adds a second security step (usually an OTP) after your password. Even if your password is stolen, hackers can't login without the OTP sent to your phone."
  },
  {
    q: "You want to install an app. It asks for access to your Contacts, Camera, Microphone, AND Location. The app is a simple flashlight. What should you do?",
    opts: ["Accept all — it might need them", "Only allow camera and location", "Deny all suspicious permissions — flashlight needs NONE of these", "Uninstall and report the app"],
    ans: 3,
    exp: "A flashlight app only needs torch/camera flash. Asking for contacts, mic or location is a MAJOR red flag. Deny all and report the app!"
  }
];

let currentQ = 0, quizScore = 0, answered = false;

function initQuiz() {
  currentQ = 0;
  quizScore = 0;
  answered = false;
  document.getElementById('quizPlay').style.display = 'block';
  document.getElementById('quizResult').style.display = 'none';
  buildProgress();
  loadQuestion();
}

function buildProgress() {
  const p = document.getElementById('quizProgress');
  p.innerHTML = quizData.map((_, i) =>
    `<div class="quiz-dot ${i === currentQ ? 'active' : i < currentQ ? 'done' : ''}"></div>`
  ).join('');
}

function loadQuestion() {
  answered = false;
  const d = quizData[currentQ];
  document.getElementById('quizQLabel').textContent = `Question ${currentQ + 1} of ${quizData.length}`;
  document.getElementById('quizQuestion').textContent = d.q;
  document.getElementById('quizFeedback').className = 'quiz-feedback';
  document.getElementById('quizFeedback').textContent = '';
  document.getElementById('quizNext').style.display = 'none';
  const opts = document.getElementById('quizOptions');
  const letters = ['A', 'B', 'C', 'D'];
  opts.innerHTML = d.opts.map((o, i) =>
    `<div class="quiz-opt" onclick="selectOpt(this,${i})"><div class="opt-letter">${letters[i]}</div>${o}</div>`
  ).join('');
  buildProgress();
}

function selectOpt(el, idx) {
  if (answered) return;
  answered = true;
  const d = quizData[currentQ];
  const opts = document.querySelectorAll('.quiz-opt');
  opts.forEach((o, i) => {
    if (i === d.ans) o.classList.add('correct');
    else if (i === idx && idx !== d.ans) o.classList.add('wrong');
  });
  if (idx === d.ans) {
    quizScore++;
    document.getElementById('quizScore').textContent = quizScore;
  }
  const fb = document.getElementById('quizFeedback');
  fb.textContent = (idx === d.ans ? '✅ Correct! ' : '❌ Incorrect. ') + d.exp;
  fb.className = 'quiz-feedback show ' + (idx === d.ans ? 'correct-fb' : 'wrong-fb');
  document.getElementById('quizNext').style.display = 'block';
}

function nextQuestion() {
  currentQ++;
  if (currentQ >= quizData.length) { showQuizResult(); return; }
  loadQuestion();
}

function showQuizResult() {
  document.getElementById('quizPlay').style.display = 'none';
  const res = document.getElementById('quizResult');
  res.style.display = 'block';
  const pct = Math.round((quizScore / quizData.length) * 100);
  let emoji, title, sub;
  if (pct === 100) {
    emoji = '🏆'; title = 'Perfect Score! Cybersecurity Champion!';
    sub = 'You are a Digital Guardian. Share SafeNet with 5 friends!';
  } else if (pct >= 60) {
    emoji = '🌟'; title = 'Well Done! Keep Learning!';
    sub = 'Good knowledge of cyber safety. Review the modules to score 100% next time!';
  } else {
    emoji = '📚'; title = 'Keep Learning!';
    sub = 'Cyber safety is important. Go through the learning modules above and try again!';
  }
  document.getElementById('qsEmoji').textContent = emoji;
  document.getElementById('qsTitle').textContent = title;
  document.getElementById('qsSub').textContent = sub;
  document.getElementById('qsScore').textContent = `${quizScore}/${quizData.length}`;
  const badges = [];
  if (quizScore >= 1) badges.push({ icon: '🎯', name: 'First Step' });
  if (quizScore >= 3) badges.push({ icon: '🛡️', name: 'Defender' });
  if (quizScore === 5) badges.push({ icon: '🏆', name: 'Champion' });
  document.getElementById('badgesEarned').innerHTML = badges.map(b =>
    `<div class="badge-earned"><div class="be-icon">${b.icon}</div><div class="be-name">${b.name}</div></div>`
  ).join('');
}

function restartQuiz() { initQuiz(); }

// ── APP SCANNER ──
const appData = {
  torch: {
    name: 'Flashlight App', icon: '🔦', risk: 'HIGH RISK',
    perms: [
      { icon: '📷', name: 'Camera / Flash', r: 'safe', rl: 'Required — for torch' },
      { icon: '📍', name: 'Location', r: 'danger', rl: "SUSPICIOUS — flashlight doesn't need location!" },
      { icon: '📇', name: 'Contacts', r: 'danger', rl: 'SUSPICIOUS — no legitimate use' },
      { icon: '🎤', name: 'Microphone', r: 'danger', rl: 'SUSPICIOUS — DELETE this app immediately!' },
      { icon: '📶', name: 'Network Access', r: 'warning', rl: 'Moderate — may show ads' }
    ]
  },
  weather: {
    name: 'Weather App', icon: '🌤️', risk: 'MEDIUM',
    perms: [
      { icon: '📍', name: 'Location', r: 'safe', rl: 'Required — for local weather' },
      { icon: '📶', name: 'Network Access', r: 'safe', rl: 'Required — to fetch weather data' },
      { icon: '🔔', name: 'Notifications', r: 'warning', rl: 'Optional — for weather alerts' },
      { icon: '📷', name: 'Camera', r: 'danger', rl: "SUSPICIOUS — weather app doesn't need camera" }
    ]
  },
  upi: {
    name: 'UPI Payment App', icon: '💸', risk: 'MEDIUM',
    perms: [
      { icon: '📱', name: 'Phone / SMS', r: 'safe', rl: 'Required — to read OTP for transactions' },
      { icon: '📷', name: 'Camera', r: 'safe', rl: 'Required — for QR code scanning' },
      { icon: '🔒', name: 'Biometric', r: 'safe', rl: 'Required — for secure authentication' },
      { icon: '📇', name: 'Contacts', r: 'warning', rl: 'Optional — for sending money to contacts' },
      { icon: '📍', name: 'Location', r: 'warning', rl: 'Optional — for fraud detection' }
    ]
  },
  games: {
    name: 'Free Game App', icon: '🎮', risk: 'HIGH RISK',
    perms: [
      { icon: '🎤', name: 'Microphone', r: 'danger', rl: "SUSPICIOUS — most games don't need mic" },
      { icon: '📷', name: 'Camera', r: 'danger', rl: "SUSPICIOUS — game doesn't need your camera" },
      { icon: '📇', name: 'Contacts', r: 'danger', rl: 'SUSPICIOUS — often sold to advertisers' },
      { icon: '📍', name: 'Location', r: 'danger', rl: 'SUSPICIOUS — unnecessary for gaming' },
      { icon: '💾', name: 'Storage Access', r: 'warning', rl: 'Moderate — for game saves & screenshots' }
    ]
  },
  camera: {
    name: 'Camera App', icon: '📷', risk: 'SAFE',
    perms: [
      { icon: '📷', name: 'Camera', r: 'safe', rl: 'Required — main function of the app' },
      { icon: '🎤', name: 'Microphone', r: 'safe', rl: 'Required — for video recording' },
      { icon: '💾', name: 'Storage', r: 'safe', rl: 'Required — to save photos & videos' },
      { icon: '📍', name: 'Location', r: 'warning', rl: 'Optional — for geotagging photos (can disable)' }
    ]
  }
};

function showAppDetail(id) {
  document.querySelectorAll('.app-item').forEach(a => a.classList.remove('selected'));
  event.currentTarget.classList.add('selected');
  const d = appData[id];
  const permsHtml = d.perms.map(p =>
    `<div class="perm-item">
      <div class="perm-icon">${p.icon}</div>
      <div class="perm-name">${p.name}</div>
      <div class="perm-risk ${p.r}">${p.r === 'safe' ? 'Safe' : p.r === 'warning' ? 'Caution' : '⚠️ Risky'}</div>
    </div>
    <div style="font-size:12px;color:var(--gray-500);margin:-6px 0 8px 16px;padding-left:20px">${p.rl}</div>`
  ).join('');
  const riskClass = d.risk.toLowerCase().includes('high') ? 'high' : d.risk.toLowerCase().includes('medium') ? 'medium' : 'low';
  document.getElementById('scannerDetail').innerHTML = `
    <div>
      <div style="display:flex;align-items:center;gap:12px;margin-bottom:20px">
        <div style="font-size:36px">${d.icon}</div>
        <div>
          <div style="font-family:var(--font-head);font-size:18px;font-weight:800;color:var(--navy)">${d.name}</div>
          <div class="app-risk ${riskClass}" style="font-size:13px;margin-top:4px">${d.risk}</div>
        </div>
      </div>
      <div style="font-family:var(--font-head);font-size:12px;font-weight:700;color:var(--gray-500);letter-spacing:2px;text-transform:uppercase;margin-bottom:12px">Permissions Requested</div>
      <div class="permission-list">${permsHtml}</div>
    </div>`;
}

// ── CONTACT FORM ──
function submitForm() {
  document.getElementById('contactFormWrap').style.display = 'none';
  document.getElementById('formSuccess').classList.add('show');
}

// ── INIT ──
initQuiz();
