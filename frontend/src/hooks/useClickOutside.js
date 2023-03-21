const elements = new Map();

document.addEventListener('click', event => Array.from(elements.entries()).forEach(([ref, action]) => {
  if (ref && !ref.contains(event.target)) {
    action();
    elements.delete(ref);
  }
}));

export default (ref, action) => ({
  set: () => elements.set(ref(), action),
  remove: () => elements.delete(ref())
});
