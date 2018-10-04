/**
 * getFindOutIfThisDotIsCurrenltyActiveDot find out if this is the active dot
 * @param {string} index index number of dot
 * @param {string} position which slide index number is visible
 * @param {string} numItems total number of slides
 * @param {function} samePosition checks if this dot is the index as the current slide number
 * @param {function} positionIsNegative checks if carousel is going from start-to-end
 * @param {string} thisDotisTheLastDot checks if this dot is the last dot in the carousel
 */


const samePosition = ({index, position}) => index === position;

const positionIsNegative = ({position}) => position === -1;

const thisDotisTheLastDot = ({index, numItems}) =>  (index === (numItems - 1));

export const getFindOutIfThisDotIsCurrenltyActiveDot = ({
	index,
	position,
	numItems
}) => {
	const activeDotStyle = {
		background: '#0090da',
		transform: 'scale(1.2)'
	};

	let color = (index === position) ? activeDotStyle : {};

	color = ((position === -1) && (index === (numItems - 1))) ? activeDotStyle : color;

	if (samePosition({index, position}) || (positionIsNegative({position}) && thisDotisTheLastDot({index, numItems}))) {
		return activeDotStyle; // turn dot blue
		
	}
	return {}; // empty styles

};