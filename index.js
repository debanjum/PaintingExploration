// This effect lets you zoom in on a particular spot on the target - you define the scale and the origin as an Array of x/y normalized values.
// Like {scale: 3, origin: [0.25, 0.8]} will zoom in on the spot that's 25% from the left, and 80% from the top of the element/image.
// It will return an animation that controls the xPercent, yPercent, and scale (as well as any other values you pass in, like a normal tween)
// It won't let the edges collapse toward the center. It's best to put the element into a container that has overflow: hidden.
gsap.registerEffect({
  name: "zoom",
  effect: (targets, config) => {
    const vars = {transformOrigin: "0px 0px", ...config},
          { scale, origin } = config,
          clamp = gsap.utils.clamp(-100 * (scale - 1), 0);
    delete vars.origin;
    vars.xPercent = clamp((0.5 - origin[0] * scale) * 100);
    vars.yPercent = clamp((0.5 - origin[1] * scale) * 100);
    vars.overwrite = "auto";
    return gsap.to(targets, vars);
  },
  extendTimeline: true,
  defaults: {origin: [0.5, 0.5], scale: 2}
});

// for each section, we define the zoom data here
const zoomData = [
  {scale: 1, origin: [0.5, 0.5]},
  {scale: 3.5, origin: [0.27, 0.75]},
  {scale: 5.5, origin: [0.21, 0.41]},
  {scale: 3.6, origin: [0.805, 0.26]}
];

// now loop through each section and create the ScrollTrigger accordingly.
// when that section enters from either direction, it'll fire off the zoom animation.
gsap.utils.toArray("section").forEach((section, index) => {
  const zoom = zoomData[index];
  ScrollTrigger.create({
    trigger: section,
    start: "top 90%",
    end: "+=95%",
    onToggle(self) {
      if (self.isActive) { // if it enters forward or backward
        gsap.effects.zoom("#painting img", {
          scale: zoom.scale,
          origin: zoom.origin,
          duration: 1,
          ease: "power1.inOut"
        });
      }
    }
  });
});
