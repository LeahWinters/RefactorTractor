
let domUpdates = {

  findActivityID(activityData, user, todayDate) {
    return activityData.find(activity => {
      return activity.userID === user.id && activity.date === todayDate;
    })
  },

  displayMainStepsCard(matchActivityID) {
    $('#steps-user-steps-today').text(matchActivityID.numSteps);
  },

  displayStepsInfo(matchActivityID) {
    $('#steps-info-active-minutes-today').text(matchActivityID.minutesActive);
  },

  displayMainStairsCard(matchActivityID) {
    $('#stairs-user-stairs-today').text(matchActivityID.flightsOfStairs * 12)
  },

  displayStairsInfo(matchActivityID) {
    $('#stairs-info-flights-today').text(matchActivityID.flightsOfStairs);
  },

  displayFriendsStepsAverages(userRepository, todayDate) {
    $('#steps-friend-active-minutes-average-today').text(userRepository.calculateAverageMinutesActive(todayDate, 'minutesActive'));
    $('#steps-friend-average-step-goal').text(`${userRepository.calculateAverageStepGoal()}`);
    $('#steps-friend-steps-average-today').text(userRepository.calculateAverageSteps(todayDate, 'steps'));
  },

  displayFriendsSleep(userRepository, todayDate) {
    $('#sleep-friend-longest-sleeper').text(userRepository.users.find(user => {
      return user.id === userRepository.getLongestSleepers(todayDate)
    }).getFirstName());
    $('#sleep-friend-worst-sleeper').text(userRepository.users.find(user => {
      return user.id === userRepository.getWorstSleepers(todayDate)
    }).getFirstName());
  },

  displayFriendsHydration(userRepository, todayDate) {
    $('#hydration-friend-ounces-today').text(userRepository.calculateAverageDailyWater(todayDate));
  },

  displayFriendsStairs(userRepository, todayDate) {
    $('#stairs-friend-flights-average-today').text((userRepository.calculateAverageStairs(todayDate, 'flightsOfStairs') / 12).toFixed(1))
  },

  friendStepStyling() {
    let friendsStepsParagraphs = document.querySelectorAll('.friends-steps');

    friendsStepsParagraphs.forEach(paragraph => {
      if (friendsStepsParagraphs[0] === paragraph) {
        paragraph.classList.add('green-text');
      }
      if (friendsStepsParagraphs[friendsStepsParagraphs.length - 1] === paragraph) {
        paragraph.classList.add('red-text');
      }
      if (paragraph.innerText.includes('YOU')) {
        paragraph.classList.add('yellow-text');
      }
    });
  },

  displayFriendsActivity(user) {
    user.friendsActivityRecords.forEach(friend => {
      $('#dropdown-friends-steps-container').append(`
      <p class='dropdown-p friends-steps'>${friend.firstName} | ${friend.totalWeeklySteps}</p>
      `);
    });
  },

  displayFriendsStepsWeekly(user, userRepository, todayDate) {
    user.findFriendsTotalStepsForWeek(userRepository.users, todayDate);
  },

  displayStepsCalendar(user, todayDate) {
    $('#steps-calendar-total-active-minutes-weekly').text(user.calculateAverageWeeklyExercise(todayDate, 'minutesActive'));
    $('#steps-calendar-total-steps-weekly').text(user.calculateAverageWeeklyExercise(todayDate, 'steps'));
  },

  displayStairsCalendar(user, todayDate) {
    $('#stairs-calendar-flights-average-weekly').text(user.calculateAverageWeeklyExercise(todayDate, 'flightsOfStairs'));
    $('#stairs-calendar-stairs-average-weekly').text((user.calculateAverageWeeklyExercise(todayDate, 'flightsOfStairs') * 12).toFixed(0));
  },

  showWalkedMiles(user, todayDate, userRepository) {
    $('#steps-info-miles-walked-today').text(user.activityRecord.find(activity => {
      return (activity.date === todayDate && activity.userId === user.id)
    }).calculateMiles(userRepository));
  },

  displayUserSleepAverages(user, todayDate) {
    $('#sleep-calendar-hours-average-weekly').text(user.calculateSleepAverages(todayDate, user.sleepHoursRecord, 'hours'));
    $('#sleep-calendar-quality-average-weekly').text(user.calculateSleepAverages(todayDate, user.sleepQualityRecord, 'quality'));
    $('#sleep-info-hours-average-alltime').text(user.hoursSleptAverage);
    $('#sleep-info-quality-average-alltime').text(user.sleepQualityAverage);
  },

  displayUserDropDownInfo(user) {
    $('#dropdown-goal').text(`DAILY STEP GOAL | ${user.dailyStepGoal}`);
    $('#dropdown-email').text(`EMAIL | ${user.email}`);
    $('#dropdown-name').text(user.name.toUpperCase());
  },

  displayUserFirstName(user) {
    $('#header-name').text(`${user.getFirstName()}'S `);
    this.displayUserDropDownInfo(user);
  },

  displayDailyOunces(dailyOz, user, sortedHydrationDataByDate) {
    dailyOz.forEach((day, i) => {
      day.innerText = user.addDailyOunces(Object.keys(sortedHydrationDataByDate[i])[0])
    })
  },

  updateTrendingStepDays(user) {
    user.findTrendingActivityDays(user.trendingStepDays, 'steps', 'step');
    $('.trending-steps-phrase-container').html(`<p class='trend-line'>${user.trendingStepDays[0]}</p>`);
  },

  updateTrendingStairsDays(user) {
    user.findTrendingActivityDays(user.trendingStairsDays, 'flightsOfStairs', 'climbing');
    $('.trending-stairs-phrase-container').html(`<p class='trend-line'>${user.trendingStairsDays[0]}</p>`);
  },

  getUserSleepToday(sleepData, user, todayDate) {
    $('#sleep-info-quality-today').text(sleepData.find(sleep => {
      return sleep.userID === user.id && sleep.date === todayDate;
    }).sleepQuality);
    $('#sleep-user-hours-today').text(sleepData.find(sleep => {
      return sleep.userID === user.id && sleep.date === todayDate;
    }).hoursSlept);
  },

  getUserHydrationToday(hydrationData, user, todayDate) {
    $('#hydration-user-ounces-today').text(hydrationData.find(hydration => {
      return hydration.userID === user.id && hydration.date === todayDate;
    }).numOunces);
    $('#hydration-info-glasses-today').text(hydrationData.find(hydration => {
      return hydration.userID === user.id && hydration.date === todayDate;
    }).numOunces / 8);
  }

}

export default domUpdates
