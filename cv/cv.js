// Scroll animation for sections
window.addEventListener('scroll', () => {
    document.querySelectorAll('.animate-section').forEach(section => {
        const rect = section.getBoundingClientRect();
        if (rect.top < window.innerHeight * 0.8) {
            section.classList.add('in-view');
        }
    });
    
    // Show back-to-top button when scrolled down
    const backToTopButton = document.getElementById('backToTop');
    if (backToTopButton) {
        if (window.scrollY > 300) {
            backToTopButton.classList.add('visible');
        } else {
            backToTopButton.classList.remove('visible');
        }
    }
});

// Initialize animations when page loads
document.addEventListener('DOMContentLoaded', () => {
    // Initial check for elements in view
    document.querySelectorAll('.animate-section').forEach(section => {
        const rect = section.getBoundingClientRect();
        if (rect.top < window.innerHeight * 0.8) {
            section.classList.add('in-view');
        }
    });
    
    // Start animations for elements above the fold
    setTimeout(() => {
        const firstSection = document.querySelector('.animate-section');
        if (firstSection) {
            firstSection.classList.add('in-view');
        }
    }, 300);
    
    // Initialize lazy loading for images
    initLazyLoading();
    
    // Initialize skill bars
    initializeSkillBars();
    
    // Set up contact form
    setupContactForm();
    
    // Set up portfolio gallery
    setupPortfolioGallery();
    
    // Set up CV download
    setupCVDownload();
    
    // Trigger scroll once to initialize animations
    window.dispatchEvent(new Event('scroll'));
});

// Certificate links click handler
document.querySelectorAll(".certificate-list li").forEach(item => {
    item.addEventListener("click", function() {
        let link = this.getAttribute("data-link");
        if (link) {
            window.open(link, '_blank');
        }
    });
});

// Project card hover animation (backup for CSS animation)
document.querySelectorAll('.project-card').forEach(card => {
    card.addEventListener('mouseover', () => {
        card.style.transform = 'translateX(20px)';
    });
    card.addEventListener('mouseout', () => {
        card.style.transform = 'translateX(0)';
    });
});

// Project modal handlers
document.getElementById('b1')?.addEventListener('click', function() {
    document.getElementById('projectModal').style.display = 'block';
    
    // Load the content for Project 1: Advanced Equation Solver
    const modalContent = document.getElementById('modalContent');
    modalContent.innerHTML = `
        <h2>🖥️ Advanced Equation Solver & Visualizer</h2>
        <h3>Purpose:</h3>
        <p>A sophisticated mathematical application designed to solve and visualize complex polynomial equations up to the fourth degree, providing both numerical solutions and graphical representations.</p>
        
        <h3>Key Features:</h3>
        <ul class="feature-list">
            <li>🌓 Modern GUI with customizable dark/light themes</li>
            <li>📱 Responsive layout adapting to different screen sizes</li>
            <li>🔢 Support for various equation input formats with syntax validation</li>
            <li>📊 Real-time equation display with LaTeX rendering</li>
            <li>📈 Interactive 2D and 3D visualization of polynomial functions</li>
            <li>🧮 Step-by-step solution breakdown with mathematical explanations</li>
            <li>📚 Comprehensive solution history with search capabilities</li>
            <li>📋 Export solutions in various formats (PDF, LaTeX, Plain Text)</li>
            <li>⚡ Performance optimization for solving complex equations quickly</li>
        </ul>

        <h3>Technical Implementation:</h3>
        <ul class="tech-specs">
            <li><strong>Core Algorithm:</strong> Leverages SymPy's symbolic mathematics for solving equations with high precision</li>
            <li><strong>Visualization:</strong> Uses Matplotlib and NumPy for generating detailed function graphs and solution plots</li>
            <li><strong>Architecture:</strong> Modular design with separation of calculation engine and presentation layer</li>
            <li><strong>UI Framework:</strong> Custom Tkinter implementation with sv_ttk for modern styling</li>
            <li><strong>Performance:</strong> Multithreaded computation for handling complex calculations without freezing the UI</li>
        </ul>
        
        <h3>Impact & Results:</h3>
        <p>This application has significantly reduced the time needed for mathematical problem-solving, particularly for students and engineers working with complex polynomial equations. The visualization features provide intuitive understanding of mathematical concepts that are typically difficult to grasp through equations alone.</p>
    `;
});

document.getElementById('b2')?.addEventListener('click', function() {
    document.getElementById('projectModal').style.display = 'block';
    
    // Load the content for Project 2: Enterprise Inventory System
    const modalContent = document.getElementById('modalContent');
    modalContent.innerHTML = `
        <h2>🏪 Enterprise Inventory Management System</h2>
        <h3>Purpose:</h3>
        <p>A comprehensive ERP-like solution designed for businesses of all sizes to efficiently manage inventory, track sales, handle customer relationships, and generate detailed financial reports with real-time analytics.</p>
        
        <h3>Key Features:</h3>
        <ul class="feature-list">
            <li>📊 Interactive analytics dashboard with customizable KPI tracking</li>
            <li>📦 Advanced inventory management with multi-location support</li>
            <li>🔍 Barcode/QR code scanning integration for rapid stock processing</li>
            <li>🤖 Automated purchase order generation based on inventory thresholds</li>
            <li>🧾 Comprehensive invoicing system with multiple payment gateway integration</li>
            <li>👥 Customer relationship management with purchase history and segmentation</li>
            <li>📈 Financial forecasting using historical data and ML algorithms</li>
            <li>📱 Fully responsive design optimized for desktop, tablet, and mobile</li>
            <li>🔐 Role-based access control with detailed audit logging</li>
            <li>🔄 Real-time synchronization across multiple devices and locations</li>
        </ul>

        <h3>Technical Architecture:</h3>
        <ul class="tech-specs">
            <li><strong>Backend:</strong> Django REST framework with optimized database queries</li>
            <li><strong>Database:</strong> PostgreSQL with advanced indexing for performance optimization</li>
            <li><strong>Caching:</strong> Redis for session management and frequently accessed data</li>
            <li><strong>Frontend:</strong> React with Redux for state management and Bootstrap for responsive UI</li>
            <li><strong>Analytics:</strong> Custom data visualization layer built with Chart.js</li>
            <li><strong>Deployment:</strong> Containerized with Docker and orchestrated for high availability</li>
            <li><strong>API:</strong> RESTful architecture with comprehensive documentation and endpoint versioning</li>
        </ul>

        <h3>Business Impact:</h3>
        <p>This system has been implemented in multiple retail businesses, resulting in an average of 35% increase in inventory turnover, 28% reduction in stockouts, and 40% less time spent on inventory management tasks. The financial forecasting features have helped businesses optimize their purchasing decisions, leading to improved cash flow and reduced excess inventory costs.</p>
    `;
});

document.getElementById('b3')?.addEventListener('click', function() {
    document.getElementById('projectModal').style.display = 'block';
    
    // Load the content for Project 3: Interactive Python Gaming Engine
    const modalContent = document.getElementById('modalContent');
    modalContent.innerHTML = `
        <h2>🎮 Interactive Python Gaming Engine</h2>
        <h3>Purpose:</h3>
        <p>A versatile and extensible gaming platform built with Python that combines classic games with modern features, offering a framework for rapid game development and customization.</p>
        
        <h3>Key Features:</h3>
        <ul class="feature-list">
            <li>🐍 Multiple game implementations including Snake, Tetris, and Pong</li>
            <li>✨ Advanced physics engine with collision detection and resolution</li>
            <li>🔧 Modular architecture allowing easy addition of new games and components</li>
            <li>🎛️ Customizable gameplay elements including difficulty, speed, and themes</li>
            <li>👾 AI opponents with adjustable difficulty using reinforcement learning</li>
            <li>🏆 Global and local leaderboards with persistent storage</li>
            <li>🎨 Custom animation system with sprite management</li>
            <li>🔊 Sound manager with dynamic audio responses to gameplay</li>
            <li>🌐 Cross-platform compatibility (Windows, macOS, Linux)</li>
            <li>⌨️ Customizable control schemes with gamepad support</li>
        </ul>

        <h3>Technical Implementation:</h3>
        <ul class="tech-specs">
            <li><strong>Core Engine:</strong> Built with Pygame with custom extensions for improved performance</li>
            <li><strong>Architecture:</strong> Implemented using object-oriented design patterns (Factory, Observer, Command)</li>
            <li><strong>AI System:</strong> Custom neural network implementation for enemy behavior</li>
            <li><strong>Data Management:</strong> SQLite database for game state persistence and leaderboards</li>
            <li><strong>Rendering:</strong> Custom rendering pipeline with optimization for smooth animations</li>
            <li><strong>Input Handling:</strong> Event-based system supporting multiple input methods</li>
        </ul>
        
        <h3>Development Challenges:</h3>
        <p>Creating a unified framework that could support multiple game types while maintaining performance was the biggest challenge. This required designing a flexible yet efficient architecture that could handle various game mechanics without compromising speed or responsiveness. The implementation of the AI system also required extensive testing and optimization to ensure challenging but fair gameplay.</p>
    `;
});



// Add handler for the ML Dashboard demo button
document.getElementById('mlDashboardButton')?.addEventListener('click', function() {
    alert('The ML Dashboard demo would launch in a production environment. This is currently a placeholder.');
    
    this.style.transform = 'scale(0.95)';
    setTimeout(() => {
        this.style.transform = 'scale(1)';
    }, 200);
});

document.querySelector('.close-btn')?.addEventListener('click', function() {
    document.getElementById('projectModal').style.display = 'none';
});

window.onclick = function(event) {
    if (event.target.className === 'modal') {
        event.target.style.display = 'none';
    }
};

// Enhanced theme toggle with proper transition effect
const themeSwitch = document.getElementById('themeSwitch');
if (themeSwitch) {
    const moonIcon = themeSwitch.querySelector('i');
    
    // Check for saved theme preference
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
        document.body.classList.add('dark-mode');
        if (moonIcon) {
            moonIcon.classList.remove('fa-moon');
            moonIcon.classList.add('fa-sun');
        }
        themeSwitch.style.transform = 'rotate(180deg)';
        
        // Update header SVG in dark mode
        updateHeaderSvg();
    }
    
    themeSwitch.addEventListener('click', () => {
        document.body.classList.toggle('dark-mode');
        
        // Apply transition effect to all elements that need color changes
        document.querySelectorAll('section, .modal-content, .project-card').forEach(element => {
            element.style.transition = 'background-color 0.5s ease, color 0.5s ease, box-shadow 0.5s ease';
        });
        
        // Update header SVG
        updateHeaderSvg();
        
        // Toggle between moon and sun icons
        if (moonIcon) {
            if (document.body.classList.contains('dark-mode')) {
                moonIcon.classList.remove('fa-moon');
                moonIcon.classList.add('fa-sun');
                themeSwitch.style.transform = 'rotate(180deg)';
                localStorage.setItem('theme', 'dark');
            } else {
                moonIcon.classList.remove('fa-sun');
                moonIcon.classList.add('fa-moon');
                themeSwitch.style.transform = 'rotate(0deg)';
                localStorage.setItem('theme', 'light');
            }
        }
        
        // Reset and animate skill bars
        resetAndAnimateSkillBars();
    });
}

