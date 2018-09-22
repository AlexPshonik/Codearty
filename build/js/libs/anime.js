/**
 * http://animejs.com
 * JavaScript animation engine
 * @version v2.2.0
 * @author Julian Garnier
 * @copyright ©2017 Julian Garnier
 * Released under the MIT license
**/

(function(root, factory) {
  if (typeof define === 'function' && define.amd) {
    // AMD. Register as an anonymous module.
    define([], factory);
  } else if (typeof module === 'object' && module.exports) {
    // Node. Does not work with strict CommonJS, but
    // only CommonJS-like environments that support module.exports,
    // like Node.
    module.exports = factory();
  } else {
    // Browser globals (root is window)
    root.anime = factory();
  }
}(this, () => {

  // Defaults

  const defaultInstanceSettings = {
    update: undefined,
    begin: undefined,
    run: undefined,
    complete: undefined,
    loop: 1,
    direction: 'normal',
    autoplay: true,
    offset: 0
  }

  const defaultTweenSettings = {
    duration: 1000,
    delay: 0,
    easing: 'easeOutElastic',
    elasticity: 500,
    round: 0
  }

  const validTransforms = ['translateX', 'translateY', 'translateZ', 'rotate', 'rotateX', 'rotateY', 'rotateZ', 'scale', 'scaleX', 'scaleY', 'scaleZ', 'skewX', 'skewY', 'perspective'];
  let transformString;

  // Utils

  function stringContains(str, text) {
    return str.indexOf(text) > -1;
  }

  const is = {
    arr: a => Array.isArray(a),
    obj: a => stringContains(Object.prototype.toString.call(a), 'Object'),
    pth: a => is.obj(a) && a.hasOwnProperty('totalLength'),
    svg: a => a instanceof SVGElement,
    dom: a => a.nodeType || is.svg(a),
    str: a => typeof a === 'string',
    fnc: a => typeof a === 'function',
    und: a => typeof a === 'undefined',
    hex: a => /(^#[0-9A-F]{6}$)|(^#[0-9A-F]{3}$)/i.test(a),
    rgb: a => /^rgb/.test(a),
    hsl: a => /^hsl/.test(a),
    col: a => (is.hex(a) || is.rgb(a) || is.hsl(a))
  }

  // BezierEasing https://github.com/gre/bezier-easing

  const bezier = (() => {

    const kSplineTableSize = 11;
    const kSampleStepSize = 1.0 / (kSplineTableSize - 1.0);

    function A (aA1, aA2) { return 1.0 - 3.0 * aA2 + 3.0 * aA1 };
    function B (aA1, aA2) { return 3.0 * aA2 - 6.0 * aA1 };
    function C (aA1)      { return 3.0 * aA1 };

    function calcBezier (aT, aA1, aA2) { return ((A(aA1, aA2) * aT + B(aA1, aA2)) * aT + C(aA1)) * aT };
    function getSlope (aT, aA1, aA2) { return 3.0 * A(aA1, aA2) * aT * aT + 2.0 * B(aA1, aA2) * aT + C(aA1) };

    function binarySubdivide (aX, aA, aB, mX1, mX2) {
      let currentX, currentT, i = 0;
      do {
        currentT = aA + (aB - aA) / 2.0;
        currentX = calcBezier(currentT, mX1, mX2) - aX;
        if (currentX > 0.0) { aB = currentT } else { aA = currentT };
      } while (Math.abs(currentX) > 0.0000001 && ++i < 10);
      return currentT;
    }

    function newtonRaphsonIterate (aX, aGuessT, mX1, mX2) {
      for (let i = 0; i < 4; ++i) {
        const currentSlope = getSlope(aGuessT, mX1, mX2);
        if (currentSlope === 0.0) return aGuessT;
        const currentX = calcBezier(aGuessT, mX1, mX2) - aX;
        aGuessT -= currentX / currentSlope;
      }
      return aGuessT;
    }

    function bezier(mX1, mY1, mX2, mY2) {

      if (!(0 <= mX1 && mX1 <= 1 && 0 <= mX2 && mX2 <= 1)) return;
      let sampleValues = new Float32Array(kSplineTableSize);

      if (mX1 !== mY1 || mX2 !== mY2) {
        for (let i = 0; i < kSplineTableSize; ++i) {
          sampleValues[i] = calcBezier(i * kSampleStepSize, mX1, mX2);
        }
      }

      function getTForX(aX) {

        let intervalStart = 0.0;
        let currentSample = 1;
        const lastSample = kSplineTableSize - 1;

        for (; currentSample !== lastSample && sampleValues[currentSample] <= aX; ++currentSample) {
          intervalStart += kSampleStepSize;
        }

        --currentSample;

        const dist = (aX - sampleValues[currentSample]) / (sampleValues[currentSample + 1] - sampleValues[currentSample]);
        const guessForT = intervalStart + dist * kSampleStepSize;
        const initialSlope = getSlope(guessForT, mX1, mX2);

        if (initialSlope >= 0.001) {
          return newtonRaphsonIterate(aX, guessForT, mX1, mX2);
        } else if (initialSlope === 0.0) {
          return guessForT;
        } else {
          return binarySubdivide(aX, intervalStart, intervalStart + kSampleStepSize, mX1, mX2);
        }

      }

      return x => {
        if (mX1 === mY1 && mX2 === mY2) return x;
        if (x === 0) return 0;
        if (x === 1) return 1;
        return calcBezier(getTForX(x), mY1, mY2);
      }

    }

    return bezier;

  })();

  const easings = (() => {

    const names = ['Quad', 'Cubic', 'Quart', 'Quint', 'Sine', 'Expo', 'Circ', 'Back', 'Elastic'];

    // Elastic easing adapted from jQueryUI http://api.jqueryui.com/easings/

    function elastic(t, p) {
      return t === 0 || t === 1 ? t :
      -Math.pow(2, 10 * (t - 1)) * Math.sin((((t - 1) - (p / (Math.PI * 2.0) * Math.asin(1))) * (Math.PI * 2)) / p );
    }

    // Approximated Penner equations http://matthewlein.com/ceaser/

    const equations = {
      In: [
        [0.550, 0.085, 0.680, 0.530], /* InQuad */
        [0.550, 0.055, 0.675, 0.190], /* InCubic */
        [0.895, 0.030, 0.685, 0.220], /* InQuart */
        [0.755, 0.050, 0.855, 0.060], /* InQuint */
        [0.470, 0.000, 0.745, 0.715], /* InSine */
        [0.950, 0.050, 0.795, 0.035], /* InExpo */
        [0.600, 0.040, 0.980, 0.335], /* InCirc */
        [0.600, -0.280, 0.735, 0.045], /* InBack */
        elastic /* InElastic */
      ], Out: [
        [0.250, 0.460, 0.450, 0.940], /* OutQuad */
        [0.215, 0.610, 0.355, 1.000], /* OutCubic */
        [0.165, 0.840, 0.440, 1.000], /* OutQuart */
        [0.230, 1.000, 0.320, 1.000], /* OutQuint */
        [0.390, 0.575, 0.565, 1.000], /* OutSine */
        [0.190, 1.000, 0.220, 1.000], /* OutExpo */
        [0.075, 0.820, 0.165, 1.000], /* OutCirc */
        [0.175, 0.885, 0.320, 1.275], /* OutBack */
        (t, f) => 1 - elastic(1 - t, f) /* OutElastic */
      ], InOut: [
        [0.455, 0.030, 0.515, 0.955], /* InOutQuad */
        [0.645, 0.045, 0.355, 1.000], /* InOutCubic */
        [0.770, 0.000, 0.175, 1.000], /* InOutQuart */
        [0.860, 0.000, 0.070, 1.000], /* InOutQuint */
        [0.445, 0.050, 0.550, 0.950], /* InOutSine */
        [1.000, 0.000, 0.000, 1.000], /* InOutExpo */
        [0.785, 0.135, 0.150, 0.860], /* InOutCirc */
        [0.680, -0.550, 0.265, 1.550], /* InOutBack */
        (t, f) => t < .5 ? elastic(t * 2, f) / 2 : 1 - elastic(t * -2 + 2, f) / 2 /* InOutElastic */
      ]
    }

    let functions = {
      linear: bezier(0.250, 0.250, 0.750, 0.750)
    }

    for (let type in equations) {
      equations[type].forEach((f, i) => {
        functions['ease'+type+names[i]] = is.fnc(f) ? f : bezier.apply(this, f);
      });
    }

    return functions;

  })();

  // Strings

  function stringToHyphens(str) {
    return str.replace(/([a-z])([A-Z])/g, '$1-$2').toLowerCase();
  }

  function selectString(str) {
    if (is.col(str)) return;
    try {
      let nodes = document.querySelectorAll(str);
      return nodes;
    } catch(e) {
      return;
    }
  }

  // Arrays

  function filterArray(arr, callback) {
    const len = arr.length;
    const thisArg = arguments.length >= 2 ? arguments[1] : void 0;
    let result = [];
    for (let i = 0; i < len; i++) {
      if (i in arr) {
        const val = arr[i];
        if (callback.call(thisArg, val, i, arr)) {
          result.push(val);
        }
      }
    }
    return result;
  }

  function flattenArray(arr) {
    return arr.reduce((a, b) => a.concat(is.arr(b) ? flattenArray(b) : b), []);
  }

  function toArray(o) {
    if (is.arr(o)) return o;
    if (is.str(o)) o = selectString(o) || o;
    if (o instanceof NodeList || o instanceof HTMLCollection) return [].slice.call(o);
    return [o];
  }

  function arrayContains(arr, val) {
    return arr.some(a => a === val);
  }

  // Objects

  function cloneObject(o) {
    let clone = {};
    for (let p in o) clone[p] = o[p];
    return clone;
  }

  function replaceObjectProps(o1, o2) {
    let o = cloneObject(o1);
    for (let p in o1) o[p] = o2.hasOwnProperty(p) ? o2[p] : o1[p];
    return o;
  }

  function mergeObjects(o1, o2) {
    let o = cloneObject(o1);
    for (let p in o2) o[p] = is.und(o1[p]) ? o2[p] : o1[p];
    return o;
  }

  // Colors

  function rgbToRgba(rgbValue) {
    const rgb = /rgb\((\d+,\s*[\d]+,\s*[\d]+)\)/g.exec(rgbValue);
    return rgb ? `rgba(${rgb[1]},1)` : rgbValue;
  }

  function hexToRgba(hexValue) {
    const rgx = /^#?([a-f\d])([a-f\d])([a-f\d])$/i;
    const hex = hexValue.replace(rgx, (m, r, g, b) => r + r + g + g + b + b );
    const rgb = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    const r = parseInt(rgb[1], 16);
    const g = parseInt(rgb[2], 16);
    const b = parseInt(rgb[3], 16);
    return `rgba(${r},${g},${b},1)`;
  }

  function hslToRgba(hslValue) {
    const hsl = /hsl\((\d+),\s*([\d.]+)%,\s*([\d.]+)%\)/g.exec(hslValue) || /hsla\((\d+),\s*([\d.]+)%,\s*([\d.]+)%,\s*([\d.]+)\)/g.exec(hslValue);
    const h = parseInt(hsl[1]) / 360;
    const s = parseInt(hsl[2]) / 100;
    const l = parseInt(hsl[3]) / 100;
    const a = hsl[4] || 1;
    function hue2rgb(p, q, t) {
      if (t < 0) t += 1;
      if (t > 1) t -= 1;
      if (t < 1/6) return p + (q - p) * 6 * t;
      if (t < 1/2) return q;
      if (t < 2/3) return p + (q - p) * (2/3 - t) * 6;
      return p;
    }
    let r, g, b;
    if (s == 0) {
      r = g = b = l;
    } else {
      const q = l < 0.5 ? l * (1 + s) : l + s - l * s;
      const p = 2 * l - q;
      r = hue2rgb(p, q, h + 1/3);
      g = hue2rgb(p, q, h);
      b = hue2rgb(p, q, h - 1/3);
    }
    return `rgba(${r * 255},${g * 255},${b * 255},${a})`;
  }

  function colorToRgb(val) {
    if (is.rgb(val)) return rgbToRgba(val);
    if (is.hex(val)) return hexToRgba(val);
    if (is.hsl(val)) return hslToRgba(val);
  }

  // Units

  function getUnit(val) {
    const split = /([\+\-]?[0-9#\.]+)(%|px|pt|em|rem|in|cm|mm|ex|ch|pc|vw|vh|vmin|vmax|deg|rad|turn)?$/.exec(val);
    if (split) return split[2];
  }

  function getTransformUnit(propName) {
    if (stringContains(propName, 'translate') || propName === 'perspective') return 'px';
    if (stringContains(propName, 'rotate') || stringContains(propName, 'skew')) return 'deg';
  }

  // Values

  function minMaxValue(val, min, max) {
    return Math.min(Math.max(val, min), max);
  }

  function getFunctionValue(val, animatable) {
    if (!is.fnc(val)) return val;
    return val(animatable.target, animatable.id, animatable.total);
  }

  function getCSSValue(el, prop) {
    if (prop in el.style) {
      return getComputedStyle(el).getPropertyValue(stringToHyphens(prop)) || '0';
    }
  }

  function getAnimationType(el, prop) {
    if (is.dom(el) && arrayContains(validTransforms, prop)) return 'transform';
    if (is.dom(el) && (el.getAttribute(prop) || (is.svg(el) && el[prop]))) return 'attribute';
    if (is.dom(el) && (prop !== 'transform' && getCSSValue(el, prop))) return 'css';
    if (el[prop] != null) return 'object';
  }

  function getTransformValue(el, propName) {
    const defaultUnit = getTransformUnit(propName);
    const defaultVal = stringContains(propName, 'scale') ? 1 : 0 + defaultUnit;
    const str = el.style.transform;
    if (!str) return defaultVal;
    let match = [];
    let props = [];
    let values = [];
    const rgx = /(\w+)\((.+?)\)/g;
    while (match = rgx.exec(str)) {
      props.push(match[1]);
      values.push(match[2]);
    }
    const value = filterArray(values, (val, i) => props[i] === propName);
    return value.length ? value[0] : defaultVal;
  }

  function getOriginalTargetValue(target, propName) {
    switch (getAnimationType(target, propName)) {
      case 'transform': return getTransformValue(target, propName);
      case 'css': return getCSSValue(target, propName);
      case 'attribute': return target.getAttribute(propName);
    }
    return target[propName] || 0;
  }

  function getRelativeValue(to, from) {
    const operator = /^(\*=|\+=|-=)/.exec(to);
    if (!operator) return to;
    const u = getUnit(to) || 0;
    const x = parseFloat(from);
    const y = parseFloat(to.replace(operator[0], ''));
    switch (operator[0][0]) {
      case '+': return x + y + u;
      case '-': return x - y + u;
      case '*': return x * y + u;
    }
  }

  function validateValue(val, unit) {
    if (is.col(val)) return colorToRgb(val);
    const originalUnit = getUnit(val);
    const unitLess = originalUnit ? val.substr(0, val.length - originalUnit.length) : val;
    return unit && !/\s/g.test(val) ? unitLess + unit : unitLess;
  }

  // getTotalLength() equivalent for circle, rect, polyline, polygon and line shapes. 
  // adapted from https://gist.github.com/SebLambla/3e0550c496c236709744

  function getDistance(p1, p2) {
    return Math.sqrt(Math.pow(p2.x - p1.x, 2) + Math.pow(p2.y - p1.y, 2)); 
  }

  function getCircleLength(el) {
    return 2 * Math.PI * el.getAttribute('r');
  }

  function getRectLength(el) {
    return (el.getAttribute('width') * 2) + (el.getAttribute('height') * 2);
  }

  function getLineLength(el) {
    return getDistance(
      {x: el.getAttribute('x1'), y: el.getAttribute('y1')}, 
      {x: el.getAttribute('x2'), y: el.getAttribute('y2')}
    );
  }

  function getPolylineLength(el) {
    const points = el.points;
    let totalLength = 0;
    let previousPos;
    for (let i = 0 ; i < points.numberOfItems; i++) {
      const currentPos = points.getItem(i);
      if (i > 0) totalLength += getDistance(previousPos, currentPos);
      previousPos = currentPos;
    }
    return totalLength;
  }

  function getPolygonLength(el) {
    const points = el.points;
    return getPolylineLength(el) + getDistance(points.getItem(points.numberOfItems - 1), points.getItem(0));
  }

  // Path animation

  function getTotalLength(el) {
    if (el.getTotalLength) return el.getTotalLength();
    switch(el.tagName.toLowerCase()) {
      case 'circle': return getCircleLength(el);
      case 'rect': return getRectLength(el);
      case 'line': return getLineLength(el);
      case 'polyline': return getPolylineLength(el);
      case 'polygon': return getPolygonLength(el);
    }
  }

  function setDashoffset(el) {
    const pathLength = getTotalLength(el);
    el.setAttribute('stroke-dasharray', pathLength);
    return pathLength;
  }

  // Motion path

  function getPath(path, percent) {
    const el = is.str(path) ? selectString(path)[0] : path;
    const p = percent || 100;
    return function(prop) {
      return {
        el: el,
        property: prop,
        totalLength: getTotalLength(el) * (p / 100)
      }
    }
  }

  function getPathProgress(path, progress) {
    function point(offset = 0) {
      const l = progress + offset >= 1 ? progress + offset : 0;
      return path.el.getPointAtLength(l);
    }
    const p = point();
    const p0 = point(-1);
    const p1 = point(+1);
    switch (path.property) {
      case 'x': return p.x;
      case 'y': return p.y;
      case 'angle': return Math.atan2(p1.y - p0.y, p1.x - p0.x) * 180 / Math.PI;
    }
  }

  // Decompose value

  function decomposeValue(val, unit) {
    const rgx = /-?\d*\.?\d+/g;
    const value = validateValue((is.pth(val) ? val.totalLength : val), unit) + '';
    return {
      original: value,
      numbers: value.match(rgx) ? value.match(rgx).map(Number) : [0],
      strings: (is.str(val) || unit) ? value.split(rgx) : []
    }
  }

  // Animatables

  function parseTargets(targets) {
    const targetsArray = targets ? (flattenArray(is.arr(targets) ? targets.map(toArray) : toArray(targets))) : [];
    return filterArray(targetsArray, (item, pos, self) => self.indexOf(item) === pos);
  }

  function getAnimatables(targets) {
    const parsed = parseTargets(targets);
    return parsed.map((t, i) => {
      return {target: t, id: i, total: parsed.length};
    });
  }

  // Properties

  function normalizePropertyTweens(prop, tweenSettings) {
    let settings = cloneObject(tweenSettings);
    if (is.arr(prop)) {
      const l = prop.length;
      const isFromTo = (l === 2 && !is.obj(prop[0]));
      if (!isFromTo) {
        // Duration divided by the number of tweens
        if (!is.fnc(tweenSettings.duration)) settings.duration = tweenSettings.duration / l;
      } else {
        // Transform [from, to] values shorthand to a valid tween value
        prop = {value: prop};
      }
    }
    return toArray(prop).map((v, i) => {
      // Default delay value should be applied only on the first tween
      const delay = !i ? tweenSettings.delay : 0;
      // Use path object as a tween value
      let obj = is.obj(v) && !is.pth(v) ? v : {value: v};
      // Set default delay value
      if (is.und(obj.delay)) obj.delay = delay;
      return obj;
    }).map(k => mergeObjects(k, settings));
  }

  function getProperties(instanceSettings, tweenSettings, params) {
    let properties = [];
    const settings = mergeObjects(instanceSettings, tweenSettings);
    for (let p in params) {
      if (!settings.hasOwnProperty(p) && p !== 'targets') {
        properties.push({
          name: p,
          offset: settings['offset'],
          tweens: normalizePropertyTweens(params[p], tweenSettings)
        });
      }
    }
    return properties;
  }

  // Tweens

  function normalizeTweenValues(tween, animatable) {
    let t = {};
    for (let p in tween) {
      let value = getFunctionValue(tween[p], animatable);
      if (is.arr(value)) {
        value = value.map(v => getFunctionValue(v, animatable));
        if (value.length === 1) value = value[0];
      }
      t[p] = value;
    }
    t.duration = parseFloat(t.duration);
    t.delay = parseFloat(t.delay);
    return t;
  }

  function normalizeEasing(val) {
    return is.arr(val) ? bezier.apply(this, val) : easings[val];
  }

  function normalizeTweens(prop, animatable) {
    let previousTween;
    return prop.tweens.map(t => {
      let tween = normalizeTweenValues(t, animatable);
      const tweenValue = tween.value;
      const originalValue = getOriginalTargetValue(animatable.target, prop.name);
      const previousValue = previousTween ? previousTween.to.original : originalValue;
      const from = is.arr(tweenValue) ? tweenValue[0] : previousValue;
      const to = getRelativeValue(is.arr(tweenValue) ? tweenValue[1] : tweenValue, from);
      const unit = getUnit(to) || getUnit(from) || getUnit(originalValue);
      tween.from = decomposeValue(from, unit);
      tween.to = decomposeValue(to, unit);
      tween.start = previousTween ? previousTween.end : prop.offset;
      tween.end = tween.start + tween.delay + tween.duration;
      tween.easing = normalizeEasing(tween.easing);
      tween.elasticity = (1000 - minMaxValue(tween.elasticity, 1, 999)) / 1000;
      tween.isPath = is.pth(tweenValue);
      tween.isColor = is.col(tween.from.original);
      if (tween.isColor) tween.round = 1;
      previousTween = tween;
      return tween;
    });
  }

  // Tween progress

  const setTweenProgress = {
    css: (t, p, v) => t.style[p] = v,
    attribute: (t, p, v) => t.setAttribute(p, v),
    object: (t, p, v) => t[p] = v,
    transform: (t, p, v, transforms, id) => {
      if (!transforms[id]) transforms[id] = [];
      transforms[id].push(`${p}(${v})`);
    }
  }

  // Animations

  function createAnimation(animatable, prop) {
    const animType = getAnimationType(animatable.target, prop.name);
    if (animType) {
      const tweens = normalizeTweens(prop, animatable);
      return {
        type: animType,
        property: prop.name,
        animatable: animatable,
        tweens: tweens,
        duration: tweens[tweens.length - 1].end,
        delay: tweens[0].delay
      }
    }
  }

  function getAnimations(animatables, properties) {
    return filterArray(flattenArray(animatables.map(animatable => {
      return properties.map(prop => {
        return createAnimation(animatable, prop);
      });
    })), a => !is.und(a));
  }

  // Create Instance

  function getInstanceTimings(type, animations, instanceSettings, tweenSettings) {
    const isDelay = (type === 'delay');
    if (animations.length) {
      return (isDelay ? Math.min : Math.max).apply(Math, animations.map(anim => anim[type]));
    } else {
      return isDelay ? tweenSettings.delay : instanceSettings.offset + tweenSettings.delay + tweenSettings.duration;
    }
  }

  function createNewInstance(params) {
    const instanceSettings = replaceObjectProps(defaultInstanceSettings, params);
    const tweenSettings = replaceObjectProps(defaultTweenSettings, params);
    const animatables = getAnimatables(params.targets);
    const properties = getProperties(instanceSettings, tweenSettings, params);
    const animations = getAnimations(animatables, properties);
    return mergeObjects(instanceSettings, {
      children: [],
      animatables: animatables,
      animations: animations,
      duration: getInstanceTimings('duration', animations, instanceSettings, tweenSettings),
      delay: getInstanceTimings('delay', animations, instanceSettings, tweenSettings)
    });
  }

  // Core

  let activeInstances = [];
  let raf = 0;

  const engine = (() => {
    function play() { raf = requestAnimationFrame(step); };
    function step(t) {
      const activeLength = activeInstances.length;
      if (activeLength) {
        let i = 0;
        while (i < activeLength) {
          if (activeInstances[i]) activeInstances[i].tick(t);
          i++;
        }
        play();
      } else {
        cancelAnimationFrame(raf);
        raf = 0;
      }
    }
    return play;
  })();


  // Public Instance

  function anime(params = {}) {

    let now, startTime, lastTime = 0;

    let resolve = null;

    function makePromise() {
      return window.Promise && new Promise(_resolve => resolve = _resolve);
    }

    let promise = makePromise();

    let instance = createNewInstance(params);

    function toggleInstanceDirection() {
      instance.reversed = !instance.reversed;
    }

    function adjustTime(time) {
      return instance.reversed ? instance.duration - time : time;
    }

    function syncInstanceChildren(time) {
      const children = instance.children;
      const childrenLength = children.length;
      if (time >= instance.currentTime) {
        for (let i = 0; i < childrenLength; i++) children[i].seek(time);
      } else {
        for (let i = childrenLength; i--;) children[i].seek(time);
      }
    }

    function setAnimationsProgress(insTime) {
      let i = 0;
      let transforms = {};
      const animations = instance.animations;
      const animationsLength = animations.length;
      while (i < animationsLength) {
        const anim = animations[i];
        const animatable = anim.animatable;
        const tweens = anim.tweens;
        const tweenLength = tweens.length - 1;
        let tween = tweens[tweenLength];
        // Only check for keyframes if there is more than one tween
        if (tweenLength) tween = filterArray(tweens, t => (insTime < t.end))[0] || tween;
        const elapsed = minMaxValue(insTime - tween.start - tween.delay, 0, tween.duration) / tween.duration;
        const eased = isNaN(elapsed) ? 1 : tween.easing(elapsed, tween.elasticity);
        const strings = tween.to.strings;
        const round = tween.round;
        let numbers = [];
        let progress;
        const toNumbersLength = tween.to.numbers.length;
        for (let n = 0; n < toNumbersLength; n++) {
          let value;
          const toNumber = tween.to.numbers[n];
          const fromNumber = tween.from.numbers[n];
          if (!tween.isPath) {
            value = fromNumber + (eased * (toNumber - fromNumber));
          } else {
            value = getPathProgress(tween.value, eased * toNumber);
          }
          if (round) {
            if (!(tween.isColor && n > 2)) {
              value = Math.round(value * round) / round;
            }
          }
          numbers.push(value);
        }
        // Manual Array.reduce for better performances
        const stringsLength = strings.length;
        if (!stringsLength) {
          progress = numbers[0];
        } else {
          progress = strings[0];
          for (let s = 0; s < stringsLength; s++) {
            const a = strings[s];
            const b = strings[s + 1];
            const n = numbers[s];
            if (!isNaN(n)) {
              if (!b) {
                progress += n + ' ';
              } else {
                progress += n + b;
              }
            }
          }
        }
        setTweenProgress[anim.type](animatable.target, anim.property, progress, transforms, animatable.id);
        anim.currentValue = progress;
        i++;
      }
      const transformsLength = Object.keys(transforms).length;
      if (transformsLength) {
        for (let id = 0; id < transformsLength; id++) {
          if (!transformString) {
            const t = 'transform';
            transformString = (getCSSValue(document.body, t) ? t : `-webkit-${t}`);
          }
          instance.animatables[id].target.style[transformString] = transforms[id].join(' ');
        }
      }
      instance.currentTime = insTime;
      instance.progress = (insTime / instance.duration) * 100;
    }

    function setCallback(cb) {
      if (instance[cb]) instance[cb](instance);
    }

    function countIteration() {
      if (instance.remaining && instance.remaining !== true) {
        instance.remaining--;
      }
    }

    function setInstanceProgress(engineTime) {
      const insDuration = instance.duration;
      const insOffset = instance.offset;
      const insStart = insOffset + instance.delay;
      const insCurrentTime = instance.currentTime;
      const insReversed = instance.reversed;
      const insTime = adjustTime(engineTime);
      if (instance.children.length) syncInstanceChildren(insTime);
      if (insTime >= insStart || !insDuration) {
        if (!instance.began) {
          instance.began = true;
          setCallback('begin');
        }
        setCallback('run');
      }
      if (insTime > insOffset && insTime < insDuration) {
        setAnimationsProgress(insTime);
      } else {
        if (insTime <= insOffset && insCurrentTime !== 0) {
          setAnimationsProgress(0);
          if (insReversed) countIteration();
        }
        if ((insTime >= insDuration && insCurrentTime !== insDuration) || !insDuration) {
          setAnimationsProgress(insDuration);
          if (!insReversed) countIteration();
        }
      }
      setCallback('update');
      if (engineTime >= insDuration) {
        if (instance.remaining) {
          startTime = now;
          if (instance.direction === 'alternate') toggleInstanceDirection();
        } else {
          instance.pause();
          if (!instance.completed) {
            instance.completed = true;
            setCallback('complete');
            if ('Promise' in window) {
              resolve();
              promise = makePromise();
            }
          }
        }
        lastTime = 0;
      }
    }

    instance.reset = function() {
      const direction = instance.direction;
      const loops = instance.loop;
      instance.currentTime = 0;
      instance.progress = 0;
      instance.paused = true;
      instance.began = false;
      instance.completed = false;
      instance.reversed = direction === 'reverse';
      instance.remaining = direction === 'alternate' && loops === 1 ? 2 : loops;
      setAnimationsProgress(0);
      for (let i = instance.children.length; i--; ){
        instance.children[i].reset();
      }
    }

    instance.tick = function(t) {
      now = t;
      if (!startTime) startTime = now;
      const engineTime = (lastTime + now - startTime) * anime.speed;
      setInstanceProgress(engineTime);
    }

    instance.seek = function(time) {
      setInstanceProgress(adjustTime(time));
    }

    instance.pause = function() {
      const i = activeInstances.indexOf(instance);
      if (i > -1) activeInstances.splice(i, 1);
      instance.paused = true;
    }

    instance.play = function() {
      if (!instance.paused) return;
      instance.paused = false;
      startTime = 0;
      lastTime = adjustTime(instance.currentTime);
      activeInstances.push(instance);
      if (!raf) engine();
    }

    instance.reverse = function() {
      toggleInstanceDirection();
      startTime = 0;
      lastTime = adjustTime(instance.currentTime);
    }

    instance.restart = function() {
      instance.pause();
      instance.reset();
      instance.play();
    }

    instance.finished = promise;

    instance.reset();

    if (instance.autoplay) instance.play();

    return instance;

  }

  // Remove targets from animation

  function removeTargets(targets) {
    const targetsArray = parseTargets(targets);
    for (let i = activeInstances.length; i--;) {
      const instance = activeInstances[i];
      const animations = instance.animations;
      for (let a = animations.length; a--;) {
        if (arrayContains(targetsArray, animations[a].animatable.target)) {
          animations.splice(a, 1);
          if (!animations.length) instance.pause();
        }
      }
    }
  }

  // Timeline

  function timeline(params) {
    let tl = anime(params);
    tl.pause();
    tl.duration = 0;
    tl.add = function(instancesParams) {
      tl.children.forEach(i => { i.began = true; i.completed = true; });
      toArray(instancesParams).forEach(instanceParams => {
        let insParams = mergeObjects(instanceParams, replaceObjectProps(defaultTweenSettings, params || {}));
        insParams.targets = insParams.targets || params.targets;
        const tlDuration = tl.duration;
        const insOffset = insParams.offset;
        insParams.autoplay = false;
        insParams.direction = tl.direction;
        insParams.offset = is.und(insOffset) ? tlDuration : getRelativeValue(insOffset, tlDuration);
        tl.began = true;
        tl.completed = true;
        tl.seek(insParams.offset);
        const ins = anime(insParams);
        ins.began = true;
        ins.completed = true;
        if (ins.duration > tlDuration) tl.duration = ins.duration;
        tl.children.push(ins);
      });
      tl.seek(0);
      tl.reset();
      if (tl.autoplay) tl.restart();
      return tl;
    }
    return tl;
  }

  anime.version = '2.2.0';
  anime.speed = 1;
  anime.running = activeInstances;
  anime.remove = removeTargets;
  anime.getValue = getOriginalTargetValue;
  anime.path = getPath;
  anime.setDashoffset = setDashoffset;
  anime.bezier = bezier;
  anime.easings = easings;
  anime.timeline = timeline;
  anime.random = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;

  return anime;

}));

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiIiwic291cmNlcyI6WyJsaWJzL2FuaW1lLmpzIl0sInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogaHR0cDovL2FuaW1lanMuY29tXG4gKiBKYXZhU2NyaXB0IGFuaW1hdGlvbiBlbmdpbmVcbiAqIEB2ZXJzaW9uIHYyLjIuMFxuICogQGF1dGhvciBKdWxpYW4gR2FybmllclxuICogQGNvcHlyaWdodCDCqTIwMTcgSnVsaWFuIEdhcm5pZXJcbiAqIFJlbGVhc2VkIHVuZGVyIHRoZSBNSVQgbGljZW5zZVxuKiovXG5cbihmdW5jdGlvbihyb290LCBmYWN0b3J5KSB7XG4gIGlmICh0eXBlb2YgZGVmaW5lID09PSAnZnVuY3Rpb24nICYmIGRlZmluZS5hbWQpIHtcbiAgICAvLyBBTUQuIFJlZ2lzdGVyIGFzIGFuIGFub255bW91cyBtb2R1bGUuXG4gICAgZGVmaW5lKFtdLCBmYWN0b3J5KTtcbiAgfSBlbHNlIGlmICh0eXBlb2YgbW9kdWxlID09PSAnb2JqZWN0JyAmJiBtb2R1bGUuZXhwb3J0cykge1xuICAgIC8vIE5vZGUuIERvZXMgbm90IHdvcmsgd2l0aCBzdHJpY3QgQ29tbW9uSlMsIGJ1dFxuICAgIC8vIG9ubHkgQ29tbW9uSlMtbGlrZSBlbnZpcm9ubWVudHMgdGhhdCBzdXBwb3J0IG1vZHVsZS5leHBvcnRzLFxuICAgIC8vIGxpa2UgTm9kZS5cbiAgICBtb2R1bGUuZXhwb3J0cyA9IGZhY3RvcnkoKTtcbiAgfSBlbHNlIHtcbiAgICAvLyBCcm93c2VyIGdsb2JhbHMgKHJvb3QgaXMgd2luZG93KVxuICAgIHJvb3QuYW5pbWUgPSBmYWN0b3J5KCk7XG4gIH1cbn0odGhpcywgKCkgPT4ge1xuXG4gIC8vIERlZmF1bHRzXG5cbiAgY29uc3QgZGVmYXVsdEluc3RhbmNlU2V0dGluZ3MgPSB7XG4gICAgdXBkYXRlOiB1bmRlZmluZWQsXG4gICAgYmVnaW46IHVuZGVmaW5lZCxcbiAgICBydW46IHVuZGVmaW5lZCxcbiAgICBjb21wbGV0ZTogdW5kZWZpbmVkLFxuICAgIGxvb3A6IDEsXG4gICAgZGlyZWN0aW9uOiAnbm9ybWFsJyxcbiAgICBhdXRvcGxheTogdHJ1ZSxcbiAgICBvZmZzZXQ6IDBcbiAgfVxuXG4gIGNvbnN0IGRlZmF1bHRUd2VlblNldHRpbmdzID0ge1xuICAgIGR1cmF0aW9uOiAxMDAwLFxuICAgIGRlbGF5OiAwLFxuICAgIGVhc2luZzogJ2Vhc2VPdXRFbGFzdGljJyxcbiAgICBlbGFzdGljaXR5OiA1MDAsXG4gICAgcm91bmQ6IDBcbiAgfVxuXG4gIGNvbnN0IHZhbGlkVHJhbnNmb3JtcyA9IFsndHJhbnNsYXRlWCcsICd0cmFuc2xhdGVZJywgJ3RyYW5zbGF0ZVonLCAncm90YXRlJywgJ3JvdGF0ZVgnLCAncm90YXRlWScsICdyb3RhdGVaJywgJ3NjYWxlJywgJ3NjYWxlWCcsICdzY2FsZVknLCAnc2NhbGVaJywgJ3NrZXdYJywgJ3NrZXdZJywgJ3BlcnNwZWN0aXZlJ107XG4gIGxldCB0cmFuc2Zvcm1TdHJpbmc7XG5cbiAgLy8gVXRpbHNcblxuICBmdW5jdGlvbiBzdHJpbmdDb250YWlucyhzdHIsIHRleHQpIHtcbiAgICByZXR1cm4gc3RyLmluZGV4T2YodGV4dCkgPiAtMTtcbiAgfVxuXG4gIGNvbnN0IGlzID0ge1xuICAgIGFycjogYSA9PiBBcnJheS5pc0FycmF5KGEpLFxuICAgIG9iajogYSA9PiBzdHJpbmdDb250YWlucyhPYmplY3QucHJvdG90eXBlLnRvU3RyaW5nLmNhbGwoYSksICdPYmplY3QnKSxcbiAgICBwdGg6IGEgPT4gaXMub2JqKGEpICYmIGEuaGFzT3duUHJvcGVydHkoJ3RvdGFsTGVuZ3RoJyksXG4gICAgc3ZnOiBhID0+IGEgaW5zdGFuY2VvZiBTVkdFbGVtZW50LFxuICAgIGRvbTogYSA9PiBhLm5vZGVUeXBlIHx8IGlzLnN2ZyhhKSxcbiAgICBzdHI6IGEgPT4gdHlwZW9mIGEgPT09ICdzdHJpbmcnLFxuICAgIGZuYzogYSA9PiB0eXBlb2YgYSA9PT0gJ2Z1bmN0aW9uJyxcbiAgICB1bmQ6IGEgPT4gdHlwZW9mIGEgPT09ICd1bmRlZmluZWQnLFxuICAgIGhleDogYSA9PiAvKF4jWzAtOUEtRl17Nn0kKXwoXiNbMC05QS1GXXszfSQpL2kudGVzdChhKSxcbiAgICByZ2I6IGEgPT4gL15yZ2IvLnRlc3QoYSksXG4gICAgaHNsOiBhID0+IC9eaHNsLy50ZXN0KGEpLFxuICAgIGNvbDogYSA9PiAoaXMuaGV4KGEpIHx8IGlzLnJnYihhKSB8fCBpcy5oc2woYSkpXG4gIH1cblxuICAvLyBCZXppZXJFYXNpbmcgaHR0cHM6Ly9naXRodWIuY29tL2dyZS9iZXppZXItZWFzaW5nXG5cbiAgY29uc3QgYmV6aWVyID0gKCgpID0+IHtcblxuICAgIGNvbnN0IGtTcGxpbmVUYWJsZVNpemUgPSAxMTtcbiAgICBjb25zdCBrU2FtcGxlU3RlcFNpemUgPSAxLjAgLyAoa1NwbGluZVRhYmxlU2l6ZSAtIDEuMCk7XG5cbiAgICBmdW5jdGlvbiBBIChhQTEsIGFBMikgeyByZXR1cm4gMS4wIC0gMy4wICogYUEyICsgMy4wICogYUExIH07XG4gICAgZnVuY3Rpb24gQiAoYUExLCBhQTIpIHsgcmV0dXJuIDMuMCAqIGFBMiAtIDYuMCAqIGFBMSB9O1xuICAgIGZ1bmN0aW9uIEMgKGFBMSkgICAgICB7IHJldHVybiAzLjAgKiBhQTEgfTtcblxuICAgIGZ1bmN0aW9uIGNhbGNCZXppZXIgKGFULCBhQTEsIGFBMikgeyByZXR1cm4gKChBKGFBMSwgYUEyKSAqIGFUICsgQihhQTEsIGFBMikpICogYVQgKyBDKGFBMSkpICogYVQgfTtcbiAgICBmdW5jdGlvbiBnZXRTbG9wZSAoYVQsIGFBMSwgYUEyKSB7IHJldHVybiAzLjAgKiBBKGFBMSwgYUEyKSAqIGFUICogYVQgKyAyLjAgKiBCKGFBMSwgYUEyKSAqIGFUICsgQyhhQTEpIH07XG5cbiAgICBmdW5jdGlvbiBiaW5hcnlTdWJkaXZpZGUgKGFYLCBhQSwgYUIsIG1YMSwgbVgyKSB7XG4gICAgICBsZXQgY3VycmVudFgsIGN1cnJlbnRULCBpID0gMDtcbiAgICAgIGRvIHtcbiAgICAgICAgY3VycmVudFQgPSBhQSArIChhQiAtIGFBKSAvIDIuMDtcbiAgICAgICAgY3VycmVudFggPSBjYWxjQmV6aWVyKGN1cnJlbnRULCBtWDEsIG1YMikgLSBhWDtcbiAgICAgICAgaWYgKGN1cnJlbnRYID4gMC4wKSB7IGFCID0gY3VycmVudFQgfSBlbHNlIHsgYUEgPSBjdXJyZW50VCB9O1xuICAgICAgfSB3aGlsZSAoTWF0aC5hYnMoY3VycmVudFgpID4gMC4wMDAwMDAxICYmICsraSA8IDEwKTtcbiAgICAgIHJldHVybiBjdXJyZW50VDtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBuZXd0b25SYXBoc29uSXRlcmF0ZSAoYVgsIGFHdWVzc1QsIG1YMSwgbVgyKSB7XG4gICAgICBmb3IgKGxldCBpID0gMDsgaSA8IDQ7ICsraSkge1xuICAgICAgICBjb25zdCBjdXJyZW50U2xvcGUgPSBnZXRTbG9wZShhR3Vlc3NULCBtWDEsIG1YMik7XG4gICAgICAgIGlmIChjdXJyZW50U2xvcGUgPT09IDAuMCkgcmV0dXJuIGFHdWVzc1Q7XG4gICAgICAgIGNvbnN0IGN1cnJlbnRYID0gY2FsY0JlemllcihhR3Vlc3NULCBtWDEsIG1YMikgLSBhWDtcbiAgICAgICAgYUd1ZXNzVCAtPSBjdXJyZW50WCAvIGN1cnJlbnRTbG9wZTtcbiAgICAgIH1cbiAgICAgIHJldHVybiBhR3Vlc3NUO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIGJlemllcihtWDEsIG1ZMSwgbVgyLCBtWTIpIHtcblxuICAgICAgaWYgKCEoMCA8PSBtWDEgJiYgbVgxIDw9IDEgJiYgMCA8PSBtWDIgJiYgbVgyIDw9IDEpKSByZXR1cm47XG4gICAgICBsZXQgc2FtcGxlVmFsdWVzID0gbmV3IEZsb2F0MzJBcnJheShrU3BsaW5lVGFibGVTaXplKTtcblxuICAgICAgaWYgKG1YMSAhPT0gbVkxIHx8IG1YMiAhPT0gbVkyKSB7XG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwga1NwbGluZVRhYmxlU2l6ZTsgKytpKSB7XG4gICAgICAgICAgc2FtcGxlVmFsdWVzW2ldID0gY2FsY0JlemllcihpICoga1NhbXBsZVN0ZXBTaXplLCBtWDEsIG1YMik7XG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgZnVuY3Rpb24gZ2V0VEZvclgoYVgpIHtcblxuICAgICAgICBsZXQgaW50ZXJ2YWxTdGFydCA9IDAuMDtcbiAgICAgICAgbGV0IGN1cnJlbnRTYW1wbGUgPSAxO1xuICAgICAgICBjb25zdCBsYXN0U2FtcGxlID0ga1NwbGluZVRhYmxlU2l6ZSAtIDE7XG5cbiAgICAgICAgZm9yICg7IGN1cnJlbnRTYW1wbGUgIT09IGxhc3RTYW1wbGUgJiYgc2FtcGxlVmFsdWVzW2N1cnJlbnRTYW1wbGVdIDw9IGFYOyArK2N1cnJlbnRTYW1wbGUpIHtcbiAgICAgICAgICBpbnRlcnZhbFN0YXJ0ICs9IGtTYW1wbGVTdGVwU2l6ZTtcbiAgICAgICAgfVxuXG4gICAgICAgIC0tY3VycmVudFNhbXBsZTtcblxuICAgICAgICBjb25zdCBkaXN0ID0gKGFYIC0gc2FtcGxlVmFsdWVzW2N1cnJlbnRTYW1wbGVdKSAvIChzYW1wbGVWYWx1ZXNbY3VycmVudFNhbXBsZSArIDFdIC0gc2FtcGxlVmFsdWVzW2N1cnJlbnRTYW1wbGVdKTtcbiAgICAgICAgY29uc3QgZ3Vlc3NGb3JUID0gaW50ZXJ2YWxTdGFydCArIGRpc3QgKiBrU2FtcGxlU3RlcFNpemU7XG4gICAgICAgIGNvbnN0IGluaXRpYWxTbG9wZSA9IGdldFNsb3BlKGd1ZXNzRm9yVCwgbVgxLCBtWDIpO1xuXG4gICAgICAgIGlmIChpbml0aWFsU2xvcGUgPj0gMC4wMDEpIHtcbiAgICAgICAgICByZXR1cm4gbmV3dG9uUmFwaHNvbkl0ZXJhdGUoYVgsIGd1ZXNzRm9yVCwgbVgxLCBtWDIpO1xuICAgICAgICB9IGVsc2UgaWYgKGluaXRpYWxTbG9wZSA9PT0gMC4wKSB7XG4gICAgICAgICAgcmV0dXJuIGd1ZXNzRm9yVDtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICByZXR1cm4gYmluYXJ5U3ViZGl2aWRlKGFYLCBpbnRlcnZhbFN0YXJ0LCBpbnRlcnZhbFN0YXJ0ICsga1NhbXBsZVN0ZXBTaXplLCBtWDEsIG1YMik7XG4gICAgICAgIH1cblxuICAgICAgfVxuXG4gICAgICByZXR1cm4geCA9PiB7XG4gICAgICAgIGlmIChtWDEgPT09IG1ZMSAmJiBtWDIgPT09IG1ZMikgcmV0dXJuIHg7XG4gICAgICAgIGlmICh4ID09PSAwKSByZXR1cm4gMDtcbiAgICAgICAgaWYgKHggPT09IDEpIHJldHVybiAxO1xuICAgICAgICByZXR1cm4gY2FsY0JlemllcihnZXRURm9yWCh4KSwgbVkxLCBtWTIpO1xuICAgICAgfVxuXG4gICAgfVxuXG4gICAgcmV0dXJuIGJlemllcjtcblxuICB9KSgpO1xuXG4gIGNvbnN0IGVhc2luZ3MgPSAoKCkgPT4ge1xuXG4gICAgY29uc3QgbmFtZXMgPSBbJ1F1YWQnLCAnQ3ViaWMnLCAnUXVhcnQnLCAnUXVpbnQnLCAnU2luZScsICdFeHBvJywgJ0NpcmMnLCAnQmFjaycsICdFbGFzdGljJ107XG5cbiAgICAvLyBFbGFzdGljIGVhc2luZyBhZGFwdGVkIGZyb20galF1ZXJ5VUkgaHR0cDovL2FwaS5qcXVlcnl1aS5jb20vZWFzaW5ncy9cblxuICAgIGZ1bmN0aW9uIGVsYXN0aWModCwgcCkge1xuICAgICAgcmV0dXJuIHQgPT09IDAgfHwgdCA9PT0gMSA/IHQgOlxuICAgICAgLU1hdGgucG93KDIsIDEwICogKHQgLSAxKSkgKiBNYXRoLnNpbigoKCh0IC0gMSkgLSAocCAvIChNYXRoLlBJICogMi4wKSAqIE1hdGguYXNpbigxKSkpICogKE1hdGguUEkgKiAyKSkgLyBwICk7XG4gICAgfVxuXG4gICAgLy8gQXBwcm94aW1hdGVkIFBlbm5lciBlcXVhdGlvbnMgaHR0cDovL21hdHRoZXdsZWluLmNvbS9jZWFzZXIvXG5cbiAgICBjb25zdCBlcXVhdGlvbnMgPSB7XG4gICAgICBJbjogW1xuICAgICAgICBbMC41NTAsIDAuMDg1LCAwLjY4MCwgMC41MzBdLCAvKiBJblF1YWQgKi9cbiAgICAgICAgWzAuNTUwLCAwLjA1NSwgMC42NzUsIDAuMTkwXSwgLyogSW5DdWJpYyAqL1xuICAgICAgICBbMC44OTUsIDAuMDMwLCAwLjY4NSwgMC4yMjBdLCAvKiBJblF1YXJ0ICovXG4gICAgICAgIFswLjc1NSwgMC4wNTAsIDAuODU1LCAwLjA2MF0sIC8qIEluUXVpbnQgKi9cbiAgICAgICAgWzAuNDcwLCAwLjAwMCwgMC43NDUsIDAuNzE1XSwgLyogSW5TaW5lICovXG4gICAgICAgIFswLjk1MCwgMC4wNTAsIDAuNzk1LCAwLjAzNV0sIC8qIEluRXhwbyAqL1xuICAgICAgICBbMC42MDAsIDAuMDQwLCAwLjk4MCwgMC4zMzVdLCAvKiBJbkNpcmMgKi9cbiAgICAgICAgWzAuNjAwLCAtMC4yODAsIDAuNzM1LCAwLjA0NV0sIC8qIEluQmFjayAqL1xuICAgICAgICBlbGFzdGljIC8qIEluRWxhc3RpYyAqL1xuICAgICAgXSwgT3V0OiBbXG4gICAgICAgIFswLjI1MCwgMC40NjAsIDAuNDUwLCAwLjk0MF0sIC8qIE91dFF1YWQgKi9cbiAgICAgICAgWzAuMjE1LCAwLjYxMCwgMC4zNTUsIDEuMDAwXSwgLyogT3V0Q3ViaWMgKi9cbiAgICAgICAgWzAuMTY1LCAwLjg0MCwgMC40NDAsIDEuMDAwXSwgLyogT3V0UXVhcnQgKi9cbiAgICAgICAgWzAuMjMwLCAxLjAwMCwgMC4zMjAsIDEuMDAwXSwgLyogT3V0UXVpbnQgKi9cbiAgICAgICAgWzAuMzkwLCAwLjU3NSwgMC41NjUsIDEuMDAwXSwgLyogT3V0U2luZSAqL1xuICAgICAgICBbMC4xOTAsIDEuMDAwLCAwLjIyMCwgMS4wMDBdLCAvKiBPdXRFeHBvICovXG4gICAgICAgIFswLjA3NSwgMC44MjAsIDAuMTY1LCAxLjAwMF0sIC8qIE91dENpcmMgKi9cbiAgICAgICAgWzAuMTc1LCAwLjg4NSwgMC4zMjAsIDEuMjc1XSwgLyogT3V0QmFjayAqL1xuICAgICAgICAodCwgZikgPT4gMSAtIGVsYXN0aWMoMSAtIHQsIGYpIC8qIE91dEVsYXN0aWMgKi9cbiAgICAgIF0sIEluT3V0OiBbXG4gICAgICAgIFswLjQ1NSwgMC4wMzAsIDAuNTE1LCAwLjk1NV0sIC8qIEluT3V0UXVhZCAqL1xuICAgICAgICBbMC42NDUsIDAuMDQ1LCAwLjM1NSwgMS4wMDBdLCAvKiBJbk91dEN1YmljICovXG4gICAgICAgIFswLjc3MCwgMC4wMDAsIDAuMTc1LCAxLjAwMF0sIC8qIEluT3V0UXVhcnQgKi9cbiAgICAgICAgWzAuODYwLCAwLjAwMCwgMC4wNzAsIDEuMDAwXSwgLyogSW5PdXRRdWludCAqL1xuICAgICAgICBbMC40NDUsIDAuMDUwLCAwLjU1MCwgMC45NTBdLCAvKiBJbk91dFNpbmUgKi9cbiAgICAgICAgWzEuMDAwLCAwLjAwMCwgMC4wMDAsIDEuMDAwXSwgLyogSW5PdXRFeHBvICovXG4gICAgICAgIFswLjc4NSwgMC4xMzUsIDAuMTUwLCAwLjg2MF0sIC8qIEluT3V0Q2lyYyAqL1xuICAgICAgICBbMC42ODAsIC0wLjU1MCwgMC4yNjUsIDEuNTUwXSwgLyogSW5PdXRCYWNrICovXG4gICAgICAgICh0LCBmKSA9PiB0IDwgLjUgPyBlbGFzdGljKHQgKiAyLCBmKSAvIDIgOiAxIC0gZWxhc3RpYyh0ICogLTIgKyAyLCBmKSAvIDIgLyogSW5PdXRFbGFzdGljICovXG4gICAgICBdXG4gICAgfVxuXG4gICAgbGV0IGZ1bmN0aW9ucyA9IHtcbiAgICAgIGxpbmVhcjogYmV6aWVyKDAuMjUwLCAwLjI1MCwgMC43NTAsIDAuNzUwKVxuICAgIH1cblxuICAgIGZvciAobGV0IHR5cGUgaW4gZXF1YXRpb25zKSB7XG4gICAgICBlcXVhdGlvbnNbdHlwZV0uZm9yRWFjaCgoZiwgaSkgPT4ge1xuICAgICAgICBmdW5jdGlvbnNbJ2Vhc2UnK3R5cGUrbmFtZXNbaV1dID0gaXMuZm5jKGYpID8gZiA6IGJlemllci5hcHBseSh0aGlzLCBmKTtcbiAgICAgIH0pO1xuICAgIH1cblxuICAgIHJldHVybiBmdW5jdGlvbnM7XG5cbiAgfSkoKTtcblxuICAvLyBTdHJpbmdzXG5cbiAgZnVuY3Rpb24gc3RyaW5nVG9IeXBoZW5zKHN0cikge1xuICAgIHJldHVybiBzdHIucmVwbGFjZSgvKFthLXpdKShbQS1aXSkvZywgJyQxLSQyJykudG9Mb3dlckNhc2UoKTtcbiAgfVxuXG4gIGZ1bmN0aW9uIHNlbGVjdFN0cmluZyhzdHIpIHtcbiAgICBpZiAoaXMuY29sKHN0cikpIHJldHVybjtcbiAgICB0cnkge1xuICAgICAgbGV0IG5vZGVzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbChzdHIpO1xuICAgICAgcmV0dXJuIG5vZGVzO1xuICAgIH0gY2F0Y2goZSkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgfVxuXG4gIC8vIEFycmF5c1xuXG4gIGZ1bmN0aW9uIGZpbHRlckFycmF5KGFyciwgY2FsbGJhY2spIHtcbiAgICBjb25zdCBsZW4gPSBhcnIubGVuZ3RoO1xuICAgIGNvbnN0IHRoaXNBcmcgPSBhcmd1bWVudHMubGVuZ3RoID49IDIgPyBhcmd1bWVudHNbMV0gOiB2b2lkIDA7XG4gICAgbGV0IHJlc3VsdCA9IFtdO1xuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgbGVuOyBpKyspIHtcbiAgICAgIGlmIChpIGluIGFycikge1xuICAgICAgICBjb25zdCB2YWwgPSBhcnJbaV07XG4gICAgICAgIGlmIChjYWxsYmFjay5jYWxsKHRoaXNBcmcsIHZhbCwgaSwgYXJyKSkge1xuICAgICAgICAgIHJlc3VsdC5wdXNoKHZhbCk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIHJlc3VsdDtcbiAgfVxuXG4gIGZ1bmN0aW9uIGZsYXR0ZW5BcnJheShhcnIpIHtcbiAgICByZXR1cm4gYXJyLnJlZHVjZSgoYSwgYikgPT4gYS5jb25jYXQoaXMuYXJyKGIpID8gZmxhdHRlbkFycmF5KGIpIDogYiksIFtdKTtcbiAgfVxuXG4gIGZ1bmN0aW9uIHRvQXJyYXkobykge1xuICAgIGlmIChpcy5hcnIobykpIHJldHVybiBvO1xuICAgIGlmIChpcy5zdHIobykpIG8gPSBzZWxlY3RTdHJpbmcobykgfHwgbztcbiAgICBpZiAobyBpbnN0YW5jZW9mIE5vZGVMaXN0IHx8IG8gaW5zdGFuY2VvZiBIVE1MQ29sbGVjdGlvbikgcmV0dXJuIFtdLnNsaWNlLmNhbGwobyk7XG4gICAgcmV0dXJuIFtvXTtcbiAgfVxuXG4gIGZ1bmN0aW9uIGFycmF5Q29udGFpbnMoYXJyLCB2YWwpIHtcbiAgICByZXR1cm4gYXJyLnNvbWUoYSA9PiBhID09PSB2YWwpO1xuICB9XG5cbiAgLy8gT2JqZWN0c1xuXG4gIGZ1bmN0aW9uIGNsb25lT2JqZWN0KG8pIHtcbiAgICBsZXQgY2xvbmUgPSB7fTtcbiAgICBmb3IgKGxldCBwIGluIG8pIGNsb25lW3BdID0gb1twXTtcbiAgICByZXR1cm4gY2xvbmU7XG4gIH1cblxuICBmdW5jdGlvbiByZXBsYWNlT2JqZWN0UHJvcHMobzEsIG8yKSB7XG4gICAgbGV0IG8gPSBjbG9uZU9iamVjdChvMSk7XG4gICAgZm9yIChsZXQgcCBpbiBvMSkgb1twXSA9IG8yLmhhc093blByb3BlcnR5KHApID8gbzJbcF0gOiBvMVtwXTtcbiAgICByZXR1cm4gbztcbiAgfVxuXG4gIGZ1bmN0aW9uIG1lcmdlT2JqZWN0cyhvMSwgbzIpIHtcbiAgICBsZXQgbyA9IGNsb25lT2JqZWN0KG8xKTtcbiAgICBmb3IgKGxldCBwIGluIG8yKSBvW3BdID0gaXMudW5kKG8xW3BdKSA/IG8yW3BdIDogbzFbcF07XG4gICAgcmV0dXJuIG87XG4gIH1cblxuICAvLyBDb2xvcnNcblxuICBmdW5jdGlvbiByZ2JUb1JnYmEocmdiVmFsdWUpIHtcbiAgICBjb25zdCByZ2IgPSAvcmdiXFwoKFxcZCssXFxzKltcXGRdKyxcXHMqW1xcZF0rKVxcKS9nLmV4ZWMocmdiVmFsdWUpO1xuICAgIHJldHVybiByZ2IgPyBgcmdiYSgke3JnYlsxXX0sMSlgIDogcmdiVmFsdWU7XG4gIH1cblxuICBmdW5jdGlvbiBoZXhUb1JnYmEoaGV4VmFsdWUpIHtcbiAgICBjb25zdCByZ3ggPSAvXiM/KFthLWZcXGRdKShbYS1mXFxkXSkoW2EtZlxcZF0pJC9pO1xuICAgIGNvbnN0IGhleCA9IGhleFZhbHVlLnJlcGxhY2Uocmd4LCAobSwgciwgZywgYikgPT4gciArIHIgKyBnICsgZyArIGIgKyBiICk7XG4gICAgY29uc3QgcmdiID0gL14jPyhbYS1mXFxkXXsyfSkoW2EtZlxcZF17Mn0pKFthLWZcXGRdezJ9KSQvaS5leGVjKGhleCk7XG4gICAgY29uc3QgciA9IHBhcnNlSW50KHJnYlsxXSwgMTYpO1xuICAgIGNvbnN0IGcgPSBwYXJzZUludChyZ2JbMl0sIDE2KTtcbiAgICBjb25zdCBiID0gcGFyc2VJbnQocmdiWzNdLCAxNik7XG4gICAgcmV0dXJuIGByZ2JhKCR7cn0sJHtnfSwke2J9LDEpYDtcbiAgfVxuXG4gIGZ1bmN0aW9uIGhzbFRvUmdiYShoc2xWYWx1ZSkge1xuICAgIGNvbnN0IGhzbCA9IC9oc2xcXCgoXFxkKyksXFxzKihbXFxkLl0rKSUsXFxzKihbXFxkLl0rKSVcXCkvZy5leGVjKGhzbFZhbHVlKSB8fCAvaHNsYVxcKChcXGQrKSxcXHMqKFtcXGQuXSspJSxcXHMqKFtcXGQuXSspJSxcXHMqKFtcXGQuXSspXFwpL2cuZXhlYyhoc2xWYWx1ZSk7XG4gICAgY29uc3QgaCA9IHBhcnNlSW50KGhzbFsxXSkgLyAzNjA7XG4gICAgY29uc3QgcyA9IHBhcnNlSW50KGhzbFsyXSkgLyAxMDA7XG4gICAgY29uc3QgbCA9IHBhcnNlSW50KGhzbFszXSkgLyAxMDA7XG4gICAgY29uc3QgYSA9IGhzbFs0XSB8fCAxO1xuICAgIGZ1bmN0aW9uIGh1ZTJyZ2IocCwgcSwgdCkge1xuICAgICAgaWYgKHQgPCAwKSB0ICs9IDE7XG4gICAgICBpZiAodCA+IDEpIHQgLT0gMTtcbiAgICAgIGlmICh0IDwgMS82KSByZXR1cm4gcCArIChxIC0gcCkgKiA2ICogdDtcbiAgICAgIGlmICh0IDwgMS8yKSByZXR1cm4gcTtcbiAgICAgIGlmICh0IDwgMi8zKSByZXR1cm4gcCArIChxIC0gcCkgKiAoMi8zIC0gdCkgKiA2O1xuICAgICAgcmV0dXJuIHA7XG4gICAgfVxuICAgIGxldCByLCBnLCBiO1xuICAgIGlmIChzID09IDApIHtcbiAgICAgIHIgPSBnID0gYiA9IGw7XG4gICAgfSBlbHNlIHtcbiAgICAgIGNvbnN0IHEgPSBsIDwgMC41ID8gbCAqICgxICsgcykgOiBsICsgcyAtIGwgKiBzO1xuICAgICAgY29uc3QgcCA9IDIgKiBsIC0gcTtcbiAgICAgIHIgPSBodWUycmdiKHAsIHEsIGggKyAxLzMpO1xuICAgICAgZyA9IGh1ZTJyZ2IocCwgcSwgaCk7XG4gICAgICBiID0gaHVlMnJnYihwLCBxLCBoIC0gMS8zKTtcbiAgICB9XG4gICAgcmV0dXJuIGByZ2JhKCR7ciAqIDI1NX0sJHtnICogMjU1fSwke2IgKiAyNTV9LCR7YX0pYDtcbiAgfVxuXG4gIGZ1bmN0aW9uIGNvbG9yVG9SZ2IodmFsKSB7XG4gICAgaWYgKGlzLnJnYih2YWwpKSByZXR1cm4gcmdiVG9SZ2JhKHZhbCk7XG4gICAgaWYgKGlzLmhleCh2YWwpKSByZXR1cm4gaGV4VG9SZ2JhKHZhbCk7XG4gICAgaWYgKGlzLmhzbCh2YWwpKSByZXR1cm4gaHNsVG9SZ2JhKHZhbCk7XG4gIH1cblxuICAvLyBVbml0c1xuXG4gIGZ1bmN0aW9uIGdldFVuaXQodmFsKSB7XG4gICAgY29uc3Qgc3BsaXQgPSAvKFtcXCtcXC1dP1swLTkjXFwuXSspKCV8cHh8cHR8ZW18cmVtfGlufGNtfG1tfGV4fGNofHBjfHZ3fHZofHZtaW58dm1heHxkZWd8cmFkfHR1cm4pPyQvLmV4ZWModmFsKTtcbiAgICBpZiAoc3BsaXQpIHJldHVybiBzcGxpdFsyXTtcbiAgfVxuXG4gIGZ1bmN0aW9uIGdldFRyYW5zZm9ybVVuaXQocHJvcE5hbWUpIHtcbiAgICBpZiAoc3RyaW5nQ29udGFpbnMocHJvcE5hbWUsICd0cmFuc2xhdGUnKSB8fCBwcm9wTmFtZSA9PT0gJ3BlcnNwZWN0aXZlJykgcmV0dXJuICdweCc7XG4gICAgaWYgKHN0cmluZ0NvbnRhaW5zKHByb3BOYW1lLCAncm90YXRlJykgfHwgc3RyaW5nQ29udGFpbnMocHJvcE5hbWUsICdza2V3JykpIHJldHVybiAnZGVnJztcbiAgfVxuXG4gIC8vIFZhbHVlc1xuXG4gIGZ1bmN0aW9uIG1pbk1heFZhbHVlKHZhbCwgbWluLCBtYXgpIHtcbiAgICByZXR1cm4gTWF0aC5taW4oTWF0aC5tYXgodmFsLCBtaW4pLCBtYXgpO1xuICB9XG5cbiAgZnVuY3Rpb24gZ2V0RnVuY3Rpb25WYWx1ZSh2YWwsIGFuaW1hdGFibGUpIHtcbiAgICBpZiAoIWlzLmZuYyh2YWwpKSByZXR1cm4gdmFsO1xuICAgIHJldHVybiB2YWwoYW5pbWF0YWJsZS50YXJnZXQsIGFuaW1hdGFibGUuaWQsIGFuaW1hdGFibGUudG90YWwpO1xuICB9XG5cbiAgZnVuY3Rpb24gZ2V0Q1NTVmFsdWUoZWwsIHByb3ApIHtcbiAgICBpZiAocHJvcCBpbiBlbC5zdHlsZSkge1xuICAgICAgcmV0dXJuIGdldENvbXB1dGVkU3R5bGUoZWwpLmdldFByb3BlcnR5VmFsdWUoc3RyaW5nVG9IeXBoZW5zKHByb3ApKSB8fCAnMCc7XG4gICAgfVxuICB9XG5cbiAgZnVuY3Rpb24gZ2V0QW5pbWF0aW9uVHlwZShlbCwgcHJvcCkge1xuICAgIGlmIChpcy5kb20oZWwpICYmIGFycmF5Q29udGFpbnModmFsaWRUcmFuc2Zvcm1zLCBwcm9wKSkgcmV0dXJuICd0cmFuc2Zvcm0nO1xuICAgIGlmIChpcy5kb20oZWwpICYmIChlbC5nZXRBdHRyaWJ1dGUocHJvcCkgfHwgKGlzLnN2ZyhlbCkgJiYgZWxbcHJvcF0pKSkgcmV0dXJuICdhdHRyaWJ1dGUnO1xuICAgIGlmIChpcy5kb20oZWwpICYmIChwcm9wICE9PSAndHJhbnNmb3JtJyAmJiBnZXRDU1NWYWx1ZShlbCwgcHJvcCkpKSByZXR1cm4gJ2Nzcyc7XG4gICAgaWYgKGVsW3Byb3BdICE9IG51bGwpIHJldHVybiAnb2JqZWN0JztcbiAgfVxuXG4gIGZ1bmN0aW9uIGdldFRyYW5zZm9ybVZhbHVlKGVsLCBwcm9wTmFtZSkge1xuICAgIGNvbnN0IGRlZmF1bHRVbml0ID0gZ2V0VHJhbnNmb3JtVW5pdChwcm9wTmFtZSk7XG4gICAgY29uc3QgZGVmYXVsdFZhbCA9IHN0cmluZ0NvbnRhaW5zKHByb3BOYW1lLCAnc2NhbGUnKSA/IDEgOiAwICsgZGVmYXVsdFVuaXQ7XG4gICAgY29uc3Qgc3RyID0gZWwuc3R5bGUudHJhbnNmb3JtO1xuICAgIGlmICghc3RyKSByZXR1cm4gZGVmYXVsdFZhbDtcbiAgICBsZXQgbWF0Y2ggPSBbXTtcbiAgICBsZXQgcHJvcHMgPSBbXTtcbiAgICBsZXQgdmFsdWVzID0gW107XG4gICAgY29uc3Qgcmd4ID0gLyhcXHcrKVxcKCguKz8pXFwpL2c7XG4gICAgd2hpbGUgKG1hdGNoID0gcmd4LmV4ZWMoc3RyKSkge1xuICAgICAgcHJvcHMucHVzaChtYXRjaFsxXSk7XG4gICAgICB2YWx1ZXMucHVzaChtYXRjaFsyXSk7XG4gICAgfVxuICAgIGNvbnN0IHZhbHVlID0gZmlsdGVyQXJyYXkodmFsdWVzLCAodmFsLCBpKSA9PiBwcm9wc1tpXSA9PT0gcHJvcE5hbWUpO1xuICAgIHJldHVybiB2YWx1ZS5sZW5ndGggPyB2YWx1ZVswXSA6IGRlZmF1bHRWYWw7XG4gIH1cblxuICBmdW5jdGlvbiBnZXRPcmlnaW5hbFRhcmdldFZhbHVlKHRhcmdldCwgcHJvcE5hbWUpIHtcbiAgICBzd2l0Y2ggKGdldEFuaW1hdGlvblR5cGUodGFyZ2V0LCBwcm9wTmFtZSkpIHtcbiAgICAgIGNhc2UgJ3RyYW5zZm9ybSc6IHJldHVybiBnZXRUcmFuc2Zvcm1WYWx1ZSh0YXJnZXQsIHByb3BOYW1lKTtcbiAgICAgIGNhc2UgJ2Nzcyc6IHJldHVybiBnZXRDU1NWYWx1ZSh0YXJnZXQsIHByb3BOYW1lKTtcbiAgICAgIGNhc2UgJ2F0dHJpYnV0ZSc6IHJldHVybiB0YXJnZXQuZ2V0QXR0cmlidXRlKHByb3BOYW1lKTtcbiAgICB9XG4gICAgcmV0dXJuIHRhcmdldFtwcm9wTmFtZV0gfHwgMDtcbiAgfVxuXG4gIGZ1bmN0aW9uIGdldFJlbGF0aXZlVmFsdWUodG8sIGZyb20pIHtcbiAgICBjb25zdCBvcGVyYXRvciA9IC9eKFxcKj18XFwrPXwtPSkvLmV4ZWModG8pO1xuICAgIGlmICghb3BlcmF0b3IpIHJldHVybiB0bztcbiAgICBjb25zdCB1ID0gZ2V0VW5pdCh0bykgfHwgMDtcbiAgICBjb25zdCB4ID0gcGFyc2VGbG9hdChmcm9tKTtcbiAgICBjb25zdCB5ID0gcGFyc2VGbG9hdCh0by5yZXBsYWNlKG9wZXJhdG9yWzBdLCAnJykpO1xuICAgIHN3aXRjaCAob3BlcmF0b3JbMF1bMF0pIHtcbiAgICAgIGNhc2UgJysnOiByZXR1cm4geCArIHkgKyB1O1xuICAgICAgY2FzZSAnLSc6IHJldHVybiB4IC0geSArIHU7XG4gICAgICBjYXNlICcqJzogcmV0dXJuIHggKiB5ICsgdTtcbiAgICB9XG4gIH1cblxuICBmdW5jdGlvbiB2YWxpZGF0ZVZhbHVlKHZhbCwgdW5pdCkge1xuICAgIGlmIChpcy5jb2wodmFsKSkgcmV0dXJuIGNvbG9yVG9SZ2IodmFsKTtcbiAgICBjb25zdCBvcmlnaW5hbFVuaXQgPSBnZXRVbml0KHZhbCk7XG4gICAgY29uc3QgdW5pdExlc3MgPSBvcmlnaW5hbFVuaXQgPyB2YWwuc3Vic3RyKDAsIHZhbC5sZW5ndGggLSBvcmlnaW5hbFVuaXQubGVuZ3RoKSA6IHZhbDtcbiAgICByZXR1cm4gdW5pdCAmJiAhL1xccy9nLnRlc3QodmFsKSA/IHVuaXRMZXNzICsgdW5pdCA6IHVuaXRMZXNzO1xuICB9XG5cbiAgLy8gZ2V0VG90YWxMZW5ndGgoKSBlcXVpdmFsZW50IGZvciBjaXJjbGUsIHJlY3QsIHBvbHlsaW5lLCBwb2x5Z29uIGFuZCBsaW5lIHNoYXBlcy4gXG4gIC8vIGFkYXB0ZWQgZnJvbSBodHRwczovL2dpc3QuZ2l0aHViLmNvbS9TZWJMYW1ibGEvM2UwNTUwYzQ5NmMyMzY3MDk3NDRcblxuICBmdW5jdGlvbiBnZXREaXN0YW5jZShwMSwgcDIpIHtcbiAgICByZXR1cm4gTWF0aC5zcXJ0KE1hdGgucG93KHAyLnggLSBwMS54LCAyKSArIE1hdGgucG93KHAyLnkgLSBwMS55LCAyKSk7IFxuICB9XG5cbiAgZnVuY3Rpb24gZ2V0Q2lyY2xlTGVuZ3RoKGVsKSB7XG4gICAgcmV0dXJuIDIgKiBNYXRoLlBJICogZWwuZ2V0QXR0cmlidXRlKCdyJyk7XG4gIH1cblxuICBmdW5jdGlvbiBnZXRSZWN0TGVuZ3RoKGVsKSB7XG4gICAgcmV0dXJuIChlbC5nZXRBdHRyaWJ1dGUoJ3dpZHRoJykgKiAyKSArIChlbC5nZXRBdHRyaWJ1dGUoJ2hlaWdodCcpICogMik7XG4gIH1cblxuICBmdW5jdGlvbiBnZXRMaW5lTGVuZ3RoKGVsKSB7XG4gICAgcmV0dXJuIGdldERpc3RhbmNlKFxuICAgICAge3g6IGVsLmdldEF0dHJpYnV0ZSgneDEnKSwgeTogZWwuZ2V0QXR0cmlidXRlKCd5MScpfSwgXG4gICAgICB7eDogZWwuZ2V0QXR0cmlidXRlKCd4MicpLCB5OiBlbC5nZXRBdHRyaWJ1dGUoJ3kyJyl9XG4gICAgKTtcbiAgfVxuXG4gIGZ1bmN0aW9uIGdldFBvbHlsaW5lTGVuZ3RoKGVsKSB7XG4gICAgY29uc3QgcG9pbnRzID0gZWwucG9pbnRzO1xuICAgIGxldCB0b3RhbExlbmd0aCA9IDA7XG4gICAgbGV0IHByZXZpb3VzUG9zO1xuICAgIGZvciAobGV0IGkgPSAwIDsgaSA8IHBvaW50cy5udW1iZXJPZkl0ZW1zOyBpKyspIHtcbiAgICAgIGNvbnN0IGN1cnJlbnRQb3MgPSBwb2ludHMuZ2V0SXRlbShpKTtcbiAgICAgIGlmIChpID4gMCkgdG90YWxMZW5ndGggKz0gZ2V0RGlzdGFuY2UocHJldmlvdXNQb3MsIGN1cnJlbnRQb3MpO1xuICAgICAgcHJldmlvdXNQb3MgPSBjdXJyZW50UG9zO1xuICAgIH1cbiAgICByZXR1cm4gdG90YWxMZW5ndGg7XG4gIH1cblxuICBmdW5jdGlvbiBnZXRQb2x5Z29uTGVuZ3RoKGVsKSB7XG4gICAgY29uc3QgcG9pbnRzID0gZWwucG9pbnRzO1xuICAgIHJldHVybiBnZXRQb2x5bGluZUxlbmd0aChlbCkgKyBnZXREaXN0YW5jZShwb2ludHMuZ2V0SXRlbShwb2ludHMubnVtYmVyT2ZJdGVtcyAtIDEpLCBwb2ludHMuZ2V0SXRlbSgwKSk7XG4gIH1cblxuICAvLyBQYXRoIGFuaW1hdGlvblxuXG4gIGZ1bmN0aW9uIGdldFRvdGFsTGVuZ3RoKGVsKSB7XG4gICAgaWYgKGVsLmdldFRvdGFsTGVuZ3RoKSByZXR1cm4gZWwuZ2V0VG90YWxMZW5ndGgoKTtcbiAgICBzd2l0Y2goZWwudGFnTmFtZS50b0xvd2VyQ2FzZSgpKSB7XG4gICAgICBjYXNlICdjaXJjbGUnOiByZXR1cm4gZ2V0Q2lyY2xlTGVuZ3RoKGVsKTtcbiAgICAgIGNhc2UgJ3JlY3QnOiByZXR1cm4gZ2V0UmVjdExlbmd0aChlbCk7XG4gICAgICBjYXNlICdsaW5lJzogcmV0dXJuIGdldExpbmVMZW5ndGgoZWwpO1xuICAgICAgY2FzZSAncG9seWxpbmUnOiByZXR1cm4gZ2V0UG9seWxpbmVMZW5ndGgoZWwpO1xuICAgICAgY2FzZSAncG9seWdvbic6IHJldHVybiBnZXRQb2x5Z29uTGVuZ3RoKGVsKTtcbiAgICB9XG4gIH1cblxuICBmdW5jdGlvbiBzZXREYXNob2Zmc2V0KGVsKSB7XG4gICAgY29uc3QgcGF0aExlbmd0aCA9IGdldFRvdGFsTGVuZ3RoKGVsKTtcbiAgICBlbC5zZXRBdHRyaWJ1dGUoJ3N0cm9rZS1kYXNoYXJyYXknLCBwYXRoTGVuZ3RoKTtcbiAgICByZXR1cm4gcGF0aExlbmd0aDtcbiAgfVxuXG4gIC8vIE1vdGlvbiBwYXRoXG5cbiAgZnVuY3Rpb24gZ2V0UGF0aChwYXRoLCBwZXJjZW50KSB7XG4gICAgY29uc3QgZWwgPSBpcy5zdHIocGF0aCkgPyBzZWxlY3RTdHJpbmcocGF0aClbMF0gOiBwYXRoO1xuICAgIGNvbnN0IHAgPSBwZXJjZW50IHx8IDEwMDtcbiAgICByZXR1cm4gZnVuY3Rpb24ocHJvcCkge1xuICAgICAgcmV0dXJuIHtcbiAgICAgICAgZWw6IGVsLFxuICAgICAgICBwcm9wZXJ0eTogcHJvcCxcbiAgICAgICAgdG90YWxMZW5ndGg6IGdldFRvdGFsTGVuZ3RoKGVsKSAqIChwIC8gMTAwKVxuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIGZ1bmN0aW9uIGdldFBhdGhQcm9ncmVzcyhwYXRoLCBwcm9ncmVzcykge1xuICAgIGZ1bmN0aW9uIHBvaW50KG9mZnNldCA9IDApIHtcbiAgICAgIGNvbnN0IGwgPSBwcm9ncmVzcyArIG9mZnNldCA+PSAxID8gcHJvZ3Jlc3MgKyBvZmZzZXQgOiAwO1xuICAgICAgcmV0dXJuIHBhdGguZWwuZ2V0UG9pbnRBdExlbmd0aChsKTtcbiAgICB9XG4gICAgY29uc3QgcCA9IHBvaW50KCk7XG4gICAgY29uc3QgcDAgPSBwb2ludCgtMSk7XG4gICAgY29uc3QgcDEgPSBwb2ludCgrMSk7XG4gICAgc3dpdGNoIChwYXRoLnByb3BlcnR5KSB7XG4gICAgICBjYXNlICd4JzogcmV0dXJuIHAueDtcbiAgICAgIGNhc2UgJ3knOiByZXR1cm4gcC55O1xuICAgICAgY2FzZSAnYW5nbGUnOiByZXR1cm4gTWF0aC5hdGFuMihwMS55IC0gcDAueSwgcDEueCAtIHAwLngpICogMTgwIC8gTWF0aC5QSTtcbiAgICB9XG4gIH1cblxuICAvLyBEZWNvbXBvc2UgdmFsdWVcblxuICBmdW5jdGlvbiBkZWNvbXBvc2VWYWx1ZSh2YWwsIHVuaXQpIHtcbiAgICBjb25zdCByZ3ggPSAvLT9cXGQqXFwuP1xcZCsvZztcbiAgICBjb25zdCB2YWx1ZSA9IHZhbGlkYXRlVmFsdWUoKGlzLnB0aCh2YWwpID8gdmFsLnRvdGFsTGVuZ3RoIDogdmFsKSwgdW5pdCkgKyAnJztcbiAgICByZXR1cm4ge1xuICAgICAgb3JpZ2luYWw6IHZhbHVlLFxuICAgICAgbnVtYmVyczogdmFsdWUubWF0Y2gocmd4KSA/IHZhbHVlLm1hdGNoKHJneCkubWFwKE51bWJlcikgOiBbMF0sXG4gICAgICBzdHJpbmdzOiAoaXMuc3RyKHZhbCkgfHwgdW5pdCkgPyB2YWx1ZS5zcGxpdChyZ3gpIDogW11cbiAgICB9XG4gIH1cblxuICAvLyBBbmltYXRhYmxlc1xuXG4gIGZ1bmN0aW9uIHBhcnNlVGFyZ2V0cyh0YXJnZXRzKSB7XG4gICAgY29uc3QgdGFyZ2V0c0FycmF5ID0gdGFyZ2V0cyA/IChmbGF0dGVuQXJyYXkoaXMuYXJyKHRhcmdldHMpID8gdGFyZ2V0cy5tYXAodG9BcnJheSkgOiB0b0FycmF5KHRhcmdldHMpKSkgOiBbXTtcbiAgICByZXR1cm4gZmlsdGVyQXJyYXkodGFyZ2V0c0FycmF5LCAoaXRlbSwgcG9zLCBzZWxmKSA9PiBzZWxmLmluZGV4T2YoaXRlbSkgPT09IHBvcyk7XG4gIH1cblxuICBmdW5jdGlvbiBnZXRBbmltYXRhYmxlcyh0YXJnZXRzKSB7XG4gICAgY29uc3QgcGFyc2VkID0gcGFyc2VUYXJnZXRzKHRhcmdldHMpO1xuICAgIHJldHVybiBwYXJzZWQubWFwKCh0LCBpKSA9PiB7XG4gICAgICByZXR1cm4ge3RhcmdldDogdCwgaWQ6IGksIHRvdGFsOiBwYXJzZWQubGVuZ3RofTtcbiAgICB9KTtcbiAgfVxuXG4gIC8vIFByb3BlcnRpZXNcblxuICBmdW5jdGlvbiBub3JtYWxpemVQcm9wZXJ0eVR3ZWVucyhwcm9wLCB0d2VlblNldHRpbmdzKSB7XG4gICAgbGV0IHNldHRpbmdzID0gY2xvbmVPYmplY3QodHdlZW5TZXR0aW5ncyk7XG4gICAgaWYgKGlzLmFycihwcm9wKSkge1xuICAgICAgY29uc3QgbCA9IHByb3AubGVuZ3RoO1xuICAgICAgY29uc3QgaXNGcm9tVG8gPSAobCA9PT0gMiAmJiAhaXMub2JqKHByb3BbMF0pKTtcbiAgICAgIGlmICghaXNGcm9tVG8pIHtcbiAgICAgICAgLy8gRHVyYXRpb24gZGl2aWRlZCBieSB0aGUgbnVtYmVyIG9mIHR3ZWVuc1xuICAgICAgICBpZiAoIWlzLmZuYyh0d2VlblNldHRpbmdzLmR1cmF0aW9uKSkgc2V0dGluZ3MuZHVyYXRpb24gPSB0d2VlblNldHRpbmdzLmR1cmF0aW9uIC8gbDtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIC8vIFRyYW5zZm9ybSBbZnJvbSwgdG9dIHZhbHVlcyBzaG9ydGhhbmQgdG8gYSB2YWxpZCB0d2VlbiB2YWx1ZVxuICAgICAgICBwcm9wID0ge3ZhbHVlOiBwcm9wfTtcbiAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIHRvQXJyYXkocHJvcCkubWFwKCh2LCBpKSA9PiB7XG4gICAgICAvLyBEZWZhdWx0IGRlbGF5IHZhbHVlIHNob3VsZCBiZSBhcHBsaWVkIG9ubHkgb24gdGhlIGZpcnN0IHR3ZWVuXG4gICAgICBjb25zdCBkZWxheSA9ICFpID8gdHdlZW5TZXR0aW5ncy5kZWxheSA6IDA7XG4gICAgICAvLyBVc2UgcGF0aCBvYmplY3QgYXMgYSB0d2VlbiB2YWx1ZVxuICAgICAgbGV0IG9iaiA9IGlzLm9iaih2KSAmJiAhaXMucHRoKHYpID8gdiA6IHt2YWx1ZTogdn07XG4gICAgICAvLyBTZXQgZGVmYXVsdCBkZWxheSB2YWx1ZVxuICAgICAgaWYgKGlzLnVuZChvYmouZGVsYXkpKSBvYmouZGVsYXkgPSBkZWxheTtcbiAgICAgIHJldHVybiBvYmo7XG4gICAgfSkubWFwKGsgPT4gbWVyZ2VPYmplY3RzKGssIHNldHRpbmdzKSk7XG4gIH1cblxuICBmdW5jdGlvbiBnZXRQcm9wZXJ0aWVzKGluc3RhbmNlU2V0dGluZ3MsIHR3ZWVuU2V0dGluZ3MsIHBhcmFtcykge1xuICAgIGxldCBwcm9wZXJ0aWVzID0gW107XG4gICAgY29uc3Qgc2V0dGluZ3MgPSBtZXJnZU9iamVjdHMoaW5zdGFuY2VTZXR0aW5ncywgdHdlZW5TZXR0aW5ncyk7XG4gICAgZm9yIChsZXQgcCBpbiBwYXJhbXMpIHtcbiAgICAgIGlmICghc2V0dGluZ3MuaGFzT3duUHJvcGVydHkocCkgJiYgcCAhPT0gJ3RhcmdldHMnKSB7XG4gICAgICAgIHByb3BlcnRpZXMucHVzaCh7XG4gICAgICAgICAgbmFtZTogcCxcbiAgICAgICAgICBvZmZzZXQ6IHNldHRpbmdzWydvZmZzZXQnXSxcbiAgICAgICAgICB0d2VlbnM6IG5vcm1hbGl6ZVByb3BlcnR5VHdlZW5zKHBhcmFtc1twXSwgdHdlZW5TZXR0aW5ncylcbiAgICAgICAgfSk7XG4gICAgICB9XG4gICAgfVxuICAgIHJldHVybiBwcm9wZXJ0aWVzO1xuICB9XG5cbiAgLy8gVHdlZW5zXG5cbiAgZnVuY3Rpb24gbm9ybWFsaXplVHdlZW5WYWx1ZXModHdlZW4sIGFuaW1hdGFibGUpIHtcbiAgICBsZXQgdCA9IHt9O1xuICAgIGZvciAobGV0IHAgaW4gdHdlZW4pIHtcbiAgICAgIGxldCB2YWx1ZSA9IGdldEZ1bmN0aW9uVmFsdWUodHdlZW5bcF0sIGFuaW1hdGFibGUpO1xuICAgICAgaWYgKGlzLmFycih2YWx1ZSkpIHtcbiAgICAgICAgdmFsdWUgPSB2YWx1ZS5tYXAodiA9PiBnZXRGdW5jdGlvblZhbHVlKHYsIGFuaW1hdGFibGUpKTtcbiAgICAgICAgaWYgKHZhbHVlLmxlbmd0aCA9PT0gMSkgdmFsdWUgPSB2YWx1ZVswXTtcbiAgICAgIH1cbiAgICAgIHRbcF0gPSB2YWx1ZTtcbiAgICB9XG4gICAgdC5kdXJhdGlvbiA9IHBhcnNlRmxvYXQodC5kdXJhdGlvbik7XG4gICAgdC5kZWxheSA9IHBhcnNlRmxvYXQodC5kZWxheSk7XG4gICAgcmV0dXJuIHQ7XG4gIH1cblxuICBmdW5jdGlvbiBub3JtYWxpemVFYXNpbmcodmFsKSB7XG4gICAgcmV0dXJuIGlzLmFycih2YWwpID8gYmV6aWVyLmFwcGx5KHRoaXMsIHZhbCkgOiBlYXNpbmdzW3ZhbF07XG4gIH1cblxuICBmdW5jdGlvbiBub3JtYWxpemVUd2VlbnMocHJvcCwgYW5pbWF0YWJsZSkge1xuICAgIGxldCBwcmV2aW91c1R3ZWVuO1xuICAgIHJldHVybiBwcm9wLnR3ZWVucy5tYXAodCA9PiB7XG4gICAgICBsZXQgdHdlZW4gPSBub3JtYWxpemVUd2VlblZhbHVlcyh0LCBhbmltYXRhYmxlKTtcbiAgICAgIGNvbnN0IHR3ZWVuVmFsdWUgPSB0d2Vlbi52YWx1ZTtcbiAgICAgIGNvbnN0IG9yaWdpbmFsVmFsdWUgPSBnZXRPcmlnaW5hbFRhcmdldFZhbHVlKGFuaW1hdGFibGUudGFyZ2V0LCBwcm9wLm5hbWUpO1xuICAgICAgY29uc3QgcHJldmlvdXNWYWx1ZSA9IHByZXZpb3VzVHdlZW4gPyBwcmV2aW91c1R3ZWVuLnRvLm9yaWdpbmFsIDogb3JpZ2luYWxWYWx1ZTtcbiAgICAgIGNvbnN0IGZyb20gPSBpcy5hcnIodHdlZW5WYWx1ZSkgPyB0d2VlblZhbHVlWzBdIDogcHJldmlvdXNWYWx1ZTtcbiAgICAgIGNvbnN0IHRvID0gZ2V0UmVsYXRpdmVWYWx1ZShpcy5hcnIodHdlZW5WYWx1ZSkgPyB0d2VlblZhbHVlWzFdIDogdHdlZW5WYWx1ZSwgZnJvbSk7XG4gICAgICBjb25zdCB1bml0ID0gZ2V0VW5pdCh0bykgfHwgZ2V0VW5pdChmcm9tKSB8fCBnZXRVbml0KG9yaWdpbmFsVmFsdWUpO1xuICAgICAgdHdlZW4uZnJvbSA9IGRlY29tcG9zZVZhbHVlKGZyb20sIHVuaXQpO1xuICAgICAgdHdlZW4udG8gPSBkZWNvbXBvc2VWYWx1ZSh0bywgdW5pdCk7XG4gICAgICB0d2Vlbi5zdGFydCA9IHByZXZpb3VzVHdlZW4gPyBwcmV2aW91c1R3ZWVuLmVuZCA6IHByb3Aub2Zmc2V0O1xuICAgICAgdHdlZW4uZW5kID0gdHdlZW4uc3RhcnQgKyB0d2Vlbi5kZWxheSArIHR3ZWVuLmR1cmF0aW9uO1xuICAgICAgdHdlZW4uZWFzaW5nID0gbm9ybWFsaXplRWFzaW5nKHR3ZWVuLmVhc2luZyk7XG4gICAgICB0d2Vlbi5lbGFzdGljaXR5ID0gKDEwMDAgLSBtaW5NYXhWYWx1ZSh0d2Vlbi5lbGFzdGljaXR5LCAxLCA5OTkpKSAvIDEwMDA7XG4gICAgICB0d2Vlbi5pc1BhdGggPSBpcy5wdGgodHdlZW5WYWx1ZSk7XG4gICAgICB0d2Vlbi5pc0NvbG9yID0gaXMuY29sKHR3ZWVuLmZyb20ub3JpZ2luYWwpO1xuICAgICAgaWYgKHR3ZWVuLmlzQ29sb3IpIHR3ZWVuLnJvdW5kID0gMTtcbiAgICAgIHByZXZpb3VzVHdlZW4gPSB0d2VlbjtcbiAgICAgIHJldHVybiB0d2VlbjtcbiAgICB9KTtcbiAgfVxuXG4gIC8vIFR3ZWVuIHByb2dyZXNzXG5cbiAgY29uc3Qgc2V0VHdlZW5Qcm9ncmVzcyA9IHtcbiAgICBjc3M6ICh0LCBwLCB2KSA9PiB0LnN0eWxlW3BdID0gdixcbiAgICBhdHRyaWJ1dGU6ICh0LCBwLCB2KSA9PiB0LnNldEF0dHJpYnV0ZShwLCB2KSxcbiAgICBvYmplY3Q6ICh0LCBwLCB2KSA9PiB0W3BdID0gdixcbiAgICB0cmFuc2Zvcm06ICh0LCBwLCB2LCB0cmFuc2Zvcm1zLCBpZCkgPT4ge1xuICAgICAgaWYgKCF0cmFuc2Zvcm1zW2lkXSkgdHJhbnNmb3Jtc1tpZF0gPSBbXTtcbiAgICAgIHRyYW5zZm9ybXNbaWRdLnB1c2goYCR7cH0oJHt2fSlgKTtcbiAgICB9XG4gIH1cblxuICAvLyBBbmltYXRpb25zXG5cbiAgZnVuY3Rpb24gY3JlYXRlQW5pbWF0aW9uKGFuaW1hdGFibGUsIHByb3ApIHtcbiAgICBjb25zdCBhbmltVHlwZSA9IGdldEFuaW1hdGlvblR5cGUoYW5pbWF0YWJsZS50YXJnZXQsIHByb3AubmFtZSk7XG4gICAgaWYgKGFuaW1UeXBlKSB7XG4gICAgICBjb25zdCB0d2VlbnMgPSBub3JtYWxpemVUd2VlbnMocHJvcCwgYW5pbWF0YWJsZSk7XG4gICAgICByZXR1cm4ge1xuICAgICAgICB0eXBlOiBhbmltVHlwZSxcbiAgICAgICAgcHJvcGVydHk6IHByb3AubmFtZSxcbiAgICAgICAgYW5pbWF0YWJsZTogYW5pbWF0YWJsZSxcbiAgICAgICAgdHdlZW5zOiB0d2VlbnMsXG4gICAgICAgIGR1cmF0aW9uOiB0d2VlbnNbdHdlZW5zLmxlbmd0aCAtIDFdLmVuZCxcbiAgICAgICAgZGVsYXk6IHR3ZWVuc1swXS5kZWxheVxuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIGZ1bmN0aW9uIGdldEFuaW1hdGlvbnMoYW5pbWF0YWJsZXMsIHByb3BlcnRpZXMpIHtcbiAgICByZXR1cm4gZmlsdGVyQXJyYXkoZmxhdHRlbkFycmF5KGFuaW1hdGFibGVzLm1hcChhbmltYXRhYmxlID0+IHtcbiAgICAgIHJldHVybiBwcm9wZXJ0aWVzLm1hcChwcm9wID0+IHtcbiAgICAgICAgcmV0dXJuIGNyZWF0ZUFuaW1hdGlvbihhbmltYXRhYmxlLCBwcm9wKTtcbiAgICAgIH0pO1xuICAgIH0pKSwgYSA9PiAhaXMudW5kKGEpKTtcbiAgfVxuXG4gIC8vIENyZWF0ZSBJbnN0YW5jZVxuXG4gIGZ1bmN0aW9uIGdldEluc3RhbmNlVGltaW5ncyh0eXBlLCBhbmltYXRpb25zLCBpbnN0YW5jZVNldHRpbmdzLCB0d2VlblNldHRpbmdzKSB7XG4gICAgY29uc3QgaXNEZWxheSA9ICh0eXBlID09PSAnZGVsYXknKTtcbiAgICBpZiAoYW5pbWF0aW9ucy5sZW5ndGgpIHtcbiAgICAgIHJldHVybiAoaXNEZWxheSA/IE1hdGgubWluIDogTWF0aC5tYXgpLmFwcGx5KE1hdGgsIGFuaW1hdGlvbnMubWFwKGFuaW0gPT4gYW5pbVt0eXBlXSkpO1xuICAgIH0gZWxzZSB7XG4gICAgICByZXR1cm4gaXNEZWxheSA/IHR3ZWVuU2V0dGluZ3MuZGVsYXkgOiBpbnN0YW5jZVNldHRpbmdzLm9mZnNldCArIHR3ZWVuU2V0dGluZ3MuZGVsYXkgKyB0d2VlblNldHRpbmdzLmR1cmF0aW9uO1xuICAgIH1cbiAgfVxuXG4gIGZ1bmN0aW9uIGNyZWF0ZU5ld0luc3RhbmNlKHBhcmFtcykge1xuICAgIGNvbnN0IGluc3RhbmNlU2V0dGluZ3MgPSByZXBsYWNlT2JqZWN0UHJvcHMoZGVmYXVsdEluc3RhbmNlU2V0dGluZ3MsIHBhcmFtcyk7XG4gICAgY29uc3QgdHdlZW5TZXR0aW5ncyA9IHJlcGxhY2VPYmplY3RQcm9wcyhkZWZhdWx0VHdlZW5TZXR0aW5ncywgcGFyYW1zKTtcbiAgICBjb25zdCBhbmltYXRhYmxlcyA9IGdldEFuaW1hdGFibGVzKHBhcmFtcy50YXJnZXRzKTtcbiAgICBjb25zdCBwcm9wZXJ0aWVzID0gZ2V0UHJvcGVydGllcyhpbnN0YW5jZVNldHRpbmdzLCB0d2VlblNldHRpbmdzLCBwYXJhbXMpO1xuICAgIGNvbnN0IGFuaW1hdGlvbnMgPSBnZXRBbmltYXRpb25zKGFuaW1hdGFibGVzLCBwcm9wZXJ0aWVzKTtcbiAgICByZXR1cm4gbWVyZ2VPYmplY3RzKGluc3RhbmNlU2V0dGluZ3MsIHtcbiAgICAgIGNoaWxkcmVuOiBbXSxcbiAgICAgIGFuaW1hdGFibGVzOiBhbmltYXRhYmxlcyxcbiAgICAgIGFuaW1hdGlvbnM6IGFuaW1hdGlvbnMsXG4gICAgICBkdXJhdGlvbjogZ2V0SW5zdGFuY2VUaW1pbmdzKCdkdXJhdGlvbicsIGFuaW1hdGlvbnMsIGluc3RhbmNlU2V0dGluZ3MsIHR3ZWVuU2V0dGluZ3MpLFxuICAgICAgZGVsYXk6IGdldEluc3RhbmNlVGltaW5ncygnZGVsYXknLCBhbmltYXRpb25zLCBpbnN0YW5jZVNldHRpbmdzLCB0d2VlblNldHRpbmdzKVxuICAgIH0pO1xuICB9XG5cbiAgLy8gQ29yZVxuXG4gIGxldCBhY3RpdmVJbnN0YW5jZXMgPSBbXTtcbiAgbGV0IHJhZiA9IDA7XG5cbiAgY29uc3QgZW5naW5lID0gKCgpID0+IHtcbiAgICBmdW5jdGlvbiBwbGF5KCkgeyByYWYgPSByZXF1ZXN0QW5pbWF0aW9uRnJhbWUoc3RlcCk7IH07XG4gICAgZnVuY3Rpb24gc3RlcCh0KSB7XG4gICAgICBjb25zdCBhY3RpdmVMZW5ndGggPSBhY3RpdmVJbnN0YW5jZXMubGVuZ3RoO1xuICAgICAgaWYgKGFjdGl2ZUxlbmd0aCkge1xuICAgICAgICBsZXQgaSA9IDA7XG4gICAgICAgIHdoaWxlIChpIDwgYWN0aXZlTGVuZ3RoKSB7XG4gICAgICAgICAgaWYgKGFjdGl2ZUluc3RhbmNlc1tpXSkgYWN0aXZlSW5zdGFuY2VzW2ldLnRpY2sodCk7XG4gICAgICAgICAgaSsrO1xuICAgICAgICB9XG4gICAgICAgIHBsYXkoKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGNhbmNlbEFuaW1hdGlvbkZyYW1lKHJhZik7XG4gICAgICAgIHJhZiA9IDA7XG4gICAgICB9XG4gICAgfVxuICAgIHJldHVybiBwbGF5O1xuICB9KSgpO1xuXG5cbiAgLy8gUHVibGljIEluc3RhbmNlXG5cbiAgZnVuY3Rpb24gYW5pbWUocGFyYW1zID0ge30pIHtcblxuICAgIGxldCBub3csIHN0YXJ0VGltZSwgbGFzdFRpbWUgPSAwO1xuXG4gICAgbGV0IHJlc29sdmUgPSBudWxsO1xuXG4gICAgZnVuY3Rpb24gbWFrZVByb21pc2UoKSB7XG4gICAgICByZXR1cm4gd2luZG93LlByb21pc2UgJiYgbmV3IFByb21pc2UoX3Jlc29sdmUgPT4gcmVzb2x2ZSA9IF9yZXNvbHZlKTtcbiAgICB9XG5cbiAgICBsZXQgcHJvbWlzZSA9IG1ha2VQcm9taXNlKCk7XG5cbiAgICBsZXQgaW5zdGFuY2UgPSBjcmVhdGVOZXdJbnN0YW5jZShwYXJhbXMpO1xuXG4gICAgZnVuY3Rpb24gdG9nZ2xlSW5zdGFuY2VEaXJlY3Rpb24oKSB7XG4gICAgICBpbnN0YW5jZS5yZXZlcnNlZCA9ICFpbnN0YW5jZS5yZXZlcnNlZDtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBhZGp1c3RUaW1lKHRpbWUpIHtcbiAgICAgIHJldHVybiBpbnN0YW5jZS5yZXZlcnNlZCA/IGluc3RhbmNlLmR1cmF0aW9uIC0gdGltZSA6IHRpbWU7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gc3luY0luc3RhbmNlQ2hpbGRyZW4odGltZSkge1xuICAgICAgY29uc3QgY2hpbGRyZW4gPSBpbnN0YW5jZS5jaGlsZHJlbjtcbiAgICAgIGNvbnN0IGNoaWxkcmVuTGVuZ3RoID0gY2hpbGRyZW4ubGVuZ3RoO1xuICAgICAgaWYgKHRpbWUgPj0gaW5zdGFuY2UuY3VycmVudFRpbWUpIHtcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBjaGlsZHJlbkxlbmd0aDsgaSsrKSBjaGlsZHJlbltpXS5zZWVrKHRpbWUpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgZm9yIChsZXQgaSA9IGNoaWxkcmVuTGVuZ3RoOyBpLS07KSBjaGlsZHJlbltpXS5zZWVrKHRpbWUpO1xuICAgICAgfVxuICAgIH1cblxuICAgIGZ1bmN0aW9uIHNldEFuaW1hdGlvbnNQcm9ncmVzcyhpbnNUaW1lKSB7XG4gICAgICBsZXQgaSA9IDA7XG4gICAgICBsZXQgdHJhbnNmb3JtcyA9IHt9O1xuICAgICAgY29uc3QgYW5pbWF0aW9ucyA9IGluc3RhbmNlLmFuaW1hdGlvbnM7XG4gICAgICBjb25zdCBhbmltYXRpb25zTGVuZ3RoID0gYW5pbWF0aW9ucy5sZW5ndGg7XG4gICAgICB3aGlsZSAoaSA8IGFuaW1hdGlvbnNMZW5ndGgpIHtcbiAgICAgICAgY29uc3QgYW5pbSA9IGFuaW1hdGlvbnNbaV07XG4gICAgICAgIGNvbnN0IGFuaW1hdGFibGUgPSBhbmltLmFuaW1hdGFibGU7XG4gICAgICAgIGNvbnN0IHR3ZWVucyA9IGFuaW0udHdlZW5zO1xuICAgICAgICBjb25zdCB0d2Vlbkxlbmd0aCA9IHR3ZWVucy5sZW5ndGggLSAxO1xuICAgICAgICBsZXQgdHdlZW4gPSB0d2VlbnNbdHdlZW5MZW5ndGhdO1xuICAgICAgICAvLyBPbmx5IGNoZWNrIGZvciBrZXlmcmFtZXMgaWYgdGhlcmUgaXMgbW9yZSB0aGFuIG9uZSB0d2VlblxuICAgICAgICBpZiAodHdlZW5MZW5ndGgpIHR3ZWVuID0gZmlsdGVyQXJyYXkodHdlZW5zLCB0ID0+IChpbnNUaW1lIDwgdC5lbmQpKVswXSB8fCB0d2VlbjtcbiAgICAgICAgY29uc3QgZWxhcHNlZCA9IG1pbk1heFZhbHVlKGluc1RpbWUgLSB0d2Vlbi5zdGFydCAtIHR3ZWVuLmRlbGF5LCAwLCB0d2Vlbi5kdXJhdGlvbikgLyB0d2Vlbi5kdXJhdGlvbjtcbiAgICAgICAgY29uc3QgZWFzZWQgPSBpc05hTihlbGFwc2VkKSA/IDEgOiB0d2Vlbi5lYXNpbmcoZWxhcHNlZCwgdHdlZW4uZWxhc3RpY2l0eSk7XG4gICAgICAgIGNvbnN0IHN0cmluZ3MgPSB0d2Vlbi50by5zdHJpbmdzO1xuICAgICAgICBjb25zdCByb3VuZCA9IHR3ZWVuLnJvdW5kO1xuICAgICAgICBsZXQgbnVtYmVycyA9IFtdO1xuICAgICAgICBsZXQgcHJvZ3Jlc3M7XG4gICAgICAgIGNvbnN0IHRvTnVtYmVyc0xlbmd0aCA9IHR3ZWVuLnRvLm51bWJlcnMubGVuZ3RoO1xuICAgICAgICBmb3IgKGxldCBuID0gMDsgbiA8IHRvTnVtYmVyc0xlbmd0aDsgbisrKSB7XG4gICAgICAgICAgbGV0IHZhbHVlO1xuICAgICAgICAgIGNvbnN0IHRvTnVtYmVyID0gdHdlZW4udG8ubnVtYmVyc1tuXTtcbiAgICAgICAgICBjb25zdCBmcm9tTnVtYmVyID0gdHdlZW4uZnJvbS5udW1iZXJzW25dO1xuICAgICAgICAgIGlmICghdHdlZW4uaXNQYXRoKSB7XG4gICAgICAgICAgICB2YWx1ZSA9IGZyb21OdW1iZXIgKyAoZWFzZWQgKiAodG9OdW1iZXIgLSBmcm9tTnVtYmVyKSk7XG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHZhbHVlID0gZ2V0UGF0aFByb2dyZXNzKHR3ZWVuLnZhbHVlLCBlYXNlZCAqIHRvTnVtYmVyKTtcbiAgICAgICAgICB9XG4gICAgICAgICAgaWYgKHJvdW5kKSB7XG4gICAgICAgICAgICBpZiAoISh0d2Vlbi5pc0NvbG9yICYmIG4gPiAyKSkge1xuICAgICAgICAgICAgICB2YWx1ZSA9IE1hdGgucm91bmQodmFsdWUgKiByb3VuZCkgLyByb3VuZDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG4gICAgICAgICAgbnVtYmVycy5wdXNoKHZhbHVlKTtcbiAgICAgICAgfVxuICAgICAgICAvLyBNYW51YWwgQXJyYXkucmVkdWNlIGZvciBiZXR0ZXIgcGVyZm9ybWFuY2VzXG4gICAgICAgIGNvbnN0IHN0cmluZ3NMZW5ndGggPSBzdHJpbmdzLmxlbmd0aDtcbiAgICAgICAgaWYgKCFzdHJpbmdzTGVuZ3RoKSB7XG4gICAgICAgICAgcHJvZ3Jlc3MgPSBudW1iZXJzWzBdO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHByb2dyZXNzID0gc3RyaW5nc1swXTtcbiAgICAgICAgICBmb3IgKGxldCBzID0gMDsgcyA8IHN0cmluZ3NMZW5ndGg7IHMrKykge1xuICAgICAgICAgICAgY29uc3QgYSA9IHN0cmluZ3Nbc107XG4gICAgICAgICAgICBjb25zdCBiID0gc3RyaW5nc1tzICsgMV07XG4gICAgICAgICAgICBjb25zdCBuID0gbnVtYmVyc1tzXTtcbiAgICAgICAgICAgIGlmICghaXNOYU4obikpIHtcbiAgICAgICAgICAgICAgaWYgKCFiKSB7XG4gICAgICAgICAgICAgICAgcHJvZ3Jlc3MgKz0gbiArICcgJztcbiAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICBwcm9ncmVzcyArPSBuICsgYjtcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBzZXRUd2VlblByb2dyZXNzW2FuaW0udHlwZV0oYW5pbWF0YWJsZS50YXJnZXQsIGFuaW0ucHJvcGVydHksIHByb2dyZXNzLCB0cmFuc2Zvcm1zLCBhbmltYXRhYmxlLmlkKTtcbiAgICAgICAgYW5pbS5jdXJyZW50VmFsdWUgPSBwcm9ncmVzcztcbiAgICAgICAgaSsrO1xuICAgICAgfVxuICAgICAgY29uc3QgdHJhbnNmb3Jtc0xlbmd0aCA9IE9iamVjdC5rZXlzKHRyYW5zZm9ybXMpLmxlbmd0aDtcbiAgICAgIGlmICh0cmFuc2Zvcm1zTGVuZ3RoKSB7XG4gICAgICAgIGZvciAobGV0IGlkID0gMDsgaWQgPCB0cmFuc2Zvcm1zTGVuZ3RoOyBpZCsrKSB7XG4gICAgICAgICAgaWYgKCF0cmFuc2Zvcm1TdHJpbmcpIHtcbiAgICAgICAgICAgIGNvbnN0IHQgPSAndHJhbnNmb3JtJztcbiAgICAgICAgICAgIHRyYW5zZm9ybVN0cmluZyA9IChnZXRDU1NWYWx1ZShkb2N1bWVudC5ib2R5LCB0KSA/IHQgOiBgLXdlYmtpdC0ke3R9YCk7XG4gICAgICAgICAgfVxuICAgICAgICAgIGluc3RhbmNlLmFuaW1hdGFibGVzW2lkXS50YXJnZXQuc3R5bGVbdHJhbnNmb3JtU3RyaW5nXSA9IHRyYW5zZm9ybXNbaWRdLmpvaW4oJyAnKTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgaW5zdGFuY2UuY3VycmVudFRpbWUgPSBpbnNUaW1lO1xuICAgICAgaW5zdGFuY2UucHJvZ3Jlc3MgPSAoaW5zVGltZSAvIGluc3RhbmNlLmR1cmF0aW9uKSAqIDEwMDtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBzZXRDYWxsYmFjayhjYikge1xuICAgICAgaWYgKGluc3RhbmNlW2NiXSkgaW5zdGFuY2VbY2JdKGluc3RhbmNlKTtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBjb3VudEl0ZXJhdGlvbigpIHtcbiAgICAgIGlmIChpbnN0YW5jZS5yZW1haW5pbmcgJiYgaW5zdGFuY2UucmVtYWluaW5nICE9PSB0cnVlKSB7XG4gICAgICAgIGluc3RhbmNlLnJlbWFpbmluZy0tO1xuICAgICAgfVxuICAgIH1cblxuICAgIGZ1bmN0aW9uIHNldEluc3RhbmNlUHJvZ3Jlc3MoZW5naW5lVGltZSkge1xuICAgICAgY29uc3QgaW5zRHVyYXRpb24gPSBpbnN0YW5jZS5kdXJhdGlvbjtcbiAgICAgIGNvbnN0IGluc09mZnNldCA9IGluc3RhbmNlLm9mZnNldDtcbiAgICAgIGNvbnN0IGluc1N0YXJ0ID0gaW5zT2Zmc2V0ICsgaW5zdGFuY2UuZGVsYXk7XG4gICAgICBjb25zdCBpbnNDdXJyZW50VGltZSA9IGluc3RhbmNlLmN1cnJlbnRUaW1lO1xuICAgICAgY29uc3QgaW5zUmV2ZXJzZWQgPSBpbnN0YW5jZS5yZXZlcnNlZDtcbiAgICAgIGNvbnN0IGluc1RpbWUgPSBhZGp1c3RUaW1lKGVuZ2luZVRpbWUpO1xuICAgICAgaWYgKGluc3RhbmNlLmNoaWxkcmVuLmxlbmd0aCkgc3luY0luc3RhbmNlQ2hpbGRyZW4oaW5zVGltZSk7XG4gICAgICBpZiAoaW5zVGltZSA+PSBpbnNTdGFydCB8fCAhaW5zRHVyYXRpb24pIHtcbiAgICAgICAgaWYgKCFpbnN0YW5jZS5iZWdhbikge1xuICAgICAgICAgIGluc3RhbmNlLmJlZ2FuID0gdHJ1ZTtcbiAgICAgICAgICBzZXRDYWxsYmFjaygnYmVnaW4nKTtcbiAgICAgICAgfVxuICAgICAgICBzZXRDYWxsYmFjaygncnVuJyk7XG4gICAgICB9XG4gICAgICBpZiAoaW5zVGltZSA+IGluc09mZnNldCAmJiBpbnNUaW1lIDwgaW5zRHVyYXRpb24pIHtcbiAgICAgICAgc2V0QW5pbWF0aW9uc1Byb2dyZXNzKGluc1RpbWUpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgaWYgKGluc1RpbWUgPD0gaW5zT2Zmc2V0ICYmIGluc0N1cnJlbnRUaW1lICE9PSAwKSB7XG4gICAgICAgICAgc2V0QW5pbWF0aW9uc1Byb2dyZXNzKDApO1xuICAgICAgICAgIGlmIChpbnNSZXZlcnNlZCkgY291bnRJdGVyYXRpb24oKTtcbiAgICAgICAgfVxuICAgICAgICBpZiAoKGluc1RpbWUgPj0gaW5zRHVyYXRpb24gJiYgaW5zQ3VycmVudFRpbWUgIT09IGluc0R1cmF0aW9uKSB8fCAhaW5zRHVyYXRpb24pIHtcbiAgICAgICAgICBzZXRBbmltYXRpb25zUHJvZ3Jlc3MoaW5zRHVyYXRpb24pO1xuICAgICAgICAgIGlmICghaW5zUmV2ZXJzZWQpIGNvdW50SXRlcmF0aW9uKCk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIHNldENhbGxiYWNrKCd1cGRhdGUnKTtcbiAgICAgIGlmIChlbmdpbmVUaW1lID49IGluc0R1cmF0aW9uKSB7XG4gICAgICAgIGlmIChpbnN0YW5jZS5yZW1haW5pbmcpIHtcbiAgICAgICAgICBzdGFydFRpbWUgPSBub3c7XG4gICAgICAgICAgaWYgKGluc3RhbmNlLmRpcmVjdGlvbiA9PT0gJ2FsdGVybmF0ZScpIHRvZ2dsZUluc3RhbmNlRGlyZWN0aW9uKCk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgaW5zdGFuY2UucGF1c2UoKTtcbiAgICAgICAgICBpZiAoIWluc3RhbmNlLmNvbXBsZXRlZCkge1xuICAgICAgICAgICAgaW5zdGFuY2UuY29tcGxldGVkID0gdHJ1ZTtcbiAgICAgICAgICAgIHNldENhbGxiYWNrKCdjb21wbGV0ZScpO1xuICAgICAgICAgICAgaWYgKCdQcm9taXNlJyBpbiB3aW5kb3cpIHtcbiAgICAgICAgICAgICAgcmVzb2x2ZSgpO1xuICAgICAgICAgICAgICBwcm9taXNlID0gbWFrZVByb21pc2UoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgbGFzdFRpbWUgPSAwO1xuICAgICAgfVxuICAgIH1cblxuICAgIGluc3RhbmNlLnJlc2V0ID0gZnVuY3Rpb24oKSB7XG4gICAgICBjb25zdCBkaXJlY3Rpb24gPSBpbnN0YW5jZS5kaXJlY3Rpb247XG4gICAgICBjb25zdCBsb29wcyA9IGluc3RhbmNlLmxvb3A7XG4gICAgICBpbnN0YW5jZS5jdXJyZW50VGltZSA9IDA7XG4gICAgICBpbnN0YW5jZS5wcm9ncmVzcyA9IDA7XG4gICAgICBpbnN0YW5jZS5wYXVzZWQgPSB0cnVlO1xuICAgICAgaW5zdGFuY2UuYmVnYW4gPSBmYWxzZTtcbiAgICAgIGluc3RhbmNlLmNvbXBsZXRlZCA9IGZhbHNlO1xuICAgICAgaW5zdGFuY2UucmV2ZXJzZWQgPSBkaXJlY3Rpb24gPT09ICdyZXZlcnNlJztcbiAgICAgIGluc3RhbmNlLnJlbWFpbmluZyA9IGRpcmVjdGlvbiA9PT0gJ2FsdGVybmF0ZScgJiYgbG9vcHMgPT09IDEgPyAyIDogbG9vcHM7XG4gICAgICBzZXRBbmltYXRpb25zUHJvZ3Jlc3MoMCk7XG4gICAgICBmb3IgKGxldCBpID0gaW5zdGFuY2UuY2hpbGRyZW4ubGVuZ3RoOyBpLS07ICl7XG4gICAgICAgIGluc3RhbmNlLmNoaWxkcmVuW2ldLnJlc2V0KCk7XG4gICAgICB9XG4gICAgfVxuXG4gICAgaW5zdGFuY2UudGljayA9IGZ1bmN0aW9uKHQpIHtcbiAgICAgIG5vdyA9IHQ7XG4gICAgICBpZiAoIXN0YXJ0VGltZSkgc3RhcnRUaW1lID0gbm93O1xuICAgICAgY29uc3QgZW5naW5lVGltZSA9IChsYXN0VGltZSArIG5vdyAtIHN0YXJ0VGltZSkgKiBhbmltZS5zcGVlZDtcbiAgICAgIHNldEluc3RhbmNlUHJvZ3Jlc3MoZW5naW5lVGltZSk7XG4gICAgfVxuXG4gICAgaW5zdGFuY2Uuc2VlayA9IGZ1bmN0aW9uKHRpbWUpIHtcbiAgICAgIHNldEluc3RhbmNlUHJvZ3Jlc3MoYWRqdXN0VGltZSh0aW1lKSk7XG4gICAgfVxuXG4gICAgaW5zdGFuY2UucGF1c2UgPSBmdW5jdGlvbigpIHtcbiAgICAgIGNvbnN0IGkgPSBhY3RpdmVJbnN0YW5jZXMuaW5kZXhPZihpbnN0YW5jZSk7XG4gICAgICBpZiAoaSA+IC0xKSBhY3RpdmVJbnN0YW5jZXMuc3BsaWNlKGksIDEpO1xuICAgICAgaW5zdGFuY2UucGF1c2VkID0gdHJ1ZTtcbiAgICB9XG5cbiAgICBpbnN0YW5jZS5wbGF5ID0gZnVuY3Rpb24oKSB7XG4gICAgICBpZiAoIWluc3RhbmNlLnBhdXNlZCkgcmV0dXJuO1xuICAgICAgaW5zdGFuY2UucGF1c2VkID0gZmFsc2U7XG4gICAgICBzdGFydFRpbWUgPSAwO1xuICAgICAgbGFzdFRpbWUgPSBhZGp1c3RUaW1lKGluc3RhbmNlLmN1cnJlbnRUaW1lKTtcbiAgICAgIGFjdGl2ZUluc3RhbmNlcy5wdXNoKGluc3RhbmNlKTtcbiAgICAgIGlmICghcmFmKSBlbmdpbmUoKTtcbiAgICB9XG5cbiAgICBpbnN0YW5jZS5yZXZlcnNlID0gZnVuY3Rpb24oKSB7XG4gICAgICB0b2dnbGVJbnN0YW5jZURpcmVjdGlvbigpO1xuICAgICAgc3RhcnRUaW1lID0gMDtcbiAgICAgIGxhc3RUaW1lID0gYWRqdXN0VGltZShpbnN0YW5jZS5jdXJyZW50VGltZSk7XG4gICAgfVxuXG4gICAgaW5zdGFuY2UucmVzdGFydCA9IGZ1bmN0aW9uKCkge1xuICAgICAgaW5zdGFuY2UucGF1c2UoKTtcbiAgICAgIGluc3RhbmNlLnJlc2V0KCk7XG4gICAgICBpbnN0YW5jZS5wbGF5KCk7XG4gICAgfVxuXG4gICAgaW5zdGFuY2UuZmluaXNoZWQgPSBwcm9taXNlO1xuXG4gICAgaW5zdGFuY2UucmVzZXQoKTtcblxuICAgIGlmIChpbnN0YW5jZS5hdXRvcGxheSkgaW5zdGFuY2UucGxheSgpO1xuXG4gICAgcmV0dXJuIGluc3RhbmNlO1xuXG4gIH1cblxuICAvLyBSZW1vdmUgdGFyZ2V0cyBmcm9tIGFuaW1hdGlvblxuXG4gIGZ1bmN0aW9uIHJlbW92ZVRhcmdldHModGFyZ2V0cykge1xuICAgIGNvbnN0IHRhcmdldHNBcnJheSA9IHBhcnNlVGFyZ2V0cyh0YXJnZXRzKTtcbiAgICBmb3IgKGxldCBpID0gYWN0aXZlSW5zdGFuY2VzLmxlbmd0aDsgaS0tOykge1xuICAgICAgY29uc3QgaW5zdGFuY2UgPSBhY3RpdmVJbnN0YW5jZXNbaV07XG4gICAgICBjb25zdCBhbmltYXRpb25zID0gaW5zdGFuY2UuYW5pbWF0aW9ucztcbiAgICAgIGZvciAobGV0IGEgPSBhbmltYXRpb25zLmxlbmd0aDsgYS0tOykge1xuICAgICAgICBpZiAoYXJyYXlDb250YWlucyh0YXJnZXRzQXJyYXksIGFuaW1hdGlvbnNbYV0uYW5pbWF0YWJsZS50YXJnZXQpKSB7XG4gICAgICAgICAgYW5pbWF0aW9ucy5zcGxpY2UoYSwgMSk7XG4gICAgICAgICAgaWYgKCFhbmltYXRpb25zLmxlbmd0aCkgaW5zdGFuY2UucGF1c2UoKTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIC8vIFRpbWVsaW5lXG5cbiAgZnVuY3Rpb24gdGltZWxpbmUocGFyYW1zKSB7XG4gICAgbGV0IHRsID0gYW5pbWUocGFyYW1zKTtcbiAgICB0bC5wYXVzZSgpO1xuICAgIHRsLmR1cmF0aW9uID0gMDtcbiAgICB0bC5hZGQgPSBmdW5jdGlvbihpbnN0YW5jZXNQYXJhbXMpIHtcbiAgICAgIHRsLmNoaWxkcmVuLmZvckVhY2goaSA9PiB7IGkuYmVnYW4gPSB0cnVlOyBpLmNvbXBsZXRlZCA9IHRydWU7IH0pO1xuICAgICAgdG9BcnJheShpbnN0YW5jZXNQYXJhbXMpLmZvckVhY2goaW5zdGFuY2VQYXJhbXMgPT4ge1xuICAgICAgICBsZXQgaW5zUGFyYW1zID0gbWVyZ2VPYmplY3RzKGluc3RhbmNlUGFyYW1zLCByZXBsYWNlT2JqZWN0UHJvcHMoZGVmYXVsdFR3ZWVuU2V0dGluZ3MsIHBhcmFtcyB8fCB7fSkpO1xuICAgICAgICBpbnNQYXJhbXMudGFyZ2V0cyA9IGluc1BhcmFtcy50YXJnZXRzIHx8IHBhcmFtcy50YXJnZXRzO1xuICAgICAgICBjb25zdCB0bER1cmF0aW9uID0gdGwuZHVyYXRpb247XG4gICAgICAgIGNvbnN0IGluc09mZnNldCA9IGluc1BhcmFtcy5vZmZzZXQ7XG4gICAgICAgIGluc1BhcmFtcy5hdXRvcGxheSA9IGZhbHNlO1xuICAgICAgICBpbnNQYXJhbXMuZGlyZWN0aW9uID0gdGwuZGlyZWN0aW9uO1xuICAgICAgICBpbnNQYXJhbXMub2Zmc2V0ID0gaXMudW5kKGluc09mZnNldCkgPyB0bER1cmF0aW9uIDogZ2V0UmVsYXRpdmVWYWx1ZShpbnNPZmZzZXQsIHRsRHVyYXRpb24pO1xuICAgICAgICB0bC5iZWdhbiA9IHRydWU7XG4gICAgICAgIHRsLmNvbXBsZXRlZCA9IHRydWU7XG4gICAgICAgIHRsLnNlZWsoaW5zUGFyYW1zLm9mZnNldCk7XG4gICAgICAgIGNvbnN0IGlucyA9IGFuaW1lKGluc1BhcmFtcyk7XG4gICAgICAgIGlucy5iZWdhbiA9IHRydWU7XG4gICAgICAgIGlucy5jb21wbGV0ZWQgPSB0cnVlO1xuICAgICAgICBpZiAoaW5zLmR1cmF0aW9uID4gdGxEdXJhdGlvbikgdGwuZHVyYXRpb24gPSBpbnMuZHVyYXRpb247XG4gICAgICAgIHRsLmNoaWxkcmVuLnB1c2goaW5zKTtcbiAgICAgIH0pO1xuICAgICAgdGwuc2VlaygwKTtcbiAgICAgIHRsLnJlc2V0KCk7XG4gICAgICBpZiAodGwuYXV0b3BsYXkpIHRsLnJlc3RhcnQoKTtcbiAgICAgIHJldHVybiB0bDtcbiAgICB9XG4gICAgcmV0dXJuIHRsO1xuICB9XG5cbiAgYW5pbWUudmVyc2lvbiA9ICcyLjIuMCc7XG4gIGFuaW1lLnNwZWVkID0gMTtcbiAgYW5pbWUucnVubmluZyA9IGFjdGl2ZUluc3RhbmNlcztcbiAgYW5pbWUucmVtb3ZlID0gcmVtb3ZlVGFyZ2V0cztcbiAgYW5pbWUuZ2V0VmFsdWUgPSBnZXRPcmlnaW5hbFRhcmdldFZhbHVlO1xuICBhbmltZS5wYXRoID0gZ2V0UGF0aDtcbiAgYW5pbWUuc2V0RGFzaG9mZnNldCA9IHNldERhc2hvZmZzZXQ7XG4gIGFuaW1lLmJlemllciA9IGJlemllcjtcbiAgYW5pbWUuZWFzaW5ncyA9IGVhc2luZ3M7XG4gIGFuaW1lLnRpbWVsaW5lID0gdGltZWxpbmU7XG4gIGFuaW1lLnJhbmRvbSA9IChtaW4sIG1heCkgPT4gTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogKG1heCAtIG1pbiArIDEpKSArIG1pbjtcblxuICByZXR1cm4gYW5pbWU7XG5cbn0pKTtcbiJdLCJmaWxlIjoibGlicy9hbmltZS5qcyJ9
