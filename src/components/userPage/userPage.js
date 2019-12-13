import React, { Component } from "react";
import Upload from "../Upload/Upload";
import { Route, Link } from "react-router-dom";
import TracksApiService from '../../services/tracks-api-service'
import config from '../../config'
import { Button, Input, Required } from "../Utils/Utils";

class userPage extends Component {
   constructor() {
       super()
       this.state = {
         tracks: []
       }
   }

  componentDidMount() {
    const currentUser = window.localStorage.currentUser
    fetch(`${config.API_ENDPOINT}/audio-master`, {
      headers: {
        'userName': window.localStorage.currentUser
      },
    })
    .then(res => res.json())
    .then(data => {
      data.map(track => {
        const tracks = this.state.tracks
        tracks.push(track)
        this.setState({
          tracks: tracks
        })
      })
    })
  }

  downloadTrack = ev => {
    //ev.prventDefault();
    const trackName = ev.target.value
    fetch(`${config.API_ENDPOINT}/audio-master/download`, {
      headers: {
        'userName': window.localStorage.currentUser,
        'trackName': trackName
      },
    })
    .then(function(res) {
      return res.blob();
    })
    .then(blob => {
      let url = window.URL.createObjectURL(blob);
      let a = document.createElement('a');
      a.href = url;
      a.download = trackName;
      a.click();
    }).catch(err => console.error(err));
  }

  deleteTrack = ev => {
    const trackName = ev.target.value
    const requestOptions = {
      method: 'DELETE',
      headers: {
        'userName': window.localStorage.currentUser,
        'trackName': trackName
      }
    }
    const trackList = this.state.tracks
    for(let i = 0;i<trackList.length;i++) {
      if(trackList[i].name === trackName) {
        trackList.splice(i, 1)
      }
    }
    fetch(`${config.API_ENDPOINT}/audio-master`, requestOptions)
    .then(res => res.json())
    .then(res => {
      console.log(res)
    })
    this.setState({
      tracks: trackList
    })
  }

  renderTracks() {
    const tracksList = this.state.tracks
    return tracksList.map(track =>
      <span
        key={track.id}
        track={track.name}
      >
        <Button type="submit" value={track.name} onClick={this.deleteTrack}>
          DELETE
        </Button>
        <Button type="submit" value={track.name} onClick={this.downloadTrack}>
          {track.name}
        </Button>
      </span>
    )
  }


  render() {
    return (
      <div className="user-page-wrap">
        <Link to="/upload" style={{ textDecoration: 'none' }} className="button">Master a file</Link>
        
        {this.renderTracks()}
      </div>
    );
  }
}

export default userPage;
