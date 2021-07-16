angular
  .module("meanGames")
  .controller("RegisterController", RegisterController);

function RegisterController(UsersDataFactory) {
  const vm = this;
  vm.register = function () {
    if (!vm.username || !vm.password || !vm.passwordRepeat || !vm.name) {
      vm.err = "Please make sure you fill all the fields";
    } else {
      if (vm.password !== vm.passwordRepeat) {
        vm.err = "Please make sure the passwords match";
      } else {
        const newUser = {
          username: vm.username,
          password: vm.password,
          name: vm.name,
        };
        console.log(newUser);
        console.log("Here");
        UsersDataFactory.register(newUser)
          .then(function (result) {
            console.log("Register done");
            vm.message = "Successful registration, please login.";
            vm.err = "";
          })
          .catch(function (error) {
            console.log("Error ", error);
            vm.err = error;
          });
      }
    }
  };
}
