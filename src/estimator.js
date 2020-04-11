const covid19ImpactEstimator = (data) => {
  let { periodType, timeToElapse, reportedCases } = data;

  //Currently Infected People
  let impactCurrentlyInfected = reportedCases * 10;
  let severeCurrentlyInfected = reportedCases * 50;

  return {
    data: data, // the input data you got
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

//Function to get Infections by requested time
const infectionsByRequestedTime = (currentlyInfected, period, time) => {
  let days = convertToDays(period, time);
  let factor = Math.floor(days / 3);
  return currentlyInfected * Math.pow(2, factor);
};

// Convert TimetoElapse to returned PeriodType
const convertToDays = (period, time) => {
  switch (period) {
    case 'days':
      return time;
      break;
    case 'weeks':
      return time * 7;
      break;
    case 'months':
      return time * 30;
      break;
    default:
      return time;
  }
};

export default covid19ImpactEstimator;

//Remove after test
let data = {
  region: {
    name: 'Africa',
    avgAge: 19.7,
    avgDailyIncomeInUSD: 5,
    avgDailyIncomePopulation: 0.71
  },
  periodType: 'days',
  timeToElapse: 58,
  reportedCases: 674,
  population: 66622705,
  totalHospitalBeds: 1380614
};

// console.log(covid19ImpactEstimator(data));
