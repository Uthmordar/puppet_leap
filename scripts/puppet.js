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
                foot:{left: 0, top: 0, leftInit: 170, topInit: 340, color: 'aqua'},
                knee:{left: 0, top: 0, leftInit: 190, topInit: 280, color: 'blue'},
                elbow:{left: 0, top: 0, leftInit: 180, topInit: 130, color: 'teal'},
                hand:{left: 0, top: 0, leftInit: 160, topInit: 180, color: 'green'},
                head:{left: 0, top: 0, active: 0}
            },
            right:{
                init:0,
                foot:{left: 0, top: 0, leftInit: 310, topInit: 340, color: 'aqua'},
                knee:{left: 0, top: 0, leftInit: 290, topInit: 280, color: 'blue'},
                elbow:{left: 0, top: 0, leftInit: 300, topInit: 130, color: 'teal'},
                hand:{left: 0, top: 0, leftInit: 320, topInit: 180, color: 'green'},
                pelv:{left: 0, top: 0, active: 0}
            }
        }
    };
});