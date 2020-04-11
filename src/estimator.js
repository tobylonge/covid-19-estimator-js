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
  const factor = Math.floor(days / 3);
  return currentlyInfected * 2 ** factor;
};

const covid19ImpactEstimator = (data) => {
  const { periodType, timeToElapse, reportedCases } = data;

  // Currently Infected People
  const impactCurrentlyInfected = reportedCases * 10;
  const severeCurrentlyInfected = reportedCases * 50;

  return {
    data, // the input data you got
    impact: {
      currentlyInfected: impactCurrentlyInfected,
      infectionsByRequestedTime: infectionsByRequestedTime(
        impactCurrentlyInfected,
        periodType,
        timeToElapse
      )
    }, // your best case estimation
    severeImpact: {
      currentlyInfected: severeCurrentlyInfected,
      infectionsByRequestedTime: infectionsByRequestedTime(
        severeCurrentlyInfected,
        periodType,
        timeToElapse
      )
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
