"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var carousel = require('./build');
require('./build/src/styles.css');

Object.defineProperty(exports, 'CarouselContainerComponent', {
  enumerable: true,
  get: function get() {
    return carousel.CarouselContainerComponent;
  }
});

exports.modules = carousel.CarouselContainerComponent;

exports.default = carousel.CarouselContainerComponent;