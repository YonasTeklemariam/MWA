angular
  .module("meanSoccer", ["ngRoute", "angular-jwt"])
  .config(config)
  .run(run);

function config($routeProvider, $httpProvider) {
  $httpProvider.interceptors.push("AuthInterceptor");
  $routeProvider
    .when("/", {
      templateUrl: "angular-app/welcome/welcome.html",
      access: { restricted: false },
    })
    .when("/premierLeague", {
      templateUrl: "angular-app/teams-display/teams.html",
      controller: "TeamsController",
      controllerAs: "vm",
      access: { restricted: false },
    })
    .when("/premierLeague/:teamId", {
      templateUrl: "angular-app/team-detail-display/team-detail.html",
      controller: "TeamMembersController",
      controllerAs: "vm",
      access: { restricted: false },
    })
    .when("/addTeam", {
      templateUrl: "angular-app/add-team/addTeam.html",
      controller: "SoccerAddController",
      controllerAs: "vm",
      access: { restricted: true },
    })
    .when("/teams/fullUpdate/:id", {
      templateUrl: "angular-app/team-full-update/fullUpdate.html",
      controller: "TeamFullUpdateController",
      controllerAs: "vm",
      access: { restricted: true },
    })
    .when("/teams/partialUpdate/:id", {
      templateUrl: "angular-app/team-partial-update/partialUpdate.html",
      controller: "TeamPartialUpdateController",
      controllerAs: "vm",
      access: { restricted: true },
    })
    .when("/search", {
      templateUrl: "angular-app/team-search/teamSearch.html",
      controller: "TeamSearchController",
      controllerAs: "vm",
    })
    .when("/register", {
      templateUrl: "angular-app/register/register.html",
      controller: "RegisterController",
      controllerAs: "vm",
      access: { restricted: false },
    })
    .when("/profile", {
      templateUrl: "angular-app/profile/profile.html",
      access: { restricted: true },
    })
    .otherwise({
      redirectTo: "/",
    });
}
function run($rootScope, $location, $window, AuthFactory) {
  console.log("1");
  $rootScope.$on(
    "$routeChangeStart",
    function (event, nextRoute, currentRoute) {
      console.log("2");
      if (
        nextRoute.access !== undefined &&
        nextRoute.access.restricted &&
        !AuthFactory.auth
      ) {
        // check if you may access the next route. if you are not allowed to acccess
        event.preventDefault(); // do not go to the path
        $location.path("/"); // instead send back to home
      }
    }
  );
}