// Function to update header SVG in dark mode
function updateHeaderSvg() {
    const header = document.querySelector('header');
    if (header) {
        const isDarkMode = document.body.classList.contains('dark-mode');
        
        if (isDarkMode) {
            header.style.setProperty('--header-svg-fill', '#1E2A3A');
        } else {
            header.style.setProperty('--header-svg-fill', '#ffffff');
        }
    }
}

// Project code handlers - REMOVED (now handled in setupViewCodeButtons function)

// Add a helper function to escape HTML for code display
function escapeHtml(unsafe) {
    return unsafe
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#039;");
}

// Back to top functionality
document.getElementById('backToTop')?.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

// Reset and animate skill bars for theme change or initial load
function resetAndAnimateSkillBars() {
    const skillBars = document.querySelectorAll('.skill-bar');
    
    // First reset all
    skillBars.forEach(bar => {
        const originalWidth = bar.style.width;
        bar.style.width = '0';
        bar.classList.remove('animate');
        
        // Force reflow
        void bar.offsetWidth;
        
        // Then animate
        setTimeout(() => {
            bar.style.width = originalWidth;
            bar.classList.add('animate');
        }, 100);
    });
}

// Initialize skill bars on page load
function initializeSkillBars() {
    const skillBars = document.querySelectorAll('.skill-bar');
    
    skillBars.forEach((bar, index) => {
        // Store original width
        const originalWidth = bar.style.width;
        
        // Start with 0 width
        bar.style.width = '0';
        
        // Animate after a short delay based on index
        setTimeout(() => {
            bar.style.width = originalWidth;
            bar.classList.add('animate');
        }, 300 + (index * 100)); // Stagger the animations
    });
}

// Initialize lazy loading
function initLazyLoading() {
    const lazyImages = document.querySelectorAll('img[loading="lazy"]');
    
    if (lazyImages.length === 0) return;
    
    // Create IntersectionObserver
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                
                // Add loaded class when the image is fully loaded
                img.onload = () => {
                    img.classList.add('loaded');
                };
                
                // Stop observing once it's loaded
                observer.unobserve(img);
            }
        });
    }, { rootMargin: '50px' });
    
    // Observe all lazy images
    lazyImages.forEach(img => {
        imageObserver.observe(img);
    });
}

    

// Set up portfolio gallery
function setupPortfolioGallery() {
    const portfolioLinks = document.querySelectorAll('.portfolio-link');
    const projectModal = document.getElementById('projectModal');
    const modalContent = document.getElementById('modalContent');
    
    if (portfolioLinks.length > 0) {
        portfolioLinks.forEach(link => {
            link.addEventListener('click', function(e) {
                e.preventDefault();
                
                const project = this.getAttribute('data-project');
                
                // Show the modal
                projectModal.style.display = 'block';
                
                // Load appropriate content based on project
                switch(project) {
                    case 'equationSolver':
                        document.getElementById('b1').click();
                        break;
                    case 'storeSystem':
                        document.getElementById('b2').click();
                        break;
                    case 'calculator':
                        document.getElementById('b3').click();
                        break;
                    case 'snakeGame':
                        modalContent.innerHTML = `
                            <h2>🐍 Snake Game</h2>
                            <h3>Purpose:</h3>
                            <p>A recreation of the classic Snake game with modern features and customizations, built with Python.</p>
                            
                            <h3>Key Features:</h3>
                            <ul class="feature-list">
                                <li>🎮 Classic snake gameplay with modern visuals</li>
                                <li>🌟 Multiple difficulty levels</li>
                                <li>🏆 Score tracking and high score system</li>
                                <li>🎨 Customizable snake appearance</li>
                                <li>🔊 Sound effects and background music</li>
                                <li>⏱️ Game pause functionality</li>
                            </ul>
                    
                            <h3>Technical Details:</h3>
                            <ul class="tech-specs">
                                <li><strong>Language:</strong> Python 3.x</li>
                                <li><strong>Libraries:</strong> Pygame for game development</li>
                                <li><strong>Architecture:</strong> Object-oriented design with game state management</li>
                                <li><strong>Implementation:</strong> Collision detection, vector movement, and food generation algorithms</li>
                            </ul>
                        `;
                        break;
                    case 'advancedSnakeGame':
                        modalContent.innerHTML = `
                            <h2>🐍 Advanced Snake Game</h2>
                            <h3>Purpose:</h3>
                            <p>An enhanced version of the classic Snake game featuring improved graphics, gameplay mechanics, and customization options.</p>
                            
                            <h3>Key Features:</h3>
                            <ul class="feature-list">
                                <li>🎮 Dynamic snake rendering with gradient effect and animated eyes</li>
                                <li>🔄 Direction queue for more responsive controls</li>
                                <li>⚡ Combo system with score multipliers</li>
                                <li>🌟 Special bonus food items</li>
                                <li>⏸️ Pause functionality with overlay screen</li>
                                <li>🏆 Persistent high score system</li>
                                <li>🎨 Customizable snake and food colors</li>
                                <li>⚙️ Adjustable game speed and grid visibility</li>
                                <li>🔊 Sound effects with toggle option</li>
                            </ul>
                    
                            <h3>Technical Details:</h3>
                            <ul class="tech-specs">
                                <li><strong>Language:</strong> Python 3.x</li>
                                <li><strong>Libraries:</strong> Pygame, json (for save data)</li>
                                <li><strong>Architecture:</strong> Advanced object-oriented design with state management</li>
                                <li><strong>UI Design:</strong> Animated menus and game elements with visual feedback</li>
                                <li><strong>Implementation:</strong> Enhanced collision detection, animation systems, and settings persistence</li>
                            </ul>
                        `;
                        break;
                    case 'storeDashboard':
                        modalContent.innerHTML = `
                            <h2>🏪 Store Dashboard</h2>
                            <h3>Purpose:</h3>
                            <p>A comprehensive web-based dashboard for retail stores to manage inventory, track sales, and monitor financial performance.</p>
                            
                            <h3>Key Features:</h3>
                            <ul class="feature-list">
                                <li>📊 Real-time sales analytics and KPIs</li>
                                <li>📦 Complete inventory management system</li>
                                <li>💵 Financial performance tracking</li>
                                <li>⚠️ Low stock alerts and notifications</li>
                                <li>📝 Invoice generation and management</li>
                                <li>👥 Customer debt tracking system</li>
                                <li>📊 Visual data representation with charts</li>
                                <li>📱 Responsive design for all devices</li>
                            </ul>
                    
                            <h3>Technical Details:</h3>
                            <ul class="tech-specs">
                                <li><strong>Frontend:</strong> HTML/CSS, JavaScript, Bootstrap</li>
                                <li><strong>Backend:</strong> Django with Python</li>
                                <li><strong>Database:</strong> SQLite for data persistence</li>
                                <li><strong>Charts:</strong> Chart.js for data visualization</li>
                                <li><strong>Deployment:</strong> Containerized with Docker for easy deployment</li>
                            </ul>
                        `;
                        break;
                    default:
                        modalContent.innerHTML = '<p>Project details not available</p>';
                }
            });
        });
    }
    
    // Set animation delay for portfolio items
    const portfolioItems = document.querySelectorAll('.portfolio-item');
    portfolioItems.forEach((item, index) => {
        item.style.setProperty('--item-index', index);
    });
}


// Handle image loading errors
document.addEventListener('DOMContentLoaded', function() {
    // Set up image error handling
    setupImageErrorHandling();
    
    // Set up portfolio modal
    setupPortfolioModal();
    
    // Set up View Code buttons
    setupViewCodeButtons();
});

// Handle image loading errors
function setupImageErrorHandling() {
    setTimeout(function() {
        // Set up image error handling for code screenshots
        document.querySelectorAll('.code-screenshot').forEach(img => {
            img.addEventListener('error', function() {
                console.log("Image failed to load, creating placeholder: ", img.src);
                
                // Create a canvas element to replace the missing image
                const canvas = document.createElement('canvas');
                canvas.width = 800;  // Match the screenshot dimensions better
                canvas.height = 600;
                canvas.className = 'code-screenshot placeholder-canvas';
                
                // Draw a placeholder
                const ctx = canvas.getContext('2d');
                
                // Fill background based on image alt text (light/dark)
                if (img.alt.includes('Dark')) {
                    ctx.fillStyle = '#1e1e1e';
                } else {
                    ctx.fillStyle = '#f5f5f5';
                }
                ctx.fillRect(0, 0, canvas.width, canvas.height);
                
                // Create a more detailed placeholder with code-like elements
                if (img.src.includes('223117')) {
                    // Light mode version
                    drawEquationSolverPlaceholder(ctx, 'light', canvas.width, canvas.height);
                } else if (img.src.includes('223137')) {
                    // Dark mode version
                    drawEquationSolverPlaceholder(ctx, 'dark', canvas.width, canvas.height);
                } else if (img.alt.includes('Equation')) {
                    drawEquationSolverPlaceholder(ctx, img.alt.includes('Dark') ? 'dark' : 'light', canvas.width, canvas.height);
                } else if (img.alt.includes('Snake')) {
                    drawSnakePlaceholder(ctx, img.alt.includes('Dark') ? 'dark' : 'light', canvas.width, canvas.height);
                }
                
                // Replace the img with the canvas
                img.parentNode.replaceChild(canvas, img);
            });
        });
    }, 500); // Small delay to allow DOM to fully load
}

