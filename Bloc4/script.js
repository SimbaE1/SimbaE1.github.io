// Room 4 MUN Bloc Interactive Features

// Member data structure
let memberData = [];
let resolutionData = [];
let resolutionCount = 3;

// Load member data from members.txt
async function loadMemberData() {
    try {
        const response = await fetch('members.txt');
        const text = await response.text();
        
        memberData = text.trim().split('\n').filter(line => line && !line.startsWith('#')).map(line => {
            const parts = line.split(',').map(part => part.trim());
            
            return { 
                name: parts[0] || '',
                flag: parts[1] || '',
                fullName: parts[2] || '',
                role: parts[3] || 'Coalition Member',
                expertise: parts[4] ? parts[4].split('|').map(e => e.trim()).filter(e => e && e !== '|||') : [],
                contribution: parts[5] || '',
                stat1: parts[6] || '',
                stat2: parts[7] || '',
                initiative: parts[8] || '',
                initiativeDesc: parts[9] || ''
            };
        });
        
        console.log('Loaded member data:', memberData);
        
        renderCountries();
        updateMemberCount();
        renderMemberInitiatives();
        loadResolutionData();
    } catch (error) {
        console.log('Loading default member data');
        // Fallback to default data if members.txt isn't available
        memberData = [
            { name: 'Philippines', flag: '🇵🇭', fullName: 'Republic of the Philippines', role: 'Coalition Member', expertise: [], contribution: '', stat1: '', stat2: '', initiative: '', initiativeDesc: '' },
            { name: 'Kenya', flag: '🇰🇪', fullName: 'Republic of Kenya', role: 'Coalition Member', expertise: [], contribution: '', stat1: '', stat2: '', initiative: '', initiativeDesc: '' },
            { name: 'Brazil', flag: '🇧🇷', fullName: 'Federative Republic of Brazil', role: 'Coalition Member', expertise: [], contribution: '', stat1: '', stat2: '', initiative: '', initiativeDesc: '' },
            { name: 'New Zealand', flag: '🇳🇿', fullName: 'New Zealand', role: 'Coalition Member', expertise: [], contribution: '', stat1: '', stat2: '', initiative: '', initiativeDesc: '' },
            { name: 'Nigeria', flag: '🇳🇬', fullName: 'Federal Republic of Nigeria', role: 'Coalition Member', expertise: [], contribution: '', stat1: '', stat2: '', initiative: '', initiativeDesc: '' }
        ];
        renderCountries();
        updateMemberCount();
        renderMemberInitiatives();
        loadResolutionData();
    }
}

// Render country cards
function renderCountries() {
    const grid = document.getElementById('countriesGrid');
    if (grid) {
        grid.innerHTML = memberData.map(member => `
            <div class="country-card ${member.name.toLowerCase().replace(' ', '-')}" onclick="showMemberDetails('${member.name}')">
                <div class="flag-icon">${member.flag}</div>
                <h3>${member.name}</h3>
                <p>${member.fullName}</p>
                <div class="member-actions">
                    <button class="contact-btn" onclick="event.stopPropagation(); contactMember()">
                        ℹ️ Info
                    </button>
                </div>
            </div>
        `).join('');
    }
    
    // Also render detailed member cards if on members page
    const membersGrid = document.getElementById('membersGrid');
    if (membersGrid) {
        renderDetailedMembers();
    }
}

