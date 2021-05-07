import React from 'react';

// assets
import hero from './../../assets/hero.jpg';

// style
import {
  ScHero,
  ScTaglineArea
} from './styles';

function Home() {
  return (
    <>
      <ScHero 
        style={{
          backgroundImage: `url( ${ hero } )`,
          backgroundSize: `cover`,
          backgroundPosition: `center 43%`
          }}></ScHero>

      <ScTaglineArea>
        <h2>Keep track of your beloved bikes built</h2>
      </ScTaglineArea>
    </>
  )
}

export default Home;