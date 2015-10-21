/**
 *
 * @author 
 *
 */
enum Director
    { 
       UP,
       DOWN,
       LEFT,
       RIGHT
    };
    
enum ErrorCode
{ 
    OK,
    ERR,
    };

class GameData {
    private Num: number;
    totalScore: number;
    textValues: Array<number> = [];
	public constructor(N:number) {
        this.Num = N;
        for(var i = 0;i < this.Num * this.Num;i++)
        { 
            this.textValues[i] = 0;
        }
	}
	
    public upDateValue(offsetPoint: egret.Point)
    { 
        console.log("x:",offsetPoint.x," y:",offsetPoint.y);
        var director: Director = this.getDirector(offsetPoint);
        console.log("director:",director);
        this.calcNewValues(director);
        var ret: ErrorCode = this.addRandomValue();
        console.log("date end");
        return ret;
    }
    public resetDateValue()
    { 
        for(var i = 0;i < this.Num * this.Num;i++)
            { 
                this.textValues[i] = 0;
            }
        this.totalScore = 0;
        this.addRandomValue();
    }
    
    private getDirector(offsetPoint: egret.Point)
    { 
        if(Math.abs(offsetPoint.x) <= Math.abs(offsetPoint.y)) {
            return offsetPoint.y >= 0 ? Director.DOWN : Director.UP;
        }
        else
        { 
            return offsetPoint.x >= 0 ? Director.RIGHT : Director.LEFT;
        }
    }
    
    private calcNewValues(director: Director)
    { 
        switch(director)
        { 
            case Director.UP:
                this.calcArrayDate(0,this.Num,1);
                break;
            case Director.DOWN:
                this.calcArrayDate(this.Num * (this.Num - 1),0 - this.Num,1);
                break;
            case Director.LEFT:
                this.calcArrayDate(0,1,this.Num);
                break;
            case Director.RIGHT:
                this.calcArrayDate(this.Num-1,0-1,this.Num);
                break;
        }
        return;
    }
    
    private addRandomValue()
    { 
        var emptyNum: number = 0;
        for(var i = 0;i < this.Num * this.Num;i++)
        { 
            if(this.textValues[i] == 0)
                emptyNum++;
        }
        if(emptyNum == 0)
            return ErrorCode.ERR;
        var randomLoc: number = Math.random() * emptyNum;
        var randomValue: number = (Math.random()) <= 0.5 ? 2 : 4;
        console.log("random:",randomLoc,randomValue);
        var i = 0;
        var j = 0;
        while(i < randomLoc)
        { 
            if(this.textValues[j++] == 0)
                i++;
        }
        this.textValues[j-1] = randomValue;
        return ErrorCode.OK;
    }
    
    private calcArrayDate(startLoc: number,offset: number,nextOffset: number)
    { 
        var newTextValues: Array<number>;
        for(var i = 0;i < this.Num;i++)
        { 
            newTextValues = this.getOneLineValues(startLoc,offset);
            for(var j = 0;j < this.Num;j++)
            { 
                this.textValues[startLoc + j * offset] = newTextValues[j];
            }
            console.log(newTextValues[0],newTextValues[1],newTextValues[2],newTextValues[3]);
            startLoc += nextOffset;
        }
    }
    
    private getOneLineValues(startLoc: number,offset: number)
    { 
        var tmpTextValues: Array<number> = [];
        var j: number = 0;
        for(var i = 0;i < this.Num;i++)
        { 
            if(this.textValues[startLoc + i * offset] == 0)
                continue;
            tmpTextValues[j++] = this.textValues[startLoc + i * offset];
        }
        var k: number = 0;
        for(var i = 1;i < j;i++)
        { 
            if(tmpTextValues[i - 1] == tmpTextValues[i]) {
                tmpTextValues[k] = tmpTextValues[i - 1] << 1;
                this.totalScore += tmpTextValues[k];
                i++;
            }
            else { 
                tmpTextValues[k] = tmpTextValues[i - 1];
            }
            console.log("oneline:",k,tmpTextValues[k]);
            k++;
        }
        if(i == j)
        { 
            tmpTextValues[k] = tmpTextValues[i - 1];
            k++;
        }
        for(;k < this.Num;k++)
        { 
            tmpTextValues[k] = 0;
        }
        return tmpTextValues;
    }
}
