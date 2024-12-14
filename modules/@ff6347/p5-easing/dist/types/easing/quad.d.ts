/**
 * Easing Functions adapted from Robert Penner's easing equations.
 * Copyright © 2001 Robert Penner
 * BSD License: http://robertpenner.com/easing_terms_of_use.html
 */
import { EasingFunction } from "../types";
/**
 * Quad in easing function
 * @example
 * const start = 0;
 * const end = 100;
 * const duration = 100;
 * function setup() {
 *  createCanvas(end, end);
 * }
 * function draw() {
 * background(255, 10);
 * const x = easeInQuad(frameCount % duration, start, end, duration);
 * const y = frameCount % duration;
 * circle(x, y, 10);
 * }
 *
 * @returns {number} - The calculated value at the current time.
 */
export declare const easeIn: EasingFunction;
/**
 * Quad out easing function
 * @example
 * const start = 0;
 * const end = 100;
 * const duration = 100;
 * function setup() {
 *  createCanvas(end, end);
 * }
 * function draw() {
 * background(255, 10);
 * const x = easeOutQuad(frameCount % duration, start, end, duration);
 * const y = frameCount % duration;
 * circle(x, y, 10);
 * }
 *
 * @returns {number} - The calculated value at the current time.
 */
export declare const easeOut: EasingFunction;
/**
 * Quad in-out easing function
 * @example
 * const start = 0;
 * const end = 100;
 * const duration = 100;
 * function setup() {
 *  createCanvas(end, end);
 * }
 * function draw() {
 * background(255, 10);
 * const x = easeInOutQuad(frameCount % duration, start, end, duration);
 * const y = frameCount % duration;
 * circle(x, y, 10);
 * }
 *
 * @returns {number} - The calculated value at the current time.
 */
export declare const easeInOut: EasingFunction;
export { easeIn as easeInQuad, easeOut as easeOutQuad, easeInOut as easeInOutQuad, };
