import React from 'react';
import Tank from './component/Tank.js';
import BulletComponent from './component/Tank.js';
import Enemy from './component/Enemy.js';


const App = () => {
  return (
    <div className='map' style={{height:"739px"}}>
      <Tank />
      <Enemy />
    </div>
  );
};

export default App;
