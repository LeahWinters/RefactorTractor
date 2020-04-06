class Sleep { // instance for the user's sleep each day
  constructor(data, userRepository) {
    this.userId = data.userID;
    this.date = data.date;
    this.hoursSlept = data.hoursSlept;
    this.sleepQuality = data.sleepQuality;
    this.sleep(userRepository);
  }
  sleep(userRepo) {
    userRepo.users
      .find((user) => user.id === this.userId)
      .updateSleep(this.date, this.hoursSlept, this.sleepQuality);
  }
}

export default Sleep;
