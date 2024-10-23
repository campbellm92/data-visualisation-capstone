import React from 'react'

function Footer() {
  return (
    <>
      <footer className="footer bg-base-100 text-base-content p-20"> 
        <aside>
          <p>
            <span className="text-xl">Localis
              <br />
              Visualise your local
            </span>
            <br />
            <span>Copyright © {new Date().getFullYear()} - All right reserved</span>
          </p>
        </aside>
        <nav>
          <h6 className="footer-title text-center">Services</h6>
          <a className="link link-hover text-center">Formulate Data</a>
          <a className="link link-hover text-center">Data Insights</a>
        </nav>
        <nav>
          <h6 className="footer-title text-center">Company</h6>
          <a className="link link-hover text-center">Our Story</a>
          <a className="link link-hover text-center">Our Process</a>
        </nav>
        <nav>
          <h6 className="footer-title text-center">Legal</h6>
          <a className="link link-hover text-center">Terms of use</a>
          <a className="link link-hover text-center">Privacy policy</a>
          <a className="link link-hover text-center">Cookie policy</a>
        </nav>
      </footer>
    </>
  )
}

export default Footer
