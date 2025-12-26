import React from "react";
import Layout from "../components/Layout/Layout.jsx";

const ReturnRefund = () => {
  return (
    <Layout>
      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row gap-8 min-h-[600px]">
          <main className="flex-1">
            <div className="bg-white rounded-xl shadow-xl p-8">
              <div className="flex items-center gap-4 mb-6">
                <div>
                  <h1 className="text-3xl font-bold text-gray-900 mb-2">
                    Return & Refund Policy
                  </h1>
                  <p className="text-lg text-gray-700">
                    Clear, fair, and easy-to-follow steps for returns and
                    refunds.
                  </p>
                </div>
              </div>

              <section className="prose max-w-none text-gray-700 space-y-6">
                <div>
                  <h2 className="text-lg font-semibold text-gray-800">
                    Eligibility for Returns
                  </h2>
                  <ul className="list-disc ml-5">
                    <li>
                      Products must be returned within 14 days of delivery
                      unless otherwise stated.
                    </li>
                    <li>
                      Items should be unused, in original packaging, and with
                      all tags attached.
                    </li>
                    <li>
                      Certain items (clearance, digital goods, personal care)
                      may not be returnable.
                    </li>
                  </ul>
                </div>

                <div>
                  <h2 className="text-lg font-semibold text-gray-800">
                    How to Request a Return
                  </h2>
                  <p>
                    Start a return by contacting our support team with your
                    order number and reason for return. We will provide a
                    prepaid return label when applicable and instructions for
                    packaging the item.
                  </p>
                </div>

                <div>
                  <h2 className="text-lg font-semibold text-gray-800">
                    Refund Process
                  </h2>
                  <p>
                    Once we receive and inspect the returned item, refunds will
                    be processed within 3–7 business days to the original
                    payment method. Shipping charges are refundable only when
                    the return is due to our error.
                  </p>
                </div>

                <div>
                  <h2 className="text-lg font-semibold text-gray-800">
                    Exchanges
                  </h2>
                  <p>
                    If you prefer an exchange, let us know the replacement
                    product and size/color. Exchanges are subject to
                    availability and may take additional processing time.
                  </p>
                </div>

                <div>
                  <h2 className="text-lg font-semibold text-gray-800">
                    Non-returnable Items
                  </h2>
                  <p>
                    Perishable goods, intimate items, and items marked
                    non-returnable cannot be accepted.
                  </p>
                </div>

                <div>
                  <h2 className="text-lg font-semibold text-gray-800">
                    Questions?
                  </h2>
                  <p>
                    If you have any questions about returns or refunds, our
                    support team is happy to help — reach out via the contact
                    form or email and include your order number for faster
                    service.
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
                    <span className="inline-flex items-center gap-2">
                      Need help with a return?
                    </span>
                  </h3>
                  <p className="text-lg text-gray-500">
                    Our support team typically responds within 24 hours.
                  </p>
                </div>
              </div>

              <div className="border rounded-md p-3 bg-white">
                <h4 className="text-lg font-semibold text-gray-700">
                  Quick Facts
                </h4>
                <ul className="mt-2 text-base text-gray-600 space-y-2">
                  <li>- Return window: 14 days from delivery</li>
                  <li>- Refund processing: 3–7 business days after receipt</li>
                  <li>- Prepaid labels provided when eligible</li>
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

export default ReturnRefund;
