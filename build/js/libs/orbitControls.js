/**
 * @author qiao / https://github.com/qiao
 * @author mrdoob / http://mrdoob.com
 * @author alteredq / http://alteredqualia.com/
 * @author WestLangley / http://github.com/WestLangley
 * @author erich666 / http://erichaines.com
 * @author mrflix / http://felixniklas.de
 *
 * released under MIT License (MIT)
 */
/*global THREE, console */

// This set of controls performs orbiting, dollying (zooming), and panning. It maintains
// the "up" direction as +Y, unlike the TrackballControls. Touch on tablet and phones is
// supported.
//
//    Orbit - left mouse / touch: one finger move
//    Zoom - middle mouse, or mousewheel / touch: two finger spread or squish
//    Pan - right mouse, or arrow keys / touch: three finter swipe
//
// This is a drop-in replacement for (most) TrackballControls used in examples.
// That is, include this js file and wherever you see:
//    	controls = new THREE.TrackballControls( camera );
//      controls.target.z = 150;
// Simple substitute "OrbitControls" and the control should work as-is.

THREE.OrbitControls = function ( object, domElement, localElement ) {

  this.object = object;
  this.domElement = ( domElement !== undefined ) ? domElement : document;
  this.localElement = ( localElement !== undefined ) ? localElement : document;

  // API

  // Set to false to disable this control
  this.enabled = true;

  // "target" sets the location of focus, where the control orbits around
  // and where it pans with respect to.
  this.target = new THREE.Vector3();
  // center is old, deprecated; use "target" instead
  this.center = this.target;

  // This option actually enables dollying in and out; left as "zoom" for
  // backwards compatibility
  this.noZoom = false;
  this.zoomSpeed = 1.0;
  // Limits to how far you can dolly in and out
  this.minDistance = 0;
  this.maxDistance = Infinity;

  // Set to true to disable this control
  this.noRotate = false;
  this.rotateSpeed = 1.0;

  // Set to true to disable this control
  this.noPan = false;
  this.keyPanSpeed = 7.0;	// pixels moved per arrow key push

  // Set to true to automatically rotate around the target
  this.autoRotate = false;
  this.autoRotateSpeed = 2.0; // 30 seconds per round when fps is 60

  // How far you can orbit vertically, upper and lower limits.
  // Range is 0 to Math.PI radians.
  this.minPolarAngle = 0; // radians
  this.maxPolarAngle = Math.PI; // radians

  // Set to true to disable use of the keys
  this.noKeys = false;
  // The four arrow keys
  this.keys = { LEFT: 37, UP: 38, RIGHT: 39, BOTTOM: 40 };

  ////////////
  // internals

  var scope = this;

  var EPS = 0.000001;

  var rotateStart = new THREE.Vector2();
  var rotateEnd = new THREE.Vector2();
  var rotateDelta = new THREE.Vector2();

  var panStart = new THREE.Vector2();
  var panEnd = new THREE.Vector2();
  var panDelta = new THREE.Vector2();

  var dollyStart = new THREE.Vector2();
  var dollyEnd = new THREE.Vector2();
  var dollyDelta = new THREE.Vector2();

  var phiDelta = 0;
  var thetaDelta = 0;
  var scale = 1;
  var pan = new THREE.Vector3();

  var lastPosition = new THREE.Vector3();

  var STATE = { NONE : -1, ROTATE : 0, DOLLY : 1, PAN : 2, TOUCH_ROTATE : 3, TOUCH_DOLLY : 4, TOUCH_PAN : 5 };
  var state = STATE.NONE;

  // events

  var changeEvent = { type: 'change' };


  this.rotateLeft = function ( angle ) {

    if ( angle === undefined ) {

      angle = getAutoRotationAngle();

    }

    thetaDelta -= angle;

  };

  this.rotateUp = function ( angle ) {

    if ( angle === undefined ) {

      angle = getAutoRotationAngle();

    }

    phiDelta -= angle;

  };

  // pass in distance in world space to move left
  this.panLeft = function ( distance ) {

    var panOffset = new THREE.Vector3();
    var te = this.object.matrix.elements;
    // get X column of matrix
    panOffset.set( te[0], te[1], te[2] );
    panOffset.multiplyScalar(-distance);

    pan.add( panOffset );

  };

  // pass in distance in world space to move up
  this.panUp = function ( distance ) {

    var panOffset = new THREE.Vector3();
    var te = this.object.matrix.elements;
    // get Y column of matrix
    panOffset.set( te[4], te[5], te[6] );
    panOffset.multiplyScalar(distance);

    pan.add( panOffset );
  };

  // main entry point; pass in Vector2 of change desired in pixel space,
  // right and down are positive
  this.pan = function ( delta ) {

    var element = scope.domElement === document ? scope.domElement.body : scope.domElement;

    if ( scope.object.fov !== undefined ) {

      // perspective
      var position = scope.object.position;
      var offset = position.clone().sub( scope.target );
      var targetDistance = offset.length();

      // half of the fov is center to top of screen
      targetDistance *= Math.tan( (scope.object.fov/2) * Math.PI / 180.0 );
      // we actually don't use screenWidth, since perspective camera is fixed to screen height
      scope.panLeft( 2 * delta.x * targetDistance / element.clientHeight );
      scope.panUp( 2 * delta.y * targetDistance / element.clientHeight );

    } else if ( scope.object.top !== undefined ) {

      // orthographic
      scope.panLeft( delta.x * (scope.object.right - scope.object.left) / element.clientWidth );
      scope.panUp( delta.y * (scope.object.top - scope.object.bottom) / element.clientHeight );

    } else {

      // camera neither orthographic or perspective - warn user
      console.warn( 'WARNING: OrbitControls.js encountered an unknown camera type - pan disabled.' );

    }

  };

  this.dollyIn = function ( dollyScale ) {

    if ( dollyScale === undefined ) {

      dollyScale = getZoomScale();

    }

    scale /= dollyScale;

  };

  this.dollyOut = function ( dollyScale ) {

    if ( dollyScale === undefined ) {

      dollyScale = getZoomScale();

    }

    scale *= dollyScale;

  };

  this.update = function () {

    var position = this.object.position;
    var offset = position.clone().sub( this.target );

    // angle from z-axis around y-axis

    var theta = Math.atan2( offset.x, offset.z );

    // angle from y-axis

    var phi = Math.atan2( Math.sqrt( offset.x * offset.x + offset.z * offset.z ), offset.y );

    if ( this.autoRotate ) {

      this.rotateLeft( getAutoRotationAngle() );

    }

    theta += thetaDelta;
    phi += phiDelta;

    // restrict phi to be between desired limits
    phi = Math.max( this.minPolarAngle, Math.min( this.maxPolarAngle, phi ) );

    // restrict phi to be betwee EPS and PI-EPS
    phi = Math.max( EPS, Math.min( Math.PI - EPS, phi ) );

    var radius = offset.length() * scale;

    // restrict radius to be between desired limits
    radius = Math.max( this.minDistance, Math.min( this.maxDistance, radius ) );

    // move target to panned location
    this.target.add( pan );

    offset.x = radius * Math.sin( phi ) * Math.sin( theta );
    offset.y = radius * Math.cos( phi );
    offset.z = radius * Math.sin( phi ) * Math.cos( theta );

    position.copy( this.target ).add( offset );

    this.object.lookAt( this.target );

    thetaDelta = 0;
    phiDelta = 0;
    scale = 1;
    pan.set(0,0,0);

    if ( lastPosition.distanceTo( this.object.position ) > 0 ) {

      this.dispatchEvent( changeEvent );

      lastPosition.copy( this.object.position );

    }

  };


  function getAutoRotationAngle() {

    return 2 * Math.PI / 60 / 60 * scope.autoRotateSpeed;

  }

  function getZoomScale() {

    return Math.pow( 0.95, scope.zoomSpeed );

  }

  function onMouseDown( event ) {

    if ( scope.enabled === false ) { return; }
    event.preventDefault();

    if ( event.button === 0 ) {
      if ( scope.noRotate === true ) { return; }

      state = STATE.ROTATE;

      rotateStart.set( event.clientX, event.clientY );

    } else if ( event.button === 1 ) {
      if ( scope.noZoom === true ) { return; }

      state = STATE.DOLLY;

      dollyStart.set( event.clientX, event.clientY );

    } else if ( event.button === 2 ) {
      if ( scope.noPan === true ) { return; }

      state = STATE.PAN;

      panStart.set( event.clientX, event.clientY );

    }

    // Greggman fix: https://github.com/greggman/three.js/commit/fde9f9917d6d8381f06bf22cdff766029d1761be
    scope.domElement.addEventListener( 'mousemove', onMouseMove, false );
    scope.domElement.addEventListener( 'mouseup', onMouseUp, false );

  }

  function onMouseMove( event ) {

    if ( scope.enabled === false ) return;

    event.preventDefault();

    var element = scope.domElement === document ? scope.domElement.body : scope.domElement;

    if ( state === STATE.ROTATE ) {

      if ( scope.noRotate === true ) return;

      rotateEnd.set( event.clientX, event.clientY );
      rotateDelta.subVectors( rotateEnd, rotateStart );

      // rotating across whole screen goes 360 degrees around
      scope.rotateLeft( 2 * Math.PI * rotateDelta.x / element.clientWidth * scope.rotateSpeed );
      // rotating up and down along whole screen attempts to go 360, but limited to 180
      scope.rotateUp( 2 * Math.PI * rotateDelta.y / element.clientHeight * scope.rotateSpeed );

      rotateStart.copy( rotateEnd );

    } else if ( state === STATE.DOLLY ) {

      if ( scope.noZoom === true ) return;

      dollyEnd.set( event.clientX, event.clientY );
      dollyDelta.subVectors( dollyEnd, dollyStart );

      if ( dollyDelta.y > 0 ) {

        scope.dollyIn();

      } else {

        scope.dollyOut();

      }

      dollyStart.copy( dollyEnd );

    } else if ( state === STATE.PAN ) {

      if ( scope.noPan === true ) return;

      panEnd.set( event.clientX, event.clientY );
      panDelta.subVectors( panEnd, panStart );

      scope.pan( panDelta );

      panStart.copy( panEnd );

    }

    // Greggman fix: https://github.com/greggman/three.js/commit/fde9f9917d6d8381f06bf22cdff766029d1761be
    scope.update();

  }

  function onMouseUp( /* event */ ) {

    if ( scope.enabled === false ) return;

    // Greggman fix: https://github.com/greggman/three.js/commit/fde9f9917d6d8381f06bf22cdff766029d1761be
    scope.domElement.removeEventListener( 'mousemove', onMouseMove, false );
    scope.domElement.removeEventListener( 'mouseup', onMouseUp, false );

    state = STATE.NONE;

  }

  function onMouseWheel( event ) {

    if ( scope.enabled === false || scope.noZoom === true ) return;

    var delta = 0;

    if ( event.wheelDelta ) { // WebKit / Opera / Explorer 9

      delta = event.wheelDelta;

    } else if ( event.detail ) { // Firefox

      delta = - event.detail;

    }

    if ( delta > 0 ) {

      scope.dollyOut();

    } else {

      scope.dollyIn();

    }

  }

  function onKeyDown( event ) {

    if ( scope.enabled === false ) { return; }
    if ( scope.noKeys === true ) { return; }
    if ( scope.noPan === true ) { return; }

    // pan a pixel - I guess for precise positioning?
    // Greggman fix: https://github.com/greggman/three.js/commit/fde9f9917d6d8381f06bf22cdff766029d1761be
    var needUpdate = false;

    switch ( event.keyCode ) {

      case scope.keys.UP:
        scope.pan( new THREE.Vector2( 0, scope.keyPanSpeed ) );
        needUpdate = true;
        break;
      case scope.keys.BOTTOM:
        scope.pan( new THREE.Vector2( 0, -scope.keyPanSpeed ) );
        needUpdate = true;
        break;
      case scope.keys.LEFT:
        scope.pan( new THREE.Vector2( scope.keyPanSpeed, 0 ) );
        needUpdate = true;
        break;
      case scope.keys.RIGHT:
        scope.pan( new THREE.Vector2( -scope.keyPanSpeed, 0 ) );
        needUpdate = true;
        break;
    }

    // Greggman fix: https://github.com/greggman/three.js/commit/fde9f9917d6d8381f06bf22cdff766029d1761be
    if ( needUpdate ) {

      scope.update();

    }

  }

  function touchstart( event ) {

    if ( scope.enabled === false ) { return; }

    switch ( event.touches.length ) {

      case 1:	// one-fingered touch: rotate
        if ( scope.noRotate === true ) { return; }

        state = STATE.TOUCH_ROTATE;

        rotateStart.set( event.touches[ 0 ].pageX, event.touches[ 0 ].pageY );
        break;

      case 2:	// two-fingered touch: dolly
        if ( scope.noZoom === true ) { return; }

        state = STATE.TOUCH_DOLLY;

        var dx = event.touches[ 0 ].pageX - event.touches[ 1 ].pageX;
        var dy = event.touches[ 0 ].pageY - event.touches[ 1 ].pageY;
        var distance = Math.sqrt( dx * dx + dy * dy );
        dollyStart.set( 0, distance );
        break;

      case 3: // three-fingered touch: pan
        if ( scope.noPan === true ) { return; }

        state = STATE.TOUCH_PAN;

        panStart.set( event.touches[ 0 ].pageX, event.touches[ 0 ].pageY );
        break;

      default:
        state = STATE.NONE;

    }
  }

  function touchmove( event ) {

    if ( scope.enabled === false ) { return; }

    event.preventDefault();
    event.stopPropagation();

    var element = scope.domElement === document ? scope.domElement.body : scope.domElement;

    switch ( event.touches.length ) {

      case 1: // one-fingered touch: rotate
        if ( scope.noRotate === true ) { return; }
        if ( state !== STATE.TOUCH_ROTATE ) { return; }

        rotateEnd.set( event.touches[ 0 ].pageX, event.touches[ 0 ].pageY );
        rotateDelta.subVectors( rotateEnd, rotateStart );

        // rotating across whole screen goes 360 degrees around
        scope.rotateLeft( 2 * Math.PI * rotateDelta.x / element.clientWidth * scope.rotateSpeed );
        // rotating up and down along whole screen attempts to go 360, but limited to 180
        scope.rotateUp( 2 * Math.PI * rotateDelta.y / element.clientHeight * scope.rotateSpeed );

        rotateStart.copy( rotateEnd );
        break;

      case 2: // two-fingered touch: dolly
        if ( scope.noZoom === true ) { return; }
        if ( state !== STATE.TOUCH_DOLLY ) { return; }

        var dx = event.touches[ 0 ].pageX - event.touches[ 1 ].pageX;
        var dy = event.touches[ 0 ].pageY - event.touches[ 1 ].pageY;
        var distance = Math.sqrt( dx * dx + dy * dy );

        dollyEnd.set( 0, distance );
        dollyDelta.subVectors( dollyEnd, dollyStart );

        if ( dollyDelta.y > 0 ) {

          scope.dollyOut();

        } else {

          scope.dollyIn();

        }

        dollyStart.copy( dollyEnd );
        break;

      case 3: // three-fingered touch: pan
        if ( scope.noPan === true ) { return; }
        if ( state !== STATE.TOUCH_PAN ) { return; }

        panEnd.set( event.touches[ 0 ].pageX, event.touches[ 0 ].pageY );
        panDelta.subVectors( panEnd, panStart );

        scope.pan( panDelta );

        panStart.copy( panEnd );
        break;

      default:
        state = STATE.NONE;

    }

  }

  function touchend( /* event */ ) {

    if ( scope.enabled === false ) { return; }

    state = STATE.NONE;
  }

  this.domElement.addEventListener( 'contextmenu', function ( event ) { event.preventDefault(); }, false );
  this.localElement.addEventListener( 'mousedown', onMouseDown, false );
  this.domElement.addEventListener( 'mousewheel', onMouseWheel, false );
  this.domElement.addEventListener( 'DOMMouseScroll', onMouseWheel, false ); // firefox

  this.domElement.addEventListener( 'keydown', onKeyDown, false );

  this.localElement.addEventListener( 'touchstart', touchstart, false );
  this.domElement.addEventListener( 'touchend', touchend, false );
  this.domElement.addEventListener( 'touchmove', touchmove, false );

};

