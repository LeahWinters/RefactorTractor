import './css/base.scss';
import './css/styles.scss';
import $ from 'jquery';
import fetchData from './index.js';
import UserRepository from './UserRepository';
import User from './User';
import Activity from './Activity';
import Hydration from './Hydration';
import Sleep from './Sleep';

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
  console.log(activity)
  sleepData.forEach(datum => {
    sleep = new Sleep(datum, userRepository);
  });

  hydrationData.forEach(datum => {
    hydration = new Hydration(datum, userRepository);
  });

  user = userRepository.users[randomNumber];
  todayDate = "2019/09/22";

  userHandlder();
  userRepoHandler();
  activityHandler();
  sleepHandler();
}

const activityHandler = () => {
  displayStairsInfo();
  displayMainStairsCard();
  displayStepsInfo();
  displayMainStepsCard();
}

const sleepHandler = () => {
  getUserSleepToday();
}

const userHandlder = () => {
  currentUserId = returnUserId();
  displayUserFirstName();
  // findFriendsNames();
  sortHydrationData();
  displayDailyOunces();
  getUserHydrationToday();
  displayUserSleepAverages();
  displayStairsCalendar();
  displayStairsTrending();
  displayStepsTrending()
  updateTrendingStairsDays();
  displayStepsCalendar();
  showWalkedMiles();
  displayFriendsStepsWeekly();
  displayFriendsActivity();
  friendStepStyling();
}

