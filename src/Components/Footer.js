import React from 'react'
import { FaGithub } from 'react-icons/fa/index.js'
import '../Styles/Footer.css'

export default function Footer() {
  return (
    <div className='footer  bg-dark text-light'>
        <footer className='d-flex text-center bg-dark text-light pb-2 pt-1 justify-content-center align-items-center'>
            <p className='mx-3 footerText'>SandroCristino on GitHub</p>
            <a className='footerIcon' href="https://github.com/SandroCristino"  target="_blank" rel="noreferrer"><FaGithub /></a>
        </footer>
    </div>
  )
}