// Helper function to draw equation solver placeholder
function drawEquationSolverPlaceholder(ctx, theme, width, height) {
    const isDark = theme === 'dark';
    
    // Colors based on theme
    const bgColor = isDark ? '#1e1e1e' : '#f5f5f5';
    const textColor = isDark ? '#ffffff' : '#333333';
    const accentColor = isDark ? '#4ECDC4' : '#0078d7';
    const borderColor = isDark ? '#777777' : '#cccccc';
    
    // Header
    ctx.fillStyle = isDark ? '#2d2d2d' : '#e1e1e1';
    ctx.fillRect(0, 0, width, 60);
    
    // Title
    ctx.fillStyle = textColor;
    ctx.font = 'bold 24px Arial';
    ctx.textAlign = 'center';
    ctx.fillText('Advanced Equation Solver', width / 2, 35);
    
    // Draw sections
    // Input section
    ctx.fillStyle = isDark ? '#2d2d2d' : '#e9e9e9';
    ctx.fillRect(20, 80, width / 2 - 40, height - 140);
    
    // Title for input section
    ctx.fillStyle = textColor;
    ctx.font = 'bold 18px Arial';
    ctx.textAlign = 'left';
    ctx.fillText('Equation Input', 40, 110);
    
    // Input field
    ctx.fillStyle = isDark ? '#3d3d3d' : '#ffffff';
    ctx.fillRect(40, 130, width / 2 - 80, 40);
    ctx.strokeStyle = borderColor;
    ctx.lineWidth = 1;
    ctx.strokeRect(40, 130, width / 2 - 80, 40);
    
    // Sample equation
    ctx.fillStyle = accentColor;
    ctx.font = '16px Arial';
    ctx.fillText('x^4 + 2*x^3 - 3*x^2 + 4*x - 5 = 0', 60, 155);
    
    // Buttons
    ctx.fillStyle = accentColor;
    ctx.fillRect(40, 190, 100, 40);
    ctx.fillRect(150, 190, 100, 40);
    ctx.fillRect(260, 190, 100, 40);
    
    ctx.fillStyle = '#ffffff';
    ctx.font = '14px Arial';
    ctx.fillText('Solve', 75, 215);
    ctx.fillText('Plot', 185, 215);
    ctx.fillText('Clear', 295, 215);
    
    // Results section
    ctx.fillStyle = textColor;
    ctx.font = 'bold 18px Arial';
    ctx.fillText('Results', 40, 260);
    
    ctx.fillStyle = isDark ? '#3d3d3d' : '#ffffff';
    ctx.fillRect(40, 280, width / 2 - 80, 200);
    ctx.strokeStyle = borderColor;
    ctx.strokeRect(40, 280, width / 2 - 80, 200);
    
    // Visualization section
    ctx.fillStyle = isDark ? '#2d2d2d' : '#e9e9e9';
    ctx.fillRect(width / 2 + 20, 80, width / 2 - 40, height - 140);
    
    // Title for visualization
    ctx.fillStyle = textColor;
    ctx.font = 'bold 18px Arial';
    ctx.textAlign = 'left';
    ctx.fillText('Equation Visualization', width / 2 + 40, 110);
    
    // Plot area
    ctx.fillStyle = isDark ? '#3d3d3d' : '#ffffff';
    ctx.fillRect(width / 2 + 40, 130, width / 2 - 80, 350);
    
    // Status bar
    ctx.fillStyle = isDark ? '#2d2d2d' : '#e1e1e1';
    ctx.fillRect(0, height - 40, width, 40);
    
    ctx.fillStyle = textColor;
    ctx.font = '14px Arial';
    ctx.textAlign = 'left';
    ctx.fillText(isDark ? 'Ready (Dark Theme)' : 'Theme changed to light', 20, height - 15);
}

// Helper function to draw snake game placeholder
function drawSnakePlaceholder(ctx, theme, width, height) {
    const isDark = theme === 'dark';
    
    // Colors based on theme
    const bgColor = isDark ? '#1e1e1e' : '#f5f5f5';
    const textColor = isDark ? '#ffffff' : '#333333';
    const snakeColor = isDark ? '#4ECDC4' : '#0078d7';
    const foodColor = '#FF6B6B';
    const borderColor = isDark ? '#777777' : '#333333';
    
    // Header
    ctx.fillStyle = isDark ? '#2d2d2d' : '#e1e1e1';
    ctx.fillRect(0, 0, width, 60);
    
    // Title
    ctx.fillStyle = textColor;
    ctx.font = 'bold 24px Arial';
    ctx.textAlign = 'center';
    ctx.fillText('Advanced Snake Game', width / 2, 35);
    
    // Game area
    ctx.fillStyle = isDark ? '#2d2d2d' : '#e9e9e9';
    ctx.fillRect(50, 80, width - 100, height - 160);
    ctx.strokeStyle = borderColor;
    ctx.lineWidth = 2;
    ctx.strokeRect(50, 80, width - 100, height - 160);
    
    // Grid lines
    ctx.strokeStyle = isDark ? '#3d3d3d' : '#d9d9d9';
    ctx.lineWidth = 1;
    
    // Vertical grid lines
    const cellSize = 20;
    for (let x = 50; x <= width - 50; x += cellSize) {
        ctx.beginPath();
        ctx.moveTo(x, 80);
        ctx.lineTo(x, height - 80);
        ctx.stroke();
    }
    
    // Horizontal grid lines
    for (let y = 80; y <= height - 80; y += cellSize) {
        ctx.beginPath();
        ctx.moveTo(50, y);
        ctx.lineTo(width - 50, y);
        ctx.stroke();
    }
    
    // Draw snake
    ctx.fillStyle = snakeColor;
    // Snake head
    const headX = Math.floor(width / 2);
    const headY = Math.floor(height / 2);
    ctx.fillRect(headX, headY, cellSize, cellSize);
    
    // Snake body
    for (let i = 1; i < 5; i++) {
        ctx.fillRect(headX - (i * cellSize), headY, cellSize, cellSize);
    }
    
    // Draw food
    ctx.fillStyle = foodColor;
    ctx.beginPath();
    ctx.arc(headX + 100, headY - 60, cellSize/2, 0, Math.PI * 2);
    ctx.fill();
    
    // Score
    ctx.fillStyle = textColor;
    ctx.font = 'bold 18px Arial';
    ctx.textAlign = 'left';
    ctx.fillText('Score: 42', 60, 110);
    
    // Status bar
    ctx.fillStyle = isDark ? '#2d2d2d' : '#e1e1e1';
    ctx.fillRect(0, height - 60, width, 60);
    
    // Controls info
    ctx.fillStyle = textColor;
    ctx.font = '14px Arial';
    ctx.textAlign = 'center';
    ctx.fillText('Use arrow keys to control the snake. Press P to pause.', width / 2, height - 30);
}

