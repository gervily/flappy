Meteor.startup(function() {
  // Add polyfills.
  //require("famous-polyfills");
  famous.polyfills;
  
  // Add the default CSS file.
  //require("famous/core/famous");
  famous.core.famous;

  // Add everything to window for simplicity's sake.
  //window.Engine = require('famous/core/Engine');
  window.Engine = famous.core.Engine;
  
  window.VectorField = famous.physics.forces.VectorField;
  window.Force = famous.physics.forces.Force;
  window.Wall = famous.physics.constraints.Wall;
  
  window.Timer = famous.utilities.Timer;

//var PhysicsEngine   = require('famous/physics/PhysicsEngine');
  window.PhysicsEngine = famous.physics.PhysicsEngine;
//var Body            = require('famous/physics/bodies/Body');
  window.Body = famous.physics.bodies.Body;
//var Circle          = require('famous/physics/bodies/Circle');
  window.Circle = famous.physics.bodies.Circle;
//var Wall            = require('famous/physics/constraints/Wall');
  window.Wall = famous.physics.constraints.Wall;
//var EventHandler    = require('famous/core/EventHandler');
  window.EventHandler = famous.core.EventHandler;
//var RepulsionForce = famous.physics.forces.Repulsion
  window.RepulsionForce = famous.physics.forces.Repulsion;
//var Particle = famous.physics.bodies.Particle
  window.Particle = famous.physics.bodies.Particle;
  
  //window.View = require('famous/core/View');
  window.View = famous.core.View;
  //window.Deck = require('famous/views/Deck');
  window.Deck = famous.views.Deck;
  //window.Group = require('famous/core/Group');
  window.Group = famous.core.Group;
  //window.Surface = require('famous/core/Surface');
  window.Surface = famous.core.Surface;
  window.ImageSurface = famous.surfaces.ImageSurface;
  //window.meteorSurface = require('library/meteor/core/Surface');
  //window.meteorSurface = library.meteor.core.Surface;
  //window.Modifier = require('famous/core/Modifier');
  window.Modifier = famous.core.Modifier;
  //window.Transform = require('famous/core/Transform');
  window.Transform = famous.core.Transform;
  //window.Utility = require('famous/utilities/Utility');
  window.Utility = famous.utilities.Utility;
  //window.Draggable = require('famous/modifiers/Draggable');
  window.Draggable = famous.modifiers.Draggable;
  //window.StateModifier = require('famous/modifiers/StateModifier');
  window.StateModifier = famous.modifiers.StateModifier;
  //window.ScrollContainer = require('famous/views/ScrollContainer');
  window.ScrollContainer = famous.views.ScrollContainer;
  //window.RenderController = require('famous/views/RenderController');
  window.RenderController = famous.views.RenderController;

  //window.Scrollview = require('famous/views/Scrollview');
  window.Scrollview = famous.views.Scrollview;
  //window.HeaderFooterLayout = require('famous/views/HeaderFooterLayout');
  window.HeaderFotterLayout = famous.views.HeaderFooterLayout;

  //window.Easing = require('famous/transitions/Easing');
  window.Easing = famous.transitions.Easing;
  //window.Transitionable = require('famous/transitions/Transitionable');
  window.Transitionable = famous.transitions.Transitionable;
  //window.SnapTransition = require('famous/transitions/SnapTransition');
  window.SnapTransition = famous.transitions.SnapTransition;
  //window.SpringTransition = require('famous/transitions/SpringTransition');
  window.SpringTransition = famous.transitions.SpringTransition;

  // Initialize two basic transitions.
  Transitionable.registerMethod('snap', SnapTransition);
  Transitionable.registerMethod('spring', SpringTransition);
  
});
