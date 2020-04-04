const resize = (e, mapWrap) => {
  mapWrap.style.height = `${window.innerHeight - e.clientY - 5}px`;
};

export const resizeMap = (mapWrap, resizeBar) => {
  resizeBar.addEventListener('mousedown', () => {
    document.addEventListener('mousemove', e => resize(e, mapWrap));
  });

  resizeBar.addEventListener('mouseup', () => {
    document.removeEventListener('mousemove', e => resize(e, mapWrap));
  });
};
