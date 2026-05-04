(function (cjs, an) {

var p; // shortcut to reference prototypes
var lib={};var ss={};var img={};
lib.ssMetadata = [];


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


(lib.scooterai = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// scooter_ai
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#768C8E").s().p("AutJlIdbzUIgjB4IsKICQsYINhIAqQg5AhiVANg");
	this.shape.setTransform(535.35,501.8);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#415551").s().p("AhKCDQgngWgFg2QgFg2Afg2QAfg2AygWQAwgXAnAWQAmAWAFA2QAFA2gfA2QggA2gwAWQgZAMgWAAQgVAAgTgLg");
	this.shape_1.setTransform(619.35,409.825);

	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f("#E3B22D").s().p("AyhO+QM8oLBwhFQA1ghBfisILCnjQgxhOAHhtQAGhwA+hsQBRiLCAg8QCAg6BjA5QBkA6ANCMQANCMhRCMQg2BghUA9IgkB4IsJICQsYINhIAqQhJArjWAIg");
	this.shape_2.setTransform(531.7649,468.8999);

	this.shape_3 = new cjs.Shape();
	this.shape_3.graphics.f("#415551").s().p("AjKGMQiYgHiChKQiohihSi1QAXAbAmAiQBIA/BVAsQEOCLE+hZQFChaDKkfQA/haAshjIAfhUQgzCohcCYQhbCViCBvQiBBsiUA3QiDAyiDAAIghgBg");
	this.shape_3.setTransform(79.75,750.6389);

	this.shape_4 = new cjs.Shape();
	this.shape_4.graphics.f("#415551").s().p("AhKCCQgngWgFg2QgFg2Afg1QAfg2AygWQAwgXAmAWQAnAWAFA2QAFA2gfA1QgfA3gyAWQgXAMgWAAQgWAAgTgMg");
	this.shape_4.setTransform(94.625,712.1187);

	this.shape_5 = new cjs.Shape();
	this.shape_5.graphics.f("#768C8E").s().p("AltLGQhSgvgKhyQgLhyBChzQA1hbBSgzQBQgxBMAJIAogwICor2QDDgXCogqIlrQiIg0AjQgDBhgzBaQhCBzhpAvQg0AZgvAAQguAAgogYg");
	this.shape_5.setTransform(115.2719,668.7126);

	this.shape_6 = new cjs.Shape();
	this.shape_6.graphics.f("#E9AE2B").s().p("Al2glQCCiPCdgvQCfgwB9BIQBmA7AuB7QAsB4gVCVQk+immoh3g");
	this.shape_6.setTransform(105.2008,680.04);

	this.shape_7 = new cjs.Shape();
	this.shape_7.graphics.f("#495D59").s().p("AgUDMQk5hmlwhGQDTlOFFiDQCZg+CRACQCYADB7BHQDMB2BAD+QA/D2hbEnQkdiml/h8g");
	this.shape_7.setTransform(88.3516,661.4952);

	this.shape_8 = new cjs.Shape();
	this.shape_8.graphics.f("#E9AE2B").s().p("AATgsQAHgMAVgYIgNB+Ig5AiIgXABg");
	this.shape_8.setTransform(313.425,301.825);

	this.shape_9 = new cjs.Shape();
	this.shape_9.graphics.f("#F2F3F3").s().p("AJwUbQhlgDhEgZQhbgigbhFQhajmhChqQiMjhjhh9QjZh5jyBhQhLAehFAwQgiAZgUASQABh5AQi1QAfloBMkrQBpmiCyjrQDekkFDANQFDANC4DtQCTC+AzFEQAlDngPETQgICIgPBbIhvQ6Ig7Ajg");
	this.shape_9.setTransform(246.3935,179.1723);

	this.shape_10 = new cjs.Shape();
	this.shape_10.graphics.f("#C9818A").s().p("AmwFFQAfhyBuh3QCUieBohfQB/h0Blg5QBagzBcgUQAugKAbAAIg7BMQhOBghfBkQktE/lhDwQgGghAQg6g");
	this.shape_10.setTransform(152.2663,521.525);

	this.shape_11 = new cjs.Shape();
	this.shape_11.graphics.f("#C9818A").s().p("AhYCUQB+k2CqkoIAADAQAAAahEC1QhJDCg3BiQgwBZhYBMQgtAmgmAXQA4idA/iag");
	this.shape_11.setTransform(53.225,455.875);

	this.shape_12 = new cjs.Shape();
	this.shape_12.graphics.f("#FFFFFF").s().p("AipDbQgUgOgGgpQgQhgAJg+QAOhiBLiMQBHgDB/BiQAxAlAkAlQAjAkABANQACANgWAiQgXAmgjAmQhcBlhWAQQgjAHgbAAQgmAAgTgOg");
	this.shape_12.setTransform(58.6395,539.8696);

	this.shape_13 = new cjs.Shape();
	this.shape_13.graphics.f("#415551").s().p("AhBAvQhRitiWhWQhgg4h1gOQg7g6gsgbIAAAAQFLgLEyhLIBKA3QBcBKBRBaQEHEfBEFZIAKA4Qkui2l4jhg");
	this.shape_13.setTransform(158.8,640.775);

	this.shape_14 = new cjs.Shape();
	this.shape_14.graphics.f("#FDBF1B").s().p("AkuINQibhagUjYQgVjZB+jZQB9jZDGhbQDFhaCbBZQCbBZAUDZQAVDZh+DYQh9DajGBaQhjAuhZAAQhXAAhNgsg");
	this.shape_14.setTransform(94.625,712.1125);

	this.shape_15 = new cjs.Shape();
	this.shape_15.graphics.f("#5F7576").s().p("AhNAjQAPg5AKhNICjgWQg9BKAZBPQAMAoAYAaIjdAYQATgqAOgtg");
	this.shape_15.setTransform(327.9,319.375);

	this.shape_16 = new cjs.Shape();
	this.shape_16.graphics.f("#415551").s().p("AE0CXQhOgGkwgnIkhglQgYgagMgoQgYhPA8hKIE/ApQFJAqA5AGQAhAEASAjQARAggDAqQgEAsgYAbQgYAcgmAAIgJAAg");
	this.shape_16.setTransform(375.3944,322.2678);

	this.shape_17 = new cjs.Shape();
	this.shape_17.graphics.f("#415551").s().p("Ajgh8QgLgRAJgjQAKglAagbQBGhIBlBMQBNBnBGBhQBKBlASAgQAPAbgGBAQgDAggGAbQhCgxg3AiQgcARgOAbQj8llgdgrg");
	this.shape_17.setTransform(131.0061,176.4612);

	this.shape_18 = new cjs.Shape();
	this.shape_18.graphics.f("#768C8E").s().p("AAHA0QgLgVgeAaQgfAZghA9IAjj0QAOgbAcgRQA2giBBAxQgEBbAEDHQhAg7gbgxg");
	this.shape_18.setTransform(143.15,214.2744);

	this.shape_19 = new cjs.Shape();
	this.shape_19.graphics.f("#5A7070").s().p("AuFDkIHWkUQHckbAxgeQAxgfGAAMQDAAGC3ANQoNFFqEGAQhmAiiDACIgNAAQj7AAiJicg");
	this.shape_19.setTransform(307.35,585.7355);

	this.shape_20 = new cjs.Shape();
	this.shape_20.graphics.f("#5A7070").s().p("Al9DXQAWhbA2hzIK2moQAQCKgEBeQgGCDgsAcQhkA9qLF7QgFhlAYhkg");
	this.shape_20.setTransform(244.0146,530.75);

	this.shape_21 = new cjs.Shape();
	this.shape_21.graphics.f("#5D7473").s().p("AkRGRQiagEhOhTQiKiQBBkrQAUheAmhiIAihPIAAAAQEkESGdAfQDOAPCUgnIAJApQAKA1AIA2QhaBaiYBXQibBZijA1QilA1iCAAIgSAAg");
	this.shape_21.setTransform(196.6702,376.4881);

	this.shape_22 = new cjs.Shape();
	this.shape_22.graphics.f("#FDBF1B").s().p("AxLTrQg4hLgWhOQgahcALh9QAYkODfolQDspCFxnyQB0icBziAIBchiQEqFrHRA1QCRARCRgRQBIgIArgLIAMA3QAMBGAJBIQAaDlgeCjQqMOOrHISQjfCmjLBsQhmA2g9AXQkBgjhGhfg");
	this.shape_22.setTransform(138.8579,463.675);

	this.shape_23 = new cjs.Shape();
	this.shape_23.graphics.f("#C9818A").s().p("AicBAQgJgxAGg3IAIgwQCggdCZiIQgJB1h+GGQicgggbieg");
	this.shape_23.setTransform(609.7759,231.325);

	this.shape_24 = new cjs.Shape();
	this.shape_24.graphics.f("#E3B22D").s().p("At6NlQhDgUgxgiIgkgdQAmgXA0gjIACgCQAxgiApgfICoiSIA5g3IAAgBICIiMQAhgiAagdIBGhPQEIjSFxlyQC5i4CFiPQB5AWCBg1QBugsBmhaQgIBghcEqQhXEeiKGAQhqgrl8ECQkdDCkzEJQi3A1iWAAQhrAAhagbg");
	this.shape_24.setTransform(521.725,295.5585);

	this.shape_25 = new cjs.Shape();
	this.shape_25.graphics.f("#596F6F").s().p("AoUMHQh/gHhbgqQhdgsgghHQg3h4ApjLQANg/AVhAIASgzQAIgGAMgRQAZgjAXg1IATAgQAbAoAtAfQCQBkELgWQEPgXGrmzQCQiTCHinQBsiFAXgsQAQgdAYBjQAZBsACCXQh/E5j1EoQj5EskNCiQjxCRkGAAIgvgBg");
	this.shape_25.setTransform(401.5449,456.8536);

	this.shape_26 = new cjs.Shape();
	this.shape_26.graphics.f("#FFFFFF").s().p("AlbCJIAvgIQA7gNA+gbQDFhXCci/QBDAwA8BIQAeAkARAaQheBPiGA6QiJA8h4AAQhxAAhhg1g");
	this.shape_26.setTransform(218.225,307.2152);

	this.shape_27 = new cjs.Shape();
	this.shape_27.graphics.f("#FDBF1B").s().p("AmDKHQikhbiBiOQgiiIAJi2QASlrDZjrQATgSAigZQBFgwBMgeQDxhhDZB5QDhB9CNDhQBCBqBaDlIgKAeQgOAmgUAoQhBCAhkBjQj6D2mNAAQhxAAh+gUg");
	this.shape_27.setTransform(209.3069,288.1654);

	this.shape_28 = new cjs.Shape();
	this.shape_28.graphics.f("#5F7576").s().p("ApLJDIADgCIAAolQB7A/AiALQBUAaFtj+QFWjvDgjbQgMB/gVBmQgWBrgaAuQguBUjyDfQhHBCkRDyQhxBlh5AqQhQAdhNAAQgkAAgjgGg");
	this.shape_28.setTransform(638.5875,164.6197);

	this.shape_29 = new cjs.Shape();
	this.shape_29.graphics.f("#5F7576").s().p("AAwEnQg3gjgXghQgegrgFhLQgRj6gDixICsBhIAAIcg");
	this.shape_29.setTransform(470.5,134.925);

	this.shape_30 = new cjs.Shape();
	this.shape_30.graphics.f("#768C8E").s().p("AGKMYQiGhAkpiwQjjiGjviUIAAxIIHgEKQHoEMAnALIAARSIgCACQg5gLgzgYg");
	this.shape_30.setTransform(529.6,139.825);

	this.shape_31 = new cjs.Shape();
	this.shape_31.graphics.f("#FDBF1B").s().p("AhuQyQiLhDlBi+QjxiOjsiTQg4gigXghQgegrgFhMQgYl4ADjXQAIoRB/hgQG8jVGLgYQEygTEcBgQD4BVDtCjQD4CqAqB+QArB/gaErQgaEjg4BlQguBTjyDhQhHBCkSDyQh/BwiGAoQhDAUg/AAQhcAAhWgqg");
	this.shape_31.setTransform(580.0966,111.595);

	this.shape_32 = new cjs.Shape();
	this.shape_32.graphics.f("#768C8E").s().p("AvbTFQlLgfhflCQgqibATiJQARh3BJifIQUp8QAIgGAMgRQAZgjAXg2IASAhQAbAoAtAfQCQBkELgWQEQgXGqm0QCQiTCHinQBsiFAYgsQAIgPAOAeQAOAeALA+QAdCfgODBQgSD7haDXQhwEJjUCzQkUC6raG8QlsDek2C4QhwAlh6AAQgnAAgogDg");
	this.shape_32.setTransform(348.0769,501.7972);

	this.shape_33 = new cjs.Shape();
	this.shape_33.graphics.f("#5F7576").s().p("Aq4MgQjwgxh8icQgpg1gchAIgdhPQAWgMBhhLIApAzQA2A7BNAoQDzCAFrhtQFzhvHno/QCrjJCJjLQB3iyAEgjIA2AyQA6A7ATAyQgfDWliGuQiRCuifCgQiYCahtBTQjkCvi8A7Qh8AliKAAQhtAAh2gXg");
	this.shape_33.setTransform(414.75,306.4451);

	this.shape_34 = new cjs.Shape();
	this.shape_34.graphics.f("#768C8E").s().p("AtTL1QhNgog3g7IgogzQAqgpASgTQARgTARhHQAOg6AKhLQgfADg5ACIgyABIBCh+QAYgvDKimQDHimD8i2QEUjJDNh8QDuiPBRAAQCjAADHB3QBRAxAzAyQA0AygCAeQgEAjh3CyQiKDLiqDIQnnJAlzBvQimAyiOAAQimAAiEhFg");
	this.shape_34.setTransform(413.1557,276.9389);

	this.shape_35 = new cjs.Shape();
	this.shape_35.graphics.f("#E9AE2B").s().p("A1HbxQhVhghhhOIhQg7QmSBjmRgLQmngNhiiEQg4hMgWhOQgahcALh8QAYkODgolQDrpDFynyQBzibBziBIBchhQhxjMgWjeQgRi1AtitQAkiNA+hXQAaglAVgMQAVgNAJARQAeA2BQBGQAoAjAiAYQATgSAigYQBFgwBMgfQDxhgDaB5QDhB9CNDhQBCBqBaDmQAaBFBbAhQBEAZBlAEQBNACA9gIQgKBOgOA6QgOAsgTArQgSATgqApIguAjQgxAkgSAMQiABRixA8IiWAsIALA4QANBFAIBIQAbDmgeCjQgfCjjNHaQhnDuhgDOIQTp+QAWgRAcg5QA6hzAkjJQAbiWgLkxQA4AVA4ALQELA2DehEQC8g7DlivQBthTCZiaQCeigCRivQFjmuAejWQgSgyg6g7Ig3gyQACgYgjgoQgiglg8gqIDdiOQEgCqCFBAQCRBGCjgwQCHgoB/hxQgLCBiYHQQiUHFjIINQjYI2iuF1QjHGuhZA3QhvBEzVMNQzsMckFCiQg2lxkRkzg");
	this.shape_35.setTransform(322.6115,440.925);

	this.shape_36 = new cjs.Shape();
	this.shape_36.graphics.f("#E9AE2B").s().p("AgfHoQibhZgVjZQgUjYB9jaQA1haBFhIQBDhFBOgvQgdIuBLHuQgqAJgnAAQhYAAhJgrg");
	this.shape_36.setTransform(592.2811,413.5142);

	this.shape_37 = new cjs.Shape();
	this.shape_37.graphics.f("#FDBF1B").s().p("AkuINQibhZgUjZQgVjZB+jZQB9jZDHhbQDFhaCaBZQCbBaAUDYQAVDZh+DZQh9DZjGBbQhjAthZAAQhXAAhNgsg");
	this.shape_37.setTransform(619.325,409.8438);

	this.shape_38 = new cjs.Shape();
	this.shape_38.graphics.f("#5A7070").s().p("AjEN6QiZgHiChKQkCiWgulAQgsk2Csk9QBki4CSiLQCMiFCihJQCghICcgBQCggBCCBLQCCBLBMCGQBJCDANCqQAbFjjeFwQhaCWiDBvQiABsiUA3QiEAyiDAAIgggBg");
	this.shape_38.setTransform(79.2485,701.2132);

	this.shape_39 = new cjs.Shape();
	this.shape_39.graphics.f("#495D59").s().p("ACWN1QifgEiGhOQkDiVgtlAQgtk2Ctk9QCEjzDNifQDGiYDXglQgzF1gEF2QgFICBXHBQiSA7iQAAIgSAAg");
	this.shape_39.setTransform(570.3937,399.4869);

	this.shape_40 = new cjs.Shape();
	this.shape_40.graphics.f("#415551").s().p("AhKk9IEZAGIjPIkIjOBRg");
	this.shape_40.setTransform(76.775,635.175);

	this.shape_41 = new cjs.Shape();
	this.shape_41.graphics.f("#5A7070").s().p("AjEN6QiagHiBhKQkDiVgtlBQgtk2Ctk9QBki4CSiLQCLiFCjhJQCfhICcgBQChgBCCBLQCCBLBLCHQBJCCANCqQAbFkjdFwQhaCViEBvQh/BsiUA3QiEAyiDAAIgggBg");
	this.shape_41.setTransform(603.9654,398.9132);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_41},{t:this.shape_40},{t:this.shape_39},{t:this.shape_38},{t:this.shape_37},{t:this.shape_36},{t:this.shape_35},{t:this.shape_34},{t:this.shape_33},{t:this.shape_32},{t:this.shape_31},{t:this.shape_30},{t:this.shape_29},{t:this.shape_28},{t:this.shape_27},{t:this.shape_26},{t:this.shape_25},{t:this.shape_24},{t:this.shape_23},{t:this.shape_22},{t:this.shape_21},{t:this.shape_20},{t:this.shape_19},{t:this.shape_18},{t:this.shape_17},{t:this.shape_16},{t:this.shape_15},{t:this.shape_14},{t:this.shape_13},{t:this.shape_12},{t:this.shape_11},{t:this.shape_10},{t:this.shape_9},{t:this.shape_8},{t:this.shape_7},{t:this.shape_6},{t:this.shape_5},{t:this.shape_4},{t:this.shape_3},{t:this.shape_2},{t:this.shape_1},{t:this.shape}]}).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-0.1,0.1,698.6,790.3);