const userRepoHandler = () => {
  displayFriendsStairs();
  displayFriendsHydration();
  displayFriendsSleep();
  displayFriendsStepsAverages();
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
// let dropdownEmail = $('#dropdown-email');
// let dropdownFriendsStepsContainer = document.querySelector('#dropdown-friends-steps-container');
// let dropdownGoal = document.querySelector('#dropdown-goal');
// let dropdownName = document.querySelector('#dropdown-name');
// let headerName = document.querySelector('#header-name');
let hydrationCalendarCard = document.querySelector('#hydration-calendar-card');
// let hydrationFriendOuncesToday = document.querySelector('#hydration-friend-ounces-today');
let hydrationFriendsCard = document.querySelector('#hydration-friends-card');
let hydrationInfoCard = document.querySelector('#hydration-info-card');
// let hydrationInfoGlassesToday = document.querySelector('#hydration-info-glasses-today');
let hydrationMainCard = document.querySelector('#hydration-main-card');
// let hydrationUserOuncesToday = document.querySelector('#hydration-user-ounces-today');
// let mainPage = document.querySelector('main');
let profileButton = document.querySelector('#profile-button');
let sleepCalendarCard = document.querySelector('#sleep-calendar-card');
// let sleepCalendarHoursAverageWeekly = document.querySelector('#sleep-calendar-hours-average-weekly');
// let sleepCalendarQualityAverageWeekly = document.querySelector('#sleep-calendar-quality-average-weekly');
// let sleepFriendLongestSleeper = document.querySelector('#sleep-friend-longest-sleeper');
let sleepFriendsCard = document.querySelector('#sleep-friends-card');
// let sleepFriendWorstSleeper = document.querySelector('#sleep-friend-worst-sleeper');
let sleepInfoCard = document.querySelector('#sleep-info-card');
// let sleepInfoHoursAverageAlltime = document.querySelector('#sleep-info-hours-average-alltime');
// let sleepInfoQualityAverageAlltime = document.querySelector('#sleep-info-quality-average-alltime');
// let sleepInfoQualityToday = document.querySelector('#sleep-info-quality-today');
let sleepMainCard = document.querySelector('#sleep-main-card');
// let sleepUserHoursToday = document.querySelector('#sleep-user-hours-today');
let stairsCalendarCard = document.querySelector('#stairs-calendar-card');
// let stairsCalendarFlightsAverageWeekly = document.querySelector('#stairs-calendar-flights-average-weekly');
// let stairsCalendarStairsAverageWeekly = document.querySelector('#stairs-calendar-stairs-average-weekly');
let stepsMainCard = document.querySelector('#steps-main-card');
let stepsInfoCard = document.querySelector('#steps-info-card');
let stepsFriendsCard = document.querySelector('#steps-friends-card');
let stepsTrendingCard = document.querySelector('#steps-trending-card');
let stepsCalendarCard = document.querySelector('#steps-calendar-card');
// let stairsFriendFlightsAverageToday = document.querySelector('#stairs-friend-flights-average-today');
let stairsFriendsCard = document.querySelector('#stairs-friends-card');
let stairsInfoCard = document.querySelector('#stairs-info-card');
// let stairsInfoFlightsToday = document.querySelector('#stairs-info-flights-today');
let stairsMainCard = document.querySelector('#stairs-main-card');
// let stairsTrendingButton = document.querySelector('.stairs-trending-button');
let stairsTrendingCard = document.querySelector('#stairs-trending-card');
// let stairsUserStairsToday = document.querySelector('#stairs-user-stairs-today');
// let stepsCalendarTotalActiveMinutesWeekly = document.querySelector('#steps-calendar-total-active-minutes-weekly');
// let stepsCalendarTotalStepsWeekly = document.querySelector('#steps-calendar-total-steps-weekly');
// let stepsFriendAverageStepGoal = document.querySelector('#steps-friend-average-step-goal');
// let stepsInfoActiveMinutesToday = document.querySelector('#steps-info-active-minutes-today');
// let stepsInfoMilesWalkedToday = document.querySelector('#steps-info-miles-walked-today');
// let stepsFriendActiveMinutesAverageToday = document.querySelector('#steps-friend-active-minutes-average-today');
// let stepsFriendStepsAverageToday = document.querySelector('#steps-friend-steps-average-today');
// let stepsTrendingButton = document.querySelector('.steps-trending-button');
// let stepsUserStepsToday = document.querySelector('#steps-user-steps-today');
// let trendingStepsPhraseContainer = document.querySelector('.trending-steps-phrase-container');
// let trendingStairsPhraseContainer = document.querySelector('.trending-stairs-phrase-container');
let userInfoDropdown = document.querySelector('#user-info-dropdown');
// let header = document.querySelector('.header');
let postActiviyButton = document.querySelector('.post-activity-button');
let postHydrationButton = document.querySelector('.post-hydration-button');
let postSleepButton = document.querySelector('.post-sleep-button');
let postActivityDropdown = document.querySelector('#post-activity-dropdown');
let postHydrationDropdown = document.querySelector('#post-hydration-dropdown');
let postSleepDropdown = document.querySelector('#post-sleep-dropdown');
let dropDownHolder = document.querySelector('#all-drop-downs');
let ouncesInput = document.querySelector('#ounces-input');
// let submitHydration = document.querySelector('#submit-hydration-button');
let stepsInput = document.querySelector('#steps-input');
let stairsInput = document.querySelector('#stairs-input');
let minutesInput = document.querySelector('#minutes-input');
// let submitActivity = document.querySelector('#submit-activity-button')
let sleepHoursInput = document.querySelector('#sleep-hours-input');
let sleepQualityInput = document.querySelector('#sleep-quality-input');
// let submitSleep = document.querySelector('#submit-sleep-button');

$('.header').click(showUpdateDropdown);
$('main').on('click', showInfo);
$('.stairs-trending-button').click(updateTrendingStairsDays);
$('.steps-trending-button').click(updateTrendingStepDays);
$('#submit-hydration-button').click(postHydrationInfo);
$('#submit-activity-button').click(postActivityInfo);
$('#submit-sleep-button').click(postSleepInfo);

// POST
function postSleepInfo() {
  if (!sleepHoursInput.value || sleepHoursInput.value > 24 || !sleepQualityInput.value || sleepQualityInput.value > 5) {
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
          'hoursSlept': parseInt((+sleepHoursInput.value).toFixed(1)),
          'sleepQuality': parseInt((+sleepQualityInput.value).toFixed(1)),
        })
      })
      .then(response => response.json())
      .catch(error => console.error(error));
    sleepHoursInput.value = '';
    sleepQualityInput.value = '';
    postSleepDropdown.classList.add('hide');
    alert('Successful submission!')
  }
}

