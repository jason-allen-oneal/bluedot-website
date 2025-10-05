"use client";

import React, { useState } from "react";
import { Mail, Phone, MapPin, Github, Send } from "lucide-react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Separator } from "@/components/ui/separator";

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

    try {
      await new Promise((resolve) => setTimeout(resolve, 1000));
      setFormData({ name: "", email: "", subject: "", message: "" });
      setSubmitStatus("success");
    } catch {
      setSubmitStatus("error");
    } finally {
      setIsSubmitting(false);
    }
  };

  const contactMethods = [
    {
      icon: Mail,
      label: "Email",
      value: "jason.allen.oneal@gmail.com",
      href: "mailto:jason.allen.oneal@gmail.com",
      color: "text-blue-500",
    },
    {
      icon: Phone,
      label: "Phone",
      value: "+1 (828) 215-6403",
      href: "tel:+18282156403",
      color: "text-green-500",
    },
    {
      icon: MapPin,
      label: "Location",
      value: "Remote / Available Worldwide",
      href: "#",
      color: "text-purple-500",
    },
  ];

  const socialLinks = [
    {
      icon: Github,
      label: "GitHub",
      href: "https://github.com/jason-allen-oneal",
      color: "text-muted-foreground hover:text-foreground",
    },
  ];

  return (
    <div className="container py-12 space-y-8">
      <div className="text-center space-y-2">
        <h2 className="text-3xl font-bold text-primary">Get In Touch</h2>
        <p className="text-muted-foreground max-w-xl mx-auto">
          I&apos;m always open to new opportunities, collaborations, and
          discussions. Let&apos;s connect and build something meaningful.
        </p>
      </div>

      <div className="grid gap-8 lg:grid-cols-2">
        {/* Contact Info */}
        <Card className="bg-gray-950/60 backdrop-blur-md border border-white/90">
          <CardHeader>
            <CardTitle>Contact Information</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            {contactMethods.map((method, i) => (
              <div
                key={i}
                className="flex items-center space-x-4 rounded-lg border p-4 hover:bg-muted/50 transition"
              >
                <method.icon className={`w-5 h-5 ${method.color}`} />
                <div>
                  <p className="text-sm text-muted-foreground">
                    {method.label}
                  </p>
                  <a
                    href={method.href}
                    className="text-sm font-medium hover:underline"
                  >
                    {method.value}
                  </a>
                </div>
              </div>
            ))}

            <Separator />

            <div>
              <h4 className="text-lg font-semibold mb-3">Follow Me</h4>
              <div className="flex space-x-3">
                {socialLinks.map((social, i) => (
                  <a
                    key={i}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="rounded-md border p-2 hover:bg-muted transition"
                  >
                    <social.icon className="w-5 h-5" />
                  </a>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Contact Form */}
        <Card className="bg-gray-950/60 backdrop-blur-md border border-white/90">
          <CardHeader>
            <CardTitle>Send a Message</CardTitle>
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
                />
              </div>

              <Button
                type="submit"
                className="w-full"
                disabled={isSubmitting}
              >
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
                <Alert variant="default">
                  <AlertDescription>
                    ✓ Message sent successfully! I&apos;ll get back to you soon.
                  </AlertDescription>
                </Alert>
              )}
              {submitStatus === "error" && (
                <Alert variant="destructive">
                  <AlertDescription>
                    ✗ Failed to send message. Please try again later.
                  </AlertDescription>
                </Alert>
              )}
            </form>
          </CardContent>
        </Card>
      </div>

      {/* Footer Note */}
      <Card className="bg-gray-950/60 backdrop-blur-md border border-white/90">
        <CardHeader>
          <CardTitle>Quick Response Times</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground text-sm leading-relaxed">
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
