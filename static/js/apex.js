/* ═══════════════════════════════════════════════════════════════════
   APEX FITNESS — Main JavaScript
═══════════════════════════════════════════════════════════════════ */

// ─── Init AOS ───────────────────────────────────────────────────────
document.addEventListener('DOMContentLoaded', () => {
  AOS.init({ duration: 700, easing: 'ease-out', once: true, offset: 60 });

  initNavScroll();
  initCounters();
  initBackToTop();
  initFitnessSimulator();
  initGalleryFilter();
  initSimulatorForm();
  autoCloseAlerts();
});

// ─── Navbar scroll effect ────────────────────────────────────────────
function initNavScroll() {
  const nav = document.getElementById('apexNav');
  if (!nav) return;
  window.addEventListener('scroll', () => {
    nav.classList.toggle('scrolled', window.scrollY > 50);
  }, { passive: true });
}

// ─── Animated counters ───────────────────────────────────────────────
function initCounters() {
  const counters = document.querySelectorAll('[data-counter]');
  if (!counters.length) return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (!entry.isIntersecting || entry.target.dataset.animated) return;
      entry.target.dataset.animated = 'true';
      animateCounter(entry.target);
    });
  }, { threshold: 0.4 });

  counters.forEach(el => observer.observe(el));
}

function animateCounter(el) {
  const raw = el.dataset.counter;            // e.g. "8500+" or "97%"
  const num = parseFloat(raw.replace(/[^0-9.]/g, ''));
  const suffix = raw.replace(/[0-9.]/g, '');
  const duration = 1800;
  const start = performance.now();

  function step(now) {
    const progress = Math.min((now - start) / duration, 1);
    const eased = 1 - Math.pow(1 - progress, 3);
    el.textContent = (Math.round(eased * num)).toLocaleString() + suffix;
    if (progress < 1) requestAnimationFrame(step);
  }
  requestAnimationFrame(step);
}

// ─── Back to top button ──────────────────────────────────────────────
function initBackToTop() {
  const btn = document.getElementById('backToTop');
  if (!btn) return;
  window.addEventListener('scroll', () => {
    btn.classList.toggle('visible', window.scrollY > 400);
  }, { passive: true });
}

// ─── Auto-close alerts ───────────────────────────────────────────────
function autoCloseAlerts() {
  document.querySelectorAll('.apex-alert').forEach(alert => {
    setTimeout(() => alert.remove(), 5000);
  });
}

// ═══════════════════════════════════════════════════════════════════════
//  FITNESS JOURNEY SIMULATOR
// ═══════════════════════════════════════════════════════════════════════

