namespace SpriteKind {
    export const Core = SpriteKind.create()
    export const Enemy0 = SpriteKind.create()
}
namespace StatusBarKind {
    export const EHP = StatusBarKind.create()
}


controller.A.onEvent(ControllerButtonEvent.Pressed, function () {
    if (sprites.readDataString(playerChar, "HeldTower") == "Shooter"){

        }})

statusbars.onZero(StatusBarKind.Health, function (status) {
    game.setGameOverMessage(false, "Dead")
    game.gameOver(false)
})
statusbars.onZero(StatusBarKind.EHP, function (status) {
    if (sprites.readDataNumber(enemy0, "DamageType") == 0) {
        sprites.destroy(status.spriteAttachedTo())
    }
})

let enemy0HP: StatusBarSprite = null
let ZHP = 0
let enemy0: Sprite = null
let HP = 0
let dfc = 1 // Defence of core
let statusbar = null
let moveSpd = 150 // Player's speed
let maxHP = 10000 // HP of core
let towers = ["Shooter", "Fire", "Poison", "chainLightning"] // Lists tower types
let enemyType0 = [] // Hold enemies of type "0"
dfc = 1
HP = maxHP
tiles.setCurrentTilemap(tilemap`level1`)
scene.setTile(2, img`
a d a d a d a c a d a d a d a c 
d a b a b a b a d a b a b a b a 
a b a b a b a c a b a b a b a c 
d a b a b a b a d a b a b a b a 
a b a b a b a c a b a b a b a c 
d a b a b a b a d a b a b a b a 
a b a b a b a b a b a b a b a b 
c a c a c a b a c a c a c a b a 
a d a d a d a c a d a d a d a c 
d a b a b a b a d a b a b a b a 
a b a b a b a c a b a b a b a c 
d a b a b a b a d a b a b a b a 
a b a b a b a c a b a b a b a c 
d a b a b a b a d a b a b a b a 
a b a b a b a b a b a b a b a b 
c a c a c a b a b a c a c a c a
`)
let playerChar = sprites.create(img`
    . . . . . . f f f f . . . . . . 
    . . . . f f f 2 2 f f f . . . . 
    . . . f f f 2 2 2 2 f f f . . . 
    . . f f f e e e e e e f f f . . 
    . . f f e 2 2 2 2 2 2 e e f . . 
    . . f e 2 f f f f f f 2 e f . . 
    . . f f f f e e e e f f f f . . 
    . f f e f b f 4 4 f b f e f f . 
    . f e e 4 1 f d d f 1 4 e e f . 
    . . f e e d d d d d d e e f . . 
    . . . f e e 4 4 4 4 e e f . . . 
    . . e 4 f 2 2 2 2 2 2 f 4 e . . 
    . . 4 d f 2 2 2 2 2 2 f d 4 . . 
    . . 4 4 f 4 4 5 5 4 4 f 4 4 . . 
    . . . . . f f f f f f . . . . . 
    . . . . . f f . . f f . . . . . 
    `, SpriteKind.Player)
playerChar.setPosition(1960, 2656)
sprites.setDataString(playerChar, "HeldTower", "MG")
let core = sprites.create(img`
    . . . . . . . . . . . . . . . .
    . . . . . . 6 6 6 6 . . . . . .
    . . . . 6 6 6 5 5 6 6 6 . . . .
    . . . 7 7 7 7 6 6 6 6 6 6 . . .
    . . 6 7 7 7 7 8 8 8 1 1 6 6 . .
    . . 7 7 7 7 7 8 8 8 1 1 5 6 . .
    . 6 7 7 7 7 8 8 8 8 8 5 5 6 6 .
    . 6 7 7 7 8 8 8 6 6 6 6 5 6 6 .
    . 6 6 7 7 8 8 6 6 6 6 6 6 6 6 .
    . 6 8 7 7 8 8 6 6 6 6 6 6 6 6 .
    . . 6 8 7 7 8 6 6 6 6 6 8 6 . .
    . . 6 8 8 7 8 8 6 6 6 8 6 6 . .
    . . . 6 8 8 8 8 8 8 8 8 6 . . .
    . . . . 6 6 8 8 8 8 6 6 . . . .
    . . . . . . 6 6 6 6 . . . . . .
    . . . . . . . . . . . . . . . .
`, SpriteKind.Core)
core.setPosition(1960, 2472)
controller.moveSprite(playerChar, moveSpd, moveSpd)
scene.cameraFollowSprite(playerChar)
let hplayer = statusbars.create(20, 4, StatusBarKind.Health)
hplayer.attachToSprite(core)
hplayer.setLabel("HP:" + HP + "/" + maxHP)
hplayer.setColor(9, 15)

let enemyA = [sprites.readDataNumber(null, "DamageType") == 0]
forever(function () {
    hplayer.setLabel("HP:" + HP + "/" + maxHP)
    hplayer.max = maxHP
    hplayer.value = HP
})
game.onUpdateInterval(100, function () {
    // Naturally regenerate core HP at slow rate
    if (HP < maxHP) {
        HP = Math.floor(HP + maxHP / 10000)
    }
})
game.onUpdateInterval(10000, function() { // Generate enemies automatically
    enemy0 = sprites.create(img`
    . . . . b b b b . . . . . . . . 
    . . . b 3 3 3 3 b b b b . . . . 
    . . b b 3 3 3 3 3 1 1 b b c c . 
    . . b 1 1 3 3 3 3 3 1 1 3 3 c c 
    . . b 1 1 3 3 3 3 3 3 3 3 3 b c 
    . . c 3 3 3 3 3 3 3 c c c b b f 
    . c 3 3 3 3 3 b b b b c c c b f 
    c 3 3 3 3 b b d d d d d c c b f 
    c 3 3 c b d d d d d d c d c c . 
    f 3 c c c d d c d d d c d b c . 
    f b c c c d d d c d d d d d f . 
    f b c c c d d d d d b b b d f . 
    f f b b c b d d d d d d d c . . 
    . f f f f b c c d d d d f f . . 
    . . f b d d b c c f f b b f f . 
    . . f d d d b . . f f b b b f . 
    `, SpriteKind.Enemy0)
})
sprites.onCreated(SpriteKind.Enemy0, function (newSprite) {
    // Applies common attributes to newly generated enemies
    newSprite.setPosition(1960, 2790)
    sprites.setDataNumber(newSprite, "DamageType", 0)
    ZHP = 50
    enemy0HP = statusbars.create(20, 4, StatusBarKind.EHP)
    enemy0HP.attachToSprite(newSprite)
    enemy0HP.setLabel("HP:" + ZHP + "/50")
    newSprite.follow(core, 20)
})

sprites.onOverlap(SpriteKind.Core, SpriteKind.Enemy, function (sprite, otherSprite) {
    // Function for when enemies hit their destination
    
        HP =- 500
        pause(750)
    
})
