angular
  .module("meanSoccer")
  .controller("TeamSearchController", TeamSearchController);

function TeamSearchController(TeamsDataFactory) {
  const vm = this;

  vm.title = "Team Search App";

  vm.search = function () {
    console.log("search received");
    // console.log("title : " + vm.title);
    console.log(" front end name type: " + typeof vm.name);
    console.log("the name is " + vm.name);
    TeamsDataFactory.searchTeam(vm.name)
      .then(function (response) {
        console.log("Search found");
        vm.teams = response;
        console.log(vm.teams);
      })
      .catch(function (error) {
        console.log("Error while searching ", error);
      });
  };
}
