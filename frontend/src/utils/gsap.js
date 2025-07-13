import gsap from "gsap";

// Page transition animation
export function pageTransition(container) {
  const tl = gsap.timeline();

  tl.fromTo(
    container,
    { opacity: 0, y: 20 },
    { opacity: 1, y: 0, duration: 0.6, ease: "power2.out" }
  );

  return tl;
}

// Staggered items animation
export function staggerItems(items, container) {
  const tl = gsap.timeline();

  tl.fromTo(
    items,
    { opacity: 0, y: 30 },
    {
      opacity: 1,
      y: 0,
      stagger: 0.1,
      duration: 0.6,
      ease: "power2.out",
    }
  );

  return tl;
}

// Hover animation for product cards
export function hoverAnimation(element) {
  const tl = gsap.timeline({ paused: true });

  tl.to(element.querySelector("img"), {
    scale: 1.05,
    duration: 0.3,
    ease: "power2.out",
  });

  return tl;
}
