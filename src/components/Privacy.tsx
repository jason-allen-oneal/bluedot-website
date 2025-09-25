"use client";

export default function Privacy() {
  return (
    <div className="h-full overflow-auto p-6 text-slate-100">
      <div className="max-w-4xl mx-auto">
        <header className="mb-8">
          <h1 className="text-3xl font-bold mb-4 text-cyan-200">Privacy Policy</h1>
          <p className="text-slate-400">
            Last updated: {new Date().toLocaleDateString('en-US', { 
              year: 'numeric', 
              month: 'long', 
              day: 'numeric' 
            })}
          </p>
        </header>

        <div className="space-y-8">
          <section>
            <h2 className="text-2xl font-semibold mb-4 text-cyan-300">Introduction</h2>
            <p className="mb-4 text-slate-300 leading-relaxed">
              BlueDot (&ldquo;we,&rdquo; &ldquo;our,&rdquo; or &ldquo;us&rdquo;) is committed to protecting your privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website bluedot.it.com (the &ldquo;Service&rdquo;).
            </p>
            <p className="text-slate-300 leading-relaxed">
              By using our Service, you agree to the collection and use of information in accordance with this policy.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4 text-cyan-300">Information We Collect</h2>
            
            <h3 className="text-xl font-medium mb-3 text-cyan-400">Personal Information</h3>
            <p className="mb-4 text-slate-300 leading-relaxed">
              When you interact with our Service, we may collect personal information that you voluntarily provide, including:
            </p>
            <ul className="list-disc pl-6 mb-6 space-y-2 text-slate-300">
              <li>Name and email address (when leaving comments)</li>
              <li>Authentication information (when accessing admin features)</li>
              <li>Communication preferences</li>
              <li>Any other information you choose to provide</li>
            </ul>

            <h3 className="text-xl font-medium mb-3 text-cyan-400">Automatically Collected Information</h3>
            <p className="mb-4 text-slate-300 leading-relaxed">
              We automatically collect certain information when you visit our Service:
            </p>
            <ul className="list-disc pl-6 mb-6 space-y-2 text-slate-300">
              <li>IP address and device information</li>
              <li>Browser type and version</li>
              <li>Operating system</li>
              <li>Pages visited and time spent on pages</li>
              <li>Referring website</li>
              <li>Usage patterns and preferences</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4 text-cyan-300">How We Use Your Information</h2>
            <p className="mb-4 text-slate-300 leading-relaxed">We use the collected information for various purposes:</p>
            <ul className="list-disc pl-6 mb-6 space-y-2 text-slate-300">
              <li>To provide and maintain our Service</li>
              <li>To notify you about changes to our Service</li>
              <li>To allow you to participate in interactive features</li>
              <li>To provide customer support</li>
              <li>To gather analysis or valuable information to improve our Service</li>
              <li>To monitor the usage of our Service</li>
              <li>To detect, prevent and address technical issues</li>
              <li>To fulfill any other purpose for which you provide it</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4 text-cyan-300">Information Sharing and Disclosure</h2>
            <p className="mb-4 text-slate-300 leading-relaxed">
              We do not sell, trade, or otherwise transfer your personal information to third parties without your consent, except in the following circumstances:
            </p>
            <ul className="list-disc pl-6 mb-6 space-y-2 text-slate-300">
              <li><strong>Service Providers:</strong> We may share information with trusted third-party service providers who assist us in operating our website and providing services</li>
              <li><strong>Legal Requirements:</strong> We may disclose information if required by law or in response to valid legal requests</li>
              <li><strong>Protection of Rights:</strong> We may disclose information to protect our rights, property, or safety, or that of our users</li>
              <li><strong>Business Transfers:</strong> In the event of a merger, acquisition, or sale of assets, your information may be transferred</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4 text-cyan-300">Data Security</h2>
            <p className="mb-4 text-slate-300 leading-relaxed">
              We implement appropriate security measures to protect your personal information against unauthorized access, alteration, disclosure, or destruction. However, no method of transmission over the internet or electronic storage is 100% secure.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4 text-cyan-300">Cookies and Tracking Technologies</h2>
            <p className="mb-4 text-slate-300 leading-relaxed">
              We use cookies and similar tracking technologies to track activity on our Service and hold certain information. You can instruct your browser to refuse all cookies or to indicate when a cookie is being sent.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4 text-cyan-300">Your Rights</h2>
            <p className="mb-4 text-slate-300 leading-relaxed">Depending on your location, you may have certain rights regarding your personal information:</p>
            <ul className="list-disc pl-6 mb-6 space-y-2 text-slate-300">
              <li>The right to access and receive a copy of your personal information</li>
              <li>The right to rectify or update your personal information</li>
              <li>The right to delete your personal information</li>
              <li>The right to restrict processing of your personal information</li>
              <li>The right to data portability</li>
              <li>The right to object to processing of your personal information</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4 text-cyan-300">Children&rsquo;s Privacy</h2>
            <p className="mb-4 text-slate-300 leading-relaxed">
              Our Service does not address anyone under the age of 13. We do not knowingly collect personal information from children under 13. If you are a parent or guardian and you are aware that your child has provided us with personal information, please contact us.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4 text-cyan-300">Changes to This Privacy Policy</h2>
            <p className="mb-4 text-slate-300 leading-relaxed">
              We may update our Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page and updating the &ldquo;Last updated&rdquo; date.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4 text-cyan-300">Contact Us</h2>
            <p className="mb-4 text-slate-300 leading-relaxed">
              If you have any questions about this Privacy Policy, please contact us:
            </p>
            <ul className="list-none space-y-2 text-slate-300">
              <li>Email: <a href="mailto:admin@bluedot.it.com" className="text-cyan-400 hover:underline">admin@bluedot.it.com</a></li>
              <li>Website: <a href="https://bluedot.it.com" className="text-cyan-400 hover:underline">bluedot.it.com</a></li>
            </ul>
          </section>
        </div>
      </div>
    </div>
  );
}
