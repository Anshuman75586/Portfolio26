// src/components/Contact.jsx
import { motion } from "framer-motion";

export const CONTACT_DETAILS = {
  address: "Nagpur, Maharashtra",
  PhoneNO: 7558617052,
  email: "anshulgourkhede2025@gmail.com",
};

const Contact = () => {
  return (
    <section
      id="contact"
      className="py-32 bg-brand-bg relative overflow-hidden"
    >
      <div className="container mx-auto px-6 text-center">
        <motion.h2
          initial={{ opacity: 0, y: -30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-6xl md:text-8xl font-display font-bold uppercase tracking-tighter leading-none mb-6"
        >
          Let's Build <br />
          <span className="text-stroke">Something</span>
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-white/70 text-lg md:text-xl max-w-xl mx-auto mb-12"
        >
          I'm open to full-time roles, freelance projects, and collaborations.
          Drop me a line and let's talk.
        </motion.p>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="flex flex-col sm:flex-row justify-center gap-6 text-white/70 text-sm md:text-base"
        >
          <div className="flex flex-col items-center sm:items-start">
            <span className="font-bold text-brand-accent uppercase text-xs mb-1">
              Address
            </span>
            <span>{CONTACT_DETAILS.address}</span>
          </div>

          <div className="flex flex-col items-center sm:items-start">
            <span className="font-bold text-brand-accent uppercase text-xs mb-1">
              Phone
            </span>
            <a
              href={`tel:${CONTACT_DETAILS.PhoneNO}`}
              className="hover:text-brand-accent transition-colors"
            >
              {CONTACT_DETAILS.PhoneNO}
            </a>
          </div>

          <div className="flex flex-col items-center sm:items-start">
            <span className="font-bold text-brand-accent uppercase text-xs mb-1">
              Email
            </span>
            <a
              href={`mailto:${CONTACT_DETAILS.email}`}
              className="hover:text-brand-accent transition-colors"
            >
              {CONTACT_DETAILS.email}
            </a>
          </div>
        </motion.div>
      </div>

      {/* Decorative background blur */}
      <div className="absolute -bottom-20 -right-20 w-96 h-96 bg-brand-accent/5 blur-[150px] rounded-full -z-10" />
    </section>
  );
};

export default Contact;
