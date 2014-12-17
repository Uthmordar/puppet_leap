
requirejs.config({
    paths: {
        'Leap': '../lib/leap-0.6.4'
    },
    shim: {
        'Leap': {
            'exports': 'Leap'
        }
    }
});

require(['Leap', 'utils', 'puppet'], function(Leap, utils, puppet) {
    'use strict';

    var controller=new Leap.Controller({
        enableGestures: true,
        frameEventName: 'animationFrame'
    });
    controller.connect();
  // ====================
  // CONTROLLER LISTENERS
  // ====================
    controller.on('frame', function(frame) {
        var gesture, isHorizontal, state='stop', hand, finger, fingerPosition;
        for(var j=0; j<frame.hands.length; j++){
            hand=frame.hands[j];
            if(hand.type==='left'){
                var pos=utils.LeapToScene(frame, hand.palmPosition);
                puppet.$body.css({'left': pos.x+'px', 'top': pos.y+'px'});
            }
            if(hand && puppet.initPuppet===1){
                if(puppet.fingerInit.left.init===0 || puppet.fingerInit.right.init===0){
                    for(var i=0;i<hand.fingers.length; i++){
                        finger=hand.fingers[i];
                        fingerPosition=utils.LeapToScene(frame,finger.stabilizedTipPosition);
                        if(hand.type==='left' && puppet.fingerInit.left.init<1){
                            utils.initFinger(finger, fingerPosition, 'left');
                        }else if(puppet.fingerInit.right.init<1){
                            utils.initFinger(finger, fingerPosition, 'right');
                        }
                    }
                }
                for(var i=0;i<hand.fingers.length; i++){
                    finger=hand.fingers[i];
                    fingerPosition=utils.LeapToScene(frame,finger.stabilizedTipPosition);
                    if(hand.type==='left'){
                        switch(finger.type){
                            case 4:
                                puppet.fingerMove=utils.nodeMove('.left.foot', puppet.fingerInit.left.foot, fingerPosition);
                                break;
                            case 3:
                                puppet.fingerMove=utils.nodeMove('.left.knee', puppet.fingerInit.left.knee, fingerPosition);
                                break;
                            case 2:
                                puppet.fingerMove=utils.nodeMove('.left.hand', puppet.fingerInit.left.hand, fingerPosition);
                                break;
                            case 1:
                                puppet.fingerMove=utils.nodeMove('.left.elbow', puppet.fingerInit.left.elbow, fingerPosition);
                                break;
                            case 0:
                                puppet.fingerMove={fingerClass:'.head'};
                                if(Math.abs(puppet.fingerInit.left.head.left-fingerPosition.x)>1 || Math.abs(puppet.fingerInit.left.head.top-fingerPosition.y)>1){
                                    puppet.fingerInit.left.head.active=1;
                                }else{
                                    puppet.fingerInit.left.head.active=0;
                                }
                                puppet.fingerInit.left.head.left=fingerPosition.x;
                                puppet.fingerInit.left.head.top=fingerPosition.y;
                                break;
                            default:
                                break;
                        }
                        if(puppet.fingerMove.fingerClass==='.head'){
                            if(puppet.fingerInit.left.head.active){
                                $(puppet.$head).addClass('active');
                            }else{
                                $(puppet.$head).removeClass('active');
                            }
                        }else{
                            $(puppet.fingerMove.fingerClass).css({'left': puppet.fingerMove.moveX+'px', 'top': puppet.fingerMove.moveY+'px'});
                        }
                    }else{
                        switch (finger.type){
                            case 4:
                                puppet.fingerMove=utils.nodeMove('.right.foot', puppet.fingerInit.right.foot, fingerPosition);
                                break;
                            case 3:
                                puppet.fingerMove=utils.nodeMove('.right.knee', puppet.fingerInit.right.knee, fingerPosition);
                                break;
                            case 2:
                                puppet.fingerMove=utils.nodeMove('.right.hand', puppet.fingerInit.right.hand, fingerPosition);
                                break;
                            case 1:
                                puppet.fingerMove=utils.nodeMove('.right.elbow', puppet.fingerInit.right.elbow, fingerPosition);
                                break;
                            case 0:
                                puppet.fingerMove={fingerClass:'.pelv'};
                                if(Math.abs(puppet.fingerInit.right.pelv.left-fingerPosition.x)>1 || Math.abs(puppet.fingerInit.right.pelv.top-fingerPosition.y)>1){
                                    puppet.fingerInit.right.pelv.active=1;
                                }else{
                                    puppet.fingerInit.right.pelv.active=0;
                                }
                                puppet.fingerInit.right.pelv.left=fingerPosition.x;
                                puppet.fingerInit.right.pelv.top=fingerPosition.y;
                                break;
                            default:
                                break;
                        }
                        if(puppet.fingerMove.fingerClass==='.pelv'){
                            if(puppet.fingerInit.right.pelv.active){
                                $(puppet.$pelv).addClass('active');
                            }else{
                                $(puppet.$pelv).removeClass('active');
                            }
                        }else{
                            $(puppet.fingerMove.fingerClass).css({'left': puppet.fingerMove.moveX+'px', 'top': puppet.fingerMove.moveY+'px'});
                        }
                    } 
                }
            }
        }
        if(frame.hands.length===1){
            hand=frame.hands[0];
            if(hand.type==='left'){
                puppet.fingerInit.right.init=0;
            }else{
                puppet.fingerInit.left.init=0;
            }
        }else if(frame.hands.length===0){
            puppet.fingerInit.right.init=0;
            puppet.fingerInit.left.init=0;
        }
        if(frame.gestures.length>0){
            for(var i=0; i<frame.gestures.length;i++){
                gesture=frame.gestures[i];
                if(gesture.type==='swipe' && state==='stop'){
                    state='start';
                    isHorizontal=Math.abs(gesture.direction[0]) > Math.abs(gesture.direction[1]);
                    if(isHorizontal){
                        puppet.rotateY=(puppet.rotateY)? 0 : 1;
                        puppet.$body.css({'-webkit-transform': 'rotate3d(0,'+puppet.rotateY+', 0, 180deg)','transform': 'rotate3d(0,'+puppet.rotateY+', 0,180deg)'});
                    }else{
                        puppet.rotateX=(puppet.rotateX)? 0 : 1;
                        puppet.$body.css({'-webkit-transform': 'rotate3d('+puppet.rotateX+', 0, 0, 180deg)', 'transform': 'rotate3d('+puppet.rotateX+', 0, 0, 180deg)'});
                    }
                    setTimeout(function(){state='stop';}, 2000);
                }else if(gesture.type==='screenTap'){
                    puppet.initPuppet=1;
                }
            }   
        }
    });
    controller.on('connect', function(){
        console.info('Leap Motion prêt ...');
    });
    controller.on('deviceConnected', function(){
        console.info('Leap Motion connecté !');
    });
    controller.on('deviceDisconnected', function(){
        console.warn('Leap Motion déconnecté !');
    });
});