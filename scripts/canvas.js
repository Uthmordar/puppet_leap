define(['puppet'], function(puppet){
    'use strict';

    var canvas  = document.createElement('canvas');
    var context = canvas.getContext('2d');

    canvas.width  = 600;//window.innerWidth;
    canvas.height = 600;//window.innerHeight;
    canvas.style.position = 'absolute';
    canvas.style.top      = 0;
    canvas.style.right    = 0;
    canvas.style.bottom   = 0;
    canvas.style.left     = 0;
    $(puppet.$body).append(canvas);

    return {
          el: canvas,
          context: context
    };
});