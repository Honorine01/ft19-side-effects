import { useState } from 'react';

import { BASE_URL } from '../../lib/utils';

export default function UserForm({ onUserAdded, selectedUser, onCancel }) {
	// controlled forms

	const [user, setUser] = useState(
    selectedUser
        ? {
              firstName: selectedUser.firstName,
              lastName: selectedUser.lastName,
              email: selectedUser.email,
              phone: selectedUser.phone,
              dob: selectedUser.dob,
          }
        : {
              firstName: '',
              lastName: '',
              email: '',
              phone: '',
              dob: '',
          }
);

function handleCancel() {
    setUser({
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        dob: '',
    });

    onCancel();
}

	// logic for submitting the data collected from the forms
	function handleSubmit(event) {
		event.preventDefault();

		fetch(
    selectedUser
        ? `${BASE_URL}/users/${selectedUser.id}`
        : `${BASE_URL}/users`,
    {
        method: selectedUser ? 'PUT' : 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(user),
		})
			.then((response) => {
				console.log(response);
				if (!response.ok) {
					throw new Error('POST failed');
				}

				return response.json();
			})
			.then((data) => {
				console.log(data);
				setUser({
					firstName: '',
					lastName: '',
					email: '',
					phone: '',
					dob: '',
				});

				onUserAdded();
			})
			.catch((error) => console.error(error));
	}

	return (
		<form
			className="border  px-5 py-8  min-w-3xs flex flex-col gap-3 rounded-2xl shadow-lg overflow-clip shadow-slate-200  border-gray-800/10"
			onSubmit={handleSubmit}
		>
			<div className="mb-5">
				<h2 className="font-bold text-2xl font-barlow">User Details</h2>
				<p className="text-slate-500 text-sm font-sans">
					Enter your information below
				</p>
			</div>
			<div className="flex items-center gap-5 w-full">
				<input
					type="text"
					className="border border-slate-300 w-full outline-blue-500 rounded-md p-3 font-sans"
					placeholder="Firstname"
					value={user.firstName}
					onChange={(event) =>
						setUser({
							...user,
							firstName: event.target.value,
						})
					}
				/>
				<input
					type="text"
					className="border border-slate-300 w-full outline-blue-500 rounded-md p-3 font-sans"
					placeholder="Lastname"
					value={user.lastName}
					onChange={(event) =>
						setUser({
							...user,
							lastName: event.target.value,
						})
					}
				/>
			</div>

			<input
				type="email"
				className="border border-slate-300 w-full outline-blue-500 rounded-md p-3 font-sans"
				placeholder="Email"
				value={user.email}
				onChange={(event) =>
					setUser({
						...user,
						email: event.target.value,
					})
				}
			/>
			<input
				type="tel"
				className="border border-slate-300 w-full outline-blue-500 rounded-md p-3 font-sans"
				placeholder="Phone number"
				value={user.phone}
				onChange={(event) =>
					setUser({
						...user,
						phone: event.target.value,
					})
				}
			/>
			<label className="flex flex-col text-slate-900 gap-1">
				Date of Birth
				<input
					type="date"
					className="border border-slate-300 w-full outline-blue-500 rounded-md p-3 font-sans"
					value={user.dob}
					onChange={(event) =>
						setUser({
							...user,
							dob: event.target.value,
						})
					}
				/>
			</label>

			<button
    type="submit"
    className="p-3 bg-blue-500 text-white rounded-md mt-5 cursor-pointer"
>
    {selectedUser ? 'Update' : 'Submit'}
</button>

{selectedUser && (
    <button
        type="button"
        onClick={handleCancel}
        className="p-3 bg-gray-500 text-white rounded-md cursor-pointer"
    >
        Cancel
    </button>
)}
		</form>
	);
}
