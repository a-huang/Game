var Log = require('./Log.js')

var famous = require('famous');
var DOMElement = require('famous/dom-renderables/DOMElement');
var FamousEngine = require('famous/core/FamousEngine');

 FamousEngine.init();

var game = FamousEngine.createScene('body').addChild();
var log = new Log(game.addChild());