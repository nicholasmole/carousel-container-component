/**
 * getFlexDirection Get the flex direction for slides
 * @param {string} slidePosition used to determine if going in positive or negative direction
 * @param {string} fullCircle checks if carousel is going around from start to finish or finish to start
 */

export const getFlexDirection = ({
	slidePosition,
	fullCircle
}) => {
	if (slidePosition < -1 || fullCircle) {
		return 'row-reverse';
	}
	return 'row';
}