const footer = document.querySelector(".footer")
footer.innerHTML =`
<div class="display-footer">
	<div class="footer-text">
		<p id="made-by">Made By:</p>
		<p id="creator">Sochit Sovattana</p>
	</div>
	<a href="https://anbschool.org/" target="_blank" >
		<img src="./public/header_icon/black.png" draggable="false" id="anb-school">
	</a>
</div>
`
export default function createFooter(){};
