// The reference model approximates real return as nominal return minus inflation.
export function assumptions(nominalRate, inflationRate) {
  if (!Number.isFinite(nominalRate) || !Number.isFinite(inflationRate)) {
    throw new RangeError('Rates must be finite numbers.');
  }
  const realRate = (nominalRate - inflationRate) / 100;
  return { realRate, multiplier: realRate > 0 ? 12 / realRate : null };
}

function reserves(input) {
  const values = [input.childCount, input.childCost, input.healthReserve, input.housingReserve];
  if (values.some(value => !Number.isFinite(value) || value < 0) || !Number.isInteger(input.childCount)) {
    throw new RangeError('Reserves and child count must be nonnegative; child count must be an integer.');
  }
  const children = input.childCount * input.childCost;
  return { children, health: input.healthReserve, housing: input.housingReserve,
    total: children + input.healthReserve + input.housingReserve };
}

export function calculateTarget(input) {
  if (!Number.isFinite(input.monthlyExpense) || input.monthlyExpense < 0) {
    throw new RangeError('Monthly expense must be nonnegative.');
  }
  const rates = assumptions(input.nominalRate, input.inflationRate);
  const reserve = reserves(input);
  if (rates.multiplier === null) return { status: 'nonpositive-rate', ...rates, reserve };
  const livingCapital = input.monthlyExpense * rates.multiplier;
  return { status: 'ok', ...rates, reserve, livingCapital, total: livingCapital + reserve.total };
}

export function calculateMonthly(input) {
  if (!Number.isFinite(input.assets) || input.assets < 0) {
    throw new RangeError('Assets must be nonnegative.');
  }
  const rates = assumptions(input.nominalRate, input.inflationRate);
  const reserve = reserves(input);
  const remaining = Math.max(0, input.assets - reserve.total);
  const shortfall = Math.max(0, reserve.total - input.assets);
  if (rates.multiplier === null) return { status: 'nonpositive-rate', ...rates, reserve, remaining, shortfall };
  return { status: 'ok', ...rates, reserve, remaining, shortfall, monthlyExpense: remaining / rates.multiplier };
}
