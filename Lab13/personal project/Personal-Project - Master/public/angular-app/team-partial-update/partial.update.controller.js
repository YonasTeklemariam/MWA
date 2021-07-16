angular
  .module("meanSoccer")
  .controller("TeamPartialUpdateController", TeamPartialUpdateController);

// function _getStarsArray(rating) {
//   return new Array(rating);
// }

function TeamPartialUpdateController(TeamsDataFactory, $routeParams) {
  const vm = this;
  const teamId = $routeParams.id;

  vm.partialUpdate = function () {
    console.log("full update received");

    const postData = {
      name: vm.name,
      country: vm.country,
      city: vm.city,
      leagueName: vm.leagueName,
      dateEstablished: vm.dateEstablished,
      stadiumName: vm.stadiumName,
      netWorth: vm.netWorth,
    };
    TeamsDataFactory.partialUpdate(teamId, postData)
      .then(function (response) {
        console.log("Team updated partially");
      })
      .catch(function (error) {
        console.log("Error while partial updating ", error);
      });
  };
}
