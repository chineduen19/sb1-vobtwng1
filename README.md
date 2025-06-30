# 🛒 Hisnak Marketplace (Affiliate Networking & E-commerce Platform)

Welcome to the official repository of **Hisnak Marketplace** — a digital platform designed to empower users through affiliate networking, digital commerce, and income-generating products and services.

---

## 🚀 Project Vision

Hisnak is built to **lift millions out of poverty** by helping individuals learn, promote, and earn through digital products and affiliate systems. Combining e-commerce with a unique networking model, Hisnak provides tools for online success — especially in under-served regions.

---

## ✨ Key Features

- ✅ **Affiliate Networking System**  
  Promote and earn commissions through verified digital products and online services.

- 💳 **Integrated Checkout (Stripe)**  
  Secure, seamless payment experience using Stripe API.

- 🎓 **Digital Courses & Programs**  
  Sell and access high-impact programs like _The Income Generation System (TIGS)_.

- 🧠 **Client Onboarding & Dashboard**  
  Personalized user experiences for course access, affiliate stats, and earnings.

- 🌍 **Scalable E-commerce Architecture**  
  Built on modern, scalable frameworks (Next.js, Vite, Tailwind, etc.)

---

## 🧱 Tech Stack

| Layer        | Tech Used                            |
|--------------|--------------------------------------|
| Frontend     | Next.js 13 (App Router) + React + TypeScript |
| Styling      | Tailwind CSS + shadcn/ui             |
| Payment      | Stripe Checkout Integration          |
| Deployment   | Vercel + GitHub                      |
| Hosting      | AWS Amplify (experimental)           |

---

## 📁 Project Structure

```bash
.
├── app/                        # Next.js App Router
│   ├── layout.tsx
│   ├── page.tsx               # Home page
│   ├── products/              # Product listings
│   └── checkout/[productId]/  # Checkout flow
├── components/
│   ├── layout/                # Header, Footer
│   ├── ui/                    # UI Components (shadcn/ui)
│   └── payment/stripe-checkout.tsx
├── public/                    # Static assets
├── .env.local                 # Environment variables
├── package.json
├── tsconfig.json
└── vite.config.ts             # (If Vite is integrated)
🔐 Environment Variables
Create a .env.local file in the root directory with the following:

env
Copy
Edit
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=your_stripe_public_key
STRIPE_SECRET_KEY=your_stripe_secret_key
NEXT_PUBLIC_API_URL=https://your-api-url.com
🛠️ Getting Started
bash
Copy
Edit
# 1. Clone the repository
git clone https://github.com/your-username/hisnakmarketplace1.git
cd hisnakmarketplace1

# 2. Install dependencies
npm install

# 3. Setup environment variables
cp .env.example .env.local
# Edit .env.local and fill in your keys

# 4. Run development server
npm run dev
📦 Deployment
Deployed automatically via Vercel. You can also integrate with:

🔁 Deploy Hooks

🔐 Custom Domains

🔗 AWS Amplify (optional hosting)

🔄 Stripe Webhooks (for payment confirmation)

🧑‍💻 Contributing
Fork this repo

Create a new branch (git checkout -b feature/my-feature)

Make your changes

Commit and push (git commit -m "Add my feature")

Create a Pull Request

📜 License
This project is licensed under the MIT License.
