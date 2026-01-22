"use client";

import React, { useState, useRef } from "react";
import { CheckCircle2, XCircle, Mail, Phone, MapPin, Github, Send } from "lucide-react";
import {
  Card,
  CardHeader,
  CardContent,
} from "@/components/ui/Card";
import Input from "@/components/ui/Input";
import Textarea from "@/components/ui/Textarea";
import Label from "@/components/ui/Label";
import Button from "@/components/ui/Button";
import Alert from "@/components/ui/Alert";
import { Separator } from "@/components/ui/Separator";

interface ContactForm {
  name: string;
  email: string;
  subject: string;
  message: string;
}

export default function Contact() {
  const [formData, setFormData] = useState<ContactForm>({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<"idle" | "success" | "error">(
    "idle"
  );
  const [serverMessage, setServerMessage] = useState<string | null>(null);

  const [hp, setHp] = useState("");
  const startedAtRef = useRef<number>(Date.now());

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus("idle");
    setServerMessage(null);

    try {
      // POST to our Next.js API route at /api/contact
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          subject: formData.subject,
          message: formData.message,
          startedAt: startedAtRef.current,
          hp,
        }),
      });

      let payload: any = null;
      try {
        payload = await res.json();
      } catch {
        // ignore JSON parse errors; we'll use status text
      }

      if (!res.ok || (payload && payload.ok === false)) {
        const msg =
          (payload && (payload.error || payload.message)) ||
          `Request failed (${res.status})`;
        throw new Error(msg);
      }

      setFormData({ name: "", email: "", subject: "", message: "" });
      setSubmitStatus("success");
      setServerMessage(
        payload?.id ? `Message ID: ${payload.id}` : "Message sent."
      );
    } catch (err: any) {
      setSubmitStatus("error");
      setServerMessage(err?.message || "Unexpected error.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const contactMethods = [
    {
      icon: Mail,
      label: "Email",
      value: "jason@bluedot.it.com",
      href: "mailto:jason@bluedot.it.com",
      color: "text-primary",
    },
    {
      icon: Phone,
      label: "Phone",
      value: "+1 (828) 215-6403",
      href: "tel:+18282156403",
      color: "text-secondary",
    },
    {
      icon: MapPin,
      label: "Location",
      value: "Remote / Available Worldwide",
      href: "#",
      color: "text-accent",
    },
  ];

  const socialLinks = [
    {
      icon: Github,
      label: "GitHub",
      href: "https://github.com/jason-allen-oneal",
      color: "text-base-content hover:text-primary",
    },
  ];

  return (
    <div className="page-shell space-y-10">
      <div className="text-center space-y-2">
        <span className="kicker">Bluedot • contact</span>
        <h2 className="text-3xl font-bold heading-accent">Get In Touch</h2>
        <p className="text-base-content/80 max-w-xl mx-auto">
          I&apos;m always open to new opportunities, collaborations, and
          discussions. Let&apos;s connect and build something meaningful.
        </p>
      </div>

      <div className="grid gap-8 lg:grid-cols-2">
        <Card className="bg-white/5 border-white/10">
          <CardHeader>
            <p className="text-base-content font-semibold">Contact Information</p>
          </CardHeader>
          <CardContent className="space-y-6">
            {contactMethods.map((method, i) => (
              <div
                key={i}
                className="flex items-center space-x-4 rounded-lg border border-white/10 p-4 hover:bg-white/5 transition"
              >
                <method.icon className={`w-5 h-5 ${method.color}`} />
                <div>
                  <p className="text-sm text-base-content/70">
                    {method.label}
                  </p>
                  <a
                    href={method.href}
                    className="text-sm font-medium hover:underline text-base-content"
                  >
                    {method.value}
                  </a>
                </div>
              </div>
            ))}

            <Separator />

            <div>
              <h4 className="text-lg font-semibold mb-3 text-base-content">Follow Me</h4>
              <div className="flex space-x-3">
                {socialLinks.map((social, i) => (
                  <a
                    key={i}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="rounded-md border border-white/10 p-2 hover:bg-white/5 transition"
                  >
                    <social.icon className="w-5 h-5" />
                  </a>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-white/5 border-white/10">
          <CardHeader>
            <p className="text-base-content font-semibold">Send a Message</p>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="name">Name *</Label>
                  <Input
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    required
                    placeholder="Your name"
                    className="bg-white/5 border-white/15 text-base-content"
                  />
                </div>
                <div>
                  <Label htmlFor="email">Email *</Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                    placeholder="your@email.com"
                    className="bg-white/5 border-white/15 text-base-content"
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="subject">Subject *</Label>
                <Input
                  id="subject"
                  name="subject"
                  value={formData.subject}
                  onChange={handleInputChange}
                  required
                  placeholder="What's this about?"
                  className="bg-white/5 border-white/15 text-base-content"
                />
              </div>

              <div>
                <Label htmlFor="message">Message *</Label>
                <Textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleInputChange}
                  required
                  rows={4}
                  placeholder="Tell me about your project, idea, or just say hello!"
                  className="bg-white/5 border-white/15 text-base-content"
                />
              </div>

              <input
                type="text"
                name="company"
                value={hp}
                onChange={(e) => setHp(e.target.value)}
                autoComplete="off"
                tabIndex={-1}
                className="hidden"
              />
              <input type="hidden" name="startedAt" value={startedAtRef.current} />

              <Button>
                {isSubmitting ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
                    Sending...
                  </>
                ) : (
                  <>
                    <Send className="w-4 h-4 mr-2" />
                    Send Message
                  </>
                )}
              </Button>

              {submitStatus === "success" && (
                <Alert variant="success" style="soft" icon={<CheckCircle2 className="h-5 w-5" />}>
                  <span>Message sent successfully! I&apos;ll get back to you soon.</span>
                </Alert>
              )}
              {submitStatus === "error" && (
                <Alert variant="error" style="soft" icon={<XCircle className="h-5 w-5" />}>
                  <span>Failed to send message. Please try again later.</span>
                </Alert>
              )}
            </form>
          </CardContent>
        </Card>
      </div>

      <Card className="bg-white/5 border-white/10">
        <CardHeader>
          <p className="text-base-content font-semibold">Quick Response Times</p>
        </CardHeader>
        <CardContent>
          <p className="text-base-content/80 text-sm leading-relaxed">
            I typically respond to messages within 24 hours. For urgent
            inquiries, reach out via the social channels above. I&apos;m always
            eager to discuss new projects, cybersecurity ideas, or anything tech
            related.
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
