angular
  .module("meanSoccer")
  .controller("TeamMembersController", TeamMembersController);
function TeamMembersController(TeamsDataFactory, $routeParams, AuthFactory) {
  const vm = this;
  const teamId = $routeParams.teamId;
  vm.teamId = teamId;
  TeamsDataFactory.getOne(teamId).then(function (response) {
    vm.team = response;
  });

  vm.isLoggedIn = function () {
    return AuthFactory.auth;
  };

  vm.delete = function () {
    console.log("delete received");
    TeamsDataFactory.deleteOne(teamId)
      .then(function (response) {
        console.log("Team deleted");
      })
      .catch(function (error) {
        console.log("Error while deleting ", error);
      });
  };
}
