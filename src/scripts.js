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

  // sleepData.forEach(datum => {
    // sleep = new Sleep(datum, userRepository);
  // });

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
  // displayStairsTrending();
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

let dailyOz = $('.daily-oz');
let dropdownEmail = $('#dropdown-email');
let dropdownFriendsStepsContainer = $('#dropdown-friends-steps-container');
let dropdownGoal = $('#dropdown-goal');
let dropdownName = $('#dropdown-name');
let headerName = $('#header-name');
let hydrationCalendarCard = $('#hydration-calendar-card');
let hydrationFriendOuncesToday = $('#hydration-friend-ounces-today');
let hydrationFriendsCard = $('#hydration-friends-card');
let hydrationInfoCard = $('#hydration-info-card');
let hydrationInfoGlassesToday = $('#hydration-info-glasses-today');
let hydrationMainCard = $('#hydration-main-card');
let hydrationUserOuncesToday = $('#hydration-user-ounces-today');
// let mainPage = document.querySelector('main');
let profileButton = $('#profile-button');
let sleepCalendarCard = $('#sleep-calendar-card');
let sleepCalendarHoursAverageWeekly = $('#sleep-calendar-hours-average-weekly');
let sleepCalendarQualityAverageWeekly = $('#sleep-calendar-quality-average-weekly');
let sleepFriendLongestSleeper = $('#sleep-friend-longest-sleeper');
let sleepFriendsCard = $('#sleep-friends-card');
let sleepFriendWorstSleeper = $('#sleep-friend-worst-sleeper');
let sleepInfoCard = $('#sleep-info-card');
let sleepInfoHoursAverageAlltime = $('#sleep-info-hours-average-alltime');
let sleepInfoQualityAverageAlltime = $('#sleep-info-quality-average-alltime');
let sleepInfoQualityToday = $('#sleep-info-quality-today');
let sleepMainCard = $('#sleep-main-card');
let sleepUserHoursToday = $('#sleep-user-hours-today');
let stairsCalendarCard = $('#stairs-calendar-card');
let stairsCalendarFlightsAverageWeekly = $('#stairs-calendar-flights-average-weekly');
let stairsCalendarStairsAverageWeekly = $('#stairs-calendar-stairs-average-weekly');
let stepsMainCard = $('#steps-main-card');
let stepsInfoCard = $('#steps-info-card');
let stepsFriendsCard = $('#steps-friends-card');
let stepsTrendingCard = $('#steps-trending-card');
let stepsCalendarCard = $('#steps-calendar-card');
let stairsFriendFlightsAverageToday = $('#stairs-friend-flights-average-today');
let stairsFriendsCard = $('#stairs-friends-card');
let stairsInfoCard = $('#stairs-info-card');
let stairsInfoFlightsToday = $('#stairs-info-flights-today');
let stairsMainCard = $('#stairs-main-card');
// let stairsTrendingButton = document.querySelector('.stairs-trending-button');
let stairsTrendingCard = $('#stairs-trending-card');
let stairsUserStairsToday = $('#stairs-user-stairs-today');
let stepsCalendarTotalActiveMinutesWeekly = $('#steps-calendar-total-active-minutes-weekly');
let stepsCalendarTotalStepsWeekly = $('#steps-calendar-total-steps-weekly');
let stepsFriendAverageStepGoal = $('#steps-friend-average-step-goal');
let stepsInfoActiveMinutesToday = $('#steps-info-active-minutes-today');
let stepsInfoMilesWalkedToday = $('#steps-info-miles-walked-today');
let stepsFriendActiveMinutesAverageToday = $('#steps-friend-active-minutes-average-today');
let stepsFriendStepsAverageToday = $('#steps-friend-steps-average-today');
// let stepsTrendingButton = document.querySelector('.steps-trending-button');
let stepsUserStepsToday = $('#steps-user-steps-today');
let trendingStepsPhraseContainer = $('.trending-steps-phrase-container');
let trendingStairsPhraseContainer = $('.trending-stairs-phrase-container');
let userInfoDropdown = $('#user-info-dropdown');
// let header = document.querySelector('.header');
let postActiviyButton = $('.post-activity-button');
let postHydrationButton = $('.post-hydration-button');
let postSleepButton = $('.post-sleep-button');
let postActivityDropdown = $('#post-activity-dropdown');
let postHydrationDropdown = $('#post-hydration-dropdown');
let postSleepDropdown = $('#post-sleep-dropdown');
let dropDownHolder = $('#all-drop-downs');
let ouncesInput = $('#ounces-input');
// let submitHydration = document.querySelector('#submit-hydration-button');
let stepsInput = $('#steps-input');
let stairsInput = $('#stairs-input');
let minutesInput = $('#minutes-input');
// let submitActivity = document.querySelector('#submit-activity-button')
let sleepHoursInput = $('#sleep-hours-input');
let sleepQualityInput = $('#sleep-quality-input');
// let submitSleep = document.querySelector('#submit-sleep-button');

