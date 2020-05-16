
const getUsers = (page = 1) => {
 
    document.getElementById("clickme").style.visibility = "hidden";
    var Url = `https://reqres.in/api/users?page=${page}`

    fetch(Url)
        .then(req => req.json())
        .then(res => {
            generateUserBox(res);
            generatePagination(res.page, res.total_pages);
            myAddUser();
        });
}

const generateUserBox = (res) => {
    let myBoxHtml = ''
    for (let i = 0; i < res.data.length; i++) {

        const user = res.data[i];
        const box = `
        <div class="col-md-4 myBox">
        <div class="card m-2">
            <div class="card-header">
                <h4> Name: ${user.first_name + ' ' + user.last_name}</h4>
            </div>
            <div class="card-body text-center ">
                <img src=${user.avatar}>
                <p > Email: ${user.email}</p>
                <button class="btn btn-outline-danger" onclick="boxRemove(this,${user.id})"> <i class="fa fa-remove"> </i></button>
                <button class="btn btn-outline-info" onclick="editUser(this,${user.id})"> <i class="fa fa-edit"> </i></button>
            </div>
        </div>
    </div>
        `
        myBoxHtml += box;

    }
    document.querySelector("#userContainer").innerHTML = myBoxHtml;
}

const generatePagination = (page = 1, pages = 1) => {
    let items = '';

    for (let i = 1; i <= pages; i++) {
        const activeClass = page == i ? 'active' : '';
        const item = ` <li class="page-item  ${activeClass} "><a onclick="getUsers(${i})" class="page-link"  >${i}</a></li>`;
        items += item;
    }
    document.querySelector("#myPaginataion").innerHTML = items;
}


const myAddUser = () => {
    document.querySelector('#addNewUser').style.display = 'block'
}


const showNewUser = () => {
    $('#userModal').modal();
}

const saveNewUser = (isClosing = true) => {
    let user = {};
    user.firstName = $('#firstName').val();
    user.lastName = $('#lastName').val();
    user.email = $('#email').val();
    user.avatar = $('#avatar').val();
    user.id = $('#userId').val();

    if (user.id) {
        updateUser(user, isClosing);
    }
    else {
        insertUser(user, isClosing);
    }


    //     const box = `
    //     <div class="col-md-4">
    //     <div class="card m-2">
    //         <div class="card-header">
    //             <h4> Name: ${user.firstName + ' ' + user.lastName}</h4>
    //         </div>
    //         <div class="card-body text-center ">
    //             <img src=${user.avatar} class="mypic">
    //             <p > Email: ${user.email}</p>

    //         </div>
    //     </div>
    // </div>
    //     `
    //     $('#userContainer').prepend(box);
    //     if (isClosing) {
    //         $('#userModal').modal('hide');
    //     }
    //     else {
    //         $('#firstName').val('');
    //         $('#lastName').val('');
    //         $('#email').val('');
    //         $('#avatar').val('');
    //         $('#userId').val('');
    //         $('#firstName').focus();

    //     }

}

const boxRemove = (elemet, id) => {

    const swalWithBootstrapButtons = Swal.mixin({
        customClass: {
            confirmButton: 'btn btn-success',
            cancelButton: 'btn btn-danger'
        },
        buttonsStyling: false
    })

    swalWithBootstrapButtons.fire({
        title: 'Are you sure?',
        text: "You won't be able to revert this!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Yes, delete it!',
        cancelButtonText: 'No, cancel!',
        reverseButtons: true
    }).then((result) => {
        if (result.value) {
            var Apiurl = `https://reqres.in/api/users/${id}`

            fetch(Apiurl, {
                method: 'DELETE'
            }).then(res => {
                if (res.status === 204) {
                    $(elemet).parents('.myBox').remove();
                }
            })
            swalWithBootstrapButtons.fire(
                'Deleted!',
                'Your file has been deleted.',
                'success'
            )
        } else if (
            result.dismiss === Swal.DismissReason.cancel
        ) {
            swalWithBootstrapButtons.fire(
                'Cancelled',
                'Your imaginary file is safe :)',
                'error'
            )
        }
    })
    
}

const editUser = (element, id) => {

    getUser(id);

}

const getUser = (id) => {
    document.getElementById("clickme").style.visibility = "hidden";
    var Url = `https://reqres.in/api/users/${id}`

    fetch(Url)
        .then(req => req.json())
        .then(res => {
            user = res.data;
            $('#usermodal #firstName').val(user.first_name);
            $('#usermodal #lastName').val(user.last_name);
            $('#usermodal #avatar').val(user.avatar);
            $('#usermodal #email').val(user.email);
            $('#usermodal #userId').val(user.id);
            $('#userModal').modal();
            myAddUser();

        });
}

const insertUser = (user, isClosing) => {
    const apiUrl = `https://reqres.in/api/users`
    const myUser = { name: user.firstName, job: user.lastName }
    fetch(apiUrl, {
        method: 'POST',
        body: JSON.stringify(myUser),
        headers: {
            'content-type': 'application/json'
        }
    })
        .then(res => res.json())
        .then(result => {
            alert('insert');
            if (isClosing) {
                $('#userModal').modal('hide');
                getUsers();
            }
            else {
                $('#firstName').val('');
                $('#lastName').val('');
                $('#email').val('');
                $('#avatar').val('');
                $('#userId').val('');
                $('#firstName').focus();

            }
        });
}

const updateUser = (user, isClosing) => {
    const apiUrl = `https://reqres.in/api/users/${user.id}`
    const myUser = { name: user.firstName, job: user.lastName }
    fetch(apiUrl, {
        method: 'PUT',
        body: JSON.stringify(myUser),
        headers: {
            'content-type': 'application/json'
        }
    })
        .then(res => res.json())
        .then(result => {
            alert('update ');
            if (isClosing) {
                $('#userModal').modal('hide');
                getUsers();
            }
            else {
                $('#firstName').val('');
                $('#lastName').val('');
                $('#email').val('');
                $('#avatar').val('');
                $('#userId').val('');
                $('#firstName').focus();

            }
        });
}