(lib.luxury_carai = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// luxury_car_ai
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#282627").s().p("AByA3QhmiCh1goQgqgQgfgBQhDguhEgjQAbglAvgPQA/gSBbAWQB2AdByB+QBcBlBLCPIhFCIQg5h/hKhcg");
	this.shape.setTransform(411.95,343.7576);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#444444").s().p("AEMFGQkBh0jqibQlDjWimjcIgBgDIAJhbQBABiBqBpQCOCMDKCFQDzCiERB4QDEBWDAA5QgYAYgmAWQjAg8jAhYg");
	this.shape_1.setTransform(99.775,499.35);

	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f("#444444").s().p("AFDFvQkfh5kDiqQjSiIiSiPQhthqhChmQAIg2AHgoQAuBcBkBtQCaCpD5ChQEFCqElB7QDJBUC+AyIgiA1QjEg1jKhWg");
	this.shape_2.setTransform(106.125,482.125);

	this.shape_3 = new cjs.Shape();
	this.shape_3.graphics.f("#0A0B0B").s().p("EggjAHQQGOkIGyjKQJ7kqKgiWQCNglC9gUQMyEdNwIYQwXCfyiAdQkCAGkFAAQq4AArPgsg");
	this.shape_3.setTransform(522.475,63.7318);

	this.shape_4 = new cjs.Shape();
	this.shape_4.graphics.f("#282627").s().p("AgVBIIjSgKQgOgMgOgXQgbguAFg4IDbAXQDsAXBtAJQADAfgfAdQgQAPghARQgHAEg5AAQg5AAhqgEg");
	this.shape_4.setTransform(511.8748,353.225);

	this.shape_5 = new cjs.Shape();
	this.shape_5.graphics.f("#444444").s().p("AgVCTIjSgJQgbgXgPgqQgehVA/hlIBNgaQBegVBUATQBgAVBPA7QBHA1ATAwQANAlghAiQgSARgkATQgHAEg5AAQg5AAhqgEg");
	this.shape_5.setTransform(511.8748,345.6793);

	this.shape_6 = new cjs.Shape();
	this.shape_6.graphics.f("#444444").s().p("AgEBKQjdh+gbgkQgagjACgnQADgmAVAHIAuAQQA7AWA+AeQDFBfCdCJQAQAggRAcQgOAYgWAEIgBAAQgYAAjTh5g");
	this.shape_6.setTransform(374.5588,231.043);

	this.shape_7 = new cjs.Shape();
	this.shape_7.graphics.f("#717172").s().p("AhtBXIgogGIErirIgDASQgHAlgbATQghAWg4AkQhBApgUAHIgJABQgMAAgbgEg");
	this.shape_7.setTransform(765.95,227.9167);

	this.shape_8 = new cjs.Shape();
	this.shape_8.graphics.f("#393939").s().p("Ah0B3IgngKIAAg7IAoAGQApAFAIgDQATgHBBgoQA5gjAggXQAXgRAKgeIAEgbQAKAnACAhQACAigHAKQgMAPhPAxQhNAvgfALQgOAFgTAAQgQAAgTgDg");
	this.shape_8.setTransform(766.5472,231.0705);

	this.shape_9 = new cjs.Shape();
	this.shape_9.graphics.f("#717172").s().p("AhtBXIgogFIErisIgDASQgIAlgbAUQgiAXg3AiQhAApgUAHIgJABQgMAAgbgEg");
	this.shape_9.setTransform(603.725,323.7667);

	this.shape_10 = new cjs.Shape();
	this.shape_10.graphics.f("#393939").s().p("Ah0B3IgngKIAAg7IAoAGQAoAFAIgDQAUgGBAgpQA3giAigYQAYgRAJgeIAFgbQAJAnACAiQACAigHAKQgLAPhQAwQhNAvgeALQgOAFgTAAQgPAAgUgDg");
	this.shape_10.setTransform(604.3222,326.9205);

	this.shape_11 = new cjs.Shape();
	this.shape_11.graphics.f("#FFFFFF").s().p("A7DR3QBqkfClk4QFHpqFckJQEKjKCThmQD4irDehyQI/klJGAAIAOAAQDmABB4AhQB3AhATBDQAVBLhmBhQhFBCigBmIgZAQUgCWABhguQAcUIhIAsgAB4tpQjaBxj0CoQiQBkkIDIQkjDekfHzQiwEziMFaUAsygbaACogBtIAZgQQB4hMA/gzQB1hggOgyQgKghhIgXQhvgjjvgCIgNAAQo6AAo2Eig");
	this.shape_11.setTransform(627.4293,272.575);

	this.shape_12 = new cjs.Shape();
	this.shape_12.graphics.f("#1A1A1B").s().p("AoMGuQByh+G+mnQDfjUDJi7IAXAdIAqAyQjiDmpyKoIhWAwg");
	this.shape_12.setTransform(245.425,188.025);

	this.shape_13 = new cjs.Shape();
	this.shape_13.graphics.f("#101111").s().p("A/KGLQjDiSiFiMIhehtIANhwQGZkjGEjKQLrmGMpi0QCMgmC9gTQQDFkRXLsQzKChuEJpQkaDAjWDXQhDBCg1A+IgnAwQvvlvpvnXg");
	this.shape_13.setTransform(533.175,136.25);

	this.shape_14 = new cjs.Shape();
	this.shape_14.graphics.f("#010202").s().p("AiVj8IBCgFIDpHTIhNAwg");
	this.shape_14.setTransform(747.3,179.475);

	this.shape_15 = new cjs.Shape();
	this.shape_15.graphics.f("#1A1A1B").s().p("AgKBzQgdhyhUgjQiCg1lFhqQFZhoFdACQIkADhlC0QgjA9hwBSQgnAdh8BPIj8CdQAIhngThOg");
	this.shape_15.setTransform(742.7109,182.9231);

	this.shape_16 = new cjs.Shape();
	this.shape_16.graphics.f("#0C0D0D").s().p("ApWkOQE6i2EthbQFGBqCBA1QBUAkAdByQAUBOgIBnIvMJVQg3i9iopxg");
	this.shape_16.setTransform(683.1164,217.925);

	this.shape_17 = new cjs.Shape();
	this.shape_17.graphics.f("#010202").s().p("AB1DyIjliKQALioisi4QEBByEiBqQg9BihkCzg");
	this.shape_17.setTransform(469.275,262.425);

	this.shape_18 = new cjs.Shape();
	this.shape_18.graphics.f("#1A1A1B").s().p("AgWhIQAAgig+g+QhAg6gCgHQgDgLACiaIA1gkIBVg4QA6D0BsJcIjYCFQApn3AAg8g");
	this.shape_18.setTransform(606.5684,251);

	this.shape_19 = new cjs.Shape();
	this.shape_19.graphics.f("#010202").s().p("AjJlxQBdg9BYgxQCnJxA3C9IjsCRQhrpcg8j1g");
	this.shape_19.setTransform(625.325,238.825);

	this.shape_20 = new cjs.Shape();
	this.shape_20.graphics.f("#0C0D0D").s().p("ApJG5QCLj9CQi/QCvjsCviGQD9jACbhrQgCCaADAMQACAHBAA5QA/A+gBAjQAAA7gpH4IrmHHg");
	this.shape_20.setTransform(545.75,278.325);

	this.shape_21 = new cjs.Shape();
	this.shape_21.graphics.f("#010202").s().p("AkHCDQBnjwB2jZIGCDoIqvGlQAchMA0h4g");
	this.shape_21.setTransform(491.45,355.175);

	this.shape_22 = new cjs.Shape();
	this.shape_22.graphics.f("#0C0D0D").s().p("Aj5g1QCqhaBkgVIDlCLIhoC+g");
	this.shape_22.setTransform(455.925,289.25);

	this.shape_23 = new cjs.Shape();
	this.shape_23.graphics.f("#010202").s().p("AjMASIGZj8QiBDyhvDjQhSh4hXhhg");
	this.shape_23.setTransform(438.675,350.6);

	this.shape_24 = new cjs.Shape();
	this.shape_24.graphics.f("#0C0D0D").s().p("APYMLQjCgEkbhGQkghHkThxQkrh7jHiLQmNkUi9lCQhUiPgRh0QgRh0A1hAIAABDQAIBVAjBfQBxEtFcESQDDCZETCFQD/B8EeBXQEVBUD2AgQD7AhCigdIgXAxQggBFi4AAIgXAAg");
	this.shape_24.setTransform(305.8186,317.3881);

	this.shape_25 = new cjs.Shape();
	this.shape_25.graphics.f("#1E1E1E").s().p("AjNA2QhwhNiBgxIFwjJIINEnImZD8Qh2iEh9hYg");
	this.shape_25.setTransform(414.45,324.925);

	this.shape_26 = new cjs.Shape();
	this.shape_26.graphics.f("#282627").s().p("AlzgXIEPiWQCXhPBcgTIDlCLQhWCZiED6g");
	this.shape_26.setTransform(443.725,299.95);

	this.shape_27 = new cjs.Shape();
	this.shape_27.graphics.f("#0C0D0D").s().p("AATD/Qi2ghhhgSQjHgmlMjLQC+i4EOg/QCZgjE1gKIKVF+In5EUQhwgricgfg");
	this.shape_27.setTransform(341.075,284.7);

	this.shape_28 = new cjs.Shape();
	this.shape_28.graphics.f("#1A1A1B").s().p("An+BoQgcjNAQiiQAMiAAmheQFxDvHVDRQCtC3gLCpQhcASiYBPIiFBKg");
	this.shape_28.setTransform(405.2068,241.325);

	this.shape_29 = new cjs.Shape();
	this.shape_29.graphics.f("#282627").s().p("AqQAiQFJizBtg4QBJgmCABlIBYBMQArAlAOABQAqAEHXkYQgHCMAXCqQk2AJiYAjQkOBAi+C3Qi0hwjTibg");
	this.shape_29.setTransform(288.425,250.775);

	this.shape_30 = new cjs.Shape();
	this.shape_30.graphics.f("#282627").s().p("AqhE0ITErAQAwAsBPA+IzTKvQhCgzgugmg");
	this.shape_30.setTransform(260.25,200.25);

	this.shape_31 = new cjs.Shape();
	this.shape_31.graphics.f("#1E1E1E").s().p("AooE7QiThth9hnITDq/QC3ChD3CgQgmBegMCAQgPChAbDOQk2AJiYAkQkOA/i+C3QjBh3jging");
	this.shape_31.setTransform(275.4,220.725);

	this.shape_32 = new cjs.Shape();
	this.shape_32.graphics.f("#1A1A1B").s().p("APBM1QjCgEkbhGQkghHkThxQkrh7jHiLQmNkVi9lBQhUiPgRh0QgRh0A1hAQAYgeA1g2QEHDXELC0QG9ErD1AuIE2A6QCsAjB8A4QFDCQEPGMQgsBagZA1QggBFi4AAIgXAAg");
	this.shape_32.setTransform(308.1186,313.1631);

	this.shape_33 = new cjs.Shape();
	this.shape_33.graphics.f("#010202").s().p("ARZInQiIgIkYgJQxXrrwCllIEBgLQExgFDvAhQgFACCCAnQC5A+DWBhQLLFDNJJlQh+gUjKgMg");
	this.shape_33.setTransform(705.225,70.0175);

	this.shape_34 = new cjs.Shape();
	this.shape_34.graphics.f("#717172").s().p("AszknQjWhgi5g+QiCgoAFgBQB9geFHgzQEkgsC6gWQA0AFDiBvQDnBwETCcQLJGREEECQipA7jsBgIjKBVQtIpmrMlDg");
	this.shape_34.setTransform(775.6158,64.15);

	this.shape_35 = new cjs.Shape();
	this.shape_35.graphics.f("#474644").s().p("AguCDQgVgPgPgSIgLgPQgPgUgFgdQgMg3AvglQAsgiBfhcQApCKAPDnQhigEhBgyg");
	this.shape_35.setTransform(916.387,144);

	this.shape_36 = new cjs.Shape();
	this.shape_36.graphics.f("#393939").s().p("AgnClQgviRgLiXQAbh+AohjQAPglAcgyIgPCTQgLCjAaBOQAtB/ATBcQAdCPgLCJQhVh7gxicg");
	this.shape_36.setTransform(15.8863,413.275);

	this.shape_37 = new cjs.Shape();
	this.shape_37.graphics.f("#282627").s().p("Al3CnQAmggA9gkQB7hHB3gWQB2gVCehSICGhOQglCvjKBgQimBQjIAAQhAAAhSgJg");
	this.shape_37.setTransform(267.675,539.475);

	this.shape_38 = new cjs.Shape();
	this.shape_38.graphics.f("#FFFFFF").s().p("Ap+BzQAwg3BFhvIA7hlIAuAMQA7APBCALQDTAjDJgSQB+gMDAgXQCOgNA6ASQiWBclnAjQj6AYjAgIQhigFhEBHQghAjgOAkQhFgVgsgRg");
	this.shape_38.setTransform(235.175,530.575);

	this.shape_39 = new cjs.Shape();
	this.shape_39.graphics.f("#626363").s().p("AFdF+QmJjBkojLQmWkYiZkAQAjgFAwgLIBcBrQB9CECkCCQILGeLODtQA+BQAgAhQk6hFjth0g");
	this.shape_39.setTransform(98.875,575.5);

	this.shape_40 = new cjs.Shape();
	this.shape_40.graphics.f("#0C0D0D").s().p("AAQC+QhKgPhHhxIAAgFQgBiIAChwQBoCsCbCTIAAAAIgbAlQgdAbglAAQgLAAgLgCg");
	this.shape_40.setTransform(13.0429,486.5276);

	this.shape_41 = new cjs.Shape();
	this.shape_41.graphics.f("#0C0D0D").s().p("ACcC1QkdgKhwguQhignhaiKQgcgrgYgwIgTgnIABAAQCbAlCOAMQFCAaD5ggQBBBhAjBIQA1BugjAUQgpAXipAAQg2AAhDgCg");
	this.shape_41.setTransform(235.8841,602.6469);

	this.shape_42 = new cjs.Shape();
	this.shape_42.graphics.f("#0C0D0D").s().p("AFdGrQmJjBkojMQmWkXiZkAQAtgFA6gQQBzgfBKg2IABAAQA0ApA4AmQDtCfDJB0QEBCTDoBiIAAABIDIESQDTEfA8A+Qk6hFjth0g");
	this.shape_42.setTransform(98.875,570.975);

	this.shape_43 = new cjs.Shape();
	this.shape_43.graphics.f("#717172").s().p("AhLCpQg2icgMimQAbh9AohjQAOglAegzQAPCfBQDDQAoBhAlBBIgVBeQgZCEgQC9Qhhh/g6iqg");
	this.shape_43.setTransform(20.325,415.4);

	this.shape_44 = new cjs.Shape();
	this.shape_44.graphics.f("#010202").s().p("AEJJrIhPgjQkCh2kEisQjciRiviXQgVgigUguQgnhbAGhAQAQi8AYiEIAWhfQDwF8IQEQQFTCwGzB3Ig7BlQhFBwgwA3QgkAnhAAaQg6AZg8AAQhGAAhKgig");
	this.shape_44.setTransform(108.566,485.7036);

	this.shape_45 = new cjs.Shape();
	this.shape_45.graphics.f("#444444").s().p("AlFCdQjOgtiKg1QAwg3BFhvIA7hlIAuAMQA7APBCALQDTAjDJgSQBIgHCSgRQB0gOA1gCQCXgIAqA7QglCujKBhQinBQjIAAQiaAAjrg0g");
	this.shape_45.setTransform(238.275,536.175);

	this.shape_46 = new cjs.Shape();
	this.shape_46.graphics.f("#717172").s().p("AxpRgQoRkRjwl8QAAjWHApQQDYkeIEpeQCehzBUhEIBUBJQg1BAARB0QASB0BTCOQC9FCGNEWQFJDmIYChQDsBHDNAhQDSAhB8gOQqyFGojEXQuBHLh4CMQmzh3lTiwg");
	this.shape_46.setTransform(224.475,373.725);

	this.shape_47 = new cjs.Shape();
	this.shape_47.graphics.f("#626363").s().p("A26L/QBvisDNh4QD/iUQMpOQQYpWBKgnQBBghBwAmQA3ATArAZI23NKQ3ONXh+BGQAPg+A4hXg");
	this.shape_47.setTransform(594.65,444.6652);

	this.shape_48 = new cjs.Shape();
	this.shape_48.graphics.f("#393939").s().p("EgmbAi6Qnvg9lpixQoGj+lQkHQngl4gDlCQgCiJAChvQBPCABqBzQCHCSCpByQGzEkFbCjQHhDjGTAhQGQAhEZg4QDVgqBahNQALhFAjhkQAxiMBJh8QDUlmFZhkQFXhkCHEGQAtBYAQB2QALBUgGA0QB9hGXPtYIW3tJQAEhBARhmQAjjLBCi1QDVpGHFiWQDGg9B6BHQBnA8AhCMQAlgZBwhHQBvhIBKhAQDijBANjTQALAjgIBlQgJBtgcB7QhKFBiJCZQiKCajeCcQAjiCgJiVQgKihg8hqQhEh5h3gNQiKgPi/CHQkzDYiMGtQhYENgIEpQ/eSLzXLAQAXiNgXiPQgYichGhfQhRhth9gGQiQgFi+CFQkaDGh0FzQhREEAHE4QkYCYg2AUQhvAoi9AHIhLABQiaAAixgVg");
	this.shape_48.setTransform(465.3985,414.064);

	this.shape_49 = new cjs.Shape();
	this.shape_49.graphics.f("#444444").s().p("EgmbAlvQnvg8lpixQoGj+lQkIQngl4gDlBQgElpAUjwQArDbCECZQBYBlCwCOQDLCiDoCMQJiFyH5AsQIaAuDhhuQBqg0BFhhQA5hPA0iOQDZi3F6kIQHVlJIZlCQHNkTTkr5IWXtmQEEicITkbQEKiNDWhuIALAPQAPASAVAPQBCAyBiAEQAEA9AEBkQAFBLAIAYQALAjgIBmQgJBtgcB6QhKFBiJCaQiKCajeCcQAjiCgJiVQgKiig8hpQhEh6h3gMQiKgPi/CGQkzDYiMGtQhYEOgIEoQ/eSMzXK/QAXiNgXiOQgYichGhgQhRhth9gFQiQgGi+CFQkaDHh0FzQhREDAHE4QkYCZg2ATQhvAoi9AHIhLABQiaAAixgVg");
	this.shape_49.setTransform(465.3973,395.939);

	this.shape_50 = new cjs.Shape();
	this.shape_50.graphics.f("#626363").s().p("EgmbAxpQnwg9lpixQoFj+lRkHQnfl4gElCQgEmQAZj7QAdkuBOjBQA7iTC9jRQDlj9FQjyILJoCQC7iMCKiQQDWjgDojdQE4krCjhxQDNiQBIgvQDzifECiJQL/mZNCi7QCOglC9gTQQCFkRYLsQEYAKCIAHQDKAMB+AUQtJplrMlEQjWhhi5g9QiCgoAFgBQB9gfFHgyQEkgtC6gVQA5AGD+B9QEHCCEqCsQMPHECxDyQBPCYAXEiIAMDFQAFBeAIAaQAMAjgJBlQgJBtgcB7QhKFBiJCZQiKCajdCcQAiiCgJiVQgKihg7hqQhFh5h3gNQiKgPi/CHQkzDYiMGtQhXEMgJEpQ/dSMzYLAQAXiNgWiPQgZichGhfQhQhth+gGQiQgFi9CFQkaDGh0FzQhREEAHE4QkYCYg2AUQhvAoi9AHIhLABQiaAAixgVgEgjKgVLQnJG3heByQg1BAARB0QARB0BUCPQC9FCGNEUQDHCLErB7QEUBxEgBHQEbBGDCAEQDNAEAihJQBXi8DXmaQD3nXCIjaQvulvpwnXQjDiSiFiMIhehuQhZBLmmGVgAbc1pQjfBwj6CqQijBwkNDMQlaEHlJJ1QilE6heEGUAuNgcTACYgBiQB8hQAngdQBwhSAjg+QBli0okgDIgOAAQo0AAorEXg");
	this.shape_50.setTransform(465.4026,319.789);

	this.shape_51 = new cjs.Shape();
	this.shape_51.graphics.f("#1A1A1B").s().p("AgdA5QgOgIgBgWQgCgWANgWQAMgXATgMQARgLAPAIQAOAHABAWQABAWgMAWQgNAYgSALQgLAGgJAAQgHAAgFgCg");
	this.shape_51.setTransform(374.5707,562.046);

	this.shape_52 = new cjs.Shape();
	this.shape_52.graphics.f("#0C0D0D").s().p("AhJBxQgEgCAAgEIgIiMQAAgEAEgCICehIQAEgCADADQADAEgDAEQhKBmhMBuQgCADgDAAIgCAAg");
	this.shape_52.setTransform(354.3068,580.5248);

	this.shape_53 = new cjs.Shape();
	this.shape_53.graphics.f("#0C0D0D").s().p("AgjCgQgbgagLggQgGgSAAgQIABgDICTjfQADgEAFACQAEADgBAFQg5CogwCNQgBADgDABIgCAAQAAAAgBAAQAAAAgBAAQAAAAgBAAQAAgBgBAAg");
	this.shape_53.setTransform(356.2688,590.7604);

	this.shape_54 = new cjs.Shape();
	this.shape_54.graphics.f("#1E1E1E").s().p("Ag2CgQgGgCACgGIBelAQACgFAFAAQAFABABAFQAEC1AHCZQAAAFgGABIgTABQgoAAgxgOg");
	this.shape_54.setTransform(363.2839,594.6358);

	this.shape_55 = new cjs.Shape();
	this.shape_55.graphics.f("#0C0D0D").s().p("AhZBUQgEgCABgEQAShvAdgxQAEgEAEACIB/A7QADACAAADQABAEgDACQgmAXiIBMIgDABIgDgCg");
	this.shape_55.setTransform(356.3255,563.2748);

	this.shape_56 = new cjs.Shape();
	this.shape_56.graphics.f("#0C0D0D").s().p("AA4BcIh1g5QgFgDACgFQAfhDAxgxQADgDADABQAEABABAEIAmCrQABAEgDACQAAAAgBAAQAAABgBAAQAAAAgBAAQAAAAgBAAIgDAAg");
	this.shape_56.setTransform(361.3234,546.0388);

	this.shape_57 = new cjs.Shape();
	this.shape_57.graphics.f("#0C0D0D").s().p("AgTCEQgFAAgBgFIgUjAQAAgDACgCQAqgjAmgZQAEgCADACQADADgBAEIg7D7QgBAEgEAAIgBAAg");
	this.shape_57.setTransform(374.2875,535.9331);

	this.shape_58 = new cjs.Shape();
	this.shape_58.graphics.f("#0C0D0D").s().p("AhhCUQgFgCACgFQANglAkhpIAviJQACgEACAAQAUgCBLgDQAEAAACADQACADgDADIi9EcQgCACgDAAIgDAAg");
	this.shape_58.setTransform(387.2159,532.5946);

	this.shape_59 = new cjs.Shape();
	this.shape_59.graphics.f("#1E1E1E").s().p("AiLCPQgEgEADgEIDVkUQADgFAFADQA4AsAFAxQABADgDADQgvAfhkBGIh9BXIgDABQgBAAAAAAQgBAAAAAAQgBAAAAgBQgBAAAAgBg");
	this.shape_59.setTransform(396.6219,534.0422);

	this.shape_60 = new cjs.Shape();
	this.shape_60.graphics.f("#1E1E1E").s().p("AiKBXQgCgFAEgDIB+hRQBZg5AwgeQADgBADACQADABAAAEQAGBLgGAlQAAADgFABIkGA5IgCAAQgDAAgCgDg");
	this.shape_60.setTransform(399.6042,545.327);

	this.shape_61 = new cjs.Shape();
	this.shape_61.graphics.f("#1E1E1E").s().p("ABbBQIjehoQgEgCAAgEQABgEAEgBIECgtQADAAADACQACACAAADQgDAwgPAwQgJAfgKAXQgCAEgDAAIgDgBg");
	this.shape_61.setTransform(397.7222,564.8958);

	this.shape_62 = new cjs.Shape();
	this.shape_62.graphics.f("#1E1E1E").s().p("AARB9QgDgBgBgCIiCjtQgCgEADgDQADgEAEACIDhBdQAFADgCAFQgYA5ggAtQgVAcgUARQgBAAAAABQgBAAAAAAQgBAAAAAAQgBABAAAAIgBgBg");
	this.shape_62.setTransform(391.6991,583.6575);

	this.shape_63 = new cjs.Shape();
	this.shape_63.graphics.f("#1E1E1E").s().p("Ag3CbQgDgBAAgDIgRksQAAgEAEgCQAEgBADADQBlCWAmBCQACAEgDADQg1A/hHAXIgCAAIgDgBg");
	this.shape_63.setTransform(380.1496,594.7442);

	this.shape_64 = new cjs.Shape();
	this.shape_64.graphics.f("#626363").s().p("AkNH/Qh/hEgLjFQgMjGBwjSQBvjTCqhmQCohmCABDQB/BEALDFQAMDGhwDRQhwDUipBmQhlA9hXAAQg5AAgzgag");
	this.shape_64.setTransform(380.65,564);

	this.shape_65 = new cjs.Shape();
	this.shape_65.graphics.f("#010202").s().p("AlbKSQikhWgOj/QgPj+CQkQQCQkQDaiEQDaiDCkBXQClBXAOD+QAOD+iQEQQiQEQjaCEQiCBPhwAAQhKAAhCgjg");
	this.shape_65.setTransform(379.85,563.575);

	this.shape_66 = new cjs.Shape();
	this.shape_66.graphics.f("#1A1A1B").s().p("AgcA4QgOgHgBgVQgCgWAMgWQAMgXARgMQASgLAOAHQAOAHACAVQACAWgMAWQgMAXgSAMQgLAHgJAAQgGAAgGgDg");
	this.shape_66.setTransform(811.45,312.375);

	this.shape_67 = new cjs.Shape();
	this.shape_67.graphics.f("#0C0D0D").s().p("AhDBxQgEgBgBgEQgGhAgEhKQgBgFAEgBICZhLQAFgCADAEQADADgDAEQhxCmgeAuQgCADgDAAIgBAAg");
	this.shape_67.setTransform(791.7718,330.9998);

	this.shape_68 = new cjs.Shape();
	this.shape_68.graphics.f("#0C0D0D").s().p("AgeCeQgbgZgMgeQgGgSAAgQIABgDICLjeQADgEAFACQAFACgCAFQgmB8g6C3QgBADgDABIgCAAQgBAAAAAAQgBAAAAAAQgBgBAAAAQAAAAgBgBg");
	this.shape_68.setTransform(793.9938,340.981);

	this.shape_69 = new cjs.Shape();
	this.shape_69.graphics.f("#1E1E1E").s().p("Ag1CfQgFgBABgGIBWk+QABgFAFABQAFABABAFQAKDEAICDQABAGgGABIgYABQgkAAgvgMg");
	this.shape_69.setTransform(801.3995,344.6087);

	this.shape_70 = new cjs.Shape();
	this.shape_70.graphics.f("#0C0D0D").s().p("AhXBUQgDgDAAgDQAPhuAcgwQADgGAFADIB+A3QAEACgBADQABAEgDACQgsAdh9BIIgCABIgEgBg");
	this.shape_70.setTransform(793.6,314.1415);

	this.shape_71 = new cjs.Shape();
	this.shape_71.graphics.f("#0C0D0D").s().p("AA4BZIh0g1QgBAAgBAAQAAAAAAgBQgBAAAAAAQAAgBAAgBQgBAAAAgBQAAAAAAgBQAAAAAAgBQAAgBABAAQAchCAwgzQACgCAEABQAEABAAADIAqCoQABADgDADIgEABIgDgBg");
	this.shape_71.setTransform(798.1875,296.8552);

	this.shape_72 = new cjs.Shape();
	this.shape_72.graphics.f("#0C0D0D").s().p("AgOCDQgFAAgBgFIgYi8QAAgDACgDQApgkAlgYQADgDAEADQADACgBAEIg1D5QgBAEgEAAIgBAAg");
	this.shape_72.setTransform(810.3833,286.69);

	this.shape_73 = new cjs.Shape();
	this.shape_73.graphics.f("#0C0D0D").s().p("AhcCTQgFgCACgFQALghAihsQAhhpALgeQABgDADgBQAQgDBMgEQAEgBACAEQACADgCADIi0EbQgCADgDAAIgDgBg");
	this.shape_73.setTransform(823.2409,283.1552);

	this.shape_74 = new cjs.Shape();
	this.shape_74.graphics.f("#1E1E1E").s().p("AiHCPQgEgEADgEIDLkVQAEgEAEADQAUAPAPARQAYAdAEAdQABAEgEABQgrAfhjBJIh4BYIgEABQAAAAgBAAQAAAAgBAAQgBgBAAAAQgBAAAAgBg");
	this.shape_74.setTransform(832.6169,284.4177);

	this.shape_75 = new cjs.Shape();
	this.shape_75.graphics.f("#1E1E1E").s().p("AiGBYQgCgEAEgDIB6hTQBXg7AugdQACgCADACQADABABAEQAHBMgFAiQAAAEgFABIkBA+IgBAAQgEAAgBgEg");
	this.shape_75.setTransform(835.7708,295.4091);

	this.shape_76 = new cjs.Shape();
	this.shape_76.graphics.f("#1E1E1E").s().p("ABcBPIjdhhQgEgCABgEQAAgFAEgBID+gxQADAAACACQACACAAADQgEBPgdBFQgBAEgEAAIgDgBg");
	this.shape_76.setTransform(834.1514,314.4341);

	this.shape_77 = new cjs.Shape();
	this.shape_77.graphics.f("#1E1E1E").s().p("AAVB6QgDgBgCgCIiEjnQgCgEACgDQADgDAEABQCmBAA5AXQAGACgCAGQgWA5gfAsQgVAdgTAQQAAABgBAAQAAAAgBABQAAAAAAAAQgBAAAAAAIgBAAg");
	this.shape_77.setTransform(828.6322,333.3575);

	this.shape_78 = new cjs.Shape();
	this.shape_78.graphics.f("#1E1E1E").s().p("Ag1CUIgXkmQgBgFAFgBQAEgCACAEQBpCSAlA/QACADgDAEQgfAmgoAZQgZAQgYAIIgCABQgFAAgBgGg");
	this.shape_78.setTransform(817.5543,344.5736);

	this.shape_79 = new cjs.Shape();
	this.shape_79.graphics.f("#626363").s().p("Aj9H8Qh/hAgPjBQgQjCBqjRQBpjSCkhoQCjhoB/A/QB/BAAPDBQAQDChqDRQhpDTikBnQhlBBhYAAQg1AAgwgYg");
	this.shape_79.setTransform(817.475,314.175);

	this.shape_80 = new cjs.Shape();
	this.shape_80.graphics.f("#010202").s().p("AlHKPQijhSgUj5QgUj6CIkPQCIkPDTiGQDTiGCkBSQCjBSAUD5QAUD6iIEPQiHEPjUCGQiCBThxAAQhFAAg/gfg");
	this.shape_80.setTransform(816.675,313.7904);

	this.shape_81 = new cjs.Shape();
	this.shape_81.graphics.f("#010202").s().p("AmbMNQjEgjh1hRQgTiHDcoeQBEipBVi+IBGidIKJkPIF5BCIjbL7IrqMCQhKgBhigSg");
	this.shape_81.setTransform(383.2706,552.65);

	this.shape_82 = new cjs.Shape();
	this.shape_82.graphics.f("#010202").s().p("AltMqQi4gVhhg1QAKkCCVnTQAviSA3iVIAth4IKKmhIElA3IAsI/IhrDlIrkMQQhJAAhcgMg");
	this.shape_82.setTransform(815.675,300.05);

	this.shape_83 = new cjs.Shape();
	this.shape_83.graphics.f("#282627").s().p("AhKBJIgghCQgMgigCgqQgEhWA0grIAEA3QAOBGA2BJQAuA+BMA6QgrAygeAdQhLgzgwhLg");
	this.shape_83.setTransform(207.9857,182.9);

	this.shape_84 = new cjs.Shape();
	this.shape_84.graphics.f("#626363").s().p("Ah7BJIghhCQgMgigCgqQgEhWA0grQCGAABdBnQAvAzATAzQhrB/hABBQhLgzgwhLg");
	this.shape_84.setTransform(212.9357,182.9);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_84},{t:this.shape_83},{t:this.shape_82},{t:this.shape_81},{t:this.shape_80},{t:this.shape_79},{t:this.shape_78},{t:this.shape_77},{t:this.shape_76},{t:this.shape_75},{t:this.shape_74},{t:this.shape_73},{t:this.shape_72},{t:this.shape_71},{t:this.shape_70},{t:this.shape_69},{t:this.shape_68},{t:this.shape_67},{t:this.shape_66},{t:this.shape_65},{t:this.shape_64},{t:this.shape_63},{t:this.shape_62},{t:this.shape_61},{t:this.shape_60},{t:this.shape_59},{t:this.shape_58},{t:this.shape_57},{t:this.shape_56},{t:this.shape_55},{t:this.shape_54},{t:this.shape_53},{t:this.shape_52},{t:this.shape_51},{t:this.shape_50},{t:this.shape_49},{t:this.shape_48},{t:this.shape_47},{t:this.shape_46},{t:this.shape_45},{t:this.shape_44},{t:this.shape_43},{t:this.shape_42},{t:this.shape_41},{t:this.shape_40},{t:this.shape_39},{t:this.shape_38},{t:this.shape_37},{t:this.shape_36},{t:this.shape_35},{t:this.shape_34},{t:this.shape_33},{t:this.shape_32},{t:this.shape_31},{t:this.shape_30},{t:this.shape_29},{t:this.shape_28},{t:this.shape_27},{t:this.shape_26},{t:this.shape_25},{t:this.shape_24},{t:this.shape_23},{t:this.shape_22},{t:this.shape_21},{t:this.shape_20},{t:this.shape_19},{t:this.shape_18},{t:this.shape_17},{t:this.shape_16},{t:this.shape_15},{t:this.shape_14},{t:this.shape_13},{t:this.shape_12},{t:this.shape_11},{t:this.shape_10},{t:this.shape_9},{t:this.shape_8},{t:this.shape_7},{t:this.shape_6},{t:this.shape_5},{t:this.shape_4},{t:this.shape_3},{t:this.shape_2},{t:this.shape_1},{t:this.shape}]}).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(0,0,930.8,639.6);


