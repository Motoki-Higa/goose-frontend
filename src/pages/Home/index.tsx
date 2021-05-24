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
        <h2>Keep track of your beloved bike builds</h2>
        <p
          style={{
            fontSize: '0.875em',
            width: '90%',
            textAlign: 'center',
            margin: '24px auto 0',
            lineHeight: '1.5',
            color: '#fff'
          }}>As this app is still in development, <br />it might be deleted, or go under maintenance without notice. <br />Thanks!</p>
      </ScTaglineArea>
    </>
  )
}

export default Home;