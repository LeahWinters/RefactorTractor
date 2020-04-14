import './css/base.scss';
import './css/styles.scss';
import $ from 'jquery';
import fetchData from './index.js';
import UserRepository from './UserRepository';
import User from './User';
import Activity from './Activity';
import Hydration from './Hydration';
import Sleep from './Sleep';
import domUpdates from './DomUpdates';

let matchActivityID;

let userData;
let sleepData;
let activityData;
let hydrationData;
let userRepository;
let user;
let sleep;
let activity;
let hydration;
let newUser;
let sortedHydrationDataByDate;
let todayDate;
let currentUserId;

let onloadHandler = () => {
  let randomNumber = Math.floor(Math.random() * 49) + 1;

  userRepository = new UserRepository();

  userData.forEach(singleUser => {
    newUser = new User(singleUser);
    userRepository.users.push(newUser);
  });

  activityData.forEach(acti => {
    activity = new Activity(acti, userRepository);
  });
  
  sleepData.forEach(datum => {
    sleep = new Sleep(datum, userRepository);
  });

  hydrationData.forEach(datum => {
    hydration = new Hydration(datum, userRepository);
  });

  user = userRepository.users[randomNumber];
  todayDate = "2019/09/22";

  userHandler();
  userRepoHandler();
  activityHandler();
}

const activityHandler = () => {
  domUpdates.displayStairsInfo(matchActivityID);
  domUpdates.displayMainStairsCard(matchActivityID);
  domUpdates.displayStepsInfo(matchActivityID);
  domUpdates.displayMainStepsCard(matchActivityID);
}

const userHandler = () => {
  currentUserId = returnUserId();
  matchActivityID = domUpdates.findActivityID(activityData, user, todayDate);
  sortHydrationData();
  domUpdates.displayUserFirstName(user);
  domUpdates.displayDailyOunces(dailyOz, user, sortedHydrationDataByDate);
  domUpdates.getUserHydrationToday(hydrationData, user, todayDate);
  domUpdates.getUserSleepToday(sleepData, user, todayDate);
  domUpdates.displayUserSleepAverages(user, todayDate);
  domUpdates.displayStairsCalendar(user, todayDate);
  domUpdates.displayStepsCalendar(user, todayDate);
  domUpdates.showWalkedMiles(user, todayDate, userRepository);
  domUpdates.displayFriendsStepsWeekly(user, userRepository, todayDate);
  domUpdates.displayFriendsActivity(user);
  domUpdates.friendStepStyling();
}

const userRepoHandler = () => {
  domUpdates.displayFriendsStairs(userRepository, todayDate);
  domUpdates.displayFriendsHydration(userRepository, todayDate);
  domUpdates.displayFriendsSleep(userRepository, todayDate);
  domUpdates.displayFriendsStepsAverages(userRepository, todayDate);
}

fetchData().then(data => {
    userData = data.userData;
    sleepData = data.sleepData;
    activityData = data.activityData;
    hydrationData = data.hydrationData
  })
  .then(onloadHandler)
  .catch(error => console.log(error));

let dailyOz = document.querySelectorAll('.daily-oz');

const handleTrendingStepDays = () => {
  domUpdates.updateTrendingStepDays(user)
}

const handleTrendingStairsDays = () => {
  domUpdates.updateTrendingStairsDays(user)
}

const postSleepInfo = () => {
  if ($('#sleep-hours-input').val() === '' || $('#sleep-hours-input').val() > 24 || $('#sleep-quality-input').val() === '' || $('#sleep-quality-input').val() > 5) {
    alert('You need to enter a valid number!')
  } else {
    fetch('https://fe-apps.herokuapp.com/api/v1/fitlit/1908/sleep/sleepData', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          'userID': currentUserId,
          'date': todayDate,
          'hoursSlept': Number($('#sleep-hours-input').val()),
          'sleepQuality': Number($('#sleep-quality-input').val()),
        })
      })
      .then(response => response.json())
      .catch(error => console.error(error));
    $('#sleep-hours-input').val('');
    $('#sleep-quality-input').val('');
    $('#post-sleep-dropdown').addClass('hide');
    alert('Successful submission!')
  }
}

const postActivityInfo = () => {
  if ($('#steps-input').val() === '' || $('#minutes-input').val() === '') {
    alert('You need to enter a valid number!')
  } else {
    fetch('https://fe-apps.herokuapp.com/api/v1/fitlit/1908/activity/activityData', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          'userID': currentUserId,
          'date': todayDate,
          'numSteps': Math.round($('#steps-input').val()),
          'minutesActive': Math.round($('#minutes-input').val()),
          'flightsOfStairs': Math.round($('#stairs-input').val())
        })
      })
      .then(response => response.json())
      .catch(error => console.error(error));
    $('#steps-input').val('');
    $('#minutes-input').val('');
    $('#stairs-input').val('');
    $('#post-activity-dropdown').addClass('hide');
    alert('Successful submission!')
  }
}