(lib.logo_nrsvg = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// logo_nr_svg
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#000000").s().p("AgUCaQgKgJAAgNIAAixIgEAAQgDgZgQgNQgPgNgYAAQgXAAgPANQgRANgEAWIgCAnIAACNQAAANgJAJQgJAIgPAAQgNAAgKgIQgKgJAAgNIAAinQAAg+AlgiQAigfA4AAQBDAAAaAwQANgZAbgMQAWgLAeAAQA4AAAiAfQAlAiAAA+IAACnQAAANgKAJQgKAIgNAAQgNAAgKgIQgKgJAAgNIAAiNQAAghgDgGQgDgWgQgNQgQgNgXAAQgWAAgQANQgRAOgEAYQgBAFABAIIAAAPIAACVQABANgKAJQgKAJgOAAQgMAAgJgJg");
	this.shape.setTransform(156.75,28.525);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#000000").s().p("ABjChQgNgBgIgKIhOhoIhMBoQgKAKgNABQgOABgJgHQgLgJgCgOQgCgOAHgLIBXhsIhUhrQgIgKACgOQABgOAKgIQALgIAOACQANACAIAJIBOBgIBJhgQAKgJANgCQAOgCAJAIQAMAKABANQACANgKAKIhUBrIBXBsQAJALgBAOQgCANgLAKQgKAGgLAAIgEAAg");
	this.shape_1.setTransform(100.2892,28.75);

	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f("#000000").s().p("AgcAdQgMgMAAgRQAAgQAMgMQAMgMAQAAQARAAAMAMQAMAMAAAQQAAARgMAMQgMAMgRAAQgQAAgMgMg");
	this.shape_2.setTransform(124.325,4.075);

	this.shape_3 = new cjs.Shape();
	this.shape_3.graphics.f("#000000").s().p("AgWCZQgKgJAAgNIAAkFQAAgNAKgJQAJgIANAAQAOAAAJAIQAKAJAAANIAAEFQAAANgKAJQgJAIgOAAQgNAAgJgIg");
	this.shape_3.setTransform(124.325,28.625);

	this.shape_4 = new cjs.Shape();
	this.shape_4.graphics.f("#000000").s().p("AgYCaQgKgJAAgNIAAiVIABgPQABgIgCgFQgDgZgQgNQgPgNgYAAQgXAAgQANQgQANgEAWQgCAGAAAhIAACNQAAANgJAJQgKAIgOAAQgNAAgKgIQgKgJAAgNIAAinQAAg+AlgiQAigfA4AAQAeAAAWALQAbAMANAZQANgZAbgMQAYgLAdAAQA4AAAiAfQAlAiAAA+IAACnQAAANgKAJQgKAIgNAAQgOAAgJgIQgKgJAAgNIAAiNIgCgnQgFgWgPgNQgQgNgXAAQgXAAgQANQgQANgDAZQgDAIAAAUIAACVQAAANgJAJQgJAJgOAAQgOAAgKgJg");
	this.shape_4.setTransform(22,28.525);

	this.shape_5 = new cjs.Shape();
	this.shape_5.graphics.f("#EB190E").s().p("AAAClQhEAAgwgwQgwgwAAhFQAAhDAwgxQAxgwBDAAQBFAAAwAwQAwA1AAA/IAAB6QAAATgMAMQgMAMgTAAgAhDhBQgOALgHASQgHASAAASQAAAUAHARQAHASAOALQAbAcAnAAIABAAQAnAAAbgcQAMgLAIgSQAIgSAAgTQAAgRgIgTQgIgRgMgMQgbgcgoAAQgnAAgbAcg");
	this.shape_5.setTransform(65.325,28.475);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_5},{t:this.shape_4},{t:this.shape_3},{t:this.shape_2},{t:this.shape_1},{t:this.shape}]}).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(0,0,178.8,45);


