import { useState, useEffect } from 'react';
import { BASE_URL } from '../lib/utils';
import UserForm from '../components/user/user-form';
import UserCard from '../components/user/user-card';

export default function Users() {
	const [users, setUsers] = useState([]);
	const [selectedUser, setSelectedUser] = useState(null);

	function fetchAllUsers() {
		fetch(`${BASE_URL}/users`)
			.then((response) => {
				if (!response.ok) {
					throw new Error('Fetching users failed');
				}

				return response.json();
			})
			.then((data) => setUsers(data))
			.catch((error) => console.error(error));
	}
function handleEdit(user) {
    setSelectedUser(user);
}
function handleCancelEdit() {
  setSelectedUser(null);
}

function handleUserSaved() {
    fetchAllUsers();
    setSelectedUser(null);
}
	useEffect(() => {
		fetchAllUsers();
	}, []);

	return (
		<div>
			<div className="grid grid-cols-5 gap-5">
				<div className="col-span-2">
	<UserForm
  key={selectedUser ? selectedUser.id : 'new'}
  onUserAdded={handleUserSaved}
  selectedUser={selectedUser}
  onCancel={handleCancelEdit}
/>
				</div>
				<div className="col-span-3 flex flex-col gap-5">
					<div className="grid grid-cols-3 gap-5">
						{users.map((user) => (
	<UserCard key={user.id} {...user} onEdit={handleEdit} />
						))}
					</div>
				</div>
			</div>
		</div>
	);
}
