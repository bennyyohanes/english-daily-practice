// SHA-256 hash of the login password (never store plain text)
const PASSWORD_HASH = '3fe289d7d1bf66596b7ccc72dd8b03bd664c7ae74f9090979638f12a8c0daa31';

async function hashPassword(password) {
  const encoder = new TextEncoder();
  const data = encoder.encode(password);
  const hashBuffer = await crypto.subtle.digest('SHA-256', data);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  return hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
}

async function handleLogin(e) {
  e.preventDefault();
  const input = document.getElementById('password-input').value;
  const hash = await hashPassword(input);
  if (hash === PASSWORD_HASH) {
    sessionStorage.setItem('authenticated', 'true');
    document.getElementById('login-screen').classList.add('hidden');
    document.getElementById('app').classList.remove('hidden');
    initApp();
  } else {
    document.getElementById('login-error').classList.remove('hidden');
    document.getElementById('password-input').value = '';
    document.getElementById('password-input').focus();
  }
}

function checkAuth() {
  if (sessionStorage.getItem('authenticated') === 'true') {
    document.getElementById('login-screen').classList.add('hidden');
    document.getElementById('app').classList.remove('hidden');
    initApp();
  } else {
    document.getElementById('login-form').addEventListener('submit', handleLogin);
  }
}

let currentDay = 1;
const TOTAL_DAYS = 30;

function initApp() {
  const savedDay = parseInt(localStorage.getItem('currentDay') || '1', 10);
  currentDay = Math.min(Math.max(savedDay, 1), TOTAL_DAYS);
  loadLesson(currentDay);
  setupTabs();
}

function setupTabs() {
  document.querySelectorAll('.tab-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const tab = btn.dataset.tab;
      document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
      document.querySelectorAll('.tab-pane').forEach(p => p.classList.add('hidden'));
      btn.classList.add('active');
      document.getElementById('tab-' + tab).classList.remove('hidden');
    });
  });
}

async function loadLesson(day) {
  try {
    const response = await fetch(`lessons/day-${day}.json`);
    const lesson = await response.json();
    renderLesson(lesson, day);
  } catch (err) {
    console.error('Failed to load lesson:', err);
  }
}

function renderLesson(lesson, day) {
  document.getElementById('current-day').textContent = day;
  document.getElementById('nav-day').textContent = day;
  document.getElementById('lesson-title').textContent = `Day ${day}: ${lesson.title}`;
  const pct = (day / TOTAL_DAYS) * 100;
  document.getElementById('progress-bar').style.width = pct + '%';
  document.querySelector('.day-badge').textContent = `Day ${day} of ${TOTAL_DAYS}`;

  // Warm-Up
  document.getElementById('warmup-title').textContent = lesson.warmup.title;
  const grid = document.getElementById('warmup-words');
  grid.innerHTML = lesson.warmup.words.map(w => `
    <div class="vocab-card">
      <div class="vocab-word">${w.word}</div>
      <div class="vocab-meaning">${w.meaning}</div>
      <div class="vocab-example">${w.example}</div>
    </div>
  `).join('');

  // Speaking
  document.getElementById('speaking-title').textContent = lesson.speaking.title;
  document.getElementById('speaking-content').innerHTML = `
    <div class="speaking-card">
      <div class="scenario-badge">📍 ${lesson.speaking.scenario}</div>
      <div class="speaking-context">${lesson.speaking.context}</div>
      <p class="speaking-prompt">💡 ${lesson.speaking.prompt}</p>
      <button class="btn-show-answer" onclick="toggleAnswer(this)">Show Sample Answer</button>
      <div class="sample-answer hidden">${lesson.speaking.sample_answer}</div>
    </div>
  `;

  // Reading
  document.getElementById('reading-title').textContent = lesson.reading.title;
  const questionsHTML = lesson.reading.questions.map((q, i) => `
    <div class="question-item">
      <div class="question-text">${i + 1}. ${q}</div>
      <button class="btn-show-answer-q" onclick="toggleAnswerQ(this, '${lesson.reading.answers[i].replace(/'/g, "&#39;")}')">Show Answer</button>
      <div class="answer-text hidden"></div>
    </div>
  `).join('');
  const keyPhrasesHTML = lesson.reading.key_phrases.map(kp => `
    <div class="key-phrase-item">
      <span class="key-phrase-text">${kp.phrase}</span>
      <span class="key-phrase-meaning">${kp.meaning}</span>
    </div>
  `).join('');
  document.getElementById('reading-content').innerHTML = `
    <div class="reading-passage">${lesson.reading.passage}</div>
    <div class="reading-questions">
      <h4>📝 Comprehension Questions:</h4>
      ${questionsHTML}
    </div>
    <div class="key-phrases">
      <h4>🔑 Key Phrases:</h4>
      ${keyPhrasesHTML}
    </div>
  `;

  // Phrases
  document.getElementById('phrases-title').textContent = lesson.phrases.title;
  document.getElementById('phrases-content').innerHTML = lesson.phrases.items.map(p => `
    <div class="phrase-item">
      <div>
        <div class="phrase-context">${p.context}</div>
        <div class="phrase-text">"${p.phrase}"</div>
        <div class="phrase-indonesian">${p.indonesian}</div>
      </div>
      <button class="btn-copy" onclick="copyPhrase(this, '${p.phrase.replace(/'/g, "&#39;")}')">📋 Copy</button>
    </div>
  `).join('');

  document.getElementById('prev-btn').disabled = day <= 1;
  document.getElementById('next-btn').disabled = day >= TOTAL_DAYS;
}

function toggleAnswer(btn) {
  const answer = btn.nextElementSibling;
  answer.classList.toggle('hidden');
  btn.textContent = answer.classList.contains('hidden') ? 'Show Sample Answer' : 'Hide Sample Answer';
}

function toggleAnswerQ(btn, answer) {
  const answerEl = btn.nextElementSibling;
  answerEl.classList.toggle('hidden');
  if (!answerEl.classList.contains('hidden')) {
    answerEl.textContent = '✅ ' + answer;
    btn.textContent = 'Hide Answer';
  } else {
    btn.textContent = 'Show Answer';
  }
}

function copyPhrase(btn, phrase) {
  navigator.clipboard.writeText(phrase).then(() => {
    btn.textContent = '✅ Copied!';
    btn.classList.add('copied');
    setTimeout(() => {
      btn.textContent = '📋 Copy';
      btn.classList.remove('copied');
    }, 2000);
  });
}

function navigate(dir) {
  const newDay = currentDay + dir;
  if (newDay < 1 || newDay > TOTAL_DAYS) return;
  currentDay = newDay;
  localStorage.setItem('currentDay', currentDay);
  // Reset to warmup tab
  document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
  document.querySelectorAll('.tab-pane').forEach(p => p.classList.add('hidden'));
  document.querySelector('[data-tab="warmup"]').classList.add('active');
  document.getElementById('tab-warmup').classList.remove('hidden');
  loadLesson(currentDay);
}

// Init
checkAuth();
