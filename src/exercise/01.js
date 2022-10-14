// useState: greeting
// http://localhost:3000/isolated/exercise/01.js

import * as React from 'react'
import {useState} from 'react'

//function Greeting(props) {
function Greeting({initialName = ''}) {
  const [name, setName] = useState(initialName)

  function handleChange(event) {
    const inputValue = event.target.value
    setName(inputValue)
  }

  return (
    <div>
      <form>
        <label htmlFor="name">Name: </label>
        <input value={name} onChange={handleChange} id="name" />
      </form>
      {name ? <strong>Hello {name}</strong> : 'Please type your name'}
    </div>
  )
}

function App() {
  return <Greeting initialName="Jan Vogt" />
}

export default App
