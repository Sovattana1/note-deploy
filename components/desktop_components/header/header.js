function createHeader() {
	const headerDesktopElement = document.querySelector('.header-desktop');
	headerDesktopElement.innerHTML += `
			<div class="header-background">
					<img id="icon-side-bar-mobile" src="/public/side_bar_icon/cfc3d0aa-c7b4-479f-b705-257262b7c34c-removebg-preview.png">
					<p class="header-text-desktop" id="header-text-mobile"> Diary Application</p>
			</div>
	`;
}


export default createHeader//export to /js/script.js
