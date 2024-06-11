const loginUser = async (email, password) => {
    try {
        const response = await fetch(`${process.env.REACT_APP_TEST_BACKEND_URL}/api/auth/login`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ email, password }),
        });

        const data = await response.json();

        if (!response.ok) {
            throw new Error('Failed to login.');
        }

        return data;
    } catch (error) {
        console.error("Login failed:", error.message);
        throw new Error("Failed to login. Please try again later.");
    }
};

const registerUser = async (name, email, password) => {
    try {
        const response = await fetch(`${process.env.REACT_APP_TEST_BACKEND_URL}/api/auth/register`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, email, password }),
    });

    const data = await response.json();
    if (!response.ok) {
        throw new Error('Failed to register.');
    } 
    return data;
    } catch (error) {
        console.error("Registration failed:", error.message);
        throw new Error("Failed to register. Please try again later.");
    }
};

export { loginUser, registerUser };