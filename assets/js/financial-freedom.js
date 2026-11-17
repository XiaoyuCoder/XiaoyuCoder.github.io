import { assumptions, calculateTarget, calculateMonthly } from './financial-freedom-model.mjs';

const byId = id => document.getElementById(id);
const targetForm = byId('target-form');
const reverseForm = byId('reverse-form');
const settingsForm = byId('settings-form');
const includeChildren = byId('include-children');
const childFields = byId('target-children');
const nominalInput = byId('nominal-rate');
const inflationInput = byId('inflation-rate');
const tabs = [...document.querySelectorAll('[role="tab"]')];
const panels = [...document.querySelectorAll('[role="tabpanel"]')];
const numberFormat = new Intl.NumberFormat('zh-CN', { maximumFractionDigits: 2 });
const format = value => numberFormat.format(value);
const yuan = value => `${format(value)} 元`;
const getNumber = (form, name) => Number(form.elements.namedItem(name).value);
const setText = (id, text) => { byId(id).textContent = text; };

function showPanel(name, focus = false) {
  for (const tab of tabs) {
    const selected = tab.id === `tab-${name}`;
    tab.setAttribute('aria-selected', String(selected));
    tab.tabIndex = selected ? 0 : -1;
    if (selected && focus) tab.focus();
  }
  for (const panel of panels) panel.hidden = panel.id !== `panel-${name}`;
  document.querySelector('.calculator-tabs').scrollIntoView({ block: 'start', behavior: 'instant' });
}

tabs.forEach((tab, index) => {
  tab.addEventListener('click', () => showPanel(tab.id.replace('tab-', '')));
  tab.addEventListener('keydown', event => {
    let next;
    if (event.key === 'ArrowRight') next = (index + 1) % tabs.length;
    else if (event.key === 'ArrowLeft') next = (index + tabs.length - 1) % tabs.length;
    else if (event.key === 'Home') next = 0;
    else if (event.key === 'End') next = tabs.length - 1;
    else return;
    event.preventDefault();
    showPanel(tabs[next].id.replace('tab-', ''), true);
  });
});
document.querySelectorAll('[data-open-panel]').forEach(button => {
  button.addEventListener('click', () => showPanel(button.dataset.openPanel, true));
});

function readInput(form) {
  const childCount = form === targetForm && !includeChildren.checked ? 0 : getNumber(form, 'childCount');
  return {
    nominalRate: Number(nominalInput.value),
    inflationRate: Number(inflationInput.value),
    childCount,
    childCost: childCount > 0 ? getNumber(form, 'childCost') : 0,
    healthReserve: getNumber(form, 'healthReserve'),
    housingReserve: getNumber(form, 'housingReserve'),
  };
}

function syncChildren() {
  childFields.hidden = !includeChildren.checked;
  childFields.disabled = !includeChildren.checked;
  reverseForm.elements.namedItem('childCost').disabled = getNumber(reverseForm, 'childCount') === 0;
}

function showUnavailable(mode, message) {
  const target = mode === 'target';
  setText(target ? 'target-total' : 'reverse-monthly', '—');
  if (target) setText('target-unit', '');
  setText(`${mode}-explanation`, message);
  byId(`${mode}-breakdown`).hidden = true;
}

function updateRates() {
  if (!settingsForm.checkValidity()) {
    setText('real-rate-value', '—');
    setText('multiplier-value', '—');
    setText('badge-multiplier', '—');
    setText('badge-rate', '请完整填写参数');
    for (const cost of [5000, 10000, 20000]) setText(`conversion-${cost}`, '—');
    byId('rate-error').hidden = false;
    setText('rate-error', '请填写有效的回报率与通胀率。');
    return null;
  }
  const rates = assumptions(Number(nominalInput.value), Number(inflationInput.value));
  const rateLabel = `${(rates.realRate * 100).toFixed(2)}%`;
  const multiplierLabel = rates.multiplier === null ? '不适用' : format(rates.multiplier);
  setText('real-rate-value', rateLabel);
  setText('multiplier-value', multiplierLabel);
  setText('badge-multiplier', multiplierLabel);
  setText('badge-rate', `实际回报率 ${rateLabel}`);
  byId('rate-error').hidden = rates.multiplier !== null;
  setText('rate-error', '实际回报率须大于 0，才能用此模型测算有限的日常开销本金。');
  document.querySelectorAll('[data-rate-summary]').forEach(element => {
    element.textContent = `当前假设：实际年回报率约 ${rateLabel} · 乘数 ${multiplierLabel}`;
  });
  for (const cost of [5000, 10000, 20000]) {
    setText(`conversion-${cost}`, rates.multiplier === null ? '不适用' : `${format(cost * rates.multiplier / 10000)} 万元`);
  }
  return rates;
}

