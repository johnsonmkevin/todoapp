import React, { useEffect, useState } from "react";
import ListHeader from "./components/ListHeader";
import ListItem from "./components/ListItem"

function App() {
	const [tasks, setTasks] = useState(null);

	const userEmail = "kevin@test.com";

	const getData = async () => {
		try {
			const response = await fetch(`http://localhost:8000/todos/${userEmail}`)
			const json = await response.json()
			setTasks(json);
		} catch (err) {
			console.error(err);
		}
	};

	useEffect(() => getData, []);//this allows our getData function to not keep running

	console.log(tasks);

	//sort by date
	//compare  dates sort method returns a new array

const sortedTasks = tasks?.sort((a,b)=> new Date(a.date) - new Date(b.date))


	return (
		<div className="app">
			<ListHeader listName={"To Do List📝"} getData={getData} />
			{sortedTasks?.map((task) => (
				<ListItem key={task.id} task={task} getData={getData} />
			))}
		</div>
	);
}

export default App;