import React, { Component } from "react";
import Dropzone from "../Dropzone/Dropzone";
import Progress from "../Progress/Progress";
import "./Upload.css";
import { Link } from "react-router-dom";
import Config from "../../config";
//import TracksApiService from "../../services/tracks-api-service";

class Upload extends Component {
  constructor(props) {
    super(props);
    this.state = {
      files: [],
      uploading: false,
      uploadProgress: {},
      successfullUploaded: false
    };
    this.onTargetAdded = this.onTargetAdded.bind(this);
    this.uploadFiles = this.uploadFiles.bind(this);
    this.sendRequest = this.sendRequest.bind(this);
    this.renderActions = this.renderActions.bind(this);
  }

  renderProgress(file) {
    const uploadProgress = this.state.uploadProgress[file.name];
    if (this.state.uploading || this.state.successfullUploaded) {
      return (
        <div className="ProgressWrapper">
          <Progress progress={uploadProgress ? uploadProgress.percentage : 0} />
          <img
            className="CheckIcon"
            alt="done"
            src="baseline-check_circle_outline-24px.svg"
            style={{
              opacity:
                uploadProgress && uploadProgress.state === "done" ? 0.5 : 0
            }}
          />
        </div>
      );
    }
  }

  renderActions() {
    if (this.state.successfullUploaded) {
      return (
        <button
          className="button"
          onClick={() =>
            this.setState({ files: [], successfullUploaded: false })
          }
        >
          Clear
        </button>
      );
    } else {
      return (
        <button
          className="button"
          disabled={this.state.files.length < 0 || this.state.uploading}
          onClick={this.uploadFiles}
        >
          Upload
        </button>
      );
    }
  }

  sendRequest(file) {
    return new Promise((resolve, reject) => {
      const req = new XMLHttpRequest();

      req.upload.addEventListener("progress", event => {
        if (event.lengthComputable) {
          const copy = { ...this.state.uploadProgress };
          copy[file.name] = {
            state: "pending",
            percentage: (event.loaded / event.total) * 100
          };
          this.setState({ uploadProgress: copy });
        }
      });

      req.upload.addEventListener("load", event => {
        const copy = { ...this.state.uploadProgress };
        copy[file.name] = { state: "done", percentage: 100 };
        this.setState({ uploadProgress: copy });
        resolve(req.response);
      });

      req.upload.addEventListener("error", event => {
        const copy = { ...this.state.uploadProgress };
        copy[file.name] = { state: "error", percentage: 0 };
        this.setState({ uploadProgress: copy });
        reject(req.response);
      });

      const params = {
        userName: window.localStorage.currentUser
      };

      const formData = new FormData();
      formData.append("file", file, file.fileState + "-" + file.name);
      formData.append("userName", JSON.stringify(params));

      req.open("POST", `${Config.API_ENDPOINT}/audio-master`);
      req.setRequestHeader("userName", params.userName);
      req.send(formData);
    });
  }

  async uploadFiles() {
    this.setState({ uploadProgress: {}, uploading: true });
    const promises = [];

    this.state.files.forEach(file => {
      file.user = window.localStorage.currentUser;
      promises.push(this.sendRequest(file));
    });
    try {
      await Promise.all(promises);

      this.setState({ successfullUploaded: true, uploading: false });
    } catch (e) {
      this.setState({ successfullUploaded: true, uploading: false });
    }
  }

  onTargetAdded(files) {
    files[0].fileState = "Raw";

    this.setState(prevState => ({
      files: prevState.files.concat(files)
    }));
  }

  render() {
    return (
      <div className="Upload">
        <div className='home-download-demo-link'>
        <Link to="/" style={{ textDecoration: "none" }} className="button">
          Home
        </Link>
        <a className='demo-track-link' href="http://sono-works.com/en/downloads" target="_blank">Downloadbale Demo Tracks</a>
        
        </div>
        <div className="Content">
          <div className="Dropzone-div">
            <Dropzone
              onFilesAdded={this.onTargetAdded}
              disabled={this.state.uploading || this.state.successfullUploaded}
            />
          </div>
          <div className="Files">
            {this.state.files.map(file => {
              return (
                <div key={file.name} className="Row">
                  <span className="Filename">
                    {file.name + " " + file.fileState}
                  </span>
                  {this.renderProgress(file)}
                </div>
              );
            })}
          </div>
        </div>
        <div className="Actions">{this.renderActions()}</div>
      </div>
    );
  }
}

export default Upload;
