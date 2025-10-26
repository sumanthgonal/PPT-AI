# Quick Start Guide

Get your AI Chat PPT Generator up and running in 5 minutes!

## Prerequisites

- Node.js 18+ installed
- A Google Gemini API key ([Get one here](https://makersuite.google.com/app/apikey))

## Installation Steps

### 1. Clone and Install

```bash
# Clone the repository
git clone <your-repository-url>
cd ai-chat

# Install dependencies
npm install
```

### 2. Configure API Key

```bash
# Copy environment template
cp .env.example .env.local

# Edit .env.local and add your API key
# GEMINI_API_KEY=your_actual_api_key_here
```

### 3. Run Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## First Steps

### Create Your First Presentation

1. In the chat interface, type a prompt like:
   ```
   Create a presentation about artificial intelligence
   ```

2. Wait for the AI to generate your slides

3. Review the presentation in the preview panel

4. Click "Download PPTX" to save your presentation

### Edit Your Presentation

Continue the conversation to make changes:
```
Add a slide about machine learning applications
```

```
Make the introduction more engaging
```

```
Add speaker notes to slide 3
```

### Manage Chat History

- Click "New Chat" to start fresh
- Click on previous chats in the sidebar to view them
- Hover over a chat and click the trash icon to delete it

## Example Prompts

Try these prompts to get started:

**Business Presentations:**
- "Create a quarterly business review presentation"
- "Make slides for a product launch of a mobile app"
- "Generate a sales pitch for a SaaS product"

**Educational Presentations:**
- "Create a presentation about the solar system for high school students"
- "Make slides explaining photosynthesis"
- "Generate a history presentation about World War II"

**Technical Presentations:**
- "Create a presentation about cloud computing architecture"
- "Make slides explaining RESTful API design"
- "Generate a presentation about cybersecurity best practices"

## Tips for Better Presentations

1. **Be Specific**: The more detailed your prompt, the better the results
   - Good: "Create a 7-slide presentation about renewable energy with focus on solar and wind power"
   - Better: "Create a presentation about renewable energy. Include: introduction, current energy crisis, solar power benefits, wind power benefits, cost comparison, environmental impact, and conclusion"

2. **Iterate**: Don't expect perfection on the first try. Use follow-up prompts to refine:
   ```
   Make the bullet points more concise
   Add statistics to support the claims
   Reorganize the slides for better flow
   ```

3. **Customize**: Ask for specific elements:
   ```
   Add speaker notes to each slide
   Include a Q&A slide at the end
   Create a title slide with my company name
   ```

## Troubleshooting

### "Failed to generate presentation"
- Check that your API key is correctly set in `.env.local`
- Verify the API key is active at [Google AI Studio](https://makersuite.google.com/)
- Check your internet connection

### Download doesn't work
- Ensure pop-ups are not blocked
- Try a different browser (Chrome, Firefox, Safari)
- Check browser console for errors (F12)

### Chat history not saving
- Ensure localStorage is enabled in your browser
- Check if you're in incognito/private mode (localStorage doesn't persist)
- Try clearing browser cache and reloading

## Next Steps

- Read the full [README.md](README.md) for detailed documentation
- Check [DEPLOYMENT.md](DEPLOYMENT.md) for deployment instructions
- Explore the codebase to customize the UI or functionality
- Star the repository if you find it useful!

## Need Help?

- Open an issue on GitHub
- Check existing issues for solutions
- Review the [CONTRIBUTING.md](CONTRIBUTING.md) guide

Happy presenting!
