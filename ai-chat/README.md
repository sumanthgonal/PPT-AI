# AI Chat PPT Generator

An AI-powered chat application that generates and edits PowerPoint presentations using Google's Gemini AI model and pptxgenjs library.

## Features

- **AI-Powered Generation**: Create professional presentations using natural language prompts
- **Interactive Editing**: Update and refine presentations through conversational AI
- **Live Preview**: See your presentation structure in real-time
- **Download Options**: Export presentations as PPTX files
- **Chat History**: Automatic session persistence with localStorage
- **Responsive Design**: Works seamlessly on desktop and mobile devices
- **Dark Mode Support**: Automatic dark/light theme switching

## Tech Stack

- **Frontend**: Next.js 14 (App Router), React 18, TypeScript
- **Styling**: Tailwind CSS
- **AI Model**: Google Gemini 2.0 Flash (gemini-2.0-flash-exp)
- **PPT Generation**: pptxgenjs
- **Storage**: Browser localStorage for chat history

## Prerequisites

Before you begin, ensure you have the following installed:

- Node.js 18.x or higher
- npm or yarn package manager
- A Google Gemini API key (get one at [Google AI Studio](https://makersuite.google.com/app/apikey))

## Installation

1. **Clone the repository**

```bash
git clone <your-repository-url>
cd ai-chat
```

2. **Install dependencies**

```bash
npm install
```

3. **Configure environment variables**

Create a `.env.local` file in the root directory:

```bash
cp .env.example .env.local
```

Edit `.env.local` and add your Gemini API key:

```env
GEMINI_API_KEY=your_gemini_api_key_here
```

## Usage

### Development Mode

Run the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Production Build

Build the application for production:

```bash
npm run build
npm start
```

## How to Use

### Creating a Presentation

1. **Start a New Chat**: Click the "New Chat" button in the sidebar
2. **Enter Your Prompt**: Describe what presentation you want to create
   - Example: "Create a presentation about climate change"
   - Example: "Make slides for a product launch of an AI assistant"
3. **Review the Preview**: The generated presentation will appear in the preview panel
4. **Download**: Click "Download PPTX" to save your presentation

### Editing a Presentation

1. **Continue the Conversation**: Type additional prompts to modify your presentation
   - Example: "Add a slide about our pricing tiers"
   - Example: "Make the introduction more engaging"
   - Example: "Remove the last slide"
2. **See Updates**: The preview will update automatically
3. **Download Updated Version**: Click "Download PPTX" again

### Managing Chat History

- **View Previous Chats**: All your chat sessions are saved in the sidebar
- **Switch Between Chats**: Click on any previous chat to view it
- **Delete Chats**: Hover over a chat and click the trash icon to delete it

## Project Structure

```
ai-chat/
├── app/
│   ├── api/
│   │   └── chat/
│   │       └── route.ts          # API route for AI chat
│   ├── globals.css               # Global styles
│   ├── layout.tsx                # Root layout
│   └── page.tsx                  # Main chat interface
├── components/
│   ├── ChatInput.tsx             # Message input component
│   ├── ChatMessage.tsx           # Message display component
│   ├── PresentationPreview.tsx   # PPT preview component
│   └── Sidebar.tsx               # Chat history sidebar
├── services/
│   ├── geminiService.ts          # Gemini AI integration
│   └── pptService.ts             # PowerPoint generation
├── types/
│   └── index.ts                  # TypeScript type definitions
├── utils/
│   ├── helpers.ts                # Utility functions
│   └── storage.ts                # localStorage management
├── .env.example                  # Environment variables template
├── .gitignore                    # Git ignore rules
├── next.config.js                # Next.js configuration
├── package.json                  # Dependencies
├── postcss.config.js             # PostCSS configuration
├── README.md                     # This file
├── tailwind.config.ts            # Tailwind CSS configuration
└── tsconfig.json                 # TypeScript configuration
```

## Key Components

### Services

- **geminiService.ts**: Handles communication with Google Gemini AI
  - `generatePresentationFromPrompt()`: Creates new presentations
  - `updatePresentationFromPrompt()`: Updates existing presentations

- **pptService.ts**: Manages PowerPoint generation
  - `generatePowerPoint()`: Converts presentation data to PPTX format
  - `downloadPresentation()`: Triggers file download

### Components

- **ChatMessage**: Displays individual chat messages with timestamps
- **ChatInput**: Text input with send button and keyboard shortcuts
- **PresentationPreview**: Shows slides with download functionality
- **Sidebar**: Chat history management and navigation

### Storage

- **storage.ts**: Manages chat sessions in browser localStorage
  - Automatic session creation and updates
  - Chat history persistence
  - Session switching and deletion

## Deployment

### Vercel (Recommended)

1. Push your code to GitHub
2. Import your repository in [Vercel](https://vercel.com)
3. Add your `GEMINI_API_KEY` in the Environment Variables section
4. Deploy

### Other Platforms

The application can be deployed to any platform that supports Next.js:

- **Netlify**: Use the Next.js build preset
- **AWS Amplify**: Configure build settings for Next.js
- **Railway**: Connect your GitHub repository
- **Docker**: Create a Dockerfile for containerized deployment

## Environment Variables

| Variable | Description | Required |
|----------|-------------|----------|
| `GEMINI_API_KEY` | Google Gemini API key | Yes |

## Assumptions Made

1. **AI Model**: Using `gemini-2.0-flash-exp` as it's currently available (the specified model `gemini-2.5-pro-preview-05-06` may need to be updated based on availability)
2. **Presentation Structure**: Generated presentations follow a standard format with title slide and content slides
3. **Browser Support**: Modern browsers with localStorage support
4. **File Download**: Uses client-side download (no server-side file storage)
5. **API Rate Limits**: Assumes standard Gemini API rate limits (no custom rate limiting implemented)

## Troubleshooting

### API Key Issues

If you see errors about API keys:
- Verify your `GEMINI_API_KEY` is set in `.env.local`
- Ensure the API key is valid and active
- Check that the API key has the correct permissions

### Build Errors

If you encounter build errors:
- Delete `node_modules` and `.next` folders
- Run `npm install` again
- Clear browser cache and restart dev server

### Download Issues

If presentations won't download:
- Check browser console for errors
- Ensure pop-ups are not blocked
- Try a different browser

## Future Enhancements

- [ ] PDF export option
- [ ] Streaming presentation generation with progress indicator
- [ ] Custom slide templates and themes
- [ ] Image insertion from URLs or uploads
- [ ] Collaborative editing with shareable links
- [ ] Export to Google Slides
- [ ] Voice input for prompts
- [ ] Multi-language support

## License

MIT License - feel free to use this project for any purpose.

## Support

For issues, questions, or contributions, please open an issue on GitHub.

## Acknowledgments

- [Google Gemini AI](https://ai.google.dev/) for the AI model
- [pptxgenjs](https://gitbrent.github.io/PptxGenJS/) for PowerPoint generation
- [Next.js](https://nextjs.org/) for the React framework
- [Tailwind CSS](https://tailwindcss.com/) for styling
