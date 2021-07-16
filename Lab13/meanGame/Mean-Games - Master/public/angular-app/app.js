angular.module("meanGames", ["ngRoute", "angular-jwt"]).config(config).run(run);

function config($routeProvider, $httpProvider) {
  $httpProvider.interceptors.push("AuthInterceptor");
  $routeProvider
    .when("/", {
      templateUrl: "angular-app/welcome/welcome.html",
      access: { restricted: false },
    })
    .when("/games", {
      templateUrl: "angular-app/game-list/game-list.html",
      controller: "GamesController",
      controllerAs: "vm",
      access: { restricted: false },
    })
    .when("/games/:id", {
      templateUrl: "angular-app/game-display/game.html",
      controller: "GameController",
      controllerAs: "vm",
      access: { restricted: false },
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
