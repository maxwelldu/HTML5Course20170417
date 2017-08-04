import _ from 'lodash'

function component() {
  var element = document.createElement('div');
  element.innerHTML = _.join(['Hello', '张美'], ' ');
  return element;
}
document.body.appendChild(component());
