import React, { Component } from "../../../node_modules/react";
import { Link } from "../../../node_modules/react-router-dom";
import config from "../../config";
import { Button, Input, Required } from "../Utils/Utils";
import './userPage.css'

class userPage extends Component {
  constructor() {
    super();
    this.state = {
      tracks: []
    };
  }

  componentDidMount() {
    const currentUser = window.localStorage.currentUser;
    fetch(`${config.API_ENDPOINT}/audio-master`, {
      headers: {
        userName: window.localStorage.currentUser
      }
    })
      .then(res => res.json())
      .then(data => {
        data.map(track => {
          const tracks = this.state.tracks;
          tracks.push(track);
          this.setState({
            tracks: tracks
          });
        });
      });
  }

  downloadTrack = ev => {
    console.time('download')
    const trackName = ev.target.value;
    fetch(`${config.API_ENDPOINT}/audio-master/download`, {
      headers: {
        userName: window.localStorage.currentUser,
        trackName: trackName
      }
    })
      .then(function(res) {
        console.timeLog('first then')
        return res.blob();
      })
      .then(blob => {
        console.timeLog('second then')
        let url = window.URL.createObjectURL(blob);
        let a = document.createElement("a");
        console.timeLog('creating window URL')
        a.href = url;
        a.download = trackName;
        a.click();
        console.timeEnd('returning blob')
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
    fetch(`${config.API_ENDPOINT}/audio-master`, requestOptions)
      .then(res => res.json())
      .then(res => {
        console.log(res);
      });
    this.setState({
      tracks: trackList
    });
  };

  renderTracks() {
    const tracksList = this.state.tracks;
    return tracksList.map(track => (
      <span className='track-span' key={track.id} track={track.name}>
        <Button className="download-button" type="submit" value={track.name} onClick={this.downloadTrack}>
          {track.name}
        </Button>
        <span className="track-buttons-span" >
        <Button className="delete-button" type="delete" value={track.name} onClick={this.deleteTrack}>
          DELETE
        </Button>
        <Button className="edit-button" type="edit" value={track.name}>
          EDIT
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
