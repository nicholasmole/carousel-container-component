"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var carousel = require('./build');
require('./build/src/styles.css');

Object.defineProperty(exports, 'CarouselContainerComponent', {
  enumerable: true,
  get: function get() {
    return carousel;
  }
});

exports.modules = carousel;

exports.default = carousel;

// exports.default = function() {console.log('h')} 