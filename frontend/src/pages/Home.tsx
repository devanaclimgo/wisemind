import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

export default function Home() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-lavender-50 text-gray-800">

      <section className="text-center py-24 px-6">
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-4xl md:text-5xl font-bold text-lavender-600"
        >
          Track your basics. Stabilize your mind.
        </motion.h1>

        <p className="mt-6 max-w-xl mx-auto text-gray-600">
          A weekly tracker inspired by Marsha Linehan’s PLEASE skills.
          Small daily habits that reduce emotional vulnerability.
        </p>

        <div className="mt-8 flex justify-center gap-4">
          <button
            onClick={() => navigate("/signup")}
            className="bg-lavender-500 text-white px-6 py-3 rounded-2xl hover:bg-lavender-600 transition"
          >
            Get Started
          </button>

          <button
            onClick={() => navigate("/login")}
            className="border border-lavender-400 text-lavender-600 px-6 py-3 rounded-2xl hover:bg-lavender-50 transition"
          >
            Login
          </button>
        </div>
      </section>

      <section className="py-20 px-6 max-w-4xl mx-auto">
        <h2 className="text-2xl font-semibold text-center text-lavender-600 mb-8">
          What is PLEASE?
        </h2>

        <div className="grid md:grid-cols-2 gap-6">
          {[
            "Treat Physical Illness",
            "Balanced Eating",
            "Avoid Mood-Altering Substances",
            "Balanced Sleep",
            "Exercise",
          ].map((item) => (
            <div
              key={item}
              className="bg-white rounded-2xl shadow-soft p-6"
            >
              <p className="font-medium text-gray-700">{item}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="py-20 px-6 bg-lavender-50">
        <h2 className="text-2xl font-semibold text-center text-lavender-600 mb-10">
          How it works
        </h2>

        <div className="max-w-4xl mx-auto grid md:grid-cols-3 gap-8 text-center">
          <div>
            <h3 className="font-semibold mb-2">1. Create a week</h3>
            <p className="text-gray-600 text-sm">
              Start a new weekly cycle anytime.
            </p>
          </div>

          <div>
            <h3 className="font-semibold mb-2">2. Fill your days</h3>
            <p className="text-gray-600 text-sm">
              Track sleep, food, exercise, health and more.
            </p>
          </div>

          <div>
            <h3 className="font-semibold mb-2">3. See your progress</h3>
            <p className="text-gray-600 text-sm">
              Visual feedback to build consistency.
            </p>
          </div>
        </div>
      </section>

      <section className="text-center py-24 px-6">
        <h2 className="text-3xl font-bold text-lavender-600">
          Start building stability today.
        </h2>

        <button
          onClick={() => navigate("/signup")}
          className="mt-8 bg-lavender-500 text-white px-8 py-4 rounded-2xl hover:bg-lavender-600 transition"
        >
          Create your account
        </button>
      </section>
    </div>
  );
}