const SIMULATOR_DATA = {
  // Maps goal × level → roadmap milestones
  roadmaps: {
    'weight-loss': {
      beginner: [
        { week: 'Week 1–2',   icon: '🔥', title: 'Foundation',       desc: 'Cardio basics, diet audit & body composition scan' },
        { week: 'Month 1',    icon: '📉', title: 'First Drop',        desc: 'Lose 2–3 kg, build workout habit & meal discipline' },
        { week: 'Month 2–3',  icon: '💧', title: 'Fat Burning Phase', desc: 'HIIT + strength combo, visible belly reduction' },
        { week: 'Month 4–6',  icon: '⚡', title: 'Body Recomposition',desc: 'Lean muscle growth while burning remaining fat' },
      ],
      intermediate: [
        { week: 'Week 1–2',   icon: '🔥', title: 'Reset & Re-target', desc: 'Recalibrate macros, progressive overload restart' },
        { week: 'Month 1',    icon: '📉', title: 'Aggressive Cut',    desc: 'Caloric deficit + metabolic conditioning' },
        { week: 'Month 2–3',  icon: '💧', title: 'Plateau Breaker',   desc: 'Carb cycling, varied training stimulus' },
        { week: 'Month 4–6',  icon: '⚡', title: 'Definition Phase',  desc: 'Muscle preservation while finishing the cut' },
      ],
      advanced: [
        { week: 'Week 1–2',   icon: '🔥', title: 'Competition Prep',  desc: 'Structured cut protocol, biweekly check-ins' },
        { week: 'Month 1',    icon: '📉', title: 'Water Manipulation', desc: 'Sodium protocol, strategic refeed days' },
        { week: 'Month 2–3',  icon: '💧', title: 'Peak Week Prep',    desc: 'Final shred, carb depletion & reload' },
        { week: 'Month 4–6',  icon: '⚡', title: 'Stage Ready',       desc: 'Competition or photoshoot condition achieved' },
      ],
    },
    'muscle-gain': {
      beginner: [
        { week: 'Week 1–2',   icon: '💪', title: 'Movement Mastery',  desc: 'Form, compound lifts, baseline strength assessment' },
        { week: 'Month 1',    icon: '🏋️', title: 'Newbie Gains',     desc: '+2–3 kg lean mass, rapid strength improvements' },
        { week: 'Month 2–3',  icon: '📈', title: 'Volume Build',      desc: 'Hypertrophy training, progressive overload plan' },
        { week: 'Month 4–6',  icon: '🔱', title: 'Size & Strength',   desc: 'Visible muscle development, increased lifts 40–60%' },
      ],
      intermediate: [
        { week: 'Week 1–2',   icon: '💪', title: 'Program Audit',     desc: 'Identify weak points, optimize split & recovery' },
        { week: 'Month 1',    icon: '🏋️', title: 'Structured Bulk',   desc: 'Clean caloric surplus, tracked macro execution' },
        { week: 'Month 2–3',  icon: '📈', title: 'Specialization',    desc: 'Target lagging muscles with focused volume' },
        { week: 'Month 4–6',  icon: '🔱', title: 'Mass Phase',        desc: '+4–6 kg lean mass, significant strength PRs' },
      ],
      advanced: [
        { week: 'Week 1–2',   icon: '💪', title: 'Advanced Periodization', desc: 'Daily undulating periodization protocol' },
        { week: 'Month 1',    icon: '🏋️', title: 'Strength-Hypertrophy',   desc: 'Conjugate or block periodization execution' },
        { week: 'Month 2–3',  icon: '📈', title: 'Nutrient Timing',         desc: 'Peri-workout nutrition optimization, supplements' },
        { week: 'Month 4–6',  icon: '🔱', title: 'Elite Physique',          desc: 'Competition or elite athlete physique attained' },
      ],
    },
    'strength': {
      beginner: [
        { week: 'Week 1–2',   icon: '⚙️', title: 'Technique First',   desc: 'Squat, bench, deadlift form with coach oversight' },
        { week: 'Month 1',    icon: '🏆', title: 'Linear Progression', desc: 'Add weight every session, build neural efficiency' },
        { week: 'Month 2–3',  icon: '🔩', title: 'Program Structure',  desc: 'Full LP program, hit 1.5× bodyweight deadlift' },
        { week: 'Month 4–6',  icon: '💥', title: 'Intermediate Lifts', desc: 'Squat BW, bench 0.75× BW, deadlift 2× BW' },
      ],
      intermediate: [
        { week: 'Week 1–2',   icon: '⚙️', title: 'Max Testing',        desc: 'Establish true 1RMs, program design session' },
        { week: 'Month 1',    icon: '🏆', title: 'Texas Method',        desc: 'Volume/intensity split, weekly PRs' },
        { week: 'Month 2–3',  icon: '🔩', title: 'Accessory Work',     desc: 'Target weaknesses, GPP conditioning added' },
        { week: 'Month 4–6',  icon: '💥', title: 'Competition Total',  desc: 'Ready to compete in powerlifting meet' },
      ],
      advanced: [
        { week: 'Week 1–2',   icon: '⚙️', title: 'Peaking Protocol',   desc: 'Competition prep, attempt selection strategy' },
        { week: 'Month 1',    icon: '🏆', title: 'Conjugate Method',    desc: 'ME/DE days, accommodating resistance training' },
        { week: 'Month 2–3',  icon: '🔩', title: 'Peak & Taper',       desc: 'Volume reduction, CNS peaking, carb load' },
        { week: 'Month 4–6',  icon: '💥', title: 'Elite Total',         desc: 'Platform-ready, elite classification lifts' },
      ],
    },
    'athletic': {
      beginner: [
        { week: 'Week 1–2',   icon: '🏃', title: 'Athletic Baseline',  desc: 'Speed, agility, power assessment & benchmarks' },
        { week: 'Month 1',    icon: '⚡', title: 'Movement Patterns',   desc: 'Sprint mechanics, jumping, multi-directional drills' },
        { week: 'Month 2–3',  icon: '🎯', title: 'Sport-Specific Base', desc: 'Conditioning, explosive power development' },
        { week: 'Month 4–6',  icon: '🏅', title: 'Performance Gains',   desc: 'Measurable speed, agility & vertical jump improvements' },
      ],
      intermediate: [
        { week: 'Week 1–2',   icon: '🏃', title: 'Performance Audit',   desc: 'Sport-specific assessment, weak link identification' },
        { week: 'Month 1',    icon: '⚡', title: 'Power Development',    desc: 'Olympic lift variations, plyometric progression' },
        { week: 'Month 2–3',  icon: '🎯', title: 'Sport Integration',    desc: 'On-field application of gym gains' },
        { week: 'Month 4–6',  icon: '🏅', title: 'Elite Performance',    desc: 'Top 10% athleticism in chosen sport metric' },
      ],
      advanced: [
        { week: 'Week 1–2',   icon: '🏃', title: 'Elite Programming',    desc: 'Periodized annual plan, team/sport alignment' },
        { week: 'Month 1',    icon: '⚡', title: 'Specialized Training',  desc: 'Position/event specific drills and protocols' },
        { week: 'Month 2–3',  icon: '🎯', title: 'Competition Block',     desc: 'Competition simulation, taper strategies' },
        { week: 'Month 4–6',  icon: '🏅', title: 'Championship Ready',    desc: 'Professional or elite competition standard met' },
      ],
    },
  },

  // Maps goal × timeline → recommended plan
  planMap: {
    'weight-loss': { '3-months': 'SURGE', '6-months': 'APEX', '12-months': 'LEGEND' },
    'muscle-gain': { '3-months': 'SURGE', '6-months': 'APEX', '12-months': 'LEGEND' },
    'strength':    { '3-months': 'SPARK', '6-months': 'SURGE', '12-months': 'APEX'  },
    'athletic':    { '3-months': 'SURGE', '6-months': 'APEX',  '12-months': 'LEGEND' },
  },

  workoutTypes: {
    'weight-loss': 'HIIT + Metabolic Conditioning + Cardio',
    'muscle-gain': 'Hypertrophy Training + Progressive Overload',
    'strength':    'Powerlifting + Strength Conditioning',
    'athletic':    'Speed & Power + Sport-Specific Training',
  },
};

