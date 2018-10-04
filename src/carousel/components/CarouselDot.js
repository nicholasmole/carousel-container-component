import React from 'react';
import {
	getFindOutIfThisDotIsCurrenltyActiveDot
} from '../helpers';
import styles from '../styles/carousel.scss';

/**
 * CarouselDot dot for carousel slides
 * @param {number} index index value associating slide with dot
 * @param {number} position Slide position
 * @param {function} clickSlide jumps to slide associated with this dot
 * @param {number} numItems Number of slides
 */

export const CarouselDot = ({
	index,
	position,
	clickSlide,
	numItems}) => (
	<li>
		<button
			onClick={clickSlide}
			style={getFindOutIfThisDotIsCurrenltyActiveDot({index, position, numItems})}
		>
		</button>
	</li>
);
