import React, { Component } from "react";
import './HomePage.css';


export default class HomePage extends Component {
    render() {
      return (
        <span className="home-page-app-description">
          <h2 className="home-page-title">How does it work?</h2>
          <img
            className="heatmap-img"
            src="https://raw.githubusercontent.com/Thersis94/AudioMasteringClient/master/Pictures/image_3KCWKFSBPZC55YAEK4TUGEW3JPZNOH7K.png"
            alt="Demonstrating a heatmap."
          />
          <p className="mastering-explanation">
            When you upload a audio file a heatmap is created. The heatmap is a
            representation of all of the frequencies and their volume at any given
            point in the song. The AI then uses a combination of Equalization,
            Stereo polarization, and Limiting to match the heatmap of your song to
            the average heatmaps of thousands of hit songs.
          </p>
          
          <section>
            <h2 className='file-types-header'>Compatible File Types</h2>
            <span className="file-types-lists">
              <section>
                <h3 className='file-type-header'>WAV</h3>
                <ul>
                  <li>44.1kz</li>
                  <li>16bit</li>
                  <li>Bit rate: 1411</li>
                </ul>
              </section>
              <section>
                <h3 className='file-type-header'>AIFF</h3>
                <ul>
                  <li>44.1kz</li>
                  <li>16bit</li>
                  <li>Bit rate: 1411</li>
                </ul>
              </section>
              <section>
                <h3 className='file-type-header'>PCM</h3>
                <ul>
                  <li>44.1kz</li>
                  <li>16bit</li>
                  <li>Bit rate: 1411</li>
                </ul>
              </section>
            </span>
          </section>
        </span>
      );
    }
  }
  