(lib.carai = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// car_ai
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#FFF200").s().p("AmUIYQgZgOAAgcIAApNQAAgNAHgMQAHgLAMgGIL8mOQAYgMAWANQAXAOAAAaIAAHcQAAAYgVAOIr9IBQgNAJgNAAQgLAAgLgGg");
	this.shape.setTransform(658.975,343.8141);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#FFF200").s().p("AmWIXQgXgOAAgbIAAnbQAAgYAVgOIL9oBQAXgQAZANQAZANAAAcIAAJOQAAANgHAMQgHALgMAGIr8GOQgLAGgLAAQgMAAgMgHg");
	this.shape_1.setTransform(517.625,420.2859);

	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f("#74758E").s().p("Ag8BOQiRgjg3g0QgCgsAMgyQBzA6BuAdQCeAqB+gVQAIAlgnAdQgnAeg4ACIgQABQhFAAhsgag");
	this.shape_2.setTransform(489.5026,370.8689);

	this.shape_3 = new cjs.Shape();
	this.shape_3.graphics.f("#B3B7C4").s().p("Ag7CUQiSgig2g1QgDg+AUg8QAph5B3AJQB7AKByBnQArAmAeAoQAbAlAFAVQAIAkgoAeQgmAdg4ADIgRAAQhFAAhrgag");
	this.shape_3.setTransform(489.4982,363.8093);

	this.shape_4 = new cjs.Shape();
	this.shape_4.graphics.f("#74758E").s().p("AiVBbQgGgjAYgPQCAhMByhLQAhgWAGAjQAGAigaAaQgaAahdA7QheA9geAJQgGABgFAAQgUAAgFgcg");
	this.shape_4.setTransform(736.8381,252.1377);

	this.shape_5 = new cjs.Shape();
	this.shape_5.graphics.f("#74758E").s().p("AiaBTQgEgjAZgNQCOhMBrg/QAigUAFAiQAEAigbAZQgbAZhhA2QhhA4geAIIgKABQgVAAgEgeg");
	this.shape_5.setTransform(588.4223,348.3477);

	this.shape_6 = new cjs.Shape();
	this.shape_6.graphics.f("#B3B7C4").s().p("AgEBGQjSh3gagiQgZgiADglQACgkAUAHIAsAPQA4AVA7AcQC8BbCVCCQAPAegQAbQgOAXgUAEIgBAAQgXAAjJh0g");
	this.shape_6.setTransform(379.1765,234.248);

	this.shape_7 = new cjs.Shape();
	this.shape_7.graphics.f("#74758E").s().p("ABGAFQh8hKh+AqQgkgbgtgdQByhCCHAQQCrAVBnCkIgvBVQhBhVhQgvg");
	this.shape_7.setTransform(411,348.3679);

	this.shape_8 = new cjs.Shape();
	this.shape_8.graphics.f("#2D3140").s().p("Ai/lJQBnhGBTgxIDFMCIjPB/g");
	this.shape_8.setTransform(588.425,255.975);

	this.shape_9 = new cjs.Shape();
	this.shape_9.graphics.f("#5C5D76").s().p("An/GzQJppqFSk1QAeAhAmAjIufOVg");
	this.shape_9.setTransform(240.625,200.675);

	this.shape_10 = new cjs.Shape();
	this.shape_10.graphics.f("#74758E").s().p("AhIBEQAAhEBIg+QAlggAkgRIAACdQgkAhglAUQgZANgRAAQgeAAAAgsg");
	this.shape_10.setTransform(318.975,222.2894);

	this.shape_11 = new cjs.Shape();
	this.shape_11.graphics.f("#2D3140").s().p("Ai+j1IBXgQIEmHeIhJAtg");
	this.shape_11.setTransform(700.35,197.925);

	this.shape_12 = new cjs.Shape();
	this.shape_12.graphics.f("#74758E").s().p("AoNBPQgngegfgcQAYgQAngWQBNgtBIgeQDohgBmBWQBlBYEViFQCKhCB1hTIABAAQgYDCAjDfQicg4j9A/QjmA5igBwQithiiVh4g");
	this.shape_12.setTransform(285.575,262.35);

	this.shape_13 = new cjs.Shape();
	this.shape_13.graphics.f("#5C5D76").s().p("AlxBOIAAk3QGJhPFaBMQgHBNg4DRIluDhg");
	this.shape_13.setTransform(718.175,196.6993);

	this.shape_14 = new cjs.Shape();
	this.shape_14.graphics.f("#3E4255").s().p("AqKi5QDuiVDyhnQEEhvD8gzIAAE5IE1DEIxnKyg");
	this.shape_14.setTransform(647.05,233.225);

	this.shape_15 = new cjs.Shape();
	this.shape_15.graphics.f("#5C5D76").s().p("AABCEIg6ghIgdjlQAqgfAsgeIBXF/QgXgXg/glg");
	this.shape_15.setTransform(569.2625,242.225);

	this.shape_16 = new cjs.Shape();
	this.shape_16.graphics.f("#3E4255").s().p("Ao8G0QBxjhCGi8QCkjnC6inQCHh4CXhtIAcDlIA7AiQA/AlAXAXIBZGJIskHtg");
	this.shape_16.setTransform(529.525,289.65);

	this.shape_17 = new cjs.Shape();
	this.shape_17.graphics.f("#2D3140").s().p("AjfBrQBFi2BZixIFUCpIolFQQAQg3Ajhbg");
	this.shape_17.setTransform(478.775,358.6);

	this.shape_18 = new cjs.Shape();
	this.shape_18.graphics.f("#2D3140").s().p("AjrCyQAMidAckSQE1CWB6AtQhMBoh8DQg");
	this.shape_18.setTransform(463.5625,275.45);

	this.shape_19 = new cjs.Shape();
	this.shape_19.graphics.f("#2D3140").s().p("AiqAFIFUjFQhhCuhwDTQgwhhhThbg");
	this.shape_19.setTransform(426.95,360.575);

	this.shape_20 = new cjs.Shape();
	this.shape_20.graphics.f("#65667D").s().p("AmChJIEcijIHpETIlVDGQili6kLh8g");
	this.shape_20.setTransform(405.275,337.35);

	this.shape_21 = new cjs.Shape();
	this.shape_21.graphics.f("#74758E").s().p("An2AcIGrj1QAogYAogTQCDg7BcARIADgkIEQBNQhxC9h3DVIlUDGQili6kMh9g");
	this.shape_21.setTransform(416.85,327.125);

	this.shape_22 = new cjs.Shape();
	this.shape_22.graphics.f("#74758E").s().p("AppDaIRZpkQA1AoBEAuQpHFTk5DYQieBsgpAoQhhhkgqhNg");
	this.shape_22.setTransform(260.75,212.725);

	this.shape_23 = new cjs.Shape();
	this.shape_23.graphics.f("#3E4255").s().p("AgkCtQihghishDQiqhDikhdQCghwDmg5QD+g/CbA4IJgFIImLDhQiuhSirgjg");
	this.shape_23.setTransform(335.625,300.8574);

	this.shape_24 = new cjs.Shape();
	this.shape_24.graphics.f("#5C5D76").s().p("AniDKQgnj1AgjTQAYiaA7h6QGYD1H3D0QggEzgMCgQhcgRiDA7QgpATgoAYIggAUg");
	this.shape_24.setTransform(393.5364,254.225);

	this.shape_25 = new cjs.Shape();
	this.shape_25.graphics.f("#65667D").s().p("AmtF4QiVh3hhhuQg/hIgeg4IRYpkQC0CED1CSQg7B6gYCaQggDTAnD2Qicg4j9A/QjnA5igBwQithiiVh4g");
	this.shape_25.setTransform(275.9,232.65);

	this.shape_26 = new cjs.Shape();
	this.shape_26.graphics.f("#5C5D76").s().p("ANoMiQmsgHq3lEQq3lDjFmjQg+iDgFh9QgBgnAEgiIAFgaICvivQAeA4A/BIQBhBuCVB3QDdCwEFB+QEFB/D2AxQEKA2DzCWQEbCwB2DtIgyBdQgTAPgtAPQhVAch7AAIgRAAg");
	this.shape_26.setTransform(301.8063,314.7563);

	this.shape_27 = new cjs.Shape();
	this.shape_27.graphics.f("#F1F1F3").s().p("AgXAvIgSgTIAph5IAJA7QAMBFAVA7QgogYgZgXg");
	this.shape_27.setTransform(17.15,407.25);

	this.shape_28 = new cjs.Shape();
	this.shape_28.graphics.f("#5C5D76").s().p("AhZhBICzgHIhKCRQg9hEgshGg");
	this.shape_28.setTransform(29.125,442.825);

	this.shape_29 = new cjs.Shape();
	this.shape_29.graphics.f("#5C5D76").s().p("AiQBYIAAjqIEhElQiWgTiLgog");
	this.shape_29.setTransform(195.225,532.175);

	this.shape_30 = new cjs.Shape();
	this.shape_30.graphics.f("#F1F1F3").s().p("AAiAvQhygjg5g9IETgUIAACLQgvgFg5gSg");
	this.shape_30.setTransform(266.85,532.65);

	this.shape_31 = new cjs.Shape();
	this.shape_31.graphics.f("#F1F1F3").s().p("AAiAlQhtgwg5g9IBSAGQBiAFBVgEIAACKQgsgMg3gYg");
	this.shape_31.setTransform(234.675,535.025);

	this.shape_32 = new cjs.Shape();
	this.shape_32.graphics.f("#F1F1F3").s().p("AHAGqQjhiaj1iSQqgmNoRijQBQgVCcg5IE1h2QHnBGJcFkQHKENFiE9QijBei3BXIiYBEQhdhOi6h/g");
	this.shape_32.setTransform(743.95,63.075);

	this.shape_33 = new cjs.Shape();
	this.shape_33.graphics.f("#2D3140").s().p("AI1ImQs7pXq1kfQjZhZixgwIiGgeQDfgkGGgNQFjgMAwgNQIRCjKgGNQD2CRDhCaQC6B/BdBOQieAqknAgQiiARhtAAQiMAAg3gcg");
	this.shape_33.setTransform(668.275,77.4168);

	this.shape_34 = new cjs.Shape();
	this.shape_34.graphics.f("#F1F1F3").s().p("AniQqQkSiCkWiUQr+mYktkWIhHhHIgzhSIA1guQCWiAFRi9QExipGEi2QF0itE9h6QFJiACTgXICGAeQCxAvDZBZQK1EfM8JYQyzFGrDIsQjdCsiPCwQgtA3ghAwIgXAlQhegijthwg");
	this.shape_34.setTransform(502.375,148.3);

	this.shape_35 = new cjs.Shape();
	this.shape_35.graphics.f("#C96962").s().p("AhYD5QAwjfBBifQAUgyAUgmQAKgTAGgJQAODGgJDgQhwBNgyAAIgMgBg");
	this.shape_35.setTransform(878.788,165.5915);

	this.shape_36 = new cjs.Shape();
	this.shape_36.graphics.f("#DCDFE5").s().p("A21L/MAtggaJQABBYAKA2MgtYAaHQgHhKgMhCg");
	this.shape_36.setTransform(571.375,440.75);

	this.shape_37 = new cjs.Shape();
	this.shape_37.graphics.f("#999FB0").s().p("EgiCAduQi6gZhbgsQsbl/m5kqQmvkkgui1QgiiGgCi7IATAKQAfC4BuCSQEQEFIoE4QHHEBFJB/QFXAxG9ggQCigMCAgTQBzgSANgLQANgHARggQAihAAUh+QAtkWBgi0QCwlKFsiHQEXhoCJDLQBZCHAaEQMAtZgaHQgIgtgDhJQgEiTAgiRQBonPGykJQBmg+BygPQB9gRBkAxQD7B6gOHOQguAjglAaIAJg2QAQhlgah4QgeiGhGhUQhUhih5AAQiOgBi2CJQknDehaGNQg0DlAXDcUgs7AZwgD3ACKQAzlJhuirQgyhNhMgcQhMgbhZAbQnDCHigInQgyCsgPDBQgHBhACA+QhmBPjJArQiyAmjiADIgyABQi1AAikgXg");
	this.shape_37.setTransform(420.4845,434.8022);

	this.shape_38 = new cjs.Shape();
	this.shape_38.graphics.f("#3E4255").s().p("AAOCkQonk3kPkFIA4iLQDtDJIsFGQItFEDUA9IgMC3QlJh/nHkBg");
	this.shape_38.setTransform(96.95,545.525);

	this.shape_39 = new cjs.Shape();
	this.shape_39.graphics.f("#F1F1F3").s().p("AkohIQBrgFESgVQCygOARAJQArAXAhAvQAjAxgWAUQgWATjYAYQj5AdkCAAg");
	this.shape_39.setTransform(260.5364,592.4489);

	this.shape_40 = new cjs.Shape();
	this.shape_40.graphics.f("#F1F1F3").s().p("AgljQIADAAQAMBtA+B9IAAC3Qhai4ANjpg");
	this.shape_40.setTransform(4.5995,471.675);

	this.shape_41 = new cjs.Shape();
	this.shape_41.graphics.f("#74758E").s().p("AERLqQlIh/nHkBQook4kQkEQhsiPggi0QgUhuAKiEIABAZQAEAgAJAlQAcB2BJB4QApBEDdCdQDICOEgCsQEYCqD2CAQEECIB1AhQC/A4HQgfQBzgIC8gPQCFgKAQAIQAqAYAhAuQAkAzgXATQgNAMhzARQiAAUiiAMQivAMifAAQj2AAjQgeg");
	this.shape_41.setTransform(149.4558,525.6782);

	this.shape_42 = new cjs.Shape();
	this.shape_42.graphics.f("#74758E").s().p("AiBAjQgUhjAPhBQAriSA3h7QghETBlDXQA0BsA5A1IhKCSQidiugni+g");
	this.shape_42.setTransform(23.9581,410.225);

	this.shape_43 = new cjs.Shape();
	this.shape_43.graphics.f("#74758E").s().p("ApSBbIAAjqICBARQCfASCbAIQHtAZD9hcQgKAXgkBgQgoBjgpA/Qh/AijFAOQhXAGhTAAQkrAAkNhNg");
	this.shape_43.setTransform(240.225,531.8837);

	this.shape_44 = new cjs.Shape();
	this.shape_44.graphics.f("#3E4255").s().p("ADPESQpkk/lYlPIBKiSQDoC8FqDhQHwE0FPBhIAADrQjthdkyigg");
	this.shape_44.setTransform(105.7,488.225);

	this.shape_45 = new cjs.Shape();
	this.shape_45.graphics.f("#F1F1F3").s().p("A0YOZQlqjhjoi9QBpo6KjqwQDTjYDyjJQB6hkBPg6IgFAaQgEAiABAnQAFB9A+CDQDFGkK2FDQK4FDGsAHQCGACBbgeQAtgPATgPQhWCgyAJBQo/EhouEBQlPhinxk0g");
	this.shape_45.setTransform(228.025,384.775);

	this.shape_46 = new cjs.Shape();
	this.shape_46.graphics.f("#B3B7C4").s().p("EgmaAlrQi5gZhcgsQsbl/m4kqQmvkkgui1Qgwi6APkWQAQkbBLkSIgFA+QgGBIAABEQAADWAyBjQAeA9C9CWQDCCYEDCmQKQGiGrBmQEaAwEPgRQEBgRBdg/QBKg4A/iNQA3iPAOgeQQiqeMsnzQHbkhcSyVQOJpKMqoQQANCtgGDRQgDBogGBGIAjAbQAmAfANAQQASAXgCB0QgCCGggCxQgXB8jbDLQiVCJjaCbIAJg2QARhlgbh4QgeiGhGhUQhThih6AAQiOgBi1CJQkoDehaGNQg0DlAYDcUgs6AZwgD5ACKQA1lJhvirQgyhNhMgcQhMgbhZAbQnDCHigInQgyCsgPDBQgIBhADA+QhnBPjJArQiyAmjhADIgyABQi1AAilgXg");
	this.shape_46.setTransform(448.4208,383.9211);

	this.shape_47 = new cjs.Shape();
	this.shape_47.graphics.f("#3E4255").s().p("AgSArQgNgFgDgRQgEgQAIgRQAIgTAOgIQANgJANAGQANAFAEARQAEARgIAQQgGAOgKAIQgKAJgJABIgEAAQgGAAgEgCg");
	this.shape_47.setTransform(782.214,322.2832);

	this.shape_48 = new cjs.Shape();
	this.shape_48.graphics.f("#B3B7C4").s().p("AgmBaQgbgMgIgjQgHgiAQgkQAQgkAegTQAegTAbAMQAaALAIAjQAIAjgQAkQgMAcgVASQgVARgVADIgHAAQgKAAgLgEg");
	this.shape_48.setTransform(782.2108,322.2563);

	this.shape_49 = new cjs.Shape();
	this.shape_49.graphics.f("#3E4255").s().p("AiJGLIgBAAICMmBIkrAlIAEghIEtgkIgqlvIAfgPIAnFhIDolJIAWAWIjzFaID7C1IgQAbIj4i0IiPGFQgOgDgOgHg");
	this.shape_49.setTransform(778.55,323.3);

	this.shape_50 = new cjs.Shape();
	this.shape_50.graphics.f("#B3B7C4").s().p("AiaGPQgggOgegaICRkjIjyBTQgKhhAbhjIDfgQIgZkjQA8guBAgTIAbDqICPjiQBNAhAsBWIjUEHIDNCOIgCADQgkBTg1BAIiuirIhVFDIgXABQgwAAgrgTg");
	this.shape_50.setTransform(780.2399,322.8531);

	this.shape_51 = new cjs.Shape();
	this.shape_51.graphics.f("#B3B7C4").s().p("Ai0GkQg9gagqg5Qgqg4gRhPQgQhNAKhWQALhVAkhTQAjhTA4hDQA3hCBEgqQBFgpBEgJQBGgIA9AbQB9A1AkCiQAjChhKCtQg4CBhiBUQhgBShnAMQgRACgPAAQg0AAgugUgAA2mWQg+AIg/AmQhAAmg0A/Qg0A/giBPQgiBPgKBQQgKBRAQBJQAPBHAlAzQAlAyA2AXQBxAxCBhQQCChQBGiiQBGiggfiWQgfiVhxgxQgpgRguAAQgNAAgPABg");
	this.shape_51.setTransform(782.2437,322.2764);

	this.shape_52 = new cjs.Shape();
	this.shape_52.graphics.f("#2D3140").s().p("AiuGVQh3gzghibQgiibBJinQBIioCIhSQCGhTB4A0QB3AzAiCbQAhCchJCmQhICoiIBTQhSAyhNAAQgxAAgugUg");
	this.shape_52.setTransform(782.2368,322.2906);

	this.shape_53 = new cjs.Shape();
	this.shape_53.graphics.f("#5C5D76").s().p("Aj3I+QikhGgrjaQgrjbBmjsQBnjuC8h3QC8h2CkBHQCkBHArDaQArDahmDtQhnDui8B2Qh1BKhsAAQhBAAg+gbg");
	this.shape_53.setTransform(780.9626,321.7402);

	this.shape_54 = new cjs.Shape();
	this.shape_54.graphics.f("#3E4255").s().p("AgSArQgNgFgDgRQgEgQAIgRQAIgTAOgIQAOgJAMAGQANAFAEARQAEARgIARQgGANgKAJQgKAIgJABIgEAAQgGAAgEgCg");
	this.shape_54.setTransform(370.214,561.1332);

	this.shape_55 = new cjs.Shape();
	this.shape_55.graphics.f("#B3B7C4").s().p("AgmBaQgbgLgIgjQgHgjAQgkQAQglAegSQAegSAbALQAaAMAIAjQAIAigQAkQgMAcgVASQgVASgVACIgHAAQgLAAgKgEg");
	this.shape_55.setTransform(370.2108,561.1457);

	this.shape_56 = new cjs.Shape();
	this.shape_56.graphics.f("#3E4255").s().p("AiJGLIgBgBICNmBIksAlIAEgfIEtgkIgqlwIAfgPIAnFhIDnlJQANAJALAMIjzFcID6C0IgQAbIj5i0IiOGFIgcgKg");
	this.shape_56.setTransform(366.55,562.2);

	this.shape_57 = new cjs.Shape();
	this.shape_57.graphics.f("#B3B7C4").s().p("AiaGQQgggOgegbICRkjIjyBTQgKhhAbhjIDfgQIgZkjQA9gvA/gSIAbDqICPjiQBOAiArBVIjUEHIDNCOIgCAEQgjBRg2BBIiuirIhVFDIgXABQgxAAgqgSg");
	this.shape_57.setTransform(368.2399,561.7455);

	this.shape_58 = new cjs.Shape();
	this.shape_58.graphics.f("#B3B7C4").s().p("Ai0GkQg9gagqg5Qgqg4gRhPQgQhNAKhWQALhVAkhTQAjhTA4hDQA3hCBEgpQBFgqBEgJQBGgIA9AbQB9A2AkChQAjChhKCtQg4CBhiBUQhgBShnAMQgRACgRAAQgyAAgugUgAA2mWQg9AIhAAmQhAAng0A/Qg0A+giBPQgiBPgKBQQgKBRAQBJQAPBHAlAzQAlAyA2AXQBxAxCBhQQCChQBGihQBGihgfiVQgfiWhxgxQgqgSgtAAQgOAAgOACg");
	this.shape_58.setTransform(370.2437,561.137);

	this.shape_59 = new cjs.Shape();
	this.shape_59.graphics.f("#2D3140").s().p("AiuGVQh3gzghibQgiicBJimQBIioCIhTQCHhSB3A0QB3AzAiCbQAhCbhJCnQhICoiIBSQhSAzhOAAQgwAAgugUg");
	this.shape_59.setTransform(370.2367,561.1713);

	this.shape_60 = new cjs.Shape();
	this.shape_60.graphics.f("#5C5D76").s().p("Aj3I+QikhHgrjaQgrjaBmjtQBnjuC8h2QC8h2CkBHQCkBGArDaQArDbhmDtQhnDti8B3Qh1BKhtAAQhAAAg+gbg");
	this.shape_60.setTransform(368.9626,560.6133);

	this.shape_61 = new cjs.Shape();
	this.shape_61.graphics.f("#2D3140").s().p("AlWMHQipgWiHhBQgXheAGiBQAIiHAmiMQBalKDSjIICpjzIELhkQEOhkAPAAQAQAAB8ByQA+A5A7A5Ii9IuIhdBRIqTllQiCB0hKCsQhnDtArDbQAsDaCkBHQA2AXA7ABQg0AAhHgJg");
	this.shape_61.setTransform(377.5034,542.0875);

	this.shape_62 = new cjs.Shape();
	this.shape_62.graphics.f("#DCDFE5").s().p("EgmZAwqQi6gZhbgsQsbl/m5kqQmvkkgui1QhAj6AvmAQAxmSCSk4QB7kHKUnhQCmh5E4jVQD1inAugpQCniiDbjPQG3meEGjgQCWiAFRi9QExiqGEi1QF0itE8h6QFKiACTgYQDfgkGGgNQFjgMAwgNQBRgWCcg5IE1h1QJlBYMBIJQETC7DZC/QDBCpASA0QAjDJgEEoQgBCUgJBsIAjAbQAmAfANAQQASAXgCB0QgDCGggCxQgWB8jcDLQiVCJjZCbIAJg2QAQhlgah4QgeiGhGhUQhUhih5AAQiOgBi2CJQknDehaGMQg0DlAXDcUgs6AZxgD4ACKQA0lJhvirQgyhNhMgcQhMgbhZAbQnDCHigInQgyCsgPDBQgHBhACA+QhmBPjJArQiyAmjiADIgyAAQi0AAilgWgEgj8gPWQjRDPifChIgEAaQgFAhACAoQAEB9A+CDQDGGiK3FEQK3FDGsAHQCGACBbgeQAugOATgQQB1jeCRkEQEhoICMjBQhlglkCh7QkriPkmifQszm7j5kVQj6DjmiGdgAdPzwQorDfngGrQliE7kGIUQiDELg8DLMAuggcdQA4jSAHhNQitgni3AAQmMAAm9C0g");
	this.shape_62.setTransform(448.3816,313.6461);

	this.shape_63 = new cjs.Shape();
	this.shape_63.graphics.f("#DCDFE5").s().p("EgmZAwqQi6gZhbgsQsbl/m5kqQmvkkgui1QhAj6AvmAQAxmSCSk4QB7kHKUnhQCmh5E4jVQD1inAugpQCniiDbjPQG3meEGjgQCWiAFRi9QExiqGEi1QF0itE8h6QFKiACTgYQDfgkGGgNQFjgMAwgNQBRgWCcg5IE1h1QJlBYMBIJQETC7DZC/QDBCpASA0QAjDJgEEoQgBCUgJBsIAjAbQAmAfANAQQASAXgCB0QgDCGggCxQgWB8jcDLQiVCJjZCbIAJg2QAQhlgah4QgeiGhGhUQhUhih5AAQiOgBi2CJQknDehaGMQg0DlAXDcUgs6AZxgD4ACKQA0lJhvirQgyhNhMgcQhMgbhZAbQnDCHigInQgyCsgPDBQgHBhACA+QhmBPjJArQiyAmjiADIgyAAQi0AAilgWgEgj8gPWQjRDPifChIgEAaQgFAhACAoQAEB9A+CDQDGGiK3FEQK3FDGsAHQCGACBbgeQAugOATgQQB1jeCRkEQEhoICMjBQhlglkCh7QkriPkmifQszm7j5kVQj6DjmiGdgAdPzwQorDfngGrQliE7kGIUQiDELg8DLMAuggcdQA4jSAHhNQitgni3AAQmMAAm9C0g");
	this.shape_63.setTransform(448.3816,313.6461);

	this.shape_64 = new cjs.Shape();
	this.shape_64.graphics.f("#2D3140").s().p("AkzMTQh4gViThDQiThDBlogQAgipA1jFIAvikIMElhIENCvIBtEqIjCGYIqsLFIgOABQgdAAgwgJg");
	this.shape_64.setTransform(785.7021,301.8321);

	this.shape_65 = new cjs.Shape();
	this.shape_65.graphics.f("#74758E").s().p("AhYgOQgth1BBgbQBWCaBaBTIhNBQQhOhCgphrg");
	this.shape_65.setTransform(192.7416,208.175);

	this.shape_66 = new cjs.Shape();
	this.shape_66.graphics.f("#B3B7C4").s().p("AhfBMQgkg2gRgzQgoiABkgFQBygFBPBGQAnAkAQAkIi1C8Qgnghgjg2g");
	this.shape_66.setTransform(197.9663,207.7801);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_66},{t:this.shape_65},{t:this.shape_64},{t:this.shape_63},{t:this.shape_62},{t:this.shape_61},{t:this.shape_60},{t:this.shape_59},{t:this.shape_58},{t:this.shape_57},{t:this.shape_56},{t:this.shape_55},{t:this.shape_54},{t:this.shape_53},{t:this.shape_52},{t:this.shape_51},{t:this.shape_50},{t:this.shape_49},{t:this.shape_48},{t:this.shape_47},{t:this.shape_46},{t:this.shape_45},{t:this.shape_44},{t:this.shape_43},{t:this.shape_42},{t:this.shape_41},{t:this.shape_40},{t:this.shape_39},{t:this.shape_38},{t:this.shape_37},{t:this.shape_36},{t:this.shape_35},{t:this.shape_34},{t:this.shape_33},{t:this.shape_32},{t:this.shape_31},{t:this.shape_30},{t:this.shape_29},{t:this.shape_28},{t:this.shape_27},{t:this.shape_26},{t:this.shape_25},{t:this.shape_24},{t:this.shape_23},{t:this.shape_22},{t:this.shape_21},{t:this.shape_20},{t:this.shape_19},{t:this.shape_18},{t:this.shape_17},{t:this.shape_16},{t:this.shape_15},{t:this.shape_14},{t:this.shape_13},{t:this.shape_12},{t:this.shape_11},{t:this.shape_10},{t:this.shape_9},{t:this.shape_8},{t:this.shape_7},{t:this.shape_6},{t:this.shape_5},{t:this.shape_4},{t:this.shape_3},{t:this.shape_2},{t:this.shape_1},{t:this.shape}]}).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-0.1,0,897,627.3);


