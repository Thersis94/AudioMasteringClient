import config from "../config";

// place holder for when/if I decide to implement request token verification with each request
// import TokenService from "./token-service";

const TracksApiService = {
  getTracks(currentUser) {
    return fetch(`${config.API_ENDPOINT}/audio-master`, {
      headers: {
        userName: currentUser
      }
    }).then(res => res.json());
  },
  deleteTrack(requestOptions) {
    return fetch(`${config.API_ENDPOINT}/audio-master`, requestOptions)
      .then(res => res.json())
      .then(res => {
        //Future update: implement successful delete popup
        // console.log(res);
      });
  }
};

export default TracksApiService;
