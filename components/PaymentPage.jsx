"use client";

export default function PaymentPage({ creator }) {
  return (
    <div className="p-6 text-center">
      <h2 className="text-xl font-bold mb-2">
        Support {creator || "Creator"}
      </h2>

      <p className="text-gray-600 mb-4">
        Make a small contribution to support this creator.
      </p>

      <button
        className="px-6 py-2 bg-black text-white rounded hover:bg-gray-800"
        onClick={() => alert("Razorpay checkout will open here")}
      >
        Buy Me a Biryani 🍛
      </button>
    </div>
  );
}
