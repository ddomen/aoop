# AOOP
[![Donate](https://img.shields.io/badge/Donate-PayPal-green.svg)](https://www.paypal.com/cgi-bin/webscr?cmd=_donations&business=6QCNG6UMSRCPC&lc=GB&item_name=ddomen&item_number=aoop&no_note=0&cn=Add%20a%20message%3a&no_shipping=2&currency_code=EUR&bn=PP%2dDonationsBF%3abtn_donate_SM%2egif%3aNonHosted)

**Augmented Object Oriented Programming**
This node module allow programmers to use some of Object Oriented tecniques on JavaScript (Prototype Oriented)

## Getting Started
### Installing
For install library is easy to install by cloning the repo. 
You can install trhought npm too:
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
* **Mixin** `Mixin(class A,class B,[... classes])`

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
* **Interface** `Interface(proto, constrain)`

This function constrain a constructor of a class (or a particular object) to have some methods defined in the `proto` argument. `constrain` argument tell the Interface to instanciate methods from his `proto` to the extended class.
You can create an object from an Interface too using default methods described in the Interface `proto`. The Interface's instance constructor take a `force` argument to tell the instance to use Interface's `proto` defaults methods.
```javascript
const { Interface, Utils } = require('./aoop');

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
* **Utils**
This object is a library of some tools for deal with functions.

  * `copyProto(A,B)`: get and copy the prototype of B to A
  
  * `copyAsProto(A,B)`: copy directly object B to A as prototype object
  
  * `extend(A,B)`: extend the A function with prototype of B
  
  * `getProto(A)`: return the correct proto of the function A
  
  * `isClass(A)`: return `true` if the A function is an ES6 class object or `false` if it is a normal JavaScript function

## Contacts
If you like the project feel free to contact me on my email
[![paypal](https://www.paypalobjects.com/en_US/i/btn/btn_donateCC_LG.gif)](https://www.paypal.com/cgi-bin/webscr?cmd=_donations&business=6QCNG6UMSRCPC&lc=GB&item_name=ddomen&item_number=aoop&no_note=0&cn=Add%20a%20message%3a&no_shipping=2&currency_code=EUR&bn=PP%2dDonationsBF%3abtn_donate_SM%2egif%3aNonHosted)
