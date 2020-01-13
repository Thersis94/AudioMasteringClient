import config from "../config";
import TokenService from "./token-service";

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
        console.log(res);
      });
  },
  getThing(thingId) {
    return fetch(`${config.API_ENDPOINT}/things/${thingId}`, {
      headers: {
        authorization: `bearer ${TokenService.getAuthToken()}`
      }
    }).then(res =>
      !res.ok ? res.json().then(e => Promise.reject(e)) : res.json()
    );
  },
  getThingReviews(thingId) {
    return fetch(`${config.API_ENDPOINT}/things/${thingId}/reviews`, {
      headers: {
        authorization: `bearer ${TokenService.getAuthToken()}`
      }
    }).then(res =>
      !res.ok ? res.json().then(e => Promise.reject(e)) : res.json()
    );
  },
  postReview(thingId, text, rating) {
    return fetch(`${config.API_ENDPOINT}/reviews`, {
      method: "POST",
      headers: {
        "content-type": "application/json",
        authorization: `bearer ${TokenService.getAuthToken()}`
      },
      body: JSON.stringify({
        thing_id: thingId,
        rating,
        text
      })
    }).then(res =>
      !res.ok ? res.json().then(e => Promise.reject(e)) : res.json()
    );
  }
};

export default TracksApiService;
