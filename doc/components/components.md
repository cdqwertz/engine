#Components
##transform

```javascript
new transform(pos, rotation)
```

####Methods:

```javascript
x.setPos(pos)
```

```javascript
x.getPos()
```

##drawRect

```javascript
new drawRect(pos, scale)
```

##drawImage

```javascript
new drawImage(pos, img, mode, w, h, animations, animation, speed)
```

1. pos : Position of the image
2. img : Image object (new Image())
3. mode : Normal (0), Scaled (1), Animated (2)
4. animations : A list of the animations
5. animation : The animation that is played when you start the game
6. speed : How fast should the animation play?

##border

```javascript
new border(dir, size, color, updateCollider)
```

1. dir : Right (0), Bottom (1), Left (2), Top(3)
2. size : size (e.g. 100)
3. color : color (e.g. #444444)
4. updateCollider : can other objects collide with this border?
