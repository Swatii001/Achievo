import React, { Fragment, useEffect, useState } from "react";
import { Menu, Popover, Transition } from "@headlessui/react";
import classNames from "classnames";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { logout } from "../redux/actions/authActions";
import { CiMedicalCross } from "react-icons/ci";
import {
	HiOutlineChatAlt,
	HiOutlineSearch,
	HiOutlineBell,
} from "react-icons/hi";
import { Link } from "react-router-dom";

const Header = ({ setSearchTerm }) => {
	const navigate = useNavigate();
	const dispatch = useDispatch();
	const [tasks, setTasks] = useState([]);
	const handleLogoutClick = () => {
		dispatch(logout());
	};
	const handleSearchChange = (e) => {
		setSearchTerm(e.target.value);
	};

	// Function to fetch tasks and filter for notifications
	const fetchTasks = async () => {
		try {
			const response = await fetch("http://localhost:5000/api/tasks", {
				method: "GET",
				headers: {
					Authorization: localStorage.getItem("token"),
				},
			});
			if (response.ok) {
				const data = await response.json();
				setTasks(data.tasks);
			} else {
				console.error("Failed to fetch tasks");
			}
		} catch (error) {
			console.error("Error fetching tasks:", error);
		}
	};

	useEffect(() => {
		fetchTasks();
	}, []);

	// Function to calculate the date 2 days before completion date
	const calculateNotificationDate = (completionDate) => {
		const twoDaysBefore = new Date(completionDate);
		twoDaysBefore.setDate(twoDaysBefore.getDate() - 2);
		return twoDaysBefore;
	};

	// Function to filter tasks for notifications
	const getTasksForNotification = () => {
		const today = new Date();
		return tasks.filter((task) => {
			const completionDate = new Date(task.completionDate);
			const notificationDate = calculateNotificationDate(completionDate);
			return (
				notificationDate.getDate() === today.getDate() &&
				notificationDate.getMonth() === today.getMonth() &&
				notificationDate.getFullYear() === today.getFullYear()
			);
		});
	};

	return (
		<div className="bg-white h-16 px-4 flex items-center border-b border-gray-200 justify-between">
			<div className="relative">
				<HiOutlineSearch
					fontSize={20}
					className="text-gray-400 absolute top-1/2 left-3 -translate-y-1/2"
				/>
				<input
					type="text"
					placeholder="Search..."
					onChange={handleSearchChange}
					className="text-sm focus:outline-none active:outline-none border border-gray-300 w-[24rem] h-10 pl-11 pr-4 rounded-sm"
				/>
			</div>
			<div className="flex items-center gap-2 mr-2">
				<Popover className="relative">
					{({ open }) => (
						<>
							<Popover.Button
								className={classNames(
									open && "bg-gray-100",
									"group inline-flex items-center rounded-sm p-1.5 text-gray-700 hover:text-opacity-100 focus:outline-none active:bg-gray-100"
								)}
							>
								<CiMedicalCross fontSize={24} />
							</Popover.Button>
							<Transition
								as={Fragment}
								enter="transition ease-out duration-200"
								enterFrom="opacity-0 translate-y-1"
								enterTo="opacity-100 translate-y-0"
								leave="transition ease-in duration-150"
								leaveFrom="opacity-100 translate-y-0"
								leaveTo="opacity-0 translate-y-1"
							>
								<Popover.Panel className="absolute right-0 z-10 mt-2.5 transform w-80">
									<div className="bg-white rounded-sm shadow-md ring-1 ring-black ring-opacity-5 px-2 py-2.5">
										<div className="bg-pink-500 text-white hover:bg-green-500 font-medium transition py-2 px-3">
											<Link
												to="/tasks/add"
												className="block w-full h-full px-4 py-2"
											>
												{" "}
												<i className="fa-solid fa-plus"></i> Add task{" "}
											</Link>
										</div>
									</div>
								</Popover.Panel>
							</Transition>
						</>
					)}
				</Popover>
				<Popover className="relative">
					{({ open }) => (
						<>
							<Popover.Button
								className={classNames(
									open && "bg-gray-100",
									"group inline-flex items-center rounded-sm p-1.5 text-gray-700 hover:text-opacity-100 focus:outline-none active:bg-gray-100"
								)}
							>
								<HiOutlineChatAlt fontSize={24} />
							</Popover.Button>
							<Transition
								as={Fragment}
								enter="transition ease-out duration-200"
								enterFrom="opacity-0 translate-y-1"
								enterTo="opacity-100 translate-y-0"
								leave="transition ease-in duration-150"
								leaveFrom="opacity-100 translate-y-0"
								leaveTo="opacity-0 translate-y-1"
							>
								<Popover.Panel className="absolute right-0 z-10 mt-2.5 transform w-80">
									<div className="bg-white rounded-sm shadow-md ring-1 ring-black ring-opacity-5 px-2 py-2.5">
										<strong className="text-gray-700 font-medium">
											Messages
										</strong>
										<div className="mt-2 py-1 text-sm">
											This is messages panel.
										</div>
									</div>
								</Popover.Panel>
							</Transition>
						</>
					)}
				</Popover>

				<Popover className="relative">
					{({ open }) => (
						<>
							<Popover.Button
								className={classNames(
									open && "bg-gray-100",
									"group inline-flex items-center rounded-sm p-1.5 text-gray-700 hover:text-opacity-100 focus:outline-none active:bg-gray-100"
								)}
							>
								<HiOutlineBell fontSize={24} />
							</Popover.Button>
							<Transition
								as={Fragment}
								enter="transition ease-out duration-200"
								enterFrom="opacity-0 translate-y-1"
								enterTo="opacity-100 translate-y-0"
								leave="transition ease-in duration-150"
								leaveFrom="opacity-100 translate-y-0"
								leaveTo="opacity-0 translate-y-1"
							>
								<Popover.Panel className="absolute right-0 z-10 mt-2.5 transform w-80">
									<div className="bg-white rounded-sm shadow-md ring-1 ring-black ring-opacity-5 px-2 py-2.5">
										<strong className="text-gray-700 font-medium">
											Notifications
										</strong>
										<div className="mt-2 py-1 text-sm">
											{getTasksForNotification().map((task) => (
												<div key={task._id}>
													Task "{task.description}" is due in 2 days.
												</div>
											))}
										</div>
									</div>
								</Popover.Panel>
							</Transition>
						</>
					)}
				</Popover>
				<Menu as="div" className="relative">
					<div>
						<Menu.Button className="ml-2 bg-gray-800 flex text-sm rounded-full focus:outline-none focus:ring-2 focus:ring-neutral-400">
							<span className="sr-only">Open user menu</span>
							<div
								className="h-10 w-10 rounded-full bg-sky-500 bg-cover bg-no-repeat bg-center"
								style={{
									backgroundImage:
										'url("https://source.unsplash.com/80x80?face")',
								}}
							>
								<span className="sr-only">Marc Backes</span>
							</div>
						</Menu.Button>
					</div>
					<Transition
						as={Fragment}
						enter="transition ease-out duration-100"
						enterFrom="transform opacity-0 scale-95"
						enterTo="transform opacity-100 scale-100"
						leave="transition ease-in duration-75"
						leaveFrom="transform opacity-100 scale-100"
						leaveTo="transform opacity-0 scale-95"
					>
						<Menu.Items className="origin-top-right z-10 absolute right-0 mt-2 w-48 rounded-sm shadow-md p-1 bg-white ring-1 ring-black ring-opacity-5 focus:outline-none">
							<Menu.Item>
								{({ active }) => (
									<div
										onClick={() => navigate("/profile")}
										className={classNames(
											active && "bg-gray-100",
											"active:bg-gray-200 rounded-sm px-4 py-2 text-gray-700 cursor-pointer focus:bg-gray-200"
										)}
									>
										Your Profile
									</div>
								)}
							</Menu.Item>
							<Menu.Item>
								{({ active }) => (
									<div
										onClick={() => navigate("/settings")}
										className={classNames(
											active && "bg-gray-100",
											"active:bg-gray-200 rounded-sm px-4 py-2 text-gray-700 cursor-pointer focus:bg-gray-200"
										)}
									>
										Settings
									</div>
								)}
							</Menu.Item>
							<Menu.Item>
								{({ active }) => (
									<div
										className={classNames(
											active && "bg-gray-100",
											"active:bg-gray-200 rounded-sm px-4 py-2 text-gray-700 cursor-pointer focus:bg-gray-200"
										)}
										onClick={handleLogoutClick}
									>
										Sign out
									</div>
								)}
							</Menu.Item>
						</Menu.Items>
					</Transition>
				</Menu>
			</div>
		</div>
	);
};

export default Header;