let simState = { step: 1, level: null, goal: null, timeline: null };

function initFitnessSimulator() {
  const sim = document.getElementById('fitnessSimulator');
  if (!sim) return;

  // Option selection
  sim.querySelectorAll('.sim-option').forEach(opt => {
    opt.addEventListener('click', () => selectSimOption(opt));
  });

  updateSimProgress();
}

function selectSimOption(el) {
  const step = el.closest('.sim-step');
  step.querySelectorAll('.sim-option').forEach(o => o.classList.remove('selected'));
  el.classList.add('selected');

  const key = el.dataset.key;
  const stepNum = parseInt(step.dataset.step);
  if (stepNum === 1) simState.level = key;
  if (stepNum === 2) simState.goal = key;
  if (stepNum === 3) simState.timeline = key;

  // Automatically advance after a brief pause
  setTimeout(() => {
    if (simState.step < 4) {
      simState.step++;
      updateSimProgress();
      showSimStep(simState.step);
    }
    if (simState.step === 4) generateRoadmap();
  }, 300);
}

function simNext() {
  if (simState.step < 4) {
    simState.step++;
    updateSimProgress();
    showSimStep(simState.step);
    if (simState.step === 4) generateRoadmap();
  }
}

function simBack() {
  if (simState.step > 1) {
    simState.step--;
    updateSimProgress();
    showSimStep(simState.step);
  }
}

