# Carousel Container Component

React Carousel Container Component

## Usage

Simply install the application
```
npm i @nicholasmole/carousel-container-component

```

Then add the wrapper to your Component

```
import {
	CarouselContainerComponent
} from '@nicholasmole/carousel-container-component';

<CarouselContainerComponent>
	<div>
		Slide 1
	</div>
	<div>
		Slide 2
		<div>
			Content in slide 2!
		</div>
	</div>
</CarouselContainerComponent>
```

Add divs or Component inside of the CarouselContainerComponent and each first child level Component will create a new slide.
