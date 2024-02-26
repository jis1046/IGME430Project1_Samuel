const workouts = {
  Exercise: [

  ],
};

const respondJSON = (request, response, status, object) => {
  const headers = {
    'Content-Type': 'application/json',
  };

  // send response with json object
  response.writeHead(status, headers);
  response.write(JSON.stringify(object));
  response.end();
};

const respondJSONMeta = (request, response, status) => {
  const headers = {
    'Content-Type': 'application/json',
  };

  // send response with header
  response.writeHead(status, headers);
  response.end();
};

const getWorkouts = (request, response) => {
  const responseJSON = {
    workouts: Object.values(workouts),
  };

  return respondJSON(request, response, 200, responseJSON);
};

const getWorkoutMeta = (request, response) => respondJSONMeta(request, response, 200);

const addWorkout = (request, response, body) => {
  // default json message
  const responseJSON = {
    message: 'Name, exercise, and reps are both required',
    id: 'missingParams',
  };

  if (!body.name || !body.exercise || !body.reps) {
    respondJSON.id = 'missingParams';
    // 400 status code if the request is missing a name, age, or both
    return respondJSON(request, response, 400, responseJSON);
  }
  // status code if workouts updated
  let responseCode = 204;

  if (!workouts[body.name]) {
    // status code if adding new workouts
    responseCode = 201;
    workouts[body.name] = {};
  }

  // add or update fields for this workouts
  workouts[body.name].name = body.name;
  workouts[body.name].date = body.date;
  workouts[body.name].exercise = body.exercise;
  workouts[body.name].reps = body.reps;

  if (responseCode === 201) {
    responseJSON.message = 'Created Successfully';
    return respondJSON(request, response, responseCode, responseJSON);
  }

  // 204 status code
  return respondJSONMeta(request, response, responseCode);
};


const notFound = (request, response) => {
  // create error message for response
  const responseJSON = {
    message: 'The page you are looking for was not found',
    id: 'notFound',
  };

  // return 404 status code with error message
  respondJSON(request, response, 404, responseJSON);
};

const notFoundMeta = (request, response) => respondJSONMeta(request, response, 404);

module.exports = {
  getWorkouts,
  getWorkoutMeta,
  addWorkout,
  notFound,
  notFoundMeta,
};
