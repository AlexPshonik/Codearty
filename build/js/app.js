// Typing text
let TxtType = function(el, toRotate, period) {
  this.toRotate = toRotate;
  this.el = el;
  this.loopNum = 0;
  this.period = parseInt(period, 10) || 2000;
  this.txt = 'We build ';
  this.tick();
  this.isDeleting = false;
};
TxtType.prototype.tick = function() {
  let i = this.loopNum % this.toRotate.length;

  let fullTxt = this.toRotate[i];

  if (this.isDeleting) {
    this.txt = fullTxt.substring(0, this.txt.length - 1);
  } else {
    this.txt = fullTxt.substring(0, this.txt.length + 1);
  }

  this.el.innerHTML = 'We build' + '<br> ' + '&ensp;' + '<span class="wrap">'+this.txt+'</span>';

  let that = this;
  let delta = 200 - Math.random() * 100;

  if (this.isDeleting) { delta /= 2; }

  if (!this.isDeleting && this.txt === fullTxt) {
    delta = this.period;
    this.isDeleting = true;
  } else if (this.isDeleting && this.txt === '') {
    this.isDeleting = false;
    this.loopNum++;
    delta = 500;
  }

  setTimeout(function() {
    that.tick();
  }, delta);
};
$(document).ready(function() {
  var element = document.getElementsByClassName('js-typed-text');
  var toRotate = element[0].getAttribute('data-type');
  var period = element[0].getAttribute('data-period');
  if (toRotate) {
    new TxtType(element[0], JSON.parse(toRotate), period);
  }
});
// Popup animation
$('.js-show-popup').on('click', function () {
  anime({
    targets: '.pop-up',
    translateY: 0,
    opacity: 1,
    easing: 'linear',
    duration: 500
  });
  anime({
    targets: '.list-form .list-form__field',
    translateY: 0,
    opacity: 1,
    easing: 'linear',
    duration: 500,
    delay: 500
  });
  anime({
    targets: '.list-form .btn',
    translateY: 0,
    opacity: 1,
    easing: 'linear',
    duration: 500,
    delay: 1000
  });
});
$('.js-popup-close').on('click', function () {
  anime({
    targets: '.pop-up',
    translateY: '-100%',
    opacity: 0,
    easing: 'linear',
    duration: 500
  });
  anime({
    targets: '.list-form .list-form__field',
    translateY: -150,
    opacity: 0.4,
    easing: 'linear',
    duration: 500
  });
  anime({
    targets: '.list-form .btn',
    translateY: 50,
    opacity: 0,
    easing: 'linear',
    duration: 500
  });
});
$(document).ready(function () {
  $('.pop-up').css('transform', 'translateY(-100%)');
  $('.pop-up').css('opacity', '1');
  $('.list-form .list-form__field').each(function () {
    $(this).css('transform', 'translateY(-150px)');
    $(this).css('opacity', '0.4');
  });
  $('.list-form .btn').css('transform', 'translateY(150px)');
  $('.list-form .btn').css('opacity', '0');
});
// Field label animation
$(document).ready(function () {
  $('.list-form .list-form__label').each(function () {
    $(this).css('transform', 'translateY(14px)');
    $(this).css('font-size', '16px')
  });
});
$('.list-form .list-form__input').focus(function () {
  $(this).parent().addClass('focused');
  anime({
    targets: '.list-form__field.focused .list-form__label',
    translateY: '-12px',
    fontSize: 12,
    easing: 'linear',
    duration: 200
  });
});
$('.list-form .list-form__input').focusout(function () {
  if($(this).val()) {
    $(this).parent().addClass('fill');
  }
  else {
    anime({
      targets: '.list-form__field.focused .list-form__label',
      translateY: '14px',
      fontSize: 16,
      easing: 'linear',
      duration: 200
    });
    if($(this).parent().hasClass('fill')) {
      $(this).parent().removeClass('fill')
    }
  }
  $(this).parent().removeClass('focused');
});
// Homepage bg animation
var mContainer;
var mCamera, mRenderer;
var mControls;
var mScene;
var mParticleCount = 8000;
var mParticleSystem;
var mTime = 0.0;
var mTimeStep = (1/270);
var mDuration = 20;

window.onload = function () {
  init();
};

function init() {
  initTHREE();
  initControls();
  initParticleSystem();

  requestAnimationFrame(tick);
  window.addEventListener('resize', resize, false);
}
function initTHREE() {
  mRenderer = new THREE.WebGLRenderer({antialias: true});
  mRenderer.setSize(window.innerWidth, window.innerHeight);
  mRenderer.setClearColor(0x304ffe);

  mContainer = document.getElementById('homepage-bg-animation');
  mContainer.appendChild(mRenderer.domElement);

  mCamera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 0.1, 5000);
  mCamera.position.set(-1300, 0, 0);

  mScene = new THREE.Scene();

  var light;

  light = new THREE.AmbientLight(0xffffff);
  mScene.add(light);
}
function initControls() {
  mControls = new THREE.OrbitControls(mCamera, mRenderer.domElement);
}
function initParticleSystem() {
  var prefabGeometry = new THREE.PlaneGeometry(4, 4);
  var bufferGeometry = new THREE.BAS.PrefabBufferGeometry(prefabGeometry, mParticleCount);

  bufferGeometry.computeVertexNormals();

  // generate additional geometry data
  var aOffset = bufferGeometry.createAttribute('aOffset', 1);
  var aStartPosition = bufferGeometry.createAttribute('aStartPosition', 3);
  var aControlPoint1 = bufferGeometry.createAttribute('aControlPoint1', 3);
  var aControlPoint2 = bufferGeometry.createAttribute('aControlPoint2', 3);
  var aEndPosition = bufferGeometry.createAttribute('aEndPosition', 3);
  var aAxisAngle = bufferGeometry.createAttribute('aAxisAngle', 4);
  var aColor = bufferGeometry.createAttribute('color', 3);

  var i, j, offset;

  // buffer time offset
  var delay;

  for (i = 0, offset = 0; i < mParticleCount; i++) {
    delay = i / mParticleCount * mDuration;

    for (j = 0; j < prefabGeometry.vertices.length; j++) {
      aOffset.array[offset++] = delay;
    }
  }

  // buffer start positions
  var x, y, z;

  for (i = 0, offset = 0; i < mParticleCount; i++) {
    x = 0;
    y = 1000;
    z = 0;

    for (j = 0; j < prefabGeometry.vertices.length; j++) {
      aStartPosition.array[offset++] = x;
      aStartPosition.array[offset++] = y;
      aStartPosition.array[offset++] = z;
    }
  }

  // buffer control points

  for (i = 0, offset = 0; i < mParticleCount; i++) {
    x = THREE.Math.randFloat(-400, 400);
    y = THREE.Math.randFloat(400, 600);
    z = THREE.Math.randFloat(-1800, -400);

    for (j = 0; j < prefabGeometry.vertices.length; j++) {
      aControlPoint1.array[offset++] = x;
      aControlPoint1.array[offset++] = y;
      aControlPoint1.array[offset++] = z;
    }
  }

  for (i = 0, offset = 0; i < mParticleCount; i++) {
    x = THREE.Math.randFloat(-400, 400);
    y = THREE.Math.randFloat(-600, -400);
    z = THREE.Math.randFloat(400, 1800);

    for (j = 0; j < prefabGeometry.vertices.length; j++) {
      aControlPoint2.array[offset++] = x;
      aControlPoint2.array[offset++] = y;
      aControlPoint2.array[offset++] = z;
    }
  }

  // buffer end positions

  for (i = 0, offset = 0; i < mParticleCount; i++) {
    x = 0;
    y = -1000;
    z = 0;

    for (j = 0; j < prefabGeometry.vertices.length; j++) {
      aEndPosition.array[offset++] = x;
      aEndPosition.array[offset++] = y;
      aEndPosition.array[offset++] = z;
    }
  }

  // buffer axis angle
  var axis = new THREE.Vector3();
  var angle = 0;

  for (i = 0, offset = 0; i < mParticleCount; i++) {
    axis.x = THREE.Math.randFloatSpread(2);
    axis.y = THREE.Math.randFloatSpread(2);
    axis.z = THREE.Math.randFloatSpread(2);
    axis.normalize();

    angle = Math.PI * THREE.Math.randInt(16, 32);

    for (j = 0; j < prefabGeometry.vertices.length; j++) {
      aAxisAngle.array[offset++] = axis.x;
      aAxisAngle.array[offset++] = axis.y;
      aAxisAngle.array[offset++] = axis.z;
      aAxisAngle.array[offset++] = angle;
    }
  }

  // buffer color
  var color = new THREE.Color();
  var h, s, l;

  for (i = 0, offset = 0; i < mParticleCount; i++) {
    h = 0;
    s = 0;
    l = 0;

    color.setHSL(h, s, l);

    for (j = 0; j < prefabGeometry.vertices.length; j++) {
      aColor.array[offset++] = color.r;
      aColor.array[offset++] = color.g;
      aColor.array[offset++] = color.b;
    }
  }

  var material = new THREE.BAS.PhongAnimationMaterial(
    // custom parameters & THREE.MeshPhongMaterial parameters
    {
      vertexColors: THREE.VertexColors,
      shading: THREE.FlatShading,
      side: THREE.DoubleSide,
      uniforms: {
        uTime: {type: 'f', value: 0},
        uDuration: {type: 'f', value: mDuration}
      },
      shaderFunctions: [
        THREE.BAS.ShaderChunk['quaternion_rotation'],
        THREE.BAS.ShaderChunk['cubic_bezier']
      ],
      shaderParameters: [
        'uniform float uTime;',
        'uniform float uDuration;',
        'attribute float aOffset;',
        'attribute vec3 aStartPosition;',
        'attribute vec3 aControlPoint1;',
        'attribute vec3 aControlPoint2;',
        'attribute vec3 aEndPosition;',
        'attribute vec4 aAxisAngle;'
      ],
      shaderVertexInit: [
        'float tProgress = mod((uTime + aOffset), uDuration) / uDuration;',

        'float angle = aAxisAngle.w * tProgress;',
        'vec4 tQuat = quatFromAxisAngle(aAxisAngle.xyz, angle);'
      ],
      shaderTransformNormal: [
        'objectNormal = rotateVector(tQuat, objectNormal);'
      ],
      shaderTransformPosition: [
        'transformed = rotateVector(tQuat, transformed);',
        'transformed += cubicBezier(aStartPosition, aControlPoint1, aControlPoint2, aEndPosition, tProgress);'
      ]
    },
    // THREE.MeshPhongMaterial uniforms
    {
      specular: 0xff0000,
      shininess: 20
    }
  );
  mParticleSystem = new THREE.Mesh(bufferGeometry, material);
  // because the bounding box of the particle system does not reflect its on-screen size
  // set this to false to prevent the whole thing from disappearing on certain angles
  mParticleSystem.frustumCulled = false;
  mScene.add(mParticleSystem);
}
function tick() {
  update();
  render();

  mTime += mTimeStep;
  mTime %= mDuration;

  requestAnimationFrame(tick);
}
function update() {
  mControls.update();
  mParticleSystem.material.uniforms['uTime'].value = mTime;
}
function render() {
  mRenderer.render(mScene, mCamera);
}
function resize() {
  mCamera.aspect = window.innerWidth / window.innerHeight;
  mCamera.updateProjectionMatrix();

  mRenderer.setSize(window.innerWidth, window.innerHeight);
}

/////////////////////////////
// buffer animation system
/////////////////////////////

