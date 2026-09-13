**BlogPulse AI**

BlogPulse AI is an Agentic AI writing assistant that helps users research blog topics and generate content strategy recommendations using web search and Llama 3.2.

**Overview**

BlogPulse AI takes a blog topic from the user, retrieves relevant information from the web, and passes the collected context to an AI model for analysis. The generated results are presented through a React-based dashboard.

The application focuses on assisting with the early stages of blog creation, including topic research, content planning, audience identification, title generation, and publishing recommendations.

**Features**

* Blog topic analysis
* Web-based research
* Blog topic recommendations
* Blog title generation
* Introduction generation
* Target audience suggestions
* Writing tone recommendations
* Blog key points and outline
* Visual content suggestions
* Hashtag recommendations
* Recommended publishing time
* Estimated engagement score
* Interactive Writing Pulse dashboard

**Technology Stack**

**Frontend**

* React.js
* Vite
* Axios
* HTML
* CSS

**Backend**

* Python
* FastAPI
* REST API

**AI & Workflow**


* Langflow
* Ollama
* Llama 3.2
* Web Search


### Prerequisites

Make sure the following are installed:

* Python
* Node.js
* Git
* Ollama
* Langflow

### 1. Start Ollama

Run the Llama 3.2 model:

ollama run llama3.2

Keep Ollama running while using the application.

**2. Start Langflow**

Navigate to your Langflow project directory:

```powershell
cd <langflow-project-directory>
.\venv\Scripts\Activate.ps1
langflow run
```

Langflow will be available at:

http://localhost:7860

Make sure the BlogPulse AI Langflow workflow is configured and available.

**3. Start the Backend**

From the BlogPulse AI repository root:

cd backend
.\venv\Scripts\Activate.ps1
uvicorn main:app --reload

The backend will be available at:

http://127.0.0.1:8000

FastAPI documentation:

http://localhost:8000/docs

**4. Start the Frontend**

From the BlogPulse AI repository root:
cd frontend
npm install
npm run dev

The frontend will be available at:

http://localhost:5173

**Environment Variables**

Create a `.env` file in the backend directory:

LANGFLOW_URL=http://127.0.0.1:7860
LANGFLOW_FLOW_ID=YOUR_FLOW_ID
LANGFLOW_API_KEY=YOUR_API_KEY


## License

This project is intended for educational and hackathon purposes.
