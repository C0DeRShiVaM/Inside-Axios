
let form = document.querySelector('#myForm');

form.addEventListener('submit', addUserDetails);

function addUserDetails(e) {
    e.preventDefault();

    const name = document.querySelector('#userName').value;
    const email = document.querySelector('#emailId').value;
    const phoneNo = document.querySelector('#phoneNumber').value;

    // Get the existing user data from local storage or create an empty array if it doesn't exist
    let userArray = JSON.parse(localStorage.getItem('userDetails')) || [];

    let newUser = {
        name: name,
        email: email,
        phoneNo: phoneNo,
    };
    axios.post("https://crudcrud.com/api/2c559849e3f84957bad47b9f8e921e82/appointmentData", newUser)
    .then((response) => {
        showUserOnScreen(response.data);
        console.log(response);
    })
    .catch((err) => {
        console.log(err);
    })


    form.reset();

}

function showUserOnScreen(newUser) {
    const ul = document.querySelector('#itemList');
    const li = document.createElement('li');
    li.textContent = newUser.name + ' - ' + newUser.email + ' - ' + newUser.phoneNo;

    // Add delete button
    const dBtn = document.createElement('button');
    dBtn.className = 'btn btn-danger';
    dBtn.appendChild(document.createTextNode('Delete'));
    li.appendChild(dBtn);

    // Add edit button
    const eBtn = document.createElement('button');
    eBtn.className = 'btn btn-primary';
    eBtn.appendChild(document.createTextNode('Edit'));
    li.appendChild(eBtn);

    ul.appendChild(li);

    dBtn.addEventListener('click', removeItem);

    function removeItem() {
        if (confirm('Are you sure you want to delete this user?')) {
            ul.removeChild(li);

            // Get the existing user data from local storage
            let userArray = JSON.parse(localStorage.getItem('userDetails')) || [];

            // Find and remove the user object by email
            userArray = userArray.filter(user => user.email !== newUser.email);

            // Store the updated user array back in local storage
            localStorage.setItem('userDetails', JSON.stringify(userArray));
        }
    }

    // Editing functionality
    eBtn.addEventListener('click', editItem);

    function editItem(){
        if (confirm('Why tell me why?')){
            ul.removeChild(li);
            let userArray = JSON.parse(localStorage.getItem('userDetails')) || [];
            userArray = userArray.filter(user => user.email !== newUser.email);

            localStorage.setItem('userDetails', JSON.stringify(userArray));

            // Populate the form fields with the user's information
            document.querySelector('#userName').value = newUser.name;
            document.querySelector('#emailId').value = newUser.email;
            document.querySelector('#phoneNumber').value = newUser.phoneNo;
        }
    }
}
