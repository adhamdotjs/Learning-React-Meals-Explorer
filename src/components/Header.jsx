import { Container } from "react-bootstrap";
import "../Styles/Header.css";

function Header({ setSearchLetter }) {
	const handleSearchChange  = (e) => {
		const letter = e.target.value.trim().toLowerCase();
		if (letter.length === 1 || letter.length === 0) {
			setSearchLetter(letter);
		}
	};
	return (
		<header>
			<Container>
				<nav>
					<div className="image">
						<a href="#">
							<img
								src="../../public/14852523_5528439.webp"
								alt="Logo"
								loading="lazy"
							/>
						</a>
					</div>
					<search>
						<i className="fa-solid fa-magnifying-glass"></i>
						<input
							type="search"
							placeholder="Search for meal"
							maxLength={1}
							onChange={handleSearchChange}
						/>
					</search>
				</nav>
			</Container>
		</header>
	);
}

export default Header;
