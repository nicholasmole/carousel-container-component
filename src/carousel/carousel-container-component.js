import React, {Component} from 'react';
import PropTypes from 'prop-types';
import Swipeable from 'react-swipeable';
import WaitToCall from '@nicholasmole/wait-to-call';

import {
	CarouselSlideContainer,
	CarouselWrapper,
	CarouselSlot,
	CarouselDot
} from './components';
import {
	getOrderNumberForCarouselItem
} from './helpers';

import './styles/carousel.scss';

/**
 * CarouselContainerComponent carousel container that display children as slides
 * @param {number} position Slide position
 * @param {string} direction 'next' or 'prev' direction slider is going
 * @param {boolean} sliding is slider moving
 * @param {boolean} instantSliding when going full circle instantSliding replaces slides so it looks like slide has gone full circle
 * @param {boolean} fullCircle is carousel sliding full circle
 * @param {number} currentSize count of slides
 */

export class CarouselContainerComponent extends Component {
	constructor(props) {
		super(props);
		this.state = {
			sliderReady: false,
			position: 0,
			direction: 'next',
			sliding: false,
			instantSliding: false,
			fullCircle: false,
			currentSize: 0
		};
		this.childrenGetPopulatedResetToZero = this.childrenGetPopulatedResetToZero.bind(this);
		this.nextSlide = this.nextSlide.bind(this);
		this.prevSlide = this.prevSlide.bind(this);
		this.fullCircleSlidingForward = this.fullCircleSlidingForward.bind(this);
		this.normalSlidingAction = this.normalSlidingAction.bind(this);
		this.clickSlide = this.clickSlide.bind(this);
		this.handleSwipeRight = this.handleSwipeRight.bind(this);
		this.handleSwipeLeft = this.handleSwipeLeft.bind(this);
	}

	static propTypes = {
		actions: PropTypes.objectOf(PropTypes.func).isRequired,
		headerAlerts: PropTypes.object.isRequired,
		headerFavorites: PropTypes.object.isRequired,
		lastAlertChecked: PropTypes.object.isRequired
	};

	/**
	 * nextSlide -slider goes right
	 * @param {number} position Slide position
	 * @param {boolean} sliding is slider moving
	 */
	nextSlide = () => {
		const {
			position,
			sliding
		} = this.state;
		const {
			children
		} = this.props;
		const numItems = children.length || 1;
		if (!sliding) {
			if ((position + 1) >= numItems) {

				// Going forward @ end of carousel
				this.fullCircleSlidingForward('next', 0);

			} else {

				// Normal slide forward
				this.normalSlidingAction('next', position + 1);

			}
		}
	}

	/**
	 * prevSlide - slider goes left
	 * @param {number} position Slide position
	 * @param {boolean} sliding is slider moving
	 */

	prevSlide = () => {
		const {
			position,
			sliding
		} = this.state;
		const {
			children
		} = this.props;
		if (!sliding) {
			if (position <= 0) {

				// Going backward @ end of carousel
				this.fullCircleSlidingBackward('prev', position - 1);

			} else {

				// Normal slide Backward
				this.normalSlidingAction('prev', position - 1);

			}
		}
	}

	/**
	 * clickSlide - slider goes to position of dot clicked
	 * @param {number} position Slide position
	 * @param {boolean} sliding is slider moving
	 */
	clickSlide = givenSlideIndex => {
		const {
			position,
			sliding
		} = this.state;
		const {
			children
		} = this.props;

		if (!sliding) {

			if (givenSlideIndex !== position) {

				// Slides forward or backward depending on
				if (givenSlideIndex > position) {

					this.normalSlidingAction('next', position === children.length - 1 ? 0 : givenSlideIndex);

				} else {

					this.normalSlidingAction('prev', position === 0 ? children.length - 1 : givenSlideIndex);

				}
			}
		}
	}

	/**
	 * fullCircleSlidingForward - goes full circle from start-to-end of slider
	 */
	fullCircleSlidingForward = direction => {
		const {
			children
		} = this.props;

		// Carousel set themselves to only show the last and first slide in reverse order
		// Goes to -1 slot instantly which is the last slide
		this.setState({
			sliding: true,
			instantSliding: true,
			direction,
			fullCircle: true,
			position: -1
		});

		// Slides to position 0 - which is the first slide
		setTimeout(() => {
			this.setState({
				sliding: true,
				instantSliding: false,
				position: 0
			});
		}, 100);

		// Resets the system so slides are in order
		setTimeout(() => {
			this.setState({
				sliding: false,
				instantSliding: false,
				fullCircle: false
			});
		}, 1000);
	};

