angular.module("meanJobSearch").controller("JobsController", JobsController);

function JobsController(JobsDataFactory) {
  const vm = this;
  vm.title = "Job Search App";
  JobsDataFactory.getAll().then(function (response) {
    vm.jobs = response;
  });
}
