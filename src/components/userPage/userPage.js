import React, { Component } from "../../../node_modules/react";
import { Link } from "../../../node_modules/react-router-dom";
//import config from "../../config";
import { Button } from "../Utils/Utils";
import "./userPage.css";
import TracksApiService from "../../services/tracks-api-service";


class userPage extends Component {
  constructor() {
    super();
    this.state = {
      tracks: []
    };
  }

  componentDidMount() {
    const currentUser = window.localStorage.currentUser;
    TracksApiService.getTracks(currentUser).then(data => {
      data.map(track => {
        const tracks = this.state.tracks;
        tracks.push(track);
        return this.setState({
          tracks: tracks
        });
      });
    });
  }

  downloadTrack = ev => {
    const trackName = ev.target.value;
    const currentUser = window.localStorage.currentUser;
    TracksApiService.downloadTrack(trackName, currentUser);
  };

  deleteTrack = ev => {
    const trackName = ev.target.value;
    const requestOptions = {
      method: "DELETE",
      headers: {
        userName: window.localStorage.currentUser,
        trackName: trackName
      }
    };
    const trackList = this.state.tracks;
    for (let i = 0; i < trackList.length; i++) {
      if (trackList[i].name === trackName) {
        trackList.splice(i, 1);
      }
    }
    TracksApiService.deleteTrack(requestOptions);
    this.setState({
      tracks: trackList
    });
  };

  renderTracks() {
    const tracksList = this.state.tracks;
    return tracksList.map(track => (
      <span className="track-span" key={track.id} track={track.name}>
        {/* <Button
          className="download-button"
          type="submit"
          value={track.name}
          onClick={this.downloadTrack}
        >
          {track.name}
        </Button> */}
        <h3 className="track-name">{track.name}</h3>
        <span className="track-buttons-span">
        <Button className="download-button" type="edit" value={track.name} onClick={this.downloadTrack}>
            DOWNLOAD
          </Button>
          <Button
            className="delete-button"
            type="delete"
            value={track.name}
            onClick={this.deleteTrack}
          >
            DELETE
          </Button>
          
        </span>
      </span>
    ));
  }

  render() {
    return (
      <div className="user-page-wrap">
        <Link
          to="/upload"
          style={{ textDecoration: "none" }}
          className="button"
        >
          Master a new file
        </Link>
        <div className="tracks-wrapper">{this.renderTracks()}</div>
      </div>
    );
  }
}

export default userPage;
