import React from 'react';
import './Avatar.css';

export function Avatar(props) {
    const { imgSrc, imgModifier } = props.image;

    return (
        <img
            className={`${imgModifier ? `avatar ${imgModifier}` : 'avatar'}`}
            src={imgSrc}
            alt=""
        />
    );
}
