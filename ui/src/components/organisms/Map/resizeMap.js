const resize = (e, mapWrap) => {
  mapWrap.style.height = `${window.innerHeight - e.clientY - 5}px`;
};

const stopResize = () => {
  document.removeEventListener('mousemove', resize);
}

export const resizeMap = (resizeBar, mapWrap) => {
  resizeBar.addEventListener('mousedown', () => {
    document.addEventListener('mousemove', e => resize(e, mapWrap));
  });

  resizeBar.addEventListener('mouseup', stopResize);

};
