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
                foot:{left: 0, top: 0, leftInit: 85, topInit: 170},
                knee:{left: 0, top: 0, leftInit: 95, topInit: 140},
                elbow:{left: 0, top: 0, leftInit: 90, topInit: 65},
                hand:{left: 0, top: 0, leftInit: 80, topInit: 90},
                head:{left: 0, top: 0, active: 0}
            },
            right:{
                init:0,
                foot:{left: 0, top: 0, leftInit: 155, topInit: 170},
                knee:{left: 0, top: 0, leftInit: 145, topInit: 140},
                elbow:{left: 0, top: 0, leftInit: 150, topInit: 65},
                hand:{left: 0, top: 0, leftInit: 160, topInit: 90},
                pelv:{left: 0, top: 0, active: 0}
            }
        }
    };
});