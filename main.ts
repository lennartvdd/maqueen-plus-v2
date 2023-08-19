input.onLogoEvent(TouchButtonEvent.Pressed, function () {
    D = !(D)
})
let direction = 0
let distance = 0
let n = 0
let R = 0
let D = false
DFRobotMaqueenPlusV2.init()
DFRobotMaqueenPlusV2.controlLED(MyEnumLed.eAllLed, MyEnumSwitch.eOpen)
DFRobotMaqueenPlusV2.setBrightness(100)
let G = 1
let B = 2
let P = 3
basic.forever(function () {
    if (R <= 3) {
        DFRobotMaqueenPlusV2.setIndexColor(R, 0xff0000)
        R += 1
    } else {
        R = 0
    }
    if (G <= 3) {
        DFRobotMaqueenPlusV2.setIndexColor(G, 0x00ff00)
        G += 1
    } else {
        G = 0
    }
    if (B <= 3) {
        DFRobotMaqueenPlusV2.setIndexColor(B, 0x007fff)
        B += 1
    } else {
        B = 0
    }
    if (P <= 3) {
        DFRobotMaqueenPlusV2.setIndexColor(P, 0xff00ff)
        P += 1
    } else {
        P = 0
    }
    n += 1
    if (!(D)) {
        basic.pause(1000)
    }
})
basic.forever(function () {
    distance = DFRobotMaqueenPlusV2.readUltrasonic(DigitalPin.P1, DigitalPin.P2)
    // left = 1, //right = 2
    if (D) {
        if (distance < 50 && distance != 0) {
            direction = randint(1, 2)
            if (direction == 1) {
                DFRobotMaqueenPlusV2.controlMotor(MyEnumMotor.eLeftMotor, MyEnumDir.eBackward, 50)
                DFRobotMaqueenPlusV2.controlMotor(MyEnumMotor.eRightMotor, MyEnumDir.eForward, 50)
                basic.pause(1000)
            }
            if (direction == 2) {
                // right
                DFRobotMaqueenPlusV2.controlMotor(MyEnumMotor.eLeftMotor, MyEnumDir.eForward, 50)
                DFRobotMaqueenPlusV2.controlMotor(MyEnumMotor.eRightMotor, MyEnumDir.eBackward, 50)
                basic.pause(1000)
            }
            DFRobotMaqueenPlusV2.controlMotorStop(MyEnumMotor.eAllMotor)
        } else {
            direction = 0
            DFRobotMaqueenPlusV2.controlMotor(MyEnumMotor.eAllMotor, MyEnumDir.eForward, 50)
        }
    } else {
        DFRobotMaqueenPlusV2.controlMotorStop(MyEnumMotor.eAllMotor)
    }
})
basic.forever(function () {
    if (D) {
        if (direction == 1) {
            basic.showLeds(`
                . . # . .
                . . . # .
                # # # # #
                . . . # .
                . . # . .
                `)
        } else if (direction == 2) {
            basic.showLeds(`
                . . # . .
                . # . . .
                # # # # #
                . # . . .
                . . # . .
                `)
        } else if (distance < 50 && distance != 0) {
            basic.showIcon(IconNames.Tortoise)
        } else {
            basic.showLeds(`
                . . # . .
                . # # # .
                # . # . #
                . . # . .
                . . # . .
                `)
        }
    } else {
        basic.showIcon(IconNames.Target)
    }
})
