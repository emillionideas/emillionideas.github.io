(function (cjs, an) {

var p; // shortcut to reference prototypes
var lib={};var ss={};var img={};
lib.ssMetadata = [
		{name:"Opening_door_animation_v2b_smaller_atlas_1", frames: [[0,0,834,1293],[836,0,834,1293]]},
		{name:"Opening_door_animation_v2b_smaller_atlas_2", frames: [[0,0,834,1293],[836,0,834,1293]]},
		{name:"Opening_door_animation_v2b_smaller_atlas_3", frames: [[0,0,834,1293],[836,0,834,1293]]},
		{name:"Opening_door_animation_v2b_smaller_atlas_4", frames: [[0,0,834,1293],[836,0,834,1293]]},
		{name:"Opening_door_animation_v2b_smaller_atlas_5", frames: [[0,0,834,1293],[836,0,834,1293]]},
		{name:"Opening_door_animation_v2b_smaller_atlas_6", frames: [[0,0,834,1293],[836,0,834,1293]]},
		{name:"Opening_door_animation_v2b_smaller_atlas_7", frames: [[0,0,834,1293],[836,0,834,1293]]},
		{name:"Opening_door_animation_v2b_smaller_atlas_8", frames: [[1225,0,386,551],[1225,553,384,551],[836,554,387,551],[792,1295,387,552],[836,0,387,552],[0,1295,394,551],[1181,1107,386,552],[396,1295,394,551],[0,0,834,1293]]}
];


(lib.AnMovieClip = function(){
	this.currentSoundStreamInMovieclip;
	this.actionFrames = [];
	this.soundStreamDuration = new Map();
	this.streamSoundSymbolsList = [];

	this.gotoAndPlayForStreamSoundSync = function(positionOrLabel){
		cjs.MovieClip.prototype.gotoAndPlay.call(this,positionOrLabel);
	}
	this.gotoAndPlay = function(positionOrLabel){
		this.clearAllSoundStreams();
		this.startStreamSoundsForTargetedFrame(positionOrLabel);
		cjs.MovieClip.prototype.gotoAndPlay.call(this,positionOrLabel);
	}
	this.play = function(){
		this.clearAllSoundStreams();
		this.startStreamSoundsForTargetedFrame(this.currentFrame);
		cjs.MovieClip.prototype.play.call(this);
	}
	this.gotoAndStop = function(positionOrLabel){
		cjs.MovieClip.prototype.gotoAndStop.call(this,positionOrLabel);
		this.clearAllSoundStreams();
	}
	this.stop = function(){
		cjs.MovieClip.prototype.stop.call(this);
		this.clearAllSoundStreams();
	}
	this.startStreamSoundsForTargetedFrame = function(targetFrame){
		for(var index=0; index<this.streamSoundSymbolsList.length; index++){
			if(index <= targetFrame && this.streamSoundSymbolsList[index] != undefined){
				for(var i=0; i<this.streamSoundSymbolsList[index].length; i++){
					var sound = this.streamSoundSymbolsList[index][i];
					if(sound.endFrame > targetFrame){
						var targetPosition = Math.abs((((targetFrame - sound.startFrame)/lib.properties.fps) * 1000));
						var instance = playSound(sound.id);
						var remainingLoop = 0;
						if(sound.offset){
							targetPosition = targetPosition + sound.offset;
						}
						else if(sound.loop > 1){
							var loop = targetPosition /instance.duration;
							remainingLoop = Math.floor(sound.loop - loop);
							if(targetPosition == 0){ remainingLoop -= 1; }
							targetPosition = targetPosition % instance.duration;
						}
						instance.loop = remainingLoop;
						instance.position = Math.round(targetPosition);
						this.InsertIntoSoundStreamData(instance, sound.startFrame, sound.endFrame, sound.loop , sound.offset);
					}
				}
			}
		}
	}
	this.InsertIntoSoundStreamData = function(soundInstance, startIndex, endIndex, loopValue, offsetValue){ 
 		this.soundStreamDuration.set({instance:soundInstance}, {start: startIndex, end:endIndex, loop:loopValue, offset:offsetValue});
	}
	this.clearAllSoundStreams = function(){
		var keys = this.soundStreamDuration.keys();
		for(var i = 0;i<this.soundStreamDuration.size; i++){
			var key = keys.next().value;
			key.instance.stop();
		}
 		this.soundStreamDuration.clear();
		this.currentSoundStreamInMovieclip = undefined;
	}
	this.stopSoundStreams = function(currentFrame){
		if(this.soundStreamDuration.size > 0){
			var keys = this.soundStreamDuration.keys();
			for(var i = 0; i< this.soundStreamDuration.size ; i++){
				var key = keys.next().value; 
				var value = this.soundStreamDuration.get(key);
				if((value.end) == currentFrame){
					key.instance.stop();
					if(this.currentSoundStreamInMovieclip == key) { this.currentSoundStreamInMovieclip = undefined; }
					this.soundStreamDuration.delete(key);
				}
			}
		}
	}

	this.computeCurrentSoundStreamInstance = function(currentFrame){
		if(this.currentSoundStreamInMovieclip == undefined){
			if(this.soundStreamDuration.size > 0){
				var keys = this.soundStreamDuration.keys();
				var maxDuration = 0;
				for(var i=0;i<this.soundStreamDuration.size;i++){
					var key = keys.next().value;
					var value = this.soundStreamDuration.get(key);
					if(value.end > maxDuration){
						maxDuration = value.end;
						this.currentSoundStreamInMovieclip = key;
					}
				}
			}
		}
	}
	this.getDesiredFrame = function(currentFrame, calculatedDesiredFrame){
		for(var frameIndex in this.actionFrames){
			if((frameIndex > currentFrame) && (frameIndex < calculatedDesiredFrame)){
				return frameIndex;
			}
		}
		return calculatedDesiredFrame;
	}

	this.syncStreamSounds = function(){
		this.stopSoundStreams(this.currentFrame);
		this.computeCurrentSoundStreamInstance(this.currentFrame);
		if(this.currentSoundStreamInMovieclip != undefined){
			var soundInstance = this.currentSoundStreamInMovieclip.instance;
			if(soundInstance.position != 0){
				var soundValue = this.soundStreamDuration.get(this.currentSoundStreamInMovieclip);
				var soundPosition = (soundValue.offset?(soundInstance.position - soundValue.offset): soundInstance.position);
				var calculatedDesiredFrame = (soundValue.start)+((soundPosition/1000) * lib.properties.fps);
				if(soundValue.loop > 1){
					calculatedDesiredFrame +=(((((soundValue.loop - soundInstance.loop -1)*soundInstance.duration)) / 1000) * lib.properties.fps);
				}
				calculatedDesiredFrame = Math.floor(calculatedDesiredFrame);
				var deltaFrame = calculatedDesiredFrame - this.currentFrame;
				if(deltaFrame >= 2){
					this.gotoAndPlayForStreamSoundSync(this.getDesiredFrame(this.currentFrame,calculatedDesiredFrame));
				}
			}
		}
	}
}).prototype = p = new cjs.MovieClip();
// symbols:



(lib._6 = function() {
	this.initialize(ss["Opening_door_animation_v2b_smaller_atlas_1"]);
	this.gotoAndStop(0);
}).prototype = p = new cjs.Sprite();



(lib._5 = function() {
	this.initialize(ss["Opening_door_animation_v2b_smaller_atlas_1"]);
	this.gotoAndStop(1);
}).prototype = p = new cjs.Sprite();



(lib._11 = function() {
	this.initialize(ss["Opening_door_animation_v2b_smaller_atlas_2"]);
	this.gotoAndStop(0);
}).prototype = p = new cjs.Sprite();



(lib._1 = function() {
	this.initialize(ss["Opening_door_animation_v2b_smaller_atlas_2"]);
	this.gotoAndStop(1);
}).prototype = p = new cjs.Sprite();



(lib._10 = function() {
	this.initialize(ss["Opening_door_animation_v2b_smaller_atlas_3"]);
	this.gotoAndStop(0);
}).prototype = p = new cjs.Sprite();



(lib._13 = function() {
	this.initialize(ss["Opening_door_animation_v2b_smaller_atlas_3"]);
	this.gotoAndStop(1);
}).prototype = p = new cjs.Sprite();



(lib._8 = function() {
	this.initialize(ss["Opening_door_animation_v2b_smaller_atlas_4"]);
	this.gotoAndStop(0);
}).prototype = p = new cjs.Sprite();



(lib._9 = function() {
	this.initialize(ss["Opening_door_animation_v2b_smaller_atlas_4"]);
	this.gotoAndStop(1);
}).prototype = p = new cjs.Sprite();



(lib.Ellipse7copy3 = function() {
	this.initialize(ss["Opening_door_animation_v2b_smaller_atlas_8"]);
	this.gotoAndStop(0);
}).prototype = p = new cjs.Sprite();



(lib._4 = function() {
	this.initialize(ss["Opening_door_animation_v2b_smaller_atlas_5"]);
	this.gotoAndStop(0);
}).prototype = p = new cjs.Sprite();



(lib.Ellipse7copy5 = function() {
	this.initialize(ss["Opening_door_animation_v2b_smaller_atlas_8"]);
	this.gotoAndStop(1);
}).prototype = p = new cjs.Sprite();



(lib.Ellipse7copy6 = function() {
	this.initialize(ss["Opening_door_animation_v2b_smaller_atlas_8"]);
	this.gotoAndStop(2);
}).prototype = p = new cjs.Sprite();



(lib.Ellipse7copy7 = function() {
	this.initialize(ss["Opening_door_animation_v2b_smaller_atlas_8"]);
	this.gotoAndStop(3);
}).prototype = p = new cjs.Sprite();



(lib.Ellipse7copy4 = function() {
	this.initialize(ss["Opening_door_animation_v2b_smaller_atlas_8"]);
	this.gotoAndStop(4);
}).prototype = p = new cjs.Sprite();



(lib.Ellipse7 = function() {
	this.initialize(ss["Opening_door_animation_v2b_smaller_atlas_8"]);
	this.gotoAndStop(5);
}).prototype = p = new cjs.Sprite();



(lib._12 = function() {
	this.initialize(ss["Opening_door_animation_v2b_smaller_atlas_5"]);
	this.gotoAndStop(1);
}).prototype = p = new cjs.Sprite();



(lib._7 = function() {
	this.initialize(ss["Opening_door_animation_v2b_smaller_atlas_6"]);
	this.gotoAndStop(0);
}).prototype = p = new cjs.Sprite();



(lib._2 = function() {
	this.initialize(ss["Opening_door_animation_v2b_smaller_atlas_6"]);
	this.gotoAndStop(1);
}).prototype = p = new cjs.Sprite();



(lib._3 = function() {
	this.initialize(ss["Opening_door_animation_v2b_smaller_atlas_7"]);
	this.gotoAndStop(0);
}).prototype = p = new cjs.Sprite();



(lib._0 = function() {
	this.initialize(ss["Opening_door_animation_v2b_smaller_atlas_7"]);
	this.gotoAndStop(1);
}).prototype = p = new cjs.Sprite();



(lib.Ellipse7copy2 = function() {
	this.initialize(ss["Opening_door_animation_v2b_smaller_atlas_8"]);
	this.gotoAndStop(6);
}).prototype = p = new cjs.Sprite();



(lib.Ellipse7copy = function() {
	this.initialize(ss["Opening_door_animation_v2b_smaller_atlas_8"]);
	this.gotoAndStop(7);
}).prototype = p = new cjs.Sprite();



(lib._13copy = function() {
	this.initialize(ss["Opening_door_animation_v2b_smaller_atlas_8"]);
	this.gotoAndStop(8);
}).prototype = p = new cjs.Sprite();
// helper functions:

function mc_symbol_clone() {
	var clone = this._cloneProps(new this.constructor(this.mode, this.startPosition, this.loop));
	clone.gotoAndStop(this.currentFrame);
	clone.paused = this.paused;
	clone.framerate = this.framerate;
	return clone;
}

function getMCSymbolPrototype(symbol, nominalBounds, frameBounds) {
	var prototype = cjs.extend(symbol, cjs.MovieClip);
	prototype.clone = mc_symbol_clone;
	prototype.nominalBounds = nominalBounds;
	prototype.frameBounds = frameBounds;
	return prototype;
	}


(lib.Mon2 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer_1
	this.instance = new lib.Ellipse7copy7();

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(0,0,387,552);


(lib.Mon1 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer_1
	this.instance = new lib.Ellipse7copy2();

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(0,0,386,552);


(lib.Face1 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer_1
	this.instance = new lib._0();

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.Face1, new cjs.Rectangle(0,0,834,1293), null);


// stage content:
(lib.Openingdooranimation_v2bsmaller = function(mode,startPosition,loop) {
if (loop == null) { loop = false; }	this.initialize(mode,startPosition,loop,{});

	this.actionFrames = [0];
	// timeline functions:
	this.frame_0 = function() {
		this.clearAllSoundStreams();
		 
	}

	// actions tween:
	this.timeline.addTween(cjs.Tween.get(this).call(this.frame_0).wait(69));

	// Open_door_animation_working__psd
	this.instance = new lib.Face1();
	this.instance.setTransform(121.4,178,0.2498,0.2498,0,0,0,417.2,646.7);

	this.instance_1 = new lib._1();
	this.instance_1.setTransform(17,17,0.2498,0.2498);

	this.instance_2 = new lib._2();
	this.instance_2.setTransform(17,17,0.2498,0.2498);

	this.instance_3 = new lib._3();
	this.instance_3.setTransform(17,17,0.2498,0.2498);

	this.instance_4 = new lib._4();
	this.instance_4.setTransform(17,17,0.2498,0.2498);

	this.instance_5 = new lib._5();
	this.instance_5.setTransform(17,17,0.2498,0.2498);

	this.instance_6 = new lib._6();
	this.instance_6.setTransform(17,17,0.2498,0.2498);

	this.instance_7 = new lib._7();
	this.instance_7.setTransform(17,17,0.2498,0.2498);

	this.instance_8 = new lib._8();
	this.instance_8.setTransform(17,17,0.2498,0.2498);

	this.instance_9 = new lib._9();
	this.instance_9.setTransform(17,17,0.2498,0.2498);

	this.instance_10 = new lib._10();
	this.instance_10.setTransform(17,17,0.2498,0.2498);

	this.instance_11 = new lib._11();
	this.instance_11.setTransform(17,17,0.2498,0.2498);

	this.instance_12 = new lib._12();
	this.instance_12.setTransform(17,17,0.2498,0.2498);

	this.instance_13 = new lib._13();
	this.instance_13.setTransform(17,17,0.2498,0.2498);

	this.instance_14 = new lib._13copy();
	this.instance_14.setTransform(17,17,0.2498,0.2498);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.instance}]}).to({state:[{t:this.instance_1}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_3}]},1).to({state:[{t:this.instance_4}]},1).to({state:[{t:this.instance_5}]},1).to({state:[{t:this.instance_6}]},1).to({state:[{t:this.instance_7}]},1).to({state:[{t:this.instance_8}]},1).to({state:[{t:this.instance_9}]},1).to({state:[{t:this.instance_10}]},1).to({state:[{t:this.instance_11}]},1).to({state:[{t:this.instance_12}]},1).to({state:[{t:this.instance_13}]},1).to({state:[{t:this.instance_14}]},1).to({state:[{t:this.instance_14}]},25).to({state:[{t:this.instance_14}]},29).wait(1));

	// Monster_smiling_v3b_psd
	this.instance_15 = new lib.Mon1("synched",0);
	this.instance_15.setTransform(122.4,176.1,0.2498,0.2498,0,0,0,193.2,276.2);
	this.instance_15.alpha = 0;

	this.instance_16 = new lib.Mon2("synched",0);
	this.instance_16.setTransform(122.55,176.1,0.2498,0.2498,0,0,0,193.8,276.2);

	this.instance_17 = new lib.Ellipse7copy6();
	this.instance_17.setTransform(74,107,0.2498,0.2498);

	this.instance_18 = new lib.Ellipse7copy5();
	this.instance_18.setTransform(74,107,0.2498,0.2498);

	this.instance_19 = new lib.Ellipse7copy4();
	this.instance_19.setTransform(74,107,0.2498,0.2498);

	this.instance_20 = new lib.Ellipse7copy3();
	this.instance_20.setTransform(74,107,0.2498,0.2498);

	this.instance_21 = new lib.Ellipse7copy();
	this.instance_21.setTransform(74,107,0.2498,0.2498);
	this.instance_21._off = true;

	this.instance_22 = new lib.Ellipse7();
	this.instance_22.setTransform(74,107,0.2498,0.2498);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.instance_15}]}).to({state:[{t:this.instance_15}]},19).to({state:[{t:this.instance_16}]},1).to({state:[{t:this.instance_17}]},2).to({state:[{t:this.instance_18}]},2).to({state:[{t:this.instance_19}]},2).to({state:[{t:this.instance_20}]},2).to({state:[{t:this.instance_21}]},2).to({state:[{t:this.instance_22}]},2).to({state:[{t:this.instance_21}]},2).to({state:[{t:this.instance_16}]},2).to({state:[{t:this.instance_21}]},2).to({state:[{t:this.instance_20}]},2).to({state:[{t:this.instance_21}]},2).to({state:[{t:this.instance_22}]},2).to({state:[{t:this.instance_21}]},2).to({state:[{t:this.instance_16}]},2).to({state:[{t:this.instance_21}]},2).to({state:[{t:this.instance_21}]},2).to({state:[{t:this.instance_21}]},2).to({state:[{t:this.instance_21}]},2).to({state:[{t:this.instance_21}]},2).to({state:[{t:this.instance_21}]},2).to({state:[{t:this.instance_21}]},2).to({state:[{t:this.instance_21}]},2).to({state:[{t:this.instance_21}]},2).to({state:[{t:this.instance_21}]},2).wait(1));
	this.timeline.addTween(cjs.Tween.get(this.instance_15).to({alpha:1},19).to({_off:true,regX:193.8,x:122.55},1).wait(49));
	this.timeline.addTween(cjs.Tween.get(this.instance_21).wait(30).to({_off:false},0).to({_off:true},2).wait(2).to({_off:false},0).to({_off:true},2).wait(2).to({_off:false},0).to({_off:true},2).wait(2).to({_off:false},0).to({_off:true},2).wait(2).to({_off:false},0).to({_off:true},2).wait(2).to({_off:false},0).wait(19));

	this._renderFirstFrame();

}).prototype = p = new lib.AnMovieClip();
p.nominalBounds = new cjs.Rectangle(137,192.5,88.6,147.5);
// library properties:
lib.properties = {
	id: '97C87920408642E797438A406525D3B9',
	width: 240,
	height: 352,
	fps: 20,
	color: "#FFB800",
	opacity: 1.00,
	manifest: [
		{src:"images/Opening_door_animation_v2b_smaller_atlas_1.png", id:"Opening_door_animation_v2b_smaller_atlas_1"},
		{src:"images/Opening_door_animation_v2b_smaller_atlas_2.png", id:"Opening_door_animation_v2b_smaller_atlas_2"},
		{src:"images/Opening_door_animation_v2b_smaller_atlas_3.png", id:"Opening_door_animation_v2b_smaller_atlas_3"},
		{src:"images/Opening_door_animation_v2b_smaller_atlas_4.png", id:"Opening_door_animation_v2b_smaller_atlas_4"},
		{src:"images/Opening_door_animation_v2b_smaller_atlas_5.png", id:"Opening_door_animation_v2b_smaller_atlas_5"},
		{src:"images/Opening_door_animation_v2b_smaller_atlas_6.png", id:"Opening_door_animation_v2b_smaller_atlas_6"},
		{src:"images/Opening_door_animation_v2b_smaller_atlas_7.png", id:"Opening_door_animation_v2b_smaller_atlas_7"},
		{src:"images/Opening_door_animation_v2b_smaller_atlas_8.png", id:"Opening_door_animation_v2b_smaller_atlas_8"}
	],
	preloads: []
};



