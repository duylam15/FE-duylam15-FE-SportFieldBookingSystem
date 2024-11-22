import React, { useState } from 'react';
import NavigateBar from '../../components/NavigateBar'; // Đường dẫn đúng đến component Navbar
import Footer from '../../components/Footer';
// import Post from '../../pages/Post';
import { Outlet } from 'react-router-dom';

export default function LayoutDefault() {
	const [searchTerm, setSearchTerm] = useState("");

	return (
		<div className='layout-app'>
			{/* <NavigateBar /> */}
			<Outlet />
			<Footer />
		</div>
	);
}
