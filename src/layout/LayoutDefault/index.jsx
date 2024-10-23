import React, { useState } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';

export default function LayoutDefault() {
	const [searchTerm, setSearchTerm] = useState("");

	return (
		<div className='layout-app'>
			<nav>nav</nav>
			<Outlet />
		</div>
	);
}
