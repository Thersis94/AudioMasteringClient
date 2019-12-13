import React, { Component } from "react";
import { Link } from "react-router-dom";
import './HomePage.css'

export default class HomePage extends Component {

  render() {
    return (
    <span className='home-page-app-description'>
    <h2>How does it work?</h2>
    <img src='https://raw.githubusercontent.com/Thersis94/AudioMasteringClient/master/Pictures/Heatmap.PNG' alt='Picture demonstrating a heatmap.' />
    <p>When you upload a audio file a heatmap is created. The heatmap is a representation of all of the frequencies and their volume at any given point in the song. The AI then uses a combination of Equalization, Stereo polarization, and Limiting to match the heatmap of your song to the average heatmaps of thousands of hit songs that have been released in the last 60 years.</p>
    </span>
    )
  }
}
