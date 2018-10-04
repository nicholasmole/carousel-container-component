/**
 * getTranslateXPosition Get the translateX percentage for slide
 * @param {string} slidePosition used to determine if going in positive or negative direction
 */

export const getTranslateXPosition = ({
	slidePosition
}) => {
	if (slidePosition < -1) {
		return `translateX(${slidePosition * -1}%)`;
	}
	return `translateX(-${slidePosition}%)`;
}