const fetchData = () => {
  let userData = fetch('https://fe-apps.herokuapp.com/api/v1/fitlit/1908/users/userData')
  .then((response) => response.json())
  .catch(error => console.log(error));
  let sleepData = fetch('https://fe-apps.herokuapp.com/api/v1/fitlit/1908/sleep/sleepData')
  .then((response) => response.json())
  .catch(error => console.log(error));
  let activityData = fetch('https://fe-apps.herokuapp.com/api/v1/fitlit/1908/activity/activityData')
  .then((response) => response.json())
  .catch(error => console.log(error));
  let hydrationData = fetch('https://fe-apps.herokuapp.com/api/v1/fitlit/1908/hydration/hydrationData')
  .then((response) => response.json())
  .catch(error => console.log(error));
  return Promise.all([userData, sleepData, activityData, hydrationData])
  .then(response => {
    let newDataObj = {};
    newDataObj.userData = response[0].userData;
    newDataObj.sleepData = response[1].sleepData;
    newDataObj.activityData = response[2].activityData;
    newDataObj.hydrationData = response[3].hydrationData;
    return newDataObj;
  })
  .catch(error => console.log(error));
}



export default fetchData;
