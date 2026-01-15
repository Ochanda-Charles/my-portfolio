import { motion, useInView } from 'motion/react';
import { useRef, useState } from 'react';
import { Mail, Linkedin, Github, Send } from 'lucide-react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Textarea } from './ui/textarea';
import { toast } from 'sonner';

const XIcon = () => (
  <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
  </svg>
);

const socialLinks = [
  { icon: Mail, label: 'Email', href: 'mailto:ochanda.charles.16@gmail.com', color: 'hover:text-[#FF7A59]' },
  { icon: Linkedin, label: 'LinkedIn', href: 'https://www.linkedin.com/in/ochanda-charles-otieno-a6a39223a', color: 'hover:text-[#0077B5]' },
  { icon: Github, label: 'GitHub', href: 'https://github.com/Ochanda-Charles', color: 'hover:text-[#A855F7]' },
  { icon: XIcon, label: 'X', href: 'https://x.com/0x_Ochanda', color: 'hover:text-[#1DA1F2]' },
];

export function ContactSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const payload = new URLSearchParams();
      payload.append('name', formData.name.trim());
      payload.append('email', formData.email.trim());
      payload.append('message', formData.message.trim());

      const response = await fetch(
        'https://script.google.com/macros/s/AKfycbxkwO1yiCODeVugWzsTnfpN1R6mXyPDRPwpG9GoXhr7uh5wIj2krES1JLO76iG-rWCl/exec',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
          },
          body: payload.toString(),
        }
      );

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const result = await response.json();

      if (result.result !== 'success') {
        throw new Error(result.error || 'Submission failed');
      }

      toast.success("Message sent! I'll get back to you soon.");
      setFormData({ name: '', email: '', message: '' });

    } catch (error) {
      console.error(error);
      toast.error('Failed to send message. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" className="min-h-screen bg-[#F9FAFB] dark:bg-black py-24 px-6">
      <div className="max-w-4xl mx-auto">

        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-[#111827] dark:text-white mb-4">Let's Build Together</h2>
          <p className="text-[#111827] dark:text-white opacity-70 max-w-2xl mx-auto">
            Interested in collaborating, hiring, or learning more? Let's connect.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-16">

          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <h3 className="text-[#111827] dark:text-white mb-6">Send a Message</h3>

            <form onSubmit={handleSubmit} className="space-y-4">
              <Input
                name="name"
                placeholder="Your Name"
                value={formData.name}
                onChange={handleChange}
                required
              />

              <Input
                name="email"
                type="email"
                placeholder="Your Email"
                value={formData.email}
                onChange={handleChange}
                required
              />

              <Textarea
                name="message"
                placeholder="Your Message"
                value={formData.message}
                onChange={handleChange}
                required
                rows={5}
              />

              <Button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-[#FF7A59] text-white hover:bg-[#2563EB]"
              >
                {isSubmitting ? 'Sending…' : (
                  <>
                    <Send className="w-4 h-4 mr-2" />
                    Send Message
                  </>
                )}
              </Button>
            </form>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <h3 className="text-[#111827] dark:text-white mb-6">Connect With Me</h3>
            <div className="grid grid-cols-2 gap-4">
              {socialLinks.map((link, index) => (
                <motion.a
                  key={index}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className={`flex items-center gap-3 p-4 bg-white dark:bg-[#1a1a1a] rounded-lg border border-opacity-10 ${link.color}`}
                >
                  <link.icon />
                  <span>{link.label}</span>
                </motion.a>
              ))}
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