THREE.BAS = {};
THREE.BAS.ShaderChunk = {};
THREE.BAS.ShaderChunk["animation_time"] = "float tDelay = aAnimation.x;\nfloat tDuration = aAnimation.y;\nfloat tTime = clamp(uTime - tDelay, 0.0, tDuration);\nfloat tProgress = ease(tTime, 0.0, 1.0, tDuration);\n";
THREE.BAS.ShaderChunk["cubic_bezier"] = "vec3 cubicBezier(vec3 p0, vec3 c0, vec3 c1, vec3 p1, float t)\n{\n    vec3 tp;\n    float tn = 1.0 - t;\n\n    tp.xyz = tn * tn * tn * p0.xyz + 3.0 * tn * tn * t * c0.xyz + 3.0 * tn * t * t * c1.xyz + t * t * t * p1.xyz;\n\n    return tp;\n}\n";
THREE.BAS.ShaderChunk["ease_in_cubic"] = "float ease(float t, float b, float c, float d) {\n  return c*(t/=d)*t*t + b;\n}\n";
THREE.BAS.ShaderChunk["ease_in_quad"] = "float ease(float t, float b, float c, float d) {\n  return c*(t/=d)*t + b;\n}\n";
THREE.BAS.ShaderChunk["ease_out_cubic"] = "float ease(float t, float b, float c, float d) {\n  return c*((t=t/d - 1.0)*t*t + 1.0) + b;\n}\n";
THREE.BAS.ShaderChunk["quaternion_rotation"] = "vec3 rotateVector(vec4 q, vec3 v)\n{\n    return v + 2.0 * cross(q.xyz, cross(q.xyz, v) + q.w * v);\n}\n\nvec4 quatFromAxisAngle(vec3 axis, float angle)\n{\n    float halfAngle = angle * 0.5;\n    return vec4(axis.xyz * sin(halfAngle), cos(halfAngle));\n}\n";

THREE.BAS.PrefabBufferGeometry = function (prefab, count) {
  THREE.BufferGeometry.call(this);

  this.prefabGeometry = prefab;
  this.prefabCount = count;
  this.prefabVertexCount = prefab.vertices.length;

  this.bufferDefaults();
};
THREE.BAS.PrefabBufferGeometry.prototype = Object.create(THREE.BufferGeometry.prototype);
THREE.BAS.PrefabBufferGeometry.prototype.constructor = THREE.BAS.PrefabBufferGeometry;
THREE.BAS.PrefabBufferGeometry.prototype.bufferDefaults = function () {
  var prefabFaceCount = this.prefabGeometry.faces.length;
  var prefabIndexCount = this.prefabGeometry.faces.length * 3;
  var prefabVertexCount = this.prefabVertexCount = this.prefabGeometry.vertices.length;
  var prefabIndices = [];

  for (var h = 0; h < prefabFaceCount; h++) {
    var face = this.prefabGeometry.faces[h];
    prefabIndices.push(face.a, face.b, face.c);
  }

  var indexBuffer = new Uint32Array(this.prefabCount * prefabIndexCount);
  var positionBuffer = new Float32Array(this.prefabCount * prefabVertexCount * 3);

  this.setIndex(new THREE.BufferAttribute(indexBuffer, 1));
  this.addAttribute('position', new THREE.BufferAttribute(positionBuffer, 3));

  for (var i = 0, offset = 0; i < this.prefabCount; i++) {
    for (var j = 0; j < prefabVertexCount; j++, offset += 3) {
      var prefabVertex = this.prefabGeometry.vertices[j];

      positionBuffer[offset    ] = prefabVertex.x;
      positionBuffer[offset + 1] = prefabVertex.y;
      positionBuffer[offset + 2] = prefabVertex.z;
    }

    for (var k = 0; k < prefabIndexCount; k++) {
      indexBuffer[i * prefabIndexCount + k] = prefabIndices[k] + i * prefabVertexCount;
    }
  }
};

/**
 * based on BufferGeometry.computeVertexNormals
 * calculate vertex normals for a prefab, and repeat the data in the normal buffer
 */
THREE.BAS.PrefabBufferGeometry.prototype.computeVertexNormals = function () {
  var index = this.index;
  var attributes = this.attributes;
  var positions = attributes.position.array;

  if (attributes.normal === undefined) {
    this.addAttribute('normal', new THREE.BufferAttribute(new Float32Array(positions.length), 3));
  }

  var normals = attributes.normal.array;

  var vA, vB, vC,

    pA = new THREE.Vector3(),
    pB = new THREE.Vector3(),
    pC = new THREE.Vector3(),

    cb = new THREE.Vector3(),
    ab = new THREE.Vector3();

  var indices = index.array;
  var prefabIndexCount = this.prefabGeometry.faces.length * 3;

  for (var i = 0; i < prefabIndexCount; i += 3) {
    vA = indices[i + 0] * 3;
    vB = indices[i + 1] * 3;
    vC = indices[i + 2] * 3;

    pA.fromArray(positions, vA);
    pB.fromArray(positions, vB);
    pC.fromArray(positions, vC);

    cb.subVectors(pC, pB);
    ab.subVectors(pA, pB);
    cb.cross(ab);

    normals[vA] += cb.x;
    normals[vA + 1] += cb.y;
    normals[vA + 2] += cb.z;

    normals[vB] += cb.x;
    normals[vB + 1] += cb.y;
    normals[vB + 2] += cb.z;

    normals[vC] += cb.x;
    normals[vC + 1] += cb.y;
    normals[vC + 2] += cb.z;
  }

  for (var j = 1; j < this.prefabCount; j++) {
    for (var k = 0; k < prefabIndexCount; k++) {
      normals[j * prefabIndexCount + k] = normals[k];
    }
  }

  this.normalizeNormals();

  attributes.normal.needsUpdate = true;
};
THREE.BAS.PrefabBufferGeometry.prototype.createAttribute = function (name, itemSize) {
  var buffer = new Float32Array(this.prefabCount * this.prefabVertexCount * itemSize);
  var attribute = new THREE.BufferAttribute(buffer, itemSize);

  this.addAttribute(name, attribute);

  return attribute;
};
THREE.BAS.PrefabBufferGeometry.prototype.setAttribute4 = function (name, data) {
  var offset = 0;
  var array = this.geometry.attributes[name].array;
  var i, j;

  for (i = 0; i < data.length; i++) {
    var v = data[i];

    for (j = 0; j < this.prefabVertexCount; j++) {
      array[offset++] = v.x;
      array[offset++] = v.y;
      array[offset++] = v.z;
      array[offset++] = v.w;
    }
  }

  this.geometry.attributes[name].needsUpdate = true;
};
THREE.BAS.PrefabBufferGeometry.prototype.setAttribute3 = function (name, data) {
  var offset = 0;
  var array = this.geometry.attributes[name].array;
  var i, j;

  for (i = 0; i < data.length; i++) {
    var v = data[i];

    for (j = 0; j < this.prefabVertexCount; j++) {
      array[offset++] = v.x;
      array[offset++] = v.y;
      array[offset++] = v.z;
    }
  }

  this.geometry.attributes[name].needsUpdate = true;
};
THREE.BAS.PrefabBufferGeometry.prototype.setAttribute2 = function (name, data) {
  var offset = 0;
  var array = this.geometry.attributes[name].array;
  var i, j;

  for (i = 0; i < this.prefabCount; i++) {
    var v = data[i];

    for (j = 0; j < this.prefabVertexCount; j++) {
      array[offset++] = v.x;
      array[offset++] = v.y;
    }
  }

  this.geometry.attributes[name].needsUpdate = true;
};

THREE.BAS.BaseAnimationMaterial = function(parameters) {
  THREE.ShaderMaterial.call(this);

  this.shaderFunctions = [];
  this.shaderParameters = [];
  this.shaderVertexInit = [];
  this.shaderTransformNormal = [];
  this.shaderTransformPosition = [];

  this.setValues(parameters);
};
THREE.BAS.BaseAnimationMaterial.prototype = Object.create(THREE.ShaderMaterial.prototype);
THREE.BAS.BaseAnimationMaterial.prototype.constructor = THREE.BAS.BaseAnimationMaterial;

// abstract
THREE.BAS.BaseAnimationMaterial.prototype._concatVertexShader = function() {
  return '';
};
THREE.BAS.BaseAnimationMaterial.prototype._concatFunctions = function() {
  return this.shaderFunctions.join('\n');
};
THREE.BAS.BaseAnimationMaterial.prototype._concatParameters = function() {
  return this.shaderParameters.join('\n');
};
THREE.BAS.BaseAnimationMaterial.prototype._concatVertexInit = function() {
  return this.shaderVertexInit.join('\n');
};
THREE.BAS.BaseAnimationMaterial.prototype._concatTransformNormal = function() {
  return this.shaderTransformNormal.join('\n');
};
THREE.BAS.BaseAnimationMaterial.prototype._concatTransformPosition = function() {
  return this.shaderTransformPosition.join('\n');
};
THREE.BAS.BaseAnimationMaterial.prototype.setUniformValues = function(values) {
  for (var key in values) {
    if (key in this.uniforms) {
      var uniform = this.uniforms[key];
      var value = values[key];

      // todo add matrix uniform types
      switch (uniform.type) {
        case 'c': // color
          uniform.value.set(value);
          break;
        case 'v2': // vectors
        case 'v3':
        case 'v4':
          uniform.value.copy(value);
          break;
        case 'f': // float
        case 't': // texture
          uniform.value = value;
      }
    }
  }
};

