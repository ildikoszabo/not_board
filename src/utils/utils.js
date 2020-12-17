export function createId(name) {
  //search in sessionstorage for all ids to make sure they are unique?
  const min = 1;
  const max = 100000;
  const rand = min + Math.random() * (max - min);
  let rounded = +rand.toPrecision(1);
  let id = rounded + "_" + hashCode(name);
  return id;
}

function hashCode(str) {
  return str
    .split("")
    .reduce(
      (prevHash, currVal) =>
        ((prevHash << 5) - prevHash + currVal.charCodeAt(0)) | 0,
      0
    );
}
