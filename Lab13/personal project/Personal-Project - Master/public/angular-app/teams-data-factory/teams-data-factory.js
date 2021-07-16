angular.module("meanSoccer").factory("TeamsDataFactory", TeamsDataFactory);

function TeamsDataFactory($http) {
  return {
    getAll: getAllTeams,
    getOne: getOneTeam,
    addOne: addOneTeam,
    deleteOne: deleteOneTeam,
    fullUpdate: fullUpdateOneTeam,
    partialUpdate: partialUpdateOneTeam,
    searchTeam: searchTeamByName,
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
  function deleteOneTeam(teamId) {
    return $http
      .delete("/api/premierLeague/" + teamId)
      .then(complete)
      .catch(failed);
  }
  function addOneTeam(team) {
    return $http.post("/api/premierLeague", team).then(complete).catch(failed);
  }

  function fullUpdateOneTeam(id, job) {
    return $http
      .put("/api/premierLeague/" + id, job)
      .then(complete)
      .catch(failed);
  }
  function partialUpdateOneTeam(id, job) {
    return $http
      .patch("/api/premierLeague/" + id, job)
      .then(complete)
      .catch(failed);
  }
  function searchTeamByName(name) {
    return $http
      .post("/api/premierLeague/search/" + name)
      .then(complete)
      .catch(failed);
  }

  function complete(response) {
    return response.data;
  }
  function failed(error) {
    return error.status.statusText;
  }
}
