angular.module("meanSoccer").directive("teamsNavigation", TeamsNavigation);

function TeamsNavigation() {
  return {
    restrict: "E",
    templateUrl: "angular-app/navigation-directive/navigation-directive.html",
  };
}
