angular.module("meanSoccer").factory("AuthInterceptor", AuthInterceptor);
function AuthInterceptor($window) {
  return {
    request: request,
  };

  function request(config) {
    config.headers = config.headers || {};
    if ($window.sessionStorage.teken) {
      config.headers.Authorization = "Bearer " + $window.sessionStorage.toke;
    }
    return config;
  }
}