(lib.bg = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#FFDD00").s().p("EgguAr6MAAAhXzMBBdAAAMAAABXzg");
	this.shape.setTransform(0,0.025);

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.bg, new cjs.Rectangle(-209.5,-280.9,419,561.9), null);


(lib.scooter_button_over = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// timeline functions:
	this.frame_4 = function() {
		var _this = this;
		/*
		Stop a Movie Clip/Video
		Stops the specified movie clip or video.
		*/
		_this.stop();
	}

	// actions tween:
	this.timeline.addTween(cjs.Tween.get(this).wait(4).call(this.frame_4).wait(1));

	// Layer_1
	this.instance = new lib.scooterai("synched",0);
	this.instance.setTransform(0.05,0,1,1,0,0,0,349.2,395.2);

	this.timeline.addTween(cjs.Tween.get(this.instance).to({regX:349.1,scaleX:1.2147,scaleY:1.2147,x:-0.05},4).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-424.2,-480,848.5,960);


(lib.scooter_button = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer_1
	this.instance = new lib.scooterai("synched",0);
	this.instance.setTransform(0.1,0.05,1,1,0,0,0,349.2,395.2);

	this.instance_1 = new lib.scooter_button_over();
	this.instance_1.setTransform(0.05,0.05);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.instance}]}).to({state:[{t:this.instance_1}]},1).to({state:[{t:this.instance}]},1).to({state:[{t:this.instance}]},1).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-349.2,-395.1,698.5999999999999,790.3);


