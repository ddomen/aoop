# AOOP
[![License](https://img.shields.io/badge/License-MIT-1a237e.svg)](./LICENSE)
[![Email](https://img.shields.io/badge/Contact-email-00897b.svg)](mailto:daniele.domenichelli.5+ddomen@gmail.com)
[![Donate](https://img.shields.io/badge/Donate-PayPal-4caf50.svg)](https://www.paypal.com/cgi-bin/webscr?cmd=_donations&business=6QCNG6UMSRCPC&lc=GB&item_name=ddomen&item_number=aoop&no_note=0&cn=Add%20a%20message%3a&no_shipping=2&currency_code=EUR&bn=PP%2dDonationsBF%3abtn_donate_SM%2egif%3aNonHosted)
[![Donate](https://img.shields.io/badge/Donate-bitcoin-4caf50.svg)](https://blockchain.info/payment_request?address=1FTkcYbdwsHEbJBS3c1xD62KKCKskT14AE&amount_local=5&currency=EUR&nosavecurrency=true&message=ddomen%20software)

**Augmented Object Oriented Programming**
This node module allow programmers to use some of Object Oriented tecniques on JavaScript (Prototype Oriented)

## Getting Started
### Installing
This library is easy to install by cloning the repo or installing it through npm too:

Local installation
```
npm install aoop
```
Global installation
```
npm install -g aoop
```
### Usage
* **Require**
```javascript
const aoop = require('aoop');

//aoop module contains this elements:
//{
//  Mixin:[Function],
//  Interface:[Function],
//  Utils:{
//    copyProto:[Function],
//    copyAsProto: [Function],
//    extend: [Function],
//    getProto: [Function],
//    isClass: [Function]
//  }
//}

```
* **Mixin**  `Mixin(class A,class B,[... classes])`

This function takes all methods from two or more classes (or constructor functions) and create another one that inherits all of them from the mixins classes. Remember that the hierarchy of inheritance goes from left to right
```javascript
const { Mixin } = require('aoop');

//creating two classes A and B
//class A created as constructor function
function A(){}
A.prototype.foo = function(){console.log('foo');};
A.prototype.baz = function(){console.log('Baz from A!');};

//class B created as ES6 class
class B{
  bar(){console.log('bar');}
  baz(){console.log('Baz from B!');}
}

//USING MIXIN
//class C created as class
const C = new Mixin(A,B);
//class D created as ES6 class
class D extends Mixin(B,A){}

//TESTING INSTANCES
var c = new C();
var d = new D();

c.foo();  //foo
c.bar();  //bar
c.baz();  //Baz from A! (the Mixin(A,B) takes A > B hierachy)

d.foo();  //foo
d.bar();  //bar
d.baz();  //Baz from B! (the Mixin(B,A) takes B > A hierachy)
```
* **Interface**  `Interface(proto, constrain)`

This function constrain a constructor of a class (or a particular object) to have some methods defined in the `proto` argument. `constrain` argument tell the Interface to instanciate methods from his `proto` to the extended class.
You can create an object from an Interface too using default methods described in the Interface `proto`. The Interface's instance constructor take a `force` argument to tell the instance to use Interface's `proto` defaults methods.
```javascript
const { Interface, Utils } = require('aoop');

//Creating Interface that must have "bye" method
var proto = {
bye(){console.log('good bye from Hello')}
};
const Hello = new Interface(proto);

//as Function without "bye" method
function A(){Hello.call(this);}
Utils.extend(A,Hello);

//as Function with "bye" method
function B(){Hello.call(this);}
Utils.extend(B,Hello);
B.prototype.bye = function(){console.log('good bye from B');};

//as Function with defaults methods (passing "force" argument to Hello Interface)
function C(){Hello.call(this,true);}
Utils.extend(C,Hello);

//as class without "bye" method
class D extends Hello{}

//as class with "bye" method
class E extends Hello{bye(){console.log('good bye from E');}}

//as class with Hello defaults methods (passing "force" argument to Hello Interface)
class F extends Hello{constructor(){super(true);}}

var a = new A();  //throw an InterfaceError becaues is missing "bye" method
var b = new B();
var c = new C();
var d = new D();  //throw an InterfaceError becaues is missing "bye" method
var e = new E();
var f = new F();
var h = new Hello(true); //generate an Interface instance by passing true as "force" argument

b.bye();  //good bye from B
c.bye();  //good bye from Hello
e.bye();  //good bye from E
f.bye();  //good bye from Hello
h.bye();  //good bye from Hello
```

* **Property**  `Property(reference, properties)`

This class allow to deal with a `reference` object property with some helping methods.

A Property can change this descriptors with corresponding method:
  - enumerable *( visibility in iterable objects and for loops )*
  - writable *( possibility to change property value )*
  - configurable *( possibility to change property descriptors )*

A Property has some particular methods (accessor) to easily modify descriptors and value accessor:
  - readonly *( possibility to chage descriptors )*
  - lock / unlock *( possibility to change any descriptor or value accessor )*
  - lockConfiguration *( locks property descriptors - WARN this operation can't be restored )*
  - getter *( a function(value) that compute the reading value when requested - WARN the getter function must have exactly one parameter )*
  - setter *( a function(newValue, oldValue) that compute writing value when requested - WARN the setter function must have exactly two parameters )*

Every both descriptors and accessors methods have a getter and setter duality: if no argument is passed the function return the value, for example `property.enumerable()` return `true|false`. If an argument is passed the function set the correct value and then return th Property reference, making possible the concatention; for example `property.enumerable(true).writable(false).lock()`.

For retrive a private property you need to store the Property reference and pass it to `Property.getValue(Property)` static method. To set a private property just pass the Property reference to `Property.setValue(Property, value)` and give it a value. Remember that descriptors and accessors still apply on those static methods.

A Property can be forced to be of a certain type, a `Number` for example. It is possible to set a `type [function(value)]` to costrain the setted value to be parsed. It is possible to pass a string as `object|string|number|boolean|function|any` to force the value to those types or passing own function *( WARN the type function must have exactly one parameter )*.

```javascript
const { Property } = require('aoop');

var x = {};
var publicProp = 
  new Property(x,{name:'public',value:4});
var privateProp = 
  new Property(x,{name:'private',value:'this is a private property',accessor:'private'})
var publicProp2 = 
  new Property(x,{name:'public2',value:'another public non writable property',writable:false})
var publicProp3 = 
  new Property(x,{name:'public3',value:'another public readonly property',readonly:true})

console.log(x.public);  // 4
console.log(x.public2);  // "another public non writable property"
console.log(x.public3);  // "another public readonly property"
console.log(x.private); // undefined
console.log(Property.getValue(privateProp)) // "this is a private property"

x.public = 5;
x.public2 = 'I can\'t change non writtable property';
x.public3 = 'I can\'t change readonly property';
x.private = 'I can\'t change private property in this way';
console.log(x.public);  // 5
console.log(x.public2); // "another public non writable property"
console.log(x.public3); // "another public readonly property"
console.log(x.private); // undefined
console.log(Property.getValue(privateProp)) // "this is a private property"

publicProp.writable(false);
publicProp2.writable(true);
publicProp3.writable(true);
x.public = 'Now I can\'t change this property';
x.public2 = 'And now I can change this property';
x.public3 = 'But still can\'t change this readonly property';
Property.setValue(privateProp,'I can change private property so')
console.log(x.public);  // 5
console.log(x.public2);  // "And now I can change this property"
console.log(x.public3);  // "another public readonly property"
console.log(x.private); // undefined
console.log(Property.getValue(privateProp)) // "I can change private property so"
```

* **Utils**
This object is a library of some tools for deal with functions.

  * `copyProto(A,B)`: get and copy the prototype of B to A
  
  * `copyAsProto(A,B)`: copy directly object B to A as prototype object
  
  * `extend(A,B)`: extend the A function with prototype of B
  
  * `getProto(A)`: return the correct proto of the function A
  
  * `isClass(A)`: return `true` if the A function is an ES6 class object or `false` if it is a normal JavaScript function

## Contacts
If you like the project feel free to contact me on my [![Email](https://img.shields.io/badge/Contact-email-00897b.svg)](mailto:daniele.domenichelli.5+ddomen@gmail.com).

Something gone wrong? Feel free to rise an issue!

Did you like this project and it was usefull? Help me improve my work:

[![Donate](https://img.shields.io/badge/Donate-PayPal-4caf50.svg)](https://www.paypal.com/cgi-bin/webscr?cmd=_donations&business=6QCNG6UMSRCPC&lc=GB&item_name=ddomen&item_number=aoop&no_note=0&cn=Add%20a%20message%3a&no_shipping=2&currency_code=EUR&bn=PP%2dDonationsBF%3abtn_donate_SM%2egif%3aNonHosted)
[![Donate](https://img.shields.io/badge/Donate-bitcoin-4caf50.svg)](https://blockchain.info/payment_request?address=1FTkcYbdwsHEbJBS3c1xD62KKCKskT14AE&amount_local=5&currency=EUR&nosavecurrency=true&message=ddomen%20software)
