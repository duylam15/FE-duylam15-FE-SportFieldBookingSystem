import React, { useState } from 'react';
import NavigateBar from '../../components/NavigateBar'; // Đường dẫn đúng đến component Navbar
import Footer from '../../components/Footer';
// import Post from '../../pages/Post';
import { Outlet } from 'react-router-dom';
import HeaderUser from '../../components/HeaderUser';
import FooterUser from '../../components/FooterUser';

export default function LayoutDefault() {
	const [searchTerm, setSearchTerm] = useState("");

	return (
		<div className='layout-app'>
			{/* <NavigateBar /> */}
			<HeaderUser></HeaderUser>
			<Outlet />
			<FooterUser></FooterUser>
		</div>
	);
}