// bootstrap callback support:

(lib.Stage = function(canvas) {
	createjs.Stage.call(this, canvas);
}).prototype = p = new createjs.Stage();

p.setAutoPlay = function(autoPlay) {
	this.tickEnabled = autoPlay;
}
p.play = function() { this.tickEnabled = true; this.getChildAt(0).gotoAndPlay(this.getTimelinePosition()) }
p.stop = function(ms) { if(ms) this.seek(ms); this.tickEnabled = false; }
p.seek = function(ms) { this.tickEnabled = true; this.getChildAt(0).gotoAndStop(lib.properties.fps * ms / 1000); }
p.getDuration = function() { return this.getChildAt(0).totalFrames / lib.properties.fps * 1000; }

p.getTimelinePosition = function() { return this.getChildAt(0).currentFrame / lib.properties.fps * 1000; }

an.bootcompsLoaded = an.bootcompsLoaded || [];
if(!an.bootstrapListeners) {
	an.bootstrapListeners=[];
}

an.bootstrapCallback=function(fnCallback) {
	an.bootstrapListeners.push(fnCallback);
	if(an.bootcompsLoaded.length > 0) {
		for(var i=0; i<an.bootcompsLoaded.length; ++i) {
			fnCallback(an.bootcompsLoaded[i]);
		}
	}
};

