angular
  .module("meanSoccer")
  .controller("SoccerAddController", SoccerAddController);

function SoccerAddController(TeamsDataFactory) {
  const vm = this;
  vm.title = "Soccer App";

  vm.addTeam = function () {
    console.log(vm.name + ", " + vm.city);
    const postData = {
      name: vm.name,
      country: vm.country,
      city: vm.city,
      leagueName: vm.leagueName,
      dateEstablished: vm.dateEstablished,
      stadiumName: vm.stadiumName,
      netWorth: vm.netWorth,
    };
    console.log(" the new team is " + postData.name + ", " + postData.city);
    if (vm.teamForm.$valid) {
      // call rest api
      TeamsDataFactory.addOne(postData)
        .then(function (response) {
          console.log("Team saved");
        })
        .catch(function (error) {
          console.log("Error while saving ", error);
        });
    }
  };
}