THREE.OrbitControls.prototype = Object.create( THREE.EventDispatcher.prototype );
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiIiwic291cmNlcyI6WyJsaWJzL29yYml0Q29udHJvbHMuanMiXSwic291cmNlc0NvbnRlbnQiOlsiLyoqXHJcbiAqIEBhdXRob3IgcWlhbyAvIGh0dHBzOi8vZ2l0aHViLmNvbS9xaWFvXHJcbiAqIEBhdXRob3IgbXJkb29iIC8gaHR0cDovL21yZG9vYi5jb21cclxuICogQGF1dGhvciBhbHRlcmVkcSAvIGh0dHA6Ly9hbHRlcmVkcXVhbGlhLmNvbS9cclxuICogQGF1dGhvciBXZXN0TGFuZ2xleSAvIGh0dHA6Ly9naXRodWIuY29tL1dlc3RMYW5nbGV5XHJcbiAqIEBhdXRob3IgZXJpY2g2NjYgLyBodHRwOi8vZXJpY2hhaW5lcy5jb21cclxuICogQGF1dGhvciBtcmZsaXggLyBodHRwOi8vZmVsaXhuaWtsYXMuZGVcclxuICpcclxuICogcmVsZWFzZWQgdW5kZXIgTUlUIExpY2Vuc2UgKE1JVClcclxuICovXHJcbi8qZ2xvYmFsIFRIUkVFLCBjb25zb2xlICovXHJcblxyXG4vLyBUaGlzIHNldCBvZiBjb250cm9scyBwZXJmb3JtcyBvcmJpdGluZywgZG9sbHlpbmcgKHpvb21pbmcpLCBhbmQgcGFubmluZy4gSXQgbWFpbnRhaW5zXHJcbi8vIHRoZSBcInVwXCIgZGlyZWN0aW9uIGFzICtZLCB1bmxpa2UgdGhlIFRyYWNrYmFsbENvbnRyb2xzLiBUb3VjaCBvbiB0YWJsZXQgYW5kIHBob25lcyBpc1xyXG4vLyBzdXBwb3J0ZWQuXHJcbi8vXHJcbi8vICAgIE9yYml0IC0gbGVmdCBtb3VzZSAvIHRvdWNoOiBvbmUgZmluZ2VyIG1vdmVcclxuLy8gICAgWm9vbSAtIG1pZGRsZSBtb3VzZSwgb3IgbW91c2V3aGVlbCAvIHRvdWNoOiB0d28gZmluZ2VyIHNwcmVhZCBvciBzcXVpc2hcclxuLy8gICAgUGFuIC0gcmlnaHQgbW91c2UsIG9yIGFycm93IGtleXMgLyB0b3VjaDogdGhyZWUgZmludGVyIHN3aXBlXHJcbi8vXHJcbi8vIFRoaXMgaXMgYSBkcm9wLWluIHJlcGxhY2VtZW50IGZvciAobW9zdCkgVHJhY2tiYWxsQ29udHJvbHMgdXNlZCBpbiBleGFtcGxlcy5cclxuLy8gVGhhdCBpcywgaW5jbHVkZSB0aGlzIGpzIGZpbGUgYW5kIHdoZXJldmVyIHlvdSBzZWU6XHJcbi8vICAgIFx0Y29udHJvbHMgPSBuZXcgVEhSRUUuVHJhY2tiYWxsQ29udHJvbHMoIGNhbWVyYSApO1xyXG4vLyAgICAgIGNvbnRyb2xzLnRhcmdldC56ID0gMTUwO1xyXG4vLyBTaW1wbGUgc3Vic3RpdHV0ZSBcIk9yYml0Q29udHJvbHNcIiBhbmQgdGhlIGNvbnRyb2wgc2hvdWxkIHdvcmsgYXMtaXMuXHJcblxyXG5USFJFRS5PcmJpdENvbnRyb2xzID0gZnVuY3Rpb24gKCBvYmplY3QsIGRvbUVsZW1lbnQsIGxvY2FsRWxlbWVudCApIHtcclxuXHJcbiAgdGhpcy5vYmplY3QgPSBvYmplY3Q7XHJcbiAgdGhpcy5kb21FbGVtZW50ID0gKCBkb21FbGVtZW50ICE9PSB1bmRlZmluZWQgKSA/IGRvbUVsZW1lbnQgOiBkb2N1bWVudDtcclxuICB0aGlzLmxvY2FsRWxlbWVudCA9ICggbG9jYWxFbGVtZW50ICE9PSB1bmRlZmluZWQgKSA/IGxvY2FsRWxlbWVudCA6IGRvY3VtZW50O1xyXG5cclxuICAvLyBBUElcclxuXHJcbiAgLy8gU2V0IHRvIGZhbHNlIHRvIGRpc2FibGUgdGhpcyBjb250cm9sXHJcbiAgdGhpcy5lbmFibGVkID0gdHJ1ZTtcclxuXHJcbiAgLy8gXCJ0YXJnZXRcIiBzZXRzIHRoZSBsb2NhdGlvbiBvZiBmb2N1cywgd2hlcmUgdGhlIGNvbnRyb2wgb3JiaXRzIGFyb3VuZFxyXG4gIC8vIGFuZCB3aGVyZSBpdCBwYW5zIHdpdGggcmVzcGVjdCB0by5cclxuICB0aGlzLnRhcmdldCA9IG5ldyBUSFJFRS5WZWN0b3IzKCk7XHJcbiAgLy8gY2VudGVyIGlzIG9sZCwgZGVwcmVjYXRlZDsgdXNlIFwidGFyZ2V0XCIgaW5zdGVhZFxyXG4gIHRoaXMuY2VudGVyID0gdGhpcy50YXJnZXQ7XHJcblxyXG4gIC8vIFRoaXMgb3B0aW9uIGFjdHVhbGx5IGVuYWJsZXMgZG9sbHlpbmcgaW4gYW5kIG91dDsgbGVmdCBhcyBcInpvb21cIiBmb3JcclxuICAvLyBiYWNrd2FyZHMgY29tcGF0aWJpbGl0eVxyXG4gIHRoaXMubm9ab29tID0gZmFsc2U7XHJcbiAgdGhpcy56b29tU3BlZWQgPSAxLjA7XHJcbiAgLy8gTGltaXRzIHRvIGhvdyBmYXIgeW91IGNhbiBkb2xseSBpbiBhbmQgb3V0XHJcbiAgdGhpcy5taW5EaXN0YW5jZSA9IDA7XHJcbiAgdGhpcy5tYXhEaXN0YW5jZSA9IEluZmluaXR5O1xyXG5cclxuICAvLyBTZXQgdG8gdHJ1ZSB0byBkaXNhYmxlIHRoaXMgY29udHJvbFxyXG4gIHRoaXMubm9Sb3RhdGUgPSBmYWxzZTtcclxuICB0aGlzLnJvdGF0ZVNwZWVkID0gMS4wO1xyXG5cclxuICAvLyBTZXQgdG8gdHJ1ZSB0byBkaXNhYmxlIHRoaXMgY29udHJvbFxyXG4gIHRoaXMubm9QYW4gPSBmYWxzZTtcclxuICB0aGlzLmtleVBhblNwZWVkID0gNy4wO1x0Ly8gcGl4ZWxzIG1vdmVkIHBlciBhcnJvdyBrZXkgcHVzaFxyXG5cclxuICAvLyBTZXQgdG8gdHJ1ZSB0byBhdXRvbWF0aWNhbGx5IHJvdGF0ZSBhcm91bmQgdGhlIHRhcmdldFxyXG4gIHRoaXMuYXV0b1JvdGF0ZSA9IGZhbHNlO1xyXG4gIHRoaXMuYXV0b1JvdGF0ZVNwZWVkID0gMi4wOyAvLyAzMCBzZWNvbmRzIHBlciByb3VuZCB3aGVuIGZwcyBpcyA2MFxyXG5cclxuICAvLyBIb3cgZmFyIHlvdSBjYW4gb3JiaXQgdmVydGljYWxseSwgdXBwZXIgYW5kIGxvd2VyIGxpbWl0cy5cclxuICAvLyBSYW5nZSBpcyAwIHRvIE1hdGguUEkgcmFkaWFucy5cclxuICB0aGlzLm1pblBvbGFyQW5nbGUgPSAwOyAvLyByYWRpYW5zXHJcbiAgdGhpcy5tYXhQb2xhckFuZ2xlID0gTWF0aC5QSTsgLy8gcmFkaWFuc1xyXG5cclxuICAvLyBTZXQgdG8gdHJ1ZSB0byBkaXNhYmxlIHVzZSBvZiB0aGUga2V5c1xyXG4gIHRoaXMubm9LZXlzID0gZmFsc2U7XHJcbiAgLy8gVGhlIGZvdXIgYXJyb3cga2V5c1xyXG4gIHRoaXMua2V5cyA9IHsgTEVGVDogMzcsIFVQOiAzOCwgUklHSFQ6IDM5LCBCT1RUT006IDQwIH07XHJcblxyXG4gIC8vLy8vLy8vLy8vL1xyXG4gIC8vIGludGVybmFsc1xyXG5cclxuICB2YXIgc2NvcGUgPSB0aGlzO1xyXG5cclxuICB2YXIgRVBTID0gMC4wMDAwMDE7XHJcblxyXG4gIHZhciByb3RhdGVTdGFydCA9IG5ldyBUSFJFRS5WZWN0b3IyKCk7XHJcbiAgdmFyIHJvdGF0ZUVuZCA9IG5ldyBUSFJFRS5WZWN0b3IyKCk7XHJcbiAgdmFyIHJvdGF0ZURlbHRhID0gbmV3IFRIUkVFLlZlY3RvcjIoKTtcclxuXHJcbiAgdmFyIHBhblN0YXJ0ID0gbmV3IFRIUkVFLlZlY3RvcjIoKTtcclxuICB2YXIgcGFuRW5kID0gbmV3IFRIUkVFLlZlY3RvcjIoKTtcclxuICB2YXIgcGFuRGVsdGEgPSBuZXcgVEhSRUUuVmVjdG9yMigpO1xyXG5cclxuICB2YXIgZG9sbHlTdGFydCA9IG5ldyBUSFJFRS5WZWN0b3IyKCk7XHJcbiAgdmFyIGRvbGx5RW5kID0gbmV3IFRIUkVFLlZlY3RvcjIoKTtcclxuICB2YXIgZG9sbHlEZWx0YSA9IG5ldyBUSFJFRS5WZWN0b3IyKCk7XHJcblxyXG4gIHZhciBwaGlEZWx0YSA9IDA7XHJcbiAgdmFyIHRoZXRhRGVsdGEgPSAwO1xyXG4gIHZhciBzY2FsZSA9IDE7XHJcbiAgdmFyIHBhbiA9IG5ldyBUSFJFRS5WZWN0b3IzKCk7XHJcblxyXG4gIHZhciBsYXN0UG9zaXRpb24gPSBuZXcgVEhSRUUuVmVjdG9yMygpO1xyXG5cclxuICB2YXIgU1RBVEUgPSB7IE5PTkUgOiAtMSwgUk9UQVRFIDogMCwgRE9MTFkgOiAxLCBQQU4gOiAyLCBUT1VDSF9ST1RBVEUgOiAzLCBUT1VDSF9ET0xMWSA6IDQsIFRPVUNIX1BBTiA6IDUgfTtcclxuICB2YXIgc3RhdGUgPSBTVEFURS5OT05FO1xyXG5cclxuICAvLyBldmVudHNcclxuXHJcbiAgdmFyIGNoYW5nZUV2ZW50ID0geyB0eXBlOiAnY2hhbmdlJyB9O1xyXG5cclxuXHJcbiAgdGhpcy5yb3RhdGVMZWZ0ID0gZnVuY3Rpb24gKCBhbmdsZSApIHtcclxuXHJcbiAgICBpZiAoIGFuZ2xlID09PSB1bmRlZmluZWQgKSB7XHJcblxyXG4gICAgICBhbmdsZSA9IGdldEF1dG9Sb3RhdGlvbkFuZ2xlKCk7XHJcblxyXG4gICAgfVxyXG5cclxuICAgIHRoZXRhRGVsdGEgLT0gYW5nbGU7XHJcblxyXG4gIH07XHJcblxyXG4gIHRoaXMucm90YXRlVXAgPSBmdW5jdGlvbiAoIGFuZ2xlICkge1xyXG5cclxuICAgIGlmICggYW5nbGUgPT09IHVuZGVmaW5lZCApIHtcclxuXHJcbiAgICAgIGFuZ2xlID0gZ2V0QXV0b1JvdGF0aW9uQW5nbGUoKTtcclxuXHJcbiAgICB9XHJcblxyXG4gICAgcGhpRGVsdGEgLT0gYW5nbGU7XHJcblxyXG4gIH07XHJcblxyXG4gIC8vIHBhc3MgaW4gZGlzdGFuY2UgaW4gd29ybGQgc3BhY2UgdG8gbW92ZSBsZWZ0XHJcbiAgdGhpcy5wYW5MZWZ0ID0gZnVuY3Rpb24gKCBkaXN0YW5jZSApIHtcclxuXHJcbiAgICB2YXIgcGFuT2Zmc2V0ID0gbmV3IFRIUkVFLlZlY3RvcjMoKTtcclxuICAgIHZhciB0ZSA9IHRoaXMub2JqZWN0Lm1hdHJpeC5lbGVtZW50cztcclxuICAgIC8vIGdldCBYIGNvbHVtbiBvZiBtYXRyaXhcclxuICAgIHBhbk9mZnNldC5zZXQoIHRlWzBdLCB0ZVsxXSwgdGVbMl0gKTtcclxuICAgIHBhbk9mZnNldC5tdWx0aXBseVNjYWxhcigtZGlzdGFuY2UpO1xyXG5cclxuICAgIHBhbi5hZGQoIHBhbk9mZnNldCApO1xyXG5cclxuICB9O1xyXG5cclxuICAvLyBwYXNzIGluIGRpc3RhbmNlIGluIHdvcmxkIHNwYWNlIHRvIG1vdmUgdXBcclxuICB0aGlzLnBhblVwID0gZnVuY3Rpb24gKCBkaXN0YW5jZSApIHtcclxuXHJcbiAgICB2YXIgcGFuT2Zmc2V0ID0gbmV3IFRIUkVFLlZlY3RvcjMoKTtcclxuICAgIHZhciB0ZSA9IHRoaXMub2JqZWN0Lm1hdHJpeC5lbGVtZW50cztcclxuICAgIC8vIGdldCBZIGNvbHVtbiBvZiBtYXRyaXhcclxuICAgIHBhbk9mZnNldC5zZXQoIHRlWzRdLCB0ZVs1XSwgdGVbNl0gKTtcclxuICAgIHBhbk9mZnNldC5tdWx0aXBseVNjYWxhcihkaXN0YW5jZSk7XHJcblxyXG4gICAgcGFuLmFkZCggcGFuT2Zmc2V0ICk7XHJcbiAgfTtcclxuXHJcbiAgLy8gbWFpbiBlbnRyeSBwb2ludDsgcGFzcyBpbiBWZWN0b3IyIG9mIGNoYW5nZSBkZXNpcmVkIGluIHBpeGVsIHNwYWNlLFxyXG4gIC8vIHJpZ2h0IGFuZCBkb3duIGFyZSBwb3NpdGl2ZVxyXG4gIHRoaXMucGFuID0gZnVuY3Rpb24gKCBkZWx0YSApIHtcclxuXHJcbiAgICB2YXIgZWxlbWVudCA9IHNjb3BlLmRvbUVsZW1lbnQgPT09IGRvY3VtZW50ID8gc2NvcGUuZG9tRWxlbWVudC5ib2R5IDogc2NvcGUuZG9tRWxlbWVudDtcclxuXHJcbiAgICBpZiAoIHNjb3BlLm9iamVjdC5mb3YgIT09IHVuZGVmaW5lZCApIHtcclxuXHJcbiAgICAgIC8vIHBlcnNwZWN0aXZlXHJcbiAgICAgIHZhciBwb3NpdGlvbiA9IHNjb3BlLm9iamVjdC5wb3NpdGlvbjtcclxuICAgICAgdmFyIG9mZnNldCA9IHBvc2l0aW9uLmNsb25lKCkuc3ViKCBzY29wZS50YXJnZXQgKTtcclxuICAgICAgdmFyIHRhcmdldERpc3RhbmNlID0gb2Zmc2V0Lmxlbmd0aCgpO1xyXG5cclxuICAgICAgLy8gaGFsZiBvZiB0aGUgZm92IGlzIGNlbnRlciB0byB0b3Agb2Ygc2NyZWVuXHJcbiAgICAgIHRhcmdldERpc3RhbmNlICo9IE1hdGgudGFuKCAoc2NvcGUub2JqZWN0LmZvdi8yKSAqIE1hdGguUEkgLyAxODAuMCApO1xyXG4gICAgICAvLyB3ZSBhY3R1YWxseSBkb24ndCB1c2Ugc2NyZWVuV2lkdGgsIHNpbmNlIHBlcnNwZWN0aXZlIGNhbWVyYSBpcyBmaXhlZCB0byBzY3JlZW4gaGVpZ2h0XHJcbiAgICAgIHNjb3BlLnBhbkxlZnQoIDIgKiBkZWx0YS54ICogdGFyZ2V0RGlzdGFuY2UgLyBlbGVtZW50LmNsaWVudEhlaWdodCApO1xyXG4gICAgICBzY29wZS5wYW5VcCggMiAqIGRlbHRhLnkgKiB0YXJnZXREaXN0YW5jZSAvIGVsZW1lbnQuY2xpZW50SGVpZ2h0ICk7XHJcblxyXG4gICAgfSBlbHNlIGlmICggc2NvcGUub2JqZWN0LnRvcCAhPT0gdW5kZWZpbmVkICkge1xyXG5cclxuICAgICAgLy8gb3J0aG9ncmFwaGljXHJcbiAgICAgIHNjb3BlLnBhbkxlZnQoIGRlbHRhLnggKiAoc2NvcGUub2JqZWN0LnJpZ2h0IC0gc2NvcGUub2JqZWN0LmxlZnQpIC8gZWxlbWVudC5jbGllbnRXaWR0aCApO1xyXG4gICAgICBzY29wZS5wYW5VcCggZGVsdGEueSAqIChzY29wZS5vYmplY3QudG9wIC0gc2NvcGUub2JqZWN0LmJvdHRvbSkgLyBlbGVtZW50LmNsaWVudEhlaWdodCApO1xyXG5cclxuICAgIH0gZWxzZSB7XHJcblxyXG4gICAgICAvLyBjYW1lcmEgbmVpdGhlciBvcnRob2dyYXBoaWMgb3IgcGVyc3BlY3RpdmUgLSB3YXJuIHVzZXJcclxuICAgICAgY29uc29sZS53YXJuKCAnV0FSTklORzogT3JiaXRDb250cm9scy5qcyBlbmNvdW50ZXJlZCBhbiB1bmtub3duIGNhbWVyYSB0eXBlIC0gcGFuIGRpc2FibGVkLicgKTtcclxuXHJcbiAgICB9XHJcblxyXG4gIH07XHJcblxyXG4gIHRoaXMuZG9sbHlJbiA9IGZ1bmN0aW9uICggZG9sbHlTY2FsZSApIHtcclxuXHJcbiAgICBpZiAoIGRvbGx5U2NhbGUgPT09IHVuZGVmaW5lZCApIHtcclxuXHJcbiAgICAgIGRvbGx5U2NhbGUgPSBnZXRab29tU2NhbGUoKTtcclxuXHJcbiAgICB9XHJcblxyXG4gICAgc2NhbGUgLz0gZG9sbHlTY2FsZTtcclxuXHJcbiAgfTtcclxuXHJcbiAgdGhpcy5kb2xseU91dCA9IGZ1bmN0aW9uICggZG9sbHlTY2FsZSApIHtcclxuXHJcbiAgICBpZiAoIGRvbGx5U2NhbGUgPT09IHVuZGVmaW5lZCApIHtcclxuXHJcbiAgICAgIGRvbGx5U2NhbGUgPSBnZXRab29tU2NhbGUoKTtcclxuXHJcbiAgICB9XHJcblxyXG4gICAgc2NhbGUgKj0gZG9sbHlTY2FsZTtcclxuXHJcbiAgfTtcclxuXHJcbiAgdGhpcy51cGRhdGUgPSBmdW5jdGlvbiAoKSB7XHJcblxyXG4gICAgdmFyIHBvc2l0aW9uID0gdGhpcy5vYmplY3QucG9zaXRpb247XHJcbiAgICB2YXIgb2Zmc2V0ID0gcG9zaXRpb24uY2xvbmUoKS5zdWIoIHRoaXMudGFyZ2V0ICk7XHJcblxyXG4gICAgLy8gYW5nbGUgZnJvbSB6LWF4aXMgYXJvdW5kIHktYXhpc1xyXG5cclxuICAgIHZhciB0aGV0YSA9IE1hdGguYXRhbjIoIG9mZnNldC54LCBvZmZzZXQueiApO1xyXG5cclxuICAgIC8vIGFuZ2xlIGZyb20geS1heGlzXHJcblxyXG4gICAgdmFyIHBoaSA9IE1hdGguYXRhbjIoIE1hdGguc3FydCggb2Zmc2V0LnggKiBvZmZzZXQueCArIG9mZnNldC56ICogb2Zmc2V0LnogKSwgb2Zmc2V0LnkgKTtcclxuXHJcbiAgICBpZiAoIHRoaXMuYXV0b1JvdGF0ZSApIHtcclxuXHJcbiAgICAgIHRoaXMucm90YXRlTGVmdCggZ2V0QXV0b1JvdGF0aW9uQW5nbGUoKSApO1xyXG5cclxuICAgIH1cclxuXHJcbiAgICB0aGV0YSArPSB0aGV0YURlbHRhO1xyXG4gICAgcGhpICs9IHBoaURlbHRhO1xyXG5cclxuICAgIC8vIHJlc3RyaWN0IHBoaSB0byBiZSBiZXR3ZWVuIGRlc2lyZWQgbGltaXRzXHJcbiAgICBwaGkgPSBNYXRoLm1heCggdGhpcy5taW5Qb2xhckFuZ2xlLCBNYXRoLm1pbiggdGhpcy5tYXhQb2xhckFuZ2xlLCBwaGkgKSApO1xyXG5cclxuICAgIC8vIHJlc3RyaWN0IHBoaSB0byBiZSBiZXR3ZWUgRVBTIGFuZCBQSS1FUFNcclxuICAgIHBoaSA9IE1hdGgubWF4KCBFUFMsIE1hdGgubWluKCBNYXRoLlBJIC0gRVBTLCBwaGkgKSApO1xyXG5cclxuICAgIHZhciByYWRpdXMgPSBvZmZzZXQubGVuZ3RoKCkgKiBzY2FsZTtcclxuXHJcbiAgICAvLyByZXN0cmljdCByYWRpdXMgdG8gYmUgYmV0d2VlbiBkZXNpcmVkIGxpbWl0c1xyXG4gICAgcmFkaXVzID0gTWF0aC5tYXgoIHRoaXMubWluRGlzdGFuY2UsIE1hdGgubWluKCB0aGlzLm1heERpc3RhbmNlLCByYWRpdXMgKSApO1xyXG5cclxuICAgIC8vIG1vdmUgdGFyZ2V0IHRvIHBhbm5lZCBsb2NhdGlvblxyXG4gICAgdGhpcy50YXJnZXQuYWRkKCBwYW4gKTtcclxuXHJcbiAgICBvZmZzZXQueCA9IHJhZGl1cyAqIE1hdGguc2luKCBwaGkgKSAqIE1hdGguc2luKCB0aGV0YSApO1xyXG4gICAgb2Zmc2V0LnkgPSByYWRpdXMgKiBNYXRoLmNvcyggcGhpICk7XHJcbiAgICBvZmZzZXQueiA9IHJhZGl1cyAqIE1hdGguc2luKCBwaGkgKSAqIE1hdGguY29zKCB0aGV0YSApO1xyXG5cclxuICAgIHBvc2l0aW9uLmNvcHkoIHRoaXMudGFyZ2V0ICkuYWRkKCBvZmZzZXQgKTtcclxuXHJcbiAgICB0aGlzLm9iamVjdC5sb29rQXQoIHRoaXMudGFyZ2V0ICk7XHJcblxyXG4gICAgdGhldGFEZWx0YSA9IDA7XHJcbiAgICBwaGlEZWx0YSA9IDA7XHJcbiAgICBzY2FsZSA9IDE7XHJcbiAgICBwYW4uc2V0KDAsMCwwKTtcclxuXHJcbiAgICBpZiAoIGxhc3RQb3NpdGlvbi5kaXN0YW5jZVRvKCB0aGlzLm9iamVjdC5wb3NpdGlvbiApID4gMCApIHtcclxuXHJcbiAgICAgIHRoaXMuZGlzcGF0Y2hFdmVudCggY2hhbmdlRXZlbnQgKTtcclxuXHJcbiAgICAgIGxhc3RQb3NpdGlvbi5jb3B5KCB0aGlzLm9iamVjdC5wb3NpdGlvbiApO1xyXG5cclxuICAgIH1cclxuXHJcbiAgfTtcclxuXHJcblxyXG4gIGZ1bmN0aW9uIGdldEF1dG9Sb3RhdGlvbkFuZ2xlKCkge1xyXG5cclxuICAgIHJldHVybiAyICogTWF0aC5QSSAvIDYwIC8gNjAgKiBzY29wZS5hdXRvUm90YXRlU3BlZWQ7XHJcblxyXG4gIH1cclxuXHJcbiAgZnVuY3Rpb24gZ2V0Wm9vbVNjYWxlKCkge1xyXG5cclxuICAgIHJldHVybiBNYXRoLnBvdyggMC45NSwgc2NvcGUuem9vbVNwZWVkICk7XHJcblxyXG4gIH1cclxuXHJcbiAgZnVuY3Rpb24gb25Nb3VzZURvd24oIGV2ZW50ICkge1xyXG5cclxuICAgIGlmICggc2NvcGUuZW5hYmxlZCA9PT0gZmFsc2UgKSB7IHJldHVybjsgfVxyXG4gICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcclxuXHJcbiAgICBpZiAoIGV2ZW50LmJ1dHRvbiA9PT0gMCApIHtcclxuICAgICAgaWYgKCBzY29wZS5ub1JvdGF0ZSA9PT0gdHJ1ZSApIHsgcmV0dXJuOyB9XHJcblxyXG4gICAgICBzdGF0ZSA9IFNUQVRFLlJPVEFURTtcclxuXHJcbiAgICAgIHJvdGF0ZVN0YXJ0LnNldCggZXZlbnQuY2xpZW50WCwgZXZlbnQuY2xpZW50WSApO1xyXG5cclxuICAgIH0gZWxzZSBpZiAoIGV2ZW50LmJ1dHRvbiA9PT0gMSApIHtcclxuICAgICAgaWYgKCBzY29wZS5ub1pvb20gPT09IHRydWUgKSB7IHJldHVybjsgfVxyXG5cclxuICAgICAgc3RhdGUgPSBTVEFURS5ET0xMWTtcclxuXHJcbiAgICAgIGRvbGx5U3RhcnQuc2V0KCBldmVudC5jbGllbnRYLCBldmVudC5jbGllbnRZICk7XHJcblxyXG4gICAgfSBlbHNlIGlmICggZXZlbnQuYnV0dG9uID09PSAyICkge1xyXG4gICAgICBpZiAoIHNjb3BlLm5vUGFuID09PSB0cnVlICkgeyByZXR1cm47IH1cclxuXHJcbiAgICAgIHN0YXRlID0gU1RBVEUuUEFOO1xyXG5cclxuICAgICAgcGFuU3RhcnQuc2V0KCBldmVudC5jbGllbnRYLCBldmVudC5jbGllbnRZICk7XHJcblxyXG4gICAgfVxyXG5cclxuICAgIC8vIEdyZWdnbWFuIGZpeDogaHR0cHM6Ly9naXRodWIuY29tL2dyZWdnbWFuL3RocmVlLmpzL2NvbW1pdC9mZGU5Zjk5MTdkNmQ4MzgxZjA2YmYyMmNkZmY3NjYwMjlkMTc2MWJlXHJcbiAgICBzY29wZS5kb21FbGVtZW50LmFkZEV2ZW50TGlzdGVuZXIoICdtb3VzZW1vdmUnLCBvbk1vdXNlTW92ZSwgZmFsc2UgKTtcclxuICAgIHNjb3BlLmRvbUVsZW1lbnQuYWRkRXZlbnRMaXN0ZW5lciggJ21vdXNldXAnLCBvbk1vdXNlVXAsIGZhbHNlICk7XHJcblxyXG4gIH1cclxuXHJcbiAgZnVuY3Rpb24gb25Nb3VzZU1vdmUoIGV2ZW50ICkge1xyXG5cclxuICAgIGlmICggc2NvcGUuZW5hYmxlZCA9PT0gZmFsc2UgKSByZXR1cm47XHJcblxyXG4gICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcclxuXHJcbiAgICB2YXIgZWxlbWVudCA9IHNjb3BlLmRvbUVsZW1lbnQgPT09IGRvY3VtZW50ID8gc2NvcGUuZG9tRWxlbWVudC5ib2R5IDogc2NvcGUuZG9tRWxlbWVudDtcclxuXHJcbiAgICBpZiAoIHN0YXRlID09PSBTVEFURS5ST1RBVEUgKSB7XHJcblxyXG4gICAgICBpZiAoIHNjb3BlLm5vUm90YXRlID09PSB0cnVlICkgcmV0dXJuO1xyXG5cclxuICAgICAgcm90YXRlRW5kLnNldCggZXZlbnQuY2xpZW50WCwgZXZlbnQuY2xpZW50WSApO1xyXG4gICAgICByb3RhdGVEZWx0YS5zdWJWZWN0b3JzKCByb3RhdGVFbmQsIHJvdGF0ZVN0YXJ0ICk7XHJcblxyXG4gICAgICAvLyByb3RhdGluZyBhY3Jvc3Mgd2hvbGUgc2NyZWVuIGdvZXMgMzYwIGRlZ3JlZXMgYXJvdW5kXHJcbiAgICAgIHNjb3BlLnJvdGF0ZUxlZnQoIDIgKiBNYXRoLlBJICogcm90YXRlRGVsdGEueCAvIGVsZW1lbnQuY2xpZW50V2lkdGggKiBzY29wZS5yb3RhdGVTcGVlZCApO1xyXG4gICAgICAvLyByb3RhdGluZyB1cCBhbmQgZG93biBhbG9uZyB3aG9sZSBzY3JlZW4gYXR0ZW1wdHMgdG8gZ28gMzYwLCBidXQgbGltaXRlZCB0byAxODBcclxuICAgICAgc2NvcGUucm90YXRlVXAoIDIgKiBNYXRoLlBJICogcm90YXRlRGVsdGEueSAvIGVsZW1lbnQuY2xpZW50SGVpZ2h0ICogc2NvcGUucm90YXRlU3BlZWQgKTtcclxuXHJcbiAgICAgIHJvdGF0ZVN0YXJ0LmNvcHkoIHJvdGF0ZUVuZCApO1xyXG5cclxuICAgIH0gZWxzZSBpZiAoIHN0YXRlID09PSBTVEFURS5ET0xMWSApIHtcclxuXHJcbiAgICAgIGlmICggc2NvcGUubm9ab29tID09PSB0cnVlICkgcmV0dXJuO1xyXG5cclxuICAgICAgZG9sbHlFbmQuc2V0KCBldmVudC5jbGllbnRYLCBldmVudC5jbGllbnRZICk7XHJcbiAgICAgIGRvbGx5RGVsdGEuc3ViVmVjdG9ycyggZG9sbHlFbmQsIGRvbGx5U3RhcnQgKTtcclxuXHJcbiAgICAgIGlmICggZG9sbHlEZWx0YS55ID4gMCApIHtcclxuXHJcbiAgICAgICAgc2NvcGUuZG9sbHlJbigpO1xyXG5cclxuICAgICAgfSBlbHNlIHtcclxuXHJcbiAgICAgICAgc2NvcGUuZG9sbHlPdXQoKTtcclxuXHJcbiAgICAgIH1cclxuXHJcbiAgICAgIGRvbGx5U3RhcnQuY29weSggZG9sbHlFbmQgKTtcclxuXHJcbiAgICB9IGVsc2UgaWYgKCBzdGF0ZSA9PT0gU1RBVEUuUEFOICkge1xyXG5cclxuICAgICAgaWYgKCBzY29wZS5ub1BhbiA9PT0gdHJ1ZSApIHJldHVybjtcclxuXHJcbiAgICAgIHBhbkVuZC5zZXQoIGV2ZW50LmNsaWVudFgsIGV2ZW50LmNsaWVudFkgKTtcclxuICAgICAgcGFuRGVsdGEuc3ViVmVjdG9ycyggcGFuRW5kLCBwYW5TdGFydCApO1xyXG5cclxuICAgICAgc2NvcGUucGFuKCBwYW5EZWx0YSApO1xyXG5cclxuICAgICAgcGFuU3RhcnQuY29weSggcGFuRW5kICk7XHJcblxyXG4gICAgfVxyXG5cclxuICAgIC8vIEdyZWdnbWFuIGZpeDogaHR0cHM6Ly9naXRodWIuY29tL2dyZWdnbWFuL3RocmVlLmpzL2NvbW1pdC9mZGU5Zjk5MTdkNmQ4MzgxZjA2YmYyMmNkZmY3NjYwMjlkMTc2MWJlXHJcbiAgICBzY29wZS51cGRhdGUoKTtcclxuXHJcbiAgfVxyXG5cclxuICBmdW5jdGlvbiBvbk1vdXNlVXAoIC8qIGV2ZW50ICovICkge1xyXG5cclxuICAgIGlmICggc2NvcGUuZW5hYmxlZCA9PT0gZmFsc2UgKSByZXR1cm47XHJcblxyXG4gICAgLy8gR3JlZ2dtYW4gZml4OiBodHRwczovL2dpdGh1Yi5jb20vZ3JlZ2dtYW4vdGhyZWUuanMvY29tbWl0L2ZkZTlmOTkxN2Q2ZDgzODFmMDZiZjIyY2RmZjc2NjAyOWQxNzYxYmVcclxuICAgIHNjb3BlLmRvbUVsZW1lbnQucmVtb3ZlRXZlbnRMaXN0ZW5lciggJ21vdXNlbW92ZScsIG9uTW91c2VNb3ZlLCBmYWxzZSApO1xyXG4gICAgc2NvcGUuZG9tRWxlbWVudC5yZW1vdmVFdmVudExpc3RlbmVyKCAnbW91c2V1cCcsIG9uTW91c2VVcCwgZmFsc2UgKTtcclxuXHJcbiAgICBzdGF0ZSA9IFNUQVRFLk5PTkU7XHJcblxyXG4gIH1cclxuXHJcbiAgZnVuY3Rpb24gb25Nb3VzZVdoZWVsKCBldmVudCApIHtcclxuXHJcbiAgICBpZiAoIHNjb3BlLmVuYWJsZWQgPT09IGZhbHNlIHx8IHNjb3BlLm5vWm9vbSA9PT0gdHJ1ZSApIHJldHVybjtcclxuXHJcbiAgICB2YXIgZGVsdGEgPSAwO1xyXG5cclxuICAgIGlmICggZXZlbnQud2hlZWxEZWx0YSApIHsgLy8gV2ViS2l0IC8gT3BlcmEgLyBFeHBsb3JlciA5XHJcblxyXG4gICAgICBkZWx0YSA9IGV2ZW50LndoZWVsRGVsdGE7XHJcblxyXG4gICAgfSBlbHNlIGlmICggZXZlbnQuZGV0YWlsICkgeyAvLyBGaXJlZm94XHJcblxyXG4gICAgICBkZWx0YSA9IC0gZXZlbnQuZGV0YWlsO1xyXG5cclxuICAgIH1cclxuXHJcbiAgICBpZiAoIGRlbHRhID4gMCApIHtcclxuXHJcbiAgICAgIHNjb3BlLmRvbGx5T3V0KCk7XHJcblxyXG4gICAgfSBlbHNlIHtcclxuXHJcbiAgICAgIHNjb3BlLmRvbGx5SW4oKTtcclxuXHJcbiAgICB9XHJcblxyXG4gIH1cclxuXHJcbiAgZnVuY3Rpb24gb25LZXlEb3duKCBldmVudCApIHtcclxuXHJcbiAgICBpZiAoIHNjb3BlLmVuYWJsZWQgPT09IGZhbHNlICkgeyByZXR1cm47IH1cclxuICAgIGlmICggc2NvcGUubm9LZXlzID09PSB0cnVlICkgeyByZXR1cm47IH1cclxuICAgIGlmICggc2NvcGUubm9QYW4gPT09IHRydWUgKSB7IHJldHVybjsgfVxyXG5cclxuICAgIC8vIHBhbiBhIHBpeGVsIC0gSSBndWVzcyBmb3IgcHJlY2lzZSBwb3NpdGlvbmluZz9cclxuICAgIC8vIEdyZWdnbWFuIGZpeDogaHR0cHM6Ly9naXRodWIuY29tL2dyZWdnbWFuL3RocmVlLmpzL2NvbW1pdC9mZGU5Zjk5MTdkNmQ4MzgxZjA2YmYyMmNkZmY3NjYwMjlkMTc2MWJlXHJcbiAgICB2YXIgbmVlZFVwZGF0ZSA9IGZhbHNlO1xyXG5cclxuICAgIHN3aXRjaCAoIGV2ZW50LmtleUNvZGUgKSB7XHJcblxyXG4gICAgICBjYXNlIHNjb3BlLmtleXMuVVA6XHJcbiAgICAgICAgc2NvcGUucGFuKCBuZXcgVEhSRUUuVmVjdG9yMiggMCwgc2NvcGUua2V5UGFuU3BlZWQgKSApO1xyXG4gICAgICAgIG5lZWRVcGRhdGUgPSB0cnVlO1xyXG4gICAgICAgIGJyZWFrO1xyXG4gICAgICBjYXNlIHNjb3BlLmtleXMuQk9UVE9NOlxyXG4gICAgICAgIHNjb3BlLnBhbiggbmV3IFRIUkVFLlZlY3RvcjIoIDAsIC1zY29wZS5rZXlQYW5TcGVlZCApICk7XHJcbiAgICAgICAgbmVlZFVwZGF0ZSA9IHRydWU7XHJcbiAgICAgICAgYnJlYWs7XHJcbiAgICAgIGNhc2Ugc2NvcGUua2V5cy5MRUZUOlxyXG4gICAgICAgIHNjb3BlLnBhbiggbmV3IFRIUkVFLlZlY3RvcjIoIHNjb3BlLmtleVBhblNwZWVkLCAwICkgKTtcclxuICAgICAgICBuZWVkVXBkYXRlID0gdHJ1ZTtcclxuICAgICAgICBicmVhaztcclxuICAgICAgY2FzZSBzY29wZS5rZXlzLlJJR0hUOlxyXG4gICAgICAgIHNjb3BlLnBhbiggbmV3IFRIUkVFLlZlY3RvcjIoIC1zY29wZS5rZXlQYW5TcGVlZCwgMCApICk7XHJcbiAgICAgICAgbmVlZFVwZGF0ZSA9IHRydWU7XHJcbiAgICAgICAgYnJlYWs7XHJcbiAgICB9XHJcblxyXG4gICAgLy8gR3JlZ2dtYW4gZml4OiBodHRwczovL2dpdGh1Yi5jb20vZ3JlZ2dtYW4vdGhyZWUuanMvY29tbWl0L2ZkZTlmOTkxN2Q2ZDgzODFmMDZiZjIyY2RmZjc2NjAyOWQxNzYxYmVcclxuICAgIGlmICggbmVlZFVwZGF0ZSApIHtcclxuXHJcbiAgICAgIHNjb3BlLnVwZGF0ZSgpO1xyXG5cclxuICAgIH1cclxuXHJcbiAgfVxyXG5cclxuICBmdW5jdGlvbiB0b3VjaHN0YXJ0KCBldmVudCApIHtcclxuXHJcbiAgICBpZiAoIHNjb3BlLmVuYWJsZWQgPT09IGZhbHNlICkgeyByZXR1cm47IH1cclxuXHJcbiAgICBzd2l0Y2ggKCBldmVudC50b3VjaGVzLmxlbmd0aCApIHtcclxuXHJcbiAgICAgIGNhc2UgMTpcdC8vIG9uZS1maW5nZXJlZCB0b3VjaDogcm90YXRlXHJcbiAgICAgICAgaWYgKCBzY29wZS5ub1JvdGF0ZSA9PT0gdHJ1ZSApIHsgcmV0dXJuOyB9XHJcblxyXG4gICAgICAgIHN0YXRlID0gU1RBVEUuVE9VQ0hfUk9UQVRFO1xyXG5cclxuICAgICAgICByb3RhdGVTdGFydC5zZXQoIGV2ZW50LnRvdWNoZXNbIDAgXS5wYWdlWCwgZXZlbnQudG91Y2hlc1sgMCBdLnBhZ2VZICk7XHJcbiAgICAgICAgYnJlYWs7XHJcblxyXG4gICAgICBjYXNlIDI6XHQvLyB0d28tZmluZ2VyZWQgdG91Y2g6IGRvbGx5XHJcbiAgICAgICAgaWYgKCBzY29wZS5ub1pvb20gPT09IHRydWUgKSB7IHJldHVybjsgfVxyXG5cclxuICAgICAgICBzdGF0ZSA9IFNUQVRFLlRPVUNIX0RPTExZO1xyXG5cclxuICAgICAgICB2YXIgZHggPSBldmVudC50b3VjaGVzWyAwIF0ucGFnZVggLSBldmVudC50b3VjaGVzWyAxIF0ucGFnZVg7XHJcbiAgICAgICAgdmFyIGR5ID0gZXZlbnQudG91Y2hlc1sgMCBdLnBhZ2VZIC0gZXZlbnQudG91Y2hlc1sgMSBdLnBhZ2VZO1xyXG4gICAgICAgIHZhciBkaXN0YW5jZSA9IE1hdGguc3FydCggZHggKiBkeCArIGR5ICogZHkgKTtcclxuICAgICAgICBkb2xseVN0YXJ0LnNldCggMCwgZGlzdGFuY2UgKTtcclxuICAgICAgICBicmVhaztcclxuXHJcbiAgICAgIGNhc2UgMzogLy8gdGhyZWUtZmluZ2VyZWQgdG91Y2g6IHBhblxyXG4gICAgICAgIGlmICggc2NvcGUubm9QYW4gPT09IHRydWUgKSB7IHJldHVybjsgfVxyXG5cclxuICAgICAgICBzdGF0ZSA9IFNUQVRFLlRPVUNIX1BBTjtcclxuXHJcbiAgICAgICAgcGFuU3RhcnQuc2V0KCBldmVudC50b3VjaGVzWyAwIF0ucGFnZVgsIGV2ZW50LnRvdWNoZXNbIDAgXS5wYWdlWSApO1xyXG4gICAgICAgIGJyZWFrO1xyXG5cclxuICAgICAgZGVmYXVsdDpcclxuICAgICAgICBzdGF0ZSA9IFNUQVRFLk5PTkU7XHJcblxyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgZnVuY3Rpb24gdG91Y2htb3ZlKCBldmVudCApIHtcclxuXHJcbiAgICBpZiAoIHNjb3BlLmVuYWJsZWQgPT09IGZhbHNlICkgeyByZXR1cm47IH1cclxuXHJcbiAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xyXG4gICAgZXZlbnQuc3RvcFByb3BhZ2F0aW9uKCk7XHJcblxyXG4gICAgdmFyIGVsZW1lbnQgPSBzY29wZS5kb21FbGVtZW50ID09PSBkb2N1bWVudCA/IHNjb3BlLmRvbUVsZW1lbnQuYm9keSA6IHNjb3BlLmRvbUVsZW1lbnQ7XHJcblxyXG4gICAgc3dpdGNoICggZXZlbnQudG91Y2hlcy5sZW5ndGggKSB7XHJcblxyXG4gICAgICBjYXNlIDE6IC8vIG9uZS1maW5nZXJlZCB0b3VjaDogcm90YXRlXHJcbiAgICAgICAgaWYgKCBzY29wZS5ub1JvdGF0ZSA9PT0gdHJ1ZSApIHsgcmV0dXJuOyB9XHJcbiAgICAgICAgaWYgKCBzdGF0ZSAhPT0gU1RBVEUuVE9VQ0hfUk9UQVRFICkgeyByZXR1cm47IH1cclxuXHJcbiAgICAgICAgcm90YXRlRW5kLnNldCggZXZlbnQudG91Y2hlc1sgMCBdLnBhZ2VYLCBldmVudC50b3VjaGVzWyAwIF0ucGFnZVkgKTtcclxuICAgICAgICByb3RhdGVEZWx0YS5zdWJWZWN0b3JzKCByb3RhdGVFbmQsIHJvdGF0ZVN0YXJ0ICk7XHJcblxyXG4gICAgICAgIC8vIHJvdGF0aW5nIGFjcm9zcyB3aG9sZSBzY3JlZW4gZ29lcyAzNjAgZGVncmVlcyBhcm91bmRcclxuICAgICAgICBzY29wZS5yb3RhdGVMZWZ0KCAyICogTWF0aC5QSSAqIHJvdGF0ZURlbHRhLnggLyBlbGVtZW50LmNsaWVudFdpZHRoICogc2NvcGUucm90YXRlU3BlZWQgKTtcclxuICAgICAgICAvLyByb3RhdGluZyB1cCBhbmQgZG93biBhbG9uZyB3aG9sZSBzY3JlZW4gYXR0ZW1wdHMgdG8gZ28gMzYwLCBidXQgbGltaXRlZCB0byAxODBcclxuICAgICAgICBzY29wZS5yb3RhdGVVcCggMiAqIE1hdGguUEkgKiByb3RhdGVEZWx0YS55IC8gZWxlbWVudC5jbGllbnRIZWlnaHQgKiBzY29wZS5yb3RhdGVTcGVlZCApO1xyXG5cclxuICAgICAgICByb3RhdGVTdGFydC5jb3B5KCByb3RhdGVFbmQgKTtcclxuICAgICAgICBicmVhaztcclxuXHJcbiAgICAgIGNhc2UgMjogLy8gdHdvLWZpbmdlcmVkIHRvdWNoOiBkb2xseVxyXG4gICAgICAgIGlmICggc2NvcGUubm9ab29tID09PSB0cnVlICkgeyByZXR1cm47IH1cclxuICAgICAgICBpZiAoIHN0YXRlICE9PSBTVEFURS5UT1VDSF9ET0xMWSApIHsgcmV0dXJuOyB9XHJcblxyXG4gICAgICAgIHZhciBkeCA9IGV2ZW50LnRvdWNoZXNbIDAgXS5wYWdlWCAtIGV2ZW50LnRvdWNoZXNbIDEgXS5wYWdlWDtcclxuICAgICAgICB2YXIgZHkgPSBldmVudC50b3VjaGVzWyAwIF0ucGFnZVkgLSBldmVudC50b3VjaGVzWyAxIF0ucGFnZVk7XHJcbiAgICAgICAgdmFyIGRpc3RhbmNlID0gTWF0aC5zcXJ0KCBkeCAqIGR4ICsgZHkgKiBkeSApO1xyXG5cclxuICAgICAgICBkb2xseUVuZC5zZXQoIDAsIGRpc3RhbmNlICk7XHJcbiAgICAgICAgZG9sbHlEZWx0YS5zdWJWZWN0b3JzKCBkb2xseUVuZCwgZG9sbHlTdGFydCApO1xyXG5cclxuICAgICAgICBpZiAoIGRvbGx5RGVsdGEueSA+IDAgKSB7XHJcblxyXG4gICAgICAgICAgc2NvcGUuZG9sbHlPdXQoKTtcclxuXHJcbiAgICAgICAgfSBlbHNlIHtcclxuXHJcbiAgICAgICAgICBzY29wZS5kb2xseUluKCk7XHJcblxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgZG9sbHlTdGFydC5jb3B5KCBkb2xseUVuZCApO1xyXG4gICAgICAgIGJyZWFrO1xyXG5cclxuICAgICAgY2FzZSAzOiAvLyB0aHJlZS1maW5nZXJlZCB0b3VjaDogcGFuXHJcbiAgICAgICAgaWYgKCBzY29wZS5ub1BhbiA9PT0gdHJ1ZSApIHsgcmV0dXJuOyB9XHJcbiAgICAgICAgaWYgKCBzdGF0ZSAhPT0gU1RBVEUuVE9VQ0hfUEFOICkgeyByZXR1cm47IH1cclxuXHJcbiAgICAgICAgcGFuRW5kLnNldCggZXZlbnQudG91Y2hlc1sgMCBdLnBhZ2VYLCBldmVudC50b3VjaGVzWyAwIF0ucGFnZVkgKTtcclxuICAgICAgICBwYW5EZWx0YS5zdWJWZWN0b3JzKCBwYW5FbmQsIHBhblN0YXJ0ICk7XHJcblxyXG4gICAgICAgIHNjb3BlLnBhbiggcGFuRGVsdGEgKTtcclxuXHJcbiAgICAgICAgcGFuU3RhcnQuY29weSggcGFuRW5kICk7XHJcbiAgICAgICAgYnJlYWs7XHJcblxyXG4gICAgICBkZWZhdWx0OlxyXG4gICAgICAgIHN0YXRlID0gU1RBVEUuTk9ORTtcclxuXHJcbiAgICB9XHJcblxyXG4gIH1cclxuXHJcbiAgZnVuY3Rpb24gdG91Y2hlbmQoIC8qIGV2ZW50ICovICkge1xyXG5cclxuICAgIGlmICggc2NvcGUuZW5hYmxlZCA9PT0gZmFsc2UgKSB7IHJldHVybjsgfVxyXG5cclxuICAgIHN0YXRlID0gU1RBVEUuTk9ORTtcclxuICB9XHJcblxyXG4gIHRoaXMuZG9tRWxlbWVudC5hZGRFdmVudExpc3RlbmVyKCAnY29udGV4dG1lbnUnLCBmdW5jdGlvbiAoIGV2ZW50ICkgeyBldmVudC5wcmV2ZW50RGVmYXVsdCgpOyB9LCBmYWxzZSApO1xyXG4gIHRoaXMubG9jYWxFbGVtZW50LmFkZEV2ZW50TGlzdGVuZXIoICdtb3VzZWRvd24nLCBvbk1vdXNlRG93biwgZmFsc2UgKTtcclxuICB0aGlzLmRvbUVsZW1lbnQuYWRkRXZlbnRMaXN0ZW5lciggJ21vdXNld2hlZWwnLCBvbk1vdXNlV2hlZWwsIGZhbHNlICk7XHJcbiAgdGhpcy5kb21FbGVtZW50LmFkZEV2ZW50TGlzdGVuZXIoICdET01Nb3VzZVNjcm9sbCcsIG9uTW91c2VXaGVlbCwgZmFsc2UgKTsgLy8gZmlyZWZveFxyXG5cclxuICB0aGlzLmRvbUVsZW1lbnQuYWRkRXZlbnRMaXN0ZW5lciggJ2tleWRvd24nLCBvbktleURvd24sIGZhbHNlICk7XHJcblxyXG4gIHRoaXMubG9jYWxFbGVtZW50LmFkZEV2ZW50TGlzdGVuZXIoICd0b3VjaHN0YXJ0JywgdG91Y2hzdGFydCwgZmFsc2UgKTtcclxuICB0aGlzLmRvbUVsZW1lbnQuYWRkRXZlbnRMaXN0ZW5lciggJ3RvdWNoZW5kJywgdG91Y2hlbmQsIGZhbHNlICk7XHJcbiAgdGhpcy5kb21FbGVtZW50LmFkZEV2ZW50TGlzdGVuZXIoICd0b3VjaG1vdmUnLCB0b3VjaG1vdmUsIGZhbHNlICk7XHJcblxyXG59O1xyXG5cclxuVEhSRUUuT3JiaXRDb250cm9scy5wcm90b3R5cGUgPSBPYmplY3QuY3JlYXRlKCBUSFJFRS5FdmVudERpc3BhdGNoZXIucHJvdG90eXBlICk7Il0sImZpbGUiOiJsaWJzL29yYml0Q29udHJvbHMuanMifQ==
