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
    targets: '.pop-up__bg',
    opacity: 1,
    easing: 'linear',
    duration: 300,
    delay: 500
  });
  anime({
    targets: ['.pop-up__title', '.pop-up__subtitle'],
    opacity: 1,
    easing: 'linear',
    duration: 200,
    delay: 800
  });
  anime({
    targets: '.list-form .list-form__field',
    translateY: 0,
    opacity: 1,
    easing: 'linear',
    duration: 400,
    delay: 700
  });
  anime({
    targets: '.list-form .btn',
    opacity: 1,
    easing: 'linear',
    duration: 400,
    delay: 1100
  });
});
$('.js-popup-close').on('click', function () {
  $('#homepage-bg-animation').css('display', 'block');
  anime({
    targets: '.pop-up',
    translateY: '100%',
    opacity: 0,
    easing: 'linear',
    delay: 600,
    duration: 200
  });
  anime({
    targets: ['.pop-up__title', '.pop-up__subtitle'],
    opacity: 0,
    easing: 'linear',
    duration: 200
  });
  anime({
    targets: '.list-form .list-form__field',
    opacity: 0,
    easing: 'linear',
    duration: 300
  });
  anime({
    targets: '.list-form .btn',
    opacity: 0,
    easing: 'linear',
    duration: 300
  });
});
$(document).ready(function () {
  $('.pop-up').css('transform', 'translateY(100%)');
  $('.pop-up').css('opacity', '1');
  $(['.pop-up__title', '.pop-up__subtitle', '.list-form .list-form__field', '.list-form .btn'].join(", ")).css('opacity', '0');
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
  mRenderer.setSize($('.wrapper').width(), $('.wrapper').height());
  mRenderer.setClearColor(0x304ffe);

  mContainer = document.getElementById('homepage-bg-animation');
  mContainer.appendChild(mRenderer.domElement);

  mCamera = new THREE.PerspectiveCamera(60, $('.wrapper').width() / $('.wrapper').height(), 0.1, 5000);
  mCamera.position.set(-1300, 0, 0);

  mScene = new THREE.Scene();

  var light;

  light = new THREE.AmbientLight(0xffffff);
  mScene.add(light);
}
function initControls() {
  mControls = new THREE.OrbitControls(mCamera, mRenderer.domElement);
  mControls.enabled = false;
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
  let width = $('.wrapper').width(),
      height = $('.wrapper').height();

  mCamera.aspect = width / height;
  mCamera.updateProjectionMatrix();

  mRenderer.setSize(width, height);
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
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiIiwic291cmNlcyI6WyJhcHAuanMiXSwic291cmNlc0NvbnRlbnQiOlsiLy8gUG9wdXAgYW5pbWF0aW9uXG4kKCcuanMtc2hvdy1wb3B1cCcpLm9uKCdjbGljaycsIGZ1bmN0aW9uICgpIHtcbiAgJCgnI2hvbWVwYWdlLWJnLWFuaW1hdGlvbicpLmNzcygnZGlzcGxheScsICdub25lJyk7XG4gIGFuaW1lKHtcbiAgICB0YXJnZXRzOiAnLnBvcC11cCcsXG4gICAgdHJhbnNsYXRlWTogMCxcbiAgICBvcGFjaXR5OiAxLFxuICAgIGVhc2luZzogJ2xpbmVhcicsXG4gICAgZHVyYXRpb246IDM1MFxuICB9KTtcbiAgYW5pbWUoe1xuICAgIHRhcmdldHM6ICcucG9wLXVwX19iZycsXG4gICAgb3BhY2l0eTogMSxcbiAgICBlYXNpbmc6ICdsaW5lYXInLFxuICAgIGR1cmF0aW9uOiAzMDAsXG4gICAgZGVsYXk6IDUwMFxuICB9KTtcbiAgYW5pbWUoe1xuICAgIHRhcmdldHM6IFsnLnBvcC11cF9fdGl0bGUnLCAnLnBvcC11cF9fc3VidGl0bGUnXSxcbiAgICBvcGFjaXR5OiAxLFxuICAgIGVhc2luZzogJ2xpbmVhcicsXG4gICAgZHVyYXRpb246IDIwMCxcbiAgICBkZWxheTogODAwXG4gIH0pO1xuICBhbmltZSh7XG4gICAgdGFyZ2V0czogJy5saXN0LWZvcm0gLmxpc3QtZm9ybV9fZmllbGQnLFxuICAgIHRyYW5zbGF0ZVk6IDAsXG4gICAgb3BhY2l0eTogMSxcbiAgICBlYXNpbmc6ICdsaW5lYXInLFxuICAgIGR1cmF0aW9uOiA0MDAsXG4gICAgZGVsYXk6IDcwMFxuICB9KTtcbiAgYW5pbWUoe1xuICAgIHRhcmdldHM6ICcubGlzdC1mb3JtIC5idG4nLFxuICAgIG9wYWNpdHk6IDEsXG4gICAgZWFzaW5nOiAnbGluZWFyJyxcbiAgICBkdXJhdGlvbjogNDAwLFxuICAgIGRlbGF5OiAxMTAwXG4gIH0pO1xufSk7XG4kKCcuanMtcG9wdXAtY2xvc2UnKS5vbignY2xpY2snLCBmdW5jdGlvbiAoKSB7XG4gICQoJyNob21lcGFnZS1iZy1hbmltYXRpb24nKS5jc3MoJ2Rpc3BsYXknLCAnYmxvY2snKTtcbiAgYW5pbWUoe1xuICAgIHRhcmdldHM6ICcucG9wLXVwJyxcbiAgICB0cmFuc2xhdGVZOiAnMTAwJScsXG4gICAgb3BhY2l0eTogMCxcbiAgICBlYXNpbmc6ICdsaW5lYXInLFxuICAgIGRlbGF5OiA2MDAsXG4gICAgZHVyYXRpb246IDIwMFxuICB9KTtcbiAgYW5pbWUoe1xuICAgIHRhcmdldHM6IFsnLnBvcC11cF9fdGl0bGUnLCAnLnBvcC11cF9fc3VidGl0bGUnXSxcbiAgICBvcGFjaXR5OiAwLFxuICAgIGVhc2luZzogJ2xpbmVhcicsXG4gICAgZHVyYXRpb246IDIwMFxuICB9KTtcbiAgYW5pbWUoe1xuICAgIHRhcmdldHM6ICcubGlzdC1mb3JtIC5saXN0LWZvcm1fX2ZpZWxkJyxcbiAgICBvcGFjaXR5OiAwLFxuICAgIGVhc2luZzogJ2xpbmVhcicsXG4gICAgZHVyYXRpb246IDMwMFxuICB9KTtcbiAgYW5pbWUoe1xuICAgIHRhcmdldHM6ICcubGlzdC1mb3JtIC5idG4nLFxuICAgIG9wYWNpdHk6IDAsXG4gICAgZWFzaW5nOiAnbGluZWFyJyxcbiAgICBkdXJhdGlvbjogMzAwXG4gIH0pO1xufSk7XG4kKGRvY3VtZW50KS5yZWFkeShmdW5jdGlvbiAoKSB7XG4gICQoJy5wb3AtdXAnKS5jc3MoJ3RyYW5zZm9ybScsICd0cmFuc2xhdGVZKDEwMCUpJyk7XG4gICQoJy5wb3AtdXAnKS5jc3MoJ29wYWNpdHknLCAnMScpO1xuICAkKFsnLnBvcC11cF9fdGl0bGUnLCAnLnBvcC11cF9fc3VidGl0bGUnLCAnLmxpc3QtZm9ybSAubGlzdC1mb3JtX19maWVsZCcsICcubGlzdC1mb3JtIC5idG4nXS5qb2luKFwiLCBcIikpLmNzcygnb3BhY2l0eScsICcwJyk7XG59KTtcbi8vIEZpZWxkIGxhYmVsIGFuaW1hdGlvblxuJChkb2N1bWVudCkucmVhZHkoZnVuY3Rpb24gKCkge1xuICAkKCcubGlzdC1mb3JtIC5saXN0LWZvcm1fX2xhYmVsJykuZWFjaChmdW5jdGlvbiAoKSB7XG4gICAgJCh0aGlzKS5jc3MoJ3RyYW5zZm9ybScsICd0cmFuc2xhdGVZKDEycHgpJyk7XG4gICAgJCh0aGlzKS5jc3MoJ2ZvbnQtc2l6ZScsICcxNHB4JylcbiAgfSk7XG59KTtcbiQoJy5saXN0LWZvcm0gLmxpc3QtZm9ybV9faW5wdXQnKS5mb2N1cyhmdW5jdGlvbiAoKSB7XG4gICQodGhpcykucGFyZW50KCkuYWRkQ2xhc3MoJ2ZvY3VzZWQnKTtcbiAgYW5pbWUoe1xuICAgIHRhcmdldHM6ICcubGlzdC1mb3JtX19maWVsZC5mb2N1c2VkIC5saXN0LWZvcm1fX2xhYmVsJyxcbiAgICB0cmFuc2xhdGVZOiAnLTEycHgnLFxuICAgIGZvbnRTaXplOiAxMixcbiAgICBlYXNpbmc6ICdsaW5lYXInLFxuICAgIGR1cmF0aW9uOiAyMDBcbiAgfSk7XG59KTtcbiQoJy5saXN0LWZvcm0gLmxpc3QtZm9ybV9faW5wdXQnKS5mb2N1c291dChmdW5jdGlvbiAoKSB7XG4gIGlmKCQodGhpcykudmFsKCkpIHtcbiAgICAkKHRoaXMpLnBhcmVudCgpLmFkZENsYXNzKCdmaWxsJyk7XG4gIH1cbiAgZWxzZSB7XG4gICAgYW5pbWUoe1xuICAgICAgdGFyZ2V0czogJy5saXN0LWZvcm1fX2ZpZWxkLmZvY3VzZWQgLmxpc3QtZm9ybV9fbGFiZWwnLFxuICAgICAgdHJhbnNsYXRlWTogJzE0cHgnLFxuICAgICAgZm9udFNpemU6IDE2LFxuICAgICAgZWFzaW5nOiAnbGluZWFyJyxcbiAgICAgIGR1cmF0aW9uOiAyMDBcbiAgICB9KTtcbiAgICBpZigkKHRoaXMpLnBhcmVudCgpLmhhc0NsYXNzKCdmaWxsJykpIHtcbiAgICAgICQodGhpcykucGFyZW50KCkucmVtb3ZlQ2xhc3MoJ2ZpbGwnKVxuICAgIH1cbiAgfVxuICAkKHRoaXMpLnBhcmVudCgpLnJlbW92ZUNsYXNzKCdmb2N1c2VkJyk7XG59KTtcblxuLy8gSG9tZXBhZ2UgYmcgYW5pbWF0aW9uXG52YXIgbUNvbnRhaW5lcjtcbnZhciBtQ2FtZXJhLCBtUmVuZGVyZXI7XG52YXIgbUNvbnRyb2xzO1xudmFyIG1TY2VuZTtcbnZhciBtUGFydGljbGVDb3VudCA9IDgwMDA7XG52YXIgbVBhcnRpY2xlU3lzdGVtO1xudmFyIG1UaW1lID0gMC4wO1xudmFyIG1UaW1lU3RlcCA9ICgxLzI3MCk7XG52YXIgbUR1cmF0aW9uID0gMjA7XG5cbndpbmRvdy5vbmxvYWQgPSBmdW5jdGlvbiAoKSB7XG4gIGluaXQoKTtcbn07XG5cbmZ1bmN0aW9uIGluaXQoKSB7XG4gIGluaXRUSFJFRSgpO1xuICBpbml0Q29udHJvbHMoKTtcbiAgaW5pdFBhcnRpY2xlU3lzdGVtKCk7XG5cbiAgcmVxdWVzdEFuaW1hdGlvbkZyYW1lKHRpY2spO1xuICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcigncmVzaXplJywgcmVzaXplLCBmYWxzZSk7XG59XG5mdW5jdGlvbiBpbml0VEhSRUUoKSB7XG4gIG1SZW5kZXJlciA9IG5ldyBUSFJFRS5XZWJHTFJlbmRlcmVyKHthbnRpYWxpYXM6IHRydWV9KTtcbiAgbVJlbmRlcmVyLnNldFNpemUoJCgnLndyYXBwZXInKS53aWR0aCgpLCAkKCcud3JhcHBlcicpLmhlaWdodCgpKTtcbiAgbVJlbmRlcmVyLnNldENsZWFyQ29sb3IoMHgzMDRmZmUpO1xuXG4gIG1Db250YWluZXIgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnaG9tZXBhZ2UtYmctYW5pbWF0aW9uJyk7XG4gIG1Db250YWluZXIuYXBwZW5kQ2hpbGQobVJlbmRlcmVyLmRvbUVsZW1lbnQpO1xuXG4gIG1DYW1lcmEgPSBuZXcgVEhSRUUuUGVyc3BlY3RpdmVDYW1lcmEoNjAsICQoJy53cmFwcGVyJykud2lkdGgoKSAvICQoJy53cmFwcGVyJykuaGVpZ2h0KCksIDAuMSwgNTAwMCk7XG4gIG1DYW1lcmEucG9zaXRpb24uc2V0KC0xMzAwLCAwLCAwKTtcblxuICBtU2NlbmUgPSBuZXcgVEhSRUUuU2NlbmUoKTtcblxuICB2YXIgbGlnaHQ7XG5cbiAgbGlnaHQgPSBuZXcgVEhSRUUuQW1iaWVudExpZ2h0KDB4ZmZmZmZmKTtcbiAgbVNjZW5lLmFkZChsaWdodCk7XG59XG5mdW5jdGlvbiBpbml0Q29udHJvbHMoKSB7XG4gIG1Db250cm9scyA9IG5ldyBUSFJFRS5PcmJpdENvbnRyb2xzKG1DYW1lcmEsIG1SZW5kZXJlci5kb21FbGVtZW50KTtcbiAgbUNvbnRyb2xzLmVuYWJsZWQgPSBmYWxzZTtcbn1cbmZ1bmN0aW9uIGluaXRQYXJ0aWNsZVN5c3RlbSgpIHtcbiAgdmFyIHByZWZhYkdlb21ldHJ5ID0gbmV3IFRIUkVFLlBsYW5lR2VvbWV0cnkoNCwgNCk7XG4gIHZhciBidWZmZXJHZW9tZXRyeSA9IG5ldyBUSFJFRS5CQVMuUHJlZmFiQnVmZmVyR2VvbWV0cnkocHJlZmFiR2VvbWV0cnksIG1QYXJ0aWNsZUNvdW50KTtcblxuICBidWZmZXJHZW9tZXRyeS5jb21wdXRlVmVydGV4Tm9ybWFscygpO1xuXG4gIC8vIGdlbmVyYXRlIGFkZGl0aW9uYWwgZ2VvbWV0cnkgZGF0YVxuICB2YXIgYU9mZnNldCA9IGJ1ZmZlckdlb21ldHJ5LmNyZWF0ZUF0dHJpYnV0ZSgnYU9mZnNldCcsIDEpO1xuICB2YXIgYVN0YXJ0UG9zaXRpb24gPSBidWZmZXJHZW9tZXRyeS5jcmVhdGVBdHRyaWJ1dGUoJ2FTdGFydFBvc2l0aW9uJywgMyk7XG4gIHZhciBhQ29udHJvbFBvaW50MSA9IGJ1ZmZlckdlb21ldHJ5LmNyZWF0ZUF0dHJpYnV0ZSgnYUNvbnRyb2xQb2ludDEnLCAzKTtcbiAgdmFyIGFDb250cm9sUG9pbnQyID0gYnVmZmVyR2VvbWV0cnkuY3JlYXRlQXR0cmlidXRlKCdhQ29udHJvbFBvaW50MicsIDMpO1xuICB2YXIgYUVuZFBvc2l0aW9uID0gYnVmZmVyR2VvbWV0cnkuY3JlYXRlQXR0cmlidXRlKCdhRW5kUG9zaXRpb24nLCAzKTtcbiAgdmFyIGFBeGlzQW5nbGUgPSBidWZmZXJHZW9tZXRyeS5jcmVhdGVBdHRyaWJ1dGUoJ2FBeGlzQW5nbGUnLCA0KTtcbiAgdmFyIGFDb2xvciA9IGJ1ZmZlckdlb21ldHJ5LmNyZWF0ZUF0dHJpYnV0ZSgnY29sb3InLCAzKTtcblxuICB2YXIgaSwgaiwgb2Zmc2V0O1xuXG4gIC8vIGJ1ZmZlciB0aW1lIG9mZnNldFxuICB2YXIgZGVsYXk7XG5cbiAgZm9yIChpID0gMCwgb2Zmc2V0ID0gMDsgaSA8IG1QYXJ0aWNsZUNvdW50OyBpKyspIHtcbiAgICBkZWxheSA9IGkgLyBtUGFydGljbGVDb3VudCAqIG1EdXJhdGlvbjtcblxuICAgIGZvciAoaiA9IDA7IGogPCBwcmVmYWJHZW9tZXRyeS52ZXJ0aWNlcy5sZW5ndGg7IGorKykge1xuICAgICAgYU9mZnNldC5hcnJheVtvZmZzZXQrK10gPSBkZWxheTtcbiAgICB9XG4gIH1cblxuICAvLyBidWZmZXIgc3RhcnQgcG9zaXRpb25zXG4gIHZhciB4LCB5LCB6O1xuXG4gIGZvciAoaSA9IDAsIG9mZnNldCA9IDA7IGkgPCBtUGFydGljbGVDb3VudDsgaSsrKSB7XG4gICAgeCA9IDA7XG4gICAgeSA9IDEwMDA7XG4gICAgeiA9IDA7XG5cbiAgICBmb3IgKGogPSAwOyBqIDwgcHJlZmFiR2VvbWV0cnkudmVydGljZXMubGVuZ3RoOyBqKyspIHtcbiAgICAgIGFTdGFydFBvc2l0aW9uLmFycmF5W29mZnNldCsrXSA9IHg7XG4gICAgICBhU3RhcnRQb3NpdGlvbi5hcnJheVtvZmZzZXQrK10gPSB5O1xuICAgICAgYVN0YXJ0UG9zaXRpb24uYXJyYXlbb2Zmc2V0KytdID0gejtcbiAgICB9XG4gIH1cblxuICAvLyBidWZmZXIgY29udHJvbCBwb2ludHNcblxuICBmb3IgKGkgPSAwLCBvZmZzZXQgPSAwOyBpIDwgbVBhcnRpY2xlQ291bnQ7IGkrKykge1xuICAgIHggPSBUSFJFRS5NYXRoLnJhbmRGbG9hdCgtNDAwLCA0MDApO1xuICAgIHkgPSBUSFJFRS5NYXRoLnJhbmRGbG9hdCg0MDAsIDYwMCk7XG4gICAgeiA9IFRIUkVFLk1hdGgucmFuZEZsb2F0KC0xODAwLCAtNDAwKTtcblxuICAgIGZvciAoaiA9IDA7IGogPCBwcmVmYWJHZW9tZXRyeS52ZXJ0aWNlcy5sZW5ndGg7IGorKykge1xuICAgICAgYUNvbnRyb2xQb2ludDEuYXJyYXlbb2Zmc2V0KytdID0geDtcbiAgICAgIGFDb250cm9sUG9pbnQxLmFycmF5W29mZnNldCsrXSA9IHk7XG4gICAgICBhQ29udHJvbFBvaW50MS5hcnJheVtvZmZzZXQrK10gPSB6O1xuICAgIH1cbiAgfVxuXG4gIGZvciAoaSA9IDAsIG9mZnNldCA9IDA7IGkgPCBtUGFydGljbGVDb3VudDsgaSsrKSB7XG4gICAgeCA9IFRIUkVFLk1hdGgucmFuZEZsb2F0KC00MDAsIDQwMCk7XG4gICAgeSA9IFRIUkVFLk1hdGgucmFuZEZsb2F0KC02MDAsIC00MDApO1xuICAgIHogPSBUSFJFRS5NYXRoLnJhbmRGbG9hdCg0MDAsIDE4MDApO1xuXG4gICAgZm9yIChqID0gMDsgaiA8IHByZWZhYkdlb21ldHJ5LnZlcnRpY2VzLmxlbmd0aDsgaisrKSB7XG4gICAgICBhQ29udHJvbFBvaW50Mi5hcnJheVtvZmZzZXQrK10gPSB4O1xuICAgICAgYUNvbnRyb2xQb2ludDIuYXJyYXlbb2Zmc2V0KytdID0geTtcbiAgICAgIGFDb250cm9sUG9pbnQyLmFycmF5W29mZnNldCsrXSA9IHo7XG4gICAgfVxuICB9XG5cbiAgLy8gYnVmZmVyIGVuZCBwb3NpdGlvbnNcblxuICBmb3IgKGkgPSAwLCBvZmZzZXQgPSAwOyBpIDwgbVBhcnRpY2xlQ291bnQ7IGkrKykge1xuICAgIHggPSAwO1xuICAgIHkgPSAtMTAwMDtcbiAgICB6ID0gMDtcblxuICAgIGZvciAoaiA9IDA7IGogPCBwcmVmYWJHZW9tZXRyeS52ZXJ0aWNlcy5sZW5ndGg7IGorKykge1xuICAgICAgYUVuZFBvc2l0aW9uLmFycmF5W29mZnNldCsrXSA9IHg7XG4gICAgICBhRW5kUG9zaXRpb24uYXJyYXlbb2Zmc2V0KytdID0geTtcbiAgICAgIGFFbmRQb3NpdGlvbi5hcnJheVtvZmZzZXQrK10gPSB6O1xuICAgIH1cbiAgfVxuXG4gIC8vIGJ1ZmZlciBheGlzIGFuZ2xlXG4gIHZhciBheGlzID0gbmV3IFRIUkVFLlZlY3RvcjMoKTtcbiAgdmFyIGFuZ2xlID0gMDtcblxuICBmb3IgKGkgPSAwLCBvZmZzZXQgPSAwOyBpIDwgbVBhcnRpY2xlQ291bnQ7IGkrKykge1xuICAgIGF4aXMueCA9IFRIUkVFLk1hdGgucmFuZEZsb2F0U3ByZWFkKDIpO1xuICAgIGF4aXMueSA9IFRIUkVFLk1hdGgucmFuZEZsb2F0U3ByZWFkKDIpO1xuICAgIGF4aXMueiA9IFRIUkVFLk1hdGgucmFuZEZsb2F0U3ByZWFkKDIpO1xuICAgIGF4aXMubm9ybWFsaXplKCk7XG5cbiAgICBhbmdsZSA9IE1hdGguUEkgKiBUSFJFRS5NYXRoLnJhbmRJbnQoMTYsIDMyKTtcblxuICAgIGZvciAoaiA9IDA7IGogPCBwcmVmYWJHZW9tZXRyeS52ZXJ0aWNlcy5sZW5ndGg7IGorKykge1xuICAgICAgYUF4aXNBbmdsZS5hcnJheVtvZmZzZXQrK10gPSBheGlzLng7XG4gICAgICBhQXhpc0FuZ2xlLmFycmF5W29mZnNldCsrXSA9IGF4aXMueTtcbiAgICAgIGFBeGlzQW5nbGUuYXJyYXlbb2Zmc2V0KytdID0gYXhpcy56O1xuICAgICAgYUF4aXNBbmdsZS5hcnJheVtvZmZzZXQrK10gPSBhbmdsZTtcbiAgICB9XG4gIH1cblxuICAvLyBidWZmZXIgY29sb3JcbiAgdmFyIGNvbG9yID0gbmV3IFRIUkVFLkNvbG9yKCk7XG4gIHZhciBoLCBzLCBsO1xuXG4gIGZvciAoaSA9IDAsIG9mZnNldCA9IDA7IGkgPCBtUGFydGljbGVDb3VudDsgaSsrKSB7XG4gICAgaCA9IDA7XG4gICAgcyA9IDA7XG4gICAgbCA9IDA7XG5cbiAgICBjb2xvci5zZXRIU0woaCwgcywgbCk7XG5cbiAgICBmb3IgKGogPSAwOyBqIDwgcHJlZmFiR2VvbWV0cnkudmVydGljZXMubGVuZ3RoOyBqKyspIHtcbiAgICAgIGFDb2xvci5hcnJheVtvZmZzZXQrK10gPSBjb2xvci5yO1xuICAgICAgYUNvbG9yLmFycmF5W29mZnNldCsrXSA9IGNvbG9yLmc7XG4gICAgICBhQ29sb3IuYXJyYXlbb2Zmc2V0KytdID0gY29sb3IuYjtcbiAgICB9XG4gIH1cblxuICB2YXIgbWF0ZXJpYWwgPSBuZXcgVEhSRUUuQkFTLlBob25nQW5pbWF0aW9uTWF0ZXJpYWwoXG4gICAgLy8gY3VzdG9tIHBhcmFtZXRlcnMgJiBUSFJFRS5NZXNoUGhvbmdNYXRlcmlhbCBwYXJhbWV0ZXJzXG4gICAge1xuICAgICAgdmVydGV4Q29sb3JzOiBUSFJFRS5WZXJ0ZXhDb2xvcnMsXG4gICAgICBzaGFkaW5nOiBUSFJFRS5GbGF0U2hhZGluZyxcbiAgICAgIHNpZGU6IFRIUkVFLkRvdWJsZVNpZGUsXG4gICAgICB1bmlmb3Jtczoge1xuICAgICAgICB1VGltZToge3R5cGU6ICdmJywgdmFsdWU6IDB9LFxuICAgICAgICB1RHVyYXRpb246IHt0eXBlOiAnZicsIHZhbHVlOiBtRHVyYXRpb259XG4gICAgICB9LFxuICAgICAgc2hhZGVyRnVuY3Rpb25zOiBbXG4gICAgICAgIFRIUkVFLkJBUy5TaGFkZXJDaHVua1sncXVhdGVybmlvbl9yb3RhdGlvbiddLFxuICAgICAgICBUSFJFRS5CQVMuU2hhZGVyQ2h1bmtbJ2N1YmljX2JlemllciddXG4gICAgICBdLFxuICAgICAgc2hhZGVyUGFyYW1ldGVyczogW1xuICAgICAgICAndW5pZm9ybSBmbG9hdCB1VGltZTsnLFxuICAgICAgICAndW5pZm9ybSBmbG9hdCB1RHVyYXRpb247JyxcbiAgICAgICAgJ2F0dHJpYnV0ZSBmbG9hdCBhT2Zmc2V0OycsXG4gICAgICAgICdhdHRyaWJ1dGUgdmVjMyBhU3RhcnRQb3NpdGlvbjsnLFxuICAgICAgICAnYXR0cmlidXRlIHZlYzMgYUNvbnRyb2xQb2ludDE7JyxcbiAgICAgICAgJ2F0dHJpYnV0ZSB2ZWMzIGFDb250cm9sUG9pbnQyOycsXG4gICAgICAgICdhdHRyaWJ1dGUgdmVjMyBhRW5kUG9zaXRpb247JyxcbiAgICAgICAgJ2F0dHJpYnV0ZSB2ZWM0IGFBeGlzQW5nbGU7J1xuICAgICAgXSxcbiAgICAgIHNoYWRlclZlcnRleEluaXQ6IFtcbiAgICAgICAgJ2Zsb2F0IHRQcm9ncmVzcyA9IG1vZCgodVRpbWUgKyBhT2Zmc2V0KSwgdUR1cmF0aW9uKSAvIHVEdXJhdGlvbjsnLFxuXG4gICAgICAgICdmbG9hdCBhbmdsZSA9IGFBeGlzQW5nbGUudyAqIHRQcm9ncmVzczsnLFxuICAgICAgICAndmVjNCB0UXVhdCA9IHF1YXRGcm9tQXhpc0FuZ2xlKGFBeGlzQW5nbGUueHl6LCBhbmdsZSk7J1xuICAgICAgXSxcbiAgICAgIHNoYWRlclRyYW5zZm9ybU5vcm1hbDogW1xuICAgICAgICAnb2JqZWN0Tm9ybWFsID0gcm90YXRlVmVjdG9yKHRRdWF0LCBvYmplY3ROb3JtYWwpOydcbiAgICAgIF0sXG4gICAgICBzaGFkZXJUcmFuc2Zvcm1Qb3NpdGlvbjogW1xuICAgICAgICAndHJhbnNmb3JtZWQgPSByb3RhdGVWZWN0b3IodFF1YXQsIHRyYW5zZm9ybWVkKTsnLFxuICAgICAgICAndHJhbnNmb3JtZWQgKz0gY3ViaWNCZXppZXIoYVN0YXJ0UG9zaXRpb24sIGFDb250cm9sUG9pbnQxLCBhQ29udHJvbFBvaW50MiwgYUVuZFBvc2l0aW9uLCB0UHJvZ3Jlc3MpOydcbiAgICAgIF1cbiAgICB9LFxuICAgIC8vIFRIUkVFLk1lc2hQaG9uZ01hdGVyaWFsIHVuaWZvcm1zXG4gICAge1xuICAgICAgc3BlY3VsYXI6IDB4ZmYwMDAwLFxuICAgICAgc2hpbmluZXNzOiAyMFxuICAgIH1cbiAgKTtcbiAgbVBhcnRpY2xlU3lzdGVtID0gbmV3IFRIUkVFLk1lc2goYnVmZmVyR2VvbWV0cnksIG1hdGVyaWFsKTtcbiAgLy8gYmVjYXVzZSB0aGUgYm91bmRpbmcgYm94IG9mIHRoZSBwYXJ0aWNsZSBzeXN0ZW0gZG9lcyBub3QgcmVmbGVjdCBpdHMgb24tc2NyZWVuIHNpemVcbiAgLy8gc2V0IHRoaXMgdG8gZmFsc2UgdG8gcHJldmVudCB0aGUgd2hvbGUgdGhpbmcgZnJvbSBkaXNhcHBlYXJpbmcgb24gY2VydGFpbiBhbmdsZXNcbiAgbVBhcnRpY2xlU3lzdGVtLmZydXN0dW1DdWxsZWQgPSBmYWxzZTtcbiAgbVNjZW5lLmFkZChtUGFydGljbGVTeXN0ZW0pO1xufVxuZnVuY3Rpb24gdGljaygpIHtcbiAgdXBkYXRlKCk7XG4gIHJlbmRlcigpO1xuXG4gIG1UaW1lICs9IG1UaW1lU3RlcDtcbiAgbVRpbWUgJT0gbUR1cmF0aW9uO1xuXG4gIHJlcXVlc3RBbmltYXRpb25GcmFtZSh0aWNrKTtcbn1cbmZ1bmN0aW9uIHVwZGF0ZSgpIHtcbiAgbUNvbnRyb2xzLnVwZGF0ZSgpO1xuICBtUGFydGljbGVTeXN0ZW0ubWF0ZXJpYWwudW5pZm9ybXNbJ3VUaW1lJ10udmFsdWUgPSBtVGltZTtcbn1cbmZ1bmN0aW9uIHJlbmRlcigpIHtcbiAgbVJlbmRlcmVyLnJlbmRlcihtU2NlbmUsIG1DYW1lcmEpO1xufVxuZnVuY3Rpb24gcmVzaXplKCkge1xuICBsZXQgd2lkdGggPSAkKCcud3JhcHBlcicpLndpZHRoKCksXG4gICAgICBoZWlnaHQgPSAkKCcud3JhcHBlcicpLmhlaWdodCgpO1xuXG4gIG1DYW1lcmEuYXNwZWN0ID0gd2lkdGggLyBoZWlnaHQ7XG4gIG1DYW1lcmEudXBkYXRlUHJvamVjdGlvbk1hdHJpeCgpO1xuXG4gIG1SZW5kZXJlci5zZXRTaXplKHdpZHRoLCBoZWlnaHQpO1xufVxuXG4vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gYnVmZmVyIGFuaW1hdGlvbiBzeXN0ZW1cbi8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vXG5cblRIUkVFLkJBUyA9IHt9O1xuVEhSRUUuQkFTLlNoYWRlckNodW5rID0ge307XG5USFJFRS5CQVMuU2hhZGVyQ2h1bmtbXCJhbmltYXRpb25fdGltZVwiXSA9IFwiZmxvYXQgdERlbGF5ID0gYUFuaW1hdGlvbi54O1xcbmZsb2F0IHREdXJhdGlvbiA9IGFBbmltYXRpb24ueTtcXG5mbG9hdCB0VGltZSA9IGNsYW1wKHVUaW1lIC0gdERlbGF5LCAwLjAsIHREdXJhdGlvbik7XFxuZmxvYXQgdFByb2dyZXNzID0gZWFzZSh0VGltZSwgMC4wLCAxLjAsIHREdXJhdGlvbik7XFxuXCI7XG5USFJFRS5CQVMuU2hhZGVyQ2h1bmtbXCJjdWJpY19iZXppZXJcIl0gPSBcInZlYzMgY3ViaWNCZXppZXIodmVjMyBwMCwgdmVjMyBjMCwgdmVjMyBjMSwgdmVjMyBwMSwgZmxvYXQgdClcXG57XFxuICAgIHZlYzMgdHA7XFxuICAgIGZsb2F0IHRuID0gMS4wIC0gdDtcXG5cXG4gICAgdHAueHl6ID0gdG4gKiB0biAqIHRuICogcDAueHl6ICsgMy4wICogdG4gKiB0biAqIHQgKiBjMC54eXogKyAzLjAgKiB0biAqIHQgKiB0ICogYzEueHl6ICsgdCAqIHQgKiB0ICogcDEueHl6O1xcblxcbiAgICByZXR1cm4gdHA7XFxufVxcblwiO1xuVEhSRUUuQkFTLlNoYWRlckNodW5rW1wiZWFzZV9pbl9jdWJpY1wiXSA9IFwiZmxvYXQgZWFzZShmbG9hdCB0LCBmbG9hdCBiLCBmbG9hdCBjLCBmbG9hdCBkKSB7XFxuICByZXR1cm4gYyoodC89ZCkqdCp0ICsgYjtcXG59XFxuXCI7XG5USFJFRS5CQVMuU2hhZGVyQ2h1bmtbXCJlYXNlX2luX3F1YWRcIl0gPSBcImZsb2F0IGVhc2UoZmxvYXQgdCwgZmxvYXQgYiwgZmxvYXQgYywgZmxvYXQgZCkge1xcbiAgcmV0dXJuIGMqKHQvPWQpKnQgKyBiO1xcbn1cXG5cIjtcblRIUkVFLkJBUy5TaGFkZXJDaHVua1tcImVhc2Vfb3V0X2N1YmljXCJdID0gXCJmbG9hdCBlYXNlKGZsb2F0IHQsIGZsb2F0IGIsIGZsb2F0IGMsIGZsb2F0IGQpIHtcXG4gIHJldHVybiBjKigodD10L2QgLSAxLjApKnQqdCArIDEuMCkgKyBiO1xcbn1cXG5cIjtcblRIUkVFLkJBUy5TaGFkZXJDaHVua1tcInF1YXRlcm5pb25fcm90YXRpb25cIl0gPSBcInZlYzMgcm90YXRlVmVjdG9yKHZlYzQgcSwgdmVjMyB2KVxcbntcXG4gICAgcmV0dXJuIHYgKyAyLjAgKiBjcm9zcyhxLnh5eiwgY3Jvc3MocS54eXosIHYpICsgcS53ICogdik7XFxufVxcblxcbnZlYzQgcXVhdEZyb21BeGlzQW5nbGUodmVjMyBheGlzLCBmbG9hdCBhbmdsZSlcXG57XFxuICAgIGZsb2F0IGhhbGZBbmdsZSA9IGFuZ2xlICogMC41O1xcbiAgICByZXR1cm4gdmVjNChheGlzLnh5eiAqIHNpbihoYWxmQW5nbGUpLCBjb3MoaGFsZkFuZ2xlKSk7XFxufVxcblwiO1xuXG5USFJFRS5CQVMuUHJlZmFiQnVmZmVyR2VvbWV0cnkgPSBmdW5jdGlvbiAocHJlZmFiLCBjb3VudCkge1xuICBUSFJFRS5CdWZmZXJHZW9tZXRyeS5jYWxsKHRoaXMpO1xuXG4gIHRoaXMucHJlZmFiR2VvbWV0cnkgPSBwcmVmYWI7XG4gIHRoaXMucHJlZmFiQ291bnQgPSBjb3VudDtcbiAgdGhpcy5wcmVmYWJWZXJ0ZXhDb3VudCA9IHByZWZhYi52ZXJ0aWNlcy5sZW5ndGg7XG5cbiAgdGhpcy5idWZmZXJEZWZhdWx0cygpO1xufTtcblRIUkVFLkJBUy5QcmVmYWJCdWZmZXJHZW9tZXRyeS5wcm90b3R5cGUgPSBPYmplY3QuY3JlYXRlKFRIUkVFLkJ1ZmZlckdlb21ldHJ5LnByb3RvdHlwZSk7XG5USFJFRS5CQVMuUHJlZmFiQnVmZmVyR2VvbWV0cnkucHJvdG90eXBlLmNvbnN0cnVjdG9yID0gVEhSRUUuQkFTLlByZWZhYkJ1ZmZlckdlb21ldHJ5O1xuVEhSRUUuQkFTLlByZWZhYkJ1ZmZlckdlb21ldHJ5LnByb3RvdHlwZS5idWZmZXJEZWZhdWx0cyA9IGZ1bmN0aW9uICgpIHtcbiAgdmFyIHByZWZhYkZhY2VDb3VudCA9IHRoaXMucHJlZmFiR2VvbWV0cnkuZmFjZXMubGVuZ3RoO1xuICB2YXIgcHJlZmFiSW5kZXhDb3VudCA9IHRoaXMucHJlZmFiR2VvbWV0cnkuZmFjZXMubGVuZ3RoICogMztcbiAgdmFyIHByZWZhYlZlcnRleENvdW50ID0gdGhpcy5wcmVmYWJWZXJ0ZXhDb3VudCA9IHRoaXMucHJlZmFiR2VvbWV0cnkudmVydGljZXMubGVuZ3RoO1xuICB2YXIgcHJlZmFiSW5kaWNlcyA9IFtdO1xuXG4gIGZvciAodmFyIGggPSAwOyBoIDwgcHJlZmFiRmFjZUNvdW50OyBoKyspIHtcbiAgICB2YXIgZmFjZSA9IHRoaXMucHJlZmFiR2VvbWV0cnkuZmFjZXNbaF07XG4gICAgcHJlZmFiSW5kaWNlcy5wdXNoKGZhY2UuYSwgZmFjZS5iLCBmYWNlLmMpO1xuICB9XG5cbiAgdmFyIGluZGV4QnVmZmVyID0gbmV3IFVpbnQzMkFycmF5KHRoaXMucHJlZmFiQ291bnQgKiBwcmVmYWJJbmRleENvdW50KTtcbiAgdmFyIHBvc2l0aW9uQnVmZmVyID0gbmV3IEZsb2F0MzJBcnJheSh0aGlzLnByZWZhYkNvdW50ICogcHJlZmFiVmVydGV4Q291bnQgKiAzKTtcblxuICB0aGlzLnNldEluZGV4KG5ldyBUSFJFRS5CdWZmZXJBdHRyaWJ1dGUoaW5kZXhCdWZmZXIsIDEpKTtcbiAgdGhpcy5hZGRBdHRyaWJ1dGUoJ3Bvc2l0aW9uJywgbmV3IFRIUkVFLkJ1ZmZlckF0dHJpYnV0ZShwb3NpdGlvbkJ1ZmZlciwgMykpO1xuXG4gIGZvciAodmFyIGkgPSAwLCBvZmZzZXQgPSAwOyBpIDwgdGhpcy5wcmVmYWJDb3VudDsgaSsrKSB7XG4gICAgZm9yICh2YXIgaiA9IDA7IGogPCBwcmVmYWJWZXJ0ZXhDb3VudDsgaisrLCBvZmZzZXQgKz0gMykge1xuICAgICAgdmFyIHByZWZhYlZlcnRleCA9IHRoaXMucHJlZmFiR2VvbWV0cnkudmVydGljZXNbal07XG5cbiAgICAgIHBvc2l0aW9uQnVmZmVyW29mZnNldCAgICBdID0gcHJlZmFiVmVydGV4Lng7XG4gICAgICBwb3NpdGlvbkJ1ZmZlcltvZmZzZXQgKyAxXSA9IHByZWZhYlZlcnRleC55O1xuICAgICAgcG9zaXRpb25CdWZmZXJbb2Zmc2V0ICsgMl0gPSBwcmVmYWJWZXJ0ZXguejtcbiAgICB9XG5cbiAgICBmb3IgKHZhciBrID0gMDsgayA8IHByZWZhYkluZGV4Q291bnQ7IGsrKykge1xuICAgICAgaW5kZXhCdWZmZXJbaSAqIHByZWZhYkluZGV4Q291bnQgKyBrXSA9IHByZWZhYkluZGljZXNba10gKyBpICogcHJlZmFiVmVydGV4Q291bnQ7XG4gICAgfVxuICB9XG59O1xuXG4vKipcbiAqIGJhc2VkIG9uIEJ1ZmZlckdlb21ldHJ5LmNvbXB1dGVWZXJ0ZXhOb3JtYWxzXG4gKiBjYWxjdWxhdGUgdmVydGV4IG5vcm1hbHMgZm9yIGEgcHJlZmFiLCBhbmQgcmVwZWF0IHRoZSBkYXRhIGluIHRoZSBub3JtYWwgYnVmZmVyXG4gKi9cblRIUkVFLkJBUy5QcmVmYWJCdWZmZXJHZW9tZXRyeS5wcm90b3R5cGUuY29tcHV0ZVZlcnRleE5vcm1hbHMgPSBmdW5jdGlvbiAoKSB7XG4gIHZhciBpbmRleCA9IHRoaXMuaW5kZXg7XG4gIHZhciBhdHRyaWJ1dGVzID0gdGhpcy5hdHRyaWJ1dGVzO1xuICB2YXIgcG9zaXRpb25zID0gYXR0cmlidXRlcy5wb3NpdGlvbi5hcnJheTtcblxuICBpZiAoYXR0cmlidXRlcy5ub3JtYWwgPT09IHVuZGVmaW5lZCkge1xuICAgIHRoaXMuYWRkQXR0cmlidXRlKCdub3JtYWwnLCBuZXcgVEhSRUUuQnVmZmVyQXR0cmlidXRlKG5ldyBGbG9hdDMyQXJyYXkocG9zaXRpb25zLmxlbmd0aCksIDMpKTtcbiAgfVxuXG4gIHZhciBub3JtYWxzID0gYXR0cmlidXRlcy5ub3JtYWwuYXJyYXk7XG5cbiAgdmFyIHZBLCB2QiwgdkMsXG5cbiAgICBwQSA9IG5ldyBUSFJFRS5WZWN0b3IzKCksXG4gICAgcEIgPSBuZXcgVEhSRUUuVmVjdG9yMygpLFxuICAgIHBDID0gbmV3IFRIUkVFLlZlY3RvcjMoKSxcblxuICAgIGNiID0gbmV3IFRIUkVFLlZlY3RvcjMoKSxcbiAgICBhYiA9IG5ldyBUSFJFRS5WZWN0b3IzKCk7XG5cbiAgdmFyIGluZGljZXMgPSBpbmRleC5hcnJheTtcbiAgdmFyIHByZWZhYkluZGV4Q291bnQgPSB0aGlzLnByZWZhYkdlb21ldHJ5LmZhY2VzLmxlbmd0aCAqIDM7XG5cbiAgZm9yICh2YXIgaSA9IDA7IGkgPCBwcmVmYWJJbmRleENvdW50OyBpICs9IDMpIHtcbiAgICB2QSA9IGluZGljZXNbaSArIDBdICogMztcbiAgICB2QiA9IGluZGljZXNbaSArIDFdICogMztcbiAgICB2QyA9IGluZGljZXNbaSArIDJdICogMztcblxuICAgIHBBLmZyb21BcnJheShwb3NpdGlvbnMsIHZBKTtcbiAgICBwQi5mcm9tQXJyYXkocG9zaXRpb25zLCB2Qik7XG4gICAgcEMuZnJvbUFycmF5KHBvc2l0aW9ucywgdkMpO1xuXG4gICAgY2Iuc3ViVmVjdG9ycyhwQywgcEIpO1xuICAgIGFiLnN1YlZlY3RvcnMocEEsIHBCKTtcbiAgICBjYi5jcm9zcyhhYik7XG5cbiAgICBub3JtYWxzW3ZBXSArPSBjYi54O1xuICAgIG5vcm1hbHNbdkEgKyAxXSArPSBjYi55O1xuICAgIG5vcm1hbHNbdkEgKyAyXSArPSBjYi56O1xuXG4gICAgbm9ybWFsc1t2Ql0gKz0gY2IueDtcbiAgICBub3JtYWxzW3ZCICsgMV0gKz0gY2IueTtcbiAgICBub3JtYWxzW3ZCICsgMl0gKz0gY2IuejtcblxuICAgIG5vcm1hbHNbdkNdICs9IGNiLng7XG4gICAgbm9ybWFsc1t2QyArIDFdICs9IGNiLnk7XG4gICAgbm9ybWFsc1t2QyArIDJdICs9IGNiLno7XG4gIH1cblxuICBmb3IgKHZhciBqID0gMTsgaiA8IHRoaXMucHJlZmFiQ291bnQ7IGorKykge1xuICAgIGZvciAodmFyIGsgPSAwOyBrIDwgcHJlZmFiSW5kZXhDb3VudDsgaysrKSB7XG4gICAgICBub3JtYWxzW2ogKiBwcmVmYWJJbmRleENvdW50ICsga10gPSBub3JtYWxzW2tdO1xuICAgIH1cbiAgfVxuXG4gIHRoaXMubm9ybWFsaXplTm9ybWFscygpO1xuXG4gIGF0dHJpYnV0ZXMubm9ybWFsLm5lZWRzVXBkYXRlID0gdHJ1ZTtcbn07XG5USFJFRS5CQVMuUHJlZmFiQnVmZmVyR2VvbWV0cnkucHJvdG90eXBlLmNyZWF0ZUF0dHJpYnV0ZSA9IGZ1bmN0aW9uIChuYW1lLCBpdGVtU2l6ZSkge1xuICB2YXIgYnVmZmVyID0gbmV3IEZsb2F0MzJBcnJheSh0aGlzLnByZWZhYkNvdW50ICogdGhpcy5wcmVmYWJWZXJ0ZXhDb3VudCAqIGl0ZW1TaXplKTtcbiAgdmFyIGF0dHJpYnV0ZSA9IG5ldyBUSFJFRS5CdWZmZXJBdHRyaWJ1dGUoYnVmZmVyLCBpdGVtU2l6ZSk7XG5cbiAgdGhpcy5hZGRBdHRyaWJ1dGUobmFtZSwgYXR0cmlidXRlKTtcblxuICByZXR1cm4gYXR0cmlidXRlO1xufTtcblRIUkVFLkJBUy5QcmVmYWJCdWZmZXJHZW9tZXRyeS5wcm90b3R5cGUuc2V0QXR0cmlidXRlNCA9IGZ1bmN0aW9uIChuYW1lLCBkYXRhKSB7XG4gIHZhciBvZmZzZXQgPSAwO1xuICB2YXIgYXJyYXkgPSB0aGlzLmdlb21ldHJ5LmF0dHJpYnV0ZXNbbmFtZV0uYXJyYXk7XG4gIHZhciBpLCBqO1xuXG4gIGZvciAoaSA9IDA7IGkgPCBkYXRhLmxlbmd0aDsgaSsrKSB7XG4gICAgdmFyIHYgPSBkYXRhW2ldO1xuXG4gICAgZm9yIChqID0gMDsgaiA8IHRoaXMucHJlZmFiVmVydGV4Q291bnQ7IGorKykge1xuICAgICAgYXJyYXlbb2Zmc2V0KytdID0gdi54O1xuICAgICAgYXJyYXlbb2Zmc2V0KytdID0gdi55O1xuICAgICAgYXJyYXlbb2Zmc2V0KytdID0gdi56O1xuICAgICAgYXJyYXlbb2Zmc2V0KytdID0gdi53O1xuICAgIH1cbiAgfVxuXG4gIHRoaXMuZ2VvbWV0cnkuYXR0cmlidXRlc1tuYW1lXS5uZWVkc1VwZGF0ZSA9IHRydWU7XG59O1xuVEhSRUUuQkFTLlByZWZhYkJ1ZmZlckdlb21ldHJ5LnByb3RvdHlwZS5zZXRBdHRyaWJ1dGUzID0gZnVuY3Rpb24gKG5hbWUsIGRhdGEpIHtcbiAgdmFyIG9mZnNldCA9IDA7XG4gIHZhciBhcnJheSA9IHRoaXMuZ2VvbWV0cnkuYXR0cmlidXRlc1tuYW1lXS5hcnJheTtcbiAgdmFyIGksIGo7XG5cbiAgZm9yIChpID0gMDsgaSA8IGRhdGEubGVuZ3RoOyBpKyspIHtcbiAgICB2YXIgdiA9IGRhdGFbaV07XG5cbiAgICBmb3IgKGogPSAwOyBqIDwgdGhpcy5wcmVmYWJWZXJ0ZXhDb3VudDsgaisrKSB7XG4gICAgICBhcnJheVtvZmZzZXQrK10gPSB2Lng7XG4gICAgICBhcnJheVtvZmZzZXQrK10gPSB2Lnk7XG4gICAgICBhcnJheVtvZmZzZXQrK10gPSB2Lno7XG4gICAgfVxuICB9XG5cbiAgdGhpcy5nZW9tZXRyeS5hdHRyaWJ1dGVzW25hbWVdLm5lZWRzVXBkYXRlID0gdHJ1ZTtcbn07XG5USFJFRS5CQVMuUHJlZmFiQnVmZmVyR2VvbWV0cnkucHJvdG90eXBlLnNldEF0dHJpYnV0ZTIgPSBmdW5jdGlvbiAobmFtZSwgZGF0YSkge1xuICB2YXIgb2Zmc2V0ID0gMDtcbiAgdmFyIGFycmF5ID0gdGhpcy5nZW9tZXRyeS5hdHRyaWJ1dGVzW25hbWVdLmFycmF5O1xuICB2YXIgaSwgajtcblxuICBmb3IgKGkgPSAwOyBpIDwgdGhpcy5wcmVmYWJDb3VudDsgaSsrKSB7XG4gICAgdmFyIHYgPSBkYXRhW2ldO1xuXG4gICAgZm9yIChqID0gMDsgaiA8IHRoaXMucHJlZmFiVmVydGV4Q291bnQ7IGorKykge1xuICAgICAgYXJyYXlbb2Zmc2V0KytdID0gdi54O1xuICAgICAgYXJyYXlbb2Zmc2V0KytdID0gdi55O1xuICAgIH1cbiAgfVxuXG4gIHRoaXMuZ2VvbWV0cnkuYXR0cmlidXRlc1tuYW1lXS5uZWVkc1VwZGF0ZSA9IHRydWU7XG59O1xuXG5USFJFRS5CQVMuQmFzZUFuaW1hdGlvbk1hdGVyaWFsID0gZnVuY3Rpb24ocGFyYW1ldGVycykge1xuICBUSFJFRS5TaGFkZXJNYXRlcmlhbC5jYWxsKHRoaXMpO1xuXG4gIHRoaXMuc2hhZGVyRnVuY3Rpb25zID0gW107XG4gIHRoaXMuc2hhZGVyUGFyYW1ldGVycyA9IFtdO1xuICB0aGlzLnNoYWRlclZlcnRleEluaXQgPSBbXTtcbiAgdGhpcy5zaGFkZXJUcmFuc2Zvcm1Ob3JtYWwgPSBbXTtcbiAgdGhpcy5zaGFkZXJUcmFuc2Zvcm1Qb3NpdGlvbiA9IFtdO1xuXG4gIHRoaXMuc2V0VmFsdWVzKHBhcmFtZXRlcnMpO1xufTtcblRIUkVFLkJBUy5CYXNlQW5pbWF0aW9uTWF0ZXJpYWwucHJvdG90eXBlID0gT2JqZWN0LmNyZWF0ZShUSFJFRS5TaGFkZXJNYXRlcmlhbC5wcm90b3R5cGUpO1xuVEhSRUUuQkFTLkJhc2VBbmltYXRpb25NYXRlcmlhbC5wcm90b3R5cGUuY29uc3RydWN0b3IgPSBUSFJFRS5CQVMuQmFzZUFuaW1hdGlvbk1hdGVyaWFsO1xuXG4vLyBhYnN0cmFjdFxuVEhSRUUuQkFTLkJhc2VBbmltYXRpb25NYXRlcmlhbC5wcm90b3R5cGUuX2NvbmNhdFZlcnRleFNoYWRlciA9IGZ1bmN0aW9uKCkge1xuICByZXR1cm4gJyc7XG59O1xuVEhSRUUuQkFTLkJhc2VBbmltYXRpb25NYXRlcmlhbC5wcm90b3R5cGUuX2NvbmNhdEZ1bmN0aW9ucyA9IGZ1bmN0aW9uKCkge1xuICByZXR1cm4gdGhpcy5zaGFkZXJGdW5jdGlvbnMuam9pbignXFxuJyk7XG59O1xuVEhSRUUuQkFTLkJhc2VBbmltYXRpb25NYXRlcmlhbC5wcm90b3R5cGUuX2NvbmNhdFBhcmFtZXRlcnMgPSBmdW5jdGlvbigpIHtcbiAgcmV0dXJuIHRoaXMuc2hhZGVyUGFyYW1ldGVycy5qb2luKCdcXG4nKTtcbn07XG5USFJFRS5CQVMuQmFzZUFuaW1hdGlvbk1hdGVyaWFsLnByb3RvdHlwZS5fY29uY2F0VmVydGV4SW5pdCA9IGZ1bmN0aW9uKCkge1xuICByZXR1cm4gdGhpcy5zaGFkZXJWZXJ0ZXhJbml0LmpvaW4oJ1xcbicpO1xufTtcblRIUkVFLkJBUy5CYXNlQW5pbWF0aW9uTWF0ZXJpYWwucHJvdG90eXBlLl9jb25jYXRUcmFuc2Zvcm1Ob3JtYWwgPSBmdW5jdGlvbigpIHtcbiAgcmV0dXJuIHRoaXMuc2hhZGVyVHJhbnNmb3JtTm9ybWFsLmpvaW4oJ1xcbicpO1xufTtcblRIUkVFLkJBUy5CYXNlQW5pbWF0aW9uTWF0ZXJpYWwucHJvdG90eXBlLl9jb25jYXRUcmFuc2Zvcm1Qb3NpdGlvbiA9IGZ1bmN0aW9uKCkge1xuICByZXR1cm4gdGhpcy5zaGFkZXJUcmFuc2Zvcm1Qb3NpdGlvbi5qb2luKCdcXG4nKTtcbn07XG5USFJFRS5CQVMuQmFzZUFuaW1hdGlvbk1hdGVyaWFsLnByb3RvdHlwZS5zZXRVbmlmb3JtVmFsdWVzID0gZnVuY3Rpb24odmFsdWVzKSB7XG4gIGZvciAodmFyIGtleSBpbiB2YWx1ZXMpIHtcbiAgICBpZiAoa2V5IGluIHRoaXMudW5pZm9ybXMpIHtcbiAgICAgIHZhciB1bmlmb3JtID0gdGhpcy51bmlmb3Jtc1trZXldO1xuICAgICAgdmFyIHZhbHVlID0gdmFsdWVzW2tleV07XG5cbiAgICAgIC8vIHRvZG8gYWRkIG1hdHJpeCB1bmlmb3JtIHR5cGVzXG4gICAgICBzd2l0Y2ggKHVuaWZvcm0udHlwZSkge1xuICAgICAgICBjYXNlICdjJzogLy8gY29sb3JcbiAgICAgICAgICB1bmlmb3JtLnZhbHVlLnNldCh2YWx1ZSk7XG4gICAgICAgICAgYnJlYWs7XG4gICAgICAgIGNhc2UgJ3YyJzogLy8gdmVjdG9yc1xuICAgICAgICBjYXNlICd2Myc6XG4gICAgICAgIGNhc2UgJ3Y0JzpcbiAgICAgICAgICB1bmlmb3JtLnZhbHVlLmNvcHkodmFsdWUpO1xuICAgICAgICAgIGJyZWFrO1xuICAgICAgICBjYXNlICdmJzogLy8gZmxvYXRcbiAgICAgICAgY2FzZSAndCc6IC8vIHRleHR1cmVcbiAgICAgICAgICB1bmlmb3JtLnZhbHVlID0gdmFsdWU7XG4gICAgICB9XG4gICAgfVxuICB9XG59O1xuXG5USFJFRS5CQVMuUGhvbmdBbmltYXRpb25NYXRlcmlhbCA9IGZ1bmN0aW9uKHBhcmFtZXRlcnMsIHVuaWZvcm1WYWx1ZXMpIHtcbiAgVEhSRUUuQkFTLkJhc2VBbmltYXRpb25NYXRlcmlhbC5jYWxsKHRoaXMsIHBhcmFtZXRlcnMpO1xuXG4gIHZhciBwaG9uZ1NoYWRlciA9IFRIUkVFLlNoYWRlckxpYlsncGhvbmcnXTtcblxuICB0aGlzLnVuaWZvcm1zID0gVEhSRUUuVW5pZm9ybXNVdGlscy5tZXJnZShbcGhvbmdTaGFkZXIudW5pZm9ybXMsIHRoaXMudW5pZm9ybXNdKTtcbiAgdGhpcy5saWdodHMgPSB0cnVlO1xuICB0aGlzLnZlcnRleFNoYWRlciA9IHRoaXMuX2NvbmNhdFZlcnRleFNoYWRlcigpO1xuICB0aGlzLmZyYWdtZW50U2hhZGVyID0gcGhvbmdTaGFkZXIuZnJhZ21lbnRTaGFkZXI7XG5cbiAgLy8gdG9kbyBhZGQgbWlzc2luZyBkZWZhdWx0IGRlZmluZXNcbiAgdW5pZm9ybVZhbHVlcy5tYXAgJiYgKHRoaXMuZGVmaW5lc1snVVNFX01BUCddID0gJycpO1xuICB1bmlmb3JtVmFsdWVzLm5vcm1hbE1hcCAmJiAodGhpcy5kZWZpbmVzWydVU0VfTk9STUFMTUFQJ10gPSAnJyk7XG5cbiAgdGhpcy5zZXRVbmlmb3JtVmFsdWVzKHVuaWZvcm1WYWx1ZXMpO1xufTtcblRIUkVFLkJBUy5QaG9uZ0FuaW1hdGlvbk1hdGVyaWFsLnByb3RvdHlwZSA9IE9iamVjdC5jcmVhdGUoVEhSRUUuQkFTLkJhc2VBbmltYXRpb25NYXRlcmlhbC5wcm90b3R5cGUpO1xuVEhSRUUuQkFTLlBob25nQW5pbWF0aW9uTWF0ZXJpYWwucHJvdG90eXBlLmNvbnN0cnVjdG9yID0gVEhSRUUuQkFTLlBob25nQW5pbWF0aW9uTWF0ZXJpYWw7XG5USFJFRS5CQVMuUGhvbmdBbmltYXRpb25NYXRlcmlhbC5wcm90b3R5cGUuX2NvbmNhdFZlcnRleFNoYWRlciA9IGZ1bmN0aW9uKCkge1xuICAvLyBiYXNlZCBvbiBUSFJFRS5TaGFkZXJMaWIucGhvbmdcbiAgcmV0dXJuIFtcbiAgICBcIiNkZWZpbmUgUEhPTkdcIixcblxuICAgIFwidmFyeWluZyB2ZWMzIHZWaWV3UG9zaXRpb247XCIsXG5cbiAgICBcIiNpZm5kZWYgRkxBVF9TSEFERURcIixcblxuICAgIFwiXHR2YXJ5aW5nIHZlYzMgdk5vcm1hbDtcIixcblxuICAgIFwiI2VuZGlmXCIsXG5cbiAgICBUSFJFRS5TaGFkZXJDaHVua1sgXCJjb21tb25cIiBdLFxuICAgIFRIUkVFLlNoYWRlckNodW5rWyBcInV2X3BhcnNfdmVydGV4XCIgXSxcbiAgICBUSFJFRS5TaGFkZXJDaHVua1sgXCJ1djJfcGFyc192ZXJ0ZXhcIiBdLFxuICAgIFRIUkVFLlNoYWRlckNodW5rWyBcImRpc3BsYWNlbWVudG1hcF9wYXJzX3ZlcnRleFwiIF0sXG4gICAgVEhSRUUuU2hhZGVyQ2h1bmtbIFwiZW52bWFwX3BhcnNfdmVydGV4XCIgXSxcbiAgICBUSFJFRS5TaGFkZXJDaHVua1sgXCJsaWdodHNfcGhvbmdfcGFyc192ZXJ0ZXhcIiBdLFxuICAgIFRIUkVFLlNoYWRlckNodW5rWyBcImNvbG9yX3BhcnNfdmVydGV4XCIgXSxcbiAgICBUSFJFRS5TaGFkZXJDaHVua1sgXCJtb3JwaHRhcmdldF9wYXJzX3ZlcnRleFwiIF0sXG4gICAgVEhSRUUuU2hhZGVyQ2h1bmtbIFwic2tpbm5pbmdfcGFyc192ZXJ0ZXhcIiBdLFxuICAgIFRIUkVFLlNoYWRlckNodW5rWyBcInNoYWRvd21hcF9wYXJzX3ZlcnRleFwiIF0sXG4gICAgVEhSRUUuU2hhZGVyQ2h1bmtbIFwibG9nZGVwdGhidWZfcGFyc192ZXJ0ZXhcIiBdLFxuXG4gICAgdGhpcy5fY29uY2F0RnVuY3Rpb25zKCksXG5cbiAgICB0aGlzLl9jb25jYXRQYXJhbWV0ZXJzKCksXG5cbiAgICBcInZvaWQgbWFpbigpIHtcIixcblxuICAgIHRoaXMuX2NvbmNhdFZlcnRleEluaXQoKSxcblxuICAgIFRIUkVFLlNoYWRlckNodW5rWyBcInV2X3ZlcnRleFwiIF0sXG4gICAgVEhSRUUuU2hhZGVyQ2h1bmtbIFwidXYyX3ZlcnRleFwiIF0sXG4gICAgVEhSRUUuU2hhZGVyQ2h1bmtbIFwiY29sb3JfdmVydGV4XCIgXSxcbiAgICBUSFJFRS5TaGFkZXJDaHVua1sgXCJiZWdpbm5vcm1hbF92ZXJ0ZXhcIiBdLFxuXG4gICAgdGhpcy5fY29uY2F0VHJhbnNmb3JtTm9ybWFsKCksXG5cbiAgICBUSFJFRS5TaGFkZXJDaHVua1sgXCJtb3JwaG5vcm1hbF92ZXJ0ZXhcIiBdLFxuICAgIFRIUkVFLlNoYWRlckNodW5rWyBcInNraW5iYXNlX3ZlcnRleFwiIF0sXG4gICAgVEhSRUUuU2hhZGVyQ2h1bmtbIFwic2tpbm5vcm1hbF92ZXJ0ZXhcIiBdLFxuICAgIFRIUkVFLlNoYWRlckNodW5rWyBcImRlZmF1bHRub3JtYWxfdmVydGV4XCIgXSxcblxuICAgIFwiI2lmbmRlZiBGTEFUX1NIQURFRFwiLCAvLyBOb3JtYWwgY29tcHV0ZWQgd2l0aCBkZXJpdmF0aXZlcyB3aGVuIEZMQVRfU0hBREVEXG5cbiAgICBcIlx0dk5vcm1hbCA9IG5vcm1hbGl6ZSggdHJhbnNmb3JtZWROb3JtYWwgKTtcIixcblxuICAgIFwiI2VuZGlmXCIsXG5cbiAgICBUSFJFRS5TaGFkZXJDaHVua1sgXCJiZWdpbl92ZXJ0ZXhcIiBdLFxuXG4gICAgdGhpcy5fY29uY2F0VHJhbnNmb3JtUG9zaXRpb24oKSxcblxuICAgIFRIUkVFLlNoYWRlckNodW5rWyBcImRpc3BsYWNlbWVudG1hcF92ZXJ0ZXhcIiBdLFxuICAgIFRIUkVFLlNoYWRlckNodW5rWyBcIm1vcnBodGFyZ2V0X3ZlcnRleFwiIF0sXG4gICAgVEhSRUUuU2hhZGVyQ2h1bmtbIFwic2tpbm5pbmdfdmVydGV4XCIgXSxcbiAgICBUSFJFRS5TaGFkZXJDaHVua1sgXCJwcm9qZWN0X3ZlcnRleFwiIF0sXG4gICAgVEhSRUUuU2hhZGVyQ2h1bmtbIFwibG9nZGVwdGhidWZfdmVydGV4XCIgXSxcblxuICAgIFwiXHR2Vmlld1Bvc2l0aW9uID0gLSBtdlBvc2l0aW9uLnh5ejtcIixcblxuICAgIFRIUkVFLlNoYWRlckNodW5rWyBcIndvcmxkcG9zX3ZlcnRleFwiIF0sXG4gICAgVEhSRUUuU2hhZGVyQ2h1bmtbIFwiZW52bWFwX3ZlcnRleFwiIF0sXG4gICAgVEhSRUUuU2hhZGVyQ2h1bmtbIFwibGlnaHRzX3Bob25nX3ZlcnRleFwiIF0sXG4gICAgVEhSRUUuU2hhZGVyQ2h1bmtbIFwic2hhZG93bWFwX3ZlcnRleFwiIF0sXG5cbiAgICBcIn1cIlxuXG4gIF0uam9pbiggXCJcXG5cIiApO1xufTsiXSwiZmlsZSI6ImFwcC5qcyJ9
