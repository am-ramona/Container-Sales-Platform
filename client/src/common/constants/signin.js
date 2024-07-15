
    import { useEffect, useState } from "react";
    import { useLocation } from "react-router-dom";
    
    export default function SignIn() {
        const location = useLocation();
        const search = new URLSearchParams(location.search);
        const signinUser = search.get("signin");
        const [ signin, setSignIn ] = useState(false);

        useEffect(() => {
            setSignIn(signinUser)
          }, [setSignIn]);

        return signin
    }

    /*** to be deleted ***/
