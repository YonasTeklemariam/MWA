angular
  .module("meanJobSearch")
  .controller("JobsAddController", JobsAddController);

function JobsAddController(JobsDataFactory) {
  const vm = this;
  vm.title = "Job Search App";
  vm.addJob = function () {
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
    if (vm.jobForm.$valid) {
      // call rest api
      JobsDataFactory.addOne(postData)
        .then(function (response) {
          console.log("Job saved");
        })
        .catch(function (error) {
          console.log("Error while saving ", error);
        });
    }
  };
}
