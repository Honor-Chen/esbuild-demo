import React from 'react';
import ReactDOM from 'react-dom/client';

function createApp (App, container = 'root') {
	const root = ReactDOM.createRoot(document.getElementById(container))
	root.render(App)
}

const App = () => (
	<div>Hello ESbuild</div>
)

createApp(<App/>)