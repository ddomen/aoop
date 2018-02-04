const utils = require('./Utils');

function Interface(obj,constrain){
  let props = Object.getOwnPropertyNames(utils.getProto(obj)||{}).filter(x=>typeof obj[x]=='function'),ext=[];
  if(!constrain){
    ext[0] = class{
      constructor(force){
        for(var prop of props){
          if(typeof this[prop]=='undefined'){
            if(!force){throw new InterfaceError('Method called "'+prop+'" not found ( Interface need this object\'s costructor to create it ) ')}
            else{this[prop] = obj[prop]}
          }
        }
      }
    };
  }
  else{
    ext[0] = class{};
    utils.copyProto(ext[0],obj&&obj.prototype?obj.prototype:{prototype:obj})
  }
  return ext[0];
}

class InterfaceError extends Error{constructor(message){super(message);this.name='InterfaceError';}}
Interface.Error = InterfaceError;

module.exports = Interface;
