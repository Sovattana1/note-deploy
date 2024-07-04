// side_bar_list.js

function createSideBarList() {
	const sideBarListElement = document.querySelector('.side-bar-background'); // Select element from side_bar.js
	sideBarListElement.innerHTML += `
			<ul class="list_side_bar">
					<li class="add-note-list-and-grid-view" id="add-btn">Add Note</li>
			</ul>
	`; // Create HTML element into index.html
}

export default createSideBarList; // Export to file3.js
