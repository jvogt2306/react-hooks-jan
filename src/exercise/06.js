import * as React from 'react'
import { useState, useEffect } from 'react';
import { PokemonDataView, PokemonInfoFallback, fetchPokemon, PokemonForm} from '../pokemon';

import { ErrorBoundary } from 'react-error-boundary';

const ErrorFallback = ({ error, resetErrorBoundary }) => {
  return (
    <div role="alert">
      There was an error:
      <pre style={{ whiteSpace: 'normal' }}>{error.message}</pre>
      <button onClick={resetErrorBoundary}>Try again</button>
    </div>
  )
}

function PokemonInfo({ pokemonName }) {
  const [state, setState] = useState(
    {
      status: pokemonName ? 'pending' : 'idle',
      pokemon: null,
      error: null
    });
  const { status, pokemon, error } = state;

  useEffect(() => {
    if (!pokemonName) {
      return
    }
    setState({status: 'pending' })
    fetchPokemon(pokemonName).then(
      pokemon => {
        setState({ pokemon, status: 'resolved',  })
      },
      error => {
        setState({ error, status: 'rejected' })
      }
    )
  }, [pokemonName]);

  if(status === 'idle') {
    return 'Submit a pokemon'
  }
  if(status === 'pending') {
    return <PokemonInfoFallback name={pokemonName} />
  }
  if (status === 'resolved') {
    return <PokemonDataView pokemon={pokemon} />
  }
  if (status === 'rejected') {
    throw error
  }
  throw new Error('unexpected Error - should be work')
}

function App() {
  const [pokemonName, setPokemonName] = React.useState('')

  const handleSubmit = (newPokemonName) =>  {
    setPokemonName(newPokemonName)
  }

  const handleReset = () => {
    setPokemonName('')
  }

  return (
    <div className="pokemon-info-app">
      <PokemonForm pokemonName={pokemonName} onSubmit={handleSubmit} />
      <hr />
      <div className="pokemon-info">
        <ErrorBoundary key={pokemonName} FallbackComponent={ErrorFallback} onReset={handleReset} resetKeys={[pokemonName]} >
          <PokemonInfo pokemonName={pokemonName} />
        </ErrorBoundary>
      </div>
    </div>
  )
}

export default App
