import { useState, useCallback, useEffect } from 'react';
import axios from 'axios';

function Main() {

  const [peeringDB, setPeeringDB] = useState(null);
  const getData = async () => {
    const cachedData = localStorage.getItem('peeringDBData');
    if (cachedData) {
      const parsedData = JSON.parse(cachedData);
      const currentTime = new Date().getTime();
      const cachedTime = new Date(parsedData.timestamp).getTime();
      const cacheAge = (currentTime - cachedTime) / (1000 * 60); // Cache age in minutes

      if (cacheAge <= 1440) {
        setPeeringDB(parsedData.data);
        return;
      }
    }

    try {
      const response = await axios.get("https://www.peeringdb.com/api/net/34140");
      const newData = response.data.data[0];
      setPeeringDB(newData);
      localStorage.setItem('peeringDBData', JSON.stringify({ data: newData, timestamp: new Date() }));
    } catch (error) {
      console.error("Error fetching data from PeeringDB:", error);
    }
  };

  useEffect(() => {
    getData();
  }, []);




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
        <ul id='ixp'>
        {peeringDB.netixlan_set.map((set, index) => (
            <li className='ix' key={index}>
              <a className='ixname' href={'https://www.peeringdb.com/ix/'+set.ix_id}>{set.name}</a>
              {set.ipaddr4 == null ? (<div />) : (<p className='ixipv4'>{set.ipaddr4}</p>)}
              <p className='ixipv6'>{set.ipaddr6}</p>
              {set.speed < 1000 ? (<p className='ixspeed'>{set.speed}M</p>) : (<p className='ixspeed'>{set.speed}G</p>)}
              {set.operational == true ? (<p className='green-circle' />) : (<p className='red-circle' />)}
            </li>
          ))}
        </ul>
      </div>
    </body>
  )
}

export default Main