// Render detailed member cards for members page
function renderDetailedMembers() {
    const grid = document.getElementById('membersGrid');
    if (!grid) return;
    
    grid.innerHTML = memberData.map(member => `
        <div class="member-card ${member.name.toLowerCase().replace(' ', '-')}">
            <div class="member-header">
                <div class="flag-large">${member.flag}</div>
                <h3>${member.fullName}</h3>
                <p class="member-role">${member.role}</p>
            </div>
            ${member.expertise.length > 0 ? `
                <div class="member-expertise">
                    <h4>Criminal Justice Expertise:</h4>
                    <ul>
                        ${member.expertise.map(exp => `<li>${exp}</li>`).join('')}
                    </ul>
                </div>
            ` : ''}
            ${member.contribution ? `
                <div class="member-contributions">
                    <h4>Key Contributions:</h4>
                    <p>${member.contribution}</p>
                </div>
            ` : ''}
            ${member.stat1 || member.stat2 ? `
                <div class="member-stats">
                    ${member.stat1 ? `<span class="stat">${member.stat1}</span>` : ''}
                    ${member.stat2 ? `<span class="stat">${member.stat2}</span>` : ''}
                </div>
            ` : ''}
        </div>
    `).join('');
}

// Load resolution data from resolutions.txt
async function loadResolutionData() {
    try {
        const response = await fetch('resolutions/resolutions.txt');
        const text = await response.text();
        
        resolutionData = text.trim().split('\n').filter(line => line && !line.startsWith('#')).map(line => {
            const [id, title, status, date, description, sponsors, link] = line.split(',');
            return {
                id: id ? id.trim() : '',
                title: title ? title.trim() : '',
                status: status ? status.trim() : '',
                date: date ? date.trim() : '',
                description: description ? description.trim() : '',
                sponsors: sponsors ? sponsors.split('|').map(s => s.trim()).filter(s => s) : [],
                link: link ? link.trim() : ''
            };
        });
        
        resolutionCount = resolutionData.length;
        updateResolutionCount();
        renderResolutions();
    } catch (error) {
        console.log('Could not load resolution data');
        // Fallback data
        resolutionData = [];
    }
}

// Render resolutions section
function renderResolutions() {
    const resolutionGrid = document.querySelector('.resolution-grid');
    if (!resolutionGrid) return;
    
    if (resolutionData.length === 0) {
        resolutionGrid.innerHTML = `
            <div class="no-resolutions">
                <h3>📋 No Active Resolutions</h3>
                <p>Room 4 coalition resolutions will appear here when added to the system.</p>
                <div class="add-resolution-info">
                    <h4>To Add Resolutions:</h4>
                    <ol>
                        <li>Add resolution details to <code>resolutions/resolutions.txt</code></li>
                        <li>Create the full text file in <code>resolutions/</code> directory</li>
                        <li>Follow the format: ID,Title,Status,Date,Description,Sponsors|Sponsors,filename.txt</li>
                    </ol>
                </div>
            </div>
        `;
        return;
    }
    
    resolutionGrid.innerHTML = resolutionData.map(resolution => {
        const statusClass = resolution.status.toLowerCase().replace(/[^a-z0-9]/g, '-');
        const statusDisplay = resolution.status.replace('-', ' ');
        
        // Get flag emojis for sponsors
        const sponsorFlags = resolution.sponsors.map(sponsor => {
            const member = memberData.find(m => m.name === sponsor);
            return member ? member.flag : '🏛️';
        }).join(' ');
        
        return `
            <div class="resolution-card">
                <div class="resolution-header">
                    <span class="resolution-number">${resolution.id}</span>
                    <span class="resolution-status ${statusClass}">${statusDisplay}</span>
                </div>
                <h3>${resolution.title}</h3>
                <p class="resolution-summary">${resolution.description}</p>
                <div class="resolution-details">
                    <span class="detail">📅 ${resolution.date}</span>
                    <span class="detail">${sponsorFlags} ${resolution.sponsors.join(', ')}</span>
                    <span class="detail">📋 Room 4 Coalition</span>
                </div>
                <a href="resolutions/${resolution.link}" class="view-resolution">View Full Text</a>
            </div>
        `;
    }).join('');
}

// Update resolution count displays
function updateResolutionCount() {
    const elements = document.querySelectorAll('#resolutionCount, #activeResolutions');
    elements.forEach(el => {
        if (el.id === 'resolutionCount') {
            el.textContent = resolutionCount;
        } else if (el.id === 'activeResolutions') {
            el.textContent = `${resolutionCount} Active Resolutions`;
        }
    });
}