function simReset() {
  simState = { step: 1, level: null, goal: null, timeline: null };
  document.querySelectorAll('.sim-option').forEach(o => o.classList.remove('selected'));
  updateSimProgress();
  showSimStep(1);
}

function showSimStep(n) {
  document.querySelectorAll('.sim-step').forEach(s => s.classList.remove('active'));
  const target = document.querySelector(`.sim-step[data-step="${n}"]`);
  if (target) target.classList.add('active');
}

function updateSimProgress() {
  document.querySelectorAll('.sim-dot').forEach((dot, i) => {
    dot.classList.remove('done', 'active');
    if (i + 1 < simState.step) dot.classList.add('done');
    else if (i + 1 === simState.step) dot.classList.add('active');
  });
}

function generateRoadmap() {
  const level = simState.level || 'beginner';
  const goal  = simState.goal  || 'weight-loss';
  const time  = simState.timeline || '3-months';

  const milestones = SIMULATOR_DATA.roadmaps[goal]?.[level] || SIMULATOR_DATA.roadmaps['weight-loss'].beginner;
  const plan = SIMULATOR_DATA.planMap[goal]?.[time] || 'SURGE';
  const workout = SIMULATOR_DATA.workoutTypes[goal] || 'Customized Training';

  // Filter milestones based on timeline
  const milestoneCounts = { '3-months': 3, '6-months': 4, '12-months': 4 };
  const count = milestoneCounts[time] || 4;
  const shown = milestones.slice(0, count);

  // Build roadmap HTML
  const trackHTML = shown.map(m => `
    <div class="roadmap-milestone">
      <div class="milestone-dot">${m.icon}</div>
      <div class="milestone-week">${m.week}</div>
      <div class="milestone-title">${m.title}</div>
      <div class="milestone-desc">${m.desc}</div>
    </div>
  `).join('');

  const timeLabels = { '3-months': '3 Months', '6-months': '6 Months', '12-months': '12 Months' };
  const goalLabels = { 'weight-loss': 'Weight Loss', 'muscle-gain': 'Muscle Gain', 'strength': 'Strength', 'athletic': 'Athletic Performance' };
  const levelLabels = { 'beginner': 'Beginner', 'intermediate': 'Intermediate', 'advanced': 'Advanced' };

  const resultHTML = `
    <div class="mb-4">
      <div class="d-flex gap-2 flex-wrap mb-3">
        <span class="filter-tab active">${levelLabels[level]}</span>
        <span class="filter-tab active">${goalLabels[goal]}</span>
        <span class="filter-tab active">${timeLabels[time]}</span>
      </div>
      <div class="mb-2">
        <span class="label-apex">Your Transformation Roadmap</span>
      </div>
      <div class="roadmap-track">${trackHTML}</div>
    </div>
    <div class="row g-3 mb-4">
      <div class="col-md-6">
        <div class="glass-card p-3">
          <div class="label-apex mb-2">Recommended Training</div>
          <div style="font-family:var(--font-heading);font-weight:700;">${workout}</div>
        </div>
      </div>
      <div class="col-md-6">
        <div class="result-plan-badge d-flex align-items-center justify-content-between">
          <div>
            <div class="plan-label">Recommended Plan</div>
            <div class="plan-name">${plan}</div>
          </div>
          <a href="/membership/" class="apex-btn-outline" style="border-color:rgba(255,255,255,0.5);color:#fff;font-size:0.75rem;padding:8px 16px;">View Plan →</a>
        </div>
      </div>
    </div>
    <div class="glass-card p-4">
      <div class="label-apex mb-3">Claim Your Journey — Get a Free Consultation</div>
      <form id="simLeadForm">
        <div class="row g-3">
          <div class="col-md-4">
            <input type="text"  id="simName"  class="apex-input" placeholder="Your Name" required />
          </div>
          <div class="col-md-4">
            <input type="email" id="simEmail" class="apex-input" placeholder="your@email.com" required />
          </div>
          <div class="col-md-4">
            <input type="tel"   id="simPhone" class="apex-input" placeholder="+91 XXXXX XXXXX" />
          </div>
        </div>
        <div class="mt-3 d-flex gap-3 align-items-center flex-wrap">
          <button type="submit" class="apex-btn-primary">
            <i class="bi bi-rocket-takeoff me-2"></i>Start My Journey
          </button>
          <button type="button" class="apex-btn-outline" onclick="simReset()">
            <i class="bi bi-arrow-counterclockwise me-2"></i>Restart
          </button>
          <span id="simMsg" class="text-orange" style="font-family:var(--font-heading);font-size:0.85rem;"></span>
        </div>
      </form>
    </div>
  `;

  const resultEl = document.getElementById('simResult');
  if (resultEl) {
    resultEl.innerHTML = resultHTML;
    document.getElementById('simLeadForm').addEventListener('submit', e => handleSimSubmit(e, plan, level, goal, time));
  }

  // Store recommended plan for form
  simState.plan = plan;
}

