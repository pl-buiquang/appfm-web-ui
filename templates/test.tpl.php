<style>
#gfx_holder{
  height: 400px;
  border: 1px solid #e4e4e4;
  background : #fff url('public/img/backgrounds/fabric_of_squares_gray/fabric_of_squares_gray.png') repeat;
}

</style>

<div id="gfx_holder">
</div>
<script>
var canvas = new draw2d.Canvas("gfx_holder");

var LEFT_LOCATOR  = new draw2d.layout.locator.InputPortLocator();
 var RIGHT_LOCATOR = new draw2d.layout.locator.OutputPortLocator();


 var MyShape = draw2d.shape.basic.Rectangle.extend({

    NAME : "MyShape",   // required for JSON I/O

    init : function()
    {
        this._super(50,80);

        this.createPort("hybrid", RIGHT_LOCATOR);
        this.createPort("output", RIGHT_LOCATOR);
        this.createPort("input", LEFT_LOCATOR);
        port = this.createPort("input", LEFT_LOCATOR);
        port.setUserData({type:"FILE"});
        console.log(port);
    }
 });

 // create my special shape
 //
 var shape =  new MyShape();
 shape.setUserData({name:"foo"});

 var shape2 =  new MyShape();

 var shape3 =  new MyShape();

 // and add this to the draw2d canvas
 //
 canvas.add(shape,100,10);
 canvas.add(shape2,100,60);
 canvas.add(shape3,100,120);

</script>
<div>
[[DEBUG]]
</div>