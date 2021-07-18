function formatter(objectTree, sep = '\n  ') {
  let out = '';
  objectTree.nodes.forEach((node) => {
    out += printNode(node, sep);
  });
  objectTree.edges.forEach((edge) => {
    out += printEdge(edge, sep);
  });
  return out;
}

function printNode(node, sep) {
  let out = node.id;
  const labels = getLabels(node.labels, sep);
  props = getProps(node.properties, sep);
  if (labels) {
    out += `${sep}${labels}`;
  }
  if (props) {
    out += `${sep}${props}`;
  }
  return out + '\n\n';
}

function printEdge(edge, sep) {
  let out = `${edge.from} ${edge.direction} ${edge.to}`;
  let labels = getLabels(edge.labels, sep);
  props = getProps(edge.properties, sep);
  if (labels) {
    out += `${sep}${labels}`;
  }
  if (props) {
    out += `${sep}${props}`;
  }
  return out + '\n\n';
}

function getLabels(labels, sep) {
  return labels.map(x => `:${x}`).join(sep);
}

function getProps(props, sep) {
  let ret = [];
  Object.entries(props).forEach(([key, vals]) => {
    vals.forEach((val) => {
      ret.push(`${key}: ${val}`);
    });
  });
  return ret.join(sep);
}
