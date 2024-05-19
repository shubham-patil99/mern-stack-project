import React, { useState } from 'react';
import SignInSide from './components/signin';
import Dashboard from './components/dashbord';

const App = () => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [user, setUser] = useState(null);

    const handleSignIn = (userData) => {
        setIsAuthenticated(true);
        setUser(userData);
    };

    return (
        <div>
            {!isAuthenticated ? (
                <SignInSide onSignIn={handleSignIn} />
            ) : (
                <Dashboard
                    givenName={user.given_name}
                    familyName={user.family_name}
                    email={user.email}
                    picture={user.picture}
                />
            )}
        </div>
    );
};

export default App;
