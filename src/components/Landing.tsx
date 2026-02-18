import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  Brain,
  Bookmark,
  Search,
  Zap,
  Tag,
  Layout,
  Menu,
  X,
} from "lucide-react";
import api from "../api/axiosInstance";
import dashboard from "../../assets/dashboard.png"; // Replace with your actual image path
import { BACKEND_URL } from "../config";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();
  useEffect(() => {
    const verifyToken = async () => {
      try {
        await api.get(`${BACKEND_URL}/api/v1/auth/verifylogin`, {
          withCredentials: true,
        });
        navigate("/dashboard");
      } catch {
        navigate("/auth");
      }
    };

    verifyToken();
  }, [navigate]);
  return (
    <header className="sticky top-0 z-50 w-full border-b border-gray-200 bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/80">
      <nav className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-2">
          <Brain className="h-7 w-7 text-indigo-600" />
          <span className="text-xl font-semibold text-gray-900">
            Mind Space
          </span>
        </div>

        {/* Desktop Navigation */}
        <div className="hidden items-center gap-8 md:flex">
          <a
            href="#features"
            className="text-sm font-medium text-gray-600 transition-colors hover:text-gray-900"
          >
            Features
          </a>
          <a
            href="#how-it-works"
            className="text-sm font-medium text-gray-600 transition-colors hover:text-gray-900"
          >
            How It Works
          </a>

          <a
            href="/auth"
            className="text-sm font-medium text-gray-600 transition-colors hover:text-gray-900"
          >
            Sign in
          </a>
          <button className="rounded-lg bg-indigo-600 px-4 py-2 text-sm font-medium text-white transition-all hover:bg-indigo-700 hover:shadow-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2">
            Get Started
          </button>
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="md:hidden rounded-lg p-2 text-gray-600 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          aria-label="Toggle menu"
        >
          {isMenuOpen ? (
            <X className="h-6 w-6" />
          ) : (
            <Menu className="h-6 w-6" />
          )}
        </button>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="absolute left-0 right-0 top-16 border-b border-gray-200 bg-white px-4 py-4 shadow-lg md:hidden">
            <div className="flex flex-col gap-4">
              <a
                href="#features"
                className="text-sm font-medium text-gray-600 hover:text-gray-900"
              >
                Features
              </a>
              <a
                href="#how-it-works"
                className="text-sm font-medium text-gray-600 hover:text-gray-900"
              >
                How It Works
              </a>
              <a
                href="#"
                className="text-sm font-medium text-gray-600 hover:text-gray-900"
              >
                Docs
              </a>
              <a
                href="#"
                className="text-sm font-medium text-gray-600 hover:text-gray-900"
              >
                Sign in
              </a>
              <button
                onClick={() => {
                  window.location.href = "/dashboard";
                }}
                className="rounded-lg bg-indigo-600 px-4 py-2 text-sm font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              >
                Get Started
              </button>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
};

