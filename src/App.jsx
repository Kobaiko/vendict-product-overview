import { useState, useEffect } from 'react';
import html2pdf from 'html2pdf.js';
import './App.css';
import vendictLogo from './assets/vendict_logo_white.png';
import scaleVideo from './assets/scale.webm';
import vendictUI1 from './assets/vendict_ui_1.png';
import vendictUI2 from './assets/vendict_ui_2.png';
import vendictUI3 from './assets/vendict_ui_3.png';

function App() {
  const [activeSection, setActiveSection] = useState('intro');

  const scrollToSection = (sectionId) => {
    setActiveSection(sectionId);
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const downloadAsPDF = () => {
    // Get the main content element (excluding sidebar)
    const element = document.querySelector('.main-content');
    
    const opt = {
      margin: [0.5, 0.5, 0.5, 0.5],
      filename: 'vendict-product-overview.pdf',
      image: { type: 'jpeg', quality: 0.98 },
      html2canvas: { 
        scale: 2,
        useCORS: true,
        allowTaint: true,
        backgroundColor: '#ffffff',
        logging: false,
        width: element.scrollWidth,
        height: element.scrollHeight
      },
      jsPDF: { 
        unit: 'in', 
        format: 'a4', 
        orientation: 'portrait' 
      }
    };

    // Show loading state
    const button = document.querySelector('.pdf-download-btn');
    const originalText = button.textContent;
    button.textContent = 'Generating PDF...';
    button.disabled = true;

    html2pdf().set(opt).from(element).save().then(() => {
      // Reset button state
      button.textContent = originalText;
      button.disabled = false;
    }).catch((error) => {
      console.error('PDF generation failed:', error);
      button.textContent = originalText;
      button.disabled = false;
      alert('PDF generation failed. Please try again.');
    });
  };

  useEffect(() => {
    const handleScroll = () => {
      const sections = ['intro', 'grc-mentor', 'questionnaire', 'frameworks', 'risk', 'trust', 'success-stories', 'pricing'];
      const scrollPosition = window.scrollY + 200;

      // Check from bottom to top to prioritize lower sections
      for (let i = sections.length - 1; i >= 0; i--) {
        const section = sections[i];
        const element = document.getElementById(section);
        if (element) {
          const { offsetTop } = element;
          if (scrollPosition >= offsetTop) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="App">
      {/* Sidebar Navigation */}
      <div className="sidebar">
        <div className="logo-container">
          <img src={vendictLogo} alt="Vendict Logo" className="logo" />
        </div>
        
        <div className="nav-section">
          <h3>PRODUCT FEATURES</h3>
          <button 
            className={`nav-item ${activeSection === 'intro' ? 'active' : ''}`}
            onClick={() => scrollToSection('intro')}
          >
            <span className="nav-number">1</span>
            Intro
          </button>
          <button 
            className={`nav-item ${activeSection === 'grc-mentor' ? 'active' : ''}`}
            onClick={() => scrollToSection('grc-mentor')}
          >
            <span className="nav-number">2</span>
            GRC Mentor
          </button>
          <button 
            className={`nav-item ${activeSection === 'questionnaire' ? 'active' : ''}`}
            onClick={() => scrollToSection('questionnaire')}
          >
            <span className="nav-number">3</span>
            Questionnaire Response Automation
          </button>
          <button 
            className={`nav-item ${activeSection === 'frameworks' ? 'active' : ''}`}
            onClick={() => scrollToSection('frameworks')}
          >
            <span className="nav-number">4</span>
            Self Assessment (Frameworks)
          </button>
          <button 
            className={`nav-item ${activeSection === 'risk' ? 'active' : ''}`}
            onClick={() => scrollToSection('risk')}
          >
            <span className="nav-number">5</span>
            Third Party Risk Management
          </button>
          <button 
            className={`nav-item ${activeSection === 'trust' ? 'active' : ''}`}
            onClick={() => scrollToSection('trust')}
          >
            <span className="nav-number">6</span>
            Trust Center
          </button>
        </div>

        <div className="nav-section">
          <h3>OTHER</h3>
          <button 
            className={`nav-item ${activeSection === 'success-stories' ? 'active' : ''}`}
            onClick={() => scrollToSection('success-stories')}
          >
            <span className="nav-number">7</span>
            Success Stories
          </button>
          <button 
            className={`nav-item ${activeSection === 'pricing' ? 'active' : ''}`}
            onClick={() => scrollToSection('pricing')}
          >
            <span className="nav-number">8</span>
            Pricing
          </button>
        </div>

        <button 
          className="pdf-download-btn"
          onClick={downloadAsPDF}
        >
          📄 Download this as PDF
        </button>

        <button 
          className="cta-button"
          onClick={() => window.open('https://vendict.com/book-a-demo', '_blank')}
        >
          Continue the conversation
        </button>
      </div>

      {/* Main Content */}
      <div className="main-content">
        {/* Hero Section */}
        <section id="intro" className="hero-section">
          <div className="zero-hallucination-badge">
            <span className="badge-icon">🎯</span>
            <span className="badge-text">
              <strong>Zero Hallucination</strong><br />
              100% Accurate • All The Time
            </span>
          </div>
          
          <div className="hero-content">
            <h1>Meet Vendict: The Only AI You Can Trust With Compliance</h1>
            <p>Automate questionnaires, frameworks, and risk reviews with 100% accurate, zero-hallucination AI. Faster answers. Real trust. No guesswork.</p>
          </div>
        </section>

        {/* GRC Mentor Section */}
        <section id="grc-mentor" className="product-section grc-section">
          <div className="section-content">
            <div className="text-content">
              <h2>GRC Mentor</h2>
              <p className="section-subtitle">Your AI GRC Assistant: Answer any compliance question. Map frameworks. Track evidence. And do it all without errors.</p>
              
              <p>Reclaim your time with AI that answers security questionnaires with zero errors. Free your team to focus on real threats — not spreadsheets.</p>
              
              <h4>Key Features:</h4>
              <ul>
                <li>Trust every answer with zero-hallucination AI – Vendict guarantees responses are 100% accurate and backed by your own compliance data (no AI guesswork).</li>
                <li>Mastery of security language enables smart, context-aware responses.</li>
                <li>Streamline end-to-end compliance workflows, from audits to vendor reviews, so you meet requirements faster without ever sacrificing accuracy.</li>
              </ul>
            </div>
            
            <div className="video-content">
              <video 
                className="product-video grc-video" 
                autoPlay
                loop
                muted
                playsInline
                style={{
                  aspectRatio: '16/9',
                  width: '100%',
                  maxWidth: '640px',
                  height: 'auto'
                }}
              >
                <source src={scaleVideo} type="video/webm" />
                Your browser does not support the video tag.
              </video>
            </div>
          </div>
        </section>

        {/* Questionnaire Response Automation */}
        <section id="questionnaire" className="product-section">
          <div className="section-content">
            <div className="text-content">
              <h2>Questionnaire Response Automation</h2>
              
              <p>Close deals faster by eliminating compliance bottlenecks. Our zero-hallucination AI gives buyers the answers they need — instantly and accurately.</p>
              
              <h4>Key Features:</h4>
              <ul>
                <li>Build instant buyer trust with precise, evidence-backed answers – Vendict's AI delivers only factual information (no surprises), showing prospects your commitment to security.</li>
                <li>AI-led responses handle complex questionnaires with ease and complete accuracy.</li>
                <li>Never lose a deal over compliance holdups – arm your sales team to handle security questionnaires independently, eliminating delays waiting on technical teams and keeping momentum high.</li>
              </ul>
              
              <a 
                href="https://vendict.com/security-questionnaire-automation" 
                target="_blank" 
                rel="noopener noreferrer"
                className="take-closer-look-btn"
              >
                Take a closer look
              </a>
            </div>
            
            <div className="video-content">
              <iframe 
                src="https://drive.google.com/file/d/1QXaSNzbTQWe0wFXPoR8SkSyuyRue1f2A/preview" 
                width="640" 
                height="360" 
                allow="autoplay"
                className="product-video"
                style={{
                  aspectRatio: '16/9',
                  width: '100%',
                  maxWidth: '640px',
                  height: 'auto'
                }}
              ></iframe>
            </div>
          </div>
        </section>

        {/* Self Assessment Frameworks */}
        <section id="frameworks" className="product-section">
          <div className="section-content">
            <div className="text-content">
              <h2>Self Assessment (Frameworks)</h2>
              
              <p>Crush deadlines with AI that delivers verified, evidence-backed RFP responses. Consistent, fast, and always compliant.</p>
              
              <h4>Key Features:</h4>
              <ul>
                <li>Ensure every proposal answer is accurate and compliant – Vendict provides fast and accurate responses that are absolutely hallucination-free (every answer is grounded in real data), giving clients total confidence.</li>
                <li>Comprehensive guidance for over 20 major regulations with verified accuracy.</li>
                <li>Leverage AI-driven answer libraries and smart templates to standardize responses. Maintain consistency and quality across proposals, so no requirement falls through the cracks and every bid shines.</li>
              </ul>
            </div>
            
            <div className="video-content">
              <iframe 
                src="https://drive.google.com/file/d/1v90x6nTM29Lwkzw1EndKb6AmLe3e4l1E/preview" 
                width="640" 
                height="360" 
                allow="autoplay"
                className="product-video"
                style={{
                  aspectRatio: '16/9',
                  width: '100%',
                  maxWidth: '640px',
                  height: 'auto'
                }}
              ></iframe>
            </div>
          </div>
        </section>

        {/* Third Party Risk Management */}
        <section id="risk" className="product-section">
          <div className="section-content">
            <div className="text-content">
              <h2>Third Party Risk Management</h2>
              
              <p>Reduces the manual load, fostering trust and transparency across vendor relationships with verified risk assessments.</p>
              
              <h4>Key Features:</h4>
              <ul>
                <li>Manages vendor ecosystem efficiently, strengthening overall security with zero-hallucination accuracy.</li>
                <li>Prioritizes gap analysis and risk assessment, focusing on high-impact vendors with verified data.</li>
                <li>Streamlines workflows with direct requests for questionnaires and documentation, ensuring 100% accurate vendor assessments.</li>
              </ul>
            </div>
            
            <div className="video-content">
              <iframe 
                src="https://drive.google.com/file/d/1WvKJi6Y-ZBy2GN4vlr-2YhaFPdyvL3s6/preview" 
                width="640" 
                height="360" 
                allow="autoplay"
                className="product-video"
                style={{
                  aspectRatio: '16/9',
                  width: '100%',
                  maxWidth: '640px',
                  height: 'auto'
                }}
              ></iframe>
            </div>
          </div>
        </section>

        {/* Trust Center */}
        <section id="trust" className="product-section">
          <div className="section-content">
            <div className="text-content">
              <h2>Trust Center</h2>
              
              <p>Demonstrates transparency, enhancing client trust and accelerating the sales process with verified compliance data.</p>
              
              <h4>Key Features:</h4>
              <ul>
                <li>Comprehensive guidance for over 20 major regulations with verified accuracy and zero hallucination.</li>
                <li>Rapid gap analysis to pinpoint and close compliance gaps with live updates and verified data.</li>
                <li>Actionable reports for decision-makers, simplifying audit preparation with 100% accurate compliance documentation.</li>
              </ul>
              
              <a 
                href="https://vendict.com/trust-center-product" 
                target="_blank" 
                rel="noopener noreferrer"
                className="take-closer-look-btn"
              >
                Take a closer look
              </a>
            </div>
            
            <div className="video-content">
              <iframe 
                src="https://drive.google.com/file/d/1M4BCt6jURNpKTGo1dSE-OhCZfkn5EMP5/preview" 
                width="640" 
                height="360" 
                allow="autoplay"
                className="product-video"
                style={{
                  aspectRatio: '16/9',
                  width: '100%',
                  maxWidth: '640px',
                  height: 'auto'
                }}
              ></iframe>
            </div>
          </div>
        </section>

        {/* Success Stories */}
        <section id="success-stories" className="success-stories-section">
          <h2>Success Stories</h2>
          
          <div className="testimonials-grid">
            <div className="testimonial-card">
              <div className="company-info">
                <h3>Telit Cinterion</h3>
                <div className="metrics">
                  <span className="metric">Legacy System</span>
                  <span className="metric">Replaced</span>
                </div>
              </div>
              <p>"The Ferrari of Compliance - Telit Cinterion switched to Vendict for superior compliance efficiency and IoT innovation support."</p>
              <div className="author">Global Leader in IoT Innovation</div>
            </div>

            <div className="testimonial-card">
              <div className="company-info">
                <h3>Similarweb</h3>
                <div className="metrics">
                  <span className="metric">Streamlined</span>
                  <span className="metric">Security Process</span>
                </div>
              </div>
              <p>"Similarweb streamlined time spent on security questionnaires, boosting agility and impact with Vendict's zero-hallucination AI."</p>
              <div className="author">Leader in Digital Intelligence</div>
            </div>

            <div className="testimonial-card">
              <div className="company-info">
                <h3>Apono</h3>
                <div className="metrics">
                  <span className="metric">AI-Powered</span>
                  <span className="metric">Growth</span>
                </div>
              </div>
              <p>"Apono used AI for faster growth with Vendict's security solution, streamlining their compliance processes with zero errors."</p>
              <div className="author">Henry Cook, Sales Engineer</div>
            </div>

            <div className="testimonial-card">
              <div className="company-info">
                <h3>Aidoc</h3>
                <div className="metrics">
                  <span className="metric">92% Faster</span>
                  <span className="metric">Zero Failures</span>
                </div>
              </div>
              <p>"Aidoc accelerated sales with 92% faster questionnaire response times, never worrying about wrong answers with Vendict's AI."</p>
              <div className="author">Medical AI Innovation Leader</div>
            </div>

            <div className="testimonial-card">
              <div className="company-info">
                <h3>Orca Security</h3>
                <div className="metrics">
                  <span className="metric">Cloud Security</span>
                  <span className="metric">Optimized</span>
                </div>
              </div>
              <p>"Orca Security enhanced their cloud security compliance workflows with Vendict's zero-hallucination AI platform."</p>
              <div className="author">Cloud Security Leader</div>
            </div>

            <div className="testimonial-card">
              <div className="company-info">
                <h3>Securithings</h3>
                <div className="metrics">
                  <span className="metric">IoT Security</span>
                  <span className="metric">Enhanced</span>
                </div>
              </div>
              <p>"Securithings improved their IoT security compliance processes with Vendict's accurate, hallucination-free AI responses."</p>
              <div className="author">IoT Security Innovation</div>
            </div>
          </div>
        </section>

        {/* Pricing Section */}
        <section id="pricing" className="pricing-section">
          <h2>Choose the right plan for your business</h2>
          
          <div className="pricing-cards-container">
            <div className="pricing-card growing">
              <div className="card-icon-overlay">
                <svg width="80" height="80" viewBox="0 0 80 80" fill="none" className="floating-icon">
                  <path d="M12 20C12 15.5817 15.5817 12 20 12H60C64.4183 12 68 15.5817 68 20V60C68 64.4183 64.4183 68 60 68H20C15.5817 68 12 64.4183 12 60V20Z" fill="url(#growing-gradient)" transform="rotate(15 40 40)"/>
                  <defs>
                    <linearGradient id="growing-gradient" x1="12" y1="12" x2="68" y2="68" gradientUnits="userSpaceOnUse">
                      <stop stopColor="#fb923c"/>
                      <stop offset="1" stopColor="#f97316"/>
                    </linearGradient>
                  </defs>
                </svg>
              </div>
              <div className="card-header">
                <h3>Growing</h3>
              </div>
              
              <div className="pricing-metrics">
                <div className="metric-item">
                  <div className="metric-icon growing-metric">
                    <span className="metric-number">5</span>
                  </div>
                  <span className="metric-label">Questionnaires per month</span>
                </div>
                <div className="metric-item">
                  <div className="metric-icon growing-metric">
                    <span className="metric-number">3</span>
                  </div>
                  <span className="metric-label">Seats</span>
                </div>
                <div className="metric-item">
                  <div className="metric-icon growing-metric">
                    <span className="metric-number">1</span>
                  </div>
                  <span className="metric-label">Product Library</span>
                </div>
              </div>
              
              <div className="features-section">
                <h4>GROWING INCLUDES:</h4>
                <ul>
                  <li>GRC Mentor: Enterprise-grade compliance</li>
                  <li>RFP Expert: Competitive, comprehensive responses</li>
                  <li>Universal autofill with proprietary Generative AI</li>
                  <li>Lightspeed Auto-Complete</li>
                  <li>Zero-Touch Parsing</li>
                  <li>Tagless File-based Knowledge Base</li>
                  <li>5 Minute Onboarding</li>
                  <li>SSO support</li>
                </ul>
              </div>
            </div>

            <div className="pricing-card scaling">
              <div className="card-icon-overlay">
                <svg width="80" height="80" viewBox="0 0 80 80" fill="none" className="floating-icon">
                  <path d="M20 12C17.7909 12 16 13.7909 16 16V60C16 62.2091 17.7909 64 20 64H60C62.2091 64 64 62.2091 64 60V16C64 13.7909 62.2091 12 60 12H20Z" fill="url(#scaling-gradient)"/>
                  <path d="M32 24C29.7909 24 28 25.7909 28 28V44C28 46.2091 29.7909 48 32 48H48C50.2091 48 52 46.2091 52 44V28C52 25.7909 50.2091 24 48 24H32Z" fill="url(#scaling-gradient-inner)"/>
                  <defs>
                    <linearGradient id="scaling-gradient" x1="16" y1="12" x2="64" y2="64" gradientUnits="userSpaceOnUse">
                      <stop stopColor="#8b5cf6"/>
                      <stop offset="1" stopColor="#7c3aed"/>
                    </linearGradient>
                    <linearGradient id="scaling-gradient-inner" x1="28" y1="24" x2="52" y2="48" gradientUnits="userSpaceOnUse">
                      <stop stopColor="#a855f7"/>
                      <stop offset="1" stopColor="#9333ea"/>
                    </linearGradient>
                  </defs>
                </svg>
              </div>
              <div className="card-header">
                <h3>Scaling</h3>
              </div>
              
              <div className="pricing-metrics">
                <div className="metric-item">
                  <div className="metric-icon scaling-metric">
                    <span className="metric-number">15</span>
                  </div>
                  <span className="metric-label">Questionnaires per month</span>
                </div>
                <div className="metric-item">
                  <div className="metric-icon scaling-metric">
                    <span className="metric-number">10</span>
                  </div>
                  <span className="metric-label">Seats</span>
                </div>
                <div className="metric-item">
                  <div className="metric-icon scaling-metric">
                    <span className="metric-number">3</span>
                  </div>
                  <span className="metric-label">Product Libraries</span>
                </div>
              </div>
              
              <div className="features-section">
                <h4>ALL OF <strong>GROWING'S</strong> BENEFITS, PLUS:</h4>
                <ul>
                  <li>Role/Library-based Access Control</li>
                  <li>Integration with Slack & Microsoft Teams</li>
                  <li>Enterprise-grade knowledge base enhancement</li>
                  <li>External Source Integrations (Google Drive, Sharepoint, Confluence, etc.)</li>
                  <li>Audit Preparation for 20+ frameworks</li>
                </ul>
              </div>
            </div>

            <div className="pricing-card enterprise">
              <div className="card-icon-overlay">
                <svg width="80" height="80" viewBox="0 0 80 80" fill="none" className="floating-icon">
                  <path d="M12 32C12 29.7909 13.7909 28 16 28H60C62.2091 28 64 29.7909 64 32V60C64 62.2091 62.2091 64 60 64H16C13.7909 64 12 62.2091 12 60V32Z" fill="url(#enterprise-gradient)"/>
                  <path d="M32 16C29.7909 16 28 17.7909 28 20V44C28 46.2091 29.7909 48 32 48H60C62.2091 48 64 46.2091 64 44V20C64 17.7909 62.2091 16 60 16H32Z" fill="url(#enterprise-gradient-2)"/>
                  <defs>
                    <linearGradient id="enterprise-gradient" x1="12" y1="28" x2="64" y2="64" gradientUnits="userSpaceOnUse">
                      <stop stopColor="#06b6d4"/>
                      <stop offset="1" stopColor="#0891b2"/>
                    </linearGradient>
                    <linearGradient id="enterprise-gradient-2" x1="28" y1="16" x2="64" y2="48" gradientUnits="userSpaceOnUse">
                      <stop stopColor="#22d3ee"/>
                      <stop offset="1" stopColor="#06b6d4"/>
                    </linearGradient>
                  </defs>
                </svg>
              </div>
              <div className="card-header">
                <h3>Enterprise</h3>
              </div>
              
              <div className="pricing-metrics">
                <div className="metric-item">
                  <div className="metric-icon enterprise-metric">
                    <span className="metric-number">25+</span>
                  </div>
                  <span className="metric-label">Questionnaires per month</span>
                </div>
                <div className="metric-item">
                  <div className="metric-icon enterprise-metric">
                    <span className="metric-number">20+</span>
                  </div>
                  <span className="metric-label">Seats</span>
                </div>
                <div className="metric-item">
                  <div className="metric-icon enterprise-metric">
                    <span className="metric-number">5+</span>
                  </div>
                  <span className="metric-label">Product Libraries</span>
                </div>
              </div>
              
              <div className="features-section">
                <h4>ALL OF <strong>SCALING'S</strong> BENEFITS, PLUS:</h4>
                <ul>
                  <li>Zero-Maintenance Knowledge Base</li>
                  <li>Multilingual support in 40+ languages</li>
                  <li>Custom integrations (Salesforce, GRC tools, or others)</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Call to Action Footer */}
          <div className="pricing-footer">
            <div className="footer-content">
              <h3>Ready to transform your compliance process?</h3>
              <p>Join hundreds of companies who trust Vendict for zero-hallucination AI compliance automation.</p>
              <button 
                className="footer-cta-button"
                onClick={() => window.open('https://vendict.com/book-a-demo', '_blank')}
              >
                Continue the conversation
              </button>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}

export default App;