function renderTarget(rates) {
  if (!targetForm.checkValidity()) {
    showUnavailable('target', '请完整填写有效的开销与预留金额。');
    return;
  }
  if (!rates || rates.multiplier === null) {
    showUnavailable('target', '当前回报率不足以抵消通胀，此模型无法给出有限的目标。请在“参数与公式”中调整假设。');
    return;
  }
  const monthlyExpense = getNumber(targetForm, 'monthlyExpense');
  const result = calculateTarget({ ...readInput(targetForm), monthlyExpense });
  const divisor = result.total >= 100000000 ? 100000000 : 10000;
  setText('target-total', format(result.total / divisor));
  setText('target-unit', divisor === 100000000 ? '亿元' : '万元');
  setText('target-explanation', `用于覆盖每月 ${yuan(monthlyExpense)} 的日常开销，另加 ${yuan(result.reserve.total)} 的独立预留。`);
  byId('target-breakdown').hidden = false;
  setText('target-living', yuan(result.livingCapital));
  setText('target-children-value', yuan(result.reserve.children));
  setText('target-health-value', yuan(result.reserve.health));
  setText('target-housing-value', yuan(result.reserve.housing));
  const parts = { living: result.livingCapital, children: result.reserve.children, health: result.reserve.health, housing: result.reserve.housing };
  for (const [name, amount] of Object.entries(parts)) {
    document.querySelector(`[data-allocation="${name}"]`).style.width = `${result.total > 0 ? amount / result.total * 100 : 0}%`;
  }
}

function renderReverse(rates) {
  if (!reverseForm.checkValidity()) {
    showUnavailable('reverse', '请完整填写有效的资产与预留金额。');
    return;
  }
  if (!rates || rates.multiplier === null) {
    showUnavailable('reverse', '实际回报率不为正，此模型无法估算可由投资实际收益覆盖的月度开销。请调整参数。');
    return;
  }
  const assets = getNumber(reverseForm, 'assets');
  const result = calculateMonthly({ ...readInput(reverseForm), assets });
  setText('reverse-monthly', format(result.monthlyExpense));
  setText('reverse-explanation', result.shortfall > 0
    ? `各项预留尚缺 ${yuan(result.shortfall)}，当前没有可用于日常开销的剩余本金。`
    : `扣除 ${yuan(result.reserve.total)} 的独立预留后，剩余本金为 ${yuan(result.remaining)}。`);
  byId('reverse-breakdown').hidden = false;
  setText('reverse-assets-value', yuan(assets));
  setText('reverse-reserve-value', yuan(result.reserve.total));
  setText('reverse-remaining-value', yuan(result.remaining));
}

function renderAll() {
  syncChildren();
  const rates = updateRates();
  renderTarget(rates);
  renderReverse(rates);
}

for (const form of [targetForm, reverseForm]) {
  form.addEventListener('input', renderAll);
  form.addEventListener('submit', event => {
    event.preventDefault();
    renderAll();
    if (window.matchMedia('(max-width: 820px)').matches) {
      const result = form.parentElement.querySelector('.calculation-result');
      result.scrollIntoView({ behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth', block: 'start' });
    }
  });
}
settingsForm.addEventListener('submit', event => event.preventDefault());
for (const name of ['nominal', 'inflation']) {
  const numeric = byId(`${name}-rate`);
  const slider = byId(`${name}-slider`);
  numeric.addEventListener('input', () => {
    if (numeric.value !== '' && numeric.checkValidity()) slider.value = numeric.value;
    renderAll();
  });
  slider.addEventListener('input', () => { numeric.value = slider.value; renderAll(); });
}
byId('reset-rates').addEventListener('click', () => {
  nominalInput.value = '4.5';
  inflationInput.value = '2';
  byId('nominal-slider').value = '4.5';
  byId('inflation-slider').value = '2';
  renderAll();
});

const presets = {
  single: { monthlyExpense: 2990, children: false, childCount: 1, childCost: 580000, healthReserve: 0, housingReserve: 0 },
  couple: { monthlyExpense: 5980, children: false, childCount: 1, childCost: 580000, healthReserve: 0, housingReserve: 0 },
  family: { monthlyExpense: 10000, children: true, childCount: 1, childCost: 700000, healthReserve: 500000, housingReserve: 0 },
  family2: { monthlyExpense: 10000, children: true, childCount: 2, childCost: 700000, healthReserve: 500000, housingReserve: 0 },
  family3: { monthlyExpense: 10000, children: true, childCount: 3, childCost: 700000, healthReserve: 500000, housingReserve: 0 },
};
document.querySelectorAll('[data-preset]').forEach(button => {
  button.addEventListener('click', () => {
    if (button.dataset.preset === 'six-million') {
      const values = { assets: 6000000, childCount: 1, childCost: 700000, healthReserve: 500000, housingReserve: 0 };
      for (const [name, value] of Object.entries(values)) reverseForm.elements.namedItem(name).value = String(value);
      showPanel('reverse', true);
    } else {
      const { children, ...values } = presets[button.dataset.preset];
      includeChildren.checked = children;
      for (const [name, value] of Object.entries(values)) targetForm.elements.namedItem(name).value = String(value);
      showPanel('target', true);
    }
    renderAll();
  });
});

renderAll();
