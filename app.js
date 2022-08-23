const chooseImg = document.querySelector(".choose-img .btn");
const fileInput = document.querySelector("#file");
const displayImg = document.querySelector(".right img")
const filterBtns = document.querySelectorAll(".filter-btns button");
const detailsP = document.querySelectorAll(".details p");
const range = document.querySelector("#range");
const rotateBtns = document.querySelectorAll(".rotate-btns button");
const resetBtn = document.querySelector(".reset-btn .rbtn");
const saveImg = document.querySelector(".save-img .btn")
let brightness = 100 , saturation = 100 , invert = 0 , grayscale = 0;
let flipVertical = 1 , flipHorizontal = 1 , rotate = 0;
 
fileInput.addEventListener("change",()=>{
    let file = fileInput.files[0];
    if(!file) return;
     displayImg.src = URL.createObjectURL(file);
})
chooseImg.addEventListener("click",()=>{
  fileInput.click()
})

filterBtns.forEach((filterbtn) =>{
    filterbtn.addEventListener("click",()=>{
        document.querySelector(".filter-btns .active").classList.remove("active")
        filterbtn.classList.add("active");
        detailsP[0].innerText = filterbtn.innerText;

        if(filterbtn.id==="brightness"){
            detailsP[1].innerText= `${brightness}%`;
            range.value = brightness;
            range.max = 200;
        }
        else if(filterbtn.id === "saturation"){
            detailsP[1].innerText= `${saturation}%`;
            range.value = saturation;
            range.max = 200;
        }
        else if(filterbtn.id === "inversion"){
            detailsP[1].innerText= `${invert}%`;
            range.value = invert;
            range.max = 100;
        }
        else if(filterbtn.id === "grayscale"){
            detailsP[1].innerText= `${grayscale}%`;
            range.value = grayscale;
            range.max = 100;
        }
    })
})

range.addEventListener("input",changeRange)

function changeRange(){
    detailsP[1].innerText = `${range.value}%`
    const selectedBtn =  document.querySelector(".filter-btns .active")
    if(selectedBtn.id === "brightness"){
      brightness = range.value;
      displayImg.style.filter = `brightness(${brightness}%)`
    }
    else if(selectedBtn.id ==="saturation"){
        saturation = range.value;
        displayImg.style.filter = `saturate(${saturation}%)`
    }
    else if(selectedBtn.id ==="inversion"){
        invert = range.value;
        displayImg.style.filter = `invert(${invert}%)`
    }
    else if(selectedBtn.id ==="grayscale"){
          grayscale = range.value;
          displayImg.style.filter = `grayscale(${grayscale}%)`
    }
}

rotateBtns.forEach((rotatebtn) =>{
    rotatebtn.addEventListener("click",()=>{
        if(rotatebtn.id==="left"){
            rotate-=90;
            displayImg.style.transform = `rotate(${rotate}deg)`
        }
       else if(rotatebtn.id==="right"){
           rotate+=90;
            displayImg.style.transform =  `rotate(${rotate}deg)`
        }
        else if(rotatebtn.id==="vertical"){
           flipVertical = flipVertical === 1 ? -1 :1
           displayImg.style.transform = `scaleY(${flipVertical})`
        }
        else if(rotatebtn.id==="horizontal"){
            flipHorizontal = flipHorizontal === 1 ? -1 :1
            displayImg.style.transform = `scaleX(${flipHorizontal})`
         }

    })
})

resetBtn.addEventListener("click",()=>{
    brightness = 100 , saturation = 100 , invert = 0 , grayscale = 0;
    flipVertical = 1 , flipHorizontal = 1;
    displayImg.style.filter = `brightness(${brightness}%)`
    displayImg.style.filter = `saturate(${saturation}%)`
    displayImg.style.transform = `scaleY(${flipVertical})`
    displayImg.style.transform = `scaleX(${flipHorizontal})`
    filterBtns[0].click()
})

saveImg.addEventListener("click",()=>{
   const canvas = document.createElement("canvas");
   const ctx = canvas.getContext("2d");
   canvas.width = displayImg.naturalWidth;
   canvas.height = displayImg.naturalHeight;

   ctx.filter = `brightness(${brightness}%) saturate(${saturation}%) invert(${invert}%) grayscale(${grayscale}%)`
   ctx.translate(canvas.width/2,canvas.height/2);
   
   if(rotate!==0){
    ctx.rotate(rotate * Math.PI / 180)
   }

   ctx.scale(flipHorizontal,flipVertical);
   ctx.drawImage(displayImg,-canvas.width/2,-canvas.height/2,canvas.width,canvas.height);

   const link = document.createElement("a");
   link.download = "image.jpg";
   link.href = canvas.toDataURL();
   link.click();
})