function sideBarIcon(){
	const sideBarIconElemnt = document.querySelector('.side-bar-background');//select element form side_bar.js
	sideBarIconElemnt.innerHTML = `
		<img id="icon-side-bar" src="/public/side_bar_icon/cfc3d0aa-c7b4-479f-b705-257262b7c34c-removebg-preview.png" alt="note icon " draggable="false">
	`;//create html element into index.html
}
export default sideBarIcon//export to /js/script.js