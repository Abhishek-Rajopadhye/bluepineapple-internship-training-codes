import { useState, useEffect } from 'react';

function UserDataModule() {
    const [user, setUser] = useState(null);
    const [isUserNotNull, setIsUserNotNull] = useState(false);

    useEffect(() => {
        const fetchUserData = async () => {
            const response = await fetch('https://jsonplaceholder.typicode.com/users');
            if (!response.ok) {
                console.log("Error");
            }
            const data = await response.json();
            setUser(data[0]);
            setIsUserNotNull(true);
        };
        fetchUserData();
    }, []);
    return (
        <>
            {isUserNotNull ? <div><h1>{user.name}</h1><p>{user.email}</p></div> : null}
        </>
    );
}

module.exports = UserDataModule;