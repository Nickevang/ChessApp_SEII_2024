(function(root, factory) {
  if (typeof define === 'function' && define.amd) {
    // AMD (Asynchronous Module Definition) environment
    define(factory);
  } else if (typeof module === 'object' && module.exports) {
    // CommonJS environment, such as Node.js
    module.exports = factory();
  } else {
    // Browser environment, attaching to the global object (e.g., `window`)
    root.assertEquals = factory();
  }
}(this, function() {
  'use strict';

  /**
   * Compares two values (or objects) for equality.
   * If a discrepancy is found, throws an error with a detailed message.
   * @param {*} expected - The expected value.
   * @param {*} actual - The actual value.
   * @param {string} [ptr] - Optional pointer for error tracking.
   */
  var assertEquals = function(expected, actual, ptr) {
    if (!ptr)
      ptr = ""; // Default to an empty pointer
    if (actual === expected)
      return; // Values are equal, no further checks needed

    // Handle Date objects by converting to ISO strings for comparison
    if (expected instanceof Date || actual instanceof Date) {
      expected = toISODateString(expected);
      actual = toISODateString(actual);
      if (actual !== expected)
        fail(expected, actual, ptr, "date value incorrect;");
    }

    // Handle primitive types and simple mismatches
    if (!expected || !actual || typeof expected != 'object' && typeof actual != 'object') {
      if (typeof actual != typeof expected)
        fail(typeof expected, typeof actual, ptr, "value type incorrect;");
      if (actual != expected)
        fail(expected, actual, ptr, "value incorrect;");
    }

    // For objects, perform a deep comparison
    return checkObject(expected, actual, ptr);
  }

  /**
   * Converts a Date object to an ISO string without milliseconds.
   * @param {*} value - The value to convert.
   * @returns {string} ISO-formatted date string.
   */
  function toISODateString(value) {
    if (value instanceof Date) {
      // Remove milliseconds from ISO string for strict equality
      value = value.toISOString().replace('.000', '');
    }
    return value;
  }

  /**
   * Performs a deep comparison of two objects, including their keys and values.
   * Throws an error if any discrepancies are found.
   * @param {Object} expected - The expected object.
   * @param {Object} actual - The actual object.
   * @param {string} ptr - Pointer for error tracking.
   */
  function checkObject(expected, actual, ptr) {
    if (undefOrNull(expected) || undefOrNull(actual))
      fail(expected, actual, ptr, "missing value;");
    if (typeof expected !== typeof actual)
      fail(typeof expected, typeof actual, ptr, "wrong type;");
    if (expected.prototype !== actual.prototype)
      fail(expected.prototype, actual.prototype, ptr, "wrong prototype;");

    // Compare keys of both objects
    try {
      var expectedKeys = Object.keys(expected);
      var actualKeys = Object.keys(actual);
    } catch (e) {
      fail(expectedKeys, actualKeys, ptr, "wrong keys;");
    }
    if (actualKeys.length != expectedKeys.length)
      fail(expectedKeys.length, actualKeys.length, ptr, "key count incorrect;");
    
    // Ensure keys match and are in the same order
    expectedKeys.sort();
    actualKeys.sort();
    for (var i = 0; i < expectedKeys.length; i++) {
      if (actualKeys[i] != expectedKeys[i])
        fail(expectedKeys, actualKeys, ptr, "wrong keys;");
    }

    // Recursively compare values for each key
    for (i = 0; i < expectedKeys.length; i++) {
      var key = expectedKeys[i];
      assertEquals(expected[key], actual[key], ptr + '/' + key);
    }
  }

  /**
   * Checks if a value is undefined or null.
   * @param {*} v - The value to check.
   * @returns {boolean} True if undefined or null, otherwise false.
   */
  function undefOrNull(v) {
    return v === undefined || v === null;
  }

  /**
   * Throws an error with a descriptive message about a failed assertion.
   * @param {*} expected - The expected value.
   * @param {*} actual - The actual value.
   * @param {string} ptr - Pointer for tracking the error location.
   * @param {string} msg - Additional message describing the error.
   */
  function fail(expected, actual, ptr, msg) {
    var text = ptr + ' ' + msg + " expected: " + expected + ", actual: " + actual;
    console.log(text);
    throw new Error(text);
  }

  return assertEquals;
}));
