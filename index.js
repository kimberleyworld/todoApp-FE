const displayPage = () => {
    document.getElementById('form').innerHTML = ''
    createAddForm()
    fetch('http://localhost:3000/uncompleted')
        .then(data => data.json())
        .then(function(data) {
            let items = data.todolist
            console.log(items)
            let res = ''
            items.forEach(function (item){
                console.log(item._id)
                res += '<div class="row">' +
                    '<div class="col">' +
                    '<ul class = "list-group list-group-flush">' +
                    '<li class="list-group-item item">' + item.item + '</li>' +
                    '</ul>' +
                    '</div>' +
                    '<div class="col">' +
                    '<button type="button" class="delete btn btn-outline-danger btn-sm" data-id="' + item._id + '">' +
                    'delete</button>' +
                    '<button type="button" class="uncompleted btn btn-outline-secondary btn-sm" data-id="' + item._id + '">complete</button>' +
                    '</div>' +
                    '</div>'
            })
            document.getElementById('itemList').innerHTML = res
        })
        .then(function(){
           let items = document.querySelectorAll('.uncompleted')
            items.forEach(function (item){
                item.addEventListener('click', (e) => {
                        console.log(e.target.dataset.id)
                        let id = e.target.dataset.id
                        fetch('http://127.0.0.1:3000/markAsComplete/' + id, {
                            method: 'PUT',
                            headers: {
                            "Content-Type": "application/json"
                             }
                        }).then(() => displayPage())
                    displayPage()
                })
            })
        }) .then(() => {

// try and remove checkboxes and make colerful
        // add in boarder box 
    fetch('http://localhost:3000/completed')
        .then(data => data.json())
        .then(function(data) {
            let items = data.todolist
            let res = ''
            items.forEach(function (item){
                res += '<div class="row">' +
                           '<div class="col">' +
                                '<ul class = "list-group list-group-flush">' +
                                  '<li class="list-group-item item">' + item.item + '</li>' +
                                '</ul>' +
                            '</div>' +
                            '<div class="col">' +
                                '<button type="button" class="delete btn btn-outline-danger btn-sm" data-id="' + item._id + '">' +
                                    'delete</button>' +
                                    '<button type="button" class="completed btn btn-outline-secondary btn-sm"data-id="' + item._id + '">redo</button>' +
                            '</div>' +
                    '</div>'
            })
            document.getElementById('completedItemList').innerHTML = res
        })
        .then(function(){
            let items = document.querySelectorAll('.completed')
            items.forEach(function (item){
                item.addEventListener('click', (e)=>{
                    console.log(e.target.dataset.id)
                    let id = e.target.dataset.id
                    fetch('http://127.0.0.1:3000/markAsUncomplete/' + id, {
                        method: 'PUT',
                        headers: {
                            "Content-Type": "application/json"
                        }
                    }).then(() => displayPage())
                })
            })
        })
        .then(function (){
            let deleteButtons = document.querySelectorAll('.delete')
            deleteButtons.forEach(function (deleteButton){
                deleteButton.addEventListener('click', (e)=>{
                    console.log(e.target.dataset.id)
                    console.log('banana')
                    let id = e.target.dataset.id
                    fetch('http://127.0.0.1:3000/remove/' + id, {
                        method: 'DELETE',
                        headers: {
                            "Content-Type": "application/json"
                        }
                    }).then(() => displayPage())
                })
            })
        })
    })

let form = document.getElementById('addNewForm')
    form.addEventListener('submit', function (e){
        e.preventDefault()
        let newItem = document.getElementById('newItem').value
        console.log(newItem)

        dataToSend = {item: newItem, completed:false}

        fetch('http://127.0.0.1:3000/add', {
            method: 'POST',
            body: JSON.stringify(dataToSend),
            headers: {
                'content-type': 'application/json; charset=UTF-8'
            }
        }).then(() => displayPage())
    })
}

//    <form id="addNewForm">
//         <input id="newItem" type="text" name="newItem" />
//         <input type="submit" />
//     </form>

const createAddForm = () => {
    let form = document.createElement('FORM')
    form.setAttribute('id', 'addNewForm')
    let input = document.createElement('INPUT')
    input.type = 'text'
    input.id = 'newItem'
    input.name = 'newItem'
    let submitButton = document.createElement('INPUT')
    submitButton.type = 'submit'
    form.appendChild(input)
    form.appendChild(submitButton)
    document.getElementById('form').appendChild(form)
}

displayPage()