export type Patient = {
  id: number;
  x: number;
  y: number;
  infected: boolean;
  quarantined: boolean;
  daysInfected: number;
  daysQuarantined: number;
};

export type SimulationParameters = {  
  infectionChance: number;
};

export const defaultSimulationParameters: SimulationParameters = {
  infectionChance: 5,
};

