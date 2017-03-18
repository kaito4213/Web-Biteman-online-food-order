import React from 'react';

const HelloWorld = ({name}) => {
    const sayHi = (event) => {
        localStorage.setItem('username', 'jie');
        alert(`Hi ${name}!` + localStorage.getItem('username'));

    };

    return (
        <div>
            <a
                href="#"
                onClick={sayHi}
            >Say Hi</a>
        </div>
    );
};


export default HelloWorld;