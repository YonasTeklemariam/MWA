angular
  .module("meanSoccer")
  .controller("TeamFullUpdateController", TeamFullUpdateController);

// function _getStarsArray(rating) {
//   return new Array(rating);
// }

function TeamFullUpdateController(TeamsDataFactory, $routeParams) {
  const vm = this;
  const teamId = $routeParams.id;

  vm.fullUpdate = function () {
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
    TeamsDataFactory.fullUpdate(teamId, postData)
      .then(function (response) {
        console.log("Team updated fully");
      })
      .catch(function (error) {
        console.log("Error while fully updating ", error);
      });
  };
}
