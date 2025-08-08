# Room 4 MUN Bloc Website

🏛️ **Five Nations, One Voice - Unified in Room 4**

A modern, interactive website for the Model United Nations bloc operating in Room 4, featuring dynamic member management and resolution tracking.

## Live Site
Visit our website: [Room 4 MUN Bloc](https://SimbaE1.github.io/MUN)

## Bloc Members
- 🇵🇭 Philippines
- 🇰🇪 Kenya  
- 🇧🇷 Brazil
- 🇳🇿 New Zealand
- 🇳🇬 Nigeria

## Features

### 🎯 **Room 4 Focused Design**
- Prominent Room 4 branding throughout
- Interactive statistics and counters
- Animated elements emphasizing our room identity

### 👥 **Dynamic Member Management**
- Members loaded from `members.txt` file
- Easy to add/remove countries
- Contact information for each delegation
- Interactive member cards with details

### 📋 **Resolution Archive**
- Complete legislative history in `/stuff/`
- Categorized by status (Adopted, In Progress, Working Papers)
- Template for new resolutions
- Statistics tracking

### 🚀 **Interactive Features**
- Modal dialogs for detailed information
- Click-to-contact functionality
- Animated statistics
- Mobile-responsive design
- Room 4 easter eggs

## Quick Start

### Adding New Members
1. Edit `members.txt` in the format:
   ```
   CountryName,🏁,Full Official Name,email@domain.com
   ```
2. The website will automatically load the new member

### Adding New Resolutions
1. Create a new HTML file in the `/stuff/` directory
2. Use the template in `/stuff/template.html`
3. Update `/stuff/index.html` to include the new resolution card

### GitHub Pages Setup
1. Enable GitHub Pages in your repository settings
2. Select source as "Deploy from a branch" 
3. Choose the `gh-pages` branch (or `main` branch)
4. Your site will be available at `https://SimbaE1.github.io/MUN`

## File Structure
```
MUN/
├── index.html              # Main homepage
├── styles.css              # All styling
├── script.js               # Interactive features
├── members.txt             # Member data (easy to edit)
├── _config.yml             # GitHub Pages configuration
├── stuff/                  # Resolution archive
│   ├── index.html          # Archive homepage
│   └── template.html       # Template for new resolutions
└── README.md               # This file
```

## GitHub Pages Features Used
- Jekyll processing with `_config.yml`
- Custom domain support ready
- SEO optimization
- Automatic sitemap generation
- Social media meta tags

## Customization

### Colors
The site uses a purple-blue gradient theme emphasizing Room 4. Main colors:
- Primary: `#4f46e5` (Indigo)
- Secondary: `#7c3aed` (Purple)
- Accent: `#667eea` (Light blue)

### Room 4 Branding
Room 4 is emphasized through:
- Large room numbers in headers
- "Room 4" repeated throughout copy
- Interactive room-focused elements
- Footer branding
- Statistics highlighting room identity

## Contributing
1. Fork the repository
2. Make changes to member data or resolutions
3. Submit a pull request
4. Changes will automatically deploy via GitHub Pages

## Contact
- **Email**: room4@mun.org
- **GitHub**: [Repository Issues](https://github.com/SimbaE1/MUN/issues)
- **Location**: Conference Room 4

---
*Proudly representing diplomatic excellence from Room 4 🏛️*