import React from "react";
import TodoList from "./TodoList";
//include images into your bundle

//create your first component
const Home = () => {
	return (
		<div className="text-center bg-light">
			<TodoList />
		</div>
	);
};

export default Home;