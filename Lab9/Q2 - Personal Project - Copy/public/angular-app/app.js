angular.module("meanSoccer", ["ngRoute"]).config(config);

function config($routeProvider) {
  $routeProvider
    .when("/", {
      templateUrl: "angular-app/teams-display/teams.html",
      controller: "TeamsController",
      controllerAs: "vm",
    })
    .when("/premierLeague/:teamId", {
      templateUrl: "angular-app/team-detail-display/team-detail.html",
      controller: "TeamMembersController",
      controllerAs: "vm",
    });
}
