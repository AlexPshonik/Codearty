// Popup animation
$('.js-show-popup').on('click', function () {
  $('#homepage-bg-animation').css('display', 'none');
  anime({
    targets: '.pop-up',
    translateY: 0,
    opacity: 1,
    easing: 'linear',
    duration: 350
  });
  anime({
    targets: '.list-form .list-form__field',
    translateY: 0,
    opacity: 1,
    easing: 'linear',
    duration: 400,
    delay: 600
  });
  anime({
    targets: '.list-form .btn',
    translateY: 0,
    opacity: 1,
    easing: 'linear',
    duration: 400,
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
    duration: 200
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
    $(this).css('transform', 'translateY(12px)');
    $(this).css('font-size', '14px')
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
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiIiwic291cmNlcyI6WyJhcHAuanMiXSwic291cmNlc0NvbnRlbnQiOlsiLy8gUG9wdXAgYW5pbWF0aW9uXG4kKCcuanMtc2hvdy1wb3B1cCcpLm9uKCdjbGljaycsIGZ1bmN0aW9uICgpIHtcbiAgJCgnI2hvbWVwYWdlLWJnLWFuaW1hdGlvbicpLmNzcygnZGlzcGxheScsICdub25lJyk7XG4gIGFuaW1lKHtcbiAgICB0YXJnZXRzOiAnLnBvcC11cCcsXG4gICAgdHJhbnNsYXRlWTogMCxcbiAgICBvcGFjaXR5OiAxLFxuICAgIGVhc2luZzogJ2xpbmVhcicsXG4gICAgZHVyYXRpb246IDM1MFxuICB9KTtcbiAgYW5pbWUoe1xuICAgIHRhcmdldHM6ICcubGlzdC1mb3JtIC5saXN0LWZvcm1fX2ZpZWxkJyxcbiAgICB0cmFuc2xhdGVZOiAwLFxuICAgIG9wYWNpdHk6IDEsXG4gICAgZWFzaW5nOiAnbGluZWFyJyxcbiAgICBkdXJhdGlvbjogNDAwLFxuICAgIGRlbGF5OiA2MDBcbiAgfSk7XG4gIGFuaW1lKHtcbiAgICB0YXJnZXRzOiAnLmxpc3QtZm9ybSAuYnRuJyxcbiAgICB0cmFuc2xhdGVZOiAwLFxuICAgIG9wYWNpdHk6IDEsXG4gICAgZWFzaW5nOiAnbGluZWFyJyxcbiAgICBkdXJhdGlvbjogNDAwLFxuICAgIGRlbGF5OiAxMDAwXG4gIH0pO1xufSk7XG4kKCcuanMtcG9wdXAtY2xvc2UnKS5vbignY2xpY2snLCBmdW5jdGlvbiAoKSB7XG4gICQoJyNob21lcGFnZS1iZy1hbmltYXRpb24nKS5jc3MoJ2Rpc3BsYXknLCAnYmxvY2snKTtcbiAgYW5pbWUoe1xuICAgIHRhcmdldHM6ICcucG9wLXVwJyxcbiAgICB0cmFuc2xhdGVZOiAnLTEwMCUnLFxuICAgIG9wYWNpdHk6IDAsXG4gICAgZWFzaW5nOiAnbGluZWFyJyxcbiAgICBkdXJhdGlvbjogMjAwXG4gIH0pO1xuICBhbmltZSh7XG4gICAgdGFyZ2V0czogJy5saXN0LWZvcm0gLmxpc3QtZm9ybV9fZmllbGQnLFxuICAgIHRyYW5zbGF0ZVk6IC0xNTAsXG4gICAgb3BhY2l0eTogMC40LFxuICAgIGVhc2luZzogJ2xpbmVhcicsXG4gICAgZHVyYXRpb246IDUwMFxuICB9KTtcbiAgYW5pbWUoe1xuICAgIHRhcmdldHM6ICcubGlzdC1mb3JtIC5idG4nLFxuICAgIHRyYW5zbGF0ZVk6IDUwLFxuICAgIG9wYWNpdHk6IDAsXG4gICAgZWFzaW5nOiAnbGluZWFyJyxcbiAgICBkdXJhdGlvbjogNTAwXG4gIH0pO1xufSk7XG4kKGRvY3VtZW50KS5yZWFkeShmdW5jdGlvbiAoKSB7XG4gICQoJy5wb3AtdXAnKS5jc3MoJ3RyYW5zZm9ybScsICd0cmFuc2xhdGVZKC0xMDAlKScpO1xuICAkKCcucG9wLXVwJykuY3NzKCdvcGFjaXR5JywgJzEnKTtcbiAgJCgnLmxpc3QtZm9ybSAubGlzdC1mb3JtX19maWVsZCcpLmVhY2goZnVuY3Rpb24gKCkge1xuICAgICQodGhpcykuY3NzKCd0cmFuc2Zvcm0nLCAndHJhbnNsYXRlWSgtMTUwcHgpJyk7XG4gICAgJCh0aGlzKS5jc3MoJ29wYWNpdHknLCAnMC40Jyk7XG4gIH0pO1xuICAkKCcubGlzdC1mb3JtIC5idG4nKS5jc3MoJ3RyYW5zZm9ybScsICd0cmFuc2xhdGVZKDE1MHB4KScpO1xuICAkKCcubGlzdC1mb3JtIC5idG4nKS5jc3MoJ29wYWNpdHknLCAnMCcpO1xufSk7XG4vLyBGaWVsZCBsYWJlbCBhbmltYXRpb25cbiQoZG9jdW1lbnQpLnJlYWR5KGZ1bmN0aW9uICgpIHtcbiAgJCgnLmxpc3QtZm9ybSAubGlzdC1mb3JtX19sYWJlbCcpLmVhY2goZnVuY3Rpb24gKCkge1xuICAgICQodGhpcykuY3NzKCd0cmFuc2Zvcm0nLCAndHJhbnNsYXRlWSgxMnB4KScpO1xuICAgICQodGhpcykuY3NzKCdmb250LXNpemUnLCAnMTRweCcpXG4gIH0pO1xufSk7XG4kKCcubGlzdC1mb3JtIC5saXN0LWZvcm1fX2lucHV0JykuZm9jdXMoZnVuY3Rpb24gKCkge1xuICAkKHRoaXMpLnBhcmVudCgpLmFkZENsYXNzKCdmb2N1c2VkJyk7XG4gIGFuaW1lKHtcbiAgICB0YXJnZXRzOiAnLmxpc3QtZm9ybV9fZmllbGQuZm9jdXNlZCAubGlzdC1mb3JtX19sYWJlbCcsXG4gICAgdHJhbnNsYXRlWTogJy0xMnB4JyxcbiAgICBmb250U2l6ZTogMTIsXG4gICAgZWFzaW5nOiAnbGluZWFyJyxcbiAgICBkdXJhdGlvbjogMjAwXG4gIH0pO1xufSk7XG4kKCcubGlzdC1mb3JtIC5saXN0LWZvcm1fX2lucHV0JykuZm9jdXNvdXQoZnVuY3Rpb24gKCkge1xuICBpZigkKHRoaXMpLnZhbCgpKSB7XG4gICAgJCh0aGlzKS5wYXJlbnQoKS5hZGRDbGFzcygnZmlsbCcpO1xuICB9XG4gIGVsc2Uge1xuICAgIGFuaW1lKHtcbiAgICAgIHRhcmdldHM6ICcubGlzdC1mb3JtX19maWVsZC5mb2N1c2VkIC5saXN0LWZvcm1fX2xhYmVsJyxcbiAgICAgIHRyYW5zbGF0ZVk6ICcxNHB4JyxcbiAgICAgIGZvbnRTaXplOiAxNixcbiAgICAgIGVhc2luZzogJ2xpbmVhcicsXG4gICAgICBkdXJhdGlvbjogMjAwXG4gICAgfSk7XG4gICAgaWYoJCh0aGlzKS5wYXJlbnQoKS5oYXNDbGFzcygnZmlsbCcpKSB7XG4gICAgICAkKHRoaXMpLnBhcmVudCgpLnJlbW92ZUNsYXNzKCdmaWxsJylcbiAgICB9XG4gIH1cbiAgJCh0aGlzKS5wYXJlbnQoKS5yZW1vdmVDbGFzcygnZm9jdXNlZCcpO1xufSk7XG5cbi8vIEhvbWVwYWdlIGJnIGFuaW1hdGlvblxudmFyIG1Db250YWluZXI7XG52YXIgbUNhbWVyYSwgbVJlbmRlcmVyO1xudmFyIG1Db250cm9scztcbnZhciBtU2NlbmU7XG52YXIgbVBhcnRpY2xlQ291bnQgPSA4MDAwO1xudmFyIG1QYXJ0aWNsZVN5c3RlbTtcbnZhciBtVGltZSA9IDAuMDtcbnZhciBtVGltZVN0ZXAgPSAoMS8yNzApO1xudmFyIG1EdXJhdGlvbiA9IDIwO1xuXG53aW5kb3cub25sb2FkID0gZnVuY3Rpb24gKCkge1xuICBpbml0KCk7XG59O1xuXG5mdW5jdGlvbiBpbml0KCkge1xuICBpbml0VEhSRUUoKTtcbiAgaW5pdENvbnRyb2xzKCk7XG4gIGluaXRQYXJ0aWNsZVN5c3RlbSgpO1xuXG4gIHJlcXVlc3RBbmltYXRpb25GcmFtZSh0aWNrKTtcbiAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoJ3Jlc2l6ZScsIHJlc2l6ZSwgZmFsc2UpO1xufVxuZnVuY3Rpb24gaW5pdFRIUkVFKCkge1xuICBtUmVuZGVyZXIgPSBuZXcgVEhSRUUuV2ViR0xSZW5kZXJlcih7YW50aWFsaWFzOiB0cnVlfSk7XG4gIG1SZW5kZXJlci5zZXRTaXplKHdpbmRvdy5pbm5lcldpZHRoLCB3aW5kb3cuaW5uZXJIZWlnaHQpO1xuICBtUmVuZGVyZXIuc2V0Q2xlYXJDb2xvcigweDMwNGZmZSk7XG5cbiAgbUNvbnRhaW5lciA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdob21lcGFnZS1iZy1hbmltYXRpb24nKTtcbiAgbUNvbnRhaW5lci5hcHBlbmRDaGlsZChtUmVuZGVyZXIuZG9tRWxlbWVudCk7XG5cbiAgbUNhbWVyYSA9IG5ldyBUSFJFRS5QZXJzcGVjdGl2ZUNhbWVyYSg2MCwgd2luZG93LmlubmVyV2lkdGggLyB3aW5kb3cuaW5uZXJIZWlnaHQsIDAuMSwgNTAwMCk7XG4gIG1DYW1lcmEucG9zaXRpb24uc2V0KC0xMzAwLCAwLCAwKTtcblxuICBtU2NlbmUgPSBuZXcgVEhSRUUuU2NlbmUoKTtcblxuICB2YXIgbGlnaHQ7XG5cbiAgbGlnaHQgPSBuZXcgVEhSRUUuQW1iaWVudExpZ2h0KDB4ZmZmZmZmKTtcbiAgbVNjZW5lLmFkZChsaWdodCk7XG59XG5mdW5jdGlvbiBpbml0Q29udHJvbHMoKSB7XG4gIG1Db250cm9scyA9IG5ldyBUSFJFRS5PcmJpdENvbnRyb2xzKG1DYW1lcmEsIG1SZW5kZXJlci5kb21FbGVtZW50KTtcbn1cbmZ1bmN0aW9uIGluaXRQYXJ0aWNsZVN5c3RlbSgpIHtcbiAgdmFyIHByZWZhYkdlb21ldHJ5ID0gbmV3IFRIUkVFLlBsYW5lR2VvbWV0cnkoNCwgNCk7XG4gIHZhciBidWZmZXJHZW9tZXRyeSA9IG5ldyBUSFJFRS5CQVMuUHJlZmFiQnVmZmVyR2VvbWV0cnkocHJlZmFiR2VvbWV0cnksIG1QYXJ0aWNsZUNvdW50KTtcblxuICBidWZmZXJHZW9tZXRyeS5jb21wdXRlVmVydGV4Tm9ybWFscygpO1xuXG4gIC8vIGdlbmVyYXRlIGFkZGl0aW9uYWwgZ2VvbWV0cnkgZGF0YVxuICB2YXIgYU9mZnNldCA9IGJ1ZmZlckdlb21ldHJ5LmNyZWF0ZUF0dHJpYnV0ZSgnYU9mZnNldCcsIDEpO1xuICB2YXIgYVN0YXJ0UG9zaXRpb24gPSBidWZmZXJHZW9tZXRyeS5jcmVhdGVBdHRyaWJ1dGUoJ2FTdGFydFBvc2l0aW9uJywgMyk7XG4gIHZhciBhQ29udHJvbFBvaW50MSA9IGJ1ZmZlckdlb21ldHJ5LmNyZWF0ZUF0dHJpYnV0ZSgnYUNvbnRyb2xQb2ludDEnLCAzKTtcbiAgdmFyIGFDb250cm9sUG9pbnQyID0gYnVmZmVyR2VvbWV0cnkuY3JlYXRlQXR0cmlidXRlKCdhQ29udHJvbFBvaW50MicsIDMpO1xuICB2YXIgYUVuZFBvc2l0aW9uID0gYnVmZmVyR2VvbWV0cnkuY3JlYXRlQXR0cmlidXRlKCdhRW5kUG9zaXRpb24nLCAzKTtcbiAgdmFyIGFBeGlzQW5nbGUgPSBidWZmZXJHZW9tZXRyeS5jcmVhdGVBdHRyaWJ1dGUoJ2FBeGlzQW5nbGUnLCA0KTtcbiAgdmFyIGFDb2xvciA9IGJ1ZmZlckdlb21ldHJ5LmNyZWF0ZUF0dHJpYnV0ZSgnY29sb3InLCAzKTtcblxuICB2YXIgaSwgaiwgb2Zmc2V0O1xuXG4gIC8vIGJ1ZmZlciB0aW1lIG9mZnNldFxuICB2YXIgZGVsYXk7XG5cbiAgZm9yIChpID0gMCwgb2Zmc2V0ID0gMDsgaSA8IG1QYXJ0aWNsZUNvdW50OyBpKyspIHtcbiAgICBkZWxheSA9IGkgLyBtUGFydGljbGVDb3VudCAqIG1EdXJhdGlvbjtcblxuICAgIGZvciAoaiA9IDA7IGogPCBwcmVmYWJHZW9tZXRyeS52ZXJ0aWNlcy5sZW5ndGg7IGorKykge1xuICAgICAgYU9mZnNldC5hcnJheVtvZmZzZXQrK10gPSBkZWxheTtcbiAgICB9XG4gIH1cblxuICAvLyBidWZmZXIgc3RhcnQgcG9zaXRpb25zXG4gIHZhciB4LCB5LCB6O1xuXG4gIGZvciAoaSA9IDAsIG9mZnNldCA9IDA7IGkgPCBtUGFydGljbGVDb3VudDsgaSsrKSB7XG4gICAgeCA9IDA7XG4gICAgeSA9IDEwMDA7XG4gICAgeiA9IDA7XG5cbiAgICBmb3IgKGogPSAwOyBqIDwgcHJlZmFiR2VvbWV0cnkudmVydGljZXMubGVuZ3RoOyBqKyspIHtcbiAgICAgIGFTdGFydFBvc2l0aW9uLmFycmF5W29mZnNldCsrXSA9IHg7XG4gICAgICBhU3RhcnRQb3NpdGlvbi5hcnJheVtvZmZzZXQrK10gPSB5O1xuICAgICAgYVN0YXJ0UG9zaXRpb24uYXJyYXlbb2Zmc2V0KytdID0gejtcbiAgICB9XG4gIH1cblxuICAvLyBidWZmZXIgY29udHJvbCBwb2ludHNcblxuICBmb3IgKGkgPSAwLCBvZmZzZXQgPSAwOyBpIDwgbVBhcnRpY2xlQ291bnQ7IGkrKykge1xuICAgIHggPSBUSFJFRS5NYXRoLnJhbmRGbG9hdCgtNDAwLCA0MDApO1xuICAgIHkgPSBUSFJFRS5NYXRoLnJhbmRGbG9hdCg0MDAsIDYwMCk7XG4gICAgeiA9IFRIUkVFLk1hdGgucmFuZEZsb2F0KC0xODAwLCAtNDAwKTtcblxuICAgIGZvciAoaiA9IDA7IGogPCBwcmVmYWJHZW9tZXRyeS52ZXJ0aWNlcy5sZW5ndGg7IGorKykge1xuICAgICAgYUNvbnRyb2xQb2ludDEuYXJyYXlbb2Zmc2V0KytdID0geDtcbiAgICAgIGFDb250cm9sUG9pbnQxLmFycmF5W29mZnNldCsrXSA9IHk7XG4gICAgICBhQ29udHJvbFBvaW50MS5hcnJheVtvZmZzZXQrK10gPSB6O1xuICAgIH1cbiAgfVxuXG4gIGZvciAoaSA9IDAsIG9mZnNldCA9IDA7IGkgPCBtUGFydGljbGVDb3VudDsgaSsrKSB7XG4gICAgeCA9IFRIUkVFLk1hdGgucmFuZEZsb2F0KC00MDAsIDQwMCk7XG4gICAgeSA9IFRIUkVFLk1hdGgucmFuZEZsb2F0KC02MDAsIC00MDApO1xuICAgIHogPSBUSFJFRS5NYXRoLnJhbmRGbG9hdCg0MDAsIDE4MDApO1xuXG4gICAgZm9yIChqID0gMDsgaiA8IHByZWZhYkdlb21ldHJ5LnZlcnRpY2VzLmxlbmd0aDsgaisrKSB7XG4gICAgICBhQ29udHJvbFBvaW50Mi5hcnJheVtvZmZzZXQrK10gPSB4O1xuICAgICAgYUNvbnRyb2xQb2ludDIuYXJyYXlbb2Zmc2V0KytdID0geTtcbiAgICAgIGFDb250cm9sUG9pbnQyLmFycmF5W29mZnNldCsrXSA9IHo7XG4gICAgfVxuICB9XG5cbiAgLy8gYnVmZmVyIGVuZCBwb3NpdGlvbnNcblxuICBmb3IgKGkgPSAwLCBvZmZzZXQgPSAwOyBpIDwgbVBhcnRpY2xlQ291bnQ7IGkrKykge1xuICAgIHggPSAwO1xuICAgIHkgPSAtMTAwMDtcbiAgICB6ID0gMDtcblxuICAgIGZvciAoaiA9IDA7IGogPCBwcmVmYWJHZW9tZXRyeS52ZXJ0aWNlcy5sZW5ndGg7IGorKykge1xuICAgICAgYUVuZFBvc2l0aW9uLmFycmF5W29mZnNldCsrXSA9IHg7XG4gICAgICBhRW5kUG9zaXRpb24uYXJyYXlbb2Zmc2V0KytdID0geTtcbiAgICAgIGFFbmRQb3NpdGlvbi5hcnJheVtvZmZzZXQrK10gPSB6O1xuICAgIH1cbiAgfVxuXG4gIC8vIGJ1ZmZlciBheGlzIGFuZ2xlXG4gIHZhciBheGlzID0gbmV3IFRIUkVFLlZlY3RvcjMoKTtcbiAgdmFyIGFuZ2xlID0gMDtcblxuICBmb3IgKGkgPSAwLCBvZmZzZXQgPSAwOyBpIDwgbVBhcnRpY2xlQ291bnQ7IGkrKykge1xuICAgIGF4aXMueCA9IFRIUkVFLk1hdGgucmFuZEZsb2F0U3ByZWFkKDIpO1xuICAgIGF4aXMueSA9IFRIUkVFLk1hdGgucmFuZEZsb2F0U3ByZWFkKDIpO1xuICAgIGF4aXMueiA9IFRIUkVFLk1hdGgucmFuZEZsb2F0U3ByZWFkKDIpO1xuICAgIGF4aXMubm9ybWFsaXplKCk7XG5cbiAgICBhbmdsZSA9IE1hdGguUEkgKiBUSFJFRS5NYXRoLnJhbmRJbnQoMTYsIDMyKTtcblxuICAgIGZvciAoaiA9IDA7IGogPCBwcmVmYWJHZW9tZXRyeS52ZXJ0aWNlcy5sZW5ndGg7IGorKykge1xuICAgICAgYUF4aXNBbmdsZS5hcnJheVtvZmZzZXQrK10gPSBheGlzLng7XG4gICAgICBhQXhpc0FuZ2xlLmFycmF5W29mZnNldCsrXSA9IGF4aXMueTtcbiAgICAgIGFBeGlzQW5nbGUuYXJyYXlbb2Zmc2V0KytdID0gYXhpcy56O1xuICAgICAgYUF4aXNBbmdsZS5hcnJheVtvZmZzZXQrK10gPSBhbmdsZTtcbiAgICB9XG4gIH1cblxuICAvLyBidWZmZXIgY29sb3JcbiAgdmFyIGNvbG9yID0gbmV3IFRIUkVFLkNvbG9yKCk7XG4gIHZhciBoLCBzLCBsO1xuXG4gIGZvciAoaSA9IDAsIG9mZnNldCA9IDA7IGkgPCBtUGFydGljbGVDb3VudDsgaSsrKSB7XG4gICAgaCA9IDA7XG4gICAgcyA9IDA7XG4gICAgbCA9IDA7XG5cbiAgICBjb2xvci5zZXRIU0woaCwgcywgbCk7XG5cbiAgICBmb3IgKGogPSAwOyBqIDwgcHJlZmFiR2VvbWV0cnkudmVydGljZXMubGVuZ3RoOyBqKyspIHtcbiAgICAgIGFDb2xvci5hcnJheVtvZmZzZXQrK10gPSBjb2xvci5yO1xuICAgICAgYUNvbG9yLmFycmF5W29mZnNldCsrXSA9IGNvbG9yLmc7XG4gICAgICBhQ29sb3IuYXJyYXlbb2Zmc2V0KytdID0gY29sb3IuYjtcbiAgICB9XG4gIH1cblxuICB2YXIgbWF0ZXJpYWwgPSBuZXcgVEhSRUUuQkFTLlBob25nQW5pbWF0aW9uTWF0ZXJpYWwoXG4gICAgLy8gY3VzdG9tIHBhcmFtZXRlcnMgJiBUSFJFRS5NZXNoUGhvbmdNYXRlcmlhbCBwYXJhbWV0ZXJzXG4gICAge1xuICAgICAgdmVydGV4Q29sb3JzOiBUSFJFRS5WZXJ0ZXhDb2xvcnMsXG4gICAgICBzaGFkaW5nOiBUSFJFRS5GbGF0U2hhZGluZyxcbiAgICAgIHNpZGU6IFRIUkVFLkRvdWJsZVNpZGUsXG4gICAgICB1bmlmb3Jtczoge1xuICAgICAgICB1VGltZToge3R5cGU6ICdmJywgdmFsdWU6IDB9LFxuICAgICAgICB1RHVyYXRpb246IHt0eXBlOiAnZicsIHZhbHVlOiBtRHVyYXRpb259XG4gICAgICB9LFxuICAgICAgc2hhZGVyRnVuY3Rpb25zOiBbXG4gICAgICAgIFRIUkVFLkJBUy5TaGFkZXJDaHVua1sncXVhdGVybmlvbl9yb3RhdGlvbiddLFxuICAgICAgICBUSFJFRS5CQVMuU2hhZGVyQ2h1bmtbJ2N1YmljX2JlemllciddXG4gICAgICBdLFxuICAgICAgc2hhZGVyUGFyYW1ldGVyczogW1xuICAgICAgICAndW5pZm9ybSBmbG9hdCB1VGltZTsnLFxuICAgICAgICAndW5pZm9ybSBmbG9hdCB1RHVyYXRpb247JyxcbiAgICAgICAgJ2F0dHJpYnV0ZSBmbG9hdCBhT2Zmc2V0OycsXG4gICAgICAgICdhdHRyaWJ1dGUgdmVjMyBhU3RhcnRQb3NpdGlvbjsnLFxuICAgICAgICAnYXR0cmlidXRlIHZlYzMgYUNvbnRyb2xQb2ludDE7JyxcbiAgICAgICAgJ2F0dHJpYnV0ZSB2ZWMzIGFDb250cm9sUG9pbnQyOycsXG4gICAgICAgICdhdHRyaWJ1dGUgdmVjMyBhRW5kUG9zaXRpb247JyxcbiAgICAgICAgJ2F0dHJpYnV0ZSB2ZWM0IGFBeGlzQW5nbGU7J1xuICAgICAgXSxcbiAgICAgIHNoYWRlclZlcnRleEluaXQ6IFtcbiAgICAgICAgJ2Zsb2F0IHRQcm9ncmVzcyA9IG1vZCgodVRpbWUgKyBhT2Zmc2V0KSwgdUR1cmF0aW9uKSAvIHVEdXJhdGlvbjsnLFxuXG4gICAgICAgICdmbG9hdCBhbmdsZSA9IGFBeGlzQW5nbGUudyAqIHRQcm9ncmVzczsnLFxuICAgICAgICAndmVjNCB0UXVhdCA9IHF1YXRGcm9tQXhpc0FuZ2xlKGFBeGlzQW5nbGUueHl6LCBhbmdsZSk7J1xuICAgICAgXSxcbiAgICAgIHNoYWRlclRyYW5zZm9ybU5vcm1hbDogW1xuICAgICAgICAnb2JqZWN0Tm9ybWFsID0gcm90YXRlVmVjdG9yKHRRdWF0LCBvYmplY3ROb3JtYWwpOydcbiAgICAgIF0sXG4gICAgICBzaGFkZXJUcmFuc2Zvcm1Qb3NpdGlvbjogW1xuICAgICAgICAndHJhbnNmb3JtZWQgPSByb3RhdGVWZWN0b3IodFF1YXQsIHRyYW5zZm9ybWVkKTsnLFxuICAgICAgICAndHJhbnNmb3JtZWQgKz0gY3ViaWNCZXppZXIoYVN0YXJ0UG9zaXRpb24sIGFDb250cm9sUG9pbnQxLCBhQ29udHJvbFBvaW50MiwgYUVuZFBvc2l0aW9uLCB0UHJvZ3Jlc3MpOydcbiAgICAgIF1cbiAgICB9LFxuICAgIC8vIFRIUkVFLk1lc2hQaG9uZ01hdGVyaWFsIHVuaWZvcm1zXG4gICAge1xuICAgICAgc3BlY3VsYXI6IDB4ZmYwMDAwLFxuICAgICAgc2hpbmluZXNzOiAyMFxuICAgIH1cbiAgKTtcbiAgbVBhcnRpY2xlU3lzdGVtID0gbmV3IFRIUkVFLk1lc2goYnVmZmVyR2VvbWV0cnksIG1hdGVyaWFsKTtcbiAgLy8gYmVjYXVzZSB0aGUgYm91bmRpbmcgYm94IG9mIHRoZSBwYXJ0aWNsZSBzeXN0ZW0gZG9lcyBub3QgcmVmbGVjdCBpdHMgb24tc2NyZWVuIHNpemVcbiAgLy8gc2V0IHRoaXMgdG8gZmFsc2UgdG8gcHJldmVudCB0aGUgd2hvbGUgdGhpbmcgZnJvbSBkaXNhcHBlYXJpbmcgb24gY2VydGFpbiBhbmdsZXNcbiAgbVBhcnRpY2xlU3lzdGVtLmZydXN0dW1DdWxsZWQgPSBmYWxzZTtcbiAgbVNjZW5lLmFkZChtUGFydGljbGVTeXN0ZW0pO1xufVxuZnVuY3Rpb24gdGljaygpIHtcbiAgdXBkYXRlKCk7XG4gIHJlbmRlcigpO1xuXG4gIG1UaW1lICs9IG1UaW1lU3RlcDtcbiAgbVRpbWUgJT0gbUR1cmF0aW9uO1xuXG4gIHJlcXVlc3RBbmltYXRpb25GcmFtZSh0aWNrKTtcbn1cbmZ1bmN0aW9uIHVwZGF0ZSgpIHtcbiAgbUNvbnRyb2xzLnVwZGF0ZSgpO1xuICBtUGFydGljbGVTeXN0ZW0ubWF0ZXJpYWwudW5pZm9ybXNbJ3VUaW1lJ10udmFsdWUgPSBtVGltZTtcbn1cbmZ1bmN0aW9uIHJlbmRlcigpIHtcbiAgbVJlbmRlcmVyLnJlbmRlcihtU2NlbmUsIG1DYW1lcmEpO1xufVxuZnVuY3Rpb24gcmVzaXplKCkge1xuICBtQ2FtZXJhLmFzcGVjdCA9IHdpbmRvdy5pbm5lcldpZHRoIC8gd2luZG93LmlubmVySGVpZ2h0O1xuICBtQ2FtZXJhLnVwZGF0ZVByb2plY3Rpb25NYXRyaXgoKTtcblxuICBtUmVuZGVyZXIuc2V0U2l6ZSh3aW5kb3cuaW5uZXJXaWR0aCwgd2luZG93LmlubmVySGVpZ2h0KTtcbn1cblxuLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIGJ1ZmZlciBhbmltYXRpb24gc3lzdGVtXG4vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vL1xuXG5USFJFRS5CQVMgPSB7fTtcblRIUkVFLkJBUy5TaGFkZXJDaHVuayA9IHt9O1xuVEhSRUUuQkFTLlNoYWRlckNodW5rW1wiYW5pbWF0aW9uX3RpbWVcIl0gPSBcImZsb2F0IHREZWxheSA9IGFBbmltYXRpb24ueDtcXG5mbG9hdCB0RHVyYXRpb24gPSBhQW5pbWF0aW9uLnk7XFxuZmxvYXQgdFRpbWUgPSBjbGFtcCh1VGltZSAtIHREZWxheSwgMC4wLCB0RHVyYXRpb24pO1xcbmZsb2F0IHRQcm9ncmVzcyA9IGVhc2UodFRpbWUsIDAuMCwgMS4wLCB0RHVyYXRpb24pO1xcblwiO1xuVEhSRUUuQkFTLlNoYWRlckNodW5rW1wiY3ViaWNfYmV6aWVyXCJdID0gXCJ2ZWMzIGN1YmljQmV6aWVyKHZlYzMgcDAsIHZlYzMgYzAsIHZlYzMgYzEsIHZlYzMgcDEsIGZsb2F0IHQpXFxue1xcbiAgICB2ZWMzIHRwO1xcbiAgICBmbG9hdCB0biA9IDEuMCAtIHQ7XFxuXFxuICAgIHRwLnh5eiA9IHRuICogdG4gKiB0biAqIHAwLnh5eiArIDMuMCAqIHRuICogdG4gKiB0ICogYzAueHl6ICsgMy4wICogdG4gKiB0ICogdCAqIGMxLnh5eiArIHQgKiB0ICogdCAqIHAxLnh5ejtcXG5cXG4gICAgcmV0dXJuIHRwO1xcbn1cXG5cIjtcblRIUkVFLkJBUy5TaGFkZXJDaHVua1tcImVhc2VfaW5fY3ViaWNcIl0gPSBcImZsb2F0IGVhc2UoZmxvYXQgdCwgZmxvYXQgYiwgZmxvYXQgYywgZmxvYXQgZCkge1xcbiAgcmV0dXJuIGMqKHQvPWQpKnQqdCArIGI7XFxufVxcblwiO1xuVEhSRUUuQkFTLlNoYWRlckNodW5rW1wiZWFzZV9pbl9xdWFkXCJdID0gXCJmbG9hdCBlYXNlKGZsb2F0IHQsIGZsb2F0IGIsIGZsb2F0IGMsIGZsb2F0IGQpIHtcXG4gIHJldHVybiBjKih0Lz1kKSp0ICsgYjtcXG59XFxuXCI7XG5USFJFRS5CQVMuU2hhZGVyQ2h1bmtbXCJlYXNlX291dF9jdWJpY1wiXSA9IFwiZmxvYXQgZWFzZShmbG9hdCB0LCBmbG9hdCBiLCBmbG9hdCBjLCBmbG9hdCBkKSB7XFxuICByZXR1cm4gYyooKHQ9dC9kIC0gMS4wKSp0KnQgKyAxLjApICsgYjtcXG59XFxuXCI7XG5USFJFRS5CQVMuU2hhZGVyQ2h1bmtbXCJxdWF0ZXJuaW9uX3JvdGF0aW9uXCJdID0gXCJ2ZWMzIHJvdGF0ZVZlY3Rvcih2ZWM0IHEsIHZlYzMgdilcXG57XFxuICAgIHJldHVybiB2ICsgMi4wICogY3Jvc3MocS54eXosIGNyb3NzKHEueHl6LCB2KSArIHEudyAqIHYpO1xcbn1cXG5cXG52ZWM0IHF1YXRGcm9tQXhpc0FuZ2xlKHZlYzMgYXhpcywgZmxvYXQgYW5nbGUpXFxue1xcbiAgICBmbG9hdCBoYWxmQW5nbGUgPSBhbmdsZSAqIDAuNTtcXG4gICAgcmV0dXJuIHZlYzQoYXhpcy54eXogKiBzaW4oaGFsZkFuZ2xlKSwgY29zKGhhbGZBbmdsZSkpO1xcbn1cXG5cIjtcblxuVEhSRUUuQkFTLlByZWZhYkJ1ZmZlckdlb21ldHJ5ID0gZnVuY3Rpb24gKHByZWZhYiwgY291bnQpIHtcbiAgVEhSRUUuQnVmZmVyR2VvbWV0cnkuY2FsbCh0aGlzKTtcblxuICB0aGlzLnByZWZhYkdlb21ldHJ5ID0gcHJlZmFiO1xuICB0aGlzLnByZWZhYkNvdW50ID0gY291bnQ7XG4gIHRoaXMucHJlZmFiVmVydGV4Q291bnQgPSBwcmVmYWIudmVydGljZXMubGVuZ3RoO1xuXG4gIHRoaXMuYnVmZmVyRGVmYXVsdHMoKTtcbn07XG5USFJFRS5CQVMuUHJlZmFiQnVmZmVyR2VvbWV0cnkucHJvdG90eXBlID0gT2JqZWN0LmNyZWF0ZShUSFJFRS5CdWZmZXJHZW9tZXRyeS5wcm90b3R5cGUpO1xuVEhSRUUuQkFTLlByZWZhYkJ1ZmZlckdlb21ldHJ5LnByb3RvdHlwZS5jb25zdHJ1Y3RvciA9IFRIUkVFLkJBUy5QcmVmYWJCdWZmZXJHZW9tZXRyeTtcblRIUkVFLkJBUy5QcmVmYWJCdWZmZXJHZW9tZXRyeS5wcm90b3R5cGUuYnVmZmVyRGVmYXVsdHMgPSBmdW5jdGlvbiAoKSB7XG4gIHZhciBwcmVmYWJGYWNlQ291bnQgPSB0aGlzLnByZWZhYkdlb21ldHJ5LmZhY2VzLmxlbmd0aDtcbiAgdmFyIHByZWZhYkluZGV4Q291bnQgPSB0aGlzLnByZWZhYkdlb21ldHJ5LmZhY2VzLmxlbmd0aCAqIDM7XG4gIHZhciBwcmVmYWJWZXJ0ZXhDb3VudCA9IHRoaXMucHJlZmFiVmVydGV4Q291bnQgPSB0aGlzLnByZWZhYkdlb21ldHJ5LnZlcnRpY2VzLmxlbmd0aDtcbiAgdmFyIHByZWZhYkluZGljZXMgPSBbXTtcblxuICBmb3IgKHZhciBoID0gMDsgaCA8IHByZWZhYkZhY2VDb3VudDsgaCsrKSB7XG4gICAgdmFyIGZhY2UgPSB0aGlzLnByZWZhYkdlb21ldHJ5LmZhY2VzW2hdO1xuICAgIHByZWZhYkluZGljZXMucHVzaChmYWNlLmEsIGZhY2UuYiwgZmFjZS5jKTtcbiAgfVxuXG4gIHZhciBpbmRleEJ1ZmZlciA9IG5ldyBVaW50MzJBcnJheSh0aGlzLnByZWZhYkNvdW50ICogcHJlZmFiSW5kZXhDb3VudCk7XG4gIHZhciBwb3NpdGlvbkJ1ZmZlciA9IG5ldyBGbG9hdDMyQXJyYXkodGhpcy5wcmVmYWJDb3VudCAqIHByZWZhYlZlcnRleENvdW50ICogMyk7XG5cbiAgdGhpcy5zZXRJbmRleChuZXcgVEhSRUUuQnVmZmVyQXR0cmlidXRlKGluZGV4QnVmZmVyLCAxKSk7XG4gIHRoaXMuYWRkQXR0cmlidXRlKCdwb3NpdGlvbicsIG5ldyBUSFJFRS5CdWZmZXJBdHRyaWJ1dGUocG9zaXRpb25CdWZmZXIsIDMpKTtcblxuICBmb3IgKHZhciBpID0gMCwgb2Zmc2V0ID0gMDsgaSA8IHRoaXMucHJlZmFiQ291bnQ7IGkrKykge1xuICAgIGZvciAodmFyIGogPSAwOyBqIDwgcHJlZmFiVmVydGV4Q291bnQ7IGorKywgb2Zmc2V0ICs9IDMpIHtcbiAgICAgIHZhciBwcmVmYWJWZXJ0ZXggPSB0aGlzLnByZWZhYkdlb21ldHJ5LnZlcnRpY2VzW2pdO1xuXG4gICAgICBwb3NpdGlvbkJ1ZmZlcltvZmZzZXQgICAgXSA9IHByZWZhYlZlcnRleC54O1xuICAgICAgcG9zaXRpb25CdWZmZXJbb2Zmc2V0ICsgMV0gPSBwcmVmYWJWZXJ0ZXgueTtcbiAgICAgIHBvc2l0aW9uQnVmZmVyW29mZnNldCArIDJdID0gcHJlZmFiVmVydGV4Lno7XG4gICAgfVxuXG4gICAgZm9yICh2YXIgayA9IDA7IGsgPCBwcmVmYWJJbmRleENvdW50OyBrKyspIHtcbiAgICAgIGluZGV4QnVmZmVyW2kgKiBwcmVmYWJJbmRleENvdW50ICsga10gPSBwcmVmYWJJbmRpY2VzW2tdICsgaSAqIHByZWZhYlZlcnRleENvdW50O1xuICAgIH1cbiAgfVxufTtcblxuLyoqXG4gKiBiYXNlZCBvbiBCdWZmZXJHZW9tZXRyeS5jb21wdXRlVmVydGV4Tm9ybWFsc1xuICogY2FsY3VsYXRlIHZlcnRleCBub3JtYWxzIGZvciBhIHByZWZhYiwgYW5kIHJlcGVhdCB0aGUgZGF0YSBpbiB0aGUgbm9ybWFsIGJ1ZmZlclxuICovXG5USFJFRS5CQVMuUHJlZmFiQnVmZmVyR2VvbWV0cnkucHJvdG90eXBlLmNvbXB1dGVWZXJ0ZXhOb3JtYWxzID0gZnVuY3Rpb24gKCkge1xuICB2YXIgaW5kZXggPSB0aGlzLmluZGV4O1xuICB2YXIgYXR0cmlidXRlcyA9IHRoaXMuYXR0cmlidXRlcztcbiAgdmFyIHBvc2l0aW9ucyA9IGF0dHJpYnV0ZXMucG9zaXRpb24uYXJyYXk7XG5cbiAgaWYgKGF0dHJpYnV0ZXMubm9ybWFsID09PSB1bmRlZmluZWQpIHtcbiAgICB0aGlzLmFkZEF0dHJpYnV0ZSgnbm9ybWFsJywgbmV3IFRIUkVFLkJ1ZmZlckF0dHJpYnV0ZShuZXcgRmxvYXQzMkFycmF5KHBvc2l0aW9ucy5sZW5ndGgpLCAzKSk7XG4gIH1cblxuICB2YXIgbm9ybWFscyA9IGF0dHJpYnV0ZXMubm9ybWFsLmFycmF5O1xuXG4gIHZhciB2QSwgdkIsIHZDLFxuXG4gICAgcEEgPSBuZXcgVEhSRUUuVmVjdG9yMygpLFxuICAgIHBCID0gbmV3IFRIUkVFLlZlY3RvcjMoKSxcbiAgICBwQyA9IG5ldyBUSFJFRS5WZWN0b3IzKCksXG5cbiAgICBjYiA9IG5ldyBUSFJFRS5WZWN0b3IzKCksXG4gICAgYWIgPSBuZXcgVEhSRUUuVmVjdG9yMygpO1xuXG4gIHZhciBpbmRpY2VzID0gaW5kZXguYXJyYXk7XG4gIHZhciBwcmVmYWJJbmRleENvdW50ID0gdGhpcy5wcmVmYWJHZW9tZXRyeS5mYWNlcy5sZW5ndGggKiAzO1xuXG4gIGZvciAodmFyIGkgPSAwOyBpIDwgcHJlZmFiSW5kZXhDb3VudDsgaSArPSAzKSB7XG4gICAgdkEgPSBpbmRpY2VzW2kgKyAwXSAqIDM7XG4gICAgdkIgPSBpbmRpY2VzW2kgKyAxXSAqIDM7XG4gICAgdkMgPSBpbmRpY2VzW2kgKyAyXSAqIDM7XG5cbiAgICBwQS5mcm9tQXJyYXkocG9zaXRpb25zLCB2QSk7XG4gICAgcEIuZnJvbUFycmF5KHBvc2l0aW9ucywgdkIpO1xuICAgIHBDLmZyb21BcnJheShwb3NpdGlvbnMsIHZDKTtcblxuICAgIGNiLnN1YlZlY3RvcnMocEMsIHBCKTtcbiAgICBhYi5zdWJWZWN0b3JzKHBBLCBwQik7XG4gICAgY2IuY3Jvc3MoYWIpO1xuXG4gICAgbm9ybWFsc1t2QV0gKz0gY2IueDtcbiAgICBub3JtYWxzW3ZBICsgMV0gKz0gY2IueTtcbiAgICBub3JtYWxzW3ZBICsgMl0gKz0gY2IuejtcblxuICAgIG5vcm1hbHNbdkJdICs9IGNiLng7XG4gICAgbm9ybWFsc1t2QiArIDFdICs9IGNiLnk7XG4gICAgbm9ybWFsc1t2QiArIDJdICs9IGNiLno7XG5cbiAgICBub3JtYWxzW3ZDXSArPSBjYi54O1xuICAgIG5vcm1hbHNbdkMgKyAxXSArPSBjYi55O1xuICAgIG5vcm1hbHNbdkMgKyAyXSArPSBjYi56O1xuICB9XG5cbiAgZm9yICh2YXIgaiA9IDE7IGogPCB0aGlzLnByZWZhYkNvdW50OyBqKyspIHtcbiAgICBmb3IgKHZhciBrID0gMDsgayA8IHByZWZhYkluZGV4Q291bnQ7IGsrKykge1xuICAgICAgbm9ybWFsc1tqICogcHJlZmFiSW5kZXhDb3VudCArIGtdID0gbm9ybWFsc1trXTtcbiAgICB9XG4gIH1cblxuICB0aGlzLm5vcm1hbGl6ZU5vcm1hbHMoKTtcblxuICBhdHRyaWJ1dGVzLm5vcm1hbC5uZWVkc1VwZGF0ZSA9IHRydWU7XG59O1xuVEhSRUUuQkFTLlByZWZhYkJ1ZmZlckdlb21ldHJ5LnByb3RvdHlwZS5jcmVhdGVBdHRyaWJ1dGUgPSBmdW5jdGlvbiAobmFtZSwgaXRlbVNpemUpIHtcbiAgdmFyIGJ1ZmZlciA9IG5ldyBGbG9hdDMyQXJyYXkodGhpcy5wcmVmYWJDb3VudCAqIHRoaXMucHJlZmFiVmVydGV4Q291bnQgKiBpdGVtU2l6ZSk7XG4gIHZhciBhdHRyaWJ1dGUgPSBuZXcgVEhSRUUuQnVmZmVyQXR0cmlidXRlKGJ1ZmZlciwgaXRlbVNpemUpO1xuXG4gIHRoaXMuYWRkQXR0cmlidXRlKG5hbWUsIGF0dHJpYnV0ZSk7XG5cbiAgcmV0dXJuIGF0dHJpYnV0ZTtcbn07XG5USFJFRS5CQVMuUHJlZmFiQnVmZmVyR2VvbWV0cnkucHJvdG90eXBlLnNldEF0dHJpYnV0ZTQgPSBmdW5jdGlvbiAobmFtZSwgZGF0YSkge1xuICB2YXIgb2Zmc2V0ID0gMDtcbiAgdmFyIGFycmF5ID0gdGhpcy5nZW9tZXRyeS5hdHRyaWJ1dGVzW25hbWVdLmFycmF5O1xuICB2YXIgaSwgajtcblxuICBmb3IgKGkgPSAwOyBpIDwgZGF0YS5sZW5ndGg7IGkrKykge1xuICAgIHZhciB2ID0gZGF0YVtpXTtcblxuICAgIGZvciAoaiA9IDA7IGogPCB0aGlzLnByZWZhYlZlcnRleENvdW50OyBqKyspIHtcbiAgICAgIGFycmF5W29mZnNldCsrXSA9IHYueDtcbiAgICAgIGFycmF5W29mZnNldCsrXSA9IHYueTtcbiAgICAgIGFycmF5W29mZnNldCsrXSA9IHYuejtcbiAgICAgIGFycmF5W29mZnNldCsrXSA9IHYudztcbiAgICB9XG4gIH1cblxuICB0aGlzLmdlb21ldHJ5LmF0dHJpYnV0ZXNbbmFtZV0ubmVlZHNVcGRhdGUgPSB0cnVlO1xufTtcblRIUkVFLkJBUy5QcmVmYWJCdWZmZXJHZW9tZXRyeS5wcm90b3R5cGUuc2V0QXR0cmlidXRlMyA9IGZ1bmN0aW9uIChuYW1lLCBkYXRhKSB7XG4gIHZhciBvZmZzZXQgPSAwO1xuICB2YXIgYXJyYXkgPSB0aGlzLmdlb21ldHJ5LmF0dHJpYnV0ZXNbbmFtZV0uYXJyYXk7XG4gIHZhciBpLCBqO1xuXG4gIGZvciAoaSA9IDA7IGkgPCBkYXRhLmxlbmd0aDsgaSsrKSB7XG4gICAgdmFyIHYgPSBkYXRhW2ldO1xuXG4gICAgZm9yIChqID0gMDsgaiA8IHRoaXMucHJlZmFiVmVydGV4Q291bnQ7IGorKykge1xuICAgICAgYXJyYXlbb2Zmc2V0KytdID0gdi54O1xuICAgICAgYXJyYXlbb2Zmc2V0KytdID0gdi55O1xuICAgICAgYXJyYXlbb2Zmc2V0KytdID0gdi56O1xuICAgIH1cbiAgfVxuXG4gIHRoaXMuZ2VvbWV0cnkuYXR0cmlidXRlc1tuYW1lXS5uZWVkc1VwZGF0ZSA9IHRydWU7XG59O1xuVEhSRUUuQkFTLlByZWZhYkJ1ZmZlckdlb21ldHJ5LnByb3RvdHlwZS5zZXRBdHRyaWJ1dGUyID0gZnVuY3Rpb24gKG5hbWUsIGRhdGEpIHtcbiAgdmFyIG9mZnNldCA9IDA7XG4gIHZhciBhcnJheSA9IHRoaXMuZ2VvbWV0cnkuYXR0cmlidXRlc1tuYW1lXS5hcnJheTtcbiAgdmFyIGksIGo7XG5cbiAgZm9yIChpID0gMDsgaSA8IHRoaXMucHJlZmFiQ291bnQ7IGkrKykge1xuICAgIHZhciB2ID0gZGF0YVtpXTtcblxuICAgIGZvciAoaiA9IDA7IGogPCB0aGlzLnByZWZhYlZlcnRleENvdW50OyBqKyspIHtcbiAgICAgIGFycmF5W29mZnNldCsrXSA9IHYueDtcbiAgICAgIGFycmF5W29mZnNldCsrXSA9IHYueTtcbiAgICB9XG4gIH1cblxuICB0aGlzLmdlb21ldHJ5LmF0dHJpYnV0ZXNbbmFtZV0ubmVlZHNVcGRhdGUgPSB0cnVlO1xufTtcblxuVEhSRUUuQkFTLkJhc2VBbmltYXRpb25NYXRlcmlhbCA9IGZ1bmN0aW9uKHBhcmFtZXRlcnMpIHtcbiAgVEhSRUUuU2hhZGVyTWF0ZXJpYWwuY2FsbCh0aGlzKTtcblxuICB0aGlzLnNoYWRlckZ1bmN0aW9ucyA9IFtdO1xuICB0aGlzLnNoYWRlclBhcmFtZXRlcnMgPSBbXTtcbiAgdGhpcy5zaGFkZXJWZXJ0ZXhJbml0ID0gW107XG4gIHRoaXMuc2hhZGVyVHJhbnNmb3JtTm9ybWFsID0gW107XG4gIHRoaXMuc2hhZGVyVHJhbnNmb3JtUG9zaXRpb24gPSBbXTtcblxuICB0aGlzLnNldFZhbHVlcyhwYXJhbWV0ZXJzKTtcbn07XG5USFJFRS5CQVMuQmFzZUFuaW1hdGlvbk1hdGVyaWFsLnByb3RvdHlwZSA9IE9iamVjdC5jcmVhdGUoVEhSRUUuU2hhZGVyTWF0ZXJpYWwucHJvdG90eXBlKTtcblRIUkVFLkJBUy5CYXNlQW5pbWF0aW9uTWF0ZXJpYWwucHJvdG90eXBlLmNvbnN0cnVjdG9yID0gVEhSRUUuQkFTLkJhc2VBbmltYXRpb25NYXRlcmlhbDtcblxuLy8gYWJzdHJhY3RcblRIUkVFLkJBUy5CYXNlQW5pbWF0aW9uTWF0ZXJpYWwucHJvdG90eXBlLl9jb25jYXRWZXJ0ZXhTaGFkZXIgPSBmdW5jdGlvbigpIHtcbiAgcmV0dXJuICcnO1xufTtcblRIUkVFLkJBUy5CYXNlQW5pbWF0aW9uTWF0ZXJpYWwucHJvdG90eXBlLl9jb25jYXRGdW5jdGlvbnMgPSBmdW5jdGlvbigpIHtcbiAgcmV0dXJuIHRoaXMuc2hhZGVyRnVuY3Rpb25zLmpvaW4oJ1xcbicpO1xufTtcblRIUkVFLkJBUy5CYXNlQW5pbWF0aW9uTWF0ZXJpYWwucHJvdG90eXBlLl9jb25jYXRQYXJhbWV0ZXJzID0gZnVuY3Rpb24oKSB7XG4gIHJldHVybiB0aGlzLnNoYWRlclBhcmFtZXRlcnMuam9pbignXFxuJyk7XG59O1xuVEhSRUUuQkFTLkJhc2VBbmltYXRpb25NYXRlcmlhbC5wcm90b3R5cGUuX2NvbmNhdFZlcnRleEluaXQgPSBmdW5jdGlvbigpIHtcbiAgcmV0dXJuIHRoaXMuc2hhZGVyVmVydGV4SW5pdC5qb2luKCdcXG4nKTtcbn07XG5USFJFRS5CQVMuQmFzZUFuaW1hdGlvbk1hdGVyaWFsLnByb3RvdHlwZS5fY29uY2F0VHJhbnNmb3JtTm9ybWFsID0gZnVuY3Rpb24oKSB7XG4gIHJldHVybiB0aGlzLnNoYWRlclRyYW5zZm9ybU5vcm1hbC5qb2luKCdcXG4nKTtcbn07XG5USFJFRS5CQVMuQmFzZUFuaW1hdGlvbk1hdGVyaWFsLnByb3RvdHlwZS5fY29uY2F0VHJhbnNmb3JtUG9zaXRpb24gPSBmdW5jdGlvbigpIHtcbiAgcmV0dXJuIHRoaXMuc2hhZGVyVHJhbnNmb3JtUG9zaXRpb24uam9pbignXFxuJyk7XG59O1xuVEhSRUUuQkFTLkJhc2VBbmltYXRpb25NYXRlcmlhbC5wcm90b3R5cGUuc2V0VW5pZm9ybVZhbHVlcyA9IGZ1bmN0aW9uKHZhbHVlcykge1xuICBmb3IgKHZhciBrZXkgaW4gdmFsdWVzKSB7XG4gICAgaWYgKGtleSBpbiB0aGlzLnVuaWZvcm1zKSB7XG4gICAgICB2YXIgdW5pZm9ybSA9IHRoaXMudW5pZm9ybXNba2V5XTtcbiAgICAgIHZhciB2YWx1ZSA9IHZhbHVlc1trZXldO1xuXG4gICAgICAvLyB0b2RvIGFkZCBtYXRyaXggdW5pZm9ybSB0eXBlc1xuICAgICAgc3dpdGNoICh1bmlmb3JtLnR5cGUpIHtcbiAgICAgICAgY2FzZSAnYyc6IC8vIGNvbG9yXG4gICAgICAgICAgdW5pZm9ybS52YWx1ZS5zZXQodmFsdWUpO1xuICAgICAgICAgIGJyZWFrO1xuICAgICAgICBjYXNlICd2Mic6IC8vIHZlY3RvcnNcbiAgICAgICAgY2FzZSAndjMnOlxuICAgICAgICBjYXNlICd2NCc6XG4gICAgICAgICAgdW5pZm9ybS52YWx1ZS5jb3B5KHZhbHVlKTtcbiAgICAgICAgICBicmVhaztcbiAgICAgICAgY2FzZSAnZic6IC8vIGZsb2F0XG4gICAgICAgIGNhc2UgJ3QnOiAvLyB0ZXh0dXJlXG4gICAgICAgICAgdW5pZm9ybS52YWx1ZSA9IHZhbHVlO1xuICAgICAgfVxuICAgIH1cbiAgfVxufTtcblxuVEhSRUUuQkFTLlBob25nQW5pbWF0aW9uTWF0ZXJpYWwgPSBmdW5jdGlvbihwYXJhbWV0ZXJzLCB1bmlmb3JtVmFsdWVzKSB7XG4gIFRIUkVFLkJBUy5CYXNlQW5pbWF0aW9uTWF0ZXJpYWwuY2FsbCh0aGlzLCBwYXJhbWV0ZXJzKTtcblxuICB2YXIgcGhvbmdTaGFkZXIgPSBUSFJFRS5TaGFkZXJMaWJbJ3Bob25nJ107XG5cbiAgdGhpcy51bmlmb3JtcyA9IFRIUkVFLlVuaWZvcm1zVXRpbHMubWVyZ2UoW3Bob25nU2hhZGVyLnVuaWZvcm1zLCB0aGlzLnVuaWZvcm1zXSk7XG4gIHRoaXMubGlnaHRzID0gdHJ1ZTtcbiAgdGhpcy52ZXJ0ZXhTaGFkZXIgPSB0aGlzLl9jb25jYXRWZXJ0ZXhTaGFkZXIoKTtcbiAgdGhpcy5mcmFnbWVudFNoYWRlciA9IHBob25nU2hhZGVyLmZyYWdtZW50U2hhZGVyO1xuXG4gIC8vIHRvZG8gYWRkIG1pc3NpbmcgZGVmYXVsdCBkZWZpbmVzXG4gIHVuaWZvcm1WYWx1ZXMubWFwICYmICh0aGlzLmRlZmluZXNbJ1VTRV9NQVAnXSA9ICcnKTtcbiAgdW5pZm9ybVZhbHVlcy5ub3JtYWxNYXAgJiYgKHRoaXMuZGVmaW5lc1snVVNFX05PUk1BTE1BUCddID0gJycpO1xuXG4gIHRoaXMuc2V0VW5pZm9ybVZhbHVlcyh1bmlmb3JtVmFsdWVzKTtcbn07XG5USFJFRS5CQVMuUGhvbmdBbmltYXRpb25NYXRlcmlhbC5wcm90b3R5cGUgPSBPYmplY3QuY3JlYXRlKFRIUkVFLkJBUy5CYXNlQW5pbWF0aW9uTWF0ZXJpYWwucHJvdG90eXBlKTtcblRIUkVFLkJBUy5QaG9uZ0FuaW1hdGlvbk1hdGVyaWFsLnByb3RvdHlwZS5jb25zdHJ1Y3RvciA9IFRIUkVFLkJBUy5QaG9uZ0FuaW1hdGlvbk1hdGVyaWFsO1xuVEhSRUUuQkFTLlBob25nQW5pbWF0aW9uTWF0ZXJpYWwucHJvdG90eXBlLl9jb25jYXRWZXJ0ZXhTaGFkZXIgPSBmdW5jdGlvbigpIHtcbiAgLy8gYmFzZWQgb24gVEhSRUUuU2hhZGVyTGliLnBob25nXG4gIHJldHVybiBbXG4gICAgXCIjZGVmaW5lIFBIT05HXCIsXG5cbiAgICBcInZhcnlpbmcgdmVjMyB2Vmlld1Bvc2l0aW9uO1wiLFxuXG4gICAgXCIjaWZuZGVmIEZMQVRfU0hBREVEXCIsXG5cbiAgICBcIlx0dmFyeWluZyB2ZWMzIHZOb3JtYWw7XCIsXG5cbiAgICBcIiNlbmRpZlwiLFxuXG4gICAgVEhSRUUuU2hhZGVyQ2h1bmtbIFwiY29tbW9uXCIgXSxcbiAgICBUSFJFRS5TaGFkZXJDaHVua1sgXCJ1dl9wYXJzX3ZlcnRleFwiIF0sXG4gICAgVEhSRUUuU2hhZGVyQ2h1bmtbIFwidXYyX3BhcnNfdmVydGV4XCIgXSxcbiAgICBUSFJFRS5TaGFkZXJDaHVua1sgXCJkaXNwbGFjZW1lbnRtYXBfcGFyc192ZXJ0ZXhcIiBdLFxuICAgIFRIUkVFLlNoYWRlckNodW5rWyBcImVudm1hcF9wYXJzX3ZlcnRleFwiIF0sXG4gICAgVEhSRUUuU2hhZGVyQ2h1bmtbIFwibGlnaHRzX3Bob25nX3BhcnNfdmVydGV4XCIgXSxcbiAgICBUSFJFRS5TaGFkZXJDaHVua1sgXCJjb2xvcl9wYXJzX3ZlcnRleFwiIF0sXG4gICAgVEhSRUUuU2hhZGVyQ2h1bmtbIFwibW9ycGh0YXJnZXRfcGFyc192ZXJ0ZXhcIiBdLFxuICAgIFRIUkVFLlNoYWRlckNodW5rWyBcInNraW5uaW5nX3BhcnNfdmVydGV4XCIgXSxcbiAgICBUSFJFRS5TaGFkZXJDaHVua1sgXCJzaGFkb3dtYXBfcGFyc192ZXJ0ZXhcIiBdLFxuICAgIFRIUkVFLlNoYWRlckNodW5rWyBcImxvZ2RlcHRoYnVmX3BhcnNfdmVydGV4XCIgXSxcblxuICAgIHRoaXMuX2NvbmNhdEZ1bmN0aW9ucygpLFxuXG4gICAgdGhpcy5fY29uY2F0UGFyYW1ldGVycygpLFxuXG4gICAgXCJ2b2lkIG1haW4oKSB7XCIsXG5cbiAgICB0aGlzLl9jb25jYXRWZXJ0ZXhJbml0KCksXG5cbiAgICBUSFJFRS5TaGFkZXJDaHVua1sgXCJ1dl92ZXJ0ZXhcIiBdLFxuICAgIFRIUkVFLlNoYWRlckNodW5rWyBcInV2Ml92ZXJ0ZXhcIiBdLFxuICAgIFRIUkVFLlNoYWRlckNodW5rWyBcImNvbG9yX3ZlcnRleFwiIF0sXG4gICAgVEhSRUUuU2hhZGVyQ2h1bmtbIFwiYmVnaW5ub3JtYWxfdmVydGV4XCIgXSxcblxuICAgIHRoaXMuX2NvbmNhdFRyYW5zZm9ybU5vcm1hbCgpLFxuXG4gICAgVEhSRUUuU2hhZGVyQ2h1bmtbIFwibW9ycGhub3JtYWxfdmVydGV4XCIgXSxcbiAgICBUSFJFRS5TaGFkZXJDaHVua1sgXCJza2luYmFzZV92ZXJ0ZXhcIiBdLFxuICAgIFRIUkVFLlNoYWRlckNodW5rWyBcInNraW5ub3JtYWxfdmVydGV4XCIgXSxcbiAgICBUSFJFRS5TaGFkZXJDaHVua1sgXCJkZWZhdWx0bm9ybWFsX3ZlcnRleFwiIF0sXG5cbiAgICBcIiNpZm5kZWYgRkxBVF9TSEFERURcIiwgLy8gTm9ybWFsIGNvbXB1dGVkIHdpdGggZGVyaXZhdGl2ZXMgd2hlbiBGTEFUX1NIQURFRFxuXG4gICAgXCJcdHZOb3JtYWwgPSBub3JtYWxpemUoIHRyYW5zZm9ybWVkTm9ybWFsICk7XCIsXG5cbiAgICBcIiNlbmRpZlwiLFxuXG4gICAgVEhSRUUuU2hhZGVyQ2h1bmtbIFwiYmVnaW5fdmVydGV4XCIgXSxcblxuICAgIHRoaXMuX2NvbmNhdFRyYW5zZm9ybVBvc2l0aW9uKCksXG5cbiAgICBUSFJFRS5TaGFkZXJDaHVua1sgXCJkaXNwbGFjZW1lbnRtYXBfdmVydGV4XCIgXSxcbiAgICBUSFJFRS5TaGFkZXJDaHVua1sgXCJtb3JwaHRhcmdldF92ZXJ0ZXhcIiBdLFxuICAgIFRIUkVFLlNoYWRlckNodW5rWyBcInNraW5uaW5nX3ZlcnRleFwiIF0sXG4gICAgVEhSRUUuU2hhZGVyQ2h1bmtbIFwicHJvamVjdF92ZXJ0ZXhcIiBdLFxuICAgIFRIUkVFLlNoYWRlckNodW5rWyBcImxvZ2RlcHRoYnVmX3ZlcnRleFwiIF0sXG5cbiAgICBcIlx0dlZpZXdQb3NpdGlvbiA9IC0gbXZQb3NpdGlvbi54eXo7XCIsXG5cbiAgICBUSFJFRS5TaGFkZXJDaHVua1sgXCJ3b3JsZHBvc192ZXJ0ZXhcIiBdLFxuICAgIFRIUkVFLlNoYWRlckNodW5rWyBcImVudm1hcF92ZXJ0ZXhcIiBdLFxuICAgIFRIUkVFLlNoYWRlckNodW5rWyBcImxpZ2h0c19waG9uZ192ZXJ0ZXhcIiBdLFxuICAgIFRIUkVFLlNoYWRlckNodW5rWyBcInNoYWRvd21hcF92ZXJ0ZXhcIiBdLFxuXG4gICAgXCJ9XCJcblxuICBdLmpvaW4oIFwiXFxuXCIgKTtcbn07Il0sImZpbGUiOiJhcHAuanMifQ==
