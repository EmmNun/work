// Volleyball World - script.js
document.addEventListener('DOMContentLoaded', function() {
    
    const userData = localStorage.getItem('volleyballUserData');
   
    if (userData) {
        
        const { name, theme } = JSON.parse(userData);
        applyTheme(theme);
        showWelcomeMessage(name, true);
        updateThemeToggle(theme);
    } else {
        
        const userName = prompt("Welcome to Volleyball World! What is your name?");
       
        if (userName && userName.trim() !== '') {
            let themeChoice;
           
            
            while (true) {
                themeChoice = prompt(`${userName}, do you prefer dark or light mode? (Type 'dark' or 'light')`);
               
                if (themeChoice === null) {
                    themeChoice = 'light'; 
                    break;
                }
               
                themeChoice = themeChoice.toLowerCase().trim();
               
                if (themeChoice === 'dark' || themeChoice === 'light') {
                    break;
                }
               
                alert("Please type 'dark' or 'light'");
            }
           
            
            localStorage.setItem('volleyballUserData', JSON.stringify({
                name: userName,
                theme: themeChoice
            }));
           
            // Apply user preferences
            applyTheme(themeChoice);
            updateThemeToggle(themeChoice);
            showWelcomeMessage(userName, false);
        } else {
           
            applyTheme('light');
            updateThemeToggle('light');
        }
    }
   
    // Set up page functionality
    setupNavigation();
    setupPlayerCards();
    setupThemeToggle();
});

function applyTheme(theme) {
    const body = document.body;

    if (theme === 'dark') {
        body.classList.add('dark-mode');
    } else {
        body.classList.remove('dark-mode');
    }
}

function updateThemeToggle(theme) {
    const themeToggle = document.getElementById('theme-toggle');
    if (themeToggle) {
        themeToggle.checked = (theme === 'dark');
        
       
        const themeLabel = document.getElementById('theme-toggle-label');
        if (themeLabel) {
            themeLabel.textContent = theme === 'dark' ? '🌙' : '☀️';
        }
    }
}

function setupThemeToggle() {
    const themeToggle = document.getElementById('theme-toggle');
    
    if (themeToggle) {
        themeToggle.addEventListener('change', function() {
            const userData = JSON.parse(localStorage.getItem('volleyballUserData') || '{}');
            const newTheme = this.checked ? 'dark' : 'light';
            
            
            userData.theme = newTheme;
            localStorage.setItem('volleyballUserData', JSON.stringify(userData));
            
            
            applyTheme(newTheme);
            updateThemeToggle(newTheme);
        });
    }
}

function showWelcomeMessage(name, isReturning) {
    const welcomeMsg = document.createElement('div');
    welcomeMsg.className = 'welcome-message';
    welcomeMsg.id = 'welcome-message';
    welcomeMsg.style.position = 'fixed';
    welcomeMsg.style.top = '20px';
    welcomeMsg.style.right = '20px';
    welcomeMsg.style.backgroundColor = '#004E89';
    welcomeMsg.style.color = 'white';
    welcomeMsg.style.padding = '15px';
    welcomeMsg.style.borderRadius = '8px';
    welcomeMsg.style.boxShadow = '0 4px 8px rgba(0,0,0,0.2)';
    welcomeMsg.style.zIndex = '1000';
    welcomeMsg.style.maxWidth = '300px';
   
    const messageText = isReturning ?
        `<h3 style="margin-top: 0; color: white;">Welcome back, ${name}!</h3>` :
        `<h3 style="margin-top: 0; color: white;">Welcome, ${name}!</h3>`;
   
    welcomeMsg.innerHTML = `
        ${messageText}
        <p>Enjoy exploring volleyball!</p>
        <button style="position: absolute; top: 5px; right: 5px; background: none; border: none; color: white; font-size: 16px; cursor: pointer;">×</button>
    `;
   
    document.body.appendChild(welcomeMsg);
   
    
    welcomeMsg.querySelector('button').addEventListener('click', function() {
        welcomeMsg.style.display = 'none';
    });
   
    
    setTimeout(() => {
        welcomeMsg.style.display = 'none';
    }, 10000);
}

function setupNavigation() {
    
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    document.querySelectorAll('.nav-menu a').forEach(link => {
        if (link.getAttribute('href') === currentPage) {
            link.style.backgroundColor = '#FFD166';
            link.style.color = '#292F36';
        }
    });
}

function setupPlayerCards() {
    
    const playerCards = document.querySelectorAll('.player-card');
   
    if (playerCards.length > 0) {
        playerCards.forEach(card => {
            card.addEventListener('click', function(e) {
                
                if (e.target.tagName === 'A') return;
               
                // Toggle expanded class
                this.classList.toggle('expanded');
               
                if (this.classList.contains('expanded')) {
                    this.style.transform = 'scale(1.05)';
                    this.style.boxShadow = '0 8px 16px rgba(0,0,0,0.2)';
                    this.style.zIndex = '10';
                } else {
                    this.style.transform = '';
                    this.style.boxShadow = '';
                    this.style.zIndex = '';
                }
            });
        });
    }
   
   
    animateCards();
}

function animateCards() {
    
    const cards = document.querySelectorAll('.card, .player-card');
    cards.forEach((card, index) => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(20px)';
        card.style.transition = 'opacity 0.5s, transform 0.5s';
       
        setTimeout(() => {
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
        }, 100 * index);
    });
}