// Initialize View Code buttons
function setupViewCodeButtons() {
    // Setup equation solver button
    const equationSolverButton = document.getElementById('equationSolverButton');
    if (equationSolverButton) {
        equationSolverButton.addEventListener('click', function() {
            document.getElementById('projectModal').style.display = 'block';
            
            // Load the content for Equation Solver Code View
            const modalContent = document.getElementById('modalContent');
            modalContent.innerHTML = `
                <h2>🖥️ Equation Solver Code</h2><h5>(zoom in for the pics)</h5>
                <div class="code-screenshots">
                    <img src="image/Screenshot 2025-04-23 143722.png" alt="Equation Solver Light Mode" class="code-screenshot">
                    <img src="image/Screenshot 2025-04-23 223137.png" alt="Equation Solver Dark Mode" class="code-screenshot">
                </div>
                <div class="code-path">equation_solver@equation_solver.py</div>
                <div class="code-container">
                    <pre class="code-snippet"><code>${escapeHtml(`import sympy as sp
import tkinter as tk
from tkinter import ttk, messagebox, filedialog
import sv_ttk
import re
import matplotlib.pyplot as plt
from matplotlib.backends.backend_tkagg import FigureCanvasTkAgg
import numpy as np
import os
import json
from datetime import datetime

class EquationSolver:
    def __init__(self, root):
        self.root = root
        self.root.title("Advanced Equation Solver")
        self.root.geometry("1000x700")
        self.root.minsize(800, 600)
        
        # Setup theme
        self.current_theme = "dark"
        sv_ttk.set_theme(self.current_theme)
        
        # Variable to track if equation has been plotted
        self.equation_plotted = False
        
        # Create UI components
        self.setup_ui()
        
        # History of solutions
        self.history = []
        
        # Load history from file if exists
        self.load_history()
        
        # Set up keyboard shortcuts
        self.setup_shortcuts()
    
    def setup_ui(self):
        # Main frame using grid layout for better responsiveness
        main_frame = ttk.Frame(self.root, padding=20)
        main_frame.pack(fill=tk.BOTH, expand=True)
        
        # Configure grid weights
        main_frame.columnconfigure(0, weight=1)
        main_frame.columnconfigure(1, weight=1)
        
        # Create left and right frames
        left_frame = ttk.Frame(main_frame)
        left_frame.grid(row=0, column=0, sticky="nsew", padx=(0, 10))
        
        right_frame = ttk.Frame(main_frame)
        right_frame.grid(row=0, column=1, sticky="nsew", padx=(10, 0))
        
        # Equation input section
        input_frame = ttk.LabelFrame(left_frame, text="Equation Input", padding=10)
        input_frame.pack(fill=tk.BOTH, expand=False, pady=(0, 10))
        
        # Equation format selector
        format_frame = ttk.Frame(input_frame)
        format_frame.pack(fill=tk.X, pady=(0, 10))
        
        ttk.Label(format_frame, text="Equation Format:").pack(side=tk.LEFT)
        
        self.format_var = tk.StringVar(value="Standard Form")
        format_combo = ttk.Combobox(format_frame, textvariable=self.format_var, 
                                    values=["Standard Form", "Factored Form", "Expanded Form"])
        format_combo.pack(side=tk.LEFT, padx=(10, 0))
        format_combo.bind("<<ComboboxSelected>>", self.update_example)
        
        # Equation input
        ttk.Label(input_frame, text="Enter Equation:").pack(anchor=tk.W)
        self.equation_var = tk.StringVar()
        equation_entry = ttk.Entry(input_frame, textvariable=self.equation_var, width=50)
        equation_entry.pack(fill=tk.X, pady=10)
        
        # Example label
        self.example_var = tk.StringVar(value="Example: x**4 + 2*x**3 - 3*x**2 + 4*x - 5 = 0")
        example_label = ttk.Label(input_frame, textvariable=self.example_var, font=("Arial", 9))
        example_label.pack(anchor=tk.W)
        
        # Button frame
        button_frame = ttk.Frame(input_frame)
        button_frame.pack(fill=tk.X, pady=10)
        
        # Solve button
        solve_btn = ttk.Button(button_frame, text="Solve Equation", command=self.solve_equation)
        solve_btn.pack(side=tk.LEFT, padx=(0, 5))
        
        # Plot button
        plot_btn = ttk.Button(button_frame, text="Plot Equation", command=self.plot_equation)
        plot_btn.pack(side=tk.LEFT, padx=5)
        
        # Clear button
        clear_btn = ttk.Button(button_frame, text="Clear Input", command=self.clear_input)
        clear_btn.pack(side=tk.LEFT, padx=5)
        
        # Results section
        results_frame = ttk.LabelFrame(left_frame, text="Results", padding=10)
        results_frame.pack(fill=tk.BOTH, expand=True)
        
        # Results text widget with scrollbar
        result_scroll = ttk.Scrollbar(results_frame)
        result_scroll.pack(side=tk.RIGHT, fill=tk.Y)
        
        self.result_text = tk.Text(results_frame, height=15, width=50, yscrollcommand=result_scroll.set)
        self.result_text.pack(fill=tk.BOTH, expand=True)
        result_scroll.config(command=self.result_text.yview)
        
        # Right side - contains plot and history
        
        # Plot frame
        self.plot_frame = ttk.LabelFrame(right_frame, text="Equation Visualization", padding=10)
        self.plot_frame.pack(fill=tk.BOTH, expand=True, pady=(0, 10))
        
        # Initially show a message
        self.plot_message = ttk.Label(self.plot_frame, 
                                     text="Click 'Plot Equation' to visualize the function", 
                                     font=("Arial", 11))
        self.plot_message.pack(expand=True)
        
        # History frame
        history_frame = ttk.LabelFrame(right_frame, text="Solution History", padding=10)
        history_frame.pack(fill=tk.BOTH, expand=False)
        
        # History controls
        history_controls = ttk.Frame(history_frame)
        history_controls.pack(fill=tk.X, pady=(0, 5))
        
        ttk.Label(history_controls, text="Recent Equations:").pack(side=tk.LEFT)
        
        # Export history button
        export_btn = ttk.Button(history_controls, text="Export History", command=self.export_history)
        export_btn.pack(side=tk.RIGHT)
        
        # Clear history button
        clear_history_btn = ttk.Button(history_controls, text="Clear History", command=self.clear_history)
        clear_history_btn.pack(side=tk.RIGHT, padx=(0, 5))
        
        # History listbox with scrollbar
        history_scroll = ttk.Scrollbar(history_frame)
        history_scroll.pack(side=tk.RIGHT, fill=tk.Y)
        
        self.history_listbox = tk.Listbox(history_frame, height=6, yscrollcommand=history_scroll.set)
        self.history_listbox.pack(fill=tk.BOTH, expand=True, padx=(0, 5))
        history_scroll.config(command=self.history_listbox.yview)
        self.history_listbox.bind("<<ListboxSelect>>", self.load_history_item)
        
        # Status bar
        self.status_var = tk.StringVar(value="Ready")
        status_bar = ttk.Label(main_frame, textvariable=self.status_var, relief=tk.SUNKEN, anchor=tk.W)
        status_bar.grid(row=1, column=0, columnspan=2, sticky="ew", pady=(10, 0))
        
        # Bottom button frame
        bottom_button_frame = ttk.Frame(main_frame)
        bottom_button_frame.grid(row=2, column=0, columnspan=2, sticky="ew", pady=(10, 0))
        
        # Toggle theme button
        theme_btn = ttk.Button(bottom_button_frame, text="Toggle Theme", command=self.toggle_theme)
        theme_btn.pack(side=tk.LEFT)
        
        # Copy results button
        copy_btn = ttk.Button(bottom_button_frame, text="Copy Results", command=self.copy_results)
        copy_btn.pack(side=tk.LEFT, padx=(5, 0))
        
        # Exit button
        exit_btn = ttk.Button(bottom_button_frame, text="Exit", command=self.root.destroy)
        exit_btn.pack(side=tk.RIGHT)
    
    def update_example(self, event=None):
        selected_format = self.format_var.get()
        
        if selected_format == "Standard Form":
            self.example_var.set("Example: x**4 + 2*x**3 - 3*x**2 + 4*x - 5 = 0")
        elif selected_format == "Factored Form":
            self.example_var.set("Example: (x-1)*(x+2)*(x**2+3) = 0")
        elif selected_format == "Expanded Form":
            self.example_var.set("Example: x**4 + 2*x**3 - 3*x**2 + 4*x - 5")
    
    def solve_equation(self):
        eq_str = self.equation_var.get().strip()
        
        if not eq_str:
            messagebox.showwarning("Input Error", "Please enter an equation")
            return
        
        try:
            self.status_var.set("Solving equation...")
            self.root.update_idletasks()
            
            # Parse the equation based on the selected format
            x = sp.Symbol('x')
            eq_format = self.format_var.get()
            
            # Handle both forms with and without "= 0"
            if "=" in eq_str:
                left_side, right_side = eq_str.split("=", 1)
                left_expr = sp.sympify(left_side.strip())
                right_expr = sp.sympify(right_side.strip())
                equation = left_expr - right_expr
            else:
                equation = sp.sympify(eq_str)
            
            # Solve the equation
            solutions = sp.solve(equation, x)
            
            # Display results
            self.result_text.delete(1.0, tk.END)
            equation_tex = sp.latex(equation)
            self.result_text.insert(tk.END, f"Equation: {eq_str}\n\n")
            self.result_text.insert(tk.END, f"Standardized form: {equation} = 0\n\n")
            self.result_text.insert(tk.END, "Solutions:\n")
            
            if not solutions:
                self.result_text.insert(tk.END, "No solutions found.\n")
            else:
                for i, sol in enumerate(solutions):
                    # Format complex solutions nicely
                    if sol.is_real:
                        self.result_text.insert(tk.END, f"x{i+1} = {float(sol):.6f}\n")
                    else:
                        sol_complex = complex(sol.evalf())
                        real_part = sol_complex.real
                        imag_part = sol_complex.imag
                        self.result_text.insert(tk.END, f"x{i+1} = {real_part:.6f} {'+' if imag_part >= 0 else '-'} {abs(imag_part):.6f}i\n")
            
            # Add factored form if possible
            try:
                factored = sp.factor(equation)
                if factored != equation:
                    self.result_text.insert(tk.END, f"\nFactored form: {factored} = 0\n")
            except:
                pass
            
            # Add degree of the equation
            degree = sp.degree(equation, gen=x)
            self.result_text.insert(tk.END, f"\nDegree of equation: {degree}\n")
            
            # Add to history
            timestamp = datetime.now().strftime("%Y-%m-%d %H:%M:%S")
            history_item = {
                "equation": eq_str,
                "solutions": [str(sol) for sol in solutions],
                "timestamp": timestamp
            }
            self.history.append(history_item)
            self.history_listbox.insert(0, f"{timestamp}: {eq_str}")
            
            # Save history to file
            self.save_history()
            
            self.status_var.set(f"Solved equation: {len(solutions)} solution(s) found")
            
        except Exception as e:
            messagebox.showerror("Error", f"Error solving equation: {str(e)}\n\nMake sure your equation is in the correct format.")
            self.status_var.set("Error solving equation")
    
    def plot_equation(self):
        eq_str = self.equation_var.get().strip()
        
        if not eq_str:
            messagebox.showwarning("Input Error", "Please enter an equation")
            return
        
        try:
            self.status_var.set("Plotting equation...")
            self.root.update_idletasks()
            
            # Parse the equation
            x_sym = sp.Symbol('x')
            
            # Handle both forms with and without "= 0"
            if "=" in eq_str:
                left_side, right_side = eq_str.split("=", 1)
                left_expr = sp.sympify(left_side.strip())
                right_expr = sp.sympify(right_side.strip())
                equation = left_expr - right_expr
            else:
                equation = sp.sympify(eq_str)
            
            # Convert to lambda function
            f = sp.lambdify(x_sym, equation, "numpy")
            
            # Clear previous plot
            if hasattr(self, 'canvas'):
                self.canvas.get_tk_widget().destroy()
            
            if hasattr(self, 'plot_message'):
                self.plot_message.destroy()
                
            # Create plot
            fig, ax = plt.subplots(figsize=(5, 4), dpi=100)
            
            # Find roots for better plotting range
            roots = sp.solve(equation, x_sym)
            root_vals = [complex(root.evalf()).real for root in roots if complex(root.evalf()).real != float('inf') and not sp.im(root.evalf()).is_nonzero]
            
            if root_vals:
                min_root = min(root_vals)
                max_root = max(root_vals)
                x_range = max(5, (max_root - min_root) * 1.5)
                x_min = min_root - x_range/3
                x_max = max_root + x_range/3
            else:
                x_min, x_max = -10, 10
            
            x = np.linspace(x_min, x_max, 1000)
            
            # Evaluate the function, handling potential errors
            y = np.zeros_like(x)
            for i, x_val in enumerate(x):
                try:
                    y_val = f(x_val)
                    if isinstance(y_val, complex):
                        y[i] = float('nan')  # Skip complex values
                    elif abs(y_val) > 1000:
                        y[i] = float('nan')  # Skip very large values that would distort the plot
                    else:
                        y[i] = y_val
                except:
                    y[i] = float('nan')
            
            # Plot the function
            ax.plot(x, y, 'b-', label=f'f(x) = {equation}')
            
            # Mark the roots
            for root in roots:
                root_val = complex(root.evalf()).real
                if not sp.im(root.evalf()).is_nonzero and x_min <= root_val <= x_max:
                    try:
                        ax.plot(root_val, 0, 'ro', markersize=6, label=f'Root: x = {root_val:.4f}')
                    except:
                        pass
            
            # Add x-axis (y=0)
            ax.axhline(y=0, color='k', linestyle='-', alpha=0.3)
            
            # Add grid and labels
            ax.grid(True, linestyle='--', alpha=0.7)
            ax.set_xlabel('x')
            ax.set_ylabel('f(x)')
            ax.set_title(f'Plot of {equation} = 0')
            
            # Adjust legend if there are too many roots
            if len(roots) > 5:
                ax.legend(loc='upper right', fontsize='small')
            else:
                ax.legend(loc='best')
            
            # Create canvas
            self.canvas = FigureCanvasTkAgg(fig, master=self.plot_frame)
            self.canvas.draw()
            self.canvas.get_tk_widget().pack(fill=tk.BOTH, expand=True)
            
            # Add toolbar
            from matplotlib.backends.backend_tkagg import NavigationToolbar2Tk
            toolbar_frame = ttk.Frame(self.plot_frame)
            toolbar_frame.pack(fill=tk.X)
            toolbar = NavigationToolbar2Tk(self.canvas, toolbar_frame)
            toolbar.update()
            
            self.equation_plotted = True
            self.status_var.set("Equation plotted successfully")
            
        except Exception as e:
            messagebox.showerror("Error", f"Error plotting equation: {str(e)}")
            self.status_var.set("Error plotting equation")
    
    def load_history_item(self, event):
        selection = self.history_listbox.curselection()
        if selection:
            # Convert index to actual history index (reversed because newest is at top)
            index = len(self.history) - 1 - selection[0]
            history_item = self.history[index]
            
            # Set equation
            self.equation_var.set(history_item["equation"])
            
            # Display results
            self.result_text.delete(1.0, tk.END)
            self.result_text.insert(tk.END, f"Equation: {history_item['equation']}\n\n")
            self.result_text.insert(tk.END, "Solutions:\n")
            
            for i, sol in enumerate(history_item["solutions"]):
                self.result_text.insert(tk.END, f"x{i+1} = {sol}\n")
            
            self.status_var.set(f"Loaded equation from history: {history_item['timestamp']}")
    
    def clear_input(self):
        self.equation_var.set("")
        self.status_var.set("Input cleared")
    
    def clear_history(self):
        if self.history and messagebox.askyesno("Confirm", "Are you sure you want to clear all history?"):
            self.history = []
            self.history_listbox.delete(0, tk.END)
            self.save_history()
            self.status_var.set("History cleared")
    
    def copy_results(self):
        result_text = self.result_text.get(1.0, tk.END)
        self.root.clipboard_clear()
        self.root.clipboard_append(result_text)
        self.status_var.set("Results copied to clipboard")
    
    def export_history(self):
        if not self.history:
            messagebox.showinfo("Info", "No history to export")
            return
            
        try:
            filename = filedialog.asksaveasfilename(
                defaultextension=".json",
                filetypes=[("JSON Files", "*.json"), ("Text Files", "*.txt"), ("All Files", "*.*")],
                title="Export History"
            )
            
            if not filename:
                return  # User cancelled
                
            if filename.endswith('.json'):
                with open(filename, 'w') as f:
                    json.dump(self.history, f, indent=2)
            else:
                # Export as formatted text
                with open(filename, 'w') as f:
                    f.write("Equation Solver History\n")
                    f.write("======================\n\n")
                    
                    for item in self.history:
                        f.write(f"Date: {item['timestamp']}\n")
                        f.write(f"Equation: {item['equation']}\n")
                        f.write("Solutions:\n")
                        
                        for i, sol in enumerate(item['solutions']):
                            f.write(f"  x{i+1} = {sol}\n")
                        
                        f.write("\n" + "-"*40 + "\n\n")
            
            self.status_var.set(f"History exported to {os.path.basename(filename)}")
            
        except Exception as e:
            messagebox.showerror("Error", f"Error exporting history: {str(e)}")
    
    def save_history(self):
        try:
            # Save only the most recent 50 items
            history_to_save = self.history[-50:] if len(self.history) > 50 else self.history
            with open("equation_history.json", "w") as f:
                json.dump(history_to_save, f)
        except Exception as e:
            print(f"Error saving history: {e}")
    
    def load_history(self):
        try:
            if os.path.exists("equation_history.json"):
                with open("equation_history.json", "r") as f:
                    self.history = json.load(f)
                    
                # Populate the history listbox (most recent first)
                for item in reversed(self.history):
                    self.history_listbox.insert(tk.END, f"{item['timestamp']}: {item['equation']}")
        except Exception as e:
            print(f"Error loading history: {e}")
    
    def toggle_theme(self):
        # Toggle between light and dark theme
        self.current_theme = "light" if self.current_theme == "dark" else "dark"
        sv_ttk.set_theme(self.current_theme)
        
        # Update plot colors if there's a plot
        if self.equation_plotted:
            self.plot_equation()
            
        self.status_var.set(f"Theme changed to {self.current_theme}")
    
    def setup_shortcuts(self):
        # Set up keyboard shortcuts
        self.root.bind("<F5>", lambda e: self.solve_equation())
        self.root.bind("<F6>", lambda e: self.plot_equation())
        self.root.bind("<F1>", lambda e: self.show_help())
        self.root.bind("<Control-c>", lambda e: self.copy_results())
        self.root.bind("<Control-s>", lambda e: self.export_history())
        self.root.bind("<Control-l>", lambda e: self.clear_input())
        self.root.bind("<Escape>", lambda e: self.root.destroy())
    
    def show_help(self):
        help_text = """
        Advanced Equation Solver Help
        
        Input Formats:
        - Standard Form: x**4 + 2*x**3 - 3*x**2 + 4*x - 5 = 0
        - Factored Form: (x-1)*(x+2)*(x**2+3) = 0
        - Expanded Form: x**4 + 2*x**3 - 3*x**2 + 4*x - 5
        
        Keyboard Shortcuts:
        F1 - Show this help
        F5 - Solve Equation
        F6 - Plot Equation
        Ctrl+C - Copy Results
        Ctrl+S - Export History
        Ctrl+L - Clear Input
        Esc - Exit
        
        Tips:
        - Use ** for exponentiation (x**2 for x²)
        - Mathematical functions like sin(), cos(), exp() are supported
        - You can include or omit "= 0" in your equation
        """
        
        help_window = tk.Toplevel(self.root)
        help_window.title("Equation Solver Help")
        help_window.geometry("600x400")
        
        help_frame = ttk.Frame(help_window, padding=20)
        help_frame.pack(fill=tk.BOTH, expand=True)
        
        help_scroll = ttk.Scrollbar(help_frame)
        help_scroll.pack(side=tk.RIGHT, fill=tk.Y)
        
        help_text_widget = tk.Text(help_frame, wrap=tk.WORD, yscrollcommand=help_scroll.set)
        help_text_widget.pack(fill=tk.BOTH, expand=True)
        help_text_widget.insert(tk.END, help_text)
        help_text_widget.config(state=tk.DISABLED)
        
        help_scroll.config(command=help_text_widget.yview)
        
        close_button = ttk.Button(help_window, text="Close", command=help_window.destroy)
        close_button.pack(pady=10)

def main():
    root = tk.Tk()
    app = EquationSolver(root)
    root.mainloop()

if __name__ == "__main__":
    try:
        main()
    except Exception as e:
        print(f"Error starting application: {e}")
        print("Make sure you have the required libraries installed:")
        print("pip install sympy matplotlib sv_ttk")`)}</code></pre>
                
            `;
            
            // Trigger image error handling for the newly added images
            setupImageErrorHandling();
        });
    }
    
    // Setup snake game button
    const calculatorButton = document.getElementById('calculatorButton');
    if (calculatorButton) {
        calculatorButton.addEventListener('click', function() {
            document.getElementById('projectModal').style.display = 'block';
            
            // Load the content for Snake Game Code View
            const modalContent = document.getElementById('modalContent');
            modalContent.innerHTML = `
                <h2>🐍 Snake Game Code</h2> <h5>(zoom in for the pics)</h5>
                <div class="code-screenshots">
                    <img src="image/Screenshot 2025-04-23 144742.png" alt="Snake Game Light Mode" class="code-screenshot">
                    
                </div>
                <div class="code-path">snake@snake.py</div>
                <div class="code-container">
                    <pre class="code-snippet"><code>${escapeHtml(`import pygame
import random
import time
import os
import json
from pygame import mixer

# Initialize Pygame and mixer
pygame.init()
mixer.init()

# Game constants
WIDTH = 800
HEIGHT = 600
BLOCK_SIZE = 20
GRID_WIDTH = WIDTH // BLOCK_SIZE
GRID_HEIGHT = HEIGHT // BLOCK_SIZE

# Colors
BLACK = (0, 0, 0)
WHITE = (255, 255, 255)
RED = (255, 0, 0)
GREEN = (0, 255, 0)
BLUE = (0, 0, 255)
DARK_GREEN = (0, 100, 0)
YELLOW = (255, 255, 0)
PURPLE = (128, 0, 128)
GRAY = (50, 50, 50)
LIGHT_GRAY = (100, 100, 100)

# Initialize screen
screen = pygame.display.set_mode((WIDTH, HEIGHT))
pygame.display.set_caption("Advanced Snake Game")
icon = pygame.Surface((32, 32))
icon.fill(GREEN)
pygame.display.set_icon(icon)

# Fonts
title_font = pygame.font.SysFont('arial', 64, bold=True)
menu_font = pygame.font.SysFont('arial', 48)
info_font = pygame.font.SysFont('arial', 24)
score_font = pygame.font.SysFont('arial', 32)

# Try to load sounds
try:
    eat_sound = mixer.Sound(os.path.join('sounds', 'eat.wav'))
    crash_sound = mixer.Sound(os.path.join('sounds', 'crash.wav'))
    menu_sound = mixer.Sound(os.path.join('sounds', 'select.wav'))
except:
    # Create a dummy sound class if sounds can't be loaded
    class DummySound:
        def play(self):
            pass
    eat_sound = DummySound()
    crash_sound = DummySound()
    menu_sound = DummySound()

# Game settings and state
game_settings = {
    'snake_color': GREEN,
    'food_color': RED,
    'background_color': BLACK,
    'speed_multiplier': 1.0,
    'grid_visible': False,
    'sound_enabled': True,
}

# High scores dict
high_scores = {}

# Load high scores from file
def load_high_scores():
    global high_scores
    try:
        if os.path.exists('snake_scores.json'):
            with open('snake_scores.json', 'r') as f:
                high_scores = json.load(f)
    except:
        high_scores = {'easy': 0, 'normal': 0, 'hard': 0}

# Save high scores to file
def save_high_scores():
    try:
        with open('snake_scores.json', 'w') as f:
            json.dump(high_scores, f)
    except:
        print("Could not save high scores")

# Load high scores at startup
load_high_scores()

# Draw the background grid
def draw_grid():
    if game_settings['grid_visible']:
        for x in range(0, WIDTH, BLOCK_SIZE):
            pygame.draw.line(screen, LIGHT_GRAY, (x, 0), (x, HEIGHT))
        for y in range(0, HEIGHT, BLOCK_SIZE):
            pygame.draw.line(screen, LIGHT_GRAY, (0, y), (WIDTH, y))

# Draw the snake with gradient effect
def draw_snake(snake_list):
    for i, block in enumerate(snake_list):
        # Create a gradient effect from head to tail
        color_intensity = max(50, 255 - (len(snake_list) - i) * 5)
        if i == len(snake_list) - 1:  # Head
            snake_color = game_settings['snake_color']
        else:  # Body
            r, g, b = game_settings['snake_color']
            snake_color = (min(r, color_intensity), min(g, color_intensity), min(b, color_intensity))
            
        pygame.draw.rect(screen, snake_color, [block[0], block[1], BLOCK_SIZE, BLOCK_SIZE])
        pygame.draw.rect(screen, BLACK, [block[0], block[1], BLOCK_SIZE, BLOCK_SIZE], 1)
        
        # Draw eyes on the snake's head
        if i == len(snake_list) - 1:
            eye_size = BLOCK_SIZE // 5
            # Determine eye positions based on direction
            if snake_list[-1][0] > snake_list[-2][0]:  # Moving right
                left_eye = (block[0] + BLOCK_SIZE - eye_size - 2, block[1] + eye_size)
                right_eye = (block[0] + BLOCK_SIZE - eye_size - 2, block[1] + BLOCK_SIZE - eye_size * 2)
            elif snake_list[-1][0] < snake_list[-2][0]:  # Moving left
                left_eye = (block[0] + 2, block[1] + eye_size)
                right_eye = (block[0] + 2, block[1] + BLOCK_SIZE - eye_size * 2)
            elif snake_list[-1][1] < snake_list[-2][1]:  # Moving up
                left_eye = (block[0] + eye_size, block[1] + 2)
                right_eye = (block[0] + BLOCK_SIZE - eye_size * 2, block[1] + 2)
            else:  # Moving down
                left_eye = (block[0] + eye_size, block[1] + BLOCK_SIZE - eye_size - 2)
                right_eye = (block[0] + BLOCK_SIZE - eye_size * 2, block[1] + BLOCK_SIZE - eye_size - 2)
                
            pygame.draw.circle(screen, WHITE, left_eye, eye_size)
            pygame.draw.circle(screen, WHITE, right_eye, eye_size)
            pygame.draw.circle(screen, BLACK, left_eye, eye_size // 2)
            pygame.draw.circle(screen, BLACK, right_eye, eye_size // 2)

# Draw food with pulsating effect
def draw_food(food_x, food_y, pulse_value):
    pulse_size = int(BLOCK_SIZE * (1.0 + 0.2 * pulse_value))
    offset = (pulse_size - BLOCK_SIZE) // 2
    
    pygame.draw.rect(screen, game_settings['food_color'], 
                    [food_x - offset, food_y - offset, pulse_size, pulse_size])
    pygame.draw.rect(screen, (255, 255, 255), 
                    [food_x - offset, food_y - offset, pulse_size, pulse_size], 1)

# Draw game menu
def draw_menu(selected):
    screen.fill(game_settings['background_color'])
    
    # Title with shadow effect
    title_shadow = title_font.render("SNAKE GAME", True, (0, 100, 0))
    title = title_font.render("SNAKE GAME", True, GREEN)
    title_rect = title.get_rect(center=(WIDTH/2, HEIGHT/4))
    screen.blit(title_shadow, (title_rect.x + 3, title_rect.y + 3))
    screen.blit(title, title_rect)
    
    # Difficulty options
    options = ['Easy', 'Normal', 'Hard', 'Settings', 'Exit']
    y_pos = HEIGHT/2
    
    for i, option in enumerate(options):
        if i != selected:
            color = WHITE
            text = menu_font.render(option, True, color)
        else:
            # Highlighted option with pulsating effect
            pulse = (pygame.time.get_ticks() % 1000) / 1000
            color_value = int(155 + 100 * pulse)
            color = (color_value, 0, 0)
            text = menu_font.render(option, True, color)
            
        rect = text.get_rect(center=(WIDTH/2, y_pos))
        screen.blit(text, rect)
        
        # Display high scores for difficulty options
        if i < 3:  # Only for Easy, Normal, Hard
            difficulty_name = option.lower()
            high_score_text = info_font.render(f"High Score: {high_scores.get(difficulty_name, 0)}", 
                                              True, YELLOW)
            high_score_rect = high_score_text.get_rect(center=(WIDTH/2, y_pos + 30))
            screen.blit(high_score_text, high_score_rect)
            
        y_pos += 80
        
    # Instructions
    info_text = info_font.render("Use ARROW KEYS to navigate, ENTER to select", True, WHITE)
    info_rect = info_text.get_rect(center=(WIDTH/2, HEIGHT-50))
    screen.blit(info_text, info_rect)
    
    pygame.display.update()

# Draw settings menu
def draw_settings_menu(selected, options, values):
    screen.fill(game_settings['background_color'])
    
    # Title
    title = title_font.render("SETTINGS", True, BLUE)
    title_rect = title.get_rect(center=(WIDTH/2, HEIGHT/6))
    screen.blit(title, title_rect)
    
    # Options
    y_pos = HEIGHT/3
    
    for i, (option, value) in enumerate(zip(options, values)):
        option_text = menu_font.render(option, True, WHITE if i != selected else YELLOW)
        option_rect = option_text.get_rect(midright=(WIDTH/2 - 20, y_pos))
        screen.blit(option_text, option_rect)
        
        value_text = menu_font.render(str(value), True, WHITE if i != selected else YELLOW)
        value_rect = value_text.get_rect(midleft=(WIDTH/2 + 20, y_pos))
        screen.blit(value_text, value_rect)
        
        y_pos += 60
    
    # Back option
    back_text = menu_font.render("Back to Menu", True, WHITE if selected != len(options) else YELLOW)
    back_rect = back_text.get_rect(center=(WIDTH/2, y_pos + 40))
    screen.blit(back_text, back_rect)
    
    # Instructions
    info_text = info_font.render("Use ARROW KEYS to navigate, LEFT/RIGHT to change values", True, WHITE)
    info_rect = info_text.get_rect(center=(WIDTH/2, HEIGHT-50))
    screen.blit(info_text, info_rect)
    
    pygame.display.update()

# Settings menu
def settings_menu():
    selected = 0
    running = True
    
    options = ["Snake Color", "Food Color", "Speed", "Grid", "Sound"]
    
    # Map settings to display values
    color_options = ["Green", "Blue", "Purple", "Yellow"]
    color_values = [GREEN, BLUE, PURPLE, YELLOW]
    
    # Get current values
    snake_color_idx = color_values.index(game_settings['snake_color']) if game_settings['snake_color'] in color_values else 0
    food_color_idx = color_values.index(game_settings['food_color']) if game_settings['food_color'] in color_values else 0
    speed_multiplier = round(game_settings['speed_multiplier'] * 10) / 10
    grid_visible = "On" if game_settings['grid_visible'] else "Off"
    sound_enabled = "On" if game_settings['sound_enabled'] else "Off"
    
    values = [color_options[snake_color_idx], 
              color_options[food_color_idx], 
              speed_multiplier, 
              grid_visible, 
              sound_enabled]
    
    clock = pygame.time.Clock()
    
    while running:
        draw_settings_menu(selected, options, values)
        clock.tick(10)  # Control menu fps
        
        for event in pygame.event.get():
            if event.type == pygame.QUIT:
                pygame.quit()
                quit()
                
            if event.type == pygame.KEYDOWN:
                if event.key == pygame.K_DOWN:
                    selected = (selected + 1) % (len(options) + 1)  # +1 for back option
                    menu_sound.play()
                elif event.key == pygame.K_UP:
                    selected = (selected - 1) % (len(options) + 1)
                    menu_sound.play()
                elif event.key == pygame.K_RETURN:
                    if selected == len(options):  # Back option
                        # Save settings
                        game_settings['snake_color'] = color_values[color_options.index(values[0])]
                        game_settings['food_color'] = color_values[color_options.index(values[1])]
                        game_settings['speed_multiplier'] = float(values[2])
                        game_settings['grid_visible'] = values[3] == "On"
                        game_settings['sound_enabled'] = values[4] == "On"
                        running = False
                        menu_sound.play()
                elif event.key == pygame.K_ESCAPE:
                    running = False
                    menu_sound.play()
                
                # Change settings values
                if selected < len(options):
                    if event.key == pygame.K_RIGHT:
                        menu_sound.play()
                        if selected == 0:  # Snake color
                            snake_color_idx = (snake_color_idx + 1) % len(color_options)
                            values[0] = color_options[snake_color_idx]
                        elif selected == 1:  # Food color
                            food_color_idx = (food_color_idx + 1) % len(color_options)
                            values[1] = color_options[food_color_idx]
                        elif selected == 2:  # Speed
                            speed_multiplier = min(2.0, speed_multiplier + 0.1)
                            values[2] = round(speed_multiplier * 10) / 10
                        elif selected == 3:  # Grid
                            values[3] = "On" if values[3] == "Off" else "Off"
                        elif selected == 4:  # Sound
                            values[4] = "On" if values[4] == "Off" else "Off"
                    
                    elif event.key == pygame.K_LEFT:
                        menu_sound.play()
                        if selected == 0:  # Snake color
                            snake_color_idx = (snake_color_idx - 1) % len(color_options)
                            values[0] = color_options[snake_color_idx]
                        elif selected == 1:  # Food color
                            food_color_idx = (food_color_idx - 1) % len(color_options)
                            values[1] = color_options[food_color_idx]
                        elif selected == 2:  # Speed
                            speed_multiplier = max(0.5, speed_multiplier - 0.1)
                            values[2] = round(speed_multiplier * 10) / 10
                        elif selected == 3:  # Grid
                            values[3] = "On" if values[3] == "Off" else "Off"
                        elif selected == 4:  # Sound
                            values[4] = "On" if values[4] == "Off" else "Off"

# Create a new food item at a random position, not colliding with the snake
def create_food(snake_list):
    while True:
        food_x = random.randrange(0, GRID_WIDTH) * BLOCK_SIZE
        food_y = random.randrange(0, GRID_HEIGHT) * BLOCK_SIZE
        
        # Check if food overlaps with snake
        if [food_x, food_y] not in snake_list:
            return food_x, food_y

# Main menu
def main_menu():
    selected = 0
    running = True
    clock = pygame.time.Clock()
    
    while running:
        draw_menu(selected)
        clock.tick(10)  # Control menu fps
        
        for event in pygame.event.get():
            if event.type == pygame.QUIT:
                pygame.quit()
                quit()
                
            if event.type == pygame.KEYDOWN:
                if event.key == pygame.K_DOWN:
                    selected = (selected + 1) % 5  # 5 options
                    menu_sound.play()
                elif event.key == pygame.K_UP:
                    selected = (selected - 1) % 5
                    menu_sound.play()
                elif event.key == pygame.K_RETURN:
                    menu_sound.play()
                    
                    if selected < 3:  # Difficulty options
                        difficulty_names = ['easy', 'normal', 'hard']
                        speeds = [8, 15, 20]  # FPS values for difficulties
                        game_loop(speeds[selected], difficulty_names[selected])
                    elif selected == 3:  # Settings
                        settings_menu()
                    else:  # Exit
                        pygame.quit()
                        quit()
                elif event.key == pygame.K_ESCAPE:
                    pygame.quit()
                    quit()

# Display pause screen
def show_pause_screen():
    overlay = pygame.Surface((WIDTH, HEIGHT))
    overlay.set_alpha(150)
    overlay.fill(BLACK)
    screen.blit(overlay, (0, 0))
    
    pause_text = title_font.render("PAUSED", True, WHITE)
    pause_rect = pause_text.get_rect(center=(WIDTH/2, HEIGHT/2))
    screen.blit(pause_text, pause_rect)
    
    resume_text = info_font.render("Press P to Resume", True, WHITE)
    resume_rect = resume_text.get_rect(center=(WIDTH/2, HEIGHT/2 + 60))
    screen.blit(resume_text, resume_rect)
    
    pygame.display.update()

# Show game over screen
def show_game_over_screen(score, elapsed_time, difficulty):
    overlay = pygame.Surface((WIDTH, HEIGHT))
    overlay.set_alpha(200)
    overlay.fill(BLACK)
    screen.blit(overlay, (0, 0))
    
    # Game over text
    game_over_text = title_font.render("GAME OVER", True, RED)
    game_over_rect = game_over_text.get_rect(center=(WIDTH/2, HEIGHT/3))
    screen.blit(game_over_text, game_over_rect)
    
    # Score and time
    score_text = score_font.render(f"Score: {score}", True, WHITE)
    score_rect = score_text.get_rect(center=(WIDTH/2, HEIGHT/2 - 40))
    screen.blit(score_text, score_rect)
    
    minutes = int(elapsed_time // 60)
    seconds = int(elapsed_time % 60)
    time_text = score_font.render(f"Time: {minutes}:{seconds:02d}", True, WHITE)
    time_rect = time_text.get_rect(center=(WIDTH/2, HEIGHT/2))
    screen.blit(time_text, time_rect)
    
    # High score notification
    if score > high_scores.get(difficulty, 0):
        high_scores[difficulty] = score
        save_high_scores()
        new_high_text = score_font.render("NEW HIGH SCORE!", True, YELLOW)
        new_high_rect = new_high_text.get_rect(center=(WIDTH/2, HEIGHT/2 + 40))
        screen.blit(new_high_text, new_high_rect)
    
    # Options
    options_text = info_font.render("C - Play Again | Q - Quit | M - Menu", True, WHITE)
    options_rect = options_text.get_rect(center=(WIDTH/2, HEIGHT*3/4))
    screen.blit(options_text, options_rect)
    
    pygame.display.update()

# Main game loop
def game_loop(speed, difficulty):
    game_over = False
    game_paused = False
    start_time = time.time()
    pause_start_time = 0
    total_pause_time = 0
    
    # Initial snake position (middle of screen)
    x = (GRID_WIDTH // 2) * BLOCK_SIZE
    y = (GRID_HEIGHT // 2) * BLOCK_SIZE
    dx = BLOCK_SIZE
    dy = 0
    
    snake_list = [[x - BLOCK_SIZE*2, y], [x - BLOCK_SIZE, y], [x, y]]
    snake_length = 3
    
    # Create initial food
    food_x, food_y = create_food(snake_list)
    
    # Food animation variables
    food_pulse = 0
    food_pulse_dir = 1
    
    # Special food (bonus) variables
    special_food_active = False
    special_food_x = 0
    special_food_y = 0
    special_food_timer = 0
    
    # Game score and timing
    score = 0
    combo_counter = 0
    last_direction_change = time.time()
    direction_queue = []  # Queue for direction changes
    
    clock = pygame.time.Clock()
    adjusted_speed = int(speed * game_settings['speed_multiplier'])
    
    while not game_over:
        current_time = time.time()
        elapsed_time = current_time - start_time - total_pause_time
        
        # Handle game pausing
        for event in pygame.event.get():
            if event.type == pygame.QUIT:
                pygame.quit()
                quit()
            
            if event.type == pygame.KEYDOWN:
                if event.key == pygame.K_p:
                    if game_paused:
                        total_pause_time += time.time() - pause_start_time
                        game_paused = False
                    else:
                        pause_start_time = time.time()
                        game_paused = True
                        show_pause_screen()
                
                if not game_paused:
                    # Store direction changes in a queue
                    if event.key == pygame.K_LEFT and dx != BLOCK_SIZE:
                        direction_queue.append((-BLOCK_SIZE, 0))
                    elif event.key == pygame.K_RIGHT and dx != -BLOCK_SIZE:
                        direction_queue.append((BLOCK_SIZE, 0))
                    elif event.key == pygame.K_UP and dy != BLOCK_SIZE:
                        direction_queue.append((0, -BLOCK_SIZE))
                    elif event.key == pygame.K_DOWN and dy != -BLOCK_SIZE:
                        direction_queue.append((0, BLOCK_SIZE))
                    elif event.key == pygame.K_ESCAPE:
                        game_over = True
        
        if game_paused:
            continue
        
        # Process direction queue
        if direction_queue and (current_time - last_direction_change) > (1 / adjusted_speed * 0.8):
            dx, dy = direction_queue.pop(0)
            last_direction_change = current_time
        
        # Move snake
        x += dx
        y += dy
        
        # Check for wall collision
        if x >= WIDTH or x < 0 or y >= HEIGHT or y < 0:
            if game_settings['sound_enabled']:
                crash_sound.play()
            show_game_over_screen(score, elapsed_time, difficulty)
            wait_for_key_press()
            return
        
        # Update screen
        screen.fill(game_settings['background_color'])
        draw_grid()
        
        # Draw food with pulsating effect
        food_pulse += 0.1 * food_pulse_dir
        if food_pulse >= 1.0:
            food_pulse = 1.0
            food_pulse_dir = -1
        elif food_pulse <= 0.0:
            food_pulse = 0.0
            food_pulse_dir = 1
        
        draw_food(food_x, food_y, food_pulse)
        
        # Draw special food if active
        if special_food_active:
            special_food_timer -= 1
            # Special food blinks faster as timer decreases
            if special_food_timer % max(1, int(30 * (special_food_timer / 300))) < 15:
                special_size = BLOCK_SIZE + 4
                pygame.draw.rect(screen, YELLOW, 
                            [special_food_x-2, special_food_y-2, special_size, special_size])
                pygame.draw.rect(screen, WHITE, 
                            [special_food_x-2, special_food_y-2, special_size, special_size], 1)
            
            if special_food_timer <= 0:
                special_food_active = False
        
        # Update snake
        snake_head = [x, y]
        snake_list.append(snake_head)
        
        if len(snake_list) > snake_length:
            del snake_list[0]
        
        # Check for collision with self
        for segment in snake_list[:-1]:
            if segment == snake_head:
                if game_settings['sound_enabled']:
                    crash_sound.play()
                show_game_over_screen(score, elapsed_time, difficulty)
                wait_for_key_press()
                return
        
        draw_snake(snake_list)
        
        # Check for food collision
        if x == food_x and y == food_y:
            if game_settings['sound_enabled']:
                eat_sound.play()
            
            food_x, food_y = create_food(snake_list)
            snake_length += 1
            
            # Scoring with combo system
            combo_counter += 1
            combo_multiplier = min(5, combo_counter)
            score += 10 * combo_multiplier
            
            # Randomly spawn special food
            if not special_food_active and random.random() < 0.3:  # 30% chance
                special_food_x, special_food_y = create_food(snake_list + [[food_x, food_y]])
                special_food_active = True
                special_food_timer = 300  # Frames until special food disappears
        
        # Check for special food collision
        if special_food_active and x == special_food_x and y == special_food_y:
            if game_settings['sound_enabled']:
                eat_sound.play()
            
            special_food_active = False
            snake_length += 2  # Bigger growth
            score += 50  # Bigger score
        
        # Display score and time
        score_text = info_font.render(f"Score: {score}", True, WHITE)
        high_score_text = info_font.render(f"High Score: {high_scores.get(difficulty, 0)}", True, WHITE)
        time_text = info_font.render(f"Time: {int(elapsed_time//60)}:{int(elapsed_time%60):02d}", True, WHITE)
        
        screen.blit(score_text, [10, 10])
        screen.blit(high_score_text, [10, 40])
        screen.blit(time_text, [WIDTH-150, 10])
        
        if combo_counter > 1:
            combo_text = info_font.render(f"Combo: x{min(5, combo_counter)}", True, YELLOW)
            screen.blit(combo_text, [WIDTH-150, 40])
        
        # Decrease combo over time
        if current_time - last_direction_change > 2.0:  # Reset combo after 2 seconds of no eating
            combo_counter = max(0, combo_counter - 1)
        
        pygame.display.update()
        clock.tick(adjusted_speed)

# Wait for specific key press
def wait_for_key_press():
    waiting = True
    while waiting:
        for event in pygame.event.get():
            if event.type == pygame.QUIT:
                pygame.quit()
                quit()
            if event.type == pygame.KEYDOWN:
                if event.key == pygame.K_q:
                    pygame.quit()
                    quit()
                elif event.key == pygame.K_c:
                    return
                elif event.key == pygame.K_m:
                    main_menu()
                    return

# Start the game
if __name__ == "__main__":
    main_menu()`)}</code></pre>
                
            `;
            
            // Trigger image error handling for the newly added images
            setupImageErrorHandling();
        });
    }

    const viewCompanyStore = document.getElementById('viewCompanyStore');
    if (viewCompanyStore) {
        viewCompanyStore.addEventListener('click', function() {
            document.getElementById('projectModal').style.display = 'block';
            
            const modalContent = document.getElementById('modalContent');
            modalContent.innerHTML = `<h2>🏪 Enterprise Inventory Management System</h2> <h5>(zoom in for the pics)</h5>
                <div class="code-screenshots">
                    <img src="image/Screenshot 2025-04-23 144052.png" alt="company_store" class="code-screenshot">
                    <img src="image/Screenshot 2025-04-23 214947.png" alt="company_store" class="code-screenshot">
                    <img src="image/Screenshot 2025-04-23 215030.png" alt="company_store" class="code-screenshot">
                    <img src="image/Screenshot 2025-04-23 215047.png" alt="company_store" class="code-screenshot">
                    <img src="image/Screenshot 2025-04-23 215057.png" alt="company_store" class="code-screenshot">
                </div>`
        });
    }
    
    // Set up close button for project modal
    const closeBtn = document.querySelector('.close-btn');
    if (closeBtn) {
        closeBtn.addEventListener('click', function() {
            document.getElementById('projectModal').style.display = 'none';
        });
    }
    
    // Close the modal when clicking outside
    window.addEventListener('click', function(event) {
        const modal = document.getElementById('projectModal');
        if (event.target === modal) {
            modal.style.display = 'none';
        }
    });
}

// Portfolio Section JavaScript
// The functions below are from cv-portfolio.js

document.addEventListener('DOMContentLoaded', () => {
    // Set up portfolio modal functionality
    setupPortfolioModal();
});

function setupPortfolioModal() {
    const portfolioItems = document.querySelectorAll('.portfolio-item');
    const modal = document.querySelector('.portfolio-modal');
    const modalContent = document.getElementById('modal-content');
    const closeButton = document.querySelector('.close-modal');
    
    if (!modal || !modalContent || !closeButton) {
        console.error('Portfolio modal elements not found');
        return;
    }
    
    // Set animation delay for each portfolio item
    portfolioItems.forEach((item, index) => {
        item.style.setProperty('--item-index', index);
        
        const viewButton = item.querySelector('.view-details');
        if (viewButton) {
            viewButton.addEventListener('click', (e) => {
                e.preventDefault();
                const project = item.getAttribute('data-project');
                
                // Populate modal with project content
                modalContent.innerHTML = getProjectContent(project);
                
                // Show modal
                modal.classList.add('visible');
                document.body.style.overflow = 'hidden'; // Prevent scrolling
            });
        }
    });
    
    // Close modal when clicking the close button
    closeButton.addEventListener('click', () => {
        modal.classList.remove('visible');
        document.body.style.overflow = ''; // Re-enable scrolling
    });
    
    // Close modal when clicking outside content
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.classList.remove('visible');
            document.body.style.overflow = ''; // Re-enable scrolling
        }
    });
    
    // Close modal with Esc key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && modal.classList.contains('visible')) {
            modal.classList.remove('visible');
            document.body.style.overflow = ''; // Re-enable scrolling
        }
    });
}

