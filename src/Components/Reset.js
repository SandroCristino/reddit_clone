import React, { useEffect, useState } from "react"
import { useAuthState } from "react-firebase-hooks/auth"
import { useNavigate } from "react-router-dom"
import { auth, sendPasswordReset } from "../Components/Firebase.js"

export default function Reset() {
    const [email, setEmail] = useState("")
    const [user, loading] = useAuthState(auth)
    const navigate = useNavigate()

    // Navigate to Sign in
    useEffect(() => {
        if (loading) return
        if (user) navigate("/sign_in")
    }, [user, loading])
    
    // Password reset
    const handleResetPassword = async () => {
        const result = await sendPasswordReset(email)
        if (result) {
          navigate('/sign_in')
        }
    };

    return (
        <div class="container py-5 h-100">
        <div class="row d-flex justify-content-center align-items-center h-100">
            <div class="col-12 col-md-8 col-lg- col-xl-5">
            <div class="card shadow">
                <div class="card-body p-5 text-center">

                {/* Headline */}
                <h3 class="mb-5">Reset Password</h3>

                {/* Email input */}
                <div class="form-outline mb-4">
                    <input 
                    type="email" 
                    id="typeEmailX-2" 
                    class="form-control form-control-lg" 
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    />
                    <label class="form-label" for="typeEmailX-2">Email</label>
                </div>

                {/* Password reset button */}
                <button 
                class="btn btn-primary btn-lg btn-block"
                type="submit"
                onClick={handleResetPassword}
                >
                    Send password to mail
                </button>

                </div>
            </div>
            </div>
        </div>
        </div>
    );
}
