import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';


class Footer extends Component {
  render() {
    return (
 <footer className="bg-dark text-white text-center text-lg-start mt-auto">
        <div className="container p-4">
          <div className="row">
            <div className="col-lg-4 col-md-6 mb-4 mb-md-0">
              <h5 className="text-uppercase">About Us</h5>
              <p>
                We are a team of dedicated developers working on web and mobile applications.
              </p>
            </div>
            <div className="col-lg-4 col-md-6 mb-4 mb-md-0">
              <h5 className="text-uppercase">Quick Links</h5>
              <ul className="list-unstyled mb-0">
                <li><a href="#!" className="text-white">Home</a></li>
                <li><a href="#!" className="text-white">About</a></li>
                <li><a href="#!" className="text-white">Services</a></li>
                <li><a href="#!" className="text-white">Contact</a></li>
              </ul>
            </div>
            <div className="col-lg-4 col-md-12 mb-4 mb-md-0">
              <h5 className="text-uppercase">Follow Us</h5>
              <a href="https://facebook.com" className="text-white me-4">
                <i className="fab fa-facebook-f"></i>
              </a>
              <a href="https://twitter.com" className="text-white me-4">
                <i className="fab fa-twitter"></i>
              </a>
              <a href="https://instagram.com" className="text-white me-4">
                <i className="fab fa-instagram"></i>
              </a>
              <a href="https://linkedin.com" className="text-white me-4">
                <i className="fab fa-linkedin"></i>
              </a>
            </div>
          </div>
        </div>
        <div className="text-center p-3" style={{ backgroundColor: 'rgba(0, 0, 0, 0.2)' }}>
          © 2024 My Website. All rights reserved.
        </div>
      </footer>
    );
  }
}

export default Footer;