function fetchUsers() {
    fetch('/api/users')
        .then(response => response.json())
        .then(users => {
            const usersList = document.getElementById('usersList');
            usersList.innerHTML = ''; 
            users.forEach(user => {
                const row = document.createElement('tr');
                const idCell = document.createElement('td');
                const nameCell = document.createElement('td');

                idCell.textContent = user.id; 
                nameCell.textContent = user.name;

                idCell.classList.add('id-column'); 
                nameCell.classList.add('name-column'); 
                row.appendChild(idCell);
                row.appendChild(nameCell);

                usersList.appendChild(row);
            });
        });
}

document.getElementById('createUserForm').addEventListener('submit', function(event) {
    event.preventDefault();
    const userName = document.getElementById('userName').value;

    fetch('/api/users', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name: userName }),
    })
    .then(response => response.json())
    .then(() => {
        document.getElementById('userName').value = '';
        fetchUsers(); 
    })
    .catch(error => console.error('Error:', error)); 
})

document.getElementById('updateUserForm').addEventListener('submit', function(event) {
    event.preventDefault();
    const userId = document.getElementById('updateUserId').value;
    const newUserName = document.getElementById('updateUserName').value;

    fetch(`/api/users/${userId}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name: newUserName }),
    })
    .then(response => {
        if (response.ok) {
            return response.json();
        } else {
            throw new Error('Failed to update user');
        }
    })
    .then(() => {
        document.getElementById('updateUserId').value = '';
        document.getElementById('updateUserName').value = '';
        fetchUsers(); 
    })
    .catch(error => console.error('Error:', error));
});

document.getElementById('deleteUserForm').addEventListener('submit', function(event) {
    event.preventDefault();
    const userId = document.getElementById('deleteUserId').value;

    fetch(`/api/users/${userId}`, {
        method: 'DELETE',
    })
    .then(() => {
        document.getElementById('deleteUserId').value = '';
        fetchUsers(); 
    })
    .catch(error => console.error('Error:', error));
});

fetchUsers();
