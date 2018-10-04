/**
 * getIfCarouselIsSlidingBackToStart returns classname based on if the carousel is going back-to-start or rotating normally
 * @param {string} position used to determine if going in positive or negative direction
 * @param {string} fullCircle checks if carousel is going around from start to finish or finish to start
 */

export const getIfCarouselIsSlidingBackToStart = ({
	position,
	fullCircle
}) => {
	if (position < 0 || fullCircle) {
		return '__CCC_CarouselLess'; // hides carousel slot
	}
	return '__CCC_CarouselSlot'; // shows carousel slot
}