# MyIkigai — Your Life's Operating System

**Decode Your Soul. Architect Your Future.**

A 24-hour Hackathon project built by **Vu Thanh Dat and Dam Quang Giang** using Next.js, Supabase, and TinyFish AI.

---

## 📖 The Project Story

At 18, I was a lost high school student. I spent two years at the Vietnam Aviation Academy before realizing I was walking someone else's path. That detour led me to a deep journey of self-discovery, eventually choosing to become a Software Engineer.

Now, at 25, I often wonder: *If I had a roadmap back then—one that understood my unique energy and personality—how much more brightly could I have shone?* Thousands of 17 and 18-year-olds are standing exactly where I was, paralyzed by the fog of choice.

**MyIkigai is the compass I wish I had—because choice is just as important as effort.**

---

## 🌊 Core User Flow (The Journey)

The application is engineered to minimize friction and maximize emotional resonance:

1. **The Landing Page:** A "Modern Mystic" entry point designed for high conversion, inviting users to begin their self-discovery.
2. **Sacred Onboarding:** Users provide essential bio-data (Name, DOB, Time, and Location) to ensure high-precision astrological mapping.
3. **Adaptive Identity Logic (MBTI):**
   - *The Skip-track:* Users who know their type can select it directly.
   - *The Fast-track:* A specialized 10-question "Vibe-Check" slider test powered by AI to capture the user's psychological essence in seconds.
4. **The Alchemy Engine:** Data is processed server-side via TinyFish AI, synthesizing Psychology (MBTI) with Energetic patterns (Astrology) and storing the persona in PostgreSQL (Supabase).
5. **The Reveal:** A "Decoding Destiny" transition screen that builds anticipation through healing-themed animations.
6. **Interactive Roadmap:** A visual, scrollable timeline from the present to 5 years in the future, complete with "Destiny Card" generation for social sharing.

---

## 🛠 Tech Stack

| Layer | Technology |
|---|---|
| **Frontend** | Next.js 14 (App Router), TypeScript, Tailwind CSS |
| **Animations** | Framer Motion (for a "Healing" and fluid UI/UX) |
| **Backend & Database** | Supabase (Auth, PostgreSQL, Edge Functions) |
| **AI Architect** | [agent.tinyfish.ai](https://agent.tinyfish.ai) (Managing the "Soul-to-Logic" synthesis) |
| **Design Tools** | Google Stitch (UI generation), Figma, Canva |

---

## 📂 Project Structure

```
my-ikigai/
├── app/                # Next.js App Router (Pages & API Routes)
│   ├── (onboarding)/   # Multi-step profile builder logic
│   ├── (roadmap)/      # Interactive roadmap visualization
│   └── api/            # Server-side bridges for AI & DB
├── components/         # Atomic UI (Roadmap nodes, ShareCards, Glassmorphism elements)
├── lib/                # Shared utilities, Supabase config, & AI Prompt templates
├── public/             # Branding assets, "Healing" icons, and static images
└── types/              # TypeScript definitions for the Roadmap JSON schema
```

---

## 🚀 Getting Started

**Clone the Repository:**

```bash
git clone https://github.com/yourusername/my-ikigai.git
cd my-ikigai
```

**Install Dependencies:**

```bash
npm install
```

**Environment Variables:**

Create a `.env.local` file and add the following:

```
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_key
TINYFISH_API_KEY=your_tinyfish_key
```

**Launch the OS:**

```bash
npm run dev
```

---

## 🎯 Product Vision (What's Next?)

MyIkigai is more than a quiz; it is a **lifelong mentor**. Our next milestones include:

- **Daily Affirmations:** Personalized, AI-generated daily wisdom based on the user's specific roadmap.
- **B2B for Education:** Partnering with high schools to provide 10th-graders with early direction, preventing costly career detours.
- **Real-time Career Trends:** Integrating job market data to update roadmaps based on evolving industry demands.

The goal is to maximize the **Alignment Factor** (\(A\)):

\[
A = \int_{t_{0}}^{t_{n}} (Psychology \cdot Energy) \, dt
\]

---

> *"Don't just work hard—choose the right path so your effort shines the brightest."*
> — **Vu Thanh Dat, Dam Quang Giang**, Founders of MyIkigai
