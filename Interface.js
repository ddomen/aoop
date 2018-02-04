const utils = require('./Utils');

function Interface(proto,constrain){
  let props = Object.getOwnPropertyNames(utils.getProto(proto)||{}).filter(x=>typeof proto[x]=='function'),ext=[];
  if(!constrain){
    ext[0] = function Interface(force){
      for(var prop of props){
        if(typeof this[prop]=='undefined'){
          if(!force){throw new InterfaceError('Method called "'+prop+'" not found ( Interface need this object\'s costructor to create it ) ')}
          else{Object.defineProperty(this,prop,{enumerable:0,value:proto[prop]})}
        }
      }
    };
  }
  else{
    ext[0] = function(){};
    utils.copyProto(ext[0],proto&&proto.prototype?obj.prototype:{prototype:proto})
  }
  ext[0].interface = Object.assign({},proto);
  return ext[0];
}

class InterfaceError extends Error{constructor(message){super(message);this.name='InterfaceError';}}
Interface.Error = InterfaceError;

module.exports = Interface;