// Render member initiatives sections dynamically
function renderMemberInitiatives() {
    // Find all initiative grids on any page
    const initiativeGrids = document.querySelectorAll('.initiatives-grid');
    
    initiativeGrids.forEach(grid => {
        // Generate HTML for members with initiatives only
        const membersWithInitiatives = memberData.filter(member => {
            // Check if member has both initiative title and description, and they're not empty
            const hasInitiative = member.initiative && member.initiative.trim() && member.initiative.trim() !== '';
            const hasDescription = member.initiativeDesc && member.initiativeDesc.trim() && member.initiativeDesc.trim() !== '';
            console.log(`${member.name}: hasInitiative=${hasInitiative}, hasDescription=${hasDescription}`, {
                initiative: member.initiative,
                initiativeDesc: member.initiativeDesc
            });
            return hasInitiative && hasDescription;
        });
        
        console.log('Members with initiatives:', membersWithInitiatives);
        
        const initiativesHTML = membersWithInitiatives
            .map(member => {
                const className = member.name.toLowerCase().replace(' ', '-');
                return `
                    <div class="initiative-card ${className}">
                        <h3>${member.flag} ${member.name}</h3>
                        <p><strong>${member.initiative}</strong></p>
                        <p>${member.initiativeDesc}</p>
                    </div>
                `;
            }).join('');
        
        // If we have initiatives, render them, otherwise show message
        if (initiativesHTML) {
            grid.innerHTML = initiativesHTML;
        } else {
            grid.innerHTML = `
                <div class="no-initiatives">
                    <h3>📋 No Coalition Initiatives Available</h3>
                    <p>Member initiatives will appear here when added to members.txt</p>
                    <div class="add-initiative-info">
                        <h4>To Add Initiative:</h4>
                        <p>Add InitiativeTitle and InitiativeDescription to a country's line in members.txt</p>
                        <code>CountryName,Flag,OfficialName,Role,Expertise,Contribution,Stat1,Stat2,InitiativeTitle,InitiativeDescription</code>
                    </div>
                </div>
            `;
        }
    });
}

// Update member count displays
function updateMemberCount() {
    const count = memberData.length;
    const memberCountEl = document.getElementById('memberCount');
    const memberCountDetailEl = document.getElementById('memberCountDetail');
    
    if (memberCountEl) memberCountEl.textContent = count;
    if (memberCountDetailEl) memberCountDetailEl.textContent = `${count} Member Nations`;
}

// Load resolution count
function loadResolutionCount() {
    const resolutionCountEl = document.getElementById('resolutionCount');
    const activeResolutionsEl = document.getElementById('activeResolutions');
    
    if (resolutionCountEl) resolutionCountEl.textContent = resolutionCount;
    if (activeResolutionsEl) activeResolutionsEl.textContent = `${resolutionCount} Active Resolutions`;
}

// Animate statistics on page load
function animateStats() {
    const statNumbers = document.querySelectorAll('.stat-number');
    
    statNumbers.forEach(stat => {
        const target = parseInt(stat.textContent);
        const duration = 2000;
        const step = target / (duration / 16);
        let current = 0;
        
        const timer = setInterval(() => {
            current += step;
            if (current >= target) {
                current = target;
                clearInterval(timer);
            }
            stat.textContent = Math.floor(current);
        }, 16);
    });
}

// Interactive functions
function joinBloc() {
    showModal('Join Our Room 4 Bloc!', `
        <div class="join-info">
            <h3>🏛️ Room 4 Criminal Justice Bloc</h3>
            <p>Want to join our team? We're looking for more countries to work on criminal justice issues with us!</p>
            
            <h4>What we need:</h4>
            <ul>
                <li>Interest in any of our three focus areas (pre-trial, funding, or rehabilitation)</li>
                <li>Willingness to help write and co-sponsor resolutions</li>
                <li>Show up to our meetings in Room 4</li>
                <li>That's it! This is just for the week-long conference</li>
            </ul>
            
            <h4>How to join:</h4>
            <p>Just come find us in <strong>Room 4</strong> during committee sessions or breaks and say you want to join!</p>
            
            <div class="quick-actions">
                <button onclick="window.location.href='members.html'" class="modal-button primary">See Who's Already In</button>
                <button onclick="closeModal()" class="modal-button secondary">Got It!</button>
            </div>
        </div>
    `);
}

