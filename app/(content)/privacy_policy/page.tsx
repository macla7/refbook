"use client";

import Image from "next/image";
import background from "assets/rangobg3.svg";

export default function privacyPolicyPage() {
  return (
    <main className="max-w-3xl mx-auto px-4 py-12 text-gray-800">
      <h1 className="text-3xl font-bold mb-6">Privacy Policy</h1>

      <p className="text-sm text-gray-500 mb-10">
        Effective Date: [Insert Date] • Last Updated: [Insert Date]
      </p>

      <section className="space-y-6">
        <p>
          [Your App Name] ("we", "our", or "us") is committed to protecting your
          privacy. This Privacy Policy explains how we collect, use, disclose,
          and safeguard your information when you use our web application (the
          "Service").
        </p>
        <p>
          By using the Service, you agree to the collection and use of
          information in accordance with this Privacy Policy.
        </p>

        <h2 className="text-xl font-semibold mt-8">
          1. Information We Collect
        </h2>
        <p>
          <strong>a. Personal Information</strong>
          <br />
          We may collect your name, email address, profile picture, and any
          content you post (e.g., job references).
        </p>
        <p>
          <strong>b. Public Profile and References</strong>
          <br />
          Your profile and posted references may be publicly viewable unless
          otherwise configured.
        </p>
        <p>
          <strong>c. Usage Data</strong>
          <br />
          We collect technical data such as browser type, IP address, and usage
          patterns.
        </p>

        <h2 className="text-xl font-semibold mt-8">
          2. How We Use Your Information
        </h2>
        <p>
          We use your information to provide the Service, operate your profile,
          communicate with you, and improve the platform.
        </p>

        <h2 className="text-xl font-semibold mt-8">
          3. Sharing and Disclosure
        </h2>
        <div>
          We do not sell your data. We may share it:
          <ul className="list-disc ml-6 mt-2 space-y-1">
            <li>With your consent (e.g., public references)</li>
            <li>With service providers (e.g., hosting or analytics)</li>
            <li>To comply with legal obligations</li>
          </ul>
        </div>

        <h2 className="text-xl font-semibold mt-8">4. Data Retention</h2>
        <p>
          We retain data as long as needed to operate the Service. You may
          request account deletion by contacting us.
        </p>

        <h2 className="text-xl font-semibold mt-8">5. Your Rights</h2>
        <p>
          You may have rights to access, update, delete, or restrict use of your
          data. Contact us at [Your Contact Email].
        </p>

        <h2 className="text-xl font-semibold mt-8">6. Security</h2>
        <p>
          We use industry-standard measures to protect your data, but no system
          is completely secure.
        </p>

        <h2 className="text-xl font-semibold mt-8">7. Children’s Privacy</h2>
        <p>
          We do not knowingly collect data from children under 13. Our Service
          is not intended for children.
        </p>

        <h2 className="text-xl font-semibold mt-8">
          8. Changes to This Policy
        </h2>
        <p>
          We may update this Privacy Policy. The updated version will include a
          new “Last Updated” date.
        </p>

        <h2 className="text-xl font-semibold mt-8">9. Contact Us</h2>
        <p>If you have questions or concerns, contact us at:</p>
        <ul className="list-none ml-0 mt-2 space-y-1">
          <li>
            <strong>Email:</strong> [Your Contact Email]
          </li>
          <li>
            <strong>Address:</strong> [Your Company Address]
          </li>
        </ul>
      </section>
    </main>
  );
}
