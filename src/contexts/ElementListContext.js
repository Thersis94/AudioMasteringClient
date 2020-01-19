import React, { Component } from 'react'

const ElementListContext = React.createContext({
  elementList: [],
  error: null,
  setError: () => {},
  clearError: () => {},
  setElementList: () => {},
})
export default ElementListContext

export class ElementListProvider extends Component {
  state = {
    elementList: [],
    error: null,
  };

  setElementList = elementList => {
    this.setState({ elementList })
  }

  setError = error => {
    console.error(error)
    this.setState({ error })
  }

  clearError = () => {
    this.setState({ error: null })
  }

  render() {
    const value = {
      elementList: this.state.elementList,
      error: this.state.error,
      setError: this.setError,
      clearError: this.clearError,
      setElementList: this.setElementList,
    }
    return (
      <ElementListContext.Provider value={value}>
        {this.props.children}
      </ElementListContext.Provider>
    )
  }
}
