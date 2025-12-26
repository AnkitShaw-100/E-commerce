import React from "react";
import Layout from "../components/Layout/Layout";

const ShippingPolicy = () => {
  return (
    <Layout>
      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row gap-8 min-h-[600px]">
          <main className="flex-1">
            <div className="bg-white rounded-xl shadow-xl p-8">
              <div className="flex items-center gap-4 mb-6">
                <div>
                  <h1 className="text-3xl font-bold text-gray-900 mb-2">
                    Shipping Policy
                  </h1>
                  <p className="text-lg text-gray-700">
                    Fast, reliable shipping with clear timelines and tracking.
                  </p>
                </div>
              </div>

              <section className="prose max-w-none text-gray-700 space-y-6">
                <div>
                  <h2 className="text-lg font-semibold text-gray-800">
                    Processing Times
                  </h2>
                  <p>
                    Orders are processed within 1–2 business days. During sale
                    periods or peak seasons, processing may take an additional
                    1–2 days.
                  </p>
                </div>

                <div>
                  <h2 className="text-lg font-semibold text-gray-800">
                    Domestic Shipping
                  </h2>
                  <p>
                    We offer standard and expedited options. Standard shipping
                    typically arrives within 3–7 business days; expedited
                    shipping arrives within 1–3 business days depending on your
                    location.
                  </p>
                </div>

                <div>
                  <h2 className="text-lg font-semibold text-gray-800">
                    Tracking
                  </h2>
                  <p>
                    Once your order ships, you will receive a tracking number by
                    email. Use the carrier tracking to follow the package to
                    delivery. If tracking is not updating, contact support and
                    we'll assist.
                  </p>
                </div>

                <div>
                  <h2 className="text-lg font-semibold text-gray-800">
                    Damaged or Lost Packages
                  </h2>
                  <p>
                    If your package arrives damaged or is lost in transit,
                    contact us within 7 days of expected delivery. Provide
                    photos and your order number so we can speed up the claim
                    process with the carrier.
                  </p>
                </div>

                <div>
                  <h2 className="text-lg font-semibold text-gray-800">
                    Address Changes
                  </h2>
                  <p>
                    Please confirm your shipping address at checkout. If you
                    need to change the address after placing an order, contact
                    support immediately — changes may not be possible after the
                    order has shipped.
                  </p>
                </div>
              </section>
            </div>
          </main>

          <aside className="w-full lg:w-96">
            <div className="rounded-xl p-6 shadow-xl flex flex-col gap-6 h-full">
              <div className="flex items-start gap-4">
                <div>
                  <h3 className="text-3xl font-bold text-gray-800 mb-2">
                    Shipping Options
                  </h3>
                  <p className="text-lg text-gray-500">
                    Standard, Expedited, Overnight (where available)
                  </p>
                </div>
              </div>

              <div className="border rounded-md p-3 bg-white">
                <h4 className="text-lg font-semibold text-gray-700">
                  Quick Facts
                </h4>
                <ul className="mt-2 text-base text-gray-600 space-y-2">
                  <li>- Processing: 1–2 business days</li>
                  <li>- Domestic: 3–7 business days </li>
                  <li>- Expedited: 1–3 business days</li>
                </ul>
              </div>

              <div className="mt-auto">
                <a
                  href="/contact"
                  className="block w-full text-center bg-black hover:bg-gray-900 text-white py-3 rounded-lg font-medium"
                >
                  Contact Support
                </a>
                <a
                  href="mailto:ankitshaw6933@gmail.com"
                  className="block w-full text-center mt-3 text-base text-gray-600"
                >
                  ankitshaw6933@gmail.com
                </a>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </Layout>
  );
};

export default ShippingPolicy;
