const { Resend } = require('resend');
const fs = require('fs');
const path = require('path');

const resend = new Resend(process.env.RESEND_API_KEY);
const EMAIL_TO = process.env.EMAIL_TO || 'bennyyohanes5@gmail.com';
const SITE_URL = 'https://bennyyohanes.github.io/english-daily-practice/';

function getDayNumber() {
  // Day 1 = Jan 1, 2025. Cycle every 30 days.
  const start = new Date('2025-01-01');
  const now = new Date();
  const diff = Math.floor((now - start) / (1000 * 60 * 60 * 24));
  return (diff % 30) + 1;
}

async function main() {
  const day = getDayNumber();
  const lessonPath = path.join(__dirname, '..', 'lessons', `day-${day}.json`);
  const lesson = JSON.parse(fs.readFileSync(lessonPath, 'utf-8'));

  const vocabRows = lesson.warmup.words.map(w => `
    <tr>
      <td style="padding: 10px 16px; border-bottom: 1px solid #30363D; font-family: 'Fira Code', monospace; color: #00D4FF; font-weight: 600;">${w.word}</td>
      <td style="padding: 10px 16px; border-bottom: 1px solid #30363D; color: #8B949E;">${w.meaning}</td>
      <td style="padding: 10px 16px; border-bottom: 1px solid #30363D; color: #E6EDF3; font-style: italic;">${w.example}</td>
    </tr>
  `).join('');

  const phrasesHTML = lesson.phrases.items.map(p => `
    <div style="background: #1C2128; border: 1px solid #30363D; border-radius: 8px; padding: 16px; margin-bottom: 10px;">
      <div style="font-size: 11px; color: #6E7681; text-transform: uppercase; margin-bottom: 4px;">${p.context}</div>
      <div style="color: #E6EDF3; font-size: 15px; font-weight: 500; margin-bottom: 4px;">"${p.phrase}"</div>
      <div style="color: #8B949E; font-size: 13px;">${p.indonesian}</div>
    </div>
  `).join('');

  const html = `
  <!DOCTYPE html>
  <html>
  <head><meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1.0"></head>
  <body style="margin: 0; padding: 0; background: #0D1117; font-family: 'Inter', Arial, sans-serif;">
    <div style="max-width: 600px; margin: 0 auto; padding: 20px;">
      <!-- Header -->
      <div style="background: linear-gradient(135deg, #161B22, #1C2128); border: 1px solid #30363D; border-radius: 12px; padding: 32px; text-align: center; margin-bottom: 20px;">
        <div style="font-size: 40px; margin-bottom: 12px;">🚀</div>
        <h1 style="color: #E6EDF3; margin: 0 0 8px; font-size: 22px;">English Daily Practice</h1>
        <div style="display: inline-block; background: rgba(0,212,255,0.1); border: 1px solid rgba(0,212,255,0.3); color: #00D4FF; padding: 6px 16px; border-radius: 20px; font-size: 14px; font-weight: 600;">Day ${day} of 30</div>
        <h2 style="color: #00D4FF; font-size: 18px; margin: 16px 0 0;">${lesson.title}</h2>
      </div>

      <!-- Vocabulary -->
      <div style="background: #161B22; border: 1px solid #30363D; border-radius: 12px; padding: 24px; margin-bottom: 20px;">
        <h3 style="color: #E6EDF3; margin: 0 0 16px;">🔥 ${lesson.warmup.title}</h3>
        <table style="width: 100%; border-collapse: collapse; background: #1C2128; border-radius: 8px; overflow: hidden;">
          <thead>
            <tr>
              <th style="padding: 10px 16px; text-align: left; color: #8B949E; font-size: 12px; text-transform: uppercase; border-bottom: 1px solid #30363D;">Word</th>
              <th style="padding: 10px 16px; text-align: left; color: #8B949E; font-size: 12px; text-transform: uppercase; border-bottom: 1px solid #30363D;">Meaning</th>
              <th style="padding: 10px 16px; text-align: left; color: #8B949E; font-size: 12px; text-transform: uppercase; border-bottom: 1px solid #30363D;">Example</th>
            </tr>
          </thead>
          <tbody>${vocabRows}</tbody>
        </table>
      </div>

      <!-- Speaking -->
      <div style="background: #161B22; border: 1px solid #30363D; border-radius: 12px; padding: 24px; margin-bottom: 20px;">
        <h3 style="color: #E6EDF3; margin: 0 0 12px;">💬 ${lesson.speaking.title}</h3>
        <div style="background: rgba(0,212,255,0.05); border: 1px solid rgba(0,212,255,0.2); border-radius: 8px; padding: 16px; color: #E6EDF3; font-size: 14px; line-height: 1.7;">
          <strong style="color: #00D4FF;">Scenario:</strong> ${lesson.speaking.scenario}<br><br>
          ${lesson.speaking.context}
        </div>
        <div style="background: #1C2128; border: 1px solid #30363D; border-radius: 8px; padding: 16px; margin-top: 12px; color: #8B949E; font-size: 14px;">
          <strong style="color: #3FB950;">Sample Answer:</strong><br>${lesson.speaking.sample_answer}
        </div>
      </div>

      <!-- Reading -->
      <div style="background: #161B22; border: 1px solid #30363D; border-radius: 12px; padding: 24px; margin-bottom: 20px;">
        <h3 style="color: #E6EDF3; margin: 0 0 12px;">📖 ${lesson.reading.title}</h3>
        <div style="background: #1C2128; border-left: 3px solid #00D4FF; border-radius: 8px; padding: 16px; font-family: 'Courier New', monospace; font-size: 13px; color: #8B949E; white-space: pre-wrap; line-height: 1.7;">${lesson.reading.passage.substring(0, 400)}${lesson.reading.passage.length > 400 ? '...' : ''}</div>
      </div>

      <!-- Phrases -->
      <div style="background: #161B22; border: 1px solid #30363D; border-radius: 12px; padding: 24px; margin-bottom: 20px;">
        <h3 style="color: #E6EDF3; margin: 0 0 16px;">🛠️ ${lesson.phrases.title}</h3>
        ${phrasesHTML}
      </div>

      <!-- CTA -->
      <div style="text-align: center; margin: 24px 0;">
        <a href="${SITE_URL}" style="display: inline-block; background: #00D4FF; color: #0D1117; text-decoration: none; padding: 14px 32px; border-radius: 8px; font-weight: 700; font-size: 16px;">Open Full Lesson →</a>
      </div>

      <div style="text-align: center; color: #6E7681; font-size: 12px; padding: 16px;">
        English Daily Practice for Programmers 🚀 | Day ${day}/30
      </div>
    </div>
  </body>
  </html>
  `;

  await resend.emails.send({
    from: 'English Daily Practice <onboarding@resend.dev>',
    to: EMAIL_TO,
    subject: `📚 Day ${day} - ${lesson.title} | English Daily Practice`,
    html,
  });

  console.log(`✅ Email sent for Day ${day}: ${lesson.title}`);
}

main().catch(err => {
  console.error('Failed to send email:', err);
  process.exit(1);
});
