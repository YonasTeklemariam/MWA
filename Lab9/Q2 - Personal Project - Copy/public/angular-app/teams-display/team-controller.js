angular.module("meanSoccer").controller("TeamsController", TeamsController);
function TeamsController(TeamsDataFactory) {
  const vm = this;
  vm.title = "Mean Soccer App";
  TeamsDataFactory.getAll().then(function (response) {
    vm.teams = response;
  });

  vm.addTeam = function () {
    const postData = {
      name: vm.newTeamName,
      country: vm.newTeamCountry,
      city: vm.newTeamYear,
      leagueName: vm.newTeamLeagueName,
      dateEstablished: vm.newTeamDateEstablished,
      stadiumName: vm.newTeamStadiumName,
      netWorth: vm.newTeamNetWorth,
    };
    if (vm.teamForm.$valid) {
      // call rest api
      TeamsDataFactory.addOne(postData)
        .then(function (response) {
          console.log("Game saved");
        })
        .catch(function (error) {
          console.log("Error while saving ", error);
        });
    }
  };
}
