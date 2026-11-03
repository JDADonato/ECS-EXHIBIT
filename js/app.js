/**
 * 4FRONT x Eloquente Catering System (ECS) — Capstone Exhibit Web App
 * Interactive Role Switcher, DSS Mathematical Simulator, and Bottom App Dock
 */

document.addEventListener('DOMContentLoaded', () => {
  initRoleSwitcher();
  initDssSimulator();
  initBottomDockScrollSpy();
  initShareModal();
  initHandoutModal();
  initGadgetScrollReveals();
  initServiceWorker();
});

/* ==========================================================================
   1. Role Switcher Data & Interaction (4-Stage Catering Lifecycle)
   ========================================================================== */
const roleData = {
  client: {
    stageLabel: 'Stage 1 • Customer Intake',
    badge: 'Stage 1 • Customer Intake',
    badgeClass: 'badge-client',
    headline: 'Smart Budget Maximizer & Live Booking',
    description: 'Clients input a target budget to receive an algorithmically optimized 5-course menu with transparent pricing, settle cashless deposits via PayMongo, and track kitchen prep in real time.',
    layman: 'What the client experiences: Clients enter their budget, and the system automatically builds the optimal banquet menu within their price, accepts digital deposits, and shows live prep status.',
    points: [
      '<strong>Smart Budget Maximizer:</strong> 2-pass knapsack algorithm reverse-calculates taxes and surcharges to auto-assemble a complete 5-course banquet fitted to client budgets.',
      '<strong>PayMongo Downpayments:</strong> Settle deposits via GCash, Maya, or cards with instant receipts.',
      '<strong>Live Progress Tracker:</strong> Monitor status from kitchen preparation to banquet serving in real time.'
    ],
    mockScreen: {
      title: 'Client Dashboard',
      chip: 'Event Confirmed',
      chipType: 'success',
      stepKicker: 'Stage 1 Handoff: Customer Booking Milestone',
      nodes: [
        { num: '1', status: 'done', label: 'Inquiry' },
        { num: '2', status: 'done', label: 'Review' },
        { num: '3', status: 'done', label: 'Deposit' },
        { num: '4', status: 'current', label: 'Food Prep' },
        { num: '5', status: '', label: 'Event Day' }
      ],
      details: [
        { label: 'Event Name', val: 'Garcia-Cruz Wedding Reception' },
        { label: 'Confirmed Date', val: 'Dec 18, 2026' },
        { label: 'Budget Maximizer', val: '₱85,000 Target → 5 Courses Optimized' },
        { label: 'Payment Status', val: '₱42,500 Verified (Deposit Settled)' }
      ]
    }
  },
  marketing: {
    stageLabel: 'Stage 2 • Sales Triage & Capacity',
    badge: 'Stage 2 • Sales & Marketing',
    badgeClass: 'badge-marketing',
    headline: 'Inquiry Triage & Calendar Blackouts',
    description: 'Sales coordinators evaluate incoming booking requests, prevent double-booking on peak calendar dates, and automatically dispatch kitchen prep sheets.',
    layman: 'What sales staff do: Review incoming inquiries in one click, block booked dates to prevent conflicts, and hand off instructions to the kitchen.',
    points: [
      '<strong>1-Click Review:</strong> Quickly claim, approve, or adjust incoming catering inquiries.',
      '<strong>Date Capacity Engine:</strong> Block fully booked dates and manage peak December demand.',
      '<strong>Operational Handoff:</strong> Auto-generate crew, equipment, and kitchen prep checklists.'
    ],
    mockScreen: {
      title: 'Marketing Command Center',
      chip: '3 New Inquiries',
      chipType: 'warning',
      stepKicker: 'Stage 2 Coordination: Food Tasting & Blackouts',
      nodes: [
        { num: '1', status: 'done', label: 'Inquiry' },
        { num: '2', status: 'done', label: 'Tasting' },
        { num: '3', status: 'current', label: 'Quote' },
        { num: '4', status: '', label: 'Booking' },
        { num: '5', status: '', label: 'Handoff' }
      ],
      details: [
        { label: 'Pending Review', val: '3 Corporate Banquets' },
        { label: 'Dec 2026 Availability', val: '80% Booked (High Demand)' },
        { label: 'Next Tasting Slot', val: 'Saturday, 2:00 PM' },
        { label: 'Assisted Quotes', val: '5 Active Quotations' }
      ]
    }
  },
  accounting: {
    stageLabel: 'Stage 3 • Financial Settlement',
    badge: 'Stage 3 • Finance & Billing',
    badgeClass: 'badge-accounting',
    headline: 'Automated Payment Reconciliation',
    description: 'Finance officers track verified PayMongo payment settlement, overdue balance notices, surcharge adjustments, and fiscal ledger exports without manual bank checking.',
    layman: 'What finance staff do: Replaces checking bank slips by hand. Digital payments verify automatically, updating cash records in seconds.',
    points: [
      '<strong>Automated Webhooks:</strong> Immediate verification for GCash, Maya, and card payments.',
      '<strong>Balance Tracking:</strong> Automatic notifications for clients with pending milestone balances.',
      '<strong>Official PDF Receipts:</strong> One-click generation of BIR-compliant catering invoices.'
    ],
    mockScreen: {
      title: 'Finance Ledger & Cashflow',
      chip: 'Reconciliation OK',
      chipType: 'success',
      stepKicker: 'Stage 3 Settlement: Webhooks & BIR Ledger',
      nodes: [
        { num: '1', status: 'done', label: 'Deposit' },
        { num: '2', status: 'done', label: 'Verified' },
        { num: '3', status: 'current', label: 'Balance' },
        { num: '4', status: '', label: 'Receipt' },
        { num: '5', status: '', label: 'Ledger' }
      ],
      details: [
        { label: 'Verified Collections', val: '₱438,500 This Month' },
        { label: 'PayMongo Gateway', val: 'Active (Zero Failed Webhooks)' },
        { label: 'Pending Clearances', val: '1 Bank Transfer Verification' },
        { label: 'Refund Requests', val: '0 Open Dispute Cases' }
      ]
    }
  },
  admin: {
    stageLabel: 'Stage 4 • Executive Intelligence & DSS',
    badge: 'Stage 4 • Admin & Governance',
    badgeClass: 'badge-admin',
    headline: 'Predictive Analytics & Master Controls',
    description: 'Management reviews forecasting models for monthly revenue and guest turnout, updates holiday surcharges, and inspects tamper-proof audit trails.',
    layman: 'What executive managers see: Forecast future sales, adjust seasonal rates in seconds, and maintain complete audit logs.',
    points: [
      '<strong>Predictive DSS Models:</strong> Forecast monthly revenue (Linear Regression) and guest headcount (Moving Average).',
      '<strong>Live Rule Engine:</strong> Adjust package rates, minimum guest limits, and December surcharges from the dashboard.',
      '<strong>Tamper-Proof Audit Trail:</strong> Records operator IDs, device IPs, and timestamps for every transaction.'
    ],
    mockScreen: {
      title: 'Admin Intelligence Portal',
      chip: 'System Healthy',
      chipType: 'success',
      stepKicker: 'Stage 4 Intelligence: Mathematical DSS & Governance',
      nodes: [
        { num: '1', status: 'done', label: 'RBAC' },
        { num: '2', status: 'done', label: 'Audit Log' },
        { num: '3', status: 'current', label: 'DSS Math' },
        { num: '4', status: '', label: 'Rule Engine' },
        { num: '5', status: '', label: 'Live' }
      ],
      details: [
        { label: 'Revenue Forecast (SLR)', val: '₱582,000 (R² = 0.89)' },
        { label: 'Pax Demand (SMA)', val: '1,420 Guests Next Month' },
        { label: 'Active User Accounts', val: '4 Staff | 240+ Registered Clients' },
        { label: 'Audit Trail Records', val: '1,280 Logged System Events' }
      ]
    }
  }
};

