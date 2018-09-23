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
  $('#homepage-bg-animation').css('display', 'none');
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
  $('#homepage-bg-animation').css('display', 'block');
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
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiIiwic291cmNlcyI6WyJhcHAuanMiXSwic291cmNlc0NvbnRlbnQiOlsiLy8gVHlwaW5nIHRleHRcclxubGV0IFR4dFR5cGUgPSBmdW5jdGlvbihlbCwgdG9Sb3RhdGUsIHBlcmlvZCkge1xyXG4gIHRoaXMudG9Sb3RhdGUgPSB0b1JvdGF0ZTtcclxuICB0aGlzLmVsID0gZWw7XHJcbiAgdGhpcy5sb29wTnVtID0gMDtcclxuICB0aGlzLnBlcmlvZCA9IHBhcnNlSW50KHBlcmlvZCwgMTApIHx8IDIwMDA7XHJcbiAgdGhpcy50eHQgPSAnV2UgYnVpbGQgJztcclxuICB0aGlzLnRpY2soKTtcclxuICB0aGlzLmlzRGVsZXRpbmcgPSBmYWxzZTtcclxufTtcclxuVHh0VHlwZS5wcm90b3R5cGUudGljayA9IGZ1bmN0aW9uKCkge1xyXG4gIGxldCBpID0gdGhpcy5sb29wTnVtICUgdGhpcy50b1JvdGF0ZS5sZW5ndGg7XHJcblxyXG4gIGxldCBmdWxsVHh0ID0gdGhpcy50b1JvdGF0ZVtpXTtcclxuXHJcbiAgaWYgKHRoaXMuaXNEZWxldGluZykge1xyXG4gICAgdGhpcy50eHQgPSBmdWxsVHh0LnN1YnN0cmluZygwLCB0aGlzLnR4dC5sZW5ndGggLSAxKTtcclxuICB9IGVsc2Uge1xyXG4gICAgdGhpcy50eHQgPSBmdWxsVHh0LnN1YnN0cmluZygwLCB0aGlzLnR4dC5sZW5ndGggKyAxKTtcclxuICB9XHJcblxyXG4gIHRoaXMuZWwuaW5uZXJIVE1MID0gJ1dlIGJ1aWxkJyArICc8YnI+ICcgKyAnJmVuc3A7JyArICc8c3BhbiBjbGFzcz1cIndyYXBcIj4nK3RoaXMudHh0Kyc8L3NwYW4+JztcclxuXHJcbiAgbGV0IHRoYXQgPSB0aGlzO1xyXG4gIGxldCBkZWx0YSA9IDIwMCAtIE1hdGgucmFuZG9tKCkgKiAxMDA7XHJcblxyXG4gIGlmICh0aGlzLmlzRGVsZXRpbmcpIHsgZGVsdGEgLz0gMjsgfVxyXG5cclxuICBpZiAoIXRoaXMuaXNEZWxldGluZyAmJiB0aGlzLnR4dCA9PT0gZnVsbFR4dCkge1xyXG4gICAgZGVsdGEgPSB0aGlzLnBlcmlvZDtcclxuICAgIHRoaXMuaXNEZWxldGluZyA9IHRydWU7XHJcbiAgfSBlbHNlIGlmICh0aGlzLmlzRGVsZXRpbmcgJiYgdGhpcy50eHQgPT09ICcnKSB7XHJcbiAgICB0aGlzLmlzRGVsZXRpbmcgPSBmYWxzZTtcclxuICAgIHRoaXMubG9vcE51bSsrO1xyXG4gICAgZGVsdGEgPSA1MDA7XHJcbiAgfVxyXG5cclxuICBzZXRUaW1lb3V0KGZ1bmN0aW9uKCkge1xyXG4gICAgdGhhdC50aWNrKCk7XHJcbiAgfSwgZGVsdGEpO1xyXG59O1xyXG4kKGRvY3VtZW50KS5yZWFkeShmdW5jdGlvbigpIHtcclxuICB2YXIgZWxlbWVudCA9IGRvY3VtZW50LmdldEVsZW1lbnRzQnlDbGFzc05hbWUoJ2pzLXR5cGVkLXRleHQnKTtcclxuICB2YXIgdG9Sb3RhdGUgPSBlbGVtZW50WzBdLmdldEF0dHJpYnV0ZSgnZGF0YS10eXBlJyk7XHJcbiAgdmFyIHBlcmlvZCA9IGVsZW1lbnRbMF0uZ2V0QXR0cmlidXRlKCdkYXRhLXBlcmlvZCcpO1xyXG4gIGlmICh0b1JvdGF0ZSkge1xyXG4gICAgbmV3IFR4dFR5cGUoZWxlbWVudFswXSwgSlNPTi5wYXJzZSh0b1JvdGF0ZSksIHBlcmlvZCk7XHJcbiAgfVxyXG59KTtcclxuLy8gUG9wdXAgYW5pbWF0aW9uXHJcbiQoJy5qcy1zaG93LXBvcHVwJykub24oJ2NsaWNrJywgZnVuY3Rpb24gKCkge1xyXG4gICQoJyNob21lcGFnZS1iZy1hbmltYXRpb24nKS5jc3MoJ2Rpc3BsYXknLCAnbm9uZScpO1xyXG4gIGFuaW1lKHtcclxuICAgIHRhcmdldHM6ICcucG9wLXVwJyxcclxuICAgIHRyYW5zbGF0ZVk6IDAsXHJcbiAgICBvcGFjaXR5OiAxLFxyXG4gICAgZWFzaW5nOiAnbGluZWFyJyxcclxuICAgIGR1cmF0aW9uOiA1MDBcclxuICB9KTtcclxuICBhbmltZSh7XHJcbiAgICB0YXJnZXRzOiAnLmxpc3QtZm9ybSAubGlzdC1mb3JtX19maWVsZCcsXHJcbiAgICB0cmFuc2xhdGVZOiAwLFxyXG4gICAgb3BhY2l0eTogMSxcclxuICAgIGVhc2luZzogJ2xpbmVhcicsXHJcbiAgICBkdXJhdGlvbjogNTAwLFxyXG4gICAgZGVsYXk6IDUwMFxyXG4gIH0pO1xyXG4gIGFuaW1lKHtcclxuICAgIHRhcmdldHM6ICcubGlzdC1mb3JtIC5idG4nLFxyXG4gICAgdHJhbnNsYXRlWTogMCxcclxuICAgIG9wYWNpdHk6IDEsXHJcbiAgICBlYXNpbmc6ICdsaW5lYXInLFxyXG4gICAgZHVyYXRpb246IDUwMCxcclxuICAgIGRlbGF5OiAxMDAwXHJcbiAgfSk7XHJcbn0pO1xyXG4kKCcuanMtcG9wdXAtY2xvc2UnKS5vbignY2xpY2snLCBmdW5jdGlvbiAoKSB7XHJcbiAgJCgnI2hvbWVwYWdlLWJnLWFuaW1hdGlvbicpLmNzcygnZGlzcGxheScsICdibG9jaycpO1xyXG4gIGFuaW1lKHtcclxuICAgIHRhcmdldHM6ICcucG9wLXVwJyxcclxuICAgIHRyYW5zbGF0ZVk6ICctMTAwJScsXHJcbiAgICBvcGFjaXR5OiAwLFxyXG4gICAgZWFzaW5nOiAnbGluZWFyJyxcclxuICAgIGR1cmF0aW9uOiA1MDBcclxuICB9KTtcclxuICBhbmltZSh7XHJcbiAgICB0YXJnZXRzOiAnLmxpc3QtZm9ybSAubGlzdC1mb3JtX19maWVsZCcsXHJcbiAgICB0cmFuc2xhdGVZOiAtMTUwLFxyXG4gICAgb3BhY2l0eTogMC40LFxyXG4gICAgZWFzaW5nOiAnbGluZWFyJyxcclxuICAgIGR1cmF0aW9uOiA1MDBcclxuICB9KTtcclxuICBhbmltZSh7XHJcbiAgICB0YXJnZXRzOiAnLmxpc3QtZm9ybSAuYnRuJyxcclxuICAgIHRyYW5zbGF0ZVk6IDUwLFxyXG4gICAgb3BhY2l0eTogMCxcclxuICAgIGVhc2luZzogJ2xpbmVhcicsXHJcbiAgICBkdXJhdGlvbjogNTAwXHJcbiAgfSk7XHJcbn0pO1xyXG4kKGRvY3VtZW50KS5yZWFkeShmdW5jdGlvbiAoKSB7XHJcbiAgJCgnLnBvcC11cCcpLmNzcygndHJhbnNmb3JtJywgJ3RyYW5zbGF0ZVkoLTEwMCUpJyk7XHJcbiAgJCgnLnBvcC11cCcpLmNzcygnb3BhY2l0eScsICcxJyk7XHJcbiAgJCgnLmxpc3QtZm9ybSAubGlzdC1mb3JtX19maWVsZCcpLmVhY2goZnVuY3Rpb24gKCkge1xyXG4gICAgJCh0aGlzKS5jc3MoJ3RyYW5zZm9ybScsICd0cmFuc2xhdGVZKC0xNTBweCknKTtcclxuICAgICQodGhpcykuY3NzKCdvcGFjaXR5JywgJzAuNCcpO1xyXG4gIH0pO1xyXG4gICQoJy5saXN0LWZvcm0gLmJ0bicpLmNzcygndHJhbnNmb3JtJywgJ3RyYW5zbGF0ZVkoMTUwcHgpJyk7XHJcbiAgJCgnLmxpc3QtZm9ybSAuYnRuJykuY3NzKCdvcGFjaXR5JywgJzAnKTtcclxufSk7XHJcbi8vIEZpZWxkIGxhYmVsIGFuaW1hdGlvblxyXG4kKGRvY3VtZW50KS5yZWFkeShmdW5jdGlvbiAoKSB7XHJcbiAgJCgnLmxpc3QtZm9ybSAubGlzdC1mb3JtX19sYWJlbCcpLmVhY2goZnVuY3Rpb24gKCkge1xyXG4gICAgJCh0aGlzKS5jc3MoJ3RyYW5zZm9ybScsICd0cmFuc2xhdGVZKDE0cHgpJyk7XHJcbiAgICAkKHRoaXMpLmNzcygnZm9udC1zaXplJywgJzE2cHgnKVxyXG4gIH0pO1xyXG59KTtcclxuJCgnLmxpc3QtZm9ybSAubGlzdC1mb3JtX19pbnB1dCcpLmZvY3VzKGZ1bmN0aW9uICgpIHtcclxuICAkKHRoaXMpLnBhcmVudCgpLmFkZENsYXNzKCdmb2N1c2VkJyk7XHJcbiAgYW5pbWUoe1xyXG4gICAgdGFyZ2V0czogJy5saXN0LWZvcm1fX2ZpZWxkLmZvY3VzZWQgLmxpc3QtZm9ybV9fbGFiZWwnLFxyXG4gICAgdHJhbnNsYXRlWTogJy0xMnB4JyxcclxuICAgIGZvbnRTaXplOiAxMixcclxuICAgIGVhc2luZzogJ2xpbmVhcicsXHJcbiAgICBkdXJhdGlvbjogMjAwXHJcbiAgfSk7XHJcbn0pO1xyXG4kKCcubGlzdC1mb3JtIC5saXN0LWZvcm1fX2lucHV0JykuZm9jdXNvdXQoZnVuY3Rpb24gKCkge1xyXG4gIGlmKCQodGhpcykudmFsKCkpIHtcclxuICAgICQodGhpcykucGFyZW50KCkuYWRkQ2xhc3MoJ2ZpbGwnKTtcclxuICB9XHJcbiAgZWxzZSB7XHJcbiAgICBhbmltZSh7XHJcbiAgICAgIHRhcmdldHM6ICcubGlzdC1mb3JtX19maWVsZC5mb2N1c2VkIC5saXN0LWZvcm1fX2xhYmVsJyxcclxuICAgICAgdHJhbnNsYXRlWTogJzE0cHgnLFxyXG4gICAgICBmb250U2l6ZTogMTYsXHJcbiAgICAgIGVhc2luZzogJ2xpbmVhcicsXHJcbiAgICAgIGR1cmF0aW9uOiAyMDBcclxuICAgIH0pO1xyXG4gICAgaWYoJCh0aGlzKS5wYXJlbnQoKS5oYXNDbGFzcygnZmlsbCcpKSB7XHJcbiAgICAgICQodGhpcykucGFyZW50KCkucmVtb3ZlQ2xhc3MoJ2ZpbGwnKVxyXG4gICAgfVxyXG4gIH1cclxuICAkKHRoaXMpLnBhcmVudCgpLnJlbW92ZUNsYXNzKCdmb2N1c2VkJyk7XHJcbn0pO1xyXG4vLyBIb21lcGFnZSBiZyBhbmltYXRpb25cclxudmFyIG1Db250YWluZXI7XHJcbnZhciBtQ2FtZXJhLCBtUmVuZGVyZXI7XHJcbnZhciBtQ29udHJvbHM7XHJcbnZhciBtU2NlbmU7XHJcbnZhciBtUGFydGljbGVDb3VudCA9IDgwMDA7XHJcbnZhciBtUGFydGljbGVTeXN0ZW07XHJcbnZhciBtVGltZSA9IDAuMDtcclxudmFyIG1UaW1lU3RlcCA9ICgxLzI3MCk7XHJcbnZhciBtRHVyYXRpb24gPSAyMDtcclxuXHJcbndpbmRvdy5vbmxvYWQgPSBmdW5jdGlvbiAoKSB7XHJcbiAgaW5pdCgpO1xyXG59O1xyXG5cclxuZnVuY3Rpb24gaW5pdCgpIHtcclxuICBpbml0VEhSRUUoKTtcclxuICBpbml0Q29udHJvbHMoKTtcclxuICBpbml0UGFydGljbGVTeXN0ZW0oKTtcclxuXHJcbiAgcmVxdWVzdEFuaW1hdGlvbkZyYW1lKHRpY2spO1xyXG4gIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKCdyZXNpemUnLCByZXNpemUsIGZhbHNlKTtcclxufVxyXG5mdW5jdGlvbiBpbml0VEhSRUUoKSB7XHJcbiAgbVJlbmRlcmVyID0gbmV3IFRIUkVFLldlYkdMUmVuZGVyZXIoe2FudGlhbGlhczogdHJ1ZX0pO1xyXG4gIG1SZW5kZXJlci5zZXRTaXplKHdpbmRvdy5pbm5lcldpZHRoLCB3aW5kb3cuaW5uZXJIZWlnaHQpO1xyXG4gIG1SZW5kZXJlci5zZXRDbGVhckNvbG9yKDB4MzA0ZmZlKTtcclxuXHJcbiAgbUNvbnRhaW5lciA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdob21lcGFnZS1iZy1hbmltYXRpb24nKTtcclxuICBtQ29udGFpbmVyLmFwcGVuZENoaWxkKG1SZW5kZXJlci5kb21FbGVtZW50KTtcclxuXHJcbiAgbUNhbWVyYSA9IG5ldyBUSFJFRS5QZXJzcGVjdGl2ZUNhbWVyYSg2MCwgd2luZG93LmlubmVyV2lkdGggLyB3aW5kb3cuaW5uZXJIZWlnaHQsIDAuMSwgNTAwMCk7XHJcbiAgbUNhbWVyYS5wb3NpdGlvbi5zZXQoLTEzMDAsIDAsIDApO1xyXG5cclxuICBtU2NlbmUgPSBuZXcgVEhSRUUuU2NlbmUoKTtcclxuXHJcbiAgdmFyIGxpZ2h0O1xyXG5cclxuICBsaWdodCA9IG5ldyBUSFJFRS5BbWJpZW50TGlnaHQoMHhmZmZmZmYpO1xyXG4gIG1TY2VuZS5hZGQobGlnaHQpO1xyXG59XHJcbmZ1bmN0aW9uIGluaXRDb250cm9scygpIHtcclxuICBtQ29udHJvbHMgPSBuZXcgVEhSRUUuT3JiaXRDb250cm9scyhtQ2FtZXJhLCBtUmVuZGVyZXIuZG9tRWxlbWVudCk7XHJcbn1cclxuZnVuY3Rpb24gaW5pdFBhcnRpY2xlU3lzdGVtKCkge1xyXG4gIHZhciBwcmVmYWJHZW9tZXRyeSA9IG5ldyBUSFJFRS5QbGFuZUdlb21ldHJ5KDQsIDQpO1xyXG4gIHZhciBidWZmZXJHZW9tZXRyeSA9IG5ldyBUSFJFRS5CQVMuUHJlZmFiQnVmZmVyR2VvbWV0cnkocHJlZmFiR2VvbWV0cnksIG1QYXJ0aWNsZUNvdW50KTtcclxuXHJcbiAgYnVmZmVyR2VvbWV0cnkuY29tcHV0ZVZlcnRleE5vcm1hbHMoKTtcclxuXHJcbiAgLy8gZ2VuZXJhdGUgYWRkaXRpb25hbCBnZW9tZXRyeSBkYXRhXHJcbiAgdmFyIGFPZmZzZXQgPSBidWZmZXJHZW9tZXRyeS5jcmVhdGVBdHRyaWJ1dGUoJ2FPZmZzZXQnLCAxKTtcclxuICB2YXIgYVN0YXJ0UG9zaXRpb24gPSBidWZmZXJHZW9tZXRyeS5jcmVhdGVBdHRyaWJ1dGUoJ2FTdGFydFBvc2l0aW9uJywgMyk7XHJcbiAgdmFyIGFDb250cm9sUG9pbnQxID0gYnVmZmVyR2VvbWV0cnkuY3JlYXRlQXR0cmlidXRlKCdhQ29udHJvbFBvaW50MScsIDMpO1xyXG4gIHZhciBhQ29udHJvbFBvaW50MiA9IGJ1ZmZlckdlb21ldHJ5LmNyZWF0ZUF0dHJpYnV0ZSgnYUNvbnRyb2xQb2ludDInLCAzKTtcclxuICB2YXIgYUVuZFBvc2l0aW9uID0gYnVmZmVyR2VvbWV0cnkuY3JlYXRlQXR0cmlidXRlKCdhRW5kUG9zaXRpb24nLCAzKTtcclxuICB2YXIgYUF4aXNBbmdsZSA9IGJ1ZmZlckdlb21ldHJ5LmNyZWF0ZUF0dHJpYnV0ZSgnYUF4aXNBbmdsZScsIDQpO1xyXG4gIHZhciBhQ29sb3IgPSBidWZmZXJHZW9tZXRyeS5jcmVhdGVBdHRyaWJ1dGUoJ2NvbG9yJywgMyk7XHJcblxyXG4gIHZhciBpLCBqLCBvZmZzZXQ7XHJcblxyXG4gIC8vIGJ1ZmZlciB0aW1lIG9mZnNldFxyXG4gIHZhciBkZWxheTtcclxuXHJcbiAgZm9yIChpID0gMCwgb2Zmc2V0ID0gMDsgaSA8IG1QYXJ0aWNsZUNvdW50OyBpKyspIHtcclxuICAgIGRlbGF5ID0gaSAvIG1QYXJ0aWNsZUNvdW50ICogbUR1cmF0aW9uO1xyXG5cclxuICAgIGZvciAoaiA9IDA7IGogPCBwcmVmYWJHZW9tZXRyeS52ZXJ0aWNlcy5sZW5ndGg7IGorKykge1xyXG4gICAgICBhT2Zmc2V0LmFycmF5W29mZnNldCsrXSA9IGRlbGF5O1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgLy8gYnVmZmVyIHN0YXJ0IHBvc2l0aW9uc1xyXG4gIHZhciB4LCB5LCB6O1xyXG5cclxuICBmb3IgKGkgPSAwLCBvZmZzZXQgPSAwOyBpIDwgbVBhcnRpY2xlQ291bnQ7IGkrKykge1xyXG4gICAgeCA9IDA7XHJcbiAgICB5ID0gMTAwMDtcclxuICAgIHogPSAwO1xyXG5cclxuICAgIGZvciAoaiA9IDA7IGogPCBwcmVmYWJHZW9tZXRyeS52ZXJ0aWNlcy5sZW5ndGg7IGorKykge1xyXG4gICAgICBhU3RhcnRQb3NpdGlvbi5hcnJheVtvZmZzZXQrK10gPSB4O1xyXG4gICAgICBhU3RhcnRQb3NpdGlvbi5hcnJheVtvZmZzZXQrK10gPSB5O1xyXG4gICAgICBhU3RhcnRQb3NpdGlvbi5hcnJheVtvZmZzZXQrK10gPSB6O1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgLy8gYnVmZmVyIGNvbnRyb2wgcG9pbnRzXHJcblxyXG4gIGZvciAoaSA9IDAsIG9mZnNldCA9IDA7IGkgPCBtUGFydGljbGVDb3VudDsgaSsrKSB7XHJcbiAgICB4ID0gVEhSRUUuTWF0aC5yYW5kRmxvYXQoLTQwMCwgNDAwKTtcclxuICAgIHkgPSBUSFJFRS5NYXRoLnJhbmRGbG9hdCg0MDAsIDYwMCk7XHJcbiAgICB6ID0gVEhSRUUuTWF0aC5yYW5kRmxvYXQoLTE4MDAsIC00MDApO1xyXG5cclxuICAgIGZvciAoaiA9IDA7IGogPCBwcmVmYWJHZW9tZXRyeS52ZXJ0aWNlcy5sZW5ndGg7IGorKykge1xyXG4gICAgICBhQ29udHJvbFBvaW50MS5hcnJheVtvZmZzZXQrK10gPSB4O1xyXG4gICAgICBhQ29udHJvbFBvaW50MS5hcnJheVtvZmZzZXQrK10gPSB5O1xyXG4gICAgICBhQ29udHJvbFBvaW50MS5hcnJheVtvZmZzZXQrK10gPSB6O1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgZm9yIChpID0gMCwgb2Zmc2V0ID0gMDsgaSA8IG1QYXJ0aWNsZUNvdW50OyBpKyspIHtcclxuICAgIHggPSBUSFJFRS5NYXRoLnJhbmRGbG9hdCgtNDAwLCA0MDApO1xyXG4gICAgeSA9IFRIUkVFLk1hdGgucmFuZEZsb2F0KC02MDAsIC00MDApO1xyXG4gICAgeiA9IFRIUkVFLk1hdGgucmFuZEZsb2F0KDQwMCwgMTgwMCk7XHJcblxyXG4gICAgZm9yIChqID0gMDsgaiA8IHByZWZhYkdlb21ldHJ5LnZlcnRpY2VzLmxlbmd0aDsgaisrKSB7XHJcbiAgICAgIGFDb250cm9sUG9pbnQyLmFycmF5W29mZnNldCsrXSA9IHg7XHJcbiAgICAgIGFDb250cm9sUG9pbnQyLmFycmF5W29mZnNldCsrXSA9IHk7XHJcbiAgICAgIGFDb250cm9sUG9pbnQyLmFycmF5W29mZnNldCsrXSA9IHo7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICAvLyBidWZmZXIgZW5kIHBvc2l0aW9uc1xyXG5cclxuICBmb3IgKGkgPSAwLCBvZmZzZXQgPSAwOyBpIDwgbVBhcnRpY2xlQ291bnQ7IGkrKykge1xyXG4gICAgeCA9IDA7XHJcbiAgICB5ID0gLTEwMDA7XHJcbiAgICB6ID0gMDtcclxuXHJcbiAgICBmb3IgKGogPSAwOyBqIDwgcHJlZmFiR2VvbWV0cnkudmVydGljZXMubGVuZ3RoOyBqKyspIHtcclxuICAgICAgYUVuZFBvc2l0aW9uLmFycmF5W29mZnNldCsrXSA9IHg7XHJcbiAgICAgIGFFbmRQb3NpdGlvbi5hcnJheVtvZmZzZXQrK10gPSB5O1xyXG4gICAgICBhRW5kUG9zaXRpb24uYXJyYXlbb2Zmc2V0KytdID0gejtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIC8vIGJ1ZmZlciBheGlzIGFuZ2xlXHJcbiAgdmFyIGF4aXMgPSBuZXcgVEhSRUUuVmVjdG9yMygpO1xyXG4gIHZhciBhbmdsZSA9IDA7XHJcblxyXG4gIGZvciAoaSA9IDAsIG9mZnNldCA9IDA7IGkgPCBtUGFydGljbGVDb3VudDsgaSsrKSB7XHJcbiAgICBheGlzLnggPSBUSFJFRS5NYXRoLnJhbmRGbG9hdFNwcmVhZCgyKTtcclxuICAgIGF4aXMueSA9IFRIUkVFLk1hdGgucmFuZEZsb2F0U3ByZWFkKDIpO1xyXG4gICAgYXhpcy56ID0gVEhSRUUuTWF0aC5yYW5kRmxvYXRTcHJlYWQoMik7XHJcbiAgICBheGlzLm5vcm1hbGl6ZSgpO1xyXG5cclxuICAgIGFuZ2xlID0gTWF0aC5QSSAqIFRIUkVFLk1hdGgucmFuZEludCgxNiwgMzIpO1xyXG5cclxuICAgIGZvciAoaiA9IDA7IGogPCBwcmVmYWJHZW9tZXRyeS52ZXJ0aWNlcy5sZW5ndGg7IGorKykge1xyXG4gICAgICBhQXhpc0FuZ2xlLmFycmF5W29mZnNldCsrXSA9IGF4aXMueDtcclxuICAgICAgYUF4aXNBbmdsZS5hcnJheVtvZmZzZXQrK10gPSBheGlzLnk7XHJcbiAgICAgIGFBeGlzQW5nbGUuYXJyYXlbb2Zmc2V0KytdID0gYXhpcy56O1xyXG4gICAgICBhQXhpc0FuZ2xlLmFycmF5W29mZnNldCsrXSA9IGFuZ2xlO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgLy8gYnVmZmVyIGNvbG9yXHJcbiAgdmFyIGNvbG9yID0gbmV3IFRIUkVFLkNvbG9yKCk7XHJcbiAgdmFyIGgsIHMsIGw7XHJcblxyXG4gIGZvciAoaSA9IDAsIG9mZnNldCA9IDA7IGkgPCBtUGFydGljbGVDb3VudDsgaSsrKSB7XHJcbiAgICBoID0gMDtcclxuICAgIHMgPSAwO1xyXG4gICAgbCA9IDA7XHJcblxyXG4gICAgY29sb3Iuc2V0SFNMKGgsIHMsIGwpO1xyXG5cclxuICAgIGZvciAoaiA9IDA7IGogPCBwcmVmYWJHZW9tZXRyeS52ZXJ0aWNlcy5sZW5ndGg7IGorKykge1xyXG4gICAgICBhQ29sb3IuYXJyYXlbb2Zmc2V0KytdID0gY29sb3IucjtcclxuICAgICAgYUNvbG9yLmFycmF5W29mZnNldCsrXSA9IGNvbG9yLmc7XHJcbiAgICAgIGFDb2xvci5hcnJheVtvZmZzZXQrK10gPSBjb2xvci5iO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgdmFyIG1hdGVyaWFsID0gbmV3IFRIUkVFLkJBUy5QaG9uZ0FuaW1hdGlvbk1hdGVyaWFsKFxyXG4gICAgLy8gY3VzdG9tIHBhcmFtZXRlcnMgJiBUSFJFRS5NZXNoUGhvbmdNYXRlcmlhbCBwYXJhbWV0ZXJzXHJcbiAgICB7XHJcbiAgICAgIHZlcnRleENvbG9yczogVEhSRUUuVmVydGV4Q29sb3JzLFxyXG4gICAgICBzaGFkaW5nOiBUSFJFRS5GbGF0U2hhZGluZyxcclxuICAgICAgc2lkZTogVEhSRUUuRG91YmxlU2lkZSxcclxuICAgICAgdW5pZm9ybXM6IHtcclxuICAgICAgICB1VGltZToge3R5cGU6ICdmJywgdmFsdWU6IDB9LFxyXG4gICAgICAgIHVEdXJhdGlvbjoge3R5cGU6ICdmJywgdmFsdWU6IG1EdXJhdGlvbn1cclxuICAgICAgfSxcclxuICAgICAgc2hhZGVyRnVuY3Rpb25zOiBbXHJcbiAgICAgICAgVEhSRUUuQkFTLlNoYWRlckNodW5rWydxdWF0ZXJuaW9uX3JvdGF0aW9uJ10sXHJcbiAgICAgICAgVEhSRUUuQkFTLlNoYWRlckNodW5rWydjdWJpY19iZXppZXInXVxyXG4gICAgICBdLFxyXG4gICAgICBzaGFkZXJQYXJhbWV0ZXJzOiBbXHJcbiAgICAgICAgJ3VuaWZvcm0gZmxvYXQgdVRpbWU7JyxcclxuICAgICAgICAndW5pZm9ybSBmbG9hdCB1RHVyYXRpb247JyxcclxuICAgICAgICAnYXR0cmlidXRlIGZsb2F0IGFPZmZzZXQ7JyxcclxuICAgICAgICAnYXR0cmlidXRlIHZlYzMgYVN0YXJ0UG9zaXRpb247JyxcclxuICAgICAgICAnYXR0cmlidXRlIHZlYzMgYUNvbnRyb2xQb2ludDE7JyxcclxuICAgICAgICAnYXR0cmlidXRlIHZlYzMgYUNvbnRyb2xQb2ludDI7JyxcclxuICAgICAgICAnYXR0cmlidXRlIHZlYzMgYUVuZFBvc2l0aW9uOycsXHJcbiAgICAgICAgJ2F0dHJpYnV0ZSB2ZWM0IGFBeGlzQW5nbGU7J1xyXG4gICAgICBdLFxyXG4gICAgICBzaGFkZXJWZXJ0ZXhJbml0OiBbXHJcbiAgICAgICAgJ2Zsb2F0IHRQcm9ncmVzcyA9IG1vZCgodVRpbWUgKyBhT2Zmc2V0KSwgdUR1cmF0aW9uKSAvIHVEdXJhdGlvbjsnLFxyXG5cclxuICAgICAgICAnZmxvYXQgYW5nbGUgPSBhQXhpc0FuZ2xlLncgKiB0UHJvZ3Jlc3M7JyxcclxuICAgICAgICAndmVjNCB0UXVhdCA9IHF1YXRGcm9tQXhpc0FuZ2xlKGFBeGlzQW5nbGUueHl6LCBhbmdsZSk7J1xyXG4gICAgICBdLFxyXG4gICAgICBzaGFkZXJUcmFuc2Zvcm1Ob3JtYWw6IFtcclxuICAgICAgICAnb2JqZWN0Tm9ybWFsID0gcm90YXRlVmVjdG9yKHRRdWF0LCBvYmplY3ROb3JtYWwpOydcclxuICAgICAgXSxcclxuICAgICAgc2hhZGVyVHJhbnNmb3JtUG9zaXRpb246IFtcclxuICAgICAgICAndHJhbnNmb3JtZWQgPSByb3RhdGVWZWN0b3IodFF1YXQsIHRyYW5zZm9ybWVkKTsnLFxyXG4gICAgICAgICd0cmFuc2Zvcm1lZCArPSBjdWJpY0JlemllcihhU3RhcnRQb3NpdGlvbiwgYUNvbnRyb2xQb2ludDEsIGFDb250cm9sUG9pbnQyLCBhRW5kUG9zaXRpb24sIHRQcm9ncmVzcyk7J1xyXG4gICAgICBdXHJcbiAgICB9LFxyXG4gICAgLy8gVEhSRUUuTWVzaFBob25nTWF0ZXJpYWwgdW5pZm9ybXNcclxuICAgIHtcclxuICAgICAgc3BlY3VsYXI6IDB4ZmYwMDAwLFxyXG4gICAgICBzaGluaW5lc3M6IDIwXHJcbiAgICB9XHJcbiAgKTtcclxuICBtUGFydGljbGVTeXN0ZW0gPSBuZXcgVEhSRUUuTWVzaChidWZmZXJHZW9tZXRyeSwgbWF0ZXJpYWwpO1xyXG4gIC8vIGJlY2F1c2UgdGhlIGJvdW5kaW5nIGJveCBvZiB0aGUgcGFydGljbGUgc3lzdGVtIGRvZXMgbm90IHJlZmxlY3QgaXRzIG9uLXNjcmVlbiBzaXplXHJcbiAgLy8gc2V0IHRoaXMgdG8gZmFsc2UgdG8gcHJldmVudCB0aGUgd2hvbGUgdGhpbmcgZnJvbSBkaXNhcHBlYXJpbmcgb24gY2VydGFpbiBhbmdsZXNcclxuICBtUGFydGljbGVTeXN0ZW0uZnJ1c3R1bUN1bGxlZCA9IGZhbHNlO1xyXG4gIG1TY2VuZS5hZGQobVBhcnRpY2xlU3lzdGVtKTtcclxufVxyXG5mdW5jdGlvbiB0aWNrKCkge1xyXG4gIHVwZGF0ZSgpO1xyXG4gIHJlbmRlcigpO1xyXG5cclxuICBtVGltZSArPSBtVGltZVN0ZXA7XHJcbiAgbVRpbWUgJT0gbUR1cmF0aW9uO1xyXG5cclxuICByZXF1ZXN0QW5pbWF0aW9uRnJhbWUodGljayk7XHJcbn1cclxuZnVuY3Rpb24gdXBkYXRlKCkge1xyXG4gIG1Db250cm9scy51cGRhdGUoKTtcclxuICBtUGFydGljbGVTeXN0ZW0ubWF0ZXJpYWwudW5pZm9ybXNbJ3VUaW1lJ10udmFsdWUgPSBtVGltZTtcclxufVxyXG5mdW5jdGlvbiByZW5kZXIoKSB7XHJcbiAgbVJlbmRlcmVyLnJlbmRlcihtU2NlbmUsIG1DYW1lcmEpO1xyXG59XHJcbmZ1bmN0aW9uIHJlc2l6ZSgpIHtcclxuICBtQ2FtZXJhLmFzcGVjdCA9IHdpbmRvdy5pbm5lcldpZHRoIC8gd2luZG93LmlubmVySGVpZ2h0O1xyXG4gIG1DYW1lcmEudXBkYXRlUHJvamVjdGlvbk1hdHJpeCgpO1xyXG5cclxuICBtUmVuZGVyZXIuc2V0U2l6ZSh3aW5kb3cuaW5uZXJXaWR0aCwgd2luZG93LmlubmVySGVpZ2h0KTtcclxufVxyXG5cclxuLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy9cclxuLy8gYnVmZmVyIGFuaW1hdGlvbiBzeXN0ZW1cclxuLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy9cclxuXHJcblRIUkVFLkJBUyA9IHt9O1xyXG5USFJFRS5CQVMuU2hhZGVyQ2h1bmsgPSB7fTtcclxuVEhSRUUuQkFTLlNoYWRlckNodW5rW1wiYW5pbWF0aW9uX3RpbWVcIl0gPSBcImZsb2F0IHREZWxheSA9IGFBbmltYXRpb24ueDtcXG5mbG9hdCB0RHVyYXRpb24gPSBhQW5pbWF0aW9uLnk7XFxuZmxvYXQgdFRpbWUgPSBjbGFtcCh1VGltZSAtIHREZWxheSwgMC4wLCB0RHVyYXRpb24pO1xcbmZsb2F0IHRQcm9ncmVzcyA9IGVhc2UodFRpbWUsIDAuMCwgMS4wLCB0RHVyYXRpb24pO1xcblwiO1xyXG5USFJFRS5CQVMuU2hhZGVyQ2h1bmtbXCJjdWJpY19iZXppZXJcIl0gPSBcInZlYzMgY3ViaWNCZXppZXIodmVjMyBwMCwgdmVjMyBjMCwgdmVjMyBjMSwgdmVjMyBwMSwgZmxvYXQgdClcXG57XFxuICAgIHZlYzMgdHA7XFxuICAgIGZsb2F0IHRuID0gMS4wIC0gdDtcXG5cXG4gICAgdHAueHl6ID0gdG4gKiB0biAqIHRuICogcDAueHl6ICsgMy4wICogdG4gKiB0biAqIHQgKiBjMC54eXogKyAzLjAgKiB0biAqIHQgKiB0ICogYzEueHl6ICsgdCAqIHQgKiB0ICogcDEueHl6O1xcblxcbiAgICByZXR1cm4gdHA7XFxufVxcblwiO1xyXG5USFJFRS5CQVMuU2hhZGVyQ2h1bmtbXCJlYXNlX2luX2N1YmljXCJdID0gXCJmbG9hdCBlYXNlKGZsb2F0IHQsIGZsb2F0IGIsIGZsb2F0IGMsIGZsb2F0IGQpIHtcXG4gIHJldHVybiBjKih0Lz1kKSp0KnQgKyBiO1xcbn1cXG5cIjtcclxuVEhSRUUuQkFTLlNoYWRlckNodW5rW1wiZWFzZV9pbl9xdWFkXCJdID0gXCJmbG9hdCBlYXNlKGZsb2F0IHQsIGZsb2F0IGIsIGZsb2F0IGMsIGZsb2F0IGQpIHtcXG4gIHJldHVybiBjKih0Lz1kKSp0ICsgYjtcXG59XFxuXCI7XHJcblRIUkVFLkJBUy5TaGFkZXJDaHVua1tcImVhc2Vfb3V0X2N1YmljXCJdID0gXCJmbG9hdCBlYXNlKGZsb2F0IHQsIGZsb2F0IGIsIGZsb2F0IGMsIGZsb2F0IGQpIHtcXG4gIHJldHVybiBjKigodD10L2QgLSAxLjApKnQqdCArIDEuMCkgKyBiO1xcbn1cXG5cIjtcclxuVEhSRUUuQkFTLlNoYWRlckNodW5rW1wicXVhdGVybmlvbl9yb3RhdGlvblwiXSA9IFwidmVjMyByb3RhdGVWZWN0b3IodmVjNCBxLCB2ZWMzIHYpXFxue1xcbiAgICByZXR1cm4gdiArIDIuMCAqIGNyb3NzKHEueHl6LCBjcm9zcyhxLnh5eiwgdikgKyBxLncgKiB2KTtcXG59XFxuXFxudmVjNCBxdWF0RnJvbUF4aXNBbmdsZSh2ZWMzIGF4aXMsIGZsb2F0IGFuZ2xlKVxcbntcXG4gICAgZmxvYXQgaGFsZkFuZ2xlID0gYW5nbGUgKiAwLjU7XFxuICAgIHJldHVybiB2ZWM0KGF4aXMueHl6ICogc2luKGhhbGZBbmdsZSksIGNvcyhoYWxmQW5nbGUpKTtcXG59XFxuXCI7XHJcblxyXG5USFJFRS5CQVMuUHJlZmFiQnVmZmVyR2VvbWV0cnkgPSBmdW5jdGlvbiAocHJlZmFiLCBjb3VudCkge1xyXG4gIFRIUkVFLkJ1ZmZlckdlb21ldHJ5LmNhbGwodGhpcyk7XHJcblxyXG4gIHRoaXMucHJlZmFiR2VvbWV0cnkgPSBwcmVmYWI7XHJcbiAgdGhpcy5wcmVmYWJDb3VudCA9IGNvdW50O1xyXG4gIHRoaXMucHJlZmFiVmVydGV4Q291bnQgPSBwcmVmYWIudmVydGljZXMubGVuZ3RoO1xyXG5cclxuICB0aGlzLmJ1ZmZlckRlZmF1bHRzKCk7XHJcbn07XHJcblRIUkVFLkJBUy5QcmVmYWJCdWZmZXJHZW9tZXRyeS5wcm90b3R5cGUgPSBPYmplY3QuY3JlYXRlKFRIUkVFLkJ1ZmZlckdlb21ldHJ5LnByb3RvdHlwZSk7XHJcblRIUkVFLkJBUy5QcmVmYWJCdWZmZXJHZW9tZXRyeS5wcm90b3R5cGUuY29uc3RydWN0b3IgPSBUSFJFRS5CQVMuUHJlZmFiQnVmZmVyR2VvbWV0cnk7XHJcblRIUkVFLkJBUy5QcmVmYWJCdWZmZXJHZW9tZXRyeS5wcm90b3R5cGUuYnVmZmVyRGVmYXVsdHMgPSBmdW5jdGlvbiAoKSB7XHJcbiAgdmFyIHByZWZhYkZhY2VDb3VudCA9IHRoaXMucHJlZmFiR2VvbWV0cnkuZmFjZXMubGVuZ3RoO1xyXG4gIHZhciBwcmVmYWJJbmRleENvdW50ID0gdGhpcy5wcmVmYWJHZW9tZXRyeS5mYWNlcy5sZW5ndGggKiAzO1xyXG4gIHZhciBwcmVmYWJWZXJ0ZXhDb3VudCA9IHRoaXMucHJlZmFiVmVydGV4Q291bnQgPSB0aGlzLnByZWZhYkdlb21ldHJ5LnZlcnRpY2VzLmxlbmd0aDtcclxuICB2YXIgcHJlZmFiSW5kaWNlcyA9IFtdO1xyXG5cclxuICBmb3IgKHZhciBoID0gMDsgaCA8IHByZWZhYkZhY2VDb3VudDsgaCsrKSB7XHJcbiAgICB2YXIgZmFjZSA9IHRoaXMucHJlZmFiR2VvbWV0cnkuZmFjZXNbaF07XHJcbiAgICBwcmVmYWJJbmRpY2VzLnB1c2goZmFjZS5hLCBmYWNlLmIsIGZhY2UuYyk7XHJcbiAgfVxyXG5cclxuICB2YXIgaW5kZXhCdWZmZXIgPSBuZXcgVWludDMyQXJyYXkodGhpcy5wcmVmYWJDb3VudCAqIHByZWZhYkluZGV4Q291bnQpO1xyXG4gIHZhciBwb3NpdGlvbkJ1ZmZlciA9IG5ldyBGbG9hdDMyQXJyYXkodGhpcy5wcmVmYWJDb3VudCAqIHByZWZhYlZlcnRleENvdW50ICogMyk7XHJcblxyXG4gIHRoaXMuc2V0SW5kZXgobmV3IFRIUkVFLkJ1ZmZlckF0dHJpYnV0ZShpbmRleEJ1ZmZlciwgMSkpO1xyXG4gIHRoaXMuYWRkQXR0cmlidXRlKCdwb3NpdGlvbicsIG5ldyBUSFJFRS5CdWZmZXJBdHRyaWJ1dGUocG9zaXRpb25CdWZmZXIsIDMpKTtcclxuXHJcbiAgZm9yICh2YXIgaSA9IDAsIG9mZnNldCA9IDA7IGkgPCB0aGlzLnByZWZhYkNvdW50OyBpKyspIHtcclxuICAgIGZvciAodmFyIGogPSAwOyBqIDwgcHJlZmFiVmVydGV4Q291bnQ7IGorKywgb2Zmc2V0ICs9IDMpIHtcclxuICAgICAgdmFyIHByZWZhYlZlcnRleCA9IHRoaXMucHJlZmFiR2VvbWV0cnkudmVydGljZXNbal07XHJcblxyXG4gICAgICBwb3NpdGlvbkJ1ZmZlcltvZmZzZXQgICAgXSA9IHByZWZhYlZlcnRleC54O1xyXG4gICAgICBwb3NpdGlvbkJ1ZmZlcltvZmZzZXQgKyAxXSA9IHByZWZhYlZlcnRleC55O1xyXG4gICAgICBwb3NpdGlvbkJ1ZmZlcltvZmZzZXQgKyAyXSA9IHByZWZhYlZlcnRleC56O1xyXG4gICAgfVxyXG5cclxuICAgIGZvciAodmFyIGsgPSAwOyBrIDwgcHJlZmFiSW5kZXhDb3VudDsgaysrKSB7XHJcbiAgICAgIGluZGV4QnVmZmVyW2kgKiBwcmVmYWJJbmRleENvdW50ICsga10gPSBwcmVmYWJJbmRpY2VzW2tdICsgaSAqIHByZWZhYlZlcnRleENvdW50O1xyXG4gICAgfVxyXG4gIH1cclxufTtcclxuXHJcbi8qKlxyXG4gKiBiYXNlZCBvbiBCdWZmZXJHZW9tZXRyeS5jb21wdXRlVmVydGV4Tm9ybWFsc1xyXG4gKiBjYWxjdWxhdGUgdmVydGV4IG5vcm1hbHMgZm9yIGEgcHJlZmFiLCBhbmQgcmVwZWF0IHRoZSBkYXRhIGluIHRoZSBub3JtYWwgYnVmZmVyXHJcbiAqL1xyXG5USFJFRS5CQVMuUHJlZmFiQnVmZmVyR2VvbWV0cnkucHJvdG90eXBlLmNvbXB1dGVWZXJ0ZXhOb3JtYWxzID0gZnVuY3Rpb24gKCkge1xyXG4gIHZhciBpbmRleCA9IHRoaXMuaW5kZXg7XHJcbiAgdmFyIGF0dHJpYnV0ZXMgPSB0aGlzLmF0dHJpYnV0ZXM7XHJcbiAgdmFyIHBvc2l0aW9ucyA9IGF0dHJpYnV0ZXMucG9zaXRpb24uYXJyYXk7XHJcblxyXG4gIGlmIChhdHRyaWJ1dGVzLm5vcm1hbCA9PT0gdW5kZWZpbmVkKSB7XHJcbiAgICB0aGlzLmFkZEF0dHJpYnV0ZSgnbm9ybWFsJywgbmV3IFRIUkVFLkJ1ZmZlckF0dHJpYnV0ZShuZXcgRmxvYXQzMkFycmF5KHBvc2l0aW9ucy5sZW5ndGgpLCAzKSk7XHJcbiAgfVxyXG5cclxuICB2YXIgbm9ybWFscyA9IGF0dHJpYnV0ZXMubm9ybWFsLmFycmF5O1xyXG5cclxuICB2YXIgdkEsIHZCLCB2QyxcclxuXHJcbiAgICBwQSA9IG5ldyBUSFJFRS5WZWN0b3IzKCksXHJcbiAgICBwQiA9IG5ldyBUSFJFRS5WZWN0b3IzKCksXHJcbiAgICBwQyA9IG5ldyBUSFJFRS5WZWN0b3IzKCksXHJcblxyXG4gICAgY2IgPSBuZXcgVEhSRUUuVmVjdG9yMygpLFxyXG4gICAgYWIgPSBuZXcgVEhSRUUuVmVjdG9yMygpO1xyXG5cclxuICB2YXIgaW5kaWNlcyA9IGluZGV4LmFycmF5O1xyXG4gIHZhciBwcmVmYWJJbmRleENvdW50ID0gdGhpcy5wcmVmYWJHZW9tZXRyeS5mYWNlcy5sZW5ndGggKiAzO1xyXG5cclxuICBmb3IgKHZhciBpID0gMDsgaSA8IHByZWZhYkluZGV4Q291bnQ7IGkgKz0gMykge1xyXG4gICAgdkEgPSBpbmRpY2VzW2kgKyAwXSAqIDM7XHJcbiAgICB2QiA9IGluZGljZXNbaSArIDFdICogMztcclxuICAgIHZDID0gaW5kaWNlc1tpICsgMl0gKiAzO1xyXG5cclxuICAgIHBBLmZyb21BcnJheShwb3NpdGlvbnMsIHZBKTtcclxuICAgIHBCLmZyb21BcnJheShwb3NpdGlvbnMsIHZCKTtcclxuICAgIHBDLmZyb21BcnJheShwb3NpdGlvbnMsIHZDKTtcclxuXHJcbiAgICBjYi5zdWJWZWN0b3JzKHBDLCBwQik7XHJcbiAgICBhYi5zdWJWZWN0b3JzKHBBLCBwQik7XHJcbiAgICBjYi5jcm9zcyhhYik7XHJcblxyXG4gICAgbm9ybWFsc1t2QV0gKz0gY2IueDtcclxuICAgIG5vcm1hbHNbdkEgKyAxXSArPSBjYi55O1xyXG4gICAgbm9ybWFsc1t2QSArIDJdICs9IGNiLno7XHJcblxyXG4gICAgbm9ybWFsc1t2Ql0gKz0gY2IueDtcclxuICAgIG5vcm1hbHNbdkIgKyAxXSArPSBjYi55O1xyXG4gICAgbm9ybWFsc1t2QiArIDJdICs9IGNiLno7XHJcblxyXG4gICAgbm9ybWFsc1t2Q10gKz0gY2IueDtcclxuICAgIG5vcm1hbHNbdkMgKyAxXSArPSBjYi55O1xyXG4gICAgbm9ybWFsc1t2QyArIDJdICs9IGNiLno7XHJcbiAgfVxyXG5cclxuICBmb3IgKHZhciBqID0gMTsgaiA8IHRoaXMucHJlZmFiQ291bnQ7IGorKykge1xyXG4gICAgZm9yICh2YXIgayA9IDA7IGsgPCBwcmVmYWJJbmRleENvdW50OyBrKyspIHtcclxuICAgICAgbm9ybWFsc1tqICogcHJlZmFiSW5kZXhDb3VudCArIGtdID0gbm9ybWFsc1trXTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIHRoaXMubm9ybWFsaXplTm9ybWFscygpO1xyXG5cclxuICBhdHRyaWJ1dGVzLm5vcm1hbC5uZWVkc1VwZGF0ZSA9IHRydWU7XHJcbn07XHJcblRIUkVFLkJBUy5QcmVmYWJCdWZmZXJHZW9tZXRyeS5wcm90b3R5cGUuY3JlYXRlQXR0cmlidXRlID0gZnVuY3Rpb24gKG5hbWUsIGl0ZW1TaXplKSB7XHJcbiAgdmFyIGJ1ZmZlciA9IG5ldyBGbG9hdDMyQXJyYXkodGhpcy5wcmVmYWJDb3VudCAqIHRoaXMucHJlZmFiVmVydGV4Q291bnQgKiBpdGVtU2l6ZSk7XHJcbiAgdmFyIGF0dHJpYnV0ZSA9IG5ldyBUSFJFRS5CdWZmZXJBdHRyaWJ1dGUoYnVmZmVyLCBpdGVtU2l6ZSk7XHJcblxyXG4gIHRoaXMuYWRkQXR0cmlidXRlKG5hbWUsIGF0dHJpYnV0ZSk7XHJcblxyXG4gIHJldHVybiBhdHRyaWJ1dGU7XHJcbn07XHJcblRIUkVFLkJBUy5QcmVmYWJCdWZmZXJHZW9tZXRyeS5wcm90b3R5cGUuc2V0QXR0cmlidXRlNCA9IGZ1bmN0aW9uIChuYW1lLCBkYXRhKSB7XHJcbiAgdmFyIG9mZnNldCA9IDA7XHJcbiAgdmFyIGFycmF5ID0gdGhpcy5nZW9tZXRyeS5hdHRyaWJ1dGVzW25hbWVdLmFycmF5O1xyXG4gIHZhciBpLCBqO1xyXG5cclxuICBmb3IgKGkgPSAwOyBpIDwgZGF0YS5sZW5ndGg7IGkrKykge1xyXG4gICAgdmFyIHYgPSBkYXRhW2ldO1xyXG5cclxuICAgIGZvciAoaiA9IDA7IGogPCB0aGlzLnByZWZhYlZlcnRleENvdW50OyBqKyspIHtcclxuICAgICAgYXJyYXlbb2Zmc2V0KytdID0gdi54O1xyXG4gICAgICBhcnJheVtvZmZzZXQrK10gPSB2Lnk7XHJcbiAgICAgIGFycmF5W29mZnNldCsrXSA9IHYuejtcclxuICAgICAgYXJyYXlbb2Zmc2V0KytdID0gdi53O1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgdGhpcy5nZW9tZXRyeS5hdHRyaWJ1dGVzW25hbWVdLm5lZWRzVXBkYXRlID0gdHJ1ZTtcclxufTtcclxuVEhSRUUuQkFTLlByZWZhYkJ1ZmZlckdlb21ldHJ5LnByb3RvdHlwZS5zZXRBdHRyaWJ1dGUzID0gZnVuY3Rpb24gKG5hbWUsIGRhdGEpIHtcclxuICB2YXIgb2Zmc2V0ID0gMDtcclxuICB2YXIgYXJyYXkgPSB0aGlzLmdlb21ldHJ5LmF0dHJpYnV0ZXNbbmFtZV0uYXJyYXk7XHJcbiAgdmFyIGksIGo7XHJcblxyXG4gIGZvciAoaSA9IDA7IGkgPCBkYXRhLmxlbmd0aDsgaSsrKSB7XHJcbiAgICB2YXIgdiA9IGRhdGFbaV07XHJcblxyXG4gICAgZm9yIChqID0gMDsgaiA8IHRoaXMucHJlZmFiVmVydGV4Q291bnQ7IGorKykge1xyXG4gICAgICBhcnJheVtvZmZzZXQrK10gPSB2Lng7XHJcbiAgICAgIGFycmF5W29mZnNldCsrXSA9IHYueTtcclxuICAgICAgYXJyYXlbb2Zmc2V0KytdID0gdi56O1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgdGhpcy5nZW9tZXRyeS5hdHRyaWJ1dGVzW25hbWVdLm5lZWRzVXBkYXRlID0gdHJ1ZTtcclxufTtcclxuVEhSRUUuQkFTLlByZWZhYkJ1ZmZlckdlb21ldHJ5LnByb3RvdHlwZS5zZXRBdHRyaWJ1dGUyID0gZnVuY3Rpb24gKG5hbWUsIGRhdGEpIHtcclxuICB2YXIgb2Zmc2V0ID0gMDtcclxuICB2YXIgYXJyYXkgPSB0aGlzLmdlb21ldHJ5LmF0dHJpYnV0ZXNbbmFtZV0uYXJyYXk7XHJcbiAgdmFyIGksIGo7XHJcblxyXG4gIGZvciAoaSA9IDA7IGkgPCB0aGlzLnByZWZhYkNvdW50OyBpKyspIHtcclxuICAgIHZhciB2ID0gZGF0YVtpXTtcclxuXHJcbiAgICBmb3IgKGogPSAwOyBqIDwgdGhpcy5wcmVmYWJWZXJ0ZXhDb3VudDsgaisrKSB7XHJcbiAgICAgIGFycmF5W29mZnNldCsrXSA9IHYueDtcclxuICAgICAgYXJyYXlbb2Zmc2V0KytdID0gdi55O1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgdGhpcy5nZW9tZXRyeS5hdHRyaWJ1dGVzW25hbWVdLm5lZWRzVXBkYXRlID0gdHJ1ZTtcclxufTtcclxuXHJcblRIUkVFLkJBUy5CYXNlQW5pbWF0aW9uTWF0ZXJpYWwgPSBmdW5jdGlvbihwYXJhbWV0ZXJzKSB7XHJcbiAgVEhSRUUuU2hhZGVyTWF0ZXJpYWwuY2FsbCh0aGlzKTtcclxuXHJcbiAgdGhpcy5zaGFkZXJGdW5jdGlvbnMgPSBbXTtcclxuICB0aGlzLnNoYWRlclBhcmFtZXRlcnMgPSBbXTtcclxuICB0aGlzLnNoYWRlclZlcnRleEluaXQgPSBbXTtcclxuICB0aGlzLnNoYWRlclRyYW5zZm9ybU5vcm1hbCA9IFtdO1xyXG4gIHRoaXMuc2hhZGVyVHJhbnNmb3JtUG9zaXRpb24gPSBbXTtcclxuXHJcbiAgdGhpcy5zZXRWYWx1ZXMocGFyYW1ldGVycyk7XHJcbn07XHJcblRIUkVFLkJBUy5CYXNlQW5pbWF0aW9uTWF0ZXJpYWwucHJvdG90eXBlID0gT2JqZWN0LmNyZWF0ZShUSFJFRS5TaGFkZXJNYXRlcmlhbC5wcm90b3R5cGUpO1xyXG5USFJFRS5CQVMuQmFzZUFuaW1hdGlvbk1hdGVyaWFsLnByb3RvdHlwZS5jb25zdHJ1Y3RvciA9IFRIUkVFLkJBUy5CYXNlQW5pbWF0aW9uTWF0ZXJpYWw7XHJcblxyXG4vLyBhYnN0cmFjdFxyXG5USFJFRS5CQVMuQmFzZUFuaW1hdGlvbk1hdGVyaWFsLnByb3RvdHlwZS5fY29uY2F0VmVydGV4U2hhZGVyID0gZnVuY3Rpb24oKSB7XHJcbiAgcmV0dXJuICcnO1xyXG59O1xyXG5USFJFRS5CQVMuQmFzZUFuaW1hdGlvbk1hdGVyaWFsLnByb3RvdHlwZS5fY29uY2F0RnVuY3Rpb25zID0gZnVuY3Rpb24oKSB7XHJcbiAgcmV0dXJuIHRoaXMuc2hhZGVyRnVuY3Rpb25zLmpvaW4oJ1xcbicpO1xyXG59O1xyXG5USFJFRS5CQVMuQmFzZUFuaW1hdGlvbk1hdGVyaWFsLnByb3RvdHlwZS5fY29uY2F0UGFyYW1ldGVycyA9IGZ1bmN0aW9uKCkge1xyXG4gIHJldHVybiB0aGlzLnNoYWRlclBhcmFtZXRlcnMuam9pbignXFxuJyk7XHJcbn07XHJcblRIUkVFLkJBUy5CYXNlQW5pbWF0aW9uTWF0ZXJpYWwucHJvdG90eXBlLl9jb25jYXRWZXJ0ZXhJbml0ID0gZnVuY3Rpb24oKSB7XHJcbiAgcmV0dXJuIHRoaXMuc2hhZGVyVmVydGV4SW5pdC5qb2luKCdcXG4nKTtcclxufTtcclxuVEhSRUUuQkFTLkJhc2VBbmltYXRpb25NYXRlcmlhbC5wcm90b3R5cGUuX2NvbmNhdFRyYW5zZm9ybU5vcm1hbCA9IGZ1bmN0aW9uKCkge1xyXG4gIHJldHVybiB0aGlzLnNoYWRlclRyYW5zZm9ybU5vcm1hbC5qb2luKCdcXG4nKTtcclxufTtcclxuVEhSRUUuQkFTLkJhc2VBbmltYXRpb25NYXRlcmlhbC5wcm90b3R5cGUuX2NvbmNhdFRyYW5zZm9ybVBvc2l0aW9uID0gZnVuY3Rpb24oKSB7XHJcbiAgcmV0dXJuIHRoaXMuc2hhZGVyVHJhbnNmb3JtUG9zaXRpb24uam9pbignXFxuJyk7XHJcbn07XHJcblRIUkVFLkJBUy5CYXNlQW5pbWF0aW9uTWF0ZXJpYWwucHJvdG90eXBlLnNldFVuaWZvcm1WYWx1ZXMgPSBmdW5jdGlvbih2YWx1ZXMpIHtcclxuICBmb3IgKHZhciBrZXkgaW4gdmFsdWVzKSB7XHJcbiAgICBpZiAoa2V5IGluIHRoaXMudW5pZm9ybXMpIHtcclxuICAgICAgdmFyIHVuaWZvcm0gPSB0aGlzLnVuaWZvcm1zW2tleV07XHJcbiAgICAgIHZhciB2YWx1ZSA9IHZhbHVlc1trZXldO1xyXG5cclxuICAgICAgLy8gdG9kbyBhZGQgbWF0cml4IHVuaWZvcm0gdHlwZXNcclxuICAgICAgc3dpdGNoICh1bmlmb3JtLnR5cGUpIHtcclxuICAgICAgICBjYXNlICdjJzogLy8gY29sb3JcclxuICAgICAgICAgIHVuaWZvcm0udmFsdWUuc2V0KHZhbHVlKTtcclxuICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgIGNhc2UgJ3YyJzogLy8gdmVjdG9yc1xyXG4gICAgICAgIGNhc2UgJ3YzJzpcclxuICAgICAgICBjYXNlICd2NCc6XHJcbiAgICAgICAgICB1bmlmb3JtLnZhbHVlLmNvcHkodmFsdWUpO1xyXG4gICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgY2FzZSAnZic6IC8vIGZsb2F0XHJcbiAgICAgICAgY2FzZSAndCc6IC8vIHRleHR1cmVcclxuICAgICAgICAgIHVuaWZvcm0udmFsdWUgPSB2YWx1ZTtcclxuICAgICAgfVxyXG4gICAgfVxyXG4gIH1cclxufTtcclxuXHJcblRIUkVFLkJBUy5QaG9uZ0FuaW1hdGlvbk1hdGVyaWFsID0gZnVuY3Rpb24ocGFyYW1ldGVycywgdW5pZm9ybVZhbHVlcykge1xyXG4gIFRIUkVFLkJBUy5CYXNlQW5pbWF0aW9uTWF0ZXJpYWwuY2FsbCh0aGlzLCBwYXJhbWV0ZXJzKTtcclxuXHJcbiAgdmFyIHBob25nU2hhZGVyID0gVEhSRUUuU2hhZGVyTGliWydwaG9uZyddO1xyXG5cclxuICB0aGlzLnVuaWZvcm1zID0gVEhSRUUuVW5pZm9ybXNVdGlscy5tZXJnZShbcGhvbmdTaGFkZXIudW5pZm9ybXMsIHRoaXMudW5pZm9ybXNdKTtcclxuICB0aGlzLmxpZ2h0cyA9IHRydWU7XHJcbiAgdGhpcy52ZXJ0ZXhTaGFkZXIgPSB0aGlzLl9jb25jYXRWZXJ0ZXhTaGFkZXIoKTtcclxuICB0aGlzLmZyYWdtZW50U2hhZGVyID0gcGhvbmdTaGFkZXIuZnJhZ21lbnRTaGFkZXI7XHJcblxyXG4gIC8vIHRvZG8gYWRkIG1pc3NpbmcgZGVmYXVsdCBkZWZpbmVzXHJcbiAgdW5pZm9ybVZhbHVlcy5tYXAgJiYgKHRoaXMuZGVmaW5lc1snVVNFX01BUCddID0gJycpO1xyXG4gIHVuaWZvcm1WYWx1ZXMubm9ybWFsTWFwICYmICh0aGlzLmRlZmluZXNbJ1VTRV9OT1JNQUxNQVAnXSA9ICcnKTtcclxuXHJcbiAgdGhpcy5zZXRVbmlmb3JtVmFsdWVzKHVuaWZvcm1WYWx1ZXMpO1xyXG59O1xyXG5USFJFRS5CQVMuUGhvbmdBbmltYXRpb25NYXRlcmlhbC5wcm90b3R5cGUgPSBPYmplY3QuY3JlYXRlKFRIUkVFLkJBUy5CYXNlQW5pbWF0aW9uTWF0ZXJpYWwucHJvdG90eXBlKTtcclxuVEhSRUUuQkFTLlBob25nQW5pbWF0aW9uTWF0ZXJpYWwucHJvdG90eXBlLmNvbnN0cnVjdG9yID0gVEhSRUUuQkFTLlBob25nQW5pbWF0aW9uTWF0ZXJpYWw7XHJcblRIUkVFLkJBUy5QaG9uZ0FuaW1hdGlvbk1hdGVyaWFsLnByb3RvdHlwZS5fY29uY2F0VmVydGV4U2hhZGVyID0gZnVuY3Rpb24oKSB7XHJcbiAgLy8gYmFzZWQgb24gVEhSRUUuU2hhZGVyTGliLnBob25nXHJcbiAgcmV0dXJuIFtcclxuICAgIFwiI2RlZmluZSBQSE9OR1wiLFxyXG5cclxuICAgIFwidmFyeWluZyB2ZWMzIHZWaWV3UG9zaXRpb247XCIsXHJcblxyXG4gICAgXCIjaWZuZGVmIEZMQVRfU0hBREVEXCIsXHJcblxyXG4gICAgXCJcdHZhcnlpbmcgdmVjMyB2Tm9ybWFsO1wiLFxyXG5cclxuICAgIFwiI2VuZGlmXCIsXHJcblxyXG4gICAgVEhSRUUuU2hhZGVyQ2h1bmtbIFwiY29tbW9uXCIgXSxcclxuICAgIFRIUkVFLlNoYWRlckNodW5rWyBcInV2X3BhcnNfdmVydGV4XCIgXSxcclxuICAgIFRIUkVFLlNoYWRlckNodW5rWyBcInV2Ml9wYXJzX3ZlcnRleFwiIF0sXHJcbiAgICBUSFJFRS5TaGFkZXJDaHVua1sgXCJkaXNwbGFjZW1lbnRtYXBfcGFyc192ZXJ0ZXhcIiBdLFxyXG4gICAgVEhSRUUuU2hhZGVyQ2h1bmtbIFwiZW52bWFwX3BhcnNfdmVydGV4XCIgXSxcclxuICAgIFRIUkVFLlNoYWRlckNodW5rWyBcImxpZ2h0c19waG9uZ19wYXJzX3ZlcnRleFwiIF0sXHJcbiAgICBUSFJFRS5TaGFkZXJDaHVua1sgXCJjb2xvcl9wYXJzX3ZlcnRleFwiIF0sXHJcbiAgICBUSFJFRS5TaGFkZXJDaHVua1sgXCJtb3JwaHRhcmdldF9wYXJzX3ZlcnRleFwiIF0sXHJcbiAgICBUSFJFRS5TaGFkZXJDaHVua1sgXCJza2lubmluZ19wYXJzX3ZlcnRleFwiIF0sXHJcbiAgICBUSFJFRS5TaGFkZXJDaHVua1sgXCJzaGFkb3dtYXBfcGFyc192ZXJ0ZXhcIiBdLFxyXG4gICAgVEhSRUUuU2hhZGVyQ2h1bmtbIFwibG9nZGVwdGhidWZfcGFyc192ZXJ0ZXhcIiBdLFxyXG5cclxuICAgIHRoaXMuX2NvbmNhdEZ1bmN0aW9ucygpLFxyXG5cclxuICAgIHRoaXMuX2NvbmNhdFBhcmFtZXRlcnMoKSxcclxuXHJcbiAgICBcInZvaWQgbWFpbigpIHtcIixcclxuXHJcbiAgICB0aGlzLl9jb25jYXRWZXJ0ZXhJbml0KCksXHJcblxyXG4gICAgVEhSRUUuU2hhZGVyQ2h1bmtbIFwidXZfdmVydGV4XCIgXSxcclxuICAgIFRIUkVFLlNoYWRlckNodW5rWyBcInV2Ml92ZXJ0ZXhcIiBdLFxyXG4gICAgVEhSRUUuU2hhZGVyQ2h1bmtbIFwiY29sb3JfdmVydGV4XCIgXSxcclxuICAgIFRIUkVFLlNoYWRlckNodW5rWyBcImJlZ2lubm9ybWFsX3ZlcnRleFwiIF0sXHJcblxyXG4gICAgdGhpcy5fY29uY2F0VHJhbnNmb3JtTm9ybWFsKCksXHJcblxyXG4gICAgVEhSRUUuU2hhZGVyQ2h1bmtbIFwibW9ycGhub3JtYWxfdmVydGV4XCIgXSxcclxuICAgIFRIUkVFLlNoYWRlckNodW5rWyBcInNraW5iYXNlX3ZlcnRleFwiIF0sXHJcbiAgICBUSFJFRS5TaGFkZXJDaHVua1sgXCJza2lubm9ybWFsX3ZlcnRleFwiIF0sXHJcbiAgICBUSFJFRS5TaGFkZXJDaHVua1sgXCJkZWZhdWx0bm9ybWFsX3ZlcnRleFwiIF0sXHJcblxyXG4gICAgXCIjaWZuZGVmIEZMQVRfU0hBREVEXCIsIC8vIE5vcm1hbCBjb21wdXRlZCB3aXRoIGRlcml2YXRpdmVzIHdoZW4gRkxBVF9TSEFERURcclxuXHJcbiAgICBcIlx0dk5vcm1hbCA9IG5vcm1hbGl6ZSggdHJhbnNmb3JtZWROb3JtYWwgKTtcIixcclxuXHJcbiAgICBcIiNlbmRpZlwiLFxyXG5cclxuICAgIFRIUkVFLlNoYWRlckNodW5rWyBcImJlZ2luX3ZlcnRleFwiIF0sXHJcblxyXG4gICAgdGhpcy5fY29uY2F0VHJhbnNmb3JtUG9zaXRpb24oKSxcclxuXHJcbiAgICBUSFJFRS5TaGFkZXJDaHVua1sgXCJkaXNwbGFjZW1lbnRtYXBfdmVydGV4XCIgXSxcclxuICAgIFRIUkVFLlNoYWRlckNodW5rWyBcIm1vcnBodGFyZ2V0X3ZlcnRleFwiIF0sXHJcbiAgICBUSFJFRS5TaGFkZXJDaHVua1sgXCJza2lubmluZ192ZXJ0ZXhcIiBdLFxyXG4gICAgVEhSRUUuU2hhZGVyQ2h1bmtbIFwicHJvamVjdF92ZXJ0ZXhcIiBdLFxyXG4gICAgVEhSRUUuU2hhZGVyQ2h1bmtbIFwibG9nZGVwdGhidWZfdmVydGV4XCIgXSxcclxuXHJcbiAgICBcIlx0dlZpZXdQb3NpdGlvbiA9IC0gbXZQb3NpdGlvbi54eXo7XCIsXHJcblxyXG4gICAgVEhSRUUuU2hhZGVyQ2h1bmtbIFwid29ybGRwb3NfdmVydGV4XCIgXSxcclxuICAgIFRIUkVFLlNoYWRlckNodW5rWyBcImVudm1hcF92ZXJ0ZXhcIiBdLFxyXG4gICAgVEhSRUUuU2hhZGVyQ2h1bmtbIFwibGlnaHRzX3Bob25nX3ZlcnRleFwiIF0sXHJcbiAgICBUSFJFRS5TaGFkZXJDaHVua1sgXCJzaGFkb3dtYXBfdmVydGV4XCIgXSxcclxuXHJcbiAgICBcIn1cIlxyXG5cclxuICBdLmpvaW4oIFwiXFxuXCIgKTtcclxufTsiXSwiZmlsZSI6ImFwcC5qcyJ9