(lib.luxury_car_button_over = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// timeline functions:
	this.frame_4 = function() {
		var _this = this;
		/*
		Stop a Movie Clip/Video
		Stops the specified movie clip or video.
		*/
		_this.stop();
	}

	// actions tween:
	this.timeline.addTween(cjs.Tween.get(this).wait(4).call(this.frame_4).wait(1));

	// Layer_1
	this.instance = new lib.luxury_carai("synched",0);
	this.instance.setTransform(0,0,1,1,0,0,0,465.4,319.8);

	this.timeline.addTween(cjs.Tween.get(this.instance).to({scaleX:1.1997,scaleY:1.1997},4).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-558.3,-383.6,1116.6999999999998,767.3);


(lib.luxury_car_button = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer_1
	this.instance = new lib.luxury_carai("synched",0);
	this.instance.setTransform(0,-0.95,1,1,0,0,0,465.4,319.8);

	this.instance_1 = new lib.luxury_car_button_over();
	this.instance_1.setTransform(0,-0.95);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.instance}]}).to({state:[{t:this.instance_1}]},1).to({state:[{t:this.instance}]},1).to({state:[{t:this.instance}]},1).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-465.4,-320.7,930.8,639.5999999999999);


(lib.car_button_over = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// timeline functions:
	this.frame_4 = function() {
		var _this = this;
		/*
		Stop a Movie Clip/Video
		Stops the specified movie clip or video.
		*/
		_this.stop();
	}

	// actions tween:
	this.timeline.addTween(cjs.Tween.get(this).wait(4).call(this.frame_4).wait(1));

	// Layer_1
	this.instance = new lib.carai("synched",0);
	this.instance.setTransform(0.05,0.05,1,1,0,0,0,448.4,313.7);

	this.timeline.addTween(cjs.Tween.get(this.instance).to({regX:448.3,regY:313.6,scaleX:1.1977,scaleY:1.1977,x:-0.05,y:-0.05,loop:false},4).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-537.1,-375.6,1074.4,751.3);


(lib.car_button = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer_1
	this.instance = new lib.carai("synched",0);
	this.instance.setTransform(0.05,0.1,1,1,0,0,0,448.4,313.7);

	this.instance_1 = new lib.car_button_over();
	this.instance_1.setTransform(0,0.05);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.instance}]}).to({state:[{t:this.instance_1}]},1).to({state:[{t:this.instance}]},1).to({state:[{t:this.instance}]},1).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-448.4,-313.6,896.9,627.3);