function initRoleSwitcher() {
  const cards = document.querySelectorAll('.role-matrix-card, .role-tab-btn');
  const badgeEl = document.getElementById('roleBadge');
  const headlineEl = document.getElementById('roleHeadline');
  const descEl = document.getElementById('roleDesc');
  const pointsListEl = document.getElementById('rolePointsList');
  
  // Tour Navigation elements
  const btnPrev = document.getElementById('btnPrevRole');
  const btnNext = document.getElementById('btnNextRole');
  const tourCounterEl = document.getElementById('tourRoleCounter');
  const tourNameEl = document.getElementById('tourRoleName');
  const roleKeys = ['client', 'marketing', 'accounting', 'admin'];
  let currentRoleIdx = 0;

  // Mockup elements
  const mockTitleEl = document.getElementById('mockScreenTitle');
  const mockChipEl = document.getElementById('mockScreenChip');
  const mockKickerEl = document.getElementById('mockStepKicker');
  const mockTimelineEl = document.getElementById('mockTimeline');
  const mockDataTableEl = document.getElementById('mockDataTable');

  if (!cards.length) return;

  function setRole(roleKey) {
    const data = roleData[roleKey];
    if (!data) return;

    currentRoleIdx = roleKeys.indexOf(roleKey);

    // Update active state on cards
    cards.forEach(c => {
      const isMatch = c.dataset.role === roleKey;
      c.classList.toggle('active', isMatch);
      c.setAttribute('aria-selected', isMatch ? 'true' : 'false');
    });

    // Update text
    if (badgeEl) {
      badgeEl.className = `role-badge ${data.badgeClass}`;
      badgeEl.textContent = data.badge;
    }
    if (headlineEl) headlineEl.textContent = data.headline;
    if (descEl) descEl.textContent = data.description;

    // Update points list
    if (pointsListEl) {
      pointsListEl.innerHTML = data.points.map(point => `
        <li class="role-point-item">
          <svg class="role-point-icon" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
            <polyline points="20 6 9 17 4 12"></polyline>
          </svg>
          <span>${point}</span>
        </li>
      `).join('');
    }

    // Update tour status
    if (tourCounterEl) tourCounterEl.textContent = `Stage ${currentRoleIdx + 1} of 4`;
    if (tourNameEl) tourNameEl.textContent = data.stageLabel || data.badge;
    if (btnPrev) btnPrev.disabled = (currentRoleIdx === 0);
    if (btnNext) btnNext.disabled = (currentRoleIdx === roleKeys.length - 1);

    // Update Mock Screen
    if (mockTitleEl) mockTitleEl.textContent = data.mockScreen.title;
    if (mockChipEl) mockChipEl.textContent = data.mockScreen.chip;
    if (mockKickerEl) mockKickerEl.textContent = data.mockScreen.stepKicker;

    if (mockTimelineEl) {
      mockTimelineEl.innerHTML = data.mockScreen.nodes.map(node => `
        <div class="mock-step-col">
          <div class="mock-node ${node.status}">${node.num}</div>
          <span class="mock-node-lbl">${node.label}</span>
        </div>
      `).join('');
    }

    if (mockDataTableEl) {
      mockDataTableEl.innerHTML = data.mockScreen.details.map(d => `
        <div class="mock-data-row">
          <span>${d.label}</span>
          <strong>${d.val}</strong>
        </div>
      `).join('');
    }
  }

  cards.forEach(card => {
    card.addEventListener('click', (e) => {
      e.preventDefault();
      const roleKey = card.dataset.role;
      setRole(roleKey);
    });
  });

  if (btnPrev) {
    btnPrev.addEventListener('click', () => {
      if (currentRoleIdx > 0) {
        setRole(roleKeys[currentRoleIdx - 1]);
      }
    });
  }

  if (btnNext) {
    btnNext.addEventListener('click', () => {
      if (currentRoleIdx < roleKeys.length - 1) {
        setRole(roleKeys[currentRoleIdx + 1]);
      }
    });
  }

  // Initialize first role state
  setRole('client');

  // Expose for external navigation or keyboard shortcuts
  window.setExhibitRole = setRole;
}

/* ==========================================================================
   2. Decision Support System (DSS) Simulator
   ========================================================================== */
