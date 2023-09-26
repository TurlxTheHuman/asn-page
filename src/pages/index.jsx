import { useState, useCallback, useEffect } from 'react';
import axios from 'axios';

function Main() {

  const [data, setData] = useState(null);

  const fetchData = async () => {
    try {
      const cachedData = localStorage.getItem('peeringDBData');
      if (cachedData) {
        const parsedData = JSON.parse(cachedData);
        const currentTime = new Date().getTime();
        const cachedTime = new Date(parsedData.timestamp).getTime();
        const cacheAge = (currentTime - cachedTime) / (1000 * 60); // Cache age in minutes

        if (cacheAge <= 1440) {
          setData(parsedData.data);
          console.log(parsedData.data)
          return;
        }
      }

      const response = await axios.get("https://www.peeringdb.com/api/net/34140");
      const newData = response.data.data[0];
      setData(newData);


      localStorage.setItem('peeringDBData', JSON.stringify({ data: newData, timestamp: new Date() }));
    } catch (error) {
      console.error("Error fetching data from PeeringDB:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);


  console.log(data)


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
        {data && data.netixlan_set.map((set, index) => (
        <li className='ix' key={index}>
          <a href={'https://www.peeringdb.com/ix/'+set.ix_id}>{set.name}</a>
          {set.ipaddr4 == null ? (<div />) : (<p className='ixipv4'>{set.ipaddr4}</p>)}
          <p className='ixipv6'>{set.ipaddr6}</p>
          {set.speed < 1000 ? (<p className='ixspeed'>{set.speed}M</p>) : (<p className='ixspeed'>{set.speed/1000}G</p>)}
          {set.operational == true ? (<p className='green-circle' />) : (<p className='red-circle' />)}
        </li>
        ))}
        {!data && <div></div>}
        </ul>
      </div>
    </body>
  )
}

export default Main