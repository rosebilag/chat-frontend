import React, { useState } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import './style.css';
import Room from '../Room';
import SignUp from '../Signup';
import Login from '../Login';
import NotFound from '../NotFound';
import { SocketService } from '../../services/SocketService';
import { USER_INITIAL_VALUE } from '../../constants';
import { UserContext } from '../../context/UserContext';
import { ChatContext } from '../../context/ChatContext';

const routes = [
	{ path: '/signup', component: SignUp },
	{ path: '/login', component: Login },
	{ path: '/room', component: Room },
	{ path: '/', component: Login }
];

const chat = new SocketService();

function App() {
	const userHook = useState(USER_INITIAL_VALUE);

	return (
		<UserContext.Provider value={userHook}>
			<ChatContext.Provider value={chat}>
				<div className="app">
					<Router>
						<Switch>
							{routes.map(({ path, component }) => <Route key={path} path={path} component={component} exact />)}
							<Route component={NotFound} />
						</Switch>
					</Router>
				</div>
			</ChatContext.Provider>
		</UserContext.Provider>
	);
}

export default App;
