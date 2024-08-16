let gameseq=[];
let userseq=[];
let start=false;
let level=-1;
let max=level;
let btns=["red","yellow","purple","green"];
document.addEventListener("keyup",function(){
    if(start==false)
    {
        levelUp();
        start=true;
    }
})
function levelUp(){
    userseq=[];
    ++level;
    max=Math.max(max,level);
    h2=document.querySelector("h2");
    h2.innerText=`Level ${level}`;
    let select=btns[Math.floor(Math.random()*4)];
    gameseq.push(`${select}`);
    console.log(gameseq);
    gameFlash(document.querySelector(`.${select}`));
}
function gameFlash(btn){
    btn.classList.add("flash");
    setTimeout(()=>{btn.classList.remove("flash")},250);
}
let allbtns=document.querySelectorAll(".btn");
for(btn of allbtns){
btn.addEventListener("click",btnpress)
}
function userFlash(btn){
    btn.classList.add("userFlash");
    setTimeout(()=>{btn.classList.remove("userFlash")},150);
}
function btnpress(){
    userFlash(this);
    userseq.push(this.getAttribute("id"));
    console.log(userseq);
    checkAns(userseq.length-1);
}
function checkAns(idx){
    if(userseq[idx]==gameseq[idx]){
        if(userseq.length==gameseq.length)
        {
            levelUp();
        }
    }
    else{
        h2=document.querySelector("h2");
        h2.innerHTML=`Game Over! Current Score <b>${level}</b></br> Highest Score <b>${max}</b></br>  Press any key to start.`;
        document.querySelector("body").style.backgroundColor="red";
        setTimeout(()=>{document.querySelector("body").style.backgroundColor="white"},150)
        reset();
    }
}
function reset(){
    gameseq=[];
    userseq=[];
    start=false;
    level=-1;
}