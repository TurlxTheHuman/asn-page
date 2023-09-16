import { useState, useCallback, useEffect } from 'react';
import axios from 'axios';

function Main() {
  return (
    <body>
      <div id='center'>
        <a href='https://turlxthehuman.com'><img src='/assets/img/coolturtle.webp' className='turtle'/></a>
        <h1>AS49132</h1>
        <p>a personal development network</p>
        <div className='links'>
          <a href='https://www.peeringdb.com/net/34140'>peeringdb.com</a>
          <a href='https://bgp.he.net/AS49132'> bgp.he.net</a>
          <a href='https://bgp.tools/as/49132'> bgp.tools</a>
        </div>
      </div>
    </body>
  )
}

export default Main