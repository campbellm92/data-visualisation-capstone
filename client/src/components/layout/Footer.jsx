export default function Footer() {
  return (
    <>
      <footer className="footer bg-base-100 text-black p-20">
          <p>
            <span className="text-xl">
              Localis
              <br />
              Visualise your local data
            </span>
          
            <span>
              Copyright © {new Date().getFullYear()} - All rights reserved
            </span>
          </p>
        <nav aria-label="Services Navigation">
          <p className="footer-title text-center">Services</p>
          <a className="link link-hover text-center">Formulate Data</a>
          <a className="link link-hover text-center">Data Insights</a>
        </nav>
        <nav aria-label="Company Navigation">
          <p className="footer-title text-center">Company</p>
          <a className="link link-hover text-center">Our Story</a>
          <a className="link link-hover text-center">Our Process</a>
        </nav>
        <nav aria-label="Legal Navigation">
          <p className="footer-title text-center">Legal</p>
          <a className="link link-hover text-center">Terms of use</a>
          <a className="link link-hover text-center">Privacy policy</a>
          <a className="link link-hover text-center">Cookie policy</a>
        </nav>
      </footer>
    </>
  );
}
