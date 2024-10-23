import React, { useState } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';

function Home() {

	const navigate = useNavigate()
	return (
		<>
			<div onClick={() => { navigate("/fieldList") }}>List field</div>

		</>
	)
}

export default Home