function initDssSimulator() {
  const modelTabs = document.querySelectorAll('.dss-model-card, .dss-tab-btn, .dss-model-tab');
  const horizonSlider = document.getElementById('dssHorizonSlider');
  const horizonValBadge = document.getElementById('dssHorizonVal');
  const horizonLabelEl = document.getElementById('dssHorizonLabel');
  const horizonHintEl = document.getElementById('dssHorizonHint');
  const horizonMinEl = document.getElementById('dssHorizonMin');
  const horizonMaxEl = document.getElementById('dssHorizonMax');

  const baselineSlider = document.getElementById('dssBaselineSlider');
  const baselineValBadge = document.getElementById('dssBaselineVal');
  const baselineLabelEl = document.getElementById('dssBaselineLabel');
  const baselineHintEl = document.getElementById('dssBaselineHint');
  const scaleMinEl = document.getElementById('dssScaleMin');
  const scaleMaxEl = document.getElementById('dssScaleMax');
  
  const presetBtns = document.querySelectorAll('.dss-preset-btn');
  
  const outputHeadingEl = document.getElementById('dssOutputHeading');
  const projectedValEl = document.getElementById('dssProjectedVal');
  const outputLabelEl = document.getElementById('dssOutputLabel');
  const formulaChipEl = document.getElementById('dssFormulaChip');
  const meaningNoteEl = document.getElementById('dssMeaningNote');
  const growthDeltaEl = document.getElementById('dssGrowthDelta');
  const growthDeltaPctEl = document.getElementById('dssGrowthDeltaPct');
  const capacityTargetEl = document.getElementById('dssCapacityTarget');
  const actionNoteEl = document.getElementById('dssActionNote');
  const menuDisplayEl = document.getElementById('dssMenuDisplay');

  const metricNum1 = document.getElementById('dssMetric1');
  const metricSub1 = document.getElementById('dssMetricSub1');
  const metricNum2 = document.getElementById('dssMetric2');
  const metricSub2 = document.getElementById('dssMetricSub2');
  const metricNum3 = document.getElementById('dssMetric3');
  const metricSub3 = document.getElementById('dssMetricSub3');

  let activeModel = 'slr'; // 'slr', 'sma', or 'budget'
  let activePreset = 'steady';

  // Genuine Eloquente Catering Culinary Catalog (From DatabaseSeeder)
  const CATERING_DISH_CATALOG = {
    starter: [
      { id: 's1', name: 'Garden Fresh Salad', cost: 40, tier: 'Classic' },
      { id: 's2', name: 'Lumpiang Shanghai Bites', cost: 55, tier: 'Popular' },
      { id: 's3', name: 'Smoked Chicken Tartlets', cost: 70, tier: 'Specialty' },
      { id: 's4', name: 'Honey Beef Pita Canapes', cost: 90, tier: 'Premium' },
      { id: 's5', name: 'Shrimp Cocktail Cups', cost: 110, tier: 'Gourmet' }
    ],
    main: [
      { id: 'm1', name: 'Herb Roasted Chicken', cost: 110, tier: 'Classic' },
      { id: 'm2', name: 'Pork Medallions w/ Gravy', cost: 130, tier: 'Classic' },
      { id: 'm3', name: 'Beef Sirloin Thick Mushroom', cost: 170, tier: 'Popular' },
      { id: 'm4', name: 'Baked Salmon Florentine', cost: 200, tier: 'Signature' },
      { id: 'm5', name: 'Roast Beef Tenderloin Steak', cost: 250, tier: 'Gourmet' }
    ],
    side: [
      { id: 'd1', name: 'Garlic Butter Steamed Rice', cost: 35, tier: 'Classic' },
      { id: 'd2', name: 'Herbed Mashed Potato', cost: 45, tier: 'Popular' },
      { id: 'd3', name: 'Buttered Garden Vegetables', cost: 50, tier: 'Popular' },
      { id: 'd4', name: 'Creamy Potato Gratin', cost: 65, tier: 'Signature' }
    ],
    dessert: [
      { id: 'e1', name: 'Pandan Jelly w/ Nata', cost: 30, tier: 'Classic' },
      { id: 'e2', name: 'Mango Panna Cotta Cups', cost: 45, tier: 'Popular' },
      { id: 'e3', name: 'Mini Blueberry Cheesecake', cost: 55, tier: 'Signature' },
      { id: 'e4', name: 'Belgian Chocolate Mousse', cost: 65, tier: 'Gourmet' }
    ],
    drink: [
      { id: 'k1', name: 'Calamansi Cooler', cost: 25, tier: 'Classic' },
      { id: 'k2', name: 'Cucumber Lemonade', cost: 30, tier: 'Popular' },
      { id: 'k3', name: 'House Blend Iced Tea (Refillable)', cost: 35, tier: 'Signature' },
      { id: 'k4', name: 'Four Seasons Punch Bar', cost: 45, tier: 'Premium' }
    ]
  };

  // Real 2-Pass Knapsack Constraint Optimization Algorithm (from MenuBuilder.jsx)
  function runBudgetMaximizer(targetBudget, pax) {
    const feeMultiplier = 1.22; // 12% VAT + 10% Service Charge
    const minFoodPerHead = 40 + 110 + 35 + 30 + 25; // 240
    const minRequiredGross = Math.ceil(minFoodPerHead * pax * feeMultiplier);

    if (targetBudget < minRequiredGross) {
      return {
        success: false,
        pax,
        targetBudget,
        minRequiredGross,
        shortfall: minRequiredGross - targetBudget
      };
    }

    const netFoodBudget = Math.floor(targetBudget / feeMultiplier);

    // Pass 1: Select base viable dish in every category (Feasibility Guarantee)
    const selectedDishes = {
      starter: CATERING_DISH_CATALOG.starter[0],
      main: CATERING_DISH_CATALOG.main[0],
      side: CATERING_DISH_CATALOG.side[0],
      dessert: CATERING_DISH_CATALOG.dessert[0],
      drink: CATERING_DISH_CATALOG.drink[0]
    };

    let currentFoodPerHead = Object.values(selectedDishes).reduce((sum, d) => sum + d.cost, 0);

    // Pass 2: Greedily upgrade dishes to highest tier that fits in remaining food allowance
    const upgradeOrder = ['main', 'starter', 'dessert', 'side', 'drink'];
    let improved = true;

    while (improved) {
      improved = false;
      for (const cat of upgradeOrder) {
        const currentDish = selectedDishes[cat];
        const catalog = CATERING_DISH_CATALOG[cat];
        const currentIdx = catalog.findIndex(d => d.id === currentDish.id);
        
        for (let nextIdx = catalog.length - 1; nextIdx > currentIdx; nextIdx--) {
          const candidate = catalog[nextIdx];
          const costDiffPerHead = candidate.cost - currentDish.cost;
          const newTotalFoodCost = (currentFoodPerHead + costDiffPerHead) * pax;
          
          if (newTotalFoodCost <= netFoodBudget) {
            selectedDishes[cat] = candidate;
            currentFoodPerHead += costDiffPerHead;
            improved = true;
            break;
          }
        }
      }
    }

    const totalFoodCost = currentFoodPerHead * pax;
    const vatFee = Math.round(totalFoodCost * 0.12);
    const serviceFee = Math.round(totalFoodCost * 0.10);
    const finalQuote = totalFoodCost + vatFee + serviceFee;
    const varianceBuffer = targetBudget - finalQuote;
    const utilizationPct = ((finalQuote / targetBudget) * 100).toFixed(1);

    return {
      success: true,
      pax,
      targetBudget,
      netFoodBudget,
      perHeadAllowance: currentFoodPerHead,
      totalFoodCost,
      vatFee,
      serviceFee,
      finalQuote,
      varianceBuffer,
      utilizationPct,
      selectedDishes
    };
  }

  const presetConfigs = {
    lean: {
      slr: { horizon: 1, baseline: 300000 },
      sma: { horizon: 1, baseline: 650 },
      budget: { horizon: 50, baseline: 45000 }
    },
    steady: {
      slr: { horizon: 3, baseline: 450000 },
      sma: { horizon: 3, baseline: 1200 },
      budget: { horizon: 100, baseline: 85000 }
    },
    peak: {
      slr: { horizon: 6, baseline: 750000 },
      sma: { horizon: 6, baseline: 2400 },
      budget: { horizon: 180, baseline: 150000 }
    }
  };

  function updateSliderFill(slider) {
    if (!slider) return;
    const min = parseFloat(slider.min) || 0;
    const max = parseFloat(slider.max) || 100;
    const val = parseFloat(slider.value) || 0;
    const pct = Math.max(0, Math.min(100, ((val - min) / (max - min)) * 100));
    slider.style.background = `linear-gradient(to right, var(--ecs-red) 0%, var(--ecs-red) ${pct}%, #e2e8f0 ${pct}%, #e2e8f0 100%)`;
  }

  function applyPreset(presetKey) {
    if (!presetConfigs[presetKey]) return;
    activePreset = presetKey;
    const cfg = presetConfigs[presetKey][activeModel];
    if (horizonSlider) horizonSlider.value = cfg.horizon;
    if (baselineSlider) baselineSlider.value = cfg.baseline;
    
    presetBtns.forEach(btn => {
      btn.classList.toggle('active', btn.dataset.preset === presetKey);
    });

    updateCalculations();
  }

  function updateCalculations() {
    const horizon = parseInt(horizonSlider.value, 10);
    const baseline = parseInt(baselineSlider.value, 10);

    if (activeModel === 'slr') {
      if (menuDisplayEl) menuDisplayEl.style.display = 'none';
      horizonValBadge.textContent = `+${horizon} ${horizon === 1 ? 'Month' : 'Months'}`;
      baselineValBadge.textContent = `₱${baseline.toLocaleString()}`;
      baselineLabelEl.textContent = 'Baseline Monthly Revenue (X₀)';
      if (baselineHintEl) baselineHintEl.textContent = 'Average verified monthly revenue';
      if (scaleMinEl) scaleMinEl.textContent = '₱250,000';
      if (scaleMaxEl) scaleMaxEl.textContent = '₱850,000';
      if (outputHeadingEl) outputHeadingEl.textContent = 'Sales Revenue Projection';
      outputLabelEl.textContent = `Projected Revenue for Month +${horizon}`;
      
      // SLR Formula: Y = a + b * X
      const slope = 38500;
      const projectedRevenue = Math.round(baseline + (slope * horizon));
      const delta = projectedRevenue - baseline;
      const pct = ((delta / baseline) * 100).toFixed(1);

      projectedValEl.textContent = `₱${projectedRevenue.toLocaleString()}`;
      formulaChipEl.textContent = `Y = ₱${baseline.toLocaleString()} + (₱${slope.toLocaleString()} × ${horizon})`;
      if (meaningNoteEl) {
        meaningNoteEl.textContent = `In Month +${horizon}, expected catering sales are ₱${projectedRevenue.toLocaleString()} based on historical baseline growth.`;
      }

      if (growthDeltaEl) growthDeltaEl.textContent = `+₱${delta.toLocaleString()}`;
      if (growthDeltaPctEl) growthDeltaPctEl.textContent = `+${pct}% from baseline`;
      const banquets = Math.max(1, Math.round(projectedRevenue / 42000));
      if (capacityTargetEl) capacityTargetEl.textContent = `${banquets} Banquets`;
      if (actionNoteEl) actionNoteEl.textContent = `Action: Procure kitchen bulk stock and allocate chef staffing for Month +${horizon}.`;

      metricNum1.textContent = '₱14,250';
      metricSub1.textContent = 'RMSE Error';
      metricNum2.textContent = '₱11,800';
      metricSub2.textContent = 'MAE Error';
      metricNum3.textContent = '0.892';
      metricSub3.textContent = 'R² Score (Good Fit)';
    } else if (activeModel === 'sma') {
      // SMA Model
      if (menuDisplayEl) menuDisplayEl.style.display = 'none';
      horizonValBadge.textContent = `+${horizon} ${horizon === 1 ? 'Month' : 'Months'}`;
      baselineValBadge.textContent = `${baseline.toLocaleString()} Pax`;
      baselineLabelEl.textContent = 'Recent Average Monthly Guest Pax';
      if (baselineHintEl) baselineHintEl.textContent = 'Average catering guests served per month';
      if (scaleMinEl) scaleMinEl.textContent = '500 Pax';
      if (scaleMaxEl) scaleMaxEl.textContent = '3,000 Pax';
      if (outputHeadingEl) outputHeadingEl.textContent = 'Guest Headcount Projection';
      outputLabelEl.textContent = `Estimated Demand Window (${horizon}-Month Rolling)`;

      // Simple Moving Average adjustment with seasonal smoothing
      const seasonalWeights = [1.02, 1.05, 1.12, 1.18, 1.25, 1.35];
      const factor = seasonalWeights[Math.min(horizon - 1, seasonalWeights.length - 1)];
      const projectedPax = Math.round(baseline * factor);
      const delta = projectedPax - baseline;
      const pct = ((delta / baseline) * 100).toFixed(1);

      projectedValEl.textContent = `${projectedPax.toLocaleString()} Pax`;
      formulaChipEl.textContent = `SMA = (Σ Monthly Guests) / ${horizon} window`;
      if (meaningNoteEl) {
        meaningNoteEl.textContent = `In Month +${horizon}, expected guest headcount is ${projectedPax.toLocaleString()} pax based on a ${horizon}-month rolling average.`;
      }

      if (growthDeltaEl) growthDeltaEl.textContent = `+${delta.toLocaleString()} Pax`;
      if (growthDeltaPctEl) growthDeltaPctEl.textContent = `+${pct}% seasonal surge`;
      const crew = Math.max(1, Math.round(projectedPax / 65));
      if (capacityTargetEl) capacityTargetEl.textContent = `${crew} Service Crew`;
      if (actionNoteEl) actionNoteEl.textContent = `Action: Schedule buffet banquet servers and reserve staging equipment for Month +${horizon}.`;

      metricNum1.textContent = '48.2 Pax';
      metricSub1.textContent = 'RMSE Error';
      metricNum2.textContent = '36.5 Pax';
      metricSub2.textContent = 'MAE Error';
      metricNum3.textContent = '3-Month';
      metricSub3.textContent = 'Optimized Window';
    } else {
      // Smart Budget Maximizer Model (Customer Decision Support System)
      if (menuDisplayEl) menuDisplayEl.style.display = 'block';
      const pax = horizon;
      const targetBudget = baseline;
      horizonValBadge.textContent = `${pax} Pax`;
      baselineValBadge.textContent = `₱${targetBudget.toLocaleString()}`;

      if (outputHeadingEl) outputHeadingEl.textContent = 'Smart Budget Maximizer (Customer DSS)';
      outputLabelEl.textContent = 'Optimized 5-Course Menu Allocation';

      const result = runBudgetMaximizer(targetBudget, pax);

      if (result.success) {
        projectedValEl.textContent = `₱${result.finalQuote.toLocaleString()}`;
        formulaChipEl.textContent = `Food: ₱${result.totalFoodCost.toLocaleString()} (₱${result.perHeadAllowance}/pax) + VAT (12%) + Svc (10%)`;
        
        if (meaningNoteEl) {
          meaningNoteEl.textContent = `For ${pax} guests, the 2-pass knapsack algorithm generated a complete 5-course banquet spread utilizing ${result.utilizationPct}% of the ₱${targetBudget.toLocaleString()} budget with zero overrun risk.`;
        }

        if (growthDeltaEl) growthDeltaEl.textContent = `${result.utilizationPct}% Fit`;
        if (growthDeltaPctEl) growthDeltaPctEl.textContent = `₱${result.varianceBuffer.toLocaleString()} buffer remaining`;
        if (capacityTargetEl) capacityTargetEl.textContent = '5 Courses';
        if (actionNoteEl) actionNoteEl.textContent = 'Knapsack Pass 1 & 2 verified: Full 5-course banquet spread guaranteed without exceeding budget.';

        metricNum1.textContent = '100%';
        metricSub1.textContent = 'Course Feasibility';
        metricNum2.textContent = `${result.utilizationPct}%`;
        metricSub2.textContent = 'Budget Fit Rate';
        metricNum3.textContent = '₱0';
        metricSub3.textContent = 'Overrun Risk';

        if (menuDisplayEl) {
          menuDisplayEl.innerHTML = `
            <div class="dss-menu-header">
              <span class="dss-menu-title">Algorithmically Assembled 5-Course Spread:</span>
              <span class="dss-menu-pax-tag">${pax} Guests &bull; ₱${result.perHeadAllowance}/pax</span>
            </div>
            <div class="dss-menu-grid">
              <div class="dss-course-chip">
                <span class="course-cat">🥗 Starter</span>
                <span class="course-name">${result.selectedDishes.starter.name}</span>
                <span class="course-cost">₱${result.selectedDishes.starter.cost}/head</span>
              </div>
              <div class="dss-course-chip highlight">
                <span class="course-cat">🥩 Main Course</span>
                <span class="course-name">${result.selectedDishes.main.name}</span>
                <span class="course-cost">₱${result.selectedDishes.main.cost}/head</span>
              </div>
              <div class="dss-course-chip">
                <span class="course-cat">🥔 Side Dish</span>
                <span class="course-name">${result.selectedDishes.side.name}</span>
                <span class="course-cost">₱${result.selectedDishes.side.cost}/head</span>
              </div>
              <div class="dss-course-chip">
                <span class="course-cat">🍮 Dessert</span>
                <span class="course-name">${result.selectedDishes.dessert.name}</span>
                <span class="course-cost">₱${result.selectedDishes.dessert.cost}/head</span>
              </div>
              <div class="dss-course-chip">
                <span class="course-cat">🍹 Drink</span>
                <span class="course-name">${result.selectedDishes.drink.name}</span>
                <span class="course-cost">₱${result.selectedDishes.drink.cost}/head</span>
              </div>
            </div>
          `;
        }
      } else {
        projectedValEl.textContent = `₱${result.minRequiredGross.toLocaleString()}`;
        formulaChipEl.textContent = `Minimum 5-Course Meal: ₱${result.minRequiredGross.toLocaleString()}`;
        
        if (meaningNoteEl) {
          meaningNoteEl.textContent = `Constraint Notice: The ₱${targetBudget.toLocaleString()} budget is below the minimum viable cost to feed ${pax} guests a complete 5-course meal.`;
        }

        if (growthDeltaEl) growthDeltaEl.textContent = `-₱${result.shortfall.toLocaleString()}`;
        if (growthDeltaPctEl) growthDeltaPctEl.textContent = 'Budget shortfall';
        if (capacityTargetEl) capacityTargetEl.textContent = 'Incomplete';
        if (actionNoteEl) actionNoteEl.textContent = `Constraint alert: Minimum budget needed is ₱${result.minRequiredGross.toLocaleString()}. Increase budget or reduce guest count.`;

        metricNum1.textContent = '0%';
        metricSub1.textContent = 'Course Feasibility';
        metricNum2.textContent = 'Shortfall';
        metricSub2.textContent = 'Budget Deficit';
        metricNum3.textContent = `₱${result.shortfall.toLocaleString()}`;
        metricSub3.textContent = 'Funds Needed';

        if (menuDisplayEl) {
          menuDisplayEl.innerHTML = `
            <div class="dss-budget-warning">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/><line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg>
              <div>
                <strong>Constraint Notice:</strong> For <strong>${pax} guests</strong>, a complete 5-course banquet starts at <strong>₱${result.minRequiredGross.toLocaleString()}</strong>. Increase budget or reduce guest headcount to generate valid dishes.
              </div>
            </div>
          `;
        }
      }
    }

    updateSliderFill(horizonSlider);
    updateSliderFill(baselineSlider);
    updateAccuracyTable();
  }

  function setModel(modelKey) {
    activeModel = modelKey;
    modelTabs.forEach(t => {
      const isMatch = t.dataset.model === modelKey;
      t.classList.toggle('active', isMatch);
      t.setAttribute('aria-selected', isMatch ? 'true' : 'false');
    });

    if (activeModel === 'slr') {
      horizonSlider.min = 1;
      horizonSlider.max = 6;
      horizonSlider.step = 1;
      if (horizonLabelEl) horizonLabelEl.textContent = 'Forecast Horizon';
      if (horizonHintEl) horizonHintEl.textContent = 'Months ahead into future cycles';
      if (horizonMinEl) horizonMinEl.textContent = '+1 Mo (Near-term)';
      if (horizonMaxEl) horizonMaxEl.textContent = '+6 Mo (Long-term)';

      baselineSlider.min = 250000;
      baselineSlider.max = 850000;
      baselineSlider.step = 25000;
      baselineLabelEl.textContent = 'Baseline Monthly Revenue (X₀)';
      if (baselineHintEl) baselineHintEl.textContent = 'Average verified monthly revenue';
      if (scaleMinEl) scaleMinEl.textContent = '₱250,000';
      if (scaleMaxEl) scaleMaxEl.textContent = '₱850,000';
    } else if (activeModel === 'sma') {
      horizonSlider.min = 1;
      horizonSlider.max = 6;
      horizonSlider.step = 1;
      if (horizonLabelEl) horizonLabelEl.textContent = 'Demand Moving Window';
      if (horizonHintEl) horizonHintEl.textContent = 'Rolling historical months averaged';
      if (horizonMinEl) horizonMinEl.textContent = '1-Month Window';
      if (horizonMaxEl) horizonMaxEl.textContent = '6-Month Window';

      baselineSlider.min = 500;
      baselineSlider.max = 3000;
      baselineSlider.step = 50;
      baselineLabelEl.textContent = 'Recent Average Monthly Guest Pax';
      if (baselineHintEl) baselineHintEl.textContent = 'Average catering guests served per month';
      if (scaleMinEl) scaleMinEl.textContent = '500 Pax';
      if (scaleMaxEl) scaleMaxEl.textContent = '3,000 Pax';
    } else {
      // Smart Budget Maximizer
      horizonSlider.min = 30;
      horizonSlider.max = 250;
      horizonSlider.step = 5;
      if (horizonLabelEl) horizonLabelEl.textContent = 'Event Guest Headcount';
      if (horizonHintEl) horizonHintEl.textContent = 'Total attendees requiring catering';
      if (horizonMinEl) horizonMinEl.textContent = '30 Pax (Intimate)';
      if (horizonMaxEl) horizonMaxEl.textContent = '250 Pax (Banquet)';

      baselineSlider.min = 35000;
      baselineSlider.max = 250000;
      baselineSlider.step = 5000;
      baselineLabelEl.textContent = 'Target Client Budget';
      if (baselineHintEl) baselineHintEl.textContent = 'Maximum customer financial limit';
      if (scaleMinEl) scaleMinEl.textContent = '₱35,000';
      if (scaleMaxEl) scaleMaxEl.textContent = '₱250,000';
    }

    // Dynamic preset button labels for Budget vs Forecasting models
    presetBtns.forEach(btn => {
      const p = btn.dataset.preset;
      const full = btn.querySelector('.preset-full');
      const short = btn.querySelector('.preset-short');
      if (activeModel === 'budget') {
        if (p === 'lean') { if (full) full.textContent = 'Intimate (50 Pax)'; if (short) short.textContent = 'Intimate (50p)'; }
        if (p === 'steady') { if (full) full.textContent = 'Standard (100 Pax)'; if (short) short.textContent = 'Standard (100p)'; }
        if (p === 'peak') { if (full) full.textContent = 'Grand (180 Pax)'; if (short) short.textContent = 'Grand (180p)'; }
      } else {
        if (p === 'lean') { if (full) full.textContent = 'Lean Season (+1 Mo)'; if (short) short.textContent = 'Lean (+1M)'; }
        if (p === 'steady') { if (full) full.textContent = 'Steady Baseline (+3 Mo)'; if (short) short.textContent = 'Steady (+3M)'; }
        if (p === 'peak') { if (full) full.textContent = 'December Peak (+6 Mo)'; if (short) short.textContent = 'Peak (+6M)'; }
      }
    });

    // Apply active preset values for this model
    const cfg = presetConfigs[activePreset][activeModel];
    horizonSlider.value = cfg.horizon;
    baselineSlider.value = cfg.baseline;

    updateAccuracyTable();
    updateCalculations();
  }

  modelTabs.forEach(tab => {
    tab.addEventListener('click', (e) => {
      e.preventDefault();
      const targetModel = tab.dataset.model || 'slr';
      setModel(targetModel);
    });
  });

  presetBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      applyPreset(btn.dataset.preset);
    });
  });

  if (horizonSlider) {
    horizonSlider.addEventListener('input', () => {
      // Clear preset button highlight on manual tweak
      presetBtns.forEach(b => b.classList.remove('active'));
      updateCalculations();
    });
  }

  if (baselineSlider) {
    baselineSlider.addEventListener('input', () => {
      // Clear preset button highlight on manual tweak
      presetBtns.forEach(b => b.classList.remove('active'));
      updateCalculations();
    });
  }

  // Keyboard Navigation for Presenters & Judges
  document.addEventListener('keydown', (e) => {
    const activeEl = document.activeElement;
    if (activeEl && (activeEl.tagName === 'INPUT' || activeEl.tagName === 'TEXTAREA') && activeEl.type !== 'range') {
      return;
    }

    const key = e.key.toLowerCase();
    if (['1', '2', '3', '4'].includes(key)) {
      const roleKeys = ['client', 'marketing', 'accounting', 'admin'];
      const targetRole = roleKeys[parseInt(key, 10) - 1];
      if (window.setExhibitRole) window.setExhibitRole(targetRole);
    } else if (key === 'r') {
      setModel('slr');
    } else if (key === 'm') {
      setModel('sma');
    } else if (key === 'b') {
      setModel('budget');
    } else if (key === 'p') {
      const presets = ['lean', 'steady', 'peak'];
      const nextIdx = (presets.indexOf(activePreset) + 1) % presets.length;
      applyPreset(presets[nextIdx]);
    } else if (key === 'h') {
      const handoutModal = document.getElementById('handoutModal');
      if (handoutModal) {
        const isOpen = handoutModal.classList.contains('open');
        handoutModal.classList.toggle('open', !isOpen);
        document.body.style.overflow = isOpen ? '' : 'hidden';
      }
    } else if (key === 'q') {
      const shareModal = document.getElementById('shareModal');
      if (shareModal) {
        const isOpen = shareModal.classList.contains('open');
        if (isOpen) {
          shareModal.classList.remove('open');
          document.body.style.overflow = '';
        } else {
          const shareBtn = document.getElementById('btnHeaderShare');
          if (shareBtn) shareBtn.click();
        }
      }
    }
  });

  // Expose model switchers & controls
  window.setDssModel = setModel;
  window.setDssPreset = applyPreset;
  window.resetDss = resetSimulator;

  const resetBtn = document.getElementById('dssResetBtn');
  const accuracyTableHead = document.getElementById('dssTableHeadModel');
  const accuracyTableBody = document.getElementById('dssAccuracyTableBody');

  function updateAccuracyTable() {
    if (!accuracyTableHead || !accuracyTableBody) return;
    if (activeModel === 'slr') {
      accuracyTableHead.textContent = 'SLR Prediction';
      accuracyTableBody.innerHTML = `
        <tr>
          <td>Month -2 (Oct)</td>
          <td>₱382,000</td>
          <td>₱388,500</td>
          <td class="text-success">+1.7%</td>
        </tr>
        <tr>
          <td>Month -1 (Nov)</td>
          <td>₱415,000</td>
          <td>₱427,000</td>
          <td class="text-success">+2.8%</td>
        </tr>
        <tr class="row-baseline">
          <td>Baseline (Dec)</td>
          <td>₱450,000</td>
          <td>₱450,000</td>
          <td><span class="tag-baseline">0.0% (Base)</span></td>
        </tr>
      `;
    } else if (activeModel === 'sma') {
      accuracyTableHead.textContent = 'SMA Prediction';
      accuracyTableBody.innerHTML = `
        <tr>
          <td>Month -2 (Oct)</td>
          <td>1,120 Pax</td>
          <td>1,142 Pax</td>
          <td class="text-success">+1.9%</td>
        </tr>
        <tr>
          <td>Month -1 (Nov)</td>
          <td>1,210 Pax</td>
          <td>1,250 Pax</td>
          <td class="text-success">+3.3%</td>
        </tr>
        <tr class="row-baseline">
          <td>Baseline (Dec)</td>
          <td>1,200 Pax</td>
          <td>1,200 Pax</td>
          <td><span class="tag-baseline">0.0% (Base)</span></td>
        </tr>
      `;
    } else {
      const pax = parseInt(horizonSlider.value, 10);
      const targetBudget = parseInt(baselineSlider.value, 10);
      const result = runBudgetMaximizer(targetBudget, pax);

      if (result.success) {
        accuracyTableHead.textContent = 'Algorithm Breakdown';
        accuracyTableBody.innerHTML = `
          <tr>
            <td>1. Target Gross Budget</td>
            <td>₱${result.targetBudget.toLocaleString()}</td>
            <td>Client Financial Upper Bound</td>
            <td><span class="tag-baseline">100% Limit</span></td>
          </tr>
          <tr>
            <td>2. Mandatory Taxes &amp; Fees</td>
            <td>-₱${(result.vatFee + result.serviceFee).toLocaleString()}</td>
            <td>12% VAT (₱${result.vatFee.toLocaleString()}) + 10% Svc (₱${result.serviceFee.toLocaleString()})</td>
            <td class="text-success">Deducted (1.22x)</td>
          </tr>
          <tr>
            <td>3. Net Food Allowance</td>
            <td>₱${result.netFoodBudget.toLocaleString()}</td>
            <td>₱${result.perHeadAllowance}/head allowance for ${result.pax} guests</td>
            <td class="text-success">Isolated for Food</td>
          </tr>
          <tr>
            <td>4. 5-Course Food Spread</td>
            <td>₱${result.totalFoodCost.toLocaleString()}</td>
            <td>${result.selectedDishes.starter.name.split(' ')[0]} + ${result.selectedDishes.main.name.split(' ')[0]} + ${result.selectedDishes.side.name.split(' ')[0]} + ${result.selectedDishes.dessert.name.split(' ')[0]}</td>
            <td class="text-success">5 Courses Selected</td>
          </tr>
          <tr class="row-baseline">
            <td>5. Final Client Quotation</td>
            <td>₱${result.finalQuote.toLocaleString()}</td>
            <td>Variance Buffer: ₱${result.varianceBuffer.toLocaleString()}</td>
            <td><span class="tag-baseline">${result.utilizationPct}% Utilized (₱0 Overrun)</span></td>
          </tr>
        `;
      } else {
        accuracyTableHead.textContent = 'Constraint Validation';
        accuracyTableBody.innerHTML = `
          <tr>
            <td>1. Target Gross Budget</td>
            <td>₱${result.targetBudget.toLocaleString()}</td>
            <td>Current Input Value</td>
            <td><span class="tag-baseline">Current Bound</span></td>
          </tr>
          <tr>
            <td>2. Minimum Viable 5-Course Spread</td>
            <td>₱${result.minRequiredGross.toLocaleString()}</td>
            <td>₱240/head base food + 12% VAT + 10% Svc for ${result.pax} guests</td>
            <td><span class="tag-baseline">Required Threshold</span></td>
          </tr>
          <tr class="row-baseline">
            <td>3. Budget Shortfall</td>
            <td>-₱${result.shortfall.toLocaleString()}</td>
            <td>Cannot feed ${result.pax} guests complete meal without overrun</td>
            <td><span class="tag-baseline">Shortfall Deficit</span></td>
          </tr>
        `;
      }
    }
  }

  function resetSimulator() {
    applyPreset('steady');
  }

  if (resetBtn) {
    resetBtn.addEventListener('click', (e) => {
      e.preventDefault();
      resetSimulator();
    });
  }

  // Initialize calculations & accuracy table
  updateAccuracyTable();
  applyPreset('steady');

  // URL hash navigation support for directly opening Budget Maximizer
  if (window.location.hash === '#budget' || window.location.hash === '#dss-budget') {
    setModel('budget');
  }
  window.addEventListener('hashchange', () => {
    if (window.location.hash === '#budget' || window.location.hash === '#dss-budget') {
      setModel('budget');
    }
  });
}