function postActivityInfo() {
  if (!stepsInput.value || !minutesInput.value) {
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
          'numSteps': Math.round(+stepsInput.value),
          'minutesActive': Math.round(+minutesInput.value),
          'flightsOfStairs': Math.round(+stairsInput.value)
        })
      })
      .then(response => response.json())
      .catch(error => console.error(error));
    stepsInput.value = '';
    minutesInput.value = '';
    stairsInput.value = '';
    postActivityDropdown.classList.add('hide');
    alert('Successful submission!')
  }
}

function postHydrationInfo() {
  if (!ouncesInput.value) {
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
          'numOunces': +ouncesInput.value
        })
      })
      .then(response => response.json())
      .catch(error => console.error(error));
    ouncesInput.value = '';
    postHydrationDropdown.classList.add('hide');
    alert('Successful submission!')
  }
}

// make sure user cant click submit until all inputs are filled out
function showUpdateDropdown() {
  if (event.target === postActiviyButton) {
    postActivityDropdown.classList.toggle('hide');
    postHydrationDropdown.classList.add('hide');
    postSleepDropdown.classList.add('hide');
    userInfoDropdown.classList.add('hide');
  }
  if (event.target === postHydrationButton) {
    postHydrationDropdown.classList.toggle('hide');
    postActivityDropdown.classList.add('hide');
    postSleepDropdown.classList.add('hide');
    userInfoDropdown.classList.add('hide');
  }
  if (event.target === postSleepButton) {
    postSleepDropdown.classList.toggle('hide');
    postActivityDropdown.classList.add('hide');
    postHydrationDropdown.classList.add('hide');
    userInfoDropdown.classList.add('hide');
  }
  if (event.target === profileButton) {
    userInfoDropdown.classList.toggle('hide');
    postActivityDropdown.classList.add('hide');
    postHydrationDropdown.classList.add('hide');
    postSleepDropdown.classList.add('hide');
  }
}

function flipCard(cardToHide, cardToShow) {
  cardToHide.classList.add('hide');
  cardToShow.classList.remove('hide');
}

function showInfo() {
  if (event.target.classList.contains('steps-info-button')) {
    flipCard(stepsMainCard, stepsInfoCard);
  }
  if (event.target.classList.contains('steps-friends-button')) {
    flipCard(stepsMainCard, stepsFriendsCard);
  }
  if (event.target.classList.contains('steps-trending-button')) {
    flipCard(stepsMainCard, stepsTrendingCard);
  }
  if (event.target.classList.contains('steps-calendar-button')) {
    flipCard(stepsMainCard, stepsCalendarCard);
  }
  if (event.target.classList.contains('hydration-info-button')) {
    flipCard(hydrationMainCard, hydrationInfoCard);
  }
  if (event.target.classList.contains('hydration-friends-button')) {
    flipCard(hydrationMainCard, hydrationFriendsCard);
  }
  if (event.target.classList.contains('hydration-calendar-button')) {
    flipCard(hydrationMainCard, hydrationCalendarCard);
  }
  if (event.target.classList.contains('stairs-info-button')) {
    flipCard(stairsMainCard, stairsInfoCard);
  }
  if (event.target.classList.contains('stairs-friends-button')) {
    flipCard(stairsMainCard, stairsFriendsCard);
  }
  if (event.target.classList.contains('stairs-trending-button')) {
    flipCard(stairsMainCard, stairsTrendingCard);
  }
  if (event.target.classList.contains('stairs-calendar-button')) {
    flipCard(stairsMainCard, stairsCalendarCard);
  }
  if (event.target.classList.contains('sleep-info-button')) {
    flipCard(sleepMainCard, sleepInfoCard);
  }
  if (event.target.classList.contains('sleep-friends-button')) {
    flipCard(sleepMainCard, sleepFriendsCard);
  }
  if (event.target.classList.contains('sleep-calendar-button')) {
    flipCard(sleepMainCard, sleepCalendarCard);
  }
  if (event.target.classList.contains('steps-go-back-button')) {
    flipCard(event.target.parentNode, stepsMainCard);
  }
  if (event.target.classList.contains('hydration-go-back-button')) {
    flipCard(event.target.parentNode, hydrationMainCard);
  }
  if (event.target.classList.contains('stairs-go-back-button')) {
    flipCard(event.target.parentNode, stairsMainCard);
  }
  if (event.target.classList.contains('sleep-go-back-button')) {
    flipCard(event.target.parentNode, sleepMainCard);
  }
}

