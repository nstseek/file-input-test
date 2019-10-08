console.log('script working');

const fileReader = new FileReader();
const sizeAnalysis = new FileReader();

let sendStatus = true;

const buttonElement = document.querySelector('button');

const inputElement = document.querySelector('input');

const imgElement = document.querySelector('img');

const spanElement = document.querySelector('span');

const buttonCb = () => {
    fetch('http://localhost:7000/savepic', {
        method: 'POST',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ name: inputElement.files[0].name, data: sizeAnalysis.result })
    });
};

const fileSizeCb = () => {
    fileSize = sizeAnalysis.result;
    fileSize = fileSize.length / 1000;
    sendStatus = fileSize > 500;
    buttonElement.disabled = sendStatus;
    spanElement.innerText = `File size: ${fileSize.toFixed(0)}KB ${fileSize > 500 ? '(Max file size exceeded)' : ''}`;
};

const fileReaderCb = () => {
    imgElement.src = fileReader.result;
};

const inputCb = (event) => {
    sendStatus = true;
    buttonElement.disabled = sendStatus;
    file = event.target.files[0];
    fileReader.readAsDataURL(event.target.files[0]);
    fileReader.addEventListener('loadend', fileReaderCb);
    sizeAnalysis.readAsBinaryString(event.target.files[0]);
    sizeAnalysis.addEventListener('loadend', fileSizeCb);
};

inputElement.addEventListener('change', inputCb);

buttonElement.addEventListener('click', buttonCb);

buttonElement.disabled = sendStatus;