function viewResolutions() {
    window.location.href = 'resolutions.html';
}

function loadMembers() {
    window.location.href = 'members.html';
}

function showContact() {
    const contactInfo = `
        <div class="contact-info">
            <h3>🏛️ Room 4 Criminal Justice Coalition</h3>
            <p><strong>Location:</strong> Conference Room 4</p>
            <p><strong>Meeting Times:</strong> Daily during MUN sessions</p>
            <p><strong>Focus Areas:</strong> Pre-trial alternatives, funding, rehabilitation</p>
            
            <h4>Coalition Leadership Structure:</h4>
            <ul>
                <li><strong>Co-Chairs:</strong> Philippines & Brazil Delegations</li>
                <li><strong>Funding Lead:</strong> Kenya Delegation</li>
                <li><strong>Rehabilitation Expert:</strong> New Zealand Delegation</li>
                <li><strong>Access Advocate:</strong> Nigeria Delegation</li>
            </ul>
            
            <div class="quick-actions">
                <button onclick="joinBloc()" class="modal-button primary">Join Our Coalition</button>
                <button onclick="closeModal()" class="modal-button secondary">Close</button>
            </div>
        </div>
    `;
    
    showModal('Room 4 Coalition Info', contactInfo);
}

function showMemberDetails(memberName) {
    const member = memberData.find(m => m.name === memberName);
    if (!member) return;
    
    const details = `
        <div class="member-details">
            <div class="member-flag">${member.flag}</div>
            <h3>${member.name}</h3>
            <p class="member-full-name">${member.fullName}</p>
            
            <div class="member-info">
                <p><strong>Coalition Role:</strong> Room 4 Member</p>
                <p><strong>Focus Areas:</strong> Criminal Justice Reform</p>
                <p><strong>Meeting Location:</strong> Conference Room 4</p>
            </div>
            
            <div class="member-contributions">
                <h4>Coalition Participation:</h4>
                <ul>
                    <li>Active in pre-trial alternatives discussions</li>
                    <li>Contributing to funding model development</li>
                    <li>Supporting rehabilitation program standards</li>
                </ul>
            </div>
            
            <div class="quick-actions">
                <button onclick="closeModal()" class="modal-button primary">Close</button>
            </div>
        </div>
    `;
    
    showModal(`${member.name} - Coalition Member`, details);
}

function contactMember() {
    showModal('Coalition Communication', `
        <div class="contact-member-info">
            <h3>📞 Coalition Member Communication</h3>
            <p>Room 4 coalition members communicate through:</p>
            <ul>
                <li><strong>Official channels:</strong> Diplomatic notes through permanent missions</li>
                <li><strong>Conference sessions:</strong> Direct consultation in Room 4</li>
                <li><strong>Working groups:</strong> Specialized topic discussions</li>
                <li><strong>Documentation:</strong> Shared policy papers and best practices</li>
            </ul>
            <p><em>All formal coalition business is conducted through official diplomatic channels during MUN sessions.</em></p>
            <button onclick="closeModal()" class="modal-button primary">Understood</button>
        </div>
    `);
}

function generateMemberModal() {
    return `
        <div class="members-list">
            ${memberData.map(member => `
                <div class="modal-member-card" onclick="showMemberDetails('${member.name}')">
                    <span class="modal-flag">${member.flag}</span>
                    <div class="modal-member-info">
                        <strong>${member.name}</strong>
                        <span>${member.fullName}</span>
                    </div>
                    <button class="contact-mini-btn" onclick="event.stopPropagation(); contactMember()">ℹ️</button>
                </div>
            `).join('')}
            <div class="add-member-prompt">
                <p><strong>Want to add a new member?</strong></p>
                <p>Add them to <code>members.txt</code> in the format:</p>
                <code>CountryName,🏁,Full Official Name</code>
            </div>
        </div>
    `;
}

