angular.module("meanJobSearch").controller("JobController", JobController);

// function _getStarsArray(rating) {
//   return new Array(rating);
// }

function JobController(JobsDataFactory, $routeParams) {
  const vm = this;
  vm.jobId = $routeParams.id;
  let fullUpdate = false;
  let partialUpdate = false;
  JobsDataFactory.getOne(vm.jobId).then(function (response) {
    vm.job = response;
    // vm.stars = _getStarsArray(vm.game.rate);
  });

  vm.fullUpdate = function () {
    console.log("full update received");
    JobsDataFactory.fullUpdate(vm.jobId, vm.model)
      .then(function (response) {
        console.log("Job updated fully");
      })
      .catch(function (error) {
        console.log("Error while fully updating ", error);
      });
  };

  vm.partialUpdate = function () {
    console.log("partial update received");
    JobsDataFactory.partialUpdate(vm.jobId, vm.model)
      .then(function (response) {
        console.log("Job updated patially");
      })
      .catch(function (error) {
        console.log("Error while partial updating ", error);
      });
  };

  vm.delete = function () {
    console.log("delete received");
    JobsDataFactory.deleteOne(vm.jobId)
      .then(function (response) {
        console.log("Job deleted");
      })
      .catch(function (error) {
        console.log("Error while deleting ", error);
      });
  };
}
