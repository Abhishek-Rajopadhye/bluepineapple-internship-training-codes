import { useState, useEffect } from 'react';

function UserDataModule() {
    /**
     * Decalring variables for the user, and a boolean for cheching whether the user is null or not.
     * Also saving the set state variabel functions.
     */
    const [user, setUser] = useState(null);
    const [isUserNotNull, setIsUserNotNull] = useState(false);

    /**
     * Using useEffect to fetch data from jsonplaceholder.typicode.com/users.
     * Set user state variable on data received.
     * Set the isUserNotNull variable to true to indicate that the user variable is not longer null.
     */

    useEffect(() => {
        async function fetchUserData() {
            const response = await fetch('https://jsonplaceholder.typicode.com/users');
            if (!response.ok) {
                console.log("Error");
            }
            const data = await response.json();
            setUser(data[0]);
            setIsUserNotNull(true);
        };
        fetchUserData();
        /**
         * No dependencies so passing the empty array/list as seconf parameter.
         */
    }, []);

    /**
     * Returning the fragment using conditional rendering.
     */
    return (
        <>
            {isUserNotNull ? <><h1>{user.name}</h1><p>{user.email}</p></> : null}
        </>
    );
}

module.exports = UserDataModule;