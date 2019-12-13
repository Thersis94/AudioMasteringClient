import React, { Component } from 'react'
import ThingListContext from '../../contexts/ThingListContext'
import TracksApiService from '../../services/thing-api-service'
import { Section } from '../../components/Utils/Utils'
import TrackListItem from '../../components/ThingListItem/ThingListItem'
import './TracksListPage.css'

export default class TracksListPage extends Component {
  static contextType = ThingListContext

  componentDidMount() {
    this.context.clearError()
    TracksApiService.getTracks()
      .then(this.context.setThingList)
      .catch(this.context.setError)
  }

  renderTracks() {
    const { tracksList = [] } = this.context
    return tracksList.map(track =>
      <TrackListItem
        key={track.id}
        track={track}
      />
    )
  }

  render() {
    const { error } = this.context
    return (
      <Section list className='ThingListPage'>
        {error
          ? <p className='red'>There was an error, try again</p>
          : this.renderThings()}
      </Section>
    )
  }
}