$('.header').on('click', showUpdateDropdown);
$('main').on('click', showInfo);
$('.stairs-trending-button').on('click', updateTrendingStairsDays);
$('.steps-trending-button').on('click', updateTrendingStepDays);
$('#submit-hydration-button').on('click', postHydrationInfo);
$('#submit-activity-button').on('click', postActivityInfo);
$('#submit-sleep-button').on('click', postSleepInfo);

// POST
function postSleepInfo() {
  if (!sleepHoursInput.value || !sleepQualityInput.value) {
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
      'hoursSlept': (+sleepHoursInput.value).toFixed(1),
      'sleepQuality': (+sleepQualityInput.value).toFixed(1),
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
  if(!stepsInput.value || !minutesInput.value) {
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
  if(!ouncesInput.value) {
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

// const hydrationValidation = () => {
  // if(ouncesInput.value !== '') {

  // } else {
  //   alert('You need to enter a valid number!')
  // }
// }
// postHydrationInfo()
// let ouncesLabel = document.querySelector('#ounces-label')
// ouncesLabel.style.color('#54C6BE')
// if value is blank, label has color
// on keyup change color

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
  trendingStairsPhraseContainer.innerHTML = `<p class='trend-line'>${user.trendingStairsDays[0]}</p>`;
}

//user
function updateTrendingStepDays() {
  user.findTrendingActivityDays(user.trendingStepDays, 'steps', 'step');
  trendingStepsPhraseContainer.innerHTML = `<p class='trend-line'>${user.trendingStepDays[0]}</p>`;
}

//user
function displayDailyOunces() {
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
  headerName.innerText = `${user.getFirstName()}'S `;
  displayUserDropDownInfo();
}

const returnUserId = () => {
  return user.id;
}


// user A+
const displayUserDropDownInfo = () => {
  dropdownGoal.innerText = `DAILY STEP GOAL | ${user.dailyStepGoal}`;
  dropdownEmail.innerText = `EMAIL | ${user.email}`;
  dropdownName.innerText = user.name.toUpperCase();
}

const findFriendsNames = () => {
  user.findFriendsNames(userRepository.users);
}

// hydration A+
const getUserHydrationToday = () => {
  hydrationUserOuncesToday.innerText = hydrationData.find(hydration => {
    return hydration.userID === user.id && hydration.date === todayDate;
  }).numOunces;
  hydrationInfoGlassesToday.innerText = hydrationData.find(hydration => {
    return hydration.userID === user.id && hydration.date === todayDate;
  }).numOunces / 8;
}

//sleep A+
const getUserSleepToday = () => {
  sleepInfoQualityToday.innerText = sleepData.find(sleep => {
    return sleep.userID === user.id && sleep.date === todayDate;
  }).sleepQuality;
  sleepUserHoursToday.innerText = sleepData.find(sleep => {
    return sleep.userID === user.id && sleep.date === todayDate;
  }).hoursSlept;
}

//user A+
const displayUserSleepAverages = () => {
  sleepCalendarHoursAverageWeekly.innerText = user.calculateSleepAverages(todayDate, user.sleepHoursRecord, 'hours');
  sleepCalendarQualityAverageWeekly.innerText = user.calculateSleepAverages(todayDate, user.sleepQualityRecord, 'quality');
  sleepInfoHoursAverageAlltime.innerText = user.hoursSleptAverage;
  sleepInfoQualityAverageAlltime.innerText = user.sleepQualityAverage;
}

//user
const showWalkedMiles = () => {
  stepsInfoMilesWalkedToday.innerText = user.activityRecord.find(activity => {
    return (activity.date === todayDate && activity.userId === user.id)
  }).calculateMiles(userRepository);
}
//user A+
const displayStairsCalendar = () => {
  stairsCalendarFlightsAverageWeekly.innerText = user.calculateAverageWeeklyExercise(todayDate, 'flightsOfStairs');
  stairsCalendarStairsAverageWeekly.innerText = (user.calculateAverageWeeklyExercise(todayDate, 'flightsOfStairs') * 12).toFixed(0);
}

//user do we want to combine this later? A+
const displayStairsTrending = () => {
  stairsTrendingButton.addEventListener('click', function() {
    user.findTrendingStairsDays();
    trendingStairsPhraseContainer.innerHTML = `<p class='trend-line'>${user.trendingStairsDays[0]}</p>`;
  });
}

//user A+
const displayStepsCalendar = () => {
  stepsCalendarTotalActiveMinutesWeekly.innerText = user.calculateAverageWeeklyExercise(todayDate, 'minutesActive');
  stepsCalendarTotalStepsWeekly.innerText = user.calculateAverageWeeklyExercise(todayDate, 'steps');
}

//user do we want to combine later COME BACK HERE!!!
const displayStepsTrending = () => {
  stepsTrendingButton.addEventListener('click', function() {
    user.findTrendingStepDays();
    trendingStepsPhraseContainer.innerHTML = `<p class='trend-line'>${user.trendingStepDays[0]}</p>`;
  });
}

//user A+
const displayFriendsStepsWeekly = () => {
  user.findFriendsTotalStepsForWeek(userRepository.users, todayDate);
}

//user A+
const displayFriendsActivity = () => {
  user.friendsActivityRecords.forEach(friend => {
    dropdownFriendsStepsContainer.innerHTML += `
    <p class='dropdown-p friends-steps'>${friend.firstName} | ${friend.totalWeeklySteps}</p>
    `;
  });
}

const displayFriendsStairs = () => {
  stairsFriendFlightsAverageToday.innerText = (userRepository.calculateAverageStairs(todayDate, 'flightsOfStairs') / 12).toFixed(1);
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
    hydrationFriendOuncesToday.innerText = userRepository.calculateAverageDailyWater(todayDate);
}

const displayFriendsSleep = () => {
  sleepFriendLongestSleeper.innerText = userRepository.users.find(user => {
    return user.id === userRepository.getLongestSleepers(todayDate)
  }).getFirstName();
  sleepFriendWorstSleeper.innerText = userRepository.users.find(user => {
    return user.id === userRepository.getWorstSleepers(todayDate)
  }).getFirstName();
}


//userRepo A+
const displayFriendsStepsAverages = () => {
  stepsFriendActiveMinutesAverageToday.innerText = userRepository.calculateAverageMinutesActive(todayDate, 'minutesActive');
  stepsFriendAverageStepGoal.innerText = `${userRepository.calculateAverageStepGoal()}`;
  stepsFriendStepsAverageToday.innerText = userRepository.calculateAverageSteps(todayDate, 'steps');
}



//activity A+
const displayStairsInfo = () => {
  stairsInfoFlightsToday.innerText = activityData.find(activity => {
    return activity.userID === user.id && activity.date === todayDate;
  }).flightsOfStairs;
}

//activity A+
const displayMainStairsCard = () => {
  stairsUserStairsToday.innerText = activityData.find(activity => {
    return activity.userID === user.id && activity.date === todayDate;
  }).flightsOfStairs * 12;
}

//activity A+
const displayStepsInfo = () => {
  stepsInfoActiveMinutesToday.innerText = activityData.find(activity => {
    return activity.userID === user.id && activity.date === todayDate;
  }).minutesActive;
}

//activity ?? wtf is numsteps <- this is on the activity data A+
const displayMainStepsCard = () => {
  stepsUserStepsToday.innerText = activityData.find(activity => {
    return activity.userID === user.id && activity.date === todayDate;
  }).numSteps;
}