/* ==========================================================================
   3. Navigation ScrollSpy (Active Section Tracking for Navbar & Mobile Dock)
   ========================================================================== */
function initBottomDockScrollSpy() {
  const navItems = document.querySelectorAll('.dock-btn, .dock-item, .nav-link');
  const sections = document.querySelectorAll('section[id]');

  if (!navItems.length || !sections.length) return;

  const observerOptions = {
    root: null,
    rootMargin: '-30% 0px -50% 0px',
    threshold: 0
  };

  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const id = entry.target.getAttribute('id');
        navItems.forEach(item => {
          if (item.getAttribute('href') === `#${id}`) {
            item.classList.add('active');
          } else {
            item.classList.remove('active');
          }
        });
      }
    });
  }, observerOptions);

  sections.forEach(sec => observer.observe(sec));
}

/* ==========================================================================
   4. Booth Share & QR Code Modal
   ========================================================================== */
function initShareModal() {
  const shareBtn = document.getElementById('btnHeaderShare');
  const heroShareBtn = document.getElementById('btnHeroShare');
  const modal = document.getElementById('shareModal');
  const closeBtn = document.getElementById('closeModalBtn');
  const qrContainer = document.getElementById('qrCodeContainer');
  const qrUrlInput = document.getElementById('qrCustomUrlInput');
  const qrUpdateBtn = document.getElementById('qrUpdateBtn');
  const qrNotice = document.getElementById('qrLocalNotice');
  const qrTargetDisplay = document.getElementById('qrTargetDisplay');

  if (!modal) return;

  function renderQr(targetUrl) {
    if (qrTargetDisplay) qrTargetDisplay.textContent = targetUrl;
    if (qrUrlInput) qrUrlInput.value = targetUrl;

    const qrApiUrl = `https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${encodeURIComponent(targetUrl)}&color=72-1-1&bgcolor=ffffff`;
    
    qrContainer.innerHTML = `
      <img src="${qrApiUrl}" alt="Scan QR Code to open exhibit app on your device" width="160" height="160" loading="eager" />
    `;
  }

  function openModal() {
    modal.classList.add('open');
    document.body.style.overflow = 'hidden';

    const savedUrl = localStorage.getItem('ecs_exhibit_qr_url');
    const isLocal = window.location.protocol === 'file:' || 
                    window.location.hostname === 'localhost' || 
                    window.location.hostname === '127.0.0.1';

    if (qrNotice) {
      qrNotice.style.display = isLocal ? 'block' : 'none';
    }

    let targetUrl = savedUrl;
    if (!targetUrl) {
      if (isLocal) {
        targetUrl = 'https://jdadonato.github.io/ECS-EXHIBIT/';
      } else {
        targetUrl = window.location.href;
      }
    }

    renderQr(targetUrl);
  }

  function closeModal() {
    modal.classList.remove('open');
    document.body.style.overflow = '';
  }

  if (qrUpdateBtn && qrUrlInput) {
    qrUpdateBtn.addEventListener('click', () => {
      const val = qrUrlInput.value.trim();
      if (val) {
        localStorage.setItem('ecs_exhibit_qr_url', val);
        renderQr(val);
      }
    });
  }

  if (shareBtn) shareBtn.addEventListener('click', openModal);
  if (heroShareBtn) heroShareBtn.addEventListener('click', openModal);
  if (closeBtn) closeBtn.addEventListener('click', closeModal);

  modal.addEventListener('click', e => {
    if (e.target === modal) closeModal();
  });

  window.addEventListener('keydown', e => {
    if (e.key === 'Escape' && modal.classList.contains('open')) closeModal();
  });
}

