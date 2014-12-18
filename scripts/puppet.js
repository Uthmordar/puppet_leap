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
                foot:{left: 0, top: 0, leftInit: 180, topInit: 370, color: 'aqua'},
                knee:{left: 0, top: 0, leftInit: 200, topInit: 310, color: 'blue'},
                elbow:{left: 0, top: 0, leftInit: 190, topInit: 160, color: 'green'},
                hand:{left: 0, top: 0, leftInit: 170, topInit: 210, color: 'teal'},
                head:{left: 0, top: 0, active: 0}
            },
            right:{
                init:0,
                foot:{left: 0, top: 0, leftInit: 320, topInit: 370, color: 'aqua'},
                knee:{left: 0, top: 0, leftInit: 300, topInit: 310, color: 'blue'},
                elbow:{left: 0, top: 0, leftInit: 310, topInit: 160, color: 'green'},
                hand:{left: 0, top: 0, leftInit: 310, topInit: 210, color: 'teal'},
                pelv:{left: 0, top: 0, active: 0}
            }
        }
    };
});