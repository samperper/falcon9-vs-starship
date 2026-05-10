const DEFAULT_CASE = 'mid';

const zeroFloor = (value) => {
  const numericValue = Number(value);
  return Number.isFinite(numericValue) ? Math.max(0, numericValue) : 0;
};

const atLeastOne = (value) => Math.max(1, zeroFloor(value));

export const isRangeValue = (value) =>
  value !== null &&
  typeof value === 'object' &&
  ['low', 'mid', 'high'].every((caseName) => Number.isFinite(Number(value[caseName])));

export const readValue = (definition, caseName = DEFAULT_CASE) => {
  const rawValue = definition?.value ?? definition;

  if (isRangeValue(rawValue)) {
    return zeroFloor(rawValue[caseName] ?? rawValue[DEFAULT_CASE]);
  }

  return zeroFloor(rawValue);
};

export const getRange = (definition) => {
  const rawValue = definition?.value ?? definition;

  if (!isRangeValue(rawValue)) {
    const value = zeroFloor(rawValue);
    return { low: value, mid: value, high: value };
  }

  return {
    low: zeroFloor(rawValue.low),
    mid: zeroFloor(rawValue.mid),
    high: zeroFloor(rawValue.high),
  };
};

export const getDefaultInputs = (vehicle, caseName = DEFAULT_CASE) =>
  Object.fromEntries(
    Object.entries(vehicle.modelInputs).map(([inputId, definition]) => [
      inputId,
      readValue(definition, caseName),
    ]),
  );

export const mergeVehicleInputs = (vehicle, overrides = {}, caseName = DEFAULT_CASE) => ({
  ...getDefaultInputs(vehicle, caseName),
  ...overrides,
});

export const calculateCostPerKg = (marginalCostUsd, payloadToLeoKg) => {
  const payloadKg = zeroFloor(payloadToLeoKg);

  if (payloadKg === 0) {
    return 0;
  }

  return zeroFloor(marginalCostUsd) / payloadKg;
};

export const calculateGrossMargin = (listPriceUsd, marginalCostUsd) => {
  const priceUsd = zeroFloor(listPriceUsd);

  if (priceUsd === 0) {
    return 0;
  }

  return (priceUsd - zeroFloor(marginalCostUsd)) / priceUsd;
};

export const calculateFalcon9Components = (vehicle, overrides = {}, caseName = DEFAULT_CASE) => {
  const inputs = mergeVehicleInputs(vehicle, overrides, caseName);
  const boosterAmortizationUsd =
    zeroFloor(inputs.boosterBuildCost) / atLeastOne(inputs.boosterUsefulFlights);
  const stageTwoUsd = zeroFloor(inputs.stageTwoCost);
  const refurbUsd = zeroFloor(inputs.refurbPerFlight);
  const fuelUsd = zeroFloor(inputs.fuelPerLaunch);

  return {
    boosterAmortizationUsd,
    stageTwoUsd,
    refurbUsd,
    fuelUsd,
  };
};

export const calculateStarshipComponents = (vehicle, overrides = {}, caseName = DEFAULT_CASE) => {
  const inputs = mergeVehicleInputs(vehicle, overrides, caseName);
  const stackBuildCostUsd = zeroFloor(inputs.stackBuildCost);
  const boosterBuildShare = Math.min(1, zeroFloor(inputs.boosterBuildShare));
  const shipBuildShare = Math.min(1, zeroFloor(inputs.shipBuildShare));
  const superHeavyAmortizationUsd =
    (stackBuildCostUsd * boosterBuildShare) / atLeastOne(inputs.boosterUsefulFlights);
  const shipAmortizationUsd =
    (stackBuildCostUsd * shipBuildShare) / atLeastOne(inputs.shipUsefulFlights);
  const refurbUsd = zeroFloor(inputs.refurbPerFlight);
  const fuelUsd = zeroFloor(inputs.fuelPerLaunch);

  return {
    superHeavyAmortizationUsd,
    shipAmortizationUsd,
    refurbUsd,
    fuelUsd,
  };
};

export const calculateFalconHeavyComponents = (vehicle, overrides = {}, caseName = DEFAULT_CASE) => {
  const inputs = mergeVehicleInputs(vehicle, overrides, caseName);
  const sideBoosterAmortizationUsd =
    (zeroFloor(inputs.sideBoosterBuildCost) * 2) / atLeastOne(inputs.sideBoosterUsefulFlights);
  const centerCoreUsd = zeroFloor(inputs.centerCoreCost);
  const stageTwoUsd = zeroFloor(inputs.stageTwoCost);
  const fuelUsd = zeroFloor(inputs.fuelPerLaunch);

  return {
    sideBoosterAmortizationUsd,
    centerCoreUsd,
    stageTwoUsd,
    fuelUsd,
  };
};

export const sumCostComponents = (components) =>
  Object.values(components).reduce((totalUsd, value) => totalUsd + zeroFloor(value), 0);

export const calculatePublishedEconomics = (vehicle, caseName = DEFAULT_CASE) => {
  const marginalCostUsd = readValue(vehicle.metrics.marginalCost, caseName);
  const payloadToLeoKg = readValue(vehicle.metrics.modelPayloadToLeo ?? vehicle.metrics.payloadToLeo ?? vehicle.metrics.payloadToLeoReusable ?? vehicle.metrics.payloadToLeoExpendable, caseName);
  const listPriceUsd = readValue(vehicle.metrics.listPrice, caseName);

  return {
    marginalCostUsd,
    costPerKgUsd: calculateCostPerKg(marginalCostUsd, payloadToLeoKg),
    grossMargin: calculateGrossMargin(listPriceUsd, marginalCostUsd),
  };
};

export const calculateVehicleEconomics = (vehicle, overrides = {}, caseName = DEFAULT_CASE) => {
  const componentCalculators = {
    falcon9: calculateFalcon9Components,
    falconHeavy: calculateFalconHeavyComponents,
    starship: calculateStarshipComponents,
  };
  const calculateComponents = componentCalculators[vehicle.calculationModel];

  if (!calculateComponents) {
    throw new Error(`Unknown calculation model: ${vehicle.calculationModel}`);
  }

  const inputs = mergeVehicleInputs(vehicle, overrides, caseName);
  const components = calculateComponents(vehicle, inputs, caseName);
  const marginalCostUsd = sumCostComponents(components);
  const payloadToLeoKg = readValue(vehicle.metrics.modelPayloadToLeo ?? vehicle.metrics.payloadToLeo ?? vehicle.metrics.payloadToLeoReusable ?? vehicle.metrics.payloadToLeoExpendable, caseName);
  const listPriceUsd = readValue(vehicle.metrics.listPrice, caseName);

  return {
    inputs,
    components,
    marginalCostUsd,
    costPerKgUsd: calculateCostPerKg(marginalCostUsd, payloadToLeoKg),
    grossMargin: calculateGrossMargin(listPriceUsd, marginalCostUsd),
    published: vehicle.metrics.marginalCost ? calculatePublishedEconomics(vehicle, caseName) : null,
  };
};
