define(['puppet'], function(puppet) {
    'use strict';
    return {
        LeapToScene2 : function(frame, positionTbl) {
            var normalizedPosition = frame.interactionBox.normalizePoint(positionTbl, true);

            return {
                x: normalizedPosition[0] * window.innerWidth,
                y: window.innerHeight - normalizedPosition[1] * window.innerHeight,
                z: normalizedPosition[2]
            };
        },
        LeapToScene: function(frame, position){
            var normalizedPosition=frame.interactionBox.normalizePoint(position, true);
            var width=puppet.$body.width();
            var height=puppet.$body.height();
            return {x: normalizedPosition[0]*width,
                    y: height - normalizedPosition[1]*height,
                    z: normalizedPosition[2]
                };
        },
        nodeMove: function(id, node, fingerPosition){
            return {
                fingerClass:id,
                moveX:node.leftInit -(node.left- fingerPosition.x),
                moveY:node.topInit-(node.top- fingerPosition.y)
            };
        },
        initFinger: function(finger, fingerPosition, side){
            if(side==='left'){
                switch(finger.type){
                    case 4:
                        puppet.fingerInit.left.foot.left=fingerPosition.x;
                        puppet.fingerInit.left.foot.top=fingerPosition.y;
                        break;
                    case 3:
                        puppet.fingerInit.left.knee.left=fingerPosition.x;
                        puppet.fingerInit.left.knee.top=fingerPosition.y;
                        break;
                    case 2:
                        puppet.fingerInit.left.hand.left=fingerPosition.x;
                        puppet.fingerInit.left.hand.top=fingerPosition.y;
                        break;
                    case 1:
                        puppet.fingerInit.left.elbow.left=fingerPosition.x;
                        puppet.fingerInit.left.elbow.top=fingerPosition.y;
                        break;
                    case 0:
                        puppet.fingerInit.left.head.left=fingerPosition.x;
                        puppet.fingerInit.left.head.top=fingerPosition.y;
                        break;
                    default:
                        break;
                }
                puppet.fingerInit.left.init+=0.2;
            }else{
                switch (finger.type){
                    case 4:
                        puppet.fingerInit.right.foot.left=fingerPosition.x;
                        puppet.fingerInit.right.foot.top=fingerPosition.y;
                        break;
                    case 3:
                        puppet.fingerInit.right.knee.left=fingerPosition.x;
                        puppet.fingerInit.right.knee.top=fingerPosition.y;
                        break;
                    case 2:
                        puppet.fingerInit.right.hand.left=fingerPosition.x;
                        puppet.fingerInit.right.hand.top=fingerPosition.y;
                        break;
                    case 1:
                        puppet.fingerInit.right.elbow.left=fingerPosition.x;
                        puppet.fingerInit.right.elbow.top=fingerPosition.y;
                        break;
                    case 0:
                        puppet.fingerInit.right.pelv.left=fingerPosition.x;
                        puppet.fingerInit.right.pelv.top=fingerPosition.y;
                        break;
                    default:
                        break;
                }
                puppet.fingerInit.right.init+=0.2;
            }
        }
    };
});