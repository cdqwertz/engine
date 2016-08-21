#How to add own components?

###Create
- Create a new class

```javascript
function ownComponent() {
}
```

- Add a start method
- Add a update method

```javascript
function ownComponent() {
	this.start = function(obj) {
	};
	
	this.update = function(obj) {
	};
}
```

- Add the component type (should be the classes name)

```javascript
function ownComponent() {
	this.componentType = "ownComponent";
	this.start = function(obj) {
	};
	
	this.update = function(obj) {
	};
}
```

- Now, you can fill the start/update method with code.

###Use

```javascript
actor.addComponent(new ownComponent());
```


