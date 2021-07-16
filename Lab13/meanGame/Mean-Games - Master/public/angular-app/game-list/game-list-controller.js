angular.module("meanGames").controller("GamesController", GamesController);

function GamesController(GamesDataFactory, AuthFactory) {
  const vm = this;
  vm.title = "MEAN Games App";
  GamesDataFactory.getAll().then(function (response) {
    vm.games = response;
  });

  vm.isLoggedIn = function () {
    return AuthFactory.auth;
  };

  vm.addGame = function () {
    const postData = {
      title: vm.newGameTitle,
      price: vm.newGamePrice,
      year: vm.newGameYear,
      minPlayers: vm.newGameMinPlayers,
      maxPlayers: vm.newGameMaxPlayers,
      minAge: vm.newGameMinAge,
      rate: vm.newGameRating,
      designers: vm.newGameDesigner,
    };
    if (vm.gameForm.$valid) {
      // call rest api
      GamesDataFactory.addOne(postData)
        .then(function (response) {
          console.log("Game saved");
        })
        .catch(function (error) {
          console.log("Error while saving ", error);
        });
    }
  };
}
