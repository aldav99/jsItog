let elemBtn = document.getElementById('btn');

if (elemBtn) {
    elemBtn.addEventListener('click', fetchIssue);
    elemBtn.addEventListener('click', launch);
}

async function fetchAsync(url) {

    let response = await fetch(url);
    if (!response.ok) {
        throw new Error(`Status: ${response.status} (${response.statusText})`);
    }
    return response;
}

function fetchIssue() {
    let usernamePart = document.getElementById('username');
    let repoPart = document.getElementById('repo');
    let assigneePart = document.getElementById('assignee');

    let user = usernamePart.value.trim();
    let repo = repoPart.value.trim();
    let assignee = assigneePart.value.trim();

    let url = `https://api.github.com/repos/${user}/${repo}/issues`;

    fetchAsync(url)
        .then(response => response.json())
        .then(issues => issues.map(function (element) {
            if (proveIssue(element) && proveAssignee(element, assignee)) {
                return addResultData(element);
            }
        }))
        .catch(reason => errorMessage(reason))
}

function proveIssue(issue) {
    return !issue.pull_request
}

function proveAssignee(issue, assignee) {
    if (assignee) {
        return (issue.assignee && issue.assignee.login === assignee)
    } else {
        return true
    }
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
            let id = setInterval(function () {
                if (width >= 100) {
                    clearInterval(id);
                    i = 0;
                } else {
                    width++;
                    myBar.style.width = width + "%";
                }
            }, 10);
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
    console.log(resultOutput.childElementCount)

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