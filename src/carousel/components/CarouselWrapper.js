import React, {Component} from 'react';
import styles from '../styles/carousel.scss';

/**
 * CarouselWrapper wrapper for the carousel-container-component
 * @param {object} children children of wrapper
 */

export const CarouselWrapper = ({children}) => (
	<div className={`__CCC_Wrapper`}>
		{children}
	</div>
);

export default CarouselWrapper;