const postHydrationInfo = () => {
  if ($('#ounces-input').value() === '') {
    alert('You need to enter a valid number!')
  } else {
    fetch('https://fe-apps.herokuapp.com/api/v1/fitlit/1908/hydration/hydrationData', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          'userID': currentUserId,
          'date': todayDate,
          'numOunces': Number($('#ounces-input').val())
        })
      })
      .then(response => response.json())
      .catch(error => console.error(error));
    $('#ounces-input').val('');
    $('#post-hydration-dropdown').addClass('hide');
    alert('Successful submission!')
  }
}

const showActivityDropdown = () => {
    if ($(event.target).is('.post-activity-button')) {
    $('#post-activity-dropdown').toggleClass('hide');
    $('#post-hydration-dropdown').addClass('hide');
    $('#post-sleep-dropdown').addClass('hide');
    $('#user-info-dropdown').addClass('hide');
  }
}

const showHydrationDropdown = () => {
    if ($(event.target).is('.post-hydration-button')) {
    $('#post-hydration-dropdown').toggleClass('hide');
    $('#post-activity-dropdown').addClass('hide');
    $('#post-sleep-dropdown').addClass('hide');
    $('#user-info-dropdown').addClass('hide');
  }
}

const showSleepDropdown = () => {
   if ($(event.target).is('.post-sleep-button')) {
    $('#post-sleep-dropdown').toggleClass('hide');
    $('#post-activity-dropdown').addClass('hide');
    $('#post-hydration-dropdown').addClass('hide');
    $('#user-info-dropdown').addClass('hide');
  } 
}

const showUserDropdown = () => {
    if ($(event.target).is('#profile-button')) {
    $('#user-info-dropdown').toggleClass('hide');
    $('#post-activity-dropdown').addClass('hide');
    $('#post-hydration-dropdown').addClass('hide');
    $('#post-sleep-dropdown').addClass('hide');
  }
}

const showUpdateDropdown = () => {
  showActivityDropdown();
  showHydrationDropdown();
  showSleepDropdown();
  showUserDropdown()
}

const flipCard = (cardToHide, cardToShow) => {
  cardToHide.addClass('hide');
  cardToShow.removeClass('hide');
}

const flipStepsCards = () => {
  if ($(event.target).is('.steps-info-button')) {
    flipCard($('#steps-main-card'), $('#steps-info-card'));
  }
  if ($(event.target).is('.steps-friends-button')) {
    flipCard($('#steps-main-card'), $('#steps-friends-card'));
  }
  if ($(event.target).is('.steps-trending-button')) {
    flipCard($('#steps-main-card'), $('#steps-trending-card'));
  }
  if ($(event.target).is('.steps-calendar-button')) {
    flipCard($('#steps-main-card'), $('#steps-calendar-card'));
  }
  if ($(event.target).is('.steps-go-back-button')) {
    flipCard($(event.target.parentNode), $('#steps-main-card'));
  }
}

const flipHydrationCards = () => {
  if ($(event.target).is('.hydration-info-button')) {
    flipCard($('#hydration-main-card'), $('#hydration-info-card'));
  }
  if ($(event.target).is('.hydration-friends-button')) {
    flipCard($('#hydration-main-card'), $('#hydration-friends-card'));
  }
  if ($(event.target).is('.hydration-calendar-button')) {
    flipCard($('#hydration-main-card'), $('#hydration-calendar-card'));
  }
  if ($(event.target).is('.hydration-go-back-button')) {
    flipCard($(event.target.parentNode), $('#hydration-main-card'));
  }
}

const flipStairsCards = () => {
  if ($(event.target).is('.stairs-info-button')) {
    flipCard($('#stairs-main-card'), $('#stairs-info-card'));
  }
  if ($(event.target).is('.stairs-friends-button')) {
    flipCard($('#stairs-main-card'), $('#stairs-friends-card'));
  }
  if ($(event.target).is('.stairs-trending-button')) {
    flipCard($('#stairs-main-card'), $('#stairs-trending-card'));
  }
  if ($(event.target).is('.stairs-calendar-button')) {
    flipCard($('#stairs-main-card'), $('#stairs-calendar-card'));
  }
  if ($(event.target).is('.stairs-go-back-button')) {
    flipCard($(event.target.parentNode), $('#stairs-main-card'));
  }
}

