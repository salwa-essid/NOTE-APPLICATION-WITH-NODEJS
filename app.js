let fs = require('fs')
let operation = process.argv[2]
let titleData = process.argv[3]
let contentTitle = process.argv[4]
let bodyData = process.argv[5]
let bodyContent = process.argv[6]

function list() {
    fs.readFile('./note.json', 'utf8', (err, fileContents) => {
        if (err) {
            return console.error(err)
        }
        if (fileContents === '') {
            console.log('Printing 0 note(s).')
        } else {
            const data = JSON.parse(fileContents)
            console.log('Printing ' + data.length + ' note(s).')
            data.forEach(element => {
                console.log('-- \nTitle: ' + element.title + '\nBody: ' + element.body)
            });
        }
    })
}
function add() {

    if (titleData === undefined || contentTitle === undefined || bodyData === undefined || bodyContent === undefined
        || titleData === '--help' || bodyData === '--help' || (titleData !== '--title' && titleData !== '-t') ||
        (bodyData !== '--body' && bodyData !== '-b')) {
        console.log('Options:\n' +
            '--help          show help    \t\t\t\t[boolean]\n' +
            '--title, -t     Title of note\t\t\t\t[required]\n' +
            '--body, -b      Body of note \t\t\t\t[required]\n\n' +
            'Missing required arguments: title, body'
        )
    } else {
        let obj = { title: contentTitle, body: bodyContent };
        var newData = [];
        var str = fs.readFileSync('./note.json', 'utf8')
        if (str === '') {
            newData.push(obj)
        }
        else {
            newData = JSON.parse(str)
            newData.push(obj)
        }
        fs.writeFile('./note.json', JSON.stringify(newData), (err) => {
            if (err) throw err;
            console.log('Note created\n--\nTitle: ' + contentTitle + '\nBody:' + bodyContent);
        });
    }
}
function read() {
    if (titleData === undefined) {
        console.log('Options:\n' +
            '--help          show help    \t\t\t\t[boolean]\n' +
            '--title, -t     Title of note\t\t\t\t[required]\n' +
            'Missing required arguments: title'
        )
    } else {
        let array = JSON.parse(fs.readFileSync('./note.json', 'utf8'))
        let counter = 0;
        array.forEach(element => {
            if (element.title === titleData) {
                counter++;
                console.log('Note found\n--\nTitle: ' + element.title + '\nBody: ' + element.body)
            }
        });
        if (counter === 0) {
            console.log("No such note")
        }
    }
}
function remove() {
    if (titleData === undefined) {
        console.log('Options:\n' +
            '--help          show help    \t\t\t\t[boolean]\n' +
            '--title, -t     Title of note\t\t\t\t[required]\n' +
            'Missing required arguments: title'
        )
    } else {
        let array = JSON.parse(fs.readFileSync('./note.json', 'utf8'));
        let counter = 0;
        array.forEach(element => {
            if (element.title === titleData) {
                counter++;
            }
        });
        if (counter === 0) {
            console.log("No such note")
        } else {
            let newArray = array.filter(note => note.title !== titleData)
            fs.writeFile('./note.json', JSON.stringify(newArray), (err) => {
                if (err) throw err;
                console.log('Note was removed');
            });
        }

    }
}
switch (operation) {
    case ('list'): list();
        break;
    case ('add'): add();
        break;
    case ('read'): read();
        break;
    case ('remove'): remove();
        break;
    default: console.log("No such operation");
}