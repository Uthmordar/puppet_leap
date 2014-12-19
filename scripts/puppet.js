define([], function() {
    'use strict';
    return {
        $body: $('#body'),
        bodyWidth: null,
        bodyHeight: null,
        $pelv: $('.pelv'),
        $head: $('.head'),
        rotateX: 0,
        rotateY: 0,
        initPuppet: 0,
        node: null,
        fingerMove: null,
        fingerInit:{
            left:{
                init:0,
                foot:{left: 0, top: 0, leftInit: 640, topInit: 695, color: 'aqua'},
                knee:{left: 0, top: 0, leftInit: 615, topInit: 625, color: 'blue'},
                elbow:{left: 0, top: 0, leftInit: 610, topInit: 465, color: 'green'},
                hand:{left: 0, top: 0, leftInit: 670, topInit: 525, color: 'teal'},
                head:{left: 0, top: 0, leftInit: 666, topInit: 355, active: 0}
            },
            right:{
                init:0,
                foot:{left: 0, top: 0, leftInit: 780, topInit: 695, color: 'aqua'},
                knee:{left: 0, top: 0, leftInit: 760, topInit: 615, color: 'blue'},
                elbow:{left: 0, top: 0, leftInit: 750, topInit: 465, color: 'green'},
                hand:{left: 0, top: 0, leftInit: 830, topInit: 475, color: 'teal'},
                pelv:{left: 0, top: 0, leftInit: 666, topInit: 530, active: 0}
            }
        },
        canvasNode:{
            left: {
                hand: {left: 670, top: 525},
                elbow: {left: 610, top: 465},
                knee: {left: 615, top: 625},
                foot: {left: 640, top: 695},
                shoulder: {left: 650, top: 405},
                head: {left: 680, top: 365}
            },
            right: {
                hand: {left: 830, top: 475},
                elbow: {left: 750, top: 465},
                knee: {left: 760, top: 615},
                foot: {left: 780, top: 695},
                shoulder: {left: 730, top: 405},
                pelv: {left: 700, top: 529}
            }
        },
        palm:{
            left:{
                leftInit: 0,
                topInit: 0
            },
            right:{
                leftInit: 0,
                topInit: 0
            },
            vectX: 0,
            vectY: 0
        }
    };
});