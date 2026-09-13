import { useEffect, useState } from "react";
import axios from "axios";
import "./App.css";

const API = "http://127.0.0.1:8000";

function App() {
  const [dashboard, setDashboard] = useState(null);

  const [topic, setTopic] = useState("");

  const [tone, setTone] = useState("Professional");

  const [audience, setAudience] = useState("General");

  const [result, setResult] = useState(null);

  const [loading, setLoading] = useState(false);

  const [error, setError] = useState("");


  // =========================================================
  // LOAD DASHBOARD
  // =========================================================

  useEffect(() => {
    loadDashboard();
  }, []);


  const loadDashboard = async () => {
    try {
      const response = await axios.get(
        `${API}/api/dashboard`
      );

      setDashboard(response.data);

    } catch (err) {

      setError(
        "Could not connect to the backend. Make sure FastAPI is running."
      );

    }
  };


  // =========================================================
  // CREATE BLOG PLAN
  // =========================================================

  const createBlogPlan = async () => {

    if (!topic.trim()) {

      setError(
        "Please enter a topic first."
      );

      return;
    }


    setLoading(true);

    setError("");

    setResult(null);


    try {

      const response = await axios.post(
        `${API}/api/agent`,
        {
          topic: topic,
          tone: tone,
          audience: audience
        }
      );


      setResult(response.data);


    } catch (err) {

      console.error(err);

      const backendMessage =
        err.response?.data?.detail;


      setError(
        backendMessage ||
        "Something went wrong while generating the blog plan."
      );


    } finally {

      setLoading(false);

    }

  };


  // =========================================================
  // LOADING SCREEN
  // =========================================================

  if (!dashboard) {

    return (

      <div className="loading-screen">

        <h2>✍️ BlogPulse AI</h2>

        <p>
          Connecting to your AI writing assistant...
        </p>

        {error && (
          <p className="error">
            {error}
          </p>
        )}

      </div>

    );

  }


  // =========================================================
  // MAIN UI
  // =========================================================

  return (

    <div className="app">


      {/* =====================================================
          HEADER
      ====================================================== */}

      <header className="header">

        <div>

          <h1>
            ✍️ BlogPulse AI
          </h1>

          <p>
            Agentic AI Writing Assistant
          </p>

        </div>


        <div className="status">

          <span className="status-dot"></span>

          AI System Online

        </div>

      </header>


      <main className="container">


        {/* ===================================================
            HERO
        ==================================================== */}

        <section className="hero">

          <div>

            <h2>
              Write smarter. Publish better.
            </h2>

            <p>
              Discover trending topics, analyze sentiment,
              predict engagement, and create your next
              blog strategy with AI.
            </p>

          </div>

        </section>


        {/* ===================================================
            WRITING PULSE
        ==================================================== */}

        <section className="dashboard">

          <h2>
            📊 Writing Pulse
          </h2>


          <div className="dashboard-grid">


            {/* TRENDING TOPICS */}

            <div className="card">

              <h3>
                🔥 Trending Topics
              </h3>


              {dashboard.trending_topics?.map(
                (item, index) => (

                  <div
                    className="trend-item"
                    key={index}
                  >

                    <span>
                      {item.topic}
                    </span>

                    <strong>
                      {item.score}
                    </strong>

                  </div>

                )
              )}

            </div>


            {/* SENTIMENT */}

            <div className="card">

              <h3>
                💬 Audience Sentiment
              </h3>


              <div className="sentiment">

                <div>

                  <strong>
                    {dashboard.sentiment?.positive}%
                  </strong>

                  <span>
                    Positive
                  </span>

                </div>


                <div>

                  <strong>
                    {dashboard.sentiment?.neutral}%
                  </strong>

                  <span>
                    Neutral
                  </span>

                </div>


                <div>

                  <strong>
                    {dashboard.sentiment?.negative}%
                  </strong>

                  <span>
                    Negative
                  </span>

                </div>

              </div>

            </div>


            {/* ENGAGEMENT */}

            <div className="card">

              <h3>
                📈 Engagement Forecast
              </h3>


              <div className="forecast">

                <strong>
                  {dashboard.engagement_forecast}%
                </strong>

                <p>
                  Predicted engagement
                </p>

              </div>

            </div>


            {/* PUBLISHING TIME */}

            <div className="card">

              <h3>
                ⏰ Best Publishing Time
              </h3>


              <div className="publish-time">

                <strong>
                  {dashboard.recommended_publish_time}
                </strong>

                <p>
                  Recommended publishing time
                </p>

              </div>

            </div>


          </div>

        </section>


        {/* ===================================================
            AI INPUT
        ==================================================== */}

        <section className="input-card">

          <h2>
            🤖 AI Content Planner
          </h2>


          <p className="section-description">

            Enter a topic and let BlogPulse AI research
            it and create a complete blog strategy.

          </p>


          <label>
            What do you want to write about?
          </label>


          <textarea
            value={topic}
            onChange={(e) =>
              setTopic(e.target.value)
            }
            placeholder="Example: The future of AI agents in software development..."
          />


          <div className="selectors">


            {/* TONE */}

            <div>

              <label>
                Writing Tone
              </label>


              <select
                value={tone}
                onChange={(e) =>
                  setTone(e.target.value)
                }
              >

                <option>
                  Professional
                </option>

                <option>
                  Casual
                </option>

                <option>
                  Educational
                </option>

                <option>
                  Technical
                </option>

                <option>
                  Conversational
                </option>

              </select>

            </div>


            {/* AUDIENCE */}

            <div>

              <label>
                Target Audience
              </label>


              <select
                value={audience}
                onChange={(e) =>
                  setAudience(e.target.value)
                }
              >

                <option>
                  General
                </option>

                <option>
                  Students
                </option>

                <option>
                  Developers
                </option>

                <option>
                  Business Professionals
                </option>

                <option>
                  Beginners
                </option>

              </select>

            </div>


          </div>


          {/* BUTTON */}

          <button
            onClick={createBlogPlan}
            disabled={loading}
          >

            {loading
              ? "🔄 AI is researching..."
              : "🚀 Research & Create Blog Plan"
            }

          </button>


          {loading && (

            <p className="section-description">

              🔎 Searching the web and analyzing
              your topic with Llama 3.2...

            </p>

          )}


          {error && (

            <p className="error">
              {error}
            </p>

          )}

        </section>


        {/* ===================================================
            AI RESULTS
        ==================================================== */}

        {result && (

          <section className="results">


            <h2>
              ✨ AI Results
            </h2>


            {/* =================================================
                RESEARCH
            ================================================== */}

            <div className="result-card">

              <h3>
                🔎 Research Summary
              </h3>


              {result.research?.length > 0 ? (

                result.research.map(
                  (source, index) => (

                    <div
                      className="research-item"
                      key={index}
                    >

                      <h4>
                        {source.title ||
                          source.source ||
                          "Web Research"
                        }
                      </h4>

                      <p>
                        {source.summary}
                      </p>

                    </div>

                  )
                )

              ) : (

                <p>
                  Web research was analyzed by BlogPulse AI.
                </p>

              )}

            </div>


            {/* =================================================
                RECOMMENDED TOPICS
            ================================================== */}

            <div className="result-card">

              <h3>
                💡 Recommended Blog Topics
              </h3>


              <div className="topic-grid">


                {result.recommended_topics?.map(
                  (item, index) => (

                    <div
                      className="topic-card"
                      key={index}
                    >

                      <div className="topic-rank">
                        #{index + 1}
                      </div>


                      <h4>
                        {item.title}
                      </h4>


                      <p>
                        Trend Score:{" "}
                        <strong>
                          {item.score}
                        </strong>
                      </p>


                      <p>
                        Sentiment:{" "}
                        <strong>
                          {item.sentiment}
                        </strong>
                      </p>


                      <span>
                        {item.trend}
                      </span>

                    </div>

                  )
                )}

              </div>

            </div>


            {/* =================================================
                BLOG STRATEGY
            ================================================== */}

            <div className="result-card">

              <h3>
                📝 Generated Blog Strategy
              </h3>


              <div className="blog-plan">


                {/* TITLE */}

                <h2>
                  {result.blog_plan?.title}
                </h2>


                {/* HOOK / INTRODUCTION */}

                <div className="plan-section">

                  <h4>
                    🎯 Introduction
                  </h4>

                  <p>
                    {result.blog_plan?.hook}
                  </p>

                </div>


                {/* AUDIENCE */}

                <div className="plan-section">

                  <h4>
                    👥 Audience
                  </h4>

                  <p>
                    {result.blog_plan?.audience}
                  </p>

                </div>


                {/* TONE */}

                <div className="plan-section">

                  <h4>
                    ✍️ Tone
                  </h4>

                  <p>
                    {result.blog_plan?.tone}
                  </p>

                </div>


                {/* OUTLINE */}

                <div className="plan-section">

                  <h4>
                    📚 Key Points to Cover
                  </h4>


                  {result.blog_plan?.outline?.length > 0 ? (

                    <ol>

                      {result.blog_plan.outline.map(
                        (section, index) => (

                          <li key={index}>
                            {section}
                          </li>

                        )
                      )}

                    </ol>

                  ) : (

                    <p>
                      No outline generated.
                    </p>

                  )}

                </div>


                {/* VISUALS */}

                <div className="plan-section">

                  <h4>
                    🖼️ Suggested Visuals
                  </h4>


                  {result.blog_plan?.visuals?.length > 0 ? (

                    <ul>

                      {result.blog_plan.visuals.map(
                        (visual, index) => (

                          <li key={index}>
                            {visual}
                          </li>

                        )
                      )}

                    </ul>

                  ) : (

                    <p>
                      No visual ideas generated.
                    </p>

                  )}

                </div>


                {/* HASHTAGS */}

                <div className="plan-section">

                  <h4>
                    #️⃣ Hashtags
                  </h4>


                  <div className="hashtags">

                    {result.blog_plan?.hashtags?.map(
                      (tag, index) => (

                        <span key={index}>
                          {tag}
                        </span>

                      )
                    )}

                  </div>

                </div>


                {/* PREDICTION */}

                <div className="prediction">


                  <div>

                    <small>
                      Predicted Engagement
                    </small>

                    <strong>
                      {result.blog_plan?.predicted_engagement ?? 0}%
                    </strong>

                  </div>


                  <div>

                    <small>
                      Best Publishing Time
                    </small>

                    <strong>
                      {result.blog_plan?.recommended_publish_time ||
                        result.blog_plan?.best_time ||
                        "See AI recommendation"
                      }
                    </strong>

                  </div>


                </div>


              </div>

            </div>


            {/* =================================================
                RAW AI RESPONSE
            ================================================== */}

            <div className="result-card">

              <h3>
                🧠 AI Analysis
              </h3>


              <div className="plan-section">

                <p
                  style={{
                    whiteSpace: "pre-wrap"
                  }}
                >
                  {result.langflow_response}
                </p>

              </div>

            </div>


          </section>

        )}

      </main>


      {/* =====================================================
          FOOTER
      ====================================================== */}

      <footer>

        <p>
          BlogPulse AI • Agentic Content Intelligence Platform
        </p>

      </footer>

    </div>

  );
}

export default App;