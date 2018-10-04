import React, {Component} from 'react';
import {
	getTransitionType,
	getTranslateXPosition,
	getFlexDirection
} from '../helpers'

import styles from '../styles/carousel.scss';


/**
 * CarouselSlideContainer container for the slides  the 
 * @param {string} sliding checks if Carousel is Sliding
 * @param {string} instantSliding checks if slides are jumping position to make it appear in order
 * @param {number} position Slide position
 * @param {string} instantSliding checks if slides are jumping position to make it appear in order
 * @param {object} children children of component
 */

export const CarouselSlideContainer = ({
	position,
	sliding,
	fullCircle,
	instantSliding,
	children
}) => {
	let slidePosition = position * 100;

	let transitionType = getTransitionType({sliding, instantSliding}); 

	let translateXPosition = getTranslateXPosition({slidePosition});

	let flexDirection = getFlexDirection({slidePosition, fullCircle});
	console.log('transitionType');
	console.log(transitionType);
	console.log(translateXPosition);
	console.log(flexDirection);
	console.log(children);
	return (
		<div
			className={`__CCC_CarouselContainer`}
			style={
				{
					transition: transitionType,
					transform: translateXPosition,
					flexDirection: flexDirection
				}
			}>
			{children}
		</div>
	);
};

export default CarouselSlideContainer;
