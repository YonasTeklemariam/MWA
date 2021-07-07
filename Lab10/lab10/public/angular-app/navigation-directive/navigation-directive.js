angular.module("meanJobSearch").directive("jobsNavigation", JobsNavigation);

function JobsNavigation() {
  return {
    restrict: "E",
    templateUrl: "angular-app/navigation-directive/navigation-directive.html",
  };
}
