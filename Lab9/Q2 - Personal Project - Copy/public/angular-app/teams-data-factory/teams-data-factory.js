angular.module("meanSoccer").factory("TeamsDataFactory", TeamsDataFactory);

function TeamsDataFactory($http) {
  return {
    getAll: getAllTeams,
    getOne: getOneTeam,
    addOne: addOneGame,
    deleteOne: deleteOneGame,
  };

  function getAllTeams() {
    return $http.get("/api/premierLeague").then(complete).catch(failed);
  }
  function getOneTeam(teamId) {
    return $http
      .get("/api/premierLeague/" + teamId)
      .then(complete)
      .catch(failed);
  }
  function deleteOneGame(teamId) {
    return $http
      .delete("/api/premierLeague/" + teamId)
      .then(complete)
      .catch(failed);
  }
  function addOneGame(team) {
    return $http.post("/api/premierLeague", team).then(complete).catch(failed);
  }
  function complete(response) {
    return response.data;
  }
  function failed(error) {
    return error.status.statusText;
  }
}
