import sleepData from './data/sleep';

class UserRepository {
  constructor() {
    this.users = [];
  }
  getUser(id) {
    return this.users.find(user => user.id === id)
  }
  calculateAverageStepGoal() {
    let total = this.users
      .map(user => user.dailyStepGoal)
      .reduce((sum, goal) => {
        sum += goal;
        return sum;
      }, 0);
    return total / this.users.length;
  }
  calculateAverageSleepQuality() {
    let totalSleepQuality = this.users.reduce((sum, user) => sum += user.sleepQualityAverage, 0);
    return totalSleepQuality / this.users.length;
  }
  filterActivity(date) {
    return this.users.map(user => {
      return user.activityRecord.filter(activity => activity.date === date);
    })
  }
  calculateAverageSteps(date) {
    let allUsersStepsCount = this.filterActivity(date);
    let sumOfSteps = allUsersStepsCount.reduce((stepsSum, activityCollection) => {
      activityCollection.forEach(activity => {
        stepsSum += activity.steps
      })
      return stepsSum;
    }, 0); 
    return Math.round(sumOfSteps / allUsersStepsCount.length);
  }
  //pull out sum totals from following 2 methods

  getSum(arrToCount, actProperty) {
    return arrToCount.reduce((sum, activityCollection) => {
      activityCollection.forEach(activity => {
        sum += activity[actProperty]
      })
      return sum;
    }, 0);
  }
    
  calculateAverageStairs(date, flightsOfStairs) {
    let allUsersStairsCount = this.filterActivity(date);
    let sumOfStairs = this.getSum(allUsersStairsCount, flightsOfStairs);
    return Math.round(sumOfStairs / allUsersStairsCount.length);
  }
  calculateAverageMinutesActive(date, minutesActive) {
    let allUsersMinutesActiveCount = this.filterActivity(date);
    let sumOfMinutesActive = this.getSum(allUsersMinutesActiveCount, minutesActive);
    return Math.round(sumOfMinutesActive / allUsersMinutesActiveCount.length);
  }
  calculateAverageDailyWater(date) {
    let todaysDrinkers = this.users.filter(user => user.addDailyOunces(date) > 0);
    let sumDrankOnDate = todaysDrinkers.reduce((sum, drinker) => sum += drinker.addDailyOunces(date), 0);
    return Math.floor(sumDrankOnDate / todaysDrinkers.length);
  }
  findBestSleepers(date) {
    return this.users.filter(user => user.calculateAverageQualityThisWeek(date) > 3);
  }
  getLongestSleepers(date) {
    return sleepData
      .filter(sleep => sleep.date === date)
      .sort((a, b) => b.hoursSlept - a.hoursSlept)[0].userID;
  }
  getWorstSleepers(date) {
    return sleepData
      .filter(sleep => sleep.date === date)
      .sort((a, b) => a.hoursSlept - b.hoursSlept)[0].userID;
  }
}

export default UserRepository;
