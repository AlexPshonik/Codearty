// Translation
$(document).ready(function(){
  var dict = {
    "We build digital<br>products &amp; services" : {
      ru: "Мы разрабатываем <br>цифровые продукты и сервисы"
    },
    "We turn technologies and design into a solution for your business" : {
      ru: "Превращаем технологии и дизайн в решения для Вашего бизнеса"
    },
    "Start the project": {
      ru: "Запустить проект"
    },
    "Hello CodeArty": {
      ru: "Привет CodeArty"
    },
    "Discuss your project": {
      ru: "Обсудить проект"
    },
    "Go ahead, great things start with filling out this contact form": {
      ru: "Крутые проекты начинаются с заполнения этой формы"
    },
    "Your name": {
      ru: "Имя"
    },
    "Email address": {
      ru: "Email"
    },
    "Phone (optional)": {
      ru: "Телефон (необязательно)"
    },
    "Company": {
      ru: "Компания"
    },
    "Tell us about your idea": {
      ru: "Расскажите о своей идее"
    },
    "Submit": {
      ru: "Оставить заявку"
    },

  }

  var translator = $('body').translate({lang: "en", t: dict});
  $('.lang-sw__select').change(function() {
    $( "option:selected" ).each(function() {
      var lang = $(this).attr("data-value");
      translator.lang(lang);
    });
  });
});

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
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiIiwic291cmNlcyI6WyJhcHAuanMiXSwic291cmNlc0NvbnRlbnQiOlsiLy8gVHJhbnNsYXRpb25cbiQoZG9jdW1lbnQpLnJlYWR5KGZ1bmN0aW9uKCl7XG4gIHZhciBkaWN0ID0ge1xuICAgIFwiV2UgYnVpbGQgZGlnaXRhbDxicj5wcm9kdWN0cyAmYW1wOyBzZXJ2aWNlc1wiIDoge1xuICAgICAgcnU6IFwi0JzRiyDRgNCw0LfRgNCw0LHQsNGC0YvQstCw0LXQvCA8YnI+0YbQuNGE0YDQvtCy0YvQtSDQv9GA0L7QtNGD0LrRgtGLINC4INGB0LXRgNCy0LjRgdGLXCJcbiAgICB9LFxuICAgIFwiV2UgdHVybiB0ZWNobm9sb2dpZXMgYW5kIGRlc2lnbiBpbnRvIGEgc29sdXRpb24gZm9yIHlvdXIgYnVzaW5lc3NcIiA6IHtcbiAgICAgIHJ1OiBcItCf0YDQtdCy0YDQsNGJ0LDQtdC8INGC0LXRhdC90L7Qu9C+0LPQuNC4INC4INC00LjQt9Cw0LnQvSDQsiDRgNC10YjQtdC90LjRjyDQtNC70Y8g0JLQsNGI0LXQs9C+INCx0LjQt9C90LXRgdCwXCJcbiAgICB9LFxuICAgIFwiU3RhcnQgdGhlIHByb2plY3RcIjoge1xuICAgICAgcnU6IFwi0JfQsNC/0YPRgdGC0LjRgtGMINC/0YDQvtC10LrRglwiXG4gICAgfSxcbiAgICBcIkhlbGxvIENvZGVBcnR5XCI6IHtcbiAgICAgIHJ1OiBcItCf0YDQuNCy0LXRgiBDb2RlQXJ0eVwiXG4gICAgfSxcbiAgICBcIkRpc2N1c3MgeW91ciBwcm9qZWN0XCI6IHtcbiAgICAgIHJ1OiBcItCe0LHRgdGD0LTQuNGC0Ywg0L/RgNC+0LXQutGCXCJcbiAgICB9LFxuICAgIFwiR28gYWhlYWQsIGdyZWF0IHRoaW5ncyBzdGFydCB3aXRoIGZpbGxpbmcgb3V0IHRoaXMgY29udGFjdCBmb3JtXCI6IHtcbiAgICAgIHJ1OiBcItCa0YDRg9GC0YvQtSDQv9GA0L7QtdC60YLRiyDQvdCw0YfQuNC90LDRjtGC0YHRjyDRgSDQt9Cw0L/QvtC70L3QtdC90LjRjyDRjdGC0L7QuSDRhNC+0YDQvNGLXCJcbiAgICB9LFxuICAgIFwiWW91ciBuYW1lXCI6IHtcbiAgICAgIHJ1OiBcItCY0LzRj1wiXG4gICAgfSxcbiAgICBcIkVtYWlsIGFkZHJlc3NcIjoge1xuICAgICAgcnU6IFwiRW1haWxcIlxuICAgIH0sXG4gICAgXCJQaG9uZSAob3B0aW9uYWwpXCI6IHtcbiAgICAgIHJ1OiBcItCi0LXQu9C10YTQvtC9ICjQvdC10L7QsdGP0LfQsNGC0LXQu9GM0L3QvilcIlxuICAgIH0sXG4gICAgXCJDb21wYW55XCI6IHtcbiAgICAgIHJ1OiBcItCa0L7QvNC/0LDQvdC40Y9cIlxuICAgIH0sXG4gICAgXCJUZWxsIHVzIGFib3V0IHlvdXIgaWRlYVwiOiB7XG4gICAgICBydTogXCLQoNCw0YHRgdC60LDQttC40YLQtSDQviDRgdCy0L7QtdC5INC40LTQtdC1XCJcbiAgICB9LFxuICAgIFwiU3VibWl0XCI6IHtcbiAgICAgIHJ1OiBcItCe0YHRgtCw0LLQuNGC0Ywg0LfQsNGP0LLQutGDXCJcbiAgICB9LFxuXG4gIH1cblxuICB2YXIgdHJhbnNsYXRvciA9ICQoJ2JvZHknKS50cmFuc2xhdGUoe2xhbmc6IFwiZW5cIiwgdDogZGljdH0pO1xuICAkKCcubGFuZy1zd19fc2VsZWN0JykuY2hhbmdlKGZ1bmN0aW9uKCkge1xuICAgICQoIFwib3B0aW9uOnNlbGVjdGVkXCIgKS5lYWNoKGZ1bmN0aW9uKCkge1xuICAgICAgdmFyIGxhbmcgPSAkKHRoaXMpLmF0dHIoXCJkYXRhLXZhbHVlXCIpO1xuICAgICAgdHJhbnNsYXRvci5sYW5nKGxhbmcpO1xuICAgIH0pO1xuICB9KTtcbn0pO1xuXG4vLyBQb3B1cCBhbmltYXRpb25cbiQoJy5qcy1zaG93LXBvcHVwJykub24oJ2NsaWNrJywgZnVuY3Rpb24gKCkge1xuICAkKCcjaG9tZXBhZ2UtYmctYW5pbWF0aW9uJykuY3NzKCdkaXNwbGF5JywgJ25vbmUnKTtcbiAgYW5pbWUoe1xuICAgIHRhcmdldHM6ICcucG9wLXVwJyxcbiAgICB0cmFuc2xhdGVZOiAwLFxuICAgIG9wYWNpdHk6IDEsXG4gICAgZWFzaW5nOiAnbGluZWFyJyxcbiAgICBkdXJhdGlvbjogMzUwXG4gIH0pO1xuICBhbmltZSh7XG4gICAgdGFyZ2V0czogJy5wb3AtdXBfX2JnJyxcbiAgICBvcGFjaXR5OiAxLFxuICAgIGVhc2luZzogJ2xpbmVhcicsXG4gICAgZHVyYXRpb246IDMwMCxcbiAgICBkZWxheTogNTAwXG4gIH0pO1xuICBhbmltZSh7XG4gICAgdGFyZ2V0czogWycucG9wLXVwX190aXRsZScsICcucG9wLXVwX19zdWJ0aXRsZSddLFxuICAgIG9wYWNpdHk6IDEsXG4gICAgZWFzaW5nOiAnbGluZWFyJyxcbiAgICBkdXJhdGlvbjogMjAwLFxuICAgIGRlbGF5OiA4MDBcbiAgfSk7XG4gIGFuaW1lKHtcbiAgICB0YXJnZXRzOiAnLmxpc3QtZm9ybSAubGlzdC1mb3JtX19maWVsZCcsXG4gICAgdHJhbnNsYXRlWTogMCxcbiAgICBvcGFjaXR5OiAxLFxuICAgIGVhc2luZzogJ2xpbmVhcicsXG4gICAgZHVyYXRpb246IDQwMCxcbiAgICBkZWxheTogNzAwXG4gIH0pO1xuICBhbmltZSh7XG4gICAgdGFyZ2V0czogJy5saXN0LWZvcm0gLmJ0bicsXG4gICAgb3BhY2l0eTogMSxcbiAgICBlYXNpbmc6ICdsaW5lYXInLFxuICAgIGR1cmF0aW9uOiA0MDAsXG4gICAgZGVsYXk6IDExMDBcbiAgfSk7XG59KTtcbiQoJy5qcy1wb3B1cC1jbG9zZScpLm9uKCdjbGljaycsIGZ1bmN0aW9uICgpIHtcbiAgJCgnI2hvbWVwYWdlLWJnLWFuaW1hdGlvbicpLmNzcygnZGlzcGxheScsICdibG9jaycpO1xuICBhbmltZSh7XG4gICAgdGFyZ2V0czogJy5wb3AtdXAnLFxuICAgIHRyYW5zbGF0ZVk6ICcxMDAlJyxcbiAgICBvcGFjaXR5OiAwLFxuICAgIGVhc2luZzogJ2xpbmVhcicsXG4gICAgZGVsYXk6IDYwMCxcbiAgICBkdXJhdGlvbjogMjAwXG4gIH0pO1xuICBhbmltZSh7XG4gICAgdGFyZ2V0czogWycucG9wLXVwX190aXRsZScsICcucG9wLXVwX19zdWJ0aXRsZSddLFxuICAgIG9wYWNpdHk6IDAsXG4gICAgZWFzaW5nOiAnbGluZWFyJyxcbiAgICBkdXJhdGlvbjogMjAwXG4gIH0pO1xuICBhbmltZSh7XG4gICAgdGFyZ2V0czogJy5saXN0LWZvcm0gLmxpc3QtZm9ybV9fZmllbGQnLFxuICAgIG9wYWNpdHk6IDAsXG4gICAgZWFzaW5nOiAnbGluZWFyJyxcbiAgICBkdXJhdGlvbjogMzAwXG4gIH0pO1xuICBhbmltZSh7XG4gICAgdGFyZ2V0czogJy5saXN0LWZvcm0gLmJ0bicsXG4gICAgb3BhY2l0eTogMCxcbiAgICBlYXNpbmc6ICdsaW5lYXInLFxuICAgIGR1cmF0aW9uOiAzMDBcbiAgfSk7XG59KTtcbiQoZG9jdW1lbnQpLnJlYWR5KGZ1bmN0aW9uICgpIHtcbiAgJCgnLnBvcC11cCcpLmNzcygnb3BhY2l0eScsICcxJyk7XG4gICQoWycucG9wLXVwX190aXRsZScsICcucG9wLXVwX19zdWJ0aXRsZScsICcubGlzdC1mb3JtIC5saXN0LWZvcm1fX2ZpZWxkJywgJy5saXN0LWZvcm0gLmJ0biddLmpvaW4oXCIsIFwiKSkuY3NzKCdvcGFjaXR5JywgJzAnKTtcbn0pO1xuLy8gRmllbGQgbGFiZWwgYW5pbWF0aW9uXG4kKGRvY3VtZW50KS5yZWFkeShmdW5jdGlvbiAoKSB7XG4gICQoJy5saXN0LWZvcm0gLmxpc3QtZm9ybV9fbGFiZWwnKS5lYWNoKGZ1bmN0aW9uICgpIHtcbiAgICAkKHRoaXMpLmNzcygndHJhbnNmb3JtJywgJ3RyYW5zbGF0ZVkoMTJweCknKTtcbiAgICAkKHRoaXMpLmNzcygnZm9udC1zaXplJywgJzE0cHgnKVxuICB9KTtcbn0pO1xuJCgnLmxpc3QtZm9ybSAubGlzdC1mb3JtX19pbnB1dCcpLmZvY3VzKGZ1bmN0aW9uICgpIHtcbiAgJCh0aGlzKS5wYXJlbnQoKS5hZGRDbGFzcygnZm9jdXNlZCcpO1xuICBhbmltZSh7XG4gICAgdGFyZ2V0czogJy5saXN0LWZvcm1fX2ZpZWxkLmZvY3VzZWQgLmxpc3QtZm9ybV9fbGFiZWwnLFxuICAgIHRyYW5zbGF0ZVk6ICctMTJweCcsXG4gICAgZm9udFNpemU6IDEyLFxuICAgIGVhc2luZzogJ2xpbmVhcicsXG4gICAgZHVyYXRpb246IDIwMFxuICB9KTtcbn0pO1xuJCgnLmxpc3QtZm9ybSAubGlzdC1mb3JtX19pbnB1dCcpLmZvY3Vzb3V0KGZ1bmN0aW9uICgpIHtcbiAgaWYoJCh0aGlzKS52YWwoKSkge1xuICAgICQodGhpcykucGFyZW50KCkuYWRkQ2xhc3MoJ2ZpbGwnKTtcbiAgfVxuICBlbHNlIHtcbiAgICBhbmltZSh7XG4gICAgICB0YXJnZXRzOiAnLmxpc3QtZm9ybV9fZmllbGQuZm9jdXNlZCAubGlzdC1mb3JtX19sYWJlbCcsXG4gICAgICB0cmFuc2xhdGVZOiAnMTRweCcsXG4gICAgICBmb250U2l6ZTogMTYsXG4gICAgICBlYXNpbmc6ICdsaW5lYXInLFxuICAgICAgZHVyYXRpb246IDIwMFxuICAgIH0pO1xuICAgIGlmKCQodGhpcykucGFyZW50KCkuaGFzQ2xhc3MoJ2ZpbGwnKSkge1xuICAgICAgJCh0aGlzKS5wYXJlbnQoKS5yZW1vdmVDbGFzcygnZmlsbCcpXG4gICAgfVxuICB9XG4gICQodGhpcykucGFyZW50KCkucmVtb3ZlQ2xhc3MoJ2ZvY3VzZWQnKTtcbn0pO1xuXG4vLyBIb21lcGFnZSBiZyBhbmltYXRpb25cbnZhciBtQ29udGFpbmVyO1xudmFyIG1DYW1lcmEsIG1SZW5kZXJlcjtcbnZhciBtQ29udHJvbHM7XG52YXIgbVNjZW5lO1xudmFyIG1QYXJ0aWNsZUNvdW50ID0gODAwMDtcbnZhciBtUGFydGljbGVTeXN0ZW07XG52YXIgbVRpbWUgPSAwLjA7XG52YXIgbVRpbWVTdGVwID0gKDEvMjcwKTtcbnZhciBtRHVyYXRpb24gPSAyMDtcblxud2luZG93Lm9ubG9hZCA9IGZ1bmN0aW9uICgpIHtcbiAgaW5pdCgpO1xufTtcblxuZnVuY3Rpb24gaW5pdCgpIHtcbiAgaW5pdFRIUkVFKCk7XG4gIGluaXRDb250cm9scygpO1xuICBpbml0UGFydGljbGVTeXN0ZW0oKTtcblxuICByZXF1ZXN0QW5pbWF0aW9uRnJhbWUodGljayk7XG4gIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKCdyZXNpemUnLCByZXNpemUsIGZhbHNlKTtcbn1cbmZ1bmN0aW9uIGluaXRUSFJFRSgpIHtcbiAgbVJlbmRlcmVyID0gbmV3IFRIUkVFLldlYkdMUmVuZGVyZXIoe2FudGlhbGlhczogdHJ1ZX0pO1xuICBtUmVuZGVyZXIuc2V0U2l6ZSgkKCcud3JhcHBlcicpLndpZHRoKCksICQoJy53cmFwcGVyJykuaGVpZ2h0KCkpO1xuICBtUmVuZGVyZXIuc2V0Q2xlYXJDb2xvcigweDMwNGZmZSk7XG5cbiAgbUNvbnRhaW5lciA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdob21lcGFnZS1iZy1hbmltYXRpb24nKTtcbiAgbUNvbnRhaW5lci5hcHBlbmRDaGlsZChtUmVuZGVyZXIuZG9tRWxlbWVudCk7XG5cbiAgbUNhbWVyYSA9IG5ldyBUSFJFRS5QZXJzcGVjdGl2ZUNhbWVyYSg2MCwgJCgnLndyYXBwZXInKS53aWR0aCgpIC8gJCgnLndyYXBwZXInKS5oZWlnaHQoKSwgMC4xLCA1MDAwKTtcbiAgbUNhbWVyYS5wb3NpdGlvbi5zZXQoLTEzMDAsIDAsIDApO1xuXG4gIG1TY2VuZSA9IG5ldyBUSFJFRS5TY2VuZSgpO1xuXG4gIHZhciBsaWdodDtcblxuICBsaWdodCA9IG5ldyBUSFJFRS5BbWJpZW50TGlnaHQoMHhmZmZmZmYpO1xuICBtU2NlbmUuYWRkKGxpZ2h0KTtcbn1cbmZ1bmN0aW9uIGluaXRDb250cm9scygpIHtcbiAgbUNvbnRyb2xzID0gbmV3IFRIUkVFLk9yYml0Q29udHJvbHMobUNhbWVyYSwgbVJlbmRlcmVyLmRvbUVsZW1lbnQpO1xuICBtQ29udHJvbHMuZW5hYmxlZCA9IGZhbHNlO1xufVxuZnVuY3Rpb24gaW5pdFBhcnRpY2xlU3lzdGVtKCkge1xuICB2YXIgcHJlZmFiR2VvbWV0cnkgPSBuZXcgVEhSRUUuUGxhbmVHZW9tZXRyeSg0LCA0KTtcbiAgdmFyIGJ1ZmZlckdlb21ldHJ5ID0gbmV3IFRIUkVFLkJBUy5QcmVmYWJCdWZmZXJHZW9tZXRyeShwcmVmYWJHZW9tZXRyeSwgbVBhcnRpY2xlQ291bnQpO1xuXG4gIGJ1ZmZlckdlb21ldHJ5LmNvbXB1dGVWZXJ0ZXhOb3JtYWxzKCk7XG5cbiAgLy8gZ2VuZXJhdGUgYWRkaXRpb25hbCBnZW9tZXRyeSBkYXRhXG4gIHZhciBhT2Zmc2V0ID0gYnVmZmVyR2VvbWV0cnkuY3JlYXRlQXR0cmlidXRlKCdhT2Zmc2V0JywgMSk7XG4gIHZhciBhU3RhcnRQb3NpdGlvbiA9IGJ1ZmZlckdlb21ldHJ5LmNyZWF0ZUF0dHJpYnV0ZSgnYVN0YXJ0UG9zaXRpb24nLCAzKTtcbiAgdmFyIGFDb250cm9sUG9pbnQxID0gYnVmZmVyR2VvbWV0cnkuY3JlYXRlQXR0cmlidXRlKCdhQ29udHJvbFBvaW50MScsIDMpO1xuICB2YXIgYUNvbnRyb2xQb2ludDIgPSBidWZmZXJHZW9tZXRyeS5jcmVhdGVBdHRyaWJ1dGUoJ2FDb250cm9sUG9pbnQyJywgMyk7XG4gIHZhciBhRW5kUG9zaXRpb24gPSBidWZmZXJHZW9tZXRyeS5jcmVhdGVBdHRyaWJ1dGUoJ2FFbmRQb3NpdGlvbicsIDMpO1xuICB2YXIgYUF4aXNBbmdsZSA9IGJ1ZmZlckdlb21ldHJ5LmNyZWF0ZUF0dHJpYnV0ZSgnYUF4aXNBbmdsZScsIDQpO1xuICB2YXIgYUNvbG9yID0gYnVmZmVyR2VvbWV0cnkuY3JlYXRlQXR0cmlidXRlKCdjb2xvcicsIDMpO1xuXG4gIHZhciBpLCBqLCBvZmZzZXQ7XG5cbiAgLy8gYnVmZmVyIHRpbWUgb2Zmc2V0XG4gIHZhciBkZWxheTtcblxuICBmb3IgKGkgPSAwLCBvZmZzZXQgPSAwOyBpIDwgbVBhcnRpY2xlQ291bnQ7IGkrKykge1xuICAgIGRlbGF5ID0gaSAvIG1QYXJ0aWNsZUNvdW50ICogbUR1cmF0aW9uO1xuXG4gICAgZm9yIChqID0gMDsgaiA8IHByZWZhYkdlb21ldHJ5LnZlcnRpY2VzLmxlbmd0aDsgaisrKSB7XG4gICAgICBhT2Zmc2V0LmFycmF5W29mZnNldCsrXSA9IGRlbGF5O1xuICAgIH1cbiAgfVxuXG4gIC8vIGJ1ZmZlciBzdGFydCBwb3NpdGlvbnNcbiAgdmFyIHgsIHksIHo7XG5cbiAgZm9yIChpID0gMCwgb2Zmc2V0ID0gMDsgaSA8IG1QYXJ0aWNsZUNvdW50OyBpKyspIHtcbiAgICB4ID0gMDtcbiAgICB5ID0gMTAwMDtcbiAgICB6ID0gMDtcblxuICAgIGZvciAoaiA9IDA7IGogPCBwcmVmYWJHZW9tZXRyeS52ZXJ0aWNlcy5sZW5ndGg7IGorKykge1xuICAgICAgYVN0YXJ0UG9zaXRpb24uYXJyYXlbb2Zmc2V0KytdID0geDtcbiAgICAgIGFTdGFydFBvc2l0aW9uLmFycmF5W29mZnNldCsrXSA9IHk7XG4gICAgICBhU3RhcnRQb3NpdGlvbi5hcnJheVtvZmZzZXQrK10gPSB6O1xuICAgIH1cbiAgfVxuXG4gIC8vIGJ1ZmZlciBjb250cm9sIHBvaW50c1xuXG4gIGZvciAoaSA9IDAsIG9mZnNldCA9IDA7IGkgPCBtUGFydGljbGVDb3VudDsgaSsrKSB7XG4gICAgeCA9IFRIUkVFLk1hdGgucmFuZEZsb2F0KC00MDAsIDQwMCk7XG4gICAgeSA9IFRIUkVFLk1hdGgucmFuZEZsb2F0KDQwMCwgNjAwKTtcbiAgICB6ID0gVEhSRUUuTWF0aC5yYW5kRmxvYXQoLTE4MDAsIC00MDApO1xuXG4gICAgZm9yIChqID0gMDsgaiA8IHByZWZhYkdlb21ldHJ5LnZlcnRpY2VzLmxlbmd0aDsgaisrKSB7XG4gICAgICBhQ29udHJvbFBvaW50MS5hcnJheVtvZmZzZXQrK10gPSB4O1xuICAgICAgYUNvbnRyb2xQb2ludDEuYXJyYXlbb2Zmc2V0KytdID0geTtcbiAgICAgIGFDb250cm9sUG9pbnQxLmFycmF5W29mZnNldCsrXSA9IHo7XG4gICAgfVxuICB9XG5cbiAgZm9yIChpID0gMCwgb2Zmc2V0ID0gMDsgaSA8IG1QYXJ0aWNsZUNvdW50OyBpKyspIHtcbiAgICB4ID0gVEhSRUUuTWF0aC5yYW5kRmxvYXQoLTQwMCwgNDAwKTtcbiAgICB5ID0gVEhSRUUuTWF0aC5yYW5kRmxvYXQoLTYwMCwgLTQwMCk7XG4gICAgeiA9IFRIUkVFLk1hdGgucmFuZEZsb2F0KDQwMCwgMTgwMCk7XG5cbiAgICBmb3IgKGogPSAwOyBqIDwgcHJlZmFiR2VvbWV0cnkudmVydGljZXMubGVuZ3RoOyBqKyspIHtcbiAgICAgIGFDb250cm9sUG9pbnQyLmFycmF5W29mZnNldCsrXSA9IHg7XG4gICAgICBhQ29udHJvbFBvaW50Mi5hcnJheVtvZmZzZXQrK10gPSB5O1xuICAgICAgYUNvbnRyb2xQb2ludDIuYXJyYXlbb2Zmc2V0KytdID0gejtcbiAgICB9XG4gIH1cblxuICAvLyBidWZmZXIgZW5kIHBvc2l0aW9uc1xuXG4gIGZvciAoaSA9IDAsIG9mZnNldCA9IDA7IGkgPCBtUGFydGljbGVDb3VudDsgaSsrKSB7XG4gICAgeCA9IDA7XG4gICAgeSA9IC0xMDAwO1xuICAgIHogPSAwO1xuXG4gICAgZm9yIChqID0gMDsgaiA8IHByZWZhYkdlb21ldHJ5LnZlcnRpY2VzLmxlbmd0aDsgaisrKSB7XG4gICAgICBhRW5kUG9zaXRpb24uYXJyYXlbb2Zmc2V0KytdID0geDtcbiAgICAgIGFFbmRQb3NpdGlvbi5hcnJheVtvZmZzZXQrK10gPSB5O1xuICAgICAgYUVuZFBvc2l0aW9uLmFycmF5W29mZnNldCsrXSA9IHo7XG4gICAgfVxuICB9XG5cbiAgLy8gYnVmZmVyIGF4aXMgYW5nbGVcbiAgdmFyIGF4aXMgPSBuZXcgVEhSRUUuVmVjdG9yMygpO1xuICB2YXIgYW5nbGUgPSAwO1xuXG4gIGZvciAoaSA9IDAsIG9mZnNldCA9IDA7IGkgPCBtUGFydGljbGVDb3VudDsgaSsrKSB7XG4gICAgYXhpcy54ID0gVEhSRUUuTWF0aC5yYW5kRmxvYXRTcHJlYWQoMik7XG4gICAgYXhpcy55ID0gVEhSRUUuTWF0aC5yYW5kRmxvYXRTcHJlYWQoMik7XG4gICAgYXhpcy56ID0gVEhSRUUuTWF0aC5yYW5kRmxvYXRTcHJlYWQoMik7XG4gICAgYXhpcy5ub3JtYWxpemUoKTtcblxuICAgIGFuZ2xlID0gTWF0aC5QSSAqIFRIUkVFLk1hdGgucmFuZEludCgxNiwgMzIpO1xuXG4gICAgZm9yIChqID0gMDsgaiA8IHByZWZhYkdlb21ldHJ5LnZlcnRpY2VzLmxlbmd0aDsgaisrKSB7XG4gICAgICBhQXhpc0FuZ2xlLmFycmF5W29mZnNldCsrXSA9IGF4aXMueDtcbiAgICAgIGFBeGlzQW5nbGUuYXJyYXlbb2Zmc2V0KytdID0gYXhpcy55O1xuICAgICAgYUF4aXNBbmdsZS5hcnJheVtvZmZzZXQrK10gPSBheGlzLno7XG4gICAgICBhQXhpc0FuZ2xlLmFycmF5W29mZnNldCsrXSA9IGFuZ2xlO1xuICAgIH1cbiAgfVxuXG4gIC8vIGJ1ZmZlciBjb2xvclxuICB2YXIgY29sb3IgPSBuZXcgVEhSRUUuQ29sb3IoKTtcbiAgdmFyIGgsIHMsIGw7XG5cbiAgZm9yIChpID0gMCwgb2Zmc2V0ID0gMDsgaSA8IG1QYXJ0aWNsZUNvdW50OyBpKyspIHtcbiAgICBoID0gMDtcbiAgICBzID0gMDtcbiAgICBsID0gMDtcblxuICAgIGNvbG9yLnNldEhTTChoLCBzLCBsKTtcblxuICAgIGZvciAoaiA9IDA7IGogPCBwcmVmYWJHZW9tZXRyeS52ZXJ0aWNlcy5sZW5ndGg7IGorKykge1xuICAgICAgYUNvbG9yLmFycmF5W29mZnNldCsrXSA9IGNvbG9yLnI7XG4gICAgICBhQ29sb3IuYXJyYXlbb2Zmc2V0KytdID0gY29sb3IuZztcbiAgICAgIGFDb2xvci5hcnJheVtvZmZzZXQrK10gPSBjb2xvci5iO1xuICAgIH1cbiAgfVxuXG4gIHZhciBtYXRlcmlhbCA9IG5ldyBUSFJFRS5CQVMuUGhvbmdBbmltYXRpb25NYXRlcmlhbChcbiAgICAvLyBjdXN0b20gcGFyYW1ldGVycyAmIFRIUkVFLk1lc2hQaG9uZ01hdGVyaWFsIHBhcmFtZXRlcnNcbiAgICB7XG4gICAgICB2ZXJ0ZXhDb2xvcnM6IFRIUkVFLlZlcnRleENvbG9ycyxcbiAgICAgIHNoYWRpbmc6IFRIUkVFLkZsYXRTaGFkaW5nLFxuICAgICAgc2lkZTogVEhSRUUuRG91YmxlU2lkZSxcbiAgICAgIHVuaWZvcm1zOiB7XG4gICAgICAgIHVUaW1lOiB7dHlwZTogJ2YnLCB2YWx1ZTogMH0sXG4gICAgICAgIHVEdXJhdGlvbjoge3R5cGU6ICdmJywgdmFsdWU6IG1EdXJhdGlvbn1cbiAgICAgIH0sXG4gICAgICBzaGFkZXJGdW5jdGlvbnM6IFtcbiAgICAgICAgVEhSRUUuQkFTLlNoYWRlckNodW5rWydxdWF0ZXJuaW9uX3JvdGF0aW9uJ10sXG4gICAgICAgIFRIUkVFLkJBUy5TaGFkZXJDaHVua1snY3ViaWNfYmV6aWVyJ11cbiAgICAgIF0sXG4gICAgICBzaGFkZXJQYXJhbWV0ZXJzOiBbXG4gICAgICAgICd1bmlmb3JtIGZsb2F0IHVUaW1lOycsXG4gICAgICAgICd1bmlmb3JtIGZsb2F0IHVEdXJhdGlvbjsnLFxuICAgICAgICAnYXR0cmlidXRlIGZsb2F0IGFPZmZzZXQ7JyxcbiAgICAgICAgJ2F0dHJpYnV0ZSB2ZWMzIGFTdGFydFBvc2l0aW9uOycsXG4gICAgICAgICdhdHRyaWJ1dGUgdmVjMyBhQ29udHJvbFBvaW50MTsnLFxuICAgICAgICAnYXR0cmlidXRlIHZlYzMgYUNvbnRyb2xQb2ludDI7JyxcbiAgICAgICAgJ2F0dHJpYnV0ZSB2ZWMzIGFFbmRQb3NpdGlvbjsnLFxuICAgICAgICAnYXR0cmlidXRlIHZlYzQgYUF4aXNBbmdsZTsnXG4gICAgICBdLFxuICAgICAgc2hhZGVyVmVydGV4SW5pdDogW1xuICAgICAgICAnZmxvYXQgdFByb2dyZXNzID0gbW9kKCh1VGltZSArIGFPZmZzZXQpLCB1RHVyYXRpb24pIC8gdUR1cmF0aW9uOycsXG5cbiAgICAgICAgJ2Zsb2F0IGFuZ2xlID0gYUF4aXNBbmdsZS53ICogdFByb2dyZXNzOycsXG4gICAgICAgICd2ZWM0IHRRdWF0ID0gcXVhdEZyb21BeGlzQW5nbGUoYUF4aXNBbmdsZS54eXosIGFuZ2xlKTsnXG4gICAgICBdLFxuICAgICAgc2hhZGVyVHJhbnNmb3JtTm9ybWFsOiBbXG4gICAgICAgICdvYmplY3ROb3JtYWwgPSByb3RhdGVWZWN0b3IodFF1YXQsIG9iamVjdE5vcm1hbCk7J1xuICAgICAgXSxcbiAgICAgIHNoYWRlclRyYW5zZm9ybVBvc2l0aW9uOiBbXG4gICAgICAgICd0cmFuc2Zvcm1lZCA9IHJvdGF0ZVZlY3Rvcih0UXVhdCwgdHJhbnNmb3JtZWQpOycsXG4gICAgICAgICd0cmFuc2Zvcm1lZCArPSBjdWJpY0JlemllcihhU3RhcnRQb3NpdGlvbiwgYUNvbnRyb2xQb2ludDEsIGFDb250cm9sUG9pbnQyLCBhRW5kUG9zaXRpb24sIHRQcm9ncmVzcyk7J1xuICAgICAgXVxuICAgIH0sXG4gICAgLy8gVEhSRUUuTWVzaFBob25nTWF0ZXJpYWwgdW5pZm9ybXNcbiAgICB7XG4gICAgICBzcGVjdWxhcjogMHhmZjAwMDAsXG4gICAgICBzaGluaW5lc3M6IDIwXG4gICAgfVxuICApO1xuICBtUGFydGljbGVTeXN0ZW0gPSBuZXcgVEhSRUUuTWVzaChidWZmZXJHZW9tZXRyeSwgbWF0ZXJpYWwpO1xuICAvLyBiZWNhdXNlIHRoZSBib3VuZGluZyBib3ggb2YgdGhlIHBhcnRpY2xlIHN5c3RlbSBkb2VzIG5vdCByZWZsZWN0IGl0cyBvbi1zY3JlZW4gc2l6ZVxuICAvLyBzZXQgdGhpcyB0byBmYWxzZSB0byBwcmV2ZW50IHRoZSB3aG9sZSB0aGluZyBmcm9tIGRpc2FwcGVhcmluZyBvbiBjZXJ0YWluIGFuZ2xlc1xuICBtUGFydGljbGVTeXN0ZW0uZnJ1c3R1bUN1bGxlZCA9IGZhbHNlO1xuICBtU2NlbmUuYWRkKG1QYXJ0aWNsZVN5c3RlbSk7XG59XG5mdW5jdGlvbiB0aWNrKCkge1xuICB1cGRhdGUoKTtcbiAgcmVuZGVyKCk7XG5cbiAgbVRpbWUgKz0gbVRpbWVTdGVwO1xuICBtVGltZSAlPSBtRHVyYXRpb247XG5cbiAgcmVxdWVzdEFuaW1hdGlvbkZyYW1lKHRpY2spO1xufVxuZnVuY3Rpb24gdXBkYXRlKCkge1xuICBtQ29udHJvbHMudXBkYXRlKCk7XG4gIG1QYXJ0aWNsZVN5c3RlbS5tYXRlcmlhbC51bmlmb3Jtc1sndVRpbWUnXS52YWx1ZSA9IG1UaW1lO1xufVxuZnVuY3Rpb24gcmVuZGVyKCkge1xuICBtUmVuZGVyZXIucmVuZGVyKG1TY2VuZSwgbUNhbWVyYSk7XG59XG5mdW5jdGlvbiByZXNpemUoKSB7XG4gIGxldCB3aWR0aCA9ICQoJy53cmFwcGVyJykud2lkdGgoKSxcbiAgICAgIGhlaWdodCA9ICQoJy53cmFwcGVyJykuaGVpZ2h0KCk7XG5cbiAgbUNhbWVyYS5hc3BlY3QgPSB3aWR0aCAvIGhlaWdodDtcbiAgbUNhbWVyYS51cGRhdGVQcm9qZWN0aW9uTWF0cml4KCk7XG5cbiAgbVJlbmRlcmVyLnNldFNpemUod2lkdGgsIGhlaWdodCk7XG59XG5cbi8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBidWZmZXIgYW5pbWF0aW9uIHN5c3RlbVxuLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy9cblxuVEhSRUUuQkFTID0ge307XG5USFJFRS5CQVMuU2hhZGVyQ2h1bmsgPSB7fTtcblRIUkVFLkJBUy5TaGFkZXJDaHVua1tcImFuaW1hdGlvbl90aW1lXCJdID0gXCJmbG9hdCB0RGVsYXkgPSBhQW5pbWF0aW9uLng7XFxuZmxvYXQgdER1cmF0aW9uID0gYUFuaW1hdGlvbi55O1xcbmZsb2F0IHRUaW1lID0gY2xhbXAodVRpbWUgLSB0RGVsYXksIDAuMCwgdER1cmF0aW9uKTtcXG5mbG9hdCB0UHJvZ3Jlc3MgPSBlYXNlKHRUaW1lLCAwLjAsIDEuMCwgdER1cmF0aW9uKTtcXG5cIjtcblRIUkVFLkJBUy5TaGFkZXJDaHVua1tcImN1YmljX2JlemllclwiXSA9IFwidmVjMyBjdWJpY0Jlemllcih2ZWMzIHAwLCB2ZWMzIGMwLCB2ZWMzIGMxLCB2ZWMzIHAxLCBmbG9hdCB0KVxcbntcXG4gICAgdmVjMyB0cDtcXG4gICAgZmxvYXQgdG4gPSAxLjAgLSB0O1xcblxcbiAgICB0cC54eXogPSB0biAqIHRuICogdG4gKiBwMC54eXogKyAzLjAgKiB0biAqIHRuICogdCAqIGMwLnh5eiArIDMuMCAqIHRuICogdCAqIHQgKiBjMS54eXogKyB0ICogdCAqIHQgKiBwMS54eXo7XFxuXFxuICAgIHJldHVybiB0cDtcXG59XFxuXCI7XG5USFJFRS5CQVMuU2hhZGVyQ2h1bmtbXCJlYXNlX2luX2N1YmljXCJdID0gXCJmbG9hdCBlYXNlKGZsb2F0IHQsIGZsb2F0IGIsIGZsb2F0IGMsIGZsb2F0IGQpIHtcXG4gIHJldHVybiBjKih0Lz1kKSp0KnQgKyBiO1xcbn1cXG5cIjtcblRIUkVFLkJBUy5TaGFkZXJDaHVua1tcImVhc2VfaW5fcXVhZFwiXSA9IFwiZmxvYXQgZWFzZShmbG9hdCB0LCBmbG9hdCBiLCBmbG9hdCBjLCBmbG9hdCBkKSB7XFxuICByZXR1cm4gYyoodC89ZCkqdCArIGI7XFxufVxcblwiO1xuVEhSRUUuQkFTLlNoYWRlckNodW5rW1wiZWFzZV9vdXRfY3ViaWNcIl0gPSBcImZsb2F0IGVhc2UoZmxvYXQgdCwgZmxvYXQgYiwgZmxvYXQgYywgZmxvYXQgZCkge1xcbiAgcmV0dXJuIGMqKCh0PXQvZCAtIDEuMCkqdCp0ICsgMS4wKSArIGI7XFxufVxcblwiO1xuVEhSRUUuQkFTLlNoYWRlckNodW5rW1wicXVhdGVybmlvbl9yb3RhdGlvblwiXSA9IFwidmVjMyByb3RhdGVWZWN0b3IodmVjNCBxLCB2ZWMzIHYpXFxue1xcbiAgICByZXR1cm4gdiArIDIuMCAqIGNyb3NzKHEueHl6LCBjcm9zcyhxLnh5eiwgdikgKyBxLncgKiB2KTtcXG59XFxuXFxudmVjNCBxdWF0RnJvbUF4aXNBbmdsZSh2ZWMzIGF4aXMsIGZsb2F0IGFuZ2xlKVxcbntcXG4gICAgZmxvYXQgaGFsZkFuZ2xlID0gYW5nbGUgKiAwLjU7XFxuICAgIHJldHVybiB2ZWM0KGF4aXMueHl6ICogc2luKGhhbGZBbmdsZSksIGNvcyhoYWxmQW5nbGUpKTtcXG59XFxuXCI7XG5cblRIUkVFLkJBUy5QcmVmYWJCdWZmZXJHZW9tZXRyeSA9IGZ1bmN0aW9uIChwcmVmYWIsIGNvdW50KSB7XG4gIFRIUkVFLkJ1ZmZlckdlb21ldHJ5LmNhbGwodGhpcyk7XG5cbiAgdGhpcy5wcmVmYWJHZW9tZXRyeSA9IHByZWZhYjtcbiAgdGhpcy5wcmVmYWJDb3VudCA9IGNvdW50O1xuICB0aGlzLnByZWZhYlZlcnRleENvdW50ID0gcHJlZmFiLnZlcnRpY2VzLmxlbmd0aDtcblxuICB0aGlzLmJ1ZmZlckRlZmF1bHRzKCk7XG59O1xuVEhSRUUuQkFTLlByZWZhYkJ1ZmZlckdlb21ldHJ5LnByb3RvdHlwZSA9IE9iamVjdC5jcmVhdGUoVEhSRUUuQnVmZmVyR2VvbWV0cnkucHJvdG90eXBlKTtcblRIUkVFLkJBUy5QcmVmYWJCdWZmZXJHZW9tZXRyeS5wcm90b3R5cGUuY29uc3RydWN0b3IgPSBUSFJFRS5CQVMuUHJlZmFiQnVmZmVyR2VvbWV0cnk7XG5USFJFRS5CQVMuUHJlZmFiQnVmZmVyR2VvbWV0cnkucHJvdG90eXBlLmJ1ZmZlckRlZmF1bHRzID0gZnVuY3Rpb24gKCkge1xuICB2YXIgcHJlZmFiRmFjZUNvdW50ID0gdGhpcy5wcmVmYWJHZW9tZXRyeS5mYWNlcy5sZW5ndGg7XG4gIHZhciBwcmVmYWJJbmRleENvdW50ID0gdGhpcy5wcmVmYWJHZW9tZXRyeS5mYWNlcy5sZW5ndGggKiAzO1xuICB2YXIgcHJlZmFiVmVydGV4Q291bnQgPSB0aGlzLnByZWZhYlZlcnRleENvdW50ID0gdGhpcy5wcmVmYWJHZW9tZXRyeS52ZXJ0aWNlcy5sZW5ndGg7XG4gIHZhciBwcmVmYWJJbmRpY2VzID0gW107XG5cbiAgZm9yICh2YXIgaCA9IDA7IGggPCBwcmVmYWJGYWNlQ291bnQ7IGgrKykge1xuICAgIHZhciBmYWNlID0gdGhpcy5wcmVmYWJHZW9tZXRyeS5mYWNlc1toXTtcbiAgICBwcmVmYWJJbmRpY2VzLnB1c2goZmFjZS5hLCBmYWNlLmIsIGZhY2UuYyk7XG4gIH1cblxuICB2YXIgaW5kZXhCdWZmZXIgPSBuZXcgVWludDMyQXJyYXkodGhpcy5wcmVmYWJDb3VudCAqIHByZWZhYkluZGV4Q291bnQpO1xuICB2YXIgcG9zaXRpb25CdWZmZXIgPSBuZXcgRmxvYXQzMkFycmF5KHRoaXMucHJlZmFiQ291bnQgKiBwcmVmYWJWZXJ0ZXhDb3VudCAqIDMpO1xuXG4gIHRoaXMuc2V0SW5kZXgobmV3IFRIUkVFLkJ1ZmZlckF0dHJpYnV0ZShpbmRleEJ1ZmZlciwgMSkpO1xuICB0aGlzLmFkZEF0dHJpYnV0ZSgncG9zaXRpb24nLCBuZXcgVEhSRUUuQnVmZmVyQXR0cmlidXRlKHBvc2l0aW9uQnVmZmVyLCAzKSk7XG5cbiAgZm9yICh2YXIgaSA9IDAsIG9mZnNldCA9IDA7IGkgPCB0aGlzLnByZWZhYkNvdW50OyBpKyspIHtcbiAgICBmb3IgKHZhciBqID0gMDsgaiA8IHByZWZhYlZlcnRleENvdW50OyBqKyssIG9mZnNldCArPSAzKSB7XG4gICAgICB2YXIgcHJlZmFiVmVydGV4ID0gdGhpcy5wcmVmYWJHZW9tZXRyeS52ZXJ0aWNlc1tqXTtcblxuICAgICAgcG9zaXRpb25CdWZmZXJbb2Zmc2V0ICAgIF0gPSBwcmVmYWJWZXJ0ZXgueDtcbiAgICAgIHBvc2l0aW9uQnVmZmVyW29mZnNldCArIDFdID0gcHJlZmFiVmVydGV4Lnk7XG4gICAgICBwb3NpdGlvbkJ1ZmZlcltvZmZzZXQgKyAyXSA9IHByZWZhYlZlcnRleC56O1xuICAgIH1cblxuICAgIGZvciAodmFyIGsgPSAwOyBrIDwgcHJlZmFiSW5kZXhDb3VudDsgaysrKSB7XG4gICAgICBpbmRleEJ1ZmZlcltpICogcHJlZmFiSW5kZXhDb3VudCArIGtdID0gcHJlZmFiSW5kaWNlc1trXSArIGkgKiBwcmVmYWJWZXJ0ZXhDb3VudDtcbiAgICB9XG4gIH1cbn07XG5cbi8qKlxuICogYmFzZWQgb24gQnVmZmVyR2VvbWV0cnkuY29tcHV0ZVZlcnRleE5vcm1hbHNcbiAqIGNhbGN1bGF0ZSB2ZXJ0ZXggbm9ybWFscyBmb3IgYSBwcmVmYWIsIGFuZCByZXBlYXQgdGhlIGRhdGEgaW4gdGhlIG5vcm1hbCBidWZmZXJcbiAqL1xuVEhSRUUuQkFTLlByZWZhYkJ1ZmZlckdlb21ldHJ5LnByb3RvdHlwZS5jb21wdXRlVmVydGV4Tm9ybWFscyA9IGZ1bmN0aW9uICgpIHtcbiAgdmFyIGluZGV4ID0gdGhpcy5pbmRleDtcbiAgdmFyIGF0dHJpYnV0ZXMgPSB0aGlzLmF0dHJpYnV0ZXM7XG4gIHZhciBwb3NpdGlvbnMgPSBhdHRyaWJ1dGVzLnBvc2l0aW9uLmFycmF5O1xuXG4gIGlmIChhdHRyaWJ1dGVzLm5vcm1hbCA9PT0gdW5kZWZpbmVkKSB7XG4gICAgdGhpcy5hZGRBdHRyaWJ1dGUoJ25vcm1hbCcsIG5ldyBUSFJFRS5CdWZmZXJBdHRyaWJ1dGUobmV3IEZsb2F0MzJBcnJheShwb3NpdGlvbnMubGVuZ3RoKSwgMykpO1xuICB9XG5cbiAgdmFyIG5vcm1hbHMgPSBhdHRyaWJ1dGVzLm5vcm1hbC5hcnJheTtcblxuICB2YXIgdkEsIHZCLCB2QyxcblxuICAgIHBBID0gbmV3IFRIUkVFLlZlY3RvcjMoKSxcbiAgICBwQiA9IG5ldyBUSFJFRS5WZWN0b3IzKCksXG4gICAgcEMgPSBuZXcgVEhSRUUuVmVjdG9yMygpLFxuXG4gICAgY2IgPSBuZXcgVEhSRUUuVmVjdG9yMygpLFxuICAgIGFiID0gbmV3IFRIUkVFLlZlY3RvcjMoKTtcblxuICB2YXIgaW5kaWNlcyA9IGluZGV4LmFycmF5O1xuICB2YXIgcHJlZmFiSW5kZXhDb3VudCA9IHRoaXMucHJlZmFiR2VvbWV0cnkuZmFjZXMubGVuZ3RoICogMztcblxuICBmb3IgKHZhciBpID0gMDsgaSA8IHByZWZhYkluZGV4Q291bnQ7IGkgKz0gMykge1xuICAgIHZBID0gaW5kaWNlc1tpICsgMF0gKiAzO1xuICAgIHZCID0gaW5kaWNlc1tpICsgMV0gKiAzO1xuICAgIHZDID0gaW5kaWNlc1tpICsgMl0gKiAzO1xuXG4gICAgcEEuZnJvbUFycmF5KHBvc2l0aW9ucywgdkEpO1xuICAgIHBCLmZyb21BcnJheShwb3NpdGlvbnMsIHZCKTtcbiAgICBwQy5mcm9tQXJyYXkocG9zaXRpb25zLCB2Qyk7XG5cbiAgICBjYi5zdWJWZWN0b3JzKHBDLCBwQik7XG4gICAgYWIuc3ViVmVjdG9ycyhwQSwgcEIpO1xuICAgIGNiLmNyb3NzKGFiKTtcblxuICAgIG5vcm1hbHNbdkFdICs9IGNiLng7XG4gICAgbm9ybWFsc1t2QSArIDFdICs9IGNiLnk7XG4gICAgbm9ybWFsc1t2QSArIDJdICs9IGNiLno7XG5cbiAgICBub3JtYWxzW3ZCXSArPSBjYi54O1xuICAgIG5vcm1hbHNbdkIgKyAxXSArPSBjYi55O1xuICAgIG5vcm1hbHNbdkIgKyAyXSArPSBjYi56O1xuXG4gICAgbm9ybWFsc1t2Q10gKz0gY2IueDtcbiAgICBub3JtYWxzW3ZDICsgMV0gKz0gY2IueTtcbiAgICBub3JtYWxzW3ZDICsgMl0gKz0gY2IuejtcbiAgfVxuXG4gIGZvciAodmFyIGogPSAxOyBqIDwgdGhpcy5wcmVmYWJDb3VudDsgaisrKSB7XG4gICAgZm9yICh2YXIgayA9IDA7IGsgPCBwcmVmYWJJbmRleENvdW50OyBrKyspIHtcbiAgICAgIG5vcm1hbHNbaiAqIHByZWZhYkluZGV4Q291bnQgKyBrXSA9IG5vcm1hbHNba107XG4gICAgfVxuICB9XG5cbiAgdGhpcy5ub3JtYWxpemVOb3JtYWxzKCk7XG5cbiAgYXR0cmlidXRlcy5ub3JtYWwubmVlZHNVcGRhdGUgPSB0cnVlO1xufTtcblRIUkVFLkJBUy5QcmVmYWJCdWZmZXJHZW9tZXRyeS5wcm90b3R5cGUuY3JlYXRlQXR0cmlidXRlID0gZnVuY3Rpb24gKG5hbWUsIGl0ZW1TaXplKSB7XG4gIHZhciBidWZmZXIgPSBuZXcgRmxvYXQzMkFycmF5KHRoaXMucHJlZmFiQ291bnQgKiB0aGlzLnByZWZhYlZlcnRleENvdW50ICogaXRlbVNpemUpO1xuICB2YXIgYXR0cmlidXRlID0gbmV3IFRIUkVFLkJ1ZmZlckF0dHJpYnV0ZShidWZmZXIsIGl0ZW1TaXplKTtcblxuICB0aGlzLmFkZEF0dHJpYnV0ZShuYW1lLCBhdHRyaWJ1dGUpO1xuXG4gIHJldHVybiBhdHRyaWJ1dGU7XG59O1xuVEhSRUUuQkFTLlByZWZhYkJ1ZmZlckdlb21ldHJ5LnByb3RvdHlwZS5zZXRBdHRyaWJ1dGU0ID0gZnVuY3Rpb24gKG5hbWUsIGRhdGEpIHtcbiAgdmFyIG9mZnNldCA9IDA7XG4gIHZhciBhcnJheSA9IHRoaXMuZ2VvbWV0cnkuYXR0cmlidXRlc1tuYW1lXS5hcnJheTtcbiAgdmFyIGksIGo7XG5cbiAgZm9yIChpID0gMDsgaSA8IGRhdGEubGVuZ3RoOyBpKyspIHtcbiAgICB2YXIgdiA9IGRhdGFbaV07XG5cbiAgICBmb3IgKGogPSAwOyBqIDwgdGhpcy5wcmVmYWJWZXJ0ZXhDb3VudDsgaisrKSB7XG4gICAgICBhcnJheVtvZmZzZXQrK10gPSB2Lng7XG4gICAgICBhcnJheVtvZmZzZXQrK10gPSB2Lnk7XG4gICAgICBhcnJheVtvZmZzZXQrK10gPSB2Lno7XG4gICAgICBhcnJheVtvZmZzZXQrK10gPSB2Lnc7XG4gICAgfVxuICB9XG5cbiAgdGhpcy5nZW9tZXRyeS5hdHRyaWJ1dGVzW25hbWVdLm5lZWRzVXBkYXRlID0gdHJ1ZTtcbn07XG5USFJFRS5CQVMuUHJlZmFiQnVmZmVyR2VvbWV0cnkucHJvdG90eXBlLnNldEF0dHJpYnV0ZTMgPSBmdW5jdGlvbiAobmFtZSwgZGF0YSkge1xuICB2YXIgb2Zmc2V0ID0gMDtcbiAgdmFyIGFycmF5ID0gdGhpcy5nZW9tZXRyeS5hdHRyaWJ1dGVzW25hbWVdLmFycmF5O1xuICB2YXIgaSwgajtcblxuICBmb3IgKGkgPSAwOyBpIDwgZGF0YS5sZW5ndGg7IGkrKykge1xuICAgIHZhciB2ID0gZGF0YVtpXTtcblxuICAgIGZvciAoaiA9IDA7IGogPCB0aGlzLnByZWZhYlZlcnRleENvdW50OyBqKyspIHtcbiAgICAgIGFycmF5W29mZnNldCsrXSA9IHYueDtcbiAgICAgIGFycmF5W29mZnNldCsrXSA9IHYueTtcbiAgICAgIGFycmF5W29mZnNldCsrXSA9IHYuejtcbiAgICB9XG4gIH1cblxuICB0aGlzLmdlb21ldHJ5LmF0dHJpYnV0ZXNbbmFtZV0ubmVlZHNVcGRhdGUgPSB0cnVlO1xufTtcblRIUkVFLkJBUy5QcmVmYWJCdWZmZXJHZW9tZXRyeS5wcm90b3R5cGUuc2V0QXR0cmlidXRlMiA9IGZ1bmN0aW9uIChuYW1lLCBkYXRhKSB7XG4gIHZhciBvZmZzZXQgPSAwO1xuICB2YXIgYXJyYXkgPSB0aGlzLmdlb21ldHJ5LmF0dHJpYnV0ZXNbbmFtZV0uYXJyYXk7XG4gIHZhciBpLCBqO1xuXG4gIGZvciAoaSA9IDA7IGkgPCB0aGlzLnByZWZhYkNvdW50OyBpKyspIHtcbiAgICB2YXIgdiA9IGRhdGFbaV07XG5cbiAgICBmb3IgKGogPSAwOyBqIDwgdGhpcy5wcmVmYWJWZXJ0ZXhDb3VudDsgaisrKSB7XG4gICAgICBhcnJheVtvZmZzZXQrK10gPSB2Lng7XG4gICAgICBhcnJheVtvZmZzZXQrK10gPSB2Lnk7XG4gICAgfVxuICB9XG5cbiAgdGhpcy5nZW9tZXRyeS5hdHRyaWJ1dGVzW25hbWVdLm5lZWRzVXBkYXRlID0gdHJ1ZTtcbn07XG5cblRIUkVFLkJBUy5CYXNlQW5pbWF0aW9uTWF0ZXJpYWwgPSBmdW5jdGlvbihwYXJhbWV0ZXJzKSB7XG4gIFRIUkVFLlNoYWRlck1hdGVyaWFsLmNhbGwodGhpcyk7XG5cbiAgdGhpcy5zaGFkZXJGdW5jdGlvbnMgPSBbXTtcbiAgdGhpcy5zaGFkZXJQYXJhbWV0ZXJzID0gW107XG4gIHRoaXMuc2hhZGVyVmVydGV4SW5pdCA9IFtdO1xuICB0aGlzLnNoYWRlclRyYW5zZm9ybU5vcm1hbCA9IFtdO1xuICB0aGlzLnNoYWRlclRyYW5zZm9ybVBvc2l0aW9uID0gW107XG5cbiAgdGhpcy5zZXRWYWx1ZXMocGFyYW1ldGVycyk7XG59O1xuVEhSRUUuQkFTLkJhc2VBbmltYXRpb25NYXRlcmlhbC5wcm90b3R5cGUgPSBPYmplY3QuY3JlYXRlKFRIUkVFLlNoYWRlck1hdGVyaWFsLnByb3RvdHlwZSk7XG5USFJFRS5CQVMuQmFzZUFuaW1hdGlvbk1hdGVyaWFsLnByb3RvdHlwZS5jb25zdHJ1Y3RvciA9IFRIUkVFLkJBUy5CYXNlQW5pbWF0aW9uTWF0ZXJpYWw7XG5cbi8vIGFic3RyYWN0XG5USFJFRS5CQVMuQmFzZUFuaW1hdGlvbk1hdGVyaWFsLnByb3RvdHlwZS5fY29uY2F0VmVydGV4U2hhZGVyID0gZnVuY3Rpb24oKSB7XG4gIHJldHVybiAnJztcbn07XG5USFJFRS5CQVMuQmFzZUFuaW1hdGlvbk1hdGVyaWFsLnByb3RvdHlwZS5fY29uY2F0RnVuY3Rpb25zID0gZnVuY3Rpb24oKSB7XG4gIHJldHVybiB0aGlzLnNoYWRlckZ1bmN0aW9ucy5qb2luKCdcXG4nKTtcbn07XG5USFJFRS5CQVMuQmFzZUFuaW1hdGlvbk1hdGVyaWFsLnByb3RvdHlwZS5fY29uY2F0UGFyYW1ldGVycyA9IGZ1bmN0aW9uKCkge1xuICByZXR1cm4gdGhpcy5zaGFkZXJQYXJhbWV0ZXJzLmpvaW4oJ1xcbicpO1xufTtcblRIUkVFLkJBUy5CYXNlQW5pbWF0aW9uTWF0ZXJpYWwucHJvdG90eXBlLl9jb25jYXRWZXJ0ZXhJbml0ID0gZnVuY3Rpb24oKSB7XG4gIHJldHVybiB0aGlzLnNoYWRlclZlcnRleEluaXQuam9pbignXFxuJyk7XG59O1xuVEhSRUUuQkFTLkJhc2VBbmltYXRpb25NYXRlcmlhbC5wcm90b3R5cGUuX2NvbmNhdFRyYW5zZm9ybU5vcm1hbCA9IGZ1bmN0aW9uKCkge1xuICByZXR1cm4gdGhpcy5zaGFkZXJUcmFuc2Zvcm1Ob3JtYWwuam9pbignXFxuJyk7XG59O1xuVEhSRUUuQkFTLkJhc2VBbmltYXRpb25NYXRlcmlhbC5wcm90b3R5cGUuX2NvbmNhdFRyYW5zZm9ybVBvc2l0aW9uID0gZnVuY3Rpb24oKSB7XG4gIHJldHVybiB0aGlzLnNoYWRlclRyYW5zZm9ybVBvc2l0aW9uLmpvaW4oJ1xcbicpO1xufTtcblRIUkVFLkJBUy5CYXNlQW5pbWF0aW9uTWF0ZXJpYWwucHJvdG90eXBlLnNldFVuaWZvcm1WYWx1ZXMgPSBmdW5jdGlvbih2YWx1ZXMpIHtcbiAgZm9yICh2YXIga2V5IGluIHZhbHVlcykge1xuICAgIGlmIChrZXkgaW4gdGhpcy51bmlmb3Jtcykge1xuICAgICAgdmFyIHVuaWZvcm0gPSB0aGlzLnVuaWZvcm1zW2tleV07XG4gICAgICB2YXIgdmFsdWUgPSB2YWx1ZXNba2V5XTtcblxuICAgICAgLy8gdG9kbyBhZGQgbWF0cml4IHVuaWZvcm0gdHlwZXNcbiAgICAgIHN3aXRjaCAodW5pZm9ybS50eXBlKSB7XG4gICAgICAgIGNhc2UgJ2MnOiAvLyBjb2xvclxuICAgICAgICAgIHVuaWZvcm0udmFsdWUuc2V0KHZhbHVlKTtcbiAgICAgICAgICBicmVhaztcbiAgICAgICAgY2FzZSAndjInOiAvLyB2ZWN0b3JzXG4gICAgICAgIGNhc2UgJ3YzJzpcbiAgICAgICAgY2FzZSAndjQnOlxuICAgICAgICAgIHVuaWZvcm0udmFsdWUuY29weSh2YWx1ZSk7XG4gICAgICAgICAgYnJlYWs7XG4gICAgICAgIGNhc2UgJ2YnOiAvLyBmbG9hdFxuICAgICAgICBjYXNlICd0JzogLy8gdGV4dHVyZVxuICAgICAgICAgIHVuaWZvcm0udmFsdWUgPSB2YWx1ZTtcbiAgICAgIH1cbiAgICB9XG4gIH1cbn07XG5cblRIUkVFLkJBUy5QaG9uZ0FuaW1hdGlvbk1hdGVyaWFsID0gZnVuY3Rpb24ocGFyYW1ldGVycywgdW5pZm9ybVZhbHVlcykge1xuICBUSFJFRS5CQVMuQmFzZUFuaW1hdGlvbk1hdGVyaWFsLmNhbGwodGhpcywgcGFyYW1ldGVycyk7XG5cbiAgdmFyIHBob25nU2hhZGVyID0gVEhSRUUuU2hhZGVyTGliWydwaG9uZyddO1xuXG4gIHRoaXMudW5pZm9ybXMgPSBUSFJFRS5Vbmlmb3Jtc1V0aWxzLm1lcmdlKFtwaG9uZ1NoYWRlci51bmlmb3JtcywgdGhpcy51bmlmb3Jtc10pO1xuICB0aGlzLmxpZ2h0cyA9IHRydWU7XG4gIHRoaXMudmVydGV4U2hhZGVyID0gdGhpcy5fY29uY2F0VmVydGV4U2hhZGVyKCk7XG4gIHRoaXMuZnJhZ21lbnRTaGFkZXIgPSBwaG9uZ1NoYWRlci5mcmFnbWVudFNoYWRlcjtcblxuICAvLyB0b2RvIGFkZCBtaXNzaW5nIGRlZmF1bHQgZGVmaW5lc1xuICB1bmlmb3JtVmFsdWVzLm1hcCAmJiAodGhpcy5kZWZpbmVzWydVU0VfTUFQJ10gPSAnJyk7XG4gIHVuaWZvcm1WYWx1ZXMubm9ybWFsTWFwICYmICh0aGlzLmRlZmluZXNbJ1VTRV9OT1JNQUxNQVAnXSA9ICcnKTtcblxuICB0aGlzLnNldFVuaWZvcm1WYWx1ZXModW5pZm9ybVZhbHVlcyk7XG59O1xuVEhSRUUuQkFTLlBob25nQW5pbWF0aW9uTWF0ZXJpYWwucHJvdG90eXBlID0gT2JqZWN0LmNyZWF0ZShUSFJFRS5CQVMuQmFzZUFuaW1hdGlvbk1hdGVyaWFsLnByb3RvdHlwZSk7XG5USFJFRS5CQVMuUGhvbmdBbmltYXRpb25NYXRlcmlhbC5wcm90b3R5cGUuY29uc3RydWN0b3IgPSBUSFJFRS5CQVMuUGhvbmdBbmltYXRpb25NYXRlcmlhbDtcblRIUkVFLkJBUy5QaG9uZ0FuaW1hdGlvbk1hdGVyaWFsLnByb3RvdHlwZS5fY29uY2F0VmVydGV4U2hhZGVyID0gZnVuY3Rpb24oKSB7XG4gIC8vIGJhc2VkIG9uIFRIUkVFLlNoYWRlckxpYi5waG9uZ1xuICByZXR1cm4gW1xuICAgIFwiI2RlZmluZSBQSE9OR1wiLFxuXG4gICAgXCJ2YXJ5aW5nIHZlYzMgdlZpZXdQb3NpdGlvbjtcIixcblxuICAgIFwiI2lmbmRlZiBGTEFUX1NIQURFRFwiLFxuXG4gICAgXCJcdHZhcnlpbmcgdmVjMyB2Tm9ybWFsO1wiLFxuXG4gICAgXCIjZW5kaWZcIixcblxuICAgIFRIUkVFLlNoYWRlckNodW5rWyBcImNvbW1vblwiIF0sXG4gICAgVEhSRUUuU2hhZGVyQ2h1bmtbIFwidXZfcGFyc192ZXJ0ZXhcIiBdLFxuICAgIFRIUkVFLlNoYWRlckNodW5rWyBcInV2Ml9wYXJzX3ZlcnRleFwiIF0sXG4gICAgVEhSRUUuU2hhZGVyQ2h1bmtbIFwiZGlzcGxhY2VtZW50bWFwX3BhcnNfdmVydGV4XCIgXSxcbiAgICBUSFJFRS5TaGFkZXJDaHVua1sgXCJlbnZtYXBfcGFyc192ZXJ0ZXhcIiBdLFxuICAgIFRIUkVFLlNoYWRlckNodW5rWyBcImxpZ2h0c19waG9uZ19wYXJzX3ZlcnRleFwiIF0sXG4gICAgVEhSRUUuU2hhZGVyQ2h1bmtbIFwiY29sb3JfcGFyc192ZXJ0ZXhcIiBdLFxuICAgIFRIUkVFLlNoYWRlckNodW5rWyBcIm1vcnBodGFyZ2V0X3BhcnNfdmVydGV4XCIgXSxcbiAgICBUSFJFRS5TaGFkZXJDaHVua1sgXCJza2lubmluZ19wYXJzX3ZlcnRleFwiIF0sXG4gICAgVEhSRUUuU2hhZGVyQ2h1bmtbIFwic2hhZG93bWFwX3BhcnNfdmVydGV4XCIgXSxcbiAgICBUSFJFRS5TaGFkZXJDaHVua1sgXCJsb2dkZXB0aGJ1Zl9wYXJzX3ZlcnRleFwiIF0sXG5cbiAgICB0aGlzLl9jb25jYXRGdW5jdGlvbnMoKSxcblxuICAgIHRoaXMuX2NvbmNhdFBhcmFtZXRlcnMoKSxcblxuICAgIFwidm9pZCBtYWluKCkge1wiLFxuXG4gICAgdGhpcy5fY29uY2F0VmVydGV4SW5pdCgpLFxuXG4gICAgVEhSRUUuU2hhZGVyQ2h1bmtbIFwidXZfdmVydGV4XCIgXSxcbiAgICBUSFJFRS5TaGFkZXJDaHVua1sgXCJ1djJfdmVydGV4XCIgXSxcbiAgICBUSFJFRS5TaGFkZXJDaHVua1sgXCJjb2xvcl92ZXJ0ZXhcIiBdLFxuICAgIFRIUkVFLlNoYWRlckNodW5rWyBcImJlZ2lubm9ybWFsX3ZlcnRleFwiIF0sXG5cbiAgICB0aGlzLl9jb25jYXRUcmFuc2Zvcm1Ob3JtYWwoKSxcblxuICAgIFRIUkVFLlNoYWRlckNodW5rWyBcIm1vcnBobm9ybWFsX3ZlcnRleFwiIF0sXG4gICAgVEhSRUUuU2hhZGVyQ2h1bmtbIFwic2tpbmJhc2VfdmVydGV4XCIgXSxcbiAgICBUSFJFRS5TaGFkZXJDaHVua1sgXCJza2lubm9ybWFsX3ZlcnRleFwiIF0sXG4gICAgVEhSRUUuU2hhZGVyQ2h1bmtbIFwiZGVmYXVsdG5vcm1hbF92ZXJ0ZXhcIiBdLFxuXG4gICAgXCIjaWZuZGVmIEZMQVRfU0hBREVEXCIsIC8vIE5vcm1hbCBjb21wdXRlZCB3aXRoIGRlcml2YXRpdmVzIHdoZW4gRkxBVF9TSEFERURcblxuICAgIFwiXHR2Tm9ybWFsID0gbm9ybWFsaXplKCB0cmFuc2Zvcm1lZE5vcm1hbCApO1wiLFxuXG4gICAgXCIjZW5kaWZcIixcblxuICAgIFRIUkVFLlNoYWRlckNodW5rWyBcImJlZ2luX3ZlcnRleFwiIF0sXG5cbiAgICB0aGlzLl9jb25jYXRUcmFuc2Zvcm1Qb3NpdGlvbigpLFxuXG4gICAgVEhSRUUuU2hhZGVyQ2h1bmtbIFwiZGlzcGxhY2VtZW50bWFwX3ZlcnRleFwiIF0sXG4gICAgVEhSRUUuU2hhZGVyQ2h1bmtbIFwibW9ycGh0YXJnZXRfdmVydGV4XCIgXSxcbiAgICBUSFJFRS5TaGFkZXJDaHVua1sgXCJza2lubmluZ192ZXJ0ZXhcIiBdLFxuICAgIFRIUkVFLlNoYWRlckNodW5rWyBcInByb2plY3RfdmVydGV4XCIgXSxcbiAgICBUSFJFRS5TaGFkZXJDaHVua1sgXCJsb2dkZXB0aGJ1Zl92ZXJ0ZXhcIiBdLFxuXG4gICAgXCJcdHZWaWV3UG9zaXRpb24gPSAtIG12UG9zaXRpb24ueHl6O1wiLFxuXG4gICAgVEhSRUUuU2hhZGVyQ2h1bmtbIFwid29ybGRwb3NfdmVydGV4XCIgXSxcbiAgICBUSFJFRS5TaGFkZXJDaHVua1sgXCJlbnZtYXBfdmVydGV4XCIgXSxcbiAgICBUSFJFRS5TaGFkZXJDaHVua1sgXCJsaWdodHNfcGhvbmdfdmVydGV4XCIgXSxcbiAgICBUSFJFRS5TaGFkZXJDaHVua1sgXCJzaGFkb3dtYXBfdmVydGV4XCIgXSxcblxuICAgIFwifVwiXG5cbiAgXS5qb2luKCBcIlxcblwiICk7XG59OyJdLCJmaWxlIjoiYXBwLmpzIn0=
