angular.module("meanJobSearch", ["ngRoute", "angular-jwt"]).config(config);

function config($routeProvider) {
  $routeProvider
    .when("/", {
      templateUrl: "angular-app/welcome/welcome.html",
    })
    .when("/jobs", {
      templateUrl: "angular-app/job-list/job-list.html",
      controller: "JobsController",
      controllerAs: "vm",
    })
    .when("/jobs/:id", {
      templateUrl: "angular-app/job-display/job.html",
      controller: "JobController",
      controllerAs: "vm",
    })
    .when("/addJob", {
      templateUrl: "angular-app/job-add/jobAdd.html",
      controller: "JobsAddController",
      controllerAs: "vm",
    })
    .when("/jobs/fullUpdate/:id", {
      templateUrl: "angular-app/job-full-update/fullUpdate.html",
      controller: "JobFullUpdateController",
      controllerAs: "vm",
    })
    .when("/jobs/partialUpdate/:id", {
      templateUrl: "angular-app/job-partial-update/partialUpdate.html",
      controller: "JobPartialUpdateController",
      controllerAs: "vm",
    })
    .when("/search", {
      templateUrl: "angular-app/register/register.html",
      controller: "RegisterController",
      controllerAs: "vm",
    });
}
