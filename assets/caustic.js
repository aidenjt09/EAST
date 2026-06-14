(function () {
  var svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
  svg.setAttribute('class', 'pool-caustic');
  svg.setAttribute('aria-hidden', 'true');

  // Static — no <animate> elements.
  // fractalNoise with very low baseFrequency = large organic blobs.
  // Transparent background: gradient shows through; only blobs + white lines drawn.
  svg.innerHTML =
    '<defs>' +
    '<filter id="caustic-f" color-interpolation-filters="sRGB" x="0%" y="0%" width="100%" height="100%">' +
      '<feTurbulence type="fractalNoise" baseFrequency="0.004 0.003" numOctaves="2" seed="9" result="n"/>' +
      // outer: visible where noise R > 0.30 (70% of area = blob interior + outline ring)
      '<feColorMatrix in="n" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 10 0 0 0 -3" result="outer"/>' +
      // inner: visible where noise R > 0.50 (50% of area = blob interior only)
      '<feColorMatrix in="n" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 10 0 0 0 -5" result="inner"/>' +
      // ring = outer minus inner → the white caustic-line zone (20% of area)
      '<feComposite in="outer" in2="inner" operator="out" result="ring"/>' +
      // blob interior: slightly deeper blue-cyan
      '<feFlood flood-color="#0080a0" result="blob-clr"/>' +
      '<feComposite in="blob-clr" in2="inner" operator="in" result="blobs"/>' +
      // caustic lines: bright white
      '<feFlood flood-color="#ffffff" result="line-clr"/>' +
      '<feComposite in="line-clr" in2="ring" operator="in" result="lines"/>' +
      // no background flood → transparent, body gradient shows through
      '<feMerge>' +
        '<feMergeNode in="blobs"/>' +
        '<feMergeNode in="lines"/>' +
      '</feMerge>' +
    '</filter>' +
    '</defs>' +
    '<rect width="100%" height="100%" filter="url(#caustic-f)"/>';

  document.body.prepend(svg);
})();