THREE.BAS.PhongAnimationMaterial = function(parameters, uniformValues) {
  THREE.BAS.BaseAnimationMaterial.call(this, parameters);

  var phongShader = THREE.ShaderLib['phong'];

  this.uniforms = THREE.UniformsUtils.merge([phongShader.uniforms, this.uniforms]);
  this.lights = true;
  this.vertexShader = this._concatVertexShader();
  this.fragmentShader = phongShader.fragmentShader;

  // todo add missing default defines
  uniformValues.map && (this.defines['USE_MAP'] = '');
  uniformValues.normalMap && (this.defines['USE_NORMALMAP'] = '');

  this.setUniformValues(uniformValues);
};
THREE.BAS.PhongAnimationMaterial.prototype = Object.create(THREE.BAS.BaseAnimationMaterial.prototype);
THREE.BAS.PhongAnimationMaterial.prototype.constructor = THREE.BAS.PhongAnimationMaterial;
THREE.BAS.PhongAnimationMaterial.prototype._concatVertexShader = function() {
  // based on THREE.ShaderLib.phong
  return [
    "#define PHONG",

    "varying vec3 vViewPosition;",

    "#ifndef FLAT_SHADED",

    "	varying vec3 vNormal;",

    "#endif",

    THREE.ShaderChunk[ "common" ],
    THREE.ShaderChunk[ "uv_pars_vertex" ],
    THREE.ShaderChunk[ "uv2_pars_vertex" ],
    THREE.ShaderChunk[ "displacementmap_pars_vertex" ],
    THREE.ShaderChunk[ "envmap_pars_vertex" ],
    THREE.ShaderChunk[ "lights_phong_pars_vertex" ],
    THREE.ShaderChunk[ "color_pars_vertex" ],
    THREE.ShaderChunk[ "morphtarget_pars_vertex" ],
    THREE.ShaderChunk[ "skinning_pars_vertex" ],
    THREE.ShaderChunk[ "shadowmap_pars_vertex" ],
    THREE.ShaderChunk[ "logdepthbuf_pars_vertex" ],

    this._concatFunctions(),

    this._concatParameters(),

    "void main() {",

    this._concatVertexInit(),

    THREE.ShaderChunk[ "uv_vertex" ],
    THREE.ShaderChunk[ "uv2_vertex" ],
    THREE.ShaderChunk[ "color_vertex" ],
    THREE.ShaderChunk[ "beginnormal_vertex" ],

    this._concatTransformNormal(),

    THREE.ShaderChunk[ "morphnormal_vertex" ],
    THREE.ShaderChunk[ "skinbase_vertex" ],
    THREE.ShaderChunk[ "skinnormal_vertex" ],
    THREE.ShaderChunk[ "defaultnormal_vertex" ],

    "#ifndef FLAT_SHADED", // Normal computed with derivatives when FLAT_SHADED

    "	vNormal = normalize( transformedNormal );",

    "#endif",

    THREE.ShaderChunk[ "begin_vertex" ],

    this._concatTransformPosition(),

    THREE.ShaderChunk[ "displacementmap_vertex" ],
    THREE.ShaderChunk[ "morphtarget_vertex" ],
    THREE.ShaderChunk[ "skinning_vertex" ],
    THREE.ShaderChunk[ "project_vertex" ],
    THREE.ShaderChunk[ "logdepthbuf_vertex" ],

    "	vViewPosition = - mvPosition.xyz;",

    THREE.ShaderChunk[ "worldpos_vertex" ],
    THREE.ShaderChunk[ "envmap_vertex" ],
    THREE.ShaderChunk[ "lights_phong_vertex" ],
    THREE.ShaderChunk[ "shadowmap_vertex" ],

    "}"

  ].join( "\n" );
};
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiIiwic291cmNlcyI6WyJhcHAuanMiXSwic291cmNlc0NvbnRlbnQiOlsiLy8gVHlwaW5nIHRleHRcclxubGV0IFR4dFR5cGUgPSBmdW5jdGlvbihlbCwgdG9Sb3RhdGUsIHBlcmlvZCkge1xyXG4gIHRoaXMudG9Sb3RhdGUgPSB0b1JvdGF0ZTtcclxuICB0aGlzLmVsID0gZWw7XHJcbiAgdGhpcy5sb29wTnVtID0gMDtcclxuICB0aGlzLnBlcmlvZCA9IHBhcnNlSW50KHBlcmlvZCwgMTApIHx8IDIwMDA7XHJcbiAgdGhpcy50eHQgPSAnV2UgYnVpbGQgJztcclxuICB0aGlzLnRpY2soKTtcclxuICB0aGlzLmlzRGVsZXRpbmcgPSBmYWxzZTtcclxufTtcclxuVHh0VHlwZS5wcm90b3R5cGUudGljayA9IGZ1bmN0aW9uKCkge1xyXG4gIGxldCBpID0gdGhpcy5sb29wTnVtICUgdGhpcy50b1JvdGF0ZS5sZW5ndGg7XHJcblxyXG4gIGxldCBmdWxsVHh0ID0gdGhpcy50b1JvdGF0ZVtpXTtcclxuXHJcbiAgaWYgKHRoaXMuaXNEZWxldGluZykge1xyXG4gICAgdGhpcy50eHQgPSBmdWxsVHh0LnN1YnN0cmluZygwLCB0aGlzLnR4dC5sZW5ndGggLSAxKTtcclxuICB9IGVsc2Uge1xyXG4gICAgdGhpcy50eHQgPSBmdWxsVHh0LnN1YnN0cmluZygwLCB0aGlzLnR4dC5sZW5ndGggKyAxKTtcclxuICB9XHJcblxyXG4gIHRoaXMuZWwuaW5uZXJIVE1MID0gJ1dlIGJ1aWxkJyArICc8YnI+ICcgKyAnJmVuc3A7JyArICc8c3BhbiBjbGFzcz1cIndyYXBcIj4nK3RoaXMudHh0Kyc8L3NwYW4+JztcclxuXHJcbiAgbGV0IHRoYXQgPSB0aGlzO1xyXG4gIGxldCBkZWx0YSA9IDIwMCAtIE1hdGgucmFuZG9tKCkgKiAxMDA7XHJcblxyXG4gIGlmICh0aGlzLmlzRGVsZXRpbmcpIHsgZGVsdGEgLz0gMjsgfVxyXG5cclxuICBpZiAoIXRoaXMuaXNEZWxldGluZyAmJiB0aGlzLnR4dCA9PT0gZnVsbFR4dCkge1xyXG4gICAgZGVsdGEgPSB0aGlzLnBlcmlvZDtcclxuICAgIHRoaXMuaXNEZWxldGluZyA9IHRydWU7XHJcbiAgfSBlbHNlIGlmICh0aGlzLmlzRGVsZXRpbmcgJiYgdGhpcy50eHQgPT09ICcnKSB7XHJcbiAgICB0aGlzLmlzRGVsZXRpbmcgPSBmYWxzZTtcclxuICAgIHRoaXMubG9vcE51bSsrO1xyXG4gICAgZGVsdGEgPSA1MDA7XHJcbiAgfVxyXG5cclxuICBzZXRUaW1lb3V0KGZ1bmN0aW9uKCkge1xyXG4gICAgdGhhdC50aWNrKCk7XHJcbiAgfSwgZGVsdGEpO1xyXG59O1xyXG4kKGRvY3VtZW50KS5yZWFkeShmdW5jdGlvbigpIHtcclxuICB2YXIgZWxlbWVudCA9IGRvY3VtZW50LmdldEVsZW1lbnRzQnlDbGFzc05hbWUoJ2pzLXR5cGVkLXRleHQnKTtcclxuICB2YXIgdG9Sb3RhdGUgPSBlbGVtZW50WzBdLmdldEF0dHJpYnV0ZSgnZGF0YS10eXBlJyk7XHJcbiAgdmFyIHBlcmlvZCA9IGVsZW1lbnRbMF0uZ2V0QXR0cmlidXRlKCdkYXRhLXBlcmlvZCcpO1xyXG4gIGlmICh0b1JvdGF0ZSkge1xyXG4gICAgbmV3IFR4dFR5cGUoZWxlbWVudFswXSwgSlNPTi5wYXJzZSh0b1JvdGF0ZSksIHBlcmlvZCk7XHJcbiAgfVxyXG59KTtcclxuLy8gUG9wdXAgYW5pbWF0aW9uXHJcbiQoJy5qcy1zaG93LXBvcHVwJykub24oJ2NsaWNrJywgZnVuY3Rpb24gKCkge1xyXG4gIGFuaW1lKHtcclxuICAgIHRhcmdldHM6ICcucG9wLXVwJyxcclxuICAgIHRyYW5zbGF0ZVk6IDAsXHJcbiAgICBvcGFjaXR5OiAxLFxyXG4gICAgZWFzaW5nOiAnbGluZWFyJyxcclxuICAgIGR1cmF0aW9uOiA1MDBcclxuICB9KTtcclxuICBhbmltZSh7XHJcbiAgICB0YXJnZXRzOiAnLmxpc3QtZm9ybSAubGlzdC1mb3JtX19maWVsZCcsXHJcbiAgICB0cmFuc2xhdGVZOiAwLFxyXG4gICAgb3BhY2l0eTogMSxcclxuICAgIGVhc2luZzogJ2xpbmVhcicsXHJcbiAgICBkdXJhdGlvbjogNTAwLFxyXG4gICAgZGVsYXk6IDUwMFxyXG4gIH0pO1xyXG4gIGFuaW1lKHtcclxuICAgIHRhcmdldHM6ICcubGlzdC1mb3JtIC5idG4nLFxyXG4gICAgdHJhbnNsYXRlWTogMCxcclxuICAgIG9wYWNpdHk6IDEsXHJcbiAgICBlYXNpbmc6ICdsaW5lYXInLFxyXG4gICAgZHVyYXRpb246IDUwMCxcclxuICAgIGRlbGF5OiAxMDAwXHJcbiAgfSk7XHJcbn0pO1xyXG4kKCcuanMtcG9wdXAtY2xvc2UnKS5vbignY2xpY2snLCBmdW5jdGlvbiAoKSB7XHJcbiAgYW5pbWUoe1xyXG4gICAgdGFyZ2V0czogJy5wb3AtdXAnLFxyXG4gICAgdHJhbnNsYXRlWTogJy0xMDAlJyxcclxuICAgIG9wYWNpdHk6IDAsXHJcbiAgICBlYXNpbmc6ICdsaW5lYXInLFxyXG4gICAgZHVyYXRpb246IDUwMFxyXG4gIH0pO1xyXG4gIGFuaW1lKHtcclxuICAgIHRhcmdldHM6ICcubGlzdC1mb3JtIC5saXN0LWZvcm1fX2ZpZWxkJyxcclxuICAgIHRyYW5zbGF0ZVk6IC0xNTAsXHJcbiAgICBvcGFjaXR5OiAwLjQsXHJcbiAgICBlYXNpbmc6ICdsaW5lYXInLFxyXG4gICAgZHVyYXRpb246IDUwMFxyXG4gIH0pO1xyXG4gIGFuaW1lKHtcclxuICAgIHRhcmdldHM6ICcubGlzdC1mb3JtIC5idG4nLFxyXG4gICAgdHJhbnNsYXRlWTogNTAsXHJcbiAgICBvcGFjaXR5OiAwLFxyXG4gICAgZWFzaW5nOiAnbGluZWFyJyxcclxuICAgIGR1cmF0aW9uOiA1MDBcclxuICB9KTtcclxufSk7XHJcbiQoZG9jdW1lbnQpLnJlYWR5KGZ1bmN0aW9uICgpIHtcclxuICAkKCcucG9wLXVwJykuY3NzKCd0cmFuc2Zvcm0nLCAndHJhbnNsYXRlWSgtMTAwJSknKTtcclxuICAkKCcucG9wLXVwJykuY3NzKCdvcGFjaXR5JywgJzEnKTtcclxuICAkKCcubGlzdC1mb3JtIC5saXN0LWZvcm1fX2ZpZWxkJykuZWFjaChmdW5jdGlvbiAoKSB7XHJcbiAgICAkKHRoaXMpLmNzcygndHJhbnNmb3JtJywgJ3RyYW5zbGF0ZVkoLTE1MHB4KScpO1xyXG4gICAgJCh0aGlzKS5jc3MoJ29wYWNpdHknLCAnMC40Jyk7XHJcbiAgfSk7XHJcbiAgJCgnLmxpc3QtZm9ybSAuYnRuJykuY3NzKCd0cmFuc2Zvcm0nLCAndHJhbnNsYXRlWSgxNTBweCknKTtcclxuICAkKCcubGlzdC1mb3JtIC5idG4nKS5jc3MoJ29wYWNpdHknLCAnMCcpO1xyXG59KTtcclxuLy8gRmllbGQgbGFiZWwgYW5pbWF0aW9uXHJcbiQoZG9jdW1lbnQpLnJlYWR5KGZ1bmN0aW9uICgpIHtcclxuICAkKCcubGlzdC1mb3JtIC5saXN0LWZvcm1fX2xhYmVsJykuZWFjaChmdW5jdGlvbiAoKSB7XHJcbiAgICAkKHRoaXMpLmNzcygndHJhbnNmb3JtJywgJ3RyYW5zbGF0ZVkoMTRweCknKTtcclxuICAgICQodGhpcykuY3NzKCdmb250LXNpemUnLCAnMTZweCcpXHJcbiAgfSk7XHJcbn0pO1xyXG4kKCcubGlzdC1mb3JtIC5saXN0LWZvcm1fX2lucHV0JykuZm9jdXMoZnVuY3Rpb24gKCkge1xyXG4gICQodGhpcykucGFyZW50KCkuYWRkQ2xhc3MoJ2ZvY3VzZWQnKTtcclxuICBhbmltZSh7XHJcbiAgICB0YXJnZXRzOiAnLmxpc3QtZm9ybV9fZmllbGQuZm9jdXNlZCAubGlzdC1mb3JtX19sYWJlbCcsXHJcbiAgICB0cmFuc2xhdGVZOiAnLTEycHgnLFxyXG4gICAgZm9udFNpemU6IDEyLFxyXG4gICAgZWFzaW5nOiAnbGluZWFyJyxcclxuICAgIGR1cmF0aW9uOiAyMDBcclxuICB9KTtcclxufSk7XHJcbiQoJy5saXN0LWZvcm0gLmxpc3QtZm9ybV9faW5wdXQnKS5mb2N1c291dChmdW5jdGlvbiAoKSB7XHJcbiAgaWYoJCh0aGlzKS52YWwoKSkge1xyXG4gICAgJCh0aGlzKS5wYXJlbnQoKS5hZGRDbGFzcygnZmlsbCcpO1xyXG4gIH1cclxuICBlbHNlIHtcclxuICAgIGFuaW1lKHtcclxuICAgICAgdGFyZ2V0czogJy5saXN0LWZvcm1fX2ZpZWxkLmZvY3VzZWQgLmxpc3QtZm9ybV9fbGFiZWwnLFxyXG4gICAgICB0cmFuc2xhdGVZOiAnMTRweCcsXHJcbiAgICAgIGZvbnRTaXplOiAxNixcclxuICAgICAgZWFzaW5nOiAnbGluZWFyJyxcclxuICAgICAgZHVyYXRpb246IDIwMFxyXG4gICAgfSk7XHJcbiAgICBpZigkKHRoaXMpLnBhcmVudCgpLmhhc0NsYXNzKCdmaWxsJykpIHtcclxuICAgICAgJCh0aGlzKS5wYXJlbnQoKS5yZW1vdmVDbGFzcygnZmlsbCcpXHJcbiAgICB9XHJcbiAgfVxyXG4gICQodGhpcykucGFyZW50KCkucmVtb3ZlQ2xhc3MoJ2ZvY3VzZWQnKTtcclxufSk7XHJcbi8vIEhvbWVwYWdlIGJnIGFuaW1hdGlvblxyXG52YXIgbUNvbnRhaW5lcjtcclxudmFyIG1DYW1lcmEsIG1SZW5kZXJlcjtcclxudmFyIG1Db250cm9scztcclxudmFyIG1TY2VuZTtcclxudmFyIG1QYXJ0aWNsZUNvdW50ID0gODAwMDtcclxudmFyIG1QYXJ0aWNsZVN5c3RlbTtcclxudmFyIG1UaW1lID0gMC4wO1xyXG52YXIgbVRpbWVTdGVwID0gKDEvMjcwKTtcclxudmFyIG1EdXJhdGlvbiA9IDIwO1xyXG5cclxud2luZG93Lm9ubG9hZCA9IGZ1bmN0aW9uICgpIHtcclxuICBpbml0KCk7XHJcbn07XHJcblxyXG5mdW5jdGlvbiBpbml0KCkge1xyXG4gIGluaXRUSFJFRSgpO1xyXG4gIGluaXRDb250cm9scygpO1xyXG4gIGluaXRQYXJ0aWNsZVN5c3RlbSgpO1xyXG5cclxuICByZXF1ZXN0QW5pbWF0aW9uRnJhbWUodGljayk7XHJcbiAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoJ3Jlc2l6ZScsIHJlc2l6ZSwgZmFsc2UpO1xyXG59XHJcbmZ1bmN0aW9uIGluaXRUSFJFRSgpIHtcclxuICBtUmVuZGVyZXIgPSBuZXcgVEhSRUUuV2ViR0xSZW5kZXJlcih7YW50aWFsaWFzOiB0cnVlfSk7XHJcbiAgbVJlbmRlcmVyLnNldFNpemUod2luZG93LmlubmVyV2lkdGgsIHdpbmRvdy5pbm5lckhlaWdodCk7XHJcbiAgbVJlbmRlcmVyLnNldENsZWFyQ29sb3IoMHgzMDRmZmUpO1xyXG5cclxuICBtQ29udGFpbmVyID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2hvbWVwYWdlLWJnLWFuaW1hdGlvbicpO1xyXG4gIG1Db250YWluZXIuYXBwZW5kQ2hpbGQobVJlbmRlcmVyLmRvbUVsZW1lbnQpO1xyXG5cclxuICBtQ2FtZXJhID0gbmV3IFRIUkVFLlBlcnNwZWN0aXZlQ2FtZXJhKDYwLCB3aW5kb3cuaW5uZXJXaWR0aCAvIHdpbmRvdy5pbm5lckhlaWdodCwgMC4xLCA1MDAwKTtcclxuICBtQ2FtZXJhLnBvc2l0aW9uLnNldCgtMTMwMCwgMCwgMCk7XHJcblxyXG4gIG1TY2VuZSA9IG5ldyBUSFJFRS5TY2VuZSgpO1xyXG5cclxuICB2YXIgbGlnaHQ7XHJcblxyXG4gIGxpZ2h0ID0gbmV3IFRIUkVFLkFtYmllbnRMaWdodCgweGZmZmZmZik7XHJcbiAgbVNjZW5lLmFkZChsaWdodCk7XHJcbn1cclxuZnVuY3Rpb24gaW5pdENvbnRyb2xzKCkge1xyXG4gIG1Db250cm9scyA9IG5ldyBUSFJFRS5PcmJpdENvbnRyb2xzKG1DYW1lcmEsIG1SZW5kZXJlci5kb21FbGVtZW50KTtcclxufVxyXG5mdW5jdGlvbiBpbml0UGFydGljbGVTeXN0ZW0oKSB7XHJcbiAgdmFyIHByZWZhYkdlb21ldHJ5ID0gbmV3IFRIUkVFLlBsYW5lR2VvbWV0cnkoNCwgNCk7XHJcbiAgdmFyIGJ1ZmZlckdlb21ldHJ5ID0gbmV3IFRIUkVFLkJBUy5QcmVmYWJCdWZmZXJHZW9tZXRyeShwcmVmYWJHZW9tZXRyeSwgbVBhcnRpY2xlQ291bnQpO1xyXG5cclxuICBidWZmZXJHZW9tZXRyeS5jb21wdXRlVmVydGV4Tm9ybWFscygpO1xyXG5cclxuICAvLyBnZW5lcmF0ZSBhZGRpdGlvbmFsIGdlb21ldHJ5IGRhdGFcclxuICB2YXIgYU9mZnNldCA9IGJ1ZmZlckdlb21ldHJ5LmNyZWF0ZUF0dHJpYnV0ZSgnYU9mZnNldCcsIDEpO1xyXG4gIHZhciBhU3RhcnRQb3NpdGlvbiA9IGJ1ZmZlckdlb21ldHJ5LmNyZWF0ZUF0dHJpYnV0ZSgnYVN0YXJ0UG9zaXRpb24nLCAzKTtcclxuICB2YXIgYUNvbnRyb2xQb2ludDEgPSBidWZmZXJHZW9tZXRyeS5jcmVhdGVBdHRyaWJ1dGUoJ2FDb250cm9sUG9pbnQxJywgMyk7XHJcbiAgdmFyIGFDb250cm9sUG9pbnQyID0gYnVmZmVyR2VvbWV0cnkuY3JlYXRlQXR0cmlidXRlKCdhQ29udHJvbFBvaW50MicsIDMpO1xyXG4gIHZhciBhRW5kUG9zaXRpb24gPSBidWZmZXJHZW9tZXRyeS5jcmVhdGVBdHRyaWJ1dGUoJ2FFbmRQb3NpdGlvbicsIDMpO1xyXG4gIHZhciBhQXhpc0FuZ2xlID0gYnVmZmVyR2VvbWV0cnkuY3JlYXRlQXR0cmlidXRlKCdhQXhpc0FuZ2xlJywgNCk7XHJcbiAgdmFyIGFDb2xvciA9IGJ1ZmZlckdlb21ldHJ5LmNyZWF0ZUF0dHJpYnV0ZSgnY29sb3InLCAzKTtcclxuXHJcbiAgdmFyIGksIGosIG9mZnNldDtcclxuXHJcbiAgLy8gYnVmZmVyIHRpbWUgb2Zmc2V0XHJcbiAgdmFyIGRlbGF5O1xyXG5cclxuICBmb3IgKGkgPSAwLCBvZmZzZXQgPSAwOyBpIDwgbVBhcnRpY2xlQ291bnQ7IGkrKykge1xyXG4gICAgZGVsYXkgPSBpIC8gbVBhcnRpY2xlQ291bnQgKiBtRHVyYXRpb247XHJcblxyXG4gICAgZm9yIChqID0gMDsgaiA8IHByZWZhYkdlb21ldHJ5LnZlcnRpY2VzLmxlbmd0aDsgaisrKSB7XHJcbiAgICAgIGFPZmZzZXQuYXJyYXlbb2Zmc2V0KytdID0gZGVsYXk7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICAvLyBidWZmZXIgc3RhcnQgcG9zaXRpb25zXHJcbiAgdmFyIHgsIHksIHo7XHJcblxyXG4gIGZvciAoaSA9IDAsIG9mZnNldCA9IDA7IGkgPCBtUGFydGljbGVDb3VudDsgaSsrKSB7XHJcbiAgICB4ID0gMDtcclxuICAgIHkgPSAxMDAwO1xyXG4gICAgeiA9IDA7XHJcblxyXG4gICAgZm9yIChqID0gMDsgaiA8IHByZWZhYkdlb21ldHJ5LnZlcnRpY2VzLmxlbmd0aDsgaisrKSB7XHJcbiAgICAgIGFTdGFydFBvc2l0aW9uLmFycmF5W29mZnNldCsrXSA9IHg7XHJcbiAgICAgIGFTdGFydFBvc2l0aW9uLmFycmF5W29mZnNldCsrXSA9IHk7XHJcbiAgICAgIGFTdGFydFBvc2l0aW9uLmFycmF5W29mZnNldCsrXSA9IHo7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICAvLyBidWZmZXIgY29udHJvbCBwb2ludHNcclxuXHJcbiAgZm9yIChpID0gMCwgb2Zmc2V0ID0gMDsgaSA8IG1QYXJ0aWNsZUNvdW50OyBpKyspIHtcclxuICAgIHggPSBUSFJFRS5NYXRoLnJhbmRGbG9hdCgtNDAwLCA0MDApO1xyXG4gICAgeSA9IFRIUkVFLk1hdGgucmFuZEZsb2F0KDQwMCwgNjAwKTtcclxuICAgIHogPSBUSFJFRS5NYXRoLnJhbmRGbG9hdCgtMTgwMCwgLTQwMCk7XHJcblxyXG4gICAgZm9yIChqID0gMDsgaiA8IHByZWZhYkdlb21ldHJ5LnZlcnRpY2VzLmxlbmd0aDsgaisrKSB7XHJcbiAgICAgIGFDb250cm9sUG9pbnQxLmFycmF5W29mZnNldCsrXSA9IHg7XHJcbiAgICAgIGFDb250cm9sUG9pbnQxLmFycmF5W29mZnNldCsrXSA9IHk7XHJcbiAgICAgIGFDb250cm9sUG9pbnQxLmFycmF5W29mZnNldCsrXSA9IHo7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBmb3IgKGkgPSAwLCBvZmZzZXQgPSAwOyBpIDwgbVBhcnRpY2xlQ291bnQ7IGkrKykge1xyXG4gICAgeCA9IFRIUkVFLk1hdGgucmFuZEZsb2F0KC00MDAsIDQwMCk7XHJcbiAgICB5ID0gVEhSRUUuTWF0aC5yYW5kRmxvYXQoLTYwMCwgLTQwMCk7XHJcbiAgICB6ID0gVEhSRUUuTWF0aC5yYW5kRmxvYXQoNDAwLCAxODAwKTtcclxuXHJcbiAgICBmb3IgKGogPSAwOyBqIDwgcHJlZmFiR2VvbWV0cnkudmVydGljZXMubGVuZ3RoOyBqKyspIHtcclxuICAgICAgYUNvbnRyb2xQb2ludDIuYXJyYXlbb2Zmc2V0KytdID0geDtcclxuICAgICAgYUNvbnRyb2xQb2ludDIuYXJyYXlbb2Zmc2V0KytdID0geTtcclxuICAgICAgYUNvbnRyb2xQb2ludDIuYXJyYXlbb2Zmc2V0KytdID0gejtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIC8vIGJ1ZmZlciBlbmQgcG9zaXRpb25zXHJcblxyXG4gIGZvciAoaSA9IDAsIG9mZnNldCA9IDA7IGkgPCBtUGFydGljbGVDb3VudDsgaSsrKSB7XHJcbiAgICB4ID0gMDtcclxuICAgIHkgPSAtMTAwMDtcclxuICAgIHogPSAwO1xyXG5cclxuICAgIGZvciAoaiA9IDA7IGogPCBwcmVmYWJHZW9tZXRyeS52ZXJ0aWNlcy5sZW5ndGg7IGorKykge1xyXG4gICAgICBhRW5kUG9zaXRpb24uYXJyYXlbb2Zmc2V0KytdID0geDtcclxuICAgICAgYUVuZFBvc2l0aW9uLmFycmF5W29mZnNldCsrXSA9IHk7XHJcbiAgICAgIGFFbmRQb3NpdGlvbi5hcnJheVtvZmZzZXQrK10gPSB6O1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgLy8gYnVmZmVyIGF4aXMgYW5nbGVcclxuICB2YXIgYXhpcyA9IG5ldyBUSFJFRS5WZWN0b3IzKCk7XHJcbiAgdmFyIGFuZ2xlID0gMDtcclxuXHJcbiAgZm9yIChpID0gMCwgb2Zmc2V0ID0gMDsgaSA8IG1QYXJ0aWNsZUNvdW50OyBpKyspIHtcclxuICAgIGF4aXMueCA9IFRIUkVFLk1hdGgucmFuZEZsb2F0U3ByZWFkKDIpO1xyXG4gICAgYXhpcy55ID0gVEhSRUUuTWF0aC5yYW5kRmxvYXRTcHJlYWQoMik7XHJcbiAgICBheGlzLnogPSBUSFJFRS5NYXRoLnJhbmRGbG9hdFNwcmVhZCgyKTtcclxuICAgIGF4aXMubm9ybWFsaXplKCk7XHJcblxyXG4gICAgYW5nbGUgPSBNYXRoLlBJICogVEhSRUUuTWF0aC5yYW5kSW50KDE2LCAzMik7XHJcblxyXG4gICAgZm9yIChqID0gMDsgaiA8IHByZWZhYkdlb21ldHJ5LnZlcnRpY2VzLmxlbmd0aDsgaisrKSB7XHJcbiAgICAgIGFBeGlzQW5nbGUuYXJyYXlbb2Zmc2V0KytdID0gYXhpcy54O1xyXG4gICAgICBhQXhpc0FuZ2xlLmFycmF5W29mZnNldCsrXSA9IGF4aXMueTtcclxuICAgICAgYUF4aXNBbmdsZS5hcnJheVtvZmZzZXQrK10gPSBheGlzLno7XHJcbiAgICAgIGFBeGlzQW5nbGUuYXJyYXlbb2Zmc2V0KytdID0gYW5nbGU7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICAvLyBidWZmZXIgY29sb3JcclxuICB2YXIgY29sb3IgPSBuZXcgVEhSRUUuQ29sb3IoKTtcclxuICB2YXIgaCwgcywgbDtcclxuXHJcbiAgZm9yIChpID0gMCwgb2Zmc2V0ID0gMDsgaSA8IG1QYXJ0aWNsZUNvdW50OyBpKyspIHtcclxuICAgIGggPSAwO1xyXG4gICAgcyA9IDA7XHJcbiAgICBsID0gMDtcclxuXHJcbiAgICBjb2xvci5zZXRIU0woaCwgcywgbCk7XHJcblxyXG4gICAgZm9yIChqID0gMDsgaiA8IHByZWZhYkdlb21ldHJ5LnZlcnRpY2VzLmxlbmd0aDsgaisrKSB7XHJcbiAgICAgIGFDb2xvci5hcnJheVtvZmZzZXQrK10gPSBjb2xvci5yO1xyXG4gICAgICBhQ29sb3IuYXJyYXlbb2Zmc2V0KytdID0gY29sb3IuZztcclxuICAgICAgYUNvbG9yLmFycmF5W29mZnNldCsrXSA9IGNvbG9yLmI7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICB2YXIgbWF0ZXJpYWwgPSBuZXcgVEhSRUUuQkFTLlBob25nQW5pbWF0aW9uTWF0ZXJpYWwoXHJcbiAgICAvLyBjdXN0b20gcGFyYW1ldGVycyAmIFRIUkVFLk1lc2hQaG9uZ01hdGVyaWFsIHBhcmFtZXRlcnNcclxuICAgIHtcclxuICAgICAgdmVydGV4Q29sb3JzOiBUSFJFRS5WZXJ0ZXhDb2xvcnMsXHJcbiAgICAgIHNoYWRpbmc6IFRIUkVFLkZsYXRTaGFkaW5nLFxyXG4gICAgICBzaWRlOiBUSFJFRS5Eb3VibGVTaWRlLFxyXG4gICAgICB1bmlmb3Jtczoge1xyXG4gICAgICAgIHVUaW1lOiB7dHlwZTogJ2YnLCB2YWx1ZTogMH0sXHJcbiAgICAgICAgdUR1cmF0aW9uOiB7dHlwZTogJ2YnLCB2YWx1ZTogbUR1cmF0aW9ufVxyXG4gICAgICB9LFxyXG4gICAgICBzaGFkZXJGdW5jdGlvbnM6IFtcclxuICAgICAgICBUSFJFRS5CQVMuU2hhZGVyQ2h1bmtbJ3F1YXRlcm5pb25fcm90YXRpb24nXSxcclxuICAgICAgICBUSFJFRS5CQVMuU2hhZGVyQ2h1bmtbJ2N1YmljX2JlemllciddXHJcbiAgICAgIF0sXHJcbiAgICAgIHNoYWRlclBhcmFtZXRlcnM6IFtcclxuICAgICAgICAndW5pZm9ybSBmbG9hdCB1VGltZTsnLFxyXG4gICAgICAgICd1bmlmb3JtIGZsb2F0IHVEdXJhdGlvbjsnLFxyXG4gICAgICAgICdhdHRyaWJ1dGUgZmxvYXQgYU9mZnNldDsnLFxyXG4gICAgICAgICdhdHRyaWJ1dGUgdmVjMyBhU3RhcnRQb3NpdGlvbjsnLFxyXG4gICAgICAgICdhdHRyaWJ1dGUgdmVjMyBhQ29udHJvbFBvaW50MTsnLFxyXG4gICAgICAgICdhdHRyaWJ1dGUgdmVjMyBhQ29udHJvbFBvaW50MjsnLFxyXG4gICAgICAgICdhdHRyaWJ1dGUgdmVjMyBhRW5kUG9zaXRpb247JyxcclxuICAgICAgICAnYXR0cmlidXRlIHZlYzQgYUF4aXNBbmdsZTsnXHJcbiAgICAgIF0sXHJcbiAgICAgIHNoYWRlclZlcnRleEluaXQ6IFtcclxuICAgICAgICAnZmxvYXQgdFByb2dyZXNzID0gbW9kKCh1VGltZSArIGFPZmZzZXQpLCB1RHVyYXRpb24pIC8gdUR1cmF0aW9uOycsXHJcblxyXG4gICAgICAgICdmbG9hdCBhbmdsZSA9IGFBeGlzQW5nbGUudyAqIHRQcm9ncmVzczsnLFxyXG4gICAgICAgICd2ZWM0IHRRdWF0ID0gcXVhdEZyb21BeGlzQW5nbGUoYUF4aXNBbmdsZS54eXosIGFuZ2xlKTsnXHJcbiAgICAgIF0sXHJcbiAgICAgIHNoYWRlclRyYW5zZm9ybU5vcm1hbDogW1xyXG4gICAgICAgICdvYmplY3ROb3JtYWwgPSByb3RhdGVWZWN0b3IodFF1YXQsIG9iamVjdE5vcm1hbCk7J1xyXG4gICAgICBdLFxyXG4gICAgICBzaGFkZXJUcmFuc2Zvcm1Qb3NpdGlvbjogW1xyXG4gICAgICAgICd0cmFuc2Zvcm1lZCA9IHJvdGF0ZVZlY3Rvcih0UXVhdCwgdHJhbnNmb3JtZWQpOycsXHJcbiAgICAgICAgJ3RyYW5zZm9ybWVkICs9IGN1YmljQmV6aWVyKGFTdGFydFBvc2l0aW9uLCBhQ29udHJvbFBvaW50MSwgYUNvbnRyb2xQb2ludDIsIGFFbmRQb3NpdGlvbiwgdFByb2dyZXNzKTsnXHJcbiAgICAgIF1cclxuICAgIH0sXHJcbiAgICAvLyBUSFJFRS5NZXNoUGhvbmdNYXRlcmlhbCB1bmlmb3Jtc1xyXG4gICAge1xyXG4gICAgICBzcGVjdWxhcjogMHhmZjAwMDAsXHJcbiAgICAgIHNoaW5pbmVzczogMjBcclxuICAgIH1cclxuICApO1xyXG4gIG1QYXJ0aWNsZVN5c3RlbSA9IG5ldyBUSFJFRS5NZXNoKGJ1ZmZlckdlb21ldHJ5LCBtYXRlcmlhbCk7XHJcbiAgLy8gYmVjYXVzZSB0aGUgYm91bmRpbmcgYm94IG9mIHRoZSBwYXJ0aWNsZSBzeXN0ZW0gZG9lcyBub3QgcmVmbGVjdCBpdHMgb24tc2NyZWVuIHNpemVcclxuICAvLyBzZXQgdGhpcyB0byBmYWxzZSB0byBwcmV2ZW50IHRoZSB3aG9sZSB0aGluZyBmcm9tIGRpc2FwcGVhcmluZyBvbiBjZXJ0YWluIGFuZ2xlc1xyXG4gIG1QYXJ0aWNsZVN5c3RlbS5mcnVzdHVtQ3VsbGVkID0gZmFsc2U7XHJcbiAgbVNjZW5lLmFkZChtUGFydGljbGVTeXN0ZW0pO1xyXG59XHJcbmZ1bmN0aW9uIHRpY2soKSB7XHJcbiAgdXBkYXRlKCk7XHJcbiAgcmVuZGVyKCk7XHJcblxyXG4gIG1UaW1lICs9IG1UaW1lU3RlcDtcclxuICBtVGltZSAlPSBtRHVyYXRpb247XHJcblxyXG4gIHJlcXVlc3RBbmltYXRpb25GcmFtZSh0aWNrKTtcclxufVxyXG5mdW5jdGlvbiB1cGRhdGUoKSB7XHJcbiAgbUNvbnRyb2xzLnVwZGF0ZSgpO1xyXG4gIG1QYXJ0aWNsZVN5c3RlbS5tYXRlcmlhbC51bmlmb3Jtc1sndVRpbWUnXS52YWx1ZSA9IG1UaW1lO1xyXG59XHJcbmZ1bmN0aW9uIHJlbmRlcigpIHtcclxuICBtUmVuZGVyZXIucmVuZGVyKG1TY2VuZSwgbUNhbWVyYSk7XHJcbn1cclxuZnVuY3Rpb24gcmVzaXplKCkge1xyXG4gIG1DYW1lcmEuYXNwZWN0ID0gd2luZG93LmlubmVyV2lkdGggLyB3aW5kb3cuaW5uZXJIZWlnaHQ7XHJcbiAgbUNhbWVyYS51cGRhdGVQcm9qZWN0aW9uTWF0cml4KCk7XHJcblxyXG4gIG1SZW5kZXJlci5zZXRTaXplKHdpbmRvdy5pbm5lcldpZHRoLCB3aW5kb3cuaW5uZXJIZWlnaHQpO1xyXG59XHJcblxyXG4vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vL1xyXG4vLyBidWZmZXIgYW5pbWF0aW9uIHN5c3RlbVxyXG4vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vL1xyXG5cclxuVEhSRUUuQkFTID0ge307XHJcblRIUkVFLkJBUy5TaGFkZXJDaHVuayA9IHt9O1xyXG5USFJFRS5CQVMuU2hhZGVyQ2h1bmtbXCJhbmltYXRpb25fdGltZVwiXSA9IFwiZmxvYXQgdERlbGF5ID0gYUFuaW1hdGlvbi54O1xcbmZsb2F0IHREdXJhdGlvbiA9IGFBbmltYXRpb24ueTtcXG5mbG9hdCB0VGltZSA9IGNsYW1wKHVUaW1lIC0gdERlbGF5LCAwLjAsIHREdXJhdGlvbik7XFxuZmxvYXQgdFByb2dyZXNzID0gZWFzZSh0VGltZSwgMC4wLCAxLjAsIHREdXJhdGlvbik7XFxuXCI7XHJcblRIUkVFLkJBUy5TaGFkZXJDaHVua1tcImN1YmljX2JlemllclwiXSA9IFwidmVjMyBjdWJpY0Jlemllcih2ZWMzIHAwLCB2ZWMzIGMwLCB2ZWMzIGMxLCB2ZWMzIHAxLCBmbG9hdCB0KVxcbntcXG4gICAgdmVjMyB0cDtcXG4gICAgZmxvYXQgdG4gPSAxLjAgLSB0O1xcblxcbiAgICB0cC54eXogPSB0biAqIHRuICogdG4gKiBwMC54eXogKyAzLjAgKiB0biAqIHRuICogdCAqIGMwLnh5eiArIDMuMCAqIHRuICogdCAqIHQgKiBjMS54eXogKyB0ICogdCAqIHQgKiBwMS54eXo7XFxuXFxuICAgIHJldHVybiB0cDtcXG59XFxuXCI7XHJcblRIUkVFLkJBUy5TaGFkZXJDaHVua1tcImVhc2VfaW5fY3ViaWNcIl0gPSBcImZsb2F0IGVhc2UoZmxvYXQgdCwgZmxvYXQgYiwgZmxvYXQgYywgZmxvYXQgZCkge1xcbiAgcmV0dXJuIGMqKHQvPWQpKnQqdCArIGI7XFxufVxcblwiO1xyXG5USFJFRS5CQVMuU2hhZGVyQ2h1bmtbXCJlYXNlX2luX3F1YWRcIl0gPSBcImZsb2F0IGVhc2UoZmxvYXQgdCwgZmxvYXQgYiwgZmxvYXQgYywgZmxvYXQgZCkge1xcbiAgcmV0dXJuIGMqKHQvPWQpKnQgKyBiO1xcbn1cXG5cIjtcclxuVEhSRUUuQkFTLlNoYWRlckNodW5rW1wiZWFzZV9vdXRfY3ViaWNcIl0gPSBcImZsb2F0IGVhc2UoZmxvYXQgdCwgZmxvYXQgYiwgZmxvYXQgYywgZmxvYXQgZCkge1xcbiAgcmV0dXJuIGMqKCh0PXQvZCAtIDEuMCkqdCp0ICsgMS4wKSArIGI7XFxufVxcblwiO1xyXG5USFJFRS5CQVMuU2hhZGVyQ2h1bmtbXCJxdWF0ZXJuaW9uX3JvdGF0aW9uXCJdID0gXCJ2ZWMzIHJvdGF0ZVZlY3Rvcih2ZWM0IHEsIHZlYzMgdilcXG57XFxuICAgIHJldHVybiB2ICsgMi4wICogY3Jvc3MocS54eXosIGNyb3NzKHEueHl6LCB2KSArIHEudyAqIHYpO1xcbn1cXG5cXG52ZWM0IHF1YXRGcm9tQXhpc0FuZ2xlKHZlYzMgYXhpcywgZmxvYXQgYW5nbGUpXFxue1xcbiAgICBmbG9hdCBoYWxmQW5nbGUgPSBhbmdsZSAqIDAuNTtcXG4gICAgcmV0dXJuIHZlYzQoYXhpcy54eXogKiBzaW4oaGFsZkFuZ2xlKSwgY29zKGhhbGZBbmdsZSkpO1xcbn1cXG5cIjtcclxuXHJcblRIUkVFLkJBUy5QcmVmYWJCdWZmZXJHZW9tZXRyeSA9IGZ1bmN0aW9uIChwcmVmYWIsIGNvdW50KSB7XHJcbiAgVEhSRUUuQnVmZmVyR2VvbWV0cnkuY2FsbCh0aGlzKTtcclxuXHJcbiAgdGhpcy5wcmVmYWJHZW9tZXRyeSA9IHByZWZhYjtcclxuICB0aGlzLnByZWZhYkNvdW50ID0gY291bnQ7XHJcbiAgdGhpcy5wcmVmYWJWZXJ0ZXhDb3VudCA9IHByZWZhYi52ZXJ0aWNlcy5sZW5ndGg7XHJcblxyXG4gIHRoaXMuYnVmZmVyRGVmYXVsdHMoKTtcclxufTtcclxuVEhSRUUuQkFTLlByZWZhYkJ1ZmZlckdlb21ldHJ5LnByb3RvdHlwZSA9IE9iamVjdC5jcmVhdGUoVEhSRUUuQnVmZmVyR2VvbWV0cnkucHJvdG90eXBlKTtcclxuVEhSRUUuQkFTLlByZWZhYkJ1ZmZlckdlb21ldHJ5LnByb3RvdHlwZS5jb25zdHJ1Y3RvciA9IFRIUkVFLkJBUy5QcmVmYWJCdWZmZXJHZW9tZXRyeTtcclxuVEhSRUUuQkFTLlByZWZhYkJ1ZmZlckdlb21ldHJ5LnByb3RvdHlwZS5idWZmZXJEZWZhdWx0cyA9IGZ1bmN0aW9uICgpIHtcclxuICB2YXIgcHJlZmFiRmFjZUNvdW50ID0gdGhpcy5wcmVmYWJHZW9tZXRyeS5mYWNlcy5sZW5ndGg7XHJcbiAgdmFyIHByZWZhYkluZGV4Q291bnQgPSB0aGlzLnByZWZhYkdlb21ldHJ5LmZhY2VzLmxlbmd0aCAqIDM7XHJcbiAgdmFyIHByZWZhYlZlcnRleENvdW50ID0gdGhpcy5wcmVmYWJWZXJ0ZXhDb3VudCA9IHRoaXMucHJlZmFiR2VvbWV0cnkudmVydGljZXMubGVuZ3RoO1xyXG4gIHZhciBwcmVmYWJJbmRpY2VzID0gW107XHJcblxyXG4gIGZvciAodmFyIGggPSAwOyBoIDwgcHJlZmFiRmFjZUNvdW50OyBoKyspIHtcclxuICAgIHZhciBmYWNlID0gdGhpcy5wcmVmYWJHZW9tZXRyeS5mYWNlc1toXTtcclxuICAgIHByZWZhYkluZGljZXMucHVzaChmYWNlLmEsIGZhY2UuYiwgZmFjZS5jKTtcclxuICB9XHJcblxyXG4gIHZhciBpbmRleEJ1ZmZlciA9IG5ldyBVaW50MzJBcnJheSh0aGlzLnByZWZhYkNvdW50ICogcHJlZmFiSW5kZXhDb3VudCk7XHJcbiAgdmFyIHBvc2l0aW9uQnVmZmVyID0gbmV3IEZsb2F0MzJBcnJheSh0aGlzLnByZWZhYkNvdW50ICogcHJlZmFiVmVydGV4Q291bnQgKiAzKTtcclxuXHJcbiAgdGhpcy5zZXRJbmRleChuZXcgVEhSRUUuQnVmZmVyQXR0cmlidXRlKGluZGV4QnVmZmVyLCAxKSk7XHJcbiAgdGhpcy5hZGRBdHRyaWJ1dGUoJ3Bvc2l0aW9uJywgbmV3IFRIUkVFLkJ1ZmZlckF0dHJpYnV0ZShwb3NpdGlvbkJ1ZmZlciwgMykpO1xyXG5cclxuICBmb3IgKHZhciBpID0gMCwgb2Zmc2V0ID0gMDsgaSA8IHRoaXMucHJlZmFiQ291bnQ7IGkrKykge1xyXG4gICAgZm9yICh2YXIgaiA9IDA7IGogPCBwcmVmYWJWZXJ0ZXhDb3VudDsgaisrLCBvZmZzZXQgKz0gMykge1xyXG4gICAgICB2YXIgcHJlZmFiVmVydGV4ID0gdGhpcy5wcmVmYWJHZW9tZXRyeS52ZXJ0aWNlc1tqXTtcclxuXHJcbiAgICAgIHBvc2l0aW9uQnVmZmVyW29mZnNldCAgICBdID0gcHJlZmFiVmVydGV4Lng7XHJcbiAgICAgIHBvc2l0aW9uQnVmZmVyW29mZnNldCArIDFdID0gcHJlZmFiVmVydGV4Lnk7XHJcbiAgICAgIHBvc2l0aW9uQnVmZmVyW29mZnNldCArIDJdID0gcHJlZmFiVmVydGV4Lno7XHJcbiAgICB9XHJcblxyXG4gICAgZm9yICh2YXIgayA9IDA7IGsgPCBwcmVmYWJJbmRleENvdW50OyBrKyspIHtcclxuICAgICAgaW5kZXhCdWZmZXJbaSAqIHByZWZhYkluZGV4Q291bnQgKyBrXSA9IHByZWZhYkluZGljZXNba10gKyBpICogcHJlZmFiVmVydGV4Q291bnQ7XHJcbiAgICB9XHJcbiAgfVxyXG59O1xyXG5cclxuLyoqXHJcbiAqIGJhc2VkIG9uIEJ1ZmZlckdlb21ldHJ5LmNvbXB1dGVWZXJ0ZXhOb3JtYWxzXHJcbiAqIGNhbGN1bGF0ZSB2ZXJ0ZXggbm9ybWFscyBmb3IgYSBwcmVmYWIsIGFuZCByZXBlYXQgdGhlIGRhdGEgaW4gdGhlIG5vcm1hbCBidWZmZXJcclxuICovXHJcblRIUkVFLkJBUy5QcmVmYWJCdWZmZXJHZW9tZXRyeS5wcm90b3R5cGUuY29tcHV0ZVZlcnRleE5vcm1hbHMgPSBmdW5jdGlvbiAoKSB7XHJcbiAgdmFyIGluZGV4ID0gdGhpcy5pbmRleDtcclxuICB2YXIgYXR0cmlidXRlcyA9IHRoaXMuYXR0cmlidXRlcztcclxuICB2YXIgcG9zaXRpb25zID0gYXR0cmlidXRlcy5wb3NpdGlvbi5hcnJheTtcclxuXHJcbiAgaWYgKGF0dHJpYnV0ZXMubm9ybWFsID09PSB1bmRlZmluZWQpIHtcclxuICAgIHRoaXMuYWRkQXR0cmlidXRlKCdub3JtYWwnLCBuZXcgVEhSRUUuQnVmZmVyQXR0cmlidXRlKG5ldyBGbG9hdDMyQXJyYXkocG9zaXRpb25zLmxlbmd0aCksIDMpKTtcclxuICB9XHJcblxyXG4gIHZhciBub3JtYWxzID0gYXR0cmlidXRlcy5ub3JtYWwuYXJyYXk7XHJcblxyXG4gIHZhciB2QSwgdkIsIHZDLFxyXG5cclxuICAgIHBBID0gbmV3IFRIUkVFLlZlY3RvcjMoKSxcclxuICAgIHBCID0gbmV3IFRIUkVFLlZlY3RvcjMoKSxcclxuICAgIHBDID0gbmV3IFRIUkVFLlZlY3RvcjMoKSxcclxuXHJcbiAgICBjYiA9IG5ldyBUSFJFRS5WZWN0b3IzKCksXHJcbiAgICBhYiA9IG5ldyBUSFJFRS5WZWN0b3IzKCk7XHJcblxyXG4gIHZhciBpbmRpY2VzID0gaW5kZXguYXJyYXk7XHJcbiAgdmFyIHByZWZhYkluZGV4Q291bnQgPSB0aGlzLnByZWZhYkdlb21ldHJ5LmZhY2VzLmxlbmd0aCAqIDM7XHJcblxyXG4gIGZvciAodmFyIGkgPSAwOyBpIDwgcHJlZmFiSW5kZXhDb3VudDsgaSArPSAzKSB7XHJcbiAgICB2QSA9IGluZGljZXNbaSArIDBdICogMztcclxuICAgIHZCID0gaW5kaWNlc1tpICsgMV0gKiAzO1xyXG4gICAgdkMgPSBpbmRpY2VzW2kgKyAyXSAqIDM7XHJcblxyXG4gICAgcEEuZnJvbUFycmF5KHBvc2l0aW9ucywgdkEpO1xyXG4gICAgcEIuZnJvbUFycmF5KHBvc2l0aW9ucywgdkIpO1xyXG4gICAgcEMuZnJvbUFycmF5KHBvc2l0aW9ucywgdkMpO1xyXG5cclxuICAgIGNiLnN1YlZlY3RvcnMocEMsIHBCKTtcclxuICAgIGFiLnN1YlZlY3RvcnMocEEsIHBCKTtcclxuICAgIGNiLmNyb3NzKGFiKTtcclxuXHJcbiAgICBub3JtYWxzW3ZBXSArPSBjYi54O1xyXG4gICAgbm9ybWFsc1t2QSArIDFdICs9IGNiLnk7XHJcbiAgICBub3JtYWxzW3ZBICsgMl0gKz0gY2IuejtcclxuXHJcbiAgICBub3JtYWxzW3ZCXSArPSBjYi54O1xyXG4gICAgbm9ybWFsc1t2QiArIDFdICs9IGNiLnk7XHJcbiAgICBub3JtYWxzW3ZCICsgMl0gKz0gY2IuejtcclxuXHJcbiAgICBub3JtYWxzW3ZDXSArPSBjYi54O1xyXG4gICAgbm9ybWFsc1t2QyArIDFdICs9IGNiLnk7XHJcbiAgICBub3JtYWxzW3ZDICsgMl0gKz0gY2IuejtcclxuICB9XHJcblxyXG4gIGZvciAodmFyIGogPSAxOyBqIDwgdGhpcy5wcmVmYWJDb3VudDsgaisrKSB7XHJcbiAgICBmb3IgKHZhciBrID0gMDsgayA8IHByZWZhYkluZGV4Q291bnQ7IGsrKykge1xyXG4gICAgICBub3JtYWxzW2ogKiBwcmVmYWJJbmRleENvdW50ICsga10gPSBub3JtYWxzW2tdO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgdGhpcy5ub3JtYWxpemVOb3JtYWxzKCk7XHJcblxyXG4gIGF0dHJpYnV0ZXMubm9ybWFsLm5lZWRzVXBkYXRlID0gdHJ1ZTtcclxufTtcclxuVEhSRUUuQkFTLlByZWZhYkJ1ZmZlckdlb21ldHJ5LnByb3RvdHlwZS5jcmVhdGVBdHRyaWJ1dGUgPSBmdW5jdGlvbiAobmFtZSwgaXRlbVNpemUpIHtcclxuICB2YXIgYnVmZmVyID0gbmV3IEZsb2F0MzJBcnJheSh0aGlzLnByZWZhYkNvdW50ICogdGhpcy5wcmVmYWJWZXJ0ZXhDb3VudCAqIGl0ZW1TaXplKTtcclxuICB2YXIgYXR0cmlidXRlID0gbmV3IFRIUkVFLkJ1ZmZlckF0dHJpYnV0ZShidWZmZXIsIGl0ZW1TaXplKTtcclxuXHJcbiAgdGhpcy5hZGRBdHRyaWJ1dGUobmFtZSwgYXR0cmlidXRlKTtcclxuXHJcbiAgcmV0dXJuIGF0dHJpYnV0ZTtcclxufTtcclxuVEhSRUUuQkFTLlByZWZhYkJ1ZmZlckdlb21ldHJ5LnByb3RvdHlwZS5zZXRBdHRyaWJ1dGU0ID0gZnVuY3Rpb24gKG5hbWUsIGRhdGEpIHtcclxuICB2YXIgb2Zmc2V0ID0gMDtcclxuICB2YXIgYXJyYXkgPSB0aGlzLmdlb21ldHJ5LmF0dHJpYnV0ZXNbbmFtZV0uYXJyYXk7XHJcbiAgdmFyIGksIGo7XHJcblxyXG4gIGZvciAoaSA9IDA7IGkgPCBkYXRhLmxlbmd0aDsgaSsrKSB7XHJcbiAgICB2YXIgdiA9IGRhdGFbaV07XHJcblxyXG4gICAgZm9yIChqID0gMDsgaiA8IHRoaXMucHJlZmFiVmVydGV4Q291bnQ7IGorKykge1xyXG4gICAgICBhcnJheVtvZmZzZXQrK10gPSB2Lng7XHJcbiAgICAgIGFycmF5W29mZnNldCsrXSA9IHYueTtcclxuICAgICAgYXJyYXlbb2Zmc2V0KytdID0gdi56O1xyXG4gICAgICBhcnJheVtvZmZzZXQrK10gPSB2Lnc7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICB0aGlzLmdlb21ldHJ5LmF0dHJpYnV0ZXNbbmFtZV0ubmVlZHNVcGRhdGUgPSB0cnVlO1xyXG59O1xyXG5USFJFRS5CQVMuUHJlZmFiQnVmZmVyR2VvbWV0cnkucHJvdG90eXBlLnNldEF0dHJpYnV0ZTMgPSBmdW5jdGlvbiAobmFtZSwgZGF0YSkge1xyXG4gIHZhciBvZmZzZXQgPSAwO1xyXG4gIHZhciBhcnJheSA9IHRoaXMuZ2VvbWV0cnkuYXR0cmlidXRlc1tuYW1lXS5hcnJheTtcclxuICB2YXIgaSwgajtcclxuXHJcbiAgZm9yIChpID0gMDsgaSA8IGRhdGEubGVuZ3RoOyBpKyspIHtcclxuICAgIHZhciB2ID0gZGF0YVtpXTtcclxuXHJcbiAgICBmb3IgKGogPSAwOyBqIDwgdGhpcy5wcmVmYWJWZXJ0ZXhDb3VudDsgaisrKSB7XHJcbiAgICAgIGFycmF5W29mZnNldCsrXSA9IHYueDtcclxuICAgICAgYXJyYXlbb2Zmc2V0KytdID0gdi55O1xyXG4gICAgICBhcnJheVtvZmZzZXQrK10gPSB2Lno7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICB0aGlzLmdlb21ldHJ5LmF0dHJpYnV0ZXNbbmFtZV0ubmVlZHNVcGRhdGUgPSB0cnVlO1xyXG59O1xyXG5USFJFRS5CQVMuUHJlZmFiQnVmZmVyR2VvbWV0cnkucHJvdG90eXBlLnNldEF0dHJpYnV0ZTIgPSBmdW5jdGlvbiAobmFtZSwgZGF0YSkge1xyXG4gIHZhciBvZmZzZXQgPSAwO1xyXG4gIHZhciBhcnJheSA9IHRoaXMuZ2VvbWV0cnkuYXR0cmlidXRlc1tuYW1lXS5hcnJheTtcclxuICB2YXIgaSwgajtcclxuXHJcbiAgZm9yIChpID0gMDsgaSA8IHRoaXMucHJlZmFiQ291bnQ7IGkrKykge1xyXG4gICAgdmFyIHYgPSBkYXRhW2ldO1xyXG5cclxuICAgIGZvciAoaiA9IDA7IGogPCB0aGlzLnByZWZhYlZlcnRleENvdW50OyBqKyspIHtcclxuICAgICAgYXJyYXlbb2Zmc2V0KytdID0gdi54O1xyXG4gICAgICBhcnJheVtvZmZzZXQrK10gPSB2Lnk7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICB0aGlzLmdlb21ldHJ5LmF0dHJpYnV0ZXNbbmFtZV0ubmVlZHNVcGRhdGUgPSB0cnVlO1xyXG59O1xyXG5cclxuVEhSRUUuQkFTLkJhc2VBbmltYXRpb25NYXRlcmlhbCA9IGZ1bmN0aW9uKHBhcmFtZXRlcnMpIHtcclxuICBUSFJFRS5TaGFkZXJNYXRlcmlhbC5jYWxsKHRoaXMpO1xyXG5cclxuICB0aGlzLnNoYWRlckZ1bmN0aW9ucyA9IFtdO1xyXG4gIHRoaXMuc2hhZGVyUGFyYW1ldGVycyA9IFtdO1xyXG4gIHRoaXMuc2hhZGVyVmVydGV4SW5pdCA9IFtdO1xyXG4gIHRoaXMuc2hhZGVyVHJhbnNmb3JtTm9ybWFsID0gW107XHJcbiAgdGhpcy5zaGFkZXJUcmFuc2Zvcm1Qb3NpdGlvbiA9IFtdO1xyXG5cclxuICB0aGlzLnNldFZhbHVlcyhwYXJhbWV0ZXJzKTtcclxufTtcclxuVEhSRUUuQkFTLkJhc2VBbmltYXRpb25NYXRlcmlhbC5wcm90b3R5cGUgPSBPYmplY3QuY3JlYXRlKFRIUkVFLlNoYWRlck1hdGVyaWFsLnByb3RvdHlwZSk7XHJcblRIUkVFLkJBUy5CYXNlQW5pbWF0aW9uTWF0ZXJpYWwucHJvdG90eXBlLmNvbnN0cnVjdG9yID0gVEhSRUUuQkFTLkJhc2VBbmltYXRpb25NYXRlcmlhbDtcclxuXHJcbi8vIGFic3RyYWN0XHJcblRIUkVFLkJBUy5CYXNlQW5pbWF0aW9uTWF0ZXJpYWwucHJvdG90eXBlLl9jb25jYXRWZXJ0ZXhTaGFkZXIgPSBmdW5jdGlvbigpIHtcclxuICByZXR1cm4gJyc7XHJcbn07XHJcblRIUkVFLkJBUy5CYXNlQW5pbWF0aW9uTWF0ZXJpYWwucHJvdG90eXBlLl9jb25jYXRGdW5jdGlvbnMgPSBmdW5jdGlvbigpIHtcclxuICByZXR1cm4gdGhpcy5zaGFkZXJGdW5jdGlvbnMuam9pbignXFxuJyk7XHJcbn07XHJcblRIUkVFLkJBUy5CYXNlQW5pbWF0aW9uTWF0ZXJpYWwucHJvdG90eXBlLl9jb25jYXRQYXJhbWV0ZXJzID0gZnVuY3Rpb24oKSB7XHJcbiAgcmV0dXJuIHRoaXMuc2hhZGVyUGFyYW1ldGVycy5qb2luKCdcXG4nKTtcclxufTtcclxuVEhSRUUuQkFTLkJhc2VBbmltYXRpb25NYXRlcmlhbC5wcm90b3R5cGUuX2NvbmNhdFZlcnRleEluaXQgPSBmdW5jdGlvbigpIHtcclxuICByZXR1cm4gdGhpcy5zaGFkZXJWZXJ0ZXhJbml0LmpvaW4oJ1xcbicpO1xyXG59O1xyXG5USFJFRS5CQVMuQmFzZUFuaW1hdGlvbk1hdGVyaWFsLnByb3RvdHlwZS5fY29uY2F0VHJhbnNmb3JtTm9ybWFsID0gZnVuY3Rpb24oKSB7XHJcbiAgcmV0dXJuIHRoaXMuc2hhZGVyVHJhbnNmb3JtTm9ybWFsLmpvaW4oJ1xcbicpO1xyXG59O1xyXG5USFJFRS5CQVMuQmFzZUFuaW1hdGlvbk1hdGVyaWFsLnByb3RvdHlwZS5fY29uY2F0VHJhbnNmb3JtUG9zaXRpb24gPSBmdW5jdGlvbigpIHtcclxuICByZXR1cm4gdGhpcy5zaGFkZXJUcmFuc2Zvcm1Qb3NpdGlvbi5qb2luKCdcXG4nKTtcclxufTtcclxuVEhSRUUuQkFTLkJhc2VBbmltYXRpb25NYXRlcmlhbC5wcm90b3R5cGUuc2V0VW5pZm9ybVZhbHVlcyA9IGZ1bmN0aW9uKHZhbHVlcykge1xyXG4gIGZvciAodmFyIGtleSBpbiB2YWx1ZXMpIHtcclxuICAgIGlmIChrZXkgaW4gdGhpcy51bmlmb3Jtcykge1xyXG4gICAgICB2YXIgdW5pZm9ybSA9IHRoaXMudW5pZm9ybXNba2V5XTtcclxuICAgICAgdmFyIHZhbHVlID0gdmFsdWVzW2tleV07XHJcblxyXG4gICAgICAvLyB0b2RvIGFkZCBtYXRyaXggdW5pZm9ybSB0eXBlc1xyXG4gICAgICBzd2l0Y2ggKHVuaWZvcm0udHlwZSkge1xyXG4gICAgICAgIGNhc2UgJ2MnOiAvLyBjb2xvclxyXG4gICAgICAgICAgdW5pZm9ybS52YWx1ZS5zZXQodmFsdWUpO1xyXG4gICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgY2FzZSAndjInOiAvLyB2ZWN0b3JzXHJcbiAgICAgICAgY2FzZSAndjMnOlxyXG4gICAgICAgIGNhc2UgJ3Y0JzpcclxuICAgICAgICAgIHVuaWZvcm0udmFsdWUuY29weSh2YWx1ZSk7XHJcbiAgICAgICAgICBicmVhaztcclxuICAgICAgICBjYXNlICdmJzogLy8gZmxvYXRcclxuICAgICAgICBjYXNlICd0JzogLy8gdGV4dHVyZVxyXG4gICAgICAgICAgdW5pZm9ybS52YWx1ZSA9IHZhbHVlO1xyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgfVxyXG59O1xyXG5cclxuVEhSRUUuQkFTLlBob25nQW5pbWF0aW9uTWF0ZXJpYWwgPSBmdW5jdGlvbihwYXJhbWV0ZXJzLCB1bmlmb3JtVmFsdWVzKSB7XHJcbiAgVEhSRUUuQkFTLkJhc2VBbmltYXRpb25NYXRlcmlhbC5jYWxsKHRoaXMsIHBhcmFtZXRlcnMpO1xyXG5cclxuICB2YXIgcGhvbmdTaGFkZXIgPSBUSFJFRS5TaGFkZXJMaWJbJ3Bob25nJ107XHJcblxyXG4gIHRoaXMudW5pZm9ybXMgPSBUSFJFRS5Vbmlmb3Jtc1V0aWxzLm1lcmdlKFtwaG9uZ1NoYWRlci51bmlmb3JtcywgdGhpcy51bmlmb3Jtc10pO1xyXG4gIHRoaXMubGlnaHRzID0gdHJ1ZTtcclxuICB0aGlzLnZlcnRleFNoYWRlciA9IHRoaXMuX2NvbmNhdFZlcnRleFNoYWRlcigpO1xyXG4gIHRoaXMuZnJhZ21lbnRTaGFkZXIgPSBwaG9uZ1NoYWRlci5mcmFnbWVudFNoYWRlcjtcclxuXHJcbiAgLy8gdG9kbyBhZGQgbWlzc2luZyBkZWZhdWx0IGRlZmluZXNcclxuICB1bmlmb3JtVmFsdWVzLm1hcCAmJiAodGhpcy5kZWZpbmVzWydVU0VfTUFQJ10gPSAnJyk7XHJcbiAgdW5pZm9ybVZhbHVlcy5ub3JtYWxNYXAgJiYgKHRoaXMuZGVmaW5lc1snVVNFX05PUk1BTE1BUCddID0gJycpO1xyXG5cclxuICB0aGlzLnNldFVuaWZvcm1WYWx1ZXModW5pZm9ybVZhbHVlcyk7XHJcbn07XHJcblRIUkVFLkJBUy5QaG9uZ0FuaW1hdGlvbk1hdGVyaWFsLnByb3RvdHlwZSA9IE9iamVjdC5jcmVhdGUoVEhSRUUuQkFTLkJhc2VBbmltYXRpb25NYXRlcmlhbC5wcm90b3R5cGUpO1xyXG5USFJFRS5CQVMuUGhvbmdBbmltYXRpb25NYXRlcmlhbC5wcm90b3R5cGUuY29uc3RydWN0b3IgPSBUSFJFRS5CQVMuUGhvbmdBbmltYXRpb25NYXRlcmlhbDtcclxuVEhSRUUuQkFTLlBob25nQW5pbWF0aW9uTWF0ZXJpYWwucHJvdG90eXBlLl9jb25jYXRWZXJ0ZXhTaGFkZXIgPSBmdW5jdGlvbigpIHtcclxuICAvLyBiYXNlZCBvbiBUSFJFRS5TaGFkZXJMaWIucGhvbmdcclxuICByZXR1cm4gW1xyXG4gICAgXCIjZGVmaW5lIFBIT05HXCIsXHJcblxyXG4gICAgXCJ2YXJ5aW5nIHZlYzMgdlZpZXdQb3NpdGlvbjtcIixcclxuXHJcbiAgICBcIiNpZm5kZWYgRkxBVF9TSEFERURcIixcclxuXHJcbiAgICBcIlx0dmFyeWluZyB2ZWMzIHZOb3JtYWw7XCIsXHJcblxyXG4gICAgXCIjZW5kaWZcIixcclxuXHJcbiAgICBUSFJFRS5TaGFkZXJDaHVua1sgXCJjb21tb25cIiBdLFxyXG4gICAgVEhSRUUuU2hhZGVyQ2h1bmtbIFwidXZfcGFyc192ZXJ0ZXhcIiBdLFxyXG4gICAgVEhSRUUuU2hhZGVyQ2h1bmtbIFwidXYyX3BhcnNfdmVydGV4XCIgXSxcclxuICAgIFRIUkVFLlNoYWRlckNodW5rWyBcImRpc3BsYWNlbWVudG1hcF9wYXJzX3ZlcnRleFwiIF0sXHJcbiAgICBUSFJFRS5TaGFkZXJDaHVua1sgXCJlbnZtYXBfcGFyc192ZXJ0ZXhcIiBdLFxyXG4gICAgVEhSRUUuU2hhZGVyQ2h1bmtbIFwibGlnaHRzX3Bob25nX3BhcnNfdmVydGV4XCIgXSxcclxuICAgIFRIUkVFLlNoYWRlckNodW5rWyBcImNvbG9yX3BhcnNfdmVydGV4XCIgXSxcclxuICAgIFRIUkVFLlNoYWRlckNodW5rWyBcIm1vcnBodGFyZ2V0X3BhcnNfdmVydGV4XCIgXSxcclxuICAgIFRIUkVFLlNoYWRlckNodW5rWyBcInNraW5uaW5nX3BhcnNfdmVydGV4XCIgXSxcclxuICAgIFRIUkVFLlNoYWRlckNodW5rWyBcInNoYWRvd21hcF9wYXJzX3ZlcnRleFwiIF0sXHJcbiAgICBUSFJFRS5TaGFkZXJDaHVua1sgXCJsb2dkZXB0aGJ1Zl9wYXJzX3ZlcnRleFwiIF0sXHJcblxyXG4gICAgdGhpcy5fY29uY2F0RnVuY3Rpb25zKCksXHJcblxyXG4gICAgdGhpcy5fY29uY2F0UGFyYW1ldGVycygpLFxyXG5cclxuICAgIFwidm9pZCBtYWluKCkge1wiLFxyXG5cclxuICAgIHRoaXMuX2NvbmNhdFZlcnRleEluaXQoKSxcclxuXHJcbiAgICBUSFJFRS5TaGFkZXJDaHVua1sgXCJ1dl92ZXJ0ZXhcIiBdLFxyXG4gICAgVEhSRUUuU2hhZGVyQ2h1bmtbIFwidXYyX3ZlcnRleFwiIF0sXHJcbiAgICBUSFJFRS5TaGFkZXJDaHVua1sgXCJjb2xvcl92ZXJ0ZXhcIiBdLFxyXG4gICAgVEhSRUUuU2hhZGVyQ2h1bmtbIFwiYmVnaW5ub3JtYWxfdmVydGV4XCIgXSxcclxuXHJcbiAgICB0aGlzLl9jb25jYXRUcmFuc2Zvcm1Ob3JtYWwoKSxcclxuXHJcbiAgICBUSFJFRS5TaGFkZXJDaHVua1sgXCJtb3JwaG5vcm1hbF92ZXJ0ZXhcIiBdLFxyXG4gICAgVEhSRUUuU2hhZGVyQ2h1bmtbIFwic2tpbmJhc2VfdmVydGV4XCIgXSxcclxuICAgIFRIUkVFLlNoYWRlckNodW5rWyBcInNraW5ub3JtYWxfdmVydGV4XCIgXSxcclxuICAgIFRIUkVFLlNoYWRlckNodW5rWyBcImRlZmF1bHRub3JtYWxfdmVydGV4XCIgXSxcclxuXHJcbiAgICBcIiNpZm5kZWYgRkxBVF9TSEFERURcIiwgLy8gTm9ybWFsIGNvbXB1dGVkIHdpdGggZGVyaXZhdGl2ZXMgd2hlbiBGTEFUX1NIQURFRFxyXG5cclxuICAgIFwiXHR2Tm9ybWFsID0gbm9ybWFsaXplKCB0cmFuc2Zvcm1lZE5vcm1hbCApO1wiLFxyXG5cclxuICAgIFwiI2VuZGlmXCIsXHJcblxyXG4gICAgVEhSRUUuU2hhZGVyQ2h1bmtbIFwiYmVnaW5fdmVydGV4XCIgXSxcclxuXHJcbiAgICB0aGlzLl9jb25jYXRUcmFuc2Zvcm1Qb3NpdGlvbigpLFxyXG5cclxuICAgIFRIUkVFLlNoYWRlckNodW5rWyBcImRpc3BsYWNlbWVudG1hcF92ZXJ0ZXhcIiBdLFxyXG4gICAgVEhSRUUuU2hhZGVyQ2h1bmtbIFwibW9ycGh0YXJnZXRfdmVydGV4XCIgXSxcclxuICAgIFRIUkVFLlNoYWRlckNodW5rWyBcInNraW5uaW5nX3ZlcnRleFwiIF0sXHJcbiAgICBUSFJFRS5TaGFkZXJDaHVua1sgXCJwcm9qZWN0X3ZlcnRleFwiIF0sXHJcbiAgICBUSFJFRS5TaGFkZXJDaHVua1sgXCJsb2dkZXB0aGJ1Zl92ZXJ0ZXhcIiBdLFxyXG5cclxuICAgIFwiXHR2Vmlld1Bvc2l0aW9uID0gLSBtdlBvc2l0aW9uLnh5ejtcIixcclxuXHJcbiAgICBUSFJFRS5TaGFkZXJDaHVua1sgXCJ3b3JsZHBvc192ZXJ0ZXhcIiBdLFxyXG4gICAgVEhSRUUuU2hhZGVyQ2h1bmtbIFwiZW52bWFwX3ZlcnRleFwiIF0sXHJcbiAgICBUSFJFRS5TaGFkZXJDaHVua1sgXCJsaWdodHNfcGhvbmdfdmVydGV4XCIgXSxcclxuICAgIFRIUkVFLlNoYWRlckNodW5rWyBcInNoYWRvd21hcF92ZXJ0ZXhcIiBdLFxyXG5cclxuICAgIFwifVwiXHJcblxyXG4gIF0uam9pbiggXCJcXG5cIiApO1xyXG59OyJdLCJmaWxlIjoiYXBwLmpzIn0=