const flipSleepCards = () => {
  if ($(event.target).is('.sleep-info-button')) {
    flipCard($('#sleep-main-card'), $('#sleep-info-card'));
  }
  if ($(event.target).is('.sleep-friends-button')) {
    flipCard($('#sleep-main-card'), $('#sleep-friends-card'));
  }
  if ($(event.target).is('.sleep-calendar-button')) {
    flipCard($('#sleep-main-card'), $('#sleep-calendar-card'));
  }
  if ($(event.target).is('.sleep-go-back-button')) {
    flipCard($(event.target.parentNode), $('#sleep-main-card'));
  }
}

const showInfo = () => {
  flipStepsCards();
  flipHydrationCards();
  flipStairsCards();
  flipSleepCards()
}

$('.header').click(showUpdateDropdown);
$('main').click(showInfo);
$('.stairs-trending-button').click(handleTrendingStairsDays);
$('.steps-trending-button').click(handleTrendingStepDays);
$('#submit-hydration-button').click(postHydrationInfo);
$('#submit-activity-button').click(postActivityInfo);
$('#submit-sleep-button').click(postSleepInfo);

//user A+
// const updateTrendingStairsDays() {
//   user.findTrendingActivityDays(user.trendingStairsDays, 'flightsOfStairs', 'climbing');
//   $('.trending-stairs-phrase-container').html(`<p class='trend-line'>${user.trendingStairsDays[0]}</p>`);
// }

//user
// function updateTrendingStepDays() {
//   user.findTrendingActivityDays(user.trendingStepDays, 'steps', 'step');
//   $('.trending-steps-phrase-container').html(`<p class='trend-line'>${user.trendingStepDays[0]}</p>`);
// }

//user 
// const displayDailyOunces = () => {
//   dailyOz.forEach((day, i) => {
//     day.innerText = user.addDailyOunces(Object.keys(sortedHydrationDataByDate[i])[0])
//   })
// }

//STAYS HERE
const sortHydrationData = () => {
  sortedHydrationDataByDate = user.ouncesRecord.sort((a, b) => {
    if (Object.keys(a)[0] > Object.keys(b)[0]) {
      return -1;
    }
    if (Object.keys(a)[0] < Object.keys(b)[0]) {
      return 1;
    }
    return 0;
  });
}

// const displayUserFirstName = () => {
//   $('#header-name').text(`${user.getFirstName()}'S `);
//   displayUserDropDownInfo(user);
// }

//STAYS HERE
const returnUserId = () => {
  return user.id;
}


// user A+
// const displayUserDropDownInfo = () => {
//   $('#dropdown-goal').text(`DAILY STEP GOAL | ${user.dailyStepGoal}`);
//   $('#dropdown-email').text(`EMAIL | ${user.email}`);
//   $('#dropdown-name').text(user.name.toUpperCase());
// }

// probably dont need it
// const findFriendsNames = () => {
//   user.findFriendsNames(userRepository.users);
// }

// hydration A+
// const getUserHydrationToday = () => {
//   $('#hydration-user-ounces-today').text(hydrationData.find(hydration => {
//     return hydration.userID === user.id && hydration.date === todayDate;
//   }).numOunces);
//   $('#hydration-info-glasses-today').text(hydrationData.find(hydration => {
//     return hydration.userID === user.id && hydration.date === todayDate;
//   }).numOunces / 8);
// }

//sleep A+
// const getUserSleepToday = () => {
//   $('#sleep-info-quality-today').text(sleepData.find(sleep => {
//     return sleep.userID === user.id && sleep.date === todayDate;
//   }).sleepQuality);
//   $('#sleep-user-hours-today').text(sleepData.find(sleep => {
//     return sleep.userID === user.id && sleep.date === todayDate;
//   }).hoursSlept);
// }

//user A+
// const displayUserSleepAverages = () => {
//   $('#sleep-calendar-hours-average-weekly').text(user.calculateSleepAverages(todayDate, user.sleepHoursRecord, 'hours'));
//   $('#sleep-calendar-quality-average-weekly').text(user.calculateSleepAverages(todayDate, user.sleepQualityRecord, 'quality'));
//   $('#sleep-info-hours-average-alltime').text(user.hoursSleptAverage);
//   $('#sleep-info-quality-average-alltime').text(user.sleepQualityAverage);
// }