	/**
	 * fullCircleSlidingBackward - goes full circle from end-to-start of slider
	 */
	fullCircleSlidingBackward = (direction, position) => {
		const {
			children
		} = this.props;

		// Carousel set themselves to only show the last and first slide in reverse order
		// Goes to -1 slide which is the last slide
		this.setState({
			sliding: true,
			direction,
			position
		});

		// Resets the system so slides are in order
		// Sets position to last item
		setTimeout(() => {
				this.setState({
					instantSliding: true,
					position: children.length - 1
				});
		}, 900);

		// Allows slider to work again
		setTimeout(() => {
			this.setState({
				sliding: false,
				instantSliding: false
			});
		}, 1000);
	};

	/**
	 * normalSlidingAction - set states for sliding, direction and position
	 * @param {number} position Slide position
	 * @param {string} direction 'next' or 'prev' direction slider is going
	 */

	normalSlidingAction = (direction, position) => {
		this.setState({
			sliding: true,
			direction,
			position
		});
		setTimeout(() => {
				this.setState({
					sliding: false
				});
		}, 800);
	};

	/**
	 * childrenGetPopulatedResetToZero - If Children inside of Carousel needs to change for responsive design
	 * Set the position back to zero
	 * @param {number} newSize new number of slides
	 */

	childrenGetPopulatedResetToZero = newSize => {
		this.setState({
			currentSize: newSize,
			position: 0
		});
	}

	static getDerivedStateFromProps(nextProps, prevState) {
		const {currentSize} = prevState;
		const {children} = nextProps;
		if (currentSize !== children.length) {
			return {
				currentSize: children.length,
				position: 0
			};
		}
		return null;
	}

	/**
	 * handleSwipeRight - handle carousel movement by touch, and swipe
	 */
	handleSwipeLeft() {
		WaitToCall(() => {
			if (!this.state.sliderReady) return;

			this.nextSlide();

		}, 150, {trailing: false});
	}

	handleSwipeRight() {
		WaitToCall(() => {
			if (!this.state.sliderReady) return;

			this.prevSlide();

		}, 150, {trailing: false});
	}

	componentDidMount() {
		const {
			currentSize
		} = this.state;
		const {
			children
		} = this.props;
		this.setState({
			sliderReady: true
		})
		if (currentSize !== children.length) {
			this.childrenGetPopulatedResetToZero(children.length);
		}
	}

	/**
	 * removeBackgroundColor - if isBackgroundColorless is true
	 */
	removeBackgroundColor = isBackgroundColorless => {
		if (isBackgroundColorless) {
			return {backgroundColor: 'rgba(0,0,0,0)'};
		}
	}

	render() {
		const {
			children,
			isBackgroundColorless
		} = this.props;

		const {
			position,
			direction,
			instantSliding,
			sliding,
			fullCircle
		} = this.state;

		if (children.length === 1) {
			return children[0];
		}

		return (
			<Swipeable
				onSwipingLeft={() => this.handleSwipeLeft()}
				onSwipingRight={() => this.handleSwipeRight()}
			>
				<CarouselWrapper>
					<CarouselSlideContainer
						position={position}
						numItems={children.length}
						instantSliding={instantSliding}
						sliding={sliding}
						fullCircle={fullCircle}
					>
						{
							children.map((child, index) => (
								<CarouselSlot
									key={index}
									order={getOrderNumberForCarouselItem({itemIndex: index, position, childrenCount: children})}
									position={position}
									direction={direction}
									fullCircle={fullCircle}
								>
									{child}
								</CarouselSlot>
							)) 
						}
					</CarouselSlideContainer>
					<div className={`__CCC_carousel_wrapper_backgroundcontainer`} style={this.removeBackgroundColor(isBackgroundColorless)} >
						<div className={`__CCC_carousel_wrapper_buttoncontainer`} >
							<div className={`__CCC_carousel_wrapper_innerbuttoncontainer`} >
								<button className={`__CCC_BackButton`} onClick={ () => this.prevSlide() }><div></div>&lt;</button>
								<ul>
									{
										children.map((child, i) => (
											<CarouselDot
												key={i}
												index={i}
												position={position}
												order={getOrderNumberForCarouselItem({itemIndex: i, position, childrenCount: children})}
												numItems={children.length}
												clickSlide={() => this.clickSlide(i)}
											/>
										))
									}
								</ul>
								<button
									className={`__CCC_NextButton`}
										onClick={ () => this.nextSlide() }>
									<div></div>&gt;
								</button>
							</div>
						</div>
					</div>
				</CarouselWrapper>
			</Swipeable>
		);
	}
}

export default CarouselContainerComponent;
