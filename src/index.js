var Log = require('./Log.js')

var famous = require('famous');
var DOMElement = require('famous/dom-renderables/DOMElement');
var FamousEngine = require('famous/core/FamousEngine');

 FamousEngine.init();

var game = FamousEngine.createScene('body').addChild();
var log = new Log(game.addChild()); //log test 
	log.node.setSizeMode(1,1,1)
        .setAbsoluteSize(50, 200)
        .setPosition(window.innerWidth / 2, window.innerHeight / 2, 0)
        .setMountPoint(0.5, 1); 
