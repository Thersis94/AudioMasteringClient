import React, { Component } from 'react'

export const nullElement = {
  author: {},
  tags: [],
}

const AppContext = React.createContext({
  element: nullElement,
  reviews: [],
  error: null,
  setError: () => {},
  clearError: () => {},
  setTrack: () => {},
  clearElement: () => {},
  setReviews: () => {},
  addReview: () => {},

})

export default AppContext

export class ElementProvider extends Component {
  state = {
    element: nullElement,
    error: null,
  };

  setError = error => {
    console.error(error)
    this.setState({ error })
  }

  clearError = () => {
    this.setState({ error: null })
  }

  setTrack = track => {
    this.setState({ track })
  }

  setReviews = reviews => {
    this.setState({ reviews })
  }

  clearElement = () => {
    this.setElement(nullElement)
    this.setReviews([])
  }

  addReview = review => {
    this.setReviews([
      ...this.state.reviews,
      review
    ])
  }

  render() {
    const value = {
      element: this.state.element,
      reviews: this.state.reviews,
      error: this.state.error,
      setError: this.setError,
      clearError: this.clearError,
      setTrack: this.setTrack,
      setReviews: this.setReviews,
      clearElement: this.clearElement,
      addReview: this.addReview,
    }
    return (
      <AppContext.Provider value={value}>
        {this.props.children}
      </AppContext.Provider>
    )
  }
}
