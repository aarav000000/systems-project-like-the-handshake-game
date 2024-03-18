import type { Patient } from "./types";
import type { SimulationParameters } from "./types";

export const createPopulation = (size = 1600) => {
  const population: Patient[] = [];
  const sideSize = Math.sqrt(size);
  for (let i = 0; i < size; i++) {
    population.push({
      id: i,
      x: (100 * (i % sideSize)) / sideSize, // X-coordinate within 100 units
      y: (100 * Math.floor(i / sideSize)) / sideSize, // Y-coordinate scaled similarly
      infected: false,
      quarantined: false,
      daysInfected: 0,
      daysQuarantined: 0,
      coolDown: false,
      coolDownDays: 0
    });
  }
  // Infect X patients...
  for (let i=0; i < 5; i++) {
    // Infect patient zero...
    let patientZero = population[Math.floor(Math.random() * size)];
    patientZero.infected = true;
  }
  return population;
};




const updatePatient = (
  patient: Patient,
  population: Patient[],
  params: SimulationParameters
): Patient => {
  let updatedPatient = { ...patient };
  // IF we are NOT sick, see if our neighbors are sick...
  // choose a partner
  const partner = population[Math.floor(Math.random() * population.length)];
  if (partner.infected && !partner.quarantined && !partner.coolDown && 100*Math.random() < params.infectionChance) {          
    updatedPatient = { ...patient, infected : true };
  }   
  if (patient.infected === true){
updatedPatient.daysInfected += 1
  }
  if (patient.daysInfected === 4){
    updatedPatient.quarantined = true
  }
  if (patient.quarantined === true){
    updatedPatient.daysQuarantined += 1
      }
      if (patient.daysQuarantined === 5){
        updatedPatient.quarantined = false
        updatedPatient.infected = false
        updatedPatient.daysInfected = 0
        updatedPatient.daysQuarantined = 0
        updatedPatient.coolDown = true
      }
      if (patient.coolDown === true){
        updatedPatient.coolDownDays += 1
      }
      if (patient.coolDownDays === 10){
        updatedPatient.coolDown = false
      }

  return updatedPatient;
};

export const updatePopulation = (
  population: Patient[],
  params: SimulationParameters
): Patient[] => {
  // Run updatePatient once per patient to create *new* patients for new round.
  return population.map((patient) =>
    updatePatient(patient, population, params)
  );
};
