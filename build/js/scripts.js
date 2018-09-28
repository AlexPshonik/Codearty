/*!
 * jQuery JavaScript Library v3.3.1
 * https://jquery.com/
 *
 * Includes Sizzle.js
 * https://sizzlejs.com/
 *
 * Copyright JS Foundation and other contributors
 * Released under the MIT license
 * https://jquery.org/license
 *
 * Date: 2018-01-20T17:24Z
 */
( function( global, factory ) {

	"use strict";

	if ( typeof module === "object" && typeof module.exports === "object" ) {

		// For CommonJS and CommonJS-like environments where a proper `window`
		// is present, execute the factory and get jQuery.
		// For environments that do not have a `window` with a `document`
		// (such as Node.js), expose a factory as module.exports.
		// This accentuates the need for the creation of a real `window`.
		// e.g. var jQuery = require("jquery")(window);
		// See ticket #14549 for more info.
		module.exports = global.document ?
			factory( global, true ) :
			function( w ) {
				if ( !w.document ) {
					throw new Error( "jQuery requires a window with a document" );
				}
				return factory( w );
			};
	} else {
		factory( global );
	}

// Pass this if window is not defined yet
} )( typeof window !== "undefined" ? window : this, function( window, noGlobal ) {

// Edge <= 12 - 13+, Firefox <=18 - 45+, IE 10 - 11, Safari 5.1 - 9+, iOS 6 - 9.1
// throw exceptions when non-strict code (e.g., ASP.NET 4.5) accesses strict mode
// arguments.callee.caller (trac-13335). But as of jQuery 3.0 (2016), strict mode should be common
// enough that all such attempts are guarded in a try block.
"use strict";

var arr = [];

var document = window.document;

var getProto = Object.getPrototypeOf;

var slice = arr.slice;

var concat = arr.concat;

var push = arr.push;

var indexOf = arr.indexOf;

var class2type = {};

var toString = class2type.toString;

var hasOwn = class2type.hasOwnProperty;

var fnToString = hasOwn.toString;

var ObjectFunctionString = fnToString.call( Object );

var support = {};

var isFunction = function isFunction( obj ) {

      // Support: Chrome <=57, Firefox <=52
      // In some browsers, typeof returns "function" for HTML <object> elements
      // (i.e., `typeof document.createElement( "object" ) === "function"`).
      // We don't want to classify *any* DOM node as a function.
      return typeof obj === "function" && typeof obj.nodeType !== "number";
  };


var isWindow = function isWindow( obj ) {
		return obj != null && obj === obj.window;
	};




	var preservedScriptAttributes = {
		type: true,
		src: true,
		noModule: true
	};

	function DOMEval( code, doc, node ) {
		doc = doc || document;

		var i,
			script = doc.createElement( "script" );

		script.text = code;
		if ( node ) {
			for ( i in preservedScriptAttributes ) {
				if ( node[ i ] ) {
					script[ i ] = node[ i ];
				}
			}
		}
		doc.head.appendChild( script ).parentNode.removeChild( script );
	}


function toType( obj ) {
	if ( obj == null ) {
		return obj + "";
	}

	// Support: Android <=2.3 only (functionish RegExp)
	return typeof obj === "object" || typeof obj === "function" ?
		class2type[ toString.call( obj ) ] || "object" :
		typeof obj;
}
/* global Symbol */
// Defining this global in .eslintrc.json would create a danger of using the global
// unguarded in another place, it seems safer to define global only for this module



var
	version = "3.3.1",

	// Define a local copy of jQuery
	jQuery = function( selector, context ) {

		// The jQuery object is actually just the init constructor 'enhanced'
		// Need init if jQuery is called (just allow error to be thrown if not included)
		return new jQuery.fn.init( selector, context );
	},

	// Support: Android <=4.0 only
	// Make sure we trim BOM and NBSP
	rtrim = /^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g;

jQuery.fn = jQuery.prototype = {

	// The current version of jQuery being used
	jquery: version,

	constructor: jQuery,

	// The default length of a jQuery object is 0
	length: 0,

	toArray: function() {
		return slice.call( this );
	},

	// Get the Nth element in the matched element set OR
	// Get the whole matched element set as a clean array
	get: function( num ) {

		// Return all the elements in a clean array
		if ( num == null ) {
			return slice.call( this );
		}

		// Return just the one element from the set
		return num < 0 ? this[ num + this.length ] : this[ num ];
	},

	// Take an array of elements and push it onto the stack
	// (returning the new matched element set)
	pushStack: function( elems ) {

		// Build a new jQuery matched element set
		var ret = jQuery.merge( this.constructor(), elems );

		// Add the old object onto the stack (as a reference)
		ret.prevObject = this;

		// Return the newly-formed element set
		return ret;
	},

	// Execute a callback for every element in the matched set.
	each: function( callback ) {
		return jQuery.each( this, callback );
	},

	map: function( callback ) {
		return this.pushStack( jQuery.map( this, function( elem, i ) {
			return callback.call( elem, i, elem );
		} ) );
	},

	slice: function() {
		return this.pushStack( slice.apply( this, arguments ) );
	},

	first: function() {
		return this.eq( 0 );
	},

	last: function() {
		return this.eq( -1 );
	},

	eq: function( i ) {
		var len = this.length,
			j = +i + ( i < 0 ? len : 0 );
		return this.pushStack( j >= 0 && j < len ? [ this[ j ] ] : [] );
	},

	end: function() {
		return this.prevObject || this.constructor();
	},

	// For internal use only.
	// Behaves like an Array's method, not like a jQuery method.
	push: push,
	sort: arr.sort,
	splice: arr.splice
};

jQuery.extend = jQuery.fn.extend = function() {
	var options, name, src, copy, copyIsArray, clone,
		target = arguments[ 0 ] || {},
		i = 1,
		length = arguments.length,
		deep = false;

	// Handle a deep copy situation
	if ( typeof target === "boolean" ) {
		deep = target;

		// Skip the boolean and the target
		target = arguments[ i ] || {};
		i++;
	}

	// Handle case when target is a string or something (possible in deep copy)
	if ( typeof target !== "object" && !isFunction( target ) ) {
		target = {};
	}

	// Extend jQuery itself if only one argument is passed
	if ( i === length ) {
		target = this;
		i--;
	}

	for ( ; i < length; i++ ) {

		// Only deal with non-null/undefined values
		if ( ( options = arguments[ i ] ) != null ) {

			// Extend the base object
			for ( name in options ) {
				src = target[ name ];
				copy = options[ name ];

				// Prevent never-ending loop
				if ( target === copy ) {
					continue;
				}

				// Recurse if we're merging plain objects or arrays
				if ( deep && copy && ( jQuery.isPlainObject( copy ) ||
					( copyIsArray = Array.isArray( copy ) ) ) ) {

					if ( copyIsArray ) {
						copyIsArray = false;
						clone = src && Array.isArray( src ) ? src : [];

					} else {
						clone = src && jQuery.isPlainObject( src ) ? src : {};
					}

					// Never move original objects, clone them
					target[ name ] = jQuery.extend( deep, clone, copy );

				// Don't bring in undefined values
				} else if ( copy !== undefined ) {
					target[ name ] = copy;
				}
			}
		}
	}

	// Return the modified object
	return target;
};

jQuery.extend( {

	// Unique for each copy of jQuery on the page
	expando: "jQuery" + ( version + Math.random() ).replace( /\D/g, "" ),

	// Assume jQuery is ready without the ready module
	isReady: true,

	error: function( msg ) {
		throw new Error( msg );
	},

	noop: function() {},

	isPlainObject: function( obj ) {
		var proto, Ctor;

		// Detect obvious negatives
		// Use toString instead of jQuery.type to catch host objects
		if ( !obj || toString.call( obj ) !== "[object Object]" ) {
			return false;
		}

		proto = getProto( obj );

		// Objects with no prototype (e.g., `Object.create( null )`) are plain
		if ( !proto ) {
			return true;
		}

		// Objects with prototype are plain iff they were constructed by a global Object function
		Ctor = hasOwn.call( proto, "constructor" ) && proto.constructor;
		return typeof Ctor === "function" && fnToString.call( Ctor ) === ObjectFunctionString;
	},

	isEmptyObject: function( obj ) {

		/* eslint-disable no-unused-vars */
		// See https://github.com/eslint/eslint/issues/6125
		var name;

		for ( name in obj ) {
			return false;
		}
		return true;
	},

	// Evaluates a script in a global context
	globalEval: function( code ) {
		DOMEval( code );
	},

	each: function( obj, callback ) {
		var length, i = 0;

		if ( isArrayLike( obj ) ) {
			length = obj.length;
			for ( ; i < length; i++ ) {
				if ( callback.call( obj[ i ], i, obj[ i ] ) === false ) {
					break;
				}
			}
		} else {
			for ( i in obj ) {
				if ( callback.call( obj[ i ], i, obj[ i ] ) === false ) {
					break;
				}
			}
		}

		return obj;
	},

	// Support: Android <=4.0 only
	trim: function( text ) {
		return text == null ?
			"" :
			( text + "" ).replace( rtrim, "" );
	},

	// results is for internal usage only
	makeArray: function( arr, results ) {
		var ret = results || [];

		if ( arr != null ) {
			if ( isArrayLike( Object( arr ) ) ) {
				jQuery.merge( ret,
					typeof arr === "string" ?
					[ arr ] : arr
				);
			} else {
				push.call( ret, arr );
			}
		}

		return ret;
	},

	inArray: function( elem, arr, i ) {
		return arr == null ? -1 : indexOf.call( arr, elem, i );
	},

	// Support: Android <=4.0 only, PhantomJS 1 only
	// push.apply(_, arraylike) throws on ancient WebKit
	merge: function( first, second ) {
		var len = +second.length,
			j = 0,
			i = first.length;

		for ( ; j < len; j++ ) {
			first[ i++ ] = second[ j ];
		}

		first.length = i;

		return first;
	},

	grep: function( elems, callback, invert ) {
		var callbackInverse,
			matches = [],
			i = 0,
			length = elems.length,
			callbackExpect = !invert;

		// Go through the array, only saving the items
		// that pass the validator function
		for ( ; i < length; i++ ) {
			callbackInverse = !callback( elems[ i ], i );
			if ( callbackInverse !== callbackExpect ) {
				matches.push( elems[ i ] );
			}
		}

		return matches;
	},

	// arg is for internal usage only
	map: function( elems, callback, arg ) {
		var length, value,
			i = 0,
			ret = [];

		// Go through the array, translating each of the items to their new values
		if ( isArrayLike( elems ) ) {
			length = elems.length;
			for ( ; i < length; i++ ) {
				value = callback( elems[ i ], i, arg );

				if ( value != null ) {
					ret.push( value );
				}
			}

		// Go through every key on the object,
		} else {
			for ( i in elems ) {
				value = callback( elems[ i ], i, arg );

				if ( value != null ) {
					ret.push( value );
				}
			}
		}

		// Flatten any nested arrays
		return concat.apply( [], ret );
	},

	// A global GUID counter for objects
	guid: 1,

	// jQuery.support is not used in Core but other projects attach their
	// properties to it so it needs to exist.
	support: support
} );

if ( typeof Symbol === "function" ) {
	jQuery.fn[ Symbol.iterator ] = arr[ Symbol.iterator ];
}

// Populate the class2type map
jQuery.each( "Boolean Number String Function Array Date RegExp Object Error Symbol".split( " " ),
function( i, name ) {
	class2type[ "[object " + name + "]" ] = name.toLowerCase();
} );

function isArrayLike( obj ) {

	// Support: real iOS 8.2 only (not reproducible in simulator)
	// `in` check used to prevent JIT error (gh-2145)
	// hasOwn isn't used here due to false negatives
	// regarding Nodelist length in IE
	var length = !!obj && "length" in obj && obj.length,
		type = toType( obj );

	if ( isFunction( obj ) || isWindow( obj ) ) {
		return false;
	}

	return type === "array" || length === 0 ||
		typeof length === "number" && length > 0 && ( length - 1 ) in obj;
}
var Sizzle =
/*!
 * Sizzle CSS Selector Engine v2.3.3
 * https://sizzlejs.com/
 *
 * Copyright jQuery Foundation and other contributors
 * Released under the MIT license
 * http://jquery.org/license
 *
 * Date: 2016-08-08
 */
(function( window ) {

var i,
	support,
	Expr,
	getText,
	isXML,
	tokenize,
	compile,
	select,
	outermostContext,
	sortInput,
	hasDuplicate,

	// Local document vars
	setDocument,
	document,
	docElem,
	documentIsHTML,
	rbuggyQSA,
	rbuggyMatches,
	matches,
	contains,

	// Instance-specific data
	expando = "sizzle" + 1 * new Date(),
	preferredDoc = window.document,
	dirruns = 0,
	done = 0,
	classCache = createCache(),
	tokenCache = createCache(),
	compilerCache = createCache(),
	sortOrder = function( a, b ) {
		if ( a === b ) {
			hasDuplicate = true;
		}
		return 0;
	},

	// Instance methods
	hasOwn = ({}).hasOwnProperty,
	arr = [],
	pop = arr.pop,
	push_native = arr.push,
	push = arr.push,
	slice = arr.slice,
	// Use a stripped-down indexOf as it's faster than native
	// https://jsperf.com/thor-indexof-vs-for/5
	indexOf = function( list, elem ) {
		var i = 0,
			len = list.length;
		for ( ; i < len; i++ ) {
			if ( list[i] === elem ) {
				return i;
			}
		}
		return -1;
	},

	booleans = "checked|selected|async|autofocus|autoplay|controls|defer|disabled|hidden|ismap|loop|multiple|open|readonly|required|scoped",

	// Regular expressions

	// http://www.w3.org/TR/css3-selectors/#whitespace
	whitespace = "[\\x20\\t\\r\\n\\f]",

	// http://www.w3.org/TR/CSS21/syndata.html#value-def-identifier
	identifier = "(?:\\\\.|[\\w-]|[^\0-\\xa0])+",

	// Attribute selectors: http://www.w3.org/TR/selectors/#attribute-selectors
	attributes = "\\[" + whitespace + "*(" + identifier + ")(?:" + whitespace +
		// Operator (capture 2)
		"*([*^$|!~]?=)" + whitespace +
		// "Attribute values must be CSS identifiers [capture 5] or strings [capture 3 or capture 4]"
		"*(?:'((?:\\\\.|[^\\\\'])*)'|\"((?:\\\\.|[^\\\\\"])*)\"|(" + identifier + "))|)" + whitespace +
		"*\\]",

	pseudos = ":(" + identifier + ")(?:\\((" +
		// To reduce the number of selectors needing tokenize in the preFilter, prefer arguments:
		// 1. quoted (capture 3; capture 4 or capture 5)
		"('((?:\\\\.|[^\\\\'])*)'|\"((?:\\\\.|[^\\\\\"])*)\")|" +
		// 2. simple (capture 6)
		"((?:\\\\.|[^\\\\()[\\]]|" + attributes + ")*)|" +
		// 3. anything else (capture 2)
		".*" +
		")\\)|)",

	// Leading and non-escaped trailing whitespace, capturing some non-whitespace characters preceding the latter
	rwhitespace = new RegExp( whitespace + "+", "g" ),
	rtrim = new RegExp( "^" + whitespace + "+|((?:^|[^\\\\])(?:\\\\.)*)" + whitespace + "+$", "g" ),

	rcomma = new RegExp( "^" + whitespace + "*," + whitespace + "*" ),
	rcombinators = new RegExp( "^" + whitespace + "*([>+~]|" + whitespace + ")" + whitespace + "*" ),

	rattributeQuotes = new RegExp( "=" + whitespace + "*([^\\]'\"]*?)" + whitespace + "*\\]", "g" ),

	rpseudo = new RegExp( pseudos ),
	ridentifier = new RegExp( "^" + identifier + "$" ),

	matchExpr = {
		"ID": new RegExp( "^#(" + identifier + ")" ),
		"CLASS": new RegExp( "^\\.(" + identifier + ")" ),
		"TAG": new RegExp( "^(" + identifier + "|[*])" ),
		"ATTR": new RegExp( "^" + attributes ),
		"PSEUDO": new RegExp( "^" + pseudos ),
		"CHILD": new RegExp( "^:(only|first|last|nth|nth-last)-(child|of-type)(?:\\(" + whitespace +
			"*(even|odd|(([+-]|)(\\d*)n|)" + whitespace + "*(?:([+-]|)" + whitespace +
			"*(\\d+)|))" + whitespace + "*\\)|)", "i" ),
		"bool": new RegExp( "^(?:" + booleans + ")$", "i" ),
		// For use in libraries implementing .is()
		// We use this for POS matching in `select`
		"needsContext": new RegExp( "^" + whitespace + "*[>+~]|:(even|odd|eq|gt|lt|nth|first|last)(?:\\(" +
			whitespace + "*((?:-\\d)?\\d*)" + whitespace + "*\\)|)(?=[^-]|$)", "i" )
	},

	rinputs = /^(?:input|select|textarea|button)$/i,
	rheader = /^h\d$/i,

	rnative = /^[^{]+\{\s*\[native \w/,

	// Easily-parseable/retrievable ID or TAG or CLASS selectors
	rquickExpr = /^(?:#([\w-]+)|(\w+)|\.([\w-]+))$/,

	rsibling = /[+~]/,

	// CSS escapes
	// http://www.w3.org/TR/CSS21/syndata.html#escaped-characters
	runescape = new RegExp( "\\\\([\\da-f]{1,6}" + whitespace + "?|(" + whitespace + ")|.)", "ig" ),
	funescape = function( _, escaped, escapedWhitespace ) {
		var high = "0x" + escaped - 0x10000;
		// NaN means non-codepoint
		// Support: Firefox<24
		// Workaround erroneous numeric interpretation of +"0x"
		return high !== high || escapedWhitespace ?
			escaped :
			high < 0 ?
				// BMP codepoint
				String.fromCharCode( high + 0x10000 ) :
				// Supplemental Plane codepoint (surrogate pair)
				String.fromCharCode( high >> 10 | 0xD800, high & 0x3FF | 0xDC00 );
	},

	// CSS string/identifier serialization
	// https://drafts.csswg.org/cssom/#common-serializing-idioms
	rcssescape = /([\0-\x1f\x7f]|^-?\d)|^-$|[^\0-\x1f\x7f-\uFFFF\w-]/g,
	fcssescape = function( ch, asCodePoint ) {
		if ( asCodePoint ) {

			// U+0000 NULL becomes U+FFFD REPLACEMENT CHARACTER
			if ( ch === "\0" ) {
				return "\uFFFD";
			}

			// Control characters and (dependent upon position) numbers get escaped as code points
			return ch.slice( 0, -1 ) + "\\" + ch.charCodeAt( ch.length - 1 ).toString( 16 ) + " ";
		}

		// Other potentially-special ASCII characters get backslash-escaped
		return "\\" + ch;
	},

	// Used for iframes
	// See setDocument()
	// Removing the function wrapper causes a "Permission Denied"
	// error in IE
	unloadHandler = function() {
		setDocument();
	},

	disabledAncestor = addCombinator(
		function( elem ) {
			return elem.disabled === true && ("form" in elem || "label" in elem);
		},
		{ dir: "parentNode", next: "legend" }
	);

// Optimize for push.apply( _, NodeList )
try {
	push.apply(
		(arr = slice.call( preferredDoc.childNodes )),
		preferredDoc.childNodes
	);
	// Support: Android<4.0
	// Detect silently failing push.apply
	arr[ preferredDoc.childNodes.length ].nodeType;
} catch ( e ) {
	push = { apply: arr.length ?

		// Leverage slice if possible
		function( target, els ) {
			push_native.apply( target, slice.call(els) );
		} :

		// Support: IE<9
		// Otherwise append directly
		function( target, els ) {
			var j = target.length,
				i = 0;
			// Can't trust NodeList.length
			while ( (target[j++] = els[i++]) ) {}
			target.length = j - 1;
		}
	};
}

function Sizzle( selector, context, results, seed ) {
	var m, i, elem, nid, match, groups, newSelector,
		newContext = context && context.ownerDocument,

		// nodeType defaults to 9, since context defaults to document
		nodeType = context ? context.nodeType : 9;

	results = results || [];

	// Return early from calls with invalid selector or context
	if ( typeof selector !== "string" || !selector ||
		nodeType !== 1 && nodeType !== 9 && nodeType !== 11 ) {

		return results;
	}

	// Try to shortcut find operations (as opposed to filters) in HTML documents
	if ( !seed ) {

		if ( ( context ? context.ownerDocument || context : preferredDoc ) !== document ) {
			setDocument( context );
		}
		context = context || document;

		if ( documentIsHTML ) {

			// If the selector is sufficiently simple, try using a "get*By*" DOM method
			// (excepting DocumentFragment context, where the methods don't exist)
			if ( nodeType !== 11 && (match = rquickExpr.exec( selector )) ) {

				// ID selector
				if ( (m = match[1]) ) {

					// Document context
					if ( nodeType === 9 ) {
						if ( (elem = context.getElementById( m )) ) {

							// Support: IE, Opera, Webkit
							// TODO: identify versions
							// getElementById can match elements by name instead of ID
							if ( elem.id === m ) {
								results.push( elem );
								return results;
							}
						} else {
							return results;
						}

					// Element context
					} else {

						// Support: IE, Opera, Webkit
						// TODO: identify versions
						// getElementById can match elements by name instead of ID
						if ( newContext && (elem = newContext.getElementById( m )) &&
							contains( context, elem ) &&
							elem.id === m ) {

							results.push( elem );
							return results;
						}
					}

				// Type selector
				} else if ( match[2] ) {
					push.apply( results, context.getElementsByTagName( selector ) );
					return results;

				// Class selector
				} else if ( (m = match[3]) && support.getElementsByClassName &&
					context.getElementsByClassName ) {

					push.apply( results, context.getElementsByClassName( m ) );
					return results;
				}
			}

			// Take advantage of querySelectorAll
			if ( support.qsa &&
				!compilerCache[ selector + " " ] &&
				(!rbuggyQSA || !rbuggyQSA.test( selector )) ) {

				if ( nodeType !== 1 ) {
					newContext = context;
					newSelector = selector;

				// qSA looks outside Element context, which is not what we want
				// Thanks to Andrew Dupont for this workaround technique
				// Support: IE <=8
				// Exclude object elements
				} else if ( context.nodeName.toLowerCase() !== "object" ) {

					// Capture the context ID, setting it first if necessary
					if ( (nid = context.getAttribute( "id" )) ) {
						nid = nid.replace( rcssescape, fcssescape );
					} else {
						context.setAttribute( "id", (nid = expando) );
					}

					// Prefix every selector in the list
					groups = tokenize( selector );
					i = groups.length;
					while ( i-- ) {
						groups[i] = "#" + nid + " " + toSelector( groups[i] );
					}
					newSelector = groups.join( "," );

					// Expand context for sibling selectors
					newContext = rsibling.test( selector ) && testContext( context.parentNode ) ||
						context;
				}

				if ( newSelector ) {
					try {
						push.apply( results,
							newContext.querySelectorAll( newSelector )
						);
						return results;
					} catch ( qsaError ) {
					} finally {
						if ( nid === expando ) {
							context.removeAttribute( "id" );
						}
					}
				}
			}
		}
	}

	// All others
	return select( selector.replace( rtrim, "$1" ), context, results, seed );
}

/**
 * Create key-value caches of limited size
 * @returns {function(string, object)} Returns the Object data after storing it on itself with
 *	property name the (space-suffixed) string and (if the cache is larger than Expr.cacheLength)
 *	deleting the oldest entry
 */
function createCache() {
	var keys = [];

	function cache( key, value ) {
		// Use (key + " ") to avoid collision with native prototype properties (see Issue #157)
		if ( keys.push( key + " " ) > Expr.cacheLength ) {
			// Only keep the most recent entries
			delete cache[ keys.shift() ];
		}
		return (cache[ key + " " ] = value);
	}
	return cache;
}

/**
 * Mark a function for special use by Sizzle
 * @param {Function} fn The function to mark
 */
function markFunction( fn ) {
	fn[ expando ] = true;
	return fn;
}

/**
 * Support testing using an element
 * @param {Function} fn Passed the created element and returns a boolean result
 */
function assert( fn ) {
	var el = document.createElement("fieldset");

	try {
		return !!fn( el );
	} catch (e) {
		return false;
	} finally {
		// Remove from its parent by default
		if ( el.parentNode ) {
			el.parentNode.removeChild( el );
		}
		// release memory in IE
		el = null;
	}
}

/**
 * Adds the same handler for all of the specified attrs
 * @param {String} attrs Pipe-separated list of attributes
 * @param {Function} handler The method that will be applied
 */
function addHandle( attrs, handler ) {
	var arr = attrs.split("|"),
		i = arr.length;

	while ( i-- ) {
		Expr.attrHandle[ arr[i] ] = handler;
	}
}

/**
 * Checks document order of two siblings
 * @param {Element} a
 * @param {Element} b
 * @returns {Number} Returns less than 0 if a precedes b, greater than 0 if a follows b
 */
function siblingCheck( a, b ) {
	var cur = b && a,
		diff = cur && a.nodeType === 1 && b.nodeType === 1 &&
			a.sourceIndex - b.sourceIndex;

	// Use IE sourceIndex if available on both nodes
	if ( diff ) {
		return diff;
	}

	// Check if b follows a
	if ( cur ) {
		while ( (cur = cur.nextSibling) ) {
			if ( cur === b ) {
				return -1;
			}
		}
	}

	return a ? 1 : -1;
}

/**
 * Returns a function to use in pseudos for input types
 * @param {String} type
 */
function createInputPseudo( type ) {
	return function( elem ) {
		var name = elem.nodeName.toLowerCase();
		return name === "input" && elem.type === type;
	};
}

/**
 * Returns a function to use in pseudos for buttons
 * @param {String} type
 */
function createButtonPseudo( type ) {
	return function( elem ) {
		var name = elem.nodeName.toLowerCase();
		return (name === "input" || name === "button") && elem.type === type;
	};
}

/**
 * Returns a function to use in pseudos for :enabled/:disabled
 * @param {Boolean} disabled true for :disabled; false for :enabled
 */
function createDisabledPseudo( disabled ) {

	// Known :disabled false positives: fieldset[disabled] > legend:nth-of-type(n+2) :can-disable
	return function( elem ) {

		// Only certain elements can match :enabled or :disabled
		// https://html.spec.whatwg.org/multipage/scripting.html#selector-enabled
		// https://html.spec.whatwg.org/multipage/scripting.html#selector-disabled
		if ( "form" in elem ) {

			// Check for inherited disabledness on relevant non-disabled elements:
			// * listed form-associated elements in a disabled fieldset
			//   https://html.spec.whatwg.org/multipage/forms.html#category-listed
			//   https://html.spec.whatwg.org/multipage/forms.html#concept-fe-disabled
			// * option elements in a disabled optgroup
			//   https://html.spec.whatwg.org/multipage/forms.html#concept-option-disabled
			// All such elements have a "form" property.
			if ( elem.parentNode && elem.disabled === false ) {

				// Option elements defer to a parent optgroup if present
				if ( "label" in elem ) {
					if ( "label" in elem.parentNode ) {
						return elem.parentNode.disabled === disabled;
					} else {
						return elem.disabled === disabled;
					}
				}

				// Support: IE 6 - 11
				// Use the isDisabled shortcut property to check for disabled fieldset ancestors
				return elem.isDisabled === disabled ||

					// Where there is no isDisabled, check manually
					/* jshint -W018 */
					elem.isDisabled !== !disabled &&
						disabledAncestor( elem ) === disabled;
			}

			return elem.disabled === disabled;

		// Try to winnow out elements that can't be disabled before trusting the disabled property.
		// Some victims get caught in our net (label, legend, menu, track), but it shouldn't
		// even exist on them, let alone have a boolean value.
		} else if ( "label" in elem ) {
			return elem.disabled === disabled;
		}

		// Remaining elements are neither :enabled nor :disabled
		return false;
	};
}

/**
 * Returns a function to use in pseudos for positionals
 * @param {Function} fn
 */
function createPositionalPseudo( fn ) {
	return markFunction(function( argument ) {
		argument = +argument;
		return markFunction(function( seed, matches ) {
			var j,
				matchIndexes = fn( [], seed.length, argument ),
				i = matchIndexes.length;

			// Match elements found at the specified indexes
			while ( i-- ) {
				if ( seed[ (j = matchIndexes[i]) ] ) {
					seed[j] = !(matches[j] = seed[j]);
				}
			}
		});
	});
}

/**
 * Checks a node for validity as a Sizzle context
 * @param {Element|Object=} context
 * @returns {Element|Object|Boolean} The input node if acceptable, otherwise a falsy value
 */
function testContext( context ) {
	return context && typeof context.getElementsByTagName !== "undefined" && context;
}

// Expose support vars for convenience
support = Sizzle.support = {};

/**
 * Detects XML nodes
 * @param {Element|Object} elem An element or a document
 * @returns {Boolean} True iff elem is a non-HTML XML node
 */
isXML = Sizzle.isXML = function( elem ) {
	// documentElement is verified for cases where it doesn't yet exist
	// (such as loading iframes in IE - #4833)
	var documentElement = elem && (elem.ownerDocument || elem).documentElement;
	return documentElement ? documentElement.nodeName !== "HTML" : false;
};

/**
 * Sets document-related variables once based on the current document
 * @param {Element|Object} [doc] An element or document object to use to set the document
 * @returns {Object} Returns the current document
 */
setDocument = Sizzle.setDocument = function( node ) {
	var hasCompare, subWindow,
		doc = node ? node.ownerDocument || node : preferredDoc;

	// Return early if doc is invalid or already selected
	if ( doc === document || doc.nodeType !== 9 || !doc.documentElement ) {
		return document;
	}

	// Update global variables
	document = doc;
	docElem = document.documentElement;
	documentIsHTML = !isXML( document );

	// Support: IE 9-11, Edge
	// Accessing iframe documents after unload throws "permission denied" errors (jQuery #13936)
	if ( preferredDoc !== document &&
		(subWindow = document.defaultView) && subWindow.top !== subWindow ) {

		// Support: IE 11, Edge
		if ( subWindow.addEventListener ) {
			subWindow.addEventListener( "unload", unloadHandler, false );

		// Support: IE 9 - 10 only
		} else if ( subWindow.attachEvent ) {
			subWindow.attachEvent( "onunload", unloadHandler );
		}
	}

	/* Attributes
	---------------------------------------------------------------------- */

	// Support: IE<8
	// Verify that getAttribute really returns attributes and not properties
	// (excepting IE8 booleans)
	support.attributes = assert(function( el ) {
		el.className = "i";
		return !el.getAttribute("className");
	});

	/* getElement(s)By*
	---------------------------------------------------------------------- */

	// Check if getElementsByTagName("*") returns only elements
	support.getElementsByTagName = assert(function( el ) {
		el.appendChild( document.createComment("") );
		return !el.getElementsByTagName("*").length;
	});

	// Support: IE<9
	support.getElementsByClassName = rnative.test( document.getElementsByClassName );

	// Support: IE<10
	// Check if getElementById returns elements by name
	// The broken getElementById methods don't pick up programmatically-set names,
	// so use a roundabout getElementsByName test
	support.getById = assert(function( el ) {
		docElem.appendChild( el ).id = expando;
		return !document.getElementsByName || !document.getElementsByName( expando ).length;
	});

	// ID filter and find
	if ( support.getById ) {
		Expr.filter["ID"] = function( id ) {
			var attrId = id.replace( runescape, funescape );
			return function( elem ) {
				return elem.getAttribute("id") === attrId;
			};
		};
		Expr.find["ID"] = function( id, context ) {
			if ( typeof context.getElementById !== "undefined" && documentIsHTML ) {
				var elem = context.getElementById( id );
				return elem ? [ elem ] : [];
			}
		};
	} else {
		Expr.filter["ID"] =  function( id ) {
			var attrId = id.replace( runescape, funescape );
			return function( elem ) {
				var node = typeof elem.getAttributeNode !== "undefined" &&
					elem.getAttributeNode("id");
				return node && node.value === attrId;
			};
		};

		// Support: IE 6 - 7 only
		// getElementById is not reliable as a find shortcut
		Expr.find["ID"] = function( id, context ) {
			if ( typeof context.getElementById !== "undefined" && documentIsHTML ) {
				var node, i, elems,
					elem = context.getElementById( id );

				if ( elem ) {

					// Verify the id attribute
					node = elem.getAttributeNode("id");
					if ( node && node.value === id ) {
						return [ elem ];
					}

					// Fall back on getElementsByName
					elems = context.getElementsByName( id );
					i = 0;
					while ( (elem = elems[i++]) ) {
						node = elem.getAttributeNode("id");
						if ( node && node.value === id ) {
							return [ elem ];
						}
					}
				}

				return [];
			}
		};
	}

	// Tag
	Expr.find["TAG"] = support.getElementsByTagName ?
		function( tag, context ) {
			if ( typeof context.getElementsByTagName !== "undefined" ) {
				return context.getElementsByTagName( tag );

			// DocumentFragment nodes don't have gEBTN
			} else if ( support.qsa ) {
				return context.querySelectorAll( tag );
			}
		} :

		function( tag, context ) {
			var elem,
				tmp = [],
				i = 0,
				// By happy coincidence, a (broken) gEBTN appears on DocumentFragment nodes too
				results = context.getElementsByTagName( tag );

			// Filter out possible comments
			if ( tag === "*" ) {
				while ( (elem = results[i++]) ) {
					if ( elem.nodeType === 1 ) {
						tmp.push( elem );
					}
				}

				return tmp;
			}
			return results;
		};

	// Class
	Expr.find["CLASS"] = support.getElementsByClassName && function( className, context ) {
		if ( typeof context.getElementsByClassName !== "undefined" && documentIsHTML ) {
			return context.getElementsByClassName( className );
		}
	};

	/* QSA/matchesSelector
	---------------------------------------------------------------------- */

	// QSA and matchesSelector support

	// matchesSelector(:active) reports false when true (IE9/Opera 11.5)
	rbuggyMatches = [];

	// qSa(:focus) reports false when true (Chrome 21)
	// We allow this because of a bug in IE8/9 that throws an error
	// whenever `document.activeElement` is accessed on an iframe
	// So, we allow :focus to pass through QSA all the time to avoid the IE error
	// See https://bugs.jquery.com/ticket/13378
	rbuggyQSA = [];

	if ( (support.qsa = rnative.test( document.querySelectorAll )) ) {
		// Build QSA regex
		// Regex strategy adopted from Diego Perini
		assert(function( el ) {
			// Select is set to empty string on purpose
			// This is to test IE's treatment of not explicitly
			// setting a boolean content attribute,
			// since its presence should be enough
			// https://bugs.jquery.com/ticket/12359
			docElem.appendChild( el ).innerHTML = "<a id='" + expando + "'></a>" +
				"<select id='" + expando + "-\r\\' msallowcapture=''>" +
				"<option selected=''></option></select>";

			// Support: IE8, Opera 11-12.16
			// Nothing should be selected when empty strings follow ^= or $= or *=
			// The test attribute must be unknown in Opera but "safe" for WinRT
			// https://msdn.microsoft.com/en-us/library/ie/hh465388.aspx#attribute_section
			if ( el.querySelectorAll("[msallowcapture^='']").length ) {
				rbuggyQSA.push( "[*^$]=" + whitespace + "*(?:''|\"\")" );
			}

			// Support: IE8
			// Boolean attributes and "value" are not treated correctly
			if ( !el.querySelectorAll("[selected]").length ) {
				rbuggyQSA.push( "\\[" + whitespace + "*(?:value|" + booleans + ")" );
			}

			// Support: Chrome<29, Android<4.4, Safari<7.0+, iOS<7.0+, PhantomJS<1.9.8+
			if ( !el.querySelectorAll( "[id~=" + expando + "-]" ).length ) {
				rbuggyQSA.push("~=");
			}

			// Webkit/Opera - :checked should return selected option elements
			// http://www.w3.org/TR/2011/REC-css3-selectors-20110929/#checked
			// IE8 throws error here and will not see later tests
			if ( !el.querySelectorAll(":checked").length ) {
				rbuggyQSA.push(":checked");
			}

			// Support: Safari 8+, iOS 8+
			// https://bugs.webkit.org/show_bug.cgi?id=136851
			// In-page `selector#id sibling-combinator selector` fails
			if ( !el.querySelectorAll( "a#" + expando + "+*" ).length ) {
				rbuggyQSA.push(".#.+[+~]");
			}
		});

		assert(function( el ) {
			el.innerHTML = "<a href='' disabled='disabled'></a>" +
				"<select disabled='disabled'><option/></select>";

			// Support: Windows 8 Native Apps
			// The type and name attributes are restricted during .innerHTML assignment
			var input = document.createElement("input");
			input.setAttribute( "type", "hidden" );
			el.appendChild( input ).setAttribute( "name", "D" );

			// Support: IE8
			// Enforce case-sensitivity of name attribute
			if ( el.querySelectorAll("[name=d]").length ) {
				rbuggyQSA.push( "name" + whitespace + "*[*^$|!~]?=" );
			}

			// FF 3.5 - :enabled/:disabled and hidden elements (hidden elements are still enabled)
			// IE8 throws error here and will not see later tests
			if ( el.querySelectorAll(":enabled").length !== 2 ) {
				rbuggyQSA.push( ":enabled", ":disabled" );
			}

			// Support: IE9-11+
			// IE's :disabled selector does not pick up the children of disabled fieldsets
			docElem.appendChild( el ).disabled = true;
			if ( el.querySelectorAll(":disabled").length !== 2 ) {
				rbuggyQSA.push( ":enabled", ":disabled" );
			}

			// Opera 10-11 does not throw on post-comma invalid pseudos
			el.querySelectorAll("*,:x");
			rbuggyQSA.push(",.*:");
		});
	}

	if ( (support.matchesSelector = rnative.test( (matches = docElem.matches ||
		docElem.webkitMatchesSelector ||
		docElem.mozMatchesSelector ||
		docElem.oMatchesSelector ||
		docElem.msMatchesSelector) )) ) {

		assert(function( el ) {
			// Check to see if it's possible to do matchesSelector
			// on a disconnected node (IE 9)
			support.disconnectedMatch = matches.call( el, "*" );

			// This should fail with an exception
			// Gecko does not error, returns false instead
			matches.call( el, "[s!='']:x" );
			rbuggyMatches.push( "!=", pseudos );
		});
	}

	rbuggyQSA = rbuggyQSA.length && new RegExp( rbuggyQSA.join("|") );
	rbuggyMatches = rbuggyMatches.length && new RegExp( rbuggyMatches.join("|") );

	/* Contains
	---------------------------------------------------------------------- */
	hasCompare = rnative.test( docElem.compareDocumentPosition );

	// Element contains another
	// Purposefully self-exclusive
	// As in, an element does not contain itself
	contains = hasCompare || rnative.test( docElem.contains ) ?
		function( a, b ) {
			var adown = a.nodeType === 9 ? a.documentElement : a,
				bup = b && b.parentNode;
			return a === bup || !!( bup && bup.nodeType === 1 && (
				adown.contains ?
					adown.contains( bup ) :
					a.compareDocumentPosition && a.compareDocumentPosition( bup ) & 16
			));
		} :
		function( a, b ) {
			if ( b ) {
				while ( (b = b.parentNode) ) {
					if ( b === a ) {
						return true;
					}
				}
			}
			return false;
		};

	/* Sorting
	---------------------------------------------------------------------- */

	// Document order sorting
	sortOrder = hasCompare ?
	function( a, b ) {

		// Flag for duplicate removal
		if ( a === b ) {
			hasDuplicate = true;
			return 0;
		}

		// Sort on method existence if only one input has compareDocumentPosition
		var compare = !a.compareDocumentPosition - !b.compareDocumentPosition;
		if ( compare ) {
			return compare;
		}

		// Calculate position if both inputs belong to the same document
		compare = ( a.ownerDocument || a ) === ( b.ownerDocument || b ) ?
			a.compareDocumentPosition( b ) :

			// Otherwise we know they are disconnected
			1;

		// Disconnected nodes
		if ( compare & 1 ||
			(!support.sortDetached && b.compareDocumentPosition( a ) === compare) ) {

			// Choose the first element that is related to our preferred document
			if ( a === document || a.ownerDocument === preferredDoc && contains(preferredDoc, a) ) {
				return -1;
			}
			if ( b === document || b.ownerDocument === preferredDoc && contains(preferredDoc, b) ) {
				return 1;
			}

			// Maintain original order
			return sortInput ?
				( indexOf( sortInput, a ) - indexOf( sortInput, b ) ) :
				0;
		}

		return compare & 4 ? -1 : 1;
	} :
	function( a, b ) {
		// Exit early if the nodes are identical
		if ( a === b ) {
			hasDuplicate = true;
			return 0;
		}

		var cur,
			i = 0,
			aup = a.parentNode,
			bup = b.parentNode,
			ap = [ a ],
			bp = [ b ];

		// Parentless nodes are either documents or disconnected
		if ( !aup || !bup ) {
			return a === document ? -1 :
				b === document ? 1 :
				aup ? -1 :
				bup ? 1 :
				sortInput ?
				( indexOf( sortInput, a ) - indexOf( sortInput, b ) ) :
				0;

		// If the nodes are siblings, we can do a quick check
		} else if ( aup === bup ) {
			return siblingCheck( a, b );
		}

		// Otherwise we need full lists of their ancestors for comparison
		cur = a;
		while ( (cur = cur.parentNode) ) {
			ap.unshift( cur );
		}
		cur = b;
		while ( (cur = cur.parentNode) ) {
			bp.unshift( cur );
		}

		// Walk down the tree looking for a discrepancy
		while ( ap[i] === bp[i] ) {
			i++;
		}

		return i ?
			// Do a sibling check if the nodes have a common ancestor
			siblingCheck( ap[i], bp[i] ) :

			// Otherwise nodes in our document sort first
			ap[i] === preferredDoc ? -1 :
			bp[i] === preferredDoc ? 1 :
			0;
	};

	return document;
};

Sizzle.matches = function( expr, elements ) {
	return Sizzle( expr, null, null, elements );
};

Sizzle.matchesSelector = function( elem, expr ) {
	// Set document vars if needed
	if ( ( elem.ownerDocument || elem ) !== document ) {
		setDocument( elem );
	}

	// Make sure that attribute selectors are quoted
	expr = expr.replace( rattributeQuotes, "='$1']" );

	if ( support.matchesSelector && documentIsHTML &&
		!compilerCache[ expr + " " ] &&
		( !rbuggyMatches || !rbuggyMatches.test( expr ) ) &&
		( !rbuggyQSA     || !rbuggyQSA.test( expr ) ) ) {

		try {
			var ret = matches.call( elem, expr );

			// IE 9's matchesSelector returns false on disconnected nodes
			if ( ret || support.disconnectedMatch ||
					// As well, disconnected nodes are said to be in a document
					// fragment in IE 9
					elem.document && elem.document.nodeType !== 11 ) {
				return ret;
			}
		} catch (e) {}
	}

	return Sizzle( expr, document, null, [ elem ] ).length > 0;
};

Sizzle.contains = function( context, elem ) {
	// Set document vars if needed
	if ( ( context.ownerDocument || context ) !== document ) {
		setDocument( context );
	}
	return contains( context, elem );
};

Sizzle.attr = function( elem, name ) {
	// Set document vars if needed
	if ( ( elem.ownerDocument || elem ) !== document ) {
		setDocument( elem );
	}

	var fn = Expr.attrHandle[ name.toLowerCase() ],
		// Don't get fooled by Object.prototype properties (jQuery #13807)
		val = fn && hasOwn.call( Expr.attrHandle, name.toLowerCase() ) ?
			fn( elem, name, !documentIsHTML ) :
			undefined;

	return val !== undefined ?
		val :
		support.attributes || !documentIsHTML ?
			elem.getAttribute( name ) :
			(val = elem.getAttributeNode(name)) && val.specified ?
				val.value :
				null;
};

Sizzle.escape = function( sel ) {
	return (sel + "").replace( rcssescape, fcssescape );
};

Sizzle.error = function( msg ) {
	throw new Error( "Syntax error, unrecognized expression: " + msg );
};

/**
 * Document sorting and removing duplicates
 * @param {ArrayLike} results
 */
Sizzle.uniqueSort = function( results ) {
	var elem,
		duplicates = [],
		j = 0,
		i = 0;

	// Unless we *know* we can detect duplicates, assume their presence
	hasDuplicate = !support.detectDuplicates;
	sortInput = !support.sortStable && results.slice( 0 );
	results.sort( sortOrder );

	if ( hasDuplicate ) {
		while ( (elem = results[i++]) ) {
			if ( elem === results[ i ] ) {
				j = duplicates.push( i );
			}
		}
		while ( j-- ) {
			results.splice( duplicates[ j ], 1 );
		}
	}

	// Clear input after sorting to release objects
	// See https://github.com/jquery/sizzle/pull/225
	sortInput = null;

	return results;
};

/**
 * Utility function for retrieving the text value of an array of DOM nodes
 * @param {Array|Element} elem
 */
getText = Sizzle.getText = function( elem ) {
	var node,
		ret = "",
		i = 0,
		nodeType = elem.nodeType;

	if ( !nodeType ) {
		// If no nodeType, this is expected to be an array
		while ( (node = elem[i++]) ) {
			// Do not traverse comment nodes
			ret += getText( node );
		}
	} else if ( nodeType === 1 || nodeType === 9 || nodeType === 11 ) {
		// Use textContent for elements
		// innerText usage removed for consistency of new lines (jQuery #11153)
		if ( typeof elem.textContent === "string" ) {
			return elem.textContent;
		} else {
			// Traverse its children
			for ( elem = elem.firstChild; elem; elem = elem.nextSibling ) {
				ret += getText( elem );
			}
		}
	} else if ( nodeType === 3 || nodeType === 4 ) {
		return elem.nodeValue;
	}
	// Do not include comment or processing instruction nodes

	return ret;
};

Expr = Sizzle.selectors = {

	// Can be adjusted by the user
	cacheLength: 50,

	createPseudo: markFunction,

	match: matchExpr,

	attrHandle: {},

	find: {},

	relative: {
		">": { dir: "parentNode", first: true },
		" ": { dir: "parentNode" },
		"+": { dir: "previousSibling", first: true },
		"~": { dir: "previousSibling" }
	},

	preFilter: {
		"ATTR": function( match ) {
			match[1] = match[1].replace( runescape, funescape );

			// Move the given value to match[3] whether quoted or unquoted
			match[3] = ( match[3] || match[4] || match[5] || "" ).replace( runescape, funescape );

			if ( match[2] === "~=" ) {
				match[3] = " " + match[3] + " ";
			}

			return match.slice( 0, 4 );
		},

		"CHILD": function( match ) {
			/* matches from matchExpr["CHILD"]
				1 type (only|nth|...)
				2 what (child|of-type)
				3 argument (even|odd|\d*|\d*n([+-]\d+)?|...)
				4 xn-component of xn+y argument ([+-]?\d*n|)
				5 sign of xn-component
				6 x of xn-component
				7 sign of y-component
				8 y of y-component
			*/
			match[1] = match[1].toLowerCase();

			if ( match[1].slice( 0, 3 ) === "nth" ) {
				// nth-* requires argument
				if ( !match[3] ) {
					Sizzle.error( match[0] );
				}

				// numeric x and y parameters for Expr.filter.CHILD
				// remember that false/true cast respectively to 0/1
				match[4] = +( match[4] ? match[5] + (match[6] || 1) : 2 * ( match[3] === "even" || match[3] === "odd" ) );
				match[5] = +( ( match[7] + match[8] ) || match[3] === "odd" );

			// other types prohibit arguments
			} else if ( match[3] ) {
				Sizzle.error( match[0] );
			}

			return match;
		},

		"PSEUDO": function( match ) {
			var excess,
				unquoted = !match[6] && match[2];

			if ( matchExpr["CHILD"].test( match[0] ) ) {
				return null;
			}

			// Accept quoted arguments as-is
			if ( match[3] ) {
				match[2] = match[4] || match[5] || "";

			// Strip excess characters from unquoted arguments
			} else if ( unquoted && rpseudo.test( unquoted ) &&
				// Get excess from tokenize (recursively)
				(excess = tokenize( unquoted, true )) &&
				// advance to the next closing parenthesis
				(excess = unquoted.indexOf( ")", unquoted.length - excess ) - unquoted.length) ) {

				// excess is a negative index
				match[0] = match[0].slice( 0, excess );
				match[2] = unquoted.slice( 0, excess );
			}

			// Return only captures needed by the pseudo filter method (type and argument)
			return match.slice( 0, 3 );
		}
	},

	filter: {

		"TAG": function( nodeNameSelector ) {
			var nodeName = nodeNameSelector.replace( runescape, funescape ).toLowerCase();
			return nodeNameSelector === "*" ?
				function() { return true; } :
				function( elem ) {
					return elem.nodeName && elem.nodeName.toLowerCase() === nodeName;
				};
		},

		"CLASS": function( className ) {
			var pattern = classCache[ className + " " ];

			return pattern ||
				(pattern = new RegExp( "(^|" + whitespace + ")" + className + "(" + whitespace + "|$)" )) &&
				classCache( className, function( elem ) {
					return pattern.test( typeof elem.className === "string" && elem.className || typeof elem.getAttribute !== "undefined" && elem.getAttribute("class") || "" );
				});
		},

		"ATTR": function( name, operator, check ) {
			return function( elem ) {
				var result = Sizzle.attr( elem, name );

				if ( result == null ) {
					return operator === "!=";
				}
				if ( !operator ) {
					return true;
				}

				result += "";

				return operator === "=" ? result === check :
					operator === "!=" ? result !== check :
					operator === "^=" ? check && result.indexOf( check ) === 0 :
					operator === "*=" ? check && result.indexOf( check ) > -1 :
					operator === "$=" ? check && result.slice( -check.length ) === check :
					operator === "~=" ? ( " " + result.replace( rwhitespace, " " ) + " " ).indexOf( check ) > -1 :
					operator === "|=" ? result === check || result.slice( 0, check.length + 1 ) === check + "-" :
					false;
			};
		},

		"CHILD": function( type, what, argument, first, last ) {
			var simple = type.slice( 0, 3 ) !== "nth",
				forward = type.slice( -4 ) !== "last",
				ofType = what === "of-type";

			return first === 1 && last === 0 ?

				// Shortcut for :nth-*(n)
				function( elem ) {
					return !!elem.parentNode;
				} :

				function( elem, context, xml ) {
					var cache, uniqueCache, outerCache, node, nodeIndex, start,
						dir = simple !== forward ? "nextSibling" : "previousSibling",
						parent = elem.parentNode,
						name = ofType && elem.nodeName.toLowerCase(),
						useCache = !xml && !ofType,
						diff = false;

					if ( parent ) {

						// :(first|last|only)-(child|of-type)
						if ( simple ) {
							while ( dir ) {
								node = elem;
								while ( (node = node[ dir ]) ) {
									if ( ofType ?
										node.nodeName.toLowerCase() === name :
										node.nodeType === 1 ) {

										return false;
									}
								}
								// Reverse direction for :only-* (if we haven't yet done so)
								start = dir = type === "only" && !start && "nextSibling";
							}
							return true;
						}

						start = [ forward ? parent.firstChild : parent.lastChild ];

						// non-xml :nth-child(...) stores cache data on `parent`
						if ( forward && useCache ) {

							// Seek `elem` from a previously-cached index

							// ...in a gzip-friendly way
							node = parent;
							outerCache = node[ expando ] || (node[ expando ] = {});

							// Support: IE <9 only
							// Defend against cloned attroperties (jQuery gh-1709)
							uniqueCache = outerCache[ node.uniqueID ] ||
								(outerCache[ node.uniqueID ] = {});

							cache = uniqueCache[ type ] || [];
							nodeIndex = cache[ 0 ] === dirruns && cache[ 1 ];
							diff = nodeIndex && cache[ 2 ];
							node = nodeIndex && parent.childNodes[ nodeIndex ];

							while ( (node = ++nodeIndex && node && node[ dir ] ||

								// Fallback to seeking `elem` from the start
								(diff = nodeIndex = 0) || start.pop()) ) {

								// When found, cache indexes on `parent` and break
								if ( node.nodeType === 1 && ++diff && node === elem ) {
									uniqueCache[ type ] = [ dirruns, nodeIndex, diff ];
									break;
								}
							}

						} else {
							// Use previously-cached element index if available
							if ( useCache ) {
								// ...in a gzip-friendly way
								node = elem;
								outerCache = node[ expando ] || (node[ expando ] = {});

								// Support: IE <9 only
								// Defend against cloned attroperties (jQuery gh-1709)
								uniqueCache = outerCache[ node.uniqueID ] ||
									(outerCache[ node.uniqueID ] = {});

								cache = uniqueCache[ type ] || [];
								nodeIndex = cache[ 0 ] === dirruns && cache[ 1 ];
								diff = nodeIndex;
							}

							// xml :nth-child(...)
							// or :nth-last-child(...) or :nth(-last)?-of-type(...)
							if ( diff === false ) {
								// Use the same loop as above to seek `elem` from the start
								while ( (node = ++nodeIndex && node && node[ dir ] ||
									(diff = nodeIndex = 0) || start.pop()) ) {

									if ( ( ofType ?
										node.nodeName.toLowerCase() === name :
										node.nodeType === 1 ) &&
										++diff ) {

										// Cache the index of each encountered element
										if ( useCache ) {
											outerCache = node[ expando ] || (node[ expando ] = {});

											// Support: IE <9 only
											// Defend against cloned attroperties (jQuery gh-1709)
											uniqueCache = outerCache[ node.uniqueID ] ||
												(outerCache[ node.uniqueID ] = {});

											uniqueCache[ type ] = [ dirruns, diff ];
										}

										if ( node === elem ) {
											break;
										}
									}
								}
							}
						}

						// Incorporate the offset, then check against cycle size
						diff -= last;
						return diff === first || ( diff % first === 0 && diff / first >= 0 );
					}
				};
		},

		"PSEUDO": function( pseudo, argument ) {
			// pseudo-class names are case-insensitive
			// http://www.w3.org/TR/selectors/#pseudo-classes
			// Prioritize by case sensitivity in case custom pseudos are added with uppercase letters
			// Remember that setFilters inherits from pseudos
			var args,
				fn = Expr.pseudos[ pseudo ] || Expr.setFilters[ pseudo.toLowerCase() ] ||
					Sizzle.error( "unsupported pseudo: " + pseudo );

			// The user may use createPseudo to indicate that
			// arguments are needed to create the filter function
			// just as Sizzle does
			if ( fn[ expando ] ) {
				return fn( argument );
			}

			// But maintain support for old signatures
			if ( fn.length > 1 ) {
				args = [ pseudo, pseudo, "", argument ];
				return Expr.setFilters.hasOwnProperty( pseudo.toLowerCase() ) ?
					markFunction(function( seed, matches ) {
						var idx,
							matched = fn( seed, argument ),
							i = matched.length;
						while ( i-- ) {
							idx = indexOf( seed, matched[i] );
							seed[ idx ] = !( matches[ idx ] = matched[i] );
						}
					}) :
					function( elem ) {
						return fn( elem, 0, args );
					};
			}

			return fn;
		}
	},

	pseudos: {
		// Potentially complex pseudos
		"not": markFunction(function( selector ) {
			// Trim the selector passed to compile
			// to avoid treating leading and trailing
			// spaces as combinators
			var input = [],
				results = [],
				matcher = compile( selector.replace( rtrim, "$1" ) );

			return matcher[ expando ] ?
				markFunction(function( seed, matches, context, xml ) {
					var elem,
						unmatched = matcher( seed, null, xml, [] ),
						i = seed.length;

					// Match elements unmatched by `matcher`
					while ( i-- ) {
						if ( (elem = unmatched[i]) ) {
							seed[i] = !(matches[i] = elem);
						}
					}
				}) :
				function( elem, context, xml ) {
					input[0] = elem;
					matcher( input, null, xml, results );
					// Don't keep the element (issue #299)
					input[0] = null;
					return !results.pop();
				};
		}),

		"has": markFunction(function( selector ) {
			return function( elem ) {
				return Sizzle( selector, elem ).length > 0;
			};
		}),

		"contains": markFunction(function( text ) {
			text = text.replace( runescape, funescape );
			return function( elem ) {
				return ( elem.textContent || elem.innerText || getText( elem ) ).indexOf( text ) > -1;
			};
		}),

		// "Whether an element is represented by a :lang() selector
		// is based solely on the element's language value
		// being equal to the identifier C,
		// or beginning with the identifier C immediately followed by "-".
		// The matching of C against the element's language value is performed case-insensitively.
		// The identifier C does not have to be a valid language name."
		// http://www.w3.org/TR/selectors/#lang-pseudo
		"lang": markFunction( function( lang ) {
			// lang value must be a valid identifier
			if ( !ridentifier.test(lang || "") ) {
				Sizzle.error( "unsupported lang: " + lang );
			}
			lang = lang.replace( runescape, funescape ).toLowerCase();
			return function( elem ) {
				var elemLang;
				do {
					if ( (elemLang = documentIsHTML ?
						elem.lang :
						elem.getAttribute("xml:lang") || elem.getAttribute("lang")) ) {

						elemLang = elemLang.toLowerCase();
						return elemLang === lang || elemLang.indexOf( lang + "-" ) === 0;
					}
				} while ( (elem = elem.parentNode) && elem.nodeType === 1 );
				return false;
			};
		}),

		// Miscellaneous
		"target": function( elem ) {
			var hash = window.location && window.location.hash;
			return hash && hash.slice( 1 ) === elem.id;
		},

		"root": function( elem ) {
			return elem === docElem;
		},

		"focus": function( elem ) {
			return elem === document.activeElement && (!document.hasFocus || document.hasFocus()) && !!(elem.type || elem.href || ~elem.tabIndex);
		},

		// Boolean properties
		"enabled": createDisabledPseudo( false ),
		"disabled": createDisabledPseudo( true ),

		"checked": function( elem ) {
			// In CSS3, :checked should return both checked and selected elements
			// http://www.w3.org/TR/2011/REC-css3-selectors-20110929/#checked
			var nodeName = elem.nodeName.toLowerCase();
			return (nodeName === "input" && !!elem.checked) || (nodeName === "option" && !!elem.selected);
		},

		"selected": function( elem ) {
			// Accessing this property makes selected-by-default
			// options in Safari work properly
			if ( elem.parentNode ) {
				elem.parentNode.selectedIndex;
			}

			return elem.selected === true;
		},

		// Contents
		"empty": function( elem ) {
			// http://www.w3.org/TR/selectors/#empty-pseudo
			// :empty is negated by element (1) or content nodes (text: 3; cdata: 4; entity ref: 5),
			//   but not by others (comment: 8; processing instruction: 7; etc.)
			// nodeType < 6 works because attributes (2) do not appear as children
			for ( elem = elem.firstChild; elem; elem = elem.nextSibling ) {
				if ( elem.nodeType < 6 ) {
					return false;
				}
			}
			return true;
		},

		"parent": function( elem ) {
			return !Expr.pseudos["empty"]( elem );
		},

		// Element/input types
		"header": function( elem ) {
			return rheader.test( elem.nodeName );
		},

		"input": function( elem ) {
			return rinputs.test( elem.nodeName );
		},

		"button": function( elem ) {
			var name = elem.nodeName.toLowerCase();
			return name === "input" && elem.type === "button" || name === "button";
		},

		"text": function( elem ) {
			var attr;
			return elem.nodeName.toLowerCase() === "input" &&
				elem.type === "text" &&

				// Support: IE<8
				// New HTML5 attribute values (e.g., "search") appear with elem.type === "text"
				( (attr = elem.getAttribute("type")) == null || attr.toLowerCase() === "text" );
		},

		// Position-in-collection
		"first": createPositionalPseudo(function() {
			return [ 0 ];
		}),

		"last": createPositionalPseudo(function( matchIndexes, length ) {
			return [ length - 1 ];
		}),

		"eq": createPositionalPseudo(function( matchIndexes, length, argument ) {
			return [ argument < 0 ? argument + length : argument ];
		}),

		"even": createPositionalPseudo(function( matchIndexes, length ) {
			var i = 0;
			for ( ; i < length; i += 2 ) {
				matchIndexes.push( i );
			}
			return matchIndexes;
		}),

		"odd": createPositionalPseudo(function( matchIndexes, length ) {
			var i = 1;
			for ( ; i < length; i += 2 ) {
				matchIndexes.push( i );
			}
			return matchIndexes;
		}),

		"lt": createPositionalPseudo(function( matchIndexes, length, argument ) {
			var i = argument < 0 ? argument + length : argument;
			for ( ; --i >= 0; ) {
				matchIndexes.push( i );
			}
			return matchIndexes;
		}),

		"gt": createPositionalPseudo(function( matchIndexes, length, argument ) {
			var i = argument < 0 ? argument + length : argument;
			for ( ; ++i < length; ) {
				matchIndexes.push( i );
			}
			return matchIndexes;
		})
	}
};

Expr.pseudos["nth"] = Expr.pseudos["eq"];

// Add button/input type pseudos
for ( i in { radio: true, checkbox: true, file: true, password: true, image: true } ) {
	Expr.pseudos[ i ] = createInputPseudo( i );
}
for ( i in { submit: true, reset: true } ) {
	Expr.pseudos[ i ] = createButtonPseudo( i );
}

// Easy API for creating new setFilters
function setFilters() {}
setFilters.prototype = Expr.filters = Expr.pseudos;
Expr.setFilters = new setFilters();

tokenize = Sizzle.tokenize = function( selector, parseOnly ) {
	var matched, match, tokens, type,
		soFar, groups, preFilters,
		cached = tokenCache[ selector + " " ];

	if ( cached ) {
		return parseOnly ? 0 : cached.slice( 0 );
	}

	soFar = selector;
	groups = [];
	preFilters = Expr.preFilter;

	while ( soFar ) {

		// Comma and first run
		if ( !matched || (match = rcomma.exec( soFar )) ) {
			if ( match ) {
				// Don't consume trailing commas as valid
				soFar = soFar.slice( match[0].length ) || soFar;
			}
			groups.push( (tokens = []) );
		}

		matched = false;

		// Combinators
		if ( (match = rcombinators.exec( soFar )) ) {
			matched = match.shift();
			tokens.push({
				value: matched,
				// Cast descendant combinators to space
				type: match[0].replace( rtrim, " " )
			});
			soFar = soFar.slice( matched.length );
		}

		// Filters
		for ( type in Expr.filter ) {
			if ( (match = matchExpr[ type ].exec( soFar )) && (!preFilters[ type ] ||
				(match = preFilters[ type ]( match ))) ) {
				matched = match.shift();
				tokens.push({
					value: matched,
					type: type,
					matches: match
				});
				soFar = soFar.slice( matched.length );
			}
		}

		if ( !matched ) {
			break;
		}
	}

	// Return the length of the invalid excess
	// if we're just parsing
	// Otherwise, throw an error or return tokens
	return parseOnly ?
		soFar.length :
		soFar ?
			Sizzle.error( selector ) :
			// Cache the tokens
			tokenCache( selector, groups ).slice( 0 );
};

function toSelector( tokens ) {
	var i = 0,
		len = tokens.length,
		selector = "";
	for ( ; i < len; i++ ) {
		selector += tokens[i].value;
	}
	return selector;
}

function addCombinator( matcher, combinator, base ) {
	var dir = combinator.dir,
		skip = combinator.next,
		key = skip || dir,
		checkNonElements = base && key === "parentNode",
		doneName = done++;

	return combinator.first ?
		// Check against closest ancestor/preceding element
		function( elem, context, xml ) {
			while ( (elem = elem[ dir ]) ) {
				if ( elem.nodeType === 1 || checkNonElements ) {
					return matcher( elem, context, xml );
				}
			}
			return false;
		} :

		// Check against all ancestor/preceding elements
		function( elem, context, xml ) {
			var oldCache, uniqueCache, outerCache,
				newCache = [ dirruns, doneName ];

			// We can't set arbitrary data on XML nodes, so they don't benefit from combinator caching
			if ( xml ) {
				while ( (elem = elem[ dir ]) ) {
					if ( elem.nodeType === 1 || checkNonElements ) {
						if ( matcher( elem, context, xml ) ) {
							return true;
						}
					}
				}
			} else {
				while ( (elem = elem[ dir ]) ) {
					if ( elem.nodeType === 1 || checkNonElements ) {
						outerCache = elem[ expando ] || (elem[ expando ] = {});

						// Support: IE <9 only
						// Defend against cloned attroperties (jQuery gh-1709)
						uniqueCache = outerCache[ elem.uniqueID ] || (outerCache[ elem.uniqueID ] = {});

						if ( skip && skip === elem.nodeName.toLowerCase() ) {
							elem = elem[ dir ] || elem;
						} else if ( (oldCache = uniqueCache[ key ]) &&
							oldCache[ 0 ] === dirruns && oldCache[ 1 ] === doneName ) {

							// Assign to newCache so results back-propagate to previous elements
							return (newCache[ 2 ] = oldCache[ 2 ]);
						} else {
							// Reuse newcache so results back-propagate to previous elements
							uniqueCache[ key ] = newCache;

							// A match means we're done; a fail means we have to keep checking
							if ( (newCache[ 2 ] = matcher( elem, context, xml )) ) {
								return true;
							}
						}
					}
				}
			}
			return false;
		};
}

function elementMatcher( matchers ) {
	return matchers.length > 1 ?
		function( elem, context, xml ) {
			var i = matchers.length;
			while ( i-- ) {
				if ( !matchers[i]( elem, context, xml ) ) {
					return false;
				}
			}
			return true;
		} :
		matchers[0];
}

function multipleContexts( selector, contexts, results ) {
	var i = 0,
		len = contexts.length;
	for ( ; i < len; i++ ) {
		Sizzle( selector, contexts[i], results );
	}
	return results;
}

function condense( unmatched, map, filter, context, xml ) {
	var elem,
		newUnmatched = [],
		i = 0,
		len = unmatched.length,
		mapped = map != null;

	for ( ; i < len; i++ ) {
		if ( (elem = unmatched[i]) ) {
			if ( !filter || filter( elem, context, xml ) ) {
				newUnmatched.push( elem );
				if ( mapped ) {
					map.push( i );
				}
			}
		}
	}

	return newUnmatched;
}

function setMatcher( preFilter, selector, matcher, postFilter, postFinder, postSelector ) {
	if ( postFilter && !postFilter[ expando ] ) {
		postFilter = setMatcher( postFilter );
	}
	if ( postFinder && !postFinder[ expando ] ) {
		postFinder = setMatcher( postFinder, postSelector );
	}
	return markFunction(function( seed, results, context, xml ) {
		var temp, i, elem,
			preMap = [],
			postMap = [],
			preexisting = results.length,

			// Get initial elements from seed or context
			elems = seed || multipleContexts( selector || "*", context.nodeType ? [ context ] : context, [] ),

			// Prefilter to get matcher input, preserving a map for seed-results synchronization
			matcherIn = preFilter && ( seed || !selector ) ?
				condense( elems, preMap, preFilter, context, xml ) :
				elems,

			matcherOut = matcher ?
				// If we have a postFinder, or filtered seed, or non-seed postFilter or preexisting results,
				postFinder || ( seed ? preFilter : preexisting || postFilter ) ?

					// ...intermediate processing is necessary
					[] :

					// ...otherwise use results directly
					results :
				matcherIn;

		// Find primary matches
		if ( matcher ) {
			matcher( matcherIn, matcherOut, context, xml );
		}

		// Apply postFilter
		if ( postFilter ) {
			temp = condense( matcherOut, postMap );
			postFilter( temp, [], context, xml );

			// Un-match failing elements by moving them back to matcherIn
			i = temp.length;
			while ( i-- ) {
				if ( (elem = temp[i]) ) {
					matcherOut[ postMap[i] ] = !(matcherIn[ postMap[i] ] = elem);
				}
			}
		}

		if ( seed ) {
			if ( postFinder || preFilter ) {
				if ( postFinder ) {
					// Get the final matcherOut by condensing this intermediate into postFinder contexts
					temp = [];
					i = matcherOut.length;
					while ( i-- ) {
						if ( (elem = matcherOut[i]) ) {
							// Restore matcherIn since elem is not yet a final match
							temp.push( (matcherIn[i] = elem) );
						}
					}
					postFinder( null, (matcherOut = []), temp, xml );
				}

				// Move matched elements from seed to results to keep them synchronized
				i = matcherOut.length;
				while ( i-- ) {
					if ( (elem = matcherOut[i]) &&
						(temp = postFinder ? indexOf( seed, elem ) : preMap[i]) > -1 ) {

						seed[temp] = !(results[temp] = elem);
					}
				}
			}

		// Add elements to results, through postFinder if defined
		} else {
			matcherOut = condense(
				matcherOut === results ?
					matcherOut.splice( preexisting, matcherOut.length ) :
					matcherOut
			);
			if ( postFinder ) {
				postFinder( null, results, matcherOut, xml );
			} else {
				push.apply( results, matcherOut );
			}
		}
	});
}

function matcherFromTokens( tokens ) {
	var checkContext, matcher, j,
		len = tokens.length,
		leadingRelative = Expr.relative[ tokens[0].type ],
		implicitRelative = leadingRelative || Expr.relative[" "],
		i = leadingRelative ? 1 : 0,

		// The foundational matcher ensures that elements are reachable from top-level context(s)
		matchContext = addCombinator( function( elem ) {
			return elem === checkContext;
		}, implicitRelative, true ),
		matchAnyContext = addCombinator( function( elem ) {
			return indexOf( checkContext, elem ) > -1;
		}, implicitRelative, true ),
		matchers = [ function( elem, context, xml ) {
			var ret = ( !leadingRelative && ( xml || context !== outermostContext ) ) || (
				(checkContext = context).nodeType ?
					matchContext( elem, context, xml ) :
					matchAnyContext( elem, context, xml ) );
			// Avoid hanging onto element (issue #299)
			checkContext = null;
			return ret;
		} ];

	for ( ; i < len; i++ ) {
		if ( (matcher = Expr.relative[ tokens[i].type ]) ) {
			matchers = [ addCombinator(elementMatcher( matchers ), matcher) ];
		} else {
			matcher = Expr.filter[ tokens[i].type ].apply( null, tokens[i].matches );

			// Return special upon seeing a positional matcher
			if ( matcher[ expando ] ) {
				// Find the next relative operator (if any) for proper handling
				j = ++i;
				for ( ; j < len; j++ ) {
					if ( Expr.relative[ tokens[j].type ] ) {
						break;
					}
				}
				return setMatcher(
					i > 1 && elementMatcher( matchers ),
					i > 1 && toSelector(
						// If the preceding token was a descendant combinator, insert an implicit any-element `*`
						tokens.slice( 0, i - 1 ).concat({ value: tokens[ i - 2 ].type === " " ? "*" : "" })
					).replace( rtrim, "$1" ),
					matcher,
					i < j && matcherFromTokens( tokens.slice( i, j ) ),
					j < len && matcherFromTokens( (tokens = tokens.slice( j )) ),
					j < len && toSelector( tokens )
				);
			}
			matchers.push( matcher );
		}
	}

	return elementMatcher( matchers );
}

function matcherFromGroupMatchers( elementMatchers, setMatchers ) {
	var bySet = setMatchers.length > 0,
		byElement = elementMatchers.length > 0,
		superMatcher = function( seed, context, xml, results, outermost ) {
			var elem, j, matcher,
				matchedCount = 0,
				i = "0",
				unmatched = seed && [],
				setMatched = [],
				contextBackup = outermostContext,
				// We must always have either seed elements or outermost context
				elems = seed || byElement && Expr.find["TAG"]( "*", outermost ),
				// Use integer dirruns iff this is the outermost matcher
				dirrunsUnique = (dirruns += contextBackup == null ? 1 : Math.random() || 0.1),
				len = elems.length;

			if ( outermost ) {
				outermostContext = context === document || context || outermost;
			}

			// Add elements passing elementMatchers directly to results
			// Support: IE<9, Safari
			// Tolerate NodeList properties (IE: "length"; Safari: <number>) matching elements by id
			for ( ; i !== len && (elem = elems[i]) != null; i++ ) {
				if ( byElement && elem ) {
					j = 0;
					if ( !context && elem.ownerDocument !== document ) {
						setDocument( elem );
						xml = !documentIsHTML;
					}
					while ( (matcher = elementMatchers[j++]) ) {
						if ( matcher( elem, context || document, xml) ) {
							results.push( elem );
							break;
						}
					}
					if ( outermost ) {
						dirruns = dirrunsUnique;
					}
				}

				// Track unmatched elements for set filters
				if ( bySet ) {
					// They will have gone through all possible matchers
					if ( (elem = !matcher && elem) ) {
						matchedCount--;
					}

					// Lengthen the array for every element, matched or not
					if ( seed ) {
						unmatched.push( elem );
					}
				}
			}

			// `i` is now the count of elements visited above, and adding it to `matchedCount`
			// makes the latter nonnegative.
			matchedCount += i;

			// Apply set filters to unmatched elements
			// NOTE: This can be skipped if there are no unmatched elements (i.e., `matchedCount`
			// equals `i`), unless we didn't visit _any_ elements in the above loop because we have
			// no element matchers and no seed.
			// Incrementing an initially-string "0" `i` allows `i` to remain a string only in that
			// case, which will result in a "00" `matchedCount` that differs from `i` but is also
			// numerically zero.
			if ( bySet && i !== matchedCount ) {
				j = 0;
				while ( (matcher = setMatchers[j++]) ) {
					matcher( unmatched, setMatched, context, xml );
				}

				if ( seed ) {
					// Reintegrate element matches to eliminate the need for sorting
					if ( matchedCount > 0 ) {
						while ( i-- ) {
							if ( !(unmatched[i] || setMatched[i]) ) {
								setMatched[i] = pop.call( results );
							}
						}
					}

					// Discard index placeholder values to get only actual matches
					setMatched = condense( setMatched );
				}

				// Add matches to results
				push.apply( results, setMatched );

				// Seedless set matches succeeding multiple successful matchers stipulate sorting
				if ( outermost && !seed && setMatched.length > 0 &&
					( matchedCount + setMatchers.length ) > 1 ) {

					Sizzle.uniqueSort( results );
				}
			}

			// Override manipulation of globals by nested matchers
			if ( outermost ) {
				dirruns = dirrunsUnique;
				outermostContext = contextBackup;
			}

			return unmatched;
		};

	return bySet ?
		markFunction( superMatcher ) :
		superMatcher;
}

compile = Sizzle.compile = function( selector, match /* Internal Use Only */ ) {
	var i,
		setMatchers = [],
		elementMatchers = [],
		cached = compilerCache[ selector + " " ];

	if ( !cached ) {
		// Generate a function of recursive functions that can be used to check each element
		if ( !match ) {
			match = tokenize( selector );
		}
		i = match.length;
		while ( i-- ) {
			cached = matcherFromTokens( match[i] );
			if ( cached[ expando ] ) {
				setMatchers.push( cached );
			} else {
				elementMatchers.push( cached );
			}
		}

		// Cache the compiled function
		cached = compilerCache( selector, matcherFromGroupMatchers( elementMatchers, setMatchers ) );

		// Save selector and tokenization
		cached.selector = selector;
	}
	return cached;
};

/**
 * A low-level selection function that works with Sizzle's compiled
 *  selector functions
 * @param {String|Function} selector A selector or a pre-compiled
 *  selector function built with Sizzle.compile
 * @param {Element} context
 * @param {Array} [results]
 * @param {Array} [seed] A set of elements to match against
 */
select = Sizzle.select = function( selector, context, results, seed ) {
	var i, tokens, token, type, find,
		compiled = typeof selector === "function" && selector,
		match = !seed && tokenize( (selector = compiled.selector || selector) );

	results = results || [];

	// Try to minimize operations if there is only one selector in the list and no seed
	// (the latter of which guarantees us context)
	if ( match.length === 1 ) {

		// Reduce context if the leading compound selector is an ID
		tokens = match[0] = match[0].slice( 0 );
		if ( tokens.length > 2 && (token = tokens[0]).type === "ID" &&
				context.nodeType === 9 && documentIsHTML && Expr.relative[ tokens[1].type ] ) {

			context = ( Expr.find["ID"]( token.matches[0].replace(runescape, funescape), context ) || [] )[0];
			if ( !context ) {
				return results;

			// Precompiled matchers will still verify ancestry, so step up a level
			} else if ( compiled ) {
				context = context.parentNode;
			}

			selector = selector.slice( tokens.shift().value.length );
		}

		// Fetch a seed set for right-to-left matching
		i = matchExpr["needsContext"].test( selector ) ? 0 : tokens.length;
		while ( i-- ) {
			token = tokens[i];

			// Abort if we hit a combinator
			if ( Expr.relative[ (type = token.type) ] ) {
				break;
			}
			if ( (find = Expr.find[ type ]) ) {
				// Search, expanding context for leading sibling combinators
				if ( (seed = find(
					token.matches[0].replace( runescape, funescape ),
					rsibling.test( tokens[0].type ) && testContext( context.parentNode ) || context
				)) ) {

					// If seed is empty or no tokens remain, we can return early
					tokens.splice( i, 1 );
					selector = seed.length && toSelector( tokens );
					if ( !selector ) {
						push.apply( results, seed );
						return results;
					}

					break;
				}
			}
		}
	}

	// Compile and execute a filtering function if one is not provided
	// Provide `match` to avoid retokenization if we modified the selector above
	( compiled || compile( selector, match ) )(
		seed,
		context,
		!documentIsHTML,
		results,
		!context || rsibling.test( selector ) && testContext( context.parentNode ) || context
	);
	return results;
};

// One-time assignments

// Sort stability
support.sortStable = expando.split("").sort( sortOrder ).join("") === expando;

// Support: Chrome 14-35+
// Always assume duplicates if they aren't passed to the comparison function
support.detectDuplicates = !!hasDuplicate;

// Initialize against the default document
setDocument();

// Support: Webkit<537.32 - Safari 6.0.3/Chrome 25 (fixed in Chrome 27)
// Detached nodes confoundingly follow *each other*
support.sortDetached = assert(function( el ) {
	// Should return 1, but returns 4 (following)
	return el.compareDocumentPosition( document.createElement("fieldset") ) & 1;
});

// Support: IE<8
// Prevent attribute/property "interpolation"
// https://msdn.microsoft.com/en-us/library/ms536429%28VS.85%29.aspx
if ( !assert(function( el ) {
	el.innerHTML = "<a href='#'></a>";
	return el.firstChild.getAttribute("href") === "#" ;
}) ) {
	addHandle( "type|href|height|width", function( elem, name, isXML ) {
		if ( !isXML ) {
			return elem.getAttribute( name, name.toLowerCase() === "type" ? 1 : 2 );
		}
	});
}

// Support: IE<9
// Use defaultValue in place of getAttribute("value")
if ( !support.attributes || !assert(function( el ) {
	el.innerHTML = "<input/>";
	el.firstChild.setAttribute( "value", "" );
	return el.firstChild.getAttribute( "value" ) === "";
}) ) {
	addHandle( "value", function( elem, name, isXML ) {
		if ( !isXML && elem.nodeName.toLowerCase() === "input" ) {
			return elem.defaultValue;
		}
	});
}

// Support: IE<9
// Use getAttributeNode to fetch booleans when getAttribute lies
if ( !assert(function( el ) {
	return el.getAttribute("disabled") == null;
}) ) {
	addHandle( booleans, function( elem, name, isXML ) {
		var val;
		if ( !isXML ) {
			return elem[ name ] === true ? name.toLowerCase() :
					(val = elem.getAttributeNode( name )) && val.specified ?
					val.value :
				null;
		}
	});
}

return Sizzle;

})( window );



jQuery.find = Sizzle;
jQuery.expr = Sizzle.selectors;

// Deprecated
jQuery.expr[ ":" ] = jQuery.expr.pseudos;
jQuery.uniqueSort = jQuery.unique = Sizzle.uniqueSort;
jQuery.text = Sizzle.getText;
jQuery.isXMLDoc = Sizzle.isXML;
jQuery.contains = Sizzle.contains;
jQuery.escapeSelector = Sizzle.escape;




var dir = function( elem, dir, until ) {
	var matched = [],
		truncate = until !== undefined;

	while ( ( elem = elem[ dir ] ) && elem.nodeType !== 9 ) {
		if ( elem.nodeType === 1 ) {
			if ( truncate && jQuery( elem ).is( until ) ) {
				break;
			}
			matched.push( elem );
		}
	}
	return matched;
};


var siblings = function( n, elem ) {
	var matched = [];

	for ( ; n; n = n.nextSibling ) {
		if ( n.nodeType === 1 && n !== elem ) {
			matched.push( n );
		}
	}

	return matched;
};


var rneedsContext = jQuery.expr.match.needsContext;



function nodeName( elem, name ) {

  return elem.nodeName && elem.nodeName.toLowerCase() === name.toLowerCase();

};
var rsingleTag = ( /^<([a-z][^\/\0>:\x20\t\r\n\f]*)[\x20\t\r\n\f]*\/?>(?:<\/\1>|)$/i );



// Implement the identical functionality for filter and not
function winnow( elements, qualifier, not ) {
	if ( isFunction( qualifier ) ) {
		return jQuery.grep( elements, function( elem, i ) {
			return !!qualifier.call( elem, i, elem ) !== not;
		} );
	}

	// Single element
	if ( qualifier.nodeType ) {
		return jQuery.grep( elements, function( elem ) {
			return ( elem === qualifier ) !== not;
		} );
	}

	// Arraylike of elements (jQuery, arguments, Array)
	if ( typeof qualifier !== "string" ) {
		return jQuery.grep( elements, function( elem ) {
			return ( indexOf.call( qualifier, elem ) > -1 ) !== not;
		} );
	}

	// Filtered directly for both simple and complex selectors
	return jQuery.filter( qualifier, elements, not );
}

jQuery.filter = function( expr, elems, not ) {
	var elem = elems[ 0 ];

	if ( not ) {
		expr = ":not(" + expr + ")";
	}

	if ( elems.length === 1 && elem.nodeType === 1 ) {
		return jQuery.find.matchesSelector( elem, expr ) ? [ elem ] : [];
	}

	return jQuery.find.matches( expr, jQuery.grep( elems, function( elem ) {
		return elem.nodeType === 1;
	} ) );
};

jQuery.fn.extend( {
	find: function( selector ) {
		var i, ret,
			len = this.length,
			self = this;

		if ( typeof selector !== "string" ) {
			return this.pushStack( jQuery( selector ).filter( function() {
				for ( i = 0; i < len; i++ ) {
					if ( jQuery.contains( self[ i ], this ) ) {
						return true;
					}
				}
			} ) );
		}

		ret = this.pushStack( [] );

		for ( i = 0; i < len; i++ ) {
			jQuery.find( selector, self[ i ], ret );
		}

		return len > 1 ? jQuery.uniqueSort( ret ) : ret;
	},
	filter: function( selector ) {
		return this.pushStack( winnow( this, selector || [], false ) );
	},
	not: function( selector ) {
		return this.pushStack( winnow( this, selector || [], true ) );
	},
	is: function( selector ) {
		return !!winnow(
			this,

			// If this is a positional/relative selector, check membership in the returned set
			// so $("p:first").is("p:last") won't return true for a doc with two "p".
			typeof selector === "string" && rneedsContext.test( selector ) ?
				jQuery( selector ) :
				selector || [],
			false
		).length;
	}
} );


// Initialize a jQuery object


// A central reference to the root jQuery(document)
var rootjQuery,

	// A simple way to check for HTML strings
	// Prioritize #id over <tag> to avoid XSS via location.hash (#9521)
	// Strict HTML recognition (#11290: must start with <)
	// Shortcut simple #id case for speed
	rquickExpr = /^(?:\s*(<[\w\W]+>)[^>]*|#([\w-]+))$/,

	init = jQuery.fn.init = function( selector, context, root ) {
		var match, elem;

		// HANDLE: $(""), $(null), $(undefined), $(false)
		if ( !selector ) {
			return this;
		}

		// Method init() accepts an alternate rootjQuery
		// so migrate can support jQuery.sub (gh-2101)
		root = root || rootjQuery;

		// Handle HTML strings
		if ( typeof selector === "string" ) {
			if ( selector[ 0 ] === "<" &&
				selector[ selector.length - 1 ] === ">" &&
				selector.length >= 3 ) {

				// Assume that strings that start and end with <> are HTML and skip the regex check
				match = [ null, selector, null ];

			} else {
				match = rquickExpr.exec( selector );
			}

			// Match html or make sure no context is specified for #id
			if ( match && ( match[ 1 ] || !context ) ) {

				// HANDLE: $(html) -> $(array)
				if ( match[ 1 ] ) {
					context = context instanceof jQuery ? context[ 0 ] : context;

					// Option to run scripts is true for back-compat
					// Intentionally let the error be thrown if parseHTML is not present
					jQuery.merge( this, jQuery.parseHTML(
						match[ 1 ],
						context && context.nodeType ? context.ownerDocument || context : document,
						true
					) );

					// HANDLE: $(html, props)
					if ( rsingleTag.test( match[ 1 ] ) && jQuery.isPlainObject( context ) ) {
						for ( match in context ) {

							// Properties of context are called as methods if possible
							if ( isFunction( this[ match ] ) ) {
								this[ match ]( context[ match ] );

							// ...and otherwise set as attributes
							} else {
								this.attr( match, context[ match ] );
							}
						}
					}

					return this;

				// HANDLE: $(#id)
				} else {
					elem = document.getElementById( match[ 2 ] );

					if ( elem ) {

						// Inject the element directly into the jQuery object
						this[ 0 ] = elem;
						this.length = 1;
					}
					return this;
				}

			// HANDLE: $(expr, $(...))
			} else if ( !context || context.jquery ) {
				return ( context || root ).find( selector );

			// HANDLE: $(expr, context)
			// (which is just equivalent to: $(context).find(expr)
			} else {
				return this.constructor( context ).find( selector );
			}

		// HANDLE: $(DOMElement)
		} else if ( selector.nodeType ) {
			this[ 0 ] = selector;
			this.length = 1;
			return this;

		// HANDLE: $(function)
		// Shortcut for document ready
		} else if ( isFunction( selector ) ) {
			return root.ready !== undefined ?
				root.ready( selector ) :

				// Execute immediately if ready is not present
				selector( jQuery );
		}

		return jQuery.makeArray( selector, this );
	};

// Give the init function the jQuery prototype for later instantiation
init.prototype = jQuery.fn;

// Initialize central reference
rootjQuery = jQuery( document );


var rparentsprev = /^(?:parents|prev(?:Until|All))/,

	// Methods guaranteed to produce a unique set when starting from a unique set
	guaranteedUnique = {
		children: true,
		contents: true,
		next: true,
		prev: true
	};

jQuery.fn.extend( {
	has: function( target ) {
		var targets = jQuery( target, this ),
			l = targets.length;

		return this.filter( function() {
			var i = 0;
			for ( ; i < l; i++ ) {
				if ( jQuery.contains( this, targets[ i ] ) ) {
					return true;
				}
			}
		} );
	},

	closest: function( selectors, context ) {
		var cur,
			i = 0,
			l = this.length,
			matched = [],
			targets = typeof selectors !== "string" && jQuery( selectors );

		// Positional selectors never match, since there's no _selection_ context
		if ( !rneedsContext.test( selectors ) ) {
			for ( ; i < l; i++ ) {
				for ( cur = this[ i ]; cur && cur !== context; cur = cur.parentNode ) {

					// Always skip document fragments
					if ( cur.nodeType < 11 && ( targets ?
						targets.index( cur ) > -1 :

						// Don't pass non-elements to Sizzle
						cur.nodeType === 1 &&
							jQuery.find.matchesSelector( cur, selectors ) ) ) {

						matched.push( cur );
						break;
					}
				}
			}
		}

		return this.pushStack( matched.length > 1 ? jQuery.uniqueSort( matched ) : matched );
	},

	// Determine the position of an element within the set
	index: function( elem ) {

		// No argument, return index in parent
		if ( !elem ) {
			return ( this[ 0 ] && this[ 0 ].parentNode ) ? this.first().prevAll().length : -1;
		}

		// Index in selector
		if ( typeof elem === "string" ) {
			return indexOf.call( jQuery( elem ), this[ 0 ] );
		}

		// Locate the position of the desired element
		return indexOf.call( this,

			// If it receives a jQuery object, the first element is used
			elem.jquery ? elem[ 0 ] : elem
		);
	},

	add: function( selector, context ) {
		return this.pushStack(
			jQuery.uniqueSort(
				jQuery.merge( this.get(), jQuery( selector, context ) )
			)
		);
	},

	addBack: function( selector ) {
		return this.add( selector == null ?
			this.prevObject : this.prevObject.filter( selector )
		);
	}
} );

function sibling( cur, dir ) {
	while ( ( cur = cur[ dir ] ) && cur.nodeType !== 1 ) {}
	return cur;
}

jQuery.each( {
	parent: function( elem ) {
		var parent = elem.parentNode;
		return parent && parent.nodeType !== 11 ? parent : null;
	},
	parents: function( elem ) {
		return dir( elem, "parentNode" );
	},
	parentsUntil: function( elem, i, until ) {
		return dir( elem, "parentNode", until );
	},
	next: function( elem ) {
		return sibling( elem, "nextSibling" );
	},
	prev: function( elem ) {
		return sibling( elem, "previousSibling" );
	},
	nextAll: function( elem ) {
		return dir( elem, "nextSibling" );
	},
	prevAll: function( elem ) {
		return dir( elem, "previousSibling" );
	},
	nextUntil: function( elem, i, until ) {
		return dir( elem, "nextSibling", until );
	},
	prevUntil: function( elem, i, until ) {
		return dir( elem, "previousSibling", until );
	},
	siblings: function( elem ) {
		return siblings( ( elem.parentNode || {} ).firstChild, elem );
	},
	children: function( elem ) {
		return siblings( elem.firstChild );
	},
	contents: function( elem ) {
        if ( nodeName( elem, "iframe" ) ) {
            return elem.contentDocument;
        }

        // Support: IE 9 - 11 only, iOS 7 only, Android Browser <=4.3 only
        // Treat the template element as a regular one in browsers that
        // don't support it.
        if ( nodeName( elem, "template" ) ) {
            elem = elem.content || elem;
        }

        return jQuery.merge( [], elem.childNodes );
	}
}, function( name, fn ) {
	jQuery.fn[ name ] = function( until, selector ) {
		var matched = jQuery.map( this, fn, until );

		if ( name.slice( -5 ) !== "Until" ) {
			selector = until;
		}

		if ( selector && typeof selector === "string" ) {
			matched = jQuery.filter( selector, matched );
		}

		if ( this.length > 1 ) {

			// Remove duplicates
			if ( !guaranteedUnique[ name ] ) {
				jQuery.uniqueSort( matched );
			}

			// Reverse order for parents* and prev-derivatives
			if ( rparentsprev.test( name ) ) {
				matched.reverse();
			}
		}

		return this.pushStack( matched );
	};
} );
var rnothtmlwhite = ( /[^\x20\t\r\n\f]+/g );



// Convert String-formatted options into Object-formatted ones
function createOptions( options ) {
	var object = {};
	jQuery.each( options.match( rnothtmlwhite ) || [], function( _, flag ) {
		object[ flag ] = true;
	} );
	return object;
}

/*
 * Create a callback list using the following parameters:
 *
 *	options: an optional list of space-separated options that will change how
 *			the callback list behaves or a more traditional option object
 *
 * By default a callback list will act like an event callback list and can be
 * "fired" multiple times.
 *
 * Possible options:
 *
 *	once:			will ensure the callback list can only be fired once (like a Deferred)
 *
 *	memory:			will keep track of previous values and will call any callback added
 *					after the list has been fired right away with the latest "memorized"
 *					values (like a Deferred)
 *
 *	unique:			will ensure a callback can only be added once (no duplicate in the list)
 *
 *	stopOnFalse:	interrupt callings when a callback returns false
 *
 */
jQuery.Callbacks = function( options ) {

	// Convert options from String-formatted to Object-formatted if needed
	// (we check in cache first)
	options = typeof options === "string" ?
		createOptions( options ) :
		jQuery.extend( {}, options );

	var // Flag to know if list is currently firing
		firing,

		// Last fire value for non-forgettable lists
		memory,

		// Flag to know if list was already fired
		fired,

		// Flag to prevent firing
		locked,

		// Actual callback list
		list = [],

		// Queue of execution data for repeatable lists
		queue = [],

		// Index of currently firing callback (modified by add/remove as needed)
		firingIndex = -1,

		// Fire callbacks
		fire = function() {

			// Enforce single-firing
			locked = locked || options.once;

			// Execute callbacks for all pending executions,
			// respecting firingIndex overrides and runtime changes
			fired = firing = true;
			for ( ; queue.length; firingIndex = -1 ) {
				memory = queue.shift();
				while ( ++firingIndex < list.length ) {

					// Run callback and check for early termination
					if ( list[ firingIndex ].apply( memory[ 0 ], memory[ 1 ] ) === false &&
						options.stopOnFalse ) {

						// Jump to end and forget the data so .add doesn't re-fire
						firingIndex = list.length;
						memory = false;
					}
				}
			}

			// Forget the data if we're done with it
			if ( !options.memory ) {
				memory = false;
			}

			firing = false;

			// Clean up if we're done firing for good
			if ( locked ) {

				// Keep an empty list if we have data for future add calls
				if ( memory ) {
					list = [];

				// Otherwise, this object is spent
				} else {
					list = "";
				}
			}
		},

		// Actual Callbacks object
		self = {

			// Add a callback or a collection of callbacks to the list
			add: function() {
				if ( list ) {

					// If we have memory from a past run, we should fire after adding
					if ( memory && !firing ) {
						firingIndex = list.length - 1;
						queue.push( memory );
					}

					( function add( args ) {
						jQuery.each( args, function( _, arg ) {
							if ( isFunction( arg ) ) {
								if ( !options.unique || !self.has( arg ) ) {
									list.push( arg );
								}
							} else if ( arg && arg.length && toType( arg ) !== "string" ) {

								// Inspect recursively
								add( arg );
							}
						} );
					} )( arguments );

					if ( memory && !firing ) {
						fire();
					}
				}
				return this;
			},

			// Remove a callback from the list
			remove: function() {
				jQuery.each( arguments, function( _, arg ) {
					var index;
					while ( ( index = jQuery.inArray( arg, list, index ) ) > -1 ) {
						list.splice( index, 1 );

						// Handle firing indexes
						if ( index <= firingIndex ) {
							firingIndex--;
						}
					}
				} );
				return this;
			},

			// Check if a given callback is in the list.
			// If no argument is given, return whether or not list has callbacks attached.
			has: function( fn ) {
				return fn ?
					jQuery.inArray( fn, list ) > -1 :
					list.length > 0;
			},

			// Remove all callbacks from the list
			empty: function() {
				if ( list ) {
					list = [];
				}
				return this;
			},

			// Disable .fire and .add
			// Abort any current/pending executions
			// Clear all callbacks and values
			disable: function() {
				locked = queue = [];
				list = memory = "";
				return this;
			},
			disabled: function() {
				return !list;
			},

			// Disable .fire
			// Also disable .add unless we have memory (since it would have no effect)
			// Abort any pending executions
			lock: function() {
				locked = queue = [];
				if ( !memory && !firing ) {
					list = memory = "";
				}
				return this;
			},
			locked: function() {
				return !!locked;
			},

			// Call all callbacks with the given context and arguments
			fireWith: function( context, args ) {
				if ( !locked ) {
					args = args || [];
					args = [ context, args.slice ? args.slice() : args ];
					queue.push( args );
					if ( !firing ) {
						fire();
					}
				}
				return this;
			},

			// Call all the callbacks with the given arguments
			fire: function() {
				self.fireWith( this, arguments );
				return this;
			},

			// To know if the callbacks have already been called at least once
			fired: function() {
				return !!fired;
			}
		};

	return self;
};


function Identity( v ) {
	return v;
}
function Thrower( ex ) {
	throw ex;
}

function adoptValue( value, resolve, reject, noValue ) {
	var method;

	try {

		// Check for promise aspect first to privilege synchronous behavior
		if ( value && isFunction( ( method = value.promise ) ) ) {
			method.call( value ).done( resolve ).fail( reject );

		// Other thenables
		} else if ( value && isFunction( ( method = value.then ) ) ) {
			method.call( value, resolve, reject );

		// Other non-thenables
		} else {

			// Control `resolve` arguments by letting Array#slice cast boolean `noValue` to integer:
			// * false: [ value ].slice( 0 ) => resolve( value )
			// * true: [ value ].slice( 1 ) => resolve()
			resolve.apply( undefined, [ value ].slice( noValue ) );
		}

	// For Promises/A+, convert exceptions into rejections
	// Since jQuery.when doesn't unwrap thenables, we can skip the extra checks appearing in
	// Deferred#then to conditionally suppress rejection.
	} catch ( value ) {

		// Support: Android 4.0 only
		// Strict mode functions invoked without .call/.apply get global-object context
		reject.apply( undefined, [ value ] );
	}
}

jQuery.extend( {

	Deferred: function( func ) {
		var tuples = [

				// action, add listener, callbacks,
				// ... .then handlers, argument index, [final state]
				[ "notify", "progress", jQuery.Callbacks( "memory" ),
					jQuery.Callbacks( "memory" ), 2 ],
				[ "resolve", "done", jQuery.Callbacks( "once memory" ),
					jQuery.Callbacks( "once memory" ), 0, "resolved" ],
				[ "reject", "fail", jQuery.Callbacks( "once memory" ),
					jQuery.Callbacks( "once memory" ), 1, "rejected" ]
			],
			state = "pending",
			promise = {
				state: function() {
					return state;
				},
				always: function() {
					deferred.done( arguments ).fail( arguments );
					return this;
				},
				"catch": function( fn ) {
					return promise.then( null, fn );
				},

				// Keep pipe for back-compat
				pipe: function( /* fnDone, fnFail, fnProgress */ ) {
					var fns = arguments;

					return jQuery.Deferred( function( newDefer ) {
						jQuery.each( tuples, function( i, tuple ) {

							// Map tuples (progress, done, fail) to arguments (done, fail, progress)
							var fn = isFunction( fns[ tuple[ 4 ] ] ) && fns[ tuple[ 4 ] ];

							// deferred.progress(function() { bind to newDefer or newDefer.notify })
							// deferred.done(function() { bind to newDefer or newDefer.resolve })
							// deferred.fail(function() { bind to newDefer or newDefer.reject })
							deferred[ tuple[ 1 ] ]( function() {
								var returned = fn && fn.apply( this, arguments );
								if ( returned && isFunction( returned.promise ) ) {
									returned.promise()
										.progress( newDefer.notify )
										.done( newDefer.resolve )
										.fail( newDefer.reject );
								} else {
									newDefer[ tuple[ 0 ] + "With" ](
										this,
										fn ? [ returned ] : arguments
									);
								}
							} );
						} );
						fns = null;
					} ).promise();
				},
				then: function( onFulfilled, onRejected, onProgress ) {
					var maxDepth = 0;
					function resolve( depth, deferred, handler, special ) {
						return function() {
							var that = this,
								args = arguments,
								mightThrow = function() {
									var returned, then;

									// Support: Promises/A+ section 2.3.3.3.3
									// https://promisesaplus.com/#point-59
									// Ignore double-resolution attempts
									if ( depth < maxDepth ) {
										return;
									}

									returned = handler.apply( that, args );

									// Support: Promises/A+ section 2.3.1
									// https://promisesaplus.com/#point-48
									if ( returned === deferred.promise() ) {
										throw new TypeError( "Thenable self-resolution" );
									}

									// Support: Promises/A+ sections 2.3.3.1, 3.5
									// https://promisesaplus.com/#point-54
									// https://promisesaplus.com/#point-75
									// Retrieve `then` only once
									then = returned &&

										// Support: Promises/A+ section 2.3.4
										// https://promisesaplus.com/#point-64
										// Only check objects and functions for thenability
										( typeof returned === "object" ||
											typeof returned === "function" ) &&
										returned.then;

									// Handle a returned thenable
									if ( isFunction( then ) ) {

										// Special processors (notify) just wait for resolution
										if ( special ) {
											then.call(
												returned,
												resolve( maxDepth, deferred, Identity, special ),
												resolve( maxDepth, deferred, Thrower, special )
											);

										// Normal processors (resolve) also hook into progress
										} else {

											// ...and disregard older resolution values
											maxDepth++;

											then.call(
												returned,
												resolve( maxDepth, deferred, Identity, special ),
												resolve( maxDepth, deferred, Thrower, special ),
												resolve( maxDepth, deferred, Identity,
													deferred.notifyWith )
											);
										}

									// Handle all other returned values
									} else {

										// Only substitute handlers pass on context
										// and multiple values (non-spec behavior)
										if ( handler !== Identity ) {
											that = undefined;
											args = [ returned ];
										}

										// Process the value(s)
										// Default process is resolve
										( special || deferred.resolveWith )( that, args );
									}
								},

								// Only normal processors (resolve) catch and reject exceptions
								process = special ?
									mightThrow :
									function() {
										try {
											mightThrow();
										} catch ( e ) {

											if ( jQuery.Deferred.exceptionHook ) {
												jQuery.Deferred.exceptionHook( e,
													process.stackTrace );
											}

											// Support: Promises/A+ section 2.3.3.3.4.1
											// https://promisesaplus.com/#point-61
											// Ignore post-resolution exceptions
											if ( depth + 1 >= maxDepth ) {

												// Only substitute handlers pass on context
												// and multiple values (non-spec behavior)
												if ( handler !== Thrower ) {
													that = undefined;
													args = [ e ];
												}

												deferred.rejectWith( that, args );
											}
										}
									};

							// Support: Promises/A+ section 2.3.3.3.1
							// https://promisesaplus.com/#point-57
							// Re-resolve promises immediately to dodge false rejection from
							// subsequent errors
							if ( depth ) {
								process();
							} else {

								// Call an optional hook to record the stack, in case of exception
								// since it's otherwise lost when execution goes async
								if ( jQuery.Deferred.getStackHook ) {
									process.stackTrace = jQuery.Deferred.getStackHook();
								}
								window.setTimeout( process );
							}
						};
					}

					return jQuery.Deferred( function( newDefer ) {

						// progress_handlers.add( ... )
						tuples[ 0 ][ 3 ].add(
							resolve(
								0,
								newDefer,
								isFunction( onProgress ) ?
									onProgress :
									Identity,
								newDefer.notifyWith
							)
						);

						// fulfilled_handlers.add( ... )
						tuples[ 1 ][ 3 ].add(
							resolve(
								0,
								newDefer,
								isFunction( onFulfilled ) ?
									onFulfilled :
									Identity
							)
						);

						// rejected_handlers.add( ... )
						tuples[ 2 ][ 3 ].add(
							resolve(
								0,
								newDefer,
								isFunction( onRejected ) ?
									onRejected :
									Thrower
							)
						);
					} ).promise();
				},

				// Get a promise for this deferred
				// If obj is provided, the promise aspect is added to the object
				promise: function( obj ) {
					return obj != null ? jQuery.extend( obj, promise ) : promise;
				}
			},
			deferred = {};

		// Add list-specific methods
		jQuery.each( tuples, function( i, tuple ) {
			var list = tuple[ 2 ],
				stateString = tuple[ 5 ];

			// promise.progress = list.add
			// promise.done = list.add
			// promise.fail = list.add
			promise[ tuple[ 1 ] ] = list.add;

			// Handle state
			if ( stateString ) {
				list.add(
					function() {

						// state = "resolved" (i.e., fulfilled)
						// state = "rejected"
						state = stateString;
					},

					// rejected_callbacks.disable
					// fulfilled_callbacks.disable
					tuples[ 3 - i ][ 2 ].disable,

					// rejected_handlers.disable
					// fulfilled_handlers.disable
					tuples[ 3 - i ][ 3 ].disable,

					// progress_callbacks.lock
					tuples[ 0 ][ 2 ].lock,

					// progress_handlers.lock
					tuples[ 0 ][ 3 ].lock
				);
			}

			// progress_handlers.fire
			// fulfilled_handlers.fire
			// rejected_handlers.fire
			list.add( tuple[ 3 ].fire );

			// deferred.notify = function() { deferred.notifyWith(...) }
			// deferred.resolve = function() { deferred.resolveWith(...) }
			// deferred.reject = function() { deferred.rejectWith(...) }
			deferred[ tuple[ 0 ] ] = function() {
				deferred[ tuple[ 0 ] + "With" ]( this === deferred ? undefined : this, arguments );
				return this;
			};

			// deferred.notifyWith = list.fireWith
			// deferred.resolveWith = list.fireWith
			// deferred.rejectWith = list.fireWith
			deferred[ tuple[ 0 ] + "With" ] = list.fireWith;
		} );

		// Make the deferred a promise
		promise.promise( deferred );

		// Call given func if any
		if ( func ) {
			func.call( deferred, deferred );
		}

		// All done!
		return deferred;
	},

	// Deferred helper
	when: function( singleValue ) {
		var

			// count of uncompleted subordinates
			remaining = arguments.length,

			// count of unprocessed arguments
			i = remaining,

			// subordinate fulfillment data
			resolveContexts = Array( i ),
			resolveValues = slice.call( arguments ),

			// the master Deferred
			master = jQuery.Deferred(),

			// subordinate callback factory
			updateFunc = function( i ) {
				return function( value ) {
					resolveContexts[ i ] = this;
					resolveValues[ i ] = arguments.length > 1 ? slice.call( arguments ) : value;
					if ( !( --remaining ) ) {
						master.resolveWith( resolveContexts, resolveValues );
					}
				};
			};

		// Single- and empty arguments are adopted like Promise.resolve
		if ( remaining <= 1 ) {
			adoptValue( singleValue, master.done( updateFunc( i ) ).resolve, master.reject,
				!remaining );

			// Use .then() to unwrap secondary thenables (cf. gh-3000)
			if ( master.state() === "pending" ||
				isFunction( resolveValues[ i ] && resolveValues[ i ].then ) ) {

				return master.then();
			}
		}

		// Multiple arguments are aggregated like Promise.all array elements
		while ( i-- ) {
			adoptValue( resolveValues[ i ], updateFunc( i ), master.reject );
		}

		return master.promise();
	}
} );


// These usually indicate a programmer mistake during development,
// warn about them ASAP rather than swallowing them by default.
var rerrorNames = /^(Eval|Internal|Range|Reference|Syntax|Type|URI)Error$/;

jQuery.Deferred.exceptionHook = function( error, stack ) {

	// Support: IE 8 - 9 only
	// Console exists when dev tools are open, which can happen at any time
	if ( window.console && window.console.warn && error && rerrorNames.test( error.name ) ) {
		window.console.warn( "jQuery.Deferred exception: " + error.message, error.stack, stack );
	}
};




jQuery.readyException = function( error ) {
	window.setTimeout( function() {
		throw error;
	} );
};




// The deferred used on DOM ready
var readyList = jQuery.Deferred();

jQuery.fn.ready = function( fn ) {

	readyList
		.then( fn )

		// Wrap jQuery.readyException in a function so that the lookup
		// happens at the time of error handling instead of callback
		// registration.
		.catch( function( error ) {
			jQuery.readyException( error );
		} );

	return this;
};

jQuery.extend( {

	// Is the DOM ready to be used? Set to true once it occurs.
	isReady: false,

	// A counter to track how many items to wait for before
	// the ready event fires. See #6781
	readyWait: 1,

	// Handle when the DOM is ready
	ready: function( wait ) {

		// Abort if there are pending holds or we're already ready
		if ( wait === true ? --jQuery.readyWait : jQuery.isReady ) {
			return;
		}

		// Remember that the DOM is ready
		jQuery.isReady = true;

		// If a normal DOM Ready event fired, decrement, and wait if need be
		if ( wait !== true && --jQuery.readyWait > 0 ) {
			return;
		}

		// If there are functions bound, to execute
		readyList.resolveWith( document, [ jQuery ] );
	}
} );

jQuery.ready.then = readyList.then;

// The ready event handler and self cleanup method
function completed() {
	document.removeEventListener( "DOMContentLoaded", completed );
	window.removeEventListener( "load", completed );
	jQuery.ready();
}

// Catch cases where $(document).ready() is called
// after the browser event has already occurred.
// Support: IE <=9 - 10 only
// Older IE sometimes signals "interactive" too soon
if ( document.readyState === "complete" ||
	( document.readyState !== "loading" && !document.documentElement.doScroll ) ) {

	// Handle it asynchronously to allow scripts the opportunity to delay ready
	window.setTimeout( jQuery.ready );

} else {

	// Use the handy event callback
	document.addEventListener( "DOMContentLoaded", completed );

	// A fallback to window.onload, that will always work
	window.addEventListener( "load", completed );
}




// Multifunctional method to get and set values of a collection
// The value/s can optionally be executed if it's a function
var access = function( elems, fn, key, value, chainable, emptyGet, raw ) {
	var i = 0,
		len = elems.length,
		bulk = key == null;

	// Sets many values
	if ( toType( key ) === "object" ) {
		chainable = true;
		for ( i in key ) {
			access( elems, fn, i, key[ i ], true, emptyGet, raw );
		}

	// Sets one value
	} else if ( value !== undefined ) {
		chainable = true;

		if ( !isFunction( value ) ) {
			raw = true;
		}

		if ( bulk ) {

			// Bulk operations run against the entire set
			if ( raw ) {
				fn.call( elems, value );
				fn = null;

			// ...except when executing function values
			} else {
				bulk = fn;
				fn = function( elem, key, value ) {
					return bulk.call( jQuery( elem ), value );
				};
			}
		}

		if ( fn ) {
			for ( ; i < len; i++ ) {
				fn(
					elems[ i ], key, raw ?
					value :
					value.call( elems[ i ], i, fn( elems[ i ], key ) )
				);
			}
		}
	}

	if ( chainable ) {
		return elems;
	}

	// Gets
	if ( bulk ) {
		return fn.call( elems );
	}

	return len ? fn( elems[ 0 ], key ) : emptyGet;
};


// Matches dashed string for camelizing
var rmsPrefix = /^-ms-/,
	rdashAlpha = /-([a-z])/g;

// Used by camelCase as callback to replace()
function fcamelCase( all, letter ) {
	return letter.toUpperCase();
}

// Convert dashed to camelCase; used by the css and data modules
// Support: IE <=9 - 11, Edge 12 - 15
// Microsoft forgot to hump their vendor prefix (#9572)
function camelCase( string ) {
	return string.replace( rmsPrefix, "ms-" ).replace( rdashAlpha, fcamelCase );
}
var acceptData = function( owner ) {

	// Accepts only:
	//  - Node
	//    - Node.ELEMENT_NODE
	//    - Node.DOCUMENT_NODE
	//  - Object
	//    - Any
	return owner.nodeType === 1 || owner.nodeType === 9 || !( +owner.nodeType );
};




function Data() {
	this.expando = jQuery.expando + Data.uid++;
}

Data.uid = 1;

Data.prototype = {

	cache: function( owner ) {

		// Check if the owner object already has a cache
		var value = owner[ this.expando ];

		// If not, create one
		if ( !value ) {
			value = {};

			// We can accept data for non-element nodes in modern browsers,
			// but we should not, see #8335.
			// Always return an empty object.
			if ( acceptData( owner ) ) {

				// If it is a node unlikely to be stringify-ed or looped over
				// use plain assignment
				if ( owner.nodeType ) {
					owner[ this.expando ] = value;

				// Otherwise secure it in a non-enumerable property
				// configurable must be true to allow the property to be
				// deleted when data is removed
				} else {
					Object.defineProperty( owner, this.expando, {
						value: value,
						configurable: true
					} );
				}
			}
		}

		return value;
	},
	set: function( owner, data, value ) {
		var prop,
			cache = this.cache( owner );

		// Handle: [ owner, key, value ] args
		// Always use camelCase key (gh-2257)
		if ( typeof data === "string" ) {
			cache[ camelCase( data ) ] = value;

		// Handle: [ owner, { properties } ] args
		} else {

			// Copy the properties one-by-one to the cache object
			for ( prop in data ) {
				cache[ camelCase( prop ) ] = data[ prop ];
			}
		}
		return cache;
	},
	get: function( owner, key ) {
		return key === undefined ?
			this.cache( owner ) :

			// Always use camelCase key (gh-2257)
			owner[ this.expando ] && owner[ this.expando ][ camelCase( key ) ];
	},
	access: function( owner, key, value ) {

		// In cases where either:
		//
		//   1. No key was specified
		//   2. A string key was specified, but no value provided
		//
		// Take the "read" path and allow the get method to determine
		// which value to return, respectively either:
		//
		//   1. The entire cache object
		//   2. The data stored at the key
		//
		if ( key === undefined ||
				( ( key && typeof key === "string" ) && value === undefined ) ) {

			return this.get( owner, key );
		}

		// When the key is not a string, or both a key and value
		// are specified, set or extend (existing objects) with either:
		//
		//   1. An object of properties
		//   2. A key and value
		//
		this.set( owner, key, value );

		// Since the "set" path can have two possible entry points
		// return the expected data based on which path was taken[*]
		return value !== undefined ? value : key;
	},
	remove: function( owner, key ) {
		var i,
			cache = owner[ this.expando ];

		if ( cache === undefined ) {
			return;
		}

		if ( key !== undefined ) {

			// Support array or space separated string of keys
			if ( Array.isArray( key ) ) {

				// If key is an array of keys...
				// We always set camelCase keys, so remove that.
				key = key.map( camelCase );
			} else {
				key = camelCase( key );

				// If a key with the spaces exists, use it.
				// Otherwise, create an array by matching non-whitespace
				key = key in cache ?
					[ key ] :
					( key.match( rnothtmlwhite ) || [] );
			}

			i = key.length;

			while ( i-- ) {
				delete cache[ key[ i ] ];
			}
		}

		// Remove the expando if there's no more data
		if ( key === undefined || jQuery.isEmptyObject( cache ) ) {

			// Support: Chrome <=35 - 45
			// Webkit & Blink performance suffers when deleting properties
			// from DOM nodes, so set to undefined instead
			// https://bugs.chromium.org/p/chromium/issues/detail?id=378607 (bug restricted)
			if ( owner.nodeType ) {
				owner[ this.expando ] = undefined;
			} else {
				delete owner[ this.expando ];
			}
		}
	},
	hasData: function( owner ) {
		var cache = owner[ this.expando ];
		return cache !== undefined && !jQuery.isEmptyObject( cache );
	}
};
var dataPriv = new Data();

var dataUser = new Data();



//	Implementation Summary
//
//	1. Enforce API surface and semantic compatibility with 1.9.x branch
//	2. Improve the module's maintainability by reducing the storage
//		paths to a single mechanism.
//	3. Use the same single mechanism to support "private" and "user" data.
//	4. _Never_ expose "private" data to user code (TODO: Drop _data, _removeData)
//	5. Avoid exposing implementation details on user objects (eg. expando properties)
//	6. Provide a clear path for implementation upgrade to WeakMap in 2014

var rbrace = /^(?:\{[\w\W]*\}|\[[\w\W]*\])$/,
	rmultiDash = /[A-Z]/g;

function getData( data ) {
	if ( data === "true" ) {
		return true;
	}

	if ( data === "false" ) {
		return false;
	}

	if ( data === "null" ) {
		return null;
	}

	// Only convert to a number if it doesn't change the string
	if ( data === +data + "" ) {
		return +data;
	}

	if ( rbrace.test( data ) ) {
		return JSON.parse( data );
	}

	return data;
}

function dataAttr( elem, key, data ) {
	var name;

	// If nothing was found internally, try to fetch any
	// data from the HTML5 data-* attribute
	if ( data === undefined && elem.nodeType === 1 ) {
		name = "data-" + key.replace( rmultiDash, "-$&" ).toLowerCase();
		data = elem.getAttribute( name );

		if ( typeof data === "string" ) {
			try {
				data = getData( data );
			} catch ( e ) {}

			// Make sure we set the data so it isn't changed later
			dataUser.set( elem, key, data );
		} else {
			data = undefined;
		}
	}
	return data;
}

jQuery.extend( {
	hasData: function( elem ) {
		return dataUser.hasData( elem ) || dataPriv.hasData( elem );
	},

	data: function( elem, name, data ) {
		return dataUser.access( elem, name, data );
	},

	removeData: function( elem, name ) {
		dataUser.remove( elem, name );
	},

	// TODO: Now that all calls to _data and _removeData have been replaced
	// with direct calls to dataPriv methods, these can be deprecated.
	_data: function( elem, name, data ) {
		return dataPriv.access( elem, name, data );
	},

	_removeData: function( elem, name ) {
		dataPriv.remove( elem, name );
	}
} );

jQuery.fn.extend( {
	data: function( key, value ) {
		var i, name, data,
			elem = this[ 0 ],
			attrs = elem && elem.attributes;

		// Gets all values
		if ( key === undefined ) {
			if ( this.length ) {
				data = dataUser.get( elem );

				if ( elem.nodeType === 1 && !dataPriv.get( elem, "hasDataAttrs" ) ) {
					i = attrs.length;
					while ( i-- ) {

						// Support: IE 11 only
						// The attrs elements can be null (#14894)
						if ( attrs[ i ] ) {
							name = attrs[ i ].name;
							if ( name.indexOf( "data-" ) === 0 ) {
								name = camelCase( name.slice( 5 ) );
								dataAttr( elem, name, data[ name ] );
							}
						}
					}
					dataPriv.set( elem, "hasDataAttrs", true );
				}
			}

			return data;
		}

		// Sets multiple values
		if ( typeof key === "object" ) {
			return this.each( function() {
				dataUser.set( this, key );
			} );
		}

		return access( this, function( value ) {
			var data;

			// The calling jQuery object (element matches) is not empty
			// (and therefore has an element appears at this[ 0 ]) and the
			// `value` parameter was not undefined. An empty jQuery object
			// will result in `undefined` for elem = this[ 0 ] which will
			// throw an exception if an attempt to read a data cache is made.
			if ( elem && value === undefined ) {

				// Attempt to get data from the cache
				// The key will always be camelCased in Data
				data = dataUser.get( elem, key );
				if ( data !== undefined ) {
					return data;
				}

				// Attempt to "discover" the data in
				// HTML5 custom data-* attrs
				data = dataAttr( elem, key );
				if ( data !== undefined ) {
					return data;
				}

				// We tried really hard, but the data doesn't exist.
				return;
			}

			// Set the data...
			this.each( function() {

				// We always store the camelCased key
				dataUser.set( this, key, value );
			} );
		}, null, value, arguments.length > 1, null, true );
	},

	removeData: function( key ) {
		return this.each( function() {
			dataUser.remove( this, key );
		} );
	}
} );


jQuery.extend( {
	queue: function( elem, type, data ) {
		var queue;

		if ( elem ) {
			type = ( type || "fx" ) + "queue";
			queue = dataPriv.get( elem, type );

			// Speed up dequeue by getting out quickly if this is just a lookup
			if ( data ) {
				if ( !queue || Array.isArray( data ) ) {
					queue = dataPriv.access( elem, type, jQuery.makeArray( data ) );
				} else {
					queue.push( data );
				}
			}
			return queue || [];
		}
	},

	dequeue: function( elem, type ) {
		type = type || "fx";

		var queue = jQuery.queue( elem, type ),
			startLength = queue.length,
			fn = queue.shift(),
			hooks = jQuery._queueHooks( elem, type ),
			next = function() {
				jQuery.dequeue( elem, type );
			};

		// If the fx queue is dequeued, always remove the progress sentinel
		if ( fn === "inprogress" ) {
			fn = queue.shift();
			startLength--;
		}

		if ( fn ) {

			// Add a progress sentinel to prevent the fx queue from being
			// automatically dequeued
			if ( type === "fx" ) {
				queue.unshift( "inprogress" );
			}

			// Clear up the last queue stop function
			delete hooks.stop;
			fn.call( elem, next, hooks );
		}

		if ( !startLength && hooks ) {
			hooks.empty.fire();
		}
	},

	// Not public - generate a queueHooks object, or return the current one
	_queueHooks: function( elem, type ) {
		var key = type + "queueHooks";
		return dataPriv.get( elem, key ) || dataPriv.access( elem, key, {
			empty: jQuery.Callbacks( "once memory" ).add( function() {
				dataPriv.remove( elem, [ type + "queue", key ] );
			} )
		} );
	}
} );

jQuery.fn.extend( {
	queue: function( type, data ) {
		var setter = 2;

		if ( typeof type !== "string" ) {
			data = type;
			type = "fx";
			setter--;
		}

		if ( arguments.length < setter ) {
			return jQuery.queue( this[ 0 ], type );
		}

		return data === undefined ?
			this :
			this.each( function() {
				var queue = jQuery.queue( this, type, data );

				// Ensure a hooks for this queue
				jQuery._queueHooks( this, type );

				if ( type === "fx" && queue[ 0 ] !== "inprogress" ) {
					jQuery.dequeue( this, type );
				}
			} );
	},
	dequeue: function( type ) {
		return this.each( function() {
			jQuery.dequeue( this, type );
		} );
	},
	clearQueue: function( type ) {
		return this.queue( type || "fx", [] );
	},

	// Get a promise resolved when queues of a certain type
	// are emptied (fx is the type by default)
	promise: function( type, obj ) {
		var tmp,
			count = 1,
			defer = jQuery.Deferred(),
			elements = this,
			i = this.length,
			resolve = function() {
				if ( !( --count ) ) {
					defer.resolveWith( elements, [ elements ] );
				}
			};

		if ( typeof type !== "string" ) {
			obj = type;
			type = undefined;
		}
		type = type || "fx";

		while ( i-- ) {
			tmp = dataPriv.get( elements[ i ], type + "queueHooks" );
			if ( tmp && tmp.empty ) {
				count++;
				tmp.empty.add( resolve );
			}
		}
		resolve();
		return defer.promise( obj );
	}
} );
var pnum = ( /[+-]?(?:\d*\.|)\d+(?:[eE][+-]?\d+|)/ ).source;

var rcssNum = new RegExp( "^(?:([+-])=|)(" + pnum + ")([a-z%]*)$", "i" );


var cssExpand = [ "Top", "Right", "Bottom", "Left" ];

var isHiddenWithinTree = function( elem, el ) {

		// isHiddenWithinTree might be called from jQuery#filter function;
		// in that case, element will be second argument
		elem = el || elem;

		// Inline style trumps all
		return elem.style.display === "none" ||
			elem.style.display === "" &&

			// Otherwise, check computed style
			// Support: Firefox <=43 - 45
			// Disconnected elements can have computed display: none, so first confirm that elem is
			// in the document.
			jQuery.contains( elem.ownerDocument, elem ) &&

			jQuery.css( elem, "display" ) === "none";
	};

var swap = function( elem, options, callback, args ) {
	var ret, name,
		old = {};

	// Remember the old values, and insert the new ones
	for ( name in options ) {
		old[ name ] = elem.style[ name ];
		elem.style[ name ] = options[ name ];
	}

	ret = callback.apply( elem, args || [] );

	// Revert the old values
	for ( name in options ) {
		elem.style[ name ] = old[ name ];
	}

	return ret;
};




function adjustCSS( elem, prop, valueParts, tween ) {
	var adjusted, scale,
		maxIterations = 20,
		currentValue = tween ?
			function() {
				return tween.cur();
			} :
			function() {
				return jQuery.css( elem, prop, "" );
			},
		initial = currentValue(),
		unit = valueParts && valueParts[ 3 ] || ( jQuery.cssNumber[ prop ] ? "" : "px" ),

		// Starting value computation is required for potential unit mismatches
		initialInUnit = ( jQuery.cssNumber[ prop ] || unit !== "px" && +initial ) &&
			rcssNum.exec( jQuery.css( elem, prop ) );

	if ( initialInUnit && initialInUnit[ 3 ] !== unit ) {

		// Support: Firefox <=54
		// Halve the iteration target value to prevent interference from CSS upper bounds (gh-2144)
		initial = initial / 2;

		// Trust units reported by jQuery.css
		unit = unit || initialInUnit[ 3 ];

		// Iteratively approximate from a nonzero starting point
		initialInUnit = +initial || 1;

		while ( maxIterations-- ) {

			// Evaluate and update our best guess (doubling guesses that zero out).
			// Finish if the scale equals or crosses 1 (making the old*new product non-positive).
			jQuery.style( elem, prop, initialInUnit + unit );
			if ( ( 1 - scale ) * ( 1 - ( scale = currentValue() / initial || 0.5 ) ) <= 0 ) {
				maxIterations = 0;
			}
			initialInUnit = initialInUnit / scale;

		}

		initialInUnit = initialInUnit * 2;
		jQuery.style( elem, prop, initialInUnit + unit );

		// Make sure we update the tween properties later on
		valueParts = valueParts || [];
	}

	if ( valueParts ) {
		initialInUnit = +initialInUnit || +initial || 0;

		// Apply relative offset (+=/-=) if specified
		adjusted = valueParts[ 1 ] ?
			initialInUnit + ( valueParts[ 1 ] + 1 ) * valueParts[ 2 ] :
			+valueParts[ 2 ];
		if ( tween ) {
			tween.unit = unit;
			tween.start = initialInUnit;
			tween.end = adjusted;
		}
	}
	return adjusted;
}


var defaultDisplayMap = {};

function getDefaultDisplay( elem ) {
	var temp,
		doc = elem.ownerDocument,
		nodeName = elem.nodeName,
		display = defaultDisplayMap[ nodeName ];

	if ( display ) {
		return display;
	}

	temp = doc.body.appendChild( doc.createElement( nodeName ) );
	display = jQuery.css( temp, "display" );

	temp.parentNode.removeChild( temp );

	if ( display === "none" ) {
		display = "block";
	}
	defaultDisplayMap[ nodeName ] = display;

	return display;
}

function showHide( elements, show ) {
	var display, elem,
		values = [],
		index = 0,
		length = elements.length;

	// Determine new display value for elements that need to change
	for ( ; index < length; index++ ) {
		elem = elements[ index ];
		if ( !elem.style ) {
			continue;
		}

		display = elem.style.display;
		if ( show ) {

			// Since we force visibility upon cascade-hidden elements, an immediate (and slow)
			// check is required in this first loop unless we have a nonempty display value (either
			// inline or about-to-be-restored)
			if ( display === "none" ) {
				values[ index ] = dataPriv.get( elem, "display" ) || null;
				if ( !values[ index ] ) {
					elem.style.display = "";
				}
			}
			if ( elem.style.display === "" && isHiddenWithinTree( elem ) ) {
				values[ index ] = getDefaultDisplay( elem );
			}
		} else {
			if ( display !== "none" ) {
				values[ index ] = "none";

				// Remember what we're overwriting
				dataPriv.set( elem, "display", display );
			}
		}
	}

	// Set the display of the elements in a second loop to avoid constant reflow
	for ( index = 0; index < length; index++ ) {
		if ( values[ index ] != null ) {
			elements[ index ].style.display = values[ index ];
		}
	}

	return elements;
}

jQuery.fn.extend( {
	show: function() {
		return showHide( this, true );
	},
	hide: function() {
		return showHide( this );
	},
	toggle: function( state ) {
		if ( typeof state === "boolean" ) {
			return state ? this.show() : this.hide();
		}

		return this.each( function() {
			if ( isHiddenWithinTree( this ) ) {
				jQuery( this ).show();
			} else {
				jQuery( this ).hide();
			}
		} );
	}
} );
var rcheckableType = ( /^(?:checkbox|radio)$/i );

var rtagName = ( /<([a-z][^\/\0>\x20\t\r\n\f]+)/i );

var rscriptType = ( /^$|^module$|\/(?:java|ecma)script/i );



// We have to close these tags to support XHTML (#13200)
var wrapMap = {

	// Support: IE <=9 only
	option: [ 1, "<select multiple='multiple'>", "</select>" ],

	// XHTML parsers do not magically insert elements in the
	// same way that tag soup parsers do. So we cannot shorten
	// this by omitting <tbody> or other required elements.
	thead: [ 1, "<table>", "</table>" ],
	col: [ 2, "<table><colgroup>", "</colgroup></table>" ],
	tr: [ 2, "<table><tbody>", "</tbody></table>" ],
	td: [ 3, "<table><tbody><tr>", "</tr></tbody></table>" ],

	_default: [ 0, "", "" ]
};

// Support: IE <=9 only
wrapMap.optgroup = wrapMap.option;

wrapMap.tbody = wrapMap.tfoot = wrapMap.colgroup = wrapMap.caption = wrapMap.thead;
wrapMap.th = wrapMap.td;


function getAll( context, tag ) {

	// Support: IE <=9 - 11 only
	// Use typeof to avoid zero-argument method invocation on host objects (#15151)
	var ret;

	if ( typeof context.getElementsByTagName !== "undefined" ) {
		ret = context.getElementsByTagName( tag || "*" );

	} else if ( typeof context.querySelectorAll !== "undefined" ) {
		ret = context.querySelectorAll( tag || "*" );

	} else {
		ret = [];
	}

	if ( tag === undefined || tag && nodeName( context, tag ) ) {
		return jQuery.merge( [ context ], ret );
	}

	return ret;
}


// Mark scripts as having already been evaluated
function setGlobalEval( elems, refElements ) {
	var i = 0,
		l = elems.length;

	for ( ; i < l; i++ ) {
		dataPriv.set(
			elems[ i ],
			"globalEval",
			!refElements || dataPriv.get( refElements[ i ], "globalEval" )
		);
	}
}


var rhtml = /<|&#?\w+;/;

function buildFragment( elems, context, scripts, selection, ignored ) {
	var elem, tmp, tag, wrap, contains, j,
		fragment = context.createDocumentFragment(),
		nodes = [],
		i = 0,
		l = elems.length;

	for ( ; i < l; i++ ) {
		elem = elems[ i ];

		if ( elem || elem === 0 ) {

			// Add nodes directly
			if ( toType( elem ) === "object" ) {

				// Support: Android <=4.0 only, PhantomJS 1 only
				// push.apply(_, arraylike) throws on ancient WebKit
				jQuery.merge( nodes, elem.nodeType ? [ elem ] : elem );

			// Convert non-html into a text node
			} else if ( !rhtml.test( elem ) ) {
				nodes.push( context.createTextNode( elem ) );

			// Convert html into DOM nodes
			} else {
				tmp = tmp || fragment.appendChild( context.createElement( "div" ) );

				// Deserialize a standard representation
				tag = ( rtagName.exec( elem ) || [ "", "" ] )[ 1 ].toLowerCase();
				wrap = wrapMap[ tag ] || wrapMap._default;
				tmp.innerHTML = wrap[ 1 ] + jQuery.htmlPrefilter( elem ) + wrap[ 2 ];

				// Descend through wrappers to the right content
				j = wrap[ 0 ];
				while ( j-- ) {
					tmp = tmp.lastChild;
				}

				// Support: Android <=4.0 only, PhantomJS 1 only
				// push.apply(_, arraylike) throws on ancient WebKit
				jQuery.merge( nodes, tmp.childNodes );

				// Remember the top-level container
				tmp = fragment.firstChild;

				// Ensure the created nodes are orphaned (#12392)
				tmp.textContent = "";
			}
		}
	}

	// Remove wrapper from fragment
	fragment.textContent = "";

	i = 0;
	while ( ( elem = nodes[ i++ ] ) ) {

		// Skip elements already in the context collection (trac-4087)
		if ( selection && jQuery.inArray( elem, selection ) > -1 ) {
			if ( ignored ) {
				ignored.push( elem );
			}
			continue;
		}

		contains = jQuery.contains( elem.ownerDocument, elem );

		// Append to fragment
		tmp = getAll( fragment.appendChild( elem ), "script" );

		// Preserve script evaluation history
		if ( contains ) {
			setGlobalEval( tmp );
		}

		// Capture executables
		if ( scripts ) {
			j = 0;
			while ( ( elem = tmp[ j++ ] ) ) {
				if ( rscriptType.test( elem.type || "" ) ) {
					scripts.push( elem );
				}
			}
		}
	}

	return fragment;
}


( function() {
	var fragment = document.createDocumentFragment(),
		div = fragment.appendChild( document.createElement( "div" ) ),
		input = document.createElement( "input" );

	// Support: Android 4.0 - 4.3 only
	// Check state lost if the name is set (#11217)
	// Support: Windows Web Apps (WWA)
	// `name` and `type` must use .setAttribute for WWA (#14901)
	input.setAttribute( "type", "radio" );
	input.setAttribute( "checked", "checked" );
	input.setAttribute( "name", "t" );

	div.appendChild( input );

	// Support: Android <=4.1 only
	// Older WebKit doesn't clone checked state correctly in fragments
	support.checkClone = div.cloneNode( true ).cloneNode( true ).lastChild.checked;

	// Support: IE <=11 only
	// Make sure textarea (and checkbox) defaultValue is properly cloned
	div.innerHTML = "<textarea>x</textarea>";
	support.noCloneChecked = !!div.cloneNode( true ).lastChild.defaultValue;
} )();
var documentElement = document.documentElement;



var
	rkeyEvent = /^key/,
	rmouseEvent = /^(?:mouse|pointer|contextmenu|drag|drop)|click/,
	rtypenamespace = /^([^.]*)(?:\.(.+)|)/;

function returnTrue() {
	return true;
}

function returnFalse() {
	return false;
}

// Support: IE <=9 only
// See #13393 for more info
function safeActiveElement() {
	try {
		return document.activeElement;
	} catch ( err ) { }
}

function on( elem, types, selector, data, fn, one ) {
	var origFn, type;

	// Types can be a map of types/handlers
	if ( typeof types === "object" ) {

		// ( types-Object, selector, data )
		if ( typeof selector !== "string" ) {

			// ( types-Object, data )
			data = data || selector;
			selector = undefined;
		}
		for ( type in types ) {
			on( elem, type, selector, data, types[ type ], one );
		}
		return elem;
	}

	if ( data == null && fn == null ) {

		// ( types, fn )
		fn = selector;
		data = selector = undefined;
	} else if ( fn == null ) {
		if ( typeof selector === "string" ) {

			// ( types, selector, fn )
			fn = data;
			data = undefined;
		} else {

			// ( types, data, fn )
			fn = data;
			data = selector;
			selector = undefined;
		}
	}
	if ( fn === false ) {
		fn = returnFalse;
	} else if ( !fn ) {
		return elem;
	}

	if ( one === 1 ) {
		origFn = fn;
		fn = function( event ) {

			// Can use an empty set, since event contains the info
			jQuery().off( event );
			return origFn.apply( this, arguments );
		};

		// Use same guid so caller can remove using origFn
		fn.guid = origFn.guid || ( origFn.guid = jQuery.guid++ );
	}
	return elem.each( function() {
		jQuery.event.add( this, types, fn, data, selector );
	} );
}

/*
 * Helper functions for managing events -- not part of the public interface.
 * Props to Dean Edwards' addEvent library for many of the ideas.
 */
jQuery.event = {

	global: {},

	add: function( elem, types, handler, data, selector ) {

		var handleObjIn, eventHandle, tmp,
			events, t, handleObj,
			special, handlers, type, namespaces, origType,
			elemData = dataPriv.get( elem );

		// Don't attach events to noData or text/comment nodes (but allow plain objects)
		if ( !elemData ) {
			return;
		}

		// Caller can pass in an object of custom data in lieu of the handler
		if ( handler.handler ) {
			handleObjIn = handler;
			handler = handleObjIn.handler;
			selector = handleObjIn.selector;
		}

		// Ensure that invalid selectors throw exceptions at attach time
		// Evaluate against documentElement in case elem is a non-element node (e.g., document)
		if ( selector ) {
			jQuery.find.matchesSelector( documentElement, selector );
		}

		// Make sure that the handler has a unique ID, used to find/remove it later
		if ( !handler.guid ) {
			handler.guid = jQuery.guid++;
		}

		// Init the element's event structure and main handler, if this is the first
		if ( !( events = elemData.events ) ) {
			events = elemData.events = {};
		}
		if ( !( eventHandle = elemData.handle ) ) {
			eventHandle = elemData.handle = function( e ) {

				// Discard the second event of a jQuery.event.trigger() and
				// when an event is called after a page has unloaded
				return typeof jQuery !== "undefined" && jQuery.event.triggered !== e.type ?
					jQuery.event.dispatch.apply( elem, arguments ) : undefined;
			};
		}

		// Handle multiple events separated by a space
		types = ( types || "" ).match( rnothtmlwhite ) || [ "" ];
		t = types.length;
		while ( t-- ) {
			tmp = rtypenamespace.exec( types[ t ] ) || [];
			type = origType = tmp[ 1 ];
			namespaces = ( tmp[ 2 ] || "" ).split( "." ).sort();

			// There *must* be a type, no attaching namespace-only handlers
			if ( !type ) {
				continue;
			}

			// If event changes its type, use the special event handlers for the changed type
			special = jQuery.event.special[ type ] || {};

			// If selector defined, determine special event api type, otherwise given type
			type = ( selector ? special.delegateType : special.bindType ) || type;

			// Update special based on newly reset type
			special = jQuery.event.special[ type ] || {};

			// handleObj is passed to all event handlers
			handleObj = jQuery.extend( {
				type: type,
				origType: origType,
				data: data,
				handler: handler,
				guid: handler.guid,
				selector: selector,
				needsContext: selector && jQuery.expr.match.needsContext.test( selector ),
				namespace: namespaces.join( "." )
			}, handleObjIn );

			// Init the event handler queue if we're the first
			if ( !( handlers = events[ type ] ) ) {
				handlers = events[ type ] = [];
				handlers.delegateCount = 0;

				// Only use addEventListener if the special events handler returns false
				if ( !special.setup ||
					special.setup.call( elem, data, namespaces, eventHandle ) === false ) {

					if ( elem.addEventListener ) {
						elem.addEventListener( type, eventHandle );
					}
				}
			}

			if ( special.add ) {
				special.add.call( elem, handleObj );

				if ( !handleObj.handler.guid ) {
					handleObj.handler.guid = handler.guid;
				}
			}

			// Add to the element's handler list, delegates in front
			if ( selector ) {
				handlers.splice( handlers.delegateCount++, 0, handleObj );
			} else {
				handlers.push( handleObj );
			}

			// Keep track of which events have ever been used, for event optimization
			jQuery.event.global[ type ] = true;
		}

	},

	// Detach an event or set of events from an element
	remove: function( elem, types, handler, selector, mappedTypes ) {

		var j, origCount, tmp,
			events, t, handleObj,
			special, handlers, type, namespaces, origType,
			elemData = dataPriv.hasData( elem ) && dataPriv.get( elem );

		if ( !elemData || !( events = elemData.events ) ) {
			return;
		}

		// Once for each type.namespace in types; type may be omitted
		types = ( types || "" ).match( rnothtmlwhite ) || [ "" ];
		t = types.length;
		while ( t-- ) {
			tmp = rtypenamespace.exec( types[ t ] ) || [];
			type = origType = tmp[ 1 ];
			namespaces = ( tmp[ 2 ] || "" ).split( "." ).sort();

			// Unbind all events (on this namespace, if provided) for the element
			if ( !type ) {
				for ( type in events ) {
					jQuery.event.remove( elem, type + types[ t ], handler, selector, true );
				}
				continue;
			}

			special = jQuery.event.special[ type ] || {};
			type = ( selector ? special.delegateType : special.bindType ) || type;
			handlers = events[ type ] || [];
			tmp = tmp[ 2 ] &&
				new RegExp( "(^|\\.)" + namespaces.join( "\\.(?:.*\\.|)" ) + "(\\.|$)" );

			// Remove matching events
			origCount = j = handlers.length;
			while ( j-- ) {
				handleObj = handlers[ j ];

				if ( ( mappedTypes || origType === handleObj.origType ) &&
					( !handler || handler.guid === handleObj.guid ) &&
					( !tmp || tmp.test( handleObj.namespace ) ) &&
					( !selector || selector === handleObj.selector ||
						selector === "**" && handleObj.selector ) ) {
					handlers.splice( j, 1 );

					if ( handleObj.selector ) {
						handlers.delegateCount--;
					}
					if ( special.remove ) {
						special.remove.call( elem, handleObj );
					}
				}
			}

			// Remove generic event handler if we removed something and no more handlers exist
			// (avoids potential for endless recursion during removal of special event handlers)
			if ( origCount && !handlers.length ) {
				if ( !special.teardown ||
					special.teardown.call( elem, namespaces, elemData.handle ) === false ) {

					jQuery.removeEvent( elem, type, elemData.handle );
				}

				delete events[ type ];
			}
		}

		// Remove data and the expando if it's no longer used
		if ( jQuery.isEmptyObject( events ) ) {
			dataPriv.remove( elem, "handle events" );
		}
	},

	dispatch: function( nativeEvent ) {

		// Make a writable jQuery.Event from the native event object
		var event = jQuery.event.fix( nativeEvent );

		var i, j, ret, matched, handleObj, handlerQueue,
			args = new Array( arguments.length ),
			handlers = ( dataPriv.get( this, "events" ) || {} )[ event.type ] || [],
			special = jQuery.event.special[ event.type ] || {};

		// Use the fix-ed jQuery.Event rather than the (read-only) native event
		args[ 0 ] = event;

		for ( i = 1; i < arguments.length; i++ ) {
			args[ i ] = arguments[ i ];
		}

		event.delegateTarget = this;

		// Call the preDispatch hook for the mapped type, and let it bail if desired
		if ( special.preDispatch && special.preDispatch.call( this, event ) === false ) {
			return;
		}

		// Determine handlers
		handlerQueue = jQuery.event.handlers.call( this, event, handlers );

		// Run delegates first; they may want to stop propagation beneath us
		i = 0;
		while ( ( matched = handlerQueue[ i++ ] ) && !event.isPropagationStopped() ) {
			event.currentTarget = matched.elem;

			j = 0;
			while ( ( handleObj = matched.handlers[ j++ ] ) &&
				!event.isImmediatePropagationStopped() ) {

				// Triggered event must either 1) have no namespace, or 2) have namespace(s)
				// a subset or equal to those in the bound event (both can have no namespace).
				if ( !event.rnamespace || event.rnamespace.test( handleObj.namespace ) ) {

					event.handleObj = handleObj;
					event.data = handleObj.data;

					ret = ( ( jQuery.event.special[ handleObj.origType ] || {} ).handle ||
						handleObj.handler ).apply( matched.elem, args );

					if ( ret !== undefined ) {
						if ( ( event.result = ret ) === false ) {
							event.preventDefault();
							event.stopPropagation();
						}
					}
				}
			}
		}

		// Call the postDispatch hook for the mapped type
		if ( special.postDispatch ) {
			special.postDispatch.call( this, event );
		}

		return event.result;
	},

	handlers: function( event, handlers ) {
		var i, handleObj, sel, matchedHandlers, matchedSelectors,
			handlerQueue = [],
			delegateCount = handlers.delegateCount,
			cur = event.target;

		// Find delegate handlers
		if ( delegateCount &&

			// Support: IE <=9
			// Black-hole SVG <use> instance trees (trac-13180)
			cur.nodeType &&

			// Support: Firefox <=42
			// Suppress spec-violating clicks indicating a non-primary pointer button (trac-3861)
			// https://www.w3.org/TR/DOM-Level-3-Events/#event-type-click
			// Support: IE 11 only
			// ...but not arrow key "clicks" of radio inputs, which can have `button` -1 (gh-2343)
			!( event.type === "click" && event.button >= 1 ) ) {

			for ( ; cur !== this; cur = cur.parentNode || this ) {

				// Don't check non-elements (#13208)
				// Don't process clicks on disabled elements (#6911, #8165, #11382, #11764)
				if ( cur.nodeType === 1 && !( event.type === "click" && cur.disabled === true ) ) {
					matchedHandlers = [];
					matchedSelectors = {};
					for ( i = 0; i < delegateCount; i++ ) {
						handleObj = handlers[ i ];

						// Don't conflict with Object.prototype properties (#13203)
						sel = handleObj.selector + " ";

						if ( matchedSelectors[ sel ] === undefined ) {
							matchedSelectors[ sel ] = handleObj.needsContext ?
								jQuery( sel, this ).index( cur ) > -1 :
								jQuery.find( sel, this, null, [ cur ] ).length;
						}
						if ( matchedSelectors[ sel ] ) {
							matchedHandlers.push( handleObj );
						}
					}
					if ( matchedHandlers.length ) {
						handlerQueue.push( { elem: cur, handlers: matchedHandlers } );
					}
				}
			}
		}

		// Add the remaining (directly-bound) handlers
		cur = this;
		if ( delegateCount < handlers.length ) {
			handlerQueue.push( { elem: cur, handlers: handlers.slice( delegateCount ) } );
		}

		return handlerQueue;
	},

	addProp: function( name, hook ) {
		Object.defineProperty( jQuery.Event.prototype, name, {
			enumerable: true,
			configurable: true,

			get: isFunction( hook ) ?
				function() {
					if ( this.originalEvent ) {
							return hook( this.originalEvent );
					}
				} :
				function() {
					if ( this.originalEvent ) {
							return this.originalEvent[ name ];
					}
				},

			set: function( value ) {
				Object.defineProperty( this, name, {
					enumerable: true,
					configurable: true,
					writable: true,
					value: value
				} );
			}
		} );
	},

	fix: function( originalEvent ) {
		return originalEvent[ jQuery.expando ] ?
			originalEvent :
			new jQuery.Event( originalEvent );
	},

	special: {
		load: {

			// Prevent triggered image.load events from bubbling to window.load
			noBubble: true
		},
		focus: {

			// Fire native event if possible so blur/focus sequence is correct
			trigger: function() {
				if ( this !== safeActiveElement() && this.focus ) {
					this.focus();
					return false;
				}
			},
			delegateType: "focusin"
		},
		blur: {
			trigger: function() {
				if ( this === safeActiveElement() && this.blur ) {
					this.blur();
					return false;
				}
			},
			delegateType: "focusout"
		},
		click: {

			// For checkbox, fire native event so checked state will be right
			trigger: function() {
				if ( this.type === "checkbox" && this.click && nodeName( this, "input" ) ) {
					this.click();
					return false;
				}
			},

			// For cross-browser consistency, don't fire native .click() on links
			_default: function( event ) {
				return nodeName( event.target, "a" );
			}
		},

		beforeunload: {
			postDispatch: function( event ) {

				// Support: Firefox 20+
				// Firefox doesn't alert if the returnValue field is not set.
				if ( event.result !== undefined && event.originalEvent ) {
					event.originalEvent.returnValue = event.result;
				}
			}
		}
	}
};

jQuery.removeEvent = function( elem, type, handle ) {

	// This "if" is needed for plain objects
	if ( elem.removeEventListener ) {
		elem.removeEventListener( type, handle );
	}
};

jQuery.Event = function( src, props ) {

	// Allow instantiation without the 'new' keyword
	if ( !( this instanceof jQuery.Event ) ) {
		return new jQuery.Event( src, props );
	}

	// Event object
	if ( src && src.type ) {
		this.originalEvent = src;
		this.type = src.type;

		// Events bubbling up the document may have been marked as prevented
		// by a handler lower down the tree; reflect the correct value.
		this.isDefaultPrevented = src.defaultPrevented ||
				src.defaultPrevented === undefined &&

				// Support: Android <=2.3 only
				src.returnValue === false ?
			returnTrue :
			returnFalse;

		// Create target properties
		// Support: Safari <=6 - 7 only
		// Target should not be a text node (#504, #13143)
		this.target = ( src.target && src.target.nodeType === 3 ) ?
			src.target.parentNode :
			src.target;

		this.currentTarget = src.currentTarget;
		this.relatedTarget = src.relatedTarget;

	// Event type
	} else {
		this.type = src;
	}

	// Put explicitly provided properties onto the event object
	if ( props ) {
		jQuery.extend( this, props );
	}

	// Create a timestamp if incoming event doesn't have one
	this.timeStamp = src && src.timeStamp || Date.now();

	// Mark it as fixed
	this[ jQuery.expando ] = true;
};

// jQuery.Event is based on DOM3 Events as specified by the ECMAScript Language Binding
// https://www.w3.org/TR/2003/WD-DOM-Level-3-Events-20030331/ecma-script-binding.html
jQuery.Event.prototype = {
	constructor: jQuery.Event,
	isDefaultPrevented: returnFalse,
	isPropagationStopped: returnFalse,
	isImmediatePropagationStopped: returnFalse,
	isSimulated: false,

	preventDefault: function() {
		var e = this.originalEvent;

		this.isDefaultPrevented = returnTrue;

		if ( e && !this.isSimulated ) {
			e.preventDefault();
		}
	},
	stopPropagation: function() {
		var e = this.originalEvent;

		this.isPropagationStopped = returnTrue;

		if ( e && !this.isSimulated ) {
			e.stopPropagation();
		}
	},
	stopImmediatePropagation: function() {
		var e = this.originalEvent;

		this.isImmediatePropagationStopped = returnTrue;

		if ( e && !this.isSimulated ) {
			e.stopImmediatePropagation();
		}

		this.stopPropagation();
	}
};

// Includes all common event props including KeyEvent and MouseEvent specific props
jQuery.each( {
	altKey: true,
	bubbles: true,
	cancelable: true,
	changedTouches: true,
	ctrlKey: true,
	detail: true,
	eventPhase: true,
	metaKey: true,
	pageX: true,
	pageY: true,
	shiftKey: true,
	view: true,
	"char": true,
	charCode: true,
	key: true,
	keyCode: true,
	button: true,
	buttons: true,
	clientX: true,
	clientY: true,
	offsetX: true,
	offsetY: true,
	pointerId: true,
	pointerType: true,
	screenX: true,
	screenY: true,
	targetTouches: true,
	toElement: true,
	touches: true,

	which: function( event ) {
		var button = event.button;

		// Add which for key events
		if ( event.which == null && rkeyEvent.test( event.type ) ) {
			return event.charCode != null ? event.charCode : event.keyCode;
		}

		// Add which for click: 1 === left; 2 === middle; 3 === right
		if ( !event.which && button !== undefined && rmouseEvent.test( event.type ) ) {
			if ( button & 1 ) {
				return 1;
			}

			if ( button & 2 ) {
				return 3;
			}

			if ( button & 4 ) {
				return 2;
			}

			return 0;
		}

		return event.which;
	}
}, jQuery.event.addProp );

// Create mouseenter/leave events using mouseover/out and event-time checks
// so that event delegation works in jQuery.
// Do the same for pointerenter/pointerleave and pointerover/pointerout
//
// Support: Safari 7 only
// Safari sends mouseenter too often; see:
// https://bugs.chromium.org/p/chromium/issues/detail?id=470258
// for the description of the bug (it existed in older Chrome versions as well).
jQuery.each( {
	mouseenter: "mouseover",
	mouseleave: "mouseout",
	pointerenter: "pointerover",
	pointerleave: "pointerout"
}, function( orig, fix ) {
	jQuery.event.special[ orig ] = {
		delegateType: fix,
		bindType: fix,

		handle: function( event ) {
			var ret,
				target = this,
				related = event.relatedTarget,
				handleObj = event.handleObj;

			// For mouseenter/leave call the handler if related is outside the target.
			// NB: No relatedTarget if the mouse left/entered the browser window
			if ( !related || ( related !== target && !jQuery.contains( target, related ) ) ) {
				event.type = handleObj.origType;
				ret = handleObj.handler.apply( this, arguments );
				event.type = fix;
			}
			return ret;
		}
	};
} );

jQuery.fn.extend( {

	on: function( types, selector, data, fn ) {
		return on( this, types, selector, data, fn );
	},
	one: function( types, selector, data, fn ) {
		return on( this, types, selector, data, fn, 1 );
	},
	off: function( types, selector, fn ) {
		var handleObj, type;
		if ( types && types.preventDefault && types.handleObj ) {

			// ( event )  dispatched jQuery.Event
			handleObj = types.handleObj;
			jQuery( types.delegateTarget ).off(
				handleObj.namespace ?
					handleObj.origType + "." + handleObj.namespace :
					handleObj.origType,
				handleObj.selector,
				handleObj.handler
			);
			return this;
		}
		if ( typeof types === "object" ) {

			// ( types-object [, selector] )
			for ( type in types ) {
				this.off( type, selector, types[ type ] );
			}
			return this;
		}
		if ( selector === false || typeof selector === "function" ) {

			// ( types [, fn] )
			fn = selector;
			selector = undefined;
		}
		if ( fn === false ) {
			fn = returnFalse;
		}
		return this.each( function() {
			jQuery.event.remove( this, types, fn, selector );
		} );
	}
} );


var

	/* eslint-disable max-len */

	// See https://github.com/eslint/eslint/issues/3229
	rxhtmlTag = /<(?!area|br|col|embed|hr|img|input|link|meta|param)(([a-z][^\/\0>\x20\t\r\n\f]*)[^>]*)\/>/gi,

	/* eslint-enable */

	// Support: IE <=10 - 11, Edge 12 - 13 only
	// In IE/Edge using regex groups here causes severe slowdowns.
	// See https://connect.microsoft.com/IE/feedback/details/1736512/
	rnoInnerhtml = /<script|<style|<link/i,

	// checked="checked" or checked
	rchecked = /checked\s*(?:[^=]|=\s*.checked.)/i,
	rcleanScript = /^\s*<!(?:\[CDATA\[|--)|(?:\]\]|--)>\s*$/g;

// Prefer a tbody over its parent table for containing new rows
function manipulationTarget( elem, content ) {
	if ( nodeName( elem, "table" ) &&
		nodeName( content.nodeType !== 11 ? content : content.firstChild, "tr" ) ) {

		return jQuery( elem ).children( "tbody" )[ 0 ] || elem;
	}

	return elem;
}

// Replace/restore the type attribute of script elements for safe DOM manipulation
function disableScript( elem ) {
	elem.type = ( elem.getAttribute( "type" ) !== null ) + "/" + elem.type;
	return elem;
}
function restoreScript( elem ) {
	if ( ( elem.type || "" ).slice( 0, 5 ) === "true/" ) {
		elem.type = elem.type.slice( 5 );
	} else {
		elem.removeAttribute( "type" );
	}

	return elem;
}

function cloneCopyEvent( src, dest ) {
	var i, l, type, pdataOld, pdataCur, udataOld, udataCur, events;

	if ( dest.nodeType !== 1 ) {
		return;
	}

	// 1. Copy private data: events, handlers, etc.
	if ( dataPriv.hasData( src ) ) {
		pdataOld = dataPriv.access( src );
		pdataCur = dataPriv.set( dest, pdataOld );
		events = pdataOld.events;

		if ( events ) {
			delete pdataCur.handle;
			pdataCur.events = {};

			for ( type in events ) {
				for ( i = 0, l = events[ type ].length; i < l; i++ ) {
					jQuery.event.add( dest, type, events[ type ][ i ] );
				}
			}
		}
	}

	// 2. Copy user data
	if ( dataUser.hasData( src ) ) {
		udataOld = dataUser.access( src );
		udataCur = jQuery.extend( {}, udataOld );

		dataUser.set( dest, udataCur );
	}
}

// Fix IE bugs, see support tests
function fixInput( src, dest ) {
	var nodeName = dest.nodeName.toLowerCase();

	// Fails to persist the checked state of a cloned checkbox or radio button.
	if ( nodeName === "input" && rcheckableType.test( src.type ) ) {
		dest.checked = src.checked;

	// Fails to return the selected option to the default selected state when cloning options
	} else if ( nodeName === "input" || nodeName === "textarea" ) {
		dest.defaultValue = src.defaultValue;
	}
}

function domManip( collection, args, callback, ignored ) {

	// Flatten any nested arrays
	args = concat.apply( [], args );

	var fragment, first, scripts, hasScripts, node, doc,
		i = 0,
		l = collection.length,
		iNoClone = l - 1,
		value = args[ 0 ],
		valueIsFunction = isFunction( value );

	// We can't cloneNode fragments that contain checked, in WebKit
	if ( valueIsFunction ||
			( l > 1 && typeof value === "string" &&
				!support.checkClone && rchecked.test( value ) ) ) {
		return collection.each( function( index ) {
			var self = collection.eq( index );
			if ( valueIsFunction ) {
				args[ 0 ] = value.call( this, index, self.html() );
			}
			domManip( self, args, callback, ignored );
		} );
	}

	if ( l ) {
		fragment = buildFragment( args, collection[ 0 ].ownerDocument, false, collection, ignored );
		first = fragment.firstChild;

		if ( fragment.childNodes.length === 1 ) {
			fragment = first;
		}

		// Require either new content or an interest in ignored elements to invoke the callback
		if ( first || ignored ) {
			scripts = jQuery.map( getAll( fragment, "script" ), disableScript );
			hasScripts = scripts.length;

			// Use the original fragment for the last item
			// instead of the first because it can end up
			// being emptied incorrectly in certain situations (#8070).
			for ( ; i < l; i++ ) {
				node = fragment;

				if ( i !== iNoClone ) {
					node = jQuery.clone( node, true, true );

					// Keep references to cloned scripts for later restoration
					if ( hasScripts ) {

						// Support: Android <=4.0 only, PhantomJS 1 only
						// push.apply(_, arraylike) throws on ancient WebKit
						jQuery.merge( scripts, getAll( node, "script" ) );
					}
				}

				callback.call( collection[ i ], node, i );
			}

			if ( hasScripts ) {
				doc = scripts[ scripts.length - 1 ].ownerDocument;

				// Reenable scripts
				jQuery.map( scripts, restoreScript );

				// Evaluate executable scripts on first document insertion
				for ( i = 0; i < hasScripts; i++ ) {
					node = scripts[ i ];
					if ( rscriptType.test( node.type || "" ) &&
						!dataPriv.access( node, "globalEval" ) &&
						jQuery.contains( doc, node ) ) {

						if ( node.src && ( node.type || "" ).toLowerCase()  !== "module" ) {

							// Optional AJAX dependency, but won't run scripts if not present
							if ( jQuery._evalUrl ) {
								jQuery._evalUrl( node.src );
							}
						} else {
							DOMEval( node.textContent.replace( rcleanScript, "" ), doc, node );
						}
					}
				}
			}
		}
	}

	return collection;
}

function remove( elem, selector, keepData ) {
	var node,
		nodes = selector ? jQuery.filter( selector, elem ) : elem,
		i = 0;

	for ( ; ( node = nodes[ i ] ) != null; i++ ) {
		if ( !keepData && node.nodeType === 1 ) {
			jQuery.cleanData( getAll( node ) );
		}

		if ( node.parentNode ) {
			if ( keepData && jQuery.contains( node.ownerDocument, node ) ) {
				setGlobalEval( getAll( node, "script" ) );
			}
			node.parentNode.removeChild( node );
		}
	}

	return elem;
}

jQuery.extend( {
	htmlPrefilter: function( html ) {
		return html.replace( rxhtmlTag, "<$1></$2>" );
	},

	clone: function( elem, dataAndEvents, deepDataAndEvents ) {
		var i, l, srcElements, destElements,
			clone = elem.cloneNode( true ),
			inPage = jQuery.contains( elem.ownerDocument, elem );

		// Fix IE cloning issues
		if ( !support.noCloneChecked && ( elem.nodeType === 1 || elem.nodeType === 11 ) &&
				!jQuery.isXMLDoc( elem ) ) {

			// We eschew Sizzle here for performance reasons: https://jsperf.com/getall-vs-sizzle/2
			destElements = getAll( clone );
			srcElements = getAll( elem );

			for ( i = 0, l = srcElements.length; i < l; i++ ) {
				fixInput( srcElements[ i ], destElements[ i ] );
			}
		}

		// Copy the events from the original to the clone
		if ( dataAndEvents ) {
			if ( deepDataAndEvents ) {
				srcElements = srcElements || getAll( elem );
				destElements = destElements || getAll( clone );

				for ( i = 0, l = srcElements.length; i < l; i++ ) {
					cloneCopyEvent( srcElements[ i ], destElements[ i ] );
				}
			} else {
				cloneCopyEvent( elem, clone );
			}
		}

		// Preserve script evaluation history
		destElements = getAll( clone, "script" );
		if ( destElements.length > 0 ) {
			setGlobalEval( destElements, !inPage && getAll( elem, "script" ) );
		}

		// Return the cloned set
		return clone;
	},

	cleanData: function( elems ) {
		var data, elem, type,
			special = jQuery.event.special,
			i = 0;

		for ( ; ( elem = elems[ i ] ) !== undefined; i++ ) {
			if ( acceptData( elem ) ) {
				if ( ( data = elem[ dataPriv.expando ] ) ) {
					if ( data.events ) {
						for ( type in data.events ) {
							if ( special[ type ] ) {
								jQuery.event.remove( elem, type );

							// This is a shortcut to avoid jQuery.event.remove's overhead
							} else {
								jQuery.removeEvent( elem, type, data.handle );
							}
						}
					}

					// Support: Chrome <=35 - 45+
					// Assign undefined instead of using delete, see Data#remove
					elem[ dataPriv.expando ] = undefined;
				}
				if ( elem[ dataUser.expando ] ) {

					// Support: Chrome <=35 - 45+
					// Assign undefined instead of using delete, see Data#remove
					elem[ dataUser.expando ] = undefined;
				}
			}
		}
	}
} );

jQuery.fn.extend( {
	detach: function( selector ) {
		return remove( this, selector, true );
	},

	remove: function( selector ) {
		return remove( this, selector );
	},

	text: function( value ) {
		return access( this, function( value ) {
			return value === undefined ?
				jQuery.text( this ) :
				this.empty().each( function() {
					if ( this.nodeType === 1 || this.nodeType === 11 || this.nodeType === 9 ) {
						this.textContent = value;
					}
				} );
		}, null, value, arguments.length );
	},

	append: function() {
		return domManip( this, arguments, function( elem ) {
			if ( this.nodeType === 1 || this.nodeType === 11 || this.nodeType === 9 ) {
				var target = manipulationTarget( this, elem );
				target.appendChild( elem );
			}
		} );
	},

	prepend: function() {
		return domManip( this, arguments, function( elem ) {
			if ( this.nodeType === 1 || this.nodeType === 11 || this.nodeType === 9 ) {
				var target = manipulationTarget( this, elem );
				target.insertBefore( elem, target.firstChild );
			}
		} );
	},

	before: function() {
		return domManip( this, arguments, function( elem ) {
			if ( this.parentNode ) {
				this.parentNode.insertBefore( elem, this );
			}
		} );
	},

	after: function() {
		return domManip( this, arguments, function( elem ) {
			if ( this.parentNode ) {
				this.parentNode.insertBefore( elem, this.nextSibling );
			}
		} );
	},

	empty: function() {
		var elem,
			i = 0;

		for ( ; ( elem = this[ i ] ) != null; i++ ) {
			if ( elem.nodeType === 1 ) {

				// Prevent memory leaks
				jQuery.cleanData( getAll( elem, false ) );

				// Remove any remaining nodes
				elem.textContent = "";
			}
		}

		return this;
	},

	clone: function( dataAndEvents, deepDataAndEvents ) {
		dataAndEvents = dataAndEvents == null ? false : dataAndEvents;
		deepDataAndEvents = deepDataAndEvents == null ? dataAndEvents : deepDataAndEvents;

		return this.map( function() {
			return jQuery.clone( this, dataAndEvents, deepDataAndEvents );
		} );
	},

	html: function( value ) {
		return access( this, function( value ) {
			var elem = this[ 0 ] || {},
				i = 0,
				l = this.length;

			if ( value === undefined && elem.nodeType === 1 ) {
				return elem.innerHTML;
			}

			// See if we can take a shortcut and just use innerHTML
			if ( typeof value === "string" && !rnoInnerhtml.test( value ) &&
				!wrapMap[ ( rtagName.exec( value ) || [ "", "" ] )[ 1 ].toLowerCase() ] ) {

				value = jQuery.htmlPrefilter( value );

				try {
					for ( ; i < l; i++ ) {
						elem = this[ i ] || {};

						// Remove element nodes and prevent memory leaks
						if ( elem.nodeType === 1 ) {
							jQuery.cleanData( getAll( elem, false ) );
							elem.innerHTML = value;
						}
					}

					elem = 0;

				// If using innerHTML throws an exception, use the fallback method
				} catch ( e ) {}
			}

			if ( elem ) {
				this.empty().append( value );
			}
		}, null, value, arguments.length );
	},

	replaceWith: function() {
		var ignored = [];

		// Make the changes, replacing each non-ignored context element with the new content
		return domManip( this, arguments, function( elem ) {
			var parent = this.parentNode;

			if ( jQuery.inArray( this, ignored ) < 0 ) {
				jQuery.cleanData( getAll( this ) );
				if ( parent ) {
					parent.replaceChild( elem, this );
				}
			}

		// Force callback invocation
		}, ignored );
	}
} );

jQuery.each( {
	appendTo: "append",
	prependTo: "prepend",
	insertBefore: "before",
	insertAfter: "after",
	replaceAll: "replaceWith"
}, function( name, original ) {
	jQuery.fn[ name ] = function( selector ) {
		var elems,
			ret = [],
			insert = jQuery( selector ),
			last = insert.length - 1,
			i = 0;

		for ( ; i <= last; i++ ) {
			elems = i === last ? this : this.clone( true );
			jQuery( insert[ i ] )[ original ]( elems );

			// Support: Android <=4.0 only, PhantomJS 1 only
			// .get() because push.apply(_, arraylike) throws on ancient WebKit
			push.apply( ret, elems.get() );
		}

		return this.pushStack( ret );
	};
} );
var rnumnonpx = new RegExp( "^(" + pnum + ")(?!px)[a-z%]+$", "i" );

var getStyles = function( elem ) {

		// Support: IE <=11 only, Firefox <=30 (#15098, #14150)
		// IE throws on elements created in popups
		// FF meanwhile throws on frame elements through "defaultView.getComputedStyle"
		var view = elem.ownerDocument.defaultView;

		if ( !view || !view.opener ) {
			view = window;
		}

		return view.getComputedStyle( elem );
	};

var rboxStyle = new RegExp( cssExpand.join( "|" ), "i" );



( function() {

	// Executing both pixelPosition & boxSizingReliable tests require only one layout
	// so they're executed at the same time to save the second computation.
	function computeStyleTests() {

		// This is a singleton, we need to execute it only once
		if ( !div ) {
			return;
		}

		container.style.cssText = "position:absolute;left:-11111px;width:60px;" +
			"margin-top:1px;padding:0;border:0";
		div.style.cssText =
			"position:relative;display:block;box-sizing:border-box;overflow:scroll;" +
			"margin:auto;border:1px;padding:1px;" +
			"width:60%;top:1%";
		documentElement.appendChild( container ).appendChild( div );

		var divStyle = window.getComputedStyle( div );
		pixelPositionVal = divStyle.top !== "1%";

		// Support: Android 4.0 - 4.3 only, Firefox <=3 - 44
		reliableMarginLeftVal = roundPixelMeasures( divStyle.marginLeft ) === 12;

		// Support: Android 4.0 - 4.3 only, Safari <=9.1 - 10.1, iOS <=7.0 - 9.3
		// Some styles come back with percentage values, even though they shouldn't
		div.style.right = "60%";
		pixelBoxStylesVal = roundPixelMeasures( divStyle.right ) === 36;

		// Support: IE 9 - 11 only
		// Detect misreporting of content dimensions for box-sizing:border-box elements
		boxSizingReliableVal = roundPixelMeasures( divStyle.width ) === 36;

		// Support: IE 9 only
		// Detect overflow:scroll screwiness (gh-3699)
		div.style.position = "absolute";
		scrollboxSizeVal = div.offsetWidth === 36 || "absolute";

		documentElement.removeChild( container );

		// Nullify the div so it wouldn't be stored in the memory and
		// it will also be a sign that checks already performed
		div = null;
	}

	function roundPixelMeasures( measure ) {
		return Math.round( parseFloat( measure ) );
	}

	var pixelPositionVal, boxSizingReliableVal, scrollboxSizeVal, pixelBoxStylesVal,
		reliableMarginLeftVal,
		container = document.createElement( "div" ),
		div = document.createElement( "div" );

	// Finish early in limited (non-browser) environments
	if ( !div.style ) {
		return;
	}

	// Support: IE <=9 - 11 only
	// Style of cloned element affects source element cloned (#8908)
	div.style.backgroundClip = "content-box";
	div.cloneNode( true ).style.backgroundClip = "";
	support.clearCloneStyle = div.style.backgroundClip === "content-box";

	jQuery.extend( support, {
		boxSizingReliable: function() {
			computeStyleTests();
			return boxSizingReliableVal;
		},
		pixelBoxStyles: function() {
			computeStyleTests();
			return pixelBoxStylesVal;
		},
		pixelPosition: function() {
			computeStyleTests();
			return pixelPositionVal;
		},
		reliableMarginLeft: function() {
			computeStyleTests();
			return reliableMarginLeftVal;
		},
		scrollboxSize: function() {
			computeStyleTests();
			return scrollboxSizeVal;
		}
	} );
} )();


function curCSS( elem, name, computed ) {
	var width, minWidth, maxWidth, ret,

		// Support: Firefox 51+
		// Retrieving style before computed somehow
		// fixes an issue with getting wrong values
		// on detached elements
		style = elem.style;

	computed = computed || getStyles( elem );

	// getPropertyValue is needed for:
	//   .css('filter') (IE 9 only, #12537)
	//   .css('--customProperty) (#3144)
	if ( computed ) {
		ret = computed.getPropertyValue( name ) || computed[ name ];

		if ( ret === "" && !jQuery.contains( elem.ownerDocument, elem ) ) {
			ret = jQuery.style( elem, name );
		}

		// A tribute to the "awesome hack by Dean Edwards"
		// Android Browser returns percentage for some values,
		// but width seems to be reliably pixels.
		// This is against the CSSOM draft spec:
		// https://drafts.csswg.org/cssom/#resolved-values
		if ( !support.pixelBoxStyles() && rnumnonpx.test( ret ) && rboxStyle.test( name ) ) {

			// Remember the original values
			width = style.width;
			minWidth = style.minWidth;
			maxWidth = style.maxWidth;

			// Put in the new values to get a computed value out
			style.minWidth = style.maxWidth = style.width = ret;
			ret = computed.width;

			// Revert the changed values
			style.width = width;
			style.minWidth = minWidth;
			style.maxWidth = maxWidth;
		}
	}

	return ret !== undefined ?

		// Support: IE <=9 - 11 only
		// IE returns zIndex value as an integer.
		ret + "" :
		ret;
}


function addGetHookIf( conditionFn, hookFn ) {

	// Define the hook, we'll check on the first run if it's really needed.
	return {
		get: function() {
			if ( conditionFn() ) {

				// Hook not needed (or it's not possible to use it due
				// to missing dependency), remove it.
				delete this.get;
				return;
			}

			// Hook needed; redefine it so that the support test is not executed again.
			return ( this.get = hookFn ).apply( this, arguments );
		}
	};
}


var

	// Swappable if display is none or starts with table
	// except "table", "table-cell", or "table-caption"
	// See here for display values: https://developer.mozilla.org/en-US/docs/CSS/display
	rdisplayswap = /^(none|table(?!-c[ea]).+)/,
	rcustomProp = /^--/,
	cssShow = { position: "absolute", visibility: "hidden", display: "block" },
	cssNormalTransform = {
		letterSpacing: "0",
		fontWeight: "400"
	},

	cssPrefixes = [ "Webkit", "Moz", "ms" ],
	emptyStyle = document.createElement( "div" ).style;

// Return a css property mapped to a potentially vendor prefixed property
function vendorPropName( name ) {

	// Shortcut for names that are not vendor prefixed
	if ( name in emptyStyle ) {
		return name;
	}

	// Check for vendor prefixed names
	var capName = name[ 0 ].toUpperCase() + name.slice( 1 ),
		i = cssPrefixes.length;

	while ( i-- ) {
		name = cssPrefixes[ i ] + capName;
		if ( name in emptyStyle ) {
			return name;
		}
	}
}

// Return a property mapped along what jQuery.cssProps suggests or to
// a vendor prefixed property.
function finalPropName( name ) {
	var ret = jQuery.cssProps[ name ];
	if ( !ret ) {
		ret = jQuery.cssProps[ name ] = vendorPropName( name ) || name;
	}
	return ret;
}

function setPositiveNumber( elem, value, subtract ) {

	// Any relative (+/-) values have already been
	// normalized at this point
	var matches = rcssNum.exec( value );
	return matches ?

		// Guard against undefined "subtract", e.g., when used as in cssHooks
		Math.max( 0, matches[ 2 ] - ( subtract || 0 ) ) + ( matches[ 3 ] || "px" ) :
		value;
}

function boxModelAdjustment( elem, dimension, box, isBorderBox, styles, computedVal ) {
	var i = dimension === "width" ? 1 : 0,
		extra = 0,
		delta = 0;

	// Adjustment may not be necessary
	if ( box === ( isBorderBox ? "border" : "content" ) ) {
		return 0;
	}

	for ( ; i < 4; i += 2 ) {

		// Both box models exclude margin
		if ( box === "margin" ) {
			delta += jQuery.css( elem, box + cssExpand[ i ], true, styles );
		}

		// If we get here with a content-box, we're seeking "padding" or "border" or "margin"
		if ( !isBorderBox ) {

			// Add padding
			delta += jQuery.css( elem, "padding" + cssExpand[ i ], true, styles );

			// For "border" or "margin", add border
			if ( box !== "padding" ) {
				delta += jQuery.css( elem, "border" + cssExpand[ i ] + "Width", true, styles );

			// But still keep track of it otherwise
			} else {
				extra += jQuery.css( elem, "border" + cssExpand[ i ] + "Width", true, styles );
			}

		// If we get here with a border-box (content + padding + border), we're seeking "content" or
		// "padding" or "margin"
		} else {

			// For "content", subtract padding
			if ( box === "content" ) {
				delta -= jQuery.css( elem, "padding" + cssExpand[ i ], true, styles );
			}

			// For "content" or "padding", subtract border
			if ( box !== "margin" ) {
				delta -= jQuery.css( elem, "border" + cssExpand[ i ] + "Width", true, styles );
			}
		}
	}

	// Account for positive content-box scroll gutter when requested by providing computedVal
	if ( !isBorderBox && computedVal >= 0 ) {

		// offsetWidth/offsetHeight is a rounded sum of content, padding, scroll gutter, and border
		// Assuming integer scroll gutter, subtract the rest and round down
		delta += Math.max( 0, Math.ceil(
			elem[ "offset" + dimension[ 0 ].toUpperCase() + dimension.slice( 1 ) ] -
			computedVal -
			delta -
			extra -
			0.5
		) );
	}

	return delta;
}

function getWidthOrHeight( elem, dimension, extra ) {

	// Start with computed style
	var styles = getStyles( elem ),
		val = curCSS( elem, dimension, styles ),
		isBorderBox = jQuery.css( elem, "boxSizing", false, styles ) === "border-box",
		valueIsBorderBox = isBorderBox;

	// Support: Firefox <=54
	// Return a confounding non-pixel value or feign ignorance, as appropriate.
	if ( rnumnonpx.test( val ) ) {
		if ( !extra ) {
			return val;
		}
		val = "auto";
	}

	// Check for style in case a browser which returns unreliable values
	// for getComputedStyle silently falls back to the reliable elem.style
	valueIsBorderBox = valueIsBorderBox &&
		( support.boxSizingReliable() || val === elem.style[ dimension ] );

	// Fall back to offsetWidth/offsetHeight when value is "auto"
	// This happens for inline elements with no explicit setting (gh-3571)
	// Support: Android <=4.1 - 4.3 only
	// Also use offsetWidth/offsetHeight for misreported inline dimensions (gh-3602)
	if ( val === "auto" ||
		!parseFloat( val ) && jQuery.css( elem, "display", false, styles ) === "inline" ) {

		val = elem[ "offset" + dimension[ 0 ].toUpperCase() + dimension.slice( 1 ) ];

		// offsetWidth/offsetHeight provide border-box values
		valueIsBorderBox = true;
	}

	// Normalize "" and auto
	val = parseFloat( val ) || 0;

	// Adjust for the element's box model
	return ( val +
		boxModelAdjustment(
			elem,
			dimension,
			extra || ( isBorderBox ? "border" : "content" ),
			valueIsBorderBox,
			styles,

			// Provide the current computed size to request scroll gutter calculation (gh-3589)
			val
		)
	) + "px";
}

jQuery.extend( {

	// Add in style property hooks for overriding the default
	// behavior of getting and setting a style property
	cssHooks: {
		opacity: {
			get: function( elem, computed ) {
				if ( computed ) {

					// We should always get a number back from opacity
					var ret = curCSS( elem, "opacity" );
					return ret === "" ? "1" : ret;
				}
			}
		}
	},

	// Don't automatically add "px" to these possibly-unitless properties
	cssNumber: {
		"animationIterationCount": true,
		"columnCount": true,
		"fillOpacity": true,
		"flexGrow": true,
		"flexShrink": true,
		"fontWeight": true,
		"lineHeight": true,
		"opacity": true,
		"order": true,
		"orphans": true,
		"widows": true,
		"zIndex": true,
		"zoom": true
	},

	// Add in properties whose names you wish to fix before
	// setting or getting the value
	cssProps: {},

	// Get and set the style property on a DOM Node
	style: function( elem, name, value, extra ) {

		// Don't set styles on text and comment nodes
		if ( !elem || elem.nodeType === 3 || elem.nodeType === 8 || !elem.style ) {
			return;
		}

		// Make sure that we're working with the right name
		var ret, type, hooks,
			origName = camelCase( name ),
			isCustomProp = rcustomProp.test( name ),
			style = elem.style;

		// Make sure that we're working with the right name. We don't
		// want to query the value if it is a CSS custom property
		// since they are user-defined.
		if ( !isCustomProp ) {
			name = finalPropName( origName );
		}

		// Gets hook for the prefixed version, then unprefixed version
		hooks = jQuery.cssHooks[ name ] || jQuery.cssHooks[ origName ];

		// Check if we're setting a value
		if ( value !== undefined ) {
			type = typeof value;

			// Convert "+=" or "-=" to relative numbers (#7345)
			if ( type === "string" && ( ret = rcssNum.exec( value ) ) && ret[ 1 ] ) {
				value = adjustCSS( elem, name, ret );

				// Fixes bug #9237
				type = "number";
			}

			// Make sure that null and NaN values aren't set (#7116)
			if ( value == null || value !== value ) {
				return;
			}

			// If a number was passed in, add the unit (except for certain CSS properties)
			if ( type === "number" ) {
				value += ret && ret[ 3 ] || ( jQuery.cssNumber[ origName ] ? "" : "px" );
			}

			// background-* props affect original clone's values
			if ( !support.clearCloneStyle && value === "" && name.indexOf( "background" ) === 0 ) {
				style[ name ] = "inherit";
			}

			// If a hook was provided, use that value, otherwise just set the specified value
			if ( !hooks || !( "set" in hooks ) ||
				( value = hooks.set( elem, value, extra ) ) !== undefined ) {

				if ( isCustomProp ) {
					style.setProperty( name, value );
				} else {
					style[ name ] = value;
				}
			}

		} else {

			// If a hook was provided get the non-computed value from there
			if ( hooks && "get" in hooks &&
				( ret = hooks.get( elem, false, extra ) ) !== undefined ) {

				return ret;
			}

			// Otherwise just get the value from the style object
			return style[ name ];
		}
	},

	css: function( elem, name, extra, styles ) {
		var val, num, hooks,
			origName = camelCase( name ),
			isCustomProp = rcustomProp.test( name );

		// Make sure that we're working with the right name. We don't
		// want to modify the value if it is a CSS custom property
		// since they are user-defined.
		if ( !isCustomProp ) {
			name = finalPropName( origName );
		}

		// Try prefixed name followed by the unprefixed name
		hooks = jQuery.cssHooks[ name ] || jQuery.cssHooks[ origName ];

		// If a hook was provided get the computed value from there
		if ( hooks && "get" in hooks ) {
			val = hooks.get( elem, true, extra );
		}

		// Otherwise, if a way to get the computed value exists, use that
		if ( val === undefined ) {
			val = curCSS( elem, name, styles );
		}

		// Convert "normal" to computed value
		if ( val === "normal" && name in cssNormalTransform ) {
			val = cssNormalTransform[ name ];
		}

		// Make numeric if forced or a qualifier was provided and val looks numeric
		if ( extra === "" || extra ) {
			num = parseFloat( val );
			return extra === true || isFinite( num ) ? num || 0 : val;
		}

		return val;
	}
} );

jQuery.each( [ "height", "width" ], function( i, dimension ) {
	jQuery.cssHooks[ dimension ] = {
		get: function( elem, computed, extra ) {
			if ( computed ) {

				// Certain elements can have dimension info if we invisibly show them
				// but it must have a current display style that would benefit
				return rdisplayswap.test( jQuery.css( elem, "display" ) ) &&

					// Support: Safari 8+
					// Table columns in Safari have non-zero offsetWidth & zero
					// getBoundingClientRect().width unless display is changed.
					// Support: IE <=11 only
					// Running getBoundingClientRect on a disconnected node
					// in IE throws an error.
					( !elem.getClientRects().length || !elem.getBoundingClientRect().width ) ?
						swap( elem, cssShow, function() {
							return getWidthOrHeight( elem, dimension, extra );
						} ) :
						getWidthOrHeight( elem, dimension, extra );
			}
		},

		set: function( elem, value, extra ) {
			var matches,
				styles = getStyles( elem ),
				isBorderBox = jQuery.css( elem, "boxSizing", false, styles ) === "border-box",
				subtract = extra && boxModelAdjustment(
					elem,
					dimension,
					extra,
					isBorderBox,
					styles
				);

			// Account for unreliable border-box dimensions by comparing offset* to computed and
			// faking a content-box to get border and padding (gh-3699)
			if ( isBorderBox && support.scrollboxSize() === styles.position ) {
				subtract -= Math.ceil(
					elem[ "offset" + dimension[ 0 ].toUpperCase() + dimension.slice( 1 ) ] -
					parseFloat( styles[ dimension ] ) -
					boxModelAdjustment( elem, dimension, "border", false, styles ) -
					0.5
				);
			}

			// Convert to pixels if value adjustment is needed
			if ( subtract && ( matches = rcssNum.exec( value ) ) &&
				( matches[ 3 ] || "px" ) !== "px" ) {

				elem.style[ dimension ] = value;
				value = jQuery.css( elem, dimension );
			}

			return setPositiveNumber( elem, value, subtract );
		}
	};
} );

jQuery.cssHooks.marginLeft = addGetHookIf( support.reliableMarginLeft,
	function( elem, computed ) {
		if ( computed ) {
			return ( parseFloat( curCSS( elem, "marginLeft" ) ) ||
				elem.getBoundingClientRect().left -
					swap( elem, { marginLeft: 0 }, function() {
						return elem.getBoundingClientRect().left;
					} )
				) + "px";
		}
	}
);

// These hooks are used by animate to expand properties
jQuery.each( {
	margin: "",
	padding: "",
	border: "Width"
}, function( prefix, suffix ) {
	jQuery.cssHooks[ prefix + suffix ] = {
		expand: function( value ) {
			var i = 0,
				expanded = {},

				// Assumes a single number if not a string
				parts = typeof value === "string" ? value.split( " " ) : [ value ];

			for ( ; i < 4; i++ ) {
				expanded[ prefix + cssExpand[ i ] + suffix ] =
					parts[ i ] || parts[ i - 2 ] || parts[ 0 ];
			}

			return expanded;
		}
	};

	if ( prefix !== "margin" ) {
		jQuery.cssHooks[ prefix + suffix ].set = setPositiveNumber;
	}
} );

jQuery.fn.extend( {
	css: function( name, value ) {
		return access( this, function( elem, name, value ) {
			var styles, len,
				map = {},
				i = 0;

			if ( Array.isArray( name ) ) {
				styles = getStyles( elem );
				len = name.length;

				for ( ; i < len; i++ ) {
					map[ name[ i ] ] = jQuery.css( elem, name[ i ], false, styles );
				}

				return map;
			}

			return value !== undefined ?
				jQuery.style( elem, name, value ) :
				jQuery.css( elem, name );
		}, name, value, arguments.length > 1 );
	}
} );


function Tween( elem, options, prop, end, easing ) {
	return new Tween.prototype.init( elem, options, prop, end, easing );
}
jQuery.Tween = Tween;

Tween.prototype = {
	constructor: Tween,
	init: function( elem, options, prop, end, easing, unit ) {
		this.elem = elem;
		this.prop = prop;
		this.easing = easing || jQuery.easing._default;
		this.options = options;
		this.start = this.now = this.cur();
		this.end = end;
		this.unit = unit || ( jQuery.cssNumber[ prop ] ? "" : "px" );
	},
	cur: function() {
		var hooks = Tween.propHooks[ this.prop ];

		return hooks && hooks.get ?
			hooks.get( this ) :
			Tween.propHooks._default.get( this );
	},
	run: function( percent ) {
		var eased,
			hooks = Tween.propHooks[ this.prop ];

		if ( this.options.duration ) {
			this.pos = eased = jQuery.easing[ this.easing ](
				percent, this.options.duration * percent, 0, 1, this.options.duration
			);
		} else {
			this.pos = eased = percent;
		}
		this.now = ( this.end - this.start ) * eased + this.start;

		if ( this.options.step ) {
			this.options.step.call( this.elem, this.now, this );
		}

		if ( hooks && hooks.set ) {
			hooks.set( this );
		} else {
			Tween.propHooks._default.set( this );
		}
		return this;
	}
};

Tween.prototype.init.prototype = Tween.prototype;

Tween.propHooks = {
	_default: {
		get: function( tween ) {
			var result;

			// Use a property on the element directly when it is not a DOM element,
			// or when there is no matching style property that exists.
			if ( tween.elem.nodeType !== 1 ||
				tween.elem[ tween.prop ] != null && tween.elem.style[ tween.prop ] == null ) {
				return tween.elem[ tween.prop ];
			}

			// Passing an empty string as a 3rd parameter to .css will automatically
			// attempt a parseFloat and fallback to a string if the parse fails.
			// Simple values such as "10px" are parsed to Float;
			// complex values such as "rotate(1rad)" are returned as-is.
			result = jQuery.css( tween.elem, tween.prop, "" );

			// Empty strings, null, undefined and "auto" are converted to 0.
			return !result || result === "auto" ? 0 : result;
		},
		set: function( tween ) {

			// Use step hook for back compat.
			// Use cssHook if its there.
			// Use .style if available and use plain properties where available.
			if ( jQuery.fx.step[ tween.prop ] ) {
				jQuery.fx.step[ tween.prop ]( tween );
			} else if ( tween.elem.nodeType === 1 &&
				( tween.elem.style[ jQuery.cssProps[ tween.prop ] ] != null ||
					jQuery.cssHooks[ tween.prop ] ) ) {
				jQuery.style( tween.elem, tween.prop, tween.now + tween.unit );
			} else {
				tween.elem[ tween.prop ] = tween.now;
			}
		}
	}
};

// Support: IE <=9 only
// Panic based approach to setting things on disconnected nodes
Tween.propHooks.scrollTop = Tween.propHooks.scrollLeft = {
	set: function( tween ) {
		if ( tween.elem.nodeType && tween.elem.parentNode ) {
			tween.elem[ tween.prop ] = tween.now;
		}
	}
};

jQuery.easing = {
	linear: function( p ) {
		return p;
	},
	swing: function( p ) {
		return 0.5 - Math.cos( p * Math.PI ) / 2;
	},
	_default: "swing"
};

jQuery.fx = Tween.prototype.init;

// Back compat <1.8 extension point
jQuery.fx.step = {};




var
	fxNow, inProgress,
	rfxtypes = /^(?:toggle|show|hide)$/,
	rrun = /queueHooks$/;

function schedule() {
	if ( inProgress ) {
		if ( document.hidden === false && window.requestAnimationFrame ) {
			window.requestAnimationFrame( schedule );
		} else {
			window.setTimeout( schedule, jQuery.fx.interval );
		}

		jQuery.fx.tick();
	}
}

// Animations created synchronously will run synchronously
function createFxNow() {
	window.setTimeout( function() {
		fxNow = undefined;
	} );
	return ( fxNow = Date.now() );
}

// Generate parameters to create a standard animation
function genFx( type, includeWidth ) {
	var which,
		i = 0,
		attrs = { height: type };

	// If we include width, step value is 1 to do all cssExpand values,
	// otherwise step value is 2 to skip over Left and Right
	includeWidth = includeWidth ? 1 : 0;
	for ( ; i < 4; i += 2 - includeWidth ) {
		which = cssExpand[ i ];
		attrs[ "margin" + which ] = attrs[ "padding" + which ] = type;
	}

	if ( includeWidth ) {
		attrs.opacity = attrs.width = type;
	}

	return attrs;
}

function createTween( value, prop, animation ) {
	var tween,
		collection = ( Animation.tweeners[ prop ] || [] ).concat( Animation.tweeners[ "*" ] ),
		index = 0,
		length = collection.length;
	for ( ; index < length; index++ ) {
		if ( ( tween = collection[ index ].call( animation, prop, value ) ) ) {

			// We're done with this property
			return tween;
		}
	}
}

function defaultPrefilter( elem, props, opts ) {
	var prop, value, toggle, hooks, oldfire, propTween, restoreDisplay, display,
		isBox = "width" in props || "height" in props,
		anim = this,
		orig = {},
		style = elem.style,
		hidden = elem.nodeType && isHiddenWithinTree( elem ),
		dataShow = dataPriv.get( elem, "fxshow" );

	// Queue-skipping animations hijack the fx hooks
	if ( !opts.queue ) {
		hooks = jQuery._queueHooks( elem, "fx" );
		if ( hooks.unqueued == null ) {
			hooks.unqueued = 0;
			oldfire = hooks.empty.fire;
			hooks.empty.fire = function() {
				if ( !hooks.unqueued ) {
					oldfire();
				}
			};
		}
		hooks.unqueued++;

		anim.always( function() {

			// Ensure the complete handler is called before this completes
			anim.always( function() {
				hooks.unqueued--;
				if ( !jQuery.queue( elem, "fx" ).length ) {
					hooks.empty.fire();
				}
			} );
		} );
	}

	// Detect show/hide animations
	for ( prop in props ) {
		value = props[ prop ];
		if ( rfxtypes.test( value ) ) {
			delete props[ prop ];
			toggle = toggle || value === "toggle";
			if ( value === ( hidden ? "hide" : "show" ) ) {

				// Pretend to be hidden if this is a "show" and
				// there is still data from a stopped show/hide
				if ( value === "show" && dataShow && dataShow[ prop ] !== undefined ) {
					hidden = true;

				// Ignore all other no-op show/hide data
				} else {
					continue;
				}
			}
			orig[ prop ] = dataShow && dataShow[ prop ] || jQuery.style( elem, prop );
		}
	}

	// Bail out if this is a no-op like .hide().hide()
	propTween = !jQuery.isEmptyObject( props );
	if ( !propTween && jQuery.isEmptyObject( orig ) ) {
		return;
	}

	// Restrict "overflow" and "display" styles during box animations
	if ( isBox && elem.nodeType === 1 ) {

		// Support: IE <=9 - 11, Edge 12 - 15
		// Record all 3 overflow attributes because IE does not infer the shorthand
		// from identically-valued overflowX and overflowY and Edge just mirrors
		// the overflowX value there.
		opts.overflow = [ style.overflow, style.overflowX, style.overflowY ];

		// Identify a display type, preferring old show/hide data over the CSS cascade
		restoreDisplay = dataShow && dataShow.display;
		if ( restoreDisplay == null ) {
			restoreDisplay = dataPriv.get( elem, "display" );
		}
		display = jQuery.css( elem, "display" );
		if ( display === "none" ) {
			if ( restoreDisplay ) {
				display = restoreDisplay;
			} else {

				// Get nonempty value(s) by temporarily forcing visibility
				showHide( [ elem ], true );
				restoreDisplay = elem.style.display || restoreDisplay;
				display = jQuery.css( elem, "display" );
				showHide( [ elem ] );
			}
		}

		// Animate inline elements as inline-block
		if ( display === "inline" || display === "inline-block" && restoreDisplay != null ) {
			if ( jQuery.css( elem, "float" ) === "none" ) {

				// Restore the original display value at the end of pure show/hide animations
				if ( !propTween ) {
					anim.done( function() {
						style.display = restoreDisplay;
					} );
					if ( restoreDisplay == null ) {
						display = style.display;
						restoreDisplay = display === "none" ? "" : display;
					}
				}
				style.display = "inline-block";
			}
		}
	}

	if ( opts.overflow ) {
		style.overflow = "hidden";
		anim.always( function() {
			style.overflow = opts.overflow[ 0 ];
			style.overflowX = opts.overflow[ 1 ];
			style.overflowY = opts.overflow[ 2 ];
		} );
	}

	// Implement show/hide animations
	propTween = false;
	for ( prop in orig ) {

		// General show/hide setup for this element animation
		if ( !propTween ) {
			if ( dataShow ) {
				if ( "hidden" in dataShow ) {
					hidden = dataShow.hidden;
				}
			} else {
				dataShow = dataPriv.access( elem, "fxshow", { display: restoreDisplay } );
			}

			// Store hidden/visible for toggle so `.stop().toggle()` "reverses"
			if ( toggle ) {
				dataShow.hidden = !hidden;
			}

			// Show elements before animating them
			if ( hidden ) {
				showHide( [ elem ], true );
			}

			/* eslint-disable no-loop-func */

			anim.done( function() {

			/* eslint-enable no-loop-func */

				// The final step of a "hide" animation is actually hiding the element
				if ( !hidden ) {
					showHide( [ elem ] );
				}
				dataPriv.remove( elem, "fxshow" );
				for ( prop in orig ) {
					jQuery.style( elem, prop, orig[ prop ] );
				}
			} );
		}

		// Per-property setup
		propTween = createTween( hidden ? dataShow[ prop ] : 0, prop, anim );
		if ( !( prop in dataShow ) ) {
			dataShow[ prop ] = propTween.start;
			if ( hidden ) {
				propTween.end = propTween.start;
				propTween.start = 0;
			}
		}
	}
}

function propFilter( props, specialEasing ) {
	var index, name, easing, value, hooks;

	// camelCase, specialEasing and expand cssHook pass
	for ( index in props ) {
		name = camelCase( index );
		easing = specialEasing[ name ];
		value = props[ index ];
		if ( Array.isArray( value ) ) {
			easing = value[ 1 ];
			value = props[ index ] = value[ 0 ];
		}

		if ( index !== name ) {
			props[ name ] = value;
			delete props[ index ];
		}

		hooks = jQuery.cssHooks[ name ];
		if ( hooks && "expand" in hooks ) {
			value = hooks.expand( value );
			delete props[ name ];

			// Not quite $.extend, this won't overwrite existing keys.
			// Reusing 'index' because we have the correct "name"
			for ( index in value ) {
				if ( !( index in props ) ) {
					props[ index ] = value[ index ];
					specialEasing[ index ] = easing;
				}
			}
		} else {
			specialEasing[ name ] = easing;
		}
	}
}

function Animation( elem, properties, options ) {
	var result,
		stopped,
		index = 0,
		length = Animation.prefilters.length,
		deferred = jQuery.Deferred().always( function() {

			// Don't match elem in the :animated selector
			delete tick.elem;
		} ),
		tick = function() {
			if ( stopped ) {
				return false;
			}
			var currentTime = fxNow || createFxNow(),
				remaining = Math.max( 0, animation.startTime + animation.duration - currentTime ),

				// Support: Android 2.3 only
				// Archaic crash bug won't allow us to use `1 - ( 0.5 || 0 )` (#12497)
				temp = remaining / animation.duration || 0,
				percent = 1 - temp,
				index = 0,
				length = animation.tweens.length;

			for ( ; index < length; index++ ) {
				animation.tweens[ index ].run( percent );
			}

			deferred.notifyWith( elem, [ animation, percent, remaining ] );

			// If there's more to do, yield
			if ( percent < 1 && length ) {
				return remaining;
			}

			// If this was an empty animation, synthesize a final progress notification
			if ( !length ) {
				deferred.notifyWith( elem, [ animation, 1, 0 ] );
			}

			// Resolve the animation and report its conclusion
			deferred.resolveWith( elem, [ animation ] );
			return false;
		},
		animation = deferred.promise( {
			elem: elem,
			props: jQuery.extend( {}, properties ),
			opts: jQuery.extend( true, {
				specialEasing: {},
				easing: jQuery.easing._default
			}, options ),
			originalProperties: properties,
			originalOptions: options,
			startTime: fxNow || createFxNow(),
			duration: options.duration,
			tweens: [],
			createTween: function( prop, end ) {
				var tween = jQuery.Tween( elem, animation.opts, prop, end,
						animation.opts.specialEasing[ prop ] || animation.opts.easing );
				animation.tweens.push( tween );
				return tween;
			},
			stop: function( gotoEnd ) {
				var index = 0,

					// If we are going to the end, we want to run all the tweens
					// otherwise we skip this part
					length = gotoEnd ? animation.tweens.length : 0;
				if ( stopped ) {
					return this;
				}
				stopped = true;
				for ( ; index < length; index++ ) {
					animation.tweens[ index ].run( 1 );
				}

				// Resolve when we played the last frame; otherwise, reject
				if ( gotoEnd ) {
					deferred.notifyWith( elem, [ animation, 1, 0 ] );
					deferred.resolveWith( elem, [ animation, gotoEnd ] );
				} else {
					deferred.rejectWith( elem, [ animation, gotoEnd ] );
				}
				return this;
			}
		} ),
		props = animation.props;

	propFilter( props, animation.opts.specialEasing );

	for ( ; index < length; index++ ) {
		result = Animation.prefilters[ index ].call( animation, elem, props, animation.opts );
		if ( result ) {
			if ( isFunction( result.stop ) ) {
				jQuery._queueHooks( animation.elem, animation.opts.queue ).stop =
					result.stop.bind( result );
			}
			return result;
		}
	}

	jQuery.map( props, createTween, animation );

	if ( isFunction( animation.opts.start ) ) {
		animation.opts.start.call( elem, animation );
	}

	// Attach callbacks from options
	animation
		.progress( animation.opts.progress )
		.done( animation.opts.done, animation.opts.complete )
		.fail( animation.opts.fail )
		.always( animation.opts.always );

	jQuery.fx.timer(
		jQuery.extend( tick, {
			elem: elem,
			anim: animation,
			queue: animation.opts.queue
		} )
	);

	return animation;
}

jQuery.Animation = jQuery.extend( Animation, {

	tweeners: {
		"*": [ function( prop, value ) {
			var tween = this.createTween( prop, value );
			adjustCSS( tween.elem, prop, rcssNum.exec( value ), tween );
			return tween;
		} ]
	},

	tweener: function( props, callback ) {
		if ( isFunction( props ) ) {
			callback = props;
			props = [ "*" ];
		} else {
			props = props.match( rnothtmlwhite );
		}

		var prop,
			index = 0,
			length = props.length;

		for ( ; index < length; index++ ) {
			prop = props[ index ];
			Animation.tweeners[ prop ] = Animation.tweeners[ prop ] || [];
			Animation.tweeners[ prop ].unshift( callback );
		}
	},

	prefilters: [ defaultPrefilter ],

	prefilter: function( callback, prepend ) {
		if ( prepend ) {
			Animation.prefilters.unshift( callback );
		} else {
			Animation.prefilters.push( callback );
		}
	}
} );

jQuery.speed = function( speed, easing, fn ) {
	var opt = speed && typeof speed === "object" ? jQuery.extend( {}, speed ) : {
		complete: fn || !fn && easing ||
			isFunction( speed ) && speed,
		duration: speed,
		easing: fn && easing || easing && !isFunction( easing ) && easing
	};

	// Go to the end state if fx are off
	if ( jQuery.fx.off ) {
		opt.duration = 0;

	} else {
		if ( typeof opt.duration !== "number" ) {
			if ( opt.duration in jQuery.fx.speeds ) {
				opt.duration = jQuery.fx.speeds[ opt.duration ];

			} else {
				opt.duration = jQuery.fx.speeds._default;
			}
		}
	}

	// Normalize opt.queue - true/undefined/null -> "fx"
	if ( opt.queue == null || opt.queue === true ) {
		opt.queue = "fx";
	}

	// Queueing
	opt.old = opt.complete;

	opt.complete = function() {
		if ( isFunction( opt.old ) ) {
			opt.old.call( this );
		}

		if ( opt.queue ) {
			jQuery.dequeue( this, opt.queue );
		}
	};

	return opt;
};

jQuery.fn.extend( {
	fadeTo: function( speed, to, easing, callback ) {

		// Show any hidden elements after setting opacity to 0
		return this.filter( isHiddenWithinTree ).css( "opacity", 0 ).show()

			// Animate to the value specified
			.end().animate( { opacity: to }, speed, easing, callback );
	},
	animate: function( prop, speed, easing, callback ) {
		var empty = jQuery.isEmptyObject( prop ),
			optall = jQuery.speed( speed, easing, callback ),
			doAnimation = function() {

				// Operate on a copy of prop so per-property easing won't be lost
				var anim = Animation( this, jQuery.extend( {}, prop ), optall );

				// Empty animations, or finishing resolves immediately
				if ( empty || dataPriv.get( this, "finish" ) ) {
					anim.stop( true );
				}
			};
			doAnimation.finish = doAnimation;

		return empty || optall.queue === false ?
			this.each( doAnimation ) :
			this.queue( optall.queue, doAnimation );
	},
	stop: function( type, clearQueue, gotoEnd ) {
		var stopQueue = function( hooks ) {
			var stop = hooks.stop;
			delete hooks.stop;
			stop( gotoEnd );
		};

		if ( typeof type !== "string" ) {
			gotoEnd = clearQueue;
			clearQueue = type;
			type = undefined;
		}
		if ( clearQueue && type !== false ) {
			this.queue( type || "fx", [] );
		}

		return this.each( function() {
			var dequeue = true,
				index = type != null && type + "queueHooks",
				timers = jQuery.timers,
				data = dataPriv.get( this );

			if ( index ) {
				if ( data[ index ] && data[ index ].stop ) {
					stopQueue( data[ index ] );
				}
			} else {
				for ( index in data ) {
					if ( data[ index ] && data[ index ].stop && rrun.test( index ) ) {
						stopQueue( data[ index ] );
					}
				}
			}

			for ( index = timers.length; index--; ) {
				if ( timers[ index ].elem === this &&
					( type == null || timers[ index ].queue === type ) ) {

					timers[ index ].anim.stop( gotoEnd );
					dequeue = false;
					timers.splice( index, 1 );
				}
			}

			// Start the next in the queue if the last step wasn't forced.
			// Timers currently will call their complete callbacks, which
			// will dequeue but only if they were gotoEnd.
			if ( dequeue || !gotoEnd ) {
				jQuery.dequeue( this, type );
			}
		} );
	},
	finish: function( type ) {
		if ( type !== false ) {
			type = type || "fx";
		}
		return this.each( function() {
			var index,
				data = dataPriv.get( this ),
				queue = data[ type + "queue" ],
				hooks = data[ type + "queueHooks" ],
				timers = jQuery.timers,
				length = queue ? queue.length : 0;

			// Enable finishing flag on private data
			data.finish = true;

			// Empty the queue first
			jQuery.queue( this, type, [] );

			if ( hooks && hooks.stop ) {
				hooks.stop.call( this, true );
			}

			// Look for any active animations, and finish them
			for ( index = timers.length; index--; ) {
				if ( timers[ index ].elem === this && timers[ index ].queue === type ) {
					timers[ index ].anim.stop( true );
					timers.splice( index, 1 );
				}
			}

			// Look for any animations in the old queue and finish them
			for ( index = 0; index < length; index++ ) {
				if ( queue[ index ] && queue[ index ].finish ) {
					queue[ index ].finish.call( this );
				}
			}

			// Turn off finishing flag
			delete data.finish;
		} );
	}
} );

jQuery.each( [ "toggle", "show", "hide" ], function( i, name ) {
	var cssFn = jQuery.fn[ name ];
	jQuery.fn[ name ] = function( speed, easing, callback ) {
		return speed == null || typeof speed === "boolean" ?
			cssFn.apply( this, arguments ) :
			this.animate( genFx( name, true ), speed, easing, callback );
	};
} );

// Generate shortcuts for custom animations
jQuery.each( {
	slideDown: genFx( "show" ),
	slideUp: genFx( "hide" ),
	slideToggle: genFx( "toggle" ),
	fadeIn: { opacity: "show" },
	fadeOut: { opacity: "hide" },
	fadeToggle: { opacity: "toggle" }
}, function( name, props ) {
	jQuery.fn[ name ] = function( speed, easing, callback ) {
		return this.animate( props, speed, easing, callback );
	};
} );

jQuery.timers = [];
jQuery.fx.tick = function() {
	var timer,
		i = 0,
		timers = jQuery.timers;

	fxNow = Date.now();

	for ( ; i < timers.length; i++ ) {
		timer = timers[ i ];

		// Run the timer and safely remove it when done (allowing for external removal)
		if ( !timer() && timers[ i ] === timer ) {
			timers.splice( i--, 1 );
		}
	}

	if ( !timers.length ) {
		jQuery.fx.stop();
	}
	fxNow = undefined;
};

jQuery.fx.timer = function( timer ) {
	jQuery.timers.push( timer );
	jQuery.fx.start();
};

jQuery.fx.interval = 13;
jQuery.fx.start = function() {
	if ( inProgress ) {
		return;
	}

	inProgress = true;
	schedule();
};

jQuery.fx.stop = function() {
	inProgress = null;
};

jQuery.fx.speeds = {
	slow: 600,
	fast: 200,

	// Default speed
	_default: 400
};


// Based off of the plugin by Clint Helfers, with permission.
// https://web.archive.org/web/20100324014747/http://blindsignals.com/index.php/2009/07/jquery-delay/
jQuery.fn.delay = function( time, type ) {
	time = jQuery.fx ? jQuery.fx.speeds[ time ] || time : time;
	type = type || "fx";

	return this.queue( type, function( next, hooks ) {
		var timeout = window.setTimeout( next, time );
		hooks.stop = function() {
			window.clearTimeout( timeout );
		};
	} );
};


( function() {
	var input = document.createElement( "input" ),
		select = document.createElement( "select" ),
		opt = select.appendChild( document.createElement( "option" ) );

	input.type = "checkbox";

	// Support: Android <=4.3 only
	// Default value for a checkbox should be "on"
	support.checkOn = input.value !== "";

	// Support: IE <=11 only
	// Must access selectedIndex to make default options select
	support.optSelected = opt.selected;

	// Support: IE <=11 only
	// An input loses its value after becoming a radio
	input = document.createElement( "input" );
	input.value = "t";
	input.type = "radio";
	support.radioValue = input.value === "t";
} )();


var boolHook,
	attrHandle = jQuery.expr.attrHandle;

jQuery.fn.extend( {
	attr: function( name, value ) {
		return access( this, jQuery.attr, name, value, arguments.length > 1 );
	},

	removeAttr: function( name ) {
		return this.each( function() {
			jQuery.removeAttr( this, name );
		} );
	}
} );

jQuery.extend( {
	attr: function( elem, name, value ) {
		var ret, hooks,
			nType = elem.nodeType;

		// Don't get/set attributes on text, comment and attribute nodes
		if ( nType === 3 || nType === 8 || nType === 2 ) {
			return;
		}

		// Fallback to prop when attributes are not supported
		if ( typeof elem.getAttribute === "undefined" ) {
			return jQuery.prop( elem, name, value );
		}

		// Attribute hooks are determined by the lowercase version
		// Grab necessary hook if one is defined
		if ( nType !== 1 || !jQuery.isXMLDoc( elem ) ) {
			hooks = jQuery.attrHooks[ name.toLowerCase() ] ||
				( jQuery.expr.match.bool.test( name ) ? boolHook : undefined );
		}

		if ( value !== undefined ) {
			if ( value === null ) {
				jQuery.removeAttr( elem, name );
				return;
			}

			if ( hooks && "set" in hooks &&
				( ret = hooks.set( elem, value, name ) ) !== undefined ) {
				return ret;
			}

			elem.setAttribute( name, value + "" );
			return value;
		}

		if ( hooks && "get" in hooks && ( ret = hooks.get( elem, name ) ) !== null ) {
			return ret;
		}

		ret = jQuery.find.attr( elem, name );

		// Non-existent attributes return null, we normalize to undefined
		return ret == null ? undefined : ret;
	},

	attrHooks: {
		type: {
			set: function( elem, value ) {
				if ( !support.radioValue && value === "radio" &&
					nodeName( elem, "input" ) ) {
					var val = elem.value;
					elem.setAttribute( "type", value );
					if ( val ) {
						elem.value = val;
					}
					return value;
				}
			}
		}
	},

	removeAttr: function( elem, value ) {
		var name,
			i = 0,

			// Attribute names can contain non-HTML whitespace characters
			// https://html.spec.whatwg.org/multipage/syntax.html#attributes-2
			attrNames = value && value.match( rnothtmlwhite );

		if ( attrNames && elem.nodeType === 1 ) {
			while ( ( name = attrNames[ i++ ] ) ) {
				elem.removeAttribute( name );
			}
		}
	}
} );

// Hooks for boolean attributes
boolHook = {
	set: function( elem, value, name ) {
		if ( value === false ) {

			// Remove boolean attributes when set to false
			jQuery.removeAttr( elem, name );
		} else {
			elem.setAttribute( name, name );
		}
		return name;
	}
};

jQuery.each( jQuery.expr.match.bool.source.match( /\w+/g ), function( i, name ) {
	var getter = attrHandle[ name ] || jQuery.find.attr;

	attrHandle[ name ] = function( elem, name, isXML ) {
		var ret, handle,
			lowercaseName = name.toLowerCase();

		if ( !isXML ) {

			// Avoid an infinite loop by temporarily removing this function from the getter
			handle = attrHandle[ lowercaseName ];
			attrHandle[ lowercaseName ] = ret;
			ret = getter( elem, name, isXML ) != null ?
				lowercaseName :
				null;
			attrHandle[ lowercaseName ] = handle;
		}
		return ret;
	};
} );




var rfocusable = /^(?:input|select|textarea|button)$/i,
	rclickable = /^(?:a|area)$/i;

jQuery.fn.extend( {
	prop: function( name, value ) {
		return access( this, jQuery.prop, name, value, arguments.length > 1 );
	},

	removeProp: function( name ) {
		return this.each( function() {
			delete this[ jQuery.propFix[ name ] || name ];
		} );
	}
} );

jQuery.extend( {
	prop: function( elem, name, value ) {
		var ret, hooks,
			nType = elem.nodeType;

		// Don't get/set properties on text, comment and attribute nodes
		if ( nType === 3 || nType === 8 || nType === 2 ) {
			return;
		}

		if ( nType !== 1 || !jQuery.isXMLDoc( elem ) ) {

			// Fix name and attach hooks
			name = jQuery.propFix[ name ] || name;
			hooks = jQuery.propHooks[ name ];
		}

		if ( value !== undefined ) {
			if ( hooks && "set" in hooks &&
				( ret = hooks.set( elem, value, name ) ) !== undefined ) {
				return ret;
			}

			return ( elem[ name ] = value );
		}

		if ( hooks && "get" in hooks && ( ret = hooks.get( elem, name ) ) !== null ) {
			return ret;
		}

		return elem[ name ];
	},

	propHooks: {
		tabIndex: {
			get: function( elem ) {

				// Support: IE <=9 - 11 only
				// elem.tabIndex doesn't always return the
				// correct value when it hasn't been explicitly set
				// https://web.archive.org/web/20141116233347/http://fluidproject.org/blog/2008/01/09/getting-setting-and-removing-tabindex-values-with-javascript/
				// Use proper attribute retrieval(#12072)
				var tabindex = jQuery.find.attr( elem, "tabindex" );

				if ( tabindex ) {
					return parseInt( tabindex, 10 );
				}

				if (
					rfocusable.test( elem.nodeName ) ||
					rclickable.test( elem.nodeName ) &&
					elem.href
				) {
					return 0;
				}

				return -1;
			}
		}
	},

	propFix: {
		"for": "htmlFor",
		"class": "className"
	}
} );

// Support: IE <=11 only
// Accessing the selectedIndex property
// forces the browser to respect setting selected
// on the option
// The getter ensures a default option is selected
// when in an optgroup
// eslint rule "no-unused-expressions" is disabled for this code
// since it considers such accessions noop
if ( !support.optSelected ) {
	jQuery.propHooks.selected = {
		get: function( elem ) {

			/* eslint no-unused-expressions: "off" */

			var parent = elem.parentNode;
			if ( parent && parent.parentNode ) {
				parent.parentNode.selectedIndex;
			}
			return null;
		},
		set: function( elem ) {

			/* eslint no-unused-expressions: "off" */

			var parent = elem.parentNode;
			if ( parent ) {
				parent.selectedIndex;

				if ( parent.parentNode ) {
					parent.parentNode.selectedIndex;
				}
			}
		}
	};
}

jQuery.each( [
	"tabIndex",
	"readOnly",
	"maxLength",
	"cellSpacing",
	"cellPadding",
	"rowSpan",
	"colSpan",
	"useMap",
	"frameBorder",
	"contentEditable"
], function() {
	jQuery.propFix[ this.toLowerCase() ] = this;
} );




	// Strip and collapse whitespace according to HTML spec
	// https://infra.spec.whatwg.org/#strip-and-collapse-ascii-whitespace
	function stripAndCollapse( value ) {
		var tokens = value.match( rnothtmlwhite ) || [];
		return tokens.join( " " );
	}


function getClass( elem ) {
	return elem.getAttribute && elem.getAttribute( "class" ) || "";
}

function classesToArray( value ) {
	if ( Array.isArray( value ) ) {
		return value;
	}
	if ( typeof value === "string" ) {
		return value.match( rnothtmlwhite ) || [];
	}
	return [];
}

jQuery.fn.extend( {
	addClass: function( value ) {
		var classes, elem, cur, curValue, clazz, j, finalValue,
			i = 0;

		if ( isFunction( value ) ) {
			return this.each( function( j ) {
				jQuery( this ).addClass( value.call( this, j, getClass( this ) ) );
			} );
		}

		classes = classesToArray( value );

		if ( classes.length ) {
			while ( ( elem = this[ i++ ] ) ) {
				curValue = getClass( elem );
				cur = elem.nodeType === 1 && ( " " + stripAndCollapse( curValue ) + " " );

				if ( cur ) {
					j = 0;
					while ( ( clazz = classes[ j++ ] ) ) {
						if ( cur.indexOf( " " + clazz + " " ) < 0 ) {
							cur += clazz + " ";
						}
					}

					// Only assign if different to avoid unneeded rendering.
					finalValue = stripAndCollapse( cur );
					if ( curValue !== finalValue ) {
						elem.setAttribute( "class", finalValue );
					}
				}
			}
		}

		return this;
	},

	removeClass: function( value ) {
		var classes, elem, cur, curValue, clazz, j, finalValue,
			i = 0;

		if ( isFunction( value ) ) {
			return this.each( function( j ) {
				jQuery( this ).removeClass( value.call( this, j, getClass( this ) ) );
			} );
		}

		if ( !arguments.length ) {
			return this.attr( "class", "" );
		}

		classes = classesToArray( value );

		if ( classes.length ) {
			while ( ( elem = this[ i++ ] ) ) {
				curValue = getClass( elem );

				// This expression is here for better compressibility (see addClass)
				cur = elem.nodeType === 1 && ( " " + stripAndCollapse( curValue ) + " " );

				if ( cur ) {
					j = 0;
					while ( ( clazz = classes[ j++ ] ) ) {

						// Remove *all* instances
						while ( cur.indexOf( " " + clazz + " " ) > -1 ) {
							cur = cur.replace( " " + clazz + " ", " " );
						}
					}

					// Only assign if different to avoid unneeded rendering.
					finalValue = stripAndCollapse( cur );
					if ( curValue !== finalValue ) {
						elem.setAttribute( "class", finalValue );
					}
				}
			}
		}

		return this;
	},

	toggleClass: function( value, stateVal ) {
		var type = typeof value,
			isValidValue = type === "string" || Array.isArray( value );

		if ( typeof stateVal === "boolean" && isValidValue ) {
			return stateVal ? this.addClass( value ) : this.removeClass( value );
		}

		if ( isFunction( value ) ) {
			return this.each( function( i ) {
				jQuery( this ).toggleClass(
					value.call( this, i, getClass( this ), stateVal ),
					stateVal
				);
			} );
		}

		return this.each( function() {
			var className, i, self, classNames;

			if ( isValidValue ) {

				// Toggle individual class names
				i = 0;
				self = jQuery( this );
				classNames = classesToArray( value );

				while ( ( className = classNames[ i++ ] ) ) {

					// Check each className given, space separated list
					if ( self.hasClass( className ) ) {
						self.removeClass( className );
					} else {
						self.addClass( className );
					}
				}

			// Toggle whole class name
			} else if ( value === undefined || type === "boolean" ) {
				className = getClass( this );
				if ( className ) {

					// Store className if set
					dataPriv.set( this, "__className__", className );
				}

				// If the element has a class name or if we're passed `false`,
				// then remove the whole classname (if there was one, the above saved it).
				// Otherwise bring back whatever was previously saved (if anything),
				// falling back to the empty string if nothing was stored.
				if ( this.setAttribute ) {
					this.setAttribute( "class",
						className || value === false ?
						"" :
						dataPriv.get( this, "__className__" ) || ""
					);
				}
			}
		} );
	},

	hasClass: function( selector ) {
		var className, elem,
			i = 0;

		className = " " + selector + " ";
		while ( ( elem = this[ i++ ] ) ) {
			if ( elem.nodeType === 1 &&
				( " " + stripAndCollapse( getClass( elem ) ) + " " ).indexOf( className ) > -1 ) {
					return true;
			}
		}

		return false;
	}
} );




var rreturn = /\r/g;

jQuery.fn.extend( {
	val: function( value ) {
		var hooks, ret, valueIsFunction,
			elem = this[ 0 ];

		if ( !arguments.length ) {
			if ( elem ) {
				hooks = jQuery.valHooks[ elem.type ] ||
					jQuery.valHooks[ elem.nodeName.toLowerCase() ];

				if ( hooks &&
					"get" in hooks &&
					( ret = hooks.get( elem, "value" ) ) !== undefined
				) {
					return ret;
				}

				ret = elem.value;

				// Handle most common string cases
				if ( typeof ret === "string" ) {
					return ret.replace( rreturn, "" );
				}

				// Handle cases where value is null/undef or number
				return ret == null ? "" : ret;
			}

			return;
		}

		valueIsFunction = isFunction( value );

		return this.each( function( i ) {
			var val;

			if ( this.nodeType !== 1 ) {
				return;
			}

			if ( valueIsFunction ) {
				val = value.call( this, i, jQuery( this ).val() );
			} else {
				val = value;
			}

			// Treat null/undefined as ""; convert numbers to string
			if ( val == null ) {
				val = "";

			} else if ( typeof val === "number" ) {
				val += "";

			} else if ( Array.isArray( val ) ) {
				val = jQuery.map( val, function( value ) {
					return value == null ? "" : value + "";
				} );
			}

			hooks = jQuery.valHooks[ this.type ] || jQuery.valHooks[ this.nodeName.toLowerCase() ];

			// If set returns undefined, fall back to normal setting
			if ( !hooks || !( "set" in hooks ) || hooks.set( this, val, "value" ) === undefined ) {
				this.value = val;
			}
		} );
	}
} );

jQuery.extend( {
	valHooks: {
		option: {
			get: function( elem ) {

				var val = jQuery.find.attr( elem, "value" );
				return val != null ?
					val :

					// Support: IE <=10 - 11 only
					// option.text throws exceptions (#14686, #14858)
					// Strip and collapse whitespace
					// https://html.spec.whatwg.org/#strip-and-collapse-whitespace
					stripAndCollapse( jQuery.text( elem ) );
			}
		},
		select: {
			get: function( elem ) {
				var value, option, i,
					options = elem.options,
					index = elem.selectedIndex,
					one = elem.type === "select-one",
					values = one ? null : [],
					max = one ? index + 1 : options.length;

				if ( index < 0 ) {
					i = max;

				} else {
					i = one ? index : 0;
				}

				// Loop through all the selected options
				for ( ; i < max; i++ ) {
					option = options[ i ];

					// Support: IE <=9 only
					// IE8-9 doesn't update selected after form reset (#2551)
					if ( ( option.selected || i === index ) &&

							// Don't return options that are disabled or in a disabled optgroup
							!option.disabled &&
							( !option.parentNode.disabled ||
								!nodeName( option.parentNode, "optgroup" ) ) ) {

						// Get the specific value for the option
						value = jQuery( option ).val();

						// We don't need an array for one selects
						if ( one ) {
							return value;
						}

						// Multi-Selects return an array
						values.push( value );
					}
				}

				return values;
			},

			set: function( elem, value ) {
				var optionSet, option,
					options = elem.options,
					values = jQuery.makeArray( value ),
					i = options.length;

				while ( i-- ) {
					option = options[ i ];

					/* eslint-disable no-cond-assign */

					if ( option.selected =
						jQuery.inArray( jQuery.valHooks.option.get( option ), values ) > -1
					) {
						optionSet = true;
					}

					/* eslint-enable no-cond-assign */
				}

				// Force browsers to behave consistently when non-matching value is set
				if ( !optionSet ) {
					elem.selectedIndex = -1;
				}
				return values;
			}
		}
	}
} );

// Radios and checkboxes getter/setter
jQuery.each( [ "radio", "checkbox" ], function() {
	jQuery.valHooks[ this ] = {
		set: function( elem, value ) {
			if ( Array.isArray( value ) ) {
				return ( elem.checked = jQuery.inArray( jQuery( elem ).val(), value ) > -1 );
			}
		}
	};
	if ( !support.checkOn ) {
		jQuery.valHooks[ this ].get = function( elem ) {
			return elem.getAttribute( "value" ) === null ? "on" : elem.value;
		};
	}
} );




// Return jQuery for attributes-only inclusion


support.focusin = "onfocusin" in window;


var rfocusMorph = /^(?:focusinfocus|focusoutblur)$/,
	stopPropagationCallback = function( e ) {
		e.stopPropagation();
	};

jQuery.extend( jQuery.event, {

	trigger: function( event, data, elem, onlyHandlers ) {

		var i, cur, tmp, bubbleType, ontype, handle, special, lastElement,
			eventPath = [ elem || document ],
			type = hasOwn.call( event, "type" ) ? event.type : event,
			namespaces = hasOwn.call( event, "namespace" ) ? event.namespace.split( "." ) : [];

		cur = lastElement = tmp = elem = elem || document;

		// Don't do events on text and comment nodes
		if ( elem.nodeType === 3 || elem.nodeType === 8 ) {
			return;
		}

		// focus/blur morphs to focusin/out; ensure we're not firing them right now
		if ( rfocusMorph.test( type + jQuery.event.triggered ) ) {
			return;
		}

		if ( type.indexOf( "." ) > -1 ) {

			// Namespaced trigger; create a regexp to match event type in handle()
			namespaces = type.split( "." );
			type = namespaces.shift();
			namespaces.sort();
		}
		ontype = type.indexOf( ":" ) < 0 && "on" + type;

		// Caller can pass in a jQuery.Event object, Object, or just an event type string
		event = event[ jQuery.expando ] ?
			event :
			new jQuery.Event( type, typeof event === "object" && event );

		// Trigger bitmask: & 1 for native handlers; & 2 for jQuery (always true)
		event.isTrigger = onlyHandlers ? 2 : 3;
		event.namespace = namespaces.join( "." );
		event.rnamespace = event.namespace ?
			new RegExp( "(^|\\.)" + namespaces.join( "\\.(?:.*\\.|)" ) + "(\\.|$)" ) :
			null;

		// Clean up the event in case it is being reused
		event.result = undefined;
		if ( !event.target ) {
			event.target = elem;
		}

		// Clone any incoming data and prepend the event, creating the handler arg list
		data = data == null ?
			[ event ] :
			jQuery.makeArray( data, [ event ] );

		// Allow special events to draw outside the lines
		special = jQuery.event.special[ type ] || {};
		if ( !onlyHandlers && special.trigger && special.trigger.apply( elem, data ) === false ) {
			return;
		}

		// Determine event propagation path in advance, per W3C events spec (#9951)
		// Bubble up to document, then to window; watch for a global ownerDocument var (#9724)
		if ( !onlyHandlers && !special.noBubble && !isWindow( elem ) ) {

			bubbleType = special.delegateType || type;
			if ( !rfocusMorph.test( bubbleType + type ) ) {
				cur = cur.parentNode;
			}
			for ( ; cur; cur = cur.parentNode ) {
				eventPath.push( cur );
				tmp = cur;
			}

			// Only add window if we got to document (e.g., not plain obj or detached DOM)
			if ( tmp === ( elem.ownerDocument || document ) ) {
				eventPath.push( tmp.defaultView || tmp.parentWindow || window );
			}
		}

		// Fire handlers on the event path
		i = 0;
		while ( ( cur = eventPath[ i++ ] ) && !event.isPropagationStopped() ) {
			lastElement = cur;
			event.type = i > 1 ?
				bubbleType :
				special.bindType || type;

			// jQuery handler
			handle = ( dataPriv.get( cur, "events" ) || {} )[ event.type ] &&
				dataPriv.get( cur, "handle" );
			if ( handle ) {
				handle.apply( cur, data );
			}

			// Native handler
			handle = ontype && cur[ ontype ];
			if ( handle && handle.apply && acceptData( cur ) ) {
				event.result = handle.apply( cur, data );
				if ( event.result === false ) {
					event.preventDefault();
				}
			}
		}
		event.type = type;

		// If nobody prevented the default action, do it now
		if ( !onlyHandlers && !event.isDefaultPrevented() ) {

			if ( ( !special._default ||
				special._default.apply( eventPath.pop(), data ) === false ) &&
				acceptData( elem ) ) {

				// Call a native DOM method on the target with the same name as the event.
				// Don't do default actions on window, that's where global variables be (#6170)
				if ( ontype && isFunction( elem[ type ] ) && !isWindow( elem ) ) {

					// Don't re-trigger an onFOO event when we call its FOO() method
					tmp = elem[ ontype ];

					if ( tmp ) {
						elem[ ontype ] = null;
					}

					// Prevent re-triggering of the same event, since we already bubbled it above
					jQuery.event.triggered = type;

					if ( event.isPropagationStopped() ) {
						lastElement.addEventListener( type, stopPropagationCallback );
					}

					elem[ type ]();

					if ( event.isPropagationStopped() ) {
						lastElement.removeEventListener( type, stopPropagationCallback );
					}

					jQuery.event.triggered = undefined;

					if ( tmp ) {
						elem[ ontype ] = tmp;
					}
				}
			}
		}

		return event.result;
	},

	// Piggyback on a donor event to simulate a different one
	// Used only for `focus(in | out)` events
	simulate: function( type, elem, event ) {
		var e = jQuery.extend(
			new jQuery.Event(),
			event,
			{
				type: type,
				isSimulated: true
			}
		);

		jQuery.event.trigger( e, null, elem );
	}

} );

jQuery.fn.extend( {

	trigger: function( type, data ) {
		return this.each( function() {
			jQuery.event.trigger( type, data, this );
		} );
	},
	triggerHandler: function( type, data ) {
		var elem = this[ 0 ];
		if ( elem ) {
			return jQuery.event.trigger( type, data, elem, true );
		}
	}
} );


// Support: Firefox <=44
// Firefox doesn't have focus(in | out) events
// Related ticket - https://bugzilla.mozilla.org/show_bug.cgi?id=687787
//
// Support: Chrome <=48 - 49, Safari <=9.0 - 9.1
// focus(in | out) events fire after focus & blur events,
// which is spec violation - http://www.w3.org/TR/DOM-Level-3-Events/#events-focusevent-event-order
// Related ticket - https://bugs.chromium.org/p/chromium/issues/detail?id=449857
if ( !support.focusin ) {
	jQuery.each( { focus: "focusin", blur: "focusout" }, function( orig, fix ) {

		// Attach a single capturing handler on the document while someone wants focusin/focusout
		var handler = function( event ) {
			jQuery.event.simulate( fix, event.target, jQuery.event.fix( event ) );
		};

		jQuery.event.special[ fix ] = {
			setup: function() {
				var doc = this.ownerDocument || this,
					attaches = dataPriv.access( doc, fix );

				if ( !attaches ) {
					doc.addEventListener( orig, handler, true );
				}
				dataPriv.access( doc, fix, ( attaches || 0 ) + 1 );
			},
			teardown: function() {
				var doc = this.ownerDocument || this,
					attaches = dataPriv.access( doc, fix ) - 1;

				if ( !attaches ) {
					doc.removeEventListener( orig, handler, true );
					dataPriv.remove( doc, fix );

				} else {
					dataPriv.access( doc, fix, attaches );
				}
			}
		};
	} );
}
var location = window.location;

var nonce = Date.now();

var rquery = ( /\?/ );



// Cross-browser xml parsing
jQuery.parseXML = function( data ) {
	var xml;
	if ( !data || typeof data !== "string" ) {
		return null;
	}

	// Support: IE 9 - 11 only
	// IE throws on parseFromString with invalid input.
	try {
		xml = ( new window.DOMParser() ).parseFromString( data, "text/xml" );
	} catch ( e ) {
		xml = undefined;
	}

	if ( !xml || xml.getElementsByTagName( "parsererror" ).length ) {
		jQuery.error( "Invalid XML: " + data );
	}
	return xml;
};


var
	rbracket = /\[\]$/,
	rCRLF = /\r?\n/g,
	rsubmitterTypes = /^(?:submit|button|image|reset|file)$/i,
	rsubmittable = /^(?:input|select|textarea|keygen)/i;

function buildParams( prefix, obj, traditional, add ) {
	var name;

	if ( Array.isArray( obj ) ) {

		// Serialize array item.
		jQuery.each( obj, function( i, v ) {
			if ( traditional || rbracket.test( prefix ) ) {

				// Treat each array item as a scalar.
				add( prefix, v );

			} else {

				// Item is non-scalar (array or object), encode its numeric index.
				buildParams(
					prefix + "[" + ( typeof v === "object" && v != null ? i : "" ) + "]",
					v,
					traditional,
					add
				);
			}
		} );

	} else if ( !traditional && toType( obj ) === "object" ) {

		// Serialize object item.
		for ( name in obj ) {
			buildParams( prefix + "[" + name + "]", obj[ name ], traditional, add );
		}

	} else {

		// Serialize scalar item.
		add( prefix, obj );
	}
}

// Serialize an array of form elements or a set of
// key/values into a query string
jQuery.param = function( a, traditional ) {
	var prefix,
		s = [],
		add = function( key, valueOrFunction ) {

			// If value is a function, invoke it and use its return value
			var value = isFunction( valueOrFunction ) ?
				valueOrFunction() :
				valueOrFunction;

			s[ s.length ] = encodeURIComponent( key ) + "=" +
				encodeURIComponent( value == null ? "" : value );
		};

	// If an array was passed in, assume that it is an array of form elements.
	if ( Array.isArray( a ) || ( a.jquery && !jQuery.isPlainObject( a ) ) ) {

		// Serialize the form elements
		jQuery.each( a, function() {
			add( this.name, this.value );
		} );

	} else {

		// If traditional, encode the "old" way (the way 1.3.2 or older
		// did it), otherwise encode params recursively.
		for ( prefix in a ) {
			buildParams( prefix, a[ prefix ], traditional, add );
		}
	}

	// Return the resulting serialization
	return s.join( "&" );
};

jQuery.fn.extend( {
	serialize: function() {
		return jQuery.param( this.serializeArray() );
	},
	serializeArray: function() {
		return this.map( function() {

			// Can add propHook for "elements" to filter or add form elements
			var elements = jQuery.prop( this, "elements" );
			return elements ? jQuery.makeArray( elements ) : this;
		} )
		.filter( function() {
			var type = this.type;

			// Use .is( ":disabled" ) so that fieldset[disabled] works
			return this.name && !jQuery( this ).is( ":disabled" ) &&
				rsubmittable.test( this.nodeName ) && !rsubmitterTypes.test( type ) &&
				( this.checked || !rcheckableType.test( type ) );
		} )
		.map( function( i, elem ) {
			var val = jQuery( this ).val();

			if ( val == null ) {
				return null;
			}

			if ( Array.isArray( val ) ) {
				return jQuery.map( val, function( val ) {
					return { name: elem.name, value: val.replace( rCRLF, "\r\n" ) };
				} );
			}

			return { name: elem.name, value: val.replace( rCRLF, "\r\n" ) };
		} ).get();
	}
} );


var
	r20 = /%20/g,
	rhash = /#.*$/,
	rantiCache = /([?&])_=[^&]*/,
	rheaders = /^(.*?):[ \t]*([^\r\n]*)$/mg,

	// #7653, #8125, #8152: local protocol detection
	rlocalProtocol = /^(?:about|app|app-storage|.+-extension|file|res|widget):$/,
	rnoContent = /^(?:GET|HEAD)$/,
	rprotocol = /^\/\//,

	/* Prefilters
	 * 1) They are useful to introduce custom dataTypes (see ajax/jsonp.js for an example)
	 * 2) These are called:
	 *    - BEFORE asking for a transport
	 *    - AFTER param serialization (s.data is a string if s.processData is true)
	 * 3) key is the dataType
	 * 4) the catchall symbol "*" can be used
	 * 5) execution will start with transport dataType and THEN continue down to "*" if needed
	 */
	prefilters = {},

	/* Transports bindings
	 * 1) key is the dataType
	 * 2) the catchall symbol "*" can be used
	 * 3) selection will start with transport dataType and THEN go to "*" if needed
	 */
	transports = {},

	// Avoid comment-prolog char sequence (#10098); must appease lint and evade compression
	allTypes = "*/".concat( "*" ),

	// Anchor tag for parsing the document origin
	originAnchor = document.createElement( "a" );
	originAnchor.href = location.href;

// Base "constructor" for jQuery.ajaxPrefilter and jQuery.ajaxTransport
function addToPrefiltersOrTransports( structure ) {

	// dataTypeExpression is optional and defaults to "*"
	return function( dataTypeExpression, func ) {

		if ( typeof dataTypeExpression !== "string" ) {
			func = dataTypeExpression;
			dataTypeExpression = "*";
		}

		var dataType,
			i = 0,
			dataTypes = dataTypeExpression.toLowerCase().match( rnothtmlwhite ) || [];

		if ( isFunction( func ) ) {

			// For each dataType in the dataTypeExpression
			while ( ( dataType = dataTypes[ i++ ] ) ) {

				// Prepend if requested
				if ( dataType[ 0 ] === "+" ) {
					dataType = dataType.slice( 1 ) || "*";
					( structure[ dataType ] = structure[ dataType ] || [] ).unshift( func );

				// Otherwise append
				} else {
					( structure[ dataType ] = structure[ dataType ] || [] ).push( func );
				}
			}
		}
	};
}

// Base inspection function for prefilters and transports
function inspectPrefiltersOrTransports( structure, options, originalOptions, jqXHR ) {

	var inspected = {},
		seekingTransport = ( structure === transports );

	function inspect( dataType ) {
		var selected;
		inspected[ dataType ] = true;
		jQuery.each( structure[ dataType ] || [], function( _, prefilterOrFactory ) {
			var dataTypeOrTransport = prefilterOrFactory( options, originalOptions, jqXHR );
			if ( typeof dataTypeOrTransport === "string" &&
				!seekingTransport && !inspected[ dataTypeOrTransport ] ) {

				options.dataTypes.unshift( dataTypeOrTransport );
				inspect( dataTypeOrTransport );
				return false;
			} else if ( seekingTransport ) {
				return !( selected = dataTypeOrTransport );
			}
		} );
		return selected;
	}

	return inspect( options.dataTypes[ 0 ] ) || !inspected[ "*" ] && inspect( "*" );
}

// A special extend for ajax options
// that takes "flat" options (not to be deep extended)
// Fixes #9887
function ajaxExtend( target, src ) {
	var key, deep,
		flatOptions = jQuery.ajaxSettings.flatOptions || {};

	for ( key in src ) {
		if ( src[ key ] !== undefined ) {
			( flatOptions[ key ] ? target : ( deep || ( deep = {} ) ) )[ key ] = src[ key ];
		}
	}
	if ( deep ) {
		jQuery.extend( true, target, deep );
	}

	return target;
}

/* Handles responses to an ajax request:
 * - finds the right dataType (mediates between content-type and expected dataType)
 * - returns the corresponding response
 */
function ajaxHandleResponses( s, jqXHR, responses ) {

	var ct, type, finalDataType, firstDataType,
		contents = s.contents,
		dataTypes = s.dataTypes;

	// Remove auto dataType and get content-type in the process
	while ( dataTypes[ 0 ] === "*" ) {
		dataTypes.shift();
		if ( ct === undefined ) {
			ct = s.mimeType || jqXHR.getResponseHeader( "Content-Type" );
		}
	}

	// Check if we're dealing with a known content-type
	if ( ct ) {
		for ( type in contents ) {
			if ( contents[ type ] && contents[ type ].test( ct ) ) {
				dataTypes.unshift( type );
				break;
			}
		}
	}

	// Check to see if we have a response for the expected dataType
	if ( dataTypes[ 0 ] in responses ) {
		finalDataType = dataTypes[ 0 ];
	} else {

		// Try convertible dataTypes
		for ( type in responses ) {
			if ( !dataTypes[ 0 ] || s.converters[ type + " " + dataTypes[ 0 ] ] ) {
				finalDataType = type;
				break;
			}
			if ( !firstDataType ) {
				firstDataType = type;
			}
		}

		// Or just use first one
		finalDataType = finalDataType || firstDataType;
	}

	// If we found a dataType
	// We add the dataType to the list if needed
	// and return the corresponding response
	if ( finalDataType ) {
		if ( finalDataType !== dataTypes[ 0 ] ) {
			dataTypes.unshift( finalDataType );
		}
		return responses[ finalDataType ];
	}
}

/* Chain conversions given the request and the original response
 * Also sets the responseXXX fields on the jqXHR instance
 */
function ajaxConvert( s, response, jqXHR, isSuccess ) {
	var conv2, current, conv, tmp, prev,
		converters = {},

		// Work with a copy of dataTypes in case we need to modify it for conversion
		dataTypes = s.dataTypes.slice();

	// Create converters map with lowercased keys
	if ( dataTypes[ 1 ] ) {
		for ( conv in s.converters ) {
			converters[ conv.toLowerCase() ] = s.converters[ conv ];
		}
	}

	current = dataTypes.shift();

	// Convert to each sequential dataType
	while ( current ) {

		if ( s.responseFields[ current ] ) {
			jqXHR[ s.responseFields[ current ] ] = response;
		}

		// Apply the dataFilter if provided
		if ( !prev && isSuccess && s.dataFilter ) {
			response = s.dataFilter( response, s.dataType );
		}

		prev = current;
		current = dataTypes.shift();

		if ( current ) {

			// There's only work to do if current dataType is non-auto
			if ( current === "*" ) {

				current = prev;

			// Convert response if prev dataType is non-auto and differs from current
			} else if ( prev !== "*" && prev !== current ) {

				// Seek a direct converter
				conv = converters[ prev + " " + current ] || converters[ "* " + current ];

				// If none found, seek a pair
				if ( !conv ) {
					for ( conv2 in converters ) {

						// If conv2 outputs current
						tmp = conv2.split( " " );
						if ( tmp[ 1 ] === current ) {

							// If prev can be converted to accepted input
							conv = converters[ prev + " " + tmp[ 0 ] ] ||
								converters[ "* " + tmp[ 0 ] ];
							if ( conv ) {

								// Condense equivalence converters
								if ( conv === true ) {
									conv = converters[ conv2 ];

								// Otherwise, insert the intermediate dataType
								} else if ( converters[ conv2 ] !== true ) {
									current = tmp[ 0 ];
									dataTypes.unshift( tmp[ 1 ] );
								}
								break;
							}
						}
					}
				}

				// Apply converter (if not an equivalence)
				if ( conv !== true ) {

					// Unless errors are allowed to bubble, catch and return them
					if ( conv && s.throws ) {
						response = conv( response );
					} else {
						try {
							response = conv( response );
						} catch ( e ) {
							return {
								state: "parsererror",
								error: conv ? e : "No conversion from " + prev + " to " + current
							};
						}
					}
				}
			}
		}
	}

	return { state: "success", data: response };
}

jQuery.extend( {

	// Counter for holding the number of active queries
	active: 0,

	// Last-Modified header cache for next request
	lastModified: {},
	etag: {},

	ajaxSettings: {
		url: location.href,
		type: "GET",
		isLocal: rlocalProtocol.test( location.protocol ),
		global: true,
		processData: true,
		async: true,
		contentType: "application/x-www-form-urlencoded; charset=UTF-8",

		/*
		timeout: 0,
		data: null,
		dataType: null,
		username: null,
		password: null,
		cache: null,
		throws: false,
		traditional: false,
		headers: {},
		*/

		accepts: {
			"*": allTypes,
			text: "text/plain",
			html: "text/html",
			xml: "application/xml, text/xml",
			json: "application/json, text/javascript"
		},

		contents: {
			xml: /\bxml\b/,
			html: /\bhtml/,
			json: /\bjson\b/
		},

		responseFields: {
			xml: "responseXML",
			text: "responseText",
			json: "responseJSON"
		},

		// Data converters
		// Keys separate source (or catchall "*") and destination types with a single space
		converters: {

			// Convert anything to text
			"* text": String,

			// Text to html (true = no transformation)
			"text html": true,

			// Evaluate text as a json expression
			"text json": JSON.parse,

			// Parse text as xml
			"text xml": jQuery.parseXML
		},

		// For options that shouldn't be deep extended:
		// you can add your own custom options here if
		// and when you create one that shouldn't be
		// deep extended (see ajaxExtend)
		flatOptions: {
			url: true,
			context: true
		}
	},

	// Creates a full fledged settings object into target
	// with both ajaxSettings and settings fields.
	// If target is omitted, writes into ajaxSettings.
	ajaxSetup: function( target, settings ) {
		return settings ?

			// Building a settings object
			ajaxExtend( ajaxExtend( target, jQuery.ajaxSettings ), settings ) :

			// Extending ajaxSettings
			ajaxExtend( jQuery.ajaxSettings, target );
	},

	ajaxPrefilter: addToPrefiltersOrTransports( prefilters ),
	ajaxTransport: addToPrefiltersOrTransports( transports ),

	// Main method
	ajax: function( url, options ) {

		// If url is an object, simulate pre-1.5 signature
		if ( typeof url === "object" ) {
			options = url;
			url = undefined;
		}

		// Force options to be an object
		options = options || {};

		var transport,

			// URL without anti-cache param
			cacheURL,

			// Response headers
			responseHeadersString,
			responseHeaders,

			// timeout handle
			timeoutTimer,

			// Url cleanup var
			urlAnchor,

			// Request state (becomes false upon send and true upon completion)
			completed,

			// To know if global events are to be dispatched
			fireGlobals,

			// Loop variable
			i,

			// uncached part of the url
			uncached,

			// Create the final options object
			s = jQuery.ajaxSetup( {}, options ),

			// Callbacks context
			callbackContext = s.context || s,

			// Context for global events is callbackContext if it is a DOM node or jQuery collection
			globalEventContext = s.context &&
				( callbackContext.nodeType || callbackContext.jquery ) ?
					jQuery( callbackContext ) :
					jQuery.event,

			// Deferreds
			deferred = jQuery.Deferred(),
			completeDeferred = jQuery.Callbacks( "once memory" ),

			// Status-dependent callbacks
			statusCode = s.statusCode || {},

			// Headers (they are sent all at once)
			requestHeaders = {},
			requestHeadersNames = {},

			// Default abort message
			strAbort = "canceled",

			// Fake xhr
			jqXHR = {
				readyState: 0,

				// Builds headers hashtable if needed
				getResponseHeader: function( key ) {
					var match;
					if ( completed ) {
						if ( !responseHeaders ) {
							responseHeaders = {};
							while ( ( match = rheaders.exec( responseHeadersString ) ) ) {
								responseHeaders[ match[ 1 ].toLowerCase() ] = match[ 2 ];
							}
						}
						match = responseHeaders[ key.toLowerCase() ];
					}
					return match == null ? null : match;
				},

				// Raw string
				getAllResponseHeaders: function() {
					return completed ? responseHeadersString : null;
				},

				// Caches the header
				setRequestHeader: function( name, value ) {
					if ( completed == null ) {
						name = requestHeadersNames[ name.toLowerCase() ] =
							requestHeadersNames[ name.toLowerCase() ] || name;
						requestHeaders[ name ] = value;
					}
					return this;
				},

				// Overrides response content-type header
				overrideMimeType: function( type ) {
					if ( completed == null ) {
						s.mimeType = type;
					}
					return this;
				},

				// Status-dependent callbacks
				statusCode: function( map ) {
					var code;
					if ( map ) {
						if ( completed ) {

							// Execute the appropriate callbacks
							jqXHR.always( map[ jqXHR.status ] );
						} else {

							// Lazy-add the new callbacks in a way that preserves old ones
							for ( code in map ) {
								statusCode[ code ] = [ statusCode[ code ], map[ code ] ];
							}
						}
					}
					return this;
				},

				// Cancel the request
				abort: function( statusText ) {
					var finalText = statusText || strAbort;
					if ( transport ) {
						transport.abort( finalText );
					}
					done( 0, finalText );
					return this;
				}
			};

		// Attach deferreds
		deferred.promise( jqXHR );

		// Add protocol if not provided (prefilters might expect it)
		// Handle falsy url in the settings object (#10093: consistency with old signature)
		// We also use the url parameter if available
		s.url = ( ( url || s.url || location.href ) + "" )
			.replace( rprotocol, location.protocol + "//" );

		// Alias method option to type as per ticket #12004
		s.type = options.method || options.type || s.method || s.type;

		// Extract dataTypes list
		s.dataTypes = ( s.dataType || "*" ).toLowerCase().match( rnothtmlwhite ) || [ "" ];

		// A cross-domain request is in order when the origin doesn't match the current origin.
		if ( s.crossDomain == null ) {
			urlAnchor = document.createElement( "a" );

			// Support: IE <=8 - 11, Edge 12 - 15
			// IE throws exception on accessing the href property if url is malformed,
			// e.g. http://example.com:80x/
			try {
				urlAnchor.href = s.url;

				// Support: IE <=8 - 11 only
				// Anchor's host property isn't correctly set when s.url is relative
				urlAnchor.href = urlAnchor.href;
				s.crossDomain = originAnchor.protocol + "//" + originAnchor.host !==
					urlAnchor.protocol + "//" + urlAnchor.host;
			} catch ( e ) {

				// If there is an error parsing the URL, assume it is crossDomain,
				// it can be rejected by the transport if it is invalid
				s.crossDomain = true;
			}
		}

		// Convert data if not already a string
		if ( s.data && s.processData && typeof s.data !== "string" ) {
			s.data = jQuery.param( s.data, s.traditional );
		}

		// Apply prefilters
		inspectPrefiltersOrTransports( prefilters, s, options, jqXHR );

		// If request was aborted inside a prefilter, stop there
		if ( completed ) {
			return jqXHR;
		}

		// We can fire global events as of now if asked to
		// Don't fire events if jQuery.event is undefined in an AMD-usage scenario (#15118)
		fireGlobals = jQuery.event && s.global;

		// Watch for a new set of requests
		if ( fireGlobals && jQuery.active++ === 0 ) {
			jQuery.event.trigger( "ajaxStart" );
		}

		// Uppercase the type
		s.type = s.type.toUpperCase();

		// Determine if request has content
		s.hasContent = !rnoContent.test( s.type );

		// Save the URL in case we're toying with the If-Modified-Since
		// and/or If-None-Match header later on
		// Remove hash to simplify url manipulation
		cacheURL = s.url.replace( rhash, "" );

		// More options handling for requests with no content
		if ( !s.hasContent ) {

			// Remember the hash so we can put it back
			uncached = s.url.slice( cacheURL.length );

			// If data is available and should be processed, append data to url
			if ( s.data && ( s.processData || typeof s.data === "string" ) ) {
				cacheURL += ( rquery.test( cacheURL ) ? "&" : "?" ) + s.data;

				// #9682: remove data so that it's not used in an eventual retry
				delete s.data;
			}

			// Add or update anti-cache param if needed
			if ( s.cache === false ) {
				cacheURL = cacheURL.replace( rantiCache, "$1" );
				uncached = ( rquery.test( cacheURL ) ? "&" : "?" ) + "_=" + ( nonce++ ) + uncached;
			}

			// Put hash and anti-cache on the URL that will be requested (gh-1732)
			s.url = cacheURL + uncached;

		// Change '%20' to '+' if this is encoded form body content (gh-2658)
		} else if ( s.data && s.processData &&
			( s.contentType || "" ).indexOf( "application/x-www-form-urlencoded" ) === 0 ) {
			s.data = s.data.replace( r20, "+" );
		}

		// Set the If-Modified-Since and/or If-None-Match header, if in ifModified mode.
		if ( s.ifModified ) {
			if ( jQuery.lastModified[ cacheURL ] ) {
				jqXHR.setRequestHeader( "If-Modified-Since", jQuery.lastModified[ cacheURL ] );
			}
			if ( jQuery.etag[ cacheURL ] ) {
				jqXHR.setRequestHeader( "If-None-Match", jQuery.etag[ cacheURL ] );
			}
		}

		// Set the correct header, if data is being sent
		if ( s.data && s.hasContent && s.contentType !== false || options.contentType ) {
			jqXHR.setRequestHeader( "Content-Type", s.contentType );
		}

		// Set the Accepts header for the server, depending on the dataType
		jqXHR.setRequestHeader(
			"Accept",
			s.dataTypes[ 0 ] && s.accepts[ s.dataTypes[ 0 ] ] ?
				s.accepts[ s.dataTypes[ 0 ] ] +
					( s.dataTypes[ 0 ] !== "*" ? ", " + allTypes + "; q=0.01" : "" ) :
				s.accepts[ "*" ]
		);

		// Check for headers option
		for ( i in s.headers ) {
			jqXHR.setRequestHeader( i, s.headers[ i ] );
		}

		// Allow custom headers/mimetypes and early abort
		if ( s.beforeSend &&
			( s.beforeSend.call( callbackContext, jqXHR, s ) === false || completed ) ) {

			// Abort if not done already and return
			return jqXHR.abort();
		}

		// Aborting is no longer a cancellation
		strAbort = "abort";

		// Install callbacks on deferreds
		completeDeferred.add( s.complete );
		jqXHR.done( s.success );
		jqXHR.fail( s.error );

		// Get transport
		transport = inspectPrefiltersOrTransports( transports, s, options, jqXHR );

		// If no transport, we auto-abort
		if ( !transport ) {
			done( -1, "No Transport" );
		} else {
			jqXHR.readyState = 1;

			// Send global event
			if ( fireGlobals ) {
				globalEventContext.trigger( "ajaxSend", [ jqXHR, s ] );
			}

			// If request was aborted inside ajaxSend, stop there
			if ( completed ) {
				return jqXHR;
			}

			// Timeout
			if ( s.async && s.timeout > 0 ) {
				timeoutTimer = window.setTimeout( function() {
					jqXHR.abort( "timeout" );
				}, s.timeout );
			}

			try {
				completed = false;
				transport.send( requestHeaders, done );
			} catch ( e ) {

				// Rethrow post-completion exceptions
				if ( completed ) {
					throw e;
				}

				// Propagate others as results
				done( -1, e );
			}
		}

		// Callback for when everything is done
		function done( status, nativeStatusText, responses, headers ) {
			var isSuccess, success, error, response, modified,
				statusText = nativeStatusText;

			// Ignore repeat invocations
			if ( completed ) {
				return;
			}

			completed = true;

			// Clear timeout if it exists
			if ( timeoutTimer ) {
				window.clearTimeout( timeoutTimer );
			}

			// Dereference transport for early garbage collection
			// (no matter how long the jqXHR object will be used)
			transport = undefined;

			// Cache response headers
			responseHeadersString = headers || "";

			// Set readyState
			jqXHR.readyState = status > 0 ? 4 : 0;

			// Determine if successful
			isSuccess = status >= 200 && status < 300 || status === 304;

			// Get response data
			if ( responses ) {
				response = ajaxHandleResponses( s, jqXHR, responses );
			}

			// Convert no matter what (that way responseXXX fields are always set)
			response = ajaxConvert( s, response, jqXHR, isSuccess );

			// If successful, handle type chaining
			if ( isSuccess ) {

				// Set the If-Modified-Since and/or If-None-Match header, if in ifModified mode.
				if ( s.ifModified ) {
					modified = jqXHR.getResponseHeader( "Last-Modified" );
					if ( modified ) {
						jQuery.lastModified[ cacheURL ] = modified;
					}
					modified = jqXHR.getResponseHeader( "etag" );
					if ( modified ) {
						jQuery.etag[ cacheURL ] = modified;
					}
				}

				// if no content
				if ( status === 204 || s.type === "HEAD" ) {
					statusText = "nocontent";

				// if not modified
				} else if ( status === 304 ) {
					statusText = "notmodified";

				// If we have data, let's convert it
				} else {
					statusText = response.state;
					success = response.data;
					error = response.error;
					isSuccess = !error;
				}
			} else {

				// Extract error from statusText and normalize for non-aborts
				error = statusText;
				if ( status || !statusText ) {
					statusText = "error";
					if ( status < 0 ) {
						status = 0;
					}
				}
			}

			// Set data for the fake xhr object
			jqXHR.status = status;
			jqXHR.statusText = ( nativeStatusText || statusText ) + "";

			// Success/Error
			if ( isSuccess ) {
				deferred.resolveWith( callbackContext, [ success, statusText, jqXHR ] );
			} else {
				deferred.rejectWith( callbackContext, [ jqXHR, statusText, error ] );
			}

			// Status-dependent callbacks
			jqXHR.statusCode( statusCode );
			statusCode = undefined;

			if ( fireGlobals ) {
				globalEventContext.trigger( isSuccess ? "ajaxSuccess" : "ajaxError",
					[ jqXHR, s, isSuccess ? success : error ] );
			}

			// Complete
			completeDeferred.fireWith( callbackContext, [ jqXHR, statusText ] );

			if ( fireGlobals ) {
				globalEventContext.trigger( "ajaxComplete", [ jqXHR, s ] );

				// Handle the global AJAX counter
				if ( !( --jQuery.active ) ) {
					jQuery.event.trigger( "ajaxStop" );
				}
			}
		}

		return jqXHR;
	},

	getJSON: function( url, data, callback ) {
		return jQuery.get( url, data, callback, "json" );
	},

	getScript: function( url, callback ) {
		return jQuery.get( url, undefined, callback, "script" );
	}
} );

jQuery.each( [ "get", "post" ], function( i, method ) {
	jQuery[ method ] = function( url, data, callback, type ) {

		// Shift arguments if data argument was omitted
		if ( isFunction( data ) ) {
			type = type || callback;
			callback = data;
			data = undefined;
		}

		// The url can be an options object (which then must have .url)
		return jQuery.ajax( jQuery.extend( {
			url: url,
			type: method,
			dataType: type,
			data: data,
			success: callback
		}, jQuery.isPlainObject( url ) && url ) );
	};
} );


jQuery._evalUrl = function( url ) {
	return jQuery.ajax( {
		url: url,

		// Make this explicit, since user can override this through ajaxSetup (#11264)
		type: "GET",
		dataType: "script",
		cache: true,
		async: false,
		global: false,
		"throws": true
	} );
};


jQuery.fn.extend( {
	wrapAll: function( html ) {
		var wrap;

		if ( this[ 0 ] ) {
			if ( isFunction( html ) ) {
				html = html.call( this[ 0 ] );
			}

			// The elements to wrap the target around
			wrap = jQuery( html, this[ 0 ].ownerDocument ).eq( 0 ).clone( true );

			if ( this[ 0 ].parentNode ) {
				wrap.insertBefore( this[ 0 ] );
			}

			wrap.map( function() {
				var elem = this;

				while ( elem.firstElementChild ) {
					elem = elem.firstElementChild;
				}

				return elem;
			} ).append( this );
		}

		return this;
	},

	wrapInner: function( html ) {
		if ( isFunction( html ) ) {
			return this.each( function( i ) {
				jQuery( this ).wrapInner( html.call( this, i ) );
			} );
		}

		return this.each( function() {
			var self = jQuery( this ),
				contents = self.contents();

			if ( contents.length ) {
				contents.wrapAll( html );

			} else {
				self.append( html );
			}
		} );
	},

	wrap: function( html ) {
		var htmlIsFunction = isFunction( html );

		return this.each( function( i ) {
			jQuery( this ).wrapAll( htmlIsFunction ? html.call( this, i ) : html );
		} );
	},

	unwrap: function( selector ) {
		this.parent( selector ).not( "body" ).each( function() {
			jQuery( this ).replaceWith( this.childNodes );
		} );
		return this;
	}
} );


jQuery.expr.pseudos.hidden = function( elem ) {
	return !jQuery.expr.pseudos.visible( elem );
};
jQuery.expr.pseudos.visible = function( elem ) {
	return !!( elem.offsetWidth || elem.offsetHeight || elem.getClientRects().length );
};




jQuery.ajaxSettings.xhr = function() {
	try {
		return new window.XMLHttpRequest();
	} catch ( e ) {}
};

var xhrSuccessStatus = {

		// File protocol always yields status code 0, assume 200
		0: 200,

		// Support: IE <=9 only
		// #1450: sometimes IE returns 1223 when it should be 204
		1223: 204
	},
	xhrSupported = jQuery.ajaxSettings.xhr();

support.cors = !!xhrSupported && ( "withCredentials" in xhrSupported );
support.ajax = xhrSupported = !!xhrSupported;

jQuery.ajaxTransport( function( options ) {
	var callback, errorCallback;

	// Cross domain only allowed if supported through XMLHttpRequest
	if ( support.cors || xhrSupported && !options.crossDomain ) {
		return {
			send: function( headers, complete ) {
				var i,
					xhr = options.xhr();

				xhr.open(
					options.type,
					options.url,
					options.async,
					options.username,
					options.password
				);

				// Apply custom fields if provided
				if ( options.xhrFields ) {
					for ( i in options.xhrFields ) {
						xhr[ i ] = options.xhrFields[ i ];
					}
				}

				// Override mime type if needed
				if ( options.mimeType && xhr.overrideMimeType ) {
					xhr.overrideMimeType( options.mimeType );
				}

				// X-Requested-With header
				// For cross-domain requests, seeing as conditions for a preflight are
				// akin to a jigsaw puzzle, we simply never set it to be sure.
				// (it can always be set on a per-request basis or even using ajaxSetup)
				// For same-domain requests, won't change header if already provided.
				if ( !options.crossDomain && !headers[ "X-Requested-With" ] ) {
					headers[ "X-Requested-With" ] = "XMLHttpRequest";
				}

				// Set headers
				for ( i in headers ) {
					xhr.setRequestHeader( i, headers[ i ] );
				}

				// Callback
				callback = function( type ) {
					return function() {
						if ( callback ) {
							callback = errorCallback = xhr.onload =
								xhr.onerror = xhr.onabort = xhr.ontimeout =
									xhr.onreadystatechange = null;

							if ( type === "abort" ) {
								xhr.abort();
							} else if ( type === "error" ) {

								// Support: IE <=9 only
								// On a manual native abort, IE9 throws
								// errors on any property access that is not readyState
								if ( typeof xhr.status !== "number" ) {
									complete( 0, "error" );
								} else {
									complete(

										// File: protocol always yields status 0; see #8605, #14207
										xhr.status,
										xhr.statusText
									);
								}
							} else {
								complete(
									xhrSuccessStatus[ xhr.status ] || xhr.status,
									xhr.statusText,

									// Support: IE <=9 only
									// IE9 has no XHR2 but throws on binary (trac-11426)
									// For XHR2 non-text, let the caller handle it (gh-2498)
									( xhr.responseType || "text" ) !== "text"  ||
									typeof xhr.responseText !== "string" ?
										{ binary: xhr.response } :
										{ text: xhr.responseText },
									xhr.getAllResponseHeaders()
								);
							}
						}
					};
				};

				// Listen to events
				xhr.onload = callback();
				errorCallback = xhr.onerror = xhr.ontimeout = callback( "error" );

				// Support: IE 9 only
				// Use onreadystatechange to replace onabort
				// to handle uncaught aborts
				if ( xhr.onabort !== undefined ) {
					xhr.onabort = errorCallback;
				} else {
					xhr.onreadystatechange = function() {

						// Check readyState before timeout as it changes
						if ( xhr.readyState === 4 ) {

							// Allow onerror to be called first,
							// but that will not handle a native abort
							// Also, save errorCallback to a variable
							// as xhr.onerror cannot be accessed
							window.setTimeout( function() {
								if ( callback ) {
									errorCallback();
								}
							} );
						}
					};
				}

				// Create the abort callback
				callback = callback( "abort" );

				try {

					// Do send the request (this may raise an exception)
					xhr.send( options.hasContent && options.data || null );
				} catch ( e ) {

					// #14683: Only rethrow if this hasn't been notified as an error yet
					if ( callback ) {
						throw e;
					}
				}
			},

			abort: function() {
				if ( callback ) {
					callback();
				}
			}
		};
	}
} );




// Prevent auto-execution of scripts when no explicit dataType was provided (See gh-2432)
jQuery.ajaxPrefilter( function( s ) {
	if ( s.crossDomain ) {
		s.contents.script = false;
	}
} );

// Install script dataType
jQuery.ajaxSetup( {
	accepts: {
		script: "text/javascript, application/javascript, " +
			"application/ecmascript, application/x-ecmascript"
	},
	contents: {
		script: /\b(?:java|ecma)script\b/
	},
	converters: {
		"text script": function( text ) {
			jQuery.globalEval( text );
			return text;
		}
	}
} );

// Handle cache's special case and crossDomain
jQuery.ajaxPrefilter( "script", function( s ) {
	if ( s.cache === undefined ) {
		s.cache = false;
	}
	if ( s.crossDomain ) {
		s.type = "GET";
	}
} );

// Bind script tag hack transport
jQuery.ajaxTransport( "script", function( s ) {

	// This transport only deals with cross domain requests
	if ( s.crossDomain ) {
		var script, callback;
		return {
			send: function( _, complete ) {
				script = jQuery( "<script>" ).prop( {
					charset: s.scriptCharset,
					src: s.url
				} ).on(
					"load error",
					callback = function( evt ) {
						script.remove();
						callback = null;
						if ( evt ) {
							complete( evt.type === "error" ? 404 : 200, evt.type );
						}
					}
				);

				// Use native DOM manipulation to avoid our domManip AJAX trickery
				document.head.appendChild( script[ 0 ] );
			},
			abort: function() {
				if ( callback ) {
					callback();
				}
			}
		};
	}
} );




var oldCallbacks = [],
	rjsonp = /(=)\?(?=&|$)|\?\?/;

// Default jsonp settings
jQuery.ajaxSetup( {
	jsonp: "callback",
	jsonpCallback: function() {
		var callback = oldCallbacks.pop() || ( jQuery.expando + "_" + ( nonce++ ) );
		this[ callback ] = true;
		return callback;
	}
} );

// Detect, normalize options and install callbacks for jsonp requests
jQuery.ajaxPrefilter( "json jsonp", function( s, originalSettings, jqXHR ) {

	var callbackName, overwritten, responseContainer,
		jsonProp = s.jsonp !== false && ( rjsonp.test( s.url ) ?
			"url" :
			typeof s.data === "string" &&
				( s.contentType || "" )
					.indexOf( "application/x-www-form-urlencoded" ) === 0 &&
				rjsonp.test( s.data ) && "data"
		);

	// Handle iff the expected data type is "jsonp" or we have a parameter to set
	if ( jsonProp || s.dataTypes[ 0 ] === "jsonp" ) {

		// Get callback name, remembering preexisting value associated with it
		callbackName = s.jsonpCallback = isFunction( s.jsonpCallback ) ?
			s.jsonpCallback() :
			s.jsonpCallback;

		// Insert callback into url or form data
		if ( jsonProp ) {
			s[ jsonProp ] = s[ jsonProp ].replace( rjsonp, "$1" + callbackName );
		} else if ( s.jsonp !== false ) {
			s.url += ( rquery.test( s.url ) ? "&" : "?" ) + s.jsonp + "=" + callbackName;
		}

		// Use data converter to retrieve json after script execution
		s.converters[ "script json" ] = function() {
			if ( !responseContainer ) {
				jQuery.error( callbackName + " was not called" );
			}
			return responseContainer[ 0 ];
		};

		// Force json dataType
		s.dataTypes[ 0 ] = "json";

		// Install callback
		overwritten = window[ callbackName ];
		window[ callbackName ] = function() {
			responseContainer = arguments;
		};

		// Clean-up function (fires after converters)
		jqXHR.always( function() {

			// If previous value didn't exist - remove it
			if ( overwritten === undefined ) {
				jQuery( window ).removeProp( callbackName );

			// Otherwise restore preexisting value
			} else {
				window[ callbackName ] = overwritten;
			}

			// Save back as free
			if ( s[ callbackName ] ) {

				// Make sure that re-using the options doesn't screw things around
				s.jsonpCallback = originalSettings.jsonpCallback;

				// Save the callback name for future use
				oldCallbacks.push( callbackName );
			}

			// Call if it was a function and we have a response
			if ( responseContainer && isFunction( overwritten ) ) {
				overwritten( responseContainer[ 0 ] );
			}

			responseContainer = overwritten = undefined;
		} );

		// Delegate to script
		return "script";
	}
} );




// Support: Safari 8 only
// In Safari 8 documents created via document.implementation.createHTMLDocument
// collapse sibling forms: the second one becomes a child of the first one.
// Because of that, this security measure has to be disabled in Safari 8.
// https://bugs.webkit.org/show_bug.cgi?id=137337
support.createHTMLDocument = ( function() {
	var body = document.implementation.createHTMLDocument( "" ).body;
	body.innerHTML = "<form></form><form></form>";
	return body.childNodes.length === 2;
} )();


// Argument "data" should be string of html
// context (optional): If specified, the fragment will be created in this context,
// defaults to document
// keepScripts (optional): If true, will include scripts passed in the html string
jQuery.parseHTML = function( data, context, keepScripts ) {
	if ( typeof data !== "string" ) {
		return [];
	}
	if ( typeof context === "boolean" ) {
		keepScripts = context;
		context = false;
	}

	var base, parsed, scripts;

	if ( !context ) {

		// Stop scripts or inline event handlers from being executed immediately
		// by using document.implementation
		if ( support.createHTMLDocument ) {
			context = document.implementation.createHTMLDocument( "" );

			// Set the base href for the created document
			// so any parsed elements with URLs
			// are based on the document's URL (gh-2965)
			base = context.createElement( "base" );
			base.href = document.location.href;
			context.head.appendChild( base );
		} else {
			context = document;
		}
	}

	parsed = rsingleTag.exec( data );
	scripts = !keepScripts && [];

	// Single tag
	if ( parsed ) {
		return [ context.createElement( parsed[ 1 ] ) ];
	}

	parsed = buildFragment( [ data ], context, scripts );

	if ( scripts && scripts.length ) {
		jQuery( scripts ).remove();
	}

	return jQuery.merge( [], parsed.childNodes );
};


/**
 * Load a url into a page
 */
jQuery.fn.load = function( url, params, callback ) {
	var selector, type, response,
		self = this,
		off = url.indexOf( " " );

	if ( off > -1 ) {
		selector = stripAndCollapse( url.slice( off ) );
		url = url.slice( 0, off );
	}

	// If it's a function
	if ( isFunction( params ) ) {

		// We assume that it's the callback
		callback = params;
		params = undefined;

	// Otherwise, build a param string
	} else if ( params && typeof params === "object" ) {
		type = "POST";
	}

	// If we have elements to modify, make the request
	if ( self.length > 0 ) {
		jQuery.ajax( {
			url: url,

			// If "type" variable is undefined, then "GET" method will be used.
			// Make value of this field explicit since
			// user can override it through ajaxSetup method
			type: type || "GET",
			dataType: "html",
			data: params
		} ).done( function( responseText ) {

			// Save response for use in complete callback
			response = arguments;

			self.html( selector ?

				// If a selector was specified, locate the right elements in a dummy div
				// Exclude scripts to avoid IE 'Permission Denied' errors
				jQuery( "<div>" ).append( jQuery.parseHTML( responseText ) ).find( selector ) :

				// Otherwise use the full result
				responseText );

		// If the request succeeds, this function gets "data", "status", "jqXHR"
		// but they are ignored because response was set above.
		// If it fails, this function gets "jqXHR", "status", "error"
		} ).always( callback && function( jqXHR, status ) {
			self.each( function() {
				callback.apply( this, response || [ jqXHR.responseText, status, jqXHR ] );
			} );
		} );
	}

	return this;
};




// Attach a bunch of functions for handling common AJAX events
jQuery.each( [
	"ajaxStart",
	"ajaxStop",
	"ajaxComplete",
	"ajaxError",
	"ajaxSuccess",
	"ajaxSend"
], function( i, type ) {
	jQuery.fn[ type ] = function( fn ) {
		return this.on( type, fn );
	};
} );




jQuery.expr.pseudos.animated = function( elem ) {
	return jQuery.grep( jQuery.timers, function( fn ) {
		return elem === fn.elem;
	} ).length;
};




jQuery.offset = {
	setOffset: function( elem, options, i ) {
		var curPosition, curLeft, curCSSTop, curTop, curOffset, curCSSLeft, calculatePosition,
			position = jQuery.css( elem, "position" ),
			curElem = jQuery( elem ),
			props = {};

		// Set position first, in-case top/left are set even on static elem
		if ( position === "static" ) {
			elem.style.position = "relative";
		}

		curOffset = curElem.offset();
		curCSSTop = jQuery.css( elem, "top" );
		curCSSLeft = jQuery.css( elem, "left" );
		calculatePosition = ( position === "absolute" || position === "fixed" ) &&
			( curCSSTop + curCSSLeft ).indexOf( "auto" ) > -1;

		// Need to be able to calculate position if either
		// top or left is auto and position is either absolute or fixed
		if ( calculatePosition ) {
			curPosition = curElem.position();
			curTop = curPosition.top;
			curLeft = curPosition.left;

		} else {
			curTop = parseFloat( curCSSTop ) || 0;
			curLeft = parseFloat( curCSSLeft ) || 0;
		}

		if ( isFunction( options ) ) {

			// Use jQuery.extend here to allow modification of coordinates argument (gh-1848)
			options = options.call( elem, i, jQuery.extend( {}, curOffset ) );
		}

		if ( options.top != null ) {
			props.top = ( options.top - curOffset.top ) + curTop;
		}
		if ( options.left != null ) {
			props.left = ( options.left - curOffset.left ) + curLeft;
		}

		if ( "using" in options ) {
			options.using.call( elem, props );

		} else {
			curElem.css( props );
		}
	}
};

jQuery.fn.extend( {

	// offset() relates an element's border box to the document origin
	offset: function( options ) {

		// Preserve chaining for setter
		if ( arguments.length ) {
			return options === undefined ?
				this :
				this.each( function( i ) {
					jQuery.offset.setOffset( this, options, i );
				} );
		}

		var rect, win,
			elem = this[ 0 ];

		if ( !elem ) {
			return;
		}

		// Return zeros for disconnected and hidden (display: none) elements (gh-2310)
		// Support: IE <=11 only
		// Running getBoundingClientRect on a
		// disconnected node in IE throws an error
		if ( !elem.getClientRects().length ) {
			return { top: 0, left: 0 };
		}

		// Get document-relative position by adding viewport scroll to viewport-relative gBCR
		rect = elem.getBoundingClientRect();
		win = elem.ownerDocument.defaultView;
		return {
			top: rect.top + win.pageYOffset,
			left: rect.left + win.pageXOffset
		};
	},

	// position() relates an element's margin box to its offset parent's padding box
	// This corresponds to the behavior of CSS absolute positioning
	position: function() {
		if ( !this[ 0 ] ) {
			return;
		}

		var offsetParent, offset, doc,
			elem = this[ 0 ],
			parentOffset = { top: 0, left: 0 };

		// position:fixed elements are offset from the viewport, which itself always has zero offset
		if ( jQuery.css( elem, "position" ) === "fixed" ) {

			// Assume position:fixed implies availability of getBoundingClientRect
			offset = elem.getBoundingClientRect();

		} else {
			offset = this.offset();

			// Account for the *real* offset parent, which can be the document or its root element
			// when a statically positioned element is identified
			doc = elem.ownerDocument;
			offsetParent = elem.offsetParent || doc.documentElement;
			while ( offsetParent &&
				( offsetParent === doc.body || offsetParent === doc.documentElement ) &&
				jQuery.css( offsetParent, "position" ) === "static" ) {

				offsetParent = offsetParent.parentNode;
			}
			if ( offsetParent && offsetParent !== elem && offsetParent.nodeType === 1 ) {

				// Incorporate borders into its offset, since they are outside its content origin
				parentOffset = jQuery( offsetParent ).offset();
				parentOffset.top += jQuery.css( offsetParent, "borderTopWidth", true );
				parentOffset.left += jQuery.css( offsetParent, "borderLeftWidth", true );
			}
		}

		// Subtract parent offsets and element margins
		return {
			top: offset.top - parentOffset.top - jQuery.css( elem, "marginTop", true ),
			left: offset.left - parentOffset.left - jQuery.css( elem, "marginLeft", true )
		};
	},

	// This method will return documentElement in the following cases:
	// 1) For the element inside the iframe without offsetParent, this method will return
	//    documentElement of the parent window
	// 2) For the hidden or detached element
	// 3) For body or html element, i.e. in case of the html node - it will return itself
	//
	// but those exceptions were never presented as a real life use-cases
	// and might be considered as more preferable results.
	//
	// This logic, however, is not guaranteed and can change at any point in the future
	offsetParent: function() {
		return this.map( function() {
			var offsetParent = this.offsetParent;

			while ( offsetParent && jQuery.css( offsetParent, "position" ) === "static" ) {
				offsetParent = offsetParent.offsetParent;
			}

			return offsetParent || documentElement;
		} );
	}
} );

// Create scrollLeft and scrollTop methods
jQuery.each( { scrollLeft: "pageXOffset", scrollTop: "pageYOffset" }, function( method, prop ) {
	var top = "pageYOffset" === prop;

	jQuery.fn[ method ] = function( val ) {
		return access( this, function( elem, method, val ) {

			// Coalesce documents and windows
			var win;
			if ( isWindow( elem ) ) {
				win = elem;
			} else if ( elem.nodeType === 9 ) {
				win = elem.defaultView;
			}

			if ( val === undefined ) {
				return win ? win[ prop ] : elem[ method ];
			}

			if ( win ) {
				win.scrollTo(
					!top ? val : win.pageXOffset,
					top ? val : win.pageYOffset
				);

			} else {
				elem[ method ] = val;
			}
		}, method, val, arguments.length );
	};
} );

// Support: Safari <=7 - 9.1, Chrome <=37 - 49
// Add the top/left cssHooks using jQuery.fn.position
// Webkit bug: https://bugs.webkit.org/show_bug.cgi?id=29084
// Blink bug: https://bugs.chromium.org/p/chromium/issues/detail?id=589347
// getComputedStyle returns percent when specified for top/left/bottom/right;
// rather than make the css module depend on the offset module, just check for it here
jQuery.each( [ "top", "left" ], function( i, prop ) {
	jQuery.cssHooks[ prop ] = addGetHookIf( support.pixelPosition,
		function( elem, computed ) {
			if ( computed ) {
				computed = curCSS( elem, prop );

				// If curCSS returns percentage, fallback to offset
				return rnumnonpx.test( computed ) ?
					jQuery( elem ).position()[ prop ] + "px" :
					computed;
			}
		}
	);
} );


// Create innerHeight, innerWidth, height, width, outerHeight and outerWidth methods
jQuery.each( { Height: "height", Width: "width" }, function( name, type ) {
	jQuery.each( { padding: "inner" + name, content: type, "": "outer" + name },
		function( defaultExtra, funcName ) {

		// Margin is only for outerHeight, outerWidth
		jQuery.fn[ funcName ] = function( margin, value ) {
			var chainable = arguments.length && ( defaultExtra || typeof margin !== "boolean" ),
				extra = defaultExtra || ( margin === true || value === true ? "margin" : "border" );

			return access( this, function( elem, type, value ) {
				var doc;

				if ( isWindow( elem ) ) {

					// $( window ).outerWidth/Height return w/h including scrollbars (gh-1729)
					return funcName.indexOf( "outer" ) === 0 ?
						elem[ "inner" + name ] :
						elem.document.documentElement[ "client" + name ];
				}

				// Get document width or height
				if ( elem.nodeType === 9 ) {
					doc = elem.documentElement;

					// Either scroll[Width/Height] or offset[Width/Height] or client[Width/Height],
					// whichever is greatest
					return Math.max(
						elem.body[ "scroll" + name ], doc[ "scroll" + name ],
						elem.body[ "offset" + name ], doc[ "offset" + name ],
						doc[ "client" + name ]
					);
				}

				return value === undefined ?

					// Get width or height on the element, requesting but not forcing parseFloat
					jQuery.css( elem, type, extra ) :

					// Set width or height on the element
					jQuery.style( elem, type, value, extra );
			}, type, chainable ? margin : undefined, chainable );
		};
	} );
} );


jQuery.each( ( "blur focus focusin focusout resize scroll click dblclick " +
	"mousedown mouseup mousemove mouseover mouseout mouseenter mouseleave " +
	"change select submit keydown keypress keyup contextmenu" ).split( " " ),
	function( i, name ) {

	// Handle event binding
	jQuery.fn[ name ] = function( data, fn ) {
		return arguments.length > 0 ?
			this.on( name, null, data, fn ) :
			this.trigger( name );
	};
} );

jQuery.fn.extend( {
	hover: function( fnOver, fnOut ) {
		return this.mouseenter( fnOver ).mouseleave( fnOut || fnOver );
	}
} );




jQuery.fn.extend( {

	bind: function( types, data, fn ) {
		return this.on( types, null, data, fn );
	},
	unbind: function( types, fn ) {
		return this.off( types, null, fn );
	},

	delegate: function( selector, types, data, fn ) {
		return this.on( types, selector, data, fn );
	},
	undelegate: function( selector, types, fn ) {

		// ( namespace ) or ( selector, types [, fn] )
		return arguments.length === 1 ?
			this.off( selector, "**" ) :
			this.off( types, selector || "**", fn );
	}
} );

// Bind a function to a context, optionally partially applying any
// arguments.
// jQuery.proxy is deprecated to promote standards (specifically Function#bind)
// However, it is not slated for removal any time soon
jQuery.proxy = function( fn, context ) {
	var tmp, args, proxy;

	if ( typeof context === "string" ) {
		tmp = fn[ context ];
		context = fn;
		fn = tmp;
	}

	// Quick check to determine if target is callable, in the spec
	// this throws a TypeError, but we will just return undefined.
	if ( !isFunction( fn ) ) {
		return undefined;
	}

	// Simulated bind
	args = slice.call( arguments, 2 );
	proxy = function() {
		return fn.apply( context || this, args.concat( slice.call( arguments ) ) );
	};

	// Set the guid of unique handler to the same of original handler, so it can be removed
	proxy.guid = fn.guid = fn.guid || jQuery.guid++;

	return proxy;
};

jQuery.holdReady = function( hold ) {
	if ( hold ) {
		jQuery.readyWait++;
	} else {
		jQuery.ready( true );
	}
};
jQuery.isArray = Array.isArray;
jQuery.parseJSON = JSON.parse;
jQuery.nodeName = nodeName;
jQuery.isFunction = isFunction;
jQuery.isWindow = isWindow;
jQuery.camelCase = camelCase;
jQuery.type = toType;

jQuery.now = Date.now;

jQuery.isNumeric = function( obj ) {

	// As of jQuery 3.0, isNumeric is limited to
	// strings and numbers (primitives or objects)
	// that can be coerced to finite numbers (gh-2662)
	var type = jQuery.type( obj );
	return ( type === "number" || type === "string" ) &&

		// parseFloat NaNs numeric-cast false positives ("")
		// ...but misinterprets leading-number strings, particularly hex literals ("0x...")
		// subtraction forces infinities to NaN
		!isNaN( obj - parseFloat( obj ) );
};




// Register as a named AMD module, since jQuery can be concatenated with other
// files that may use define, but not via a proper concatenation script that
// understands anonymous AMD modules. A named AMD is safest and most robust
// way to register. Lowercase jquery is used because AMD module names are
// derived from file names, and jQuery is normally delivered in a lowercase
// file name. Do this after creating the global so that if an AMD module wants
// to call noConflict to hide this version of jQuery, it will work.

// Note that for maximum portability, libraries that are not jQuery should
// declare themselves as anonymous modules, and avoid setting a global if an
// AMD loader is present. jQuery is a special case. For more information, see
// https://github.com/jrburke/requirejs/wiki/Updating-existing-libraries#wiki-anon

if ( typeof define === "function" && define.amd ) {
	define( "jquery", [], function() {
		return jQuery;
	} );
}




var

	// Map over jQuery in case of overwrite
	_jQuery = window.jQuery,

	// Map over the $ in case of overwrite
	_$ = window.$;

jQuery.noConflict = function( deep ) {
	if ( window.$ === jQuery ) {
		window.$ = _$;
	}

	if ( deep && window.jQuery === jQuery ) {
		window.jQuery = _jQuery;
	}

	return jQuery;
};

// Expose jQuery and $ identifiers, even in AMD
// (#7102#comment:10, https://github.com/jquery/jquery/pull/557)
// and CommonJS for browser emulators (#13566)
if ( !noGlobal ) {
	window.jQuery = window.$ = jQuery;
}




return jQuery;
} );

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

// threejs.org/license
(function(l,ea){"object"===typeof exports&&"undefined"!==typeof module?ea(exports):"function"===typeof define&&define.amd?define(["exports"],ea):ea(l.THREE={})})(this,function(l){function ea(){}function z(a,b){this.x=a||0;this.y=b||0}function J(){this.elements=[1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1];0<arguments.length&&console.error("THREE.Matrix4: the constructor no longer reads arguments. use .set() instead.")}function ha(a,b,c,d){this._x=a||0;this._y=b||0;this._z=c||0;this._w=void 0!==d?d:1}function p(a,
b,c){this.x=a||0;this.y=b||0;this.z=c||0}function na(){this.elements=[1,0,0,0,1,0,0,0,1];0<arguments.length&&console.error("THREE.Matrix3: the constructor no longer reads arguments. use .set() instead.")}function T(a,b,c,d,e,f,g,h,k,m){Object.defineProperty(this,"id",{value:Df++});this.uuid=K.generateUUID();this.name="";this.image=void 0!==a?a:T.DEFAULT_IMAGE;this.mipmaps=[];this.mapping=void 0!==b?b:T.DEFAULT_MAPPING;this.wrapS=void 0!==c?c:1001;this.wrapT=void 0!==d?d:1001;this.magFilter=void 0!==
e?e:1006;this.minFilter=void 0!==f?f:1008;this.anisotropy=void 0!==k?k:1;this.format=void 0!==g?g:1023;this.type=void 0!==h?h:1009;this.offset=new z(0,0);this.repeat=new z(1,1);this.center=new z(0,0);this.rotation=0;this.matrixAutoUpdate=!0;this.matrix=new na;this.generateMipmaps=!0;this.premultiplyAlpha=!1;this.flipY=!0;this.unpackAlignment=4;this.encoding=void 0!==m?m:3E3;this.version=0;this.onUpdate=null}function aa(a,b,c,d){this.x=a||0;this.y=b||0;this.z=c||0;this.w=void 0!==d?d:1}function hb(a,
b,c){this.width=a;this.height=b;this.scissor=new aa(0,0,a,b);this.scissorTest=!1;this.viewport=new aa(0,0,a,b);c=c||{};void 0===c.minFilter&&(c.minFilter=1006);this.texture=new T(void 0,void 0,c.wrapS,c.wrapT,c.magFilter,c.minFilter,c.format,c.type,c.anisotropy,c.encoding);this.texture.generateMipmaps=void 0!==c.generateMipmaps?c.generateMipmaps:!0;this.depthBuffer=void 0!==c.depthBuffer?c.depthBuffer:!0;this.stencilBuffer=void 0!==c.stencilBuffer?c.stencilBuffer:!0;this.depthTexture=void 0!==c.depthTexture?
c.depthTexture:null}function Ib(a,b,c){hb.call(this,a,b,c);this.activeMipMapLevel=this.activeCubeFace=0}function ib(a,b,c,d,e,f,g,h,k,m,t,n){T.call(this,null,f,g,h,k,m,d,e,t,n);this.image={data:a,width:b,height:c};this.magFilter=void 0!==k?k:1003;this.minFilter=void 0!==m?m:1003;this.flipY=this.generateMipmaps=!1;this.unpackAlignment=1}function Ua(a,b){this.min=void 0!==a?a:new p(Infinity,Infinity,Infinity);this.max=void 0!==b?b:new p(-Infinity,-Infinity,-Infinity)}function Ea(a,b){this.center=void 0!==
a?a:new p;this.radius=void 0!==b?b:0}function Oa(a,b){this.normal=void 0!==a?a:new p(1,0,0);this.constant=void 0!==b?b:0}function od(a,b,c,d,e,f){this.planes=[void 0!==a?a:new Oa,void 0!==b?b:new Oa,void 0!==c?c:new Oa,void 0!==d?d:new Oa,void 0!==e?e:new Oa,void 0!==f?f:new Oa]}function F(a,b,c){return void 0===b&&void 0===c?this.set(a):this.setRGB(a,b,c)}function Rd(){function a(e,f){!1!==c&&(d(e,f),b.requestAnimationFrame(a))}var b=null,c=!1,d=null;return{start:function(){!0!==c&&null!==d&&(b.requestAnimationFrame(a),
c=!0)},stop:function(){c=!1},setAnimationLoop:function(a){d=a},setContext:function(a){b=a}}}function Ef(a){function b(b,c){var d=b.array,e=b.dynamic?a.DYNAMIC_DRAW:a.STATIC_DRAW,h=a.createBuffer();a.bindBuffer(c,h);a.bufferData(c,d,e);b.onUploadCallback();c=a.FLOAT;d instanceof Float32Array?c=a.FLOAT:d instanceof Float64Array?console.warn("THREE.WebGLAttributes: Unsupported data buffer format: Float64Array."):d instanceof Uint16Array?c=a.UNSIGNED_SHORT:d instanceof Int16Array?c=a.SHORT:d instanceof
Uint32Array?c=a.UNSIGNED_INT:d instanceof Int32Array?c=a.INT:d instanceof Int8Array?c=a.BYTE:d instanceof Uint8Array&&(c=a.UNSIGNED_BYTE);return{buffer:h,type:c,bytesPerElement:d.BYTES_PER_ELEMENT,version:b.version}}var c=new WeakMap;return{get:function(a){a.isInterleavedBufferAttribute&&(a=a.data);return c.get(a)},remove:function(b){b.isInterleavedBufferAttribute&&(b=b.data);var d=c.get(b);d&&(a.deleteBuffer(d.buffer),c.delete(b))},update:function(d,e){d.isInterleavedBufferAttribute&&(d=d.data);
var f=c.get(d);if(void 0===f)c.set(d,b(d,e));else if(f.version<d.version){var g=d,h=g.array,k=g.updateRange;a.bindBuffer(e,f.buffer);!1===g.dynamic?a.bufferData(e,h,a.STATIC_DRAW):-1===k.count?a.bufferSubData(e,0,h):0===k.count?console.error("THREE.WebGLObjects.updateBuffer: dynamic THREE.BufferAttribute marked as needsUpdate but updateRange.count is 0, ensure you are using set methods or updating manually."):(a.bufferSubData(e,k.offset*h.BYTES_PER_ELEMENT,h.subarray(k.offset,k.offset+k.count)),k.count=
-1);f.version=d.version}}}}function jb(a,b,c,d){this._x=a||0;this._y=b||0;this._z=c||0;this._order=d||jb.DefaultOrder}function Sd(){this.mask=1}function B(){Object.defineProperty(this,"id",{value:Ff++});this.uuid=K.generateUUID();this.name="";this.type="Object3D";this.parent=null;this.children=[];this.up=B.DefaultUp.clone();var a=new p,b=new jb,c=new ha,d=new p(1,1,1);b.onChange(function(){c.setFromEuler(b,!1)});c.onChange(function(){b.setFromQuaternion(c,void 0,!1)});Object.defineProperties(this,
{position:{enumerable:!0,value:a},rotation:{enumerable:!0,value:b},quaternion:{enumerable:!0,value:c},scale:{enumerable:!0,value:d},modelViewMatrix:{value:new J},normalMatrix:{value:new na}});this.matrix=new J;this.matrixWorld=new J;this.matrixAutoUpdate=B.DefaultMatrixAutoUpdate;this.matrixWorldNeedsUpdate=!1;this.layers=new Sd;this.visible=!0;this.receiveShadow=this.castShadow=!1;this.frustumCulled=!0;this.renderOrder=0;this.userData={}}function Pa(){B.call(this);this.type="Camera";this.matrixWorldInverse=
new J;this.projectionMatrix=new J;this.projectionMatrixInverse=new J}function Jb(a,b,c,d,e,f){Pa.call(this);this.type="OrthographicCamera";this.zoom=1;this.view=null;this.left=a;this.right=b;this.top=c;this.bottom=d;this.near=void 0!==e?e:.1;this.far=void 0!==f?f:2E3;this.updateProjectionMatrix()}function Va(a,b,c,d,e,f){this.a=a;this.b=b;this.c=c;this.normal=d&&d.isVector3?d:new p;this.vertexNormals=Array.isArray(d)?d:[];this.color=e&&e.isColor?e:new F;this.vertexColors=Array.isArray(e)?e:[];this.materialIndex=
void 0!==f?f:0}function M(){Object.defineProperty(this,"id",{value:Gf+=2});this.uuid=K.generateUUID();this.name="";this.type="Geometry";this.vertices=[];this.colors=[];this.faces=[];this.faceVertexUvs=[[]];this.morphTargets=[];this.morphNormals=[];this.skinWeights=[];this.skinIndices=[];this.lineDistances=[];this.boundingSphere=this.boundingBox=null;this.groupsNeedUpdate=this.lineDistancesNeedUpdate=this.colorsNeedUpdate=this.normalsNeedUpdate=this.uvsNeedUpdate=this.verticesNeedUpdate=this.elementsNeedUpdate=
!1}function Q(a,b,c){if(Array.isArray(a))throw new TypeError("THREE.BufferAttribute: array should be a Typed Array.");this.name="";this.array=a;this.itemSize=b;this.count=void 0!==a?a.length/b:0;this.normalized=!0===c;this.dynamic=!1;this.updateRange={offset:0,count:-1};this.version=0}function qc(a,b,c){Q.call(this,new Int8Array(a),b,c)}function rc(a,b,c){Q.call(this,new Uint8Array(a),b,c)}function sc(a,b,c){Q.call(this,new Uint8ClampedArray(a),b,c)}function tc(a,b,c){Q.call(this,new Int16Array(a),
b,c)}function kb(a,b,c){Q.call(this,new Uint16Array(a),b,c)}function uc(a,b,c){Q.call(this,new Int32Array(a),b,c)}function lb(a,b,c){Q.call(this,new Uint32Array(a),b,c)}function A(a,b,c){Q.call(this,new Float32Array(a),b,c)}function vc(a,b,c){Q.call(this,new Float64Array(a),b,c)}function De(){this.vertices=[];this.normals=[];this.colors=[];this.uvs=[];this.uvs2=[];this.groups=[];this.morphTargets={};this.skinWeights=[];this.skinIndices=[];this.boundingSphere=this.boundingBox=null;this.groupsNeedUpdate=
this.uvsNeedUpdate=this.colorsNeedUpdate=this.normalsNeedUpdate=this.verticesNeedUpdate=!1}function Ee(a){if(0===a.length)return-Infinity;for(var b=a[0],c=1,d=a.length;c<d;++c)a[c]>b&&(b=a[c]);return b}function I(){Object.defineProperty(this,"id",{value:Hf+=2});this.uuid=K.generateUUID();this.name="";this.type="BufferGeometry";this.index=null;this.attributes={};this.morphAttributes={};this.groups=[];this.boundingSphere=this.boundingBox=null;this.drawRange={start:0,count:Infinity};this.userData={}}
function Kb(a,b,c,d,e,f){M.call(this);this.type="BoxGeometry";this.parameters={width:a,height:b,depth:c,widthSegments:d,heightSegments:e,depthSegments:f};this.fromBufferGeometry(new mb(a,b,c,d,e,f));this.mergeVertices()}function mb(a,b,c,d,e,f){function g(a,b,c,d,e,f,g,l,S,E,If){var r=f/S,O=g/E,v=f/2,y=g/2,w=l/2;g=S+1;var x=E+1,D=f=0,G,z,A=new p;for(z=0;z<x;z++){var B=z*O-y;for(G=0;G<g;G++)A[a]=(G*r-v)*d,A[b]=B*e,A[c]=w,m.push(A.x,A.y,A.z),A[a]=0,A[b]=0,A[c]=0<l?1:-1,t.push(A.x,A.y,A.z),n.push(G/
S),n.push(1-z/E),f+=1}for(z=0;z<E;z++)for(G=0;G<S;G++)a=q+G+g*(z+1),b=q+(G+1)+g*(z+1),c=q+(G+1)+g*z,k.push(q+G+g*z,a,c),k.push(a,b,c),D+=6;h.addGroup(u,D,If);u+=D;q+=f}I.call(this);this.type="BoxBufferGeometry";this.parameters={width:a,height:b,depth:c,widthSegments:d,heightSegments:e,depthSegments:f};var h=this;a=a||1;b=b||1;c=c||1;d=Math.floor(d)||1;e=Math.floor(e)||1;f=Math.floor(f)||1;var k=[],m=[],t=[],n=[],q=0,u=0;g("z","y","x",-1,-1,c,b,a,f,e,0);g("z","y","x",1,-1,c,b,-a,f,e,1);g("x","z","y",
1,1,a,c,b,d,f,2);g("x","z","y",1,-1,a,c,-b,d,f,3);g("x","y","z",1,-1,a,b,c,d,e,4);g("x","y","z",-1,-1,a,b,-c,d,e,5);this.setIndex(k);this.addAttribute("position",new A(m,3));this.addAttribute("normal",new A(t,3));this.addAttribute("uv",new A(n,2))}function wc(a,b,c,d){M.call(this);this.type="PlaneGeometry";this.parameters={width:a,height:b,widthSegments:c,heightSegments:d};this.fromBufferGeometry(new nb(a,b,c,d));this.mergeVertices()}function nb(a,b,c,d){I.call(this);this.type="PlaneBufferGeometry";
this.parameters={width:a,height:b,widthSegments:c,heightSegments:d};a=a||1;b=b||1;var e=a/2,f=b/2;c=Math.floor(c)||1;d=Math.floor(d)||1;var g=c+1,h=d+1,k=a/c,m=b/d,t=[],n=[],q=[],u=[];for(a=0;a<h;a++){var r=a*m-f;for(b=0;b<g;b++)n.push(b*k-e,-r,0),q.push(0,0,1),u.push(b/c),u.push(1-a/d)}for(a=0;a<d;a++)for(b=0;b<c;b++)e=b+g*(a+1),f=b+1+g*(a+1),h=b+1+g*a,t.push(b+g*a,e,h),t.push(e,f,h);this.setIndex(t);this.addAttribute("position",new A(n,3));this.addAttribute("normal",new A(q,3));this.addAttribute("uv",
new A(u,2))}function H(){Object.defineProperty(this,"id",{value:Jf++});this.uuid=K.generateUUID();this.name="";this.type="Material";this.lights=this.fog=!0;this.blending=1;this.side=0;this.flatShading=!1;this.vertexColors=0;this.opacity=1;this.transparent=!1;this.blendSrc=204;this.blendDst=205;this.blendEquation=100;this.blendEquationAlpha=this.blendDstAlpha=this.blendSrcAlpha=null;this.depthFunc=3;this.depthWrite=this.depthTest=!0;this.clippingPlanes=null;this.clipShadows=this.clipIntersection=!1;
this.shadowSide=null;this.colorWrite=!0;this.precision=null;this.polygonOffset=!1;this.polygonOffsetUnits=this.polygonOffsetFactor=0;this.dithering=!1;this.alphaTest=0;this.premultipliedAlpha=!1;this.overdraw=0;this.visible=!0;this.userData={};this.needsUpdate=!0}function ka(a){H.call(this);this.type="MeshBasicMaterial";this.color=new F(16777215);this.lightMap=this.map=null;this.lightMapIntensity=1;this.aoMap=null;this.aoMapIntensity=1;this.envMap=this.alphaMap=this.specularMap=null;this.combine=
0;this.reflectivity=1;this.refractionRatio=.98;this.wireframe=!1;this.wireframeLinewidth=1;this.wireframeLinejoin=this.wireframeLinecap="round";this.lights=this.morphTargets=this.skinning=!1;this.setValues(a)}function ua(a){H.call(this);this.type="ShaderMaterial";this.defines={};this.uniforms={};this.vertexShader="void main() {\n\tgl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );\n}";this.fragmentShader="void main() {\n\tgl_FragColor = vec4( 1.0, 0.0, 0.0, 1.0 );\n}";this.linewidth=
1;this.wireframe=!1;this.wireframeLinewidth=1;this.morphNormals=this.morphTargets=this.skinning=this.clipping=this.lights=this.fog=!1;this.extensions={derivatives:!1,fragDepth:!1,drawBuffers:!1,shaderTextureLOD:!1};this.defaultAttributeValues={color:[1,1,1],uv:[0,0],uv2:[0,0]};this.index0AttributeName=void 0;this.uniformsNeedUpdate=!1;void 0!==a&&(void 0!==a.attributes&&console.error("THREE.ShaderMaterial: attributes should now be defined in THREE.BufferGeometry instead."),this.setValues(a))}function ob(a,
b){this.origin=void 0!==a?a:new p;this.direction=void 0!==b?b:new p}function da(a,b,c){this.a=void 0!==a?a:new p;this.b=void 0!==b?b:new p;this.c=void 0!==c?c:new p}function ta(a,b){B.call(this);this.type="Mesh";this.geometry=void 0!==a?a:new I;this.material=void 0!==b?b:new ka({color:16777215*Math.random()});this.drawMode=0;this.updateMorphTargets()}function Kf(a,b,c,d){function e(a,c){b.buffers.color.setClear(a.r,a.g,a.b,c,d)}var f=new F(0),g=0,h,k,m;return{getClearColor:function(){return f},setClearColor:function(a,
b){f.set(a);g=void 0!==b?b:1;e(f,g)},getClearAlpha:function(){return g},setClearAlpha:function(a){g=a;e(f,g)},render:function(b,d,q,u){d=d.background;null===d?e(f,g):d&&d.isColor&&(e(d,1),u=!0);(a.autoClear||u)&&a.clear(a.autoClearColor,a.autoClearDepth,a.autoClearStencil);d&&d.isCubeTexture?(void 0===m&&(m=new ta(new mb(1,1,1),new ua({uniforms:pb.cube.uniforms,vertexShader:pb.cube.vertexShader,fragmentShader:pb.cube.fragmentShader,side:1,depthTest:!0,depthWrite:!1,fog:!1})),m.geometry.removeAttribute("normal"),
m.geometry.removeAttribute("uv"),m.onBeforeRender=function(a,b,c){this.matrixWorld.copyPosition(c.matrixWorld)},c.update(m)),m.material.uniforms.tCube.value=d,b.push(m,m.geometry,m.material,0,null)):d&&d.isTexture&&(void 0===h&&(h=new Jb(-1,1,1,-1,0,1),k=new ta(new nb(2,2),new ka({depthTest:!1,depthWrite:!1,fog:!1})),c.update(k)),k.material.map=d,a.renderBufferDirect(h,null,k.geometry,k.material,k,null))}}}function Lf(a,b,c,d){var e;this.setMode=function(a){e=a};this.render=function(b,d){a.drawArrays(e,
b,d);c.update(d,e)};this.renderInstances=function(f,g,h){if(d.isWebGL2)var k=a;else if(k=b.get("ANGLE_instanced_arrays"),null===k){console.error("THREE.WebGLBufferRenderer: using THREE.InstancedBufferGeometry but hardware does not support extension ANGLE_instanced_arrays.");return}k[d.isWebGL2?"drawArraysInstanced":"drawArraysInstancedANGLE"](e,g,h,f.maxInstancedCount);c.update(h,e,f.maxInstancedCount)}}function Mf(a,b,c){function d(b){if("highp"===b){if(0<a.getShaderPrecisionFormat(a.VERTEX_SHADER,
a.HIGH_FLOAT).precision&&0<a.getShaderPrecisionFormat(a.FRAGMENT_SHADER,a.HIGH_FLOAT).precision)return"highp";b="mediump"}return"mediump"===b&&0<a.getShaderPrecisionFormat(a.VERTEX_SHADER,a.MEDIUM_FLOAT).precision&&0<a.getShaderPrecisionFormat(a.FRAGMENT_SHADER,a.MEDIUM_FLOAT).precision?"mediump":"lowp"}var e,f="undefined"!==typeof WebGL2RenderingContext&&a instanceof WebGL2RenderingContext,g=void 0!==c.precision?c.precision:"highp",h=d(g);h!==g&&(console.warn("THREE.WebGLRenderer:",g,"not supported, using",
h,"instead."),g=h);c=!0===c.logarithmicDepthBuffer;h=a.getParameter(a.MAX_TEXTURE_IMAGE_UNITS);var k=a.getParameter(a.MAX_VERTEX_TEXTURE_IMAGE_UNITS),m=a.getParameter(a.MAX_TEXTURE_SIZE),t=a.getParameter(a.MAX_CUBE_MAP_TEXTURE_SIZE),n=a.getParameter(a.MAX_VERTEX_ATTRIBS),q=a.getParameter(a.MAX_VERTEX_UNIFORM_VECTORS),u=a.getParameter(a.MAX_VARYING_VECTORS),r=a.getParameter(a.MAX_FRAGMENT_UNIFORM_VECTORS),l=0<k,y=f||!!b.get("OES_texture_float");return{isWebGL2:f,getMaxAnisotropy:function(){if(void 0!==
e)return e;var c=b.get("EXT_texture_filter_anisotropic");return e=null!==c?a.getParameter(c.MAX_TEXTURE_MAX_ANISOTROPY_EXT):0},getMaxPrecision:d,precision:g,logarithmicDepthBuffer:c,maxTextures:h,maxVertexTextures:k,maxTextureSize:m,maxCubemapSize:t,maxAttributes:n,maxVertexUniforms:q,maxVaryings:u,maxFragmentUniforms:r,vertexTextures:l,floatFragmentTextures:y,floatVertexTextures:l&&y}}function Nf(){function a(){m.value!==d&&(m.value=d,m.needsUpdate=0<e);c.numPlanes=e;c.numIntersection=0}function b(a,
b,d,e){var f=null!==a?a.length:0,g=null;if(0!==f){g=m.value;if(!0!==e||null===g){e=d+4*f;b=b.matrixWorldInverse;k.getNormalMatrix(b);if(null===g||g.length<e)g=new Float32Array(e);for(e=0;e!==f;++e,d+=4)h.copy(a[e]).applyMatrix4(b,k),h.normal.toArray(g,d),g[d+3]=h.constant}m.value=g;m.needsUpdate=!0}c.numPlanes=f;return g}var c=this,d=null,e=0,f=!1,g=!1,h=new Oa,k=new na,m={value:null,needsUpdate:!1};this.uniform=m;this.numIntersection=this.numPlanes=0;this.init=function(a,c,g){var h=0!==a.length||
c||0!==e||f;f=c;d=b(a,g,0);e=a.length;return h};this.beginShadows=function(){g=!0;b(null)};this.endShadows=function(){g=!1;a()};this.setState=function(c,h,k,u,r,l){if(!f||null===c||0===c.length||g&&!k)g?b(null):a();else{k=g?0:e;var n=4*k,t=r.clippingState||null;m.value=t;t=b(c,u,n,l);for(c=0;c!==n;++c)t[c]=d[c];r.clippingState=t;this.numIntersection=h?this.numPlanes:0;this.numPlanes+=k}}}function Of(a){var b={};return{get:function(c){if(void 0!==b[c])return b[c];switch(c){case "WEBGL_depth_texture":var d=
a.getExtension("WEBGL_depth_texture")||a.getExtension("MOZ_WEBGL_depth_texture")||a.getExtension("WEBKIT_WEBGL_depth_texture");break;case "EXT_texture_filter_anisotropic":d=a.getExtension("EXT_texture_filter_anisotropic")||a.getExtension("MOZ_EXT_texture_filter_anisotropic")||a.getExtension("WEBKIT_EXT_texture_filter_anisotropic");break;case "WEBGL_compressed_texture_s3tc":d=a.getExtension("WEBGL_compressed_texture_s3tc")||a.getExtension("MOZ_WEBGL_compressed_texture_s3tc")||a.getExtension("WEBKIT_WEBGL_compressed_texture_s3tc");
break;case "WEBGL_compressed_texture_pvrtc":d=a.getExtension("WEBGL_compressed_texture_pvrtc")||a.getExtension("WEBKIT_WEBGL_compressed_texture_pvrtc");break;default:d=a.getExtension(c)}null===d&&console.warn("THREE.WebGLRenderer: "+c+" extension not supported.");return b[c]=d}}}function Pf(a,b,c){function d(a){var h=a.target;a=e[h.id];null!==a.index&&b.remove(a.index);for(var g in a.attributes)b.remove(a.attributes[g]);h.removeEventListener("dispose",d);delete e[h.id];if(g=f[a.id])b.remove(g),delete f[a.id];
c.memory.geometries--}var e={},f={};return{get:function(a,b){var f=e[b.id];if(f)return f;b.addEventListener("dispose",d);b.isBufferGeometry?f=b:b.isGeometry&&(void 0===b._bufferGeometry&&(b._bufferGeometry=(new I).setFromObject(a)),f=b._bufferGeometry);e[b.id]=f;c.memory.geometries++;return f},update:function(c){var d=c.index,e=c.attributes;null!==d&&b.update(d,a.ELEMENT_ARRAY_BUFFER);for(var f in e)b.update(e[f],a.ARRAY_BUFFER);c=c.morphAttributes;for(f in c){d=c[f];e=0;for(var g=d.length;e<g;e++)b.update(d[e],
a.ARRAY_BUFFER)}},getWireframeAttribute:function(c){var d=f[c.id];if(d)return d;d=[];var e=c.index,g=c.attributes;if(null!==e){e=e.array;g=0;for(var t=e.length;g<t;g+=3){var n=e[g+0],q=e[g+1],u=e[g+2];d.push(n,q,q,u,u,n)}}else for(e=g.position.array,g=0,t=e.length/3-1;g<t;g+=3)n=g+0,q=g+1,u=g+2,d.push(n,q,q,u,u,n);d=new (65535<Ee(d)?lb:kb)(d,1);b.update(d,a.ELEMENT_ARRAY_BUFFER);return f[c.id]=d}}}function Qf(a,b,c,d){var e,f,g;this.setMode=function(a){e=a};this.setIndex=function(a){f=a.type;g=a.bytesPerElement};
this.render=function(b,d){a.drawElements(e,d,f,b*g);c.update(d,e)};this.renderInstances=function(h,k,m){if(d.isWebGL2)var t=a;else if(t=b.get("ANGLE_instanced_arrays"),null===t){console.error("THREE.WebGLIndexedBufferRenderer: using THREE.InstancedBufferGeometry but hardware does not support extension ANGLE_instanced_arrays.");return}t[d.isWebGL2?"drawElementsInstanced":"drawElementsInstancedANGLE"](e,m,f,k*g,h.maxInstancedCount);c.update(m,e,h.maxInstancedCount)}}function Rf(a){var b={frame:0,calls:0,
triangles:0,points:0,lines:0};return{memory:{geometries:0,textures:0},render:b,programs:null,autoReset:!0,reset:function(){b.frame++;b.calls=0;b.triangles=0;b.points=0;b.lines=0},update:function(c,d,e){e=e||1;b.calls++;switch(d){case a.TRIANGLES:b.triangles+=c/3*e;break;case a.TRIANGLE_STRIP:case a.TRIANGLE_FAN:b.triangles+=e*(c-2);break;case a.LINES:b.lines+=c/2*e;break;case a.LINE_STRIP:b.lines+=e*(c-1);break;case a.LINE_LOOP:b.lines+=e*c;break;case a.POINTS:b.points+=e*c;break;default:console.error("THREE.WebGLInfo: Unknown draw mode:",
d)}}}}function Sf(a,b){return Math.abs(b[1])-Math.abs(a[1])}function Tf(a){var b={},c=new Float32Array(8);return{update:function(d,e,f,g){var h=d.morphTargetInfluences,k=h.length;d=b[e.id];if(void 0===d){d=[];for(var m=0;m<k;m++)d[m]=[m,0];b[e.id]=d}var t=f.morphTargets&&e.morphAttributes.position;f=f.morphNormals&&e.morphAttributes.normal;for(m=0;m<k;m++){var n=d[m];0!==n[1]&&(t&&e.removeAttribute("morphTarget"+m),f&&e.removeAttribute("morphNormal"+m))}for(m=0;m<k;m++)n=d[m],n[0]=m,n[1]=h[m];d.sort(Sf);
for(m=0;8>m;m++){if(n=d[m])if(h=n[0],k=n[1]){t&&e.addAttribute("morphTarget"+m,t[h]);f&&e.addAttribute("morphNormal"+m,f[h]);c[m]=k;continue}c[m]=0}g.getUniforms().setValue(a,"morphTargetInfluences",c)}}}function Uf(a,b){var c={};return{update:function(d){var e=b.render.frame,f=d.geometry,g=a.get(d,f);c[g.id]!==e&&(f.isGeometry&&g.updateFromObject(d),a.update(g),c[g.id]=e);return g},dispose:function(){c={}}}}function Wa(a,b,c,d,e,f,g,h,k,m){a=void 0!==a?a:[];T.call(this,a,void 0!==b?b:301,c,d,e,f,
g,h,k,m);this.flipY=!1}function Lb(a,b,c){var d=a[0];if(0>=d||0<d)return a;var e=b*c,f=Fe[e];void 0===f&&(f=new Float32Array(e),Fe[e]=f);if(0!==b)for(d.toArray(f,0),d=1,e=0;d!==b;++d)e+=c,a[d].toArray(f,e);return f}function Y(a,b){if(a.length!==b.length)return!1;for(var c=0,d=a.length;c<d;c++)if(a[c]!==b[c])return!1;return!0}function ra(a,b){for(var c=0,d=b.length;c<d;c++)a[c]=b[c]}function Ge(a,b){var c=He[b];void 0===c&&(c=new Int32Array(b),He[b]=c);for(var d=0;d!==b;++d)c[d]=a.allocTextureUnit();
return c}function Vf(a,b){var c=this.cache;c[0]!==b&&(a.uniform1f(this.addr,b),c[0]=b)}function Wf(a,b){var c=this.cache;c[0]!==b&&(a.uniform1i(this.addr,b),c[0]=b)}function Xf(a,b){var c=this.cache;if(void 0!==b.x){if(c[0]!==b.x||c[1]!==b.y)a.uniform2f(this.addr,b.x,b.y),c[0]=b.x,c[1]=b.y}else Y(c,b)||(a.uniform2fv(this.addr,b),ra(c,b))}function Yf(a,b){var c=this.cache;if(void 0!==b.x){if(c[0]!==b.x||c[1]!==b.y||c[2]!==b.z)a.uniform3f(this.addr,b.x,b.y,b.z),c[0]=b.x,c[1]=b.y,c[2]=b.z}else if(void 0!==
b.r){if(c[0]!==b.r||c[1]!==b.g||c[2]!==b.b)a.uniform3f(this.addr,b.r,b.g,b.b),c[0]=b.r,c[1]=b.g,c[2]=b.b}else Y(c,b)||(a.uniform3fv(this.addr,b),ra(c,b))}function Zf(a,b){var c=this.cache;if(void 0!==b.x){if(c[0]!==b.x||c[1]!==b.y||c[2]!==b.z||c[3]!==b.w)a.uniform4f(this.addr,b.x,b.y,b.z,b.w),c[0]=b.x,c[1]=b.y,c[2]=b.z,c[3]=b.w}else Y(c,b)||(a.uniform4fv(this.addr,b),ra(c,b))}function $f(a,b){var c=this.cache,d=b.elements;void 0===d?Y(c,b)||(a.uniformMatrix2fv(this.addr,!1,b),ra(c,b)):Y(c,d)||(Ie.set(d),
a.uniformMatrix2fv(this.addr,!1,Ie),ra(c,d))}function ag(a,b){var c=this.cache,d=b.elements;void 0===d?Y(c,b)||(a.uniformMatrix3fv(this.addr,!1,b),ra(c,b)):Y(c,d)||(Je.set(d),a.uniformMatrix3fv(this.addr,!1,Je),ra(c,d))}function bg(a,b){var c=this.cache,d=b.elements;void 0===d?Y(c,b)||(a.uniformMatrix4fv(this.addr,!1,b),ra(c,b)):Y(c,d)||(Ke.set(d),a.uniformMatrix4fv(this.addr,!1,Ke),ra(c,d))}function cg(a,b,c){var d=this.cache,e=c.allocTextureUnit();d[0]!==e&&(a.uniform1i(this.addr,e),d[0]=e);c.setTexture2D(b||
Le,e)}function dg(a,b,c){var d=this.cache,e=c.allocTextureUnit();d[0]!==e&&(a.uniform1i(this.addr,e),d[0]=e);c.setTextureCube(b||Me,e)}function Ne(a,b){var c=this.cache;Y(c,b)||(a.uniform2iv(this.addr,b),ra(c,b))}function Oe(a,b){var c=this.cache;Y(c,b)||(a.uniform3iv(this.addr,b),ra(c,b))}function Pe(a,b){var c=this.cache;Y(c,b)||(a.uniform4iv(this.addr,b),ra(c,b))}function eg(a){switch(a){case 5126:return Vf;case 35664:return Xf;case 35665:return Yf;case 35666:return Zf;case 35674:return $f;case 35675:return ag;
case 35676:return bg;case 35678:case 36198:return cg;case 35680:return dg;case 5124:case 35670:return Wf;case 35667:case 35671:return Ne;case 35668:case 35672:return Oe;case 35669:case 35673:return Pe}}function fg(a,b){var c=this.cache;Y(c,b)||(a.uniform1fv(this.addr,b),ra(c,b))}function gg(a,b){var c=this.cache;Y(c,b)||(a.uniform1iv(this.addr,b),ra(c,b))}function hg(a,b){var c=this.cache;b=Lb(b,this.size,2);Y(c,b)||(a.uniform2fv(this.addr,b),this.updateCache(b))}function ig(a,b){var c=this.cache;
b=Lb(b,this.size,3);Y(c,b)||(a.uniform3fv(this.addr,b),this.updateCache(b))}function jg(a,b){var c=this.cache;b=Lb(b,this.size,4);Y(c,b)||(a.uniform4fv(this.addr,b),this.updateCache(b))}function kg(a,b){var c=this.cache;b=Lb(b,this.size,4);Y(c,b)||(a.uniformMatrix2fv(this.addr,!1,b),this.updateCache(b))}function lg(a,b){var c=this.cache;b=Lb(b,this.size,9);Y(c,b)||(a.uniformMatrix3fv(this.addr,!1,b),this.updateCache(b))}function mg(a,b){var c=this.cache;b=Lb(b,this.size,16);Y(c,b)||(a.uniformMatrix4fv(this.addr,
!1,b),this.updateCache(b))}function ng(a,b,c){var d=this.cache,e=b.length,f=Ge(c,e);!1===Y(d,f)&&(a.uniform1iv(this.addr,f),ra(d,f));for(a=0;a!==e;++a)c.setTexture2D(b[a]||Le,f[a])}function og(a,b,c){var d=this.cache,e=b.length,f=Ge(c,e);!1===Y(d,f)&&(a.uniform1iv(this.addr,f),ra(d,f));for(a=0;a!==e;++a)c.setTextureCube(b[a]||Me,f[a])}function pg(a){switch(a){case 5126:return fg;case 35664:return hg;case 35665:return ig;case 35666:return jg;case 35674:return kg;case 35675:return lg;case 35676:return mg;
case 35678:return ng;case 35680:return og;case 5124:case 35670:return gg;case 35667:case 35671:return Ne;case 35668:case 35672:return Oe;case 35669:case 35673:return Pe}}function qg(a,b,c){this.id=a;this.addr=c;this.cache=[];this.setValue=eg(b.type)}function Qe(a,b,c){this.id=a;this.addr=c;this.cache=[];this.size=b.size;this.setValue=pg(b.type)}function Re(a){this.id=a;this.seq=[];this.map={}}function $a(a,b,c){this.seq=[];this.map={};this.renderer=c;c=a.getProgramParameter(b,a.ACTIVE_UNIFORMS);for(var d=
0;d<c;++d){var e=a.getActiveUniform(b,d),f=a.getUniformLocation(b,e.name),g=this,h=e.name,k=h.length;for(Ud.lastIndex=0;;){var m=Ud.exec(h),t=Ud.lastIndex,n=m[1],q=m[3];"]"===m[2]&&(n|=0);if(void 0===q||"["===q&&t+2===k){h=g;e=void 0===q?new qg(n,e,f):new Qe(n,e,f);h.seq.push(e);h.map[e.id]=e;break}else q=g.map[n],void 0===q&&(q=new Re(n),n=g,g=q,n.seq.push(g),n.map[g.id]=g),g=q}}}function rg(a){a=a.split("\n");for(var b=0;b<a.length;b++)a[b]=b+1+": "+a[b];return a.join("\n")}function Se(a,b,c){var d=
a.createShader(b);a.shaderSource(d,c);a.compileShader(d);!1===a.getShaderParameter(d,a.COMPILE_STATUS)&&console.error("THREE.WebGLShader: Shader couldn't compile.");""!==a.getShaderInfoLog(d)&&console.warn("THREE.WebGLShader: gl.getShaderInfoLog()",b===a.VERTEX_SHADER?"vertex":"fragment",a.getShaderInfoLog(d),rg(c));return d}function Te(a){switch(a){case 3E3:return["Linear","( value )"];case 3001:return["sRGB","( value )"];case 3002:return["RGBE","( value )"];case 3004:return["RGBM","( value, 7.0 )"];
case 3005:return["RGBM","( value, 16.0 )"];case 3006:return["RGBD","( value, 256.0 )"];case 3007:return["Gamma","( value, float( GAMMA_FACTOR ) )"];default:throw Error("unsupported encoding: "+a);}}function Vd(a,b){b=Te(b);return"vec4 "+a+"( vec4 value ) { return "+b[0]+"ToLinear"+b[1]+"; }"}function sg(a,b){b=Te(b);return"vec4 "+a+"( vec4 value ) { return LinearTo"+b[0]+b[1]+"; }"}function tg(a,b){switch(b){case 1:b="Linear";break;case 2:b="Reinhard";break;case 3:b="Uncharted2";break;case 4:b="OptimizedCineon";
break;default:throw Error("unsupported toneMapping: "+b);}return"vec3 "+a+"( vec3 color ) { return "+b+"ToneMapping( color ); }"}function ug(a,b,c){a=a||{};return[a.derivatives||b.envMapCubeUV||b.bumpMap||b.normalMap&&!b.objectSpaceNormalMap||b.flatShading?"#extension GL_OES_standard_derivatives : enable":"",(a.fragDepth||b.logarithmicDepthBuffer)&&c.get("EXT_frag_depth")?"#extension GL_EXT_frag_depth : enable":"",a.drawBuffers&&c.get("WEBGL_draw_buffers")?"#extension GL_EXT_draw_buffers : require":
"",(a.shaderTextureLOD||b.envMap)&&c.get("EXT_shader_texture_lod")?"#extension GL_EXT_shader_texture_lod : enable":""].filter(xc).join("\n")}function vg(a){var b=[],c;for(c in a){var d=a[c];!1!==d&&b.push("#define "+c+" "+d)}return b.join("\n")}function xc(a){return""!==a}function Ue(a,b){return a.replace(/NUM_DIR_LIGHTS/g,b.numDirLights).replace(/NUM_SPOT_LIGHTS/g,b.numSpotLights).replace(/NUM_RECT_AREA_LIGHTS/g,b.numRectAreaLights).replace(/NUM_POINT_LIGHTS/g,b.numPointLights).replace(/NUM_HEMI_LIGHTS/g,
b.numHemiLights)}function Ve(a,b){return a.replace(/NUM_CLIPPING_PLANES/g,b.numClippingPlanes).replace(/UNION_CLIPPING_PLANES/g,b.numClippingPlanes-b.numClipIntersection)}function Wd(a){return a.replace(/^[ \t]*#include +<([\w\d./]+)>/gm,function(a,c){a=U[c];if(void 0===a)throw Error("Can not resolve #include <"+c+">");return Wd(a)})}function We(a){return a.replace(/#pragma unroll_loop[\s]+?for \( int i = (\d+); i < (\d+); i \+\+ \) \{([\s\S]+?)(?=\})\}/g,function(a,c,d,e){a="";for(c=parseInt(c);c<
parseInt(d);c++)a+=e.replace(/\[ i \]/g,"[ "+c+" ]");return a})}function wg(a,b,c,d,e,f,g){var h=a.context,k=d.defines,m=e.vertexShader,t=e.fragmentShader,n="SHADOWMAP_TYPE_BASIC";1===f.shadowMapType?n="SHADOWMAP_TYPE_PCF":2===f.shadowMapType&&(n="SHADOWMAP_TYPE_PCF_SOFT");var q="ENVMAP_TYPE_CUBE",u="ENVMAP_MODE_REFLECTION",r="ENVMAP_BLENDING_MULTIPLY";if(f.envMap){switch(d.envMap.mapping){case 301:case 302:q="ENVMAP_TYPE_CUBE";break;case 306:case 307:q="ENVMAP_TYPE_CUBE_UV";break;case 303:case 304:q=
"ENVMAP_TYPE_EQUIREC";break;case 305:q="ENVMAP_TYPE_SPHERE"}switch(d.envMap.mapping){case 302:case 304:u="ENVMAP_MODE_REFRACTION"}switch(d.combine){case 0:r="ENVMAP_BLENDING_MULTIPLY";break;case 1:r="ENVMAP_BLENDING_MIX";break;case 2:r="ENVMAP_BLENDING_ADD"}}var l=0<a.gammaFactor?a.gammaFactor:1,y=g.isWebGL2?"":ug(d.extensions,f,b),p=vg(k),w=h.createProgram();d.isRawShaderMaterial?(k=[p].filter(xc).join("\n"),0<k.length&&(k+="\n"),b=[y,p].filter(xc).join("\n"),0<b.length&&(b+="\n")):(k=["precision "+
f.precision+" float;","precision "+f.precision+" int;","#define SHADER_NAME "+e.name,p,f.supportsVertexTextures?"#define VERTEX_TEXTURES":"","#define GAMMA_FACTOR "+l,"#define MAX_BONES "+f.maxBones,f.useFog&&f.fog?"#define USE_FOG":"",f.useFog&&f.fogExp?"#define FOG_EXP2":"",f.map?"#define USE_MAP":"",f.envMap?"#define USE_ENVMAP":"",f.envMap?"#define "+u:"",f.lightMap?"#define USE_LIGHTMAP":"",f.aoMap?"#define USE_AOMAP":"",f.emissiveMap?"#define USE_EMISSIVEMAP":"",f.bumpMap?"#define USE_BUMPMAP":
"",f.normalMap?"#define USE_NORMALMAP":"",f.normalMap&&f.objectSpaceNormalMap?"#define OBJECTSPACE_NORMALMAP":"",f.displacementMap&&f.supportsVertexTextures?"#define USE_DISPLACEMENTMAP":"",f.specularMap?"#define USE_SPECULARMAP":"",f.roughnessMap?"#define USE_ROUGHNESSMAP":"",f.metalnessMap?"#define USE_METALNESSMAP":"",f.alphaMap?"#define USE_ALPHAMAP":"",f.vertexColors?"#define USE_COLOR":"",f.flatShading?"#define FLAT_SHADED":"",f.skinning?"#define USE_SKINNING":"",f.useVertexTexture?"#define BONE_TEXTURE":
"",f.morphTargets?"#define USE_MORPHTARGETS":"",f.morphNormals&&!1===f.flatShading?"#define USE_MORPHNORMALS":"",f.doubleSided?"#define DOUBLE_SIDED":"",f.flipSided?"#define FLIP_SIDED":"",f.shadowMapEnabled?"#define USE_SHADOWMAP":"",f.shadowMapEnabled?"#define "+n:"",f.sizeAttenuation?"#define USE_SIZEATTENUATION":"",f.logarithmicDepthBuffer?"#define USE_LOGDEPTHBUF":"",f.logarithmicDepthBuffer&&(g.isWebGL2||b.get("EXT_frag_depth"))?"#define USE_LOGDEPTHBUF_EXT":"","uniform mat4 modelMatrix;","uniform mat4 modelViewMatrix;",
"uniform mat4 projectionMatrix;","uniform mat4 viewMatrix;","uniform mat3 normalMatrix;","uniform vec3 cameraPosition;","attribute vec3 position;","attribute vec3 normal;","attribute vec2 uv;","#ifdef USE_COLOR","\tattribute vec3 color;","#endif","#ifdef USE_MORPHTARGETS","\tattribute vec3 morphTarget0;","\tattribute vec3 morphTarget1;","\tattribute vec3 morphTarget2;","\tattribute vec3 morphTarget3;","\t#ifdef USE_MORPHNORMALS","\t\tattribute vec3 morphNormal0;","\t\tattribute vec3 morphNormal1;",
"\t\tattribute vec3 morphNormal2;","\t\tattribute vec3 morphNormal3;","\t#else","\t\tattribute vec3 morphTarget4;","\t\tattribute vec3 morphTarget5;","\t\tattribute vec3 morphTarget6;","\t\tattribute vec3 morphTarget7;","\t#endif","#endif","#ifdef USE_SKINNING","\tattribute vec4 skinIndex;","\tattribute vec4 skinWeight;","#endif","\n"].filter(xc).join("\n"),b=[y,"precision "+f.precision+" float;","precision "+f.precision+" int;","#define SHADER_NAME "+e.name,p,f.alphaTest?"#define ALPHATEST "+f.alphaTest+
(f.alphaTest%1?"":".0"):"","#define GAMMA_FACTOR "+l,f.useFog&&f.fog?"#define USE_FOG":"",f.useFog&&f.fogExp?"#define FOG_EXP2":"",f.map?"#define USE_MAP":"",f.envMap?"#define USE_ENVMAP":"",f.envMap?"#define "+q:"",f.envMap?"#define "+u:"",f.envMap?"#define "+r:"",f.lightMap?"#define USE_LIGHTMAP":"",f.aoMap?"#define USE_AOMAP":"",f.emissiveMap?"#define USE_EMISSIVEMAP":"",f.bumpMap?"#define USE_BUMPMAP":"",f.normalMap?"#define USE_NORMALMAP":"",f.normalMap&&f.objectSpaceNormalMap?"#define OBJECTSPACE_NORMALMAP":
"",f.specularMap?"#define USE_SPECULARMAP":"",f.roughnessMap?"#define USE_ROUGHNESSMAP":"",f.metalnessMap?"#define USE_METALNESSMAP":"",f.alphaMap?"#define USE_ALPHAMAP":"",f.vertexColors?"#define USE_COLOR":"",f.gradientMap?"#define USE_GRADIENTMAP":"",f.flatShading?"#define FLAT_SHADED":"",f.doubleSided?"#define DOUBLE_SIDED":"",f.flipSided?"#define FLIP_SIDED":"",f.shadowMapEnabled?"#define USE_SHADOWMAP":"",f.shadowMapEnabled?"#define "+n:"",f.premultipliedAlpha?"#define PREMULTIPLIED_ALPHA":
"",f.physicallyCorrectLights?"#define PHYSICALLY_CORRECT_LIGHTS":"",f.logarithmicDepthBuffer?"#define USE_LOGDEPTHBUF":"",f.logarithmicDepthBuffer&&(g.isWebGL2||b.get("EXT_frag_depth"))?"#define USE_LOGDEPTHBUF_EXT":"",f.envMap&&(g.isWebGL2||b.get("EXT_shader_texture_lod"))?"#define TEXTURE_LOD_EXT":"","uniform mat4 viewMatrix;","uniform vec3 cameraPosition;",0!==f.toneMapping?"#define TONE_MAPPING":"",0!==f.toneMapping?U.tonemapping_pars_fragment:"",0!==f.toneMapping?tg("toneMapping",f.toneMapping):
"",f.dithering?"#define DITHERING":"",f.outputEncoding||f.mapEncoding||f.envMapEncoding||f.emissiveMapEncoding?U.encodings_pars_fragment:"",f.mapEncoding?Vd("mapTexelToLinear",f.mapEncoding):"",f.envMapEncoding?Vd("envMapTexelToLinear",f.envMapEncoding):"",f.emissiveMapEncoding?Vd("emissiveMapTexelToLinear",f.emissiveMapEncoding):"",f.outputEncoding?sg("linearToOutputTexel",f.outputEncoding):"",f.depthPacking?"#define DEPTH_PACKING "+d.depthPacking:"","\n"].filter(xc).join("\n"));m=Wd(m);m=Ue(m,f);
m=Ve(m,f);t=Wd(t);t=Ue(t,f);t=Ve(t,f);m=We(m);t=We(t);g.isWebGL2&&!d.isRawShaderMaterial&&(g=!1,n=/^\s*#version\s+300\s+es\s*\n/,d.isShaderMaterial&&null!==m.match(n)&&null!==t.match(n)&&(g=!0,m=m.replace(n,""),t=t.replace(n,"")),k="#version 300 es\n\n#define attribute in\n#define varying out\n#define texture2D texture\n"+k,b=["#version 300 es\n\n#define varying in",g?"":"out highp vec4 pc_fragColor;",g?"":"#define gl_FragColor pc_fragColor","#define gl_FragDepthEXT gl_FragDepth\n#define texture2D texture\n#define textureCube texture\n#define texture2DProj textureProj\n#define texture2DLodEXT textureLod\n#define texture2DProjLodEXT textureProjLod\n#define textureCubeLodEXT textureLod\n#define texture2DGradEXT textureGrad\n#define texture2DProjGradEXT textureProjGrad\n#define textureCubeGradEXT textureGrad"].join("\n")+
"\n"+b);t=b+t;m=Se(h,h.VERTEX_SHADER,k+m);t=Se(h,h.FRAGMENT_SHADER,t);h.attachShader(w,m);h.attachShader(w,t);void 0!==d.index0AttributeName?h.bindAttribLocation(w,0,d.index0AttributeName):!0===f.morphTargets&&h.bindAttribLocation(w,0,"position");h.linkProgram(w);f=h.getProgramInfoLog(w).trim();g=h.getShaderInfoLog(m).trim();n=h.getShaderInfoLog(t).trim();u=q=!0;if(!1===h.getProgramParameter(w,h.LINK_STATUS))q=!1,console.error("THREE.WebGLProgram: shader error: ",h.getError(),"gl.VALIDATE_STATUS",
h.getProgramParameter(w,h.VALIDATE_STATUS),"gl.getProgramInfoLog",f,g,n);else if(""!==f)console.warn("THREE.WebGLProgram: gl.getProgramInfoLog()",f);else if(""===g||""===n)u=!1;u&&(this.diagnostics={runnable:q,material:d,programLog:f,vertexShader:{log:g,prefix:k},fragmentShader:{log:n,prefix:b}});h.deleteShader(m);h.deleteShader(t);var G;this.getUniforms=function(){void 0===G&&(G=new $a(h,w,a));return G};var D;this.getAttributes=function(){if(void 0===D){for(var a={},b=h.getProgramParameter(w,h.ACTIVE_ATTRIBUTES),
c=0;c<b;c++){var d=h.getActiveAttrib(w,c).name;a[d]=h.getAttribLocation(w,d)}D=a}return D};this.destroy=function(){h.deleteProgram(w);this.program=void 0};Object.defineProperties(this,{uniforms:{get:function(){console.warn("THREE.WebGLProgram: .uniforms is now .getUniforms().");return this.getUniforms()}},attributes:{get:function(){console.warn("THREE.WebGLProgram: .attributes is now .getAttributes().");return this.getAttributes()}}});this.name=e.name;this.id=xg++;this.code=c;this.usedTimes=1;this.program=
w;this.vertexShader=m;this.fragmentShader=t;return this}function yg(a,b,c){function d(a,b){if(a)a.isTexture?c=a.encoding:a.isWebGLRenderTarget&&(console.warn("THREE.WebGLPrograms.getTextureEncodingFromMap: don't use render targets as textures. Use their .texture property instead."),c=a.texture.encoding);else var c=3E3;3E3===c&&b&&(c=3007);return c}var e=[],f={MeshDepthMaterial:"depth",MeshDistanceMaterial:"distanceRGBA",MeshNormalMaterial:"normal",MeshBasicMaterial:"basic",MeshLambertMaterial:"lambert",
MeshPhongMaterial:"phong",MeshToonMaterial:"phong",MeshStandardMaterial:"physical",MeshPhysicalMaterial:"physical",LineBasicMaterial:"basic",LineDashedMaterial:"dashed",PointsMaterial:"points",ShadowMaterial:"shadow",SpriteMaterial:"sprite"},g="precision supportsVertexTextures map mapEncoding envMap envMapMode envMapEncoding lightMap aoMap emissiveMap emissiveMapEncoding bumpMap normalMap objectSpaceNormalMap displacementMap specularMap roughnessMap metalnessMap gradientMap alphaMap combine vertexColors fog useFog fogExp flatShading sizeAttenuation logarithmicDepthBuffer skinning maxBones useVertexTexture morphTargets morphNormals maxMorphTargets maxMorphNormals premultipliedAlpha numDirLights numPointLights numSpotLights numHemiLights numRectAreaLights shadowMapEnabled shadowMapType toneMapping physicallyCorrectLights alphaTest doubleSided flipSided numClippingPlanes numClipIntersection depthPacking dithering".split(" ");
this.getParameters=function(b,e,g,t,n,q,u){var h=f[b.type];if(u.isSkinnedMesh){var k=u.skeleton.bones;if(c.floatVertexTextures)k=1024;else{var m=Math.min(Math.floor((c.maxVertexUniforms-20)/4),k.length);m<k.length?(console.warn("THREE.WebGLRenderer: Skeleton has "+k.length+" bones. This GPU supports "+m+"."),k=0):k=m}}else k=0;m=c.precision;null!==b.precision&&(m=c.getMaxPrecision(b.precision),m!==b.precision&&console.warn("THREE.WebGLProgram.getParameters:",b.precision,"not supported, using",m,"instead."));
var l=a.getRenderTarget();return{shaderID:h,precision:m,supportsVertexTextures:c.vertexTextures,outputEncoding:d(l?l.texture:null,a.gammaOutput),map:!!b.map,mapEncoding:d(b.map,a.gammaInput),envMap:!!b.envMap,envMapMode:b.envMap&&b.envMap.mapping,envMapEncoding:d(b.envMap,a.gammaInput),envMapCubeUV:!!b.envMap&&(306===b.envMap.mapping||307===b.envMap.mapping),lightMap:!!b.lightMap,aoMap:!!b.aoMap,emissiveMap:!!b.emissiveMap,emissiveMapEncoding:d(b.emissiveMap,a.gammaInput),bumpMap:!!b.bumpMap,normalMap:!!b.normalMap,
objectSpaceNormalMap:1===b.normalMapType,displacementMap:!!b.displacementMap,roughnessMap:!!b.roughnessMap,metalnessMap:!!b.metalnessMap,specularMap:!!b.specularMap,alphaMap:!!b.alphaMap,gradientMap:!!b.gradientMap,combine:b.combine,vertexColors:b.vertexColors,fog:!!t,useFog:b.fog,fogExp:t&&t.isFogExp2,flatShading:b.flatShading,sizeAttenuation:b.sizeAttenuation,logarithmicDepthBuffer:c.logarithmicDepthBuffer,skinning:b.skinning&&0<k,maxBones:k,useVertexTexture:c.floatVertexTextures,morphTargets:b.morphTargets,
morphNormals:b.morphNormals,maxMorphTargets:a.maxMorphTargets,maxMorphNormals:a.maxMorphNormals,numDirLights:e.directional.length,numPointLights:e.point.length,numSpotLights:e.spot.length,numRectAreaLights:e.rectArea.length,numHemiLights:e.hemi.length,numClippingPlanes:n,numClipIntersection:q,dithering:b.dithering,shadowMapEnabled:a.shadowMap.enabled&&u.receiveShadow&&0<g.length,shadowMapType:a.shadowMap.type,toneMapping:a.toneMapping,physicallyCorrectLights:a.physicallyCorrectLights,premultipliedAlpha:b.premultipliedAlpha,
alphaTest:b.alphaTest,doubleSided:2===b.side,flipSided:1===b.side,depthPacking:void 0!==b.depthPacking?b.depthPacking:!1}};this.getProgramCode=function(b,c){var d=[];c.shaderID?d.push(c.shaderID):(d.push(b.fragmentShader),d.push(b.vertexShader));if(void 0!==b.defines)for(var e in b.defines)d.push(e),d.push(b.defines[e]);for(e=0;e<g.length;e++)d.push(c[g[e]]);d.push(b.onBeforeCompile.toString());d.push(a.gammaOutput);return d.join()};this.acquireProgram=function(d,f,g,t){for(var h,k=0,m=e.length;k<
m;k++){var l=e[k];if(l.code===t){h=l;++h.usedTimes;break}}void 0===h&&(h=new wg(a,b,t,d,f,g,c),e.push(h));return h};this.releaseProgram=function(a){if(0===--a.usedTimes){var b=e.indexOf(a);e[b]=e[e.length-1];e.pop();a.destroy()}};this.programs=e}function zg(){var a=new WeakMap;return{get:function(b){var c=a.get(b);void 0===c&&(c={},a.set(b,c));return c},remove:function(b){a.delete(b)},update:function(b,c,d){a.get(b)[c]=d},dispose:function(){a=new WeakMap}}}function Ag(a,b){return a.renderOrder!==
b.renderOrder?a.renderOrder-b.renderOrder:a.program&&b.program&&a.program!==b.program?a.program.id-b.program.id:a.material.id!==b.material.id?a.material.id-b.material.id:a.z!==b.z?a.z-b.z:a.id-b.id}function Bg(a,b){return a.renderOrder!==b.renderOrder?a.renderOrder-b.renderOrder:a.z!==b.z?b.z-a.z:a.id-b.id}function Cg(){var a=[],b=0,c=[],d=[];return{opaque:c,transparent:d,init:function(){b=0;c.length=0;d.length=0},push:function(e,f,g,h,k){var m=a[b];void 0===m?(m={id:e.id,object:e,geometry:f,material:g,
program:g.program,renderOrder:e.renderOrder,z:h,group:k},a[b]=m):(m.id=e.id,m.object=e,m.geometry=f,m.material=g,m.program=g.program,m.renderOrder=e.renderOrder,m.z=h,m.group=k);(!0===g.transparent?d:c).push(m);b++},sort:function(){1<c.length&&c.sort(Ag);1<d.length&&d.sort(Bg)}}}function Dg(){var a={};return{get:function(b,c){b=b.id+","+c.id;c=a[b];void 0===c&&(c=new Cg,a[b]=c);return c},dispose:function(){a={}}}}function Eg(){var a={};return{get:function(b){if(void 0!==a[b.id])return a[b.id];switch(b.type){case "DirectionalLight":var c=
{direction:new p,color:new F,shadow:!1,shadowBias:0,shadowRadius:1,shadowMapSize:new z};break;case "SpotLight":c={position:new p,direction:new p,color:new F,distance:0,coneCos:0,penumbraCos:0,decay:0,shadow:!1,shadowBias:0,shadowRadius:1,shadowMapSize:new z};break;case "PointLight":c={position:new p,color:new F,distance:0,decay:0,shadow:!1,shadowBias:0,shadowRadius:1,shadowMapSize:new z,shadowCameraNear:1,shadowCameraFar:1E3};break;case "HemisphereLight":c={direction:new p,skyColor:new F,groundColor:new F};
break;case "RectAreaLight":c={color:new F,position:new p,halfWidth:new p,halfHeight:new p}}return a[b.id]=c}}}function Fg(){var a=new Eg,b={id:Gg++,hash:{stateID:-1,directionalLength:-1,pointLength:-1,spotLength:-1,rectAreaLength:-1,hemiLength:-1,shadowsLength:-1},ambient:[0,0,0],directional:[],directionalShadowMap:[],directionalShadowMatrix:[],spot:[],spotShadowMap:[],spotShadowMatrix:[],rectArea:[],point:[],pointShadowMap:[],pointShadowMatrix:[],hemi:[]},c=new p,d=new J,e=new J;return{setup:function(f,
g,h){var k=0,m=0,t=0,n=0,q=0,u=0,l=0,v=0;h=h.matrixWorldInverse;for(var y=0,p=f.length;y<p;y++){var w=f[y],G=w.color,D=w.intensity,O=w.distance,S=w.shadow&&w.shadow.map?w.shadow.map.texture:null;if(w.isAmbientLight)k+=G.r*D,m+=G.g*D,t+=G.b*D;else if(w.isDirectionalLight){var E=a.get(w);E.color.copy(w.color).multiplyScalar(w.intensity);E.direction.setFromMatrixPosition(w.matrixWorld);c.setFromMatrixPosition(w.target.matrixWorld);E.direction.sub(c);E.direction.transformDirection(h);if(E.shadow=w.castShadow)G=
w.shadow,E.shadowBias=G.bias,E.shadowRadius=G.radius,E.shadowMapSize=G.mapSize;b.directionalShadowMap[n]=S;b.directionalShadowMatrix[n]=w.shadow.matrix;b.directional[n]=E;n++}else if(w.isSpotLight){E=a.get(w);E.position.setFromMatrixPosition(w.matrixWorld);E.position.applyMatrix4(h);E.color.copy(G).multiplyScalar(D);E.distance=O;E.direction.setFromMatrixPosition(w.matrixWorld);c.setFromMatrixPosition(w.target.matrixWorld);E.direction.sub(c);E.direction.transformDirection(h);E.coneCos=Math.cos(w.angle);
E.penumbraCos=Math.cos(w.angle*(1-w.penumbra));E.decay=0===w.distance?0:w.decay;if(E.shadow=w.castShadow)G=w.shadow,E.shadowBias=G.bias,E.shadowRadius=G.radius,E.shadowMapSize=G.mapSize;b.spotShadowMap[u]=S;b.spotShadowMatrix[u]=w.shadow.matrix;b.spot[u]=E;u++}else if(w.isRectAreaLight)E=a.get(w),E.color.copy(G).multiplyScalar(D),E.position.setFromMatrixPosition(w.matrixWorld),E.position.applyMatrix4(h),e.identity(),d.copy(w.matrixWorld),d.premultiply(h),e.extractRotation(d),E.halfWidth.set(.5*w.width,
0,0),E.halfHeight.set(0,.5*w.height,0),E.halfWidth.applyMatrix4(e),E.halfHeight.applyMatrix4(e),b.rectArea[l]=E,l++;else if(w.isPointLight){E=a.get(w);E.position.setFromMatrixPosition(w.matrixWorld);E.position.applyMatrix4(h);E.color.copy(w.color).multiplyScalar(w.intensity);E.distance=w.distance;E.decay=0===w.distance?0:w.decay;if(E.shadow=w.castShadow)G=w.shadow,E.shadowBias=G.bias,E.shadowRadius=G.radius,E.shadowMapSize=G.mapSize,E.shadowCameraNear=G.camera.near,E.shadowCameraFar=G.camera.far;
b.pointShadowMap[q]=S;b.pointShadowMatrix[q]=w.shadow.matrix;b.point[q]=E;q++}else w.isHemisphereLight&&(E=a.get(w),E.direction.setFromMatrixPosition(w.matrixWorld),E.direction.transformDirection(h),E.direction.normalize(),E.skyColor.copy(w.color).multiplyScalar(D),E.groundColor.copy(w.groundColor).multiplyScalar(D),b.hemi[v]=E,v++)}b.ambient[0]=k;b.ambient[1]=m;b.ambient[2]=t;b.directional.length=n;b.spot.length=u;b.rectArea.length=l;b.point.length=q;b.hemi.length=v;b.hash.stateID=b.id;b.hash.directionalLength=
n;b.hash.pointLength=q;b.hash.spotLength=u;b.hash.rectAreaLength=l;b.hash.hemiLength=v;b.hash.shadowsLength=g.length},state:b}}function Xe(){var a=new Fg,b=[],c=[];return{init:function(){b.length=0;c.length=0},state:{lightsArray:b,shadowsArray:c,lights:a},setupLights:function(d){a.setup(b,c,d)},pushLight:function(a){b.push(a)},pushShadow:function(a){c.push(a)}}}function Hg(){var a={};return{get:function(b,c){if(void 0===a[b.id]){var d=new Xe;a[b.id]={};a[b.id][c.id]=d}else void 0===a[b.id][c.id]?
(d=new Xe,a[b.id][c.id]=d):d=a[b.id][c.id];return d},dispose:function(){a={}}}}function ab(a){H.call(this);this.type="MeshDepthMaterial";this.depthPacking=3200;this.morphTargets=this.skinning=!1;this.displacementMap=this.alphaMap=this.map=null;this.displacementScale=1;this.displacementBias=0;this.wireframe=!1;this.wireframeLinewidth=1;this.lights=this.fog=!1;this.setValues(a)}function bb(a){H.call(this);this.type="MeshDistanceMaterial";this.referencePosition=new p;this.nearDistance=1;this.farDistance=
1E3;this.morphTargets=this.skinning=!1;this.displacementMap=this.alphaMap=this.map=null;this.displacementScale=1;this.displacementBias=0;this.lights=this.fog=!1;this.setValues(a)}function Ye(a,b,c){function d(b,c,d,e,f,g){var h=b.geometry;var k=n;var m=b.customDepthMaterial;d&&(k=q,m=b.customDistanceMaterial);m?k=m:(m=!1,c.morphTargets&&(h&&h.isBufferGeometry?m=h.morphAttributes&&h.morphAttributes.position&&0<h.morphAttributes.position.length:h&&h.isGeometry&&(m=h.morphTargets&&0<h.morphTargets.length)),
b.isSkinnedMesh&&!1===c.skinning&&console.warn("THREE.WebGLShadowMap: THREE.SkinnedMesh with material.skinning set to false:",b),b=b.isSkinnedMesh&&c.skinning,h=0,m&&(h|=1),b&&(h|=2),k=k[h]);a.localClippingEnabled&&!0===c.clipShadows&&0!==c.clippingPlanes.length&&(h=k.uuid,m=c.uuid,b=u[h],void 0===b&&(b={},u[h]=b),h=b[m],void 0===h&&(h=k.clone(),b[m]=h),k=h);k.visible=c.visible;k.wireframe=c.wireframe;k.side=null!=c.shadowSide?c.shadowSide:l[c.side];k.clipShadows=c.clipShadows;k.clippingPlanes=c.clippingPlanes;
k.clipIntersection=c.clipIntersection;k.wireframeLinewidth=c.wireframeLinewidth;k.linewidth=c.linewidth;d&&k.isMeshDistanceMaterial&&(k.referencePosition.copy(e),k.nearDistance=f,k.farDistance=g);return k}function e(c,g,h,k){if(!1!==c.visible){if(c.layers.test(g.layers)&&(c.isMesh||c.isLine||c.isPoints)&&c.castShadow&&(!c.frustumCulled||f.intersectsObject(c))){c.modelViewMatrix.multiplyMatrices(h.matrixWorldInverse,c.matrixWorld);var m=b.update(c),n=c.material;if(Array.isArray(n))for(var q=m.groups,
u=0,l=q.length;u<l;u++){var r=q[u],O=n[r.materialIndex];O&&O.visible&&(O=d(c,O,k,t,h.near,h.far),a.renderBufferDirect(h,null,m,O,c,r))}else n.visible&&(O=d(c,n,k,t,h.near,h.far),a.renderBufferDirect(h,null,m,O,c,null))}c=c.children;m=0;for(n=c.length;m<n;m++)e(c[m],g,h,k)}}var f=new od,g=new J,h=new z,k=new z(c,c),m=new p,t=new p,n=Array(4),q=Array(4),u={},l={0:1,1:0,2:2},v=[new p(1,0,0),new p(-1,0,0),new p(0,0,1),new p(0,0,-1),new p(0,1,0),new p(0,-1,0)],y=[new p(0,1,0),new p(0,1,0),new p(0,1,0),
new p(0,1,0),new p(0,0,1),new p(0,0,-1)],x=[new aa,new aa,new aa,new aa,new aa,new aa];for(c=0;4!==c;++c){var w=0!==(c&1),G=0!==(c&2),D=new ab({depthPacking:3201,morphTargets:w,skinning:G});n[c]=D;w=new bb({morphTargets:w,skinning:G});q[c]=w}var O=this;this.enabled=!1;this.autoUpdate=!0;this.needsUpdate=!1;this.type=1;this.render=function(b,c,d){if(!1!==O.enabled&&(!1!==O.autoUpdate||!1!==O.needsUpdate)&&0!==b.length){var n=a.state;n.disable(a.context.BLEND);n.buffers.color.setClear(1,1,1,1);n.buffers.depth.setTest(!0);
n.setScissorTest(!1);for(var q,u=0,l=b.length;u<l;u++){var r=b[u];q=r.shadow;var w=r&&r.isPointLight;if(void 0===q)console.warn("THREE.WebGLShadowMap:",r,"has no shadow.");else{var p=q.camera;h.copy(q.mapSize);h.min(k);if(w){var S=h.x,E=h.y;x[0].set(2*S,E,S,E);x[1].set(0,E,S,E);x[2].set(3*S,E,S,E);x[3].set(S,E,S,E);x[4].set(3*S,0,S,E);x[5].set(S,0,S,E);h.x*=4;h.y*=2}null===q.map&&(q.map=new hb(h.x,h.y,{minFilter:1003,magFilter:1003,format:1023}),q.map.texture.name=r.name+".shadowMap",p.updateProjectionMatrix());
q.isSpotLightShadow&&q.update(r);S=q.map;E=q.matrix;t.setFromMatrixPosition(r.matrixWorld);p.position.copy(t);w?(q=6,E.makeTranslation(-t.x,-t.y,-t.z)):(q=1,m.setFromMatrixPosition(r.target.matrixWorld),p.lookAt(m),p.updateMatrixWorld(),E.set(.5,0,0,.5,0,.5,0,.5,0,0,.5,.5,0,0,0,1),E.multiply(p.projectionMatrix),E.multiply(p.matrixWorldInverse));a.setRenderTarget(S);a.clear();for(r=0;r<q;r++)w&&(m.copy(p.position),m.add(v[r]),p.up.copy(y[r]),p.lookAt(m),p.updateMatrixWorld(),n.viewport(x[r])),g.multiplyMatrices(p.projectionMatrix,
p.matrixWorldInverse),f.setFromMatrix(g),e(c,d,p,w)}}O.needsUpdate=!1}}}function Ig(a,b,c,d){function e(b,c,d){var e=new Uint8Array(4),f=a.createTexture();a.bindTexture(b,f);a.texParameteri(b,a.TEXTURE_MIN_FILTER,a.NEAREST);a.texParameteri(b,a.TEXTURE_MAG_FILTER,a.NEAREST);for(b=0;b<d;b++)a.texImage2D(c+b,0,a.RGBA,1,1,0,a.RGBA,a.UNSIGNED_BYTE,e);return f}function f(c,e){x[c]=1;0===w[c]&&(a.enableVertexAttribArray(c),w[c]=1);G[c]!==e&&((d.isWebGL2?a:b.get("ANGLE_instanced_arrays"))[d.isWebGL2?"vertexAttribDivisor":
"vertexAttribDivisorANGLE"](c,e),G[c]=e)}function g(b){!0!==D[b]&&(a.enable(b),D[b]=!0)}function h(b){!1!==D[b]&&(a.disable(b),D[b]=!1)}function k(b,d,e,f,k,m,n,t){if(0===b)E&&(h(a.BLEND),E=!1);else if(E||(g(a.BLEND),E=!0),5!==b){if(b!==z||t!==F){if(100!==pd||100!==A)a.blendEquation(a.FUNC_ADD),A=pd=100;if(t)switch(b){case 1:a.blendFuncSeparate(a.ONE,a.ONE_MINUS_SRC_ALPHA,a.ONE,a.ONE_MINUS_SRC_ALPHA);break;case 2:a.blendFunc(a.ONE,a.ONE);break;case 3:a.blendFuncSeparate(a.ZERO,a.ZERO,a.ONE_MINUS_SRC_COLOR,
a.ONE_MINUS_SRC_ALPHA);break;case 4:a.blendFuncSeparate(a.ZERO,a.SRC_COLOR,a.ZERO,a.SRC_ALPHA);break;default:console.error("THREE.WebGLState: Invalid blending: ",b)}else switch(b){case 1:a.blendFuncSeparate(a.SRC_ALPHA,a.ONE_MINUS_SRC_ALPHA,a.ONE,a.ONE_MINUS_SRC_ALPHA);break;case 2:a.blendFunc(a.SRC_ALPHA,a.ONE);break;case 3:a.blendFunc(a.ZERO,a.ONE_MINUS_SRC_COLOR);break;case 4:a.blendFunc(a.ZERO,a.SRC_COLOR);break;default:console.error("THREE.WebGLState: Invalid blending: ",b)}I=B=P=Td=null;z=b;
F=t}}else{k=k||d;m=m||e;n=n||f;if(d!==pd||k!==A)a.blendEquationSeparate(c.convert(d),c.convert(k)),pd=d,A=k;if(e!==Td||f!==P||m!==B||n!==I)a.blendFuncSeparate(c.convert(e),c.convert(f),c.convert(m),c.convert(n)),Td=e,P=f,B=m,I=n;z=b;F=null}}function m(b){R!==b&&(b?a.frontFace(a.CW):a.frontFace(a.CCW),R=b)}function t(b){0!==b?(g(a.CULL_FACE),b!==L&&(1===b?a.cullFace(a.BACK):2===b?a.cullFace(a.FRONT):a.cullFace(a.FRONT_AND_BACK))):h(a.CULL_FACE);L=b}function n(b,c,d){if(b){if(g(a.POLYGON_OFFSET_FILL),
M!==c||K!==d)a.polygonOffset(c,d),M=c,K=d}else h(a.POLYGON_OFFSET_FILL)}function q(b){void 0===b&&(b=a.TEXTURE0+H-1);U!==b&&(a.activeTexture(b),U=b)}var u=new function(){var b=!1,c=new aa,d=null,e=new aa(0,0,0,0);return{setMask:function(c){d===c||b||(a.colorMask(c,c,c,c),d=c)},setLocked:function(a){b=a},setClear:function(b,d,f,g,h){!0===h&&(b*=g,d*=g,f*=g);c.set(b,d,f,g);!1===e.equals(c)&&(a.clearColor(b,d,f,g),e.copy(c))},reset:function(){b=!1;d=null;e.set(-1,0,0,0)}}},l=new function(){var b=!1,
c=null,d=null,e=null;return{setTest:function(b){b?g(a.DEPTH_TEST):h(a.DEPTH_TEST)},setMask:function(d){c===d||b||(a.depthMask(d),c=d)},setFunc:function(b){if(d!==b){if(b)switch(b){case 0:a.depthFunc(a.NEVER);break;case 1:a.depthFunc(a.ALWAYS);break;case 2:a.depthFunc(a.LESS);break;case 3:a.depthFunc(a.LEQUAL);break;case 4:a.depthFunc(a.EQUAL);break;case 5:a.depthFunc(a.GEQUAL);break;case 6:a.depthFunc(a.GREATER);break;case 7:a.depthFunc(a.NOTEQUAL);break;default:a.depthFunc(a.LEQUAL)}else a.depthFunc(a.LEQUAL);
d=b}},setLocked:function(a){b=a},setClear:function(b){e!==b&&(a.clearDepth(b),e=b)},reset:function(){b=!1;e=d=c=null}}},v=new function(){var b=!1,c=null,d=null,e=null,f=null,k=null,m=null,n=null,t=null;return{setTest:function(b){b?g(a.STENCIL_TEST):h(a.STENCIL_TEST)},setMask:function(d){c===d||b||(a.stencilMask(d),c=d)},setFunc:function(b,c,g){if(d!==b||e!==c||f!==g)a.stencilFunc(b,c,g),d=b,e=c,f=g},setOp:function(b,c,d){if(k!==b||m!==c||n!==d)a.stencilOp(b,c,d),k=b,m=c,n=d},setLocked:function(a){b=
a},setClear:function(b){t!==b&&(a.clearStencil(b),t=b)},reset:function(){b=!1;t=n=m=k=f=e=d=c=null}}},p=a.getParameter(a.MAX_VERTEX_ATTRIBS),x=new Uint8Array(p),w=new Uint8Array(p),G=new Uint8Array(p),D={},O=null,S=null,E=null,z=null,pd=null,Td=null,P=null,A=null,B=null,I=null,F=!1,R=null,L=null,J=null,M=null,K=null,H=a.getParameter(a.MAX_COMBINED_TEXTURE_IMAGE_UNITS),Q=!1;p=0;p=a.getParameter(a.VERSION);-1!==p.indexOf("WebGL")?(p=parseFloat(/^WebGL ([0-9])/.exec(p)[1]),Q=1<=p):-1!==p.indexOf("OpenGL ES")&&
(p=parseFloat(/^OpenGL ES ([0-9])/.exec(p)[1]),Q=2<=p);var U=null,V={},Z=new aa,N=new aa,W={};W[a.TEXTURE_2D]=e(a.TEXTURE_2D,a.TEXTURE_2D,1);W[a.TEXTURE_CUBE_MAP]=e(a.TEXTURE_CUBE_MAP,a.TEXTURE_CUBE_MAP_POSITIVE_X,6);u.setClear(0,0,0,1);l.setClear(1);v.setClear(0);g(a.DEPTH_TEST);l.setFunc(3);m(!1);t(1);g(a.CULL_FACE);k(0);return{buffers:{color:u,depth:l,stencil:v},initAttributes:function(){for(var a=0,b=x.length;a<b;a++)x[a]=0},enableAttribute:function(a){f(a,0)},enableAttributeAndDivisor:f,disableUnusedAttributes:function(){for(var b=
0,c=w.length;b!==c;++b)w[b]!==x[b]&&(a.disableVertexAttribArray(b),w[b]=0)},enable:g,disable:h,getCompressedTextureFormats:function(){if(null===O&&(O=[],b.get("WEBGL_compressed_texture_pvrtc")||b.get("WEBGL_compressed_texture_s3tc")||b.get("WEBGL_compressed_texture_etc1")||b.get("WEBGL_compressed_texture_astc")))for(var c=a.getParameter(a.COMPRESSED_TEXTURE_FORMATS),d=0;d<c.length;d++)O.push(c[d]);return O},useProgram:function(b){return S!==b?(a.useProgram(b),S=b,!0):!1},setBlending:k,setMaterial:function(b,
c){2===b.side?h(a.CULL_FACE):g(a.CULL_FACE);var d=1===b.side;c&&(d=!d);m(d);1===b.blending&&!1===b.transparent?k(0):k(b.blending,b.blendEquation,b.blendSrc,b.blendDst,b.blendEquationAlpha,b.blendSrcAlpha,b.blendDstAlpha,b.premultipliedAlpha);l.setFunc(b.depthFunc);l.setTest(b.depthTest);l.setMask(b.depthWrite);u.setMask(b.colorWrite);n(b.polygonOffset,b.polygonOffsetFactor,b.polygonOffsetUnits)},setFlipSided:m,setCullFace:t,setLineWidth:function(b){b!==J&&(Q&&a.lineWidth(b),J=b)},setPolygonOffset:n,
setScissorTest:function(b){b?g(a.SCISSOR_TEST):h(a.SCISSOR_TEST)},activeTexture:q,bindTexture:function(b,c){null===U&&q();var d=V[U];void 0===d&&(d={type:void 0,texture:void 0},V[U]=d);if(d.type!==b||d.texture!==c)a.bindTexture(b,c||W[b]),d.type=b,d.texture=c},compressedTexImage2D:function(){try{a.compressedTexImage2D.apply(a,arguments)}catch(cb){console.error("THREE.WebGLState:",cb)}},texImage2D:function(){try{a.texImage2D.apply(a,arguments)}catch(cb){console.error("THREE.WebGLState:",cb)}},scissor:function(b){!1===
Z.equals(b)&&(a.scissor(b.x,b.y,b.z,b.w),Z.copy(b))},viewport:function(b){!1===N.equals(b)&&(a.viewport(b.x,b.y,b.z,b.w),N.copy(b))},reset:function(){for(var b=0;b<w.length;b++)1===w[b]&&(a.disableVertexAttribArray(b),w[b]=0);D={};U=O=null;V={};L=R=z=S=null;u.reset();l.reset();v.reset()}}}function Jg(a,b,c,d,e,f,g){function h(a,b){if(a.width>b||a.height>b){if("data"in a){console.warn("THREE.WebGLRenderer: image in DataTexture is too big ("+a.width+"x"+a.height+").");return}b/=Math.max(a.width,a.height);
var c=document.createElementNS("http://www.w3.org/1999/xhtml","canvas");c.width=Math.floor(a.width*b);c.height=Math.floor(a.height*b);c.getContext("2d").drawImage(a,0,0,a.width,a.height,0,0,c.width,c.height);console.warn("THREE.WebGLRenderer: image is too big ("+a.width+"x"+a.height+"). Resized to "+c.width+"x"+c.height);return c}return a}function k(a){return K.isPowerOfTwo(a.width)&&K.isPowerOfTwo(a.height)}function m(a,b){return a.generateMipmaps&&b&&1003!==a.minFilter&&1006!==a.minFilter}function t(b,
c,e,f){a.generateMipmap(b);d.get(c).__maxMipLevel=Math.log(Math.max(e,f))*Math.LOG2E}function n(b,c){if(!e.isWebGL2)return b;if(b===a.RGB){if(c===a.FLOAT)return a.RGB32F;if(c===a.HALF_FLOAT)return a.RGB16F;if(c===a.UNSIGNED_BYTE)return a.RGB8}if(b===a.RGBA){if(c===a.FLOAT)return a.RGBA32F;if(c===a.HALF_FLOAT)return a.RGBA16F;if(c===a.UNSIGNED_BYTE)return a.RGBA8}return b}function q(b){return 1003===b||1004===b||1005===b?a.NEAREST:a.LINEAR}function u(b){b=b.target;b.removeEventListener("dispose",u);
a:{var c=d.get(b);if(b.image&&c.__image__webglTextureCube)a.deleteTexture(c.__image__webglTextureCube);else{if(void 0===c.__webglInit)break a;a.deleteTexture(c.__webglTexture)}d.remove(b)}b.isVideoTexture&&delete G[b.id];g.memory.textures--}function l(b){b=b.target;b.removeEventListener("dispose",l);var c=d.get(b),e=d.get(b.texture);if(b){void 0!==e.__webglTexture&&a.deleteTexture(e.__webglTexture);b.depthTexture&&b.depthTexture.dispose();if(b.isWebGLRenderTargetCube)for(e=0;6>e;e++)a.deleteFramebuffer(c.__webglFramebuffer[e]),
c.__webglDepthbuffer&&a.deleteRenderbuffer(c.__webglDepthbuffer[e]);else a.deleteFramebuffer(c.__webglFramebuffer),c.__webglDepthbuffer&&a.deleteRenderbuffer(c.__webglDepthbuffer);d.remove(b.texture);d.remove(b)}g.memory.textures--}function v(b,q){var l=d.get(b);if(b.isVideoTexture){var r=b.id,v=g.render.frame;G[r]!==v&&(G[r]=v,b.update())}if(0<b.version&&l.__version!==b.version)if(r=b.image,void 0===r)console.warn("THREE.WebGLRenderer: Texture marked for update but image is undefined");else if(!1===
r.complete)console.warn("THREE.WebGLRenderer: Texture marked for update but image is incomplete");else{void 0===l.__webglInit&&(l.__webglInit=!0,b.addEventListener("dispose",u),l.__webglTexture=a.createTexture(),g.memory.textures++);c.activeTexture(a.TEXTURE0+q);c.bindTexture(a.TEXTURE_2D,l.__webglTexture);a.pixelStorei(a.UNPACK_FLIP_Y_WEBGL,b.flipY);a.pixelStorei(a.UNPACK_PREMULTIPLY_ALPHA_WEBGL,b.premultiplyAlpha);a.pixelStorei(a.UNPACK_ALIGNMENT,b.unpackAlignment);q=h(b.image,e.maxTextureSize);
(e.isWebGL2?0:1001!==b.wrapS||1001!==b.wrapT||1003!==b.minFilter&&1006!==b.minFilter)&&!1===k(q)&&(q instanceof HTMLImageElement||q instanceof HTMLCanvasElement||q instanceof ImageBitmap)&&(void 0===D&&(D=document.createElementNS("http://www.w3.org/1999/xhtml","canvas")),D.width=K.floorPowerOfTwo(q.width),D.height=K.floorPowerOfTwo(q.height),D.getContext("2d").drawImage(q,0,0,D.width,D.height),console.warn("THREE.WebGLRenderer: image is not power of two ("+q.width+"x"+q.height+"). Resized to "+D.width+
"x"+D.height),q=D);r=k(q);v=f.convert(b.format);var w=f.convert(b.type),O=n(v,w);p(a.TEXTURE_2D,b,r);var y=b.mipmaps;if(b.isDepthTexture){O=a.DEPTH_COMPONENT;if(1015===b.type){if(!e.isWebGL2)throw Error("Float Depth Texture only supported in WebGL2.0");O=a.DEPTH_COMPONENT32F}else e.isWebGL2&&(O=a.DEPTH_COMPONENT16);1026===b.format&&O===a.DEPTH_COMPONENT&&1012!==b.type&&1014!==b.type&&(console.warn("THREE.WebGLRenderer: Use UnsignedShortType or UnsignedIntType for DepthFormat DepthTexture."),b.type=
1012,w=f.convert(b.type));1027===b.format&&(O=a.DEPTH_STENCIL,1020!==b.type&&(console.warn("THREE.WebGLRenderer: Use UnsignedInt248Type for DepthStencilFormat DepthTexture."),b.type=1020,w=f.convert(b.type)));c.texImage2D(a.TEXTURE_2D,0,O,q.width,q.height,0,v,w,null)}else if(b.isDataTexture)if(0<y.length&&r){for(var S=0,x=y.length;S<x;S++){var z=y[S];c.texImage2D(a.TEXTURE_2D,S,O,z.width,z.height,0,v,w,z.data)}b.generateMipmaps=!1;l.__maxMipLevel=y.length-1}else c.texImage2D(a.TEXTURE_2D,0,O,q.width,
q.height,0,v,w,q.data),l.__maxMipLevel=0;else if(b.isCompressedTexture){S=0;for(x=y.length;S<x;S++)z=y[S],1023!==b.format&&1022!==b.format?-1<c.getCompressedTextureFormats().indexOf(v)?c.compressedTexImage2D(a.TEXTURE_2D,S,O,z.width,z.height,0,z.data):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()"):c.texImage2D(a.TEXTURE_2D,S,O,z.width,z.height,0,v,w,z.data);l.__maxMipLevel=y.length-1}else if(0<y.length&&r){S=0;for(x=y.length;S<x;S++)z=
y[S],c.texImage2D(a.TEXTURE_2D,S,O,v,w,z);b.generateMipmaps=!1;l.__maxMipLevel=y.length-1}else c.texImage2D(a.TEXTURE_2D,0,O,v,w,q),l.__maxMipLevel=0;m(b,r)&&t(a.TEXTURE_2D,b,q.width,q.height);l.__version=b.version;if(b.onUpdate)b.onUpdate(b);return}c.activeTexture(a.TEXTURE0+q);c.bindTexture(a.TEXTURE_2D,l.__webglTexture)}function p(c,g,h){h?(a.texParameteri(c,a.TEXTURE_WRAP_S,f.convert(g.wrapS)),a.texParameteri(c,a.TEXTURE_WRAP_T,f.convert(g.wrapT)),a.texParameteri(c,a.TEXTURE_MAG_FILTER,f.convert(g.magFilter)),
a.texParameteri(c,a.TEXTURE_MIN_FILTER,f.convert(g.minFilter))):(a.texParameteri(c,a.TEXTURE_WRAP_S,a.CLAMP_TO_EDGE),a.texParameteri(c,a.TEXTURE_WRAP_T,a.CLAMP_TO_EDGE),1001===g.wrapS&&1001===g.wrapT||console.warn("THREE.WebGLRenderer: Texture is not power of two. Texture.wrapS and Texture.wrapT should be set to THREE.ClampToEdgeWrapping."),a.texParameteri(c,a.TEXTURE_MAG_FILTER,q(g.magFilter)),a.texParameteri(c,a.TEXTURE_MIN_FILTER,q(g.minFilter)),1003!==g.minFilter&&1006!==g.minFilter&&console.warn("THREE.WebGLRenderer: Texture is not power of two. Texture.minFilter should be set to THREE.NearestFilter or THREE.LinearFilter."));
!(h=b.get("EXT_texture_filter_anisotropic"))||1015===g.type&&null===b.get("OES_texture_float_linear")||1016===g.type&&null===(e.isWebGL2||b.get("OES_texture_half_float_linear"))||!(1<g.anisotropy||d.get(g).__currentAnisotropy)||(a.texParameterf(c,h.TEXTURE_MAX_ANISOTROPY_EXT,Math.min(g.anisotropy,e.getMaxAnisotropy())),d.get(g).__currentAnisotropy=g.anisotropy)}function x(b,e,g,h){var k=f.convert(e.texture.format),m=f.convert(e.texture.type),t=n(k,m);c.texImage2D(h,0,t,e.width,e.height,0,k,m,null);
a.bindFramebuffer(a.FRAMEBUFFER,b);a.framebufferTexture2D(a.FRAMEBUFFER,g,h,d.get(e.texture).__webglTexture,0);a.bindFramebuffer(a.FRAMEBUFFER,null)}function w(b,c){a.bindRenderbuffer(a.RENDERBUFFER,b);c.depthBuffer&&!c.stencilBuffer?(a.renderbufferStorage(a.RENDERBUFFER,a.DEPTH_COMPONENT16,c.width,c.height),a.framebufferRenderbuffer(a.FRAMEBUFFER,a.DEPTH_ATTACHMENT,a.RENDERBUFFER,b)):c.depthBuffer&&c.stencilBuffer?(a.renderbufferStorage(a.RENDERBUFFER,a.DEPTH_STENCIL,c.width,c.height),a.framebufferRenderbuffer(a.FRAMEBUFFER,
a.DEPTH_STENCIL_ATTACHMENT,a.RENDERBUFFER,b)):a.renderbufferStorage(a.RENDERBUFFER,a.RGBA4,c.width,c.height);a.bindRenderbuffer(a.RENDERBUFFER,null)}var G={},D;this.setTexture2D=v;this.setTextureCube=function(b,q){var l=d.get(b);if(6===b.image.length)if(0<b.version&&l.__version!==b.version){l.__image__webglTextureCube||(b.addEventListener("dispose",u),l.__image__webglTextureCube=a.createTexture(),g.memory.textures++);c.activeTexture(a.TEXTURE0+q);c.bindTexture(a.TEXTURE_CUBE_MAP,l.__image__webglTextureCube);
a.pixelStorei(a.UNPACK_FLIP_Y_WEBGL,b.flipY);q=b&&b.isCompressedTexture;for(var r=b.image[0]&&b.image[0].isDataTexture,v=[],w=0;6>w;w++)v[w]=q||r?r?b.image[w].image:b.image[w]:h(b.image[w],e.maxCubemapSize);var y=v[0],O=k(y),x=f.convert(b.format),D=f.convert(b.type),G=n(x,D);p(a.TEXTURE_CUBE_MAP,b,O);for(w=0;6>w;w++)if(q)for(var S,z=v[w].mipmaps,A=0,B=z.length;A<B;A++)S=z[A],1023!==b.format&&1022!==b.format?-1<c.getCompressedTextureFormats().indexOf(x)?c.compressedTexImage2D(a.TEXTURE_CUBE_MAP_POSITIVE_X+
w,A,G,S.width,S.height,0,S.data):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .setTextureCube()"):c.texImage2D(a.TEXTURE_CUBE_MAP_POSITIVE_X+w,A,G,S.width,S.height,0,x,D,S.data);else r?c.texImage2D(a.TEXTURE_CUBE_MAP_POSITIVE_X+w,0,G,v[w].width,v[w].height,0,x,D,v[w].data):c.texImage2D(a.TEXTURE_CUBE_MAP_POSITIVE_X+w,0,G,x,D,v[w]);l.__maxMipLevel=q?z.length-1:0;m(b,O)&&t(a.TEXTURE_CUBE_MAP,b,y.width,y.height);l.__version=b.version;if(b.onUpdate)b.onUpdate(b)}else c.activeTexture(a.TEXTURE0+
q),c.bindTexture(a.TEXTURE_CUBE_MAP,l.__image__webglTextureCube)};this.setTextureCubeDynamic=function(b,e){c.activeTexture(a.TEXTURE0+e);c.bindTexture(a.TEXTURE_CUBE_MAP,d.get(b).__webglTexture)};this.setupRenderTarget=function(b){var e=d.get(b),f=d.get(b.texture);b.addEventListener("dispose",l);f.__webglTexture=a.createTexture();g.memory.textures++;var h=!0===b.isWebGLRenderTargetCube,n=k(b);if(h){e.__webglFramebuffer=[];for(var q=0;6>q;q++)e.__webglFramebuffer[q]=a.createFramebuffer()}else e.__webglFramebuffer=
a.createFramebuffer();if(h){c.bindTexture(a.TEXTURE_CUBE_MAP,f.__webglTexture);p(a.TEXTURE_CUBE_MAP,b.texture,n);for(q=0;6>q;q++)x(e.__webglFramebuffer[q],b,a.COLOR_ATTACHMENT0,a.TEXTURE_CUBE_MAP_POSITIVE_X+q);m(b.texture,n)&&t(a.TEXTURE_CUBE_MAP,b.texture,b.width,b.height);c.bindTexture(a.TEXTURE_CUBE_MAP,null)}else c.bindTexture(a.TEXTURE_2D,f.__webglTexture),p(a.TEXTURE_2D,b.texture,n),x(e.__webglFramebuffer,b,a.COLOR_ATTACHMENT0,a.TEXTURE_2D),m(b.texture,n)&&t(a.TEXTURE_2D,b.texture,b.width,b.height),
c.bindTexture(a.TEXTURE_2D,null);if(b.depthBuffer){e=d.get(b);f=!0===b.isWebGLRenderTargetCube;if(b.depthTexture){if(f)throw Error("target.depthTexture not supported in Cube render targets");if(b&&b.isWebGLRenderTargetCube)throw Error("Depth Texture with cube render targets is not supported");a.bindFramebuffer(a.FRAMEBUFFER,e.__webglFramebuffer);if(!b.depthTexture||!b.depthTexture.isDepthTexture)throw Error("renderTarget.depthTexture must be an instance of THREE.DepthTexture");d.get(b.depthTexture).__webglTexture&&
b.depthTexture.image.width===b.width&&b.depthTexture.image.height===b.height||(b.depthTexture.image.width=b.width,b.depthTexture.image.height=b.height,b.depthTexture.needsUpdate=!0);v(b.depthTexture,0);e=d.get(b.depthTexture).__webglTexture;if(1026===b.depthTexture.format)a.framebufferTexture2D(a.FRAMEBUFFER,a.DEPTH_ATTACHMENT,a.TEXTURE_2D,e,0);else if(1027===b.depthTexture.format)a.framebufferTexture2D(a.FRAMEBUFFER,a.DEPTH_STENCIL_ATTACHMENT,a.TEXTURE_2D,e,0);else throw Error("Unknown depthTexture format");
}else if(f)for(e.__webglDepthbuffer=[],f=0;6>f;f++)a.bindFramebuffer(a.FRAMEBUFFER,e.__webglFramebuffer[f]),e.__webglDepthbuffer[f]=a.createRenderbuffer(),w(e.__webglDepthbuffer[f],b);else a.bindFramebuffer(a.FRAMEBUFFER,e.__webglFramebuffer),e.__webglDepthbuffer=a.createRenderbuffer(),w(e.__webglDepthbuffer,b);a.bindFramebuffer(a.FRAMEBUFFER,null)}};this.updateRenderTargetMipmap=function(b){var e=b.texture,f=k(b);if(m(e,f)){f=b.isWebGLRenderTargetCube?a.TEXTURE_CUBE_MAP:a.TEXTURE_2D;var g=d.get(e).__webglTexture;
c.bindTexture(f,g);t(f,e,b.width,b.height);c.bindTexture(f,null)}}}function Ze(a,b,c){return{convert:function(d){if(1E3===d)return a.REPEAT;if(1001===d)return a.CLAMP_TO_EDGE;if(1002===d)return a.MIRRORED_REPEAT;if(1003===d)return a.NEAREST;if(1004===d)return a.NEAREST_MIPMAP_NEAREST;if(1005===d)return a.NEAREST_MIPMAP_LINEAR;if(1006===d)return a.LINEAR;if(1007===d)return a.LINEAR_MIPMAP_NEAREST;if(1008===d)return a.LINEAR_MIPMAP_LINEAR;if(1009===d)return a.UNSIGNED_BYTE;if(1017===d)return a.UNSIGNED_SHORT_4_4_4_4;
if(1018===d)return a.UNSIGNED_SHORT_5_5_5_1;if(1019===d)return a.UNSIGNED_SHORT_5_6_5;if(1010===d)return a.BYTE;if(1011===d)return a.SHORT;if(1012===d)return a.UNSIGNED_SHORT;if(1013===d)return a.INT;if(1014===d)return a.UNSIGNED_INT;if(1015===d)return a.FLOAT;if(1016===d){if(c.isWebGL2)return a.HALF_FLOAT;var e=b.get("OES_texture_half_float");if(null!==e)return e.HALF_FLOAT_OES}if(1021===d)return a.ALPHA;if(1022===d)return a.RGB;if(1023===d)return a.RGBA;if(1024===d)return a.LUMINANCE;if(1025===
d)return a.LUMINANCE_ALPHA;if(1026===d)return a.DEPTH_COMPONENT;if(1027===d)return a.DEPTH_STENCIL;if(100===d)return a.FUNC_ADD;if(101===d)return a.FUNC_SUBTRACT;if(102===d)return a.FUNC_REVERSE_SUBTRACT;if(200===d)return a.ZERO;if(201===d)return a.ONE;if(202===d)return a.SRC_COLOR;if(203===d)return a.ONE_MINUS_SRC_COLOR;if(204===d)return a.SRC_ALPHA;if(205===d)return a.ONE_MINUS_SRC_ALPHA;if(206===d)return a.DST_ALPHA;if(207===d)return a.ONE_MINUS_DST_ALPHA;if(208===d)return a.DST_COLOR;if(209===
d)return a.ONE_MINUS_DST_COLOR;if(210===d)return a.SRC_ALPHA_SATURATE;if(33776===d||33777===d||33778===d||33779===d)if(e=b.get("WEBGL_compressed_texture_s3tc"),null!==e){if(33776===d)return e.COMPRESSED_RGB_S3TC_DXT1_EXT;if(33777===d)return e.COMPRESSED_RGBA_S3TC_DXT1_EXT;if(33778===d)return e.COMPRESSED_RGBA_S3TC_DXT3_EXT;if(33779===d)return e.COMPRESSED_RGBA_S3TC_DXT5_EXT}if(35840===d||35841===d||35842===d||35843===d)if(e=b.get("WEBGL_compressed_texture_pvrtc"),null!==e){if(35840===d)return e.COMPRESSED_RGB_PVRTC_4BPPV1_IMG;
if(35841===d)return e.COMPRESSED_RGB_PVRTC_2BPPV1_IMG;if(35842===d)return e.COMPRESSED_RGBA_PVRTC_4BPPV1_IMG;if(35843===d)return e.COMPRESSED_RGBA_PVRTC_2BPPV1_IMG}if(36196===d&&(e=b.get("WEBGL_compressed_texture_etc1"),null!==e))return e.COMPRESSED_RGB_ETC1_WEBGL;if(37808===d||37809===d||37810===d||37811===d||37812===d||37813===d||37814===d||37815===d||37816===d||37817===d||37818===d||37819===d||37820===d||37821===d)if(e=b.get("WEBGL_compressed_texture_astc"),null!==e)return d;if(103===d||104===
d){if(c.isWebGL2){if(103===d)return a.MIN;if(104===d)return a.MAX}e=b.get("EXT_blend_minmax");if(null!==e){if(103===d)return e.MIN_EXT;if(104===d)return e.MAX_EXT}}if(1020===d){if(c.isWebGL2)return a.UNSIGNED_INT_24_8;e=b.get("WEBGL_depth_texture");if(null!==e)return e.UNSIGNED_INT_24_8_WEBGL}return 0}}}function Mb(){B.call(this);this.type="Group"}function X(a,b,c,d){Pa.call(this);this.type="PerspectiveCamera";this.fov=void 0!==a?a:50;this.zoom=1;this.near=void 0!==c?c:.1;this.far=void 0!==d?d:2E3;
this.focus=10;this.aspect=void 0!==b?b:1;this.view=null;this.filmGauge=35;this.filmOffset=0;this.updateProjectionMatrix()}function Ac(a){X.call(this);this.cameras=a||[]}function $e(a){function b(){return null!==e&&!0===e.isPresenting}function c(){if(b()){var c=e.getEyeParameters("left"),f=c.renderWidth;c=c.renderHeight;w=a.getPixelRatio();x=a.getSize();a.setDrawingBufferSize(2*f,c,1);D.start()}else d.enabled&&a.setDrawingBufferSize(x.width,x.height,w),D.stop()}var d=this,e=null,f=null,g=null,h=[],
k=new J,m=new J,t="stage";"undefined"!==typeof window&&"VRFrameData"in window&&(f=new window.VRFrameData,window.addEventListener("vrdisplaypresentchange",c,!1));var n=new J,q=new ha,u=new p,l=new X;l.bounds=new aa(0,0,.5,1);l.layers.enable(1);var v=new X;v.bounds=new aa(.5,0,.5,1);v.layers.enable(2);var y=new Ac([l,v]);y.layers.enable(1);y.layers.enable(2);var x,w,G=[];this.enabled=!1;this.getController=function(a){var b=h[a];void 0===b&&(b=new Mb,b.matrixAutoUpdate=!1,b.visible=!1,h[a]=b);return b};
this.getDevice=function(){return e};this.setDevice=function(a){void 0!==a&&(e=a);D.setContext(a)};this.setFrameOfReferenceType=function(a){t=a};this.setPoseTarget=function(a){void 0!==a&&(g=a)};this.getCamera=function(a){var b="stage"===t?1.6:0;if(null===e)return a.position.set(0,b,0),a;e.depthNear=a.near;e.depthFar=a.far;e.getFrameData(f);if("stage"===t){var c=e.stageParameters;c?k.fromArray(c.sittingToStandingTransform):k.makeTranslation(0,b,0)}b=f.pose;c=null!==g?g:a;c.matrix.copy(k);c.matrix.decompose(c.position,
c.quaternion,c.scale);null!==b.orientation&&(q.fromArray(b.orientation),c.quaternion.multiply(q));null!==b.position&&(q.setFromRotationMatrix(k),u.fromArray(b.position),u.applyQuaternion(q),c.position.add(u));c.updateMatrixWorld();if(!1===e.isPresenting)return a;l.near=a.near;v.near=a.near;l.far=a.far;v.far=a.far;y.matrixWorld.copy(a.matrixWorld);y.matrixWorldInverse.copy(a.matrixWorldInverse);l.matrixWorldInverse.fromArray(f.leftViewMatrix);v.matrixWorldInverse.fromArray(f.rightViewMatrix);m.getInverse(k);
"stage"===t&&(l.matrixWorldInverse.multiply(m),v.matrixWorldInverse.multiply(m));a=c.parent;null!==a&&(n.getInverse(a.matrixWorld),l.matrixWorldInverse.multiply(n),v.matrixWorldInverse.multiply(n));l.matrixWorld.getInverse(l.matrixWorldInverse);v.matrixWorld.getInverse(v.matrixWorldInverse);l.projectionMatrix.fromArray(f.leftProjectionMatrix);v.projectionMatrix.fromArray(f.rightProjectionMatrix);y.projectionMatrix.copy(l.projectionMatrix);a=e.getLayers();a.length&&(a=a[0],null!==a.leftBounds&&4===
a.leftBounds.length&&l.bounds.fromArray(a.leftBounds),null!==a.rightBounds&&4===a.rightBounds.length&&v.bounds.fromArray(a.rightBounds));a:for(a=0;a<h.length;a++){b=h[a];b:{c=a;for(var d=navigator.getGamepads&&navigator.getGamepads(),r=0,w=0,p=d.length;r<p;r++){var x=d[r];if(x&&("Daydream Controller"===x.id||"Gear VR Controller"===x.id||"Oculus Go Controller"===x.id||"OpenVR Gamepad"===x.id||x.id.startsWith("Oculus Touch")||x.id.startsWith("Spatial Controller"))){if(w===c){c=x;break b}w++}}c=void 0}if(void 0!==
c&&void 0!==c.pose){if(null===c.pose)break a;d=c.pose;!1===d.hasPosition&&b.position.set(.2,-.6,-.05);null!==d.position&&b.position.fromArray(d.position);null!==d.orientation&&b.quaternion.fromArray(d.orientation);b.matrix.compose(b.position,b.quaternion,b.scale);b.matrix.premultiply(k);b.matrix.decompose(b.position,b.quaternion,b.scale);b.matrixWorldNeedsUpdate=!0;b.visible=!0;d="Daydream Controller"===c.id?0:1;G[a]!==c.buttons[d].pressed&&(G[a]=c.buttons[d].pressed,!0===G[a]?b.dispatchEvent({type:"selectstart"}):
(b.dispatchEvent({type:"selectend"}),b.dispatchEvent({type:"select"})))}else b.visible=!1}return y};this.getStandingMatrix=function(){return k};this.isPresenting=b;var D=new Rd;this.setAnimationLoop=function(a){D.setAnimationLoop(a)};this.submitFrame=function(){b()&&e.submitFrame()};this.dispose=function(){"undefined"!==typeof window&&window.removeEventListener("vrdisplaypresentchange",c)}}function Kg(a){function b(){return null!==h&&null!==k}function c(a){var b=n[q.indexOf(a.inputSource)];b&&b.dispatchEvent({type:a.type})}
function d(){a.setFramebuffer(null);x.stop()}function e(a,b){null===b?a.matrixWorld.copy(a.matrix):a.matrixWorld.multiplyMatrices(b.matrixWorld,a.matrix);a.matrixWorldInverse.getInverse(a.matrixWorld)}var f=a.context,g=null,h=null,k=null,m="stage",t=null,n=[],q=[],l=new X;l.layers.enable(1);l.viewport=new aa;var r=new X;r.layers.enable(2);r.viewport=new aa;var v=new Ac([l,r]);v.layers.enable(1);v.layers.enable(2);this.enabled=!1;this.getController=function(a){var b=n[a];void 0===b&&(b=new Mb,b.matrixAutoUpdate=
!1,b.visible=!1,n[a]=b);return b};this.getDevice=function(){return g};this.setDevice=function(a){void 0!==a&&(g=a);a instanceof XRDevice&&f.setCompatibleXRDevice(a)};this.setFrameOfReferenceType=function(a){m=a};this.setSession=function(b){h=b;null!==h&&(h.addEventListener("select",c),h.addEventListener("selectstart",c),h.addEventListener("selectend",c),h.addEventListener("end",d),h.baseLayer=new XRWebGLLayer(h,f),h.requestFrameOfReference(m).then(function(b){k=b;a.setFramebuffer(h.baseLayer.framebuffer);
x.setContext(h);x.start()}),q=h.getInputSources(),h.addEventListener("inputsourceschange",function(){q=h.getInputSources();console.log(q)}))};this.getCamera=function(a){if(b()){var c=a.parent,d=v.cameras;e(v,c);for(var f=0;f<d.length;f++)e(d[f],c);a.matrixWorld.copy(v.matrixWorld);a=a.children;f=0;for(c=a.length;f<c;f++)a[f].updateMatrixWorld(!0);return v}return a};this.isPresenting=b;var p=null,x=new Rd;x.setAnimationLoop(function(a,b){t=b.getDevicePose(k);if(null!==t)for(var c=h.baseLayer,d=b.views,
e=0;e<d.length;e++){var f=d[e],g=c.getViewport(f),m=t.getViewMatrix(f),l=v.cameras[e];l.matrix.fromArray(m).getInverse(l.matrix);l.projectionMatrix.fromArray(f.projectionMatrix);l.viewport.set(g.x,g.y,g.width,g.height);0===e&&(v.matrix.copy(l.matrix),v.projectionMatrix.copy(l.projectionMatrix))}for(e=0;e<n.length;e++){c=n[e];if(d=q[e])if(d=b.getInputPose(d,k),null!==d){"targetRay"in d?c.matrix.elements=d.targetRay.transformMatrix:"pointerMatrix"in d&&(c.matrix.elements=d.pointerMatrix);c.matrix.decompose(c.position,
c.rotation,c.scale);c.visible=!0;continue}c.visible=!1}p&&p(a)});this.setAnimationLoop=function(a){p=a};this.dispose=function(){};this.getStandingMatrix=function(){console.warn("THREE.WebXRManager: getStandingMatrix() is no longer needed.");return new THREE.Matrix4};this.submitFrame=function(){}}function Yd(a){var b;function c(){ia=new Of(C);va=new Mf(C,ia,a);va.isWebGL2||(ia.get("WEBGL_depth_texture"),ia.get("OES_texture_float"),ia.get("OES_texture_half_float"),ia.get("OES_texture_half_float_linear"),
ia.get("OES_standard_derivatives"),ia.get("OES_element_index_uint"),ia.get("ANGLE_instanced_arrays"));ia.get("OES_texture_float_linear");ea=new Ze(C,ia,va);ca=new Ig(C,ia,ea,va);ca.scissor(zc.copy(ha).multiplyScalar(W));ca.viewport(T.copy(cb).multiplyScalar(W));da=new Rf(C);Ca=new zg;ja=new Jg(C,ia,ca,Ca,va,ea,da);qa=new Ef(C);sa=new Pf(C,qa,da);na=new Uf(sa,da);wa=new Tf(C);ma=new yg(P,ia,va);ta=new Dg;oa=new Hg;la=new Kf(P,ca,na,S);xa=new Lf(C,ia,da,va);za=new Qf(C,ia,da,va);da.programs=ma.programs;
P.context=C;P.capabilities=va;P.extensions=ia;P.properties=Ca;P.renderLists=ta;P.state=ca;P.info=da}function d(a){a.preventDefault();console.log("THREE.WebGLRenderer: Context Lost.");I=!0}function e(){console.log("THREE.WebGLRenderer: Context Restored.");I=!1;c()}function f(a){a=a.target;a.removeEventListener("dispose",f);g(a);Ca.remove(a)}function g(a){var b=Ca.get(a).program;a.program=void 0;void 0!==b&&ma.releaseProgram(b)}function h(a,b){a.render(function(a){P.renderBufferImmediate(a,b)})}function k(a,
b,c){if(!1!==a.visible){if(a.layers.test(b.layers))if(a.isLight)B.pushLight(a),a.castShadow&&B.pushShadow(a);else if(a.isSprite){if(!a.frustumCulled||pa.intersectsSprite(a)){c&&db.setFromMatrixPosition(a.matrixWorld).applyMatrix4(yc);var d=na.update(a),e=a.material;A.push(a,d,e,db.z,null)}}else if(a.isImmediateRenderObject)c&&db.setFromMatrixPosition(a.matrixWorld).applyMatrix4(yc),A.push(a,null,a.material,db.z,null);else if(a.isMesh||a.isLine||a.isPoints)if(a.isSkinnedMesh&&a.skeleton.update(),!a.frustumCulled||
pa.intersectsObject(a))if(c&&db.setFromMatrixPosition(a.matrixWorld).applyMatrix4(yc),d=na.update(a),e=a.material,Array.isArray(e))for(var f=d.groups,g=0,h=f.length;g<h;g++){var m=f[g],n=e[m.materialIndex];n&&n.visible&&A.push(a,d,n,db.z,m)}else e.visible&&A.push(a,d,e,db.z,null);a=a.children;g=0;for(h=a.length;g<h;g++)k(a[g],b,c)}}function m(a,b,c,d){for(var e=0,f=a.length;e<f;e++){var g=a[e],h=g.object,k=g.geometry,m=void 0===d?g.material:d;g=g.group;if(c.isArrayCamera){Z=c;for(var n=c.cameras,
q=0,l=n.length;q<l;q++){var u=n[q];if(h.layers.test(u.layers)){if("viewport"in u)ca.viewport(T.copy(u.viewport));else{var r=u.bounds;ca.viewport(T.set(r.x*X,r.y*N,r.z*X,r.w*N).multiplyScalar(W))}B.setupLights(u);t(h,b,u,k,m,g)}}}else Z=null,t(h,b,c,k,m,g)}}function t(a,c,d,e,f,g){a.onBeforeRender(P,c,d,e,f,g);B=oa.get(c,Z||d);a.modelViewMatrix.multiplyMatrices(d.matrixWorldInverse,a.matrixWorld);a.normalMatrix.getNormalMatrix(a.modelViewMatrix);if(a.isImmediateRenderObject){ca.setMaterial(f);var k=
q(d,c.fog,f,a);H=b=null;U=!1;h(a,k)}else P.renderBufferDirect(d,c.fog,e,f,a,g);a.onAfterRender(P,c,d,e,f,g);B=oa.get(c,Z||d)}function n(a,b,c){var d=Ca.get(a),e=B.state.lights,h=d.lightsHash,k=e.state.hash;c=ma.getParameters(a,e.state,B.state.shadowsArray,b,ba.numPlanes,ba.numIntersection,c);var m=ma.getProgramCode(a,c),n=d.program,t=!0;if(void 0===n)a.addEventListener("dispose",f);else if(n.code!==m)g(a);else{if(h.stateID!==k.stateID||h.directionalLength!==k.directionalLength||h.pointLength!==k.pointLength||
h.spotLength!==k.spotLength||h.rectAreaLength!==k.rectAreaLength||h.hemiLength!==k.hemiLength||h.shadowsLength!==k.shadowsLength)h.stateID=k.stateID,h.directionalLength=k.directionalLength,h.pointLength=k.pointLength,h.spotLength=k.spotLength,h.rectAreaLength=k.rectAreaLength,h.hemiLength=k.hemiLength,h.shadowsLength=k.shadowsLength;else if(void 0!==c.shaderID)return;t=!1}t&&(c.shaderID?(m=pb[c.shaderID],d.shader={name:a.type,uniforms:Ba.clone(m.uniforms),vertexShader:m.vertexShader,fragmentShader:m.fragmentShader}):
d.shader={name:a.type,uniforms:a.uniforms,vertexShader:a.vertexShader,fragmentShader:a.fragmentShader},a.onBeforeCompile(d.shader,P),m=ma.getProgramCode(a,c),n=ma.acquireProgram(a,d.shader,c,m),d.program=n,a.program=n);c=n.getAttributes();if(a.morphTargets)for(m=a.numSupportedMorphTargets=0;m<P.maxMorphTargets;m++)0<=c["morphTarget"+m]&&a.numSupportedMorphTargets++;if(a.morphNormals)for(m=a.numSupportedMorphNormals=0;m<P.maxMorphNormals;m++)0<=c["morphNormal"+m]&&a.numSupportedMorphNormals++;c=d.shader.uniforms;
if(!a.isShaderMaterial&&!a.isRawShaderMaterial||!0===a.clipping)d.numClippingPlanes=ba.numPlanes,d.numIntersection=ba.numIntersection,c.clippingPlanes=ba.uniform;d.fog=b;void 0===h&&(d.lightsHash=h={});h.stateID=k.stateID;h.directionalLength=k.directionalLength;h.pointLength=k.pointLength;h.spotLength=k.spotLength;h.rectAreaLength=k.rectAreaLength;h.hemiLength=k.hemiLength;h.shadowsLength=k.shadowsLength;a.lights&&(c.ambientLightColor.value=e.state.ambient,c.directionalLights.value=e.state.directional,
c.spotLights.value=e.state.spot,c.rectAreaLights.value=e.state.rectArea,c.pointLights.value=e.state.point,c.hemisphereLights.value=e.state.hemi,c.directionalShadowMap.value=e.state.directionalShadowMap,c.directionalShadowMatrix.value=e.state.directionalShadowMatrix,c.spotShadowMap.value=e.state.spotShadowMap,c.spotShadowMatrix.value=e.state.spotShadowMatrix,c.pointShadowMap.value=e.state.pointShadowMap,c.pointShadowMatrix.value=e.state.pointShadowMatrix);a=d.program.getUniforms();a=$a.seqWithValue(a.seq,
c);d.uniformsList=a}function q(a,b,c,d){fa=0;var e=Ca.get(c),f=e.lightsHash,g=B.state.lights.state.hash;qd&&(Xd||a!==V)&&ba.setState(c.clippingPlanes,c.clipIntersection,c.clipShadows,a,e,a===V&&c.id===Q);!1===c.needsUpdate&&(void 0===e.program?c.needsUpdate=!0:c.fog&&e.fog!==b?c.needsUpdate=!0:!c.lights||f.stateID===g.stateID&&f.directionalLength===g.directionalLength&&f.pointLength===g.pointLength&&f.spotLength===g.spotLength&&f.rectAreaLength===g.rectAreaLength&&f.hemiLength===g.hemiLength&&f.shadowsLength===
g.shadowsLength?void 0===e.numClippingPlanes||e.numClippingPlanes===ba.numPlanes&&e.numIntersection===ba.numIntersection||(c.needsUpdate=!0):c.needsUpdate=!0);c.needsUpdate&&(n(c,b,d),c.needsUpdate=!1);var h=!1,k=!1,m=!1;f=e.program;g=f.getUniforms();var t=e.shader.uniforms;ca.useProgram(f.program)&&(m=k=h=!0);c.id!==Q&&(Q=c.id,k=!0);if(h||V!==a){g.setValue(C,"projectionMatrix",a.projectionMatrix);va.logarithmicDepthBuffer&&g.setValue(C,"logDepthBufFC",2/(Math.log(a.far+1)/Math.LN2));V!==a&&(V=a,
m=k=!0);if(c.isShaderMaterial||c.isMeshPhongMaterial||c.isMeshStandardMaterial||c.envMap)h=g.map.cameraPosition,void 0!==h&&h.setValue(C,db.setFromMatrixPosition(a.matrixWorld));(c.isMeshPhongMaterial||c.isMeshLambertMaterial||c.isMeshBasicMaterial||c.isMeshStandardMaterial||c.isShaderMaterial||c.skinning)&&g.setValue(C,"viewMatrix",a.matrixWorldInverse)}if(c.skinning&&(g.setOptional(C,d,"bindMatrix"),g.setOptional(C,d,"bindMatrixInverse"),a=d.skeleton))if(h=a.bones,va.floatVertexTextures){if(void 0===
a.boneTexture){h=Math.sqrt(4*h.length);h=K.ceilPowerOfTwo(h);h=Math.max(h,4);var q=new Float32Array(h*h*4);q.set(a.boneMatrices);var u=new ib(q,h,h,1023,1015);u.needsUpdate=!0;a.boneMatrices=q;a.boneTexture=u;a.boneTextureSize=h}g.setValue(C,"boneTexture",a.boneTexture);g.setValue(C,"boneTextureSize",a.boneTextureSize)}else g.setOptional(C,a,"boneMatrices");k&&(g.setValue(C,"toneMappingExposure",P.toneMappingExposure),g.setValue(C,"toneMappingWhitePoint",P.toneMappingWhitePoint),c.lights&&(k=m,t.ambientLightColor.needsUpdate=
k,t.directionalLights.needsUpdate=k,t.pointLights.needsUpdate=k,t.spotLights.needsUpdate=k,t.rectAreaLights.needsUpdate=k,t.hemisphereLights.needsUpdate=k),b&&c.fog&&(t.fogColor.value=b.color,b.isFog?(t.fogNear.value=b.near,t.fogFar.value=b.far):b.isFogExp2&&(t.fogDensity.value=b.density)),c.isMeshBasicMaterial?l(t,c):c.isMeshLambertMaterial?(l(t,c),c.emissiveMap&&(t.emissiveMap.value=c.emissiveMap)):c.isMeshPhongMaterial?(l(t,c),c.isMeshToonMaterial?(r(t,c),c.gradientMap&&(t.gradientMap.value=c.gradientMap)):
r(t,c)):c.isMeshStandardMaterial?(l(t,c),c.isMeshPhysicalMaterial?(v(t,c),t.reflectivity.value=c.reflectivity,t.clearCoat.value=c.clearCoat,t.clearCoatRoughness.value=c.clearCoatRoughness):v(t,c)):c.isMeshDepthMaterial?(l(t,c),c.displacementMap&&(t.displacementMap.value=c.displacementMap,t.displacementScale.value=c.displacementScale,t.displacementBias.value=c.displacementBias)):c.isMeshDistanceMaterial?(l(t,c),c.displacementMap&&(t.displacementMap.value=c.displacementMap,t.displacementScale.value=
c.displacementScale,t.displacementBias.value=c.displacementBias),t.referencePosition.value.copy(c.referencePosition),t.nearDistance.value=c.nearDistance,t.farDistance.value=c.farDistance):c.isMeshNormalMaterial?(l(t,c),c.bumpMap&&(t.bumpMap.value=c.bumpMap,t.bumpScale.value=c.bumpScale,1===c.side&&(t.bumpScale.value*=-1)),c.normalMap&&(t.normalMap.value=c.normalMap,t.normalScale.value.copy(c.normalScale),1===c.side&&t.normalScale.value.negate()),c.displacementMap&&(t.displacementMap.value=c.displacementMap,
t.displacementScale.value=c.displacementScale,t.displacementBias.value=c.displacementBias)):c.isLineBasicMaterial?(t.diffuse.value=c.color,t.opacity.value=c.opacity,c.isLineDashedMaterial&&(t.dashSize.value=c.dashSize,t.totalSize.value=c.dashSize+c.gapSize,t.scale.value=c.scale)):c.isPointsMaterial?(t.diffuse.value=c.color,t.opacity.value=c.opacity,t.size.value=c.size*W,t.scale.value=.5*N,t.map.value=c.map,null!==c.map&&(!0===c.map.matrixAutoUpdate&&c.map.updateMatrix(),t.uvTransform.value.copy(c.map.matrix))):
c.isSpriteMaterial?(t.diffuse.value=c.color,t.opacity.value=c.opacity,t.rotation.value=c.rotation,t.map.value=c.map,null!==c.map&&(!0===c.map.matrixAutoUpdate&&c.map.updateMatrix(),t.uvTransform.value.copy(c.map.matrix))):c.isShadowMaterial&&(t.color.value=c.color,t.opacity.value=c.opacity),void 0!==t.ltc_1&&(t.ltc_1.value=R.LTC_1),void 0!==t.ltc_2&&(t.ltc_2.value=R.LTC_2),$a.upload(C,e.uniformsList,t,P));c.isShaderMaterial&&!0===c.uniformsNeedUpdate&&($a.upload(C,e.uniformsList,t,P),c.uniformsNeedUpdate=
!1);c.isSpriteMaterial&&g.setValue(C,"center",d.center);g.setValue(C,"modelViewMatrix",d.modelViewMatrix);g.setValue(C,"normalMatrix",d.normalMatrix);g.setValue(C,"modelMatrix",d.matrixWorld);return f}function l(a,b){a.opacity.value=b.opacity;b.color&&(a.diffuse.value=b.color);b.emissive&&a.emissive.value.copy(b.emissive).multiplyScalar(b.emissiveIntensity);b.map&&(a.map.value=b.map);b.alphaMap&&(a.alphaMap.value=b.alphaMap);b.specularMap&&(a.specularMap.value=b.specularMap);b.envMap&&(a.envMap.value=
b.envMap,a.flipEnvMap.value=b.envMap&&b.envMap.isCubeTexture?-1:1,a.reflectivity.value=b.reflectivity,a.refractionRatio.value=b.refractionRatio,a.maxMipLevel.value=Ca.get(b.envMap).__maxMipLevel);b.lightMap&&(a.lightMap.value=b.lightMap,a.lightMapIntensity.value=b.lightMapIntensity);b.aoMap&&(a.aoMap.value=b.aoMap,a.aoMapIntensity.value=b.aoMapIntensity);if(b.map)var c=b.map;else b.specularMap?c=b.specularMap:b.displacementMap?c=b.displacementMap:b.normalMap?c=b.normalMap:b.bumpMap?c=b.bumpMap:b.roughnessMap?
c=b.roughnessMap:b.metalnessMap?c=b.metalnessMap:b.alphaMap?c=b.alphaMap:b.emissiveMap&&(c=b.emissiveMap);void 0!==c&&(c.isWebGLRenderTarget&&(c=c.texture),!0===c.matrixAutoUpdate&&c.updateMatrix(),a.uvTransform.value.copy(c.matrix))}function r(a,b){a.specular.value=b.specular;a.shininess.value=Math.max(b.shininess,1E-4);b.emissiveMap&&(a.emissiveMap.value=b.emissiveMap);b.bumpMap&&(a.bumpMap.value=b.bumpMap,a.bumpScale.value=b.bumpScale,1===b.side&&(a.bumpScale.value*=-1));b.normalMap&&(a.normalMap.value=
b.normalMap,a.normalScale.value.copy(b.normalScale),1===b.side&&a.normalScale.value.negate());b.displacementMap&&(a.displacementMap.value=b.displacementMap,a.displacementScale.value=b.displacementScale,a.displacementBias.value=b.displacementBias)}function v(a,b){a.roughness.value=b.roughness;a.metalness.value=b.metalness;b.roughnessMap&&(a.roughnessMap.value=b.roughnessMap);b.metalnessMap&&(a.metalnessMap.value=b.metalnessMap);b.emissiveMap&&(a.emissiveMap.value=b.emissiveMap);b.bumpMap&&(a.bumpMap.value=
b.bumpMap,a.bumpScale.value=b.bumpScale,1===b.side&&(a.bumpScale.value*=-1));b.normalMap&&(a.normalMap.value=b.normalMap,a.normalScale.value.copy(b.normalScale),1===b.side&&a.normalScale.value.negate());b.displacementMap&&(a.displacementMap.value=b.displacementMap,a.displacementScale.value=b.displacementScale,a.displacementBias.value=b.displacementBias);b.envMap&&(a.envMapIntensity.value=b.envMapIntensity)}console.log("THREE.WebGLRenderer","96");a=a||{};var y=void 0!==a.canvas?a.canvas:document.createElementNS("http://www.w3.org/1999/xhtml",
"canvas"),x=void 0!==a.context?a.context:null,w=void 0!==a.alpha?a.alpha:!1,G=void 0!==a.depth?a.depth:!0,D=void 0!==a.stencil?a.stencil:!0,O=void 0!==a.antialias?a.antialias:!1,S=void 0!==a.premultipliedAlpha?a.premultipliedAlpha:!0,E=void 0!==a.preserveDrawingBuffer?a.preserveDrawingBuffer:!1,z=void 0!==a.powerPreference?a.powerPreference:"default",A=null,B=null;this.domElement=y;this.context=null;this.sortObjects=this.autoClearStencil=this.autoClearDepth=this.autoClearColor=this.autoClear=!0;this.clippingPlanes=
[];this.localClippingEnabled=!1;this.gammaFactor=2;this.physicallyCorrectLights=this.gammaOutput=this.gammaInput=!1;this.toneMappingWhitePoint=this.toneMappingExposure=this.toneMapping=1;this.maxMorphTargets=8;this.maxMorphNormals=4;var P=this,I=!1,F=null,L=null,M=null,Q=-1;var H=b=null;var U=!1;var V=null,Z=null,T=new aa,zc=new aa,Y=null,fa=0,X=y.width,N=y.height,W=1,cb=new aa(0,0,X,N),ha=new aa(0,0,X,N),ra=!1,pa=new od,ba=new Nf,qd=!1,Xd=!1,yc=new J,db=new p;try{w={alpha:w,depth:G,stencil:D,antialias:O,
premultipliedAlpha:S,preserveDrawingBuffer:E,powerPreference:z};y.addEventListener("webglcontextlost",d,!1);y.addEventListener("webglcontextrestored",e,!1);var C=x||y.getContext("webgl",w)||y.getContext("experimental-webgl",w);if(null===C){if(null!==y.getContext("webgl"))throw Error("Error creating WebGL context with your selected attributes.");throw Error("Error creating WebGL context.");}void 0===C.getShaderPrecisionFormat&&(C.getShaderPrecisionFormat=function(){return{rangeMin:1,rangeMax:1,precision:1}})}catch(Lg){console.error("THREE.WebGLRenderer: "+
Lg.message)}var ia,va,ca,da,Ca,ja,qa,sa,na,ma,ta,oa,la,wa,xa,za,ea;c();var ka="xr"in navigator?new Kg(P):new $e(P);this.vr=ka;var Aa=new Ye(P,na,va.maxTextureSize);this.shadowMap=Aa;this.getContext=function(){return C};this.getContextAttributes=function(){return C.getContextAttributes()};this.forceContextLoss=function(){var a=ia.get("WEBGL_lose_context");a&&a.loseContext()};this.forceContextRestore=function(){var a=ia.get("WEBGL_lose_context");a&&a.restoreContext()};this.getPixelRatio=function(){return W};
this.setPixelRatio=function(a){void 0!==a&&(W=a,this.setSize(X,N,!1))};this.getSize=function(){return{width:X,height:N}};this.setSize=function(a,b,c){ka.isPresenting()?console.warn("THREE.WebGLRenderer: Can't change size while VR device is presenting."):(X=a,N=b,y.width=a*W,y.height=b*W,!1!==c&&(y.style.width=a+"px",y.style.height=b+"px"),this.setViewport(0,0,a,b))};this.getDrawingBufferSize=function(){return{width:X*W,height:N*W}};this.setDrawingBufferSize=function(a,b,c){X=a;N=b;W=c;y.width=a*c;
y.height=b*c;this.setViewport(0,0,a,b)};this.getCurrentViewport=function(){return T};this.setViewport=function(a,b,c,d){cb.set(a,N-b-d,c,d);ca.viewport(T.copy(cb).multiplyScalar(W))};this.setScissor=function(a,b,c,d){ha.set(a,N-b-d,c,d);ca.scissor(zc.copy(ha).multiplyScalar(W))};this.setScissorTest=function(a){ca.setScissorTest(ra=a)};this.getClearColor=function(){return la.getClearColor()};this.setClearColor=function(){la.setClearColor.apply(la,arguments)};this.getClearAlpha=function(){return la.getClearAlpha()};
this.setClearAlpha=function(){la.setClearAlpha.apply(la,arguments)};this.clear=function(a,b,c){var d=0;if(void 0===a||a)d|=C.COLOR_BUFFER_BIT;if(void 0===b||b)d|=C.DEPTH_BUFFER_BIT;if(void 0===c||c)d|=C.STENCIL_BUFFER_BIT;C.clear(d)};this.clearColor=function(){this.clear(!0,!1,!1)};this.clearDepth=function(){this.clear(!1,!0,!1)};this.clearStencil=function(){this.clear(!1,!1,!0)};this.clearTarget=function(a,b,c,d){this.setRenderTarget(a);this.clear(b,c,d)};this.dispose=function(){y.removeEventListener("webglcontextlost",
d,!1);y.removeEventListener("webglcontextrestored",e,!1);ta.dispose();oa.dispose();Ca.dispose();na.dispose();ka.dispose();ua.stop()};this.renderBufferImmediate=function(a,b){ca.initAttributes();var c=Ca.get(a);a.hasPositions&&!c.position&&(c.position=C.createBuffer());a.hasNormals&&!c.normal&&(c.normal=C.createBuffer());a.hasUvs&&!c.uv&&(c.uv=C.createBuffer());a.hasColors&&!c.color&&(c.color=C.createBuffer());b=b.getAttributes();a.hasPositions&&(C.bindBuffer(C.ARRAY_BUFFER,c.position),C.bufferData(C.ARRAY_BUFFER,
a.positionArray,C.DYNAMIC_DRAW),ca.enableAttribute(b.position),C.vertexAttribPointer(b.position,3,C.FLOAT,!1,0,0));a.hasNormals&&(C.bindBuffer(C.ARRAY_BUFFER,c.normal),C.bufferData(C.ARRAY_BUFFER,a.normalArray,C.DYNAMIC_DRAW),ca.enableAttribute(b.normal),C.vertexAttribPointer(b.normal,3,C.FLOAT,!1,0,0));a.hasUvs&&(C.bindBuffer(C.ARRAY_BUFFER,c.uv),C.bufferData(C.ARRAY_BUFFER,a.uvArray,C.DYNAMIC_DRAW),ca.enableAttribute(b.uv),C.vertexAttribPointer(b.uv,2,C.FLOAT,!1,0,0));a.hasColors&&(C.bindBuffer(C.ARRAY_BUFFER,
c.color),C.bufferData(C.ARRAY_BUFFER,a.colorArray,C.DYNAMIC_DRAW),ca.enableAttribute(b.color),C.vertexAttribPointer(b.color,3,C.FLOAT,!1,0,0));ca.disableUnusedAttributes();C.drawArrays(C.TRIANGLES,0,a.count);a.count=0};this.renderBufferDirect=function(a,c,d,e,f,g){var h=f.isMesh&&0>f.normalMatrix.determinant();ca.setMaterial(e,h);var k=q(a,c,e,f),m=!1;if(b!==d.id||H!==k.id||U!==(!0===e.wireframe))b=d.id,H=k.id,U=!0===e.wireframe,m=!0;f.morphTargetInfluences&&(wa.update(f,d,e,k),m=!0);h=d.index;var t=
d.attributes.position;c=1;!0===e.wireframe&&(h=sa.getWireframeAttribute(d),c=2);a=xa;if(null!==h){var n=qa.get(h);a=za;a.setIndex(n)}if(m){if(d&&d.isInstancedBufferGeometry&!va.isWebGL2&&null===ia.get("ANGLE_instanced_arrays"))console.error("THREE.WebGLRenderer.setupVertexAttributes: using THREE.InstancedBufferGeometry but hardware does not support extension ANGLE_instanced_arrays.");else{ca.initAttributes();m=d.attributes;k=k.getAttributes();var l=e.defaultAttributeValues;for(O in k){var u=k[O];
if(0<=u){var r=m[O];if(void 0!==r){var v=r.normalized,p=r.itemSize,w=qa.get(r);if(void 0!==w){var y=w.buffer,x=w.type;w=w.bytesPerElement;if(r.isInterleavedBufferAttribute){var D=r.data,G=D.stride;r=r.offset;D&&D.isInstancedInterleavedBuffer?(ca.enableAttributeAndDivisor(u,D.meshPerAttribute),void 0===d.maxInstancedCount&&(d.maxInstancedCount=D.meshPerAttribute*D.count)):ca.enableAttribute(u);C.bindBuffer(C.ARRAY_BUFFER,y);C.vertexAttribPointer(u,p,x,v,G*w,r*w)}else r.isInstancedBufferAttribute?(ca.enableAttributeAndDivisor(u,
r.meshPerAttribute),void 0===d.maxInstancedCount&&(d.maxInstancedCount=r.meshPerAttribute*r.count)):ca.enableAttribute(u),C.bindBuffer(C.ARRAY_BUFFER,y),C.vertexAttribPointer(u,p,x,v,0,0)}}else if(void 0!==l&&(v=l[O],void 0!==v))switch(v.length){case 2:C.vertexAttrib2fv(u,v);break;case 3:C.vertexAttrib3fv(u,v);break;case 4:C.vertexAttrib4fv(u,v);break;default:C.vertexAttrib1fv(u,v)}}}ca.disableUnusedAttributes()}null!==h&&C.bindBuffer(C.ELEMENT_ARRAY_BUFFER,n.buffer)}n=Infinity;null!==h?n=h.count:
void 0!==t&&(n=t.count);h=d.drawRange.start*c;t=null!==g?g.start*c:0;var O=Math.max(h,t);g=Math.max(0,Math.min(n,h+d.drawRange.count*c,t+(null!==g?g.count*c:Infinity))-1-O+1);if(0!==g){if(f.isMesh)if(!0===e.wireframe)ca.setLineWidth(e.wireframeLinewidth*(null===L?W:1)),a.setMode(C.LINES);else switch(f.drawMode){case 0:a.setMode(C.TRIANGLES);break;case 1:a.setMode(C.TRIANGLE_STRIP);break;case 2:a.setMode(C.TRIANGLE_FAN)}else f.isLine?(e=e.linewidth,void 0===e&&(e=1),ca.setLineWidth(e*(null===L?W:1)),
f.isLineSegments?a.setMode(C.LINES):f.isLineLoop?a.setMode(C.LINE_LOOP):a.setMode(C.LINE_STRIP)):f.isPoints?a.setMode(C.POINTS):f.isSprite&&a.setMode(C.TRIANGLES);d&&d.isInstancedBufferGeometry?0<d.maxInstancedCount&&a.renderInstances(d,O,g):a.render(O,g)}};this.compile=function(a,b){B=oa.get(a,b);B.init();a.traverse(function(a){a.isLight&&(B.pushLight(a),a.castShadow&&B.pushShadow(a))});B.setupLights(b);a.traverse(function(b){if(b.material)if(Array.isArray(b.material))for(var c=0;c<b.material.length;c++)n(b.material[c],
a.fog,b);else n(b.material,a.fog,b)})};var ya=null,ua=new Rd;ua.setAnimationLoop(function(a){ka.isPresenting()||ya&&ya(a)});"undefined"!==typeof window&&ua.setContext(window);this.setAnimationLoop=function(a){ya=a;ka.setAnimationLoop(a);ua.start()};this.render=function(a,c,d,e){if(!c||!c.isCamera)console.error("THREE.WebGLRenderer.render: camera is not an instance of THREE.Camera.");else if(!I){H=b=null;U=!1;Q=-1;V=null;!0===a.autoUpdate&&a.updateMatrixWorld();null===c.parent&&c.updateMatrixWorld();
ka.enabled&&(c=ka.getCamera(c));B=oa.get(a,c);B.init();a.onBeforeRender(P,a,c,d);yc.multiplyMatrices(c.projectionMatrix,c.matrixWorldInverse);pa.setFromMatrix(yc);Xd=this.localClippingEnabled;qd=ba.init(this.clippingPlanes,Xd,c);A=ta.get(a,c);A.init();k(a,c,P.sortObjects);!0===P.sortObjects&&A.sort();qd&&ba.beginShadows();Aa.render(B.state.shadowsArray,a,c);B.setupLights(c);qd&&ba.endShadows();this.info.autoReset&&this.info.reset();void 0===d&&(d=null);this.setRenderTarget(d);la.render(A,a,c,e);e=
A.opaque;var f=A.transparent;if(a.overrideMaterial){var g=a.overrideMaterial;e.length&&m(e,a,c,g);f.length&&m(f,a,c,g)}else e.length&&m(e,a,c),f.length&&m(f,a,c);d&&ja.updateRenderTargetMipmap(d);ca.buffers.depth.setTest(!0);ca.buffers.depth.setMask(!0);ca.buffers.color.setMask(!0);ca.setPolygonOffset(!1);a.onAfterRender(P,a,c);ka.enabled&&ka.submitFrame();B=A=null}};this.allocTextureUnit=function(){var a=fa;a>=va.maxTextures&&console.warn("THREE.WebGLRenderer: Trying to use "+a+" texture units while this GPU supports only "+
va.maxTextures);fa+=1;return a};this.setTexture2D=function(){var a=!1;return function(b,c){b&&b.isWebGLRenderTarget&&(a||(console.warn("THREE.WebGLRenderer.setTexture2D: don't use render targets as textures. Use their .texture property instead."),a=!0),b=b.texture);ja.setTexture2D(b,c)}}();this.setTexture=function(){var a=!1;return function(b,c){a||(console.warn("THREE.WebGLRenderer: .setTexture is deprecated, use setTexture2D instead."),a=!0);ja.setTexture2D(b,c)}}();this.setTextureCube=function(){var a=
!1;return function(b,c){b&&b.isWebGLRenderTargetCube&&(a||(console.warn("THREE.WebGLRenderer.setTextureCube: don't use cube render targets as textures. Use their .texture property instead."),a=!0),b=b.texture);b&&b.isCubeTexture||Array.isArray(b.image)&&6===b.image.length?ja.setTextureCube(b,c):ja.setTextureCubeDynamic(b,c)}}();this.setFramebuffer=function(a){F=a};this.getRenderTarget=function(){return L};this.setRenderTarget=function(a){(L=a)&&void 0===Ca.get(a).__webglFramebuffer&&ja.setupRenderTarget(a);
var b=F,c=!1;a?(b=Ca.get(a).__webglFramebuffer,a.isWebGLRenderTargetCube&&(b=b[a.activeCubeFace],c=!0),T.copy(a.viewport),zc.copy(a.scissor),Y=a.scissorTest):(T.copy(cb).multiplyScalar(W),zc.copy(ha).multiplyScalar(W),Y=ra);M!==b&&(C.bindFramebuffer(C.FRAMEBUFFER,b),M=b);ca.viewport(T);ca.scissor(zc);ca.setScissorTest(Y);c&&(c=Ca.get(a.texture),C.framebufferTexture2D(C.FRAMEBUFFER,C.COLOR_ATTACHMENT0,C.TEXTURE_CUBE_MAP_POSITIVE_X+a.activeCubeFace,c.__webglTexture,a.activeMipMapLevel))};this.readRenderTargetPixels=
function(a,b,c,d,e,f){if(a&&a.isWebGLRenderTarget){var g=Ca.get(a).__webglFramebuffer;if(g){var h=!1;g!==M&&(C.bindFramebuffer(C.FRAMEBUFFER,g),h=!0);try{var k=a.texture,m=k.format,t=k.type;1023!==m&&ea.convert(m)!==C.getParameter(C.IMPLEMENTATION_COLOR_READ_FORMAT)?console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in RGBA or implementation defined format."):1009===t||ea.convert(t)===C.getParameter(C.IMPLEMENTATION_COLOR_READ_TYPE)||1015===t&&(va.isWebGL2||ia.get("OES_texture_float")||
ia.get("WEBGL_color_buffer_float"))||1016===t&&(va.isWebGL2?ia.get("EXT_color_buffer_float"):ia.get("EXT_color_buffer_half_float"))?C.checkFramebufferStatus(C.FRAMEBUFFER)===C.FRAMEBUFFER_COMPLETE?0<=b&&b<=a.width-d&&0<=c&&c<=a.height-e&&C.readPixels(b,c,d,e,ea.convert(m),ea.convert(t),f):console.error("THREE.WebGLRenderer.readRenderTargetPixels: readPixels from renderTarget failed. Framebuffer not complete."):console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in UnsignedByteType or implementation defined type.")}finally{h&&
C.bindFramebuffer(C.FRAMEBUFFER,M)}}}else console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.")};this.copyFramebufferToTexture=function(a,b,c){var d=b.image.width,e=b.image.height,f=ea.convert(b.format);this.setTexture2D(b,0);C.copyTexImage2D(C.TEXTURE_2D,c||0,f,a.x,a.y,d,e,0)};this.copyTextureToTexture=function(a,b,c,d){var e=b.image.width,f=b.image.height,g=ea.convert(c.format),h=ea.convert(c.type);this.setTexture2D(c,0);b.isDataTexture?C.texSubImage2D(C.TEXTURE_2D,
d||0,a.x,a.y,e,f,g,h,b.image.data):C.texSubImage2D(C.TEXTURE_2D,d||0,a.x,a.y,g,h,b.image)}}function Nb(a,b){this.name="";this.color=new F(a);this.density=void 0!==b?b:2.5E-4}function Ob(a,b,c){this.name="";this.color=new F(a);this.near=void 0!==b?b:1;this.far=void 0!==c?c:1E3}function rd(){B.call(this);this.type="Scene";this.overrideMaterial=this.fog=this.background=null;this.autoUpdate=!0}function qb(a,b){this.array=a;this.stride=b;this.count=void 0!==a?a.length/b:0;this.dynamic=!1;this.updateRange=
{offset:0,count:-1};this.version=0}function Bc(a,b,c,d){this.data=a;this.itemSize=b;this.offset=c;this.normalized=!0===d}function eb(a){H.call(this);this.type="SpriteMaterial";this.color=new F(16777215);this.map=null;this.rotation=0;this.sizeAttenuation=!0;this.lights=!1;this.transparent=!0;this.setValues(a)}function Cc(a){B.call(this);this.type="Sprite";if(void 0===Pb){Pb=new I;var b=new Float32Array([-.5,-.5,0,0,0,.5,-.5,0,1,0,.5,.5,0,1,1,-.5,.5,0,0,1]);b=new qb(b,5);Pb.setIndex([0,1,2,0,2,3]);
Pb.addAttribute("position",new Bc(b,3,0,!1));Pb.addAttribute("uv",new Bc(b,2,3,!1))}this.geometry=Pb;this.material=void 0!==a?a:new eb;this.center=new z(.5,.5)}function Dc(){B.call(this);this.type="LOD";Object.defineProperties(this,{levels:{enumerable:!0,value:[]}})}function Ec(a,b){a=a||[];this.bones=a.slice(0);this.boneMatrices=new Float32Array(16*this.bones.length);if(void 0===b)this.calculateInverses();else if(this.bones.length===b.length)this.boneInverses=b.slice(0);else for(console.warn("THREE.Skeleton boneInverses is the wrong length."),
this.boneInverses=[],a=0,b=this.bones.length;a<b;a++)this.boneInverses.push(new J)}function sd(){B.call(this);this.type="Bone"}function td(a,b){ta.call(this,a,b);this.type="SkinnedMesh";this.bindMode="attached";this.bindMatrix=new J;this.bindMatrixInverse=new J;a=this.initBones();a=new Ec(a);this.bind(a,this.matrixWorld);this.normalizeSkinWeights()}function V(a){H.call(this);this.type="LineBasicMaterial";this.color=new F(16777215);this.linewidth=1;this.linejoin=this.linecap="round";this.lights=!1;
this.setValues(a)}function oa(a,b,c){1===c&&console.error("THREE.Line: parameter THREE.LinePieces no longer supported. Use THREE.LineSegments instead.");B.call(this);this.type="Line";this.geometry=void 0!==a?a:new I;this.material=void 0!==b?b:new V({color:16777215*Math.random()})}function Z(a,b){oa.call(this,a,b);this.type="LineSegments"}function ud(a,b){oa.call(this,a,b);this.type="LineLoop"}function Fa(a){H.call(this);this.type="PointsMaterial";this.color=new F(16777215);this.map=null;this.size=
1;this.sizeAttenuation=!0;this.lights=this.morphTargets=!1;this.setValues(a)}function Qb(a,b){B.call(this);this.type="Points";this.geometry=void 0!==a?a:new I;this.material=void 0!==b?b:new Fa({color:16777215*Math.random()})}function Zd(a,b,c,d,e,f,g,h,k){T.call(this,a,b,c,d,e,f,g,h,k);this.generateMipmaps=!1}function Rb(a,b,c,d,e,f,g,h,k,m,t,n){T.call(this,null,f,g,h,k,m,d,e,t,n);this.image={width:b,height:c};this.mipmaps=a;this.generateMipmaps=this.flipY=!1}function Fc(a,b,c,d,e,f,g,h,k){T.call(this,
a,b,c,d,e,f,g,h,k);this.needsUpdate=!0}function Gc(a,b,c,d,e,f,g,h,k,m){m=void 0!==m?m:1026;if(1026!==m&&1027!==m)throw Error("DepthTexture format must be either THREE.DepthFormat or THREE.DepthStencilFormat");void 0===c&&1026===m&&(c=1012);void 0===c&&1027===m&&(c=1020);T.call(this,null,d,e,f,g,h,m,c,k);this.image={width:a,height:b};this.magFilter=void 0!==g?g:1003;this.minFilter=void 0!==h?h:1003;this.generateMipmaps=this.flipY=!1}function Sb(a){I.call(this);this.type="WireframeGeometry";var b=
[],c,d,e,f=[0,0],g={},h=["a","b","c"];if(a&&a.isGeometry){var k=a.faces;var m=0;for(d=k.length;m<d;m++){var t=k[m];for(c=0;3>c;c++){var n=t[h[c]];var q=t[h[(c+1)%3]];f[0]=Math.min(n,q);f[1]=Math.max(n,q);n=f[0]+","+f[1];void 0===g[n]&&(g[n]={index1:f[0],index2:f[1]})}}for(n in g)m=g[n],h=a.vertices[m.index1],b.push(h.x,h.y,h.z),h=a.vertices[m.index2],b.push(h.x,h.y,h.z)}else if(a&&a.isBufferGeometry)if(h=new p,null!==a.index){k=a.attributes.position;t=a.index;var l=a.groups;0===l.length&&(l=[{start:0,
count:t.count,materialIndex:0}]);a=0;for(e=l.length;a<e;++a)for(m=l[a],c=m.start,d=m.count,m=c,d=c+d;m<d;m+=3)for(c=0;3>c;c++)n=t.getX(m+c),q=t.getX(m+(c+1)%3),f[0]=Math.min(n,q),f[1]=Math.max(n,q),n=f[0]+","+f[1],void 0===g[n]&&(g[n]={index1:f[0],index2:f[1]});for(n in g)m=g[n],h.fromBufferAttribute(k,m.index1),b.push(h.x,h.y,h.z),h.fromBufferAttribute(k,m.index2),b.push(h.x,h.y,h.z)}else for(k=a.attributes.position,m=0,d=k.count/3;m<d;m++)for(c=0;3>c;c++)g=3*m+c,h.fromBufferAttribute(k,g),b.push(h.x,
h.y,h.z),g=3*m+(c+1)%3,h.fromBufferAttribute(k,g),b.push(h.x,h.y,h.z);this.addAttribute("position",new A(b,3))}function Hc(a,b,c){M.call(this);this.type="ParametricGeometry";this.parameters={func:a,slices:b,stacks:c};this.fromBufferGeometry(new Tb(a,b,c));this.mergeVertices()}function Tb(a,b,c){I.call(this);this.type="ParametricBufferGeometry";this.parameters={func:a,slices:b,stacks:c};var d=[],e=[],f=[],g=[],h=new p,k=new p,m=new p,t=new p,n=new p,q,l;3>a.length&&console.error("THREE.ParametricGeometry: Function must now modify a Vector3 as third parameter.");
var r=b+1;for(q=0;q<=c;q++){var v=q/c;for(l=0;l<=b;l++){var y=l/b;a(y,v,k);e.push(k.x,k.y,k.z);0<=y-1E-5?(a(y-1E-5,v,m),t.subVectors(k,m)):(a(y+1E-5,v,m),t.subVectors(m,k));0<=v-1E-5?(a(y,v-1E-5,m),n.subVectors(k,m)):(a(y,v+1E-5,m),n.subVectors(m,k));h.crossVectors(t,n).normalize();f.push(h.x,h.y,h.z);g.push(y,v)}}for(q=0;q<c;q++)for(l=0;l<b;l++)a=q*r+l+1,h=(q+1)*r+l+1,k=(q+1)*r+l,d.push(q*r+l,a,k),d.push(a,h,k);this.setIndex(d);this.addAttribute("position",new A(e,3));this.addAttribute("normal",
new A(f,3));this.addAttribute("uv",new A(g,2))}function Ic(a,b,c,d){M.call(this);this.type="PolyhedronGeometry";this.parameters={vertices:a,indices:b,radius:c,detail:d};this.fromBufferGeometry(new la(a,b,c,d));this.mergeVertices()}function la(a,b,c,d){function e(a){h.push(a.x,a.y,a.z)}function f(b,c){b*=3;c.x=a[b+0];c.y=a[b+1];c.z=a[b+2]}function g(a,b,c,d){0>d&&1===a.x&&(k[b]=a.x-1);0===c.x&&0===c.z&&(k[b]=d/2/Math.PI+.5)}I.call(this);this.type="PolyhedronBufferGeometry";this.parameters={vertices:a,
indices:b,radius:c,detail:d};c=c||1;d=d||0;var h=[],k=[];(function(a){for(var c=new p,d=new p,g=new p,h=0;h<b.length;h+=3){f(b[h+0],c);f(b[h+1],d);f(b[h+2],g);var k,m,l=c,x=d,w=g,G=Math.pow(2,a),D=[];for(m=0;m<=G;m++){D[m]=[];var O=l.clone().lerp(w,m/G),z=x.clone().lerp(w,m/G),E=G-m;for(k=0;k<=E;k++)D[m][k]=0===k&&m===G?O:O.clone().lerp(z,k/E)}for(m=0;m<G;m++)for(k=0;k<2*(G-m)-1;k++)l=Math.floor(k/2),0===k%2?(e(D[m][l+1]),e(D[m+1][l]),e(D[m][l])):(e(D[m][l+1]),e(D[m+1][l+1]),e(D[m+1][l]))}})(d);(function(a){for(var b=
new p,c=0;c<h.length;c+=3)b.x=h[c+0],b.y=h[c+1],b.z=h[c+2],b.normalize().multiplyScalar(a),h[c+0]=b.x,h[c+1]=b.y,h[c+2]=b.z})(c);(function(){for(var a=new p,b=0;b<h.length;b+=3)a.x=h[b+0],a.y=h[b+1],a.z=h[b+2],k.push(Math.atan2(a.z,-a.x)/2/Math.PI+.5,1-(Math.atan2(-a.y,Math.sqrt(a.x*a.x+a.z*a.z))/Math.PI+.5));a=new p;b=new p;for(var c=new p,d=new p,e=new z,f=new z,l=new z,y=0,x=0;y<h.length;y+=9,x+=6){a.set(h[y+0],h[y+1],h[y+2]);b.set(h[y+3],h[y+4],h[y+5]);c.set(h[y+6],h[y+7],h[y+8]);e.set(k[x+0],
k[x+1]);f.set(k[x+2],k[x+3]);l.set(k[x+4],k[x+5]);d.copy(a).add(b).add(c).divideScalar(3);var w=Math.atan2(d.z,-d.x);g(e,x+0,a,w);g(f,x+2,b,w);g(l,x+4,c,w)}for(a=0;a<k.length;a+=6)b=k[a+0],c=k[a+2],d=k[a+4],e=Math.min(b,c,d),.9<Math.max(b,c,d)&&.1>e&&(.2>b&&(k[a+0]+=1),.2>c&&(k[a+2]+=1),.2>d&&(k[a+4]+=1))})();this.addAttribute("position",new A(h,3));this.addAttribute("normal",new A(h.slice(),3));this.addAttribute("uv",new A(k,2));0===d?this.computeVertexNormals():this.normalizeNormals()}function Jc(a,
b){M.call(this);this.type="TetrahedronGeometry";this.parameters={radius:a,detail:b};this.fromBufferGeometry(new Ub(a,b));this.mergeVertices()}function Ub(a,b){la.call(this,[1,1,1,-1,-1,1,-1,1,-1,1,-1,-1],[2,1,0,0,3,2,1,3,0,2,3,1],a,b);this.type="TetrahedronBufferGeometry";this.parameters={radius:a,detail:b}}function Kc(a,b){M.call(this);this.type="OctahedronGeometry";this.parameters={radius:a,detail:b};this.fromBufferGeometry(new rb(a,b));this.mergeVertices()}function rb(a,b){la.call(this,[1,0,0,
-1,0,0,0,1,0,0,-1,0,0,0,1,0,0,-1],[0,2,4,0,4,3,0,3,5,0,5,2,1,2,5,1,5,3,1,3,4,1,4,2],a,b);this.type="OctahedronBufferGeometry";this.parameters={radius:a,detail:b}}function Lc(a,b){M.call(this);this.type="IcosahedronGeometry";this.parameters={radius:a,detail:b};this.fromBufferGeometry(new Vb(a,b));this.mergeVertices()}function Vb(a,b){var c=(1+Math.sqrt(5))/2;la.call(this,[-1,c,0,1,c,0,-1,-c,0,1,-c,0,0,-1,c,0,1,c,0,-1,-c,0,1,-c,c,0,-1,c,0,1,-c,0,-1,-c,0,1],[0,11,5,0,5,1,0,1,7,0,7,10,0,10,11,1,5,9,5,
11,4,11,10,2,10,7,6,7,1,8,3,9,4,3,4,2,3,2,6,3,6,8,3,8,9,4,9,5,2,4,11,6,2,10,8,6,7,9,8,1],a,b);this.type="IcosahedronBufferGeometry";this.parameters={radius:a,detail:b}}function Mc(a,b){M.call(this);this.type="DodecahedronGeometry";this.parameters={radius:a,detail:b};this.fromBufferGeometry(new Wb(a,b));this.mergeVertices()}function Wb(a,b){var c=(1+Math.sqrt(5))/2,d=1/c;la.call(this,[-1,-1,-1,-1,-1,1,-1,1,-1,-1,1,1,1,-1,-1,1,-1,1,1,1,-1,1,1,1,0,-d,-c,0,-d,c,0,d,-c,0,d,c,-d,-c,0,-d,c,0,d,-c,0,d,c,
0,-c,0,-d,c,0,-d,-c,0,d,c,0,d],[3,11,7,3,7,15,3,15,13,7,19,17,7,17,6,7,6,15,17,4,8,17,8,10,17,10,6,8,0,16,8,16,2,8,2,10,0,12,1,0,1,18,0,18,16,6,10,2,6,2,13,6,13,15,2,16,18,2,18,3,2,3,13,18,1,9,18,9,11,18,11,3,4,14,12,4,12,0,4,0,8,11,9,5,11,5,19,11,19,7,19,5,14,19,14,4,19,4,17,1,12,14,1,14,5,1,5,9],a,b);this.type="DodecahedronBufferGeometry";this.parameters={radius:a,detail:b}}function Nc(a,b,c,d,e,f){M.call(this);this.type="TubeGeometry";this.parameters={path:a,tubularSegments:b,radius:c,radialSegments:d,
closed:e};void 0!==f&&console.warn("THREE.TubeGeometry: taper has been removed.");a=new Xb(a,b,c,d,e);this.tangents=a.tangents;this.normals=a.normals;this.binormals=a.binormals;this.fromBufferGeometry(a);this.mergeVertices()}function Xb(a,b,c,d,e){function f(e){t=a.getPointAt(e/b,t);var f=g.normals[e];e=g.binormals[e];for(q=0;q<=d;q++){var m=q/d*Math.PI*2,n=Math.sin(m);m=-Math.cos(m);k.x=m*f.x+n*e.x;k.y=m*f.y+n*e.y;k.z=m*f.z+n*e.z;k.normalize();r.push(k.x,k.y,k.z);h.x=t.x+c*k.x;h.y=t.y+c*k.y;h.z=
t.z+c*k.z;l.push(h.x,h.y,h.z)}}I.call(this);this.type="TubeBufferGeometry";this.parameters={path:a,tubularSegments:b,radius:c,radialSegments:d,closed:e};b=b||64;c=c||1;d=d||8;e=e||!1;var g=a.computeFrenetFrames(b,e);this.tangents=g.tangents;this.normals=g.normals;this.binormals=g.binormals;var h=new p,k=new p,m=new z,t=new p,n,q,l=[],r=[],v=[],y=[];for(n=0;n<b;n++)f(n);f(!1===e?b:0);for(n=0;n<=b;n++)for(q=0;q<=d;q++)m.x=n/b,m.y=q/d,v.push(m.x,m.y);(function(){for(q=1;q<=b;q++)for(n=1;n<=d;n++){var a=
(d+1)*q+(n-1),c=(d+1)*q+n,e=(d+1)*(q-1)+n;y.push((d+1)*(q-1)+(n-1),a,e);y.push(a,c,e)}})();this.setIndex(y);this.addAttribute("position",new A(l,3));this.addAttribute("normal",new A(r,3));this.addAttribute("uv",new A(v,2))}function Oc(a,b,c,d,e,f,g){M.call(this);this.type="TorusKnotGeometry";this.parameters={radius:a,tube:b,tubularSegments:c,radialSegments:d,p:e,q:f};void 0!==g&&console.warn("THREE.TorusKnotGeometry: heightScale has been deprecated. Use .scale( x, y, z ) instead.");this.fromBufferGeometry(new Yb(a,
b,c,d,e,f));this.mergeVertices()}function Yb(a,b,c,d,e,f){function g(a,b,c,d,e){var f=Math.sin(a);b=c/b*a;c=Math.cos(b);e.x=d*(2+c)*.5*Math.cos(a);e.y=d*(2+c)*f*.5;e.z=d*Math.sin(b)*.5}I.call(this);this.type="TorusKnotBufferGeometry";this.parameters={radius:a,tube:b,tubularSegments:c,radialSegments:d,p:e,q:f};a=a||1;b=b||.4;c=Math.floor(c)||64;d=Math.floor(d)||8;e=e||2;f=f||3;var h=[],k=[],m=[],t=[],n,q=new p,l=new p,r=new p,v=new p,y=new p,x=new p,w=new p;for(n=0;n<=c;++n){var G=n/c*e*Math.PI*2;
g(G,e,f,a,r);g(G+.01,e,f,a,v);x.subVectors(v,r);w.addVectors(v,r);y.crossVectors(x,w);w.crossVectors(y,x);y.normalize();w.normalize();for(G=0;G<=d;++G){var D=G/d*Math.PI*2,O=-b*Math.cos(D);D=b*Math.sin(D);q.x=r.x+(O*w.x+D*y.x);q.y=r.y+(O*w.y+D*y.y);q.z=r.z+(O*w.z+D*y.z);k.push(q.x,q.y,q.z);l.subVectors(q,r).normalize();m.push(l.x,l.y,l.z);t.push(n/c);t.push(G/d)}}for(G=1;G<=c;G++)for(n=1;n<=d;n++)a=(d+1)*G+(n-1),b=(d+1)*G+n,e=(d+1)*(G-1)+n,h.push((d+1)*(G-1)+(n-1),a,e),h.push(a,b,e);this.setIndex(h);
this.addAttribute("position",new A(k,3));this.addAttribute("normal",new A(m,3));this.addAttribute("uv",new A(t,2))}function Pc(a,b,c,d,e){M.call(this);this.type="TorusGeometry";this.parameters={radius:a,tube:b,radialSegments:c,tubularSegments:d,arc:e};this.fromBufferGeometry(new Zb(a,b,c,d,e));this.mergeVertices()}function Zb(a,b,c,d,e){I.call(this);this.type="TorusBufferGeometry";this.parameters={radius:a,tube:b,radialSegments:c,tubularSegments:d,arc:e};a=a||1;b=b||.4;c=Math.floor(c)||8;d=Math.floor(d)||
6;e=e||2*Math.PI;var f=[],g=[],h=[],k=[],m=new p,t=new p,n=new p,q,l;for(q=0;q<=c;q++)for(l=0;l<=d;l++){var r=l/d*e,v=q/c*Math.PI*2;t.x=(a+b*Math.cos(v))*Math.cos(r);t.y=(a+b*Math.cos(v))*Math.sin(r);t.z=b*Math.sin(v);g.push(t.x,t.y,t.z);m.x=a*Math.cos(r);m.y=a*Math.sin(r);n.subVectors(t,m).normalize();h.push(n.x,n.y,n.z);k.push(l/d);k.push(q/c)}for(q=1;q<=c;q++)for(l=1;l<=d;l++)a=(d+1)*(q-1)+l-1,b=(d+1)*(q-1)+l,e=(d+1)*q+l,f.push((d+1)*q+l-1,a,e),f.push(a,b,e);this.setIndex(f);this.addAttribute("position",
new A(g,3));this.addAttribute("normal",new A(h,3));this.addAttribute("uv",new A(k,2))}function af(a,b,c,d,e){for(var f,g=0,h=b,k=c-d;h<c;h+=d)g+=(a[k]-a[h])*(a[h+1]+a[k+1]),k=h;if(e===0<g)for(e=b;e<c;e+=d)f=bf(e,a[e],a[e+1],f);else for(e=c-d;e>=b;e-=d)f=bf(e,a[e],a[e+1],f);f&&sb(f,f.next)&&(Qc(f),f=f.next);return f}function Rc(a,b){if(!a)return a;b||(b=a);do{var c=!1;if(a.steiner||!sb(a,a.next)&&0!==ma(a.prev,a,a.next))a=a.next;else{Qc(a);a=b=a.prev;if(a===a.next)break;c=!0}}while(c||a!==b);return b}
function Sc(a,b,c,d,e,f,g){if(a){if(!g&&f){var h=a,k=h;do null===k.z&&(k.z=$d(k.x,k.y,d,e,f)),k.prevZ=k.prev,k=k.nextZ=k.next;while(k!==h);k.prevZ.nextZ=null;k.prevZ=null;h=k;var m,t,n,l,u=1;do{k=h;var r=h=null;for(t=0;k;){t++;var v=k;for(m=n=0;m<u&&(n++,v=v.nextZ,v);m++);for(l=u;0<n||0<l&&v;)0!==n&&(0===l||!v||k.z<=v.z)?(m=k,k=k.nextZ,n--):(m=v,v=v.nextZ,l--),r?r.nextZ=m:h=m,m.prevZ=r,r=m;k=v}r.nextZ=null;u*=2}while(1<t)}for(h=a;a.prev!==a.next;){k=a.prev;v=a.next;if(f)a:{r=a;l=d;var p=e,x=f;t=r.prev;
n=r;u=r.next;if(0<=ma(t,n,u))r=!1;else{var w=t.x>n.x?t.x>u.x?t.x:u.x:n.x>u.x?n.x:u.x,G=t.y>n.y?t.y>u.y?t.y:u.y:n.y>u.y?n.y:u.y;m=$d(t.x<n.x?t.x<u.x?t.x:u.x:n.x<u.x?n.x:u.x,t.y<n.y?t.y<u.y?t.y:u.y:n.y<u.y?n.y:u.y,l,p,x);l=$d(w,G,l,p,x);for(p=r.nextZ;p&&p.z<=l;){if(p!==r.prev&&p!==r.next&&vd(t.x,t.y,n.x,n.y,u.x,u.y,p.x,p.y)&&0<=ma(p.prev,p,p.next)){r=!1;break a}p=p.nextZ}for(p=r.prevZ;p&&p.z>=m;){if(p!==r.prev&&p!==r.next&&vd(t.x,t.y,n.x,n.y,u.x,u.y,p.x,p.y)&&0<=ma(p.prev,p,p.next)){r=!1;break a}p=
p.prevZ}r=!0}}else a:if(r=a,t=r.prev,n=r,u=r.next,0<=ma(t,n,u))r=!1;else{for(m=r.next.next;m!==r.prev;){if(vd(t.x,t.y,n.x,n.y,u.x,u.y,m.x,m.y)&&0<=ma(m.prev,m,m.next)){r=!1;break a}m=m.next}r=!0}if(r)b.push(k.i/c),b.push(a.i/c),b.push(v.i/c),Qc(a),h=a=v.next;else if(a=v,a===h){if(!g)Sc(Rc(a),b,c,d,e,f,1);else if(1===g){g=b;h=c;k=a;do v=k.prev,r=k.next.next,!sb(v,r)&&cf(v,k,k.next,r)&&Tc(v,r)&&Tc(r,v)&&(g.push(v.i/h),g.push(k.i/h),g.push(r.i/h),Qc(k),Qc(k.next),k=a=r),k=k.next;while(k!==a);a=k;Sc(a,
b,c,d,e,f,2)}else if(2===g)a:{g=a;do{for(h=g.next.next;h!==g.prev;){if(k=g.i!==h.i){k=g;v=h;if(r=k.next.i!==v.i&&k.prev.i!==v.i){b:{r=k;do{if(r.i!==k.i&&r.next.i!==k.i&&r.i!==v.i&&r.next.i!==v.i&&cf(r,r.next,k,v)){r=!0;break b}r=r.next}while(r!==k);r=!1}r=!r}if(r=r&&Tc(k,v)&&Tc(v,k)){r=k;t=!1;n=(k.x+v.x)/2;v=(k.y+v.y)/2;do r.y>v!==r.next.y>v&&r.next.y!==r.y&&n<(r.next.x-r.x)*(v-r.y)/(r.next.y-r.y)+r.x&&(t=!t),r=r.next;while(r!==k);r=t}k=r}if(k){a=df(g,h);g=Rc(g,g.next);a=Rc(a,a.next);Sc(g,b,c,d,e,
f);Sc(a,b,c,d,e,f);break a}h=h.next}g=g.next}while(g!==a)}break}}}}function Mg(a,b){return a.x-b.x}function Ng(a,b){var c=b,d=a.x,e=a.y,f=-Infinity;do{if(e<=c.y&&e>=c.next.y&&c.next.y!==c.y){var g=c.x+(e-c.y)*(c.next.x-c.x)/(c.next.y-c.y);if(g<=d&&g>f){f=g;if(g===d){if(e===c.y)return c;if(e===c.next.y)return c.next}var h=c.x<c.next.x?c:c.next}}c=c.next}while(c!==b);if(!h)return null;if(d===f)return h.prev;b=h;g=h.x;var k=h.y,m=Infinity;for(c=h.next;c!==b;){if(d>=c.x&&c.x>=g&&d!==c.x&&vd(e<k?d:f,e,
g,k,e<k?f:d,e,c.x,c.y)){var t=Math.abs(e-c.y)/(d-c.x);(t<m||t===m&&c.x>h.x)&&Tc(c,a)&&(h=c,m=t)}c=c.next}return h}function $d(a,b,c,d,e){a=32767*(a-c)*e;b=32767*(b-d)*e;a=(a|a<<8)&16711935;a=(a|a<<4)&252645135;a=(a|a<<2)&858993459;b=(b|b<<8)&16711935;b=(b|b<<4)&252645135;b=(b|b<<2)&858993459;return(a|a<<1)&1431655765|((b|b<<1)&1431655765)<<1}function Og(a){var b=a,c=a;do b.x<c.x&&(c=b),b=b.next;while(b!==a);return c}function vd(a,b,c,d,e,f,g,h){return 0<=(e-g)*(b-h)-(a-g)*(f-h)&&0<=(a-g)*(d-h)-(c-
g)*(b-h)&&0<=(c-g)*(f-h)-(e-g)*(d-h)}function ma(a,b,c){return(b.y-a.y)*(c.x-b.x)-(b.x-a.x)*(c.y-b.y)}function sb(a,b){return a.x===b.x&&a.y===b.y}function cf(a,b,c,d){return sb(a,b)&&sb(c,d)||sb(a,d)&&sb(c,b)?!0:0<ma(a,b,c)!==0<ma(a,b,d)&&0<ma(c,d,a)!==0<ma(c,d,b)}function Tc(a,b){return 0>ma(a.prev,a,a.next)?0<=ma(a,b,a.next)&&0<=ma(a,a.prev,b):0>ma(a,b,a.prev)||0>ma(a,a.next,b)}function df(a,b){var c=new ae(a.i,a.x,a.y),d=new ae(b.i,b.x,b.y),e=a.next,f=b.prev;a.next=b;b.prev=a;c.next=e;e.prev=
c;d.next=c;c.prev=d;f.next=d;d.prev=f;return d}function bf(a,b,c,d){a=new ae(a,b,c);d?(a.next=d.next,a.prev=d,d.next.prev=a,d.next=a):(a.prev=a,a.next=a);return a}function Qc(a){a.next.prev=a.prev;a.prev.next=a.next;a.prevZ&&(a.prevZ.nextZ=a.nextZ);a.nextZ&&(a.nextZ.prevZ=a.prevZ)}function ae(a,b,c){this.i=a;this.x=b;this.y=c;this.nextZ=this.prevZ=this.z=this.next=this.prev=null;this.steiner=!1}function ef(a){var b=a.length;2<b&&a[b-1].equals(a[0])&&a.pop()}function ff(a,b){for(var c=0;c<b.length;c++)a.push(b[c].x),
a.push(b[c].y)}function tb(a,b){M.call(this);this.type="ExtrudeGeometry";this.parameters={shapes:a,options:b};this.fromBufferGeometry(new Qa(a,b));this.mergeVertices()}function Qa(a,b){function c(a){function c(a,b,c){b||console.error("THREE.ExtrudeGeometry: vec does not exist");return b.clone().multiplyScalar(c).add(a)}function g(a,b,c){var d=a.x-b.x;var e=a.y-b.y;var f=c.x-a.x;var g=c.y-a.y,h=d*d+e*e;if(Math.abs(d*g-e*f)>Number.EPSILON){var k=Math.sqrt(h),m=Math.sqrt(f*f+g*g);h=b.x-e/k;b=b.y+d/k;
g=((c.x-g/m-h)*g-(c.y+f/m-b)*f)/(d*g-e*f);f=h+d*g-a.x;d=b+e*g-a.y;e=f*f+d*d;if(2>=e)return new z(f,d);e=Math.sqrt(e/2)}else a=!1,d>Number.EPSILON?f>Number.EPSILON&&(a=!0):d<-Number.EPSILON?f<-Number.EPSILON&&(a=!0):Math.sign(e)===Math.sign(g)&&(a=!0),a?(f=-e,e=Math.sqrt(h)):(f=d,d=e,e=Math.sqrt(h/2));return new z(f/e,d/e)}function h(a,b){for(N=a.length;0<=--N;){var c=N;var f=N-1;0>f&&(f=a.length-1);var g,h=w+2*E;for(g=0;g<h;g++){var k=Z*g,m=Z*(g+1),n=b+f+k,t=b+f+m;m=b+c+m;r(b+c+k);r(n);r(m);r(n);
r(t);r(m);k=e.length/3;k=B.generateSideWallUV(d,e,k-6,k-3,k-2,k-1);v(k[0]);v(k[1]);v(k[3]);v(k[1]);v(k[2]);v(k[3])}}}function k(a,b,c){y.push(a);y.push(b);y.push(c)}function l(a,b,c){r(a);r(b);r(c);a=e.length/3;a=B.generateTopUV(d,e,a-3,a-2,a-1);v(a[0]);v(a[1]);v(a[2])}function r(a){e.push(y[3*a]);e.push(y[3*a+1]);e.push(y[3*a+2])}function v(a){f.push(a.x);f.push(a.y)}var y=[],x=void 0!==b.curveSegments?b.curveSegments:12,w=void 0!==b.steps?b.steps:1,G=void 0!==b.depth?b.depth:100,D=void 0!==b.bevelEnabled?
b.bevelEnabled:!0,O=void 0!==b.bevelThickness?b.bevelThickness:6,S=void 0!==b.bevelSize?b.bevelSize:O-2,E=void 0!==b.bevelSegments?b.bevelSegments:3,A=b.extrudePath,B=void 0!==b.UVGenerator?b.UVGenerator:Pg;void 0!==b.amount&&(console.warn("THREE.ExtrudeBufferGeometry: amount has been renamed to depth."),G=b.amount);var I=!1;if(A){var P=A.getSpacedPoints(w);I=!0;D=!1;var F=A.computeFrenetFrames(w,!1);var L=new p;var R=new p;var M=new p}D||(S=O=E=0);var J;x=a.extractPoints(x);a=x.shape;var Q=x.holes;
if(!Xa.isClockWise(a)){a=a.reverse();var H=0;for(J=Q.length;H<J;H++){var K=Q[H];Xa.isClockWise(K)&&(Q[H]=K.reverse())}}var U=Xa.triangulateShape(a,Q),V=a;H=0;for(J=Q.length;H<J;H++)K=Q[H],a=a.concat(K);var T,Z=a.length,X,aa=U.length;x=[];var N=0;var W=V.length;var Y=W-1;for(T=N+1;N<W;N++,Y++,T++)Y===W&&(Y=0),T===W&&(T=0),x[N]=g(V[N],V[Y],V[T]);A=[];var fa=x.concat();H=0;for(J=Q.length;H<J;H++){K=Q[H];var da=[];N=0;W=K.length;Y=W-1;for(T=N+1;N<W;N++,Y++,T++)Y===W&&(Y=0),T===W&&(T=0),da[N]=g(K[N],K[Y],
K[T]);A.push(da);fa=fa.concat(da)}for(Y=0;Y<E;Y++){W=Y/E;var ea=O*Math.cos(W*Math.PI/2);T=S*Math.sin(W*Math.PI/2);N=0;for(W=V.length;N<W;N++){var ba=c(V[N],x[N],T);k(ba.x,ba.y,-ea)}H=0;for(J=Q.length;H<J;H++)for(K=Q[H],da=A[H],N=0,W=K.length;N<W;N++)ba=c(K[N],da[N],T),k(ba.x,ba.y,-ea)}T=S;for(N=0;N<Z;N++)ba=D?c(a[N],fa[N],T):a[N],I?(R.copy(F.normals[0]).multiplyScalar(ba.x),L.copy(F.binormals[0]).multiplyScalar(ba.y),M.copy(P[0]).add(R).add(L),k(M.x,M.y,M.z)):k(ba.x,ba.y,0);for(W=1;W<=w;W++)for(N=
0;N<Z;N++)ba=D?c(a[N],fa[N],T):a[N],I?(R.copy(F.normals[W]).multiplyScalar(ba.x),L.copy(F.binormals[W]).multiplyScalar(ba.y),M.copy(P[W]).add(R).add(L),k(M.x,M.y,M.z)):k(ba.x,ba.y,G/w*W);for(Y=E-1;0<=Y;Y--){W=Y/E;ea=O*Math.cos(W*Math.PI/2);T=S*Math.sin(W*Math.PI/2);N=0;for(W=V.length;N<W;N++)ba=c(V[N],x[N],T),k(ba.x,ba.y,G+ea);H=0;for(J=Q.length;H<J;H++)for(K=Q[H],da=A[H],N=0,W=K.length;N<W;N++)ba=c(K[N],da[N],T),I?k(ba.x,ba.y+P[w-1].y,P[w-1].x+ea):k(ba.x,ba.y,G+ea)}(function(){var a=e.length/3;if(D){var b=
0*Z;for(N=0;N<aa;N++)X=U[N],l(X[2]+b,X[1]+b,X[0]+b);b=Z*(w+2*E);for(N=0;N<aa;N++)X=U[N],l(X[0]+b,X[1]+b,X[2]+b)}else{for(N=0;N<aa;N++)X=U[N],l(X[2],X[1],X[0]);for(N=0;N<aa;N++)X=U[N],l(X[0]+Z*w,X[1]+Z*w,X[2]+Z*w)}d.addGroup(a,e.length/3-a,0)})();(function(){var a=e.length/3,b=0;h(V,b);b+=V.length;H=0;for(J=Q.length;H<J;H++)K=Q[H],h(K,b),b+=K.length;d.addGroup(a,e.length/3-a,1)})()}I.call(this);this.type="ExtrudeBufferGeometry";this.parameters={shapes:a,options:b};a=Array.isArray(a)?a:[a];for(var d=
this,e=[],f=[],g=0,h=a.length;g<h;g++)c(a[g]);this.addAttribute("position",new A(e,3));this.addAttribute("uv",new A(f,2));this.computeVertexNormals()}function gf(a,b,c){c.shapes=[];if(Array.isArray(a))for(var d=0,e=a.length;d<e;d++)c.shapes.push(a[d].uuid);else c.shapes.push(a.uuid);void 0!==b.extrudePath&&(c.options.extrudePath=b.extrudePath.toJSON());return c}function Uc(a,b){M.call(this);this.type="TextGeometry";this.parameters={text:a,parameters:b};this.fromBufferGeometry(new $b(a,b));this.mergeVertices()}
function $b(a,b){b=b||{};var c=b.font;if(!c||!c.isFont)return console.error("THREE.TextGeometry: font parameter is not an instance of THREE.Font."),new M;a=c.generateShapes(a,b.size);b.depth=void 0!==b.height?b.height:50;void 0===b.bevelThickness&&(b.bevelThickness=10);void 0===b.bevelSize&&(b.bevelSize=8);void 0===b.bevelEnabled&&(b.bevelEnabled=!1);Qa.call(this,a,b);this.type="TextBufferGeometry"}function Vc(a,b,c,d,e,f,g){M.call(this);this.type="SphereGeometry";this.parameters={radius:a,widthSegments:b,
heightSegments:c,phiStart:d,phiLength:e,thetaStart:f,thetaLength:g};this.fromBufferGeometry(new ub(a,b,c,d,e,f,g));this.mergeVertices()}function ub(a,b,c,d,e,f,g){I.call(this);this.type="SphereBufferGeometry";this.parameters={radius:a,widthSegments:b,heightSegments:c,phiStart:d,phiLength:e,thetaStart:f,thetaLength:g};a=a||1;b=Math.max(3,Math.floor(b)||8);c=Math.max(2,Math.floor(c)||6);d=void 0!==d?d:0;e=void 0!==e?e:2*Math.PI;f=void 0!==f?f:0;g=void 0!==g?g:Math.PI;var h=f+g,k,m,t=0,n=[],l=new p,
u=new p,r=[],v=[],y=[],x=[];for(m=0;m<=c;m++){var w=[],G=m/c;for(k=0;k<=b;k++){var D=k/b;l.x=-a*Math.cos(d+D*e)*Math.sin(f+G*g);l.y=a*Math.cos(f+G*g);l.z=a*Math.sin(d+D*e)*Math.sin(f+G*g);v.push(l.x,l.y,l.z);u.set(l.x,l.y,l.z).normalize();y.push(u.x,u.y,u.z);x.push(D,1-G);w.push(t++)}n.push(w)}for(m=0;m<c;m++)for(k=0;k<b;k++)a=n[m][k+1],d=n[m][k],e=n[m+1][k],g=n[m+1][k+1],(0!==m||0<f)&&r.push(a,d,g),(m!==c-1||h<Math.PI)&&r.push(d,e,g);this.setIndex(r);this.addAttribute("position",new A(v,3));this.addAttribute("normal",
new A(y,3));this.addAttribute("uv",new A(x,2))}function Wc(a,b,c,d,e,f){M.call(this);this.type="RingGeometry";this.parameters={innerRadius:a,outerRadius:b,thetaSegments:c,phiSegments:d,thetaStart:e,thetaLength:f};this.fromBufferGeometry(new ac(a,b,c,d,e,f));this.mergeVertices()}function ac(a,b,c,d,e,f){I.call(this);this.type="RingBufferGeometry";this.parameters={innerRadius:a,outerRadius:b,thetaSegments:c,phiSegments:d,thetaStart:e,thetaLength:f};a=a||.5;b=b||1;e=void 0!==e?e:0;f=void 0!==f?f:2*Math.PI;
c=void 0!==c?Math.max(3,c):8;d=void 0!==d?Math.max(1,d):1;var g=[],h=[],k=[],m=[],t=a,n=(b-a)/d,l=new p,u=new z,r,v;for(r=0;r<=d;r++){for(v=0;v<=c;v++)a=e+v/c*f,l.x=t*Math.cos(a),l.y=t*Math.sin(a),h.push(l.x,l.y,l.z),k.push(0,0,1),u.x=(l.x/b+1)/2,u.y=(l.y/b+1)/2,m.push(u.x,u.y);t+=n}for(r=0;r<d;r++)for(b=r*(c+1),v=0;v<c;v++)a=v+b,e=a+c+1,f=a+c+2,t=a+1,g.push(a,e,t),g.push(e,f,t);this.setIndex(g);this.addAttribute("position",new A(h,3));this.addAttribute("normal",new A(k,3));this.addAttribute("uv",
new A(m,2))}function Xc(a,b,c,d){M.call(this);this.type="LatheGeometry";this.parameters={points:a,segments:b,phiStart:c,phiLength:d};this.fromBufferGeometry(new bc(a,b,c,d));this.mergeVertices()}function bc(a,b,c,d){I.call(this);this.type="LatheBufferGeometry";this.parameters={points:a,segments:b,phiStart:c,phiLength:d};b=Math.floor(b)||12;c=c||0;d=d||2*Math.PI;d=K.clamp(d,0,2*Math.PI);var e=[],f=[],g=[],h=1/b,k=new p,m=new z,t;for(t=0;t<=b;t++){var n=c+t*h*d;var l=Math.sin(n),u=Math.cos(n);for(n=
0;n<=a.length-1;n++)k.x=a[n].x*l,k.y=a[n].y,k.z=a[n].x*u,f.push(k.x,k.y,k.z),m.x=t/b,m.y=n/(a.length-1),g.push(m.x,m.y)}for(t=0;t<b;t++)for(n=0;n<a.length-1;n++)c=n+t*a.length,h=c+a.length,k=c+a.length+1,m=c+1,e.push(c,h,m),e.push(h,k,m);this.setIndex(e);this.addAttribute("position",new A(f,3));this.addAttribute("uv",new A(g,2));this.computeVertexNormals();if(d===2*Math.PI)for(d=this.attributes.normal.array,e=new p,f=new p,g=new p,c=b*a.length*3,n=t=0;t<a.length;t++,n+=3)e.x=d[n+0],e.y=d[n+1],e.z=
d[n+2],f.x=d[c+n+0],f.y=d[c+n+1],f.z=d[c+n+2],g.addVectors(e,f).normalize(),d[n+0]=d[c+n+0]=g.x,d[n+1]=d[c+n+1]=g.y,d[n+2]=d[c+n+2]=g.z}function vb(a,b){M.call(this);this.type="ShapeGeometry";"object"===typeof b&&(console.warn("THREE.ShapeGeometry: Options parameter has been removed."),b=b.curveSegments);this.parameters={shapes:a,curveSegments:b};this.fromBufferGeometry(new wb(a,b));this.mergeVertices()}function wb(a,b){function c(a){var c,h=e.length/3;a=a.extractPoints(b);var m=a.shape,t=a.holes;
if(!1===Xa.isClockWise(m))for(m=m.reverse(),a=0,c=t.length;a<c;a++){var l=t[a];!0===Xa.isClockWise(l)&&(t[a]=l.reverse())}var p=Xa.triangulateShape(m,t);a=0;for(c=t.length;a<c;a++)l=t[a],m=m.concat(l);a=0;for(c=m.length;a<c;a++)l=m[a],e.push(l.x,l.y,0),f.push(0,0,1),g.push(l.x,l.y);a=0;for(c=p.length;a<c;a++)m=p[a],d.push(m[0]+h,m[1]+h,m[2]+h),k+=3}I.call(this);this.type="ShapeBufferGeometry";this.parameters={shapes:a,curveSegments:b};b=b||12;var d=[],e=[],f=[],g=[],h=0,k=0;if(!1===Array.isArray(a))c(a);
else for(var m=0;m<a.length;m++)c(a[m]),this.addGroup(h,k,m),h+=k,k=0;this.setIndex(d);this.addAttribute("position",new A(e,3));this.addAttribute("normal",new A(f,3));this.addAttribute("uv",new A(g,2))}function hf(a,b){b.shapes=[];if(Array.isArray(a))for(var c=0,d=a.length;c<d;c++)b.shapes.push(a[c].uuid);else b.shapes.push(a.uuid);return b}function cc(a,b){I.call(this);this.type="EdgesGeometry";this.parameters={thresholdAngle:b};var c=[];b=Math.cos(K.DEG2RAD*(void 0!==b?b:1));var d=[0,0],e={},f=
["a","b","c"];if(a.isBufferGeometry){var g=new M;g.fromBufferGeometry(a)}else g=a.clone();g.mergeVertices();g.computeFaceNormals();a=g.vertices;g=g.faces;for(var h=0,k=g.length;h<k;h++)for(var m=g[h],t=0;3>t;t++){var n=m[f[t]];var l=m[f[(t+1)%3]];d[0]=Math.min(n,l);d[1]=Math.max(n,l);n=d[0]+","+d[1];void 0===e[n]?e[n]={index1:d[0],index2:d[1],face1:h,face2:void 0}:e[n].face2=h}for(n in e)if(d=e[n],void 0===d.face2||g[d.face1].normal.dot(g[d.face2].normal)<=b)f=a[d.index1],c.push(f.x,f.y,f.z),f=a[d.index2],
c.push(f.x,f.y,f.z);this.addAttribute("position",new A(c,3))}function xb(a,b,c,d,e,f,g,h){M.call(this);this.type="CylinderGeometry";this.parameters={radiusTop:a,radiusBottom:b,height:c,radialSegments:d,heightSegments:e,openEnded:f,thetaStart:g,thetaLength:h};this.fromBufferGeometry(new Ya(a,b,c,d,e,f,g,h));this.mergeVertices()}function Ya(a,b,c,d,e,f,g,h){function k(c){var e,f=new z,k=new p,q=0,v=!0===c?a:b,w=!0===c?1:-1;var A=r;for(e=1;e<=d;e++)n.push(0,y*w,0),l.push(0,w,0),u.push(.5,.5),r++;var B=
r;for(e=0;e<=d;e++){var P=e/d*h+g,I=Math.cos(P);P=Math.sin(P);k.x=v*P;k.y=y*w;k.z=v*I;n.push(k.x,k.y,k.z);l.push(0,w,0);f.x=.5*I+.5;f.y=.5*P*w+.5;u.push(f.x,f.y);r++}for(e=0;e<d;e++)f=A+e,k=B+e,!0===c?t.push(k,k+1,f):t.push(k+1,k,f),q+=3;m.addGroup(x,q,!0===c?1:2);x+=q}I.call(this);this.type="CylinderBufferGeometry";this.parameters={radiusTop:a,radiusBottom:b,height:c,radialSegments:d,heightSegments:e,openEnded:f,thetaStart:g,thetaLength:h};var m=this;a=void 0!==a?a:1;b=void 0!==b?b:1;c=c||1;d=Math.floor(d)||
8;e=Math.floor(e)||1;f=void 0!==f?f:!1;g=void 0!==g?g:0;h=void 0!==h?h:2*Math.PI;var t=[],n=[],l=[],u=[],r=0,v=[],y=c/2,x=0;(function(){var f,k,q=new p,O=new p,z=0,E=(b-a)/c;for(k=0;k<=e;k++){var A=[],B=k/e,I=B*(b-a)+a;for(f=0;f<=d;f++){var P=f/d,H=P*h+g,F=Math.sin(H);H=Math.cos(H);O.x=I*F;O.y=-B*c+y;O.z=I*H;n.push(O.x,O.y,O.z);q.set(F,E,H).normalize();l.push(q.x,q.y,q.z);u.push(P,1-B);A.push(r++)}v.push(A)}for(f=0;f<d;f++)for(k=0;k<e;k++)q=v[k+1][f],O=v[k+1][f+1],E=v[k][f+1],t.push(v[k][f],q,E),
t.push(q,O,E),z+=6;m.addGroup(x,z,0);x+=z})();!1===f&&(0<a&&k(!0),0<b&&k(!1));this.setIndex(t);this.addAttribute("position",new A(n,3));this.addAttribute("normal",new A(l,3));this.addAttribute("uv",new A(u,2))}function Yc(a,b,c,d,e,f,g){xb.call(this,0,a,b,c,d,e,f,g);this.type="ConeGeometry";this.parameters={radius:a,height:b,radialSegments:c,heightSegments:d,openEnded:e,thetaStart:f,thetaLength:g}}function Zc(a,b,c,d,e,f,g){Ya.call(this,0,a,b,c,d,e,f,g);this.type="ConeBufferGeometry";this.parameters=
{radius:a,height:b,radialSegments:c,heightSegments:d,openEnded:e,thetaStart:f,thetaLength:g}}function $c(a,b,c,d){M.call(this);this.type="CircleGeometry";this.parameters={radius:a,segments:b,thetaStart:c,thetaLength:d};this.fromBufferGeometry(new dc(a,b,c,d));this.mergeVertices()}function dc(a,b,c,d){I.call(this);this.type="CircleBufferGeometry";this.parameters={radius:a,segments:b,thetaStart:c,thetaLength:d};a=a||1;b=void 0!==b?Math.max(3,b):8;c=void 0!==c?c:0;d=void 0!==d?d:2*Math.PI;var e=[],f=
[],g=[],h=[],k,m=new p,t=new z;f.push(0,0,0);g.push(0,0,1);h.push(.5,.5);var n=0;for(k=3;n<=b;n++,k+=3){var l=c+n/b*d;m.x=a*Math.cos(l);m.y=a*Math.sin(l);f.push(m.x,m.y,m.z);g.push(0,0,1);t.x=(f[k]/a+1)/2;t.y=(f[k+1]/a+1)/2;h.push(t.x,t.y)}for(k=1;k<=b;k++)e.push(k,k+1,0);this.setIndex(e);this.addAttribute("position",new A(f,3));this.addAttribute("normal",new A(g,3));this.addAttribute("uv",new A(h,2))}function yb(a){H.call(this);this.type="ShadowMaterial";this.color=new F(0);this.transparent=!0;this.setValues(a)}
function ec(a){ua.call(this,a);this.type="RawShaderMaterial"}function Ra(a){H.call(this);this.defines={STANDARD:""};this.type="MeshStandardMaterial";this.color=new F(16777215);this.metalness=this.roughness=.5;this.lightMap=this.map=null;this.lightMapIntensity=1;this.aoMap=null;this.aoMapIntensity=1;this.emissive=new F(0);this.emissiveIntensity=1;this.bumpMap=this.emissiveMap=null;this.bumpScale=1;this.normalMap=null;this.normalMapType=0;this.normalScale=new z(1,1);this.displacementMap=null;this.displacementScale=
1;this.displacementBias=0;this.envMap=this.alphaMap=this.metalnessMap=this.roughnessMap=null;this.envMapIntensity=1;this.refractionRatio=.98;this.wireframe=!1;this.wireframeLinewidth=1;this.wireframeLinejoin=this.wireframeLinecap="round";this.morphNormals=this.morphTargets=this.skinning=!1;this.setValues(a)}function zb(a){Ra.call(this);this.defines={PHYSICAL:""};this.type="MeshPhysicalMaterial";this.reflectivity=.5;this.clearCoatRoughness=this.clearCoat=0;this.setValues(a)}function Ga(a){H.call(this);
this.type="MeshPhongMaterial";this.color=new F(16777215);this.specular=new F(1118481);this.shininess=30;this.lightMap=this.map=null;this.lightMapIntensity=1;this.aoMap=null;this.aoMapIntensity=1;this.emissive=new F(0);this.emissiveIntensity=1;this.bumpMap=this.emissiveMap=null;this.bumpScale=1;this.normalMap=null;this.normalMapType=0;this.normalScale=new z(1,1);this.displacementMap=null;this.displacementScale=1;this.displacementBias=0;this.envMap=this.alphaMap=this.specularMap=null;this.combine=0;
this.reflectivity=1;this.refractionRatio=.98;this.wireframe=!1;this.wireframeLinewidth=1;this.wireframeLinejoin=this.wireframeLinecap="round";this.morphNormals=this.morphTargets=this.skinning=!1;this.setValues(a)}function Ab(a){Ga.call(this);this.defines={TOON:""};this.type="MeshToonMaterial";this.gradientMap=null;this.setValues(a)}function Bb(a){H.call(this);this.type="MeshNormalMaterial";this.bumpMap=null;this.bumpScale=1;this.normalMap=null;this.normalMapType=0;this.normalScale=new z(1,1);this.displacementMap=
null;this.displacementScale=1;this.displacementBias=0;this.wireframe=!1;this.wireframeLinewidth=1;this.morphNormals=this.morphTargets=this.skinning=this.lights=this.fog=!1;this.setValues(a)}function Cb(a){H.call(this);this.type="MeshLambertMaterial";this.color=new F(16777215);this.lightMap=this.map=null;this.lightMapIntensity=1;this.aoMap=null;this.aoMapIntensity=1;this.emissive=new F(0);this.emissiveIntensity=1;this.envMap=this.alphaMap=this.specularMap=this.emissiveMap=null;this.combine=0;this.reflectivity=
1;this.refractionRatio=.98;this.wireframe=!1;this.wireframeLinewidth=1;this.wireframeLinejoin=this.wireframeLinecap="round";this.morphNormals=this.morphTargets=this.skinning=!1;this.setValues(a)}function Db(a){V.call(this);this.type="LineDashedMaterial";this.scale=1;this.dashSize=3;this.gapSize=1;this.setValues(a)}function be(a,b,c){var d=this,e=!1,f=0,g=0,h=void 0;this.onStart=void 0;this.onLoad=a;this.onProgress=b;this.onError=c;this.itemStart=function(a){g++;if(!1===e&&void 0!==d.onStart)d.onStart(a,
f,g);e=!0};this.itemEnd=function(a){f++;if(void 0!==d.onProgress)d.onProgress(a,f,g);if(f===g&&(e=!1,void 0!==d.onLoad))d.onLoad()};this.itemError=function(a){if(void 0!==d.onError)d.onError(a)};this.resolveURL=function(a){return h?h(a):a};this.setURLModifier=function(a){h=a;return this}}function Ha(a){this.manager=void 0!==a?a:wa}function jf(a){this.manager=void 0!==a?a:wa;this._parser=null}function ce(a){this.manager=void 0!==a?a:wa;this._parser=null}function ad(a){this.manager=void 0!==a?a:wa}
function de(a){this.manager=void 0!==a?a:wa}function wd(a){this.manager=void 0!==a?a:wa}function L(){this.type="Curve";this.arcLengthDivisions=200}function Aa(a,b,c,d,e,f,g,h){L.call(this);this.type="EllipseCurve";this.aX=a||0;this.aY=b||0;this.xRadius=c||1;this.yRadius=d||1;this.aStartAngle=e||0;this.aEndAngle=f||2*Math.PI;this.aClockwise=g||!1;this.aRotation=h||0}function fc(a,b,c,d,e,f){Aa.call(this,a,b,c,c,d,e,f);this.type="ArcCurve"}function ee(){var a=0,b=0,c=0,d=0;return{initCatmullRom:function(e,
f,g,h,k){e=k*(g-e);h=k*(h-f);a=f;b=e;c=-3*f+3*g-2*e-h;d=2*f-2*g+e+h},initNonuniformCatmullRom:function(e,f,g,h,k,m,t){e=((f-e)/k-(g-e)/(k+m)+(g-f)/m)*m;h=((g-f)/m-(h-f)/(m+t)+(h-g)/t)*m;a=f;b=e;c=-3*f+3*g-2*e-h;d=2*f-2*g+e+h},calc:function(e){var f=e*e;return a+b*e+c*f+d*f*e}}}function ja(a,b,c,d){L.call(this);this.type="CatmullRomCurve3";this.points=a||[];this.closed=b||!1;this.curveType=c||"centripetal";this.tension=d||.5}function kf(a,b,c,d,e){b=.5*(d-b);e=.5*(e-c);var f=a*a;return(2*c-2*d+b+e)*
a*f+(-3*c+3*d-2*b-e)*f+b*a+c}function bd(a,b,c,d){var e=1-a;return e*e*b+2*(1-a)*a*c+a*a*d}function cd(a,b,c,d,e){var f=1-a,g=1-a;return f*f*f*b+3*g*g*a*c+3*(1-a)*a*a*d+a*a*a*e}function Ia(a,b,c,d){L.call(this);this.type="CubicBezierCurve";this.v0=a||new z;this.v1=b||new z;this.v2=c||new z;this.v3=d||new z}function Sa(a,b,c,d){L.call(this);this.type="CubicBezierCurve3";this.v0=a||new p;this.v1=b||new p;this.v2=c||new p;this.v3=d||new p}function xa(a,b){L.call(this);this.type="LineCurve";this.v1=a||
new z;this.v2=b||new z}function Ja(a,b){L.call(this);this.type="LineCurve3";this.v1=a||new p;this.v2=b||new p}function Ka(a,b,c){L.call(this);this.type="QuadraticBezierCurve";this.v0=a||new z;this.v1=b||new z;this.v2=c||new z}function Ta(a,b,c){L.call(this);this.type="QuadraticBezierCurve3";this.v0=a||new p;this.v1=b||new p;this.v2=c||new p}function La(a){L.call(this);this.type="SplineCurve";this.points=a||[]}function Za(){L.call(this);this.type="CurvePath";this.curves=[];this.autoClose=!1}function Ma(a){Za.call(this);
this.type="Path";this.currentPoint=new z;a&&this.setFromPoints(a)}function fb(a){Ma.call(this,a);this.uuid=K.generateUUID();this.type="Shape";this.holes=[]}function fa(a,b){B.call(this);this.type="Light";this.color=new F(a);this.intensity=void 0!==b?b:1;this.receiveShadow=void 0}function xd(a,b,c){fa.call(this,a,c);this.type="HemisphereLight";this.castShadow=void 0;this.position.copy(B.DefaultUp);this.updateMatrix();this.groundColor=new F(b)}function Eb(a){this.camera=a;this.bias=0;this.radius=1;
this.mapSize=new z(512,512);this.map=null;this.matrix=new J}function yd(){Eb.call(this,new X(50,1,.5,500))}function zd(a,b,c,d,e,f){fa.call(this,a,b);this.type="SpotLight";this.position.copy(B.DefaultUp);this.updateMatrix();this.target=new B;Object.defineProperty(this,"power",{get:function(){return this.intensity*Math.PI},set:function(a){this.intensity=a/Math.PI}});this.distance=void 0!==c?c:0;this.angle=void 0!==d?d:Math.PI/3;this.penumbra=void 0!==e?e:0;this.decay=void 0!==f?f:1;this.shadow=new yd}
function Ad(a,b,c,d){fa.call(this,a,b);this.type="PointLight";Object.defineProperty(this,"power",{get:function(){return 4*this.intensity*Math.PI},set:function(a){this.intensity=a/(4*Math.PI)}});this.distance=void 0!==c?c:0;this.decay=void 0!==d?d:1;this.shadow=new Eb(new X(90,1,.5,500))}function Bd(){Eb.call(this,new Jb(-5,5,5,-5,.5,500))}function Cd(a,b){fa.call(this,a,b);this.type="DirectionalLight";this.position.copy(B.DefaultUp);this.updateMatrix();this.target=new B;this.shadow=new Bd}function Dd(a,
b){fa.call(this,a,b);this.type="AmbientLight";this.castShadow=void 0}function Ed(a,b,c,d){fa.call(this,a,b);this.type="RectAreaLight";this.width=void 0!==c?c:10;this.height=void 0!==d?d:10}function ya(a,b,c,d){this.parameterPositions=a;this._cachedIndex=0;this.resultBuffer=void 0!==d?d:new b.constructor(c);this.sampleValues=b;this.valueSize=c}function Fd(a,b,c,d){ya.call(this,a,b,c,d);this._offsetNext=this._weightNext=this._offsetPrev=this._weightPrev=-0}function dd(a,b,c,d){ya.call(this,a,b,c,d)}
function Gd(a,b,c,d){ya.call(this,a,b,c,d)}function pa(a,b,c,d){if(void 0===a)throw Error("THREE.KeyframeTrack: track name is undefined");if(void 0===b||0===b.length)throw Error("THREE.KeyframeTrack: no keyframes in track named "+a);this.name=a;this.times=qa.convertArray(b,this.TimeBufferType);this.values=qa.convertArray(c,this.ValueBufferType);this.setInterpolation(d||this.DefaultInterpolation)}function Hd(a,b,c){pa.call(this,a,b,c)}function Id(a,b,c,d){pa.call(this,a,b,c,d)}function gc(a,b,c,d){pa.call(this,
a,b,c,d)}function Jd(a,b,c,d){ya.call(this,a,b,c,d)}function ed(a,b,c,d){pa.call(this,a,b,c,d)}function Kd(a,b,c,d){pa.call(this,a,b,c,d)}function hc(a,b,c,d){pa.call(this,a,b,c,d)}function Da(a,b,c){this.name=a;this.tracks=c;this.duration=void 0!==b?b:-1;this.uuid=K.generateUUID();0>this.duration&&this.resetDuration()}function Qg(a){switch(a.toLowerCase()){case "scalar":case "double":case "float":case "number":case "integer":return gc;case "vector":case "vector2":case "vector3":case "vector4":return hc;
case "color":return Id;case "quaternion":return ed;case "bool":case "boolean":return Hd;case "string":return Kd}throw Error("THREE.KeyframeTrack: Unsupported typeName: "+a);}function Rg(a){if(void 0===a.type)throw Error("THREE.KeyframeTrack: track type undefined, can not parse");var b=Qg(a.type);if(void 0===a.times){var c=[],d=[];qa.flattenJSON(a.keys,c,d,"value");a.times=c;a.values=d}return void 0!==b.parse?b.parse(a):new b(a.name,a.times,a.values,a.interpolation)}function Ld(a){this.manager=void 0!==
a?a:wa;this.textures={}}function fe(a){this.manager=void 0!==a?a:wa}function ic(){}function ge(a){"boolean"===typeof a&&(console.warn("THREE.JSONLoader: showStatus parameter has been removed from constructor."),a=void 0);this.manager=void 0!==a?a:wa;this.withCredentials=!1}function lf(a){this.manager=void 0!==a?a:wa;this.texturePath=""}function he(a){"undefined"===typeof createImageBitmap&&console.warn("THREE.ImageBitmapLoader: createImageBitmap() not supported.");"undefined"===typeof fetch&&console.warn("THREE.ImageBitmapLoader: fetch() not supported.");
this.manager=void 0!==a?a:wa;this.options=void 0}function ie(){this.type="ShapePath";this.color=new F;this.subPaths=[];this.currentPath=null}function je(a){this.type="Font";this.data=a}function mf(a){this.manager=void 0!==a?a:wa}function ke(a){this.manager=void 0!==a?a:wa}function nf(){this.type="StereoCamera";this.aspect=1;this.eyeSep=.064;this.cameraL=new X;this.cameraL.layers.enable(1);this.cameraL.matrixAutoUpdate=!1;this.cameraR=new X;this.cameraR.layers.enable(2);this.cameraR.matrixAutoUpdate=
!1}function fd(a,b,c){B.call(this);this.type="CubeCamera";var d=new X(90,1,a,b);d.up.set(0,-1,0);d.lookAt(new p(1,0,0));this.add(d);var e=new X(90,1,a,b);e.up.set(0,-1,0);e.lookAt(new p(-1,0,0));this.add(e);var f=new X(90,1,a,b);f.up.set(0,0,1);f.lookAt(new p(0,1,0));this.add(f);var g=new X(90,1,a,b);g.up.set(0,0,-1);g.lookAt(new p(0,-1,0));this.add(g);var h=new X(90,1,a,b);h.up.set(0,-1,0);h.lookAt(new p(0,0,1));this.add(h);var k=new X(90,1,a,b);k.up.set(0,-1,0);k.lookAt(new p(0,0,-1));this.add(k);
this.renderTarget=new Ib(c,c,{format:1022,magFilter:1006,minFilter:1006});this.renderTarget.texture.name="CubeCamera";this.update=function(a,b){null===this.parent&&this.updateMatrixWorld();var c=this.renderTarget,m=c.texture.generateMipmaps;c.texture.generateMipmaps=!1;c.activeCubeFace=0;a.render(b,d,c);c.activeCubeFace=1;a.render(b,e,c);c.activeCubeFace=2;a.render(b,f,c);c.activeCubeFace=3;a.render(b,g,c);c.activeCubeFace=4;a.render(b,h,c);c.texture.generateMipmaps=m;c.activeCubeFace=5;a.render(b,
k,c);a.setRenderTarget(null)};this.clear=function(a,b,c,d){for(var e=this.renderTarget,f=0;6>f;f++)e.activeCubeFace=f,a.setRenderTarget(e),a.clear(b,c,d);a.setRenderTarget(null)}}function le(){B.call(this);this.type="AudioListener";this.context=me.getContext();this.gain=this.context.createGain();this.gain.connect(this.context.destination);this.filter=null}function jc(a){B.call(this);this.type="Audio";this.context=a.context;this.gain=this.context.createGain();this.gain.connect(a.getInput());this.autoplay=
!1;this.buffer=null;this.loop=!1;this.offset=this.startTime=0;this.playbackRate=1;this.isPlaying=!1;this.hasPlaybackControl=!0;this.sourceType="empty";this.filters=[]}function ne(a){jc.call(this,a);this.panner=this.context.createPanner();this.panner.connect(this.gain)}function oe(a,b){this.analyser=a.context.createAnalyser();this.analyser.fftSize=void 0!==b?b:2048;this.data=new Uint8Array(this.analyser.frequencyBinCount);a.getOutput().connect(this.analyser)}function pe(a,b,c){this.binding=a;this.valueSize=
c;a=Float64Array;switch(b){case "quaternion":b=this._slerp;break;case "string":case "bool":a=Array;b=this._select;break;default:b=this._lerp}this.buffer=new a(4*c);this._mixBufferRegion=b;this.referenceCount=this.useCount=this.cumulativeWeight=0}function of(a,b,c){c=c||sa.parseTrackName(b);this._targetGroup=a;this._bindings=a.subscribe_(b,c)}function sa(a,b,c){this.path=b;this.parsedPath=c||sa.parseTrackName(b);this.node=sa.findNode(a,this.parsedPath.nodeName)||a;this.rootNode=a}function pf(){this.uuid=
K.generateUUID();this._objects=Array.prototype.slice.call(arguments);this.nCachedObjects_=0;var a={};this._indicesByUUID=a;for(var b=0,c=arguments.length;b!==c;++b)a[arguments[b].uuid]=b;this._paths=[];this._parsedPaths=[];this._bindings=[];this._bindingsIndicesByPath={};var d=this;this.stats={objects:{get total(){return d._objects.length},get inUse(){return this.total-d.nCachedObjects_}},get bindingsPerObject(){return d._bindings.length}}}function qf(a,b,c){this._mixer=a;this._clip=b;this._localRoot=
c||null;a=b.tracks;b=a.length;c=Array(b);for(var d={endingStart:2400,endingEnd:2400},e=0;e!==b;++e){var f=a[e].createInterpolant(null);c[e]=f;f.settings=d}this._interpolantSettings=d;this._interpolants=c;this._propertyBindings=Array(b);this._weightInterpolant=this._timeScaleInterpolant=this._byClipCacheIndex=this._cacheIndex=null;this.loop=2201;this._loopCount=-1;this._startTime=null;this.time=0;this._effectiveWeight=this.weight=this._effectiveTimeScale=this.timeScale=1;this.repetitions=Infinity;
this.paused=!1;this.enabled=!0;this.clampWhenFinished=!1;this.zeroSlopeAtEnd=this.zeroSlopeAtStart=!0}function qe(a){this._root=a;this._initMemoryManager();this.time=this._accuIndex=0;this.timeScale=1}function Md(a,b){"string"===typeof a&&(console.warn("THREE.Uniform: Type parameter is no longer needed."),a=b);this.value=a}function re(){I.call(this);this.type="InstancedBufferGeometry";this.maxInstancedCount=void 0}function se(a,b,c){qb.call(this,a,b);this.meshPerAttribute=c||1}function te(a,b,c,d){"number"===
typeof c&&(d=c,c=!1,console.error("THREE.InstancedBufferAttribute: The constructor now expects normalized as the third argument."));Q.call(this,a,b,c);this.meshPerAttribute=d||1}function rf(a,b,c,d){this.ray=new ob(a,b);this.near=c||0;this.far=d||Infinity;this.params={Mesh:{},Line:{},LOD:{},Points:{threshold:1},Sprite:{}};Object.defineProperties(this.params,{PointCloud:{get:function(){console.warn("THREE.Raycaster: params.PointCloud has been renamed to params.Points.");return this.Points}}})}function sf(a,
b){return a.distance-b.distance}function ue(a,b,c,d){if(!1!==a.visible&&(a.raycast(b,c),!0===d)){a=a.children;d=0;for(var e=a.length;d<e;d++)ue(a[d],b,c,!0)}}function tf(a){this.autoStart=void 0!==a?a:!0;this.elapsedTime=this.oldTime=this.startTime=0;this.running=!1}function uf(a,b,c){this.radius=void 0!==a?a:1;this.phi=void 0!==b?b:0;this.theta=void 0!==c?c:0;return this}function vf(a,b,c){this.radius=void 0!==a?a:1;this.theta=void 0!==b?b:0;this.y=void 0!==c?c:0;return this}function ve(a,b){this.min=
void 0!==a?a:new z(Infinity,Infinity);this.max=void 0!==b?b:new z(-Infinity,-Infinity)}function we(a,b){this.start=void 0!==a?a:new p;this.end=void 0!==b?b:new p}function gd(a){B.call(this);this.material=a;this.render=function(){}}function hd(a,b,c,d){this.object=a;this.size=void 0!==b?b:1;a=void 0!==c?c:16711680;d=void 0!==d?d:1;b=0;(c=this.object.geometry)&&c.isGeometry?b=3*c.faces.length:c&&c.isBufferGeometry&&(b=c.attributes.normal.count);c=new I;b=new A(6*b,3);c.addAttribute("position",b);Z.call(this,
c,new V({color:a,linewidth:d}));this.matrixAutoUpdate=!1;this.update()}function kc(a,b){B.call(this);this.light=a;this.light.updateMatrixWorld();this.matrix=a.matrixWorld;this.matrixAutoUpdate=!1;this.color=b;a=new I;b=[0,0,0,0,0,1,0,0,0,1,0,1,0,0,0,-1,0,1,0,0,0,0,1,1,0,0,0,0,-1,1];for(var c=0,d=1;32>c;c++,d++){var e=c/32*Math.PI*2,f=d/32*Math.PI*2;b.push(Math.cos(e),Math.sin(e),1,Math.cos(f),Math.sin(f),1)}a.addAttribute("position",new A(b,3));b=new V({fog:!1});this.cone=new Z(a,b);this.add(this.cone);
this.update()}function wf(a){var b=[];a&&a.isBone&&b.push(a);for(var c=0;c<a.children.length;c++)b.push.apply(b,wf(a.children[c]));return b}function lc(a){for(var b=wf(a),c=new I,d=[],e=[],f=new F(0,0,1),g=new F(0,1,0),h=0;h<b.length;h++){var k=b[h];k.parent&&k.parent.isBone&&(d.push(0,0,0),d.push(0,0,0),e.push(f.r,f.g,f.b),e.push(g.r,g.g,g.b))}c.addAttribute("position",new A(d,3));c.addAttribute("color",new A(e,3));d=new V({vertexColors:2,depthTest:!1,depthWrite:!1,transparent:!0});Z.call(this,c,
d);this.root=a;this.bones=b;this.matrix=a.matrixWorld;this.matrixAutoUpdate=!1}function mc(a,b,c){this.light=a;this.light.updateMatrixWorld();this.color=c;a=new ub(b,4,2);b=new ka({wireframe:!0,fog:!1});ta.call(this,a,b);this.matrix=this.light.matrixWorld;this.matrixAutoUpdate=!1;this.update()}function nc(a,b){B.call(this);this.light=a;this.light.updateMatrixWorld();this.matrix=a.matrixWorld;this.matrixAutoUpdate=!1;this.color=b;a=new V({fog:!1});b=new I;b.addAttribute("position",new Q(new Float32Array(15),
3));this.line=new oa(b,a);this.add(this.line);this.update()}function oc(a,b,c){B.call(this);this.light=a;this.light.updateMatrixWorld();this.matrix=a.matrixWorld;this.matrixAutoUpdate=!1;this.color=c;a=new rb(b);a.rotateY(.5*Math.PI);this.material=new ka({wireframe:!0,fog:!1});void 0===this.color&&(this.material.vertexColors=2);b=a.getAttribute("position");b=new Float32Array(3*b.count);a.addAttribute("color",new Q(b,3));this.add(new ta(a,this.material));this.update()}function id(a,b,c,d){a=a||10;
b=b||10;c=new F(void 0!==c?c:4473924);d=new F(void 0!==d?d:8947848);var e=b/2,f=a/b,g=a/2;a=[];for(var h=[],k=0,m=0,t=-g;k<=b;k++,t+=f){a.push(-g,0,t,g,0,t);a.push(t,0,-g,t,0,g);var n=k===e?c:d;n.toArray(h,m);m+=3;n.toArray(h,m);m+=3;n.toArray(h,m);m+=3;n.toArray(h,m);m+=3}b=new I;b.addAttribute("position",new A(a,3));b.addAttribute("color",new A(h,3));c=new V({vertexColors:2});Z.call(this,b,c)}function Nd(a,b,c,d,e,f){a=a||10;b=b||16;c=c||8;d=d||64;e=new F(void 0!==e?e:4473924);f=new F(void 0!==
f?f:8947848);var g=[],h=[],k;for(k=0;k<=b;k++){var m=k/b*2*Math.PI;var t=Math.sin(m)*a;m=Math.cos(m)*a;g.push(0,0,0);g.push(t,0,m);var n=k&1?e:f;h.push(n.r,n.g,n.b);h.push(n.r,n.g,n.b)}for(k=0;k<=c;k++){n=k&1?e:f;var l=a-a/c*k;for(b=0;b<d;b++)m=b/d*2*Math.PI,t=Math.sin(m)*l,m=Math.cos(m)*l,g.push(t,0,m),h.push(n.r,n.g,n.b),m=(b+1)/d*2*Math.PI,t=Math.sin(m)*l,m=Math.cos(m)*l,g.push(t,0,m),h.push(n.r,n.g,n.b)}a=new I;a.addAttribute("position",new A(g,3));a.addAttribute("color",new A(h,3));g=new V({vertexColors:2});
Z.call(this,a,g)}function jd(a,b,c,d){this.object=a;this.size=void 0!==b?b:1;a=void 0!==c?c:16776960;d=void 0!==d?d:1;b=0;(c=this.object.geometry)&&c.isGeometry?b=c.faces.length:console.warn("THREE.FaceNormalsHelper: only THREE.Geometry is supported. Use THREE.VertexNormalsHelper, instead.");c=new I;b=new A(6*b,3);c.addAttribute("position",b);Z.call(this,c,new V({color:a,linewidth:d}));this.matrixAutoUpdate=!1;this.update()}function pc(a,b,c){B.call(this);this.light=a;this.light.updateMatrixWorld();
this.matrix=a.matrixWorld;this.matrixAutoUpdate=!1;this.color=c;void 0===b&&(b=1);a=new I;a.addAttribute("position",new A([-b,b,0,b,b,0,b,-b,0,-b,-b,0,-b,b,0],3));b=new V({fog:!1});this.lightPlane=new oa(a,b);this.add(this.lightPlane);a=new I;a.addAttribute("position",new A([0,0,0,0,0,1],3));this.targetLine=new oa(a,b);this.add(this.targetLine);this.update()}function kd(a){function b(a,b,d){c(a,d);c(b,d)}function c(a,b){f.push(0,0,0);g.push(b.r,b.g,b.b);void 0===h[a]&&(h[a]=[]);h[a].push(f.length/
3-1)}var d=new I,e=new V({color:16777215,vertexColors:1}),f=[],g=[],h={},k=new F(16755200),m=new F(16711680),t=new F(43775),n=new F(16777215),l=new F(3355443);b("n1","n2",k);b("n2","n4",k);b("n4","n3",k);b("n3","n1",k);b("f1","f2",k);b("f2","f4",k);b("f4","f3",k);b("f3","f1",k);b("n1","f1",k);b("n2","f2",k);b("n3","f3",k);b("n4","f4",k);b("p","n1",m);b("p","n2",m);b("p","n3",m);b("p","n4",m);b("u1","u2",t);b("u2","u3",t);b("u3","u1",t);b("c","t",n);b("p","c",l);b("cn1","cn2",l);b("cn3","cn4",l);b("cf1",
"cf2",l);b("cf3","cf4",l);d.addAttribute("position",new A(f,3));d.addAttribute("color",new A(g,3));Z.call(this,d,e);this.camera=a;this.camera.updateProjectionMatrix&&this.camera.updateProjectionMatrix();this.matrix=a.matrixWorld;this.matrixAutoUpdate=!1;this.pointMap=h;this.update()}function Fb(a,b){this.object=a;void 0===b&&(b=16776960);a=new Uint16Array([0,1,1,2,2,3,3,0,4,5,5,6,6,7,7,4,0,4,1,5,2,6,3,7]);var c=new Float32Array(24),d=new I;d.setIndex(new Q(a,1));d.addAttribute("position",new Q(c,
3));Z.call(this,d,new V({color:b}));this.matrixAutoUpdate=!1;this.update()}function ld(a,b){this.type="Box3Helper";this.box=a;a=void 0!==b?b:16776960;b=new Uint16Array([0,1,1,2,2,3,3,0,4,5,5,6,6,7,7,4,0,4,1,5,2,6,3,7]);var c=new I;c.setIndex(new Q(b,1));c.addAttribute("position",new A([1,1,1,-1,1,1,-1,-1,1,1,-1,1,1,1,-1,-1,1,-1,-1,-1,-1,1,-1,-1],3));Z.call(this,c,new V({color:a}));this.geometry.computeBoundingSphere()}function md(a,b,c){this.type="PlaneHelper";this.plane=a;this.size=void 0===b?1:
b;a=void 0!==c?c:16776960;b=new I;b.addAttribute("position",new A([1,-1,1,-1,1,1,-1,-1,1,1,1,1,-1,1,1,-1,-1,1,1,-1,1,1,1,1,0,0,1,0,0,0],3));b.computeBoundingSphere();oa.call(this,b,new V({color:a}));b=new I;b.addAttribute("position",new A([1,1,1,-1,1,1,-1,-1,1,1,1,1,-1,-1,1,1,-1,1],3));b.computeBoundingSphere();this.add(new ta(b,new ka({color:a,opacity:.2,transparent:!0,depthWrite:!1})))}function Gb(a,b,c,d,e,f){B.call(this);void 0===d&&(d=16776960);void 0===c&&(c=1);void 0===e&&(e=.2*c);void 0===
f&&(f=.2*e);void 0===Od&&(Od=new I,Od.addAttribute("position",new A([0,0,0,0,1,0],3)),xe=new Ya(0,.5,1,5,1),xe.translate(0,-.5,0));this.position.copy(b);this.line=new oa(Od,new V({color:d}));this.line.matrixAutoUpdate=!1;this.add(this.line);this.cone=new ta(xe,new ka({color:d}));this.cone.matrixAutoUpdate=!1;this.add(this.cone);this.setDirection(a);this.setLength(c,e,f)}function nd(a){a=a||1;var b=[0,0,0,a,0,0,0,0,0,0,a,0,0,0,0,0,0,a];a=new I;a.addAttribute("position",new A(b,3));a.addAttribute("color",
new A([1,0,0,1,.6,0,0,1,0,.6,1,0,0,0,1,0,.6,1],3));b=new V({vertexColors:2});Z.call(this,a,b)}function xf(a){console.warn("THREE.ClosedSplineCurve3 has been deprecated. Use THREE.CatmullRomCurve3 instead.");ja.call(this,a);this.type="catmullrom";this.closed=!0}function yf(a){console.warn("THREE.SplineCurve3 has been deprecated. Use THREE.CatmullRomCurve3 instead.");ja.call(this,a);this.type="catmullrom"}function ye(a){console.warn("THREE.Spline has been removed. Use THREE.CatmullRomCurve3 instead.");
ja.call(this,a);this.type="catmullrom"}void 0===Number.EPSILON&&(Number.EPSILON=Math.pow(2,-52));void 0===Number.isInteger&&(Number.isInteger=function(a){return"number"===typeof a&&isFinite(a)&&Math.floor(a)===a});void 0===Math.sign&&(Math.sign=function(a){return 0>a?-1:0<a?1:+a});!1==="name"in Function.prototype&&Object.defineProperty(Function.prototype,"name",{get:function(){return this.toString().match(/^\s*function\s*([^\(\s]*)/)[1]}});void 0===Object.assign&&function(){Object.assign=function(a){if(void 0===
a||null===a)throw new TypeError("Cannot convert undefined or null to object");for(var b=Object(a),c=1;c<arguments.length;c++){var d=arguments[c];if(void 0!==d&&null!==d)for(var e in d)Object.prototype.hasOwnProperty.call(d,e)&&(b[e]=d[e])}return b}}();Object.assign(ea.prototype,{addEventListener:function(a,b){void 0===this._listeners&&(this._listeners={});var c=this._listeners;void 0===c[a]&&(c[a]=[]);-1===c[a].indexOf(b)&&c[a].push(b)},hasEventListener:function(a,b){if(void 0===this._listeners)return!1;
var c=this._listeners;return void 0!==c[a]&&-1!==c[a].indexOf(b)},removeEventListener:function(a,b){void 0!==this._listeners&&(a=this._listeners[a],void 0!==a&&(b=a.indexOf(b),-1!==b&&a.splice(b,1)))},dispatchEvent:function(a){if(void 0!==this._listeners){var b=this._listeners[a.type];if(void 0!==b){a.target=this;b=b.slice(0);for(var c=0,d=b.length;c<d;c++)b[c].call(this,a)}}}});var K={DEG2RAD:Math.PI/180,RAD2DEG:180/Math.PI,generateUUID:function(){for(var a=[],b=0;256>b;b++)a[b]=(16>b?"0":"")+b.toString(16);
return function(){var b=4294967295*Math.random()|0,d=4294967295*Math.random()|0,e=4294967295*Math.random()|0,f=4294967295*Math.random()|0;return(a[b&255]+a[b>>8&255]+a[b>>16&255]+a[b>>24&255]+"-"+a[d&255]+a[d>>8&255]+"-"+a[d>>16&15|64]+a[d>>24&255]+"-"+a[e&63|128]+a[e>>8&255]+"-"+a[e>>16&255]+a[e>>24&255]+a[f&255]+a[f>>8&255]+a[f>>16&255]+a[f>>24&255]).toUpperCase()}}(),clamp:function(a,b,c){return Math.max(b,Math.min(c,a))},euclideanModulo:function(a,b){return(a%b+b)%b},mapLinear:function(a,b,c,
d,e){return d+(a-b)*(e-d)/(c-b)},lerp:function(a,b,c){return(1-c)*a+c*b},smoothstep:function(a,b,c){if(a<=b)return 0;if(a>=c)return 1;a=(a-b)/(c-b);return a*a*(3-2*a)},smootherstep:function(a,b,c){if(a<=b)return 0;if(a>=c)return 1;a=(a-b)/(c-b);return a*a*a*(a*(6*a-15)+10)},randInt:function(a,b){return a+Math.floor(Math.random()*(b-a+1))},randFloat:function(a,b){return a+Math.random()*(b-a)},randFloatSpread:function(a){return a*(.5-Math.random())},degToRad:function(a){return a*K.DEG2RAD},radToDeg:function(a){return a*
K.RAD2DEG},isPowerOfTwo:function(a){return 0===(a&a-1)&&0!==a},ceilPowerOfTwo:function(a){return Math.pow(2,Math.ceil(Math.log(a)/Math.LN2))},floorPowerOfTwo:function(a){return Math.pow(2,Math.floor(Math.log(a)/Math.LN2))}};Object.defineProperties(z.prototype,{width:{get:function(){return this.x},set:function(a){this.x=a}},height:{get:function(){return this.y},set:function(a){this.y=a}}});Object.assign(z.prototype,{isVector2:!0,set:function(a,b){this.x=a;this.y=b;return this},setScalar:function(a){this.y=
this.x=a;return this},setX:function(a){this.x=a;return this},setY:function(a){this.y=a;return this},setComponent:function(a,b){switch(a){case 0:this.x=b;break;case 1:this.y=b;break;default:throw Error("index is out of range: "+a);}return this},getComponent:function(a){switch(a){case 0:return this.x;case 1:return this.y;default:throw Error("index is out of range: "+a);}},clone:function(){return new this.constructor(this.x,this.y)},copy:function(a){this.x=a.x;this.y=a.y;return this},add:function(a,
b){if(void 0!==b)return console.warn("THREE.Vector2: .add() now only accepts one argument. Use .addVectors( a, b ) instead."),this.addVectors(a,b);this.x+=a.x;this.y+=a.y;return this},addScalar:function(a){this.x+=a;this.y+=a;return this},addVectors:function(a,b){this.x=a.x+b.x;this.y=a.y+b.y;return this},addScaledVector:function(a,b){this.x+=a.x*b;this.y+=a.y*b;return this},sub:function(a,b){if(void 0!==b)return console.warn("THREE.Vector2: .sub() now only accepts one argument. Use .subVectors( a, b ) instead."),
this.subVectors(a,b);this.x-=a.x;this.y-=a.y;return this},subScalar:function(a){this.x-=a;this.y-=a;return this},subVectors:function(a,b){this.x=a.x-b.x;this.y=a.y-b.y;return this},multiply:function(a){this.x*=a.x;this.y*=a.y;return this},multiplyScalar:function(a){this.x*=a;this.y*=a;return this},divide:function(a){this.x/=a.x;this.y/=a.y;return this},divideScalar:function(a){return this.multiplyScalar(1/a)},applyMatrix3:function(a){var b=this.x,c=this.y;a=a.elements;this.x=a[0]*b+a[3]*c+a[6];this.y=
a[1]*b+a[4]*c+a[7];return this},min:function(a){this.x=Math.min(this.x,a.x);this.y=Math.min(this.y,a.y);return this},max:function(a){this.x=Math.max(this.x,a.x);this.y=Math.max(this.y,a.y);return this},clamp:function(a,b){this.x=Math.max(a.x,Math.min(b.x,this.x));this.y=Math.max(a.y,Math.min(b.y,this.y));return this},clampScalar:function(){var a=new z,b=new z;return function(c,d){a.set(c,c);b.set(d,d);return this.clamp(a,b)}}(),clampLength:function(a,b){var c=this.length();return this.divideScalar(c||
1).multiplyScalar(Math.max(a,Math.min(b,c)))},floor:function(){this.x=Math.floor(this.x);this.y=Math.floor(this.y);return this},ceil:function(){this.x=Math.ceil(this.x);this.y=Math.ceil(this.y);return this},round:function(){this.x=Math.round(this.x);this.y=Math.round(this.y);return this},roundToZero:function(){this.x=0>this.x?Math.ceil(this.x):Math.floor(this.x);this.y=0>this.y?Math.ceil(this.y):Math.floor(this.y);return this},negate:function(){this.x=-this.x;this.y=-this.y;return this},dot:function(a){return this.x*
a.x+this.y*a.y},cross:function(a){return this.x*a.y-this.y*a.x},lengthSq:function(){return this.x*this.x+this.y*this.y},length:function(){return Math.sqrt(this.x*this.x+this.y*this.y)},manhattanLength:function(){return Math.abs(this.x)+Math.abs(this.y)},normalize:function(){return this.divideScalar(this.length()||1)},angle:function(){var a=Math.atan2(this.y,this.x);0>a&&(a+=2*Math.PI);return a},distanceTo:function(a){return Math.sqrt(this.distanceToSquared(a))},distanceToSquared:function(a){var b=
this.x-a.x;a=this.y-a.y;return b*b+a*a},manhattanDistanceTo:function(a){return Math.abs(this.x-a.x)+Math.abs(this.y-a.y)},setLength:function(a){return this.normalize().multiplyScalar(a)},lerp:function(a,b){this.x+=(a.x-this.x)*b;this.y+=(a.y-this.y)*b;return this},lerpVectors:function(a,b,c){return this.subVectors(b,a).multiplyScalar(c).add(a)},equals:function(a){return a.x===this.x&&a.y===this.y},fromArray:function(a,b){void 0===b&&(b=0);this.x=a[b];this.y=a[b+1];return this},toArray:function(a,
b){void 0===a&&(a=[]);void 0===b&&(b=0);a[b]=this.x;a[b+1]=this.y;return a},fromBufferAttribute:function(a,b,c){void 0!==c&&console.warn("THREE.Vector2: offset has been removed from .fromBufferAttribute().");this.x=a.getX(b);this.y=a.getY(b);return this},rotateAround:function(a,b){var c=Math.cos(b);b=Math.sin(b);var d=this.x-a.x,e=this.y-a.y;this.x=d*c-e*b+a.x;this.y=d*b+e*c+a.y;return this}});Object.assign(J.prototype,{isMatrix4:!0,set:function(a,b,c,d,e,f,g,h,k,m,t,n,l,u,r,p){var q=this.elements;
q[0]=a;q[4]=b;q[8]=c;q[12]=d;q[1]=e;q[5]=f;q[9]=g;q[13]=h;q[2]=k;q[6]=m;q[10]=t;q[14]=n;q[3]=l;q[7]=u;q[11]=r;q[15]=p;return this},identity:function(){this.set(1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1);return this},clone:function(){return(new J).fromArray(this.elements)},copy:function(a){var b=this.elements;a=a.elements;b[0]=a[0];b[1]=a[1];b[2]=a[2];b[3]=a[3];b[4]=a[4];b[5]=a[5];b[6]=a[6];b[7]=a[7];b[8]=a[8];b[9]=a[9];b[10]=a[10];b[11]=a[11];b[12]=a[12];b[13]=a[13];b[14]=a[14];b[15]=a[15];return this},copyPosition:function(a){var b=
this.elements;a=a.elements;b[12]=a[12];b[13]=a[13];b[14]=a[14];return this},extractBasis:function(a,b,c){a.setFromMatrixColumn(this,0);b.setFromMatrixColumn(this,1);c.setFromMatrixColumn(this,2);return this},makeBasis:function(a,b,c){this.set(a.x,b.x,c.x,0,a.y,b.y,c.y,0,a.z,b.z,c.z,0,0,0,0,1);return this},extractRotation:function(){var a=new p;return function(b){var c=this.elements,d=b.elements,e=1/a.setFromMatrixColumn(b,0).length(),f=1/a.setFromMatrixColumn(b,1).length();b=1/a.setFromMatrixColumn(b,
2).length();c[0]=d[0]*e;c[1]=d[1]*e;c[2]=d[2]*e;c[3]=0;c[4]=d[4]*f;c[5]=d[5]*f;c[6]=d[6]*f;c[7]=0;c[8]=d[8]*b;c[9]=d[9]*b;c[10]=d[10]*b;c[11]=0;c[12]=0;c[13]=0;c[14]=0;c[15]=1;return this}}(),makeRotationFromEuler:function(a){a&&a.isEuler||console.error("THREE.Matrix4: .makeRotationFromEuler() now expects a Euler rotation rather than a Vector3 and order.");var b=this.elements,c=a.x,d=a.y,e=a.z,f=Math.cos(c);c=Math.sin(c);var g=Math.cos(d);d=Math.sin(d);var h=Math.cos(e);e=Math.sin(e);if("XYZ"===a.order){a=
f*h;var k=f*e,m=c*h,t=c*e;b[0]=g*h;b[4]=-g*e;b[8]=d;b[1]=k+m*d;b[5]=a-t*d;b[9]=-c*g;b[2]=t-a*d;b[6]=m+k*d;b[10]=f*g}else"YXZ"===a.order?(a=g*h,k=g*e,m=d*h,t=d*e,b[0]=a+t*c,b[4]=m*c-k,b[8]=f*d,b[1]=f*e,b[5]=f*h,b[9]=-c,b[2]=k*c-m,b[6]=t+a*c,b[10]=f*g):"ZXY"===a.order?(a=g*h,k=g*e,m=d*h,t=d*e,b[0]=a-t*c,b[4]=-f*e,b[8]=m+k*c,b[1]=k+m*c,b[5]=f*h,b[9]=t-a*c,b[2]=-f*d,b[6]=c,b[10]=f*g):"ZYX"===a.order?(a=f*h,k=f*e,m=c*h,t=c*e,b[0]=g*h,b[4]=m*d-k,b[8]=a*d+t,b[1]=g*e,b[5]=t*d+a,b[9]=k*d-m,b[2]=-d,b[6]=c*
g,b[10]=f*g):"YZX"===a.order?(a=f*g,k=f*d,m=c*g,t=c*d,b[0]=g*h,b[4]=t-a*e,b[8]=m*e+k,b[1]=e,b[5]=f*h,b[9]=-c*h,b[2]=-d*h,b[6]=k*e+m,b[10]=a-t*e):"XZY"===a.order&&(a=f*g,k=f*d,m=c*g,t=c*d,b[0]=g*h,b[4]=-e,b[8]=d*h,b[1]=a*e+t,b[5]=f*h,b[9]=k*e-m,b[2]=m*e-k,b[6]=c*h,b[10]=t*e+a);b[3]=0;b[7]=0;b[11]=0;b[12]=0;b[13]=0;b[14]=0;b[15]=1;return this},makeRotationFromQuaternion:function(){var a=new p(0,0,0),b=new p(1,1,1);return function(c){return this.compose(a,c,b)}}(),lookAt:function(){var a=new p,b=new p,
c=new p;return function(d,e,f){var g=this.elements;c.subVectors(d,e);0===c.lengthSq()&&(c.z=1);c.normalize();a.crossVectors(f,c);0===a.lengthSq()&&(1===Math.abs(f.z)?c.x+=1E-4:c.z+=1E-4,c.normalize(),a.crossVectors(f,c));a.normalize();b.crossVectors(c,a);g[0]=a.x;g[4]=b.x;g[8]=c.x;g[1]=a.y;g[5]=b.y;g[9]=c.y;g[2]=a.z;g[6]=b.z;g[10]=c.z;return this}}(),multiply:function(a,b){return void 0!==b?(console.warn("THREE.Matrix4: .multiply() now only accepts one argument. Use .multiplyMatrices( a, b ) instead."),
this.multiplyMatrices(a,b)):this.multiplyMatrices(this,a)},premultiply:function(a){return this.multiplyMatrices(a,this)},multiplyMatrices:function(a,b){var c=a.elements,d=b.elements;b=this.elements;a=c[0];var e=c[4],f=c[8],g=c[12],h=c[1],k=c[5],m=c[9],t=c[13],n=c[2],l=c[6],u=c[10],r=c[14],p=c[3],y=c[7],x=c[11];c=c[15];var w=d[0],G=d[4],D=d[8],O=d[12],z=d[1],E=d[5],A=d[9],B=d[13],I=d[2],H=d[6],F=d[10],L=d[14],M=d[3],J=d[7],K=d[11];d=d[15];b[0]=a*w+e*z+f*I+g*M;b[4]=a*G+e*E+f*H+g*J;b[8]=a*D+e*A+f*F+
g*K;b[12]=a*O+e*B+f*L+g*d;b[1]=h*w+k*z+m*I+t*M;b[5]=h*G+k*E+m*H+t*J;b[9]=h*D+k*A+m*F+t*K;b[13]=h*O+k*B+m*L+t*d;b[2]=n*w+l*z+u*I+r*M;b[6]=n*G+l*E+u*H+r*J;b[10]=n*D+l*A+u*F+r*K;b[14]=n*O+l*B+u*L+r*d;b[3]=p*w+y*z+x*I+c*M;b[7]=p*G+y*E+x*H+c*J;b[11]=p*D+y*A+x*F+c*K;b[15]=p*O+y*B+x*L+c*d;return this},multiplyScalar:function(a){var b=this.elements;b[0]*=a;b[4]*=a;b[8]*=a;b[12]*=a;b[1]*=a;b[5]*=a;b[9]*=a;b[13]*=a;b[2]*=a;b[6]*=a;b[10]*=a;b[14]*=a;b[3]*=a;b[7]*=a;b[11]*=a;b[15]*=a;return this},applyToBufferAttribute:function(){var a=
new p;return function(b){for(var c=0,d=b.count;c<d;c++)a.x=b.getX(c),a.y=b.getY(c),a.z=b.getZ(c),a.applyMatrix4(this),b.setXYZ(c,a.x,a.y,a.z);return b}}(),determinant:function(){var a=this.elements,b=a[0],c=a[4],d=a[8],e=a[12],f=a[1],g=a[5],h=a[9],k=a[13],m=a[2],l=a[6],n=a[10],q=a[14];return a[3]*(+e*h*l-d*k*l-e*g*n+c*k*n+d*g*q-c*h*q)+a[7]*(+b*h*q-b*k*n+e*f*n-d*f*q+d*k*m-e*h*m)+a[11]*(+b*k*l-b*g*q-e*f*l+c*f*q+e*g*m-c*k*m)+a[15]*(-d*g*m-b*h*l+b*g*n+d*f*l-c*f*n+c*h*m)},transpose:function(){var a=this.elements;
var b=a[1];a[1]=a[4];a[4]=b;b=a[2];a[2]=a[8];a[8]=b;b=a[6];a[6]=a[9];a[9]=b;b=a[3];a[3]=a[12];a[12]=b;b=a[7];a[7]=a[13];a[13]=b;b=a[11];a[11]=a[14];a[14]=b;return this},setPosition:function(a){var b=this.elements;b[12]=a.x;b[13]=a.y;b[14]=a.z;return this},getInverse:function(a,b){var c=this.elements,d=a.elements;a=d[0];var e=d[1],f=d[2],g=d[3],h=d[4],k=d[5],m=d[6],l=d[7],n=d[8],q=d[9],u=d[10],r=d[11],p=d[12],y=d[13],x=d[14];d=d[15];var w=q*x*l-y*u*l+y*m*r-k*x*r-q*m*d+k*u*d,G=p*u*l-n*x*l-p*m*r+h*x*
r+n*m*d-h*u*d,D=n*y*l-p*q*l+p*k*r-h*y*r-n*k*d+h*q*d,O=p*q*m-n*y*m-p*k*u+h*y*u+n*k*x-h*q*x,z=a*w+e*G+f*D+g*O;if(0===z){if(!0===b)throw Error("THREE.Matrix4: .getInverse() can't invert matrix, determinant is 0");console.warn("THREE.Matrix4: .getInverse() can't invert matrix, determinant is 0");return this.identity()}b=1/z;c[0]=w*b;c[1]=(y*u*g-q*x*g-y*f*r+e*x*r+q*f*d-e*u*d)*b;c[2]=(k*x*g-y*m*g+y*f*l-e*x*l-k*f*d+e*m*d)*b;c[3]=(q*m*g-k*u*g-q*f*l+e*u*l+k*f*r-e*m*r)*b;c[4]=G*b;c[5]=(n*x*g-p*u*g+p*f*r-a*
x*r-n*f*d+a*u*d)*b;c[6]=(p*m*g-h*x*g-p*f*l+a*x*l+h*f*d-a*m*d)*b;c[7]=(h*u*g-n*m*g+n*f*l-a*u*l-h*f*r+a*m*r)*b;c[8]=D*b;c[9]=(p*q*g-n*y*g-p*e*r+a*y*r+n*e*d-a*q*d)*b;c[10]=(h*y*g-p*k*g+p*e*l-a*y*l-h*e*d+a*k*d)*b;c[11]=(n*k*g-h*q*g-n*e*l+a*q*l+h*e*r-a*k*r)*b;c[12]=O*b;c[13]=(n*y*f-p*q*f+p*e*u-a*y*u-n*e*x+a*q*x)*b;c[14]=(p*k*f-h*y*f-p*e*m+a*y*m+h*e*x-a*k*x)*b;c[15]=(h*q*f-n*k*f+n*e*m-a*q*m-h*e*u+a*k*u)*b;return this},scale:function(a){var b=this.elements,c=a.x,d=a.y;a=a.z;b[0]*=c;b[4]*=d;b[8]*=a;b[1]*=
c;b[5]*=d;b[9]*=a;b[2]*=c;b[6]*=d;b[10]*=a;b[3]*=c;b[7]*=d;b[11]*=a;return this},getMaxScaleOnAxis:function(){var a=this.elements;return Math.sqrt(Math.max(a[0]*a[0]+a[1]*a[1]+a[2]*a[2],a[4]*a[4]+a[5]*a[5]+a[6]*a[6],a[8]*a[8]+a[9]*a[9]+a[10]*a[10]))},makeTranslation:function(a,b,c){this.set(1,0,0,a,0,1,0,b,0,0,1,c,0,0,0,1);return this},makeRotationX:function(a){var b=Math.cos(a);a=Math.sin(a);this.set(1,0,0,0,0,b,-a,0,0,a,b,0,0,0,0,1);return this},makeRotationY:function(a){var b=Math.cos(a);a=Math.sin(a);
this.set(b,0,a,0,0,1,0,0,-a,0,b,0,0,0,0,1);return this},makeRotationZ:function(a){var b=Math.cos(a);a=Math.sin(a);this.set(b,-a,0,0,a,b,0,0,0,0,1,0,0,0,0,1);return this},makeRotationAxis:function(a,b){var c=Math.cos(b);b=Math.sin(b);var d=1-c,e=a.x,f=a.y;a=a.z;var g=d*e,h=d*f;this.set(g*e+c,g*f-b*a,g*a+b*f,0,g*f+b*a,h*f+c,h*a-b*e,0,g*a-b*f,h*a+b*e,d*a*a+c,0,0,0,0,1);return this},makeScale:function(a,b,c){this.set(a,0,0,0,0,b,0,0,0,0,c,0,0,0,0,1);return this},makeShear:function(a,b,c){this.set(1,b,
c,0,a,1,c,0,a,b,1,0,0,0,0,1);return this},compose:function(a,b,c){var d=this.elements,e=b._x,f=b._y,g=b._z,h=b._w,k=e+e,m=f+f,l=g+g;b=e*k;var n=e*m;e*=l;var q=f*m;f*=l;g*=l;k*=h;m*=h;h*=l;l=c.x;var u=c.y;c=c.z;d[0]=(1-(q+g))*l;d[1]=(n+h)*l;d[2]=(e-m)*l;d[3]=0;d[4]=(n-h)*u;d[5]=(1-(b+g))*u;d[6]=(f+k)*u;d[7]=0;d[8]=(e+m)*c;d[9]=(f-k)*c;d[10]=(1-(b+q))*c;d[11]=0;d[12]=a.x;d[13]=a.y;d[14]=a.z;d[15]=1;return this},decompose:function(){var a=new p,b=new J;return function(c,d,e){var f=this.elements,g=a.set(f[0],
f[1],f[2]).length(),h=a.set(f[4],f[5],f[6]).length(),k=a.set(f[8],f[9],f[10]).length();0>this.determinant()&&(g=-g);c.x=f[12];c.y=f[13];c.z=f[14];b.copy(this);c=1/g;f=1/h;var m=1/k;b.elements[0]*=c;b.elements[1]*=c;b.elements[2]*=c;b.elements[4]*=f;b.elements[5]*=f;b.elements[6]*=f;b.elements[8]*=m;b.elements[9]*=m;b.elements[10]*=m;d.setFromRotationMatrix(b);e.x=g;e.y=h;e.z=k;return this}}(),makePerspective:function(a,b,c,d,e,f){void 0===f&&console.warn("THREE.Matrix4: .makePerspective() has been redefined and has a new signature. Please check the docs.");
var g=this.elements;g[0]=2*e/(b-a);g[4]=0;g[8]=(b+a)/(b-a);g[12]=0;g[1]=0;g[5]=2*e/(c-d);g[9]=(c+d)/(c-d);g[13]=0;g[2]=0;g[6]=0;g[10]=-(f+e)/(f-e);g[14]=-2*f*e/(f-e);g[3]=0;g[7]=0;g[11]=-1;g[15]=0;return this},makeOrthographic:function(a,b,c,d,e,f){var g=this.elements,h=1/(b-a),k=1/(c-d),m=1/(f-e);g[0]=2*h;g[4]=0;g[8]=0;g[12]=-((b+a)*h);g[1]=0;g[5]=2*k;g[9]=0;g[13]=-((c+d)*k);g[2]=0;g[6]=0;g[10]=-2*m;g[14]=-((f+e)*m);g[3]=0;g[7]=0;g[11]=0;g[15]=1;return this},equals:function(a){var b=this.elements;
a=a.elements;for(var c=0;16>c;c++)if(b[c]!==a[c])return!1;return!0},fromArray:function(a,b){void 0===b&&(b=0);for(var c=0;16>c;c++)this.elements[c]=a[c+b];return this},toArray:function(a,b){void 0===a&&(a=[]);void 0===b&&(b=0);var c=this.elements;a[b]=c[0];a[b+1]=c[1];a[b+2]=c[2];a[b+3]=c[3];a[b+4]=c[4];a[b+5]=c[5];a[b+6]=c[6];a[b+7]=c[7];a[b+8]=c[8];a[b+9]=c[9];a[b+10]=c[10];a[b+11]=c[11];a[b+12]=c[12];a[b+13]=c[13];a[b+14]=c[14];a[b+15]=c[15];return a}});Object.assign(ha,{slerp:function(a,b,c,d){return c.copy(a).slerp(b,
d)},slerpFlat:function(a,b,c,d,e,f,g){var h=c[d+0],k=c[d+1],m=c[d+2];c=c[d+3];d=e[f+0];var l=e[f+1],n=e[f+2];e=e[f+3];if(c!==e||h!==d||k!==l||m!==n){f=1-g;var q=h*d+k*l+m*n+c*e,u=0<=q?1:-1,r=1-q*q;r>Number.EPSILON&&(r=Math.sqrt(r),q=Math.atan2(r,q*u),f=Math.sin(f*q)/r,g=Math.sin(g*q)/r);u*=g;h=h*f+d*u;k=k*f+l*u;m=m*f+n*u;c=c*f+e*u;f===1-g&&(g=1/Math.sqrt(h*h+k*k+m*m+c*c),h*=g,k*=g,m*=g,c*=g)}a[b]=h;a[b+1]=k;a[b+2]=m;a[b+3]=c}});Object.defineProperties(ha.prototype,{x:{get:function(){return this._x},
set:function(a){this._x=a;this.onChangeCallback()}},y:{get:function(){return this._y},set:function(a){this._y=a;this.onChangeCallback()}},z:{get:function(){return this._z},set:function(a){this._z=a;this.onChangeCallback()}},w:{get:function(){return this._w},set:function(a){this._w=a;this.onChangeCallback()}}});Object.assign(ha.prototype,{set:function(a,b,c,d){this._x=a;this._y=b;this._z=c;this._w=d;this.onChangeCallback();return this},clone:function(){return new this.constructor(this._x,this._y,this._z,
this._w)},copy:function(a){this._x=a.x;this._y=a.y;this._z=a.z;this._w=a.w;this.onChangeCallback();return this},setFromEuler:function(a,b){if(!a||!a.isEuler)throw Error("THREE.Quaternion: .setFromEuler() now expects an Euler rotation rather than a Vector3 and order.");var c=a._x,d=a._y,e=a._z;a=a.order;var f=Math.cos,g=Math.sin,h=f(c/2),k=f(d/2);f=f(e/2);c=g(c/2);d=g(d/2);e=g(e/2);"XYZ"===a?(this._x=c*k*f+h*d*e,this._y=h*d*f-c*k*e,this._z=h*k*e+c*d*f,this._w=h*k*f-c*d*e):"YXZ"===a?(this._x=c*k*f+
h*d*e,this._y=h*d*f-c*k*e,this._z=h*k*e-c*d*f,this._w=h*k*f+c*d*e):"ZXY"===a?(this._x=c*k*f-h*d*e,this._y=h*d*f+c*k*e,this._z=h*k*e+c*d*f,this._w=h*k*f-c*d*e):"ZYX"===a?(this._x=c*k*f-h*d*e,this._y=h*d*f+c*k*e,this._z=h*k*e-c*d*f,this._w=h*k*f+c*d*e):"YZX"===a?(this._x=c*k*f+h*d*e,this._y=h*d*f+c*k*e,this._z=h*k*e-c*d*f,this._w=h*k*f-c*d*e):"XZY"===a&&(this._x=c*k*f-h*d*e,this._y=h*d*f-c*k*e,this._z=h*k*e+c*d*f,this._w=h*k*f+c*d*e);if(!1!==b)this.onChangeCallback();return this},setFromAxisAngle:function(a,
b){b/=2;var c=Math.sin(b);this._x=a.x*c;this._y=a.y*c;this._z=a.z*c;this._w=Math.cos(b);this.onChangeCallback();return this},setFromRotationMatrix:function(a){var b=a.elements,c=b[0];a=b[4];var d=b[8],e=b[1],f=b[5],g=b[9],h=b[2],k=b[6];b=b[10];var m=c+f+b;0<m?(c=.5/Math.sqrt(m+1),this._w=.25/c,this._x=(k-g)*c,this._y=(d-h)*c,this._z=(e-a)*c):c>f&&c>b?(c=2*Math.sqrt(1+c-f-b),this._w=(k-g)/c,this._x=.25*c,this._y=(a+e)/c,this._z=(d+h)/c):f>b?(c=2*Math.sqrt(1+f-c-b),this._w=(d-h)/c,this._x=(a+e)/c,this._y=
.25*c,this._z=(g+k)/c):(c=2*Math.sqrt(1+b-c-f),this._w=(e-a)/c,this._x=(d+h)/c,this._y=(g+k)/c,this._z=.25*c);this.onChangeCallback();return this},setFromUnitVectors:function(){var a=new p,b;return function(c,d){void 0===a&&(a=new p);b=c.dot(d)+1;1E-6>b?(b=0,Math.abs(c.x)>Math.abs(c.z)?a.set(-c.y,c.x,0):a.set(0,-c.z,c.y)):a.crossVectors(c,d);this._x=a.x;this._y=a.y;this._z=a.z;this._w=b;return this.normalize()}}(),angleTo:function(a){return 2*Math.acos(Math.abs(K.clamp(this.dot(a),-1,1)))},rotateTowards:function(a,
b){var c=this.angleTo(a);if(0===c)return this;this.slerp(a,Math.min(1,b/c));return this},inverse:function(){return this.conjugate()},conjugate:function(){this._x*=-1;this._y*=-1;this._z*=-1;this.onChangeCallback();return this},dot:function(a){return this._x*a._x+this._y*a._y+this._z*a._z+this._w*a._w},lengthSq:function(){return this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w},length:function(){return Math.sqrt(this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w)},normalize:function(){var a=
this.length();0===a?(this._z=this._y=this._x=0,this._w=1):(a=1/a,this._x*=a,this._y*=a,this._z*=a,this._w*=a);this.onChangeCallback();return this},multiply:function(a,b){return void 0!==b?(console.warn("THREE.Quaternion: .multiply() now only accepts one argument. Use .multiplyQuaternions( a, b ) instead."),this.multiplyQuaternions(a,b)):this.multiplyQuaternions(this,a)},premultiply:function(a){return this.multiplyQuaternions(a,this)},multiplyQuaternions:function(a,b){var c=a._x,d=a._y,e=a._z;a=a._w;
var f=b._x,g=b._y,h=b._z;b=b._w;this._x=c*b+a*f+d*h-e*g;this._y=d*b+a*g+e*f-c*h;this._z=e*b+a*h+c*g-d*f;this._w=a*b-c*f-d*g-e*h;this.onChangeCallback();return this},slerp:function(a,b){if(0===b)return this;if(1===b)return this.copy(a);var c=this._x,d=this._y,e=this._z,f=this._w,g=f*a._w+c*a._x+d*a._y+e*a._z;0>g?(this._w=-a._w,this._x=-a._x,this._y=-a._y,this._z=-a._z,g=-g):this.copy(a);if(1<=g)return this._w=f,this._x=c,this._y=d,this._z=e,this;a=1-g*g;if(a<=Number.EPSILON)return g=1-b,this._w=g*
f+b*this._w,this._x=g*c+b*this._x,this._y=g*d+b*this._y,this._z=g*e+b*this._z,this.normalize();a=Math.sqrt(a);var h=Math.atan2(a,g);g=Math.sin((1-b)*h)/a;b=Math.sin(b*h)/a;this._w=f*g+this._w*b;this._x=c*g+this._x*b;this._y=d*g+this._y*b;this._z=e*g+this._z*b;this.onChangeCallback();return this},equals:function(a){return a._x===this._x&&a._y===this._y&&a._z===this._z&&a._w===this._w},fromArray:function(a,b){void 0===b&&(b=0);this._x=a[b];this._y=a[b+1];this._z=a[b+2];this._w=a[b+3];this.onChangeCallback();
return this},toArray:function(a,b){void 0===a&&(a=[]);void 0===b&&(b=0);a[b]=this._x;a[b+1]=this._y;a[b+2]=this._z;a[b+3]=this._w;return a},onChange:function(a){this.onChangeCallback=a;return this},onChangeCallback:function(){}});Object.assign(p.prototype,{isVector3:!0,set:function(a,b,c){this.x=a;this.y=b;this.z=c;return this},setScalar:function(a){this.z=this.y=this.x=a;return this},setX:function(a){this.x=a;return this},setY:function(a){this.y=a;return this},setZ:function(a){this.z=a;return this},
setComponent:function(a,b){switch(a){case 0:this.x=b;break;case 1:this.y=b;break;case 2:this.z=b;break;default:throw Error("index is out of range: "+a);}return this},getComponent:function(a){switch(a){case 0:return this.x;case 1:return this.y;case 2:return this.z;default:throw Error("index is out of range: "+a);}},clone:function(){return new this.constructor(this.x,this.y,this.z)},copy:function(a){this.x=a.x;this.y=a.y;this.z=a.z;return this},add:function(a,b){if(void 0!==b)return console.warn("THREE.Vector3: .add() now only accepts one argument. Use .addVectors( a, b ) instead."),
this.addVectors(a,b);this.x+=a.x;this.y+=a.y;this.z+=a.z;return this},addScalar:function(a){this.x+=a;this.y+=a;this.z+=a;return this},addVectors:function(a,b){this.x=a.x+b.x;this.y=a.y+b.y;this.z=a.z+b.z;return this},addScaledVector:function(a,b){this.x+=a.x*b;this.y+=a.y*b;this.z+=a.z*b;return this},sub:function(a,b){if(void 0!==b)return console.warn("THREE.Vector3: .sub() now only accepts one argument. Use .subVectors( a, b ) instead."),this.subVectors(a,b);this.x-=a.x;this.y-=a.y;this.z-=a.z;
return this},subScalar:function(a){this.x-=a;this.y-=a;this.z-=a;return this},subVectors:function(a,b){this.x=a.x-b.x;this.y=a.y-b.y;this.z=a.z-b.z;return this},multiply:function(a,b){if(void 0!==b)return console.warn("THREE.Vector3: .multiply() now only accepts one argument. Use .multiplyVectors( a, b ) instead."),this.multiplyVectors(a,b);this.x*=a.x;this.y*=a.y;this.z*=a.z;return this},multiplyScalar:function(a){this.x*=a;this.y*=a;this.z*=a;return this},multiplyVectors:function(a,b){this.x=a.x*
b.x;this.y=a.y*b.y;this.z=a.z*b.z;return this},applyEuler:function(){var a=new ha;return function(b){b&&b.isEuler||console.error("THREE.Vector3: .applyEuler() now expects an Euler rotation rather than a Vector3 and order.");return this.applyQuaternion(a.setFromEuler(b))}}(),applyAxisAngle:function(){var a=new ha;return function(b,c){return this.applyQuaternion(a.setFromAxisAngle(b,c))}}(),applyMatrix3:function(a){var b=this.x,c=this.y,d=this.z;a=a.elements;this.x=a[0]*b+a[3]*c+a[6]*d;this.y=a[1]*
b+a[4]*c+a[7]*d;this.z=a[2]*b+a[5]*c+a[8]*d;return this},applyMatrix4:function(a){var b=this.x,c=this.y,d=this.z;a=a.elements;var e=1/(a[3]*b+a[7]*c+a[11]*d+a[15]);this.x=(a[0]*b+a[4]*c+a[8]*d+a[12])*e;this.y=(a[1]*b+a[5]*c+a[9]*d+a[13])*e;this.z=(a[2]*b+a[6]*c+a[10]*d+a[14])*e;return this},applyQuaternion:function(a){var b=this.x,c=this.y,d=this.z,e=a.x,f=a.y,g=a.z;a=a.w;var h=a*b+f*d-g*c,k=a*c+g*b-e*d,m=a*d+e*c-f*b;b=-e*b-f*c-g*d;this.x=h*a+b*-e+k*-g-m*-f;this.y=k*a+b*-f+m*-e-h*-g;this.z=m*a+b*
-g+h*-f-k*-e;return this},project:function(a){return this.applyMatrix4(a.matrixWorldInverse).applyMatrix4(a.projectionMatrix)},unproject:function(){var a=new J;return function(b){return this.applyMatrix4(a.getInverse(b.projectionMatrix)).applyMatrix4(b.matrixWorld)}}(),transformDirection:function(a){var b=this.x,c=this.y,d=this.z;a=a.elements;this.x=a[0]*b+a[4]*c+a[8]*d;this.y=a[1]*b+a[5]*c+a[9]*d;this.z=a[2]*b+a[6]*c+a[10]*d;return this.normalize()},divide:function(a){this.x/=a.x;this.y/=a.y;this.z/=
a.z;return this},divideScalar:function(a){return this.multiplyScalar(1/a)},min:function(a){this.x=Math.min(this.x,a.x);this.y=Math.min(this.y,a.y);this.z=Math.min(this.z,a.z);return this},max:function(a){this.x=Math.max(this.x,a.x);this.y=Math.max(this.y,a.y);this.z=Math.max(this.z,a.z);return this},clamp:function(a,b){this.x=Math.max(a.x,Math.min(b.x,this.x));this.y=Math.max(a.y,Math.min(b.y,this.y));this.z=Math.max(a.z,Math.min(b.z,this.z));return this},clampScalar:function(){var a=new p,b=new p;
return function(c,d){a.set(c,c,c);b.set(d,d,d);return this.clamp(a,b)}}(),clampLength:function(a,b){var c=this.length();return this.divideScalar(c||1).multiplyScalar(Math.max(a,Math.min(b,c)))},floor:function(){this.x=Math.floor(this.x);this.y=Math.floor(this.y);this.z=Math.floor(this.z);return this},ceil:function(){this.x=Math.ceil(this.x);this.y=Math.ceil(this.y);this.z=Math.ceil(this.z);return this},round:function(){this.x=Math.round(this.x);this.y=Math.round(this.y);this.z=Math.round(this.z);
return this},roundToZero:function(){this.x=0>this.x?Math.ceil(this.x):Math.floor(this.x);this.y=0>this.y?Math.ceil(this.y):Math.floor(this.y);this.z=0>this.z?Math.ceil(this.z):Math.floor(this.z);return this},negate:function(){this.x=-this.x;this.y=-this.y;this.z=-this.z;return this},dot:function(a){return this.x*a.x+this.y*a.y+this.z*a.z},lengthSq:function(){return this.x*this.x+this.y*this.y+this.z*this.z},length:function(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z)},manhattanLength:function(){return Math.abs(this.x)+
Math.abs(this.y)+Math.abs(this.z)},normalize:function(){return this.divideScalar(this.length()||1)},setLength:function(a){return this.normalize().multiplyScalar(a)},lerp:function(a,b){this.x+=(a.x-this.x)*b;this.y+=(a.y-this.y)*b;this.z+=(a.z-this.z)*b;return this},lerpVectors:function(a,b,c){return this.subVectors(b,a).multiplyScalar(c).add(a)},cross:function(a,b){return void 0!==b?(console.warn("THREE.Vector3: .cross() now only accepts one argument. Use .crossVectors( a, b ) instead."),this.crossVectors(a,
b)):this.crossVectors(this,a)},crossVectors:function(a,b){var c=a.x,d=a.y;a=a.z;var e=b.x,f=b.y;b=b.z;this.x=d*b-a*f;this.y=a*e-c*b;this.z=c*f-d*e;return this},projectOnVector:function(a){var b=a.dot(this)/a.lengthSq();return this.copy(a).multiplyScalar(b)},projectOnPlane:function(){var a=new p;return function(b){a.copy(this).projectOnVector(b);return this.sub(a)}}(),reflect:function(){var a=new p;return function(b){return this.sub(a.copy(b).multiplyScalar(2*this.dot(b)))}}(),angleTo:function(a){a=
this.dot(a)/Math.sqrt(this.lengthSq()*a.lengthSq());return Math.acos(K.clamp(a,-1,1))},distanceTo:function(a){return Math.sqrt(this.distanceToSquared(a))},distanceToSquared:function(a){var b=this.x-a.x,c=this.y-a.y;a=this.z-a.z;return b*b+c*c+a*a},manhattanDistanceTo:function(a){return Math.abs(this.x-a.x)+Math.abs(this.y-a.y)+Math.abs(this.z-a.z)},setFromSpherical:function(a){return this.setFromSphericalCoords(a.radius,a.phi,a.theta)},setFromSphericalCoords:function(a,b,c){var d=Math.sin(b)*a;this.x=
d*Math.sin(c);this.y=Math.cos(b)*a;this.z=d*Math.cos(c);return this},setFromCylindrical:function(a){return this.setFromCylindricalCoords(a.radius,a.theta,a.y)},setFromCylindricalCoords:function(a,b,c){this.x=a*Math.sin(b);this.y=c;this.z=a*Math.cos(b);return this},setFromMatrixPosition:function(a){a=a.elements;this.x=a[12];this.y=a[13];this.z=a[14];return this},setFromMatrixScale:function(a){var b=this.setFromMatrixColumn(a,0).length(),c=this.setFromMatrixColumn(a,1).length();a=this.setFromMatrixColumn(a,
2).length();this.x=b;this.y=c;this.z=a;return this},setFromMatrixColumn:function(a,b){return this.fromArray(a.elements,4*b)},equals:function(a){return a.x===this.x&&a.y===this.y&&a.z===this.z},fromArray:function(a,b){void 0===b&&(b=0);this.x=a[b];this.y=a[b+1];this.z=a[b+2];return this},toArray:function(a,b){void 0===a&&(a=[]);void 0===b&&(b=0);a[b]=this.x;a[b+1]=this.y;a[b+2]=this.z;return a},fromBufferAttribute:function(a,b,c){void 0!==c&&console.warn("THREE.Vector3: offset has been removed from .fromBufferAttribute().");
this.x=a.getX(b);this.y=a.getY(b);this.z=a.getZ(b);return this}});Object.assign(na.prototype,{isMatrix3:!0,set:function(a,b,c,d,e,f,g,h,k){var m=this.elements;m[0]=a;m[1]=d;m[2]=g;m[3]=b;m[4]=e;m[5]=h;m[6]=c;m[7]=f;m[8]=k;return this},identity:function(){this.set(1,0,0,0,1,0,0,0,1);return this},clone:function(){return(new this.constructor).fromArray(this.elements)},copy:function(a){var b=this.elements;a=a.elements;b[0]=a[0];b[1]=a[1];b[2]=a[2];b[3]=a[3];b[4]=a[4];b[5]=a[5];b[6]=a[6];b[7]=a[7];b[8]=
a[8];return this},setFromMatrix4:function(a){a=a.elements;this.set(a[0],a[4],a[8],a[1],a[5],a[9],a[2],a[6],a[10]);return this},applyToBufferAttribute:function(){var a=new p;return function(b){for(var c=0,d=b.count;c<d;c++)a.x=b.getX(c),a.y=b.getY(c),a.z=b.getZ(c),a.applyMatrix3(this),b.setXYZ(c,a.x,a.y,a.z);return b}}(),multiply:function(a){return this.multiplyMatrices(this,a)},premultiply:function(a){return this.multiplyMatrices(a,this)},multiplyMatrices:function(a,b){var c=a.elements,d=b.elements;
b=this.elements;a=c[0];var e=c[3],f=c[6],g=c[1],h=c[4],k=c[7],m=c[2],l=c[5];c=c[8];var n=d[0],q=d[3],u=d[6],r=d[1],p=d[4],y=d[7],x=d[2],w=d[5];d=d[8];b[0]=a*n+e*r+f*x;b[3]=a*q+e*p+f*w;b[6]=a*u+e*y+f*d;b[1]=g*n+h*r+k*x;b[4]=g*q+h*p+k*w;b[7]=g*u+h*y+k*d;b[2]=m*n+l*r+c*x;b[5]=m*q+l*p+c*w;b[8]=m*u+l*y+c*d;return this},multiplyScalar:function(a){var b=this.elements;b[0]*=a;b[3]*=a;b[6]*=a;b[1]*=a;b[4]*=a;b[7]*=a;b[2]*=a;b[5]*=a;b[8]*=a;return this},determinant:function(){var a=this.elements,b=a[0],c=a[1],
d=a[2],e=a[3],f=a[4],g=a[5],h=a[6],k=a[7];a=a[8];return b*f*a-b*g*k-c*e*a+c*g*h+d*e*k-d*f*h},getInverse:function(a,b){a&&a.isMatrix4&&console.error("THREE.Matrix3: .getInverse() no longer takes a Matrix4 argument.");var c=a.elements;a=this.elements;var d=c[0],e=c[1],f=c[2],g=c[3],h=c[4],k=c[5],m=c[6],l=c[7];c=c[8];var n=c*h-k*l,q=k*m-c*g,u=l*g-h*m,p=d*n+e*q+f*u;if(0===p){if(!0===b)throw Error("THREE.Matrix3: .getInverse() can't invert matrix, determinant is 0");console.warn("THREE.Matrix3: .getInverse() can't invert matrix, determinant is 0");
return this.identity()}b=1/p;a[0]=n*b;a[1]=(f*l-c*e)*b;a[2]=(k*e-f*h)*b;a[3]=q*b;a[4]=(c*d-f*m)*b;a[5]=(f*g-k*d)*b;a[6]=u*b;a[7]=(e*m-l*d)*b;a[8]=(h*d-e*g)*b;return this},transpose:function(){var a=this.elements;var b=a[1];a[1]=a[3];a[3]=b;b=a[2];a[2]=a[6];a[6]=b;b=a[5];a[5]=a[7];a[7]=b;return this},getNormalMatrix:function(a){return this.setFromMatrix4(a).getInverse(this).transpose()},transposeIntoArray:function(a){var b=this.elements;a[0]=b[0];a[1]=b[3];a[2]=b[6];a[3]=b[1];a[4]=b[4];a[5]=b[7];a[6]=
b[2];a[7]=b[5];a[8]=b[8];return this},setUvTransform:function(a,b,c,d,e,f,g){var h=Math.cos(e);e=Math.sin(e);this.set(c*h,c*e,-c*(h*f+e*g)+f+a,-d*e,d*h,-d*(-e*f+h*g)+g+b,0,0,1)},scale:function(a,b){var c=this.elements;c[0]*=a;c[3]*=a;c[6]*=a;c[1]*=b;c[4]*=b;c[7]*=b;return this},rotate:function(a){var b=Math.cos(a);a=Math.sin(a);var c=this.elements,d=c[0],e=c[3],f=c[6],g=c[1],h=c[4],k=c[7];c[0]=b*d+a*g;c[3]=b*e+a*h;c[6]=b*f+a*k;c[1]=-a*d+b*g;c[4]=-a*e+b*h;c[7]=-a*f+b*k;return this},translate:function(a,
b){var c=this.elements;c[0]+=a*c[2];c[3]+=a*c[5];c[6]+=a*c[8];c[1]+=b*c[2];c[4]+=b*c[5];c[7]+=b*c[8];return this},equals:function(a){var b=this.elements;a=a.elements;for(var c=0;9>c;c++)if(b[c]!==a[c])return!1;return!0},fromArray:function(a,b){void 0===b&&(b=0);for(var c=0;9>c;c++)this.elements[c]=a[c+b];return this},toArray:function(a,b){void 0===a&&(a=[]);void 0===b&&(b=0);var c=this.elements;a[b]=c[0];a[b+1]=c[1];a[b+2]=c[2];a[b+3]=c[3];a[b+4]=c[4];a[b+5]=c[5];a[b+6]=c[6];a[b+7]=c[7];a[b+8]=c[8];
return a}});var gb={getDataURL:function(a){if(a instanceof HTMLCanvasElement)var b=a;else{b=document.createElementNS("http://www.w3.org/1999/xhtml","canvas");b.width=a.width;b.height=a.height;var c=b.getContext("2d");a instanceof ImageData?c.putImageData(a,0,0):c.drawImage(a,0,0,a.width,a.height)}return 2048<b.width||2048<b.height?b.toDataURL("image/jpeg",.6):b.toDataURL("image/png")}},Df=0;T.DEFAULT_IMAGE=void 0;T.DEFAULT_MAPPING=300;T.prototype=Object.assign(Object.create(ea.prototype),{constructor:T,
isTexture:!0,updateMatrix:function(){this.matrix.setUvTransform(this.offset.x,this.offset.y,this.repeat.x,this.repeat.y,this.rotation,this.center.x,this.center.y)},clone:function(){return(new this.constructor).copy(this)},copy:function(a){this.name=a.name;this.image=a.image;this.mipmaps=a.mipmaps.slice(0);this.mapping=a.mapping;this.wrapS=a.wrapS;this.wrapT=a.wrapT;this.magFilter=a.magFilter;this.minFilter=a.minFilter;this.anisotropy=a.anisotropy;this.format=a.format;this.type=a.type;this.offset.copy(a.offset);
this.repeat.copy(a.repeat);this.center.copy(a.center);this.rotation=a.rotation;this.matrixAutoUpdate=a.matrixAutoUpdate;this.matrix.copy(a.matrix);this.generateMipmaps=a.generateMipmaps;this.premultiplyAlpha=a.premultiplyAlpha;this.flipY=a.flipY;this.unpackAlignment=a.unpackAlignment;this.encoding=a.encoding;return this},toJSON:function(a){var b=void 0===a||"string"===typeof a;if(!b&&void 0!==a.textures[this.uuid])return a.textures[this.uuid];var c={metadata:{version:4.5,type:"Texture",generator:"Texture.toJSON"},
uuid:this.uuid,name:this.name,mapping:this.mapping,repeat:[this.repeat.x,this.repeat.y],offset:[this.offset.x,this.offset.y],center:[this.center.x,this.center.y],rotation:this.rotation,wrap:[this.wrapS,this.wrapT],format:this.format,minFilter:this.minFilter,magFilter:this.magFilter,anisotropy:this.anisotropy,flipY:this.flipY};if(void 0!==this.image){var d=this.image;void 0===d.uuid&&(d.uuid=K.generateUUID());if(!b&&void 0===a.images[d.uuid]){if(Array.isArray(d)){var e=[];for(var f=0,g=d.length;f<
g;f++)e.push(gb.getDataURL(d[f]))}else e=gb.getDataURL(d);a.images[d.uuid]={uuid:d.uuid,url:e}}c.image=d.uuid}b||(a.textures[this.uuid]=c);return c},dispose:function(){this.dispatchEvent({type:"dispose"})},transformUv:function(a){if(300!==this.mapping)return a;a.applyMatrix3(this.matrix);if(0>a.x||1<a.x)switch(this.wrapS){case 1E3:a.x-=Math.floor(a.x);break;case 1001:a.x=0>a.x?0:1;break;case 1002:a.x=1===Math.abs(Math.floor(a.x)%2)?Math.ceil(a.x)-a.x:a.x-Math.floor(a.x)}if(0>a.y||1<a.y)switch(this.wrapT){case 1E3:a.y-=
Math.floor(a.y);break;case 1001:a.y=0>a.y?0:1;break;case 1002:a.y=1===Math.abs(Math.floor(a.y)%2)?Math.ceil(a.y)-a.y:a.y-Math.floor(a.y)}this.flipY&&(a.y=1-a.y);return a}});Object.defineProperty(T.prototype,"needsUpdate",{set:function(a){!0===a&&this.version++}});Object.assign(aa.prototype,{isVector4:!0,set:function(a,b,c,d){this.x=a;this.y=b;this.z=c;this.w=d;return this},setScalar:function(a){this.w=this.z=this.y=this.x=a;return this},setX:function(a){this.x=a;return this},setY:function(a){this.y=
a;return this},setZ:function(a){this.z=a;return this},setW:function(a){this.w=a;return this},setComponent:function(a,b){switch(a){case 0:this.x=b;break;case 1:this.y=b;break;case 2:this.z=b;break;case 3:this.w=b;break;default:throw Error("index is out of range: "+a);}return this},getComponent:function(a){switch(a){case 0:return this.x;case 1:return this.y;case 2:return this.z;case 3:return this.w;default:throw Error("index is out of range: "+a);}},clone:function(){return new this.constructor(this.x,
this.y,this.z,this.w)},copy:function(a){this.x=a.x;this.y=a.y;this.z=a.z;this.w=void 0!==a.w?a.w:1;return this},add:function(a,b){if(void 0!==b)return console.warn("THREE.Vector4: .add() now only accepts one argument. Use .addVectors( a, b ) instead."),this.addVectors(a,b);this.x+=a.x;this.y+=a.y;this.z+=a.z;this.w+=a.w;return this},addScalar:function(a){this.x+=a;this.y+=a;this.z+=a;this.w+=a;return this},addVectors:function(a,b){this.x=a.x+b.x;this.y=a.y+b.y;this.z=a.z+b.z;this.w=a.w+b.w;return this},
addScaledVector:function(a,b){this.x+=a.x*b;this.y+=a.y*b;this.z+=a.z*b;this.w+=a.w*b;return this},sub:function(a,b){if(void 0!==b)return console.warn("THREE.Vector4: .sub() now only accepts one argument. Use .subVectors( a, b ) instead."),this.subVectors(a,b);this.x-=a.x;this.y-=a.y;this.z-=a.z;this.w-=a.w;return this},subScalar:function(a){this.x-=a;this.y-=a;this.z-=a;this.w-=a;return this},subVectors:function(a,b){this.x=a.x-b.x;this.y=a.y-b.y;this.z=a.z-b.z;this.w=a.w-b.w;return this},multiplyScalar:function(a){this.x*=
a;this.y*=a;this.z*=a;this.w*=a;return this},applyMatrix4:function(a){var b=this.x,c=this.y,d=this.z,e=this.w;a=a.elements;this.x=a[0]*b+a[4]*c+a[8]*d+a[12]*e;this.y=a[1]*b+a[5]*c+a[9]*d+a[13]*e;this.z=a[2]*b+a[6]*c+a[10]*d+a[14]*e;this.w=a[3]*b+a[7]*c+a[11]*d+a[15]*e;return this},divideScalar:function(a){return this.multiplyScalar(1/a)},setAxisAngleFromQuaternion:function(a){this.w=2*Math.acos(a.w);var b=Math.sqrt(1-a.w*a.w);1E-4>b?(this.x=1,this.z=this.y=0):(this.x=a.x/b,this.y=a.y/b,this.z=a.z/
b);return this},setAxisAngleFromRotationMatrix:function(a){a=a.elements;var b=a[0];var c=a[4];var d=a[8],e=a[1],f=a[5],g=a[9];var h=a[2];var k=a[6];var m=a[10];if(.01>Math.abs(c-e)&&.01>Math.abs(d-h)&&.01>Math.abs(g-k)){if(.1>Math.abs(c+e)&&.1>Math.abs(d+h)&&.1>Math.abs(g+k)&&.1>Math.abs(b+f+m-3))return this.set(1,0,0,0),this;a=Math.PI;b=(b+1)/2;f=(f+1)/2;m=(m+1)/2;c=(c+e)/4;d=(d+h)/4;g=(g+k)/4;b>f&&b>m?.01>b?(k=0,c=h=.707106781):(k=Math.sqrt(b),h=c/k,c=d/k):f>m?.01>f?(k=.707106781,h=0,c=.707106781):
(h=Math.sqrt(f),k=c/h,c=g/h):.01>m?(h=k=.707106781,c=0):(c=Math.sqrt(m),k=d/c,h=g/c);this.set(k,h,c,a);return this}a=Math.sqrt((k-g)*(k-g)+(d-h)*(d-h)+(e-c)*(e-c));.001>Math.abs(a)&&(a=1);this.x=(k-g)/a;this.y=(d-h)/a;this.z=(e-c)/a;this.w=Math.acos((b+f+m-1)/2);return this},min:function(a){this.x=Math.min(this.x,a.x);this.y=Math.min(this.y,a.y);this.z=Math.min(this.z,a.z);this.w=Math.min(this.w,a.w);return this},max:function(a){this.x=Math.max(this.x,a.x);this.y=Math.max(this.y,a.y);this.z=Math.max(this.z,
a.z);this.w=Math.max(this.w,a.w);return this},clamp:function(a,b){this.x=Math.max(a.x,Math.min(b.x,this.x));this.y=Math.max(a.y,Math.min(b.y,this.y));this.z=Math.max(a.z,Math.min(b.z,this.z));this.w=Math.max(a.w,Math.min(b.w,this.w));return this},clampScalar:function(){var a,b;return function(c,d){void 0===a&&(a=new aa,b=new aa);a.set(c,c,c,c);b.set(d,d,d,d);return this.clamp(a,b)}}(),clampLength:function(a,b){var c=this.length();return this.divideScalar(c||1).multiplyScalar(Math.max(a,Math.min(b,
c)))},floor:function(){this.x=Math.floor(this.x);this.y=Math.floor(this.y);this.z=Math.floor(this.z);this.w=Math.floor(this.w);return this},ceil:function(){this.x=Math.ceil(this.x);this.y=Math.ceil(this.y);this.z=Math.ceil(this.z);this.w=Math.ceil(this.w);return this},round:function(){this.x=Math.round(this.x);this.y=Math.round(this.y);this.z=Math.round(this.z);this.w=Math.round(this.w);return this},roundToZero:function(){this.x=0>this.x?Math.ceil(this.x):Math.floor(this.x);this.y=0>this.y?Math.ceil(this.y):
Math.floor(this.y);this.z=0>this.z?Math.ceil(this.z):Math.floor(this.z);this.w=0>this.w?Math.ceil(this.w):Math.floor(this.w);return this},negate:function(){this.x=-this.x;this.y=-this.y;this.z=-this.z;this.w=-this.w;return this},dot:function(a){return this.x*a.x+this.y*a.y+this.z*a.z+this.w*a.w},lengthSq:function(){return this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w},length:function(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w)},manhattanLength:function(){return Math.abs(this.x)+
Math.abs(this.y)+Math.abs(this.z)+Math.abs(this.w)},normalize:function(){return this.divideScalar(this.length()||1)},setLength:function(a){return this.normalize().multiplyScalar(a)},lerp:function(a,b){this.x+=(a.x-this.x)*b;this.y+=(a.y-this.y)*b;this.z+=(a.z-this.z)*b;this.w+=(a.w-this.w)*b;return this},lerpVectors:function(a,b,c){return this.subVectors(b,a).multiplyScalar(c).add(a)},equals:function(a){return a.x===this.x&&a.y===this.y&&a.z===this.z&&a.w===this.w},fromArray:function(a,b){void 0===
b&&(b=0);this.x=a[b];this.y=a[b+1];this.z=a[b+2];this.w=a[b+3];return this},toArray:function(a,b){void 0===a&&(a=[]);void 0===b&&(b=0);a[b]=this.x;a[b+1]=this.y;a[b+2]=this.z;a[b+3]=this.w;return a},fromBufferAttribute:function(a,b,c){void 0!==c&&console.warn("THREE.Vector4: offset has been removed from .fromBufferAttribute().");this.x=a.getX(b);this.y=a.getY(b);this.z=a.getZ(b);this.w=a.getW(b);return this}});hb.prototype=Object.assign(Object.create(ea.prototype),{constructor:hb,isWebGLRenderTarget:!0,
setSize:function(a,b){if(this.width!==a||this.height!==b)this.width=a,this.height=b,this.dispose();this.viewport.set(0,0,a,b);this.scissor.set(0,0,a,b)},clone:function(){return(new this.constructor).copy(this)},copy:function(a){this.width=a.width;this.height=a.height;this.viewport.copy(a.viewport);this.texture=a.texture.clone();this.depthBuffer=a.depthBuffer;this.stencilBuffer=a.stencilBuffer;this.depthTexture=a.depthTexture;return this},dispose:function(){this.dispatchEvent({type:"dispose"})}});
Ib.prototype=Object.create(hb.prototype);Ib.prototype.constructor=Ib;Ib.prototype.isWebGLRenderTargetCube=!0;ib.prototype=Object.create(T.prototype);ib.prototype.constructor=ib;ib.prototype.isDataTexture=!0;Object.assign(Ua.prototype,{isBox3:!0,set:function(a,b){this.min.copy(a);this.max.copy(b);return this},setFromArray:function(a){for(var b=Infinity,c=Infinity,d=Infinity,e=-Infinity,f=-Infinity,g=-Infinity,h=0,k=a.length;h<k;h+=3){var m=a[h],l=a[h+1],n=a[h+2];m<b&&(b=m);l<c&&(c=l);n<d&&(d=n);m>
e&&(e=m);l>f&&(f=l);n>g&&(g=n)}this.min.set(b,c,d);this.max.set(e,f,g);return this},setFromBufferAttribute:function(a){for(var b=Infinity,c=Infinity,d=Infinity,e=-Infinity,f=-Infinity,g=-Infinity,h=0,k=a.count;h<k;h++){var m=a.getX(h),l=a.getY(h),n=a.getZ(h);m<b&&(b=m);l<c&&(c=l);n<d&&(d=n);m>e&&(e=m);l>f&&(f=l);n>g&&(g=n)}this.min.set(b,c,d);this.max.set(e,f,g);return this},setFromPoints:function(a){this.makeEmpty();for(var b=0,c=a.length;b<c;b++)this.expandByPoint(a[b]);return this},setFromCenterAndSize:function(){var a=
new p;return function(b,c){c=a.copy(c).multiplyScalar(.5);this.min.copy(b).sub(c);this.max.copy(b).add(c);return this}}(),setFromObject:function(a){this.makeEmpty();return this.expandByObject(a)},clone:function(){return(new this.constructor).copy(this)},copy:function(a){this.min.copy(a.min);this.max.copy(a.max);return this},makeEmpty:function(){this.min.x=this.min.y=this.min.z=Infinity;this.max.x=this.max.y=this.max.z=-Infinity;return this},isEmpty:function(){return this.max.x<this.min.x||this.max.y<
this.min.y||this.max.z<this.min.z},getCenter:function(a){void 0===a&&(console.warn("THREE.Box3: .getCenter() target is now required"),a=new p);return this.isEmpty()?a.set(0,0,0):a.addVectors(this.min,this.max).multiplyScalar(.5)},getSize:function(a){void 0===a&&(console.warn("THREE.Box3: .getSize() target is now required"),a=new p);return this.isEmpty()?a.set(0,0,0):a.subVectors(this.max,this.min)},expandByPoint:function(a){this.min.min(a);this.max.max(a);return this},expandByVector:function(a){this.min.sub(a);
this.max.add(a);return this},expandByScalar:function(a){this.min.addScalar(-a);this.max.addScalar(a);return this},expandByObject:function(){function a(a){var f=a.geometry;if(void 0!==f)if(f.isGeometry)for(f=f.vertices,c=0,d=f.length;c<d;c++)e.copy(f[c]),e.applyMatrix4(a.matrixWorld),b.expandByPoint(e);else if(f.isBufferGeometry&&(f=f.attributes.position,void 0!==f))for(c=0,d=f.count;c<d;c++)e.fromBufferAttribute(f,c).applyMatrix4(a.matrixWorld),b.expandByPoint(e)}var b,c,d,e=new p;return function(c){b=
this;c.updateMatrixWorld(!0);c.traverse(a);return this}}(),containsPoint:function(a){return a.x<this.min.x||a.x>this.max.x||a.y<this.min.y||a.y>this.max.y||a.z<this.min.z||a.z>this.max.z?!1:!0},containsBox:function(a){return this.min.x<=a.min.x&&a.max.x<=this.max.x&&this.min.y<=a.min.y&&a.max.y<=this.max.y&&this.min.z<=a.min.z&&a.max.z<=this.max.z},getParameter:function(a,b){void 0===b&&(console.warn("THREE.Box3: .getParameter() target is now required"),b=new p);return b.set((a.x-this.min.x)/(this.max.x-
this.min.x),(a.y-this.min.y)/(this.max.y-this.min.y),(a.z-this.min.z)/(this.max.z-this.min.z))},intersectsBox:function(a){return a.max.x<this.min.x||a.min.x>this.max.x||a.max.y<this.min.y||a.min.y>this.max.y||a.max.z<this.min.z||a.min.z>this.max.z?!1:!0},intersectsSphere:function(){var a=new p;return function(b){this.clampPoint(b.center,a);return a.distanceToSquared(b.center)<=b.radius*b.radius}}(),intersectsPlane:function(a){if(0<a.normal.x){var b=a.normal.x*this.min.x;var c=a.normal.x*this.max.x}else b=
a.normal.x*this.max.x,c=a.normal.x*this.min.x;0<a.normal.y?(b+=a.normal.y*this.min.y,c+=a.normal.y*this.max.y):(b+=a.normal.y*this.max.y,c+=a.normal.y*this.min.y);0<a.normal.z?(b+=a.normal.z*this.min.z,c+=a.normal.z*this.max.z):(b+=a.normal.z*this.max.z,c+=a.normal.z*this.min.z);return b<=a.constant&&c>=a.constant},intersectsTriangle:function(){function a(a){var e;var f=0;for(e=a.length-3;f<=e;f+=3){h.fromArray(a,f);var g=m.x*Math.abs(h.x)+m.y*Math.abs(h.y)+m.z*Math.abs(h.z),k=b.dot(h),l=c.dot(h),
n=d.dot(h);if(Math.max(-Math.max(k,l,n),Math.min(k,l,n))>g)return!1}return!0}var b=new p,c=new p,d=new p,e=new p,f=new p,g=new p,h=new p,k=new p,m=new p,l=new p;return function(h){if(this.isEmpty())return!1;this.getCenter(k);m.subVectors(this.max,k);b.subVectors(h.a,k);c.subVectors(h.b,k);d.subVectors(h.c,k);e.subVectors(c,b);f.subVectors(d,c);g.subVectors(b,d);h=[0,-e.z,e.y,0,-f.z,f.y,0,-g.z,g.y,e.z,0,-e.x,f.z,0,-f.x,g.z,0,-g.x,-e.y,e.x,0,-f.y,f.x,0,-g.y,g.x,0];if(!a(h))return!1;h=[1,0,0,0,1,0,0,
0,1];if(!a(h))return!1;l.crossVectors(e,f);h=[l.x,l.y,l.z];return a(h)}}(),clampPoint:function(a,b){void 0===b&&(console.warn("THREE.Box3: .clampPoint() target is now required"),b=new p);return b.copy(a).clamp(this.min,this.max)},distanceToPoint:function(){var a=new p;return function(b){return a.copy(b).clamp(this.min,this.max).sub(b).length()}}(),getBoundingSphere:function(){var a=new p;return function(b){void 0===b&&(console.warn("THREE.Box3: .getBoundingSphere() target is now required"),b=new Ea);
this.getCenter(b.center);b.radius=.5*this.getSize(a).length();return b}}(),intersect:function(a){this.min.max(a.min);this.max.min(a.max);this.isEmpty()&&this.makeEmpty();return this},union:function(a){this.min.min(a.min);this.max.max(a.max);return this},applyMatrix4:function(){var a=[new p,new p,new p,new p,new p,new p,new p,new p];return function(b){if(this.isEmpty())return this;a[0].set(this.min.x,this.min.y,this.min.z).applyMatrix4(b);a[1].set(this.min.x,this.min.y,this.max.z).applyMatrix4(b);
a[2].set(this.min.x,this.max.y,this.min.z).applyMatrix4(b);a[3].set(this.min.x,this.max.y,this.max.z).applyMatrix4(b);a[4].set(this.max.x,this.min.y,this.min.z).applyMatrix4(b);a[5].set(this.max.x,this.min.y,this.max.z).applyMatrix4(b);a[6].set(this.max.x,this.max.y,this.min.z).applyMatrix4(b);a[7].set(this.max.x,this.max.y,this.max.z).applyMatrix4(b);this.setFromPoints(a);return this}}(),translate:function(a){this.min.add(a);this.max.add(a);return this},equals:function(a){return a.min.equals(this.min)&&
a.max.equals(this.max)}});Object.assign(Ea.prototype,{set:function(a,b){this.center.copy(a);this.radius=b;return this},setFromPoints:function(){var a=new Ua;return function(b,c){var d=this.center;void 0!==c?d.copy(c):a.setFromPoints(b).getCenter(d);for(var e=c=0,f=b.length;e<f;e++)c=Math.max(c,d.distanceToSquared(b[e]));this.radius=Math.sqrt(c);return this}}(),clone:function(){return(new this.constructor).copy(this)},copy:function(a){this.center.copy(a.center);this.radius=a.radius;return this},empty:function(){return 0>=
this.radius},containsPoint:function(a){return a.distanceToSquared(this.center)<=this.radius*this.radius},distanceToPoint:function(a){return a.distanceTo(this.center)-this.radius},intersectsSphere:function(a){var b=this.radius+a.radius;return a.center.distanceToSquared(this.center)<=b*b},intersectsBox:function(a){return a.intersectsSphere(this)},intersectsPlane:function(a){return Math.abs(a.distanceToPoint(this.center))<=this.radius},clampPoint:function(a,b){var c=this.center.distanceToSquared(a);
void 0===b&&(console.warn("THREE.Sphere: .clampPoint() target is now required"),b=new p);b.copy(a);c>this.radius*this.radius&&(b.sub(this.center).normalize(),b.multiplyScalar(this.radius).add(this.center));return b},getBoundingBox:function(a){void 0===a&&(console.warn("THREE.Sphere: .getBoundingBox() target is now required"),a=new Ua);a.set(this.center,this.center);a.expandByScalar(this.radius);return a},applyMatrix4:function(a){this.center.applyMatrix4(a);this.radius*=a.getMaxScaleOnAxis();return this},
translate:function(a){this.center.add(a);return this},equals:function(a){return a.center.equals(this.center)&&a.radius===this.radius}});Object.assign(Oa.prototype,{set:function(a,b){this.normal.copy(a);this.constant=b;return this},setComponents:function(a,b,c,d){this.normal.set(a,b,c);this.constant=d;return this},setFromNormalAndCoplanarPoint:function(a,b){this.normal.copy(a);this.constant=-b.dot(this.normal);return this},setFromCoplanarPoints:function(){var a=new p,b=new p;return function(c,d,e){d=
a.subVectors(e,d).cross(b.subVectors(c,d)).normalize();this.setFromNormalAndCoplanarPoint(d,c);return this}}(),clone:function(){return(new this.constructor).copy(this)},copy:function(a){this.normal.copy(a.normal);this.constant=a.constant;return this},normalize:function(){var a=1/this.normal.length();this.normal.multiplyScalar(a);this.constant*=a;return this},negate:function(){this.constant*=-1;this.normal.negate();return this},distanceToPoint:function(a){return this.normal.dot(a)+this.constant},distanceToSphere:function(a){return this.distanceToPoint(a.center)-
a.radius},projectPoint:function(a,b){void 0===b&&(console.warn("THREE.Plane: .projectPoint() target is now required"),b=new p);return b.copy(this.normal).multiplyScalar(-this.distanceToPoint(a)).add(a)},intersectLine:function(){var a=new p;return function(b,c){void 0===c&&(console.warn("THREE.Plane: .intersectLine() target is now required"),c=new p);var d=b.delta(a),e=this.normal.dot(d);if(0===e){if(0===this.distanceToPoint(b.start))return c.copy(b.start)}else if(e=-(b.start.dot(this.normal)+this.constant)/
e,!(0>e||1<e))return c.copy(d).multiplyScalar(e).add(b.start)}}(),intersectsLine:function(a){var b=this.distanceToPoint(a.start);a=this.distanceToPoint(a.end);return 0>b&&0<a||0>a&&0<b},intersectsBox:function(a){return a.intersectsPlane(this)},intersectsSphere:function(a){return a.intersectsPlane(this)},coplanarPoint:function(a){void 0===a&&(console.warn("THREE.Plane: .coplanarPoint() target is now required"),a=new p);return a.copy(this.normal).multiplyScalar(-this.constant)},applyMatrix4:function(){var a=
new p,b=new na;return function(c,d){d=d||b.getNormalMatrix(c);c=this.coplanarPoint(a).applyMatrix4(c);d=this.normal.applyMatrix3(d).normalize();this.constant=-c.dot(d);return this}}(),translate:function(a){this.constant-=a.dot(this.normal);return this},equals:function(a){return a.normal.equals(this.normal)&&a.constant===this.constant}});Object.assign(od.prototype,{set:function(a,b,c,d,e,f){var g=this.planes;g[0].copy(a);g[1].copy(b);g[2].copy(c);g[3].copy(d);g[4].copy(e);g[5].copy(f);return this},
clone:function(){return(new this.constructor).copy(this)},copy:function(a){for(var b=this.planes,c=0;6>c;c++)b[c].copy(a.planes[c]);return this},setFromMatrix:function(a){var b=this.planes,c=a.elements;a=c[0];var d=c[1],e=c[2],f=c[3],g=c[4],h=c[5],k=c[6],m=c[7],l=c[8],n=c[9],q=c[10],p=c[11],r=c[12],v=c[13],y=c[14];c=c[15];b[0].setComponents(f-a,m-g,p-l,c-r).normalize();b[1].setComponents(f+a,m+g,p+l,c+r).normalize();b[2].setComponents(f+d,m+h,p+n,c+v).normalize();b[3].setComponents(f-d,m-h,p-n,c-
v).normalize();b[4].setComponents(f-e,m-k,p-q,c-y).normalize();b[5].setComponents(f+e,m+k,p+q,c+y).normalize();return this},intersectsObject:function(){var a=new Ea;return function(b){var c=b.geometry;null===c.boundingSphere&&c.computeBoundingSphere();a.copy(c.boundingSphere).applyMatrix4(b.matrixWorld);return this.intersectsSphere(a)}}(),intersectsSprite:function(){var a=new Ea;return function(b){a.center.set(0,0,0);a.radius=.7071067811865476;a.applyMatrix4(b.matrixWorld);return this.intersectsSphere(a)}}(),
intersectsSphere:function(a){var b=this.planes,c=a.center;a=-a.radius;for(var d=0;6>d;d++)if(b[d].distanceToPoint(c)<a)return!1;return!0},intersectsBox:function(){var a=new p;return function(b){for(var c=this.planes,d=0;6>d;d++){var e=c[d];a.x=0<e.normal.x?b.max.x:b.min.x;a.y=0<e.normal.y?b.max.y:b.min.y;a.z=0<e.normal.z?b.max.z:b.min.z;if(0>e.distanceToPoint(a))return!1}return!0}}(),containsPoint:function(a){for(var b=this.planes,c=0;6>c;c++)if(0>b[c].distanceToPoint(a))return!1;return!0}});var U=
{alphamap_fragment:"#ifdef USE_ALPHAMAP\n\tdiffuseColor.a *= texture2D( alphaMap, vUv ).g;\n#endif\n",alphamap_pars_fragment:"#ifdef USE_ALPHAMAP\n\tuniform sampler2D alphaMap;\n#endif\n",alphatest_fragment:"#ifdef ALPHATEST\n\tif ( diffuseColor.a < ALPHATEST ) discard;\n#endif\n",aomap_fragment:"#ifdef USE_AOMAP\n\tfloat ambientOcclusion = ( texture2D( aoMap, vUv2 ).r - 1.0 ) * aoMapIntensity + 1.0;\n\treflectedLight.indirectDiffuse *= ambientOcclusion;\n\t#if defined( USE_ENVMAP ) && defined( PHYSICAL )\n\t\tfloat dotNV = saturate( dot( geometry.normal, geometry.viewDir ) );\n\t\treflectedLight.indirectSpecular *= computeSpecularOcclusion( dotNV, ambientOcclusion, material.specularRoughness );\n\t#endif\n#endif\n",
aomap_pars_fragment:"#ifdef USE_AOMAP\n\tuniform sampler2D aoMap;\n\tuniform float aoMapIntensity;\n#endif",begin_vertex:"\nvec3 transformed = vec3( position );\n",beginnormal_vertex:"\nvec3 objectNormal = vec3( normal );\n",bsdfs:"float punctualLightIntensityToIrradianceFactor( const in float lightDistance, const in float cutoffDistance, const in float decayExponent ) {\n\tif( decayExponent > 0.0 ) {\n#if defined ( PHYSICALLY_CORRECT_LIGHTS )\n\t\tfloat distanceFalloff = 1.0 / max( pow( lightDistance, decayExponent ), 0.01 );\n\t\tfloat maxDistanceCutoffFactor = pow2( saturate( 1.0 - pow4( lightDistance / cutoffDistance ) ) );\n\t\treturn distanceFalloff * maxDistanceCutoffFactor;\n#else\n\t\treturn pow( saturate( -lightDistance / cutoffDistance + 1.0 ), decayExponent );\n#endif\n\t}\n\treturn 1.0;\n}\nvec3 BRDF_Diffuse_Lambert( const in vec3 diffuseColor ) {\n\treturn RECIPROCAL_PI * diffuseColor;\n}\nvec3 F_Schlick( const in vec3 specularColor, const in float dotLH ) {\n\tfloat fresnel = exp2( ( -5.55473 * dotLH - 6.98316 ) * dotLH );\n\treturn ( 1.0 - specularColor ) * fresnel + specularColor;\n}\nfloat G_GGX_Smith( const in float alpha, const in float dotNL, const in float dotNV ) {\n\tfloat a2 = pow2( alpha );\n\tfloat gl = dotNL + sqrt( a2 + ( 1.0 - a2 ) * pow2( dotNL ) );\n\tfloat gv = dotNV + sqrt( a2 + ( 1.0 - a2 ) * pow2( dotNV ) );\n\treturn 1.0 / ( gl * gv );\n}\nfloat G_GGX_SmithCorrelated( const in float alpha, const in float dotNL, const in float dotNV ) {\n\tfloat a2 = pow2( alpha );\n\tfloat gv = dotNL * sqrt( a2 + ( 1.0 - a2 ) * pow2( dotNV ) );\n\tfloat gl = dotNV * sqrt( a2 + ( 1.0 - a2 ) * pow2( dotNL ) );\n\treturn 0.5 / max( gv + gl, EPSILON );\n}\nfloat D_GGX( const in float alpha, const in float dotNH ) {\n\tfloat a2 = pow2( alpha );\n\tfloat denom = pow2( dotNH ) * ( a2 - 1.0 ) + 1.0;\n\treturn RECIPROCAL_PI * a2 / pow2( denom );\n}\nvec3 BRDF_Specular_GGX( const in IncidentLight incidentLight, const in GeometricContext geometry, const in vec3 specularColor, const in float roughness ) {\n\tfloat alpha = pow2( roughness );\n\tvec3 halfDir = normalize( incidentLight.direction + geometry.viewDir );\n\tfloat dotNL = saturate( dot( geometry.normal, incidentLight.direction ) );\n\tfloat dotNV = saturate( dot( geometry.normal, geometry.viewDir ) );\n\tfloat dotNH = saturate( dot( geometry.normal, halfDir ) );\n\tfloat dotLH = saturate( dot( incidentLight.direction, halfDir ) );\n\tvec3 F = F_Schlick( specularColor, dotLH );\n\tfloat G = G_GGX_SmithCorrelated( alpha, dotNL, dotNV );\n\tfloat D = D_GGX( alpha, dotNH );\n\treturn F * ( G * D );\n}\nvec2 LTC_Uv( const in vec3 N, const in vec3 V, const in float roughness ) {\n\tconst float LUT_SIZE  = 64.0;\n\tconst float LUT_SCALE = ( LUT_SIZE - 1.0 ) / LUT_SIZE;\n\tconst float LUT_BIAS  = 0.5 / LUT_SIZE;\n\tfloat dotNV = saturate( dot( N, V ) );\n\tvec2 uv = vec2( roughness, sqrt( 1.0 - dotNV ) );\n\tuv = uv * LUT_SCALE + LUT_BIAS;\n\treturn uv;\n}\nfloat LTC_ClippedSphereFormFactor( const in vec3 f ) {\n\tfloat l = length( f );\n\treturn max( ( l * l + f.z ) / ( l + 1.0 ), 0.0 );\n}\nvec3 LTC_EdgeVectorFormFactor( const in vec3 v1, const in vec3 v2 ) {\n\tfloat x = dot( v1, v2 );\n\tfloat y = abs( x );\n\tfloat a = 0.8543985 + ( 0.4965155 + 0.0145206 * y ) * y;\n\tfloat b = 3.4175940 + ( 4.1616724 + y ) * y;\n\tfloat v = a / b;\n\tfloat theta_sintheta = ( x > 0.0 ) ? v : 0.5 * inversesqrt( max( 1.0 - x * x, 1e-7 ) ) - v;\n\treturn cross( v1, v2 ) * theta_sintheta;\n}\nvec3 LTC_Evaluate( const in vec3 N, const in vec3 V, const in vec3 P, const in mat3 mInv, const in vec3 rectCoords[ 4 ] ) {\n\tvec3 v1 = rectCoords[ 1 ] - rectCoords[ 0 ];\n\tvec3 v2 = rectCoords[ 3 ] - rectCoords[ 0 ];\n\tvec3 lightNormal = cross( v1, v2 );\n\tif( dot( lightNormal, P - rectCoords[ 0 ] ) < 0.0 ) return vec3( 0.0 );\n\tvec3 T1, T2;\n\tT1 = normalize( V - N * dot( V, N ) );\n\tT2 = - cross( N, T1 );\n\tmat3 mat = mInv * transposeMat3( mat3( T1, T2, N ) );\n\tvec3 coords[ 4 ];\n\tcoords[ 0 ] = mat * ( rectCoords[ 0 ] - P );\n\tcoords[ 1 ] = mat * ( rectCoords[ 1 ] - P );\n\tcoords[ 2 ] = mat * ( rectCoords[ 2 ] - P );\n\tcoords[ 3 ] = mat * ( rectCoords[ 3 ] - P );\n\tcoords[ 0 ] = normalize( coords[ 0 ] );\n\tcoords[ 1 ] = normalize( coords[ 1 ] );\n\tcoords[ 2 ] = normalize( coords[ 2 ] );\n\tcoords[ 3 ] = normalize( coords[ 3 ] );\n\tvec3 vectorFormFactor = vec3( 0.0 );\n\tvectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 0 ], coords[ 1 ] );\n\tvectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 1 ], coords[ 2 ] );\n\tvectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 2 ], coords[ 3 ] );\n\tvectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 3 ], coords[ 0 ] );\n\tfloat result = LTC_ClippedSphereFormFactor( vectorFormFactor );\n\treturn vec3( result );\n}\nvec3 BRDF_Specular_GGX_Environment( const in GeometricContext geometry, const in vec3 specularColor, const in float roughness ) {\n\tfloat dotNV = saturate( dot( geometry.normal, geometry.viewDir ) );\n\tconst vec4 c0 = vec4( - 1, - 0.0275, - 0.572, 0.022 );\n\tconst vec4 c1 = vec4( 1, 0.0425, 1.04, - 0.04 );\n\tvec4 r = roughness * c0 + c1;\n\tfloat a004 = min( r.x * r.x, exp2( - 9.28 * dotNV ) ) * r.x + r.y;\n\tvec2 AB = vec2( -1.04, 1.04 ) * a004 + r.zw;\n\treturn specularColor * AB.x + AB.y;\n}\nfloat G_BlinnPhong_Implicit( ) {\n\treturn 0.25;\n}\nfloat D_BlinnPhong( const in float shininess, const in float dotNH ) {\n\treturn RECIPROCAL_PI * ( shininess * 0.5 + 1.0 ) * pow( dotNH, shininess );\n}\nvec3 BRDF_Specular_BlinnPhong( const in IncidentLight incidentLight, const in GeometricContext geometry, const in vec3 specularColor, const in float shininess ) {\n\tvec3 halfDir = normalize( incidentLight.direction + geometry.viewDir );\n\tfloat dotNH = saturate( dot( geometry.normal, halfDir ) );\n\tfloat dotLH = saturate( dot( incidentLight.direction, halfDir ) );\n\tvec3 F = F_Schlick( specularColor, dotLH );\n\tfloat G = G_BlinnPhong_Implicit( );\n\tfloat D = D_BlinnPhong( shininess, dotNH );\n\treturn F * ( G * D );\n}\nfloat GGXRoughnessToBlinnExponent( const in float ggxRoughness ) {\n\treturn ( 2.0 / pow2( ggxRoughness + 0.0001 ) - 2.0 );\n}\nfloat BlinnExponentToGGXRoughness( const in float blinnExponent ) {\n\treturn sqrt( 2.0 / ( blinnExponent + 2.0 ) );\n}\n",
bumpmap_pars_fragment:"#ifdef USE_BUMPMAP\n\tuniform sampler2D bumpMap;\n\tuniform float bumpScale;\n\tvec2 dHdxy_fwd() {\n\t\tvec2 dSTdx = dFdx( vUv );\n\t\tvec2 dSTdy = dFdy( vUv );\n\t\tfloat Hll = bumpScale * texture2D( bumpMap, vUv ).x;\n\t\tfloat dBx = bumpScale * texture2D( bumpMap, vUv + dSTdx ).x - Hll;\n\t\tfloat dBy = bumpScale * texture2D( bumpMap, vUv + dSTdy ).x - Hll;\n\t\treturn vec2( dBx, dBy );\n\t}\n\tvec3 perturbNormalArb( vec3 surf_pos, vec3 surf_norm, vec2 dHdxy ) {\n\t\tvec3 vSigmaX = vec3( dFdx( surf_pos.x ), dFdx( surf_pos.y ), dFdx( surf_pos.z ) );\n\t\tvec3 vSigmaY = vec3( dFdy( surf_pos.x ), dFdy( surf_pos.y ), dFdy( surf_pos.z ) );\n\t\tvec3 vN = surf_norm;\n\t\tvec3 R1 = cross( vSigmaY, vN );\n\t\tvec3 R2 = cross( vN, vSigmaX );\n\t\tfloat fDet = dot( vSigmaX, R1 );\n\t\tfDet *= ( float( gl_FrontFacing ) * 2.0 - 1.0 );\n\t\tvec3 vGrad = sign( fDet ) * ( dHdxy.x * R1 + dHdxy.y * R2 );\n\t\treturn normalize( abs( fDet ) * surf_norm - vGrad );\n\t}\n#endif\n",
clipping_planes_fragment:"#if NUM_CLIPPING_PLANES > 0\n\tvec4 plane;\n\t#pragma unroll_loop\n\tfor ( int i = 0; i < UNION_CLIPPING_PLANES; i ++ ) {\n\t\tplane = clippingPlanes[ i ];\n\t\tif ( dot( vViewPosition, plane.xyz ) > plane.w ) discard;\n\t}\n\t#if UNION_CLIPPING_PLANES < NUM_CLIPPING_PLANES\n\t\tbool clipped = true;\n\t\t#pragma unroll_loop\n\t\tfor ( int i = UNION_CLIPPING_PLANES; i < NUM_CLIPPING_PLANES; i ++ ) {\n\t\t\tplane = clippingPlanes[ i ];\n\t\t\tclipped = ( dot( vViewPosition, plane.xyz ) > plane.w ) && clipped;\n\t\t}\n\t\tif ( clipped ) discard;\n\t#endif\n#endif\n",
clipping_planes_pars_fragment:"#if NUM_CLIPPING_PLANES > 0\n\t#if ! defined( PHYSICAL ) && ! defined( PHONG )\n\t\tvarying vec3 vViewPosition;\n\t#endif\n\tuniform vec4 clippingPlanes[ NUM_CLIPPING_PLANES ];\n#endif\n",clipping_planes_pars_vertex:"#if NUM_CLIPPING_PLANES > 0 && ! defined( PHYSICAL ) && ! defined( PHONG )\n\tvarying vec3 vViewPosition;\n#endif\n",clipping_planes_vertex:"#if NUM_CLIPPING_PLANES > 0 && ! defined( PHYSICAL ) && ! defined( PHONG )\n\tvViewPosition = - mvPosition.xyz;\n#endif\n",
color_fragment:"#ifdef USE_COLOR\n\tdiffuseColor.rgb *= vColor;\n#endif",color_pars_fragment:"#ifdef USE_COLOR\n\tvarying vec3 vColor;\n#endif\n",color_pars_vertex:"#ifdef USE_COLOR\n\tvarying vec3 vColor;\n#endif",color_vertex:"#ifdef USE_COLOR\n\tvColor.xyz = color.xyz;\n#endif",common:"#define PI 3.14159265359\n#define PI2 6.28318530718\n#define PI_HALF 1.5707963267949\n#define RECIPROCAL_PI 0.31830988618\n#define RECIPROCAL_PI2 0.15915494\n#define LOG2 1.442695\n#define EPSILON 1e-6\n#define saturate(a) clamp( a, 0.0, 1.0 )\n#define whiteCompliment(a) ( 1.0 - saturate( a ) )\nfloat pow2( const in float x ) { return x*x; }\nfloat pow3( const in float x ) { return x*x*x; }\nfloat pow4( const in float x ) { float x2 = x*x; return x2*x2; }\nfloat average( const in vec3 color ) { return dot( color, vec3( 0.3333 ) ); }\nhighp float rand( const in vec2 uv ) {\n\tconst highp float a = 12.9898, b = 78.233, c = 43758.5453;\n\thighp float dt = dot( uv.xy, vec2( a,b ) ), sn = mod( dt, PI );\n\treturn fract(sin(sn) * c);\n}\nstruct IncidentLight {\n\tvec3 color;\n\tvec3 direction;\n\tbool visible;\n};\nstruct ReflectedLight {\n\tvec3 directDiffuse;\n\tvec3 directSpecular;\n\tvec3 indirectDiffuse;\n\tvec3 indirectSpecular;\n};\nstruct GeometricContext {\n\tvec3 position;\n\tvec3 normal;\n\tvec3 viewDir;\n};\nvec3 transformDirection( in vec3 dir, in mat4 matrix ) {\n\treturn normalize( ( matrix * vec4( dir, 0.0 ) ).xyz );\n}\nvec3 inverseTransformDirection( in vec3 dir, in mat4 matrix ) {\n\treturn normalize( ( vec4( dir, 0.0 ) * matrix ).xyz );\n}\nvec3 projectOnPlane(in vec3 point, in vec3 pointOnPlane, in vec3 planeNormal ) {\n\tfloat distance = dot( planeNormal, point - pointOnPlane );\n\treturn - distance * planeNormal + point;\n}\nfloat sideOfPlane( in vec3 point, in vec3 pointOnPlane, in vec3 planeNormal ) {\n\treturn sign( dot( point - pointOnPlane, planeNormal ) );\n}\nvec3 linePlaneIntersect( in vec3 pointOnLine, in vec3 lineDirection, in vec3 pointOnPlane, in vec3 planeNormal ) {\n\treturn lineDirection * ( dot( planeNormal, pointOnPlane - pointOnLine ) / dot( planeNormal, lineDirection ) ) + pointOnLine;\n}\nmat3 transposeMat3( const in mat3 m ) {\n\tmat3 tmp;\n\ttmp[ 0 ] = vec3( m[ 0 ].x, m[ 1 ].x, m[ 2 ].x );\n\ttmp[ 1 ] = vec3( m[ 0 ].y, m[ 1 ].y, m[ 2 ].y );\n\ttmp[ 2 ] = vec3( m[ 0 ].z, m[ 1 ].z, m[ 2 ].z );\n\treturn tmp;\n}\nfloat linearToRelativeLuminance( const in vec3 color ) {\n\tvec3 weights = vec3( 0.2126, 0.7152, 0.0722 );\n\treturn dot( weights, color.rgb );\n}\n",
cube_uv_reflection_fragment:"#ifdef ENVMAP_TYPE_CUBE_UV\n#define cubeUV_textureSize (1024.0)\nint getFaceFromDirection(vec3 direction) {\n\tvec3 absDirection = abs(direction);\n\tint face = -1;\n\tif( absDirection.x > absDirection.z ) {\n\t\tif(absDirection.x > absDirection.y )\n\t\t\tface = direction.x > 0.0 ? 0 : 3;\n\t\telse\n\t\t\tface = direction.y > 0.0 ? 1 : 4;\n\t}\n\telse {\n\t\tif(absDirection.z > absDirection.y )\n\t\t\tface = direction.z > 0.0 ? 2 : 5;\n\t\telse\n\t\t\tface = direction.y > 0.0 ? 1 : 4;\n\t}\n\treturn face;\n}\n#define cubeUV_maxLods1  (log2(cubeUV_textureSize*0.25) - 1.0)\n#define cubeUV_rangeClamp (exp2((6.0 - 1.0) * 2.0))\nvec2 MipLevelInfo( vec3 vec, float roughnessLevel, float roughness ) {\n\tfloat scale = exp2(cubeUV_maxLods1 - roughnessLevel);\n\tfloat dxRoughness = dFdx(roughness);\n\tfloat dyRoughness = dFdy(roughness);\n\tvec3 dx = dFdx( vec * scale * dxRoughness );\n\tvec3 dy = dFdy( vec * scale * dyRoughness );\n\tfloat d = max( dot( dx, dx ), dot( dy, dy ) );\n\td = clamp(d, 1.0, cubeUV_rangeClamp);\n\tfloat mipLevel = 0.5 * log2(d);\n\treturn vec2(floor(mipLevel), fract(mipLevel));\n}\n#define cubeUV_maxLods2 (log2(cubeUV_textureSize*0.25) - 2.0)\n#define cubeUV_rcpTextureSize (1.0 / cubeUV_textureSize)\nvec2 getCubeUV(vec3 direction, float roughnessLevel, float mipLevel) {\n\tmipLevel = roughnessLevel > cubeUV_maxLods2 - 3.0 ? 0.0 : mipLevel;\n\tfloat a = 16.0 * cubeUV_rcpTextureSize;\n\tvec2 exp2_packed = exp2( vec2( roughnessLevel, mipLevel ) );\n\tvec2 rcp_exp2_packed = vec2( 1.0 ) / exp2_packed;\n\tfloat powScale = exp2_packed.x * exp2_packed.y;\n\tfloat scale = rcp_exp2_packed.x * rcp_exp2_packed.y * 0.25;\n\tfloat mipOffset = 0.75*(1.0 - rcp_exp2_packed.y) * rcp_exp2_packed.x;\n\tbool bRes = mipLevel == 0.0;\n\tscale =  bRes && (scale < a) ? a : scale;\n\tvec3 r;\n\tvec2 offset;\n\tint face = getFaceFromDirection(direction);\n\tfloat rcpPowScale = 1.0 / powScale;\n\tif( face == 0) {\n\t\tr = vec3(direction.x, -direction.z, direction.y);\n\t\toffset = vec2(0.0+mipOffset,0.75 * rcpPowScale);\n\t\toffset.y = bRes && (offset.y < 2.0*a) ? a : offset.y;\n\t}\n\telse if( face == 1) {\n\t\tr = vec3(direction.y, direction.x, direction.z);\n\t\toffset = vec2(scale+mipOffset, 0.75 * rcpPowScale);\n\t\toffset.y = bRes && (offset.y < 2.0*a) ? a : offset.y;\n\t}\n\telse if( face == 2) {\n\t\tr = vec3(direction.z, direction.x, direction.y);\n\t\toffset = vec2(2.0*scale+mipOffset, 0.75 * rcpPowScale);\n\t\toffset.y = bRes && (offset.y < 2.0*a) ? a : offset.y;\n\t}\n\telse if( face == 3) {\n\t\tr = vec3(direction.x, direction.z, direction.y);\n\t\toffset = vec2(0.0+mipOffset,0.5 * rcpPowScale);\n\t\toffset.y = bRes && (offset.y < 2.0*a) ? 0.0 : offset.y;\n\t}\n\telse if( face == 4) {\n\t\tr = vec3(direction.y, direction.x, -direction.z);\n\t\toffset = vec2(scale+mipOffset, 0.5 * rcpPowScale);\n\t\toffset.y = bRes && (offset.y < 2.0*a) ? 0.0 : offset.y;\n\t}\n\telse {\n\t\tr = vec3(direction.z, -direction.x, direction.y);\n\t\toffset = vec2(2.0*scale+mipOffset, 0.5 * rcpPowScale);\n\t\toffset.y = bRes && (offset.y < 2.0*a) ? 0.0 : offset.y;\n\t}\n\tr = normalize(r);\n\tfloat texelOffset = 0.5 * cubeUV_rcpTextureSize;\n\tvec2 s = ( r.yz / abs( r.x ) + vec2( 1.0 ) ) * 0.5;\n\tvec2 base = offset + vec2( texelOffset );\n\treturn base + s * ( scale - 2.0 * texelOffset );\n}\n#define cubeUV_maxLods3 (log2(cubeUV_textureSize*0.25) - 3.0)\nvec4 textureCubeUV( sampler2D envMap, vec3 reflectedDirection, float roughness ) {\n\tfloat roughnessVal = roughness* cubeUV_maxLods3;\n\tfloat r1 = floor(roughnessVal);\n\tfloat r2 = r1 + 1.0;\n\tfloat t = fract(roughnessVal);\n\tvec2 mipInfo = MipLevelInfo(reflectedDirection, r1, roughness);\n\tfloat s = mipInfo.y;\n\tfloat level0 = mipInfo.x;\n\tfloat level1 = level0 + 1.0;\n\tlevel1 = level1 > 5.0 ? 5.0 : level1;\n\tlevel0 += min( floor( s + 0.5 ), 5.0 );\n\tvec2 uv_10 = getCubeUV(reflectedDirection, r1, level0);\n\tvec4 color10 = envMapTexelToLinear(texture2D(envMap, uv_10));\n\tvec2 uv_20 = getCubeUV(reflectedDirection, r2, level0);\n\tvec4 color20 = envMapTexelToLinear(texture2D(envMap, uv_20));\n\tvec4 result = mix(color10, color20, t);\n\treturn vec4(result.rgb, 1.0);\n}\n#endif\n",
defaultnormal_vertex:"vec3 transformedNormal = normalMatrix * objectNormal;\n#ifdef FLIP_SIDED\n\ttransformedNormal = - transformedNormal;\n#endif\n",displacementmap_pars_vertex:"#ifdef USE_DISPLACEMENTMAP\n\tuniform sampler2D displacementMap;\n\tuniform float displacementScale;\n\tuniform float displacementBias;\n#endif\n",displacementmap_vertex:"#ifdef USE_DISPLACEMENTMAP\n\ttransformed += normalize( objectNormal ) * ( texture2D( displacementMap, uv ).x * displacementScale + displacementBias );\n#endif\n",
emissivemap_fragment:"#ifdef USE_EMISSIVEMAP\n\tvec4 emissiveColor = texture2D( emissiveMap, vUv );\n\temissiveColor.rgb = emissiveMapTexelToLinear( emissiveColor ).rgb;\n\ttotalEmissiveRadiance *= emissiveColor.rgb;\n#endif\n",emissivemap_pars_fragment:"#ifdef USE_EMISSIVEMAP\n\tuniform sampler2D emissiveMap;\n#endif\n",encodings_fragment:"  gl_FragColor = linearToOutputTexel( gl_FragColor );\n",encodings_pars_fragment:"\nvec4 LinearToLinear( in vec4 value ) {\n\treturn value;\n}\nvec4 GammaToLinear( in vec4 value, in float gammaFactor ) {\n\treturn vec4( pow( value.rgb, vec3( gammaFactor ) ), value.a );\n}\nvec4 LinearToGamma( in vec4 value, in float gammaFactor ) {\n\treturn vec4( pow( value.rgb, vec3( 1.0 / gammaFactor ) ), value.a );\n}\nvec4 sRGBToLinear( in vec4 value ) {\n\treturn vec4( mix( pow( value.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), value.rgb * 0.0773993808, vec3( lessThanEqual( value.rgb, vec3( 0.04045 ) ) ) ), value.a );\n}\nvec4 LinearTosRGB( in vec4 value ) {\n\treturn vec4( mix( pow( value.rgb, vec3( 0.41666 ) ) * 1.055 - vec3( 0.055 ), value.rgb * 12.92, vec3( lessThanEqual( value.rgb, vec3( 0.0031308 ) ) ) ), value.a );\n}\nvec4 RGBEToLinear( in vec4 value ) {\n\treturn vec4( value.rgb * exp2( value.a * 255.0 - 128.0 ), 1.0 );\n}\nvec4 LinearToRGBE( in vec4 value ) {\n\tfloat maxComponent = max( max( value.r, value.g ), value.b );\n\tfloat fExp = clamp( ceil( log2( maxComponent ) ), -128.0, 127.0 );\n\treturn vec4( value.rgb / exp2( fExp ), ( fExp + 128.0 ) / 255.0 );\n}\nvec4 RGBMToLinear( in vec4 value, in float maxRange ) {\n\treturn vec4( value.rgb * value.a * maxRange, 1.0 );\n}\nvec4 LinearToRGBM( in vec4 value, in float maxRange ) {\n\tfloat maxRGB = max( value.r, max( value.g, value.b ) );\n\tfloat M = clamp( maxRGB / maxRange, 0.0, 1.0 );\n\tM = ceil( M * 255.0 ) / 255.0;\n\treturn vec4( value.rgb / ( M * maxRange ), M );\n}\nvec4 RGBDToLinear( in vec4 value, in float maxRange ) {\n\treturn vec4( value.rgb * ( ( maxRange / 255.0 ) / value.a ), 1.0 );\n}\nvec4 LinearToRGBD( in vec4 value, in float maxRange ) {\n\tfloat maxRGB = max( value.r, max( value.g, value.b ) );\n\tfloat D = max( maxRange / maxRGB, 1.0 );\n\tD = min( floor( D ) / 255.0, 1.0 );\n\treturn vec4( value.rgb * ( D * ( 255.0 / maxRange ) ), D );\n}\nconst mat3 cLogLuvM = mat3( 0.2209, 0.3390, 0.4184, 0.1138, 0.6780, 0.7319, 0.0102, 0.1130, 0.2969 );\nvec4 LinearToLogLuv( in vec4 value )  {\n\tvec3 Xp_Y_XYZp = value.rgb * cLogLuvM;\n\tXp_Y_XYZp = max( Xp_Y_XYZp, vec3( 1e-6, 1e-6, 1e-6 ) );\n\tvec4 vResult;\n\tvResult.xy = Xp_Y_XYZp.xy / Xp_Y_XYZp.z;\n\tfloat Le = 2.0 * log2(Xp_Y_XYZp.y) + 127.0;\n\tvResult.w = fract( Le );\n\tvResult.z = ( Le - ( floor( vResult.w * 255.0 ) ) / 255.0 ) / 255.0;\n\treturn vResult;\n}\nconst mat3 cLogLuvInverseM = mat3( 6.0014, -2.7008, -1.7996, -1.3320, 3.1029, -5.7721, 0.3008, -1.0882, 5.6268 );\nvec4 LogLuvToLinear( in vec4 value ) {\n\tfloat Le = value.z * 255.0 + value.w;\n\tvec3 Xp_Y_XYZp;\n\tXp_Y_XYZp.y = exp2( ( Le - 127.0 ) / 2.0 );\n\tXp_Y_XYZp.z = Xp_Y_XYZp.y / value.y;\n\tXp_Y_XYZp.x = value.x * Xp_Y_XYZp.z;\n\tvec3 vRGB = Xp_Y_XYZp.rgb * cLogLuvInverseM;\n\treturn vec4( max( vRGB, 0.0 ), 1.0 );\n}\n",
envmap_fragment:"#ifdef USE_ENVMAP\n\t#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG )\n\t\tvec3 cameraToVertex = normalize( vWorldPosition - cameraPosition );\n\t\tvec3 worldNormal = inverseTransformDirection( normal, viewMatrix );\n\t\t#ifdef ENVMAP_MODE_REFLECTION\n\t\t\tvec3 reflectVec = reflect( cameraToVertex, worldNormal );\n\t\t#else\n\t\t\tvec3 reflectVec = refract( cameraToVertex, worldNormal, refractionRatio );\n\t\t#endif\n\t#else\n\t\tvec3 reflectVec = vReflect;\n\t#endif\n\t#ifdef ENVMAP_TYPE_CUBE\n\t\tvec4 envColor = textureCube( envMap, vec3( flipEnvMap * reflectVec.x, reflectVec.yz ) );\n\t#elif defined( ENVMAP_TYPE_EQUIREC )\n\t\tvec2 sampleUV;\n\t\treflectVec = normalize( reflectVec );\n\t\tsampleUV.y = asin( clamp( reflectVec.y, - 1.0, 1.0 ) ) * RECIPROCAL_PI + 0.5;\n\t\tsampleUV.x = atan( reflectVec.z, reflectVec.x ) * RECIPROCAL_PI2 + 0.5;\n\t\tvec4 envColor = texture2D( envMap, sampleUV );\n\t#elif defined( ENVMAP_TYPE_SPHERE )\n\t\treflectVec = normalize( reflectVec );\n\t\tvec3 reflectView = normalize( ( viewMatrix * vec4( reflectVec, 0.0 ) ).xyz + vec3( 0.0, 0.0, 1.0 ) );\n\t\tvec4 envColor = texture2D( envMap, reflectView.xy * 0.5 + 0.5 );\n\t#else\n\t\tvec4 envColor = vec4( 0.0 );\n\t#endif\n\tenvColor = envMapTexelToLinear( envColor );\n\t#ifdef ENVMAP_BLENDING_MULTIPLY\n\t\toutgoingLight = mix( outgoingLight, outgoingLight * envColor.xyz, specularStrength * reflectivity );\n\t#elif defined( ENVMAP_BLENDING_MIX )\n\t\toutgoingLight = mix( outgoingLight, envColor.xyz, specularStrength * reflectivity );\n\t#elif defined( ENVMAP_BLENDING_ADD )\n\t\toutgoingLight += envColor.xyz * specularStrength * reflectivity;\n\t#endif\n#endif\n",
envmap_pars_fragment:"#if defined( USE_ENVMAP ) || defined( PHYSICAL )\n\tuniform float reflectivity;\n\tuniform float envMapIntensity;\n#endif\n#ifdef USE_ENVMAP\n\t#if ! defined( PHYSICAL ) && ( defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) )\n\t\tvarying vec3 vWorldPosition;\n\t#endif\n\t#ifdef ENVMAP_TYPE_CUBE\n\t\tuniform samplerCube envMap;\n\t#else\n\t\tuniform sampler2D envMap;\n\t#endif\n\tuniform float flipEnvMap;\n\tuniform int maxMipLevel;\n\t#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( PHYSICAL )\n\t\tuniform float refractionRatio;\n\t#else\n\t\tvarying vec3 vReflect;\n\t#endif\n#endif\n",
envmap_pars_vertex:"#ifdef USE_ENVMAP\n\t#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG )\n\t\tvarying vec3 vWorldPosition;\n\t#else\n\t\tvarying vec3 vReflect;\n\t\tuniform float refractionRatio;\n\t#endif\n#endif\n",envmap_physical_pars_fragment:"#if defined( USE_ENVMAP ) && defined( PHYSICAL )\n\tvec3 getLightProbeIndirectIrradiance( const in GeometricContext geometry, const in int maxMIPLevel ) {\n\t\tvec3 worldNormal = inverseTransformDirection( geometry.normal, viewMatrix );\n\t\t#ifdef ENVMAP_TYPE_CUBE\n\t\t\tvec3 queryVec = vec3( flipEnvMap * worldNormal.x, worldNormal.yz );\n\t\t\t#ifdef TEXTURE_LOD_EXT\n\t\t\t\tvec4 envMapColor = textureCubeLodEXT( envMap, queryVec, float( maxMIPLevel ) );\n\t\t\t#else\n\t\t\t\tvec4 envMapColor = textureCube( envMap, queryVec, float( maxMIPLevel ) );\n\t\t\t#endif\n\t\t\tenvMapColor.rgb = envMapTexelToLinear( envMapColor ).rgb;\n\t\t#elif defined( ENVMAP_TYPE_CUBE_UV )\n\t\t\tvec3 queryVec = vec3( flipEnvMap * worldNormal.x, worldNormal.yz );\n\t\t\tvec4 envMapColor = textureCubeUV( envMap, queryVec, 1.0 );\n\t\t#else\n\t\t\tvec4 envMapColor = vec4( 0.0 );\n\t\t#endif\n\t\treturn PI * envMapColor.rgb * envMapIntensity;\n\t}\n\tfloat getSpecularMIPLevel( const in float blinnShininessExponent, const in int maxMIPLevel ) {\n\t\tfloat maxMIPLevelScalar = float( maxMIPLevel );\n\t\tfloat desiredMIPLevel = maxMIPLevelScalar + 0.79248 - 0.5 * log2( pow2( blinnShininessExponent ) + 1.0 );\n\t\treturn clamp( desiredMIPLevel, 0.0, maxMIPLevelScalar );\n\t}\n\tvec3 getLightProbeIndirectRadiance( const in GeometricContext geometry, const in float blinnShininessExponent, const in int maxMIPLevel ) {\n\t\t#ifdef ENVMAP_MODE_REFLECTION\n\t\t\tvec3 reflectVec = reflect( -geometry.viewDir, geometry.normal );\n\t\t#else\n\t\t\tvec3 reflectVec = refract( -geometry.viewDir, geometry.normal, refractionRatio );\n\t\t#endif\n\t\treflectVec = inverseTransformDirection( reflectVec, viewMatrix );\n\t\tfloat specularMIPLevel = getSpecularMIPLevel( blinnShininessExponent, maxMIPLevel );\n\t\t#ifdef ENVMAP_TYPE_CUBE\n\t\t\tvec3 queryReflectVec = vec3( flipEnvMap * reflectVec.x, reflectVec.yz );\n\t\t\t#ifdef TEXTURE_LOD_EXT\n\t\t\t\tvec4 envMapColor = textureCubeLodEXT( envMap, queryReflectVec, specularMIPLevel );\n\t\t\t#else\n\t\t\t\tvec4 envMapColor = textureCube( envMap, queryReflectVec, specularMIPLevel );\n\t\t\t#endif\n\t\t\tenvMapColor.rgb = envMapTexelToLinear( envMapColor ).rgb;\n\t\t#elif defined( ENVMAP_TYPE_CUBE_UV )\n\t\t\tvec3 queryReflectVec = vec3( flipEnvMap * reflectVec.x, reflectVec.yz );\n\t\t\tvec4 envMapColor = textureCubeUV( envMap, queryReflectVec, BlinnExponentToGGXRoughness(blinnShininessExponent ));\n\t\t#elif defined( ENVMAP_TYPE_EQUIREC )\n\t\t\tvec2 sampleUV;\n\t\t\tsampleUV.y = asin( clamp( reflectVec.y, - 1.0, 1.0 ) ) * RECIPROCAL_PI + 0.5;\n\t\t\tsampleUV.x = atan( reflectVec.z, reflectVec.x ) * RECIPROCAL_PI2 + 0.5;\n\t\t\t#ifdef TEXTURE_LOD_EXT\n\t\t\t\tvec4 envMapColor = texture2DLodEXT( envMap, sampleUV, specularMIPLevel );\n\t\t\t#else\n\t\t\t\tvec4 envMapColor = texture2D( envMap, sampleUV, specularMIPLevel );\n\t\t\t#endif\n\t\t\tenvMapColor.rgb = envMapTexelToLinear( envMapColor ).rgb;\n\t\t#elif defined( ENVMAP_TYPE_SPHERE )\n\t\t\tvec3 reflectView = normalize( ( viewMatrix * vec4( reflectVec, 0.0 ) ).xyz + vec3( 0.0,0.0,1.0 ) );\n\t\t\t#ifdef TEXTURE_LOD_EXT\n\t\t\t\tvec4 envMapColor = texture2DLodEXT( envMap, reflectView.xy * 0.5 + 0.5, specularMIPLevel );\n\t\t\t#else\n\t\t\t\tvec4 envMapColor = texture2D( envMap, reflectView.xy * 0.5 + 0.5, specularMIPLevel );\n\t\t\t#endif\n\t\t\tenvMapColor.rgb = envMapTexelToLinear( envMapColor ).rgb;\n\t\t#endif\n\t\treturn envMapColor.rgb * envMapIntensity;\n\t}\n#endif\n",
envmap_vertex:"#ifdef USE_ENVMAP\n\t#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG )\n\t\tvWorldPosition = worldPosition.xyz;\n\t#else\n\t\tvec3 cameraToVertex = normalize( worldPosition.xyz - cameraPosition );\n\t\tvec3 worldNormal = inverseTransformDirection( transformedNormal, viewMatrix );\n\t\t#ifdef ENVMAP_MODE_REFLECTION\n\t\t\tvReflect = reflect( cameraToVertex, worldNormal );\n\t\t#else\n\t\t\tvReflect = refract( cameraToVertex, worldNormal, refractionRatio );\n\t\t#endif\n\t#endif\n#endif\n",
fog_vertex:"#ifdef USE_FOG\n\tfogDepth = -mvPosition.z;\n#endif\n",fog_pars_vertex:"#ifdef USE_FOG\n\tvarying float fogDepth;\n#endif\n",fog_fragment:"#ifdef USE_FOG\n\t#ifdef FOG_EXP2\n\t\tfloat fogFactor = whiteCompliment( exp2( - fogDensity * fogDensity * fogDepth * fogDepth * LOG2 ) );\n\t#else\n\t\tfloat fogFactor = smoothstep( fogNear, fogFar, fogDepth );\n\t#endif\n\tgl_FragColor.rgb = mix( gl_FragColor.rgb, fogColor, fogFactor );\n#endif\n",fog_pars_fragment:"#ifdef USE_FOG\n\tuniform vec3 fogColor;\n\tvarying float fogDepth;\n\t#ifdef FOG_EXP2\n\t\tuniform float fogDensity;\n\t#else\n\t\tuniform float fogNear;\n\t\tuniform float fogFar;\n\t#endif\n#endif\n",
gradientmap_pars_fragment:"#ifdef TOON\n\tuniform sampler2D gradientMap;\n\tvec3 getGradientIrradiance( vec3 normal, vec3 lightDirection ) {\n\t\tfloat dotNL = dot( normal, lightDirection );\n\t\tvec2 coord = vec2( dotNL * 0.5 + 0.5, 0.0 );\n\t\t#ifdef USE_GRADIENTMAP\n\t\t\treturn texture2D( gradientMap, coord ).rgb;\n\t\t#else\n\t\t\treturn ( coord.x < 0.7 ) ? vec3( 0.7 ) : vec3( 1.0 );\n\t\t#endif\n\t}\n#endif\n",lightmap_fragment:"#ifdef USE_LIGHTMAP\n\treflectedLight.indirectDiffuse += PI * texture2D( lightMap, vUv2 ).xyz * lightMapIntensity;\n#endif\n",
lightmap_pars_fragment:"#ifdef USE_LIGHTMAP\n\tuniform sampler2D lightMap;\n\tuniform float lightMapIntensity;\n#endif",lights_lambert_vertex:"vec3 diffuse = vec3( 1.0 );\nGeometricContext geometry;\ngeometry.position = mvPosition.xyz;\ngeometry.normal = normalize( transformedNormal );\ngeometry.viewDir = normalize( -mvPosition.xyz );\nGeometricContext backGeometry;\nbackGeometry.position = geometry.position;\nbackGeometry.normal = -geometry.normal;\nbackGeometry.viewDir = geometry.viewDir;\nvLightFront = vec3( 0.0 );\n#ifdef DOUBLE_SIDED\n\tvLightBack = vec3( 0.0 );\n#endif\nIncidentLight directLight;\nfloat dotNL;\nvec3 directLightColor_Diffuse;\n#if NUM_POINT_LIGHTS > 0\n\t#pragma unroll_loop\n\tfor ( int i = 0; i < NUM_POINT_LIGHTS; i ++ ) {\n\t\tgetPointDirectLightIrradiance( pointLights[ i ], geometry, directLight );\n\t\tdotNL = dot( geometry.normal, directLight.direction );\n\t\tdirectLightColor_Diffuse = PI * directLight.color;\n\t\tvLightFront += saturate( dotNL ) * directLightColor_Diffuse;\n\t\t#ifdef DOUBLE_SIDED\n\t\t\tvLightBack += saturate( -dotNL ) * directLightColor_Diffuse;\n\t\t#endif\n\t}\n#endif\n#if NUM_SPOT_LIGHTS > 0\n\t#pragma unroll_loop\n\tfor ( int i = 0; i < NUM_SPOT_LIGHTS; i ++ ) {\n\t\tgetSpotDirectLightIrradiance( spotLights[ i ], geometry, directLight );\n\t\tdotNL = dot( geometry.normal, directLight.direction );\n\t\tdirectLightColor_Diffuse = PI * directLight.color;\n\t\tvLightFront += saturate( dotNL ) * directLightColor_Diffuse;\n\t\t#ifdef DOUBLE_SIDED\n\t\t\tvLightBack += saturate( -dotNL ) * directLightColor_Diffuse;\n\t\t#endif\n\t}\n#endif\n#if NUM_DIR_LIGHTS > 0\n\t#pragma unroll_loop\n\tfor ( int i = 0; i < NUM_DIR_LIGHTS; i ++ ) {\n\t\tgetDirectionalDirectLightIrradiance( directionalLights[ i ], geometry, directLight );\n\t\tdotNL = dot( geometry.normal, directLight.direction );\n\t\tdirectLightColor_Diffuse = PI * directLight.color;\n\t\tvLightFront += saturate( dotNL ) * directLightColor_Diffuse;\n\t\t#ifdef DOUBLE_SIDED\n\t\t\tvLightBack += saturate( -dotNL ) * directLightColor_Diffuse;\n\t\t#endif\n\t}\n#endif\n#if NUM_HEMI_LIGHTS > 0\n\t#pragma unroll_loop\n\tfor ( int i = 0; i < NUM_HEMI_LIGHTS; i ++ ) {\n\t\tvLightFront += getHemisphereLightIrradiance( hemisphereLights[ i ], geometry );\n\t\t#ifdef DOUBLE_SIDED\n\t\t\tvLightBack += getHemisphereLightIrradiance( hemisphereLights[ i ], backGeometry );\n\t\t#endif\n\t}\n#endif\n",
lights_pars_begin:"uniform vec3 ambientLightColor;\nvec3 getAmbientLightIrradiance( const in vec3 ambientLightColor ) {\n\tvec3 irradiance = ambientLightColor;\n\t#ifndef PHYSICALLY_CORRECT_LIGHTS\n\t\tirradiance *= PI;\n\t#endif\n\treturn irradiance;\n}\n#if NUM_DIR_LIGHTS > 0\n\tstruct DirectionalLight {\n\t\tvec3 direction;\n\t\tvec3 color;\n\t\tint shadow;\n\t\tfloat shadowBias;\n\t\tfloat shadowRadius;\n\t\tvec2 shadowMapSize;\n\t};\n\tuniform DirectionalLight directionalLights[ NUM_DIR_LIGHTS ];\n\tvoid getDirectionalDirectLightIrradiance( const in DirectionalLight directionalLight, const in GeometricContext geometry, out IncidentLight directLight ) {\n\t\tdirectLight.color = directionalLight.color;\n\t\tdirectLight.direction = directionalLight.direction;\n\t\tdirectLight.visible = true;\n\t}\n#endif\n#if NUM_POINT_LIGHTS > 0\n\tstruct PointLight {\n\t\tvec3 position;\n\t\tvec3 color;\n\t\tfloat distance;\n\t\tfloat decay;\n\t\tint shadow;\n\t\tfloat shadowBias;\n\t\tfloat shadowRadius;\n\t\tvec2 shadowMapSize;\n\t\tfloat shadowCameraNear;\n\t\tfloat shadowCameraFar;\n\t};\n\tuniform PointLight pointLights[ NUM_POINT_LIGHTS ];\n\tvoid getPointDirectLightIrradiance( const in PointLight pointLight, const in GeometricContext geometry, out IncidentLight directLight ) {\n\t\tvec3 lVector = pointLight.position - geometry.position;\n\t\tdirectLight.direction = normalize( lVector );\n\t\tfloat lightDistance = length( lVector );\n\t\tdirectLight.color = pointLight.color;\n\t\tdirectLight.color *= punctualLightIntensityToIrradianceFactor( lightDistance, pointLight.distance, pointLight.decay );\n\t\tdirectLight.visible = ( directLight.color != vec3( 0.0 ) );\n\t}\n#endif\n#if NUM_SPOT_LIGHTS > 0\n\tstruct SpotLight {\n\t\tvec3 position;\n\t\tvec3 direction;\n\t\tvec3 color;\n\t\tfloat distance;\n\t\tfloat decay;\n\t\tfloat coneCos;\n\t\tfloat penumbraCos;\n\t\tint shadow;\n\t\tfloat shadowBias;\n\t\tfloat shadowRadius;\n\t\tvec2 shadowMapSize;\n\t};\n\tuniform SpotLight spotLights[ NUM_SPOT_LIGHTS ];\n\tvoid getSpotDirectLightIrradiance( const in SpotLight spotLight, const in GeometricContext geometry, out IncidentLight directLight  ) {\n\t\tvec3 lVector = spotLight.position - geometry.position;\n\t\tdirectLight.direction = normalize( lVector );\n\t\tfloat lightDistance = length( lVector );\n\t\tfloat angleCos = dot( directLight.direction, spotLight.direction );\n\t\tif ( angleCos > spotLight.coneCos ) {\n\t\t\tfloat spotEffect = smoothstep( spotLight.coneCos, spotLight.penumbraCos, angleCos );\n\t\t\tdirectLight.color = spotLight.color;\n\t\t\tdirectLight.color *= spotEffect * punctualLightIntensityToIrradianceFactor( lightDistance, spotLight.distance, spotLight.decay );\n\t\t\tdirectLight.visible = true;\n\t\t} else {\n\t\t\tdirectLight.color = vec3( 0.0 );\n\t\t\tdirectLight.visible = false;\n\t\t}\n\t}\n#endif\n#if NUM_RECT_AREA_LIGHTS > 0\n\tstruct RectAreaLight {\n\t\tvec3 color;\n\t\tvec3 position;\n\t\tvec3 halfWidth;\n\t\tvec3 halfHeight;\n\t};\n\tuniform sampler2D ltc_1;\tuniform sampler2D ltc_2;\n\tuniform RectAreaLight rectAreaLights[ NUM_RECT_AREA_LIGHTS ];\n#endif\n#if NUM_HEMI_LIGHTS > 0\n\tstruct HemisphereLight {\n\t\tvec3 direction;\n\t\tvec3 skyColor;\n\t\tvec3 groundColor;\n\t};\n\tuniform HemisphereLight hemisphereLights[ NUM_HEMI_LIGHTS ];\n\tvec3 getHemisphereLightIrradiance( const in HemisphereLight hemiLight, const in GeometricContext geometry ) {\n\t\tfloat dotNL = dot( geometry.normal, hemiLight.direction );\n\t\tfloat hemiDiffuseWeight = 0.5 * dotNL + 0.5;\n\t\tvec3 irradiance = mix( hemiLight.groundColor, hemiLight.skyColor, hemiDiffuseWeight );\n\t\t#ifndef PHYSICALLY_CORRECT_LIGHTS\n\t\t\tirradiance *= PI;\n\t\t#endif\n\t\treturn irradiance;\n\t}\n#endif\n",
lights_phong_fragment:"BlinnPhongMaterial material;\nmaterial.diffuseColor = diffuseColor.rgb;\nmaterial.specularColor = specular;\nmaterial.specularShininess = shininess;\nmaterial.specularStrength = specularStrength;\n",lights_phong_pars_fragment:"varying vec3 vViewPosition;\n#ifndef FLAT_SHADED\n\tvarying vec3 vNormal;\n#endif\nstruct BlinnPhongMaterial {\n\tvec3\tdiffuseColor;\n\tvec3\tspecularColor;\n\tfloat\tspecularShininess;\n\tfloat\tspecularStrength;\n};\nvoid RE_Direct_BlinnPhong( const in IncidentLight directLight, const in GeometricContext geometry, const in BlinnPhongMaterial material, inout ReflectedLight reflectedLight ) {\n\t#ifdef TOON\n\t\tvec3 irradiance = getGradientIrradiance( geometry.normal, directLight.direction ) * directLight.color;\n\t#else\n\t\tfloat dotNL = saturate( dot( geometry.normal, directLight.direction ) );\n\t\tvec3 irradiance = dotNL * directLight.color;\n\t#endif\n\t#ifndef PHYSICALLY_CORRECT_LIGHTS\n\t\tirradiance *= PI;\n\t#endif\n\treflectedLight.directDiffuse += irradiance * BRDF_Diffuse_Lambert( material.diffuseColor );\n\treflectedLight.directSpecular += irradiance * BRDF_Specular_BlinnPhong( directLight, geometry, material.specularColor, material.specularShininess ) * material.specularStrength;\n}\nvoid RE_IndirectDiffuse_BlinnPhong( const in vec3 irradiance, const in GeometricContext geometry, const in BlinnPhongMaterial material, inout ReflectedLight reflectedLight ) {\n\treflectedLight.indirectDiffuse += irradiance * BRDF_Diffuse_Lambert( material.diffuseColor );\n}\n#define RE_Direct\t\t\t\tRE_Direct_BlinnPhong\n#define RE_IndirectDiffuse\t\tRE_IndirectDiffuse_BlinnPhong\n#define Material_LightProbeLOD( material )\t(0)\n",
lights_physical_fragment:"PhysicalMaterial material;\nmaterial.diffuseColor = diffuseColor.rgb * ( 1.0 - metalnessFactor );\nmaterial.specularRoughness = clamp( roughnessFactor, 0.04, 1.0 );\n#ifdef STANDARD\n\tmaterial.specularColor = mix( vec3( DEFAULT_SPECULAR_COEFFICIENT ), diffuseColor.rgb, metalnessFactor );\n#else\n\tmaterial.specularColor = mix( vec3( MAXIMUM_SPECULAR_COEFFICIENT * pow2( reflectivity ) ), diffuseColor.rgb, metalnessFactor );\n\tmaterial.clearCoat = saturate( clearCoat );\tmaterial.clearCoatRoughness = clamp( clearCoatRoughness, 0.04, 1.0 );\n#endif\n",
lights_physical_pars_fragment:"struct PhysicalMaterial {\n\tvec3\tdiffuseColor;\n\tfloat\tspecularRoughness;\n\tvec3\tspecularColor;\n\t#ifndef STANDARD\n\t\tfloat clearCoat;\n\t\tfloat clearCoatRoughness;\n\t#endif\n};\n#define MAXIMUM_SPECULAR_COEFFICIENT 0.16\n#define DEFAULT_SPECULAR_COEFFICIENT 0.04\nfloat clearCoatDHRApprox( const in float roughness, const in float dotNL ) {\n\treturn DEFAULT_SPECULAR_COEFFICIENT + ( 1.0 - DEFAULT_SPECULAR_COEFFICIENT ) * ( pow( 1.0 - dotNL, 5.0 ) * pow( 1.0 - roughness, 2.0 ) );\n}\n#if NUM_RECT_AREA_LIGHTS > 0\n\tvoid RE_Direct_RectArea_Physical( const in RectAreaLight rectAreaLight, const in GeometricContext geometry, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {\n\t\tvec3 normal = geometry.normal;\n\t\tvec3 viewDir = geometry.viewDir;\n\t\tvec3 position = geometry.position;\n\t\tvec3 lightPos = rectAreaLight.position;\n\t\tvec3 halfWidth = rectAreaLight.halfWidth;\n\t\tvec3 halfHeight = rectAreaLight.halfHeight;\n\t\tvec3 lightColor = rectAreaLight.color;\n\t\tfloat roughness = material.specularRoughness;\n\t\tvec3 rectCoords[ 4 ];\n\t\trectCoords[ 0 ] = lightPos - halfWidth - halfHeight;\t\trectCoords[ 1 ] = lightPos + halfWidth - halfHeight;\n\t\trectCoords[ 2 ] = lightPos + halfWidth + halfHeight;\n\t\trectCoords[ 3 ] = lightPos - halfWidth + halfHeight;\n\t\tvec2 uv = LTC_Uv( normal, viewDir, roughness );\n\t\tvec4 t1 = texture2D( ltc_1, uv );\n\t\tvec4 t2 = texture2D( ltc_2, uv );\n\t\tmat3 mInv = mat3(\n\t\t\tvec3( t1.x, 0, t1.y ),\n\t\t\tvec3(    0, 1,    0 ),\n\t\t\tvec3( t1.z, 0, t1.w )\n\t\t);\n\t\tvec3 fresnel = ( material.specularColor * t2.x + ( vec3( 1.0 ) - material.specularColor ) * t2.y );\n\t\treflectedLight.directSpecular += lightColor * fresnel * LTC_Evaluate( normal, viewDir, position, mInv, rectCoords );\n\t\treflectedLight.directDiffuse += lightColor * material.diffuseColor * LTC_Evaluate( normal, viewDir, position, mat3( 1.0 ), rectCoords );\n\t}\n#endif\nvoid RE_Direct_Physical( const in IncidentLight directLight, const in GeometricContext geometry, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {\n\tfloat dotNL = saturate( dot( geometry.normal, directLight.direction ) );\n\tvec3 irradiance = dotNL * directLight.color;\n\t#ifndef PHYSICALLY_CORRECT_LIGHTS\n\t\tirradiance *= PI;\n\t#endif\n\t#ifndef STANDARD\n\t\tfloat clearCoatDHR = material.clearCoat * clearCoatDHRApprox( material.clearCoatRoughness, dotNL );\n\t#else\n\t\tfloat clearCoatDHR = 0.0;\n\t#endif\n\treflectedLight.directSpecular += ( 1.0 - clearCoatDHR ) * irradiance * BRDF_Specular_GGX( directLight, geometry, material.specularColor, material.specularRoughness );\n\treflectedLight.directDiffuse += ( 1.0 - clearCoatDHR ) * irradiance * BRDF_Diffuse_Lambert( material.diffuseColor );\n\t#ifndef STANDARD\n\t\treflectedLight.directSpecular += irradiance * material.clearCoat * BRDF_Specular_GGX( directLight, geometry, vec3( DEFAULT_SPECULAR_COEFFICIENT ), material.clearCoatRoughness );\n\t#endif\n}\nvoid RE_IndirectDiffuse_Physical( const in vec3 irradiance, const in GeometricContext geometry, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {\n\treflectedLight.indirectDiffuse += irradiance * BRDF_Diffuse_Lambert( material.diffuseColor );\n}\nvoid RE_IndirectSpecular_Physical( const in vec3 radiance, const in vec3 clearCoatRadiance, const in GeometricContext geometry, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {\n\t#ifndef STANDARD\n\t\tfloat dotNV = saturate( dot( geometry.normal, geometry.viewDir ) );\n\t\tfloat dotNL = dotNV;\n\t\tfloat clearCoatDHR = material.clearCoat * clearCoatDHRApprox( material.clearCoatRoughness, dotNL );\n\t#else\n\t\tfloat clearCoatDHR = 0.0;\n\t#endif\n\treflectedLight.indirectSpecular += ( 1.0 - clearCoatDHR ) * radiance * BRDF_Specular_GGX_Environment( geometry, material.specularColor, material.specularRoughness );\n\t#ifndef STANDARD\n\t\treflectedLight.indirectSpecular += clearCoatRadiance * material.clearCoat * BRDF_Specular_GGX_Environment( geometry, vec3( DEFAULT_SPECULAR_COEFFICIENT ), material.clearCoatRoughness );\n\t#endif\n}\n#define RE_Direct\t\t\t\tRE_Direct_Physical\n#define RE_Direct_RectArea\t\tRE_Direct_RectArea_Physical\n#define RE_IndirectDiffuse\t\tRE_IndirectDiffuse_Physical\n#define RE_IndirectSpecular\t\tRE_IndirectSpecular_Physical\n#define Material_BlinnShininessExponent( material )   GGXRoughnessToBlinnExponent( material.specularRoughness )\n#define Material_ClearCoat_BlinnShininessExponent( material )   GGXRoughnessToBlinnExponent( material.clearCoatRoughness )\nfloat computeSpecularOcclusion( const in float dotNV, const in float ambientOcclusion, const in float roughness ) {\n\treturn saturate( pow( dotNV + ambientOcclusion, exp2( - 16.0 * roughness - 1.0 ) ) - 1.0 + ambientOcclusion );\n}\n",
lights_fragment_begin:"\nGeometricContext geometry;\ngeometry.position = - vViewPosition;\ngeometry.normal = normal;\ngeometry.viewDir = normalize( vViewPosition );\nIncidentLight directLight;\n#if ( NUM_POINT_LIGHTS > 0 ) && defined( RE_Direct )\n\tPointLight pointLight;\n\t#pragma unroll_loop\n\tfor ( int i = 0; i < NUM_POINT_LIGHTS; i ++ ) {\n\t\tpointLight = pointLights[ i ];\n\t\tgetPointDirectLightIrradiance( pointLight, geometry, directLight );\n\t\t#ifdef USE_SHADOWMAP\n\t\tdirectLight.color *= all( bvec2( pointLight.shadow, directLight.visible ) ) ? getPointShadow( pointShadowMap[ i ], pointLight.shadowMapSize, pointLight.shadowBias, pointLight.shadowRadius, vPointShadowCoord[ i ], pointLight.shadowCameraNear, pointLight.shadowCameraFar ) : 1.0;\n\t\t#endif\n\t\tRE_Direct( directLight, geometry, material, reflectedLight );\n\t}\n#endif\n#if ( NUM_SPOT_LIGHTS > 0 ) && defined( RE_Direct )\n\tSpotLight spotLight;\n\t#pragma unroll_loop\n\tfor ( int i = 0; i < NUM_SPOT_LIGHTS; i ++ ) {\n\t\tspotLight = spotLights[ i ];\n\t\tgetSpotDirectLightIrradiance( spotLight, geometry, directLight );\n\t\t#ifdef USE_SHADOWMAP\n\t\tdirectLight.color *= all( bvec2( spotLight.shadow, directLight.visible ) ) ? getShadow( spotShadowMap[ i ], spotLight.shadowMapSize, spotLight.shadowBias, spotLight.shadowRadius, vSpotShadowCoord[ i ] ) : 1.0;\n\t\t#endif\n\t\tRE_Direct( directLight, geometry, material, reflectedLight );\n\t}\n#endif\n#if ( NUM_DIR_LIGHTS > 0 ) && defined( RE_Direct )\n\tDirectionalLight directionalLight;\n\t#pragma unroll_loop\n\tfor ( int i = 0; i < NUM_DIR_LIGHTS; i ++ ) {\n\t\tdirectionalLight = directionalLights[ i ];\n\t\tgetDirectionalDirectLightIrradiance( directionalLight, geometry, directLight );\n\t\t#ifdef USE_SHADOWMAP\n\t\tdirectLight.color *= all( bvec2( directionalLight.shadow, directLight.visible ) ) ? getShadow( directionalShadowMap[ i ], directionalLight.shadowMapSize, directionalLight.shadowBias, directionalLight.shadowRadius, vDirectionalShadowCoord[ i ] ) : 1.0;\n\t\t#endif\n\t\tRE_Direct( directLight, geometry, material, reflectedLight );\n\t}\n#endif\n#if ( NUM_RECT_AREA_LIGHTS > 0 ) && defined( RE_Direct_RectArea )\n\tRectAreaLight rectAreaLight;\n\t#pragma unroll_loop\n\tfor ( int i = 0; i < NUM_RECT_AREA_LIGHTS; i ++ ) {\n\t\trectAreaLight = rectAreaLights[ i ];\n\t\tRE_Direct_RectArea( rectAreaLight, geometry, material, reflectedLight );\n\t}\n#endif\n#if defined( RE_IndirectDiffuse )\n\tvec3 irradiance = getAmbientLightIrradiance( ambientLightColor );\n\t#if ( NUM_HEMI_LIGHTS > 0 )\n\t\t#pragma unroll_loop\n\t\tfor ( int i = 0; i < NUM_HEMI_LIGHTS; i ++ ) {\n\t\t\tirradiance += getHemisphereLightIrradiance( hemisphereLights[ i ], geometry );\n\t\t}\n\t#endif\n#endif\n#if defined( RE_IndirectSpecular )\n\tvec3 radiance = vec3( 0.0 );\n\tvec3 clearCoatRadiance = vec3( 0.0 );\n#endif\n",
lights_fragment_maps:"#if defined( RE_IndirectDiffuse )\n\t#ifdef USE_LIGHTMAP\n\t\tvec3 lightMapIrradiance = texture2D( lightMap, vUv2 ).xyz * lightMapIntensity;\n\t\t#ifndef PHYSICALLY_CORRECT_LIGHTS\n\t\t\tlightMapIrradiance *= PI;\n\t\t#endif\n\t\tirradiance += lightMapIrradiance;\n\t#endif\n\t#if defined( USE_ENVMAP ) && defined( PHYSICAL ) && defined( ENVMAP_TYPE_CUBE_UV )\n\t\tirradiance += getLightProbeIndirectIrradiance( geometry, maxMipLevel );\n\t#endif\n#endif\n#if defined( USE_ENVMAP ) && defined( RE_IndirectSpecular )\n\tradiance += getLightProbeIndirectRadiance( geometry, Material_BlinnShininessExponent( material ), maxMipLevel );\n\t#ifndef STANDARD\n\t\tclearCoatRadiance += getLightProbeIndirectRadiance( geometry, Material_ClearCoat_BlinnShininessExponent( material ), maxMipLevel );\n\t#endif\n#endif\n",
lights_fragment_end:"#if defined( RE_IndirectDiffuse )\n\tRE_IndirectDiffuse( irradiance, geometry, material, reflectedLight );\n#endif\n#if defined( RE_IndirectSpecular )\n\tRE_IndirectSpecular( radiance, clearCoatRadiance, geometry, material, reflectedLight );\n#endif\n",logdepthbuf_fragment:"#if defined( USE_LOGDEPTHBUF ) && defined( USE_LOGDEPTHBUF_EXT )\n\tgl_FragDepthEXT = log2( vFragDepth ) * logDepthBufFC * 0.5;\n#endif",logdepthbuf_pars_fragment:"#if defined( USE_LOGDEPTHBUF ) && defined( USE_LOGDEPTHBUF_EXT )\n\tuniform float logDepthBufFC;\n\tvarying float vFragDepth;\n#endif\n",
logdepthbuf_pars_vertex:"#ifdef USE_LOGDEPTHBUF\n\t#ifdef USE_LOGDEPTHBUF_EXT\n\t\tvarying float vFragDepth;\n\t#else\n\t\tuniform float logDepthBufFC;\n\t#endif\n#endif\n",logdepthbuf_vertex:"#ifdef USE_LOGDEPTHBUF\n\t#ifdef USE_LOGDEPTHBUF_EXT\n\t\tvFragDepth = 1.0 + gl_Position.w;\n\t#else\n\t\tgl_Position.z = log2( max( EPSILON, gl_Position.w + 1.0 ) ) * logDepthBufFC - 1.0;\n\t\tgl_Position.z *= gl_Position.w;\n\t#endif\n#endif\n",map_fragment:"#ifdef USE_MAP\n\tvec4 texelColor = texture2D( map, vUv );\n\ttexelColor = mapTexelToLinear( texelColor );\n\tdiffuseColor *= texelColor;\n#endif\n",
map_pars_fragment:"#ifdef USE_MAP\n\tuniform sampler2D map;\n#endif\n",map_particle_fragment:"#ifdef USE_MAP\n\tvec2 uv = ( uvTransform * vec3( gl_PointCoord.x, 1.0 - gl_PointCoord.y, 1 ) ).xy;\n\tvec4 mapTexel = texture2D( map, uv );\n\tdiffuseColor *= mapTexelToLinear( mapTexel );\n#endif\n",map_particle_pars_fragment:"#ifdef USE_MAP\n\tuniform mat3 uvTransform;\n\tuniform sampler2D map;\n#endif\n",metalnessmap_fragment:"float metalnessFactor = metalness;\n#ifdef USE_METALNESSMAP\n\tvec4 texelMetalness = texture2D( metalnessMap, vUv );\n\tmetalnessFactor *= texelMetalness.b;\n#endif\n",
metalnessmap_pars_fragment:"#ifdef USE_METALNESSMAP\n\tuniform sampler2D metalnessMap;\n#endif",morphnormal_vertex:"#ifdef USE_MORPHNORMALS\n\tobjectNormal += ( morphNormal0 - normal ) * morphTargetInfluences[ 0 ];\n\tobjectNormal += ( morphNormal1 - normal ) * morphTargetInfluences[ 1 ];\n\tobjectNormal += ( morphNormal2 - normal ) * morphTargetInfluences[ 2 ];\n\tobjectNormal += ( morphNormal3 - normal ) * morphTargetInfluences[ 3 ];\n#endif\n",morphtarget_pars_vertex:"#ifdef USE_MORPHTARGETS\n\t#ifndef USE_MORPHNORMALS\n\tuniform float morphTargetInfluences[ 8 ];\n\t#else\n\tuniform float morphTargetInfluences[ 4 ];\n\t#endif\n#endif",
morphtarget_vertex:"#ifdef USE_MORPHTARGETS\n\ttransformed += ( morphTarget0 - position ) * morphTargetInfluences[ 0 ];\n\ttransformed += ( morphTarget1 - position ) * morphTargetInfluences[ 1 ];\n\ttransformed += ( morphTarget2 - position ) * morphTargetInfluences[ 2 ];\n\ttransformed += ( morphTarget3 - position ) * morphTargetInfluences[ 3 ];\n\t#ifndef USE_MORPHNORMALS\n\ttransformed += ( morphTarget4 - position ) * morphTargetInfluences[ 4 ];\n\ttransformed += ( morphTarget5 - position ) * morphTargetInfluences[ 5 ];\n\ttransformed += ( morphTarget6 - position ) * morphTargetInfluences[ 6 ];\n\ttransformed += ( morphTarget7 - position ) * morphTargetInfluences[ 7 ];\n\t#endif\n#endif\n",
normal_fragment_begin:"#ifdef FLAT_SHADED\n\tvec3 fdx = vec3( dFdx( vViewPosition.x ), dFdx( vViewPosition.y ), dFdx( vViewPosition.z ) );\n\tvec3 fdy = vec3( dFdy( vViewPosition.x ), dFdy( vViewPosition.y ), dFdy( vViewPosition.z ) );\n\tvec3 normal = normalize( cross( fdx, fdy ) );\n#else\n\tvec3 normal = normalize( vNormal );\n\t#ifdef DOUBLE_SIDED\n\t\tnormal = normal * ( float( gl_FrontFacing ) * 2.0 - 1.0 );\n\t#endif\n#endif\n",normal_fragment_maps:"#ifdef USE_NORMALMAP\n\t#ifdef OBJECTSPACE_NORMALMAP\n\t\tnormal = texture2D( normalMap, vUv ).xyz * 2.0 - 1.0;\n\t\t#ifdef FLIP_SIDED\n\t\t\tnormal = - normal;\n\t\t#endif\n\t\t#ifdef DOUBLE_SIDED\n\t\t\tnormal = normal * ( float( gl_FrontFacing ) * 2.0 - 1.0 );\n\t\t#endif\n\t\tnormal = normalize( normalMatrix * normal );\n\t#else\n\t\tnormal = perturbNormal2Arb( -vViewPosition, normal );\n\t#endif\n#elif defined( USE_BUMPMAP )\n\tnormal = perturbNormalArb( -vViewPosition, normal, dHdxy_fwd() );\n#endif\n",
normalmap_pars_fragment:"#ifdef USE_NORMALMAP\n\tuniform sampler2D normalMap;\n\tuniform vec2 normalScale;\n\t#ifdef OBJECTSPACE_NORMALMAP\n\t\tuniform mat3 normalMatrix;\n\t#else\n\t\tvec3 perturbNormal2Arb( vec3 eye_pos, vec3 surf_norm ) {\n\t\t\tvec3 q0 = vec3( dFdx( eye_pos.x ), dFdx( eye_pos.y ), dFdx( eye_pos.z ) );\n\t\t\tvec3 q1 = vec3( dFdy( eye_pos.x ), dFdy( eye_pos.y ), dFdy( eye_pos.z ) );\n\t\t\tvec2 st0 = dFdx( vUv.st );\n\t\t\tvec2 st1 = dFdy( vUv.st );\n\t\t\tfloat scale = sign( st1.t * st0.s - st0.t * st1.s );\n\t\t\tvec3 S = normalize( ( q0 * st1.t - q1 * st0.t ) * scale );\n\t\t\tvec3 T = normalize( ( - q0 * st1.s + q1 * st0.s ) * scale );\n\t\t\tvec3 N = normalize( surf_norm );\n\t\t\tmat3 tsn = mat3( S, T, N );\n\t\t\tvec3 mapN = texture2D( normalMap, vUv ).xyz * 2.0 - 1.0;\n\t\t\tmapN.xy *= normalScale;\n\t\t\tmapN.xy *= ( float( gl_FrontFacing ) * 2.0 - 1.0 );\n\t\t\treturn normalize( tsn * mapN );\n\t\t}\n\t#endif\n#endif\n",
packing:"vec3 packNormalToRGB( const in vec3 normal ) {\n\treturn normalize( normal ) * 0.5 + 0.5;\n}\nvec3 unpackRGBToNormal( const in vec3 rgb ) {\n\treturn 2.0 * rgb.xyz - 1.0;\n}\nconst float PackUpscale = 256. / 255.;const float UnpackDownscale = 255. / 256.;\nconst vec3 PackFactors = vec3( 256. * 256. * 256., 256. * 256.,  256. );\nconst vec4 UnpackFactors = UnpackDownscale / vec4( PackFactors, 1. );\nconst float ShiftRight8 = 1. / 256.;\nvec4 packDepthToRGBA( const in float v ) {\n\tvec4 r = vec4( fract( v * PackFactors ), v );\n\tr.yzw -= r.xyz * ShiftRight8;\treturn r * PackUpscale;\n}\nfloat unpackRGBAToDepth( const in vec4 v ) {\n\treturn dot( v, UnpackFactors );\n}\nfloat viewZToOrthographicDepth( const in float viewZ, const in float near, const in float far ) {\n\treturn ( viewZ + near ) / ( near - far );\n}\nfloat orthographicDepthToViewZ( const in float linearClipZ, const in float near, const in float far ) {\n\treturn linearClipZ * ( near - far ) - near;\n}\nfloat viewZToPerspectiveDepth( const in float viewZ, const in float near, const in float far ) {\n\treturn (( near + viewZ ) * far ) / (( far - near ) * viewZ );\n}\nfloat perspectiveDepthToViewZ( const in float invClipZ, const in float near, const in float far ) {\n\treturn ( near * far ) / ( ( far - near ) * invClipZ - far );\n}\n",
premultiplied_alpha_fragment:"#ifdef PREMULTIPLIED_ALPHA\n\tgl_FragColor.rgb *= gl_FragColor.a;\n#endif\n",project_vertex:"vec4 mvPosition = modelViewMatrix * vec4( transformed, 1.0 );\ngl_Position = projectionMatrix * mvPosition;\n",dithering_fragment:"#if defined( DITHERING )\n  gl_FragColor.rgb = dithering( gl_FragColor.rgb );\n#endif\n",dithering_pars_fragment:"#if defined( DITHERING )\n\tvec3 dithering( vec3 color ) {\n\t\tfloat grid_position = rand( gl_FragCoord.xy );\n\t\tvec3 dither_shift_RGB = vec3( 0.25 / 255.0, -0.25 / 255.0, 0.25 / 255.0 );\n\t\tdither_shift_RGB = mix( 2.0 * dither_shift_RGB, -2.0 * dither_shift_RGB, grid_position );\n\t\treturn color + dither_shift_RGB;\n\t}\n#endif\n",
roughnessmap_fragment:"float roughnessFactor = roughness;\n#ifdef USE_ROUGHNESSMAP\n\tvec4 texelRoughness = texture2D( roughnessMap, vUv );\n\troughnessFactor *= texelRoughness.g;\n#endif\n",roughnessmap_pars_fragment:"#ifdef USE_ROUGHNESSMAP\n\tuniform sampler2D roughnessMap;\n#endif",shadowmap_pars_fragment:"#ifdef USE_SHADOWMAP\n\t#if NUM_DIR_LIGHTS > 0\n\t\tuniform sampler2D directionalShadowMap[ NUM_DIR_LIGHTS ];\n\t\tvarying vec4 vDirectionalShadowCoord[ NUM_DIR_LIGHTS ];\n\t#endif\n\t#if NUM_SPOT_LIGHTS > 0\n\t\tuniform sampler2D spotShadowMap[ NUM_SPOT_LIGHTS ];\n\t\tvarying vec4 vSpotShadowCoord[ NUM_SPOT_LIGHTS ];\n\t#endif\n\t#if NUM_POINT_LIGHTS > 0\n\t\tuniform sampler2D pointShadowMap[ NUM_POINT_LIGHTS ];\n\t\tvarying vec4 vPointShadowCoord[ NUM_POINT_LIGHTS ];\n\t#endif\n\tfloat texture2DCompare( sampler2D depths, vec2 uv, float compare ) {\n\t\treturn step( compare, unpackRGBAToDepth( texture2D( depths, uv ) ) );\n\t}\n\tfloat texture2DShadowLerp( sampler2D depths, vec2 size, vec2 uv, float compare ) {\n\t\tconst vec2 offset = vec2( 0.0, 1.0 );\n\t\tvec2 texelSize = vec2( 1.0 ) / size;\n\t\tvec2 centroidUV = floor( uv * size + 0.5 ) / size;\n\t\tfloat lb = texture2DCompare( depths, centroidUV + texelSize * offset.xx, compare );\n\t\tfloat lt = texture2DCompare( depths, centroidUV + texelSize * offset.xy, compare );\n\t\tfloat rb = texture2DCompare( depths, centroidUV + texelSize * offset.yx, compare );\n\t\tfloat rt = texture2DCompare( depths, centroidUV + texelSize * offset.yy, compare );\n\t\tvec2 f = fract( uv * size + 0.5 );\n\t\tfloat a = mix( lb, lt, f.y );\n\t\tfloat b = mix( rb, rt, f.y );\n\t\tfloat c = mix( a, b, f.x );\n\t\treturn c;\n\t}\n\tfloat getShadow( sampler2D shadowMap, vec2 shadowMapSize, float shadowBias, float shadowRadius, vec4 shadowCoord ) {\n\t\tfloat shadow = 1.0;\n\t\tshadowCoord.xyz /= shadowCoord.w;\n\t\tshadowCoord.z += shadowBias;\n\t\tbvec4 inFrustumVec = bvec4 ( shadowCoord.x >= 0.0, shadowCoord.x <= 1.0, shadowCoord.y >= 0.0, shadowCoord.y <= 1.0 );\n\t\tbool inFrustum = all( inFrustumVec );\n\t\tbvec2 frustumTestVec = bvec2( inFrustum, shadowCoord.z <= 1.0 );\n\t\tbool frustumTest = all( frustumTestVec );\n\t\tif ( frustumTest ) {\n\t\t#if defined( SHADOWMAP_TYPE_PCF )\n\t\t\tvec2 texelSize = vec2( 1.0 ) / shadowMapSize;\n\t\t\tfloat dx0 = - texelSize.x * shadowRadius;\n\t\t\tfloat dy0 = - texelSize.y * shadowRadius;\n\t\t\tfloat dx1 = + texelSize.x * shadowRadius;\n\t\t\tfloat dy1 = + texelSize.y * shadowRadius;\n\t\t\tshadow = (\n\t\t\t\ttexture2DCompare( shadowMap, shadowCoord.xy + vec2( dx0, dy0 ), shadowCoord.z ) +\n\t\t\t\ttexture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy0 ), shadowCoord.z ) +\n\t\t\t\ttexture2DCompare( shadowMap, shadowCoord.xy + vec2( dx1, dy0 ), shadowCoord.z ) +\n\t\t\t\ttexture2DCompare( shadowMap, shadowCoord.xy + vec2( dx0, 0.0 ), shadowCoord.z ) +\n\t\t\t\ttexture2DCompare( shadowMap, shadowCoord.xy, shadowCoord.z ) +\n\t\t\t\ttexture2DCompare( shadowMap, shadowCoord.xy + vec2( dx1, 0.0 ), shadowCoord.z ) +\n\t\t\t\ttexture2DCompare( shadowMap, shadowCoord.xy + vec2( dx0, dy1 ), shadowCoord.z ) +\n\t\t\t\ttexture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy1 ), shadowCoord.z ) +\n\t\t\t\ttexture2DCompare( shadowMap, shadowCoord.xy + vec2( dx1, dy1 ), shadowCoord.z )\n\t\t\t) * ( 1.0 / 9.0 );\n\t\t#elif defined( SHADOWMAP_TYPE_PCF_SOFT )\n\t\t\tvec2 texelSize = vec2( 1.0 ) / shadowMapSize;\n\t\t\tfloat dx0 = - texelSize.x * shadowRadius;\n\t\t\tfloat dy0 = - texelSize.y * shadowRadius;\n\t\t\tfloat dx1 = + texelSize.x * shadowRadius;\n\t\t\tfloat dy1 = + texelSize.y * shadowRadius;\n\t\t\tshadow = (\n\t\t\t\ttexture2DShadowLerp( shadowMap, shadowMapSize, shadowCoord.xy + vec2( dx0, dy0 ), shadowCoord.z ) +\n\t\t\t\ttexture2DShadowLerp( shadowMap, shadowMapSize, shadowCoord.xy + vec2( 0.0, dy0 ), shadowCoord.z ) +\n\t\t\t\ttexture2DShadowLerp( shadowMap, shadowMapSize, shadowCoord.xy + vec2( dx1, dy0 ), shadowCoord.z ) +\n\t\t\t\ttexture2DShadowLerp( shadowMap, shadowMapSize, shadowCoord.xy + vec2( dx0, 0.0 ), shadowCoord.z ) +\n\t\t\t\ttexture2DShadowLerp( shadowMap, shadowMapSize, shadowCoord.xy, shadowCoord.z ) +\n\t\t\t\ttexture2DShadowLerp( shadowMap, shadowMapSize, shadowCoord.xy + vec2( dx1, 0.0 ), shadowCoord.z ) +\n\t\t\t\ttexture2DShadowLerp( shadowMap, shadowMapSize, shadowCoord.xy + vec2( dx0, dy1 ), shadowCoord.z ) +\n\t\t\t\ttexture2DShadowLerp( shadowMap, shadowMapSize, shadowCoord.xy + vec2( 0.0, dy1 ), shadowCoord.z ) +\n\t\t\t\ttexture2DShadowLerp( shadowMap, shadowMapSize, shadowCoord.xy + vec2( dx1, dy1 ), shadowCoord.z )\n\t\t\t) * ( 1.0 / 9.0 );\n\t\t#else\n\t\t\tshadow = texture2DCompare( shadowMap, shadowCoord.xy, shadowCoord.z );\n\t\t#endif\n\t\t}\n\t\treturn shadow;\n\t}\n\tvec2 cubeToUV( vec3 v, float texelSizeY ) {\n\t\tvec3 absV = abs( v );\n\t\tfloat scaleToCube = 1.0 / max( absV.x, max( absV.y, absV.z ) );\n\t\tabsV *= scaleToCube;\n\t\tv *= scaleToCube * ( 1.0 - 2.0 * texelSizeY );\n\t\tvec2 planar = v.xy;\n\t\tfloat almostATexel = 1.5 * texelSizeY;\n\t\tfloat almostOne = 1.0 - almostATexel;\n\t\tif ( absV.z >= almostOne ) {\n\t\t\tif ( v.z > 0.0 )\n\t\t\t\tplanar.x = 4.0 - v.x;\n\t\t} else if ( absV.x >= almostOne ) {\n\t\t\tfloat signX = sign( v.x );\n\t\t\tplanar.x = v.z * signX + 2.0 * signX;\n\t\t} else if ( absV.y >= almostOne ) {\n\t\t\tfloat signY = sign( v.y );\n\t\t\tplanar.x = v.x + 2.0 * signY + 2.0;\n\t\t\tplanar.y = v.z * signY - 2.0;\n\t\t}\n\t\treturn vec2( 0.125, 0.25 ) * planar + vec2( 0.375, 0.75 );\n\t}\n\tfloat getPointShadow( sampler2D shadowMap, vec2 shadowMapSize, float shadowBias, float shadowRadius, vec4 shadowCoord, float shadowCameraNear, float shadowCameraFar ) {\n\t\tvec2 texelSize = vec2( 1.0 ) / ( shadowMapSize * vec2( 4.0, 2.0 ) );\n\t\tvec3 lightToPosition = shadowCoord.xyz;\n\t\tfloat dp = ( length( lightToPosition ) - shadowCameraNear ) / ( shadowCameraFar - shadowCameraNear );\t\tdp += shadowBias;\n\t\tvec3 bd3D = normalize( lightToPosition );\n\t\t#if defined( SHADOWMAP_TYPE_PCF ) || defined( SHADOWMAP_TYPE_PCF_SOFT )\n\t\t\tvec2 offset = vec2( - 1, 1 ) * shadowRadius * texelSize.y;\n\t\t\treturn (\n\t\t\t\ttexture2DCompare( shadowMap, cubeToUV( bd3D + offset.xyy, texelSize.y ), dp ) +\n\t\t\t\ttexture2DCompare( shadowMap, cubeToUV( bd3D + offset.yyy, texelSize.y ), dp ) +\n\t\t\t\ttexture2DCompare( shadowMap, cubeToUV( bd3D + offset.xyx, texelSize.y ), dp ) +\n\t\t\t\ttexture2DCompare( shadowMap, cubeToUV( bd3D + offset.yyx, texelSize.y ), dp ) +\n\t\t\t\ttexture2DCompare( shadowMap, cubeToUV( bd3D, texelSize.y ), dp ) +\n\t\t\t\ttexture2DCompare( shadowMap, cubeToUV( bd3D + offset.xxy, texelSize.y ), dp ) +\n\t\t\t\ttexture2DCompare( shadowMap, cubeToUV( bd3D + offset.yxy, texelSize.y ), dp ) +\n\t\t\t\ttexture2DCompare( shadowMap, cubeToUV( bd3D + offset.xxx, texelSize.y ), dp ) +\n\t\t\t\ttexture2DCompare( shadowMap, cubeToUV( bd3D + offset.yxx, texelSize.y ), dp )\n\t\t\t) * ( 1.0 / 9.0 );\n\t\t#else\n\t\t\treturn texture2DCompare( shadowMap, cubeToUV( bd3D, texelSize.y ), dp );\n\t\t#endif\n\t}\n#endif\n",
shadowmap_pars_vertex:"#ifdef USE_SHADOWMAP\n\t#if NUM_DIR_LIGHTS > 0\n\t\tuniform mat4 directionalShadowMatrix[ NUM_DIR_LIGHTS ];\n\t\tvarying vec4 vDirectionalShadowCoord[ NUM_DIR_LIGHTS ];\n\t#endif\n\t#if NUM_SPOT_LIGHTS > 0\n\t\tuniform mat4 spotShadowMatrix[ NUM_SPOT_LIGHTS ];\n\t\tvarying vec4 vSpotShadowCoord[ NUM_SPOT_LIGHTS ];\n\t#endif\n\t#if NUM_POINT_LIGHTS > 0\n\t\tuniform mat4 pointShadowMatrix[ NUM_POINT_LIGHTS ];\n\t\tvarying vec4 vPointShadowCoord[ NUM_POINT_LIGHTS ];\n\t#endif\n#endif\n",
shadowmap_vertex:"#ifdef USE_SHADOWMAP\n\t#if NUM_DIR_LIGHTS > 0\n\t#pragma unroll_loop\n\tfor ( int i = 0; i < NUM_DIR_LIGHTS; i ++ ) {\n\t\tvDirectionalShadowCoord[ i ] = directionalShadowMatrix[ i ] * worldPosition;\n\t}\n\t#endif\n\t#if NUM_SPOT_LIGHTS > 0\n\t#pragma unroll_loop\n\tfor ( int i = 0; i < NUM_SPOT_LIGHTS; i ++ ) {\n\t\tvSpotShadowCoord[ i ] = spotShadowMatrix[ i ] * worldPosition;\n\t}\n\t#endif\n\t#if NUM_POINT_LIGHTS > 0\n\t#pragma unroll_loop\n\tfor ( int i = 0; i < NUM_POINT_LIGHTS; i ++ ) {\n\t\tvPointShadowCoord[ i ] = pointShadowMatrix[ i ] * worldPosition;\n\t}\n\t#endif\n#endif\n",
shadowmask_pars_fragment:"float getShadowMask() {\n\tfloat shadow = 1.0;\n\t#ifdef USE_SHADOWMAP\n\t#if NUM_DIR_LIGHTS > 0\n\tDirectionalLight directionalLight;\n\t#pragma unroll_loop\n\tfor ( int i = 0; i < NUM_DIR_LIGHTS; i ++ ) {\n\t\tdirectionalLight = directionalLights[ i ];\n\t\tshadow *= bool( directionalLight.shadow ) ? getShadow( directionalShadowMap[ i ], directionalLight.shadowMapSize, directionalLight.shadowBias, directionalLight.shadowRadius, vDirectionalShadowCoord[ i ] ) : 1.0;\n\t}\n\t#endif\n\t#if NUM_SPOT_LIGHTS > 0\n\tSpotLight spotLight;\n\t#pragma unroll_loop\n\tfor ( int i = 0; i < NUM_SPOT_LIGHTS; i ++ ) {\n\t\tspotLight = spotLights[ i ];\n\t\tshadow *= bool( spotLight.shadow ) ? getShadow( spotShadowMap[ i ], spotLight.shadowMapSize, spotLight.shadowBias, spotLight.shadowRadius, vSpotShadowCoord[ i ] ) : 1.0;\n\t}\n\t#endif\n\t#if NUM_POINT_LIGHTS > 0\n\tPointLight pointLight;\n\t#pragma unroll_loop\n\tfor ( int i = 0; i < NUM_POINT_LIGHTS; i ++ ) {\n\t\tpointLight = pointLights[ i ];\n\t\tshadow *= bool( pointLight.shadow ) ? getPointShadow( pointShadowMap[ i ], pointLight.shadowMapSize, pointLight.shadowBias, pointLight.shadowRadius, vPointShadowCoord[ i ], pointLight.shadowCameraNear, pointLight.shadowCameraFar ) : 1.0;\n\t}\n\t#endif\n\t#endif\n\treturn shadow;\n}\n",
skinbase_vertex:"#ifdef USE_SKINNING\n\tmat4 boneMatX = getBoneMatrix( skinIndex.x );\n\tmat4 boneMatY = getBoneMatrix( skinIndex.y );\n\tmat4 boneMatZ = getBoneMatrix( skinIndex.z );\n\tmat4 boneMatW = getBoneMatrix( skinIndex.w );\n#endif",skinning_pars_vertex:"#ifdef USE_SKINNING\n\tuniform mat4 bindMatrix;\n\tuniform mat4 bindMatrixInverse;\n\t#ifdef BONE_TEXTURE\n\t\tuniform sampler2D boneTexture;\n\t\tuniform int boneTextureSize;\n\t\tmat4 getBoneMatrix( const in float i ) {\n\t\t\tfloat j = i * 4.0;\n\t\t\tfloat x = mod( j, float( boneTextureSize ) );\n\t\t\tfloat y = floor( j / float( boneTextureSize ) );\n\t\t\tfloat dx = 1.0 / float( boneTextureSize );\n\t\t\tfloat dy = 1.0 / float( boneTextureSize );\n\t\t\ty = dy * ( y + 0.5 );\n\t\t\tvec4 v1 = texture2D( boneTexture, vec2( dx * ( x + 0.5 ), y ) );\n\t\t\tvec4 v2 = texture2D( boneTexture, vec2( dx * ( x + 1.5 ), y ) );\n\t\t\tvec4 v3 = texture2D( boneTexture, vec2( dx * ( x + 2.5 ), y ) );\n\t\t\tvec4 v4 = texture2D( boneTexture, vec2( dx * ( x + 3.5 ), y ) );\n\t\t\tmat4 bone = mat4( v1, v2, v3, v4 );\n\t\t\treturn bone;\n\t\t}\n\t#else\n\t\tuniform mat4 boneMatrices[ MAX_BONES ];\n\t\tmat4 getBoneMatrix( const in float i ) {\n\t\t\tmat4 bone = boneMatrices[ int(i) ];\n\t\t\treturn bone;\n\t\t}\n\t#endif\n#endif\n",
skinning_vertex:"#ifdef USE_SKINNING\n\tvec4 skinVertex = bindMatrix * vec4( transformed, 1.0 );\n\tvec4 skinned = vec4( 0.0 );\n\tskinned += boneMatX * skinVertex * skinWeight.x;\n\tskinned += boneMatY * skinVertex * skinWeight.y;\n\tskinned += boneMatZ * skinVertex * skinWeight.z;\n\tskinned += boneMatW * skinVertex * skinWeight.w;\n\ttransformed = ( bindMatrixInverse * skinned ).xyz;\n#endif\n",skinnormal_vertex:"#ifdef USE_SKINNING\n\tmat4 skinMatrix = mat4( 0.0 );\n\tskinMatrix += skinWeight.x * boneMatX;\n\tskinMatrix += skinWeight.y * boneMatY;\n\tskinMatrix += skinWeight.z * boneMatZ;\n\tskinMatrix += skinWeight.w * boneMatW;\n\tskinMatrix  = bindMatrixInverse * skinMatrix * bindMatrix;\n\tobjectNormal = vec4( skinMatrix * vec4( objectNormal, 0.0 ) ).xyz;\n#endif\n",
specularmap_fragment:"float specularStrength;\n#ifdef USE_SPECULARMAP\n\tvec4 texelSpecular = texture2D( specularMap, vUv );\n\tspecularStrength = texelSpecular.r;\n#else\n\tspecularStrength = 1.0;\n#endif",specularmap_pars_fragment:"#ifdef USE_SPECULARMAP\n\tuniform sampler2D specularMap;\n#endif",tonemapping_fragment:"#if defined( TONE_MAPPING )\n  gl_FragColor.rgb = toneMapping( gl_FragColor.rgb );\n#endif\n",tonemapping_pars_fragment:"#ifndef saturate\n\t#define saturate(a) clamp( a, 0.0, 1.0 )\n#endif\nuniform float toneMappingExposure;\nuniform float toneMappingWhitePoint;\nvec3 LinearToneMapping( vec3 color ) {\n\treturn toneMappingExposure * color;\n}\nvec3 ReinhardToneMapping( vec3 color ) {\n\tcolor *= toneMappingExposure;\n\treturn saturate( color / ( vec3( 1.0 ) + color ) );\n}\n#define Uncharted2Helper( x ) max( ( ( x * ( 0.15 * x + 0.10 * 0.50 ) + 0.20 * 0.02 ) / ( x * ( 0.15 * x + 0.50 ) + 0.20 * 0.30 ) ) - 0.02 / 0.30, vec3( 0.0 ) )\nvec3 Uncharted2ToneMapping( vec3 color ) {\n\tcolor *= toneMappingExposure;\n\treturn saturate( Uncharted2Helper( color ) / Uncharted2Helper( vec3( toneMappingWhitePoint ) ) );\n}\nvec3 OptimizedCineonToneMapping( vec3 color ) {\n\tcolor *= toneMappingExposure;\n\tcolor = max( vec3( 0.0 ), color - 0.004 );\n\treturn pow( ( color * ( 6.2 * color + 0.5 ) ) / ( color * ( 6.2 * color + 1.7 ) + 0.06 ), vec3( 2.2 ) );\n}\n",
uv_pars_fragment:"#if defined( USE_MAP ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( USE_SPECULARMAP ) || defined( USE_ALPHAMAP ) || defined( USE_EMISSIVEMAP ) || defined( USE_ROUGHNESSMAP ) || defined( USE_METALNESSMAP )\n\tvarying vec2 vUv;\n#endif",uv_pars_vertex:"#if defined( USE_MAP ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( USE_SPECULARMAP ) || defined( USE_ALPHAMAP ) || defined( USE_EMISSIVEMAP ) || defined( USE_ROUGHNESSMAP ) || defined( USE_METALNESSMAP )\n\tvarying vec2 vUv;\n\tuniform mat3 uvTransform;\n#endif\n",
uv_vertex:"#if defined( USE_MAP ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( USE_SPECULARMAP ) || defined( USE_ALPHAMAP ) || defined( USE_EMISSIVEMAP ) || defined( USE_ROUGHNESSMAP ) || defined( USE_METALNESSMAP )\n\tvUv = ( uvTransform * vec3( uv, 1 ) ).xy;\n#endif",uv2_pars_fragment:"#if defined( USE_LIGHTMAP ) || defined( USE_AOMAP )\n\tvarying vec2 vUv2;\n#endif",uv2_pars_vertex:"#if defined( USE_LIGHTMAP ) || defined( USE_AOMAP )\n\tattribute vec2 uv2;\n\tvarying vec2 vUv2;\n#endif",
uv2_vertex:"#if defined( USE_LIGHTMAP ) || defined( USE_AOMAP )\n\tvUv2 = uv2;\n#endif",worldpos_vertex:"#if defined( USE_ENVMAP ) || defined( DISTANCE ) || defined ( USE_SHADOWMAP )\n\tvec4 worldPosition = modelMatrix * vec4( transformed, 1.0 );\n#endif\n",cube_frag:"uniform samplerCube tCube;\nuniform float tFlip;\nuniform float opacity;\nvarying vec3 vWorldPosition;\nvoid main() {\n\tgl_FragColor = textureCube( tCube, vec3( tFlip * vWorldPosition.x, vWorldPosition.yz ) );\n\tgl_FragColor.a *= opacity;\n}\n",
cube_vert:"varying vec3 vWorldPosition;\n#include <common>\nvoid main() {\n\tvWorldPosition = transformDirection( position, modelMatrix );\n\t#include <begin_vertex>\n\t#include <project_vertex>\n\tgl_Position.z = gl_Position.w;\n}\n",depth_frag:"#if DEPTH_PACKING == 3200\n\tuniform float opacity;\n#endif\n#include <common>\n#include <packing>\n#include <uv_pars_fragment>\n#include <map_pars_fragment>\n#include <alphamap_pars_fragment>\n#include <logdepthbuf_pars_fragment>\n#include <clipping_planes_pars_fragment>\nvoid main() {\n\t#include <clipping_planes_fragment>\n\tvec4 diffuseColor = vec4( 1.0 );\n\t#if DEPTH_PACKING == 3200\n\t\tdiffuseColor.a = opacity;\n\t#endif\n\t#include <map_fragment>\n\t#include <alphamap_fragment>\n\t#include <alphatest_fragment>\n\t#include <logdepthbuf_fragment>\n\t#if DEPTH_PACKING == 3200\n\t\tgl_FragColor = vec4( vec3( 1.0 - gl_FragCoord.z ), opacity );\n\t#elif DEPTH_PACKING == 3201\n\t\tgl_FragColor = packDepthToRGBA( gl_FragCoord.z );\n\t#endif\n}\n",
depth_vert:"#include <common>\n#include <uv_pars_vertex>\n#include <displacementmap_pars_vertex>\n#include <morphtarget_pars_vertex>\n#include <skinning_pars_vertex>\n#include <logdepthbuf_pars_vertex>\n#include <clipping_planes_pars_vertex>\nvoid main() {\n\t#include <uv_vertex>\n\t#include <skinbase_vertex>\n\t#ifdef USE_DISPLACEMENTMAP\n\t\t#include <beginnormal_vertex>\n\t\t#include <morphnormal_vertex>\n\t\t#include <skinnormal_vertex>\n\t#endif\n\t#include <begin_vertex>\n\t#include <morphtarget_vertex>\n\t#include <skinning_vertex>\n\t#include <displacementmap_vertex>\n\t#include <project_vertex>\n\t#include <logdepthbuf_vertex>\n\t#include <clipping_planes_vertex>\n}\n",
distanceRGBA_frag:"#define DISTANCE\nuniform vec3 referencePosition;\nuniform float nearDistance;\nuniform float farDistance;\nvarying vec3 vWorldPosition;\n#include <common>\n#include <packing>\n#include <uv_pars_fragment>\n#include <map_pars_fragment>\n#include <alphamap_pars_fragment>\n#include <clipping_planes_pars_fragment>\nvoid main () {\n\t#include <clipping_planes_fragment>\n\tvec4 diffuseColor = vec4( 1.0 );\n\t#include <map_fragment>\n\t#include <alphamap_fragment>\n\t#include <alphatest_fragment>\n\tfloat dist = length( vWorldPosition - referencePosition );\n\tdist = ( dist - nearDistance ) / ( farDistance - nearDistance );\n\tdist = saturate( dist );\n\tgl_FragColor = packDepthToRGBA( dist );\n}\n",
distanceRGBA_vert:"#define DISTANCE\nvarying vec3 vWorldPosition;\n#include <common>\n#include <uv_pars_vertex>\n#include <displacementmap_pars_vertex>\n#include <morphtarget_pars_vertex>\n#include <skinning_pars_vertex>\n#include <clipping_planes_pars_vertex>\nvoid main() {\n\t#include <uv_vertex>\n\t#include <skinbase_vertex>\n\t#ifdef USE_DISPLACEMENTMAP\n\t\t#include <beginnormal_vertex>\n\t\t#include <morphnormal_vertex>\n\t\t#include <skinnormal_vertex>\n\t#endif\n\t#include <begin_vertex>\n\t#include <morphtarget_vertex>\n\t#include <skinning_vertex>\n\t#include <displacementmap_vertex>\n\t#include <project_vertex>\n\t#include <worldpos_vertex>\n\t#include <clipping_planes_vertex>\n\tvWorldPosition = worldPosition.xyz;\n}\n",
equirect_frag:"uniform sampler2D tEquirect;\nvarying vec3 vWorldPosition;\n#include <common>\nvoid main() {\n\tvec3 direction = normalize( vWorldPosition );\n\tvec2 sampleUV;\n\tsampleUV.y = asin( clamp( direction.y, - 1.0, 1.0 ) ) * RECIPROCAL_PI + 0.5;\n\tsampleUV.x = atan( direction.z, direction.x ) * RECIPROCAL_PI2 + 0.5;\n\tgl_FragColor = texture2D( tEquirect, sampleUV );\n}\n",equirect_vert:"varying vec3 vWorldPosition;\n#include <common>\nvoid main() {\n\tvWorldPosition = transformDirection( position, modelMatrix );\n\t#include <begin_vertex>\n\t#include <project_vertex>\n}\n",
linedashed_frag:"uniform vec3 diffuse;\nuniform float opacity;\nuniform float dashSize;\nuniform float totalSize;\nvarying float vLineDistance;\n#include <common>\n#include <color_pars_fragment>\n#include <fog_pars_fragment>\n#include <logdepthbuf_pars_fragment>\n#include <clipping_planes_pars_fragment>\nvoid main() {\n\t#include <clipping_planes_fragment>\n\tif ( mod( vLineDistance, totalSize ) > dashSize ) {\n\t\tdiscard;\n\t}\n\tvec3 outgoingLight = vec3( 0.0 );\n\tvec4 diffuseColor = vec4( diffuse, opacity );\n\t#include <logdepthbuf_fragment>\n\t#include <color_fragment>\n\toutgoingLight = diffuseColor.rgb;\n\tgl_FragColor = vec4( outgoingLight, diffuseColor.a );\n\t#include <premultiplied_alpha_fragment>\n\t#include <tonemapping_fragment>\n\t#include <encodings_fragment>\n\t#include <fog_fragment>\n}\n",
linedashed_vert:"uniform float scale;\nattribute float lineDistance;\nvarying float vLineDistance;\n#include <common>\n#include <color_pars_vertex>\n#include <fog_pars_vertex>\n#include <logdepthbuf_pars_vertex>\n#include <clipping_planes_pars_vertex>\nvoid main() {\n\t#include <color_vertex>\n\tvLineDistance = scale * lineDistance;\n\tvec4 mvPosition = modelViewMatrix * vec4( position, 1.0 );\n\tgl_Position = projectionMatrix * mvPosition;\n\t#include <logdepthbuf_vertex>\n\t#include <clipping_planes_vertex>\n\t#include <fog_vertex>\n}\n",
meshbasic_frag:"uniform vec3 diffuse;\nuniform float opacity;\n#ifndef FLAT_SHADED\n\tvarying vec3 vNormal;\n#endif\n#include <common>\n#include <color_pars_fragment>\n#include <uv_pars_fragment>\n#include <uv2_pars_fragment>\n#include <map_pars_fragment>\n#include <alphamap_pars_fragment>\n#include <aomap_pars_fragment>\n#include <lightmap_pars_fragment>\n#include <envmap_pars_fragment>\n#include <fog_pars_fragment>\n#include <specularmap_pars_fragment>\n#include <logdepthbuf_pars_fragment>\n#include <clipping_planes_pars_fragment>\nvoid main() {\n\t#include <clipping_planes_fragment>\n\tvec4 diffuseColor = vec4( diffuse, opacity );\n\t#include <logdepthbuf_fragment>\n\t#include <map_fragment>\n\t#include <color_fragment>\n\t#include <alphamap_fragment>\n\t#include <alphatest_fragment>\n\t#include <specularmap_fragment>\n\tReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );\n\t#ifdef USE_LIGHTMAP\n\t\treflectedLight.indirectDiffuse += texture2D( lightMap, vUv2 ).xyz * lightMapIntensity;\n\t#else\n\t\treflectedLight.indirectDiffuse += vec3( 1.0 );\n\t#endif\n\t#include <aomap_fragment>\n\treflectedLight.indirectDiffuse *= diffuseColor.rgb;\n\tvec3 outgoingLight = reflectedLight.indirectDiffuse;\n\t#include <envmap_fragment>\n\tgl_FragColor = vec4( outgoingLight, diffuseColor.a );\n\t#include <premultiplied_alpha_fragment>\n\t#include <tonemapping_fragment>\n\t#include <encodings_fragment>\n\t#include <fog_fragment>\n}\n",
meshbasic_vert:"#include <common>\n#include <uv_pars_vertex>\n#include <uv2_pars_vertex>\n#include <envmap_pars_vertex>\n#include <color_pars_vertex>\n#include <fog_pars_vertex>\n#include <morphtarget_pars_vertex>\n#include <skinning_pars_vertex>\n#include <logdepthbuf_pars_vertex>\n#include <clipping_planes_pars_vertex>\nvoid main() {\n\t#include <uv_vertex>\n\t#include <uv2_vertex>\n\t#include <color_vertex>\n\t#include <skinbase_vertex>\n\t#ifdef USE_ENVMAP\n\t#include <beginnormal_vertex>\n\t#include <morphnormal_vertex>\n\t#include <skinnormal_vertex>\n\t#include <defaultnormal_vertex>\n\t#endif\n\t#include <begin_vertex>\n\t#include <morphtarget_vertex>\n\t#include <skinning_vertex>\n\t#include <project_vertex>\n\t#include <logdepthbuf_vertex>\n\t#include <worldpos_vertex>\n\t#include <clipping_planes_vertex>\n\t#include <envmap_vertex>\n\t#include <fog_vertex>\n}\n",
meshlambert_frag:"uniform vec3 diffuse;\nuniform vec3 emissive;\nuniform float opacity;\nvarying vec3 vLightFront;\n#ifdef DOUBLE_SIDED\n\tvarying vec3 vLightBack;\n#endif\n#include <common>\n#include <packing>\n#include <dithering_pars_fragment>\n#include <color_pars_fragment>\n#include <uv_pars_fragment>\n#include <uv2_pars_fragment>\n#include <map_pars_fragment>\n#include <alphamap_pars_fragment>\n#include <aomap_pars_fragment>\n#include <lightmap_pars_fragment>\n#include <emissivemap_pars_fragment>\n#include <envmap_pars_fragment>\n#include <bsdfs>\n#include <lights_pars_begin>\n#include <fog_pars_fragment>\n#include <shadowmap_pars_fragment>\n#include <shadowmask_pars_fragment>\n#include <specularmap_pars_fragment>\n#include <logdepthbuf_pars_fragment>\n#include <clipping_planes_pars_fragment>\nvoid main() {\n\t#include <clipping_planes_fragment>\n\tvec4 diffuseColor = vec4( diffuse, opacity );\n\tReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );\n\tvec3 totalEmissiveRadiance = emissive;\n\t#include <logdepthbuf_fragment>\n\t#include <map_fragment>\n\t#include <color_fragment>\n\t#include <alphamap_fragment>\n\t#include <alphatest_fragment>\n\t#include <specularmap_fragment>\n\t#include <emissivemap_fragment>\n\treflectedLight.indirectDiffuse = getAmbientLightIrradiance( ambientLightColor );\n\t#include <lightmap_fragment>\n\treflectedLight.indirectDiffuse *= BRDF_Diffuse_Lambert( diffuseColor.rgb );\n\t#ifdef DOUBLE_SIDED\n\t\treflectedLight.directDiffuse = ( gl_FrontFacing ) ? vLightFront : vLightBack;\n\t#else\n\t\treflectedLight.directDiffuse = vLightFront;\n\t#endif\n\treflectedLight.directDiffuse *= BRDF_Diffuse_Lambert( diffuseColor.rgb ) * getShadowMask();\n\t#include <aomap_fragment>\n\tvec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + totalEmissiveRadiance;\n\t#include <envmap_fragment>\n\tgl_FragColor = vec4( outgoingLight, diffuseColor.a );\n\t#include <tonemapping_fragment>\n\t#include <encodings_fragment>\n\t#include <fog_fragment>\n\t#include <premultiplied_alpha_fragment>\n\t#include <dithering_fragment>\n}\n",
meshlambert_vert:"#define LAMBERT\nvarying vec3 vLightFront;\n#ifdef DOUBLE_SIDED\n\tvarying vec3 vLightBack;\n#endif\n#include <common>\n#include <uv_pars_vertex>\n#include <uv2_pars_vertex>\n#include <envmap_pars_vertex>\n#include <bsdfs>\n#include <lights_pars_begin>\n#include <color_pars_vertex>\n#include <fog_pars_vertex>\n#include <morphtarget_pars_vertex>\n#include <skinning_pars_vertex>\n#include <shadowmap_pars_vertex>\n#include <logdepthbuf_pars_vertex>\n#include <clipping_planes_pars_vertex>\nvoid main() {\n\t#include <uv_vertex>\n\t#include <uv2_vertex>\n\t#include <color_vertex>\n\t#include <beginnormal_vertex>\n\t#include <morphnormal_vertex>\n\t#include <skinbase_vertex>\n\t#include <skinnormal_vertex>\n\t#include <defaultnormal_vertex>\n\t#include <begin_vertex>\n\t#include <morphtarget_vertex>\n\t#include <skinning_vertex>\n\t#include <project_vertex>\n\t#include <logdepthbuf_vertex>\n\t#include <clipping_planes_vertex>\n\t#include <worldpos_vertex>\n\t#include <envmap_vertex>\n\t#include <lights_lambert_vertex>\n\t#include <shadowmap_vertex>\n\t#include <fog_vertex>\n}\n",
meshphong_frag:"#define PHONG\nuniform vec3 diffuse;\nuniform vec3 emissive;\nuniform vec3 specular;\nuniform float shininess;\nuniform float opacity;\n#include <common>\n#include <packing>\n#include <dithering_pars_fragment>\n#include <color_pars_fragment>\n#include <uv_pars_fragment>\n#include <uv2_pars_fragment>\n#include <map_pars_fragment>\n#include <alphamap_pars_fragment>\n#include <aomap_pars_fragment>\n#include <lightmap_pars_fragment>\n#include <emissivemap_pars_fragment>\n#include <envmap_pars_fragment>\n#include <gradientmap_pars_fragment>\n#include <fog_pars_fragment>\n#include <bsdfs>\n#include <lights_pars_begin>\n#include <lights_phong_pars_fragment>\n#include <shadowmap_pars_fragment>\n#include <bumpmap_pars_fragment>\n#include <normalmap_pars_fragment>\n#include <specularmap_pars_fragment>\n#include <logdepthbuf_pars_fragment>\n#include <clipping_planes_pars_fragment>\nvoid main() {\n\t#include <clipping_planes_fragment>\n\tvec4 diffuseColor = vec4( diffuse, opacity );\n\tReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );\n\tvec3 totalEmissiveRadiance = emissive;\n\t#include <logdepthbuf_fragment>\n\t#include <map_fragment>\n\t#include <color_fragment>\n\t#include <alphamap_fragment>\n\t#include <alphatest_fragment>\n\t#include <specularmap_fragment>\n\t#include <normal_fragment_begin>\n\t#include <normal_fragment_maps>\n\t#include <emissivemap_fragment>\n\t#include <lights_phong_fragment>\n\t#include <lights_fragment_begin>\n\t#include <lights_fragment_maps>\n\t#include <lights_fragment_end>\n\t#include <aomap_fragment>\n\tvec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + reflectedLight.directSpecular + reflectedLight.indirectSpecular + totalEmissiveRadiance;\n\t#include <envmap_fragment>\n\tgl_FragColor = vec4( outgoingLight, diffuseColor.a );\n\t#include <tonemapping_fragment>\n\t#include <encodings_fragment>\n\t#include <fog_fragment>\n\t#include <premultiplied_alpha_fragment>\n\t#include <dithering_fragment>\n}\n",
meshphong_vert:"#define PHONG\nvarying vec3 vViewPosition;\n#ifndef FLAT_SHADED\n\tvarying vec3 vNormal;\n#endif\n#include <common>\n#include <uv_pars_vertex>\n#include <uv2_pars_vertex>\n#include <displacementmap_pars_vertex>\n#include <envmap_pars_vertex>\n#include <color_pars_vertex>\n#include <fog_pars_vertex>\n#include <morphtarget_pars_vertex>\n#include <skinning_pars_vertex>\n#include <shadowmap_pars_vertex>\n#include <logdepthbuf_pars_vertex>\n#include <clipping_planes_pars_vertex>\nvoid main() {\n\t#include <uv_vertex>\n\t#include <uv2_vertex>\n\t#include <color_vertex>\n\t#include <beginnormal_vertex>\n\t#include <morphnormal_vertex>\n\t#include <skinbase_vertex>\n\t#include <skinnormal_vertex>\n\t#include <defaultnormal_vertex>\n#ifndef FLAT_SHADED\n\tvNormal = normalize( transformedNormal );\n#endif\n\t#include <begin_vertex>\n\t#include <morphtarget_vertex>\n\t#include <skinning_vertex>\n\t#include <displacementmap_vertex>\n\t#include <project_vertex>\n\t#include <logdepthbuf_vertex>\n\t#include <clipping_planes_vertex>\n\tvViewPosition = - mvPosition.xyz;\n\t#include <worldpos_vertex>\n\t#include <envmap_vertex>\n\t#include <shadowmap_vertex>\n\t#include <fog_vertex>\n}\n",
meshphysical_frag:"#define PHYSICAL\nuniform vec3 diffuse;\nuniform vec3 emissive;\nuniform float roughness;\nuniform float metalness;\nuniform float opacity;\n#ifndef STANDARD\n\tuniform float clearCoat;\n\tuniform float clearCoatRoughness;\n#endif\nvarying vec3 vViewPosition;\n#ifndef FLAT_SHADED\n\tvarying vec3 vNormal;\n#endif\n#include <common>\n#include <packing>\n#include <dithering_pars_fragment>\n#include <color_pars_fragment>\n#include <uv_pars_fragment>\n#include <uv2_pars_fragment>\n#include <map_pars_fragment>\n#include <alphamap_pars_fragment>\n#include <aomap_pars_fragment>\n#include <lightmap_pars_fragment>\n#include <emissivemap_pars_fragment>\n#include <bsdfs>\n#include <cube_uv_reflection_fragment>\n#include <envmap_pars_fragment>\n#include <envmap_physical_pars_fragment>\n#include <fog_pars_fragment>\n#include <lights_pars_begin>\n#include <lights_physical_pars_fragment>\n#include <shadowmap_pars_fragment>\n#include <bumpmap_pars_fragment>\n#include <normalmap_pars_fragment>\n#include <roughnessmap_pars_fragment>\n#include <metalnessmap_pars_fragment>\n#include <logdepthbuf_pars_fragment>\n#include <clipping_planes_pars_fragment>\nvoid main() {\n\t#include <clipping_planes_fragment>\n\tvec4 diffuseColor = vec4( diffuse, opacity );\n\tReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );\n\tvec3 totalEmissiveRadiance = emissive;\n\t#include <logdepthbuf_fragment>\n\t#include <map_fragment>\n\t#include <color_fragment>\n\t#include <alphamap_fragment>\n\t#include <alphatest_fragment>\n\t#include <roughnessmap_fragment>\n\t#include <metalnessmap_fragment>\n\t#include <normal_fragment_begin>\n\t#include <normal_fragment_maps>\n\t#include <emissivemap_fragment>\n\t#include <lights_physical_fragment>\n\t#include <lights_fragment_begin>\n\t#include <lights_fragment_maps>\n\t#include <lights_fragment_end>\n\t#include <aomap_fragment>\n\tvec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + reflectedLight.directSpecular + reflectedLight.indirectSpecular + totalEmissiveRadiance;\n\tgl_FragColor = vec4( outgoingLight, diffuseColor.a );\n\t#include <tonemapping_fragment>\n\t#include <encodings_fragment>\n\t#include <fog_fragment>\n\t#include <premultiplied_alpha_fragment>\n\t#include <dithering_fragment>\n}\n",
meshphysical_vert:"#define PHYSICAL\nvarying vec3 vViewPosition;\n#ifndef FLAT_SHADED\n\tvarying vec3 vNormal;\n#endif\n#include <common>\n#include <uv_pars_vertex>\n#include <uv2_pars_vertex>\n#include <displacementmap_pars_vertex>\n#include <color_pars_vertex>\n#include <fog_pars_vertex>\n#include <morphtarget_pars_vertex>\n#include <skinning_pars_vertex>\n#include <shadowmap_pars_vertex>\n#include <logdepthbuf_pars_vertex>\n#include <clipping_planes_pars_vertex>\nvoid main() {\n\t#include <uv_vertex>\n\t#include <uv2_vertex>\n\t#include <color_vertex>\n\t#include <beginnormal_vertex>\n\t#include <morphnormal_vertex>\n\t#include <skinbase_vertex>\n\t#include <skinnormal_vertex>\n\t#include <defaultnormal_vertex>\n#ifndef FLAT_SHADED\n\tvNormal = normalize( transformedNormal );\n#endif\n\t#include <begin_vertex>\n\t#include <morphtarget_vertex>\n\t#include <skinning_vertex>\n\t#include <displacementmap_vertex>\n\t#include <project_vertex>\n\t#include <logdepthbuf_vertex>\n\t#include <clipping_planes_vertex>\n\tvViewPosition = - mvPosition.xyz;\n\t#include <worldpos_vertex>\n\t#include <shadowmap_vertex>\n\t#include <fog_vertex>\n}\n",
normal_frag:"#define NORMAL\nuniform float opacity;\n#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || ( defined( USE_NORMALMAP ) && ! defined( OBJECTSPACE_NORMALMAP ) )\n\tvarying vec3 vViewPosition;\n#endif\n#ifndef FLAT_SHADED\n\tvarying vec3 vNormal;\n#endif\n#include <packing>\n#include <uv_pars_fragment>\n#include <bumpmap_pars_fragment>\n#include <normalmap_pars_fragment>\n#include <logdepthbuf_pars_fragment>\nvoid main() {\n\t#include <logdepthbuf_fragment>\n\t#include <normal_fragment_begin>\n\t#include <normal_fragment_maps>\n\tgl_FragColor = vec4( packNormalToRGB( normal ), opacity );\n}\n",
normal_vert:"#define NORMAL\n#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || ( defined( USE_NORMALMAP ) && ! defined( OBJECTSPACE_NORMALMAP ) )\n\tvarying vec3 vViewPosition;\n#endif\n#ifndef FLAT_SHADED\n\tvarying vec3 vNormal;\n#endif\n#include <uv_pars_vertex>\n#include <displacementmap_pars_vertex>\n#include <morphtarget_pars_vertex>\n#include <skinning_pars_vertex>\n#include <logdepthbuf_pars_vertex>\nvoid main() {\n\t#include <uv_vertex>\n\t#include <beginnormal_vertex>\n\t#include <morphnormal_vertex>\n\t#include <skinbase_vertex>\n\t#include <skinnormal_vertex>\n\t#include <defaultnormal_vertex>\n#ifndef FLAT_SHADED\n\tvNormal = normalize( transformedNormal );\n#endif\n\t#include <begin_vertex>\n\t#include <morphtarget_vertex>\n\t#include <skinning_vertex>\n\t#include <displacementmap_vertex>\n\t#include <project_vertex>\n\t#include <logdepthbuf_vertex>\n#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || ( defined( USE_NORMALMAP ) && ! defined( OBJECTSPACE_NORMALMAP ) )\n\tvViewPosition = - mvPosition.xyz;\n#endif\n}\n",
points_frag:"uniform vec3 diffuse;\nuniform float opacity;\n#include <common>\n#include <color_pars_fragment>\n#include <map_particle_pars_fragment>\n#include <fog_pars_fragment>\n#include <logdepthbuf_pars_fragment>\n#include <clipping_planes_pars_fragment>\nvoid main() {\n\t#include <clipping_planes_fragment>\n\tvec3 outgoingLight = vec3( 0.0 );\n\tvec4 diffuseColor = vec4( diffuse, opacity );\n\t#include <logdepthbuf_fragment>\n\t#include <map_particle_fragment>\n\t#include <color_fragment>\n\t#include <alphatest_fragment>\n\toutgoingLight = diffuseColor.rgb;\n\tgl_FragColor = vec4( outgoingLight, diffuseColor.a );\n\t#include <premultiplied_alpha_fragment>\n\t#include <tonemapping_fragment>\n\t#include <encodings_fragment>\n\t#include <fog_fragment>\n}\n",
points_vert:"uniform float size;\nuniform float scale;\n#include <common>\n#include <color_pars_vertex>\n#include <fog_pars_vertex>\n#include <morphtarget_pars_vertex>\n#include <logdepthbuf_pars_vertex>\n#include <clipping_planes_pars_vertex>\nvoid main() {\n\t#include <color_vertex>\n\t#include <begin_vertex>\n\t#include <morphtarget_vertex>\n\t#include <project_vertex>\n\tgl_PointSize = size;\n\t#ifdef USE_SIZEATTENUATION\n\t\tbool isPerspective = ( projectionMatrix[ 2 ][ 3 ] == - 1.0 );\n\t\tif ( isPerspective ) gl_PointSize *= ( scale / - mvPosition.z );\n\t#endif\n\t#include <logdepthbuf_vertex>\n\t#include <clipping_planes_vertex>\n\t#include <worldpos_vertex>\n\t#include <fog_vertex>\n}\n",
shadow_frag:"uniform vec3 color;\nuniform float opacity;\n#include <common>\n#include <packing>\n#include <fog_pars_fragment>\n#include <bsdfs>\n#include <lights_pars_begin>\n#include <shadowmap_pars_fragment>\n#include <shadowmask_pars_fragment>\nvoid main() {\n\tgl_FragColor = vec4( color, opacity * ( 1.0 - getShadowMask() ) );\n\t#include <fog_fragment>\n}\n",shadow_vert:"#include <fog_pars_vertex>\n#include <shadowmap_pars_vertex>\nvoid main() {\n\t#include <begin_vertex>\n\t#include <project_vertex>\n\t#include <worldpos_vertex>\n\t#include <shadowmap_vertex>\n\t#include <fog_vertex>\n}\n",
sprite_frag:"uniform vec3 diffuse;\nuniform float opacity;\n#include <common>\n#include <uv_pars_fragment>\n#include <map_pars_fragment>\n#include <fog_pars_fragment>\n#include <logdepthbuf_pars_fragment>\n#include <clipping_planes_pars_fragment>\nvoid main() {\n\t#include <clipping_planes_fragment>\n\tvec3 outgoingLight = vec3( 0.0 );\n\tvec4 diffuseColor = vec4( diffuse, opacity );\n\t#include <logdepthbuf_fragment>\n\t#include <map_fragment>\n\t#include <alphatest_fragment>\n\toutgoingLight = diffuseColor.rgb;\n\tgl_FragColor = vec4( outgoingLight, diffuseColor.a );\n\t#include <tonemapping_fragment>\n\t#include <encodings_fragment>\n\t#include <fog_fragment>\n}\n",
sprite_vert:"uniform float rotation;\nuniform vec2 center;\n#include <common>\n#include <uv_pars_vertex>\n#include <fog_pars_vertex>\n#include <logdepthbuf_pars_vertex>\n#include <clipping_planes_pars_vertex>\nvoid main() {\n\t#include <uv_vertex>\n\tvec4 mvPosition = modelViewMatrix * vec4( 0.0, 0.0, 0.0, 1.0 );\n\tvec2 scale;\n\tscale.x = length( vec3( modelMatrix[ 0 ].x, modelMatrix[ 0 ].y, modelMatrix[ 0 ].z ) );\n\tscale.y = length( vec3( modelMatrix[ 1 ].x, modelMatrix[ 1 ].y, modelMatrix[ 1 ].z ) );\n\t#ifndef USE_SIZEATTENUATION\n\t\tbool isPerspective = ( projectionMatrix[ 2 ][ 3 ] == - 1.0 );\n\t\tif ( isPerspective ) scale *= - mvPosition.z;\n\t#endif\n\tvec2 alignedPosition = ( position.xy - ( center - vec2( 0.5 ) ) ) * scale;\n\tvec2 rotatedPosition;\n\trotatedPosition.x = cos( rotation ) * alignedPosition.x - sin( rotation ) * alignedPosition.y;\n\trotatedPosition.y = sin( rotation ) * alignedPosition.x + cos( rotation ) * alignedPosition.y;\n\tmvPosition.xy += rotatedPosition;\n\tgl_Position = projectionMatrix * mvPosition;\n\t#include <logdepthbuf_vertex>\n\t#include <clipping_planes_vertex>\n\t#include <fog_vertex>\n}\n"},
Ba={merge:function(a){for(var b={},c=0;c<a.length;c++){var d=this.clone(a[c]),e;for(e in d)b[e]=d[e]}return b},clone:function(a){var b={},c;for(c in a){b[c]={};for(var d in a[c]){var e=a[c][d];e&&(e.isColor||e.isMatrix3||e.isMatrix4||e.isVector2||e.isVector3||e.isVector4||e.isTexture)?b[c][d]=e.clone():Array.isArray(e)?b[c][d]=e.slice():b[c][d]=e}}return b}},Sg={aliceblue:15792383,antiquewhite:16444375,aqua:65535,aquamarine:8388564,azure:15794175,beige:16119260,bisque:16770244,black:0,blanchedalmond:16772045,
blue:255,blueviolet:9055202,brown:10824234,burlywood:14596231,cadetblue:6266528,chartreuse:8388352,chocolate:13789470,coral:16744272,cornflowerblue:6591981,cornsilk:16775388,crimson:14423100,cyan:65535,darkblue:139,darkcyan:35723,darkgoldenrod:12092939,darkgray:11119017,darkgreen:25600,darkgrey:11119017,darkkhaki:12433259,darkmagenta:9109643,darkolivegreen:5597999,darkorange:16747520,darkorchid:10040012,darkred:9109504,darksalmon:15308410,darkseagreen:9419919,darkslateblue:4734347,darkslategray:3100495,
darkslategrey:3100495,darkturquoise:52945,darkviolet:9699539,deeppink:16716947,deepskyblue:49151,dimgray:6908265,dimgrey:6908265,dodgerblue:2003199,firebrick:11674146,floralwhite:16775920,forestgreen:2263842,fuchsia:16711935,gainsboro:14474460,ghostwhite:16316671,gold:16766720,goldenrod:14329120,gray:8421504,green:32768,greenyellow:11403055,grey:8421504,honeydew:15794160,hotpink:16738740,indianred:13458524,indigo:4915330,ivory:16777200,khaki:15787660,lavender:15132410,lavenderblush:16773365,lawngreen:8190976,
lemonchiffon:16775885,lightblue:11393254,lightcoral:15761536,lightcyan:14745599,lightgoldenrodyellow:16448210,lightgray:13882323,lightgreen:9498256,lightgrey:13882323,lightpink:16758465,lightsalmon:16752762,lightseagreen:2142890,lightskyblue:8900346,lightslategray:7833753,lightslategrey:7833753,lightsteelblue:11584734,lightyellow:16777184,lime:65280,limegreen:3329330,linen:16445670,magenta:16711935,maroon:8388608,mediumaquamarine:6737322,mediumblue:205,mediumorchid:12211667,mediumpurple:9662683,mediumseagreen:3978097,
mediumslateblue:8087790,mediumspringgreen:64154,mediumturquoise:4772300,mediumvioletred:13047173,midnightblue:1644912,mintcream:16121850,mistyrose:16770273,moccasin:16770229,navajowhite:16768685,navy:128,oldlace:16643558,olive:8421376,olivedrab:7048739,orange:16753920,orangered:16729344,orchid:14315734,palegoldenrod:15657130,palegreen:10025880,paleturquoise:11529966,palevioletred:14381203,papayawhip:16773077,peachpuff:16767673,peru:13468991,pink:16761035,plum:14524637,powderblue:11591910,purple:8388736,
rebeccapurple:6697881,red:16711680,rosybrown:12357519,royalblue:4286945,saddlebrown:9127187,salmon:16416882,sandybrown:16032864,seagreen:3050327,seashell:16774638,sienna:10506797,silver:12632256,skyblue:8900331,slateblue:6970061,slategray:7372944,slategrey:7372944,snow:16775930,springgreen:65407,steelblue:4620980,tan:13808780,teal:32896,thistle:14204888,tomato:16737095,turquoise:4251856,violet:15631086,wheat:16113331,white:16777215,whitesmoke:16119285,yellow:16776960,yellowgreen:10145074};Object.assign(F.prototype,
{isColor:!0,r:1,g:1,b:1,set:function(a){a&&a.isColor?this.copy(a):"number"===typeof a?this.setHex(a):"string"===typeof a&&this.setStyle(a);return this},setScalar:function(a){this.b=this.g=this.r=a;return this},setHex:function(a){a=Math.floor(a);this.r=(a>>16&255)/255;this.g=(a>>8&255)/255;this.b=(a&255)/255;return this},setRGB:function(a,b,c){this.r=a;this.g=b;this.b=c;return this},setHSL:function(){function a(a,c,d){0>d&&(d+=1);1<d&&--d;return d<1/6?a+6*(c-a)*d:.5>d?c:d<2/3?a+6*(c-a)*(2/3-d):a}return function(b,
c,d){b=K.euclideanModulo(b,1);c=K.clamp(c,0,1);d=K.clamp(d,0,1);0===c?this.r=this.g=this.b=d:(c=.5>=d?d*(1+c):d+c-d*c,d=2*d-c,this.r=a(d,c,b+1/3),this.g=a(d,c,b),this.b=a(d,c,b-1/3));return this}}(),setStyle:function(a){function b(b){void 0!==b&&1>parseFloat(b)&&console.warn("THREE.Color: Alpha component of "+a+" will be ignored.")}var c;if(c=/^((?:rgb|hsl)a?)\(\s*([^\)]*)\)/.exec(a)){var d=c[2];switch(c[1]){case "rgb":case "rgba":if(c=/^(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(,\s*([0-9]*\.?[0-9]+)\s*)?$/.exec(d))return this.r=
Math.min(255,parseInt(c[1],10))/255,this.g=Math.min(255,parseInt(c[2],10))/255,this.b=Math.min(255,parseInt(c[3],10))/255,b(c[5]),this;if(c=/^(\d+)%\s*,\s*(\d+)%\s*,\s*(\d+)%\s*(,\s*([0-9]*\.?[0-9]+)\s*)?$/.exec(d))return this.r=Math.min(100,parseInt(c[1],10))/100,this.g=Math.min(100,parseInt(c[2],10))/100,this.b=Math.min(100,parseInt(c[3],10))/100,b(c[5]),this;break;case "hsl":case "hsla":if(c=/^([0-9]*\.?[0-9]+)\s*,\s*(\d+)%\s*,\s*(\d+)%\s*(,\s*([0-9]*\.?[0-9]+)\s*)?$/.exec(d)){d=parseFloat(c[1])/
360;var e=parseInt(c[2],10)/100,f=parseInt(c[3],10)/100;b(c[5]);return this.setHSL(d,e,f)}}}else if(c=/^#([A-Fa-f0-9]+)$/.exec(a)){c=c[1];d=c.length;if(3===d)return this.r=parseInt(c.charAt(0)+c.charAt(0),16)/255,this.g=parseInt(c.charAt(1)+c.charAt(1),16)/255,this.b=parseInt(c.charAt(2)+c.charAt(2),16)/255,this;if(6===d)return this.r=parseInt(c.charAt(0)+c.charAt(1),16)/255,this.g=parseInt(c.charAt(2)+c.charAt(3),16)/255,this.b=parseInt(c.charAt(4)+c.charAt(5),16)/255,this}a&&0<a.length&&(c=Sg[a],
void 0!==c?this.setHex(c):console.warn("THREE.Color: Unknown color "+a));return this},clone:function(){return new this.constructor(this.r,this.g,this.b)},copy:function(a){this.r=a.r;this.g=a.g;this.b=a.b;return this},copyGammaToLinear:function(a,b){void 0===b&&(b=2);this.r=Math.pow(a.r,b);this.g=Math.pow(a.g,b);this.b=Math.pow(a.b,b);return this},copyLinearToGamma:function(a,b){void 0===b&&(b=2);b=0<b?1/b:1;this.r=Math.pow(a.r,b);this.g=Math.pow(a.g,b);this.b=Math.pow(a.b,b);return this},convertGammaToLinear:function(a){this.copyGammaToLinear(this,
a);return this},convertLinearToGamma:function(a){this.copyLinearToGamma(this,a);return this},copySRGBToLinear:function(){function a(a){return.04045>a?.0773993808*a:Math.pow(.9478672986*a+.0521327014,2.4)}return function(b){this.r=a(b.r);this.g=a(b.g);this.b=a(b.b);return this}}(),copyLinearToSRGB:function(){function a(a){return.0031308>a?12.92*a:1.055*Math.pow(a,.41666)-.055}return function(b){this.r=a(b.r);this.g=a(b.g);this.b=a(b.b);return this}}(),convertSRGBToLinear:function(){this.copySRGBToLinear(this);
return this},convertLinearToSRGB:function(){this.copyLinearToSRGB(this);return this},getHex:function(){return 255*this.r<<16^255*this.g<<8^255*this.b<<0},getHexString:function(){return("000000"+this.getHex().toString(16)).slice(-6)},getHSL:function(a){void 0===a&&(console.warn("THREE.Color: .getHSL() target is now required"),a={h:0,s:0,l:0});var b=this.r,c=this.g,d=this.b,e=Math.max(b,c,d),f=Math.min(b,c,d),g,h=(f+e)/2;if(f===e)f=g=0;else{var k=e-f;f=.5>=h?k/(e+f):k/(2-e-f);switch(e){case b:g=(c-
d)/k+(c<d?6:0);break;case c:g=(d-b)/k+2;break;case d:g=(b-c)/k+4}g/=6}a.h=g;a.s=f;a.l=h;return a},getStyle:function(){return"rgb("+(255*this.r|0)+","+(255*this.g|0)+","+(255*this.b|0)+")"},offsetHSL:function(){var a={};return function(b,c,d){this.getHSL(a);a.h+=b;a.s+=c;a.l+=d;this.setHSL(a.h,a.s,a.l);return this}}(),add:function(a){this.r+=a.r;this.g+=a.g;this.b+=a.b;return this},addColors:function(a,b){this.r=a.r+b.r;this.g=a.g+b.g;this.b=a.b+b.b;return this},addScalar:function(a){this.r+=a;this.g+=
a;this.b+=a;return this},sub:function(a){this.r=Math.max(0,this.r-a.r);this.g=Math.max(0,this.g-a.g);this.b=Math.max(0,this.b-a.b);return this},multiply:function(a){this.r*=a.r;this.g*=a.g;this.b*=a.b;return this},multiplyScalar:function(a){this.r*=a;this.g*=a;this.b*=a;return this},lerp:function(a,b){this.r+=(a.r-this.r)*b;this.g+=(a.g-this.g)*b;this.b+=(a.b-this.b)*b;return this},lerpHSL:function(){var a={h:0,s:0,l:0},b={h:0,s:0,l:0};return function(c,d){this.getHSL(a);c.getHSL(b);c=K.lerp(a.h,
b.h,d);var e=K.lerp(a.s,b.s,d);d=K.lerp(a.l,b.l,d);this.setHSL(c,e,d);return this}}(),equals:function(a){return a.r===this.r&&a.g===this.g&&a.b===this.b},fromArray:function(a,b){void 0===b&&(b=0);this.r=a[b];this.g=a[b+1];this.b=a[b+2];return this},toArray:function(a,b){void 0===a&&(a=[]);void 0===b&&(b=0);a[b]=this.r;a[b+1]=this.g;a[b+2]=this.b;return a},toJSON:function(){return this.getHex()}});var R={common:{diffuse:{value:new F(15658734)},opacity:{value:1},map:{value:null},uvTransform:{value:new na},
alphaMap:{value:null}},specularmap:{specularMap:{value:null}},envmap:{envMap:{value:null},flipEnvMap:{value:-1},reflectivity:{value:1},refractionRatio:{value:.98},maxMipLevel:{value:0}},aomap:{aoMap:{value:null},aoMapIntensity:{value:1}},lightmap:{lightMap:{value:null},lightMapIntensity:{value:1}},emissivemap:{emissiveMap:{value:null}},bumpmap:{bumpMap:{value:null},bumpScale:{value:1}},normalmap:{normalMap:{value:null},normalScale:{value:new z(1,1)}},displacementmap:{displacementMap:{value:null},
displacementScale:{value:1},displacementBias:{value:0}},roughnessmap:{roughnessMap:{value:null}},metalnessmap:{metalnessMap:{value:null}},gradientmap:{gradientMap:{value:null}},fog:{fogDensity:{value:2.5E-4},fogNear:{value:1},fogFar:{value:2E3},fogColor:{value:new F(16777215)}},lights:{ambientLightColor:{value:[]},directionalLights:{value:[],properties:{direction:{},color:{},shadow:{},shadowBias:{},shadowRadius:{},shadowMapSize:{}}},directionalShadowMap:{value:[]},directionalShadowMatrix:{value:[]},
spotLights:{value:[],properties:{color:{},position:{},direction:{},distance:{},coneCos:{},penumbraCos:{},decay:{},shadow:{},shadowBias:{},shadowRadius:{},shadowMapSize:{}}},spotShadowMap:{value:[]},spotShadowMatrix:{value:[]},pointLights:{value:[],properties:{color:{},position:{},decay:{},distance:{},shadow:{},shadowBias:{},shadowRadius:{},shadowMapSize:{},shadowCameraNear:{},shadowCameraFar:{}}},pointShadowMap:{value:[]},pointShadowMatrix:{value:[]},hemisphereLights:{value:[],properties:{direction:{},
skyColor:{},groundColor:{}}},rectAreaLights:{value:[],properties:{color:{},position:{},width:{},height:{}}}},points:{diffuse:{value:new F(15658734)},opacity:{value:1},size:{value:1},scale:{value:1},map:{value:null},uvTransform:{value:new na}},sprite:{diffuse:{value:new F(15658734)},opacity:{value:1},center:{value:new z(.5,.5)},rotation:{value:0},map:{value:null},uvTransform:{value:new na}}},pb={basic:{uniforms:Ba.merge([R.common,R.specularmap,R.envmap,R.aomap,R.lightmap,R.fog]),vertexShader:U.meshbasic_vert,
fragmentShader:U.meshbasic_frag},lambert:{uniforms:Ba.merge([R.common,R.specularmap,R.envmap,R.aomap,R.lightmap,R.emissivemap,R.fog,R.lights,{emissive:{value:new F(0)}}]),vertexShader:U.meshlambert_vert,fragmentShader:U.meshlambert_frag},phong:{uniforms:Ba.merge([R.common,R.specularmap,R.envmap,R.aomap,R.lightmap,R.emissivemap,R.bumpmap,R.normalmap,R.displacementmap,R.gradientmap,R.fog,R.lights,{emissive:{value:new F(0)},specular:{value:new F(1118481)},shininess:{value:30}}]),vertexShader:U.meshphong_vert,
fragmentShader:U.meshphong_frag},standard:{uniforms:Ba.merge([R.common,R.envmap,R.aomap,R.lightmap,R.emissivemap,R.bumpmap,R.normalmap,R.displacementmap,R.roughnessmap,R.metalnessmap,R.fog,R.lights,{emissive:{value:new F(0)},roughness:{value:.5},metalness:{value:.5},envMapIntensity:{value:1}}]),vertexShader:U.meshphysical_vert,fragmentShader:U.meshphysical_frag},points:{uniforms:Ba.merge([R.points,R.fog]),vertexShader:U.points_vert,fragmentShader:U.points_frag},dashed:{uniforms:Ba.merge([R.common,
R.fog,{scale:{value:1},dashSize:{value:1},totalSize:{value:2}}]),vertexShader:U.linedashed_vert,fragmentShader:U.linedashed_frag},depth:{uniforms:Ba.merge([R.common,R.displacementmap]),vertexShader:U.depth_vert,fragmentShader:U.depth_frag},normal:{uniforms:Ba.merge([R.common,R.bumpmap,R.normalmap,R.displacementmap,{opacity:{value:1}}]),vertexShader:U.normal_vert,fragmentShader:U.normal_frag},sprite:{uniforms:Ba.merge([R.sprite,R.fog]),vertexShader:U.sprite_vert,fragmentShader:U.sprite_frag},cube:{uniforms:{tCube:{value:null},
tFlip:{value:-1},opacity:{value:1}},vertexShader:U.cube_vert,fragmentShader:U.cube_frag},equirect:{uniforms:{tEquirect:{value:null}},vertexShader:U.equirect_vert,fragmentShader:U.equirect_frag},distanceRGBA:{uniforms:Ba.merge([R.common,R.displacementmap,{referencePosition:{value:new p},nearDistance:{value:1},farDistance:{value:1E3}}]),vertexShader:U.distanceRGBA_vert,fragmentShader:U.distanceRGBA_frag},shadow:{uniforms:Ba.merge([R.lights,R.fog,{color:{value:new F(0)},opacity:{value:1}}]),vertexShader:U.shadow_vert,
fragmentShader:U.shadow_frag}};pb.physical={uniforms:Ba.merge([pb.standard.uniforms,{clearCoat:{value:0},clearCoatRoughness:{value:0}}]),vertexShader:U.meshphysical_vert,fragmentShader:U.meshphysical_frag};jb.RotationOrders="XYZ YZX ZXY XZY YXZ ZYX".split(" ");jb.DefaultOrder="XYZ";Object.defineProperties(jb.prototype,{x:{get:function(){return this._x},set:function(a){this._x=a;this.onChangeCallback()}},y:{get:function(){return this._y},set:function(a){this._y=a;this.onChangeCallback()}},z:{get:function(){return this._z},
set:function(a){this._z=a;this.onChangeCallback()}},order:{get:function(){return this._order},set:function(a){this._order=a;this.onChangeCallback()}}});Object.assign(jb.prototype,{isEuler:!0,set:function(a,b,c,d){this._x=a;this._y=b;this._z=c;this._order=d||this._order;this.onChangeCallback();return this},clone:function(){return new this.constructor(this._x,this._y,this._z,this._order)},copy:function(a){this._x=a._x;this._y=a._y;this._z=a._z;this._order=a._order;this.onChangeCallback();return this},
setFromRotationMatrix:function(a,b,c){var d=K.clamp,e=a.elements;a=e[0];var f=e[4],g=e[8],h=e[1],k=e[5],m=e[9],l=e[2],n=e[6];e=e[10];b=b||this._order;"XYZ"===b?(this._y=Math.asin(d(g,-1,1)),.99999>Math.abs(g)?(this._x=Math.atan2(-m,e),this._z=Math.atan2(-f,a)):(this._x=Math.atan2(n,k),this._z=0)):"YXZ"===b?(this._x=Math.asin(-d(m,-1,1)),.99999>Math.abs(m)?(this._y=Math.atan2(g,e),this._z=Math.atan2(h,k)):(this._y=Math.atan2(-l,a),this._z=0)):"ZXY"===b?(this._x=Math.asin(d(n,-1,1)),.99999>Math.abs(n)?
(this._y=Math.atan2(-l,e),this._z=Math.atan2(-f,k)):(this._y=0,this._z=Math.atan2(h,a))):"ZYX"===b?(this._y=Math.asin(-d(l,-1,1)),.99999>Math.abs(l)?(this._x=Math.atan2(n,e),this._z=Math.atan2(h,a)):(this._x=0,this._z=Math.atan2(-f,k))):"YZX"===b?(this._z=Math.asin(d(h,-1,1)),.99999>Math.abs(h)?(this._x=Math.atan2(-m,k),this._y=Math.atan2(-l,a)):(this._x=0,this._y=Math.atan2(g,e))):"XZY"===b?(this._z=Math.asin(-d(f,-1,1)),.99999>Math.abs(f)?(this._x=Math.atan2(n,k),this._y=Math.atan2(g,a)):(this._x=
Math.atan2(-m,e),this._y=0)):console.warn("THREE.Euler: .setFromRotationMatrix() given unsupported order: "+b);this._order=b;if(!1!==c)this.onChangeCallback();return this},setFromQuaternion:function(){var a=new J;return function(b,c,d){a.makeRotationFromQuaternion(b);return this.setFromRotationMatrix(a,c,d)}}(),setFromVector3:function(a,b){return this.set(a.x,a.y,a.z,b||this._order)},reorder:function(){var a=new ha;return function(b){a.setFromEuler(this);return this.setFromQuaternion(a,b)}}(),equals:function(a){return a._x===
this._x&&a._y===this._y&&a._z===this._z&&a._order===this._order},fromArray:function(a){this._x=a[0];this._y=a[1];this._z=a[2];void 0!==a[3]&&(this._order=a[3]);this.onChangeCallback();return this},toArray:function(a,b){void 0===a&&(a=[]);void 0===b&&(b=0);a[b]=this._x;a[b+1]=this._y;a[b+2]=this._z;a[b+3]=this._order;return a},toVector3:function(a){return a?a.set(this._x,this._y,this._z):new p(this._x,this._y,this._z)},onChange:function(a){this.onChangeCallback=a;return this},onChangeCallback:function(){}});
Object.assign(Sd.prototype,{set:function(a){this.mask=1<<a|0},enable:function(a){this.mask=this.mask|1<<a|0},toggle:function(a){this.mask^=1<<a|0},disable:function(a){this.mask&=~(1<<a|0)},test:function(a){return 0!==(this.mask&a.mask)}});var Ff=0;B.DefaultUp=new p(0,1,0);B.DefaultMatrixAutoUpdate=!0;B.prototype=Object.assign(Object.create(ea.prototype),{constructor:B,isObject3D:!0,onBeforeRender:function(){},onAfterRender:function(){},applyMatrix:function(a){this.matrix.multiplyMatrices(a,this.matrix);
this.matrix.decompose(this.position,this.quaternion,this.scale)},applyQuaternion:function(a){this.quaternion.premultiply(a);return this},setRotationFromAxisAngle:function(a,b){this.quaternion.setFromAxisAngle(a,b)},setRotationFromEuler:function(a){this.quaternion.setFromEuler(a,!0)},setRotationFromMatrix:function(a){this.quaternion.setFromRotationMatrix(a)},setRotationFromQuaternion:function(a){this.quaternion.copy(a)},rotateOnAxis:function(){var a=new ha;return function(b,c){a.setFromAxisAngle(b,
c);this.quaternion.multiply(a);return this}}(),rotateOnWorldAxis:function(){var a=new ha;return function(b,c){a.setFromAxisAngle(b,c);this.quaternion.premultiply(a);return this}}(),rotateX:function(){var a=new p(1,0,0);return function(b){return this.rotateOnAxis(a,b)}}(),rotateY:function(){var a=new p(0,1,0);return function(b){return this.rotateOnAxis(a,b)}}(),rotateZ:function(){var a=new p(0,0,1);return function(b){return this.rotateOnAxis(a,b)}}(),translateOnAxis:function(){var a=new p;return function(b,
c){a.copy(b).applyQuaternion(this.quaternion);this.position.add(a.multiplyScalar(c));return this}}(),translateX:function(){var a=new p(1,0,0);return function(b){return this.translateOnAxis(a,b)}}(),translateY:function(){var a=new p(0,1,0);return function(b){return this.translateOnAxis(a,b)}}(),translateZ:function(){var a=new p(0,0,1);return function(b){return this.translateOnAxis(a,b)}}(),localToWorld:function(a){return a.applyMatrix4(this.matrixWorld)},worldToLocal:function(){var a=new J;return function(b){return b.applyMatrix4(a.getInverse(this.matrixWorld))}}(),
lookAt:function(){var a=new ha,b=new J,c=new p,d=new p;return function(e,f,g){e.isVector3?c.copy(e):c.set(e,f,g);e=this.parent;this.updateWorldMatrix(!0,!1);d.setFromMatrixPosition(this.matrixWorld);this.isCamera?b.lookAt(d,c,this.up):b.lookAt(c,d,this.up);this.quaternion.setFromRotationMatrix(b);e&&(b.extractRotation(e.matrixWorld),a.setFromRotationMatrix(b),this.quaternion.premultiply(a.inverse()))}}(),add:function(a){if(1<arguments.length){for(var b=0;b<arguments.length;b++)this.add(arguments[b]);
return this}if(a===this)return console.error("THREE.Object3D.add: object can't be added as a child of itself.",a),this;a&&a.isObject3D?(null!==a.parent&&a.parent.remove(a),a.parent=this,a.dispatchEvent({type:"added"}),this.children.push(a)):console.error("THREE.Object3D.add: object not an instance of THREE.Object3D.",a);return this},remove:function(a){if(1<arguments.length){for(var b=0;b<arguments.length;b++)this.remove(arguments[b]);return this}b=this.children.indexOf(a);-1!==b&&(a.parent=null,a.dispatchEvent({type:"removed"}),
this.children.splice(b,1));return this},getObjectById:function(a){return this.getObjectByProperty("id",a)},getObjectByName:function(a){return this.getObjectByProperty("name",a)},getObjectByProperty:function(a,b){if(this[a]===b)return this;for(var c=0,d=this.children.length;c<d;c++){var e=this.children[c].getObjectByProperty(a,b);if(void 0!==e)return e}},getWorldPosition:function(a){void 0===a&&(console.warn("THREE.Object3D: .getWorldPosition() target is now required"),a=new p);this.updateMatrixWorld(!0);
return a.setFromMatrixPosition(this.matrixWorld)},getWorldQuaternion:function(){var a=new p,b=new p;return function(c){void 0===c&&(console.warn("THREE.Object3D: .getWorldQuaternion() target is now required"),c=new ha);this.updateMatrixWorld(!0);this.matrixWorld.decompose(a,c,b);return c}}(),getWorldScale:function(){var a=new p,b=new ha;return function(c){void 0===c&&(console.warn("THREE.Object3D: .getWorldScale() target is now required"),c=new p);this.updateMatrixWorld(!0);this.matrixWorld.decompose(a,
b,c);return c}}(),getWorldDirection:function(a){void 0===a&&(console.warn("THREE.Object3D: .getWorldDirection() target is now required"),a=new p);this.updateMatrixWorld(!0);var b=this.matrixWorld.elements;return a.set(b[8],b[9],b[10]).normalize()},raycast:function(){},traverse:function(a){a(this);for(var b=this.children,c=0,d=b.length;c<d;c++)b[c].traverse(a)},traverseVisible:function(a){if(!1!==this.visible){a(this);for(var b=this.children,c=0,d=b.length;c<d;c++)b[c].traverseVisible(a)}},traverseAncestors:function(a){var b=
this.parent;null!==b&&(a(b),b.traverseAncestors(a))},updateMatrix:function(){this.matrix.compose(this.position,this.quaternion,this.scale);this.matrixWorldNeedsUpdate=!0},updateMatrixWorld:function(a){this.matrixAutoUpdate&&this.updateMatrix();if(this.matrixWorldNeedsUpdate||a)null===this.parent?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix),this.matrixWorldNeedsUpdate=!1,a=!0;for(var b=this.children,c=0,d=b.length;c<d;c++)b[c].updateMatrixWorld(a)},
updateWorldMatrix:function(a,b){var c=this.parent;!0===a&&null!==c&&c.updateWorldMatrix(!0,!1);this.matrixAutoUpdate&&this.updateMatrix();null===this.parent?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix);if(!0===b)for(a=this.children,b=0,c=a.length;b<c;b++)a[b].updateWorldMatrix(!1,!0)},toJSON:function(a){function b(b,c){void 0===b[c.uuid]&&(b[c.uuid]=c.toJSON(a));return c.uuid}function c(a){var b=[],c;for(c in a){var d=a[c];delete d.metadata;
b.push(d)}return b}var d=void 0===a||"string"===typeof a,e={};d&&(a={geometries:{},materials:{},textures:{},images:{},shapes:{}},e.metadata={version:4.5,type:"Object",generator:"Object3D.toJSON"});var f={};f.uuid=this.uuid;f.type=this.type;""!==this.name&&(f.name=this.name);!0===this.castShadow&&(f.castShadow=!0);!0===this.receiveShadow&&(f.receiveShadow=!0);!1===this.visible&&(f.visible=!1);!1===this.frustumCulled&&(f.frustumCulled=!1);0!==this.renderOrder&&(f.renderOrder=this.renderOrder);"{}"!==
JSON.stringify(this.userData)&&(f.userData=this.userData);f.layers=this.layers.mask;f.matrix=this.matrix.toArray();!1===this.matrixAutoUpdate&&(f.matrixAutoUpdate=!1);if(this.isMesh||this.isLine||this.isPoints){f.geometry=b(a.geometries,this.geometry);var g=this.geometry.parameters;if(void 0!==g&&void 0!==g.shapes)if(g=g.shapes,Array.isArray(g))for(var h=0,k=g.length;h<k;h++)b(a.shapes,g[h]);else b(a.shapes,g)}if(void 0!==this.material)if(Array.isArray(this.material)){g=[];h=0;for(k=this.material.length;h<
k;h++)g.push(b(a.materials,this.material[h]));f.material=g}else f.material=b(a.materials,this.material);if(0<this.children.length)for(f.children=[],h=0;h<this.children.length;h++)f.children.push(this.children[h].toJSON(a).object);if(d){d=c(a.geometries);h=c(a.materials);k=c(a.textures);var m=c(a.images);g=c(a.shapes);0<d.length&&(e.geometries=d);0<h.length&&(e.materials=h);0<k.length&&(e.textures=k);0<m.length&&(e.images=m);0<g.length&&(e.shapes=g)}e.object=f;return e},clone:function(a){return(new this.constructor).copy(this,
a)},copy:function(a,b){void 0===b&&(b=!0);this.name=a.name;this.up.copy(a.up);this.position.copy(a.position);this.quaternion.copy(a.quaternion);this.scale.copy(a.scale);this.matrix.copy(a.matrix);this.matrixWorld.copy(a.matrixWorld);this.matrixAutoUpdate=a.matrixAutoUpdate;this.matrixWorldNeedsUpdate=a.matrixWorldNeedsUpdate;this.layers.mask=a.layers.mask;this.visible=a.visible;this.castShadow=a.castShadow;this.receiveShadow=a.receiveShadow;this.frustumCulled=a.frustumCulled;this.renderOrder=a.renderOrder;
this.userData=JSON.parse(JSON.stringify(a.userData));if(!0===b)for(b=0;b<a.children.length;b++)this.add(a.children[b].clone());return this}});Pa.prototype=Object.assign(Object.create(B.prototype),{constructor:Pa,isCamera:!0,copy:function(a,b){B.prototype.copy.call(this,a,b);this.matrixWorldInverse.copy(a.matrixWorldInverse);this.projectionMatrix.copy(a.projectionMatrix);this.projectionMatrixInverse.copy(a.projectionMatrixInverse);return this},getWorldDirection:function(a){void 0===a&&(console.warn("THREE.Camera: .getWorldDirection() target is now required"),
a=new p);this.updateMatrixWorld(!0);var b=this.matrixWorld.elements;return a.set(-b[8],-b[9],-b[10]).normalize()},updateMatrixWorld:function(a){B.prototype.updateMatrixWorld.call(this,a);this.matrixWorldInverse.getInverse(this.matrixWorld)},clone:function(){return(new this.constructor).copy(this)}});Jb.prototype=Object.assign(Object.create(Pa.prototype),{constructor:Jb,isOrthographicCamera:!0,copy:function(a,b){Pa.prototype.copy.call(this,a,b);this.left=a.left;this.right=a.right;this.top=a.top;this.bottom=
a.bottom;this.near=a.near;this.far=a.far;this.zoom=a.zoom;this.view=null===a.view?null:Object.assign({},a.view);return this},setViewOffset:function(a,b,c,d,e,f){null===this.view&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1});this.view.enabled=!0;this.view.fullWidth=a;this.view.fullHeight=b;this.view.offsetX=c;this.view.offsetY=d;this.view.width=e;this.view.height=f;this.updateProjectionMatrix()},clearViewOffset:function(){null!==this.view&&(this.view.enabled=
!1);this.updateProjectionMatrix()},updateProjectionMatrix:function(){var a=(this.right-this.left)/(2*this.zoom),b=(this.top-this.bottom)/(2*this.zoom),c=(this.right+this.left)/2,d=(this.top+this.bottom)/2,e=c-a;c+=a;a=d+b;b=d-b;if(null!==this.view&&this.view.enabled){c=this.zoom/(this.view.width/this.view.fullWidth);b=this.zoom/(this.view.height/this.view.fullHeight);var f=(this.right-this.left)/this.view.width;d=(this.top-this.bottom)/this.view.height;e+=this.view.offsetX/c*f;c=e+this.view.width/
c*f;a-=this.view.offsetY/b*d;b=a-this.view.height/b*d}this.projectionMatrix.makeOrthographic(e,c,a,b,this.near,this.far);this.projectionMatrixInverse.getInverse(this.projectionMatrix)},toJSON:function(a){a=B.prototype.toJSON.call(this,a);a.object.zoom=this.zoom;a.object.left=this.left;a.object.right=this.right;a.object.top=this.top;a.object.bottom=this.bottom;a.object.near=this.near;a.object.far=this.far;null!==this.view&&(a.object.view=Object.assign({},this.view));return a}});Object.assign(Va.prototype,
{clone:function(){return(new this.constructor).copy(this)},copy:function(a){this.a=a.a;this.b=a.b;this.c=a.c;this.normal.copy(a.normal);this.color.copy(a.color);this.materialIndex=a.materialIndex;for(var b=0,c=a.vertexNormals.length;b<c;b++)this.vertexNormals[b]=a.vertexNormals[b].clone();b=0;for(c=a.vertexColors.length;b<c;b++)this.vertexColors[b]=a.vertexColors[b].clone();return this}});var Gf=0;M.prototype=Object.assign(Object.create(ea.prototype),{constructor:M,isGeometry:!0,applyMatrix:function(a){for(var b=
(new na).getNormalMatrix(a),c=0,d=this.vertices.length;c<d;c++)this.vertices[c].applyMatrix4(a);c=0;for(d=this.faces.length;c<d;c++){a=this.faces[c];a.normal.applyMatrix3(b).normalize();for(var e=0,f=a.vertexNormals.length;e<f;e++)a.vertexNormals[e].applyMatrix3(b).normalize()}null!==this.boundingBox&&this.computeBoundingBox();null!==this.boundingSphere&&this.computeBoundingSphere();this.normalsNeedUpdate=this.verticesNeedUpdate=!0;return this},rotateX:function(){var a=new J;return function(b){a.makeRotationX(b);
this.applyMatrix(a);return this}}(),rotateY:function(){var a=new J;return function(b){a.makeRotationY(b);this.applyMatrix(a);return this}}(),rotateZ:function(){var a=new J;return function(b){a.makeRotationZ(b);this.applyMatrix(a);return this}}(),translate:function(){var a=new J;return function(b,c,d){a.makeTranslation(b,c,d);this.applyMatrix(a);return this}}(),scale:function(){var a=new J;return function(b,c,d){a.makeScale(b,c,d);this.applyMatrix(a);return this}}(),lookAt:function(){var a=new B;return function(b){a.lookAt(b);
a.updateMatrix();this.applyMatrix(a.matrix)}}(),fromBufferGeometry:function(a){function b(a,b,d,e){var f=void 0!==g?[l[a].clone(),l[b].clone(),l[d].clone()]:[],t=void 0!==h?[c.colors[a].clone(),c.colors[b].clone(),c.colors[d].clone()]:[];e=new Va(a,b,d,f,t,e);c.faces.push(e);void 0!==k&&c.faceVertexUvs[0].push([n[a].clone(),n[b].clone(),n[d].clone()]);void 0!==m&&c.faceVertexUvs[1].push([q[a].clone(),q[b].clone(),q[d].clone()])}var c=this,d=null!==a.index?a.index.array:void 0,e=a.attributes,f=e.position.array,
g=void 0!==e.normal?e.normal.array:void 0,h=void 0!==e.color?e.color.array:void 0,k=void 0!==e.uv?e.uv.array:void 0,m=void 0!==e.uv2?e.uv2.array:void 0;void 0!==m&&(this.faceVertexUvs[1]=[]);for(var l=[],n=[],q=[],u=e=0;e<f.length;e+=3,u+=2)c.vertices.push(new p(f[e],f[e+1],f[e+2])),void 0!==g&&l.push(new p(g[e],g[e+1],g[e+2])),void 0!==h&&c.colors.push(new F(h[e],h[e+1],h[e+2])),void 0!==k&&n.push(new z(k[u],k[u+1])),void 0!==m&&q.push(new z(m[u],m[u+1]));var r=a.groups;if(0<r.length)for(e=0;e<r.length;e++){f=
r[e];var v=f.start,y=f.count;u=v;for(v+=y;u<v;u+=3)void 0!==d?b(d[u],d[u+1],d[u+2],f.materialIndex):b(u,u+1,u+2,f.materialIndex)}else if(void 0!==d)for(e=0;e<d.length;e+=3)b(d[e],d[e+1],d[e+2]);else for(e=0;e<f.length/3;e+=3)b(e,e+1,e+2);this.computeFaceNormals();null!==a.boundingBox&&(this.boundingBox=a.boundingBox.clone());null!==a.boundingSphere&&(this.boundingSphere=a.boundingSphere.clone());return this},center:function(){var a=new p;return function(){this.computeBoundingBox();this.boundingBox.getCenter(a).negate();
this.translate(a.x,a.y,a.z);return this}}(),normalize:function(){this.computeBoundingSphere();var a=this.boundingSphere.center,b=this.boundingSphere.radius;b=0===b?1:1/b;var c=new J;c.set(b,0,0,-b*a.x,0,b,0,-b*a.y,0,0,b,-b*a.z,0,0,0,1);this.applyMatrix(c);return this},computeFaceNormals:function(){for(var a=new p,b=new p,c=0,d=this.faces.length;c<d;c++){var e=this.faces[c],f=this.vertices[e.a],g=this.vertices[e.b];a.subVectors(this.vertices[e.c],g);b.subVectors(f,g);a.cross(b);a.normalize();e.normal.copy(a)}},
computeVertexNormals:function(a){void 0===a&&(a=!0);var b;var c=Array(this.vertices.length);var d=0;for(b=this.vertices.length;d<b;d++)c[d]=new p;if(a){var e=new p,f=new p;a=0;for(d=this.faces.length;a<d;a++){b=this.faces[a];var g=this.vertices[b.a];var h=this.vertices[b.b];var k=this.vertices[b.c];e.subVectors(k,h);f.subVectors(g,h);e.cross(f);c[b.a].add(e);c[b.b].add(e);c[b.c].add(e)}}else for(this.computeFaceNormals(),a=0,d=this.faces.length;a<d;a++)b=this.faces[a],c[b.a].add(b.normal),c[b.b].add(b.normal),
c[b.c].add(b.normal);d=0;for(b=this.vertices.length;d<b;d++)c[d].normalize();a=0;for(d=this.faces.length;a<d;a++)b=this.faces[a],g=b.vertexNormals,3===g.length?(g[0].copy(c[b.a]),g[1].copy(c[b.b]),g[2].copy(c[b.c])):(g[0]=c[b.a].clone(),g[1]=c[b.b].clone(),g[2]=c[b.c].clone());0<this.faces.length&&(this.normalsNeedUpdate=!0)},computeFlatVertexNormals:function(){var a;this.computeFaceNormals();var b=0;for(a=this.faces.length;b<a;b++){var c=this.faces[b];var d=c.vertexNormals;3===d.length?(d[0].copy(c.normal),
d[1].copy(c.normal),d[2].copy(c.normal)):(d[0]=c.normal.clone(),d[1]=c.normal.clone(),d[2]=c.normal.clone())}0<this.faces.length&&(this.normalsNeedUpdate=!0)},computeMorphNormals:function(){var a,b;var c=0;for(b=this.faces.length;c<b;c++){var d=this.faces[c];d.__originalFaceNormal?d.__originalFaceNormal.copy(d.normal):d.__originalFaceNormal=d.normal.clone();d.__originalVertexNormals||(d.__originalVertexNormals=[]);var e=0;for(a=d.vertexNormals.length;e<a;e++)d.__originalVertexNormals[e]?d.__originalVertexNormals[e].copy(d.vertexNormals[e]):
d.__originalVertexNormals[e]=d.vertexNormals[e].clone()}var f=new M;f.faces=this.faces;e=0;for(a=this.morphTargets.length;e<a;e++){if(!this.morphNormals[e]){this.morphNormals[e]={};this.morphNormals[e].faceNormals=[];this.morphNormals[e].vertexNormals=[];d=this.morphNormals[e].faceNormals;var g=this.morphNormals[e].vertexNormals;c=0;for(b=this.faces.length;c<b;c++){var h=new p;var k={a:new p,b:new p,c:new p};d.push(h);g.push(k)}}g=this.morphNormals[e];f.vertices=this.morphTargets[e].vertices;f.computeFaceNormals();
f.computeVertexNormals();c=0;for(b=this.faces.length;c<b;c++)d=this.faces[c],h=g.faceNormals[c],k=g.vertexNormals[c],h.copy(d.normal),k.a.copy(d.vertexNormals[0]),k.b.copy(d.vertexNormals[1]),k.c.copy(d.vertexNormals[2])}c=0;for(b=this.faces.length;c<b;c++)d=this.faces[c],d.normal=d.__originalFaceNormal,d.vertexNormals=d.__originalVertexNormals},computeBoundingBox:function(){null===this.boundingBox&&(this.boundingBox=new Ua);this.boundingBox.setFromPoints(this.vertices)},computeBoundingSphere:function(){null===
this.boundingSphere&&(this.boundingSphere=new Ea);this.boundingSphere.setFromPoints(this.vertices)},merge:function(a,b,c){if(a&&a.isGeometry){var d,e=this.vertices.length,f=this.vertices,g=a.vertices,h=this.faces,k=a.faces,m=this.faceVertexUvs[0],l=a.faceVertexUvs[0],n=this.colors,q=a.colors;void 0===c&&(c=0);void 0!==b&&(d=(new na).getNormalMatrix(b));a=0;for(var p=g.length;a<p;a++){var r=g[a].clone();void 0!==b&&r.applyMatrix4(b);f.push(r)}a=0;for(p=q.length;a<p;a++)n.push(q[a].clone());a=0;for(p=
k.length;a<p;a++){g=k[a];var v=g.vertexNormals;q=g.vertexColors;n=new Va(g.a+e,g.b+e,g.c+e);n.normal.copy(g.normal);void 0!==d&&n.normal.applyMatrix3(d).normalize();b=0;for(f=v.length;b<f;b++)r=v[b].clone(),void 0!==d&&r.applyMatrix3(d).normalize(),n.vertexNormals.push(r);n.color.copy(g.color);b=0;for(f=q.length;b<f;b++)r=q[b],n.vertexColors.push(r.clone());n.materialIndex=g.materialIndex+c;h.push(n)}a=0;for(p=l.length;a<p;a++)if(c=l[a],d=[],void 0!==c){b=0;for(f=c.length;b<f;b++)d.push(c[b].clone());
m.push(d)}}else console.error("THREE.Geometry.merge(): geometry not an instance of THREE.Geometry.",a)},mergeMesh:function(a){a&&a.isMesh?(a.matrixAutoUpdate&&a.updateMatrix(),this.merge(a.geometry,a.matrix)):console.error("THREE.Geometry.mergeMesh(): mesh not an instance of THREE.Mesh.",a)},mergeVertices:function(){var a={},b=[],c=[],d=Math.pow(10,4),e;var f=0;for(e=this.vertices.length;f<e;f++){var g=this.vertices[f];g=Math.round(g.x*d)+"_"+Math.round(g.y*d)+"_"+Math.round(g.z*d);void 0===a[g]?
(a[g]=f,b.push(this.vertices[f]),c[f]=b.length-1):c[f]=c[a[g]]}a=[];f=0;for(e=this.faces.length;f<e;f++)for(d=this.faces[f],d.a=c[d.a],d.b=c[d.b],d.c=c[d.c],d=[d.a,d.b,d.c],g=0;3>g;g++)if(d[g]===d[(g+1)%3]){a.push(f);break}for(f=a.length-1;0<=f;f--)for(d=a[f],this.faces.splice(d,1),c=0,e=this.faceVertexUvs.length;c<e;c++)this.faceVertexUvs[c].splice(d,1);f=this.vertices.length-b.length;this.vertices=b;return f},setFromPoints:function(a){this.vertices=[];for(var b=0,c=a.length;b<c;b++){var d=a[b];
this.vertices.push(new p(d.x,d.y,d.z||0))}return this},sortFacesByMaterialIndex:function(){for(var a=this.faces,b=a.length,c=0;c<b;c++)a[c]._id=c;a.sort(function(a,b){return a.materialIndex-b.materialIndex});var d=this.faceVertexUvs[0],e=this.faceVertexUvs[1],f,g;d&&d.length===b&&(f=[]);e&&e.length===b&&(g=[]);for(c=0;c<b;c++){var h=a[c]._id;f&&f.push(d[h]);g&&g.push(e[h])}f&&(this.faceVertexUvs[0]=f);g&&(this.faceVertexUvs[1]=g)},toJSON:function(){function a(a,b,c){return c?a|1<<b:a&~(1<<b)}function b(a){var b=
a.x.toString()+a.y.toString()+a.z.toString();if(void 0!==m[b])return m[b];m[b]=k.length/3;k.push(a.x,a.y,a.z);return m[b]}function c(a){var b=a.r.toString()+a.g.toString()+a.b.toString();if(void 0!==n[b])return n[b];n[b]=l.length;l.push(a.getHex());return n[b]}function d(a){var b=a.x.toString()+a.y.toString();if(void 0!==p[b])return p[b];p[b]=q.length/2;q.push(a.x,a.y);return p[b]}var e={metadata:{version:4.5,type:"Geometry",generator:"Geometry.toJSON"}};e.uuid=this.uuid;e.type=this.type;""!==this.name&&
(e.name=this.name);if(void 0!==this.parameters){var f=this.parameters,g;for(g in f)void 0!==f[g]&&(e[g]=f[g]);return e}f=[];for(g=0;g<this.vertices.length;g++){var h=this.vertices[g];f.push(h.x,h.y,h.z)}h=[];var k=[],m={},l=[],n={},q=[],p={};for(g=0;g<this.faces.length;g++){var r=this.faces[g],v=void 0!==this.faceVertexUvs[0][g],y=0<r.normal.length(),x=0<r.vertexNormals.length,w=1!==r.color.r||1!==r.color.g||1!==r.color.b,z=0<r.vertexColors.length,D=0;D=a(D,0,0);D=a(D,1,!0);D=a(D,2,!1);D=a(D,3,v);
D=a(D,4,y);D=a(D,5,x);D=a(D,6,w);D=a(D,7,z);h.push(D);h.push(r.a,r.b,r.c);h.push(r.materialIndex);v&&(v=this.faceVertexUvs[0][g],h.push(d(v[0]),d(v[1]),d(v[2])));y&&h.push(b(r.normal));x&&(y=r.vertexNormals,h.push(b(y[0]),b(y[1]),b(y[2])));w&&h.push(c(r.color));z&&(r=r.vertexColors,h.push(c(r[0]),c(r[1]),c(r[2])))}e.data={};e.data.vertices=f;e.data.normals=k;0<l.length&&(e.data.colors=l);0<q.length&&(e.data.uvs=[q]);e.data.faces=h;return e},clone:function(){return(new M).copy(this)},copy:function(a){var b,
c,d;this.vertices=[];this.colors=[];this.faces=[];this.faceVertexUvs=[[]];this.morphTargets=[];this.morphNormals=[];this.skinWeights=[];this.skinIndices=[];this.lineDistances=[];this.boundingSphere=this.boundingBox=null;this.name=a.name;var e=a.vertices;var f=0;for(b=e.length;f<b;f++)this.vertices.push(e[f].clone());e=a.colors;f=0;for(b=e.length;f<b;f++)this.colors.push(e[f].clone());e=a.faces;f=0;for(b=e.length;f<b;f++)this.faces.push(e[f].clone());f=0;for(b=a.faceVertexUvs.length;f<b;f++){var g=
a.faceVertexUvs[f];void 0===this.faceVertexUvs[f]&&(this.faceVertexUvs[f]=[]);e=0;for(c=g.length;e<c;e++){var h=g[e],k=[];var m=0;for(d=h.length;m<d;m++)k.push(h[m].clone());this.faceVertexUvs[f].push(k)}}m=a.morphTargets;f=0;for(b=m.length;f<b;f++){d={};d.name=m[f].name;if(void 0!==m[f].vertices)for(d.vertices=[],e=0,c=m[f].vertices.length;e<c;e++)d.vertices.push(m[f].vertices[e].clone());if(void 0!==m[f].normals)for(d.normals=[],e=0,c=m[f].normals.length;e<c;e++)d.normals.push(m[f].normals[e].clone());
this.morphTargets.push(d)}m=a.morphNormals;f=0;for(b=m.length;f<b;f++){d={};if(void 0!==m[f].vertexNormals)for(d.vertexNormals=[],e=0,c=m[f].vertexNormals.length;e<c;e++)g=m[f].vertexNormals[e],h={},h.a=g.a.clone(),h.b=g.b.clone(),h.c=g.c.clone(),d.vertexNormals.push(h);if(void 0!==m[f].faceNormals)for(d.faceNormals=[],e=0,c=m[f].faceNormals.length;e<c;e++)d.faceNormals.push(m[f].faceNormals[e].clone());this.morphNormals.push(d)}e=a.skinWeights;f=0;for(b=e.length;f<b;f++)this.skinWeights.push(e[f].clone());
e=a.skinIndices;f=0;for(b=e.length;f<b;f++)this.skinIndices.push(e[f].clone());e=a.lineDistances;f=0;for(b=e.length;f<b;f++)this.lineDistances.push(e[f]);f=a.boundingBox;null!==f&&(this.boundingBox=f.clone());f=a.boundingSphere;null!==f&&(this.boundingSphere=f.clone());this.elementsNeedUpdate=a.elementsNeedUpdate;this.verticesNeedUpdate=a.verticesNeedUpdate;this.uvsNeedUpdate=a.uvsNeedUpdate;this.normalsNeedUpdate=a.normalsNeedUpdate;this.colorsNeedUpdate=a.colorsNeedUpdate;this.lineDistancesNeedUpdate=
a.lineDistancesNeedUpdate;this.groupsNeedUpdate=a.groupsNeedUpdate;return this},dispose:function(){this.dispatchEvent({type:"dispose"})}});Object.defineProperty(Q.prototype,"needsUpdate",{set:function(a){!0===a&&this.version++}});Object.assign(Q.prototype,{isBufferAttribute:!0,onUploadCallback:function(){},setArray:function(a){if(Array.isArray(a))throw new TypeError("THREE.BufferAttribute: array should be a Typed Array.");this.count=void 0!==a?a.length/this.itemSize:0;this.array=a;return this},setDynamic:function(a){this.dynamic=
a;return this},copy:function(a){this.name=a.name;this.array=new a.array.constructor(a.array);this.itemSize=a.itemSize;this.count=a.count;this.normalized=a.normalized;this.dynamic=a.dynamic;return this},copyAt:function(a,b,c){a*=this.itemSize;c*=b.itemSize;for(var d=0,e=this.itemSize;d<e;d++)this.array[a+d]=b.array[c+d];return this},copyArray:function(a){this.array.set(a);return this},copyColorsArray:function(a){for(var b=this.array,c=0,d=0,e=a.length;d<e;d++){var f=a[d];void 0===f&&(console.warn("THREE.BufferAttribute.copyColorsArray(): color is undefined",
d),f=new F);b[c++]=f.r;b[c++]=f.g;b[c++]=f.b}return this},copyVector2sArray:function(a){for(var b=this.array,c=0,d=0,e=a.length;d<e;d++){var f=a[d];void 0===f&&(console.warn("THREE.BufferAttribute.copyVector2sArray(): vector is undefined",d),f=new z);b[c++]=f.x;b[c++]=f.y}return this},copyVector3sArray:function(a){for(var b=this.array,c=0,d=0,e=a.length;d<e;d++){var f=a[d];void 0===f&&(console.warn("THREE.BufferAttribute.copyVector3sArray(): vector is undefined",d),f=new p);b[c++]=f.x;b[c++]=f.y;
b[c++]=f.z}return this},copyVector4sArray:function(a){for(var b=this.array,c=0,d=0,e=a.length;d<e;d++){var f=a[d];void 0===f&&(console.warn("THREE.BufferAttribute.copyVector4sArray(): vector is undefined",d),f=new aa);b[c++]=f.x;b[c++]=f.y;b[c++]=f.z;b[c++]=f.w}return this},set:function(a,b){void 0===b&&(b=0);this.array.set(a,b);return this},getX:function(a){return this.array[a*this.itemSize]},setX:function(a,b){this.array[a*this.itemSize]=b;return this},getY:function(a){return this.array[a*this.itemSize+
1]},setY:function(a,b){this.array[a*this.itemSize+1]=b;return this},getZ:function(a){return this.array[a*this.itemSize+2]},setZ:function(a,b){this.array[a*this.itemSize+2]=b;return this},getW:function(a){return this.array[a*this.itemSize+3]},setW:function(a,b){this.array[a*this.itemSize+3]=b;return this},setXY:function(a,b,c){a*=this.itemSize;this.array[a+0]=b;this.array[a+1]=c;return this},setXYZ:function(a,b,c,d){a*=this.itemSize;this.array[a+0]=b;this.array[a+1]=c;this.array[a+2]=d;return this},
setXYZW:function(a,b,c,d,e){a*=this.itemSize;this.array[a+0]=b;this.array[a+1]=c;this.array[a+2]=d;this.array[a+3]=e;return this},onUpload:function(a){this.onUploadCallback=a;return this},clone:function(){return(new this.constructor(this.array,this.itemSize)).copy(this)}});qc.prototype=Object.create(Q.prototype);qc.prototype.constructor=qc;rc.prototype=Object.create(Q.prototype);rc.prototype.constructor=rc;sc.prototype=Object.create(Q.prototype);sc.prototype.constructor=sc;tc.prototype=Object.create(Q.prototype);
tc.prototype.constructor=tc;kb.prototype=Object.create(Q.prototype);kb.prototype.constructor=kb;uc.prototype=Object.create(Q.prototype);uc.prototype.constructor=uc;lb.prototype=Object.create(Q.prototype);lb.prototype.constructor=lb;A.prototype=Object.create(Q.prototype);A.prototype.constructor=A;vc.prototype=Object.create(Q.prototype);vc.prototype.constructor=vc;Object.assign(De.prototype,{computeGroups:function(a){var b=[],c=void 0;a=a.faces;for(var d=0;d<a.length;d++){var e=a[d];if(e.materialIndex!==
c){c=e.materialIndex;void 0!==f&&(f.count=3*d-f.start,b.push(f));var f={start:3*d,materialIndex:c}}}void 0!==f&&(f.count=3*d-f.start,b.push(f));this.groups=b},fromGeometry:function(a){var b=a.faces,c=a.vertices,d=a.faceVertexUvs,e=d[0]&&0<d[0].length,f=d[1]&&0<d[1].length,g=a.morphTargets,h=g.length;if(0<h){var k=[];for(var m=0;m<h;m++)k[m]={name:g[m].name,data:[]};this.morphTargets.position=k}var l=a.morphNormals,n=l.length;if(0<n){var q=[];for(m=0;m<n;m++)q[m]={name:l[m].name,data:[]};this.morphTargets.normal=
q}var p=a.skinIndices,r=a.skinWeights,v=p.length===c.length,y=r.length===c.length;0<c.length&&0===b.length&&console.error("THREE.DirectGeometry: Faceless geometries are not supported.");for(m=0;m<b.length;m++){var x=b[m];this.vertices.push(c[x.a],c[x.b],c[x.c]);var w=x.vertexNormals;3===w.length?this.normals.push(w[0],w[1],w[2]):(w=x.normal,this.normals.push(w,w,w));w=x.vertexColors;3===w.length?this.colors.push(w[0],w[1],w[2]):(w=x.color,this.colors.push(w,w,w));!0===e&&(w=d[0][m],void 0!==w?this.uvs.push(w[0],
w[1],w[2]):(console.warn("THREE.DirectGeometry.fromGeometry(): Undefined vertexUv ",m),this.uvs.push(new z,new z,new z)));!0===f&&(w=d[1][m],void 0!==w?this.uvs2.push(w[0],w[1],w[2]):(console.warn("THREE.DirectGeometry.fromGeometry(): Undefined vertexUv2 ",m),this.uvs2.push(new z,new z,new z)));for(w=0;w<h;w++){var G=g[w].vertices;k[w].data.push(G[x.a],G[x.b],G[x.c])}for(w=0;w<n;w++)G=l[w].vertexNormals[m],q[w].data.push(G.a,G.b,G.c);v&&this.skinIndices.push(p[x.a],p[x.b],p[x.c]);y&&this.skinWeights.push(r[x.a],
r[x.b],r[x.c])}this.computeGroups(a);this.verticesNeedUpdate=a.verticesNeedUpdate;this.normalsNeedUpdate=a.normalsNeedUpdate;this.colorsNeedUpdate=a.colorsNeedUpdate;this.uvsNeedUpdate=a.uvsNeedUpdate;this.groupsNeedUpdate=a.groupsNeedUpdate;return this}});var Hf=1;I.prototype=Object.assign(Object.create(ea.prototype),{constructor:I,isBufferGeometry:!0,getIndex:function(){return this.index},setIndex:function(a){Array.isArray(a)?this.index=new (65535<Ee(a)?lb:kb)(a,1):this.index=a},addAttribute:function(a,
b,c){if(!(b&&b.isBufferAttribute||b&&b.isInterleavedBufferAttribute))return console.warn("THREE.BufferGeometry: .addAttribute() now expects ( name, attribute )."),this.addAttribute(a,new Q(b,c));if("index"===a)return console.warn("THREE.BufferGeometry.addAttribute: Use .setIndex() for index attribute."),this.setIndex(b),this;this.attributes[a]=b;return this},getAttribute:function(a){return this.attributes[a]},removeAttribute:function(a){delete this.attributes[a];return this},addGroup:function(a,b,
c){this.groups.push({start:a,count:b,materialIndex:void 0!==c?c:0})},clearGroups:function(){this.groups=[]},setDrawRange:function(a,b){this.drawRange.start=a;this.drawRange.count=b},applyMatrix:function(a){var b=this.attributes.position;void 0!==b&&(a.applyToBufferAttribute(b),b.needsUpdate=!0);b=this.attributes.normal;void 0!==b&&((new na).getNormalMatrix(a).applyToBufferAttribute(b),b.needsUpdate=!0);null!==this.boundingBox&&this.computeBoundingBox();null!==this.boundingSphere&&this.computeBoundingSphere();
return this},rotateX:function(){var a=new J;return function(b){a.makeRotationX(b);this.applyMatrix(a);return this}}(),rotateY:function(){var a=new J;return function(b){a.makeRotationY(b);this.applyMatrix(a);return this}}(),rotateZ:function(){var a=new J;return function(b){a.makeRotationZ(b);this.applyMatrix(a);return this}}(),translate:function(){var a=new J;return function(b,c,d){a.makeTranslation(b,c,d);this.applyMatrix(a);return this}}(),scale:function(){var a=new J;return function(b,c,d){a.makeScale(b,
c,d);this.applyMatrix(a);return this}}(),lookAt:function(){var a=new B;return function(b){a.lookAt(b);a.updateMatrix();this.applyMatrix(a.matrix)}}(),center:function(){var a=new p;return function(){this.computeBoundingBox();this.boundingBox.getCenter(a).negate();this.translate(a.x,a.y,a.z);return this}}(),setFromObject:function(a){var b=a.geometry;if(a.isPoints||a.isLine){a=new A(3*b.vertices.length,3);var c=new A(3*b.colors.length,3);this.addAttribute("position",a.copyVector3sArray(b.vertices));
this.addAttribute("color",c.copyColorsArray(b.colors));b.lineDistances&&b.lineDistances.length===b.vertices.length&&(a=new A(b.lineDistances.length,1),this.addAttribute("lineDistance",a.copyArray(b.lineDistances)));null!==b.boundingSphere&&(this.boundingSphere=b.boundingSphere.clone());null!==b.boundingBox&&(this.boundingBox=b.boundingBox.clone())}else a.isMesh&&b&&b.isGeometry&&this.fromGeometry(b);return this},setFromPoints:function(a){for(var b=[],c=0,d=a.length;c<d;c++){var e=a[c];b.push(e.x,
e.y,e.z||0)}this.addAttribute("position",new A(b,3));return this},updateFromObject:function(a){var b=a.geometry;if(a.isMesh){var c=b.__directGeometry;!0===b.elementsNeedUpdate&&(c=void 0,b.elementsNeedUpdate=!1);if(void 0===c)return this.fromGeometry(b);c.verticesNeedUpdate=b.verticesNeedUpdate;c.normalsNeedUpdate=b.normalsNeedUpdate;c.colorsNeedUpdate=b.colorsNeedUpdate;c.uvsNeedUpdate=b.uvsNeedUpdate;c.groupsNeedUpdate=b.groupsNeedUpdate;b.verticesNeedUpdate=!1;b.normalsNeedUpdate=!1;b.colorsNeedUpdate=
!1;b.uvsNeedUpdate=!1;b.groupsNeedUpdate=!1;b=c}!0===b.verticesNeedUpdate&&(c=this.attributes.position,void 0!==c&&(c.copyVector3sArray(b.vertices),c.needsUpdate=!0),b.verticesNeedUpdate=!1);!0===b.normalsNeedUpdate&&(c=this.attributes.normal,void 0!==c&&(c.copyVector3sArray(b.normals),c.needsUpdate=!0),b.normalsNeedUpdate=!1);!0===b.colorsNeedUpdate&&(c=this.attributes.color,void 0!==c&&(c.copyColorsArray(b.colors),c.needsUpdate=!0),b.colorsNeedUpdate=!1);b.uvsNeedUpdate&&(c=this.attributes.uv,void 0!==
c&&(c.copyVector2sArray(b.uvs),c.needsUpdate=!0),b.uvsNeedUpdate=!1);b.lineDistancesNeedUpdate&&(c=this.attributes.lineDistance,void 0!==c&&(c.copyArray(b.lineDistances),c.needsUpdate=!0),b.lineDistancesNeedUpdate=!1);b.groupsNeedUpdate&&(b.computeGroups(a.geometry),this.groups=b.groups,b.groupsNeedUpdate=!1);return this},fromGeometry:function(a){a.__directGeometry=(new De).fromGeometry(a);return this.fromDirectGeometry(a.__directGeometry)},fromDirectGeometry:function(a){var b=new Float32Array(3*
a.vertices.length);this.addAttribute("position",(new Q(b,3)).copyVector3sArray(a.vertices));0<a.normals.length&&(b=new Float32Array(3*a.normals.length),this.addAttribute("normal",(new Q(b,3)).copyVector3sArray(a.normals)));0<a.colors.length&&(b=new Float32Array(3*a.colors.length),this.addAttribute("color",(new Q(b,3)).copyColorsArray(a.colors)));0<a.uvs.length&&(b=new Float32Array(2*a.uvs.length),this.addAttribute("uv",(new Q(b,2)).copyVector2sArray(a.uvs)));0<a.uvs2.length&&(b=new Float32Array(2*
a.uvs2.length),this.addAttribute("uv2",(new Q(b,2)).copyVector2sArray(a.uvs2)));this.groups=a.groups;for(var c in a.morphTargets){b=[];for(var d=a.morphTargets[c],e=0,f=d.length;e<f;e++){var g=d[e],h=new A(3*g.data.length,3);h.name=g.name;b.push(h.copyVector3sArray(g.data))}this.morphAttributes[c]=b}0<a.skinIndices.length&&(c=new A(4*a.skinIndices.length,4),this.addAttribute("skinIndex",c.copyVector4sArray(a.skinIndices)));0<a.skinWeights.length&&(c=new A(4*a.skinWeights.length,4),this.addAttribute("skinWeight",
c.copyVector4sArray(a.skinWeights)));null!==a.boundingSphere&&(this.boundingSphere=a.boundingSphere.clone());null!==a.boundingBox&&(this.boundingBox=a.boundingBox.clone());return this},computeBoundingBox:function(){null===this.boundingBox&&(this.boundingBox=new Ua);var a=this.attributes.position;void 0!==a?this.boundingBox.setFromBufferAttribute(a):this.boundingBox.makeEmpty();(isNaN(this.boundingBox.min.x)||isNaN(this.boundingBox.min.y)||isNaN(this.boundingBox.min.z))&&console.error('THREE.BufferGeometry.computeBoundingBox: Computed min/max have NaN values. The "position" attribute is likely to have NaN values.',
this)},computeBoundingSphere:function(){var a=new Ua,b=new p;return function(){null===this.boundingSphere&&(this.boundingSphere=new Ea);var c=this.attributes.position;if(c){var d=this.boundingSphere.center;a.setFromBufferAttribute(c);a.getCenter(d);for(var e=0,f=0,g=c.count;f<g;f++)b.x=c.getX(f),b.y=c.getY(f),b.z=c.getZ(f),e=Math.max(e,d.distanceToSquared(b));this.boundingSphere.radius=Math.sqrt(e);isNaN(this.boundingSphere.radius)&&console.error('THREE.BufferGeometry.computeBoundingSphere(): Computed radius is NaN. The "position" attribute is likely to have NaN values.',
this)}}}(),computeFaceNormals:function(){},computeVertexNormals:function(){var a=this.index,b=this.attributes;if(b.position){var c=b.position.array;if(void 0===b.normal)this.addAttribute("normal",new Q(new Float32Array(c.length),3));else for(var d=b.normal.array,e=0,f=d.length;e<f;e++)d[e]=0;d=b.normal.array;var g=new p,h=new p,k=new p,m=new p,l=new p;if(a){var n=a.array;e=0;for(f=a.count;e<f;e+=3){a=3*n[e+0];var q=3*n[e+1];var u=3*n[e+2];g.fromArray(c,a);h.fromArray(c,q);k.fromArray(c,u);m.subVectors(k,
h);l.subVectors(g,h);m.cross(l);d[a]+=m.x;d[a+1]+=m.y;d[a+2]+=m.z;d[q]+=m.x;d[q+1]+=m.y;d[q+2]+=m.z;d[u]+=m.x;d[u+1]+=m.y;d[u+2]+=m.z}}else for(e=0,f=c.length;e<f;e+=9)g.fromArray(c,e),h.fromArray(c,e+3),k.fromArray(c,e+6),m.subVectors(k,h),l.subVectors(g,h),m.cross(l),d[e]=m.x,d[e+1]=m.y,d[e+2]=m.z,d[e+3]=m.x,d[e+4]=m.y,d[e+5]=m.z,d[e+6]=m.x,d[e+7]=m.y,d[e+8]=m.z;this.normalizeNormals();b.normal.needsUpdate=!0}},merge:function(a,b){if(a&&a.isBufferGeometry){void 0===b&&(b=0,console.warn("THREE.BufferGeometry.merge(): Overwriting original geometry, starting at offset=0. Use BufferGeometryUtils.mergeBufferGeometries() for lossless merge."));
var c=this.attributes,d;for(d in c)if(void 0!==a.attributes[d]){var e=c[d].array,f=a.attributes[d],g=f.array,h=0;for(f=f.itemSize*b;h<g.length;h++,f++)e[f]=g[h]}return this}console.error("THREE.BufferGeometry.merge(): geometry not an instance of THREE.BufferGeometry.",a)},normalizeNormals:function(){var a=new p;return function(){for(var b=this.attributes.normal,c=0,d=b.count;c<d;c++)a.x=b.getX(c),a.y=b.getY(c),a.z=b.getZ(c),a.normalize(),b.setXYZ(c,a.x,a.y,a.z)}}(),toNonIndexed:function(){if(null===
this.index)return console.warn("THREE.BufferGeometry.toNonIndexed(): Geometry is already non-indexed."),this;var a=new I,b=this.index.array,c=this.attributes,d;for(d in c){var e=c[d],f=e.array,g=e.itemSize,h=new f.constructor(b.length*g),k=0;e=0;for(var m=b.length;e<m;e++){var l=b[e]*g;for(var n=0;n<g;n++)h[k++]=f[l++]}a.addAttribute(d,new Q(h,g))}b=this.groups;e=0;for(m=b.length;e<m;e++)c=b[e],a.addGroup(c.start,c.count,c.materialIndex);return a},toJSON:function(){var a={metadata:{version:4.5,type:"BufferGeometry",
generator:"BufferGeometry.toJSON"}};a.uuid=this.uuid;a.type=this.type;""!==this.name&&(a.name=this.name);0<Object.keys(this.userData).length&&(a.userData=this.userData);if(void 0!==this.parameters){var b=this.parameters;for(e in b)void 0!==b[e]&&(a[e]=b[e]);return a}a.data={attributes:{}};var c=this.index;null!==c&&(b=Array.prototype.slice.call(c.array),a.data.index={type:c.array.constructor.name,array:b});c=this.attributes;for(e in c){var d=c[e];b=Array.prototype.slice.call(d.array);a.data.attributes[e]=
{itemSize:d.itemSize,type:d.array.constructor.name,array:b,normalized:d.normalized}}var e=this.groups;0<e.length&&(a.data.groups=JSON.parse(JSON.stringify(e)));e=this.boundingSphere;null!==e&&(a.data.boundingSphere={center:e.center.toArray(),radius:e.radius});return a},clone:function(){return(new I).copy(this)},copy:function(a){var b;this.index=null;this.attributes={};this.morphAttributes={};this.groups=[];this.boundingSphere=this.boundingBox=null;this.name=a.name;var c=a.index;null!==c&&this.setIndex(c.clone());
c=a.attributes;for(g in c)this.addAttribute(g,c[g].clone());var d=a.morphAttributes;for(g in d){var e=[],f=d[g];c=0;for(b=f.length;c<b;c++)e.push(f[c].clone());this.morphAttributes[g]=e}var g=a.groups;c=0;for(b=g.length;c<b;c++)d=g[c],this.addGroup(d.start,d.count,d.materialIndex);g=a.boundingBox;null!==g&&(this.boundingBox=g.clone());g=a.boundingSphere;null!==g&&(this.boundingSphere=g.clone());this.drawRange.start=a.drawRange.start;this.drawRange.count=a.drawRange.count;this.userData=a.userData;
return this},dispose:function(){this.dispatchEvent({type:"dispose"})}});Kb.prototype=Object.create(M.prototype);Kb.prototype.constructor=Kb;mb.prototype=Object.create(I.prototype);mb.prototype.constructor=mb;wc.prototype=Object.create(M.prototype);wc.prototype.constructor=wc;nb.prototype=Object.create(I.prototype);nb.prototype.constructor=nb;var Jf=0;H.prototype=Object.assign(Object.create(ea.prototype),{constructor:H,isMaterial:!0,onBeforeCompile:function(){},setValues:function(a){if(void 0!==a)for(var b in a){var c=
a[b];if(void 0===c)console.warn("THREE.Material: '"+b+"' parameter is undefined.");else if("shading"===b)console.warn("THREE."+this.type+": .shading has been removed. Use the boolean .flatShading instead."),this.flatShading=1===c?!0:!1;else{var d=this[b];void 0===d?console.warn("THREE."+this.type+": '"+b+"' is not a property of this material."):d&&d.isColor?d.set(c):d&&d.isVector3&&c&&c.isVector3?d.copy(c):this[b]="overdraw"===b?Number(c):c}}},toJSON:function(a){function b(a){var b=[],c;for(c in a){var d=
a[c];delete d.metadata;b.push(d)}return b}var c=void 0===a||"string"===typeof a;c&&(a={textures:{},images:{}});var d={metadata:{version:4.5,type:"Material",generator:"Material.toJSON"}};d.uuid=this.uuid;d.type=this.type;""!==this.name&&(d.name=this.name);this.color&&this.color.isColor&&(d.color=this.color.getHex());void 0!==this.roughness&&(d.roughness=this.roughness);void 0!==this.metalness&&(d.metalness=this.metalness);this.emissive&&this.emissive.isColor&&(d.emissive=this.emissive.getHex());1!==
this.emissiveIntensity&&(d.emissiveIntensity=this.emissiveIntensity);this.specular&&this.specular.isColor&&(d.specular=this.specular.getHex());void 0!==this.shininess&&(d.shininess=this.shininess);void 0!==this.clearCoat&&(d.clearCoat=this.clearCoat);void 0!==this.clearCoatRoughness&&(d.clearCoatRoughness=this.clearCoatRoughness);this.map&&this.map.isTexture&&(d.map=this.map.toJSON(a).uuid);this.alphaMap&&this.alphaMap.isTexture&&(d.alphaMap=this.alphaMap.toJSON(a).uuid);this.lightMap&&this.lightMap.isTexture&&
(d.lightMap=this.lightMap.toJSON(a).uuid);this.aoMap&&this.aoMap.isTexture&&(d.aoMap=this.aoMap.toJSON(a).uuid,d.aoMapIntensity=this.aoMapIntensity);this.bumpMap&&this.bumpMap.isTexture&&(d.bumpMap=this.bumpMap.toJSON(a).uuid,d.bumpScale=this.bumpScale);this.normalMap&&this.normalMap.isTexture&&(d.normalMap=this.normalMap.toJSON(a).uuid,d.normalMapType=this.normalMapType,d.normalScale=this.normalScale.toArray());this.displacementMap&&this.displacementMap.isTexture&&(d.displacementMap=this.displacementMap.toJSON(a).uuid,
d.displacementScale=this.displacementScale,d.displacementBias=this.displacementBias);this.roughnessMap&&this.roughnessMap.isTexture&&(d.roughnessMap=this.roughnessMap.toJSON(a).uuid);this.metalnessMap&&this.metalnessMap.isTexture&&(d.metalnessMap=this.metalnessMap.toJSON(a).uuid);this.emissiveMap&&this.emissiveMap.isTexture&&(d.emissiveMap=this.emissiveMap.toJSON(a).uuid);this.specularMap&&this.specularMap.isTexture&&(d.specularMap=this.specularMap.toJSON(a).uuid);this.envMap&&this.envMap.isTexture&&
(d.envMap=this.envMap.toJSON(a).uuid,d.reflectivity=this.reflectivity);this.gradientMap&&this.gradientMap.isTexture&&(d.gradientMap=this.gradientMap.toJSON(a).uuid);void 0!==this.size&&(d.size=this.size);void 0!==this.sizeAttenuation&&(d.sizeAttenuation=this.sizeAttenuation);1!==this.blending&&(d.blending=this.blending);!0===this.flatShading&&(d.flatShading=this.flatShading);0!==this.side&&(d.side=this.side);0!==this.vertexColors&&(d.vertexColors=this.vertexColors);1>this.opacity&&(d.opacity=this.opacity);
!0===this.transparent&&(d.transparent=this.transparent);d.depthFunc=this.depthFunc;d.depthTest=this.depthTest;d.depthWrite=this.depthWrite;0!==this.rotation&&(d.rotation=this.rotation);!0===this.polygonOffset&&(d.polygonOffset=!0);0!==this.polygonOffsetFactor&&(d.polygonOffsetFactor=this.polygonOffsetFactor);0!==this.polygonOffsetUnits&&(d.polygonOffsetUnits=this.polygonOffsetUnits);1!==this.linewidth&&(d.linewidth=this.linewidth);void 0!==this.dashSize&&(d.dashSize=this.dashSize);void 0!==this.gapSize&&
(d.gapSize=this.gapSize);void 0!==this.scale&&(d.scale=this.scale);!0===this.dithering&&(d.dithering=!0);0<this.alphaTest&&(d.alphaTest=this.alphaTest);!0===this.premultipliedAlpha&&(d.premultipliedAlpha=this.premultipliedAlpha);!0===this.wireframe&&(d.wireframe=this.wireframe);1<this.wireframeLinewidth&&(d.wireframeLinewidth=this.wireframeLinewidth);"round"!==this.wireframeLinecap&&(d.wireframeLinecap=this.wireframeLinecap);"round"!==this.wireframeLinejoin&&(d.wireframeLinejoin=this.wireframeLinejoin);
!0===this.morphTargets&&(d.morphTargets=!0);!0===this.skinning&&(d.skinning=!0);!1===this.visible&&(d.visible=!1);"{}"!==JSON.stringify(this.userData)&&(d.userData=this.userData);c&&(c=b(a.textures),a=b(a.images),0<c.length&&(d.textures=c),0<a.length&&(d.images=a));return d},clone:function(){return(new this.constructor).copy(this)},copy:function(a){this.name=a.name;this.fog=a.fog;this.lights=a.lights;this.blending=a.blending;this.side=a.side;this.flatShading=a.flatShading;this.vertexColors=a.vertexColors;
this.opacity=a.opacity;this.transparent=a.transparent;this.blendSrc=a.blendSrc;this.blendDst=a.blendDst;this.blendEquation=a.blendEquation;this.blendSrcAlpha=a.blendSrcAlpha;this.blendDstAlpha=a.blendDstAlpha;this.blendEquationAlpha=a.blendEquationAlpha;this.depthFunc=a.depthFunc;this.depthTest=a.depthTest;this.depthWrite=a.depthWrite;this.colorWrite=a.colorWrite;this.precision=a.precision;this.polygonOffset=a.polygonOffset;this.polygonOffsetFactor=a.polygonOffsetFactor;this.polygonOffsetUnits=a.polygonOffsetUnits;
this.dithering=a.dithering;this.alphaTest=a.alphaTest;this.premultipliedAlpha=a.premultipliedAlpha;this.overdraw=a.overdraw;this.visible=a.visible;this.userData=JSON.parse(JSON.stringify(a.userData));this.clipShadows=a.clipShadows;this.clipIntersection=a.clipIntersection;var b=a.clippingPlanes,c=null;if(null!==b){var d=b.length;c=Array(d);for(var e=0;e!==d;++e)c[e]=b[e].clone()}this.clippingPlanes=c;this.shadowSide=a.shadowSide;return this},dispose:function(){this.dispatchEvent({type:"dispose"})}});
ka.prototype=Object.create(H.prototype);ka.prototype.constructor=ka;ka.prototype.isMeshBasicMaterial=!0;ka.prototype.copy=function(a){H.prototype.copy.call(this,a);this.color.copy(a.color);this.map=a.map;this.lightMap=a.lightMap;this.lightMapIntensity=a.lightMapIntensity;this.aoMap=a.aoMap;this.aoMapIntensity=a.aoMapIntensity;this.specularMap=a.specularMap;this.alphaMap=a.alphaMap;this.envMap=a.envMap;this.combine=a.combine;this.reflectivity=a.reflectivity;this.refractionRatio=a.refractionRatio;this.wireframe=
a.wireframe;this.wireframeLinewidth=a.wireframeLinewidth;this.wireframeLinecap=a.wireframeLinecap;this.wireframeLinejoin=a.wireframeLinejoin;this.skinning=a.skinning;this.morphTargets=a.morphTargets;return this};ua.prototype=Object.create(H.prototype);ua.prototype.constructor=ua;ua.prototype.isShaderMaterial=!0;ua.prototype.copy=function(a){H.prototype.copy.call(this,a);this.fragmentShader=a.fragmentShader;this.vertexShader=a.vertexShader;this.uniforms=Ba.clone(a.uniforms);this.defines=Object.assign({},
a.defines);this.wireframe=a.wireframe;this.wireframeLinewidth=a.wireframeLinewidth;this.lights=a.lights;this.clipping=a.clipping;this.skinning=a.skinning;this.morphTargets=a.morphTargets;this.morphNormals=a.morphNormals;this.extensions=a.extensions;return this};ua.prototype.toJSON=function(a){var b=H.prototype.toJSON.call(this,a);b.uniforms={};for(var c in this.uniforms){var d=this.uniforms[c].value;b.uniforms[c]=d.isTexture?{type:"t",value:d.toJSON(a).uuid}:d.isColor?{type:"c",value:d.getHex()}:
d.isVector2?{type:"v2",value:d.toArray()}:d.isVector3?{type:"v3",value:d.toArray()}:d.isVector4?{type:"v4",value:d.toArray()}:d.isMatrix4?{type:"m4",value:d.toArray()}:{value:d}}0<Object.keys(this.defines).length&&(b.defines=this.defines);b.vertexShader=this.vertexShader;b.fragmentShader=this.fragmentShader;return b};Object.assign(ob.prototype,{set:function(a,b){this.origin.copy(a);this.direction.copy(b);return this},clone:function(){return(new this.constructor).copy(this)},copy:function(a){this.origin.copy(a.origin);
this.direction.copy(a.direction);return this},at:function(a,b){void 0===b&&(console.warn("THREE.Ray: .at() target is now required"),b=new p);return b.copy(this.direction).multiplyScalar(a).add(this.origin)},lookAt:function(a){this.direction.copy(a).sub(this.origin).normalize();return this},recast:function(){var a=new p;return function(b){this.origin.copy(this.at(b,a));return this}}(),closestPointToPoint:function(a,b){void 0===b&&(console.warn("THREE.Ray: .closestPointToPoint() target is now required"),
b=new p);b.subVectors(a,this.origin);a=b.dot(this.direction);return 0>a?b.copy(this.origin):b.copy(this.direction).multiplyScalar(a).add(this.origin)},distanceToPoint:function(a){return Math.sqrt(this.distanceSqToPoint(a))},distanceSqToPoint:function(){var a=new p;return function(b){var c=a.subVectors(b,this.origin).dot(this.direction);if(0>c)return this.origin.distanceToSquared(b);a.copy(this.direction).multiplyScalar(c).add(this.origin);return a.distanceToSquared(b)}}(),distanceSqToSegment:function(){var a=
new p,b=new p,c=new p;return function(d,e,f,g){a.copy(d).add(e).multiplyScalar(.5);b.copy(e).sub(d).normalize();c.copy(this.origin).sub(a);var h=.5*d.distanceTo(e),k=-this.direction.dot(b),m=c.dot(this.direction),l=-c.dot(b),n=c.lengthSq(),q=Math.abs(1-k*k);if(0<q){d=k*l-m;e=k*m-l;var p=h*q;0<=d?e>=-p?e<=p?(h=1/q,d*=h,e*=h,k=d*(d+k*e+2*m)+e*(k*d+e+2*l)+n):(e=h,d=Math.max(0,-(k*e+m)),k=-d*d+e*(e+2*l)+n):(e=-h,d=Math.max(0,-(k*e+m)),k=-d*d+e*(e+2*l)+n):e<=-p?(d=Math.max(0,-(-k*h+m)),e=0<d?-h:Math.min(Math.max(-h,
-l),h),k=-d*d+e*(e+2*l)+n):e<=p?(d=0,e=Math.min(Math.max(-h,-l),h),k=e*(e+2*l)+n):(d=Math.max(0,-(k*h+m)),e=0<d?h:Math.min(Math.max(-h,-l),h),k=-d*d+e*(e+2*l)+n)}else e=0<k?-h:h,d=Math.max(0,-(k*e+m)),k=-d*d+e*(e+2*l)+n;f&&f.copy(this.direction).multiplyScalar(d).add(this.origin);g&&g.copy(b).multiplyScalar(e).add(a);return k}}(),intersectSphere:function(){var a=new p;return function(b,c){a.subVectors(b.center,this.origin);var d=a.dot(this.direction),e=a.dot(a)-d*d;b=b.radius*b.radius;if(e>b)return null;
b=Math.sqrt(b-e);e=d-b;d+=b;return 0>e&&0>d?null:0>e?this.at(d,c):this.at(e,c)}}(),intersectsSphere:function(a){return this.distanceSqToPoint(a.center)<=a.radius*a.radius},distanceToPlane:function(a){var b=a.normal.dot(this.direction);if(0===b)return 0===a.distanceToPoint(this.origin)?0:null;a=-(this.origin.dot(a.normal)+a.constant)/b;return 0<=a?a:null},intersectPlane:function(a,b){a=this.distanceToPlane(a);return null===a?null:this.at(a,b)},intersectsPlane:function(a){var b=a.distanceToPoint(this.origin);
return 0===b||0>a.normal.dot(this.direction)*b?!0:!1},intersectBox:function(a,b){var c=1/this.direction.x;var d=1/this.direction.y;var e=1/this.direction.z,f=this.origin;if(0<=c){var g=(a.min.x-f.x)*c;c*=a.max.x-f.x}else g=(a.max.x-f.x)*c,c*=a.min.x-f.x;if(0<=d){var h=(a.min.y-f.y)*d;d*=a.max.y-f.y}else h=(a.max.y-f.y)*d,d*=a.min.y-f.y;if(g>d||h>c)return null;if(h>g||g!==g)g=h;if(d<c||c!==c)c=d;0<=e?(h=(a.min.z-f.z)*e,a=(a.max.z-f.z)*e):(h=(a.max.z-f.z)*e,a=(a.min.z-f.z)*e);if(g>a||h>c)return null;
if(h>g||g!==g)g=h;if(a<c||c!==c)c=a;return 0>c?null:this.at(0<=g?g:c,b)},intersectsBox:function(){var a=new p;return function(b){return null!==this.intersectBox(b,a)}}(),intersectTriangle:function(){var a=new p,b=new p,c=new p,d=new p;return function(e,f,g,h,k){b.subVectors(f,e);c.subVectors(g,e);d.crossVectors(b,c);f=this.direction.dot(d);if(0<f){if(h)return null;h=1}else if(0>f)h=-1,f=-f;else return null;a.subVectors(this.origin,e);e=h*this.direction.dot(c.crossVectors(a,c));if(0>e)return null;
g=h*this.direction.dot(b.cross(a));if(0>g||e+g>f)return null;e=-h*a.dot(d);return 0>e?null:this.at(e/f,k)}}(),applyMatrix4:function(a){this.origin.applyMatrix4(a);this.direction.transformDirection(a);return this},equals:function(a){return a.origin.equals(this.origin)&&a.direction.equals(this.direction)}});Object.assign(da,{getNormal:function(){var a=new p;return function(b,c,d,e){void 0===e&&(console.warn("THREE.Triangle: .getNormal() target is now required"),e=new p);e.subVectors(d,c);a.subVectors(b,
c);e.cross(a);b=e.lengthSq();return 0<b?e.multiplyScalar(1/Math.sqrt(b)):e.set(0,0,0)}}(),getBarycoord:function(){var a=new p,b=new p,c=new p;return function(d,e,f,g,h){a.subVectors(g,e);b.subVectors(f,e);c.subVectors(d,e);d=a.dot(a);e=a.dot(b);f=a.dot(c);var k=b.dot(b);g=b.dot(c);var m=d*k-e*e;void 0===h&&(console.warn("THREE.Triangle: .getBarycoord() target is now required"),h=new p);if(0===m)return h.set(-2,-1,-1);m=1/m;k=(k*f-e*g)*m;d=(d*g-e*f)*m;return h.set(1-k-d,d,k)}}(),containsPoint:function(){var a=
new p;return function(b,c,d,e){da.getBarycoord(b,c,d,e,a);return 0<=a.x&&0<=a.y&&1>=a.x+a.y}}(),getUV:function(){var a=new p;return function(b,c,d,e,f,g,h,k){this.getBarycoord(b,c,d,e,a);k.set(0,0);k.addScaledVector(f,a.x);k.addScaledVector(g,a.y);k.addScaledVector(h,a.z);return k}}()});Object.assign(da.prototype,{set:function(a,b,c){this.a.copy(a);this.b.copy(b);this.c.copy(c);return this},setFromPointsAndIndices:function(a,b,c,d){this.a.copy(a[b]);this.b.copy(a[c]);this.c.copy(a[d]);return this},
clone:function(){return(new this.constructor).copy(this)},copy:function(a){this.a.copy(a.a);this.b.copy(a.b);this.c.copy(a.c);return this},getArea:function(){var a=new p,b=new p;return function(){a.subVectors(this.c,this.b);b.subVectors(this.a,this.b);return.5*a.cross(b).length()}}(),getMidpoint:function(a){void 0===a&&(console.warn("THREE.Triangle: .getMidpoint() target is now required"),a=new p);return a.addVectors(this.a,this.b).add(this.c).multiplyScalar(1/3)},getNormal:function(a){return da.getNormal(this.a,
this.b,this.c,a)},getPlane:function(a){void 0===a&&(console.warn("THREE.Triangle: .getPlane() target is now required"),a=new p);return a.setFromCoplanarPoints(this.a,this.b,this.c)},getBarycoord:function(a,b){return da.getBarycoord(a,this.a,this.b,this.c,b)},containsPoint:function(a){return da.containsPoint(a,this.a,this.b,this.c)},getUV:function(a,b,c,d,e){return da.getUV(a,this.a,this.b,this.c,b,c,d,e)},intersectsBox:function(a){return a.intersectsTriangle(this)},closestPointToPoint:function(){var a=
new p,b=new p,c=new p,d=new p,e=new p,f=new p;return function(g,h){void 0===h&&(console.warn("THREE.Triangle: .closestPointToPoint() target is now required"),h=new p);var k=this.a,m=this.b,l=this.c;a.subVectors(m,k);b.subVectors(l,k);d.subVectors(g,k);var n=a.dot(d),q=b.dot(d);if(0>=n&&0>=q)return h.copy(k);e.subVectors(g,m);var u=a.dot(e),r=b.dot(e);if(0<=u&&r<=u)return h.copy(m);var v=n*r-u*q;if(0>=v&&0<=n&&0>=u)return m=n/(n-u),h.copy(k).addScaledVector(a,m);f.subVectors(g,l);g=a.dot(f);var y=
b.dot(f);if(0<=y&&g<=y)return h.copy(l);n=g*q-n*y;if(0>=n&&0<=q&&0>=y)return v=q/(q-y),h.copy(k).addScaledVector(b,v);q=u*y-g*r;if(0>=q&&0<=r-u&&0<=g-y)return c.subVectors(l,m),v=(r-u)/(r-u+(g-y)),h.copy(m).addScaledVector(c,v);l=1/(q+n+v);m=n*l;v*=l;return h.copy(k).addScaledVector(a,m).addScaledVector(b,v)}}(),equals:function(a){return a.a.equals(this.a)&&a.b.equals(this.b)&&a.c.equals(this.c)}});ta.prototype=Object.assign(Object.create(B.prototype),{constructor:ta,isMesh:!0,setDrawMode:function(a){this.drawMode=
a},copy:function(a){B.prototype.copy.call(this,a);this.drawMode=a.drawMode;void 0!==a.morphTargetInfluences&&(this.morphTargetInfluences=a.morphTargetInfluences.slice());void 0!==a.morphTargetDictionary&&(this.morphTargetDictionary=Object.assign({},a.morphTargetDictionary));return this},updateMorphTargets:function(){var a=this.geometry;if(a.isBufferGeometry){a=a.morphAttributes;var b=Object.keys(a);if(0<b.length){var c=a[b[0]];if(void 0!==c)for(this.morphTargetInfluences=[],this.morphTargetDictionary=
{},a=0,b=c.length;a<b;a++){var d=c[a].name||String(a);this.morphTargetInfluences.push(0);this.morphTargetDictionary[d]=a}}}else if(c=a.morphTargets,void 0!==c&&0<c.length)for(this.morphTargetInfluences=[],this.morphTargetDictionary={},a=0,b=c.length;a<b;a++)d=c[a].name||String(a),this.morphTargetInfluences.push(0),this.morphTargetDictionary[d]=a},raycast:function(){function a(a,b,c,d,e,f,g,h){if(null===(1===b.side?d.intersectTriangle(g,f,e,!0,h):d.intersectTriangle(e,f,g,2!==b.side,h)))return null;
v.copy(h);v.applyMatrix4(a.matrixWorld);b=c.ray.origin.distanceTo(v);return b<c.near||b>c.far?null:{distance:b,point:v.clone(),object:a}}function b(b,c,d,e,k,m,l,t,p){f.fromBufferAttribute(k,l);g.fromBufferAttribute(k,t);h.fromBufferAttribute(k,p);if(b=a(b,c,d,e,f,g,h,r))m&&(n.fromBufferAttribute(m,l),q.fromBufferAttribute(m,t),u.fromBufferAttribute(m,p),b.uv=da.getUV(r,f,g,h,n,q,u,new z)),m=new Va(l,t,p),da.getNormal(f,g,h,m.normal),b.face=m;return b}var c=new J,d=new ob,e=new Ea,f=new p,g=new p,
h=new p,k=new p,m=new p,l=new p,n=new z,q=new z,u=new z,r=new p,v=new p;return function(t,p){var v=this.geometry,y=this.material,x=this.matrixWorld;if(void 0!==y&&(null===v.boundingSphere&&v.computeBoundingSphere(),e.copy(v.boundingSphere),e.applyMatrix4(x),!1!==t.ray.intersectsSphere(e)&&(c.getInverse(x),d.copy(t.ray).applyMatrix4(c),null===v.boundingBox||!1!==d.intersectsBox(v.boundingBox))))if(v.isBufferGeometry){var A=v.index,B=v.attributes.position,E=v.attributes.uv,I=v.groups;v=v.drawRange;
var H;if(null!==A)if(Array.isArray(y)){var F=0;for(H=I.length;F<H;F++){var P=I[F];var L=y[P.materialIndex];x=Math.max(P.start,v.start);var M=Math.min(P.start+P.count,v.start+v.count);for(P=x;P<M;P+=3){x=A.getX(P);var J=A.getX(P+1);var K=A.getX(P+2);if(x=b(this,L,t,d,B,E,x,J,K))x.faceIndex=Math.floor(P/3),p.push(x)}}}else for(x=Math.max(0,v.start),M=Math.min(A.count,v.start+v.count),F=x,H=M;F<H;F+=3){if(x=A.getX(F),J=A.getX(F+1),K=A.getX(F+2),x=b(this,y,t,d,B,E,x,J,K))x.faceIndex=Math.floor(F/3),p.push(x)}else if(void 0!==
B)if(Array.isArray(y))for(F=0,H=I.length;F<H;F++)for(P=I[F],L=y[P.materialIndex],x=Math.max(P.start,v.start),M=Math.min(P.start+P.count,v.start+v.count),P=x;P<M;P+=3){if(x=P,J=P+1,K=P+2,x=b(this,L,t,d,B,E,x,J,K))x.faceIndex=Math.floor(P/3),p.push(x)}else for(x=Math.max(0,v.start),M=Math.min(B.count,v.start+v.count),F=x,H=M;F<H;F+=3)if(x=F,J=F+1,K=F+2,x=b(this,y,t,d,B,E,x,J,K))x.faceIndex=Math.floor(F/3),p.push(x)}else if(v.isGeometry)for(B=Array.isArray(y),E=v.vertices,I=v.faces,x=v.faceVertexUvs[0],
0<x.length&&(A=x),P=0,M=I.length;P<M;P++)if(J=I[P],x=B?y[J.materialIndex]:y,void 0!==x){F=E[J.a];H=E[J.b];L=E[J.c];if(!0===x.morphTargets){K=v.morphTargets;var R=this.morphTargetInfluences;f.set(0,0,0);g.set(0,0,0);h.set(0,0,0);for(var Q=0,T=K.length;Q<T;Q++){var U=R[Q];if(0!==U){var V=K[Q].vertices;f.addScaledVector(k.subVectors(V[J.a],F),U);g.addScaledVector(m.subVectors(V[J.b],H),U);h.addScaledVector(l.subVectors(V[J.c],L),U)}}f.add(F);g.add(H);h.add(L);F=f;H=g;L=h}if(x=a(this,x,t,d,F,H,L,r))A&&
A[P]&&(K=A[P],n.copy(K[0]),q.copy(K[1]),u.copy(K[2]),x.uv=da.getUV(r,F,H,L,n,q,u,new z)),x.face=J,x.faceIndex=P,p.push(x)}}}(),clone:function(){return(new this.constructor(this.geometry,this.material)).copy(this)}});Wa.prototype=Object.create(T.prototype);Wa.prototype.constructor=Wa;Wa.prototype.isCubeTexture=!0;Object.defineProperty(Wa.prototype,"images",{get:function(){return this.image},set:function(a){this.image=a}});var Le=new T,Me=new Wa,Fe=[],He=[],Ke=new Float32Array(16),Je=new Float32Array(9),
Ie=new Float32Array(4);Qe.prototype.updateCache=function(a){var b=this.cache;a instanceof Float32Array&&b.length!==a.length&&(this.cache=new Float32Array(a.length));ra(b,a)};Re.prototype.setValue=function(a,b,c){for(var d=this.seq,e=0,f=d.length;e!==f;++e){var g=d[e];g.setValue(a,b[g.id],c)}};var Ud=/([\w\d_]+)(\])?(\[|\.)?/g;$a.prototype.setValue=function(a,b,c){b=this.map[b];void 0!==b&&b.setValue(a,c,this.renderer)};$a.prototype.setOptional=function(a,b,c){b=b[c];void 0!==b&&this.setValue(a,c,
b)};$a.upload=function(a,b,c,d){for(var e=0,f=b.length;e!==f;++e){var g=b[e],h=c[g.id];!1!==h.needsUpdate&&g.setValue(a,h.value,d)}};$a.seqWithValue=function(a,b){for(var c=[],d=0,e=a.length;d!==e;++d){var f=a[d];f.id in b&&c.push(f)}return c};var xg=0,Gg=0;ab.prototype=Object.create(H.prototype);ab.prototype.constructor=ab;ab.prototype.isMeshDepthMaterial=!0;ab.prototype.copy=function(a){H.prototype.copy.call(this,a);this.depthPacking=a.depthPacking;this.skinning=a.skinning;this.morphTargets=a.morphTargets;
this.map=a.map;this.alphaMap=a.alphaMap;this.displacementMap=a.displacementMap;this.displacementScale=a.displacementScale;this.displacementBias=a.displacementBias;this.wireframe=a.wireframe;this.wireframeLinewidth=a.wireframeLinewidth;return this};bb.prototype=Object.create(H.prototype);bb.prototype.constructor=bb;bb.prototype.isMeshDistanceMaterial=!0;bb.prototype.copy=function(a){H.prototype.copy.call(this,a);this.referencePosition.copy(a.referencePosition);this.nearDistance=a.nearDistance;this.farDistance=
a.farDistance;this.skinning=a.skinning;this.morphTargets=a.morphTargets;this.map=a.map;this.alphaMap=a.alphaMap;this.displacementMap=a.displacementMap;this.displacementScale=a.displacementScale;this.displacementBias=a.displacementBias;return this};Mb.prototype=Object.assign(Object.create(B.prototype),{constructor:Mb,isGroup:!0});X.prototype=Object.assign(Object.create(Pa.prototype),{constructor:X,isPerspectiveCamera:!0,copy:function(a,b){Pa.prototype.copy.call(this,a,b);this.fov=a.fov;this.zoom=a.zoom;
this.near=a.near;this.far=a.far;this.focus=a.focus;this.aspect=a.aspect;this.view=null===a.view?null:Object.assign({},a.view);this.filmGauge=a.filmGauge;this.filmOffset=a.filmOffset;return this},setFocalLength:function(a){a=.5*this.getFilmHeight()/a;this.fov=2*K.RAD2DEG*Math.atan(a);this.updateProjectionMatrix()},getFocalLength:function(){var a=Math.tan(.5*K.DEG2RAD*this.fov);return.5*this.getFilmHeight()/a},getEffectiveFOV:function(){return 2*K.RAD2DEG*Math.atan(Math.tan(.5*K.DEG2RAD*this.fov)/this.zoom)},
getFilmWidth:function(){return this.filmGauge*Math.min(this.aspect,1)},getFilmHeight:function(){return this.filmGauge/Math.max(this.aspect,1)},setViewOffset:function(a,b,c,d,e,f){this.aspect=a/b;null===this.view&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1});this.view.enabled=!0;this.view.fullWidth=a;this.view.fullHeight=b;this.view.offsetX=c;this.view.offsetY=d;this.view.width=e;this.view.height=f;this.updateProjectionMatrix()},clearViewOffset:function(){null!==
this.view&&(this.view.enabled=!1);this.updateProjectionMatrix()},updateProjectionMatrix:function(){var a=this.near,b=a*Math.tan(.5*K.DEG2RAD*this.fov)/this.zoom,c=2*b,d=this.aspect*c,e=-.5*d,f=this.view;if(null!==this.view&&this.view.enabled){var g=f.fullWidth,h=f.fullHeight;e+=f.offsetX*d/g;b-=f.offsetY*c/h;d*=f.width/g;c*=f.height/h}f=this.filmOffset;0!==f&&(e+=a*f/this.getFilmWidth());this.projectionMatrix.makePerspective(e,e+d,b,b-c,a,this.far);this.projectionMatrixInverse.getInverse(this.projectionMatrix)},
toJSON:function(a){a=B.prototype.toJSON.call(this,a);a.object.fov=this.fov;a.object.zoom=this.zoom;a.object.near=this.near;a.object.far=this.far;a.object.focus=this.focus;a.object.aspect=this.aspect;null!==this.view&&(a.object.view=Object.assign({},this.view));a.object.filmGauge=this.filmGauge;a.object.filmOffset=this.filmOffset;return a}});Ac.prototype=Object.assign(Object.create(X.prototype),{constructor:Ac,isArrayCamera:!0});Nb.prototype.isFogExp2=!0;Nb.prototype.clone=function(){return new Nb(this.color,
this.density)};Nb.prototype.toJSON=function(){return{type:"FogExp2",color:this.color.getHex(),density:this.density}};Ob.prototype.isFog=!0;Ob.prototype.clone=function(){return new Ob(this.color,this.near,this.far)};Ob.prototype.toJSON=function(){return{type:"Fog",color:this.color.getHex(),near:this.near,far:this.far}};rd.prototype=Object.assign(Object.create(B.prototype),{constructor:rd,copy:function(a,b){B.prototype.copy.call(this,a,b);null!==a.background&&(this.background=a.background.clone());
null!==a.fog&&(this.fog=a.fog.clone());null!==a.overrideMaterial&&(this.overrideMaterial=a.overrideMaterial.clone());this.autoUpdate=a.autoUpdate;this.matrixAutoUpdate=a.matrixAutoUpdate;return this},toJSON:function(a){var b=B.prototype.toJSON.call(this,a);null!==this.background&&(b.object.background=this.background.toJSON(a));null!==this.fog&&(b.object.fog=this.fog.toJSON());return b}});Object.defineProperty(qb.prototype,"needsUpdate",{set:function(a){!0===a&&this.version++}});Object.assign(qb.prototype,
{isInterleavedBuffer:!0,onUploadCallback:function(){},setArray:function(a){if(Array.isArray(a))throw new TypeError("THREE.BufferAttribute: array should be a Typed Array.");this.count=void 0!==a?a.length/this.stride:0;this.array=a;return this},setDynamic:function(a){this.dynamic=a;return this},copy:function(a){this.array=new a.array.constructor(a.array);this.count=a.count;this.stride=a.stride;this.dynamic=a.dynamic;return this},copyAt:function(a,b,c){a*=this.stride;c*=b.stride;for(var d=0,e=this.stride;d<
e;d++)this.array[a+d]=b.array[c+d];return this},set:function(a,b){void 0===b&&(b=0);this.array.set(a,b);return this},clone:function(){return(new this.constructor).copy(this)},onUpload:function(a){this.onUploadCallback=a;return this}});Object.defineProperties(Bc.prototype,{count:{get:function(){return this.data.count}},array:{get:function(){return this.data.array}}});Object.assign(Bc.prototype,{isInterleavedBufferAttribute:!0,setX:function(a,b){this.data.array[a*this.data.stride+this.offset]=b;return this},
setY:function(a,b){this.data.array[a*this.data.stride+this.offset+1]=b;return this},setZ:function(a,b){this.data.array[a*this.data.stride+this.offset+2]=b;return this},setW:function(a,b){this.data.array[a*this.data.stride+this.offset+3]=b;return this},getX:function(a){return this.data.array[a*this.data.stride+this.offset]},getY:function(a){return this.data.array[a*this.data.stride+this.offset+1]},getZ:function(a){return this.data.array[a*this.data.stride+this.offset+2]},getW:function(a){return this.data.array[a*
this.data.stride+this.offset+3]},setXY:function(a,b,c){a=a*this.data.stride+this.offset;this.data.array[a+0]=b;this.data.array[a+1]=c;return this},setXYZ:function(a,b,c,d){a=a*this.data.stride+this.offset;this.data.array[a+0]=b;this.data.array[a+1]=c;this.data.array[a+2]=d;return this},setXYZW:function(a,b,c,d,e){a=a*this.data.stride+this.offset;this.data.array[a+0]=b;this.data.array[a+1]=c;this.data.array[a+2]=d;this.data.array[a+3]=e;return this}});eb.prototype=Object.create(H.prototype);eb.prototype.constructor=
eb;eb.prototype.isSpriteMaterial=!0;eb.prototype.copy=function(a){H.prototype.copy.call(this,a);this.color.copy(a.color);this.map=a.map;this.rotation=a.rotation;this.sizeAttenuation=a.sizeAttenuation;return this};var Pb;Cc.prototype=Object.assign(Object.create(B.prototype),{constructor:Cc,isSprite:!0,raycast:function(){function a(a,b,c,d,h,k){e.subVectors(a,c).addScalar(.5).multiply(d);void 0!==h?(f.x=k*e.x-h*e.y,f.y=h*e.x+k*e.y):f.copy(e);a.copy(b);a.x+=f.x;a.y+=f.y;a.applyMatrix4(g)}var b=new p,
c=new p,d=new p,e=new z,f=new z,g=new J,h=new p,k=new p,m=new p,l=new z,n=new z,q=new z;return function(e,f){c.setFromMatrixScale(this.matrixWorld);g.getInverse(this.modelViewMatrix).premultiply(this.matrixWorld);d.setFromMatrixPosition(this.modelViewMatrix);var t=this.material.rotation;if(0!==t){var p=Math.cos(t);var r=Math.sin(t)}t=this.center;a(h.set(-.5,-.5,0),d,t,c,r,p);a(k.set(.5,-.5,0),d,t,c,r,p);a(m.set(.5,.5,0),d,t,c,r,p);l.set(0,0);n.set(1,0);q.set(1,1);var u=e.ray.intersectTriangle(h,k,
m,!1,b);if(null===u&&(a(k.set(-.5,.5,0),d,t,c,r,p),n.set(0,1),u=e.ray.intersectTriangle(h,m,k,!1,b),null===u))return;r=e.ray.origin.distanceTo(b);r<e.near||r>e.far||f.push({distance:r,point:b.clone(),uv:da.getUV(b,h,k,m,l,n,q,new z),face:null,object:this})}}(),clone:function(){return(new this.constructor(this.material)).copy(this)},copy:function(a){B.prototype.copy.call(this,a);void 0!==a.center&&this.center.copy(a.center);return this}});Dc.prototype=Object.assign(Object.create(B.prototype),{constructor:Dc,
copy:function(a){B.prototype.copy.call(this,a,!1);a=a.levels;for(var b=0,c=a.length;b<c;b++){var d=a[b];this.addLevel(d.object.clone(),d.distance)}return this},addLevel:function(a,b){void 0===b&&(b=0);b=Math.abs(b);for(var c=this.levels,d=0;d<c.length&&!(b<c[d].distance);d++);c.splice(d,0,{distance:b,object:a});this.add(a)},getObjectForDistance:function(a){for(var b=this.levels,c=1,d=b.length;c<d&&!(a<b[c].distance);c++);return b[c-1].object},raycast:function(){var a=new p;return function(b,c){a.setFromMatrixPosition(this.matrixWorld);
var d=b.ray.origin.distanceTo(a);this.getObjectForDistance(d).raycast(b,c)}}(),update:function(){var a=new p,b=new p;return function(c){var d=this.levels;if(1<d.length){a.setFromMatrixPosition(c.matrixWorld);b.setFromMatrixPosition(this.matrixWorld);c=a.distanceTo(b);d[0].object.visible=!0;for(var e=1,f=d.length;e<f;e++)if(c>=d[e].distance)d[e-1].object.visible=!1,d[e].object.visible=!0;else break;for(;e<f;e++)d[e].object.visible=!1}}}(),toJSON:function(a){a=B.prototype.toJSON.call(this,a);a.object.levels=
[];for(var b=this.levels,c=0,d=b.length;c<d;c++){var e=b[c];a.object.levels.push({object:e.object.uuid,distance:e.distance})}return a}});Object.assign(Ec.prototype,{calculateInverses:function(){this.boneInverses=[];for(var a=0,b=this.bones.length;a<b;a++){var c=new J;this.bones[a]&&c.getInverse(this.bones[a].matrixWorld);this.boneInverses.push(c)}},pose:function(){var a,b;var c=0;for(b=this.bones.length;c<b;c++)(a=this.bones[c])&&a.matrixWorld.getInverse(this.boneInverses[c]);c=0;for(b=this.bones.length;c<
b;c++)if(a=this.bones[c])a.parent&&a.parent.isBone?(a.matrix.getInverse(a.parent.matrixWorld),a.matrix.multiply(a.matrixWorld)):a.matrix.copy(a.matrixWorld),a.matrix.decompose(a.position,a.quaternion,a.scale)},update:function(){var a=new J,b=new J;return function(){for(var c=this.bones,d=this.boneInverses,e=this.boneMatrices,f=this.boneTexture,g=0,h=c.length;g<h;g++)a.multiplyMatrices(c[g]?c[g].matrixWorld:b,d[g]),a.toArray(e,16*g);void 0!==f&&(f.needsUpdate=!0)}}(),clone:function(){return new Ec(this.bones,
this.boneInverses)},getBoneByName:function(a){for(var b=0,c=this.bones.length;b<c;b++){var d=this.bones[b];if(d.name===a)return d}}});sd.prototype=Object.assign(Object.create(B.prototype),{constructor:sd,isBone:!0});td.prototype=Object.assign(Object.create(ta.prototype),{constructor:td,isSkinnedMesh:!0,initBones:function(){var a=[],b;if(this.geometry&&void 0!==this.geometry.bones){var c=0;for(b=this.geometry.bones.length;c<b;c++){var d=this.geometry.bones[c];var e=new sd;a.push(e);e.name=d.name;e.position.fromArray(d.pos);
e.quaternion.fromArray(d.rotq);void 0!==d.scl&&e.scale.fromArray(d.scl)}c=0;for(b=this.geometry.bones.length;c<b;c++)d=this.geometry.bones[c],-1!==d.parent&&null!==d.parent&&void 0!==a[d.parent]?a[d.parent].add(a[c]):this.add(a[c])}this.updateMatrixWorld(!0);return a},bind:function(a,b){this.skeleton=a;void 0===b&&(this.updateMatrixWorld(!0),this.skeleton.calculateInverses(),b=this.matrixWorld);this.bindMatrix.copy(b);this.bindMatrixInverse.getInverse(b)},pose:function(){this.skeleton.pose()},normalizeSkinWeights:function(){var a;
if(this.geometry&&this.geometry.isGeometry)for(a=0;a<this.geometry.skinWeights.length;a++){var b=this.geometry.skinWeights[a];var c=1/b.manhattanLength();Infinity!==c?b.multiplyScalar(c):b.set(1,0,0,0)}else if(this.geometry&&this.geometry.isBufferGeometry){b=new aa;var d=this.geometry.attributes.skinWeight;for(a=0;a<d.count;a++)b.x=d.getX(a),b.y=d.getY(a),b.z=d.getZ(a),b.w=d.getW(a),c=1/b.manhattanLength(),Infinity!==c?b.multiplyScalar(c):b.set(1,0,0,0),d.setXYZW(a,b.x,b.y,b.z,b.w)}},updateMatrixWorld:function(a){ta.prototype.updateMatrixWorld.call(this,
a);"attached"===this.bindMode?this.bindMatrixInverse.getInverse(this.matrixWorld):"detached"===this.bindMode?this.bindMatrixInverse.getInverse(this.bindMatrix):console.warn("THREE.SkinnedMesh: Unrecognized bindMode: "+this.bindMode)},clone:function(){return(new this.constructor(this.geometry,this.material)).copy(this)}});V.prototype=Object.create(H.prototype);V.prototype.constructor=V;V.prototype.isLineBasicMaterial=!0;V.prototype.copy=function(a){H.prototype.copy.call(this,a);this.color.copy(a.color);
this.linewidth=a.linewidth;this.linecap=a.linecap;this.linejoin=a.linejoin;return this};oa.prototype=Object.assign(Object.create(B.prototype),{constructor:oa,isLine:!0,computeLineDistances:function(){var a=new p,b=new p;return function(){var c=this.geometry;if(c.isBufferGeometry)if(null===c.index){for(var d=c.attributes.position,e=[0],f=1,g=d.count;f<g;f++)a.fromBufferAttribute(d,f-1),b.fromBufferAttribute(d,f),e[f]=e[f-1],e[f]+=a.distanceTo(b);c.addAttribute("lineDistance",new A(e,1))}else console.warn("THREE.Line.computeLineDistances(): Computation only possible with non-indexed BufferGeometry.");
else if(c.isGeometry)for(d=c.vertices,e=c.lineDistances,e[0]=0,f=1,g=d.length;f<g;f++)e[f]=e[f-1],e[f]+=d[f-1].distanceTo(d[f]);return this}}(),raycast:function(){var a=new J,b=new ob,c=new Ea;return function(d,e){var f=d.linePrecision,g=this.geometry,h=this.matrixWorld;null===g.boundingSphere&&g.computeBoundingSphere();c.copy(g.boundingSphere);c.applyMatrix4(h);c.radius+=f;if(!1!==d.ray.intersectsSphere(c)){a.getInverse(h);b.copy(d.ray).applyMatrix4(a);f/=(this.scale.x+this.scale.y+this.scale.z)/
3;f*=f;var k=new p,m=new p;h=new p;var l=new p,n=this&&this.isLineSegments?2:1;if(g.isBufferGeometry){var q=g.index,u=g.attributes.position.array;if(null!==q){q=q.array;g=0;for(var r=q.length-1;g<r;g+=n){var v=q[g+1];k.fromArray(u,3*q[g]);m.fromArray(u,3*v);v=b.distanceSqToSegment(k,m,l,h);v>f||(l.applyMatrix4(this.matrixWorld),v=d.ray.origin.distanceTo(l),v<d.near||v>d.far||e.push({distance:v,point:h.clone().applyMatrix4(this.matrixWorld),index:g,face:null,faceIndex:null,object:this}))}}else for(g=
0,r=u.length/3-1;g<r;g+=n)k.fromArray(u,3*g),m.fromArray(u,3*g+3),v=b.distanceSqToSegment(k,m,l,h),v>f||(l.applyMatrix4(this.matrixWorld),v=d.ray.origin.distanceTo(l),v<d.near||v>d.far||e.push({distance:v,point:h.clone().applyMatrix4(this.matrixWorld),index:g,face:null,faceIndex:null,object:this}))}else if(g.isGeometry)for(k=g.vertices,m=k.length,g=0;g<m-1;g+=n)v=b.distanceSqToSegment(k[g],k[g+1],l,h),v>f||(l.applyMatrix4(this.matrixWorld),v=d.ray.origin.distanceTo(l),v<d.near||v>d.far||e.push({distance:v,
point:h.clone().applyMatrix4(this.matrixWorld),index:g,face:null,faceIndex:null,object:this}))}}}(),clone:function(){return(new this.constructor(this.geometry,this.material)).copy(this)}});Z.prototype=Object.assign(Object.create(oa.prototype),{constructor:Z,isLineSegments:!0,computeLineDistances:function(){var a=new p,b=new p;return function(){var c=this.geometry;if(c.isBufferGeometry)if(null===c.index){for(var d=c.attributes.position,e=[],f=0,g=d.count;f<g;f+=2)a.fromBufferAttribute(d,f),b.fromBufferAttribute(d,
f+1),e[f]=0===f?0:e[f-1],e[f+1]=e[f]+a.distanceTo(b);c.addAttribute("lineDistance",new A(e,1))}else console.warn("THREE.LineSegments.computeLineDistances(): Computation only possible with non-indexed BufferGeometry.");else if(c.isGeometry)for(d=c.vertices,e=c.lineDistances,f=0,g=d.length;f<g;f+=2)a.copy(d[f]),b.copy(d[f+1]),e[f]=0===f?0:e[f-1],e[f+1]=e[f]+a.distanceTo(b);return this}}()});ud.prototype=Object.assign(Object.create(oa.prototype),{constructor:ud,isLineLoop:!0});Fa.prototype=Object.create(H.prototype);
Fa.prototype.constructor=Fa;Fa.prototype.isPointsMaterial=!0;Fa.prototype.copy=function(a){H.prototype.copy.call(this,a);this.color.copy(a.color);this.map=a.map;this.size=a.size;this.sizeAttenuation=a.sizeAttenuation;this.morphTargets=a.morphTargets;return this};Qb.prototype=Object.assign(Object.create(B.prototype),{constructor:Qb,isPoints:!0,raycast:function(){var a=new J,b=new ob,c=new Ea;return function(d,e){function f(a,c){var f=b.distanceSqToPoint(a);f<l&&(b.closestPointToPoint(a,n),n.applyMatrix4(k),
a=d.ray.origin.distanceTo(n),a<d.near||a>d.far||e.push({distance:a,distanceToRay:Math.sqrt(f),point:n.clone(),index:c,face:null,object:g}))}var g=this,h=this.geometry,k=this.matrixWorld,m=d.params.Points.threshold;null===h.boundingSphere&&h.computeBoundingSphere();c.copy(h.boundingSphere);c.applyMatrix4(k);c.radius+=m;if(!1!==d.ray.intersectsSphere(c)){a.getInverse(k);b.copy(d.ray).applyMatrix4(a);m/=(this.scale.x+this.scale.y+this.scale.z)/3;var l=m*m;m=new p;var n=new p;if(h.isBufferGeometry){var q=
h.index;h=h.attributes.position.array;if(null!==q){var u=q.array;q=0;for(var r=u.length;q<r;q++){var v=u[q];m.fromArray(h,3*v);f(m,v)}}else for(q=0,u=h.length/3;q<u;q++)m.fromArray(h,3*q),f(m,q)}else for(m=h.vertices,q=0,u=m.length;q<u;q++)f(m[q],q)}}}(),clone:function(){return(new this.constructor(this.geometry,this.material)).copy(this)}});Zd.prototype=Object.assign(Object.create(T.prototype),{constructor:Zd,isVideoTexture:!0,update:function(){var a=this.image;a.readyState>=a.HAVE_CURRENT_DATA&&
(this.needsUpdate=!0)}});Rb.prototype=Object.create(T.prototype);Rb.prototype.constructor=Rb;Rb.prototype.isCompressedTexture=!0;Fc.prototype=Object.create(T.prototype);Fc.prototype.constructor=Fc;Fc.prototype.isCanvasTexture=!0;Gc.prototype=Object.create(T.prototype);Gc.prototype.constructor=Gc;Gc.prototype.isDepthTexture=!0;Sb.prototype=Object.create(I.prototype);Sb.prototype.constructor=Sb;Hc.prototype=Object.create(M.prototype);Hc.prototype.constructor=Hc;Tb.prototype=Object.create(I.prototype);
Tb.prototype.constructor=Tb;Ic.prototype=Object.create(M.prototype);Ic.prototype.constructor=Ic;la.prototype=Object.create(I.prototype);la.prototype.constructor=la;Jc.prototype=Object.create(M.prototype);Jc.prototype.constructor=Jc;Ub.prototype=Object.create(la.prototype);Ub.prototype.constructor=Ub;Kc.prototype=Object.create(M.prototype);Kc.prototype.constructor=Kc;rb.prototype=Object.create(la.prototype);rb.prototype.constructor=rb;Lc.prototype=Object.create(M.prototype);Lc.prototype.constructor=
Lc;Vb.prototype=Object.create(la.prototype);Vb.prototype.constructor=Vb;Mc.prototype=Object.create(M.prototype);Mc.prototype.constructor=Mc;Wb.prototype=Object.create(la.prototype);Wb.prototype.constructor=Wb;Nc.prototype=Object.create(M.prototype);Nc.prototype.constructor=Nc;Xb.prototype=Object.create(I.prototype);Xb.prototype.constructor=Xb;Oc.prototype=Object.create(M.prototype);Oc.prototype.constructor=Oc;Yb.prototype=Object.create(I.prototype);Yb.prototype.constructor=Yb;Pc.prototype=Object.create(M.prototype);
Pc.prototype.constructor=Pc;Zb.prototype=Object.create(I.prototype);Zb.prototype.constructor=Zb;var Tg={triangulate:function(a,b,c){c=c||2;var d=b&&b.length,e=d?b[0]*c:a.length,f=af(a,0,e,c,!0),g=[];if(!f)return g;var h;if(d){var k=c;d=[];var m;var l=0;for(m=b.length;l<m;l++){var n=b[l]*k;var q=l<m-1?b[l+1]*k:a.length;n=af(a,n,q,k,!1);n===n.next&&(n.steiner=!0);d.push(Og(n))}d.sort(Mg);for(l=0;l<d.length;l++){b=d[l];k=f;if(k=Ng(b,k))b=df(k,b),Rc(b,b.next);f=Rc(f,f.next)}}if(a.length>80*c){var p=h=
a[0];var r=d=a[1];for(k=c;k<e;k+=c)l=a[k],b=a[k+1],l<p&&(p=l),b<r&&(r=b),l>h&&(h=l),b>d&&(d=b);h=Math.max(h-p,d-r);h=0!==h?1/h:0}Sc(f,g,c,p,r,h);return g}},Xa={area:function(a){for(var b=a.length,c=0,d=b-1,e=0;e<b;d=e++)c+=a[d].x*a[e].y-a[e].x*a[d].y;return.5*c},isClockWise:function(a){return 0>Xa.area(a)},triangulateShape:function(a,b){var c=[],d=[],e=[];ef(a);ff(c,a);var f=a.length;b.forEach(ef);for(a=0;a<b.length;a++)d.push(f),f+=b[a].length,ff(c,b[a]);b=Tg.triangulate(c,d);for(a=0;a<b.length;a+=
3)e.push(b.slice(a,a+3));return e}};tb.prototype=Object.create(M.prototype);tb.prototype.constructor=tb;tb.prototype.toJSON=function(){var a=M.prototype.toJSON.call(this);return gf(this.parameters.shapes,this.parameters.options,a)};Qa.prototype=Object.create(I.prototype);Qa.prototype.constructor=Qa;Qa.prototype.toJSON=function(){var a=I.prototype.toJSON.call(this);return gf(this.parameters.shapes,this.parameters.options,a)};var Pg={generateTopUV:function(a,b,c,d,e){a=b[3*d];d=b[3*d+1];var f=b[3*e];
e=b[3*e+1];return[new z(b[3*c],b[3*c+1]),new z(a,d),new z(f,e)]},generateSideWallUV:function(a,b,c,d,e,f){a=b[3*c];var g=b[3*c+1];c=b[3*c+2];var h=b[3*d],k=b[3*d+1];d=b[3*d+2];var m=b[3*e],l=b[3*e+1];e=b[3*e+2];var n=b[3*f],q=b[3*f+1];b=b[3*f+2];return.01>Math.abs(g-k)?[new z(a,1-c),new z(h,1-d),new z(m,1-e),new z(n,1-b)]:[new z(g,1-c),new z(k,1-d),new z(l,1-e),new z(q,1-b)]}};Uc.prototype=Object.create(M.prototype);Uc.prototype.constructor=Uc;$b.prototype=Object.create(Qa.prototype);$b.prototype.constructor=
$b;Vc.prototype=Object.create(M.prototype);Vc.prototype.constructor=Vc;ub.prototype=Object.create(I.prototype);ub.prototype.constructor=ub;Wc.prototype=Object.create(M.prototype);Wc.prototype.constructor=Wc;ac.prototype=Object.create(I.prototype);ac.prototype.constructor=ac;Xc.prototype=Object.create(M.prototype);Xc.prototype.constructor=Xc;bc.prototype=Object.create(I.prototype);bc.prototype.constructor=bc;vb.prototype=Object.create(M.prototype);vb.prototype.constructor=vb;vb.prototype.toJSON=function(){var a=
M.prototype.toJSON.call(this);return hf(this.parameters.shapes,a)};wb.prototype=Object.create(I.prototype);wb.prototype.constructor=wb;wb.prototype.toJSON=function(){var a=I.prototype.toJSON.call(this);return hf(this.parameters.shapes,a)};cc.prototype=Object.create(I.prototype);cc.prototype.constructor=cc;xb.prototype=Object.create(M.prototype);xb.prototype.constructor=xb;Ya.prototype=Object.create(I.prototype);Ya.prototype.constructor=Ya;Yc.prototype=Object.create(xb.prototype);Yc.prototype.constructor=
Yc;Zc.prototype=Object.create(Ya.prototype);Zc.prototype.constructor=Zc;$c.prototype=Object.create(M.prototype);$c.prototype.constructor=$c;dc.prototype=Object.create(I.prototype);dc.prototype.constructor=dc;var za=Object.freeze({WireframeGeometry:Sb,ParametricGeometry:Hc,ParametricBufferGeometry:Tb,TetrahedronGeometry:Jc,TetrahedronBufferGeometry:Ub,OctahedronGeometry:Kc,OctahedronBufferGeometry:rb,IcosahedronGeometry:Lc,IcosahedronBufferGeometry:Vb,DodecahedronGeometry:Mc,DodecahedronBufferGeometry:Wb,
PolyhedronGeometry:Ic,PolyhedronBufferGeometry:la,TubeGeometry:Nc,TubeBufferGeometry:Xb,TorusKnotGeometry:Oc,TorusKnotBufferGeometry:Yb,TorusGeometry:Pc,TorusBufferGeometry:Zb,TextGeometry:Uc,TextBufferGeometry:$b,SphereGeometry:Vc,SphereBufferGeometry:ub,RingGeometry:Wc,RingBufferGeometry:ac,PlaneGeometry:wc,PlaneBufferGeometry:nb,LatheGeometry:Xc,LatheBufferGeometry:bc,ShapeGeometry:vb,ShapeBufferGeometry:wb,ExtrudeGeometry:tb,ExtrudeBufferGeometry:Qa,EdgesGeometry:cc,ConeGeometry:Yc,ConeBufferGeometry:Zc,
CylinderGeometry:xb,CylinderBufferGeometry:Ya,CircleGeometry:$c,CircleBufferGeometry:dc,BoxGeometry:Kb,BoxBufferGeometry:mb});yb.prototype=Object.create(H.prototype);yb.prototype.constructor=yb;yb.prototype.isShadowMaterial=!0;yb.prototype.copy=function(a){H.prototype.copy.call(this,a);this.color.copy(a.color);return this};ec.prototype=Object.create(ua.prototype);ec.prototype.constructor=ec;ec.prototype.isRawShaderMaterial=!0;Ra.prototype=Object.create(H.prototype);Ra.prototype.constructor=Ra;Ra.prototype.isMeshStandardMaterial=
!0;Ra.prototype.copy=function(a){H.prototype.copy.call(this,a);this.defines={STANDARD:""};this.color.copy(a.color);this.roughness=a.roughness;this.metalness=a.metalness;this.map=a.map;this.lightMap=a.lightMap;this.lightMapIntensity=a.lightMapIntensity;this.aoMap=a.aoMap;this.aoMapIntensity=a.aoMapIntensity;this.emissive.copy(a.emissive);this.emissiveMap=a.emissiveMap;this.emissiveIntensity=a.emissiveIntensity;this.bumpMap=a.bumpMap;this.bumpScale=a.bumpScale;this.normalMap=a.normalMap;this.normalMapType=
a.normalMapType;this.normalScale.copy(a.normalScale);this.displacementMap=a.displacementMap;this.displacementScale=a.displacementScale;this.displacementBias=a.displacementBias;this.roughnessMap=a.roughnessMap;this.metalnessMap=a.metalnessMap;this.alphaMap=a.alphaMap;this.envMap=a.envMap;this.envMapIntensity=a.envMapIntensity;this.refractionRatio=a.refractionRatio;this.wireframe=a.wireframe;this.wireframeLinewidth=a.wireframeLinewidth;this.wireframeLinecap=a.wireframeLinecap;this.wireframeLinejoin=
a.wireframeLinejoin;this.skinning=a.skinning;this.morphTargets=a.morphTargets;this.morphNormals=a.morphNormals;return this};zb.prototype=Object.create(Ra.prototype);zb.prototype.constructor=zb;zb.prototype.isMeshPhysicalMaterial=!0;zb.prototype.copy=function(a){Ra.prototype.copy.call(this,a);this.defines={PHYSICAL:""};this.reflectivity=a.reflectivity;this.clearCoat=a.clearCoat;this.clearCoatRoughness=a.clearCoatRoughness;return this};Ga.prototype=Object.create(H.prototype);Ga.prototype.constructor=
Ga;Ga.prototype.isMeshPhongMaterial=!0;Ga.prototype.copy=function(a){H.prototype.copy.call(this,a);this.color.copy(a.color);this.specular.copy(a.specular);this.shininess=a.shininess;this.map=a.map;this.lightMap=a.lightMap;this.lightMapIntensity=a.lightMapIntensity;this.aoMap=a.aoMap;this.aoMapIntensity=a.aoMapIntensity;this.emissive.copy(a.emissive);this.emissiveMap=a.emissiveMap;this.emissiveIntensity=a.emissiveIntensity;this.bumpMap=a.bumpMap;this.bumpScale=a.bumpScale;this.normalMap=a.normalMap;
this.normalMapType=a.normalMapType;this.normalScale.copy(a.normalScale);this.displacementMap=a.displacementMap;this.displacementScale=a.displacementScale;this.displacementBias=a.displacementBias;this.specularMap=a.specularMap;this.alphaMap=a.alphaMap;this.envMap=a.envMap;this.combine=a.combine;this.reflectivity=a.reflectivity;this.refractionRatio=a.refractionRatio;this.wireframe=a.wireframe;this.wireframeLinewidth=a.wireframeLinewidth;this.wireframeLinecap=a.wireframeLinecap;this.wireframeLinejoin=
a.wireframeLinejoin;this.skinning=a.skinning;this.morphTargets=a.morphTargets;this.morphNormals=a.morphNormals;return this};Ab.prototype=Object.create(Ga.prototype);Ab.prototype.constructor=Ab;Ab.prototype.isMeshToonMaterial=!0;Ab.prototype.copy=function(a){Ga.prototype.copy.call(this,a);this.gradientMap=a.gradientMap;return this};Bb.prototype=Object.create(H.prototype);Bb.prototype.constructor=Bb;Bb.prototype.isMeshNormalMaterial=!0;Bb.prototype.copy=function(a){H.prototype.copy.call(this,a);this.bumpMap=
a.bumpMap;this.bumpScale=a.bumpScale;this.normalMap=a.normalMap;this.normalMapType=a.normalMapType;this.normalScale.copy(a.normalScale);this.displacementMap=a.displacementMap;this.displacementScale=a.displacementScale;this.displacementBias=a.displacementBias;this.wireframe=a.wireframe;this.wireframeLinewidth=a.wireframeLinewidth;this.skinning=a.skinning;this.morphTargets=a.morphTargets;this.morphNormals=a.morphNormals;return this};Cb.prototype=Object.create(H.prototype);Cb.prototype.constructor=Cb;
Cb.prototype.isMeshLambertMaterial=!0;Cb.prototype.copy=function(a){H.prototype.copy.call(this,a);this.color.copy(a.color);this.map=a.map;this.lightMap=a.lightMap;this.lightMapIntensity=a.lightMapIntensity;this.aoMap=a.aoMap;this.aoMapIntensity=a.aoMapIntensity;this.emissive.copy(a.emissive);this.emissiveMap=a.emissiveMap;this.emissiveIntensity=a.emissiveIntensity;this.specularMap=a.specularMap;this.alphaMap=a.alphaMap;this.envMap=a.envMap;this.combine=a.combine;this.reflectivity=a.reflectivity;this.refractionRatio=
a.refractionRatio;this.wireframe=a.wireframe;this.wireframeLinewidth=a.wireframeLinewidth;this.wireframeLinecap=a.wireframeLinecap;this.wireframeLinejoin=a.wireframeLinejoin;this.skinning=a.skinning;this.morphTargets=a.morphTargets;this.morphNormals=a.morphNormals;return this};Db.prototype=Object.create(V.prototype);Db.prototype.constructor=Db;Db.prototype.isLineDashedMaterial=!0;Db.prototype.copy=function(a){V.prototype.copy.call(this,a);this.scale=a.scale;this.dashSize=a.dashSize;this.gapSize=a.gapSize;
return this};var Ug=Object.freeze({ShadowMaterial:yb,SpriteMaterial:eb,RawShaderMaterial:ec,ShaderMaterial:ua,PointsMaterial:Fa,MeshPhysicalMaterial:zb,MeshStandardMaterial:Ra,MeshPhongMaterial:Ga,MeshToonMaterial:Ab,MeshNormalMaterial:Bb,MeshLambertMaterial:Cb,MeshDepthMaterial:ab,MeshDistanceMaterial:bb,MeshBasicMaterial:ka,LineDashedMaterial:Db,LineBasicMaterial:V,Material:H}),Hb={enabled:!1,files:{},add:function(a,b){!1!==this.enabled&&(this.files[a]=b)},get:function(a){if(!1!==this.enabled)return this.files[a]},
remove:function(a){delete this.files[a]},clear:function(){this.files={}}},wa=new be,Na={};Object.assign(Ha.prototype,{load:function(a,b,c,d){void 0===a&&(a="");void 0!==this.path&&(a=this.path+a);a=this.manager.resolveURL(a);var e=this,f=Hb.get(a);if(void 0!==f)return e.manager.itemStart(a),setTimeout(function(){b&&b(f);e.manager.itemEnd(a)},0),f;if(void 0!==Na[a])Na[a].push({onLoad:b,onProgress:c,onError:d});else{var g=a.match(/^data:(.*?)(;base64)?,(.*)$/);if(g){c=g[1];var h=!!g[2];g=g[3];g=window.decodeURIComponent(g);
h&&(g=window.atob(g));try{var k=(this.responseType||"").toLowerCase();switch(k){case "arraybuffer":case "blob":var m=new Uint8Array(g.length);for(h=0;h<g.length;h++)m[h]=g.charCodeAt(h);var l="blob"===k?new Blob([m.buffer],{type:c}):m.buffer;break;case "document":l=(new DOMParser).parseFromString(g,c);break;case "json":l=JSON.parse(g);break;default:l=g}window.setTimeout(function(){b&&b(l);e.manager.itemEnd(a)},0)}catch(q){window.setTimeout(function(){d&&d(q);e.manager.itemEnd(a);e.manager.itemError(a)},
0)}}else{Na[a]=[];Na[a].push({onLoad:b,onProgress:c,onError:d});var n=new XMLHttpRequest;n.open("GET",a,!0);n.addEventListener("load",function(b){var c=this.response;Hb.add(a,c);var d=Na[a];delete Na[a];if(200===this.status||0===this.status){0===this.status&&console.warn("THREE.FileLoader: HTTP Status 0 received.");for(var f=0,g=d.length;f<g;f++){var h=d[f];if(h.onLoad)h.onLoad(c)}e.manager.itemEnd(a)}else{f=0;for(g=d.length;f<g;f++)if(h=d[f],h.onError)h.onError(b);e.manager.itemEnd(a);e.manager.itemError(a)}},
!1);n.addEventListener("progress",function(b){for(var c=Na[a],d=0,e=c.length;d<e;d++){var f=c[d];if(f.onProgress)f.onProgress(b)}},!1);n.addEventListener("error",function(b){var c=Na[a];delete Na[a];for(var d=0,f=c.length;d<f;d++){var g=c[d];if(g.onError)g.onError(b)}e.manager.itemEnd(a);e.manager.itemError(a)},!1);n.addEventListener("abort",function(b){var c=Na[a];delete Na[a];for(var d=0,f=c.length;d<f;d++){var g=c[d];if(g.onError)g.onError(b)}e.manager.itemEnd(a);e.manager.itemError(a)},!1);void 0!==
this.responseType&&(n.responseType=this.responseType);void 0!==this.withCredentials&&(n.withCredentials=this.withCredentials);n.overrideMimeType&&n.overrideMimeType(void 0!==this.mimeType?this.mimeType:"text/plain");for(h in this.requestHeader)n.setRequestHeader(h,this.requestHeader[h]);n.send(null)}e.manager.itemStart(a);return n}},setPath:function(a){this.path=a;return this},setResponseType:function(a){this.responseType=a;return this},setWithCredentials:function(a){this.withCredentials=a;return this},
setMimeType:function(a){this.mimeType=a;return this},setRequestHeader:function(a){this.requestHeader=a;return this}});Object.assign(jf.prototype,{load:function(a,b,c,d){function e(e){k.load(a[e],function(a){a=f._parser(a,!0);g[e]={width:a.width,height:a.height,format:a.format,mipmaps:a.mipmaps};m+=1;6===m&&(1===a.mipmapCount&&(h.minFilter=1006),h.format=a.format,h.needsUpdate=!0,b&&b(h))},c,d)}var f=this,g=[],h=new Rb;h.image=g;var k=new Ha(this.manager);k.setPath(this.path);k.setResponseType("arraybuffer");
if(Array.isArray(a))for(var m=0,l=0,n=a.length;l<n;++l)e(l);else k.load(a,function(a){a=f._parser(a,!0);if(a.isCubemap)for(var c=a.mipmaps.length/a.mipmapCount,d=0;d<c;d++){g[d]={mipmaps:[]};for(var e=0;e<a.mipmapCount;e++)g[d].mipmaps.push(a.mipmaps[d*a.mipmapCount+e]),g[d].format=a.format,g[d].width=a.width,g[d].height=a.height}else h.image.width=a.width,h.image.height=a.height,h.mipmaps=a.mipmaps;1===a.mipmapCount&&(h.minFilter=1006);h.format=a.format;h.needsUpdate=!0;b&&b(h)},c,d);return h},setPath:function(a){this.path=
a;return this}});Object.assign(ce.prototype,{load:function(a,b,c,d){var e=this,f=new ib,g=new Ha(this.manager);g.setResponseType("arraybuffer");g.load(a,function(a){if(a=e._parser(a))void 0!==a.image?f.image=a.image:void 0!==a.data&&(f.image.width=a.width,f.image.height=a.height,f.image.data=a.data),f.wrapS=void 0!==a.wrapS?a.wrapS:1001,f.wrapT=void 0!==a.wrapT?a.wrapT:1001,f.magFilter=void 0!==a.magFilter?a.magFilter:1006,f.minFilter=void 0!==a.minFilter?a.minFilter:1008,f.anisotropy=void 0!==a.anisotropy?
a.anisotropy:1,void 0!==a.format&&(f.format=a.format),void 0!==a.type&&(f.type=a.type),void 0!==a.mipmaps&&(f.mipmaps=a.mipmaps),1===a.mipmapCount&&(f.minFilter=1006),f.needsUpdate=!0,b&&b(f,a)},c,d);return f}});Object.assign(ad.prototype,{crossOrigin:"anonymous",load:function(a,b,c,d){function e(){k.removeEventListener("load",e,!1);k.removeEventListener("error",f,!1);Hb.add(a,this);b&&b(this);g.manager.itemEnd(a)}function f(b){k.removeEventListener("load",e,!1);k.removeEventListener("error",f,!1);
d&&d(b);g.manager.itemEnd(a);g.manager.itemError(a)}void 0===a&&(a="");void 0!==this.path&&(a=this.path+a);a=this.manager.resolveURL(a);var g=this,h=Hb.get(a);if(void 0!==h)return g.manager.itemStart(a),setTimeout(function(){b&&b(h);g.manager.itemEnd(a)},0),h;var k=document.createElementNS("http://www.w3.org/1999/xhtml","img");k.addEventListener("load",e,!1);k.addEventListener("error",f,!1);"data:"!==a.substr(0,5)&&void 0!==this.crossOrigin&&(k.crossOrigin=this.crossOrigin);g.manager.itemStart(a);
k.src=a;return k},setCrossOrigin:function(a){this.crossOrigin=a;return this},setPath:function(a){this.path=a;return this}});Object.assign(de.prototype,{crossOrigin:"anonymous",load:function(a,b,c,d){function e(c){g.load(a[c],function(a){f.images[c]=a;h++;6===h&&(f.needsUpdate=!0,b&&b(f))},void 0,d)}var f=new Wa,g=new ad(this.manager);g.setCrossOrigin(this.crossOrigin);g.setPath(this.path);var h=0;for(c=0;c<a.length;++c)e(c);return f},setCrossOrigin:function(a){this.crossOrigin=a;return this},setPath:function(a){this.path=
a;return this}});Object.assign(wd.prototype,{crossOrigin:"anonymous",load:function(a,b,c,d){var e=new T,f=new ad(this.manager);f.setCrossOrigin(this.crossOrigin);f.setPath(this.path);f.load(a,function(c){e.image=c;c=0<a.search(/\.jpe?g$/i)||0===a.search(/^data:image\/jpeg/);e.format=c?1022:1023;e.needsUpdate=!0;void 0!==b&&b(e)},c,d);return e},setCrossOrigin:function(a){this.crossOrigin=a;return this},setPath:function(a){this.path=a;return this}});Object.assign(L.prototype,{getPoint:function(){console.warn("THREE.Curve: .getPoint() not implemented.");
return null},getPointAt:function(a,b){a=this.getUtoTmapping(a);return this.getPoint(a,b)},getPoints:function(a){void 0===a&&(a=5);for(var b=[],c=0;c<=a;c++)b.push(this.getPoint(c/a));return b},getSpacedPoints:function(a){void 0===a&&(a=5);for(var b=[],c=0;c<=a;c++)b.push(this.getPointAt(c/a));return b},getLength:function(){var a=this.getLengths();return a[a.length-1]},getLengths:function(a){void 0===a&&(a=this.arcLengthDivisions);if(this.cacheArcLengths&&this.cacheArcLengths.length===a+1&&!this.needsUpdate)return this.cacheArcLengths;
this.needsUpdate=!1;var b=[],c=this.getPoint(0),d,e=0;b.push(0);for(d=1;d<=a;d++){var f=this.getPoint(d/a);e+=f.distanceTo(c);b.push(e);c=f}return this.cacheArcLengths=b},updateArcLengths:function(){this.needsUpdate=!0;this.getLengths()},getUtoTmapping:function(a,b){var c=this.getLengths(),d=c.length;b=b?b:a*c[d-1];for(var e=0,f=d-1,g;e<=f;)if(a=Math.floor(e+(f-e)/2),g=c[a]-b,0>g)e=a+1;else if(0<g)f=a-1;else{f=a;break}a=f;if(c[a]===b)return a/(d-1);e=c[a];return(a+(b-e)/(c[a+1]-e))/(d-1)},getTangent:function(a){var b=
a-1E-4;a+=1E-4;0>b&&(b=0);1<a&&(a=1);b=this.getPoint(b);return this.getPoint(a).clone().sub(b).normalize()},getTangentAt:function(a){a=this.getUtoTmapping(a);return this.getTangent(a)},computeFrenetFrames:function(a,b){var c=new p,d=[],e=[],f=[],g=new p,h=new J,k;for(k=0;k<=a;k++){var m=k/a;d[k]=this.getTangentAt(m);d[k].normalize()}e[0]=new p;f[0]=new p;k=Number.MAX_VALUE;m=Math.abs(d[0].x);var l=Math.abs(d[0].y),n=Math.abs(d[0].z);m<=k&&(k=m,c.set(1,0,0));l<=k&&(k=l,c.set(0,1,0));n<=k&&c.set(0,
0,1);g.crossVectors(d[0],c).normalize();e[0].crossVectors(d[0],g);f[0].crossVectors(d[0],e[0]);for(k=1;k<=a;k++)e[k]=e[k-1].clone(),f[k]=f[k-1].clone(),g.crossVectors(d[k-1],d[k]),g.length()>Number.EPSILON&&(g.normalize(),c=Math.acos(K.clamp(d[k-1].dot(d[k]),-1,1)),e[k].applyMatrix4(h.makeRotationAxis(g,c))),f[k].crossVectors(d[k],e[k]);if(!0===b)for(c=Math.acos(K.clamp(e[0].dot(e[a]),-1,1)),c/=a,0<d[0].dot(g.crossVectors(e[0],e[a]))&&(c=-c),k=1;k<=a;k++)e[k].applyMatrix4(h.makeRotationAxis(d[k],
c*k)),f[k].crossVectors(d[k],e[k]);return{tangents:d,normals:e,binormals:f}},clone:function(){return(new this.constructor).copy(this)},copy:function(a){this.arcLengthDivisions=a.arcLengthDivisions;return this},toJSON:function(){var a={metadata:{version:4.5,type:"Curve",generator:"Curve.toJSON"}};a.arcLengthDivisions=this.arcLengthDivisions;a.type=this.type;return a},fromJSON:function(a){this.arcLengthDivisions=a.arcLengthDivisions;return this}});Aa.prototype=Object.create(L.prototype);Aa.prototype.constructor=
Aa;Aa.prototype.isEllipseCurve=!0;Aa.prototype.getPoint=function(a,b){b=b||new z;for(var c=2*Math.PI,d=this.aEndAngle-this.aStartAngle,e=Math.abs(d)<Number.EPSILON;0>d;)d+=c;for(;d>c;)d-=c;d<Number.EPSILON&&(d=e?0:c);!0!==this.aClockwise||e||(d=d===c?-c:d-c);c=this.aStartAngle+a*d;a=this.aX+this.xRadius*Math.cos(c);var f=this.aY+this.yRadius*Math.sin(c);0!==this.aRotation&&(c=Math.cos(this.aRotation),d=Math.sin(this.aRotation),e=a-this.aX,f-=this.aY,a=e*c-f*d+this.aX,f=e*d+f*c+this.aY);return b.set(a,
f)};Aa.prototype.copy=function(a){L.prototype.copy.call(this,a);this.aX=a.aX;this.aY=a.aY;this.xRadius=a.xRadius;this.yRadius=a.yRadius;this.aStartAngle=a.aStartAngle;this.aEndAngle=a.aEndAngle;this.aClockwise=a.aClockwise;this.aRotation=a.aRotation;return this};Aa.prototype.toJSON=function(){var a=L.prototype.toJSON.call(this);a.aX=this.aX;a.aY=this.aY;a.xRadius=this.xRadius;a.yRadius=this.yRadius;a.aStartAngle=this.aStartAngle;a.aEndAngle=this.aEndAngle;a.aClockwise=this.aClockwise;a.aRotation=
this.aRotation;return a};Aa.prototype.fromJSON=function(a){L.prototype.fromJSON.call(this,a);this.aX=a.aX;this.aY=a.aY;this.xRadius=a.xRadius;this.yRadius=a.yRadius;this.aStartAngle=a.aStartAngle;this.aEndAngle=a.aEndAngle;this.aClockwise=a.aClockwise;this.aRotation=a.aRotation;return this};fc.prototype=Object.create(Aa.prototype);fc.prototype.constructor=fc;fc.prototype.isArcCurve=!0;var Pd=new p,ze=new ee,Ae=new ee,Be=new ee;ja.prototype=Object.create(L.prototype);ja.prototype.constructor=ja;ja.prototype.isCatmullRomCurve3=
!0;ja.prototype.getPoint=function(a,b){b=b||new p;var c=this.points,d=c.length;a*=d-(this.closed?0:1);var e=Math.floor(a);a-=e;this.closed?e+=0<e?0:(Math.floor(Math.abs(e)/d)+1)*d:0===a&&e===d-1&&(e=d-2,a=1);if(this.closed||0<e)var f=c[(e-1)%d];else Pd.subVectors(c[0],c[1]).add(c[0]),f=Pd;var g=c[e%d];var h=c[(e+1)%d];this.closed||e+2<d?c=c[(e+2)%d]:(Pd.subVectors(c[d-1],c[d-2]).add(c[d-1]),c=Pd);if("centripetal"===this.curveType||"chordal"===this.curveType){var k="chordal"===this.curveType?.5:.25;
d=Math.pow(f.distanceToSquared(g),k);e=Math.pow(g.distanceToSquared(h),k);k=Math.pow(h.distanceToSquared(c),k);1E-4>e&&(e=1);1E-4>d&&(d=e);1E-4>k&&(k=e);ze.initNonuniformCatmullRom(f.x,g.x,h.x,c.x,d,e,k);Ae.initNonuniformCatmullRom(f.y,g.y,h.y,c.y,d,e,k);Be.initNonuniformCatmullRom(f.z,g.z,h.z,c.z,d,e,k)}else"catmullrom"===this.curveType&&(ze.initCatmullRom(f.x,g.x,h.x,c.x,this.tension),Ae.initCatmullRom(f.y,g.y,h.y,c.y,this.tension),Be.initCatmullRom(f.z,g.z,h.z,c.z,this.tension));b.set(ze.calc(a),
Ae.calc(a),Be.calc(a));return b};ja.prototype.copy=function(a){L.prototype.copy.call(this,a);this.points=[];for(var b=0,c=a.points.length;b<c;b++)this.points.push(a.points[b].clone());this.closed=a.closed;this.curveType=a.curveType;this.tension=a.tension;return this};ja.prototype.toJSON=function(){var a=L.prototype.toJSON.call(this);a.points=[];for(var b=0,c=this.points.length;b<c;b++)a.points.push(this.points[b].toArray());a.closed=this.closed;a.curveType=this.curveType;a.tension=this.tension;return a};
ja.prototype.fromJSON=function(a){L.prototype.fromJSON.call(this,a);this.points=[];for(var b=0,c=a.points.length;b<c;b++){var d=a.points[b];this.points.push((new p).fromArray(d))}this.closed=a.closed;this.curveType=a.curveType;this.tension=a.tension;return this};Ia.prototype=Object.create(L.prototype);Ia.prototype.constructor=Ia;Ia.prototype.isCubicBezierCurve=!0;Ia.prototype.getPoint=function(a,b){b=b||new z;var c=this.v0,d=this.v1,e=this.v2,f=this.v3;b.set(cd(a,c.x,d.x,e.x,f.x),cd(a,c.y,d.y,e.y,
f.y));return b};Ia.prototype.copy=function(a){L.prototype.copy.call(this,a);this.v0.copy(a.v0);this.v1.copy(a.v1);this.v2.copy(a.v2);this.v3.copy(a.v3);return this};Ia.prototype.toJSON=function(){var a=L.prototype.toJSON.call(this);a.v0=this.v0.toArray();a.v1=this.v1.toArray();a.v2=this.v2.toArray();a.v3=this.v3.toArray();return a};Ia.prototype.fromJSON=function(a){L.prototype.fromJSON.call(this,a);this.v0.fromArray(a.v0);this.v1.fromArray(a.v1);this.v2.fromArray(a.v2);this.v3.fromArray(a.v3);return this};
Sa.prototype=Object.create(L.prototype);Sa.prototype.constructor=Sa;Sa.prototype.isCubicBezierCurve3=!0;Sa.prototype.getPoint=function(a,b){b=b||new p;var c=this.v0,d=this.v1,e=this.v2,f=this.v3;b.set(cd(a,c.x,d.x,e.x,f.x),cd(a,c.y,d.y,e.y,f.y),cd(a,c.z,d.z,e.z,f.z));return b};Sa.prototype.copy=function(a){L.prototype.copy.call(this,a);this.v0.copy(a.v0);this.v1.copy(a.v1);this.v2.copy(a.v2);this.v3.copy(a.v3);return this};Sa.prototype.toJSON=function(){var a=L.prototype.toJSON.call(this);a.v0=this.v0.toArray();
a.v1=this.v1.toArray();a.v2=this.v2.toArray();a.v3=this.v3.toArray();return a};Sa.prototype.fromJSON=function(a){L.prototype.fromJSON.call(this,a);this.v0.fromArray(a.v0);this.v1.fromArray(a.v1);this.v2.fromArray(a.v2);this.v3.fromArray(a.v3);return this};xa.prototype=Object.create(L.prototype);xa.prototype.constructor=xa;xa.prototype.isLineCurve=!0;xa.prototype.getPoint=function(a,b){b=b||new z;1===a?b.copy(this.v2):(b.copy(this.v2).sub(this.v1),b.multiplyScalar(a).add(this.v1));return b};xa.prototype.getPointAt=
function(a,b){return this.getPoint(a,b)};xa.prototype.getTangent=function(){return this.v2.clone().sub(this.v1).normalize()};xa.prototype.copy=function(a){L.prototype.copy.call(this,a);this.v1.copy(a.v1);this.v2.copy(a.v2);return this};xa.prototype.toJSON=function(){var a=L.prototype.toJSON.call(this);a.v1=this.v1.toArray();a.v2=this.v2.toArray();return a};xa.prototype.fromJSON=function(a){L.prototype.fromJSON.call(this,a);this.v1.fromArray(a.v1);this.v2.fromArray(a.v2);return this};Ja.prototype=
Object.create(L.prototype);Ja.prototype.constructor=Ja;Ja.prototype.isLineCurve3=!0;Ja.prototype.getPoint=function(a,b){b=b||new p;1===a?b.copy(this.v2):(b.copy(this.v2).sub(this.v1),b.multiplyScalar(a).add(this.v1));return b};Ja.prototype.getPointAt=function(a,b){return this.getPoint(a,b)};Ja.prototype.copy=function(a){L.prototype.copy.call(this,a);this.v1.copy(a.v1);this.v2.copy(a.v2);return this};Ja.prototype.toJSON=function(){var a=L.prototype.toJSON.call(this);a.v1=this.v1.toArray();a.v2=this.v2.toArray();
return a};Ja.prototype.fromJSON=function(a){L.prototype.fromJSON.call(this,a);this.v1.fromArray(a.v1);this.v2.fromArray(a.v2);return this};Ka.prototype=Object.create(L.prototype);Ka.prototype.constructor=Ka;Ka.prototype.isQuadraticBezierCurve=!0;Ka.prototype.getPoint=function(a,b){b=b||new z;var c=this.v0,d=this.v1,e=this.v2;b.set(bd(a,c.x,d.x,e.x),bd(a,c.y,d.y,e.y));return b};Ka.prototype.copy=function(a){L.prototype.copy.call(this,a);this.v0.copy(a.v0);this.v1.copy(a.v1);this.v2.copy(a.v2);return this};
Ka.prototype.toJSON=function(){var a=L.prototype.toJSON.call(this);a.v0=this.v0.toArray();a.v1=this.v1.toArray();a.v2=this.v2.toArray();return a};Ka.prototype.fromJSON=function(a){L.prototype.fromJSON.call(this,a);this.v0.fromArray(a.v0);this.v1.fromArray(a.v1);this.v2.fromArray(a.v2);return this};Ta.prototype=Object.create(L.prototype);Ta.prototype.constructor=Ta;Ta.prototype.isQuadraticBezierCurve3=!0;Ta.prototype.getPoint=function(a,b){b=b||new p;var c=this.v0,d=this.v1,e=this.v2;b.set(bd(a,c.x,
d.x,e.x),bd(a,c.y,d.y,e.y),bd(a,c.z,d.z,e.z));return b};Ta.prototype.copy=function(a){L.prototype.copy.call(this,a);this.v0.copy(a.v0);this.v1.copy(a.v1);this.v2.copy(a.v2);return this};Ta.prototype.toJSON=function(){var a=L.prototype.toJSON.call(this);a.v0=this.v0.toArray();a.v1=this.v1.toArray();a.v2=this.v2.toArray();return a};Ta.prototype.fromJSON=function(a){L.prototype.fromJSON.call(this,a);this.v0.fromArray(a.v0);this.v1.fromArray(a.v1);this.v2.fromArray(a.v2);return this};La.prototype=Object.create(L.prototype);
La.prototype.constructor=La;La.prototype.isSplineCurve=!0;La.prototype.getPoint=function(a,b){b=b||new z;var c=this.points,d=(c.length-1)*a;a=Math.floor(d);d-=a;var e=c[0===a?a:a-1],f=c[a],g=c[a>c.length-2?c.length-1:a+1];c=c[a>c.length-3?c.length-1:a+2];b.set(kf(d,e.x,f.x,g.x,c.x),kf(d,e.y,f.y,g.y,c.y));return b};La.prototype.copy=function(a){L.prototype.copy.call(this,a);this.points=[];for(var b=0,c=a.points.length;b<c;b++)this.points.push(a.points[b].clone());return this};La.prototype.toJSON=function(){var a=
L.prototype.toJSON.call(this);a.points=[];for(var b=0,c=this.points.length;b<c;b++)a.points.push(this.points[b].toArray());return a};La.prototype.fromJSON=function(a){L.prototype.fromJSON.call(this,a);this.points=[];for(var b=0,c=a.points.length;b<c;b++){var d=a.points[b];this.points.push((new z).fromArray(d))}return this};var zf=Object.freeze({ArcCurve:fc,CatmullRomCurve3:ja,CubicBezierCurve:Ia,CubicBezierCurve3:Sa,EllipseCurve:Aa,LineCurve:xa,LineCurve3:Ja,QuadraticBezierCurve:Ka,QuadraticBezierCurve3:Ta,
SplineCurve:La});Za.prototype=Object.assign(Object.create(L.prototype),{constructor:Za,add:function(a){this.curves.push(a)},closePath:function(){var a=this.curves[0].getPoint(0),b=this.curves[this.curves.length-1].getPoint(1);a.equals(b)||this.curves.push(new xa(b,a))},getPoint:function(a){var b=a*this.getLength(),c=this.getCurveLengths();for(a=0;a<c.length;){if(c[a]>=b)return b=c[a]-b,a=this.curves[a],c=a.getLength(),a.getPointAt(0===c?0:1-b/c);a++}return null},getLength:function(){var a=this.getCurveLengths();
return a[a.length-1]},updateArcLengths:function(){this.needsUpdate=!0;this.cacheLengths=null;this.getCurveLengths()},getCurveLengths:function(){if(this.cacheLengths&&this.cacheLengths.length===this.curves.length)return this.cacheLengths;for(var a=[],b=0,c=0,d=this.curves.length;c<d;c++)b+=this.curves[c].getLength(),a.push(b);return this.cacheLengths=a},getSpacedPoints:function(a){void 0===a&&(a=40);for(var b=[],c=0;c<=a;c++)b.push(this.getPoint(c/a));this.autoClose&&b.push(b[0]);return b},getPoints:function(a){a=
a||12;for(var b=[],c,d=0,e=this.curves;d<e.length;d++){var f=e[d];f=f.getPoints(f&&f.isEllipseCurve?2*a:f&&(f.isLineCurve||f.isLineCurve3)?1:f&&f.isSplineCurve?a*f.points.length:a);for(var g=0;g<f.length;g++){var h=f[g];c&&c.equals(h)||(b.push(h),c=h)}}this.autoClose&&1<b.length&&!b[b.length-1].equals(b[0])&&b.push(b[0]);return b},copy:function(a){L.prototype.copy.call(this,a);this.curves=[];for(var b=0,c=a.curves.length;b<c;b++)this.curves.push(a.curves[b].clone());this.autoClose=a.autoClose;return this},
toJSON:function(){var a=L.prototype.toJSON.call(this);a.autoClose=this.autoClose;a.curves=[];for(var b=0,c=this.curves.length;b<c;b++)a.curves.push(this.curves[b].toJSON());return a},fromJSON:function(a){L.prototype.fromJSON.call(this,a);this.autoClose=a.autoClose;this.curves=[];for(var b=0,c=a.curves.length;b<c;b++){var d=a.curves[b];this.curves.push((new zf[d.type]).fromJSON(d))}return this}});Ma.prototype=Object.assign(Object.create(Za.prototype),{constructor:Ma,setFromPoints:function(a){this.moveTo(a[0].x,
a[0].y);for(var b=1,c=a.length;b<c;b++)this.lineTo(a[b].x,a[b].y)},moveTo:function(a,b){this.currentPoint.set(a,b)},lineTo:function(a,b){var c=new xa(this.currentPoint.clone(),new z(a,b));this.curves.push(c);this.currentPoint.set(a,b)},quadraticCurveTo:function(a,b,c,d){a=new Ka(this.currentPoint.clone(),new z(a,b),new z(c,d));this.curves.push(a);this.currentPoint.set(c,d)},bezierCurveTo:function(a,b,c,d,e,f){a=new Ia(this.currentPoint.clone(),new z(a,b),new z(c,d),new z(e,f));this.curves.push(a);
this.currentPoint.set(e,f)},splineThru:function(a){var b=[this.currentPoint.clone()].concat(a);b=new La(b);this.curves.push(b);this.currentPoint.copy(a[a.length-1])},arc:function(a,b,c,d,e,f){this.absarc(a+this.currentPoint.x,b+this.currentPoint.y,c,d,e,f)},absarc:function(a,b,c,d,e,f){this.absellipse(a,b,c,c,d,e,f)},ellipse:function(a,b,c,d,e,f,g,h){this.absellipse(a+this.currentPoint.x,b+this.currentPoint.y,c,d,e,f,g,h)},absellipse:function(a,b,c,d,e,f,g,h){a=new Aa(a,b,c,d,e,f,g,h);0<this.curves.length&&
(b=a.getPoint(0),b.equals(this.currentPoint)||this.lineTo(b.x,b.y));this.curves.push(a);a=a.getPoint(1);this.currentPoint.copy(a)},copy:function(a){Za.prototype.copy.call(this,a);this.currentPoint.copy(a.currentPoint);return this},toJSON:function(){var a=Za.prototype.toJSON.call(this);a.currentPoint=this.currentPoint.toArray();return a},fromJSON:function(a){Za.prototype.fromJSON.call(this,a);this.currentPoint.fromArray(a.currentPoint);return this}});fb.prototype=Object.assign(Object.create(Ma.prototype),
{constructor:fb,getPointsHoles:function(a){for(var b=[],c=0,d=this.holes.length;c<d;c++)b[c]=this.holes[c].getPoints(a);return b},extractPoints:function(a){return{shape:this.getPoints(a),holes:this.getPointsHoles(a)}},copy:function(a){Ma.prototype.copy.call(this,a);this.holes=[];for(var b=0,c=a.holes.length;b<c;b++)this.holes.push(a.holes[b].clone());return this},toJSON:function(){var a=Ma.prototype.toJSON.call(this);a.uuid=this.uuid;a.holes=[];for(var b=0,c=this.holes.length;b<c;b++)a.holes.push(this.holes[b].toJSON());
return a},fromJSON:function(a){Ma.prototype.fromJSON.call(this,a);this.uuid=a.uuid;this.holes=[];for(var b=0,c=a.holes.length;b<c;b++){var d=a.holes[b];this.holes.push((new Ma).fromJSON(d))}return this}});fa.prototype=Object.assign(Object.create(B.prototype),{constructor:fa,isLight:!0,copy:function(a){B.prototype.copy.call(this,a);this.color.copy(a.color);this.intensity=a.intensity;return this},toJSON:function(a){a=B.prototype.toJSON.call(this,a);a.object.color=this.color.getHex();a.object.intensity=
this.intensity;void 0!==this.groundColor&&(a.object.groundColor=this.groundColor.getHex());void 0!==this.distance&&(a.object.distance=this.distance);void 0!==this.angle&&(a.object.angle=this.angle);void 0!==this.decay&&(a.object.decay=this.decay);void 0!==this.penumbra&&(a.object.penumbra=this.penumbra);void 0!==this.shadow&&(a.object.shadow=this.shadow.toJSON());return a}});xd.prototype=Object.assign(Object.create(fa.prototype),{constructor:xd,isHemisphereLight:!0,copy:function(a){fa.prototype.copy.call(this,
a);this.groundColor.copy(a.groundColor);return this}});Object.assign(Eb.prototype,{copy:function(a){this.camera=a.camera.clone();this.bias=a.bias;this.radius=a.radius;this.mapSize.copy(a.mapSize);return this},clone:function(){return(new this.constructor).copy(this)},toJSON:function(){var a={};0!==this.bias&&(a.bias=this.bias);1!==this.radius&&(a.radius=this.radius);if(512!==this.mapSize.x||512!==this.mapSize.y)a.mapSize=this.mapSize.toArray();a.camera=this.camera.toJSON(!1).object;delete a.camera.matrix;
return a}});yd.prototype=Object.assign(Object.create(Eb.prototype),{constructor:yd,isSpotLightShadow:!0,update:function(a){var b=this.camera,c=2*K.RAD2DEG*a.angle,d=this.mapSize.width/this.mapSize.height;a=a.distance||b.far;if(c!==b.fov||d!==b.aspect||a!==b.far)b.fov=c,b.aspect=d,b.far=a,b.updateProjectionMatrix()}});zd.prototype=Object.assign(Object.create(fa.prototype),{constructor:zd,isSpotLight:!0,copy:function(a){fa.prototype.copy.call(this,a);this.distance=a.distance;this.angle=a.angle;this.penumbra=
a.penumbra;this.decay=a.decay;this.target=a.target.clone();this.shadow=a.shadow.clone();return this}});Ad.prototype=Object.assign(Object.create(fa.prototype),{constructor:Ad,isPointLight:!0,copy:function(a){fa.prototype.copy.call(this,a);this.distance=a.distance;this.decay=a.decay;this.shadow=a.shadow.clone();return this}});Bd.prototype=Object.assign(Object.create(Eb.prototype),{constructor:Bd});Cd.prototype=Object.assign(Object.create(fa.prototype),{constructor:Cd,isDirectionalLight:!0,copy:function(a){fa.prototype.copy.call(this,
a);this.target=a.target.clone();this.shadow=a.shadow.clone();return this}});Dd.prototype=Object.assign(Object.create(fa.prototype),{constructor:Dd,isAmbientLight:!0});Ed.prototype=Object.assign(Object.create(fa.prototype),{constructor:Ed,isRectAreaLight:!0,copy:function(a){fa.prototype.copy.call(this,a);this.width=a.width;this.height=a.height;return this},toJSON:function(a){a=fa.prototype.toJSON.call(this,a);a.object.width=this.width;a.object.height=this.height;return a}});var qa={arraySlice:function(a,
b,c){return qa.isTypedArray(a)?new a.constructor(a.subarray(b,void 0!==c?c:a.length)):a.slice(b,c)},convertArray:function(a,b,c){return!a||!c&&a.constructor===b?a:"number"===typeof b.BYTES_PER_ELEMENT?new b(a):Array.prototype.slice.call(a)},isTypedArray:function(a){return ArrayBuffer.isView(a)&&!(a instanceof DataView)},getKeyframeOrder:function(a){for(var b=a.length,c=Array(b),d=0;d!==b;++d)c[d]=d;c.sort(function(b,c){return a[b]-a[c]});return c},sortedArray:function(a,b,c){for(var d=a.length,e=
new a.constructor(d),f=0,g=0;g!==d;++f)for(var h=c[f]*b,k=0;k!==b;++k)e[g++]=a[h+k];return e},flattenJSON:function(a,b,c,d){for(var e=1,f=a[0];void 0!==f&&void 0===f[d];)f=a[e++];if(void 0!==f){var g=f[d];if(void 0!==g)if(Array.isArray(g)){do g=f[d],void 0!==g&&(b.push(f.time),c.push.apply(c,g)),f=a[e++];while(void 0!==f)}else if(void 0!==g.toArray){do g=f[d],void 0!==g&&(b.push(f.time),g.toArray(c,c.length)),f=a[e++];while(void 0!==f)}else{do g=f[d],void 0!==g&&(b.push(f.time),c.push(g)),f=a[e++];
while(void 0!==f)}}}};Object.assign(ya.prototype,{evaluate:function(a){var b=this.parameterPositions,c=this._cachedIndex,d=b[c],e=b[c-1];a:{b:{c:{d:if(!(a<d)){for(var f=c+2;;){if(void 0===d){if(a<e)break d;this._cachedIndex=c=b.length;return this.afterEnd_(c-1,a,e)}if(c===f)break;e=d;d=b[++c];if(a<d)break b}d=b.length;break c}if(a>=e)break a;else{f=b[1];a<f&&(c=2,e=f);for(f=c-2;;){if(void 0===e)return this._cachedIndex=0,this.beforeStart_(0,a,d);if(c===f)break;d=e;e=b[--c-1];if(a>=e)break b}d=c;c=
0}}for(;c<d;)e=c+d>>>1,a<b[e]?d=e:c=e+1;d=b[c];e=b[c-1];if(void 0===e)return this._cachedIndex=0,this.beforeStart_(0,a,d);if(void 0===d)return this._cachedIndex=c=b.length,this.afterEnd_(c-1,e,a)}this._cachedIndex=c;this.intervalChanged_(c,e,d)}return this.interpolate_(c,e,a,d)},settings:null,DefaultSettings_:{},getSettings_:function(){return this.settings||this.DefaultSettings_},copySampleValue_:function(a){var b=this.resultBuffer,c=this.sampleValues,d=this.valueSize;a*=d;for(var e=0;e!==d;++e)b[e]=
c[a+e];return b},interpolate_:function(){throw Error("call to abstract method");},intervalChanged_:function(){}});Object.assign(ya.prototype,{beforeStart_:ya.prototype.copySampleValue_,afterEnd_:ya.prototype.copySampleValue_});Fd.prototype=Object.assign(Object.create(ya.prototype),{constructor:Fd,DefaultSettings_:{endingStart:2400,endingEnd:2400},intervalChanged_:function(a,b,c){var d=this.parameterPositions,e=a-2,f=a+1,g=d[e],h=d[f];if(void 0===g)switch(this.getSettings_().endingStart){case 2401:e=
a;g=2*b-c;break;case 2402:e=d.length-2;g=b+d[e]-d[e+1];break;default:e=a,g=c}if(void 0===h)switch(this.getSettings_().endingEnd){case 2401:f=a;h=2*c-b;break;case 2402:f=1;h=c+d[1]-d[0];break;default:f=a-1,h=b}a=.5*(c-b);d=this.valueSize;this._weightPrev=a/(b-g);this._weightNext=a/(h-c);this._offsetPrev=e*d;this._offsetNext=f*d},interpolate_:function(a,b,c,d){var e=this.resultBuffer,f=this.sampleValues,g=this.valueSize;a*=g;var h=a-g,k=this._offsetPrev,m=this._offsetNext,l=this._weightPrev,n=this._weightNext,
q=(c-b)/(d-b);c=q*q;d=c*q;b=-l*d+2*l*c-l*q;l=(1+l)*d+(-1.5-2*l)*c+(-.5+l)*q+1;q=(-1-n)*d+(1.5+n)*c+.5*q;n=n*d-n*c;for(c=0;c!==g;++c)e[c]=b*f[k+c]+l*f[h+c]+q*f[a+c]+n*f[m+c];return e}});dd.prototype=Object.assign(Object.create(ya.prototype),{constructor:dd,interpolate_:function(a,b,c,d){var e=this.resultBuffer,f=this.sampleValues,g=this.valueSize;a*=g;var h=a-g;b=(c-b)/(d-b);c=1-b;for(d=0;d!==g;++d)e[d]=f[h+d]*c+f[a+d]*b;return e}});Gd.prototype=Object.assign(Object.create(ya.prototype),{constructor:Gd,
interpolate_:function(a){return this.copySampleValue_(a-1)}});Object.assign(pa,{toJSON:function(a){var b=a.constructor;if(void 0!==b.toJSON)b=b.toJSON(a);else{b={name:a.name,times:qa.convertArray(a.times,Array),values:qa.convertArray(a.values,Array)};var c=a.getInterpolation();c!==a.DefaultInterpolation&&(b.interpolation=c)}b.type=a.ValueTypeName;return b}});Object.assign(pa.prototype,{constructor:pa,TimeBufferType:Float32Array,ValueBufferType:Float32Array,DefaultInterpolation:2301,InterpolantFactoryMethodDiscrete:function(a){return new Gd(this.times,
this.values,this.getValueSize(),a)},InterpolantFactoryMethodLinear:function(a){return new dd(this.times,this.values,this.getValueSize(),a)},InterpolantFactoryMethodSmooth:function(a){return new Fd(this.times,this.values,this.getValueSize(),a)},setInterpolation:function(a){switch(a){case 2300:var b=this.InterpolantFactoryMethodDiscrete;break;case 2301:b=this.InterpolantFactoryMethodLinear;break;case 2302:b=this.InterpolantFactoryMethodSmooth}if(void 0===b){b="unsupported interpolation for "+this.ValueTypeName+
" keyframe track named "+this.name;if(void 0===this.createInterpolant)if(a!==this.DefaultInterpolation)this.setInterpolation(this.DefaultInterpolation);else throw Error(b);console.warn("THREE.KeyframeTrack:",b);return this}this.createInterpolant=b;return this},getInterpolation:function(){switch(this.createInterpolant){case this.InterpolantFactoryMethodDiscrete:return 2300;case this.InterpolantFactoryMethodLinear:return 2301;case this.InterpolantFactoryMethodSmooth:return 2302}},getValueSize:function(){return this.values.length/
this.times.length},shift:function(a){if(0!==a)for(var b=this.times,c=0,d=b.length;c!==d;++c)b[c]+=a;return this},scale:function(a){if(1!==a)for(var b=this.times,c=0,d=b.length;c!==d;++c)b[c]*=a;return this},trim:function(a,b){for(var c=this.times,d=c.length,e=0,f=d-1;e!==d&&c[e]<a;)++e;for(;-1!==f&&c[f]>b;)--f;++f;if(0!==e||f!==d)e>=f&&(f=Math.max(f,1),e=f-1),a=this.getValueSize(),this.times=qa.arraySlice(c,e,f),this.values=qa.arraySlice(this.values,e*a,f*a);return this},validate:function(){var a=
!0,b=this.getValueSize();0!==b-Math.floor(b)&&(console.error("THREE.KeyframeTrack: Invalid value size in track.",this),a=!1);var c=this.times;b=this.values;var d=c.length;0===d&&(console.error("THREE.KeyframeTrack: Track is empty.",this),a=!1);for(var e=null,f=0;f!==d;f++){var g=c[f];if("number"===typeof g&&isNaN(g)){console.error("THREE.KeyframeTrack: Time is not a valid number.",this,f,g);a=!1;break}if(null!==e&&e>g){console.error("THREE.KeyframeTrack: Out of order keys.",this,f,g,e);a=!1;break}e=
g}if(void 0!==b&&qa.isTypedArray(b))for(f=0,c=b.length;f!==c;++f)if(d=b[f],isNaN(d)){console.error("THREE.KeyframeTrack: Value is not a valid number.",this,f,d);a=!1;break}return a},optimize:function(){for(var a=this.times,b=this.values,c=this.getValueSize(),d=2302===this.getInterpolation(),e=1,f=a.length-1,g=1;g<f;++g){var h=!1,k=a[g];if(k!==a[g+1]&&(1!==g||k!==k[0]))if(d)h=!0;else{var m=g*c,l=m-c,n=m+c;for(k=0;k!==c;++k){var q=b[m+k];if(q!==b[l+k]||q!==b[n+k]){h=!0;break}}}if(h){if(g!==e)for(a[e]=
a[g],h=g*c,m=e*c,k=0;k!==c;++k)b[m+k]=b[h+k];++e}}if(0<f){a[e]=a[f];h=f*c;m=e*c;for(k=0;k!==c;++k)b[m+k]=b[h+k];++e}e!==a.length&&(this.times=qa.arraySlice(a,0,e),this.values=qa.arraySlice(b,0,e*c));return this}});Hd.prototype=Object.assign(Object.create(pa.prototype),{constructor:Hd,ValueTypeName:"bool",ValueBufferType:Array,DefaultInterpolation:2300,InterpolantFactoryMethodLinear:void 0,InterpolantFactoryMethodSmooth:void 0});Id.prototype=Object.assign(Object.create(pa.prototype),{constructor:Id,
ValueTypeName:"color"});gc.prototype=Object.assign(Object.create(pa.prototype),{constructor:gc,ValueTypeName:"number"});Jd.prototype=Object.assign(Object.create(ya.prototype),{constructor:Jd,interpolate_:function(a,b,c,d){var e=this.resultBuffer,f=this.sampleValues,g=this.valueSize;a*=g;b=(c-b)/(d-b);for(c=a+g;a!==c;a+=4)ha.slerpFlat(e,0,f,a-g,f,a,b);return e}});ed.prototype=Object.assign(Object.create(pa.prototype),{constructor:ed,ValueTypeName:"quaternion",DefaultInterpolation:2301,InterpolantFactoryMethodLinear:function(a){return new Jd(this.times,
this.values,this.getValueSize(),a)},InterpolantFactoryMethodSmooth:void 0});Kd.prototype=Object.assign(Object.create(pa.prototype),{constructor:Kd,ValueTypeName:"string",ValueBufferType:Array,DefaultInterpolation:2300,InterpolantFactoryMethodLinear:void 0,InterpolantFactoryMethodSmooth:void 0});hc.prototype=Object.assign(Object.create(pa.prototype),{constructor:hc,ValueTypeName:"vector"});Object.assign(Da,{parse:function(a){for(var b=[],c=a.tracks,d=1/(a.fps||1),e=0,f=c.length;e!==f;++e)b.push(Rg(c[e]).scale(d));
return new Da(a.name,a.duration,b)},toJSON:function(a){var b=[],c=a.tracks;a={name:a.name,duration:a.duration,tracks:b,uuid:a.uuid};for(var d=0,e=c.length;d!==e;++d)b.push(pa.toJSON(c[d]));return a},CreateFromMorphTargetSequence:function(a,b,c,d){for(var e=b.length,f=[],g=0;g<e;g++){var h=[],k=[];h.push((g+e-1)%e,g,(g+1)%e);k.push(0,1,0);var m=qa.getKeyframeOrder(h);h=qa.sortedArray(h,1,m);k=qa.sortedArray(k,1,m);d||0!==h[0]||(h.push(e),k.push(k[0]));f.push((new gc(".morphTargetInfluences["+b[g].name+
"]",h,k)).scale(1/c))}return new Da(a,-1,f)},findByName:function(a,b){var c=a;Array.isArray(a)||(c=a.geometry&&a.geometry.animations||a.animations);for(a=0;a<c.length;a++)if(c[a].name===b)return c[a];return null},CreateClipsFromMorphTargetSequences:function(a,b,c){for(var d={},e=/^([\w-]*?)([\d]+)$/,f=0,g=a.length;f<g;f++){var h=a[f],k=h.name.match(e);if(k&&1<k.length){var m=k[1];(k=d[m])||(d[m]=k=[]);k.push(h)}}a=[];for(m in d)a.push(Da.CreateFromMorphTargetSequence(m,d[m],b,c));return a},parseAnimation:function(a,
b){if(!a)return console.error("THREE.AnimationClip: No animation in JSONLoader data."),null;var c=function(a,b,c,d,e){if(0!==c.length){var f=[],g=[];qa.flattenJSON(c,f,g,d);0!==f.length&&e.push(new a(b,f,g))}},d=[],e=a.name||"default",f=a.length||-1,g=a.fps||30;a=a.hierarchy||[];for(var h=0;h<a.length;h++){var k=a[h].keys;if(k&&0!==k.length)if(k[0].morphTargets){f={};for(var m=0;m<k.length;m++)if(k[m].morphTargets)for(var l=0;l<k[m].morphTargets.length;l++)f[k[m].morphTargets[l]]=-1;for(var n in f){var q=
[],p=[];for(l=0;l!==k[m].morphTargets.length;++l){var r=k[m];q.push(r.time);p.push(r.morphTarget===n?1:0)}d.push(new gc(".morphTargetInfluence["+n+"]",q,p))}f=f.length*(g||1)}else m=".bones["+b[h].name+"]",c(hc,m+".position",k,"pos",d),c(ed,m+".quaternion",k,"rot",d),c(hc,m+".scale",k,"scl",d)}return 0===d.length?null:new Da(e,f,d)}});Object.assign(Da.prototype,{resetDuration:function(){for(var a=0,b=0,c=this.tracks.length;b!==c;++b){var d=this.tracks[b];a=Math.max(a,d.times[d.times.length-1])}this.duration=
a;return this},trim:function(){for(var a=0;a<this.tracks.length;a++)this.tracks[a].trim(0,this.duration);return this},validate:function(){for(var a=!0,b=0;b<this.tracks.length;b++)a=a&&this.tracks[b].validate();return a},optimize:function(){for(var a=0;a<this.tracks.length;a++)this.tracks[a].optimize();return this}});Object.assign(Ld.prototype,{load:function(a,b,c,d){var e=this;(new Ha(e.manager)).load(a,function(a){b(e.parse(JSON.parse(a)))},c,d)},setTextures:function(a){this.textures=a},parse:function(a){function b(a){void 0===
c[a]&&console.warn("THREE.MaterialLoader: Undefined texture",a);return c[a]}var c=this.textures,d=new Ug[a.type];void 0!==a.uuid&&(d.uuid=a.uuid);void 0!==a.name&&(d.name=a.name);void 0!==a.color&&d.color.setHex(a.color);void 0!==a.roughness&&(d.roughness=a.roughness);void 0!==a.metalness&&(d.metalness=a.metalness);void 0!==a.emissive&&d.emissive.setHex(a.emissive);void 0!==a.specular&&d.specular.setHex(a.specular);void 0!==a.shininess&&(d.shininess=a.shininess);void 0!==a.clearCoat&&(d.clearCoat=
a.clearCoat);void 0!==a.clearCoatRoughness&&(d.clearCoatRoughness=a.clearCoatRoughness);void 0!==a.vertexColors&&(d.vertexColors=a.vertexColors);void 0!==a.fog&&(d.fog=a.fog);void 0!==a.flatShading&&(d.flatShading=a.flatShading);void 0!==a.blending&&(d.blending=a.blending);void 0!==a.side&&(d.side=a.side);void 0!==a.opacity&&(d.opacity=a.opacity);void 0!==a.transparent&&(d.transparent=a.transparent);void 0!==a.alphaTest&&(d.alphaTest=a.alphaTest);void 0!==a.depthTest&&(d.depthTest=a.depthTest);void 0!==
a.depthWrite&&(d.depthWrite=a.depthWrite);void 0!==a.colorWrite&&(d.colorWrite=a.colorWrite);void 0!==a.wireframe&&(d.wireframe=a.wireframe);void 0!==a.wireframeLinewidth&&(d.wireframeLinewidth=a.wireframeLinewidth);void 0!==a.wireframeLinecap&&(d.wireframeLinecap=a.wireframeLinecap);void 0!==a.wireframeLinejoin&&(d.wireframeLinejoin=a.wireframeLinejoin);void 0!==a.rotation&&(d.rotation=a.rotation);1!==a.linewidth&&(d.linewidth=a.linewidth);void 0!==a.dashSize&&(d.dashSize=a.dashSize);void 0!==a.gapSize&&
(d.gapSize=a.gapSize);void 0!==a.scale&&(d.scale=a.scale);void 0!==a.polygonOffset&&(d.polygonOffset=a.polygonOffset);void 0!==a.polygonOffsetFactor&&(d.polygonOffsetFactor=a.polygonOffsetFactor);void 0!==a.polygonOffsetUnits&&(d.polygonOffsetUnits=a.polygonOffsetUnits);void 0!==a.skinning&&(d.skinning=a.skinning);void 0!==a.morphTargets&&(d.morphTargets=a.morphTargets);void 0!==a.dithering&&(d.dithering=a.dithering);void 0!==a.visible&&(d.visible=a.visible);void 0!==a.userData&&(d.userData=a.userData);
if(void 0!==a.uniforms)for(var e in a.uniforms){var f=a.uniforms[e];d.uniforms[e]={};switch(f.type){case "t":d.uniforms[e].value=b(f.value);break;case "c":d.uniforms[e].value=(new F).setHex(f.value);break;case "v2":d.uniforms[e].value=(new z).fromArray(f.value);break;case "v3":d.uniforms[e].value=(new p).fromArray(f.value);break;case "v4":d.uniforms[e].value=(new aa).fromArray(f.value);break;case "m4":d.uniforms[e].value=(new J).fromArray(f.value);break;default:d.uniforms[e].value=f.value}}void 0!==
a.defines&&(d.defines=a.defines);void 0!==a.vertexShader&&(d.vertexShader=a.vertexShader);void 0!==a.fragmentShader&&(d.fragmentShader=a.fragmentShader);void 0!==a.shading&&(d.flatShading=1===a.shading);void 0!==a.size&&(d.size=a.size);void 0!==a.sizeAttenuation&&(d.sizeAttenuation=a.sizeAttenuation);void 0!==a.map&&(d.map=b(a.map));void 0!==a.alphaMap&&(d.alphaMap=b(a.alphaMap),d.transparent=!0);void 0!==a.bumpMap&&(d.bumpMap=b(a.bumpMap));void 0!==a.bumpScale&&(d.bumpScale=a.bumpScale);void 0!==
a.normalMap&&(d.normalMap=b(a.normalMap));void 0!==a.normalMapType&&(d.normalMapType=a.normalMapType);void 0!==a.normalScale&&(e=a.normalScale,!1===Array.isArray(e)&&(e=[e,e]),d.normalScale=(new z).fromArray(e));void 0!==a.displacementMap&&(d.displacementMap=b(a.displacementMap));void 0!==a.displacementScale&&(d.displacementScale=a.displacementScale);void 0!==a.displacementBias&&(d.displacementBias=a.displacementBias);void 0!==a.roughnessMap&&(d.roughnessMap=b(a.roughnessMap));void 0!==a.metalnessMap&&
(d.metalnessMap=b(a.metalnessMap));void 0!==a.emissiveMap&&(d.emissiveMap=b(a.emissiveMap));void 0!==a.emissiveIntensity&&(d.emissiveIntensity=a.emissiveIntensity);void 0!==a.specularMap&&(d.specularMap=b(a.specularMap));void 0!==a.envMap&&(d.envMap=b(a.envMap));void 0!==a.reflectivity&&(d.reflectivity=a.reflectivity);void 0!==a.lightMap&&(d.lightMap=b(a.lightMap));void 0!==a.lightMapIntensity&&(d.lightMapIntensity=a.lightMapIntensity);void 0!==a.aoMap&&(d.aoMap=b(a.aoMap));void 0!==a.aoMapIntensity&&
(d.aoMapIntensity=a.aoMapIntensity);void 0!==a.gradientMap&&(d.gradientMap=b(a.gradientMap));return d}});Object.assign(fe.prototype,{load:function(a,b,c,d){var e=this;(new Ha(e.manager)).load(a,function(a){b(e.parse(JSON.parse(a)))},c,d)},parse:function(a){var b=new I,c=a.data.index;void 0!==c&&(c=new Af[c.type](c.array),b.setIndex(new Q(c,1)));var d=a.data.attributes;for(f in d){var e=d[f];c=new Af[e.type](e.array);b.addAttribute(f,new Q(c,e.itemSize,e.normalized))}var f=a.data.groups||a.data.drawcalls||
a.data.offsets;if(void 0!==f)for(c=0,d=f.length;c!==d;++c)e=f[c],b.addGroup(e.start,e.count,e.materialIndex);a=a.data.boundingSphere;void 0!==a&&(f=new p,void 0!==a.center&&f.fromArray(a.center),b.boundingSphere=new Ea(f,a.radius));return b}});var Af={Int8Array:Int8Array,Uint8Array:Uint8Array,Uint8ClampedArray:"undefined"!==typeof Uint8ClampedArray?Uint8ClampedArray:Uint8Array,Int16Array:Int16Array,Uint16Array:Uint16Array,Int32Array:Int32Array,Uint32Array:Uint32Array,Float32Array:Float32Array,Float64Array:Float64Array};
ic.Handlers={handlers:[],add:function(a,b){this.handlers.push(a,b)},get:function(a){for(var b=this.handlers,c=0,d=b.length;c<d;c+=2){var e=b[c+1];if(b[c].test(a))return e}return null}};Object.assign(ic.prototype,{crossOrigin:"anonymous",onLoadStart:function(){},onLoadProgress:function(){},onLoadComplete:function(){},initMaterials:function(a,b,c){for(var d=[],e=0;e<a.length;++e)d[e]=this.createMaterial(a[e],b,c);return d},createMaterial:function(){var a={NoBlending:0,NormalBlending:1,AdditiveBlending:2,
SubtractiveBlending:3,MultiplyBlending:4,CustomBlending:5},b=new F,c=new wd,d=new Ld;return function(e,f,g){function h(a,b,d,e,h){a=f+a;var m=ic.Handlers.get(a);null!==m?a=m.load(a):(c.setCrossOrigin(g),a=c.load(a));void 0!==b&&(a.repeat.fromArray(b),1!==b[0]&&(a.wrapS=1E3),1!==b[1]&&(a.wrapT=1E3));void 0!==d&&a.offset.fromArray(d);void 0!==e&&("repeat"===e[0]&&(a.wrapS=1E3),"mirror"===e[0]&&(a.wrapS=1002),"repeat"===e[1]&&(a.wrapT=1E3),"mirror"===e[1]&&(a.wrapT=1002));void 0!==h&&(a.anisotropy=h);
b=K.generateUUID();k[b]=a;return b}var k={},m={uuid:K.generateUUID(),type:"MeshLambertMaterial"},l;for(l in e){var n=e[l];switch(l){case "DbgColor":case "DbgIndex":case "opticalDensity":case "illumination":break;case "DbgName":m.name=n;break;case "blending":m.blending=a[n];break;case "colorAmbient":case "mapAmbient":console.warn("THREE.Loader.createMaterial:",l,"is no longer supported.");break;case "colorDiffuse":m.color=b.fromArray(n).getHex();break;case "colorSpecular":m.specular=b.fromArray(n).getHex();
break;case "colorEmissive":m.emissive=b.fromArray(n).getHex();break;case "specularCoef":m.shininess=n;break;case "shading":"basic"===n.toLowerCase()&&(m.type="MeshBasicMaterial");"phong"===n.toLowerCase()&&(m.type="MeshPhongMaterial");"standard"===n.toLowerCase()&&(m.type="MeshStandardMaterial");break;case "mapDiffuse":m.map=h(n,e.mapDiffuseRepeat,e.mapDiffuseOffset,e.mapDiffuseWrap,e.mapDiffuseAnisotropy);break;case "mapDiffuseRepeat":case "mapDiffuseOffset":case "mapDiffuseWrap":case "mapDiffuseAnisotropy":break;
case "mapEmissive":m.emissiveMap=h(n,e.mapEmissiveRepeat,e.mapEmissiveOffset,e.mapEmissiveWrap,e.mapEmissiveAnisotropy);break;case "mapEmissiveRepeat":case "mapEmissiveOffset":case "mapEmissiveWrap":case "mapEmissiveAnisotropy":break;case "mapLight":m.lightMap=h(n,e.mapLightRepeat,e.mapLightOffset,e.mapLightWrap,e.mapLightAnisotropy);break;case "mapLightRepeat":case "mapLightOffset":case "mapLightWrap":case "mapLightAnisotropy":break;case "mapAO":m.aoMap=h(n,e.mapAORepeat,e.mapAOOffset,e.mapAOWrap,
e.mapAOAnisotropy);break;case "mapAORepeat":case "mapAOOffset":case "mapAOWrap":case "mapAOAnisotropy":break;case "mapBump":m.bumpMap=h(n,e.mapBumpRepeat,e.mapBumpOffset,e.mapBumpWrap,e.mapBumpAnisotropy);break;case "mapBumpScale":m.bumpScale=n;break;case "mapBumpRepeat":case "mapBumpOffset":case "mapBumpWrap":case "mapBumpAnisotropy":break;case "mapNormal":m.normalMap=h(n,e.mapNormalRepeat,e.mapNormalOffset,e.mapNormalWrap,e.mapNormalAnisotropy);break;case "mapNormalFactor":m.normalScale=n;break;
case "mapNormalRepeat":case "mapNormalOffset":case "mapNormalWrap":case "mapNormalAnisotropy":break;case "mapSpecular":m.specularMap=h(n,e.mapSpecularRepeat,e.mapSpecularOffset,e.mapSpecularWrap,e.mapSpecularAnisotropy);break;case "mapSpecularRepeat":case "mapSpecularOffset":case "mapSpecularWrap":case "mapSpecularAnisotropy":break;case "mapMetalness":m.metalnessMap=h(n,e.mapMetalnessRepeat,e.mapMetalnessOffset,e.mapMetalnessWrap,e.mapMetalnessAnisotropy);break;case "mapMetalnessRepeat":case "mapMetalnessOffset":case "mapMetalnessWrap":case "mapMetalnessAnisotropy":break;
case "mapRoughness":m.roughnessMap=h(n,e.mapRoughnessRepeat,e.mapRoughnessOffset,e.mapRoughnessWrap,e.mapRoughnessAnisotropy);break;case "mapRoughnessRepeat":case "mapRoughnessOffset":case "mapRoughnessWrap":case "mapRoughnessAnisotropy":break;case "mapAlpha":m.alphaMap=h(n,e.mapAlphaRepeat,e.mapAlphaOffset,e.mapAlphaWrap,e.mapAlphaAnisotropy);break;case "mapAlphaRepeat":case "mapAlphaOffset":case "mapAlphaWrap":case "mapAlphaAnisotropy":break;case "flipSided":m.side=1;break;case "doubleSided":m.side=
2;break;case "transparency":console.warn("THREE.Loader.createMaterial: transparency has been renamed to opacity");m.opacity=n;break;case "depthTest":case "depthWrite":case "colorWrite":case "opacity":case "reflectivity":case "transparent":case "visible":case "wireframe":m[l]=n;break;case "vertexColors":!0===n&&(m.vertexColors=2);"face"===n&&(m.vertexColors=1);break;default:console.error("THREE.Loader.createMaterial: Unsupported",l,n)}}"MeshBasicMaterial"===m.type&&delete m.emissive;"MeshPhongMaterial"!==
m.type&&delete m.specular;1>m.opacity&&(m.transparent=!0);d.setTextures(k);return d.parse(m)}}()});var Ce={decodeText:function(a){if("undefined"!==typeof TextDecoder)return(new TextDecoder).decode(a);for(var b="",c=0,d=a.length;c<d;c++)b+=String.fromCharCode(a[c]);return decodeURIComponent(escape(b))},extractUrlBase:function(a){var b=a.lastIndexOf("/");return-1===b?"./":a.substr(0,b+1)}};Object.assign(ge.prototype,{crossOrigin:"anonymous",load:function(a,b,c,d){var e=this,f=this.texturePath&&"string"===
typeof this.texturePath?this.texturePath:Ce.extractUrlBase(a),g=new Ha(this.manager);g.setWithCredentials(this.withCredentials);g.load(a,function(c){c=JSON.parse(c);var d=c.metadata;if(void 0!==d&&(d=d.type,void 0!==d&&"object"===d.toLowerCase())){console.error("THREE.JSONLoader: "+a+" should be loaded with THREE.ObjectLoader instead.");return}c=e.parse(c,f);b(c.geometry,c.materials)},c,d)},setCrossOrigin:function(a){this.crossOrigin=a;return this},setTexturePath:function(a){this.texturePath=a;return this},
parse:function(){return function(a,b){void 0!==a.data&&(a=a.data);a.scale=void 0!==a.scale?1/a.scale:1;var c=new M,d=a,e,f,g,h=d.faces;var k=d.vertices;var m=d.normals,l=d.colors;var n=d.scale;var q=0;if(void 0!==d.uvs){for(e=0;e<d.uvs.length;e++)d.uvs[e].length&&q++;for(e=0;e<q;e++)c.faceVertexUvs[e]=[]}var u=0;for(g=k.length;u<g;)e=new p,e.x=k[u++]*n,e.y=k[u++]*n,e.z=k[u++]*n,c.vertices.push(e);u=0;for(g=h.length;u<g;){k=h[u++];var r=k&1;var v=k&2;e=k&8;var y=k&16;var x=k&32;n=k&64;k&=128;if(r){r=
new Va;r.a=h[u];r.b=h[u+1];r.c=h[u+3];var w=new Va;w.a=h[u+1];w.b=h[u+2];w.c=h[u+3];u+=4;v&&(v=h[u++],r.materialIndex=v,w.materialIndex=v);v=c.faces.length;if(e)for(e=0;e<q;e++){var A=d.uvs[e];c.faceVertexUvs[e][v]=[];c.faceVertexUvs[e][v+1]=[];for(f=0;4>f;f++){var D=h[u++];var B=A[2*D];D=A[2*D+1];B=new z(B,D);2!==f&&c.faceVertexUvs[e][v].push(B);0!==f&&c.faceVertexUvs[e][v+1].push(B)}}y&&(y=3*h[u++],r.normal.set(m[y++],m[y++],m[y]),w.normal.copy(r.normal));if(x)for(e=0;4>e;e++)y=3*h[u++],x=new p(m[y++],
m[y++],m[y]),2!==e&&r.vertexNormals.push(x),0!==e&&w.vertexNormals.push(x);n&&(n=h[u++],n=l[n],r.color.setHex(n),w.color.setHex(n));if(k)for(e=0;4>e;e++)n=h[u++],n=l[n],2!==e&&r.vertexColors.push(new F(n)),0!==e&&w.vertexColors.push(new F(n));c.faces.push(r);c.faces.push(w)}else{r=new Va;r.a=h[u++];r.b=h[u++];r.c=h[u++];v&&(v=h[u++],r.materialIndex=v);v=c.faces.length;if(e)for(e=0;e<q;e++)for(A=d.uvs[e],c.faceVertexUvs[e][v]=[],f=0;3>f;f++)D=h[u++],B=A[2*D],D=A[2*D+1],B=new z(B,D),c.faceVertexUvs[e][v].push(B);
y&&(y=3*h[u++],r.normal.set(m[y++],m[y++],m[y]));if(x)for(e=0;3>e;e++)y=3*h[u++],x=new p(m[y++],m[y++],m[y]),r.vertexNormals.push(x);n&&(n=h[u++],r.color.setHex(l[n]));if(k)for(e=0;3>e;e++)n=h[u++],r.vertexColors.push(new F(l[n]));c.faces.push(r)}}d=a;u=void 0!==d.influencesPerVertex?d.influencesPerVertex:2;if(d.skinWeights)for(g=0,h=d.skinWeights.length;g<h;g+=u)c.skinWeights.push(new aa(d.skinWeights[g],1<u?d.skinWeights[g+1]:0,2<u?d.skinWeights[g+2]:0,3<u?d.skinWeights[g+3]:0));if(d.skinIndices)for(g=
0,h=d.skinIndices.length;g<h;g+=u)c.skinIndices.push(new aa(d.skinIndices[g],1<u?d.skinIndices[g+1]:0,2<u?d.skinIndices[g+2]:0,3<u?d.skinIndices[g+3]:0));c.bones=d.bones;c.bones&&0<c.bones.length&&(c.skinWeights.length!==c.skinIndices.length||c.skinIndices.length!==c.vertices.length)&&console.warn("When skinning, number of vertices ("+c.vertices.length+"), skinIndices ("+c.skinIndices.length+"), and skinWeights ("+c.skinWeights.length+") should match.");g=a;h=g.scale;if(void 0!==g.morphTargets)for(d=
0,u=g.morphTargets.length;d<u;d++)for(c.morphTargets[d]={},c.morphTargets[d].name=g.morphTargets[d].name,c.morphTargets[d].vertices=[],m=c.morphTargets[d].vertices,l=g.morphTargets[d].vertices,q=0,k=l.length;q<k;q+=3)n=new p,n.x=l[q]*h,n.y=l[q+1]*h,n.z=l[q+2]*h,m.push(n);if(void 0!==g.morphColors&&0<g.morphColors.length)for(console.warn('THREE.JSONLoader: "morphColors" no longer supported. Using them as face colors.'),h=c.faces,g=g.morphColors[0].colors,d=0,u=h.length;d<u;d++)h[d].color.fromArray(g,
3*d);g=a;d=[];u=[];void 0!==g.animation&&u.push(g.animation);void 0!==g.animations&&(g.animations.length?u=u.concat(g.animations):u.push(g.animations));for(g=0;g<u.length;g++)(h=Da.parseAnimation(u[g],c.bones))&&d.push(h);c.morphTargets&&(u=Da.CreateClipsFromMorphTargetSequences(c.morphTargets,10),d=d.concat(u));0<d.length&&(c.animations=d);c.computeFaceNormals();c.computeBoundingSphere();if(void 0===a.materials||0===a.materials.length)return{geometry:c};a=ic.prototype.initMaterials(a.materials,b,
this.crossOrigin);return{geometry:c,materials:a}}}()});Object.assign(lf.prototype,{crossOrigin:"anonymous",load:function(a,b,c,d){""===this.texturePath&&(this.texturePath=a.substring(0,a.lastIndexOf("/")+1));var e=this;(new Ha(e.manager)).load(a,function(c){var f=null;try{f=JSON.parse(c)}catch(h){void 0!==d&&d(h);console.error("THREE:ObjectLoader: Can't parse "+a+".",h.message);return}c=f.metadata;void 0===c||void 0===c.type||"geometry"===c.type.toLowerCase()?console.error("THREE.ObjectLoader: Can't load "+
a+". Use THREE.JSONLoader instead."):e.parse(f,b)},c,d)},setTexturePath:function(a){this.texturePath=a;return this},setCrossOrigin:function(a){this.crossOrigin=a;return this},parse:function(a,b){var c=this.parseShape(a.shapes);c=this.parseGeometries(a.geometries,c);var d=this.parseImages(a.images,function(){void 0!==b&&b(e)});d=this.parseTextures(a.textures,d);d=this.parseMaterials(a.materials,d);var e=this.parseObject(a.object,c,d);a.animations&&(e.animations=this.parseAnimations(a.animations));
void 0!==a.images&&0!==a.images.length||void 0===b||b(e);return e},parseShape:function(a){var b={};if(void 0!==a)for(var c=0,d=a.length;c<d;c++){var e=(new fb).fromJSON(a[c]);b[e.uuid]=e}return b},parseGeometries:function(a,b){var c={};if(void 0!==a)for(var d=new ge,e=new fe,f=0,g=a.length;f<g;f++){var h=a[f];switch(h.type){case "PlaneGeometry":case "PlaneBufferGeometry":var k=new za[h.type](h.width,h.height,h.widthSegments,h.heightSegments);break;case "BoxGeometry":case "BoxBufferGeometry":case "CubeGeometry":k=
new za[h.type](h.width,h.height,h.depth,h.widthSegments,h.heightSegments,h.depthSegments);break;case "CircleGeometry":case "CircleBufferGeometry":k=new za[h.type](h.radius,h.segments,h.thetaStart,h.thetaLength);break;case "CylinderGeometry":case "CylinderBufferGeometry":k=new za[h.type](h.radiusTop,h.radiusBottom,h.height,h.radialSegments,h.heightSegments,h.openEnded,h.thetaStart,h.thetaLength);break;case "ConeGeometry":case "ConeBufferGeometry":k=new za[h.type](h.radius,h.height,h.radialSegments,
h.heightSegments,h.openEnded,h.thetaStart,h.thetaLength);break;case "SphereGeometry":case "SphereBufferGeometry":k=new za[h.type](h.radius,h.widthSegments,h.heightSegments,h.phiStart,h.phiLength,h.thetaStart,h.thetaLength);break;case "DodecahedronGeometry":case "DodecahedronBufferGeometry":case "IcosahedronGeometry":case "IcosahedronBufferGeometry":case "OctahedronGeometry":case "OctahedronBufferGeometry":case "TetrahedronGeometry":case "TetrahedronBufferGeometry":k=new za[h.type](h.radius,h.detail);
break;case "RingGeometry":case "RingBufferGeometry":k=new za[h.type](h.innerRadius,h.outerRadius,h.thetaSegments,h.phiSegments,h.thetaStart,h.thetaLength);break;case "TorusGeometry":case "TorusBufferGeometry":k=new za[h.type](h.radius,h.tube,h.radialSegments,h.tubularSegments,h.arc);break;case "TorusKnotGeometry":case "TorusKnotBufferGeometry":k=new za[h.type](h.radius,h.tube,h.tubularSegments,h.radialSegments,h.p,h.q);break;case "LatheGeometry":case "LatheBufferGeometry":k=new za[h.type](h.points,
h.segments,h.phiStart,h.phiLength);break;case "PolyhedronGeometry":case "PolyhedronBufferGeometry":k=new za[h.type](h.vertices,h.indices,h.radius,h.details);break;case "ShapeGeometry":case "ShapeBufferGeometry":k=[];for(var m=0,l=h.shapes.length;m<l;m++){var n=b[h.shapes[m]];k.push(n)}k=new za[h.type](k,h.curveSegments);break;case "ExtrudeGeometry":case "ExtrudeBufferGeometry":k=[];m=0;for(l=h.shapes.length;m<l;m++)n=b[h.shapes[m]],k.push(n);m=h.options.extrudePath;void 0!==m&&(h.options.extrudePath=
(new zf[m.type]).fromJSON(m));k=new za[h.type](k,h.options);break;case "BufferGeometry":k=e.parse(h);break;case "Geometry":k=d.parse(h,this.texturePath).geometry;break;default:console.warn('THREE.ObjectLoader: Unsupported geometry type "'+h.type+'"');continue}k.uuid=h.uuid;void 0!==h.name&&(k.name=h.name);!0===k.isBufferGeometry&&void 0!==h.userData&&(k.userData=h.userData);c[h.uuid]=k}return c},parseMaterials:function(a,b){var c={};if(void 0!==a){var d=new Ld;d.setTextures(b);b=0;for(var e=a.length;b<
e;b++){var f=a[b];if("MultiMaterial"===f.type){for(var g=[],h=0;h<f.materials.length;h++)g.push(d.parse(f.materials[h]));c[f.uuid]=g}else c[f.uuid]=d.parse(f)}}return c},parseAnimations:function(a){for(var b=[],c=0;c<a.length;c++){var d=a[c],e=Da.parse(d);void 0!==d.uuid&&(e.uuid=d.uuid);b.push(e)}return b},parseImages:function(a,b){function c(a){d.manager.itemStart(a);return f.load(a,function(){d.manager.itemEnd(a)},void 0,function(){d.manager.itemEnd(a);d.manager.itemError(a)})}var d=this,e={};
if(void 0!==a&&0<a.length){b=new be(b);var f=new ad(b);f.setCrossOrigin(this.crossOrigin);b=0;for(var g=a.length;b<g;b++){var h=a[b],k=h.url;if(Array.isArray(k)){e[h.uuid]=[];for(var m=0,l=k.length;m<l;m++){var n=k[m];n=/^(\/\/)|([a-z]+:(\/\/)?)/i.test(n)?n:d.texturePath+n;e[h.uuid].push(c(n))}}else n=/^(\/\/)|([a-z]+:(\/\/)?)/i.test(h.url)?h.url:d.texturePath+h.url,e[h.uuid]=c(n)}}return e},parseTextures:function(a,b){function c(a,b){if("number"===typeof a)return a;console.warn("THREE.ObjectLoader.parseTexture: Constant should be in numeric form.",
a);return b[a]}var d={};if(void 0!==a)for(var e=0,f=a.length;e<f;e++){var g=a[e];void 0===g.image&&console.warn('THREE.ObjectLoader: No "image" specified for',g.uuid);void 0===b[g.image]&&console.warn("THREE.ObjectLoader: Undefined image",g.image);var h=Array.isArray(b[g.image])?new Wa(b[g.image]):new T(b[g.image]);h.needsUpdate=!0;h.uuid=g.uuid;void 0!==g.name&&(h.name=g.name);void 0!==g.mapping&&(h.mapping=c(g.mapping,Vg));void 0!==g.offset&&h.offset.fromArray(g.offset);void 0!==g.repeat&&h.repeat.fromArray(g.repeat);
void 0!==g.center&&h.center.fromArray(g.center);void 0!==g.rotation&&(h.rotation=g.rotation);void 0!==g.wrap&&(h.wrapS=c(g.wrap[0],Bf),h.wrapT=c(g.wrap[1],Bf));void 0!==g.format&&(h.format=g.format);void 0!==g.minFilter&&(h.minFilter=c(g.minFilter,Cf));void 0!==g.magFilter&&(h.magFilter=c(g.magFilter,Cf));void 0!==g.anisotropy&&(h.anisotropy=g.anisotropy);void 0!==g.flipY&&(h.flipY=g.flipY);d[g.uuid]=h}return d},parseObject:function(a,b,c){function d(a){void 0===b[a]&&console.warn("THREE.ObjectLoader: Undefined geometry",
a);return b[a]}function e(a){if(void 0!==a){if(Array.isArray(a)){for(var b=[],d=0,e=a.length;d<e;d++){var f=a[d];void 0===c[f]&&console.warn("THREE.ObjectLoader: Undefined material",f);b.push(c[f])}return b}void 0===c[a]&&console.warn("THREE.ObjectLoader: Undefined material",a);return c[a]}}switch(a.type){case "Scene":var f=new rd;void 0!==a.background&&Number.isInteger(a.background)&&(f.background=new F(a.background));void 0!==a.fog&&("Fog"===a.fog.type?f.fog=new Ob(a.fog.color,a.fog.near,a.fog.far):
"FogExp2"===a.fog.type&&(f.fog=new Nb(a.fog.color,a.fog.density)));break;case "PerspectiveCamera":f=new X(a.fov,a.aspect,a.near,a.far);void 0!==a.focus&&(f.focus=a.focus);void 0!==a.zoom&&(f.zoom=a.zoom);void 0!==a.filmGauge&&(f.filmGauge=a.filmGauge);void 0!==a.filmOffset&&(f.filmOffset=a.filmOffset);void 0!==a.view&&(f.view=Object.assign({},a.view));break;case "OrthographicCamera":f=new Jb(a.left,a.right,a.top,a.bottom,a.near,a.far);void 0!==a.zoom&&(f.zoom=a.zoom);void 0!==a.view&&(f.view=Object.assign({},
a.view));break;case "AmbientLight":f=new Dd(a.color,a.intensity);break;case "DirectionalLight":f=new Cd(a.color,a.intensity);break;case "PointLight":f=new Ad(a.color,a.intensity,a.distance,a.decay);break;case "RectAreaLight":f=new Ed(a.color,a.intensity,a.width,a.height);break;case "SpotLight":f=new zd(a.color,a.intensity,a.distance,a.angle,a.penumbra,a.decay);break;case "HemisphereLight":f=new xd(a.color,a.groundColor,a.intensity);break;case "SkinnedMesh":console.warn("THREE.ObjectLoader.parseObject() does not support SkinnedMesh yet.");
case "Mesh":f=d(a.geometry);var g=e(a.material);f=f.bones&&0<f.bones.length?new td(f,g):new ta(f,g);break;case "LOD":f=new Dc;break;case "Line":f=new oa(d(a.geometry),e(a.material),a.mode);break;case "LineLoop":f=new ud(d(a.geometry),e(a.material));break;case "LineSegments":f=new Z(d(a.geometry),e(a.material));break;case "PointCloud":case "Points":f=new Qb(d(a.geometry),e(a.material));break;case "Sprite":f=new Cc(e(a.material));break;case "Group":f=new Mb;break;default:f=new B}f.uuid=a.uuid;void 0!==
a.name&&(f.name=a.name);void 0!==a.matrix?(f.matrix.fromArray(a.matrix),void 0!==a.matrixAutoUpdate&&(f.matrixAutoUpdate=a.matrixAutoUpdate),f.matrixAutoUpdate&&f.matrix.decompose(f.position,f.quaternion,f.scale)):(void 0!==a.position&&f.position.fromArray(a.position),void 0!==a.rotation&&f.rotation.fromArray(a.rotation),void 0!==a.quaternion&&f.quaternion.fromArray(a.quaternion),void 0!==a.scale&&f.scale.fromArray(a.scale));void 0!==a.castShadow&&(f.castShadow=a.castShadow);void 0!==a.receiveShadow&&
(f.receiveShadow=a.receiveShadow);a.shadow&&(void 0!==a.shadow.bias&&(f.shadow.bias=a.shadow.bias),void 0!==a.shadow.radius&&(f.shadow.radius=a.shadow.radius),void 0!==a.shadow.mapSize&&f.shadow.mapSize.fromArray(a.shadow.mapSize),void 0!==a.shadow.camera&&(f.shadow.camera=this.parseObject(a.shadow.camera)));void 0!==a.visible&&(f.visible=a.visible);void 0!==a.frustumCulled&&(f.frustumCulled=a.frustumCulled);void 0!==a.renderOrder&&(f.renderOrder=a.renderOrder);void 0!==a.userData&&(f.userData=a.userData);
void 0!==a.layers&&(f.layers.mask=a.layers);if(void 0!==a.children){g=a.children;for(var h=0;h<g.length;h++)f.add(this.parseObject(g[h],b,c))}if("LOD"===a.type)for(a=a.levels,g=0;g<a.length;g++){h=a[g];var k=f.getObjectByProperty("uuid",h.object);void 0!==k&&f.addLevel(k,h.distance)}return f}});var Vg={UVMapping:300,CubeReflectionMapping:301,CubeRefractionMapping:302,EquirectangularReflectionMapping:303,EquirectangularRefractionMapping:304,SphericalReflectionMapping:305,CubeUVReflectionMapping:306,
CubeUVRefractionMapping:307},Bf={RepeatWrapping:1E3,ClampToEdgeWrapping:1001,MirroredRepeatWrapping:1002},Cf={NearestFilter:1003,NearestMipMapNearestFilter:1004,NearestMipMapLinearFilter:1005,LinearFilter:1006,LinearMipMapNearestFilter:1007,LinearMipMapLinearFilter:1008};he.prototype={constructor:he,setOptions:function(a){this.options=a;return this},load:function(a,b,c,d){void 0===a&&(a="");void 0!==this.path&&(a=this.path+a);a=this.manager.resolveURL(a);var e=this,f=Hb.get(a);if(void 0!==f)return e.manager.itemStart(a),
setTimeout(function(){b&&b(f);e.manager.itemEnd(a)},0),f;fetch(a).then(function(a){return a.blob()}).then(function(a){return createImageBitmap(a,e.options)}).then(function(c){Hb.add(a,c);b&&b(c);e.manager.itemEnd(a)}).catch(function(b){d&&d(b);e.manager.itemEnd(a);e.manager.itemError(a)})},setCrossOrigin:function(){return this},setPath:function(a){this.path=a;return this}};Object.assign(ie.prototype,{moveTo:function(a,b){this.currentPath=new Ma;this.subPaths.push(this.currentPath);this.currentPath.moveTo(a,
b)},lineTo:function(a,b){this.currentPath.lineTo(a,b)},quadraticCurveTo:function(a,b,c,d){this.currentPath.quadraticCurveTo(a,b,c,d)},bezierCurveTo:function(a,b,c,d,e,f){this.currentPath.bezierCurveTo(a,b,c,d,e,f)},splineThru:function(a){this.currentPath.splineThru(a)},toShapes:function(a,b){function c(a){for(var b=[],c=0,d=a.length;c<d;c++){var e=a[c],f=new fb;f.curves=e.curves;b.push(f)}return b}function d(a,b){for(var c=b.length,d=!1,e=c-1,f=0;f<c;e=f++){var g=b[e],h=b[f],k=h.x-g.x,m=h.y-g.y;if(Math.abs(m)>
Number.EPSILON){if(0>m&&(g=b[f],k=-k,h=b[e],m=-m),!(a.y<g.y||a.y>h.y))if(a.y===g.y){if(a.x===g.x)return!0}else{e=m*(a.x-g.x)-k*(a.y-g.y);if(0===e)return!0;0>e||(d=!d)}}else if(a.y===g.y&&(h.x<=a.x&&a.x<=g.x||g.x<=a.x&&a.x<=h.x))return!0}return d}var e=Xa.isClockWise,f=this.subPaths;if(0===f.length)return[];if(!0===b)return c(f);b=[];if(1===f.length){var g=f[0];var h=new fb;h.curves=g.curves;b.push(h);return b}var k=!e(f[0].getPoints());k=a?!k:k;h=[];var m=[],l=[],n=0;m[n]=void 0;l[n]=[];for(var p=
0,u=f.length;p<u;p++){g=f[p];var r=g.getPoints();var v=e(r);(v=a?!v:v)?(!k&&m[n]&&n++,m[n]={s:new fb,p:r},m[n].s.curves=g.curves,k&&n++,l[n]=[]):l[n].push({h:g,p:r[0]})}if(!m[0])return c(f);if(1<m.length){p=!1;a=[];e=0;for(f=m.length;e<f;e++)h[e]=[];e=0;for(f=m.length;e<f;e++)for(g=l[e],v=0;v<g.length;v++){k=g[v];n=!0;for(r=0;r<m.length;r++)d(k.p,m[r].p)&&(e!==r&&a.push({froms:e,tos:r,hole:v}),n?(n=!1,h[r].push(k)):p=!0);n&&h[e].push(k)}0<a.length&&(p||(l=h))}p=0;for(e=m.length;p<e;p++)for(h=m[p].s,
b.push(h),a=l[p],f=0,g=a.length;f<g;f++)h.holes.push(a[f].h);return b}});Object.assign(je.prototype,{isFont:!0,generateShapes:function(a,b){void 0===b&&(b=100);var c=[],d=b;b=this.data;var e=Array.from?Array.from(a):String(a).split("");d/=b.resolution;var f=(b.boundingBox.yMax-b.boundingBox.yMin+b.underlineThickness)*d;a=[];for(var g=0,h=0,k=0;k<e.length;k++){var m=e[k];if("\n"===m)g=0,h-=f;else{var l=d;var n=g,p=h;if(m=b.glyphs[m]||b.glyphs["?"]){var u=new ie;if(m.o)for(var r=m._cachedOutline||(m._cachedOutline=
m.o.split(" ")),v=0,y=r.length;v<y;)switch(r[v++]){case "m":var x=r[v++]*l+n;var w=r[v++]*l+p;u.moveTo(x,w);break;case "l":x=r[v++]*l+n;w=r[v++]*l+p;u.lineTo(x,w);break;case "q":var z=r[v++]*l+n;var A=r[v++]*l+p;var B=r[v++]*l+n;var F=r[v++]*l+p;u.quadraticCurveTo(B,F,z,A);break;case "b":z=r[v++]*l+n,A=r[v++]*l+p,B=r[v++]*l+n,F=r[v++]*l+p,x=r[v++]*l+n,w=r[v++]*l+p,u.bezierCurveTo(B,F,x,w,z,A)}l={offsetX:m.ha*l,path:u}}else l=void 0;g+=l.offsetX;a.push(l.path)}}b=0;for(e=a.length;b<e;b++)Array.prototype.push.apply(c,
a[b].toShapes());return c}});Object.assign(mf.prototype,{load:function(a,b,c,d){var e=this,f=new Ha(this.manager);f.setPath(this.path);f.load(a,function(a){try{var c=JSON.parse(a)}catch(k){console.warn("THREE.FontLoader: typeface.js support is being deprecated. Use typeface.json instead."),c=JSON.parse(a.substring(65,a.length-2))}a=e.parse(c);b&&b(a)},c,d)},parse:function(a){return new je(a)},setPath:function(a){this.path=a;return this}});var Qd,me={getContext:function(){void 0===Qd&&(Qd=new (window.AudioContext||
window.webkitAudioContext));return Qd},setContext:function(a){Qd=a}};Object.assign(ke.prototype,{load:function(a,b,c,d){var e=new Ha(this.manager);e.setResponseType("arraybuffer");e.load(a,function(a){a=a.slice(0);me.getContext().decodeAudioData(a,function(a){b(a)})},c,d)}});Object.assign(nf.prototype,{update:function(){var a,b,c,d,e,f,g,h,k=new J,m=new J;return function(l){if(a!==this||b!==l.focus||c!==l.fov||d!==l.aspect*this.aspect||e!==l.near||f!==l.far||g!==l.zoom||h!==this.eyeSep){a=this;b=
l.focus;c=l.fov;d=l.aspect*this.aspect;e=l.near;f=l.far;g=l.zoom;var n=l.projectionMatrix.clone();h=this.eyeSep/2;var p=h*e/b,t=e*Math.tan(K.DEG2RAD*c*.5)/g;m.elements[12]=-h;k.elements[12]=h;var r=-t*d+p;var v=t*d+p;n.elements[0]=2*e/(v-r);n.elements[8]=(v+r)/(v-r);this.cameraL.projectionMatrix.copy(n);r=-t*d-p;v=t*d-p;n.elements[0]=2*e/(v-r);n.elements[8]=(v+r)/(v-r);this.cameraR.projectionMatrix.copy(n)}this.cameraL.matrixWorld.copy(l.matrixWorld).multiply(m);this.cameraR.matrixWorld.copy(l.matrixWorld).multiply(k)}}()});
fd.prototype=Object.create(B.prototype);fd.prototype.constructor=fd;le.prototype=Object.assign(Object.create(B.prototype),{constructor:le,getInput:function(){return this.gain},removeFilter:function(){null!==this.filter&&(this.gain.disconnect(this.filter),this.filter.disconnect(this.context.destination),this.gain.connect(this.context.destination),this.filter=null);return this},getFilter:function(){return this.filter},setFilter:function(a){null!==this.filter?(this.gain.disconnect(this.filter),this.filter.disconnect(this.context.destination)):
this.gain.disconnect(this.context.destination);this.filter=a;this.gain.connect(this.filter);this.filter.connect(this.context.destination);return this},getMasterVolume:function(){return this.gain.gain.value},setMasterVolume:function(a){this.gain.gain.setTargetAtTime(a,this.context.currentTime,.01);return this},updateMatrixWorld:function(){var a=new p,b=new ha,c=new p,d=new p;return function(e){B.prototype.updateMatrixWorld.call(this,e);e=this.context.listener;var f=this.up;this.matrixWorld.decompose(a,
b,c);d.set(0,0,-1).applyQuaternion(b);e.positionX?(e.positionX.setValueAtTime(a.x,this.context.currentTime),e.positionY.setValueAtTime(a.y,this.context.currentTime),e.positionZ.setValueAtTime(a.z,this.context.currentTime),e.forwardX.setValueAtTime(d.x,this.context.currentTime),e.forwardY.setValueAtTime(d.y,this.context.currentTime),e.forwardZ.setValueAtTime(d.z,this.context.currentTime),e.upX.setValueAtTime(f.x,this.context.currentTime),e.upY.setValueAtTime(f.y,this.context.currentTime),e.upZ.setValueAtTime(f.z,
this.context.currentTime)):(e.setPosition(a.x,a.y,a.z),e.setOrientation(d.x,d.y,d.z,f.x,f.y,f.z))}}()});jc.prototype=Object.assign(Object.create(B.prototype),{constructor:jc,getOutput:function(){return this.gain},setNodeSource:function(a){this.hasPlaybackControl=!1;this.sourceType="audioNode";this.source=a;this.connect();return this},setMediaElementSource:function(a){this.hasPlaybackControl=!1;this.sourceType="mediaNode";this.source=this.context.createMediaElementSource(a);this.connect();return this},
setBuffer:function(a){this.buffer=a;this.sourceType="buffer";this.autoplay&&this.play();return this},play:function(){if(!0===this.isPlaying)console.warn("THREE.Audio: Audio is already playing.");else if(!1===this.hasPlaybackControl)console.warn("THREE.Audio: this Audio has no playback control.");else{var a=this.context.createBufferSource();a.buffer=this.buffer;a.loop=this.loop;a.onended=this.onEnded.bind(this);a.playbackRate.setValueAtTime(this.playbackRate,this.startTime);this.startTime=this.context.currentTime;
a.start(this.startTime,this.offset);this.isPlaying=!0;this.source=a;return this.connect()}},pause:function(){if(!1===this.hasPlaybackControl)console.warn("THREE.Audio: this Audio has no playback control.");else return!0===this.isPlaying&&(this.source.stop(),this.source.onended=null,this.offset+=(this.context.currentTime-this.startTime)*this.playbackRate,this.isPlaying=!1),this},stop:function(){if(!1===this.hasPlaybackControl)console.warn("THREE.Audio: this Audio has no playback control.");else return this.source.stop(),
this.source.onended=null,this.offset=0,this.isPlaying=!1,this},connect:function(){if(0<this.filters.length){this.source.connect(this.filters[0]);for(var a=1,b=this.filters.length;a<b;a++)this.filters[a-1].connect(this.filters[a]);this.filters[this.filters.length-1].connect(this.getOutput())}else this.source.connect(this.getOutput());return this},disconnect:function(){if(0<this.filters.length){this.source.disconnect(this.filters[0]);for(var a=1,b=this.filters.length;a<b;a++)this.filters[a-1].disconnect(this.filters[a]);
this.filters[this.filters.length-1].disconnect(this.getOutput())}else this.source.disconnect(this.getOutput());return this},getFilters:function(){return this.filters},setFilters:function(a){a||(a=[]);!0===this.isPlaying?(this.disconnect(),this.filters=a,this.connect()):this.filters=a;return this},getFilter:function(){return this.getFilters()[0]},setFilter:function(a){return this.setFilters(a?[a]:[])},setPlaybackRate:function(a){if(!1===this.hasPlaybackControl)console.warn("THREE.Audio: this Audio has no playback control.");
else return this.playbackRate=a,!0===this.isPlaying&&this.source.playbackRate.setValueAtTime(this.playbackRate,this.context.currentTime),this},getPlaybackRate:function(){return this.playbackRate},onEnded:function(){this.isPlaying=!1},getLoop:function(){return!1===this.hasPlaybackControl?(console.warn("THREE.Audio: this Audio has no playback control."),!1):this.loop},setLoop:function(a){if(!1===this.hasPlaybackControl)console.warn("THREE.Audio: this Audio has no playback control.");else return this.loop=
a,!0===this.isPlaying&&(this.source.loop=this.loop),this},getVolume:function(){return this.gain.gain.value},setVolume:function(a){this.gain.gain.setTargetAtTime(a,this.context.currentTime,.01);return this}});ne.prototype=Object.assign(Object.create(jc.prototype),{constructor:ne,getOutput:function(){return this.panner},getRefDistance:function(){return this.panner.refDistance},setRefDistance:function(a){this.panner.refDistance=a;return this},getRolloffFactor:function(){return this.panner.rolloffFactor},
setRolloffFactor:function(a){this.panner.rolloffFactor=a;return this},getDistanceModel:function(){return this.panner.distanceModel},setDistanceModel:function(a){this.panner.distanceModel=a;return this},getMaxDistance:function(){return this.panner.maxDistance},setMaxDistance:function(a){this.panner.maxDistance=a;return this},setDirectionalCone:function(a,b,c){this.panner.coneInnerAngle=a;this.panner.coneOuterAngle=b;this.panner.coneOuterGain=c;return this},updateMatrixWorld:function(){var a=new p,
b=new ha,c=new p,d=new p;return function(e){B.prototype.updateMatrixWorld.call(this,e);e=this.panner;this.matrixWorld.decompose(a,b,c);d.set(0,0,1).applyQuaternion(b);e.setPosition(a.x,a.y,a.z);e.setOrientation(d.x,d.y,d.z)}}()});Object.assign(oe.prototype,{getFrequencyData:function(){this.analyser.getByteFrequencyData(this.data);return this.data},getAverageFrequency:function(){for(var a=0,b=this.getFrequencyData(),c=0;c<b.length;c++)a+=b[c];return a/b.length}});Object.assign(pe.prototype,{accumulate:function(a,
b){var c=this.buffer,d=this.valueSize;a=a*d+d;var e=this.cumulativeWeight;if(0===e){for(e=0;e!==d;++e)c[a+e]=c[e];e=b}else e+=b,this._mixBufferRegion(c,a,0,b/e,d);this.cumulativeWeight=e},apply:function(a){var b=this.valueSize,c=this.buffer;a=a*b+b;var d=this.cumulativeWeight,e=this.binding;this.cumulativeWeight=0;1>d&&this._mixBufferRegion(c,a,3*b,1-d,b);d=b;for(var f=b+b;d!==f;++d)if(c[d]!==c[d+b]){e.setValue(c,a);break}},saveOriginalState:function(){var a=this.buffer,b=this.valueSize,c=3*b;this.binding.getValue(a,
c);for(var d=b;d!==c;++d)a[d]=a[c+d%b];this.cumulativeWeight=0},restoreOriginalState:function(){this.binding.setValue(this.buffer,3*this.valueSize)},_select:function(a,b,c,d,e){if(.5<=d)for(d=0;d!==e;++d)a[b+d]=a[c+d]},_slerp:function(a,b,c,d){ha.slerpFlat(a,b,a,b,a,c,d)},_lerp:function(a,b,c,d,e){for(var f=1-d,g=0;g!==e;++g){var h=b+g;a[h]=a[h]*f+a[c+g]*d}}});Object.assign(of.prototype,{getValue:function(a,b){this.bind();var c=this._bindings[this._targetGroup.nCachedObjects_];void 0!==c&&c.getValue(a,
b)},setValue:function(a,b){for(var c=this._bindings,d=this._targetGroup.nCachedObjects_,e=c.length;d!==e;++d)c[d].setValue(a,b)},bind:function(){for(var a=this._bindings,b=this._targetGroup.nCachedObjects_,c=a.length;b!==c;++b)a[b].bind()},unbind:function(){for(var a=this._bindings,b=this._targetGroup.nCachedObjects_,c=a.length;b!==c;++b)a[b].unbind()}});Object.assign(sa,{Composite:of,create:function(a,b,c){return a&&a.isAnimationObjectGroup?new sa.Composite(a,b,c):new sa(a,b,c)},sanitizeNodeName:function(){var a=
/[\[\]\.:\/]/g;return function(b){return b.replace(/\s/g,"_").replace(a,"")}}(),parseTrackName:function(){var a="[^"+"\\[\\]\\.:\\/".replace("\\.","")+"]",b=/((?:WC+[\/:])*)/.source.replace("WC","[^\\[\\]\\.:\\/]");a=/(WCOD+)?/.source.replace("WCOD",a);var c=/(?:\.(WC+)(?:\[(.+)\])?)?/.source.replace("WC","[^\\[\\]\\.:\\/]"),d=/\.(WC+)(?:\[(.+)\])?/.source.replace("WC","[^\\[\\]\\.:\\/]"),e=new RegExp("^"+b+a+c+d+"$"),f=["material","materials","bones"];return function(a){var b=e.exec(a);if(!b)throw Error("PropertyBinding: Cannot parse trackName: "+
a);b={nodeName:b[2],objectName:b[3],objectIndex:b[4],propertyName:b[5],propertyIndex:b[6]};var c=b.nodeName&&b.nodeName.lastIndexOf(".");if(void 0!==c&&-1!==c){var d=b.nodeName.substring(c+1);-1!==f.indexOf(d)&&(b.nodeName=b.nodeName.substring(0,c),b.objectName=d)}if(null===b.propertyName||0===b.propertyName.length)throw Error("PropertyBinding: can not parse propertyName from trackName: "+a);return b}}(),findNode:function(a,b){if(!b||""===b||"root"===b||"."===b||-1===b||b===a.name||b===a.uuid)return a;
if(a.skeleton){var c=a.skeleton.getBoneByName(b);if(void 0!==c)return c}if(a.children){var d=function(a){for(var c=0;c<a.length;c++){var e=a[c];if(e.name===b||e.uuid===b||(e=d(e.children)))return e}return null};if(a=d(a.children))return a}return null}});Object.assign(sa.prototype,{_getValue_unavailable:function(){},_setValue_unavailable:function(){},BindingType:{Direct:0,EntireArray:1,ArrayElement:2,HasFromToArray:3},Versioning:{None:0,NeedsUpdate:1,MatrixWorldNeedsUpdate:2},GetterByBindingType:[function(a,
b){a[b]=this.node[this.propertyName]},function(a,b){for(var c=this.resolvedProperty,d=0,e=c.length;d!==e;++d)a[b++]=c[d]},function(a,b){a[b]=this.resolvedProperty[this.propertyIndex]},function(a,b){this.resolvedProperty.toArray(a,b)}],SetterByBindingTypeAndVersioning:[[function(a,b){this.targetObject[this.propertyName]=a[b]},function(a,b){this.targetObject[this.propertyName]=a[b];this.targetObject.needsUpdate=!0},function(a,b){this.targetObject[this.propertyName]=a[b];this.targetObject.matrixWorldNeedsUpdate=
!0}],[function(a,b){for(var c=this.resolvedProperty,d=0,e=c.length;d!==e;++d)c[d]=a[b++]},function(a,b){for(var c=this.resolvedProperty,d=0,e=c.length;d!==e;++d)c[d]=a[b++];this.targetObject.needsUpdate=!0},function(a,b){for(var c=this.resolvedProperty,d=0,e=c.length;d!==e;++d)c[d]=a[b++];this.targetObject.matrixWorldNeedsUpdate=!0}],[function(a,b){this.resolvedProperty[this.propertyIndex]=a[b]},function(a,b){this.resolvedProperty[this.propertyIndex]=a[b];this.targetObject.needsUpdate=!0},function(a,
b){this.resolvedProperty[this.propertyIndex]=a[b];this.targetObject.matrixWorldNeedsUpdate=!0}],[function(a,b){this.resolvedProperty.fromArray(a,b)},function(a,b){this.resolvedProperty.fromArray(a,b);this.targetObject.needsUpdate=!0},function(a,b){this.resolvedProperty.fromArray(a,b);this.targetObject.matrixWorldNeedsUpdate=!0}]],getValue:function(a,b){this.bind();this.getValue(a,b)},setValue:function(a,b){this.bind();this.setValue(a,b)},bind:function(){var a=this.node,b=this.parsedPath,c=b.objectName,
d=b.propertyName,e=b.propertyIndex;a||(this.node=a=sa.findNode(this.rootNode,b.nodeName)||this.rootNode);this.getValue=this._getValue_unavailable;this.setValue=this._setValue_unavailable;if(a){if(c){var f=b.objectIndex;switch(c){case "materials":if(!a.material){console.error("THREE.PropertyBinding: Can not bind to material as node does not have a material.",this);return}if(!a.material.materials){console.error("THREE.PropertyBinding: Can not bind to material.materials as node.material does not have a materials array.",
this);return}a=a.material.materials;break;case "bones":if(!a.skeleton){console.error("THREE.PropertyBinding: Can not bind to bones as node does not have a skeleton.",this);return}a=a.skeleton.bones;for(c=0;c<a.length;c++)if(a[c].name===f){f=c;break}break;default:if(void 0===a[c]){console.error("THREE.PropertyBinding: Can not bind to objectName of node undefined.",this);return}a=a[c]}if(void 0!==f){if(void 0===a[f]){console.error("THREE.PropertyBinding: Trying to bind to objectIndex of objectName, but is undefined.",
this,a);return}a=a[f]}}f=a[d];if(void 0===f)console.error("THREE.PropertyBinding: Trying to update property for track: "+b.nodeName+"."+d+" but it wasn't found.",a);else{b=this.Versioning.None;this.targetObject=a;void 0!==a.needsUpdate?b=this.Versioning.NeedsUpdate:void 0!==a.matrixWorldNeedsUpdate&&(b=this.Versioning.MatrixWorldNeedsUpdate);c=this.BindingType.Direct;if(void 0!==e){if("morphTargetInfluences"===d){if(!a.geometry){console.error("THREE.PropertyBinding: Can not bind to morphTargetInfluences because node does not have a geometry.",
this);return}if(a.geometry.isBufferGeometry){if(!a.geometry.morphAttributes){console.error("THREE.PropertyBinding: Can not bind to morphTargetInfluences because node does not have a geometry.morphAttributes.",this);return}for(c=0;c<this.node.geometry.morphAttributes.position.length;c++)if(a.geometry.morphAttributes.position[c].name===e){e=c;break}}else{if(!a.geometry.morphTargets){console.error("THREE.PropertyBinding: Can not bind to morphTargetInfluences because node does not have a geometry.morphTargets.",
this);return}for(c=0;c<this.node.geometry.morphTargets.length;c++)if(a.geometry.morphTargets[c].name===e){e=c;break}}}c=this.BindingType.ArrayElement;this.resolvedProperty=f;this.propertyIndex=e}else void 0!==f.fromArray&&void 0!==f.toArray?(c=this.BindingType.HasFromToArray,this.resolvedProperty=f):Array.isArray(f)?(c=this.BindingType.EntireArray,this.resolvedProperty=f):this.propertyName=d;this.getValue=this.GetterByBindingType[c];this.setValue=this.SetterByBindingTypeAndVersioning[c][b]}}else console.error("THREE.PropertyBinding: Trying to update node for track: "+
this.path+" but it wasn't found.")},unbind:function(){this.node=null;this.getValue=this._getValue_unbound;this.setValue=this._setValue_unbound}});Object.assign(sa.prototype,{_getValue_unbound:sa.prototype.getValue,_setValue_unbound:sa.prototype.setValue});Object.assign(pf.prototype,{isAnimationObjectGroup:!0,add:function(){for(var a=this._objects,b=a.length,c=this.nCachedObjects_,d=this._indicesByUUID,e=this._paths,f=this._parsedPaths,g=this._bindings,h=g.length,k=void 0,m=0,l=arguments.length;m!==
l;++m){var n=arguments[m],p=n.uuid,u=d[p];if(void 0===u){u=b++;d[p]=u;a.push(n);p=0;for(var r=h;p!==r;++p)g[p].push(new sa(n,e[p],f[p]))}else if(u<c){k=a[u];var v=--c;r=a[v];d[r.uuid]=u;a[u]=r;d[p]=v;a[v]=n;p=0;for(r=h;p!==r;++p){var y=g[p],x=y[u];y[u]=y[v];void 0===x&&(x=new sa(n,e[p],f[p]));y[v]=x}}else a[u]!==k&&console.error("THREE.AnimationObjectGroup: Different objects with the same UUID detected. Clean the caches or recreate your infrastructure when reloading scenes.")}this.nCachedObjects_=
c},remove:function(){for(var a=this._objects,b=this.nCachedObjects_,c=this._indicesByUUID,d=this._bindings,e=d.length,f=0,g=arguments.length;f!==g;++f){var h=arguments[f],k=h.uuid,m=c[k];if(void 0!==m&&m>=b){var l=b++,n=a[l];c[n.uuid]=m;a[m]=n;c[k]=l;a[l]=h;h=0;for(k=e;h!==k;++h){n=d[h];var p=n[m];n[m]=n[l];n[l]=p}}}this.nCachedObjects_=b},uncache:function(){for(var a=this._objects,b=a.length,c=this.nCachedObjects_,d=this._indicesByUUID,e=this._bindings,f=e.length,g=0,h=arguments.length;g!==h;++g){var k=
arguments[g].uuid,l=d[k];if(void 0!==l)if(delete d[k],l<c){k=--c;var p=a[k],n=--b,q=a[n];d[p.uuid]=l;a[l]=p;d[q.uuid]=k;a[k]=q;a.pop();p=0;for(q=f;p!==q;++p){var u=e[p],r=u[n];u[l]=u[k];u[k]=r;u.pop()}}else for(n=--b,q=a[n],d[q.uuid]=l,a[l]=q,a.pop(),p=0,q=f;p!==q;++p)u=e[p],u[l]=u[n],u.pop()}this.nCachedObjects_=c},subscribe_:function(a,b){var c=this._bindingsIndicesByPath,d=c[a],e=this._bindings;if(void 0!==d)return e[d];var f=this._paths,g=this._parsedPaths,h=this._objects,k=this.nCachedObjects_,
l=Array(h.length);d=e.length;c[a]=d;f.push(a);g.push(b);e.push(l);c=k;for(d=h.length;c!==d;++c)l[c]=new sa(h[c],a,b);return l},unsubscribe_:function(a){var b=this._bindingsIndicesByPath,c=b[a];if(void 0!==c){var d=this._paths,e=this._parsedPaths,f=this._bindings,g=f.length-1,h=f[g];b[a[g]]=c;f[c]=h;f.pop();e[c]=e[g];e.pop();d[c]=d[g];d.pop()}}});Object.assign(qf.prototype,{play:function(){this._mixer._activateAction(this);return this},stop:function(){this._mixer._deactivateAction(this);return this.reset()},
reset:function(){this.paused=!1;this.enabled=!0;this.time=0;this._loopCount=-1;this._startTime=null;return this.stopFading().stopWarping()},isRunning:function(){return this.enabled&&!this.paused&&0!==this.timeScale&&null===this._startTime&&this._mixer._isActiveAction(this)},isScheduled:function(){return this._mixer._isActiveAction(this)},startAt:function(a){this._startTime=a;return this},setLoop:function(a,b){this.loop=a;this.repetitions=b;return this},setEffectiveWeight:function(a){this.weight=a;
this._effectiveWeight=this.enabled?a:0;return this.stopFading()},getEffectiveWeight:function(){return this._effectiveWeight},fadeIn:function(a){return this._scheduleFading(a,0,1)},fadeOut:function(a){return this._scheduleFading(a,1,0)},crossFadeFrom:function(a,b,c){a.fadeOut(b);this.fadeIn(b);if(c){c=this._clip.duration;var d=a._clip.duration,e=c/d;a.warp(1,d/c,b);this.warp(e,1,b)}return this},crossFadeTo:function(a,b,c){return a.crossFadeFrom(this,b,c)},stopFading:function(){var a=this._weightInterpolant;
null!==a&&(this._weightInterpolant=null,this._mixer._takeBackControlInterpolant(a));return this},setEffectiveTimeScale:function(a){this.timeScale=a;this._effectiveTimeScale=this.paused?0:a;return this.stopWarping()},getEffectiveTimeScale:function(){return this._effectiveTimeScale},setDuration:function(a){this.timeScale=this._clip.duration/a;return this.stopWarping()},syncWith:function(a){this.time=a.time;this.timeScale=a.timeScale;return this.stopWarping()},halt:function(a){return this.warp(this._effectiveTimeScale,
0,a)},warp:function(a,b,c){var d=this._mixer,e=d.time,f=this._timeScaleInterpolant,g=this.timeScale;null===f&&(this._timeScaleInterpolant=f=d._lendControlInterpolant());d=f.parameterPositions;f=f.sampleValues;d[0]=e;d[1]=e+c;f[0]=a/g;f[1]=b/g;return this},stopWarping:function(){var a=this._timeScaleInterpolant;null!==a&&(this._timeScaleInterpolant=null,this._mixer._takeBackControlInterpolant(a));return this},getMixer:function(){return this._mixer},getClip:function(){return this._clip},getRoot:function(){return this._localRoot||
this._mixer._root},_update:function(a,b,c,d){if(this.enabled){var e=this._startTime;if(null!==e){b=(a-e)*c;if(0>b||0===c)return;this._startTime=null;b*=c}b*=this._updateTimeScale(a);c=this._updateTime(b);a=this._updateWeight(a);if(0<a){b=this._interpolants;e=this._propertyBindings;for(var f=0,g=b.length;f!==g;++f)b[f].evaluate(c),e[f].accumulate(d,a)}}else this._updateWeight(a)},_updateWeight:function(a){var b=0;if(this.enabled){b=this.weight;var c=this._weightInterpolant;if(null!==c){var d=c.evaluate(a)[0];
b*=d;a>c.parameterPositions[1]&&(this.stopFading(),0===d&&(this.enabled=!1))}}return this._effectiveWeight=b},_updateTimeScale:function(a){var b=0;if(!this.paused){b=this.timeScale;var c=this._timeScaleInterpolant;if(null!==c){var d=c.evaluate(a)[0];b*=d;a>c.parameterPositions[1]&&(this.stopWarping(),0===b?this.paused=!0:this.timeScale=b)}}return this._effectiveTimeScale=b},_updateTime:function(a){var b=this.time+a,c=this._clip.duration,d=this.loop,e=this._loopCount,f=2202===d;if(0===a)return-1===
e?b:f&&1===(e&1)?c-b:b;if(2200===d)a:{if(-1===e&&(this._loopCount=0,this._setEndings(!0,!0,!1)),b>=c)b=c;else if(0>b)b=0;else break a;this.clampWhenFinished?this.paused=!0:this.enabled=!1;this._mixer.dispatchEvent({type:"finished",action:this,direction:0>a?-1:1})}else{-1===e&&(0<=a?(e=0,this._setEndings(!0,0===this.repetitions,f)):this._setEndings(0===this.repetitions,!0,f));if(b>=c||0>b){d=Math.floor(b/c);b-=c*d;e+=Math.abs(d);var g=this.repetitions-e;0>=g?(this.clampWhenFinished?this.paused=!0:
this.enabled=!1,b=0<a?c:0,this._mixer.dispatchEvent({type:"finished",action:this,direction:0<a?1:-1})):(1===g?(a=0>a,this._setEndings(a,!a,f)):this._setEndings(!1,!1,f),this._loopCount=e,this._mixer.dispatchEvent({type:"loop",action:this,loopDelta:d}))}if(f&&1===(e&1))return this.time=b,c-b}return this.time=b},_setEndings:function(a,b,c){var d=this._interpolantSettings;c?(d.endingStart=2401,d.endingEnd=2401):(d.endingStart=a?this.zeroSlopeAtStart?2401:2400:2402,d.endingEnd=b?this.zeroSlopeAtEnd?2401:
2400:2402)},_scheduleFading:function(a,b,c){var d=this._mixer,e=d.time,f=this._weightInterpolant;null===f&&(this._weightInterpolant=f=d._lendControlInterpolant());d=f.parameterPositions;f=f.sampleValues;d[0]=e;f[0]=b;d[1]=e+a;f[1]=c;return this}});qe.prototype=Object.assign(Object.create(ea.prototype),{constructor:qe,_bindAction:function(a,b){var c=a._localRoot||this._root,d=a._clip.tracks,e=d.length,f=a._propertyBindings;a=a._interpolants;var g=c.uuid,h=this._bindingsByRootAndName,k=h[g];void 0===
k&&(k={},h[g]=k);for(h=0;h!==e;++h){var l=d[h],p=l.name,n=k[p];if(void 0===n){n=f[h];if(void 0!==n){null===n._cacheIndex&&(++n.referenceCount,this._addInactiveBinding(n,g,p));continue}n=new pe(sa.create(c,p,b&&b._propertyBindings[h].binding.parsedPath),l.ValueTypeName,l.getValueSize());++n.referenceCount;this._addInactiveBinding(n,g,p)}f[h]=n;a[h].resultBuffer=n.buffer}},_activateAction:function(a){if(!this._isActiveAction(a)){if(null===a._cacheIndex){var b=(a._localRoot||this._root).uuid,c=a._clip.uuid,
d=this._actionsByClip[c];this._bindAction(a,d&&d.knownActions[0]);this._addInactiveAction(a,c,b)}b=a._propertyBindings;c=0;for(d=b.length;c!==d;++c){var e=b[c];0===e.useCount++&&(this._lendBinding(e),e.saveOriginalState())}this._lendAction(a)}},_deactivateAction:function(a){if(this._isActiveAction(a)){for(var b=a._propertyBindings,c=0,d=b.length;c!==d;++c){var e=b[c];0===--e.useCount&&(e.restoreOriginalState(),this._takeBackBinding(e))}this._takeBackAction(a)}},_initMemoryManager:function(){this._actions=
[];this._nActiveActions=0;this._actionsByClip={};this._bindings=[];this._nActiveBindings=0;this._bindingsByRootAndName={};this._controlInterpolants=[];this._nActiveControlInterpolants=0;var a=this;this.stats={actions:{get total(){return a._actions.length},get inUse(){return a._nActiveActions}},bindings:{get total(){return a._bindings.length},get inUse(){return a._nActiveBindings}},controlInterpolants:{get total(){return a._controlInterpolants.length},get inUse(){return a._nActiveControlInterpolants}}}},
_isActiveAction:function(a){a=a._cacheIndex;return null!==a&&a<this._nActiveActions},_addInactiveAction:function(a,b,c){var d=this._actions,e=this._actionsByClip,f=e[b];void 0===f?(f={knownActions:[a],actionByRoot:{}},a._byClipCacheIndex=0,e[b]=f):(b=f.knownActions,a._byClipCacheIndex=b.length,b.push(a));a._cacheIndex=d.length;d.push(a);f.actionByRoot[c]=a},_removeInactiveAction:function(a){var b=this._actions,c=b[b.length-1],d=a._cacheIndex;c._cacheIndex=d;b[d]=c;b.pop();a._cacheIndex=null;b=a._clip.uuid;
c=this._actionsByClip;d=c[b];var e=d.knownActions,f=e[e.length-1],g=a._byClipCacheIndex;f._byClipCacheIndex=g;e[g]=f;e.pop();a._byClipCacheIndex=null;delete d.actionByRoot[(a._localRoot||this._root).uuid];0===e.length&&delete c[b];this._removeInactiveBindingsForAction(a)},_removeInactiveBindingsForAction:function(a){a=a._propertyBindings;for(var b=0,c=a.length;b!==c;++b){var d=a[b];0===--d.referenceCount&&this._removeInactiveBinding(d)}},_lendAction:function(a){var b=this._actions,c=a._cacheIndex,
d=this._nActiveActions++,e=b[d];a._cacheIndex=d;b[d]=a;e._cacheIndex=c;b[c]=e},_takeBackAction:function(a){var b=this._actions,c=a._cacheIndex,d=--this._nActiveActions,e=b[d];a._cacheIndex=d;b[d]=a;e._cacheIndex=c;b[c]=e},_addInactiveBinding:function(a,b,c){var d=this._bindingsByRootAndName,e=d[b],f=this._bindings;void 0===e&&(e={},d[b]=e);e[c]=a;a._cacheIndex=f.length;f.push(a)},_removeInactiveBinding:function(a){var b=this._bindings,c=a.binding,d=c.rootNode.uuid;c=c.path;var e=this._bindingsByRootAndName,
f=e[d],g=b[b.length-1];a=a._cacheIndex;g._cacheIndex=a;b[a]=g;b.pop();delete f[c];a:{for(var h in f)break a;delete e[d]}},_lendBinding:function(a){var b=this._bindings,c=a._cacheIndex,d=this._nActiveBindings++,e=b[d];a._cacheIndex=d;b[d]=a;e._cacheIndex=c;b[c]=e},_takeBackBinding:function(a){var b=this._bindings,c=a._cacheIndex,d=--this._nActiveBindings,e=b[d];a._cacheIndex=d;b[d]=a;e._cacheIndex=c;b[c]=e},_lendControlInterpolant:function(){var a=this._controlInterpolants,b=this._nActiveControlInterpolants++,
c=a[b];void 0===c&&(c=new dd(new Float32Array(2),new Float32Array(2),1,this._controlInterpolantsResultBuffer),c.__cacheIndex=b,a[b]=c);return c},_takeBackControlInterpolant:function(a){var b=this._controlInterpolants,c=a.__cacheIndex,d=--this._nActiveControlInterpolants,e=b[d];a.__cacheIndex=d;b[d]=a;e.__cacheIndex=c;b[c]=e},_controlInterpolantsResultBuffer:new Float32Array(1),clipAction:function(a,b){var c=b||this._root,d=c.uuid;c="string"===typeof a?Da.findByName(c,a):a;a=null!==c?c.uuid:a;var e=
this._actionsByClip[a],f=null;if(void 0!==e){f=e.actionByRoot[d];if(void 0!==f)return f;f=e.knownActions[0];null===c&&(c=f._clip)}if(null===c)return null;b=new qf(this,c,b);this._bindAction(b,f);this._addInactiveAction(b,a,d);return b},existingAction:function(a,b){var c=b||this._root;b=c.uuid;c="string"===typeof a?Da.findByName(c,a):a;a=this._actionsByClip[c?c.uuid:a];return void 0!==a?a.actionByRoot[b]||null:null},stopAllAction:function(){for(var a=this._actions,b=this._nActiveActions,c=this._bindings,
d=this._nActiveBindings,e=this._nActiveBindings=this._nActiveActions=0;e!==b;++e)a[e].reset();for(e=0;e!==d;++e)c[e].useCount=0;return this},update:function(a){a*=this.timeScale;for(var b=this._actions,c=this._nActiveActions,d=this.time+=a,e=Math.sign(a),f=this._accuIndex^=1,g=0;g!==c;++g)b[g]._update(d,a,e,f);a=this._bindings;b=this._nActiveBindings;for(g=0;g!==b;++g)a[g].apply(f);return this},getRoot:function(){return this._root},uncacheClip:function(a){var b=this._actions;a=a.uuid;var c=this._actionsByClip,
d=c[a];if(void 0!==d){d=d.knownActions;for(var e=0,f=d.length;e!==f;++e){var g=d[e];this._deactivateAction(g);var h=g._cacheIndex,k=b[b.length-1];g._cacheIndex=null;g._byClipCacheIndex=null;k._cacheIndex=h;b[h]=k;b.pop();this._removeInactiveBindingsForAction(g)}delete c[a]}},uncacheRoot:function(a){a=a.uuid;var b=this._actionsByClip;for(d in b){var c=b[d].actionByRoot[a];void 0!==c&&(this._deactivateAction(c),this._removeInactiveAction(c))}var d=this._bindingsByRootAndName[a];if(void 0!==d)for(var e in d)a=
d[e],a.restoreOriginalState(),this._removeInactiveBinding(a)},uncacheAction:function(a,b){a=this.existingAction(a,b);null!==a&&(this._deactivateAction(a),this._removeInactiveAction(a))}});Md.prototype.clone=function(){return new Md(void 0===this.value.clone?this.value:this.value.clone())};re.prototype=Object.assign(Object.create(I.prototype),{constructor:re,isInstancedBufferGeometry:!0,copy:function(a){I.prototype.copy.call(this,a);this.maxInstancedCount=a.maxInstancedCount;return this},clone:function(){return(new this.constructor).copy(this)}});
se.prototype=Object.assign(Object.create(qb.prototype),{constructor:se,isInstancedInterleavedBuffer:!0,copy:function(a){qb.prototype.copy.call(this,a);this.meshPerAttribute=a.meshPerAttribute;return this}});te.prototype=Object.assign(Object.create(Q.prototype),{constructor:te,isInstancedBufferAttribute:!0,copy:function(a){Q.prototype.copy.call(this,a);this.meshPerAttribute=a.meshPerAttribute;return this}});Object.assign(rf.prototype,{linePrecision:1,set:function(a,b){this.ray.set(a,b)},setFromCamera:function(a,
b){b&&b.isPerspectiveCamera?(this.ray.origin.setFromMatrixPosition(b.matrixWorld),this.ray.direction.set(a.x,a.y,.5).unproject(b).sub(this.ray.origin).normalize()):b&&b.isOrthographicCamera?(this.ray.origin.set(a.x,a.y,(b.near+b.far)/(b.near-b.far)).unproject(b),this.ray.direction.set(0,0,-1).transformDirection(b.matrixWorld)):console.error("THREE.Raycaster: Unsupported camera type.")},intersectObject:function(a,b,c){c=c||[];ue(a,this,c,b);c.sort(sf);return c},intersectObjects:function(a,b,c){c=c||
[];if(!1===Array.isArray(a))return console.warn("THREE.Raycaster.intersectObjects: objects is not an Array."),c;for(var d=0,e=a.length;d<e;d++)ue(a[d],this,c,b);c.sort(sf);return c}});Object.assign(tf.prototype,{start:function(){this.oldTime=this.startTime=("undefined"===typeof performance?Date:performance).now();this.elapsedTime=0;this.running=!0},stop:function(){this.getElapsedTime();this.autoStart=this.running=!1},getElapsedTime:function(){this.getDelta();return this.elapsedTime},getDelta:function(){var a=
0;if(this.autoStart&&!this.running)return this.start(),0;if(this.running){var b=("undefined"===typeof performance?Date:performance).now();a=(b-this.oldTime)/1E3;this.oldTime=b;this.elapsedTime+=a}return a}});Object.assign(uf.prototype,{set:function(a,b,c){this.radius=a;this.phi=b;this.theta=c;return this},clone:function(){return(new this.constructor).copy(this)},copy:function(a){this.radius=a.radius;this.phi=a.phi;this.theta=a.theta;return this},makeSafe:function(){this.phi=Math.max(1E-6,Math.min(Math.PI-
1E-6,this.phi));return this},setFromVector3:function(a){return this.setFromCartesianCoords(a.x,a.y,a.z)},setFromCartesianCoords:function(a,b,c){this.radius=Math.sqrt(a*a+b*b+c*c);0===this.radius?this.phi=this.theta=0:(this.theta=Math.atan2(a,c),this.phi=Math.acos(K.clamp(b/this.radius,-1,1)));return this}});Object.assign(vf.prototype,{set:function(a,b,c){this.radius=a;this.theta=b;this.y=c;return this},clone:function(){return(new this.constructor).copy(this)},copy:function(a){this.radius=a.radius;
this.theta=a.theta;this.y=a.y;return this},setFromVector3:function(a){return this.setFromCartesianCoords(a.x,a.y,a.z)},setFromCartesianCoords:function(a,b,c){this.radius=Math.sqrt(a*a+c*c);this.theta=Math.atan2(a,c);this.y=b;return this}});Object.assign(ve.prototype,{set:function(a,b){this.min.copy(a);this.max.copy(b);return this},setFromPoints:function(a){this.makeEmpty();for(var b=0,c=a.length;b<c;b++)this.expandByPoint(a[b]);return this},setFromCenterAndSize:function(){var a=new z;return function(b,
c){c=a.copy(c).multiplyScalar(.5);this.min.copy(b).sub(c);this.max.copy(b).add(c);return this}}(),clone:function(){return(new this.constructor).copy(this)},copy:function(a){this.min.copy(a.min);this.max.copy(a.max);return this},makeEmpty:function(){this.min.x=this.min.y=Infinity;this.max.x=this.max.y=-Infinity;return this},isEmpty:function(){return this.max.x<this.min.x||this.max.y<this.min.y},getCenter:function(a){void 0===a&&(console.warn("THREE.Box2: .getCenter() target is now required"),a=new z);
return this.isEmpty()?a.set(0,0):a.addVectors(this.min,this.max).multiplyScalar(.5)},getSize:function(a){void 0===a&&(console.warn("THREE.Box2: .getSize() target is now required"),a=new z);return this.isEmpty()?a.set(0,0):a.subVectors(this.max,this.min)},expandByPoint:function(a){this.min.min(a);this.max.max(a);return this},expandByVector:function(a){this.min.sub(a);this.max.add(a);return this},expandByScalar:function(a){this.min.addScalar(-a);this.max.addScalar(a);return this},containsPoint:function(a){return a.x<
this.min.x||a.x>this.max.x||a.y<this.min.y||a.y>this.max.y?!1:!0},containsBox:function(a){return this.min.x<=a.min.x&&a.max.x<=this.max.x&&this.min.y<=a.min.y&&a.max.y<=this.max.y},getParameter:function(a,b){void 0===b&&(console.warn("THREE.Box2: .getParameter() target is now required"),b=new z);return b.set((a.x-this.min.x)/(this.max.x-this.min.x),(a.y-this.min.y)/(this.max.y-this.min.y))},intersectsBox:function(a){return a.max.x<this.min.x||a.min.x>this.max.x||a.max.y<this.min.y||a.min.y>this.max.y?
!1:!0},clampPoint:function(a,b){void 0===b&&(console.warn("THREE.Box2: .clampPoint() target is now required"),b=new z);return b.copy(a).clamp(this.min,this.max)},distanceToPoint:function(){var a=new z;return function(b){return a.copy(b).clamp(this.min,this.max).sub(b).length()}}(),intersect:function(a){this.min.max(a.min);this.max.min(a.max);return this},union:function(a){this.min.min(a.min);this.max.max(a.max);return this},translate:function(a){this.min.add(a);this.max.add(a);return this},equals:function(a){return a.min.equals(this.min)&&
a.max.equals(this.max)}});Object.assign(we.prototype,{set:function(a,b){this.start.copy(a);this.end.copy(b);return this},clone:function(){return(new this.constructor).copy(this)},copy:function(a){this.start.copy(a.start);this.end.copy(a.end);return this},getCenter:function(a){void 0===a&&(console.warn("THREE.Line3: .getCenter() target is now required"),a=new p);return a.addVectors(this.start,this.end).multiplyScalar(.5)},delta:function(a){void 0===a&&(console.warn("THREE.Line3: .delta() target is now required"),
a=new p);return a.subVectors(this.end,this.start)},distanceSq:function(){return this.start.distanceToSquared(this.end)},distance:function(){return this.start.distanceTo(this.end)},at:function(a,b){void 0===b&&(console.warn("THREE.Line3: .at() target is now required"),b=new p);return this.delta(b).multiplyScalar(a).add(this.start)},closestPointToPointParameter:function(){var a=new p,b=new p;return function(c,d){a.subVectors(c,this.start);b.subVectors(this.end,this.start);c=b.dot(b);c=b.dot(a)/c;d&&
(c=K.clamp(c,0,1));return c}}(),closestPointToPoint:function(a,b,c){a=this.closestPointToPointParameter(a,b);void 0===c&&(console.warn("THREE.Line3: .closestPointToPoint() target is now required"),c=new p);return this.delta(c).multiplyScalar(a).add(this.start)},applyMatrix4:function(a){this.start.applyMatrix4(a);this.end.applyMatrix4(a);return this},equals:function(a){return a.start.equals(this.start)&&a.end.equals(this.end)}});gd.prototype=Object.create(B.prototype);gd.prototype.constructor=gd;gd.prototype.isImmediateRenderObject=
!0;hd.prototype=Object.create(Z.prototype);hd.prototype.constructor=hd;hd.prototype.update=function(){var a=new p,b=new p,c=new na;return function(){var d=["a","b","c"];this.object.updateMatrixWorld(!0);c.getNormalMatrix(this.object.matrixWorld);var e=this.object.matrixWorld,f=this.geometry.attributes.position,g=this.object.geometry;if(g&&g.isGeometry)for(var h=g.vertices,k=g.faces,l=g=0,p=k.length;l<p;l++)for(var n=k[l],q=0,u=n.vertexNormals.length;q<u;q++){var r=n.vertexNormals[q];a.copy(h[n[d[q]]]).applyMatrix4(e);
b.copy(r).applyMatrix3(c).normalize().multiplyScalar(this.size).add(a);f.setXYZ(g,a.x,a.y,a.z);g+=1;f.setXYZ(g,b.x,b.y,b.z);g+=1}else if(g&&g.isBufferGeometry)for(d=g.attributes.position,h=g.attributes.normal,q=g=0,u=d.count;q<u;q++)a.set(d.getX(q),d.getY(q),d.getZ(q)).applyMatrix4(e),b.set(h.getX(q),h.getY(q),h.getZ(q)),b.applyMatrix3(c).normalize().multiplyScalar(this.size).add(a),f.setXYZ(g,a.x,a.y,a.z),g+=1,f.setXYZ(g,b.x,b.y,b.z),g+=1;f.needsUpdate=!0}}();kc.prototype=Object.create(B.prototype);
kc.prototype.constructor=kc;kc.prototype.dispose=function(){this.cone.geometry.dispose();this.cone.material.dispose()};kc.prototype.update=function(){var a=new p,b=new p;return function(){this.light.updateMatrixWorld();var c=this.light.distance?this.light.distance:1E3,d=c*Math.tan(this.light.angle);this.cone.scale.set(d,d,c);a.setFromMatrixPosition(this.light.matrixWorld);b.setFromMatrixPosition(this.light.target.matrixWorld);this.cone.lookAt(b.sub(a));void 0!==this.color?this.cone.material.color.set(this.color):
this.cone.material.color.copy(this.light.color)}}();lc.prototype=Object.create(Z.prototype);lc.prototype.constructor=lc;lc.prototype.updateMatrixWorld=function(){var a=new p,b=new J,c=new J;return function(d){var e=this.bones,f=this.geometry,g=f.getAttribute("position");c.getInverse(this.root.matrixWorld);for(var h=0,k=0;h<e.length;h++){var l=e[h];l.parent&&l.parent.isBone&&(b.multiplyMatrices(c,l.matrixWorld),a.setFromMatrixPosition(b),g.setXYZ(k,a.x,a.y,a.z),b.multiplyMatrices(c,l.parent.matrixWorld),
a.setFromMatrixPosition(b),g.setXYZ(k+1,a.x,a.y,a.z),k+=2)}f.getAttribute("position").needsUpdate=!0;B.prototype.updateMatrixWorld.call(this,d)}}();mc.prototype=Object.create(ta.prototype);mc.prototype.constructor=mc;mc.prototype.dispose=function(){this.geometry.dispose();this.material.dispose()};mc.prototype.update=function(){void 0!==this.color?this.material.color.set(this.color):this.material.color.copy(this.light.color)};nc.prototype=Object.create(B.prototype);nc.prototype.constructor=nc;nc.prototype.dispose=
function(){this.children[0].geometry.dispose();this.children[0].material.dispose()};nc.prototype.update=function(){var a=.5*this.light.width,b=.5*this.light.height,c=this.line.geometry.attributes.position,d=c.array;d[0]=a;d[1]=-b;d[2]=0;d[3]=a;d[4]=b;d[5]=0;d[6]=-a;d[7]=b;d[8]=0;d[9]=-a;d[10]=-b;d[11]=0;d[12]=a;d[13]=-b;d[14]=0;c.needsUpdate=!0;void 0!==this.color?this.line.material.color.set(this.color):this.line.material.color.copy(this.light.color)};oc.prototype=Object.create(B.prototype);oc.prototype.constructor=
oc;oc.prototype.dispose=function(){this.children[0].geometry.dispose();this.children[0].material.dispose()};oc.prototype.update=function(){var a=new p,b=new F,c=new F;return function(){var d=this.children[0];if(void 0!==this.color)this.material.color.set(this.color);else{var e=d.geometry.getAttribute("color");b.copy(this.light.color);c.copy(this.light.groundColor);for(var f=0,g=e.count;f<g;f++){var h=f<g/2?b:c;e.setXYZ(f,h.r,h.g,h.b)}e.needsUpdate=!0}d.lookAt(a.setFromMatrixPosition(this.light.matrixWorld).negate())}}();
id.prototype=Object.create(Z.prototype);id.prototype.constructor=id;Nd.prototype=Object.create(Z.prototype);Nd.prototype.constructor=Nd;jd.prototype=Object.create(Z.prototype);jd.prototype.constructor=jd;jd.prototype.update=function(){var a=new p,b=new p,c=new na;return function(){this.object.updateMatrixWorld(!0);c.getNormalMatrix(this.object.matrixWorld);var d=this.object.matrixWorld,e=this.geometry.attributes.position,f=this.object.geometry,g=f.vertices;f=f.faces;for(var h=0,k=0,l=f.length;k<l;k++){var p=
f[k],n=p.normal;a.copy(g[p.a]).add(g[p.b]).add(g[p.c]).divideScalar(3).applyMatrix4(d);b.copy(n).applyMatrix3(c).normalize().multiplyScalar(this.size).add(a);e.setXYZ(h,a.x,a.y,a.z);h+=1;e.setXYZ(h,b.x,b.y,b.z);h+=1}e.needsUpdate=!0}}();pc.prototype=Object.create(B.prototype);pc.prototype.constructor=pc;pc.prototype.dispose=function(){this.lightPlane.geometry.dispose();this.lightPlane.material.dispose();this.targetLine.geometry.dispose();this.targetLine.material.dispose()};pc.prototype.update=function(){var a=
new p,b=new p,c=new p;return function(){a.setFromMatrixPosition(this.light.matrixWorld);b.setFromMatrixPosition(this.light.target.matrixWorld);c.subVectors(b,a);this.lightPlane.lookAt(c);void 0!==this.color?(this.lightPlane.material.color.set(this.color),this.targetLine.material.color.set(this.color)):(this.lightPlane.material.color.copy(this.light.color),this.targetLine.material.color.copy(this.light.color));this.targetLine.lookAt(c);this.targetLine.scale.z=c.length()}}();kd.prototype=Object.create(Z.prototype);
kd.prototype.constructor=kd;kd.prototype.update=function(){function a(a,g,h,k){d.set(g,h,k).unproject(e);a=c[a];if(void 0!==a)for(g=b.getAttribute("position"),h=0,k=a.length;h<k;h++)g.setXYZ(a[h],d.x,d.y,d.z)}var b,c,d=new p,e=new Pa;return function(){b=this.geometry;c=this.pointMap;e.projectionMatrix.copy(this.camera.projectionMatrix);a("c",0,0,-1);a("t",0,0,1);a("n1",-1,-1,-1);a("n2",1,-1,-1);a("n3",-1,1,-1);a("n4",1,1,-1);a("f1",-1,-1,1);a("f2",1,-1,1);a("f3",-1,1,1);a("f4",1,1,1);a("u1",.7,1.1,
-1);a("u2",-.7,1.1,-1);a("u3",0,2,-1);a("cf1",-1,0,1);a("cf2",1,0,1);a("cf3",0,-1,1);a("cf4",0,1,1);a("cn1",-1,0,-1);a("cn2",1,0,-1);a("cn3",0,-1,-1);a("cn4",0,1,-1);b.getAttribute("position").needsUpdate=!0}}();Fb.prototype=Object.create(Z.prototype);Fb.prototype.constructor=Fb;Fb.prototype.update=function(){var a=new Ua;return function(b){void 0!==b&&console.warn("THREE.BoxHelper: .update() has no longer arguments.");void 0!==this.object&&a.setFromObject(this.object);if(!a.isEmpty()){b=a.min;var c=
a.max,d=this.geometry.attributes.position,e=d.array;e[0]=c.x;e[1]=c.y;e[2]=c.z;e[3]=b.x;e[4]=c.y;e[5]=c.z;e[6]=b.x;e[7]=b.y;e[8]=c.z;e[9]=c.x;e[10]=b.y;e[11]=c.z;e[12]=c.x;e[13]=c.y;e[14]=b.z;e[15]=b.x;e[16]=c.y;e[17]=b.z;e[18]=b.x;e[19]=b.y;e[20]=b.z;e[21]=c.x;e[22]=b.y;e[23]=b.z;d.needsUpdate=!0;this.geometry.computeBoundingSphere()}}}();Fb.prototype.setFromObject=function(a){this.object=a;this.update();return this};ld.prototype=Object.create(Z.prototype);ld.prototype.constructor=ld;ld.prototype.updateMatrixWorld=
function(a){var b=this.box;b.isEmpty()||(b.getCenter(this.position),b.getSize(this.scale),this.scale.multiplyScalar(.5),B.prototype.updateMatrixWorld.call(this,a))};md.prototype=Object.create(oa.prototype);md.prototype.constructor=md;md.prototype.updateMatrixWorld=function(a){var b=-this.plane.constant;1E-8>Math.abs(b)&&(b=1E-8);this.scale.set(.5*this.size,.5*this.size,b);this.children[0].material.side=0>b?1:0;this.lookAt(this.plane.normal);B.prototype.updateMatrixWorld.call(this,a)};var Od,xe;Gb.prototype=
Object.create(B.prototype);Gb.prototype.constructor=Gb;Gb.prototype.setDirection=function(){var a=new p,b;return function(c){.99999<c.y?this.quaternion.set(0,0,0,1):-.99999>c.y?this.quaternion.set(1,0,0,0):(a.set(c.z,0,-c.x).normalize(),b=Math.acos(c.y),this.quaternion.setFromAxisAngle(a,b))}}();Gb.prototype.setLength=function(a,b,c){void 0===b&&(b=.2*a);void 0===c&&(c=.2*b);this.line.scale.set(1,Math.max(0,a-b),1);this.line.updateMatrix();this.cone.scale.set(c,b,c);this.cone.position.y=a;this.cone.updateMatrix()};
Gb.prototype.setColor=function(a){this.line.material.color.copy(a);this.cone.material.color.copy(a)};nd.prototype=Object.create(Z.prototype);nd.prototype.constructor=nd;L.create=function(a,b){console.log("THREE.Curve.create() has been deprecated");a.prototype=Object.create(L.prototype);a.prototype.constructor=a;a.prototype.getPoint=b;return a};Object.assign(Za.prototype,{createPointsGeometry:function(a){console.warn("THREE.CurvePath: .createPointsGeometry() has been removed. Use new THREE.Geometry().setFromPoints( points ) instead.");
a=this.getPoints(a);return this.createGeometry(a)},createSpacedPointsGeometry:function(a){console.warn("THREE.CurvePath: .createSpacedPointsGeometry() has been removed. Use new THREE.Geometry().setFromPoints( points ) instead.");a=this.getSpacedPoints(a);return this.createGeometry(a)},createGeometry:function(a){console.warn("THREE.CurvePath: .createGeometry() has been removed. Use new THREE.Geometry().setFromPoints( points ) instead.");for(var b=new M,c=0,d=a.length;c<d;c++){var e=a[c];b.vertices.push(new p(e.x,
e.y,e.z||0))}return b}});Object.assign(Ma.prototype,{fromPoints:function(a){console.warn("THREE.Path: .fromPoints() has been renamed to .setFromPoints().");this.setFromPoints(a)}});xf.prototype=Object.create(ja.prototype);yf.prototype=Object.create(ja.prototype);ye.prototype=Object.create(ja.prototype);Object.assign(ye.prototype,{initFromArray:function(){console.error("THREE.Spline: .initFromArray() has been removed.")},getControlPointsArray:function(){console.error("THREE.Spline: .getControlPointsArray() has been removed.")},
reparametrizeByArcLength:function(){console.error("THREE.Spline: .reparametrizeByArcLength() has been removed.")}});id.prototype.setColors=function(){console.error("THREE.GridHelper: setColors() has been deprecated, pass them in the constructor instead.")};lc.prototype.update=function(){console.error("THREE.SkeletonHelper: update() no longer needs to be called.")};Object.assign(ic.prototype,{extractUrlBase:function(a){console.warn("THREE.Loader: .extractUrlBase() has been deprecated. Use THREE.LoaderUtils.extractUrlBase() instead.");
return Ce.extractUrlBase(a)}});Object.assign(ve.prototype,{center:function(a){console.warn("THREE.Box2: .center() has been renamed to .getCenter().");return this.getCenter(a)},empty:function(){console.warn("THREE.Box2: .empty() has been renamed to .isEmpty().");return this.isEmpty()},isIntersectionBox:function(a){console.warn("THREE.Box2: .isIntersectionBox() has been renamed to .intersectsBox().");return this.intersectsBox(a)},size:function(a){console.warn("THREE.Box2: .size() has been renamed to .getSize().");
return this.getSize(a)}});Object.assign(Ua.prototype,{center:function(a){console.warn("THREE.Box3: .center() has been renamed to .getCenter().");return this.getCenter(a)},empty:function(){console.warn("THREE.Box3: .empty() has been renamed to .isEmpty().");return this.isEmpty()},isIntersectionBox:function(a){console.warn("THREE.Box3: .isIntersectionBox() has been renamed to .intersectsBox().");return this.intersectsBox(a)},isIntersectionSphere:function(a){console.warn("THREE.Box3: .isIntersectionSphere() has been renamed to .intersectsSphere().");
return this.intersectsSphere(a)},size:function(a){console.warn("THREE.Box3: .size() has been renamed to .getSize().");return this.getSize(a)}});we.prototype.center=function(a){console.warn("THREE.Line3: .center() has been renamed to .getCenter().");return this.getCenter(a)};Object.assign(K,{random16:function(){console.warn("THREE.Math: .random16() has been deprecated. Use Math.random() instead.");return Math.random()},nearestPowerOfTwo:function(a){console.warn("THREE.Math: .nearestPowerOfTwo() has been renamed to .floorPowerOfTwo().");
return K.floorPowerOfTwo(a)},nextPowerOfTwo:function(a){console.warn("THREE.Math: .nextPowerOfTwo() has been renamed to .ceilPowerOfTwo().");return K.ceilPowerOfTwo(a)}});Object.assign(na.prototype,{flattenToArrayOffset:function(a,b){console.warn("THREE.Matrix3: .flattenToArrayOffset() has been deprecated. Use .toArray() instead.");return this.toArray(a,b)},multiplyVector3:function(a){console.warn("THREE.Matrix3: .multiplyVector3() has been removed. Use vector.applyMatrix3( matrix ) instead.");return a.applyMatrix3(this)},
multiplyVector3Array:function(){console.error("THREE.Matrix3: .multiplyVector3Array() has been removed.")},applyToBuffer:function(a){console.warn("THREE.Matrix3: .applyToBuffer() has been removed. Use matrix.applyToBufferAttribute( attribute ) instead.");return this.applyToBufferAttribute(a)},applyToVector3Array:function(){console.error("THREE.Matrix3: .applyToVector3Array() has been removed.")}});Object.assign(J.prototype,{extractPosition:function(a){console.warn("THREE.Matrix4: .extractPosition() has been renamed to .copyPosition().");
return this.copyPosition(a)},flattenToArrayOffset:function(a,b){console.warn("THREE.Matrix4: .flattenToArrayOffset() has been deprecated. Use .toArray() instead.");return this.toArray(a,b)},getPosition:function(){var a;return function(){void 0===a&&(a=new p);console.warn("THREE.Matrix4: .getPosition() has been removed. Use Vector3.setFromMatrixPosition( matrix ) instead.");return a.setFromMatrixColumn(this,3)}}(),setRotationFromQuaternion:function(a){console.warn("THREE.Matrix4: .setRotationFromQuaternion() has been renamed to .makeRotationFromQuaternion().");
return this.makeRotationFromQuaternion(a)},multiplyToArray:function(){console.warn("THREE.Matrix4: .multiplyToArray() has been removed.")},multiplyVector3:function(a){console.warn("THREE.Matrix4: .multiplyVector3() has been removed. Use vector.applyMatrix4( matrix ) instead.");return a.applyMatrix4(this)},multiplyVector4:function(a){console.warn("THREE.Matrix4: .multiplyVector4() has been removed. Use vector.applyMatrix4( matrix ) instead.");return a.applyMatrix4(this)},multiplyVector3Array:function(){console.error("THREE.Matrix4: .multiplyVector3Array() has been removed.")},
rotateAxis:function(a){console.warn("THREE.Matrix4: .rotateAxis() has been removed. Use Vector3.transformDirection( matrix ) instead.");a.transformDirection(this)},crossVector:function(a){console.warn("THREE.Matrix4: .crossVector() has been removed. Use vector.applyMatrix4( matrix ) instead.");return a.applyMatrix4(this)},translate:function(){console.error("THREE.Matrix4: .translate() has been removed.")},rotateX:function(){console.error("THREE.Matrix4: .rotateX() has been removed.")},rotateY:function(){console.error("THREE.Matrix4: .rotateY() has been removed.")},
rotateZ:function(){console.error("THREE.Matrix4: .rotateZ() has been removed.")},rotateByAxis:function(){console.error("THREE.Matrix4: .rotateByAxis() has been removed.")},applyToBuffer:function(a){console.warn("THREE.Matrix4: .applyToBuffer() has been removed. Use matrix.applyToBufferAttribute( attribute ) instead.");return this.applyToBufferAttribute(a)},applyToVector3Array:function(){console.error("THREE.Matrix4: .applyToVector3Array() has been removed.")},makeFrustum:function(a,b,c,d,e,f){console.warn("THREE.Matrix4: .makeFrustum() has been removed. Use .makePerspective( left, right, top, bottom, near, far ) instead.");
return this.makePerspective(a,b,d,c,e,f)}});Oa.prototype.isIntersectionLine=function(a){console.warn("THREE.Plane: .isIntersectionLine() has been renamed to .intersectsLine().");return this.intersectsLine(a)};ha.prototype.multiplyVector3=function(a){console.warn("THREE.Quaternion: .multiplyVector3() has been removed. Use is now vector.applyQuaternion( quaternion ) instead.");return a.applyQuaternion(this)};Object.assign(ob.prototype,{isIntersectionBox:function(a){console.warn("THREE.Ray: .isIntersectionBox() has been renamed to .intersectsBox().");
return this.intersectsBox(a)},isIntersectionPlane:function(a){console.warn("THREE.Ray: .isIntersectionPlane() has been renamed to .intersectsPlane().");return this.intersectsPlane(a)},isIntersectionSphere:function(a){console.warn("THREE.Ray: .isIntersectionSphere() has been renamed to .intersectsSphere().");return this.intersectsSphere(a)}});Object.assign(da.prototype,{area:function(){console.warn("THREE.Triangle: .area() has been renamed to .getArea().");return this.getArea()},barycoordFromPoint:function(a,
b){console.warn("THREE.Triangle: .barycoordFromPoint() has been renamed to .getBarycoord().");return this.getBarycoord(a,b)},midpoint:function(a){console.warn("THREE.Triangle: .midpoint() has been renamed to .getMidpoint().");return this.getMidpoint(a)},normal:function(a){console.warn("THREE.Triangle: .normal() has been renamed to .getNormal().");return this.getNormal(a)},plane:function(a){console.warn("THREE.Triangle: .plane() has been renamed to .getPlane().");return this.getPlane(a)}});Object.assign(da,
{barycoordFromPoint:function(a,b,c,d,e){console.warn("THREE.Triangle: .barycoordFromPoint() has been renamed to .getBarycoord().");return da.getBarycoord(a,b,c,d,e)},normal:function(a,b,c,d){console.warn("THREE.Triangle: .normal() has been renamed to .getNormal().");return da.getNormal(a,b,c,d)}});Object.assign(fb.prototype,{extractAllPoints:function(a){console.warn("THREE.Shape: .extractAllPoints() has been removed. Use .extractPoints() instead.");return this.extractPoints(a)},extrude:function(a){console.warn("THREE.Shape: .extrude() has been removed. Use ExtrudeGeometry() instead.");
return new tb(this,a)},makeGeometry:function(a){console.warn("THREE.Shape: .makeGeometry() has been removed. Use ShapeGeometry() instead.");return new vb(this,a)}});Object.assign(z.prototype,{fromAttribute:function(a,b,c){console.warn("THREE.Vector2: .fromAttribute() has been renamed to .fromBufferAttribute().");return this.fromBufferAttribute(a,b,c)},distanceToManhattan:function(a){console.warn("THREE.Vector2: .distanceToManhattan() has been renamed to .manhattanDistanceTo().");return this.manhattanDistanceTo(a)},
lengthManhattan:function(){console.warn("THREE.Vector2: .lengthManhattan() has been renamed to .manhattanLength().");return this.manhattanLength()}});Object.assign(p.prototype,{setEulerFromRotationMatrix:function(){console.error("THREE.Vector3: .setEulerFromRotationMatrix() has been removed. Use Euler.setFromRotationMatrix() instead.")},setEulerFromQuaternion:function(){console.error("THREE.Vector3: .setEulerFromQuaternion() has been removed. Use Euler.setFromQuaternion() instead.")},getPositionFromMatrix:function(a){console.warn("THREE.Vector3: .getPositionFromMatrix() has been renamed to .setFromMatrixPosition().");
return this.setFromMatrixPosition(a)},getScaleFromMatrix:function(a){console.warn("THREE.Vector3: .getScaleFromMatrix() has been renamed to .setFromMatrixScale().");return this.setFromMatrixScale(a)},getColumnFromMatrix:function(a,b){console.warn("THREE.Vector3: .getColumnFromMatrix() has been renamed to .setFromMatrixColumn().");return this.setFromMatrixColumn(b,a)},applyProjection:function(a){console.warn("THREE.Vector3: .applyProjection() has been removed. Use .applyMatrix4( m ) instead.");return this.applyMatrix4(a)},
fromAttribute:function(a,b,c){console.warn("THREE.Vector3: .fromAttribute() has been renamed to .fromBufferAttribute().");return this.fromBufferAttribute(a,b,c)},distanceToManhattan:function(a){console.warn("THREE.Vector3: .distanceToManhattan() has been renamed to .manhattanDistanceTo().");return this.manhattanDistanceTo(a)},lengthManhattan:function(){console.warn("THREE.Vector3: .lengthManhattan() has been renamed to .manhattanLength().");return this.manhattanLength()}});Object.assign(aa.prototype,
{fromAttribute:function(a,b,c){console.warn("THREE.Vector4: .fromAttribute() has been renamed to .fromBufferAttribute().");return this.fromBufferAttribute(a,b,c)},lengthManhattan:function(){console.warn("THREE.Vector4: .lengthManhattan() has been renamed to .manhattanLength().");return this.manhattanLength()}});Object.assign(M.prototype,{computeTangents:function(){console.error("THREE.Geometry: .computeTangents() has been removed.")},computeLineDistances:function(){console.error("THREE.Geometry: .computeLineDistances() has been removed. Use THREE.Line.computeLineDistances() instead.")}});
Object.assign(B.prototype,{getChildByName:function(a){console.warn("THREE.Object3D: .getChildByName() has been renamed to .getObjectByName().");return this.getObjectByName(a)},renderDepth:function(){console.warn("THREE.Object3D: .renderDepth has been removed. Use .renderOrder, instead.")},translate:function(a,b){console.warn("THREE.Object3D: .translate() has been removed. Use .translateOnAxis( axis, distance ) instead.");return this.translateOnAxis(b,a)},getWorldRotation:function(){console.error("THREE.Object3D: .getWorldRotation() has been removed. Use THREE.Object3D.getWorldQuaternion( target ) instead.")}});
Object.defineProperties(B.prototype,{eulerOrder:{get:function(){console.warn("THREE.Object3D: .eulerOrder is now .rotation.order.");return this.rotation.order},set:function(a){console.warn("THREE.Object3D: .eulerOrder is now .rotation.order.");this.rotation.order=a}},useQuaternion:{get:function(){console.warn("THREE.Object3D: .useQuaternion has been removed. The library now uses quaternions by default.")},set:function(){console.warn("THREE.Object3D: .useQuaternion has been removed. The library now uses quaternions by default.")}}});
Object.defineProperties(Dc.prototype,{objects:{get:function(){console.warn("THREE.LOD: .objects has been renamed to .levels.");return this.levels}}});Object.defineProperty(Ec.prototype,"useVertexTexture",{get:function(){console.warn("THREE.Skeleton: useVertexTexture has been removed.")},set:function(){console.warn("THREE.Skeleton: useVertexTexture has been removed.")}});Object.defineProperty(L.prototype,"__arcLengthDivisions",{get:function(){console.warn("THREE.Curve: .__arcLengthDivisions is now .arcLengthDivisions.");
return this.arcLengthDivisions},set:function(a){console.warn("THREE.Curve: .__arcLengthDivisions is now .arcLengthDivisions.");this.arcLengthDivisions=a}});X.prototype.setLens=function(a,b){console.warn("THREE.PerspectiveCamera.setLens is deprecated. Use .setFocalLength and .filmGauge for a photographic setup.");void 0!==b&&(this.filmGauge=b);this.setFocalLength(a)};Object.defineProperties(fa.prototype,{onlyShadow:{set:function(){console.warn("THREE.Light: .onlyShadow has been removed.")}},shadowCameraFov:{set:function(a){console.warn("THREE.Light: .shadowCameraFov is now .shadow.camera.fov.");
this.shadow.camera.fov=a}},shadowCameraLeft:{set:function(a){console.warn("THREE.Light: .shadowCameraLeft is now .shadow.camera.left.");this.shadow.camera.left=a}},shadowCameraRight:{set:function(a){console.warn("THREE.Light: .shadowCameraRight is now .shadow.camera.right.");this.shadow.camera.right=a}},shadowCameraTop:{set:function(a){console.warn("THREE.Light: .shadowCameraTop is now .shadow.camera.top.");this.shadow.camera.top=a}},shadowCameraBottom:{set:function(a){console.warn("THREE.Light: .shadowCameraBottom is now .shadow.camera.bottom.");
this.shadow.camera.bottom=a}},shadowCameraNear:{set:function(a){console.warn("THREE.Light: .shadowCameraNear is now .shadow.camera.near.");this.shadow.camera.near=a}},shadowCameraFar:{set:function(a){console.warn("THREE.Light: .shadowCameraFar is now .shadow.camera.far.");this.shadow.camera.far=a}},shadowCameraVisible:{set:function(){console.warn("THREE.Light: .shadowCameraVisible has been removed. Use new THREE.CameraHelper( light.shadow.camera ) instead.")}},shadowBias:{set:function(a){console.warn("THREE.Light: .shadowBias is now .shadow.bias.");
this.shadow.bias=a}},shadowDarkness:{set:function(){console.warn("THREE.Light: .shadowDarkness has been removed.")}},shadowMapWidth:{set:function(a){console.warn("THREE.Light: .shadowMapWidth is now .shadow.mapSize.width.");this.shadow.mapSize.width=a}},shadowMapHeight:{set:function(a){console.warn("THREE.Light: .shadowMapHeight is now .shadow.mapSize.height.");this.shadow.mapSize.height=a}}});Object.defineProperties(Q.prototype,{length:{get:function(){console.warn("THREE.BufferAttribute: .length has been deprecated. Use .count instead.");
return this.array.length}},copyIndicesArray:function(){console.error("THREE.BufferAttribute: .copyIndicesArray() has been removed.")}});Object.assign(I.prototype,{addIndex:function(a){console.warn("THREE.BufferGeometry: .addIndex() has been renamed to .setIndex().");this.setIndex(a)},addDrawCall:function(a,b,c){void 0!==c&&console.warn("THREE.BufferGeometry: .addDrawCall() no longer supports indexOffset.");console.warn("THREE.BufferGeometry: .addDrawCall() is now .addGroup().");this.addGroup(a,b)},
clearDrawCalls:function(){console.warn("THREE.BufferGeometry: .clearDrawCalls() is now .clearGroups().");this.clearGroups()},computeTangents:function(){console.warn("THREE.BufferGeometry: .computeTangents() has been removed.")},computeOffsets:function(){console.warn("THREE.BufferGeometry: .computeOffsets() has been removed.")}});Object.defineProperties(I.prototype,{drawcalls:{get:function(){console.error("THREE.BufferGeometry: .drawcalls has been renamed to .groups.");return this.groups}},offsets:{get:function(){console.warn("THREE.BufferGeometry: .offsets has been renamed to .groups.");
return this.groups}}});Object.assign(Qa.prototype,{getArrays:function(){console.error("THREE.ExtrudeBufferGeometry: .getArrays() has been removed.")},addShapeList:function(){console.error("THREE.ExtrudeBufferGeometry: .addShapeList() has been removed.")},addShape:function(){console.error("THREE.ExtrudeBufferGeometry: .addShape() has been removed.")}});Object.defineProperties(Md.prototype,{dynamic:{set:function(){console.warn("THREE.Uniform: .dynamic has been removed. Use object.onBeforeRender() instead.")}},
onUpdate:{value:function(){console.warn("THREE.Uniform: .onUpdate() has been removed. Use object.onBeforeRender() instead.");return this}}});Object.defineProperties(H.prototype,{wrapAround:{get:function(){console.warn("THREE.Material: .wrapAround has been removed.")},set:function(){console.warn("THREE.Material: .wrapAround has been removed.")}},wrapRGB:{get:function(){console.warn("THREE.Material: .wrapRGB has been removed.");return new F}},shading:{get:function(){console.error("THREE."+this.type+
": .shading has been removed. Use the boolean .flatShading instead.")},set:function(a){console.warn("THREE."+this.type+": .shading has been removed. Use the boolean .flatShading instead.");this.flatShading=1===a}}});Object.defineProperties(Ga.prototype,{metal:{get:function(){console.warn("THREE.MeshPhongMaterial: .metal has been removed. Use THREE.MeshStandardMaterial instead.");return!1},set:function(){console.warn("THREE.MeshPhongMaterial: .metal has been removed. Use THREE.MeshStandardMaterial instead")}}});
Object.defineProperties(ua.prototype,{derivatives:{get:function(){console.warn("THREE.ShaderMaterial: .derivatives has been moved to .extensions.derivatives.");return this.extensions.derivatives},set:function(a){console.warn("THREE. ShaderMaterial: .derivatives has been moved to .extensions.derivatives.");this.extensions.derivatives=a}}});Object.assign(Yd.prototype,{animate:function(a){console.warn("THREE.WebGLRenderer: .animate() is now .setAnimationLoop().");this.setAnimationLoop(a)},getCurrentRenderTarget:function(){console.warn("THREE.WebGLRenderer: .getCurrentRenderTarget() is now .getRenderTarget().");
return this.getRenderTarget()},getMaxAnisotropy:function(){console.warn("THREE.WebGLRenderer: .getMaxAnisotropy() is now .capabilities.getMaxAnisotropy().");return this.capabilities.getMaxAnisotropy()},getPrecision:function(){console.warn("THREE.WebGLRenderer: .getPrecision() is now .capabilities.precision.");return this.capabilities.precision},resetGLState:function(){console.warn("THREE.WebGLRenderer: .resetGLState() is now .state.reset().");return this.state.reset()},supportsFloatTextures:function(){console.warn("THREE.WebGLRenderer: .supportsFloatTextures() is now .extensions.get( 'OES_texture_float' ).");
return this.extensions.get("OES_texture_float")},supportsHalfFloatTextures:function(){console.warn("THREE.WebGLRenderer: .supportsHalfFloatTextures() is now .extensions.get( 'OES_texture_half_float' ).");return this.extensions.get("OES_texture_half_float")},supportsStandardDerivatives:function(){console.warn("THREE.WebGLRenderer: .supportsStandardDerivatives() is now .extensions.get( 'OES_standard_derivatives' ).");return this.extensions.get("OES_standard_derivatives")},supportsCompressedTextureS3TC:function(){console.warn("THREE.WebGLRenderer: .supportsCompressedTextureS3TC() is now .extensions.get( 'WEBGL_compressed_texture_s3tc' ).");
return this.extensions.get("WEBGL_compressed_texture_s3tc")},supportsCompressedTexturePVRTC:function(){console.warn("THREE.WebGLRenderer: .supportsCompressedTexturePVRTC() is now .extensions.get( 'WEBGL_compressed_texture_pvrtc' ).");return this.extensions.get("WEBGL_compressed_texture_pvrtc")},supportsBlendMinMax:function(){console.warn("THREE.WebGLRenderer: .supportsBlendMinMax() is now .extensions.get( 'EXT_blend_minmax' ).");return this.extensions.get("EXT_blend_minmax")},supportsVertexTextures:function(){console.warn("THREE.WebGLRenderer: .supportsVertexTextures() is now .capabilities.vertexTextures.");
return this.capabilities.vertexTextures},supportsInstancedArrays:function(){console.warn("THREE.WebGLRenderer: .supportsInstancedArrays() is now .extensions.get( 'ANGLE_instanced_arrays' ).");return this.extensions.get("ANGLE_instanced_arrays")},enableScissorTest:function(a){console.warn("THREE.WebGLRenderer: .enableScissorTest() is now .setScissorTest().");this.setScissorTest(a)},initMaterial:function(){console.warn("THREE.WebGLRenderer: .initMaterial() has been removed.")},addPrePlugin:function(){console.warn("THREE.WebGLRenderer: .addPrePlugin() has been removed.")},
addPostPlugin:function(){console.warn("THREE.WebGLRenderer: .addPostPlugin() has been removed.")},updateShadowMap:function(){console.warn("THREE.WebGLRenderer: .updateShadowMap() has been removed.")},setFaceCulling:function(){console.warn("THREE.WebGLRenderer: .setFaceCulling() has been removed.")}});Object.defineProperties(Yd.prototype,{shadowMapEnabled:{get:function(){return this.shadowMap.enabled},set:function(a){console.warn("THREE.WebGLRenderer: .shadowMapEnabled is now .shadowMap.enabled.");
this.shadowMap.enabled=a}},shadowMapType:{get:function(){return this.shadowMap.type},set:function(a){console.warn("THREE.WebGLRenderer: .shadowMapType is now .shadowMap.type.");this.shadowMap.type=a}},shadowMapCullFace:{get:function(){console.warn("THREE.WebGLRenderer: .shadowMapCullFace has been removed. Set Material.shadowSide instead.")},set:function(){console.warn("THREE.WebGLRenderer: .shadowMapCullFace has been removed. Set Material.shadowSide instead.")}}});Object.defineProperties(Ye.prototype,
{cullFace:{get:function(){console.warn("THREE.WebGLRenderer: .shadowMap.cullFace has been removed. Set Material.shadowSide instead.")},set:function(){console.warn("THREE.WebGLRenderer: .shadowMap.cullFace has been removed. Set Material.shadowSide instead.")}},renderReverseSided:{get:function(){console.warn("THREE.WebGLRenderer: .shadowMap.renderReverseSided has been removed. Set Material.shadowSide instead.")},set:function(){console.warn("THREE.WebGLRenderer: .shadowMap.renderReverseSided has been removed. Set Material.shadowSide instead.")}},
renderSingleSided:{get:function(){console.warn("THREE.WebGLRenderer: .shadowMap.renderSingleSided has been removed. Set Material.shadowSide instead.")},set:function(){console.warn("THREE.WebGLRenderer: .shadowMap.renderSingleSided has been removed. Set Material.shadowSide instead.")}}});Object.defineProperties(hb.prototype,{wrapS:{get:function(){console.warn("THREE.WebGLRenderTarget: .wrapS is now .texture.wrapS.");return this.texture.wrapS},set:function(a){console.warn("THREE.WebGLRenderTarget: .wrapS is now .texture.wrapS.");
this.texture.wrapS=a}},wrapT:{get:function(){console.warn("THREE.WebGLRenderTarget: .wrapT is now .texture.wrapT.");return this.texture.wrapT},set:function(a){console.warn("THREE.WebGLRenderTarget: .wrapT is now .texture.wrapT.");this.texture.wrapT=a}},magFilter:{get:function(){console.warn("THREE.WebGLRenderTarget: .magFilter is now .texture.magFilter.");return this.texture.magFilter},set:function(a){console.warn("THREE.WebGLRenderTarget: .magFilter is now .texture.magFilter.");this.texture.magFilter=
a}},minFilter:{get:function(){console.warn("THREE.WebGLRenderTarget: .minFilter is now .texture.minFilter.");return this.texture.minFilter},set:function(a){console.warn("THREE.WebGLRenderTarget: .minFilter is now .texture.minFilter.");this.texture.minFilter=a}},anisotropy:{get:function(){console.warn("THREE.WebGLRenderTarget: .anisotropy is now .texture.anisotropy.");return this.texture.anisotropy},set:function(a){console.warn("THREE.WebGLRenderTarget: .anisotropy is now .texture.anisotropy.");this.texture.anisotropy=
a}},offset:{get:function(){console.warn("THREE.WebGLRenderTarget: .offset is now .texture.offset.");return this.texture.offset},set:function(a){console.warn("THREE.WebGLRenderTarget: .offset is now .texture.offset.");this.texture.offset=a}},repeat:{get:function(){console.warn("THREE.WebGLRenderTarget: .repeat is now .texture.repeat.");return this.texture.repeat},set:function(a){console.warn("THREE.WebGLRenderTarget: .repeat is now .texture.repeat.");this.texture.repeat=a}},format:{get:function(){console.warn("THREE.WebGLRenderTarget: .format is now .texture.format.");
return this.texture.format},set:function(a){console.warn("THREE.WebGLRenderTarget: .format is now .texture.format.");this.texture.format=a}},type:{get:function(){console.warn("THREE.WebGLRenderTarget: .type is now .texture.type.");return this.texture.type},set:function(a){console.warn("THREE.WebGLRenderTarget: .type is now .texture.type.");this.texture.type=a}},generateMipmaps:{get:function(){console.warn("THREE.WebGLRenderTarget: .generateMipmaps is now .texture.generateMipmaps.");return this.texture.generateMipmaps},
set:function(a){console.warn("THREE.WebGLRenderTarget: .generateMipmaps is now .texture.generateMipmaps.");this.texture.generateMipmaps=a}}});Object.defineProperties($e.prototype,{standing:{set:function(){console.warn("THREE.WebVRManager: .standing has been removed.")}},userHeight:{set:function(){console.warn("THREE.WebVRManager: .userHeight has been removed.")}}});jc.prototype.load=function(a){console.warn("THREE.Audio: .load has been deprecated. Use THREE.AudioLoader instead.");var b=this;(new ke).load(a,
function(a){b.setBuffer(a)});return this};oe.prototype.getData=function(){console.warn("THREE.AudioAnalyser: .getData() is now .getFrequencyData().");return this.getFrequencyData()};fd.prototype.updateCubeMap=function(a,b){console.warn("THREE.CubeCamera: .updateCubeMap() is now .update().");return this.update(a,b)};gb.crossOrigin=void 0;gb.loadTexture=function(a,b,c,d){console.warn("THREE.ImageUtils.loadTexture has been deprecated. Use THREE.TextureLoader() instead.");var e=new wd;e.setCrossOrigin(this.crossOrigin);
a=e.load(a,c,void 0,d);b&&(a.mapping=b);return a};gb.loadTextureCube=function(a,b,c,d){console.warn("THREE.ImageUtils.loadTextureCube has been deprecated. Use THREE.CubeTextureLoader() instead.");var e=new de;e.setCrossOrigin(this.crossOrigin);a=e.load(a,c,void 0,d);b&&(a.mapping=b);return a};gb.loadCompressedTexture=function(){console.error("THREE.ImageUtils.loadCompressedTexture has been removed. Use THREE.DDSLoader instead.")};gb.loadCompressedTextureCube=function(){console.error("THREE.ImageUtils.loadCompressedTextureCube has been removed. Use THREE.DDSLoader instead.")};
l.WebGLRenderTargetCube=Ib;l.WebGLRenderTarget=hb;l.WebGLRenderer=Yd;l.ShaderLib=pb;l.UniformsLib=R;l.UniformsUtils=Ba;l.ShaderChunk=U;l.FogExp2=Nb;l.Fog=Ob;l.Scene=rd;l.Sprite=Cc;l.LOD=Dc;l.SkinnedMesh=td;l.Skeleton=Ec;l.Bone=sd;l.Mesh=ta;l.LineSegments=Z;l.LineLoop=ud;l.Line=oa;l.Points=Qb;l.Group=Mb;l.VideoTexture=Zd;l.DataTexture=ib;l.CompressedTexture=Rb;l.CubeTexture=Wa;l.CanvasTexture=Fc;l.DepthTexture=Gc;l.Texture=T;l.CompressedTextureLoader=jf;l.DataTextureLoader=ce;l.CubeTextureLoader=de;
l.TextureLoader=wd;l.ObjectLoader=lf;l.MaterialLoader=Ld;l.BufferGeometryLoader=fe;l.DefaultLoadingManager=wa;l.LoadingManager=be;l.JSONLoader=ge;l.ImageLoader=ad;l.ImageBitmapLoader=he;l.FontLoader=mf;l.FileLoader=Ha;l.Loader=ic;l.LoaderUtils=Ce;l.Cache=Hb;l.AudioLoader=ke;l.SpotLightShadow=yd;l.SpotLight=zd;l.PointLight=Ad;l.RectAreaLight=Ed;l.HemisphereLight=xd;l.DirectionalLightShadow=Bd;l.DirectionalLight=Cd;l.AmbientLight=Dd;l.LightShadow=Eb;l.Light=fa;l.StereoCamera=nf;l.PerspectiveCamera=
X;l.OrthographicCamera=Jb;l.CubeCamera=fd;l.ArrayCamera=Ac;l.Camera=Pa;l.AudioListener=le;l.PositionalAudio=ne;l.AudioContext=me;l.AudioAnalyser=oe;l.Audio=jc;l.VectorKeyframeTrack=hc;l.StringKeyframeTrack=Kd;l.QuaternionKeyframeTrack=ed;l.NumberKeyframeTrack=gc;l.ColorKeyframeTrack=Id;l.BooleanKeyframeTrack=Hd;l.PropertyMixer=pe;l.PropertyBinding=sa;l.KeyframeTrack=pa;l.AnimationUtils=qa;l.AnimationObjectGroup=pf;l.AnimationMixer=qe;l.AnimationClip=Da;l.Uniform=Md;l.InstancedBufferGeometry=re;l.BufferGeometry=
I;l.Geometry=M;l.InterleavedBufferAttribute=Bc;l.InstancedInterleavedBuffer=se;l.InterleavedBuffer=qb;l.InstancedBufferAttribute=te;l.Face3=Va;l.Object3D=B;l.Raycaster=rf;l.Layers=Sd;l.EventDispatcher=ea;l.Clock=tf;l.QuaternionLinearInterpolant=Jd;l.LinearInterpolant=dd;l.DiscreteInterpolant=Gd;l.CubicInterpolant=Fd;l.Interpolant=ya;l.Triangle=da;l.Math=K;l.Spherical=uf;l.Cylindrical=vf;l.Plane=Oa;l.Frustum=od;l.Sphere=Ea;l.Ray=ob;l.Matrix4=J;l.Matrix3=na;l.Box3=Ua;l.Box2=ve;l.Line3=we;l.Euler=jb;
l.Vector4=aa;l.Vector3=p;l.Vector2=z;l.Quaternion=ha;l.Color=F;l.ImmediateRenderObject=gd;l.VertexNormalsHelper=hd;l.SpotLightHelper=kc;l.SkeletonHelper=lc;l.PointLightHelper=mc;l.RectAreaLightHelper=nc;l.HemisphereLightHelper=oc;l.GridHelper=id;l.PolarGridHelper=Nd;l.FaceNormalsHelper=jd;l.DirectionalLightHelper=pc;l.CameraHelper=kd;l.BoxHelper=Fb;l.Box3Helper=ld;l.PlaneHelper=md;l.ArrowHelper=Gb;l.AxesHelper=nd;l.Shape=fb;l.Path=Ma;l.ShapePath=ie;l.Font=je;l.CurvePath=Za;l.Curve=L;l.ImageUtils=
gb;l.ShapeUtils=Xa;l.WebGLUtils=Ze;l.WireframeGeometry=Sb;l.ParametricGeometry=Hc;l.ParametricBufferGeometry=Tb;l.TetrahedronGeometry=Jc;l.TetrahedronBufferGeometry=Ub;l.OctahedronGeometry=Kc;l.OctahedronBufferGeometry=rb;l.IcosahedronGeometry=Lc;l.IcosahedronBufferGeometry=Vb;l.DodecahedronGeometry=Mc;l.DodecahedronBufferGeometry=Wb;l.PolyhedronGeometry=Ic;l.PolyhedronBufferGeometry=la;l.TubeGeometry=Nc;l.TubeBufferGeometry=Xb;l.TorusKnotGeometry=Oc;l.TorusKnotBufferGeometry=Yb;l.TorusGeometry=Pc;
l.TorusBufferGeometry=Zb;l.TextGeometry=Uc;l.TextBufferGeometry=$b;l.SphereGeometry=Vc;l.SphereBufferGeometry=ub;l.RingGeometry=Wc;l.RingBufferGeometry=ac;l.PlaneGeometry=wc;l.PlaneBufferGeometry=nb;l.LatheGeometry=Xc;l.LatheBufferGeometry=bc;l.ShapeGeometry=vb;l.ShapeBufferGeometry=wb;l.ExtrudeGeometry=tb;l.ExtrudeBufferGeometry=Qa;l.EdgesGeometry=cc;l.ConeGeometry=Yc;l.ConeBufferGeometry=Zc;l.CylinderGeometry=xb;l.CylinderBufferGeometry=Ya;l.CircleGeometry=$c;l.CircleBufferGeometry=dc;l.BoxGeometry=
Kb;l.BoxBufferGeometry=mb;l.ShadowMaterial=yb;l.SpriteMaterial=eb;l.RawShaderMaterial=ec;l.ShaderMaterial=ua;l.PointsMaterial=Fa;l.MeshPhysicalMaterial=zb;l.MeshStandardMaterial=Ra;l.MeshPhongMaterial=Ga;l.MeshToonMaterial=Ab;l.MeshNormalMaterial=Bb;l.MeshLambertMaterial=Cb;l.MeshDepthMaterial=ab;l.MeshDistanceMaterial=bb;l.MeshBasicMaterial=ka;l.LineDashedMaterial=Db;l.LineBasicMaterial=V;l.Material=H;l.Float64BufferAttribute=vc;l.Float32BufferAttribute=A;l.Uint32BufferAttribute=lb;l.Int32BufferAttribute=
uc;l.Uint16BufferAttribute=kb;l.Int16BufferAttribute=tc;l.Uint8ClampedBufferAttribute=sc;l.Uint8BufferAttribute=rc;l.Int8BufferAttribute=qc;l.BufferAttribute=Q;l.ArcCurve=fc;l.CatmullRomCurve3=ja;l.CubicBezierCurve=Ia;l.CubicBezierCurve3=Sa;l.EllipseCurve=Aa;l.LineCurve=xa;l.LineCurve3=Ja;l.QuadraticBezierCurve=Ka;l.QuadraticBezierCurve3=Ta;l.SplineCurve=La;l.REVISION="96";l.MOUSE={LEFT:0,MIDDLE:1,RIGHT:2};l.CullFaceNone=0;l.CullFaceBack=1;l.CullFaceFront=2;l.CullFaceFrontBack=3;l.FrontFaceDirectionCW=
0;l.FrontFaceDirectionCCW=1;l.BasicShadowMap=0;l.PCFShadowMap=1;l.PCFSoftShadowMap=2;l.FrontSide=0;l.BackSide=1;l.DoubleSide=2;l.FlatShading=1;l.SmoothShading=2;l.NoColors=0;l.FaceColors=1;l.VertexColors=2;l.NoBlending=0;l.NormalBlending=1;l.AdditiveBlending=2;l.SubtractiveBlending=3;l.MultiplyBlending=4;l.CustomBlending=5;l.AddEquation=100;l.SubtractEquation=101;l.ReverseSubtractEquation=102;l.MinEquation=103;l.MaxEquation=104;l.ZeroFactor=200;l.OneFactor=201;l.SrcColorFactor=202;l.OneMinusSrcColorFactor=
203;l.SrcAlphaFactor=204;l.OneMinusSrcAlphaFactor=205;l.DstAlphaFactor=206;l.OneMinusDstAlphaFactor=207;l.DstColorFactor=208;l.OneMinusDstColorFactor=209;l.SrcAlphaSaturateFactor=210;l.NeverDepth=0;l.AlwaysDepth=1;l.LessDepth=2;l.LessEqualDepth=3;l.EqualDepth=4;l.GreaterEqualDepth=5;l.GreaterDepth=6;l.NotEqualDepth=7;l.MultiplyOperation=0;l.MixOperation=1;l.AddOperation=2;l.NoToneMapping=0;l.LinearToneMapping=1;l.ReinhardToneMapping=2;l.Uncharted2ToneMapping=3;l.CineonToneMapping=4;l.UVMapping=300;
l.CubeReflectionMapping=301;l.CubeRefractionMapping=302;l.EquirectangularReflectionMapping=303;l.EquirectangularRefractionMapping=304;l.SphericalReflectionMapping=305;l.CubeUVReflectionMapping=306;l.CubeUVRefractionMapping=307;l.RepeatWrapping=1E3;l.ClampToEdgeWrapping=1001;l.MirroredRepeatWrapping=1002;l.NearestFilter=1003;l.NearestMipMapNearestFilter=1004;l.NearestMipMapLinearFilter=1005;l.LinearFilter=1006;l.LinearMipMapNearestFilter=1007;l.LinearMipMapLinearFilter=1008;l.UnsignedByteType=1009;
l.ByteType=1010;l.ShortType=1011;l.UnsignedShortType=1012;l.IntType=1013;l.UnsignedIntType=1014;l.FloatType=1015;l.HalfFloatType=1016;l.UnsignedShort4444Type=1017;l.UnsignedShort5551Type=1018;l.UnsignedShort565Type=1019;l.UnsignedInt248Type=1020;l.AlphaFormat=1021;l.RGBFormat=1022;l.RGBAFormat=1023;l.LuminanceFormat=1024;l.LuminanceAlphaFormat=1025;l.RGBEFormat=1023;l.DepthFormat=1026;l.DepthStencilFormat=1027;l.RGB_S3TC_DXT1_Format=33776;l.RGBA_S3TC_DXT1_Format=33777;l.RGBA_S3TC_DXT3_Format=33778;
l.RGBA_S3TC_DXT5_Format=33779;l.RGB_PVRTC_4BPPV1_Format=35840;l.RGB_PVRTC_2BPPV1_Format=35841;l.RGBA_PVRTC_4BPPV1_Format=35842;l.RGBA_PVRTC_2BPPV1_Format=35843;l.RGB_ETC1_Format=36196;l.RGBA_ASTC_4x4_Format=37808;l.RGBA_ASTC_5x4_Format=37809;l.RGBA_ASTC_5x5_Format=37810;l.RGBA_ASTC_6x5_Format=37811;l.RGBA_ASTC_6x6_Format=37812;l.RGBA_ASTC_8x5_Format=37813;l.RGBA_ASTC_8x6_Format=37814;l.RGBA_ASTC_8x8_Format=37815;l.RGBA_ASTC_10x5_Format=37816;l.RGBA_ASTC_10x6_Format=37817;l.RGBA_ASTC_10x8_Format=37818;
l.RGBA_ASTC_10x10_Format=37819;l.RGBA_ASTC_12x10_Format=37820;l.RGBA_ASTC_12x12_Format=37821;l.LoopOnce=2200;l.LoopRepeat=2201;l.LoopPingPong=2202;l.InterpolateDiscrete=2300;l.InterpolateLinear=2301;l.InterpolateSmooth=2302;l.ZeroCurvatureEnding=2400;l.ZeroSlopeEnding=2401;l.WrapAroundEnding=2402;l.TrianglesDrawMode=0;l.TriangleStripDrawMode=1;l.TriangleFanDrawMode=2;l.LinearEncoding=3E3;l.sRGBEncoding=3001;l.GammaEncoding=3007;l.RGBEEncoding=3002;l.LogLuvEncoding=3003;l.RGBM7Encoding=3004;l.RGBM16Encoding=
3005;l.RGBDEncoding=3006;l.BasicDepthPacking=3200;l.RGBADepthPacking=3201;l.TangentSpaceNormalMap=0;l.ObjectSpaceNormalMap=1;l.CubeGeometry=Kb;l.Face4=function(a,b,c,d,e,f,g){console.warn("THREE.Face4 has been removed. A THREE.Face3 will be created instead.");return new Va(a,b,c,e,f,g)};l.LineStrip=0;l.LinePieces=1;l.MeshFaceMaterial=function(a){console.warn("THREE.MeshFaceMaterial has been removed. Use an Array instead.");return a};l.MultiMaterial=function(a){void 0===a&&(a=[]);console.warn("THREE.MultiMaterial has been removed. Use an Array instead.");
a.isMultiMaterial=!0;a.materials=a;a.clone=function(){return a.slice()};return a};l.PointCloud=function(a,b){console.warn("THREE.PointCloud has been renamed to THREE.Points.");return new Qb(a,b)};l.Particle=function(a){console.warn("THREE.Particle has been renamed to THREE.Sprite.");return new Cc(a)};l.ParticleSystem=function(a,b){console.warn("THREE.ParticleSystem has been renamed to THREE.Points.");return new Qb(a,b)};l.PointCloudMaterial=function(a){console.warn("THREE.PointCloudMaterial has been renamed to THREE.PointsMaterial.");
return new Fa(a)};l.ParticleBasicMaterial=function(a){console.warn("THREE.ParticleBasicMaterial has been renamed to THREE.PointsMaterial.");return new Fa(a)};l.ParticleSystemMaterial=function(a){console.warn("THREE.ParticleSystemMaterial has been renamed to THREE.PointsMaterial.");return new Fa(a)};l.Vertex=function(a,b,c){console.warn("THREE.Vertex has been removed. Use THREE.Vector3 instead.");return new p(a,b,c)};l.DynamicBufferAttribute=function(a,b){console.warn("THREE.DynamicBufferAttribute has been removed. Use new THREE.BufferAttribute().setDynamic( true ) instead.");
return(new Q(a,b)).setDynamic(!0)};l.Int8Attribute=function(a,b){console.warn("THREE.Int8Attribute has been removed. Use new THREE.Int8BufferAttribute() instead.");return new qc(a,b)};l.Uint8Attribute=function(a,b){console.warn("THREE.Uint8Attribute has been removed. Use new THREE.Uint8BufferAttribute() instead.");return new rc(a,b)};l.Uint8ClampedAttribute=function(a,b){console.warn("THREE.Uint8ClampedAttribute has been removed. Use new THREE.Uint8ClampedBufferAttribute() instead.");return new sc(a,
b)};l.Int16Attribute=function(a,b){console.warn("THREE.Int16Attribute has been removed. Use new THREE.Int16BufferAttribute() instead.");return new tc(a,b)};l.Uint16Attribute=function(a,b){console.warn("THREE.Uint16Attribute has been removed. Use new THREE.Uint16BufferAttribute() instead.");return new kb(a,b)};l.Int32Attribute=function(a,b){console.warn("THREE.Int32Attribute has been removed. Use new THREE.Int32BufferAttribute() instead.");return new uc(a,b)};l.Uint32Attribute=function(a,b){console.warn("THREE.Uint32Attribute has been removed. Use new THREE.Uint32BufferAttribute() instead.");
return new lb(a,b)};l.Float32Attribute=function(a,b){console.warn("THREE.Float32Attribute has been removed. Use new THREE.Float32BufferAttribute() instead.");return new A(a,b)};l.Float64Attribute=function(a,b){console.warn("THREE.Float64Attribute has been removed. Use new THREE.Float64BufferAttribute() instead.");return new vc(a,b)};l.ClosedSplineCurve3=xf;l.SplineCurve3=yf;l.Spline=ye;l.AxisHelper=function(a){console.warn("THREE.AxisHelper has been renamed to THREE.AxesHelper.");return new nd(a)};
l.BoundingBoxHelper=function(a,b){console.warn("THREE.BoundingBoxHelper has been deprecated. Creating a THREE.BoxHelper instead.");return new Fb(a,b)};l.EdgesHelper=function(a,b){console.warn("THREE.EdgesHelper has been removed. Use THREE.EdgesGeometry instead.");return new Z(new cc(a.geometry),new V({color:void 0!==b?b:16777215}))};l.WireframeHelper=function(a,b){console.warn("THREE.WireframeHelper has been removed. Use THREE.WireframeGeometry instead.");return new Z(new Sb(a.geometry),new V({color:void 0!==
b?b:16777215}))};l.XHRLoader=function(a){console.warn("THREE.XHRLoader has been renamed to THREE.FileLoader.");return new Ha(a)};l.BinaryTextureLoader=function(a){console.warn("THREE.BinaryTextureLoader has been renamed to THREE.DataTextureLoader.");return new ce(a)};l.GeometryUtils={merge:function(a,b,c){console.warn("THREE.GeometryUtils: .merge() has been moved to Geometry. Use geometry.merge( geometry2, matrix, materialIndexOffset ) instead.");if(b.isMesh){b.matrixAutoUpdate&&b.updateMatrix();
var d=b.matrix;b=b.geometry}a.merge(b,d,c)},center:function(a){console.warn("THREE.GeometryUtils: .center() has been moved to Geometry. Use geometry.center() instead.");return a.center()}};l.Projector=function(){console.error("THREE.Projector has been moved to /examples/js/renderers/Projector.js.");this.projectVector=function(a,b){console.warn("THREE.Projector: .projectVector() is now vector.project().");a.project(b)};this.unprojectVector=function(a,b){console.warn("THREE.Projector: .unprojectVector() is now vector.unproject().");
a.unproject(b)};this.pickingRay=function(){console.error("THREE.Projector: .pickingRay() is now raycaster.setFromCamera().")}};l.CanvasRenderer=function(){console.error("THREE.CanvasRenderer has been moved to /examples/js/renderers/CanvasRenderer.js");this.domElement=document.createElementNS("http://www.w3.org/1999/xhtml","canvas");this.clear=function(){};this.render=function(){};this.setClearColor=function(){};this.setSize=function(){}};l.SceneUtils={createMultiMaterialObject:function(){console.error("THREE.SceneUtils has been moved to /examples/js/utils/SceneUtils.js")},
detach:function(){console.error("THREE.SceneUtils has been moved to /examples/js/utils/SceneUtils.js")},attach:function(){console.error("THREE.SceneUtils has been moved to /examples/js/utils/SceneUtils.js")}};l.LensFlare=function(){console.error("THREE.LensFlare has been moved to /examples/js/objects/Lensflare.js")};Object.defineProperty(l,"__esModule",{value:!0})});

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
/**
 * @file jquery.translate.js
 * @brief jQuery plugin to translate text in the client side.
 * @author Manuel Fernandes
 * @site
 * @version 0.9
 * @license MIT license <http://www.opensource.org/licenses/MIT>
 *
 * translate.js is a jQuery plugin to translate text in the client side.
 *
 */

(function($){
  $.fn.translate = function(options) {

    var that = this; //a reference to ourselves
	
    var settings = {
      css: "trn",
      lang: "en"/*,
      t: {
        "translate": {
          pt: "tradução",
          br: "tradução"
        }
      }*/
    };
    settings = $.extend(settings, options || {});
    if (settings.css.lastIndexOf(".", 0) !== 0)   //doesn't start with '.'
      settings.css = "." + settings.css;
       
    var t = settings.t;
 
    //public methods
    this.lang = function(l) {
      if (l) {
        settings.lang = l;
        this.translate(settings);  //translate everything
      }
        
      return settings.lang;
    };


    this.get = function(index) {
      var res = index;

      try {
        res = t[index][settings.lang];
      }
      catch (err) {
        //not found, return index
        return index;
      }
      
      if (res)
        return res;
      else
        return index;
    };

    this.g = this.get;


    
    //main
    this.find(settings.css).each(function(i) {
      var $this = $(this);

      var trn_key = $this.attr("data-trn-key");
      if (!trn_key) {
        trn_key = $this.html();
        $this.attr("data-trn-key", trn_key);   //store key for next time
      }

      $this.html(that.get(trn_key));
    });
    
    
		return this;
		
		

  };
})(jQuery);
// Translation
$(document).ready(function(){
  var dict = {
    "Grow your<br>business with us" : {
      ru: "Развивайте свой <br>бизнес вместе с нами"
    },
    "It seems like you are looking for a top-notch, unique and high-performance website. <br> We are ready. Are you?" : {
      ru: "Похоже, вы ищете первоклассный, уникальный и высокопроизводительный веб-сайт. <br> Мы готовы. А Вы?"
    },
    "Hire us": {
      ru: "Нанять нас"
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
    "Send": {
      ru: "Отправить"
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
			url: "../mail.php",
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
    targets: '.pop-up__close',
    opacity: 1,
    easing: 'linear',
    duration: 200,
    delay: 1400
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
  setTimeout(function() {
    $('.wrapper').removeClass('overflow');
  }, 1850);
});
$('.js-popup-close').on('click', function () {
  $('#homepage-bg-animation').css('display', 'block');
  $('.wrapper').addClass('overflow');
  anime({
    targets: '.pop-up',
    translateY: '100%',
    opacity: 0,
    easing: 'linear',
    delay: 600,
    duration: 200
  });
  anime({
    targets: '.pop-up__close',
    opacity: 0
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
  $('.wrapper').addClass('overflow');
  $('.pop-up').css('opacity', '1');
  $(['.pop-up__close','.pop-up__title', '.pop-up__subtitle', '.list-form .list-form__field', '.list-form .btn'].join(", ")).css('opacity', '0');
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