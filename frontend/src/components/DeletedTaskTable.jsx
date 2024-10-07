import React, { useState, useEffect } from "react";

const DeletedTaskTable = () => {
	const [deletedTasks, setDeletedTasks] = useState([]);

	useEffect(() => {
		const token = localStorage.getItem("token");
		console.log("Token from localStorage:", token);
		fetchDeletedTasks();
	}, []);

	const fetchDeletedTasks = async () => {
		const token = localStorage.getItem("token");

		if (!token) {
			console.error("No token found");
			return;
		}

		try {
			const response = await fetch("http://localhost:5000/api/tasks/deleted", {
				method: "GET",
				headers: {
					Authorization: token,
				},
			});

			if (!response.ok) {
				throw new Error(`Error: ${response.status} ${response.statusText}`);
			}

			const data = await response.json();
			// console.log("Response data:", data);

			if (data.status) {
				setDeletedTasks(data.deletedTasks);
			} else {
				console.error("Error fetching deleted tasks:", data.msg);
			}
		} catch (err) {
			console.error("Error fetching deleted tasks:", err);
		}
	};

	return (
		<div className="bg-white px-4 pt-3 pb-4 rounded-sm border border-gray-200 flex-1 mt-4">
			<strong className="text-gray-700 font-medium">Deleted Task Table</strong>
			<div className="mt-3">
				<table className="w-full text-gray-700 table-auto">
					<thead>
						<tr className="bg-gray-200">
							<th className="px-4 py-2">Serial No</th>
							<th className="px-4 py-2">ID</th>
							<th className="px-4 py-2">Description</th>
							<th className="px-4 py-2">Task Type</th>
							<th className="px-4 py-2">Deleted Date</th>
						</tr>
					</thead>
					<tbody>
						{deletedTasks.length === 0 ? (
							<tr>
								<td colSpan="5" className="text-center py-4">
									No deleted tasks found.
								</td>
							</tr>
						) : (
							deletedTasks.map((task, index) => (
								<tr
									key={task._id}
									className={index % 2 === 0 ? "bg-gray-100" : ""}
								>
									<td className="border px-4 py-2">{index + 1}</td>
									<td className="border px-4 py-2">{task._id.substr(0, 8)}</td>
									<td className="border px-4 py-2">{task.description}</td>
									<td className="border px-4 py-2">{task.taskType}</td>
									<td className="border px-4 py-2">
										{new Date(task.deletedAt).toLocaleDateString()}
									</td>
								</tr>
							))
						)}
					</tbody>
				</table>
			</div>
		</div>
	);
};

export default DeletedTaskTable;