// stage content:
(lib.maxim2 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	this.actionFrames = [0];
	this.isSingleFrame = false;
	// timeline functions:
	this.frame_0 = function() {
		if(this.isSingleFrame) {
			return;
		}
		if(this.totalFrames == 1) {
			this.isSingleFrame = true;
		}
		this.clearAllSoundStreams();
		 
		var _this = this;
		/*
		Clicking on the specified symbol instance executes a function.
		*/
		_this.bg_instance.on('click', function(){
		/*
		Loads the URL in a new browser window.
		*/
		window.open('https://taximaxim.com', '_blank');
		});
		
		
		var _this = this;
		/*
		Clicking on the specified symbol instance executes a function.
		*/
		_this.scooter_button_instance.on('click', function(){
		/*
		Loads the URL in a new browser window.
		*/
		window.open('https://taximaxim.com', '_blank');
		});
		
		
		var _this = this;
		/*
		Clicking on the specified symbol instance executes a function.
		*/
		_this.car_button_instance.on('click', function(){
		/*
		Loads the URL in a new browser window.
		*/
		window.open('https://taximaxim.com', '_blank');
		});
		
		
		var _this = this;
		/*
		Clicking on the specified symbol instance executes a function.
		*/
		_this.luxury_car_button_instance.on('click', function(){
		/*
		Loads the URL in a new browser window.
		*/
		window.open('https://taximaxim.com', '_blank');
		});
	}

	// actions tween:
	this.timeline.addTween(cjs.Tween.get(this).call(this.frame_0).wait(1));

	// Layer_3
	this.instance = new lib.logo_nrsvg("synched",0);
	this.instance.setTransform(161.25,28.1,0.6889,0.6889,0,0,0,89.4,22.5);

	this.shape = new cjs.Shape();
	this.shape.graphics.f("#000000").s().p("AggBrQgGgGAAgLQAAgJAGgHQAHgIANABQAMAAAGAGQAHAHAAAKQAAAKgHAHQgGAHgMABQgOAAgGgIgAghAyIAAgVIABgSIAEgLIAHgLIAKgKIAJgIIAIgIIAFgIQADgFAAgGQAAgJgGgGQgGgEgKAAQgNAAgLADIgTAHIgMghQAQgIARgDQASgEAPgBQALAAALADQALADAJAGQAIAGAFAJQAGAKAAAOQAAAMgCAHQgDAIgFAIQgFAGgGAGIgOAMQgIAEgEAEQgDADgDAFQgCAEAAAFIAAANIAAAQg");
	this.shape.setTransform(271.55,75.3);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#000000").s().p("AgkBPQgRgGgIgFIAPgeQAKAGALADQAKAEAMgBQASAAAAgPQAAgFgCgDQgCgDgDgCQgEgDgEgBIgLgEIgPgFQgIgEgGgFQgGgFgEgIQgEgIAAgLQAAgNAFgLQAFgJAJgGQAIgHALgCQALgEALAAQARABAOAEQAPAFAKAGIgPAcQgIgEgJgDQgJgDgKAAQgRgBAAANQAAAJAGAEQAGADAOAFIAQAGQAIAEAFAGQAGAEADAIQADAIAAALQAAAYgQAPQgPAPgeAAQgUAAgQgFg");
	this.shape_1.setTransform(256.525,78.4);

	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f("#000000").s().p("AgnB+QgJgDgGgFQgGgGgEgJQgDgIAAgNQAAgKACgHQACgHAEgFQADgFAFgDIAJgFIAXgGIAigJIAAgMQAAgJgCgEQgEgGgKAAQgHAAgMACIgcAIIgJgeIAQgGIASgEIARgEIAPgBQAQABAJADQAKAEAGAHQAFAGADALQADAJgBANIAAA8IABALIABAPIADANIADAMIgpAAIgCgJIgCgIIgCgBQgJAKgLAFQgJAHgPgBQgJABgHgCgAgDA6IgNAFQgJAFAAALQAAAHAEAEQAEAFAIgBQAHAAAHgDQAGgEAEgFIAAgeIgSAGgAgWhGIAjg4IAIACIAKADIAKADIAJACIAAAGIg1A3g");
	this.shape_2.setTransform(241.55,74.1);

	this.shape_3 = new cjs.Shape();
	this.shape_3.graphics.f("#000000").s().p("AgtBTIAAhmIgCgYQgBgOgDgTIATgBIAWgDIABAJIADAJIABABQAJgLAIgFQAJgEAKgBQAMABAJADIgIApIgJgCIgKgBQgIgBgGADQgFADgGAFIAABxg");
	this.shape_3.setTransform(228.225,78.2);

	this.shape_4 = new cjs.Shape();
	this.shape_4.graphics.f("#000000").s().p("AgyA/QgVgXAAgnQAAgSAFgPQAFgQAKgMQAKgLAPgGQAOgHARAAQASAAAMAHQANAFAIALQAIALAEAPQAEAPAAARIgMAIIhTAFQAAAHADAHQACAHAEAGQAEAFAHADQAGADAKAAQALAAALgEQAMgEALgHIAMAfQgOAJgQAGQgQAFgRAAQgkAAgVgVgAgOgqQgIAIgBARIA0gDQgBgQgFgHQgGgJgMAAQgLAAgIAKg");
	this.shape_4.setTransform(213.625,78.4);

	this.shape_5 = new cjs.Shape();
	this.shape_5.graphics.f("#000000").s().p("AggByQgRgEgOgGIAKgiQAOAGANADQANADAMAAQAOAAAHgGQAGgGAAgPIAAgFIABgMIABgKIgCAAQgGAIgLAFQgJAGgPAAQgcAAgQgUQgQgUAAgkQgBgqATgXQASgXAfAAQAMAAAKAFQAKAFAHAHIACAAIACgHIABgIIAKABIAKABIALABIAKABIgFAiIgBAXIAABlQAAAkgQARQgPASglAAQgSAAgRgEgAgUhEQgGANgBAWQABAUAFAMQAGALAOAAQAIAAAGgEQAGgDAHgFIAAhEIgMgIQgIgEgGAAQgNAAgHAOg");
	this.shape_5.setTransform(196.25,81.725);

	this.shape_6 = new cjs.Shape();
	this.shape_6.graphics.f("#000000").s().p("AgiBOQgOgGgKgMQgKgKgFgRQgFgPAAgSQAAgUAGgPQAGgQALgLQAKgKAPgGQAPgFARgBQARAAAOAGQAPAFAKAKQAKAKAGAPQAFAPAAASQAAAsgVAWQgVAXglAAQgTABgPgHgAgYgjQgHAMAAAUIABASQACAJAEAHQAEAIAGAEQAGAFAJAAQAIAAAGgDQAGgEAEgGQAEgGABgIQACgJAAgJQAAgKgCgJQgBgJgEgHQgEgIgGgDQgGgFgJAAQgQAAgIANg");
	this.shape_6.setTransform(178.575,78.4);

	this.shape_7 = new cjs.Shape();
	this.shape_7.graphics.f("#000000").s().p("AgwA+QgUgWAAgmQAAgUAGgQQAGgRALgKQAKgLAPgGQAPgFARgBQAQAAAPAGQAOAEAMAJIgSAgIgRgJQgJgFgLAAQgHAAgGADQgGADgFAFQgFAFgCAJQgEAJAAAMQAAAJADAIQACAJAEAHQAEAHAHAEQAGAEALAAQALAAAJgEIATgKIAOAgQgKAHgPAGQgPAHgUgBQglABgUgXg");
	this.shape_7.setTransform(162.525,78.4);

	this.shape_8 = new cjs.Shape();
	this.shape_8.graphics.f("#000000").s().p("AgkBPQgRgGgIgFIAPgeQAKAGALADQAKAEAMgBQASAAAAgPQAAgFgCgDQgCgDgDgCQgEgDgEgBIgLgEIgPgFQgIgEgGgFQgGgFgEgIQgEgIAAgLQAAgNAFgLQAFgJAJgGQAIgHALgCQALgEALAAQARABAOAEQAPAFAKAGIgPAcQgIgEgJgDQgJgDgKAAQgRgBAAANQAAAJAGAEQAGADAOAFIAQAGQAIAEAFAGQAGAEADAIQADAIAAALQAAAYgQAPQgPAPgeAAQgUAAgQgFg");
	this.shape_8.setTransform(147.075,78.4);

	this.shape_9 = new cjs.Shape();
	this.shape_9.graphics.f("#000000").s().p("AgyA/QgVgXAAgnQAAgSAFgPQAFgQAKgMQAKgLAPgGQAOgHARAAQASAAAMAHQANAFAIALQAIALAEAPQAEAPAAARIgMAIIhTAFQAAAHADAHQACAHAEAGQAEAFAHADQAGADAKAAQALAAALgEQAMgEALgHIAMAfQgOAJgQAGQgQAFgRAAQgkAAgVgVgAgOgqQgIAIgBARIA0gDQgBgQgFgHQgGgJgMAAQgLAAgIAKg");
	this.shape_9.setTransform(132.075,78.4);

	this.shape_10 = new cjs.Shape();
	this.shape_10.graphics.f("#000000").s().p("AgUB3IAAiuIgBgaIgDgdIAXgDIAagFIAADtg");
	this.shape_10.setTransform(113.725,74.6);

	this.shape_11 = new cjs.Shape();
	this.shape_11.graphics.f("#000000").s().p("AgnB+QgJgDgGgFQgGgGgEgJQgDgIAAgNQAAgKACgHQACgHAEgFQADgFAFgDIAJgFIAXgGIAigJIAAgMQAAgJgCgEQgEgGgKAAQgHAAgMACIgcAIIgJgeIAQgGIASgEIARgEIAPgBQAQABAJADQAKAEAGAHQAFAGADALQADAJgBANIAAA8IABALIABAPIADANIADAMIgpAAIgCgJIgCgIIgCgBQgJAKgLAFQgJAHgPgBQgJABgHgCgAgCA6IgOAFQgJAFAAALQAAAHAEAEQAEAFAIgBQAHAAAHgDQAGgEAEgFIAAgeIgRAGgAgWhGIAjg4IAIACIAKADIAKADIAJACIAAAGIg0A3g");
	this.shape_11.setTransform(101.6,74.1);

	this.shape_12 = new cjs.Shape();
	this.shape_12.graphics.f("#000000").s().p("AgtBQQgKgDgGgIQgFgHgDgJQgCgKAAgNIAAhtIAXgBQAMAAAKgDIAABoQAAANAEAGQAEAGAKAAQAIAAAHgFQAHgEAGgFIAAhvIAXgBIAXgDIAABnQAAALACAQIAEAhIgqAAIgDgRIgCAAIgJAHIgKAHQgGADgGACQgIACgIgBQgOAAgJgDg");
	this.shape_12.setTransform(85.175,78.5);

	this.shape_13 = new cjs.Shape();
	this.shape_13.graphics.f("#000000").s().p("AggBrQgVgKgNgOQgOgQgGgUQgGgWAAgYQAAgYAIgVQAHgVAOgQQAOgPAUgJQAVgJAaAAQAYAAATAHQATAHAKAHIgSAkQgNgHgNgEQgMgDgQAAQgNAAgKADQgLAFgIAJQgIAJgFANQgEANAAATQAAAOADANQADANAIALQAHAKAMAGQALAGARABQARAAAMgGQANgFANgHIASAjQgPALgTAHQgTAGgYAAQgbAAgVgIg");
	this.shape_13.setTransform(67.125,75.35);

	this.shape_14 = new cjs.Shape();
	this.shape_14.graphics.f("#000000").s().p("AgYBwQgLgDgJgFQgIgGgFgKQgGgKAAgOQAAgLACgIQADgIAEgHIAMgNIAOgLQAIgFADgEQAFgEABgEQACgEAAgFIABgMIAAgRIAqAAIAAAVQAAAKgBAHQgCAIgCAFIgHAKIgKAKIgKAIIgHAIIgGAIQgCAFAAAGQAAAKAGAFQAGAEAKAAQANAAALgDIASgGIANAgQgQAIgRAEQgSADgPAAQgLAAgLgCgAgFhIQgHgHAAgKQAAgKAGgHQAGgHANAAQAOAAAGAHQAGAHAAAJQAAAKgGAIQgHAHgNAAQgNAAgFgHg");
	this.shape_14.setTransform(50.2,81.425);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_14},{t:this.shape_13},{t:this.shape_12},{t:this.shape_11},{t:this.shape_10},{t:this.shape_9},{t:this.shape_8},{t:this.shape_7},{t:this.shape_6},{t:this.shape_5},{t:this.shape_4},{t:this.shape_3},{t:this.shape_2},{t:this.shape_1},{t:this.shape},{t:this.instance}]}).wait(1));

	// Layer_1
	this.scooter_button_instance = new lib.scooter_button();
	this.scooter_button_instance.name = "scooter_button_instance";
	this.scooter_button_instance.setTransform(162.05,150.15,0.1116,0.1116);
	new cjs.ButtonHelper(this.scooter_button_instance, 0, 1, 2, false, new lib.scooter_button(), 3);

	this.luxury_car_button_instance = new lib.luxury_car_button();
	this.luxury_car_button_instance.name = "luxury_car_button_instance";
	this.luxury_car_button_instance.setTransform(156,389.15,0.1878,0.1878);
	new cjs.ButtonHelper(this.luxury_car_button_instance, 0, 1, 2, false, new lib.luxury_car_button(), 3);

	this.car_button_instance = new lib.car_button();
	this.car_button_instance.name = "car_button_instance";
	this.car_button_instance.setTransform(157.35,261,0.1765,0.1771);
	new cjs.ButtonHelper(this.car_button_instance, 0, 1, 2, false, new lib.car_button(), 3);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.car_button_instance},{t:this.luxury_car_button_instance},{t:this.scooter_button_instance}]}).wait(1));

	// Layer_2
	this.bg_instance = new lib.bg();
	this.bg_instance.name = "bg_instance";
	this.bg_instance.setTransform(157.5,241);

	this.timeline.addTween(cjs.Tween.get(this.bg_instance).wait(1));

	this._renderFirstFrame();

}).prototype = p = new lib.AnMovieClip();
p.nominalBounds = new cjs.Rectangle(108,200.1,259,321.9);
// library properties:
lib.properties = {
	id: '54363D936E852347B8E9FB9FCC8BF551',
	width: 320,
	height: 480,
	fps: 30,
	color: "#FFFFFF",
	opacity: 1.00,
	manifest: [],
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
an.compositions['54363D936E852347B8E9FB9FCC8BF551'] = {
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