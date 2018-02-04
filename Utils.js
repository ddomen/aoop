function copyAsProto(A,B){
  for(let prop of Object.getOwnPropertyNames(B)){A[prop] = B[prop];Object.defineProperty(A,prop,{enumerable:0})}
}
function copyProto(A,B){
  for(let prop of Object.getOwnPropertyNames(B.prototype)){
    A.prototype[prop] = B.prototype[prop];
    Object.defineProperty(A.prototype,prop,{enumerable:0})
  }
}

function getProto(obj){
  if(typeof obj=='function'){return obj.prototype}
  else if(obj&&obj.prototype){return obj.prototype}
  else if(obj){return obj}
  return null
}

function isClass(v){return typeof v === 'function' && /^\s*class\s+/.test(v.toString())}

function extend(A,B){copyProto(A,B);return A}

module.exports = {
  copyProto:copyProto,
  copyAsProto:copyAsProto,
  extend:extend,
  getProto:getProto,
  isClass:isClass
};