// Modal functions
function showModal(title, content) {
    const modal = document.createElement('div');
    modal.className = 'modal-overlay';
    modal.innerHTML = `
        <div class="modal-content">
            <div class="modal-header">
                <h2>${title}</h2>
                <button class="modal-close" onclick="closeModal()">&times;</button>
            </div>
            <div class="modal-body">
                ${content}
            </div>
        </div>
    `;
    
    document.body.appendChild(modal);
    setTimeout(() => modal.classList.add('show'), 10);
    
    // Close modal when clicking outside
    modal.addEventListener('click', (e) => {
        if (e.target === modal) closeModal();
    });
}

function closeModal() {
    const modal = document.querySelector('.modal-overlay');
    if (modal) {
        modal.classList.remove('show');
        setTimeout(() => modal.remove(), 300);
    }
}

// Keyboard shortcuts
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeModal();
    if (e.key === '4' && e.ctrlKey) {
        e.preventDefault();
        alert('🏛️ You are in Room 4 - The heart of diplomatic innovation!');
    }
});

// Add some Room 4 easter eggs
let room4Counter = 0;
document.addEventListener('click', (e) => {
    if (e.target.textContent && e.target.textContent.includes('4')) {
        room4Counter++;
        if (room4Counter === 4) {
            const confetti = document.createElement('div');
            confetti.textContent = '🎉 Room 4 Power! 🏛️';
            confetti.style.cssText = `
                position: fixed;
                top: 50%;
                left: 50%;
                transform: translate(-50%, -50%);
                font-size: 2em;
                color: #4f46e5;
                pointer-events: none;
                z-index: 10000;
                animation: fadeInOut 2s ease-in-out;
            `;
            document.body.appendChild(confetti);
            setTimeout(() => confetti.remove(), 2000);
            room4Counter = 0;
        }
    }
});

// Scroll Animation Observer
function initScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, observerOptions);
    
    // Observe elements for animations
    document.querySelectorAll('.pillar-card, .member-card, .country-card, .approach-card, .program-card, .metric-card, .initiative-card, .model-card, .support-card, .priority-section').forEach((el, index) => {
        el.classList.add('fade-in');
        // Stagger animations
        setTimeout(() => {
            observer.observe(el);
        }, index * 50);
    });
    
    // Special animations for different elements
    document.querySelectorAll('.hero-content, .room-highlight').forEach(el => {
        el.classList.add('scale-in');
        observer.observe(el);
    });
    
    document.querySelectorAll('.overview-text, .mission-description').forEach(el => {
        el.classList.add('slide-up');
        observer.observe(el);
    });
    
    document.querySelectorAll('.stats-bar .stat, .impact-stats .stat-item').forEach((el, index) => {
        el.classList.add('stagger-animation');
        setTimeout(() => {
            observer.observe(el);
        }, index * 150);
    });
}

// Initialize scroll animations when DOM is loaded
document.addEventListener('DOMContentLoaded', initScrollAnimations);

// Add CSS animations
const style = document.createElement('style');
style.textContent = `
    @keyframes fadeInOut {
        0%, 100% { opacity: 0; transform: translate(-50%, -50%) scale(0.5); }
        50% { opacity: 1; transform: translate(-50%, -50%) scale(1.2); }
    }
    
    .pulse {
        animation: pulse 2s infinite;
    }
    
    @keyframes pulse {
        0% { box-shadow: 0 0 0 0 rgba(79, 70, 229, 0.7); }
        70% { box-shadow: 0 0 0 10px rgba(79, 70, 229, 0); }
        100% { box-shadow: 0 0 0 0 rgba(79, 70, 229, 0); }
    }
`;
document.head.appendChild(style);