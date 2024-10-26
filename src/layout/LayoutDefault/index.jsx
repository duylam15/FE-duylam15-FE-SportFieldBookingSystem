import React, { useState } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import NavigateBar from '../../components/Navbar/NavigateBar';

export default function LayoutDefault() {
	const [searchTerm, setSearchTerm] = useState("");

	return (
		<div className='layout-app'>
			<NavigateBar />
			<Outlet />
		</div>
	);
}