//user A+
function updateTrendingStairsDays() {
  user.findTrendingActivityDays(user.trendingStairsDays, 'flightsOfStairs', 'climbing');
  $('.trending-stairs-phrase-container').html(`<p class='trend-line'>${user.trendingStairsDays[0]}</p>`);
}

//user
function updateTrendingStepDays() {
  user.findTrendingActivityDays(user.trendingStepDays, 'steps', 'step');
  $('.trending-steps-phrase-container').html(`<p class='trend-line'>${user.trendingStepDays[0]}</p>`);
}

//user 
const displayDailyOunces = () => {
  for (var i = 0; i < dailyOz.length; i++) {
    dailyOz[i].innerText = user.addDailyOunces(Object.keys(sortedHydrationDataByDate[i])[0])
  }
}

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

const displayUserFirstName = () => {
  $('#header-name').text(`${user.getFirstName()}'S `);
  displayUserDropDownInfo();
}

const returnUserId = () => {
  return user.id;
}


// user A+
const displayUserDropDownInfo = () => {
  $('#dropdown-goal').text(`DAILY STEP GOAL | ${user.dailyStepGoal}`);
  $('#dropdown-email').text(`EMAIL | ${user.email}`);
  $('#dropdown-name').text(user.name.toUpperCase());
}

const findFriendsNames = () => {
  user.findFriendsNames(userRepository.users);
}

// hydration A+
const getUserHydrationToday = () => {
  $('#hydration-user-ounces-today').text(hydrationData.find(hydration => {
    return hydration.userID === user.id && hydration.date === todayDate;
  }).numOunces);
  $('#hydration-info-glasses-today').text(hydrationData.find(hydration => {
    return hydration.userID === user.id && hydration.date === todayDate;
  }).numOunces / 8);
}

//sleep A+
const getUserSleepToday = () => {
  $('#sleep-info-quality-today').text(sleepData.find(sleep => {
    return sleep.userID === user.id && sleep.date === todayDate;
  }).sleepQuality);
  $('#sleep-user-hours-today').text(sleepData.find(sleep => {
    return sleep.userID === user.id && sleep.date === todayDate;
  }).hoursSlept);
}

//user A+
const displayUserSleepAverages = () => {
  $('#sleep-calendar-hours-average-weekly').text(user.calculateSleepAverages(todayDate, user.sleepHoursRecord, 'hours'));
  $('#sleep-calendar-quality-average-weekly').text(user.calculateSleepAverages(todayDate, user.sleepQualityRecord, 'quality'));
  $('#sleep-info-hours-average-alltime').text(user.hoursSleptAverage);
  $('#sleep-info-quality-average-alltime').text(user.sleepQualityAverage);
}

//user
const showWalkedMiles = () => {
  $('#steps-info-miles-walked-today').text(user.activityRecord.find(activity => {
    return (activity.date === todayDate && activity.userId === user.id)
  }).calculateMiles(userRepository));
}
//user A+
const displayStairsCalendar = () => {
  $('#stairs-calendar-flights-average-weekly').text(user.calculateAverageWeeklyExercise(todayDate, 'flightsOfStairs'));
  $('#stairs-calendar-stairs-average-weekly').text((user.calculateAverageWeeklyExercise(todayDate, 'flightsOfStairs') * 12).toFixed(0));
}

