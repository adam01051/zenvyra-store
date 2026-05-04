import React from "react";
export default function Advertisement() {
	return (
		<div className="browse-style-wrapper">
			<div className="browse-by-dress-style-parent">
				<span className="browse-by-dress">BROWSE BY DRESS STYLE</span>

				<div className="browse-grid">
					<div className="browse-tile casual">
						<img src="/img/image1.png" alt="Casual" />
						<span className="tile-label">Casual</span>
					</div>

					<div className="browse-tile formal">
						<img src="/img/image2.png" alt="Formal" />
						<span className="tile-label">Formal</span>
					</div>

					<div className="browse-tile party">
						<img src="/img/image3.png" alt="Party" />
						<span className="tile-label">Party</span>
					</div>

					<div className="browse-tile gym">
						<img src="/img/image4.png" alt="Gym" />
						<span className="tile-label">Gym</span>
					</div>
				</div>
			</div>
		</div>
	);
}

