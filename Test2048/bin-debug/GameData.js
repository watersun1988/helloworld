/**
 *
 * @author
 *
 */
var Director;
(function (Director) {
    Director[Director["UP"] = 0] = "UP";
    Director[Director["DOWN"] = 1] = "DOWN";
    Director[Director["LEFT"] = 2] = "LEFT";
    Director[Director["RIGHT"] = 3] = "RIGHT";
})(Director || (Director = {}));
;
var ErrorCode;
(function (ErrorCode) {
    ErrorCode[ErrorCode["OK"] = 0] = "OK";
    ErrorCode[ErrorCode["ERR"] = 1] = "ERR";
})(ErrorCode || (ErrorCode = {}));
;
var GameData = (function () {
    function GameData(N) {
        this.textValues = [];
        this.Num = N;
        for (var i = 0; i < this.Num * this.Num; i++) {
            this.textValues[i] = 0;
        }
    }
    var d = __define,c=GameData;p=c.prototype;
    p.upDateValue = function (offsetPoint) {
        console.log("x:", offsetPoint.x, " y:", offsetPoint.y);
        var director = this.getDirector(offsetPoint);
        console.log("director:", director);
        this.calcNewValues(director);
        var ret = this.addRandomValue();
        console.log("date end");
        return ret;
    };
    p.resetDateValue = function () {
        for (var i = 0; i < this.Num * this.Num; i++) {
            this.textValues[i] = 0;
        }
        this.totalScore = 0;
        this.addRandomValue();
    };
    p.getDirector = function (offsetPoint) {
        if (Math.abs(offsetPoint.x) <= Math.abs(offsetPoint.y)) {
            return offsetPoint.y >= 0 ? 1 /* DOWN */ : 0 /* UP */;
        }
        else {
            return offsetPoint.x >= 0 ? 3 /* RIGHT */ : 2 /* LEFT */;
        }
    };
    p.calcNewValues = function (director) {
        switch (director) {
            case 0 /* UP */:
                this.calcArrayDate(0, this.Num, 1);
                break;
            case 1 /* DOWN */:
                this.calcArrayDate(this.Num * (this.Num - 1), 0 - this.Num, 1);
                break;
            case 2 /* LEFT */:
                this.calcArrayDate(0, 1, this.Num);
                break;
            case 3 /* RIGHT */:
                this.calcArrayDate(this.Num - 1, 0 - 1, this.Num);
                break;
        }
        return;
    };
    p.addRandomValue = function () {
        var emptyNum = 0;
        for (var i = 0; i < this.Num * this.Num; i++) {
            if (this.textValues[i] == 0)
                emptyNum++;
        }
        if (emptyNum == 0)
            return 1 /* ERR */;
        var randomLoc = Math.random() * emptyNum;
        var randomValue = (Math.random()) <= 0.5 ? 2 : 4;
        console.log("random:", randomLoc, randomValue);
        var i = 0;
        var j = 0;
        while (i < randomLoc) {
            if (this.textValues[j++] == 0)
                i++;
        }
        this.textValues[j - 1] = randomValue;
        return 0 /* OK */;
    };
    p.calcArrayDate = function (startLoc, offset, nextOffset) {
        var newTextValues;
        for (var i = 0; i < this.Num; i++) {
            newTextValues = this.getOneLineValues(startLoc, offset);
            for (var j = 0; j < this.Num; j++) {
                this.textValues[startLoc + j * offset] = newTextValues[j];
            }
            console.log(newTextValues[0], newTextValues[1], newTextValues[2], newTextValues[3]);
            startLoc += nextOffset;
        }
    };
    p.getOneLineValues = function (startLoc, offset) {
        var tmpTextValues = [];
        var j = 0;
        for (var i = 0; i < this.Num; i++) {
            if (this.textValues[startLoc + i * offset] == 0)
                continue;
            tmpTextValues[j++] = this.textValues[startLoc + i * offset];
        }
        var k = 0;
        for (var i = 1; i < j; i++) {
            if (tmpTextValues[i - 1] == tmpTextValues[i]) {
                tmpTextValues[k] = tmpTextValues[i - 1] << 1;
                this.totalScore += tmpTextValues[k];
                i++;
            }
            else {
                tmpTextValues[k] = tmpTextValues[i - 1];
            }
            console.log("oneline:", k, tmpTextValues[k]);
            k++;
        }
        if (i == j) {
            tmpTextValues[k] = tmpTextValues[i - 1];
            k++;
        }
        for (; k < this.Num; k++) {
            tmpTextValues[k] = 0;
        }
        return tmpTextValues;
    };
    return GameData;
})();
egret.registerClass(GameData,"GameData");
