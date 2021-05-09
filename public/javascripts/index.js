const demoBtn = document.querySelector(".demo")

if(demoBtn){
    demoBtn.addEventListener("click", async e => {
        const res = await (await fetch("users/demo")).json();
        if(res) location.reload();
    });
    
}
