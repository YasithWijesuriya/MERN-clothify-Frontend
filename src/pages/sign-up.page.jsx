import { SignUp } from "@clerk/clerk-react";

function SignUpPage(){
    return(
        <main className="flex items-center justify-center min-h-screen bg-gray-100">
            <SignUp />
        </main>
    )
}
export default SignUpPage;