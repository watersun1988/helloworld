class Main extends egret.Sprite {
    
    private Num: number = 4;
    private deviceWidth:number = 480;
    private deviceHeight:number = 800;
    gameData: GameData;
    textFields: Array<egret.TextField>= [];
    scoreTextField: egret.TextField;
    private startPoint: egret.Point;
    
    public constructor() {
        super();
        this.gameData = new GameData(this.Num);
        this.gameData.resetDateValue();
        this.buildScene();  
    }
    
    private buildScene()
    { 
        var bigShape: egret.Sprite = new egret.Sprite();
        bigShape.x = 0;
        bigShape.y = 0;
        
        var bigShapeWidth:number = this.deviceWidth > this.deviceHeight ? this.deviceHeight : this.deviceWidth;
        this.addChild(bigShape);

        for(var i = 0;i < this.Num;i++)
        { 
            for(var j = 0;j < this.Num;j++) 
            {
                var smallShape: egret.Sprite = new egret.Sprite();
                var smallWidth: number = bigShapeWidth / this.Num
                var smallShapeX: number = j * smallWidth;
                var smallShapeY: number = i * smallWidth;
                var smallColor = ((i + j) % 2 == 1) ? 0xff7f27 : 0xffc90e;
                smallShape.graphics.beginFill(smallColor);
                smallShape.graphics.drawRect(smallShapeX,smallShapeY,bigShapeWidth / this.Num,bigShapeWidth / this.Num);
                smallShape.graphics.endFill();
                bigShape.addChild(smallShape);

                var textField: egret.TextField = new egret.TextField();
                textField.x = smallShapeX;
                textField.y = smallShapeY;
                textField.width = bigShapeWidth / this.Num;
                textField.height = bigShapeWidth / this.Num;
                textField.bold = true;
                textField.size = 50;
                textField.textAlign = egret.HorizontalAlign.CENTER;
                textField.verticalAlign = egret.VerticalAlign.MIDDLE;
                smallShape.addChild(textField);
                
                this.textFields[i*this.Num +j] = textField;
            }
        } 
        this.scoreTextField = new egret.TextField();
        this.scoreTextField.x = 10;
        this.scoreTextField.y = bigShape.height + 50;
        this.scoreTextField.bold = true;
        this.scoreTextField.size = 50;
        this.addChild(this.scoreTextField);
        
        var wholeShape: egret.Sprite = new egret.Sprite();
        wholeShape.graphics.beginFill(0xffffff);
        wholeShape.graphics.drawRect(0,0,this.deviceWidth,this.deviceHeight);
        wholeShape.graphics.endFill();
        wholeShape.alpha = 0.0;
        wholeShape.touchEnabled = true;
        wholeShape.addEventListener(egret.TouchEvent.TOUCH_BEGIN,this.touchBegin,this);
        wholeShape.addEventListener(egret.TouchEvent.TOUCH_END,this.touchEnd,this);
        this.addChild(wholeShape);
        
        this.updateTextFields();
        this.updateScoreText();
    }
    private updateTextFields()
    { 
        for(var i = 0;i < this.Num * this.Num;i++)
        { 
            if(this.gameData.textValues[i] == 0) {
                this.textFields[i].text = "";
            }
            else {
                this.textFields[i].text = this.gameData.textValues[i].toString();
            }
        }
    }
    private updateScoreText()
    { 
        this.scoreTextField.text = "分数:" + this.gameData.totalScore.toString();
    }
    
    private touchBegin(e: egret.TouchEvent)
    { 
        this.startPoint = new egret.Point(e.stageX,e.stageY);
    }
    
    private touchEnd(e: egret.TouchEvent)
    { 
        if(Math.abs(e.stageX - this.startPoint.x) < 30 
            && Math.abs(e.stageY - this.startPoint.y) < 30)
        { 
            return;
        }
        var ret:number = this.gameData.upDateValue(new egret.Point(e.stageX - this.startPoint.x,e.stageY - this.startPoint.y));
        if(ret != ErrorCode.OK)
        { 
            this.gameData.resetDateValue();
        }
        this.updateTextFields();
        this.updateScoreText();
    }
}