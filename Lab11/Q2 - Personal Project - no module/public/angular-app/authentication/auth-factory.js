angular.module("meanSoccer").factory("AuthFactory", AuthFactory);

function AuthFactory() {
  let auth = false;
  return {
    auth: auth,
  };
}
