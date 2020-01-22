import React, { Component } from "../../../node_modules/react";
import { Link } from "../../../node_modules/react-router-dom";
import config from "../../config";
import { Button } from "../Utils/Utils";
import "./UserPage.css";
import TracksApiService from "../../services/tracks-api-service";
import Loader from 'react-loader-spinner'

class userPage extends Component {
  constructor() {
    super();
    this.state = {
      tracks: [],
      downloading: false
    };
    this.downloadTrack = this.downloadTrack.bind(this)
    this.setDownloadingState = this.setDownloadingState.bind(this)
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

  downloadTrack(ev) {
    const trackName = ev.target.value;
    const currentUser = window.localStorage.currentUser;
    return fetch(`${config.API_ENDPOINT}/audio-master/download`, {
      headers: {
        userName: currentUser,
        trackName: trackName
      }
    })
      .then(res => {
        this.setState({
          downloading: true
        })
        return res.blob();
      })
      .then(blob => {
        this.setState({
          downloading: false
        })
        let url = window.URL.createObjectURL(blob);
        let a = document.createElement("a");
        a.href = url;
        a.download = trackName;
        a.click();
      })
      .catch(err => console.error(err));
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

  setDownloadingState() {
    if(this.state.downloading) {
      return'downloading'
    }
    else
      return'not-downloading'
  }

  renderTracks() {
    const tracksList = this.state.tracks;
    return tracksList.map(track => (
      <span className="track-span" key={track.id} track={track.name}>
        <h3 className="track-name">{track.name}</h3>
        <span className="track-buttons-span">
          <Button
            className="download-button"
            type="edit"
            value={track.name}
            onClick={this.downloadTrack}
          >
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
        <span className={`${this.setDownloadingState()}`}>
        <Loader type="Audio" color="white" height={100} width={100} />
        <h2 className='downloading-message'>Please wait while we get your file ready for you. This could take a minute so grab a cup of tea...</h2>
        </span>
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
