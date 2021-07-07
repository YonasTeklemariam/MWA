angular.module("meanJobSearch").directive("jobRating", JobRating);

function JobRating() {
  return {
    restrict: "E",
    templateUrl: "angular-app/job-rating/rating.html",
    bindToController: true,
    controller: "JobController",
    controllerAs: "vm",
    // scope: {},
  };
}
