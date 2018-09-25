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
    }
  }

  var translator = $('body').translate({lang: "en", t: dict});
  $('.lang-sw__select').change(function() {
    $( "option:selected" ).each(function() {
      var lang = $(this).attr("data-value");
      translator.lang(lang);
    });
  });

  //E-mail Ajax Send
	$("form").submit(function() {
		var th = $(this);
		$.ajax({
			type: "POST",
			url: "https://stage.codearty.com/mail.php",
			data: th.serialize()
		}).done(function() {
			alert("Thank you!");
			setTimeout(function() {
				// Done Functions
				th.trigger("reset");
			}, 1000);
		});
		return false;
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
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiIiwic291cmNlcyI6WyJhcHAuanMiXSwic291cmNlc0NvbnRlbnQiOlsiLy8gVHJhbnNsYXRpb25cbiQoZG9jdW1lbnQpLnJlYWR5KGZ1bmN0aW9uKCl7XG4gIHZhciBkaWN0ID0ge1xuICAgIFwiV2UgYnVpbGQgZGlnaXRhbDxicj5wcm9kdWN0cyAmYW1wOyBzZXJ2aWNlc1wiIDoge1xuICAgICAgcnU6IFwi0JzRiyDRgNCw0LfRgNCw0LHQsNGC0YvQstCw0LXQvCA8YnI+0YbQuNGE0YDQvtCy0YvQtSDQv9GA0L7QtNGD0LrRgtGLINC4INGB0LXRgNCy0LjRgdGLXCJcbiAgICB9LFxuICAgIFwiV2UgdHVybiB0ZWNobm9sb2dpZXMgYW5kIGRlc2lnbiBpbnRvIGEgc29sdXRpb24gZm9yIHlvdXIgYnVzaW5lc3NcIiA6IHtcbiAgICAgIHJ1OiBcItCf0YDQtdCy0YDQsNGJ0LDQtdC8INGC0LXRhdC90L7Qu9C+0LPQuNC4INC4INC00LjQt9Cw0LnQvSDQsiDRgNC10YjQtdC90LjRjyDQtNC70Y8g0JLQsNGI0LXQs9C+INCx0LjQt9C90LXRgdCwXCJcbiAgICB9LFxuICAgIFwiU3RhcnQgdGhlIHByb2plY3RcIjoge1xuICAgICAgcnU6IFwi0JfQsNC/0YPRgdGC0LjRgtGMINC/0YDQvtC10LrRglwiXG4gICAgfSxcbiAgICBcIkhlbGxvIENvZGVBcnR5XCI6IHtcbiAgICAgIHJ1OiBcItCf0YDQuNCy0LXRgiBDb2RlQXJ0eVwiXG4gICAgfSxcbiAgICBcIkRpc2N1c3MgeW91ciBwcm9qZWN0XCI6IHtcbiAgICAgIHJ1OiBcItCe0LHRgdGD0LTQuNGC0Ywg0L/RgNC+0LXQutGCXCJcbiAgICB9LFxuICAgIFwiR28gYWhlYWQsIGdyZWF0IHRoaW5ncyBzdGFydCB3aXRoIGZpbGxpbmcgb3V0IHRoaXMgY29udGFjdCBmb3JtXCI6IHtcbiAgICAgIHJ1OiBcItCa0YDRg9GC0YvQtSDQv9GA0L7QtdC60YLRiyDQvdCw0YfQuNC90LDRjtGC0YHRjyDRgSDQt9Cw0L/QvtC70L3QtdC90LjRjyDRjdGC0L7QuSDRhNC+0YDQvNGLXCJcbiAgICB9LFxuICAgIFwiWW91ciBuYW1lXCI6IHtcbiAgICAgIHJ1OiBcItCY0LzRj1wiXG4gICAgfSxcbiAgICBcIkVtYWlsIGFkZHJlc3NcIjoge1xuICAgICAgcnU6IFwiRW1haWxcIlxuICAgIH0sXG4gICAgXCJQaG9uZSAob3B0aW9uYWwpXCI6IHtcbiAgICAgIHJ1OiBcItCi0LXQu9C10YTQvtC9ICjQvdC10L7QsdGP0LfQsNGC0LXQu9GM0L3QvilcIlxuICAgIH0sXG4gICAgXCJDb21wYW55XCI6IHtcbiAgICAgIHJ1OiBcItCa0L7QvNC/0LDQvdC40Y9cIlxuICAgIH0sXG4gICAgXCJUZWxsIHVzIGFib3V0IHlvdXIgaWRlYVwiOiB7XG4gICAgICBydTogXCLQoNCw0YHRgdC60LDQttC40YLQtSDQviDRgdCy0L7QtdC5INC40LTQtdC1XCJcbiAgICB9LFxuICAgIFwiU3VibWl0XCI6IHtcbiAgICAgIHJ1OiBcItCe0YHRgtCw0LLQuNGC0Ywg0LfQsNGP0LLQutGDXCJcbiAgICB9XG4gIH1cblxuICB2YXIgdHJhbnNsYXRvciA9ICQoJ2JvZHknKS50cmFuc2xhdGUoe2xhbmc6IFwiZW5cIiwgdDogZGljdH0pO1xuICAkKCcubGFuZy1zd19fc2VsZWN0JykuY2hhbmdlKGZ1bmN0aW9uKCkge1xuICAgICQoIFwib3B0aW9uOnNlbGVjdGVkXCIgKS5lYWNoKGZ1bmN0aW9uKCkge1xuICAgICAgdmFyIGxhbmcgPSAkKHRoaXMpLmF0dHIoXCJkYXRhLXZhbHVlXCIpO1xuICAgICAgdHJhbnNsYXRvci5sYW5nKGxhbmcpO1xuICAgIH0pO1xuICB9KTtcblxuICAvL0UtbWFpbCBBamF4IFNlbmRcblx0JChcImZvcm1cIikuc3VibWl0KGZ1bmN0aW9uKCkge1xuXHRcdHZhciB0aCA9ICQodGhpcyk7XG5cdFx0JC5hamF4KHtcblx0XHRcdHR5cGU6IFwiUE9TVFwiLFxuXHRcdFx0dXJsOiBcImh0dHBzOi8vc3RhZ2UuY29kZWFydHkuY29tL21haWwucGhwXCIsXG5cdFx0XHRkYXRhOiB0aC5zZXJpYWxpemUoKVxuXHRcdH0pLmRvbmUoZnVuY3Rpb24oKSB7XG5cdFx0XHRhbGVydChcIlRoYW5rIHlvdSFcIik7XG5cdFx0XHRzZXRUaW1lb3V0KGZ1bmN0aW9uKCkge1xuXHRcdFx0XHQvLyBEb25lIEZ1bmN0aW9uc1xuXHRcdFx0XHR0aC50cmlnZ2VyKFwicmVzZXRcIik7XG5cdFx0XHR9LCAxMDAwKTtcblx0XHR9KTtcblx0XHRyZXR1cm4gZmFsc2U7XG5cdH0pO1xufSk7XG5cbi8vIFBvcHVwIGFuaW1hdGlvblxuJCgnLmpzLXNob3ctcG9wdXAnKS5vbignY2xpY2snLCBmdW5jdGlvbiAoKSB7XG4gICQoJyNob21lcGFnZS1iZy1hbmltYXRpb24nKS5jc3MoJ2Rpc3BsYXknLCAnbm9uZScpO1xuICBhbmltZSh7XG4gICAgdGFyZ2V0czogJy5wb3AtdXAnLFxuICAgIHRyYW5zbGF0ZVk6IDAsXG4gICAgb3BhY2l0eTogMSxcbiAgICBlYXNpbmc6ICdsaW5lYXInLFxuICAgIGR1cmF0aW9uOiAzNTBcbiAgfSk7XG4gIGFuaW1lKHtcbiAgICB0YXJnZXRzOiAnLnBvcC11cF9fYmcnLFxuICAgIG9wYWNpdHk6IDEsXG4gICAgZWFzaW5nOiAnbGluZWFyJyxcbiAgICBkdXJhdGlvbjogMzAwLFxuICAgIGRlbGF5OiA1MDBcbiAgfSk7XG4gIGFuaW1lKHtcbiAgICB0YXJnZXRzOiBbJy5wb3AtdXBfX3RpdGxlJywgJy5wb3AtdXBfX3N1YnRpdGxlJ10sXG4gICAgb3BhY2l0eTogMSxcbiAgICBlYXNpbmc6ICdsaW5lYXInLFxuICAgIGR1cmF0aW9uOiAyMDAsXG4gICAgZGVsYXk6IDgwMFxuICB9KTtcbiAgYW5pbWUoe1xuICAgIHRhcmdldHM6ICcubGlzdC1mb3JtIC5saXN0LWZvcm1fX2ZpZWxkJyxcbiAgICB0cmFuc2xhdGVZOiAwLFxuICAgIG9wYWNpdHk6IDEsXG4gICAgZWFzaW5nOiAnbGluZWFyJyxcbiAgICBkdXJhdGlvbjogNDAwLFxuICAgIGRlbGF5OiA3MDBcbiAgfSk7XG4gIGFuaW1lKHtcbiAgICB0YXJnZXRzOiAnLmxpc3QtZm9ybSAuYnRuJyxcbiAgICBvcGFjaXR5OiAxLFxuICAgIGVhc2luZzogJ2xpbmVhcicsXG4gICAgZHVyYXRpb246IDQwMCxcbiAgICBkZWxheTogMTEwMFxuICB9KTtcbn0pO1xuJCgnLmpzLXBvcHVwLWNsb3NlJykub24oJ2NsaWNrJywgZnVuY3Rpb24gKCkge1xuICAkKCcjaG9tZXBhZ2UtYmctYW5pbWF0aW9uJykuY3NzKCdkaXNwbGF5JywgJ2Jsb2NrJyk7XG4gIGFuaW1lKHtcbiAgICB0YXJnZXRzOiAnLnBvcC11cCcsXG4gICAgdHJhbnNsYXRlWTogJzEwMCUnLFxuICAgIG9wYWNpdHk6IDAsXG4gICAgZWFzaW5nOiAnbGluZWFyJyxcbiAgICBkZWxheTogNjAwLFxuICAgIGR1cmF0aW9uOiAyMDBcbiAgfSk7XG4gIGFuaW1lKHtcbiAgICB0YXJnZXRzOiBbJy5wb3AtdXBfX3RpdGxlJywgJy5wb3AtdXBfX3N1YnRpdGxlJ10sXG4gICAgb3BhY2l0eTogMCxcbiAgICBlYXNpbmc6ICdsaW5lYXInLFxuICAgIGR1cmF0aW9uOiAyMDBcbiAgfSk7XG4gIGFuaW1lKHtcbiAgICB0YXJnZXRzOiAnLmxpc3QtZm9ybSAubGlzdC1mb3JtX19maWVsZCcsXG4gICAgb3BhY2l0eTogMCxcbiAgICBlYXNpbmc6ICdsaW5lYXInLFxuICAgIGR1cmF0aW9uOiAzMDBcbiAgfSk7XG4gIGFuaW1lKHtcbiAgICB0YXJnZXRzOiAnLmxpc3QtZm9ybSAuYnRuJyxcbiAgICBvcGFjaXR5OiAwLFxuICAgIGVhc2luZzogJ2xpbmVhcicsXG4gICAgZHVyYXRpb246IDMwMFxuICB9KTtcbn0pO1xuJChkb2N1bWVudCkucmVhZHkoZnVuY3Rpb24gKCkge1xuICAkKCcucG9wLXVwJykuY3NzKCdvcGFjaXR5JywgJzEnKTtcbiAgJChbJy5wb3AtdXBfX3RpdGxlJywgJy5wb3AtdXBfX3N1YnRpdGxlJywgJy5saXN0LWZvcm0gLmxpc3QtZm9ybV9fZmllbGQnLCAnLmxpc3QtZm9ybSAuYnRuJ10uam9pbihcIiwgXCIpKS5jc3MoJ29wYWNpdHknLCAnMCcpO1xufSk7XG4vLyBGaWVsZCBsYWJlbCBhbmltYXRpb25cbiQoZG9jdW1lbnQpLnJlYWR5KGZ1bmN0aW9uICgpIHtcbiAgJCgnLmxpc3QtZm9ybSAubGlzdC1mb3JtX19sYWJlbCcpLmVhY2goZnVuY3Rpb24gKCkge1xuICAgICQodGhpcykuY3NzKCd0cmFuc2Zvcm0nLCAndHJhbnNsYXRlWSgxMnB4KScpO1xuICAgICQodGhpcykuY3NzKCdmb250LXNpemUnLCAnMTRweCcpXG4gIH0pO1xufSk7XG4kKCcubGlzdC1mb3JtIC5saXN0LWZvcm1fX2lucHV0JykuZm9jdXMoZnVuY3Rpb24gKCkge1xuICAkKHRoaXMpLnBhcmVudCgpLmFkZENsYXNzKCdmb2N1c2VkJyk7XG4gIGFuaW1lKHtcbiAgICB0YXJnZXRzOiAnLmxpc3QtZm9ybV9fZmllbGQuZm9jdXNlZCAubGlzdC1mb3JtX19sYWJlbCcsXG4gICAgdHJhbnNsYXRlWTogJy0xMnB4JyxcbiAgICBmb250U2l6ZTogMTIsXG4gICAgZWFzaW5nOiAnbGluZWFyJyxcbiAgICBkdXJhdGlvbjogMjAwXG4gIH0pO1xufSk7XG4kKCcubGlzdC1mb3JtIC5saXN0LWZvcm1fX2lucHV0JykuZm9jdXNvdXQoZnVuY3Rpb24gKCkge1xuICBpZigkKHRoaXMpLnZhbCgpKSB7XG4gICAgJCh0aGlzKS5wYXJlbnQoKS5hZGRDbGFzcygnZmlsbCcpO1xuICB9XG4gIGVsc2Uge1xuICAgIGFuaW1lKHtcbiAgICAgIHRhcmdldHM6ICcubGlzdC1mb3JtX19maWVsZC5mb2N1c2VkIC5saXN0LWZvcm1fX2xhYmVsJyxcbiAgICAgIHRyYW5zbGF0ZVk6ICcxNHB4JyxcbiAgICAgIGZvbnRTaXplOiAxNixcbiAgICAgIGVhc2luZzogJ2xpbmVhcicsXG4gICAgICBkdXJhdGlvbjogMjAwXG4gICAgfSk7XG4gICAgaWYoJCh0aGlzKS5wYXJlbnQoKS5oYXNDbGFzcygnZmlsbCcpKSB7XG4gICAgICAkKHRoaXMpLnBhcmVudCgpLnJlbW92ZUNsYXNzKCdmaWxsJylcbiAgICB9XG4gIH1cbiAgJCh0aGlzKS5wYXJlbnQoKS5yZW1vdmVDbGFzcygnZm9jdXNlZCcpO1xufSk7XG5cbi8vIEhvbWVwYWdlIGJnIGFuaW1hdGlvblxudmFyIG1Db250YWluZXI7XG52YXIgbUNhbWVyYSwgbVJlbmRlcmVyO1xudmFyIG1Db250cm9scztcbnZhciBtU2NlbmU7XG52YXIgbVBhcnRpY2xlQ291bnQgPSA4MDAwO1xudmFyIG1QYXJ0aWNsZVN5c3RlbTtcbnZhciBtVGltZSA9IDAuMDtcbnZhciBtVGltZVN0ZXAgPSAoMS8yNzApO1xudmFyIG1EdXJhdGlvbiA9IDIwO1xuXG53aW5kb3cub25sb2FkID0gZnVuY3Rpb24gKCkge1xuICBpbml0KCk7XG59O1xuXG5mdW5jdGlvbiBpbml0KCkge1xuICBpbml0VEhSRUUoKTtcbiAgaW5pdENvbnRyb2xzKCk7XG4gIGluaXRQYXJ0aWNsZVN5c3RlbSgpO1xuXG4gIHJlcXVlc3RBbmltYXRpb25GcmFtZSh0aWNrKTtcbiAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoJ3Jlc2l6ZScsIHJlc2l6ZSwgZmFsc2UpO1xufVxuZnVuY3Rpb24gaW5pdFRIUkVFKCkge1xuICBtUmVuZGVyZXIgPSBuZXcgVEhSRUUuV2ViR0xSZW5kZXJlcih7YW50aWFsaWFzOiB0cnVlfSk7XG4gIG1SZW5kZXJlci5zZXRTaXplKCQoJy53cmFwcGVyJykud2lkdGgoKSwgJCgnLndyYXBwZXInKS5oZWlnaHQoKSk7XG4gIG1SZW5kZXJlci5zZXRDbGVhckNvbG9yKDB4MzA0ZmZlKTtcblxuICBtQ29udGFpbmVyID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2hvbWVwYWdlLWJnLWFuaW1hdGlvbicpO1xuICBtQ29udGFpbmVyLmFwcGVuZENoaWxkKG1SZW5kZXJlci5kb21FbGVtZW50KTtcblxuICBtQ2FtZXJhID0gbmV3IFRIUkVFLlBlcnNwZWN0aXZlQ2FtZXJhKDYwLCAkKCcud3JhcHBlcicpLndpZHRoKCkgLyAkKCcud3JhcHBlcicpLmhlaWdodCgpLCAwLjEsIDUwMDApO1xuICBtQ2FtZXJhLnBvc2l0aW9uLnNldCgtMTMwMCwgMCwgMCk7XG5cbiAgbVNjZW5lID0gbmV3IFRIUkVFLlNjZW5lKCk7XG5cbiAgdmFyIGxpZ2h0O1xuXG4gIGxpZ2h0ID0gbmV3IFRIUkVFLkFtYmllbnRMaWdodCgweGZmZmZmZik7XG4gIG1TY2VuZS5hZGQobGlnaHQpO1xufVxuZnVuY3Rpb24gaW5pdENvbnRyb2xzKCkge1xuICBtQ29udHJvbHMgPSBuZXcgVEhSRUUuT3JiaXRDb250cm9scyhtQ2FtZXJhLCBtUmVuZGVyZXIuZG9tRWxlbWVudCk7XG4gIG1Db250cm9scy5lbmFibGVkID0gZmFsc2U7XG59XG5mdW5jdGlvbiBpbml0UGFydGljbGVTeXN0ZW0oKSB7XG4gIHZhciBwcmVmYWJHZW9tZXRyeSA9IG5ldyBUSFJFRS5QbGFuZUdlb21ldHJ5KDQsIDQpO1xuICB2YXIgYnVmZmVyR2VvbWV0cnkgPSBuZXcgVEhSRUUuQkFTLlByZWZhYkJ1ZmZlckdlb21ldHJ5KHByZWZhYkdlb21ldHJ5LCBtUGFydGljbGVDb3VudCk7XG5cbiAgYnVmZmVyR2VvbWV0cnkuY29tcHV0ZVZlcnRleE5vcm1hbHMoKTtcblxuICAvLyBnZW5lcmF0ZSBhZGRpdGlvbmFsIGdlb21ldHJ5IGRhdGFcbiAgdmFyIGFPZmZzZXQgPSBidWZmZXJHZW9tZXRyeS5jcmVhdGVBdHRyaWJ1dGUoJ2FPZmZzZXQnLCAxKTtcbiAgdmFyIGFTdGFydFBvc2l0aW9uID0gYnVmZmVyR2VvbWV0cnkuY3JlYXRlQXR0cmlidXRlKCdhU3RhcnRQb3NpdGlvbicsIDMpO1xuICB2YXIgYUNvbnRyb2xQb2ludDEgPSBidWZmZXJHZW9tZXRyeS5jcmVhdGVBdHRyaWJ1dGUoJ2FDb250cm9sUG9pbnQxJywgMyk7XG4gIHZhciBhQ29udHJvbFBvaW50MiA9IGJ1ZmZlckdlb21ldHJ5LmNyZWF0ZUF0dHJpYnV0ZSgnYUNvbnRyb2xQb2ludDInLCAzKTtcbiAgdmFyIGFFbmRQb3NpdGlvbiA9IGJ1ZmZlckdlb21ldHJ5LmNyZWF0ZUF0dHJpYnV0ZSgnYUVuZFBvc2l0aW9uJywgMyk7XG4gIHZhciBhQXhpc0FuZ2xlID0gYnVmZmVyR2VvbWV0cnkuY3JlYXRlQXR0cmlidXRlKCdhQXhpc0FuZ2xlJywgNCk7XG4gIHZhciBhQ29sb3IgPSBidWZmZXJHZW9tZXRyeS5jcmVhdGVBdHRyaWJ1dGUoJ2NvbG9yJywgMyk7XG5cbiAgdmFyIGksIGosIG9mZnNldDtcblxuICAvLyBidWZmZXIgdGltZSBvZmZzZXRcbiAgdmFyIGRlbGF5O1xuXG4gIGZvciAoaSA9IDAsIG9mZnNldCA9IDA7IGkgPCBtUGFydGljbGVDb3VudDsgaSsrKSB7XG4gICAgZGVsYXkgPSBpIC8gbVBhcnRpY2xlQ291bnQgKiBtRHVyYXRpb247XG5cbiAgICBmb3IgKGogPSAwOyBqIDwgcHJlZmFiR2VvbWV0cnkudmVydGljZXMubGVuZ3RoOyBqKyspIHtcbiAgICAgIGFPZmZzZXQuYXJyYXlbb2Zmc2V0KytdID0gZGVsYXk7XG4gICAgfVxuICB9XG5cbiAgLy8gYnVmZmVyIHN0YXJ0IHBvc2l0aW9uc1xuICB2YXIgeCwgeSwgejtcblxuICBmb3IgKGkgPSAwLCBvZmZzZXQgPSAwOyBpIDwgbVBhcnRpY2xlQ291bnQ7IGkrKykge1xuICAgIHggPSAwO1xuICAgIHkgPSAxMDAwO1xuICAgIHogPSAwO1xuXG4gICAgZm9yIChqID0gMDsgaiA8IHByZWZhYkdlb21ldHJ5LnZlcnRpY2VzLmxlbmd0aDsgaisrKSB7XG4gICAgICBhU3RhcnRQb3NpdGlvbi5hcnJheVtvZmZzZXQrK10gPSB4O1xuICAgICAgYVN0YXJ0UG9zaXRpb24uYXJyYXlbb2Zmc2V0KytdID0geTtcbiAgICAgIGFTdGFydFBvc2l0aW9uLmFycmF5W29mZnNldCsrXSA9IHo7XG4gICAgfVxuICB9XG5cbiAgLy8gYnVmZmVyIGNvbnRyb2wgcG9pbnRzXG5cbiAgZm9yIChpID0gMCwgb2Zmc2V0ID0gMDsgaSA8IG1QYXJ0aWNsZUNvdW50OyBpKyspIHtcbiAgICB4ID0gVEhSRUUuTWF0aC5yYW5kRmxvYXQoLTQwMCwgNDAwKTtcbiAgICB5ID0gVEhSRUUuTWF0aC5yYW5kRmxvYXQoNDAwLCA2MDApO1xuICAgIHogPSBUSFJFRS5NYXRoLnJhbmRGbG9hdCgtMTgwMCwgLTQwMCk7XG5cbiAgICBmb3IgKGogPSAwOyBqIDwgcHJlZmFiR2VvbWV0cnkudmVydGljZXMubGVuZ3RoOyBqKyspIHtcbiAgICAgIGFDb250cm9sUG9pbnQxLmFycmF5W29mZnNldCsrXSA9IHg7XG4gICAgICBhQ29udHJvbFBvaW50MS5hcnJheVtvZmZzZXQrK10gPSB5O1xuICAgICAgYUNvbnRyb2xQb2ludDEuYXJyYXlbb2Zmc2V0KytdID0gejtcbiAgICB9XG4gIH1cblxuICBmb3IgKGkgPSAwLCBvZmZzZXQgPSAwOyBpIDwgbVBhcnRpY2xlQ291bnQ7IGkrKykge1xuICAgIHggPSBUSFJFRS5NYXRoLnJhbmRGbG9hdCgtNDAwLCA0MDApO1xuICAgIHkgPSBUSFJFRS5NYXRoLnJhbmRGbG9hdCgtNjAwLCAtNDAwKTtcbiAgICB6ID0gVEhSRUUuTWF0aC5yYW5kRmxvYXQoNDAwLCAxODAwKTtcblxuICAgIGZvciAoaiA9IDA7IGogPCBwcmVmYWJHZW9tZXRyeS52ZXJ0aWNlcy5sZW5ndGg7IGorKykge1xuICAgICAgYUNvbnRyb2xQb2ludDIuYXJyYXlbb2Zmc2V0KytdID0geDtcbiAgICAgIGFDb250cm9sUG9pbnQyLmFycmF5W29mZnNldCsrXSA9IHk7XG4gICAgICBhQ29udHJvbFBvaW50Mi5hcnJheVtvZmZzZXQrK10gPSB6O1xuICAgIH1cbiAgfVxuXG4gIC8vIGJ1ZmZlciBlbmQgcG9zaXRpb25zXG5cbiAgZm9yIChpID0gMCwgb2Zmc2V0ID0gMDsgaSA8IG1QYXJ0aWNsZUNvdW50OyBpKyspIHtcbiAgICB4ID0gMDtcbiAgICB5ID0gLTEwMDA7XG4gICAgeiA9IDA7XG5cbiAgICBmb3IgKGogPSAwOyBqIDwgcHJlZmFiR2VvbWV0cnkudmVydGljZXMubGVuZ3RoOyBqKyspIHtcbiAgICAgIGFFbmRQb3NpdGlvbi5hcnJheVtvZmZzZXQrK10gPSB4O1xuICAgICAgYUVuZFBvc2l0aW9uLmFycmF5W29mZnNldCsrXSA9IHk7XG4gICAgICBhRW5kUG9zaXRpb24uYXJyYXlbb2Zmc2V0KytdID0gejtcbiAgICB9XG4gIH1cblxuICAvLyBidWZmZXIgYXhpcyBhbmdsZVxuICB2YXIgYXhpcyA9IG5ldyBUSFJFRS5WZWN0b3IzKCk7XG4gIHZhciBhbmdsZSA9IDA7XG5cbiAgZm9yIChpID0gMCwgb2Zmc2V0ID0gMDsgaSA8IG1QYXJ0aWNsZUNvdW50OyBpKyspIHtcbiAgICBheGlzLnggPSBUSFJFRS5NYXRoLnJhbmRGbG9hdFNwcmVhZCgyKTtcbiAgICBheGlzLnkgPSBUSFJFRS5NYXRoLnJhbmRGbG9hdFNwcmVhZCgyKTtcbiAgICBheGlzLnogPSBUSFJFRS5NYXRoLnJhbmRGbG9hdFNwcmVhZCgyKTtcbiAgICBheGlzLm5vcm1hbGl6ZSgpO1xuXG4gICAgYW5nbGUgPSBNYXRoLlBJICogVEhSRUUuTWF0aC5yYW5kSW50KDE2LCAzMik7XG5cbiAgICBmb3IgKGogPSAwOyBqIDwgcHJlZmFiR2VvbWV0cnkudmVydGljZXMubGVuZ3RoOyBqKyspIHtcbiAgICAgIGFBeGlzQW5nbGUuYXJyYXlbb2Zmc2V0KytdID0gYXhpcy54O1xuICAgICAgYUF4aXNBbmdsZS5hcnJheVtvZmZzZXQrK10gPSBheGlzLnk7XG4gICAgICBhQXhpc0FuZ2xlLmFycmF5W29mZnNldCsrXSA9IGF4aXMuejtcbiAgICAgIGFBeGlzQW5nbGUuYXJyYXlbb2Zmc2V0KytdID0gYW5nbGU7XG4gICAgfVxuICB9XG5cbiAgLy8gYnVmZmVyIGNvbG9yXG4gIHZhciBjb2xvciA9IG5ldyBUSFJFRS5Db2xvcigpO1xuICB2YXIgaCwgcywgbDtcblxuICBmb3IgKGkgPSAwLCBvZmZzZXQgPSAwOyBpIDwgbVBhcnRpY2xlQ291bnQ7IGkrKykge1xuICAgIGggPSAwO1xuICAgIHMgPSAwO1xuICAgIGwgPSAwO1xuXG4gICAgY29sb3Iuc2V0SFNMKGgsIHMsIGwpO1xuXG4gICAgZm9yIChqID0gMDsgaiA8IHByZWZhYkdlb21ldHJ5LnZlcnRpY2VzLmxlbmd0aDsgaisrKSB7XG4gICAgICBhQ29sb3IuYXJyYXlbb2Zmc2V0KytdID0gY29sb3IucjtcbiAgICAgIGFDb2xvci5hcnJheVtvZmZzZXQrK10gPSBjb2xvci5nO1xuICAgICAgYUNvbG9yLmFycmF5W29mZnNldCsrXSA9IGNvbG9yLmI7XG4gICAgfVxuICB9XG5cbiAgdmFyIG1hdGVyaWFsID0gbmV3IFRIUkVFLkJBUy5QaG9uZ0FuaW1hdGlvbk1hdGVyaWFsKFxuICAgIC8vIGN1c3RvbSBwYXJhbWV0ZXJzICYgVEhSRUUuTWVzaFBob25nTWF0ZXJpYWwgcGFyYW1ldGVyc1xuICAgIHtcbiAgICAgIHZlcnRleENvbG9yczogVEhSRUUuVmVydGV4Q29sb3JzLFxuICAgICAgc2hhZGluZzogVEhSRUUuRmxhdFNoYWRpbmcsXG4gICAgICBzaWRlOiBUSFJFRS5Eb3VibGVTaWRlLFxuICAgICAgdW5pZm9ybXM6IHtcbiAgICAgICAgdVRpbWU6IHt0eXBlOiAnZicsIHZhbHVlOiAwfSxcbiAgICAgICAgdUR1cmF0aW9uOiB7dHlwZTogJ2YnLCB2YWx1ZTogbUR1cmF0aW9ufVxuICAgICAgfSxcbiAgICAgIHNoYWRlckZ1bmN0aW9uczogW1xuICAgICAgICBUSFJFRS5CQVMuU2hhZGVyQ2h1bmtbJ3F1YXRlcm5pb25fcm90YXRpb24nXSxcbiAgICAgICAgVEhSRUUuQkFTLlNoYWRlckNodW5rWydjdWJpY19iZXppZXInXVxuICAgICAgXSxcbiAgICAgIHNoYWRlclBhcmFtZXRlcnM6IFtcbiAgICAgICAgJ3VuaWZvcm0gZmxvYXQgdVRpbWU7JyxcbiAgICAgICAgJ3VuaWZvcm0gZmxvYXQgdUR1cmF0aW9uOycsXG4gICAgICAgICdhdHRyaWJ1dGUgZmxvYXQgYU9mZnNldDsnLFxuICAgICAgICAnYXR0cmlidXRlIHZlYzMgYVN0YXJ0UG9zaXRpb247JyxcbiAgICAgICAgJ2F0dHJpYnV0ZSB2ZWMzIGFDb250cm9sUG9pbnQxOycsXG4gICAgICAgICdhdHRyaWJ1dGUgdmVjMyBhQ29udHJvbFBvaW50MjsnLFxuICAgICAgICAnYXR0cmlidXRlIHZlYzMgYUVuZFBvc2l0aW9uOycsXG4gICAgICAgICdhdHRyaWJ1dGUgdmVjNCBhQXhpc0FuZ2xlOydcbiAgICAgIF0sXG4gICAgICBzaGFkZXJWZXJ0ZXhJbml0OiBbXG4gICAgICAgICdmbG9hdCB0UHJvZ3Jlc3MgPSBtb2QoKHVUaW1lICsgYU9mZnNldCksIHVEdXJhdGlvbikgLyB1RHVyYXRpb247JyxcblxuICAgICAgICAnZmxvYXQgYW5nbGUgPSBhQXhpc0FuZ2xlLncgKiB0UHJvZ3Jlc3M7JyxcbiAgICAgICAgJ3ZlYzQgdFF1YXQgPSBxdWF0RnJvbUF4aXNBbmdsZShhQXhpc0FuZ2xlLnh5eiwgYW5nbGUpOydcbiAgICAgIF0sXG4gICAgICBzaGFkZXJUcmFuc2Zvcm1Ob3JtYWw6IFtcbiAgICAgICAgJ29iamVjdE5vcm1hbCA9IHJvdGF0ZVZlY3Rvcih0UXVhdCwgb2JqZWN0Tm9ybWFsKTsnXG4gICAgICBdLFxuICAgICAgc2hhZGVyVHJhbnNmb3JtUG9zaXRpb246IFtcbiAgICAgICAgJ3RyYW5zZm9ybWVkID0gcm90YXRlVmVjdG9yKHRRdWF0LCB0cmFuc2Zvcm1lZCk7JyxcbiAgICAgICAgJ3RyYW5zZm9ybWVkICs9IGN1YmljQmV6aWVyKGFTdGFydFBvc2l0aW9uLCBhQ29udHJvbFBvaW50MSwgYUNvbnRyb2xQb2ludDIsIGFFbmRQb3NpdGlvbiwgdFByb2dyZXNzKTsnXG4gICAgICBdXG4gICAgfSxcbiAgICAvLyBUSFJFRS5NZXNoUGhvbmdNYXRlcmlhbCB1bmlmb3Jtc1xuICAgIHtcbiAgICAgIHNwZWN1bGFyOiAweGZmMDAwMCxcbiAgICAgIHNoaW5pbmVzczogMjBcbiAgICB9XG4gICk7XG4gIG1QYXJ0aWNsZVN5c3RlbSA9IG5ldyBUSFJFRS5NZXNoKGJ1ZmZlckdlb21ldHJ5LCBtYXRlcmlhbCk7XG4gIC8vIGJlY2F1c2UgdGhlIGJvdW5kaW5nIGJveCBvZiB0aGUgcGFydGljbGUgc3lzdGVtIGRvZXMgbm90IHJlZmxlY3QgaXRzIG9uLXNjcmVlbiBzaXplXG4gIC8vIHNldCB0aGlzIHRvIGZhbHNlIHRvIHByZXZlbnQgdGhlIHdob2xlIHRoaW5nIGZyb20gZGlzYXBwZWFyaW5nIG9uIGNlcnRhaW4gYW5nbGVzXG4gIG1QYXJ0aWNsZVN5c3RlbS5mcnVzdHVtQ3VsbGVkID0gZmFsc2U7XG4gIG1TY2VuZS5hZGQobVBhcnRpY2xlU3lzdGVtKTtcbn1cbmZ1bmN0aW9uIHRpY2soKSB7XG4gIHVwZGF0ZSgpO1xuICByZW5kZXIoKTtcblxuICBtVGltZSArPSBtVGltZVN0ZXA7XG4gIG1UaW1lICU9IG1EdXJhdGlvbjtcblxuICByZXF1ZXN0QW5pbWF0aW9uRnJhbWUodGljayk7XG59XG5mdW5jdGlvbiB1cGRhdGUoKSB7XG4gIG1Db250cm9scy51cGRhdGUoKTtcbiAgbVBhcnRpY2xlU3lzdGVtLm1hdGVyaWFsLnVuaWZvcm1zWyd1VGltZSddLnZhbHVlID0gbVRpbWU7XG59XG5mdW5jdGlvbiByZW5kZXIoKSB7XG4gIG1SZW5kZXJlci5yZW5kZXIobVNjZW5lLCBtQ2FtZXJhKTtcbn1cbmZ1bmN0aW9uIHJlc2l6ZSgpIHtcbiAgbGV0IHdpZHRoID0gJCgnLndyYXBwZXInKS53aWR0aCgpLFxuICAgICAgaGVpZ2h0ID0gJCgnLndyYXBwZXInKS5oZWlnaHQoKTtcblxuICBtQ2FtZXJhLmFzcGVjdCA9IHdpZHRoIC8gaGVpZ2h0O1xuICBtQ2FtZXJhLnVwZGF0ZVByb2plY3Rpb25NYXRyaXgoKTtcblxuICBtUmVuZGVyZXIuc2V0U2l6ZSh3aWR0aCwgaGVpZ2h0KTtcbn1cblxuLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIGJ1ZmZlciBhbmltYXRpb24gc3lzdGVtXG4vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vL1xuXG5USFJFRS5CQVMgPSB7fTtcblRIUkVFLkJBUy5TaGFkZXJDaHVuayA9IHt9O1xuVEhSRUUuQkFTLlNoYWRlckNodW5rW1wiYW5pbWF0aW9uX3RpbWVcIl0gPSBcImZsb2F0IHREZWxheSA9IGFBbmltYXRpb24ueDtcXG5mbG9hdCB0RHVyYXRpb24gPSBhQW5pbWF0aW9uLnk7XFxuZmxvYXQgdFRpbWUgPSBjbGFtcCh1VGltZSAtIHREZWxheSwgMC4wLCB0RHVyYXRpb24pO1xcbmZsb2F0IHRQcm9ncmVzcyA9IGVhc2UodFRpbWUsIDAuMCwgMS4wLCB0RHVyYXRpb24pO1xcblwiO1xuVEhSRUUuQkFTLlNoYWRlckNodW5rW1wiY3ViaWNfYmV6aWVyXCJdID0gXCJ2ZWMzIGN1YmljQmV6aWVyKHZlYzMgcDAsIHZlYzMgYzAsIHZlYzMgYzEsIHZlYzMgcDEsIGZsb2F0IHQpXFxue1xcbiAgICB2ZWMzIHRwO1xcbiAgICBmbG9hdCB0biA9IDEuMCAtIHQ7XFxuXFxuICAgIHRwLnh5eiA9IHRuICogdG4gKiB0biAqIHAwLnh5eiArIDMuMCAqIHRuICogdG4gKiB0ICogYzAueHl6ICsgMy4wICogdG4gKiB0ICogdCAqIGMxLnh5eiArIHQgKiB0ICogdCAqIHAxLnh5ejtcXG5cXG4gICAgcmV0dXJuIHRwO1xcbn1cXG5cIjtcblRIUkVFLkJBUy5TaGFkZXJDaHVua1tcImVhc2VfaW5fY3ViaWNcIl0gPSBcImZsb2F0IGVhc2UoZmxvYXQgdCwgZmxvYXQgYiwgZmxvYXQgYywgZmxvYXQgZCkge1xcbiAgcmV0dXJuIGMqKHQvPWQpKnQqdCArIGI7XFxufVxcblwiO1xuVEhSRUUuQkFTLlNoYWRlckNodW5rW1wiZWFzZV9pbl9xdWFkXCJdID0gXCJmbG9hdCBlYXNlKGZsb2F0IHQsIGZsb2F0IGIsIGZsb2F0IGMsIGZsb2F0IGQpIHtcXG4gIHJldHVybiBjKih0Lz1kKSp0ICsgYjtcXG59XFxuXCI7XG5USFJFRS5CQVMuU2hhZGVyQ2h1bmtbXCJlYXNlX291dF9jdWJpY1wiXSA9IFwiZmxvYXQgZWFzZShmbG9hdCB0LCBmbG9hdCBiLCBmbG9hdCBjLCBmbG9hdCBkKSB7XFxuICByZXR1cm4gYyooKHQ9dC9kIC0gMS4wKSp0KnQgKyAxLjApICsgYjtcXG59XFxuXCI7XG5USFJFRS5CQVMuU2hhZGVyQ2h1bmtbXCJxdWF0ZXJuaW9uX3JvdGF0aW9uXCJdID0gXCJ2ZWMzIHJvdGF0ZVZlY3Rvcih2ZWM0IHEsIHZlYzMgdilcXG57XFxuICAgIHJldHVybiB2ICsgMi4wICogY3Jvc3MocS54eXosIGNyb3NzKHEueHl6LCB2KSArIHEudyAqIHYpO1xcbn1cXG5cXG52ZWM0IHF1YXRGcm9tQXhpc0FuZ2xlKHZlYzMgYXhpcywgZmxvYXQgYW5nbGUpXFxue1xcbiAgICBmbG9hdCBoYWxmQW5nbGUgPSBhbmdsZSAqIDAuNTtcXG4gICAgcmV0dXJuIHZlYzQoYXhpcy54eXogKiBzaW4oaGFsZkFuZ2xlKSwgY29zKGhhbGZBbmdsZSkpO1xcbn1cXG5cIjtcblxuVEhSRUUuQkFTLlByZWZhYkJ1ZmZlckdlb21ldHJ5ID0gZnVuY3Rpb24gKHByZWZhYiwgY291bnQpIHtcbiAgVEhSRUUuQnVmZmVyR2VvbWV0cnkuY2FsbCh0aGlzKTtcblxuICB0aGlzLnByZWZhYkdlb21ldHJ5ID0gcHJlZmFiO1xuICB0aGlzLnByZWZhYkNvdW50ID0gY291bnQ7XG4gIHRoaXMucHJlZmFiVmVydGV4Q291bnQgPSBwcmVmYWIudmVydGljZXMubGVuZ3RoO1xuXG4gIHRoaXMuYnVmZmVyRGVmYXVsdHMoKTtcbn07XG5USFJFRS5CQVMuUHJlZmFiQnVmZmVyR2VvbWV0cnkucHJvdG90eXBlID0gT2JqZWN0LmNyZWF0ZShUSFJFRS5CdWZmZXJHZW9tZXRyeS5wcm90b3R5cGUpO1xuVEhSRUUuQkFTLlByZWZhYkJ1ZmZlckdlb21ldHJ5LnByb3RvdHlwZS5jb25zdHJ1Y3RvciA9IFRIUkVFLkJBUy5QcmVmYWJCdWZmZXJHZW9tZXRyeTtcblRIUkVFLkJBUy5QcmVmYWJCdWZmZXJHZW9tZXRyeS5wcm90b3R5cGUuYnVmZmVyRGVmYXVsdHMgPSBmdW5jdGlvbiAoKSB7XG4gIHZhciBwcmVmYWJGYWNlQ291bnQgPSB0aGlzLnByZWZhYkdlb21ldHJ5LmZhY2VzLmxlbmd0aDtcbiAgdmFyIHByZWZhYkluZGV4Q291bnQgPSB0aGlzLnByZWZhYkdlb21ldHJ5LmZhY2VzLmxlbmd0aCAqIDM7XG4gIHZhciBwcmVmYWJWZXJ0ZXhDb3VudCA9IHRoaXMucHJlZmFiVmVydGV4Q291bnQgPSB0aGlzLnByZWZhYkdlb21ldHJ5LnZlcnRpY2VzLmxlbmd0aDtcbiAgdmFyIHByZWZhYkluZGljZXMgPSBbXTtcblxuICBmb3IgKHZhciBoID0gMDsgaCA8IHByZWZhYkZhY2VDb3VudDsgaCsrKSB7XG4gICAgdmFyIGZhY2UgPSB0aGlzLnByZWZhYkdlb21ldHJ5LmZhY2VzW2hdO1xuICAgIHByZWZhYkluZGljZXMucHVzaChmYWNlLmEsIGZhY2UuYiwgZmFjZS5jKTtcbiAgfVxuXG4gIHZhciBpbmRleEJ1ZmZlciA9IG5ldyBVaW50MzJBcnJheSh0aGlzLnByZWZhYkNvdW50ICogcHJlZmFiSW5kZXhDb3VudCk7XG4gIHZhciBwb3NpdGlvbkJ1ZmZlciA9IG5ldyBGbG9hdDMyQXJyYXkodGhpcy5wcmVmYWJDb3VudCAqIHByZWZhYlZlcnRleENvdW50ICogMyk7XG5cbiAgdGhpcy5zZXRJbmRleChuZXcgVEhSRUUuQnVmZmVyQXR0cmlidXRlKGluZGV4QnVmZmVyLCAxKSk7XG4gIHRoaXMuYWRkQXR0cmlidXRlKCdwb3NpdGlvbicsIG5ldyBUSFJFRS5CdWZmZXJBdHRyaWJ1dGUocG9zaXRpb25CdWZmZXIsIDMpKTtcblxuICBmb3IgKHZhciBpID0gMCwgb2Zmc2V0ID0gMDsgaSA8IHRoaXMucHJlZmFiQ291bnQ7IGkrKykge1xuICAgIGZvciAodmFyIGogPSAwOyBqIDwgcHJlZmFiVmVydGV4Q291bnQ7IGorKywgb2Zmc2V0ICs9IDMpIHtcbiAgICAgIHZhciBwcmVmYWJWZXJ0ZXggPSB0aGlzLnByZWZhYkdlb21ldHJ5LnZlcnRpY2VzW2pdO1xuXG4gICAgICBwb3NpdGlvbkJ1ZmZlcltvZmZzZXQgICAgXSA9IHByZWZhYlZlcnRleC54O1xuICAgICAgcG9zaXRpb25CdWZmZXJbb2Zmc2V0ICsgMV0gPSBwcmVmYWJWZXJ0ZXgueTtcbiAgICAgIHBvc2l0aW9uQnVmZmVyW29mZnNldCArIDJdID0gcHJlZmFiVmVydGV4Lno7XG4gICAgfVxuXG4gICAgZm9yICh2YXIgayA9IDA7IGsgPCBwcmVmYWJJbmRleENvdW50OyBrKyspIHtcbiAgICAgIGluZGV4QnVmZmVyW2kgKiBwcmVmYWJJbmRleENvdW50ICsga10gPSBwcmVmYWJJbmRpY2VzW2tdICsgaSAqIHByZWZhYlZlcnRleENvdW50O1xuICAgIH1cbiAgfVxufTtcblxuLyoqXG4gKiBiYXNlZCBvbiBCdWZmZXJHZW9tZXRyeS5jb21wdXRlVmVydGV4Tm9ybWFsc1xuICogY2FsY3VsYXRlIHZlcnRleCBub3JtYWxzIGZvciBhIHByZWZhYiwgYW5kIHJlcGVhdCB0aGUgZGF0YSBpbiB0aGUgbm9ybWFsIGJ1ZmZlclxuICovXG5USFJFRS5CQVMuUHJlZmFiQnVmZmVyR2VvbWV0cnkucHJvdG90eXBlLmNvbXB1dGVWZXJ0ZXhOb3JtYWxzID0gZnVuY3Rpb24gKCkge1xuICB2YXIgaW5kZXggPSB0aGlzLmluZGV4O1xuICB2YXIgYXR0cmlidXRlcyA9IHRoaXMuYXR0cmlidXRlcztcbiAgdmFyIHBvc2l0aW9ucyA9IGF0dHJpYnV0ZXMucG9zaXRpb24uYXJyYXk7XG5cbiAgaWYgKGF0dHJpYnV0ZXMubm9ybWFsID09PSB1bmRlZmluZWQpIHtcbiAgICB0aGlzLmFkZEF0dHJpYnV0ZSgnbm9ybWFsJywgbmV3IFRIUkVFLkJ1ZmZlckF0dHJpYnV0ZShuZXcgRmxvYXQzMkFycmF5KHBvc2l0aW9ucy5sZW5ndGgpLCAzKSk7XG4gIH1cblxuICB2YXIgbm9ybWFscyA9IGF0dHJpYnV0ZXMubm9ybWFsLmFycmF5O1xuXG4gIHZhciB2QSwgdkIsIHZDLFxuXG4gICAgcEEgPSBuZXcgVEhSRUUuVmVjdG9yMygpLFxuICAgIHBCID0gbmV3IFRIUkVFLlZlY3RvcjMoKSxcbiAgICBwQyA9IG5ldyBUSFJFRS5WZWN0b3IzKCksXG5cbiAgICBjYiA9IG5ldyBUSFJFRS5WZWN0b3IzKCksXG4gICAgYWIgPSBuZXcgVEhSRUUuVmVjdG9yMygpO1xuXG4gIHZhciBpbmRpY2VzID0gaW5kZXguYXJyYXk7XG4gIHZhciBwcmVmYWJJbmRleENvdW50ID0gdGhpcy5wcmVmYWJHZW9tZXRyeS5mYWNlcy5sZW5ndGggKiAzO1xuXG4gIGZvciAodmFyIGkgPSAwOyBpIDwgcHJlZmFiSW5kZXhDb3VudDsgaSArPSAzKSB7XG4gICAgdkEgPSBpbmRpY2VzW2kgKyAwXSAqIDM7XG4gICAgdkIgPSBpbmRpY2VzW2kgKyAxXSAqIDM7XG4gICAgdkMgPSBpbmRpY2VzW2kgKyAyXSAqIDM7XG5cbiAgICBwQS5mcm9tQXJyYXkocG9zaXRpb25zLCB2QSk7XG4gICAgcEIuZnJvbUFycmF5KHBvc2l0aW9ucywgdkIpO1xuICAgIHBDLmZyb21BcnJheShwb3NpdGlvbnMsIHZDKTtcblxuICAgIGNiLnN1YlZlY3RvcnMocEMsIHBCKTtcbiAgICBhYi5zdWJWZWN0b3JzKHBBLCBwQik7XG4gICAgY2IuY3Jvc3MoYWIpO1xuXG4gICAgbm9ybWFsc1t2QV0gKz0gY2IueDtcbiAgICBub3JtYWxzW3ZBICsgMV0gKz0gY2IueTtcbiAgICBub3JtYWxzW3ZBICsgMl0gKz0gY2IuejtcblxuICAgIG5vcm1hbHNbdkJdICs9IGNiLng7XG4gICAgbm9ybWFsc1t2QiArIDFdICs9IGNiLnk7XG4gICAgbm9ybWFsc1t2QiArIDJdICs9IGNiLno7XG5cbiAgICBub3JtYWxzW3ZDXSArPSBjYi54O1xuICAgIG5vcm1hbHNbdkMgKyAxXSArPSBjYi55O1xuICAgIG5vcm1hbHNbdkMgKyAyXSArPSBjYi56O1xuICB9XG5cbiAgZm9yICh2YXIgaiA9IDE7IGogPCB0aGlzLnByZWZhYkNvdW50OyBqKyspIHtcbiAgICBmb3IgKHZhciBrID0gMDsgayA8IHByZWZhYkluZGV4Q291bnQ7IGsrKykge1xuICAgICAgbm9ybWFsc1tqICogcHJlZmFiSW5kZXhDb3VudCArIGtdID0gbm9ybWFsc1trXTtcbiAgICB9XG4gIH1cblxuICB0aGlzLm5vcm1hbGl6ZU5vcm1hbHMoKTtcblxuICBhdHRyaWJ1dGVzLm5vcm1hbC5uZWVkc1VwZGF0ZSA9IHRydWU7XG59O1xuVEhSRUUuQkFTLlByZWZhYkJ1ZmZlckdlb21ldHJ5LnByb3RvdHlwZS5jcmVhdGVBdHRyaWJ1dGUgPSBmdW5jdGlvbiAobmFtZSwgaXRlbVNpemUpIHtcbiAgdmFyIGJ1ZmZlciA9IG5ldyBGbG9hdDMyQXJyYXkodGhpcy5wcmVmYWJDb3VudCAqIHRoaXMucHJlZmFiVmVydGV4Q291bnQgKiBpdGVtU2l6ZSk7XG4gIHZhciBhdHRyaWJ1dGUgPSBuZXcgVEhSRUUuQnVmZmVyQXR0cmlidXRlKGJ1ZmZlciwgaXRlbVNpemUpO1xuXG4gIHRoaXMuYWRkQXR0cmlidXRlKG5hbWUsIGF0dHJpYnV0ZSk7XG5cbiAgcmV0dXJuIGF0dHJpYnV0ZTtcbn07XG5USFJFRS5CQVMuUHJlZmFiQnVmZmVyR2VvbWV0cnkucHJvdG90eXBlLnNldEF0dHJpYnV0ZTQgPSBmdW5jdGlvbiAobmFtZSwgZGF0YSkge1xuICB2YXIgb2Zmc2V0ID0gMDtcbiAgdmFyIGFycmF5ID0gdGhpcy5nZW9tZXRyeS5hdHRyaWJ1dGVzW25hbWVdLmFycmF5O1xuICB2YXIgaSwgajtcblxuICBmb3IgKGkgPSAwOyBpIDwgZGF0YS5sZW5ndGg7IGkrKykge1xuICAgIHZhciB2ID0gZGF0YVtpXTtcblxuICAgIGZvciAoaiA9IDA7IGogPCB0aGlzLnByZWZhYlZlcnRleENvdW50OyBqKyspIHtcbiAgICAgIGFycmF5W29mZnNldCsrXSA9IHYueDtcbiAgICAgIGFycmF5W29mZnNldCsrXSA9IHYueTtcbiAgICAgIGFycmF5W29mZnNldCsrXSA9IHYuejtcbiAgICAgIGFycmF5W29mZnNldCsrXSA9IHYudztcbiAgICB9XG4gIH1cblxuICB0aGlzLmdlb21ldHJ5LmF0dHJpYnV0ZXNbbmFtZV0ubmVlZHNVcGRhdGUgPSB0cnVlO1xufTtcblRIUkVFLkJBUy5QcmVmYWJCdWZmZXJHZW9tZXRyeS5wcm90b3R5cGUuc2V0QXR0cmlidXRlMyA9IGZ1bmN0aW9uIChuYW1lLCBkYXRhKSB7XG4gIHZhciBvZmZzZXQgPSAwO1xuICB2YXIgYXJyYXkgPSB0aGlzLmdlb21ldHJ5LmF0dHJpYnV0ZXNbbmFtZV0uYXJyYXk7XG4gIHZhciBpLCBqO1xuXG4gIGZvciAoaSA9IDA7IGkgPCBkYXRhLmxlbmd0aDsgaSsrKSB7XG4gICAgdmFyIHYgPSBkYXRhW2ldO1xuXG4gICAgZm9yIChqID0gMDsgaiA8IHRoaXMucHJlZmFiVmVydGV4Q291bnQ7IGorKykge1xuICAgICAgYXJyYXlbb2Zmc2V0KytdID0gdi54O1xuICAgICAgYXJyYXlbb2Zmc2V0KytdID0gdi55O1xuICAgICAgYXJyYXlbb2Zmc2V0KytdID0gdi56O1xuICAgIH1cbiAgfVxuXG4gIHRoaXMuZ2VvbWV0cnkuYXR0cmlidXRlc1tuYW1lXS5uZWVkc1VwZGF0ZSA9IHRydWU7XG59O1xuVEhSRUUuQkFTLlByZWZhYkJ1ZmZlckdlb21ldHJ5LnByb3RvdHlwZS5zZXRBdHRyaWJ1dGUyID0gZnVuY3Rpb24gKG5hbWUsIGRhdGEpIHtcbiAgdmFyIG9mZnNldCA9IDA7XG4gIHZhciBhcnJheSA9IHRoaXMuZ2VvbWV0cnkuYXR0cmlidXRlc1tuYW1lXS5hcnJheTtcbiAgdmFyIGksIGo7XG5cbiAgZm9yIChpID0gMDsgaSA8IHRoaXMucHJlZmFiQ291bnQ7IGkrKykge1xuICAgIHZhciB2ID0gZGF0YVtpXTtcblxuICAgIGZvciAoaiA9IDA7IGogPCB0aGlzLnByZWZhYlZlcnRleENvdW50OyBqKyspIHtcbiAgICAgIGFycmF5W29mZnNldCsrXSA9IHYueDtcbiAgICAgIGFycmF5W29mZnNldCsrXSA9IHYueTtcbiAgICB9XG4gIH1cblxuICB0aGlzLmdlb21ldHJ5LmF0dHJpYnV0ZXNbbmFtZV0ubmVlZHNVcGRhdGUgPSB0cnVlO1xufTtcblxuVEhSRUUuQkFTLkJhc2VBbmltYXRpb25NYXRlcmlhbCA9IGZ1bmN0aW9uKHBhcmFtZXRlcnMpIHtcbiAgVEhSRUUuU2hhZGVyTWF0ZXJpYWwuY2FsbCh0aGlzKTtcblxuICB0aGlzLnNoYWRlckZ1bmN0aW9ucyA9IFtdO1xuICB0aGlzLnNoYWRlclBhcmFtZXRlcnMgPSBbXTtcbiAgdGhpcy5zaGFkZXJWZXJ0ZXhJbml0ID0gW107XG4gIHRoaXMuc2hhZGVyVHJhbnNmb3JtTm9ybWFsID0gW107XG4gIHRoaXMuc2hhZGVyVHJhbnNmb3JtUG9zaXRpb24gPSBbXTtcblxuICB0aGlzLnNldFZhbHVlcyhwYXJhbWV0ZXJzKTtcbn07XG5USFJFRS5CQVMuQmFzZUFuaW1hdGlvbk1hdGVyaWFsLnByb3RvdHlwZSA9IE9iamVjdC5jcmVhdGUoVEhSRUUuU2hhZGVyTWF0ZXJpYWwucHJvdG90eXBlKTtcblRIUkVFLkJBUy5CYXNlQW5pbWF0aW9uTWF0ZXJpYWwucHJvdG90eXBlLmNvbnN0cnVjdG9yID0gVEhSRUUuQkFTLkJhc2VBbmltYXRpb25NYXRlcmlhbDtcblxuLy8gYWJzdHJhY3RcblRIUkVFLkJBUy5CYXNlQW5pbWF0aW9uTWF0ZXJpYWwucHJvdG90eXBlLl9jb25jYXRWZXJ0ZXhTaGFkZXIgPSBmdW5jdGlvbigpIHtcbiAgcmV0dXJuICcnO1xufTtcblRIUkVFLkJBUy5CYXNlQW5pbWF0aW9uTWF0ZXJpYWwucHJvdG90eXBlLl9jb25jYXRGdW5jdGlvbnMgPSBmdW5jdGlvbigpIHtcbiAgcmV0dXJuIHRoaXMuc2hhZGVyRnVuY3Rpb25zLmpvaW4oJ1xcbicpO1xufTtcblRIUkVFLkJBUy5CYXNlQW5pbWF0aW9uTWF0ZXJpYWwucHJvdG90eXBlLl9jb25jYXRQYXJhbWV0ZXJzID0gZnVuY3Rpb24oKSB7XG4gIHJldHVybiB0aGlzLnNoYWRlclBhcmFtZXRlcnMuam9pbignXFxuJyk7XG59O1xuVEhSRUUuQkFTLkJhc2VBbmltYXRpb25NYXRlcmlhbC5wcm90b3R5cGUuX2NvbmNhdFZlcnRleEluaXQgPSBmdW5jdGlvbigpIHtcbiAgcmV0dXJuIHRoaXMuc2hhZGVyVmVydGV4SW5pdC5qb2luKCdcXG4nKTtcbn07XG5USFJFRS5CQVMuQmFzZUFuaW1hdGlvbk1hdGVyaWFsLnByb3RvdHlwZS5fY29uY2F0VHJhbnNmb3JtTm9ybWFsID0gZnVuY3Rpb24oKSB7XG4gIHJldHVybiB0aGlzLnNoYWRlclRyYW5zZm9ybU5vcm1hbC5qb2luKCdcXG4nKTtcbn07XG5USFJFRS5CQVMuQmFzZUFuaW1hdGlvbk1hdGVyaWFsLnByb3RvdHlwZS5fY29uY2F0VHJhbnNmb3JtUG9zaXRpb24gPSBmdW5jdGlvbigpIHtcbiAgcmV0dXJuIHRoaXMuc2hhZGVyVHJhbnNmb3JtUG9zaXRpb24uam9pbignXFxuJyk7XG59O1xuVEhSRUUuQkFTLkJhc2VBbmltYXRpb25NYXRlcmlhbC5wcm90b3R5cGUuc2V0VW5pZm9ybVZhbHVlcyA9IGZ1bmN0aW9uKHZhbHVlcykge1xuICBmb3IgKHZhciBrZXkgaW4gdmFsdWVzKSB7XG4gICAgaWYgKGtleSBpbiB0aGlzLnVuaWZvcm1zKSB7XG4gICAgICB2YXIgdW5pZm9ybSA9IHRoaXMudW5pZm9ybXNba2V5XTtcbiAgICAgIHZhciB2YWx1ZSA9IHZhbHVlc1trZXldO1xuXG4gICAgICAvLyB0b2RvIGFkZCBtYXRyaXggdW5pZm9ybSB0eXBlc1xuICAgICAgc3dpdGNoICh1bmlmb3JtLnR5cGUpIHtcbiAgICAgICAgY2FzZSAnYyc6IC8vIGNvbG9yXG4gICAgICAgICAgdW5pZm9ybS52YWx1ZS5zZXQodmFsdWUpO1xuICAgICAgICAgIGJyZWFrO1xuICAgICAgICBjYXNlICd2Mic6IC8vIHZlY3RvcnNcbiAgICAgICAgY2FzZSAndjMnOlxuICAgICAgICBjYXNlICd2NCc6XG4gICAgICAgICAgdW5pZm9ybS52YWx1ZS5jb3B5KHZhbHVlKTtcbiAgICAgICAgICBicmVhaztcbiAgICAgICAgY2FzZSAnZic6IC8vIGZsb2F0XG4gICAgICAgIGNhc2UgJ3QnOiAvLyB0ZXh0dXJlXG4gICAgICAgICAgdW5pZm9ybS52YWx1ZSA9IHZhbHVlO1xuICAgICAgfVxuICAgIH1cbiAgfVxufTtcblxuVEhSRUUuQkFTLlBob25nQW5pbWF0aW9uTWF0ZXJpYWwgPSBmdW5jdGlvbihwYXJhbWV0ZXJzLCB1bmlmb3JtVmFsdWVzKSB7XG4gIFRIUkVFLkJBUy5CYXNlQW5pbWF0aW9uTWF0ZXJpYWwuY2FsbCh0aGlzLCBwYXJhbWV0ZXJzKTtcblxuICB2YXIgcGhvbmdTaGFkZXIgPSBUSFJFRS5TaGFkZXJMaWJbJ3Bob25nJ107XG5cbiAgdGhpcy51bmlmb3JtcyA9IFRIUkVFLlVuaWZvcm1zVXRpbHMubWVyZ2UoW3Bob25nU2hhZGVyLnVuaWZvcm1zLCB0aGlzLnVuaWZvcm1zXSk7XG4gIHRoaXMubGlnaHRzID0gdHJ1ZTtcbiAgdGhpcy52ZXJ0ZXhTaGFkZXIgPSB0aGlzLl9jb25jYXRWZXJ0ZXhTaGFkZXIoKTtcbiAgdGhpcy5mcmFnbWVudFNoYWRlciA9IHBob25nU2hhZGVyLmZyYWdtZW50U2hhZGVyO1xuXG4gIC8vIHRvZG8gYWRkIG1pc3NpbmcgZGVmYXVsdCBkZWZpbmVzXG4gIHVuaWZvcm1WYWx1ZXMubWFwICYmICh0aGlzLmRlZmluZXNbJ1VTRV9NQVAnXSA9ICcnKTtcbiAgdW5pZm9ybVZhbHVlcy5ub3JtYWxNYXAgJiYgKHRoaXMuZGVmaW5lc1snVVNFX05PUk1BTE1BUCddID0gJycpO1xuXG4gIHRoaXMuc2V0VW5pZm9ybVZhbHVlcyh1bmlmb3JtVmFsdWVzKTtcbn07XG5USFJFRS5CQVMuUGhvbmdBbmltYXRpb25NYXRlcmlhbC5wcm90b3R5cGUgPSBPYmplY3QuY3JlYXRlKFRIUkVFLkJBUy5CYXNlQW5pbWF0aW9uTWF0ZXJpYWwucHJvdG90eXBlKTtcblRIUkVFLkJBUy5QaG9uZ0FuaW1hdGlvbk1hdGVyaWFsLnByb3RvdHlwZS5jb25zdHJ1Y3RvciA9IFRIUkVFLkJBUy5QaG9uZ0FuaW1hdGlvbk1hdGVyaWFsO1xuVEhSRUUuQkFTLlBob25nQW5pbWF0aW9uTWF0ZXJpYWwucHJvdG90eXBlLl9jb25jYXRWZXJ0ZXhTaGFkZXIgPSBmdW5jdGlvbigpIHtcbiAgLy8gYmFzZWQgb24gVEhSRUUuU2hhZGVyTGliLnBob25nXG4gIHJldHVybiBbXG4gICAgXCIjZGVmaW5lIFBIT05HXCIsXG5cbiAgICBcInZhcnlpbmcgdmVjMyB2Vmlld1Bvc2l0aW9uO1wiLFxuXG4gICAgXCIjaWZuZGVmIEZMQVRfU0hBREVEXCIsXG5cbiAgICBcIlx0dmFyeWluZyB2ZWMzIHZOb3JtYWw7XCIsXG5cbiAgICBcIiNlbmRpZlwiLFxuXG4gICAgVEhSRUUuU2hhZGVyQ2h1bmtbIFwiY29tbW9uXCIgXSxcbiAgICBUSFJFRS5TaGFkZXJDaHVua1sgXCJ1dl9wYXJzX3ZlcnRleFwiIF0sXG4gICAgVEhSRUUuU2hhZGVyQ2h1bmtbIFwidXYyX3BhcnNfdmVydGV4XCIgXSxcbiAgICBUSFJFRS5TaGFkZXJDaHVua1sgXCJkaXNwbGFjZW1lbnRtYXBfcGFyc192ZXJ0ZXhcIiBdLFxuICAgIFRIUkVFLlNoYWRlckNodW5rWyBcImVudm1hcF9wYXJzX3ZlcnRleFwiIF0sXG4gICAgVEhSRUUuU2hhZGVyQ2h1bmtbIFwibGlnaHRzX3Bob25nX3BhcnNfdmVydGV4XCIgXSxcbiAgICBUSFJFRS5TaGFkZXJDaHVua1sgXCJjb2xvcl9wYXJzX3ZlcnRleFwiIF0sXG4gICAgVEhSRUUuU2hhZGVyQ2h1bmtbIFwibW9ycGh0YXJnZXRfcGFyc192ZXJ0ZXhcIiBdLFxuICAgIFRIUkVFLlNoYWRlckNodW5rWyBcInNraW5uaW5nX3BhcnNfdmVydGV4XCIgXSxcbiAgICBUSFJFRS5TaGFkZXJDaHVua1sgXCJzaGFkb3dtYXBfcGFyc192ZXJ0ZXhcIiBdLFxuICAgIFRIUkVFLlNoYWRlckNodW5rWyBcImxvZ2RlcHRoYnVmX3BhcnNfdmVydGV4XCIgXSxcblxuICAgIHRoaXMuX2NvbmNhdEZ1bmN0aW9ucygpLFxuXG4gICAgdGhpcy5fY29uY2F0UGFyYW1ldGVycygpLFxuXG4gICAgXCJ2b2lkIG1haW4oKSB7XCIsXG5cbiAgICB0aGlzLl9jb25jYXRWZXJ0ZXhJbml0KCksXG5cbiAgICBUSFJFRS5TaGFkZXJDaHVua1sgXCJ1dl92ZXJ0ZXhcIiBdLFxuICAgIFRIUkVFLlNoYWRlckNodW5rWyBcInV2Ml92ZXJ0ZXhcIiBdLFxuICAgIFRIUkVFLlNoYWRlckNodW5rWyBcImNvbG9yX3ZlcnRleFwiIF0sXG4gICAgVEhSRUUuU2hhZGVyQ2h1bmtbIFwiYmVnaW5ub3JtYWxfdmVydGV4XCIgXSxcblxuICAgIHRoaXMuX2NvbmNhdFRyYW5zZm9ybU5vcm1hbCgpLFxuXG4gICAgVEhSRUUuU2hhZGVyQ2h1bmtbIFwibW9ycGhub3JtYWxfdmVydGV4XCIgXSxcbiAgICBUSFJFRS5TaGFkZXJDaHVua1sgXCJza2luYmFzZV92ZXJ0ZXhcIiBdLFxuICAgIFRIUkVFLlNoYWRlckNodW5rWyBcInNraW5ub3JtYWxfdmVydGV4XCIgXSxcbiAgICBUSFJFRS5TaGFkZXJDaHVua1sgXCJkZWZhdWx0bm9ybWFsX3ZlcnRleFwiIF0sXG5cbiAgICBcIiNpZm5kZWYgRkxBVF9TSEFERURcIiwgLy8gTm9ybWFsIGNvbXB1dGVkIHdpdGggZGVyaXZhdGl2ZXMgd2hlbiBGTEFUX1NIQURFRFxuXG4gICAgXCJcdHZOb3JtYWwgPSBub3JtYWxpemUoIHRyYW5zZm9ybWVkTm9ybWFsICk7XCIsXG5cbiAgICBcIiNlbmRpZlwiLFxuXG4gICAgVEhSRUUuU2hhZGVyQ2h1bmtbIFwiYmVnaW5fdmVydGV4XCIgXSxcblxuICAgIHRoaXMuX2NvbmNhdFRyYW5zZm9ybVBvc2l0aW9uKCksXG5cbiAgICBUSFJFRS5TaGFkZXJDaHVua1sgXCJkaXNwbGFjZW1lbnRtYXBfdmVydGV4XCIgXSxcbiAgICBUSFJFRS5TaGFkZXJDaHVua1sgXCJtb3JwaHRhcmdldF92ZXJ0ZXhcIiBdLFxuICAgIFRIUkVFLlNoYWRlckNodW5rWyBcInNraW5uaW5nX3ZlcnRleFwiIF0sXG4gICAgVEhSRUUuU2hhZGVyQ2h1bmtbIFwicHJvamVjdF92ZXJ0ZXhcIiBdLFxuICAgIFRIUkVFLlNoYWRlckNodW5rWyBcImxvZ2RlcHRoYnVmX3ZlcnRleFwiIF0sXG5cbiAgICBcIlx0dlZpZXdQb3NpdGlvbiA9IC0gbXZQb3NpdGlvbi54eXo7XCIsXG5cbiAgICBUSFJFRS5TaGFkZXJDaHVua1sgXCJ3b3JsZHBvc192ZXJ0ZXhcIiBdLFxuICAgIFRIUkVFLlNoYWRlckNodW5rWyBcImVudm1hcF92ZXJ0ZXhcIiBdLFxuICAgIFRIUkVFLlNoYWRlckNodW5rWyBcImxpZ2h0c19waG9uZ192ZXJ0ZXhcIiBdLFxuICAgIFRIUkVFLlNoYWRlckNodW5rWyBcInNoYWRvd21hcF92ZXJ0ZXhcIiBdLFxuXG4gICAgXCJ9XCJcblxuICBdLmpvaW4oIFwiXFxuXCIgKTtcbn07Il0sImZpbGUiOiJhcHAuanMifQ==