const Hero = () => {
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-gray-50 to-white px-4 py-20 sm:px-6 sm:py-28 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="grid gap-10 lg:grid-cols-2 lg:gap-16">
          {/* Left Column - Content */}
          <div className="flex flex-col justify-center">
            <h1 className="text-3xl font-bold leading-tight tracking-tight text-gray-900 sm:text-5xl lg:text-6xl">
              Think less.
              <br />
              <span className="text-indigo-600">Remember more.</span>
            </h1>
            <p className="mt-6 text-lg leading-relaxed text-gray-600 sm:text-xl">
              Mind Space is your personal knowledge manager. Capture links,
              videos, tweets, and notes in seconds. Find them instantly when you
              need them.
            </p>
            <div className="mt-8 flex flex-col gap-4 sm:flex-row">
              <button
                onClick={() => {
                  window.location.href = "/auth";
                }}
                className="rounded-lg bg-indigo-600 px-6 py-3 text-base font-medium text-white shadow-md transition-all hover:bg-indigo-700 hover:shadow-lg hover:-translate-y-0.5 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
              >
                Get Started Free
              </button>
              <button
                onClick={() => {
                  window.location.href = "/auth";
                }}
                className="rounded-lg border border-gray-300 bg-white px-6 py-3 text-base font-medium text-gray-700 transition-all hover:bg-gray-50 hover:border-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
              >
                Open App
              </button>
            </div>
          </div>

          {/* Right Column - App Preview */}
          <div className="flex items-center justify-center">
            <div className="relative w-full max-w-xl">
              {/* Main Dashboard Screenshot */}
              <div className="rounded-2xl border border-gray-200 bg-white shadow-2xl overflow-hidden">
                {/* Browser Chrome */}
                <div className="flex items-center gap-2 border-b border-gray-200 bg-gray-50 px-4 py-3">
                  <div className="h-3 w-3 rounded-full bg-red-400"></div>
                  <div className="h-3 w-3 rounded-full bg-yellow-400"></div>
                  <div className="h-3 w-3 rounded-full bg-green-400"></div>
                </div>

                <img
                  src={dashboard}
                  alt="Mind Space dashboard showing saved links and notes"
                  className="w-full h-auto"
                />
              </div>
              {/* Floating Card - Optional, remove if not needed */}
              <div className="absolute -right-4 top-12 w-48 rounded-lg border border-gray-200 bg-white shadow-xl overflow-hidden">
                <img
                  src={dashboard}
                  alt="Mind Space detail view"
                  className="w-full h-auto"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

const Features = () => {
  const features = [
    {
      icon: <Bookmark className="h-6 w-6" />,
      title: "Save Anything",
      description:
        "Capture links, notes, videos, and tweets instantly from anywhere on the web.",
    },
    {
      icon: <Tag className="h-6 w-6" />,
      title: "Smart Organization",
      description:
        "Tag, filter, and categorize your content automatically with intelligent suggestions.",
    },
    {
      icon: <Search className="h-6 w-6" />,
      title: "Fast Recall",
      description:
        "Find anything in milliseconds with powerful search across all your saved content.",
    },
    {
      icon: <Layout className="h-6 w-6" />,
      title: "Clean Design",
      description:
        "A beautiful, distraction-free interface built for focus and clarity.",
    },
  ];

  return (
    <section
      id="features"
      className="bg-white px-4 py-20 sm:px-6 sm:py-28 lg:px-8"
    >
      <div className="mx-auto max-w-7xl">
        <div className="text-center">
          <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            Everything you need to stay organized
          </h2>
          <p className="mt-4 text-lg text-gray-600">
            Built for people who value their ideas and want to keep them
            accessible.
          </p>
        </div>

        <div className="mt-16 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {features.map((feature, index) => (
            <div
              key={index}
              className="group rounded-2xl border border-gray-200 bg-white p-6 transition-all hover:border-indigo-200 hover:shadow-lg hover:-translate-y-1"
            >
              <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-indigo-100 text-indigo-600 transition-colors group-hover:bg-indigo-600 group-hover:text-white">
                {feature.icon}
              </div>
              <h3 className="mt-4 text-lg font-semibold text-gray-900">
                {feature.title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-gray-600">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
const HowItWorks = () => {
  const steps = [
    {
      icon: <Zap className="h-8 w-8" />,
      title: "Save",
      description:
        "Capture anything with our browser extension, mobile app, or email forwarding.",
    },
    {
      icon: <Tag className="h-8 w-8" />,
      title: "Organize",
      description:
        "Let AI suggest tags and categories, or create your own custom organization system.",
    },
    {
      icon: <Search className="h-8 w-8" />,
      title: "Recall",
      description:
        "Search instantly across everything you've saved and rediscover your best ideas.",
    },
  ];

  return (
    <section
      id="how-it-works"
      className="bg-gradient-to-b from-gray-50 to-white px-4 py-20 sm:px-6 sm:py-28 lg:px-8"
    >
      <div className="mx-auto max-w-5xl">
        <div className="text-center">
          <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            How it works
          </h2>
          <p className="mt-4 text-lg text-gray-600">
            Three simple steps to never lose an idea again.
          </p>
        </div>

        <div className="mt-16 grid gap-12 md:grid-cols-3">
          {steps.map((step, index) => (
            <div key={index} className="relative text-center">
              <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-indigo-600 text-white shadow-lg">
                {step.icon}
              </div>
              <h3 className="mt-6 text-xl font-semibold text-gray-900">
                {step.title}
              </h3>
              <p className="mt-3 text-base leading-relaxed text-gray-600">
                {step.description}
              </p>
              {index < steps.length - 1 && (
                <div
                  className="absolute left-1/2 top-8 hidden h-0.5 w-full bg-gray-200 md:block"
                  style={{ transform: "translateX(50%)" }}
                ></div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

const Footer = () => {
  return (
    <footer className="bg-white px-4 py-20 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="text-center">
          <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            Your digital memory that never forgets.
          </h2>
          <p className="mt-4 text-lg text-gray-600">
            Join thousands of people who have organized their digital life with
            Mind Space.
          </p>
          <div className="mt-8">
            <button className="rounded-lg bg-indigo-600 px-8 py-3 text-base font-medium text-white shadow-md transition-all hover:bg-indigo-700 hover:shadow-lg hover:-translate-y-0.5 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2">
              Get Started Free
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};

const Landing = () => {
  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      <main>
        <Hero />
        <Features />
        <HowItWorks />
        <Footer />
      </main>
    </div>
  );
};

export default Landing;