/* ==========================================================================
   5. Gadget-Style Scroll-Driven In/Out Reveals (Apple / Pixel Hardware Showcase)
   ========================================================================== */
function initGadgetScrollReveals() {
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    return;
  }

  // Activate CSS animations only when JavaScript is confirmed running
  document.documentElement.classList.add('js-reveals-enabled');

  const revealTargets = document.querySelectorAll(
    '.gadget-reveal, .gadget-reveal-left, .gadget-reveal-right, .gadget-reveal-scale'
  );

  if (!revealTargets.length || !('IntersectionObserver' in window)) {
    return;
  }

  const observerOptions = {
    threshold: 0.12,
    rootMargin: '0px 0px -40px 0px'
  };

  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
      } else {
        // Move out when scrolling past or away (bidirectional gadget showcase effect)
        entry.target.classList.remove('is-visible');
      }
    });
  }, observerOptions);

  revealTargets.forEach(target => revealObserver.observe(target));
}

/* ==========================================================================
   6. Evaluator Handout Modal & 1-Page Defense PDF Print Trigger
   ========================================================================== */
function initHandoutModal() {
  const printHeaderBtn = document.getElementById('btnPrintHandout');
  const triggerPrintBtn = document.getElementById('btnTriggerPrint');
  const modal = document.getElementById('handoutModal');
  const closeBtn = document.getElementById('closeHandoutBtn');

  if (!modal) return;

  function openModal() {
    modal.classList.add('open');
    document.body.style.overflow = 'hidden';
  }

  function closeModal() {
    modal.classList.remove('open');
    document.body.style.overflow = '';
  }

  function printHandout() {
    document.body.classList.add('printing-handout');
    window.print();
    setTimeout(() => {
      document.body.classList.remove('printing-handout');
    }, 1200);
  }

  if (printHeaderBtn) printHeaderBtn.addEventListener('click', openModal);
  if (triggerPrintBtn) triggerPrintBtn.addEventListener('click', printHandout);
  if (closeBtn) closeBtn.addEventListener('click', closeModal);

  modal.addEventListener('click', e => {
    if (e.target === modal) closeModal();
  });

  window.addEventListener('keydown', e => {
    if (e.key === 'Escape' && modal.classList.contains('open')) closeModal();
  });

  window.addEventListener('afterprint', () => {
    document.body.classList.remove('printing-handout');
  });
}

/* ==========================================================================
   7. Offline PWA Service Worker Registration
   ========================================================================== */
function initServiceWorker() {
  if ('serviceWorker' in navigator && window.location.protocol.startsWith('http')) {
    window.addEventListener('load', () => {
      navigator.serviceWorker.register('./sw.js')
        .then(() => {
          // Service worker active
        })
        .catch(() => {
          // Non-critical fallback
        });
    });
  }
}
