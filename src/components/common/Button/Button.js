import React from 'react';

const Button = ({ id, onClick, className, children }) => {
    return (
        <div>
            <button id={id} className={className} onClick={(e) => onClick(e)}>
                {children}
            </button>
        </div>
    );
};

export default Button;
