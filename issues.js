let elemBtn = document.getElementById('btn');

elemBtn.addEventListener('click', fetchIssue);
elemBtn.addEventListener('click', launch);

async function fetchAsync() {
    let inptUrl = document.getElementById('url');
    let url = inptUrl.value;

    // DEBUG
    // let url = "https://api.github.com/repos/octocat/Hello-World/issues";
    // let url = "https://api.github.com/rep";
    // DEBUG
    let response = await fetch(url);
    if (!response.ok) {
        throw new Error(`Status: ${response.status} (${response.statusText})`);
    }
    const reader = response.body.getReader();
    const contentLength = +response.headers.get('Content-Length');

    let receivedLength = 0;
    let chunks = [];

    while (true) {
        const { done, value } = await reader.read();

        if (done) {
            break;
        }

        chunks.push(value);
        receivedLength += value.length;

        console.log(`Получено ${receivedLength} из ${contentLength}`)
    }

    let chunksAll = new Uint8Array(receivedLength); // (4.1)
    let position = 0;
    for (let chunk of chunks) {
        chunksAll.set(chunk, position); // (4.2)
        position += chunk.length;
    }
    let result = new TextDecoder("utf-8").decode(chunksAll);
    let data = JSON.parse(result);
    return data;
}

function fetchIssue() {
    fetchAsync()
        .then(data => data.map(function (element) {
            return addResultData(element);
        }))
        .catch(reason => errorMessage(reason))
}

function launch() {
    let btn = document.getElementById('btn');
    let myProgress = document.createElement('div');
    myProgress.setAttribute("id", "myProgress");

    let myBar = document.createElement('div');
    myBar.setAttribute("id", "myBar");
    myProgress.appendChild(myBar);

    btn.after(myProgress);

    let i = 0;
    function move() {
        if (i == 0) {
            i = 1;
            let width = 1;
            let id = setInterval(frame, 10);
            function frame() {
                if (width >= 100) {
                    clearInterval(id);
                    i = 0;
                } else {
                    width++;
                    myBar.style.width = width + "%";
                }
            }
        }
    }
    return move();
}

function addResultData(data) {
    let resultOutput = document.getElementById('result');
    let divCore = document.createElement('div');
    let table1 = document.createElement('table');
    table1.classList.add("blueTable");
    table1.setAttribute("style", "width:100%;text-align:center;");

    let tr1 = document.createElement('tr');

    let tdNumber = document.createElement('td');
    let textNumber = document.createTextNode(data.number);
    tdNumber.classList.add("number-before");
    tdNumber.appendChild(textNumber);

    let tdCreatedAt = document.createElement('td');
    let textCreatedAt = document.createTextNode(data.created_at.trim());
    tdCreatedAt.appendChild(textCreatedAt);

    tr1.appendChild(tdNumber);
    tr1.appendChild(tdCreatedAt);

    table1.appendChild(tr1);
    // -----------------------------------------------
    let table2 = document.createElement('table');
    table2.setAttribute("style", "width:100%;text-align:center;");
    table2.classList.add("purpurTable");

    let tr2 = document.createElement('tr');
    let tdTitle = document.createElement('td');

    let textTitle = document.createTextNode(data.title);
    tdTitle.appendChild(textTitle);
    tr2.appendChild(tdTitle);
    table2.appendChild(tr2);

    // -----------------------------------------------

    let table3 = document.createElement('table');
    table3.setAttribute("style", "width:100%;text-align:center;");
    table3.classList.add("greenTable");

    let tr3 = document.createElement('tr');
    let tdBody = document.createElement('td');
    let textString = data.body;
    let textBody;
    if (textString) {
        textBody = document.createTextNode(textString.substring(0, 100));
    } else {
        textBody = document.createTextNode("Empty String");
    }

    tdBody.appendChild(textBody);
    tr3.appendChild(tdBody);
    table3.appendChild(tr3);

    // -----------------------------------------------

    divCore.appendChild(table1);
    divCore.appendChild(table2);
    divCore.appendChild(table3);

    resultOutput.appendChild(divCore);
}

function errorMessage(reason) {
    let resultOutput = document.getElementById('result');
    let divError = document.createElement('div');
    divError.setAttribute("id", "Error");
    let textError = document.createTextNode(reason);
    divError.appendChild(textError);
    resultOutput.appendChild(divError);

    let btnDelete = document.createElement('button');
    btnDelete.innerHTML = "DELETE";
    btnDelete.setAttribute("id", "btnError");

    divError.after(btnDelete);

    btnDelete.addEventListener('click', messageDelete);
}

function messageDelete() {
    let myProgress = document.getElementById('myProgress');
    myProgress.remove();

    let divError = document.getElementById("Error");
    divError.remove();

    let btnError = document.getElementById("btnError");
    btnError.remove();
}