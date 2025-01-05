const Footer = () => {
    return (
        <div>
            <footer className="footer">
                <div className="footer-container">
                    <div className="footer-section">
                        <h4>About Us</h4>
                        <p>We are dedicated to providing the best service possible.</p>
                    </div>
                    <div className="footer-section">
                        <h4>Contact</h4>
                        <p>Email: info@example.com</p>
                        <p>Phone: +123 456 7890</p>
                    </div>
                    <div className="footer-section">
                        <h4>Follow Us</h4>
                        <p>
                            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">Facebook</a>
                        </p>
                        <p>
                            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">Twitter</a>
                        </p>
                        <p>
                            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">Instagram</a>
                        </p>
                    </div>
                </div>
                <div className="footer-bottom">
                    <p>&copy; 2025 DevSanjibRoy. All rights reserved.</p>
                </div>
            </footer>
        </div>
    );
}


export default Footer;