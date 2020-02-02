import React, { Component } from "react";
import ElementListContext from "../../contexts/ElementListContext";
import TracksApiService from "../../services/tracks-api-service";
import { Section } from "../../components/Utils/Utils";
import "./TracksListPage.css";

export default class TracksListPage extends Component {
  static contextType = ElementListContext;

  componentDidMount() {
    this.context.clearError();
    TracksApiService.getTracks()
      .then(this.context.setElementList)
      .catch(this.context.setError);
  }

  renderTracks() {
    const { tracksList = [] } = this.context;
    return tracksList.map(track => (
      <TrackListItem key={track.id} track={track} />
    ));
  }

  render() {
    const { error } = this.context;
    return (
      <Section list className="TrackListPage">
        {error ? (
          <p className="red">There was an error, try again</p>
        ) : (
          this.renderElements()
        )}
      </Section>
    );
  }
}
