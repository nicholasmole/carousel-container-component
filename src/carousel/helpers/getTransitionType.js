/**
 * getTransitionType Get the transition Type 
 * @param {string} sliding checks if Carousel is Sliding
 * @param {string} instantSliding checks if slides are jumping position to make it appear in order
 */

export const getTransitionType = ({
	sliding,
	instantSliding
}) => {
	if (sliding && instantSliding) {
		return 'none';
	}
	if (sliding || instantSliding) {
		return 'transform 1s ease';
	}
	return 'none';
}