angular.module("meanGames").controller("LogsController", LogsController);

function LogsController(GamesDataFactory, AuthFactory) {
  const vm = this;
  vm.title = "MEAN Games App";
  GamesDataFactory.getAllLogs().then(function (response) {
    vm.logs = response;
  });

  vm.isLoggedIn = function () {
    return AuthFactory.auth;
  };
}