function getProjectContent(project) {
    // Return HTML content based on project type
    switch(project) {
        case 'equationSolver':
            return `
                <h2>🖥️ Ultimate Equation Solver</h2>
                <div class="modal-image img-placeholder"></div>
                <h3>Purpose:</h3>
                <p>A modern Python-based application designed to solve quartic (4th-degree) polynomial equations.</p>
                
                <h3>Key Features:</h3>
                <ul class="feature-list">
                    <li>🌓 Modern GUI with theme toggle</li>
                    <li>📱 Responsive layout</li>
                    <li>🔢 Supports various input formats</li>
                    <li>📊 Real-time equation display</li>
                    <li>📚 Solving history</li>
                    <li>📋 Copy-paste results</li>
                </ul>

                <h3>Technical Specifications:</h3>
                <ul class="tech-specs">
                    <li><strong>Language:</strong> Python 3.13</li>
                    <li><strong>Libraries:</strong>
                        <ul>
                            <li>sympy - Equation solving</li>
                            <li>tkinter - GUI framework</li>
                            <li>sv_ttk - Modern styling</li>
                        </ul>
                    </li>
                </ul>
                
                <div class="project-links">
                    <a href="#" class="project-link" id="equationSolverButton">Download Code</a>
                    <a href="#" class="project-link demo-link">View Demo</a>
                </div>
            `;
        case 'storeSystem':
            return `
                <h2>🏪 Company Store - Inventory Management System</h2>
                <div class="modal-image img-placeholder"></div>
                <h3>Purpose:</h3>
                <p>A comprehensive Django-based inventory and sales management system designed for small to medium-sized businesses to efficiently track products, manage sales, and monitor customer debts.</p>
                
                <h3>Key Features:</h3>
                <ul class="feature-list">
                    <li>📊 Interactive dashboard with sales analytics and KPIs</li>
                    <li>📦 Complete inventory tracking with low-stock alerts</li>
                    <li>🧾 Sales invoice generation with cash/credit options</li>
                    <li>👥 Customer debt management and payment tracking</li>
                    <li>📈 Visual reports with daily, weekly, and monthly charts</li>
                    <li>🔍 Advanced search and filtering capabilities</li>
                    <li>📱 Responsive design for desktop and mobile devices</li>
                </ul>

                <h3>Implementation Details:</h3>
                <ul class="tech-specs">
                    <li><strong>Backend:</strong> Django framework with Python</li>
                    <li><strong>Database:</strong> SQLite for data persistence</li>
                    <li><strong>Frontend:</strong> Bootstrap for responsive UI with Chart.js for data visualization</li>
                    <li><strong>Architecture:</strong> Model-View-Template (MVT) pattern with modular components</li>
                </ul>
                
                <div class="project-links">
                    <a href="#" class="project-link" id="viewCompanyStore">View Project</a>
                    <a href="#" class="project-link demo-link">View Demo</a>
                </div>
            `;
        case 'calculator':
            return `
                <h2>🧮 Scientific Calculator</h2>
                <div class="modal-image img-placeholder"></div>
                <h3>Purpose:</h3>
                <p>A feature-rich scientific calculator application built with Python and Tkinter, providing advanced mathematical functions in an intuitive user interface.</p>
                
                <h3>Key Features:</h3>
                <ul class="feature-list">
                    <li>➕ Basic arithmetic operations (addition, subtraction, multiplication, division)</li>
                    <li>📐 Trigonometric functions (sin, cos, tan)</li>
                    <li>📊 Logarithmic functions (log, ln)</li>
                    <li>🔢 Mathematical constants (π, e)</li>
                    <li>💾 Memory operations (M+, MR, MC)</li>
                    <li>🌡️ Degree conversion</li>
                    <li>🧩 Parentheses for complex expressions</li>
                    <li>⌨️ Intuitive keyboard layout</li>
                </ul>

                <h3>Technical Specifications:</h3>
                <ul class="tech-specs">
                    <li><strong>Language:</strong> Python 3.x</li>
                    <li><strong>GUI Framework:</strong> Tkinter</li>
                    <li><strong>Libraries:</strong> Math module for scientific functions</li>
                    <li><strong>Design Pattern:</strong> Object-Oriented Programming</li>
                </ul>
                
                <div class="project-links">
                    <a href="#" class="project-link" id="calculatorButton">Download Code</a>
                    <a href="#" class="project-link demo-link">View Demo</a>
                </div>
            `;
        case 'snakeGame':
            return `
                <h2>🐍 Snake Game</h2>
                <div class="modal-image img-placeholder"></div>
                <h3>Purpose:</h3>
                <p>A recreation of the classic Snake game with modern features and customizations, built with Python.</p>
                
                <h3>Key Features:</h3>
                <ul class="feature-list">
                    <li>🎮 Classic snake gameplay with modern visuals</li>
                    <li>🌟 Multiple difficulty levels</li>
                    <li>🏆 Score tracking and high score system</li>
                    <li>🎨 Customizable snake appearance</li>
                    <li>🔊 Sound effects and background music</li>
                    <li>⏱️ Game pause functionality</li>
                </ul>
        
                <h3>Technical Details:</h3>
                <ul class="tech-specs">
                    <li><strong>Language:</strong> Python 3.x</li>
                    <li><strong>Libraries:</strong> Pygame for game development</li>
                    <li><strong>Architecture:</strong> Object-oriented design with game state management</li>
                    <li><strong>Implementation:</strong> Collision detection, vector movement, and food generation algorithms</li>
                </ul>
                
                <div class="project-links">
                    <a href="#" class="project-link" id="snakeCodeButton">Download Code</a>
                    <a href="#" class="project-link demo-link">View Demo</a>
                </div>
            `;
        case 'advancedSnakeGame':
            return `
                <h2>🐍 Advanced Snake Game</h2>
                <div class="modal-image img-placeholder"></div>
                <h3>Purpose:</h3>
                <p>An enhanced version of the classic Snake game featuring improved graphics, gameplay mechanics, and customization options.</p>
                
                <h3>Key Features:</h3>
                <ul class="feature-list">
                    <li>🎮 Dynamic snake rendering with gradient effect and animated eyes</li>
                    <li>🔄 Direction queue for more responsive controls</li>
                    <li>⚡ Combo system with score multipliers</li>
                    <li>🌟 Special bonus food items</li>
                    <li>⏸️ Pause functionality with overlay screen</li>
                    <li>🏆 Persistent high score system</li>
                    <li>🎨 Customizable snake and food colors</li>
                    <li>⚙️ Adjustable game speed and grid visibility</li>
                    <li>🔊 Sound effects with toggle option</li>
                </ul>
        
                <h3>Technical Details:</h3>
                <ul class="tech-specs">
                    <li><strong>Language:</strong> Python 3.x</li>
                    <li><strong>Libraries:</strong> Pygame, json (for save data)</li>
                    <li><strong>Architecture:</strong> Advanced object-oriented design with state management</li>
                    <li><strong>UI Design:</strong> Animated menus and game elements with visual feedback</li>
                    <li><strong>Implementation:</strong> Enhanced collision detection, animation systems, and settings persistence</li>
                </ul>
                
                <div class="project-links">
                    <a href="#" class="project-link" id="advancedSnakeCodeButton">Download Code</a>
                    <a href="#" class="project-link demo-link">View Demo</a>
                </div>
            `;
        case 'storeDashboard':
            return `
                <h2>🏪 Store Dashboard</h2>
                <div class="modal-image img-placeholder"></div>
                <h3>Purpose:</h3>
                <p>A comprehensive web-based dashboard for retail stores to manage inventory, track sales, and monitor financial performance.</p>
                
                <h3>Key Features:</h3>
                <ul class="feature-list">
                    <li>📊 Real-time sales analytics and KPIs</li>
                    <li>📦 Complete inventory management system</li>
                    <li>💵 Financial performance tracking</li>
                    <li>⚠️ Low stock alerts and notifications</li>
                    <li>📝 Invoice generation and management</li>
                    <li>👥 Customer debt tracking system</li>
                    <li>📊 Visual data representation with charts</li>
                    <li>📱 Responsive design for all devices</li>
                </ul>
        
                <h3>Technical Details:</h3>
                <ul class="tech-specs">
                    <li><strong>Frontend:</strong> HTML/CSS, JavaScript, Bootstrap</li>
                    <li><strong>Backend:</strong> Django with Python</li>
                    <li><strong>Database:</strong> SQLite for data persistence</li>
                    <li><strong>Charts:</strong> Chart.js for data visualization</li>
                    <li><strong>Deployment:</strong> Containerized with Docker for easy deployment</li>
                </ul>
                
                <div class="project-links">
                    <a href="#" class="project-link" id="dashboardCodeButton">View Project</a>
                    <a href="#" class="project-link demo-link">View Demo</a>
                </div>
            `;
        default:
            return `<p>Project details not available</p>`;
    }
}

// Set up download button event listeners after modal content is created
document.addEventListener('click', function(e) {
    // Handle download buttons in modal - Using direct links instead of creating dynamic elements
    // This event listener is kept for compatibility with any existing code, but primary functionality 
    // is now handled by the specific button event listeners above
});


