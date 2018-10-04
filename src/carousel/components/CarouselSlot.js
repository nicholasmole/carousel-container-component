import React from 'react';
import {
	getIfCarouselIsSlidingBackToStart
} from '../helpers';
import styles from '../styles/carousel.scss';


/**
 * CarouselSlot container for each passed in slide 
 * @param {number} order Slide order number
 * @param {number} position Slide position
 * @param {boolean} fullCircle checks if carousel is going around from start to finish or finish to start
 */

export const CarouselSlot = ({
	order,
	position,
	fullCircle,
	children
}) => {

	const classIfFullCircleOrNormal = getIfCarouselIsSlidingBackToStart({position, fullCircle});

	return (
		<div className={classIfFullCircleOrNormal} order={order}>
			{children}
		</div>
	);
	
}
export default CarouselSlot;
