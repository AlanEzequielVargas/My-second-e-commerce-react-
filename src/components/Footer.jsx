import React from 'react';
import facebook from '../assets/facebook-icon.png'
import instagram from '../assets/instagram-icon.png'
import twitter from '../assets/twitter-icon.png'
import linkedin from '../assets/linkedin-icon.png'
import google from '../assets/google-icon.png'
import github from '../assets/github-icon.png'

const Footer = () => {
   return (
      
         
      
      <footer className="text-center text-lg-start bg-white text-muted" style={{marginTop: 200}}>
      
        <section className="d-flex justify-content-center justify-content-lg-between p-4 border-bottom">
       
          <div className="me-5 d-none d-lg-block">
            <span>Get connected with us on social networks:</span>
          </div>
        
      
      
          <div> 
            <a href="" className="me-4 link-secondary">
              <img src={facebook} alt="" style={{width: 50 , height: 50}}/>
            </a>
            <a href="" className="me-4 link-secondary">
              <img src={instagram} alt="" style={{width: 50 , height: 50}}/>
            </a>
            <a href="" className="me-4 link-secondary">
              <img src={twitter} alt="" style={{width: 50 , height: 50}}/>
            </a>
            <a href="" className="me-4 link-secondary">
              <img src={linkedin} alt="" style={{width: 50 , height: 50}}/>
            </a>
            <a href="" className="me-4 link-secondary">
              <img src={github} alt="" style={{width: 50 , height: 50}}/>
            </a>
            <a href="" className="me-4 link-secondary">
              <img src={google} alt="" style={{width: 50 , height: 50}}/>
            </a>
          </div>
        
        </section>
      
      
      
        <section className="">
          <div className="container text-center text-md-start mt-5">
       
            <div className="row mt-3">
        
              <div className="col-md-3 col-lg-4 col-xl-3 mx-auto mb-4">
          
                <h6 className="text-uppercase fw-bold mb-4">
                  <i className="fas fa-gem me-3 text-secondary"></i>Free Store
                </h6>
                <p>
                  This is a React project for Academlo by Alan Vargas.  
                </p>
              </div>
             
      
             
              <div className="col-md-2 col-lg-2 col-xl-2 mx-auto mb-4">
               
                <h6 className="text-uppercase fw-bold mb-4">
                  Products
                </h6>
                <p>
                  <a href="#!" className="text-reset">Computers</a>
                </p>
                <p>
                  <a href="#!" className="text-reset">Smartphones</a>
                </p>
                <p>
                  <a href="#!" className="text-reset">Smart TV</a>
                </p>
                <p>
                  <a href="#!" className="text-reset">Kitchen</a>
                </p>
              </div>
             
      
           
              <div className="col-md-3 col-lg-2 col-xl-2 mx-auto mb-4">
              
                <h6 className="text-uppercase fw-bold mb-4">
                  Useful links
                </h6>
                <p>
                  <a href="#!" className="text-reset">Pricing</a>
                </p>
                <p>
                  <a href="#!" className="text-reset">Settings</a>
                </p>
                <p>
                  <a href="#!" className="text-reset">Orders</a>
                </p>
                <p>
                  <a href="#!" className="text-reset">Help</a>
                </p>
              </div>
        
      
         
              <div className="col-md-4 col-lg-3 col-xl-3 mx-auto mb-md-0 mb-4">
               
                <h6 className="text-uppercase fw-bold mb-4">Contact</h6>
                <p><i className="fas fa-home me-3 text-secondary"></i> Rosario , Santa Fe , AR</p>
                <p>
                  <i className="fas fa-envelope me-3 text-secondary"></i>
                  alan@gmail.com
                </p>
                <p><i className="fas fa-phone me-3 text-secondary"></i> + 01 234 567 88</p>
                <p><i className="fas fa-print me-3 text-secondary"></i> + 01 234 567 89</p>
              </div>
       
            </div>
        
          </div>
        </section>
        
      
      
        <div className="text-center p-4" style={{backgroundColor: 'rgba(0, 0, 0, 0.025)'}}>
          © 2022 Copyright: 
          <a className="text-reset fw-bold" href="https://mdbootstrap.com/"> Alan Ezequiel Vargas</a>
        </div>
     
      </footer>
   

    
   );
};

export default Footer;