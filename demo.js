///////////////////////////////////
/// あかりちゃんおむすびスライダー ///
///     Made by Rarararere      ///
///     Based on Anzu-Widget    ///
///////////////////////////////////
// The Original Version(Anzu-Widget) 
// is licensed under MIT License.


window.addEventListener("DOMContentLoaded", () => {
const canvas=document.getElementById("form");
const cx1=canvas.getContext("2d");
let changeimginterval;
let ginterval;
let omusubi=[];
let counter=localStorage.getItem("omusubi_ate_quantity") || 0;
    
const akarichansizeyoko=100;
const akarichansizetate=100;

const futsu=new Image();
futsu.src="1.png";

const oisii=new Image();
oisii.src="2.png";
let omusubiX=0;
let omusubiY=0;
let omusubistate=futsu;
class omusubimk
{
    constructor()
    {
        this.width=40;
        this.height=40;
        this.x=canvas.width;
        this.y=15;
        this.speed=6;
        this.image=new Image();
        this.image.src="omusubi.png"
    }
    update()
    {    
    this.x-=this.speed;
    }
    draw()
    {
    cx1.drawImage(this.image,this.x,this.y,this.width,this.height);
    }
    }

    function gen_omusubi()
    {
        omusubi.push(new omusubimk());
    }

 function updateomusubi()
{
    omusubi.forEach((item,index)=>
    {
    item.update();
    item.draw();
    if(item.x+item.width/2<0)
        {
            omusubi.splice(index,1);
        }
});
}

function responsive() {	
  {
    canvas.width = canvas.clientWidth * 2;
    canvas.height = canvas.clientHeight * 2;
    cx1.scale(2, 2);
  }	}
  window.addEventListener('resize', responsive);
  responsive();


function update()
    {
cx1.clearRect(0,0,canvas.width,canvas.height);
cx1.drawImage(omusubistate,omusubiX,omusubiY,akarichansizeyoko,akarichansizetate);
  updateomusubi();
    }

    function re()
    {
      clearTimeout(changeimginterval);
      changeimginterval=setTimeout(() => 
     {

        omusubistate=futsu;
            
     }, 800);
    }

function syoutotsuchk() 
{
      omusubi.forEach((item,index)=>
        {
            const dstX=item.x-(omusubiX+akarichansizeyoko/2);
            const dstY=item.y-(omusubiY+akarichansizetate/2);
            const dst=Math.hypot(dstX,dstY);
            if(dst<item.width/2+akarichansizeyoko/2)
            {
                omusubi.splice(index,1);
                
                omusubistate=oisii;
                counter++;
                localStorage.setItem("omusubi_ate_quantity", counter);
                                re();
            }
              
            }
        
        );
}


function begin()
{
gen_omusubi();
  ginterval=setInterval(()=>
{
    update();
    syoutotsuchk();
},1000 / 60);
}
setInterval(gen_omusubi,5000);
Promise.all([
    futsu.decode(),
    oisii.decode()
])
.then(() => {
    begin();
})
.catch(error => {
    console.error("画像の読み込みに失敗しました:", error);
});

canvas.addEventListener("click",gen_omusubi);
    });
