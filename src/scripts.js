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

const returnUserId = () => {
  return user.id;
}