function initSimulatorForm() {
  // Delegated — handled in generateRoadmap
}

async function handleSimSubmit(e, plan, level, goal, timeline) {
  e.preventDefault();
  const name  = document.getElementById('simName')?.value?.trim();
  const email = document.getElementById('simEmail')?.value?.trim();
  const phone = document.getElementById('simPhone')?.value?.trim();
  const msg   = document.getElementById('simMsg');

  if (!name || !email) { if (msg) { msg.textContent = 'Please fill in your name and email.'; msg.style.color = '#ff6b6b'; } return; }

  const btn = e.target.querySelector('[type=submit]');
  btn.disabled = true; btn.innerHTML = '<span class="spinner-border spinner-border-sm me-2"></span>Submitting…';

  try {
    const csrfToken = document.cookie.match(/csrftoken=([^;]+)/)?.[1] || '';
    const res = await fetch('/api/simulator/', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'X-CSRFToken': csrfToken },
      body: JSON.stringify({ name, email, phone, fitness_level: level, fitness_goal: goal, timeline, recommended_plan: plan }),
    });
    const data = await res.json();
    if (data.success) {
      if (msg) { msg.textContent = data.message || 'Success! We\'ll be in touch.'; msg.style.color = 'var(--apex-orange)'; }
      btn.innerHTML = '<i class="bi bi-check-circle me-2"></i>Submitted!';
    } else {
      if (msg) { msg.textContent = 'Something went wrong. Please try again.'; msg.style.color = '#ff6b6b'; }
      btn.disabled = false; btn.innerHTML = '<i class="bi bi-rocket-takeoff me-2"></i>Start My Journey';
    }
  } catch {
    if (msg) { msg.textContent = 'Network error. Please try again.'; msg.style.color = '#ff6b6b'; }
    btn.disabled = false; btn.innerHTML = '<i class="bi bi-rocket-takeoff me-2"></i>Start My Journey';
  }
}

// ─── Gallery Filter ──────────────────────────────────────────────────
function initGalleryFilter() {
  const tabs = document.querySelectorAll('.filter-tab[data-filter]');
  const items = document.querySelectorAll('.gallery-item[data-category]');
  if (!tabs.length) return;

  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      tabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');
      const filter = tab.dataset.filter;
      items.forEach(item => {
        const show = filter === 'all' || item.dataset.category === filter;
        item.style.display = show ? 'block' : 'none';
      });
    });
  });
}
