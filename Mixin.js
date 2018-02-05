const utils = require('./Utils');

module.exports = function Mixin(A,B,...cls){
  if(cls.length>=2){return mixin(A,B,mixin(...cls))}
  else if(cls.length==1){return mixin(A,mixin(B,...cls))}

  let ext = [class{
    constructor(...args){
      if(typeof A.prototype.onMixin=='function'){A.prototype.onMixin.call(this,A,B,...args)}
      if(typeof B.prototype.onMixin=='function'){B.prototype.onMixin.call(this,A,B,...args)}
    }
  }];
  utils.copyProto(ext[0],B);
  utils.copyProto(ext[0],A);

  return ext[0];
};

module.exports.version = '1.0.0';
