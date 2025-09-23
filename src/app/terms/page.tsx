import type { Metadata } from "next";
import Background from "@/components/Background";
import Nav from "@/components/Nav";

export const metadata: Metadata = {
  title: "Terms of Service",
  description: "Terms of service for BlueDot - the rules and guidelines for using our website.",
  openGraph: {
    title: "Terms of Service | BlueDot",
    description: "Terms of service for BlueDot - the rules and guidelines for using our website.",
    url: "https://bluedot.it.com/terms",
  },
  twitter: {
    card: 'summary',
    title: "Terms of Service | BlueDot",
    description: "Terms of service for BlueDot - the rules and guidelines for using our website.",
  },
};

export default function TermsPage() {
  return (
    <div className="min-h-screen">
      <Background />
      <Nav />
      <div className="relative mx-auto max-w-[1100px] px-6 pt-28 pb-10 md:pt-36 md:pb-20">
        <div className="card p-8 md:p-12">
          <header className="mb-8">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">Terms of Service</h1>
            <p className="text-muted text-lg">
              Last updated: {new Date().toLocaleDateString('en-US', { 
                year: 'numeric', 
                month: 'long', 
                day: 'numeric' 
              })}
            </p>
          </header>

          <div className="prose prose-lg max-w-none">
            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4">Agreement to Terms</h2>
              <p className="mb-4">
                These Terms of Service (&ldquo;Terms&rdquo;) govern your use of the BlueDot website located at bluedot.it.com (the &ldquo;Service&rdquo;) operated by BlueDot (&ldquo;we,&rdquo; &ldquo;our,&rdquo; or &ldquo;us&rdquo;).
              </p>
              <p className="mb-4">
                By accessing or using the Service, you agree to be bound by these Terms. If you disagree with any part of these terms, then you may not access the Service.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4">Description of Service</h2>
              <p className="mb-4">
                BlueDot is a personal portfolio and blog website that provides:
              </p>
              <ul className="list-disc pl-6 mb-4 space-y-2">
                <li>Information about Jason O&rsquo;Neal&rsquo;s professional background and expertise</li>
                <li>Blog posts and articles about technology, security, and development</li>
                <li>Showcase of projects and work examples</li>
                <li>Contact information and professional networking opportunities</li>
                <li>Comment system for blog posts (for registered users)</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4">User Accounts</h2>
              <p className="mb-4">
                When you create an account with us, you must provide information that is accurate, complete, and current at all times. You are responsible for safeguarding the password and for all activities that occur under your account.
              </p>
              <p className="mb-4">
                You agree not to disclose your password to any third party and to take sole responsibility for any activities or actions under your account, whether or not you have authorized such activities or actions.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4">Acceptable Use</h2>
              <p className="mb-4">You agree not to use the Service to:</p>
              <ul className="list-disc pl-6 mb-4 space-y-2">
                <li>Violate any applicable laws or regulations</li>
                <li>Infringe upon the rights of others</li>
                <li>Post content that is defamatory, obscene, or offensive</li>
                <li>Attempt to gain unauthorized access to any part of the Service</li>
                <li>Interfere with or disrupt the Service or servers</li>
                <li>Use the Service for any commercial purpose without our express written consent</li>
                <li>Impersonate any person or entity</li>
                <li>Collect or store personal data about other users without their consent</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4">Content and Comments</h2>
              <p className="mb-4">
                Users may have the opportunity to post comments on blog posts. By posting content, you grant us a non-exclusive, worldwide, royalty-free license to use, reproduce, modify, and distribute your content on the Service.
              </p>
              <p className="mb-4">
                You are solely responsible for the content you post and represent that you have all necessary rights to grant us the license described above. We reserve the right to remove any content that violates these Terms or is otherwise objectionable.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4">Intellectual Property</h2>
              <p className="mb-4">
                The Service and its original content, features, and functionality are and will remain the exclusive property of BlueDot and its licensors. The Service is protected by copyright, trademark, and other laws.
              </p>
              <p className="mb-4">
                Our trademarks and trade dress may not be used in connection with any product or service without our prior written consent.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4">Privacy</h2>
              <p className="mb-4">
                Your privacy is important to us. Please review our Privacy Policy, which also governs your use of the Service, to understand our practices.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4">Links to Other Websites</h2>
              <p className="mb-4">
                Our Service may contain links to third-party websites or services that are not owned or controlled by BlueDot. We have no control over, and assume no responsibility for, the content, privacy policies, or practices of any third-party websites or services.
              </p>
              <p className="mb-4">
                You acknowledge and agree that BlueDot shall not be responsible or liable, directly or indirectly, for any damage or loss caused or alleged to be caused by or in connection with the use of or reliance on any such content, goods, or services available on or through any such websites or services.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4">Termination</h2>
              <p className="mb-4">
                We may terminate or suspend your account and bar access to the Service immediately, without prior notice or liability, under our sole discretion, for any reason whatsoever and without limitation, including but not limited to a breach of the Terms.
              </p>
              <p className="mb-4">
                If you wish to terminate your account, you may simply discontinue using the Service.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4">Limitation of Liability</h2>
              <p className="mb-4">
                In no event shall BlueDot, nor its directors, employees, partners, agents, suppliers, or affiliates, be liable for any indirect, incidental, special, consequential, or punitive damages, including without limitation, loss of profits, data, use, goodwill, or other intangible losses, resulting from:
              </p>
              <ul className="list-disc pl-6 mb-4 space-y-2">
                <li>Your use or inability to use the Service</li>
                <li>Any unauthorized access to or use of our servers and/or any personal information stored therein</li>
                <li>Any interruption or cessation of transmission to or from the Service</li>
                <li>Any bugs, viruses, trojan horses, or the like that may be transmitted to or through the Service</li>
                <li>Any errors or omissions in any content or for any loss or damage incurred as a result of the use of any content posted, transmitted, or otherwise made available via the Service</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4">Disclaimer</h2>
              <p className="mb-4">
                The information on this Service is provided on an &ldquo;as is&rdquo; basis. To the fullest extent permitted by law, this Company:
              </p>
              <ul className="list-disc pl-6 mb-4 space-y-2">
                <li>Excludes all representations, warranties, conditions and terms whether express or implied</li>
                <li>Does not warrant that the Service will be uninterrupted or error-free</li>
                <li>Does not warrant that defects will be corrected</li>
                <li>Does not warrant that the Service or the server that makes it available are free of viruses or other harmful components</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4">Governing Law</h2>
              <p className="mb-4">
                These Terms shall be interpreted and governed by the laws of the United States, without regard to its conflict of law provisions. Our failure to enforce any right or provision of these Terms will not be considered a waiver of those rights.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4">Changes to Terms</h2>
              <p className="mb-4">
                We reserve the right, at our sole discretion, to modify or replace these Terms at any time. If a revision is material, we will try to provide at least 30 days notice prior to any new terms taking effect.
              </p>
              <p className="mb-4">
                What constitutes a material change will be determined at our sole discretion. By continuing to access or use our Service after any revisions become effective, you agree to be bound by the revised terms.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4">Contact Information</h2>
              <p className="mb-4">
                If you have any questions about these Terms of Service, please contact us:
              </p>
              <ul className="list-none space-y-2">
                <li>Email: <a href="mailto:admin@bluedot.it.com" className="text-primary hover:underline">admin@bluedot.it.com</a></li>
                <li>Website: <a href="https://bluedot.it.com" className="text-primary hover:underline">bluedot.it.com</a></li>
              </ul>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
}
