const PropertyAccessor = new WeakMap();

class Property{
  constructor(object,properties){
    if(typeof object=='undefined' || object == null){throw new TypeError('Can\'t associate a property to '+object)}
    var value, enumerable=true, writable=true, configurable=true,
        setter = function(v,w){return v;}, getter = function(v){return v}, locked=false, type=(v)=>v, readonly=false,
        accessor = 'public';

    if(typeof properties=='string'){properties={name:properties};}
    else if(typeof properties!='object' || !properties.name){throw new PropertyError('Property must have a name to be defined')}

    Object.defineProperty(this,'name',{enumerable:1,configurable:0,writable:0,value:properties.name})

    Object.defineProperty(this,'enumerable',{enumerable:1,configurable:0,writable:0,value(v){
      if(typeof v=='undefined'){return enumerable}
      if(!locked&&!readonly&&configurable){enumerable=!!v;Object.defineProperty(object,this.name,{enumerable:enumerable})}
      return this
    }})
    Object.defineProperty(this,'writable',{enumerable:1,configurable:0,writable:0,value(v){
      if(typeof v=='undefined'){return writable}
      if(!locked&&!readonly&&configurable){writable=!!v;}
      return this
    }})
    Object.defineProperty(this,'configurable',{enumerable:1,configurable:0,writable:0,value(v){
      if(typeof v=='undefined'){return configurable}
      if(!locked&&!readonly){configurable=!!v;}
      return this
    }})
    Object.defineProperty(this,'readonly',{enumerable:1,configurable:0,writable:0,value(){
      if(typeof v=='undefined'){return readonly}
      if(!locked){readonly=!!v;}
      return this;
    }})
    Object.defineProperty(this,'type',{enumerable:1,configurable:0,writable:0,value(v){
      if(typeof v=='undefined'){return type}
      if(!locked&&!readonly){
        if(typeof v=='function'){type=v;}
        else if(typeof v!='undefined' && v!=null){
          switch(v.toString().toLowerCase()){
            case 'object':type = Object;
            case 'string':type = String;
            case 'number':type = Number;
            case 'boolean':type = Boolean;
            case 'function':type = (v)=>{if(typeof v=='function'){return v}else{return this.value}}
            case 'any':default:type = (v)=>v;
          }
        }
        else{type = (v)=>v;}
      }
      return this
    }})
    Object.defineProperty(this,'getter',{enumerable:1,configurable:0,writable:0,value(){
      if(typeof v=='undefined'){return getter}
      if(!locked && !readonly && typeof v=='function' && v.length==1){getter = v}
      return this
    }})
    Object.defineProperty(this,'setter',{enumerable:1,configurable:0,writable:0,value(){
      if(typeof v=='undefined'){return setter}
      if(!locked && !readonly && typeof v=='function' && v.length==2){setter = v}
      return this
    }})
    Object.defineProperty(this,'value',{enumerable:1,configurable:0,
      get(){if(this.accessor=='public'){return getter(value)}},
      set(v){if(!locked && !readonly && writable){value = setter(type(v),value)}}
    })

    Object.defineProperty(this,'lockConfiguration',{enumerable:1,configurable:0,writable:0,value(){Object.defineProperty(object,this.name,{configurable:0});return this}})
    Object.defineProperty(this,'lock',{enumerable:1,configurable:0,writable:0,value(){locked=true;return this}})
    Object.defineProperty(this,'unlock',{enumerable:1,configurable:0,writable:0,value(){locked=false;return this}})

    let rightAcc = properties&&properties.accessor||'';
    rightAcc = ['public','private'].includes(rightAcc)?rightAcc:'public';
    Object.defineProperty(this,'accessor',{enumerable:1,configurable:0,writable:0,value:rightAcc})
    Object.defineProperty(object,this.name,{enumerable:enumerable,configurable:1,get:()=>this.value,set:(v)=>this.value=v})

    for(let i in properties){
      if(i == 'name' || i == 'accessor' || (typeof this[i]=='undefined' && i != 'value')){continue}
      this[i] = properties[i]
    }
    if(this.container instanceof WeakMap){this.container.set(object,this.value)}
    PropertyAccessor.set(this,()=>getter(value))
  }

  inspect(){return this.value}
  toString(){return this.value}
  toJSON(){return this.value}
  valueOf(){return this.value}

  static getValue(property){return PropertyAccessor.get(property)()}
}

class PropertyError extends Error{constructor(message){super(message);this.name='PropertyError';}}
Object.defineProperty(Property,'Error',{enumerable:0,configurable:0,writable:0,value:PropertyError})

module.exports = Property;