//user
// const showWalkedMiles = () => {
//   $('#steps-info-miles-walked-today').text(user.activityRecord.find(activity => {
//     return (activity.date === todayDate && activity.userId === user.id)
//   }).calculateMiles(userRepository));
// }
//user A+ Might not need
// const displayStairsCalendar = () => {
//   $('#stairs-calendar-flights-average-weekly').text(user.calculateAverageWeeklyExercise(todayDate, 'flightsOfStairs'));
//   $('#stairs-calendar-stairs-average-weekly').text((user.calculateAverageWeeklyExercise(todayDate, 'flightsOfStairs') * 12).toFixed(0));
// }

//user do we want to combine this later? A+
// const displayStairsTrending = () => {
//   $('.stairs-trending-button').click(function () {
//     user.findTrendingStairsDays();
//     $('.trending-stairs-phrase-container').html(`<p class='trend-line'>${user.trendingStairsDays[0]}</p>`);
//   });
// }

//user A+
// const displayStepsCalendar = () => {
//   $('#steps-calendar-total-active-minutes-weekly').text(user.calculateAverageWeeklyExercise(todayDate, 'minutesActive'));
//   $('#steps-calendar-total-steps-weekly').text(user.calculateAverageWeeklyExercise(todayDate, 'steps'));
// }

//user do we want to combine later COME BACK HERE!!!
// const displayStepsTrending = () => {
//   $('.steps-trending-button').click(function () {
//     user.findTrendingStepDays();
//     $('.trending-steps-phrase-container').html(`<p class='trend-line'>${user.trendingStepDays[0]}</p>`);
//   });
// }

//user A+
// const displayFriendsStepsWeekly = () => {
//   user.findFriendsTotalStepsForWeek(userRepository.users, todayDate);
// }

//user A+
// const displayFriendsActivity = () => {
//   user.friendsActivityRecords.forEach(friend => {
//     $('#dropdown-friends-steps-container').append(`
//     <p class='dropdown-p friends-steps'>${friend.firstName} | ${friend.totalWeeklySteps}</p>
//     `);
//   });
// }

// const displayFriendsStairs = () => {
//   $('#stairs-friend-flights-average-today').text((userRepository.calculateAverageStairs(todayDate, 'flightsOfStairs') / 12).toFixed(1))
// }

// This appears to be used with displayFriendsActivity? why isnt color showing for green and red sometimes
// const friendStepStyling = () => {
//   let friendsStepsParagraphs = document.querySelectorAll('.friends-steps');

//   friendsStepsParagraphs.forEach(paragraph => {
//     if (friendsStepsParagraphs[0] === paragraph) {
//       paragraph.classList.add('green-text');
//     }
//     if (friendsStepsParagraphs[friendsStepsParagraphs.length - 1] === paragraph) {
//       paragraph.classList.add('red-text');
//     }
//     if (paragraph.innerText.includes('YOU')) {
//       paragraph.classList.add('yellow-text');
//     }
//   });
// }

//userRepo A +

// const displayFriendsHydration = () => {
//   $('#hydration-friend-ounces-today').text(userRepository.calculateAverageDailyWater(todayDate));
// }

// const displayFriendsSleep = () => {
//   $('#sleep-friend-longest-sleeper').text(userRepository.users.find(user => {
//     return user.id === userRepository.getLongestSleepers(todayDate)
//   }).getFirstName());
//   $('#sleep-friend-worst-sleeper').text(userRepository.users.find(user => {
//     return user.id === userRepository.getWorstSleepers(todayDate)
//   }).getFirstName());
// }


//userRepo A+
// const displayFriendsStepsAverages = () => {
//   $('#steps-friend-active-minutes-average-today').text(userRepository.calculateAverageMinutesActive(todayDate, 'minutesActive'));
//   $('#steps-friend-average-step-goal').text(`${userRepository.calculateAverageStepGoal()}`);
//   $('#steps-friend-steps-average-today').text(userRepository.calculateAverageSteps(todayDate, 'steps'));
// }

//Probably dont need
// const gatherUserInfo = () => {
//   activityData.find(activity => {
//     return activity.userID === user.id && activity.date === todayDate;
//   });
// }

//activity A+
// const displayStairsInfo = () => {
//   $('#stairs-info-flights-today').text(matchActivityID.flightsOfStairs);
// }

// const findActivityID = () => {
//   return activityData.find(activity => {
//     return activity.userID === user.id && activity.date === todayDate;
//   })
// } 

//activity A+
// const displayMainStairsCard = () => {
//   $('#stairs-user-stairs-today').text(matchActivityID.flightsOfStairs * 12)
// }

//activity A+
// const displayStepsInfo = () => {
//   $('#steps-info-active-minutes-today').text(matchActivityID.minutesActive);
// }

//activity ?? wtf is numsteps <- this is on the activity data A+
// const displayMainStepsCard = () => {
//   $('#steps-user-steps-today').text(matchActivityID.numSteps);
// }