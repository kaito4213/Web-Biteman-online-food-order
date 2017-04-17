import React from 'react';

//NOT USE NOW
/**
 * HelloWorld is just a place holder component.
 *
 * @param name
 * @returns {XML}
 * @constructor
 */
const HelloWorld = ({name}) => {
  const sayHi = (event) => {
    alert(`Hi ` + localStorage.getItem('userName') + `!`);
  };

  return (
    <div>
      <a href="#" onClick={sayHi}>Say hi</a>
    </div>
  );
};


export default HelloWorld;
