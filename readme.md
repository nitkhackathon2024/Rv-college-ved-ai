video demo:
https://drive.google.com/drive/folders/14ofC1XaanDsj6u5zHgaz-NQS010pRUvZ?usp=sharing

VED- Versatile enhanced distiller AI 
An Unified Knowledge Distiller and Peer Learning Platform

an app that enables students to efficiently organize their study materials and connect with peers for collaborative learning, combining personalized knowledge graphs and peer-matching based on skills.

 Problem Statement: Knowledge Distiller App 3.1 and  Intelligent Peer Learning Platform 3.2

## Overview
Ved-AI is a personalized assistant and second brain that aims to revolutionize the way students learn and understand concepts. The platform is designed to provide reliable information, understand individual learning styles, and offer personalized learning experiences.

ved i summed up as AI-powered learning companion with an AI-powered search engine that goes deep into the internet to find answers.Inspired by AI, it's an powerful option that not just searches the web but understands your questions. It uses advanced machine learning algorithms like similarity searching and embeddings to refine results and provides clear answers with sources cited.

Using SearxNG to stay current, ved ensures you always get the most up-to-date information without compromising your privacy.






 ![image](https://github.com/user-attachments/assets/2f111c2d-f95e-46c4-ab77-c83bb1b62724)


 ![image](https://github.com/user-attachments/assets/6624c66b-b8db-4a97-8028-83cc543ba09f)

![image](https://github.com/user-attachments/assets/483b4500-0b26-4996-afcb-2f5329c0c7c5)

<img width="1204" alt="image" src="https://github.com/user-attachments/assets/380521f3-17fe-4094-bc6d-69a0bb5861ce">


## 🔍 How It Works

1. **Create Account** 📝
   - Sign up and receive 5 free credits

2. **Input a Prompt** 💡
   - Enter a topic or subject you want to explore

3. **AI Course Generation** 🤖
   - Our AI processes your prompt
   - Generates a structured course outline
   - Creates content modules and interactive elements

## 🛠️ Tech Stack

| Category | Technologies |
|----------|--------------|
| Frontend & Full Stack | Next.js |
| Backend | Prisma ORM, Redis |
| Authentication | Nuth Auth |
| Storage | Pinecone (vector storage), PostgreSQL |
| Course Generation | Gemini API (LLM) |
| realtime web data | Searxng |
| knowledge graph | Langraph and langchain |

## 🚀 Getting Started

1. Clone the repository:
    ```bash
    git clone https://github.com/jitanshuraut/Learn-AI-Studio.git
    cd your-repo/
    ```

2. Install dependencies:
    ```bash
    bun install
    ```

3. Set up the environment variables by creating a `.env` file and configuring the required variables.

4. Run the application:
    ```bash
    bun dev
    ```

5. Open your browser and navigate to:
    ```url
    http://localhost:3000
    ```

Follow the instructions on the page to complete the setup.

## Features

- **Local LLMs**: You can make use local LLMs such as Llama3 and Mixtral using Ollama.
- **Two Main Modes:**
  - **Copilot Mode:** (In development) Boosts search by generating different queries to find more relevant internet sources. Like normal search instead of just using the context by SearxNG, it visits the top matches and tries to find relevant sources to the user's query directly from the page.
  - **Normal Mode:** Processes your query and performs a web search.
- **Focus Modes:** Special modes to better answer specific types of questions. ved currently has 6 focus modes:
  - **All Mode:** Searches the entire web to find the best results.
  - **Writing Assistant Mode:** Helpful for writing tasks that does not require searching the web.
  - **Academic Search Mode:** Finds articles and papers, ideal for academic research.
  - **YouTube Search Mode:** Finds YouTube videos based on the search query.
  - ** Mode:** Answers queries that need calculations or data analysis using Wolfram Alpha.
  - **Reddit Search Mode:** Searches Reddit for discussions and opinions related to the query.
- **Current Information:** Some search tools might give you outdated info because they use data from crawling bots and convert them into embeddings and store them in a index. Unlike them, ved uses SearxNG, a metasearch engine to get the results and rerank and get the most relevant source out of it, ensuring you always get the latest information without the overhead of daily data updates.
- **API**: Integrate ved into your existing applications and make use of its capibilities.
