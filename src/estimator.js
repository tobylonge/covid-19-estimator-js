// Convert TimetoElapse to returned PeriodType
const convertToDays = (period, time) => {
  switch (period) {
    case 'days':
      return time;
    case 'weeks':
      return time * 7;
    case 'months':
      return time * 30;
    default:
      return time;
  }
};

// Function to get Infections by requested time
const infectionsByRequestedTime = (currentlyInfected, period, time) => {
  const days = convertToDays(period, time);
  const factor = Math.trunc(days / 3);
  return currentlyInfected * 2 ** factor;
};

const severeCasesByRequestedTime = (time) => (15 / 100) * time;

const hospitalBedsTime = (time, beds) => Math.trunc((35 / 100) * beds - time);

const casesByTime = (perct, time) => (perct / 100) * time;

const covid19ImpactEstimator = (data) => {
  const {
    periodType, timeToElapse, reportedCases, totalHospitalBeds
  } = data;

  // Currently Infected People
  const impactCurrentlyInfected = reportedCases * 10;

  const severeImpactCurrentlyInfected = reportedCases * 50;

  const impactInfectionsByRequestedTime = infectionsByRequestedTime(
    impactCurrentlyInfected,
    periodType,
    timeToElapse
  );

  const severeImpactInfectionsByRequestedTime = infectionsByRequestedTime(
    severeImpactCurrentlyInfected,
    periodType,
    timeToElapse
  );

  const impactSevereCasesByRequestedTime = severeCasesByRequestedTime(
    impactInfectionsByRequestedTime
  );

  const severeImpactSevereCasesByRequestedTime = severeCasesByRequestedTime(
    severeImpactInfectionsByRequestedTime
  );

  const impactHospitalBedsByRequestedTime = hospitalBedsTime(
    impactSevereCasesByRequestedTime,
    totalHospitalBeds
  );
  const severeImpactHospitalBedsByRequestedTime = hospitalBedsTime(
    severeImpactSevereCasesByRequestedTime,
    totalHospitalBeds
  );

  const impactCasesForICUByRequestedTime = casesByTime(
    5,
    impactInfectionsByRequestedTime
  );
  const severeCasesForICUByRequestedTime = casesByTime(
    5,
    severeImpactInfectionsByRequestedTime
  );
  const impactCasesForVentByRequestedTime = casesByTime(
    2,
    impactInfectionsByRequestedTime
  );
  const severeCasesForVentByRequestedTime = casesByTime(
    2,
    severeImpactInfectionsByRequestedTime
  );

  return {
    data, // the input data you got
    impact: {
      currentlyInfected: impactCurrentlyInfected,
      infectionsByRequestedTime: impactInfectionsByRequestedTime,
      severeCasesByRequestedTime: impactSevereCasesByRequestedTime,
      hospitalBedsByRequestedTime: impactHospitalBedsByRequestedTime,
      casesForICUByRequestedTime: impactCasesForICUByRequestedTime,
      casesForVentilatorsByRequestedTime: impactCasesForVentByRequestedTime
    }, // your best case estimation
    severeImpact: {
      currentlyInfected: severeImpactCurrentlyInfected,
      infectionsByRequestedTime: severeImpactInfectionsByRequestedTime,
      severeCasesByRequestedTime: severeImpactSevereCasesByRequestedTime,
      hospitalBedsByRequestedTime: severeImpactHospitalBedsByRequestedTime,
      casesForICUByRequestedTime: severeCasesForICUByRequestedTime,
      casesForVentilatorsByRequestedTime: severeCasesForVentByRequestedTime
    } // your severe case estimation
  };
};

export default covid19ImpactEstimator;

// Remove after test
// const data = {
//   region: {
//     name: 'Africa',
//     avgAge: 19.7,
//     avgDailyIncomeInUSD: 5,
//     avgDailyIncomePopulation: 0.71
//   },
//   periodType: 'days',
//   timeToElapse: 58,
//   reportedCases: 674,
//   population: 66622705,
//   totalHospitalBeds: 1380614
// };

// console.log(covid19ImpactEstimator(data));
