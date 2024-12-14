export { easeInBack, easeInOutBack, easeOutBack } from "./easing/back";
export { easeInBounce, easeInOutBounce, easeOutBounce } from "./easing/bounce";
export { easeInCirc, easeInOutCirc, easeOutCirc } from "./easing/circ";
export { easeInCubic, easeInOutCubic, easeOutCubic } from "./easing/cubic";
export { easeInElastic, easeInOutElastic, easeOutElastic, } from "./easing/elastic";
export { easeInExpo, easeInOutExpo, easeOutExpo } from "./easing/expo";
export { easeInLinear, easeInOutLinear, easeOutLinear } from "./easing/linear";
export { easeInQuad, easeInOutQuad, easeOutQuad } from "./easing/quad";
export { easeInQuart, easeInOutQuart, easeOutQuart } from "./easing/quart";
export { easeInQuint, easeInOutQuint, easeOutQuint } from "./easing/quint";
export { easeInSine, easeInOutSine, easeOutSine } from "./easing/sine";
declare const easing: {
    back: {
        easeIn: import("./types").EasingFunction;
        easeOut: import("./types").EasingFunction;
        easeInOut: import("./types").EasingFunction;
    };
    bounce: {
        easeIn: import("./types").EasingFunction;
        easeOut: import("./types").EasingFunction;
        easeInOut: import("./types").EasingFunction;
    };
    circ: {
        easeIn: import("./types").EasingFunction;
        easeOut: import("./types").EasingFunction;
        easeInOut: import("./types").EasingFunction;
    };
    cubic: {
        easeIn: import("./types").EasingFunction;
        easeOut: import("./types").EasingFunction;
        easeInOut: import("./types").EasingFunction;
    };
    elastic: {
        easeIn: import("./types").EasingFunction;
        easeOut: import("./types").EasingFunction;
        easeInOut: import("./types").EasingFunction;
    };
    expo: {
        easeIn: import("./types").EasingFunction;
        easeOut: import("./types").EasingFunction;
        easeInOut: import("./types").EasingFunction;
    };
    linear: {
        easeIn: import("./types").EasingFunction;
        easeOut: import("./types").EasingFunction;
        easeInOut: import("./types").EasingFunction;
    };
    quad: {
        easeIn: import("./types").EasingFunction;
        easeOut: import("./types").EasingFunction;
        easeInOut: import("./types").EasingFunction;
    };
    quart: {
        easeIn: import("./types").EasingFunction;
        easeOut: import("./types").EasingFunction;
        easeInOut: import("./types").EasingFunction;
    };
    quint: {
        easeIn: import("./types").EasingFunction;
        easeOut: import("./types").EasingFunction;
        easeInOut: import("./types").EasingFunction;
    };
    sine: {
        easeIn: import("./types").EasingFunction;
        easeOut: import("./types").EasingFunction;
        easeInOut: import("./types").EasingFunction;
    };
};
export default easing;