an.compositions = an.compositions || {};
an.compositions['97C87920408642E797438A406525D3B9'] = {
	getStage: function() { return exportRoot.stage; },
	getLibrary: function() { return lib; },
	getSpriteSheet: function() { return ss; },
	getImages: function() { return img; }
};

an.compositionLoaded = function(id) {
	an.bootcompsLoaded.push(id);
	for(var j=0; j<an.bootstrapListeners.length; j++) {
		an.bootstrapListeners[j](id);
	}
}

an.getComposition = function(id) {
	return an.compositions[id];
}


an.makeResponsive = function(isResp, respDim, isScale, scaleType, domContainers) {		
	var lastW, lastH, lastS=1;		
	window.addEventListener('resize', resizeCanvas);		
	resizeCanvas();		
	function resizeCanvas() {			
		var w = lib.properties.width, h = lib.properties.height;			
		var iw = window.innerWidth, ih=window.innerHeight;			
		var pRatio = window.devicePixelRatio || 1, xRatio=iw/w, yRatio=ih/h, sRatio=1;			
		if(isResp) {                
			if((respDim=='width'&&lastW==iw) || (respDim=='height'&&lastH==ih)) {                    
				sRatio = lastS;                
			}				
			else if(!isScale) {					
				if(iw<w || ih<h)						
					sRatio = Math.min(xRatio, yRatio);				
			}				
			else if(scaleType==1) {					
				sRatio = Math.min(xRatio, yRatio);				
			}				
			else if(scaleType==2) {					
				sRatio = Math.max(xRatio, yRatio);				
			}			
		}			
		domContainers[0].width = w * pRatio * sRatio;			
		domContainers[0].height = h * pRatio * sRatio;			
		domContainers.forEach(function(container) {				
			container.style.width = w * sRatio + 'px';				
			container.style.height = h * sRatio + 'px';			
		});			
		stage.scaleX = pRatio*sRatio;			
		stage.scaleY = pRatio*sRatio;			
		lastW = iw; lastH = ih; lastS = sRatio;            
		stage.tickOnUpdate = false;            
		stage.update();            
		stage.tickOnUpdate = true;		
	}
}
an.handleSoundStreamOnTick = function(event) {
	if(!event.paused){
		var stageChild = stage.getChildAt(0);
		if(!stageChild.paused){
			stageChild.syncStreamSounds();
		}
	}
}


})(createjs = createjs||{}, AdobeAn = AdobeAn||{});
var createjs, AdobeAn;