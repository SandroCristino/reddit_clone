import React from 'react';
import { Link } from 'react-router-dom';

export default function Register() {
  return (
    <div class="container py-5 h-100">
        <div class="row d-flex justify-content-center align-items-center h-100">
            <div class="col-12 col-md-8 col-lg- col-xl-5">
                <div class="card shadow">
                    <div class="card-body p-5 text-center">

                        <h3 class="mb-5">Register</h3>

                        <div class="form-outline mb-4">
                            <input type="email" id="typeEmailX-2" class="form-control form-control-lg" />
                            <label class="form-label" for="typeEmailX-2">Name</label>
                        </div>

                        <div class="form-outline mb-4">
                            <input type="email" id="typePasswordX-2" class="form-control form-control-lg" />
                            <label class="form-label" for="typePasswordX-2">Mail</label>
                        </div> 

                        <div class="form-outline mb-4">
                            <input type="password" id="typePasswordX-2" class="form-control form-control-lg" />
                            <label class="form-label" for="typePasswordX-2">Password</label>
                        </div>

                        <div class="form-outline mb-4">
                            <input type="password" id="typePasswordX-2" class="form-control form-control-lg" />
                            <label class="form-label" for="typePasswordX-2">Password Confirmation</label>
                        </div>

                        <button class="btn btn-primary btn-lg btn-block" type="submit">Register</button>

                        <hr class="my-4" />

                        <button class="btn btn-lg btn-block btn-primary"
                            type="submit"><i class="fab fa-google me-2"></i>Register with google</button>
                        <Link 
                            to="/register"
                            class="btn btn-lg btn-block btn-primary mb-2"
                            type="submit"><i class="bi bi-door-open me-2"></i>Register
                        </Link>

                    </div>
                </div>
            </div>
        </div>
    </div>

  );
}
