import React, { Component } from "react";
import './HomePage.css';


export default class HomePage extends Component {
    render() {
      return (
        <span className="home-page-app-description">
          <h2 className="home-page-title">How does it work?</h2>
          <section>
          <div className="waveform-and-description">
          <img
            className="waveform-img"
            src="https://image.freepik.com/free-vector/frequency-sound-wave-blue-color-black-background-illustration-about-music-visual-audio_72857-89.jpg"
            alt="Demonstrating a heatmap."
          />
          <p className="mastering-explanation">
            WAV files are a lossless audio format. We use Wav files for our AI mastering process to ensure that the quality of audio is not degraded from being converted back and forth to a lossy format like mp3.
          </p>
          </div>
          <div className="heatmap-and-description">
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
          </div>
          </section>      
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
          <section>
            <h3 className='attribution-section-header'>Attribution</h3>

                <h4 className='attribution-header'>Teragonaudio</h4>
                <p className='attribution-text'>Thanks to Teragon audio for supplying a open source command-line VST plugin host.</p>


                <h4 className='attribution-header'>Backgrounds</h4>
                <p className='attribution-text'>Backgrounds supplied by FreePik. www.freepik.com</p>

          </section>
        </span>
      );
    }
  }
  