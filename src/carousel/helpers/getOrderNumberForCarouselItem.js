/**
 * getOrderNumberForCarouselItem returns the order number for the carousel item
 * @param {number} itemIndex index value associating slide with dot
 * @param {number} position Slide position
 * @param {number} childrenCount number of slides
 */


export const getOrderNumberForCarouselItem = ({
	itemIndex,
	position,
	childrenCount
}) => {

	const numItems = childrenCount || 1;

	if (itemIndex - position < 0) {

		return numItems - Math.abs(itemIndex - position);
		
	}
	return itemIndex - position;
}