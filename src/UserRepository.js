import sleepData from './data/sleep';

class UserRepository {
  constructor() {
    this.users = [];
  }
  //KEEP getUser?
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

  getSum(arrToCount, actProperty) {
    return arrToCount.reduce((sum, activityCollection) => {
      activityCollection.forEach(activity => {
        sum += activity[actProperty]
      })
      return sum;
    }, 0);
  }

  calculateAverageSteps(date, steps) {
    let allUsersStepsCount = this.filterActivity(date);
    let sumOfSteps = this.getSum(allUsersStepsCount, steps)
    return Math.round(sumOfSteps / allUsersStepsCount.length);
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
    return this.users.filter(user => user.calculateSleepAverages(date, user.sleepQualityRecord, 'quality') > 3);
  }

  sortSleepers(date) {
    return sleepData
      .filter(sleep => sleep.date === date)
      .sort((a, b) => b.hoursSlept - a.hoursSlept)
  }

  getLongestSleepers(date) {
    return this.sortSleepers(date)[0].userID;
  }
  
  getWorstSleepers(date) {
    let i = this.sortSleepers(date).length - 1;
    return this.sortSleepers(date)[i].userID;
  }
}

export default UserRepository;
