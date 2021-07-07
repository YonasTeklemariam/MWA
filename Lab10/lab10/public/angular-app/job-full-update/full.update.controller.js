angular
  .module("meanJobSearch")
  .controller("JobFullUpdateController", JobFullUpdateController);

// function _getStarsArray(rating) {
//   return new Array(rating);
// }

function JobFullUpdateController(JobsDataFactory, $routeParams) {
  const vm = this;
  const jobId = $routeParams.id;

  //   JobsDataFactory.getOne(vm.jobId).then(function (response) {
  //     vm.job = response;
  //     // vm.stars = _getStarsArray(vm.game.rate);
  //   });

  vm.fullUpdate = function () {
    console.log("full update received");
    const postData = {
      title: vm.title,
      salary: vm.salary,
      description: vm.description,
      experience: vm.experience,
      postDate: vm.postDate,
      skills: vm.skills,
      address: vm.address,
      lng: vm.longitude,
      lat: vm.latitude,
    };
    JobsDataFactory.fullUpdate(jobId, postData)
      .then(function (response) {
        console.log("Job updated fully");
      })
      .catch(function (error) {
        console.log("Error while fully updating ", error);
      });
  };
}
