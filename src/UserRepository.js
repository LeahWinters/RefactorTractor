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
    this.users.map(user => {
      return user.activityRecord.filter(activity => activity.date === date);
    })
  }
  calculateAverageSteps(date) {
    let allUsersStepsCount = this.filterActivity(date);
    return Math.round(sumOfSteps / allUsersStepsCount.length);
  }
  //pull out sum totals from following 2 methods
  calculateAverageStairs(date) {
    let allUsersStairsCount = this.filterActivity(date)
    let sumOfStairs = allUsersStairsCount.reduce((stairsSum, activityCollection) => {
      activityCollection.forEach(activity => {
        stairsSum += activity.flightsOfStairs
      })
      return stairsSum;
    }, 0);
    return Math.round(sumOfStairs / allUsersStairsCount.length);
  }
  calculateAverageMinutesActive(date) {
    let allUsersMinutesActiveCount = this.filterActivity(date);
    let sumOfMinutesActive = allUsersMinutesActiveCount.reduce((minutesActiveSum, activityCollection) => {
      activityCollection.forEach(activity => {
        minutesActiveSum += activity.minutesActive
      })
      return minutesActiveSum;
    }, 0);
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
