angular.module("meanGames").controller("LoginController", LoginController);

function LoginController(
  UsersDataFactory,
  AuthFactory,
  $window,
  jwtHelper,
  $location
) {
  const vm = this;
  vm.loggedinUser = "";
  vm.isLoggedIn = function () {
    return AuthFactory.auth;
  };

  vm.login = function () {
    if (vm.username && vm.password) {
      const user = {
        username: vm.username,
        password: vm.password,
      };

      UsersDataFactory.login(user)
        .then(function (result) {
          console.log(result);
          $window.sessionStorage.token = result.token;
          AuthFactory.auth = true;
          // Get payload from token
          const token = $window.sessionStorage.token;
          const decodedToken = jwtHelper.decodeToken(token);
          vm.loggedinUser = decodedToken.name;
          vm.username = "";
          vm.password = "";
        })
        .catch(function (error) {
          console.log(error);
        });
    }
  };
  vm.logout = function () {
    AuthFactory.auth = false;
    delete $window.sessionStorage.token;
    $location.path("/");
  };
  vm.isActiveTab = function (url) {
    const currentPath = $location.path().split("/")[1];
    return url === currentPath ? "active" : "";
  };
}
