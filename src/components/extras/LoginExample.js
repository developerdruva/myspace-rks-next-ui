"use client";
import { useEffect, useMemo, useState } from "react";

const LoginExample = () => {
    const [userObj, setUserObj] = useState({
        name: "",
        password: "",
    });
    const [counter1, setCounter1] = useState(0);
    const [counter2, setCounter2] = useState(0);

    useEffect(() => {
        if (localStorage?.getItem("userDetails")?.name === userObj.name) {
            alert("user already exited");
        }
    }, []);

    const submitHandle = (e, userObj) => {
        e.preventDefault();
        console.log(userObj);

        if (userObj.name && userObj.password) {
            if (localStorage.getItem('userName', userObj?.name) === userObj.name) {
                return alert('user already existed.')
            }
            localStorage.setItem("userName", userObj?.name);
            localStorage.setItem("password", userObj?.password);
        } else {
            alert('please enter user name and password');
        }
        // if (!localStorage.getItem("userDetails")) {

        // } else {
        //   if (localStorage?.getItem("userDetails").name === userObj.name) {
        //     alert("user already exited");
        //   }
        // }

    };
    const handleCounter1 = () => {
        setCounter1(counter1 + 1)
    }
    const handleCounter2 = () => {
        // for (let i = 0; i <= 8100000000; i++) {

        // }
        setCounter2(counter2 + 1)
    }

    const isEven = useMemo(() => {
        for (let i = 0; i <= 8100000000; i++) {
        }
        return counter2 % 2 === 0 ? 'Even' : 'Odd'
    }, [counter2])

    return (
        <div>
            <form>
                <input
                    name="name"
                    type="text"
                    onChange={(e) => setUserObj({ ...userObj, name: e.target.value })}
                />
                <input
                    name="password"
                    type="password"
                    onChange={(e) => setUserObj({ ...userObj, password: e.target.value })}
                />
                <button onClick={(e) => submitHandle(e, userObj)}>Submit </button>
                <div>
                    <button onClick={() => localStorage?.clear()}>Clear Storage</button>
                </div>

            </form>
            <div className="m-5">
                {isEven}
            </div>
            <div>
                <div><button onClick={() => handleCounter1()} >Counter 1</button></div>
                {counter1}
            </div>
            <div>
                <div><button onClick={() => handleCounter2()} >Counter 2</button></div>
                {counter2}
            </div>
        </div>
    );
};

export default LoginExample;
