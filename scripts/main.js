
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

require(['Leap', 'utils', 'puppet', 'canvas'], function(Leap, utils, puppet, canvas){
    'use strict';

    var controller=new Leap.Controller({
        enableGestures: true,
        frameEventName: 'animationFrame'
    });
    controller.connect();
  // ====================
  // CONTROLLER LISTENERS
  // ====================
    utils.drawSkeleton(puppet.canvasNode);
    controller.on('frame', function(frame) {
        canvas.context.clearRect(0,0,canvas.el.width,canvas.el.height);
        var gesture, isHorizontal, state='stop', hand, finger, fingerPosition;
        for(var j=0; j<frame.hands.length; j++){
            hand=frame.hands[j];
            if(hand.type==='left'){
                /*var pos=utils.LeapToScene(frame, hand.palmPosition);
                puppet.$body.css({'left': pos.x+'px', 'top': pos.y+'px'});*/
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
                                puppet.canvasNode.left.foot.left=puppet.fingerMove.moveX;
                                puppet.canvasNode.left.foot.top=puppet.fingerMove.moveY;
                                break;
                            case 3:
                                puppet.fingerMove=utils.nodeMove('.left.knee', puppet.fingerInit.left.knee, fingerPosition);
                                puppet.canvasNode.left.knee.left=puppet.fingerMove.moveX;
                                puppet.canvasNode.left.knee.top=puppet.fingerMove.moveY;
                                break;
                            case 2:
                                puppet.fingerMove=utils.nodeMove('.left.hand', puppet.fingerInit.left.hand, fingerPosition);
                                puppet.canvasNode.left.hand.left=puppet.fingerMove.moveX;
                                puppet.canvasNode.left.hand.top=puppet.fingerMove.moveY;
                                break;
                            case 1:
                                puppet.fingerMove=utils.nodeMove('.left.elbow', puppet.fingerInit.left.elbow, fingerPosition);
                                puppet.canvasNode.left.elbow.left=puppet.fingerMove.moveX;
                                puppet.canvasNode.left.elbow.top=puppet.fingerMove.moveY;
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
                            utils.drawNode(puppet.fingerMove.color, puppet.fingerMove.moveX, puppet.fingerMove.moveY, 16);
                        }
                    }else{
                        switch (finger.type){
                            case 4:
                                puppet.fingerMove=utils.nodeMove('.right.foot', puppet.fingerInit.right.foot, fingerPosition);
                                puppet.canvasNode.right.foot.left=puppet.fingerMove.moveX;
                                puppet.canvasNode.right.foot.top=puppet.fingerMove.moveY;
                                break;
                            case 3:
                                puppet.fingerMove=utils.nodeMove('.right.knee', puppet.fingerInit.right.knee, fingerPosition);
                                puppet.canvasNode.right.knee.left=puppet.fingerMove.moveX;
                                puppet.canvasNode.right.knee.top=puppet.fingerMove.moveY;
                                break;
                            case 2:
                                puppet.fingerMove=utils.nodeMove('.right.hand', puppet.fingerInit.right.hand, fingerPosition);
                                puppet.canvasNode.right.hand.left=puppet.fingerMove.moveX;
                                puppet.canvasNode.right.hand.top=puppet.fingerMove.moveY;
                                break;
                            case 1:
                                puppet.fingerMove=utils.nodeMove('.right.elbow', puppet.fingerInit.right.elbow, fingerPosition);
                                puppet.canvasNode.right.elbow.left=puppet.fingerMove.moveX;
                                puppet.canvasNode.right.elbow.top=puppet.fingerMove.moveY;
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
                            utils.drawNode(puppet.fingerMove.color, puppet.fingerMove.moveX, puppet.fingerMove.moveY, 16);
                        }
                    } 
                }
            }
        }
        utils.drawSkeleton(puppet.canvasNode);
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