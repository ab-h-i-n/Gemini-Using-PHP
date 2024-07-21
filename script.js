const submitBtn = document.querySelector('.submit');
const response = document.querySelector('.response');
const textBox = document.querySelector('.text');
const genPdfBtn = document.querySelector('.pdf');

genPdfBtn.style.display = "none";


submitBtn.addEventListener("click",()=>{

    const text = textBox.value;

    response.innerHTML = "Thinking......";

    fetch("/response.php",{
        method : "POST",
        body : JSON.stringify({
            text : text + '\n (Force Response should be in a html document form only need the body part of that document, dont use ** to make the text bold)'
        })
    })
    .then(res => res.text())
    .then(text => {
        console.log('response : ', text);
        text = text.replace('```html','')
        response.innerHTML = text;
        genPdfBtn.style.display = "block";
    })

})

genPdfBtn.addEventListener("click", () => {
    const conf = confirm("Do you want a PDF?");
    
    if (!conf) {
        return;
    }
    
    fetch('/generatePDF.php', {
        method: "POST",
        body: JSON.stringify({
            prompt: textBox.value,
            response: response.innerHTML
        }),
        headers: {
            'Content-Type': 'application/json'
        }
    })
    .then(res => res.blob())
    .then(blob => {
        const url = URL.createObjectURL(blob);
        window.open(url, '_blank');
    })
    .catch(err => console.error('Error generating PDF:', err));
});