//user do we want to combine this later? A+
const displayStairsTrending = () => {
  $('.stairs-trending-button').click(function () {
    user.findTrendingStairsDays();
    $('.trending-stairs-phrase-container').text(`<p class='trend-line'>${user.trendingStairsDays[0]}</p>`);
  });
}

//user A+
const displayStepsCalendar = () => {
  $('#steps-calendar-total-active-minutes-weekly').text(user.calculateAverageWeeklyExercise(todayDate, 'minutesActive'));
  $('#steps-calendar-total-steps-weekly').text(user.calculateAverageWeeklyExercise(todayDate, 'steps'));
}

//user do we want to combine later COME BACK HERE!!!
const displayStepsTrending = () => {
  $('.steps-trending-button').click(function () {
    user.findTrendingStepDays();
    $('.trending-steps-phrase-container').text(`<p class='trend-line'>${user.trendingStepDays[0]}</p>`);
  });
}

//user A+
const displayFriendsStepsWeekly = () => {
  user.findFriendsTotalStepsForWeek(userRepository.users, todayDate);
}

//user A+
const displayFriendsActivity = () => {
  user.friendsActivityRecords.forEach(friend => {
    $('#dropdown-friends-steps-container').append(`
    <p class='dropdown-p friends-steps'>${friend.firstName} | ${friend.totalWeeklySteps}</p>
    `);
  });
}

const displayFriendsStairs = () => {
  $('#stairs-friend-flights-average-today').text((userRepository.calculateAverageStairs(todayDate, 'flightsOfStairs') / 12).toFixed(1))
}

// This appears to be used with displayFriendsActivity? why isnt color showing for green and red sometimes
const friendStepStyling = () => {
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

}

//userRepo A +

const displayFriendsHydration = () => {
  $('#hydration-friend-ounces-today').text(userRepository.calculateAverageDailyWater(todayDate));
}

const displayFriendsSleep = () => {
  // $('#sleep-friend-longest-sleeper').text(userRepository.users.find(user => {
  //   return user.id === userRepository.getLongestSleepers(todayDate)
  // })).getFirstName();
  $('#sleep-friend-longest-sleeper').text(userRepository.users.find(user => {
    return user.id === userRepository.getLongestSleepers(todayDate)
  }).getFirstName());
  $('#sleep-friend-worst-sleeper').text(userRepository.users.find(user => {
    return user.id === userRepository.getWorstSleepers(todayDate)
  }).getFirstName());
}


//userRepo A+
const displayFriendsStepsAverages = () => {
  $('#steps-friend-active-minutes-average-today').text(userRepository.calculateAverageMinutesActive(todayDate, 'minutesActive'));
  $('#steps-friend-average-step-goal').text(`${userRepository.calculateAverageStepGoal()}`);
  $('#steps-friend-steps-average-today').text(userRepository.calculateAverageSteps(todayDate, 'steps'));
}


// const gatherUserInfo = () => {
//   activityData.find(activity => {
//     return activity.userID === user.id && activity.date === todayDate;
//   });
// }

//activity A+
const displayStairsInfo = () => {
  $('#stairs-info-flights-today').text(activityData.find(activity => {
    return activity.userID === user.id && activity.date === todayDate;
  }).flightsOfStairs);
}

//activity A+
const displayMainStairsCard = () => {
  $('#stairs-user-stairs-today').text(activityData.find(activity => {
    return activity.userID === user.id && activity.date === todayDate;
  }).flightsOfStairs * 12);
}

//activity A+
const displayStepsInfo = () => {
  $('#steps-info-active-minutes-today').text(activityData.find(activity => {
    return activity.userID === user.id && activity.date === todayDate;
  }).minutesActive);
}

//activity ?? wtf is numsteps <- this is on the activity data A+
const displayMainStepsCard = () => {
  // $('#steps-user-steps-today').text(gatherUserInfo().activity.numSteps);
  $('#steps-user-steps-today').text(activityData.find(activity => {
    return activity.userID === user.id && activity.date === todayDate;
  }).numSteps);
}