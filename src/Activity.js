class Activity {
  constructor(data, userRepository) {
    this.userId = data.userID;
    this.date = data.date;
    this.steps = data.numSteps;
    this.minutesActive = data.minutesActive;
    this.flightsOfStairs = data.flightsOfStairs;
    this.milesWalked = 0;
    this.reachedStepGoal = null;
    this.doActivity(userRepository);
  }
  doActivity(userRepo) {
      userRepo.users
        .find(user => user.id === this.userId)
        .updateActivities(this);
  }
  findUser(userRepository) {
    return userRepository.users.find(user => user.id === this.userId);
  }
  calculateMiles(userRepository) {
    let walkingUser = this.findUser(userRepository)
    return Math.round(this.steps * walkingUser.strideLength / 5280).toFixed(1);
  }
  compareStepGoal(userRepository) {
    let userStepGoal = this.findUser(userRepository).dailyStepGoal;
    this.reachedStepGoal = this.steps >= userStepGoal;
  }
}

export default Activity;
